import {CalendarCheck, Download, X} from 'lucide-react';
import React, {useEffect, useMemo, useState} from 'react';
import type {IcsExportOptions, LanguageMode, PersonalDesiDate} from '../data/types';
import {formatNum} from '../utils/bikramiEngine';
import {generateJantriIcs} from '../utils/icsExport';

interface IcsExportModalProps {
  isOpen: boolean;
  lang: LanguageMode;
  personalDates: PersonalDesiDate[];
  onClose: () => void;
}

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

  useEffect(() => {
    if (!isOpen) {
      setDownloadedCount(null);
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const preview = useMemo(() => {
    return generateJantriIcs({
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
    });
  }, [
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
  ]);

  if (!isOpen) return null;

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
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] shadow-2xl overflow-hidden">
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 py-4 shrink-0">
          <div>
            <h2
              id="ics-modal-title"
              className="font-display text-2xl font-semibold text-[var(--text-heading)]"
            >
              {isPa ? '.ics ਕੈਲੰਡਰ ਡਾਊਨਲੋਡ ਕਰੋ' : 'Export Puratan Jantri (.ics)'}
            </h2>
            <p className="mt-0.5 text-xs text-[var(--text-muted)]">
              {isPa
                ? 'Apple Calendar, Google Calendar ਅਤੇ Outlook ਲਈ ਪ੍ਰਮਾਣਿਕ .ics ਫ਼ਾਈਲ'
                : 'Compatible with Apple Calendar, Google Calendar, and Outlook (RFC 5545)'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={isPa ? 'ਬੰਦ ਕਰੋ' : 'Close export dialog'}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-md text-[var(--text-muted)] hover:bg-[var(--bg-hover)] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Sambat Scope Selector */}
          <div>
            <span className="block text-xs font-medium text-[var(--text-muted)] mb-2">
              {isPa ? 'ਸੰਮਤ ਦੀ ਚੋਣ' : 'Sambat Year Scope'}
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
          <p
            className="text-xs font-mono-tabular text-[var(--text-muted)]"
            data-testid="ics-selected-count"
          >
            {isPa
              ? `ਕੁੱਲ ${formatNum(preview.eventCount, 'pa')} ਦਿਹਾੜੇ ਚੁਣੇ ਗਏ`
              : `${preview.eventCount} dates selected`}
          </p>
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
