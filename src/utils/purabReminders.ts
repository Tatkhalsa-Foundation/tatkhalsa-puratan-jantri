import type {JantriDay, PersonalDesiDate} from '../data/types';
import {addDaysIso, getJantriDay, toGurmukhiNumerals} from './bikramiEngine';
import {getPersonalDateKindLabel, getPersonalDatesForSolarDay} from './personalDates';

export const LAST_NOTIFIED_TOMORROW_KEY = 'tatkhalsa_last_notified_tomorrow_v1';

export interface TomorrowReminderItem {
  kind: 'sangrand' | 'puranmashi' | 'masya' | 'purab' | 'personal';
  labelEn: string;
  labelPa: string;
}

export interface TomorrowReminderSummary {
  tomorrowIso: string;
  tomorrowDay: JantriDay;
  items: TomorrowReminderItem[];
  hasReminderItems: boolean;
  titleEn: string;
  titlePa: string;
  bodyEn: string;
  bodyPa: string;
}

/**
 * Pure check for whether tomorrow (relative to todayIso) is a Sangrand, Puranmashi,
 * Masya, Gurpurab/Shaheedi/Historical Purab, or user-saved Personal Desi Date.
 */
export function getTomorrowObservances(
  todayIso: string,
  personalDates: PersonalDesiDate[] = [],
): TomorrowReminderSummary {
  const tomorrowIso = addDaysIso(todayIso, 1);
  const tomorrowDay = getJantriDay(tomorrowIso, true);
  const items: TomorrowReminderItem[] = [];

  if (tomorrowDay.solar.isSangrand) {
    items.push({
      kind: 'sangrand',
      labelEn: `${tomorrowDay.solar.monthMeta.nameEn} Sangrand (Month Start)`,
      labelPa: `${tomorrowDay.solar.monthMeta.namePa} ਸੰਗਰਾਂਦ (ਮਹੀਨੇ ਦਾ ਆਰੰਭ)`,
    });
  }

  if (tomorrowDay.lunar.isPuranmashi) {
    items.push({
      kind: 'puranmashi',
      labelEn: `${tomorrowDay.lunar.lunarMonthEn} Puranmashi (Full Moon)`,
      labelPa: `${tomorrowDay.lunar.lunarMonthPa} ਪੂਰਨਮਾਸ਼ੀ (ਪੂਰਾ ਚੰਨ)`,
    });
  } else if (tomorrowDay.lunar.isMasya) {
    items.push({
      kind: 'masya',
      labelEn: `${tomorrowDay.lunar.lunarMonthEn} Masya (New Moon)`,
      labelPa: `${tomorrowDay.lunar.lunarMonthPa} ਮੱਸਿਆ (ਅਮਾਵਸਿਆ)`,
    });
  }

  for (const ev of tomorrowDay.events) {
    items.push({
      kind: 'purab',
      labelEn: ev.titleEn,
      labelPa: ev.titlePa,
    });
  }

  const matchingPersonal = getPersonalDatesForSolarDay(
    personalDates,
    tomorrowDay.solar.monthId,
    tomorrowDay.solar.day,
  );
  for (const pd of matchingPersonal) {
    items.push({
      kind: 'personal',
      labelEn: `${pd.title} (${getPersonalDateKindLabel(pd.kind, false)})`,
      labelPa: `${pd.title} (${getPersonalDateKindLabel(pd.kind, true)})`,
    });
  }

  const desiEn = `${tomorrowDay.solar.day} ${tomorrowDay.solar.monthMeta.nameEn}, Sambat ${tomorrowDay.solar.sambat}`;
  const desiPa = `${toGurmukhiNumerals(tomorrowDay.solar.day)} ${tomorrowDay.solar.monthMeta.namePa}, ਸੰਮਤ ${toGurmukhiNumerals(tomorrowDay.solar.sambat)}`;

  return {
    tomorrowIso,
    tomorrowDay,
    items,
    hasReminderItems: items.length > 0,
    titleEn: `Tomorrow · ${desiEn}`,
    titlePa: `ਕੱਲ੍ਹ · ${desiPa}`,
    bodyEn: items.map((i) => i.labelEn).join(' · '),
    bodyPa: items.map((i) => i.labelPa).join(' · '),
  };
}

export function shouldDispatchReminderForDate(
  lastNotifiedTomorrowIso: string | null,
  tomorrowIso: string,
): boolean {
  return lastNotifiedTomorrowIso !== tomorrowIso;
}

export function getLastNotifiedTomorrowIso(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(LAST_NOTIFIED_TOMORROW_KEY);
  } catch {
    return null;
  }
}

export function setLastNotifiedTomorrowIso(tomorrowIso: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LAST_NOTIFIED_TOMORROW_KEY, tomorrowIso);
  } catch {
    // Ignore storage errors
  }
}

export function dispatchTomorrowPurabNotification(
  summary: TomorrowReminderSummary,
  isPa: boolean,
): boolean {
  if (typeof window === 'undefined' || typeof Notification === 'undefined') return false;
  if (Notification.permission !== 'granted') return false;
  if (!summary.hasReminderItems) return false;
  if (!shouldDispatchReminderForDate(getLastNotifiedTomorrowIso(), summary.tomorrowIso)) {
    return false;
  }

  try {
    new Notification(isPa ? summary.titlePa : summary.titleEn, {
      body: isPa ? summary.bodyPa : summary.bodyEn,
      icon: './logo.png?v=3',
      tag: `tatkhalsa-purab-${summary.tomorrowIso}`,
    });
    setLastNotifiedTomorrowIso(summary.tomorrowIso);
    return true;
  } catch {
    return false;
  }
}
