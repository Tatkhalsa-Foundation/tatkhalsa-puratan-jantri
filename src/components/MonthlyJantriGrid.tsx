import {
  CalendarHeart,
  CalendarPlus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Printer,
  SlidersHorizontal,
} from 'lucide-react';
import React, {useState} from 'react';
import {getBikramiMonthMeta, GREGORIAN_MONTHS, WEEKDAYS} from '../data/sambatData';
import type {
  CalendarGridMode,
  EventCategory,
  JantriDay,
  LanguageMode,
  PersonalDesiDate,
} from '../data/types';
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
import {getPersonalDateKindLabel, getPersonalDatesForSolarDay} from '../utils/personalDates';
import {MoonPhaseIcon} from './MoonPhaseIcon';
import {PWAInstallButton} from './PWAInstallButton';

export type CalendarFilter = 'all' | 'gurpurab' | 'shaheedi' | 'khalsa' | 'barsi' | 'lunar';

interface MonthlyJantriGridProps {
  gridMode: CalendarGridMode;
  solarSpanIndex: number;
  year: number;
  monthIndex0: number;
  days: JantriDay[];
  todayIso: string;
  selectedIso: string;
  activeFilter: CalendarFilter;
  personalDates: PersonalDesiDate[];
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
  onOpenPersonalDates: () => void;
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
  {id: 'barsi', en: 'Barsis & Mahapurakhs', pa: 'ਬਰਸੀਆਂ / ਮਹਾਂਪੁਰਖ'},
  {id: 'lunar', en: 'Sangrand / Tithis', pa: 'ਸੰਗਰਾਂਦ / ਤਿਥੀਆਂ'},
];

function categoryTextClass(category: Exclude<EventCategory, 'sangrand' | 'lunar'>): string {
  if (category === 'gurpurab') {
    return 'text-[var(--accent-primary-text)] bg-[var(--accent-primary-tint)]';
  }
  if (category === 'shaheedi') {
    return 'text-[var(--accent-shaheedi)] bg-[var(--accent-shaheedi-tint)]';
  }
  if (category === 'barsi') {
    return 'text-[var(--accent-barsi)] bg-[var(--accent-barsi-tint)]';
  }
  return 'text-[var(--text-heading)] bg-[var(--accent-navy-tint)]';
}

