import {EVENTS_BY_DATE} from '../data/eventsData';
import {
  BIKRAMI_MONTHS,
  getBikramiMonthMeta,
  GREGORIAN_MONTHS,
  SOLAR_MONTH_SPANS,
  WEEKDAYS,
} from '../data/sambatData';
import type {
  BikramiSolarDate,
  DualTimeDisplay,
  JantriDay,
  LanguageMode,
  LunarInfo,
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

const lunarCache = new Map<string, LunarInfo>();

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
 * Sri Amritsar Sahib (IST / Asia/Kolkata) and a supplied local IANA timezone.
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
      localTimeZoneName = `${resolvedLocalTz.split('/').pop()?.replace(/_/g, ' ') || resolvedLocalTz} (${tzPart})`;
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

/** Format a Gregorian ISO date cleanly in English or Gurmukhi. */
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
  return includeWeekday ? `${wd.fullEn}, ${core}` : core;
}

/** Resolve the best default "Ajj Da Din" date inside the Sambat 2083–2084 window. */
export function getEffectiveTodayIso(referenceDate: Date = new Date()): string {
  const y = referenceDate.getFullYear();
  const m = referenceDate.getMonth() + 1;
  const d = referenceDate.getDate();
  const iso = toIsoDate(y, m, d);
  // If browser clock is within our verified Sambat 2083–2084 span (Nov 2026 – Mar 2028), use exact today;
  // otherwise clamp gracefully to Nov 21, 2026 (3 days before 557th Parkash Purab of Sri Guru Nanak Dev Ji).
  if (iso >= '2026-11-01' && iso <= '2028-03-31') {
    return iso;
  }
  return '2026-11-21';
}

export function getAllSolarMonthsMeta() {
  return BIKRAMI_MONTHS;
}
