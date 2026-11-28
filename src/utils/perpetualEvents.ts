import {HISTORICAL_EVENTS} from '../data/eventsData';
import {BIKRAMI_MONTHS, getBikramiMonthMeta} from '../data/sambatData';
import type {HistoricalEvent, LunarInfo, LunarPaksh, SolarMonthSpan} from '../data/types';

/**
 * Pure rule-based perpetual Purab / Gurpurab / Shaheedi / Barsi projector.
 * For verified Sambat 2082–2084, returns the authoritative verified dataset directly.
 * For any other Sambat year (e.g., 2085–2150 / 2030 CE+ or historical years),
 * derives canonical solar/lunar Bikrami rules from the verified Sambat 2083 template set
 * and projects every observance dynamically using Sri Anandpur Sahib (IST) luni-solar astronomy.
 */

type RecurrenceRule =
  | {
      kind: 'lunar';
      lunarMonthId: number;
      paksh: LunarPaksh;
      pakshDay: number;
    }
  | {
      kind: 'solar';
      monthId: number;
      day: number;
    };

interface CanonicalTemplate {
  slug: string;
  template: HistoricalEvent;
  rule: RecurrenceRule;
}

const GURMUKHI_DIGITS = ['੦', '੧', '੨', '੩', '੪', '੫', '੬', '੭', '੮', '੯'] as const;

const MONTH_NAME_TO_ID: ReadonlyMap<string, number> = new Map(
  BIKRAMI_MONTHS.map((m) => [m.nameEn.toLowerCase(), m.id]),
);

function toGurmukhi(val: number | string): string {
  return String(val).replace(/\d/g, (d) => GURMUKHI_DIGITS[Number(d)]);
}

function addDaysUtc(isoDate: string, delta: number): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + delta));
  return `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, '0')}-${String(dt.getUTCDate()).padStart(2, '0')}`;
}

function ordinalEn(n: number): string {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}

function formatReadableGreg(isoDate: string): string {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const [y, m, d] = isoDate.split('-').map(Number);
  return `${d} ${months[m - 1]} ${y}`;
}

