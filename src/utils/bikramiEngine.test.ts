import assert from 'node:assert/strict';
import test from 'node:test';
import {existsSync, readFileSync} from 'node:fs';
import {join} from 'node:path';
import {BARAH_MAHA_PAURIS} from '../data/barahMahaData';
import {resolveCitationReader} from '../data/citationSourcesData';
import {HISTORICAL_EVENTS} from '../data/eventsData';
import {PRECOMPUTED_LUNAR_2082_2084} from '../data/precomputedLunar2082_2084';
import {BIKRAMI_MONTHS, POTHI_BARAH_MAHA_URL, POTHI_BASE_URL, SOLAR_MONTH_SPANS} from '../data/sambatData';
import {formatLiveClockSnapshot} from '../hooks/useLiveClock';
import {computeLunarInfoForDate, decodeCompactLunarTuple} from './astronomy';
import {
  addDaysIso,
  BROWSEABLE_SOLAR_SPANS,
  diffDaysIso,
  formatDualTime,
  getAllDirectoryObservances,
  getBikramiSolarDate,
  getDirectoryObservancesForSambat,
  getJantriDay,
  getMonthCalendarGrid,
  getNextMilestones,
  getSolarMonthCalendarGrid,
  getSolarMonthSpanIndexForDate,
  getSolarMonthSpansForSambat,
  lookupGregorianToBikrami,
  toGurmukhiNumerals,
} from './bikramiEngine';
import {generateJantriIcs, generateSingleDayIcs, sanitizePersonalIcsField} from './icsExport';
import {
  getMaxDaysForBikramiMonth,
  getPersonalDatesForSolarDay,
  parsePersonalDates,
  resolveGregorianOccurrencesForPersonalDate,
  resolveNextOccurrenceForPersonalDate,
} from './personalDates';
import {getTomorrowObservances, shouldDispatchReminderForDate} from './purabReminders';
import {buildDailyShareText, JANTRI_SHARE_URL} from './shareDailyJantri';
import {createDefaultPersistedState, parsePersistedState} from './statePersistence';

test('Tuesday Nov 24, 2026 resolves to 9 Maghar, Sambat 2083, Katak Puranmashi & 557th Parkash Purab of Sri Guru Nanak Dev Ji', () => {
  const day = getJantriDay('2026-11-24');
  assert.equal(day.weekdayIndex, 2); // Tuesday
  assert.equal(day.solar.sambat, 2083);
  assert.equal(day.solar.monthMeta.nameEn, 'Maghar');
  assert.equal(day.solar.day, 9);
  assert.equal(day.lunar.isPuranmashi, true);
  assert.equal(day.lunar.paksh, 'Sudhi');
  assert.equal(day.lunar.pakshDay, 15);
  assert.equal(day.lunar.lunarMonthEn, 'Katak');
  assert.equal(day.events.length, 1);
  assert.match(day.events[0].titleEn, /557th Parkash Purab.*Guru Nanak Dev Ji/i);
  assert.ok(day.events[0].citations.length >= 2);
});

test('Saturday Nov 21, 2026 resolves to 6 Maghar 2083 with exact 3-day countdown to Katak Puranmashi', () => {
  const day = getJantriDay('2026-11-21');
  assert.equal(day.solar.sambat, 2083);
  assert.equal(day.solar.monthMeta.nameEn, 'Maghar');
  assert.equal(day.solar.day, 6);
  assert.equal(day.lunar.paksh, 'Sudhi');

  const milestones = getNextMilestones('2026-11-21');
  assert.ok(milestones.puranmashi);
  assert.equal(milestones.puranmashi.isoDate, '2026-11-24');
  assert.equal(milestones.puranmashi.daysRemaining, 3);
  assert.equal(milestones.puranmashi.titleEn, 'Katak Puranmashi');

  assert.ok(milestones.sangrand);
  assert.equal(milestones.sangrand.isoDate, '2026-12-16');
  assert.equal(milestones.sangrand.titleEn, 'Poh Sangrand');

  assert.ok(milestones.masya);
  assert.equal(milestones.masya.titleEn, 'Maghar Masya');
});

test('Full Sambat 2084 spans 12 contiguous true Punjabi solar months (365 days, variable 29–32 day lengths)', () => {
  const s2084 = SOLAR_MONTH_SPANS.filter((s) => s.sambat === 2084);
  assert.equal(s2084.length, 12);
  assert.equal(s2084[0].monthId, 1); // Chet
  assert.equal(s2084[11].monthId, 12); // Phagun

  let totalDays = 0;
  const lengths = new Set<number>();
  for (let i = 0; i < s2084.length; i++) {
    const span = s2084[i];
    const computedLen = diffDaysIso(span.startDate, span.endDate) + 1;
    assert.equal(computedLen, span.days);
    assert.ok(span.days >= 29 && span.days <= 32);
    lengths.add(span.days);
    totalDays += span.days;
    if (i > 0) {
      assert.equal(addDaysIso(s2084[i - 1].endDate, 1), span.startDate);
    }
  }
  assert.equal(totalDays, 365);
  assert.ok(lengths.has(32), 'Harh 2084 should be 32 days (true sidereal solar length, not fixed Nanakshahi)');
  assert.ok(lengths.has(29), 'Maghar/Magh 2084 should include 29-day solar months');

  // Verify Sangrand on 1 Vaisakh 2084
  const vaisakhi = getBikramiSolarDate('2027-04-14');
  assert.equal(vaisakhi.isSangrand, true);
  assert.equal(vaisakhi.monthMeta.nameEn, 'Vaisakh');
  assert.equal(vaisakhi.day, 1);
  assert.equal(vaisakhi.sambat, 2084);
});

test('Punjabi Solar Month calendar grid aligns 1st Sangrand through last solar day cleanly on Sunday–Saturday rows', () => {
  const magharIdx = getSolarMonthSpanIndexForDate('2026-11-24');
  assert.equal(BROWSEABLE_SOLAR_SPANS[magharIdx].monthId, 9); // Maghar 2083
  const magharGrid = getSolarMonthCalendarGrid(magharIdx);
  assert.equal(magharGrid.length % 7, 0);
  assert.equal(magharGrid[0].weekdayIndex, 0);
  assert.equal(magharGrid[magharGrid.length - 1].weekdayIndex, 6);
  const inMonth = magharGrid.filter((d) => d.inCurrentGridMonth);
  assert.equal(inMonth.length, 30);
  assert.equal(inMonth[0].solar.day, 1);
  assert.equal(inMonth[0].solar.isSangrand, true);
  assert.equal(inMonth[0].isoDate, '2026-11-16');
  assert.equal(inMonth[29].solar.day, 30);
  assert.equal(inMonth[29].isoDate, '2026-12-15');

  // Verify 32-day Harh 2084 grid
  const harhIdx = BROWSEABLE_SOLAR_SPANS.findIndex((s) => s.sambat === 2084 && s.monthId === 4);
  const harhInMonth = getSolarMonthCalendarGrid(harhIdx).filter((d) => d.inCurrentGridMonth);
  assert.equal(harhInMonth.length, 32);
  assert.equal(harhInMonth[31].solar.day, 32);
});

