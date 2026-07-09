import React, { useEffect, useState } from 'react';

const AmbientLife = () => {
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    // Periodically spawn meteors in the background
    const interval = setInterval(() => {
      const id = Math.random().toString(36).substring(2, 9);
      const startX = 40 + Math.random() * 50; // spawn from top-right region (40% to 90% width)
      const startY = -20; // start off-screen
      const duration = 2.5 + Math.random() * 1.5; // travel duration

      setMeteors((prev) => [...prev, { id, startX, startY, duration }]);

      // Remove after animation finishes
      setTimeout(() => {
        setMeteors((prev) => prev.filter((m) => m.id !== id));
      }, duration * 1000);
    }, 10000 + Math.random() * 8000); // spawn every 10-18s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
      {/* Drifting Pixel Clouds */}
      <div className="absolute inset-0">
        <div
          className="absolute w-24 h-12 bg-no-repeat bg-contain opacity-[0.04] animate-drift-cloud-slow"
          style={{
            top: '10%',
            backgroundImage: "url('/favicon.svg')", // Use favicon/shield abstract or cloud SVGs
            animation: 'driftCloud 140s linear infinite',
          }}
        />
        <div
          className="absolute w-20 h-10 bg-no-repeat bg-contain opacity-[0.03] animate-drift-cloud-fast"
          style={{
            top: '25%',
            backgroundImage: "url('/favicon.svg')",
            animation: 'driftCloud 90s linear infinite',
            animationDelay: '-20s',
          }}
        />
        <div
          className="absolute w-28 h-14 bg-no-repeat bg-contain opacity-[0.03] animate-drift-cloud-mid"
          style={{
            top: '40%',
            backgroundImage: "url('/favicon.svg')",
            animation: 'driftCloud 110s linear infinite',
            animationDelay: '-50s',
          }}
        />
      </div>

      {/* Roaming Pixel Birds */}
      <div className="absolute inset-0">
        <div
          className="absolute w-8 h-8 bg-no-repeat bg-contain opacity-[0.06]"
          style={{
            top: '15%',
            backgroundImage: "url('/bird.png')",
            animation: 'flyLeft 45s linear infinite, bobVertical 3s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-6 h-6 bg-no-repeat bg-contain opacity-[0.05]"
          style={{
            top: '35%',
            backgroundImage: "url('/bird.png')",
            animation: 'flyLeft 35s linear infinite, bobVertical 4s ease-in-out infinite',
            animationDelay: '-10s',
          }}
        />
        <div
          className="absolute w-7 h-7 bg-no-repeat bg-contain opacity-[0.05]"
          style={{
            top: '60%',
            backgroundImage: "url('/bird.png')",
            animation: 'flyLeft 55s linear infinite, bobVertical 3.5s ease-in-out infinite',
            animationDelay: '-25s',
          }}
        />
      </div>

      {/* Blinking Pixel Stars */}
      <div className="absolute inset-0">
        <div
          className="absolute w-1.5 h-1.5 bg-[#2563EB] opacity-10 animate-ping"
          style={{ top: '8%', left: '15%', animationDuration: '4s' }}
        />
        <div
          className="absolute w-2 h-2 bg-[#2563EB] opacity-15 animate-pulse"
          style={{ top: '18%', left: '75%', animationDuration: '3s' }}
        />
        <div
          className="absolute w-1 h-1 bg-[#2563EB] opacity-20 animate-pulse"
          style={{ top: '48%', left: '25%', animationDuration: '5s' }}
        />
        <div
          className="absolute w-2 h-2 bg-[#2563EB] opacity-10 animate-ping"
          style={{ top: '70%', left: '85%', animationDuration: '6s' }}
        />
      </div>

      {/* Dynamic Meteors */}
      {meteors.map((m) => (
        <div
          key={m.id}
          className="absolute w-16 h-16 bg-no-repeat bg-contain opacity-[0.08]"
          style={{
            left: `${m.startX}%`,
            top: `${m.startY}%`,
            backgroundImage: "url('/meteor.png')",
            animation: `streakMeteor ${m.duration}s linear forwards`,
          }}
        />
      ))}

      {/* Embed Keyframes Style directly */}
      <style>{`
        @keyframes driftCloud {
          from { transform: translateX(110vw); }
          to { transform: translateX(-20vw); }
        }
        @keyframes flyLeft {
          from { transform: translateX(110vw); }
          to { transform: translateX(-10vw); }
        }
        @keyframes bobVertical {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes streakMeteor {
          0% {
            transform: translate(0, 0) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 0.15;
          }
          90% {
            opacity: 0.15;
          }
          100% {
            transform: translate(-40vw, 40vw) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AmbientLife;
