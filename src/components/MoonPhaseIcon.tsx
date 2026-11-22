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
 * - 0° / 360°: Masya (New Moon, deep Surmai disc with muted gold rim)
 * - 0°..180°: Sudhi (Waxing, lit on right in Northern Hemisphere / Punjab view)
 * - 180°: Puranmashi (Full Moon, radiant gold-parchment disc with Kesri halo)
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

  const rad = (norm * Math.PI) / 180;
  const cosPhase = Math.cos(rad);
  const rx = Math.abs(cosPhase) * r;
  const waxing = norm < 180;

  let litPath = '';
  if (!isMasya && !isPuranmashi) {
    const outerSweep = waxing ? 1 : 0;
    const gibbous = cosPhase < 0;
    const innerSweep = waxing ? (gibbous ? 1 : 0) : gibbous ? 0 : 1;
    litPath = `M ${cx} ${cy - r} A ${r} ${r} 0 0 ${outerSweep} ${cx} ${cy + r} A ${rx.toFixed(2)} ${r} 0 0 ${innerSweep} ${cx} ${cy - r} Z`;
  }

  const litFill = isPuranmashi ? '#D49A2A' : '#DFB24C';
  const darkFill = '#1B263B';
  const ringStroke = isPuranmashi ? '#C86400' : '#44403C';

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
      {size >= 56 && (
        <circle
          cx={cx}
          cy={cy}
          r={48}
          fill="none"
          stroke={isPuranmashi ? '#C86400' : '#B8860B'}
          strokeOpacity={isPuranmashi ? '0.85' : '0.45'}
          strokeWidth="1.25"
          strokeDasharray={isPuranmashi ? 'none' : '3 3'}
        />
      )}
      <circle cx={cx} cy={cy} r={r} fill={darkFill} stroke={ringStroke} strokeWidth="2.5" />

      {isPuranmashi ? (
        <>
          <circle cx={cx} cy={cy} r={r - 0.8} fill="#FBE7A3" />
          <circle cx={cx} cy={cy} r={r - 0.8} fill={litFill} fillOpacity="0.4" />
        </>
      ) : isMasya ? (
        <circle cx={cx} cy={cy} r={r - 4} fill="none" stroke="#B8860B" strokeWidth="1.3" strokeOpacity="0.55" />
      ) : (
        <path d={litPath} fill={litFill} />
      )}

      {size >= 48 && !isMasya && (
        <g opacity="0.14" fill="#6D4400">
          <circle cx="42" cy="38" r="7" />
          <circle cx="58" cy="54" r="9" />
          <circle cx="47" cy="64" r="5" />
        </g>
      )}
    </svg>
  );
};
