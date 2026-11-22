import React from 'react';
import {MONTHLY_HERITAGE, type ShastarSvgKind} from '../data/heritageData';
import {BIKRAMI_MONTHS} from '../data/sambatData';
import type {BikramiMonthMeta, LanguageMode} from '../data/types';

interface ShastarAsthaanCardProps {
  monthKey: BikramiMonthMeta['key'];
  lang: LanguageMode;
}

/**
 * Custom copyright-free Khalsa Puratan Shastar SVG Illustrations
 * Crafted in traditional Sarabloh (#1B263B), Heritage Gold (#B8860B), and Kesri (#C86400) linework.
 */
const ShastarIllustration: React.FC<{kind: ShastarSvgKind; title: string}> = ({kind, title}) => {
  return (
    <svg
      viewBox="0 0 180 140"
      className="w-full h-full max-w-[176px] max-h-[136px]"
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id={`blade-${kind}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2E3F5E" />
          <stop offset="50%" stopColor="#1B263B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id={`gold-${kind}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4A62A" />
          <stop offset="55%" stopColor="#B8860B" />
          <stop offset="100%" stopColor="#8A6305" />
        </linearGradient>
      </defs>

      {/* Subtle Puratan Manuscript Halo Ring */}
      <circle
        cx="90"
        cy="70"
        r="56"
        fill="none"
        stroke="#B8860B"
        strokeOpacity="0.22"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      <circle cx="90" cy="70" r="48" fill="#FAF6EE" fillOpacity="0.55" stroke="#DDD2BE" strokeWidth="0.8" />

      {kind === 'khanda' && (
        <g>
          {/* Chakkar */}
          <circle cx="90" cy="68" r="24" fill="none" stroke={`url(#gold-${kind})`} strokeWidth="4.2" />
          {/* Left & Right Kirpans */}
          <path
            d="M 52 108 C 44 74 52 44 76 26 C 60 50 56 76 62 104 Z"
            fill={`url(#blade-${kind})`}
          />
          <path
            d="M 128 108 C 136 74 128 44 104 26 C 120 50 124 76 118 104 Z"
            fill={`url(#blade-${kind})`}
          />
          {/* Crossed Kirpan Hilts */}
          <path d="M 50 100 L 70 112" stroke={`url(#gold-${kind})`} strokeWidth="3.2" strokeLinecap="round" />
          <path d="M 130 100 L 110 112" stroke={`url(#gold-${kind})`} strokeWidth="3.2" strokeLinecap="round" />
          <circle cx="54" cy="112" r="3" fill={`url(#gold-${kind})`} />
          <circle cx="126" cy="112" r="3" fill={`url(#gold-${kind})`} />
          {/* Central Double-Edged Khanda */}
          <path
            d="M 90 14 L 97 34 L 94 100 L 86 100 L 83 34 Z"
            fill={`url(#blade-${kind})`}
            stroke="#FAF6EE"
            strokeWidth="0.8"
          />
          <line x1="90" y1="22" x2="90" y2="96" stroke={`url(#gold-${kind})`} strokeWidth="1.2" />
          {/* Khanda Crossguard & Pommel */}
          <rect x="76" y="99" width="28" height="4.5" rx="2" fill={`url(#gold-${kind})`} />
          <rect x="87" y="103" width="6" height="17" rx="1.5" fill={`url(#gold-${kind})`} />
          <circle cx="90" cy="123" r="4.2" fill={`url(#gold-${kind})`} />
        </g>
      )}

      {kind === 'tegha' && (
        <g>
          {/* Broad Heavy Curved Tegha Blade */}
          <path
            d="M 38 104 C 66 96 104 72 138 26 C 144 38 140 54 126 70 C 102 96 72 108 42 112 Z"
            fill={`url(#blade-${kind})`}
          />
          {/* Spine Fuller Line */}
          <path
            d="M 48 104 C 74 96 108 74 134 38"
            fill="none"
            stroke={`url(#gold-${kind})`}
            strokeWidth="1.4"
            strokeOpacity="0.85"
          />
          {/* Decorative Koftgari Ricasso */}
          <path d="M 44 101 L 58 98 L 60 107 L 46 110 Z" fill={`url(#gold-${kind})`} />
          {/* Traditional Tulwar Basket/Knuckle Guard Hilt */}
          <path
            d="M 44 96 L 48 117 M 45 107 L 26 114"
            stroke={`url(#gold-${kind})`}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 46 116 C 36 122 28 120 26 114"
            fill="none"
            stroke={`url(#gold-${kind})`}
            strokeWidth="2.4"
          />
          <circle cx="24" cy="115" r="5" fill={`url(#gold-${kind})`} />
          <circle cx="24" cy="115" r="2" fill="#1B263B" />
        </g>
      )}

      {kind === 'talwar' && (
        <g>
          {/* Crossed Miri-Piri Shamshir Talwars */}
          <path
            d="M 38 108 C 72 90 106 60 138 24 C 138 36 128 50 112 66 C 88 88 64 102 42 112 Z"
            fill={`url(#blade-${kind})`}
          />
          <path
            d="M 142 108 C 108 90 74 60 42 24 C 42 36 52 50 68 66 C 92 88 116 102 138 112 Z"
            fill={`url(#blade-${kind})`}
            fillOpacity="0.92"
          />
          {/* Hilts */}
          <path d="M 35 102 L 48 116 M 39 109 L 26 120" stroke={`url(#gold-${kind})`} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 145 102 L 132 116 M 141 109 L 154 120" stroke={`url(#gold-${kind})`} strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="24" cy="121" r="4" fill={`url(#gold-${kind})`} />
          <circle cx="156" cy="121" r="4" fill={`url(#gold-${kind})`} />
          {/* Center Golden Medallion */}
          <circle cx="90" cy="70" r="8" fill="#FAF6EE" stroke={`url(#gold-${kind})`} strokeWidth="2.2" />
          <circle cx="90" cy="70" r="3" fill="#C86400" />
        </g>
      )}

      {kind === 'khapra-teer' && (
        <g>
          {/* Traditional Recurved Bow Arc */}
          <path
            d="M 58 24 C 34 42 40 58 46 70 C 40 82 34 98 58 116"
            fill="none"
            stroke={`url(#gold-${kind})`}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <line x1="58" y1="24" x2="58" y2="116" stroke="#1B263B" strokeWidth="1" strokeDasharray="2 2" />
          {/* Shaft of Khapra Teer */}
          <line x1="34" y1="70" x2="128" y2="70" stroke={`url(#blade-${kind})`} strokeWidth="3.2" strokeLinecap="round" />
          {/* Fletching Feathers */}
          <path d="M 34 70 L 46 60 L 54 62 L 42 70 Z" fill="#C86400" />
          <path d="M 34 70 L 46 80 L 54 78 L 42 70 Z" fill="#C86400" />
          <rect x="44" y="67.5" width="6" height="5" fill={`url(#gold-${kind})`} />
          {/* Crescent Khapra Arrowhead (Gold-inlaid tip) */}
          <path
            d="M 122 65 L 132 65 C 142 56 150 54 154 57 C 146 63 145 77 154 83 C 150 86 142 84 132 75 L 122 75 Z"
            fill={`url(#gold-${kind})`}
            stroke="#1B263B"
            strokeWidth="1.2"
          />
        </g>
      )}

      {kind === 'kardh' && (
        <g>
          {/* Straight Tapered Sarabloh Kardh Blade */}
          <path
            d="M 60 92 L 136 30 L 146 28 L 138 42 L 68 100 Z"
            fill={`url(#blade-${kind})`}
          />
          {/* Spine & Decorative Bolster */}
          <line x1="65" y1="94" x2="136" y2="35" stroke={`url(#gold-${kind})`} strokeWidth="1.3" />
          <path d="M 55 88 L 71 104 L 64 110 L 48 94 Z" fill={`url(#gold-${kind})`} />
          {/* Bone/Sarabloh Handle */}
          <path
            d="M 52 98 L 32 116 C 28 119 32 126 38 122 L 58 105 Z"
            fill="#1B263B"
            stroke={`url(#gold-${kind})`}
            strokeWidth="1.5"
          />
          {/* Rivets */}
          <circle cx="48" cy="108" r="1.8" fill={`url(#gold-${kind})`} />
          <circle cx="40" cy="115" r="1.8" fill={`url(#gold-${kind})`} />
        </g>
      )}

      {kind === 'dhaal' && (
        <g>
          {/* Sarabloh Dhaal (Circular Khalsa Shield) */}
          <circle
            cx="90"
            cy="70"
            r="44"
            fill={`url(#blade-${kind})`}
            stroke={`url(#gold-${kind})`}
            strokeWidth="4.5"
          />
          <circle cx="90" cy="70" r="35" fill="none" stroke={`url(#gold-${kind})`} strokeWidth="1.4" strokeDasharray="4 3" />
          {/* Crescent Motif */}
          <path
            d="M 78 52 A 18 18 0 1 0 102 52 A 14 14 0 1 1 78 52 Z"
            fill={`url(#gold-${kind})`}
            fillOpacity="0.85"
          />
          {/* Four Traditional Raised Bosses (Phull) */}
          {[
            [72, 56],
            [108, 56],
            [72, 84],
            [108, 84],
          ].map(([cx, cy], idx) => (
            <g key={idx}>
              <circle cx={cx} cy={cy} r="6.5" fill={`url(#gold-${kind})`} stroke="#FAF6EE" strokeWidth="1" />
              <circle cx={cx} cy={cy} r="2.2" fill="#1B263B" />
            </g>
          ))}
          <circle cx="90" cy="70" r="4" fill="#C86400" stroke="#FAF6EE" strokeWidth="1" />
        </g>
      )}

      {kind === 'ashtbhuja' && (
        <g>
          {/* Central Standard Staff & Spearhead */}
          <line x1="90" y1="22" x2="90" y2="124" stroke={`url(#gold-${kind})`} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 90 12 L 96 28 L 90 25 L 84 28 Z" fill={`url(#blade-${kind})`} />
          {/* Eight Radiating Sarabloh Arms (Ashtbhuja) */}
          {[-68, -42, -18, 18, 42, 68].map((angle, idx) => (
            <g key={idx} transform={`rotate(${angle} 90 66)`}>
              <path
                d="M 90 66 L 90 32 L 93 38 L 90 36 L 87 38 Z"
                fill={`url(#blade-${kind})`}
                stroke={`url(#gold-${kind})`}
                strokeWidth="0.9"
              />
            </g>
          ))}
          {/* Crescent & Chakkar Base */}
          <path
            d="M 62 66 C 68 84 112 84 118 66 C 108 75 72 75 62 66 Z"
            fill={`url(#gold-${kind})`}
          />
          <circle cx="90" cy="66" r="10" fill="#FAF6EE" stroke={`url(#blade-${kind})`} strokeWidth="2.8" />
          <circle cx="90" cy="66" r="4" fill="#C86400" />
          {/* Kesri Farla Ribbon Accent */}
          <path d="M 90 92 Q 112 96 118 112 Q 102 108 90 104 Z" fill="#C86400" fillOpacity="0.88" />
        </g>
      )}
    </svg>
  );
};

export const ShastarAsthaanCard: React.FC<ShastarAsthaanCardProps> = ({monthKey, lang}) => {
  const isPa = lang === 'pa';
  const isBi = lang === 'bi';
  const item = MONTHLY_HERITAGE[monthKey] ?? MONTHLY_HERITAGE.maghar;
  const monthMeta = BIKRAMI_MONTHS.find((m) => m.key === monthKey) ?? BIKRAMI_MONTHS[8];

  return (
    <section
      aria-labelledby="shastar-asthaan-heading"
      className="no-print relative rounded-xl border-2 border-[var(--accent-gold)]/70 bg-[var(--bg-surface-elevated)] p-1.5 shadow-xs"
    >
      {/* Inner Double-Rule Puratan Frame */}
      <div
        className="relative rounded-lg border border-[var(--border-strong)] px-5 py-5 sm:px-7 sm:py-6 overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(135deg, var(--heritage-from), var(--heritage-via), var(--heritage-to))',
        }}
      >
        {/* Corner Filigree Ornaments */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-2 left-2 h-4 w-4 border-t-2 border-l-2 border-[var(--accent-gold)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-2 right-2 h-4 w-4 border-t-2 border-r-2 border-[var(--accent-gold)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 border-[var(--accent-gold)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-[var(--accent-gold)]"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:items-center">
          {/* Left: Custom Copyright-Free Khalsa Shastar SVG */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-canvas)]/85 p-3">
            <ShastarIllustration
              kind={item.shastarKind}
              title={isPa ? item.shastarNamePa : item.shastarNameEn}
            />
            <p className="mt-1 text-center text-[11px] font-semibold text-[var(--text-heading)]">
              {isPa ? item.shastarNamePa : item.shastarNameEn}
            </p>
            {isBi && (
              <p className="text-center font-gurmukhi text-[11px] text-[var(--accent-primary-text)]">
                {item.shastarNamePa}
              </p>
            )}
          </div>

          {/* Right: Takhat Sachkhand Sri Hazur Sahib Asthaan & Sampardai Caption */}
          <div className="md:col-span-8 lg:col-span-9 space-y-2.5">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
              <span className="font-semibold tracking-wide uppercase text-[var(--accent-gold-text)]">
                {isPa
                  ? `ਸ਼ਸਤਰ ਅਤੇ ਅਸਥਾਨ ਦਰਸ਼ਨ · ${monthMeta.namePa}`
                  : isBi
                    ? `Shastar & Asthaan Darshan · ${monthMeta.nameEn} (${monthMeta.namePa})`
                    : `Monthly Shastar & Asthaan Darshan · ${monthMeta.nameEn}`}
              </span>
              <span aria-hidden="true" className="text-[var(--accent-gold)]">
                ·
              </span>
              <span className="font-medium text-[var(--text-heading)]">
                {isPa ? 'ਪੁਰਾਤਨ ਖ਼ਾਲਸਾ ਵਿਰਾਸਤ' : 'Puratan Khalsa Heritage'}
              </span>
            </div>

            <h3
              id="shastar-asthaan-heading"
              className="font-display text-xl sm:text-2xl font-semibold text-[var(--text-heading)] leading-snug"
            >
              {isPa ? item.asthaanPa : item.asthaanEn}
            </h3>
            {isBi && (
              <p className="font-gurmukhi text-sm font-medium text-[var(--accent-primary-text)]">
                {item.asthaanPa}
              </p>
            )}

            <p className="text-sm text-[var(--text-primary)] leading-relaxed">
              {isPa ? item.captionPa : item.captionEn}
            </p>
            {isBi && (
              <p className="font-gurmukhi text-sm text-[var(--text-secondary)] leading-relaxed">
                {item.captionPa}
              </p>
            )}

            <p className="pt-2 border-t border-[var(--border-subtle)] text-xs font-medium text-[var(--text-muted)]">
              {isPa
                ? item.sampardaiNotePa
                : isBi
                  ? `${item.sampardaiNoteEn} · ${item.sampardaiNotePa}`
                  : item.sampardaiNoteEn}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
