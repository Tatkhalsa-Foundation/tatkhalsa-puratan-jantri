import {POTHI_BARAH_MAHA_URL} from './sambatData';
import type {HistoricalEvent} from './types';

/**
 * Complete Puratan Bikrami historical observances for:
 * 1) Full Sambat 2082 (14 Mar 2025 – 13 Mar 2026 · Chet through Phagun)
 * 2) Sambat 2083 Chet–Assu Backfill (14 Mar 2026 – 16 Oct 2026) + Katak Vadhi 2 (27 Oct 2026)
 *
 * Every lunar date is verified against `computeLunarInfoForDate()` (Purnimanta Udaya tithi at Sri Amritsar / Anandpur Sahib),
 * and every solar date matches the sidereal Sankranti spans in `sambatData.ts`.
 * Zero fixed Nanakshahi dates and zero astrology/rashifal/muhurat entries.
 */
export const SAMBAT_2082_AND_2083_EVENTS: readonly HistoricalEvent[] = [
  // =========================================================================
  // SAMBAT 2082 (Full Year: 14 Mar 2025 – 13 Mar 2026)
  // =========================================================================
  {
    id: '2082-chet-sangrand-new-year',
    date: '2025-03-14',
    sambat: 2082,
    category: 'khalsa',
    titleEn: 'Chet Sangrand — Bikrami New Year (Sambat 2082) & Shaheedi Akali Baba Phula Singh Ji',
    titlePa: 'ਚੇਤ ਸੰਗਰਾਂਦ — ਬਿਕ੍ਰਮੀ ਨਵਾਂ ਸਾਲ (ਸੰਮਤ ੨੦੮੨) ਅਤੇ ਸ਼ਹੀਦੀ ਅਕਾਲੀ ਬਾਬਾ ਫੂਲਾ ਸਿੰਘ ਜੀ',
    shortLabelEn: 'Chet Sangrand 2082',
    shortLabelPa: 'ਚੇਤ ਸੰਗਰਾਂਦ ੨੦੮੨',
    tithiRuleEn: '1 Chet, Sambat 2082 (Meena Sankranti)',
    tithiRulePa: '੧ ਚੇਤ, ਸੰਮਤ ੨੦੮੨ (ਮੀਨ ਸੰਕ੍ਰਾਂਤੀ)',
    summaryEn:
      'Opening of Bikrami Sambat 2082 with Barah Maha Majh ("Chet Govind Aradhiye") and Shaheedi remembrance of Jathedar Akali Baba Phula Singh Ji (Battle of Naushehra, 1823).',
    summaryPa:
      'ਬਾਰਹ ਮਾਹਾ ਮਾਂਝ ("ਚੇਤਿ ਗੋਵਿੰਦੁ ਅਰਾਧੀਐ") ਨਾਲ ਬਿਕ੍ਰਮੀ ਸੰਮਤ ੨੦੮੨ ਦਾ ਆਰੰਭ ਅਤੇ ਜਥੇਦਾਰ ਅਕਾਲੀ ਬਾਬਾ ਫੂਲਾ ਸਿੰਘ ਜੀ (ਨੌਸ਼ਹਿਰਾ ਜੰਗ, ੧੮੨੩) ਦੀ ਸ਼ਹੀਦੀ ਯਾਦ।',
    historicalContextEn:
      'In Puratan Sikh chronology, the year commences on 1 Chet at true Meena Sankranti. On 1 Chet 1880 Bikrami (14 March 1823), Jathedar of Sri Akal Takhat Sahib and Budha Dal Akali Baba Phula Singh Ji attained shaheedi leading the Khalsa charge at Naushehra.',
    historicalContextPa:
      'ਪੁਰਾਤਨ ਸਿੱਖ ਕਾਲਗਣਨਾ ਅਨੁਸਾਰ ਨਵਾਂ ਬਿਕ੍ਰਮੀ ਸਾਲ ੧ ਚੇਤ ਨੂੰ ਆਰੰਭ ਹੁੰਦਾ ਹੈ। ੧ ਚੇਤ ੧੮੮੦ ਬਿਕ੍ਰਮੀ (੧੪ ਮਾਰਚ ੧੮੨੩) ਨੂੰ ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਦੇ ਜਥੇਦਾਰ ਅਕਾਲੀ ਬਾਬਾ ਫੂਲਾ ਸਿੰਘ ਜੀ ਨੌਸ਼ਹਿਰਾ ਦੀ ਜੰਗ ਵਿੱਚ ਸ਼ਹੀਦ ਹੋਏ।',
    subGroups: ['gursikh'],
    pothiUrl: POTHI_BARAH_MAHA_URL,
    pothiLabelEn: 'Read Barah Maha Majh on Pothi Sahib',
    pothiLabelPa: 'ਪੋਥੀ ਸਾਹਿਬ ’ਤੇ ਬਾਰਹ ਮਾਹਾ ਮਾਂਝ ਪੜ੍ਹੋ',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji (Barah Maha Majh)',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਬਾਰਹ ਮਾਹਾ ਮਾਂਝ)',
        referenceEn: 'Ang 133 · Chet Govind Aradhiye',
        referencePa: 'ਅੰਗ ੧੩੩ · ਚੇਤਿ ਗੋਵਿੰਦੁ ਅਰਾਧੀਐ',
        excerptPa: 'ਚੇਤਿ ਗੋਵਿੰਦੁ ਅਰਾਧੀਐ ਹੋਵੈ ਅਨੰਦੁ ਘਣਾ ॥',
        excerptTranslit: 'Chet Govind araadheeai hovai anand ghanaa.',
        pothiUrl: POTHI_BARAH_MAHA_URL,
      },
      {
        sourceEn: 'Prachin Panth Prakash (Bhai Rattan Singh Bhangu)',
        sourcePa: 'ਪ੍ਰਾਚੀਨ ਪੰਥ ਪ੍ਰਕਾਸ਼ (ਭਾਈ ਰਤਨ ਸਿੰਘ ਭੰਗੂ)',
        referenceEn: 'Akal Takhat & Budha Dal Chronicle · 1 Chet 1880 Bikrami',
        referencePa: 'ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਅਤੇ ਬੁੱਢਾ ਦਲ ਇਤਿਹਾਸ · ੧ ਚੇਤ ੧੮੮੦ ਬਿਕ੍ਰਮੀ',
      },
    ],
    featured: true,
  },
  {
    id: '2082-holla-mohalla',
    date: '2025-03-15',
    sambat: 2082,
    category: 'khalsa',
    titleEn: 'Holla Mohalla (Sri Anandpur Sahib)',
    titlePa: 'ਹੋਲਾ ਮਹੱਲਾ (ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ)',
    shortLabelEn: 'Holla Mohalla',
    shortLabelPa: 'ਹੋਲਾ ਮਹੱਲਾ',
    tithiRuleEn: 'Chet Vadhi 1 (2 Chet, Sambat 2082)',
    tithiRulePa: 'ਚੇਤ ਵਦੀ ੧ (੨ ਚੇਤ, ਸੰਮਤ ੨੦੮੨)',
    summaryEn:
      'Khalsa martial gathering instituted by Sri Guru Gobind Singh Ji at Qila Holgarh, Sri Anandpur Sahib on Chet Vadhi 1.',
    summaryPa:
      'ਸ੍ਰੀ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਵੱਲੋਂ ਕਿਲ੍ਹਾ ਹੋਲਗੜ੍ਹ, ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਵਿਖੇ ਚੇਤ ਵਦੀ ੧ ਨੂੰ ਸਥਾਪਿਤ ਖ਼ਾਲਸਾਈ ਹੋਲਾ ਮਹੱਲਾ।',
    historicalContextEn:
      'First inaugurated on Chet Vadhi 1, Sambat 1757 Bikrami (1701 CE) at Holgarh Fort in Sri Anandpur Sahib, Holla Mohalla celebrates Khalsa martial readiness, Shastar Vidya, Gatka, horsemanship, and Gurbani kirtan.',
    historicalContextPa:
      'ਸੰਮਤ ੧੭੫੭ ਬਿਕ੍ਰਮੀ ਦੀ ਚੇਤ ਵਦੀ ੧ ਨੂੰ ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਦੇ ਕਿਲ੍ਹਾ ਹੋਲਗੜ੍ਹ ਵਿਖੇ ਦਸਮੇਸ਼ ਪਿਤਾ ਜੀ ਨੇ ਖ਼ਾਲਸੇ ਦੇ ਜੰਗੀ ਅਭਿਆਸ ਅਤੇ ਸ਼ਸਤਰ ਵਿੱਦਿਆ ਲਈ ਹੋਲਾ ਮਹੱਲਾ ਆਰੰਭ ਕੀਤਾ।',
    subGroups: ['gursikh'],
    citations: [
      {
        sourceEn: 'Sri Gur Pratap Suraj Granth',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ',
        referenceEn: 'Rut 4, Ansu 20–24 · Holgarh Fort, Sri Anandpur Sahib',
        referencePa: 'ਰੁੱਤ ੪, ਅੰਸੂ ੨੦–੨੪ · ਕਿਲ੍ਹਾ ਹੋਲਗੜ੍ਹ, ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ',
      },
    ],
    featured: true,
  },
  {
    id: '2082-joti-jot-baba-gurditta-ji',
    date: '2025-04-07',
    sambat: 2082,
    category: 'khalsa',
    titleEn: 'Joti Jot — Baba Gurditta Ji & Guru Hargobind Sahib Ji Parivar',
    titlePa: 'ਜੋਤੀ ਜੋਤ — ਬਾਬਾ ਗੁਰਦਿੱਤਾ ਜੀ ਅਤੇ ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਦਾ ਪਰਿਵਾਰ',
    shortLabelEn: 'Baba Gurditta Ji',
    shortLabelPa: 'ਬਾਬਾ ਗੁਰਦਿੱਤਾ ਜੀ',
    tithiRuleEn: 'Chet Sudhi 10 (25 Chet, Sambat 2082)',
    tithiRulePa: 'ਚੇਤ ਸੁਦੀ ੧੦ (੨੫ ਚੇਤ, ਸੰਮਤ ੨੦੮੨)',
    summaryEn:
      'Commemoration of Baba Gurditta Ji (founder of Kiratpur Sahib) alongside Bibi Viro Ji, Baba Ani Rai Ji, Baba Suraj Mal Ji, and Baba Atal Rai Ji.',
    summaryPa:
      'ਸ੍ਰੀ ਕੀਰਤਪੁਰ ਸਾਹਿਬ ਦੇ ਬਾਨੀ ਬਾਬਾ ਗੁਰਦਿੱਤਾ ਜੀ ਸਮੇਤ ਬੀਬੀ ਵੀਰੋ ਜੀ, ਬਾਬਾ ਅਣੀ ਰਾਇ ਜੀ, ਬਾਬਾ ਸੂਰਜ ਮੱਲ ਜੀ ਅਤੇ ਬਾਬਾ ਅਟੱਲ ਰਾਇ ਜੀ ਦੀ ਯਾਦ।',
    historicalContextEn:
      'Baba Gurditta Ji merged into the Eternal Light at Kiratpur Sahib on Chet Sudhi 10, Sambat 1695 Bikrami (1638 CE). His son Sri Guru Har Rai Sahib Ji later succeeded to the Guruship.',
    historicalContextPa:
      'ਬਾਬਾ ਗੁਰਦਿੱਤਾ ਜੀ ਚੇਤ ਸੁਦੀ ੧੦ ਸੰਮਤ ੧੬੯੫ ਬਿਕ੍ਰਮੀ ਨੂੰ ਸ੍ਰੀ ਕੀਰਤਪੁਰ ਸਾਹਿਬ ਵਿਖੇ ਜੋਤੀ ਜੋਤ ਸਮਾਏ।',
    subGroups: ['guru-ghar'],
    citations: [
      {
        sourceEn: 'Sri Gur Pratap Suraj Granth',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ',
        referenceEn: 'Raas 8, Ansu 33–36 · Kiratpur Sahib & Baba Gurditta Ji',
        referencePa: 'ਰਾਸਿ ੮, ਅੰਸੂ ੩੩–੩੬ · ਸ੍ਰੀ ਕੀਰਤਪੁਰ ਸਾਹਿਬ ਅਤੇ ਬਾਬਾ ਗੁਰਦਿੱਤਾ ਜੀ',
      },
    ],
  },
  {
    id: '2082-parkash-guru-arjan-dev-sahibzada-jujhar',
    date: '2025-04-09',
    sambat: 2082,
    category: 'gurpurab',
    titleEn: 'Parkash — Sri Guru Arjan Dev Ji (27 Chet) & Sahibzada Baba Jujhar Singh Ji',
    titlePa: 'ਪ੍ਰਕਾਸ਼ — ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ (੨੭ ਚੇਤ) ਅਤੇ ਸਾਹਿਬਜ਼ਾਦਾ ਬਾਬਾ ਜੁਝਾਰ ਸਿੰਘ ਜੀ',
    shortLabelEn: 'Parkash Guru Arjan Dev Ji',
    shortLabelPa: 'ਪ੍ਰਕਾਸ਼ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ',
    tithiRuleEn: '27 Chet, Sambat 2082 (Goindwal Sahib & Anandpur Sahib)',
    tithiRulePa: '੨੭ ਚੇਤ, ਸੰਮਤ ੨੦੮੨ (ਗੋਇੰਦਵਾਲ ਸਾਹਿਬ ਅਤੇ ਅਨੰਦਪੁਰ ਸਾਹਿਬ)',
    summaryEn:
      'Solar Parkash commemoration of Fifth Patshah Sri Guru Arjan Dev Ji (27 Chet 1620 Bikrami) and Sahibzada Baba Jujhar Singh Ji (1747 Bikrami).',
    summaryPa:
      'ਪੰਜਵੇਂ ਪਾਤਸ਼ਾਹ ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ (੨੭ ਚੇਤ ੧੬੨੦ ਬਿਕ੍ਰਮੀ) ਅਤੇ ਸਾਹਿਬਜ਼ਾਦਾ ਬਾਬਾ ਜੁਝਾਰ ਸਿੰਘ ਜੀ (੧੭੪੭ ਬਿਕ੍ਰਮੀ) ਦਾ ਪ੍ਰਕਾਸ਼ ਦਿਹਾੜਾ।',
    historicalContextEn:
      'Sri Guru Arjan Dev Ji manifested at Goindwal Sahib in 1563 CE (1620 Bikrami), compiled Adi Sri Guru Granth Sahib Ji, and completed Sri Harmandir Sahib. On 27 Chet 1747 Bikrami (1691 CE), Sahibzada Baba Jujhar Singh Ji was born at Sri Anandpur Sahib.',
    historicalContextPa:
      'ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਨੇ ਸ੍ਰੀ ਆਦਿ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੀ ਸੰਪਾਦਨਾ ਅਤੇ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦੀ ਉਸਾਰੀ ਕਰਵਾਈ। ੨੭ ਚੇਤ ੧੭੪੭ ਬਿਕ੍ਰਮੀ ਨੂੰ ਸਾਹਿਬਜ਼ਾਦਾ ਬਾਬਾ ਜੁਝਾਰ ਸਿੰਘ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਹੋਇਆ।',
    subGroups: ['guru-ghar'],
    citations: [
      {
        sourceEn: 'Sri Gur Pratap Suraj Granth',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ',
        referenceEn: 'Raas 2, Ansu 26 · Parkash of Sri Guru Arjan Dev Ji at Goindwal Sahib',
        referencePa: 'ਰਾਸਿ ੨, ਅੰਸੂ ੨੬ · ਗੋਇੰਦਵਾਲ ਸਾਹਿਬ ਵਿਖੇ ਪ੍ਰਕਾਸ਼ ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ',
      },
    ],
  },
  {
    id: '2082-parkash-bhagat-pipa-ji',
    date: '2025-04-12',
    sambat: 2082,
    category: 'khalsa',
    titleEn: 'Parkash Purab — Bhagat Pipa Ji',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਭਗਤ ਪੀਪਾ ਜੀ',
    shortLabelEn: 'Bhagat Pipa Ji',
    shortLabelPa: 'ਭਗਤ ਪੀਪਾ ਜੀ',
    tithiRuleEn: 'Chet Puranmashi (30 Chet, Sambat 2082)',
    tithiRulePa: 'ਚੇਤ ਪੂਰਨਮਾਸ਼ੀ (੩੦ ਚੇਤ, ਸੰਮਤ ੨੦੮੨)',
    summaryEn:
      'Commemoration of Bhagat Pipa Ji, author of the Dhanasri shabad on Ang 695 of Sri Guru Granth Sahib Ji ("Jo Brahmande Soi Pinde").',
    summaryPa:
      'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੇ ਅੰਗ ੬੯੫ ’ਤੇ ਰਾਗ ਧਨਾਸਰੀ ਸ਼ਬਦ ("ਜੋ ਬ੍ਰਹਮੰਡੇ ਸੋਈ ਪਿੰਡੇ") ਦੇ ਰਚਨਹਾਰ ਭਗਤ ਪੀਪਾ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ।',
    historicalContextEn:
      'Ruler of Gagraungarh who renounced royal privilege to seek the Divine within, Bhagat Pipa Ji taught that the cosmic Creator pervades the human heart.',
    historicalContextPa:
      'ਗਾਗਰੌਨਗੜ੍ਹ ਦੇ ਰਾਜੇ ਭਗਤ ਪੀਪਾ ਜੀ ਨੇ ਰਾਜ-ਭਾਗ ਤਿਆਗ ਕੇ ਅੰਤਰ-ਆਤਮਾ ਵਿੱਚ ਪ੍ਰਭੂ ਦੀ ਖੋਜ ਦਾ ਉਪਦੇਸ਼ ਦਿੱਤਾ।',
    subGroups: ['bhagat-bhatt'],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=695',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji (Raag Dhanasri — Bhagat Pipa Ji)',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਰਾਗ ਧਨਾਸਰੀ — ਭਗਤ ਪੀਪਾ ਜੀ)',
        referenceEn: 'Ang 695 · Jo Brahmande Soi Pinde',
        referencePa: 'ਅੰਗ ੬੯੫ · ਜੋ ਬ੍ਰਹਮੰਡੇ ਸੋਈ ਪਿੰਡੇ',
        excerptPa: 'ਜੋ ਬ੍ਰਹਮੰਡੇ ਸੋਈ ਪਿੰਡੇ ਜੋ ਖੋਜੈ ਸੋ ਪਾਵੈ ॥',
        excerptTranslit: 'Jo brahmande soee pinde jo khojai so paavai.',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=695',
      },
    ],
  },
  {
    id: '2082-vaisakhi-khalsa-sajna',
    date: '2025-04-14',
    sambat: 2082,
    category: 'khalsa',
    titleEn: 'Vaisakhi — 326th Khalsa Sajna Divas, Panj Pyare & Maharaja Ranjit Singh Raj Tilak',
    titlePa: 'ਵੈਸਾਖੀ — ੩੨੬ਵਾਂ ਖ਼ਾਲਸਾ ਸਾਜਨਾ ਦਿਵਸ, ਪੰਜ ਪਿਆਰੇ ਅਤੇ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਰਾਜ ਤਿਲਕ',
    shortLabelEn: 'Vaisakhi · Khalsa Sajna',
    shortLabelPa: 'ਵੈਸਾਖੀ · ਖ਼ਾਲਸਾ ਸਾਜਨਾ',
    tithiRuleEn: '1 Vaisakh, Sambat 2082 (Mesha Sankranti)',
    tithiRulePa: '੧ ਵੈਸਾਖ, ਸੰਮਤ ੨੦੮੨ (ਮੇਖ ਸੰਕ੍ਰਾਂਤੀ)',
    summaryEn:
      '326th anniversary of the revelation of the Khalsa Panth (1 Vaisakh 1756 Bikrami / 1699 CE) with Panj Pyare at Takhat Sri Kesgarh Sahib.',
    summaryPa:
      'ਤਖ਼ਤ ਸ੍ਰੀ ਕੇਸਗੜ੍ਹ ਸਾਹਿਬ ਵਿਖੇ ੧ ਵੈਸਾਖ ੧੭੫੬ ਬਿਕ੍ਰਮੀ (੧੬੯੯) ਨੂੰ ਪੰਜ ਪਿਆਰਿਆਂ ਸਮੇਤ ਖ਼ਾਲਸਾ ਪੰਥ ਦੀ ਸਾਜਨਾ ਦਾ ੩੨੬ਵਾਂ ਦਿਹਾੜਾ।',
    historicalContextEn:
      'On 1 Vaisakh 1756 Bikrami, Sri Guru Gobind Singh Ji administered Khande-Bate di Pahul to Bhai Daya Singh, Bhai Dharam Singh, Bhai Himmat Singh, Bhai Mohkam Singh, and Bhai Sahib Singh Ji. On 1 Vaisakh 1858 Bikrami (1801 CE), Maharaja Ranjit Singh was invested with the Raj Tilak of Sarkar-e-Khalsa.',
    historicalContextPa:
      '੧ ਵੈਸਾਖ ੧੭੫੬ ਬਿਕ੍ਰਮੀ ਨੂੰ ਸ੍ਰੀ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਨੇ ਭਾਈ ਦਇਆ ਸਿੰਘ, ਭਾਈ ਧਰਮ ਸਿੰਘ, ਭਾਈ ਹਿੰਮਤ ਸਿੰਘ, ਭਾਈ ਮੋਹਕਮ ਸਿੰਘ ਅਤੇ ਭਾਈ ਸਾਹਿਬ ਸਿੰਘ ਜੀ ਨੂੰ ਖੰਡੇ-ਬਾਟੇ ਦੀ ਪਾਹੁਲ ਬਖ਼ਸ਼ ਕੇ ਖ਼ਾਲਸਾ ਸਾਜਿਆ।',
    subGroups: ['gursikh'],
    pothiUrl: 'https://pothi.tatkhalsa.in/sundar-gutka/tav-prasad-swaiye',
    citations: [
      {
        sourceEn: 'Sri Gur Sobha (Kavi Sainapati)',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰ ਸੋਭਾ (ਕਵੀ ਸੈਨਾਪਤਿ)',
        referenceEn: 'Chapter 5 · Revelation of the Khalsa Panth on 1 Vaisakh 1756 Bikrami',
        referencePa: 'ਅਧਿਆਇ ੫ · ੧ ਵੈਸਾਖ ੧੭੫੬ ਬਿਕ੍ਰਮੀ ਖ਼ਾਲਸਾ ਪ੍ਰਗਟ ਪ੍ਰਸੰਗ',
      },
      {
        sourceEn: 'Sri Dasam Granth Sahib Ji (Khalsa Mahima)',
        sourcePa: 'ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਖ਼ਾਲਸਾ ਮਹਿਮਾ)',
        referenceEn: 'Khalsa Mero Roop Hai Khaas',
        referencePa: 'ਖਾਲਸਾ ਮੇਰੋ ਰੂਪ ਹੈ ਖਾਸ',
        excerptPa: 'ਖਾਲਸਾ ਮੇਰੋ ਰੂਪ ਹੈ ਖਾਸ ॥ ਖਾਲਸੇ ਮਹਿ ਹੌ ਕਰੌ ਨਿਵਾਸ ॥',
        excerptTranslit: 'Khaalsaa mero roop hai khaas, Khaalse meh hau karau nivaas.',
      },
    ],
    featured: true,
  },
  {
    id: '2082-parkash-guru-tegh-bahadur',
    date: '2025-04-18',
    sambat: 2082,
    category: 'gurpurab',
    titleEn: 'Parkash Purab — Sri Guru Tegh Bahadur Sahib Ji',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ਼ ਬਹਾਦਰ ਸਾਹਿਬ ਜੀ',
    shortLabelEn: 'Parkash Guru Tegh Bahadur Ji',
    shortLabelPa: 'ਪ੍ਰਕਾਸ਼ ਗੁਰੂ ਤੇਗ਼ ਬਹਾਦਰ ਜੀ',
    tithiRuleEn: 'Vaisakh Vadhi 5 (5 Vaisakh, Sambat 2082)',
    tithiRulePa: 'ਵੈਸਾਖ ਵਦੀ ੫ (੫ ਵੈਸਾਖ, ਸੰਮਤ ੨੦੮੨)',
    summaryEn:
      'Puratan lunar Parkash Purab of Ninth Patshah Sri Guru Tegh Bahadur Sahib Ji (Vaisakh Vadhi 5, 1678 Bikrami at Guru Ke Mahal, Sri Amritsar Sahib).',
    summaryPa:
      'ਨੌਵੇਂ ਪਾਤਸ਼ਾਹ ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ਼ ਬਹਾਦਰ ਸਾਹਿਬ ਜੀ ਦਾ ਪੁਰਾਤਨ ਚੰਦਰ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ (ਵੈਸਾਖ ਵਦੀ ੫, ੧੬੭੮ ਬਿਕ੍ਰਮੀ, ਗੁਰੂ ਕੇ ਮਹਿਲ ਸ੍ਰੀ ਅੰਮ੍ਰਿਤਸਰ ਸਾਹਿਬ)।',
    historicalContextEn:
      'Born on Vaisakh Vadhi 5, Sambat 1678 Bikrami (1621 CE) to Sri Guru Hargobind Sahib Ji and Mata Nanaki Ji at Guru Ke Mahal, Sri Amritsar Sahib.',
    historicalContextPa:
      'ਵੈਸਾਖ ਵਦੀ ੫ ਸੰਮਤ ੧੬੭੮ ਬਿਕ੍ਰਮੀ ਨੂੰ ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਅਤੇ ਮਾਤਾ ਨਾਨਕੀ ਜੀ ਦੇ ਗ੍ਰਹਿ ਵਿਖੇ ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ਼ ਬਹਾਦਰ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਹੋਇਆ।',
    subGroups: ['guru-ghar'],
    pothiUrl: 'https://pothi.tatkhalsa.in/sundar-gutka/salok-mahalla-9',
    citations: [
      {
        sourceEn: 'Bhatt Vahi Talauda (Pargana Jind)',
        sourcePa: 'ਭੱਟ ਵਹੀ ਤਲੌਡਾ (ਪਰਗਣਾ ਜੀਂਦ)',
        referenceEn: 'Vaisakh Vadhi 5, Sambat 1678 Bikrami · Guru Ke Mahal, Amritsar',
        referencePa: 'ਵੈਸਾਖ ਵਦੀ ੫, ਸੰਮਤ ੧੬੭੮ ਬਿਕ੍ਰਮੀ · ਗੁਰੂ ਕੇ ਮਹਿਲ, ਅੰਮ੍ਰਿਤਸਰ',
      },
    ],
  },
  {
    id: '2082-parkash-bhagat-dhanna-ji',
    date: '2025-04-21',
    sambat: 2082,
    category: 'khalsa',
    titleEn: 'Parkash Purab — Bhagat Dhanna Ji',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਭਗਤ ਧੰਨਾ ਜੀ',
    shortLabelEn: 'Bhagat Dhanna Ji',
    shortLabelPa: 'ਭਗਤ ਧੰਨਾ ਜੀ',
    tithiRuleEn: '8 Vaisakh, Sambat 2082 (Dhuan Kalan, Tonk)',
    tithiRulePa: '੮ ਵੈਸਾਖ, ਸੰਮਤ ੨੦੮੨ (ਧੂਆਂ ਕਲਾਂ, ਟੌਂਕ)',
    summaryEn:
      'Birth commemoration of Shiromani Bhagat Dhanna Ji (1415 CE), whose three Asa and Dhanasri shabads are enshrined in Sri Guru Granth Sahib Ji.',
    summaryPa:
      'ਸ਼੍ਰੋਮਣੀ ਭਗਤ ਧੰਨਾ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ, ਜਿਨ੍ਹਾਂ ਦੀ ਪਾਵਨ ਬਾਣੀ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਵਿੱਚ ਰਾਗ ਆਸਾ ਅਤੇ ਧਨਾਸਰੀ ਵਿਖੇ ਦਰਜ ਹੈ।',
    historicalContextEn:
      'Bhagat Dhanna Ji realized Vaheguru through pure, guileless devotion while cultivating the earth; Sri Guru Arjan Dev Ji affirmed his realization in Raag Asa ("Dhannai Paaiaa Dharnidhar Miliaa").',
    historicalContextPa:
      'ਭਗਤ ਧੰਨਾ ਜੀ ਨੇ ਨਿਰਛਲ ਪ੍ਰੇਮਾ-ਭਗਤੀ ਰਾਹੀਂ ਪਰਮਾਤਮਾ ਦੀ ਪ੍ਰਾਪਤੀ ਕੀਤੀ, ਜਿਸ ਦੀ ਪ੍ਰੋੜ੍ਹਤਾ ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਨੇ ਰਾਗ ਆਸਾ ਵਿੱਚ ਕੀਤੀ ਹੈ।',
    subGroups: ['bhagat-bhatt'],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=695',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji (Raag Dhanasri — Bhagat Dhanna Ji)',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਰਾਗ ਧਨਾਸਰੀ — ਭਗਤ ਧੰਨਾ ਜੀ)',
        referenceEn: 'Ang 695 · Gopal Tera Aarta',
        referencePa: 'ਅੰਗ ੬੯੫ · ਗੋਪਾਲ ਤੇਰਾ ਆਰਤਾ',
        excerptPa: 'ਗੋਪਾਲ ਤੇਰਾ ਆਰਤਾ ॥ ਜੋ ਜਨ ਤੁਮਰੀ ਭਗਤਿ ਕਰੰਤੇ ਤਿਨ ਕੇ ਕਾਜ ਸਵਾਰਤਾ ॥',
        excerptTranslit: 'Gopaal teraa aartaa, jo jan tumree bhagat karante tin ke kaaj savaartaa.',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=695',
      },
    ],
  },
  {
    id: '2082-parkash-guru-angad-dev',
    date: '2025-04-28',
    sambat: 2082,
    category: 'gurpurab',
    titleEn: 'Parkash Purab — Sri Guru Angad Dev Ji & Mata Khivi Ji Parivar',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸ੍ਰੀ ਗੁਰੂ ਅੰਗਦ ਦੇਵ ਜੀ ਅਤੇ ਮਾਤਾ ਖੀਵੀ ਜੀ ਦਾ ਪਰਿਵਾਰ',
    shortLabelEn: 'Parkash Guru Angad Dev Ji',
    shortLabelPa: 'ਪ੍ਰਕਾਸ਼ ਗੁਰੂ ਅੰਗਦ ਦੇਵ ਜੀ',
    tithiRuleEn: 'Vaisakh Sudhi 1 (15 Vaisakh, Sambat 2082)',
    tithiRulePa: 'ਵੈਸਾਖ ਸੁਦੀ ੧ (੧੫ ਵੈਸਾਖ, ਸੰਮਤ ੨੦੮੨)',
    summaryEn:
      'Parkash Purab of Second Patshah Sri Guru Angad Dev Ji (Matte Di Sarai, 1561 Bikrami) and commemoration of Mata Khivi Ji, Baba Dasu, Baba Datu, Bibi Amro & Bibi Anokhi Ji.',
    summaryPa:
      'ਦੂਜੇ ਪਾਤਸ਼ਾਹ ਸ੍ਰੀ ਗੁਰੂ ਅੰਗਦ ਦੇਵ ਜੀ (ਮੱਤੇ ਦੀ ਸਰਾਂ, ੧੫੬੧ ਬਿਕ੍ਰਮੀ) ਦਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ ਅਤੇ ਮਾਤਾ ਖੀਵੀ ਜੀ, ਬਾਬਾ ਦਾਸੂ, ਬਾਬਾ ਦਾਤੂ, ਬੀਬੀ ਅਮਰੋ ਤੇ ਬੀਬੀ ਅਨੋਖੀ ਜੀ ਦੀ ਯਾਦ।',
    historicalContextEn:
      'Sri Guru Angad Dev Ji formalized the Gurmukhi script, nurtured Guru Ka Langar at Khadur Sahib alongside Mata Khivi Ji, and established Mal Akhara for physical and spiritual discipline.',
    historicalContextPa:
      'ਸ੍ਰੀ ਗੁਰੂ ਅੰਗਦ ਦੇਵ ਜੀ ਨੇ ਗੁਰਮੁਖੀ ਲਿਪੀ ਦਾ ਪ੍ਰਚਾਰ, ਸ੍ਰੀ ਖਡੂਰ ਸਾਹਿਬ ਵਿਖੇ ਮਾਤਾ ਖੀਵੀ ਜੀ ਸਮੇਤ ਗੁਰੂ ਕੇ ਲੰਗਰ ਦੀ ਸੇਵਾ ਅਤੇ ਮੱਲ ਅਖਾੜੇ ਦੀ ਰਵਾਇਤ ਚਲਾਈ।',
    subGroups: ['guru-ghar'],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=967',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji (Ramkali Ki Vaar — Rai Balwand & Satta)',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਰਾਮਕਲੀ ਕੀ ਵਾਰ — ਰਾਇ ਬਲਵੰਡਿ ਤਥਾ ਸਤੈ)',
        referenceEn: 'Ang 967 · Balwand Khivi Nek Jan',
        referencePa: 'ਅੰਗ ੯੬੭ · ਬਲਵੰਡ ਖੀਵੀ ਨੇਕ ਜਨ',
        excerptPa: 'ਬਲਵੰਡ ਖੀਵੀ ਨੇਕ ਜਨ ਜਿਸੁ ਬਹੁਤੀ ਛਾਉ ਪਤ੍ਰਾਲੀ ॥',
        excerptTranslit: 'Balvand Kheevee nek jan jis bahutee chhaao patraalee.',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=967',
      },
    ],
  },
  {
    id: '2082-shaheedi-hari-singh-nalwa',
    date: '2025-04-30',
    sambat: 2082,
    category: 'shaheedi',
    titleEn: 'Shaheedi Divas — Sardar Hari Singh Nalwa (Battle of Jamrud)',
    titlePa: 'ਸ਼ਹੀਦੀ ਦਿਵਸ — ਸਰਦਾਰ ਹਰੀ ਸਿੰਘ ਨਲੂਆ (ਜਮਰੌਦ ਦੀ ਜੰਗ)',
    shortLabelEn: 'Sardar Hari Singh Nalwa',
    shortLabelPa: 'ਸਰਦਾਰ ਹਰੀ ਸਿੰਘ ਨਲੂਆ',
    tithiRuleEn: '17 Vaisakh, Sambat 2082 (Jamrud Fort, 1837)',
    tithiRulePa: '੧੭ ਵੈਸਾਖ, ਸੰਮਤ ੨੦੮੨ (ਕਿਲ੍ਹਾ ਜਮਰੌਦ, ੧੮੩੭)',
    summaryEn:
      'Martyrdom of Khalsa Commander-in-Chief Sardar Hari Singh Nalwa defending Jamrud Fort at the Khyber Pass on 30 April 1837.',
    summaryPa:
      'ਖ਼ਾਲਸਾ ਫ਼ੌਜ ਦੇ ਮਹਾਨ ਜਰਨੈਲ ਸਰਦਾਰ ਹਰੀ ਸਿੰਘ ਨਲੂਆ ਜੀ ਦੀ ਕਿਲ੍ਹਾ ਜਮਰੌਦ (੧੮੩੭) ਵਿਖੇ ਲਾਸਾਨੀ ਸ਼ਹਾਦਤ।',
    historicalContextEn:
      'Sardar Hari Singh Nalwa sealed the Khyber Pass against centuries of foreign invasions and upheld Khalsa sovereignty across Kashmir, Hazara, and Peshawar.',
    historicalContextPa:
      'ਸਰਦਾਰ ਹਰੀ ਸਿੰਘ ਨਲੂਆ ਨੇ ਖ਼ੈਬਰ ਦਰੇ ’ਤੇ ਕਿਲ੍ਹਾ ਜਮਰੌਦ ਉਸਾਰ ਕੇ ਸਦੀਆਂ ਦੇ ਵਿਦੇਸ਼ੀ ਹਮਲਿਆਂ ਨੂੰ ਸਦਾ ਲਈ ਬੰਦ ਕਰ ਦਿੱਤਾ।',
    subGroups: ['gursikh'],
    citations: [
      {
        sourceEn: 'Prachin Panth Prakash & Khalsa Raj Chronicles',
        sourcePa: 'ਪ੍ਰਾਚੀਨ ਪੰਥ ਪ੍ਰਕਾਸ਼ ਅਤੇ ਖ਼ਾਲਸਾ ਰਾਜ ਇਤਿਹਾਸ',
        referenceEn: 'Battle of Jamrud · 1894 Bikrami (30 April 1837)',
        referencePa: 'ਜਮਰੌਦ ਦੀ ਜੰਗ · ੧੮੯੪ ਬਿਕ੍ਰਮੀ (੩੦ ਅਪ੍ਰੈਲ ੧੮੩੭)',
      },
    ],
  },
  {
    id: '2082-mai-bhago-ji',
    date: '2025-05-04',
    sambat: 2082,
    category: 'khalsa',
    titleEn: 'Remembrance — Mata Bhag Kaur Ji (Mai Bhago Ji)',
    titlePa: 'ਯਾਦਗਾਰ — ਮਾਤਾ ਭਾਗ ਕੌਰ ਜੀ (ਮਾਈ ਭਾਗੋ ਜੀ)',
    shortLabelEn: 'Mai Bhago Ji',
    shortLabelPa: 'ਮਾਈ ਭਾਗੋ ਜੀ',
    tithiRuleEn: '21 Vaisakh, Sambat 2082 (Sri Muktsar Sahib & Jinvara)',
    tithiRulePa: '੨੧ ਵੈਸਾਖ, ਸੰਮਤ ੨੦੮੨ (ਸ੍ਰੀ ਮੁਕਤਸਰ ਸਾਹਿਬ ਅਤੇ ਜਿਨਵਾੜਾ)',
    summaryEn:
      'Commemoration of Mata Bhag Kaur Ji (Mai Bhago Ji), who rallied the Forty Mukte at Khidrane di Dhab and served in the retinue of Sri Guru Gobind Singh Ji.',
    summaryPa:
      'ਖਿਦਰਾਣੇ ਦੀ ਢਾਬ (ਸ੍ਰੀ ਮੁਕਤਸਰ ਸਾਹਿਬ) ਵਿਖੇ ਚਾਲੀ ਮੁਕਤਿਆਂ ਦੀ ਅਗਵਾਈ ਕਰਨ ਵਾਲੀ ਮਹਾਨ ਸਿੱਖ ਬੀਬੀ ਮਾਤਾ ਭਾਗ ਕੌਰ ਜੀ (ਮਾਈ ਭਾਗੋ ਜੀ) ਦੀ ਯਾਦ।',
    historicalContextEn:
      'A towering symbol of Sikh courage and Khalsa devotion, Mai Bhago Ji fought at Khidrana (1705) and accompanied Tenth Patshah to Sri Hazur Sahib before spending her final years in meditation at Jinvara.',
    historicalContextPa:
      'ਮਾਤਾ ਭਾਗ ਕੌਰ ਜੀ ਨੇ ਮਾਝੇ ਦੇ ਸਿੰਘਾਂ ਨੂੰ ਮੁੜ ਗੁਰੂ ਚਰਨਾਂ ਨਾਲ ਜੋੜਿਆ ਅਤੇ ਖਿਦਰਾਣੇ ਦੀ ਜੰਗ ਵਿੱਚ ਅਦੁੱਤੀ ਬਹਾਦਰੀ ਵਿਖਾਈ।',
    subGroups: ['gursikh'],
    citations: [
      {
        sourceEn: 'Sri Gur Pratap Suraj Granth',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ',
        referenceEn: 'Ayan 1, Ansu 44–49 · Mai Bhago Ji & Battle of Khidrana',
        referencePa: 'ਅਯਨ ੧, ਅੰਸੂ ੪੪–੪੯ · ਮਾਈ ਭਾਗੋ ਜੀ ਅਤੇ ਖਿਦਰਾਣੇ ਦੀ ਜੰਗ',
      },
    ],
  },
  {
    id: '2082-parkash-guru-amar-das',
    date: '2025-05-11',
    sambat: 2082,
    category: 'gurpurab',
    titleEn: 'Parkash Purab — Sri Guru Amar Das Ji & Mata Mansa Devi Parivar',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸ੍ਰੀ ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ ਅਤੇ ਮਾਤਾ ਮਨਸਾ ਦੇਵੀ ਪਰਿਵਾਰ',
    shortLabelEn: 'Parkash Guru Amar Das Ji',
    shortLabelPa: 'ਪ੍ਰਕਾਸ਼ ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ',
    tithiRuleEn: 'Vaisakh Sudhi 14 (28 Vaisakh, Sambat 2082)',
    tithiRulePa: 'ਵੈਸਾਖ ਸੁਦੀ ੧੪ (੨੮ ਵੈਸਾਖ, ਸੰਮਤ ੨੦੮੨)',
    summaryEn:
      'Parkash Purab of Third Patshah Sri Guru Amar Das Ji (Basarke Gillan, 1536 Bikrami), with remembrance of Mata Mansa Devi Ji, Baba Mohan, Baba Mohri, Bibi Dani & Bibi Bhani Ji.',
    summaryPa:
      'ਤੀਜੇ ਪਾਤਸ਼ਾਹ ਸ੍ਰੀ ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ (ਬਾਸਰਕੇ ਗਿੱਲਾਂ, ੧੫੩੬ ਬਿਕ੍ਰਮੀ) ਦਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ ਅਤੇ ਮਾਤਾ ਮਨਸਾ ਦੇਵੀ ਜੀ, ਬਾਬਾ ਮੋਹਨ, ਬਾਬਾ ਮੋਹਰੀ, ਬੀਬੀ ਦਾਨੀ ਤੇ ਬੀਬੀ ਭਾਨੀ ਜੀ ਦੀ ਯਾਦ।',
    historicalContextEn:
      'Author of Anand Sahib, Sri Guru Amar Das Ji established Goindwal Sahib, the 22 Manjis, and the Goindwal Pothis preserved by Baba Mohan Ji.',
    historicalContextPa:
      'ਅਨੰਦ ਸਾਹਿਬ ਦੇ ਰਚਨਹਾਰ ਸ੍ਰੀ ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ ਨੇ ਗੋਇੰਦਵਾਲ ਸਾਹਿਬ, ਬਾਈ ਮੰਜੀਆਂ ਅਤੇ ਗੋਇੰਦਵਾਲ ਪੋਥੀਆਂ ਦੀ ਸਥਾਪਨਾ ਕੀਤੀ।',
    subGroups: ['guru-ghar'],
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji (Raag Ramkali — Anand Sahib)',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਰਾਗ ਰਾਮਕਲੀ — ਅਨੰਦ ਸਾਹਿਬ)',
        referenceEn: 'Ang 917 · Anand Bhaia Meri Maye',
        referencePa: 'ਅੰਗ ੯੧੭ · ਅਨੰਦੁ ਭਇਆ ਮੇਰੀ ਮਾਏ',
        excerptPa: 'ਅਨੰਦੁ ਭਇਆ ਮੇਰੀ ਮਾਏ ਸਤਿਗੁਰੂ ਮੈ ਪਾਇਆ ॥',
        excerptTranslit: 'Anand bhaiaa meree maae satguroo mai paaiaa.',
      },
    ],
  },
  {
    id: '2082-shaheedi-guru-arjan-dev',
    date: '2025-05-30',
    sambat: 2082,
    category: 'shaheedi',
    titleEn: 'Shaheedi Divas — Sri Guru Arjan Dev Ji (Shaheedan De Sartaj)',
    titlePa: 'ਸ਼ਹੀਦੀ ਦਿਵਸ — ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ (ਸ਼ਹੀਦਾਂ ਦੇ ਸਰਤਾਜ)',
    shortLabelEn: 'Shaheedi Guru Arjan Dev Ji',
    shortLabelPa: 'ਸ਼ਹੀਦੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ',
    tithiRuleEn: 'Jeth Sudhi 4 (16 Jeth, Sambat 2082)',
    tithiRulePa: 'ਜੇਠ ਸੁਦੀ ੪ (੧੬ ਜੇਠ, ਸੰਮਤ ੨੦੮੨)',
    summaryEn:
      'Puratan lunar martyrdom commemoration of Fifth Patshah Sri Guru Arjan Dev Ji at Lahore (Jeth Sudhi 4, Sambat 1663 Bikrami / 1606 CE).',
    summaryPa:
      'ਜੇਠ ਸੁਦੀ ੪ (ਸੰਮਤ ੧੬੬੩ ਬਿਕ੍ਰਮੀ / ੧੬੦੬) ਨੂੰ ਲਾਹੌਰ ਵਿਖੇ ਸ਼ਹੀਦਾਂ ਦੇ ਸਰਤਾਜ ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਦੀ ਲਾਸਾਨੀ ਸ਼ਹਾਦਤ।',
    historicalContextEn:
      'Seated upon the red-hot iron plate in the blazing heat of Jeth at Lahore while reciting "Tera Kiya Meetha Lage", Sri Guru Arjan Dev Ji inaugurated the supreme Sikh tradition of martyrdom.',
    historicalContextPa:
      'ਜੇਠ ਮਹੀਨੇ ਦੀ ਤਪਦੀ ਗਰਮੀ ਵਿੱਚ ਤੱਤੀ ਤਵੀ ’ਤੇ ਬੈਠ ਕੇ "ਤੇਰਾ ਕੀਆ ਮੀਠਾ ਲਾਗੈ" ਉਚਾਰਦਿਆਂ ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਨੇ ਸ਼ਹੀਦੀਆਂ ਦੀ ਨੀਂਹ ਰੱਖੀ।',
    subGroups: ['guru-ghar'],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=394',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji (Raag Asa — Mahalla 5)',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਰਾਗ ਆਸਾ — ਮਹਲਾ ੫)',
        referenceEn: 'Ang 394 · Tera Kiya Meetha Lage',
        referencePa: 'ਅੰਗ ੩੯੪ · ਤੇਰਾ ਕੀਆ ਮੀਠਾ ਲਾਗੈ',
        excerptPa: 'ਤੇਰਾ ਕੀਆ ਮੀਠਾ ਲਾਗੈ ॥ ਹਰਿ ਨਾਮੁ ਪਦਾਰਥੁ ਨਾਨਕੁ ਮਾਂਗੈ ॥',
        excerptTranslit: 'Teraa keeaa meethaa laagai, Har naam padaarath Naanak maangai.',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=394',
      },
      {
        sourceEn: 'Bhatt Vahi Multani Sindhi',
        sourcePa: 'ਭੱਟ ਵਹੀ ਮੁਲਤਾਨੀ ਸਿੰਧੀ',
        referenceEn: 'Jeth Sudhi 4, Sambat 1663 Bikrami · Lahore Shaheedi',
        referencePa: 'ਜੇਠ ਸੁਦੀ ੪, ਸੰਮਤ ੧੬੬੩ ਬਿਕ੍ਰਮੀ · ਲਾਹੌਰ ਸ਼ਹਾਦਤ',
      },
    ],
    featured: true,
  },
  {
    id: '2082-parkash-bhagat-kabir-ji',
    date: '2025-06-11',
    sambat: 2082,
    category: 'khalsa',
    titleEn: 'Parkash Purab — Shiromani Bhagat Kabir Ji',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸ਼੍ਰੋਮਣੀ ਭਗਤ ਕਬੀਰ ਜੀ',
    shortLabelEn: 'Bhagat Kabir Ji',
    shortLabelPa: 'ਭਗਤ ਕਬੀਰ ਜੀ',
    tithiRuleEn: 'Jeth Puranmashi (28 Jeth, Sambat 2082)',
    tithiRulePa: 'ਜੇਠ ਪੂਰਨਮਾਸ਼ੀ (੨੮ ਜੇਠ, ਸੰਮਤ ੨੦੮੨)',
    summaryEn:
      'Birth commemoration of Shiromani Bhagat Kabir Ji (Jeth Puranmashi, 1455 Bikrami), author of 541 hymns and saloks enshrined in Sri Guru Granth Sahib Ji.',
    summaryPa:
      'ਜੇਠ ਪੂਰਨਮਾਸ਼ੀ ਨੂੰ ਸ਼੍ਰੋਮਣੀ ਭਗਤ ਕਬੀਰ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ, ਜਿਨ੍ਹਾਂ ਦੇ ੫੪੧ ਸ਼ਬਦ ਤੇ ਸਲੋਕ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਵਿੱਚ ਦਰਜ ਹਨ।',
    historicalContextEn:
      'Bhagat Kabir Ji fearlessly challenged caste and empty ritual while proclaiming the One Radiant Light ("Awal Allah Noor Upaya").',
    historicalContextPa:
      'ਭਗਤ ਕਬੀਰ ਜੀ ਨੇ ਜਾਤ-ਪਾਤ ਅਤੇ ਕਰਮਕਾਂਡਾਂ ਦਾ ਖੰਡਨ ਕਰਦਿਆਂ "ਅਵਲਿ ਅਲਹ ਨੂਰੁ ਉਪਾਇਆ" ਦਾ ਸਦੀਵੀ ਸੰਦੇਸ਼ ਦਿੱਤਾ।',
    subGroups: ['bhagat-bhatt'],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=1349',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji (Raag Prabhati — Bhagat Kabir Ji)',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਰਾਗ ਪ੍ਰਭਾਤੀ — ਭਗਤ ਕਬੀਰ ਜੀ)',
        referenceEn: 'Ang 1349 · Awal Allah Noor Upaya',
        referencePa: 'ਅੰਗ ੧੩੪੯ · ਅਵਲਿ ਅਲਹ ਨੂਰੁ ਉਪਾਇਆ',
        excerptPa: 'ਅਵਲਿ ਅਲਹ ਨੂਰੁ ਉਪਾਇਆ ਕੁਦਰਤਿ ਕੇ ਸਭ ਬੰਦੇ ॥',
        excerptTranslit: 'Aval Allah noor upaaiaa kudrat ke sabh bande.',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=1349',
      },
    ],
  },
  {
    id: '2082-parkash-guru-hargobind',
    date: '2025-06-17',
    sambat: 2082,
    category: 'gurpurab',
    titleEn: 'Parkash Purab — Sri Guru Hargobind Sahib Ji (Miri-Piri Patshah)',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ (ਮੀਰੀ-ਪੀਰੀ ਦੇ ਮਾਲਕ)',
    shortLabelEn: 'Parkash Guru Hargobind Ji',
    shortLabelPa: 'ਪ੍ਰਕਾਸ਼ ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਜੀ',
    tithiRuleEn: 'Harh Vadhi 6 (3 Harh, Sambat 2082)',
    tithiRulePa: 'ਹਾੜ੍ਹ ਵਦੀ ੬ (੩ ਹਾੜ੍ਹ, ਸੰਮਤ ੨੦੮੨)',
    summaryEn:
      'Puratan lunar Parkash Purab of Sixth Patshah Sri Guru Hargobind Sahib Ji (Harh Vadhi 6, 1652 Bikrami at Guru Ki Wadali) with Mata Ganga Ji heritage.',
    summaryPa:
      'ਛੇਵੇਂ ਪਾਤਸ਼ਾਹ ਮੀਰੀ-ਪੀਰੀ ਦੇ ਮਾਲਕ ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ (ਹਾੜ੍ਹ ਵਦੀ ੬, ੧੬੫੨ ਬਿਕ੍ਰਮੀ, ਗੁਰੂ ਕੀ ਵਡਾਲੀ) ਦਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ।',
    historicalContextEn:
      'Sixth Patshah established Sri Akal Takhat Sahib, donned the two swords of Miri and Piri, and defended the sovereignty of the Panth.',
    historicalContextPa:
      'ਛੇਵੇਂ ਪਾਤਸ਼ਾਹ ਜੀ ਨੇ ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਦੀ ਸਥਾਪਨਾ ਕਰਕੇ ਮੀਰੀ-ਪੀਰੀ ਦੀਆਂ ਦੋ ਤਲਵਾਰਾਂ ਧਾਰਨ ਕੀਤੀਆਂ।',
    subGroups: ['guru-ghar'],
    citations: [
      {
        sourceEn: 'Gurbilas Patshahi 6',
        sourcePa: 'ਗੁਰਬਿਲਾਸ ਪਾਤਸ਼ਾਹੀ ੬',
        referenceEn: 'Adhyai 2 · Parkash of Sri Guru Hargobind Sahib Ji at Wadali',
        referencePa: 'ਅਧਿਆਇ ੨ · ਗੁਰੂ ਕੀ ਵਡਾਲੀ ਵਿਖੇ ਪ੍ਰਕਾਸ਼ ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ',
      },
    ],
  },
  {
    id: '2082-shaheedi-baba-banda-singh-bahadur',
    date: '2025-06-25',
    sambat: 2082,
    category: 'shaheedi',
    titleEn: 'Shaheedi Divas — Baba Banda Singh Bahadur & 740 Khalsa Shaheeds',
    titlePa: 'ਸ਼ਹੀਦੀ ਦਿਵਸ — ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ ਅਤੇ ੭੪੦ ਖ਼ਾਲਸਾ ਸ਼ਹੀਦ',
    shortLabelEn: 'Baba Banda Singh Bahadur',
    shortLabelPa: 'ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ',
    tithiRuleEn: '11 Harh, Sambat 2082 (Mehrauli, Delhi · 1716)',
    tithiRulePa: '੧੧ ਹਾੜ੍ਹ, ਸੰਮਤ ੨੦੮੨ (ਮਹਿਰੌਲੀ, ਦਿੱਲੀ · ੧੭੧੬)',
    summaryEn:
      'Martyrdom of Baba Banda Singh Bahadur, his four-year-old son Baba Ajai Singh Ji, and 740 steadfast Khalsa Singhs at Delhi (Harh 1773 Bikrami / June 1716).',
    summaryPa:
      'ਦਿੱਲੀ ਵਿਖੇ ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ, ਉਨ੍ਹਾਂ ਦੇ ਸਪੁੱਤਰ ਬਾਬਾ ਅਜੈ ਸਿੰਘ ਜੀ ਅਤੇ ੭੪੦ ਅਡੋਲ ਖ਼ਾਲਸਾ ਸ਼ਹੀਦਾਂ ਦੀ ਲਾਸਾਨੀ ਸ਼ਹਾਦਤ (੧੭੧੬)।',
    historicalContextEn:
      'Blessed with five arrows and the Nagara by Sri Guru Gobind Singh Ji at Nanded, Baba Banda Singh Bahadur vanquished Sirhind and struck the first sovereign Khalsa coin in the name of Guru Nanak–Guru Gobind Singh.',
    historicalContextPa:
      'ਸ੍ਰੀ ਹਜ਼ੂਰ ਸਾਹਿਬ ਤੋਂ ਪੰਜ ਤੀਰ ਅਤੇ ਨਗਾਰਾ ਲੈ ਕੇ ਪੰਜਾਬ ਪੁੱਜੇ ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ ਨੇ ਸਰਹਿੰਦ ਫ਼ਤਹਿ ਕਰਕੇ ਪਹਿਲਾ ਖ਼ਾਲਸਾ ਰਾਜ ਕਾਇਮ ਕੀਤਾ।',
    subGroups: ['gursikh'],
    citations: [
      {
        sourceEn: 'Prachin Panth Prakash (Bhai Rattan Singh Bhangu)',
        sourcePa: 'ਪ੍ਰਾਚੀਨ ਪੰਥ ਪ੍ਰਕਾਸ਼ (ਭਾਈ ਰਤਨ ਸਿੰਘ ਭੰਗੂ)',
        referenceEn: 'Sirhind Fateh & Delhi Shaheedi Chronicle · 1773 Bikrami',
        referencePa: 'ਸਰਹਿੰਦ ਫ਼ਤਹਿ ਅਤੇ ਦਿੱਲੀ ਸ਼ਹੀਦੀ ਪ੍ਰਸੰਗ · ੧੭੭੩ ਬਿਕ੍ਰਮੀ',
      },
    ],
  },
  {
    id: '2082-barsi-maharaja-ranjit-singh',
    date: '2025-06-29',
    sambat: 2082,
    category: 'barsi',
    titleEn: 'Barsi — Sher-e-Punjab Maharaja Ranjit Singh Ji',
    titlePa: 'ਬਰਸੀ — ਸ਼ੇਰ-ਏ-ਪੰਜਾਬ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਜੀ',
    shortLabelEn: 'Maharaja Ranjit Singh Barsi',
    shortLabelPa: 'ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਬਰਸੀ',
    tithiRuleEn: '15 Harh, Sambat 2082 (Lahore, 1896 Bikrami)',
    tithiRulePa: '੧੫ ਹਾੜ੍ਹ, ਸੰਮਤ ੨੦੮੨ (ਲਾਹੌਰ, ੧੮੯੬ ਬਿਕ੍ਰਮੀ)',
    summaryEn:
      'Annual remembrance of Sher-e-Punjab Maharaja Ranjit Singh Ji (1780–1839), founder of the sovereign Khalsa Empire (Sarkar-e-Khalsa).',
    summaryPa:
      'ਖ਼ਾਲਸਾ ਰਾਜ (ਸਰਕਾਰ-ਏ-ਖ਼ਾਲਸਾ) ਦੇ ਬਾਨੀ ਸ਼ੇਰ-ਏ-ਪੰਜਾਬ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਜੀ ਦੀ ਬਰਸੀ (੧੫ ਹਾੜ੍ਹ, ੧੮੯੬ ਬਿਕ੍ਰਮੀ)।',
    historicalContextEn:
      'Maharaja Ranjit Singh united the Sikh Misls, gilded Sachkhand Sri Harmandir Sahib, and ruled in the name of Sarkar-e-Khalsa with Nanakshahi coinage.',
    historicalContextPa:
      'ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਜੀ ਨੇ ਸਿੱਖ ਮਿਸਲਾਂ ਨੂੰ ਇਕੱਠਾ ਕਰਕੇ ਸੱਚਖੰਡ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ’ਤੇ ਸੋਨੇ ਦੀ ਸੇਵਾ ਕਰਵਾਈ ਅਤੇ ਨਾਨਕਸ਼ਾਹੀ ਸਿੱਕਾ ਜਾਰੀ ਕੀਤਾ।',
    subGroups: ['gursikh'],
    citations: [
      {
        sourceEn: 'Umdat-ut-Tawarikh & Khalsa Darbar Records',
        sourcePa: 'ਉਮਦਤ-ਉਤ-ਤਵਾਰੀਖ਼ ਅਤੇ ਖ਼ਾਲਸਾ ਦਰਬਾਰ ਰਿਕਾਰਡ',
        referenceEn: '15 Harh 1896 Bikrami (27 June 1839) · Lahore',
        referencePa: '੧੫ ਹਾੜ੍ਹ ੧੮੯੬ ਬਿਕ੍ਰਮੀ (੨੭ ਜੂਨ ੧੮੩੯) · ਲਾਹੌਰ',
      },
    ],
  },
  {
    id: '2082-shaheedi-bhai-mani-singh-ji',
    date: '2025-07-09',
    sambat: 2082,
    category: 'shaheedi',
    titleEn: 'Shaheedi Divas — Shaheed Bhai Mani Singh Ji (Band-Band Katwana)',
    titlePa: 'ਸ਼ਹੀਦੀ ਦਿਵਸ — ਸ਼ਹੀਦ ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ (ਬੰਦ-ਬੰਦ ਕਟਵਾਉਣਾ)',
    shortLabelEn: 'Shaheedi Bhai Mani Singh Ji',
    shortLabelPa: 'ਸ਼ਹੀਦੀ ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ',
    tithiRuleEn: '25 Harh, Sambat 2082 (Nakhas Chowk, Lahore · 1737)',
    tithiRulePa: '੨੫ ਹਾੜ੍ਹ, ਸੰਮਤ ੨੦੮੨ (ਨਖ਼ਾਸ ਚੌਕ, ਲਾਹੌਰ · ੧੭੩੭)',
    summaryEn:
      'Martyrdom of Head Granthi of Sri Harmandir Sahib and Damdami Bir scribe Bhai Mani Singh Ji, dismembered joint by joint at Lahore.',
    summaryPa:
      'ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦੇ ਮੁੱਖ ਗ੍ਰੰਥੀ ਅਤੇ ਦਮਦਮੀ ਬੀੜ ਦੇ ਲਿਖਾਰੀ ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਦੀ ਲਾਹੌਰ ਵਿਖੇ ਬੰਦ-ਬੰਦ ਕਟਵਾ ਕੇ ਸ਼ਹਾਦਤ।',
    historicalContextEn:
      'Scribe of the Damdami Bir under Sri Guru Gobind Singh Ji at Talwandi Sabo, Bhai Mani Singh Ji accepted dismemberment joint by joint rather than compromise Sikh faith.',
    historicalContextPa:
      'ਤਲਵੰਡੀ ਸਾਬੋ ਵਿਖੇ ਦਸਮੇਸ਼ ਪਿਤਾ ਜੀ ਪਾਸੋਂ ਦਮਦਮੀ ਬੀੜ ਲਿਖਣ ਵਾਲੇ ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਨੇ ਸਿੱਖੀ ਸਿਦਕ ਲਈ ਬੰਦ-ਬੰਦ ਕਟਵਾਉਣਾ ਪ੍ਰਵਾਨ ਕੀਤਾ।',
    subGroups: ['gursikh'],
    citations: [
      {
        sourceEn: 'Prachin Panth Prakash (Bhai Rattan Singh Bhangu)',
        sourcePa: 'ਪ੍ਰਾਚੀਨ ਪੰਥ ਪ੍ਰਕਾਸ਼ (ਭਾਈ ਰਤਨ ਸਿੰਘ ਭੰਗੂ)',
        referenceEn: 'Shaheedi Prasang of Bhai Mani Singh Ji · Lahore',
        referencePa: 'ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਦਾ ਸ਼ਹੀਦੀ ਪ੍ਰਸੰਗ · ਲਾਹੌਰ',
      },
    ],
  },
  {
    id: '2082-shaheedi-bhai-taru-singh-ji',
    date: '2025-07-16',
    sambat: 2082,
    category: 'shaheedi',
    titleEn: 'Shaheedi Divas — Shaheed Bhai Taru Singh Ji (Khopri Lahauna)',
    titlePa: 'ਸ਼ਹੀਦੀ ਦਿਵਸ — ਸ਼ਹੀਦ ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ (ਖੋਪਰੀ ਲੁਹਾਉਣਾ)',
    shortLabelEn: 'Shaheedi Bhai Taru Singh Ji',
    shortLabelPa: 'ਸ਼ਹੀਦੀ ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ',
    tithiRuleEn: '1 Sawan, Sambat 2082 (Sawan Sangrand · 1745)',
    tithiRulePa: '੧ ਸਾਵਣ, ਸੰਮਤ ੨੦੮੨ (ਸਾਵਣ ਸੰਗਰਾਂਦ · ੧੭੪੫)',
    summaryEn:
      'Martyrdom of Bhai Taru Singh Ji of Poola village, who gave his scalp at Lahore to preserve his unshorn Kes on 1 Sawan 1802 Bikrami.',
    summaryPa:
      'ਪਿੰਡ ਪੂਹਲਾ ਦੇ ਮਹਾਨ ਸ਼ਹੀਦ ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਦੀ ੧ ਸਾਵਣ ੧੮੦੨ ਬਿਕ੍ਰਮੀ (੧੭੪੫) ਨੂੰ ਕੇਸਾਂ-ਸੁਆਸਾਂ ਸੰਗ ਸ਼ਹਾਦਤ।',
    historicalContextEn:
      'Remembered daily in the Sikh Ardas ("Khoprian Luhaiyan"), Bhai Taru Singh Ji stayed alive 22 days after his scalp was removed until Zakariya Khan perished before him.',
    historicalContextPa:
      'ਸਿੱਖ ਅਰਦਾਸ ਵਿੱਚ "ਖੋਪਰੀਆਂ ਲੁਹਾਈਆਂ" ਦੇ ਰੂਪ ਵਿੱਚ ਯਾਦ ਕੀਤੇ ਜਾਂਦੇ ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਨੇ ਕੇਸ ਕਟਵਾਉਣ ਦੀ ਥਾਂ ਖੋਪਰੀ ਲੁਹਾਉਣੀ ਪ੍ਰਵਾਨ ਕੀਤੀ।',
    subGroups: ['gursikh'],
    citations: [
      {
        sourceEn: 'Prachin Panth Prakash (Bhai Rattan Singh Bhangu)',
        sourcePa: 'ਪ੍ਰਾਚੀਨ ਪੰਥ ਪ੍ਰਕਾਸ਼ (ਭਾਈ ਰਤਨ ਸਿੰਘ ਭੰਗੂ)',
        referenceEn: 'Shaheedi of Bhai Taru Singh Ji · 1 Sawan 1802 Bikrami',
        referencePa: 'ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਦੀ ਸ਼ਹੀਦੀ · ੧ ਸਾਵਣ ੧੮੦੨ ਬਿਕ੍ਰਮੀ',
      },
    ],
  },
  {
    id: '2082-parkash-guru-harkrishan',
    date: '2025-07-19',
    sambat: 2082,
    category: 'gurpurab',
    titleEn: 'Parkash Purab — Sri Guru Harkrishan Sahib Ji (Bala Pritam)',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਕ੍ਰਿਸ਼ਨ ਸਾਹਿਬ ਜੀ (ਬਾਲਾ ਪ੍ਰੀਤਮ)',
    shortLabelEn: 'Parkash Guru Harkrishan Ji',
    shortLabelPa: 'ਪ੍ਰਕਾਸ਼ ਗੁਰੂ ਹਰਿਕ੍ਰਿਸ਼ਨ ਜੀ',
    tithiRuleEn: 'Sawan Vadhi 9 (4 Sawan, Sambat 2082)',
    tithiRulePa: 'ਸਾਵਣ ਵਦੀ ੯ (੪ ਸਾਵਣ, ਸੰਮਤ ੨੦੮੨)',
    summaryEn:
      'Puratan lunar Parkash Purab of Eighth Patshah Sri Guru Harkrishan Sahib Ji (Sawan Vadhi 9, 1713 Bikrami at Sri Kiratpur Sahib).',
    summaryPa:
      'ਅੱਠਵੇਂ ਪਾਤਸ਼ਾਹ ਬਾਲਾ ਪ੍ਰੀਤਮ ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਕ੍ਰਿਸ਼ਨ ਸਾਹਿਬ ਜੀ (ਸਾਵਣ ਵਦੀ ੯, ੧੭੧੩ ਬਿਕ੍ਰਮੀ, ਸ੍ਰੀ ਕੀਰਤਪੁਰ ਸਾਹਿਬ) ਦਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ।',
    historicalContextEn:
      'Invoked in daily Ardas ("Sri Harkrishan Dhiayiye Jis Dithe Sabh Dukh Jaye"), Eighth Patshah served the smallpox-afflicted populace of Delhi at Bangla Sahib.',
    historicalContextPa:
      'ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਕ੍ਰਿਸ਼ਨ ਸਾਹਿਬ ਜੀ ਨੇ ਦਿੱਲੀ (ਬੰਗਲਾ ਸਾਹਿਬ) ਵਿਖੇ ਚੇਚਕ ਪੀੜਤ ਸੰਗਤਾਂ ਦੀ ਸੇਵਾ ਕੀਤੀ।',
    subGroups: ['guru-ghar'],
    citations: [
      {
        sourceEn: 'Sri Gur Pratap Suraj Granth',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ',
        referenceEn: 'Raas 10, Ansu 22 · Parkash of Sri Guru Harkrishan Sahib Ji',
        referencePa: 'ਰਾਸਿ ੧੦, ਅੰਸੂ ੨੨ · ਪ੍ਰਕਾਸ਼ ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਕ੍ਰਿਸ਼ਨ ਸਾਹਿਬ ਜੀ',
      },
    ],
  },
  {
    id: '2082-adi-bir-colophon-bhatts',
    date: '2025-08-10',
    sambat: 2082,
    category: 'khalsa',
    titleEn: 'Adi Bir Completion Colophon (Kartarpur Bir) & All 11 Bhatt Sahibaan',
    titlePa: 'ਆਦਿ ਬੀੜ ਸੰਪੂਰਨਤਾ ਹਵਾਲਾ (ਕਰਤਾਰਪੁਰੀ ਬੀੜ) ਅਤੇ ੧੧ ਭੱਟ ਸਾਹਿਬਾਨ',
    shortLabelEn: 'Adi Bir & 11 Bhatts',
    shortLabelPa: 'ਆਦਿ ਬੀੜ ਤੇ ੧੧ ਭੱਟ',
    tithiRuleEn: 'Bhadon Vadhi 1 (26 Sawan, Sambat 2082)',
    tithiRulePa: 'ਭਾਦੋਂ ਵਦੀ ੧ (੨੬ ਸਾਵਣ, ਸੰਮਤ ੨੦੮੨)',
    summaryEn:
      'Manuscript completion date of the Kartarpur Adi Bir by Sri Guru Arjan Dev Ji and Bhai Gurdas Ji (Bhadon Vadhi 1, 1661 Bikrami) and remembrance of all 11 Bhatt Sahibaan.',
    summaryPa:
      'ਭਾਦੋਂ ਵਦੀ ੧ ਸੰਮਤ ੧੬੬੧ ਬਿਕ੍ਰਮੀ ਨੂੰ ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਤੇ ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਵੱਲੋਂ ਆਦਿ ਬੀੜ ਸੰਪੂਰਨਤਾ ਅਤੇ ਗਿਆਰਾਂ ਭੱਟ ਸਾਹਿਬਾਨ ਦੀ ਯਾਦ।',
    historicalContextEn:
      'Honors the 11 Bhatts whose 123 Swaiye appear on Angs 1389–1409: Bhatt Kalh, Jalap, Kirat, Bhikha, Salh, Bhalh, Nalh, Gayand, Mathura, Balh, and Harbans Ji.',
    historicalContextPa:
      'ਅੰਗ ੧੩੮੯–੧੪੦੯ ’ਤੇ ਦਰਜ ੧੧ ਭੱਟ ਸਾਹਿਬਾਨ—ਕਲ੍ਹ, ਜਾਲਪ, ਕੀਰਤਿ, ਭਿਖਾ, ਸਲ੍ਹ, ਭਲ੍ਹ, ਨਲ੍ਹ, ਗਯੰਦ, ਮਥੁਰਾ, ਬਲ੍ਹ ਅਤੇ ਹਰਿਬੰਸ ਜੀ ਦੀ ਪਾਵਨ ਯਾਦ।',
    subGroups: ['bhagat-bhatt'],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=1389',
    citations: [
      {
        sourceEn: 'Kartarpur Adi Bir Manuscript Colophon',
        sourcePa: 'ਕਰਤਾਰਪੁਰੀ ਆਦਿ ਬੀੜ ਪੁਰਾਤਨ ਤਤਕਰਾ',
        referenceEn: 'Sambat 1661 Miti Bhadon Vadi 1 Pothi Likhi Pahunche',
        referencePa: 'ਸੰਮਤ ੧੬੬੧ ਮਿਤੀ ਭਾਦੋਂ ਵਦੀ ੧ ਪੋਥੀ ਲਿਖਿ ਪਹੁੰਚੇ',
      },
      {
        sourceEn: 'Sri Guru Granth Sahib Ji (Swaiye Mahalle Pehle Ke)',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਸਵਈਏ ਮਹਲੇ ਪਹਿਲੇ ਕੇ)',
        referenceEn: 'Ang 1389 · Bhatt Kalh Ji & 11 Bhatt Sahibaan',
        referencePa: 'ਅੰਗ ੧੩੮੯ · ਭੱਟ ਕਲ੍ਹ ਜੀ ਅਤੇ ੧੧ ਭੱਟ ਸਾਹਿਬਾਨ',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=1389',
      },
    ],
  },
  {
    id: '2082-pehla-parkash-sggs',
    date: '2025-08-24',
    sambat: 2082,
    category: 'gurpurab',
    titleEn: 'Pehla Parkash Purab — Sri Guru Granth Sahib Ji (Sri Harmandir Sahib, 1604)',
    titlePa: 'ਪਹਿਲਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ, ੧੬੦੪)',
    shortLabelEn: 'Pehla Parkash SGGS Ji',
    shortLabelPa: 'ਪਹਿਲਾ ਪ੍ਰਕਾਸ਼ SGGS ਜੀ',
    tithiRuleEn: 'Bhadon Sudhi 1 (8 Bhadon, Sambat 2082)',
    tithiRulePa: 'ਭਾਦੋਂ ਸੁਦੀ ੧ (੮ ਭਾਦੋਂ, ਸੰਮਤ ੨੦੮੨)',
    summaryEn:
      '421st anniversary of the First Installation of Adi Sri Guru Granth Sahib Ji at Sachkhand Sri Harmandir Sahib with Baba Budha Ji as First Granthi, plus Bhagat & Satta-Balwand Bani.',
    summaryPa:
      'ਭਾਦੋਂ ਸੁਦੀ ੧ (੧੬੬੧ ਬਿਕ੍ਰਮੀ) ਨੂੰ ਸੱਚਖੰਡ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਵਿਖੇ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੇ ਪਹਿਲੇ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ ਦਾ ੪੨੧ਵਾਂ ਦਿਹਾੜਾ।',
    historicalContextEn:
      'On Bhadon Sudhi 1, Sambat 1661 Bikrami (1604 CE), Sri Guru Arjan Dev Ji installed the Adi Granth at Sri Harmandir Sahib, enshrining Gurbani alongside the 15 Bhagats, 11 Bhatts, and Gursikh Bani-kars (Bhai Satta, Balwand, Mardana, Baba Sundar Ji).',
    historicalContextPa:
      'ਭਾਦੋਂ ਸੁਦੀ ੧ ਸੰਮਤ ੧੬੬੧ ਬਿਕ੍ਰਮੀ ਨੂੰ ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਨੇ ਸੱਚਖੰਡ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਵਿਖੇ ਆਦਿ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦਾ ਪਹਿਲਾ ਪ੍ਰਕਾਸ਼ ਕੀਤਾ।',
    subGroups: ['bhagat-bhatt', 'gursikh'],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=783',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji (First Hukamnama — Raag Suhi Mahalla 5)',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਪਹਿਲਾ ਹੁਕਮਨਾਮਾ — ਰਾਗ ਸੂਹੀ ਮਹਲਾ ੫)',
        referenceEn: 'Ang 783 · Santa Ke Karaj Aap Khaloya',
        referencePa: 'ਅੰਗ ੭੮੩ · ਸੰਤਾ ਕੇ ਕਾਰਜਿ ਆਪਿ ਖਲੋਇਆ',
        excerptPa: 'ਸੰਤਾ ਕੇ ਕਾਰਜਿ ਆਪਿ ਖਲੋਇਆ ਹਰਿ ਕੰਮੁ ਕਰਾਵਣਿ ਆਇਆ ਰਾਮ ॥',
        excerptTranslit: 'Santaa ke kaaraj aap khaloiaa Har kamm karaavan aaiaa Raam.',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=783',
      },
    ],
    featured: true,
  },
  {
    id: '2082-joti-jot-bhai-gurdas-ji',
    date: '2025-08-28',
    sambat: 2082,
    category: 'barsi',
    titleEn: 'Joti Jot — Bhai Gurdas Ji (Scribe of Adi Granth Sahib Ji)',
    titlePa: 'ਜੋਤੀ ਜੋਤ — ਭਾਈ ਗੁਰਦਾਸ ਜੀ (ਆਦਿ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੇ ਲਿਖਾਰੀ)',
    shortLabelEn: 'Bhai Gurdas Ji',
    shortLabelPa: 'ਭਾਈ ਗੁਰਦਾਸ ਜੀ',
    tithiRuleEn: 'Bhadon Sudhi 5 (12 Bhadon, Sambat 2082)',
    tithiRulePa: 'ਭਾਦੋਂ ਸੁਦੀ ੫ (੧੨ ਭਾਦੋਂ, ਸੰਮਤ ੨੦੮੨)',
    summaryEn:
      'Annual commemoration of Bhai Gurdas Ji (1551–1636), scribe of Adi Granth Sahib Ji and author of the 40 Vaaran ("Gurbani di Kunji").',
    summaryPa:
      'ਆਦਿ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੇ ਲਿਖਾਰੀ ਅਤੇ ੪੦ ਵਾਰਾਂ ("ਗੁਰਬਾਣੀ ਦੀ ਕੁੰਜੀ") ਦੇ ਰਚਨਹਾਰ ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਦਾ ਜੋਤੀ ਜੋਤ ਦਿਹਾੜਾ।',
    historicalContextEn:
      'Bhai Gurdas Ji merged into the Divine Light at Goindwal Sahib on Bhadon Sudhi 5, Sambat 1693 Bikrami in the presence of Sri Guru Hargobind Sahib Ji.',
    historicalContextPa:
      'ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਭਾਦੋਂ ਸੁਦੀ ੫ ਸੰਮਤ ੧੬੯੩ ਬਿਕ੍ਰਮੀ ਨੂੰ ਗੋਇੰਦਵਾਲ ਸਾਹਿਬ ਵਿਖੇ ਜੋਤੀ ਜੋਤ ਸਮਾਏ।',
    subGroups: ['gursikh'],
    citations: [
      {
        sourceEn: 'Bhai Gurdas Ji Vaaran',
        sourcePa: 'ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਵਾਰਾਂ',
        referenceEn: 'Vaar 1, Pauri 27 · Satgur Nanak Pragatia',
        referencePa: 'ਵਾਰ ੧, ਪਉੜੀ ੨੭ · ਸਤਿਗੁਰ ਨਾਨਕ ਪ੍ਰਗਟਿਆ',
      },
    ],
  },
  {
    id: '2082-dasam-granth-chaupai-colophon',
    date: '2025-08-31',
    sambat: 2082,
    category: 'khalsa',
    titleEn: 'Sri Dasam Granth Colophon — Completion of Benti Chaupai Sahib (1753 Bikrami)',
    titlePa: 'ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ ਹਵਾਲਾ — ਬੇਨਤੀ ਚੌਪਈ ਸਾਹਿਬ ਸੰਪੂਰਨਤਾ (੧੭੫੩ ਬਿਕ੍ਰਮੀ)',
    shortLabelEn: 'Chaupai Sahib Colophon',
    shortLabelPa: 'ਚੌਪਈ ਸਾਹਿਬ ਹਵਾਲਾ',
    tithiRuleEn: 'Bhadon Sudhi 8 (15 Bhadon, Sambat 2082)',
    tithiRulePa: 'ਭਾਦੋਂ ਸੁਦੀ ੮ (੧੫ ਭਾਦੋਂ, ਸੰਮਤ ੨੦੮੨)',
    summaryEn:
      'Scriptural colophon date of Charitropakhyan & Benti Chaupai Sahib revealed by Sri Guru Gobind Singh Ji on the banks of the Satluj (Bhadon Sudhi Ashtami, 1753 Bikrami).',
    summaryPa:
      'ਸਤਲੁਜ ਦਰਿਆ ਦੇ ਕੰਢੇ ਭਾਦੋਂ ਸੁਦੀ ਅਸ਼ਟਮੀ ਸੰਮਤ ੧੭੫੩ ਬਿਕ੍ਰਮੀ ਨੂੰ ਦਸਮੇਸ਼ ਪਿਤਾ ਵੱਲੋਂ ਬੇਨਤੀ ਚੌਪਈ ਸਾਹਿਬ ਦੀ ਸੰਪੂਰਨਤਾ ਦਾ ਪਾਵਨ ਦਿਹਾੜਾ।',
    historicalContextEn:
      'The explicit verse colophon in Sri Dasam Granth Sahib Ji records: "Sambat Satrah Sahas Bhanijai, Ardh Sahas Phun Teen Kahijai, Bhadrav Sudhi Ashtami Ravi Vaara, Teer Satudrav Granth Sudhaara."',
    historicalContextPa:
      'ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਵਿੱਚ ਦਰਜ ਹੈ: "ਸੰਬਤ ਸਤ੍ਰਹ ਸਹਸ ਭਣਿੱਜੈ ॥ ਅਰਧ ਸਹਸ ਫੁਨਿ ਤੀਨਿ ਕਹਿੱਜੈ ॥ ਭਾਦ੍ਰਵ ਸੁਦੀ ਅਸਟਮੀ ਰਵਿ ਵਾਰਾ ॥ ਤੀਰ ਸਤੁਦ੍ਰਵ ਗ੍ਰੰਥ ਸੁਧਾਰਾ ॥"',
    pothiUrl: 'https://pothi.tatkhalsa.in/sundar-gutka/chaupai-sahib',
    citations: [
      {
        sourceEn: 'Sri Dasam Granth Sahib Ji (Charitropakhyan 405 · Benti Chaupai)',
        sourcePa: 'ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਚਰਿਤ੍ਰੋਪਾਖਿਆਨ ੪੦੫ · ਬੇਨਤੀ ਚੌਪਈ)',
        referenceEn: 'Ang 1388 · Bhadrav Sudhi Ashtami Ravi Vaara, Teer Satudrav Granth Sudhaara',
        referencePa: 'ਅੰਗ ੧੩੮੮ · ਭਾਦ੍ਰਵ ਸੁਦੀ ਅਸਟਮੀ ਰਵਿ ਵਾਰਾ, ਤੀਰ ਸਤੁਦ੍ਰਵ ਗ੍ਰੰਥ ਸੁਧਾਰਾ',
        excerptPa: 'ਭਾਦ੍ਰਵ ਸੁਦੀ ਅਸਟਮੀ ਰਵਿ ਵਾਰਾ ॥ ਤੀਰ ਸਤੁਦ੍ਰਵ ਗ੍ਰੰਥ ਸੁਧਾਰਾ ॥',
        excerptTranslit: 'Bhaadrav sudee astamee ravi vaaraa, teer satudrav granth sudhaaraa.',
        pothiUrl: 'https://pothi.tatkhalsa.in/sundar-gutka/chaupai-sahib',
      },
    ],
  },
  {
    id: '2082-joti-jot-guru-nanak-dev',
    date: '2025-09-16',
    sambat: 2082,
    category: 'gurpurab',
    titleEn: 'Joti Jot — Sri Guru Nanak Dev Ji & Guru Nanak Parivar',
    titlePa: 'ਜੋਤੀ ਜੋਤ — ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਅਤੇ ਗੁਰੂ ਨਾਨਕ ਪਰਿਵਾਰ',
    shortLabelEn: 'Joti Jot Guru Nanak Ji',
    shortLabelPa: 'ਜੋਤੀ ਜੋਤ ਗੁਰੂ ਨਾਨਕ ਜੀ',
    tithiRuleEn: 'Assu Vadhi 10 (31 Bhadon, Sambat 2082)',
    tithiRulePa: 'ਅੱਸੂ ਵਦੀ ੧੦ (੩੧ ਭਾਦੋਂ, ਸੰਮਤ ੨੦੮੨)',
    summaryEn:
      'Puratan Joti Jot commemoration of First Patshah Sri Guru Nanak Dev Ji at Sri Kartarpur Sahib (Assu Vadhi 10, 1596 Bikrami / 1539 CE), honoring Bebe Nanaki, Mata Sulakhni & Baba Lakhmi Das Ji.',
    summaryPa:
      'ਸ੍ਰੀ ਕਰਤਾਰਪੁਰ ਸਾਹਿਬ ਵਿਖੇ ਅੱਸੂ ਵਦੀ ੧੦ (੧੫੯੬ ਬਿਕ੍ਰਮੀ) ਨੂੰ ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਦਾ ਜੋਤੀ ਜੋਤ ਦਿਹਾੜਾ ਅਤੇ ਬੇਬੇ ਨਾਨਕੀ, ਮਾਤਾ ਸੁਲੱਖਣੀ ਤੇ ਬਾਬਾ ਲਖਮੀ ਦਾਸ ਜੀ ਦੀ ਯਾਦ।',
    historicalContextEn:
      'After bestowing the Guruship upon Bhai Lehna Ji (Sri Guru Angad Dev Ji), Sri Guru Nanak Dev Ji merged into Eternal Light at Kartarpur Sahib on Assu Vadhi 10, 1596 Bikrami.',
    historicalContextPa:
      'ਭਾਈ ਲਹਿਣਾ ਜੀ ਨੂੰ ਸ੍ਰੀ ਗੁਰੂ ਅੰਗਦ ਦੇਵ ਜੀ ਥਾਪ ਕੇ ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਅੱਸੂ ਵਦੀ ੧੦ ਸੰਮਤ ੧੫੯੬ ਬਿਕ੍ਰਮੀ ਨੂੰ ਸ੍ਰੀ ਕਰਤਾਰਪੁਰ ਸਾਹਿਬ ਵਿਖੇ ਜੋਤੀ ਜੋਤ ਸਮਾਏ।',
    subGroups: ['guru-ghar'],
    citations: [
      {
        sourceEn: 'Puratan Janamsakhi & Mehma Prakash',
        sourcePa: 'ਪੁਰਾਤਨ ਜਨਮਸਾਖੀ ਅਤੇ ਮਹਿਮਾ ਪ੍ਰਕਾਸ਼',
        referenceEn: 'Assu Vadhi 10, Sambat 1596 Bikrami · Sri Kartarpur Sahib',
        referencePa: 'ਅੱਸੂ ਵਦੀ ੧੦, ਸੰਮਤ ੧੫੯੬ ਬਿਕ੍ਰਮੀ · ਸ੍ਰੀ ਕਰਤਾਰਪੁਰ ਸਾਹਿਬ',
      },
    ],
  },
  {
    id: '2082-bhog-dussehra-mahattam',
    date: '2025-10-01',
    sambat: 2082,
    category: 'khalsa',
    titleEn: 'Bhog Dussehra Mahattam Paath & Shastar Darshan',
    titlePa: 'ਭੋਗ ਦੁਸਹਿਰਾ ਮਹਾਤਮ ਪਾਠ ਅਤੇ ਸ਼ਸਤਰ ਦਰਸ਼ਨ',
    shortLabelEn: 'Bhog Dussehra Mahattam',
    shortLabelPa: 'ਭੋਗ ਦੁਸਹਿਰਾ ਮਹਾਤਮ',
    tithiRuleEn: 'Assu Sudhi 9 (15 Assu, Sambat 2082)',
    tithiRulePa: 'ਅੱਸੂ ਸੁਦੀ ੯ (੧੫ ਅੱਸੂ, ਸੰਮਤ ੨੦੮੨)',
    summaryEn:
      'Traditional Bhog of Sri Dasam Granth Sahib Ji Dussehra Mahattam and Shastar Darshan Maryada at Takhat Sachkhand Sri Hazur Sahib and Nihang Singh Dals.',
    summaryPa:
      'ਤਖ਼ਤ ਸੱਚਖੰਡ ਸ੍ਰੀ ਹਜ਼ੂਰ ਸਾਹਿਬ ਅਤੇ ਨਿਹੰਗ ਸਿੰਘ ਦਲਾਂ ਵਿਖੇ ਦੁਸਹਿਰਾ ਮਹਾਤਮ ਪਾਠ ਦਾ ਭੋਗ ਅਤੇ ਸ਼ਸਤਰ ਦਰਸ਼ਨ।',
    historicalContextEn:
      'Nine days of Chandi Di Vaar and Chandi Charitar culminate in Shastar Darshan and Ardas for Panthic Chardi Kala.',
    historicalContextPa:
      'ਨੌਂ ਦਿਨਾਂ ਦੇ ਪਾਠਾਂ ਉਪਰੰਤ ਚੰਡੀ ਦੀ ਵਾਰ ਦੇ ਭੋਗ ਪਾ ਕੇ ਸ਼ਸਤਰ ਦਰਸ਼ਨ ਕਰਵਾਏ ਜਾਂਦੇ ਹਨ।',
    citations: [
      {
        sourceEn: 'Sri Dasam Granth Sahib Ji (Chandi Di Vaar)',
        sourcePa: 'ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਚੰਡੀ ਦੀ ਵਾਰ)',
        referenceEn: 'Pauri 1 · Pritham Bhagauti Simar Kai',
        referencePa: 'ਪਉੜੀ ੧ · ਪ੍ਰਿਥਮ ਭਗੌਤੀ ਸਿਮਰਿ ਕੈ',
      },
    ],
  },
  {
    id: '2082-janam-baba-budha-ji',
    date: '2025-10-04',
    sambat: 2082,
    category: 'barsi',
    titleEn: 'Janam Divas — Brahmgyani Baba Budha Ji',
    titlePa: 'ਜਨਮ ਦਿਹਾੜਾ — ਬ੍ਰਹਮਗਿਆਨੀ ਬਾਬਾ ਬੁੱਢਾ ਜੀ',
    shortLabelEn: 'Janam Baba Budha Ji',
    shortLabelPa: 'ਜਨਮ ਬਾਬਾ ਬੁੱਢਾ ਜੀ',
    tithiRuleEn: 'Assu Sudhi 12 (18 Assu, Sambat 2082)',
    tithiRulePa: 'ਅੱਸੂ ਸੁਦੀ ੧੨ (੧੮ ਅੱਸੂ, ਸੰਮਤ ੨੦੮੨)',
    summaryEn:
      'Birth commemoration of Baba Budha Ji (1563 Bikrami), First Head Granthi of Sachkhand Sri Harmandir Sahib.',
    summaryPa:
      'ਸੱਚਖੰਡ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦੇ ਪਹਿਲੇ ਮੁੱਖ ਗ੍ਰੰਥੀ ਬ੍ਰਹਮਗਿਆਨੀ ਬਾਬਾ ਬੁੱਢਾ ਜੀ ਦਾ ਜਨਮ ਦਿਹਾੜਾ।',
    historicalContextEn:
      'Born at Kathunangal on Assu Sudhi 12, 1563 Bikrami, Baba Budha Ji served six Guru Sahiban and performed the Gurgaddi Tilak for five Gurus.',
    historicalContextPa:
      'ਕੱਥੂਨੰਗਲ ਵਿਖੇ ਅੱਸੂ ਸੁਦੀ ੧੨ ਸੰਮਤ ੧੫੬੩ ਨੂੰ ਪ੍ਰਗਟ ਹੋਏ ਬਾਬਾ ਬੁੱਢਾ ਜੀ ਨੇ ਛੇ ਗੁਰੂ ਸਾਹਿਬਾਨ ਦੀ ਸੇਵਾ ਨਿਭਾਈ।',
    subGroups: ['gursikh'],
    citations: [
      {
        sourceEn: 'Sri Gur Pratap Suraj Granth',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ',
        referenceEn: 'Raas 4, Ansu 25 · Granthi Seva of Baba Budha Ji',
        referencePa: 'ਰਾਸਿ ੪, ਅੰਸੂ ੨੫ · ਬਾਬਾ ਬੁੱਢਾ ਜੀ ਦੀ ਸੇਵਾ',
      },
    ],
  },
  {
    id: '2082-parkash-guru-ram-das',
    date: '2025-10-08',
    sambat: 2082,
    category: 'gurpurab',
    titleEn: 'Parkash Purab — Sri Guru Ram Das Sahib Ji',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸ੍ਰੀ ਗੁਰੂ ਰਾਮਦਾਸ ਸਾਹਿਬ ਜੀ',
    shortLabelEn: 'Parkash Guru Ram Das Ji',
    shortLabelPa: 'ਪ੍ਰਕਾਸ਼ ਗੁਰੂ ਰਾਮਦਾਸ ਜੀ',
    tithiRuleEn: 'Katak Vadhi 2 (22 Assu, Sambat 2082)',
    tithiRulePa: 'ਕੱਤਕ ਵਦੀ ੨ (੨੨ ਅੱਸੂ, ਸੰਮਤ ੨੦੮੨)',
    summaryEn:
      'Puratan lunar Parkash Purab of Fourth Patshah Sri Guru Ram Das Sahib Ji, founder of Sri Amritsar Sahib (Katak Vadhi 2, 1591 Bikrami).',
    summaryPa:
      'ਸ੍ਰੀ ਅੰਮ੍ਰਿਤਸਰ ਸਾਹਿਬ ਦੇ ਬਾਨੀ ਚੌਥੇ ਪਾਤਸ਼ਾਹ ਸ੍ਰੀ ਗੁਰੂ ਰਾਮਦਾਸ ਸਾਹਿਬ ਜੀ ਦਾ ਪੁਰਾਤਨ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ (ਕੱਤਕ ਵਦੀ ੨, ੧੫੯੧ ਬਿਕ੍ਰਮੀ)।',
    historicalContextEn:
      'Born at Chuna Mandi, Lahore on Katak Vadhi 2, 1591 Bikrami (1534 CE), Sri Guru Ram Das Ji excavated the Amrit Sarovar and composed the Lavan of Anand Karaj.',
    historicalContextPa:
      'ਚੂਨਾ ਮੰਡੀ ਲਾਹੌਰ ਵਿਖੇ ਕੱਤਕ ਵਦੀ ੨ ਸੰਮਤ ੧੫੯੧ ਨੂੰ ਪ੍ਰਗਟ ਹੋਏ ਚੌਥੇ ਪਾਤਸ਼ਾਹ ਜੀ ਨੇ ਸ੍ਰੀ ਅੰਮ੍ਰਿਤਸਰ ਸਾਹਿਬ ਦੀ ਨੀਂਹ ਰੱਖੀ।',
    subGroups: ['guru-ghar'],
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji (Swaiye Mahalle Chauthe Ke)',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਸਵਈਏ ਮਹਲੇ ਚਉਥੇ ਕੇ)',
        referenceEn: 'Ang 1398 · Dhan Dhan Ram Das Gur',
        referencePa: 'ਅੰਗ ੧੩੯੮ · ਧੰਨੁ ਧੰਨੁ ਰਾਮਦਾਸ ਗੁਰੁ',
        excerptPa: 'ਧੰਨੁ ਧੰਨੁ ਰਾਮਦਾਸ ਗੁਰੁ ਜਿਨਿ ਸਿਰਿਆ ਤਿਨੈ ਸਵਾਰਿਆ ॥',
        excerptTranslit: 'Dhann dhann Raamdaas Gur jin siriaa tinai savaariaa.',
      },
    ],
    featured: true,
  },
  {
    id: '2082-aagman-sheikh-farid-ji',
    date: '2025-10-15',
    sambat: 2082,
    category: 'khalsa',
    titleEn: 'Aagman Purab — Baba Sheikh Farid Ji',
    titlePa: 'ਆਗਮਨ ਪੁਰਬ — ਬਾਬਾ ਸ਼ੇਖ਼ ਫ਼ਰੀਦ ਜੀ',
    shortLabelEn: 'Baba Sheikh Farid Ji',
    shortLabelPa: 'ਬਾਬਾ ਸ਼ੇਖ਼ ਫ਼ਰੀਦ ਜੀ',
    tithiRuleEn: '29 Assu, Sambat 2082 (Faridkot & Pakpattan)',
    tithiRulePa: '੨੯ ਅੱਸੂ, ਸੰਮਤ ੨੦੮੨ (ਫ਼ਰੀਦਕੋਟ ਅਤੇ ਪਾਕਪਟਨ)',
    summaryEn:
      'Commemoration of Baba Sheikh Farid Ji (1173–1266), whose 4 shabads and 112 saloks are enshrined in Sri Guru Granth Sahib Ji.',
    summaryPa:
      'ਬਾਬਾ ਸ਼ੇਖ਼ ਫ਼ਰੀਦ ਜੀ ਦਾ ਆਗਮਨ ਪੁਰਬ, ਜਿਨ੍ਹਾਂ ਦੇ ੪ ਸ਼ਬਦ ਅਤੇ ੧੧੨ ਸਲੋਕ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਵਿੱਚ ਦਰਜ ਹਨ।',
    historicalContextEn:
      'Baba Sheikh Farid Ji’s humility, sweetness of speech, and longing for the Divine remain a foundational jewel of Punjabi literature and Gurbani.',
    historicalContextPa:
      'ਬਾਬਾ ਸ਼ੇਖ਼ ਫ਼ਰੀਦ ਜੀ ਦੀ ਨਿਮਰਤਾ, ਮਿੱਠਤ ਅਤੇ ਬਿਰਹਾ ਭਰੀ ਬਾਣੀ ਪੰਜਾਬੀ ਸਾਹਿਤ ਅਤੇ ਗੁਰਬਾਣੀ ਦਾ ਅਮੋਲਕ ਖ਼ਜ਼ਾਨਾ ਹੈ।',
    subGroups: ['bhagat-bhatt'],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=1377',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji (Salok Sheikh Farid Ke)',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਸਲੋਕ ਸ਼ੇਖ ਫਰੀਦ ਕੇ)',
        referenceEn: 'Ang 1377 · Salok 1',
        referencePa: 'ਅੰਗ ੧੩੭੭ · ਸਲੋਕ ੧',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=1377',
      },
    ],
  },
  {
    id: '2082-barsi-mahakavi-bhai-santokh-singh',
    date: '2025-10-17',
    sambat: 2082,
    category: 'barsi',
    titleEn: 'Barsi — Mahakavi Bhai Santokh Singh Ji (Author of Suraj Prakash)',
    titlePa: 'ਬਰਸੀ — ਮਹਾਂਕਵੀ ਭਾਈ ਸੰਤੋਖ ਸਿੰਘ ਜੀ (ਸੂਰਜ ਪ੍ਰਕਾਸ਼ ਦੇ ਰਚਨਹਾਰ)',
    shortLabelEn: 'Mahakavi Bhai Santokh Singh',
    shortLabelPa: 'ਮਹਾਂਕਵੀ ਭਾਈ ਸੰਤੋਖ ਸਿੰਘ',
    tithiRuleEn: 'Katak Vadhi 11 (1 Katak, Sambat 2082)',
    tithiRulePa: 'ਕੱਤਕ ਵਦੀ ੧੧ (੧ ਕੱਤਕ, ਸੰਮਤ ੨੦੮੨)',
    summaryEn:
      'Annual Barsi of Churamani Mahakavi Bhai Santokh Singh Ji (1787–1843), author of Sri Nanak Prakash and Sri Gur Pratap Suraj Granth.',
    summaryPa:
      'ਸ੍ਰੀ ਨਾਨਕ ਪ੍ਰਕਾਸ਼ ਅਤੇ ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ ਦੇ ਮਹਾਨ ਰਚਨਹਾਰ ਮਹਾਂਕਵੀ ਭਾਈ ਸੰਤੋਖ ਸਿੰਘ ਜੀ ਦੀ ਸਾਲਾਨਾ ਬਰਸੀ।',
    historicalContextEn:
      'Completed at Kaithal in Sambat 1900 Bikrami (1843 CE), Bhai Santokh Singh Ji’s 51,829-verse Suraj Prakash remains the premier Puratan Sikh historical classic.',
    historicalContextPa:
      'ਸੰਮਤ ੧੯੦੦ ਬਿਕ੍ਰਮੀ ਵਿੱਚ ਕੈਥਲ ਵਿਖੇ ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ ਸੰਪੂਰਨ ਕਰਨ ਵਾਲੇ ਮਹਾਂਕਵੀ ਭਾਈ ਸੰਤੋਖ ਸਿੰਘ ਜੀ ਦੀ ਬਰਸੀ।',
    subGroups: ['gursikh'],
    citations: [
      {
        sourceEn: 'Sri Gur Pratap Suraj Granth',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ',
        referenceEn: 'Colophon · Sambat 1900 Bikrami, Kaithal',
        referencePa: 'ਸਮਾਪਤੀ ਪ੍ਰਸੰਗ · ਸੰਮਤ ੧੯੦੦ ਬਿਕ੍ਰਮੀ, ਕੈਥਲ',
      },
    ],
  },
  {
    id: '2082-bandi-chhor-divas',
    date: '2025-10-21',
    sambat: 2082,
    category: 'khalsa',
    titleEn: 'Bandi Chhor Divas — Return of Sri Guru Hargobind Sahib Ji',
    titlePa: 'ਬੰਦੀ ਛੋੜ ਦਿਵਸ — ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਦੀ ਸ੍ਰੀ ਅੰਮ੍ਰਿਤਸਰ ਵਾਪਸੀ',
    shortLabelEn: 'Bandi Chhor Divas',
    shortLabelPa: 'ਬੰਦੀ ਛੋੜ ਦਿਵਸ',
    tithiRuleEn: 'Katak Masya (5 Katak, Sambat 2082)',
    tithiRulePa: 'ਕੱਤਕ ਮੱਸਿਆ (੫ ਕੱਤਕ, ਸੰਮਤ ੨੦੮੨)',
    summaryEn:
      'Liberation of 52 imprisoned rulers from Gwalior Fort and illumination (Deepmala) of Sachkhand Sri Harmandir Sahib on Katak Masya.',
    summaryPa:
      'ਗਵਾਲੀਅਰ ਦੇ ਕਿਲ੍ਹੇ ਵਿੱਚੋਂ ੫੨ ਰਾਜਿਆਂ ਦੀ ਰਿਹਾਈ ਅਤੇ ਕੱਤਕ ਮੱਸਿਆ ਨੂੰ ਸੱਚਖੰਡ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਵਿਖੇ ਦੀਪਮਾਲਾ।',
    historicalContextEn:
      'Observed strictly on Katak Masya (new moon), Bandi Chhor Divas commemorates Sixth Patshah’s triumphant arrival at Sri Amritsar Sahib.',
    historicalContextPa:
      'ਕੱਤਕ ਦੀ ਮੱਸਿਆ ਨੂੰ ਛੇਵੇਂ ਪਾਤਸ਼ਾਹ ਜੀ ਦੀ ੫੨ ਰਾਜਿਆਂ ਸਮੇਤ ਸ੍ਰੀ ਅੰਮ੍ਰਿਤਸਰ ਸਾਹਿਬ ਆਮਦ ਦੀ ਖ਼ੁਸ਼ੀ ਵਿੱਚ ਬੰਦੀ ਛੋੜ ਦਿਵਸ ਮਨਾਇਆ ਜਾਂਦਾ ਹੈ।',
    citations: [
      {
        sourceEn: 'Sri Gur Pratap Suraj Granth',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ',
        referenceEn: 'Raas 5, Ansu 26–32 · Gwalior Release & Deepmala at Amritsar',
        referencePa: 'ਰਾਸਿ ੫, ਅੰਸੂ ੨੬–੩੨ · ਗਵਾਲੀਅਰ ਰਿਹਾਈ ਅਤੇ ਸ੍ਰੀ ਅੰਮ੍ਰਿਤਸਰ ਦੀਪਮਾਲਾ',
      },
      {
        sourceEn: 'Bhai Gurdas Ji Vaaran',
        sourcePa: 'ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਵਾਰਾਂ',
        referenceEn: 'Vaar 19, Pauri 6 · Diwali Dee Raat Deeve Baaleean',
        referencePa: 'ਵਾਰ ੧੯, ਪਉੜੀ ੬ · ਦੀਵਾਲੀ ਦੀ ਰਾਤਿ ਦੀਵੇ ਬਾਲੀਅਨਿ',
      },
    ],
    featured: true,
  },
  {
    id: '2082-gurgaddi-sggs-ji',
    date: '2025-10-25',
    sambat: 2082,
    category: 'gurpurab',
    titleEn: 'Gurgaddi Divas — Sri Guru Granth Sahib Ji (Takhat Sri Hazur Sahib, 1708)',
    titlePa: 'ਗੁਰਤਾਗੱਦੀ ਦਿਵਸ — ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਤਖ਼ਤ ਸ੍ਰੀ ਹਜ਼ੂਰ ਸਾਹਿਬ, ੧੭੦੮)',
    shortLabelEn: 'Gurgaddi SGGS Ji',
    shortLabelPa: 'ਗੁਰਗੱਦੀ SGGS ਜੀ',
    tithiRuleEn: 'Katak Sudhi 4 (9 Katak, Sambat 2082)',
    tithiRulePa: 'ਕੱਤਕ ਸੁਦੀ ੪ (੯ ਕੱਤਕ, ਸੰਮਤ ੨੦੮੨)',
    summaryEn:
      '317th anniversary of Eternal Guruship bestowed upon Sri Guru Granth Sahib Ji by Sri Guru Gobind Singh Ji at Nanded (Katak Sudhi 4, 1765 Bikrami).',
    summaryPa:
      'ਕੱਤਕ ਸੁਦੀ ੪ ਸੰਮਤ ੧੭੬੫ ਬਿਕ੍ਰਮੀ (੧੭੦੮) ਨੂੰ ਸ੍ਰੀ ਨਾਂਦੇੜ ਸਾਹਿਬ ਵਿਖੇ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਨੂੰ ਸਦੀਵੀ ਗੁਰਤਾਗੱਦੀ ਬਖ਼ਸ਼ਿਸ਼ ਦਾ ੩੧੭ਵਾਂ ਦਿਹਾੜਾ।',
    historicalContextEn:
      'Before merging into the Eternal Light, Tenth Patshah bowed before Sri Guru Granth Sahib Ji with five paisa and a coconut, proclaiming "Sabh Sikhan Ko Hukam Hai Guru Maniyo Granth."',
    historicalContextPa:
      'ਦਸਮੇਸ਼ ਪਿਤਾ ਜੀ ਨੇ ਪੰਜ ਪੈਸੇ ਤੇ ਨਾਰੀਅਲ ਰੱਖ ਕੇ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਨੂੰ ਮੱਥਾ ਟੇਕਿਆ ਅਤੇ "ਸਭ ਸਿੱਖਨ ਕੋ ਹੁਕਮ ਹੈ ਗੁਰੂ ਮਾਨਿਓ ਗ੍ਰੰਥ" ਦਾ ਆਦੇਸ਼ ਦਿੱਤਾ।',
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=1',
    citations: [
      {
        sourceEn: 'Bhatt Vahi Talauda (Pargana Jind)',
        sourcePa: 'ਭੱਟ ਵਹੀ ਤਲੌਡਾ (ਪਰਗਣਾ ਜੀਂਦ)',
        referenceEn: 'Katak Sudhi 4, Sambat 1765 Bikrami · Nanded, Godavari',
        referencePa: 'ਕੱਤਕ ਸੁਦੀ ੪, ਸੰਮਤ ੧੭੬੫ ਬਿਕ੍ਰਮੀ · ਨਾਂਦੇੜ, ਗੋਦਾਵਰੀ',
      },
    ],
    featured: true,
  },
  {
    id: '2082-joti-jot-guru-gobind-singh',
    date: '2025-10-26',
    sambat: 2082,
    category: 'gurpurab',
    titleEn: 'Joti Jot — Sri Guru Gobind Singh Sahib Ji (Sri Hazur Sahib)',
    titlePa: 'ਜੋਤੀ ਜੋਤ — ਸ੍ਰੀ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਸਾਹਿਬ ਜੀ (ਸ੍ਰੀ ਹਜ਼ੂਰ ਸਾਹਿਬ)',
    shortLabelEn: 'Joti Jot Guru Gobind Singh Ji',
    shortLabelPa: 'ਜੋਤੀ ਜੋਤ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ',
    tithiRuleEn: 'Katak Sudhi 5 (10 Katak, Sambat 2082)',
    tithiRulePa: 'ਕੱਤਕ ਸੁਦੀ ੫ (੧੦ ਕੱਤਕ, ਸੰਮਤ ੨੦੮੨)',
    summaryEn:
      'Joti Jot commemoration of Tenth Patshah Sri Guru Gobind Singh Sahib Ji at Takhat Sachkhand Sri Hazur Sahib, Nanded (Katak Sudhi 5, 1765 Bikrami).',
    summaryPa:
      'ਕੱਤਕ ਸੁਦੀ ੫ ਸੰਮਤ ੧੭੬੫ ਬਿਕ੍ਰਮੀ (੧੭੦੮) ਨੂੰ ਤਖ਼ਤ ਸੱਚਖੰਡ ਸ੍ਰੀ ਹਜ਼ੂਰ ਸਾਹਿਬ, ਨਾਂਦੇੜ ਵਿਖੇ ਦਸਮੇਸ਼ ਪਿਤਾ ਜੀ ਦਾ ਜੋਤੀ ਜੋਤ ਦਿਹਾੜਾ।',
    historicalContextEn:
      'After declaring Sri Guru Granth Sahib Ji the eternal Guru and dispatching Baba Banda Singh Bahadur to Punjab, Tenth Patshah departed for Sachkhand on Katak Sudhi 5, 1765 Bikrami.',
    historicalContextPa:
      'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਨੂੰ ਗੁਰਤਾਗੱਦੀ ਸੌਂਪਣ ਉਪਰੰਤ ਦਸਮੇਸ਼ ਪਿਤਾ ਜੀ ਕੱਤਕ ਸੁਦੀ ੫ ਸੰਮਤ ੧੭੬੫ ਬਿਕ੍ਰਮੀ ਨੂੰ ਸੱਚਖੰਡ ਪਿਆਨਾ ਕਰ ਗਏ।',
    subGroups: ['guru-ghar'],
    citations: [
      {
        sourceEn: 'Sri Gur Sobha (Kavi Sainapati)',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰ ਸੋਭਾ (ਕਵੀ ਸੈਨਾਪਤਿ)',
        referenceEn: 'Chapter 18 · Katak Sudhi 5, Sambat 1765 Bikrami',
        referencePa: 'ਅਧਿਆਇ ੧੮ · ਕੱਤਕ ਸੁਦੀ ੫, ਸੰਮਤ ੧੭੬੫ ਬਿਕ੍ਰਮੀ',
      },
    ],
  },
  {
    id: '2082-janam-bhagat-namdev-ji',
    date: '2025-11-01',
    sambat: 2082,
    category: 'khalsa',
    titleEn: 'Janam Purab — Shiromani Bhagat Namdev Ji',
    titlePa: 'ਜਨਮ ਪੁਰਬ — ਸ਼੍ਰੋਮਣੀ ਭਗਤ ਨਾਮਦੇਵ ਜੀ',
    shortLabelEn: 'Bhagat Namdev Ji',
    shortLabelPa: 'ਭਗਤ ਨਾਮਦੇਵ ਜੀ',
    tithiRuleEn: 'Katak Sudhi 11 (16 Katak, Sambat 2082)',
    tithiRulePa: 'ਕੱਤਕ ਸੁਦੀ ੧੧ (੧੬ ਕੱਤਕ, ਸੰਮਤ ੨੦੮੨)',
    summaryEn:
      'Birth commemoration of Shiromani Bhagat Namdev Ji (1270–1350), whose 61 shabads are enshrined in Sri Guru Granth Sahib Ji.',
    summaryPa:
      'ਸ਼੍ਰੋਮਣੀ ਭਗਤ ਨਾਮਦੇਵ ਜੀ ਦਾ ਜਨਮ ਪੁਰਬ, ਜਿਨ੍ਹਾਂ ਦੇ ੬੧ ਸ਼ਬਦ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਵਿੱਚ ਦਰਜ ਹਨ।',
    historicalContextEn:
      'Born at Narsi Bamani (Maharashtra) and spending his final decades at Ghuman (Gurdaspur, Punjab), Bhagat Namdev Ji exemplified fearless devotion to the One All-Pervading Lord.',
    historicalContextPa:
      'ਮਹਾਰਾਸ਼ਟਰ ਵਿੱਚ ਪ੍ਰਗਟ ਹੋਏ ਅਤੇ ਘੁਮਾਣ (ਪੰਜਾਬ) ਵਿਖੇ ਲੰਮਾ ਸਮਾਂ ਭਗਤੀ ਕਰਨ ਵਾਲੇ ਭਗਤ ਨਾਮਦੇਵ ਜੀ ਨੇ ਸਰਬ-ਵਿਆਪਕ ਪ੍ਰਭੂ ਦੀ ਭਗਤੀ ਦਾ ਉਪਦੇਸ਼ ਦਿੱਤਾ।',
    subGroups: ['bhagat-bhatt'],
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji (Raag Bhairau — Bhagat Namdev Ji)',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਰਾਗ ਭੈਰਉ — ਭਗਤ ਨਾਮਦੇਵ ਜੀ)',
        referenceEn: 'Ang 1163 · Mai Bauri Mera Ram Bhatar',
        referencePa: 'ਅੰਗ ੧੧੬੩ · ਮੈ ਬਉਰੀ ਮੇਰਾ ਰਾਮੁ ਭਤਾਰੁ',
      },
    ],
  },
  {
    id: '2082-parkash-guru-nanak-dev-556',
    date: '2025-11-05',
    sambat: 2082,
    category: 'gurpurab',
    titleEn: '556th Parkash Purab — Sri Guru Nanak Dev Ji',
    titlePa: '੫੫੬ਵਾਂ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ',
    shortLabelEn: '556th Parkash Guru Nanak Ji',
    shortLabelPa: '੫੫੬ਵਾਂ ਪ੍ਰਕਾਸ਼ ਗੁਰੂ ਨਾਨਕ ਜੀ',
    tithiRuleEn: 'Katak Puranmashi (20 Katak, Sambat 2082)',
    tithiRulePa: 'ਕੱਤਕ ਪੂਰਨਮਾਸ਼ੀ (੨੦ ਕੱਤਕ, ਸੰਮਤ ੨੦੮੨)',
    summaryEn:
      '556th Puratan Katak Puranmashi Parkash Purab of First Patshah Sri Guru Nanak Dev Ji (Wednesday, 5 November 2025 / 20 Katak, Sambat 2082).',
    summaryPa:
      'ਪਹਿਲੇ ਪਾਤਸ਼ਾਹ ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਦਾ ੫੫੬ਵਾਂ ਪੁਰਾਤਨ ਕੱਤਕ ਪੂਰਨਮਾਸ਼ੀ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ (ਬੁੱਧਵਾਰ, ੫ ਨਵੰਬਰ ੨੦੨੫ / ੨੦ ਕੱਤਕ, ਸੰਮਤ ੨੦੮੨)।',
    historicalContextEn:
      'Observed across the Sikh world on Katak Sudhi 15 (Puranmashi) in accordance with Puratan Janamsakhi, Bhai Bala Janamsakhi, Sri Nanak Prakash, and centuries-old Maryada at Sri Nankana Sahib and Sri Harmandir Sahib.',
    historicalContextPa:
      'ਸ੍ਰੀ ਨਨਕਾਣਾ ਸਾਹਿਬ ਅਤੇ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦੀ ਪੁਰਾਤਨ ਮਰਯਾਦਾ ਅਨੁਸਾਰ ਕੱਤਕ ਪੂਰਨਮਾਸ਼ੀ ਨੂੰ ਸਤਿਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਦਾ ੫੫੬ਵਾਂ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ।',
    subGroups: ['guru-ghar'],
    pothiUrl: 'https://pothi.tatkhalsa.in/sundar-gutka/japji-sahib',
    citations: [
      {
        sourceEn: 'Bhai Gurdas Ji Vaaran',
        sourcePa: 'ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਵਾਰਾਂ',
        referenceEn: 'Vaar 1, Pauri 27 · Satgur Nanak Pragatia Miti Dhund Jag Chanan Hoa',
        referencePa: 'ਵਾਰ ੧, ਪਉੜੀ ੨੭ · ਸਤਿਗੁਰ ਨਾਨਕ ਪ੍ਰਗਟਿਆ ਮਿਟੀ ਧੁੰਧੁ ਜਗਿ ਚਾਨਣੁ ਹੋਆ',
        excerptPa: 'ਸਤਿਗੁਰ ਨਾਨਕ ਪ੍ਰਗਟਿਆ ਮਿਟੀ ਧੁੰਧੁ ਜਗਿ ਚਾਨਣੁ ਹੋਆ ॥',
        excerptTranslit: 'Satgur Naanak pragatiaa mitee dhundh jag chaanan hoaa.',
      },
      {
        sourceEn: 'Sri Nanak Prakash (Mahakavi Bhai Santokh Singh Ji)',
        sourcePa: 'ਸ੍ਰੀ ਨਾਨਕ ਪ੍ਰਕਾਸ਼ (ਮਹਾਂਕਵੀ ਭਾਈ ਸੰਤੋਖ ਸਿੰਘ ਜੀ)',
        referenceEn: 'Purbaradh, Adhyai 2 · Katak Puranmashi Parkash at Talwandi Rai Bhoe',
        referencePa: 'ਪੂਰਬਾਰਧ, ਅਧਿਆਇ ੨ · ਰਾਇ ਭੋਇ ਦੀ ਤਲਵੰਡੀ ਵਿਖੇ ਕੱਤਕ ਪੂਰਨਮਾਸ਼ੀ ਪ੍ਰਕਾਸ਼',
      },
    ],
    featured: true,
  },
  {
    id: '2082-shaheedi-baba-deep-singh-ji',
    date: '2025-11-15',
    sambat: 2082,
    category: 'shaheedi',
    titleEn: 'Shaheedi Divas — Dhan Dhan Baba Deep Singh Ji Shaheed',
    titlePa: 'ਸ਼ਹੀਦੀ ਦਿਵਸ — ਧੰਨ ਧੰਨ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਸ਼ਹੀਦ',
    shortLabelEn: 'Shaheedi Baba Deep Singh Ji',
    shortLabelPa: 'ਸ਼ਹੀਦੀ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ',
    tithiRuleEn: '30 Katak, Sambat 2082 (Sri Amritsar Sahib, 1757)',
    tithiRulePa: '੩੦ ਕੱਤਕ, ਸੰਮਤ ੨੦੮੨ (ਸ੍ਰੀ ਅੰਮ੍ਰਿਤਸਰ ਸਾਹਿਬ, ੧੭੫੭)',
    summaryEn:
      'Supreme martyrdom of First Jathedar of Damdami Taksal & Shaheedan Misl, Baba Deep Singh Ji (30 Katak 1814 Bikrami) defending Sachkhand Sri Harmandir Sahib.',
    summaryPa:
      'ਦਮਦਮੀ ਟਕਸਾਲ ਅਤੇ ਸ਼ਹੀਦਾਂ ਮਿਸਲ ਦੇ ਪਹਿਲੇ ਜਥੇਦਾਰ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਸ਼ਹੀਦ (੩੦ ਕੱਤਕ ੧੮੧੪ ਬਿਕ੍ਰਮੀ) ਦੀ ਸੱਚਖੰਡ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦੀ ਰੱਖਿਆ ਲਈ ਸ਼ਹਾਦਤ।',
    historicalContextEn:
      'At age 75, Baba Deep Singh Ji marched from Damdama Sahib to liberate Sri Harmandir Sahib from Jahan Khan, fulfilling his vow at the Parikrama of Sri Harmandir Sahib.',
    historicalContextPa:
      '੭੫ ਸਾਲ ਦੀ ਉਮਰ ਵਿੱਚ ਦਮਦਮਾ ਸਾਹਿਬ ਤੋਂ ਚੱਲ ਕੇ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਨੇ ਸੀਸ ਤਲੀ ’ਤੇ ਰੱਖ ਕੇ ਸੱਚਖੰਡ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦੀ ਪਰਿਕਰਮਾ ਵਿੱਚ ਆਪਣਾ ਪ੍ਰਣ ਪੂਰਾ ਕੀਤਾ।',
    subGroups: ['gursikh'],
    citations: [
      {
        sourceEn: 'Prachin Panth Prakash (Bhai Rattan Singh Bhangu)',
        sourcePa: 'ਪ੍ਰਾਚੀਨ ਪੰਥ ਪ੍ਰਕਾਸ਼ (ਭਾਈ ਰਤਨ ਸਿੰਘ ਭੰਗੂ)',
        referenceEn: 'Shaheedi Prasang of Baba Deep Singh Ji · 30 Katak 1814 Bikrami',
        referencePa: 'ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਸ਼ਹੀਦੀ ਪ੍ਰਸੰਗ · ੩੦ ਕੱਤਕ ੧੮੧੪ ਬਿਕ੍ਰਮੀ',
      },
    ],
  },
  {
    id: '2082-shaheedi-guru-tegh-bahadur-350',
    date: '2025-11-25',
    sambat: 2082,
    category: 'shaheedi',
    titleEn: '350th Shaheedi Divas — Sri Guru Tegh Bahadur Ji, Bhai Mati Das, Bhai Sati Das & Bhai Dayala Ji',
    titlePa: '੩੫੦ਵਾਂ ਸ਼ਹੀਦੀ ਦਿਵਸ — ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ਼ ਬਹਾਦਰ ਜੀ, ਭਾਈ ਮਤੀ ਦਾਸ, ਸਤੀ ਦਾਸ ਤੇ ਦਇਆਲਾ ਜੀ',
    shortLabelEn: '350th Shaheedi Guru Tegh Bahadur Ji',
    shortLabelPa: '੩੫੦ਵਾਂ ਸ਼ਹੀਦੀ ਗੁਰੂ ਤੇਗ਼ ਬਹਾਦਰ ਜੀ',
    tithiRuleEn: 'Maghar Sudhi 5 (10 Maghar, Sambat 2082)',
    tithiRulePa: 'ਮੱਘਰ ਸੁਦੀ ੫ (੧੦ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੨)',
    summaryEn:
      'Historic 350th Shaheedi Shatabdi (1675–2025) of Hind Di Chadar Sri Guru Tegh Bahadur Sahib Ji and three devoted Gursikhs at Chandni Chowk, Delhi (Maghar Sudhi 5, 1732 Bikrami).',
    summaryPa:
      'ਹਿੰਦ ਦੀ ਚਾਦਰ ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ਼ ਬਹਾਦਰ ਸਾਹਿਬ ਜੀ ਅਤੇ ਭਾਈ ਮਤੀ ਦਾਸ, ਸਤੀ ਦਾਸ ਤੇ ਦਇਆਲਾ ਜੀ ਦੀ ਚਾਂਦਨੀ ਚੌਕ ਦਿੱਲੀ ਵਿਖੇ ੩੫੦ਵੀਂ ਸ਼ਹੀਦੀ ਸ਼ਤਾਬਦੀ (੧੬੭੫–੨੦੨੫)।',
    historicalContextEn:
      'Sambat 2082 marks the 350th anniversary of Ninth Patshah’s unparalleled sacrifice on Maghar Sudhi 5, 1732 Bikrami (1675 CE) in defense of religious freedom and human conscience ("Tilak Janju Rakha Prabh Taaka").',
    historicalContextPa:
      'ਸੰਮਤ ੨੦੮੨ ਵਿੱਚ ਮੱਘਰ ਸੁਦੀ ੫ (੧੭੩੨ ਬਿਕ੍ਰਮੀ / ੧੬੭੫) ਨੂੰ ਧਰਮ ਅਤੇ ਮਨੁੱਖੀ ਆਜ਼ਾਦੀ ਦੀ ਰੱਖਿਆ ਲਈ ਦਿੱਤੀ ਸ਼ਹਾਦਤ ਦੀ ੩੫੦ਵੀਂ ਸ਼ਤਾਬਦੀ ਮਨਾਈ ਗਈ।',
    subGroups: ['guru-ghar', 'gursikh'],
    pothiUrl: 'https://pothi.tatkhalsa.in/sundar-gutka/salok-mahalla-9',
    citations: [
      {
        sourceEn: 'Sri Dasam Granth Sahib Ji (Bachitar Natak)',
        sourcePa: 'ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਬਚਿਤ੍ਰ ਨਾਟਕ)',
        referenceEn: 'Adhyai 5 · Tilak Janju Rakha Prabh Taaka',
        referencePa: 'ਅਧਿਆਇ ੫ · ਤਿਲਕ ਜੰਞੂ ਰਾਖਾ ਪ੍ਰਭ ਤਾਕਾ',
        excerptPa: 'ਤਿਲਕ ਜੰਞੂ ਰਾਖਾ ਪ੍ਰਭ ਤਾਕਾ ॥ ਕੀਨੋ ਬਡੋ ਕਲੂ ਮਹਿ ਸਾਕਾ ॥',
        excerptTranslit: 'Tilak janjoo raakhaa Prabh taakaa, keeno bado kaloo meh saakaa.',
      },
      {
        sourceEn: 'Bhatt Vahi Talauda (Pargana Jind)',
        sourcePa: 'ਭੱਟ ਵਹੀ ਤਲੌਡਾ (ਪਰਗਣਾ ਜੀਂਦ)',
        referenceEn: 'Maghar Sudhi 5, Sambat 1732 Bikrami · Chandni Chowk, Delhi',
        referencePa: 'ਮੱਘਰ ਸੁਦੀ ੫, ਸੰਮਤ ੧੭੩੨ ਬਿਕ੍ਰਮੀ · ਚਾਂਦਨੀ ਚੌਕ, ਦਿੱਲੀ',
      },
    ],
    featured: true,
  },
  {
    id: '2082-shaheedi-hafta-qila-chhodna',
    date: '2025-12-21',
    sambat: 2082,
    category: 'shaheedi',
    titleEn: 'Shaheedi Hafta Begins — Qila Anandgarh Chhodna & Sarsa Nadi Vichhora',
    titlePa: 'ਸ਼ਹੀਦੀ ਹਫ਼ਤਾ ਆਰੰਭ — ਕਿਲ੍ਹਾ ਅਨੰਦਗੜ੍ਹ ਛੱਡਣਾ ਅਤੇ ਸਰਸਾ ਨਦੀ ਵਿਛੋੜਾ',
    shortLabelEn: 'Qila Chhodna & Sarsa',
    shortLabelPa: 'ਕਿਲ੍ਹਾ ਛੱਡਣਾ ਤੇ ਸਰਸਾ',
    tithiRuleEn: '6–7 Poh, Sambat 2082 (Anandpur Sahib & Sarsa, 1704)',
    tithiRulePa: '੬–੭ ਪੋਹ, ਸੰਮਤ ੨੦੮੨ (ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਅਤੇ ਸਰਸਾ, ੧੭੦੪)',
    summaryEn:
      'Evacuation of Sri Anandpur Sahib (6 Poh 1761 Bikrami) and Battle of Sarsa Nadi (7 Poh) with Shaheedi of Bhai Uday Singh Ji & Bhai Bachittar Singh Ji.',
    summaryPa:
      '੬–੭ ਪੋਹ ੧੭੬੧ ਬਿਕ੍ਰਮੀ ਨੂੰ ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਦਾ ਕਿਲ੍ਹਾ ਛੱਡਣਾ, ਸਰਸਾ ਨਦੀ ਪਰਿਵਾਰ ਵਿਛੋੜਾ ਅਤੇ ਭਾਈ ਉਦੈ ਸਿੰਘ ਤੇ ਬਚਿੱਤਰ ਸਿੰਘ ਜੀ ਦੀ ਸ਼ਹਾਦਤ।',
    historicalContextEn:
      'Marks the opening of the solemn Shaheedi Hafta when Guru Gobind Singh Ji’s family separated in the icy winter waters of the swollen Sarsa river.',
    historicalContextPa:
      'ਪੋਹ ਮਹੀਨੇ ਦੀਆਂ ਠੰਡੀਆਂ ਰਾਤਾਂ ਵਿੱਚ ਸਰਸਾ ਨਦੀ ਕੰਢੇ ਹੋਏ ਪਰਿਵਾਰ ਵਿਛੋੜੇ ਅਤੇ ਸ਼ਹੀਦੀ ਹਫ਼ਤੇ ਦਾ ਆਰੰਭ।',
    subGroups: ['guru-ghar', 'gursikh'],
    citations: [
      {
        sourceEn: 'Bhatt Vahi Multani Sindhi & Guru Kian Sakhian',
        sourcePa: 'ਭੱਟ ਵਹੀ ਮੁਲਤਾਨੀ ਸਿੰਧੀ ਅਤੇ ਗੁਰੂ ਕੀਆਂ ਸਾਖੀਆਂ',
        referenceEn: '6–7 Poh, Sambat 1761 Bikrami · Anandpur & Sarsa Nadi',
        referencePa: '੬–੭ ਪੋਹ, ਸੰਮਤ ੧੭੬੧ ਬਿਕ੍ਰਮੀ · ਅਨੰਦਪੁਰ ਅਤੇ ਸਰਸਾ ਨਦੀ',
      },
    ],
  },
  {
    id: '2082-vadde-sahibzade-chamkaur',
    date: '2025-12-23',
    sambat: 2082,
    category: 'shaheedi',
    titleEn: 'Shaheedi — Vadde Sahibzade (Baba Ajit Singh & Baba Jujhar Singh Ji) at Sri Chamkaur Sahib',
    titlePa: 'ਸ਼ਹੀਦੀ — ਵੱਡੇ ਸਾਹਿਬਜ਼ਾਦੇ (ਬਾਬਾ ਅਜੀਤ ਸਿੰਘ ਤੇ ਬਾਬਾ ਜੁਝਾਰ ਸਿੰਘ ਜੀ) ਸ੍ਰੀ ਚਮਕੌਰ ਸਾਹਿਬ',
    shortLabelEn: 'Vadde Sahibzade · Chamkaur',
    shortLabelPa: 'ਵੱਡੇ ਸਾਹਿਬਜ਼ਾਦੇ · ਚਮਕੌਰ',
    tithiRuleEn: '8 Poh, Sambat 2082 (Garhi Chamkaur, 1761 Bikrami)',
    tithiRulePa: '੮ ਪੋਹ, ਸੰਮਤ ੨੦੮੨ (ਗੜ੍ਹੀ ਚਮਕੌਰ, ੧੭੬੧ ਬਿਕ੍ਰਮੀ)',
    summaryEn:
      'Martyrdom of Sahibzada Baba Ajit Singh Ji, Sahibzada Baba Jujhar Singh Ji, three Panj Pyare (Bhai Himmat Singh, Mohkam Singh, Sahib Singh Ji), and 40 Singhs of Chamkaur.',
    summaryPa:
      '੮ ਪੋਹ ੧੭੬੧ ਬਿਕ੍ਰਮੀ ਨੂੰ ਗੜ੍ਹੀ ਚਮਕੌਰ ਵਿਖੇ ਵੱਡੇ ਸਾਹਿਬਜ਼ਾਦੇ ਬਾਬਾ ਅਜੀਤ ਸਿੰਘ, ਬਾਬਾ ਜੁਝਾਰ ਸਿੰਘ, ਤਿੰਨ ਪਿਆਰੇ ਅਤੇ ੪੦ ਸਿੰਘਾਂ ਦੀ ਲਾਸਾਨੀ ਸ਼ਹਾਦਤ।',
    historicalContextEn:
      'Forty starved Singhs held off an imperial host outside the mud fortress of Chamkaur on 8 Poh 1761 Bikrami, immortalized by Tenth Patshah in the Zafarnama.',
    historicalContextPa:
      'ਚਾਲੀ ਭੁੱਖੇ-ਭਾਣੇ ਸਿੰਘਾਂ ਨੇ ਗੜ੍ਹੀ ਚਮਕੌਰ ਵਿਖੇ ਲੱਖਾਂ ਦੀ ਫ਼ੌਜ ਦਾ ਮੁਕਾਬਲਾ ਕਰਕੇ ਵਿਸ਼ਵ ਇਤਿਹਾਸ ਦੀ ਬੇਮਿਸਾਲ ਜੰਗ ਲੜੀ।',
    subGroups: ['guru-ghar', 'gursikh'],
    pothiUrl: 'https://pothi.tatkhalsa.in/sundar-gutka/zafarnama',
    citations: [
      {
        sourceEn: 'Sri Dasam Granth Sahib Ji (Zafarnama)',
        sourcePa: 'ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਜ਼ਫ਼ਰਨਾਮਾ)',
        referenceEn: 'Verse 19 · Gursanah Cheh Kaare Kunad Chehl Nar',
        referencePa: 'ਬੰਦ ੧੯ · ਗੁਰਸਨਹ ਚਿਹ ਕਾਰੈ ਕੁਨਦ ਚਿਹਲ ਨਰ',
        pothiUrl: 'https://pothi.tatkhalsa.in/sundar-gutka/zafarnama',
      },
    ],
    featured: true,
  },
  {
    id: '2082-parkash-guru-gobind-singh',
    date: '2025-12-27',
    sambat: 2082,
    category: 'gurpurab',
    titleEn: 'Parkash Purab — Sri Guru Gobind Singh Sahib Ji (Takhat Sri Patna Sahib)',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸ੍ਰੀ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਸਾਹਿਬ ਜੀ (ਤਖ਼ਤ ਸ੍ਰੀ ਪਟਨਾ ਸਾਹਿਬ)',
    shortLabelEn: 'Parkash Guru Gobind Singh Ji',
    shortLabelPa: 'ਪ੍ਰਕਾਸ਼ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ',
    tithiRuleEn: 'Poh Sudhi 7 (12 Poh, Sambat 2082)',
    tithiRulePa: 'ਪੋਹ ਸੁਦੀ ੭ (੧੨ ਪੋਹ, ਸੰਮਤ ੨੦੮੨)',
    summaryEn:
      'Puratan Poh Sudhi Saptami Parkash Purab of Tenth Patshah Sri Guru Gobind Singh Sahib Ji (Saturday, 27 December 2025 / 12 Poh, Sambat 2082).',
    summaryPa:
      'ਦਸਮੇਸ਼ ਪਿਤਾ ਸ੍ਰੀ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਸਾਹਿਬ ਜੀ ਦਾ ਪੁਰਾਤਨ ਪੋਹ ਸੁਦੀ ਸਪਤਮੀ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ (ਸ਼ਨਿੱਚਰਵਾਰ, ੨੭ ਦਸੰਬਰ ੨੦੨੫ / ੧੨ ਪੋਹ, ਸੰਮਤ ੨੦੮੨)।',
    historicalContextEn:
      'Born at Sri Patna Sahib on Poh Sudhi 7, Sambat 1723 Bikrami (1666 CE) to Sri Guru Tegh Bahadur Ji and Mata Gujri Ji. In Sambat 2082, Poh Sudhi 7 falls on 27 December 2025.',
    historicalContextPa:
      'ਪੋਹ ਸੁਦੀ ੭ ਸੰਮਤ ੧੭੨੩ ਬਿਕ੍ਰਮੀ ਨੂੰ ਸ੍ਰੀ ਪਟਨਾ ਸਾਹਿਬ ਵਿਖੇ ਪ੍ਰਗਟ ਹੋਏ ਦਸਮੇਸ਼ ਪਿਤਾ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ ਸੰਮਤ ੨੦੮੨ ਵਿੱਚ ੨੭ ਦਸੰਬਰ ੨੦੨੫ (੧੨ ਪੋਹ) ਨੂੰ ਮਨਾਇਆ ਗਿਆ।',
    subGroups: ['guru-ghar'],
    pothiUrl: 'https://pothi.tatkhalsa.in/sundar-gutka/jaap-sahib',
    citations: [
      {
        sourceEn: 'Sri Dasam Granth Sahib Ji (Bachitar Natak)',
        sourcePa: 'ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਬਚਿਤ੍ਰ ਨਾਟਕ)',
        referenceEn: 'Adhyai 7 · Tahin Prakash Hamara Bhayo, Patna Shehar Bikhai Bhav Layo',
        referencePa: 'ਅਧਿਆਇ ੭ · ਤਹੀ ਪ੍ਰਕਾਸ਼ ਹਮਾਰਾ ਭਯੋ, ਪਟਨਾ ਸਹਰ ਬਿਖੈ ਭਵ ਲਯੋ',
        excerptPa: 'ਤਹੀ ਪ੍ਰਕਾਸ਼ ਹਮਾਰਾ ਭਯੋ ॥ ਪਟਨਾ ਸਹਰ ਬਿਖੈ ਭਵ ਲਯੋ ॥',
        excerptTranslit: 'Tahee prakaash hamaaraa bhayo, Patnaa sahar bikhai bhav layo.',
        pothiUrl: 'https://pothi.tatkhalsa.in/sundar-gutka/jaap-sahib',
      },
    ],
    featured: true,
  },
  {
    id: '2082-chhote-sahibzade-sirhind',
    date: '2025-12-28',
    sambat: 2082,
    category: 'shaheedi',
    titleEn: 'Shaheedi — Chhote Sahibzade (Baba Zorawar Singh & Baba Fateh Singh Ji) & Mata Gujri Ji',
    titlePa: 'ਸ਼ਹੀਦੀ — ਛੋਟੇ ਸਾਹਿਬਜ਼ਾਦੇ (ਬਾਬਾ ਜ਼ੋਰਾਵਰ ਸਿੰਘ ਤੇ ਬਾਬਾ ਫ਼ਤਹਿ ਸਿੰਘ ਜੀ) ਅਤੇ ਮਾਤਾ ਗੁਜਰੀ ਜੀ',
    shortLabelEn: 'Chhote Sahibzade · Sirhind',
    shortLabelPa: 'ਛੋਟੇ ਸਾਹਿਬਜ਼ਾਦੇ · ਸਰਹਿੰਦ',
    tithiRuleEn: '13 Poh, Sambat 2082 (Sri Fatehgarh Sahib, 1761 Bikrami)',
    tithiRulePa: '੧੩ ਪੋਹ, ਸੰਮਤ ੨੦੮੨ (ਸ੍ਰੀ ਫ਼ਤਹਿਗੜ੍ਹ ਸਾਹਿਬ, ੧੭੬੧ ਬਿਕ੍ਰਮੀ)',
    summaryEn:
      'Supreme martyrdom of Baba Zorawar Singh Ji (age 9), Baba Fateh Singh Ji (age 7), and Mata Gujri Ji at Thanda Burj, Sirhind on 13 Poh 1761 Bikrami.',
    summaryPa:
      '੧੩ ਪੋਹ ੧੭੬੧ ਬਿਕ੍ਰਮੀ ਨੂੰ ਸਰਹਿੰਦ (ਸ੍ਰੀ ਫ਼ਤਹਿਗੜ੍ਹ ਸਾਹਿਬ) ਵਿਖੇ ਛੋਟੇ ਸਾਹਿਬਜ਼ਾਦੇ ਬਾਬਾ ਜ਼ੋਰਾਵਰ ਸਿੰਘ, ਬਾਬਾ ਫ਼ਤਹਿ ਸਿੰਘ ਅਤੇ ਮਾਤਾ ਗੁਜਰੀ ਜੀ ਦੀ ਅਦੁੱਤੀ ਸ਼ਹਾਦਤ।',
    historicalContextEn:
      'Bricked alive in the wall of Sirhind for refusing to renounce Sikhi, the younger Sahibzade and Mata Gujri Ji remain an eternal beacon of courage for all humanity.',
    historicalContextPa:
      'ਨੀਹਾਂ ਵਿੱਚ ਚਿਣੇ ਜਾਣ ਦੇ ਬਾਵਜੂਦ ਸਿੱਖੀ ਸਿਦਕ ’ਤੇ ਅਡੋਲ ਰਹੇ ਛੋਟੇ ਸਾਹਿਬਜ਼ਾਦੇ ਅਤੇ ਠੰਡੇ ਬੁਰਜ ਵਿੱਚ ਮਾਤਾ ਗੁਜਰੀ ਜੀ ਦੀ ਸ਼ਹਾਦਤ।',
    subGroups: ['guru-ghar'],
    citations: [
      {
        sourceEn: 'Bhatt Vahi Bhadson (Pargana Thanesar)',
        sourcePa: 'ਭੱਟ ਵਹੀ ਭਾਦਸੋਂ (ਪਰਗਣਾ ਥਾਨੇਸਰ)',
        referenceEn: '13 Poh, Sambat 1761 Bikrami · Sirhind Shaheedi Saka',
        referencePa: '੧੩ ਪੋਹ, ਸੰਮਤ ੧੭੬੧ ਬਿਕ੍ਰਮੀ · ਸਰਹਿੰਦ ਸ਼ਹੀਦੀ ਸਾਕਾ',
      },
    ],
    featured: true,
  },
  {
    id: '2082-maghi-chali-mukte',
    date: '2026-01-14',
    sambat: 2082,
    category: 'shaheedi',
    titleEn: 'Maghi — Shaheedi of Chali Mukte (Forty Liberated Ones) at Sri Muktsar Sahib',
    titlePa: 'ਮਾਘੀ — ਚਾਲੀ ਮੁਕਤਿਆਂ ਦੀ ਸ਼ਹੀਦੀ ਯਾਦਗਾਰ (ਸ੍ਰੀ ਮੁਕਤਸਰ ਸਾਹਿਬ)',
    shortLabelEn: 'Maghi · Chali Mukte',
    shortLabelPa: 'ਮਾਘੀ · ਚਾਲੀ ਮੁਕਤੇ',
    tithiRuleEn: '1 Magh, Sambat 2082 (Magh Sangrand)',
    tithiRulePa: '੧ ਮਾਘ, ਸੰਮਤ ੨੦੮੨ (ਮਾਘ ਸੰਗਰਾਂਦ)',
    summaryEn:
      'Annual Maghi commemoration of Bhai Mahan Singh Ji, Mata Bhag Kaur Ji, and the Forty Liberated Ones at Sri Muktsar Sahib on 1 Magh.',
    summaryPa:
      '੧ ਮਾਘ (ਮਾਘੀ) ਨੂੰ ਸ੍ਰੀ ਮੁਕਤਸਰ ਸਾਹਿਬ ਵਿਖੇ ਭਾਈ ਮਹਾਂ ਸਿੰਘ ਜੀ ਅਤੇ ਚਾਲੀ ਮੁਕਤਿਆਂ ਦੀ ਪਾਵਨ ਸ਼ਹੀਦੀ ਯਾਦਗਾਰ।',
    historicalContextEn:
      'At Khidrane di Dhab, Sri Guru Gobind Singh Ji tore up the Bedava at Bhai Mahan Singh Ji’s dying request and blessed the forty martyrs with eternal Mukti.',
    historicalContextPa:
      'ਖਿਦਰਾਣੇ ਦੀ ਢਾਬ ਵਿਖੇ ਭਾਈ ਮਹਾਂ ਸਿੰਘ ਜੀ ਦੀ ਬੇਨਤੀ ’ਤੇ ਦਸਮੇਸ਼ ਪਿਤਾ ਜੀ ਨੇ ਬੇਦਾਵਾ ਪਾੜ ਕੇ ਚਾਲੀ ਸਿੰਘਾਂ ਨੂੰ ਟੁੱਟੀ ਗੰਢੀ ਦੀ ਬਖ਼ਸ਼ਿਸ਼ ਕੀਤੀ।',
    subGroups: ['gursikh'],
    citations: [
      {
        sourceEn: 'Sri Gur Pratap Suraj Granth',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ',
        referenceEn: 'Ayan 1, Ansu 44–49 · Khidrane di Dhab & Tuti Gandhi',
        referencePa: 'ਅਯਨ ੧, ਅੰਸੂ ੪੪–੪੯ · ਖਿਦਰਾਣੇ ਦੀ ਢਾਬ ਅਤੇ ਟੁੱਟੀ ਗੰਢੀ',
      },
    ],
  },
  {
    id: '2082-basant-panchmi-baba-ajit-singh',
    date: '2026-01-23',
    sambat: 2082,
    category: 'khalsa',
    titleEn: 'Basant Panchmi & Janam Divas — Sahibzada Baba Ajit Singh Ji',
    titlePa: 'ਬਸੰਤ ਪੰਚਮੀ ਅਤੇ ਜਨਮ ਦਿਹਾੜਾ — ਸਾਹਿਬਜ਼ਾਦਾ ਬਾਬਾ ਅਜੀਤ ਸਿੰਘ ਜੀ',
    shortLabelEn: 'Basant · Baba Ajit Singh Ji',
    shortLabelPa: 'ਬਸੰਤ · ਬਾਬਾ ਅਜੀਤ ਸਿੰਘ ਜੀ',
    tithiRuleEn: 'Magh Sudhi 5 (10 Magh, Sambat 2082)',
    tithiRulePa: 'ਮਾਘ ਸੁਦੀ ੫ (੧੦ ਮਾਘ, ਸੰਮਤ ੨੦੮੨)',
    summaryEn:
      'Raag Basant kirtan maryada, Shaheedi of Bal Haqiqat Rai, and Parkash of eldest Sahibzada Baba Ajit Singh Ji (Paonta Sahib, 1743 Bikrami).',
    summaryPa:
      'ਰਾਗ ਬਸੰਤ ਕੀਰਤਨ ਮਰਯਾਦਾ ਅਤੇ ਵੱਡੇ ਸਾਹਿਬਜ਼ਾਦੇ ਬਾਬਾ ਅਜੀਤ ਸਿੰਘ ਜੀ (ਪਾਉਂਟਾ ਸਾਹਿਬ, ੧੭੪੩ ਬਿਕ੍ਰਮੀ) ਦਾ ਜਨਮ ਦਿਹਾੜਾ।',
    historicalContextEn:
      'From Lohri through Holla Mohalla, Raag Basant is sung across Sikh Takhats; on Magh Sudhi 5, Sambat 1743 Bikrami, Sahibzada Baba Ajit Singh Ji was born at Paonta Sahib.',
    historicalContextPa:
      'ਮਾਘ ਸੁਦੀ ੫ ਸੰਮਤ ੧੭੪੩ ਬਿਕ੍ਰਮੀ ਨੂੰ ਸ੍ਰੀ ਪਾਉਂਟਾ ਸਾਹਿਬ ਵਿਖੇ ਸਾਹਿਬਜ਼ਾਦਾ ਬਾਬਾ ਅਜੀਤ ਸਿੰਘ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਹੋਇਆ।',
    subGroups: ['guru-ghar'],
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji (Raag Basant)',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਰਾਗ ਬਸੰਤ)',
        referenceEn: 'Ang 1168 · Maaha Maah Mumaarakhee Chariaa Sadaa Basant',
        referencePa: 'ਅੰਗ ੧੧੬੮ · ਮਾਹਾ ਮਾਹ ਮੁਮਾਰਖੀ ਚੜਿਆ ਸਦਾ ਬਸੰਤੁ',
      },
    ],
  },
  {
    id: '2082-janam-baba-deep-singh-ji',
    date: '2026-01-27',
    sambat: 2082,
    category: 'barsi',
    titleEn: 'Janam Divas — Dhan Dhan Baba Deep Singh Ji Shaheed',
    titlePa: 'ਜਨਮ ਦਿਹਾੜਾ — ਧੰਨ ਧੰਨ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਸ਼ਹੀਦ',
    shortLabelEn: 'Janam Baba Deep Singh Ji',
    shortLabelPa: 'ਜਨਮ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ',
    tithiRuleEn: '14 Magh, Sambat 2082 (Pahuwind, 1738 Bikrami)',
    tithiRulePa: '੧੪ ਮਾਘ, ਸੰਮਤ ੨੦੮੨ (ਪਹੂਵਿੰਡ, ੧੭੩੮ ਬਿਕ੍ਰਮੀ)',
    summaryEn:
      'Birth commemoration of Baba Deep Singh Ji Shaheed (14 Magh 1738 Bikrami / 1682 CE) at village Pahuwind, Tarn Taran.',
    summaryPa:
      'ਪਿੰਡ ਪਹੂਵਿੰਡ (ਤਰਨ ਤਾਰਨ) ਵਿਖੇ ੧੪ ਮਾਘ ੧੭੩੮ ਬਿਕ੍ਰਮੀ (੧੬੮੨) ਨੂੰ ਪ੍ਰਗਟ ਹੋਏ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਸ਼ਹੀਦ ਦਾ ਜਨਮ ਦਿਹਾੜਾ।',
    historicalContextEn:
      'Great scholar, scribe of four hand-written copies of Sri Guru Granth Sahib Ji at Damdama Sahib, and first Jathedar of Damdami Taksal.',
    historicalContextPa:
      'ਦਮਦਮਾ ਸਾਹਿਬ ਵਿਖੇ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੇ ਚਾਰ ਸਰੂਪ ਆਪਣੇ ਹੱਥੀਂ ਲਿਖਣ ਵਾਲੇ ਮਹਾਨ ਵਿਦਵਾਨ ਅਤੇ ਯੋਧੇ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਦਾ ਜਨਮ ਦਿਹਾੜਾ।',
    subGroups: ['gursikh'],
    citations: [
      {
        sourceEn: 'Damdami Taksal & Panthic Historical Records',
        sourcePa: 'ਦਮਦਮੀ ਟਕਸਾਲ ਅਤੇ ਪੰਥਕ ਇਤਿਹਾਸਕ ਰਿਕਾਰਡ',
        referenceEn: '14 Magh 1738 Bikrami · Pahuwind, Tarn Taran',
        referencePa: '੧੪ ਮਾਘ ੧੭੩੮ ਬਿਕ੍ਰਮੀ · ਪਹੂਵਿੰਡ, ਤਰਨ ਤਾਰਨ',
      },
    ],
  },
  {
    id: '2082-parkash-guru-har-rai',
    date: '2026-01-31',
    sambat: 2082,
    category: 'gurpurab',
    titleEn: 'Parkash Purab — Sri Guru Har Rai Sahib Ji',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸ੍ਰੀ ਗੁਰੂ ਹਰਿ ਰਾਇ ਸਾਹਿਬ ਜੀ',
    shortLabelEn: 'Parkash Guru Har Rai Ji',
    shortLabelPa: 'ਪ੍ਰਕਾਸ਼ ਗੁਰੂ ਹਰਿ ਰਾਇ ਜੀ',
    tithiRuleEn: 'Magh Sudhi 13 (18 Magh, Sambat 2082)',
    tithiRulePa: 'ਮਾਘ ਸੁਦੀ ੧੩ (੧੮ ਮਾਘ, ਸੰਮਤ ੨੦੮੨)',
    summaryEn:
      'Puratan lunar Parkash Purab of Seventh Patshah Sri Guru Har Rai Sahib Ji (Magh Sudhi 13, 1686 Bikrami at Sri Kiratpur Sahib).',
    summaryPa:
      'ਸੱਤਵੇਂ ਪਾਤਸ਼ਾਹ ਸ੍ਰੀ ਗੁਰੂ ਹਰਿ ਰਾਇ ਸਾਹਿਬ ਜੀ ਦਾ ਪੁਰਾਤਨ ਚੰਦਰ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ (ਮਾਘ ਸੁਦੀ ੧੩, ੧੬੮੬ ਬਿਕ੍ਰਮੀ, ਸ੍ਰੀ ਕੀਰਤਪੁਰ ਸਾਹਿਬ)।',
    historicalContextEn:
      'Renowned for his tender compassion for all creation, herbal Dawakhana at Kiratpur Sahib, and unwavering protection of the purity of Gurbani.',
    historicalContextPa:
      'ਦਇਆ ਦੇ ਸਾਗਰ ਸੱਤਵੇਂ ਪਾਤਸ਼ਾਹ ਜੀ ਨੇ ਸ੍ਰੀ ਕੀਰਤਪੁਰ ਸਾਹਿਬ ਵਿਖੇ ਦਵਾਖਾਨਾ ਅਤੇ ਬਾਗ਼ ਲਗਵਾਏ ਅਤੇ ਗੁਰਬਾਣੀ ਦੇ ਸ਼ੁੱਧ ਪਾਠ ਦੀ ਰੱਖਿਆ ਕੀਤੀ।',
    subGroups: ['guru-ghar'],
    citations: [
      {
        sourceEn: 'Sri Gur Pratap Suraj Granth',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ',
        referenceEn: 'Raas 9, Ansu 1 · Parkash at Sri Kiratpur Sahib',
        referencePa: 'ਰਾਸਿ ੯, ਅੰਸੂ ੧ · ਸ੍ਰੀ ਕੀਰਤਪੁਰ ਸਾਹਿਬ ਵਿਖੇ ਪ੍ਰਕਾਸ਼',
      },
    ],
  },
  {
    id: '2082-parkash-bhagat-ravidas-ji',
    date: '2026-02-01',
    sambat: 2082,
    category: 'khalsa',
    titleEn: 'Parkash Purab — Shiromani Bhagat Ravidas Ji',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸ਼੍ਰੋਮਣੀ ਭਗਤ ਰਵਿਦਾਸ ਜੀ',
    shortLabelEn: 'Bhagat Ravidas Ji',
    shortLabelPa: 'ਭਗਤ ਰਵਿਦਾਸ ਜੀ',
    tithiRuleEn: 'Magh Puranmashi (19 Magh, Sambat 2082)',
    tithiRulePa: 'ਮਾਘ ਪੂਰਨਮਾਸ਼ੀ (੧੯ ਮਾਘ, ਸੰਮਤ ੨੦੮੨)',
    summaryEn:
      'Birth commemoration of Shiromani Bhagat Ravidas Ji on Magh Puranmashi, author of 40 hymns in Sri Guru Granth Sahib Ji ("Begumpura Seher Ko Nao").',
    summaryPa:
      'ਮਾਘ ਪੂਰਨਮਾਸ਼ੀ ਨੂੰ ਸ਼੍ਰੋਮਣੀ ਭਗਤ ਰਵਿਦਾਸ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ, ਜਿਨ੍ਹਾਂ ਦੇ ੪੦ ਸ਼ਬਦ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਵਿੱਚ ਦਰਜ ਹਨ।',
    historicalContextEn:
      'Bhagat Ravidas Ji envisioned Begumpura—the sorrow-free city of equality, dignity, and divine sovereignty—enshrined on Ang 345 of Sri Guru Granth Sahib Ji.',
    historicalContextPa:
      'ਭਗਤ ਰਵਿਦਾਸ ਜੀ ਨੇ ਅੰਗ ੩੪੫ ’ਤੇ ਬੇਗਮਪੁਰਾ—ਦੁੱਖਾਂ ਤੇ ਭੇਦਭਾਵ ਤੋਂ ਰਹਿਤ ਆਦਰਸ਼ ਸ਼ਹਿਰ—ਦਾ ਅਲੌਕਿਕ ਸੰਕਲਪ ਦਿੱਤਾ।',
    subGroups: ['bhagat-bhatt'],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=345',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji (Raag Gauri — Bhagat Ravidas Ji)',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਰਾਗ ਗਉੜੀ — ਭਗਤ ਰਵਿਦਾਸ ਜੀ)',
        referenceEn: 'Ang 345 · Begumpura Seher Ko Nao',
        referencePa: 'ਅੰਗ ੩੪੫ · ਬੇਗਮ ਪੁਰਾ ਸਹਰ ਕੋ ਨਾਉ',
        excerptPa: 'ਬੇਗਮ ਪੁਰਾ ਸਹਰ ਕੋ ਨਾਉ ॥ ਦੂਖੁ ਅੰਦੋਹੁ ਨਹੀ ਤਿਹਿ ਠਾਉ ॥',
        excerptTranslit: 'Begam puraa sahar ko naao, dookh andoh nahee teh thaao.',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=345',
      },
    ],
  },
  {
    id: '2082-saka-sri-nankana-sahib',
    date: '2026-02-21',
    sambat: 2082,
    category: 'shaheedi',
    titleEn: 'Shaheedi Saka Sri Nankana Sahib (Bhai Lachhman Singh Dharowali & Jatha)',
    titlePa: 'ਸ਼ਹੀਦੀ ਸਾਕਾ ਸ੍ਰੀ ਨਨਕਾਣਾ ਸਾਹਿਬ (ਭਾਈ ਲਛਮਣ ਸਿੰਘ ਧਾਰੋਵਾਲੀ ਅਤੇ ਜਥਾ)',
    shortLabelEn: 'Saka Sri Nankana Sahib',
    shortLabelPa: 'ਸਾਕਾ ਸ੍ਰੀ ਨਨਕਾਣਾ ਸਾਹਿਬ',
    tithiRuleEn: '9 Phagun, Sambat 2082 (21 Feb 1921)',
    tithiRulePa: '੯ ਫੱਗਣ, ਸੰਮਤ ੨੦੮੨ (੨੧ ਫ਼ਰਵਰੀ ੧੯੨੧)',
    summaryEn:
      'Martyrdom of Bhai Lachhman Singh Dharowali, Bhai Dalip Singh, and over 130 peaceful Akali Singhs liberating Gurdwara Janam Asthan, Sri Nankana Sahib.',
    summaryPa:
      'ਗੁਰਦੁਆਰਾ ਜਨਮ ਅਸਥਾਨ ਸ੍ਰੀ ਨਨਕਾਣਾ ਸਾਹਿਬ ਦੀ ਆਜ਼ਾਦੀ ਲਈ ੧੯੨੧ ਵਿੱਚ ਸ਼ਹੀਦ ਹੋਏ ਭਾਈ ਲਛਮਣ ਸਿੰਘ ਧਾਰੋਵਾਲੀ ਅਤੇ ੧੩੦ ਤੋਂ ਵੱਧ ਸ਼ਹੀਦ ਸਿੰਘਾਂ ਦੀ ਯਾਦ।',
    historicalContextEn:
      'On 20–21 February 1921, peaceful Akali reformists recited Gurbani inside Gurdwara Janam Asthan while giving their lives to restore Panthic maryada.',
    historicalContextPa:
      '੨੦–੨੧ ਫ਼ਰਵਰੀ ੧੯੨੧ ਨੂੰ ਸ਼ਾਂਤਮਈ ਅਕਾਲੀ ਜਥੇ ਨੇ ਗੁਰਦੁਆਰਾ ਜਨਮ ਅਸਥਾਨ ਦੀ ਪਵਿੱਤਰਤਾ ਬਹਾਲ ਕਰਨ ਲਈ ਲਾਸਾਨੀ ਸ਼ਹਾਦਤਾਂ ਦਿੱਤੀਆਂ।',
    subGroups: ['gursikh'],
    citations: [
      {
        sourceEn: 'Panthic Historical Record · Gurdwara Sudhar Lehar',
        sourcePa: 'ਪੰਥਕ ਇਤਿਹਾਸਕ ਰਿਕਾਰਡ · ਗੁਰਦੁਆਰਾ ਸੁਧਾਰ ਲਹਿਰ',
        referenceEn: 'Phagun 1977 Bikrami (Feb 1921) · Sri Nankana Sahib Saka',
        referencePa: 'ਫੱਗਣ ੧੯੭੭ ਬਿਕ੍ਰਮੀ (ਫ਼ਰਵਰੀ ੧੯੨੧) · ਸ੍ਰੀ ਨਨਕਾਣਾ ਸਾਹਿਬ ਸਾਕਾ',
      },
    ],
  },
  {
    id: '2082-holla-mohalla-phagun',
    date: '2026-03-04',
    sambat: 2082,
    category: 'khalsa',
    titleEn: 'Holla Mohalla (Sri Anandpur Sahib · Chet Vadhi 1)',
    titlePa: 'ਹੋਲਾ ਮਹੱਲਾ (ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ · ਚੇਤ ਵਦੀ ੧)',
    shortLabelEn: 'Holla Mohalla',
    shortLabelPa: 'ਹੋਲਾ ਮਹੱਲਾ',
    tithiRuleEn: 'Chet Vadhi 1 (20 Phagun, Sambat 2082)',
    tithiRulePa: 'ਚੇਤ ਵਦੀ ੧ (੨੦ ਫੱਗਣ, ਸੰਮਤ ੨੦੮੨)',
    summaryEn:
      'Khalsa martial festival at Sri Anandpur Sahib on Chet Vadhi 1 (Wednesday, 4 March 2026 / 20 Phagun, Sambat 2082).',
    summaryPa:
      'ਚੇਤ ਵਦੀ ੧ (ਬੁੱਧਵਾਰ, ੪ ਮਾਰਚ ੨੦੨੬ / ੨੦ ਫੱਗਣ, ਸੰਮਤ ੨੦੮੨) ਨੂੰ ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਵਿਖੇ ਖ਼ਾਲਸਾਈ ਹੋਲਾ ਮਹੱਲਾ।',
    historicalContextEn:
      'Because lunar Chet Vadhi 1 precedes solar 1 Chet in March 2026, Holla Mohalla falls in late Phagun 2082—demonstrating authentic luni-solar Puratan Bikrami chronology.',
    historicalContextPa:
      'ਮਾਰਚ ੨੦੨੬ ਵਿੱਚ ਚੰਦਰ ਚੇਤ ਵਦੀ ੧ ਸੂਰਜੀ ੧ ਚੇਤ ਤੋਂ ਪਹਿਲਾਂ ਆਉਣ ਕਾਰਨ ਹੋਲਾ ਮਹੱਲਾ ੨੦ ਫੱਗਣ ਸੰਮਤ ੨੦੮੨ ਨੂੰ ਮਨਾਇਆ ਗਿਆ।',
    subGroups: ['gursikh'],
    citations: [
      {
        sourceEn: 'Sri Gur Pratap Suraj Granth',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ',
        referenceEn: 'Rut 4, Ansu 20–24 · Holgarh Fort, Sri Anandpur Sahib',
        referencePa: 'ਰੁੱਤ ੪, ਅੰਸੂ ੨੦–੨੪ · ਕਿਲ੍ਹਾ ਹੋਲਗੜ੍ਹ, ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ',
      },
    ],
    featured: true,
  },
  {
    id: '2082-delhi-fateh-divas',
    date: '2026-03-11',
    sambat: 2082,
    category: 'khalsa',
    titleEn: 'Delhi Fateh Divas — Baba Baghel Singh & Sardar Jassa Singh Ahluwalia (1783)',
    titlePa: 'ਦਿੱਲੀ ਫ਼ਤਹਿ ਦਿਵਸ — ਬਾਬਾ ਬਘੇਲ ਸਿੰਘ ਅਤੇ ਸਰਦਾਰ ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ (੧੭੮੩)',
    shortLabelEn: 'Delhi Fateh Divas',
    shortLabelPa: 'ਦਿੱਲੀ ਫ਼ਤਹਿ ਦਿਵਸ',
    tithiRuleEn: '27 Phagun, Sambat 2082 (Red Fort, 11 Mar 1783)',
    tithiRulePa: '੨੭ ਫੱਗਣ, ਸੰਮਤ ੨੦੮੨ (ਲਾਲ ਕਿਲ੍ਹਾ, ੧੧ ਮਾਰਚ ੧੭੮੩)',
    summaryEn:
      'Commemoration of the Khalsa conquest of Delhi (11 March 1783) by Baba Baghel Singh, Sardar Jassa Singh Ahluwalia, and Sardar Jassa Singh Ramgarhia, establishing historic Delhi Gurdwaras.',
    summaryPa:
      '੧੧ ਮਾਰਚ ੧੭੮੩ ਨੂੰ ਬਾਬਾ ਬਘੇਲ ਸਿੰਘ, ਸਰਦਾਰ ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ ਤੇ ਰਾਮਗੜ੍ਹੀਆ ਵੱਲੋਂ ਲਾਲ ਕਿਲ੍ਹੇ ’ਤੇ ਕੇਸਰੀ ਨਿਸ਼ਾਨ ਸਾਹਿਬ ਝੁਲਾਉਣ ਅਤੇ ਦਿੱਲੀ ਦੇ ਇਤਿਹਾਸਕ ਗੁਰਦੁਆਰਿਆਂ ਦੀ ਸਥਾਪਨਾ ਦੀ ਯਾਦ।',
    historicalContextEn:
      'After hoisting the Khalsa Nishan Sahib atop the Red Fort in 1783, Baba Baghel Singh Ji stayed in Delhi to locate and construct Gurdwara Sis Ganj Sahib, Rakab Ganj Sahib, Bangla Sahib, and Majnu Ka Tilla.',
    historicalContextPa:
      'ਲਾਲ ਕਿਲ੍ਹੇ ’ਤੇ ਖ਼ਾਲਸਾਈ ਨਿਸ਼ਾਨ ਸਾਹਿਬ ਝੁਲਾਉਣ ਉਪਰੰਤ ਬਾਬਾ ਬਘੇਲ ਸਿੰਘ ਜੀ ਨੇ ਗੁਰਦੁਆਰਾ ਸੀਸ ਗੰਜ ਸਾਹਿਬ, ਰਕਾਬ ਗੰਜ ਸਾਹਿਬ ਅਤੇ ਬੰਗਲਾ ਸਾਹਿਬ ਦੀ ਉਸਾਰੀ ਕਰਵਾਈ।',
    subGroups: ['gursikh'],
    citations: [
      {
        sourceEn: 'Prachin Panth Prakash & Panthic Misl Records',
        sourcePa: 'ਪ੍ਰਾਚੀਨ ਪੰਥ ਪ੍ਰਕਾਸ਼ ਅਤੇ ਸਿੱਖ ਮਿਸਲ ਇਤਿਹਾਸ',
        referenceEn: '11 March 1783 (Phagun 1839 Bikrami) · Delhi Fateh & Gurdwara Construction',
        referencePa: '੧੧ ਮਾਰਚ ੧੭੮੩ (ਫੱਗਣ ੧੮੩੯ ਬਿਕ੍ਰਮੀ) · ਦਿੱਲੀ ਫ਼ਤਹਿ ਅਤੇ ਗੁਰਦੁਆਰਾ ਉਸਾਰੀ',
      },
    ],
  },

  // =========================================================================
  // SAMBAT 2083 CHET–ASSU BACKFILL (14 Mar 2026 – 16 Oct 2026) + KATAK VADHI 2
  // =========================================================================
  {
    id: '2083-chet-sangrand-new-year',
    date: '2026-03-14',
    sambat: 2083,
    category: 'khalsa',
    titleEn: 'Chet Sangrand — Bikrami New Year (Sambat 2083) & Shaheedi Akali Baba Phula Singh Ji',
    titlePa: 'ਚੇਤ ਸੰਗਰਾਂਦ — ਬਿਕ੍ਰਮੀ ਨਵਾਂ ਸਾਲ (ਸੰਮਤ ੨੦੮੩) ਅਤੇ ਸ਼ਹੀਦੀ ਅਕਾਲੀ ਬਾਬਾ ਫੂਲਾ ਸਿੰਘ ਜੀ',
    shortLabelEn: 'Chet Sangrand 2083',
    shortLabelPa: 'ਚੇਤ ਸੰਗਰਾਂਦ ੨੦੮੩',
    tithiRuleEn: '1 Chet, Sambat 2083 (Meena Sankranti)',
    tithiRulePa: '੧ ਚੇਤ, ਸੰਮਤ ੨੦੮੩ (ਮੀਨ ਸੰਕ੍ਰਾਂਤੀ)',
    summaryEn:
      'Opening of Bikrami Sambat 2083 with Barah Maha Majh ("Chet Govind Aradhiye") and Shaheedi remembrance of Jathedar Akali Baba Phula Singh Ji.',
    summaryPa:
      'ਬਾਰਹ ਮਾਹਾ ਮਾਂਝ ("ਚੇਤਿ ਗੋਵਿੰਦੁ ਅਰਾਧੀਐ") ਨਾਲ ਬਿਕ੍ਰਮੀ ਸੰਮਤ ੨੦੮੩ ਦਾ ਆਰੰਭ ਅਤੇ ਜਥੇਦਾਰ ਅਕਾਲੀ ਬਾਬਾ ਫੂਲਾ ਸਿੰਘ ਜੀ ਦੀ ਸ਼ਹੀਦੀ ਯਾਦ।',
    historicalContextEn:
      'True Meena Sankranti opens Bikrami Sambat 2083 on Saturday, 14 March 2026 (1 Chet), accompanied by remembrance of Akali Baba Phula Singh Ji’s martyrdom at Naushehra (1 Chet 1880 Bikrami).',
    historicalContextPa:
      'ਸ਼ਨਿੱਚਰਵਾਰ ੧੪ ਮਾਰਚ ੨੦੨੬ (੧ ਚੇਤ) ਨੂੰ ਮੀਨ ਸੰਕ੍ਰਾਂਤੀ ਨਾਲ ਬਿਕ੍ਰਮੀ ਸੰਮਤ ੨੦੮੩ ਦਾ ਆਰੰਭ ਹੁੰਦਾ ਹੈ।',
    subGroups: ['gursikh'],
    pothiUrl: POTHI_BARAH_MAHA_URL,
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji (Barah Maha Majh)',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਬਾਰਹ ਮਾਹਾ ਮਾਂਝ)',
        referenceEn: 'Ang 133 · Chet Govind Aradhiye',
        referencePa: 'ਅੰਗ ੧੩੩ · ਚੇਤਿ ਗੋਵਿੰਦੁ ਅਰਾਧੀਐ',
        pothiUrl: POTHI_BARAH_MAHA_URL,
      },
    ],
    featured: true,
  },
  {
    id: '2083-joti-jot-baba-gurditta-ji',
    date: '2026-03-28',
    sambat: 2083,
    category: 'khalsa',
    titleEn: 'Joti Jot — Baba Gurditta Ji & Guru Hargobind Sahib Ji Parivar',
    titlePa: 'ਜੋਤੀ ਜੋਤ — ਬਾਬਾ ਗੁਰਦਿੱਤਾ ਜੀ ਅਤੇ ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਦਾ ਪਰਿਵਾਰ',
    shortLabelEn: 'Baba Gurditta Ji',
    shortLabelPa: 'ਬਾਬਾ ਗੁਰਦਿੱਤਾ ਜੀ',
    tithiRuleEn: 'Chet Sudhi 10 (15 Chet, Sambat 2083)',
    tithiRulePa: 'ਚੇਤ ਸੁਦੀ ੧੦ (੧੫ ਚੇਤ, ਸੰਮਤ ੨੦੮੩)',
    summaryEn:
      'Commemoration of Baba Gurditta Ji (Kiratpur Sahib) alongside Bibi Viro Ji, Baba Ani Rai Ji, Baba Suraj Mal Ji, and Baba Atal Rai Ji.',
    summaryPa:
      'ਸ੍ਰੀ ਕੀਰਤਪੁਰ ਸਾਹਿਬ ਦੇ ਬਾਨੀ ਬਾਬਾ ਗੁਰਦਿੱਤਾ ਜੀ ਅਤੇ ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਦੇ ਪਰਿਵਾਰ ਦੀ ਯਾਦ।',
    historicalContextEn:
      'Observed on Chet Sudhi 10 (28 March 2026 / 15 Chet 2083) in Puratan Bikrami chronology.',
    historicalContextPa:
      'ਪੁਰਾਤਨ ਬਿਕ੍ਰਮੀ ਕਾਲਗਣਨਾ ਅਨੁਸਾਰ ਚੇਤ ਸੁਦੀ ੧੦ (੨੮ ਮਾਰਚ ੨੦੨੬) ਨੂੰ ਮਨਾਇਆ ਜਾਂਦਾ ਹੈ।',
    subGroups: ['guru-ghar'],
    citations: [
      {
        sourceEn: 'Sri Gur Pratap Suraj Granth',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ',
        referenceEn: 'Raas 8, Ansu 33–36 · Baba Gurditta Ji',
        referencePa: 'ਰਾਸਿ ੮, ਅੰਸੂ ੩੩–੩੬ · ਬਾਬਾ ਗੁਰਦਿੱਤਾ ਜੀ',
      },
    ],
  },
  {
    id: '2083-parkash-bhagat-pipa-ji',
    date: '2026-04-02',
    sambat: 2083,
    category: 'khalsa',
    titleEn: 'Parkash Purab — Bhagat Pipa Ji',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਭਗਤ ਪੀਪਾ ਜੀ',
    shortLabelEn: 'Bhagat Pipa Ji',
    shortLabelPa: 'ਭਗਤ ਪੀਪਾ ਜੀ',
    tithiRuleEn: 'Chet Puranmashi (20 Chet, Sambat 2083)',
    tithiRulePa: 'ਚੇਤ ਪੂਰਨਮਾਸ਼ੀ (੨੦ ਚੇਤ, ਸੰਮਤ ੨੦੮੩)',
    summaryEn:
      'Commemoration of Bhagat Pipa Ji on Chet Puranmashi (Ang 695 of Sri Guru Granth Sahib Ji).',
    summaryPa:
      'ਚੇਤ ਪੂਰਨਮਾਸ਼ੀ ਨੂੰ ਭਗਤ ਪੀਪਾ ਜੀ (ਅੰਗ ੬੯੫, ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ) ਦਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ।',
    historicalContextEn:
      'Honoring Bhagat Pipa Ji’s Dhanasri revelation: "Jo Brahmande Soi Pinde, Jo Khojai So Paavai."',
    historicalContextPa:
      'ਭਗਤ ਪੀਪਾ ਜੀ ਦੇ ਰਾਗ ਧਨਾਸਰੀ ਸ਼ਬਦ "ਜੋ ਬ੍ਰਹਮੰਡੇ ਸੋਈ ਪਿੰਡੇ ਜੋ ਖੋਜੈ ਸੋ ਪਾਵੈ" ਦੀ ਯਾਦ।',
    subGroups: ['bhagat-bhatt'],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=695',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji (Raag Dhanasri — Bhagat Pipa Ji)',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਰਾਗ ਧਨਾਸਰੀ — ਭਗਤ ਪੀਪਾ ਜੀ)',
        referenceEn: 'Ang 695 · Jo Brahmande Soi Pinde',
        referencePa: 'ਅੰਗ ੬੯੫ · ਜੋ ਬ੍ਰਹਮੰਡੇ ਸੋਈ ਪਿੰਡੇ',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=695',
      },
    ],
  },
  {
    id: '2083-parkash-guru-tegh-bahadur',
    date: '2026-04-07',
    sambat: 2083,
    category: 'gurpurab',
    titleEn: 'Parkash Purab — Sri Guru Tegh Bahadur Sahib Ji',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ਼ ਬਹਾਦਰ ਸਾਹਿਬ ਜੀ',
    shortLabelEn: 'Parkash Guru Tegh Bahadur Ji',
    shortLabelPa: 'ਪ੍ਰਕਾਸ਼ ਗੁਰੂ ਤੇਗ਼ ਬਹਾਦਰ ਜੀ',
    tithiRuleEn: 'Vaisakh Vadhi 5 · 25 Chet, Sambat 2083 (Lunar & Solar Alignment)',
    tithiRulePa: 'ਵੈਸਾਖ ਵਦੀ ੫ · ੨੫ ਚੇਤ, ਸੰਮਤ ੨੦੮੩ (ਚੰਦਰ ਅਤੇ ਸੂਰਜੀ ਮੇਲ)',
    summaryEn:
      'Parkash Purab of Ninth Patshah Sri Guru Tegh Bahadur Sahib Ji — a rare Sambat 2083 alignment where lunar Vaisakh Vadhi 5 and solar 25 Chet coincide.',
    summaryPa:
      'ਨੌਵੇਂ ਪਾਤਸ਼ਾਹ ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ਼ ਬਹਾਦਰ ਸਾਹਿਬ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸੰਮਤ ੨੦੮੩ ਵਿੱਚ ਵੈਸਾਖ ਵਦੀ ੫ ਅਤੇ ੨੫ ਚੇਤ ਦਾ ਅਲੌਕਿਕ ਮੇਲ।',
    historicalContextEn:
      'On Tuesday, 7 April 2026, both the historical lunar tithi (Vaisakh Vadhi 5) and the solar date (25 Chet) of Ninth Patshah’s 1621 CE Parkash at Guru Ke Mahal align on the same day.',
    historicalContextPa:
      'ਮੰਗਲਵਾਰ ੭ ਅਪ੍ਰੈਲ ੨੦੨੬ ਨੂੰ ਗੁਰੂ ਕੇ ਮਹਿਲ ਸ੍ਰੀ ਅੰਮ੍ਰਿਤਸਰ ਵਿਖੇ ਨੌਵੇਂ ਪਾਤਸ਼ਾਹ ਦੇ ਪ੍ਰਕਾਸ਼ ਦੀ ਚੰਦਰ ਤਿਥੀ (ਵੈਸਾਖ ਵਦੀ ੫) ਅਤੇ ਸੂਰਜੀ ਤਾਰੀਖ਼ (੨੫ ਚੇਤ) ਇੱਕੋ ਦਿਨ ਆਉਂਦੀਆਂ ਹਨ।',
    subGroups: ['guru-ghar'],
    pothiUrl: 'https://pothi.tatkhalsa.in/sundar-gutka/salok-mahalla-9',
    citations: [
      {
        sourceEn: 'Bhatt Vahi Talauda (Pargana Jind)',
        sourcePa: 'ਭੱਟ ਵਹੀ ਤਲੌਡਾ (ਪਰਗਣਾ ਜੀਂਦ)',
        referenceEn: 'Vaisakh Vadhi 5, Sambat 1678 Bikrami · Guru Ke Mahal, Amritsar',
        referencePa: 'ਵੈਸਾਖ ਵਦੀ ੫, ਸੰਮਤ ੧੬੭੮ ਬਿਕ੍ਰਮੀ · ਗੁਰੂ ਕੇ ਮਹਿਲ, ਅੰਮ੍ਰਿਤਸਰ',
      },
    ],
    featured: true,
  },
  {
    id: '2083-parkash-guru-arjan-dev',
    date: '2026-04-09',
    sambat: 2083,
    category: 'gurpurab',
    titleEn: 'Parkash Purab — Sri Guru Arjan Dev Ji & Sahibzada Baba Jujhar Singh Ji',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਅਤੇ ਸਾਹਿਬਜ਼ਾਦਾ ਬਾਬਾ ਜੁਝਾਰ ਸਿੰਘ ਜੀ',
    shortLabelEn: 'Parkash Guru Arjan Dev Ji',
    shortLabelPa: 'ਪ੍ਰਕਾਸ਼ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ',
    tithiRuleEn: 'Vaisakh Vadhi 7 · 27 Chet, Sambat 2083 (Lunar & Solar Alignment)',
    tithiRulePa: 'ਵੈਸਾਖ ਵਦੀ ੭ · ੨੭ ਚੇਤ, ਸੰਮਤ ੨੦੮੩ (ਚੰਦਰ ਅਤੇ ਸੂਰਜੀ ਮੇਲ)',
    summaryEn:
      'Parkash Purab of Fifth Patshah Sri Guru Arjan Dev Ji (exact alignment of Vaisakh Vadhi 7 & 27 Chet) and Sahibzada Baba Jujhar Singh Ji.',
    summaryPa:
      'ਪੰਜਵੇਂ ਪਾਤਸ਼ਾਹ ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ (ਵੈਸਾਖ ਵਦੀ ੭ ਅਤੇ ੨੭ ਚੇਤ ਦਾ ਮੇਲ) ਅਤੇ ਸਾਹਿਬਜ਼ਾਦਾ ਬਾਬਾ ਜੁਝਾਰ ਸਿੰਘ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ।',
    historicalContextEn:
      'On Thursday, 9 April 2026, both the lunar Vaisakh Vadhi 7 and solar 27 Chet dates of Sri Guru Arjan Dev Ji’s 1563 CE Parkash at Goindwal Sahib coincide.',
    historicalContextPa:
      'ਵੀਰਵਾਰ ੯ ਅਪ੍ਰੈਲ ੨੦੨੬ ਨੂੰ ਗੋਇੰਦਵਾਲ ਸਾਹਿਬ ਵਿਖੇ ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਦੇ ਪ੍ਰਕਾਸ਼ ਦੀ ਵੈਸਾਖ ਵਦੀ ੭ ਅਤੇ ੨੭ ਚੇਤ ਤਾਰੀਖ਼ਾਂ ਦਾ ਸੁੰਦਰ ਮੇਲ ਹੈ।',
    subGroups: ['guru-ghar'],
    citations: [
      {
        sourceEn: 'Sri Gur Pratap Suraj Granth',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ',
        referenceEn: 'Raas 2, Ansu 26 · Parkash of Sri Guru Arjan Dev Ji',
        referencePa: 'ਰਾਸਿ ੨, ਅੰਸੂ ੨੬ · ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼',
      },
    ],
  },
  {
    id: '2083-vaisakhi-khalsa-sajna',
    date: '2026-04-14',
    sambat: 2083,
    category: 'khalsa',
    titleEn: 'Vaisakhi — 327th Khalsa Sajna Divas, Panj Pyare & Maharaja Ranjit Singh Raj Tilak',
    titlePa: 'ਵੈਸਾਖੀ — ੩੨੭ਵਾਂ ਖ਼ਾਲਸਾ ਸਾਜਨਾ ਦਿਵਸ, ਪੰਜ ਪਿਆਰੇ ਅਤੇ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਰਾਜ ਤਿਲਕ',
    shortLabelEn: 'Vaisakhi · Khalsa Sajna',
    shortLabelPa: 'ਵੈਸਾਖੀ · ਖ਼ਾਲਸਾ ਸਾਜਨਾ',
    tithiRuleEn: '1 Vaisakh, Sambat 2083 (Mesha Sankranti)',
    tithiRulePa: '੧ ਵੈਸਾਖ, ਸੰਮਤ ੨੦੮੩ (ਮੇਖ ਸੰਕ੍ਰਾਂਤੀ)',
    summaryEn:
      '327th anniversary of the revelation of the Khalsa Panth (1 Vaisakh 1756 Bikrami / 1699 CE) at Takhat Sri Kesgarh Sahib, Sri Anandpur Sahib.',
    summaryPa:
      'ਤਖ਼ਤ ਸ੍ਰੀ ਕੇਸਗੜ੍ਹ ਸਾਹਿਬ ਵਿਖੇ ੧ ਵੈਸਾਖ ੧੭੫੬ ਬਿਕ੍ਰਮੀ (੧੬੯੯) ਨੂੰ ਖ਼ਾਲਸਾ ਪੰਥ ਦੀ ਸਾਜਨਾ ਦਾ ੩੨੭ਵਾਂ ਦਿਹਾੜਾ।',
    historicalContextEn:
      'Celebrating Khande-Bate di Pahul, the Panj Pyare (Bhai Daya Singh, Dharam Singh, Himmat Singh, Mohkam Singh, Sahib Singh Ji), and Sarkar-e-Khalsa Raj Tilak.',
    historicalContextPa:
      'ਖੰਡੇ-ਬਾਟੇ ਦੀ ਪਾਹੁਲ, ਪੰਜ ਪਿਆਰਿਆਂ ਅਤੇ ਖ਼ਾਲਸਾ ਪੰਥ ਦੀ ਸਾਜਨਾ ਦਾ ੩੨੭ਵਾਂ ਪਾਵਨ ਦਿਹਾੜਾ।',
    subGroups: ['gursikh'],
    pothiUrl: 'https://pothi.tatkhalsa.in/sundar-gutka/tav-prasad-swaiye',
    citations: [
      {
        sourceEn: 'Sri Gur Sobha (Kavi Sainapati)',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰ ਸੋਭਾ (ਕਵੀ ਸੈਨਾਪਤਿ)',
        referenceEn: 'Chapter 5 · Revelation of the Khalsa Panth on 1 Vaisakh 1756 Bikrami',
        referencePa: 'ਅਧਿਆਇ ੫ · ੧ ਵੈਸਾਖ ੧੭੫੬ ਬਿਕ੍ਰਮੀ ਖ਼ਾਲਸਾ ਸਾਜਨਾ',
      },
    ],
    featured: true,
  },
  {
    id: '2083-parkash-guru-angad-dev',
    date: '2026-04-18',
    sambat: 2083,
    category: 'gurpurab',
    titleEn: 'Parkash Purab — Sri Guru Angad Dev Ji & Mata Khivi Ji Parivar',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸ੍ਰੀ ਗੁਰੂ ਅੰਗਦ ਦੇਵ ਜੀ ਅਤੇ ਮਾਤਾ ਖੀਵੀ ਜੀ ਦਾ ਪਰਿਵਾਰ',
    shortLabelEn: 'Parkash Guru Angad Dev Ji',
    shortLabelPa: 'ਪ੍ਰਕਾਸ਼ ਗੁਰੂ ਅੰਗਦ ਦੇਵ ਜੀ',
    tithiRuleEn: 'Vaisakh Sudhi 1 (5 Vaisakh, Sambat 2083)',
    tithiRulePa: 'ਵੈਸਾਖ ਸੁਦੀ ੧ (੫ ਵੈਸਾਖ, ਸੰਮਤ ੨੦੮੩)',
    summaryEn:
      'Puratan lunar Parkash Purab of Second Patshah Sri Guru Angad Dev Ji (Vaisakh Sudhi 1, 1561 Bikrami) and Mata Khivi Ji heritage.',
    summaryPa:
      'ਦੂਜੇ ਪਾਤਸ਼ਾਹ ਸ੍ਰੀ ਗੁਰੂ ਅੰਗਦ ਦੇਵ ਜੀ (ਵੈਸਾਖ ਸੁਦੀ ੧, ੧੫੬੧ ਬਿਕ੍ਰਮੀ) ਦਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ ਅਤੇ ਮਾਤਾ ਖੀਵੀ ਜੀ ਦੀ ਯਾਦ।',
    historicalContextEn:
      'Observed on Saturday, 18 April 2026 (5 Vaisakh, Sambat 2083) following Vaisakh Sudhi 1.',
    historicalContextPa:
      'ਸੰਮਤ ੨੦੮੩ ਵਿੱਚ ਵੈਸਾਖ ਸੁਦੀ ੧ ਸ਼ਨਿੱਚਰਵਾਰ ੧੮ ਅਪ੍ਰੈਲ ੨੦੨੬ (੫ ਵੈਸਾਖ) ਨੂੰ ਮਨਾਈ ਜਾਂਦੀ ਹੈ।',
    subGroups: ['guru-ghar'],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=967',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji (Ramkali Ki Vaar — Rai Balwand & Satta)',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਰਾਮਕਲੀ ਕੀ ਵਾਰ — ਰਾਇ ਬਲਵੰਡਿ ਤਥਾ ਸਤੈ)',
        referenceEn: 'Ang 967 · Balwand Khivi Nek Jan',
        referencePa: 'ਅੰਗ ੯੬੭ · ਬਲਵੰਡ ਖੀਵੀ ਨੇਕ ਜਨ',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=967',
      },
    ],
  },
  {
    id: '2083-parkash-bhagat-dhanna-ji',
    date: '2026-04-21',
    sambat: 2083,
    category: 'khalsa',
    titleEn: 'Parkash Purab — Bhagat Dhanna Ji',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਭਗਤ ਧੰਨਾ ਜੀ',
    shortLabelEn: 'Bhagat Dhanna Ji',
    shortLabelPa: 'ਭਗਤ ਧੰਨਾ ਜੀ',
    tithiRuleEn: '8 Vaisakh, Sambat 2083',
    tithiRulePa: '੮ ਵੈਸਾਖ, ਸੰਮਤ ੨੦੮੩',
    summaryEn:
      'Birth commemoration of Shiromani Bhagat Dhanna Ji (8 Vaisakh, Sambat 2083).',
    summaryPa:
      'ਸ਼੍ਰੋਮਣੀ ਭਗਤ ਧੰਨਾ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ (੮ ਵੈਸਾਖ, ਸੰਮਤ ੨੦੮੩)।',
    historicalContextEn:
      'Celebrating Bhagat Dhanna Ji’s Asa and Dhanasri shabads in Sri Guru Granth Sahib Ji.',
    historicalContextPa:
      'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਵਿੱਚ ਦਰਜ ਭਗਤ ਧੰਨਾ ਜੀ ਦੀ ਪਾਵਨ ਬਾਣੀ ਦੀ ਯਾਦ।',
    subGroups: ['bhagat-bhatt'],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=695',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji (Raag Dhanasri — Bhagat Dhanna Ji)',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਰਾਗ ਧਨਾਸਰੀ — ਭਗਤ ਧੰਨਾ ਜੀ)',
        referenceEn: 'Ang 695 · Gopal Tera Aarta',
        referencePa: 'ਅੰਗ ੬੯੫ · ਗੋਪਾਲ ਤੇਰਾ ਆਰਤਾ',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=695',
      },
    ],
  },
  {
    id: '2083-parkash-guru-amar-das-nalwa',
    date: '2026-04-30',
    sambat: 2083,
    category: 'gurpurab',
    titleEn: 'Parkash Purab — Sri Guru Amar Das Ji & Shaheedi Sardar Hari Singh Nalwa',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸ੍ਰੀ ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ ਅਤੇ ਸ਼ਹੀਦੀ ਸਰਦਾਰ ਹਰੀ ਸਿੰਘ ਨਲੂਆ',
    shortLabelEn: 'Parkash Guru Amar Das Ji',
    shortLabelPa: 'ਪ੍ਰਕਾਸ਼ ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ',
    tithiRuleEn: 'Vaisakh Sudhi 14 (17 Vaisakh, Sambat 2083)',
    tithiRulePa: 'ਵੈਸਾਖ ਸੁਦੀ ੧੪ (੧੭ ਵੈਸਾਖ, ਸੰਮਤ ੨੦੮੩)',
    summaryEn:
      'Puratan lunar Parkash Purab of Third Patshah Sri Guru Amar Das Ji (Vaisakh Sudhi 14) and Shaheedi remembrance of Sardar Hari Singh Nalwa (17 Vaisakh).',
    summaryPa:
      'ਤੀਜੇ ਪਾਤਸ਼ਾਹ ਸ੍ਰੀ ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ (ਵੈਸਾਖ ਸੁਦੀ ੧੪) ਅਤੇ ਸਰਦਾਰ ਹਰੀ ਸਿੰਘ ਨਲੂਆ ਜੀ ਦੀ ਸ਼ਹੀਦੀ ਯਾਦ (੧੭ ਵੈਸਾਖ)।',
    historicalContextEn:
      'In Sambat 2083, lunar Vaisakh Sudhi 14 falls on Thursday, 30 April 2026 (17 Vaisakh), coinciding with the Jamrud martyrdom date of Sardar Hari Singh Nalwa.',
    historicalContextPa:
      'ਸੰਮਤ ੨੦੮੩ ਵਿੱਚ ਵੈਸਾਖ ਸੁਦੀ ੧੪ ਵੀਰਵਾਰ ੩੦ ਅਪ੍ਰੈਲ ੨੦੨੬ (੧੭ ਵੈਸਾਖ) ਨੂੰ ਆਉਂਦੀ ਹੈ।',
    subGroups: ['guru-ghar', 'gursikh'],
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji (Raag Ramkali — Anand Sahib)',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਰਾਗ ਰਾਮਕਲੀ — ਅਨੰਦ ਸਾਹਿਬ)',
        referenceEn: 'Ang 917 · Anand Bhaia Meri Maye',
        referencePa: 'ਅੰਗ ੯੧੭ · ਅਨੰਦੁ ਭਇਆ ਮੇਰੀ ਮਾਏ',
      },
    ],
  },
  {
    id: '2083-shaheedi-guru-arjan-dev',
    date: '2026-06-18',
    sambat: 2083,
    category: 'shaheedi',
    titleEn: 'Shaheedi Divas — Sri Guru Arjan Dev Ji (Shuddh Jeth Sudhi 4)',
    titlePa: 'ਸ਼ਹੀਦੀ ਦਿਵਸ — ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ (ਸ਼ੁੱਧ ਜੇਠ ਸੁਦੀ ੪)',
    shortLabelEn: 'Shaheedi Guru Arjan Dev Ji',
    shortLabelPa: 'ਸ਼ਹੀਦੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ',
    tithiRuleEn: 'Shuddh Jeth Sudhi 4 (4 Harh, Sambat 2083 · Adhik Jeth Year)',
    tithiRulePa: 'ਸ਼ੁੱਧ ਜੇਠ ਸੁਦੀ ੪ (੪ ਹਾੜ੍ਹ, ਸੰਮਤ ੨੦੮੩ · ਅਧਿਕ ਜੇਠ ਸਾਲ)',
    summaryEn:
      'Puratan Shaheedi Divas of Fifth Patshah Sri Guru Arjan Dev Ji observed on Shuddh Jeth Sudhi 4 (18 June 2026) in the Adhik Jeth intercalary year Sambat 2083.',
    summaryPa:
      'ਅਧਿਕ ਜੇਠ ਵਾਲੇ ਸੰਮਤ ੨੦੮੩ ਵਿੱਚ ਸ਼ੁੱਧ ਜੇਠ ਸੁਦੀ ੪ (੧੮ ਜੂਨ ੨੦੨੬ / ੪ ਹਾੜ੍ਹ) ਨੂੰ ਸ਼ਹੀਦਾਂ ਦੇ ਸਰਤਾਜ ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਦਾ ਸ਼ਹੀਦੀ ਦਿਵਸ।',
    historicalContextEn:
      'Sambat 2083 contains an intercalary lunar month (Adhik Jeth in May–June 2026). Following Puratan Bikrami principles, major observances fall in the Shuddh (Nij) lunar month—placing Jeth Sudhi 4 on Thursday, 18 June 2026.',
    historicalContextPa:
      'ਸੰਮਤ ੨੦੮੩ ਵਿੱਚ ਮਈ-ਜੂਨ ੨੦੨੬ ਦੌਰਾਨ ਅਧਿਕ ਜੇਠ (ਮਲ ਮਾਸ) ਹੋਣ ਕਾਰਨ ਪੁਰਾਤਨ ਮਰਯਾਦਾ ਅਨੁਸਾਰ ਸ਼ਹੀਦੀ ਪੁਰਬ ਸ਼ੁੱਧ ਜੇਠ ਸੁਦੀ ੪ (੧੮ ਜੂਨ ੨੦੨੬) ਨੂੰ ਮਨਾਇਆ ਜਾਂਦਾ ਹੈ।',
    subGroups: ['guru-ghar'],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=394',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji (Raag Asa — Mahalla 5)',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਰਾਗ ਆਸਾ — ਮਹਲਾ ੫)',
        referenceEn: 'Ang 394 · Tera Kiya Meetha Lage',
        referencePa: 'ਅੰਗ ੩੯੪ · ਤੇਰਾ ਕੀਆ ਮੀਠਾ ਲਾਗੈ',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=394',
      },
      {
        sourceEn: 'Bhatt Vahi Multani Sindhi',
        sourcePa: 'ਭੱਟ ਵਹੀ ਮੁਲਤਾਨੀ ਸਿੰਧੀ',
        referenceEn: 'Jeth Sudhi 4, Sambat 1663 Bikrami · Lahore Shaheedi',
        referencePa: 'ਜੇਠ ਸੁਦੀ ੪, ਸੰਮਤ ੧੬੬੩ ਬਿਕ੍ਰਮੀ · ਲਾਹੌਰ ਸ਼ਹਾਦਤ',
      },
    ],
    featured: true,
  },
  {
    id: '2083-shaheedi-baba-banda-singh-bahadur',
    date: '2026-06-25',
    sambat: 2083,
    category: 'shaheedi',
    titleEn: 'Shaheedi Divas — Baba Banda Singh Bahadur & 740 Khalsa Shaheeds',
    titlePa: 'ਸ਼ਹੀਦੀ ਦਿਵਸ — ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ ਅਤੇ ੭੪੦ ਖ਼ਾਲਸਾ ਸ਼ਹੀਦ',
    shortLabelEn: 'Baba Banda Singh Bahadur',
    shortLabelPa: 'ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ',
    tithiRuleEn: '11 Harh, Sambat 2083 (Delhi, 1716)',
    tithiRulePa: '੧੧ ਹਾੜ੍ਹ, ਸੰਮਤ ੨੦੮੩ (ਦਿੱਲੀ, ੧੭੧੬)',
    summaryEn:
      'Martyrdom of Baba Banda Singh Bahadur, Baba Ajai Singh Ji, and 740 Khalsa Singhs at Delhi.',
    summaryPa:
      'ਦਿੱਲੀ ਵਿਖੇ ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ, ਬਾਬਾ ਅਜੈ ਸਿੰਘ ਜੀ ਅਤੇ ੭੪੦ ਖ਼ਾਲਸਾ ਸ਼ਹੀਦਾਂ ਦੀ ਸ਼ਹਾਦਤ।',
    historicalContextEn:
      'Commemorating the first sovereign Khalsa state established in Punjab under the seal of Guru Nanak–Guru Gobind Singh.',
    historicalContextPa:
      'ਪੰਜਾਬ ਵਿੱਚ ਪਹਿਲਾ ਖ਼ਾਲਸਾ ਰਾਜ ਕਾਇਮ ਕਰਨ ਵਾਲੇ ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ ਜੀ ਦੀ ਸ਼ਹੀਦੀ ਯਾਦ।',
    subGroups: ['gursikh'],
    citations: [
      {
        sourceEn: 'Prachin Panth Prakash (Bhai Rattan Singh Bhangu)',
        sourcePa: 'ਪ੍ਰਾਚੀਨ ਪੰਥ ਪ੍ਰਕਾਸ਼ (ਭਾਈ ਰਤਨ ਸਿੰਘ ਭੰਗੂ)',
        referenceEn: 'Sirhind Fateh & Delhi Shaheedi Chronicle · 1773 Bikrami',
        referencePa: 'ਸਰਹਿੰਦ ਫ਼ਤਹਿ ਅਤੇ ਦਿੱਲੀ ਸ਼ਹੀਦੀ ਪ੍ਰਸੰਗ · ੧੭੭੩ ਬਿਕ੍ਰਮੀ',
      },
    ],
  },
  {
    id: '2083-parkash-bhagat-kabir-ranjit-singh',
    date: '2026-06-29',
    sambat: 2083,
    category: 'khalsa',
    titleEn: 'Parkash Purab — Bhagat Kabir Ji & Barsi Maharaja Ranjit Singh Ji',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਭਗਤ ਕਬੀਰ ਜੀ ਅਤੇ ਬਰਸੀ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਜੀ',
    shortLabelEn: 'Bhagat Kabir Ji · Ranjit Singh',
    shortLabelPa: 'ਭਗਤ ਕਬੀਰ ਜੀ · ਰਣਜੀਤ ਸਿੰਘ',
    tithiRuleEn: 'Shuddh Jeth Puranmashi (15 Harh, Sambat 2083)',
    tithiRulePa: 'ਸ਼ੁੱਧ ਜੇਠ ਪੂਰਨਮਾਸ਼ੀ (੧੫ ਹਾੜ੍ਹ, ਸੰਮਤ ੨੦੮੩)',
    summaryEn:
      'Parkash Purab of Shiromani Bhagat Kabir Ji (Shuddh Jeth Puranmashi) and annual Barsi of Maharaja Ranjit Singh Ji (15 Harh).',
    summaryPa:
      'ਸ਼ੁੱਧ ਜੇਠ ਪੂਰਨਮਾਸ਼ੀ ਨੂੰ ਸ਼੍ਰੋਮਣੀ ਭਗਤ ਕਬੀਰ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ ਅਤੇ ੧੫ ਹਾੜ੍ਹ ਨੂੰ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਜੀ ਦੀ ਬਰਸੀ।',
    historicalContextEn:
      'In Sambat 2083, Shuddh Jeth Puranmashi falls on Monday, 29 June 2026 (15 Harh), coinciding with Maharaja Ranjit Singh Ji’s Barsi.',
    historicalContextPa:
      'ਸੰਮਤ ੨੦੮੩ ਵਿੱਚ ਸ਼ੁੱਧ ਜੇਠ ਪੂਰਨਮਾਸ਼ੀ ੧੫ ਹਾੜ੍ਹ (੨੯ ਜੂਨ ੨੦੨੬) ਨੂੰ ਆਉਂਦੀ ਹੈ।',
    subGroups: ['bhagat-bhatt', 'gursikh'],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=1349',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji (Raag Prabhati — Bhagat Kabir Ji)',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਰਾਗ ਪ੍ਰਭਾਤੀ — ਭਗਤ ਕਬੀਰ ਜੀ)',
        referenceEn: 'Ang 1349 · Awal Allah Noor Upaya',
        referencePa: 'ਅੰਗ ੧੩੪੯ · ਅਵਲਿ ਅਲਹ ਨੂਰੁ ਉਪਾਇਆ',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=1349',
      },
    ],
  },
  {
    id: '2083-parkash-guru-hargobind',
    date: '2026-07-06',
    sambat: 2083,
    category: 'gurpurab',
    titleEn: 'Parkash Purab — Sri Guru Hargobind Sahib Ji (Miri-Piri Patshah)',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ (ਮੀਰੀ-ਪੀਰੀ ਦੇ ਮਾਲਕ)',
    shortLabelEn: 'Parkash Guru Hargobind Ji',
    shortLabelPa: 'ਪ੍ਰਕਾਸ਼ ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਜੀ',
    tithiRuleEn: 'Harh Vadhi 6 (22 Harh, Sambat 2083)',
    tithiRulePa: 'ਹਾੜ੍ਹ ਵਦੀ ੬ (੨੨ ਹਾੜ੍ਹ, ਸੰਮਤ ੨੦੮੩)',
    summaryEn:
      'Puratan lunar Parkash Purab of Sixth Patshah Sri Guru Hargobind Sahib Ji (Harh Vadhi 6, Sambat 2083).',
    summaryPa:
      'ਛੇਵੇਂ ਪਾਤਸ਼ਾਹ ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਦਾ ਪੁਰਾਤਨ ਚੰਦਰ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ (ਹਾੜ੍ਹ ਵਦੀ ੬, ਸੰਮਤ ੨੦੮੩)।',
    historicalContextEn:
      'Because Sambat 2083 includes Adhik Jeth, Harh Vadhi 6 shifts into early July (Monday, 6 July 2026 / 22 Harh 2083).',
    historicalContextPa:
      'ਅਧਿਕ ਜੇਠ ਕਾਰਨ ਸੰਮਤ ੨੦੮੩ ਵਿੱਚ ਹਾੜ੍ਹ ਵਦੀ ੬ ਸੋਮਵਾਰ ੬ ਜੁਲਾਈ ੨੦੨੬ (੨੨ ਹਾੜ੍ਹ) ਨੂੰ ਆਉਂਦੀ ਹੈ।',
    subGroups: ['guru-ghar'],
    citations: [
      {
        sourceEn: 'Gurbilas Patshahi 6',
        sourcePa: 'ਗੁਰਬਿਲਾਸ ਪਾਤਸ਼ਾਹੀ ੬',
        referenceEn: 'Adhyai 2 · Parkash of Sri Guru Hargobind Sahib Ji at Wadali',
        referencePa: 'ਅਧਿਆਇ ੨ · ਗੁਰੂ ਕੀ ਵਡਾਲੀ ਵਿਖੇ ਪ੍ਰਕਾਸ਼ ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ',
      },
    ],
  },
  {
    id: '2083-shaheedi-bhai-mani-singh-ji',
    date: '2026-07-09',
    sambat: 2083,
    category: 'shaheedi',
    titleEn: 'Shaheedi Divas — Shaheed Bhai Mani Singh Ji',
    titlePa: 'ਸ਼ਹੀਦੀ ਦਿਵਸ — ਸ਼ਹੀਦ ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ',
    shortLabelEn: 'Shaheedi Bhai Mani Singh Ji',
    shortLabelPa: 'ਸ਼ਹੀਦੀ ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ',
    tithiRuleEn: '25 Harh, Sambat 2083 (Lahore, 1737)',
    tithiRulePa: '੨੫ ਹਾੜ੍ਹ, ਸੰਮਤ ੨੦੮੩ (ਲਾਹੌਰ, ੧੭੩੭)',
    summaryEn:
      'Martyrdom of Head Granthi of Sri Harmandir Sahib Bhai Mani Singh Ji (Band-Band Katwana) at Lahore.',
    summaryPa:
      'ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦੇ ਮੁੱਖ ਗ੍ਰੰਥੀ ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਦੀ ਲਾਹੌਰ ਵਿਖੇ ਬੰਦ-ਬੰਦ ਕਟਵਾ ਕੇ ਸ਼ਹਾਦਤ।',
    historicalContextEn:
      'Remembered daily in the Sikh Ardas for choosing dismemberment over abandoning Sikhi.',
    historicalContextPa:
      'ਸਿੱਖ ਅਰਦਾਸ ਵਿੱਚ "ਬੰਦ ਬੰਦ ਕਟਾਏ" ਦੇ ਰੂਪ ਵਿੱਚ ਯਾਦ ਕੀਤੇ ਜਾਂਦੇ ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਦੀ ਸ਼ਹਾਦਤ।',
    subGroups: ['gursikh'],
    citations: [
      {
        sourceEn: 'Prachin Panth Prakash (Bhai Rattan Singh Bhangu)',
        sourcePa: 'ਪ੍ਰਾਚੀਨ ਪੰਥ ਪ੍ਰਕਾਸ਼ (ਭਾਈ ਰਤਨ ਸਿੰਘ ਭੰਗੂ)',
        referenceEn: 'Shaheedi Prasang of Bhai Mani Singh Ji · Lahore',
        referencePa: 'ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਦਾ ਸ਼ਹੀਦੀ ਪ੍ਰਸੰਗ · ਲਾਹੌਰ',
      },
    ],
  },
  {
    id: '2083-shaheedi-bhai-taru-singh-ji',
    date: '2026-07-16',
    sambat: 2083,
    category: 'shaheedi',
    titleEn: 'Shaheedi Divas — Shaheed Bhai Taru Singh Ji',
    titlePa: 'ਸ਼ਹੀਦੀ ਦਿਵਸ — ਸ਼ਹੀਦ ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ',
    shortLabelEn: 'Shaheedi Bhai Taru Singh Ji',
    shortLabelPa: 'ਸ਼ਹੀਦੀ ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ',
    tithiRuleEn: '1 Sawan, Sambat 2083 (Sawan Sangrand)',
    tithiRulePa: '੧ ਸਾਵਣ, ਸੰਮਤ ੨੦੮੩ (ਸਾਵਣ ਸੰਗਰਾਂਦ)',
    summaryEn:
      'Martyrdom of Shaheed Bhai Taru Singh Ji (1 Sawan 1802 Bikrami / 1745) at Lahore for preserving his Kes.',
    summaryPa:
      '੧ ਸਾਵਣ ੧੮੦੨ ਬਿਕ੍ਰਮੀ (੧੭੪੫) ਨੂੰ ਕੇਸਾਂ ਦੀ ਰੱਖਿਆ ਲਈ ਖੋਪਰੀ ਲੁਹਾਉਣ ਵਾਲੇ ਸ਼ਹੀਦ ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਦੀ ਸ਼ਹਾਦਤ।',
    historicalContextEn:
      'Observed every Sawan Sangrand (1 Sawan) in memory of Bhai Taru Singh Ji’s supreme devotion.',
    historicalContextPa:
      'ਹਰ ਸਾਲ ਸਾਵਣ ਸੰਗਰਾਂਦ (੧ ਸਾਵਣ) ਨੂੰ ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਦੀ ਸ਼ਹਾਦਤ ਯਾਦ ਕੀਤੀ ਜਾਂਦੀ ਹੈ।',
    subGroups: ['gursikh'],
    citations: [
      {
        sourceEn: 'Prachin Panth Prakash (Bhai Rattan Singh Bhangu)',
        sourcePa: 'ਪ੍ਰਾਚੀਨ ਪੰਥ ਪ੍ਰਕਾਸ਼ (ਭਾਈ ਰਤਨ ਸਿੰਘ ਭੰਗੂ)',
        referenceEn: 'Shaheedi of Bhai Taru Singh Ji · 1 Sawan 1802 Bikrami',
        referencePa: 'ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਦੀ ਸ਼ਹੀਦੀ · ੧ ਸਾਵਣ ੧੮੦੨ ਬਿਕ੍ਰਮੀ',
      },
    ],
  },
  {
    id: '2083-parkash-guru-harkrishan',
    date: '2026-08-07',
    sambat: 2083,
    category: 'gurpurab',
    titleEn: 'Parkash Purab — Sri Guru Harkrishan Sahib Ji (Bala Pritam)',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਕ੍ਰਿਸ਼ਨ ਸਾਹਿਬ ਜੀ (ਬਾਲਾ ਪ੍ਰੀਤਮ)',
    shortLabelEn: 'Parkash Guru Harkrishan Ji',
    shortLabelPa: 'ਪ੍ਰਕਾਸ਼ ਗੁਰੂ ਹਰਿਕ੍ਰਿਸ਼ਨ ਜੀ',
    tithiRuleEn: 'Sawan Vadhi 9 · 23 Sawan, Sambat 2083 (Lunar & Solar Alignment)',
    tithiRulePa: 'ਸਾਵਣ ਵਦੀ ੯ · ੨੩ ਸਾਵਣ, ਸੰਮਤ ੨੦੮੩ (ਚੰਦਰ ਅਤੇ ਸੂਰਜੀ ਮੇਲ)',
    summaryEn:
      'Parkash Purab of Eighth Patshah Sri Guru Harkrishan Sahib Ji — exact alignment of lunar Sawan Vadhi 9 and solar 23 Sawan in Sambat 2083.',
    summaryPa:
      'ਅੱਠਵੇਂ ਪਾਤਸ਼ਾਹ ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਕ੍ਰਿਸ਼ਨ ਸਾਹਿਬ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸੰਮਤ ੨੦੮੩ ਵਿੱਚ ਸਾਵਣ ਵਦੀ ੯ ਅਤੇ ੨੩ ਸਾਵਣ ਦਾ ਸੁੰਦਰ ਮੇਲ।',
    historicalContextEn:
      'On Friday, 7 August 2026, both the historical lunar tithi (Sawan Vadhi 9) and solar date (23 Sawan) of Eighth Patshah’s Parkash at Kiratpur Sahib align.',
    historicalContextPa:
      'ਸ਼ੁੱਕਰਵਾਰ ੭ ਅਗਸਤ ੨੦੨੬ ਨੂੰ ਸਾਵਣ ਵਦੀ ੯ ਅਤੇ ੨੩ ਸਾਵਣ ਇੱਕੋ ਦਿਨ ਆਉਂਦੇ ਹਨ।',
    subGroups: ['guru-ghar'],
    citations: [
      {
        sourceEn: 'Sri Gur Pratap Suraj Granth',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ',
        referenceEn: 'Raas 10, Ansu 22 · Parkash of Sri Guru Harkrishan Sahib Ji',
        referencePa: 'ਰਾਸਿ ੧੦, ਅੰਸੂ ੨੨ · ਪ੍ਰਕਾਸ਼ ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਕ੍ਰਿਸ਼ਨ ਸਾਹਿਬ ਜੀ',
      },
    ],
  },
  {
    id: '2083-adi-bir-colophon-bhatts',
    date: '2026-08-29',
    sambat: 2083,
    category: 'khalsa',
    titleEn: 'Adi Bir Completion Colophon (Kartarpur Bir) & All 11 Bhatt Sahibaan',
    titlePa: 'ਆਦਿ ਬੀੜ ਸੰਪੂਰਨਤਾ ਹਵਾਲਾ (ਕਰਤਾਰਪੁਰੀ ਬੀੜ) ਅਤੇ ੧੧ ਭੱਟ ਸਾਹਿਬਾਨ',
    shortLabelEn: 'Adi Bir & 11 Bhatts',
    shortLabelPa: 'ਆਦਿ ਬੀੜ ਤੇ ੧੧ ਭੱਟ',
    tithiRuleEn: 'Bhadon Vadhi 1 (13 Bhadon, Sambat 2083)',
    tithiRulePa: 'ਭਾਦੋਂ ਵਦੀ ੧ (੧੩ ਭਾਦੋਂ, ਸੰਮਤ ੨੦੮੩)',
    summaryEn:
      'Completion anniversary of the Kartarpur Adi Bir (Bhadon Vadhi 1, 1661 Bikrami) and commemoration of all 11 Bhatt Sahibaan.',
    summaryPa:
      'ਭਾਦੋਂ ਵਦੀ ੧ (੧੬੬੧ ਬਿਕ੍ਰਮੀ) ਨੂੰ ਆਦਿ ਬੀੜ ਦੀ ਸੰਪੂਰਨਤਾ ਅਤੇ ੧੧ ਭੱਟ ਸਾਹਿਬਾਨ ਦੀ ਪਾਵਨ ਯਾਦ।',
    historicalContextEn:
      'Honoring the original manuscript colophon ("Sambat 1661 Miti Bhadon Vadi 1 Pothi Likhi Pahunche") and the 11 Bhatt poets of Sri Guru Granth Sahib Ji.',
    historicalContextPa:
      'ਕਰਤਾਰਪੁਰੀ ਬੀੜ ਦੇ ਪੁਰਾਤਨ ਤਤਕਰੇ ਅਤੇ ਗਿਆਰਾਂ ਭੱਟ ਸਾਹਿਬਾਨ ਦੇ ੧੨੩ ਸਵਈਆਂ ਦੀ ਯਾਦ।',
    subGroups: ['bhagat-bhatt'],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=1389',
    citations: [
      {
        sourceEn: 'Kartarpur Adi Bir Manuscript Colophon',
        sourcePa: 'ਕਰਤਾਰਪੁਰੀ ਆਦਿ ਬੀੜ ਪੁਰਾਤਨ ਤਤਕਰਾ',
        referenceEn: 'Sambat 1661 Miti Bhadon Vadi 1 Pothi Likhi Pahunche',
        referencePa: 'ਸੰਮਤ ੧੬੬੧ ਮਿਤੀ ਭਾਦੋਂ ਵਦੀ ੧ ਪੋਥੀ ਲਿਖਿ ਪਹੁੰਚੇ',
      },
    ],
  },
  {
    id: '2083-pehla-parkash-sggs',
    date: '2026-09-12',
    sambat: 2083,
    category: 'gurpurab',
    titleEn: 'Pehla Parkash Purab — Sri Guru Granth Sahib Ji (422nd Anniversary)',
    titlePa: 'ਪਹਿਲਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (੪੨੨ਵਾਂ ਦਿਹਾੜਾ)',
    shortLabelEn: 'Pehla Parkash SGGS Ji',
    shortLabelPa: 'ਪਹਿਲਾ ਪ੍ਰਕਾਸ਼ SGGS ਜੀ',
    tithiRuleEn: 'Bhadon Sudhi 1 (27 Bhadon, Sambat 2083)',
    tithiRulePa: 'ਭਾਦੋਂ ਸੁਦੀ ੧ (੨੭ ਭਾਦੋਂ, ਸੰਮਤ ੨੦੮੩)',
    summaryEn:
      '422nd anniversary of the First Installation of Adi Sri Guru Granth Sahib Ji at Sachkhand Sri Harmandir Sahib on Bhadon Sudhi 1.',
    summaryPa:
      'ਭਾਦੋਂ ਸੁਦੀ ੧ (੨੭ ਭਾਦੋਂ, ਸੰਮਤ ੨੦੮੩) ਨੂੰ ਸੱਚਖੰਡ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਵਿਖੇ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੇ ਪਹਿਲੇ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ ਦਾ ੪੨੨ਵਾਂ ਦਿਹਾੜਾ।',
    historicalContextEn:
      'Observed on Saturday, 12 September 2026 (Bhadon Sudhi 1), commemorating the first Hukamnama "Santa Ke Karaj Aap Khaloya" (Ang 783).',
    historicalContextPa:
      'ਸ਼ਨਿੱਚਰਵਾਰ ੧੨ ਸਤੰਬਰ ੨੦੨੬ (ਭਾਦੋਂ ਸੁਦੀ ੧) ਨੂੰ ਪਹਿਲੇ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ ਅਤੇ ਪਹਿਲੇ ਹੁਕਮਨਾਮੇ (ਅੰਗ ੭੮੩) ਦੀ ਯਾਦ।',
    subGroups: ['bhagat-bhatt', 'gursikh'],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=783',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji (First Hukamnama — Raag Suhi Mahalla 5)',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਪਹਿਲਾ ਹੁਕਮਨਾਮਾ — ਰਾਗ ਸੂਹੀ ਮਹਲਾ ੫)',
        referenceEn: 'Ang 783 · Santa Ke Karaj Aap Khaloya',
        referencePa: 'ਅੰਗ ੭੮੩ · ਸੰਤਾ ਕੇ ਕਾਰਜਿ ਆਪਿ ਖਲੋਇਆ',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=783',
      },
    ],
    featured: true,
  },
  {
    id: '2083-joti-jot-bhai-gurdas-ji',
    date: '2026-09-16',
    sambat: 2083,
    category: 'barsi',
    titleEn: 'Joti Jot — Bhai Gurdas Ji',
    titlePa: 'ਜੋਤੀ ਜੋਤ — ਭਾਈ ਗੁਰਦਾਸ ਜੀ',
    shortLabelEn: 'Bhai Gurdas Ji',
    shortLabelPa: 'ਭਾਈ ਗੁਰਦਾਸ ਜੀ',
    tithiRuleEn: 'Bhadon Sudhi 5 (31 Bhadon, Sambat 2083)',
    tithiRulePa: 'ਭਾਦੋਂ ਸੁਦੀ ੫ (੩੧ ਭਾਦੋਂ, ਸੰਮਤ ੨੦੮੩)',
    summaryEn:
      'Annual commemoration of Bhai Gurdas Ji (scribe of Adi Granth Sahib Ji) on Bhadon Sudhi 5.',
    summaryPa:
      'ਭਾਦੋਂ ਸੁਦੀ ੫ ਨੂੰ ਆਦਿ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੇ ਲਿਖਾਰੀ ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਦਾ ਜੋਤੀ ਜੋਤ ਦਿਹਾੜਾ।',
    historicalContextEn:
      'Honoring Bhai Gurdas Ji’s 40 Vaaran and 675 Kabitt Swaiye as the key to Gurbani exegesis.',
    historicalContextPa:
      'ਗੁਰਬਾਣੀ ਦੀ ਕੁੰਜੀ ੪੦ ਵਾਰਾਂ ਅਤੇ ਕਬਿੱਤ ਸਵਈਆਂ ਦੇ ਰਚਨਹਾਰ ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਦੀ ਯਾਦ।',
    subGroups: ['gursikh'],
    citations: [
      {
        sourceEn: 'Bhai Gurdas Ji Vaaran',
        sourcePa: 'ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਵਾਰਾਂ',
        referenceEn: 'Vaar 1, Pauri 27 · Satgur Nanak Pragatia',
        referencePa: 'ਵਾਰ ੧, ਪਉੜੀ ੨੭ · ਸਤਿਗੁਰ ਨਾਨਕ ਪ੍ਰਗਟਿਆ',
      },
    ],
  },
  {
    id: '2083-dasam-granth-chaupai-colophon',
    date: '2026-09-19',
    sambat: 2083,
    category: 'khalsa',
    titleEn: 'Sri Dasam Granth Colophon — Completion of Benti Chaupai Sahib (1753 Bikrami)',
    titlePa: 'ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ ਹਵਾਲਾ — ਬੇਨਤੀ ਚੌਪਈ ਸਾਹਿਬ ਸੰਪੂਰਨਤਾ (੧੭੫੩ ਬਿਕ੍ਰਮੀ)',
    shortLabelEn: 'Chaupai Sahib Colophon',
    shortLabelPa: 'ਚੌਪਈ ਸਾਹਿਬ ਹਵਾਲਾ',
    tithiRuleEn: 'Bhadon Sudhi 8 (3 Assu, Sambat 2083)',
    tithiRulePa: 'ਭਾਦੋਂ ਸੁਦੀ ੮ (੩ ਅੱਸੂ, ਸੰਮਤ ੨੦੮੩)',
    summaryEn:
      'Scriptural colophon anniversary of Benti Chaupai Sahib on Bhadon Sudhi Ashtami (19 September 2026 / 3 Assu, Sambat 2083).',
    summaryPa:
      'ਭਾਦੋਂ ਸੁਦੀ ਅਸ਼ਟਮੀ (੧੯ ਸਤੰਬਰ ੨੦੨੬ / ੩ ਅੱਸੂ, ਸੰਮਤ ੨੦੮੩) ਨੂੰ ਬੇਨਤੀ ਚੌਪਈ ਸਾਹਿਬ ਦੀ ਸੰਪੂਰਨਤਾ ਦਾ ਪਾਵਨ ਦਿਹਾੜਾ।',
    historicalContextEn:
      'Commemorating the completion of Sri Charitropakhyan and Benti Chaupai Sahib on the banks of the Satluj in Sambat 1753 Bikrami.',
    historicalContextPa:
      'ਸੰਮਤ ੧੭੫੩ ਬਿਕ੍ਰਮੀ ਨੂੰ ਸਤਲੁਜ ਕੰਢੇ ਬੇਨਤੀ ਚੌਪਈ ਸਾਹਿਬ ਦੀ ਸੰਪੂਰਨਤਾ ਦੀ ਯਾਦ।',
    pothiUrl: 'https://pothi.tatkhalsa.in/sundar-gutka/chaupai-sahib',
    citations: [
      {
        sourceEn: 'Sri Dasam Granth Sahib Ji (Charitropakhyan 405 · Benti Chaupai)',
        sourcePa: 'ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਚਰਿਤ੍ਰੋਪਾਖਿਆਨ ੪੦੫ · ਬੇਨਤੀ ਚੌਪਈ)',
        referenceEn: 'Ang 1388 · Bhadrav Sudhi Ashtami Ravi Vaara, Teer Satudrav Granth Sudhaara',
        referencePa: 'ਅੰਗ ੧੩੮੮ · ਭਾਦ੍ਰਵ ਸੁਦੀ ਅਸਟਮੀ ਰਵਿ ਵਾਰਾ, ਤੀਰ ਸਤੁਦ੍ਰਵ ਗ੍ਰੰਥ ਸੁਧਾਰਾ',
        pothiUrl: 'https://pothi.tatkhalsa.in/sundar-gutka/chaupai-sahib',
      },
    ],
  },
  {
    id: '2083-joti-jot-guru-nanak-dev',
    date: '2026-10-05',
    sambat: 2083,
    category: 'gurpurab',
    titleEn: 'Joti Jot — Sri Guru Nanak Dev Ji & Guru Nanak Parivar',
    titlePa: 'ਜੋਤੀ ਜੋਤ — ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਅਤੇ ਗੁਰੂ ਨਾਨਕ ਪਰਿਵਾਰ',
    shortLabelEn: 'Joti Jot Guru Nanak Ji',
    shortLabelPa: 'ਜੋਤੀ ਜੋਤ ਗੁਰੂ ਨਾਨਕ ਜੀ',
    tithiRuleEn: 'Assu Vadhi 10 (19 Assu, Sambat 2083)',
    tithiRulePa: 'ਅੱਸੂ ਵਦੀ ੧੦ (੧੯ ਅੱਸੂ, ਸੰਮਤ ੨੦੮੩)',
    summaryEn:
      'Puratan Joti Jot commemoration of First Patshah Sri Guru Nanak Dev Ji at Sri Kartarpur Sahib (Assu Vadhi 10, Sambat 2083).',
    summaryPa:
      'ਅੱਸੂ ਵਦੀ ੧੦ (੧੯ ਅੱਸੂ, ਸੰਮਤ ੨੦੮੩) ਨੂੰ ਸ੍ਰੀ ਕਰਤਾਰਪੁਰ ਸਾਹਿਬ ਵਿਖੇ ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਦਾ ਜੋਤੀ ਜੋਤ ਦਿਹਾੜਾ।',
    historicalContextEn:
      'Observed on Monday, 5 October 2026 (Assu Vadhi 10) following authentic Purnimanta lunar chronology.',
    historicalContextPa:
      'ਸੋਮਵਾਰ ੫ ਅਕਤੂਬਰ ੨੦੨੬ (ਅੱਸੂ ਵਦੀ ੧੦) ਨੂੰ ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਦਾ ਜੋਤੀ ਜੋਤ ਦਿਹਾੜਾ।',
    subGroups: ['guru-ghar'],
    citations: [
      {
        sourceEn: 'Puratan Janamsakhi & Mehma Prakash',
        sourcePa: 'ਪੁਰਾਤਨ ਜਨਮਸਾਖੀ ਅਤੇ ਮਹਿਮਾ ਪ੍ਰਕਾਸ਼',
        referenceEn: 'Assu Vadhi 10, Sambat 1596 Bikrami · Sri Kartarpur Sahib',
        referencePa: 'ਅੱਸੂ ਵਦੀ ੧੦, ਸੰਮਤ ੧੫੯੬ ਬਿਕ੍ਰਮੀ · ਸ੍ਰੀ ਕਰਤਾਰਪੁਰ ਸਾਹਿਬ',
      },
    ],
  },
  {
    id: '2083-aagman-sheikh-farid-ji',
    date: '2026-10-15',
    sambat: 2083,
    category: 'khalsa',
    titleEn: 'Aagman Purab — Baba Sheikh Farid Ji',
    titlePa: 'ਆਗਮਨ ਪੁਰਬ — ਬਾਬਾ ਸ਼ੇਖ਼ ਫ਼ਰੀਦ ਜੀ',
    shortLabelEn: 'Baba Sheikh Farid Ji',
    shortLabelPa: 'ਬਾਬਾ ਸ਼ੇਖ਼ ਫ਼ਰੀਦ ਜੀ',
    tithiRuleEn: '29 Assu, Sambat 2083 (Faridkot & Pakpattan)',
    tithiRulePa: '੨੯ ਅੱਸੂ, ਸੰਮਤ ੨੦੮੩ (ਫ਼ਰੀਦਕੋਟ ਅਤੇ ਪਾਕਪਟਨ)',
    summaryEn:
      'Commemoration of Baba Sheikh Farid Ji (29 Assu, Sambat 2083), whose 112 saloks and 4 shabads grace Sri Guru Granth Sahib Ji.',
    summaryPa:
      '੨੯ ਅੱਸੂ ਸੰਮਤ ੨੦੮੩ ਨੂੰ ਬਾਬਾ ਸ਼ੇਖ਼ ਫ਼ਰੀਦ ਜੀ ਦਾ ਆਗਮਨ ਪੁਰਬ।',
    historicalContextEn:
      'Celebrated annually across Faridkot and the Sikh world in remembrance of Baba Farid Ji’s Gurbani.',
    historicalContextPa:
      'ਫ਼ਰੀਦਕੋਟ ਅਤੇ ਸਮੂਹ ਸਿੱਖ ਜਗਤ ਵਿੱਚ ਬਾਬਾ ਸ਼ੇਖ਼ ਫ਼ਰੀਦ ਜੀ ਦੀ ਪਾਵਨ ਬਾਣੀ ਦੀ ਯਾਦ।',
    subGroups: ['bhagat-bhatt'],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=1377',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji (Salok Sheikh Farid Ke)',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਸਲੋਕ ਸ਼ੇਖ ਫਰੀਦ ਕੇ)',
        referenceEn: 'Ang 1377 · Salok 1',
        referencePa: 'ਅੰਗ ੧੩੭੭ · ਸਲੋਕ ੧',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=1377',
      },
    ],
  },
  {
    id: '2083-parkash-guru-ram-das',
    date: '2026-10-27',
    sambat: 2083,
    category: 'gurpurab',
    titleEn: 'Parkash Purab — Sri Guru Ram Das Sahib Ji',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸ੍ਰੀ ਗੁਰੂ ਰਾਮਦਾਸ ਸਾਹਿਬ ਜੀ',
    shortLabelEn: 'Parkash Guru Ram Das Ji',
    shortLabelPa: 'ਪ੍ਰਕਾਸ਼ ਗੁਰੂ ਰਾਮਦਾਸ ਜੀ',
    tithiRuleEn: 'Katak Vadhi 2 (11 Katak, Sambat 2083)',
    tithiRulePa: 'ਕੱਤਕ ਵਦੀ ੨ (੧੧ ਕੱਤਕ, ਸੰਮਤ ੨੦੮੩)',
    summaryEn:
      'Puratan lunar Parkash Purab of Fourth Patshah Sri Guru Ram Das Sahib Ji, founder of Sri Amritsar Sahib (Katak Vadhi 2, Sambat 2083).',
    summaryPa:
      'ਸ੍ਰੀ ਅੰਮ੍ਰਿਤਸਰ ਸਾਹਿਬ ਦੇ ਬਾਨੀ ਚੌਥੇ ਪਾਤਸ਼ਾਹ ਸ੍ਰੀ ਗੁਰੂ ਰਾਮਦਾਸ ਸਾਹਿਬ ਜੀ ਦਾ ਪੁਰਾਤਨ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ (ਕੱਤਕ ਵਦੀ ੨, ੧੧ ਕੱਤਕ, ਸੰਮਤ ੨੦੮੩)।',
    historicalContextEn:
      'Observed on Tuesday, 27 October 2026 (11 Katak 2083) as Katak Vadhi 2 falls between sunrise transitions in late October 2026.',
    historicalContextPa:
      'ਮੰਗਲਵਾਰ ੨੭ ਅਕਤੂਬਰ ੨੦੨੬ (੧੧ ਕੱਤਕ ੨੦੮੩) ਨੂੰ ਕੱਤਕ ਵਦੀ ੨ ਅਨੁਸਾਰ ਸ੍ਰੀ ਗੁਰੂ ਰਾਮਦਾਸ ਸਾਹਿਬ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ।',
    subGroups: ['guru-ghar'],
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji (Swaiye Mahalle Chauthe Ke)',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਸਵਈਏ ਮਹਲੇ ਚਉਥੇ ਕੇ)',
        referenceEn: 'Ang 1398 · Dhan Dhan Ram Das Gur',
        referencePa: 'ਅੰਗ ੧੩੯੮ · ਧੰਨੁ ਧੰਨੁ ਰਾਮਦਾਸ ਗੁਰੁ',
        excerptPa: 'ਧੰਨੁ ਧੰਨੁ ਰਾਮਦਾਸ ਗੁਰੁ ਜਿਨਿ ਸਿਰਿਆ ਤਿਨੈ ਸਵਾਰਿਆ ॥',
        excerptTranslit: 'Dhann dhann Raamdaas Gur jin siriaa tinai savaariaa.',
      },
    ],
    featured: true,
  },
] as const;
