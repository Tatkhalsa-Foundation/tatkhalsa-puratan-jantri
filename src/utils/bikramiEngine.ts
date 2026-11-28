import {EVENTS_BY_DATE, HISTORICAL_EVENTS} from '../data/eventsData';
import {PRECOMPUTED_LUNAR_2082_2084} from '../data/precomputedLunar2082_2084';
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
  HistoricalEvent,
  JantriDay,
  LanguageMode,
  LunarInfo,
  SolarMonthSpan,
  UpcomingMilestone,
} from '../data/types';
import {
  computeLunarInfoForDate,
  computeSolarMonthSpansForSambat,
  decodeCompactLunarTuple,
} from './astronomy';
import {getEventsForDateInSambat, getHistoricalEventsForSambat} from './perpetualEvents';

/**
 * Pure, framework-agnostic perpetual Puratan Bikrami Jantri engine.
 * Zero window/document/DOM references — directly reusable in React Native / Capacitor.
 *
 * - Sambat 2082–2084 uses verified authoritative Sangrands, verified Historical Events,
 *   and build-time precomputed lunar tithi tuples for near-zero main-thread blocking (TBT).
 * - Any other Sambat year (1957–2207 / 1900–2150 CE, including 2030+) computes sidereal
 *   Sankrantis, lunar tithis, and rule-based Purabs dynamically on demand with per-year caching.
 */

const GURMUKHI_DIGITS = ['੦', '੧', '੨', '੩', '੪', '੫', '੬', '੭', '੮', '੯'] as const;

export const MIN_PERPETUAL_SAMBAT = 1957; // 1900 CE
export const MAX_PERPETUAL_SAMBAT = 2207; // 2150 CE

export const SUPPORTED_MIN_MONTH = {year: 1900, monthIndex0: 0}; // Jan 1900
export const SUPPORTED_MAX_MONTH = {year: 2150, monthIndex0: 11}; // Dec 2150

/** Verified Punjabi solar months covering full Sambat 2082, 2083 & 2084 (Chet–Phagun each year). */
export const BROWSEABLE_SOLAR_SPANS: readonly SolarMonthSpan[] = SOLAR_MONTH_SPANS.filter(
  (s) => s.sambat === 2082 || s.sambat === 2083 || s.sambat === 2084,
);

export const VERIFIED_MIN_ISO = SOLAR_MONTH_SPANS[0].startDate; // 2025-03-14
export const VERIFIED_MAX_ISO = SOLAR_MONTH_SPANS[SOLAR_MONTH_SPANS.length - 1].endDate; // 2028-04-12

export const LOOKUP_MIN_ISO = '1900-01-01';
export const LOOKUP_MAX_ISO = '2150-12-31';

const lunarCache = new Map<string, LunarInfo>();
const solarSpansBySambatCache = new Map<number, readonly SolarMonthSpan[]>();
const directoryBySambatCache = new Map<number, readonly DirectoryObservance[]>();
let cachedDirectoryObservances: readonly DirectoryObservance[] | null = null;

// Seed verified Sambat 2082, 2083, and 2084 into cache immediately
for (const verifiedYear of [2082, 2083, 2084]) {
  solarSpansBySambatCache.set(
    verifiedYear,
    SOLAR_MONTH_SPANS.filter((s) => s.sambat === verifiedYear),
  );
}

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

/**
 * Return all 12 Puratan Bikrami solar month spans (Chet through Phagun) for ANY Sambat year.
 * Returns verified static spans for Sambat 2082–2084; computes and caches astronomically for all other years.
 */
export function getSolarMonthSpansForSambat(sambat: number): readonly SolarMonthSpan[] {
  const clamped = Math.max(MIN_PERPETUAL_SAMBAT, Math.min(MAX_PERPETUAL_SAMBAT, Math.trunc(sambat)));
  let cached = solarSpansBySambatCache.get(clamped);
  if (!cached) {
    cached = computeSolarMonthSpansForSambat(clamped);
    solarSpansBySambatCache.set(clamped, cached);
  }
  return cached;
}

/** Return the SolarMonthSpan for a specific (sambat, monthId 1..12). */
export function getSolarMonthSpanByYearMonth(sambat: number, monthId: number): SolarMonthSpan {
  const spans = getSolarMonthSpansForSambat(sambat);
  const idx = Math.max(0, Math.min(11, monthId - 1));
  return spans[idx];
}

/** Step a (sambat, monthId 1..12) forward or backward by `delta` months, clamped to perpetual bounds. */
export function stepSolarYearMonth(
  sambat: number,
  monthId: number,
  delta: number,
): {sambat: number; monthId: number} {
  const total = sambat * 12 + (monthId - 1) + delta;
  const minTotal = MIN_PERPETUAL_SAMBAT * 12;
  const maxTotal = MAX_PERPETUAL_SAMBAT * 12 + 11;
  const clamped = Math.max(minTotal, Math.min(maxTotal, total));
  return {
    sambat: Math.floor(clamped / 12),
    monthId: (clamped % 12) + 1,
  };
}

