import type {BikramiMonthMeta, SolarMonthSpan} from './types';

export const POTHI_BASE_URL = 'https://pothi.tatkhalsa.in';

export const BIKRAMI_MONTHS: readonly BikramiMonthMeta[] = [
  {
    id: 1,
    key: 'chet',
    nameEn: 'Chet',
    namePa: 'ਚੇਤ',
    seasonEn: 'Spring Blossom (Basant)',
    seasonPa: 'ਬਸੰਤ ਰੁੱਤ',
    barahMahaRefEn: 'Barah Maha Majh · SGGS Ang 133',
    barahMahaRefPa: 'ਬਾਰਹ ਮਾਹਾ ਮਾਂਝ · ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਅੰਗ ੧੩੩',
    barahMahaOpeningPa: 'ਚੇਤਿ ਗੋਵਿੰਦੁ ਅਰਾਧੀਐ ਹੋਵੈ ਅਨੰਦੁ ਘਣਾ ॥',
    barahMahaOpeningTranslit: 'Chet Govind araadheeai hovai anand ghanaa.',
    pothiUrl: POTHI_BASE_URL,
  },
  {
    id: 2,
    key: 'vaisakh',
    nameEn: 'Vaisakh',
    namePa: 'ਵੈਸਾਖ',
    seasonEn: 'Harvest & Renewal',
    seasonPa: 'ਵਾਢੀ ਅਤੇ ਖ਼ਾਲਸਾ ਸਾਜਨਾ ਰੁੱਤ',
    barahMahaRefEn: 'Barah Maha Majh · SGGS Ang 133',
    barahMahaRefPa: 'ਬਾਰਹ ਮਾਹਾ ਮਾਂਝ · ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਅੰਗ ੧੩੩',
    barahMahaOpeningPa: 'ਵੈਸਾਖਿ ਧੀਰਨਿ ਕਿਉ ਵਾਢੀਆ ਜਿਨਾ ਪ੍ਰੇਮ ਬਿਛੋਹੁ ॥',
    barahMahaOpeningTranslit: 'Vaisaakh dheeran kio vaadheeaa jinaa prem bichhoh.',
    pothiUrl: POTHI_BASE_URL,
  },
  {
    id: 3,
    key: 'jeth',
    nameEn: 'Jeth',
    namePa: 'ਜੇਠ',
    seasonEn: 'Early Summer (Grisham)',
    seasonPa: 'ਗ੍ਰੀਖਮ ਰੁੱਤ',
    barahMahaRefEn: 'Barah Maha Majh · SGGS Ang 134',
    barahMahaRefPa: 'ਬਾਰਹ ਮਾਹਾ ਮਾਂਝ · ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਅੰਗ ੧੩੪',
    barahMahaOpeningPa: 'ਮਾਹਿ ਜੇਠਿ ਹਰਿ ਪ੍ਰਭੁ ਮਿਲੈ ਤਿਸੁ ਆਗੈ ਨਿਵਿ ਲਾਗਉ ॥',
    barahMahaOpeningTranslit: 'Maah Jeth Har Prabh milai tis aagai niv laagau.',
    pothiUrl: POTHI_BASE_URL,
  },
  {
    id: 4,
    key: 'harh',
    nameEn: 'Harh',
    namePa: 'ਹਾੜ੍ਹ',
    seasonEn: 'Peak Summer Heat',
    seasonPa: 'ਤਪਦੀ ਗਰਮੀ ਰੁੱਤ',
    barahMahaRefEn: 'Barah Maha Majh · SGGS Ang 134',
    barahMahaRefPa: 'ਬਾਰਹ ਮਾਹਾ ਮਾਂਝ · ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਅੰਗ ੧੩੪',
    barahMahaOpeningPa: 'ਆਸਾੜੁ ਤਪੰਦਾ ਤਿਸੁ ਲਗੈ ਹਰਿ ਨਾਹੁ ਨ ਜਿੰਨਾ ਪਾਸਿ ॥',
    barahMahaOpeningTranslit: 'Aasaarh tapandaa tis lagai Har naahu na jinnaa paas.',
    pothiUrl: POTHI_BASE_URL,
  },
  {
    id: 5,
    key: 'sawan',
    nameEn: 'Sawan',
    namePa: 'ਸਾਵਣ',
    seasonEn: 'Monsoon Rains (Barkha)',
    seasonPa: 'ਬਰਖਾ ਰੁੱਤ',
    barahMahaRefEn: 'Barah Maha Majh · SGGS Ang 134',
    barahMahaRefPa: 'ਬਾਰਹ ਮਾਹਾ ਮਾਂਝ · ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਅੰਗ ੧੩੪',
    barahMahaOpeningPa: 'ਸਾਵਣਿ ਸਰਸੀ ਕਾਮਣੀ ਚਰਨ ਕਮਲ ਸਿਉ ਪਿਆਰੁ ॥',
    barahMahaOpeningTranslit: 'Saavan sarsee kaamnee charan kamal sio piaar.',
    pothiUrl: POTHI_BASE_URL,
  },
  {
    id: 6,
    key: 'bhadon',
    nameEn: 'Bhadon',
    namePa: 'ਭਾਦੋਂ',
    seasonEn: 'Late Monsoon Humidity',
    seasonPa: 'ਭਾਦੋਂ ਵਰਖਾ ਰੁੱਤ',
    barahMahaRefEn: 'Barah Maha Majh · SGGS Ang 134',
    barahMahaRefPa: 'ਬਾਰਹ ਮਾਹਾ ਮਾਂਝ · ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਅੰਗ ੧੩੪',
    barahMahaOpeningPa: 'ਭਾਦੁਇ ਭਰਮਿ ਭੁਲਾਣੀਆ ਦੂਜੈ ਲਗਾ ਹੇਤੁ ॥',
    barahMahaOpeningTranslit: 'Bhaadui bharam bhulaaneeaa doojai lagaa het.',
    pothiUrl: POTHI_BASE_URL,
  },
  {
    id: 7,
    key: 'assu',
    nameEn: 'Assu',
    namePa: 'ਅੱਸੂ',
    seasonEn: 'Early Autumn (Sarat)',
    seasonPa: 'ਸਰਦ ਰੁੱਤ ਦਾ ਆਰੰਭ',
    barahMahaRefEn: 'Barah Maha Majh · SGGS Ang 134',
    barahMahaRefPa: 'ਬਾਰਹ ਮਾਹਾ ਮਾਂਝ · ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਅੰਗ ੧੩੪',
    barahMahaOpeningPa: 'ਅਸੁਨਿ ਪ੍ਰੇਮ ਉਮਾਹੜਾ ਕਿਉ ਮਿਲੀਐ ਹਰਿ ਜਾਇ ॥',
    barahMahaOpeningTranslit: 'Asun prem umaahraa kio mileeai Har jaae.',
    pothiUrl: POTHI_BASE_URL,
  },
  {
    id: 8,
    key: 'katak',
    nameEn: 'Katak',
    namePa: 'ਕੱਤਕ',
    seasonEn: 'Clear Autumn Skies',
    seasonPa: 'ਨਿਰਮਲ ਸਰਦ ਰੁੱਤ',
    barahMahaRefEn: 'Barah Maha Majh · SGGS Ang 135',
    barahMahaRefPa: 'ਬਾਰਹ ਮਾਹਾ ਮਾਂਝ · ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਅੰਗ ੧੩੫',
    barahMahaOpeningPa: 'ਕਤਿਕਿ ਕਰਮ ਕਮਾਵਣੇ ਦੋਸੁ ਨ ਕਾਹੂ ਜੋਗੁ ॥',
    barahMahaOpeningTranslit: 'Katik karam kamaavane dos na kaahoo jog.',
    pothiUrl: POTHI_BASE_URL,
  },
  {
    id: 9,
    key: 'maghar',
    nameEn: 'Maghar',
    namePa: 'ਮੱਘਰ',
    seasonEn: 'Crisp Pre-Winter (Himkar)',
    seasonPa: 'ਹਿਮਕਰ ਰੁੱਤ',
    barahMahaRefEn: 'Barah Maha Majh · SGGS Ang 135',
    barahMahaRefPa: 'ਬਾਰਹ ਮਾਹਾ ਮਾਂਝ · ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਅੰਗ ੧੩੫',
    barahMahaOpeningPa: 'ਮੰਘਿਰਿ ਮਾਹਿ ਸੋਹੰਦੀਆ ਹਰਿ ਪਿਰ ਸੰਗਿ ਬੈਠੜੀਆਹ ॥',
    barahMahaOpeningTranslit: 'Manghir maah sohandeeaa Har pir sang baithreeaah.',
    pothiUrl: POTHI_BASE_URL,
  },
  {
    id: 10,
    key: 'poh',
    nameEn: 'Poh',
    namePa: 'ਪੋਹ',
    seasonEn: 'Deep Winter Frost (Sisir)',
    seasonPa: 'ਕੜਾਕੇ ਦੀ ਸਰਦੀ ਰੁੱਤ',
    barahMahaRefEn: 'Barah Maha Majh · SGGS Ang 135',
    barahMahaRefPa: 'ਬਾਰਹ ਮਾਹਾ ਮਾਂਝ · ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਅੰਗ ੧੩੫',
    barahMahaOpeningPa: 'ਪੋਖਿ ਤੁਖਾਰੁ ਨ ਵਿਆਪਈ ਕੰਠਿ ਮਿਲਿਆ ਹਰਿ ਨਾਹੁ ॥',
    barahMahaOpeningTranslit: 'Pokh tukhaar na viaapaee kanth miliaa Har naahu.',
    pothiUrl: POTHI_BASE_URL,
  },
  {
    id: 11,
    key: 'magh',
    nameEn: 'Magh',
    namePa: 'ਮਾਘ',
    seasonEn: 'Late Winter Dawn',
    seasonPa: 'ਮਾਘ ਸੀਤ ਰੁੱਤ',
    barahMahaRefEn: 'Barah Maha Majh · SGGS Ang 135',
    barahMahaRefPa: 'ਬਾਰਹ ਮਾਹਾ ਮਾਂਝ · ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਅੰਗ ੧੩੫',
    barahMahaOpeningPa: 'ਮਾਘਿ ਮਜਨੁ ਸੰਗਿ ਸਾਧੂਆ ਧੂੜੀ ਕਰਿ ਇਸਨਾਨੁ ॥',
    barahMahaOpeningTranslit: 'Maagh majan sang saadhooaa dhooree kar isnaan.',
    pothiUrl: POTHI_BASE_URL,
  },
  {
    id: 12,
    key: 'phagun',
    nameEn: 'Phagun',
    namePa: 'ਫੱਗਣ',
    seasonEn: 'Awakening Spring',
    seasonPa: 'ਫੱਗਣ ਬਹਾਰ ਰੁੱਤ',
    barahMahaRefEn: 'Barah Maha Majh · SGGS Ang 136',
    barahMahaRefPa: 'ਬਾਰਹ ਮਾਹਾ ਮਾਂਝ · ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਅੰਗ ੧੩੬',
    barahMahaOpeningPa: 'ਫਲਗੁਣਿ ਅਨੰਦ ਉਪਾਰਜਨਾ ਹਰਿ ਸਜਣ ਪ੍ਰਗਟੇ ਆਇ ॥',
    barahMahaOpeningTranslit: 'Phalgun anand upaarjanaa Har sajan pragate aae.',
    pothiUrl: POTHI_BASE_URL,
  },
] as const;

