import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const MagneticButton = ({ children, className = '', onClick }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      // Distance from center
      const distance = Math.hypot(x, y);

      // Proximity threshold
      if (distance < 70) {
        gsap.to(container, {
          x: x * 0.45,
          y: y * 0.45,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        // Reset if mouse is moving out but not fully left
        gsap.to(container, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1.1, 0.4)',
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(container, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1.2, 0.3)',
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`inline-block transition-shadow ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default MagneticButton;
