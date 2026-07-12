import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import CyberBackground from './components/CyberBackground';
import CustomCursor from './components/CustomCursor';
import HexagonPattern from './components/HexagonPattern';
import Hero from './sections/Hero';
import About from './sections/About';
import Domains from './sections/Domains';
import Research from './sections/Research';
import Projects from './sections/Projects';
import Events from './sections/Events';
import Team from './sections/Team';
import Gallery from './sections/Gallery';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import CyberDino from './components/CyberDino';
import AmbientLife from './components/AmbientLife';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const gridWrapRef = useRef(null);

  useEffect(() => {
    // Fade the FlickeringGrid overlay out as user scrolls past the Hero section.
    // It starts fully visible at the top and eases to invisible by the time
    // the bottom of #home reaches the top of the viewport.
    const ctx = gsap.context(() => {
      gsap.to(gridWrapRef.current, {
        opacity: 0,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: '#home',
          start: 'center center',   // begin fade when hero centre reaches viewport centre
          end:   'bottom top',       // fully gone when hero bottom leaves viewport top
          scrub: 1.5,                // silky lag
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Custom Trailing Cursor */}
      <CustomCursor />

      {/* Cyber Noise Film Grain Overlay */}
      <div className="cyber-noise" />

      {/* Vanta.js NET — always underneath, visible once FlickeringGrid fades */}
      <CyberBackground />

      {/* Ambient pixel birds, clouds, meteors, and stars decoration layer */}
      <AmbientLife />

      {/* HexagonPattern — Hero background, fades to Vanta on scroll */}
      <div
        ref={gridWrapRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 2, backgroundColor: '#ffffff' }}
      >
        <HexagonPattern
          hexagons={[
            [1,1],[4,4],[2,2],[3,4],[5,4],
            [8,2],[6,3],[8,5],[10,10],[12,6],
            [14,3],[16,7],[18,2],[20,9],[11,1],
            [15,11],[7,8],[3,12],[9,5],[17,13],
          ]}
          color="#0066cc"
          size={44}
          cols={22}
          rows={14}
          className="absolute inset-0"
        />
      </div>

      {/* Holographic Easter Egg Background Dino */}
      <CyberDino />

      {/* Glassmorphic Sticky Header */}
      <Navbar />

      {/* Main content flow */}
      <main className="relative z-10 w-full min-h-screen">
        <Hero />
        <About />
        <Domains />
        <Research />
        <Projects />
        <Events />
        <Team />
        <Gallery />
        <Contact />
      </main>

      {/* Cyberpunk Footer */}
      <Footer />
    </>
  );
}

export default App;
