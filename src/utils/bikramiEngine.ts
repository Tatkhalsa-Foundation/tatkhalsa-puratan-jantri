import {EVENTS_BY_DATE, HISTORICAL_EVENTS} from '../data/eventsData';
import {
  BIKRAMI_MONTHS,
  getBikramiMonthMeta,
  GREGORIAN_MONTHS,
  SOLAR_MONTH_SPANS,
  WEEKDAYS,
} from '../data/sambatData';
import type {
  BikramiSolarDate,
  DirectoryObservance,
  DualTimeDisplay,
  JantriDay,
  LanguageMode,
  LunarInfo,
  SolarMonthSpan,
  UpcomingMilestone,
} from '../data/types';
import {computeLunarInfoForDate} from './astronomy';

/**
 * Pure, framework-agnostic Puratan Bikrami Jantri engine.
 * Zero window/document/DOM references — directly reusable in React Native / Capacitor.
 */

const GURMUKHI_DIGITS = ['੦', '੧', '੨', '੩', '੪', '੫', '੬', '੭', '੮', '੯'] as const;

export const SUPPORTED_MIN_MONTH = {year: 2026, monthIndex0: 10}; // November 2026
export const SUPPORTED_MAX_MONTH = {year: 2028, monthIndex0: 2}; // March 2028

/** All browseable Punjabi solar months covering Sambat 2083 (Katak–Phagun) & full Sambat 2084 (Chet–Phagun). */
export const BROWSEABLE_SOLAR_SPANS: readonly SolarMonthSpan[] = SOLAR_MONTH_SPANS.filter(
  (s) => s.sambat === 2083 || s.sambat === 2084,
);

export const LOOKUP_MIN_ISO = SOLAR_MONTH_SPANS[0].startDate; // 2026-10-17
export const LOOKUP_MAX_ISO = SOLAR_MONTH_SPANS[SOLAR_MONTH_SPANS.length - 1].endDate; // 2028-04-12

const lunarCache = new Map<string, LunarInfo>();
let cachedDirectoryObservances: readonly DirectoryObservance[] | null = null;

/** Convert Arabic digits in a number or string to Gurmukhi numerals (0-9 -> ੦-੯). */
export function toGurmukhiNumerals(value: number | string): string {
  return String(value).replace(/\d/g, (digit) => GURMUKHI_DIGITS[Number(digit)]);
}

/** Format a number according to the active language mode. */
export function formatNum(value: number | string, lang: LanguageMode): string {
  return lang === 'pa' ? toGurmukhiNumerals(value) : String(value);
}

/** Convert YYYY-MM-DD into UTC midnight milliseconds. */
export function parseIsoDateUtc(isoDate: string): number {
  const [y, m, d] = isoDate.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
}

/** Format UTC Date parts into YYYY-MM-DD. */
export function toIsoDate(year: number, month1: number, day: number): string {
  const mm = String(month1).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
}