/**
 * Verified Puratan Bikrami Solar Month Spans (Sidereal Sankranti Udaya in Punjab / Sri Amritsar Sahib IST).
 * True Punjabi solar months vary naturally between 29 and 32 days according to Earth's orbital velocity.
 * Covers Sambat 2083 (Katak–Phagun, Oct 2026 – Mar 2027), full Sambat 2084 (Chet–Phagun, Mar 2027 – Mar 2028),
 * and Chet 2085 opening anchor for smooth boundary calculations.
 */
export const SOLAR_MONTH_SPANS: readonly SolarMonthSpan[] = [
  // Sambat 2083 (Katak through Phagun — covers Nov 2026 – Mar 2027 completely)
  {
    sambat: 2083,
    monthId: 8, // Katak
    startDate: '2026-10-17',
    endDate: '2026-11-15',
    days: 30,
    sankrantiUtc: '2026-10-17T08:02:00Z', // 13:32 IST
  },
  {
    sambat: 2083,
    monthId: 9, // Maghar (1 Maghar = Nov 16, 2026 -> 9 Maghar = Tue Nov 24, 2026!)
    startDate: '2026-11-16',
    endDate: '2026-12-15',
    days: 30,
    sankrantiUtc: '2026-11-16T07:48:00Z', // 13:18 IST
  },
  {
    sambat: 2083,
    monthId: 10, // Poh
    startDate: '2026-12-16',
    endDate: '2027-01-13',
    days: 29,
    sankrantiUtc: '2026-12-15T22:24:00Z', // Dec 16 03:54 IST
  },
  {
    sambat: 2083,
    monthId: 11, // Magh (Makara Sankranti / Maghi)
    startDate: '2027-01-14',
    endDate: '2027-02-12',
    days: 30,
    sankrantiUtc: '2027-01-14T09:08:00Z', // 14:38 IST
  },
  {
    sambat: 2083,
    monthId: 12, // Phagun
    startDate: '2027-02-13',
    endDate: '2027-03-14',
    days: 30,
    sankrantiUtc: '2027-02-12T22:09:00Z', // Feb 13 03:39 IST
  },

  // Full Sambat 2084 (1 Chet 2084 to 30 Phagun 2084 — 365 days)
  {
    sambat: 2084,
    monthId: 1, // Chet (Sambat 2084 New Year)
    startDate: '2027-03-15',
    endDate: '2027-04-13',
    days: 30,
    sankrantiUtc: '2027-03-14T19:00:00Z', // Mar 15 00:30 IST
  },
  {
    sambat: 2084,
    monthId: 2, // Vaisakh (Vaisakhi / Khalsa Sajna Divas)
    startDate: '2027-04-14',
    endDate: '2027-05-14',
    days: 31,
    sankrantiUtc: '2027-04-14T03:30:00Z', // 09:00 IST
  },
  {
    sambat: 2084,
    monthId: 3, // Jeth
    startDate: '2027-05-15',
    endDate: '2027-06-14',
    days: 31,
    sankrantiUtc: '2027-05-15T00:22:00Z', // 05:52 IST
  },
  {
    sambat: 2084,
    monthId: 4, // Harh (32 days near solar aphelion)
    startDate: '2027-06-15',
    endDate: '2027-07-16',
    days: 32,
    sankrantiUtc: '2027-06-15T06:58:00Z', // 12:28 IST
  },
  {
    sambat: 2084,
    monthId: 5, // Sawan (Sankranti late night Jul 16 IST -> Udaya Sangrand Jul 17)
    startDate: '2027-07-17',
    endDate: '2027-08-16',
    days: 31,
    sankrantiUtc: '2027-07-16T17:50:00Z', // Jul 16 23:20 IST
  },
  {
    sambat: 2084,
    monthId: 6, // Bhadon
    startDate: '2027-08-17',
    endDate: '2027-09-16',
    days: 31,
    sankrantiUtc: '2027-08-17T02:12:00Z', // 07:42 IST
  },
  {
    sambat: 2084,
    monthId: 7, // Assu
    startDate: '2027-09-17',
    endDate: '2027-10-17',
    days: 31,
    sankrantiUtc: '2027-09-17T02:08:00Z', // 07:38 IST
  },
  {
    sambat: 2084,
    monthId: 8, // Katak (Sankranti evening Oct 17 IST -> Udaya Sangrand Oct 18)
    startDate: '2027-10-18',
    endDate: '2027-11-16',
    days: 30,
    sankrantiUtc: '2027-10-17T14:04:00Z', // Oct 17 19:34 IST
  },
  {
    sambat: 2084,
    monthId: 9, // Maghar (Sankranti evening Nov 16 IST -> Udaya Sangrand Nov 17)
    startDate: '2027-11-17',
    endDate: '2027-12-15',
    days: 29,
    sankrantiUtc: '2027-11-16T13:52:00Z', // Nov 16 19:22 IST
  },
  {
    sambat: 2084,
    monthId: 10, // Poh
    startDate: '2027-12-16',
    endDate: '2028-01-14',
    days: 30,
    sankrantiUtc: '2027-12-16T04:31:00Z', // 10:01 IST
  },
  {
    sambat: 2084,
    monthId: 11, // Magh (Sankranti evening Jan 14 IST -> Udaya Sangrand Jan 15)
    startDate: '2028-01-15',
    endDate: '2028-02-12',
    days: 29,
    sankrantiUtc: '2028-01-14T15:13:00Z', // Jan 14 20:43 IST
  },
  {
    sambat: 2084,
    monthId: 12, // Phagun (2028 leap year: Feb 13 – Mar 13 = 30 days)
    startDate: '2028-02-13',
    endDate: '2028-03-13',
    days: 30,
    sankrantiUtc: '2028-02-13T04:12:00Z', // 09:42 IST
  },

  // Opening anchor of Sambat 2085 (for Mar 2028 calendar grid tail & next Sangrand countdown)
  {
    sambat: 2085,
    monthId: 1, // Chet 2085
    startDate: '2028-03-14',
    endDate: '2028-04-12',
    days: 30,
    sankrantiUtc: '2028-03-14T00:58:00Z', // 06:28 IST
  },
] as const;