/** Resolve Bikrami solar month, day, Sambat, and Sangrand flag for ANY Gregorian ISO date (1900–2150+). */
export function getBikramiSolarDate(isoDate: string): BikramiSolarDate {
  // Fast path: verified Sambat 2082–2084 window (plus Chet 2085 anchor)
  if (isoDate >= VERIFIED_MIN_ISO && isoDate <= VERIFIED_MAX_ISO) {
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
  }

  // Perpetual astronomical lookup for any other year
  const [gregYear, gregMonth] = isoDate.split('-').map(Number);
  // Jan–Mar can belong to Sambat (gregYear + 56) or (gregYear + 57); Apr–Dec belongs to (gregYear + 57)
  const candidates = gregMonth <= 3 ? [gregYear + 56, gregYear + 57] : [gregYear + 57, gregYear + 56];

  for (const candidateSambat of candidates) {
    const spans = getSolarMonthSpansForSambat(candidateSambat);
    for (const span of spans) {
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
  }

  // Extreme edge fallback (outside 1900–2150)
  const fallbackSpan = getSolarMonthSpansForSambat(
    Math.max(MIN_PERPETUAL_SAMBAT, Math.min(MAX_PERPETUAL_SAMBAT, gregYear + 57)),
  )[0];
  return {
    sambat: fallbackSpan.sambat,
    monthId: fallbackSpan.monthId,
    monthMeta: getBikramiMonthMeta(fallbackSpan.monthId),
    day: 1,
    totalDaysInMonth: fallbackSpan.days,
    isSangrand: true,
    sankrantiUtc: fallbackSpan.sankrantiUtc,
  };
}

/** O(1) cached lunar tithi lookup: hits precomputed table for Sambat 2082–2084, falls back to Meeus for other years. */
export function getLunarInfoCached(isoDate: string): LunarInfo {
  let info = lunarCache.get(isoDate);
  if (!info) {
    const precomputed = PRECOMPUTED_LUNAR_2082_2084[isoDate];
    if (precomputed) {
      info = decodeCompactLunarTuple(isoDate, precomputed);
    } else {
      info = computeLunarInfoForDate(isoDate);
    }
    lunarCache.set(isoDate, info);
  }
  return info;
}

/** Resolve all historical/projected Purab events for a date in any Sambat year. */
export function getEventsForDate(isoDate: string, sambat?: number): HistoricalEvent[] {
  const resolvedSambat = sambat ?? getBikramiSolarDate(isoDate).sambat;
  if (resolvedSambat === 2082 || resolvedSambat === 2083 || resolvedSambat === 2084) {
    return EVENTS_BY_DATE.get(isoDate) ?? [];
  }
  return getEventsForDateInSambat(
    isoDate,
    resolvedSambat,
    getSolarMonthSpansForSambat(resolvedSambat),
    getLunarInfoCached,
  );
}

/** Get all HistoricalEvents for a specific Sambat year (verified for 2082–2084, rule-projected for other years). */
export function getAllEventsForSambat(sambat: number): readonly HistoricalEvent[] {
  return getHistoricalEventsForSambat(
    sambat,
    getSolarMonthSpansForSambat(sambat),
    getLunarInfoCached,
  );
}

/** Build full Puratan Jantri Day record for any ISO date. */
export function getJantriDay(isoDate: string, inCurrentGridMonth = true): JantriDay {
  const [gregorianYear, gregorianMonth, gregorianDay] = isoDate.split('-').map(Number);
  const weekdayIndex = new Date(Date.UTC(gregorianYear, gregorianMonth - 1, gregorianDay)).getUTCDay();
  const solar = getBikramiSolarDate(isoDate);
  const lunar = getLunarInfoCached(isoDate);
  const events = getEventsForDate(isoDate, solar.sambat);

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
 * for ANY Bikrami Sambat year and monthId (1..12).
 */
export function getSolarMonthCalendarGridByYearMonth(sambat: number, monthId: number): JantriDay[] {
  const span = getSolarMonthSpanByYearMonth(sambat, monthId);
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

/** Backwards-compatible index-based solar month grid for Sambat 2082–2084. */
export function getSolarMonthCalendarGrid(spanIndex: number): JantriDay[] {
  const clamped = Math.max(0, Math.min(BROWSEABLE_SOLAR_SPANS.length - 1, spanIndex));
  const span = BROWSEABLE_SOLAR_SPANS[clamped];
  return getSolarMonthCalendarGridByYearMonth(span.sambat, span.monthId);
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
 * Generate a clean 7-column calendar grid (Sunday to Saturday) for ANY Gregorian month.
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

/** Validate and convert ANY Gregorian ISO date (1900–2150) into a Puratan Bikrami JantriDay. */
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
      errorEn: 'Perpetual Puratan Bikrami lookup supports years 1900 through 2150 CE.',
      errorPa: 'ਨਿਰੰਤਰ ਪੁਰਾਤਨ ਬਿਕ੍ਰਮੀ ਖੋਜ ੧੯੦੦ ਤੋਂ ੨੧੫੦ ਈ. ਤੱਕ ਉਪਲਬਧ ਹੈ।',
    };
  }
  return {ok: true, day: getJantriDay(trimmed, true)};
}

const CATEGORY_PRIORITY: Record<DirectoryObservance['category'], number> = {
  gurpurab: 1,
  shaheedi: 2,
  khalsa: 3,
  barsi: 4,
  sangrand: 5,
  puranmashi: 6,
  masya: 7,
};

/** Build a chronologically sorted directory of all observances for a single Bikrami Sambat year (perpetual). */
export function getDirectoryObservancesForSambat(sambat: number): readonly DirectoryObservance[] {
  const cached = directoryBySambatCache.get(sambat);
  if (cached) return cached;

  const items: DirectoryObservance[] = [];
  const spans = getSolarMonthSpansForSambat(sambat);
  const events = getAllEventsForSambat(sambat);

  for (const ev of events) {
    items.push({
      id: ev.id,
      date: ev.date,
      sambat: ev.sambat,
      category: ev.category,
      subGroups: ev.subGroups,
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

  for (const span of spans) {
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

  if (spans.length > 0) {
    let cursor = spans[0].startDate;
    const endDate = spans[spans.length - 1].endDate;
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
  }

  items.sort((a, b) => {
    const cmp = a.date.localeCompare(b.date);
    if (cmp !== 0) return cmp;
    return CATEGORY_PRIORITY[a.category] - CATEGORY_PRIORITY[b.category];
  });

  directoryBySambatCache.set(sambat, items);
  return items;
}

/**
 * Build a unified, chronologically sorted directory across verified Sambat 2082–2084.
 */
export function getAllDirectoryObservances(): readonly DirectoryObservance[] {
  if (cachedDirectoryObservances) {
    return cachedDirectoryObservances;
  }

  const items: DirectoryObservance[] = [
    ...getDirectoryObservancesForSambat(2082),
    ...getDirectoryObservancesForSambat(2083),
    ...getDirectoryObservancesForSambat(2084),
  ];

  items.sort((a, b) => {
    const cmp = a.date.localeCompare(b.date);
    if (cmp !== 0) return cmp;
    return CATEGORY_PRIORITY[a.category] - CATEGORY_PRIORITY[b.category];
  });

  cachedDirectoryObservances = items;
  return items;
}

/** Find next upcoming Sangrand, Puranmashi, and Masya from ANY ISO date (perpetual). */
export function getNextMilestones(fromIsoDate: string): {
  sangrand: UpcomingMilestone | null;
  puranmashi: UpcomingMilestone | null;
  masya: UpcomingMilestone | null;
} {
  let sangrand: UpcomingMilestone | null = null;
  let puranmashi: UpcomingMilestone | null = null;
  let masya: UpcomingMilestone | null = null;

  const curSolar = getBikramiSolarDate(fromIsoDate);
  const candidateSpans = [
    ...getSolarMonthSpansForSambat(curSolar.sambat),
    ...getSolarMonthSpansForSambat(curSolar.sambat + 1),
  ];

  for (const span of candidateSpans) {
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

  const normalizeAmPm = (raw: string): string =>
    raw
      .replace(/[\u00A0\u202F]/g, ' ')
      .replace(/\b(am|pm)\b/gi, (m) => m.toUpperCase());

  const amritsarTime = normalizeAmPm(
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date),
  );

  const amritsarDate = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'short',
  }).format(date);

  const localTime = normalizeAmPm(
    new Intl.DateTimeFormat('en-US', {
      timeZone: resolvedLocalTz,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date),
  );

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

/** Resolve actual "Ajj Da Din" Gregorian ISO date using the perpetual engine (supports 1900–2150+). */
export function getEffectiveTodayIso(referenceDate: Date = new Date()): string {
  const y = referenceDate.getFullYear();
  const m = referenceDate.getMonth() + 1;
  const d = referenceDate.getDate();
  const iso = toIsoDate(y, m, d);
  if (iso >= LOOKUP_MIN_ISO && iso <= LOOKUP_MAX_ISO) {
    return iso;
  }
  return '2026-11-21';
}

export function getAllSolarMonthsMeta() {
  return BIKRAMI_MONTHS;
}

// Re-export HISTORICAL_EVENTS count helper if needed by tests
export {HISTORICAL_EVENTS};
