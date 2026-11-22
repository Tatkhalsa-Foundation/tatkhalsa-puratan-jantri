import {ArrowRight, BookMarked, CalendarSearch, Search} from 'lucide-react';
import React, {useMemo} from 'react';
import {WEEKDAYS} from '../data/sambatData';
import type {DirectoryCategory, DirectoryObservance, LanguageMode} from '../data/types';
import {
  formatGregorianDate,
  getAllDirectoryObservances,
  getBikramiSolarDate,
  LOOKUP_MAX_ISO,
  LOOKUP_MIN_ISO,
  lookupGregorianToBikrami,
  toGurmukhiNumerals,
} from '../utils/bikramiEngine';
import type {DirectoryFilterState, DirectorySambatState} from '../utils/statePersistence';
import {MoonPhaseIcon} from './MoonPhaseIcon';

interface EventsDirectoryViewProps {
  todayIso: string;
  lang: LanguageMode;
  query: string;
  onQueryChange: (q: string) => void;
  category: DirectoryFilterState;
  onCategoryChange: (cat: DirectoryFilterState) => void;
  sambat: DirectorySambatState;
  onSambatChange: (s: DirectorySambatState) => void;
  upcomingOnly: boolean;
  onUpcomingOnlyChange: (val: boolean) => void;
  lookupInput: string;
  onLookupInputChange: (iso: string) => void;
  onSelectDate: (isoDate: string) => void;
  onJumpToGridDate: (isoDate: string) => void;
}

type DirectoryFilter = DirectoryFilterState;

const CATEGORY_TABS: readonly {id: DirectoryFilter; en: string; pa: string}[] = [
  {id: 'all', en: 'All', pa: 'ਸਭ'},
  {id: 'gurpurab', en: 'Gurpurabs', pa: 'ਗੁਰਪੁਰਬ'},
  {id: 'guru-ghar', en: 'Sahibzade & Guru Ghar', pa: 'ਸਾਹਿਬਜ਼ਾਦੇ ਤੇ ਗੁਰੂ ਘਰ'},
  {id: 'bhagat-bhatt', en: 'Bhagats & Bhatts', pa: 'ਭਗਤ ਅਤੇ ਭੱਟ'},
  {id: 'gursikh', en: 'Gursikhs & Panj Pyare', pa: 'ਗੁਰਸਿੱਖ ਤੇ ਪੰਜ ਪਿਆਰੇ'},
  {id: 'shaheedi', en: 'Shaheedi', pa: 'ਸ਼ਹੀਦੀ'},
  {id: 'barsi', en: 'Barsis & Mahapurakhs', pa: 'ਬਰਸੀਆਂ / ਮਹਾਂਪੁਰਖ'},
  {id: 'sangrand-tithi', en: 'Sangrands / Tithis', pa: 'ਸੰਗਰਾਂਦਾਂ / ਤਿਥੀਆਂ'},
];

const QUICK_LOOKUPS: readonly {iso: string; en: string; pa: string}[] = [
  {iso: '2026-11-24', en: '24 Nov 2026 · 557th Parkash', pa: '੨੪ ਨਵੰ ੨੦੨੬ · ੫੫੭ਵਾਂ ਪ੍ਰਕਾਸ਼'},
  {iso: '2027-04-14', en: '14 Apr 2027 · Vaisakhi 2084', pa: '੧੪ ਅਪ੍ਰੈ ੨੦੨੭ · ਵੈਸਾਖੀ ੨੦੮੪'},
  {iso: '2027-09-08', en: '8 Sep 2027 · Chaupai Colophon', pa: '੮ ਸਤੰ ੨੦੨੭ · ਚੌਪਈ ਹਵਾਲਾ'},
];

function formatUsSlashDate(iso: string): string {
  const parts = iso.split('-');
  if (parts.length !== 3) return iso;
  return `${parts[1]}/${parts[2]}/${parts[0]}`;
}

