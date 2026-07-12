import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef(null);

  const projects = [
    {
      funding: '50 Lakhs',
      title: 'Centre of Excellence in Digital Forensics Intelligence',
      agency: 'Vision Group on Science and Technology, Govt. of Karnataka',
      status: 'Phase 1 Completed → Ongoing',
      duration: '2019 - 2020',
      team: ['Dr. Ananth Prabhu G', 'Mr. Harisha'],
      type: 'ids'
    },
    {
      funding: '2.6 Lakhs',
      title: 'Comprehensive Survey on Deepfake Detection',
      agency: 'CYSECK, Govt. of Karnataka',
      status: 'UC Submitted',
      duration: '2022 - 2023',
      team: ['Dr. Ananth Prabhu G', 'Mr. Harisha'],
      type: 'forensics'
    }
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
          <div className="h-44 w-full bg-cyber-darker relative overflow-hidden flex items-center justify-center border-b border-gray-200">
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
                stroke="#3b82f6"
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
          <div className="h-44 w-full bg-cyber-darker relative overflow-hidden p-4 border-b border-gray-200 flex flex-col justify-between font-mono text-[9px] text-gray-500">
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
            <div className="flex justify-between items-center text-cyber-purple font-bold tracking-wider pt-2 border-t border-gray-200">
              <span>VOL_PARSER: OK</span>
              <span>DUMP_0x00FF8C</span>
            </div>
          </div>
        );
      case 'scanner':
        return (
          <div className="h-44 w-full bg-cyber-darker relative overflow-hidden flex items-center justify-center border-b border-gray-200">
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
          <div className="w-20 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-blue mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-gray-600 font-light text-sm sm:text-base leading-relaxed">
            Review live defensive scripts, analytical forensic plugins, and intelligence tools crafted by scholars under CoE mentorship.
          </p>
        </div>

        {/* Projects Modern Grid */}
        <div className="projects-grid grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((proj, idx) => {
            return (
              <div
                key={idx}
                className="project-card dino-panel-light dino-panel-light-hover rounded-none relative overflow-hidden group flex flex-col justify-between h-full"
              >
                {/* Faded Background Index */}
                <div className="absolute right-6 top-48 text-8xl font-space font-extrabold select-none pointer-events-none opacity-[0.03] text-black">
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </div>

                <div>
                  {/* SVG Visual preview */}
                  {renderPreview(proj.type)}

                  {/* Core description details */}
                  <div className="p-6">
                    {/* Project Title with Funding */}
                    <h3 className="text-base sm:text-lg font-space font-bold text-gray-900 mb-2 group-hover:text-cyber-cyan transition-colors leading-tight">
                      <span className="text-indigo-600 font-extrabold">{proj.funding}</span> <span className="text-gray-400 font-normal">|</span> {proj.title}
                    </h3>

                    {/* Agency */}
                    <p className="text-gray-600 font-sans text-xs mb-4">
                      {proj.agency}
                    </p>

                    {/* Status & Duration */}
                    <div className="flex justify-between items-center text-xs font-mono mb-4 text-cyber-purple font-semibold">
                      <span className="text-indigo-600 font-bold">{proj.status}</span>
                      <span className="text-gray-400 font-light">{proj.duration}</span>
                    </div>

                    {/* Team Pills */}
                    <div className="border-t border-gray-200 pt-4 flex flex-wrap gap-2">
                      {proj.team.map((member, mIdx) => (
                        <span
                          key={mIdx}
                          className="px-3 py-1 bg-indigo-600 text-white font-space font-semibold text-[10px] rounded-full shadow-[2px_2px_0_rgba(0,0,0,1)] border border-black hover:translate-y-[-1px] transition-transform"
                        >
                          {member}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* View Deployment Link */}
                <div className="p-6 pt-0 mt-auto">
                  <a
                    href="#contact"
                    className="interactive flex items-center justify-center space-x-2 text-xs font-mono font-bold tracking-wider text-cyber-cyan border-2 border-black bg-white rounded-lg py-2.5 hover:bg-cyber-cyan hover:text-white hover:shadow-neon transition-all duration-300 w-full"
                  >
                    <span>REQUEST ACCESS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Projects;
