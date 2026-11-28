import type {AppView} from '../components/Header';
import type {CalendarFilter} from '../components/MonthlyJantriGrid';
import type {CalendarGridMode, DirectoryFilterKey, LanguageMode, ThemeId} from '../data/types';
import {
  LOOKUP_MAX_ISO,
  LOOKUP_MIN_ISO,
  MAX_PERPETUAL_SAMBAT,
  MIN_PERPETUAL_SAMBAT,
  SUPPORTED_MAX_MONTH,
  SUPPORTED_MIN_MONTH,
} from './bikramiEngine';

export const APP_STATE_STORAGE_KEY = 'tatkhalsa_jantri_state_v1';
export const SESSION_NAV_STORAGE_KEY = 'tatkhalsa_jantri_session_nav_v1';
export const LEGACY_LANG_STORAGE_KEY = 'tatkhalsa_jantri_lang';
export const THEME_STORAGE_KEY = 'tatkhalsa_jantri_theme';
export const LAST_ACTIVE_DATE_KEY = 'tatkhalsa_jantri_last_active_date_v1';

export interface SessionMonthNavigation {
  activeSambat: number;
  activeMonthId: number;
  viewYear: number;
  viewMonth0: number;
}

export type DirectoryFilterState = DirectoryFilterKey;
export type DirectorySambatState = 'all' | string;

export interface PersistedJantriState {
  activeView: AppView;
  lang: LanguageMode;
  theme: ThemeId;
  remindersEnabled: boolean;
  gridMode: CalendarGridMode;
  activeSambat: number;
  activeMonthId: number;
  viewYear: number;
  viewMonth0: number;
  selectedIso: string;
  drawerDateIso: string | null;
  activeFilter: CalendarFilter;
  sangrandYear: number;
  directoryQuery: string;
  directoryCategory: DirectoryFilterState;
  directorySambat: DirectorySambatState;
  directoryUpcomingOnly: boolean;
  lookupInput: string;
}

const PERSISTABLE_VIEWS: readonly AppView[] = ['jantri', 'events', 'sangrands'];
const VALID_LANGS: readonly LanguageMode[] = ['en', 'pa', 'bi'];
const VALID_THEMES: readonly ThemeId[] = ['parchment', 'surmai', 'kesri'];
const VALID_GRID_MODES: readonly CalendarGridMode[] = ['solar', 'gregorian'];
const VALID_CALENDAR_FILTERS: readonly CalendarFilter[] = [
  'all',
  'gurpurab',
  'shaheedi',
  'khalsa',
  'barsi',
  'lunar',
];
const VALID_DIRECTORY_CATEGORIES: readonly DirectoryFilterState[] = [
  'all',
  'gurpurab',
  'guru-ghar',
  'bhagat-bhatt',
  'gursikh',
  'shaheedi',
  'barsi',
  'sangrand-tithi',
];

function isValidIsoInRange(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  return value >= LOOKUP_MIN_ISO && value <= LOOKUP_MAX_ISO;
}

function isValidSambat(value: unknown): value is number {
  return (
    typeof value === 'number' &&
    Number.isInteger(value) &&
    value >= MIN_PERPETUAL_SAMBAT &&
    value <= MAX_PERPETUAL_SAMBAT
  );
}

function isValidDirectorySambat(value: unknown): value is DirectorySambatState {
  if (value === 'all') return true;
  if (typeof value !== 'string' || !/^\d{4}$/.test(value)) return false;
  const n = Number(value);
  return n >= MIN_PERPETUAL_SAMBAT && n <= MAX_PERPETUAL_SAMBAT;
}

function isValidMonthYear(year: unknown, month0: unknown): boolean {
  if (typeof year !== 'number' || typeof month0 !== 'number') return false;
  if (!Number.isInteger(year) || !Number.isInteger(month0)) return false;
  if (month0 < 0 || month0 > 11) return false;
  const minVal = SUPPORTED_MIN_MONTH.year * 12 + SUPPORTED_MIN_MONTH.monthIndex0;
  const maxVal = SUPPORTED_MAX_MONTH.year * 12 + SUPPORTED_MAX_MONTH.monthIndex0;
  const curVal = year * 12 + month0;
  return curVal >= minVal && curVal <= maxVal;
}

