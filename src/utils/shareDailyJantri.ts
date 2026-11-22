import type {JantriDay, PersonalDesiDate} from '../data/types';
import {formatGregorianDate, toGurmukhiNumerals} from './bikramiEngine';
import {getPersonalDateKindLabel} from './personalDates';

export const JANTRI_SHARE_URL = 'https://calendar.tatkhalsa.in/';

/**
 * Builds a clean, scannable bilingual daily Jantri summary formatted for
 * 1-tap WhatsApp / Instagram / SMS sharing.
 */
export function buildDailyShareText(
  day: JantriDay,
  personalDates: PersonalDesiDate[] = [],
): string {
  const desiEn = `${day.solar.day} ${day.solar.monthMeta.nameEn}, Sambat ${day.solar.sambat}`;
  const desiPa = `${toGurmukhiNumerals(day.solar.day)} ${day.solar.monthMeta.namePa}, ਸੰਮਤ ${toGurmukhiNumerals(day.solar.sambat)}`;

  const lunarEn = day.lunar.isPuranmashi
    ? `${day.lunar.lunarMonthEn} Puranmashi (Full Moon)`
    : day.lunar.isMasya
      ? `${day.lunar.lunarMonthEn} Masya (New Moon)`
      : `${day.lunar.lunarMonthEn} ${day.lunar.paksh} ${day.lunar.pakshDay} · ${day.lunar.tithiNameEn}`;

  const lunarPa = day.lunar.isPuranmashi
    ? `${day.lunar.lunarMonthPa} ਪੂਰਨਮਾਸ਼ੀ`
    : day.lunar.isMasya
      ? `${day.lunar.lunarMonthPa} ਮੱਸਿਆ`
      : `${day.lunar.lunarMonthPa} ${day.lunar.pakshPa} ${toGurmukhiNumerals(day.lunar.pakshDay)} (${day.lunar.tithiNamePa})`;

  const gregorianEn = formatGregorianDate(day.isoDate, 'en', true);

  const observances: string[] = [];
  if (day.solar.isSangrand) {
    observances.push(
      `${day.solar.monthMeta.nameEn} Sangrand (Month Start) · ${day.solar.monthMeta.namePa} ਸੰਗਰਾਂਦ`,
    );
  }
  for (const ev of day.events) {
    observances.push(`${ev.titleEn} · ${ev.titlePa}`);
  }
  for (const pd of personalDates) {
    observances.push(`${pd.title} — ${getPersonalDateKindLabel(pd.kind, false)}`);
  }

  const lines: string[] = [
    '☬ Tatkhalsa Puratan Jantri · ਤੱਤਖ਼ਾਲਸਾ ਪੁਰਾਤਨ ਜੰਤਰੀ',
    '',
    `Desi Date: ${desiEn}`,
    `ਦੇਸੀ ਤਾਰੀਖ਼: ${desiPa}`,
    `Lunar Tithi: ${lunarEn} | ${lunarPa}`,
    `Date: ${gregorianEn}`,
  ];

  if (observances.length > 0) {
    lines.push('', `Today’s Observance: ${observances.join(' • ')}`);
  }

  lines.push('', JANTRI_SHARE_URL);
  return lines.join('\n');
}

export type ShareOutcome = 'shared' | 'copied' | 'aborted' | 'failed';

/**
 * Shares today's Jantri via native Web Share API (`navigator.share`) when available,
 * falling back seamlessly to clipboard copy for WhatsApp / Instagram pasting.
 */
export async function shareDailyJantri(
  day: JantriDay,
  personalDates: PersonalDesiDate[] = [],
): Promise<ShareOutcome> {
  const text = buildDailyShareText(day, personalDates);
  const title = `Tatkhalsa Puratan Jantri — ${day.solar.day} ${day.solar.monthMeta.nameEn}, Sambat ${day.solar.sambat}`;

  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      await navigator.share({
        title,
        text,
        url: JANTRI_SHARE_URL,
      });
      return 'shared';
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return 'aborted';
      }
      // Fall through to clipboard fallback when Web Share is rejected or blocked in desktop/iframe
    }
  }

  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return 'copied';
    } catch {
      // Fall through to legacy textarea copy
    }
  }

  if (typeof document !== 'undefined') {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(textarea);
      return ok ? 'copied' : 'failed';
    } catch {
      return 'failed';
    }
  }

  return 'failed';
}
