import {CalendarPlus, ChevronLeft, ChevronRight, Printer} from 'lucide-react';
import React from 'react';
import {getBikramiMonthMeta, GREGORIAN_MONTHS, WEEKDAYS} from '../data/sambatData';
import type {CalendarGridMode, EventCategory, JantriDay, LanguageMode} from '../data/types';
import {
  BROWSEABLE_SOLAR_SPANS,
  formatGregorianDate,
  formatNum,
  formatShortGregorian,
  getBikramiHeaderForGregorianMonth,
  getGregorianHeaderForSolarSpan,
  SUPPORTED_MAX_MONTH,
  SUPPORTED_MIN_MONTH,
  toGurmukhiNumerals,
} from '../utils/bikramiEngine';
import {MoonPhaseIcon} from './MoonPhaseIcon';
import {PWAInstallButton} from './PWAInstallButton';

export type CalendarFilter = 'all' | 'gurpurab' | 'shaheedi' | 'khalsa' | 'lunar';

interface MonthlyJantriGridProps {
  gridMode: CalendarGridMode;
  solarSpanIndex: number;
  year: number;
  monthIndex0: number;
  days: JantriDay[];
  todayIso: string;
  selectedIso: string;
  activeFilter: CalendarFilter;
  lang: LanguageMode;
  onChangeGridMode: (mode: CalendarGridMode) => void;
  onSelectSolarSpan: (spanIndex: number) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onGoToday: () => void;
  onJumpSambat: (sambat: 2083 | 2084) => void;
  onSelectFilter: (filter: CalendarFilter) => void;
  onSelectDay: (day: JantriDay) => void;
  onOpenIcsModal: () => void;
  onOpenPrintView: () => void;
}

const FILTER_OPTIONS: readonly {
  id: CalendarFilter;
  en: string;
  pa: string;
}[] = [
  {id: 'all', en: 'All', pa: 'ਸਭ'},
  {id: 'gurpurab', en: 'Gurpurabs', pa: 'ਗੁਰਪੁਰਬ'},
  {id: 'shaheedi', en: 'Shaheedi', pa: 'ਸ਼ਹੀਦੀ'},
  {id: 'khalsa', en: 'Khalsa & Colophons', pa: 'ਖ਼ਾਲਸਾ / ਹਵਾਲੇ'},
  {id: 'lunar', en: 'Sangrand / Tithis', pa: 'ਸੰਗਰਾਂਦ / ਤਿਥੀਆਂ'},
];

function categoryTextClass(category: Exclude<EventCategory, 'sangrand' | 'lunar'>): string {
  if (category === 'gurpurab') return 'text-[#9E4F00] bg-[#C86400]/12';
  if (category === 'shaheedi') return 'text-[#8F1D1D] bg-[#8F1D1D]/10';
  return 'text-[#1B263B] bg-[#1B263B]/10';
}

function dayMatchesFilter(day: JantriDay, filter: CalendarFilter): boolean {
  if (filter === 'all') return true;
  if (filter === 'lunar') {
    return (
      day.solar.isSangrand ||
      day.lunar.isPuranmashi ||
      day.lunar.isMasya ||
      day.lunar.isEkadashi ||
      day.lunar.isAshtami ||
      day.lunar.isPanchmi
    );
  }
  return day.events.some((e) => e.category === filter);
}