test('Ashtami, Panchmi, Ekadashi, Puranmashi, Masya, and Sri Dasam Granth Bhadon Sudhi 8 colophon resolve accurately', () => {
  const chaupaiColophonDay = getJantriDay('2027-09-08');
  assert.equal(chaupaiColophonDay.solar.monthMeta.nameEn, 'Bhadon');
  assert.equal(chaupaiColophonDay.solar.day, 23);
  assert.equal(chaupaiColophonDay.lunar.lunarMonthEn, 'Bhadon');
  assert.equal(chaupaiColophonDay.lunar.paksh, 'Sudhi');
  assert.equal(chaupaiColophonDay.lunar.pakshDay, 8);
  assert.equal(chaupaiColophonDay.lunar.isAshtami, true);
  assert.equal(chaupaiColophonDay.lunar.isSpecialLunar, true);
  assert.ok(chaupaiColophonDay.events.some((e) => e.id === '2084-dasam-granth-chaupai-colophon'));

  // Count special lunar days across a lunar month
  let panchmiCount = 0;
  let ashtamiCount = 0;
  let ekadashiCount = 0;
  let cursor = '2026-11-16';
  for (let i = 0; i < 30; i++) {
    const d = getJantriDay(cursor);
    if (d.lunar.isPanchmi) panchmiCount++;
    if (d.lunar.isAshtami) ashtamiCount++;
    if (d.lunar.isEkadashi) ekadashiCount++;
    cursor = addDaysIso(cursor, 1);
  }
  assert.ok(panchmiCount >= 1 && ashtamiCount >= 1 && ekadashiCount >= 1);
});

test('Gregorian-to-Bikrami lookup validates dates and returns exact Puratan conversion', () => {
  const okRes = lookupGregorianToBikrami('2026-11-24');
  assert.equal(okRes.ok, true);
  if (okRes.ok) {
    assert.equal(okRes.day.solar.day, 9);
    assert.equal(okRes.day.solar.monthMeta.nameEn, 'Maghar');
    assert.equal(okRes.day.lunar.isPuranmashi, true);
  }

  const ok2030 = lookupGregorianToBikrami('2030-04-14');
  assert.equal(ok2030.ok, true);
  if (ok2030.ok) {
    assert.equal(ok2030.day.solar.sambat, 2087);
    assert.equal(ok2030.day.solar.monthMeta.nameEn, 'Vaisakh');
    assert.equal(ok2030.day.solar.day, 1);
  }

  const outOfRange = lookupGregorianToBikrami('1800-01-01');
  assert.equal(outOfRange.ok, false);

  const invalid = lookupGregorianToBikrami('not-a-date');
  assert.equal(invalid.ok, false);
});

test('Unified directory observances include all 7 categories (including Barsis) across Sambat 2083–2084', () => {
  const all = getAllDirectoryObservances();
  const categories = new Set(all.map((o) => o.category));
  assert.ok(categories.has('gurpurab'));
  assert.ok(categories.has('shaheedi'));
  assert.ok(categories.has('khalsa'));
  assert.ok(categories.has('barsi'));
  assert.ok(categories.has('sangrand'));
  assert.ok(categories.has('puranmashi'));
  assert.ok(categories.has('masya'));
  assert.ok(all.length > 90);

  const barsis = all.filter((o) => o.category === 'barsi');
  assert.ok(barsis.length >= 13, `Expected at least 13 Barsis/Mahapurakh entries, got ${barsis.length}`);

  const uniqueIds = new Set(all.map((o) => o.id));
  assert.equal(uniqueIds.size, all.length, 'Every directory observance must have a unique id');
  for (let i = 1; i < all.length; i++) {
    assert.ok(all[i].date >= all[i - 1].date, `Directory out of chronological order at index ${i}`);
  }
});

test('Every lunar cycle across Nov 2026 – Feb 2028 produces distinct Puranmashi and Masya markers', () => {
  let puranmashiCount = 0;
  let masyaCount = 0;
  let cursor = '2026-11-01';
  while (cursor <= '2028-02-29') {
    const day = getJantriDay(cursor);
    if (day.lunar.isPuranmashi) puranmashiCount++;
    if (day.lunar.isMasya) masyaCount++;
    cursor = addDaysIso(cursor, 1);
  }
  assert.ok(puranmashiCount >= 15 && puranmashiCount <= 17, `Expected 15-17 Puranmashis, got ${puranmashiCount}`);
  assert.ok(masyaCount >= 15 && masyaCount <= 17, `Expected 15-17 Masyas, got ${masyaCount}`);
});

test('Gregorian monthly calendar grid returns complete Sunday-to-Saturday weeks and Gurmukhi numeral conversion works', () => {
  const grid = getMonthCalendarGrid(2026, 10); // Nov 2026
  assert.equal(grid.length % 7, 0);
  assert.equal(grid[0].weekdayIndex, 0);
  assert.equal(grid[grid.length - 1].weekdayIndex, 6);
  assert.equal(toGurmukhiNumerals(2083), '੨੦੮੩');
  assert.equal(toGurmukhiNumerals('9 Maghar'), '੯ Maghar');
});

test('Dual-time formatting and live clock convert Sri Anandpur Sahib (IST) alongside external browser timezone', () => {
  const dual = formatDualTime('2026-11-24T14:55:00Z', 'America/Los_Angeles');
  assert.equal(dual.isSameZone, false);
  assert.match(dual.amritsarTime, /8:25|08:25/i);
  assert.match(dual.localTime, /6:55|06:55/i);

  const live = formatLiveClockSnapshot(new Date('2026-11-24T14:55:42Z'), 'America/Los_Angeles');
  assert.equal(live.isSameZone, false);
  assert.match(live.anandpurTime, /8:25:42|08:25:42/i);
  assert.match(live.localTime, /6:55:42|06:55:42/i);
  assert.match(live.localTimeZoneLabel, /Los Angeles/i);
});

