import {ArrowUpRight, BookOpen, Clock} from 'lucide-react';
import React from 'react';
import {WEEKDAYS} from '../data/sambatData';
import type {JantriDay, LanguageMode, UpcomingMilestone} from '../data/types';
import {
  formatDualTime,
  formatGregorianDate,
  formatNum,
  toGurmukhiNumerals,
} from '../utils/bikramiEngine';
import {MoonPhaseIcon} from './MoonPhaseIcon';

interface TodayHeroProps {
  today: JantriDay;
  milestones: {
    sangrand: UpcomingMilestone | null;
    puranmashi: UpcomingMilestone | null;
    masya: UpcomingMilestone | null;
  };
  lang: LanguageMode;
  onJumpToDate: (isoDate: string) => void;
}

export const TodayHero: React.FC<TodayHeroProps> = ({
  today,
  milestones,
  lang,
  onJumpToDate,
}) => {
  const isPa = lang === 'pa';
  const isBi = lang === 'bi';
  const tithiDual = formatDualTime(today.lunar.tithiEndsAtUtc);
  const illuminationPct = Math.round(today.lunar.illumination * 100);
  const weekday = WEEKDAYS[today.weekdayIndex];

  const milestoneList = [milestones.puranmashi, milestones.masya, milestones.sangrand].filter(
    (m): m is UpcomingMilestone => m !== null,
  );

  const formatCountdown = (days: number) => {
    if (days === 0) return isPa ? 'ਅੱਜ' : isBi ? 'Today · ਅੱਜ' : 'Today';
    if (days === 1) return isPa ? 'ਕੱਲ੍ਹ (੧ ਦਿਨ)' : isBi ? 'Tomorrow · ਕੱਲ੍ਹ' : 'Tomorrow (1 day)';
    return isPa
      ? `${formatNum(days, 'pa')} ਦਿਨਾਂ ਵਿੱਚ`
      : isBi
        ? `In ${days}d · ${toGurmukhiNumerals(days)} ਦਿਨ`
        : `In ${days} days`;
  };

  // Highlighted solar/lunar observances on today's date
  const observanceTags: {en: string; pa: string; tone: string}[] = [];
  if (today.solar.isSangrand) {
    observanceTags.push({
      en: `${today.solar.monthMeta.nameEn} Sangrand`,
      pa: `${today.solar.monthMeta.namePa} ਸੰਗਰਾਂਦ`,
      tone: 'text-[#9E4F00]',
    });
  }
  if (today.lunar.isPuranmashi) {
    observanceTags.push({
      en: `${today.lunar.lunarMonthEn} Puranmashi`,
      pa: `${today.lunar.lunarMonthPa} ਪੂਰਨਮਾਸ਼ੀ`,
      tone: 'text-[#8A6305]',
    });
  } else if (today.lunar.isMasya) {
    observanceTags.push({
      en: `${today.lunar.lunarMonthEn} Masya`,
      pa: `${today.lunar.lunarMonthPa} ਮੱਸਿਆ`,
      tone: 'text-[#1B263B]',
    });
  } else if (today.lunar.isPanchmi) {
    observanceTags.push({en: 'Panchmi', pa: 'ਪੰਚਮੀ', tone: 'text-[#8A6305]'});
  } else if (today.lunar.isAshtami) {
    observanceTags.push({en: 'Ashtami', pa: 'ਅਸ਼ਟਮੀ', tone: 'text-[#8A6305]'});
  } else if (today.lunar.isEkadashi) {
    observanceTags.push({en: 'Ekadashi', pa: 'ਇਕਾਦਸ਼ੀ', tone: 'text-[#8A6305]'});
  }

  return (
    <section
      aria-labelledby="ajj-da-din-heading"
      className="no-print border border-[#D8CBB4] bg-[#F3ECE0]/70 rounded-xl p-5 sm:p-7 lg:p-8"
    >
      <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-stretch lg:gap-10">
        {/* Left Column: Primary Puratan Date Anchor & Barah Maha */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-5">
          <div>
            {/* Quiet archival kicker — zero pills */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs tracking-wide text-[#57534E]">
              <span className="font-semibold text-[#9E4F00]">
                {isPa ? 'ਅੱਜ ਦਾ ਦਿਨ' : isBi ? 'Ajj Da Din · ਅੱਜ ਦਾ ਦਿਨ' : 'Ajj Da Din'}
              </span>
              <span aria-hidden="true" className="text-[#B8860B]">·</span>
              <span>
                {isPa
                  ? `ਬਿਕ੍ਰਮੀ ਸੰਮਤ ${toGurmukhiNumerals(today.solar.sambat)}`
                  : isBi
                    ? `Bikrami Sambat ${today.solar.sambat} (ਸੰਮਤ ${toGurmukhiNumerals(today.solar.sambat)})`
                    : `Puratan Bikrami Sambat ${today.solar.sambat}`}
              </span>
              <span aria-hidden="true" className="text-[#B8860B]">·</span>
              <span>
                {isPa
                  ? today.solar.monthMeta.seasonPa
                  : isBi
                    ? `${today.solar.monthMeta.seasonEn} · ${today.solar.monthMeta.seasonPa}`
                    : today.solar.monthMeta.seasonEn}
              </span>
            </div>

            {/* Dominant Display Bikrami Solar Date */}
            <h1
              id="ajj-da-din-heading"
              className={`mt-2.5 font-display text-3xl sm:text-4xl lg:text-[46px] font-semibold tracking-tight text-[#1B263B] leading-[1.12] [text-wrap:balance] ${
                isPa ? 'font-gurmukhi text-2xl sm:text-3xl lg:text-4xl leading-snug' : ''
              }`}
            >
              {isPa
                ? `${toGurmukhiNumerals(today.solar.day)} ${today.solar.monthMeta.namePa}, ਸੰਮਤ ${toGurmukhiNumerals(today.solar.sambat)}`
                : `${today.solar.day} ${today.solar.monthMeta.nameEn}, Sambat ${today.solar.sambat}`}
            </h1>

            {isBi && (
              <p className="mt-1 font-gurmukhi text-xl sm:text-2xl font-semibold text-[#9E4F00]">
                {toGurmukhiNumerals(today.solar.day)} {today.solar.monthMeta.namePa}, ਸੰਮਤ{' '}
                {toGurmukhiNumerals(today.solar.sambat)}
              </p>
            )}

            {/* Secondary Gregorian, Vaar & Lunar Paksh / Tithi coordinates */}
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm sm:text-base text-[#44403C]">
              <span className="font-medium text-[#1C1917]">
                {formatGregorianDate(today.isoDate, lang, true)}
              </span>
              <span aria-hidden="true" className="text-[#B8860B]">/</span>
              <span className="font-medium text-[#1B263B]">
                {isPa
                  ? `${today.lunar.lunarMonthPa} ${today.lunar.pakshPa} ${toGurmukhiNumerals(today.lunar.pakshDay)} (${today.lunar.tithiNamePa})`
                  : isBi
                    ? `${today.lunar.lunarMonthEn} ${today.lunar.paksh} ${today.lunar.pakshDay} · ${today.lunar.tithiNameEn} (${today.lunar.lunarMonthPa} ${today.lunar.pakshPa} ${toGurmukhiNumerals(today.lunar.pakshDay)})`
                    : `${today.lunar.lunarMonthEn} ${today.lunar.paksh} ${today.lunar.pakshDay} · ${today.lunar.tithiNameEn}`}
              </span>
              {!isBi && (
                <>
                  <span aria-hidden="true" className="text-[#B8860B]">·</span>
                  <span className="text-xs font-medium text-[#57534E]">
                    {isPa ? `ਵਾਰ: ${weekday.fullPa}` : `Vaar: ${weekday.fullEn} (${weekday.fullPa})`}
                  </span>
                </>
              )}
            </div>

            {/* Today's Observances (Gurpurab / Sangrand / Puranmashi / Masya / Special Tithi) */}
            {(today.events.length > 0 || observanceTags.length > 0) && (
              <div className="mt-4 pt-3 border-t border-[#DDD2BE] flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
                {observanceTags.map((tag, idx) => (
                  <span key={idx} className={`font-semibold ${tag.tone}`}>
                    {isPa ? tag.pa : isBi ? `${tag.en} · ${tag.pa}` : tag.en}
                  </span>
                ))}
                {today.events.map((ev) => (
                  <button
                    key={ev.id}
                    type="button"
                    onClick={() => onJumpToDate(today.isoDate)}
                    className="inline-flex items-center gap-1.5 text-left font-semibold text-[#9E4F00] hover:text-[#7C3D00] underline decoration-[#C86400]/50 underline-offset-4 cursor-pointer"
                  >
                    <span>
                      {isPa ? ev.titlePa : isBi ? `${ev.titleEn} · ${ev.titlePa}` : ev.titleEn}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Barah Maha Manuscript Quote */}
            <div className="mt-5 pt-4 border-t border-[#DDD2BE]">
              <p className="font-gurmukhi text-base sm:text-lg text-[#1C1917] leading-relaxed">
                {today.solar.monthMeta.barahMahaOpeningPa}
              </p>
              {!isPa && (
                <p className="mt-1 text-sm italic text-[#57534E]">
                  {today.solar.monthMeta.barahMahaOpeningTranslit}
                </p>
              )}
              <p className="mt-1 text-xs text-[#78716C]">
                {isPa
                  ? today.solar.monthMeta.barahMahaRefPa
                  : isBi
                    ? `${today.solar.monthMeta.barahMahaRefEn} · ${today.solar.monthMeta.barahMahaRefPa}`
                    : today.solar.monthMeta.barahMahaRefEn}
              </p>
            </div>
          </div>

          {/* Dual-Time Tithi Transition Strip + Primary CTA */}
          <div className="space-y-4 pt-4 border-t border-[#DDD2BE]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#44403C]">
              <div className="flex flex-col gap-0.5">
                <span className="inline-flex items-center gap-1.5 font-medium text-[#1C1917]">
                  <Clock className="w-3.5 h-3.5 text-[#9E4F00] shrink-0" aria-hidden="true" />
                  <span>
                    {isPa ? 'ਸ੍ਰੀ ਅੰਮ੍ਰਿਤਸਰ ਸਾਹਿਬ (IST)' : 'Sri Amritsar Sahib (IST)'}
                  </span>
                </span>
                <span className="font-mono-tabular pl-5 text-[#44403C]">
                  {isPa ? 'ਤਿਥੀ ਸਮਾਪਤੀ ' : 'Tithi ends '}
                  {tithiDual.amritsarTime}, {tithiDual.amritsarDate}
                </span>
              </div>
              {!tithiDual.isSameZone && (
                <div className="flex flex-col gap-0.5 sm:border-l sm:border-[#DDD2BE] sm:pl-4">
                  <span className="font-medium text-[#1C1917]">
                    {isPa ? 'ਤੁਹਾਡਾ ਸਥਾਨਕ ਸਮਾਂ' : 'Your Local Time'}
                  </span>
                  <span className="font-mono-tabular text-[#44403C]">
                    {tithiDual.localTime}, {tithiDual.localDate} · {tithiDual.localTimeZoneName}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={today.solar.monthMeta.pothiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-medium rounded-md bg-[#C86400] text-[#FAF6EE] hover:bg-[#9E4F00] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B263B]"
              >
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                <span>
                  {isPa
                    ? 'ਬਾਰਹ ਮਾਹਾ ਪੜ੍ਹੋ'
                    : isBi
                      ? 'Read Barah Maha · ਬਾਰਹ ਮਾਹਾ'
                      : 'Read Barah Maha'}
                </span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={() => onJumpToDate(today.isoDate)}
                className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2.5 text-sm font-medium rounded-md border border-[#C6B9A3] text-[#1B263B] hover:bg-[#EBE2D2] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>
                  {isPa
                    ? 'ਅੱਜ ਦਾ ਵਿਸਥਾਰ ਵੇਖੋ'
                    : isBi
                      ? 'Inspect Today · ਅੱਜ ਦਾ ਵਿਸਥਾਰ'
                      : 'Inspect Today’s Colophon'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Lunar Disc & Celestial Countdowns */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6 border-t border-[#DDD2BE] pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
          {/* Live Moon Phase Indicator */}
          <div className="flex items-center gap-5">
            <MoonPhaseIcon
              elongationDeg={today.lunar.elongationDeg}
              size={84}
              className="shrink-0"
              title={
                isPa
                  ? `${today.lunar.lunarMonthPa} ${today.lunar.pakshPa} ${toGurmukhiNumerals(today.lunar.pakshDay)}`
                  : `${today.lunar.lunarMonthEn} ${today.lunar.paksh} ${today.lunar.pakshDay} (${illuminationPct}% illuminated)`
              }
            />
            <div className="min-w-0">
              <p className="text-xs text-[#78716C]">
                {isPa
                  ? 'ਚੰਦਰ ਪੱਖ ਅਤੇ ਕਲਾ'
                  : isBi
                    ? 'Lunar Paksh & Phase · ਚੰਦਰ ਪੱਖ'
                    : 'Lunar Paksh & Phase'}
              </p>
              <p className="mt-0.5 font-display text-xl sm:text-2xl font-semibold text-[#1B263B] leading-tight">
                {isPa
                  ? `${today.lunar.pakshPa} ਪੱਖ · ${today.lunar.tithiNamePa}`
                  : `${today.lunar.paksh} Paksh · ${today.lunar.tithiNameEn}`}
              </p>
              {isBi && (
                <p className="font-gurmukhi text-sm text-[#44403C]">
                  {today.lunar.pakshPa} ਪੱਖ · {today.lunar.tithiNamePa}
                </p>
              )}
              <p className="mt-1 text-xs text-[#57534E] font-mono-tabular">
                {today.lunar.paksh === 'Sudhi'
                  ? isPa
                    ? `ਵਧਦਾ ਚੰਨ · ${toGurmukhiNumerals(illuminationPct)}% ਚਾਨਣ`
                    : `Waxing · ${illuminationPct}% illuminated`
                  : isPa
                    ? `ਘਟਦਾ ਚੰਨ · ${toGurmukhiNumerals(illuminationPct)}% ਚਾਨਣ`
                    : `Waning · ${illuminationPct}% illuminated`}
              </p>
            </div>
          </div>

          {/* Upcoming Celestial Countdowns (Sangrand, Puranmashi, Masya) */}
          <div>
            <h2 className="text-xs font-medium tracking-wide text-[#78716C] pb-2 border-b border-[#DDD2BE]">
              {isPa
                ? 'ਆਉਣ ਵਾਲੇ ਮੁੱਖ ਦਿਹਾੜੇ (ਗਿਣਤੀ)'
                : isBi
                  ? 'Upcoming Milestones · ਆਉਣ ਵਾਲੇ ਮੁੱਖ ਦਿਹਾੜੇ'
                  : 'Upcoming Luni-Solar Milestones'}
            </h2>
            <ul className="divide-y divide-[#DDD2BE]/80">
              {milestoneList.map((m) => (
                <li key={m.kind}>
                  <button
                    type="button"
                    onClick={() => onJumpToDate(m.isoDate)}
                    className="w-full min-h-[48px] py-2.5 flex items-center justify-between gap-3 text-left hover:bg-[#EBE2D2]/60 -mx-2 px-2 rounded-md transition-colors cursor-pointer group"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#1C1917] group-hover:text-[#1B263B] truncate">
                        {isPa ? m.titlePa : isBi ? `${m.titleEn} · ${m.titlePa}` : m.titleEn}
                      </p>
                      <p className="text-xs text-[#57534E] truncate">
                        {formatGregorianDate(m.isoDate, lang, false)}
                        <span aria-hidden="true"> · </span>
                        {isPa ? m.bikramiLabelPa : m.bikramiLabelEn}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-mono-tabular font-medium whitespace-nowrap shrink-0 ${
                        m.kind === 'puranmashi'
                          ? 'text-[#8A6305]'
                          : m.kind === 'sangrand'
                            ? 'text-[#9E4F00]'
                            : 'text-[#1B263B]'
                      }`}
                    >
                      {formatCountdown(m.daysRemaining)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