export const MonthlyJantriGrid: React.FC<MonthlyJantriGridProps> = ({
  gridMode,
  solarSpanIndex,
  year,
  monthIndex0,
  days,
  todayIso,
  selectedIso,
  activeFilter,
  lang,
  onChangeGridMode,
  onSelectSolarSpan,
  onPrevMonth,
  onNextMonth,
  onGoToday,
  onJumpSambat,
  onSelectFilter,
  onSelectDay,
  onOpenIcsModal,
  onOpenPrintView,
}) => {
  const isPa = lang === 'pa';
  const isBi = lang === 'bi';
  const isSolarMode = gridMode === 'solar';

  const currentSolarSpan = BROWSEABLE_SOLAR_SPANS[solarSpanIndex];
  const currentSolarMeta = getBikramiMonthMeta(currentSolarSpan.monthId);

  const primaryHeading = isSolarMode
    ? isPa
      ? `${currentSolarMeta.namePa} · ਸੰਮਤ ${toGurmukhiNumerals(currentSolarSpan.sambat)}`
      : isBi
        ? `${currentSolarMeta.nameEn} (${currentSolarMeta.namePa}) · Sambat ${currentSolarSpan.sambat}`
        : `${currentSolarMeta.nameEn} · Sambat ${currentSolarSpan.sambat}`
    : isPa
      ? `${GREGORIAN_MONTHS[monthIndex0].pa} ${toGurmukhiNumerals(year)}`
      : isBi
        ? `${GREGORIAN_MONTHS[monthIndex0].en} (${GREGORIAN_MONTHS[monthIndex0].pa}) ${year}`
        : `${GREGORIAN_MONTHS[monthIndex0].en} ${year}`;

  const secondarySubheading = isSolarMode
    ? `${getGregorianHeaderForSolarSpan(currentSolarSpan, lang)} · ${
        isPa
          ? `${toGurmukhiNumerals(currentSolarSpan.days)} ਸੂਰਜੀ ਦਿਨ`
          : `${currentSolarSpan.days} solar days`
      }`
    : getBikramiHeaderForGregorianMonth(year, monthIndex0, lang);

  const canGoPrev = isSolarMode
    ? solarSpanIndex > 0
    : year > SUPPORTED_MIN_MONTH.year ||
      (year === SUPPORTED_MIN_MONTH.year && monthIndex0 > SUPPORTED_MIN_MONTH.monthIndex0);

  const canGoNext = isSolarMode
    ? solarSpanIndex < BROWSEABLE_SOLAR_SPANS.length - 1
    : year < SUPPORTED_MAX_MONTH.year ||
      (year === SUPPORTED_MAX_MONTH.year && monthIndex0 < SUPPORTED_MAX_MONTH.monthIndex0);

  const isSambat2084View = isSolarMode
    ? currentSolarSpan.sambat === 2084
    : year > 2027 || (year === 2027 && monthIndex0 >= 2);

  const inMonthHighlights = days.filter(
    (d) =>
      d.inCurrentGridMonth &&
      (d.events.length > 0 || d.solar.isSangrand || d.lunar.isPuranmashi || d.lunar.isMasya) &&
      dayMatchesFilter(d, activeFilter),
  );

  return (
    <section aria-labelledby="monthly-jantri-heading" className="no-print space-y-5">
      {/* Jantri Toolbar */}
      <div className="flex flex-col gap-4 border-b border-[#DDD2BE] pb-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs text-[#78716C]">
              {isSolarMode
                ? isPa
                  ? 'ਦੇਸੀ ਸੂਰਜੀ ਮਹੀਨਾਵਾਰ ਪੁਰਾਤਨ ਜੰਤਰੀ'
                  : isBi
                    ? 'Punjabi Solar Month Jantri · ਦੇਸੀ ਮਹੀਨਾਵਾਰ ਜੰਤਰੀ'
                    : 'Punjabi Solar Month Puratan Jantri'
                : isPa
                  ? 'ਗ੍ਰੈਗੋਰੀਅਨ ਮਹੀਨਾਵਾਰ ਜੰਤਰੀ'
                  : 'Gregorian Month Overlay'}
            </p>
            <h2
              id="monthly-jantri-heading"
              className={`mt-0.5 font-display text-2xl sm:text-3xl font-semibold text-[#1B263B] leading-tight ${
                isPa ? 'font-gurmukhi' : ''
              }`}
            >
              {primaryHeading}
            </h2>
            <p className="mt-0.5 text-sm font-medium text-[#9E4F00]">{secondarySubheading}</p>
          </div>

          {/* Grid Mode + Sambat + Month Navigation Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Solar Month vs Gregorian Overlay Toggle */}
            <div
              role="group"
              aria-label={isPa ? 'ਕੈਲੰਡਰ ਢਾਂਚਾ' : 'Calendar organization mode'}
              className="inline-flex items-center rounded-md border border-[#DDD2BE] bg-[#F3ECE0] p-0.5"
            >
              <button
                type="button"
                onClick={() => onChangeGridMode('solar')}
                aria-pressed={isSolarMode}
                className={`min-h-[36px] px-3 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isSolarMode
                    ? 'bg-[#1B263B] text-[#FAF6EE]'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {isPa ? 'ਦੇਸੀ ਮਹੀਨੇ' : 'Desi Months'}
              </button>
              <button
                type="button"
                onClick={() => onChangeGridMode('gregorian')}
                aria-pressed={!isSolarMode}
                className={`min-h-[36px] px-3 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  !isSolarMode
                    ? 'bg-[#1B263B] text-[#FAF6EE]'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {isPa ? 'ਅੰਗਰੇਜ਼ੀ' : 'Gregorian'}
              </button>
            </div>

            {/* Quick Sambat Switcher */}
            <div
              role="group"
              aria-label={isPa ? 'ਸੰਮਤ ਚੁਣੋ' : 'Select Sambat year'}
              className="inline-flex items-center rounded-md border border-[#DDD2BE] bg-[#F3ECE0] p-0.5"
            >
              <button
                type="button"
                onClick={() => onJumpSambat(2083)}
                className={`min-h-[36px] px-3 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  !isSambat2084View
                    ? 'bg-[#FAF6EE] text-[#1B263B] shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {isPa ? 'ਸੰਮਤ ੨੦੮੩' : 'Sambat 2083'}
              </button>
              <button
                type="button"
                onClick={() => onJumpSambat(2084)}
                className={`min-h-[36px] px-3 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isSambat2084View
                    ? 'bg-[#FAF6EE] text-[#1B263B] shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {isPa ? 'ਸੰਮਤ ੨੦੮੪' : 'Sambat 2084'}
              </button>
            </div>

            {/* Direct Solar Month Jump Dropdown (in Solar mode) */}
            {isSolarMode && (
              <div className="shrink-0">
                <label htmlFor="solar-month-select" className="sr-only">
                  {isPa ? 'ਦੇਸੀ ਮਹੀਨਾ ਚੁਣੋ' : 'Select Punjabi solar month'}
                </label>
                <select
                  id="solar-month-select"
                  value={solarSpanIndex}
                  onChange={(e) => onSelectSolarSpan(Number(e.target.value))}
                  className="min-h-[40px] rounded-md border border-[#C6B9A3] bg-[#FAF6EE] px-2.5 text-xs font-medium text-[#1C1917] focus:outline-2 focus:outline-[#1B263B] cursor-pointer"
                >
                  {BROWSEABLE_SOLAR_SPANS.map((span, idx) => {
                    const m = getBikramiMonthMeta(span.monthId);
                    return (
                      <option key={`${span.sambat}-${span.monthId}`} value={idx}>
                        {isPa
                          ? `${m.namePa} ${toGurmukhiNumerals(span.sambat)}`
                          : isBi
                            ? `${m.nameEn} (${m.namePa}) ${span.sambat}`
                            : `${m.nameEn} ${span.sambat}`}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            <div className="inline-flex items-center gap-1">
              <button
                type="button"
                onClick={onPrevMonth}
                disabled={!canGoPrev}
                aria-label={isPa ? 'ਪਿਛਲਾ ਮਹੀਨਾ' : 'Previous month'}
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-md border border-[#DDD2BE] bg-[#FAF6EE] text-[#1C1917] hover:bg-[#EBE2D2] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onGoToday}
                className="min-h-[40px] px-3.5 text-xs font-medium rounded-md border border-[#DDD2BE] bg-[#FAF6EE] text-[#1C1917] hover:bg-[#EBE2D2] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {isPa ? 'ਅੱਜ' : 'Today'}
              </button>
              <button
                type="button"
                onClick={onNextMonth}
                disabled={!canGoNext}
                aria-label={isPa ? 'ਅਗਲਾ ਮਹੀਨਾ' : 'Next month'}
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-md border border-[#DDD2BE] bg-[#FAF6EE] text-[#1C1917] hover:bg-[#EBE2D2] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Second Toolbar Row: Category Filter Segmented Control + Export / Print / PWA */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div
            role="group"
            aria-label={isPa ? 'ਦਿਹਾੜੇ ਫਿਲਟਰ ਕਰੋ' : 'Filter marked dates'}
            className="flex items-center gap-1 overflow-x-auto rounded-md border border-[#DDD2BE] bg-[#F3ECE0] p-1 max-w-full"
          >
            {FILTER_OPTIONS.map((opt) => {
              const active = activeFilter === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onSelectFilter(opt.id)}
                  aria-pressed={active}
                  className={`min-h-[36px] px-3 py-1.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#FAF6EE] text-[#1B263B] shadow-xs'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {isPa ? opt.pa : opt.en}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onOpenIcsModal}
              className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 text-xs font-medium rounded-md border border-[#C6B9A3] bg-[#FAF6EE] text-[#1C1917] hover:bg-[#EBE2D2] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <CalendarPlus className="w-3.5 h-3.5 text-[#1B263B]" aria-hidden="true" />
              <span>{isPa ? '.ics ਕੈਲੰਡਰ ਡਾਊਨਲੋਡ' : 'Export .ics'}</span>
            </button>
            <button
              type="button"
              onClick={onOpenPrintView}
              className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 text-xs font-medium rounded-md border border-[#C6B9A3] bg-[#FAF6EE] text-[#1C1917] hover:bg-[#EBE2D2] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#9E4F00]" aria-hidden="true" />
              <span>{isPa ? 'ਪ੍ਰਿੰਟ A4' : 'Print A4'}</span>
            </button>
            <PWAInstallButton lang={lang} />
          </div>
        </div>
      </div>

      {/* Legend (Clean unboxed typography with small geometric swatches, never hue-only) */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-[#57534E]">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-xs bg-[#C86400]" aria-hidden="true" />
          <span>{isPa ? 'ਗੁਰਪੁਰਬ / ਸੰਗਰਾਂਦ' : 'Gurpurab / Sangrand'}</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-xs bg-[#8F1D1D]" aria-hidden="true" />
          <span>{isPa ? 'ਸ਼ਹੀਦੀ ਦਿਵਸ' : 'Shaheedi Divas'}</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-xs bg-[#1B263B]" aria-hidden="true" />
          <span>{isPa ? 'ਖ਼ਾਲਸਾ / ਗ੍ਰੰਥ ਹਵਾਲੇ' : 'Khalsa & Colophons'}</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MoonPhaseIcon elongationDeg={180} size={13} />
          <span>{isPa ? 'ਪੂਰਨਮਾਸ਼ੀ' : 'Puranmashi'}</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MoonPhaseIcon elongationDeg={0} size={13} />
          <span>{isPa ? 'ਮੱਸਿਆ' : 'Masya'}</span>
        </span>
        <span className="text-[#8A6305]">
          {isPa ? 'ਪੰਚਮੀ · ਅਸ਼ਟਮੀ · ਇਕਾਦਸ਼ੀ' : 'Panchmi · Ashtami · Ekadashi'}
        </span>
      </div>

      {/* 7-Column Puratan Jantri Calendar Grid */}
      <div className="overflow-hidden rounded-xl border border-[#D8CBB4] bg-[#FAF6EE]">
        {/* Weekday Headers (Sunday to Saturday — Traditional Punjabi Jantri order) */}
        <div className="grid grid-cols-7 border-b border-[#D8CBB4] bg-[#1B263B] text-[#FAF6EE]">
          {WEEKDAYS.map((wd) => (
            <div
              key={wd.index}
              className="py-2.5 px-1 sm:px-3 text-center text-xs font-medium tracking-wide"
            >
              <span className="sm:hidden">{isPa ? wd.shortPa : wd.shortEn}</span>
              <span className="hidden sm:inline">
                {isPa ? wd.fullPa : `${wd.shortEn} · ${wd.shortPa}`}
              </span>
            </div>
          ))}
        </div>

        {/* Date Cells */}
        <div className="grid grid-cols-7 divide-x divide-y divide-[#E3D9C6]">
          {days.map((day) => {
            const isToday = day.isoDate === todayIso;
            const isSelected = day.isoDate === selectedIso;
            const matches = dayMatchesFilter(day, activeFilter);
            const dimmedByFilter = activeFilter !== 'all' && !matches;
            const hasPrimaryEvent = day.events.length > 0;
            const showMoonIcon =
              day.lunar.isPuranmashi ||
              day.lunar.isMasya ||
              day.lunar.isEkadashi ||
              day.lunar.isAshtami ||
              day.lunar.isPanchmi;

            const cellAccessibleLabel = [
              isPa
                ? `${toGurmukhiNumerals(day.solar.day)} ${day.solar.monthMeta.namePa}`
                : `${day.solar.day} ${day.solar.monthMeta.nameEn}`,
              formatGregorianDate(day.isoDate, lang, true),
              isPa ? day.lunar.shortTithiPa : day.lunar.shortTithiEn,
              ...day.events.map((e) => (isPa ? e.shortLabelPa : e.shortLabelEn)),
            ].join(', ');

            const primaryNumeral = isSolarMode
              ? formatNum(day.solar.day, lang)
              : formatNum(day.gregorianDay, lang);

            const secondaryDateShort = isSolarMode
              ? formatShortGregorian(day, lang)
              : isPa
                ? `${toGurmukhiNumerals(day.solar.day)} ${day.solar.monthMeta.namePa}`
                : `${day.solar.day} ${day.solar.monthMeta.nameEn}`;

            return (
              <button
                key={day.isoDate}
                type="button"
                onClick={() => onSelectDay(day)}
                aria-label={cellAccessibleLabel}
                aria-pressed={isSelected}
                data-iso={day.isoDate}
                className={`group relative flex flex-col justify-between text-left p-1.5 sm:p-2.5 min-h-[82px] sm:min-h-[122px] lg:min-h-[132px] transition-colors cursor-pointer focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1B263B] ${
                  !day.inCurrentGridMonth
                    ? 'bg-[#F3ECE0]/50 text-[#A8A29E]'
                    : isToday
                      ? 'bg-[#C86400]/10'
                      : day.solar.isSangrand
                        ? 'bg-[#F3ECE0]/75'
                        : 'bg-[#FAF6EE] hover:bg-[#F3ECE0]/60'
                } ${isSelected ? 'ring-2 ring-inset ring-[#1B263B]' : ''} ${
                  dimmedByFilter ? 'opacity-30' : ''
                }`}
              >
                {/* Top Row: Primary Punjabi Solar Day + Gregorian Date Sub-Label (or vice-versa in Gregorian mode) */}
                <div className="flex items-start justify-between gap-1 w-full">
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`font-mono-tabular text-base sm:text-lg font-semibold leading-none ${
                        isToday
                          ? 'text-[#C86400] underline decoration-2 underline-offset-4'
                          : day.solar.isSangrand && day.inCurrentGridMonth
                            ? 'text-[#C86400]'
                            : day.inCurrentGridMonth
                              ? 'text-[#1B263B]'
                              : 'text-[#A8A29E]'
                      }`}
                    >
                      {primaryNumeral}
                    </span>
                    {isBi && isSolarMode && day.inCurrentGridMonth && (
                      <span className="hidden sm:inline font-gurmukhi text-[11px] text-[#78716C]">
                        {toGurmukhiNumerals(day.solar.day)}
                      </span>
                    )}
                  </div>

                  <span
                    className={`font-mono-tabular text-[10px] sm:text-xs font-medium leading-tight text-right truncate ${
                      !isSolarMode && day.solar.isSangrand && day.inCurrentGridMonth
                        ? 'text-[#9E4F00] font-semibold'
                        : day.inCurrentGridMonth
                          ? 'text-[#57534E]'
                          : 'text-[#A8A29E]'
                    }`}
                  >
                    {isSolarMode ? (
                      <>
                        <span className="sm:hidden">{formatNum(day.gregorianDay, lang)}</span>
                        <span className="hidden sm:inline">{secondaryDateShort}</span>
                      </>
                    ) : (
                      <>
                        <span className="sm:hidden">{formatNum(day.solar.day, lang)}</span>
                        <span className="hidden sm:inline">{secondaryDateShort}</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Middle Row: Lunar Tithi + Moon Icon */}
                <div className="mt-1 flex items-center justify-between gap-1 w-full">
                  <span
                    className={`font-gurmukhi text-[10px] sm:text-[11px] leading-tight truncate ${
                      day.lunar.isPuranmashi
                        ? 'font-semibold text-[#8A6305]'
                        : day.lunar.isMasya
                          ? 'font-semibold text-[#1B263B]'
                          : day.lunar.isPanchmi || day.lunar.isAshtami || day.lunar.isEkadashi
                            ? 'font-medium text-[#9E4F00]'
                            : 'text-[#78716C]'
                    }`}
                  >
                    <span className="sm:hidden">
                      {day.lunar.isPuranmashi
                        ? isPa
                          ? 'ਪੂਰਨ'
                          : 'Purn'
                        : day.lunar.isMasya
                          ? isPa
                            ? 'ਮੱਸਿਆ'
                            : 'Masya'
                          : isPa
                            ? `${day.lunar.pakshPa[0]}${toGurmukhiNumerals(day.lunar.pakshDay)}`
                            : `${day.lunar.paksh[0]}${day.lunar.pakshDay}`}
                    </span>
                    <span className="hidden sm:inline">
                      {isPa ? day.lunar.shortTithiPa : day.lunar.shortTithiEn}
                    </span>
                  </span>

                  {showMoonIcon && (
                    <MoonPhaseIcon
                      elongationDeg={day.lunar.elongationDeg}
                      size={15}
                      className="shrink-0"
                    />
                  )}
                </div>

                {/* Bottom Row: Sangrand / Puranmashi / Masya / Event Markers */}
                <div className="mt-1.5 space-y-1 w-full">
                  {day.solar.isSangrand && (
                    <div className="hidden sm:block rounded-xs bg-[#C86400]/12 px-1.5 py-0.5 text-[10px] font-semibold tracking-tight text-[#9E4F00] truncate">
                      {isPa
                        ? `ਸੰਗਰਾਂਦ · ${day.solar.monthMeta.namePa}`
                        : isBi
                          ? `Sangrand · ਸੰਗਰਾਂਦ`
                          : `Sangrand · ${day.solar.monthMeta.nameEn}`}
                    </div>
                  )}

                  {!hasPrimaryEvent && day.lunar.isPuranmashi && (
                    <div className="hidden sm:block rounded-xs bg-[#B8860B]/14 px-1.5 py-0.5 text-[10px] font-semibold text-[#8A6305] truncate">
                      {isPa
                        ? `${day.lunar.lunarMonthPa} ਪੂਰਨਮਾਸ਼ੀ`
                        : `${day.lunar.lunarMonthEn} Puranmashi`}
                    </div>
                  )}

                  {!hasPrimaryEvent && day.lunar.isMasya && (
                    <div className="hidden sm:block rounded-xs bg-[#1B263B]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[#1B263B] truncate">
                      {isPa
                        ? `${day.lunar.lunarMonthPa} ਮੱਸਿਆ`
                        : `${day.lunar.lunarMonthEn} Masya`}
                    </div>
                  )}

                  {/* Desktop explicit event labels */}
                  {hasPrimaryEvent && (
                    <div className="hidden sm:flex flex-col gap-0.5">
                      {day.events.slice(0, 2).map((ev) => (
                        <div
                          key={ev.id}
                          className={`rounded-xs px-1.5 py-0.5 text-[10px] sm:text-[11px] font-medium leading-tight truncate ${categoryTextClass(ev.category)}`}
                        >
                          {isPa ? ev.shortLabelPa : ev.shortLabelEn}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Mobile compact bar indicator (paired with full list right below grid) */}
                  {(hasPrimaryEvent || day.solar.isSangrand || day.lunar.isPuranmashi || day.lunar.isMasya) && (
                    <div className="flex sm:hidden items-center gap-1 pt-0.5">
                      {day.solar.isSangrand && (
                        <span className="h-1.5 w-3 rounded-xs bg-[#C86400]" aria-hidden="true" />
                      )}
                      {day.lunar.isPuranmashi && !hasPrimaryEvent && (
                        <span className="h-1.5 w-3 rounded-xs bg-[#B8860B]" aria-hidden="true" />
                      )}
                      {day.lunar.isMasya && !hasPrimaryEvent && (
                        <span className="h-1.5 w-3 rounded-xs bg-[#1B263B]" aria-hidden="true" />
                      )}
                      {day.events.map((ev) => (
                        <span
                          key={ev.id}
                          className={`h-1.5 flex-1 max-w-[16px] rounded-xs ${
                            ev.category === 'gurpurab'
                              ? 'bg-[#C86400]'
                              : ev.category === 'shaheedi'
                                ? 'bg-[#8F1D1D]'
                                : 'bg-[#1B263B]'
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Month Highlights Strip */}
      <div className="border-t border-[#DDD2BE] pt-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-lg sm:text-xl font-semibold text-[#1B263B]">
            {isSolarMode
              ? isPa
                ? `${currentSolarMeta.namePa} ਮਹੀਨੇ ਦੇ ਮੁੱਖ ਦਿਹਾੜੇ ਅਤੇ ਸੰਗਰਾਂਦ`
                : `Marked Dates & Colophons in ${currentSolarMeta.nameEn}, Sambat ${currentSolarSpan.sambat}`
              : isPa
                ? `${GREGORIAN_MONTHS[monthIndex0].pa} ਦੇ ਮੁੱਖ ਦਿਹਾੜੇ ਅਤੇ ਸੰਗਰਾਂਦ`
                : `Marked Dates & Colophons in ${GREGORIAN_MONTHS[monthIndex0].en} ${year}`}
          </h3>
          <span className="text-xs font-mono-tabular text-[#78716C] whitespace-nowrap">
            {isPa
              ? `${toGurmukhiNumerals(inMonthHighlights.length)} ਦਿਹਾੜੇ`
              : `${inMonthHighlights.length} marked`}
          </span>
        </div>

        {inMonthHighlights.length === 0 ? (
          <p className="mt-3 text-sm text-[#57534E]">
            {isPa
              ? 'ਇਸ ਫਿਲਟਰ ਅਧੀਨ ਇਸ ਮਹੀਨੇ ਕੋਈ ਖਾਸ ਦਿਹਾੜਾ ਨਹੀਂ ਹੈ। "ਸਭ" ਚੁਣੋ।'
              : 'No dates match this filter in the current month. Select "All" to view all lunar and solar markers.'}
          </p>
        ) : (
          <ul className="mt-3 grid grid-cols-1 gap-2.5 md:grid-cols-2 lg:grid-cols-3">
            {inMonthHighlights.map((day) => {
              const primaryEvent = day.events[0];
              const heading = primaryEvent
                ? isPa
                  ? primaryEvent.titlePa
                  : isBi
                    ? `${primaryEvent.titleEn} · ${primaryEvent.titlePa}`
                    : primaryEvent.titleEn
                : day.solar.isSangrand
                  ? isPa
                    ? `${day.solar.monthMeta.namePa} ਸੰਗਰਾਂਦ`
                    : `${day.solar.monthMeta.nameEn} Sangrand`
                  : day.lunar.isPuranmashi
                    ? isPa
                      ? `${day.lunar.lunarMonthPa} ਪੂਰਨਮਾਸ਼ੀ`
                      : `${day.lunar.lunarMonthEn} Puranmashi`
                    : isPa
                      ? `${day.lunar.lunarMonthPa} ਮੱਸਿਆ`
                      : `${day.lunar.lunarMonthEn} Masya`;

              const accentText = primaryEvent
                ? primaryEvent.category === 'shaheedi'
                  ? 'text-[#8F1D1D]'
                  : primaryEvent.category === 'khalsa'
                    ? 'text-[#1B263B]'
                    : 'text-[#9E4F00]'
                : day.lunar.isMasya
                  ? 'text-[#1B263B]'
                  : day.lunar.isPuranmashi
                    ? 'text-[#8A6305]'
                    : 'text-[#9E4F00]';

              return (
                <li key={day.isoDate}>
                  <button
                    type="button"
                    onClick={() => onSelectDay(day)}
                    className="w-full min-h-[64px] rounded-lg border border-[#DDD2BE] bg-[#FAF6EE] hover:bg-[#F3ECE0] p-3.5 text-left transition-colors flex items-start justify-between gap-3 cursor-pointer"
                  >
                    <div className="min-w-0">
                      <p className={`text-xs font-medium ${accentText}`}>
                        {isPa
                          ? `${toGurmukhiNumerals(day.solar.day)} ${day.solar.monthMeta.namePa}`
                          : `${day.solar.day} ${day.solar.monthMeta.nameEn}`}
                        <span aria-hidden="true"> · </span>
                        {formatGregorianDate(day.isoDate, lang, false)}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[#1C1917] leading-snug">
                        {heading}
                      </p>
                      <p className="mt-0.5 text-xs text-[#57534E]">
                        {isPa
                          ? `${day.lunar.lunarMonthPa} ${day.lunar.shortTithiPa}`
                          : `${day.lunar.lunarMonthEn} ${day.lunar.shortTithiEn}`}
                      </p>
                    </div>
                    <MoonPhaseIcon
                      elongationDeg={day.lunar.elongationDeg}
                      size={22}
                      className="shrink-0 mt-0.5"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};
