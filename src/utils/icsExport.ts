import {HISTORICAL_EVENTS} from '../data/eventsData';
import {getBikramiMonthMeta, SOLAR_MONTH_SPANS} from '../data/sambatData';
import type {IcsExportOptions} from '../data/types';
import {addDaysIso, getBikramiSolarDate, getLunarInfoCached, toGurmukhiNumerals} from './bikramiEngine';

/**
 * Pure RFC 5545 iCalendar (.ics) generator for Tatkhalsa Puratan Jantri.
 * Zero DOM/browser dependencies — reusable directly in React Native / Capacitor.
 */

function escapeIcsText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

function isoToIcsDate(isoDate: string): string {
  return isoDate.replace(/-/g, '');
}

function formatUtcStamp(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    date.getUTCFullYear().toString() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    'T' +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    'Z'
  );
}

interface IcsRecord {
  uid: string;
  date: string;
  summary: string;
  description: string;
  categories: string;
}

function renderVEvent(record: IcsRecord, dtStamp: string): string {
  const dtStart = isoToIcsDate(record.date);
  const dtEnd = isoToIcsDate(addDaysIso(record.date, 1));
  return [
    'BEGIN:VEVENT',
    `UID:${record.uid}@calendar.tatkhalsa.in`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART;VALUE=DATE:${dtStart}`,
    `DTEND;VALUE=DATE:${dtEnd}`,
    `SUMMARY:${escapeIcsText(record.summary)}`,
    `DESCRIPTION:${escapeIcsText(record.description)}`,
    `CATEGORIES:${escapeIcsText(record.categories)}`,
    'TRANSP:TRANSPARENT',
    'END:VEVENT',
  ].join('\r\n');
}

function matchesSambatScope(sambat: number, scope: IcsExportOptions['sambatScope']): boolean {
  if (scope === 'all') return true;
  return String(sambat) === scope;
}

/** Generate a complete RFC 5545 .ics string based on selected Jantri event categories and Sambat scope. */
export function generateJantriIcs(options: IcsExportOptions, now: Date = new Date()): {
  content: string;
  eventCount: number;
} {
  const dtStamp = formatUtcStamp(now);
  const records: IcsRecord[] = [];
  const isPa = options.language === 'pa';

  // 1. Sangrands (Solar Month Transitions)
  if (options.includeSangrands) {
    for (const span of SOLAR_MONTH_SPANS) {
      if (span.startDate < '2026-11-01' || span.startDate > '2028-03-31') continue;
      if (!matchesSambatScope(span.sambat, options.sambatScope)) continue;
      const meta = getBikramiMonthMeta(span.monthId);
      records.push({
        uid: `sangrand-${span.sambat}-${meta.key}-${span.startDate}`,
        date: span.startDate,
        summary: isPa
          ? `${meta.namePa} ਸੰਗਰਾਂਦ · ੧ ${meta.namePa} ਸੰਮਤ ${toGurmukhiNumerals(span.sambat)}`
          : `${meta.nameEn} Sangrand · 1 ${meta.nameEn}, Sambat ${span.sambat}`,
        description: isPa
          ? `ਪੁਰਾਤਨ ਬਿਕ੍ਰਮੀ ਸੰਗਰਾਂਦ (${meta.barahMahaRefPa})। ਬਾਰਹ ਮਾਹਾ: ${meta.pothiUrl}`
          : `Puratan Bikrami Sangrand (${meta.barahMahaRefEn}). Read Barah Maha: ${meta.pothiUrl}`,
        categories: 'Sangrand,Tatkhalsa Puratan Jantri',
      });
    }
  }

  // 2. Puranmashi & Masya across Sambat 2083 (Nov 2026 – Mar 2027) & 2084 (Mar 2027 – Mar 2028)
  if (options.includePuranmashi || options.includeMasya) {
    let cursor = '2026-11-01';
    const endDate = '2028-03-14';
    while (cursor <= endDate) {
      const solar = getBikramiSolarDate(cursor);
      if (matchesSambatScope(solar.sambat, options.sambatScope)) {
        const lunar = getLunarInfoCached(cursor);
        if (options.includePuranmashi && lunar.isPuranmashi) {
          records.push({
            uid: `puranmashi-${cursor}`,
            date: cursor,
            summary: isPa
              ? `${lunar.lunarMonthPa} ਪੂਰਨਮਾਸ਼ੀ (${toGurmukhiNumerals(solar.day)} ${solar.monthMeta.namePa})`
              : `${lunar.lunarMonthEn} Puranmashi (${solar.day} ${solar.monthMeta.nameEn})`,
            description: isPa
              ? `ਪੁਰਾਤਨ ਬਿਕ੍ਰਮੀ ਚੰਦਰ ਤਿਥੀ: ${lunar.lunarMonthPa} ਸੁਦੀ ੧੫ (ਪੂਰਨਮਾਸ਼ੀ)। ਸੂਰਜੀ ਤਾਰੀਖ਼: ${toGurmukhiNumerals(solar.day)} ${solar.monthMeta.namePa}, ਸੰਮਤ ${toGurmukhiNumerals(solar.sambat)}।`
              : `Puratan Bikrami Lunar Tithi: ${lunar.lunarMonthEn} Sudhi 15 (Puranmashi). Solar Date: ${solar.day} ${solar.monthMeta.nameEn}, Sambat ${solar.sambat}.`,
            categories: 'Puranmashi,Tatkhalsa Puratan Jantri',
          });
        }
        if (options.includeMasya && lunar.isMasya) {
          records.push({
            uid: `masya-${cursor}`,
            date: cursor,
            summary: isPa
              ? `${lunar.lunarMonthPa} ਮੱਸਿਆ (${toGurmukhiNumerals(solar.day)} ${solar.monthMeta.namePa})`
              : `${lunar.lunarMonthEn} Masya (${solar.day} ${solar.monthMeta.nameEn})`,
            description: isPa
              ? `ਪੁਰਾਤਨ ਬਿਕ੍ਰਮੀ ਚੰਦਰ ਤਿਥੀ: ${lunar.lunarMonthPa} ਵਦੀ ੧੫ (ਮੱਸਿਆ)। ਸੂਰਜੀ ਤਾਰੀਖ਼: ${toGurmukhiNumerals(solar.day)} ${solar.monthMeta.namePa}, ਸੰਮਤ ${toGurmukhiNumerals(solar.sambat)}।`
              : `Puratan Bikrami Lunar Tithi: ${lunar.lunarMonthEn} Vadhi 15 (Masya). Solar Date: ${solar.day} ${solar.monthMeta.nameEn}, Sambat ${solar.sambat}.`,
            categories: 'Masya,Tatkhalsa Puratan Jantri',
          });
        }
      }
      cursor = addDaysIso(cursor, 1);
    }
  }

  // 3. Gurpurabs, Shaheedi Divases, and Khalsa/Sampardai events
  for (const ev of HISTORICAL_EVENTS) {
    if (!matchesSambatScope(ev.sambat, options.sambatScope)) continue;
    if (ev.category === 'gurpurab' && !options.includeGurpurabs) continue;
    if (ev.category === 'shaheedi' && !options.includeShaheedi) continue;
    if (ev.category === 'khalsa' && !options.includeKhalsa) continue;

    const citationsLine = ev.citations
      .map((c) => (isPa ? `${c.sourcePa} (${c.referencePa})` : `${c.sourceEn} (${c.referenceEn})`))
      .join(' | ');

    records.push({
      uid: `event-${ev.id}`,
      date: ev.date,
      summary: isPa ? ev.titlePa : ev.titleEn,
      description: isPa
        ? `${ev.tithiRulePa}\n${ev.summaryPa}\nਹਵਾਲੇ: ${citationsLine}\nhttps://calendar.tatkhalsa.in`
        : `${ev.tithiRuleEn}\n${ev.summaryEn}\nSources: ${citationsLine}\nhttps://calendar.tatkhalsa.in`,
      categories: `${ev.category.toUpperCase()},Tatkhalsa Puratan Jantri`,
    });
  }

  records.sort((a, b) => a.date.localeCompare(b.date));

  const header = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Tatkhalsa Foundation//Tatkhalsa Puratan Jantri//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${isPa ? 'ਤੱਤਖ਼ਾਲਸਾ ਪੁਰਾਤਨ ਜੰਤਰੀ (੨੦੮੩–੨੦੮੪)' : 'Tatkhalsa Puratan Jantri (Sambat 2083–2084)'}`,
    'X-WR-TIMEZONE:Asia/Kolkata',
  ];

  const body = records.map((r) => renderVEvent(r, dtStamp));
  const content = [...header, ...body, 'END:VCALENDAR', ''].join('\r\n');

  return {content, eventCount: records.length};
}

/** Generate a single-date .ics export for a selected Jantri day. */
export function generateSingleDayIcs(
  isoDate: string,
  title: string,
  description: string,
  now: Date = new Date(),
): string {
  const dtStamp = formatUtcStamp(now);
  const eventBlock = renderVEvent(
    {
      uid: `day-${isoDate}`,
      date: isoDate,
      summary: title,
      description: `${description}\nhttps://calendar.tatkhalsa.in`,
      categories: 'Tatkhalsa Puratan Jantri',
    },
    dtStamp,
  );
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Tatkhalsa Foundation//Tatkhalsa Puratan Jantri//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    eventBlock,
    'END:VCALENDAR',
    '',
  ].join('\r\n');
}
