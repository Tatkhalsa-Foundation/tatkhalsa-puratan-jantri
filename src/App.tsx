/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {ArrowUpRight, Check, Mail, MessageSquareText, Scale, X} from 'lucide-react';
import {lazy, Suspense, useEffect, useMemo, useRef, useState} from 'react';
import {Header, type AppView} from './components/Header';
import {MonthlyJantriGrid, type CalendarFilter} from './components/MonthlyJantriGrid';
import {PWAInstallButton} from './components/PWAInstallButton';
import {PurabReminderStrip} from './components/PurabReminderStrip';
import {TodayHero} from './components/TodayHero';
import {getBikramiMonthMeta, POTHI_BARAH_MAHA_URL} from './data/sambatData';
import type {
  CalendarGridMode,
  JantriDay,
  LanguageMode,
  PersonalDesiDate,
  ThemeId,
} from './data/types';
import {useLiveClock} from './hooks/useLiveClock';
import {
  getBikramiSolarDate,
  getJantriDay,
  getMonthCalendarGrid,
  getNextMilestones,
  getSolarMonthCalendarGridByYearMonth,
  getSolarMonthSpanByYearMonth,
  MAX_PERPETUAL_SAMBAT,
  MIN_PERPETUAL_SAMBAT,
  stepSolarYearMonth,
  SUPPORTED_MAX_MONTH,
  SUPPORTED_MIN_MONTH,
} from './utils/bikramiEngine';
import {
  getPersonalDatesForSolarDay,
  loadPersonalDates,
  savePersonalDates,
} from './utils/personalDates';
import {dispatchTomorrowPurabNotification, getTomorrowObservances} from './utils/purabReminders';
import {shareDailyJantri} from './utils/shareDailyJantri';
import {
  clearSessionNavigation,
  createDefaultPersistedState,
  loadPersistedState,
  saveLastActiveGregorianDate,
  savePersistedState,
  saveSessionNavigation,
  type DirectoryFilterState,
  type DirectorySambatState,
} from './utils/statePersistence';

// Lazy-load off-screen views and modals to minimize initial JS parse & Total Blocking Time
const EventsDirectoryView = lazy(() =>
  import('./components/EventsDirectoryView').then((m) => ({default: m.EventsDirectoryView})),
);
const SangrandsTableView = lazy(() =>
  import('./components/SangrandsTableView').then((m) => ({default: m.SangrandsTableView})),
);
const PrintJantriView = lazy(() =>
  import('./components/PrintJantriView').then((m) => ({default: m.PrintJantriView})),
);
const EventColophonDrawer = lazy(() =>
  import('./components/EventColophonDrawer').then((m) => ({default: m.EventColophonDrawer})),
);
const PersonalDatesDrawer = lazy(() =>
  import('./components/PersonalDatesDrawer').then((m) => ({default: m.PersonalDatesDrawer})),
);
const IcsExportModal = lazy(() =>
  import('./components/IcsExportModal').then((m) => ({default: m.IcsExportModal})),
);
const LicenseCreditsModal = lazy(() =>
  import('./components/LicenseCreditsModal').then((m) => ({default: m.LicenseCreditsModal})),
);
const FeedbackModal = lazy(() =>
  import('./components/FeedbackModal').then((m) => ({default: m.FeedbackModal})),
);

const THEME_META_COLOR: Record<ThemeId, string> = {
  parchment: '#FAF6EE',
  surmai: '#071524',
  kesri: '#FFFBF2',
};

function getInitialNotificationPermission(): NotificationPermission | 'unsupported' {
  if (typeof window === 'undefined' || typeof Notification === 'undefined') {
    return 'unsupported';
  }
  return Notification.permission;
}

const TabLoadingFallback = () => (
  <div
    role="status"
    aria-live="polite"
    className="min-h-[420px] rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] animate-pulse"
  />
);

