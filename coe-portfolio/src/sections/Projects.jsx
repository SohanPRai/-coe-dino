import React, { useEffect, useRef } from 'react';
import { ShieldAlert, Cpu, Terminal, Users, User, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef(null);

  const projects = [
    {
      title: 'Decentralized Intrusion Detection System',
      tech: ['React', 'Node.js', 'Web3', 'Snort'],
      mentor: 'Dr. Ananth Kumar (HoD, Cyber Security)',
      students: ['Sweekar S.', 'Deepak R.', 'Nithin K.'],
      type: 'ids',
      desc: 'An automated telemetry analyzer mapping local network packages onto a decentralized ledger to detect cross-domain coordinated DDoS exploits.',
    },
    {
      title: 'Volatile RAM Forensic Scanner',
      tech: ['Python', 'C++', 'Volatility 3', 'Qt'],
      mentor: 'Prof. Ramesh Rao (Lead forensic researcher)',
      students: ['Megha S.', 'Rohith J.'],
      type: 'forensics',
      desc: 'Extracting and parsing system registers, kernel tables, and active process queues from memory dumps under high-stealth malware conditions.',
    },
    {
      title: 'Automated IoT Firmware Penetration Tool',
      tech: ['Python', 'Binwalk', 'Docker', 'GDB'],
      mentor: 'Dr. Sandeep Hedge (IoT Lab advisor)',
      students: ['Karthik P.', 'Ashwin V.', 'Varun G.'],
      type: 'scanner',
      desc: 'Simulating fuzzing tests and static decompilation scripts on smart appliance binaries to discover root exploits and hardcoded keys.',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        '.projects-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.projects-header',
            start: 'top 85%',
          },
        }
      );

      // Cards Animation
      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
          },
        }
      );

      // Project radar scan loop
      gsap.to('.radar-hand', {
        rotate: 360,
        duration: 4,
        repeat: -1,
        ease: 'none',
      });
      
      // Memory block flicker
      gsap.to('.memory-block', {
        opacity: () => Math.random() * 0.7 + 0.3,
        duration: 0.5,
        stagger: {
          each: 0.05,
          from: 'random',
          repeat: -1,
          yoyo: true,
        },
      });

      // Waveform offset movement
      gsap.to('.telemetry-wave', {
        strokeDashoffset: -40,
        duration: 2,
        repeat: -1,
        ease: 'none',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Inline SVG visual generator for each project type
  const renderPreview = (type) => {
    switch (type) {
      case 'ids':
        return (
          <div className="h-44 w-full bg-cyber-darker relative overflow-hidden flex items-center justify-center border-b border-white/5">
            {/* Waveform Telemetry */}
            <svg className="w-full h-full p-6 text-cyber-cyan opacity-40" viewBox="0 0 200 100" preserveAspectRatio="none">
              <path
                className="telemetry-wave"
                d="M0,50 L20,50 L25,20 L35,80 L40,50 L70,50 L75,10 L85,90 L90,50 L120,50 L125,30 L135,70 L140,50 L200,50"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              <path
                d="M0,50 L20,50 L25,40 L35,60 L40,50 L70,50 L75,30 L85,75 L90,50 L120,50 L125,45 L135,55 L140,50 L200,50"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="1"
              />
            </svg>
            <div className="absolute top-3 left-3 px-2 py-0.5 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded font-mono text-[9px] text-cyber-cyan font-bold tracking-widest">
              IDS_GRID_FEED: PASSIVE
            </div>
          </div>
        );
      case 'forensics':
        return (
          <div className="h-44 w-full bg-cyber-darker relative overflow-hidden p-4 border-b border-white/5 flex flex-col justify-between font-mono text-[9px] text-gray-500">
            {/* Simulated Hex Memory Blocks */}
            <div className="grid grid-cols-8 gap-2 w-full mt-2">
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className="memory-block h-4 rounded bg-cyber-purple/20 border border-cyber-purple/30 flex items-center justify-center text-[7px] text-cyber-purple font-bold font-mono"
                >
                  {i.toString(16).toUpperCase().padStart(2, '0')}
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center text-cyber-purple font-bold tracking-wider pt-2 border-t border-white/5">
              <span>VOL_PARSER: OK</span>
              <span>DUMP_0x00FF8C</span>
            </div>
          </div>
        );
      case 'scanner':
        return (
          <div className="h-44 w-full bg-cyber-darker relative overflow-hidden flex items-center justify-center border-b border-white/5">
            {/* Exploit scanner sonar/radar */}
            <div className="w-28 h-28 border border-cyber-cyan/20 rounded-full relative flex items-center justify-center">
              <div className="absolute inset-4 border border-dashed border-cyber-cyan/20 rounded-full" />
              <div className="absolute inset-8 border border-cyber-cyan/10 rounded-full" />
              {/* Radar Sweeper hand */}
              <div className="radar-hand absolute top-0 left-0 w-full h-full origin-center">
                <div className="w-[2px] h-[56px] bg-gradient-to-t from-transparent to-cyber-cyan shadow-neon mx-auto" />
              </div>
              {/* Vulnerabilities pings */}
              <div className="absolute top-6 left-12 w-2 h-2 bg-rose-500 rounded-full shadow-lg animate-ping" />
              <div className="absolute bottom-8 right-6 w-1.5 h-1.5 bg-yellow-500 rounded-full shadow-lg animate-pulse" />
            </div>
            <div className="absolute top-3 left-3 px-2 py-0.5 bg-rose-500/10 border border-rose-500/30 rounded font-mono text-[9px] text-rose-500 font-bold tracking-widest">
              ROOT_FUZZ_ACTIVE
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative py-24 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="projects-header text-center mb-16">
          <div className="inline-block px-3 py-1 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-full text-cyber-cyan text-xs font-mono font-medium tracking-wider mb-4 shadow-neon">
            OPERATIONAL DEPLOYMENTS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-wider mb-4">
            CoE Project <span className="text-cyber-cyan text-glow">Deployments</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-purple mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-gray-400 font-light text-sm sm:text-base leading-relaxed">
            Review live defensive scripts, analytical forensic plugins, and intelligence tools crafted by scholars under CoE mentorship.
          </p>
        </div>

        {/* Projects Modern Grid */}
        <div className="projects-grid grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="project-card glass-panel rounded-2xl border border-white/5 hover:border-cyber-cyan/30 hover:shadow-neon transition-all duration-300 relative overflow-hidden group flex flex-col justify-between h-full"
            >
              <div>
                {/* SVG Visual preview */}
                {renderPreview(proj.type)}

                {/* Core description details */}
                <div className="p-6">
                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[8px] sm:text-[9px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Project Title */}
                  <h3 className="text-base sm:text-lg font-space font-bold uppercase tracking-wider text-white mb-3 group-hover:text-cyber-cyan transition-colors">
                    {proj.title}
                  </h3>

                  {/* Summary Text */}
                  <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    {proj.desc}
                  </p>

                  {/* Mentor & Team credentials */}
                  <div className="border-t border-white/5 pt-4 space-y-2">
                    <div className="flex items-center text-[10px] text-gray-400 font-sans font-light">
                      <User className="w-3.5 h-3.5 text-cyber-purple mr-2 shrink-0" />
                      <span className="truncate"><strong>Mentor:</strong> {proj.mentor}</span>
                    </div>
                    <div className="flex items-start text-[10px] text-gray-400 font-sans font-light">
                      <Users className="w-3.5 h-3.5 text-cyber-cyan mr-2 shrink-0 mt-0.5" />
                      <div>
                        <strong>Team:</strong> {proj.students.join(', ')}
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* View Deployment Link */}
              <div className="p-6 pt-0 mt-auto">
                <a
                  href="#contact"
                  className="interactive flex items-center justify-center space-x-2 text-xs font-mono font-bold tracking-wider text-cyber-cyan border border-cyber-cyan/30 rounded-lg py-2.5 hover:bg-cyber-cyan hover:text-cyber-bg hover:border-cyber-cyan hover:shadow-neon transition-all duration-300 w-full"
                >
                  <span>REQUEST ACCESS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