/** Add days to an ISO date string safely in UTC. */
export function addDaysIso(isoDate: string, deltaDays: number): string {
  const ms = parseIsoDateUtc(isoDate) + deltaDays * 86400000;
  const d = new Date(ms);
  return toIsoDate(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
}

/** Difference in whole calendar days: (isoB - isoA). */
export function diffDaysIso(isoA: string, isoB: string): number {
  return Math.round((parseIsoDateUtc(isoB) - parseIsoDateUtc(isoA)) / 86400000);
}

/** Resolve Bikrami solar month, day, Sambat, and Sangrand flag for any ISO date. */
export function getBikramiSolarDate(isoDate: string): BikramiSolarDate {
  for (const span of SOLAR_MONTH_SPANS) {
    if (isoDate >= span.startDate && isoDate <= span.endDate) {
      const day = diffDaysIso(span.startDate, isoDate) + 1;
      return {
        sambat: span.sambat,
        monthId: span.monthId,
        monthMeta: getBikramiMonthMeta(span.monthId),
        day,
        totalDaysInMonth: span.days,
        isSangrand: day === 1,
        sankrantiUtc: span.sankrantiUtc,
      };
    }
  }

  // Fallback for dates outside Sambat 2083–2085 anchor window (e.g. grid boundary padding)
  const firstSpan = SOLAR_MONTH_SPANS[0];
  const lastSpan = SOLAR_MONTH_SPANS[SOLAR_MONTH_SPANS.length - 1];
  if (isoDate < firstSpan.startDate) {
    const daysBefore = diffDaysIso(isoDate, firstSpan.startDate);
    const prevMonthId = ((firstSpan.monthId - 2 + 12) % 12) + 1;
    const estDays = 31;
    const day = Math.max(1, estDays - daysBefore + 1);
    return {
      sambat: firstSpan.sambat,
      monthId: prevMonthId,
      monthMeta: getBikramiMonthMeta(prevMonthId),
      day,
      totalDaysInMonth: estDays,
      isSangrand: day === 1,
      sankrantiUtc: firstSpan.sankrantiUtc,
    };
  }

  const daysAfter = diffDaysIso(lastSpan.endDate, isoDate);
  const nextMonthId = (lastSpan.monthId % 12) + 1;
  return {
    sambat: lastSpan.sambat,
    monthId: nextMonthId,
    monthMeta: getBikramiMonthMeta(nextMonthId),
    day: Math.max(1, daysAfter),
    totalDaysInMonth: 31,
    isSangrand: daysAfter === 1,
    sankrantiUtc: lastSpan.sankrantiUtc,
  };
}

/** Cached lunar tithi info lookup for a date. */
export function getLunarInfoCached(isoDate: string): LunarInfo {
  let info = lunarCache.get(isoDate);
  if (!info) {
    info = computeLunarInfoForDate(isoDate);
    lunarCache.set(isoDate, info);
  }
  return info;
}

/** Build full Puratan Jantri Day record for an ISO date. */
export function getJantriDay(isoDate: string, inCurrentGridMonth = true): JantriDay {
  const [gregorianYear, gregorianMonth, gregorianDay] = isoDate.split('-').map(Number);
  const weekdayIndex = new Date(Date.UTC(gregorianYear, gregorianMonth - 1, gregorianDay)).getUTCDay();
  const solar = getBikramiSolarDate(isoDate);
  const lunar = getLunarInfoCached(isoDate);
  const events = EVENTS_BY_DATE.get(isoDate) ?? [];

  return {
    isoDate,
    gregorianYear,
    gregorianMonth,
    gregorianDay,
    weekdayIndex,
    inCurrentGridMonth,
    solar,
    lunar,
    events,
  };
}

/** Find index inside BROWSEABLE_SOLAR_SPANS for a given ISO date (clamped to valid range). */
export function getSolarMonthSpanIndexForDate(isoDate: string): number {
  for (let i = 0; i < BROWSEABLE_SOLAR_SPANS.length; i++) {
    const span = BROWSEABLE_SOLAR_SPANS[i];
    if (isoDate >= span.startDate && isoDate <= span.endDate) {
      return i;
    }
  }
  if (isoDate < BROWSEABLE_SOLAR_SPANS[0].startDate) return 0;
  return BROWSEABLE_SOLAR_SPANS.length - 1;
}

/**
 * Generate a 7-column calendar grid (Sunday to Saturday) organized by a Punjabi Solar Month
 * (1st Sangrand through 29/30/31/32 solar days, with leading/trailing days dimmed).
 */
export function getSolarMonthCalendarGrid(spanIndex: number): JantriDay[] {
  const clamped = Math.max(0, Math.min(BROWSEABLE_SOLAR_SPANS.length - 1, spanIndex));
  const span = BROWSEABLE_SOLAR_SPANS[clamped];
  const [startY, startM, startD] = span.startDate.split('-').map(Number);
  const startWeekday = new Date(Date.UTC(startY, startM - 1, startD)).getUTCDay(); // 0 = Sun
  const totalCells = startWeekday + span.days > 35 ? 42 : 35;

  const gridStartIso = addDaysIso(span.startDate, -startWeekday);
  const cells: JantriDay[] = [];
  for (let i = 0; i < totalCells; i++) {
    const iso = addDaysIso(gridStartIso, i);
    const inCurrentGridMonth = i >= startWeekday && i < startWeekday + span.days;
    cells.push(getJantriDay(iso, inCurrentGridMonth));
  }
  return cells;
}

/** Describe the Gregorian date span covered by a Punjabi Solar Month (e.g. "16 Nov – 15 Dec 2026"). */
export function getGregorianHeaderForSolarSpan(span: SolarMonthSpan, lang: LanguageMode): string {
  const [sy, sm, sd] = span.startDate.split('-').map(Number);
  const [ey, em, ed] = span.endDate.split('-').map(Number);
  const sMonth = GREGORIAN_MONTHS[sm - 1];
  const eMonth = GREGORIAN_MONTHS[em - 1];

  if (lang === 'pa') {
    if (sy === ey) {
      return `${toGurmukhiNumerals(sd)} ${sMonth.pa} – ${toGurmukhiNumerals(ed)} ${eMonth.pa} ${toGurmukhiNumerals(ey)}`;
    }
    return `${toGurmukhiNumerals(sd)} ${sMonth.pa} ${toGurmukhiNumerals(sy)} – ${toGurmukhiNumerals(ed)} ${eMonth.pa} ${toGurmukhiNumerals(ey)}`;
  }

  if (sy === ey) {
    return `${sd} ${sMonth.shortEn} – ${ed} ${eMonth.shortEn} ${ey}`;
  }
  return `${sd} ${sMonth.shortEn} ${sy} – ${ed} ${eMonth.shortEn} ${ey}`;
}

/** Format a compact Gregorian sub-label for a calendar cell (e.g., "24 Nov" or "੨੪ ਨਵੰ"). */
export function formatShortGregorian(day: JantriDay, lang: LanguageMode): string {
  const gm = GREGORIAN_MONTHS[day.gregorianMonth - 1];
  if (lang === 'pa') {
    return `${toGurmukhiNumerals(day.gregorianDay)} ${gm.shortPa}`;
  }
  return `${day.gregorianDay} ${gm.shortEn}`;
}

/**
 * Generate a clean 7-column calendar grid (Sunday to Saturday) for a Gregorian month.
 * Returns 35 or 42 JantriDay entries depending on month span.
 */
export function getMonthCalendarGrid(year: number, monthIndex0: number): JantriDay[] {
  const firstOfMonth = new Date(Date.UTC(year, monthIndex0, 1));
  const startWeekday = firstOfMonth.getUTCDay(); // 0 = Sun
  const daysInMonth = new Date(Date.UTC(year, monthIndex0 + 1, 0)).getUTCDate();
  const totalCells = startWeekday + daysInMonth > 35 ? 42 : 35;

  const firstIso = toIsoDate(year, monthIndex0 + 1, 1);
  const gridStartIso = addDaysIso(firstIso, -startWeekday);

  const cells: JantriDay[] = [];
  for (let i = 0; i < totalCells; i++) {
    const iso = addDaysIso(gridStartIso, i);
    const inCurrentGridMonth = i >= startWeekday && i < startWeekday + daysInMonth;
    cells.push(getJantriDay(iso, inCurrentGridMonth));
  }
  return cells;
}

/** Describe which Bikrami solar months & Sambats overlap a Gregorian month (e.g. "Katak – Maghar 2083"). */
export function getBikramiHeaderForGregorianMonth(
  year: number,
  monthIndex0: number,
  lang: LanguageMode,
): string {
  const firstIso = toIsoDate(year, monthIndex0 + 1, 1);
  const lastDay = new Date(Date.UTC(year, monthIndex0 + 1, 0)).getUTCDate();
  const lastIso = toIsoDate(year, monthIndex0 + 1, lastDay);

  const firstSolar = getBikramiSolarDate(firstIso);
  const lastSolar = getBikramiSolarDate(lastIso);

  if (lang === 'pa') {
    if (firstSolar.monthId === lastSolar.monthId) {
      return `${firstSolar.monthMeta.namePa} · ਸੰਮਤ ${toGurmukhiNumerals(firstSolar.sambat)}`;
    }
    if (firstSolar.sambat === lastSolar.sambat) {
      return `${firstSolar.monthMeta.namePa} – ${lastSolar.monthMeta.namePa} · ਸੰਮਤ ${toGurmukhiNumerals(firstSolar.sambat)}`;
    }
    return `${firstSolar.monthMeta.namePa} ${toGurmukhiNumerals(firstSolar.sambat)} – ${lastSolar.monthMeta.namePa} ${toGurmukhiNumerals(lastSolar.sambat)}`;
  }

  if (firstSolar.monthId === lastSolar.monthId) {
    return `${firstSolar.monthMeta.nameEn} · Sambat ${firstSolar.sambat}`;
  }
  if (firstSolar.sambat === lastSolar.sambat) {
    return `${firstSolar.monthMeta.nameEn} – ${lastSolar.monthMeta.nameEn} · Sambat ${firstSolar.sambat}`;
  }
  return `${firstSolar.monthMeta.nameEn} ${firstSolar.sambat} – ${lastSolar.monthMeta.nameEn} ${lastSolar.sambat}`;
}

/** Validate and convert any Gregorian ISO date into a verified Puratan Bikrami JantriDay. */
export function lookupGregorianToBikrami(
  isoDate: string,
): {ok: true; day: JantriDay} | {ok: false; errorEn: string; errorPa: string} {
  const trimmed = isoDate.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return {
      ok: false,
      errorEn: 'Enter a valid date in YYYY-MM-DD format.',
      errorPa: 'ਕਿਰਪਾ ਕਰਕੇ YYYY-MM-DD ਫਾਰਮੈਟ ਵਿੱਚ ਸਹੀ ਤਾਰੀਖ਼ ਦਰਜ ਕਰੋ।',
    };
  }
  const [y, m, d] = trimmed.split('-').map(Number);
  const check = new Date(Date.UTC(y, m - 1, d));
  if (
    check.getUTCFullYear() !== y ||
    check.getUTCMonth() + 1 !== m ||
    check.getUTCDate() !== d
  ) {
    return {
      ok: false,
      errorEn: 'That calendar date does not exist.',
      errorPa: 'ਇਹ ਕੈਲੰਡਰ ਤਾਰੀਖ਼ ਮੌਜੂਦ ਨਹੀਂ ਹੈ।',
    };
  }
  if (trimmed < LOOKUP_MIN_ISO || trimmed > LOOKUP_MAX_ISO) {
    return {
      ok: false,
      errorEn: 'Verified Puratan Sambat 2083–2084 data covers 17 Oct 2026 to 12 Apr 2028.',
      errorPa: 'ਪ੍ਰਮਾਣਿਕ ਸੰਮਤ ੨੦੮੩–੨੦੮੪ ਡਾਟਾ ੧੭ ਅਕਤੂਬਰ ੨੦੨੬ ਤੋਂ ੧੨ ਅਪ੍ਰੈਲ ੨੦੨੮ ਤੱਕ ਉਪਲਬਧ ਹੈ।',
    };
  }
  return {ok: true, day: getJantriDay(trimmed, true)};
}

