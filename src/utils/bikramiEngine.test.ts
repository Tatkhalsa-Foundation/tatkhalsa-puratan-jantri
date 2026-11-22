import assert from 'node:assert/strict';
import test from 'node:test';
import {BARAH_MAHA_PAURIS} from '../data/barahMahaData';
import {resolveCitationReader} from '../data/citationSourcesData';
import {HISTORICAL_EVENTS} from '../data/eventsData';
import {BIKRAMI_MONTHS, POTHI_BARAH_MAHA_URL, POTHI_BASE_URL, SOLAR_MONTH_SPANS} from '../data/sambatData';
import {formatLiveClockSnapshot} from '../hooks/useLiveClock';
import {
  addDaysIso,
  BROWSEABLE_SOLAR_SPANS,
  diffDaysIso,
  formatDualTime,
  getAllDirectoryObservances,
  getBikramiSolarDate,
  getJantriDay,
  getMonthCalendarGrid,
  getNextMilestones,
  getSolarMonthCalendarGrid,
  getSolarMonthSpanIndexForDate,
  lookupGregorianToBikrami,
  toGurmukhiNumerals,
} from './bikramiEngine';
import {generateJantriIcs, generateSingleDayIcs} from './icsExport';
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

  const outOfRange = lookupGregorianToBikrami('2030-01-01');
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

  // Full daily mode: Sambat 2084 = 365 days, Sambat 2083 = 149 days, All = 514 days
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
  assert.equal(daily2083.eventCount, 149);
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
  assert.equal(dailyAll.eventCount, 514);

  const single = generateSingleDayIcs('2026-11-24', 'Katak Puranmashi', '9 Maghar, Sambat 2083');
  assert.ok(single.includes('BEGIN:VEVENT'));
  assert.ok(single.includes('SUMMARY:Katak Puranmashi'));
});

test('All 12 months have complete Barah Maha Majh pauris and pothi.tatkhalsa.in/tabs/pothi deep links', () => {
  for (const month of BIKRAMI_MONTHS) {
    assert.equal(
      month.pothiUrl,
      POTHI_BARAH_MAHA_URL,
      `Expected ${POTHI_BARAH_MAHA_URL} for ${month.nameEn}, got ${month.pothiUrl}`,
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
      ev.pothiUrl!.startsWith(`${POTHI_BASE_URL}/`) && ev.pothiUrl!.length > POTHI_BASE_URL.length + 1,
      `Event ${ev.id} should deep-link past root homepage: ${ev.pothiUrl}`,
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

test('App state persistence defaults Sangrands to Sambat 2083, round-trips all fields, and recovers cleanly from corrupt JSON', () => {
  const defaults = createDefaultPersistedState('2026-11-22', 1, 2026, 10);
  assert.equal(defaults.sangrandYear, 2083);
  assert.equal(defaults.activeView, 'jantri');
  assert.equal(defaults.drawerDateIso, null);

  const saved = JSON.stringify({
    activeView: 'sangrands',
    lang: 'pa',
    gridMode: 'gregorian',
    solarSpanIndex: 6,
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
  const restored = parsePersistedState(saved, defaults);
  assert.equal(restored.activeView, 'sangrands');
  assert.equal(restored.lang, 'pa');
  assert.equal(restored.gridMode, 'gregorian');
  assert.equal(restored.solarSpanIndex, 6);
  assert.equal(restored.drawerDateIso, '2026-11-24');
  assert.equal(restored.sangrandYear, 2084);
  assert.equal(restored.directoryQuery, 'Nanak');
  assert.equal(restored.directoryCategory, 'gurpurab');
  assert.equal(restored.directorySambat, '2083');
  assert.equal(restored.directoryUpcomingOnly, true);
  assert.equal(restored.lookupInput, '2027-04-14');

  // Corrupt JSON and invalid ranges fall back safely to defaults (preserving legacy lang if valid)
  const recovered = parsePersistedState('{broken json', defaults, 'bi');
  assert.equal(recovered.lang, 'bi');
  assert.equal(recovered.activeView, 'jantri');
  assert.equal(recovered.sangrandYear, 2083);

  const sanitized = parsePersistedState(
    JSON.stringify({
      activeView: 'unknown',
      sangrandYear: 1999,
      solarSpanIndex: 999,
      drawerDateIso: '2099-01-01',
    }),
    defaults,
  );
  assert.equal(sanitized.activeView, 'jantri');
  assert.equal(sanitized.sangrandYear, 2083);
  assert.equal(sanitized.solarSpanIndex, 1);
  assert.equal(sanitized.drawerDateIso, null);
});

test('Every historical citation across Sambat 2083–2084 resolves to full Gurmukhi text, English translation, and exact Granth deep link', () => {
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
        reader.exactGranthUrl.startsWith('https://'),
        `Invalid exactGranthUrl for ${ev.id}: ${reader.exactGranthUrl}`,
      );
    }
  }
  assert.ok(totalChecked >= 90, `Expected >= 90 citations verified, got ${totalChecked}`);

  // Spot-check Bandi Chhor citations (Suraj Prakash Raas 5 + Bhai Gurdas Vaar 19 Pauri 6)
  const bandiChhor = HISTORICAL_EVENTS.find((e) => e.id === '2083-bandi-chhor-divas')!;
  const surajReader = resolveCitationReader(bandiChhor.citations[0], bandiChhor);
  assert.match(surajReader.headingEn, /Raas 5, Ansu 26–32/i);
  assert.ok(surajReader.gurmukhiLines.length >= 4);

  const gurdasReader = resolveCitationReader(bandiChhor.citations[1], bandiChhor);
  assert.equal(
    gurdasReader.exactGranthUrl,
    'https://www.searchgurbani.com/bhai-gurdas-vaaran/vaar/19/pauri/6',
  );
  assert.ok(gurdasReader.gurmukhiLines.length >= 6);
});

test('Theme (parchment/surmai/kesri) and 1-day-before reminder toggle persist and sanitize safely', () => {
  const defaults = createDefaultPersistedState('2026-11-22', 1, 2026, 10);
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
  assert.equal(occurrences.length, 2); // Sambat 2083 (2026-11-24) and Sambat 2084 (2027-11-24)
  assert.equal(occurrences[0].isoDate, '2026-11-24');
  assert.equal(occurrences[0].sambat, 2083);

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
  assert.equal(selectiveWithPersonal.eventCount, 2);
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
  assert.equal(dailyWithPersonal.eventCount, 149);
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
  const defaults = createDefaultPersistedState('2026-11-22', 1, 2026, 10);
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
});



