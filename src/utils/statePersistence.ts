import type {AppView} from '../components/Header';
import type {CalendarFilter} from '../components/MonthlyJantriGrid';
import type {CalendarGridMode, DirectoryFilterKey, LanguageMode, ThemeId} from '../data/types';
import {
  BROWSEABLE_SOLAR_SPANS,
  LOOKUP_MAX_ISO,
  LOOKUP_MIN_ISO,
  SUPPORTED_MAX_MONTH,
  SUPPORTED_MIN_MONTH,
} from './bikramiEngine';

export const APP_STATE_STORAGE_KEY = 'tatkhalsa_jantri_state_v1';
export const LEGACY_LANG_STORAGE_KEY = 'tatkhalsa_jantri_lang';
export const THEME_STORAGE_KEY = 'tatkhalsa_jantri_theme';

export type DirectoryFilterState = DirectoryFilterKey;
export type DirectorySambatState = 'all' | '2082' | '2083' | '2084';

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
  lookupInput: string;
}

const VALID_VIEWS: readonly AppView[] = ['jantri', 'events', 'sangrands', 'print'];
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
    directorySambat: 'all',
    directoryUpcomingOnly: false,
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
): PersistedJantriState {
  const result: PersistedJantriState = {...defaults};

  if (legacyLangRaw && (VALID_LANGS as readonly string[]).includes(legacyLangRaw)) {
    result.lang = legacyLangRaw as LanguageMode;
  }
  if (standaloneThemeRaw && (VALID_THEMES as readonly string[]).includes(standaloneThemeRaw)) {
    result.theme = standaloneThemeRaw as ThemeId;
  }

  if (!raw) return result;

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return result;
  }

  if (!parsed || typeof parsed !== 'object') return result;
  const obj = parsed as Record<string, unknown>;

  if (typeof obj.activeView === 'string' && (VALID_VIEWS as readonly string[]).includes(obj.activeView)) {
    result.activeView = obj.activeView as AppView;
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
    typeof obj.solarSpanIndex === 'number' &&
    Number.isInteger(obj.solarSpanIndex) &&
    obj.solarSpanIndex >= 0 &&
    obj.solarSpanIndex < BROWSEABLE_SOLAR_SPANS.length
  ) {
    result.solarSpanIndex = obj.solarSpanIndex;
  }
  if (isValidMonthYear(obj.viewYear, obj.viewMonth0)) {
    result.viewYear = obj.viewYear as number;
    result.viewMonth0 = obj.viewMonth0 as number;
  }
  if (isValidIsoInRange(obj.selectedIso)) {
    result.selectedIso = obj.selectedIso;
  }
  if (obj.drawerDateIso === null) {
    result.drawerDateIso = null;
  } else if (isValidIsoInRange(obj.drawerDateIso)) {
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
    (VALID_DIRECTORY_SAMBATS as readonly string[]).includes(obj.directorySambat)
  ) {
    result.directorySambat = obj.directorySambat as DirectorySambatState;
  }
  if (typeof obj.directoryUpcomingOnly === 'boolean') {
    result.directoryUpcomingOnly = obj.directoryUpcomingOnly;
  }
  if (isValidIsoInRange(obj.lookupInput)) {
    result.lookupInput = obj.lookupInput;
  }

  return result;
}

export function loadPersistedState(defaults: PersistedJantriState): PersistedJantriState {
  if (typeof window === 'undefined') return defaults;
  try {
    const raw = window.localStorage.getItem(APP_STATE_STORAGE_KEY);
    const legacyLang = window.localStorage.getItem(LEGACY_LANG_STORAGE_KEY);
    const standaloneTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return parsePersistedState(raw, defaults, legacyLang, standaloneTheme);
  } catch {
    return defaults;
  }
}

export function savePersistedState(state: PersistedJantriState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(APP_STATE_STORAGE_KEY, JSON.stringify(state));
    window.localStorage.setItem(LEGACY_LANG_STORAGE_KEY, state.lang);
    window.localStorage.setItem(THEME_STORAGE_KEY, state.theme);
  } catch {
    // Ignore storage quota or private-browsing restrictions
  }
}