/**
 * Build a unified, chronologically sorted directory of all Gurpurabs, Shaheedi Divases,
 * Khalsa/Colophon dates, Sangrands, Puranmashis, and Masyas across Sambat 2083–2084.
 */
export function getAllDirectoryObservances(): readonly DirectoryObservance[] {
  if (cachedDirectoryObservances) {
    return cachedDirectoryObservances;
  }

  const items: DirectoryObservance[] = [];

  // 1. Historical Gurpurabs, Shaheedi Divases, Khalsa & Manuscript Colophons
  for (const ev of HISTORICAL_EVENTS) {
    items.push({
      id: ev.id,
      date: ev.date,
      sambat: ev.sambat,
      category: ev.category,
      titleEn: ev.titleEn,
      titlePa: ev.titlePa,
      ruleEn: ev.tithiRuleEn,
      rulePa: ev.tithiRulePa,
      summaryEn: ev.summaryEn,
      summaryPa: ev.summaryPa,
      citationCount: ev.citations.length,
      sourceSearchText: ev.citations
        .map((c) => `${c.sourceEn} ${c.sourcePa} ${c.referenceEn} ${c.referencePa}`)
        .join(' '),
      pothiUrl: ev.pothiUrl ?? ev.citations.find((c) => c.pothiUrl)?.pothiUrl,
    });
  }

  // 2. All Verified Sangrands (Sambat 2083 & 2084)
  for (const span of BROWSEABLE_SOLAR_SPANS) {
    const meta = getBikramiMonthMeta(span.monthId);
    items.push({
      id: `dir-sangrand-${span.sambat}-${meta.key}`,
      date: span.startDate,
      sambat: span.sambat,
      category: 'sangrand',
      titleEn: `${meta.nameEn} Sangrand — 1 ${meta.nameEn}, Sambat ${span.sambat}`,
      titlePa: `${meta.namePa} ਸੰਗਰਾਂਦ — ੧ ${meta.namePa}, ਸੰਮਤ ${toGurmukhiNumerals(span.sambat)}`,
      ruleEn: `Solar Ingress · ${span.days} days (${meta.seasonEn})`,
      rulePa: `ਸੂਰਜੀ ਸੰਕ੍ਰਾਂਤੀ · ${toGurmukhiNumerals(span.days)} ਦਿਨ (${meta.seasonPa})`,
      summaryEn: `${meta.barahMahaRefEn} — "${meta.barahMahaOpeningTranslit}"`,
      summaryPa: `${meta.barahMahaRefPa} — "${meta.barahMahaOpeningPa}"`,
      citationCount: 1,
      sourceSearchText: `${meta.nameEn} ${meta.namePa} Sangrand Barah Maha ${meta.barahMahaRefEn}`,
      pothiUrl: meta.pothiUrl,
    });
  }

  // 3. All Puranmashi and Masya dates across Sambat 2083–2084 (1 Katak 2083 / Oct 17, 2026 – 30 Phagun 2084 / Mar 13, 2028)
  let cursor = '2026-10-17';
  const endDate = '2028-03-13';
  while (cursor <= endDate) {
    const solar = getBikramiSolarDate(cursor);
    const lunar = getLunarInfoCached(cursor);
    if (lunar.isPuranmashi) {
      items.push({
        id: `dir-puranmashi-${cursor}`,
        date: cursor,
        sambat: solar.sambat,
        category: 'puranmashi',
        titleEn: `${lunar.lunarMonthEn} Puranmashi (Full Moon)`,
        titlePa: `${lunar.lunarMonthPa} ਪੂਰਨਮਾਸ਼ੀ`,
        ruleEn: `${lunar.lunarMonthEn} Sudhi 15 · ${solar.day} ${solar.monthMeta.nameEn}`,
        rulePa: `${lunar.lunarMonthPa} ਸੁਦੀ ੧੫ · ${toGurmukhiNumerals(solar.day)} ${solar.monthMeta.namePa}`,
        summaryEn: `Full moon observance of the ${lunar.lunarMonthEn} Purnimanta lunar month in Sambat ${solar.sambat}.`,
        summaryPa: `ਸੰਮਤ ${toGurmukhiNumerals(solar.sambat)} ਦੇ ${lunar.lunarMonthPa} ਚੰਦਰ ਮਹੀਨੇ ਦੀ ਪੂਰਨਮਾਸ਼ੀ (ਸੁਦੀ ੧੫)।`,
        citationCount: 0,
        sourceSearchText: `${lunar.lunarMonthEn} ${lunar.lunarMonthPa} Puranmashi full moon Sudhi 15`,
      });
    } else if (lunar.isMasya) {
      items.push({
        id: `dir-masya-${cursor}`,
        date: cursor,
        sambat: solar.sambat,
        category: 'masya',
        titleEn: `${lunar.lunarMonthEn} Masya (New Moon)`,
        titlePa: `${lunar.lunarMonthPa} ਮੱਸਿਆ`,
        ruleEn: `${lunar.lunarMonthEn} Vadhi 15 · ${solar.day} ${solar.monthMeta.nameEn}`,
        rulePa: `${lunar.lunarMonthPa} ਵਦੀ ੧੫ · ${toGurmukhiNumerals(solar.day)} ${solar.monthMeta.namePa}`,
        summaryEn: `Amavasya / Masya new moon observance of ${lunar.lunarMonthEn} lunar month in Sambat ${solar.sambat}.`,
        summaryPa: `ਸੰਮਤ ${toGurmukhiNumerals(solar.sambat)} ਦੇ ${lunar.lunarMonthPa} ਚੰਦਰ ਮਹੀਨੇ ਦੀ ਮੱਸਿਆ (ਵਦੀ ੧੫)।`,
        citationCount: 0,
        sourceSearchText: `${lunar.lunarMonthEn} ${lunar.lunarMonthPa} Masya Amavasya new moon Vadhi 15`,
      });
    }
    cursor = addDaysIso(cursor, 1);
  }

  const categoryPriority: Record<DirectoryObservance['category'], number> = {
    gurpurab: 1,
    shaheedi: 2,
    khalsa: 3,
    barsi: 4,
    sangrand: 5,
    puranmashi: 6,
    masya: 7,
  };

  items.sort((a, b) => {
    const cmp = a.date.localeCompare(b.date);
    if (cmp !== 0) return cmp;
    return categoryPriority[a.category] - categoryPriority[b.category];
  });

  cachedDirectoryObservances = items;
  return items;
}