test('RFC 5545 .ics export supports selective mode AND full 365-day daily Bikrami + combined Purab mode', () => {
  const selective = generateJantriIcs({
    includeDaily: false,
    includeSangrands: true,
    includePuranmashi: true,
    includeMasya: true,
    includeGurpurabs: true,
    includeShaheedi: true,
    includeKhalsa: true,
    includeBarsis: true,
    sambatScope: 'all',
    language: 'bi',
  });
  assert.ok(selective.eventCount > 75);
  assert.ok(selective.content.startsWith('BEGIN:VCALENDAR\r\n'));
  assert.ok(selective.content.includes('END:VCALENDAR\r\n'));
  assert.ok(selective.content.includes('557th Parkash Purab'));
  assert.ok(selective.content.includes('DTSTART;VALUE=DATE:20261124'));
  assert.ok(selective.content.includes('Sri Anandpur Sahib IST'));

  // Full daily mode: Sambat 2082 = 365 days, Sambat 2083 = 366 days, Sambat 2084 = 365 days, All = 1096 days
  const daily2082 = generateJantriIcs({
    includeDaily: true,
    includeSangrands: true,
    includePuranmashi: true,
    includeMasya: true,
    includeGurpurabs: true,
    includeShaheedi: true,
    includeKhalsa: true,
    includeBarsis: true,
    sambatScope: '2082',
    language: 'en',
  });
  assert.equal(daily2082.eventCount, 365);
  assert.ok(daily2082.content.includes('556th Parkash Guru Nanak Ji'));

  const daily2084 = generateJantriIcs({
    includeDaily: true,
    includeSangrands: true,
    includePuranmashi: true,
    includeMasya: true,
    includeGurpurabs: true,
    includeShaheedi: true,
    includeKhalsa: true,
    includeBarsis: true,
    sambatScope: '2084',
    language: 'en',
  });
  assert.equal(daily2084.eventCount, 365);

  const daily2083 = generateJantriIcs({
    includeDaily: true,
    includeSangrands: true,
    includePuranmashi: true,
    includeMasya: true,
    includeGurpurabs: true,
    includeShaheedi: true,
    includeKhalsa: true,
    includeBarsis: true,
    sambatScope: '2083',
    language: 'en',
  });
  assert.equal(daily2083.eventCount, 366);
  assert.ok(
    daily2083.content.includes(
      'SUMMARY:9 Maghar 2083 · Katak Puranmashi — 557th Parkash Sri Guru Nanak Dev Ji',
    ),
    'Daily mode should merge same-day Purab into the single daily VEVENT SUMMARY',
  );
  assert.ok(daily2083.content.includes('https://calendar.tatkhalsa.in/'));

  const dailyAll = generateJantriIcs({
    includeDaily: true,
    includeSangrands: true,
    includePuranmashi: true,
    includeMasya: true,
    includeGurpurabs: true,
    includeShaheedi: true,
    includeKhalsa: true,
    includeBarsis: true,
    sambatScope: 'all',
    language: 'en',
  });
  assert.equal(dailyAll.eventCount, 1096);

  const single = generateSingleDayIcs('2026-11-24', 'Katak Puranmashi', '9 Maghar, Sambat 2083');
  assert.ok(single.includes('BEGIN:VEVENT'));
  assert.ok(single.includes('SUMMARY:Katak Puranmashi'));
});

test('All 12 months have complete Barah Maha Majh pauris and https://pothi.tatkhalsa.in/ links', () => {
  assert.equal(POTHI_BARAH_MAHA_URL, 'https://pothi.tatkhalsa.in/');
  for (const month of BIKRAMI_MONTHS) {
    assert.equal(
      month.pothiUrl,
      'https://pothi.tatkhalsa.in/',
      `Expected https://pothi.tatkhalsa.in/ for ${month.nameEn}, got ${month.pothiUrl}`,
    );
    const pauri = BARAH_MAHA_PAURIS[month.key];
    assert.ok(pauri, `Missing Barah Maha pauri for ${month.key}`);
    assert.ok(pauri.pauriPa.length >= 9, `Expected >= 9 Gurmukhi lines for ${month.key}`);
    assert.equal(pauri.pauriPa.length, pauri.pauriEn.length, `Line count mismatch for ${month.key}`);
  }
  const linkedEvents = HISTORICAL_EVENTS.filter((e) => Boolean(e.pothiUrl));
  assert.ok(linkedEvents.length >= 8);
  for (const ev of linkedEvents) {
    assert.ok(
      ev.pothiUrl!.startsWith(`${POTHI_BASE_URL}/`),
      `Event ${ev.id} should point to pothi.tatkhalsa.in: ${ev.pothiUrl}`,
    );
  }
});

test('Expanded Sambat 2083 Purabs, Shaheedi Divases, and Barsis resolve on verified solar & lunar dates', () => {
  const uniqueEventIds = new Set(HISTORICAL_EVENTS.map((e) => e.id));
  assert.equal(uniqueEventIds.size, HISTORICAL_EVENTS.length, 'All historical event IDs must be unique');

  const babaDeepSinghShaheedi = getJantriDay('2026-11-15');
  assert.equal(babaDeepSinghShaheedi.solar.day, 30);
  assert.equal(babaDeepSinghShaheedi.solar.monthMeta.nameEn, 'Katak');
  assert.ok(babaDeepSinghShaheedi.events.some((e) => e.id === '2083-shaheedi-baba-deep-singh-ji'));

  const kaviSantokhSingh = getJantriDay('2026-11-05');
  assert.ok(kaviSantokhSingh.events.some((e) => e.id === '2083-barsi-mahakavi-bhai-santokh-singh'));

  const basantDay = getJantriDay('2027-02-11');
  assert.equal(basantDay.lunar.isPanchmi, true);
  assert.ok(basantDay.events.some((e) => e.id === '2083-basant-panchmi'));
  assert.ok(basantDay.events.some((e) => e.id === '2083-janam-sahibzada-baba-ajit-singh-ji'));

  const sakaNankana = getJantriDay('2027-02-21');
  assert.ok(sakaNankana.events.some((e) => e.id === '2083-saka-sri-nankana-sahib'));
});

