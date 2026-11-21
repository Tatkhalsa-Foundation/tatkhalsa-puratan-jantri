import {ArrowUpRight, BookOpen, Clock, Sparkles} from 'lucide-react';
import React from 'react';
import type {JantriDay, LanguageMode, UpcomingMilestone} from '../data/types';
import {formatDualTime, formatGregorianDate, formatNum} from '../utils/bikramiEngine';
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
  const tithiDual = formatDualTime(today.lunar.tithiEndsAtUtc);
  const illuminationPct = Math.round(today.lunar.illumination * 100);

  const milestoneList = [milestones.puranmashi, milestones.masya, milestones.sangrand].filter(
    (m): m is UpcomingMilestone => m !== null,
  );

  const formatCountdown = (days: number) => {
    if (days === 0) return isPa ? 'ਅੱਜ' : 'Today';
    if (days === 1) return isPa ? 'ਕੱਲ੍ਹ (੧ ਦਿਨ)' : 'Tomorrow (1 day)';
    return isPa ? `${formatNum(days, 'pa')} ਦਿਨਾਂ ਵਿੱਚ` : `In ${days} days`;
  };

  return (
    <section
      aria-labelledby="ajj-da-din-heading"
      className="no-print border border-[#DDD3C0] bg-[#F3ECE0]/65 rounded-xl p-5 sm:p-7 lg:p-8"
    >
      <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-stretch lg:gap-10">
        {/* Left Column: Primary Puratan Date Anchor & Barah Maha */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-5">
          <div>
            {/* Quiet archival kicker — zero pills */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs tracking-wide text-[#57534E]">
              <span className="font-semibold text-[#B45309]">
                {isPa ? 'ਅੱਜ ਦਾ ਦਿਨ' : 'Ajj Da Din'}
              </span>
              <span aria-hidden="true">·</span>
              <span>
                {isPa
                  ? `ਸੰਮਤ ${formatNum(today.solar.sambat, 'pa')} ਬਿਕ੍ਰਮੀ`
                  : `Puratan Bikrami Sambat ${today.solar.sambat}`}
              </span>
              <span aria-hidden="true">·</span>
              <span>{isPa ? today.solar.monthMeta.seasonPa : today.solar.monthMeta.seasonEn}</span>
            </div>

            {/* Dominant Display Bikrami Solar Date */}
            <h1
              id="ajj-da-din-heading"
              className={`mt-2.5 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1C1917] leading-[1.12] [text-wrap:balance] ${
                isPa ? 'font-gurmukhi text-2xl sm:text-3xl lg:text-4xl leading-snug' : ''
              }`}
            >
              {isPa
                ? `${formatNum(today.solar.day, 'pa')} ${today.solar.monthMeta.namePa}, ਸੰਮਤ ${formatNum(today.solar.sambat, 'pa')}`
                : `${today.solar.day} ${today.solar.monthMeta.nameEn}, Sambat ${today.solar.sambat}`}
            </h1>

            {/* Secondary Gregorian & Lunar Tithi coordinates */}
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm sm:text-base text-[#44403C]">
              <span className="font-medium text-[#1C1917]">
                {formatGregorianDate(today.isoDate, lang, true)}
              </span>
              <span aria-hidden="true" className="text-[#A8A29E]">/</span>
              <span className="font-medium text-[#1E3A8A]">
                {isPa
                  ? `${today.lunar.lunarMonthPa} ${today.lunar.pakshPa} ${formatNum(today.lunar.pakshDay, 'pa')} (${today.lunar.tithiNamePa})`
                  : `${today.lunar.lunarMonthEn} ${today.lunar.paksh} ${today.lunar.pakshDay} · ${today.lunar.tithiNameEn}`}
              </span>
            </div>

            {/* Today's historical event notice if present */}
            {today.events.length > 0 && (
              <div className="mt-4 pt-3 border-t border-[#DDD3C0]/80">
                {today.events.map((ev) => (
                  <button
                    key={ev.id}
                    type="button"
                    onClick={() => onJumpToDate(today.isoDate)}
                    className="group inline-flex items-center gap-2 text-left text-sm font-medium text-[#B45309] hover:text-[#92400E] cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span className="underline decoration-[#D97706]/50 underline-offset-4 group-hover:decoration-[#B45309]">
                      {isPa ? ev.titlePa : ev.titleEn}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Barah Maha Manuscript Quote */}
            <div className="mt-5 pt-4 border-t border-[#DDD3C0]/80">
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
                  : today.solar.monthMeta.barahMahaRefEn}
              </p>
            </div>
          </div>

          {/* Dual-Time Tithi Transition Strip + Primary CTA */}
          <div className="space-y-4 pt-4 border-t border-[#DDD3C0]/80">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 text-xs text-[#44403C]">
              <div className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#B45309] shrink-0" aria-hidden="true" />
                <span className="font-medium text-[#1C1917]">
                  {isPa ? 'ਸ੍ਰੀ ਅੰਮ੍ਰਿਤਸਰ ਸਾਹਿਬ (IST):' : 'Sri Amritsar Sahib (IST):'}
                </span>
                <span className="font-mono-tabular">
                  {isPa ? 'ਤਿਥੀ ਸਮਾਪਤੀ ' : 'Tithi ends '}
                  {tithiDual.amritsarTime} ({tithiDual.amritsarDate})
                </span>
              </div>
              {!tithiDual.isSameZone && (
                <div className="inline-flex items-center gap-1.5 sm:border-l sm:border-[#DDD3C0] sm:pl-4">
                  <span className="font-medium text-[#1C1917]">
                    {isPa ? 'ਤੁਹਾਡਾ ਸਥਾਨਕ ਸਮਾਂ:' : 'Your Local Time:'}
                  </span>
                  <span className="font-mono-tabular">
                    {tithiDual.localTime} ({tithiDual.localDate}) · {tithiDual.localTimeZoneName}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={today.solar.monthMeta.pothiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-medium rounded-md bg-[#D97706] text-[#FAF6EE] hover:bg-[#B45309] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
              >
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                <span>{isPa ? 'ਬਾਰਹ ਮਾਹਾ ਪੜ੍ਹੋ' : 'Read Barah Maha'}</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={() => onJumpToDate(today.isoDate)}
                className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2.5 text-sm font-medium rounded-md border border-[#C6B9A3] text-[#1C1917] hover:bg-[#EDE4D3] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>{isPa ? 'ਅੱਜ ਦਾ ਵਿਸਥਾਰ ਵੇਖੋ' : 'Inspect Today’s Colophon'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Lunar Disc & Celestial Countdowns */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6 border-t border-[#DDD3C0] pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
          {/* Live Moon Phase Indicator */}
          <div className="flex items-center gap-5">
            <MoonPhaseIcon
              elongationDeg={today.lunar.elongationDeg}
              size={84}
              className="shrink-0"
              title={
                isPa
                  ? `${today.lunar.lunarMonthPa} ${today.lunar.pakshPa} ${formatNum(today.lunar.pakshDay, 'pa')}`
                  : `${today.lunar.lunarMonthEn} ${today.lunar.paksh} ${today.lunar.pakshDay} (${illuminationPct}% illuminated)`
              }
            />
            <div className="min-w-0">
              <p className="text-xs text-[#78716C]">
                {isPa ? 'ਚੰਦਰ ਪੱਖ ਅਤੇ ਕਲਾ' : 'Lunar Paksh & Phase'}
              </p>
              <p className="mt-0.5 font-display text-xl sm:text-2xl font-semibold text-[#1C1917] leading-tight">
                {isPa
                  ? `${today.lunar.pakshPa} ਪੱਖ · ${today.lunar.tithiNamePa}`
                  : `${today.lunar.paksh} Paksh · ${today.lunar.tithiNameEn}`}
              </p>
              <p className="mt-1 text-xs text-[#57534E] font-mono-tabular">
                {today.lunar.paksh === 'Sudhi'
                  ? isPa
                    ? `ਵਧਦਾ ਚੰਨ · ${formatNum(illuminationPct, 'pa')}% ਚਾਨਣ`
                    : `Waxing · ${illuminationPct}% illuminated`
                  : isPa
                    ? `ਘਟਦਾ ਚੰਨ · ${formatNum(illuminationPct, 'pa')}% ਚਾਨਣ`
                    : `Waning · ${illuminationPct}% illuminated`}
              </p>
            </div>
          </div>

          {/* Upcoming Celestial Countdowns (Sangrand, Puranmashi, Masya) */}
          <div>
            <h2 className="text-xs font-medium tracking-wide text-[#78716C] pb-2 border-b border-[#DDD3C0]">
              {isPa ? 'ਆਉਣ ਵਾਲੇ ਮੁੱਖ ਦਿਹਾੜੇ (ਗਿਣਤੀ)' : 'Upcoming Luni-Solar Milestones'}
            </h2>
            <ul className="divide-y divide-[#DDD3C0]/80">
              {milestoneList.map((m) => (
                <li key={m.kind}>
                  <button
                    type="button"
                    onClick={() => onJumpToDate(m.isoDate)}
                    className="w-full min-h-[48px] py-2.5 flex items-center justify-between gap-3 text-left hover:bg-[#EDE4D3]/60 -mx-2 px-2 rounded-md transition-colors cursor-pointer group"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#1C1917] group-hover:text-[#1E3A8A] truncate">
                        {isPa ? m.titlePa : m.titleEn}
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
                          ? 'text-[#B45309]'
                          : m.kind === 'sangrand'
                            ? 'text-[#1E3A8A]'
                            : 'text-[#44403C]'
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
