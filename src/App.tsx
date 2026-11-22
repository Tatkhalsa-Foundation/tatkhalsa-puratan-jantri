/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {ArrowUpRight} from 'lucide-react';
import {useEffect, useMemo, useState} from 'react';
import {EventColophonDrawer} from './components/EventColophonDrawer';
import {EventsDirectoryView} from './components/EventsDirectoryView';
import {Header, type AppView} from './components/Header';
import {IcsExportModal} from './components/IcsExportModal';
import {MonthlyJantriGrid, type CalendarFilter} from './components/MonthlyJantriGrid';
import {OfflineIndicator} from './components/PWAInstallButton';
import {PrintJantriView} from './components/PrintJantriView';
import {SangrandsTableView} from './components/SangrandsTableView';
import {ShastarAsthaanCard} from './components/ShastarAsthaanCard';
import {TodayHero} from './components/TodayHero';
import {getBikramiMonthMeta, POTHI_BARAH_MAHA_URL} from './data/sambatData';
import type {CalendarGridMode, JantriDay, LanguageMode} from './data/types';
import {useLiveClock} from './hooks/useLiveClock';
import {
  BROWSEABLE_SOLAR_SPANS,
  getJantriDay,
  getMonthCalendarGrid,
  getNextMilestones,
  getSolarMonthCalendarGrid,
  getSolarMonthSpanIndexForDate,
  SUPPORTED_MAX_MONTH,
  SUPPORTED_MIN_MONTH,
} from './utils/bikramiEngine';

const LANG_STORAGE_KEY = 'tatkhalsa_jantri_lang';

