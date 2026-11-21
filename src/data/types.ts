export type LanguageMode = 'en' | 'pa';

export type LunarPaksh = 'Sudhi' | 'Vadhi';

export type EventCategory = 'gurpurab' | 'shaheedi' | 'khalsa' | 'sangrand' | 'lunar';

export interface BilingualText {
  en: string;
  pa: string;
  translit?: string;
}

export interface BikramiMonthMeta {
  id: number; // 1 = Chet ... 12 = Phagun
  key:
    | 'chet'
    | 'vaisakh'
    | 'jeth'
    | 'harh'
    | 'sawan'
    | 'bhadon'
    | 'assu'
    | 'katak'
    | 'maghar'
    | 'poh'
    | 'magh'
    | 'phagun';
  nameEn: string;
  namePa: string;
  seasonEn: string;
  seasonPa: string;
  barahMahaRefEn: string;
  barahMahaRefPa: string;
  barahMahaOpeningPa: string;
  barahMahaOpeningTranslit: string;
  pothiUrl: string;
}

export interface SolarMonthSpan {
  sambat: number;
  monthId: number; // 1..12
  startDate: string; // YYYY-MM-DD (Sangrand Udaya date in Sri Amritsar Sahib)
  endDate: string; // YYYY-MM-DD (inclusive)
  days: number;
  sankrantiUtc: string; // ISO-8601 UTC timestamp of true sidereal solar ingress
}

export interface ColophonCitation {
  sourceEn: string;
  sourcePa: string;
  referenceEn: string;
  referencePa: string;
  excerptPa?: string;
  excerptTranslit?: string;
}

export interface HistoricalEvent {
  id: string;
  date: string; // YYYY-MM-DD
  sambat: number;
  category: Exclude<EventCategory, 'sangrand' | 'lunar'>;
  titleEn: string;
  titlePa: string;
  shortLabelEn: string;
  shortLabelPa: string;
  tithiRuleEn: string;
  tithiRulePa: string;
  summaryEn: string;
  summaryPa: string;
  historicalContextEn: string;
  historicalContextPa: string;
  citations: ColophonCitation[];
  featured?: boolean;
}

export interface LunarInfo {
  tithiNumber: number; // 1..30 (1..15 = Sudhi, 16..30 = Vadhi)
  paksh: LunarPaksh;
  pakshPa: string;
  pakshDay: number; // 1..15
  tithiNameEn: string;
  tithiNamePa: string;
  shortTithiEn: string;
  shortTithiPa: string;
  lunarMonthId: number; // 1..12 (Purnimanta Punjabi lunar month)
  lunarMonthEn: string;
  lunarMonthPa: string;
  isPuranmashi: boolean;
  isMasya: boolean;
  isIkadashi: boolean;
  isPanchmi: boolean;
  isSpecialLunar: boolean;
  elongationDeg: number; // 0..360
  illumination: number; // 0..1
  tithiEndsAtUtc: string; // ISO UTC timestamp when current tithi transitions
  amritsarSunriseUtc: string; // ISO UTC sunrise at Sri Amritsar Sahib
}

export interface BikramiSolarDate {
  sambat: number;
  monthId: number;
  monthMeta: BikramiMonthMeta;
  day: number; // 1..32
  totalDaysInMonth: number;
  isSangrand: boolean;
  sankrantiUtc: string;
}

export interface JantriDay {
  isoDate: string; // YYYY-MM-DD
  gregorianYear: number;
  gregorianMonth: number; // 1..12
  gregorianDay: number; // 1..31
  weekdayIndex: number; // 0 = Sun ... 6 = Sat
  inCurrentGridMonth: boolean;
  solar: BikramiSolarDate;
  lunar: LunarInfo;
  events: HistoricalEvent[];
}

export interface UpcomingMilestone {
  kind: 'sangrand' | 'puranmashi' | 'masya';
  isoDate: string;
  daysRemaining: number;
  titleEn: string;
  titlePa: string;
  bikramiLabelEn: string;
  bikramiLabelPa: string;
  transitionUtc: string;
}

export interface DualTimeDisplay {
  amritsarTime: string;
  amritsarDate: string;
  localTime: string;
  localDate: string;
  localTimeZoneName: string;
  isSameZone: boolean;
}

export interface IcsExportOptions {
  includeSangrands: boolean;
  includePuranmashi: boolean;
  includeMasya: boolean;
  includeGurpurabs: boolean;
  includeShaheedi: boolean;
  includeKhalsa: boolean;
  sambatScope: 'all' | '2083' | '2084';
  language: LanguageMode;
}
