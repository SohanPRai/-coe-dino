import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollSpiral
 * A sinusoidal dashed path fixed to the viewport.
 * Instead of a "draw-on" reveal, the dashes continuously FLOW
 * down the path in sync with the user's scroll position —
 * faster scroll → faster flow. scrub adds a silky lag.
 */
const ScrollSpiral = () => {
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const DASH = 14;   // dash length (SVG units)
    const GAP  = 52;   // wide gap between dashes
    const CYCLE = DASH + GAP; // one repeating unit = 66 SVG units

    // Apply the dash pattern once
    gsap.set(path, {
      strokeDasharray: `${DASH} ${GAP}`,
      strokeDashoffset: 0,
    });

    // Drive dashoffset with scroll — negative offset moves dashes forward
    // 100 cycles over the full page height gives a continuous-flow feel
    gsap.to(path, {
      strokeDashoffset: -(CYCLE * 100),
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.0,   // 1 s lag → silky, not mechanical
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars?.trigger === document.body) t.kill();
      });
    };
  }, []);

  /* ── Path geometry ─────────────────────────────── */
  const VW     = 100;   // viewBox width (unitless)
  const VH     = 8000;  // viewBox height — covers long pages
  const CX     = VW / 2;
  const AMP    = 34;    // horizontal swing from centre
  const PERIOD = 300;   // vertical pixels per full sine cycle

  const buildPath = () => {
    const steps = 900;
    const pts = [];
    for (let i = 0; i <= steps; i++) {
      const t     = i / steps;
      const y     = t * VH;
      const angle = (y / PERIOD) * Math.PI * 2;
      const x     = CX + AMP * Math.sin(angle);
      pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`);
    }
    return pts.join(' ');
  };

  const d = buildPath();

  return (
    <svg
      className="fixed left-0 top-0 w-full h-full pointer-events-none"
      style={{ zIndex: 5, overflow: 'visible' }}
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Faint ghost — shows the full route ahead */}
      <path
        d={d}
        fill="none"
        stroke="rgba(0,102,204,0.08)"
        strokeWidth="2"
        strokeDasharray="14 52"
        strokeLinecap="round"
      />

      {/* Flowing dashes — scroll-driven */}
      <path
        ref={pathRef}
        d={d}
        fill="none"
        stroke="#0066cc"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
};

export default ScrollSpiral;
