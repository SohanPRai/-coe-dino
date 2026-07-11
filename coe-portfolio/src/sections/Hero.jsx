import React, { useEffect, useRef } from 'react';
import { Shield, Cpu, Terminal, ArrowRight, ShieldCheck } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import gsap from 'gsap';
import coeLogo from '../images/coe_logo_transparent.png';

// Custom ScrambleTextPlugin for GSAP 3
const ScrambleTextPlugin = {
  name: "scrambleText",
  init(target, vars, _tween) {
    this._target = target;
    let text = "";
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let speed = 1;

    if (typeof vars === "string") {
      text = vars;
    } else {
      text = vars.text || "";
      if (vars.chars) {
        if (vars.chars === "lowerCase") {
          chars = "abcdefghijklmnopqrstuvwxyz";
        } else if (vars.chars === "upperCase") {
          chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        } else if (vars.chars === "numbers") {
          chars = "0123456789";
        } else {
          chars = vars.chars;
        }
      }
      if (vars.speed !== undefined) {
        speed = vars.speed;
      }
    }

    this._text = text;
    this._chars = chars.split("");
    this._speed = speed;
    return true;
  },
  render(ratio, data) {
    const target = data._target;
    const text = data._text;
    const chars = data._chars;
    const len = text.length;

    const revealedCount = Math.floor(ratio * len);
    let result = text.substring(0, revealedCount);

    for (let i = revealedCount; i < len; i++) {
      const char = text[i];
      if (char === " ") {
        result += " ";
      } else {
        const randIndex = Math.floor(Math.random() * chars.length);
        result += chars[randIndex];
      }
    }

    target.textContent = result;
  }
};

gsap.registerPlugin(ScrambleTextPlugin);

