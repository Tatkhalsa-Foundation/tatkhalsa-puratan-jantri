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
import {TodayHero} from './components/TodayHero';
import {POTHI_BASE_URL} from './data/sambatData';
import type {JantriDay, LanguageMode} from './data/types';
import {
  getEffectiveTodayIso,
  getJantriDay,
  getMonthCalendarGrid,
  getNextMilestones,
  SUPPORTED_MAX_MONTH,
  SUPPORTED_MIN_MONTH,
} from './utils/bikramiEngine';

const LANG_STORAGE_KEY = 'tatkhalsa_jantri_lang';

export default function App() {
  const todayIso = useMemo(() => getEffectiveTodayIso(), []);
  const [todayYear, todayMonth1] = useMemo(() => todayIso.split('-').map(Number), [todayIso]);

  const [lang, setLang] = useState<LanguageMode>(() => {
    try {
      const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'pa' || saved === 'en') return saved;
    } catch {
      // Ignore storage access restrictions
    }
    return 'en';
  });

  const [activeView, setActiveView] = useState<AppView>('jantri');
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

  const todayRecord = useMemo(() => getJantriDay(todayIso, true), [todayIso]);
  const milestones = useMemo(() => getNextMilestones(todayIso), [todayIso]);
  const monthGrid = useMemo(
    () => getMonthCalendarGrid(viewYear, viewMonth0),
    [viewYear, viewMonth0],
  );

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'pa' : 'en'));
  };

  const handlePrevMonth = () => {
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
    setViewYear(todayYear);
    setViewMonth0(todayMonth1 - 1);
    setSelectedIso(todayIso);
  };

  const handleJumpMonth = (year: number, monthIndex0: number) => {
    setViewYear(year);
    setViewMonth0(monthIndex0);
  };

  const handleSelectDay = (day: JantriDay) => {
    setSelectedIso(day.isoDate);
    setDrawerDay(day);
  };

  const handleJumpToDateAndOpen = (isoDate: string) => {
    const [y, m] = isoDate.split('-').map(Number);
    setViewYear(y);
    setViewMonth0(m - 1);
    setSelectedIso(isoDate);
    setDrawerDay(getJantriDay(isoDate, true));
  };

  const isPa = lang === 'pa';

  return (
    <div className={`min-h-screen flex flex-col parchment-surface text-[#1C1917] ${isPa ? 'lang-pa' : ''}`}>
      <Header
        activeView={activeView}
        onSelectView={setActiveView}
        lang={lang}
        onToggleLang={handleToggleLang}
      />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 lg:pb-12 space-y-8">
        {activeView === 'jantri' && (
          <>
            <TodayHero
              today={todayRecord}
              milestones={milestones}
              lang={lang}
              onJumpToDate={handleJumpToDateAndOpen}
            />

            <MonthlyJantriGrid
              year={viewYear}
              monthIndex0={viewMonth0}
              days={monthGrid}
              todayIso={todayIso}
              selectedIso={selectedIso}
              activeFilter={activeFilter}
              lang={lang}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              onGoToday={handleGoToday}
              onJumpMonth={handleJumpMonth}
              onSelectFilter={setActiveFilter}
              onSelectDay={handleSelectDay}
              onOpenIcsModal={() => setIsIcsOpen(true)}
              onOpenPrintView={() => setActiveView('print')}
            />
          </>
        )}

        {activeView === 'events' && (
          <EventsDirectoryView lang={lang} onSelectDate={handleJumpToDateAndOpen} />
        )}

        {activeView === 'sangrands' && (
          <SangrandsTableView lang={lang} onSelectDate={handleJumpToDateAndOpen} />
        )}

        {activeView === 'print' && (
          <PrintJantriView
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
      <footer className="no-print border-t border-[#DDD3C0] bg-[#F3ECE0]/60 py-6 pb-24 lg:pb-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-[#57534E]">
          <div className="space-y-0.5">
            <p className="font-semibold text-[#1C1917]">
              {isPa
                ? 'ਤੱਤਖ਼ਾਲਸਾ ਫ਼ਾਊਂਡੇਸ਼ਨ · ਤੱਤਖ਼ਾਲਸਾ ਪੁਰਾਤਨ ਜੰਤਰੀ'
                : 'Tatkhalsa Foundation · Tatkhalsa Puratan Jantri'}
            </p>
            <p>
              {isPa
                ? 'ਪ੍ਰਮਾਣਿਕ ਚੰਦਰ-ਸੂਰਜੀ ਬਿਕ੍ਰਮੀ ਸੰਮਤ (੨੦੮੩–੨੦੮੪) · ਸ੍ਰੀ ਅੰਮ੍ਰਿਤਸਰ ਸਾਹਿਬ (IST) ਅਨੁਸਾਰ · ਕੋਈ ਜੋਤਿਸ਼ ਜਾਂ ਰਾਸ਼ੀਫ਼ਲ ਨਹੀਂ।'
                : 'Authentic Luni-Solar Puratan Bikrami Chronology (Sambat 2083–2084) · Anchored to Sri Amritsar Sahib (IST) · Zero astrology or fixed Nanakshahi dates.'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <a
              href={POTHI_BASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-[#1E3A8A] hover:underline underline-offset-4"
            >
              <span>{isPa ? 'ਪੋਥੀ ਸਾਹਿਬ (ਬਾਰਹ ਮਾਹਾ)' : 'pothi.tatkhalsa.in'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setIsIcsOpen(true)}
              className="font-medium text-[#1C1917] hover:text-[#1E3A8A] hover:underline underline-offset-4 cursor-pointer"
            >
              {isPa ? '.ics ਡਾਊਨਲੋਡ' : 'Export .ics'}
            </button>
          </div>
        </div>
      </footer>

      <EventColophonDrawer day={drawerDay} lang={lang} onClose={() => setDrawerDay(null)} />
      <IcsExportModal isOpen={isIcsOpen} lang={lang} onClose={() => setIsIcsOpen(false)} />
      <OfflineIndicator lang={lang} />
    </div>
  );
}
