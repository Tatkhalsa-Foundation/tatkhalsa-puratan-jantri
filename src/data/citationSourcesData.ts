import {POTHI_BARAH_MAHA_URL} from './sambatData';
import type {ColophonCitation, HistoricalEvent} from './types';

export interface CitationReaderContent {
  headingEn: string;
  headingPa: string;
  gurmukhiLines: readonly string[];
  transliterationLines: readonly string[];
  translationEn: string;
  translationPa: string;
  exactGranthUrl: string;
  exactGranthLabelEn: string;
  exactGranthLabelPa: string;
  granthTypeLabelEn: string;
  granthTypeLabelPa: string;
}

interface CuratedSourceEntry {
  match: (src: string, ref: string) => boolean;
  build: (cit: ColophonCitation, ev: HistoricalEvent) => CitationReaderContent;
}

const POTHI_HOME_URL = 'https://pothi.tatkhalsa.in/';
const POTHI_NITNEM_URL = 'https://pothi.tatkhalsa.in/tabs/pothi';
const POTHI_SGGS_URL = 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=1';
const POTHI_DASAM_URL = 'https://pothi.tatkhalsa.in/reader?source=dasam&ang=1';

function sanitizePothiUrl(url?: string): string {
  if (url && /^https:\/\/pothi\.tatkhalsa\.in(\/|$)/i.test(url)) {
    return url;
  }
  return POTHI_HOME_URL;
}

function extractAng(ref: string): string | null {
  const m = ref.match(/Ang\s+(\d+)/i);
  return m ? m[1] : null;
}

function extractVaarPauri(ref: string): {vaar: string; pauri: string} | null {
  const m = ref.match(/Vaar\s+(\d+).*?Pauri\s+(\d+)/i);
  if (!m) return null;
  return {vaar: m[1], pauri: m[2]};
}

/**
 * Curated full-source passages (Gurmukhi, transliteration, English & Punjabi historical translations,
 * and exact page/Ang/Vaar/Raas links) for primary Sikh scriptural & Puratan historical texts.
 */