test('App state persistence defaults Sangrands and Purabs to current Sambat 2083, round-trips all fields, and recovers cleanly from corrupt JSON', () => {
  const defaults = createDefaultPersistedState('2026-11-27', 2083, 9, 2026, 10);
  assert.equal(defaults.sangrandYear, 2083);
  assert.equal(defaults.directorySambat, '2083');
  assert.equal(defaults.activeView, 'jantri');
  assert.equal(defaults.drawerDateIso, null);

  const saved = JSON.stringify({
    activeView: 'sangrands',
    lang: 'pa',
    gridMode: 'gregorian',
    activeSambat: 2084,
    activeMonthId: 2,
    viewYear: 2027,
    viewMonth0: 3,
    selectedIso: '2027-04-14',
    drawerDateIso: '2026-11-24',
    activeFilter: 'barsi',
    sangrandYear: 2084,
    directoryQuery: 'Nanak',
    directoryCategory: 'gurpurab',
    directorySambat: '2083',
    directoryUpcomingOnly: true,
    lookupInput: '2027-04-14',
  });
  const restoredFresh = parsePersistedState(saved, defaults, null, null, null, '2026-11-27');
  assert.equal(restoredFresh.activeView, 'sangrands');
  assert.equal(restoredFresh.lang, 'pa');
  assert.equal(restoredFresh.gridMode, 'gregorian');
  // Fresh visit without sessionNavRaw always opens on today's Desi month
  assert.equal(restoredFresh.activeSambat, defaults.activeSambat);
  assert.equal(restoredFresh.activeMonthId, defaults.activeMonthId);
  assert.equal(restoredFresh.viewYear, defaults.viewYear);
  assert.equal(restoredFresh.viewMonth0, defaults.viewMonth0);
  assert.equal(restoredFresh.drawerDateIso, '2026-11-24');
  assert.equal(restoredFresh.sangrandYear, 2084);
  assert.equal(restoredFresh.directoryQuery, 'Nanak');
  assert.equal(restoredFresh.directoryCategory, 'gurpurab');
  assert.equal(restoredFresh.directorySambat, '2083');
  assert.equal(restoredFresh.directoryUpcomingOnly, true);
  assert.equal(restoredFresh.lookupInput, '2027-04-14');

  // Explicit navigation within the current session restores activeSambat/activeMonthId/viewYear/viewMonth0
  const restoredSession = parsePersistedState(
    saved,
    defaults,
    null,
    null,
    JSON.stringify({activeSambat: 2087, activeMonthId: 2, viewYear: 2030, viewMonth0: 3}),
    '2026-11-27',
  );
  assert.equal(restoredSession.activeSambat, 2087);
  assert.equal(restoredSession.activeMonthId, 2);
  assert.equal(restoredSession.viewYear, 2030);
  assert.equal(restoredSession.viewMonth0, 3);

  // 'print' view is never restored across reloads — always resets to 'jantri'
  const restoredPrint = parsePersistedState(JSON.stringify({activeView: 'print'}), defaults);
  assert.equal(restoredPrint.activeView, 'jantri');

  // Corrupt JSON and invalid ranges fall back safely to defaults (preserving legacy lang if valid)
  const recovered = parsePersistedState('{broken json', defaults, 'bi');
  assert.equal(recovered.lang, 'bi');
  assert.equal(recovered.activeView, 'jantri');
  assert.equal(recovered.sangrandYear, 2083);

  const sanitized = parsePersistedState(
    JSON.stringify({
      activeView: 'unknown',
      sangrandYear: 1800,
      drawerDateIso: '2999-01-01',
    }),
    defaults,
    null,
    null,
    JSON.stringify({activeSambat: 9999, activeMonthId: 99, viewYear: 1800, viewMonth0: 99}),
    '2026-11-27',
  );
  assert.equal(sanitized.activeView, 'jantri');
  assert.equal(sanitized.sangrandYear, 2083);
  assert.equal(sanitized.activeSambat, 2083);
  assert.equal(sanitized.activeMonthId, 9);
  assert.equal(sanitized.drawerDateIso, null);
});

test('Every historical citation across Sambat 2082–2084 routes strictly to pothi.tatkhalsa.in with zero third-party scriptural links', () => {
  let totalChecked = 0;
  for (const ev of HISTORICAL_EVENTS) {
    assert.ok(ev.citations.length > 0, `Event ${ev.id} has no citations`);
    for (const cit of ev.citations) {
      const reader = resolveCitationReader(cit, ev);
      totalChecked++;
      assert.ok(reader.headingEn.length > 5, `Empty headingEn for ${ev.id}`);
      assert.ok(reader.gurmukhiLines.length >= 1, `Missing Gurmukhi lines for ${ev.id}`);
      assert.ok(reader.translationEn.length > 25, `Missing English translation for ${ev.id}`);
      assert.ok(
        reader.exactGranthUrl.startsWith('https://pothi.tatkhalsa.in'),
        `Non-pothi exactGranthUrl for ${ev.id}: ${reader.exactGranthUrl}`,
      );
      assert.ok(
        !reader.exactGranthUrl.includes('searchgurbani') &&
          !reader.exactGranthUrl.includes('archive.org'),
        `Third-party URL leaked for ${ev.id}: ${reader.exactGranthUrl}`,
      );
      if (cit.pothiUrl) {
        assert.ok(
          cit.pothiUrl.startsWith('https://pothi.tatkhalsa.in'),
          `Non-pothi citation pothiUrl for ${ev.id}: ${cit.pothiUrl}`,
        );
      }
    }
  }
  assert.ok(totalChecked >= 200, `Expected >= 200 citations verified, got ${totalChecked}`);

  // Spot-check Bandi Chhor citations (Suraj Prakash Raas 5 + Bhai Gurdas Vaar 19 Pauri 6)
  const bandiChhor = HISTORICAL_EVENTS.find((e) => e.id === '2083-bandi-chhor-divas')!;
  const surajReader = resolveCitationReader(bandiChhor.citations[0], bandiChhor);
  assert.match(surajReader.headingEn, /Raas 5, Ansu 26–32/i);
  assert.ok(surajReader.gurmukhiLines.length >= 4);
  assert.ok(surajReader.exactGranthUrl.startsWith('https://pothi.tatkhalsa.in'));

  const gurdasReader = resolveCitationReader(bandiChhor.citations[1], bandiChhor);
  assert.ok(gurdasReader.exactGranthUrl.startsWith('https://pothi.tatkhalsa.in'));
  assert.ok(gurdasReader.gurmukhiLines.length >= 6);
});

test('Theme (parchment/surmai/kesri) and 1-day-before reminder toggle persist and sanitize safely', () => {
  const defaults = createDefaultPersistedState('2026-11-22', 2083, 9, 2026, 10);
  assert.equal(defaults.theme, 'parchment');
  assert.equal(defaults.remindersEnabled, false);
  assert.equal(defaults.lang, 'en');

  const restored = parsePersistedState(
    JSON.stringify({theme: 'surmai', remindersEnabled: true, lang: 'pa'}),
    defaults,
  );
  assert.equal(restored.theme, 'surmai');
  assert.equal(restored.remindersEnabled, true);
  assert.equal(restored.lang, 'pa');

  const kesri = parsePersistedState(
    JSON.stringify({theme: 'kesri', remindersEnabled: false}),
    defaults,
  );
  assert.equal(kesri.theme, 'kesri');

  const invalid = parsePersistedState(
    JSON.stringify({theme: 'neon-invalid', remindersEnabled: 'yes'}),
    defaults,
    null,
    'surmai',
  );
  assert.equal(invalid.theme, 'surmai');
  assert.equal(invalid.remindersEnabled, false);
});

