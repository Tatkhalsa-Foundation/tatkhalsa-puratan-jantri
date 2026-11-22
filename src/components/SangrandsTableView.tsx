import {ArrowUpRight, ChevronRight} from 'lucide-react';
import React from 'react';
import {getBikramiMonthMeta, SOLAR_MONTH_SPANS} from '../data/sambatData';
import type {LanguageMode} from '../data/types';
import {
  formatDualTime,
  formatGregorianDate,
  formatNum,
  toGurmukhiNumerals,
} from '../utils/bikramiEngine';

interface SangrandsTableViewProps {
  lang: LanguageMode;
  selectedSambat: 2083 | 2084;
  onSelectSambat: (year: 2083 | 2084) => void;
  onSelectDate: (isoDate: string) => void;
}

export const SangrandsTableView: React.FC<SangrandsTableViewProps> = ({
  lang,
  selectedSambat,
  onSelectSambat,
  onSelectDate,
}) => {
  const isPa = lang === 'pa';
  const spans = SOLAR_MONTH_SPANS.filter((s) => s.sambat === selectedSambat);

  return (
    <section aria-labelledby="sangrands-heading" className="no-print space-y-6">
      <div className="flex flex-col gap-4 border-b border-[#DDD2BE] pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs text-[#78716C]">
            {isPa
              ? 'ਸੂਰਜੀ ਦੇਸੀ ਮਹੀਨੇ (ਚੇਤ ਤੋਂ ਫੱਗਣ — ੨੯ ਤੋਂ ੩੨ ਦਿਨ)'
              : 'True Sidereal Punjabi Solar Months (29–32 Days)'}
          </p>
          <h1
            id="sangrands-heading"
            className="mt-1 font-display text-3xl sm:text-4xl font-semibold text-[#1B263B]"
          >
            {isPa ? 'ਪੁਰਾਤਨ ਸੰਗਰਾਂਦਾਂ ਅਤੇ ਦੇਸੀ ਮਹੀਨੇ' : 'Puratan Sangrands & Solar Months'}
          </h1>
          <p className="mt-1.5 text-sm text-[#57534E] max-w-2xl">
            {isPa
              ? 'ਪੁਰਾਤਨ ਬਿਕ੍ਰਮੀ ਜੰਤਰੀ ਵਿੱਚ ਹਰ ਸੰਗਰਾਂਦ ਸੂਰਜ ਦੀ ਅਸਲ ਰਾਸ਼ੀ ਪ੍ਰਵੇਸ਼ (ਸੰਕ੍ਰਾਂਤੀ) ’ਤੇ ਅਧਾਰਿਤ ਹੁੰਦੀ ਹੈ, ਨਾ ਕਿ ਨਾਨਕਸ਼ਾਹੀ ਦੀਆਂ ਪੱਕੀਆਂ ਤਾਰੀਖ਼ਾਂ ’ਤੇ।'
              : 'Each Sangrand follows true sidereal solar ingress (Sankranti) observed at Sri Anandpur Sahib (IST) sunrise, preserving the natural 29–32 day solar months of Puratan Bikrami chronology.'}
          </p>
        </div>

        <div
          role="group"
          aria-label={isPa ? 'ਸੰਮਤ ਚੋਣ' : 'Select Sambat year'}
          className="grid grid-cols-1 xs:grid-cols-2 sm:inline-flex items-center gap-1 rounded-md border border-[#DDD2BE] bg-[#F3ECE0] p-1 w-full sm:w-auto"
        >
          <button
            type="button"
            onClick={() => onSelectSambat(2083)}
            aria-pressed={selectedSambat === 2083}
            data-testid="sangrand-tab-2083"
            className={`min-h-[38px] px-3 sm:px-3.5 text-xs font-medium rounded-sm transition-colors text-center whitespace-nowrap cursor-pointer ${
              selectedSambat === 2083
                ? 'bg-[#FAF6EE] text-[#1B263B] shadow-xs'
                : 'text-[#57534E] hover:text-[#1C1917]'
            }`}
          >
            {isPa ? 'ਸੰਮਤ ੨੦੮੩ (ਕੱਤਕ–ਫੱਗਣ)' : 'Sambat 2083 (Oct ’26–Mar ’27)'}
          </button>
          <button
            type="button"
            onClick={() => onSelectSambat(2084)}
            aria-pressed={selectedSambat === 2084}
            data-testid="sangrand-tab-2084"
            className={`min-h-[38px] px-3 sm:px-3.5 text-xs font-medium rounded-sm transition-colors text-center whitespace-nowrap cursor-pointer ${
              selectedSambat === 2084
                ? 'bg-[#FAF6EE] text-[#1B263B] shadow-xs'
                : 'text-[#57534E] hover:text-[#1C1917]'
            }`}
          >
            {isPa ? 'ਸੰਮਤ ੨੦੮੪ (ਪੂਰਾ ਸਾਲ)' : 'Sambat 2084 (Full Year)'}
          </button>
        </div>
      </div>

      {/* Mobile Responsive Card List (< md): Zero Horizontal Overflow */}
      <div className="md:hidden space-y-3" data-testid="sangrands-mobile-list">
        {spans.map((span) => {
          const meta = getBikramiMonthMeta(span.monthId);
          const dual = formatDualTime(span.sankrantiUtc);
          return (
            <article
              key={`mobile-${span.sambat}-${span.monthId}`}
              className="rounded-xl border border-[#DDD2BE] bg-[#FAF6EE] p-4 shadow-xs space-y-3"
            >
              {/* Row 1: Solar Month + Days */}
              <div className="flex items-start justify-between gap-3">
                <button
                  type="button"
                  onClick={() => onSelectDate(span.startDate)}
                  className="text-left group cursor-pointer min-w-0 flex-1"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="font-display text-lg font-semibold text-[#1B263B] group-hover:text-[#9E4F00] leading-snug">
                      {isPa
                        ? `${toGurmukhiNumerals(meta.id)}. ${meta.namePa}`
                        : `${meta.id}. ${meta.nameEn} (${meta.namePa})`}
                    </span>
                    <ChevronRight
                      className="w-4 h-4 text-[#A89E8E] group-hover:text-[#9E4F00] shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="block text-xs text-[#78716C] mt-0.5">
                    {isPa ? meta.seasonPa : meta.seasonEn}
                  </span>
                </button>

                <span className="shrink-0 rounded-md border border-[#DDD2BE] bg-[#F3ECE0] px-2.5 py-1 text-xs font-mono-tabular font-semibold text-[#1B263B]">
                  {isPa
                    ? `${toGurmukhiNumerals(span.days)} ਦਿਨ`
                    : `${span.days} days`}
                </span>
              </div>

              {/* Row 2: Sangrand Date + Sankranti IST */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5 rounded-lg border border-[#E3D9C6] bg-[#F3ECE0]/60 p-3 text-xs">
                <div>
                  <p className="text-[11px] text-[#78716C]">
                    {isPa ? 'ਸੰਗਰਾਂਦ (੧ ਤਾਰੀਖ਼)' : 'Sangrand Date'}
                  </p>
                  <p className="mt-0.5 font-semibold text-[#9E4F00]">
                    {formatGregorianDate(span.startDate, lang, false)}
                  </p>
                </div>
                <div className="border-t border-[#E3D9C6] pt-2 xs:border-t-0 xs:pt-0 xs:border-l xs:pl-2.5">
                  <p className="text-[11px] text-[#78716C]">
                    {isPa
                      ? 'ਸੰਕ੍ਰਾਂਤੀ (ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ IST)'
                      : 'Sankranti (Sri Anandpur Sahib IST)'}
                  </p>
                  <p className="mt-0.5 font-mono-tabular font-medium text-[#1C1917]">
                    {dual.amritsarDate} · {dual.amritsarTime}
                  </p>
                </div>
              </div>

              {/* Row 3: Local Time (if different) + Barah Maha Read Action */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
                <p className="text-[11px] font-mono-tabular text-[#57534E]">
                  {dual.isSameZone
                    ? isPa
                      ? 'ਸਥਾਨਕ ਸਮਾਂ: IST ਸਮਾਨ'
                      : 'Local: Same as IST'
                    : `${isPa ? 'ਸਥਾਨਕ:' : 'Local:'} ${dual.localDate} · ${dual.localTime}`}
                </p>

                <a
                  href={meta.pothiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 min-h-[36px] px-3 py-1.5 rounded-md border border-[#C6B9A3] bg-[#F3ECE0] text-xs font-semibold text-[#1B263B] hover:border-[#9E4F00] hover:text-[#9E4F00] transition-colors whitespace-nowrap"
                >
                  <span>{isPa ? 'ਬਾਰਹ ਮਾਹਾ ਪੜ੍ਹੋ' : 'Read Barah Maha'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {/* Desktop Archival Table (md and wider) */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-[#DDD2BE] bg-[#FAF6EE]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#DDD2BE] bg-[#1B263B] text-xs font-medium text-[#FAF6EE]">
              <th className="py-3 px-4">{isPa ? 'ਦੇਸੀ ਮਹੀਨਾ' : 'Solar Month'}</th>
              <th className="py-3 px-4">{isPa ? 'ਸੰਗਰਾਂਦ (੧ ਤਾਰੀਖ਼)' : 'Sangrand Date'}</th>
              <th className="py-3 px-4">{isPa ? 'ਦਿਨ' : 'Days'}</th>
              <th className="py-3 px-4">
                {isPa
                  ? 'ਸੰਕ੍ਰਾਂਤੀ (ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ IST)'
                  : 'Sankranti (Sri Anandpur Sahib IST)'}
              </th>
              <th className="py-3 px-4 hidden lg:table-cell">
                {isPa ? 'ਤੁਹਾਡਾ ਸਥਾਨਕ ਸਮਾਂ' : 'Your Local Time'}
              </th>
              <th className="py-3 px-4 text-right">{isPa ? 'ਬਾਰਹ ਮਾਹਾ' : 'Barah Maha'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E3D9C6] text-sm">
            {spans.map((span) => {
              const meta = getBikramiMonthMeta(span.monthId);
              const dual = formatDualTime(span.sankrantiUtc);
              return (
                <tr
                  key={`${span.sambat}-${span.monthId}`}
                  className="hover:bg-[#F3ECE0]/55 transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <button
                      type="button"
                      onClick={() => onSelectDate(span.startDate)}
                      className="text-left group cursor-pointer"
                    >
                      <span className="font-semibold text-[#1B263B] group-hover:text-[#9E4F00] underline-offset-4 group-hover:underline">
                        {isPa
                          ? `${toGurmukhiNumerals(meta.id)}. ${meta.namePa}`
                          : `${meta.id}. ${meta.nameEn} (${meta.namePa})`}
                      </span>
                      <span className="block text-xs text-[#78716C]">
                        {isPa ? meta.seasonPa : meta.seasonEn}
                      </span>
                    </button>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#9E4F00] whitespace-nowrap">
                    {formatGregorianDate(span.startDate, lang, false)}
                  </td>
                  <td className="py-3.5 px-4 font-mono-tabular text-[#1C1917] whitespace-nowrap">
                    {formatNum(span.days, lang)}
                  </td>
                  <td className="py-3.5 px-4 font-mono-tabular text-xs text-[#44403C] whitespace-nowrap">
                    {dual.amritsarDate} · {dual.amritsarTime}
                  </td>
                  <td className="py-3.5 px-4 font-mono-tabular text-xs text-[#57534E] hidden lg:table-cell whitespace-nowrap">
                    {dual.isSameZone
                      ? isPa
                        ? 'ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ IST ਸਮਾਨ'
                        : 'Same as Sri Anandpur Sahib IST'
                      : `${dual.localDate} · ${dual.localTime}`}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <a
                      href={meta.pothiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#1B263B] hover:text-[#9E4F00] underline underline-offset-4"
                    >
                      <span>{isPa ? 'ਪੜ੍ਹੋ' : 'Read'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