export const WEEKDAYS = [
  {index: 0, shortEn: 'Sun', fullEn: 'Sunday', shortPa: 'ਐਤ', fullPa: 'ਐਤਵਾਰ'},
  {index: 1, shortEn: 'Mon', fullEn: 'Monday', shortPa: 'ਸੋਮ', fullPa: 'ਸੋਮਵਾਰ'},
  {index: 2, shortEn: 'Tue', fullEn: 'Tuesday', shortPa: 'ਮੰਗਲ', fullPa: 'ਮੰਗਲਵਾਰ'},
  {index: 3, shortEn: 'Wed', fullEn: 'Wednesday', shortPa: 'ਬੁੱਧ', fullPa: 'ਬੁੱਧਵਾਰ'},
  {index: 4, shortEn: 'Thu', fullEn: 'Thursday', shortPa: 'ਵੀਰ', fullPa: 'ਵੀਰਵਾਰ'},
  {index: 5, shortEn: 'Fri', fullEn: 'Friday', shortPa: 'ਸ਼ੁੱਕਰ', fullPa: 'ਸ਼ੁੱਕਰਵਾਰ'},
  {index: 6, shortEn: 'Sat', fullEn: 'Saturday', shortPa: 'ਸ਼ਨਿ', fullPa: 'ਸ਼ਨਿੱਚਰਵਾਰ'},
] as const;

