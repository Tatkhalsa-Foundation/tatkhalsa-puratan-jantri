import {
  AlertCircle,
  ArrowUpRight,
  CalendarCheck,
  CalendarPlus,
  CloudUpload,
  Download,
  Loader2,
  X,
} from 'lucide-react';
import React, {useEffect, useMemo, useState} from 'react';
import type {IcsExportOptions, LanguageMode, PersonalDesiDate} from '../data/types';
import {formatNum, toGurmukhiNumerals} from '../utils/bikramiEngine';
import {
  isGoogleOAuthConfigured,
  syncRecordsToGoogleCalendar,
  type GoogleCalendarSyncResult,
} from '../utils/googleCalendarSync';
import {collectJantriIcsRecords, generateJantriIcs} from '../utils/icsExport';

interface IcsExportModalProps {
  isOpen: boolean;
  lang: LanguageMode;
  personalDates: PersonalDesiDate[];
  onClose: () => void;
}

const WEBCAL_OBSERVANCES_URL = 'webcal://calendar.tatkhalsa.in/feeds/puratan-jantri-observances.ics';
const WEBCAL_DAILY_URL = 'webcal://calendar.tatkhalsa.in/feeds/puratan-jantri-daily.ics';
const PERPETUAL_EXPORT_SAMBATS = Array.from({length: 11}, (_, i) => 2082 + i);

