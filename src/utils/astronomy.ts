import {getBikramiMonthMeta, TITHI_NAMES} from '../data/sambatData';
import type {LunarInfo, LunarPaksh} from '../data/types';

/**
 * Pure, framework-agnostic luni-solar astronomy module (Meeus truncated VSOP87 / ELP-2000).
 * Zero DOM/window dependencies — reusable directly in React Native / Capacitor.
 * Anchored to Sri Anandpur Sahib (31.2359° N, 76.4988° E, IST UTC+05:30).
 */

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;
const ANANDPUR_SAHIB_LAT = 31.2359;
const ANANDPUR_SAHIB_LON = 76.4988;

function normalizeDeg(deg: number): number {
  const m = deg % 360;
  return m < 0 ? m + 360 : m;
}

/** Convert UTC Unix milliseconds to Julian Ephemeris Day (JDE). */
export function msToJulianDay(utcMs: number): number {
  return utcMs / 86400000 + 2440587.5;
}

/** Convert Julian Day back to UTC Unix milliseconds. */
export function julianDayToMs(jd: number): number {
  return Math.round((jd - 2440587.5) * 86400000);
}

/** Apparent geocentric solar ecliptic longitude in degrees (0..360), accurate to ~0.01°. */
export function getSunLongitudeDeg(jd: number): number {
  const T = (jd - 2451545.0) / 36525.0;
  const L0 = normalizeDeg(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
  const M = normalizeDeg(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
  const Mrad = M * DEG2RAD;
  const C =
    (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mrad) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad) +
    0.000289 * Math.sin(3 * Mrad);
  const trueLong = L0 + C;
  const omega = (125.04 - 1934.136 * T) * DEG2RAD;
  const apparentLong = trueLong - 0.00569 - 0.00478 * Math.sin(omega);
  return normalizeDeg(apparentLong);
}

/** Geocentric lunar ecliptic longitude in degrees (0..360) using major ELP-2000 terms (~0.02° accuracy). */
export function getMoonLongitudeDeg(jd: number): number {
  const T = (jd - 2451545.0) / 36525.0;
  const T2 = T * T;
  const T3 = T2 * T;
  const T4 = T3 * T;

  const Lp = normalizeDeg(218.3164477 + 481267.88123421 * T - 0.0015786 * T2 + T3 / 538841 - T4 / 65194000);
  const D = normalizeDeg(297.8501921 + 445267.1114034 * T - 0.0018819 * T2 + T3 / 545868 - T4 / 113065000);
  const M = normalizeDeg(357.5291092 + 35999.0502909 * T - 0.0001536 * T2 + T3 / 24490000);
  const Mp = normalizeDeg(134.9633964 + 477198.8675055 * T + 0.0087414 * T2 + T3 / 69699 - T4 / 14712000);
  const F = normalizeDeg(93.272095 + 483202.0175233 * T - 0.0036539 * T2 - T3 / 3526000 + T4 / 863310000);

  const E = 1 - 0.002516 * T - 0.0000074 * T2;
  const Dr = D * DEG2RAD;
  const Mr = M * DEG2RAD;
  const Mpr = Mp * DEG2RAD;
  const Fr = F * DEG2RAD;

  // Principal Meeus Table 47.A periodic terms (in 0.000001 deg)
  let sumL = 0;
  sumL += 6288774 * Math.sin(Mpr);
  sumL += 1274027 * Math.sin(2 * Dr - Mpr);
  sumL += 658314 * Math.sin(2 * Dr);
  sumL += 213618 * Math.sin(2 * Mpr);
  sumL += -185116 * E * Math.sin(Mr);
  sumL += -114332 * Math.sin(2 * Fr);
  sumL += 58793 * Math.sin(2 * Dr - 2 * Mpr);
  sumL += 57066 * E * Math.sin(2 * Dr - Mr - Mpr);
  sumL += 53322 * Math.sin(2 * Dr + Mpr);
  sumL += 45758 * E * Math.sin(2 * Dr - Mr);
  sumL += -40923 * E * Math.sin(Mr - Mpr);
  sumL += -34720 * Math.sin(Dr);
  sumL += -30383 * E * Math.sin(Mr + Mpr);
  sumL += 15327 * Math.sin(2 * Dr - 2 * Fr);
  sumL += -12528 * Math.sin(Mpr + 2 * Fr);
  sumL += 10980 * Math.sin(Mpr - 2 * Fr);
  sumL += 10675 * Math.sin(4 * Dr - Mpr);
  sumL += 10034 * Math.sin(3 * Mpr);
  sumL += 8548 * Math.sin(4 * Dr - 2 * Mpr);
  sumL += -7888 * E * Math.sin(2 * Dr + Mr - Mpr);
  sumL += -6766 * E * Math.sin(2 * Dr + Mr);
  sumL += -5163 * Math.sin(Dr - Mpr);
  sumL += 4987 * E * Math.sin(Dr + Mr);
  sumL += 4036 * E * Math.sin(2 * Dr - Mr + Mpr);
  sumL += 3994 * Math.sin(2 * Dr + 2 * Mpr);
  sumL += 3861 * Math.sin(4 * Dr);
  sumL += 3665 * Math.sin(2 * Dr - 3 * Mpr);
  sumL += -2689 * E * Math.sin(Mr - 2 * Mpr);
  sumL += -2602 * Math.sin(2 * Dr - Mpr + 2 * Fr);
  sumL += 2390 * E * Math.sin(2 * Dr - Mr - 2 * Mpr);
  sumL += -2348 * Math.sin(Dr + Mpr);
  sumL += 2236 * E * E * Math.sin(2 * Dr - 2 * Mr);
  sumL += -2120 * E * Math.sin(Mr + 2 * Mpr);
  sumL += -2069 * E * E * Math.sin(2 * Mr);
  sumL += 2048 * E * E * Math.sin(2 * Dr - 2 * Mr - Mpr);
  sumL += -1773 * Math.sin(2 * Dr + Mpr - 2 * Fr);
  sumL += -1595 * Math.sin(2 * Dr + 2 * Fr);
  sumL += 1215 * E * Math.sin(4 * Dr - Mr - Mpr);
  sumL += -1110 * Math.sin(2 * Mpr + 2 * Fr);

  // Small additive nutation/Venus/Jupiter terms
  const A1 = normalizeDeg(119.75 + 131.849 * T) * DEG2RAD;
  const A2 = normalizeDeg(53.09 + 479264.29 * T) * DEG2RAD;
  sumL += 3958 * Math.sin(A1) + 1962 * Math.sin(Lp * DEG2RAD - Fr) + 318 * Math.sin(A2);

  return normalizeDeg(Lp + sumL / 1000000);
}

/** Moon–Sun ecliptic elongation in degrees [0, 360). 0° = New Moon (Masya), 180° = Full Moon (Puranmashi). */
export function getMoonSunElongationDeg(jd: number): number {
  const moon = getMoonLongitudeDeg(jd);
  const sun = getSunLongitudeDeg(jd);
  return normalizeDeg(moon - sun);
}

/** Approximate Lahiri ayanamsa (degrees) for sidereal solar zodiac (rashi) indexing. */
export function getLahiriAyanamsaDeg(jd: number): number {
  const yearsSince2000 = (jd - 2451545.0) / 365.2425;
  return 23.853 + yearsSince2000 * (50.29 / 3600);
}

/** Compute sunrise UTC timestamp (ms) at Sri Anandpur Sahib for YYYY-MM-DD using NOAA solar equation. */
export function getAnandpurSahibSunriseUtcMs(isoDate: string): number {
  const [y, m, d] = isoDate.split('-').map(Number);
  const noonUtc = Date.UTC(y, m - 1, d, 6, 30, 0); // approx local solar noon in Sri Anandpur Sahib (~12:00 IST)
  const jd = msToJulianDay(noonUtc);
  const T = (jd - 2451545.0) / 36525.0;

  const L0 = normalizeDeg(280.46646 + T * (36000.76983 + T * 0.0003032));
  const M = normalizeDeg(357.52911 + T * (35999.05029 - 0.0001537 * T));
  const e = 0.016708634 - T * (0.000042037 + 0.0000001267 * T);
  const Mrad = M * DEG2RAD;
  const C =
    Math.sin(Mrad) * (1.914602 - T * (0.004817 + 0.000014 * T)) +
    Math.sin(2 * Mrad) * (0.019993 - 0.000101 * T) +
    Math.sin(3 * Mrad) * 0.000289;
  const trueLong = L0 + C;
  const omega = 125.04 - 1934.136 * T;
  const appLong = trueLong - 0.00569 - 0.00478 * Math.sin(omega * DEG2RAD);
  const meanObliq = 23 + (26 + (21.448 - T * (46.815 + T * (0.00059 - T * 0.001813))) / 60) / 60;
  const obliqCorr = meanObliq + 0.00256 * Math.cos(omega * DEG2RAD);
  const declRad = Math.asin(Math.sin(obliqCorr * DEG2RAD) * Math.sin(appLong * DEG2RAD));

  const varY = Math.pow(Math.tan((obliqCorr / 2) * DEG2RAD), 2);
  const eqOfTimeMin =
    4 *
    RAD2DEG *
    (varY * Math.sin(2 * L0 * DEG2RAD) -
      2 * e * Math.sin(Mrad) +
      4 * e * varY * Math.sin(Mrad) * Math.cos(2 * L0 * DEG2RAD) -
      0.5 * varY * varY * Math.sin(4 * L0 * DEG2RAD) -
      1.25 * e * e * Math.sin(2 * Mrad));

  const latRad = ANANDPUR_SAHIB_LAT * DEG2RAD;
  const zenithRad = 90.833 * DEG2RAD;
  const cosHa = Math.cos(zenithRad) / (Math.cos(latRad) * Math.cos(declRad)) - Math.tan(latRad) * Math.tan(declRad);
  const clampedCosHa = Math.max(-1, Math.min(1, cosHa));
  const haDeg = Math.acos(clampedCosHa) * RAD2DEG;

  const sunriseMinutesUtc = 720 - 4 * (ANANDPUR_SAHIB_LON + haDeg) - eqOfTimeMin;
  return Date.UTC(y, m - 1, d, 0, 0, 0) + Math.round(sunriseMinutesUtc * 60000);
}
export const getAmritsarSunriseUtcMs = getAnandpurSahibSunriseUtcMs;
export function getSiderealSunLongitudeDeg(jd: number): number {
    return normalizeDeg(getSunLongitudeDeg(jd) - getLahiriAyanamsaDeg(jd));
}
export function getUdayaSangrandIsoFromSankranti(sankrantiUtcMs: number): string {
const IST_OFFSET_MS = 5.5 * 3600 * 1000;
const MS_PER_DAY = 86400000;
const istDate = new Date(sankrantiUtcMs + IST_OFFSET_MS);
const istDateIso = istDate.toISOString().slice(0, 10);
if (sankrantiUtcMs > getAnandpurSahibSunriseUtcMs(istDateIso)) {
return new Date(istDate.getTime() + MS_PER_DAY).toISOString().slice(0, 10);
}
return istDateIso;
}

/** Find UTC ms when elongation next reaches targetDeg (mod 360) after startMs. */
export function findNextElongationCrossingUtcMs(startMs: number, targetDeg: number): number {
  const normTarget = normalizeDeg(targetDeg);
  const startJd = msToJulianDay(startMs);
  const startElong = getMoonSunElongationDeg(startJd);
  let diff = normalizeDeg(normTarget - startElong);
  if (diff < 0.0001) {
    diff = 0.0001;
  }
  // Synodic rate ~12.1907°/day
  let estJd = startJd + diff / 12.19075;
  // Bracket within ±0.8 day and refine via secant/Newton steps
  for (let i = 0; i < 8; i++) {
    const cur = getMoonSunElongationDeg(estJd);
    let err = normTarget - cur;
    if (err > 180) err -= 360;
    if (err < -180) err += 360;
    if (Math.abs(err) < 0.0002) break;
    // Local numerical derivative (deg/day)
    const dt = 0.01;
    const next = getMoonSunElongationDeg(estJd + dt);
    let rate = next - cur;
    if (rate < -180) rate += 360;
    if (rate > 180) rate -= 360;
    rate /= dt;
    estJd += err / rate;
  }
  return julianDayToMs(estJd);
}

/**
 * Determine the Purnimanta Punjabi Lunar Month ID (1 = Chet ... 12 = Phagun).
 * In the Punjabi Purnimanta tradition, a lunar month ends on Puranmashi (180° elongation)
 * and begins the next day (Vadhi 1). Its name matches the solar month containing the New Moon
 * (or equivalently, the solar rashi at the New Moon + 1 in Punjabi naming where Mesha = Vaisakh = 2).
 *
 * Specifically:
 * - At New Moon when sidereal Sun is in Tula (180°-210°): Katak (8).
 *   Example: Nov 9, 2026 New Moon -> Sun sidereal ~203° (Tula) -> Katak lunar month!
 *   Its Puranmashi is Nov 24, 2026 -> Katak Puranmashi!
 *   Then Vadhi 1 (Nov 25, 2026) begins Maghar (9) lunar month -> Dec 9, 2026 is Maghar Masya -> Dec 14 is Maghar Sudhi 5!
 */
function resolvePurnimantaLunarMonthId(sunriseJd: number, elongationDeg: number): number {
  // Find the New Moon belonging to this Purnimanta lunar month:
  // If we are in Sudhi (0..180°), New Moon was in the past (elongation / 12.19 days ago).
  // If we are in Vadhi (180..360°), New Moon is ahead ((360 - elongation) / 12.19 days ahead).
  let approxNewMoonJd: number;
  if (elongationDeg < 180) {
    approxNewMoonJd = sunriseJd - elongationDeg / 12.19075;
  } else {
    approxNewMoonJd = sunriseJd + (360 - elongationDeg) / 12.19075;
  }
  // Refine to exact New Moon (0° elongation)
  for (let i = 0; i < 4; i++) {
    const e = getMoonSunElongationDeg(approxNewMoonJd);
    let err = e;
    if (err > 180) err -= 360;
    approxNewMoonJd -= err / 12.19075;
  }
  const sunTropical = getSunLongitudeDeg(approxNewMoonJd);
  const ayanamsa = getLahiriAyanamsaDeg(approxNewMoonJd);
  const sunSidereal = normalizeDeg(sunTropical - ayanamsa);
  // Sidereal rashi index 0 = Mesha (0-30°, Vaisakh = monthId 2), ..., 6 = Tula (180-210°, Katak = monthId 8), ..., 11 = Meena (330-360°, Chet = monthId 1)
  const rashiIndex = Math.floor(sunSidereal / 30); // 0..11
  const monthId = ((rashiIndex + 1) % 12) + 1; // 0->2 (Vaisakh), 6->8 (Katak), 11->1 (Chet)
  return monthId;
}

/**
 * Compute authentic Puratan lunar tithi & Paksh for an ISO date (YYYY-MM-DD)
 * evaluated at Sri Anandpur Sahib sunrise (Udaya Tithi), with traditional Jantri
 * handling for Kshaya (short) and Vriddhi (spanning two sunrises) Puranmashi/Masya.
 */
export function computeLunarInfoForDate(isoDate: string): LunarInfo {
  const sunriseMs = getAnandpurSahibSunriseUtcMs(isoDate);
  const sunriseJd = msToJulianDay(sunriseMs);
  const elongationDeg = getMoonSunElongationDeg(sunriseJd);

  const nextDayDate = new Date(`${isoDate}T00:00:00Z`);
  nextDayDate.setUTCDate(nextDayDate.getUTCDate() + 1);
  const nextIso = nextDayDate.toISOString().slice(0, 10);
  const nextSunriseMs = getAnandpurSahibSunriseUtcMs(nextIso);
  const nextSunriseJd = msToJulianDay(nextSunriseMs);
  const nextElongationDeg = getMoonSunElongationDeg(nextSunriseJd);

  const rawTithiIndex = Math.floor(elongationDeg / 12); // 0..29
  let tithiNumber = rawTithiIndex + 1; // 1..30

  // Check if exact Full Moon (180°) occurs between this sunrise and next sunrise (catches Kshaya Puranmashi)
  const crossesFullMoonToday =
    elongationDeg < 180 && (nextElongationDeg >= 180 || nextElongationDeg < elongationDeg);
  // Check if exact New Moon (360°/0°) occurs between this sunrise and next sunrise (catches Kshaya Masya)
  const crossesNewMoonToday =
    elongationDeg > 180 && nextElongationDeg < 180;

  if (tithiNumber === 14 && crossesFullMoonToday) {
    // Kshaya Puranmashi: Sudhi 15 begins after sunrise and Full Moon occurs before next sunrise
    tithiNumber = 15;
  } else if (tithiNumber === 29 && crossesNewMoonToday) {
    // Kshaya Masya: Vadhi 15 begins after sunrise and New Moon occurs before next sunrise
    tithiNumber = 30;
  }

  // Deduplicate Vriddhi Puranmashi / Masya (if tithi 15 spans two sunrises, honor the day whose span contains exact 180°/360°)
  const isPuranmashi = tithiNumber === 15 && crossesFullMoonToday;
  const isMasya = tithiNumber === 30 && crossesNewMoonToday;

  // If sunrise is in 15 but exact Full Moon is after next sunrise, treat today's label as Sudhi 14/15 approaching Puranmashi
  const isSudhi = tithiNumber <= 15;
  const paksh: LunarPaksh = isSudhi ? 'Sudhi' : 'Vadhi';
  const pakshPa = isSudhi ? 'ਸੁਦੀ' : 'ਵਦੀ';
  const pakshDay = isSudhi ? tithiNumber : tithiNumber - 15; // 1..15

  const isEkadashi = pakshDay === 11;
  const isAshtami = pakshDay === 8;
  const isPanchmi = pakshDay === 5;
  const isSpecialLunar = isPuranmashi || isMasya || isEkadashi || isAshtami || isPanchmi;

  const tithiMeta = TITHI_NAMES[pakshDay - 1];
  let tithiNameEn = tithiMeta.en;
  let tithiNamePa = tithiMeta.pa;
  let shortTithiEn = `${paksh} ${pakshDay}`;
  let shortTithiPa = `${pakshPa} ${tithiMeta.shortPa.split(' ')[0]}`;

  if (isPuranmashi) {
    tithiNameEn = 'Puranmashi';
    tithiNamePa = 'ਪੂਰਨਮਾਸ਼ੀ';
    shortTithiEn = 'Puranmashi';
    shortTithiPa = 'ਪੂਰਨਮਾਸ਼ੀ';
  } else if (isMasya) {
    tithiNameEn = 'Masya';
    tithiNamePa = 'ਮੱਸਿਆ';
    shortTithiEn = 'Masya';
    shortTithiPa = 'ਮੱਸਿਆ';
  } else if (tithiNumber === 15) {
    tithiNameEn = 'Chaudas / Puranmashi Aarambh';
    tithiNamePa = 'ਚੌਦਸ / ਪੂਰਨਮਾਸ਼ੀ ਆਰੰਭ';
    shortTithiEn = 'Sudhi 14–15';
    shortTithiPa = 'ਸੁਦੀ ੧੪-੧੫';
  } else if (tithiNumber === 30) {
    tithiNameEn = 'Chaudas / Masya Aarambh';
    tithiNamePa = 'ਚੌਦਸ / ਮੱਸਿਆ ਆਰੰਭ';
    shortTithiEn = 'Vadhi 14–15';
    shortTithiPa = 'ਵਦੀ ੧੪-੧੫';
  } else if (isEkadashi) {
    shortTithiEn = `${paksh} 11 · Ekadashi`;
    shortTithiPa = `${pakshPa} ੧੧ · ਇਕਾਦਸ਼ੀ`;
  } else if (isAshtami) {
    shortTithiEn = `${paksh} 8 · Ashtami`;
    shortTithiPa = `${pakshPa} ੮ · ਅਸ਼ਟਮੀ`;
  } else if (isPanchmi) {
    shortTithiEn = `${paksh} 5 · Panchmi`;
    shortTithiPa = `${pakshPa} ੫ · ਪੰਚਮੀ`;
  }

  const lunarMonthId = resolvePurnimantaLunarMonthId(sunriseJd, elongationDeg);
  const lunarMonthMeta = getBikramiMonthMeta(lunarMonthId);

  const nextBoundaryDeg = isPuranmashi ? 180 : isMasya ? 0 : (tithiNumber * 12) % 360;
  const tithiEndsAtMs = findNextElongationCrossingUtcMs(sunriseMs, nextBoundaryDeg);

  // Illumination fraction: 0 at New Moon (0°), 1 at Full Moon (180°)
  const illumination = (1 - Math.cos(elongationDeg * DEG2RAD)) / 2;

  return {
    tithiNumber,
    paksh,
    pakshPa,
    pakshDay,
    tithiNameEn,
    tithiNamePa,
    shortTithiEn,
    shortTithiPa,
    lunarMonthId,
    lunarMonthEn: lunarMonthMeta.nameEn,
    lunarMonthPa: lunarMonthMeta.namePa,
    isPuranmashi,
    isMasya,
    isEkadashi,
    isAshtami,
    isPanchmi,
    isSpecialLunar,
    elongationDeg,
    illumination,
    tithiEndsAtUtc: new Date(tithiEndsAtMs).toISOString(),
    amritsarSunriseUtc: new Date(sunriseMs).toISOString(),
  };
}

/**
 * Compact precomputed lunar tuple for O(1) main-thread startup (zero trig loops for Sambat 2082–2084):
 * [tithiNumber, flags(bit0=Puranmashi, bit1=Masya), lunarMonthId, elongationCentideg, tithiEndsOffsetSec, sunriseOffsetSec]
 * where offsets are seconds relative to `${isoDate}T00:00:00Z`.
 */
export type CompactLunarTuple = readonly [number, number, number, number, number, number];

export function encodeLunarInfoToCompact(isoDate: string, info: LunarInfo): CompactLunarTuple {
  const midnightMs = Date.parse(`${isoDate}T00:00:00Z`);
  const flags = (info.isPuranmashi ? 1 : 0) | (info.isMasya ? 2 : 0);
  const elongCenti = Math.round(info.elongationDeg * 100);
  const tithiEndSec = Math.round((Date.parse(info.tithiEndsAtUtc) - midnightMs) / 1000);
  const sunriseSec = Math.round((Date.parse(info.amritsarSunriseUtc) - midnightMs) / 1000);
  return [info.tithiNumber, flags, info.lunarMonthId, elongCenti, tithiEndSec, sunriseSec];
}

export function decodeCompactLunarTuple(isoDate: string, tuple: CompactLunarTuple): LunarInfo {
  const [tithiNumber, flags, lunarMonthId, elongCenti, tithiEndSec, sunriseSec] = tuple;
  const midnightMs = Date.parse(`${isoDate}T00:00:00Z`);
  const isPuranmashi = (flags & 1) !== 0;
  const isMasya = (flags & 2) !== 0;
  const isSudhi = tithiNumber <= 15;
  const paksh: LunarPaksh = isSudhi ? 'Sudhi' : 'Vadhi';
  const pakshPa = isSudhi ? 'ਸੁਦੀ' : 'ਵਦੀ';
  const pakshDay = isSudhi ? tithiNumber : tithiNumber - 15;

  const isEkadashi = pakshDay === 11;
  const isAshtami = pakshDay === 8;
  const isPanchmi = pakshDay === 5;
  const isSpecialLunar = isPuranmashi || isMasya || isEkadashi || isAshtami || isPanchmi;

  const tithiMeta = TITHI_NAMES[pakshDay - 1];
  let tithiNameEn = tithiMeta.en;
  let tithiNamePa = tithiMeta.pa;
  let shortTithiEn = `${paksh} ${pakshDay}`;
  let shortTithiPa = `${pakshPa} ${tithiMeta.shortPa.split(' ')[0]}`;

  if (isPuranmashi) {
    tithiNameEn = 'Puranmashi';
    tithiNamePa = 'ਪੂਰਨਮਾਸ਼ੀ';
    shortTithiEn = 'Puranmashi';
    shortTithiPa = 'ਪੂਰਨਮਾਸ਼ੀ';
  } else if (isMasya) {
    tithiNameEn = 'Masya';
    tithiNamePa = 'ਮੱਸਿਆ';
    shortTithiEn = 'Masya';
    shortTithiPa = 'ਮੱਸਿਆ';
  } else if (tithiNumber === 15) {
    tithiNameEn = 'Chaudas / Puranmashi Aarambh';
    tithiNamePa = 'ਚੌਦਸ / ਪੂਰਨਮਾਸ਼ੀ ਆਰੰਭ';
    shortTithiEn = 'Sudhi 14–15';
    shortTithiPa = 'ਸੁਦੀ ੧੪-੧੫';
  } else if (tithiNumber === 30) {
    tithiNameEn = 'Chaudas / Masya Aarambh';
    tithiNamePa = 'ਚੌਦਸ / ਮੱਸਿਆ ਆਰੰਭ';
    shortTithiEn = 'Vadhi 14–15';
    shortTithiPa = 'ਵਦੀ ੧੪-੧੫';
  } else if (isEkadashi) {
    shortTithiEn = `${paksh} 11 · Ekadashi`;
    shortTithiPa = `${pakshPa} ੧੧ · ਇਕਾਦਸ਼ੀ`;
  } else if (isAshtami) {
    shortTithiEn = `${paksh} 8 · Ashtami`;
    shortTithiPa = `${pakshPa} ੮ · ਅਸ਼ਟਮੀ`;
  } else if (isPanchmi) {
    shortTithiEn = `${paksh} 5 · Panchmi`;
    shortTithiPa = `${pakshPa} ੫ · ਪੰਚਮੀ`;
  }

  const lunarMonthMeta = getBikramiMonthMeta(lunarMonthId);
  const elongationDeg = elongCenti / 100;
  const illumination = (1 - Math.cos(elongationDeg * DEG2RAD)) / 2;

  return {
    tithiNumber,
    paksh,
    pakshPa,
    pakshDay,
    tithiNameEn,
    tithiNamePa,
    shortTithiEn,
    shortTithiPa,
    lunarMonthId,
    lunarMonthEn: lunarMonthMeta.nameEn,
    lunarMonthPa: lunarMonthMeta.namePa,
    isPuranmashi,
    isMasya,
    isEkadashi,
    isAshtami,
    isPanchmi,
    isSpecialLunar,
    elongationDeg,
    illumination,
    tithiEndsAtUtc: new Date(midnightMs + tithiEndSec * 1000).toISOString(),
    amritsarSunriseUtc: new Date(midnightMs + sunriseSec * 1000).toISOString(),
  };
}

/** Compute sunset UTC timestamp (ms) at Sri Amritsar / Anandpur Sahib for YYYY-MM-DD using NOAA solar equation. */
export function getAmritsarSunsetUtcMs(isoDate: string): number {
  const [y, m, d] = isoDate.split('-').map(Number);
  const noonUtc = Date.UTC(y, m - 1, d, 6, 30, 0);
  const jd = msToJulianDay(noonUtc);
  const T = (jd - 2451545.0) / 36525.0;

  const L0 = normalizeDeg(280.46646 + T * (36000.76983 + T * 0.0003032));
  const M = normalizeDeg(357.52911 + T * (35999.05029 - 0.0001537 * T));
  const e = 0.016708634 - T * (0.000042037 + 0.0000001267 * T);
  const Mrad = M * DEG2RAD;
  const C =
    Math.sin(Mrad) * (1.914602 - T * (0.004817 + 0.000014 * T)) +
    Math.sin(2 * Mrad) * (0.019993 - 0.000101 * T) +
    Math.sin(3 * Mrad) * 0.000289;
  const trueLong = L0 + C;
  const omega = 125.04 - 1934.136 * T;
  const appLong = trueLong - 0.00569 - 0.00478 * Math.sin(omega * DEG2RAD);
  const meanObliq = 23 + (26 + (21.448 - T * (46.815 + T * (0.00059 - T * 0.001813))) / 60) / 60;
  const obliqCorr = meanObliq + 0.00256 * Math.cos(omega * DEG2RAD);
  const declRad = Math.asin(Math.sin(obliqCorr * DEG2RAD) * Math.sin(appLong * DEG2RAD));

  const varY = Math.pow(Math.tan((obliqCorr / 2) * DEG2RAD), 2);
  const eqOfTimeMin =
    4 *
    RAD2DEG *
    (varY * Math.sin(2 * L0 * DEG2RAD) -
      2 * e * Math.sin(Mrad) +
      4 * e * varY * Math.sin(Mrad) * Math.cos(2 * L0 * DEG2RAD) -
      0.5 * varY * varY * Math.sin(4 * L0 * DEG2RAD) -
      1.25 * e * e * Math.sin(2 * Mrad));

  const latRad = ANANDPUR_SAHIB_LAT * DEG2RAD;
  const zenithRad = 90.833 * DEG2RAD;
  const cosHa =
    Math.cos(zenithRad) / (Math.cos(latRad) * Math.cos(declRad)) -
    Math.tan(latRad) * Math.tan(declRad);
  const clampedCosHa = Math.max(-1, Math.min(1, cosHa));
  const haDeg = Math.acos(clampedCosHa) * RAD2DEG;

  const sunsetMinutesUtc = 720 - 4 * (ANANDPUR_SAHIB_LON - haDeg) - eqOfTimeMin;
  return Date.UTC(y, m - 1, d, 0, 0, 0) + Math.round(sunsetMinutesUtc * 60000);
}

/**
 * Find exact UTC ms of sidereal solar Sankranti (Lahiri / Chitrapaksha ayanamsa)
 * for a given Bikrami Sambat year and solar monthId (1 = Chet/330° ... 12 = Phagun/300°).
 */
export function findSiderealSankrantiUtcMs(sambat: number, monthId: number): number {
  const startGregYear = sambat - 57;
  // monthId 1 (Chet) -> Mar of startGregYear; monthId 11 (Magh) -> Jan of startGregYear + 1
  const approxGregMonth = ((monthId + 1) % 12) + 1; // 1->3(Mar), 2->4(Apr), ..., 10->12(Dec), 11->1(Jan), 12->2(Feb)
  const approxGregYear = monthId >= 11 ? startGregYear + 1 : startGregYear;
  const targetSiderealDeg = ((monthId - 2 + 12) % 12) * 30;

  let jd = msToJulianDay(Date.UTC(approxGregYear, approxGregMonth - 1, 15, 0, 0, 0));
  for (let i = 0; i < 10; i++) {
    const sidereal = normalizeDeg(getSunLongitudeDeg(jd) - getLahiriAyanamsaDeg(jd));
    let err = targetSiderealDeg - sidereal;
    if (err > 180) err -= 360;
    if (err < -180) err += 360;
    if (Math.abs(err) < 0.00005) break;
    // Solar apparent motion ~0.9856°/day; refine with local numerical derivative
    const dt = 0.05;
    const nextSid = normalizeDeg(getSunLongitudeDeg(jd + dt) - getLahiriAyanamsaDeg(jd + dt));
    let rate = nextSid - sidereal;
    if (rate < -180) rate += 360;
    if (rate > 180) rate -= 360;
    rate /= dt;
    jd += err / rate;
  }
  return julianDayToMs(jd);
}

function utcMsToIstDateIso(utcMs: number): string {
  const istMs = utcMs + 19800000; // UTC+05:30
  const d = new Date(istMs);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function shiftIsoDate(isoDate: string, deltaDays: number): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  const next = new Date(Date.UTC(y, m - 1, d + deltaDays));
  return `${next.getUTCFullYear()}-${String(next.getUTCMonth() + 1).padStart(2, '0')}-${String(next.getUTCDate()).padStart(2, '0')}`;
}

function diffIsoDays(isoA: string, isoB: string): number {
  const [ya, ma, da] = isoA.split('-').map(Number);
  const [yb, mb, db] = isoB.split('-').map(Number);
  return Math.round((Date.UTC(yb, mb - 1, db) - Date.UTC(ya, ma - 1, da)) / 86400000);
}

/**
 * Determine the Puratan Punjabi Udaya Sangrand date (YYYY-MM-DD in IST) for a sidereal Sankranti.
 * Traditional Punjab rule: if Sankranti occurs before local sunset at Sri Anandpur Sahib / Amritsar,
 * Sangrand is observed that same IST calendar day; if after sunset, Udaya Sangrand begins the next sunrise.
 */
export function resolveSangrandDateFromSankranti(sankrantiUtcMs: number): string {
  const istDate = utcMsToIstDateIso(sankrantiUtcMs);
  const sunsetUtcMs = getAmritsarSunsetUtcMs(istDate);
  if (sankrantiUtcMs <= sunsetUtcMs) {
    return istDate;
  }
  return shiftIsoDate(istDate, 1);
}

/**
 * Perpetually compute all 12 Puratan Bikrami solar month spans (1 Chet through Phagun)
 * for any Bikrami Sambat year (e.g. 1900–2150 CE / Sambat 1957–2207) using Meeus sidereal solar ingress.
 */
export function computeSolarMonthSpansForSambat(sambat: number): {
  sambat: number;
  monthId: number;
  startDate: string;
  endDate: string;
  days: number;
  sankrantiUtc: string;
}[] {
  const starts: {monthId: number; startDate: string; sankrantiUtc: string}[] = [];
  for (let monthId = 1; monthId <= 12; monthId++) {
    const sankrantiMs = findSiderealSankrantiUtcMs(sambat, monthId);
    const startDate = resolveSangrandDateFromSankranti(sankrantiMs);
    starts.push({
      monthId,
      startDate,
      sankrantiUtc: new Date(sankrantiMs).toISOString(),
    });
  }
  // Compute Chet of next Sambat to close Phagun cleanly
  const nextChetMs = findSiderealSankrantiUtcMs(sambat + 1, 1);
  const nextChetStart = resolveSangrandDateFromSankranti(nextChetMs);

  return starts.map((item, idx) => {
    const nextStart = idx < 11 ? starts[idx + 1].startDate : nextChetStart;
    const endDate = shiftIsoDate(nextStart, -1);
    const days = diffIsoDays(item.startDate, nextStart);
    return {
      sambat,
      monthId: item.monthId,
      startDate: item.startDate,
      endDate,
      days,
      sankrantiUtc: item.sankrantiUtc,
    };
  });
}

