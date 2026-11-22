import {CalendarCheck, Download, X} from 'lucide-react';
import React, {useEffect, useMemo, useState} from 'react';
import type {IcsExportOptions, LanguageMode} from '../data/types';
import {formatNum} from '../utils/bikramiEngine';
import {generateJantriIcs} from '../utils/icsExport';

interface IcsExportModalProps {
  isOpen: boolean;
  lang: LanguageMode;
  onClose: () => void;
}

export const IcsExportModal: React.FC<IcsExportModalProps> = ({isOpen, lang, onClose}) => {
  const isPa = lang === 'pa';
  const [includeSangrands, setIncludeSangrands] = useState(true);
  const [includePuranmashi, setIncludePuranmashi] = useState(true);
  const [includeMasya, setIncludeMasya] = useState(true);
  const [includeGurpurabs, setIncludeGurpurabs] = useState(true);
  const [includeShaheedi, setIncludeShaheedi] = useState(true);
  const [includeKhalsa, setIncludeKhalsa] = useState(true);
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
      includeSangrands,
      includePuranmashi,
      includeMasya,
      includeGurpurabs,
      includeShaheedi,
      includeKhalsa,
      sambatScope,
      language: lang,
    });
  }, [
    includeSangrands,
    includePuranmashi,
    includeMasya,
    includeGurpurabs,
    includeShaheedi,
    includeKhalsa,
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
    const scopeSuffix = sambatScope === 'all' ? '2083-2084' : sambatScope;
    link.download = `tatkhalsa-puratan-jantri-sambat-${scopeSuffix}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadedCount(preview.eventCount);
  };

  const toggles = [
    {
      id: 'ics-sangrands',
      checked: includeSangrands,
      onChange: setIncludeSangrands,
      labelEn: 'Sangrands (12 Punjabi Solar Months)',
      labelPa: 'ਸੰਗਰਾਂਦਾਂ (੧੨ ਦੇਸੀ ਮਹੀਨੇ)',
    },
    {
      id: 'ics-puranmashi',
      checked: includePuranmashi,
      onChange: setIncludePuranmashi,
      labelEn: 'Puranmashi (Full Moon · Sudhi 15)',
      labelPa: 'ਪੂਰਨਮਾਸ਼ੀ (ਸੁਦੀ ੧੫)',
    },
    {
      id: 'ics-masya',
      checked: includeMasya,
      onChange: setIncludeMasya,
      labelEn: 'Masya (New Moon · Vadhi 15)',
      labelPa: 'ਮੱਸਿਆ (ਵਦੀ ੧੫)',
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
  ];

  return (
    <div
      className="no-print fixed inset-0 z-50 flex items-center justify-center bg-[#1C1917]/50 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ics-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg rounded-xl border border-[#DDD3C0] bg-[#FAF6EE] shadow-2xl overflow-hidden">
        <div className="flex items-start justify-between gap-4 border-b border-[#DDD3C0] bg-[#F3ECE0] px-5 py-4">
          <div>
            <h2 id="ics-modal-title" className="font-display text-2xl font-semibold text-[#1C1917]">
              {isPa ? '.ics ਕੈਲੰਡਰ ਡਾਊਨਲੋਡ ਕਰੋ' : 'Export Puratan Jantri (.ics)'}
            </h2>
            <p className="mt-0.5 text-xs text-[#57534E]">
              {isPa
                ? 'Apple Calendar, Google Calendar ਅਤੇ Outlook ਲਈ ਪ੍ਰਮਾਣਿਕ .ics ਫ਼ਾਈਲ'
                : 'Compatible with Apple Calendar, Google Calendar, and Outlook (RFC 5545)'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={isPa ? 'ਬੰਦ ਕਰੋ' : 'Close export dialog'}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-md text-[#57534E] hover:bg-[#EDE4D3] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Sambat Scope Selector */}
          <div>
            <span className="block text-xs font-medium text-[#57534E] mb-2">
              {isPa ? 'ਸੰਮਤ ਦੀ ਚੋਣ' : 'Sambat Year Scope'}
            </span>
            <div className="grid grid-cols-3 gap-1.5 rounded-md border border-[#DDD3C0] bg-[#F3ECE0] p-1">
              {(
                [
                  {id: 'all', en: '2083 & 2084', pa: '੨੦੮੩–੨੦੮੪'},
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
                      ? 'bg-[#FAF6EE] text-[#1C1917] shadow-xs'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {isPa ? opt.pa : opt.en}
                </button>
              ))}
            </div>
          </div>

          {/* Event Category Checkboxes */}
          <fieldset className="space-y-2">
            <legend className="text-xs font-medium text-[#57534E] mb-2">
              {isPa ? 'ਸ਼ਾਮਲ ਕਰਨ ਵਾਲੇ ਦਿਹਾੜੇ' : 'Include Observances'}
            </legend>
            {toggles.map((t) => (
              <label
                key={t.id}
                htmlFor={t.id}
                className="flex items-center gap-3 min-h-[42px] px-3 py-2 rounded-md border border-[#DDD3C0]/80 bg-[#FAF6EE] hover:bg-[#F3ECE0]/60 cursor-pointer"
              >
                <input
                  id={t.id}
                  type="checkbox"
                  checked={t.checked}
                  onChange={(e) => t.onChange(e.target.checked)}
                  className="h-4 w-4 accent-[#1B263B] rounded-xs cursor-pointer"
                />
                <span className="text-sm text-[#1C1917]">{isPa ? t.labelPa : t.labelEn}</span>
              </label>
            ))}
          </fieldset>

          {downloadedCount !== null && (
            <div
              role="status"
              className="flex items-center gap-2 rounded-md border border-[#1B263B]/25 bg-[#1B263B]/8 px-3.5 py-2.5 text-xs font-medium text-[#1B263B]"
            >
              <CalendarCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>
                {isPa
                  ? `${formatNum(downloadedCount, 'pa')} ਦਿਹਾੜਿਆਂ ਵਾਲੀ .ics ਫ਼ਾਈਲ ਡਾਊਨਲੋਡ ਹੋ ਗਈ ਹੈ।`
                  : `Downloaded .ics calendar containing ${downloadedCount} Puratan Jantri dates.`}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between gap-4 pt-3 border-t border-[#DDD2BE]">
            <p className="text-xs font-mono-tabular text-[#57534E]">
              {isPa
                ? `ਕੁੱਲ ${formatNum(preview.eventCount, 'pa')} ਦਿਹਾੜੇ ਚੁਣੇ ਗਏ`
                : `${preview.eventCount} dates selected`}
            </p>
            <button
              type="button"
              onClick={handleDownload}
              disabled={preview.eventCount === 0}
              className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-medium rounded-md bg-[#1B263B] text-[#FAF6EE] hover:bg-[#111A2B] disabled:opacity-45 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>{isPa ? '.ics ਫ਼ਾਈਲ ਡਾਊਨਲੋਡ' : 'Download .ics'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
