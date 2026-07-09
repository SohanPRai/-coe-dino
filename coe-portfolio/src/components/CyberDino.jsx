import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CyberDino = () => {
  const dinoRef = useRef(null);

  useEffect(() => {
    const dino = dinoRef.current;
    if (!dino) return;

    let tl;
    let feetAnimation;

    const startDinoRun = () => {
      // Clear previous animations if any
      if (tl) tl.kill();
      if (feetAnimation) feetAnimation.kill();

      const screenWidth = window.innerWidth;

      // Reset position to left side, off-screen
      gsap.set(dino, { x: -80, y: 0 });

      // Footstep vibration to mimic running
      feetAnimation = gsap.to(dino, {
        y: -4,
        duration: 0.08,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      // Main translation timeline
      tl = gsap.timeline({
        onComplete: () => {
          // Wait for a random interval between 15 and 35 seconds before the next run
          const delay = Math.random() * 20 + 15;
          gsap.delayedCall(delay, startDinoRun);
        }
      });

      // Move across screen
      tl.to(dino, {
        x: screenWidth + 80,
        duration: 18,
        ease: 'none',
      });

      // Insert occasional jumps during the run
      // Jump 1: Around 25% of the run
      tl.to(dino, {
        y: -45,
        duration: 0.45,
        ease: 'power1.out',
        yoyo: true,
        repeat: 1,
      }, 4.5);

      // Jump 2: Around 70% of the run
      tl.to(dino, {
        y: -60,
        duration: 0.5,
        ease: 'power1.out',
        yoyo: true,
        repeat: 1,
      }, 12.5);
    };

    // Initial delay before first run (e.g. 5 seconds after mount)
    const initialDelay = gsap.delayedCall(5, startDinoRun);

    return () => {
      initialDelay.kill();
      if (tl) tl.kill();
      if (feetAnimation) feetAnimation.kill();
    };
  }, []);

  return (
    <div
      ref={dinoRef}
      className="fixed bottom-8 left-0 z-[-5] w-14 h-14 pointer-events-none select-none"
      style={{
        mixBlendMode: 'screen',
        // Inverts the black dino on white bg, tints it cyan, adds a subtle glow, and lowers opacity for blending
        filter: 'invert(1) brightness(1.5) sepia(1) hue-rotate(130deg) saturate(900%) drop-shadow(0 0 5px rgba(0, 229, 255, 0.8)) opacity(0.08)',
      }}
    >
      <img
        src="/dino.png"
        alt="Holographic Dino"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default CyberDino;