function dayMatchesFilter(
  day: JantriDay,
  filter: CalendarFilter,
  _dayPersonalCount: number,
): boolean {
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
  personalDates,
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
  onOpenPersonalDates,
  onOpenPrintView,
}) => {
  const isPa = lang === 'pa';
  const isBi = lang === 'bi';
  const isSolarMode = gridMode === 'solar';
  const [filterBarOpen, setFilterBarOpen] = useState(false);

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

  const inMonthHighlights = days.filter((d) => {
    if (!d.inCurrentGridMonth) return false;
    const personal = getPersonalDatesForSolarDay(personalDates, d.solar.monthId, d.solar.day);
    const hasMarker =
      d.events.length > 0 ||
      d.solar.isSangrand ||
      d.lunar.isPuranmashi ||
      d.lunar.isMasya ||
      personal.length > 0;
    return hasMarker && dayMatchesFilter(d, activeFilter, personal.length);
  });

  const activeFilterLabel = FILTER_OPTIONS.find((f) => f.id === activeFilter);

  return (
    <section aria-labelledby="monthly-jantri-heading" className="no-print space-y-4">
      {/* Compact Calendar-First Toolbar */}
      <div className="space-y-3 border-b border-[var(--border-subtle)] pb-3.5">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-start justify-between gap-2 sm:block min-w-0">
            <div className="min-w-0">
              <h2
                id="monthly-jantri-heading"
                className={`font-display text-2xl sm:text-3xl font-semibold text-[var(--text-heading)] leading-tight ${
                  isPa ? 'font-gurmukhi' : ''
                }`}
              >
                {primaryHeading}
              </h2>
              <p className="mt-0.5 text-xs sm:text-sm font-medium text-[var(--accent-primary-text)]">
                {secondarySubheading}
              </p>
            </div>

            {/* Mobile-only compact < Today > inline with month heading */}
            <div className="inline-flex sm:hidden items-center gap-1 shrink-0 pt-0.5">
              <button
                type="button"
                onClick={onPrevMonth}
                disabled={!canGoPrev}
                aria-label={isPa ? 'ਪਿਛਲਾ ਮਹੀਨਾ' : 'Previous month'}
                className="min-h-[38px] min-w-[36px] flex items-center justify-center rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onGoToday}
                className="min-h-[38px] px-2.5 text-xs font-medium rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {isPa ? 'ਅੱਜ' : 'Today'}
              </button>
              <button
                type="button"
                onClick={onNextMonth}
                disabled={!canGoNext}
                aria-label={isPa ? 'ਅਗਲਾ ਮਹੀਨਾ' : 'Next month'}
                className="min-h-[38px] min-w-[36px] flex items-center justify-center rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Primary Month Nav (Desktop) + Balanced + My Desi Dates & Filter & Export */}
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
            <div className="hidden sm:inline-flex items-center gap-1">
              <button
                type="button"
                onClick={onPrevMonth}
                disabled={!canGoPrev}
                aria-label={isPa ? 'ਪਿਛਲਾ ਮਹੀਨਾ' : 'Previous month'}
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onGoToday}
                className="min-h-[40px] px-3 text-xs font-medium rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {isPa ? 'ਅੱਜ' : 'Today'}
              </button>
              <button
                type="button"
                onClick={onNextMonth}
                disabled={!canGoNext}
                aria-label={isPa ? 'ਅਗਲਾ ਮਹੀਨਾ' : 'Next month'}
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={onOpenPersonalDates}
              data-testid="open-personal-dates-btn"
              className="inline-flex items-center justify-center gap-1.5 min-h-[40px] px-2.5 sm:px-3 py-2 text-xs font-medium rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] text-[var(--accent-personal)] hover:bg-[var(--bg-hover)] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <CalendarHeart className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>
                {isPa
                  ? personalDates.length > 0
                    ? `+ ਮੇਰੀਆਂ ਤਾਰੀਖ਼ਾਂ (${toGurmukhiNumerals(personalDates.length)})`
                    : '+ ਮੇਰੀਆਂ ਤਾਰੀਖ਼ਾਂ'
                  : personalDates.length > 0
                    ? `+ My Desi Dates (${personalDates.length})`
                    : '+ My Desi Dates'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setFilterBarOpen((prev) => !prev)}
              aria-expanded={filterBarOpen}
              data-testid="filter-export-toggle"
              className={`inline-flex items-center justify-center gap-1.5 min-h-[40px] px-2.5 sm:px-3 py-2 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                filterBarOpen || activeFilter !== 'all'
                  ? 'border-[var(--accent-primary)] bg-[var(--accent-primary-tint)] text-[var(--text-heading)]'
                  : 'border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-heading)] hover:bg-[var(--bg-hover)]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--accent-primary-text)] shrink-0" aria-hidden="true" />
              <span className="truncate">
                {isPa ? 'ਫਿਲਟਰ ਅਤੇ ਐਕਸਪੋਰਟ' : 'Filter & Export'}
                {activeFilter !== 'all' && activeFilterLabel
                  ? ` · ${isPa ? activeFilterLabel.pa : activeFilterLabel.en}`
                  : ''}
              </span>
              {filterBarOpen ? (
                <ChevronUp className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Filter & Export Panel (tucked away by default for clean mobile view) */}
        {filterBarOpen && (
          <div
            data-testid="filter-export-panel"
            className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3.5 space-y-3"
          >
            {/* Row 1: Calendar Mode, Sambat Switcher & Month Jump */}
            <div className="flex flex-wrap items-center gap-2">
              <div
                role="group"
                aria-label={isPa ? 'ਕੈਲੰਡਰ ਢਾਂਚਾ' : 'Calendar organization mode'}
                className="inline-flex items-center rounded-md border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-0.5"
              >
                <button
                  type="button"
                  onClick={() => onChangeGridMode('solar')}
                  aria-pressed={isSolarMode}
                  className={`min-h-[34px] px-2.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSolarMode
                      ? 'bg-[var(--accent-navy)] text-[var(--accent-on-navy)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {isPa ? 'ਦੇਸੀ ਮਹੀਨੇ' : 'Desi Months'}
                </button>
                <button
                  type="button"
                  onClick={() => onChangeGridMode('gregorian')}
                  aria-pressed={!isSolarMode}
                  className={`min-h-[34px] px-2.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    !isSolarMode
                      ? 'bg-[var(--accent-navy)] text-[var(--accent-on-navy)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {isPa ? 'ਅੰਗਰੇਜ਼ੀ' : 'Gregorian'}
                </button>
              </div>

              <div
                role="group"
                aria-label={isPa ? 'ਸੰਮਤ ਚੁਣੋ' : 'Select Sambat year'}
                className="inline-flex items-center rounded-md border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-0.5"
              >
                <button
                  type="button"
                  onClick={() => onJumpSambat(2083)}
                  className={`min-h-[34px] px-2.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    !isSambat2084View
                      ? 'bg-[var(--bg-surface)] text-[var(--text-heading)] shadow-xs'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {isPa ? 'ਸੰਮਤ ੨੦੮੩' : 'Sambat 2083'}
                </button>
                <button
                  type="button"
                  onClick={() => onJumpSambat(2084)}
                  className={`min-h-[34px] px-2.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSambat2084View
                      ? 'bg-[var(--bg-surface)] text-[var(--text-heading)] shadow-xs'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {isPa ? 'ਸੰਮਤ ੨੦੮੪' : 'Sambat 2084'}
                </button>
              </div>

              {isSolarMode && (
                <div className="shrink-0">
                  <label htmlFor="solar-month-select" className="sr-only">
                    {isPa ? 'ਦੇਸੀ ਮਹੀਨਾ ਚੁਣੋ' : 'Select Punjabi solar month'}
                  </label>
                  <select
                    id="solar-month-select"
                    value={solarSpanIndex}
                    onChange={(e) => onSelectSolarSpan(Number(e.target.value))}
                    className="min-h-[36px] rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] px-2.5 text-xs font-medium text-[var(--text-primary)] focus:outline-2 focus:outline-[var(--accent-primary)] cursor-pointer"
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
            </div>

            {/* Row 2: Category Filter Pills + Export .ics / Print A4 */}
            <div className="flex flex-col gap-2.5 md:flex-row md:items-center md:justify-between pt-2 border-t border-[var(--border-subtle)]">
              <div
                role="group"
                aria-label={isPa ? 'ਦਿਹਾੜੇ ਫਿਲਟਰ ਕਰੋ' : 'Filter marked dates'}
                className="flex items-center gap-1 overflow-x-auto rounded-md border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-1 max-w-full"
              >
                {FILTER_OPTIONS.map((opt) => {
                  const active = activeFilter === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => onSelectFilter(opt.id)}
                      aria-pressed={active}
                      className={`min-h-[34px] px-2.5 py-1 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-[var(--accent-navy)] text-[var(--accent-on-navy)] shadow-xs'
                          : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
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
                  data-testid="export-ics-btn"
                  className="inline-flex items-center gap-1.5 min-h-[38px] px-3.5 py-1.5 text-xs font-medium rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <CalendarPlus
                    className="w-3.5 h-3.5 text-[var(--accent-primary-text)]"
                    aria-hidden="true"
                  />
                  <span>{isPa ? '.ics ਕੈਲੰਡਰ ਡਾਊਨਲੋਡ' : 'Export .ics'}</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenPrintView}
                  className="inline-flex items-center gap-1.5 min-h-[38px] px-3.5 py-1.5 text-xs font-medium rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-[var(--accent-primary-text)]" aria-hidden="true" />
                  <span>{isPa ? 'ਪ੍ਰਿੰਟ A4' : 'Print A4'}</span>
                </button>
                <PWAInstallButton lang={lang} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Plain-Language Legend (Unboxed typography with clear helpers) */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[var(--text-muted)]">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-xs bg-[var(--accent-primary)]" aria-hidden="true" />
          <span>
            {isPa ? 'ਗੁਰਪੁਰਬ · ਸੰਗਰਾਂਦ (ਮਹੀਨੇ ਦਾ ਆਰੰਭ)' : 'Gurpurab · Sangrand (Month Start)'}
          </span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MoonPhaseIcon elongationDeg={180} size={13} />
          <span>{isPa ? 'ਪੂਰਨਮਾਸ਼ੀ (ਪੂਰਾ ਚੰਨ)' : 'Puranmashi (Full Moon)'}</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MoonPhaseIcon elongationDeg={0} size={13} />
          <span>{isPa ? 'ਮੱਸਿਆ (ਅਮਾਵਸਿਆ)' : 'Masya (New Moon)'}</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-xs bg-[var(--accent-shaheedi)]" aria-hidden="true" />
          <span>{isPa ? 'ਸ਼ਹੀਦੀ ਦਿਵਸ' : 'Shaheedi'}</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-xs bg-[var(--accent-personal)]" aria-hidden="true" />
          <span>{isPa ? 'ਮੇਰੀਆਂ ਦੇਸੀ ਤਾਰੀਖ਼ਾਂ' : 'My Desi Dates'}</span>
        </span>
      </div>

      {/* 7-Column Puratan Jantri Calendar Grid */}
      <div className="overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 border-b border-[var(--border-subtle)] bg-[var(--grid-header-bg)] text-[var(--grid-header-text)]">
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
        <div className="grid grid-cols-7 divide-x divide-y divide-[var(--border-divider)]">
          {days.map((day) => {
            const isToday = day.isoDate === todayIso;
            const isSelected = day.isoDate === selectedIso;
            const dayPersonal = getPersonalDatesForSolarDay(
              personalDates,
              day.solar.monthId,
              day.solar.day,
            );
            const matches = dayMatchesFilter(day, activeFilter, dayPersonal.length);
            const dimmedByFilter = activeFilter !== 'all' && !matches;
            const hasPrimaryEvent = day.events.length > 0;
            const hasPersonal = dayPersonal.length > 0;
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
              ...dayPersonal.map((p) => p.title),
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
                className={`group relative flex flex-col justify-between text-left p-1.5 sm:p-2.5 min-h-[78px] sm:min-h-[118px] lg:min-h-[128px] transition-colors cursor-pointer focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent-primary)] ${
                  !day.inCurrentGridMonth
                    ? 'bg-[var(--bg-outside-cell)] text-[var(--text-outside)]'
                    : isToday
                      ? 'bg-[var(--bg-today-cell)]'
                      : day.solar.isSangrand
                        ? 'bg-[var(--bg-surface-soft)]'
                        : 'bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-hover)]'
                } ${isSelected ? 'ring-2 ring-inset ring-[var(--accent-primary)]' : ''} ${
                  dimmedByFilter ? 'opacity-30' : ''
                }`}
              >
                {/* Top Row: Primary Day Numeral + Secondary Date */}
                <div className="flex items-start justify-between gap-1 w-full">
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`font-mono-tabular text-base sm:text-lg font-semibold leading-none ${
                        isToday
                          ? 'text-[var(--accent-primary-text)] underline decoration-2 underline-offset-4'
                          : day.solar.isSangrand && day.inCurrentGridMonth
                            ? 'text-[var(--accent-primary-text)]'
                            : day.inCurrentGridMonth
                              ? 'text-[var(--text-heading)]'
                              : 'text-[var(--text-outside)]'
                      }`}
                    >
                      {primaryNumeral}
                    </span>
                    {isBi && isSolarMode && day.inCurrentGridMonth && (
                      <span className="hidden sm:inline font-gurmukhi text-[11px] text-[var(--text-faint)]">
                        {toGurmukhiNumerals(day.solar.day)}
                      </span>
                    )}
                  </div>

                  <span
                    className={`font-mono-tabular text-[10px] sm:text-xs font-medium leading-tight text-right truncate ${
                      !isSolarMode && day.solar.isSangrand && day.inCurrentGridMonth
                        ? 'text-[var(--accent-primary-text)] font-semibold'
                        : day.inCurrentGridMonth
                          ? 'text-[var(--text-muted)]'
                          : 'text-[var(--text-outside)]'
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
                        ? 'font-semibold text-[var(--accent-gold-text)]'
                        : day.lunar.isMasya
                          ? 'font-semibold text-[var(--text-heading)]'
                          : day.lunar.isPanchmi || day.lunar.isAshtami || day.lunar.isEkadashi
                            ? 'font-medium text-[var(--accent-primary-text)]'
                            : 'text-[var(--text-faint)]'
                    }`}
                  >
                    <span className="sm:hidden">
                      {isPa
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
                      size={14}
                      className="shrink-0"
                    />
                  )}
                </div>

                {/* Bottom Row: Sangrand / Lunar / Historical Event / Personal Desi Date Markers */}
                <div className="mt-1.5 space-y-1 w-full">
                  {day.solar.isSangrand && (
                    <div
                      title={
                        isPa
                          ? `ਸੰਗਰਾਂਦ (ਮਹੀਨੇ ਦਾ ਆਰੰਭ) · ${day.solar.monthMeta.namePa}`
                          : `Sangrand (Month Start) · ${day.solar.monthMeta.nameEn}`
                      }
                      className="hidden sm:block rounded-xs bg-[var(--accent-primary-tint)] px-1.5 py-0.5 text-[10px] font-semibold tracking-tight text-[var(--accent-primary-text)] truncate"
                    >
                      {isPa
                        ? `ਸੰਗਰਾਂਦ · ${day.solar.monthMeta.namePa}`
                        : `Sangrand · ${day.solar.monthMeta.nameEn}`}
                    </div>
                  )}

                  {!hasPrimaryEvent && day.lunar.isPuranmashi && (
                    <div
                      title={
                        isPa
                          ? `${day.lunar.lunarMonthPa} ਪੂਰਨਮਾਸ਼ੀ (ਪੂਰਾ ਚੰਨ)`
                          : `${day.lunar.lunarMonthEn} Puranmashi (Full Moon)`
                      }
                      className="hidden sm:block rounded-xs bg-[var(--accent-gold-tint)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--accent-gold-text)] truncate"
                    >
                      {isPa
                        ? `${day.lunar.lunarMonthPa} ਪੂਰਨਮਾਸ਼ੀ`
                        : `${day.lunar.lunarMonthEn} Puranmashi`}
                    </div>
                  )}

                  {!hasPrimaryEvent && day.lunar.isMasya && (
                    <div
                      title={
                        isPa
                          ? `${day.lunar.lunarMonthPa} ਮੱਸਿਆ (ਅਮਾਵਸਿਆ)`
                          : `${day.lunar.lunarMonthEn} Masya (New Moon)`
                      }
                      className="hidden sm:block rounded-xs bg-[var(--accent-navy-tint)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--text-heading)] truncate"
                    >
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
                          title={isPa ? ev.titlePa : isBi ? `${ev.titleEn} · ${ev.titlePa}` : ev.titleEn}
                          className={`rounded-xs px-1.5 py-0.5 text-[10px] sm:text-[11px] font-medium leading-tight truncate ${categoryTextClass(ev.category)}`}
                        >
                          {isPa ? ev.shortLabelPa : ev.shortLabelEn}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Desktop subtle Personal Desi Date badge */}
                  {hasPersonal && (
                    <div
                      data-testid={`personal-badge-${day.isoDate}`}
                      title={dayPersonal
                        .map((p) => `${p.title} (${getPersonalDateKindLabel(p.kind, isPa)})`)
                        .join(' · ')}
                      className="hidden sm:block rounded-xs bg-[var(--accent-personal-tint)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--accent-personal)] truncate"
                    >
                      {dayPersonal[0].title}
                      {dayPersonal.length > 1 ? ` +${dayPersonal.length - 1}` : ''}
                    </div>
                  )}

                  {/* Mobile compact bar indicators */}
                  {(hasPrimaryEvent ||
                    hasPersonal ||
                    day.solar.isSangrand ||
                    day.lunar.isPuranmashi ||
                    day.lunar.isMasya) && (
                    <div className="flex sm:hidden items-center gap-1 pt-0.5">
                      {day.solar.isSangrand && (
                        <span className="h-1.5 w-3 rounded-xs bg-[var(--accent-primary)]" aria-hidden="true" />
                      )}
                      {day.lunar.isPuranmashi && !hasPrimaryEvent && (
                        <span className="h-1.5 w-3 rounded-xs bg-[var(--accent-gold)]" aria-hidden="true" />
                      )}
                      {day.lunar.isMasya && !hasPrimaryEvent && (
                        <span className="h-1.5 w-3 rounded-xs bg-[var(--text-heading)]" aria-hidden="true" />
                      )}
                      {day.events.map((ev) => (
                        <span
                          key={ev.id}
                          className={`h-1.5 flex-1 max-w-[16px] rounded-xs ${
                            ev.category === 'gurpurab'
                              ? 'bg-[var(--accent-primary)]'
                              : ev.category === 'shaheedi'
                                ? 'bg-[var(--accent-shaheedi)]'
                                : ev.category === 'barsi'
                                  ? 'bg-[var(--accent-gold)]'
                                  : 'bg-[var(--text-heading)]'
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                      {hasPersonal && (
                        <span
                          data-testid={`personal-dot-${day.isoDate}`}
                          className="h-1.5 w-3 rounded-xs bg-[var(--accent-personal)]"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Month Highlights Strip */}
      <div className="border-t border-[var(--border-subtle)] pt-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-lg sm:text-xl font-semibold text-[var(--text-heading)]">
            {isSolarMode
              ? isPa
                ? `${currentSolarMeta.namePa} ਮਹੀਨੇ ਦੇ ਮੁੱਖ ਦਿਹਾੜੇ ਅਤੇ ਸੰਗਰਾਂਦ`
                : `Marked Dates & Colophons in ${currentSolarMeta.nameEn}, Sambat ${currentSolarSpan.sambat}`
              : isPa
                ? `${GREGORIAN_MONTHS[monthIndex0].pa} ਦੇ ਮੁੱਖ ਦਿਹਾੜੇ ਅਤੇ ਸੰਗਰਾਂਦ`
                : `Marked Dates & Colophons in ${GREGORIAN_MONTHS[monthIndex0].en} ${year}`}
          </h3>
          <span className="text-xs font-mono-tabular text-[var(--text-faint)] whitespace-nowrap">
            {isPa
              ? `${toGurmukhiNumerals(inMonthHighlights.length)} ਦਿਹਾੜੇ`
              : `${inMonthHighlights.length} marked`}
          </span>
        </div>

        {inMonthHighlights.length === 0 ? (
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            {isPa
              ? 'ਇਸ ਫਿਲਟਰ ਅਧੀਨ ਇਸ ਮਹੀਨੇ ਕੋਈ ਖਾਸ ਦਿਹਾੜਾ ਨਹੀਂ ਹੈ। "ਸਭ" ਚੁਣੋ।'
              : 'No dates match this filter in the current month. Select "All" to view all lunar and solar markers.'}
          </p>
        ) : (
          <ul className="mt-3 grid grid-cols-1 gap-2.5 md:grid-cols-2 lg:grid-cols-3">
            {inMonthHighlights.map((day) => {
              const primaryEvent = day.events[0];
              const dayPersonal = getPersonalDatesForSolarDay(
                personalDates,
                day.solar.monthId,
                day.solar.day,
              );
              const heading = primaryEvent
                ? isPa
                  ? primaryEvent.titlePa
                  : isBi
                    ? `${primaryEvent.titleEn} · ${primaryEvent.titlePa}`
                    : primaryEvent.titleEn
                : dayPersonal.length > 0
                  ? `${dayPersonal[0].title} (${getPersonalDateKindLabel(dayPersonal[0].kind, isPa)})`
                  : day.solar.isSangrand
                    ? isPa
                      ? `${day.solar.monthMeta.namePa} ਸੰਗਰਾਂਦ (ਮਹੀਨੇ ਦਾ ਆਰੰਭ)`
                      : `${day.solar.monthMeta.nameEn} Sangrand (Month Start)`
                    : day.lunar.isPuranmashi
                      ? isPa
                        ? `${day.lunar.lunarMonthPa} ਪੂਰਨਮਾਸ਼ੀ (ਪੂਰਾ ਚੰਨ)`
                        : `${day.lunar.lunarMonthEn} Puranmashi (Full Moon)`
                      : isPa
                        ? `${day.lunar.lunarMonthPa} ਮੱਸਿਆ (ਅਮਾਵਸਿਆ)`
                        : `${day.lunar.lunarMonthEn} Masya (New Moon)`;

              const accentText = primaryEvent
                ? primaryEvent.category === 'shaheedi'
                  ? 'text-[var(--accent-shaheedi)]'
                  : primaryEvent.category === 'khalsa'
                    ? 'text-[var(--text-heading)]'
                    : primaryEvent.category === 'barsi'
                      ? 'text-[var(--accent-barsi)]'
                      : 'text-[var(--accent-primary-text)]'
                : dayPersonal.length > 0
                  ? 'text-[var(--accent-personal)]'
                  : day.lunar.isMasya
                    ? 'text-[var(--text-heading)]'
                    : day.lunar.isPuranmashi
                      ? 'text-[var(--accent-gold-text)]'
                      : 'text-[var(--accent-primary-text)]';

              return (
                <li key={day.isoDate}>
                  <button
                    type="button"
                    onClick={() => onSelectDay(day)}
                    data-testid={`marked-card-${day.isoDate}`}
                    className="group w-full min-h-[72px] rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface)] hover:border-[var(--accent-gold)] hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)] p-3.5 text-left transition-all flex items-start justify-between gap-3 cursor-pointer"
                  >
                    <div className="min-w-0">
                      <p className={`text-xs font-medium ${accentText}`}>
                        {isPa
                          ? `${toGurmukhiNumerals(day.solar.day)} ${day.solar.monthMeta.namePa}`
                          : `${day.solar.day} ${day.solar.monthMeta.nameEn}`}
                        <span aria-hidden="true"> · </span>
                        {formatGregorianDate(day.isoDate, lang, false)}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary-text)] leading-snug">
                        {heading}
                      </p>
                      <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                        {isPa
                          ? `${day.lunar.lunarMonthPa} ${day.lunar.shortTithiPa}`
                          : `${day.lunar.lunarMonthEn} ${day.lunar.shortTithiEn}`}
                      </p>
                      {day.events.length > 1 && (
                        <p className="mt-0.5 text-[11px] font-medium text-[var(--accent-primary-text)]">
                          {isPa
                            ? `+${toGurmukhiNumerals(day.events.length - 1)} ਹੋਰ ਦਿਹਾੜਾ`
                            : `+${day.events.length - 1} more observance`}
                        </p>
                      )}
                      {primaryEvent && dayPersonal.length > 0 && (
                        <p className="mt-0.5 text-[11px] font-semibold text-[var(--accent-personal)]">
                          {dayPersonal.map((p) => p.title).join(' · ')}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end justify-between gap-2 shrink-0">
                      <MoonPhaseIcon
                        elongationDeg={day.lunar.elongationDeg}
                        size={22}
                        className="mt-0.5"
                      />
                      <ChevronRight
                        className="w-4 h-4 text-[var(--text-faint)] group-hover:text-[var(--accent-primary-text)] group-hover:translate-x-0.5 transition-all"
                        aria-hidden="true"
                      />
                    </div>
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