const Hero = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const graphicRef = useRef(null);
  const scrambleTimelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation effect for title lines
      const titleLines = titleRef.current.querySelectorAll('.title-line');
      gsap.fromTo(
        titleLines,
        { y: 60, opacity: 0, rotateX: -30 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power4.out',
          delay: 0.2,
        }
      );

      // Subtitle fade-in container animation
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 }
      );

      // Scramble Text Animation Timeline
      const scrambleTl = gsap.timeline({
        delay: 0.8,
        defaults: { ease: 'none' }
      });

      scrambleTl
        .to("#home-scramble-1", {
          scrambleText: {
            text: "Empowering students, researchers, and",
            chars: "lowerCase"
          },
          duration: 1.5
        })
        .to("#home-scramble-2", {
          scrambleText: {
            text: " industry professionals",
            chars: "XO",
            speed: 0.4
          },
          duration: 1.2
        })
        .to("#home-scramble-3", {
          scrambleText: {
            text: " through state-of-the-art",
            chars: "0123456789"
          },
          duration: 1.2
        })
        .to("#home-scramble-4", {
          scrambleText: {
            text: " INNOVATION, applied research,",
            chars: "upperCase",
            speed: 0.3
          },
          duration: 1.2
        })
        .to("#home-scramble-5", {
          scrambleText: {
            text: " cyber defense protocols, ethical hacking, and advanced digital investigations.",
            chars: "lowerCase",
            speed: 0.3
          },
          duration: 2
        });

      scrambleTimelineRef.current = scrambleTl;

      // Cursor Blinking Animation
      gsap.to("#home-scramble-cursor", {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "none"
      });

      // Buttons animation
      gsap.fromTo(
        ctaRef.current.children,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.4)', delay: 1.1 }
      );

      // Holographic right illustration animations
      const orbitals = graphicRef.current.querySelectorAll('.orbital');
      orbitals.forEach((orbital, index) => {
        gsap.to(orbital, {
          rotate: index % 2 === 0 ? 360 : -360,
          duration: 15 + index * 5,
          repeat: -1,
          ease: 'none',
        });
      });

      // Holographic shield pulse and hover float
      gsap.fromTo(
        graphicRef.current.querySelector('.hero-shield'),
        { y: -10 },
        { y: 10, duration: 3, repeat: -1, yoyo: true, ease: 'power1.inOut' }
      );

      // Floating data cards
      const floatCards = graphicRef.current.querySelectorAll('.float-card');
      floatCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: index % 2 === 0 ? -12 : 12, x: index % 2 === 0 ? -5 : 5 },
          {
            y: index % 2 === 0 ? 12 : -12,
            x: index % 2 === 0 ? 5 : -5,
            duration: 4 + index,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column - Content */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-full text-cyber-cyan text-xs font-mono font-medium tracking-wider mb-6 w-fit animate-pulse-slow shadow-neon lg:ml-30 ml-0">
            <Cpu className="w-3.5 h-3.5" />
            <span>SECURE. DETECT. DEFEND.</span>
          </div>

          <h1
            ref={titleRef}
            className="text-2xl sm:text-3xl md:text-5xl xl:text-5xl font-extrabold tracking-tight text-cyber-light mb-6 lg:-ml-30 uppercase leading-[1.1] perspective-[1000px]"
          >
            <div className="title-line overflow-hidden origin-bottom mb-2 ml-4">Building the Future</div>
            <div className="title-line overflow-hidden origin-bottom mb-2 ml-6 lg:ml-10">
              of <span className="text-cyber-cyan text-glow mb-4">Cyber Security </span>
              <div className="lg:ml-55 ml-28 lg:mt-2 mt-2">and</div>
            </div>
            <div className="title-line overflow-hidden origin-bottom lg:ml-4 ml-4 mb-2">&amp;Digital Forensics</div>
          </h1>
          <div className="lg:-ml-20 ml-0" >
            <p id="home-scramble-original" className="sr-only">
              Empowering students, researchers, and industry professionals through state-of-the-art innovation, applied research, cyber defense protocols, ethical hacking, and advanced digital investigations.
            </p>
          </div>
          <p
            ref={subtitleRef}
            onClick={() => scrambleTimelineRef.current && scrambleTimelineRef.current.play(0)}
            className="text-gray-600 text-sm sm:text-base xl:text-lg mb-8 max-w-xl font-light leading-relaxed cursor-pointer select-none min-h-[7em] sm:min-h-[5.5em] md:min-h-[4.5em] lg:-ml-20 ml-0"
            title="Click to replay scramble effect"
          >
            <span id="home-scramble-1"></span>
            <span id="home-scramble-2"></span>
            <span id="home-scramble-3"></span>
            <span id="home-scramble-4"></span>
            <span id="home-scramble-5"></span>
            <span id="home-scramble-cursor" className="inline-block w-2.5 h-[1.1em] bg-cyber-cyan ml-1 align-middle"></span>
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 items-center">
            <MagneticButton>
              <a
                href="#about"
                onClick={(e) => scrollToSection(e, '#about')}
                className="interactive px-7 py-3.5 bg-cyber-cyan text-cyber-bg font-space font-semibold rounded-full border-2 border-black hover:bg-transparent hover:text-cyber-cyan hover:shadow-neon-strong transition-all duration-300 inline-flex items-center space-x-2 text-sm shadow-neon-strong"
              >
                <span>Explore Centre</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href="#domains"
                onClick={(e) => scrollToSection(e, '#domains')}
                className="interactive px-7 py-3.5 bg-cyber-cyan text-cyber-bg font-space font-semibold rounded-full border-2 border-black hover:bg-transparent hover:text-cyber-cyan hover:shadow-neon-strong transition-all duration-300 text-sm inline-flex items-center space-x-2 shadow-neon-strong"
              >
                <span>Research Areas</span>
              </a>
            </MagneticButton>
          </div>
        </div>

        {/* Right Column - Premium Holographic Vector SVG Illustration */}
        <div
          ref={graphicRef}
          className="lg:col-span-5 flex justify-center items-center relative aspect-square w-full max-w-[480px] mx-auto lg:max-w-none lg:ml-25"
        >
          {/* Neon Radial Gradient Glow */}
          <div className="absolute inset-0 bg-cyber-cyan/5 blur-[80px] rounded-full animate-pulse-slow -z-10" />

          {/* Outer Grid lines wrapper */}
          <div className="absolute w-[95%] h-[95%] border border-white/5 rounded-full pointer-events-none" />

          {/* The Holographic Projection SVG */}
          <svg
            viewBox="0 0 500 500"
            className="w-full h-full filter drop-shadow-[0_0_15px_rgba(0,229,255,0.25)]"
          >
            {/* Outer Orbital Grid 1 */}
            <circle
              cx="250"
              cy="250"
              r="220"
              fill="none"
              stroke="rgba(0, 229, 255, 0.08)"
              strokeWidth="1.5"
              strokeDasharray="8 8"
              className="orbital"
            />
            {/* Outer Orbital Grid 2 */}
            <circle
              cx="250"
              cy="250"
              r="180"
              fill="none"
              stroke="rgba(139, 92, 246, 0.12)"
              strokeWidth="2"
              strokeDasharray="40 180"
              className="orbital"
            />
            {/* Outer Orbital Grid 3 */}
            <circle
              cx="250"
              cy="250"
              r="140"
              fill="none"
              stroke="rgba(0, 229, 255, 0.2)"
              strokeWidth="1"
              strokeDasharray="2 12"
              className="orbital"
            />

            {/* Hexagon Target Mesh */}
            <g className="orbital opacity-20">
              <polygon
                points="250,50 423,150 423,350 250,450 77,350 77,150"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="1"
              />
            </g>

            {/* Technical Node Connections */}
            <g className="opacity-40">
              <line x1="250" y1="50" x2="250" y2="450" stroke="rgba(0,229,255,0.15)" strokeWidth="1" />
              <line x1="77" y1="150" x2="423" y2="350" stroke="rgba(0,229,255,0.15)" strokeWidth="1" />
              <line x1="77" y1="350" x2="423" y2="150" stroke="rgba(0,229,255,0.15)" strokeWidth="1" />
            </g>
          </svg>

          {/* Central Hologram Logo - Floating inside the SVG frame */}
          <div className="hero-shield absolute flex items-center justify-center pointer-events-none">
            <img src={coeLogo} alt="CoE Logo" className="w-[180px] h-[180px] sm:w-[250px] sm:h-[250px] object-contain animate-pulse-slow z-10 filter drop-shadow-[0_0_15px_rgba(0,102,204,0.2)]" />
          </div>

          {/* Floating Data Card 1 */}
          <div className="float-card hidden sm:flex absolute top-[12%] right-[2%] glass-panel border border-cyber-cyan/30 px-3 py-2 rounded-xl items-center space-x-2.5 shadow-neon pointer-events-none">
            <div className="p-1.5 bg-cyber-cyan/10 rounded-lg">
              <Terminal className="w-4 h-4 text-cyber-cyan" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-cyber-cyan leading-none font-semibold">IPS ACTIVE</div>
              <div className="text-[9px] text-gray-400 font-light mt-0.5">Threat Level: 0.02%</div>
            </div>
          </div>

          {/* Floating Data Card 2 */}
          <div className="float-card hidden sm:flex absolute bottom-[18%] left-[2%] glass-panel border border-cyber-purple/30 px-3 py-2 rounded-xl items-center space-x-2.5 shadow-glass pointer-events-none">
            <div className="p-1.5 bg-cyber-purple/10 rounded-lg">
              <Cpu className="w-4 h-4 text-cyber-purple" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-cyber-purple leading-none font-semibold">AI DECRYPT</div>
              <div className="text-[9px] text-gray-400 font-light mt-0.5">Quantum Keys Ready</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;