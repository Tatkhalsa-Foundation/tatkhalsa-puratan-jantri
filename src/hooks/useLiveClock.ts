import {useEffect, useState} from 'react';
import {getEffectiveTodayIso} from '../utils/bikramiEngine';

export interface LiveClockSnapshot {
  now: Date;
  anandpurTime: string; // HH:MM:SS AM/PM in Asia/Kolkata
  anandpurDate: string;
  localTime: string; // HH:MM:SS AM/PM in device local timezone
  localDate: string;
  localTimeZoneLabel: string;
  isSameZone: boolean;
  effectiveTodayIso: string;
}

function normalizeAmPm(timeText: string): string {
  return timeText
    .replace(/[\u202f\u00a0]/g, ' ')
    .replace(/\b(am|pm)\b/gi, (m) => m.toUpperCase())
    .replace(/\s+/g, ' ')
    .trim();
}

export function formatLiveClockSnapshot(now: Date, localTimeZone?: string): LiveClockSnapshot {
  const resolvedLocalTz =
    localTimeZone ||
    (typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC') ||
    'UTC';

  const anandpurTime = normalizeAmPm(
    new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(now),
  );

  const anandpurDate = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'short',
  }).format(now);

  const localTime = normalizeAmPm(
    new Intl.DateTimeFormat('en-US', {
      timeZone: resolvedLocalTz,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(now),
  );

  const localDate = new Intl.DateTimeFormat('en-US', {
    timeZone: resolvedLocalTz,
    day: 'numeric',
    month: 'short',
  }).format(now);

  let localTimeZoneLabel = resolvedLocalTz;
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: resolvedLocalTz,
      timeZoneName: 'short',
    }).formatToParts(now);
    const tzPart = parts.find((p) => p.type === 'timeZoneName')?.value;
    if (tzPart) {
      const city = resolvedLocalTz.split('/').pop()?.replace(/_/g, ' ') || resolvedLocalTz;
      localTimeZoneLabel =
        city.toUpperCase() === tzPart.toUpperCase() ? tzPart : `${city} (${tzPart})`;
    }
  } catch {
    localTimeZoneLabel = resolvedLocalTz;
  }

  const isSameZone = resolvedLocalTz === 'Asia/Kolkata' || resolvedLocalTz === 'Asia/Calcutta';

  return {
    now,
    anandpurTime,
    anandpurDate,
    localTime,
    localDate,
    localTimeZoneLabel,
    isSameZone,
    effectiveTodayIso: getEffectiveTodayIso(now),
  };
}

/**
 * Live 1-second phone/device-synced clock hook alongside Sri Anandpur Sahib (IST).
 * Automatically reflects midnight/date rollovers so Ajj Da Din and countdowns stay current without reloads.
 */
export function useLiveClock(): LiveClockSnapshot {
  const [snapshot, setSnapshot] = useState<LiveClockSnapshot>(() =>
    formatLiveClockSnapshot(new Date()),
  );

  useEffect(() => {
    const tick = () => {
      setSnapshot(formatLiveClockSnapshot(new Date()));
    };
    const intervalId = window.setInterval(tick, 1000);
    // Refresh immediately when user returns to an open mobile tab after midnight
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') tick();
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return snapshot;
}