test('buildDailyShareText formats clean bilingual daily summary for WhatsApp / Instagram', () => {
  const gurpurabDay = getJantriDay('2026-11-24', true);
  const text = buildDailyShareText(gurpurabDay, [
    {
      id: 'pd-1',
      title: 'Mata Ji Janam Din',
      kind: 'janam-din',
      monthId: 9,
      day: 9,
      createdAt: '2026-11-22T00:00:00Z',
    },
  ]);

  assert.match(text, /9 Maghar, Sambat 2083/);
  assert.match(text, /੯ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੩/);
  assert.match(text, /Katak Puranmashi \(Full Moon\)/);
  assert.match(text, /557th Parkash Purab/i);
  assert.match(text, /Mata Ji Janam Din — Janam Din \(Birthday\)/);
  assert.ok(text.includes(JANTRI_SHARE_URL));
});

test('Personal Desi Dates parse, resolve across Sambat 2083–2084, and export cleanly to .ics', () => {
  assert.equal(getMaxDaysForBikramiMonth(4), 32); // Harh
  assert.equal(getMaxDaysForBikramiMonth(9), 30); // Maghar

  const parsed = parsePersonalDates(
    JSON.stringify([
      {
        id: 'pd-1',
        title: 'Mata Ji Janam Din',
        kind: 'janam-din',
        monthId: 9,
        day: 9,
        notes: 'Sri Sukhmani Sahib Path',
        createdAt: '2026-11-22T00:00:00Z',
      },
      {id: 'bad', title: '', kind: 'janam-din', monthId: 99, day: 50},
    ]),
  );
  assert.equal(parsed.length, 1);
  assert.equal(parsed[0].title, 'Mata Ji Janam Din');

  const matched = getPersonalDatesForSolarDay(parsed, 9, 9);
  assert.equal(matched.length, 1);

  const occurrences = resolveGregorianOccurrencesForPersonalDate(parsed[0]);
  assert.equal(occurrences.length, 3); // Sambat 2082 (2025-11-24), Sambat 2083 (2026-11-24), Sambat 2084 (2027-11-24)
  assert.equal(occurrences[0].isoDate, '2025-11-24');
  assert.equal(occurrences[0].sambat, 2082);
  assert.equal(occurrences[1].isoDate, '2026-11-24');
  assert.equal(occurrences[1].sambat, 2083);

  const nextOcc = resolveNextOccurrenceForPersonalDate(parsed[0], '2026-11-22');
  assert.ok(nextOcc);
  assert.equal(nextOcc.isoDate, '2026-11-24');

  // Verify selective & daily .ics exports include personal dates
  const selectiveWithPersonal = generateJantriIcs({
    includeDaily: false,
    includeSangrands: false,
    includePuranmashi: false,
    includeMasya: false,
    includeGurpurabs: false,
    includeShaheedi: false,
    includeKhalsa: false,
    includeBarsis: false,
    includePersonalDates: true,
    personalDates: parsed,
    sambatScope: 'all',
    language: 'en',
  });
  assert.equal(selectiveWithPersonal.eventCount, 3);
  assert.ok(selectiveWithPersonal.content.includes('Mata Ji Janam Din'));
  assert.ok(selectiveWithPersonal.content.includes('DTSTART;VALUE=DATE:20261124'));

  const dailyWithPersonal = generateJantriIcs({
    includeDaily: true,
    includeSangrands: true,
    includePuranmashi: true,
    includeMasya: true,
    includeGurpurabs: true,
    includeShaheedi: true,
    includeKhalsa: true,
    includeBarsis: true,
    includePersonalDates: true,
    personalDates: parsed,
    sambatScope: '2083',
    language: 'en',
  });
  assert.equal(dailyWithPersonal.eventCount, 366);
  assert.ok(dailyWithPersonal.content.includes('Mata Ji Janam Din'));
});

test('1-day-before Purab reminder engine detects tomorrow Sangrand, Puranmashi, Gurpurab & Personal Desi Dates', () => {
  // On 2026-11-23, tomorrow is 2026-11-24: Katak Puranmashi + 557th Parkash Sri Guru Nanak Dev Ji
  const summary = getTomorrowObservances('2026-11-23', [
    {
      id: 'pd-1',
      title: 'Mata Ji Janam Din',
      kind: 'janam-din',
      monthId: 9,
      day: 9,
      createdAt: '2026-11-22T00:00:00Z',
    },
  ]);
  assert.equal(summary.tomorrowIso, '2026-11-24');
  assert.equal(summary.hasReminderItems, true);
  assert.ok(summary.items.some((i) => i.kind === 'puranmashi'));
  assert.ok(summary.items.some((i) => i.kind === 'purab'));
  assert.ok(summary.items.some((i) => i.kind === 'personal'));
  assert.match(summary.bodyEn, /Katak Puranmashi \(Full Moon\)/);
  assert.match(summary.bodyEn, /Mata Ji Janam Din/);

  // Deduplication check
  assert.equal(shouldDispatchReminderForDate(null, '2026-11-24'), true);
  assert.equal(shouldDispatchReminderForDate('2026-11-23', '2026-11-24'), true);
  assert.equal(shouldDispatchReminderForDate('2026-11-24', '2026-11-24'), false);

  // On 2026-12-15, tomorrow is 2026-12-16: Poh Sangrand
  const sangrandEve = getTomorrowObservances('2026-12-15');
  assert.equal(sangrandEve.hasReminderItems, true);
  assert.ok(sangrandEve.items.some((i) => i.kind === 'sangrand'));
});