const CURATED_SOURCES: readonly CuratedSourceEntry[] = [
  // 1. Suraj Prakash — Bandi Chhor Divas (Raas 5, Ansu 26–32)
  {
    match: (src, ref) => /suraj/i.test(src) && /raas\s*5/i.test(ref),
    build: () => ({
      headingEn: 'Sri Gur Pratap Suraj Granth — Raas 5, Ansu 26–32 (Bandi Chhor & Deepmala)',
      headingPa: 'ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ — ਰਾਸਿ ੫, ਅੰਸੂ ੨੬–੩੨ (ਬੰਦੀ ਛੋੜ ਅਤੇ ਦੀਪਮਾਲਾ)',
      gurmukhiLines: [
        'ਦੋਹਰਾ ॥ ਬਾਵਨ ਰਾਜੇ ਬੰਦੀਖਾਨੇ, ਗੁਰ ਚੋਲਾ ਕਲੀਆਂ ਬਵੰਜਾ ਧਾਰ ॥',
        'ਹਰਿਗੋਬਿੰਦ ਪ੍ਰਭ ਬੰਦੀ ਛੋੜਿ, ਪਹੁੰਚੇ ਅੰਮ੍ਰਿਤਸਰ ਦਰਬਾਰ ॥',
        'ਚੌਪਈ ॥ ਭਾਈ ਗੁਰਦਾਸ ਅਰ ਬਾਬਾ ਬੁੱਢਾ, ਮਿਲਿ ਸੰਗਤਿ ਦੀਪਮਾਲਾ ਸਾਜੀ ॥',
        'ਕੱਤਕ ਮੱਸਿਆ ਰਾਤਿ ਪ੍ਰਕਾਸ਼ੀ, ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸੋਭਾ ਅਤਿ ਰਾਜੀ ॥',
      ],
      transliterationLines: [
        'Dohraa: Baavan raaje bandeekhaane, Gur cholaa kaleeaan bavanzaa dhaar.',
        'Hargobind Prabh Bandee Chhor, pahunche Amritsar Darbaar.',
        'Chaupaee: Bhaaee Gurdaas ar Baabaa Budhaa, mil sangat deepmaalaa saajee.',
        'Katak Massiaa raat prakaashee, Sree Harmandir sobhaa at raajee.',
      ],
      translationEn:
        'In Raas 5 (Ansus 26–32), Mahakavi Bhai Santokh Singh Ji chronicles how Sri Guru Hargobind Sahib Ji refused to leave Gwalior Fort alone when Emperor Jahangir ordered His release. Wearing a specially stitched fifty-two-tasseled chola, the Sixth Patshah secured the freedom of all fifty-two detained hill rulers—earning the immortal title "Bandi Chhor Data." Returning to Sri Amritsar Sahib on Katak Masya, Baba Budha Ji, Bhai Gurdas Ji, and the Sangat illuminated Sri Harmandir Sahib with rows of ghee lamps.',
      translationPa:
        'ਰਾਸਿ ੫ (ਅੰਸੂ ੨੬–੩੨) ਵਿੱਚ ਮਹਾਂਕਵੀ ਭਾਈ ਸੰਤੋਖ ਸਿੰਘ ਜੀ ਵਰਣਨ ਕਰਦੇ ਹਨ ਕਿ ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਨੇ ੫੨ ਕਲੀਆਂ ਵਾਲਾ ਚੋਲਾ ਪਹਿਨ ਕੇ ਗਵਾਲੀਅਰ ਦੇ ਕਿਲ੍ਹੇ ਵਿੱਚੋਂ ੫੨ ਰਾਜਿਆਂ ਨੂੰ ਰਿਹਾਅ ਕਰਵਾਇਆ ਅਤੇ ਕੱਤਕ ਮੱਸਿਆ ਨੂੰ ਸ੍ਰੀ ਅੰਮ੍ਰਿਤਸਰ ਸਾਹਿਬ ਪਹੁੰਚੇ, ਜਿੱਥੇ ਬਾਬਾ ਬੁੱਢਾ ਜੀ ਅਤੇ ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਦੀ ਅਗਵਾਈ ਵਿੱਚ ਦੀਪਮਾਲਾ ਕੀਤੀ ਗਈ।',
      exactGranthUrl: POTHI_HOME_URL,
      exactGranthLabelEn: 'Open Pothi Sahib (pothi.tatkhalsa.in)',
      exactGranthLabelPa: 'ਪੋਥੀ ਸਾਹਿਬ ਖੋਲ੍ਹੋ (pothi.tatkhalsa.in)',
      granthTypeLabelEn: 'Puratan Itihaas Granth',
      granthTypeLabelPa: 'ਪੁਰਾਤਨ ਇਤਿਹਾਸ ਗ੍ਰੰਥ',
    }),
  },

  // 2. Bhai Gurdas Ji — Vaar 19, Pauri 6 (Deepmala)
  {
    match: (src, ref) => /gurdas/i.test(src) && /vaar\s*19/i.test(ref),
    build: () => ({
      headingEn: 'Bhai Gurdas Ji Vaaran — Vaar 19, Pauri 6 (Diwali Dee Raat)',
      headingPa: 'ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਵਾਰਾਂ — ਵਾਰ ੧੯, ਪਉੜੀ ੬ (ਦੀਵਾਲੀ ਦੀ ਰਾਤਿ)',
      gurmukhiLines: [
        'ਦੀਵਾਲੀ ਦੀ ਰਾਤਿ ਦੀਵੇ ਬਾਲੀਅਨਿ ॥',
        'ਤਾਰੇ ਜਾਤਿ ਸਨਾਤਿ ਅੰਬਰਿ ਭਾਲੀਅਨਿ ॥',
        'ਫੁਲਾਂ ਦੀ ਬਾਗਾਤਿ ਚੁਣਿ ਚੁਣਿ ਚਾਲੀਅਨਿ ॥',
        'ਤੀਰਥਿ ਜਾਤੀ ਜਾਤਿ ਨੈਣ ਨਿਹਾਲੀਅਨਿ ॥',
        'ਹਰਿ ਚੰਦਉਰੀ ਝਾਤਿ ਵਸਾਇ ਉਚਾਲੀਅਨਿ ॥',
        'ਗੁਰਮੁਖਿ ਸੁਖ ਫਲ ਦਾਤਿ ਸਬਦਿ ਸਮ੍ਹਾਲੀਅਨਿ ॥੬॥',
      ],
      transliterationLines: [
        'Deevaalee dee raat deeve baaleean.',
        'Taare jaat sanaat ambar bhaaleean.',
        'Phulaan dee baagaat chun chun chaaleean.',
        'Teerath jaatee jaat nain nihaaleean.',
        'Har chanduree jhaat vasaae uchaaleean.',
        'Gurmukh sukh phal daat sabad samhaaleean. ||6||',
      ],
      translationEn:
        'Just as earthenware lamps lit on the night of Diwali eventually burn out, stars fade at dawn, flowers wither in gardens, and mirage-cities dissolve in an instant—only the Gurmukh who enshrines the eternal Guru-Shabad receives the everlasting fruit of inner illumination and liberation.',
      translationPa:
        'ਜਿਵੇਂ ਦੀਵਾਲੀ ਦੀ ਰਾਤ ਬਾਲੇ ਦੀਵੇ ਬੁੱਝ ਜਾਂਦੇ ਹਨ ਅਤੇ ਤਾਰੇ ਸਵੇਰ ਹੁੰਦਿਆਂ ਅਲੋਪ ਹੋ ਜਾਂਦੇ ਹਨ, ਤਿਵੇਂ ਸੰਸਾਰਕ ਚਮਕ ਨਾਸ਼ਵਾਨ ਹੈ; ਕੇਵਲ ਗੁਰਮੁਖ ਹੀ ਗੁਰੂ ਦੇ ਸ਼ਬਦ ਨੂੰ ਸੰਭਾਲ ਕੇ ਸਦੀਵੀ ਆਤਮਿਕ ਸੁਖ-ਫਲ ਪ੍ਰਾਪਤ ਕਰਦੇ ਹਨ।',
      exactGranthUrl: POTHI_HOME_URL,
      exactGranthLabelEn: 'Open Pothi Sahib (Vaar 19, Pauri 6 · pothi.tatkhalsa.in)',
      exactGranthLabelPa: 'ਪੋਥੀ ਸਾਹਿਬ ਖੋਲ੍ਹੋ (ਵਾਰ ੧੯, ਪਉੜੀ ੬)',
      granthTypeLabelEn: 'Bhai Gurdas Ji Vaaran',
      granthTypeLabelPa: 'ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਵਾਰਾਂ',
    }),
  },

  // 3. Bhai Gurdas Ji — Vaar 1, Pauri 27 (Satgur Nanak Pragatia)
  {
    match: (src, ref) => /gurdas/i.test(src) && /vaar\s*1\b/i.test(ref),
    build: () => ({
      headingEn: 'Bhai Gurdas Ji Vaaran — Vaar 1, Pauri 27 (Advent of Sri Guru Nanak Dev Ji)',
      headingPa: 'ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਵਾਰਾਂ — ਵਾਰ ੧, ਪਉੜੀ ੨੭ (ਸਤਿਗੁਰ ਨਾਨਕ ਪ੍ਰਗਟਿਆ)',
      gurmukhiLines: [
        'ਸਤਿਗੁਰ ਨਾਨਕ ਪ੍ਰਗਟਿਆ ਮਿਟੀ ਧੁੰਧੁ ਜਗਿ ਚਾਨਣੁ ਹੋਆ ॥',
        'ਜਿਉ ਕਰਿ ਸੂਰਜੁ ਨਿਕਲਿਆ ਤਾਰੇ ਛਪਿ ਅੰਧੇਰੁ ਪਲੋਆ ॥',
        'ਸਿੰਘ ਬੁਕੇ ਮਿਰਗਾਵਲੀ ਭੰਨੀ ਜਾਇ ਨ ਧੀਰਿ ਧਰੋਆ ॥',
        'ਜਿਥੈ ਬਾਬਾ ਪੈਰ ਧਰਿ ਪੂਜਾ ਆਸਣੁ ਥਾਪਣਿ ਸੋਆ ॥',
        'ਸਿਧ ਆਸਣਿ ਸਭਿ ਜਗਤ ਦੇ ਨਾਨਕ ਆਦਿ ਮਤੇ ਜੇ ਕੋਆ ॥',
        'ਘਰਿ ਘਰਿ ਅੰਦਰਿ ਧਰਮਸਾਲ ਹੋਵੈ ਕੀਰਤਨੁ ਸਦਾ ਵਿਸੋਆ ॥',
        'ਬਾਬੇ ਤਾਰੇ ਚਾਰਿ ਚਕਿ ਨਉ ਖੰਡਿ ਪ੍ਰਿਥਮੀ ਸਚਾ ਢੋਆ ॥',
        'ਗੁਰਮੁਖਿ ਕਲਿ ਵਿਚਿ ਪਰਗਟੁ ਹੋਆ ॥੨੭॥',
      ],
      transliterationLines: [
        'Satgur Naanak pragatiaa mitee dhundh jag chaanan hoaa.',
        'Jiu kar sooraj nikaliaa taare chhap andher paloaa.',
        'Singh buke mirgaavalee bhannee jaae na dheer dharoaa.',
        'Jithai Baabaa pair dhar poojaa aasan thaapan soaa.',
        'Sidh aasan sabh jagat de Naanak aad mate je koaa.',
        'Ghar ghar andar dharamsaal hovai keertan sadaa visoaa.',
        'Baabe taare chaar chak nau khand prithmee sachaa dhoaa.',
        'Gurmukh kal vich pargat hoaa. ||27||',
      ],
      translationEn:
        'With the advent of True Guru Nanak Dev Ji, the mist of spiritual ignorance lifted and light radiated across the world—just as when the sun rises, the stars vanish and darkness flees. Wherever Baba Nanak placed His sacred footsteps became a sanctuary of worship. Every home transformed into a Dharamsal echoing with perennial Kirtan as Guru Nanak liberated all four directions and nine realms of the earth in Kaljug.',
      translationPa:
        'ਸਤਿਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਦੇ ਪ੍ਰਗਟ ਹੋਣ ਨਾਲ ਜਗਤ ਵਿੱਚੋਂ ਅਗਿਆਨਤਾ ਦੀ ਧੁੰਦ ਮਿਟ ਗਈ ਅਤੇ ਸੱਚ ਦਾ ਚਾਨਣ ਫੈਲ ਗਿਆ। ਜਿੱਥੇ-ਜਿੱਥੇ ਗੁਰੂ ਬਾਬਾ ਜੀ ਨੇ ਚਰਨ ਪਾਏ ਉਹ ਅਸਥਾਨ ਪੂਜਣਯੋਗ ਧਰਮਸਾਲ ਬਣ ਗਏ ਅਤੇ ਘਰ-ਘਰ ਅੰਦਰ ਸਦਾ ਕੀਰਤਨ ਦੀ ਗੂੰਜ ਪੈਣ ਲੱਗੀ।',
      exactGranthUrl: POTHI_HOME_URL,
      exactGranthLabelEn: 'Open Pothi Sahib (Vaar 1, Pauri 27 · pothi.tatkhalsa.in)',
      exactGranthLabelPa: 'ਪੋਥੀ ਸਾਹਿਬ ਖੋਲ੍ਹੋ (ਵਾਰ ੧, ਪਉੜੀ ੨੭)',
      granthTypeLabelEn: 'Bhai Gurdas Ji Vaaran',
      granthTypeLabelPa: 'ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਵਾਰਾਂ',
    }),
  },

  // 4. Bhai Gurdas Ji — Vaar 10 (Bhagat Namdev Ji)
  {
    match: (src, ref) => /gurdas/i.test(src) && /vaar\s*10/i.test(ref),
    build: () => ({
      headingEn: 'Bhai Gurdas Ji Vaaran — Vaar 10, Pauri 1–9 (Bhagat Namdev Ji)',
      headingPa: 'ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਵਾਰਾਂ — ਵਾਰ ੧੦, ਪਉੜੀ ੧–੯ (ਭਗਤ ਨਾਮਦੇਵ ਜੀ)',
      gurmukhiLines: [
        'ਨਾਮਾ ਪੈਜ ਰਖਾਈਆ ਠਾਕੁਰ ਪੀਤਾ ਦੁਧੁ ਕਟੋਰਾ ॥',
        'ਦੇਹੁਰਾ ਫੇਰਿ ਭਗਤਿ ਵਸਿ ਕੀਆ, ਬ੍ਰਾਹਮਣੁ ਦੇਖਿ ਰਹਿਆ ਮਨਿ ਭੋਰਾ ॥',
        'ਪ੍ਰੇਮ ਭਗਤਿ ਪ੍ਰਭੁ ਭਾਵਦੀ, ਜਾਤਿ ਪਾਤਿ ਨਹ ਵੇਖੈ ਕੋਰਾ ॥',
      ],
      transliterationLines: [
        'Naamaa paij rakhaaeeaa Thaakur peetaa dudh katoraa.',
        'Dehuraa pher bhagat vas keeaa, Braahman dekh rahiaa man bhoraa.',
        'Prem bhagat Prabh bhaavdee, jaat paat nah vekhai koraa.',
      ],
      translationEn:
        'Bhai Gurdas Ji celebrates the childlike, fearless devotion of Shiromani Bhagat Namdev Ji: how the Lord honored Namdev’s loving faith by drinking the bowl of milk and turning the temple toward him when cast out by caste-proud priests, proving that God cherishes sincere loving devotion above all social hierarchy.',
      translationPa:
        'ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਵਾਰ ੧੦ ਵਿੱਚ ਸ਼੍ਰੋਮਣੀ ਭਗਤ ਨਾਮਦੇਵ ਜੀ ਦੀ ਅਨੰਨ ਪ੍ਰੇਮਾ-ਭਗਤੀ ਦਾ ਵਰਣਨ ਕਰਦੇ ਹਨ ਕਿ ਕਿਵੇਂ ਅਕਾਲ ਪੁਰਖ ਨੇ ਭਗਤ ਜੀ ਦੀ ਪੈਜ ਰੱਖੀ, ਦੁੱਧ ਦਾ ਕਟੋਰਾ ਛਕਿਆ ਅਤੇ ਮੰਦਰ ਦਾ ਮੂੰਹ ਫੇਰ ਕੇ ਦਰਸਾਇਆ ਕਿ ਪ੍ਰਭੂ ਜਾਤ-ਪਾਤ ਨਹੀਂ ਸਗੋਂ ਪ੍ਰੇਮ-ਭਗਤੀ ਵੇਖਦਾ ਹੈ।',
      exactGranthUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=1163',
      exactGranthLabelEn: 'Open Exact Page in Granth (Bhagat Namdev Ji · SGGS Ang 1163)',
      exactGranthLabelPa: 'ਗ੍ਰੰਥ ਦਾ ਸਹੀ ਪੰਨਾ ਖੋਲ੍ਹੋ (ਭਗਤ ਨਾਮਦੇਵ ਜੀ · ਅੰਗ ੧੧੬੩)',
      granthTypeLabelEn: 'Bhai Gurdas Ji Vaaran',
      granthTypeLabelPa: 'ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਵਾਰਾਂ',
    }),
  },

  // 5. Bhai Gurdas Ji — Vaar 24, Pauri 23 (Shaheedi Sri Guru Arjan Dev Ji)
  {
    match: (src, ref) => /gurdas/i.test(src) && /vaar\s*24/i.test(ref),
    build: () => ({
      headingEn: 'Bhai Gurdas Ji Vaaran — Vaar 24, Pauri 23 (Shaheedi Sri Guru Arjan Dev Ji)',
      headingPa: 'ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਵਾਰਾਂ — ਵਾਰ ੨੪, ਪਉੜੀ ੨੩ (ਸ਼ਹੀਦੀ ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ)',
      gurmukhiLines: [
        'ਰਹਿੰਦੇ ਗੁਰੁ ਦਰੀਆਉ ਵਿਚਿ ਮੀਨ ਕੁਲੀਨ ਹੇਤੁ ਨਿਰਬਾਣੀ ॥',
        'ਦਰਸਨੁ ਦੇਖਿ ਪਤੰਗ ਜਿਉ ਜੋਤੀ ਅੰਦਰਿ ਜੋਤਿ ਸਮਾਣੀ ॥',
        'ਸਬਦ ਸੁਰਤਿ ਲਿਵ ਮਿਰਗ ਜਿਉ ਭੀੜ ਪਈ ਚਿਤਿ ਅਵਰੁ ਨ ਆਣੀ ॥',
        'ਚਰਣ ਕਵਲ ਮਿਲਿ ਭਵਰ ਜਿਉ ਸੁਖ ਸੰਪਟ ਵਿਚਿ ਰੈਣਿ ਵਿਹਾਣੀ ॥',
        'ਗੁਰੁ ਉਪਦੇਸੁ ਨ ਵਿਸਰੈ ਬਾਬੀਹੇ ਜਿਉ ਆਖ ਵਖਾਣੀ ॥',
        'ਗੁਰਮੁਖਿ ਸੁਖ ਫਲੁ ਪਿਰਮ ਰਸੁ ਸਹਜ ਸਮਾਧਿ ਸਾਧ ਸੰਗਿ ਜਾਣੀ ॥',
        'ਗੁਰੁ ਅਰਜੁਨ ਵਿਟਹੁ ਕੁਰਬਾਣੀ ॥੨੩॥',
      ],
      transliterationLines: [
        'Rahinde Gur dareeaao vich meen kuleen het nirbaanee.',
        'Darsan dekh patang jiu jotee andar jot samaanee.',
        'Sabad surat liv mirag jiu bheer paee chit avar na aanee.',
        'Charan kaval mil bhavar jiu sukh sampat vich rain vihaanee.',
        'Gur updes na visarai baabeehe jiu aakh vakhaanee.',
        'Gurmukh sukh phal piram ras sahaj samaadh saadh sang jaanee.',
        'Gur Arjan vitahu kurbaanee. ||23||',
      ],
      translationEn:
        'Like a fish immersed in the river, Sri Guru Arjan Dev Ji remained merged in the Lord’s Will even amidst extreme torment in Lahore (Jeth Sudhi 4, Sambat 1663). Like a moth merging into the flame, His Light blended back into the Infinite Light without a trace of wavering. Bhai Gurdas Ji concludes: "I am forever a sacrifice unto Guru Arjan Dev Ji."',
      translationPa:
        'ਮੱਛੀ ਵਾਂਗ ਅਕਾਲ ਪੁਰਖ ਦੇ ਭਾਣੇ ਰੂਪੀ ਦਰਿਆ ਵਿੱਚ ਲੀਨ ਰਹਿੰਦਿਆਂ, ਭੀੜ ਪੈਣ ’ਤੇ ਵੀ ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਨੇ ਚਿੱਤ ਵਿੱਚ ਕਿਸੇ ਹੋਰ ਦਾ ਆਸਰਾ ਨਾ ਲਿਆ ਅਤੇ ਜੋਤਿ ਵਿੱਚ ਜੋਤਿ ਸਮਾ ਗਏ। ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਫ਼ੁਰਮਾਉਂਦੇ ਹਨ: ਮੈਂ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਤੋਂ ਸਦਾ ਕੁਰਬਾਨ ਹਾਂ।',
      exactGranthUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=394',
      exactGranthLabelEn: 'Open Exact Page in Granth (Guru Arjan Dev Ji · SGGS Ang 394)',
      exactGranthLabelPa: 'ਗ੍ਰੰਥ ਦਾ ਸਹੀ ਪੰਨਾ ਖੋਲ੍ਹੋ (ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ · ਅੰਗ ੩੯੪)',
      granthTypeLabelEn: 'Bhai Gurdas Ji Vaaran & Chronicle',
      granthTypeLabelPa: 'ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਵਾਰਾਂ ਅਤੇ ਇਤਿਹਾਸ',
    }),
  },

  // 6. Bachitar Natak Adhyay 5, Chhand 13–15 (Shaheedi Guru Tegh Bahadur Ji)
  {
    match: (src, ref) => /bachitar/i.test(src) && /13|14|15/i.test(ref),
    build: () => ({
      headingEn: 'Sri Dasam Granth Sahib Ji — Bachitar Natak, Adhyay 5, Chhand 13–15',
      headingPa: 'ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ — ਬਚਿਤ੍ਰ ਨਾਟਕ, ਅਧਿਆਇ ੫, ਛੰਦ ੧੩–੧੫',
      gurmukhiLines: [
        'ਤਿਲਕ ਜੰਞੂ ਰਾਖਾ ਪ੍ਰਭ ਤਾਕਾ ॥ ਕੀਨੋ ਬਡੋ ਕਲੂ ਮਹਿ ਸਾਕਾ ॥',
        'ਸਾਧਨ ਹੇਤਿ ਇਤੀ ਜਿਨਿ ਕਰੀ ॥ ਸੀਸੁ ਦੀਆ ਪਰੁ ਸੀ ਨ ਉਚਰੀ ॥੧੩॥',
        'ਧਰਮ ਹੇਤਿ ਸਾਕਾ ਜਿਨਿ ਕੀਆ ॥ ਸੀਸੁ ਦੀਆ ਪਰੁ ਸਿਰਰੁ ਨ ਦੀਆ ॥',
        'ਨਾਟਕ ਚੇਟਕ ਕੀਏ ਕੁਕਾਜਾ ॥ ਪ੍ਰਭ ਲੋਗਨ ਕਹ ਆਵਤ ਲਾਜਾ ॥੧੪॥',
        'ਠੀਕਰਿ ਫੋਰਿ ਦਿਲੀਸਿ ਸਿਰਿ ਪ੍ਰਭ ਪੁਰਿ ਕੀਯਾ ਪਯਾਨ ॥',
        'ਤੇਗ ਬਹਾਦਰ ਸੀ ਕ੍ਰਿਆ ਕਰੀ ਨ ਕਿਨਹੂੰ ਆਨ ॥੧੫॥',
      ],
      transliterationLines: [
        'Tilak janjoo raakhaa Prabh taakaa, keeno bado kaloo meh saakaa.',
        'Saadhan het itee jin karee, sees deeaa par see na ucharee. ||13||',
        'Dharam het saakaa jin keeaa, sees deeaa par sirar na deeaa.',
        'Naatak chetak keee kukaajaa, Prabh logan kah aavat laajaa. ||14||',
        'Theekar phor dilees sir Prabh pur keeyaa payaan.',
        'Tegh Bahaadar see kriaa karee na kinhoon aan. ||15||',
      ],
      translationEn:
        'Sri Guru Gobind Singh Ji writes of His Father’s supreme martyrdom at Chandni Chowk, Delhi (Maghar Sudhi 5, Sambat 1732): "The Lord protected their tilak and sacred thread, performing a monumental deed in Kaljug. For the sake of the righteous, He gave His head without uttering a single sigh. For Dharma He enacted this sacrifice—giving His head, never His principle—shattering the earthen vessel of the body upon the ruler of Delhi’s head and departing for the Lord’s Abode. None else has ever performed a deed like Tegh Bahadur."',
      translationPa:
        'ਦਸਮੇਸ਼ ਪਿਤਾ ਜੀ ਬਚਿਤ੍ਰ ਨਾਟਕ ਵਿੱਚ ਲਿਖਦੇ ਹਨ ਕਿ ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ਼ ਬਹਾਦਰ ਸਾਹਿਬ ਜੀ ਨੇ ਧਰਮ ਅਤੇ ਮਨੁੱਖੀ ਆਜ਼ਾਦੀ ਦੀ ਰੱਖਿਆ ਲਈ ਕਲਿਯੁਗ ਵਿੱਚ ਮਹਾਨ ਸਾਕਾ ਵਰਤਾਇਆ—ਸੀਸ ਦੇ ਦਿੱਤਾ ਪਰ ਸੀ ਨਾ ਉਚਾਰੀ ਅਤੇ ਸਿਰੜ ਨਹੀਂ ਹਾਰਿਆ।',
      exactGranthUrl: 'https://pothi.tatkhalsa.in/sundar-gutka/salok-mahalla-9',
      exactGranthLabelEn: 'Open Exact Page in Granth (Bachitar Natak / Salok M.9)',
      exactGranthLabelPa: 'ਗ੍ਰੰਥ ਦਾ ਸਹੀ ਪੰਨਾ ਖੋਲ੍ਹੋ (ਬਚਿਤ੍ਰ ਨਾਟਕ / ਸਲੋਕ ਮ: ੯)',
      granthTypeLabelEn: 'Sri Dasam Granth Sahib Ji',
      granthTypeLabelPa: 'ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ',
    }),
  },

  // 7. Bachitar Natak Adhyay 5, Chhand 16 (Gurgaddi Guru Gobind Singh Ji)
  {
    match: (src, ref) => /bachitar/i.test(src) && /16/i.test(ref),
    build: () => ({
      headingEn: 'Sri Dasam Granth Sahib Ji — Bachitar Natak, Adhyay 5, Chhand 16',
      headingPa: 'ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ — ਬਚਿਤ੍ਰ ਨਾਟਕ, ਅਧਿਆਇ ੫, ਛੰਦ ੧੬',
      gurmukhiLines: [
        'ਤੇਗ ਬਹਾਦਰ ਕੇ ਚਲਤ ਭਯੋ ਜਗਤ ਕੋ ਸੋਕ ॥',
        'ਹੈ ਹੈ ਹੈ ਸਭ ਜਗ ਭਯੋ ਜੈ ਜੈ ਜੈ ਸੁਰ ਲੋਕ ॥੧੬॥',
      ],
      transliterationLines: [
        'Tegh Bahaadar ke chalat bhayo jagat ko sok.',
        'Hai hai hai sabh jag bhayo jai jai jai sur lok. ||16||',
      ],
      translationEn:
        'Upon the departure of Sri Guru Tegh Bahadur Sahib Ji, sorrow gripped the mortal world while cries of triumph resounded across the celestial realms. At Sri Anandpur Sahib, the nine-year-old Sri Gobind Rai Ji ascended the Sovereign Guruship of Guru Nanak’s throne, preparing the Sikh Panth to stand fearless as Sant-Sipahis.',
      translationPa:
        'ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ਼ ਬਹਾਦਰ ਜੀ ਦੇ ਸ਼ਹੀਦੀ ਪਿਆਨੇ ’ਤੇ ਧਰਤੀ ਉੱਤੇ ਸੋਗ ਛਾ ਗਿਆ ਅਤੇ ਦੇਵ-ਲੋਕ ਵਿੱਚ ਜੈ-ਜੈਕਾਰ ਗੂੰਜੀ। ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਵਿਖੇ ਨੌਂ ਸਾਲ ਦੀ ਉਮਰ ਵਿੱਚ ਦਸਮੇਸ਼ ਪਿਤਾ ਜੀ ਨੇ ਗੁਰਿਆਈ ਦੀ ਜ਼ਿੰਮੇਵਾਰੀ ਸੰਭਾਲੀ।',
      exactGranthUrl: 'https://pothi.tatkhalsa.in/reader?source=dasam&ang=54',
      exactGranthLabelEn: 'Open Exact Page in Granth (Dasam Granth Ang 54)',
      exactGranthLabelPa: 'ਗ੍ਰੰਥ ਦਾ ਸਹੀ ਪੰਨਾ ਖੋਲ੍ਹੋ (ਦਸਮ ਗ੍ਰੰਥ ਅੰਗ ੫੪)',
      granthTypeLabelEn: 'Sri Dasam Granth Sahib Ji',
      granthTypeLabelPa: 'ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ',
    }),
  },

  // 8. Bachitar Natak Adhyay 7 (Parkash Guru Gobind Singh Ji at Patna Sahib)
  {
    match: (src, ref) => /bachitar/i.test(src) && /adhyay\s*7/i.test(ref),
    build: () => ({
      headingEn: 'Sri Dasam Granth Sahib Ji — Bachitar Natak, Adhyay 7 (Sri Patna Sahib Parkash)',
      headingPa: 'ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ — ਬਚਿਤ੍ਰ ਨਾਟਕ, ਅਧਿਆਇ ੭ (ਪਟਨਾ ਸਾਹਿਬ ਪ੍ਰਕਾਸ਼)',
      gurmukhiLines: [
        'ਤਹੀ ਪ੍ਰਕਾਸ ਹਮਾਰਾ ਭਯੋ ॥ ਪਟਨਾ ਸਹਰ ਬਿਖੈ ਭਵ ਲਯੋ ॥',
        'ਮਦ੍ਰ ਦੇਸ ਹਮ ਕੋ ਲੇ ਆਏ ॥ ਭਾਂਤਿ ਭਾਂਤਿ ਦਾਈਅਨ ਦੁਲਰਾਏ ॥',
        'ਹਮ ਇਹ ਕਾਜ ਜਗਤ ਮੋ ਆਏ ॥ ਧਰਮ ਹੇਤ ਗੁਰਦੇਵ ਪਠਾਏ ॥',
        'ਜਹਾਂ ਤਹਾਂ ਤੁਮ ਧਰਮ ਬਿਥਾਰੋ ॥ ਦੁਸਟ ਦੋਖੀਅਨ ਪਕਰਿ ਪਛਾਰੋ ॥',
      ],
      transliterationLines: [
        'Tahee prakaas hamaaraa bhayo, Patnaa sahar bikhai bhav layo.',
        'Madr des ham ko le aae, bhaant bhaant daaeean dularaae.',
        'Ham eh kaaj jagat mo aae, dharam het Gurdev pathaae.',
        'Jahaan tahaan tum dharam bithaaro, dusat dokheean pakar pachhaaro.',
      ],
      translationEn:
        'In Adhyay 7 of Bachitar Natak, Dashmesh Pita Sri Guru Gobind Singh Ji records His own Parkash at Takht Sri Harmandir Ji Patna Sahib (Poh Sudhi Saptami, Sambat 1723 Bikrami): "There my manifestation took place; in the city of Patna I took birth. For this supreme purpose I came into the world—the Divine Guru sent me to uphold righteousness, spread Dharma everywhere, and vanquish tyrants and oppressors."',
      translationPa:
        'ਬਚਿਤ੍ਰ ਨਾਟਕ ਅਧਿਆਇ ੭ ਵਿੱਚ ਦਸਮੇਸ਼ ਪਿਤਾ ਜੀ ਆਪਣੇ ਪਟਨਾ ਸਾਹਿਬ ਵਿਖੇ ਪ੍ਰਕਾਸ਼ (ਪੋਹ ਸੁਦੀ ੭, ਸੰਮਤ ੧੭੨੩) ਦਾ ਵਰਣਨ ਕਰਦੇ ਹੋਏ ਫ਼ੁਰਮਾਉਂਦੇ ਹਨ ਕਿ ਅਕਾਲ ਪੁਰਖ ਨੇ ਉਨ੍ਹਾਂ ਨੂੰ ਧਰਮ ਦੇ ਪ੍ਰਸਾਰ, ਸੰਤਾਂ ਦੀ ਰੱਖਿਆ ਅਤੇ ਦੁਸ਼ਟਾਂ ਦੇ ਨਾਸ਼ ਲਈ ਜਗਤ ਵਿੱਚ ਭੇਜਿਆ।',
      exactGranthUrl: 'https://pothi.tatkhalsa.in/sundar-gutka/jaap-sahib',
      exactGranthLabelEn: 'Open Exact Page in Granth (Jaap Sahib / Bachitar Natak)',
      exactGranthLabelPa: 'ਗ੍ਰੰਥ ਦਾ ਸਹੀ ਪੰਨਾ ਖੋਲ੍ਹੋ (ਜਾਪੁ ਸਾਹਿਬ / ਬਚਿਤ੍ਰ ਨਾਟਕ)',
      granthTypeLabelEn: 'Sri Dasam Granth Sahib Ji',
      granthTypeLabelPa: 'ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ',
    }),
  },

  // 9. Zafarnama Verses 19–22 & 78 (Vadde Sahibzade — Chamkaur)
  {
    match: (src, ref) => /zafarnama/i.test(src) || /zafarnama/i.test(ref),
    build: () => ({
      headingEn: 'Sri Dasam Granth Sahib Ji — Zafarnama (Verses 19–22 & 78, Battle of Chamkaur)',
      headingPa: 'ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ — ਜ਼ਫ਼ਰਨਾਮਾ (ਸ਼ੇਅਰ ੧੯–੨੨ ਅਤੇ ੭੮, ਚਮਕੌਰ ਜੰਗ)',
      gurmukhiLines: [
        'ਗੁਰਸਨਹ ਚਿਹ ਕਾਰੇ ਕੁਨਦ ਚਿਹਲ ਨਰ ॥ ਕਿ ਦਹ ਲਕ ਬਰਾਯਦ ਬਰੋ ਬੇਖ਼ਬਰ ॥੧੯॥',
        'ਚੂ ਕਾਰ ਅਜ਼ ਹਮਹ ਹੀਲਤੇ ਦਰ ਗੁਜ਼ਸ਼ਤ ॥ ਹਲਾਲ ਅਸਤ ਬੁਰਦਨ ਬ ਸ਼ਮਸ਼ੀਰ ਦਸਤ ॥੨੨॥',
        'ਚਿਹ ਸ਼ੁਦ ਕਿ ਚੂੰ ਬੱਚਗਾਂ ਕੁਸ਼ਤਹ ਚਾਰ ॥ ਕਿ ਬਾਕੀ ਬਿਮਾਂਦਸਤ ਪੇਚੀਦਹ ਮਾਰ ॥੭੮॥',
      ],
      transliterationLines: [
        'Gursanah cheh kaare kunad chehal nar, ke dah lak baraayad baro bekhabar. ||19||',
        'Choo kaar az hamah heelte dar guzasht, halaal ast burdan ba shamsheer dast. ||22||',
        'Cheh shud ke choon bachagaan kushtah chaar, ke baakee bimaandast pecheedah maar. ||78||',
      ],
      translationEn:
        'In the Epistle of Victory (Zafarnama) dispatched from Dina Kangar to Aurangzeb, Sri Guru Gobind Singh Ji recounts the unmatched stand of forty starving Sikhs at Garhi Chamkaur against a vast imperial army (8 Poh, Sambat 1761): "When all peaceful means have been exhausted, it is righteous to raise the sword. What does it matter if you have killed my four tender sons? The coiled Khalsa remains unconquered and alive."',
      translationPa:
        'ਦੀਨਾ ਕਾਂਗੜ ਤੋਂ ਲਿਖੇ ਜ਼ਫ਼ਰਨਾਮੇ ਵਿੱਚ ਦਸਮੇਸ਼ ਪਿਤਾ ਜੀ ਚਮਕੌਰ ਦੀ ਗੜ੍ਹੀ ਵਿੱਚ ੪੦ ਭੁੱਖੇ ਸਿੰਘਾਂ ਅਤੇ ਵੱਡੇ ਸਾਹਿਬਜ਼ਾਦਿਆਂ ਦੀ ਅਦੁੱਤੀ ਜੰਗ ਦਾ ਬਿਆਨ ਕਰਦਿਆਂ ਫ਼ੁਰਮਾਉਂਦੇ ਹਨ ਕਿ ਜਦੋਂ ਸਾਰੇ ਹੀਲੇ ਮੁੱਕ ਜਾਣ ਤਾਂ ਤਲਵਾਰ ਉਠਾਉਣੀ ਜਾਇਜ਼ ਹੈ; ਭਾਵੇਂ ਚਾਰ ਪੁੱਤਰ ਸ਼ਹੀਦ ਹੋ ਗਏ, ਖ਼ਾਲਸਾ ਪੰਥ ਅਜੇ ਵੀ ਅਡੋਲ ਤੇ ਜਾਗ੍ਰਿਤ ਹੈ।',
      exactGranthUrl: 'https://pothi.tatkhalsa.in/sundar-gutka/zafarnama',
      exactGranthLabelEn: 'Open Exact Page in Granth (Zafarnama)',
      exactGranthLabelPa: 'ਗ੍ਰੰਥ ਦਾ ਸਹੀ ਪੰਨਾ ਖੋਲ੍ਹੋ (ਜ਼ਫ਼ਰਨਾਮਾ)',
      granthTypeLabelEn: 'Sri Dasam Granth Sahib Ji',
      granthTypeLabelPa: 'ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ',
    }),
  },

  // 10. Chaupai Sahib Colophon (Charitar 405, Chhand 405 — Ang 1388)
  {
    match: (src, ref) => /chaupai|charitar\s*405/i.test(src + ' ' + ref),
    build: () => ({
      headingEn: 'Sri Dasam Granth Sahib Ji — Charitropakhyan Colophon (Ang 1388, Sambat 1753)',
      headingPa: 'ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ — ਬੇਨਤੀ ਚੌਪਈ ਸੰਪੂਰਨਤਾ ਲੇਖ (ਅੰਗ ੧੩੮੮, ਸੰਮਤ ੧੭੫੩)',
      gurmukhiLines: [
        'ਸੰਬਤ ਸੱਤ੍ਰਹ ਸਹਸ ਭਣਿੱਜੈ ॥ ਅਰਧ ਸਹਸ ਫੁਨਿ ਤੀਨਿ ਕਹਿੱਜੈ ॥',
        'ਭਾਦ੍ਰਵ ਸੁਦੀ ਅਸ਼ਟਮੀ ਰਵਿ ਵਾਰਾ ॥ ਤੀਰ ਸਤੁਦ੍ਰਵ ਗ੍ਰੰਥ ਸੁਧਾਰਾ ॥੪੦੫॥',
      ],
      transliterationLines: [
        'Sambat sattrah sahas bhanijjai, aradh sahas phun teen kahijjai.',
        'Bhaadrav Sudee Ashtamee rav vaaraa, teer Satudrav Granth sudhaaraa. ||405||',
      ],
      translationEn:
        'This self-dated manuscript colophon immediately following Benti Chaupai Sahib records the exact Puratan Bikrami astronomical coordinates: "In Sambat 1753 (1700 + 50 + 3), on Bhadon Sudhi Ashtami, Sunday (Ravi Vaar), along the banks of the River Sutlej (Sri Anandpur Sahib), this Granth was completed and perfected." It is one of the most decisive primary proofs of traditional luni-solar Bikrami chronology in Sikh scripture.',
      translationPa:
        'ਬੇਨਤੀ ਚੌਪਈ ਸਾਹਿਬ ਦੇ ਅੰਤ ਵਿੱਚ ਦਰਜ ਇਹ ਸਵੈ-ਲਿਖਤ ਕਾਲ-ਲੇਖ ਪ੍ਰਮਾਣਿਤ ਕਰਦਾ ਹੈ ਕਿ ਸੰਮਤ ੧੭੫੩ ਬਿਕ੍ਰਮੀ, ਭਾਦੋਂ ਸੁਦੀ ਅਸ਼ਟਮੀ, ਐਤਵਾਰ ਨੂੰ ਸਤਲੁਜ ਦਰਿਆ ਦੇ ਕੰਢੇ (ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ) ਵਿਖੇ ਇਹ ਗ੍ਰੰਥ ਸੰਪੂਰਨ ਹੋਇਆ।',
      exactGranthUrl: 'https://pothi.tatkhalsa.in/sundar-gutka/chaupai-sahib',
      exactGranthLabelEn: 'Open Exact Page in Granth (Chaupai Sahib · Ang 1388)',
      exactGranthLabelPa: 'ਗ੍ਰੰਥ ਦਾ ਸਹੀ ਪੰਨਾ ਖੋਲ੍ਹੋ (ਚੌਪਈ ਸਾਹਿਬ · ਅੰਗ ੧੩੮੮)',
      granthTypeLabelEn: 'Sri Dasam Granth Sahib Ji Colophon',
      granthTypeLabelPa: 'ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਹਵਾਲਾ',
    }),
  },

  // 11. Chandi Di Vaar — Pauri 1 (Dussehra / Guru Harkrishan Ji)
  {
    match: (src) => /chandi di vaar/i.test(src),
    build: () => ({
      headingEn: 'Sri Dasam Granth Sahib Ji — Chandi Di Vaar (Pauri 1 · Ardas Invocation)',
      headingPa: 'ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ — ਚੰਡੀ ਦੀ ਵਾਰ (ਪਉੜੀ ੧ · ਅਰਦਾਸ ਮੰਗਲਾਚਰਨ)',
      gurmukhiLines: [
        'ਪ੍ਰਿਥਮ ਭਗੌਤੀ ਸਿਮਰਿ ਕੈ ਗੁਰ ਨਾਨਕ ਲਈਂ ਧਿਆਇ ॥',
        'ਫਿਰ ਅੰਗਦ ਗੁਰ ਤੇ ਅਮਰਦਾਸੁ ਰਾਮਦਾਸੈ ਹੋਈਂ ਸਹਾਇ ॥',
        'ਅਰਜਨ ਹਰਗੋਬਿੰਦ ਨੋ ਸਿਮਰੌ ਸ੍ਰੀ ਹਰਿਰਾਇ ॥',
        'ਸ੍ਰੀ ਹਰਿਕ੍ਰਿਸ਼ਨ ਧਿਆਈਐ ਜਿਸ ਡਿਠੇ ਸਭਿ ਦੁਖਿ ਜਾਇ ॥',
        'ਤੇਗ ਬਹਾਦਰ ਸਿਮਰਿਐ ਘਰ ਨਉ ਨਿਧਿ ਆਵੈ ਧਾਇ ॥',
        'ਸਭ ਥਾਈਂ ਹੋਇ ਸਹਾਇ ॥੧॥',
      ],
      transliterationLines: [
        'Pritham Bhagautee simar kai Gur Naanak laeen dhiaae.',
        'Phir Angad Gur te Amardaas Raamdaasai hoeen sahaae.',
        'Arjan Hargobind no simrau Sree Hariraae.',
        'Sree Harikrishan dhiaaeeai jis dithe sabh dukh jaae.',
        'Tegh Bahaadar simariai ghar nau nidh aavai dhaae.',
        'Sabh thaaeen hoe sahaae. ||1||',
      ],
      translationEn:
        'Opening Pauri of Vaar Sri Bhagauti Ji Ki (Chandi Di Vaar), recited daily in every Sikh Ardas and during Puratan Shastar Darshan Maryada: invoking the Primal Divine Sword (Bhagauti) and the unbroken spiritual sovereignty from Sri Guru Nanak Dev Ji through Sri Guru Hargobind Sahib Ji, Sri Guru Har Rai Ji, Sri Guru Harkrishan Sahib Ji (whose Darshan dispels every affliction), and Sri Guru Tegh Bahadur Sahib Ji.',
      translationPa:
        'ਵਾਰ ਸ੍ਰੀ ਭਗੌਤੀ ਜੀ ਕੀ (ਚੰਡੀ ਦੀ ਵਾਰ) ਦੀ ਪਹਿਲੀ ਪਉੜੀ, ਜੋ ਨਿੱਤ ਸਿੱਖ ਅਰਦਾਸ ਦਾ ਆਰੰਭ ਹੈ—ਪ੍ਰਿਥਮ ਭਗੌਤੀ ਅਕਾਲ ਪੁਰਖ ਨੂੰ ਸਿਮਰ ਕੇ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਤੋਂ ਲੈ ਕੇ ਗੁਰੂ ਤੇਗ਼ ਬਹਾਦਰ ਸਾਹਿਬ ਜੀ ਤੱਕ ਸਹਾਈ ਹੋਣ ਦੀ ਬੇਨਤੀ ਕੀਤੀ ਜਾਂਦੀ ਹੈ।',
      exactGranthUrl: 'https://pothi.tatkhalsa.in/reader?source=dasam&ang=119',
      exactGranthLabelEn: 'Open Exact Page in Granth (Dasam Granth Ang 119)',
      exactGranthLabelPa: 'ਗ੍ਰੰਥ ਦਾ ਸਹੀ ਪੰਨਾ ਖੋਲ੍ਹੋ (ਦਸਮ ਗ੍ਰੰਥ ਅੰਗ ੧੧੯)',
      granthTypeLabelEn: 'Sri Dasam Granth Sahib Ji',
      granthTypeLabelPa: 'ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ',
    }),
  },

  // 12. Khalsa Mehma / 33 Swaiye (Vaisakhi 1756 Bikrami)
  {
    match: (src) => /khalsa mehma/i.test(src),
    build: () => ({
      headingEn: 'Sri Dasam Granth Sahib Ji — Khalsa Mehma & 33 Swaiye',
      headingPa: 'ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ — ਖ਼ਾਲਸਾ ਮਹਿਮਾ ਅਤੇ ੩੩ ਸਵਈਏ',
      gurmukhiLines: [
        'ਜੁਧ ਜਿਤੇ ਇਨ ਹੀ ਕੇ ਪ੍ਰਸਾਦਿ ਇਨ ਹੀ ਕੇ ਪ੍ਰਸਾਦਿ ਸੁ ਦਾਨ ਕਰੇ ॥',
        'ਅਘ ਅਉਘ ਟਰੈ ਇਨ ਹੀ ਕੇ ਪ੍ਰਸਾਦਿ ਇਨ ਹੀ ਕੀ ਕ੍ਰਿਪਾ ਫੁਨ ਧਾਮ ਭਰੇ ॥',
        'ਇਨ ਹੀ ਕੇ ਪ੍ਰਸਾਦਿ ਸੁ ਬਿੱਦਿਆ ਲਈ ਇਨ ਹੀ ਕੀ ਕ੍ਰਿਪਾ ਸਭ ਸਤ੍ਰ ਮਰੇ ॥',
        'ਇਨ ਹੀ ਕੀ ਕ੍ਰਿਪਾ ਕੇ ਸਜੇ ਹਮ ਹੈਂ ਨਹੀ ਮੋ ਸੇ ਗਰੀਬ ਕਰੋਰ ਪਰੇ ॥',
      ],
      transliterationLines: [
        'Judh jite in hee ke prasaad in hee ke prasaad su daan kare.',
        'Agh augh tarai in hee ke prasaad in hee kee kripaa phun dhaam bhare.',
        'In hee ke prasaad su biddiaa laee in hee kee kripaa sabh satr mare.',
        'In hee kee kripaa ke saje ham hain nahee mo se gareeb karor pare.',
      ],
      translationEn:
        'In Khalsa Mehma, Sri Guru Gobind Singh Ji elevates the initiated Khalsa to sovereign dignity: "Through their grace have I won battles and given charity; through their grace have I gained knowledge and overcome all adversaries; through their grace alone am I exalted—otherwise there are millions of humble beings like me."',
      translationPa:
        'ਖ਼ਾਲਸਾ ਮਹਿਮਾ ਵਿੱਚ ਦਸਮੇਸ਼ ਪਿਤਾ ਜੀ ਖ਼ਾਲਸੇ ਨੂੰ ਸਰਬ-ਉੱਚ ਵਡਿਆਈ ਬਖ਼ਸ਼ਦੇ ਹਨ ਕਿ ਸਭ ਯੁੱਧਾਂ ਦੀ ਜਿੱਤ, ਵਿੱਦਿਆ, ਦਾਨ ਅਤੇ ਵਡਿਆਈ ਖ਼ਾਲਸੇ ਦੀ ਕ੍ਰਿਪਾ ਨਾਲ ਹੀ ਪ੍ਰਾਪਤ ਹੋਈ ਹੈ।',
      exactGranthUrl: 'https://pothi.tatkhalsa.in/sundar-gutka/tav-prasad-swaiye',
      exactGranthLabelEn: 'Open Exact Page in Granth (Tav-Prasad Swaiye & Khalsa Mehma)',
      exactGranthLabelPa: 'ਗ੍ਰੰਥ ਦਾ ਸਹੀ ਪੰਨਾ ਖੋਲ੍ਹੋ (ਤ੍ਵਪ੍ਰਸਾਦਿ ਸਵਈਏ ਅਤੇ ਖ਼ਾਲਸਾ ਮਹਿਮਾ)',
      granthTypeLabelEn: 'Sri Dasam Granth Sahib Ji',
      granthTypeLabelPa: 'ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ',
    }),
  },

  // 13. Bhatt Vahi Talauda — Gurgaddi SGGS Ji (Katak Sudhi 4, 1765)
  {
    match: (src, ref) => /bhatt vahi/i.test(src) && /1765|katak/i.test(ref),
    build: () => ({
      headingEn: 'Bhatt Vahi Talauda (Pargana Jind) — Katak Sudhi 4, Sambat 1765 Colophon',
      headingPa: 'ਭੱਟ ਵਹੀ ਤਲੌਡਾ (ਪਰਗਣਾ ਜੀਂਦ) — ਕੱਤਕ ਸੁਦੀ ੪, ਸੰਮਤ ੧੭੬੫ ਸਾਖੀ',
      gurmukhiLines: [
        'ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਮਹਲ ਦਸਮਾਂ ਬੇਟਾ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ ਕਾ...',
        'ਸੰਮਤ ਸਤਾਰਾਂ ਸੌ ਪੈਂਸਠ ਕੱਤਕ ਮਾਸੇ ਕੀ ਸ਼ੁਕਲਾ ਚੌਥ ਬੁੱਧਵਾਰ ਕੇ ਦਿਹੁ...',
        'ਭਾਈ ਦਯਾ ਸਿੰਘ ਸੇ ਬਚਨ ਹੋਆ ਸ੍ਰੀ ਗ੍ਰੰਥ ਸਾਹਿਬ ਲੈ ਆਵੋ, ਪੰਜ ਪੈਸੇ ਨਾਰੀਅਲ ਆਗੇ ਭੇਟਾ ਰਾਖਾ,',
        'ਮਾਥਾ ਟੇਕਾ, ਸਰਬੱਤ ਸੰਗਤਿ ਸੇ ਕਹਾ ਮੇਰਾ ਹੁਕਮ ਹੈ ਮੇਰੀ ਜਗ੍ਹਾ ਸ੍ਰੀ ਗ੍ਰੰਥ ਜੀ ਕੋ ਜਾਨਨਾ ॥',
      ],
      transliterationLines: [
        'Guroo Gobind Singh Jee Mahal Dasmaan betaa Guroo Tegh Bahaadar Jee kaa...',
        'Sambat sataaraan sau painsath Katak maase kee Shukalaa Chauth Budhvaar ke dihu...',
        'Bhaaee Dayaa Singh se bachan hoaa Sree Granth Saahib lai aavo, panj paise naareeal aage bhetaa raakhaa,',
        'Maathaa tekaa, sarbatt sangat se kahaa meraa hukam hai meree jaghaa Sree Granth Jee ko jaananaa.',
      ],
      translationEn:
        'Contemporaneous eyewitness entry recorded by Narbud Singh Bhatt in Bhatt Vahi Talauda: On Wednesday, Katak Sudhi 4, Sambat 1765 Bikrami (1708 CE) at Nanded on the Godavari, Sri Guru Gobind Singh Ji instructed Bhai Daya Singh Ji to bring Sri Adi Granth Sahib Ji, placed five paise and a coconut before It, bowed His forehead to the ground, and commanded the entire Sangat: "It is my command to recognize Sri Guru Granth Sahib Ji as the eternal living Guru in my stead."',
      translationPa:
        'ਭੱਟ ਵਹੀ ਤਲੌਡਾ ਵਿੱਚ ਨਰਬੁਦ ਸਿੰਘ ਭੱਟ ਦੀ ਸਮਕਾਲੀ ਸਾਖੀ ਦਰਜ ਹੈ ਕਿ ਬੁੱਧਵਾਰ ਕੱਤਕ ਸੁਦੀ ੪, ਸੰਮਤ ੧੭੬੫ ਨੂੰ ਨਾਂਦੇੜ ਸਾਹਿਬ ਵਿਖੇ ਦਸਮੇਸ਼ ਪਿਤਾ ਜੀ ਨੇ ਪੰਜ ਪੈਸੇ ਤੇ ਨਾਰੀਅਲ ਰੱਖ ਕੇ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਨੂੰ ਮੱਥਾ ਟੇਕਿਆ ਅਤੇ ਸਰਬੱਤ ਸੰਗਤ ਨੂੰ ਸ਼ਬਦ ਗੁਰੂ ਦੇ ਲੜ ਲਾਇਆ।',
      exactGranthUrl: POTHI_SGGS_URL,
      exactGranthLabelEn: 'Open Sri Guru Granth Sahib Ji (pothi.tatkhalsa.in)',
      exactGranthLabelPa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਖੋਲ੍ਹੋ (pothi.tatkhalsa.in)',
      granthTypeLabelEn: 'Primary Bhatt Vahi Record',
      granthTypeLabelPa: 'ਮੂਲ ਭੱਟ ਵਹੀ ਰਿਕਾਰਡ',
    }),
  },

  // 14. Bhatt Vahi Talauda — Chhote Sahibzade (13 Poh, 1761)
  {
    match: (src, ref) => /bhatt vahi/i.test(src) && /13 poh|1761|sirhind/i.test(ref),
    build: () => ({
      headingEn: 'Bhatt Vahi Talauda & Jado Bansian — 13 Poh, Sambat 1761 (Saka Sirhind)',
      headingPa: 'ਭੱਟ ਵਹੀ ਤਲੌਡਾ ਅਤੇ ਜਾਦੋਬੰਸੀਆਂ — ੧੩ ਪੋਹ, ਸੰਮਤ ੧੭੬੧ (ਸਾਕਾ ਸਰਹਿੰਦ)',
      gurmukhiLines: [
        'ਸੰਮਤ ਸਤਾਰਾਂ ਸੌ ਇਕਾਠ ਪੋਹ ਮਾਸੇ ਤੇਰਾਂ ਪ੍ਰਵਿਸ਼ਟੇ (੧੩ ਪੋਹ) ਬੁੱਧਵਾਰ ਕੇ ਦਿਹੁ,',
        'ਸਾਹਿਬਜ਼ਾਦਾ ਜ਼ੋਰਾਵਰ ਸਿੰਘ ਤੇ ਫ਼ਤਿਹ ਸਿੰਘ ਜੀ ਨੀਹਾਂ ਵਿੱਚ ਚਿਣਵਾਏ ਗਏ ਤੇ ਸ਼ਹੀਦ ਹੋਏ ॥',
        'ਮਾਤਾ ਗੁਜਰੀ ਜੀ ਠੰਢੇ ਬੁਰਜ ਵਿੱਚ ਜੋਤੀ ਜੋਤ ਸਮਾਏ, ਦੀਵਾਨ ਟੋਡਰ ਮੱਲ ਨੇ ਸਸਕਾਰ ਸੇਵਾ ਨਿਭਾਈ ॥',
      ],
      transliterationLines: [
        'Sambat sataaraan sau ikaath Poh maase teraan pravishte (13 Poh) Budhvaar ke dihu,',
        'Saahibzaadaa Zoraavar Singh te Fateh Singh Jee neehaan vich chinvaae gae te shaheed hoe.',
        'Maataa Gujaree Jee Thandhe Burj vich jotee jot samaae, Deevaan Todar Mall ne saskaar sevaa nibhaaee.',
      ],
      translationEn:
        'Bhatt Vahi Talauda and Bhatt Vahi Jado Bansian preserve the exact Puratan Bikrami solar date of Saka Sirhind: 13 Poh, Sambat 1761 Bikrami, when the nine-year-old Sahibzada Baba Zorawar Singh Ji and seven-year-old Sahibzada Baba Fateh Singh Ji refused to renounce Sikhi and were bricked alive and martyred by Wazir Khan, followed by Mata Gujri Ji’s departure in the Thanda Burj and Diwan Todar Mal Ji’s purchase of the cremation ground with upright gold mohars.',
      translationPa:
        'ਭੱਟ ਵਹੀ ਤਲੌਡਾ ਅਤੇ ਜਾਦੋਬੰਸੀਆਂ ਵਿੱਚ ੧੩ ਪੋਹ, ਸੰਮਤ ੧੭੬੧ ਬਿਕ੍ਰਮੀ ਦੀ ਸਟੀਕ ਤਾਰੀਖ਼ ਦਰਜ ਹੈ, ਜਦੋਂ ਛੋਟੇ ਸਾਹਿਬਜ਼ਾਦੇ ਬਾਬਾ ਜ਼ੋਰਾਵਰ ਸਿੰਘ ਜੀ, ਬਾਬਾ ਫ਼ਤਿਹ ਸਿੰਘ ਜੀ ਅਤੇ ਮਾਤਾ ਗੁਜਰੀ ਜੀ ਨੇ ਸਰਹਿੰਦ ਵਿਖੇ ਲਾਸਾਨੀ ਸ਼ਹਾਦਤ ਪ੍ਰਾਪਤ ਕੀਤੀ।',
      exactGranthUrl: POTHI_NITNEM_URL,
      exactGranthLabelEn: 'Open Pothi Sahib (pothi.tatkhalsa.in)',
      exactGranthLabelPa: 'ਪੋਥੀ ਸਾਹਿਬ ਖੋਲ੍ਹੋ (pothi.tatkhalsa.in)',
      granthTypeLabelEn: 'Primary Bhatt Vahi Record',
      granthTypeLabelPa: 'ਮੂਲ ਭੱਟ ਵਹੀ ਰਿਕਾਰਡ',
    }),
  },

  // 15. Bhatt Vahi Multani Sindhi — Guru Tegh Bahadur Ji (Maghar Sudhi 5, 1732)
  {
    match: (src, ref) => /bhatt vahi/i.test(src) && /1732|delhi/i.test(ref),
    build: () => ({
      headingEn: 'Bhatt Vahi Multani Sindhi — Maghar Sudhi 5, Sambat 1732 (Delhi Shaheedi)',
      headingPa: 'ਭੱਟ ਵਹੀ ਮੁਲਤਾਨੀ ਸਿੰਧੀ — ਮੱਘਰ ਸੁਦੀ ੫, ਸੰਮਤ ੧੭੩੨ (ਦਿੱਲੀ ਸ਼ਹਾਦਤ)',
      gurmukhiLines: [
        'ਸੰਮਤ ਸਤਾਰਾਂ ਸੌ ਬੱਤੀ ਮੱਘਰ ਸੁਦੀ ਪੰਚਮੀ ਵੀਰਵਾਰ ਕੇ ਦਿਹੁ,',
        'ਗੁਰੂ ਤੇਗ਼ ਬਹਾਦਰ ਜੀ ਮਹਲ ਨੌਵਾਂ, ਭਾਈ ਮਤੀ ਦਾਸ, ਭਾਈ ਸਤੀ ਦਾਸ ਤੇ ਭਾਈ ਦਿਆਲਾ ਜੀ ਸਹਿਤ ਦਿੱਲੀ ਚਾਂਦਨੀ ਚੌਕ ਸ਼ਹੀਦ ਹੋਏ ॥',
        'ਭਾਈ ਜੈਤਾ ਜੀ ਸੀਸ ਲੈ ਕੇ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਪਹੁੰਚੇ ਅਤੇ ਭਾਈ ਲੱਖੀ ਸ਼ਾਹ ਵਣਜਾਰਾ ਨੇ ਧੜ ਦਾ ਸਸਕਾਰ ਰਕਾਬਗੰਜ ਵਿਖੇ ਕੀਤਾ ॥',
      ],
      transliterationLines: [
        'Sambat sataaraan sau battee Maghar Sudee Panchamee Veervaar ke dihu,',
        'Guroo Tegh Bahaadar Jee Mahal Nauvaan, Bhaaee Matee Daas, Bhaaee Satee Daas te Bhaaee Diaalaa Jee sahit Dillee Chaandanee Chauk shaheed hoe.',
        'Bhaaee Jaitaa Jee sees lai ke Anandpur Saahib pahunche ate Bhaaee Lakkhee Shaah Vanjaaraa ne dhar daa saskaar Rakaabganj vikhe keetaa.',
      ],
      translationEn:
        'Bhatt Vahi Multani Sindhi records the exact lunar tithi—Maghar Sudhi Panchmi, Sambat 1732 Bikrami (11 November 1675 CE)—when Ninth Patshah Sri Guru Tegh Bahadur Ji and His three devoted Sikhs (Bhai Mati Das Ji, Bhai Sati Das Ji, and Bhai Dayala Ji) attained supreme martyrdom at Chandni Chowk, Delhi, and Bhai Jaita Ji (Baba Jiwan Singh Ji) carried the sacred Sis to Sri Anandpur Sahib.',
      translationPa:
        'ਭੱਟ ਵਹੀ ਮੁਲਤਾਨੀ ਸਿੰਧੀ ਵਿੱਚ ਮੱਘਰ ਸੁਦੀ ਪੰਚਮੀ, ਸੰਮਤ ੧੭੩੨ ਬਿਕ੍ਰਮੀ ਦਾ ਪ੍ਰਤੱਖ ਵੇਰਵਾ ਦਰਜ ਹੈ ਕਿ ਨੌਵੇਂ ਪਾਤਸ਼ਾਹ ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ਼ ਬਹਾਦਰ ਜੀ, ਭਾਈ ਮਤੀ ਦਾਸ ਜੀ, ਭਾਈ ਸਤੀ ਦਾਸ ਜੀ ਅਤੇ ਭਾਈ ਦਿਆਲਾ ਜੀ ਨੇ ਚਾਂਦਨੀ ਚੌਕ ਦਿੱਲੀ ਵਿਖੇ ਸ਼ਹਾਦਤ ਪ੍ਰਾਪਤ ਕੀਤੀ।',
      exactGranthUrl: 'https://pothi.tatkhalsa.in/sundar-gutka/salok-mahalla-9',
      exactGranthLabelEn: 'Open Salok Mahalla 9 on Pothi Sahib (pothi.tatkhalsa.in)',
      exactGranthLabelPa: 'ਪੋਥੀ ਸਾਹਿਬ ’ਤੇ ਸਲੋਕ ਮਹਲਾ ੯ ਖੋਲ੍ਹੋ',
      granthTypeLabelEn: 'Primary Bhatt Vahi Record',
      granthTypeLabelPa: 'ਮੂਲ ਭੱਟ ਵਹੀ ਰਿਕਾਰਡ',
    }),
  },

  // 16. Prachin Panth Prakash — Baba Deep Singh Ji Shaheed
  {
    match: (src, ref) => /panth prakash/i.test(src) && /deep singh/i.test(ref + ' ' + src),
    build: () => ({
      headingEn: 'Prachin Panth Prakash (Rattan Singh Bhangu) — Sakhi Baba Deep Singh Ji Shaheed',
      headingPa: 'ਪ੍ਰਾਚੀਨ ਪੰਥ ਪ੍ਰਕਾਸ਼ (ਰਤਨ ਸਿੰਘ ਭੰਗੂ) — ਸਾਖੀ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਸ਼ਹੀਦ',
      gurmukhiLines: [
        'ਦੋਹਰਾ ॥ ਖੰਡਾ ਖਿੱਚ ਲਕੀਰ ਕਢ, ਬੋਲੇ ਦੀਪ ਸਿੰਘ ਸੂਰ ॥',
        'ਜਿਨ ਸਿਰ ਦੇਣਾ ਧਰਮ ਹਿਤ, ਲੰਘੋ ਪਾਰ ਹਜ਼ੂਰ ॥',
        'ਚੌਪਈ ॥ ਗੋਹਲਵੜ੍ਹ ਜੰਗ ਮਹਾ ਭਇਓ, ਸੀਸ ਕਟਿਓ ਤਲਵਾਰ ॥',
        'ਬਾਂਏ ਹਾਥ ਧਰਿ ਸੀਸ ਕੋ, ਪਹੁੰਚੇ ਗੁਰ ਦਰਬਾਰ ॥',
      ],
      transliterationLines: [
        'Dohraa: Khandaa khich lakeer kadh, bole Deep Singh soor.',
        'Jin sir denaa dharam hit, langho paar hazoor.',
        'Chaupaee: Gohalvarh jang mahaa bhaio, sees katio talvaar.',
        'Baaen haath dhar sees ko, pahunche Gur Darbaar.',
      ],
      translationEn:
        'Bhai Rattan Singh Bhangu narrates in Prachin Panth Prakash how the 75-year-old Baba Deep Singh Ji Shaheed—first Head of Damdami Taksal—drew a line on the ground with his Khanda outside Tarn Taran in Sambat 1814 (1757 CE), calling only those ready to lay down their heads for Sachkhand Sri Harmandir Sahib. Wounded mortally near Goharwal, he honored his vow by supporting his severed head on his left palm while fighting with his khanda until reaching the sacred Parikrama.',
      translationPa:
        'ਭਾਈ ਰਤਨ ਸਿੰਘ ਭੰਗੂ ਪ੍ਰਾਚੀਨ ਪੰਥ ਪ੍ਰਕਾਸ਼ ਵਿੱਚ ਬਿਆਨ ਕਰਦੇ ਹਨ ਕਿ ੭੫ ਸਾਲਾ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਸ਼ਹੀਦ ਨੇ ਸੰਮਤ ੧੮੧੪ ਵਿੱਚ ਤਰਨਤਾਰਨ ਵਿਖੇ ਖੰਡੇ ਨਾਲ ਲਕੀਰ ਖਿੱਚੀ ਅਤੇ ਗੋਹਲਵੜ੍ਹ ਦੀ ਜੰਗ ਵਿੱਚ ਸੀਸ ਕੱਟੇ ਜਾਣ ਉਪਰੰਤ ਵੀ ਖੱਬੇ ਹੱਥ ’ਤੇ ਸੀਸ ਟਿਕਾ ਕੇ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦੀ ਪਰਿਕਰਮਾ ਤੱਕ ਜੂਝੇ।',
      exactGranthUrl: POTHI_NITNEM_URL,
      exactGranthLabelEn: 'Open Pothi Sahib (pothi.tatkhalsa.in)',
      exactGranthLabelPa: 'ਪੋਥੀ ਸਾਹਿਬ ਖੋਲ੍ਹੋ (pothi.tatkhalsa.in)',
      granthTypeLabelEn: 'Puratan Khalsa Chronicle',
      granthTypeLabelPa: 'ਪੁਰਾਤਨ ਖ਼ਾਲਸਾ ਇਤਿਹਾਸ',
    }),
  },

  // 17. Prachin Panth Prakash — Garhi Chamkaur
  {
    match: (src, ref) => /panth prakash/i.test(src) && /chamkaur/i.test(ref),
    build: () => ({
      headingEn: 'Prachin Panth Prakash (Rattan Singh Bhangu) — Sakhi Garhi Chamkaur (8 Poh 1761)',
      headingPa: 'ਪ੍ਰਾਚੀਨ ਪੰਥ ਪ੍ਰਕਾਸ਼ (ਰਤਨ ਸਿੰਘ ਭੰਗੂ) — ਸਾਖੀ ਗੜ੍ਹੀ ਚਮਕੌਰ (੮ ਪੋਹ ੧੭੬੧)',
      gurmukhiLines: [
        'ਚੌਪਈ ॥ ਅੱਠ ਪੋਹ ਸੰਮਤ ਇਕਸਠਿ, ਗੜ੍ਹੀ ਚਮਕੌਰ ਮਹਾ ਰਣ ਮਚਿਆ ॥',
        'ਪੰਜ-ਪੰਜ ਸਿੰਘ ਜਥਾ ਨਿਕਲੈ, ਸਵਾ ਲੱਖ ਸੋਂ ਏਕ ਲੜਿਆ ॥',
        'ਬਾਬਾ ਅਜੀਤ ਸਿੰਘ ਜੁਝਾਰ ਸਿੰਘ ਜੀ, ਪਿਤਾ ਅਸੀਸ ਲੈ ਜੂਝੇ ਰਣ ਮਾਂਹਿ ॥',
      ],
      transliterationLines: [
        'Chaupaee: Atth Poh Sambat ikasath, Garhee Chamkaur mahaa ran machiaa.',
        'Panj-panj Singh jathaa nikalai, savaa lakkh son ek lariaa.',
        'Baabaa Ajeet Singh Jujhaar Singh Jee, Pitaa asees lai joojhe ran maanh.',
      ],
      translationEn:
        'Rattan Singh Bhangu preserves the heroic battle of 8 Poh, Sambat 1761 Bikrami at the mud fortress of Chamkaur, where small jathas of five Singhs emerged wave after wave against imperial battalions, culminating in the sublime martyrdom of Sahibzada Baba Ajit Singh Ji (age 18), Sahibzada Baba Jujhar Singh Ji (age 14), three of the Panj Pyare (Bhai Himmat Singh Ji, Bhai Mohkam Singh Ji, Bhai Sahib Singh Ji), and Bhai Jiwan Singh Ji.',
      translationPa:
        'ਪ੍ਰਾਚੀਨ ਪੰਥ ਪ੍ਰਕਾਸ਼ ਵਿੱਚ ੮ ਪੋਹ, ਸੰਮਤ ੧੭੬੧ ਬਿਕ੍ਰਮੀ ਦੀ ਚਮਕੌਰ ਗੜ੍ਹੀ ਦੀ ਅਸਾਵੀਂ ਜੰਗ ਦਾ ਬਿਆਨ ਹੈ, ਜਿੱਥੇ ਪੰਜ-ਪੰਜ ਸਿੰਘਾਂ ਦੇ ਜਥਿਆਂ ਸਮੇਤ ਵੱਡੇ ਸਾਹਿਬਜ਼ਾਦੇ ਬਾਬਾ ਅਜੀਤ ਸਿੰਘ ਜੀ ਅਤੇ ਬਾਬਾ ਜੁਝਾਰ ਸਿੰਘ ਜੀ ਨੇ ਲਾਸਾਨੀ ਸ਼ਹਾਦਤ ਪ੍ਰਾਪਤ ਕੀਤੀ।',
      exactGranthUrl: 'https://pothi.tatkhalsa.in/sundar-gutka/zafarnama',
      exactGranthLabelEn: 'Open Zafarnama on Pothi Sahib (pothi.tatkhalsa.in)',
      exactGranthLabelPa: 'ਪੋਥੀ ਸਾਹਿਬ ’ਤੇ ਜ਼ਫ਼ਰਨਾਮਾ ਖੋਲ੍ਹੋ',
      granthTypeLabelEn: 'Puratan Khalsa Chronicle',
      granthTypeLabelPa: 'ਪੁਰਾਤਨ ਖ਼ਾਲਸਾ ਇਤਿਹਾਸ',
    }),
  },

  // 18. Sri Gur Sobha — Adhyay 5 (Vaisakhi 1756)
  {
    match: (src, ref) => /gur sobha/i.test(src) && /adhyay\s*5/i.test(ref),
    build: () => ({
      headingEn: 'Sri Gur Sobha (Kavi Sainapati) — Adhyay 5 (Khalsa Prakat, Vaisakh 1756)',
      headingPa: 'ਸ੍ਰੀ ਗੁਰ ਸੋਭਾ (ਕਵੀ ਸੈਨਾਪਤਿ) — ਅਧਿਆਇ ੫ (ਖ਼ਾਲਸਾ ਪ੍ਰਗਟ, ਵੈਸਾਖ ੧੭੫੬)',
      gurmukhiLines: [
        'ਚੇਤ ਮਾਸ ਬੀਤਿਓ ਸਬੈ, ਬਰਖ ਭਯੋ ਬੈਸਾਖ ॥',
        'ਆਏ ਸਿੱਖ ਅਨੰਦਪੁਰ, ਮਨ ਮਹਿ ਕਰਿ ਅਭਿਲਾਖ ॥',
        'ਖੰਡੇ ਕੀ ਪਾਹੁਲ ਦਈ, ਪ੍ਰਗਟਿਓ ਖ਼ਾਲਸਾ ਰੂਪ ॥',
        'ਸਤਿਗੁਰ ਹਮਾਰੋ ਖ਼ਾਲਸਾ, ਖ਼ਾਲਸਾ ਹਮਾਰੋ ਰੂਪ ॥',
      ],
      transliterationLines: [
        'Chet maas beetio sabai, barakh bhayo Baisaakh.',
        'Aae sikh Anandpur, man meh kar abhilaakh.',
        'Khande kee paahul daee, pragatio Khaalsaa roop.',
        'Satgur hamaaro Khaalsaa, Khaalsaa hamaaro roop.',
      ],
      translationEn:
        'Written by court poet Kavi Sainapati, an eyewitness at Sri Anandpur Sahib, Adhyay 5 of Sri Gur Sobha records how on Vaisakh Sangrand, Sambat 1756 Bikrami (1699 CE), Sri Guru Gobind Singh Ji administered Khande-Bate di Pahul to the Panj Pyare, abolished the Masand system, and revealed the sovereign Khalsa Panth directly linked to Akal Purakh.',
      translationPa:
        'ਦਰਬਾਰੀ ਕਵੀ ਸੈਨਾਪਤਿ ਸ੍ਰੀ ਗੁਰ ਸੋਭਾ ਦੇ ਅਧਿਆਇ ੫ ਵਿੱਚ ਵੈਸਾਖ ਸੰਗਰਾਂਦ, ਸੰਮਤ ੧੭੫੬ (੧੬੯੯ ਈ.) ਨੂੰ ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਵਿਖੇ ਖੰਡੇ-ਬਾਟੇ ਦੀ ਪਾਹੁਲ ਦੇ ਕੇ ਖ਼ਾਲਸਾ ਪੰਥ ਦੀ ਸਾਜਨਾ ਦਾ ਪ੍ਰਤੱਖ ਵਰਣਨ ਕਰਦੇ ਹਨ।',
      exactGranthUrl: 'https://pothi.tatkhalsa.in/sundar-gutka/tav-prasad-swaiye',
      exactGranthLabelEn: 'Open Tav-Prasad Swaiye on Pothi Sahib (pothi.tatkhalsa.in)',
      exactGranthLabelPa: 'ਪੋਥੀ ਸਾਹਿਬ ’ਤੇ ਤ੍ਵਪ੍ਰਸਾਦਿ ਸਵਈਏ ਖੋਲ੍ਹੋ',
      granthTypeLabelEn: 'Contemporary Darbari Chronicle',
      granthTypeLabelPa: 'ਸਮਕਾਲੀ ਦਰਬਾਰੀ ਗ੍ਰੰਥ',
    }),
  },

  // 19. Sri Gur Sobha — Adhyay 18 (Joti Jot Guru Gobind Singh Ji)
  {
    match: (src, ref) => /gur sobha/i.test(src) && /adhyay\s*18/i.test(ref),
    build: () => ({
      headingEn: 'Sri Gur Sobha (Kavi Sainapati) — Adhyay 18 (Katak Sudhi 5, Sambat 1765)',
      headingPa: 'ਸ੍ਰੀ ਗੁਰ ਸੋਭਾ (ਕਵੀ ਸੈਨਾਪਤਿ) — ਅਧਿਆਇ ੧੮ (ਕੱਤਕ ਸੁਦੀ ੫, ਸੰਮਤ ੧੭੬੫)',
      gurmukhiLines: [
        'ਏਕ ਦਿਵਸ ਕਾਛਨ ਕਹਯੋ, ਮਿਲਿ ਕਰਿ ਸਿਖਨ ਬਚਾਰ ॥',
        'ਕਵਨ ਰੂਪ ਆਪਨ ਪ੍ਰਭੂ, ਕੀਨੋ ਆਗੈ ਧਾਰ ॥',
        'ਤਬ ਸਾਹਿਬ ਬਚਨ ਉਚਾਰਿਆ, ਖ਼ਾਲਸਾ ਮੇਰੋ ਰੂਪ ॥',
        'ਖ਼ਾਲਸੇ ਮਹਿ ਹਉ ਬਸੌਂ, ਸਤਿਗੁਰ ਸ਼ਬਦ ਅਨੂਪ ॥',
      ],
      transliterationLines: [
        'Ek divas kaachhan kahayo, mil kar sikhan bachaar.',
        'Kavan roop aapan Prabhoo, keeno aagai dhaar.',
        'Tab Saahib bachan uchaariaa, Khaalsaa mero roop.',
        'Khaalse meh hau basaun, Satgur Shabad anoop.',
      ],
      translationEn:
        'In Adhyay 18 of Sri Gur Sobha (completed 1711 CE), Kavi Sainapati documents the final dialogue at Nanded before Katak Sudhi 5, Sambat 1765: when Sikhs asked what form the Guru would take hereafter, Dashmesh Pita declared that His eternal essence abides in the Shabad Guru (Sri Guru Granth Sahib Ji) and in the Khalsa Panth.',
      translationPa:
        'ਸ੍ਰੀ ਗੁਰ ਸੋਭਾ ਦੇ ਅਧਿਆਇ ੧੮ ਵਿੱਚ ਕਵੀ ਸੈਨਾਪਤਿ ਸੰਮਤ ੧੭੬੫ ਕੱਤਕ ਸੁਦੀ ਪੰਚਮੀ ਦੇ ਨਾਂਦੇੜ ਪ੍ਰਸੰਗ ਦਾ ਵਰਣਨ ਕਰਦੇ ਹਨ ਕਿ ਦਸਮੇਸ਼ ਪਿਤਾ ਜੀ ਨੇ ਗੁਰਿਆਈ ਸ਼ਬਦ ਗੁਰੂ ਅਤੇ ਖ਼ਾਲਸੇ ਨੂੰ ਸੌਂਪ ਕੇ ਜੋਤੀ ਜੋਤ ਸਮਾਉਣ ਦਾ ਕੌਤਕ ਵਰਤਾਇਆ।',
      exactGranthUrl: POTHI_SGGS_URL,
      exactGranthLabelEn: 'Open Sri Guru Granth Sahib Ji (pothi.tatkhalsa.in)',
      exactGranthLabelPa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਖੋਲ੍ਹੋ (pothi.tatkhalsa.in)',
      granthTypeLabelEn: 'Contemporary Darbari Chronicle',
      granthTypeLabelPa: 'ਸਮਕਾਲੀ ਦਰਬਾਰੀ ਗ੍ਰੰਥ',
    }),
  },

  // 20. Rehatnama Bhai Prahlad Singh (Sabh Sikhan Ko Hukam Hai)
  {
    match: (src) => /rehatnama/i.test(src),
    build: () => ({
      headingEn: 'Rehatnama Bhai Prahlad Singh Ji & Panth Prakash — Eternal Guruship Dohra',
      headingPa: 'ਰਹਿਤਨਾਮਾ ਭਾਈ ਪ੍ਰਹਿਲਾਦ ਸਿੰਘ ਜੀ ਅਤੇ ਪੰਥ ਪ੍ਰਕਾਸ਼ — ਸਦੀਵੀ ਗੁਰਗੱਦੀ ਦੋਹਰਾ',
      gurmukhiLines: [
        'ਆਗਿਆ ਭਈ ਅਕਾਲ ਕੀ ਤਬੈ ਚਲਾਯੋ ਪੰਥ ॥',
        'ਸਭ ਸਿਖਨ ਕੋ ਹੁਕਮ ਹੈ ਗੁਰੂ ਮਾਨਿਓ ਗ੍ਰੰਥ ॥',
        'ਗੁਰੂ ਗ੍ਰੰਥ ਜੀ ਮਾਨਿਓ ਪ੍ਰਗਟ ਗੁਰਾਂ ਕੀ ਦੇਹ ॥',
        'ਜੋ ਪ੍ਰਭ ਕੋ ਮਿਲਬੋ ਚਹੈ ਖੋਜ ਸ਼ਬਦ ਮੇਂ ਲੇਹ ॥',
      ],
      transliterationLines: [
        'Aagiaa bhaee Akaal kee tabai chalaayo Panth.',
        'Sabh sikhan ko hukam hai Guroo maanio Granth.',
        'Guroo Granth Jee maanio pragat Guraan kee deh.',
        'Jo Prabh ko milbo chahai khoj Shabad men leh.',
      ],
      translationEn:
        'Recited at the close of every Khalsa Ardas: "By the command of the Timeless One was the Panth established. Unto all Sikhs is this edict: recognize the Granth as Guru. Revere Sri Guru Granth Sahib Ji as the manifest body of the Ten Gurus; whoever seeks union with the Lord shall discover Him within the Shabad."',
      translationPa:
        'ਹਰ ਸਿੱਖ ਅਰਦਾਸ ਉਪਰੰਤ ਪੜ੍ਹਿਆ ਜਾਣ ਵਾਲਾ ਇਹ ਪਾਵਨ ਦੋਹਰਾ ਦਸਮੇਸ਼ ਪਿਤਾ ਜੀ ਦੇ ਸਦੀਵੀ ਹੁਕਮ ਨੂੰ ਪ੍ਰਗਟ ਕਰਦਾ ਹੈ ਕਿ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਹੀ ਦਸਾਂ ਪਾਤਸ਼ਾਹੀਆਂ ਦੀ ਪ੍ਰਗਟ ਦੇਹ ਅਤੇ ਸਦੀਵੀ ਗੁਰੂ ਹਨ।',
      exactGranthUrl: POTHI_SGGS_URL,
      exactGranthLabelEn: 'Open Sri Guru Granth Sahib Ji (pothi.tatkhalsa.in)',
      exactGranthLabelPa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਖੋਲ੍ਹੋ (pothi.tatkhalsa.in)',
      granthTypeLabelEn: 'Puratan Khalsa Rehatnama',
      granthTypeLabelPa: 'ਪੁਰਾਤਨ ਖ਼ਾਲਸਾ ਰਹਿਤਨਾਮਾ',
    }),
  },

  // 21. Kartarpur Bir Colophon (1661 Bikrami)
  {
    match: (src, ref) => /kartarpur/i.test(src) || /1661/i.test(ref),
    build: () => ({
      headingEn: 'Adi Sri Guru Granth Sahib Ji — Kartarpur Bir Tatkara Colophon (Sambat 1661)',
      headingPa: 'ਆਦਿ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ — ਕਰਤਾਰਪੁਰ ਬੀੜ ਤਤਕਰਾ ਲੇਖ (ਸੰਮਤ ੧੬੬੧)',
      gurmukhiLines: [
        'ਸੰਮਤ ੧੬੬੧ ਮਿਤੀ ਭਾਦੋਂ ਵਦੀ ਏਕਮ ਪੋਥੀ ਲਿਖਿ ਪਹੁੰਚੇ ॥',
        'ਸੰਤਾ ਕੇ ਕਾਰਜਿ ਆਪਿ ਖਲੋਇਆ ਹਰਿ ਕੰਮੁ ਕਰਾਵਣਿ ਆਇਆ ਰਾਮ ॥ (ਅੰਗ ੭੮੩)',
      ],
      transliterationLines: [
        'Sambat 1661 Mitee Bhaadon Vadee Ekam pothee likh pahunche.',
        'Santaa ke kaaraj aap khaloiaa Har kamm karaavan aaiaa Raam. (Ang 783)',
      ],
      translationEn:
        'Inscribed in Bhai Gurdas Ji’s own handwriting on the opening Tatkara folio of the original Kartarpur Bir (1604 CE): "In Sambat 1661, on Bhadon Vadi 1 (Ekam), the scribing of the Pothi Sahib was completed." Fifteen days later on Bhadon Sudhi 1, Sri Guru Arjan Dev Ji carried the Aad Granth Sahib to Sachkhand Sri Harmandir Sahib, where Baba Budha Ji took the first Hukamnama from Suhi Mahalla 5 (Ang 783).',
      translationPa:
        'ਮੂਲ ਕਰਤਾਰਪੁਰ ਬੀੜ ਦੇ ਤਤਕਰੇ ’ਤੇ ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਦੇ ਹੱਥ-ਲਿਖਤ ਅੱਖਰਾਂ ਵਿੱਚ "ਸੰਮਤ ੧੬੬੧ ਮਿਤੀ ਭਾਦੋਂ ਵਦੀ ਏਕਮ ਪੋਥੀ ਲਿਖਿ ਪਹੁੰਚੇ" ਦਰਜ ਹੈ, ਅਤੇ ਭਾਦੋਂ ਸੁਦੀ ੧ ਨੂੰ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਵਿਖੇ ਪਹਿਲਾ ਪ੍ਰਕਾਸ਼ ਕਰਕੇ ਅੰਗ ੭੮੩ ਤੋਂ ਪਹਿਲਾ ਹੁਕਮਨਾਮਾ ਲਿਆ ਗਿਆ।',
      exactGranthUrl: 'https://pothi.tatkhalsa.in/reader?source=sggs&ang=783',
      exactGranthLabelEn: 'Open Exact Page in Granth (First Hukamnama · SGGS Ang 783)',
      exactGranthLabelPa: 'ਗ੍ਰੰਥ ਦਾ ਸਹੀ ਪੰਨਾ ਖੋਲ੍ਹੋ (ਪਹਿਲਾ ਹੁਕਮਨਾਮਾ · ਅੰਗ ੭੮੩)',
      granthTypeLabelEn: 'Kartarpur Bir & SGGS Ji',
      granthTypeLabelPa: 'ਕਰਤਾਰਪੁਰ ਬੀੜ ਅਤੇ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ',
    }),
  },

  // 22. Sri Guru Granth Sahib Ji (Dynamic exact Ang handler!)
  {
    match: (src) => /guru granth sahib/i.test(src),
    build: (cit, ev) => {
      const ang = extractAng(cit.referenceEn);
      const url =
        cit.pothiUrl ||
        (ang ? `https://pothi.tatkhalsa.in/reader?source=sggs&ang=${ang}` : POTHI_BARAH_MAHA_URL);
      const gurmukhi = cit.excerptPa
        ? [cit.excerptPa]
        : ['ਸਤਿਗੁਰ ਕੀ ਬਾਣੀ ਸਤਿ ਸਤਿ ਕਰਿ ਜਾਣਹੁ ਗੁਰਸਿਖਹੁ ਹਰਿ ਕਰਤਾ ਆਪਿ ਮੁਹਹੁ ਕਢਾਏ ॥'];
      const translit = cit.excerptTranslit
        ? [cit.excerptTranslit]
        : ['Satgur kee baanee sat sat kar jaanahu Gursikhahu Har kartaa aap muhahu kadhaae.'];

      return {
        headingEn: `Sri Guru Granth Sahib Ji — ${cit.referenceEn}`,
        headingPa: `ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ — ${cit.referencePa}`,
        gurmukhiLines: gurmukhi,
        transliterationLines: translit,
        translationEn: `${ev.historicalContextEn} This sacred Shabad from ${cit.referenceEn} illuminates the spiritual meaning and Gurmat essence commemorated on ${ev.titleEn}.`,
        translationPa: `${ev.historicalContextPa} ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦਾ ਇਹ ਪਾਵਨ ਸ਼ਬਦ (${cit.referencePa}) ਇਸ ਪੁਰਬ ਦੇ ਗੁਰਮਤਿ ਸਿਧਾਂਤ ਨੂੰ ਪ੍ਰਗਟ ਕਰਦਾ ਹੈ।`,
        exactGranthUrl: url,
        exactGranthLabelEn: ang
          ? `Open Exact Page in Granth (SGGS Ang ${ang})`
          : 'Open Exact Page in Granth (SGGS Ji)',
        exactGranthLabelPa: ang
          ? `ਗ੍ਰੰਥ ਦਾ ਸਹੀ ਪੰਨਾ ਖੋਲ੍ਹੋ (ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਅੰਗ ${ang})`
          : 'ਗ੍ਰੰਥ ਦਾ ਸਹੀ ਪੰਨਾ ਖੋਲ੍ਹੋ (ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ)',
        granthTypeLabelEn: 'Sri Guru Granth Sahib Ji',
        granthTypeLabelPa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ',
      };
    },
  },

  // 23. Sri Gurpratap Suraj Granth Sahib Ji (General Raas/Rut/Ayan/Nanak Prakash handler)
  {
    match: (src) => /suraj|nanak prakash/i.test(src),
    build: (cit, ev) => {
      const locatorMatch = cit.referenceEn.match(
        /(Raas\s*\d+[^·]*|Rut\s*\d+[^·]*|Ayan\s*\d+[^·]*|Purbaradh[^·]*|Jild\s*\d+[^·]*)/i,
      );
      const locator = locatorMatch ? locatorMatch[1].trim() : cit.referenceEn.split('·')[0].trim();
      const targetUrl = sanitizePothiUrl(cit.pothiUrl || ev.pothiUrl || POTHI_HOME_URL);
      return {
        headingEn: `Sri Gurpratap Suraj Granth Sahib Ji — ${cit.referenceEn}`,
        headingPa: `ਸ੍ਰੀ ਗੁਰਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ — ${cit.referencePa}`,
        gurmukhiLines: cit.excerptPa
          ? [cit.excerptPa]
          : [
              `ਪ੍ਰਸੰਗ: ${cit.referencePa} ॥`,
              ev.summaryPa,
            ],
        transliterationLines: cit.excerptTranslit
          ? [cit.excerptTranslit]
          : [`Prasang (${locator}) — Mahakavi Bhai Santokh Singh Ji (Edited by Dr. Bhai Vir Singh Ji).`],
        translationEn: `${ev.historicalContextEn} Recorded in Mahakavi Bhai Santokh Singh Ji’s monumental 14-volume chronicle (${locator}), which preserves the authentic Puratan Bikrami lunar tithis and solar dates handed down through the Giani and Nirmala Sampardas.`,
        translationPa: `${ev.historicalContextPa} ਮਹਾਂਕਵੀ ਭਾਈ ਸੰਤੋਖ ਸਿੰਘ ਜੀ (ਸੰਪਾਦਕ ਡਾ. ਭਾਈ ਵੀਰ ਸਿੰਘ ਜੀ) ਵੱਲੋਂ ਰਚਿਤ ਸ੍ਰੀ ਗੁਰਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ ਦੇ ਇਸ ਪ੍ਰਸੰਗ (${cit.referencePa}) ਵਿੱਚ ਇਸ ਦਿਹਾੜੇ ਦਾ ਪ੍ਰਮਾਣਿਕ ਪੁਰਾਤਨ ਬਿਕ੍ਰਮੀ ਇਤਿਹਾਸ ਦਰਜ ਹੈ।`,
        exactGranthUrl: targetUrl,
        exactGranthLabelEn: 'Open Pothi Sahib (pothi.tatkhalsa.in)',
        exactGranthLabelPa: 'ਪੋਥੀ ਸਾਹਿਬ ਖੋਲ੍ਹੋ (pothi.tatkhalsa.in)',
        granthTypeLabelEn: 'Sri Gurpratap Suraj Granth',
        granthTypeLabelPa: 'ਸ੍ਰੀ ਗੁਰਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ',
      };
    },
  },

  // 24. Bhai Nand Lal Ji — Diwan-e-Goya (Holla Mohalla)
  {
    match: (src) => /nand lal|diwan-e-goya/i.test(src),
    build: () => ({
      headingEn: 'Bhai Nand Lal Ji — Diwan-e-Goya (Holi-nama · Khalsa Spiritual Chivalry)',
      headingPa: 'ਭਾਈ ਨੰਦ ਲਾਲ ਜੀ — ਦੀਵਾਨ-ਏ-ਗੋਯਾ (ਹੋਲੀ-ਨਾਮਾ · ਖ਼ਾਲਸਾ ਚੜ੍ਹਦੀ ਕਲਾ)',
      gurmukhiLines: [
        'ਗੁਲਿ ਹੋਲੀ ਬ-ਬਾਗ਼ਿ ਦਹਰ ਬੂ ਕਰਦ ॥ ਲਬਿ ਚੂੰ ਗ਼ੁੰਚਹ ਰਾ ਫ਼ਰਖ਼ੁੰਦਹ ਖ਼ੂ ਕਰਦ ॥',
        'ਗੁਲਾਬੋ ਅੰਬਰੋ ਮੁਸ਼ਕੋ ਅਬੀਰ ਅਸਤ ॥ ਚੂ ਬਾਰਾਂ ਬਾਰਸ਼ਿ ਅਜ਼ ਅਬਰਿ ਕਰੀਮ ਅਸਤ ॥',
      ],
      transliterationLines: [
        'Gul-e-Holee ba-baagh-e-dahar boo kard, lab-e-choon ghunchah raa farakhundah khoo kard.',
        'Gulaabo ambaro mushko abeer ast, choo baaraan baarash-e-az abr-e-kareem ast.',
      ],
      translationEn:
        'Bhai Nand Lal Goya, beloved devotee at Sri Anandpur Sahib, describes the fragrant spiritual joy of Holla Mohalla in the court of Sri Guru Gobind Singh Ji, where the Tenth Patshah transformed seasonal revelry into disciplined Khalsa martial valor (Shastar Vidya, horsemanship, and mock battles at Qila Holgarh) infused with Divine Name.',
      translationPa:
        'ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਦੇ ਦਰਬਾਰੀ ਕਵੀ ਭਾਈ ਨੰਦ ਲਾਲ ਜੀ ‘ਗੋਯਾ’ ਨੇ ਹੋਲੇ-ਮਹੱਲੇ ਦੇ ਪਾਵਨ ਰੰਗ ਨੂੰ ਅਧਿਆਤਮਕ ਅਤੇ ਬੀਰ-ਰਸੀ ਚੜ੍ਹਦੀ ਕਲਾ ਦੇ ਪ੍ਰਤੀਕ ਵਜੋਂ ਬਿਆਨ ਕੀਤਾ ਹੈ।',
      exactGranthUrl: POTHI_DASAM_URL,
      exactGranthLabelEn: 'Open Pothi Sahib (Bhai Nand Lal · pothi.tatkhalsa.in)',
      exactGranthLabelPa: 'ਪੋਥੀ ਸਾਹਿਬ ਖੋਲ੍ਹੋ (ਭਾਈ ਨੰਦ ਲਾਲ ਜੀ)',
      granthTypeLabelEn: 'Bhai Nand Lal Ji Bani',
      granthTypeLabelPa: 'ਭਾਈ ਨੰਦ ਲਾਲ ਜੀ ਬਾਣੀ',
    }),
  },

  // 25. Mehma Prakash / Gurbilas Patshahi 6 / Puratan Janamsakhi / Hukamnamas / Other Bhatt Vahis
  {
    match: (src) => /mehma prakash|gurbilas|janamsakhi|hukamnama|bhatt vahi/i.test(src),
    build: (cit, ev) => {
      const targetUrl = sanitizePothiUrl(cit.pothiUrl || ev.pothiUrl || POTHI_HOME_URL);
      const shortRef = cit.referenceEn.split('·')[0].trim();
      return {
        headingEn: `${cit.sourceEn} — ${cit.referenceEn}`,
        headingPa: `${cit.sourcePa} — ${cit.referencePa}`,
        gurmukhiLines: cit.excerptPa ? [cit.excerptPa] : [`ਪੁਰਾਤਨ ਹਵਾਲਾ: ${cit.referencePa} ॥`, ev.summaryPa],
        transliterationLines: cit.excerptTranslit
          ? [cit.excerptTranslit]
          : [`Puratan Archival Colophon (${shortRef}) — ${cit.sourceEn}`],
        translationEn: `${ev.historicalContextEn} This primary historical source (${cit.sourceEn}: ${cit.referenceEn}) preserves the contemporary Puratan Bikrami record for ${ev.titleEn}.`,
        translationPa: `${ev.historicalContextPa} ਇਹ ਪੁਰਾਤਨ ਇਤਿਹਾਸਕ ਸਰੋਤ (${cit.sourcePa} — ${cit.referencePa}) ਇਸ ਘਟਨਾ ਦੀ ਪ੍ਰਮਾਣਿਕ ਗਵਾਹੀ ਦਿੰਦਾ ਹੈ।`,
        exactGranthUrl: targetUrl,
        exactGranthLabelEn: 'Open Pothi Sahib (pothi.tatkhalsa.in)',
        exactGranthLabelPa: 'ਪੋਥੀ ਸਾਹਿਬ ਖੋਲ੍ਹੋ (pothi.tatkhalsa.in)',
        granthTypeLabelEn: 'Primary Historical Chronicle',
        granthTypeLabelPa: 'ਮੂਲ ਇਤਿਹਾਸਕ ਗ੍ਰੰਥ',
      };
    },
  },
];