export const GREGORIAN_MONTHS = [
  {en: 'January', shortEn: 'Jan', pa: 'ਜਨਵਰੀ', shortPa: 'ਜਨ'},
  {en: 'February', shortEn: 'Feb', pa: 'ਫ਼ਰਵਰੀ', shortPa: 'ਫ਼ਰ'},
  {en: 'March', shortEn: 'Mar', pa: 'ਮਾਰਚ', shortPa: 'ਮਾਰ'},
  {en: 'April', shortEn: 'Apr', pa: 'ਅਪ੍ਰੈਲ', shortPa: 'ਅਪ੍ਰੈ'},
  {en: 'May', shortEn: 'May', pa: 'ਮਈ', shortPa: 'ਮਈ'},
  {en: 'June', shortEn: 'Jun', pa: 'ਜੂਨ', shortPa: 'ਜੂਨ'},
  {en: 'July', shortEn: 'Jul', pa: 'ਜੁਲਾਈ', shortPa: 'ਜੁਲਾ'},
  {en: 'August', shortEn: 'Aug', pa: 'ਅਗਸਤ', shortPa: 'ਅਗ'},
  {en: 'September', shortEn: 'Sep', pa: 'ਸਤੰਬਰ', shortPa: 'ਸਤੰ'},
  {en: 'October', shortEn: 'Oct', pa: 'ਅਕਤੂਬਰ', shortPa: 'ਅਕਤੂ'},
  {en: 'November', shortEn: 'Nov', pa: 'ਨਵੰਬਰ', shortPa: 'ਨਵੰ'},
  {en: 'December', shortEn: 'Dec', pa: 'ਦਸੰਬਰ', shortPa: 'ਦਸੰ'},
] as const;