export default function App() {
  const liveClock = useLiveClock();
  const todayIso = liveClock.effectiveTodayIso;
  const [todayYear, todayMonth1] = useMemo(() => todayIso.split('-').map(Number), [todayIso]);
  const todaySolarIndex = useMemo(() => getSolarMonthSpanIndexForDate(todayIso), [todayIso]);

  const [lang, setLang] = useState<LanguageMode>(() => {
    try {
      const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'pa' || saved === 'en' || saved === 'bi') return saved;
    } catch {
      // Ignore storage access restrictions
    }
    return 'en';
  });

  const [activeView, setActiveView] = useState<AppView>('jantri');
  const [gridMode, setGridMode] = useState<CalendarGridMode>('solar');
  const [solarSpanIndex, setSolarSpanIndex] = useState<number>(todaySolarIndex);
  const [viewYear, setViewYear] = useState<number>(todayYear);
  const [viewMonth0, setViewMonth0] = useState<number>(todayMonth1 - 1);
  const [selectedIso, setSelectedIso] = useState<string>(todayIso);
  const [drawerDay, setDrawerDay] = useState<JantriDay | null>(null);
  const [activeFilter, setActiveFilter] = useState<CalendarFilter>('all');
  const [isIcsOpen, setIsIcsOpen] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.lang = lang === 'pa' ? 'pa' : 'en';
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // Ignore storage errors
    }
  }, [lang]);

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'auto'});
  }, [activeView]);

  const todayRecord = useMemo(() => getJantriDay(todayIso, true), [todayIso]);
  const milestones = useMemo(() => getNextMilestones(todayIso), [todayIso]);
  const monthGrid = useMemo(
    () =>
      gridMode === 'solar'
        ? getSolarMonthCalendarGrid(solarSpanIndex)
        : getMonthCalendarGrid(viewYear, viewMonth0),
    [gridMode, solarSpanIndex, viewYear, viewMonth0],
  );

  const activeSolarMonthKey = useMemo(() => {
    if (gridMode === 'solar') {
      const span = BROWSEABLE_SOLAR_SPANS[solarSpanIndex];
      return getBikramiMonthMeta(span.monthId).key;
    }
    const midDay = monthGrid.find((d) => d.inCurrentGridMonth && d.gregorianDay === 15) ?? monthGrid[15];
    return midDay ? midDay.solar.monthMeta.key : todayRecord.solar.monthMeta.key;
  }, [gridMode, solarSpanIndex, monthGrid, todayRecord]);

  const handleSelectSolarSpan = (idx: number) => {
    const clamped = Math.max(0, Math.min(BROWSEABLE_SOLAR_SPANS.length - 1, idx));
    setSolarSpanIndex(clamped);
    const [sy, sm] = BROWSEABLE_SOLAR_SPANS[clamped].startDate.split('-').map(Number);
    setViewYear(sy);
    setViewMonth0(sm - 1);
  };

  const handlePrevMonth = () => {
    if (gridMode === 'solar') {
      if (solarSpanIndex > 0) handleSelectSolarSpan(solarSpanIndex - 1);
      return;
    }
    if (viewYear === SUPPORTED_MIN_MONTH.year && viewMonth0 <= SUPPORTED_MIN_MONTH.monthIndex0) {
      return;
    }
    if (viewMonth0 === 0) {
      setViewYear((y) => y - 1);
      setViewMonth0(11);
    } else {
      setViewMonth0((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (gridMode === 'solar') {
      if (solarSpanIndex < BROWSEABLE_SOLAR_SPANS.length - 1) {
        handleSelectSolarSpan(solarSpanIndex + 1);
      }
      return;
    }
    if (viewYear === SUPPORTED_MAX_MONTH.year && viewMonth0 >= SUPPORTED_MAX_MONTH.monthIndex0) {
      return;
    }
    if (viewMonth0 === 11) {
      setViewYear((y) => y + 1);
      setViewMonth0(0);
    } else {
      setViewMonth0((m) => m + 1);
    }
  };

  const handleGoToday = () => {
    setSolarSpanIndex(todaySolarIndex);
    setViewYear(todayYear);
    setViewMonth0(todayMonth1 - 1);
    setSelectedIso(todayIso);
  };

  const handleJumpSambat = (sambat: 2083 | 2084) => {
    if (sambat === 2083) {
      // Jump to Maghar 2083 (Nov 2026 — 557th Parkash Purab of Sri Guru Nanak Dev Ji)
      const magharIdx = BROWSEABLE_SOLAR_SPANS.findIndex(
        (s) => s.sambat === 2083 && s.monthId === 9,
      );
      setSolarSpanIndex(magharIdx >= 0 ? magharIdx : 0);
      setViewYear(2026);
      setViewMonth0(10);
    } else {
      // Jump to Chet 2084 (Sambat 2084 New Year)
      const chetIdx = BROWSEABLE_SOLAR_SPANS.findIndex(
        (s) => s.sambat === 2084 && s.monthId === 1,
      );
      setSolarSpanIndex(chetIdx >= 0 ? chetIdx : 0);
      setViewYear(2027);
      setViewMonth0(2);
    }
  };

  const handleSelectDay = (day: JantriDay) => {
    setSelectedIso(day.isoDate);
    setDrawerDay(day);
  };

  const handleJumpToDateAndOpen = (isoDate: string) => {
    const [y, m] = isoDate.split('-').map(Number);
    setSolarSpanIndex(getSolarMonthSpanIndexForDate(isoDate));
    setViewYear(y);
    setViewMonth0(m - 1);
    setSelectedIso(isoDate);
    setDrawerDay(getJantriDay(isoDate, true));
  };

  const handleJumpToGridDate = (isoDate: string) => {
    const [y, m] = isoDate.split('-').map(Number);
    setSolarSpanIndex(getSolarMonthSpanIndexForDate(isoDate));
    setViewYear(y);
    setViewMonth0(m - 1);
    setSelectedIso(isoDate);
    setActiveView('jantri');
  };

  const isPa = lang === 'pa';

  return (
    <div
      className={`min-h-screen flex flex-col parchment-surface text-[#1C1917] ${isPa ? 'lang-pa' : ''}`}
    >
      <Header
        activeView={activeView}
        onSelectView={setActiveView}
        lang={lang}
        onSelectLang={setLang}
      />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 lg:pb-12 space-y-8">
        {activeView === 'jantri' && (
          <>
            <TodayHero
              today={todayRecord}
              liveClock={liveClock}
              milestones={milestones}
              lang={lang}
              onJumpToDate={handleJumpToDateAndOpen}
            />

            <MonthlyJantriGrid
              gridMode={gridMode}
              solarSpanIndex={solarSpanIndex}
              year={viewYear}
              monthIndex0={viewMonth0}
              days={monthGrid}
              todayIso={todayIso}
              selectedIso={selectedIso}
              activeFilter={activeFilter}
              lang={lang}
              onChangeGridMode={setGridMode}
              onSelectSolarSpan={handleSelectSolarSpan}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              onGoToday={handleGoToday}
              onJumpSambat={handleJumpSambat}
              onSelectFilter={setActiveFilter}
              onSelectDay={handleSelectDay}
              onOpenIcsModal={() => setIsIcsOpen(true)}
              onOpenPrintView={() => setActiveView('print')}
            />

            <ShastarAsthaanCard monthKey={activeSolarMonthKey} lang={lang} />
          </>
        )}

        {activeView === 'events' && (
          <EventsDirectoryView
            todayIso={todayIso}
            lang={lang}
            onSelectDate={handleJumpToDateAndOpen}
            onJumpToGridDate={handleJumpToGridDate}
          />
        )}

        {activeView === 'sangrands' && (
          <SangrandsTableView lang={lang} onSelectDate={handleJumpToDateAndOpen} />
        )}

        {activeView === 'print' && (
          <PrintJantriView
            gridMode={gridMode}
            solarSpanIndex={solarSpanIndex}
            year={viewYear}
            monthIndex0={viewMonth0}
            days={monthGrid}
            lang={lang}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onBackToInteractive={() => setActiveView('jantri')}
          />
        )}
      </main>

      {/* Quiet Archival Institutional Footer */}
      <footer className="no-print border-t border-[#DDD2BE] bg-[#F3ECE0]/60 py-6 pb-24 lg:pb-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-[#57534E]">
          <div className="space-y-0.5">
            <p className="font-semibold text-[#1B263B]">
              {isPa
                ? 'ਤੱਤਖ਼ਾਲਸਾ ਫ਼ਾਊਂਡੇਸ਼ਨ · ਤੱਤਖ਼ਾਲਸਾ ਪੁਰਾਤਨ ਜੰਤਰੀ'
                : 'Tatkhalsa Foundation · Tatkhalsa Puratan Jantri'}
            </p>
            <p>
              {isPa
                ? 'ਪ੍ਰਮਾਣਿਕ ਚੰਦਰ-ਸੂਰਜੀ ਬਿਕ੍ਰਮੀ ਸੰਮਤ (੨੦੮੩–੨੦੮੪) · ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ (IST) ਅਨੁਸਾਰ · ਕੋਈ ਜੋਤਿਸ਼ ਜਾਂ ਰਾਸ਼ੀਫ਼ਲ ਨਹੀਂ।'
                : 'Authentic Luni-Solar Puratan Bikrami Chronology (Sambat 2083–2084) · Anchored to Sri Anandpur Sahib (IST) · Zero astrology or fixed Nanakshahi dates.'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <a
              href={POTHI_BARAH_MAHA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-[#1B263B] hover:text-[#9E4F00] hover:underline underline-offset-4"
            >
              <span>{isPa ? 'ਪੋਥੀ ਸਾਹਿਬ (ਬਾਰਹ ਮਾਹਾ)' : 'pothi.tatkhalsa.in'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setIsIcsOpen(true)}
              className="font-medium text-[#1C1917] hover:text-[#9E4F00] hover:underline underline-offset-4 cursor-pointer"
            >
              {isPa ? '.ics ਡਾਊਨਲੋਡ' : 'Export .ics'}
            </button>
          </div>
        </div>
      </footer>

      <EventColophonDrawer
        day={drawerDay}
        liveClock={liveClock}
        lang={lang}
        onClose={() => setDrawerDay(null)}
      />
      <IcsExportModal isOpen={isIcsOpen} lang={lang} onClose={() => setIsIcsOpen(false)} />
      <OfflineIndicator lang={lang} />
    </div>
  );
}