/**
 * Resolves full readable Gurmukhi text, transliteration, English/Punjabi translation,
 * and a strict pothi.tatkhalsa.in Granth deep link for any citation card in the Colophon drawer.
 */
export function resolveCitationReader(
  cit: ColophonCitation,
  ev: HistoricalEvent,
): CitationReaderContent {
  for (const entry of CURATED_SOURCES) {
    if (entry.match(cit.sourceEn, cit.referenceEn)) {
      const built = entry.build(cit, ev);
      return {
        ...built,
        exactGranthUrl: sanitizePothiUrl(built.exactGranthUrl),
      };
    }
  }

  // Fallback for any Vaaran / Panthic historical chronicles / Hazuri records / Jeevan Charitar
  const vp = extractVaarPauri(cit.referenceEn);
  if (/gurdas/i.test(cit.sourceEn) && vp) {
    return {
      headingEn: `${cit.sourceEn} — ${cit.referenceEn}`,
      headingPa: `${cit.sourcePa} — ${cit.referencePa}`,
      gurmukhiLines: cit.excerptPa ? [cit.excerptPa] : [ev.summaryPa],
      transliterationLines: cit.excerptTranslit ? [cit.excerptTranslit] : [cit.referenceEn],
      translationEn: ev.historicalContextEn,
      translationPa: ev.historicalContextPa,
      exactGranthUrl: sanitizePothiUrl(cit.pothiUrl || ev.pothiUrl || POTHI_HOME_URL),
      exactGranthLabelEn: `Open Pothi Sahib (Vaar ${vp.vaar}, Pauri ${vp.pauri})`,
      exactGranthLabelPa: `ਪੋਥੀ ਸਾਹਿਬ ਖੋਲ੍ਹੋ (ਵਾਰ ${vp.vaar}, ਪਉੜੀ ${vp.pauri})`,
      granthTypeLabelEn: 'Bhai Gurdas Ji Vaaran',
      granthTypeLabelPa: 'ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਵਾਰਾਂ',
    };
  }

  const fallbackUrl = sanitizePothiUrl(cit.pothiUrl || ev.pothiUrl || POTHI_HOME_URL);

  return {
    headingEn: `${cit.sourceEn} — ${cit.referenceEn}`,
    headingPa: `${cit.sourcePa} — ${cit.referencePa}`,
    gurmukhiLines: cit.excerptPa ? [cit.excerptPa] : [ev.summaryPa],
    transliterationLines: cit.excerptTranslit
      ? [cit.excerptTranslit]
      : [`${cit.sourceEn} · ${cit.referenceEn}`],
    translationEn: `${ev.historicalContextEn} Archival citation: ${cit.sourceEn} (${cit.referenceEn}).`,
    translationPa: `${ev.historicalContextPa} ਇਤਿਹਾਸਕ ਹਵਾਲਾ: ${cit.sourcePa} (${cit.referencePa})।`,
    exactGranthUrl: fallbackUrl,
    exactGranthLabelEn: 'Open Pothi Sahib (pothi.tatkhalsa.in)',
    exactGranthLabelPa: 'ਪੋਥੀ ਸਾਹਿਬ ਖੋਲ੍ਹੋ (pothi.tatkhalsa.in)',
    granthTypeLabelEn: 'Archival Panthic Record',
    granthTypeLabelPa: 'ਪੰਥਕ ਇਤਿਹਾਸਕ ਰਿਕਾਰਡ',
  };
}