test('Expanded Panthic dataset includes all 15 Bhagats, 11 Bhatts, Gursikh Bani-kars, Guru Ghar families, Panj Pyare & Khalsa Shaheeds', () => {
  const all = getAllDirectoryObservances();
  const searchableBlob = all
    .map((o) => `${o.titleEn} ${o.summaryEn} ${o.ruleEn} ${o.sourceSearchText}`)
    .join('\n')
    .toLowerCase();

  // All 15 Bhagat Sahibaan
  const fifteenBhagats = [
    'kabir',
    'namdev',
    'ravidas',
    'dhanna',
    'sheikh farid',
    'trilochan',
    'beni',
    'jaidev',
    'bhikhan',
    'sain',
    'pipa',
    'sadhna',
    'ramanand',
    'parmanand',
    'surdas',
  ];
  for (const name of fifteenBhagats) {
    assert.ok(searchableBlob.includes(name), `Missing Bhagat in directory: ${name}`);
  }

  // All 11 Bhatt Sahibaan
  const elevenBhatts = [
    'kalh',
    'jalap',
    'kirat',
    'bhikha',
    'salh',
    'bhalh',
    'nalh',
    'gayand',
    'mathura',
    'balh',
    'harbans',
  ];
  for (const name of elevenBhatts) {
    assert.ok(searchableBlob.includes(name), `Missing Bhatt in directory: ${name}`);
  }

  // 4 Gursikh Bani-kars & Bhai Gurdas Ji
  for (const name of ['bhai mardana', 'baba sundar', 'bhai satta', 'bhai balwand', 'bhai gurdas']) {
    assert.ok(searchableBlob.includes(name), `Missing Gursikh Bani-kar: ${name}`);
  }

  // Guru Ghar families & Sahibzade
  const guruGharFigures = [
    'baba sri chand',
    'baba lakhmi das',
    'bebe nanaki',
    'mata sulakhni',
    'mata khivi',
    'baba dasu',
    'baba datu',
    'bibi amro',
    'bibi anokhi',
    'mata mansa devi',
    'baba mohan',
    'baba mohri',
    'bibi dani',
    'bibi bhani',
    'baba prithi chand',
    'baba mahadev',
    'mata ganga',
    'baba gurditta',
    'bibi viro',
    'baba ani rai',
    'baba suraj mal',
    'baba atal',
    'baba ram rai',
    'baba ajit singh',
    'baba jujhar singh',
    'baba zorawar singh',
    'baba fateh singh',
    'mata gujri',
    'mata jito',
    'mata sundri',
    'mata sahib kaur',
  ];
  for (const name of guruGharFigures) {
    assert.ok(searchableBlob.includes(name), `Missing Guru Ghar figure: ${name}`);
  }

  // Panj Pyare & Classic Gursikhs / Khalsa Shaheeds / Shaheedi Hafta
  const gursikhsAndShaheeds = [
    'bhai daya singh',
    'bhai dharam singh',
    'bhai himmat singh',
    'bhai mohkam singh',
    'bhai sahib singh',
    'baba budha',
    'bhai mati das',
    'bhai sati das',
    'bhai dayala',
    'bhai mani singh',
    'bhai taru singh',
    'baba deep singh',
    'bhai bachittar singh',
    'bhai uday singh',
    'bhai kanhaiya',
    'mai bhago',
    'baba banda singh bahadur',
    'akali baba phula singh',
    'hari singh nalwa',
    'baba baghel singh',
    'jassa singh ahluwalia',
    'maharaja ranjit singh',
    'qila chhodna',
    'sarsa nadi',
  ];
  for (const name of gursikhsAndShaheeds) {
    assert.ok(searchableBlob.includes(name), `Missing Gursikh/Shaheed: ${name}`);
  }

  // Verify subGroup filter coverage
  const guruGharCount = all.filter((o) => o.subGroups?.includes('guru-ghar')).length;
  const bhagatBhattCount = all.filter((o) => o.subGroups?.includes('bhagat-bhatt')).length;
  const gursikhCount = all.filter((o) => o.subGroups?.includes('gursikh')).length;
  assert.ok(guruGharCount >= 18, `Expected >= 18 Guru Ghar observances, got ${guruGharCount}`);
  assert.ok(bhagatBhattCount >= 12, `Expected >= 12 Bhagats & Bhatts observances, got ${bhagatBhattCount}`);
  assert.ok(gursikhCount >= 22, `Expected >= 22 Gursikhs & Panj Pyare observances, got ${gursikhCount}`);

  // Verify persistence & legacy migration of new directory filter keys
  const defaults = createDefaultPersistedState('2026-11-22', 2083, 9, 2026, 10);
  assert.equal(
    parsePersistedState(JSON.stringify({directoryCategory: 'bhagat-bhatt'}), defaults).directoryCategory,
    'bhagat-bhatt',
  );
  assert.equal(
    parsePersistedState(JSON.stringify({directoryCategory: 'guru-ghar'}), defaults).directoryCategory,
    'guru-ghar',
  );
  assert.equal(
    parsePersistedState(JSON.stringify({directoryCategory: 'puranmashi'}), defaults).directoryCategory,
    'sangrand-tithi',
  );
  assert.equal(
    parsePersistedState(JSON.stringify({sangrandYear: 2082, directorySambat: '2082'}), defaults)
      .sangrandYear,
    2082,
  );
});

test('Full Sambat 2082 (365 days) and Complete Sambat 2083 (366 days) are contiguous with verified Puratan dates', () => {
  const s2082 = SOLAR_MONTH_SPANS.filter((s) => s.sambat === 2082);
  const s2083 = SOLAR_MONTH_SPANS.filter((s) => s.sambat === 2083);
  assert.equal(s2082.length, 12);
  assert.equal(s2083.length, 12);
  assert.equal(BROWSEABLE_SOLAR_SPANS.length, 36);

  let days2082 = 0;
  for (let i = 0; i < s2082.length; i++) {
    assert.equal(diffDaysIso(s2082[i].startDate, s2082[i].endDate) + 1, s2082[i].days);
    days2082 += s2082[i].days;
    if (i > 0) assert.equal(addDaysIso(s2082[i - 1].endDate, 1), s2082[i].startDate);
  }
  assert.equal(days2082, 365);

  let days2083 = 0;
  for (let i = 0; i < s2083.length; i++) {
    assert.equal(diffDaysIso(s2083[i].startDate, s2083[i].endDate) + 1, s2083[i].days);
    days2083 += s2083[i].days;
    if (i > 0) assert.equal(addDaysIso(s2083[i - 1].endDate, 1), s2083[i].startDate);
  }
  assert.equal(days2083, 366);
  assert.equal(addDaysIso(s2082[11].endDate, 1), s2083[0].startDate);

  // Verify 556th Parkash Purab of Sri Guru Nanak Dev Ji (5 Nov 2025)
  const parkash556 = getJantriDay('2025-11-05');
  assert.equal(parkash556.solar.sambat, 2082);
  assert.equal(parkash556.solar.monthMeta.nameEn, 'Katak');
  assert.equal(parkash556.solar.day, 20);
  assert.equal(parkash556.lunar.isPuranmashi, true);
  assert.ok(parkash556.events.some((e) => e.id === '2082-parkash-guru-nanak-dev-556'));

  // Verify 350th Shaheedi Divas of Sri Guru Tegh Bahadur Ji (25 Nov 2025)
  const shaheedi350 = getJantriDay('2025-11-25');
  assert.equal(shaheedi350.solar.sambat, 2082);
  assert.equal(shaheedi350.lunar.paksh, 'Sudhi');
  assert.equal(shaheedi350.lunar.pakshDay, 5);
  assert.ok(shaheedi350.events.some((e) => e.id === '2082-shaheedi-guru-tegh-bahadur-350'));

  // Verify Sambat 2083 Vaisakhi (14 Apr 2026) and Shuddh Jeth Sudhi 4 Shaheedi Guru Arjan Dev Ji (18 Jun 2026)
  const vaisakhi2083 = getJantriDay('2026-04-14');
  assert.equal(vaisakhi2083.solar.isSangrand, true);
  assert.equal(vaisakhi2083.solar.monthMeta.nameEn, 'Vaisakh');
  assert.equal(vaisakhi2083.solar.sambat, 2083);
  assert.ok(vaisakhi2083.events.some((e) => e.id === '2083-vaisakhi-khalsa-sajna'));

  const guruArjan2083 = getJantriDay('2026-06-18');
  assert.equal(guruArjan2083.solar.sambat, 2083);
  assert.equal(guruArjan2083.lunar.paksh, 'Sudhi');
  assert.equal(guruArjan2083.lunar.pakshDay, 4);
  assert.ok(guruArjan2083.events.some((e) => e.id === '2083-shaheedi-guru-arjan-dev'));

  // Verify Gregorian lookup accepts 2025-11-05
  const lookup2082 = lookupGregorianToBikrami('2025-11-05');
  assert.equal(lookup2082.ok, true);
});

