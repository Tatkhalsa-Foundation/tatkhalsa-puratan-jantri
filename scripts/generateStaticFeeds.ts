import {mkdirSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {generateJantriIcs} from '../src/utils/icsExport';

const feedsDir = resolve(process.cwd(), 'public/feeds');
mkdirSync(feedsDir, {recursive: true});

const fixedStamp = new Date('2026-03-14T00:00:00Z');

// 1. Observances feed (Sangrands, Puranmashi, Masya, Gurpurabs, Shaheedi, Khalsa, Barsis across Sambat 2082–2086)
const observances = generateJantriIcs(
  {
    includeDaily: false,
    includeSangrands: true,
    includePuranmashi: true,
    includeMasya: true,
    includeGurpurabs: true,
    includeShaheedi: true,
    includeKhalsa: true,
    includeBarsis: true,
    sambatScope: '2082-2086',
    language: 'bi',
  },
  fixedStamp,
);

const obsPath = resolve(feedsDir, 'puratan-jantri-observances.ics');
writeFileSync(obsPath, observances.content, 'utf8');

// 2. Full Daily Bikrami + Lunar feed (every single calendar day across Sambat 2082–2086)
const daily = generateJantriIcs(
  {
    includeDaily: true,
    includeSangrands: true,
    includePuranmashi: true,
    includeMasya: true,
    includeGurpurabs: true,
    includeShaheedi: true,
    includeKhalsa: true,
    includeBarsis: true,
    sambatScope: '2082-2086',
    language: 'bi',
  },
  fixedStamp,
);

const dailyPath = resolve(feedsDir, 'puratan-jantri-daily.ics');
writeFileSync(dailyPath, daily.content, 'utf8');

console.log(
  `Generated static ICS feeds:\n- ${obsPath} (${observances.eventCount} events)\n- ${dailyPath} (${daily.eventCount} daily events)`,
);
