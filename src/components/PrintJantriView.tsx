import {ArrowLeft, ChevronLeft, ChevronRight, Printer} from 'lucide-react';
import React from 'react';
import {getBikramiMonthMeta, GREGORIAN_MONTHS, WEEKDAYS} from '../data/sambatData';
import type {CalendarGridMode, JantriDay, LanguageMode} from '../data/types';
import {
  BROWSEABLE_SOLAR_SPANS,
  formatGregorianDate,
  formatShortGregorian,
  getBikramiHeaderForGregorianMonth,
  getGregorianHeaderForSolarSpan,
  SUPPORTED_MAX_MONTH,
  SUPPORTED_MIN_MONTH,
  toGurmukhiNumerals,
} from '../utils/bikramiEngine';
import {MoonPhaseIcon} from './MoonPhaseIcon';

interface PrintJantriViewProps {
  gridMode: CalendarGridMode;
  solarSpanIndex: number;
  year: number;
  monthIndex0: number;
  days: JantriDay[];
  lang: LanguageMode;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onBackToInteractive: () => void;
}

export const PrintJantriView: React.FC<PrintJantriViewProps> = ({
  gridMode,
  solarSpanIndex,
  year,
  monthIndex0,
  days,
  lang,
  onPrevMonth,
  onNextMonth,
  onBackToInteractive,
}) => {
  const isPa = lang === 'pa';
  const isSolarMode = gridMode === 'solar';
  const currentSolarSpan = BROWSEABLE_SOLAR_SPANS[solarSpanIndex];
  const currentSolarMeta = getBikramiMonthMeta(currentSolarSpan.monthId);

  const bikramiEn = getBikramiHeaderForGregorianMonth(year, monthIndex0, 'en');
  const bikramiPa = getBikramiHeaderForGregorianMonth(year, monthIndex0, 'pa');

  const canGoPrev = isSolarMode
    ? solarSpanIndex > 0
    : year > SUPPORTED_MIN_MONTH.year ||
      (year === SUPPORTED_MIN_MONTH.year && monthIndex0 > SUPPORTED_MIN_MONTH.monthIndex0);
  const canGoNext = isSolarMode
    ? solarSpanIndex < BROWSEABLE_SOLAR_SPANS.length - 1
    : year < SUPPORTED_MAX_MONTH.year ||
      (year === SUPPORTED_MAX_MONTH.year && monthIndex0 < SUPPORTED_MAX_MONTH.monthIndex0);

  const monthNotes = days.filter(
    (d) =>
      d.inCurrentGridMonth &&
      (d.events.length > 0 || d.solar.isSangrand || d.lunar.isPuranmashi || d.lunar.isMasya),
  );

  return (
    <section aria-labelledby="print-sheet-heading" className="space-y-5">
      {/* Screen-only Print Controls */}
      <div className="no-print flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#DDD2BE] bg-[#F3ECE0] p-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBackToInteractive}
            className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 text-xs font-medium rounded-md border border-[#C6B9A3] bg-[#FAF6EE] text-[#1C1917] hover:bg-[#EBE2D2] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>{isPa ? 'ਜੰਤਰੀ ’ਤੇ ਵਾਪਸ' : 'Back to Jantri'}</span>
          </button>

          <button
            type="button"
            onClick={onPrevMonth}
            disabled={!canGoPrev}
            aria-label={isPa ? 'ਪਿਛਲਾ ਮਹੀਨਾ' : 'Previous month'}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-md border border-[#C6B9A3] bg-[#FAF6EE] disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onNextMonth}
            disabled={!canGoNext}
            aria-label={isPa ? 'ਅਗਲਾ ਮਹੀਨਾ' : 'Next month'}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-md border border-[#C6B9A3] bg-[#FAF6EE] disabled:opacity-40 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-medium rounded-md bg-[#1B263B] text-[#FAF6EE] hover:bg-[#111A2B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Printer className="w-4 h-4" aria-hidden="true" />
          <span>{isPa ? 'A4 ਜੰਤਰੀ ਪ੍ਰਿੰਟ ਕਰੋ' : 'Print A4 Jantri Sheet'}</span>
        </button>
      </div>

      {/* Archival A4 Landscape Broadsheet */}
      <div className="print-sheet mx-auto max-w-[1120px] rounded-xl border border-[#C6B9A3] bg-white p-6 sm:p-8 shadow-sm text-[#1C1917]">
        {/* Dual-Script Broadsheet Header */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b-2 border-[#1B263B] pb-3.5">
          <div className="flex items-center gap-3.5">
            <img
              src="./logo.png"
              alt="Tatkhalsa Puratan Jantri Seal"
              width={48}
              height={48}
              className="w-12 h-12 rounded-lg border border-[#B8860B] object-cover shrink-0 bg-[#FAF6EE]"
            />
            <div>
              <p className="text-[11px] tracking-widest uppercase text-[#57534E]">
                Tatkhalsa Foundation · calendar.tatkhalsa.in · Puratan Bikrami
              </p>
              <h1
                id="print-sheet-heading"
                className="mt-0.5 font-display text-2xl sm:text-3xl font-bold text-[#1B263B]"
              >
                {isSolarMode
                  ? `${currentSolarMeta.nameEn} · ${currentSolarMeta.namePa} · Sambat ${currentSolarSpan.sambat}`
                  : `${GREGORIAN_MONTHS[monthIndex0].en} ${year} · ${GREGORIAN_MONTHS[monthIndex0].pa} ${toGurmukhiNumerals(year)}`}
              </h1>
            </div>
          </div>
          <div className="sm:text-right">
            {isSolarMode ? (
              <>
                <p className="font-gurmukhi text-base font-semibold text-[#9E4F00]">
                  ਸੰਮਤ {toGurmukhiNumerals(currentSolarSpan.sambat)} · {toGurmukhiNumerals(currentSolarSpan.days)} ਦਿਨ
                </p>
                <p className="text-xs font-medium text-[#44403C]">
                  {getGregorianHeaderForSolarSpan(currentSolarSpan, 'en')}
                </p>
              </>
            ) : (
              <>
                <p className="font-gurmukhi text-base font-semibold text-[#9E4F00]">{bikramiPa}</p>
                <p className="text-xs font-medium text-[#44403C]">{bikramiEn}</p>
              </>
            )}
          </div>
        </header>

        {/* Clean Print 7-Column Grid */}
        <div className="mt-4 border border-[#A8A29E]">
          <div className="grid grid-cols-7 border-b border-[#A8A29E] bg-[#F5F2EB]">
            {WEEKDAYS.map((wd) => (
              <div
                key={wd.index}
                className="py-1.5 px-2 text-center text-[11px] font-semibold text-[#1B263B] border-r last:border-r-0 border-[#D6D3D1]"
              >
                {wd.shortEn} · {wd.shortPa}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {days.map((day) => (
              <div
                key={day.isoDate}
                className={`min-h-[82px] p-1.5 border-r border-b border-[#D6D3D1] flex flex-col justify-between ${
                  !day.inCurrentGridMonth ? 'bg-[#FAF9F6] text-[#A8A29E]' : 'bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-1">
                  <span
                    className={`font-mono-tabular text-sm font-bold leading-none ${
                      isSolarMode && day.solar.isSangrand && day.inCurrentGridMonth
                        ? 'text-[#C86400]'
                        : ''
                    }`}
                  >
                    {isSolarMode ? day.solar.day : day.gregorianDay}
                  </span>
                  <span
                    className={`text-[10px] leading-tight text-right ${
                      !isSolarMode && day.solar.isSangrand ? 'font-bold text-[#9E4F00]' : 'text-[#44403C]'
                    }`}
                  >
                    {isSolarMode
                      ? formatShortGregorian(day, 'en')
                      : `${day.solar.day} ${day.solar.monthMeta.nameEn}`}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-1 mt-1">
                  <span className="font-gurmukhi text-[10px] text-[#57534E] truncate">
                    {day.lunar.shortTithiPa}
                  </span>
                  {(day.lunar.isPuranmashi || day.lunar.isMasya) && (
                    <MoonPhaseIcon elongationDeg={day.lunar.elongationDeg} size={12} />
                  )}
                </div>

                <div className="mt-1 space-y-0.5">
                  {day.solar.isSangrand && (
                    <p className="text-[9px] font-bold text-[#9E4F00] leading-tight break-words">
                      Sangrand · ਸੰਗਰਾਂਦ
                    </p>
                  )}
                  {day.events.slice(0, 2).map((ev) => (
                    <p
                      key={ev.id}
                      className={`text-[9px] font-semibold leading-tight break-words ${
                        ev.category === 'shaheedi'
                          ? 'text-[#8F1D1D]'
                          : ev.category === 'khalsa'
                            ? 'text-[#1B263B]'
                            : ev.category === 'barsi'
                              ? 'text-[#6B4E16]'
                              : 'text-[#9E4F00]'
                      }`}
                    >
                      {isPa ? ev.shortLabelPa : ev.shortLabelEn}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Colophon Notes for Print Sheet */}
        {monthNotes.length > 0 && (
          <div className="mt-4 pt-3 border-t border-[#D6D3D1]">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-[#44403C] mb-2">
              {isPa ? 'ਮਹੀਨੇ ਦੇ ਮੁੱਖ ਦਿਹਾੜੇ ਅਤੇ ਸੰਗਰਾਂਦ' : 'Marked Dates & Key Observances This Month'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-[11px] leading-snug text-[#292524]">
              {monthNotes.map((d) => {
                const label =
                  d.events.length > 0
                    ? d.events
                        .map((ev) => (isPa ? ev.titlePa : ev.titleEn))
                        .join(' · ')
                    : d.solar.isSangrand
                      ? isPa
                        ? `${d.solar.monthMeta.namePa} ਸੰਗਰਾਂਦ`
                        : `${d.solar.monthMeta.nameEn} Sangrand`
                      : d.lunar.isPuranmashi
                        ? isPa
                          ? `${d.lunar.lunarMonthPa} ਪੂਰਨਮਾਸ਼ੀ`
                          : `${d.lunar.lunarMonthEn} Puranmashi`
                        : isPa
                          ? `${d.lunar.lunarMonthPa} ਮੱਸਿਆ`
                          : `${d.lunar.lunarMonthEn} Masya`;
                return (
                  <p key={d.isoDate} className="break-words">
                    <span className="font-mono-tabular font-semibold">
                      {isPa
                        ? `${toGurmukhiNumerals(d.solar.day)} ${d.solar.monthMeta.namePa}`
                        : `${d.solar.day} ${d.solar.monthMeta.nameEn}`}
                    </span>{' '}
                    ({formatGregorianDate(d.isoDate, lang, false)}) — {label}
                  </p>
                );
              })}
            </div>
          </div>
        )}

        <footer className="mt-4 pt-2 border-t border-[#E7E5E4] flex items-center justify-between text-[10px] text-[#78716C]">
          <span>
            Puratan Bikrami Luni-Solar Chronology (Sri Anandpur Sahib IST) · No Fixed Nanakshahi or Astrology
          </span>
          <span>pothi.tatkhalsa.in · calendar.tatkhalsa.in</span>
        </footer>
      </div>
    </section>
  );
};