test('Sambat 2082, 2083, and 2084 achieve full category, subGroup, and unique-ID observance parity', () => {
  const seenIds = new Set<string>();
  for (const ev of HISTORICAL_EVENTS) {
    assert.ok(!seenIds.has(ev.id), `Duplicate HISTORICAL_EVENTS id: ${ev.id}`);
    seenIds.add(ev.id);
    const solar = getBikramiSolarDate(ev.date);
    assert.equal(
      solar.sambat,
      ev.sambat,
      `Event ${ev.id} (${ev.date}) belongs to solar Sambat ${solar.sambat}, not ${ev.sambat}`,
    );
  }

  for (const sambat of [2082, 2083, 2084] as const) {
    const yearEvents = HISTORICAL_EVENTS.filter((e) => e.sambat === sambat);
    assert.ok(yearEvents.length >= 65, `Sambat ${sambat} has only ${yearEvents.length} events`);
    for (const cat of ['gurpurab', 'shaheedi', 'khalsa', 'barsi'] as const) {
      const catCount = yearEvents.filter((e) => e.category === cat).length;
      assert.ok(catCount >= 5, `Sambat ${sambat} missing category ${cat} (got ${catCount})`);
    }
    for (const sub of ['guru-ghar', 'bhagat-bhatt', 'gursikh'] as const) {
      const subCount = yearEvents.filter((e) => e.subGroups?.includes(sub)).length;
      assert.ok(subCount >= 10, `Sambat ${sambat} missing subGroup ${sub} (got ${subCount})`);
    }
    // Verify Shaheedi Hafta (6–13 Poh) and Bhagat/Bhatt/Panj Pyare coverage in every year
    const blob = yearEvents
      .map((e) => `${e.titleEn} ${e.shortLabelEn} ${e.summaryEn}`)
      .join(' ')
      .toLowerCase();
    for (const required of [
      'bhagat kabir',
      'bhatt',
      'bhai daya singh',
      'qila chhodna',
      'sarsa',
      'chamkaur',
    ]) {
      assert.ok(blob.includes(required), `Sambat ${sambat} missing "${required}"`);
    }
  }

  // Full 2082–2084 daily ICS export spans exactly 1,096 days
  const allDaily = generateJantriIcs({
    includeDaily: true,
    includeSangrands: true,
    includePuranmashi: true,
    includeMasya: true,
    includeGurpurabs: true,
    includeShaheedi: true,
    includeKhalsa: true,
    includeBarsis: true,
    includePersonalDates: false,
    sambatScope: 'all',
    language: 'en',
  });
  assert.equal(allDaily.eventCount, 1096);
});

test('Personal Desi Dates in .ics export sanitize CRLF, control characters, and RFC 5545 punctuation safely', () => {
  assert.equal(
    sanitizePersonalIcsField('Bebe Ji\r\nSUMMARY:INJECTED\u0007\tName'),
    'Bebe Ji SUMMARY:INJECTED Name',
  );

  const maliciousPersonal = [
    {
      id: 'pd-sec-1',
      title: 'Family Path\r\nBEGIN:VALARM\nTRIGGER:-PT5M;comma,slash\\end',
      kind: 'barsi' as const,
      monthId: 9,
      day: 9,
      notes: 'Line1\r\nACTION:DISPLAY\r\nDESCRIPTION:evil;note,with\\chars\u0000',
      createdAt: '2026-11-22T00:00:00Z',
    },
  ];

  for (const includeDaily of [false, true]) {
    const ics = generateJantriIcs({
      includeDaily,
      includeSangrands: false,
      includePuranmashi: false,
      includeMasya: false,
      includeGurpurabs: false,
      includeShaheedi: false,
      includeKhalsa: false,
      includeBarsis: false,
      includePersonalDates: true,
      personalDates: maliciousPersonal,
      sambatScope: '2083',
      language: 'en',
    });

    const lines = ics.content.split('\r\n');
    // No injected raw VCALENDAR property lines from user input
    assert.equal(lines.some((l) => l.startsWith('BEGIN:VALARM')), false);
    assert.equal(lines.some((l) => l.startsWith('ACTION:DISPLAY')), false);
    assert.equal(lines.some((l) => l.startsWith('TRIGGER:')), false);
    // Punctuation escaped properly inside SUMMARY/DESCRIPTION
    assert.ok(ics.content.includes('comma\\,slash\\\\end'));
    assert.ok(ics.content.includes('evil\\;note\\,with\\\\chars'));
  }
});

test('Live clock and dual-time formatters emit consistent uppercase AM/PM across IST and local zones', () => {
  const sampleDates = [
    new Date('2026-11-22T04:15:30Z'), // 09:45:30 AM IST, 11:15:30 PM EST (prev day)
    new Date('2026-11-22T15:05:09Z'), // 08:35:09 PM IST, 10:05:09 AM EST
  ];

  for (const dt of sampleDates) {
    const clock = formatLiveClockSnapshot(dt, 'America/New_York');
    assert.match(clock.anandpurTime, /^\d{2}:\d{2}:\d{2} (AM|PM)$/);
    assert.match(clock.localTime, /^\d{2}:\d{2}:\d{2} (AM|PM)$/);

    const dual = formatDualTime(dt.toISOString(), 'America/New_York');
    assert.match(dual.amritsarTime, /\b(AM|PM)$/);
    assert.match(dual.localTime, /\b(AM|PM)$/);
    assert.equal(/\b(am|pm)\b/.test(dual.amritsarTime), false);
    assert.equal(/\b(am|pm)\b/.test(dual.localTime), false);
  }
});