export function createDefaultPersistedState(
  todayIso: string,
  todaySambat: number,
  todayMonthId: number,
  todayYear: number,
  todayMonth0: number,
): PersistedJantriState {
  return {
    activeView: 'jantri',
    lang: 'en',
    theme: 'parchment',
    remindersEnabled: false,
    gridMode: 'solar',
    activeSambat: todaySambat,
    activeMonthId: todayMonthId,
    viewYear: todayYear,
    viewMonth0: todayMonth0,
    selectedIso: todayIso,
    drawerDateIso: null,
    activeFilter: 'all',
    sangrandYear: todaySambat,
    directoryQuery: '',
    directoryCategory: 'all',
    directorySambat: String(todaySambat),
    directoryUpcomingOnly: false,
    lookupInput: todayIso,
  };
}

/**
 * Pure, safe deserializer that merges valid fields from storage with defaults.
 * Daily Auto-Reset: when `lastActiveDateRaw` does not match `defaults.selectedIso` (a new calendar day!),
 * resets active date, active month, drawer, lookup input, and Purabs Sambat back to TODAY
 * while preserving user preferences (language, theme, grid mode, reminders).
 */
export function parsePersistedState(
  raw: string | null,
  defaults: PersistedJantriState,
  legacyLangRaw?: string | null,
  standaloneThemeRaw?: string | null,
  sessionNavRaw?: string | null,
  lastActiveDateRaw?: string | null,
): PersistedJantriState {
  const result: PersistedJantriState = {...defaults};
  const isNewCalendarDay = Boolean(lastActiveDateRaw && lastActiveDateRaw !== defaults.selectedIso);

  if (legacyLangRaw && (VALID_LANGS as readonly string[]).includes(legacyLangRaw)) {
    result.lang = legacyLangRaw as LanguageMode;
  }
  if (standaloneThemeRaw && (VALID_THEMES as readonly string[]).includes(standaloneThemeRaw)) {
    result.theme = standaloneThemeRaw as ThemeId;
  }

  if (raw) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = null;
    }

    if (parsed && typeof parsed === 'object') {
      const obj = parsed as Record<string, unknown>;

      if (
        typeof obj.activeView === 'string' &&
        (PERSISTABLE_VIEWS as readonly string[]).includes(obj.activeView)
      ) {
        result.activeView = obj.activeView as AppView;
      } else {
        result.activeView = 'jantri';
      }

      if (typeof obj.lang === 'string' && (VALID_LANGS as readonly string[]).includes(obj.lang)) {
        result.lang = obj.lang as LanguageMode;
      }
      if (typeof obj.theme === 'string' && (VALID_THEMES as readonly string[]).includes(obj.theme)) {
        result.theme = obj.theme as ThemeId;
      }
      if (typeof obj.remindersEnabled === 'boolean') {
        result.remindersEnabled = obj.remindersEnabled;
      }
      if (
        typeof obj.gridMode === 'string' &&
        (VALID_GRID_MODES as readonly string[]).includes(obj.gridMode)
      ) {
        result.gridMode = obj.gridMode as CalendarGridMode;
      }
      if (
        typeof obj.activeFilter === 'string' &&
        (VALID_CALENDAR_FILTERS as readonly string[]).includes(obj.activeFilter)
      ) {
        result.activeFilter = obj.activeFilter as CalendarFilter;
      }
      if (typeof obj.directoryQuery === 'string') {
        result.directoryQuery = obj.directoryQuery.slice(0, 120);
      }
      if (typeof obj.directoryCategory === 'string') {
        if ((VALID_DIRECTORY_CATEGORIES as readonly string[]).includes(obj.directoryCategory)) {
          result.directoryCategory = obj.directoryCategory as DirectoryFilterState;
        } else if (
          obj.directoryCategory === 'sangrand' ||
          obj.directoryCategory === 'puranmashi' ||
          obj.directoryCategory === 'masya'
        ) {
          result.directoryCategory = 'sangrand-tithi';
        } else if (obj.directoryCategory === 'khalsa') {
          result.directoryCategory = 'gursikh';
        }
      }
      if (typeof obj.directoryUpcomingOnly === 'boolean') {
        result.directoryUpcomingOnly = obj.directoryUpcomingOnly;
      }

      // Only restore date-specific selections when still on the same calendar day
      if (!isNewCalendarDay) {
        if (isValidIsoInRange(obj.selectedIso)) {
          result.selectedIso = obj.selectedIso;
        }
        if (obj.drawerDateIso === null) {
          result.drawerDateIso = null;
        } else if (isValidIsoInRange(obj.drawerDateIso)) {
          result.drawerDateIso = obj.drawerDateIso;
        }
        if (isValidSambat(obj.sangrandYear)) {
          result.sangrandYear = obj.sangrandYear;
        }
        if (isValidDirectorySambat(obj.directorySambat)) {
          result.directorySambat = obj.directorySambat;
        }
        if (isValidIsoInRange(obj.lookupInput)) {
          result.lookupInput = obj.lookupInput;
        }
      }
    }
  }

  // Only restore non-default month navigation when on the same calendar day in the current session
  if (!isNewCalendarDay && sessionNavRaw) {
    try {
      const navParsed = JSON.parse(sessionNavRaw) as Record<string, unknown>;
      if (
        navParsed &&
        typeof navParsed === 'object' &&
        isValidSambat(navParsed.activeSambat) &&
        typeof navParsed.activeMonthId === 'number' &&
        Number.isInteger(navParsed.activeMonthId) &&
        navParsed.activeMonthId >= 1 &&
        navParsed.activeMonthId <= 12
      ) {
        result.activeSambat = navParsed.activeSambat;
        result.activeMonthId = navParsed.activeMonthId;
      }
      if (
        navParsed &&
        typeof navParsed === 'object' &&
        isValidMonthYear(navParsed.viewYear, navParsed.viewMonth0)
      ) {
        result.viewYear = navParsed.viewYear as number;
        result.viewMonth0 = navParsed.viewMonth0 as number;
      }
    } catch {
      // Ignore invalid session navigation JSON and retain today's defaults
    }
  }

  return result;
}

