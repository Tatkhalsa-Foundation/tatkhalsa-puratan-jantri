import {CalendarPlus, ChevronLeft, ChevronRight, Printer} from 'lucide-react';
import React from 'react';
import {GREGORIAN_MONTHS, WEEKDAYS} from '../data/sambatData';
import type {EventCategory, JantriDay, LanguageMode} from '../data/types';
import {
  formatGregorianDate,
  formatNum,
  getBikramiHeaderForGregorianMonth,
  SUPPORTED_MAX_MONTH,
  SUPPORTED_MIN_MONTH,
} from '../utils/bikramiEngine';
import {MoonPhaseIcon} from './MoonPhaseIcon';
import {PWAInstallButton} from './PWAInstallButton';

export type CalendarFilter = 'all' | 'gurpurab' | 'shaheedi' | 'khalsa' | 'lunar';

interface MonthlyJantriGridProps {
  year: number;
  monthIndex0: number;
  days: JantriDay[];
  todayIso: string;
  selectedIso: string;
  activeFilter: CalendarFilter;
  lang: LanguageMode;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onGoToday: () => void;
  onJumpMonth: (year: number, monthIndex0: number) => void;
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
  {id: 'khalsa', en: 'Khalsa', pa: 'ਖ਼ਾਲਸਾ'},
  {id: 'lunar', en: 'Sangrand / Lunar', pa: 'ਸੰਗਰਾਂਦ / ਚੰਦਰ'},
];

function categoryTextClass(category: Exclude<EventCategory, 'sangrand' | 'lunar'>): string {
  if (category === 'gurpurab') return 'text-[#B45309] bg-[#D97706]/12';
  if (category === 'shaheedi') return 'text-[#991B1B] bg-[#991B1B]/10';
  return 'text-[#1E3A8A] bg-[#1E3A8A]/10';
}

function dayMatchesFilter(day: JantriDay, filter: CalendarFilter): boolean {
  if (filter === 'all') return true;
  if (filter === 'lunar') {
    return day.solar.isSangrand || day.lunar.isPuranmashi || day.lunar.isMasya || day.lunar.isIkadashi || day.lunar.isPanchmi;
  }
  return day.events.some((e) => e.category === filter);
}