function categoryLabel(cat: DirectoryCategory, isPa: boolean): string {
  switch (cat) {
    case 'gurpurab':
      return isPa ? 'ਗੁਰਪੁਰਬ' : 'Gurpurab';
    case 'shaheedi':
      return isPa ? 'ਸ਼ਹੀਦੀ ਦਿਵਸ' : 'Shaheedi Divas';
    case 'khalsa':
      return isPa ? 'ਖ਼ਾਲਸਾ / ਗ੍ਰੰਥ ਹਵਾਲਾ' : 'Khalsa & Colophon';
    case 'barsi':
      return isPa ? 'ਬਰਸੀ / ਮਹਾਂਪੁਰਖ' : 'Barsi / Mahapurakh';
    case 'sangrand':
      return isPa ? 'ਸੰਗਰਾਂਦ (ਮਹੀਨੇ ਦਾ ਆਰੰਭ)' : 'Sangrand (Month Start)';
    case 'puranmashi':
      return isPa ? 'ਪੂਰਨਮਾਸ਼ੀ (ਪੂਰਾ ਚੰਨ)' : 'Puranmashi (Full Moon)';
    case 'masya':
      return isPa ? 'ਮੱਸਿਆ (ਅਮਾਵਸਿਆ)' : 'Masya (New Moon)';
  }
}

function categoryColor(cat: DirectoryObservance['category']): string {
  if (cat === 'shaheedi') return 'text-[var(--accent-shaheedi)]';
  if (cat === 'khalsa' || cat === 'masya') return 'text-[var(--text-heading)]';
  if (cat === 'barsi') return 'text-[var(--accent-barsi)]';
  if (cat === 'puranmashi') return 'text-[var(--accent-gold-text)]';
  return 'text-[var(--accent-primary-text)]';
}

