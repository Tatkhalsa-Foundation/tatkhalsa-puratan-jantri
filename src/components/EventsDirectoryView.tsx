import {BookMarked, Search} from 'lucide-react';
import React, {useMemo, useState} from 'react';
import {HISTORICAL_EVENTS} from '../data/eventsData';
import type {EventCategory, HistoricalEvent, LanguageMode} from '../data/types';
import {formatGregorianDate, formatNum, getBikramiSolarDate} from '../utils/bikramiEngine';

interface EventsDirectoryViewProps {
  lang: LanguageMode;
  onSelectDate: (isoDate: string) => void;
}

type CategoryFilter = 'all' | Exclude<EventCategory, 'sangrand' | 'lunar'>;

export const EventsDirectoryView: React.FC<EventsDirectoryViewProps> = ({lang, onSelectDate}) => {
  const isPa = lang === 'pa';
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [sambat, setSambat] = useState<'all' | '2083' | '2084'>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return HISTORICAL_EVENTS.filter((ev) => {
      if (category !== 'all' && ev.category !== category) return false;
      if (sambat !== 'all' && String(ev.sambat) !== sambat) return false;
      if (!q) return true;
      return (
        ev.titleEn.toLowerCase().includes(q) ||
        ev.titlePa.toLowerCase().includes(q) ||
        ev.tithiRuleEn.toLowerCase().includes(q) ||
        ev.summaryEn.toLowerCase().includes(q) ||
        ev.citations.some((c) => c.sourceEn.toLowerCase().includes(q) || c.sourcePa.toLowerCase().includes(q))
      );
    });
  }, [query, category, sambat]);

  const categoryColor = (cat: HistoricalEvent['category']) => {
    if (cat === 'shaheedi') return 'text-[#991B1B]';
    if (cat === 'khalsa') return 'text-[#1E3A8A]';
    return 'text-[#B45309]';
  };

  return (
    <section aria-labelledby="events-directory-heading" className="no-print space-y-6">
      <div className="border-b border-[#DDD3C0] pb-5 space-y-4">
        <div>
          <p className="text-xs text-[#78716C]">
            {isPa ? 'ਸੰਮਤ ੨੦੮੩ – ੨੦੮੪ ਬਿਕ੍ਰਮੀ' : 'Sambat 2083 – 2084 Bikrami'}
          </p>
          <h1
            id="events-directory-heading"
            className="mt-1 font-display text-3xl sm:text-4xl font-semibold text-[#1C1917]"
          >
            {isPa ? 'ਗੁਰਪੁਰਬ, ਸ਼ਹੀਦੀ ਦਿਵਸ ਅਤੇ ਇਤਿਹਾਸਕ ਦਿਹਾੜੇ' : 'Gurpurabs, Shaheedi Divases & Historical Archive'}
          </h1>
          <p className="mt-1.5 text-sm text-[#57534E] max-w-2xl">
            {isPa
              ? 'ਕਿਸੇ ਵੀ ਦਿਹਾੜੇ ’ਤੇ ਕਲਿੱਕ ਕਰਕੇ ਉਸ ਦਾ ਇਤਿਹਾਸਕ ਪ੍ਰਸੰਗ ਅਤੇ ਗ੍ਰੰਥਾਂ/ਭੱਟ ਵਹੀਆਂ ਦੇ ਪ੍ਰਮਾਣਿਕ ਹਵਾਲੇ ਪੜ੍ਹੋ।'
              : 'Select any observance to open its Puratan luni-solar rule, historical context, and primary scriptural or colophon citations.'}
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search
              className="w-4 h-4 text-[#78716C] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <label htmlFor="event-search-input" className="sr-only">
              {isPa ? 'ਦਿਹਾੜੇ ਜਾਂ ਗ੍ਰੰਥ ਖੋਜੋ' : 'Search events or scriptural sources'}
            </label>
            <input
              id="event-search-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                isPa ? 'ਗੁਰਪੁਰਬ, ਤਿਥੀ ਜਾਂ ਗ੍ਰੰਥ ਖੋਜੋ...' : 'Search Gurpurab, tithi, or source...'
              }
              className="w-full min-h-[42px] pl-9 pr-3 py-2 text-sm rounded-md border border-[#C6B9A3] bg-[#FAF6EE] text-[#1C1917] placeholder:text-[#78716C] focus:outline-2 focus:outline-[#1E3A8A]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center rounded-md border border-[#DDD3C0] bg-[#F3ECE0] p-1">
              {(
                [
                  {id: 'all', en: 'All', pa: 'ਸਭ'},
                  {id: 'gurpurab', en: 'Gurpurabs', pa: 'ਗੁਰਪੁਰਬ'},
                  {id: 'shaheedi', en: 'Shaheedi', pa: 'ਸ਼ਹੀਦੀ'},
                  {id: 'khalsa', en: 'Khalsa', pa: 'ਖ਼ਾਲਸਾ'},
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setCategory(opt.id)}
                  className={`min-h-[36px] px-3 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    category === opt.id
                      ? 'bg-[#FAF6EE] text-[#1C1917] shadow-xs'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {isPa ? opt.pa : opt.en}
                </button>
              ))}
            </div>

            <div className="inline-flex items-center rounded-md border border-[#DDD3C0] bg-[#F3ECE0] p-1">
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
                  onClick={() => setSambat(opt.id)}
                  className={`min-h-[36px] px-3 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    sambat === opt.id
                      ? 'bg-[#FAF6EE] text-[#1C1917] shadow-xs'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {isPa ? opt.pa : opt.en}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results List */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-[#DDD3C0] bg-[#F3ECE0]/50 p-8 text-center">
          <p className="text-sm text-[#57534E]">
            {isPa ? 'ਤੁਹਾਡੀ ਖੋਜ ਨਾਲ ਕੋਈ ਦਿਹਾੜਾ ਨਹੀਂ ਮਿਲਿਆ।' : 'No historical observances match your filter.'}
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-[#DDD3C0] border border-[#DDD3C0] rounded-xl bg-[#FAF6EE] overflow-hidden">
          {filtered.map((ev) => {
            const solar = getBikramiSolarDate(ev.date);
            return (
              <li key={ev.id}>
                <button
                  type="button"
                  onClick={() => onSelectDate(ev.date)}
                  className="w-full p-4 sm:p-5 text-left hover:bg-[#F3ECE0]/70 transition-colors flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between cursor-pointer"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-xs">
                      <span className={`font-semibold ${categoryColor(ev.category)}`}>
                        {ev.category === 'gurpurab'
                          ? isPa
                            ? 'ਗੁਰਪੁਰਬ'
                            : 'Gurpurab'
                          : ev.category === 'shaheedi'
                            ? isPa
                              ? 'ਸ਼ਹੀਦੀ ਦਿਵਸ'
                              : 'Shaheedi Divas'
                            : isPa
                              ? 'ਖ਼ਾਲਸਾ / ਸੰਪਰਦਾਇ'
                              : 'Khalsa & Sampardai'}
                      </span>
                      <span aria-hidden="true" className="text-[#A8A29E]">·</span>
                      <span className="font-medium text-[#44403C]">
                        {isPa ? ev.tithiRulePa : ev.tithiRuleEn}
                      </span>
                      <span aria-hidden="true" className="text-[#A8A29E]">·</span>
                      <span className="text-[#78716C] inline-flex items-center gap-1">
                        <BookMarked className="w-3 h-3" aria-hidden="true" />
                        {isPa
                          ? `${formatNum(ev.citations.length, 'pa')} ਹਵਾਲੇ`
                          : `${ev.citations.length} source${ev.citations.length > 1 ? 's' : ''}`}
                      </span>
                    </div>

                    <h2 className="font-display text-xl font-semibold text-[#1C1917] leading-snug">
                      {isPa ? ev.titlePa : ev.titleEn}
                    </h2>
                    <p className="text-sm text-[#57534E] leading-relaxed max-w-3xl">
                      {isPa ? ev.summaryPa : ev.summaryEn}
                    </p>
                  </div>

                  <div className="sm:text-right shrink-0 pt-1 sm:pt-0 sm:pl-4">
                    <p className="text-sm font-semibold text-[#1C1917] whitespace-nowrap">
                      {formatGregorianDate(ev.date, lang, false)}
                    </p>
                    <p className="text-xs font-medium text-[#B45309] whitespace-nowrap">
                      {isPa
                        ? `${formatNum(solar.day, 'pa')} ${solar.monthMeta.namePa}, ਸੰਮਤ ${formatNum(solar.sambat, 'pa')}`
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