test('Precomputed Sambat 2082–2084 lunar table matches live astronomical calculation exactly', () => {
  const sampleDates = [
    '2025-03-14',
    '2025-11-05',
    '2026-04-14',
    '2026-11-24',
    '2027-04-14',
    '2027-09-08',
    '2028-02-29',
  ];
  for (const iso of sampleDates) {
    const tuple = PRECOMPUTED_LUNAR_2082_2084[iso];
    assert.ok(tuple, `Missing precomputed lunar tuple for ${iso}`);
    const decoded = decodeCompactLunarTuple(iso, tuple);
    const computed = computeLunarInfoForDate(iso);
    assert.equal(decoded.tithiNumber, computed.tithiNumber, `Tithi mismatch on ${iso}`);
    assert.equal(decoded.paksh, computed.paksh, `Paksh mismatch on ${iso}`);
    assert.equal(decoded.lunarMonthEn, computed.lunarMonthEn, `Lunar month mismatch on ${iso}`);
    assert.equal(decoded.isPuranmashi, computed.isPuranmashi, `Puranmashi mismatch on ${iso}`);
    assert.equal(decoded.isMasya, computed.isMasya, `Masya mismatch on ${iso}`);
  }
});

test('Perpetual engine computes full 2030 (Sambat 2087) solar months, dynamic Purab anniversaries, and .ics export', () => {
  const spans2087 = getSolarMonthSpansForSambat(2087);
  assert.equal(spans2087.length, 12);
  let totalDays = 0;
  for (let i = 0; i < spans2087.length; i++) {
    const span = spans2087[i];
    assert.equal(span.monthId, i + 1);
    assert.equal(diffDaysIso(span.startDate, span.endDate) + 1, span.days);
    assert.ok(span.days >= 29 && span.days <= 32);
    totalDays += span.days;
    if (i > 0) {
      assert.equal(addDaysIso(spans2087[i - 1].endDate, 1), span.startDate);
    }
  }
  assert.ok(totalDays === 365 || totalDays === 366, `Expected 365 or 366 days in Sambat 2087, got ${totalDays}`);

  // Vaisakhi 2030 = 1 Vaisakh, Sambat 2087 + 331st Khalsa Sajna Divas
  const vaisakhi2030 = getJantriDay('2030-04-14');
  assert.equal(vaisakhi2030.solar.sambat, 2087);
  assert.equal(vaisakhi2030.solar.monthId, 2);
  assert.equal(vaisakhi2030.solar.day, 1);
  assert.equal(vaisakhi2030.solar.isSangrand, true);
  assert.ok(
    vaisakhi2030.events.some((e) => /331st.*Khalsa Sajna/i.test(e.titleEn)),
    `Expected 331st Khalsa Sajna Divas on 2030-04-14, got: ${vaisakhi2030.events.map((e) => e.titleEn).join('; ')}`,
  );

  // Sambat 2087 directory includes 561st Parkash Sri Guru Nanak Dev Ji, Vadde & Chhote Sahibzade
  const dir2087 = getDirectoryObservancesForSambat(2087);
  assert.ok(dir2087.length >= 60, `Expected >= 60 directory observances in Sambat 2087, got ${dir2087.length}`);
  assert.ok(
    dir2087.some((o) => /561st.*Guru Nanak/i.test(o.titleEn)),
    'Expected 561st Parkash Purab of Sri Guru Nanak Dev Ji in Sambat 2087',
  );
  assert.ok(
    dir2087.some((o) => /Chamkaur|Ajit Singh/i.test(o.titleEn)),
    'Expected Vadde Sahibzade Shaheedi (8 Poh) in Sambat 2087',
  );
  assert.ok(
    dir2087.some((o) => /Zorawar|Fateh Singh|Sirhind/i.test(o.titleEn)),
    'Expected Chhote Sahibzade Shaheedi (13 Poh) in Sambat 2087',
  );

  // Perpetual .ics export for Sambat 2087
  const ics2087 = generateJantriIcs({
    includeDaily: false,
    includeSangrands: true,
    includePuranmashi: true,
    includeMasya: true,
    includeGurpurabs: true,
    includeShaheedi: true,
    includeKhalsa: true,
    includeBarsis: true,
    sambatScope: '2087',
    language: 'en',
  });
  assert.ok(ics2087.eventCount >= 55, `Expected >= 55 events in Sambat 2087 .ics, got ${ics2087.eventCount}`);
  assert.ok(ics2087.content.includes('331st') && ics2087.content.includes('561st'));
});

test('Daily auto-reset resets active date/month/drawer/Purabs Sambat when calendar day changes while keeping user preferences', () => {
  const defaultsToday = createDefaultPersistedState('2026-11-28', 2083, 9, 2026, 10);
  const yesterdaySaved = JSON.stringify({
    activeView: 'events',
    lang: 'pa',
    theme: 'surmai',
    remindersEnabled: true,
    gridMode: 'gregorian',
    selectedIso: '2026-10-05',
    drawerDateIso: '2026-10-05',
    sangrandYear: 2084,
    directorySambat: '2084',
    lookupInput: '2026-10-05',
  });
  const staleSession = JSON.stringify({
    activeSambat: 2084,
    activeMonthId: 2,
    viewYear: 2027,
    viewMonth0: 3,
  });

  const resetState = parsePersistedState(
    yesterdaySaved,
    defaultsToday,
    null,
    null,
    staleSession,
    '2026-11-27', // Previous calendar day triggers daily auto-reset!
  );
  // Date-specific state resets cleanly to today
  assert.equal(resetState.selectedIso, '2026-11-28');
  assert.equal(resetState.activeSambat, 2083);
  assert.equal(resetState.activeMonthId, 9);
  assert.equal(resetState.viewYear, 2026);
  assert.equal(resetState.viewMonth0, 10);
  assert.equal(resetState.drawerDateIso, null);
  assert.equal(resetState.directorySambat, '2083');
  assert.equal(resetState.lookupInput, '2026-11-28');
  // User preferences are preserved
  assert.equal(resetState.lang, 'pa');
  assert.equal(resetState.theme, 'surmai');
  assert.equal(resetState.remindersEnabled, true);
  assert.equal(resetState.gridMode, 'gregorian');
});

test('Static webcal .ics subscription feeds exist and are valid RFC 5545 calendars', () => {
  const obsPath = join(process.cwd(), 'public', 'feeds', 'puratan-jantri-observances.ics');
  const dailyPath = join(process.cwd(), 'public', 'feeds', 'puratan-jantri-daily.ics');
  assert.equal(existsSync(obsPath), true, 'Missing public/feeds/puratan-jantri-observances.ics');
  assert.equal(existsSync(dailyPath), true, 'Missing public/feeds/puratan-jantri-daily.ics');
  const obsContent = readFileSync(obsPath, 'utf8');
  const dailyContent = readFileSync(dailyPath, 'utf8');
  assert.ok(obsContent.startsWith('BEGIN:VCALENDAR\r\n') && obsContent.includes('END:VCALENDAR\r\n'));
  assert.ok(dailyContent.startsWith('BEGIN:VCALENDAR\r\n') && dailyContent.includes('END:VCALENDAR\r\n'));
  assert.ok(obsContent.includes('557th Parkash'));
});






