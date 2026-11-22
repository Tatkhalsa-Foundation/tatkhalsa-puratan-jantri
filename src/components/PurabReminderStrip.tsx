import {Bell, BellOff, ChevronRight} from 'lucide-react';
import React from 'react';
import type {LanguageMode} from '../data/types';
import type {TomorrowReminderSummary} from '../utils/purabReminders';

interface PurabReminderStripProps {
  lang: LanguageMode;
  enabled: boolean;
  permissionStatus: NotificationPermission | 'unsupported';
  statusFeedback: string | null;
  tomorrowSummary: TomorrowReminderSummary;
  onToggleReminders: () => void;
  onInspectTomorrow: (isoDate: string) => void;
}

export const PurabReminderStrip: React.FC<PurabReminderStripProps> = ({
  lang,
  enabled,
  permissionStatus,
  statusFeedback,
  tomorrowSummary,
  onToggleReminders,
  onInspectTomorrow,
}) => {
  const isPa = lang === 'pa';

  return (
    <section
      aria-label={isPa ? 'ਪੁਰਬ ਯਾਦ-ਦਹਾਨੀ' : 'Purab reminder settings'}
      className="no-print rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] px-4 py-3.5 sm:px-5 space-y-2.5"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          {enabled ? (
            <Bell
              className="w-4 h-4 text-[var(--accent-primary-text)] mt-0.5 shrink-0"
              aria-hidden="true"
            />
          ) : (
            <BellOff
              className="w-4 h-4 text-[var(--text-faint)] mt-0.5 shrink-0"
              aria-hidden="true"
            />
          )}
          <div className="min-w-0">
            <label
              htmlFor="purab-reminder-toggle"
              className="block text-sm font-medium text-[var(--text-heading)] leading-snug cursor-pointer"
            >
              {isPa
                ? 'ਸੰਗਰਾਂਦ, ਪੂਰਨਮਾਸ਼ੀ ਅਤੇ ਗੁਰਪੁਰਬਾਂ ਤੋਂ ੧ ਦਿਨ ਪਹਿਲਾਂ ਯਾਦ ਦਿਵਾਓ'
                : 'Remind me 1 day before Sangrand, Puranmashi & Gurpurabs'}
            </label>
            <p className="mt-0.5 text-xs text-[var(--text-muted)]">
              {statusFeedback
                ? statusFeedback
                : enabled
                  ? isPa
                    ? 'ਚਾਲੂ — ਐਪ ਖੋਲ੍ਹਣ ਜਾਂ ਅੱਧੀ ਰਾਤ ਨੂੰ ਕੱਲ੍ਹ ਦੇ ਸੰਗਰਾਂਦ, ਪੂਰਨਮਾਸ਼ੀ, ਮੱਸਿਆ, ਗੁਰਪੁਰਬ ਅਤੇ ਨਿੱਜੀ ਦੇਸੀ ਦਿਹਾੜਿਆਂ ਦੀ ਸੂਚਨਾ ਮਿਲੇਗੀ।'
                    : 'Active — checks on app open & midnight for tomorrow’s Sangrand (Month Start), Puranmashi (Full Moon), Masya (New Moon), Gurpurabs & My Desi Dates.'
                  : permissionStatus === 'denied'
                    ? isPa
                      ? 'ਬ੍ਰਾਊਜ਼ਰ ਸੂਚਨਾਵਾਂ ਬੰਦ ਹਨ — ਸੈਟਿੰਗਾਂ ਵਿੱਚ Notifications ਦੀ ਇਜਾਜ਼ਤ ਦਿਓ।'
                      : 'Browser notifications are blocked — allow Notifications in your browser settings to enable alerts.'
                    : isPa
                      ? 'ਕੱਲ੍ਹ ਆਉਣ ਵਾਲੀ ਸੰਗਰਾਂਦ, ਪੂਰਨਮਾਸ਼ੀ, ਮੱਸਿਆ, ਗੁਰਪੁਰਬ ਜਾਂ ਨਿੱਜੀ ਦੇਸੀ ਤਾਰੀਖ਼ ਬਾਰੇ ਬ੍ਰਾਊਜ਼ਰ ਸੂਚਨਾ।'
                      : 'Browser notification alert 1 day before Sangrand, Puranmashi, Masya, Gurpurabs & My Desi Dates.'}
            </p>
          </div>
        </div>

        <button
          id="purab-reminder-toggle"
          type="button"
          role="switch"
          aria-checked={enabled}
          data-testid="purab-reminder-switch"
          onClick={onToggleReminders}
          className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)] ${
            enabled
              ? 'bg-[var(--accent-primary)] border-[var(--accent-primary)]'
              : 'bg-[var(--bg-hover)] border-[var(--border-strong)]'
          }`}
        >
          <span className="sr-only">
            {isPa
              ? '੧ ਦਿਨ ਪਹਿਲਾਂ ਯਾਦ-ਦਹਾਨੀ ਚਾਲੂ ਜਾਂ ਬੰਦ ਕਰੋ'
              : 'Toggle 1-day-before Purab reminders'}
          </span>
          <span
            aria-hidden="true"
            className={`inline-block h-5 w-5 rounded-full shadow-xs transition-transform ${
              enabled
                ? 'translate-x-6 bg-[var(--accent-on-primary)]'
                : 'translate-x-1 bg-[var(--bg-surface-elevated)]'
            }`}
          />
        </button>
      </div>

      {/* Live Tomorrow Alert Preview when tomorrow has a Sangrand, Puranmashi, Masya, Purab, or Personal Desi Date */}
      {tomorrowSummary.hasReminderItems && (
        <button
          type="button"
          onClick={() => onInspectTomorrow(tomorrowSummary.tomorrowIso)}
          data-testid="tomorrow-reminder-preview"
          className="w-full flex items-center justify-between gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] px-3 py-2 text-left text-xs hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
        >
          <span className="min-w-0 truncate">
            <span className="font-semibold text-[var(--accent-primary-text)]">
              {isPa ? `${tomorrowSummary.titlePa}: ` : `${tomorrowSummary.titleEn}: `}
            </span>
            <span className="text-[var(--text-primary)]">
              {isPa ? tomorrowSummary.bodyPa : tomorrowSummary.bodyEn}
            </span>
          </span>
          <ChevronRight className="w-4 h-4 text-[var(--text-faint)] shrink-0" aria-hidden="true" />
        </button>
      )}
    </section>
  );
};
