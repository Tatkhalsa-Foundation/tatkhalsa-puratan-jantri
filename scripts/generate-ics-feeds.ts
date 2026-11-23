import fs from 'fs';
import path from 'path';
import { generateJantriIcs } from '../src/utils/icsExport';

const feedsDir = path.resolve(process.cwd(), 'public/feeds');
fs.mkdirSync(feedsDir, { recursive: true });

const feeds = [
  {
    filename: 'all-purabs.ics',
    options: {
      includeDaily: false,
      includeSangrands: true,
      includePuranmashi: true,
      includeMasya: true,
      includeGurpurabs: true,
      includeShaheedi: true,
      includeKhalsa: true,
      includeBarsis: true,
      sambatScope: 'all' as const,
      language: 'en' as const,
    },
  },
  {
    filename: 'gurpurabs.ics',
    options: {
      includeDaily: false,
      includeSangrands: true,
      includePuranmashi: true,
      includeMasya: true,
      includeGurpurabs: true,
      includeShaheedi: false,
      includeKhalsa: false,
      includeBarsis: false,
      sambatScope: 'all' as const,
      language: 'en' as const,
    },
  },
  {
    filename: 'daily-full.ics',
    options: {
      includeDaily: true,
      includeSangrands: true,
      includePuranmashi: true,
      includeMasya: true,
      includeGurpurabs: true,
      includeShaheedi: true,
      includeKhalsa: true,
      includeBarsis: true,
      sambatScope: 'all' as const,
      language: 'en' as const,
    },
  },
];

for (const feed of feeds) {
  const { content, eventCount } = generateJantriIcs(feed.options);
  const outPath = path.join(feedsDir, feed.filename);
  fs.writeFileSync(outPath, content, 'utf8');
  console.log(`Generated ${outPath} (${eventCount} events)`);
}