export const MonthlyJantriGrid: React.FC<MonthlyJantriGridProps> = ({
  year,
  monthIndex0,
  days,
  todayIso,
  selectedIso,
  activeFilter,
  lang,
  onPrevMonth,
  onNextMonth,
  onGoToday,
  onJumpMonth,
  onSelectFilter,
  onSelectDay,
  onOpenIcsModal,
  onOpenPrintView,
}) => {
  const isPa = lang === 'pa';
  const gregorianMonthLabel = isPa
    ? `${GREGORIAN_MONTHS[monthIndex0].pa} ${formatNum(year, 'pa')}`
    : `${GREGORIAN_MONTHS[monthIndex0].en} ${year}`;
  const bikramiMonthHeader = getBikramiHeaderForGregorianMonth(year, monthIndex0, lang);

  const canGoPrev =
    year > SUPPORTED_MIN_MONTH.year ||
    (year === SUPPORTED_MIN_MONTH.year && monthIndex0 > SUPPORTED_MIN_MONTH.monthIndex0);
  const canGoNext =
    year < SUPPORTED_MAX_MONTH.year ||
    (year === SUPPORTED_MAX_MONTH.year && monthIndex0 < SUPPORTED_MAX_MONTH.monthIndex0);

  const inMonthHighlights = days.filter(
    (d) =>
      d.inCurrentGridMonth &&
      (d.events.length > 0 || d.solar.isSangrand || d.lunar.isPuranmashi || d.lunar.isMasya) &&
      dayMatchesFilter(d, activeFilter),
  );

  const isSambat2084View = year > 2027 || (year === 2027 && monthIndex0 >= 2);

  return (
    <section aria-labelledby="monthly-jantri-heading" className="no-print space-y-5">
      {/* Jantri Toolbar */}
      <div className="flex flex-col gap-4 border-b border-[#DDD3C0] pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs text-[#78716C]">
              {isPa ? 'ਮਹੀਨਾਵਾਰ ਪੁਰਾਤਨ ਜੰਤਰੀ' : 'Monthly Puratan Jantri'}
            </p>
            <h2
              id="monthly-jantri-heading"
              className="mt-0.5 font-display text-2xl sm:text-3xl font-semibold text-[#1C1917] leading-tight"
            >
              {gregorianMonthLabel}
            </h2>
            <p className="mt-0.5 text-sm font-medium text-[#B45309]">{bikramiMonthHeader}</p>
          </div>

          {/* Month & Sambat Navigation Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Quick Sambat Switcher */}
            <div
              role="group"
              aria-label={lang === 'pa' ? 'ਸੰਮਤ ਚੁਣੋ' : 'Select Sambat year'}
              className="inline-flex items-center rounded-md border border-[#DDD3C0] bg-[#F3ECE0] p-0.5"
            >
              <button
                type="button"
                onClick={() => onJumpMonth(2026, 10)}
                className={`min-h-[36px] px-3 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  !isSambat2084View
                    ? 'bg-[#FAF6EE] text-[#1C1917] shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {isPa ? 'ਸੰਮਤ ੨੦੮੩' : 'Sambat 2083'}
              </button>
              <button
                type="button"
                onClick={() => onJumpMonth(2027, 2)}
                className={`min-h-[36px] px-3 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isSambat2084View
                    ? 'bg-[#FAF6EE] text-[#1C1917] shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {isPa ? 'ਸੰਮਤ ੨੦੮੪' : 'Sambat 2084'}
              </button>
            </div>

            <div className="inline-flex items-center gap-1">
              <button
                type="button"
                onClick={onPrevMonth}
                disabled={!canGoPrev}
                aria-label={isPa ? 'ਪਿਛਲਾ ਮਹੀਨਾ' : 'Previous month'}
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-md border border-[#DDD3C0] bg-[#FAF6EE] text-[#1C1917] hover:bg-[#EDE4D3] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onGoToday}
                className="min-h-[40px] px-3.5 text-xs font-medium rounded-md border border-[#DDD3C0] bg-[#FAF6EE] text-[#1C1917] hover:bg-[#EDE4D3] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {isPa ? 'ਅੱਜ' : 'Today'}
              </button>
              <button
                type="button"
                onClick={onNextMonth}
                disabled={!canGoNext}
                aria-label={isPa ? 'ਅਗਲਾ ਮਹੀਨਾ' : 'Next month'}
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-md border border-[#DDD3C0] bg-[#FAF6EE] text-[#1C1917] hover:bg-[#EDE4D3] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
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
            className="flex items-center gap-1 overflow-x-auto rounded-md border border-[#DDD3C0] bg-[#F3ECE0] p-1 max-w-full"
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
                      ? 'bg-[#FAF6EE] text-[#1C1917] shadow-xs'
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
              className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 text-xs font-medium rounded-md border border-[#C6B9A3] bg-[#FAF6EE] text-[#1C1917] hover:bg-[#EDE4D3] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <CalendarPlus className="w-3.5 h-3.5 text-[#1E3A8A]" aria-hidden="true" />
              <span>{isPa ? '.ics ਕੈਲੰਡਰ ਡਾਊਨਲੋਡ' : 'Export .ics'}</span>
            </button>
            <button
              type="button"
              onClick={onOpenPrintView}
              className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 text-xs font-medium rounded-md border border-[#C6B9A3] bg-[#FAF6EE] text-[#1C1917] hover:bg-[#EDE4D3] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#B45309]" aria-hidden="true" />
              <span>{isPa ? 'ਪ੍ਰਿੰਟ A4' : 'Print A4'}</span>
            </button>
            <PWAInstallButton lang={lang} />
          </div>
        </div>
      </div>

      {/* Legend (Clean unboxed typography with small geometric swatches, never hue-only) */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-[#57534E]">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-xs bg-[#D97706]" aria-hidden="true" />
          <span>{isPa ? 'ਗੁਰਪੁਰਬ / ਸੰਗਰਾਂਦ' : 'Gurpurab / Sangrand'}</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-xs bg-[#991B1B]" aria-hidden="true" />
          <span>{isPa ? 'ਸ਼ਹੀਦੀ ਦਿਵਸ' : 'Shaheedi Divas'}</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-xs bg-[#1E3A8A]" aria-hidden="true" />
          <span>{isPa ? 'ਖ਼ਾਲਸਾ / ਸੰਪਰਦਾਇ ਇਤਿਹਾਸ' : 'Khalsa & Sampardai'}</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MoonPhaseIcon elongationDeg={180} size={13} />
          <span>{isPa ? 'ਪੂਰਨਮਾਸ਼ੀ' : 'Puranmashi'}</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MoonPhaseIcon elongationDeg={0} size={13} />
          <span>{isPa ? 'ਮੱਸਿਆ' : 'Masya'}</span>
        </span>
      </div>

      {/* 7-Column Puratan Jantri Calendar Grid */}
      <div className="overflow-hidden rounded-xl border border-[#DDD3C0] bg-[#FAF6EE]">
        {/* Weekday Headers (Sunday to Saturday — Traditional Punjabi Jantri order) */}
        <div className="grid grid-cols-7 border-b border-[#DDD3C0] bg-[#F3ECE0]">
          {WEEKDAYS.map((wd) => (
            <div
              key={wd.index}
              className="py-2.5 px-1 sm:px-3 text-center text-xs font-semibold text-[#44403C]"
            >
              <span className="sm:hidden">{isPa ? wd.shortPa : wd.shortEn}</span>
              <span className="hidden sm:inline">
                {isPa ? wd.fullPa : `${wd.shortEn} · ${wd.shortPa}`}
              </span>
            </div>
          ))}
        </div>

        {/* Date Cells */}
        <div className="grid grid-cols-7 divide-x divide-y divide-[#E5DCCB]">
          {days.map((day) => {
            const isToday = day.isoDate === todayIso;
            const isSelected = day.isoDate === selectedIso;
            const matches = dayMatchesFilter(day, activeFilter);
            const dimmedByFilter = activeFilter !== 'all' && !matches;
            const hasPrimaryEvent = day.events.length > 0;
            const showMoonIcon =
              day.lunar.isPuranmashi ||
              day.lunar.isMasya ||
              day.lunar.isIkadashi ||
              day.lunar.isPanchmi;

            const cellAccessibleLabel = [
              formatGregorianDate(day.isoDate, lang, true),
              isPa
                ? `${formatNum(day.solar.day, 'pa')} ${day.solar.monthMeta.namePa}`
                : `${day.solar.day} ${day.solar.monthMeta.nameEn}`,
              isPa ? day.lunar.shortTithiPa : day.lunar.shortTithiEn,
              ...day.events.map((e) => (isPa ? e.shortLabelPa : e.shortLabelEn)),
            ].join(', ');

            return (
              <button
                key={day.isoDate}
                type="button"
                onClick={() => onSelectDay(day)}
                aria-label={cellAccessibleLabel}
                aria-pressed={isSelected}
                data-iso={day.isoDate}
                className={`group relative flex flex-col justify-between text-left p-1.5 sm:p-2.5 min-h-[76px] sm:min-h-[118px] lg:min-h-[128px] transition-colors cursor-pointer focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1E3A8A] ${
                  !day.inCurrentGridMonth
                    ? 'bg-[#F3ECE0]/45 text-[#A8A29E]'
                    : isToday
                      ? 'bg-[#D97706]/10'
                      : day.solar.isSangrand
                        ? 'bg-[#F3ECE0]/70'
                        : 'bg-[#FAF6EE] hover:bg-[#F3ECE0]/60'
                } ${isSelected ? 'ring-2 ring-inset ring-[#1E3A8A]' : ''} ${
                  dimmedByFilter ? 'opacity-35' : ''
                }`}
              >
                {/* Top Row: Gregorian Day + Bikrami Solar Date */}
                <div className="flex items-start justify-between gap-1 w-full">
                  <span
                    className={`font-mono-tabular text-sm sm:text-base font-semibold leading-none ${
                      isToday
                        ? 'text-[#B45309] underline decoration-2 underline-offset-4'
                        : day.inCurrentGridMonth
                          ? 'text-[#1C1917]'
                          : 'text-[#A8A29E]'
                    }`}
                  >
                    {formatNum(day.gregorianDay, lang)}
                  </span>

                  <span
                    className={`text-[10px] sm:text-xs font-medium leading-tight text-right truncate ${
                      day.solar.isSangrand
                        ? 'text-[#B45309] font-semibold'
                        : day.inCurrentGridMonth
                          ? 'text-[#57534E]'
                          : 'text-[#A8A29E]'
                    }`}
                  >
                    <span className="sm:hidden">{formatNum(day.solar.day, lang)}</span>
                    <span className="hidden sm:inline">
                      {isPa
                        ? `${formatNum(day.solar.day, 'pa')} ${day.solar.monthMeta.namePa}`
                        : `${day.solar.day} ${day.solar.monthMeta.nameEn}`}
                    </span>
                  </span>
                </div>

                {/* Middle Row: Lunar Tithi + Moon Icon */}
                <div className="mt-1 flex items-center justify-between gap-1 w-full">
                  <span
                    className={`font-gurmukhi text-[10px] sm:text-[11px] leading-tight truncate ${
                      day.lunar.isPuranmashi
                        ? 'font-semibold text-[#B45309]'
                        : day.lunar.isMasya
                          ? 'font-semibold text-[#1E3A8A]'
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
                            ? `${day.lunar.pakshPa[0]}${formatNum(day.lunar.pakshDay, 'pa')}`
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

                {/* Bottom Row: Sangrand / Event Markers */}
                <div className="mt-1.5 space-y-1 w-full">
                  {day.solar.isSangrand && (
                    <div className="hidden sm:block text-[10px] font-semibold tracking-tight text-[#B45309] truncate">
                      {isPa
                        ? `ਸੰਗਰਾਂਦ · ${day.solar.monthMeta.namePa}`
                        : `Sangrand · ${day.solar.monthMeta.nameEn}`}
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
                  {(hasPrimaryEvent || day.solar.isSangrand) && (
                    <div className="flex sm:hidden items-center gap-1 pt-0.5">
                      {day.solar.isSangrand && (
                        <span className="h-1.5 w-3 rounded-xs bg-[#D97706]" aria-hidden="true" />
                      )}
                      {day.events.map((ev) => (
                        <span
                          key={ev.id}
                          className={`h-1.5 flex-1 max-w-[16px] rounded-xs ${
                            ev.category === 'gurpurab'
                              ? 'bg-[#D97706]'
                              : ev.category === 'shaheedi'
                                ? 'bg-[#991B1B]'
                                : 'bg-[#1E3A8A]'
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

      {/* Month Highlights Strip (especially valuable on Mobile & quick scanning on Desktop) */}
      <div className="border-t border-[#DDD3C0] pt-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-lg sm:text-xl font-semibold text-[#1C1917]">
            {isPa
              ? `${GREGORIAN_MONTHS[monthIndex0].pa} ਦੇ ਮੁੱਖ ਦਿਹਾੜੇ ਅਤੇ ਸੰਗਰਾਂਦ`
              : `Marked Dates & Colophons in ${GREGORIAN_MONTHS[monthIndex0].en} ${year}`}
          </h3>
          <span className="text-xs font-mono-tabular text-[#78716C] whitespace-nowrap">
            {isPa
              ? `${formatNum(inMonthHighlights.length, 'pa')} ਦਿਹਾੜੇ`
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
                  ? 'text-[#991B1B]'
                  : primaryEvent.category === 'khalsa'
                    ? 'text-[#1E3A8A]'
                    : 'text-[#B45309]'
                : day.lunar.isMasya
                  ? 'text-[#1E3A8A]'
                  : 'text-[#B45309]';

              return (
                <li key={day.isoDate}>
                  <button
                    type="button"
                    onClick={() => onSelectDay(day)}
                    className="w-full min-h-[64px] rounded-lg border border-[#DDD3C0] bg-[#FAF6EE] hover:bg-[#F3ECE0] p-3.5 text-left transition-colors flex items-start justify-between gap-3 cursor-pointer"
                  >
                    <div className="min-w-0">
                      <p className={`text-xs font-medium ${accentText}`}>
                        {formatGregorianDate(day.isoDate, lang, false)}
                        <span aria-hidden="true"> · </span>
                        {isPa
                          ? `${formatNum(day.solar.day, 'pa')} ${day.solar.monthMeta.namePa}`
                          : `${day.solar.day} ${day.solar.monthMeta.nameEn}`}
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