export const IcsExportModal: React.FC<IcsExportModalProps> = ({
  isOpen,
  lang,
  personalDates,
  onClose,
}) => {
  const isPa = lang === 'pa';
  const [includeDaily, setIncludeDaily] = useState(false);
  const [includeSangrands, setIncludeSangrands] = useState(true);
  const [includePuranmashi, setIncludePuranmashi] = useState(true);
  const [includeMasya, setIncludeMasya] = useState(true);
  const [includeGurpurabs, setIncludeGurpurabs] = useState(true);
  const [includeShaheedi, setIncludeShaheedi] = useState(true);
  const [includeKhalsa, setIncludeKhalsa] = useState(true);
  const [includeBarsis, setIncludeBarsis] = useState(true);
  const [includePersonalDates, setIncludePersonalDates] = useState(true);
  const [sambatScope, setSambatScope] = useState<IcsExportOptions['sambatScope']>('all');
  const [downloadedCount, setDownloadedCount] = useState<number | null>(null);

  // Google OAuth sync state (only enabled when VITE_GOOGLE_CLIENT_ID is configured)
  const googleOAuthReady = isGoogleOAuthConfigured();
  const [confirmGoogleSync, setConfirmGoogleSync] = useState(false);
  const [syncInProgress, setSyncInProgress] = useState(false);
  const [syncProgress, setSyncProgress] = useState<{done: number; total: number} | null>(null);
  const [syncResult, setSyncResult] = useState<GoogleCalendarSyncResult | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setDownloadedCount(null);
      setConfirmGoogleSync(false);
      setSyncError(null);
      setSyncResult(null);
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const exportOptions: IcsExportOptions = useMemo(
    () => ({
      includeDaily,
      includeSangrands,
      includePuranmashi,
      includeMasya,
      includeGurpurabs,
      includeShaheedi,
      includeKhalsa,
      includeBarsis,
      includePersonalDates,
      personalDates,
      sambatScope,
      language: lang,
    }),
    [
      includeDaily,
      includeSangrands,
      includePuranmashi,
      includeMasya,
      includeGurpurabs,
      includeShaheedi,
      includeKhalsa,
      includeBarsis,
      includePersonalDates,
      personalDates,
      sambatScope,
      lang,
    ],
  );

  // Zero work while modal is closed
  const preview = useMemo(() => {
    if (!isOpen) return {content: '', eventCount: 0};
    return generateJantriIcs(exportOptions);
  }, [isOpen, exportOptions]);

  if (!isOpen) return null;

  const activeWebcalUrl = includeDaily ? WEBCAL_DAILY_URL : WEBCAL_OBSERVANCES_URL;
  const googleSubscribeUrl = `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(activeWebcalUrl)}`;

  const handleDownload = () => {
    if (preview.eventCount === 0) return;
    const blob = new Blob([preview.content], {type: 'text/calendar;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const scopeSuffix = sambatScope === 'all' ? '2082-2084' : sambatScope;
    const modeSuffix = includeDaily ? '-daily-full' : '';
    link.download = `tatkhalsa-puratan-jantri-sambat-${scopeSuffix}${modeSuffix}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadedCount(preview.eventCount);
  };

  const handleConfirmGoogleOAuthSync = async () => {
    if (!googleOAuthReady || syncInProgress || preview.eventCount === 0) return;
    setSyncInProgress(true);
    setSyncError(null);
    setSyncResult(null);
    try {
      const {records} = collectJantriIcsRecords(exportOptions);
      const res = await syncRecordsToGoogleCalendar(records, (done, total) => {
        setSyncProgress({done, total});
      });
      setSyncResult(res);
      setConfirmGoogleSync(false);
    } catch (err) {
      setSyncError(
        err instanceof Error
          ? err.message
          : isPa
            ? 'Google Calendar ਸਿੰਕ ਪੂਰਾ ਨਹੀਂ ਹੋ ਸਕਿਆ।'
            : 'Google Calendar sync could not be completed.',
      );
    } finally {
      setSyncInProgress(false);
      setSyncProgress(null);
    }
  };

  const toggles = [
    {
      id: 'ics-daily',
      checked: includeDaily,
      onChange: setIncludeDaily,
      labelEn: 'All Daily Bikrami & Lunar Dates (Every Day)',
      labelPa: 'ਹਰ ਰੋਜ਼ ਦੀਆਂ ਸਾਰੀਆਂ ਬਿਕ੍ਰਮੀ ਅਤੇ ਚੰਦਰ ਤਿਥੀਆਂ (ਪੂਰਾ ਸਾਲ)',
      hintEn:
        'Generates an all-day entry for every calendar day, merging Purabs, Sangrands & My Desi Dates directly into that day’s title.',
      hintPa:
        'ਹਰ ਦਿਨ ਦੀ ਦੇਸੀ ਤਾਰੀਖ਼ ਤੇ ਤਿਥੀ ਸਮੇਤ ਗੁਰਪੁਰਬ/ਸੰਗਰਾਂਦ/ਨਿੱਜੀ ਤਾਰੀਖ਼ ਨੂੰ ਇੱਕੋ ਇਵੈਂਟ ਵਿੱਚ ਜੋੜਦਾ ਹੈ।',
      featured: true,
    },
    {
      id: 'ics-sangrands',
      checked: includeSangrands,
      onChange: setIncludeSangrands,
      labelEn: 'Sangrands (Month Start · 12 Desi Months)',
      labelPa: 'ਸੰਗਰਾਂਦਾਂ (ਮਹੀਨੇ ਦਾ ਆਰੰਭ · ੧੨ ਦੇਸੀ ਮਹੀਨੇ)',
    },
    {
      id: 'ics-puranmashi',
      checked: includePuranmashi,
      onChange: setIncludePuranmashi,
      labelEn: 'Puranmashi (Full Moon · Sudhi 15)',
      labelPa: 'ਪੂਰਨਮਾਸ਼ੀ (ਪੂਰਾ ਚੰਨ · ਸੁਦੀ ੧੫)',
    },
    {
      id: 'ics-masya',
      checked: includeMasya,
      onChange: setIncludeMasya,
      labelEn: 'Masya (New Moon · Vadhi 15)',
      labelPa: 'ਮੱਸਿਆ (ਅਮਾਵਸਿਆ · ਵਦੀ ੧੫)',
    },
    {
      id: 'ics-gurpurabs',
      checked: includeGurpurabs,
      onChange: setIncludeGurpurabs,
      labelEn: 'Gurpurabs (Parkash, Gurgaddi & Joti Jot)',
      labelPa: 'ਗੁਰਪੁਰਬ (ਪ੍ਰਕਾਸ਼, ਗੁਰਗੱਦੀ ਅਤੇ ਜੋਤੀ ਜੋਤ)',
    },
    {
      id: 'ics-shaheedi',
      checked: includeShaheedi,
      onChange: setIncludeShaheedi,
      labelEn: 'Shaheedi Divases',
      labelPa: 'ਸ਼ਹੀਦੀ ਦਿਵਸ',
    },
    {
      id: 'ics-khalsa',
      checked: includeKhalsa,
      onChange: setIncludeKhalsa,
      labelEn: 'Khalsa & Sampardai Historical Days',
      labelPa: 'ਖ਼ਾਲਸਾ ਅਤੇ ਸੰਪਰਦਾਇ ਇਤਿਹਾਸਕ ਦਿਹਾੜੇ',
    },
    {
      id: 'ics-barsis',
      checked: includeBarsis,
      onChange: setIncludeBarsis,
      labelEn: 'Barsis & Mahapurakhs',
      labelPa: 'ਬਰਸੀਆਂ ਅਤੇ ਮਹਾਂਪੁਰਖ',
    },
    {
      id: 'ics-personal',
      checked: includePersonalDates,
      onChange: setIncludePersonalDates,
      labelEn:
        personalDates.length > 0
          ? `My Personal Desi Dates (${personalDates.length} saved)`
          : 'My Personal Desi Dates (none saved yet)',
      labelPa:
        personalDates.length > 0
          ? `ਮੇਰੀਆਂ ਨਿੱਜੀ ਦੇਸੀ ਤਾਰੀਖ਼ਾਂ (${formatNum(personalDates.length, 'pa')} ਸੰਭਾਲੀਆਂ)`
          : 'ਮੇਰੀਆਂ ਨਿੱਜੀ ਦੇਸੀ ਤਾਰੀਖ਼ਾਂ (ਹਾਲੇ ਕੋਈ ਨਹੀਂ)',
    },
  ];

  return (
    <div
      className="no-print fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-backdrop)] backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ics-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        data-testid="ics-export-modal"
        className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] shadow-2xl overflow-hidden"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 py-4 shrink-0">
          <div>
            <h2
              id="ics-modal-title"
              className="font-display text-2xl font-semibold text-[var(--text-heading)]"
            >
              {isPa ? 'ਕੈਲੰਡਰ ਸਿੰਕ ਅਤੇ .ics ਡਾਊਨਲੋਡ' : 'Subscribe & Export Jantri (.ics)'}
            </h2>
            <p className="mt-0.5 text-xs text-[var(--text-muted)]">
              {isPa
                ? 'Apple Calendar, Google Calendar ਅਤੇ Outlook ਲਈ 1-ਕਲਿੱਕ ਸਬਸਕ੍ਰਿਪਸ਼ਨ ਅਤੇ .ics ਫ਼ਾਈਲ'
                : '1-Click Apple & Google Calendar subscription feeds plus custom RFC 5545 .ics export'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={isPa ? 'ਬੰਦ ਕਰੋ' : 'Close export dialog'}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-md text-[var(--text-muted)] hover:bg-[var(--bg-hover)] cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* 1-Click Live Subscribe & Direct Google Sync */}
          <section
            aria-labelledby="calendar-subscribe-heading"
            className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] p-4 space-y-3"
          >
            <div>
              <h3
                id="calendar-subscribe-heading"
                className="text-xs font-semibold uppercase tracking-wide text-[var(--text-heading)]"
              >
                {isPa ? '1-ਕਲਿੱਕ ਲਾਈਵ ਸਬਸਕ੍ਰਾਈਬ (ਸੰਮਤ ੨੦੮੨–੨੦੮੬)' : '1-Click Live Subscribe (Sambat 2082–2086)'}
              </h3>
              <p className="mt-0.5 text-[11px] text-[var(--text-muted)] leading-snug">
                {includeDaily
                  ? isPa
                    ? 'ਰੋਜ਼ਾਨਾ ਦੇਸੀ ਤਾਰੀਖ਼ਾਂ + ਪੁਰਬ ਫ਼ੀਡ (ਹਰ ਰੋਜ਼ ਆਟੋਮੈਟਿਕ ਅੱਪਡੇਟ)'
                    : 'Subscribes to the full Daily Bikrami & Lunar Dates + Purabs feed (updates automatically).'
                  : isPa
                    ? 'ਸੰਗਰਾਂਦਾਂ, ਪੂਰਨਮਾਸ਼ੀ, ਮੱਸਿਆ ਅਤੇ ਗੁਰਪੁਰਬ ਫ਼ੀਡ (ਆਟੋਮੈਟਿਕ ਅੱਪਡੇਟ)'
                    : 'Subscribes to the Puratan Observances feed (Sangrands, Puranmashi, Masya & Purabs).'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href={activeWebcalUrl}
                data-testid="apple-calendar-subscribe-link"
                className="inline-flex items-center justify-center gap-1.5 min-h-[42px] px-3 py-2 text-xs font-semibold rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] text-[var(--text-heading)] hover:bg-[var(--bg-hover)] transition-colors whitespace-nowrap"
              >
                <CalendarPlus className="w-3.5 h-3.5 text-[var(--accent-primary-text)] shrink-0" aria-hidden="true" />
                <span>{isPa ? 'Apple Calendar ਵਿੱਚ ਜੋੜੋ' : 'Add to Apple Calendar'}</span>
              </a>

              <a
                href={googleSubscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="google-calendar-subscribe-link"
                className="inline-flex items-center justify-center gap-1.5 min-h-[42px] px-3 py-2 text-xs font-semibold rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] text-[var(--text-heading)] hover:bg-[var(--bg-hover)] transition-colors whitespace-nowrap"
              >
                <CalendarPlus className="w-3.5 h-3.5 text-[var(--accent-primary-text)] shrink-0" aria-hidden="true" />
                <span>{isPa ? 'Google Calendar (1-ਕਲਿੱਕ)' : 'Google Calendar (1-Click)'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              </a>
            </div>

            {/* Direct Google Account OAuth Sync (Client-Side GIS, Zero Client Secret) */}
            <div className="pt-2 border-t border-[var(--border-divider)] space-y-2">
              {googleOAuthReady ? (
                <>
                  {!confirmGoogleSync ? (
                    <button
                      type="button"
                      disabled={syncInProgress || preview.eventCount === 0}
                      onClick={() => {
                        setSyncError(null);
                        setSyncResult(null);
                        setConfirmGoogleSync(true);
                      }}
                      data-testid="google-oauth-sync-btn"
                      className="w-full inline-flex items-center justify-center gap-1.5 min-h-[40px] px-3 py-2 text-xs font-semibold rounded-md border border-[var(--accent-primary)] bg-[var(--accent-primary-tint)] text-[var(--text-heading)] hover:bg-[var(--bg-hover)] disabled:opacity-45 cursor-pointer transition-colors"
                    >
                      <CloudUpload className="w-4 h-4 text-[var(--accent-primary-text)]" aria-hidden="true" />
                      <span>
                        {isPa
                          ? 'Google ਖਾਤੇ ਵਿੱਚ ਸਿੱਧਾ ਸਿੰਕ ਕਰੋ (ਕਸਟਮ ਚੋਣ ਸਮੇਤ)'
                          : 'Sync Custom Selection to Google Account (OAuth)'}
                      </span>
                    </button>
                  ) : (
                    <div className="rounded-lg border border-[var(--accent-primary)] bg-[var(--bg-surface-elevated)] p-3 space-y-2.5 text-xs">
                      <p className="font-medium text-[var(--text-heading)]">
                        {isPa
                          ? `ਕੀ ਤੁਸੀਂ ${formatNum(preview.eventCount, 'pa')} ਦਿਹਾੜੇ ਆਪਣੇ "Tatkhalsa Puratan Jantri" Google Calendar ਵਿੱਚ ਸਿੰਕ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?`
                          : `Sync ${preview.eventCount} selected events into a dedicated "Tatkhalsa Puratan Jantri" Google Calendar?`}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          disabled={syncInProgress}
                          onClick={handleConfirmGoogleOAuthSync}
                          className="inline-flex items-center gap-1.5 min-h-[38px] px-3.5 py-1.5 rounded-md bg-[var(--accent-navy)] text-[var(--accent-on-navy)] font-semibold hover:bg-[var(--accent-navy-hover)] disabled:opacity-50 cursor-pointer"
                        >
                          {syncInProgress && <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />}
                          <span>
                            {syncInProgress && syncProgress
                              ? `${syncProgress.done}/${syncProgress.total}`
                              : isPa
                                ? 'ਹਾਂ, ਸਿੰਕ ਸ਼ੁਰੂ ਕਰੋ'
                                : 'Confirm & Sync'}
                          </span>
                        </button>
                        <button
                          type="button"
                          disabled={syncInProgress}
                          onClick={() => setConfirmGoogleSync(false)}
                          className="min-h-[38px] px-3 py-1.5 rounded-md border border-[var(--border-strong)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] cursor-pointer"
                        >
                          {isPa ? 'ਰੱਦ ਕਰੋ' : 'Cancel'}
                        </button>
                      </div>
                    </div>
                  )}

                  {syncResult && (
                    <div
                      role="status"
                      className="flex items-center gap-2 rounded-md border border-[var(--border-strong)] bg-[var(--accent-navy-tint)] px-3 py-2 text-xs text-[var(--text-heading)]"
                    >
                      <CalendarCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>
                        {isPa
                          ? `${syncResult.calendarName}: ${formatNum(syncResult.created, 'pa')} ਨਵੇਂ, ${formatNum(syncResult.updated, 'pa')} ਅੱਪਡੇਟ ਹੋਏ।`
                          : `Synced to ${syncResult.calendarName}: ${syncResult.created} added, ${syncResult.updated} updated.`}
                      </span>
                    </div>
                  )}

                  {syncError && (
                    <div
                      role="alert"
                      className="flex items-center gap-2 rounded-md border border-[var(--accent-shaheedi)]/35 bg-[var(--accent-shaheedi-tint)] px-3 py-2 text-xs text-[var(--accent-shaheedi)]"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{syncError}</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                  <button
                    type="button"
                    disabled
                    data-testid="google-oauth-disabled-btn"
                    className="inline-flex items-center justify-center gap-1.5 min-h-[38px] px-3 py-1.5 text-xs font-medium rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-faint)] opacity-65 cursor-not-allowed"
                  >
                    <CloudUpload className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{isPa ? 'Google ਖਾਤਾ OAuth ਸਿੰਕ' : 'Sync via Google Account (OAuth)'}</span>
                  </button>
                  <span
                    data-testid="google-oauth-coming-soon"
                    className="text-[11px] text-[var(--text-muted)]"
                  >
                    {isPa
                      ? 'ਜਲਦੀ ਆ ਰਿਹਾ ਹੈ — ਉੱਪਰ 1-ਕਲਿੱਕ ਸਬਸਕ੍ਰਾਈਬ ਵਰਤੋ'
                      : 'Coming soon — use 1-Click Subscribe above'}
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* Sambat Scope Selector (Verified Core + Perpetual Any Year) */}
          <div className="space-y-2">
            <span className="block text-xs font-medium text-[var(--text-muted)]">
              {isPa ? 'ਕਸਟਮ .ics ਲਈ ਸੰਮਤ ਦੀ ਚੋਣ' : 'Custom .ics Sambat Year Scope'}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-1">
              {(
                [
                  {id: 'all', en: '2082–2084', pa: '੨੦੮੨–੨੦੮੪'},
                  {id: '2082', en: 'Sambat 2082', pa: 'ਸੰਮਤ ੨੦੮੨'},
                  {id: '2083', en: 'Sambat 2083', pa: 'ਸੰਮਤ ੨੦੮੩'},
                  {id: '2084', en: 'Sambat 2084', pa: 'ਸੰਮਤ ੨੦੮੪'},
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSambatScope(opt.id)}
                  aria-pressed={sambatScope === opt.id}
                  className={`min-h-[38px] text-xs font-medium rounded-sm transition-colors cursor-pointer ${
                    sambatScope === opt.id
                      ? 'bg-[var(--bg-surface-elevated)] text-[var(--text-heading)] shadow-xs'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {isPa ? opt.pa : opt.en}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor="ics-perpetual-sambat-select"
                className="text-xs text-[var(--text-muted)] whitespace-nowrap"
              >
                {isPa ? 'ਜਾਂ ਭਵਿੱਖ ਦਾ ਸੰਮਤ:' : 'Or any Sambat year:'}
              </label>
              <select
                id="ics-perpetual-sambat-select"
                data-testid="ics-sambat-select"
                aria-label={isPa ? 'ਕੋਈ ਵੀ ਸੰਮਤ ਚੁਣੋ' : 'Select custom Sambat year'}
                value={sambatScope}
                onChange={(e) => setSambatScope(e.target.value)}
                className="flex-1 min-h-[38px] rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] px-2.5 text-xs font-medium text-[var(--text-primary)] focus:outline-2 focus:outline-[var(--accent-primary)] cursor-pointer"
              >
                <option value="all">{isPa ? 'ਸੰਮਤ ੨੦੮੨–੨੦੮੪ (੩ ਸਾਲ)' : 'Sambat 2082–2084 (3 Years)'}</option>
                <option value="2082-2086">{isPa ? 'ਸੰਮਤ ੨੦੮੨–੨੦੮੬ (੫ ਸਾਲ)' : 'Sambat 2082–2086 (5 Years)'}</option>
                {PERPETUAL_EXPORT_SAMBATS.map((s) => (
                  <option key={s} value={String(s)}>
                    {isPa
                      ? `ਸੰਮਤ ${toGurmukhiNumerals(s)} (${toGurmukhiNumerals(s - 57)}–${toGurmukhiNumerals((s - 56) % 100)})`
                      : `Sambat ${s} (${s - 57}–${String((s - 56) % 100).padStart(2, '0')})`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Event Category Checkboxes */}
          <fieldset className="space-y-2">
            <legend className="text-xs font-medium text-[var(--text-muted)] mb-2">
              {isPa ? 'ਸ਼ਾਮਲ ਕਰਨ ਵਾਲੇ ਦਿਹਾੜੇ' : 'Include Observances'}
            </legend>
            {toggles.map((t) => (
              <label
                key={t.id}
                htmlFor={t.id}
                className={`flex items-start gap-3 min-h-[42px] px-3 py-2.5 rounded-md border cursor-pointer transition-colors ${
                  t.featured
                    ? t.checked
                      ? 'border-[var(--accent-primary)] bg-[var(--accent-primary-tint)]'
                      : 'border-[var(--accent-gold)]/50 bg-[var(--bg-surface-soft)] hover:bg-[var(--bg-hover)]'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                <input
                  id={t.id}
                  type="checkbox"
                  checked={t.checked}
                  onChange={(e) => t.onChange(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-[var(--accent-primary)] rounded-xs cursor-pointer shrink-0"
                />
                <span className="min-w-0">
                  <span
                    className={`block text-sm ${
                      t.featured
                        ? 'font-semibold text-[var(--text-heading)]'
                        : 'text-[var(--text-primary)]'
                    }`}
                  >
                    {isPa ? t.labelPa : t.labelEn}
                  </span>
                  {t.hintEn && (
                    <span className="mt-0.5 block text-[11px] text-[var(--text-muted)] leading-snug">
                      {isPa ? t.hintPa : t.hintEn}
                    </span>
                  )}
                </span>
              </label>
            ))}
          </fieldset>

          {downloadedCount !== null && (
            <div
              role="status"
              className="flex items-center gap-2 rounded-md border border-[var(--border-strong)] bg-[var(--accent-navy-tint)] px-3.5 py-2.5 text-xs font-medium text-[var(--text-heading)]"
            >
              <CalendarCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>
                {isPa
                  ? `${formatNum(downloadedCount, 'pa')} ਦਿਹਾੜਿਆਂ ਵਾਲੀ .ics ਫ਼ਾਈਲ ਡਾਊਨਲੋਡ ਹੋ ਗਈ ਹੈ।`
                  : `Downloaded .ics calendar containing ${downloadedCount} Puratan Jantri dates.`}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 py-3.5 shrink-0">
          <div className="min-w-0 space-y-0.5">
            <p
              className="text-xs font-mono-tabular font-medium text-[var(--text-primary)]"
              data-testid="ics-selected-count"
            >
              {isPa
                ? `ਕੁੱਲ ${formatNum(preview.eventCount, 'pa')} ਦਿਹਾੜੇ ਚੁਣੇ ਗਏ`
                : `${preview.eventCount} dates selected`}
            </p>
            {includeDaily && (
              <p
                data-testid="ics-daily-merge-note"
                className="text-[11px] leading-snug text-[var(--text-muted)]"
              >
                {isPa
                  ? 'ਸਾਰੇ ਗੁਰਪੁਰਬ, ਸੰਗਰਾਂਦਾਂ ਅਤੇ ਨਿੱਜੀ ਤਾਰੀਖ਼ਾਂ ਵੱਖਰੇ ਇਵੈਂਟ ਦੀ ਬਜਾਏ ੩੬੫/੩੬੬ ਰੋਜ਼ਾਨਾ ਇਵੈਂਟਾਂ (੨੦੮੨–੨੦੮੪ ਲਈ ੧,੦੯੬) ਵਿੱਚ ਜੋੜ ਦਿੱਤੀਆਂ ਜਾਂਦੀਆਂ ਹਨ।'
                  : 'Checked observances are merged into the 365/366 daily events (1,096 total for 2082–2084) rather than counted as separate events.'}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleDownload}
            disabled={preview.eventCount === 0}
            className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-medium rounded-md bg-[var(--accent-navy)] text-[var(--accent-on-navy)] hover:bg-[var(--accent-navy-hover)] disabled:opacity-45 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            <span>{isPa ? '.ics ਫ਼ਾਈਲ ਡਾਊਨਲੋਡ' : 'Download .ics'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
