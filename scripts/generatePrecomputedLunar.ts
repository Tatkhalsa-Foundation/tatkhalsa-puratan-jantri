import {writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {
  computeLunarInfoForDate,
  encodeLunarInfoToCompact,
  type CompactLunarTuple,
} from '../src/utils/astronomy';

function addDays(iso: string, delta: number): string {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + delta));
  return `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, '0')}-${String(dt.getUTCDate()).padStart(2, '0')}`;
}

const START_ISO = '2025-03-01';
const END_ISO = '2028-04-20';

const table: Record<string, CompactLunarTuple> = {};
let cursor = START_ISO;
let count = 0;

while (cursor <= END_ISO) {
  const info = computeLunarInfoForDate(cursor);
  table[cursor] = encodeLunarInfoToCompact(cursor, info);
  count += 1;
  cursor = addDays(cursor, 1);
}

const outputPath = resolve(process.cwd(), 'src/data/precomputedLunar2082_2084.ts');
const fileContent = `import type {CompactLunarTuple} from '../utils/astronomy';

/**
 * Build-time precomputed Puratan lunar tithi lookup table for Sambat 2082–2084 (${START_ISO} to ${END_ISO}).
 * Eliminates synchronous Meeus astronomical loops on initial mount so TBT stays near zero.
 * Dates outside this window fall back automatically to the perpetual Meeus engine in astronomy.ts.
 */
export const PRECOMPUTED_LUNAR_2082_2084: Readonly<Record<string, CompactLunarTuple>> = ${JSON.stringify(table)};
`;

writeFileSync(outputPath, fileContent, 'utf8');
console.log(`Generated ${count} precomputed lunar entries -> ${outputPath}`);
