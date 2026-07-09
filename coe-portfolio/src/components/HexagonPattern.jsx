import React, { useMemo } from 'react';

/**
 * HexagonPattern
 * Renders a full-coverage SVG honeycomb grid.
 * Highlighted hexagons (passed via the `hexagons` prop as [col, row] pairs)
 * are rendered with the accent fill; all others are faint outlines.
 */
const HexagonPattern = ({
  hexagons   = [],         // [[col, row], …] — positions to highlight
  className  = '',
  style      = {},
  color      = '#0066cc', // accent colour for highlighted cells
  size       = 40,        // flat-to-flat radius in px
  cols       = 24,        // grid columns
  rows       = 16,        // grid rows
}) => {
  // Hex geometry helpers (pointy-top orientation)
  const w  = size * 2;
  const h  = Math.sqrt(3) * size;
  const hW = w * 0.75;   // horizontal step between column centres

  // Build all cells
  const cells = useMemo(() => {
    const set = new Set(hexagons.map(([c, r]) => `${c},${r}`));
    const arr = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = c * hW + size;
        const cy = r * h + (c % 2 === 1 ? h / 2 : 0) + h / 2;
        arr.push({ c, r, cx, cy, highlighted: set.has(`${c},${r}`) });
      }
    }
    return arr;
  }, [hexagons, cols, rows, hW, h, size]);

  // Build a pointy-top hexagon path centred on (0,0)
  const hexPath = useMemo(() => {
    const r = size - 1.5; // slight inset for visible gap
    const pts = Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 180) * (60 * i - 30);
      return `${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`;
    });
    return `M${pts.join('L')}Z`;
  }, [size]);

  const svgW = cols * hW + size / 2;
  const svgH = rows * h + h;

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      className={className}
      style={{ width: '100%', height: '100%', ...style }}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Radial mask so edges fade smoothly */}
        <radialGradient id="hex-fade" cx="50%" cy="50%" r="55%">
          <stop offset="0%"   stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="hex-mask">
          <rect width="100%" height="100%" fill="url(#hex-fade)" />
        </mask>
      </defs>

      <g mask="url(#hex-mask)">
        {cells.map(({ c, r, cx, cy, highlighted }) => (
          <path
            key={`${c}-${r}`}
            d={hexPath}
            transform={`translate(${cx},${cy})`}
            fill={highlighted ? color : 'none'}
            fillOpacity={highlighted ? 0.18 : 0}
            stroke={color}
            strokeOpacity={highlighted ? 0.65 : 0.12}
            strokeWidth={highlighted ? 1.5 : 0.8}
          />
        ))}
      </g>
    </svg>
  );
};

export default HexagonPattern;