/** Find next upcoming Sangrand, Puranmashi, and Masya from a given ISO date (inclusive if today is the milestone). */
export function getNextMilestones(fromIsoDate: string): {
  sangrand: UpcomingMilestone | null;
  puranmashi: UpcomingMilestone | null;
  masya: UpcomingMilestone | null;
} {
  let sangrand: UpcomingMilestone | null = null;
  let puranmashi: UpcomingMilestone | null = null;
  let masya: UpcomingMilestone | null = null;

  // Find next Sangrand from verified solar month spans
  for (const span of SOLAR_MONTH_SPANS) {
    if (span.startDate >= fromIsoDate) {
      const meta = getBikramiMonthMeta(span.monthId);
      sangrand = {
        kind: 'sangrand',
        isoDate: span.startDate,
        daysRemaining: diffDaysIso(fromIsoDate, span.startDate),
        titleEn: `${meta.nameEn} Sangrand`,
        titlePa: `${meta.namePa} ਸੰਗਰਾਂਦ`,
        bikramiLabelEn: `1 ${meta.nameEn}, Sambat ${span.sambat}`,
        bikramiLabelPa: `੧ ${meta.namePa}, ਸੰਮਤ ${toGurmukhiNumerals(span.sambat)}`,
        transitionUtc: span.sankrantiUtc,
      };
      break;
    }
  }

  // Scan up to 35 days ahead for next Puranmashi and next Masya
  for (let offset = 0; offset <= 35; offset++) {
    const iso = addDaysIso(fromIsoDate, offset);
    const lunar = getLunarInfoCached(iso);
    if (!puranmashi && lunar.isPuranmashi) {
      const solar = getBikramiSolarDate(iso);
      puranmashi = {
        kind: 'puranmashi',
        isoDate: iso,
        daysRemaining: offset,
        titleEn: `${lunar.lunarMonthEn} Puranmashi`,
        titlePa: `${lunar.lunarMonthPa} ਪੂਰਨਮਾਸ਼ੀ`,
        bikramiLabelEn: `${solar.day} ${solar.monthMeta.nameEn}, Sambat ${solar.sambat}`,
        bikramiLabelPa: `${toGurmukhiNumerals(solar.day)} ${solar.monthMeta.namePa}, ਸੰਮਤ ${toGurmukhiNumerals(solar.sambat)}`,
        transitionUtc: lunar.tithiEndsAtUtc,
      };
    }
    if (!masya && lunar.isMasya) {
      const solar = getBikramiSolarDate(iso);
      masya = {
        kind: 'masya',
        isoDate: iso,
        daysRemaining: offset,
        titleEn: `${lunar.lunarMonthEn} Masya`,
        titlePa: `${lunar.lunarMonthPa} ਮੱਸਿਆ`,
        bikramiLabelEn: `${solar.day} ${solar.monthMeta.nameEn}, Sambat ${solar.sambat}`,
        bikramiLabelPa: `${toGurmukhiNumerals(solar.day)} ${solar.monthMeta.namePa}, ਸੰਮਤ ${toGurmukhiNumerals(solar.sambat)}`,
        transitionUtc: lunar.tithiEndsAtUtc,
      };
    }
    if (puranmashi && masya) break;
  }

  return {sangrand, puranmashi, masya};
}

