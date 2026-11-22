import type {HistoricalEvent} from './types';

/**
 * Expanded Panthic Puratan Bikrami Dataset (Sambat 2083–2084):
 * - All 15 Bhagat Sahibaan (Sri Guru Granth Sahib Ji)
 * - All 11 Bhatt Sahibaan (Bhatt De Swayye, SGGS Ang 1389–1409)
 * - All 4 Gursikh Bani-kars (Bhai Mardana Ji, Baba Sundar Ji, Bhai Satta Ji & Bhai Balwand Ji) & Bhai Gurdas Ji
 * - Sahibzade & Guru Ghar Families of every Guru Sahib
 * - Panj Pyare, Classic Gursikhs, Shaheedi Hafta (6–13 Poh), and Khalsa Shaheeds
 *
 * Historical accuracy principle: Where Puratan chronicles (Mahan Kosh, Bhatt Vahis,
 * Sri Gurpratap Suraj Granth, Prachin Panth Prakash) preserve a verified Bikrami solar
 * or lunar date, it is anchored directly; where an exact birth/passing day is unrecorded
 * or differs across manuscripts, that historical note is stated explicitly rather than invented.
 */
export const EXPANDED_PANTHIC_EVENTS: readonly HistoricalEvent[] = [
  // =========================================================================
  // SAMBAT 2083 (Katak – Phagun, Oct 2026 – Mar 2027)
  // =========================================================================
  {
    id: '2083-parkash-mata-sahib-kaur-ji',
    date: '2026-11-03',
    sambat: 2083,
    category: 'gurpurab',
    subGroups: ['guru-ghar'],
    titleEn: 'Parkash Purab — Mata Sahib Kaur Ji (Mother of the Khalsa)',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਮਾਤਾ ਸਾਹਿਬ ਕੌਰ ਜੀ (ਖ਼ਾਲਸੇ ਦੇ ਮਾਤਾ)',
    shortLabelEn: 'Mata Sahib Kaur Ji',
    shortLabelPa: 'ਮਾਤਾ ਸਾਹਿਬ ਕੌਰ ਜੀ',
    tithiRuleEn: '18 Katak, Sambat 2083',
    tithiRulePa: '੧੮ ਕੱਤਕ, ਸੰਮਤ ੨੦੮੩',
    summaryEn:
      'Parkash Purab of Mata Sahib Kaur Ji (Rohtas, 18 Katak, Sambat 1738), revered eternally as the spiritual Mother of the Khalsa Panth.',
    summaryPa:
      'ਖ਼ਾਲਸਾ ਪੰਥ ਦੇ ਮਾਤਾ ਸ੍ਰੀ ਮਾਤਾ ਸਾਹਿਬ ਕੌਰ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ (ਰੋਹਤਾਸ, ੧੮ ਕੱਤਕ, ਸੰਮਤ ੧੭੩੮ ਬਿਕ੍ਰਮੀ)।',
    historicalContextEn:
      'Born to Bhai Ramu Bassi and Mata Jasdevi Ji at Rohtas on 18 Katak, Sambat 1738 (1681 CE), Mata Sahib Kaur Ji poured patase (sugar wafers) into the Khande-Bate da Amrit at Sri Anandpur Sahib and issued authoritative Hukamnamas guiding the Khalsa Panth from Delhi after 1708 CE.',
    historicalContextPa:
      '੧੮ ਕੱਤਕ ਸੰਮਤ ੧੭੩੮ ਨੂੰ ਰੋਹਤਾਸ ਵਿਖੇ ਪ੍ਰਕਾਸ਼ ਧਾਰਨ ਵਾਲੇ ਮਾਤਾ ਸਾਹਿਬ ਕੌਰ ਜੀ ਨੇ ਖੰਡੇ-ਬਾਟੇ ਦੇ ਅੰਮ੍ਰਿਤ ਵਿੱਚ ਪਤਾਸੇ ਪਾ ਕੇ ਖ਼ਾਲਸੇ ਵਿੱਚ ਮਿਠਾਸ ਭਰੀ ਅਤੇ ਦਿੱਲੀ ਤੋਂ ਪੰਥ ਦੇ ਨਾਮ ਪ੍ਰਮਾਣਿਕ ਹੁਕਮਨਾਮੇ ਜਾਰੀ ਕੀਤੇ।',
    citations: [
      {
        sourceEn: 'Bhatt Vahi & Hukamnamas of Mata Sahib Kaur Ji',
        sourcePa: 'ਭੱਟ ਵਹੀ ਅਤੇ ਮਾਤਾ ਸਾਹਿਬ ਕੌਰ ਜੀ ਦੇ ਹੁਕਮਨਾਮੇ',
        referenceEn: '18 Katak, Sambat 1738 · Rohtas & Delhi Hukamnama Archive',
        referencePa: '੧੮ ਕੱਤਕ, ਸੰਮਤ ੧੭੩੮ · ਰੋਹਤਾਸ ਅਤੇ ਦਿੱਲੀ ਹੁਕਮਨਾਮੇ',
      },
    ],
  },
  {
    id: '2083-janam-sahibzada-baba-zorawar-singh-ji',
    date: '2026-11-30',
    sambat: 2083,
    category: 'gurpurab',
    subGroups: ['guru-ghar'],
    titleEn: 'Parkash Purab — Sahibzada Baba Zorawar Singh Ji',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸਾਹਿਬਜ਼ਾਦਾ ਬਾਬਾ ਜ਼ੋਰਾਵਰ ਸਿੰਘ ਜੀ',
    shortLabelEn: 'Baba Zorawar Singh Ji Janam',
    shortLabelPa: 'ਬਾਬਾ ਜ਼ੋਰਾਵਰ ਸਿੰਘ ਜੀ ਜਨਮ',
    tithiRuleEn: '15 Maghar, Sambat 2083',
    tithiRulePa: '੧੫ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੩',
    summaryEn:
      'Birth anniversary of third Sahibzada Baba Zorawar Singh Ji at Sri Anandpur Sahib (Sambat 1753 Bikrami).',
    summaryPa:
      'ਦਸਮੇਸ਼ ਪਿਤਾ ਜੀ ਦੇ ਤੀਸਰੇ ਸਪੁੱਤਰ ਸਾਹਿਬਜ਼ਾਦਾ ਬਾਬਾ ਜ਼ੋਰਾਵਰ ਸਿੰਘ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ (ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ, ਸੰਮਤ ੧੭੫੩)।',
    historicalContextEn:
      'Born to Sri Guru Gobind Singh Ji and Mata Jito Ji at Sri Anandpur Sahib in Maghar, Sambat 1753 (1696 CE), Baba Zorawar Singh Ji stood unshaken in Sikhi at age nine alongside younger brother Baba Fateh Singh Ji in the court of Wazir Khan at Sirhind.',
    historicalContextPa:
      'ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਵਿਖੇ ਮਾਤਾ ਜੀਤੋ ਜੀ ਦੀ ਕੁੱਖੋਂ ਸੰਮਤ ੧੭੫੩ ਮੱਘਰ ਵਿੱਚ ਪ੍ਰਕਾਸ਼ ਧਾਰਨ ਵਾਲੇ ਬਾਬਾ ਜ਼ੋਰਾਵਰ ਸਿੰਘ ਜੀ ਨੇ ੯ ਸਾਲ ਦੀ ਉਮਰ ਵਿੱਚ ਸਰਹਿੰਦ ਦੀਆਂ ਨੀਂਹਾਂ ਵਿੱਚ ਸ਼ਹੀਦੀ ਪ੍ਰਾਪਤ ਕਰਕੇ ਧਰਮ ਦੀ ਰਾਖੀ ਕੀਤੀ।',
    citations: [
      {
        sourceEn: 'Bhatt Vahi Talauda & Guru Kian Sakhian',
        sourcePa: 'ਭੱਟ ਵਹੀ ਤਲੌਡਾ ਅਤੇ ਗੁਰੂ ਕੀਆਂ ਸਾਖੀਆਂ',
        referenceEn: 'Maghar, Sambat 1753 · Sri Anandpur Sahib',
        referencePa: 'ਮੱਘਰ, ਸੰਮਤ ੧੭੫੩ · ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ',
      },
    ],
  },
  {
    id: '2083-joti-jot-baba-budha-ji',
    date: '2026-12-02',
    sambat: 2083,
    category: 'khalsa',
    subGroups: ['gursikh'],
    titleEn: 'Joti Jot Divas — Brahmgyani Baba Budha Ji (Ramdas)',
    titlePa: 'ਜੋਤੀ ਜੋਤ ਦਿਵਸ — ਬ੍ਰਹਮਗਿਆਨੀ ਬਾਬਾ ਬੁੱਢਾ ਜੀ (ਰਮਦਾਸ)',
    shortLabelEn: 'Baba Budha Ji Joti Jot',
    shortLabelPa: 'ਬਾਬਾ ਬੁੱਢਾ ਜੀ ਜੋਤੀ ਜੋਤ',
    tithiRuleEn: '17 Maghar, Sambat 2083 (Maghar Sudhi 4 tradition)',
    tithiRulePa: '੧੭ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੩ (ਮੱਘਰ ਸੁਦੀ ੪ ਪਰੰਪਰਾ)',
    summaryEn:
      'Passing of Brahmgyani Baba Budha Ji at Ramdas (Sambat 1688 Bikrami) in the physical presence of Sixth Patshah Sri Guru Hargobind Sahib Ji.',
    summaryPa:
      'ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਦੀ ਹਜ਼ੂਰੀ ਵਿੱਚ ਰਮਦਾਸ ਵਿਖੇ ਬ੍ਰਹਮਗਿਆਨੀ ਬਾਬਾ ਬੁੱਢਾ ਜੀ ਦਾ ਜੋਤੀ ਜੋਤ ਦਿਵਸ (ਸੰਮਤ ੧੬੮੮)।',
    historicalContextEn:
      'Having served six Guru Sahibs from Sri Guru Nanak Dev Ji to Sri Guru Hargobind Sahib Ji and consecrated five Gurgaddi Tilaks, First Head Granthi Baba Budha Ji departed on 17 Maghar / Maghar Sudhi 4, Sambat 1688 (1631 CE) at Ramdas, where Guru Hargobind Sahib Ji personally shouldered His bier.',
    historicalContextPa:
      'ਛੇ ਗੁਰੂ ਸਾਹਿਬਾਨ ਦੀ ਸੇਵਾ ਕਰਨ ਅਤੇ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦੇ ਪਹਿਲੇ ਮੁੱਖ ਗ੍ਰੰਥੀ ਵਜੋਂ ਸੇਵਾ ਨਿਭਾਉਣ ਉਪਰੰਤ ਬਾਬਾ ਬੁੱਢਾ ਜੀ ਸੰਮਤ ੧੬੮੮ ਵਿੱਚ ਰਮਦਾਸ ਵਿਖੇ ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਦੀ ਗੋਦ ਵਿੱਚ ਜੋਤੀ ਜੋਤ ਸਮਾਏ।',
    citations: [
      {
        sourceEn: 'Sri Gur Pratap Suraj Granth',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ',
        referenceEn: 'Raas 6, Ansu 42–46 · Baba Budha Ji Joti Jot at Ramdas',
        referencePa: 'ਰਾਸਿ ੬, ਅੰਸੂ ੪੨–੪੬ · ਬਾਬਾ ਬੁੱਢਾ ਜੀ ਜੋਤੀ ਜੋਤ (ਰਮਦਾਸ)',
      },
    ],
  },
  {
    id: '2083-joti-jot-bhai-mardana-ji',
    date: '2026-12-04',
    sambat: 2083,
    category: 'khalsa',
    subGroups: ['bhagat-bhatt', 'gursikh'],
    titleEn: 'Joti Jot Divas — Bhai Mardana Ji (First Rababi & SGGS Bani-kar)',
    titlePa: 'ਜੋਤੀ ਜੋਤ ਦਿਵਸ — ਭਾਈ ਮਰਦਾਨਾ ਜੀ (ਪਹਿਲੇ ਰਬਾਬੀ ਅਤੇ ਗੁਰਸਿੱਖ ਬਾਣੀਕਾਰ)',
    shortLabelEn: 'Bhai Mardana Ji Joti Jot',
    shortLabelPa: 'ਭਾਈ ਮਰਦਾਨਾ ਜੀ ਜੋਤੀ ਜੋਤ',
    tithiRuleEn: '19 Maghar, Sambat 2083 (Maghar Vadhi 11 tradition)',
    tithiRulePa: '੧੯ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੩ (ਮੱਘਰ ਵਦੀ ੧੧ ਪਰੰਪਰਾ)',
    summaryEn:
      'Commemoration of Bhai Mardana Ji, lifelong companion and Rababi of Sri Guru Nanak Dev Ji, whose three Saloks in Raag Bihagra appear on Ang 553 of Sri Guru Granth Sahib Ji.',
    summaryPa:
      'ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਦੇ ਜੀਵਨ-ਸਾਥੀ ਅਤੇ ਪਹਿਲੇ ਰਬਾਬੀ ਭਾਈ ਮਰਦਾਨਾ ਜੀ ਦਾ ਜੋਤੀ ਜੋਤ ਦਿਵਸ — ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਅੰਗ ੫੫੩) ਵਿੱਚ ਤਿੰਨ ਸਲੋਕ ਦਰਜ ਹਨ।',
    historicalContextEn:
      'Accompanying Sri Guru Nanak Dev Ji across all four Udasis with the celestial Rabab, Bhai Mardana Ji is one of the four Gursikh Bani-kars in Sri Guru Granth Sahib Ji (Raag Bihagra Ki Vaar, Ang 553). Mahan Kosh and Janamsakhi chronicles record his passing on Maghar Vadhi 11 / 19 Maghar (Sambat 1591 / 1534 CE).',
    historicalContextPa:
      'ਚਾਰੇ ਉਦਾਸੀਆਂ ਦੌਰਾਨ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਨਾਲ ਰਬਾਬ ਵਜਾਉਣ ਵਾਲੇ ਭਾਈ ਮਰਦਾਨਾ ਜੀ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੇ ਚਾਰ ਗੁਰਸਿੱਖ ਬਾਣੀਕਾਰਾਂ ਵਿੱਚੋਂ ਹਨ (ਰਾਗ ਬਿਹਾਗੜਾ, ਅੰਗ ੫੫੩)। ਮਹਾਨ ਕੋਸ਼ ਅਨੁਸਾਰ ਆਪ ਜੀ ਸੰਮਤ ੧੫੯੧ ਮੱਘਰ ਵਿੱਚ ਸੱਚਖੰਡ ਪਿਆਨਾ ਕਰ ਗਏ।',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ',
        referenceEn: 'Ang 553 · Salok Mardana 1 (Raag Bihagra)',
        referencePa: 'ਅੰਗ ੫੫੩ · ਸਲੋਕੁ ਮਰਦਾਨਾ ੧ (ਰਾਗ ਬਿਹਾਗੜਾ)',
        excerptPa: 'ਕਾਇਆ ਲਾਹਣਿ ਆਪੁ ਮਦੁ ਮਜਲਸ ਤ੍ਰਿਸਨਾ ਧਾਤੁ ॥',
        excerptTranslit: 'Kaaiaa laahan aap mad majalas trisnaa dhaat.',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=553',
        pothiLabelEn: 'Read Salok Mardana 1 (Ang 553)',
        pothiLabelPa: 'ਪੋਥੀ ਸਾਹਿਬ ’ਤੇ ਸਲੋਕ ਮਰਦਾਨਾ (ਅੰਗ ੫੫੩) ਪੜ੍ਹੋ',
      },
      {
        sourceEn: 'Mahan Kosh (Bhai Kahn Singh Nabha)',
        sourcePa: 'ਮਹਾਨ ਕੋਸ਼ (ਭਾਈ ਕਾਨ੍ਹ ਸਿੰਘ ਨਾਭਾ)',
        referenceEn: 'Entry: Mardana (ਮਰਦਾਨਾ) · Maghar Sambat 1591',
        referencePa: 'ਇੰਦਰਾਜ: ਮਰਦਾਨਾ · ਮੱਘਰ ਸੰਮਤ ੧੫੯੧',
      },
    ],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=553',
    pothiLabelEn: 'Read Bhai Mardana Ji Bani (Ang 553)',
    pothiLabelPa: 'ਭਾਈ ਮਰਦਾਨਾ ਜੀ ਬਾਣੀ (ਅੰਗ ੫੫੩) ਪੜ੍ਹੋ',
  },
  {
    id: '2083-bhagat-sain-ji',
    date: '2026-12-05',
    sambat: 2083,
    category: 'khalsa',
    subGroups: ['bhagat-bhatt'],
    titleEn: 'Parkash Purab — Bhagat Sain Ji (SGGS Ang 695)',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਭਗਤ ਸੈਣ ਜੀ (ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਅੰਗ ੬੯੫)',
    shortLabelEn: 'Bhagat Sain Ji',
    shortLabelPa: 'ਭਗਤ ਸੈਣ ਜੀ',
    tithiRuleEn: 'Maghar Vadhi 12 (20 Maghar, Sambat 2083 · Traditional)',
    tithiRulePa: 'ਮੱਘਰ ਵਦੀ ੧੨ (੨੦ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੩ · ਪਰੰਪਰਿਕ)',
    summaryEn:
      'Traditional Maghar Vadhi 12 commemoration of Bhagat Sain Ji, whose Shabad in Raag Dhanasri (Ang 695) is enshrined in Sri Guru Granth Sahib Ji and praised by Bhai Gurdas Ji in Vaar 10.',
    summaryPa:
      'ਭਗਤ ਸੈਣ ਜੀ ਦਾ ਪਰੰਪਰਿਕ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੇ ਅੰਗ ੬੯੫ (ਰਾਗ ਧਨਾਸਰੀ) ’ਤੇ ਆਪ ਜੀ ਦਾ ਸ਼ਬਦ ਦਰਜ ਹੈ।',
    historicalContextEn:
      'Bhagat Sain Ji (14th–15th century, Rewa court) attained supreme devotion through selfless seva and Sangat, immortalized by Bhai Gurdas Ji in Vaar 10, Pauri 16. Note per Mahan Kosh: exact birth date varies in surviving chronicles; Maghar Vadhi 12 is the widely observed traditional Puratan Jayanti.',
    historicalContextPa:
      'ਭਗਤ ਸੈਣ ਜੀ ਦੀ ਨਿਸ਼ਕਾਮ ਸੇਵਾ ਅਤੇ ਭਗਤੀ ਦੀ ਵਡਿਆਈ ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਨੇ ਵਾਰ ੧੦ ਪਉੜੀ ੧੬ ਵਿੱਚ ਕੀਤੀ ਹੈ। ਮਹਾਨ ਕੋਸ਼ ਅਨੁਸਾਰ ਪੁਰਾਤਨ ਗ੍ਰੰਥਾਂ ਵਿੱਚ ਸਹੀ ਜਨਮ ਮਿਤੀ ਬਾਰੇ ਮਤਭੇਦ ਹਨ, ਪਰ ਮੱਘਰ ਵਦੀ ੧੨ ਨੂੰ ਪਰੰਪਰਿਕ ਤੌਰ ’ਤੇ ਯਾਦ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ',
        referenceEn: 'Ang 695 · Raag Dhanasri, Bhagat Sain Ji',
        referencePa: 'ਅੰਗ ੬੯੫ · ਰਾਗ ਧਨਾਸਰੀ, ਭਗਤ ਸੈਣ ਜੀ',
        excerptPa: 'ਧੂਪ ਦੀਪ ਘ੍ਰਿਤ ਸਾਜਿ ਆਰਤੀ ॥ ਵਾਰਨੇ ਜਾਉ ਕਮਲਾ ਪਤੀ ॥੧॥',
        excerptTranslit: 'Dhoop deep ghrit saaj aartee, vaarne jaau kamlaa patee.',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=695',
        pothiLabelEn: 'Read Bhagat Sain Ji Shabad (Ang 695)',
        pothiLabelPa: 'ਪੋਥੀ ਸਾਹਿਬ ’ਤੇ ਭਗਤ ਸੈਣ ਜੀ ਸ਼ਬਦ (ਅੰਗ ੬੯੫) ਪੜ੍ਹੋ',
      },
      {
        sourceEn: 'Bhai Gurdas Ji Vaaran',
        sourcePa: 'ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਵਾਰਾਂ',
        referenceEn: 'Vaar 10, Pauri 16 · Bhagat Sain Ji',
        referencePa: 'ਵਾਰ ੧੦, ਪਉੜੀ ੧੬ · ਭਗਤ ਸੈਣ ਜੀ',
      },
    ],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=695',
    pothiLabelEn: 'Read Bhagat Sain Ji Bani (Ang 695)',
    pothiLabelPa: 'ਭਗਤ ਸੈਣ ਜੀ ਬਾਣੀ (ਅੰਗ ੬੯੫) ਪੜ੍ਹੋ',
  },
  {
    id: '2083-janam-bhai-sahib-singh-ji-panj-pyare',
    date: '2026-12-07',
    sambat: 2083,
    category: 'khalsa',
    subGroups: ['gursikh'],
    titleEn: 'Janam Divas — Bhai Sahib Singh Ji (Panj Pyare)',
    titlePa: 'ਜਨਮ ਦਿਵਸ — ਭਾਈ ਸਾਹਿਬ ਸਿੰਘ ਜੀ (ਪੰਜ ਪਿਆਰੇ)',
    shortLabelEn: 'Bhai Sahib Singh Ji Janam',
    shortLabelPa: 'ਭਾਈ ਸਾਹਿਬ ਸਿੰਘ ਜੀ ਜਨਮ',
    tithiRuleEn: '22 Maghar, Sambat 2083',
    tithiRulePa: '੨੨ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੩',
    summaryEn:
      'Birth anniversary of Bhai Sahib Singh Ji of Bidar (Karnataka), fifth of the Panj Pyare blessed at Vaisakhi 1699 and Shaheed at Sri Chamkaur Sahib.',
    summaryPa:
      'ਬਿਦਰ (ਕਰਨਾਟਕ) ਦੇ ਨਿਵਾਸੀ, ੧੬੯੯ ਦੀ ਵੈਸਾਖੀ ਦੇ ਪੰਜ ਪਿਆਰਿਆਂ ਵਿੱਚੋਂ ਭਾਈ ਸਾਹਿਬ ਸਿੰਘ ਜੀ ਦਾ ਜਨਮ ਦਿਵਸ, ਜੋ ਸ੍ਰੀ ਚਮਕੌਰ ਸਾਹਿਬ ਵਿਖੇ ਸ਼ਹੀਦ ਹੋਏ।',
    historicalContextEn:
      'Born on 22 Maghar, Sambat 1719 (1662 CE) at Bidar (Gurdwara Nanak Jhira Sahib), Bhai Sahib Chand offered his head to Sri Guru Gobind Singh Ji on Vaisakhi 1699, became Bhai Sahib Singh Ji, and attained martyrdom fighting heroically at the Battle of Chamkaur Sahib on 8 Poh, Sambat 1761.',
    historicalContextPa:
      '੨੨ ਮੱਘਰ ਸੰਮਤ ੧੭੧੯ ਨੂੰ ਬਿਦਰ (ਨਾਨਕ ਝੀਰਾ ਸਾਹਿਬ) ਵਿਖੇ ਜਨਮੇ ਭਾਈ ਸਾਹਿਬ ਸਿੰਘ ਜੀ ਨੇ ੧੬੯੯ ਦੀ ਵੈਸਾਖੀ ਨੂੰ ਸੀਸ ਭੇਟ ਕੀਤਾ ਅਤੇ ੮ ਪੋਹ ਸੰਮਤ ੧੭੬੧ ਨੂੰ ਸ੍ਰੀ ਚਮਕੌਰ ਸਾਹਿਬ ਦੀ ਗੜ੍ਹੀ ਵਿੱਚ ਸ਼ਹੀਦੀ ਪਾਈ।',
    citations: [
      {
        sourceEn: 'Mahan Kosh & Bhatt Vahi',
        sourcePa: 'ਮਹਾਨ ਕੋਸ਼ ਅਤੇ ਭੱਟ ਵਹੀ',
        referenceEn: 'Entry: Sahib Singh (Panj Pyare) · Bidar & Chamkaur Sahib',
        referencePa: 'ਇੰਦਰਾਜ: ਸਾਹਿਬ ਸਿੰਘ (ਪੰਜ ਪਿਆਰੇ) · ਬਿਦਰ ਅਤੇ ਚਮਕੌਰ ਸਾਹਿਬ',
      },
    ],
  },
  {
    id: '2083-mata-sundri-ji-remembrance',
    date: '2026-12-10',
    sambat: 2083,
    category: 'khalsa',
    subGroups: ['guru-ghar'],
    titleEn: 'Joti Jot Remembrance — Mata Sundri Ji (Delhi Panthic Leadership)',
    titlePa: 'ਜੋਤੀ ਜੋਤ ਯਾਦਗਾਰ — ਮਾਤਾ ਸੁੰਦਰੀ ਜੀ (ਦਿੱਲੀ ਪੰਥਕ ਅਗਵਾਈ)',
    shortLabelEn: 'Mata Sundri Ji',
    shortLabelPa: 'ਮਾਤਾ ਸੁੰਦਰੀ ਜੀ',
    tithiRuleEn: 'Maghar Remembrance (25 Maghar, Sambat 2083 · Mahan Kosh Note)',
    tithiRulePa: 'ਮੱਘਰ ਯਾਦਗਾਰ (੨੫ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੩ · ਮਹਾਨ ਕੋਸ਼ ਨੋਟ)',
    summaryEn:
      'Honoring Mata Sundri Ji (Mata of Sahibzada Baba Ajit Singh Ji), who guided the Khalsa Panth for nearly four decades from Delhi and commissioned Bhai Mani Singh Ji’s seva at Sri Amritsar Sahib.',
    summaryPa:
      'ਸਾਹਿਬਜ਼ਾਦਾ ਬਾਬਾ ਅਜੀਤ ਸਿੰਘ ਜੀ ਦੇ ਮਾਤਾ ਸ੍ਰੀ ਮਾਤਾ ਸੁੰਦਰੀ ਜੀ ਦੀ ਯਾਦਗਾਰ, ਜਿਨ੍ਹਾਂ ਨੇ ਲਗਭਗ ੪੦ ਸਾਲ ਦਿੱਲੀ ਤੋਂ ਖ਼ਾਲਸਾ ਪੰਥ ਦੀ ਅਗਵਾਈ ਕੀਤੀ।',
    historicalContextEn:
      'Mata Sundri Ji (wed to Sri Guru Gobind Singh Ji in 1684 CE) led the Panth through the most turbulent decades of the 18th century via her Hukamnamas from Haveli Mata Sundri, Delhi, and dispatched Bhai Mani Singh Ji to restore Maryada at Sri Harmandir Sahib. Historical note per Mahan Kosh: surviving chronicles record her passing in Sambat 1804 (1747 CE) without unanimity on the exact day of month.',
    historicalContextPa:
      'ਮਾਤਾ ਸੁੰਦਰੀ ਜੀ ਨੇ ੧੮ਵੀਂ ਸਦੀ ਦੇ ਕਠਿਨ ਦੌਰ ਵਿੱਚ ਦਿੱਲੀ ਤੋਂ ਹੁਕਮਨਾਮਿਆਂ ਰਾਹੀਂ ਪੰਥ ਦੀ ਅਗਵਾਈ ਕੀਤੀ ਅਤੇ ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਨੂੰ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦੀ ਸੇਵਾ ਸੌਂਪੀ। ਮਹਾਨ ਕੋਸ਼ ਅਨੁਸਾਰ ਆਪ ਜੀ ਦਾ ਜੋਤੀ ਜੋਤ ਸਮਾਉਣਾ ਸੰਮਤ ੧੮੦੪ (੧੭੪੭ ਈ.) ਵਿੱਚ ਹੋਇਆ, ਪਰ ਸਹੀ ਤਾਰੀਖ਼ ਪੁਰਾਤਨ ਲਿਖਤਾਂ ਵਿੱਚ ਵੱਖੋ-ਵੱਖਰੀ ਮਿਲਦੀ ਹੈ।',
    citations: [
      {
        sourceEn: 'Mahan Kosh & Hukamnamas of Mata Sundri Ji',
        sourcePa: 'ਮਹਾਨ ਕੋਸ਼ ਅਤੇ ਮਾਤਾ ਸੁੰਦਰੀ ਜੀ ਦੇ ਹੁਕਮਨਾਮੇ',
        referenceEn: 'Entry: Sundri (Mata) · Sambat 1804 Delhi Archive',
        referencePa: 'ਇੰਦਰਾਜ: ਮਾਤਾ ਸੁੰਦਰੀ ਜੀ · ਸੰਮਤ ੧੮੦੪ ਦਿੱਲੀ ਹੁਕਮਨਾਮੇ',
      },
    ],
  },
  {
    id: '2083-janam-sahibzada-baba-fateh-singh-ji',
    date: '2026-12-14',
    sambat: 2083,
    category: 'gurpurab',
    subGroups: ['guru-ghar'],
    titleEn: 'Parkash Purab — Sahibzada Baba Fateh Singh Ji',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸਾਹਿਬਜ਼ਾਦਾ ਬਾਬਾ ਫ਼ਤਹਿ ਸਿੰਘ ਜੀ',
    shortLabelEn: 'Baba Fateh Singh Ji Janam',
    shortLabelPa: 'ਬਾਬਾ ਫ਼ਤਹਿ ਸਿੰਘ ਜੀ ਜਨਮ',
    tithiRuleEn: '29 Maghar, Sambat 2083 (11 Phagun alternate tradition noted)',
    tithiRulePa: '੨੯ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੩ (੧੧ ਫੱਗਣ ਦੂਜੀ ਪਰੰਪਰਾ)',
    summaryEn:
      'Commemorating the birth of youngest Sahibzada Baba Fateh Singh Ji at Sri Anandpur Sahib (Sambat 1755 Bikrami), symbol of fearless Khalsa sovereignty.',
    summaryPa:
      'ਦਸਮੇਸ਼ ਪਿਤਾ ਜੀ ਦੇ ਸਭ ਤੋਂ ਛੋਟੇ ਸਪੁੱਤਰ ਸਾਹਿਬਜ਼ਾਦਾ ਬਾਬਾ ਫ਼ਤਹਿ ਸਿੰਘ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ (ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ, ਸੰਮਤ ੧੭੫੫)।',
    historicalContextEn:
      'Born to Sri Guru Gobind Singh Ji and Mata Jito Ji at Sri Anandpur Sahib in Sambat 1755 (1699 CE), Baba Fateh Singh Ji was barely six years old when he proclaimed "Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh" inside Wazir Khan’s court and embraced Shaheedi on 13 Poh, Sambat 1761. Note: Bhatt Vahis record Maghar/Phagun Sambat 1755 across recensions.',
    historicalContextPa:
      'ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਵਿਖੇ ਸੰਮਤ ੧੭੫੫ ਵਿੱਚ ਪ੍ਰਕਾਸ਼ ਧਾਰਨ ਵਾਲੇ ਛੋਟੇ ਸਾਹਿਬਜ਼ਾਦਾ ਬਾਬਾ ਫ਼ਤਹਿ ਸਿੰਘ ਜੀ ਨੇ ੬ ਸਾਲ ਦੀ ਉਮਰ ਵਿੱਚ ਸਰਹਿੰਦ ਵਿਖੇ ਅਦੁੱਤੀ ਸ਼ਹਾਦਤ ਦੇ ਕੇ ਖ਼ਾਲਸੇ ਦੀ ਚੜ੍ਹਦੀ ਕਲਾ ਕਾਇਮ ਰੱਖੀ।',
    citations: [
      {
        sourceEn: 'Bhatt Vahi Multani Sindhi & Guru Kian Sakhian',
        sourcePa: 'ਭੱਟ ਵਹੀ ਮੁਲਤਾਨੀ ਸਿੰਧੀ ਅਤੇ ਗੁਰੂ ਕੀਆਂ ਸਾਖੀਆਂ',
        referenceEn: 'Sambat 1755 · Sri Anandpur Sahib Birth Record',
        referencePa: 'ਸੰਮਤ ੧੭੫੫ · ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਜਨਮ ਰਿਕਾਰਡ',
      },
    ],
  },
  {
    id: '2083-shaheedi-bhai-mati-das-sati-das-dayala-ji',
    date: '2026-12-14',
    sambat: 2083,
    category: 'shaheedi',
    subGroups: ['gursikh'],
    titleEn: 'Shaheedi Divas — Bhai Mati Das Ji, Bhai Sati Das Ji & Bhai Dayala Ji',
    titlePa: 'ਸ਼ਹੀਦੀ ਦਿਵਸ — ਭਾਈ ਮਤੀ ਦਾਸ ਜੀ, ਭਾਈ ਸਤੀ ਦਾਸ ਜੀ ਅਤੇ ਭਾਈ ਦਿਆਲਾ ਜੀ',
    shortLabelEn: 'Bhai Mati Das, Sati Das & Dayala Ji',
    shortLabelPa: 'ਭਾਈ ਮਤੀ ਦਾਸ, ਸਤੀ ਦਾਸ, ਦਿਆਲਾ ਜੀ',
    tithiRuleEn: 'Maghar Sudhi 5 (29 Maghar, Sambat 2083 · Chandni Chowk)',
    tithiRulePa: 'ਮੱਘਰ ਸੁਦੀ ੫ (੨੯ ਮੱਘਰ, ਸੰਮਤ ੨੦੮੩ · ਚਾਂਦਨੀ ਚੌਕ)',
    summaryEn:
      'Unmatched martyrdom of Bhai Mati Das Ji (sawn alive reciting Japji Sahib), Bhai Dayala Ji (boiled in a cauldron), and Bhai Sati Das Ji (wrapped in cotton and set aflame) before Sri Guru Tegh Bahadur Sahib Ji in Delhi.',
    summaryPa:
      'ਦਿੱਲੀ ਚਾਂਦਨੀ ਚੌਕ ਵਿਖੇ ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ਼ ਬਹਾਦਰ ਸਾਹਿਬ ਜੀ ਦੇ ਸਾਹਮਣੇ ਭਾਈ ਮਤੀ ਦਾਸ ਜੀ (ਆਰੇ ਨਾਲ ਚੀਰੇ ਗਏ), ਭਾਈ ਦਿਆਲਾ ਜੀ (ਦੇਗ ਵਿੱਚ ਉਬਾਲੇ ਗਏ) ਅਤੇ ਭਾਈ ਸਤੀ ਦਾਸ ਜੀ (ਰੂੰ ਵਿੱਚ ਲਪੇਟ ਕੇ ਸਾੜੇ ਗਏ) ਦੀ ਅਦੁੱਤੀ ਸ਼ਹਾਦਤ।',
    historicalContextEn:
      'In Maghar Sambat 1732 (November 1675 CE), three devoted Sikhs accompanying Ninth Patshah Sri Guru Tegh Bahadur Sahib Ji chose gruesome torture over renouncing their faith at Chandni Chowk, Delhi—immortalized daily in the Khalsa Ardaas.',
    historicalContextPa:
      'ਮੱਘਰ ਸੰਮਤ ੧੭੩੨ ਨੂੰ ਦਿੱਲੀ ਚਾਂਦਨੀ ਚੌਕ ਵਿਖੇ ਨੌਵੇਂ ਪਾਤਸ਼ਾਹ ਜੀ ਦੇ ਨਾਲ ਆਏ ਤਿੰਨ ਪਿਆਰੇ ਸਿੱਖਾਂ ਨੇ ਸੀਸ ਦੇ ਕੇ ਸਿੱਖੀ ਸਿਦਕ ਨਿਭਾਇਆ, ਜਿਨ੍ਹਾਂ ਨੂੰ ਰੋਜ਼ਾਨਾ ਅਰਦਾਸ ਵਿੱਚ ਯਾਦ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।',
    citations: [
      {
        sourceEn: 'Bhatt Vahi Talauda & Sri Gur Pratap Suraj Granth',
        sourcePa: 'ਭੱਟ ਵਹੀ ਤਲੌਡਾ ਅਤੇ ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ',
        referenceEn: 'Raas 12, Ansu 44–52 · Chandni Chowk Martyrs (Sambat 1732)',
        referencePa: 'ਰਾਸਿ ੧੨, ਅੰਸੂ ੪੪–੫੨ · ਚਾਂਦਨੀ ਚੌਕ ਸ਼ਹੀਦੀਆਂ (ਸੰਮਤ ੧੭੩੨)',
      },
    ],
  },
  {
    id: '2083-joti-jot-mata-jito-ji',
    date: '2026-12-20',
    sambat: 2083,
    category: 'khalsa',
    subGroups: ['guru-ghar'],
    titleEn: 'Joti Jot Divas — Mata Jito Ji (Sri Anandpur Sahib)',
    titlePa: 'ਜੋਤੀ ਜੋਤ ਦਿਵਸ — ਮਾਤਾ ਜੀਤੋ ਜੀ (ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ)',
    shortLabelEn: 'Mata Jito Ji Joti Jot',
    shortLabelPa: 'ਮਾਤਾ ਜੀਤੋ ਜੀ ਜੋਤੀ ਜੋਤ',
    tithiRuleEn: '5 Poh, Sambat 2083 (Poh Sudhi 5, Sambat 1757)',
    tithiRulePa: '੫ ਪੋਹ, ਸੰਮਤ ੨੦੮੩ (ਪੋਹ ਸੁਦੀ ੫, ਸੰਮਤ ੧੭੫੭)',
    summaryEn:
      'Passing of Mata Jito Ji (mother of Sahibzade Baba Jujhar Singh Ji, Baba Zorawar Singh Ji & Baba Fateh Singh Ji) at Sri Anandpur Sahib (Agampura).',
    summaryPa:
      'ਸਾਹਿਬਜ਼ਾਦਾ ਬਾਬਾ ਜੁਝਾਰ ਸਿੰਘ ਜੀ, ਬਾਬਾ ਜ਼ੋਰਾਵਰ ਸਿੰਘ ਜੀ ਅਤੇ ਬਾਬਾ ਫ਼ਤਹਿ ਸਿੰਘ ਜੀ ਦੇ ਮਾਤਾ ਸ੍ਰੀ ਮਾਤਾ ਜੀਤੋ ਜੀ ਦਾ ਜੋਤੀ ਜੋਤ ਦਿਵਸ (ਅਗੰਮਪੁਰਾ, ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ)।',
    historicalContextEn:
      'Married to Sri Guru Gobind Singh Ji at Guru Ka Lahore in Sambat 1734, Mata Jito Ji raised the three younger Sahibzade at Sri Anandpur Sahib and merged into the Eternal Light on 5 Poh, Sambat 1757 (December 1700 CE) at Agampura (Gurdwara Mata Jito Ji).',
    historicalContextPa:
      'ਗੁਰੂ ਕਾ ਲਾਹੌਰ ਵਿਖੇ ਦਸਮੇਸ਼ ਪਿਤਾ ਜੀ ਨਾਲ ਵਿਆਹੇ ਗਏ ਮਾਤਾ ਜੀਤੋ ਜੀ ੫ ਪੋਹ ਸੰਮਤ ੧੭੫੭ ਨੂੰ ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ (ਅਗੰਮਪੁਰਾ) ਵਿਖੇ ਜੋਤੀ ਜੋਤ ਸਮਾਏ।',
    citations: [
      {
        sourceEn: 'Bhatt Vahi & Guru Kian Sakhian',
        sourcePa: 'ਭੱਟ ਵਹੀ ਅਤੇ ਗੁਰੂ ਕੀਆਂ ਸਾਖੀਆਂ',
        referenceEn: '5 Poh, Sambat 1757 · Agampura, Sri Anandpur Sahib',
        referencePa: '੫ ਪੋਹ, ਸੰਮਤ ੧੭੫੭ · ਅਗੰਮਪੁਰਾ, ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ',
      },
    ],
  },
  {
    id: '2083-shaheedi-hafta-anandpur-qila-chhodna',
    date: '2026-12-21',
    sambat: 2083,
    category: 'shaheedi',
    subGroups: ['guru-ghar', 'gursikh'],
    titleEn: 'Shaheedi Hafta — Sri Anandpur Sahib Qila Chhodna (6–7 Poh)',
    titlePa: 'ਸ਼ਹੀਦੀ ਹਫ਼ਤਾ — ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਕਿਲ੍ਹਾ ਛੱਡਣਾ (੬–੭ ਪੋਹ)',
    shortLabelEn: 'Anandpur Qila Chhodna',
    shortLabelPa: 'ਅਨੰਦਪੁਰ ਕਿਲ੍ਹਾ ਛੱਡਣਾ',
    tithiRuleEn: '6 Poh, Sambat 2083 (Night of 6–7 Poh, Sambat 1761)',
    tithiRulePa: '੬ ਪੋਹ, ਸੰਮਤ ੨੦੮੩ (੬–੭ ਪੋਹ ਦੀ ਰਾਤ, ਸੰਮਤ ੧੭੬੧)',
    summaryEn:
      'Opening of Shaheedi Hafta: after an eight-month siege, Sri Guru Gobind Singh Ji, the Guru Ghar Parivar, and the Khalsa evacuated Qila Anandgarh on the freezing night of 6–7 Poh, Sambat 1761.',
    summaryPa:
      'ਸ਼ਹੀਦੀ ਹਫ਼ਤੇ ਦਾ ਆਰੰਭ: ਅੱਠ ਮਹੀਨਿਆਂ ਦੇ ਘੇਰੇ ਉਪਰੰਤ ੬–੭ ਪੋਹ ਸੰਮਤ ੧੭੬੧ ਦੀ ਕਾਲੀ-ਬੋਲੀ ਰਾਤ ਨੂੰ ਦਸਮੇਸ਼ ਪਿਤਾ ਜੀ ਨੇ ਪਰਿਵਾਰ ਅਤੇ ਸਿੰਘਾਂ ਸਮੇਤ ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਦਾ ਕਿਲ੍ਹਾ ਛੱਡਿਆ।',
    historicalContextEn:
      'Following solemn written oaths on the Quran and cow by Mughal commanders and hill rajas—which were immediately betrayed—Sri Guru Gobind Singh Ji evacuated Sri Anandpur Sahib on the stormy winter night of 6–7 Poh, Sambat 1761 (December 1704 CE), inaugurating the most sacrificial week in Sikh history.',
    historicalContextPa:
      'ਮੁਗ਼ਲਾਂ ਅਤੇ ਪਹਾੜੀ ਰਾਜਿਆਂ ਦੀਆਂ ਝੂਠੀਆਂ ਕਸਮਾਂ ਉਪਰੰਤ ੬–੭ ਪੋਹ ਸੰਮਤ ੧੭੬੧ ਦੀ ਠੰਡੀ ਰਾਤ ਨੂੰ ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਦਾ ਕਿਲ੍ਹਾ ਛੱਡਿਆ ਗਿਆ, ਜਿੱਥੋਂ ਸਿੱਖ ਇਤਿਹਾਸ ਦਾ ਸ਼ਹੀਦੀ ਹਫ਼ਤਾ ਆਰੰਭ ਹੋਇਆ।',
    citations: [
      {
        sourceEn: 'Bhatt Vahi Talauda & Prachin Panth Prakash',
        sourcePa: 'ਭੱਟ ਵਹੀ ਤਲੌਡਾ ਅਤੇ ਪ੍ਰਾਚੀਨ ਪੰਥ ਪ੍ਰਕਾਸ਼',
        referenceEn: '6–7 Poh, Sambat 1761 · Evacuation of Qila Anandgarh',
        referencePa: '੬–੭ ਪੋਹ, ਸੰਮਤ ੧੭੬੧ · ਕਿਲ੍ਹਾ ਅਨੰਦਗੜ੍ਹ ਛੱਡਣ ਦਾ ਪ੍ਰਸੰਗ',
      },
    ],
  },
  {
    id: '2083-shaheedi-hafta-sarsa-nadi-uday-bachittar-singh',
    date: '2026-12-22',
    sambat: 2083,
    category: 'shaheedi',
    subGroups: ['guru-ghar', 'gursikh'],
    titleEn: 'Shaheedi Hafta — Sarsa Nadi Vichhora, Bhai Uday Singh Ji & Bhai Bachittar Singh Ji',
    titlePa: 'ਸ਼ਹੀਦੀ ਹਫ਼ਤਾ — ਸਰਸਾ ਨਦੀ ਵਿਛੋੜਾ, ਭਾਈ ਉਦੈ ਸਿੰਘ ਜੀ ਅਤੇ ਭਾਈ ਬਚਿੱਤਰ ਸਿੰਘ ਜੀ',
    shortLabelEn: 'Sarsa Nadi & Bhai Uday/Bachittar Singh',
    shortLabelPa: 'ਸਰਸਾ ਵਿਛੋੜਾ · ਭਾਈ ਉਦੈ/ਬਚਿੱਤਰ ਸਿੰਘ',
    tithiRuleEn: '7 Poh, Sambat 2083 (Parivar Vichhora & Shahi Tibbi)',
    tithiRulePa: '੭ ਪੋਹ, ਸੰਮਤ ੨੦੮੩ (ਪਰਿਵਾਰ ਵਿਛੋੜਾ ਅਤੇ ਸ਼ਾਹੀ ਟਿੱਬੀ)',
    summaryEn:
      'Separation of Guru Gobind Singh Ji’s family at the flooded Sarsa River (Parivar Vichhora), Asa Di Vaar amid battle, and the legendary martyrdom of Bhai Uday Singh Ji (Shahi Tibbi) and Bhai Bachittar Singh Ji (Malikpur/Kotla Nihang).',
    summaryPa:
      'ਚੜ੍ਹੀ ਹੋਈ ਸਰਸਾ ਨਦੀ ਕੰਢੇ ਪਰਿਵਾਰ ਵਿਛੋੜਾ, ਜੰਗ ਵਿੱਚ ਆਸਾ ਦੀ ਵਾਰ ਦਾ ਕੀਰਤਨ, ਅਤੇ ਸ਼ਾਹੀ ਟਿੱਬੀ ’ਤੇ ਭਾਈ ਉਦੈ ਸਿੰਘ ਜੀ ਤੇ ਕੋਟਲਾ ਨਿਹੰਗ ਵਿਖੇ ਭਾਈ ਬਚਿੱਤਰ ਸਿੰਘ ਜੀ ਦੀ ਮਹਾਨ ਸ਼ਹਾਦਤ।',
    historicalContextEn:
      'At dawn on 7 Poh, Sambat 1761 (December 1704 CE), imperial armies broke their oaths and attacked at the swollen Sarsa rivulet. Bhai Uday Singh Ji held back thousands at Shahi Tibbi with 50 Singhs, while Bhai Bachittar Singh Ji (hero of Lohgarh who pierced the armored war-elephant with his Nagni Barchha) fought fiercely at Malikpur before attaining martyrdom at Kotla Nihang Khan.',
    historicalContextPa:
      '੭ ਪੋਹ ਸੰਮਤ ੧੭੬੧ ਨੂੰ ਅੰਮ੍ਰਿਤ ਵੇਲੇ ਸਰਸਾ ਕੰਢੇ ਦੁਸ਼ਮਣ ਨੇ ਝੂਠੀਆਂ ਕਸਮਾਂ ਤੋੜ ਕੇ ਹਮਲਾ ਕੀਤਾ। ਸ਼ਾਹੀ ਟਿੱਬੀ ’ਤੇ ਭਾਈ ਉਦੈ ਸਿੰਘ ਜੀ ਨੇ ੫੦ ਸਿੰਘਾਂ ਨਾਲ ਹਜ਼ਾਰਾਂ ਦੀ ਫ਼ੌਜ ਨੂੰ ਰੋਕਿਆ ਅਤੇ ਲੋਹਗੜ੍ਹ ਦੇ ਸੂਰਮੇ ਭਾਈ ਬਚਿੱਤਰ ਸਿੰਘ ਜੀ ਨੇ ਮਲਿਕਪੁਰ ਜੰਗ ਵਿੱਚ ਬਹਾਦਰੀ ਦਿਖਾਉਂਦੇ ਹੋਏ ਕੋਟਲਾ ਨਿਹੰਗ ਵਿਖੇ ਸ਼ਹੀਦੀ ਪਾਈ।',
    citations: [
      {
        sourceEn: 'Bhatt Vahi Multani Sindhi & Sri Gur Pratap Suraj Granth',
        sourcePa: 'ਭੱਟ ਵਹੀ ਮੁਲਤਾਨੀ ਸਿੰਧੀ ਅਤੇ ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ',
        referenceEn: 'Ayan 2, Ansu 1–12 · Sarsa Nadi, Shahi Tibbi & Kotla Nihang (7 Poh 1761)',
        referencePa: 'ਅਯਨ ੨, ਅੰਸੂ ੧–੧੨ · ਸਰਸਾ ਨਦੀ, ਸ਼ਾਹੀ ਟਿੱਬੀ ਅਤੇ ਕੋਟਲਾ ਨਿਹੰਗ (੭ ਪੋਹ ੧੭੬੧)',
      },
    ],
  },
  {
    id: '2083-shaheedi-panj-pyare-chamkaur',
    date: '2026-12-23',
    sambat: 2083,
    category: 'shaheedi',
    subGroups: ['gursikh'],
    titleEn: 'Shaheedi Divas — Three Panj Pyare (Bhai Himmat Singh, Bhai Mohkam Singh & Bhai Sahib Singh Ji)',
    titlePa: 'ਸ਼ਹੀਦੀ ਦਿਵਸ — ਤਿੰਨ ਪੰਜ ਪਿਆਰੇ (ਭਾਈ ਹਿੰਮਤ ਸਿੰਘ, ਭਾਈ ਮੋਹਕਮ ਸਿੰਘ ਅਤੇ ਭਾਈ ਸਾਹਿਬ ਸਿੰਘ ਜੀ)',
    shortLabelEn: 'Three Panj Pyare (Chamkaur)',
    shortLabelPa: 'ਤਿੰਨ ਪੰਜ ਪਿਆਰੇ (ਚਮਕੌਰ)',
    tithiRuleEn: '8 Poh, Sambat 2083 (Battle of Sri Chamkaur Sahib)',
    tithiRulePa: '੮ ਪੋਹ, ਸੰਮਤ ੨੦੮੩ (ਜੰਗ ਸ੍ਰੀ ਚਮਕੌਰ ਸਾਹਿਬ)',
    summaryEn:
      'Supreme martyrdom of three of the original Panj Pyare—Bhai Himmat Singh Ji (Jagannath Puri), Bhai Mohkam Singh Ji (Dwarka), and Bhai Sahib Singh Ji (Bidar)—alongside the Vadde Sahibzade and 40 Singhs at Garhi Chamkaur.',
    summaryPa:
      'ਸ੍ਰੀ ਚਮਕੌਰ ਸਾਹਿਬ ਦੀ ਕੱਚੀ ਗੜ੍ਹੀ ਵਿੱਚ ਵੱਡੇ ਸਾਹਿਬਜ਼ਾਦਿਆਂ ਨਾਲ ਤਿੰਨ ਪੰਜ ਪਿਆਰਿਆਂ—ਭਾਈ ਹਿੰਮਤ ਸਿੰਘ ਜੀ, ਭਾਈ ਮੋਹਕਮ ਸਿੰਘ ਜੀ ਅਤੇ ਭਾਈ ਸਾਹਿਬ ਸਿੰਘ ਜੀ—ਦੀ ਅਦੁੱਤੀ ਸ਼ਹਾਦਤ।',
    historicalContextEn:
      'On 8 Poh, Sambat 1761 (December 1704 CE), Bhai Himmat Singh Ji, Bhai Mohkam Singh Ji, and Bhai Sahib Singh Ji—who had offered their heads at Vaisakhi 1699—fulfilled their vow on the battlefield of Chamkaur Sahib, while Bhai Daya Singh Ji and Bhai Dharam Singh Ji accompanied Dashmesh Pita under the Panj Pyare Hukam.',
    historicalContextPa:
      '੮ ਪੋਹ ਸੰਮਤ ੧੭੬੧ ਨੂੰ ੧੬੯੯ ਦੀ ਵੈਸਾਖੀ ਦੇ ਤਿੰਨ ਪੰਜ ਪਿਆਰਿਆਂ—ਭਾਈ ਹਿੰਮਤ ਸਿੰਘ ਜੀ, ਭਾਈ ਮੋਹਕਮ ਸਿੰਘ ਜੀ ਅਤੇ ਭਾਈ ਸਾਹਿਬ ਸਿੰਘ ਜੀ—ਨੇ ਚਮਕੌਰ ਦੀ ਜੰਗ ਵਿੱਚ ਆਪਣਾ ਪ੍ਰਣ ਨਿਭਾਉਂਦਿਆਂ ਸ਼ਹੀਦੀ ਪ੍ਰਾਪਤ ਕੀਤੀ।',
    citations: [
      {
        sourceEn: 'Bhatt Vahi Talauda & Prachin Panth Prakash',
        sourcePa: 'ਭੱਟ ਵਹੀ ਤਲੌਡਾ ਅਤੇ ਪ੍ਰਾਚੀਨ ਪੰਥ ਪ੍ਰਕਾਸ਼',
        referenceEn: '8 Poh, Sambat 1761 · Garhi Sri Chamkaur Sahib Martyrs',
        referencePa: '੮ ਪੋਹ, ਸੰਮਤ ੧੭੬੧ · ਗੜ੍ਹੀ ਸ੍ਰੀ ਚਮਕੌਰ ਸਾਹਿਬ ਦੇ ਸ਼ਹੀਦ',
      },
    ],
  },
  {
    id: '2083-bhagat-ramanand-ji',
    date: '2027-01-29',
    sambat: 2083,
    category: 'khalsa',
    subGroups: ['bhagat-bhatt'],
    titleEn: 'Parkash Purab — Bhagat Ramanand Ji (SGGS Ang 1195)',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਭਗਤ ਰਾਮਾਨੰਦ ਜੀ (ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਅੰਗ ੧੧੯੫)',
    shortLabelEn: 'Bhagat Ramanand Ji',
    shortLabelPa: 'ਭਗਤ ਰਾਮਾਨੰਦ ਜੀ',
    tithiRuleEn: 'Magh Vadhi 7 (16 Magh, Sambat 2083 · Traditional)',
    tithiRulePa: 'ਮਾਘ ਵਦੀ ੭ (੧੬ ਮਾਘ, ਸੰਮਤ ੨੦੮੩ · ਪਰੰਪਰਿਕ)',
    summaryEn:
      'Traditional Magh Vadhi 7 observance of Bhagat Ramanand Ji, whose sublime Raag Basant Shabad ("Kat jaaeeai re ghar laago rang") graces Ang 1195 of Sri Guru Granth Sahib Ji.',
    summaryPa:
      'ਭਗਤ ਰਾਮਾਨੰਦ ਜੀ ਦਾ ਪਰੰਪਰਿਕ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੇ ਅੰਗ ੧੧੯੫ (ਰਾਗ ਬਸੰਤ) ’ਤੇ ਆਪ ਜੀ ਦਾ ਪਾਵਨ ਸ਼ਬਦ ਦਰਜ ਹੈ।',
    historicalContextEn:
      'Bhagat Ramanand Ji rejected outward ritual pilgrimage in favor of realizing the All-Pervading Lord within the heart ("My Guru showed me Brahman within my own home"). Note per Mahan Kosh: Magh Vadhi 7 is the traditional Jayanti, while medieval manuscripts preserve varying birth years.',
    historicalContextPa:
      'ਭਗਤ ਰਾਮਾਨੰਦ ਜੀ ਨੇ ਬਾਹਰੀ ਕਰਮ-ਕਾਂਡਾਂ ਨੂੰ ਤਿਆਗ ਕੇ ਹਿਰਦੇ ਵਿੱਚ ਵੱਸਦੇ ਸਰਬ-ਵਿਆਪਕ ਪਰਮਾਤਮਾ ਦੀ ਭਗਤੀ ਦਾ ਉਪਦੇਸ਼ ਦਿੱਤਾ (ਅੰਗ ੧੧੯੫)। ਮਹਾਨ ਕੋਸ਼ ਅਨੁਸਾਰ ਮਾਘ ਵਦੀ ੭ ਪਰੰਪਰਿਕ ਜਨਮ ਤਿਥੀ ਹੈ।',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ',
        referenceEn: 'Ang 1195 · Raag Basant, Bhagat Ramanand Ji',
        referencePa: 'ਅੰਗ ੧੧੯੫ · ਰਾਗ ਬਸੰਤ, ਭਗਤ ਰਾਮਾਨੰਦ ਜੀ',
        excerptPa: 'ਕਤ ਜਾਈਐ ਰੇ ਘਰ ਲਾਗੋ ਰੰਗੁ ॥ ਮੇਰਾ ਚਿਤੁ ਨ ਚਲੈ ਮਨੁ ਭਇਓ ਪੰਗੁ ॥੧॥ ਰਹਾਉ ॥',
        excerptTranslit: 'Kat jaaeeai re ghar laago rang, meraa chit na chalai man bhaio pang.',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=1195',
        pothiLabelEn: 'Read Bhagat Ramanand Ji Shabad (Ang 1195)',
        pothiLabelPa: 'ਪੋਥੀ ਸਾਹਿਬ ’ਤੇ ਭਗਤ ਰਾਮਾਨੰਦ ਜੀ ਸ਼ਬਦ (ਅੰਗ ੧੧੯੫) ਪੜ੍ਹੋ',
      },
    ],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=1195',
    pothiLabelEn: 'Read Bhagat Ramanand Ji Bani (Ang 1195)',
    pothiLabelPa: 'ਭਗਤ ਰਾਮਾਨੰਦ ਜੀ ਬਾਣੀ (ਅੰਗ ੧੧੯੫) ਪੜ੍ਹੋ',
  },
  {
    id: '2083-janam-bibi-bhani-ji',
    date: '2027-02-03',
    sambat: 2083,
    category: 'khalsa',
    subGroups: ['guru-ghar'],
    titleEn: 'Janam Divas — Mata / Bibi Bhani Ji (Guru Amar Das Ji & Guru Ram Das Ji Parivar)',
    titlePa: 'ਜਨਮ ਦਿਵਸ — ਮਾਤਾ / ਬੀਬੀ ਭਾਨੀ ਜੀ (ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ ਅਤੇ ਗੁਰੂ ਰਾਮਦਾਸ ਜੀ ਪਰਿਵਾਰ)',
    shortLabelEn: 'Bibi Bhani Ji Janam',
    shortLabelPa: 'ਬੀਬੀ ਭਾਨੀ ਜੀ ਜਨਮ',
    tithiRuleEn: 'Magh Vadhi 12 (21 Magh, Sambat 2083 · Mahan Kosh)',
    tithiRulePa: 'ਮਾਘ ਵਦੀ ੧੨ (੨੧ ਮਾਘ, ਸੰਮਤ ੨੦੮੩ · ਮਹਾਨ ਕੋਸ਼)',
    summaryEn:
      'Birth anniversary of Bibi Bhani Ji (daughter of Guru Amar Das Ji, consort of Guru Ram Das Ji, and mother of Guru Arjan Dev Ji), paragon of selfless seva at Goindwal Sahib.',
    summaryPa:
      'ਤੀਸਰੇ ਪਾਤਸ਼ਾਹ ਸ੍ਰੀ ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ ਦੀ ਸਪੁੱਤਰੀ, ਗੁਰੂ ਰਾਮਦਾਸ ਜੀ ਦੇ ਮਹਿਲ ਅਤੇ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਦੇ ਮਾਤਾ ਬੀਬੀ ਭਾਨੀ ਜੀ ਦਾ ਜਨਮ ਦਿਵਸ।',
    historicalContextEn:
      'Born on Magh Vadhi 12, Sambat 1591 (1535 CE) at Basarke to Sri Guru Amar Das Ji and Mata Mansa Devi Ji, Bibi Bhani Ji exemplified unwavering filial seva at Goindwal Sahib and bridged the Sodhi Guru Ghar lineage from Fourth Patshah through Tenth Patshah.',
    historicalContextPa:
      'ਮਾਘ ਵਦੀ ੧੨, ਸੰਮਤ ੧੫੯੧ ਨੂੰ ਬਾਸਰਕੇ ਵਿਖੇ ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ ਅਤੇ ਮਾਤਾ ਮਨਸਾ ਦੇਵੀ ਜੀ ਦੇ ਗ੍ਰਹਿ ਵਿਖੇ ਜਨਮੇ ਬੀਬੀ ਭਾਨੀ ਜੀ ਨਿਸ਼ਕਾਮ ਸੇਵਾ ਅਤੇ ਗੁਰੂ ਘਰ ਦੀ ਮਹਾਨ ਮਰਯਾਦਾ ਦੇ ਪ੍ਰਤੀਕ ਸਨ।',
    citations: [
      {
        sourceEn: 'Mahan Kosh & Sri Gur Pratap Suraj Granth',
        sourcePa: 'ਮਹਾਨ ਕੋਸ਼ ਅਤੇ ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ',
        referenceEn: 'Raas 1 · Bibi Bhani Ji Seva at Goindwal (Magh Vadhi 12, 1591)',
        referencePa: 'ਰਾਸਿ ੧ · ਗੋਇੰਦਵਾਲ ਵਿਖੇ ਬੀਬੀ ਭਾਨੀ ਜੀ ਦੀ ਸੇਵਾ (ਮਾਘ ਵਦੀ ੧੨, ੧੫੯੧)',
      },
    ],
  },
  {
    id: '2083-delhi-fateh-baba-baghel-singh-jassa-singh-ahluwalia',
    date: '2027-03-12',
    sambat: 2083,
    category: 'khalsa',
    subGroups: ['gursikh'],
    titleEn: 'Delhi Fateh Divas — Baba Baghel Singh Ji & Sultan-ul-Qaum Sardar Jassa Singh Ahluwalia',
    titlePa: 'ਦਿੱਲੀ ਫ਼ਤਹਿ ਦਿਵਸ — ਬਾਬਾ ਬਘੇਲ ਸਿੰਘ ਜੀ ਅਤੇ ਸੁਲਤਾਨ-ਉਲ-ਕੌਮ ਸਰਦਾਰ ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ',
    shortLabelEn: 'Delhi Fateh (1783)',
    shortLabelPa: 'ਦਿੱਲੀ ਫ਼ਤਹਿ (੧੭੮੩)',
    tithiRuleEn: '28 Phagun, Sambat 2083 (11 March 1783 / Sambat 1839)',
    tithiRulePa: '੨੮ ਫੱਗਣ, ਸੰਮਤ ੨੦੮੩ (੧੧ ਮਾਰਚ ੧੭੮੩ / ਸੰਮਤ ੧੮੩੯)',
    summaryEn:
      'Khalsa conquest of the Red Fort in Delhi (Sambat 1839) led by Baba Baghel Singh Ji, Sardar Jassa Singh Ahluwalia, and Sardar Jassa Singh Ramgarhia, establishing historic Delhi Gurdwaras.',
    summaryPa:
      'ਬਾਬਾ ਬਘੇਲ ਸਿੰਘ ਜੀ, ਸਰਦਾਰ ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ ਅਤੇ ਸਰਦਾਰ ਜੱਸਾ ਸਿੰਘ ਰਾਮਗੜ੍ਹੀਆ ਦੀ ਅਗਵਾਈ ਵਿੱਚ ਦਿੱਲੀ ਲਾਲ ਕਿਲ੍ਹੇ ’ਤੇ ਖ਼ਾਲਸਾਈ ਨਿਸ਼ਾਨ ਝੁਲਾਉਣ ਅਤੇ ਇਤਿਹਾਸਕ ਗੁਰਦੁਆਰਿਆਂ ਦੀ ਸਥਾਪਨਾ ਦਾ ਦਿਹਾੜਾ।',
    historicalContextEn:
      'On 28 Phagun, Sambat 1839 (11 March 1783 CE), 30,000 Dal Khalsa horsemen entered Delhi and hoisted the Nishan Sahib atop the Red Fort. Baba Baghel Singh Ji remained in Delhi to locate and construct Gurdwara Sis Ganj Sahib, Rakab Ganj Sahib, Bangla Sahib, Bala Sahib, Moti Bagh, Majnu Ka Tilla, and Mata Sundri Sahib.',
    historicalContextPa:
      '੨੮ ਫੱਗਣ ਸੰਮਤ ੧੮੩੯ ਨੂੰ ਦਲ ਖ਼ਾਲਸਾ ਨੇ ਦਿੱਲੀ ਲਾਲ ਕਿਲ੍ਹੇ ’ਤੇ ਖ਼ਾਲਸਾਈ ਝੰਡਾ ਝੁਲਾਇਆ ਅਤੇ ਬਾਬਾ ਬਘੇਲ ਸਿੰਘ ਜੀ ਨੇ ਸ੍ਰੀ ਸੀਸ ਗੰਜ ਸਾਹਿਬ, ਰਕਾਬ ਗੰਜ ਸਾਹਿਬ, ਬੰਗਲਾ ਸਾਹਿਬ ਸਮੇਤ ਦਿੱਲੀ ਦੇ ਇਤਿਹਾਸਕ ਗੁਰਦੁਆਰਿਆਂ ਦੀ ਸੇਵਾ ਕਰਵਾਈ।',
    citations: [
      {
        sourceEn: 'Prachin Panth Prakash (Bhai Rattan Singh Bhangu)',
        sourcePa: 'ਪ੍ਰਾਚੀਨ ਪੰਥ ਪ੍ਰਕਾਸ਼ (ਭਾਈ ਰਤਨ ਸਿੰਘ ਭੰਗੂ)',
        referenceEn: 'Delhi Fateh & Gurdwara Seva · Phagun Sambat 1839',
        referencePa: 'ਦਿੱਲੀ ਫ਼ਤਹਿ ਅਤੇ ਗੁਰਦੁਆਰਾ ਸੇਵਾ ਪ੍ਰਸੰਗ · ਫੱਗਣ ਸੰਮਤ ੧੮੩੯',
      },
    ],
  },

  // =========================================================================
  // SAMBAT 2084 (Chet – Phagun, Mar 2027 – Mar 2028)
  // =========================================================================
  {
    id: '2084-shaheedi-akali-baba-phula-singh-ji',
    date: '2027-03-15',
    sambat: 2084,
    category: 'shaheedi',
    subGroups: ['gursikh'],
    titleEn: 'Shaheedi Divas — Jathedar Akali Baba Phula Singh Ji (Battle of Naushehra)',
    titlePa: 'ਸ਼ਹੀਦੀ ਦਿਵਸ — ਜਥੇਦਾਰ ਅਕਾਲੀ ਬਾਬਾ ਫੂਲਾ ਸਿੰਘ ਜੀ (ਜੰਗ ਨੌਸ਼ਹਿਰਾ)',
    shortLabelEn: 'Akali Baba Phula Singh Ji',
    shortLabelPa: 'ਅਕਾਲੀ ਬਾਬਾ ਫੂਲਾ ਸਿੰਘ ਜੀ',
    tithiRuleEn: '1 Chet, Sambat 2084 (1 Chet, Sambat 1879)',
    tithiRulePa: '੧ ਚੇਤ, ਸੰਮਤ ੨੦੮੪ (੧ ਚੇਤ, ਸੰਮਤ ੧੮੭੯)',
    summaryEn:
      'Martyrdom of Jathedar of Sri Akal Takht Sahib and Budha Dal, Akali Baba Phula Singh Ji Nihung, leading the victorious Khalsa charge at the Battle of Naushehra (1823 CE).',
    summaryPa:
      'ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਅਤੇ ਸ਼੍ਰੋਮਣੀ ਪੰਥ ਅਕਾਲੀ ਬੁੱਢਾ ਦਲ ਦੇ ਜਥੇਦਾਰ ਅਕਾਲੀ ਬਾਬਾ ਫੂਲਾ ਸਿੰਘ ਜੀ ਨਿਹੰਗ ਦੀ ਨੌਸ਼ਹਿਰੇ ਦੀ ਜੰਗ (੧ ਚੇਤ, ਸੰਮਤ ੧੮੭੯) ਵਿੱਚ ਮਹਾਨ ਸ਼ਹਾਦਤ।',
    historicalContextEn:
      'Fearless custodian of Sri Akal Takht Sahib who once summoned Maharaja Ranjit Singh himself to accept tankhah for upholding Panthic Maryada, Akali Baba Phula Singh Ji led the Akali Nihung charge at Naushehra on 1 Chet, Sambat 1879 (14 March 1823 CE), securing decisive victory for the Khalsa Raj before attaining martyrdom.',
    historicalContextPa:
      'ਪੰਥਕ ਮਰਯਾਦਾ ਦੇ ਅਟੱਲ ਪਹਿਰੇਦਾਰ ਜਥੇਦਾਰ ਅਕਾਲੀ ਬਾਬਾ ਫੂਲਾ ਸਿੰਘ ਜੀ ਨੇ ੧ ਚੇਤ ਸੰਮਤ ੧੮੭੯ ਨੂੰ ਨੌਸ਼ਹਿਰੇ ਦੇ ਮੈਦਾਨ ਵਿੱਚ ਅਕਾਲੀ ਨਿਹੰਗ ਫ਼ੌਜ ਦੀ ਅਗਵਾਈ ਕਰਦਿਆਂ ਖ਼ਾਲਸਾ ਰਾਜ ਨੂੰ ਸ਼ਾਨਦਾਰ ਜਿੱਤ ਦਿਵਾਈ ਅਤੇ ਸ਼ਹਾਦਤ ਪ੍ਰਾਪਤ ਕੀਤੀ।',
    citations: [
      {
        sourceEn: 'Mahan Kosh & Panth Prakash (Giani Gian Singh)',
        sourcePa: 'ਮਹਾਨ ਕੋਸ਼ ਅਤੇ ਪੰਥ ਪ੍ਰਕਾਸ਼ (ਗਿਆਨੀ ਗਿਆਨ ਸਿੰਘ)',
        referenceEn: 'Entry: Phula Singh Akali · Battle of Naushehra, 1 Chet 1879',
        referencePa: 'ਇੰਦਰਾਜ: ਅਕਾਲੀ ਫੂਲਾ ਸਿੰਘ · ਜੰਗ ਨੌਸ਼ਹਿਰਾ, ੧ ਚੇਤ ੧੮੭੯',
      },
    ],
  },
  {
    id: '2084-solar-parkash-guru-tegh-bahadur-ji',
    date: '2027-04-08',
    sambat: 2084,
    category: 'gurpurab',
    subGroups: ['guru-ghar'],
    titleEn: 'Solar Parkash Date — Sri Guru Tegh Bahadur Sahib Ji (25 Chet · Guru Hargobind Sahib Parivar)',
    titlePa: 'ਸੂਰਜੀ ਪ੍ਰਕਾਸ਼ ਮਿਤੀ — ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ਼ ਬਹਾਦਰ ਸਾਹਿਬ ਜੀ (੨੫ ਚੇਤ · ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਪਰਿਵਾਰ)',
    shortLabelEn: '25 Chet · Guru Tegh Bahadur Ji',
    shortLabelPa: '੨੫ ਚੇਤ · ਗੁਰੂ ਤੇਗ਼ ਬਹਾਦਰ ਜੀ',
    tithiRuleEn: '25 Chet, Sambat 2084 (Solar Date · Lunar Vaisakh Vadhi 5 on 25 Apr)',
    tithiRulePa: '੨੫ ਚੇਤ, ਸੰਮਤ ੨੦੮੪ (ਸੂਰਜੀ ਮਿਤੀ · ਚੰਦਰ ਵੈਸਾਖ ਵਦੀ ੫ — ੨੫ ਅਪ੍ਰੈਲ)',
    summaryEn:
      'Puratan solar Parkash date (25 Chet, Sambat 1678) of Ninth Patshah Sri Guru Tegh Bahadur Sahib Ji (youngest Sahibzada of Sri Guru Hargobind Sahib Ji & Mata Nanaki Ji) at Guru Ke Mahal, Sri Amritsar Sahib.',
    summaryPa:
      'ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਅਤੇ ਮਾਤਾ ਨਾਨਕੀ ਜੀ ਦੇ ਸਪੁੱਤਰ ਨੌਵੇਂ ਪਾਤਸ਼ਾਹ ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ਼ ਬਹਾਦਰ ਸਾਹਿਬ ਜੀ ਦੀ ਪੁਰਾਤਨ ਸੂਰਜੀ ਪ੍ਰਕਾਸ਼ ਮਿਤੀ (੨੫ ਚੇਤ, ਸੰਮਤ ੧੬੭੮)।',
    historicalContextEn:
      'Bhatt Vahis record the birth of Tyag Mal (Sri Guru Tegh Bahadur Sahib Ji) at Guru Ke Mahal, Sri Amritsar Sahib on Vaisakh Vadhi 5 / 25 Chet, Sambat 1678 (1621 CE). The primary lunar Gurpurab is also marked in Sambat 2084 on Vaisakh Vadhi 5 (25 April 2027).',
    historicalContextPa:
      'ਭੱਟ ਵਹੀਆਂ ਅਨੁਸਾਰ ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ਼ ਬਹਾਦਰ ਸਾਹਿਬ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਸ੍ਰੀ ਅੰਮ੍ਰਿਤਸਰ ਸਾਹਿਬ (ਗੁਰੂ ਕੇ ਮਹਿਲ) ਵਿਖੇ ਵੈਸਾਖ ਵਦੀ ੫ (੨੫ ਚੇਤ), ਸੰਮਤ ੧੬੭੮ ਨੂੰ ਹੋਇਆ। ਸੰਮਤ ੨੦੮੪ ਵਿੱਚ ਚੰਦਰ ਤਿਥੀ ਵੈਸਾਖ ਵਦੀ ੫ — ੨੫ ਅਪ੍ਰੈਲ ੨੦੨੭ ਨੂੰ ਆਉਂਦੀ ਹੈ।',
    citations: [
      {
        sourceEn: 'Bhatt Vahi Talauda',
        sourcePa: 'ਭੱਟ ਵਹੀ ਤਲੌਡਾ',
        referenceEn: 'Vaisakh Vadhi 5 / 25 Chet, Sambat 1678 · Guru Ke Mahal, Amritsar',
        referencePa: 'ਵੈਸਾਖ ਵਦੀ ੫ / ੨੫ ਚੇਤ, ਸੰਮਤ ੧੬੭੮ · ਗੁਰੂ ਕੇ ਮਹਿਲ, ਅੰਮ੍ਰਿਤਸਰ',
      },
    ],
  },
  {
    id: '2084-parkash-guru-arjan-dev-ji-guru-ram-das-parivar',
    date: '2027-04-10',
    sambat: 2084,
    category: 'gurpurab',
    subGroups: ['guru-ghar'],
    titleEn: 'Parkash Purab — Sri Guru Arjan Dev Ji (27 Chet · Guru Ram Das Ji Parivar)',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ (੨੭ ਚੇਤ · ਗੁਰੂ ਰਾਮਦਾਸ ਜੀ ਪਰਿਵਾਰ)',
    shortLabelEn: 'Parkash Guru Arjan Dev Ji',
    shortLabelPa: 'ਪ੍ਰਕਾਸ਼ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ',
    tithiRuleEn: '27 Chet, Sambat 2084 (Vaisakh Vadhi 7, Sambat 1620)',
    tithiRulePa: '੨੭ ਚੇਤ, ਸੰਮਤ ੨੦੮੪ (ਵੈਸਾਖ ਵਦੀ ੭, ਸੰਮਤ ੧੬੨੦)',
    summaryEn:
      'Parkash Purab of Fifth Patshah Sri Guru Arjan Dev Ji at Goindwal Sahib, youngest of Sri Guru Ram Das Ji and Bibi Bhani Ji’s three sons (alongside elder brothers Baba Prithi Chand and Baba Mahadev).',
    summaryPa:
      'ਗੋਇੰਦਵਾਲ ਸਾਹਿਬ ਵਿਖੇ ਗੁਰੂ ਰਾਮਦਾਸ ਜੀ ਅਤੇ ਮਾਤਾ ਭਾਨੀ ਜੀ ਦੇ ਗ੍ਰਹਿ (ਬਾਬਾ ਪ੍ਰਿਥੀ ਚੰਦ ਅਤੇ ਬਾਬਾ ਮਹਾਂਦੇਵ ਜੀ ਦੇ ਛੋਟੇ ਭਰਾਤਾ) ਪੰਜਵੇਂ ਪਾਤਸ਼ਾਹ ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ।',
    historicalContextEn:
      'Born at Goindwal Sahib on Vaisakh Vadhi 7 / 27 Chet, Sambat 1620 (1563 CE), Sri Guru Arjan Dev Ji was the youngest of Sri Guru Ram Das Ji and Mata Bhani Ji’s three sons (Baba Prithi Chand, Baba Mahadev, and Guru Arjan Dev Ji). Blessed by maternal grandfather Sri Guru Amar Das Ji as "Dohita Bani Ka Bohitha," He compiled the Adi Sri Guru Granth Sahib Ji and built Sri Harmandir Sahib.',
    historicalContextPa:
      'ਵੈਸਾਖ ਵਦੀ ੭ (੨੭ ਚੇਤ), ਸੰਮਤ ੧੬੨੦ ਨੂੰ ਗੋਇੰਦਵਾਲ ਸਾਹਿਬ ਵਿਖੇ ਗੁਰੂ ਰਾਮਦਾਸ ਜੀ ਅਤੇ ਬੀਬੀ ਭਾਨੀ ਜੀ ਦੇ ਗ੍ਰਹਿ ਪ੍ਰਕਾਸ਼ ਧਾਰਨ ਵਾਲੇ ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ (ਬਾਬਾ ਪ੍ਰਿਥੀ ਚੰਦ ਅਤੇ ਬਾਬਾ ਮਹਾਂਦੇਵ ਜੀ ਦੇ ਛੋਟੇ ਭਰਾਤਾ) ਨੂੰ ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ ਨੇ ‘ਦੋਹਿਤਾ ਬਾਣੀ ਕਾ ਬੋਹਿਥਾ’ ਦਾ ਵਰ ਦਿੱਤਾ।',
    citations: [
      {
        sourceEn: 'Sri Gur Pratap Suraj Granth & Mahan Kosh',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ ਅਤੇ ਮਹਾਨ ਕੋਸ਼',
        referenceEn: 'Raas 2 · Birth of Sri Guru Arjan Dev Ji (Vaisakh Vadhi 7, 1620)',
        referencePa: 'ਰਾਸਿ ੨ · ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਪ੍ਰਕਾਸ਼ (ਵੈਸਾਖ ਵਦੀ ੭, ੧੬੨੦)',
      },
    ],
  },
  {
    id: '2084-janam-sahibzada-baba-jujhar-singh-ji',
    date: '2027-04-10',
    sambat: 2084,
    category: 'gurpurab',
    subGroups: ['guru-ghar'],
    titleEn: 'Parkash Purab — Sahibzada Baba Jujhar Singh Ji',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸਾਹਿਬਜ਼ਾਦਾ ਬਾਬਾ ਜੁਝਾਰ ਸਿੰਘ ਜੀ',
    shortLabelEn: 'Baba Jujhar Singh Ji Janam',
    shortLabelPa: 'ਬਾਬਾ ਜੁਝਾਰ ਸਿੰਘ ਜੀ ਜਨਮ',
    tithiRuleEn: '27 Chet, Sambat 2084 (Chet / Vaisakh Sambat 1748)',
    tithiRulePa: '੨੭ ਚੇਤ, ਸੰਮਤ ੨੦੮੪ (ਚੇਤ / ਵੈਸਾਖ ਸੰਮਤ ੧੭੪੮)',
    summaryEn:
      'Birth anniversary of second Sahibzada Baba Jujhar Singh Ji at Sri Anandpur Sahib (Sambat 1748 Bikrami), who fought beside Baba Ajit Singh Ji at Sri Chamkaur Sahib.',
    summaryPa:
      'ਦਸਮੇਸ਼ ਪਿਤਾ ਜੀ ਦੇ ਦੂਸਰੇ ਸਪੁੱਤਰ ਸਾਹਿਬਜ਼ਾਦਾ ਬਾਬਾ ਜੁਝਾਰ ਸਿੰਘ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ (ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ, ਸੰਮਤ ੧੭੪੮), ਜੋ ਸ੍ਰੀ ਚਮਕੌਰ ਸਾਹਿਬ ਵਿਖੇ ਸ਼ਹੀਦ ਹੋਏ।',
    historicalContextEn:
      'Born to Sri Guru Gobind Singh Ji and Mata Jito Ji at Sri Anandpur Sahib in Chet/Vaisakh, Sambat 1748 (1691 CE), Baba Jujhar Singh Ji requested His father’s blessing at age fourteen to ride into the battlefield of Chamkaur Sahib immediately after elder brother Baba Ajit Singh Ji attained Shaheedi.',
    historicalContextPa:
      'ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਵਿਖੇ ਮਾਤਾ ਜੀਤੋ ਜੀ ਦੀ ਕੁੱਖੋਂ ਸੰਮਤ ੧੭੪੮ ਵਿੱਚ ਪ੍ਰਕਾਸ਼ ਧਾਰਨ ਵਾਲੇ ਬਾਬਾ ਜੁਝਾਰ ਸਿੰਘ ਜੀ ਨੇ ੧੪ ਸਾਲ ਦੀ ਉਮਰ ਵਿੱਚ ਸ੍ਰੀ ਚਮਕੌਰ ਸਾਹਿਬ ਦੀ ਜੰਗ ਵਿੱਚ ਅਦੁੱਤੀ ਬਹਾਦਰੀ ਦਿਖਾਉਂਦੇ ਹੋਏ ਸ਼ਹਾਦਤ ਪਾਈ।',
    citations: [
      {
        sourceEn: 'Bhatt Vahi Talauda & Guru Kian Sakhian',
        sourcePa: 'ਭੱਟ ਵਹੀ ਤਲੌਡਾ ਅਤੇ ਗੁਰੂ ਕੀਆਂ ਸਾਖੀਆਂ',
        referenceEn: 'Sambat 1748 · Sri Anandpur Sahib Birth Record',
        referencePa: 'ਸੰਮਤ ੧੭੪੮ · ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਜਨਮ ਰਿਕਾਰਡ',
      },
    ],
  },
  {
    id: '2084-panj-pyare-bhai-dharam-singh-maharaja-ranjit-singh',
    date: '2027-04-14',
    sambat: 2084,
    category: 'khalsa',
    subGroups: ['gursikh'],
    titleEn: 'Panj Pyare (Bhai Dharam Singh Ji) & Maharaja Ranjit Singh Ji Raj Tilak (1 Vaisakh)',
    titlePa: 'ਪੰਜ ਪਿਆਰੇ (ਭਾਈ ਧਰਮ ਸਿੰਘ ਜੀ) ਅਤੇ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਜੀ ਰਾਜ-ਤਿਲਕ (੧ ਵੈਸਾਖ)',
    shortLabelEn: 'Panj Pyare & Raj Tilak',
    shortLabelPa: 'ਪੰਜ ਪਿਆਰੇ ਤੇ ਰਾਜ-ਤਿਲਕ',
    tithiRuleEn: '1 Vaisakh, Sambat 2084 (Vaisakhi — Sambat 1756 & 1858)',
    tithiRulePa: '੧ ਵੈਸਾਖ, ਸੰਮਤ ੨੦੮੪ (ਵੈਸਾਖੀ — ਸੰਮਤ ੧੭੫੬ ਅਤੇ ੧੮੫੮)',
    summaryEn:
      'Honoring all Five Beloved Ones (Bhai Daya Singh, Bhai Dharam Singh, Bhai Himmat Singh, Bhai Mohkam Singh & Bhai Sahib Singh Ji) consecrated on Vaisakhi 1699, and Maharaja Ranjit Singh Ji’s Raj Tilak at Lahore (1 Vaisakh, Sambat 1858).',
    summaryPa:
      '੧੬੯੯ ਦੀ ਵੈਸਾਖੀ ’ਤੇ ਸਾਜੇ ਪੰਜ ਪਿਆਰਿਆਂ (ਭਾਈ ਦਇਆ ਸਿੰਘ, ਭਾਈ ਧਰਮ ਸਿੰਘ, ਭਾਈ ਹਿੰਮਤ ਸਿੰਘ, ਭਾਈ ਮੋਹਕਮ ਸਿੰਘ ਅਤੇ ਭਾਈ ਸਾਹਿਬ ਸਿੰਘ ਜੀ) ਅਤੇ ੧ ਵੈਸਾਖ ਸੰਮਤ ੧੮੫੮ ਨੂੰ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਜੀ ਦੇ ਰਾਜ-ਤਿਲਕ ਦਾ ਦਿਹਾੜਾ।',
    historicalContextEn:
      'On 1 Vaisakh, Sambat 1756 (1699 CE), Bhai Dharam Singh Ji of Hastinapur stood second to offer his head among the Panj Pyare (note per Mahan Kosh: exact birth date of Bhai Dharam Singh Ji is unrecorded in surviving chronicles; he accompanied Guru Gobind Singh Ji to Sri Hazur Sahib). On 1 Vaisakh, Sambat 1858 (12 April 1801 CE), Sahib Singh Bedi applied the Raj Tilak to Sher-e-Punjab Maharaja Ranjit Singh Ji in Lahore.',
    historicalContextPa:
      '੧ ਵੈਸਾਖ ਸੰਮਤ ੧੭੫੬ ਨੂੰ ਹਸਤਿਨਾਪੁਰ ਦੇ ਭਾਈ ਧਰਮ ਸਿੰਘ ਜੀ ਨੇ ਪੰਜ ਪਿਆਰਿਆਂ ਵਿੱਚ ਦੂਜਾ ਸੀਸ ਭੇਟ ਕੀਤਾ (ਮਹਾਨ ਕੋਸ਼ ਅਨੁਸਾਰ ਆਪ ਜੀ ਦੀ ਸਹੀ ਜਨਮ ਮਿਤੀ ਪੁਰਾਤਨ ਲਿਖਤਾਂ ਵਿੱਚ ਨਹੀਂ ਮਿਲਦੀ)। ੧ ਵੈਸਾਖ ਸੰਮਤ ੧੮੫੮ ਨੂੰ ਲਾਹੌਰ ਵਿਖੇ ਬਾਬਾ ਸਾਹਿਬ ਸਿੰਘ ਬੇਦੀ ਨੇ ਸ਼ੇਰ-ਏ-ਪੰਜਾਬ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਜੀ ਨੂੰ ਰਾਜ-ਤਿਲਕ ਲਗਾਇਆ।',
    citations: [
      {
        sourceEn: 'Mahan Kosh & Prachin Panth Prakash',
        sourcePa: 'ਮਹਾਨ ਕੋਸ਼ ਅਤੇ ਪ੍ਰਾਚੀਨ ਪੰਥ ਪ੍ਰਕਾਸ਼',
        referenceEn: '1 Vaisakh 1756 (Panj Pyare) & 1 Vaisakh 1858 (Maharaja Ranjit Singh Raj Tilak)',
        referencePa: '੧ ਵੈਸਾਖ ੧੭੫੬ (ਪੰਜ ਪਿਆਰੇ) ਅਤੇ ੧ ਵੈਸਾਖ ੧੮੫੮ (ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਰਾਜ-ਤਿਲਕ)',
      },
    ],
  },
  {
    id: '2084-baba-gurditta-ji-guru-hargobind-parivar',
    date: '2027-04-16',
    sambat: 2084,
    category: 'khalsa',
    subGroups: ['guru-ghar'],
    titleEn: 'Joti Jot — Baba Gurditta Ji & Sri Guru Hargobind Sahib Ji Parivar',
    titlePa: 'ਜੋਤੀ ਜੋਤ — ਬਾਬਾ ਗੁਰਦਿੱਤਾ ਜੀ ਅਤੇ ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਪਰਿਵਾਰ',
    shortLabelEn: 'Baba Gurditta Ji & Guru Ghar',
    shortLabelPa: 'ਬਾਬਾ ਗੁਰਦਿੱਤਾ ਜੀ ਤੇ ਗੁਰੂ ਘਰ',
    tithiRuleEn: 'Chet Sudhi 10 (3 Vaisakh, Sambat 2084 · Kiratpur Sahib)',
    tithiRulePa: 'ਚੇਤ ਸੁਦੀ ੧੦ (੩ ਵੈਸਾਖ, ਸੰਮਤ ੨੦੮੪ · ਕੀਰਤਪੁਰ ਸਾਹਿਬ)',
    summaryEn:
      'Commemorating Baba Gurditta Ji (founder of Kiratpur Sahib & father of Sri Guru Har Rai Sahib Ji) alongside siblings Bibi Viro Ji, Baba Ani Rai Ji, Baba Suraj Mal Ji, Baba Atal Rai Ji, and Sri Guru Tegh Bahadur Sahib Ji.',
    summaryPa:
      'ਕੀਰਤਪੁਰ ਸਾਹਿਬ ਦੇ ਬਾਨੀ ਅਤੇ ਗੁਰੂ ਹਰਿਰਾਇ ਸਾਹਿਬ ਜੀ ਦੇ ਪਿਤਾ ਬਾਬਾ ਗੁਰਦਿੱਤਾ ਜੀ ਦਾ ਜੋਤੀ ਜੋਤ ਦਿਵਸ — ਨਾਲ ਹੀ ਬੀਬੀ ਵੀਰੋ ਜੀ, ਬਾਬਾ ਅਣੀ ਰਾਇ ਜੀ, ਬਾਬਾ ਸੂਰਜ ਮੱਲ ਜੀ ਅਤੇ ਬਾਬਾ ਅਟੱਲ ਰਾਇ ਜੀ ਦੀ ਯਾਦਗਾਰ।',
    historicalContextEn:
      'Elder Sahibzada of Sixth Patshah Sri Guru Hargobind Sahib Ji and Mata Damodari Ji, Baba Gurditta Ji founded Sri Kiratpur Sahib and passed into Eternal Light on Chet Sudhi 10, Sambat 1695 (1638 CE). This observance also remembers Sri Guru Hargobind Sahib Ji’s entire Guru Ghar Parivar: Bibi Viro Ji (mother of the five hero sons of Bhangani), Baba Ani Rai Ji, Baba Suraj Mal Ji, Baba Atal Rai Ji, and Ninth Patshah Sri Guru Tegh Bahadur Sahib Ji.',
    historicalContextPa:
      'ਛੇਵੇਂ ਪਾਤਸ਼ਾਹ ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਦੇ ਵੱਡੇ ਸਪੁੱਤਰ ਬਾਬਾ ਗੁਰਦਿੱਤਾ ਜੀ ਨੇ ਸ੍ਰੀ ਕੀਰਤਪੁਰ ਸਾਹਿਬ ਵਸਾਇਆ ਅਤੇ ਚੇਤ ਸੁਦੀ ੧੦, ਸੰਮਤ ੧੬੯੫ ਨੂੰ ਜੋਤੀ ਜੋਤ ਸਮਾਏ। ਇਸ ਦਿਹਾੜੇ ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਦੇ ਸਮੁੱਚੇ ਪਰਿਵਾਰ (ਬੀਬੀ ਵੀਰੋ ਜੀ, ਬਾਬਾ ਅਣੀ ਰਾਇ ਜੀ, ਬਾਬਾ ਸੂਰਜ ਮੱਲ ਜੀ, ਬਾਬਾ ਅਟੱਲ ਰਾਇ ਜੀ ਅਤੇ ਗੁਰੂ ਤੇਗ਼ ਬਹਾਦਰ ਜੀ) ਨੂੰ ਸਿਜਦਾ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।',
    citations: [
      {
        sourceEn: 'Bhatt Vahi & Sri Gur Pratap Suraj Granth',
        sourcePa: 'ਭੱਟ ਵਹੀ ਅਤੇ ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ',
        referenceEn: 'Raas 8 · Baba Gurditta Ji Joti Jot (Chet Sudhi 10, Sambat 1695)',
        referencePa: 'ਰਾਸਿ ੮ · ਬਾਬਾ ਗੁਰਦਿੱਤਾ ਜੀ ਜੋਤੀ ਜੋਤ (ਚੇਤ ਸੁਦੀ ੧੦, ਸੰਮਤ ੧੬੯੫)',
      },
    ],
  },
  {
    id: '2084-bhagat-pipa-ji',
    date: '2027-04-20',
    sambat: 2084,
    category: 'khalsa',
    subGroups: ['bhagat-bhatt'],
    titleEn: 'Parkash Purab — Bhagat Pipa Ji (SGGS Ang 695)',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਭਗਤ ਪੀਪਾ ਜੀ (ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਅੰਗ ੬੯੫)',
    shortLabelEn: 'Bhagat Pipa Ji',
    shortLabelPa: 'ਭਗਤ ਪੀਪਾ ਜੀ',
    tithiRuleEn: 'Chet Puranmashi (7 Vaisakh, Sambat 2084 · Traditional)',
    tithiRulePa: 'ਚੇਤ ਪੂਰਨਮਾਸ਼ੀ (੭ ਵੈਸਾਖ, ਸੰਮਤ ੨੦੮੪ · ਪਰੰਪਰਿਕ)',
    summaryEn:
      'Traditional Chet Puranmashi commemoration of Bhagat Pipa Ji (former ruler of Gagaraungarh who renounced royalty for Naam Simran), author of the profound Raag Dhanasri Shabad on SGGS Ang 695.',
    summaryPa:
      'ਗਾਗਰੌਣਗੜ੍ਹ ਦੇ ਰਾਜੇ ਤੋਂ ਭਗਤ ਬਣੇ ਭਗਤ ਪੀਪਾ ਜੀ ਦਾ ਪਰੰਪਰਿਕ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਅੰਗ ੬੯੫ (ਰਾਗ ਧਨਾਸਰੀ) ਵਿੱਚ ਆਪ ਜੀ ਦਾ ਸ਼ਬਦ ਦਰਜ ਹੈ।',
    historicalContextEn:
      'Bhagat Pipa Ji abdicated the throne of Gagaraungarh to seek spiritual truth under Bhagat Ramanand Ji, proclaiming on SGGS Ang 695: "Jo brahmande soee pinde, jo khojai so paavai" ("Whatever is in the universe pervades the body; whoever seeks finds"). Note per Mahan Kosh: Chet Puranmashi is observed traditionally, with birth year placed around Sambat 1482.',
    historicalContextPa:
      'ਭਗਤ ਪੀਪਾ ਜੀ ਨੇ ਰਾਜ-ਭਾਗ ਤਿਆਗ ਕੇ ‘ਜੋ ਬ੍ਰਹਮੰਡੇ ਸੋਈ ਪਿੰਡੇ ਜੋ ਖੋਜੈ ਸੋ ਪਾਵੈ’ (ਅੰਗ ੬੯੫) ਦਾ ਸੱਚ ਉਚਾਰਿਆ। ਮਹਾਨ ਕੋਸ਼ ਅਨੁਸਾਰ ਚੇਤ ਪੂਰਨਮਾਸ਼ੀ ਨੂੰ ਪਰੰਪਰਿਕ ਤੌਰ ’ਤੇ ਆਪ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ ਮਨਾਇਆ ਜਾਂਦਾ ਹੈ।',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ',
        referenceEn: 'Ang 695 · Raag Dhanasri, Bhagat Pipa Ji',
        referencePa: 'ਅੰਗ ੬੯੫ · ਰਾਗ ਧਨਾਸਰੀ, ਭਗਤ ਪੀਪਾ ਜੀ',
        excerptPa: 'ਜੋ ਬ੍ਰਹਮੰਡੇ ਸੋਈ ਪਿੰਡੇ ਜੋ ਖੋਜੈ ਸੋ ਪਾਵੈ ॥ ਪੀਪਾ ਪ੍ਰਣਵੈ ਪਰਮ ਤਤੁ ਹੈ ਸਤਿਗੁਰੁ ਹੋਇ ਲਖਾਵੈ ॥੨॥੩॥',
        excerptTranslit: 'Jo brahmande soee pinde jo khojai so paavai, Peepaa pranvai param tat hai Satgur hoi lakhaavai.',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=695',
        pothiLabelEn: 'Read Bhagat Pipa Ji Shabad (Ang 695)',
        pothiLabelPa: 'ਪੋਥੀ ਸਾਹਿਬ ’ਤੇ ਭਗਤ ਪੀਪਾ ਜੀ ਸ਼ਬਦ (ਅੰਗ ੬੯੫) ਪੜ੍ਹੋ',
      },
    ],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=695',
    pothiLabelEn: 'Read Bhagat Pipa Ji Bani (Ang 695)',
    pothiLabelPa: 'ਭਗਤ ਪੀਪਾ ਜੀ ਬਾਣੀ (ਅੰਗ ੬੯੫) ਪੜ੍ਹੋ',
  },
  {
    id: '2084-parkash-bhagat-dhanna-ji',
    date: '2027-04-21',
    sambat: 2084,
    category: 'khalsa',
    subGroups: ['bhagat-bhatt'],
    titleEn: 'Parkash Purab — Bhagat Dhanna Ji (SGGS Ang 487–488, 695)',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਭਗਤ ਧੰਨਾ ਜੀ (ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਅੰਗ ੪੮੭–੪੮੮, ੬੯੫)',
    shortLabelEn: 'Bhagat Dhanna Ji',
    shortLabelPa: 'ਭਗਤ ਧੰਨਾ ਜੀ',
    tithiRuleEn: '8 Vaisakh, Sambat 2084',
    tithiRulePa: '੮ ਵੈਸਾਖ, ਸੰਮਤ ੨੦੮੪',
    summaryEn:
      'Parkash Purab of Bhagat Dhanna Ji of Dhuan Kalan (Rajasthan), whose three Shabads in Raag Asa and Raag Dhanasri appear in Sri Guru Granth Sahib Ji (Ang 487–488, 695).',
    summaryPa:
      'ਧੂਆਂ ਕਲਾਂ (ਰਾਜਸਥਾਨ) ਦੇ ਨਿਵਾਸੀ ਭਗਤ ਧੰਨਾ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੇ ਅੰਗ ੪੮੭–੪੮੮ ਅਤੇ ੬੯੫ ’ਤੇ ਆਪ ਜੀ ਦੇ ਤਿੰਨ ਸ਼ਬਦ ਦਰਜ ਹਨ।',
    historicalContextEn:
      'Born on 8 Vaisakh, Sambat 1472 (1415 CE) at Dhuan Kalan (Tonk, Rajasthan), Bhagat Dhanna Ji realized the Supreme Lord through innocent, wholehearted devotion—praised directly by Fifth Patshah Sri Guru Arjan Dev Ji on Ang 487 ("Eh bidh sun kai Jaatro uth bhagtee laagaa; mile pratyakh Gusaeeaa Dhannaa vadbhaagaa").',
    historicalContextPa:
      '੮ ਵੈਸਾਖ ਸੰਮਤ ੧੪੭੨ ਨੂੰ ਧੂਆਂ ਕਲਾਂ (ਰਾਜਸਥਾਨ) ਵਿਖੇ ਜਨਮੇ ਭਗਤ ਧੰਨਾ ਜੀ ਦੀ ਨਿਸ਼ਕਪਟ ਭਗਤੀ ਦੀ ਵਡਿਆਈ ਪੰਜਵੇਂ ਪਾਤਸ਼ਾਹ ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਨੇ ਰਾਗ ਆਸਾ (ਅੰਗ ੪੮੭) ਵਿੱਚ ਆਪ ਕੀਤੀ ਹੈ।',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ',
        referenceEn: 'Ang 487–488 & 695 · Raag Asa & Dhanasri, Bhagat Dhanna Ji',
        referencePa: 'ਅੰਗ ੪੮੭–੪੮੮ ਅਤੇ ੬੯੫ · ਰਾਗ ਆਸਾ ਤੇ ਧਨਾਸਰੀ, ਭਗਤ ਧੰਨਾ ਜੀ',
        excerptPa: 'ਗੋਪਾਲ ਤੇਰਾ ਆਰਤਾ ॥ ਜੋ ਜਨ ਤੁਮਰੀ ਭਗਤਿ ਕਰੰਤੇ ਤਿਨ ਕੇ ਕਾਜ ਸਵਾਰਤਾ ॥੧॥ ਰਹਾਉ ॥',
        excerptTranslit: 'Gopaal teraa aartaa, jo jan tumree bhagat karante tin ke kaaj savaartaa.',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=695',
        pothiLabelEn: 'Read Bhagat Dhanna Ji Shabad (Ang 695)',
        pothiLabelPa: 'ਪੋਥੀ ਸਾਹਿਬ ’ਤੇ ਭਗਤ ਧੰਨਾ ਜੀ ਸ਼ਬਦ (ਅੰਗ ੬੯੫) ਪੜ੍ਹੋ',
      },
    ],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=695',
    pothiLabelEn: 'Read Bhagat Dhanna Ji Bani (Ang 695)',
    pothiLabelPa: 'ਭਗਤ ਧੰਨਾ ਜੀ ਬਾਣੀ (ਅੰਗ ੬੯੫) ਪੜ੍ਹੋ',
  },
  {
    id: '2084-bhagat-jaidev-ji',
    date: '2027-04-24',
    sambat: 2084,
    category: 'khalsa',
    subGroups: ['bhagat-bhatt'],
    titleEn: 'Remembrance — Bhagat Jaidev Ji (SGGS Ang 526, 1106 · Mahan Kosh Note)',
    titlePa: 'ਯਾਦਗਾਰ — ਭਗਤ ਜੈਦੇਵ ਜੀ (ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਅੰਗ ੫੨੬, ੧੧੦੬ · ਮਹਾਨ ਕੋਸ਼ ਨੋਟ)',
    shortLabelEn: 'Bhagat Jaidev Ji',
    shortLabelPa: 'ਭਗਤ ਜੈਦੇਵ ਜੀ',
    tithiRuleEn: 'Vaisakh Commemoration (11 Vaisakh 2084 · Exact date unrecorded)',
    tithiRulePa: 'ਵੈਸਾਖ ਯਾਦਗਾਰ (੧੧ ਵੈਸਾਖ ੨੦੮੪ · ਸਹੀ ਤਾਰੀਖ਼ ਅਪ੍ਰਾਪਤ)',
    summaryEn:
      'Honoring Bhagat Jaidev Ji (12th-century saint-poet of Kindubilva, Bengal), whose two Shabads in Raag Gujri (Ang 526) and Raag Maru (Ang 1106) are enshrined in Sri Guru Granth Sahib Ji.',
    summaryPa:
      '੧੨ਵੀਂ ਸਦੀ ਦੇ ਮਹਾਨ ਭਗਤ ਜੈਦੇਵ ਜੀ ਦੀ ਯਾਦਗਾਰ — ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੇ ਅੰਗ ੫੨੬ (ਗੂਜਰੀ) ਅਤੇ ੧੧੦੬ (ਮਾਰੂ) ’ਤੇ ਆਪ ਜੀ ਦੇ ਦੋ ਸ਼ਬਦ ਦਰਜ ਹਨ।',
    historicalContextEn:
      'Bhagat Jaidev Ji (12th century CE, Kenduli/Kindubilva) praised the One Primal Truth ("Parmadi Purakh Manopimam") in Sri Guru Granth Sahib Ji (Ang 526 & 1106) and is lauded by Bhai Gurdas Ji (Vaar 10, Pauri 11). Historical note per Mahan Kosh: no exact Bikrami birth day survives in Puratan manuscripts; Vaisakh commemorates his legacy.',
    historicalContextPa:
      'ਭਗਤ ਜੈਦੇਵ ਜੀ ਦੀ ਬਾਣੀ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਅੰਗ ੫੨੬, ੧੧੦੬) ਵਿੱਚ ਸੁਸ਼ੋਭਿਤ ਹੈ ਅਤੇ ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਨੇ ਵਾਰ ੧੦ ਪਉੜੀ ੧੧ ਵਿੱਚ ਆਪ ਜੀ ਦੀ ਮਹਿਮਾ ਗਾਈ ਹੈ। ਮਹਾਨ ਕੋਸ਼ ਅਨੁਸਾਰ ਪੁਰਾਤਨ ਲਿਖਤਾਂ ਵਿੱਚ ਆਪ ਜੀ ਦੀ ਸਹੀ ਜਨਮ ਤਾਰੀਖ਼ ਉਪਲਬਧ ਨਹੀਂ ਹੈ।',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ',
        referenceEn: 'Ang 526 & 1106 · Raag Gujri & Maru, Bhagat Jaidev Ji',
        referencePa: 'ਅੰਗ ੫੨੬ ਅਤੇ ੧੧੦੬ · ਰਾਗ ਗੂਜਰੀ ਤੇ ਮਾਰੂ, ਭਗਤ ਜੈਦੇਵ ਜੀ',
        excerptPa: 'ਪਰਮਾਦਿ ਪੁਰਖਮਨੋਪਿਮੰ ਸਤਿ ਆਦਿ ਭਾਵ ਰਤੰ ॥',
        excerptTranslit: 'Parmaad purakhamanopimam sat aad bhaav ratam.',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=526',
        pothiLabelEn: 'Read Bhagat Jaidev Ji Shabad (Ang 526)',
        pothiLabelPa: 'ਪੋਥੀ ਸਾਹਿਬ ’ਤੇ ਭਗਤ ਜੈਦੇਵ ਜੀ ਸ਼ਬਦ (ਅੰਗ ੫੨੬) ਪੜ੍ਹੋ',
      },
      {
        sourceEn: 'Mahan Kosh (Bhai Kahn Singh Nabha)',
        sourcePa: 'ਮਹਾਨ ਕੋਸ਼ (ਭਾਈ ਕਾਨ੍ਹ ਸਿੰਘ ਨਾਭਾ)',
        referenceEn: 'Entry: Jaidev (ਜੈਦੇਵ) · Historical Chronology Note',
        referencePa: 'ਇੰਦਰਾਜ: ਜੈਦੇਵ · ਇਤਿਹਾਸਕ ਨੋਟ',
      },
    ],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=526',
    pothiLabelEn: 'Read Bhagat Jaidev Ji Bani (Ang 526)',
    pothiLabelPa: 'ਭਗਤ ਜੈਦੇਵ ਜੀ ਬਾਣੀ (ਅੰਗ ੫੨੬) ਪੜ੍ਹੋ',
  },
  {
    id: '2084-shaheedi-sardar-hari-singh-nalwa',
    date: '2027-04-30',
    sambat: 2084,
    category: 'shaheedi',
    subGroups: ['gursikh'],
    titleEn: 'Shaheedi Divas — General Sardar Hari Singh Nalwa (Battle of Jamrud)',
    titlePa: 'ਸ਼ਹੀਦੀ ਦਿਵਸ — ਜਰਨੈਲ ਸਰਦਾਰ ਹਰੀ ਸਿੰਘ ਨਲੂਆ (ਜੰਗ ਜਮਰੌਦ)',
    shortLabelEn: 'Sardar Hari Singh Nalwa',
    shortLabelPa: 'ਸਰਦਾਰ ਹਰੀ ਸਿੰਘ ਨਲੂਆ',
    tithiRuleEn: '17 Vaisakh, Sambat 2084 (30 April 1837 / Sambat 1894)',
    tithiRulePa: '੧੭ ਵੈਸਾਖ, ਸੰਮਤ ੨੦੮੪ (੩੦ ਅਪ੍ਰੈਲ ੧੮੩੭ / ਸੰਮਤ ੧੮੯੪)',
    summaryEn:
      'Martyrdom of Commander-in-Chief of the Khalsa Fauj, Sardar Hari Singh Nalwa, defending Fort Jamrud at the mouth of the Khyber Pass (Sambat 1894).',
    summaryPa:
      'ਖ਼ਾਲਸਾ ਫ਼ੌਜ ਦੇ ਮਹਾਨ ਜਰਨੈਲ ਸਰਦਾਰ ਹਰੀ ਸਿੰਘ ਨਲੂਆ ਦੀ ਖ਼ੈਬਰ ਦਰੇ ਦੇ ਮੁਹਾਣੇ ਕਿਲ੍ਹਾ ਜਮਰੌਦ ਦੀ ਰੱਖਿਆ ਕਰਦਿਆਂ ਮਹਾਨ ਸ਼ਹਾਦਤ (੧੭ ਵੈਸਾਖ, ਸੰਮਤ ੧੮੯੪)।',
    historicalContextEn:
      'Victor of Kasur, Multan, Kashmir, Peshawar, and Jamrud who forever closed the Khyber Pass against centuries of foreign invasions into India, Sardar Hari Singh Nalwa attained martyrdom at Fort Jamrud on 17 Vaisakh, Sambat 1894 (30 April 1837 CE), instructing his garrison to keep his passing secret until reinforcements arrived so the Khalsa banner stayed aloft.',
    historicalContextPa:
      'ਕਸੂਰ, ਮੁਲਤਾਨ, ਕਸ਼ਮੀਰ, ਪੇਸ਼ਾਵਰ ਅਤੇ ਜਮਰੌਦ ਦੇ ਜੇਤੂ ਜਰਨੈਲ ਸਰਦਾਰ ਹਰੀ ਸਿੰਘ ਨਲੂਆ ਨੇ ੧੭ ਵੈਸਾਖ ਸੰਮਤ ੧੮੯੪ ਨੂੰ ਕਿਲ੍ਹਾ ਜਮਰੌਦ ਵਿਖੇ ਸ਼ਹੀਦੀ ਪਾਈ ਅਤੇ ਖ਼ੈਬਰ ਦਰੇ ਦਾ ਰਾਹ ਸਦਾ ਲਈ ਬੰਦ ਕਰ ਦਿੱਤਾ।',
    citations: [
      {
        sourceEn: 'Mahan Kosh & Khalsa Darbar Records',
        sourcePa: 'ਮਹਾਨ ਕੋਸ਼ ਅਤੇ ਖ਼ਾਲਸਾ ਦਰਬਾਰ ਰਿਕਾਰਡ',
        referenceEn: 'Entry: Hari Singh Nalwa · Battle of Jamrud (Vaisakh Sambat 1894)',
        referencePa: 'ਇੰਦਰਾਜ: ਹਰੀ ਸਿੰਘ ਨਲੂਆ · ਜੰਗ ਜਮਰੌਦ (ਵੈਸਾਖ ਸੰਮਤ ੧੮੯੪)',
      },
    ],
  },
  {
    id: '2084-mata-bhag-kaur-mai-bhago-ji',
    date: '2027-05-04',
    sambat: 2084,
    category: 'khalsa',
    subGroups: ['gursikh'],
    titleEn: 'Remembrance — Mata Bhag Kaur Ji (Mai Bhago Ji · Sri Muktsar Sahib & Hazur Sahib)',
    titlePa: 'ਯਾਦਗਾਰ — ਮਾਤਾ ਭਾਗ ਕੌਰ ਜੀ (ਮਾਈ ਭਾਗੋ ਜੀ · ਸ੍ਰੀ ਮੁਕਤਸਰ ਸਾਹਿਬ ਅਤੇ ਹਜ਼ੂਰ ਸਾਹਿਬ)',
    shortLabelEn: 'Mata Bhag Kaur (Mai Bhago)',
    shortLabelPa: 'ਮਾਤਾ ਭਾਗ ਕੌਰ (ਮਾਈ ਭਾਗੋ)',
    tithiRuleEn: '21 Vaisakh, Sambat 2084 (Muktsar Battle — 21 Vaisakh, Sambat 1762)',
    tithiRulePa: '੨੧ ਵੈਸਾਖ, ਸੰਮਤ ੨੦੮੪ (ਜੰਗ ਮੁਕਤਸਰ — ੨੧ ਵੈਸਾਖ, ਸੰਮਤ ੧੭੬੨)',
    summaryEn:
      'Honoring Mata Bhag Kaur Ji (Mai Bhago Ji of Jhabal), valiant Khalsa warrior who rallied the Forty Liberated Ones (Chali Mukte) at Khidrana (Sri Muktsar Sahib) and served in Dashmesh Pita’s personal guard to Sri Hazur Sahib.',
    summaryPa:
      'ਝਬਾਲ ਦੀ ਸੂਰਬੀਰ ਮਾਤਾ ਭਾਗ ਕੌਰ ਜੀ (ਮਾਈ ਭਾਗੋ ਜੀ) ਦੀ ਯਾਦਗਾਰ, ਜਿਨ੍ਹਾਂ ਨੇ ੨੧ ਵੈਸਾਖ ਸੰਮਤ ੧੭੬੨ ਨੂੰ ਖਿਦਰਾਣੇ ਦੀ ਢਾਬ (ਸ੍ਰੀ ਮੁਕਤਸਰ ਸਾਹਿਬ) ਵਿਖੇ ਚਾਲੀ ਮੁਕਤਿਆਂ ਦੀ ਅਗਵਾਈ ਕੀਤੀ।',
    historicalContextEn:
      'On 21 Vaisakh, Sambat 1762 (December/May chronicle note: Bhatt Vahis record 21 Vaisakh 1762 for the Battle of Khidrana, while Maghi celebrates the annual Jor Mela), Mata Bhag Kaur Ji rallied the forty Majha Singhs to defend Sri Guru Gobind Singh Ji against Wazir Khan’s army. She later accompanied Dashmesh Pita to Nanded and spent her final years in meditation at Janwada (Karnataka).',
    historicalContextPa:
      'ਭੱਟ ਵਹੀਆਂ ਅਨੁਸਾਰ ੨੧ ਵੈਸਾਖ ਸੰਮਤ ੧੭੬੨ ਨੂੰ ਖਿਦਰਾਣੇ ਦੀ ਢਾਬ ਵਿਖੇ ਮਾਤਾ ਭਾਗ ਕੌਰ ਜੀ ਨੇ ਚਾਲੀ ਮੁਕਤਿਆਂ ਨੂੰ ਪ੍ਰੇਰਿਤ ਕਰਕੇ ਮੁਗ਼ਲ ਫ਼ੌਜਾਂ ਦਾ ਡਟ ਕੇ ਮੁਕਾਬਲਾ ਕੀਤਾ ਅਤੇ ਬਾਅਦ ਵਿੱਚ ਸ੍ਰੀ ਹਜ਼ੂਰ ਸਾਹਿਬ ਤੇ ਜਨਵਾੜਾ ਵਿਖੇ ਭਗਤੀ ਕੀਤੀ।',
    citations: [
      {
        sourceEn: 'Bhatt Vahi & Sri Gur Pratap Suraj Granth',
        sourcePa: 'ਭੱਟ ਵਹੀ ਅਤੇ ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ',
        referenceEn: 'Ayan 2 · Mata Bhag Kaur Ji & Battle of Khidrana (21 Vaisakh, 1762)',
        referencePa: 'ਅਯਨ ੨ · ਮਾਤਾ ਭਾਗ ਕੌਰ ਜੀ ਅਤੇ ਖਿਦਰਾਣੇ ਦੀ ਜੰਗ (੨੧ ਵੈਸਾਖ, ੧੭੬੨)',
      },
    ],
  },
  {
    id: '2084-guru-angad-dev-parivar-mata-khivi-ji',
    date: '2027-05-07',
    sambat: 2084,
    category: 'khalsa',
    subGroups: ['guru-ghar'],
    titleEn: 'Guru Ghar Heritage — Mata Khivi Ji & Sri Guru Angad Dev Ji Parivar (Khadur Sahib)',
    titlePa: 'ਗੁਰੂ ਘਰ ਵਿਰਾਸਤ — ਮਾਤਾ ਖੀਵੀ ਜੀ ਅਤੇ ਸ੍ਰੀ ਗੁਰੂ ਅੰਗਦ ਦੇਵ ਜੀ ਪਰਿਵਾਰ (ਖਡੂਰ ਸਾਹਿਬ)',
    shortLabelEn: 'Mata Khivi Ji & Guru Ghar',
    shortLabelPa: 'ਮਾਤਾ ਖੀਵੀ ਜੀ ਤੇ ਗੁਰੂ ਘਰ',
    tithiRuleEn: '24 Vaisakh, Sambat 2084 (On Guru Angad Dev Ji Parkash)',
    tithiRulePa: '੨੪ ਵੈਸਾਖ, ਸੰਮਤ ੨੦੮੪ (ਗੁਰੂ ਅੰਗਦ ਦੇਵ ਜੀ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ ’ਤੇ)',
    summaryEn:
      'Honoring Mata Khivi Ji (extolled in SGGS Ang 967 for nourishing the Langar of Guru Nanak) along with Baba Dasu Ji, Baba Datu Ji, Bibi Amro Ji, and Bibi Anokhi Ji.',
    summaryPa:
      'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ (ਅੰਗ ੯੬੭) ਵਿੱਚ ਵਡਿਆਏ ਗਏ ਮਾਤਾ ਖੀਵੀ ਜੀ ਅਤੇ ਸ੍ਰੀ ਗੁਰੂ ਅੰਗਦ ਦੇਵ ਜੀ ਦੇ ਪਰਿਵਾਰ—ਬਾਬਾ ਦਾਸੂ ਜੀ, ਬਾਬਾ ਦਾਤੂ ਜੀ, ਬੀਬੀ ਅਮਰੋ ਜੀ ਅਤੇ ਬੀਬੀ ਅਨੋਖੀ ਜੀ—ਦੀ ਯਾਦਗਾਰ।',
    historicalContextEn:
      'Mata Khivi Ji is the only Guru-consort named directly in Sri Guru Granth Sahib Ji (Ramkali Ki Vaar, Ang 967: "Balwand Khivi nek jan, jis bahuti chhao patrali"), personally overseeing Langar with kheer and ghee at Sri Khadur Sahib. Her children—Baba Dasu Ji, Baba Datu Ji, Bibi Amro Ji (who introduced Guru Amar Das Ji to Gurbani), and Bibi Anokhi Ji—form the second Guru Ghar family.',
    historicalContextPa:
      'ਮਾਤਾ ਖੀਵੀ ਜੀ ਦੀ ਨਿਸ਼ਕਾਮ ਲੰਗਰ ਸੇਵਾ ਦੀ ਉਸਤਤ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੇ ਅੰਗ ੯੬੭ ’ਤੇ ਦਰਜ ਹੈ। ਆਪ ਜੀ ਦੇ ਸਪੁੱਤਰ-ਸਪੁੱਤਰੀਆਂ ਬਾਬਾ ਦਾਸੂ ਜੀ, ਬਾਬਾ ਦਾਤੂ ਜੀ, ਬੀਬੀ ਅਮਰੋ ਜੀ ਅਤੇ ਬੀਬੀ ਅਨੋਖੀ ਜੀ ਖਡੂਰ ਸਾਹਿਬ ਗੁਰੂ ਘਰ ਦੀ ਪਾਵਨ ਵਿਰਾਸਤ ਹਨ।',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ',
        referenceEn: 'Ang 967 · Ramkali Ki Vaar (Bhai Balwand & Bhai Satta Ji — Mata Khivi Ji)',
        referencePa: 'ਅੰਗ ੯੬੭ · ਰਾਮਕਲੀ ਕੀ ਵਾਰ (ਭਾਈ ਬਲਵੰਡ ਤੇ ਸੱਤਾ ਜੀ — ਮਾਤਾ ਖੀਵੀ ਜੀ)',
        excerptPa: 'ਬਲਵੰਡ ਖੀਵੀ ਨੇਕ ਜਨ ਜਿਸੁ ਬਹੁਤੀ ਛਾਉ ਪਤ੍ਰਾਲੀ ॥ ਲੰਗਰਿ ਦਉਲਤਿ ਵੰਡੀਐ ਰਸੁ ਅੰਮ੍ਰਿਤੁ ਖੀਰਿ ਘਿਆਲੀ ॥',
        excerptTranslit: 'Balvand Kheevee nek jan jis bahutee chhaau patraalee, langar daulat vandeeai ras amrit kheer ghiaalee.',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=967',
        pothiLabelEn: 'Read Praise of Mata Khivi Ji (Ang 967)',
        pothiLabelPa: 'ਪੋਥੀ ਸਾਹਿਬ ’ਤੇ ਮਾਤਾ ਖੀਵੀ ਜੀ ਉਸਤਤ (ਅੰਗ ੯੬੭) ਪੜ੍ਹੋ',
      },
    ],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=967',
    pothiLabelEn: 'Read Mata Khivi Ji Praise (Ang 967)',
    pothiLabelPa: 'ਮਾਤਾ ਖੀਵੀ ਜੀ ਉਸਤਤ (ਅੰਗ ੯੬੭) ਪੜ੍ਹੋ',
  },
  {
    id: '2084-guru-amar-das-parivar-mata-mansa-devi-ji',
    date: '2027-05-19',
    sambat: 2084,
    category: 'khalsa',
    subGroups: ['guru-ghar'],
    titleEn: 'Guru Ghar Heritage — Mata Mansa Devi Ji, Baba Mohan Ji, Baba Mohri Ji & Bibi Dani Ji',
    titlePa: 'ਗੁਰੂ ਘਰ ਵਿਰਾਸਤ — ਮਾਤਾ ਮਨਸਾ ਦੇਵੀ ਜੀ, ਬਾਬਾ ਮੋਹਨ ਜੀ, ਬਾਬਾ ਮੋਹਰੀ ਜੀ ਅਤੇ ਬੀਬੀ ਦਾਨੀ ਜੀ',
    shortLabelEn: 'Guru Amar Das Ji Parivar',
    shortLabelPa: 'ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ ਪਰਿਵਾਰ',
    tithiRuleEn: '5 Jeth, Sambat 2084 (On Guru Amar Das Ji Parkash)',
    tithiRulePa: '੫ ਜੇਠ, ਸੰਮਤ ੨੦੮੪ (ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ ’ਤੇ)',
    summaryEn:
      'Honoring the Goindwal Sahib Guru Ghar family of Third Patshah Sri Guru Amar Das Ji: Mata Mansa Devi Ji, Baba Mohan Ji (custodian of the Goindwal Pothis), Baba Mohri Ji, Bibi Dani Ji, and Bibi Bhani Ji.',
    summaryPa:
      'ਤੀਸਰੇ ਪਾਤਸ਼ਾਹ ਸ੍ਰੀ ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ ਦੇ ਗੋਇੰਦਵਾਲ ਸਾਹਿਬ ਪਰਿਵਾਰ—ਮਾਤਾ ਮਨਸਾ ਦੇਵੀ ਜੀ, ਬਾਬਾ ਮੋਹਨ ਜੀ (ਗੋਇੰਦਵਾਲ ਪੋਥੀਆਂ ਦੇ ਸੰਭਾਲਣਹਾਰ), ਬਾਬਾ ਮੋਹਰੀ ਜੀ, ਬੀਬੀ ਦਾਨੀ ਜੀ ਅਤੇ ਬੀਬੀ ਭਾਨੀ ਜੀ—ਦੀ ਯਾਦਗਾਰ।',
    historicalContextEn:
      'At Sri Goindwal Sahib, Mata Mansa Devi Ji supported Guru Amar Das Ji’s 22 Manji mission; Baba Mohan Ji preserved the early Goindwal Pothis later consulted by Sri Guru Arjan Dev Ji during compilation of Adi Sri Guru Granth Sahib Ji; Baba Mohri Ji bowed humbly to Sri Guru Ram Das Ji (recorded in Ramkali Sadd, Ang 923), while Bibi Dani Ji and Bibi Bhani Ji spread Gurmat across Punjab.',
    historicalContextPa:
      'ਸ੍ਰੀ ਗੋਇੰਦਵਾਲ ਸਾਹਿਬ ਵਿਖੇ ਮਾਤਾ ਮਨਸਾ ਦੇਵੀ ਜੀ, ਗੋਇੰਦਵਾਲ ਪੋਥੀਆਂ ਸੰਭਾਲਣ ਵਾਲੇ ਬਾਬਾ ਮੋਹਨ ਜੀ, ਰਾਮਕਲੀ ਸਦੁ (ਅੰਗ ੯੨੩) ਵਿੱਚ ਵਰਣਿਤ ਬਾਬਾ ਮੋਹਰੀ ਜੀ, ਬੀਬੀ ਦਾਨੀ ਜੀ ਅਤੇ ਬੀਬੀ ਭਾਨੀ ਜੀ ਨੇ ਗੁਰਮਤਿ ਪ੍ਰਚਾਰ ਵਿੱਚ ਵੱਡਾ ਯੋਗਦਾਨ ਪਾਇਆ।',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji & Mahan Kosh',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਅਤੇ ਮਹਾਨ ਕੋਸ਼',
        referenceEn: 'Ang 923 · Ramkali Sadd (Baba Mohri Ji & Goindwal Parivar)',
        referencePa: 'ਅੰਗ ੯੨੩ · ਰਾਮਕਲੀ ਸਦੁ (ਬਾਬਾ ਮੋਹਰੀ ਜੀ ਅਤੇ ਗੋਇੰਦਵਾਲ ਪਰਿਵਾਰ)',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=923',
        pothiLabelEn: 'Read Ramkali Sadd (Ang 923)',
        pothiLabelPa: 'ਪੋਥੀ ਸਾਹਿਬ ’ਤੇ ਰਾਮਕਲੀ ਸਦੁ (ਅੰਗ ੯੨੩) ਪੜ੍ਹੋ',
      },
    ],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=923',
    pothiLabelEn: 'Read Ramkali Sadd (Ang 923)',
    pothiLabelPa: 'ਰਾਮਕਲੀ ਸਦੁ (ਅੰਗ ੯੨੩) ਪੜ੍ਹੋ',
  },
  {
    id: '2084-parkash-bhagat-kabir-ji',
    date: '2027-06-19',
    sambat: 2084,
    category: 'gurpurab',
    subGroups: ['bhagat-bhatt'],
    titleEn: 'Parkash Purab — Shiromani Bhagat Kabir Ji (SGGS Ang 92–1377)',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸ਼੍ਰੋਮਣੀ ਭਗਤ ਕਬੀਰ ਜੀ (ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਅੰਗ ੯੨–੧੩੭੭)',
    shortLabelEn: 'Bhagat Kabir Ji Parkash',
    shortLabelPa: 'ਭਗਤ ਕਬੀਰ ਜੀ ਪ੍ਰਕਾਸ਼',
    tithiRuleEn: 'Jeth Puranmashi (5 Harh, Sambat 2084 · 15 Harh solar note)',
    tithiRulePa: 'ਜੇਠ ਪੂਰਨਮਾਸ਼ੀ (੫ ਹਾੜ੍ਹ, ਸੰਮਤ ੨੦੮੪ · ੧੫ ਹਾੜ੍ਹ ਸੂਰਜੀ ਨੋਟ)',
    summaryEn:
      'Parkash Purab of Bhagat Kabir Ji of Kashi (Banaras), whose 226 Shabads and 243 Saloks (SGGS Ang 1364–1377 & across 17 Raags) form the largest Bhagat Bani corpus in Sri Guru Granth Sahib Ji.',
    summaryPa:
      'ਕਾਸ਼ੀ ਦੇ ਸ਼੍ਰੋਮਣੀ ਭਗਤ ਕਬੀਰ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਵਿੱਚ ੧੭ ਰਾਗਾਂ ਅਤੇ ਸਲੋਕ ਕਬੀਰ ਜੀ (ਅੰਗ ੧੩੬੪–੧੩੭੭) ਸਮੇਤ ਸਭ ਤੋਂ ਵੱਧ ਭਗਤ ਬਾਣੀ ਦਰਜ ਹੈ।',
    historicalContextEn:
      'Observed on Jeth Puranmashi (Sambat 1455 / 1398 CE; Mahan Kosh also notes the solar correspondence around 15 Harh). Fearless critic of caste pride and empty ritualism, Bhagat Kabir Ji sang "Avval Allah noor upaaiaa kudrat ke sabh bande" (Ang 1349) and attained eternal union at Maghar.',
    historicalContextPa:
      'ਜੇਠ ਪੂਰਨਮਾਸ਼ੀ ਸੰਮਤ ੧੪੫੫ ਨੂੰ ਪ੍ਰਕਾਸ਼ ਧਾਰਨ ਵਾਲੇ ਭਗਤ ਕਬੀਰ ਜੀ ਨੇ ‘ਅਵਲਿ ਅਲਹ ਨੂਰੁ ਉਪਾਇਆ ਕੁਦਰਤਿ ਕੇ ਸਭ ਬੰਦੇ’ (ਅੰਗ ੧੩੪੯) ਦਾ ਸਰਬ-ਸਾਂਝਾ ਉਪਦੇਸ਼ ਦਿੱਤਾ (ਮਹਾਨ ਕੋਸ਼ ਵਿੱਚ ੧੫ ਹਾੜ੍ਹ ਸੂਰਜੀ ਹਵਾਲਾ ਵੀ ਦਰਜ ਹੈ)।',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ',
        referenceEn: 'Ang 1349 & 1364–1377 · Raag Prabhati & Salok Bhagat Kabir Ji',
        referencePa: 'ਅੰਗ ੧੩੪੯ ਅਤੇ ੧੩੬੪–੧੩੭੭ · ਰਾਗ ਪ੍ਰਭਾਤੀ ਅਤੇ ਸਲੋਕ ਭਗਤ ਕਬੀਰ ਜੀ',
        excerptPa: 'ਅਵਲਿ ਅਲਹ ਨੂਰੁ ਉਪਾਇਆ ਕੁਦਰਤਿ ਕੇ ਸਭ ਬੰਦੇ ॥ ਏਕ ਨੂਰ ਤੇ ਸਭੁ ਜਗੁ ਉਪਜਿਆ ਕਉਨ ਭਲੇ ਕੋ ਮੰਦੇ ॥੧॥',
        excerptTranslit: 'Avval Allah noor upaaiaa kudrat ke sabh bande, ek noor te sabh jag upjiaa kaun bhale ko mande.',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=1349',
        pothiLabelEn: 'Read Bhagat Kabir Ji Shabad (Ang 1349)',
        pothiLabelPa: 'ਪੋਥੀ ਸਾਹਿਬ ’ਤੇ ਭਗਤ ਕਬੀਰ ਜੀ ਸ਼ਬਦ (ਅੰਗ ੧੩੪੯) ਪੜ੍ਹੋ',
      },
    ],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=1364',
    pothiLabelEn: 'Read Salok Bhagat Kabir Ji (Ang 1364)',
    pothiLabelPa: 'ਸਲੋਕ ਭਗਤ ਕਬੀਰ ਜੀ (ਅੰਗ ੧੩੬੪) ਪੜ੍ਹੋ',
    featured: true,
  },
  {
    id: '2084-shaheedi-baba-banda-singh-bahadur',
    date: '2027-06-25',
    sambat: 2084,
    category: 'shaheedi',
    subGroups: ['gursikh'],
    titleEn: 'Shaheedi Divas — Baba Banda Singh Bahadur & 740 Khalsa Shaheeds (Mehrauli, Delhi)',
    titlePa: 'ਸ਼ਹੀਦੀ ਦਿਵਸ — ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ ਅਤੇ ੭੪੦ ਖ਼ਾਲਸਾ ਸ਼ਹੀਦ (ਮਹਿਰੌਲੀ, ਦਿੱਲੀ)',
    shortLabelEn: 'Baba Banda Singh Bahadur',
    shortLabelPa: 'ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ',
    tithiRuleEn: '11 Harh, Sambat 2084 (Harh Vadhi 7 / 9 June 1716)',
    tithiRulePa: '੧੧ ਹਾੜ੍ਹ, ਸੰਮਤ ੨੦੮੪ (ਹਾੜ੍ਹ ਵਦੀ ੭ / ੯ ਜੂਨ ੧੭੧੬)',
    summaryEn:
      'Martyrdom of Baba Banda Singh Bahadur, his four-year-old son Baba Ajai Singh Ji, and companion Singhs at Mehrauli, Delhi (Sambat 1773) after establishing the first sovereign Khalsa Raj.',
    summaryPa:
      'ਪਹਿਲੇ ਖ਼ਾਲਸਾ ਰਾਜ ਦੇ ਬਾਨੀ ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ, ੪ ਸਾਲਾ ਸਪੁੱਤਰ ਬਾਬਾ ਅਜੈ ਸਿੰਘ ਜੀ ਅਤੇ ਸਾਥੀ ਸਿੰਘਾਂ ਦੀ ਮਹਿਰੌਲੀ ਦਿੱਲੀ (੧੧ ਹਾੜ੍ਹ, ਸੰਮਤ ੧੭੭੩) ਵਿਖੇ ਅਦੁੱਤੀ ਸ਼ਹਾਦਤ।',
    historicalContextEn:
      'Blessed with Amrit and five arrows by Sri Guru Gobind Singh Ji at Sri Hazur Sahib, Baba Banda Singh Bahadur conquered Sirhind (Fatehgarh Sahib), abolished zamindari, and struck sovereign coins in the name of Guru Nanak–Guru Gobind Singh. Captured at Gurdas Nangal, he endured unbearable torture at Mehrauli on 11 Harh, Sambat 1773 (1716 CE) without flinching.',
    historicalContextPa:
      'ਸ੍ਰੀ ਹਜ਼ੂਰ ਸਾਹਿਬ ਵਿਖੇ ਦਸਮੇਸ਼ ਪਿਤਾ ਜੀ ਤੋਂ ਅੰਮ੍ਰਿਤ ਛਕ ਕੇ ਸਰਹਿੰਦ ਫ਼ਤਹਿ ਕਰਨ ਅਤੇ ਗੁਰੂ ਨਾਨਕ–ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਦੇ ਨਾਮ ’ਤੇ ਖ਼ਾਲਸਾਈ ਸਿੱਕੇ ਜਾਰੀ ਕਰਨ ਵਾਲੇ ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ ਨੇ ੧੧ ਹਾੜ੍ਹ ਸੰਮਤ ੧੭੭੩ ਨੂੰ ਦਿੱਲੀ ਵਿਖੇ ਅਮਰ ਸ਼ਹਾਦਤ ਪ੍ਰਾਪਤ ਕੀਤੀ।',
    citations: [
      {
        sourceEn: 'Prachin Panth Prakash (Bhai Rattan Singh Bhangu)',
        sourcePa: 'ਪ੍ਰਾਚੀਨ ਪੰਥ ਪ੍ਰਕਾਸ਼ (ਭਾਈ ਰਤਨ ਸਿੰਘ ਭੰਗੂ)',
        referenceEn: 'Banda Singh Bahadur Shaheedi Prasang · Harh Sambat 1773',
        referencePa: 'ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ ਸ਼ਹੀਦੀ ਪ੍ਰਸੰਗ · ਹਾੜ੍ਹ ਸੰਮਤ ੧੭੭੩',
      },
    ],
  },
  {
    id: '2084-barsi-maharaja-ranjit-singh-ji',
    date: '2027-06-29',
    sambat: 2084,
    category: 'barsi',
    subGroups: ['gursikh'],
    titleEn: 'Barsi — Sher-e-Punjab Maharaja Ranjit Singh Ji (Sarkar-e-Khalsa)',
    titlePa: 'ਬਰਸੀ — ਸ਼ੇਰ-ਏ-ਪੰਜਾਬ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਜੀ (ਸਰਕਾਰ-ਏ-ਖ਼ਾਲਸਾ)',
    shortLabelEn: 'Maharaja Ranjit Singh Barsi',
    shortLabelPa: 'ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਬਰਸੀ',
    tithiRuleEn: '15 Harh, Sambat 2084 (15 Harh, Sambat 1896)',
    tithiRulePa: '੧੫ ਹਾੜ੍ਹ, ਸੰਮਤ ੨੦੮੪ (੧੫ ਹਾੜ੍ਹ, ਸੰਮਤ ੧੮੯੬)',
    summaryEn:
      'Annual Barsi of Sher-e-Punjab Maharaja Ranjit Singh Ji (1780–1839), founder of the sovereign Khalsa Empire (Sarkar-e-Khalsa) who gold-plated Sri Harmandir Sahib.',
    summaryPa:
      'ਸਰਕਾਰ-ਏ-ਖ਼ਾਲਸਾ ਦੇ ਬਾਨੀ ਅਤੇ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ’ਤੇ ਸੋਨੇ ਦੀ ਸੇਵਾ ਕਰਵਾਉਣ ਵਾਲੇ ਸ਼ੇਰ-ਏ-ਪੰਜਾਬ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਜੀ ਦੀ ਬਰਸੀ (੧੫ ਹਾੜ੍ਹ, ਸੰਮਤ ੧੮੯੬)।',
    historicalContextEn:
      'Ruling humbly in the name of the Khalsa ("Sarkar-e-Khalsa") and issuing Nanakshahi coinage, Maharaja Ranjit Singh Ji united Punjab from the Sutlej to the Khyber Pass and adorned Sri Harmandir Sahib with gold and marble before passing at Lahore on 15 Harh, Sambat 1896 (27 June 1839 CE).',
    historicalContextPa:
      'ਨਾਨਕਸ਼ਾਹੀ ਸਿੱਕਾ ਜਾਰੀ ਕਰਨ ਅਤੇ ਸਤਲੁਜ ਤੋਂ ਖ਼ੈਬਰ ਤੱਕ ਖ਼ਾਲਸਾ ਰਾਜ ਕਾਇਮ ਕਰਨ ਵਾਲੇ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਜੀ ੧੫ ਹਾੜ੍ਹ ਸੰਮਤ ੧੮੯੬ ਨੂੰ ਲਾਹੌਰ ਵਿਖੇ ਚਲਾਣਾ ਕਰ ਗਏ।',
    citations: [
      {
        sourceEn: 'Mahan Kosh & Umdat-ut-Tawarikh',
        sourcePa: 'ਮਹਾਨ ਕੋਸ਼ ਅਤੇ ਉਮਦਤ-ਉਤ-ਤਵਾਰੀਖ਼',
        referenceEn: 'Entry: Ranjit Singh Maharaja · 15 Harh, Sambat 1896 (Lahore)',
        referencePa: 'ਇੰਦਰਾਜ: ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ · ੧੫ ਹਾੜ੍ਹ, ਸੰਮਤ ੧੮੯੬ (ਲਾਹੌਰ)',
      },
    ],
  },
  {
    id: '2084-solar-parkash-guru-hargobind-mata-ganga-ji',
    date: '2027-06-30',
    sambat: 2084,
    category: 'gurpurab',
    subGroups: ['guru-ghar'],
    titleEn: 'Solar Parkash Date — Sri Guru Hargobind Sahib Ji & Mata Ganga Ji Heritage (16 Harh)',
    titlePa: 'ਸੂਰਜੀ ਪ੍ਰਕਾਸ਼ ਮਿਤੀ — ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਅਤੇ ਮਾਤਾ ਗੰਗਾ ਜੀ ਵਿਰਾਸਤ (੧੬ ਹਾੜ੍ਹ)',
    shortLabelEn: '16 Harh · Guru Hargobind & Mata Ganga',
    shortLabelPa: '੧੬ ਹਾੜ੍ਹ · ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਤੇ ਮਾਤਾ ਗੰਗਾ',
    tithiRuleEn: '16 Harh, Sambat 2084 (Solar Date · Lunar Harh Vadhi 6 on 25 Jun)',
    tithiRulePa: '੧੬ ਹਾੜ੍ਹ, ਸੰਮਤ ੨੦੮੪ (ਸੂਰਜੀ ਮਿਤੀ · ਚੰਦਰ ਹਾੜ੍ਹ ਵਦੀ ੬ — ੨੫ ਜੂਨ)',
    summaryEn:
      'Puratan solar Parkash date (16 Harh) of Sixth Patshah Sri Guru Hargobind Sahib Ji at Wadali Guru, honoring Sri Guru Arjan Dev Ji and Mata Ganga Ji’s Guru Ghar.',
    summaryPa:
      'ਗੁਰੂ ਕੀ ਵਡਾਲੀ ਵਿਖੇ ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਅਤੇ ਮਾਤਾ ਗੰਗਾ ਜੀ ਦੇ ਗ੍ਰਹਿ ਛੇਵੇਂ ਪਾਤਸ਼ਾਹ ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਦੀ ਸੂਰਜੀ ਪ੍ਰਕਾਸ਼ ਮਿਤੀ (੧੬ ਹਾੜ੍ਹ)।',
    historicalContextEn:
      'Honoring Mata Ganga Ji’s humble barefoot journey to Bir Baba Budha Sahib carrying missi roti and lassi, where Brahmgyani Baba Budha Ji blessed her with the birth of Miri-Piri Patshah Sri Guru Hargobind Sahib Ji (SGGS Ang 396: "Satgur saachai deeaa bhej"). The lunar Gurpurab (Harh Vadhi 6) falls on 25 June 2027.',
    historicalContextPa:
      'ਮਾਤਾ ਗੰਗਾ ਜੀ ਦੀ ਨਿਮਰਤਾ ਭਰੀ ਸੇਵਾ ਉਪਰੰਤ ਬਾਬਾ ਬੁੱਢਾ ਜੀ ਦੇ ਵਰ ਸਦਕਾ ਗੁਰੂ ਕੀ ਵਡਾਲੀ ਵਿਖੇ ਮੀਰੀ-ਪੀਰੀ ਦੇ ਮਾਲਕ ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਹੋਇਆ (ਅੰਗ ੩੯੬: ‘ਸਤਿਗੁਰ ਸਾਚੈ ਦੀਆ ਭੇਜਿ’)।',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ',
        referenceEn: 'Ang 396 · Raag Asa Mahalla 5 (Birth of Sri Guru Hargobind Sahib Ji)',
        referencePa: 'ਅੰਗ ੩੯੬ · ਰਾਗ ਆਸਾ ਮਹਲਾ ੫ (ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਪ੍ਰਕਾਸ਼)',
        excerptPa: 'ਸਤਿਗੁਰ ਸਾਚੈ ਦੀਆ ਭੇਜਿ ॥ ਚਿਰੁ ਜੀਵਨੁ ਉਪਜਿਆ ਸੰਜੋਗਿ ॥',
        excerptTranslit: 'Satgur saachai deeaa bhej, chir jeevan upjiaa sanjog.',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=396',
        pothiLabelEn: 'Read Asa Mahalla 5 (Ang 396)',
        pothiLabelPa: 'ਪੋਥੀ ਸਾਹਿਬ ’ਤੇ ਆਸਾ ਮਹਲਾ ੫ (ਅੰਗ ੩੯੬) ਪੜ੍ਹੋ',
      },
    ],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=396',
    pothiLabelEn: 'Read Asa Mahalla 5 (Ang 396)',
    pothiLabelPa: 'ਆਸਾ ਮਹਲਾ ੫ (ਅੰਗ ੩੯੬) ਪੜ੍ਹੋ',
  },
  {
    id: '2084-shaheedi-bhai-mani-singh-ji',
    date: '2027-07-09',
    sambat: 2084,
    category: 'shaheedi',
    subGroups: ['gursikh'],
    titleEn: 'Shaheedi Divas — Shaheed-e-Azam Bhai Mani Singh Ji (Band-Band Katwana)',
    titlePa: 'ਸ਼ਹੀਦੀ ਦਿਵਸ — ਸ਼ਹੀਦ-ਏ-ਆਜ਼ਮ ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ (ਬੰਦ-ਬੰਦ ਕਟਵਾਉਣਾ)',
    shortLabelEn: 'Bhai Mani Singh Ji Shaheedi',
    shortLabelPa: 'ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਸ਼ਹੀਦੀ',
    tithiRuleEn: '25 Harh, Sambat 2084 (Nakhas Chowk, Lahore · Sambat 1791/1794)',
    tithiRulePa: '੨੫ ਹਾੜ੍ਹ, ਸੰਮਤ ੨੦੮੪ (ਨਖ਼ਾਸ ਚੌਕ, ਲਾਹੌਰ · ਸੰਮਤ ੧੭੯੧/੧੭੯੪)',
    summaryEn:
      'Martyrdom of Head Granthi of Sri Harmandir Sahib and scribe of Damdami Bir, Bhai Mani Singh Ji, who was dismembered joint by joint (band-band) in Lahore.',
    summaryPa:
      'ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦੇ ਮੁੱਖ ਗ੍ਰੰਥੀ ਅਤੇ ਦਮਦਮੀ ਬੀੜ ਦੇ ਲਿਖਾਰੀ ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਦੀ ਲਾਹੌਰ ਵਿਖੇ ਬੰਦ-ਬੰਦ ਕਟਵਾ ਕੇ ਅਦੁੱਤੀ ਸ਼ਹਾਦਤ (੨੫ ਹਾੜ੍ਹ)।',
    historicalContextEn:
      'Scribe of the Damdami Bir dictated by Sri Guru Gobind Singh Ji at Talwandi Sabo and revered Head Granthi of Sri Harmandir Sahib, Bhai Mani Singh Ji calmly reminded his executioner at Nakhas Chowk, Lahore to begin from the finger joints when ordered dismembered joint-by-joint (Sambat 1791/1794 per Bhatt Vahis and Prachin Panth Prakash).',
    historicalContextPa:
      'ਦਮਦਮੀ ਬੀੜ ਦੇ ਲਿਖਾਰੀ ਅਤੇ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦੇ ਮੁੱਖ ਗ੍ਰੰਥੀ ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਨੇ ਲਾਹੌਰ ਦੇ ਨਖ਼ਾਸ ਚੌਕ ਵਿੱਚ ਬੰਦ-ਬੰਦ ਕਟਵਾ ਕੇ ਸਿੱਖੀ ਸਿਦਕ ਨਿਭਾਇਆ (ਭੱਟ ਵਹੀਆਂ ਅਤੇ ਪ੍ਰਾਚੀਨ ਪੰਥ ਪ੍ਰਕਾਸ਼ ਵਿੱਚ ੨੫ ਹਾੜ੍ਹ ਦਰਜ ਹੈ)।',
    citations: [
      {
        sourceEn: 'Prachin Panth Prakash (Bhai Rattan Singh Bhangu)',
        sourcePa: 'ਪ੍ਰਾਚੀਨ ਪੰਥ ਪ੍ਰਕਾਸ਼ (ਭਾਈ ਰਤਨ ਸਿੰਘ ਭੰਗੂ)',
        referenceEn: 'Bhai Mani Singh Ji Shaheedi Prasang · Lahore',
        referencePa: 'ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਸ਼ਹੀਦੀ ਪ੍ਰਸੰਗ · ਲਾਹੌਰ',
      },
    ],
  },
  {
    id: '2084-shaheedi-bhai-taru-singh-ji',
    date: '2027-07-17',
    sambat: 2084,
    category: 'shaheedi',
    subGroups: ['gursikh'],
    titleEn: 'Shaheedi Divas — Shaheed Bhai Taru Singh Ji (Khopri Lahuani)',
    titlePa: 'ਸ਼ਹੀਦੀ ਦਿਵਸ — ਸ਼ਹੀਦ ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ (ਖੋਪਰੀ ਲੁਹਾਉਣੀ)',
    shortLabelEn: 'Bhai Taru Singh Ji Shaheedi',
    shortLabelPa: 'ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਸ਼ਹੀਦੀ',
    tithiRuleEn: '1 Sawan, Sambat 2084 (1 Sawan, Sambat 1802)',
    tithiRulePa: '੧ ਸਾਵਣ, ਸੰਮਤ ੨੦੮੪ (੧ ਸਾਵਣ, ਸੰਮਤ ੧੮੦੨)',
    summaryEn:
      'Supreme martyrdom of 25-year-old Bhai Taru Singh Ji of Poola, who chose to have his scalp removed rather than cut his sacred Kesh in Zakariya Khan’s court in Lahore.',
    summaryPa:
      'ਪਿੰਡ ਪੂਹਲਾ ਦੇ ੨੫ ਸਾਲਾ ਸੂਰਮੇ ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਦੀ ਸ਼ਹਾਦਤ, ਜਿਨ੍ਹਾਂ ਨੇ ਜ਼ਕਰੀਆ ਖ਼ਾਨ ਦੀ ਕਚਹਿਰੀ ਵਿੱਚ ਕੇਸ ਕਟਵਾਉਣ ਦੀ ਬਜਾਏ ਖੋਪਰੀ ਲੁਹਾਉਣੀ ਪ੍ਰਵਾਨ ਕੀਤੀ (੧ ਸਾਵਣ, ਸੰਮਤ ੧੮੦੨)।',
    historicalContextEn:
      'Arrested for feeding persecuted Singhs from his modest farm at Poola (Majha), Bhai Taru Singh Ji smiled as the executioner removed his scalp with a shoemaker’s rambi while he recited Japji Sahib, surviving 22 days until Zakariya Khan died first—attaining Shaheedi on 1 Sawan, Sambat 1802 (1 July 1745 CE).',
    historicalContextPa:
      'ਜੰਗਲਾਂ ਵਿੱਚ ਰਹਿੰਦੇ ਸਿੰਘਾਂ ਦੀ ਲੰਗਰ ਸੇਵਾ ਕਰਨ ਕਾਰਨ ਗ੍ਰਿਫ਼ਤਾਰ ਹੋਏ ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਨੇ ਜਪੁਜੀ ਸਾਹਿਬ ਪੜ੍ਹਦਿਆਂ ਖੋਪਰੀ ਲੁਹਾਈ ਅਤੇ ੧ ਸਾਵਣ ਸੰਮਤ ੧੮੦੨ ਨੂੰ ਸ਼ਹੀਦੀ ਪ੍ਰਾਪਤ ਕੀਤੀ।',
    citations: [
      {
        sourceEn: 'Prachin Panth Prakash (Bhai Rattan Singh Bhangu)',
        sourcePa: 'ਪ੍ਰਾਚੀਨ ਪੰਥ ਪ੍ਰਕਾਸ਼ (ਭਾਈ ਰਤਨ ਸਿੰਘ ਭੰਗੂ)',
        referenceEn: 'Shaheedi Bhai Taru Singh Ji · 1 Sawan, Sambat 1802',
        referencePa: 'ਸ਼ਹੀਦੀ ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ · ੧ ਸਾਵਣ, ਸੰਮਤ ੧੮੦੨',
      },
    ],
  },
  {
    id: '2084-solar-parkash-guru-harkrishan-guru-har-rai-parivar',
    date: '2027-08-08',
    sambat: 2084,
    category: 'gurpurab',
    subGroups: ['guru-ghar'],
    titleEn: 'Solar Parkash Date — Sri Guru Harkrishan Sahib Ji (23 Sawan · Guru Har Rai Sahib Parivar)',
    titlePa: 'ਸੂਰਜੀ ਪ੍ਰਕਾਸ਼ ਮਿਤੀ — ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਕ੍ਰਿਸ਼ਨ ਸਾਹਿਬ ਜੀ (੨੩ ਸਾਵਣ · ਗੁਰੂ ਹਰਿਰਾਇ ਸਾਹਿਬ ਪਰਿਵਾਰ)',
    shortLabelEn: '23 Sawan · Guru Harkrishan Ji',
    shortLabelPa: '੨੩ ਸਾਵਣ · ਗੁਰੂ ਹਰਿਕ੍ਰਿਸ਼ਨ ਜੀ',
    tithiRuleEn: '23 Sawan, Sambat 2084 (Solar Date · Lunar Sawan Vadhi 9 on 28 Jul)',
    tithiRulePa: '੨੩ ਸਾਵਣ, ਸੰਮਤ ੨੦੮੪ (ਸੂਰਜੀ ਮਿਤੀ · ਚੰਦਰ ਸਾਵਣ ਵਦੀ ੯ — ੨੮ ਜੁਲਾਈ)',
    summaryEn:
      'Puratan solar Parkash date (23 Sawan, Sambat 1713) of Eighth Patshah Sri Guru Harkrishan Sahib Ji at Kiratpur Sahib, honoring Guru Har Rai Sahib Ji’s Parivar (Mata Krishan Kaur Ji & historical note on elder brother Baba Ram Rai Ji).',
    summaryPa:
      'ਕੀਰਤਪੁਰ ਸਾਹਿਬ ਵਿਖੇ ਗੁਰੂ ਹਰਿਰਾਇ ਸਾਹਿਬ ਜੀ ਅਤੇ ਮਾਤਾ ਕ੍ਰਿਸ਼ਨ ਕੌਰ ਜੀ ਦੇ ਗ੍ਰਹਿ ਅੱਠਵੇਂ ਪਾਤਸ਼ਾਹ ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਕ੍ਰਿਸ਼ਨ ਸਾਹਿਬ ਜੀ ਦੀ ਸੂਰਜੀ ਪ੍ਰਕਾਸ਼ ਮਿਤੀ (੨੩ ਸਾਵਣ, ਸੰਮਤ ੧੭੧੩)।',
    historicalContextEn:
      'Born at Kiratpur Sahib on Sawan Vadhi 9 / 23 Sawan, Sambat 1713 (1656 CE) to Sri Guru Har Rai Sahib Ji and Mata Krishan Kaur Ji. When elder brother Baba Ram Rai Ji altered a single word of Gurbani ("Mitti Musalman Ki") at Aurangzeb’s court, Seventh Patshah upheld the inviolability of Gurbani and bestowed Guruship upon five-year-old Sri Guru Harkrishan Sahib Ji.',
    historicalContextPa:
      'ਸਾਵਣ ਵਦੀ ੯ (੨੩ ਸਾਵਣ), ਸੰਮਤ ੧੭੧੩ ਨੂੰ ਕੀਰਤਪੁਰ ਸਾਹਿਬ ਵਿਖੇ ਪ੍ਰਕਾਸ਼ ਧਾਰਨ ਵਾਲੇ ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਕ੍ਰਿਸ਼ਨ ਸਾਹਿਬ ਜੀ ਨੂੰ ਗੁਰਬਾਣੀ ਦੀ ਅਟੱਲ ਪਵਿੱਤਰਤਾ ਕਾਇਮ ਰੱਖਦਿਆਂ ਸੱਤਵੇਂ ਪਾਤਸ਼ਾਹ ਜੀ ਨੇ ਗੁਰਿਆਈ ਬਖ਼ਸ਼ੀ (ਵੱਡੇ ਭਰਾਤਾ ਬਾਬਾ ਰਾਮ ਰਾਇ ਜੀ ਵੱਲੋਂ ਔਰੰਗਜ਼ੇਬ ਦੇ ਦਰਬਾਰ ਵਿੱਚ ਗੁਰਬਾਣੀ ਤੁਕ ਬਦਲਣ ਉਪਰੰਤ)।',
    citations: [
      {
        sourceEn: 'Bhatt Vahi & Sri Gur Pratap Suraj Granth',
        sourcePa: 'ਭੱਟ ਵਹੀ ਅਤੇ ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ',
        referenceEn: 'Raas 10 · Kiratpur Sahib Parivar (Sawan Vadhi 9 / 23 Sawan, 1713)',
        referencePa: 'ਰਾਸਿ ੧੦ · ਕੀਰਤਪੁਰ ਸਾਹਿਬ ਪਰਿਵਾਰ (ਸਾਵਣ ਵਦੀ ੯ / ੨੩ ਸਾਵਣ, ੧੭੧੩)',
      },
    ],
  },
  {
    id: '2084-all-11-bhatt-sahibaan-sggs',
    date: '2027-08-18',
    sambat: 2084,
    category: 'khalsa',
    subGroups: ['bhagat-bhatt'],
    titleEn: 'All 11 Bhatt Sahibaan — Bhatt De Swayye (SGGS Ang 1389–1409)',
    titlePa: 'ਸਮੂਹ ੧੧ ਭੱਟ ਸਾਹਿਬਾਨ — ਭੱਟਾਂ ਦੇ ਸਵੱਈਏ (ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਅੰਗ ੧੩੮੯–੧੪੦੯)',
    shortLabelEn: '11 Bhatt Sahibaan (SGGS)',
    shortLabelPa: '੧੧ ਭੱਟ ਸਾਹਿਬਾਨ (ਸਵੱਈਏ)',
    tithiRuleEn: '2 Bhadon, Sambat 2084 (Adi Bir Completion · Bhatt Vahis Note)',
    tithiRulePa: '੨ ਭਾਦੋਂ, ਸੰਮਤ ੨੦੮੪ (ਆਦਿ ਬੀੜ ਸੰਪੂਰਨਤਾ · ਭੱਟ ਵਹੀ ਨੋਟ)',
    summaryEn:
      'Commemorating all 11 Bhatt Sahibaan whose 123 Swayye grace Sri Guru Granth Sahib Ji (Ang 1389–1409): Bhatt Kalh, Jalap, Kirat, Bhikha, Salh, Bhalh, Nalh, Gayand, Mathura, Balh, and Harbans.',
    summaryPa:
      'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ (ਅੰਗ ੧੩੮੯–੧੪੦੯) ਵਿੱਚ ੧੨੩ ਸਵੱਈਏ ਉਚਾਰਨ ਵਾਲੇ ਸਮੂਹ ੧੧ ਭੱਟ ਸਾਹਿਬਾਨ: ਭੱਟ ਕਲ੍ਹ, ਜਾਲਪ, ਕੀਰਤ, ਭਿਖਾ, ਸਲ੍ਹ, ਭਲ੍ਹ, ਨਲ੍ਹ, ਗਯੰਦ, ਮਥੁਰਾ, ਬਲ੍ਹ ਅਤੇ ਹਰਿਬੰਸ।',
    historicalContextEn:
      'Enshrined in the Adi Bir completed on Bhadon Vadhi 1, Sambat 1661 (2 Bhadon), the 11 Bhatt Sahibaan—Kalh (54 Swayye), Jalap (5), Kirat (8), Bhikha (2), Salh (3), Bhalh (1), Nalh (16), Gayand (13), Mathura (14), Balh (5), and Harbans (2)—bore eyewitness poetic testimony to the One Eternal Jyot across the first five Guru Sahibs. Historical note per Bhatt Vahis & Mahan Kosh: exact individual birth/passing days of the 11 Bhatts are not preserved in surviving manuscripts.',
    historicalContextPa:
      'ਭਾਦੋਂ ਵਦੀ ੧, ਸੰਮਤ ੧੬੬੧ ਨੂੰ ਸੰਪੂਰਨ ਹੋਈ ਆਦਿ ਬੀੜ ਵਿੱਚ ੧੧ ਭੱਟ ਸਾਹਿਬਾਨ—ਕਲ੍ਹ (੫੪), ਜਾਲਪ (੫), ਕੀਰਤ (੮), ਭਿਖਾ (੨), ਸਲ੍ਹ (੩), ਭਲ੍ਹ (੧), ਨਲ੍ਹ (੧੬), ਗਯੰਦ (੧੩), ਮਥੁਰਾ (੧੪), ਬਲ੍ਹ (੫) ਅਤੇ ਹਰਿਬੰਸ (੨)—ਨੇ ਪੰਜ ਗੁਰੂ ਸਾਹਿਬਾਨ ਦੀ ਏਕ ਜੋਤਿ ਦੀ ਮਹਿਮਾ ਗਾਈ। ਭੱਟ ਵਹੀਆਂ ਅਤੇ ਮਹਾਨ ਕੋਸ਼ ਅਨੁਸਾਰ ਇਨ੍ਹਾਂ ਦੀਆਂ ਵੱਖੋ-ਵੱਖਰੀਆਂ ਜਨਮ ਤਾਰੀਖ਼ਾਂ ਉਪਲਬਧ ਨਹੀਂ ਹਨ।',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ',
        referenceEn: 'Ang 1389–1409 · Savaiye Sri Mukhbak & Bhatt De Swayye (11 Bhatts)',
        referencePa: 'ਅੰਗ ੧੩੮੯–੧੪੦੯ · ਭੱਟਾਂ ਦੇ ਸਵੱਈਏ (੧੧ ਭੱਟ ਸਾਹਿਬਾਨ)',
        excerptPa: 'ਇਕਿ ਮਨਿ ਪੁਰਖੁ ਧਿਆਇ ਬਰਦਾਤਾ ॥ ਸੰਤ ਸਹਾਰੁ ਸਦਾ ਬਿਖਿਆਤਾ ॥',
        excerptTranslit: 'Ik man purakh dhiaai bardaataa, sant sahaar sadaa bikhiaataa.',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=1389',
        pothiLabelEn: 'Read Bhatt De Swayye (Ang 1389)',
        pothiLabelPa: 'ਪੋਥੀ ਸਾਹਿਬ ’ਤੇ ਭੱਟਾਂ ਦੇ ਸਵੱਈਏ (ਅੰਗ ੧੩੮੯) ਪੜ੍ਹੋ',
      },
      {
        sourceEn: 'Bhatt Vahis & Mahan Kosh',
        sourcePa: 'ਭੱਟ ਵਹੀਆਂ ਅਤੇ ਮਹਾਨ ਕੋਸ਼',
        referenceEn: 'Entry: Bhatt (ਭੱਟ) · 11 Bani-kars of SGGS Ji',
        referencePa: 'ਇੰਦਰਾਜ: ਭੱਟ · ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਦੇ ੧੧ ਭੱਟ ਬਾਣੀਕਾਰ',
      },
    ],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=1389',
    pothiLabelEn: 'Read Bhatt De Swayye (Ang 1389)',
    pothiLabelPa: 'ਭੱਟਾਂ ਦੇ ਸਵੱਈਏ (ਅੰਗ ੧੩੮੯) ਪੜ੍ਹੋ',
  },
  {
    id: '2084-janam-bhai-daya-singh-ji-panj-pyare',
    date: '2027-08-26',
    sambat: 2084,
    category: 'khalsa',
    subGroups: ['gursikh'],
    titleEn: 'Janam Divas — Bhai Daya Singh Ji (First of the Panj Pyare)',
    titlePa: 'ਜਨਮ ਦਿਵਸ — ਭਾਈ ਦਇਆ ਸਿੰਘ ਜੀ (ਪਹਿਲੇ ਪੰਜ ਪਿਆਰੇ)',
    shortLabelEn: 'Bhai Daya Singh Ji Janam',
    shortLabelPa: 'ਭਾਈ ਦਇਆ ਸਿੰਘ ਜੀ ਜਨਮ',
    tithiRuleEn: '10 Bhadon, Sambat 2084',
    tithiRulePa: '੧੦ ਭਾਦੋਂ, ਸੰਮਤ ੨੦੮੪',
    summaryEn:
      'Birth anniversary of Bhai Daya Singh Ji of Lahore (10 Bhadon, Sambat 1718), first Sikh to rise and offer his head on Vaisakhi 1699 and bearer of the Zafarnama to Aurangzeb.',
    summaryPa:
      '੧੬੯੯ ਦੀ ਵੈਸਾਖੀ ’ਤੇ ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਸੀਸ ਭੇਟ ਕਰਨ ਵਾਲੇ ਅਤੇ ਜ਼ਫ਼ਰਨਾਮਾ ਔਰੰਗਜ਼ੇਬ ਤੱਕ ਪਹੁੰਚਾਉਣ ਵਾਲੇ ਭਾਈ ਦਇਆ ਸਿੰਘ ਜੀ (ਲਾਹੌਰ) ਦਾ ਜਨਮ ਦਿਵਸ (੧੦ ਭਾਦੋਂ, ਸੰਮਤ ੧੭੧੮)।',
    historicalContextEn:
      'Born on 10 Bhadon, Sambat 1718 (1661 CE) in Lahore, Bhai Daya Ram was the first of the Panj Pyare to answer Sri Guru Gobind Singh Ji’s call on Vaisakhi 1699. He fought at Anandpur and Chamkaur, delivered the Zafarnama across India to Aurangzeb in Ahmednagar, authored the Rehatnama, and merged into Eternal Light at Sri Hazur Sahib in 1708 CE.',
    historicalContextPa:
      '੧੦ ਭਾਦੋਂ ਸੰਮਤ ੧੭੧੮ ਨੂੰ ਲਾਹੌਰ ਵਿਖੇ ਜਨਮੇ ਭਾਈ ਦਇਆ ਸਿੰਘ ਜੀ ਨੇ ਵੈਸਾਖੀ ੧੬੯੯ ਨੂੰ ਪਹਿਲਾ ਸੀਸ ਭੇਟ ਕੀਤਾ, ਜ਼ਫ਼ਰਨਾਮਾ ਔਰੰਗਜ਼ੇਬ ਤੱਕ ਪਹੁੰਚਾਇਆ ਅਤੇ ਸ੍ਰੀ ਹਜ਼ੂਰ ਸਾਹਿਬ ਵਿਖੇ ਜੋਤੀ ਜੋਤ ਸਮਾਏ।',
    citations: [
      {
        sourceEn: 'Bhatt Vahi & Mahan Kosh',
        sourcePa: 'ਭੱਟ ਵਹੀ ਅਤੇ ਮਹਾਨ ਕੋਸ਼',
        referenceEn: 'Entry: Daya Singh (Panj Pyare) · 10 Bhadon, Sambat 1718',
        referencePa: 'ਇੰਦਰਾਜ: ਦਇਆ ਸਿੰਘ (ਪੰਜ ਪਿਆਰੇ) · ੧੦ ਭਾਦੋਂ, ਸੰਮਤ ੧੭੧੮',
      },
    ],
  },
  {
    id: '2084-bhagat-bani-trilochan-beni-bhikhan-sadhna-parmanand-surdas',
    date: '2027-09-01',
    sambat: 2084,
    category: 'khalsa',
    subGroups: ['bhagat-bhatt'],
    titleEn: 'Bhagat Bani Commemoration — Bhagat Trilochan, Beni, Bhikhan, Sadhna, Parmanand & Surdas Ji',
    titlePa: 'ਭਗਤ ਬਾਣੀ ਯਾਦਗਾਰ — ਭਗਤ ਤ੍ਰਿਲੋਚਨ, ਬੇਣੀ, ਭੀਖਨ, ਸਧਨਾ, ਪਰਮਾਨੰਦ ਅਤੇ ਸੂਰਦਾਸ ਜੀ',
    shortLabelEn: '6 Bhagat Sahibaan (SGGS)',
    shortLabelPa: '੬ ਭਗਤ ਸਾਹਿਬਾਨ (ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ)',
    tithiRuleEn: '16 Bhadon, Sambat 2084 (Pehla Parkash SGGS · Mahan Kosh Note)',
    tithiRulePa: '੧੬ ਭਾਦੋਂ, ਸੰਮਤ ੨੦੮੪ (ਪਹਿਲਾ ਪ੍ਰਕਾਸ਼ · ਮਹਾਨ ਕੋਸ਼ ਨੋਟ)',
    summaryEn:
      'Commemorating the six SGGS Bhagat Sahibaan whose exact birth days are unrecorded in Puratan chronicles: Bhagat Trilochan Ji (Ang 92, 525, 695), Bhagat Beni Ji (Ang 93, 489, 1351), Bhagat Bhikhan Ji (Ang 659), Bhagat Sadhna Ji (Ang 858), Bhagat Parmanand Ji (Ang 1253), and Bhagat Surdas Ji (Ang 1253).',
    summaryPa:
      'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੇ ਛੇ ਭਗਤ ਸਾਹਿਬਾਨ ਜਿਨ੍ਹਾਂ ਦੀਆਂ ਸਹੀ ਜਨਮ ਤਾਰੀਖ਼ਾਂ ਪੁਰਾਤਨ ਗ੍ਰੰਥਾਂ ਵਿੱਚ ਅਪ੍ਰਾਪਤ ਹਨ: ਭਗਤ ਤ੍ਰਿਲੋਚਨ ਜੀ (ਅੰਗ ੯੨, ੫੨੫, ੬੯੫), ਭਗਤ ਬੇਣੀ ਜੀ (ਅੰਗ ੯੩, ੪੮੯, ੧੩੫੧), ਭਗਤ ਭੀਖਨ ਜੀ (ਅੰਗ ੬੫੯), ਭਗਤ ਸਧਨਾ ਜੀ (ਅੰਗ ੮੫੮), ਭਗਤ ਪਰਮਾਨੰਦ ਜੀ (ਅੰਗ ੧੨੫੩) ਅਤੇ ਭਗਤ ਸੂਰਦਾਸ ਜੀ (ਅੰਗ ੧੨੫੩)।',
    historicalContextEn:
      'Honored on Pehla Parkash Purab of Sri Guru Granth Sahib Ji (Bhadon Sudhi 1 / 16 Bhadon) because Mahan Kosh and Puratan chronicles do not preserve fixed birth days for these six Bhagat Sahibaan: Bhagat Trilochan Ji (4 Shabads, Ang 92, 525–526, 695), Bhagat Beni Ji (3 Shabads, Ang 93, 489, 1351), Bhagat Bhikhan Ji (2 Shabads in Sorath, Ang 659), Bhagat Sadhna Ji (1 Shabad in Bilawal, Ang 858), Bhagat Parmanand Ji (1 Shabad in Sarang, Ang 1253), and Bhagat Surdas Ji (1 Tuk & Shabad in Sarang, Ang 1253).',
    historicalContextPa:
      'ਮਹਾਨ ਕੋਸ਼ ਅਨੁਸਾਰ ਇਨ੍ਹਾਂ ਛੇ ਭਗਤ ਸਾਹਿਬਾਨ ਦੀਆਂ ਸਹੀ ਜਨਮ ਤਾਰੀਖ਼ਾਂ ਪੁਰਾਤਨ ਲਿਖਤਾਂ ਵਿੱਚ ਸੁਰੱਖਿਅਤ ਨਹੀਂ ਹਨ, ਇਸ ਲਈ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੇ ਪਹਿਲੇ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ (੧੬ ਭਾਦੋਂ) ’ਤੇ ਆਪ ਜੀ ਦੀ ਬਾਣੀ ਨੂੰ ਸਿਜਦਾ ਕੀਤਾ ਜਾਂਦਾ ਹੈ: ਭਗਤ ਤ੍ਰਿਲੋਚਨ ਜੀ (ਅੰਗ ੯੨, ੫੨੫, ੬੯੫), ਭਗਤ ਬੇਣੀ ਜੀ (ਅੰਗ ੯੩, ੪੮੯, ੧੩੫੧), ਭਗਤ ਭੀਖਨ ਜੀ (ਅੰਗ ੬੫੯), ਭਗਤ ਸਧਨਾ ਜੀ (ਅੰਗ ੮੫੮), ਭਗਤ ਪਰਮਾਨੰਦ ਜੀ (ਅੰਗ ੧੨੫੩) ਅਤੇ ਭਗਤ ਸੂਰਦਾਸ ਜੀ (ਅੰਗ ੧੨੫੩)।',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ',
        referenceEn: 'Ang 92, 93, 489, 525, 659, 695, 858, 1253, 1351 · Bhagat Bani',
        referencePa: 'ਅੰਗ ੯੨, ੯੩, ੪੮੯, ੫੨੫, ੬੫੯, ੬੯੫, ੮੫੮, ੧੨੫੩, ੧੩੫੧ · ਭਗਤ ਬਾਣੀ',
        excerptPa: 'ਨੈਨਹੁ ਨੀਰੁ ਬਹੈ ਤਨੁ ਖੀਨਾ ਭਏ ਕੇਸ ਦੁਧ ਵਾਨੀ ॥',
        excerptTranslit: 'Nainahu neer bahai tan kheenaa bhae kes dudh vaanee (Bhagat Bhikhan Ji, Ang 659).',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=659',
        pothiLabelEn: 'Read Bhagat Bhikhan Ji Bani (Ang 659)',
        pothiLabelPa: 'ਪੋਥੀ ਸਾਹਿਬ ’ਤੇ ਭਗਤ ਭੀਖਨ ਜੀ ਬਾਣੀ (ਅੰਗ ੬੫੯) ਪੜ੍ਹੋ',
      },
      {
        sourceEn: 'Mahan Kosh (Bhai Kahn Singh Nabha)',
        sourcePa: 'ਮਹਾਨ ਕੋਸ਼ (ਭਾਈ ਕਾਨ੍ਹ ਸਿੰਘ ਨਾਭਾ)',
        referenceEn: 'Entries: Trilochan, Beni, Bhikhan, Sadhna, Parmanand, Surdas',
        referencePa: 'ਇੰਦਰਾਜ: ਤ੍ਰਿਲੋਚਨ, ਬੇਣੀ, ਭੀਖਨ, ਸਧਨਾ, ਪਰਮਾਨੰਦ, ਸੂਰਦਾਸ',
      },
    ],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=659',
    pothiLabelEn: 'Read Bhagat Bani on Pothi (Ang 659)',
    pothiLabelPa: 'ਪੋਥੀ ਸਾਹਿਬ ’ਤੇ ਭਗਤ ਬਾਣੀ (ਅੰਗ ੬੫੯) ਪੜ੍ਹੋ',
  },
  {
    id: '2084-bhai-satta-bhai-balwand-ji',
    date: '2027-09-01',
    sambat: 2084,
    category: 'khalsa',
    subGroups: ['bhagat-bhatt', 'gursikh'],
    titleEn: 'Gursikh Bani-kars — Bhai Satta Ji & Bhai Balwand Ji (Ramkali Ki Vaar, SGGS Ang 966)',
    titlePa: 'ਗੁਰਸਿੱਖ ਬਾਣੀਕਾਰ — ਭਾਈ ਸੱਤਾ ਜੀ ਅਤੇ ਭਾਈ ਬਲਵੰਡ ਜੀ (ਰਾਮਕਲੀ ਕੀ ਵਾਰ, ਅੰਗ ੯੬੬)',
    shortLabelEn: 'Bhai Satta & Balwand Ji',
    shortLabelPa: 'ਭਾਈ ਸੱਤਾ ਤੇ ਬਲਵੰਡ ਜੀ',
    tithiRuleEn: '16 Bhadon, Sambat 2084 (Pehla Parkash SGGS · Mahan Kosh Note)',
    tithiRulePa: '੧੬ ਭਾਦੋਂ, ਸੰਮਤ ੨੦੮੪ (ਪਹਿਲਾ ਪ੍ਰਕਾਸ਼ · ਮਹਾਨ ਕੋਸ਼ ਨੋਟ)',
    summaryEn:
      'Honoring court Rababis and SGGS Gursikh Bani-kars Bhai Satta Ji & Bhai Balwand Ji, authors of Ramkali Ki Vaar (Tikke Di Vaar, Ang 966–968) praising the Guru Gaddi succession.',
    summaryPa:
      'ਗੁਰੂ ਦਰਬਾਰ ਦੇ ਰਬਾਬੀ ਅਤੇ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਦੇ ਗੁਰਸਿੱਖ ਬਾਣੀਕਾਰ ਭਾਈ ਸੱਤਾ ਜੀ ਅਤੇ ਭਾਈ ਬਲਵੰਡ ਜੀ ਦੀ ਯਾਦਗਾਰ — ਰਾਮਕਲੀ ਕੀ ਵਾਰ (ਟਿੱਕੇ ਦੀ ਵਾਰ, ਅੰਗ ੯੬੬–੯੬੮)।',
    historicalContextEn:
      'Serving as Rababis from Sri Guru Angad Dev Ji through Sri Guru Arjan Dev Ji, Bhai Balwand Ji and Bhai Satta Ji composed the eight Pauris of Ramkali Ki Vaar (Ang 966–968), celebrating the spiritual succession from Guru Nanak Dev Ji to Guru Arjan Dev Ji and Mata Khivi Ji’s Langar. Historical note per Mahan Kosh: exact individual birth/passing dates are unrecorded in Puratan sources.',
    historicalContextPa:
      'ਦੂਜੇ ਤੋਂ ਪੰਜਵੇਂ ਪਾਤਸ਼ਾਹ ਤੱਕ ਰਬਾਬ ਕੀਰਤਨ ਦੀ ਸੇਵਾ ਕਰਨ ਵਾਲੇ ਭਾਈ ਸੱਤਾ ਜੀ ਅਤੇ ਭਾਈ ਬਲਵੰਡ ਜੀ ਦੀ ਰਾਮਕਲੀ ਕੀ ਵਾਰ (ਅੰਗ ੯੬੬–੯੬੮) ਵਿੱਚ ਗੁਰਗੱਦੀ ਦੀ ਏਕ ਜੋਤਿ ਦਾ ਅਦੁੱਤੀ ਵਰਣਨ ਹੈ। ਮਹਾਨ ਕੋਸ਼ ਅਨੁਸਾਰ ਆਪ ਜੀ ਦੀਆਂ ਸਹੀ ਜਨਮ/ਜੋਤੀ ਜੋਤ ਤਾਰੀਖ਼ਾਂ ਅਪ੍ਰਾਪਤ ਹਨ।',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ',
        referenceEn: 'Ang 966–968 · Ramkali Ki Vaar (Rai Balwand & Satta Doom)',
        referencePa: 'ਅੰਗ ੯੬੬–੯੬੮ · ਰਾਮਕਲੀ ਕੀ ਵਾਰ (ਰਾਇ ਬਲਵੰਡਿ ਤਥਾ ਸਤੈ ਡੂਮਿ)',
        excerptPa: 'ਨਾਨਕਿ ਰਾਜੁ ਚਲਾਇਆ ਸਚੁ ਕੋਟੁ ਸਤਾਣੀ ਨੀਵ ਦੈ ॥',
        excerptTranslit: 'Naanak raaj chalaaiaa sach kot sataanee neev dai.',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=966',
        pothiLabelEn: 'Read Ramkali Ki Vaar (Ang 966)',
        pothiLabelPa: 'ਪੋਥੀ ਸਾਹਿਬ ’ਤੇ ਰਾਮਕਲੀ ਕੀ ਵਾਰ (ਅੰਗ ੯੬੬) ਪੜ੍ਹੋ',
      },
    ],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=966',
    pothiLabelEn: 'Read Bhai Satta & Balwand Ji Vaar (Ang 966)',
    pothiLabelPa: 'ਭਾਈ ਸੱਤਾ ਤੇ ਬਲਵੰਡ ਜੀ ਵਾਰ (ਅੰਗ ੯੬੬) ਪੜ੍ਹੋ',
  },
  {
    id: '2084-joti-jot-bhai-gurdas-ji',
    date: '2027-09-05',
    sambat: 2084,
    category: 'khalsa',
    subGroups: ['bhagat-bhatt', 'gursikh'],
    titleEn: 'Joti Jot Divas — Bhai Gurdas Ji (Scribe of Adi Bir & Author of 40 Vaaran)',
    titlePa: 'ਜੋਤੀ ਜੋਤ ਦਿਵਸ — ਭਾਈ ਗੁਰਦਾਸ ਜੀ (ਆਦਿ ਬੀੜ ਦੇ ਲਿਖਾਰੀ ਅਤੇ ੪੦ ਵਾਰਾਂ ਦੇ ਰਚੇਤਾ)',
    shortLabelEn: 'Bhai Gurdas Ji Joti Jot',
    shortLabelPa: 'ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਜੋਤੀ ਜੋਤ',
    tithiRuleEn: 'Bhadon Sudhi 5 (20 Bhadon, Sambat 2084 · Goindwal Sahib)',
    tithiRulePa: 'ਭਾਦੋਂ ਸੁਦੀ ੫ (੨੦ ਭਾਦੋਂ, ਸੰਮਤ ੨੦੮੪ · ਗੋਇੰਦਵਾਲ ਸਾਹਿਬ)',
    summaryEn:
      'Passing of Bhai Gurdas Ji at Goindwal Sahib (Bhadon Sudhi 5, Sambat 1693) in the presence of Sri Guru Hargobind Sahib Ji; revered scribe of the Adi Bir whose Vaaran were blessed as the "Key to Gurbani."',
    summaryPa:
      'ਆਦਿ ਬੀੜ ਦੇ ਲਿਖਾਰੀ ਅਤੇ ਗੁਰਬਾਣੀ ਦੀ ਕੁੰਜੀ ਵਜੋਂ ਪ੍ਰਸਿੱਧ ਵਾਰਾਂ ਦੇ ਰਚੇਤਾ ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਦਾ ਜੋਤੀ ਜੋਤ ਦਿਵਸ (ਭਾਦੋਂ ਸੁਦੀ ੫, ਸੰਮਤ ੧੬੯੩, ਗੋਇੰਦਵਾਲ ਸਾਹਿਬ)।',
    historicalContextEn:
      'Nephew of Sri Guru Amar Das Ji, first Jathedar of Sri Akal Takht Sahib, and scribe of the original Kartarpur Bir dictated by Sri Guru Arjan Dev Ji, Bhai Gurdas Ji authored 40 Vaaran and 675 Kabitt Savaiye blessed as "Gurbani Di Kunji." He merged into the Eternal Light at Goindwal Sahib on Bhadon Sudhi 5, Sambat 1693 (1636 CE).',
    historicalContextPa:
      'ਆਦਿ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੀ ਲਿਖਾਈ ਦੀ ਸੇਵਾ ਨਿਭਾਉਣ ਵਾਲੇ ਅਤੇ ੪੦ ਵਾਰਾਂ ਤੇ ੬੭੫ ਕਬਿੱਤ ਸਵੱਈਏ ਰਚਣ ਵਾਲੇ ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਭਾਦੋਂ ਸੁਦੀ ੫, ਸੰਮਤ ੧੬੯੩ ਨੂੰ ਗੋਇੰਦਵਾਲ ਸਾਹਿਬ ਵਿਖੇ ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਦੀ ਹਜ਼ੂਰੀ ਵਿੱਚ ਜੋਤੀ ਜੋਤ ਸਮਾਏ।',
    citations: [
      {
        sourceEn: 'Bhatt Vahi Multani Sindhi & Mahan Kosh',
        sourcePa: 'ਭੱਟ ਵਹੀ ਮੁਲਤਾਨੀ ਸਿੰਧੀ ਅਤੇ ਮਹਾਨ ਕੋਸ਼',
        referenceEn: 'Bhadon Sudhi 5, Sambat 1693 · Goindwal Sahib',
        referencePa: 'ਭਾਦੋਂ ਸੁਦੀ ੫, ਸੰਮਤ ੧੬੯੩ · ਗੋਇੰਦਵਾਲ ਸਾਹਿਬ',
      },
      {
        sourceEn: 'Bhai Gurdas Ji Vaaran',
        sourcePa: 'ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਵਾਰਾਂ',
        referenceEn: 'Vaar 1, Pauri 27 · Sati Gur Nanak Pragatia',
        referencePa: 'ਵਾਰ ੧, ਪਉੜੀ ੨੭ · ਸਤਿਗੁਰੁ ਨਾਨਕੁ ਪ੍ਰਗਟਿਆ',
      },
    ],
  },
  {
    id: '2084-baba-sundar-ji-ramkali-sadd',
    date: '2027-09-15',
    sambat: 2084,
    category: 'khalsa',
    subGroups: ['bhagat-bhatt', 'guru-ghar'],
    titleEn: 'Gursikh Bani-kar — Baba Sundar Ji (Ramkali Sadd, SGGS Ang 923)',
    titlePa: 'ਗੁਰਸਿੱਖ ਬਾਣੀਕਾਰ — ਬਾਬਾ ਸੁੰਦਰ ਜੀ (ਰਾਮਕਲੀ ਸਦੁ, ਅੰਗ ੯੨੩)',
    shortLabelEn: 'Baba Sundar Ji (Ramkali Sadd)',
    shortLabelPa: 'ਬਾਬਾ ਸੁੰਦਰ ਜੀ (ਰਾਮਕਲੀ ਸਦੁ)',
    tithiRuleEn: 'Bhadon Puranmashi (30 Bhadon, Sambat 2084 · Guru Amar Das Ji Joti Jot)',
    tithiRulePa: 'ਭਾਦੋਂ ਪੂਰਨਮਾਸ਼ੀ (੩੦ ਭਾਦੋਂ, ਸੰਮਤ ੨੦੮੪ · ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ ਜੋਤੀ ਜੋਤ)',
    summaryEn:
      'Commemorating Baba Sundar Ji (great-grandson of Sri Guru Amar Das Ji) on Bhadon Puranmashi, who authored the sacred Bani Ramkali Sadd (Ang 923) chronicling Guru Amar Das Ji’s Joti Jot and Gurgaddi to Guru Ram Das Ji.',
    summaryPa:
      'ਸ੍ਰੀ ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ ਦੇ ਪੜਪੋਤਰੇ ਅਤੇ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੇ ਗੁਰਸਿੱਖ ਬਾਣੀਕਾਰ ਬਾਬਾ ਸੁੰਦਰ ਜੀ ਦੀ ਯਾਦਗਾਰ — ਰਾਮਕਲੀ ਸਦੁ (ਅੰਗ ੯੨੩)।',
    historicalContextEn:
      'Baba Sundar Ji (son of Baba Anand Ji and great-grandson of Third Patshah) composed the six-stanza Ramkali Sadd (Ang 923–924), recording Sri Guru Amar Das Ji’s final spiritual instruction at Goindwal Sahib on Bhadon Puranmashi, Sambat 1631 (1574 CE): that upon departure, the Sangat should sing only Akal Purakh’s praises and Kirtan rather than worldly lamentation.',
    historicalContextPa:
      'ਤੀਸਰੇ ਪਾਤਸ਼ਾਹ ਸ੍ਰੀ ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ ਦੇ ਪੜਪੋਤਰੇ ਬਾਬਾ ਸੁੰਦਰ ਜੀ ਨੇ ਭਾਦੋਂ ਪੂਰਨਮਾਸ਼ੀ ਸੰਮਤ ੧੬੩੧ ਦੇ ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ ਦੇ ਜੋਤੀ ਜੋਤ ਪ੍ਰਸੰਗ ਨੂੰ ਰਾਮਕਲੀ ਸਦੁ (ਅੰਗ ੯੨੩–੯੨੪) ਵਿੱਚ ਅਮਰ ਕਰ ਦਿੱਤਾ।',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ',
        referenceEn: 'Ang 923–924 · Ramkali Sadd (Baba Sundar Ji)',
        referencePa: 'ਅੰਗ ੯੨੩–੯੨੪ · ਰਾਮਕਲੀ ਸਦੁ (ਬਾਬਾ ਸੁੰਦਰ ਜੀ)',
        excerptPa: 'ਜਗਿ ਦਾਤਾ ਸੋਇ ਭਗਤਿ ਵਛਲੁ ਤਿਹੁ ਲੋਇ ਜੀਉ ॥ ਗੁਰ ਸਬਦਿ ਸਮਾਵਏ ਅਵਰੁ ਨ ਜਾਣੈ ਕੋਇ ਜੀਉ ॥',
        excerptTranslit: 'Jag daataa soi bhagat vachhal tihu loi jeeo, Gur sabad samaavae avar na jaanai koi jeeo.',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=923',
        pothiLabelEn: 'Read Ramkali Sadd (Ang 923)',
        pothiLabelPa: 'ਪੋਥੀ ਸਾਹਿਬ ’ਤੇ ਰਾਮਕਲੀ ਸਦੁ (ਅੰਗ ੯੨੩) ਪੜ੍ਹੋ',
      },
    ],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=923',
    pothiLabelEn: 'Read Baba Sundar Ji Bani (Ang 923)',
    pothiLabelPa: 'ਬਾਬਾ ਸੁੰਦਰ ਜੀ ਬਾਣੀ (ਅੰਗ ੯੨੩) ਪੜ੍ਹੋ',
  },
  {
    id: '2084-janam-baba-sri-chand-ji-bhai-kanhaiya-ji',
    date: '2027-09-20',
    sambat: 2084,
    category: 'khalsa',
    subGroups: ['guru-ghar', 'gursikh'],
    titleEn: 'Janam Divas — Baba Sri Chand Ji (4 Assu) & Bhai Kanhaiya Ji Remembrance',
    titlePa: 'ਜਨਮ ਦਿਵਸ — ਬਾਬਾ ਸ੍ਰੀ ਚੰਦ ਜੀ (੪ ਅੱਸੂ) ਅਤੇ ਭਾਈ ਘਨ੍ਹੱਈਆ ਜੀ ਯਾਦਗਾਰ',
    shortLabelEn: 'Baba Sri Chand & Bhai Kanhaiya Ji',
    shortLabelPa: 'ਬਾਬਾ ਸ੍ਰੀ ਚੰਦ ਤੇ ਭਾਈ ਘਨ੍ਹੱਈਆ ਜੀ',
    tithiRuleEn: '4 Assu, Sambat 2084 (Bhadon Sudhi 9 tradition also noted)',
    tithiRulePa: '੪ ਅੱਸੂ, ਸੰਮਤ ੨੦੮੪ (ਭਾਦੋਂ ਸੁਦੀ ੯ ਪਰੰਪਰਾ ਨੋਟ)',
    summaryEn:
      'Birth anniversary of Baba Sri Chand Ji (elder Sahibzada of Sri Guru Nanak Dev Ji, Sambat 1551) alongside Assu remembrance of Bhai Kanhaiya Ji, emblem of universal compassion at Sri Anandpur Sahib.',
    summaryPa:
      'ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਦੇ ਵੱਡੇ ਸਪੁੱਤਰ ਬਾਬਾ ਸ੍ਰੀ ਚੰਦ ਜੀ (੪ ਅੱਸੂ, ਸੰਮਤ ੧੫੫੧) ਦਾ ਜਨਮ ਦਿਵਸ ਅਤੇ ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਵਿਖੇ ਨਿਸ਼ਕਾਮ ਸੇਵਾ ਦੇ ਪੁੰਜ ਭਾਈ ਘਨ੍ਹੱਈਆ ਜੀ ਦੀ ਯਾਦਗਾਰ।',
    historicalContextEn:
      'Born on Bhadon Sudhi 9 / 4 Assu, Sambat 1551 (1494 CE) at Sultanpur Lodhi to Sri Guru Nanak Dev Ji and Mata Sulakhni Ji, Baba Sri Chand Ji lived a long ascetic life and later paid reverent homage to Sri Guru Ram Das Ji and Sri Guru Hargobind Sahib Ji. Assu also honors Bhai Kanhaiya Ji (Sevapanthi founder, Joti Jot Assu 1775 Bikrami) whom Dashmesh Pita blessed with ointment and water to serve friend and foe alike.',
    historicalContextPa:
      'ਸੁਲਤਾਨਪੁਰ ਲੋਧੀ ਵਿਖੇ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਅਤੇ ਮਾਤਾ ਸੁਲੱਖਣੀ ਜੀ ਦੇ ਗ੍ਰਹਿ ੪ ਅੱਸੂ (ਭਾਦੋਂ ਸੁਦੀ ੯), ਸੰਮਤ ੧੫੫੧ ਨੂੰ ਬਾਬਾ ਸ੍ਰੀ ਚੰਦ ਜੀ ਦਾ ਜਨਮ ਹੋਇਆ। ਅੱਸੂ ਮਹੀਨੇ ਵਿੱਚ ਹੀ ਸੇਵਾਪੰਥੀ ਮਹਾਂਪੁਰਖ ਭਾਈ ਘਨ੍ਹੱਈਆ ਜੀ (ਜੋਤੀ ਜੋਤ ਅੱਸੂ ਸੰਮਤ ੧੭੭੫) ਨੂੰ ਯਾਦ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।',
    citations: [
      {
        sourceEn: 'Mahan Kosh & Sri Gur Pratap Suraj Granth',
        sourcePa: 'ਮਹਾਨ ਕੋਸ਼ ਅਤੇ ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ',
        referenceEn: 'Entries: Baba Sri Chand Ji (4 Assu 1551) & Bhai Kanhaiya Ji (Assu 1775)',
        referencePa: 'ਇੰਦਰਾਜ: ਬਾਬਾ ਸ੍ਰੀ ਚੰਦ ਜੀ (੪ ਅੱਸੂ ੧੫੫੧) ਅਤੇ ਭਾਈ ਘਨ੍ਹੱਈਆ ਜੀ (ਅੱਸੂ ੧੭੭੫)',
      },
    ],
  },
  {
    id: '2084-guru-nanak-parivar-bebe-nanaki-mata-sulakhni-baba-lakhmi-das',
    date: '2027-09-25',
    sambat: 2084,
    category: 'khalsa',
    subGroups: ['guru-ghar'],
    titleEn: 'Guru Ghar Heritage — Bebe Nanaki Ji, Mata Sulakhni Ji & Baba Lakhmi Das Ji',
    titlePa: 'ਗੁਰੂ ਘਰ ਵਿਰਾਸਤ — ਬੇਬੇ ਨਾਨਕੀ ਜੀ, ਮਾਤਾ ਸੁਲੱਖਣੀ ਜੀ ਅਤੇ ਬਾਬਾ ਲਖਮੀ ਦਾਸ ਜੀ',
    shortLabelEn: 'Guru Nanak Dev Ji Parivar',
    shortLabelPa: 'ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਪਰਿਵਾਰ',
    tithiRuleEn: '9 Assu, Sambat 2084 (On Sri Guru Nanak Dev Ji Joti Jot)',
    tithiRulePa: '੯ ਅੱਸੂ, ਸੰਮਤ ੨੦੮੪ (ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਜੋਤੀ ਜੋਤ ਦਿਹਾੜੇ ’ਤੇ)',
    summaryEn:
      'Honoring Sri Guru Nanak Dev Ji’s sacred family: elder sister Bebe Nanaki Ji (first to recognize Guru Nanak’s divinity), consort Mata Sulakhni Ji (Batala & Kartarpur Sahib), and younger Sahibzada Baba Lakhmi Das Ji.',
    summaryPa:
      'ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਦੇ ਪਾਵਨ ਪਰਿਵਾਰ—ਵੱਡੀ ਭੈਣ ਬੇਬੇ ਨਾਨਕੀ ਜੀ (ਪਹਿਲੀ ਗੁਰਸਿੱਖ), ਮਹਿਲ ਮਾਤਾ ਸੁਲੱਖਣੀ ਜੀ ਅਤੇ ਛੋਟੇ ਸਪੁੱਤਰ ਬਾਬਾ ਲਖਮੀ ਦਾਸ ਜੀ—ਦੀ ਯਾਦਗਾਰ।',
    historicalContextEn:
      'Commemorated alongside Sri Guru Nanak Dev Ji’s Joti Jot at Sri Kartarpur Sahib (Assu Vadhi 10): Bebe Nanaki Ji was the very first soul to recognize Guru Nanak’s divine mission and gifted the first Rabab to Bhai Mardana Ji; Mata Sulakhni Ji presided over the first Langar at Kartarpur Sahib; and Baba Lakhmi Das Ji (born Sambat 1553) carried forward the Bedi lineage.',
    historicalContextPa:
      'ਸ੍ਰੀ ਕਰਤਾਰਪੁਰ ਸਾਹਿਬ ਵਿਖੇ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਦੇ ਜੋਤੀ ਜੋਤ ਦਿਹਾੜੇ ’ਤੇ ਬੇਬੇ ਨਾਨਕੀ ਜੀ (ਜਿਨ੍ਹਾਂ ਨੇ ਭਾਈ ਮਰਦਾਨਾ ਜੀ ਨੂੰ ਪਹਿਲੀ ਰਬਾਬ ਲੈ ਕੇ ਦਿੱਤੀ), ਮਾਤਾ ਸੁਲੱਖਣੀ ਜੀ ਅਤੇ ਛੋਟੇ ਸਪੁੱਤਰ ਬਾਬਾ ਲਖਮੀ ਦਾਸ ਜੀ ਦੀ ਪਾਵਨ ਸੇਵਾ ਨੂੰ ਯਾਦ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।',
    citations: [
      {
        sourceEn: 'Puratan Janamsakhi & Mahan Kosh',
        sourcePa: 'ਪੁਰਾਤਨ ਜਨਮਸਾਖੀ ਅਤੇ ਮਹਾਨ ਕੋਸ਼',
        referenceEn: 'Entries: Bebe Nanaki Ji, Mata Sulakhni Ji & Baba Lakhmi Das Ji',
        referencePa: 'ਇੰਦਰਾਜ: ਬੇਬੇ ਨਾਨਕੀ ਜੀ, ਮਾਤਾ ਸੁਲੱਖਣੀ ਜੀ ਅਤੇ ਬਾਬਾ ਲਖਮੀ ਦਾਸ ਜੀ',
      },
    ],
  },
  {
    id: '2084-baba-sheikh-farid-ji-aagman',
    date: '2027-10-15',
    sambat: 2084,
    category: 'khalsa',
    subGroups: ['bhagat-bhatt'],
    titleEn: 'Aagman Purab — Baba Sheikh Farid Ji (SGGS Ang 488, 794, 1377–1384)',
    titlePa: 'ਆਗਮਨ ਪੁਰਬ — ਬਾਬਾ ਸ਼ੇਖ਼ ਫ਼ਰੀਦ ਜੀ (ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਅੰਗ ੪੮੮, ੭੯੪, ੧੩੭੭–੧੩੮੪)',
    shortLabelEn: 'Baba Sheikh Farid Ji',
    shortLabelPa: 'ਬਾਬਾ ਸ਼ੇਖ਼ ਫ਼ਰੀਦ ਜੀ',
    tithiRuleEn: '29 Assu, Sambat 2084 (Faridkot Annual Commemoration · Mahan Kosh Note)',
    tithiRulePa: '੨੯ ਅੱਸੂ, ਸੰਮਤ ੨੦੮੪ (ਫ਼ਰੀਦਕੋਟ ਸਲਾਨਾ ਪੁਰਬ · ਮਹਾਨ ਕੋਸ਼ ਨੋਟ)',
    summaryEn:
      'Commemorating Baba Sheikh Farid Ji (1173–1266 CE, Pakpattan & Faridkot), pioneer of Punjabi spiritual poetry whose 4 Shabads and 112 Saloks grace Sri Guru Granth Sahib Ji (Ang 488, 794, 1377–1384).',
    summaryPa:
      'ਪੰਜਾਬੀ ਸੂਫ਼ੀ ਕਾਵਿ ਦੇ ਪਿਤਾਮਾ ਬਾਬਾ ਸ਼ੇਖ਼ ਫ਼ਰੀਦ ਜੀ ਦੀ ਯਾਦਗਾਰ — ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਵਿੱਚ ਆਪ ਜੀ ਦੇ ੪ ਸ਼ਬਦ (ਅੰਗ ੪੮੮, ੭੯੪) ਅਤੇ ੧੧੨ ਸਲੋਕ (ਅੰਗ ੧੩੭੭–੧੩੮੪) ਦਰਜ ਹਨ।',
    historicalContextEn:
      'Collected directly by Sri Guru Nanak Dev Ji from Sheikh Ibrahim (twelfth successor at Pakpattan) and enshrined by Sri Guru Arjan Dev Ji in Adi Sri Guru Granth Sahib Ji, Baba Farid Ji’s 112 Saloks teach humility, sweet speech, and Amritvela devotion ("Uth Farida ujoo saaj subah nivaaj gujaar"). Note per Mahan Kosh: Assu/October commemorates Baba Farid Ji’s arrival in Faridkot (original lunar Urs falls on 5 Muharram).',
    historicalContextPa:
      'ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਵੱਲੋਂ ਪਾਕਪਟਨ ਤੋਂ ਇਕੱਤਰ ਕੀਤੀ ਗਈ ਬਾਬਾ ਸ਼ੇਖ਼ ਫ਼ਰੀਦ ਜੀ ਦੀ ਪਾਵਨ ਬਾਣੀ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੇ ਅੰਗ ੪੮੮, ੭੯੪ ਅਤੇ ੧੩੭੭–੧੩੮੪ ’ਤੇ ਸੁਸ਼ੋਭਿਤ ਹੈ। ਮਹਾਨ ਕੋਸ਼ ਅਨੁਸਾਰ ਅੱਸੂ ਵਿੱਚ ਫ਼ਰੀਦਕੋਟ ਵਿਖੇ ਆਗਮਨ ਪੁਰਬ ਮਨਾਇਆ ਜਾਂਦਾ ਹੈ।',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ',
        referenceEn: 'Ang 488, 794 & 1377–1384 · Raag Asa, Suhi & Salok Sheikh Farid Ji',
        referencePa: 'ਅੰਗ ੪੮੮, ੭੯੪ ਅਤੇ ੧੩੭੭–੧੩੮੪ · ਆਸਾ, ਸੂਹੀ ਅਤੇ ਸਲੋਕ ਸ਼ੇਖ਼ ਫ਼ਰੀਦ ਜੀ',
        excerptPa: 'ਫਰੀਦਾ ਜੇ ਤੂ ਅਕਲਿ ਲਤੀਫੁ ਕਾਲੇ ਲਿਖੁ ਨ ਲੇਖ ॥ ਆਪਨੜੇ ਗਿਰੀਵਾਨ ਮਹਿ ਸਿਰੁ ਨੀਵਾਂ ਕਰਿ ਦੇਖੁ ॥੬॥',
        excerptTranslit: 'Fareedaa je too akal lateef kaale likh na lekh, aapnarre gireevaan mahi sir neevaan kar dekh.',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=1377',
        pothiLabelEn: 'Read Salok Sheikh Farid Ji (Ang 1377)',
        pothiLabelPa: 'ਪੋਥੀ ਸਾਹਿਬ ’ਤੇ ਸਲੋਕ ਸ਼ੇਖ਼ ਫ਼ਰੀਦ ਜੀ (ਅੰਗ ੧੩੭੭) ਪੜ੍ਹੋ',
      },
    ],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=1377',
    pothiLabelEn: 'Read Salok Sheikh Farid Ji (Ang 1377)',
    pothiLabelPa: 'ਸਲੋਕ ਸ਼ੇਖ਼ ਫ਼ਰੀਦ ਜੀ (ਅੰਗ ੧੩੭੭) ਪੜ੍ਹੋ',
  },
  {
    id: '2084-parkash-mata-sahib-kaur-ji',
    date: '2027-11-04',
    sambat: 2084,
    category: 'gurpurab',
    subGroups: ['guru-ghar'],
    titleEn: 'Parkash Purab — Mata Sahib Kaur Ji (Mother of the Khalsa)',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਮਾਤਾ ਸਾਹਿਬ ਕੌਰ ਜੀ (ਖ਼ਾਲਸੇ ਦੇ ਮਾਤਾ)',
    shortLabelEn: 'Mata Sahib Kaur Ji',
    shortLabelPa: 'ਮਾਤਾ ਸਾਹਿਬ ਕੌਰ ਜੀ',
    tithiRuleEn: '18 Katak, Sambat 2084',
    tithiRulePa: '੧੮ ਕੱਤਕ, ਸੰਮਤ ੨੦੮੪',
    summaryEn:
      'Parkash Purab of Mata Sahib Kaur Ji (18 Katak, Sambat 2084), revered spiritual Mother of the Khalsa Panth.',
    summaryPa:
      'ਖ਼ਾਲਸਾ ਪੰਥ ਦੇ ਮਾਤਾ ਸ੍ਰੀ ਮਾਤਾ ਸਾਹਿਬ ਕੌਰ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ (੧੮ ਕੱਤਕ, ਸੰਮਤ ੨੦੮੪)।',
    historicalContextEn:
      'Observed on 18 Katak in Sambat 2084 (Thursday, 4 November 2027), remembering Mata Sahib Kaur Ji’s eternal role in the Khalsa Amrit ceremony and Panthic stewardship.',
    historicalContextPa:
      'ਸੰਮਤ ੨੦੮੪ ਵਿੱਚ ੧੮ ਕੱਤਕ (੪ ਨਵੰਬਰ ੨੦੨੭) ਨੂੰ ਖ਼ਾਲਸੇ ਦੇ ਮਾਤਾ ਸ੍ਰੀ ਮਾਤਾ ਸਾਹਿਬ ਕੌਰ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ ਮਨਾਇਆ ਜਾਂਦਾ ਹੈ।',
    citations: [
      {
        sourceEn: 'Bhatt Vahi & Hukamnamas of Mata Sahib Kaur Ji',
        sourcePa: 'ਭੱਟ ਵਹੀ ਅਤੇ ਮਾਤਾ ਸਾਹਿਬ ਕੌਰ ਜੀ ਦੇ ਹੁਕਮਨਾਮੇ',
        referenceEn: '18 Katak · Mother of the Khalsa Archive',
        referencePa: '੧੮ ਕੱਤਕ · ਮਾਤਾ ਸਾਹਿਬ ਕੌਰ ਜੀ ਹੁਕਮਨਾਮੇ',
      },
    ],
  },
  {
    id: '2084-parkash-bhagat-ravidas-ji',
    date: '2028-02-10',
    sambat: 2084,
    category: 'gurpurab',
    subGroups: ['bhagat-bhatt'],
    titleEn: 'Parkash Purab — Bhagat Ravidas Ji (SGGS 41 Shabads)',
    titlePa: 'ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਭਗਤ ਰਵਿਦਾਸ ਜੀ (ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ੪੧ ਸ਼ਬਦ)',
    shortLabelEn: 'Bhagat Ravidas Ji Parkash',
    shortLabelPa: 'ਭਗਤ ਰਵਿਦਾਸ ਜੀ ਪ੍ਰਕਾਸ਼',
    tithiRuleEn: 'Magh Puranmashi (28 Magh, Sambat 2084)',
    tithiRulePa: 'ਮਾਘ ਪੂਰਨਮਾਸ਼ੀ (੨੮ ਮਾਘ, ਸੰਮਤ ੨੦੮੪)',
    summaryEn:
      'Parkash Purab of Shiromani Bhagat Ravidas Ji on Magh Puranmashi (28 Magh, Sambat 2084), visionary of Begampura (SGGS Ang 345).',
    summaryPa:
      'ਬੇਗਮਪੁਰਾ ਸ਼ਹਿਰ ਦੇ ਦਰਸ਼ਕ ਸ਼੍ਰੋਮਣੀ ਭਗਤ ਰਵਿਦਾਸ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਮਾਘ ਪੂਰਨਮਾਸ਼ੀ, ੨੮ ਮਾਘ ਸੰਮਤ ੨੦੮੪ (ਅੰਗ ੩੪੫)।',
    historicalContextEn:
      'Observed on Magh Puranmashi in Sambat 2084 (10 February 2028), celebrating Bhagat Ravidas Ji’s 41 Shabads across 16 Raags in Sri Guru Granth Sahib Ji.',
    historicalContextPa:
      'ਸੰਮਤ ੨੦੮੪ ਵਿੱਚ ਮਾਘ ਪੂਰਨਮਾਸ਼ੀ (੨੮ ਮਾਘ / ੧੦ ਫ਼ਰਵਰੀ ੨੦੨੮) ਨੂੰ ਭਗਤ ਰਵਿਦਾਸ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ ਮਨਾਇਆ ਜਾਂਦਾ ਹੈ।',
    citations: [
      {
        sourceEn: 'Sri Guru Granth Sahib Ji',
        sourcePa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ',
        referenceEn: 'Ang 345 · Raag Gauri, Bhagat Ravidas Ji (Begampura)',
        referencePa: 'ਅੰਗ ੩੪੫ · ਰਾਗ ਗਉੜੀ, ਭਗਤ ਰਵਿਦਾਸ ਜੀ (ਬੇਗਮਪੁਰਾ)',
        excerptPa: 'ਬੇਗਮ ਪੁਰਾ ਸਹਰ ਕੋ ਨਾਉ ॥ ਦੂਖੁ ਅੰਦੋਹੁ ਨਹੀ ਤਿਹਿ ਠਾਉ ॥',
        excerptTranslit: 'Begam puraa sahar ko naau, dookh andohu nahee tihi thaau.',
        pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=345',
        pothiLabelEn: 'Read Begampura Shabad (Ang 345)',
        pothiLabelPa: 'ਪੋਥੀ ਸਾਹਿਬ ’ਤੇ ਬੇਗਮਪੁਰਾ ਸ਼ਬਦ (ਅੰਗ ੩੪੫) ਪੜ੍ਹੋ',
      },
    ],
    pothiUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=345',
    pothiLabelEn: 'Read Bhagat Ravidas Ji Bani (Ang 345)',
    pothiLabelPa: 'ਭਗਤ ਰਵਿਦਾਸ ਜੀ ਬਾਣੀ (ਅੰਗ ੩੪੫) ਪੜ੍ਹੋ',
  },
];
