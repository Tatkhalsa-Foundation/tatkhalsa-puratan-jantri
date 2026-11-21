import React from 'react';

interface MoonPhaseIconProps {
  elongationDeg: number; // 0 = Masya (New Moon), 180 = Puranmashi (Full Moon)
  size?: number;
  className?: string;
  title?: string;
}

/**
 * Astronomically accurate live Moon Phase SVG indicator.
 * Renders illuminated lunar hemisphere dynamically from Sun–Moon elongation (0°..360°):
 * - 0° / 360°: Masya (New Moon, dark disc with subtle rim)
 * - 0°..180°: Sudhi (Waxing, lit on right in Northern Hemisphere / Punjab view)
 * - 180°: Puranmashi (Full Moon, radiant golden-parchment disc)
 * - 180°..360°: Vadhi (Waning, lit on left)
 */
export const MoonPhaseIcon: React.FC<MoonPhaseIconProps> = ({
  elongationDeg,
  size = 24,
  className = '',
  title,
}) => {
  const norm = ((elongationDeg % 360) + 360) % 360;
  const r = 42;
  const cx = 50;
  const cy = 50;

  const isPuranmashi = Math.abs(norm - 180) < 7;
  const isMasya = norm < 7 || norm > 353;

  // Compute SVG terminator ellipse horizontal radius rx
  // At 0° or 180°: |cos| = 1 -> rx = r; at 90° or 270°: cos = 0 -> rx = 0 (quarter moon)
  const rad = (norm * Math.PI) / 180;
  const cosPhase = Math.cos(rad);
  const rx = Math.abs(cosPhase) * r;
  const waxing = norm < 180;

  // Build lit hemisphere SVG path
  // Outer arc runs from top (50, 8) to bottom (50, 92) on the lit side:
  // Waxing (Sudhi): right limb lit (sweep 1); Waning (Vadhi): left limb lit (sweep 0)
  let litPath = '';
  if (!isMasya && !isPuranmashi) {
    const outerSweep = waxing ? 1 : 0;
    // Terminator sweep flips past quarter moon (when illumination > 50%, cosPhase < 0)
    const gibbous = cosPhase < 0;
    const innerSweep = waxing ? (gibbous ? 1 : 0) : gibbous ? 0 : 1;
    litPath = `M ${cx} ${cy - r} A ${r} ${r} 0 0 ${outerSweep} ${cx} ${cy + r} A ${rx.toFixed(2)} ${r} 0 0 ${innerSweep} ${cx} ${cy - r} Z`;
  }

  const litFill = isPuranmashi ? '#F59E0B' : '#E8B84B';
  const darkFill = '#1E293B';
  const ringStroke = isPuranmashi ? '#B45309' : '#44403C';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label={title || `Lunar phase ${Math.round(norm)} degrees`}
    >
      {title && <title>{title}</title>}
      {/* Subtle outer archival halo ring for hero sizes */}
      {size >= 56 && (
        <circle
          cx={cx}
          cy={cy}
          r={48}
          fill="none"
          stroke={isPuranmashi ? '#D97706' : '#DDD3C0'}
          strokeWidth="1.2"
          strokeDasharray={isPuranmashi ? 'none' : '3 3'}
        />
      )}
      {/* Shadowed lunar base */}
      <circle cx={cx} cy={cy} r={r} fill={darkFill} stroke={ringStroke} strokeWidth="2.5" />

      {/* Illuminated surface */}
      {isPuranmashi ? (
        <>
          <circle cx={cx} cy={cy} r={r - 0.8} fill="#FDE68A" />
          <circle cx={cx} cy={cy} r={r - 0.8} fill={litFill} fillOpacity="0.45" />
        </>
      ) : isMasya ? (
        <circle cx={cx} cy={cy} r={r - 4} fill="none" stroke="#94A3B8" strokeWidth="1.2" strokeOpacity="0.45" />
      ) : (
        <path d={litPath} fill={litFill} />
      )}

      {/* Subtle lunar maria texture marks for larger hero disc */}
      {size >= 48 && !isMasya && (
        <g opacity="0.14" fill="#78350F">
          <circle cx="42" cy="38" r="7" />
          <circle cx="58" cy="54" r="9" />
          <circle cx="47" cy="64" r="5" />
        </g>
      )}
    </svg>
  );
};