/**
 * Pure Dual-Time Formatter: formats any UTC timestamp simultaneously in
 * Sri Anandpur Sahib (IST / Asia/Kolkata) and a supplied local IANA timezone.
 */
export function formatDualTime(utcIso: string, localTimeZone?: string): DualTimeDisplay {
  const date = new Date(utcIso);
  const resolvedLocalTz =
    localTimeZone ||
    (typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC') ||
    'UTC';

  const amritsarTime = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);

  const amritsarDate = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'short',
  }).format(date);

  const localTime = new Intl.DateTimeFormat('en-US', {
    timeZone: resolvedLocalTz,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);

  const localDate = new Intl.DateTimeFormat('en-US', {
    timeZone: resolvedLocalTz,
    day: 'numeric',
    month: 'short',
  }).format(date);

  let localTimeZoneName = resolvedLocalTz;
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: resolvedLocalTz,
      timeZoneName: 'short',
    }).formatToParts(date);
    const tzPart = parts.find((p) => p.type === 'timeZoneName')?.value;
    if (tzPart) {
      const city = resolvedLocalTz.split('/').pop()?.replace(/_/g, ' ') || resolvedLocalTz;
      localTimeZoneName =
        city.toUpperCase() === tzPart.toUpperCase() ? tzPart : `${city} (${tzPart})`;
    }
  } catch {
    localTimeZoneName = resolvedLocalTz;
  }

  const isSameZone = resolvedLocalTz === 'Asia/Kolkata' || resolvedLocalTz === 'Asia/Calcutta';

  return {
    amritsarTime,
    amritsarDate,
    localTime,
    localDate,
    localTimeZoneName,
    isSameZone,
  };
}

