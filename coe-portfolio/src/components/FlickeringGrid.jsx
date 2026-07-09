import React, { useEffect, useRef, useCallback } from 'react';

/**
 * FlickeringGrid
 * Canvas-based grid of small squares that independently flicker their opacity.
 * Matches the Magic UI FlickeringGrid API.
 */
const FlickeringGrid = ({
  squareSize    = 4,
  gridGap       = 6,
  color         = '#0066cc',
  maxOpacity    = 0.45,
  flickerChance = 0.08,
  className     = '',
  style         = {},
}) => {
  const canvasRef  = useRef(null);
  const stateRef   = useRef({ cols: 0, rows: 0, opacities: [], raf: null });

  // Parse hex/named colour once to [r,g,b]
  const parseColor = useCallback((c) => {
    if (c.startsWith('#')) {
      const hex = c.replace('#', '');
      const full = hex.length === 3
        ? hex.split('').map(h => h + h).join('')
        : hex;
      return [
        parseInt(full.slice(0, 2), 16),
        parseInt(full.slice(2, 4), 16),
        parseInt(full.slice(4, 6), 16),
      ];
    }
    // fallback grey
    return [107, 114, 128];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const [r, g, b] = parseColor(color);
    const s = stateRef.current;

    const setup = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width  = w;
      canvas.height = h;
      s.cols = Math.ceil(w / (squareSize + gridGap));
      s.rows = Math.ceil(h / (squareSize + gridGap));
      const total = s.cols * s.rows;
      // initialise random opacities
      s.opacities = Float32Array.from({ length: total },
        () => Math.random() * maxOpacity);
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { cols, rows, opacities } = s;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = row * cols + col;
          // stochastic flicker
          if (Math.random() < flickerChance) {
            opacities[idx] = Math.random() * maxOpacity;
          }
          ctx.fillStyle = `rgba(${r},${g},${b},${opacities[idx].toFixed(3)})`;
          ctx.fillRect(
            col * (squareSize + gridGap),
            row * (squareSize + gridGap),
            squareSize,
            squareSize,
          );
        }
      }
      s.raf = requestAnimationFrame(draw);
    };

    setup();
    draw();

    const ro = new ResizeObserver(() => { setup(); });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(s.raf);
      ro.disconnect();
    };
  }, [squareSize, gridGap, color, maxOpacity, flickerChance, parseColor]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  );
};

export default FlickeringGrid;
