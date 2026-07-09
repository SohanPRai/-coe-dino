import React, { useRef, useEffect } from 'react';

/**
 * Marquee
 * CSS-driven infinite horizontal scroll ticker.
 * Props:
 *   reverse      — scroll in the opposite direction
 *   pauseOnHover — pause animation on mouse enter
 *   speed        — CSS custom property value for --duration (default "30s")
 *   className    — extra classes on the outer wrapper
 *   children     — items to repeat
 */
const Marquee = ({
  reverse      = false,
  pauseOnHover = false,
  speed        = '30s',
  className    = '',
  children,
}) => {
  const style = {
    '--duration': speed,
  };

  return (
    <div
      className={`marquee-outer ${className}`}
      style={style}
    >
      {/* Inner track duplicated so the loop is seamless */}
      <div
        className={`marquee-track${reverse ? ' marquee-reverse' : ''}${pauseOnHover ? ' marquee-pause-hover' : ''}`}
      >
        {/* First copy */}
        <div className="marquee-content" aria-hidden="false">{children}</div>
        {/* Duplicate for seamless loop */}
        <div className="marquee-content" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
};

export default Marquee;