/** Format a Gregorian ISO date cleanly in English, Gurmukhi, or Bilingual. */
export function formatGregorianDate(isoDate: string, lang: LanguageMode, includeWeekday = true): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  const weekdayIndex = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  const wd = WEEKDAYS[weekdayIndex];
  const gm = GREGORIAN_MONTHS[m - 1];

  if (lang === 'pa') {
    const core = `${toGurmukhiNumerals(d)} ${gm.pa} ${toGurmukhiNumerals(y)}`;
    return includeWeekday ? `${wd.fullPa}, ${core}` : core;
  }
  const core = `${d} ${gm.en} ${y}`;
  if (lang === 'bi' && includeWeekday) {
    return `${wd.fullEn} (${wd.fullPa}), ${core}`;
  }
  return includeWeekday ? `${wd.fullEn}, ${core}` : core;
}

/** Resolve the best default "Ajj Da Din" date inside the Sambat 2083–2084 window. */
export function getEffectiveTodayIso(referenceDate: Date = new Date()): string {
  const y = referenceDate.getFullYear();
  const m = referenceDate.getMonth() + 1;
  const d = referenceDate.getDate();
  const iso = toIsoDate(y, m, d);
  // If browser clock is within our verified Sambat 2083–2084 span (Oct 17, 2026 – Mar 31, 2028), use exact today;
  // otherwise clamp gracefully to Nov 21, 2026 (3 days before 557th Parkash Purab of Sri Guru Nanak Dev Ji).
  if (iso >= '2026-10-17' && iso <= '2028-03-31') {
    return iso;
  }
  return '2026-11-21';
}

export function getAllSolarMonthsMeta() {
  return BIKRAMI_MONTHS;
}
