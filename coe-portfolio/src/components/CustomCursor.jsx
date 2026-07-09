import React, { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const ringRef = useRef(null);
  const dotRef = useRef(null);

  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device is mobile or tablet
    const checkDevice = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isTouch);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    if (isMobile) return;

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!visible) setVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.interactive') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.classList.contains('cursor-pointer');
      
      setHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.body.addEventListener('mouseleave', () => setVisible(false));
    document.body.addEventListener('mouseenter', () => setVisible(true));

    // Smooth ring transition using LERP (Linear Interpolation)
    let animationId;
    const updatePosition = () => {
      // Lerp ring positions (0.15 creates a smooth lag effect)
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      if (dotRef.current) {
        dotRef.current.style.left = `${mousePos.current.x}px`;
        dotRef.current.style.top = `${mousePos.current.y}px`;
      }

      animationId = requestAnimationFrame(updatePosition);
    };

    updatePosition();

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationId);
    };
  }, [isMobile]);

  if (isMobile || !visible) return null;

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className={`custom-cursor pointer-events-none fixed z-[9999] rounded-full border border-cyber-cyan/80 bg-transparent transition-all duration-300 ease-out -translate-x-1/2 -translate-y-1/2 ${
          hovered 
            ? 'h-14 w-14 bg-cyber-cyan/10 border-cyber-cyan shadow-neon-strong scale-110' 
            : 'h-7 w-7'
        }`}
      />
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className={`custom-cursor-dot pointer-events-none fixed z-[9999] h-1.5 w-1.5 rounded-full bg-cyber-cyan -translate-x-1/2 -translate-y-1/2 shadow-neon transition-transform duration-200 ${
          hovered ? 'scale-0' : 'scale-100'
        }`}
      />
    </>
  );
};

export default CustomCursor;
