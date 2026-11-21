import {ArrowUpRight} from 'lucide-react';
import React, {useState} from 'react';
import {getBikramiMonthMeta, SOLAR_MONTH_SPANS} from '../data/sambatData';
import type {LanguageMode} from '../data/types';
import {formatDualTime, formatGregorianDate, formatNum} from '../utils/bikramiEngine';

interface SangrandsTableViewProps {
  lang: LanguageMode;
  onSelectDate: (isoDate: string) => void;
}

export const SangrandsTableView: React.FC<SangrandsTableViewProps> = ({lang, onSelectDate}) => {
  const isPa = lang === 'pa';
  const [selectedSambat, setSelectedSambat] = useState<2083 | 2084>(2084);

  const spans = SOLAR_MONTH_SPANS.filter((s) => s.sambat === selectedSambat);

  return (
    <section aria-labelledby="sangrands-heading" className="no-print space-y-6">
      <div className="flex flex-col gap-4 border-b border-[#DDD3C0] pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs text-[#78716C]">
            {isPa
              ? 'ਸੂਰਜੀ ਦੇਸੀ ਮਹੀਨੇ (ਚੇਤ ਤੋਂ ਫੱਗਣ — ੨੯ ਤੋਂ ੩੨ ਦਿਨ)'
              : 'True Sidereal Punjabi Solar Months (29–32 Days)'}
          </p>
          <h1
            id="sangrands-heading"
            className="mt-1 font-display text-3xl sm:text-4xl font-semibold text-[#1C1917]"
          >
            {isPa ? 'ਪੁਰਾਤਨ ਸੰਗਰਾਂਦਾਂ ਅਤੇ ਦੇਸੀ ਮਹੀਨੇ' : 'Puratan Sangrands & Solar Months'}
          </h1>
          <p className="mt-1.5 text-sm text-[#57534E] max-w-2xl">
            {isPa
              ? 'ਪੁਰਾਤਨ ਬਿਕ੍ਰਮੀ ਜੰਤਰੀ ਵਿੱਚ ਹਰ ਸੰਗਰਾਂਦ ਸੂਰਜ ਦੀ ਅਸਲ ਰਾਸ਼ੀ ਪ੍ਰਵੇਸ਼ (ਸੰਕ੍ਰਾਂਤੀ) ’ਤੇ ਅਧਾਰਿਤ ਹੁੰਦੀ ਹੈ, ਨਾ ਕਿ ਨਾਨਕਸ਼ਾਹੀ ਦੀਆਂ ਪੱਕੀਆਂ ਤਾਰੀਖ਼ਾਂ ’ਤੇ।'
              : 'Each Sangrand follows true sidereal solar ingress (Sankranti) observed at Sri Amritsar Sahib sunrise, preserving the natural 29–32 day solar months of Puratan Bikrami chronology.'}
          </p>
        </div>

        <div className="inline-flex items-center rounded-md border border-[#DDD3C0] bg-[#F3ECE0] p-1 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setSelectedSambat(2083)}
            className={`min-h-[38px] px-3.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap cursor-pointer ${
              selectedSambat === 2083
                ? 'bg-[#FAF6EE] text-[#1C1917] shadow-xs'
                : 'text-[#57534E] hover:text-[#1C1917]'
            }`}
          >
            {isPa ? 'ਸੰਮਤ ੨੦੮੩ (ਕੱਤਕ–ਫੱਗਣ)' : 'Sambat 2083 (Nov ’26–Mar ’27)'}
          </button>
          <button
            type="button"
            onClick={() => setSelectedSambat(2084)}
            className={`min-h-[38px] px-3.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap cursor-pointer ${
              selectedSambat === 2084
                ? 'bg-[#FAF6EE] text-[#1C1917] shadow-xs'
                : 'text-[#57534E] hover:text-[#1C1917]'
            }`}
          >
            {isPa ? 'ਸੰਮਤ ੨੦੮੪ (ਪੂਰਾ ਸਾਲ)' : 'Sambat 2084 (Full Year)'}
          </button>
        </div>
      </div>

      {/* Responsive Table (Desktop) / Cards (Mobile) */}
      <div className="overflow-x-auto rounded-xl border border-[#DDD3C0] bg-[#FAF6EE]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#DDD3C0] bg-[#F3ECE0] text-xs font-semibold text-[#44403C]">
              <th className="py-3 px-4">{isPa ? 'ਦੇਸੀ ਮਹੀਨਾ' : 'Solar Month'}</th>
              <th className="py-3 px-4">{isPa ? 'ਸੰਗਰਾਂਦ (੧ ਤਾਰੀਖ਼)' : 'Sangrand Date'}</th>
              <th className="py-3 px-4">{isPa ? 'ਦਿਨ' : 'Days'}</th>
              <th className="py-3 px-4">{isPa ? 'ਸੰਕ੍ਰਾਂਤੀ (ਅੰਮ੍ਰਿਤਸਰ IST)' : 'Sankranti (Amritsar IST)'}</th>
              <th className="py-3 px-4 hidden md:table-cell">{isPa ? 'ਤੁਹਾਡਾ ਸਥਾਨਕ ਸਮਾਂ' : 'Your Local Time'}</th>
              <th className="py-3 px-4 text-right">{isPa ? 'ਬਾਰਹ ਮਾਹਾ' : 'Barah Maha'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5DCCB] text-sm">
            {spans.map((span) => {
              const meta = getBikramiMonthMeta(span.monthId);
              const dual = formatDualTime(span.sankrantiUtc);
              return (
                <tr key={`${span.sambat}-${span.monthId}`} className="hover:bg-[#F3ECE0]/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <button
                      type="button"
                      onClick={() => onSelectDate(span.startDate)}
                      className="text-left group cursor-pointer"
                    >
                      <span className="font-semibold text-[#1C1917] group-hover:text-[#1E3A8A] underline-offset-4 group-hover:underline">
                        {isPa
                          ? `${formatNum(meta.id, 'pa')}. ${meta.namePa}`
                          : `${meta.id}. ${meta.nameEn} (${meta.namePa})`}
                      </span>
                      <span className="block text-xs text-[#78716C]">
                        {isPa ? meta.seasonPa : meta.seasonEn}
                      </span>
                    </button>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#B45309] whitespace-nowrap">
                    {formatGregorianDate(span.startDate, lang, false)}
                  </td>
                  <td className="py-3.5 px-4 font-mono-tabular text-[#1C1917] whitespace-nowrap">
                    {formatNum(span.days, lang)}
                  </td>
                  <td className="py-3.5 px-4 font-mono-tabular text-xs text-[#44403C] whitespace-nowrap">
                    {dual.amritsarDate} · {dual.amritsarTime}
                  </td>
                  <td className="py-3.5 px-4 font-mono-tabular text-xs text-[#57534E] hidden md:table-cell whitespace-nowrap">
                    {dual.isSameZone
                      ? isPa
                        ? 'ਅੰਮ੍ਰਿਤਸਰ IST ਸਮਾਨ'
                        : 'Same as Amritsar IST'
                      : `${dual.localDate} · ${dual.localTime}`}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <a
                      href={meta.pothiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#1E3A8A] hover:text-[#172554] underline underline-offset-4"
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
