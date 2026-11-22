import {getBikramiMonthMeta, SOLAR_MONTH_SPANS} from '../data/sambatData';
import type {PersonalDateKind, PersonalDesiDate} from '../data/types';
import {addDaysIso, toGurmukhiNumerals} from './bikramiEngine';

export const PERSONAL_DATES_STORAGE_KEY = 'tatkhalsa_personal_desi_dates_v1';

export const PERSONAL_DATE_KINDS: readonly {
  id: PersonalDateKind;
  labelEn: string;
  labelPa: string;
}[] = [
  {id: 'janam-din', labelEn: 'Janam Din (Birthday)', labelPa: 'ਜਨਮ ਦਿਨ'},
  {id: 'anand-karaj', labelEn: 'Anand Karaj', labelPa: 'ਅਨੰਦ ਕਾਰਜ'},
  {id: 'barsi', labelEn: 'Barsi (Remembrance)', labelPa: 'ਬਰਸੀ'},
  {id: 'ardaas', labelEn: 'Ardaas / Sehaj Path', labelPa: 'ਅਰਦਾਸ / ਸਹਿਜ ਪਾਠ'},
  {id: 'other', labelEn: 'Family Milestone', labelPa: 'ਪਰਿਵਾਰਕ ਦਿਹਾੜਾ'},
];

const VALID_KINDS: readonly PersonalDateKind[] = [
  'janam-din',
  'anand-karaj',
  'barsi',
  'ardaas',
  'other',
];

export function getPersonalDateKindLabel(kind: PersonalDateKind, isPa: boolean): string {
  const found = PERSONAL_DATE_KINDS.find((k) => k.id === kind);
  if (!found) return isPa ? 'ਪਰਿਵਾਰਕ ਦਿਹਾੜਾ' : 'Family Milestone';
  return isPa ? found.labelPa : found.labelEn;
}

export function getMaxDaysForBikramiMonth(monthId: number): number {
  const spans = SOLAR_MONTH_SPANS.filter((s) => s.monthId === monthId);
  if (spans.length === 0) return 31;
  return Math.max(...spans.map((s) => s.days));
}

export function formatPersonalDesiDateLabel(
  monthId: number,
  day: number,
  isPa: boolean,
): string {
  const meta = getBikramiMonthMeta(monthId);
  return isPa
    ? `${toGurmukhiNumerals(day)} ${meta.namePa}`
    : `${day} ${meta.nameEn}`;
}

export function parsePersonalDates(raw: string | null): PersonalDesiDate[] {
  if (!raw) return [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];

  const result: PersonalDesiDate[] = [];
  const seen = new Set<string>();
  for (const item of parsed) {
    if (!item || typeof item !== 'object') continue;
    const obj = item as Record<string, unknown>;
    const id = typeof obj.id === 'string' && obj.id.trim().length > 0 ? obj.id.trim() : null;
    const title = typeof obj.title === 'string' ? obj.title.trim().slice(0, 80) : '';
    const kind =
      typeof obj.kind === 'string' && (VALID_KINDS as readonly string[]).includes(obj.kind)
        ? (obj.kind as PersonalDateKind)
        : 'other';
    const monthId = typeof obj.monthId === 'number' && Number.isInteger(obj.monthId) ? obj.monthId : 0;
    const day = typeof obj.day === 'number' && Number.isInteger(obj.day) ? obj.day : 0;
    const maxDay = monthId >= 1 && monthId <= 12 ? getMaxDaysForBikramiMonth(monthId) : 31;

    if (!id || seen.has(id) || !title || monthId < 1 || monthId > 12 || day < 1 || day > maxDay) {
      continue;
    }
    seen.add(id);
    result.push({
      id,
      title,
      kind,
      monthId,
      day,
      notes: typeof obj.notes === 'string' && obj.notes.trim() ? obj.notes.trim().slice(0, 160) : undefined,
      createdAt: typeof obj.createdAt === 'string' ? obj.createdAt : new Date().toISOString(),
    });
  }
  return result;
}

export function loadPersonalDates(): PersonalDesiDate[] {
  if (typeof window === 'undefined') return [];
  try {
    return parsePersonalDates(window.localStorage.getItem(PERSONAL_DATES_STORAGE_KEY));
  } catch {
    return [];
  }
}

export function savePersonalDates(dates: PersonalDesiDate[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(PERSONAL_DATES_STORAGE_KEY, JSON.stringify(dates));
  } catch {
    // Ignore storage quota or private browsing errors
  }
}

export function getPersonalDatesForSolarDay(
  dates: PersonalDesiDate[],
  monthId: number,
  day: number,
): PersonalDesiDate[] {
  return dates.filter((d) => d.monthId === monthId && d.day === day);
}

/**
 * Resolve all Gregorian ISO dates in Sambat 2082–2084 matching a given Desi Month + Day.
 * Handles 31/32-day months gracefully by clamping to the span's final day if a year's solar month is 1 day shorter.
 */
export function resolveGregorianOccurrencesForPersonalDate(
  pd: PersonalDesiDate,
  sambatScope: 'all' | '2082' | '2083' | '2084' = 'all',
): {isoDate: string; sambat: number; actualDay: number}[] {
  const matches: {isoDate: string; sambat: number; actualDay: number}[] = [];
  for (const span of SOLAR_MONTH_SPANS) {
    if (sambatScope !== 'all' && String(span.sambat) !== sambatScope) continue;
    if (span.monthId !== pd.monthId) continue;
    if (span.sambat < 2082 || span.sambat > 2084) continue;
    const actualDay = Math.min(pd.day, span.days);
    const isoDate = addDaysIso(span.startDate, actualDay - 1);
    matches.push({isoDate, sambat: span.sambat, actualDay});
  }
  return matches.sort((a, b) => a.isoDate.localeCompare(b.isoDate));
}

export function resolveNextOccurrenceForPersonalDate(
  pd: PersonalDesiDate,
  fromIso: string,
): {isoDate: string; sambat: number} | null {
  const all = resolveGregorianOccurrencesForPersonalDate(pd, 'all');
  const upcoming = all.find((occ) => occ.isoDate >= fromIso);
  if (upcoming) return {isoDate: upcoming.isoDate, sambat: upcoming.sambat};
  return all.length > 0 ? {isoDate: all[all.length - 1].isoDate, sambat: all[all.length - 1].sambat} : null;
}
