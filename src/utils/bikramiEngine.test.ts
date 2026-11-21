import assert from 'node:assert/strict';
import test from 'node:test';
import {SOLAR_MONTH_SPANS} from '../data/sambatData';
import {
  addDaysIso,
  diffDaysIso,
  formatDualTime,
  getBikramiSolarDate,
  getJantriDay,
  getMonthCalendarGrid,
  getNextMilestones,
  toGurmukhiNumerals,
} from './bikramiEngine';
import {generateJantriIcs, generateSingleDayIcs} from './icsExport';

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
  // 16 months -> 16 Puranmashis and 16 Masyas
  assert.ok(puranmashiCount >= 15 && puranmashiCount <= 17, `Expected 15-17 Puranmashis, got ${puranmashiCount}`);
  assert.ok(masyaCount >= 15 && masyaCount <= 17, `Expected 15-17 Masyas, got ${masyaCount}`);
});

test('Monthly calendar grid returns complete Sunday-to-Saturday weeks and Gurmukhi numeral conversion works', () => {
  const grid = getMonthCalendarGrid(2026, 10); // Nov 2026
  assert.equal(grid.length % 7, 0);
  assert.equal(grid[0].weekdayIndex, 0); // Sunday
  assert.equal(grid[grid.length - 1].weekdayIndex, 6); // Saturday
  assert.equal(toGurmukhiNumerals(2083), '੨੦੮੩');
  assert.equal(toGurmukhiNumerals('9 Maghar'), '੯ Maghar');
});

test('Dual-time formatting converts Sri Amritsar Sahib (IST) alongside external browser timezone', () => {
  const dual = formatDualTime('2026-11-24T14:55:00Z', 'America/Los_Angeles');
  assert.equal(dual.isSameZone, false);
  assert.match(dual.amritsarTime, /8:25|08:25/i);
  assert.match(dual.localTime, /6:55|06:55/i);
});

test('RFC 5545 .ics export generates valid VCALENDAR with Sangrands, Puranmashi, Masya, and Gurpurabs', () => {
  const result = generateJantriIcs({
    includeSangrands: true,
    includePuranmashi: true,
    includeMasya: true,
    includeGurpurabs: true,
    includeShaheedi: true,
    includeKhalsa: true,
    sambatScope: 'all',
    language: 'en',
  });
  assert.ok(result.eventCount > 45);
  assert.ok(result.content.startsWith('BEGIN:VCALENDAR\r\n'));
  assert.ok(result.content.includes('END:VCALENDAR\r\n'));
  assert.ok(result.content.includes('557th Parkash Purab'));
  assert.ok(result.content.includes('DTSTART;VALUE=DATE:20261124'));

  const single = generateSingleDayIcs('2026-11-24', 'Katak Puranmashi', '9 Maghar, Sambat 2083');
  assert.ok(single.includes('BEGIN:VEVENT'));
  assert.ok(single.includes('SUMMARY:Katak Puranmashi'));
});