export function loadPersistedState(defaults: PersistedJantriState): PersistedJantriState {
  if (typeof window === 'undefined') return defaults;
  try {
    const raw = window.localStorage.getItem(APP_STATE_STORAGE_KEY);
    const legacyLang = window.localStorage.getItem(LEGACY_LANG_STORAGE_KEY);
    const standaloneTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const sessionNav = window.sessionStorage.getItem(SESSION_NAV_STORAGE_KEY);
    const lastActiveDate = window.localStorage.getItem(LAST_ACTIVE_DATE_KEY);
    const parsed = parsePersistedState(
      raw,
      defaults,
      legacyLang,
      standaloneTheme,
      sessionNav,
      lastActiveDate,
    );
    // Record today's Gregorian date as the active date and clear stale session nav on day rollover
    if (lastActiveDate && lastActiveDate !== defaults.selectedIso) {
      window.sessionStorage.removeItem(SESSION_NAV_STORAGE_KEY);
    }
    window.localStorage.setItem(LAST_ACTIVE_DATE_KEY, defaults.selectedIso);
    return parsed;
  } catch {
    return defaults;
  }
}

export function savePersistedState(state: PersistedJantriState): void {
  if (typeof window === 'undefined') return;
  try {
    const safeState: PersistedJantriState = {
      ...state,
      activeView: state.activeView === 'print' ? 'jantri' : state.activeView,
    };
    window.localStorage.setItem(APP_STATE_STORAGE_KEY, JSON.stringify(safeState));
    window.localStorage.setItem(LEGACY_LANG_STORAGE_KEY, safeState.lang);
    window.localStorage.setItem(THEME_STORAGE_KEY, safeState.theme);
  } catch {
    // Ignore storage quota or private-browsing restrictions
  }
}

export function saveLastActiveGregorianDate(todayIso: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LAST_ACTIVE_DATE_KEY, todayIso);
  } catch {
    // Ignore storage restrictions
  }
}

export function saveSessionNavigation(nav: SessionMonthNavigation): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(SESSION_NAV_STORAGE_KEY, JSON.stringify(nav));
  } catch {
    // Ignore storage quota or private-browsing restrictions
  }
}

export function clearSessionNavigation(): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.removeItem(SESSION_NAV_STORAGE_KEY);
  } catch {
    // Ignore storage restrictions
  }
}