export default function App() {
  const liveClock = useLiveClock();
  const todayIso = liveClock.effectiveTodayIso;
  const [todayYear, todayMonth1] = useMemo(() => todayIso.split('-').map(Number), [todayIso]);
  const todaySolar = useMemo(() => getBikramiSolarDate(todayIso), [todayIso]);

  const initialPersisted = useMemo(() => {
    const defaults = createDefaultPersistedState(
      todayIso,
      todaySolar.sambat,
      todaySolar.monthId,
      todayYear,
      todayMonth1 - 1,
    );
    return loadPersistedState(defaults);
    // Intentionally read persisted state once on initial mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [lang, setLang] = useState<LanguageMode>(initialPersisted.lang);
  const [theme, setTheme] = useState<ThemeId>(initialPersisted.theme);
  const [remindersEnabled, setRemindersEnabled] = useState<boolean>(
    initialPersisted.remindersEnabled,
  );
  const [activeView, setActiveView] = useState<AppView>(initialPersisted.activeView);
  const [gridMode, setGridMode] = useState<CalendarGridMode>(initialPersisted.gridMode);
  const [activeSambat, setActiveSambat] = useState<number>(initialPersisted.activeSambat);
  const [activeMonthId, setActiveMonthId] = useState<number>(initialPersisted.activeMonthId);
  const [viewYear, setViewYear] = useState<number>(initialPersisted.viewYear);
  const [viewMonth0, setViewMonth0] = useState<number>(initialPersisted.viewMonth0);
  const [selectedIso, setSelectedIso] = useState<string>(initialPersisted.selectedIso);
  const [drawerDateIso, setDrawerDateIso] = useState<string | null>(
    initialPersisted.drawerDateIso,
  );
  const [activeFilter, setActiveFilter] = useState<CalendarFilter>(initialPersisted.activeFilter);
  const [sangrandYear, setSangrandYear] = useState<number>(initialPersisted.sangrandYear);
  const [directoryQuery, setDirectoryQuery] = useState<string>(initialPersisted.directoryQuery);
  const [directoryCategory, setDirectoryCategory] = useState<DirectoryFilterState>(
    initialPersisted.directoryCategory,
  );
  const [directorySambat, setDirectorySambat] = useState<DirectorySambatState>(
    initialPersisted.directorySambat,
  );
  const [directoryUpcomingOnly, setDirectoryUpcomingOnly] = useState<boolean>(
    initialPersisted.directoryUpcomingOnly,
  );
  const [lookupInput, setLookupInput] = useState<string>(initialPersisted.lookupInput);
  const [isIcsOpen, setIsIcsOpen] = useState<boolean>(false);
  const [isLicenseOpen, setIsLicenseOpen] = useState<boolean>(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);

  // Personal Desi/Bikrami Family Dates (localStorage)
  const [personalDates, setPersonalDates] = useState<PersonalDesiDate[]>(() => loadPersonalDates());
  const [isPersonalDatesOpen, setIsPersonalDatesOpen] = useState<boolean>(false);
  const [personalDateDraft, setPersonalDateDraft] = useState<{
    monthId: number;
    day: number;
  } | null>(null);

  // Share toast & 1-day-before reminder status
  const [shareToast, setShareToast] = useState<string | null>(null);
  const shareToastTimerRef = useRef<number | null>(null);
  const prevTodayRef = useRef<string>(todayIso);
  const [notificationPermission, setNotificationPermission] = useState<
    NotificationPermission | 'unsupported'
  >(getInitialNotificationPermission);
  const [reminderFeedback, setReminderFeedback] = useState<string | null>(null);

  // Midnight rollover / daily auto-reset when the active Gregorian day changes
  useEffect(() => {
    if (prevTodayRef.current !== todayIso) {
      prevTodayRef.current = todayIso;
      setActiveSambat(todaySolar.sambat);
      setActiveMonthId(todaySolar.monthId);
      setViewYear(todayYear);
      setViewMonth0(todayMonth1 - 1);
      setSelectedIso(todayIso);
      setDrawerDateIso(null);
      setLookupInput(todayIso);
      setDirectorySambat(String(todaySolar.sambat));
      setSangrandYear(todaySolar.sambat);
      clearSessionNavigation();
      saveLastActiveGregorianDate(todayIso);
    }
  }, [todayIso, todaySolar.sambat, todaySolar.monthId, todayYear, todayMonth1]);

  useEffect(() => {
    document.documentElement.lang = lang === 'pa' ? 'pa' : 'en';
  }, [lang]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle('dark', theme === 'surmai');
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', THEME_META_COLOR[theme]);
    }
  }, [theme]);

  useEffect(() => {
    savePersistedState({
      activeView,
      lang,
      theme,
      remindersEnabled,
      gridMode,
      activeSambat,
      activeMonthId,
      viewYear,
      viewMonth0,
      selectedIso,
      drawerDateIso,
      activeFilter,
      sangrandYear,
      directoryQuery,
      directoryCategory,
      directorySambat,
      directoryUpcomingOnly,
      lookupInput,
    });
  }, [
    activeView,
    lang,
    theme,
    remindersEnabled,
    gridMode,
    activeSambat,
    activeMonthId,
    viewYear,
    viewMonth0,
    selectedIso,
    drawerDateIso,
    activeFilter,
    sangrandYear,
    directoryQuery,
    directoryCategory,
    directorySambat,
    directoryUpcomingOnly,
    lookupInput,
  ]);

  useEffect(() => {
    savePersonalDates(personalDates);
  }, [personalDates]);

  useEffect(() => {
    return () => {
      if (shareToastTimerRef.current !== null) {
        window.clearTimeout(shareToastTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'auto'});
  }, [activeView]);

  const todayRecord = useMemo(() => getJantriDay(todayIso, true), [todayIso]);
  const todayPersonalDates = useMemo(
    () =>
      getPersonalDatesForSolarDay(
        personalDates,
        todayRecord.solar.monthId,
        todayRecord.solar.day,
      ),
    [personalDates, todayRecord.solar.monthId, todayRecord.solar.day],
  );
  const tomorrowSummary = useMemo(
    () => getTomorrowObservances(todayIso, personalDates),
    [todayIso, personalDates],
  );

  // Check on app open and on midnight rollover if tomorrow has a Sangrand, Puranmashi, Masya, Gurpurab, or Personal Desi Date
  useEffect(() => {
    if (!remindersEnabled) return;
    if (!tomorrowSummary.hasReminderItems) return;
    dispatchTomorrowPurabNotification(tomorrowSummary, lang === 'pa');
  }, [remindersEnabled, tomorrowSummary, lang]);

  const milestones = useMemo(() => getNextMilestones(todayIso), [todayIso]);
  const drawerDay = useMemo(
    () => (drawerDateIso ? getJantriDay(drawerDateIso, true) : null),
    [drawerDateIso],
  );
  const monthGrid = useMemo(
    () =>
      gridMode === 'solar'
        ? getSolarMonthCalendarGridByYearMonth(activeSambat, activeMonthId)
        : getMonthCalendarGrid(viewYear, viewMonth0),
    [gridMode, activeSambat, activeMonthId, viewYear, viewMonth0],
  );

  const activeMonthMeta = getBikramiMonthMeta(activeMonthId);

  const showShareToast = (message: string) => {
    setShareToast(message);
    if (shareToastTimerRef.current !== null) {
      window.clearTimeout(shareToastTimerRef.current);
    }
    shareToastTimerRef.current = window.setTimeout(() => {
      setShareToast(null);
      shareToastTimerRef.current = null;
    }, 3400);
  };

  const handleShareToday = async () => {
    const outcome = await shareDailyJantri(todayRecord, todayPersonalDates);
    if (outcome === 'copied') {
      showShareToast(lang === 'pa' ? 'WhatsApp ਲਈ ਕਾਪੀ ਹੋ ਗਿਆ!' : 'Copied for WhatsApp!');
    } else if (outcome === 'shared') {
      showShareToast(lang === 'pa' ? 'ਅੱਜ ਦੀ ਜੰਤਰੀ ਸਾਂਝੀ ਕੀਤੀ ਗਈ!' : 'Shared today’s Jantri!');
    } else if (outcome === 'failed') {
      showShareToast(
        lang === 'pa' ? 'ਕਾਪੀ ਨਹੀਂ ਹੋ ਸਕਿਆ — ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।' : 'Could not copy — please try again.',
      );
    }
  };

  const handleToggleReminders = async () => {
    setReminderFeedback(null);
    if (remindersEnabled) {
      setRemindersEnabled(false);
      return;
    }

    if (typeof window === 'undefined' || typeof Notification === 'undefined') {
      setNotificationPermission('unsupported');
      setRemindersEnabled(true);
      setReminderFeedback(
        lang === 'pa'
          ? 'ਯਾਦ-ਦਹਾਨੀ ਚਾਲੂ — ਇਸ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਸਿਸਟਮ ਸੂਚਨਾ ਉਪਲਬਧ ਨਹੀਂ, ਪਰ ਕੱਲ੍ਹ ਦਾ ਪੁਰਬ ਇੱਥੇ ਦਿਖਾਈ ਦੇਵੇਗਾ।'
          : 'Reminders saved — browser notifications are unavailable here, so tomorrow’s Purab preview will show right below.',
      );
      return;
    }

    const currentPerm = Notification.permission;
    setNotificationPermission(currentPerm);

    if (currentPerm === 'granted') {
      setRemindersEnabled(true);
      dispatchTomorrowPurabNotification(tomorrowSummary, lang === 'pa');
      return;
    }

    if (currentPerm === 'denied') {
      setRemindersEnabled(false);
      setReminderFeedback(
        lang === 'pa'
          ? 'ਬ੍ਰਾਊਜ਼ਰ ਸੂਚਨਾਵਾਂ ਬੰਦ ਹਨ — ਕਿਰਪਾ ਕਰਕੇ ਬ੍ਰਾਊਜ਼ਰ ਸੈਟਿੰਗਾਂ ਵਿੱਚ Notifications ਦੀ ਇਜਾਜ਼ਤ ਦਿਓ।'
          : 'Notifications are blocked by your browser — allow Notifications in site settings to turn on alerts.',
      );
      return;
    }

    try {
      const requested = await Notification.requestPermission();
      setNotificationPermission(requested);
      if (requested === 'granted') {
        setRemindersEnabled(true);
        dispatchTomorrowPurabNotification(tomorrowSummary, lang === 'pa');
      } else if (requested === 'denied') {
        setRemindersEnabled(false);
        setReminderFeedback(
          lang === 'pa'
            ? 'ਸੂਚਨਾ ਦੀ ਇਜਾਜ਼ਤ ਨਹੀਂ ਮਿਲੀ — ਤੁਸੀਂ ਬ੍ਰਾਊਜ਼ਰ ਸੈਟਿੰਗਾਂ ਤੋਂ ਬਾਅਦ ਵਿੱਚ ਚਾਲੂ ਕਰ ਸਕਦੇ ਹੋ।'
            : 'Notification permission was declined — you can re-enable it anytime in browser settings.',
        );
      } else {
        setRemindersEnabled(false);
      }
    } catch {
      setRemindersEnabled(true);
    }
  };

  const handleAddPersonalDate = (entry: Omit<PersonalDesiDate, 'id' | 'createdAt'>) => {
    const id =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `pd-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const nextItem: PersonalDesiDate = {
      ...entry,
      id,
      createdAt: new Date().toISOString(),
    };
    setPersonalDates((prev) => [nextItem, ...prev]);
  };

  const handleDeletePersonalDate = (id: string) => {
    setPersonalDates((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOpenPersonalDatesForDay = (monthId: number, day: number) => {
    setPersonalDateDraft({monthId, day});
    setDrawerDateIso(null);
    setIsPersonalDatesOpen(true);
  };

  const handleSelectSolarMonth = (sambat: number, monthId: number) => {
    const clampedSambat = Math.max(MIN_PERPETUAL_SAMBAT, Math.min(MAX_PERPETUAL_SAMBAT, sambat));
    const clampedMonth = Math.max(1, Math.min(12, monthId));
    const span = getSolarMonthSpanByYearMonth(clampedSambat, clampedMonth);
    const [sy, sm] = span.startDate.split('-').map(Number);
    setActiveSambat(clampedSambat);
    setActiveMonthId(clampedMonth);
    setViewYear(sy);
    setViewMonth0(sm - 1);
    saveSessionNavigation({
      activeSambat: clampedSambat,
      activeMonthId: clampedMonth,
      viewYear: sy,
      viewMonth0: sm - 1,
    });
  };

  const handlePrevMonth = () => {
    if (gridMode === 'solar') {
      const prev = stepSolarYearMonth(activeSambat, activeMonthId, -1);
      handleSelectSolarMonth(prev.sambat, prev.monthId);
      return;
    }
    if (viewYear === SUPPORTED_MIN_MONTH.year && viewMonth0 <= SUPPORTED_MIN_MONTH.monthIndex0) {
      return;
    }
    const nextYear = viewMonth0 === 0 ? viewYear - 1 : viewYear;
    const nextMonth0 = viewMonth0 === 0 ? 11 : viewMonth0 - 1;
    setViewYear(nextYear);
    setViewMonth0(nextMonth0);
    saveSessionNavigation({
      activeSambat,
      activeMonthId,
      viewYear: nextYear,
      viewMonth0: nextMonth0,
    });
  };

  const handleNextMonth = () => {
    if (gridMode === 'solar') {
      const next = stepSolarYearMonth(activeSambat, activeMonthId, 1);
      handleSelectSolarMonth(next.sambat, next.monthId);
      return;
    }
    if (viewYear === SUPPORTED_MAX_MONTH.year && viewMonth0 >= SUPPORTED_MAX_MONTH.monthIndex0) {
      return;
    }
    const nextYear = viewMonth0 === 11 ? viewYear + 1 : viewYear;
    const nextMonth0 = viewMonth0 === 11 ? 0 : viewMonth0 + 1;
    setViewYear(nextYear);
    setViewMonth0(nextMonth0);
    saveSessionNavigation({
      activeSambat,
      activeMonthId,
      viewYear: nextYear,
      viewMonth0: nextMonth0,
    });
  };

  const handleGoToday = () => {
    setActiveSambat(todaySolar.sambat);
    setActiveMonthId(todaySolar.monthId);
    setViewYear(todayYear);
    setViewMonth0(todayMonth1 - 1);
    setSelectedIso(todayIso);
    clearSessionNavigation();
  };

  const handleJumpSambat = (sambat: number) => {
    handleSelectSolarMonth(sambat, 1);
  };

  const handleSelectDay = (day: JantriDay) => {
    setSelectedIso(day.isoDate);
    setDrawerDateIso(day.isoDate);
  };

  const handleJumpToDateAndOpen = (isoDate: string) => {
    const [y, m] = isoDate.split('-').map(Number);
    const solar = getBikramiSolarDate(isoDate);
    setActiveSambat(solar.sambat);
    setActiveMonthId(solar.monthId);
    setViewYear(y);
    setViewMonth0(m - 1);
    setSelectedIso(isoDate);
    setDrawerDateIso(isoDate);
    saveSessionNavigation({
      activeSambat: solar.sambat,
      activeMonthId: solar.monthId,
      viewYear: y,
      viewMonth0: m - 1,
    });
  };

  const handleJumpToGridDate = (isoDate: string) => {
    const [y, m] = isoDate.split('-').map(Number);
    const solar = getBikramiSolarDate(isoDate);
    setActiveSambat(solar.sambat);
    setActiveMonthId(solar.monthId);
    setViewYear(y);
    setViewMonth0(m - 1);
    setSelectedIso(isoDate);
    setActiveView('jantri');
    saveSessionNavigation({
      activeSambat: solar.sambat,
      activeMonthId: solar.monthId,
      viewYear: y,
      viewMonth0: m - 1,
    });
  };

  const isPa = lang === 'pa';

  return (
    <div
      className={`min-h-screen flex flex-col parchment-surface text-[var(--text-primary)] ${isPa ? 'lang-pa' : ''}`}
    >
      <Header
        activeView={activeView}
        onSelectView={setActiveView}
        lang={lang}
        onSelectLang={setLang}
        theme={theme}
        onSelectTheme={setTheme}
      />

      <main className="flex-1 mx-auto w-full max-w-7xl px-3.5 sm:px-6 lg:px-8 py-4 sm:py-6 pb-24 lg:pb-12 space-y-5 sm:space-y-6">
        {activeView === 'jantri' && (
          <>
            <TodayHero
              today={todayRecord}
              todayPersonalDates={todayPersonalDates}
              liveClock={liveClock}
              milestones={milestones}
              lang={lang}
              onJumpToDate={handleJumpToDateAndOpen}
              onShareToday={handleShareToday}
            />

            <MonthlyJantriGrid
              gridMode={gridMode}
              activeSambat={activeSambat}
              activeMonthId={activeMonthId}
              year={viewYear}
              monthIndex0={viewMonth0}
              days={monthGrid}
              todayIso={todayIso}
              selectedIso={selectedIso}
              activeFilter={activeFilter}
              personalDates={personalDates}
              lang={lang}
              onChangeGridMode={setGridMode}
              onSelectSolarMonth={handleSelectSolarMonth}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              onGoToday={handleGoToday}
              onJumpSambat={handleJumpSambat}
              onSelectFilter={setActiveFilter}
              onSelectDay={handleSelectDay}
              onOpenIcsModal={() => setIsIcsOpen(true)}
              onOpenPersonalDates={() => {
                setPersonalDateDraft({
                  monthId: todayRecord.solar.monthId,
                  day: todayRecord.solar.day,
                });
                setIsPersonalDatesOpen(true);
              }}
              onOpenPrintView={() => setActiveView('print')}
            />

            <PurabReminderStrip
              lang={lang}
              enabled={remindersEnabled}
              permissionStatus={notificationPermission}
              statusFeedback={reminderFeedback}
              tomorrowSummary={tomorrowSummary}
              onToggleReminders={handleToggleReminders}
              onInspectTomorrow={handleJumpToDateAndOpen}
            />
          </>
        )}

        {activeView === 'events' && (
          <Suspense fallback={<TabLoadingFallback />}>
            <EventsDirectoryView
              todayIso={todayIso}
              lang={lang}
              query={directoryQuery}
              onQueryChange={setDirectoryQuery}
              category={directoryCategory}
              onCategoryChange={setDirectoryCategory}
              sambat={directorySambat}
              onSambatChange={setDirectorySambat}
              upcomingOnly={directoryUpcomingOnly}
              onUpcomingOnlyChange={setDirectoryUpcomingOnly}
              lookupInput={lookupInput}
              onLookupInputChange={setLookupInput}
              onSelectDate={handleJumpToDateAndOpen}
              onJumpToGridDate={handleJumpToGridDate}
            />
          </Suspense>
        )}

        {activeView === 'sangrands' && (
          <Suspense fallback={<TabLoadingFallback />}>
            <SangrandsTableView
              lang={lang}
              selectedSambat={sangrandYear}
              onSelectSambat={setSangrandYear}
              onSelectDate={handleJumpToDateAndOpen}
            />
          </Suspense>
        )}

        {activeView === 'print' && (
          <Suspense fallback={<TabLoadingFallback />}>
            <PrintJantriView
              gridMode={gridMode}
              activeSambat={activeSambat}
              activeMonthId={activeMonthId}
              year={viewYear}
              monthIndex0={viewMonth0}
              days={monthGrid}
              personalDates={personalDates}
              lang={lang}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              onBackToInteractive={() => setActiveView('jantri')}
            />
          </Suspense>
        )}
      </main>

      {/* Quiet Archival Institutional Footer */}
      <footer className="no-print border-t border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] py-6 pb-24 lg:pb-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-[var(--text-muted)]">
          <div className="space-y-0.5">
            <p className="font-semibold text-[var(--text-heading)]">
              <a
                href="https://tatkhalsa.in"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-tatkhalsa-link"
                className="inline-flex items-center gap-0.5 hover:text-[var(--accent-primary-text)] hover:underline underline-offset-4"
              >
                <span>{isPa ? 'ਤੱਤਖ਼ਾਲਸਾ ਫ਼ਾਊਂਡੇਸ਼ਨ' : 'Tatkhalsa Foundation'}</span>
                <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
              </a>
              <span aria-hidden="true"> · </span>
              <span>{isPa ? 'ਤੱਤਖ਼ਾਲਸਾ ਪੁਰਾਤਨ ਜੰਤਰੀ' : 'Tat Khalsa Puratan Jantri'}</span>
            </p>
            <p>
              {isPa
                ? 'ਪ੍ਰਮਾਣਿਕ ਚੰਦਰ-ਸੂਰਜੀ ਬਿਕ੍ਰਮੀ ਸੰਮਤ (੨੦੮੨–੨੦੮੪ ਪ੍ਰਮਾਣਿਤ ਅਤੇ ਸਦੀਵੀ ਇੰਜਣ) · ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ (IST) ਅਨੁਸਾਰ।'
                : 'Authentic Luni-Solar Puratan Bikrami Chronology (Sambat 2082–2084 Verified & Perpetual Engine) · Anchored to Sri Anandpur Sahib (IST).'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 shrink-0">
            <PWAInstallButton lang={lang} variant="footer" />
            <button
              type="button"
              data-testid="open-feedback-btn"
              onClick={() => setIsFeedbackOpen(true)}
              className="inline-flex items-center gap-1.5 font-medium text-[var(--text-heading)] hover:text-[var(--accent-primary-text)] hover:underline underline-offset-4 cursor-pointer"
            >
              <MessageSquareText className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{isPa ? 'ਸੁਝਾਅ / ਸੁਧਾਰ' : 'Feedback'}</span>
            </button>
            <a
              href="mailto:info@tatkhalsa.in"
              data-testid="footer-email-link"
              className="inline-flex items-center gap-1 font-medium text-[var(--text-primary)] hover:text-[var(--accent-primary-text)] hover:underline underline-offset-4"
            >
              <Mail className="w-3.5 h-3.5" aria-hidden="true" />
              <span>info@tatkhalsa.in</span>
            </a>
            <button
              type="button"
              data-testid="license-credits-btn"
              onClick={() => setIsLicenseOpen(true)}
              className="inline-flex items-center gap-1.5 font-medium text-[var(--text-heading)] hover:text-[var(--accent-primary-text)] hover:underline underline-offset-4 cursor-pointer"
            >
              <Scale className="w-3.5 h-3.5" aria-hidden="true" />
              <span>
                {isPa
                  ? 'ਲਾਇਸੈਂਸ ਅਤੇ ਸਰੋਤ'
                  : 'License & Credits'}
              </span>
            </button>
            <a
              href="https://github.com/Tatkhalsa-Foundation/tatkhalsa-puratan-jantri"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-[var(--text-primary)] hover:text-[var(--accent-primary-text)] hover:underline underline-offset-4"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
            <a
              href={POTHI_BARAH_MAHA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-[var(--text-heading)] hover:text-[var(--accent-primary-text)] hover:underline underline-offset-4"
            >
              <span>{isPa ? 'ਪੋਥੀ ਸਾਹਿਬ' : 'pothi.tatkhalsa.in'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setIsIcsOpen(true)}
              className="font-medium text-[var(--text-primary)] hover:text-[var(--accent-primary-text)] hover:underline underline-offset-4 cursor-pointer"
            >
              {isPa ? '.ics / ਸਿੰਕ' : 'Export .ics'}
            </button>
          </div>
        </div>
      </footer>

      {/* 1-Tap Share Confirmation Toast */}
      {shareToast && (
        <div
          role="status"
          aria-live="polite"
          data-testid="share-toast"
          className="no-print fixed bottom-20 lg:bottom-5 right-4 z-50 flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--accent-navy)] text-[var(--accent-on-navy)] px-3.5 py-2.5 text-xs font-medium shadow-xl"
        >
          <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{shareToast}</span>
          <button
            type="button"
            onClick={() => setShareToast(null)}
            aria-label={isPa ? 'ਸੂਚਨਾ ਬੰਦ ਕਰੋ' : 'Dismiss share notification'}
            className="ml-1 inline-flex h-6 w-6 items-center justify-center rounded-sm opacity-80 hover:opacity-100 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Lazily Mounted Modals & Drawers — Zero startup overhead when closed */}
      {drawerDay && (
        <Suspense fallback={null}>
          <EventColophonDrawer
            day={drawerDay}
            personalDates={personalDates}
            liveClock={liveClock}
            lang={lang}
            onAddPersonalDateForDay={handleOpenPersonalDatesForDay}
            onClose={() => setDrawerDateIso(null)}
          />
        </Suspense>
      )}

      {isPersonalDatesOpen && (
        <Suspense fallback={null}>
          <PersonalDatesDrawer
            isOpen={isPersonalDatesOpen}
            lang={lang}
            todayIso={todayIso}
            initialMonthId={personalDateDraft?.monthId ?? todayRecord.solar.monthId}
            initialDay={personalDateDraft?.day ?? todayRecord.solar.day}
            personalDates={personalDates}
            onAddPersonalDate={handleAddPersonalDate}
            onDeletePersonalDate={handleDeletePersonalDate}
            onJumpToDate={handleJumpToGridDate}
            onOpenIcsModal={() => setIsIcsOpen(true)}
            onClose={() => setIsPersonalDatesOpen(false)}
          />
        </Suspense>
      )}

      {isIcsOpen && (
        <Suspense fallback={null}>
          <IcsExportModal
            isOpen={isIcsOpen}
            lang={lang}
            personalDates={personalDates}
            onClose={() => setIsIcsOpen(false)}
          />
        </Suspense>
      )}

      {isLicenseOpen && (
        <Suspense fallback={null}>
          <LicenseCreditsModal
            isOpen={isLicenseOpen}
            lang={lang}
            onClose={() => setIsLicenseOpen(false)}
          />
        </Suspense>
      )}

      {isFeedbackOpen && (
        <Suspense fallback={null}>
          <FeedbackModal
            isOpen={isFeedbackOpen}
            lang={lang}
            activeDateIso={selectedIso}
            activeSambat={activeSambat}
            activeMonthNameEn={activeMonthMeta.nameEn}
            activeMonthNamePa={activeMonthMeta.namePa}
            onClose={() => setIsFeedbackOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
}
