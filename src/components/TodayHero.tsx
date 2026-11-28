import {ArrowUpRight, BookOpen, ChevronDown, ChevronUp, Clock, Share2} from 'lucide-react';
import React, {useState} from 'react';
import {POTHI_BARAH_MAHA_URL} from '../data/sambatData';
import type {JantriDay, LanguageMode, PersonalDesiDate, UpcomingMilestone} from '../data/types';
import type {LiveClockSnapshot} from '../hooks/useLiveClock';
import {
  formatDualTime,
  formatGregorianDate,
  formatNum,
  toGurmukhiNumerals,
} from '../utils/bikramiEngine';
import {getPersonalDateKindLabel} from '../utils/personalDates';
import {MoonPhaseIcon} from './MoonPhaseIcon';

interface TodayHeroProps {
  today: JantriDay;
  todayPersonalDates: PersonalDesiDate[];
  liveClock: LiveClockSnapshot;
  milestones: {
    sangrand: UpcomingMilestone | null;
    puranmashi: UpcomingMilestone | null;
    masya: UpcomingMilestone | null;
  };
  lang: LanguageMode;
  onJumpToDate: (isoDate: string) => void;
  onShareToday: () => void;
}

export const TodayHero: React.FC<TodayHeroProps> = ({
  today,
  todayPersonalDates,
  liveClock,
  milestones,
  lang,
  onJumpToDate,
  onShareToday,
}) => {
  const isPa = lang === 'pa';
  const isBi = lang === 'bi';
  const [detailsOpen, setDetailsOpen] = useState(false);

  const tithiDual = formatDualTime(today.lunar.tithiEndsAtUtc);
  const illuminationPct = Math.round(today.lunar.illumination * 100);

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

  const milestoneHelper = (m: UpcomingMilestone) => {
    if (m.kind === 'sangrand') {
      return isPa
        ? `${m.titlePa} (ਮਹੀਨੇ ਦਾ ਆਰੰਭ)`
        : isBi
          ? `${m.titleEn} (Month Start) · ${m.titlePa}`
          : `${m.titleEn} (Month Start)`;
    }
    if (m.kind === 'puranmashi') {
      return isPa
        ? `${m.titlePa} (ਪੂਰਾ ਚੰਨ)`
        : isBi
          ? `${m.titleEn} (Full Moon) · ${m.titlePa}`
          : `${m.titleEn} (Full Moon)`;
    }
    return isPa
      ? `${m.titlePa} (ਅਮਾਵਸਿਆ)`
      : isBi
        ? `${m.titleEn} (New Moon) · ${m.titlePa}`
        : `${m.titleEn} (New Moon)`;
  };

  // Highlighted solar/lunar observances on today's date with plain-language helpers
  const observanceTags: {en: string; pa: string; tone: string}[] = [];
  if (today.solar.isSangrand) {
    observanceTags.push({
      en: `${today.solar.monthMeta.nameEn} Sangrand (Month Start)`,
      pa: `${today.solar.monthMeta.namePa} ਸੰਗਰਾਂਦ (ਮਹੀਨੇ ਦਾ ਆਰੰਭ)`,
      tone: 'text-[var(--accent-primary-text)]',
    });
  }
  if (today.lunar.isPuranmashi) {
    observanceTags.push({
      en: `${today.lunar.lunarMonthEn} Puranmashi (Full Moon)`,
      pa: `${today.lunar.lunarMonthPa} ਪੂਰਨਮਾਸ਼ੀ (ਪੂਰਾ ਚੰਨ)`,
      tone: 'text-[var(--accent-gold-text)]',
    });
  } else if (today.lunar.isMasya) {
    observanceTags.push({
      en: `${today.lunar.lunarMonthEn} Masya (New Moon)`,
      pa: `${today.lunar.lunarMonthPa} ਮੱਸਿਆ (ਅਮਾਵਸਿਆ)`,
      tone: 'text-[var(--text-heading)]',
    });
  } else if (today.lunar.isPanchmi) {
    observanceTags.push({en: 'Panchmi', pa: 'ਪੰਚਮੀ', tone: 'text-[var(--accent-gold-text)]'});
  } else if (today.lunar.isAshtami) {
    observanceTags.push({en: 'Ashtami', pa: 'ਅਸ਼ਟਮੀ', tone: 'text-[var(--accent-gold-text)]'});
  } else if (today.lunar.isEkadashi) {
    observanceTags.push({en: 'Ekadashi', pa: 'ਇਕਾਦਸ਼ੀ', tone: 'text-[var(--accent-gold-text)]'});
  }

  const hasTodayObservance =
    today.events.length > 0 || observanceTags.length > 0 || todayPersonalDates.length > 0;

  return (
    <section
      aria-labelledby="ajj-da-din-heading"
      data-testid="today-hero-card"
      className="no-print min-h-[188px] sm:min-h-[144px] border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] rounded-2xl p-4 sm:p-5 lg:p-6"
    >
      {/* Compact Primary Row: Today's Desi Date + Lunar Tithi + Live Clocks + 2 Clean Action Buttons */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Desi Date, Lunar Tithi, Gregorian Date & Any Today Observance */}
        <div className="flex items-start gap-3.5 min-w-0">
          <MoonPhaseIcon
            elongationDeg={today.lunar.elongationDeg}
            size={48}
            className="shrink-0 mt-0.5"
            title={
              isPa
                ? `${today.lunar.lunarMonthPa} ${today.lunar.pakshPa} ${toGurmukhiNumerals(today.lunar.pakshDay)}`
                : `${today.lunar.lunarMonthEn} ${today.lunar.paksh} ${today.lunar.pakshDay} (${illuminationPct}% illuminated)`
            }
          />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[var(--text-muted)]">
              <span className="font-semibold text-[var(--accent-primary-text)]">
                {isPa ? 'ਅੱਜ ਦਾ ਦਿਨ' : isBi ? 'Ajj Da Din · ਅੱਜ ਦਾ ਦਿਨ' : 'Ajj Da Din'}
              </span>
              <span aria-hidden="true" className="text-[var(--accent-gold)]">
                ·
              </span>
              <span>{formatGregorianDate(today.isoDate, lang, true)}</span>
            </div>

            <h1
              id="ajj-da-din-heading"
              className={`mt-0.5 font-display text-2xl sm:text-3xl lg:text-[34px] font-semibold tracking-tight text-[var(--text-heading)] leading-tight [text-wrap:balance] ${
                isPa ? 'font-gurmukhi text-xl sm:text-2xl lg:text-3xl leading-snug' : ''
              }`}
            >
              {isPa
                ? `${toGurmukhiNumerals(today.solar.day)} ${today.solar.monthMeta.namePa}, ਸੰਮਤ ${toGurmukhiNumerals(today.solar.sambat)}`
                : `${today.solar.day} ${today.solar.monthMeta.nameEn}, Sambat ${today.solar.sambat}`}
            </h1>

            {isBi && (
              <p className="font-gurmukhi text-base sm:text-lg font-semibold text-[var(--accent-primary-text)] leading-snug">
                {toGurmukhiNumerals(today.solar.day)} {today.solar.monthMeta.namePa}, ਸੰਮਤ{' '}
                {toGurmukhiNumerals(today.solar.sambat)}
              </p>
            )}

            <p className="mt-1 text-sm font-medium text-[var(--text-secondary)]">
              {isPa
                ? `${today.lunar.lunarMonthPa} ${today.lunar.pakshPa} ${toGurmukhiNumerals(today.lunar.pakshDay)} · ${today.lunar.tithiNamePa}`
                : isBi
                  ? `${today.lunar.lunarMonthEn} ${today.lunar.paksh} ${today.lunar.pakshDay} · ${today.lunar.tithiNameEn} (${today.lunar.lunarMonthPa} ${today.lunar.pakshPa} ${toGurmukhiNumerals(today.lunar.pakshDay)})`
                  : `${today.lunar.lunarMonthEn} ${today.lunar.paksh} ${today.lunar.pakshDay} · ${today.lunar.tithiNameEn}`}
            </p>
          </div>
        </div>

        {/* Right: Compact Live Dual Clocks + Two Primary Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end xl:flex-row xl:items-center shrink-0">
          {/* Compact Live Anandpur Sahib (IST) + Device Clock */}
          <div className="flex items-center gap-3.5 min-h-[42px] text-xs border-t border-[var(--border-subtle)] pt-2.5 sm:border-t-0 sm:pt-0">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1 text-[11px] text-[var(--text-muted)] whitespace-nowrap">
                <Clock className="w-3 h-3 text-[var(--accent-primary-text)] shrink-0" aria-hidden="true" />
                <span>{isPa ? 'ਅਨੰਦਪੁਰ ਸਾਹਿਬ (IST)' : 'Sri Anandpur Sahib (IST)'}</span>
              </span>
              <p
                data-testid="live-clock-anandpur"
                className="font-mono-tabular text-xs sm:text-sm font-semibold text-[var(--text-heading)]"
              >
                {liveClock.anandpurTime}
              </p>
            </div>
            <div className="border-l border-[var(--border-subtle)] pl-3.5 min-w-0">
              <span className="block text-[11px] text-[var(--text-muted)] truncate max-w-[140px]">
                {isPa ? 'ਸਥਾਨਕ ਸਮਾਂ' : liveClock.localTimeZoneLabel}
              </span>
              <p
                data-testid="live-clock-local"
                className="font-mono-tabular text-xs sm:text-sm font-semibold text-[var(--text-primary)]"
              >
                {liveClock.localTime}
              </p>
            </div>
          </div>

          {/* Two Clean Action Buttons: Share Today & Today's Nitnem */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onShareToday}
              data-testid="share-today-btn"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 min-h-[42px] px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] text-[var(--text-heading)] hover:bg-[var(--bg-hover)] transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]"
            >
              <Share2 className="w-4 h-4 text-[var(--accent-primary-text)]" aria-hidden="true" />
              <span>{isPa ? 'ਅੱਜ ਸਾਂਝਾ ਕਰੋ' : 'Share Today'}</span>
            </button>

            <a
              href={POTHI_BARAH_MAHA_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="todays-nitnem-link"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 min-h-[42px] px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg bg-[var(--accent-primary)] text-[var(--accent-on-primary)] hover:bg-[var(--accent-primary-hover)] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-navy)]"
            >
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span>{isPa ? 'ਅੱਜ ਦਾ ਨਿਤਨੇਮ' : 'Today’s Nitnem'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Today's Observances (only shown when today has a Purab, Sangrand, Puranmashi, Masya, or Personal Desi Date) */}
      {hasTodayObservance && (
        <div className="mt-3 pt-2.5 border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-sm">
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
              className="inline-flex items-center gap-1 text-left font-semibold text-[var(--accent-primary-text)] hover:underline underline-offset-4 cursor-pointer"
            >
              <span>
                {isPa ? ev.titlePa : isBi ? `${ev.titleEn} · ${ev.titlePa}` : ev.titleEn}
              </span>
            </button>
          ))}
          {todayPersonalDates.map((pd) => (
            <button
              key={pd.id}
              type="button"
              onClick={() => onJumpToDate(today.isoDate)}
              className="inline-flex items-center gap-1 text-left font-semibold text-[var(--accent-personal)] hover:underline underline-offset-4 cursor-pointer"
            >
              <span>
                {pd.title} ({getPersonalDateKindLabel(pd.kind, isPa)})
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Collapsible Toggle Bar: More Details & Upcoming */}
      <div className="mt-3 pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setDetailsOpen((prev) => !prev)}
          aria-expanded={detailsOpen}
          data-testid="more-details-toggle"
          className="inline-flex items-center gap-1.5 min-h-[36px] text-xs font-semibold text-[var(--text-heading)] hover:text-[var(--accent-primary-text)] transition-colors cursor-pointer"
        >
          <span>
            {detailsOpen
              ? isPa
                ? 'ਵਿਸਥਾਰ ਲੁਕਾਓ'
                : 'Hide Details & Upcoming'
              : isPa
                ? 'ਹੋਰ ਵੇਰਵੇ ਅਤੇ ਆਉਣ ਵਾਲੇ ਦਿਹਾੜੇ'
                : 'More Details & Upcoming'}
          </span>
          {detailsOpen ? (
            <ChevronUp className="w-4 h-4" aria-hidden="true" />
          ) : (
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          )}
        </button>

        <button
          type="button"
          onClick={() => onJumpToDate(today.isoDate)}
          className="text-xs font-medium text-[var(--text-muted)] hover:text-[var(--accent-primary-text)] hover:underline underline-offset-4 cursor-pointer whitespace-nowrap"
        >
          {isPa ? 'ਅੱਜ ਦਾ ਵਿਸਥਾਰ →' : 'Inspect Colophon →'}
        </button>
      </div>

      {/* Collapsible Panel: Barah Maha Quote, Dual-Time Tithi Transition, and Upcoming Milestones */}
      {detailsOpen && (
        <div
          data-testid="more-details-panel"
          className="mt-3 pt-4 border-t border-[var(--border-subtle)] grid grid-cols-1 gap-6 lg:grid-cols-12"
        >
          {/* Left: Barah Maha Quote + Dual-Time Tithi Transition */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1.5">
              <p className="font-gurmukhi text-base text-[var(--text-primary)] leading-relaxed">
                {today.solar.monthMeta.barahMahaOpeningPa}
              </p>
              {!isPa && (
                <p className="text-xs sm:text-sm italic text-[var(--text-muted)]">
                  {today.solar.monthMeta.barahMahaOpeningTranslit}
                </p>
              )}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                <span className="text-[var(--text-faint)]">
                  {isPa ? today.solar.monthMeta.barahMahaRefPa : today.solar.monthMeta.barahMahaRefEn}
                </span>
                <a
                  href={today.solar.monthMeta.pothiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[var(--accent-primary-text)] hover:underline underline-offset-4"
                >
                  <span>{isPa ? 'ਬਾਰਹ ਮਾਹਾ ਪੜ੍ਹੋ' : 'Read Barah Maha'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <div className="space-y-0.5">
                <p className="font-semibold text-[var(--text-heading)]">
                  {isPa ? 'ਤਿਥੀ ਸਮਾਪਤੀ (ਅਨੰਦਪੁਰ ਸਾਹਿਬ IST)' : 'Tithi Transition (Sri Anandpur Sahib IST)'}
                </p>
                <p className="font-mono-tabular">
                  {tithiDual.amritsarTime}, {tithiDual.amritsarDate}
                </p>
              </div>
              <div className="space-y-0.5 sm:border-l sm:border-[var(--border-subtle)] sm:pl-4">
                <p className="font-semibold text-[var(--text-heading)]">
                  {isPa ? 'ਤੁਹਾਡਾ ਸਥਾਨਕ ਸਮਾਂ' : `Your Local Time (${tithiDual.localTimeZoneName})`}
                </p>
                <p className="font-mono-tabular">
                  {tithiDual.isSameZone
                    ? isPa
                      ? 'ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ (IST) ਸਮਾਨ'
                      : 'Aligned with Sri Anandpur Sahib (IST)'
                    : `${tithiDual.localTime}, ${tithiDual.localDate}`}
                </p>
                <p className="font-mono-tabular text-[var(--text-faint)]">
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
          </div>

          {/* Right: Upcoming Milestones (Sangrand, Puranmashi, Masya) */}
          <div className="lg:col-span-5 border-t border-[var(--border-subtle)] pt-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
            <h2 className="text-xs font-semibold text-[var(--text-muted)] pb-2 border-b border-[var(--border-subtle)]">
              {isPa
                ? 'ਆਉਣ ਵਾਲੇ ਮੁੱਖ ਦਿਹਾੜੇ (ਗਿਣਤੀ)'
                : isBi
                  ? 'Upcoming Milestones · ਆਉਣ ਵਾਲੇ ਮੁੱਖ ਦਿਹਾੜੇ'
                  : 'Upcoming Luni-Solar Milestones'}
            </h2>
            <ul className="divide-y divide-[var(--border-divider)]">
              {milestoneList.map((m) => (
                <li key={m.kind}>
                  <button
                    type="button"
                    onClick={() => onJumpToDate(m.isoDate)}
                    className="w-full min-h-[46px] py-2 flex items-center justify-between gap-3 text-left hover:bg-[var(--bg-hover)] -mx-2 px-2 rounded-md transition-colors cursor-pointer group"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary-text)] truncate">
                        {milestoneHelper(m)}
                      </p>
                      <p className="text-xs text-[var(--text-muted)] truncate">
                        {formatGregorianDate(m.isoDate, lang, false)}
                        <span aria-hidden="true"> · </span>
                        {isPa ? m.bikramiLabelPa : m.bikramiLabelEn}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-mono-tabular font-semibold whitespace-nowrap shrink-0 ${
                        m.kind === 'puranmashi'
                          ? 'text-[var(--accent-gold-text)]'
                          : m.kind === 'sangrand'
                            ? 'text-[var(--accent-primary-text)]'
                            : 'text-[var(--text-heading)]'
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
      )}
    </section>
  );
};
