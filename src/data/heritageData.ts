import type {BikramiMonthMeta} from './types';

export type ShastarSvgKind =
  | 'khanda'
  | 'tegha'
  | 'talwar'
  | 'khapra-teer'
  | 'kardh'
  | 'dhaal'
  | 'ashtbhuja';

export interface MonthlyHeritageItem {
  monthKey: BikramiMonthMeta['key'];
  shastarKind: ShastarSvgKind;
  shastarNameEn: string;
  shastarNamePa: string;
  asthaanEn: string;
  asthaanPa: string;
  captionEn: string;
  captionPa: string;
  sampardaiNoteEn: string;
  sampardaiNotePa: string;
}

/**
 * Puratan Monthly Shastar & Asthaan Darshan Heritage Dataset.
 * Celebrates traditional Khalsa Shastars alongside sacred Asthaans of Takhat Sachkhand Sri Hazur Sahib
 * and Sampardai Puratan Sikh heritage across all 12 Desi solar months.
 */
export const MONTHLY_HERITAGE: Record<BikramiMonthMeta['key'], MonthlyHeritageItem> = {
  chet: {
    monthKey: 'chet',
    shastarKind: 'khanda',
    shastarNameEn: 'Sri Khanda Sahib',
    shastarNamePa: 'ਸ੍ਰੀ ਖੰਡਾ ਸਾਹਿਬ',
    asthaanEn: 'Takhat Sachkhand Sri Hazur Sahib · Angitha Sahib',
    asthaanPa: 'ਤਖ਼ਤ ਸੱਚਖੰਡ ਸ੍ਰੀ ਹਜ਼ੂਰ ਸਾਹਿਬ · ਅੰਗੀਠਾ ਸਾਹਿਬ',
    captionEn:
      'Double-edged Khalsa emblem of spiritual sovereignty and Khande-ki-Pahul, revered in the inner sanctum of Sachkhand Sri Hazur Abchal Nagar Sahib.',
    captionPa:
      'ਦੋ-ਧਾਰੀ ਸ੍ਰੀ ਖੰਡਾ ਸਾਹਿਬ — ਖੰਡੇ ਬਾਟੇ ਦੀ ਪਾਹੁਲ ਅਤੇ ਖ਼ਾਲਸਾਈ ਪਾਤਸ਼ਾਹੀ ਦਾ ਪ੍ਰਤੀਕ, ਸੱਚਖੰਡ ਸ੍ਰੀ ਹਜ਼ੂਰ ਅਬਚਲ ਨਗਰ ਸਾਹਿਬ ਵਿਖੇ ਸੁਸ਼ੋਭਿਤ।',
    sampardaiNoteEn: 'Chet opens the Puratan Bikrami year and Holla Mohalla martial maryada.',
    sampardaiNotePa: 'ਚੇਤ ਮਹੀਨਾ ਪੁਰਾਤਨ ਬਿਕ੍ਰਮੀ ਸੰਮਤ ਅਤੇ ਹੋਲਾ ਮਹੱਲਾ ਸ਼ਸਤਰ ਮਰਯਾਦਾ ਦਾ ਆਰੰਭ ਹੈ।',
  },
  vaisakh: {
    monthKey: 'vaisakh',
    shastarKind: 'tegha',
    shastarNameEn: 'Sri Tegha Sahib (Khalsa Broadsword)',
    shastarNamePa: 'ਸ੍ਰੀ ਤੇਗ਼ਾ ਸਾਹਿਬ (ਖ਼ਾਲਸਾਈ ਤੇਗ਼)',
    asthaanEn: 'Singhasan Sahib · Takhat Sri Hazur Sahib & Sri Kesgarh Sahib',
    asthaanPa: 'ਸਿੰਘਾਸਣ ਸਾਹਿਬ · ਤਖ਼ਤ ਸ੍ਰੀ ਹਜ਼ੂਰ ਸਾਹਿਬ ਅਤੇ ਸ੍ਰੀ ਕੇਸਗੜ੍ਹ ਸਾਹਿਬ',
    captionEn:
      'Heavy curved Tegha wielded in defense of dharam and the downtrodden—central to Vaisakhi Khalsa Sajna and evening Shastar Darshan at Singhasan Sahib.',
    captionPa:
      'ਧਰਮ ਅਤੇ ਗ਼ਰੀਬ ਦੀ ਰਾਖੀ ਦਾ ਸ਼ਸਤਰ ਸ੍ਰੀ ਤੇਗ਼ਾ ਸਾਹਿਬ — ਵੈਸਾਖੀ ਖ਼ਾਲਸਾ ਸਾਜਨਾ ਅਤੇ ਸਿੰਘਾਸਣ ਸਾਹਿਬ ਵਿਖੇ ਸ਼ਸਤਰ ਦਰਸ਼ਨ ਦਾ ਮੁੱਖ ਅੰਗ।',
    sampardaiNoteEn: 'Puratan Nihang Singhs & Hazuri Singhs perform daily Shastar Namaskar after Rehras Sahib.',
    sampardaiNotePa: 'ਪੁਰਾਤਨ ਨਿਹੰਗ ਸਿੰਘ ਅਤੇ ਹਜ਼ੂਰੀ ਸਿੰਘ ਰਹਿਰਾਸ ਸਾਹਿਬ ਉਪਰੰਤ ਰੋਜ਼ਾਨਾ ਸ਼ਸਤਰ ਦਰਸ਼ਨ ਕਰਦੇ ਹਨ।',
  },
  jeth: {
    monthKey: 'jeth',
    shastarKind: 'dhaal',
    shastarNameEn: 'Sarabloh Dhaal (Khalsa Shield)',
    shastarNamePa: 'ਸਰਬਲੋਹ ਢਾਲ ਸਾਹਿਬ',
    asthaanEn: 'Sarabloh Bunga Sahib · Sri Nanded Sahib',
    asthaanPa: 'ਸਰਬਲੋਹ ਬੁੰਗਾ ਸਾਹਿਬ · ਸ੍ਰੀ ਨੰਦੇੜ ਸਾਹਿਬ',
    captionEn:
      'Four-bossed Sarabloh shield symbolizing unwavering forbearance (Bhaana) and steadfast protection of the Panth, preserved in Puratan Hazuri and Dal Panth Bungas.',
    captionPa:
      'ਚਾਰ ਫੁੱਲਾਂ ਵਾਲੀ ਸਰਬਲੋਹ ਢਾਲ — ਅਡੋਲ ਭਾਣੇ ਅਤੇ ਪੰਥ ਦੀ ਰੱਖਿਆ ਦਾ ਚਿੰਨ੍ਹ, ਸਰਬਲੋਹ ਬੁੰਗਾ ਸਾਹਿਬ ਵਿਖੇ ਪੁਰਾਤਨ ਮਰਯਾਦਾ ਅਨੁਸਾਰ ਸੰਭਾਲੀ ਗਈ।',
    sampardaiNoteEn: 'Commemorating Sri Guru Arjan Dev Ji’s supreme steadfastness in Jeth.',
    sampardaiNotePa: 'ਜੇਠ ਮਹੀਨੇ ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਦੀ ਅਡੋਲ ਸ਼ਹਾਦਤ ਦੀ ਯਾਦ।',
  },
  harh: {
    monthKey: 'harh',
    shastarKind: 'talwar',
    shastarNameEn: 'Miri-Piri Sri Talwar Sahib',
    shastarNamePa: 'ਮੀਰੀ-ਪੀਰੀ ਸ੍ਰੀ ਤਲਵਾਰ ਸਾਹਿਬ',
    asthaanEn: 'Gurdwara Sangat Sahib · Nanded Sahib',
    asthaanPa: 'ਗੁਰਦੁਆਰਾ ਸੰਗਤ ਸਾਹਿਬ · ਸ੍ਰੀ ਨੰਦੇੜ ਸਾਹਿਬ',
    captionEn:
      'Gracefully curved Shamshir Talwar honoring the Sixth Patshah’s Miri-Piri sovereignty and the royal court of Sri Guru Gobind Singh Ji at Sangat Sahib.',
    captionPa:
      'ਛੇਵੇਂ ਪਾਤਸ਼ਾਹ ਜੀ ਦੀ ਮੀਰੀ-ਪੀਰੀ ਪਾਤਸ਼ਾਹੀ ਅਤੇ ਗੁਰਦੁਆਰਾ ਸੰਗਤ ਸਾਹਿਬ ਵਿਖੇ ਦਸਮੇਸ਼ ਪਿਤਾ ਦੇ ਦਰਬਾਰ ਦੀ ਯਾਦ ਦਿਵਾਉਂਦੀ ਸ੍ਰੀ ਤਲਵਾਰ ਸਾਹਿਬ।',
    sampardaiNoteEn: 'Harh marks the Parkash of Sri Guru Hargobind Sahib Ji and Miri-Piri Divas.',
    sampardaiNotePa: 'ਹਾੜ੍ਹ ਮਹੀਨੇ ਛੇਵੇਂ ਪਾਤਸ਼ਾਹ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਅਤੇ ਮੀਰੀ-ਪੀਰੀ ਦਿਵਸ ਮਨਾਇਆ ਜਾਂਦਾ ਹੈ।',
  },
  sawan: {
    monthKey: 'sawan',
    shastarKind: 'khapra-teer',
    shastarNameEn: 'Khapra Teer (Crescent-Tipped Arrow)',
    shastarNamePa: 'ਖਪਰਾ ਤੀਰ ਸਾਹਿਬ',
    asthaanEn: 'Gurdwara Shikar Ghaat Sahib · Banks of Godavari',
    asthaanPa: 'ਗੁਰਦੁਆਰਾ ਸ਼ਿਕਾਰ ਘਾਟ ਸਾਹਿਬ · ਗੋਦਾਵਰੀ ਕੰਢੇ',
    captionEn:
      'Gold-tipped crescent Khapra Teer associated with Dasmesh Pita’s archery along the Godavari at Shikar Ghaat Sahib, revered among the Hazuri Puratan Shastars.',
    captionPa:
      'ਸੋਨੇ ਦੀ ਨੋਕ ਵਾਲਾ ਖਪਰਾ ਤੀਰ — ਗੋਦਾਵਰੀ ਕੰਢੇ ਗੁਰਦੁਆਰਾ ਸ਼ਿਕਾਰ ਘਾਟ ਸਾਹਿਬ ਵਿਖੇ ਦਸਮੇਸ਼ ਪਿਤਾ ਜੀ ਦੇ ਤੀਰ-ਅੰਦਾਜ਼ੀ ਕੌਤਕਾਂ ਦਾ ਪ੍ਰਮਾਣ।',
    sampardaiNoteEn: 'Sawan celebrates Sri Guru Harkrishan Sahib Ji and monsoon Nitnem Maryada.',
    sampardaiNotePa: 'ਸਾਵਣ ਮਹੀਨੇ ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਕ੍ਰਿਸ਼ਨ ਸਾਹਿਬ ਜੀ ਦਾ ਪ੍ਰਕਾਸ਼ ਅਤੇ ਬਰਖਾ ਰੁੱਤ ਦੀ ਬਾਣੀ ਵਿਚਾਰੀ ਜਾਂਦੀ ਹੈ।',
  },
  bhadon: {
    monthKey: 'bhadon',
    shastarKind: 'kardh',
    shastarNameEn: 'Puratan Sri Kardh Sahib',
    shastarNamePa: 'ਪੁਰਾਤਨ ਸ੍ਰੀ ਕਰਦ ਸਾਹਿਬ',
    asthaanEn: 'Gurdwara Hira Ghaat Sahib · Sri Hazur Sahib',
    asthaanPa: 'ਗੁਰਦੁਆਰਾ ਹੀਰਾ ਘਾਟ ਸਾਹਿਬ · ਸ੍ਰੀ ਹਜ਼ੂਰ ਸਾਹਿਬ',
    captionEn:
      'Wrought-iron ceremonial Kardh used in Karah Parshad Bhog and daily Khalsa discipline, recalling Dasmesh Pita’s royal encampment at Hira Ghaat along the Godavari.',
    captionPa:
      'ਕੜਾਹ ਪ੍ਰਸਾਦਿ ਭੋਗ ਅਤੇ ਖ਼ਾਲਸਾਈ ਰਹਿਤ ਦਾ ਅਨਿੱਖੜਵਾਂ ਸ਼ਸਤਰ ਸ੍ਰੀ ਕਰਦ ਸਾਹਿਬ — ਗੋਦਾਵਰੀ ਕੰਢੇ ਗੁਰਦੁਆਰਾ ਹੀਰਾ ਘਾਟ ਸਾਹਿਬ ਦੀ ਪਾਵਨ ਯਾਦ।',
    sampardaiNoteEn: 'Bhadon commemorates Adi Bir completion, Pehla Parkash SGGS Ji, and Dasam Granth Chaupai Colophon.',
    sampardaiNotePa: 'ਭਾਦੋਂ ਵਿੱਚ ਆਦਿ ਬੀੜ ਸੰਪੂਰਨਤਾ, ਪਹਿਲਾ ਪ੍ਰਕਾਸ਼ ਅਤੇ ਬੇਨਤੀ ਚੌਪਈ ਹਵਾਲਾ ਆਉਂਦੇ ਹਨ।',
  },
  assu: {
    monthKey: 'assu',
    shastarKind: 'ashtbhuja',
    shastarNameEn: 'Sri Ashtbhuja Sahib (Khalsa Standard)',
    shastarNamePa: 'ਸ੍ਰੀ ਅਸ਼ਟਭੁਜਾ ਸਾਹਿਬ',
    asthaanEn: 'Shastar Darshan · Takhat Sachkhand Sri Hazur Sahib',
    asthaanPa: 'ਸ਼ਸਤਰ ਦਰਸ਼ਨ · ਤਖ਼ਤ ਸੱਚਖੰਡ ਸ੍ਰੀ ਹਜ਼ੂਰ ਸਾਹਿਬ',
    captionEn:
      'Sacred eight-armed Khalsa standard carried at the head of Dal Panth processions and venerated during Dussehra and Shastar Puja maryada at Sri Hazur Sahib.',
    captionPa:
      'ਦਲ ਪੰਥ ਦੇ ਨਿਸ਼ਾਨਾਂ ਦੀ ਸ਼ਾਨ ਸ੍ਰੀ ਅਸ਼ਟਭੁਜਾ ਸਾਹਿਬ — ਸ੍ਰੀ ਹਜ਼ੂਰ ਸਾਹਿਬ ਵਿਖੇ ਦੁਸਹਿਰਾ ਅਤੇ ਸ਼ਸਤਰ ਦਰਸ਼ਨ ਮਰਯਾਦਾ ਦਾ ਪਾਵਨ ਪ੍ਰਤੀਕ।',
    sampardaiNoteEn: 'Assu honors Sri Guru Ram Das Ji, Baba Budha Ji, and Puratan Dussehra Shastar Darshan.',
    sampardaiNotePa: 'ਅੱਸੂ ਵਿੱਚ ਸ੍ਰੀ ਗੁਰੂ ਰਾਮਦਾਸ ਜੀ ਅਤੇ ਪੁਰਾਤਨ ਸ਼ਸਤਰ ਦਰਸ਼ਨ ਮਰਯਾਦਾ ਮਨਾਈ ਜਾਂਦੀ ਹੈ।',
  },
  katak: {
    monthKey: 'katak',
    shastarKind: 'tegha',
    shastarNameEn: 'Sri Tegha & Bandi Chhor Shastars',
    shastarNamePa: 'ਸ੍ਰੀ ਤੇਗ਼ਾ ਅਤੇ ਬੰਦੀ ਛੋੜ ਸ਼ਸਤਰ',
    asthaanEn: 'Gurdwara Nagina Ghaat & Sachkhand Sri Hazur Sahib',
    asthaanPa: 'ਗੁਰਦੁਆਰਾ ਨਗੀਨਾ ਘਾਟ ਅਤੇ ਸੱਚਖੰਡ ਸ੍ਰੀ ਹਜ਼ੂਰ ਸਾਹਿਬ',
    captionEn:
      'Preserving the eternal Gurgaddi of Sri Guru Granth Sahib Ji (Katak Sudhi 4) and the radiant Joti Jot Asthaan of Dasmesh Pita at Abchal Nagar, Nanded.',
    captionPa:
      'ਕੱਤਕ ਸੁਦੀ ੪ ਗੁਰਗੱਦੀ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਅਤੇ ਅਬਚਲ ਨਗਰ ਨੰਦੇੜ ਵਿਖੇ ਦਸਮੇਸ਼ ਪਿਤਾ ਦੇ ਪਾਵਨ ਜੋਤੀ ਜੋਤ ਅਸਥਾਨ ਦੀ ਯਾਦ।',
    sampardaiNoteEn: 'Katak unites Dussehra Mahattam Bhog, Bandi Chhor Divas, Gurgaddi SGGS Ji, and Baba Deep Singh Ji Shaheedi.',
    sampardaiNotePa: 'ਕੱਤਕ ਵਿੱਚ ਦੁਸਹਿਰਾ ਮਹਾਤਮ ਭੋਗ, ਬੰਦੀ ਛੋੜ, ਗੁਰਗੱਦੀ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਅਤੇ ਸ਼ਹੀਦੀ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਆਉਂਦੇ ਹਨ।',
  },
  maghar: {
    monthKey: 'maghar',
    shastarKind: 'khanda',
    shastarNameEn: 'Puratan Khanda & Shastar Darshan',
    shastarNamePa: 'ਪੁਰਾਤਨ ਸ੍ਰੀ ਖੰਡਾ ਅਤੇ ਸ਼ਸਤਰ ਦਰਸ਼ਨ',
    asthaanEn: 'Takhat Sachkhand Sri Hazur Sahib · Shastar Darshan',
    asthaanPa: 'ਤਖ਼ਤ ਸੱਚਖੰਡ ਸ੍ਰੀ ਹਜ਼ੂਰ ਸਾਹਿਬ · ਸ਼ਸਤਰ ਦਰਸ਼ਨ',
    captionEn:
      'Each evening at Takhat Sachkhand Sri Hazur Sahib, Dasmesh Pita’s sacred weapons—Khanda, Tegha, Katars, and arrows—are presented for Sangat Shastar Darshan.',
    captionPa:
      'ਤਖ਼ਤ ਸੱਚਖੰਡ ਸ੍ਰੀ ਹਜ਼ੂਰ ਸਾਹਿਬ ਵਿਖੇ ਹਰ ਸ਼ਾਮ ਦਸਮੇਸ਼ ਪਿਤਾ ਜੀ ਦੇ ਪਾਵਨ ਸ਼ਸਤਰਾਂ (ਖੰਡਾ, ਤੇਗ਼ਾ, ਕਟਾਰਾਂ ਅਤੇ ਤੀਰਾਂ) ਦੇ ਸੰਗਤ ਨੂੰ ਦਰਸ਼ਨ ਕਰਵਾਏ ਜਾਂਦੇ ਹਨ।',
    sampardaiNoteEn: 'Maghar 2083 hosts Katak Puranmashi (557th Parkash Sri Guru Nanak Dev Ji) and Sri Guru Tegh Bahadur Ji Shaheedi.',
    sampardaiNotePa: 'ਮੱਘਰ ੨੦੮੩ ਵਿੱਚ ੫੫੭ਵਾਂ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਅਤੇ ਸ਼ਹੀਦੀ ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ਼ ਬਹਾਦਰ ਜੀ ਆਉਂਦੇ ਹਨ।',
  },
  poh: {
    monthKey: 'poh',
    shastarKind: 'khapra-teer',
    shastarNameEn: 'Chamkaur Khapra Teer & Katar',
    shastarNamePa: 'ਚਮਕੌਰ ਸਾਹਿਬ ਖਪਰਾ ਤੀਰ ਅਤੇ ਕਟਾਰ',
    asthaanEn: 'Singhasan Sahib & Bunga Shaheedan · Sri Hazur Sahib',
    asthaanPa: 'ਸਿੰਘਾਸਣ ਸਾਹਿਬ ਅਤੇ ਬੁੰਗਾ ਸ਼ਹੀਦਾਂ · ਸ੍ਰੀ ਹਜ਼ੂਰ ਸਾਹਿਬ',
    captionEn:
      'In remembrance of Poh’s unparalleled sacrifices—Vadde Sahibzade at Chamkaur Sahib and Chhote Sahibzade & Mata Gujri Ji at Sri Fatehgarh Sahib.',
    captionPa:
      'ਪੋਹ ਮਹੀਨੇ ਦੀਆਂ ਲਾਸਾਨੀ ਸ਼ਹਾਦਤਾਂ — ਸ੍ਰੀ ਚਮਕੌਰ ਸਾਹਿਬ ਵਿਖੇ ਵੱਡੇ ਸਾਹਿਬਜ਼ਾਦੇ ਅਤੇ ਸ੍ਰੀ ਫ਼ਤਹਿਗੜ੍ਹ ਸਾਹਿਬ ਵਿਖੇ ਛੋਟੇ ਸਾਹਿਬਜ਼ਾਦਿਆਂ ਤੇ ਮਾਤਾ ਗੁਜਰੀ ਜੀ ਦੀ ਅਮਰ ਯਾਦ।',
    sampardaiNoteEn: 'Poh concludes with Basant Ruth Arambh and prepares for Dasmesh Pita’s Parkash Purab.',
    sampardaiNotePa: 'ਪੋਹ ਦੇ ਅੰਤ ਵਿੱਚ ਬਸੰਤ ਰੁੱਤ ਆਰੰਭ ਹੁੰਦੀ ਹੈ ਅਤੇ ਦਸਮੇਸ਼ ਪਿਤਾ ਦੇ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ ਦੀ ਤਿਆਰੀ ਹੁੰਦੀ ਹੈ।',
  },
  magh: {
    monthKey: 'magh',
    shastarKind: 'talwar',
    shastarNameEn: 'Chali Mukte Sri Talwar Sahib',
    shastarNamePa: 'ਚਾਲੀ ਮੁਕਤੇ ਸ੍ਰੀ ਤਲਵਾਰ ਸਾਹਿਬ',
    asthaanEn: 'Gurdwara Mal Tekri & Sarabloh Bunga Sahib',
    asthaanPa: 'ਗੁਰਦੁਆਰਾ ਮਾਲ ਟੇਕਰੀ ਅਤੇ ਸਰਬਲੋਹ ਬੁੰਗਾ ਸਾਹਿਬ',
    captionEn:
      'Honoring Maghi (Chali Mukte at Sri Muktsar Sahib), the birth of Baba Deep Singh Ji Shaheed, and Basant Panchmi alongside Sahibzada Baba Ajit Singh Ji’s Parkash.',
    captionPa:
      'ਮਾਘੀ (ਚਾਲੀ ਮੁਕਤੇ ਸ੍ਰੀ ਮੁਕਤਸਰ ਸਾਹਿਬ), ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਸ਼ਹੀਦ ਦੇ ਜਨਮ ਅਤੇ ਬਸੰਤ ਪੰਚਮੀ/ਸਾਹਿਬਜ਼ਾਦਾ ਬਾਬਾ ਅਜੀਤ ਸਿੰਘ ਜੀ ਦੇ ਪ੍ਰਕਾਸ਼ ਦੀ ਪਾਵਨ ਯਾਦ।',
    sampardaiNoteEn: 'Magh celebrates Basant Raag in Gurdwara Kirtan and Sampardai Mahapurakh Barsis.',
    sampardaiNotePa: 'ਮਾਘ ਵਿੱਚ ਗੁਰਦੁਆਰਾ ਸਾਹਿਬਾਨ ਵਿਖੇ ਰਾਗ ਬਸੰਤ ਦਾ ਕੀਰਤਨ ਅਤੇ ਮਹਾਂਪੁਰਖਾਂ ਦੀਆਂ ਬਰਸੀਆਂ ਮਨਾਈਆਂ ਜਾਂਦੀਆਂ ਹਨ।',
  },
  phagun: {
    monthKey: 'phagun',
    shastarKind: 'ashtbhuja',
    shastarNameEn: 'Holla Mohalla Ashtbhuja & Nagara',
    shastarNamePa: 'ਹੋਲਾ ਮਹੱਲਾ ਅਸ਼ਟਭੁਜਾ ਅਤੇ ਨਗਾਰਾ',
    asthaanEn: 'Gurdwara Hira Ghaat & Takhat Sri Kesgarh Sahib',
    asthaanPa: 'ਗੁਰਦੁਆਰਾ ਹੀਰਾ ਘਾਟ ਅਤੇ ਤਖ਼ਤ ਸ੍ਰੀ ਕੇਸਗੜ੍ਹ ਸਾਹਿਬ',
    captionEn:
      'Traditional Dal Panth martial emblems—Ashtbhuja standard, Sarabloh weapons, and Ranjit Nagara—heralding spring renewal and Saka Sri Nankana Sahib remembrance.',
    captionPa:
      'ਦਲ ਪੰਥ ਦੇ ਪੁਰਾਤਨ ਚਿੰਨ੍ਹ — ਸ੍ਰੀ ਅਸ਼ਟਭੁਜਾ, ਸਰਬਲੋਹ ਸ਼ਸਤਰ ਅਤੇ ਰਣਜੀਤ ਨਗਾਰਾ — ਬਸੰਤ ਬਹਾਰ ਅਤੇ ਸਾਕਾ ਸ੍ਰੀ ਨਨਕਾਣਾ ਸਾਹਿਬ ਦੀ ਸ਼ਹਾਦਤ ਦੀ ਯਾਦ।',
    sampardaiNoteEn: 'Phagun completes the 12-month Barah Maha cycle leading into Chet Sangrand.',
    sampardaiNotePa: 'ਫੱਗਣ ਮਹੀਨਾ ਬਾਰਹ ਮਾਹਾ ਦੇ ਬਾਰਾਂ ਮਹੀਨਿਆਂ ਦੇ ਚੱਕਰ ਨੂੰ ਸੰਪੂਰਨ ਕਰਕੇ ਚੇਤ ਸੰਗਰਾਂਦ ਵੱਲ ਲੈ ਜਾਂਦਾ ਹੈ।',
  },
};
