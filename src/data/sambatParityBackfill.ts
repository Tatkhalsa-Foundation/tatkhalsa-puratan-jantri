import {BIKRAMI_MONTHS} from './sambatData';
import type {HistoricalEvent} from './types';

interface ParitySpec {
  /** Existing template event ID from BASE_HISTORICAL_EVENTS or EXPANDED_PANTHIC_EVENTS. */
  templateId: string;
  /** Target unique ID for the backfilled Sambat year. */
  id: string;
  /** Target Bikrami Sambat year. */
  sambat: 2082 | 2083 | 2084;
  /** Astronomically verified Gregorian ISO date (YYYY-MM-DD). */
  date: string;
  /** Updated Puratan Bikrami tithi / solar rule label in English. */
  tithiRuleEn: string;
  /** Updated Puratan Bikrami tithi / solar rule label in Punjabi. */
  tithiRulePa: string;
  /** Optional override for category when harmonizing across years. */
  category?: HistoricalEvent['category'];
  /** Optional override for subGroups. */
  subGroups?: HistoricalEvent['subGroups'];
}

const GURMUKHI_DIGITS = ['੦', '੧', '੨', '੩', '੪', '੫', '੬', '੭', '੮', '੯'] as const;

function toGurmukhi(n: number | string): string {
  return String(n).replace(/[0-9]/g, (d) => GURMUKHI_DIGITS[Number(d)]);
}

function replaceSambatInText(text: string, fromSambat: number, toSambat: number): string {
  if (fromSambat === toSambat) return text;
  return text
    .replace(new RegExp(`\\b${fromSambat}\\b`, 'g'), String(toSambat))
    .replace(new RegExp(toGurmukhi(fromSambat), 'g'), toGurmukhi(toSambat));
}

