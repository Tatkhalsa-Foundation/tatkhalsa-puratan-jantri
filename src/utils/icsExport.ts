import {HISTORICAL_EVENTS} from '../data/eventsData';
import {getBikramiMonthMeta, SOLAR_MONTH_SPANS} from '../data/sambatData';
import type {HistoricalEvent, IcsExportOptions, PersonalDesiDate} from '../data/types';
import {
  addDaysIso,
  formatDualTime,
  getBikramiSolarDate,
  getLunarInfoCached,
  toGurmukhiNumerals,
} from './bikramiEngine';
import {
  getPersonalDateKindLabel,
  resolveGregorianOccurrencesForPersonalDate,
} from './personalDates';

/**
 * Pure RFC 5545 iCalendar (.ics) generator for Tatkhalsa Puratan Jantri.
 * Supports both selective observance export AND full 365-day daily Bikrami + Lunar date export
 * (combining same-day Purabs, Sangrands, Puranmashi, Masya, Shaheedi Divases, Barsis, and Personal Desi Dates cleanly into each daily VEVENT).
 */

const SCOPE_RANGES: Record<IcsExportOptions['sambatScope'], {start: string; end: string}> = {
  '2083': {start: '2026-10-17', end: '2027-03-14'}, // 1 Katak 2083 – 30 Phagun 2083 (149 days)
  '2084': {start: '2027-03-15', end: '2028-03-13'}, // 1 Chet 2084 – 30 Phagun 2084 (365 days)
  all: {start: '2026-10-17', end: '2028-03-13'}, // Full Sambat 2083–2084 coverage (514 days)
};

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

function isHistoricalEventSelected(ev: HistoricalEvent, options: IcsExportOptions): boolean {
  if (ev.category === 'gurpurab') return options.includeGurpurabs;
  if (ev.category === 'shaheedi') return options.includeShaheedi;
  if (ev.category === 'khalsa') return options.includeKhalsa;
  if (ev.category === 'barsi') return options.includeBarsis;
  return false;
}

function formatDailyLunarClause(
  lunar: ReturnType<typeof getLunarInfoCached>,
  lang: IcsExportOptions['language'],
): string {
  if (lang === 'pa') {
    if (lunar.isPuranmashi) return `${lunar.lunarMonthPa} ਪੂਰਨਮਾਸ਼ੀ`;
    if (lunar.isMasya) return `${lunar.lunarMonthPa} ਮੱਸਿਆ`;
    return `${lunar.lunarMonthPa} ${lunar.pakshPa} ${toGurmukhiNumerals(lunar.pakshDay)} (${lunar.tithiNamePa})`;
  }
  if (lunar.isPuranmashi) return `${lunar.lunarMonthEn} Puranmashi`;
  if (lunar.isMasya) return `${lunar.lunarMonthEn} Masya`;
  return `${lunar.lunarMonthEn} ${lunar.paksh} ${lunar.pakshDay} (${lunar.tithiNameEn})`;
}