function parseRuleFromEvent(ev: HistoricalEvent): RecurrenceRule | null {
  const rule = ev.tithiRuleEn.trim();

  // 1. "<Month> Puranmashi"
  const puranMatch = rule.match(/^([A-Za-z]+)\s+Puranmashi\b/i);
  if (puranMatch) {
    const id = MONTH_NAME_TO_ID.get(puranMatch[1].toLowerCase());
    if (id) return {kind: 'lunar', lunarMonthId: id, paksh: 'Sudhi', pakshDay: 15};
  }

  // 2. "<Month> Masya"
  const masyaMatch = rule.match(/^([A-Za-z]+)\s+Masya\b/i);
  if (masyaMatch) {
    const id = MONTH_NAME_TO_ID.get(masyaMatch[1].toLowerCase());
    if (id) return {kind: 'lunar', lunarMonthId: id, paksh: 'Vadhi', pakshDay: 15};
  }

  // 3. "<Month> Sudhi|Vadhi <N>"
  const lunarMatch = rule.match(/^([A-Za-z]+)\s+(Sudhi|Vadhi)\s+(\d{1,2})\b/i);
  if (lunarMatch) {
    const id = MONTH_NAME_TO_ID.get(lunarMatch[1].toLowerCase());
    const paksh = lunarMatch[2].toLowerCase() === 'sudhi' ? 'Sudhi' : 'Vadhi';
    const day = Number(lunarMatch[3]);
    if (id && day >= 1 && day <= 15) {
      return {kind: 'lunar', lunarMonthId: id, paksh, pakshDay: day};
    }
  }

  // 4. "<N> <Month>" (fixed Desi solar date)
  const solarMatch = rule.match(/^(\d{1,2})\s+([A-Za-z]+)\b/);
  if (solarMatch) {
    const day = Number(solarMatch[1]);
    const id = MONTH_NAME_TO_ID.get(solarMatch[2].toLowerCase());
    if (id && day >= 1 && day <= 32) {
      return {kind: 'solar', monthId: id, day};
    }
  }

  // 5. Fallback: look for "(<N> <Month>" inside parenthetical
  const parenSolar = rule.match(/\((\d{1,2})\s+([A-Za-z]+)\b/);
  if (parenSolar) {
    const day = Number(parenSolar[1]);
    const id = MONTH_NAME_TO_ID.get(parenSolar[2].toLowerCase());
    if (id && day >= 1 && day <= 32) {
      return {kind: 'solar', monthId: id, day};
    }
  }

  return null;
}

let cachedTemplates: readonly CanonicalTemplate[] | null = null;

function getCanonicalTemplates(): readonly CanonicalTemplate[] {
  if (cachedTemplates) return cachedTemplates;
  // Sambat 2083 has complete 12-month parity across all categories; merge any unique slugs from 2084 as fallback
  const bySlug = new Map<string, CanonicalTemplate>();
  const preferredOrder = [
    ...HISTORICAL_EVENTS.filter((e) => e.sambat === 2083),
    ...HISTORICAL_EVENTS.filter((e) => e.sambat === 2084),
  ];
  for (const ev of preferredOrder) {
    const slug = ev.id.replace(/^\d{4}-/, '');
    if (bySlug.has(slug)) continue;
    const rule = parseRuleFromEvent(ev);
    if (!rule) continue;
    bySlug.set(slug, {slug, template: ev, rule});
  }
  cachedTemplates = Array.from(bySlug.values());
  return cachedTemplates;
}

function updateDynamicAnniversary(text: string, fromSambat: number, toSambat: number): string {
  let out = text
    .replace(new RegExp(`\\b${fromSambat}\\b`, 'g'), String(toSambat))
    .replace(new RegExp(toGurmukhi(fromSambat), 'g'), toGurmukhi(toSambat));

  // Guru Nanak Dev Ji Parkash anniversary (Sambat 1526 = 1469 CE)
  const oldNanak = fromSambat - 1526;
  const newNanak = toSambat - 1526;
  if (newNanak > 0 && oldNanak !== newNanak) {
    out = out
      .replace(new RegExp(`\\b${oldNanak}(?:st|nd|rd|th)\\b`, 'g'), ordinalEn(newNanak))
      .replace(new RegExp(toGurmukhi(oldNanak), 'g'), toGurmukhi(newNanak));
  }

  // Khalsa Sajna Divas anniversary (Sambat 1756 = 1699 CE)
  const oldKhalsa = fromSambat - 1756;
  const newKhalsa = toSambat - 1756;
  if (newKhalsa > 0 && oldKhalsa !== newKhalsa) {
    out = out
      .replace(new RegExp(`\\b${oldKhalsa}(?:st|nd|rd|th)\\b`, 'g'), ordinalEn(newKhalsa))
      .replace(new RegExp(toGurmukhi(oldKhalsa), 'g'), toGurmukhi(newKhalsa));
  }

  return out;
}

const perpetualEventsCache = new Map<number, readonly HistoricalEvent[]>();

/**
 * Get all historical observances for ANY Bikrami Sambat year.
 * - For Sambat 2082–2084: returns the exact verified `HISTORICAL_EVENTS` slice.
 * - For any other Sambat year (e.g. 2085–2150 / 2030 CE+): dynamically computes every observance
 *   from canonical solar/lunar Puratan Bikrami rules and caches the result.
 */
export function getHistoricalEventsForSambat(
  sambat: number,
  spansForSambat: readonly SolarMonthSpan[],
  getLunar: (isoDate: string) => LunarInfo,
): readonly HistoricalEvent[] {
  if (sambat === 2082 || sambat === 2083 || sambat === 2084) {
    let cached = perpetualEventsCache.get(sambat);
    if (!cached) {
      cached = HISTORICAL_EVENTS.filter((ev) => ev.sambat === sambat);
      perpetualEventsCache.set(sambat, cached);
    }
    return cached;
  }

  const cached = perpetualEventsCache.get(sambat);
  if (cached) return cached;

  if (spansForSambat.length === 0) return [];

  const yearStart = spansForSambat[0].startDate;
  const yearEnd = spansForSambat[spansForSambat.length - 1].endDate;

  // Build day-by-day lunar index across Sambat year (include 4-day tail margin only if needed)
  interface DayEntry {
    iso: string;
    solarMonthId: number;
    solarDay: number;
    lunar: LunarInfo;
  }

  const spanByMonthId = new Map<number, SolarMonthSpan>();
  for (const sp of spansForSambat) {
    spanByMonthId.set(sp.monthId, sp);
  }

  const days: DayEntry[] = [];
  for (const sp of spansForSambat) {
    for (let d = 1; d <= sp.days; d++) {
      const iso = addDaysUtc(sp.startDate, d - 1);
      days.push({
        iso,
        solarMonthId: sp.monthId,
        solarDay: d,
        lunar: getLunar(iso),
      });
    }
  }

  // Index lunar dates by key `${lunarMonthId}-${paksh}-${pakshDay}` -> first matching day in Sambat year
  const lunarExactIndex = new Map<string, DayEntry>();
  const puranmashiByMonth = new Map<number, DayEntry>();
  const masyaByMonth = new Map<number, DayEntry>();

  for (const entry of days) {
    const l = entry.lunar;
    if (l.isPuranmashi && !puranmashiByMonth.has(l.lunarMonthId)) {
      puranmashiByMonth.set(l.lunarMonthId, entry);
    }
    if (l.isMasya && !masyaByMonth.has(l.lunarMonthId)) {
      masyaByMonth.set(l.lunarMonthId, entry);
    }
    const key = `${l.lunarMonthId}-${l.paksh}-${l.pakshDay}`;
    if (!lunarExactIndex.has(key)) {
      lunarExactIndex.set(key, entry);
    }
  }

  function findLunarDay(lunarMonthId: number, paksh: LunarPaksh, pakshDay: number): DayEntry | null {
    if (paksh === 'Sudhi' && pakshDay === 15) {
      const exact = puranmashiByMonth.get(lunarMonthId);
      if (exact) return exact;
    }
    if (paksh === 'Vadhi' && pakshDay === 15) {
      const exact = masyaByMonth.get(lunarMonthId);
      if (exact) return exact;
    }

    const direct = lunarExactIndex.get(`${lunarMonthId}-${paksh}-${pakshDay}`);
    if (direct) return direct;

    // Handle Kshaya (skipped) tithi: find the day whose tithi precedes pakshDay in the same lunar month & paksh
    const targetTithi = paksh === 'Sudhi' ? pakshDay : 15 + pakshDay;
    for (let i = 0; i < days.length - 1; i++) {
      const cur = days[i];
      const nxt = days[i + 1];
      if (
        cur.lunar.lunarMonthId === lunarMonthId &&
        cur.lunar.tithiNumber < targetTithi &&
        nxt.lunar.tithiNumber > targetTithi
      ) {
        return cur;
      }
    }

    // Fallback: closest day in that lunar month & paksh
    let best: DayEntry | null = null;
    let bestDist = 99;
    for (const entry of days) {
      if (entry.lunar.lunarMonthId === lunarMonthId && entry.lunar.paksh === paksh) {
        const dist = Math.abs(entry.lunar.pakshDay - pakshDay);
        if (dist < bestDist) {
          bestDist = dist;
          best = entry;
        }
      }
    }
    return best;
  }

  const templates = getCanonicalTemplates();
  const projected: HistoricalEvent[] = [];

  for (const item of templates) {
    const {slug, template, rule} = item;
    let resolvedIso: string | null = null;
    let resolvedSolarMonthId = 1;
    let resolvedSolarDay = 1;
    let tithiRuleEn = '';
    let tithiRulePa = '';

    if (rule.kind === 'solar') {
      const sp = spanByMonthId.get(rule.monthId);
      if (!sp) continue;
      resolvedSolarDay = Math.min(rule.day, sp.days);
      resolvedSolarMonthId = sp.monthId;
      resolvedIso = addDaysUtc(sp.startDate, resolvedSolarDay - 1);
      const mMeta = getBikramiMonthMeta(resolvedSolarMonthId);
      tithiRuleEn = `${resolvedSolarDay} ${mMeta.nameEn}, Sambat ${sambat}`;
      tithiRulePa = `${toGurmukhi(resolvedSolarDay)} ${mMeta.namePa}, ਸੰਮਤ ${toGurmukhi(sambat)}`;
    } else {
      const match = findLunarDay(rule.lunarMonthId, rule.paksh, rule.pakshDay);
      if (!match) continue;
      resolvedIso = match.iso;
      resolvedSolarMonthId = match.solarMonthId;
      resolvedSolarDay = match.solarDay;
      const lMeta = getBikramiMonthMeta(rule.lunarMonthId);
      const sMeta = getBikramiMonthMeta(resolvedSolarMonthId);
      if (rule.paksh === 'Sudhi' && rule.pakshDay === 15) {
        tithiRuleEn = `${lMeta.nameEn} Puranmashi (${resolvedSolarDay} ${sMeta.nameEn}, Sambat ${sambat})`;
        tithiRulePa = `${lMeta.namePa} ਪੂਰਨਮਾਸ਼ੀ (${toGurmukhi(resolvedSolarDay)} ${sMeta.namePa}, ਸੰਮਤ ${toGurmukhi(sambat)})`;
      } else if (rule.paksh === 'Vadhi' && rule.pakshDay === 15) {
        tithiRuleEn = `${lMeta.nameEn} Masya (${resolvedSolarDay} ${sMeta.nameEn}, Sambat ${sambat})`;
        tithiRulePa = `${lMeta.namePa} ਮੱਸਿਆ (${toGurmukhi(resolvedSolarDay)} ${sMeta.namePa}, ਸੰਮਤ ${toGurmukhi(sambat)})`;
      } else {
        const pakshPa = rule.paksh === 'Sudhi' ? 'ਸੁਦੀ' : 'ਵਦੀ';
        tithiRuleEn = `${lMeta.nameEn} ${rule.paksh} ${rule.pakshDay} (${resolvedSolarDay} ${sMeta.nameEn}, Sambat ${sambat})`;
        tithiRulePa = `${lMeta.namePa} ${pakshPa} ${toGurmukhi(rule.pakshDay)} (${toGurmukhi(resolvedSolarDay)} ${sMeta.namePa}, ਸੰਮਤ ${toGurmukhi(sambat)})`;
      }
    }

    if (!resolvedIso || resolvedIso < yearStart || resolvedIso > yearEnd) continue;

    const readableGreg = formatReadableGreg(resolvedIso);
    const titleEn = updateDynamicAnniversary(template.titleEn, template.sambat, sambat);
    const titlePa = updateDynamicAnniversary(template.titlePa, template.sambat, sambat);
    const shortLabelEn = updateDynamicAnniversary(template.shortLabelEn, template.sambat, sambat);
    const shortLabelPa = updateDynamicAnniversary(template.shortLabelPa, template.sambat, sambat);
    const summaryEn = updateDynamicAnniversary(template.summaryEn, template.sambat, sambat);
    const summaryPa = updateDynamicAnniversary(template.summaryPa, template.sambat, sambat);

    projected.push({
      ...template,
      id: `${sambat}-${slug}`,
      date: resolvedIso,
      sambat,
      titleEn,
      titlePa,
      shortLabelEn,
      shortLabelPa,
      tithiRuleEn,
      tithiRulePa,
      summaryEn,
      summaryPa,
      historicalContextEn: `Astronomically projected for Bikrami Sambat ${sambat} (${readableGreg} · ${tithiRuleEn}) using Sri Anandpur Sahib (IST) Puratan Bikrami reckoning. ${updateDynamicAnniversary(template.historicalContextEn, template.sambat, sambat)}`,
      historicalContextPa: `ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ (IST) ਪੁਰਾਤਨ ਬਿਕ੍ਰਮੀ ਗਣਨਾ ਅਨੁਸਾਰ ਸੰਮਤ ${toGurmukhi(sambat)} (${tithiRulePa})। ${updateDynamicAnniversary(template.historicalContextPa, template.sambat, sambat)}`,
    });
  }

  projected.sort((a, b) => a.date.localeCompare(b.date));
  perpetualEventsCache.set(sambat, projected);
  return projected;
}

const perpetualDateIndexCache = new Map<number, ReadonlyMap<string, HistoricalEvent[]>>();

export function getEventsForDateInSambat(
  isoDate: string,
  sambat: number,
  spansForSambat: readonly SolarMonthSpan[],
  getLunar: (isoDate: string) => LunarInfo,
): HistoricalEvent[] {
  let dateMap = perpetualDateIndexCache.get(sambat);
  if (!dateMap) {
    const events = getHistoricalEventsForSambat(sambat, spansForSambat, getLunar);
    const map = new Map<string, HistoricalEvent[]>();
    for (const ev of events) {
      const list = map.get(ev.date);
      if (list) list.push(ev);
      else map.set(ev.date, [ev]);
    }
    dateMap = map;
    perpetualDateIndexCache.set(sambat, dateMap);
  }
  return dateMap.get(isoDate) ?? [];
}
