import {ArrowUpRight, BookMarked, BookOpen, CalendarPlus, Clock, X} from 'lucide-react';
import React, {useEffect} from 'react';
import {POTHI_BASE_URL} from '../data/sambatData';
import type {JantriDay, LanguageMode} from '../data/types';
import {
  formatDualTime,
  formatGregorianDate,
  toGurmukhiNumerals,
} from '../utils/bikramiEngine';
import {generateSingleDayIcs} from '../utils/icsExport';
import {MoonPhaseIcon} from './MoonPhaseIcon';

interface EventColophonDrawerProps {
  day: JantriDay | null;
  lang: LanguageMode;
  onClose: () => void;
}

export const EventColophonDrawer: React.FC<EventColophonDrawerProps> = ({
  day,
  lang,
  onClose,
}) => {
  const isPa = lang === 'pa';
  const isBi = lang === 'bi';

  useEffect(() => {
    if (!day) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [day, onClose]);

  if (!day) return null;

  const tithiDual = formatDualTime(day.lunar.tithiEndsAtUtc);
  const sankrantiDual = day.solar.isSangrand ? formatDualTime(day.solar.sankrantiUtc) : null;
  const illuminationPct = Math.round(day.lunar.illumination * 100);

  const primaryEventPothi = day.events.find((e) => e.pothiUrl);
  const footerPothiUrl = primaryEventPothi?.pothiUrl ?? day.solar.monthMeta.pothiUrl ?? POTHI_BASE_URL;
  const footerPothiLabel = primaryEventPothi
    ? isPa
      ? primaryEventPothi.pothiLabelPa || 'ਪੋਥੀ ਸਾਹਿਬ ’ਤੇ ਬਾਣੀ ਪੜ੍ਹੋ'
      : primaryEventPothi.pothiLabelEn || 'Read Bani on Pothi'
    : isPa
      ? 'ਬਾਰਹ ਮਾਹਾ ਪੜ੍ਹੋ'
      : 'Read Barah Maha';

  const specialLunarNote = day.lunar.isPuranmashi
    ? isPa
      ? 'ਪੂਰਨਮਾਸ਼ੀ (ਪੂਰਾ ਚੰਨ · ਸੁਦੀ ੧੫)'
      : 'Puranmashi (Full Moon · Sudhi 15)'
    : day.lunar.isMasya
      ? isPa
        ? 'ਮੱਸਿਆ (ਅਮਾਵਸਿਆ · ਵਦੀ ੧੫)'
        : 'Masya (New Moon · Vadhi 15)'
      : day.lunar.isPanchmi
        ? isPa
          ? `${day.lunar.pakshPa} ਪੰਚਮੀ (੫)`
          : `${day.lunar.paksh} Panchmi (5th Tithi)`
        : day.lunar.isAshtami
          ? isPa
            ? `${day.lunar.pakshPa} ਅਸ਼ਟਮੀ (੮)`
            : `${day.lunar.paksh} Ashtami (8th Tithi)`
          : day.lunar.isEkadashi
            ? isPa
              ? `${day.lunar.pakshPa} ਇਕਾਦਸ਼ੀ (੧੧)`
              : `${day.lunar.paksh} Ekadashi (11th Tithi)`
            : null;

  const handleDownloadSingleIcs = () => {
    const primaryTitle =
      day.events.length > 0
        ? isPa
          ? day.events[0].titlePa
          : day.events[0].titleEn
        : day.solar.isSangrand
          ? isPa
            ? `${day.solar.monthMeta.namePa} ਸੰਗਰਾਂਦ`
            : `${day.solar.monthMeta.nameEn} Sangrand`
          : isPa
            ? `${toGurmukhiNumerals(day.solar.day)} ${day.solar.monthMeta.namePa} · ${day.lunar.shortTithiPa}`
            : `${day.solar.day} ${day.solar.monthMeta.nameEn} · ${day.lunar.shortTithiEn}`;

    const desc = [
      `${day.solar.day} ${day.solar.monthMeta.nameEn}, Sambat ${day.solar.sambat}`,
      `Lunar: ${day.lunar.lunarMonthEn} ${day.lunar.paksh} ${day.lunar.pakshDay} (${day.lunar.tithiNameEn})`,
      ...day.events.map((e) => `${e.titleEn}: ${e.summaryEn}`),
    ].join('\n');

    const ics = generateSingleDayIcs(day.isoDate, primaryTitle, desc);
    const blob = new Blob([ics], {type: 'text/calendar;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tatkhalsa-jantri-${day.isoDate}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="no-print fixed inset-0 z-50 flex justify-end bg-[#1B263B]/45 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="colophon-drawer-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative flex h-full w-full max-w-xl flex-col bg-[#FAF6EE] border-l border-[#DDD2BE] shadow-2xl overflow-hidden">
        {/* Drawer Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#DDD2BE] bg-[#F3ECE0] px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="text-xs text-[#78716C]">
              {formatGregorianDate(day.isoDate, lang, true)}
            </p>
            <h2
              id="colophon-drawer-title"
              className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-[#1B263B] leading-tight"
            >
              {isPa
                ? `${toGurmukhiNumerals(day.solar.day)} ${day.solar.monthMeta.namePa}, ਸੰਮਤ ${toGurmukhiNumerals(day.solar.sambat)}`
                : `${day.solar.day} ${day.solar.monthMeta.nameEn}, Sambat ${day.solar.sambat}`}
            </h2>
            {isBi && (
              <p className="font-gurmukhi text-base font-semibold text-[#9E4F00]">
                {toGurmukhiNumerals(day.solar.day)} {day.solar.monthMeta.namePa}, ਸੰਮਤ{' '}
                {toGurmukhiNumerals(day.solar.sambat)}
              </p>
            )}
            <p className="mt-1 text-sm font-medium text-[#1B263B]">
              {isPa
                ? `${day.lunar.lunarMonthPa} ${day.lunar.pakshPa} ${toGurmukhiNumerals(day.lunar.pakshDay)} · ${day.lunar.tithiNamePa}`
                : isBi
                  ? `${day.lunar.lunarMonthEn} ${day.lunar.paksh} ${day.lunar.pakshDay} · ${day.lunar.tithiNameEn} (${day.lunar.lunarMonthPa} ${day.lunar.pakshPa} ${toGurmukhiNumerals(day.lunar.pakshDay)})`
                  : `${day.lunar.lunarMonthEn} ${day.lunar.paksh} ${day.lunar.pakshDay} · ${day.lunar.tithiNameEn}`}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={isPa ? 'ਵੇਰਵਾ ਬੰਦ ਕਰੋ' : 'Close colophon drawer'}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md text-[#44403C] hover:bg-[#EBE2D2] transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Archival Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6 space-y-6">
          {/* Luni-Solar & Dual-Time Panel */}
          <div className="rounded-lg border border-[#DDD2BE] bg-[#F3ECE0]/60 p-4 space-y-3">
            <div className="flex items-center gap-4">
              <MoonPhaseIcon elongationDeg={day.lunar.elongationDeg} size={52} className="shrink-0" />
              <div className="min-w-0 space-y-0.5">
                <p className="text-xs text-[#78716C]">
                  {isPa
                    ? 'ਚੰਦਰ ਸਥਿਤੀ (ਸ੍ਰੀ ਅੰਮ੍ਰਿਤਸਰ ਸਾਹਿਬ ਸੂਰਜ-ਉਦੈ ਅਨੁਸਾਰ)'
                    : 'Lunar Coordinates (Sri Amritsar Sahib Sunrise)'}
                </p>
                <p className="text-sm font-semibold text-[#1C1917]">
                  {isPa
                    ? `${day.lunar.pakshPa} ਪੱਖ · ${day.lunar.tithiNamePa} (${toGurmukhiNumerals(illuminationPct)}% ਚਾਨਣ)`
                    : `${day.lunar.paksh} Paksh · ${day.lunar.tithiNameEn} (${illuminationPct}% illuminated)`}
                </p>
                {specialLunarNote && (
                  <p className="text-xs font-semibold text-[#8A6305]">{specialLunarNote}</p>
                )}
                {day.solar.isSangrand && (
                  <p className="text-xs font-semibold text-[#9E4F00]">
                    {isPa
                      ? `ਸੰਗਰਾਂਦ — ${day.solar.monthMeta.namePa} ਮਹੀਨੇ ਦਾ ਆਰੰਭ (${toGurmukhiNumerals(day.solar.totalDaysInMonth)} ਦਿਨ)`
                      : `Sangrand — First day of ${day.solar.monthMeta.nameEn} (${day.solar.totalDaysInMonth} solar days)`}
                  </p>
                )}
              </div>
            </div>

            <div className="border-t border-[#DDD2BE] pt-3 space-y-2 text-xs text-[#44403C]">
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#9E4F00] mt-0.5 shrink-0" aria-hidden="true" />
                <div className="space-y-1">
                  <p className="font-medium text-[#1C1917]">
                    {isPa ? 'ਤਿਥੀ ਸਮਾਪਤੀ ਸਮਾਂ (ਦੋਹਰਾ ਸਮਾਂ):' : 'Lunar Tithi Transition (Dual-Time):'}
                  </p>
                  <p className="font-mono-tabular">
                    {isPa ? 'ਸ੍ਰੀ ਅੰਮ੍ਰਿਤਸਰ ਸਾਹਿਬ (IST): ' : 'Sri Amritsar Sahib (IST): '}
                    <span className="font-medium text-[#1C1917]">
                      {tithiDual.amritsarTime}, {tithiDual.amritsarDate}
                    </span>
                  </p>
                  {!tithiDual.isSameZone && (
                    <p className="font-mono-tabular">
                      {isPa ? 'ਤੁਹਾਡਾ ਸਥਾਨਕ ਸਮਾਂ: ' : 'Your Local Time: '}
                      <span className="font-medium text-[#1C1917]">
                        {tithiDual.localTime}, {tithiDual.localDate}
                      </span>{' '}
                      · {tithiDual.localTimeZoneName}
                    </p>
                  )}
                </div>
              </div>

              {sankrantiDual && (
                <div className="flex items-start gap-2 pt-2 border-t border-[#DDD2BE]/70">
                  <Clock className="w-3.5 h-3.5 text-[#1B263B] mt-0.5 shrink-0" aria-hidden="true" />
                  <div className="space-y-1">
                    <p className="font-medium text-[#1C1917]">
                      {isPa ? 'ਸੂਰਜੀ ਸੰਕ੍ਰਾਂਤੀ (ਸੰਗਰਾਂਦ) ਪ੍ਰਵੇਸ਼:' : 'Solar Sankranti Ingress:'}
                    </p>
                    <p className="font-mono-tabular">
                      {isPa ? 'ਸ੍ਰੀ ਅੰਮ੍ਰਿਤਸਰ ਸਾਹਿਬ (IST): ' : 'Sri Amritsar Sahib (IST): '}
                      <span className="font-medium text-[#1C1917]">
                        {sankrantiDual.amritsarTime}, {sankrantiDual.amritsarDate}
                      </span>
                    </p>
                    {!sankrantiDual.isSameZone && (
                      <p className="font-mono-tabular">
                        {isPa ? 'ਤੁਹਾਡਾ ਸਥਾਨਕ ਸਮਾਂ: ' : 'Your Local Time: '}
                        <span className="font-medium text-[#1C1917]">
                          {sankrantiDual.localTime}, {sankrantiDual.localDate}
                        </span>{' '}
                        · {sankrantiDual.localTimeZoneName}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Historical Events & Primary Scriptural Colophons */}
          {day.events.length > 0 ? (
            <div className="space-y-6">
              {day.events.map((ev) => (
                <article key={ev.id} className="space-y-4">
                  <div>
                    <p
                      className={`text-xs font-semibold ${
                        ev.category === 'shaheedi'
                          ? 'text-[#8F1D1D]'
                          : ev.category === 'khalsa'
                            ? 'text-[#1B263B]'
                            : 'text-[#9E4F00]'
                      }`}
                    >
                      {ev.category === 'gurpurab'
                        ? isPa
                          ? 'ਗੁਰਪੁਰਬ'
                          : 'Gurpurab'
                        : ev.category === 'shaheedi'
                          ? isPa
                            ? 'ਸ਼ਹੀਦੀ ਦਿਵਸ'
                            : 'Shaheedi Divas'
                          : isPa
                            ? 'ਖ਼ਾਲਸਾ / ਗ੍ਰੰਥ ਹਵਾਲਾ'
                            : 'Khalsa & Manuscript Colophon'}
                      <span aria-hidden="true"> · </span>
                      {isPa ? ev.tithiRulePa : ev.tithiRuleEn}
                    </p>
                    <h3 className="mt-1 font-display text-xl sm:text-2xl font-semibold text-[#1B263B] leading-snug">
                      {isPa ? ev.titlePa : ev.titleEn}
                    </h3>
                    {isBi && (
                      <p className="mt-0.5 font-gurmukhi text-base font-medium text-[#44403C]">
                        {ev.titlePa}
                      </p>
                    )}
                  </div>

                  <p className="text-sm sm:text-[15px] text-[#292524] leading-[1.75]">
                    {isPa ? ev.historicalContextPa : ev.historicalContextEn}
                  </p>
                  {isBi && (
                    <p className="font-gurmukhi text-sm text-[#44403C] leading-[1.8]">
                      {ev.historicalContextPa}
                    </p>
                  )}

                  {/* Primary Scriptural & Colophon Citations */}
                  <div className="space-y-3 pt-3 border-t border-[#DDD2BE]">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#1B263B]">
                      <BookMarked className="w-4 h-4 text-[#B8860B]" aria-hidden="true" />
                      <span>
                        {isPa
                          ? 'ਪ੍ਰਮਾਣਿਕ ਗ੍ਰੰਥ ਅਤੇ ਇਤਿਹਾਸਕ ਹਵਾਲੇ'
                          : 'Primary Scriptural & Colophon Citations'}
                      </span>
                    </div>

                    <dl className="divide-y divide-[#DDD2BE]/80 rounded-lg border border-[#DDD2BE] bg-[#FAF6EE]">
                      {ev.citations.map((cit, idx) => (
                        <div key={idx} className="p-3.5 space-y-1.5">
                          <dt className="text-xs font-semibold text-[#1B263B]">
                            {isPa ? cit.sourcePa : cit.sourceEn}
                          </dt>
                          <dd className="text-xs text-[#57534E]">
                            {isPa ? cit.referencePa : cit.referenceEn}
                          </dd>
                          {cit.excerptPa && (
                            <blockquote className="pt-1.5 space-y-0.5">
                              <p className="font-gurmukhi text-sm text-[#1C1917]">
                                {cit.excerptPa}
                              </p>
                              {!isPa && cit.excerptTranslit && (
                                <p className="text-xs italic text-[#57534E]">
                                  {cit.excerptTranslit}
                                </p>
                              )}
                            </blockquote>
                          )}
                          {cit.pothiUrl && (
                            <div className="pt-1">
                              <a
                                href={cit.pothiUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-medium text-[#9E4F00] hover:text-[#7C3D00] underline underline-offset-4"
                              >
                                <span>
                                  {isPa
                                    ? cit.pothiLabelPa || 'ਪੋਥੀ ਸਾਹਿਬ ’ਤੇ ਪੜ੍ਹੋ'
                                    : cit.pothiLabelEn || 'Read on pothi.tatkhalsa.in'}
                                </span>
                                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                              </a>
                            </div>
                          )}
                        </div>
                      ))}
                    </dl>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <h3 className="font-display text-lg font-semibold text-[#1B263B]">
                {isPa
                  ? `${day.solar.monthMeta.namePa} ਮਹੀਨਾ — ਬਾਰਹ ਮਾਹਾ ਪ੍ਰਸੰਗ`
                  : `${day.solar.monthMeta.nameEn} Month — Barah Maha Reflection`}
              </h3>
              <p className="text-sm text-[#44403C] leading-relaxed">
                {isPa
                  ? `ਇਹ ਦਿਨ ਪੁਰਾਤਨ ਬਿਕ੍ਰਮੀ ਸੰਮਤ ${toGurmukhiNumerals(day.solar.sambat)} ਦੇ ${day.solar.monthMeta.namePa} ਮਹੀਨੇ ਦੀ ${toGurmukhiNumerals(day.solar.day)} ਤਾਰੀਖ਼ ਅਤੇ ${day.lunar.lunarMonthPa} ${day.lunar.pakshPa} ${toGurmukhiNumerals(day.lunar.pakshDay)} (${day.lunar.tithiNamePa}) ਹੈ।`
                  : `This date falls on ${day.solar.day} ${day.solar.monthMeta.nameEn}, Sambat ${day.solar.sambat}, corresponding to ${day.lunar.lunarMonthEn} ${day.lunar.paksh} ${day.lunar.pakshDay} (${day.lunar.tithiNameEn}) in the Puratan luni-solar Bikrami calendar.`}
              </p>
            </div>
          )}

          {/* Month Barah Maha Archival Block */}
          <div className="rounded-lg border border-[#DDD2BE] bg-[#F3ECE0]/55 p-4 space-y-1.5">
            <p className="text-xs text-[#78716C]">
              {isPa ? day.solar.monthMeta.barahMahaRefPa : day.solar.monthMeta.barahMahaRefEn}
            </p>
            <p className="font-gurmukhi text-base text-[#1C1917]">
              {day.solar.monthMeta.barahMahaOpeningPa}
            </p>
            {!isPa && (
              <p className="text-xs italic text-[#57534E]">
                {day.solar.monthMeta.barahMahaOpeningTranslit}
              </p>
            )}
            <div className="pt-1">
              <a
                href={day.solar.monthMeta.pothiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-[#1B263B] hover:text-[#9E4F00] underline underline-offset-4"
              >
                <span>{isPa ? 'pothi.tatkhalsa.in ’ਤੇ ਬਾਰਹ ਮਾਹਾ ਪੜ੍ਹੋ' : 'Open Barah Maha on pothi.tatkhalsa.in'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Sticky Drawer Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-[#DDD2BE] bg-[#F3ECE0] px-5 py-3.5 sm:px-6">
          <button
            type="button"
            onClick={handleDownloadSingleIcs}
            className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 text-xs sm:text-sm font-medium rounded-md border border-[#C6B9A3] bg-[#FAF6EE] text-[#1C1917] hover:bg-[#EBE2D2] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <CalendarPlus className="w-4 h-4 text-[#1B263B]" aria-hidden="true" />
            <span>{isPa ? 'ਕੈਲੰਡਰ ਵਿੱਚ ਜੋੜੋ (.ics)' : 'Add Date (.ics)'}</span>
          </button>

          <a
            href={footerPothiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 text-xs sm:text-sm font-medium rounded-md bg-[#C86400] text-[#FAF6EE] hover:bg-[#9E4F00] transition-colors whitespace-nowrap shrink-0"
          >
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            <span>{footerPothiLabel}</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
};