/** Generate a complete RFC 5545 .ics string based on selected Jantri event categories and Sambat scope. */
export function generateJantriIcs(
  options: IcsExportOptions,
  now: Date = new Date(),
): {
  content: string;
  eventCount: number;
} {
  const dtStamp = formatUtcStamp(now);
  const records: IcsRecord[] = [];
  const isPa = options.language === 'pa';
  const isBi = options.language === 'bi';
  const range = SCOPE_RANGES[options.sambatScope];

  // Index selected historical events by date for fast lookup
  const selectedEventsByDate = new Map<string, HistoricalEvent[]>();
  for (const ev of HISTORICAL_EVENTS) {
    if (!matchesSambatScope(ev.sambat, options.sambatScope)) continue;
    if (!isHistoricalEventSelected(ev, options)) continue;
    const list = selectedEventsByDate.get(ev.date) ?? [];
    list.push(ev);
    selectedEventsByDate.set(ev.date, list);
  }

  // Index selected personal Desi dates by Gregorian ISO date
  const personalByDate = new Map<string, PersonalDesiDate[]>();
  if (options.includePersonalDates && options.personalDates && options.personalDates.length > 0) {
    for (const pd of options.personalDates) {
      const occurrences = resolveGregorianOccurrencesForPersonalDate(pd, options.sambatScope);
      for (const occ of occurrences) {
        if (occ.isoDate < range.start || occ.isoDate > range.end) continue;
        const list = personalByDate.get(occ.isoDate) ?? [];
        list.push(pd);
        personalByDate.set(occ.isoDate, list);
      }
    }
  }

  if (options.includeDaily) {
    // Full Daily Mode: generate one all-day VEVENT for EVERY calendar day in scope,
    // combining any matching Sangrand, Puranmashi, Masya, Gurpurab, Shaheedi, Khalsa, Barsi, or Personal Desi Date into that day's SUMMARY & DESCRIPTION.
    let cursor = range.start;
    while (cursor <= range.end) {
      const solar = getBikramiSolarDate(cursor);
      const lunar = getLunarInfoCached(cursor);
      const dayEvents = selectedEventsByDate.get(cursor) ?? [];
      const dayPersonal = personalByDate.get(cursor) ?? [];
      const tithiDual = formatDualTime(lunar.tithiEndsAtUtc, 'Asia/Kolkata');

      const solarBaseEn = `${solar.day} ${solar.monthMeta.nameEn} ${solar.sambat}`;
      const solarBasePa = `${toGurmukhiNumerals(solar.day)} ${solar.monthMeta.namePa} ${toGurmukhiNumerals(solar.sambat)}`;
      const lunarClauseEn = formatDailyLunarClause(lunar, 'en');
      const lunarClausePa = formatDailyLunarClause(lunar, 'pa');

      // Special observances appended after em-dash when checked
      const highlights: string[] = [];
      const categories = new Set<string>(['Tatkhalsa Puratan Jantri', 'Daily Bikrami']);

      if (options.includeSangrands && solar.isSangrand) {
        highlights.push(
          isPa ? `${solar.monthMeta.namePa} ਸੰਗਰਾਂਦ` : `${solar.monthMeta.nameEn} Sangrand`,
        );
        categories.add('Sangrand');
      }
      if (options.includePuranmashi && lunar.isPuranmashi) {
        categories.add('Puranmashi');
      }
      if (options.includeMasya && lunar.isMasya) {
        categories.add('Masya');
      }
      for (const ev of dayEvents) {
        highlights.push(isPa ? ev.shortLabelPa : ev.shortLabelEn);
        categories.add(ev.category.toUpperCase());
      }
      for (const pd of dayPersonal) {
        highlights.push(`${pd.title} (${getPersonalDateKindLabel(pd.kind, isPa)})`);
        categories.add('Personal Desi Date');
      }

      const baseSummary = isPa
        ? `${solarBasePa} · ${lunarClausePa}`
        : isBi
          ? `${solarBaseEn} · ${lunarClauseEn} (${solarBasePa})`
          : `${solarBaseEn} · ${lunarClauseEn}`;

      const summary =
        highlights.length > 0 ? `${baseSummary} — ${highlights.join(' · ')}` : baseSummary;

      // Rich Bilingual DESCRIPTION with Sri Anandpur Sahib (IST) tithi transition time
      const descLines: string[] = [
        `Desi Solar Date: ${solar.day} ${solar.monthMeta.nameEn}, Bikrami Sambat ${solar.sambat} (${toGurmukhiNumerals(solar.day)} ${solar.monthMeta.namePa}, ਸੰਮਤ ${toGurmukhiNumerals(solar.sambat)})`,
        `Lunar Tithi: ${lunar.lunarMonthEn} ${lunar.paksh} ${lunar.pakshDay} (${lunar.tithiNameEn}) · ${lunar.lunarMonthPa} ${lunar.pakshPa} ${toGurmukhiNumerals(lunar.pakshDay)} (${lunar.tithiNamePa})`,
        `Tithi ends (Sri Anandpur Sahib IST): ${tithiDual.amritsarTime}, ${tithiDual.amritsarDate}`,
      ];

      if (solar.isSangrand) {
        const sankrantiDual = formatDualTime(solar.sankrantiUtc, 'Asia/Kolkata');
        descLines.push(
          `Sangrand: 1 ${solar.monthMeta.nameEn} (${solar.monthMeta.namePa} ਸੰਗਰਾਂਦ) · Sankranti at ${sankrantiDual.amritsarTime}, ${sankrantiDual.amritsarDate} IST`,
        );
      }

      for (const ev of dayEvents) {
        const citationsLine = ev.citations
          .map((c) => `${c.sourceEn} (${c.referenceEn})`)
          .join(' | ');
        descLines.push(
          '',
          `${ev.titleEn} / ${ev.titlePa}`,
          `${ev.tithiRuleEn} · ${ev.summaryEn}`,
          ...(citationsLine ? [`Sources: ${citationsLine}`] : []),
        );
      }

      for (const pd of dayPersonal) {
        descLines.push(
          '',
          `My Desi Date: ${pd.title} (${getPersonalDateKindLabel(pd.kind, false)})`,
          ...(pd.notes ? [pd.notes] : []),
        );
      }

      descLines.push('', 'https://calendar.tatkhalsa.in/');

      records.push({
        uid: `daily-${cursor}`,
        date: cursor,
        summary,
        description: descLines.join('\n'),
        categories: Array.from(categories).join(','),
      });

      cursor = addDaysIso(cursor, 1);
    }
  } else {
    // Selective Mode: export only chosen observances
    // 1. Sangrands (Solar Month Transitions)
    if (options.includeSangrands) {
      for (const span of SOLAR_MONTH_SPANS) {
        if (span.startDate < range.start || span.startDate > range.end) continue;
        if (!matchesSambatScope(span.sambat, options.sambatScope)) continue;
        const meta = getBikramiMonthMeta(span.monthId);
        const sankrantiDual = formatDualTime(span.sankrantiUtc, 'Asia/Kolkata');
        records.push({
          uid: `sangrand-${span.sambat}-${meta.key}-${span.startDate}`,
          date: span.startDate,
          summary: isBi
            ? `${meta.nameEn} Sangrand / ${meta.namePa} ਸੰਗਰਾਂਦ · 1 ${meta.nameEn}, Sambat ${span.sambat}`
            : isPa
              ? `${meta.namePa} ਸੰਗਰਾਂਦ · ੧ ${meta.namePa} ਸੰਮਤ ${toGurmukhiNumerals(span.sambat)}`
              : `${meta.nameEn} Sangrand · 1 ${meta.nameEn}, Sambat ${span.sambat}`,
          description: isPa
            ? `ਪੁਰਾਤਨ ਬਿਕ੍ਰਮੀ ਸੰਗਰਾਂਦ (${meta.barahMahaRefPa})। ਸੰਕ੍ਰਾਂਤੀ (ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ IST): ${sankrantiDual.amritsarTime}, ${sankrantiDual.amritsarDate}। ਬਾਰਹ ਮਾਹਾ: ${meta.pothiUrl}\nhttps://calendar.tatkhalsa.in/`
            : `Puratan Bikrami Sangrand (${meta.barahMahaRefEn}). Sankranti (Sri Anandpur Sahib IST): ${sankrantiDual.amritsarTime}, ${sankrantiDual.amritsarDate}. Read Barah Maha: ${meta.pothiUrl}\nhttps://calendar.tatkhalsa.in/`,
          categories: 'Sangrand,Tatkhalsa Puratan Jantri',
        });
      }
    }

    // 2. Puranmashi & Masya across selected Sambat scope
    if (options.includePuranmashi || options.includeMasya) {
      let cursor = range.start;
      while (cursor <= range.end) {
        const solar = getBikramiSolarDate(cursor);
        if (matchesSambatScope(solar.sambat, options.sambatScope)) {
          const lunar = getLunarInfoCached(cursor);
          const tithiDual = formatDualTime(lunar.tithiEndsAtUtc, 'Asia/Kolkata');
          if (options.includePuranmashi && lunar.isPuranmashi) {
            records.push({
              uid: `puranmashi-${cursor}`,
              date: cursor,
              summary: isBi
                ? `${lunar.lunarMonthEn} Puranmashi / ${lunar.lunarMonthPa} ਪੂਰਨਮਾਸ਼ੀ (${solar.day} ${solar.monthMeta.nameEn})`
                : isPa
                  ? `${lunar.lunarMonthPa} ਪੂਰਨਮਾਸ਼ੀ (${toGurmukhiNumerals(solar.day)} ${solar.monthMeta.namePa})`
                  : `${lunar.lunarMonthEn} Puranmashi (${solar.day} ${solar.monthMeta.nameEn})`,
              description: isPa
                ? `ਪੁਰਾਤਨ ਬਿਕ੍ਰਮੀ ਚੰਦਰ ਤਿਥੀ: ${lunar.lunarMonthPa} ਸੁਦੀ ੧੫ (ਪੂਰਨਮਾਸ਼ੀ)। ਸੂਰਜੀ ਤਾਰੀਖ਼: ${toGurmukhiNumerals(solar.day)} ${solar.monthMeta.namePa}, ਸੰਮਤ ${toGurmukhiNumerals(solar.sambat)}। ਤਿਥੀ ਸਮਾਪਤੀ (ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ IST): ${tithiDual.amritsarTime}, ${tithiDual.amritsarDate}\nhttps://calendar.tatkhalsa.in/`
                : `Puratan Bikrami Lunar Tithi: ${lunar.lunarMonthEn} Sudhi 15 (Puranmashi). Solar Date: ${solar.day} ${solar.monthMeta.nameEn}, Sambat ${solar.sambat}. Tithi ends (Sri Anandpur Sahib IST): ${tithiDual.amritsarTime}, ${tithiDual.amritsarDate}\nhttps://calendar.tatkhalsa.in/`,
              categories: 'Puranmashi,Tatkhalsa Puratan Jantri',
            });
          }
          if (options.includeMasya && lunar.isMasya) {
            records.push({
              uid: `masya-${cursor}`,
              date: cursor,
              summary: isBi
                ? `${lunar.lunarMonthEn} Masya / ${lunar.lunarMonthPa} ਮੱਸਿਆ (${solar.day} ${solar.monthMeta.nameEn})`
                : isPa
                  ? `${lunar.lunarMonthPa} ਮੱਸਿਆ (${toGurmukhiNumerals(solar.day)} ${solar.monthMeta.namePa})`
                  : `${lunar.lunarMonthEn} Masya (${solar.day} ${solar.monthMeta.nameEn})`,
              description: isPa
                ? `ਪੁਰਾਤਨ ਬਿਕ੍ਰਮੀ ਚੰਦਰ ਤਿਥੀ: ${lunar.lunarMonthPa} ਵਦੀ ੧੫ (ਮੱਸਿਆ)। ਸੂਰਜੀ ਤਾਰੀਖ਼: ${toGurmukhiNumerals(solar.day)} ${solar.monthMeta.namePa}, ਸੰਮਤ ${toGurmukhiNumerals(solar.sambat)}। ਤਿਥੀ ਸਮਾਪਤੀ (ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ IST): ${tithiDual.amritsarTime}, ${tithiDual.amritsarDate}\nhttps://calendar.tatkhalsa.in/`
                : `Puratan Bikrami Lunar Tithi: ${lunar.lunarMonthEn} Vadhi 15 (Masya). Solar Date: ${solar.day} ${solar.monthMeta.nameEn}, Sambat ${solar.sambat}. Tithi ends (Sri Anandpur Sahib IST): ${tithiDual.amritsarTime}, ${tithiDual.amritsarDate}\nhttps://calendar.tatkhalsa.in/`,
              categories: 'Masya,Tatkhalsa Puratan Jantri',
            });
          }
        }
        cursor = addDaysIso(cursor, 1);
      }
    }

    // 3. Gurpurabs, Shaheedi Divases, Khalsa/Sampardai events, and Barsis
    for (const ev of HISTORICAL_EVENTS) {
      if (!matchesSambatScope(ev.sambat, options.sambatScope)) continue;
      if (!isHistoricalEventSelected(ev, options)) continue;

      const solar = getBikramiSolarDate(ev.date);
      const lunar = getLunarInfoCached(ev.date);
      const tithiDual = formatDualTime(lunar.tithiEndsAtUtc, 'Asia/Kolkata');
      const citationsLine = ev.citations
        .map((c) => (isPa ? `${c.sourcePa} (${c.referencePa})` : `${c.sourceEn} (${c.referenceEn})`))
        .join(' | ');

      records.push({
        uid: `event-${ev.id}`,
        date: ev.date,
        summary: isBi ? `${ev.titleEn} · ${ev.titlePa}` : isPa ? ev.titlePa : ev.titleEn,
        description: isPa
          ? `${toGurmukhiNumerals(solar.day)} ${solar.monthMeta.namePa} ${toGurmukhiNumerals(solar.sambat)} · ${ev.tithiRulePa}\nਤਿਥੀ ਸਮਾਪਤੀ (ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ IST): ${tithiDual.amritsarTime}, ${tithiDual.amritsarDate}\n${ev.summaryPa}\nਹਵਾਲੇ: ${citationsLine}\nhttps://calendar.tatkhalsa.in/`
          : `${solar.day} ${solar.monthMeta.nameEn} ${solar.sambat} · ${ev.tithiRuleEn}\nTithi ends (Sri Anandpur Sahib IST): ${tithiDual.amritsarTime}, ${tithiDual.amritsarDate}\n${ev.summaryEn}\nSources: ${citationsLine}\nhttps://calendar.tatkhalsa.in/`,
        categories: `${ev.category.toUpperCase()},Tatkhalsa Puratan Jantri`,
      });
    }

    // 4. Personal Desi/Bikrami Family Dates
    if (options.includePersonalDates && options.personalDates && options.personalDates.length > 0) {
      for (const pd of options.personalDates) {
        const meta = getBikramiMonthMeta(pd.monthId);
        const occurrences = resolveGregorianOccurrencesForPersonalDate(pd, options.sambatScope);
        for (const occ of occurrences) {
          if (occ.isoDate < range.start || occ.isoDate > range.end) continue;
          const kindLabel = getPersonalDateKindLabel(pd.kind, isPa);
          records.push({
            uid: `personal-${pd.id}-${occ.sambat}`,
            date: occ.isoDate,
            summary: isPa
              ? `${pd.title} (${kindLabel}) · ${toGurmukhiNumerals(occ.actualDay)} ${meta.namePa}`
              : `${pd.title} (${kindLabel}) · ${occ.actualDay} ${meta.nameEn}`,
            description: [
              isPa
                ? `ਮੇਰੀ ਦੇਸੀ ਤਾਰੀਖ਼: ${toGurmukhiNumerals(occ.actualDay)} ${meta.namePa}, ਸੰਮਤ ${toGurmukhiNumerals(occ.sambat)}`
                : `Personal Desi Date: ${occ.actualDay} ${meta.nameEn}, Sambat ${occ.sambat}`,
              ...(pd.notes ? [pd.notes] : []),
              'https://calendar.tatkhalsa.in/',
            ].join('\n'),
            categories: 'Personal Desi Date,Tatkhalsa Puratan Jantri',
          });
        }
      }
    }
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
      description: `${description}\nhttps://calendar.tatkhalsa.in/`,
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
