import type {AppView} from '../components/Header';
import type {CalendarFilter} from '../components/MonthlyJantriGrid';
import type {CalendarGridMode, DirectoryFilterKey, LanguageMode, ThemeId} from '../data/types';
import {
  BROWSEABLE_SOLAR_SPANS,
  getBikramiSolarDate,
  LOOKUP_MAX_ISO,
  LOOKUP_MIN_ISO,
  SUPPORTED_MAX_MONTH,
  SUPPORTED_MIN_MONTH,
} from './bikramiEngine';

export const APP_STATE_STORAGE_KEY = 'tatkhalsa_jantri_state_v1';
export const SESSION_NAV_STORAGE_KEY = 'tatkhalsa_jantri_session_nav_v1';
export const LEGACY_LANG_STORAGE_KEY = 'tatkhalsa_jantri_lang';
export const THEME_STORAGE_KEY = 'tatkhalsa_jantri_theme';

export interface SessionMonthNavigation {
  solarSpanIndex: number;
  viewYear: number;
  viewMonth0: number;
}

export type DirectoryFilterState = DirectoryFilterKey;
export type DirectorySambatState = 'all' | '2082' | '2083' | '2084' | (string & {});

export interface PersistedJantriState {
  activeView: AppView;
  lang: LanguageMode;
  theme: ThemeId;
  remindersEnabled: boolean;
  gridMode: CalendarGridMode;
  solarSpanIndex: number;
  viewYear: number;
  viewMonth0: number;
  selectedIso: string;
  drawerDateIso: string | null;
  activeFilter: CalendarFilter;
  sangrandYear: 2082 | 2083 | 2084;
  directoryQuery: string;
  directoryCategory: DirectoryFilterState;
  directorySambat: DirectorySambatState;
  directoryUpcomingOnly: boolean;
  lastActiveGregorianDate: string;
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
const VALID_DIRECTORY_SAMBATS: readonly DirectorySambatState[] = ['all', '2082', '2083', '2084'];

function isValidIsoInRange(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  return value >= LOOKUP_MIN_ISO && value <= LOOKUP_MAX_ISO;
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
  todaySolarIndex: number,
  todayYear: number,
  todayMonth0: number,
): PersistedJantriState {
  return {
    activeView: 'jantri',
    lang: 'en',
    theme: 'parchment',
    remindersEnabled: false,
    gridMode: 'solar',
    solarSpanIndex: todaySolarIndex,
    viewYear: todayYear,
    viewMonth0: todayMonth0,
    selectedIso: todayIso,
    drawerDateIso: null,
    activeFilter: 'all',
    sangrandYear: 2083,
    directoryQuery: '',
    directoryCategory: 'all',
    directorySambat: String(getBikramiSolarDate(todayIso).sambat),
    directoryUpcomingOnly: false,
    lastActiveGregorianDate: todayIso,
    lookupInput: todayIso,
  };
}

/**
 * Pure, safe deserializer that merges any valid fields from raw JSON storage
 * with safe defaults, guarding against corrupt JSON or out-of-range values.
 */
export function parsePersistedState(
  raw: string | null,
  defaults: PersistedJantriState,
  legacyLangRaw?: string | null,
  standaloneThemeRaw?: string | null,
  sessionNavRaw?: string | null,
): PersistedJantriState {
  const result: PersistedJantriState = {...defaults};

  if (legacyLangRaw && (VALID_LANGS as readonly string[]).includes(legacyLangRaw)) {
    result.lang = legacyLangRaw as LanguageMode;
  }
  if (standaloneThemeRaw && (VALID_THEMES as readonly string[]).includes(standaloneThemeRaw)) {
    result.theme = standaloneThemeRaw as ThemeId;
  }

  let isSameDay = false;
  if (raw) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = null;
    }

    if (parsed && typeof parsed === 'object') {
      const obj = parsed as Record<string, unknown>;
    isSameDay = obj.lastActiveGregorianDate === defaults.selectedIso;
      
      // Never restore 'print' across reloads; default back to 'jantri'
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
      if (isSameDay && isValidIsoInRange(obj.selectedIso)) {
        result.selectedIso = obj.selectedIso;
      }
      if (isSameDay && obj.drawerDateIso === null) {
        result.drawerDateIso = null;
      } else if (isSameDay && isValidIsoInRange(obj.drawerDateIso)) {
        result.drawerDateIso = obj.drawerDateIso;
      }
      if (
        typeof obj.activeFilter === 'string' &&
        (VALID_CALENDAR_FILTERS as readonly string[]).includes(obj.activeFilter)
      ) {
        result.activeFilter = obj.activeFilter as CalendarFilter;
      }
      if (obj.sangrandYear === 2082 || obj.sangrandYear === 2083 || obj.sangrandYear === 2084) {
        result.sangrandYear = obj.sangrandYear;
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
      if (
        typeof obj.directorySambat === 'string' &&
        ((VALID_DIRECTORY_SAMBATS as readonly string[]).includes(obj.directorySambat) || /^\d{4}$/.test(obj.directorySambat) || obj.directorySambat === 'all')
      ) {
        result.directorySambat = obj.directorySambat as DirectorySambatState;
      }
      if (typeof obj.directoryUpcomingOnly === 'boolean') {
        result.directoryUpcomingOnly = obj.directoryUpcomingOnly;
      }
      if (isSameDay && isValidIsoInRange(obj.lookupInput)) {
        result.lookupInput = obj.lookupInput;
      }
    }
  }

  // Only restore non-default month navigation when explicitly set in the current browser session
  if (isSameDay && sessionNavRaw) {
    try {
      const navParsed = JSON.parse(sessionNavRaw) as Record<string, unknown>;
      if (
        navParsed &&
        typeof navParsed === 'object' &&
        typeof navParsed.solarSpanIndex === 'number' &&
        Number.isInteger(navParsed.solarSpanIndex) &&
        navParsed.solarSpanIndex >= 0 &&
        navParsed.solarSpanIndex < BROWSEABLE_SOLAR_SPANS.length
      ) {
        result.solarSpanIndex = navParsed.solarSpanIndex;
      }
      if (navParsed && typeof navParsed === 'object' && isValidMonthYear(navParsed.viewYear, navParsed.viewMonth0)) {
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
    return parsePersistedState(raw, defaults, legacyLang, standaloneTheme, sessionNav);
  } catch {
    return defaults;
  }
}

export function savePersistedState(state: PersistedJantriState): void {
  if (typeof window === 'undefined') return;
  try {
    const safeState: PersistedJantriState = {
      ...state,
      // Never persist 'print' view across reloads
      activeView: state.activeView === 'print' ? 'jantri' : state.activeView,
    };
    window.localStorage.setItem(APP_STATE_STORAGE_KEY, JSON.stringify(safeState));
    window.localStorage.setItem(LEGACY_LANG_STORAGE_KEY, safeState.lang);
    window.localStorage.setItem(THEME_STORAGE_KEY, safeState.theme);
  } catch {
    // Ignore storage quota or private-browsing restrictions
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
