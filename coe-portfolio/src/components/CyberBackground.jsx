import React, { useEffect, useRef, useState } from 'react';

const CyberBackground = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    let effect = null;

    const initVanta = () => {
      if (window.VANTA && window.VANTA.NET && vantaRef.current) {
        effect = window.VANTA.NET({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x0066cc,
          backgroundColor: 0xffffff,
          points: 11.00,
          maxDistance: 20.00,
          spacing: 16.00
        });
        setVantaEffect(effect);
      }
    };

    // Robust polling verification if CDN scripts finish loading slightly after mount
    if (window.VANTA && window.VANTA.NET) {
      initVanta();
    } else {
      const interval = setInterval(() => {
        if (window.VANTA && window.VANTA.NET) {
          initVanta();
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }

    return () => {
      if (effect) {
        effect.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default CyberBackground;