export const EventsDirectoryView: React.FC<EventsDirectoryViewProps> = ({
  todayIso,
  lang,
  query,
  onQueryChange,
  category,
  onCategoryChange,
  sambat,
  onSambatChange,
  upcomingOnly,
  onUpcomingOnlyChange,
  lookupInput,
  onLookupInputChange,
  onSelectDate,
  onJumpToGridDate,
}) => {
  const isPa = lang === 'pa';
  const isBi = lang === 'bi';

  const allObservances = useMemo(() => getAllDirectoryObservances(), []);
  const lookupResult = useMemo(() => lookupGregorianToBikrami(lookupInput), [lookupInput]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allObservances.filter((item) => {
      if (category !== 'all') {
        if (category === 'guru-ghar' || category === 'bhagat-bhatt' || category === 'gursikh') {
          if (!item.subGroups?.includes(category)) return false;
        } else if (category === 'sangrand-tithi') {
          if (
            item.category !== 'sangrand' &&
            item.category !== 'puranmashi' &&
            item.category !== 'masya'
          ) {
            return false;
          }
        } else if (item.category !== category) {
          return false;
        }
      }
      if (sambat !== 'all' && String(item.sambat) !== sambat) return false;
      if (upcomingOnly && item.date < todayIso) return false;
      if (!q) return true;
      return (
        item.titleEn.toLowerCase().includes(q) ||
        item.titlePa.toLowerCase().includes(q) ||
        item.ruleEn.toLowerCase().includes(q) ||
        item.rulePa.toLowerCase().includes(q) ||
        item.summaryEn.toLowerCase().includes(q) ||
        item.summaryPa.toLowerCase().includes(q) ||
        item.sourceSearchText.toLowerCase().includes(q) ||
        item.date.includes(q)
      );
    });
  }, [allObservances, query, category, sambat, upcomingOnly, todayIso]);

  return (
    <section aria-labelledby="events-directory-heading" className="no-print space-y-8">
      {/* Gregorian-to-Bikrami Date Lookup Card */}
      <div
        aria-labelledby="date-lookup-heading"
        className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] p-5 sm:p-6 space-y-4"
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold text-[var(--accent-primary-text)]">
              {isPa
                ? 'ਗ੍ਰੈਗੋਰੀਅਨ ਤੋਂ ਪੁਰਾਤਨ ਬਿਕ੍ਰਮੀ ਤਾਰੀਖ਼ ਖੋਜ'
                : isBi
                  ? 'Gregorian → Puratan Bikrami Lookup · ਤਾਰੀਖ਼ ਖੋਜ'
                  : 'Gregorian → Puratan Bikrami Date Lookup'}
            </p>
            <h2
              id="date-lookup-heading"
              className="mt-0.5 font-display text-2xl font-semibold text-[var(--text-heading)]"
            >
              {isPa ? 'ਕਿਸੇ ਵੀ ਤਾਰੀਖ਼ ਦਾ ਦੇਸੀ ਮਹੀਨਾ ਅਤੇ ਤਿਥੀ ਵੇਖੋ' : 'Convert Any Date in Sambat 2083–2084'}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full lg:w-auto">
            <label
              htmlFor="gregorian-lookup-input"
              className="text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap"
            >
              {isPa ? 'ਅੰਗਰੇਜ਼ੀ ਤਾਰੀਖ਼:' : 'Gregorian Date:'}
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
              <div className="relative flex items-center w-full sm:w-auto min-w-[205px]">
                <CalendarSearch
                  className="w-4 h-4 text-[var(--text-heading)] absolute left-3.5 pointer-events-none shrink-0"
                  aria-hidden="true"
                />
                <input
                  id="gregorian-lookup-input"
                  type="date"
                  min={LOOKUP_MIN_ISO}
                  max={LOOKUP_MAX_ISO}
                  value={lookupInput}
                  onChange={(e) => onLookupInputChange(e.target.value)}
                  className="w-full sm:w-auto min-w-[205px] min-h-[44px] pl-10 pr-3.5 py-2 text-sm font-mono-tabular rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] focus:outline-2 focus:outline-[var(--accent-primary)]"
                />
              </div>
              {lookupResult.ok && (
                <span
                  data-testid="lookup-formatted-date"
                  className="inline-flex items-center px-2.5 py-1 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] text-xs font-mono-tabular font-medium text-[var(--text-heading)] whitespace-nowrap self-start sm:self-auto"
                >
                  {isPa
                    ? formatGregorianDate(lookupResult.day.isoDate, 'pa', false)
                    : `${formatGregorianDate(lookupResult.day.isoDate, 'en', false)} (${formatUsSlashDate(lookupResult.day.isoDate)})`}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quick Reference Lookup Presets */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[var(--text-faint)]">{isPa ? 'ਤੁਰੰਤ ਉਦਾਹਰਨਾਂ:' : 'Quick examples:'}</span>
          {QUICK_LOOKUPS.map((preset) => (
            <button
              key={preset.iso}
              type="button"
              onClick={() => onLookupInputChange(preset.iso)}
              className={`min-h-[32px] px-2.5 py-1 rounded-sm border transition-colors whitespace-nowrap cursor-pointer ${
                lookupInput === preset.iso
                  ? 'border-[var(--accent-navy)] bg-[var(--accent-navy)] text-[var(--accent-on-navy)]'
                  : 'border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
              }`}
            >
              {isPa ? preset.pa : preset.en}
            </button>
          ))}
        </div>

        {/* Conversion Result or Validation Error */}
        {lookupResult.ok ? (
          <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] p-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4 min-w-0">
              <MoonPhaseIcon
                elongationDeg={lookupResult.day.lunar.elongationDeg}
                size={48}
                className="shrink-0 mt-0.5"
              />
              <div className="min-w-0 space-y-1">
                <p className="text-xs text-[var(--text-muted)]">
                  {formatGregorianDate(lookupResult.day.isoDate, lang, true)}
                  <span aria-hidden="true"> · </span>
                  {isPa
                    ? `ਵਾਰ: ${WEEKDAYS[lookupResult.day.weekdayIndex].fullPa}`
                    : `Vaar: ${WEEKDAYS[lookupResult.day.weekdayIndex].fullEn} (${WEEKDAYS[lookupResult.day.weekdayIndex].fullPa})`}
                </p>
                <p className="font-display text-xl sm:text-2xl font-semibold text-[var(--text-heading)] leading-tight">
                  {isPa
                    ? `${toGurmukhiNumerals(lookupResult.day.solar.day)} ${lookupResult.day.solar.monthMeta.namePa}, ਸੰਮਤ ${toGurmukhiNumerals(lookupResult.day.solar.sambat)}`
                    : isBi
                      ? `${lookupResult.day.solar.day} ${lookupResult.day.solar.monthMeta.nameEn}, Sambat ${lookupResult.day.solar.sambat} · ${toGurmukhiNumerals(lookupResult.day.solar.day)} ${lookupResult.day.solar.monthMeta.namePa}`
                      : `${lookupResult.day.solar.day} ${lookupResult.day.solar.monthMeta.nameEn}, Sambat ${lookupResult.day.solar.sambat}`}
                </p>
                <p className="text-sm font-medium text-[var(--accent-primary-text)]">
                  {isPa
                    ? `${lookupResult.day.lunar.lunarMonthPa} ${lookupResult.day.lunar.pakshPa} ${toGurmukhiNumerals(lookupResult.day.lunar.pakshDay)} · ${lookupResult.day.lunar.tithiNamePa}`
                    : `${lookupResult.day.lunar.lunarMonthEn} ${lookupResult.day.lunar.paksh} ${lookupResult.day.lunar.pakshDay} · ${lookupResult.day.lunar.tithiNameEn}`}
                  {lookupResult.day.solar.isSangrand && (
                    <span> · {isPa ? 'ਸੰਗਰਾਂਦ (ਮਹੀਨੇ ਦਾ ਆਰੰਭ)' : 'Sangrand (Month Start)'}</span>
                  )}
                </p>
                {lookupResult.day.events.length > 0 && (
                  <p className="text-xs font-semibold text-[var(--text-heading)]">
                    {lookupResult.day.events
                      .map((ev) => (isPa ? ev.titlePa : ev.titleEn))
                      .join(' · ')}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onSelectDate(lookupResult.day.isoDate)}
                className="min-h-[40px] px-4 py-2 text-xs font-medium rounded-md bg-[var(--accent-navy)] text-[var(--accent-on-navy)] hover:bg-[var(--accent-navy-hover)] transition-colors whitespace-nowrap cursor-pointer"
              >
                {isPa ? 'ਵਿਸਥਾਰ ਵੇਖੋ' : 'Inspect Colophon'}
              </button>
              <button
                type="button"
                onClick={() => onJumpToGridDate(lookupResult.day.isoDate)}
                className="inline-flex items-center gap-1 min-h-[40px] px-3.5 py-2 text-xs font-medium rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-heading)] hover:bg-[var(--bg-hover)] transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>{isPa ? 'ਜੰਤਰੀ ਵਿੱਚ ਖੋਲ੍ਹੋ' : 'View in Jantri'}</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        ) : (
          <div
            role="alert"
            className="rounded-lg border border-[var(--accent-shaheedi)]/35 bg-[var(--accent-shaheedi-tint)] px-4 py-3 text-xs font-medium text-[var(--accent-shaheedi)]"
          >
            {isPa ? lookupResult.errorPa : lookupResult.errorEn}
          </div>
        )}
      </div>

      {/* Unified Purabs, Sangrands & Lunar Dates Directory */}
      <div className="border-b border-[var(--border-subtle)] pb-5 space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs text-[var(--text-faint)]">
              {isPa ? 'ਸੰਮਤ ੨੦੮੩ – ੨੦੮੪ ਬਿਕ੍ਰਮੀ' : 'Sambat 2083 – 2084 Bikrami'}
            </p>
            <h1
              id="events-directory-heading"
              className="mt-1 font-display text-3xl sm:text-4xl font-semibold text-[var(--text-heading)]"
            >
              {isPa
                ? 'ਗੁਰਪੁਰਬ, ਸ਼ਹੀਦੀ, ਸੰਗਰਾਂਦਾਂ, ਪੂਰਨਮਾਸ਼ੀ ਅਤੇ ਮੱਸਿਆ'
                : 'Purabs, Sangrands & Lunar Observances'}
            </h1>
            <p className="mt-1.5 text-sm text-[var(--text-muted)] max-w-2xl">
              {isPa
                ? 'ਕਿਸੇ ਵੀ ਦਿਹਾੜੇ ’ਤੇ ਕਲਿੱਕ ਕਰਕੇ ਉਸ ਦਾ ਇਤਿਹਾਸਕ ਪ੍ਰਸੰਗ, ਤਿਥੀ ਸਮਾਂ ਅਤੇ ਗ੍ਰੰਥਾਂ/ਭੱਟ ਵਹੀਆਂ ਦੇ ਪ੍ਰਮਾਣਿਕ ਹਵਾਲੇ ਪੜ੍ਹੋ।'
                : 'Filter Gurpurabs, Shaheedi Divases, manuscript colophons, Sangrands, Puranmashi, and Masya dates across Sambat 2083–2084.'}
            </p>
          </div>
          <p className="text-xs font-mono-tabular text-[var(--text-muted)] whitespace-nowrap">
            {isPa
              ? `${toGurmukhiNumerals(filtered.length)} ਦਿਹਾੜੇ`
              : `${filtered.length} observances`}
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search
                className="w-4 h-4 text-[var(--text-faint)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <label htmlFor="event-search-input" className="sr-only">
                {isPa ? 'ਦਿਹਾੜੇ, ਤਿਥੀ ਜਾਂ ਗ੍ਰੰਥ ਖੋਜੋ' : 'Search observances, tithis, or scriptural sources'}
              </label>
              <input
                id="event-search-input"
                type="search"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder={
                  isPa
                    ? 'ਗੁਰਪੁਰਬ, ਭਗਤ, ਭੱਟ, ਸਾਹਿਬਜ਼ਾਦੇ, ਪੰਜ ਪਿਆਰੇ ਜਾਂ ਗ੍ਰੰਥ ਖੋਜੋ...'
                    : 'Search Gurpurab, Bhagat, Bhatt, Sahibzade, Panj Pyare...'
                }
                className="w-full min-h-[42px] pl-9 pr-3 py-2 text-sm rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-faint)] focus:outline-2 focus:outline-[var(--accent-primary)]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div
                role="group"
                aria-label={isPa ? 'ਸੰਮਤ ਫਿਲਟਰ' : 'Filter by Sambat'}
                className="inline-flex items-center rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-1"
              >
                {(
                  [
                    {id: 'all', en: '2083–84', pa: '੨੦੮੩–੮੪'},
                    {id: '2083', en: '2083', pa: '੨੦੮੩'},
                    {id: '2084', en: '2084', pa: '੨੦੮੪'},
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onSambatChange(opt.id)}
                    aria-pressed={sambat === opt.id}
                    className={`min-h-[36px] px-3 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      sambat === opt.id
                        ? 'bg-[var(--bg-surface-elevated)] text-[var(--text-heading)] shadow-xs'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {isPa ? opt.pa : opt.en}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => onUpcomingOnlyChange(!upcomingOnly)}
                aria-pressed={upcomingOnly}
                className={`min-h-[42px] px-3.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap cursor-pointer ${
                  upcomingOnly
                    ? 'border-[var(--accent-navy)] bg-[var(--accent-navy)] text-[var(--accent-on-navy)]'
                    : 'border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                {isPa ? 'ਸਿਰਫ਼ ਆਉਣ ਵਾਲੇ' : 'Upcoming Only'}
              </button>
            </div>
          </div>

          {/* 8 Panthic Category Filter Chips */}
          <div
            role="group"
            aria-label={isPa ? 'ਸ਼੍ਰੇਣੀ ਚੁਣੋ' : 'Filter by observance category'}
            data-testid="directory-category-chips"
            className="flex flex-wrap items-center gap-1.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-1.5 max-w-full"
          >
            {CATEGORY_TABS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                data-testid={`directory-filter-${opt.id}`}
                onClick={() => onCategoryChange(opt.id)}
                aria-pressed={category === opt.id}
                className={`min-h-[36px] px-3 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  category === opt.id
                    ? 'bg-[var(--accent-navy)] text-[var(--accent-on-navy)] shadow-xs'
                    : 'bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-heading)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                {isPa ? opt.pa : opt.en}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results List */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] p-8 text-center">
          <p className="text-sm text-[var(--text-muted)]">
            {isPa
              ? 'ਤੁਹਾਡੀ ਖੋਜ ਨਾਲ ਕੋਈ ਦਿਹਾੜਾ ਨਹੀਂ ਮਿਲਿਆ।'
              : 'No observances match your current search or filter.'}
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-[var(--border-subtle)] border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-surface-elevated)] overflow-hidden">
          {filtered.map((item) => {
            const solar = getBikramiSolarDate(item.date);
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onSelectDate(item.date)}
                  className="w-full p-4 sm:p-5 text-left hover:bg-[var(--bg-hover)] transition-colors flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between cursor-pointer"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-xs">
                      <span className={`font-semibold ${categoryColor(item.category)}`}>
                        {categoryLabel(item.category, isPa)}
                      </span>
                      <span aria-hidden="true" className="text-[var(--accent-gold)]">
                        ·
                      </span>
                      <span className="font-medium text-[var(--text-secondary)]">
                        {isPa ? item.rulePa : item.ruleEn}
                      </span>
                      {item.citationCount > 0 && (
                        <>
                          <span aria-hidden="true" className="text-[var(--accent-gold)]">
                            ·
                          </span>
                          <span className="text-[var(--text-faint)] inline-flex items-center gap-1">
                            <BookMarked className="w-3 h-3" aria-hidden="true" />
                            {isPa
                              ? `${toGurmukhiNumerals(item.citationCount)} ਹਵਾਲੇ`
                              : `${item.citationCount} source${item.citationCount > 1 ? 's' : ''}`}
                          </span>
                        </>
                      )}
                    </div>

                    <h2 className="font-display text-xl font-semibold text-[var(--text-heading)] leading-snug">
                      {isPa ? item.titlePa : item.titleEn}
                    </h2>
                    {isBi && (
                      <p className="font-gurmukhi text-sm font-medium text-[var(--text-secondary)]">
                        {item.titlePa}
                      </p>
                    )}
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-3xl">
                      {isPa ? item.summaryPa : item.summaryEn}
                    </p>
                  </div>

                  <div className="sm:text-right shrink-0 pt-1 sm:pt-0 sm:pl-4">
                    <p className="text-sm font-semibold text-[var(--text-primary)] whitespace-nowrap">
                      {formatGregorianDate(item.date, lang, false)}
                    </p>
                    <p className="text-xs font-medium text-[var(--accent-primary-text)] whitespace-nowrap">
                      {isPa
                        ? `${toGurmukhiNumerals(solar.day)} ${solar.monthMeta.namePa}, ਸੰਮਤ ${toGurmukhiNumerals(solar.sambat)}`
                        : `${solar.day} ${solar.monthMeta.nameEn}, Sambat ${solar.sambat}`}
                    </p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};