function formatGregorianReadable(iso: string): string {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${months[m - 1]} ${y}`;
}

/**
 * Astronomically verified Puratan Bikrami parity backfill entries so Sambat 2082, 2083, and 2084
 * share complete observance parity across all categories (15 Bhagats, 11 Bhatts, Gursikh Bani-kars,
 * Guru Ghar families, Panj Pyare, Shaheedi Hafta 6–13 Poh, Khalsa Shaheeds, and Sampardai Barsis).
 */
const PARITY_SPECS: readonly ParitySpec[] = [
  // =========================================================================
  // SAMBAT 2082 PARITY BACKFILL (Chet 2082 – Phagun 2082)
  // =========================================================================
  {
    templateId: '2084-shaheedi-akali-baba-phula-singh-ji',
    id: '2082-shaheedi-akali-baba-phula-singh-ji',
    sambat: 2082,
    date: '2025-03-14',
    tithiRuleEn: '1 Chet, Sambat 2082 (1 Chet, Sambat 1879)',
    tithiRulePa: '੧ ਚੇਤ, ਸੰਮਤ ੨੦੮੨ (੧ ਚੇਤ, ਸੰਮਤ ੧੮੭੯)',
  },
  {
    templateId: '2084-solar-parkash-guru-tegh-bahadur-ji',
    id: '2082-solar-parkash-guru-tegh-bahadur-ji',
    sambat: 2082,
    date: '2025-04-07',
    tithiRuleEn: '25 Chet, Sambat 2082 (Solar Date · Lunar Vaisakh Vadhi 5 on 18 Apr)',
    tithiRulePa: '੨੫ ਚੇਤ, ਸੰਮਤ ੨੦੮੨ (ਸੂਰਜੀ ਤਾਰੀਖ਼ · ਚੰਦਰ ਵੈਸਾਖ ਵਦੀ ੫ — ੧੮ ਅਪ੍ਰੈਲ)',
  },
  {
    templateId: '2084-panj-pyare-bhai-dharam-singh-maharaja-ranjit-singh',
    id: '2082-panj-pyare-bhai-dharam-singh-maharaja-ranjit-singh',
    sambat: 2082,
    date: '2025-04-14',
    tithiRuleEn: '1 Vaisakh, Sambat 2082 (Vaisakhi — Sambat 1756 & 1858)',
    tithiRulePa: '੧ ਵੈਸਾਖ, ਸੰਮਤ ੨੦੮੨ (ਵੈਸਾਖੀ — ਸੰਮਤ ੧੭੫੬ ਅਤੇ ੧੮੫੮)',
  },
  {
    templateId: '2084-bhagat-jaidev-ji',
    id: '2082-bhagat-jaidev-ji',
    sambat: 2082,
    date: '2025-04-24',
    tithiRuleEn: 'Vaisakh Commemoration (11 Vaisakh, Sambat 2082 · Exact date unrecorded)',
    tithiRulePa: 'ਵੈਸਾਖ ਯਾਦਗਾਰ (੧੧ ਵੈਸਾਖ, ਸੰਮਤ ੨੦੮੨)',
  },
  {
    templateId: '2084-guru-angad-dev-parivar-mata-khivi-ji',
    id: '2082-guru-angad-dev-parivar-mata-khivi-ji',
    sambat: 2082,
    date: '2025-04-28',
    tithiRuleEn: '15 Vaisakh, Sambat 2082 (On Guru Angad Dev Ji Parkash)',
    tithiRulePa: '੧੫ ਵੈਸਾਖ, ਸੰਮਤ ੨੦੮੨ (ਗੁਰੂ ਅੰਗਦ ਦੇਵ ਜੀ ਪ੍ਰਕਾਸ਼ ਦਿਹਾੜੇ)',
  },
  {
    templateId: '2084-guru-amar-das-parivar-mata-mansa-devi-ji',
    id: '2082-guru-amar-das-parivar-mata-mansa-devi-ji',
    sambat: 2082,
    date: '2025-05-11',
    tithiRuleEn: '28 Vaisakh, Sambat 2082 (On Guru Amar Das Ji Parkash)',
    tithiRulePa: '੨੮ ਵੈਸਾਖ, ਸੰਮਤ ੨੦੮੨ (ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ ਪ੍ਰਕਾਸ਼ ਦਿਹਾੜੇ)',
  },
  {
    templateId: '2084-solar-parkash-guru-hargobind-mata-ganga-ji',
    id: '2082-solar-parkash-guru-hargobind-mata-ganga-ji',
    sambat: 2082,
    date: '2025-06-30',
    tithiRuleEn: '16 Harh, Sambat 2082 (Solar Date · Lunar Harh Vadhi 6 on 17 Jun)',
    tithiRulePa: '੧੬ ਹਾੜ੍ਹ, ਸੰਮਤ ੨੦੮੨ (ਸੂਰਜੀ ਤਾਰੀਖ਼ · ਚੰਦਰ ਹਾੜ੍ਹ ਵਦੀ ੬ — ੧੭ ਜੂਨ)',
  },
  {
    templateId: '2084-solar-parkash-guru-harkrishan-guru-har-rai-parivar',
    id: '2082-solar-parkash-guru-harkrishan-guru-har-rai-parivar',
    sambat: 2082,
    date: '2025-08-07',
    tithiRuleEn: '23 Sawan, Sambat 2082 (Solar Date · Lunar Sawan Vadhi 9 on 19 Jul)',
    tithiRulePa: '੨੩ ਸਾਵਣ, ਸੰਮਤ ੨੦੮੨ (ਸੂਰਜੀ ਤਾਰੀਖ਼ · ਚੰਦਰ ਸਾਵਣ ਵਦੀ ੯ — ੧੯ ਜੁਲਾਈ)',
  },
  {
    templateId: '2084-bhagat-bani-trilochan-beni-bhikhan-sadhna-parmanand-surdas',
    id: '2082-bhagat-bani-trilochan-beni-bhikhan-sadhna-parmanand-surdas',
    sambat: 2082,
    date: '2025-08-24',
    tithiRuleEn: '8 Bhadon, Sambat 2082 (Pehla Parkash SGGS · Mahan Kosh Note)',
    tithiRulePa: '੮ ਭਾਦੋਂ, ਸੰਮਤ ੨੦੮੨ (ਪਹਿਲਾ ਪ੍ਰਕਾਸ਼ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ)',
  },
  {
    templateId: '2084-bhai-satta-bhai-balwand-ji',
    id: '2082-bhai-satta-bhai-balwand-ji',
    sambat: 2082,
    date: '2025-08-24',
    tithiRuleEn: '8 Bhadon, Sambat 2082 (Pehla Parkash SGGS · Mahan Kosh Note)',
    tithiRulePa: '੮ ਭਾਦੋਂ, ਸੰਮਤ ੨੦੮੨ (ਪਹਿਲਾ ਪ੍ਰਕਾਸ਼ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ)',
  },
  {
    templateId: '2084-janam-bhai-daya-singh-ji-panj-pyare',
    id: '2082-janam-bhai-daya-singh-ji-panj-pyare',
    sambat: 2082,
    date: '2025-08-26',
    tithiRuleEn: '10 Bhadon, Sambat 2082',
    tithiRulePa: '੧੦ ਭਾਦੋਂ, ਸੰਮਤ ੨੦੮੨',
  },
  {
    templateId: '2084-baba-sundar-ji-ramkali-sadd',
    id: '2082-baba-sundar-ji-ramkali-sadd',
    sambat: 2082,
    date: '2025-09-07',
    tithiRuleEn: 'Bhadon Puranmashi (22 Bhadon, Sambat 2082 · Guru Amar Das Ji Joti Jot)',
    tithiRulePa: 'ਭਾਦੋਂ ਪੂਰਨਮਾਸ਼ੀ (੨੨ ਭਾਦੋਂ, ਸੰਮਤ ੨੦੮੨ · ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ ਜੋਤੀ ਜੋਤ)',
  },
  {
    templateId: '2084-guru-nanak-parivar-bebe-nanaki-mata-sulakhni-baba-lakhmi-das',
    id: '2082-guru-nanak-parivar-bebe-nanaki-mata-sulakhni-baba-lakhmi-das',
    sambat: 2082,
    date: '2025-09-16',
    tithiRuleEn: '31 Bhadon, Sambat 2082 (On Sri Guru Nanak Dev Ji Joti Jot)',
    tithiRulePa: '੩੧ ਭਾਦੋਂ, ਸੰਮਤ ੨੦੮੨ (ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਜੋਤੀ ਜੋਤ ਦਿਹਾੜੇ)',
  },
  {
    templateId: '2084-janam-baba-sri-chand-ji-bhai-kanhaiya-ji',
    id: '2082-janam-baba-sri-chand-ji-bhai-kanhaiya-ji',
    sambat: 2082,
    date: '2025-09-20',
    tithiRuleEn: '4 Assu, Sambat 2082 (Bhadon Sudhi 9 tradition also noted)',
    tithiRulePa: '੪ ਅੱਸੂ, ਸੰਮਤ ੨੦੮੨ (ਭਾਦੋਂ ਸੁਦੀ ੯ ਪਰੰਪਰਾ ਸਮੇਤ)',
  },
  {
    templateId: '2083-saka-sri-panja-sahib',
    id: '2082-saka-sri-panja-sahib',
    sambat: 2082,
    date: '2025-10-11',
    tithiRuleEn: 'Katak Vadhi 5 (25 Assu, Sambat 2082)',
    tithiRulePa: 'ਕੱਤਕ ਵਦੀ ੫ (੨੫ ਅੱਸੂ, ਸੰਮਤ ੨੦੮੨)',
    subGroups: ['gursikh'],
  },
  {
    templateId: '2083-shaheedi-bhai-beant-singh-ji',
    id: '2082-shaheedi-bhai-beant-singh-ji',
    sambat: 2082,
    date: '2025-10-12',
    tithiRuleEn: 'Katak Vadhi 6 (26 Assu, Sambat 2082)',
    tithiRulePa: 'ਕੱਤਕ ਵਦੀ ੬ (੨੬ ਅੱਸੂ, ਸੰਮਤ ੨੦੮੨)',
    subGroups: ['gursikh'],
  },
  {
    templateId: '2083-barsi-sant-baba-ajit-singh-patna',
    id: '2082-barsi-sant-baba-ajit-singh-patna',
    sambat: 2082,
    date: '2025-10-12',
    tithiRuleEn: 'Katak Vadhi 6 (26 Assu, Sambat 2082)',
    tithiRulePa: 'ਕੱਤਕ ਵਦੀ ੬ (੨੬ ਅੱਸੂ, ਸੰਮਤ ੨੦੮੨)',
  },
  {
    templateId: '2083-barsi-baba-mitt-singh-ji',
    id: '2082-barsi-baba-mitt-singh-ji',
    sambat: 2082,
    date: '2025-10-20',
    tithiRuleEn: 'Katak Vadhi 14 (4 Katak, Sambat 2082)',
    tithiRulePa: 'ਕੱਤਕ ਵਦੀ ੧੪ (੪ ਕੱਤਕ, ਸੰਮਤ ੨੦੮੨)',
  },
  {
    templateId: '2083-barsi-sant-jwala-singh-harkhowal',
    id: '2082-barsi-sant-jwala-singh-harkhowal',
    sambat: 2082,
    date: '2025-10-25',
    tithiRuleEn: 'Katak Sudhi 4 (9 Katak, Sambat 2082)',
    tithiRulePa: 'ਕੱਤਕ ਸੁਦੀ ੪ (੯ ਕੱਤਕ, ਸੰਮਤ ੨੦੮੨)',
  },
  {
    templateId: '2083-parkash-mata-sahib-kaur-ji',
    id: '2082-parkash-mata-sahib-kaur-ji',
    sambat: 2082,
    date: '2025-11-03',
    tithiRuleEn: '18 Katak, Sambat 2082',
    tithiRulePa: '੧੮ ਕੱਤਕ, ਸੰਮਤ ੨੦੮੨',
  },
  {
    templateId: '2083-barsi-sant-giani-mohan-singh-bhindranwale',
    id: '2082-barsi-sant-giani-mohan-singh-bhindranwale',
    sambat: 2082,
    date: '2025-11-14',
    tithiRuleEn: 'Maghar Vadhi 10 (29 Katak, Sambat 2082)',
    tithiRulePa: 'ਮੱਘਰ ਵਦੀ ੧੦ (੨੯ ਕੱਤਕ, ਸੰਮਤ ੨੦੮੨)',
  },
  {
    templateId: '2083-bhagat-sain-ji',
    id: '2082-bhagat-sain-ji',
    sambat: 2082,
    date: '2025-11-16',
    tithiRuleEn: 'Maghar Vadhi 12 (1 Maghar, Sambat 2082 · Traditional)',
    tithiRulePa: 'ਮੱਘਰ ਵਦੀ ੧੨ (੧ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੨)',
  },
  {
    templateId: '2083-janam-dr-bhai-vir-singh-ji',
    id: '2082-janam-dr-bhai-vir-singh-ji',
    sambat: 2082,
    date: '2025-11-16',
    tithiRuleEn: 'Maghar Vadhi 12 (1 Maghar, Sambat 2082)',
    tithiRulePa: 'ਮੱਘਰ ਵਦੀ ੧੨ (੧ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੨)',
    subGroups: ['gursikh'],
  },
  {
    templateId: '2083-barsi-sant-teja-singh-rara-sahib',
    id: '2082-barsi-sant-teja-singh-rara-sahib',
    sambat: 2082,
    date: '2025-11-21',
    tithiRuleEn: 'Maghar Sudhi 1 (6 Maghar, Sambat 2082)',
    tithiRulePa: 'ਮੱਘਰ ਸੁਦੀ ੧ (੬ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੨)',
  },
  {
    templateId: '2083-gurgaddi-guru-gobind-singh-ji',
    id: '2082-gurgaddi-guru-gobind-singh-ji',
    sambat: 2082,
    date: '2025-11-23',
    tithiRuleEn: 'Maghar Sudhi 3 (8 Maghar, Sambat 2082)',
    tithiRulePa: 'ਮੱਘਰ ਸੁਦੀ ੩ (੮ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੨)',
  },
  {
    templateId: '2083-shaheedi-bhai-mati-das-sati-das-dayala-ji',
    id: '2082-shaheedi-bhai-mati-das-sati-das-dayala-ji',
    sambat: 2082,
    date: '2025-11-25',
    tithiRuleEn: 'Maghar Sudhi 5 (10 Maghar, Sambat 2082 · Chandni Chowk)',
    tithiRulePa: 'ਮੱਘਰ ਸੁਦੀ ੫ (੧੦ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੨ · ਚਾਂਦਨੀ ਚੌਕ)',
  },
  {
    templateId: '2083-janam-sahibzada-baba-zorawar-singh-ji',
    id: '2082-janam-sahibzada-baba-zorawar-singh-ji',
    sambat: 2082,
    date: '2025-11-30',
    tithiRuleEn: '15 Maghar, Sambat 2082',
    tithiRulePa: '੧੫ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੨',
  },
  {
    templateId: '2083-joti-jot-baba-budha-ji',
    id: '2082-joti-jot-baba-budha-ji',
    sambat: 2082,
    date: '2025-12-02',
    tithiRuleEn: '17 Maghar, Sambat 2082 (Maghar Sudhi 4 tradition)',
    tithiRulePa: '੧੭ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੨ (ਮੱਘਰ ਸੁਦੀ ੪ ਪਰੰਪਰਾ)',
  },
  {
    templateId: '2083-janam-baba-atal-sahib-ji',
    id: '2082-janam-baba-atal-sahib-ji',
    sambat: 2082,
    date: '2025-12-03',
    tithiRuleEn: 'Maghar Sudhi 13 (18 Maghar, Sambat 2082)',
    tithiRulePa: 'ਮੱਘਰ ਸੁਦੀ ੧੩ (੧੮ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੨)',
    subGroups: ['guru-ghar'],
  },
  {
    templateId: '2083-joti-jot-bhai-mardana-ji',
    id: '2082-joti-jot-bhai-mardana-ji',
    sambat: 2082,
    date: '2025-12-04',
    tithiRuleEn: '19 Maghar, Sambat 2082 (Maghar Vadhi 11 tradition)',
    tithiRulePa: '੧੯ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੨ (ਮੱਘਰ ਵਦੀ ੧੧ ਪਰੰਪਰਾ)',
  },
  {
    templateId: '2083-barsi-sant-baba-thakur-singh-ji',
    id: '2082-barsi-sant-baba-thakur-singh-ji',
    sambat: 2082,
    date: '2025-12-05',
    tithiRuleEn: 'Poh Vadhi 1 (20 Maghar, Sambat 2082)',
    tithiRulePa: 'ਪੋਹ ਵਦੀ ੧ (੨੦ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੨)',
  },
  {
    templateId: '2083-janam-bhai-sahib-singh-ji-panj-pyare',
    id: '2082-janam-bhai-sahib-singh-ji-panj-pyare',
    sambat: 2082,
    date: '2025-12-07',
    tithiRuleEn: '22 Maghar, Sambat 2082',
    tithiRulePa: '੨੨ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੨',
  },
  {
    templateId: '2083-mata-sundri-ji-remembrance',
    id: '2082-mata-sundri-ji-remembrance',
    sambat: 2082,
    date: '2025-12-10',
    tithiRuleEn: 'Maghar Remembrance (25 Maghar, Sambat 2082 · Mahan Kosh Note)',
    tithiRulePa: 'ਮੱਘਰ ਯਾਦਗਾਰ (੨੫ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੨)',
  },
  {
    templateId: '2083-barsi-sant-kishan-singh-rara-sahib',
    id: '2082-barsi-sant-kishan-singh-rara-sahib',
    sambat: 2082,
    date: '2025-12-13',
    tithiRuleEn: 'Poh Vadhi 9 (28 Maghar, Sambat 2082)',
    tithiRulePa: 'ਪੋਹ ਵਦੀ ੯ (੨੮ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੨)',
  },
  {
    templateId: '2083-shaheedi-jathedar-gurdev-singh-kaunke',
    id: '2082-shaheedi-jathedar-gurdev-singh-kaunke',
    sambat: 2082,
    date: '2025-12-13',
    tithiRuleEn: 'Poh Vadhi 9 (28 Maghar, Sambat 2082)',
    tithiRulePa: 'ਪੋਹ ਵਦੀ ੯ (੨੮ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੨)',
    subGroups: ['gursikh'],
  },
  {
    templateId: '2083-janam-sahibzada-baba-fateh-singh-ji',
    id: '2082-janam-sahibzada-baba-fateh-singh-ji',
    sambat: 2082,
    date: '2025-12-14',
    tithiRuleEn: '29 Maghar, Sambat 2082 (11 Phagun alternate tradition noted)',
    tithiRulePa: '੨੯ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੨ (੧੧ ਫੱਗਣ ਪਰੰਪਰਾ ਸਮੇਤ)',
  },
  {
    templateId: '2083-barsi-sant-harnam-singh-rampur-khera',
    id: '2082-barsi-sant-harnam-singh-rampur-khera',
    sambat: 2082,
    date: '2025-12-16',
    tithiRuleEn: 'Poh Vadhi 12 (1 Poh, Sambat 2082)',
    tithiRulePa: 'ਪੋਹ ਵਦੀ ੧੨ (੧ ਪੋਹ, ਸੰਮਤ ੨੦੮੨)',
  },
  {
    templateId: '2083-shaheedi-bhai-satwant-singh-kehar-singh',
    id: '2082-shaheedi-bhai-satwant-singh-kehar-singh',
    sambat: 2082,
    date: '2025-12-18',
    tithiRuleEn: 'Poh Vadhi 14 (3 Poh, Sambat 2082)',
    tithiRulePa: 'ਪੋਹ ਵਦੀ ੧੪ (੩ ਪੋਹ, ਸੰਮਤ ੨੦੮੨)',
    subGroups: ['gursikh'],
  },
  {
    templateId: '2083-joti-jot-mata-jito-ji',
    id: '2082-joti-jot-mata-jito-ji',
    sambat: 2082,
    date: '2025-12-20',
    tithiRuleEn: '5 Poh, Sambat 2082 (Poh Sudhi 5, Sambat 1757)',
    tithiRulePa: '੫ ਪੋਹ, ਸੰਮਤ ੨੦੮੨ (ਪੋਹ ਸੁਦੀ ੫, ਸੰਮਤ ੧੭੫੭)',
  },
  {
    templateId: '2083-shaheedi-hafta-sarsa-nadi-uday-bachittar-singh',
    id: '2082-shaheedi-hafta-sarsa-nadi-uday-bachittar-singh',
    sambat: 2082,
    date: '2025-12-22',
    tithiRuleEn: '7 Poh, Sambat 2082 (Parivar Vichhora & Shahi Tibbi)',
    tithiRulePa: '੭ ਪੋਹ, ਸੰਮਤ ੨੦੮੨ (ਪਰਿਵਾਰ ਵਿਛੋੜਾ ਅਤੇ ਸ਼ਾਹੀ ਟਿੱਬੀ)',
  },
  {
    templateId: '2083-shaheedi-panj-pyare-chamkaur',
    id: '2082-shaheedi-panj-pyare-chamkaur',
    sambat: 2082,
    date: '2025-12-23',
    tithiRuleEn: '8 Poh, Sambat 2082 (Battle of Sri Chamkaur Sahib)',
    tithiRulePa: '੮ ਪੋਹ, ਸੰਮਤ ੨੦੮੨ (ਗੜ੍ਹੀ ਸ੍ਰੀ ਚਮਕੌਰ ਸਾਹਿਬ)',
  },
  {
    templateId: '2083-barsi-baba-hazura-singh-hazur-sahib',
    id: '2082-barsi-baba-hazura-singh-hazur-sahib',
    sambat: 2082,
    date: '2025-12-24',
    tithiRuleEn: 'Poh Sudhi 4 (9 Poh, Sambat 2082)',
    tithiRulePa: 'ਪੋਹ ਸੁਦੀ ੪ (੯ ਪੋਹ, ਸੰਮਤ ੨੦੮੨)',
  },
  {
    templateId: '2083-basant-ruth-arambh',
    id: '2082-basant-ruth-arambh',
    sambat: 2082,
    date: '2025-12-25',
    tithiRuleEn: 'Poh Sudhi 5 (10 Poh, Sambat 2082)',
    tithiRulePa: 'ਪੋਹ ਸੁਦੀ ੫ (੧੦ ਪੋਹ, ਸੰਮਤ ੨੦੮੨)',
  },
  {
    templateId: '2083-barsi-baba-daya-singh-sursingh',
    id: '2082-barsi-baba-daya-singh-sursingh',
    sambat: 2082,
    date: '2025-12-30',
    tithiRuleEn: 'Poh Sudhi 11 (Kshaya Tithi · 15 Poh, Sambat 2082)',
    tithiRulePa: 'ਪੋਹ ਸੁਦੀ ੧੧ (ਕਸ਼ੈ ਤਿਥੀ · ੧੫ ਪੋਹ, ਸੰਮਤ ੨੦੮੨)',
  },
  {
    templateId: '2083-barsi-sant-attar-singh-reru-sahib',
    id: '2082-barsi-sant-attar-singh-reru-sahib',
    sambat: 2082,
    date: '2026-01-03',
    tithiRuleEn: 'Poh Puranmashi (19 Poh, Sambat 2082)',
    tithiRulePa: 'ਪੋਹ ਪੂਰਨਮਾਸ਼ੀ (੧੯ ਪੋਹ, ਸੰਮਤ ੨੦੮੨)',
  },
  {
    templateId: '2083-bhagat-ramanand-ji',
    id: '2082-bhagat-ramanand-ji',
    sambat: 2082,
    date: '2026-01-09',
    tithiRuleEn: 'Magh Vadhi 7 (25 Poh, Sambat 2082 · Traditional)',
    tithiRulePa: 'ਮਾਘ ਵਦੀ ੭ (੨੫ ਪੋਹ, ਸੰਮਤ ੨੦੮੨)',
  },
  {
    templateId: '2083-barsi-sant-attar-singh-mastuana',
    id: '2082-barsi-sant-attar-singh-mastuana',
    sambat: 2082,
    date: '2026-01-13',
    tithiRuleEn: 'Magh Vadhi 10 (29 Poh, Sambat 2082)',
    tithiRulePa: 'ਮਾਘ ਵਦੀ ੧੦ (੨੯ ਪੋਹ, ਸੰਮਤ ੨੦੮੨)',
  },
  {
    templateId: '2083-janam-bibi-bhani-ji',
    id: '2082-janam-bibi-bhani-ji',
    sambat: 2082,
    date: '2026-01-15',
    tithiRuleEn: 'Magh Vadhi 12 (2 Magh, Sambat 2082 · Mahan Kosh)',
    tithiRulePa: 'ਮਾਘ ਵਦੀ ੧੨ (੨ ਮਾਘ, ਸੰਮਤ ੨੦੮੨ · ਮਹਾਨ ਕੋਸ਼)',
  },
  {
    templateId: '2083-barsi-sant-sundar-singh-bhindranwale',
    id: '2082-barsi-sant-sundar-singh-bhindranwale',
    sambat: 2082,
    date: '2026-01-28',
    tithiRuleEn: 'Magh Sudhi 10 (15 Magh, Sambat 2082)',
    tithiRulePa: 'ਮਾਘ ਸੁਦੀ ੧੦ (੧੫ ਮਾਘ, ਸੰਮਤ ੨੦੮੨)',
  },

  // =========================================================================
  // SAMBAT 2083 PARITY BACKFILL (Chet 2083 – Assu 2083)
  // =========================================================================
  {
    templateId: '2084-shaheedi-akali-baba-phula-singh-ji',
    id: '2083-shaheedi-akali-baba-phula-singh-ji',
    sambat: 2083,
    date: '2026-03-14',
    tithiRuleEn: '1 Chet, Sambat 2083 (1 Chet, Sambat 1879)',
    tithiRulePa: '੧ ਚੇਤ, ਸੰਮਤ ੨੦੮੩ (੧ ਚੇਤ, ਸੰਮਤ ੧੮੭੯)',
  },
  {
    templateId: '2084-janam-sahibzada-baba-jujhar-singh-ji',
    id: '2083-janam-sahibzada-baba-jujhar-singh-ji',
    sambat: 2083,
    date: '2026-04-09',
    tithiRuleEn: '27 Chet, Sambat 2083 (Chet / Vaisakh Sambat 1748)',
    tithiRulePa: '੨੭ ਚੇਤ, ਸੰਮਤ ੨੦੮੩ (ਸੰਮਤ ੧੭੪੮)',
  },
  {
    templateId: '2084-panj-pyare-bhai-dharam-singh-maharaja-ranjit-singh',
    id: '2083-panj-pyare-bhai-dharam-singh-maharaja-ranjit-singh',
    sambat: 2083,
    date: '2026-04-14',
    tithiRuleEn: '1 Vaisakh, Sambat 2083 (Vaisakhi — Sambat 1756 & 1858)',
    tithiRulePa: '੧ ਵੈਸਾਖ, ਸੰਮਤ ੨੦੮੩ (ਵੈਸਾਖੀ — ਸੰਮਤ ੧੭੫੬ ਅਤੇ ੧੮੫੮)',
  },
  {
    templateId: '2084-guru-angad-dev-parivar-mata-khivi-ji',
    id: '2083-guru-angad-dev-parivar-mata-khivi-ji',
    sambat: 2083,
    date: '2026-04-18',
    tithiRuleEn: '5 Vaisakh, Sambat 2083 (On Guru Angad Dev Ji Parkash)',
    tithiRulePa: '੫ ਵੈਸਾਖ, ਸੰਮਤ ੨੦੮੩ (ਗੁਰੂ ਅੰਗਦ ਦੇਵ ਜੀ ਪ੍ਰਕਾਸ਼ ਦਿਹਾੜੇ)',
  },
  {
    templateId: '2084-bhagat-jaidev-ji',
    id: '2083-bhagat-jaidev-ji',
    sambat: 2083,
    date: '2026-04-24',
    tithiRuleEn: 'Vaisakh Commemoration (11 Vaisakh, Sambat 2083 · Exact date unrecorded)',
    tithiRulePa: 'ਵੈਸਾਖ ਯਾਦਗਾਰ (੧੧ ਵੈਸਾਖ, ਸੰਮਤ ੨੦੮੩)',
  },
  {
    templateId: '2084-guru-amar-das-parivar-mata-mansa-devi-ji',
    id: '2083-guru-amar-das-parivar-mata-mansa-devi-ji',
    sambat: 2083,
    date: '2026-04-30',
    tithiRuleEn: '17 Vaisakh, Sambat 2083 (On Guru Amar Das Ji Parkash)',
    tithiRulePa: '੧੭ ਵੈਸਾਖ, ਸੰਮਤ ੨੦੮੩ (ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ ਪ੍ਰਕਾਸ਼ ਦਿਹਾੜੇ)',
  },
  {
    templateId: '2084-mata-bhag-kaur-mai-bhago-ji',
    id: '2083-mata-bhag-kaur-mai-bhago-ji',
    sambat: 2083,
    date: '2026-05-04',
    tithiRuleEn: '21 Vaisakh, Sambat 2083 (Muktsar Battle — 21 Vaisakh, Sambat 1762)',
    tithiRulePa: '੨੧ ਵੈਸਾਖ, ਸੰਮਤ ੨੦੮੩ (ਮੁਕਤਸਰ ਜੰਗ — ੨੧ ਵੈਸਾਖ, ਸੰਮਤ ੧੭੬੨)',
  },
  {
    templateId: '2084-barsi-maharaja-ranjit-singh-ji',
    id: '2083-barsi-maharaja-ranjit-singh-ji',
    sambat: 2083,
    date: '2026-06-29',
    tithiRuleEn: '15 Harh, Sambat 2083 (15 Harh, Sambat 1896)',
    tithiRulePa: '੧੫ ਹਾੜ੍ਹ, ਸੰਮਤ ੨੦੮੩ (੧੫ ਹਾੜ੍ਹ, ਸੰਮਤ ੧੮੯੬)',
  },
  {
    templateId: '2084-solar-parkash-guru-hargobind-mata-ganga-ji',
    id: '2083-solar-parkash-guru-hargobind-mata-ganga-ji',
    sambat: 2083,
    date: '2026-06-30',
    tithiRuleEn: '16 Harh, Sambat 2083 (Solar Date · Lunar Harh Vadhi 6 on 6 Jul)',
    tithiRulePa: '੧੬ ਹਾੜ੍ਹ, ਸੰਮਤ ੨੦੮੩ (ਸੂਰਜੀ ਤਾਰੀਖ਼ · ਚੰਦਰ ਹਾੜ੍ਹ ਵਦੀ ੬ — ੬ ਜੁਲਾਈ)',
  },
  {
    templateId: '2084-janam-bhai-daya-singh-ji-panj-pyare',
    id: '2083-janam-bhai-daya-singh-ji-panj-pyare',
    sambat: 2083,
    date: '2026-08-26',
    tithiRuleEn: '10 Bhadon, Sambat 2083',
    tithiRulePa: '੧੦ ਭਾਦੋਂ, ਸੰਮਤ ੨੦੮੩',
  },
  {
    templateId: '2084-bhagat-bani-trilochan-beni-bhikhan-sadhna-parmanand-surdas',
    id: '2083-bhagat-bani-trilochan-beni-bhikhan-sadhna-parmanand-surdas',
    sambat: 2083,
    date: '2026-09-12',
    tithiRuleEn: '27 Bhadon, Sambat 2083 (Pehla Parkash SGGS · Mahan Kosh Note)',
    tithiRulePa: '੨੭ ਭਾਦੋਂ, ਸੰਮਤ ੨੦੮੩ (ਪਹਿਲਾ ਪ੍ਰਕਾਸ਼ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ)',
  },
  {
    templateId: '2084-bhai-satta-bhai-balwand-ji',
    id: '2083-bhai-satta-bhai-balwand-ji',
    sambat: 2083,
    date: '2026-09-12',
    tithiRuleEn: '27 Bhadon, Sambat 2083 (Pehla Parkash SGGS · Mahan Kosh Note)',
    tithiRulePa: '੨੭ ਭਾਦੋਂ, ਸੰਮਤ ੨੦੮੩ (ਪਹਿਲਾ ਪ੍ਰਕਾਸ਼ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ)',
  },
  {
    templateId: '2084-janam-baba-sri-chand-ji-bhai-kanhaiya-ji',
    id: '2083-janam-baba-sri-chand-ji-bhai-kanhaiya-ji',
    sambat: 2083,
    date: '2026-09-20',
    tithiRuleEn: '4 Assu, Sambat 2083 (Bhadon Sudhi 9 tradition also noted)',
    tithiRulePa: '੪ ਅੱਸੂ, ਸੰਮਤ ੨੦੮੩ (ਭਾਦੋਂ ਸੁਦੀ ੯ ਪਰੰਪਰਾ ਸਮੇਤ)',
  },
  {
    templateId: '2084-baba-sundar-ji-ramkali-sadd',
    id: '2083-baba-sundar-ji-ramkali-sadd',
    sambat: 2083,
    date: '2026-09-26',
    tithiRuleEn: 'Bhadon Puranmashi (10 Assu, Sambat 2083 · Guru Amar Das Ji Joti Jot)',
    tithiRulePa: 'ਭਾਦੋਂ ਪੂਰਨਮਾਸ਼ੀ (੧੦ ਅੱਸੂ, ਸੰਮਤ ੨੦੮੩ · ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ ਜੋਤੀ ਜੋਤ)',
  },
  {
    templateId: '2084-guru-nanak-parivar-bebe-nanaki-mata-sulakhni-baba-lakhmi-das',
    id: '2083-guru-nanak-parivar-bebe-nanaki-mata-sulakhni-baba-lakhmi-das',
    sambat: 2083,
    date: '2026-10-05',
    tithiRuleEn: '19 Assu, Sambat 2083 (On Sri Guru Nanak Dev Ji Joti Jot)',
    tithiRulePa: '੧੯ ਅੱਸੂ, ਸੰਮਤ ੨੦੮੩ (ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਜੋਤੀ ਜੋਤ ਦਿਹਾੜੇ)',
  },

  // =========================================================================
  // SAMBAT 2084 PARITY BACKFILL (Assu 2084 – Phagun 2084)
  // =========================================================================
  {
    templateId: '2083-bhog-dussehra-mahattam',
    id: '2084-bhog-dussehra-mahattam',
    sambat: 2084,
    date: '2027-10-09',
    tithiRuleEn: 'Assu Sudhi 9 (23 Assu, Sambat 2084)',
    tithiRulePa: 'ਅੱਸੂ ਸੁਦੀ ੯ (੨੩ ਅੱਸੂ, ਸੰਮਤ ੨੦੮੪)',
  },
  {
    templateId: '2083-janam-baba-budha-ji',
    id: '2084-janam-baba-budha-ji',
    sambat: 2084,
    date: '2027-10-12',
    tithiRuleEn: 'Assu Sudhi 12 (26 Assu, Sambat 2084)',
    tithiRulePa: 'ਅੱਸੂ ਸੁਦੀ ੧੨ (੨੬ ਅੱਸੂ, ਸੰਮਤ ੨੦੮੪)',
    subGroups: ['gursikh'],
  },
  {
    templateId: '2083-saka-sri-panja-sahib',
    id: '2084-saka-sri-panja-sahib',
    sambat: 2084,
    date: '2027-10-20',
    tithiRuleEn: 'Katak Vadhi 5 (3 Katak, Sambat 2084)',
    tithiRulePa: 'ਕੱਤਕ ਵਦੀ ੫ (੩ ਕੱਤਕ, ਸੰਮਤ ੨੦੮੪)',
    subGroups: ['gursikh'],
  },
  {
    templateId: '2083-shaheedi-bhai-beant-singh-ji',
    id: '2084-shaheedi-bhai-beant-singh-ji',
    sambat: 2084,
    date: '2027-10-21',
    tithiRuleEn: 'Katak Vadhi 6 (4 Katak, Sambat 2084)',
    tithiRulePa: 'ਕੱਤਕ ਵਦੀ ੬ (੪ ਕੱਤਕ, ਸੰਮਤ ੨੦੮੪)',
    subGroups: ['gursikh'],
  },
  {
    templateId: '2083-barsi-sant-baba-ajit-singh-patna',
    id: '2084-barsi-sant-baba-ajit-singh-patna',
    sambat: 2084,
    date: '2027-10-21',
    tithiRuleEn: 'Katak Vadhi 6 (4 Katak, Sambat 2084)',
    tithiRulePa: 'ਕੱਤਕ ਵਦੀ ੬ (੪ ਕੱਤਕ, ਸੰਮਤ ੨੦੮੪)',
  },
  {
    templateId: '2083-barsi-mahakavi-bhai-santokh-singh',
    id: '2084-barsi-mahakavi-bhai-santokh-singh',
    sambat: 2084,
    date: '2027-10-25',
    tithiRuleEn: 'Katak Vadhi 11 (8 Katak, Sambat 2084)',
    tithiRulePa: 'ਕੱਤਕ ਵਦੀ ੧੧ (੮ ਕੱਤਕ, ਸੰਮਤ ੨੦੮੪)',
    subGroups: ['gursikh'],
  },
  {
    templateId: '2083-barsi-baba-mitt-singh-ji',
    id: '2084-barsi-baba-mitt-singh-ji',
    sambat: 2084,
    date: '2027-10-28',
    tithiRuleEn: 'Katak Vadhi 14 (11 Katak, Sambat 2084)',
    tithiRulePa: 'ਕੱਤਕ ਵਦੀ ੧੪ (੧੧ ਕੱਤਕ, ਸੰਮਤ ੨੦੮੪)',
  },
  {
    templateId: '2083-barsi-sant-jwala-singh-harkhowal',
    id: '2084-barsi-sant-jwala-singh-harkhowal',
    sambat: 2084,
    date: '2027-11-02',
    tithiRuleEn: 'Katak Sudhi 4 (16 Katak, Sambat 2084)',
    tithiRulePa: 'ਕੱਤਕ ਸੁਦੀ ੪ (੧੬ ਕੱਤਕ, ਸੰਮਤ ੨੦੮੪)',
  },
  {
    templateId: '2083-janam-bhagat-namdev-ji',
    id: '2084-janam-bhagat-namdev-ji',
    sambat: 2084,
    date: '2027-11-10',
    tithiRuleEn: 'Katak Sudhi 11 (24 Katak, Sambat 2084)',
    tithiRulePa: 'ਕੱਤਕ ਸੁਦੀ ੧੧ (੨੪ ਕੱਤਕ, ਸੰਮਤ ੨੦੮੪)',
    subGroups: ['bhagat-bhatt'],
  },
  {
    templateId: '2083-shaheedi-baba-deep-singh-ji',
    id: '2084-shaheedi-baba-deep-singh-ji',
    sambat: 2084,
    date: '2027-11-16',
    tithiRuleEn: '30 Katak, Sambat 2084 (Sri Amritsar Sahib, 1757)',
    tithiRulePa: '੩੦ ਕੱਤਕ, ਸੰਮਤ ੨੦੮੪ (ਸ੍ਰੀ ਅੰਮ੍ਰਿਤਸਰ ਸਾਹਿਬ, ੧੭੫੭)',
    subGroups: ['gursikh'],
  },
  {
    templateId: '2083-barsi-sant-giani-mohan-singh-bhindranwale',
    id: '2084-barsi-sant-giani-mohan-singh-bhindranwale',
    sambat: 2084,
    date: '2027-11-23',
    tithiRuleEn: 'Maghar Vadhi 10 (7 Maghar, Sambat 2084)',
    tithiRulePa: 'ਮੱਘਰ ਵਦੀ ੧੦ (੭ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੪)',
  },
  {
    templateId: '2083-bhagat-sain-ji',
    id: '2084-bhagat-sain-ji',
    sambat: 2084,
    date: '2027-11-25',
    tithiRuleEn: 'Maghar Vadhi 12 (9 Maghar, Sambat 2084 · Traditional)',
    tithiRulePa: 'ਮੱਘਰ ਵਦੀ ੧੨ (੯ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੪)',
  },
  {
    templateId: '2083-janam-dr-bhai-vir-singh-ji',
    id: '2084-janam-dr-bhai-vir-singh-ji',
    sambat: 2084,
    date: '2027-11-25',
    tithiRuleEn: 'Maghar Vadhi 12 (9 Maghar, Sambat 2084)',
    tithiRulePa: 'ਮੱਘਰ ਵਦੀ ੧੨ (੯ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੪)',
    subGroups: ['gursikh'],
  },
  {
    templateId: '2083-barsi-sant-teja-singh-rara-sahib',
    id: '2084-barsi-sant-teja-singh-rara-sahib',
    sambat: 2084,
    date: '2027-11-29',
    tithiRuleEn: 'Maghar Sudhi 1 (13 Maghar, Sambat 2084)',
    tithiRulePa: 'ਮੱਘਰ ਸੁਦੀ ੧ (੧੩ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੪)',
  },
  {
    templateId: '2083-gurgaddi-guru-gobind-singh-ji',
    id: '2084-gurgaddi-guru-gobind-singh-ji',
    sambat: 2084,
    date: '2027-12-01',
    tithiRuleEn: 'Maghar Sudhi 3 (15 Maghar, Sambat 2084)',
    tithiRulePa: 'ਮੱਘਰ ਸੁਦੀ ੩ (੧੫ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੪)',
  },
  {
    templateId: '2083-janam-sahibzada-baba-zorawar-singh-ji',
    id: '2084-janam-sahibzada-baba-zorawar-singh-ji',
    sambat: 2084,
    date: '2027-12-01',
    tithiRuleEn: '15 Maghar, Sambat 2084',
    tithiRulePa: '੧੫ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੪',
  },
  {
    templateId: '2083-joti-jot-baba-budha-ji',
    id: '2084-joti-jot-baba-budha-ji',
    sambat: 2084,
    date: '2027-12-03',
    tithiRuleEn: '17 Maghar, Sambat 2084 (Maghar Sudhi 4 tradition)',
    tithiRulePa: '੧੭ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੪ (ਮੱਘਰ ਸੁਦੀ ੪ ਪਰੰਪਰਾ)',
  },
  {
    templateId: '2083-shaheedi-bhai-mati-das-sati-das-dayala-ji',
    id: '2084-shaheedi-bhai-mati-das-sati-das-dayala-ji',
    sambat: 2084,
    date: '2027-12-03',
    tithiRuleEn: 'Maghar Sudhi 5 (17 Maghar, Sambat 2084 · Chandni Chowk)',
    tithiRulePa: 'ਮੱਘਰ ਸੁਦੀ ੫ (੧੭ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੪ · ਚਾਂਦਨੀ ਚੌਕ)',
  },
  {
    templateId: '2083-joti-jot-bhai-mardana-ji',
    id: '2084-joti-jot-bhai-mardana-ji',
    sambat: 2084,
    date: '2027-12-05',
    tithiRuleEn: '19 Maghar, Sambat 2084 (Maghar Vadhi 11 tradition)',
    tithiRulePa: '੧੯ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੪ (ਮੱਘਰ ਵਦੀ ੧੧ ਪਰੰਪਰਾ)',
  },
  {
    templateId: '2083-janam-bhai-sahib-singh-ji-panj-pyare',
    id: '2084-janam-bhai-sahib-singh-ji-panj-pyare',
    sambat: 2084,
    date: '2027-12-08',
    tithiRuleEn: '22 Maghar, Sambat 2084',
    tithiRulePa: '੨੨ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੪',
  },
  {
    templateId: '2083-janam-baba-atal-sahib-ji',
    id: '2084-janam-baba-atal-sahib-ji',
    sambat: 2084,
    date: '2027-12-11',
    tithiRuleEn: 'Maghar Sudhi 13 (25 Maghar, Sambat 2084)',
    tithiRulePa: 'ਮੱਘਰ ਸੁਦੀ ੧੩ (੨੫ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੪)',
    subGroups: ['guru-ghar'],
  },
  {
    templateId: '2083-mata-sundri-ji-remembrance',
    id: '2084-mata-sundri-ji-remembrance',
    sambat: 2084,
    date: '2027-12-11',
    tithiRuleEn: 'Maghar Remembrance (25 Maghar, Sambat 2084 · Mahan Kosh Note)',
    tithiRulePa: 'ਮੱਘਰ ਯਾਦਗਾਰ (੨੫ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੪)',
  },
  {
    templateId: '2083-barsi-sant-baba-thakur-singh-ji',
    id: '2084-barsi-sant-baba-thakur-singh-ji',
    sambat: 2084,
    date: '2027-12-14',
    tithiRuleEn: 'Poh Vadhi 1 (28 Maghar, Sambat 2084)',
    tithiRulePa: 'ਪੋਹ ਵਦੀ ੧ (੨੮ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੪)',
  },
  {
    templateId: '2083-janam-sahibzada-baba-fateh-singh-ji',
    id: '2084-janam-sahibzada-baba-fateh-singh-ji',
    sambat: 2084,
    date: '2027-12-15',
    tithiRuleEn: '29 Maghar, Sambat 2084 (11 Phagun alternate tradition noted)',
    tithiRulePa: '੨੯ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੪ (੧੧ ਫੱਗਣ ਪਰੰਪਰਾ ਸਮੇਤ)',
  },
  {
    templateId: '2083-joti-jot-mata-jito-ji',
    id: '2084-joti-jot-mata-jito-ji',
    sambat: 2084,
    date: '2027-12-20',
    tithiRuleEn: '5 Poh, Sambat 2084 (Poh Sudhi 5, Sambat 1757)',
    tithiRulePa: '੫ ਪੋਹ, ਸੰਮਤ ੨੦੮੪ (ਪੋਹ ਸੁਦੀ ੫, ਸੰਮਤ ੧੭੫੭)',
  },
  {
    templateId: '2083-shaheedi-hafta-anandpur-qila-chhodna',
    id: '2084-shaheedi-hafta-anandpur-qila-chhodna',
    sambat: 2084,
    date: '2027-12-21',
    tithiRuleEn: '6 Poh, Sambat 2084 (Night of 6–7 Poh, Sambat 1761)',
    tithiRulePa: '੬ ਪੋਹ, ਸੰਮਤ ੨੦੮੪ (੬–੭ ਪੋਹ ਦੀ ਰਾਤ, ਸੰਮਤ ੧੭੬੧)',
  },
  {
    templateId: '2083-barsi-sant-kishan-singh-rara-sahib',
    id: '2084-barsi-sant-kishan-singh-rara-sahib',
    sambat: 2084,
    date: '2027-12-21',
    tithiRuleEn: 'Poh Vadhi 9 (6 Poh, Sambat 2084)',
    tithiRulePa: 'ਪੋਹ ਵਦੀ ੯ (੬ ਪੋਹ, ਸੰਮਤ ੨੦੮੪)',
  },
  {
    templateId: '2083-shaheedi-jathedar-gurdev-singh-kaunke',
    id: '2084-shaheedi-jathedar-gurdev-singh-kaunke',
    sambat: 2084,
    date: '2027-12-21',
    tithiRuleEn: 'Poh Vadhi 9 (6 Poh, Sambat 2084)',
    tithiRulePa: 'ਪੋਹ ਵਦੀ ੯ (੬ ਪੋਹ, ਸੰਮਤ ੨੦੮੪)',
    subGroups: ['gursikh'],
  },
  {
    templateId: '2083-shaheedi-hafta-sarsa-nadi-uday-bachittar-singh',
    id: '2084-shaheedi-hafta-sarsa-nadi-uday-bachittar-singh',
    sambat: 2084,
    date: '2027-12-22',
    tithiRuleEn: '7 Poh, Sambat 2084 (Parivar Vichhora & Shahi Tibbi)',
    tithiRulePa: '੭ ਪੋਹ, ਸੰਮਤ ੨੦੮੪ (ਪਰਿਵਾਰ ਵਿਛੋੜਾ ਅਤੇ ਸ਼ਾਹੀ ਟਿੱਬੀ)',
  },
  {
    templateId: '2083-shaheedi-panj-pyare-chamkaur',
    id: '2084-shaheedi-panj-pyare-chamkaur',
    sambat: 2084,
    date: '2027-12-23',
    tithiRuleEn: '8 Poh, Sambat 2084 (Battle of Sri Chamkaur Sahib)',
    tithiRulePa: '੮ ਪੋਹ, ਸੰਮਤ ੨੦੮੪ (ਗੜ੍ਹੀ ਸ੍ਰੀ ਚਮਕੌਰ ਸਾਹਿਬ)',
  },
  {
    templateId: '2083-barsi-sant-harnam-singh-rampur-khera',
    id: '2084-barsi-sant-harnam-singh-rampur-khera',
    sambat: 2084,
    date: '2027-12-24',
    tithiRuleEn: 'Poh Vadhi 12 (9 Poh, Sambat 2084)',
    tithiRulePa: 'ਪੋਹ ਵਦੀ ੧੨ (੯ ਪੋਹ, ਸੰਮਤ ੨੦੮੪)',
  },
  {
    templateId: '2083-shaheedi-bhai-satwant-singh-kehar-singh',
    id: '2084-shaheedi-bhai-satwant-singh-kehar-singh',
    sambat: 2084,
    date: '2027-12-26',
    tithiRuleEn: 'Poh Vadhi 14 (11 Poh, Sambat 2084)',
    tithiRulePa: 'ਪੋਹ ਵਦੀ ੧੪ (੧੧ ਪੋਹ, ਸੰਮਤ ੨੦੮੪)',
    subGroups: ['gursikh'],
  },
  {
    templateId: '2083-barsi-baba-hazura-singh-hazur-sahib',
    id: '2084-barsi-baba-hazura-singh-hazur-sahib',
    sambat: 2084,
    date: '2028-01-01',
    tithiRuleEn: 'Poh Sudhi 4 (17 Poh, Sambat 2084)',
    tithiRulePa: 'ਪੋਹ ਸੁਦੀ ੪ (੧੭ ਪੋਹ, ਸੰਮਤ ੨੦੮੪)',
  },
  {
    templateId: '2083-basant-ruth-arambh',
    id: '2084-basant-ruth-arambh',
    sambat: 2084,
    date: '2028-01-02',
    tithiRuleEn: 'Poh Sudhi 5 (18 Poh, Sambat 2084)',
    tithiRulePa: 'ਪੋਹ ਸੁਦੀ ੫ (੧੮ ਪੋਹ, ਸੰਮਤ ੨੦੮੪)',
  },
  {
    templateId: '2083-barsi-baba-daya-singh-sursingh',
    id: '2084-barsi-baba-daya-singh-sursingh',
    sambat: 2084,
    date: '2028-01-08',
    tithiRuleEn: 'Poh Sudhi 11 (24 Poh, Sambat 2084)',
    tithiRulePa: 'ਪੋਹ ਸੁਦੀ ੧੧ (੨੪ ਪੋਹ, ਸੰਮਤ ੨੦੮੪)',
  },
  {
    templateId: '2083-barsi-sant-attar-singh-reru-sahib',
    id: '2084-barsi-sant-attar-singh-reru-sahib',
    sambat: 2084,
    date: '2028-01-12',
    tithiRuleEn: 'Poh Puranmashi (28 Poh, Sambat 2084)',
    tithiRulePa: 'ਪੋਹ ਪੂਰਨਮਾਸ਼ੀ (੨੮ ਪੋਹ, ਸੰਮਤ ੨੦੮੪)',
  },
  {
    templateId: '2083-bhagat-ramanand-ji',
    id: '2084-bhagat-ramanand-ji',
    sambat: 2084,
    date: '2028-01-18',
    tithiRuleEn: 'Magh Vadhi 7 (4 Magh, Sambat 2084 · Traditional)',
    tithiRulePa: 'ਮਾਘ ਵਦੀ ੭ (੪ ਮਾਘ, ਸੰਮਤ ੨੦੮੪)',
  },
  {
    templateId: '2083-barsi-sant-attar-singh-mastuana',
    id: '2084-barsi-sant-attar-singh-mastuana',
    sambat: 2084,
    date: '2028-01-21',
    tithiRuleEn: 'Magh Vadhi 10 (7 Magh, Sambat 2084)',
    tithiRulePa: 'ਮਾਘ ਵਦੀ ੧੦ (੭ ਮਾਘ, ਸੰਮਤ ੨੦੮੪)',
  },
  {
    templateId: '2083-janam-bibi-bhani-ji',
    id: '2084-janam-bibi-bhani-ji',
    sambat: 2084,
    date: '2028-01-23',
    tithiRuleEn: 'Magh Vadhi 12 (9 Magh, Sambat 2084 · Mahan Kosh)',
    tithiRulePa: 'ਮਾਘ ਵਦੀ ੧੨ (੯ ਮਾਘ, ਸੰਮਤ ੨੦੮੪ · ਮਹਾਨ ਕੋਸ਼)',
  },
  {
    templateId: '2083-janam-baba-deep-singh-ji',
    id: '2084-janam-baba-deep-singh-ji',
    sambat: 2084,
    date: '2028-01-28',
    tithiRuleEn: '14 Magh, Sambat 2084 (Pahuwind, 1738 Bikrami)',
    tithiRulePa: '੧੪ ਮਾਘ, ਸੰਮਤ ੨੦੮੪ (ਪਹੂਵਿੰਡ, ੧੭੩੮ ਬਿਕ੍ਰਮੀ)',
    subGroups: ['gursikh'],
  },
  {
    templateId: '2083-basant-panchmi',
    id: '2084-basant-panchmi',
    sambat: 2084,
    date: '2028-01-31',
    tithiRuleEn: 'Magh Sudhi 5 (Panchmi · 17 Magh, Sambat 2084)',
    tithiRulePa: 'ਮਾਘ ਸੁਦੀ ੫ (ਪੰਚਮੀ · ੧੭ ਮਾਘ, ਸੰਮਤ ੨੦੮੪)',
  },
  {
    templateId: '2083-janam-sahibzada-baba-ajit-singh-ji',
    id: '2084-janam-sahibzada-baba-ajit-singh-ji',
    sambat: 2084,
    date: '2028-01-31',
    tithiRuleEn: 'Magh Sudhi 5 (17 Magh, Sambat 2084)',
    tithiRulePa: 'ਮਾਘ ਸੁਦੀ ੫ (੧੭ ਮਾਘ, ਸੰਮਤ ੨੦੮੪)',
    subGroups: ['guru-ghar'],
  },
  {
    templateId: '2083-barsi-sant-sundar-singh-bhindranwale',
    id: '2084-barsi-sant-sundar-singh-bhindranwale',
    sambat: 2084,
    date: '2028-02-06',
    tithiRuleEn: 'Magh Sudhi 10 (23 Magh, Sambat 2084)',
    tithiRulePa: 'ਮਾਘ ਸੁਦੀ ੧੦ (੨੩ ਮਾਘ, ਸੰਮਤ ੨੦੮੪)',
  },
  {
    templateId: '2083-saka-sri-nankana-sahib',
    id: '2084-saka-sri-nankana-sahib',
    sambat: 2084,
    date: '2028-02-21',
    tithiRuleEn: '9 Phagun, Sambat 2084 (21 Feb 1921)',
    tithiRulePa: '੯ ਫੱਗਣ, ਸੰਮਤ ੨੦੮੪ (੨੧ ਫ਼ਰਵਰੀ ੧੯੨੧)',
    subGroups: ['gursikh'],
  },
  {
    templateId: '2083-delhi-fateh-baba-baghel-singh-jassa-singh-ahluwalia',
    id: '2084-delhi-fateh-baba-baghel-singh-jassa-singh-ahluwalia',
    sambat: 2084,
    date: '2028-03-11',
    tithiRuleEn: '28 Phagun, Sambat 2084 (11 March 1783 / Sambat 1839)',
    tithiRulePa: '੨੮ ਫੱਗਣ, ਸੰਮਤ ੨੦੮੪ (੧੧ ਮਾਰਚ ੧੭੮੩ / ਸੰਮਤ ੧੮੩੯)',
  },
];

/**
 * Builds complete, non-duplicative parity events across Sambat 2082, 2083, and 2084
 * from verified Puratan Bikrami templates while keeping every Sambat year & date accurate.
 */
export function buildParityBackfillEvents(
  sourceEvents: readonly HistoricalEvent[],
): HistoricalEvent[] {
  const byId = new Map<string, HistoricalEvent>();
  for (const ev of sourceEvents) {
    byId.set(ev.id, ev);
  }

  const results: HistoricalEvent[] = [];
  for (const spec of PARITY_SPECS) {
    if (byId.has(spec.id)) continue;
    const template = byId.get(spec.templateId);
    if (!template) continue;

    const readableGreg = formatGregorianReadable(spec.date);
    const summaryEn = replaceSambatInText(template.summaryEn, template.sambat, spec.sambat);
    const summaryPa = replaceSambatInText(template.summaryPa, template.sambat, spec.sambat);
    const baseContextEn = replaceSambatInText(
      template.historicalContextEn,
      template.sambat,
      spec.sambat,
    );
    const baseContextPa = replaceSambatInText(
      template.historicalContextPa,
      template.sambat,
      spec.sambat,
    );

    const monthHint = BIKRAMI_MONTHS.find((m) => spec.tithiRuleEn.includes(m.nameEn));
    const datePrefixEn = `Observed in Bikrami Sambat ${spec.sambat} on ${readableGreg} (${spec.tithiRuleEn}). `;
    const datePrefixPa = `ਬਿਕ੍ਰਮੀ ਸੰਮਤ ${toGurmukhi(spec.sambat)} ਵਿੱਚ ${spec.tithiRulePa} (${readableGreg}) ਨੂੰ ਮਨਾਇਆ ਜਾਂਦਾ ਹੈ। `;

    results.push({
      ...template,
      id: spec.id,
      date: spec.date,
      sambat: spec.sambat,
      category: spec.category ?? template.category,
      subGroups: spec.subGroups ?? template.subGroups,
      tithiRuleEn: spec.tithiRuleEn,
      tithiRulePa: spec.tithiRulePa,
      summaryEn: monthHint ? summaryEn : summaryEn,
      summaryPa,
      historicalContextEn: `${datePrefixEn}${baseContextEn}`,
      historicalContextPa: `${datePrefixPa}${baseContextPa}`,
    });
  }

  return results;
}