export const TITHI_NAMES: readonly {
  pakshDay: number;
  en: string;
  pa: string;
  shortEn: string;
  shortPa: string;
}[] = [
  {pakshDay: 1, en: 'Ekam (Pratipada)', pa: 'ਏਕਮ', shortEn: '1', shortPa: '੧'},
  {pakshDay: 2, en: 'Dooj (Dwitiya)', pa: 'ਦੂਜ', shortEn: '2', shortPa: '੨'},
  {pakshDay: 3, en: 'Teej (Tritiya)', pa: 'ਤੀਜ', shortEn: '3', shortPa: '੩'},
  {pakshDay: 4, en: 'Chauth (Chaturthi)', pa: 'ਚੌਥ', shortEn: '4', shortPa: '੪'},
  {pakshDay: 5, en: 'Panchmi', pa: 'ਪੰਚਮੀ', shortEn: '5 · Panchmi', shortPa: '੫ · ਪੰਚਮੀ'},
  {pakshDay: 6, en: 'Chhat (Shashthi)', pa: 'ਛਠ', shortEn: '6', shortPa: '੬'},
  {pakshDay: 7, en: 'Saptami', pa: 'ਸਪਤਮੀ', shortEn: '7', shortPa: '੭'},
  {pakshDay: 8, en: 'Ashtami', pa: 'ਅਸ਼ਟਮੀ', shortEn: '8 · Ashtami', shortPa: '੮ · ਅਸ਼ਟਮੀ'},
  {pakshDay: 9, en: 'Naumi (Navami)', pa: 'ਨੌਮੀ', shortEn: '9', shortPa: '੯'},
  {pakshDay: 10, en: 'Dasmi (Dashami)', pa: 'ਦਸਮੀ', shortEn: '10', shortPa: '੧੦'},
  {pakshDay: 11, en: 'Ekadashi', pa: 'ਇਕਾਦਸ਼ੀ', shortEn: '11 · Ekadashi', shortPa: '੧੧ · ਇਕਾਦਸ਼ੀ'},
  {pakshDay: 12, en: 'Dwadashi', pa: 'ਦੁਆਦਸ਼ੀ', shortEn: '12', shortPa: '੧੨'},
  {pakshDay: 13, en: 'Teras (Trayodashi)', pa: 'ਤੇਰਸ', shortEn: '13', shortPa: '੧੩'},
  {pakshDay: 14, en: 'Chaudas (Chaturdashi)', pa: 'ਚੌਦਸ', shortEn: '14', shortPa: '੧੪'},
  {pakshDay: 15, en: 'Puranmashi / Masya', pa: 'ਪੂਰਨਮਾਸ਼ੀ / ਮੱਸਿਆ', shortEn: '15', shortPa: '੧੫'},
] as const;

export function getBikramiMonthMeta(monthId: number): BikramiMonthMeta {
  const normalized = ((monthId - 1) % 12 + 12) % 12;
  return BIKRAMI_MONTHS[normalized];
}
