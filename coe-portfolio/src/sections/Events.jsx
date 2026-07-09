import React, { useEffect, useRef } from 'react';
import { Trophy, Shield, Key, Presentation, Users, Video } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Events = () => {
  const containerRef = useRef(null);

  const events = [
    {
      title: 'Sahyadri Cyber-Strike Hackathon',
      date: 'September 12 - 14, 2026',
      type: 'Hackathon',
      desc: 'A 36-hour physical security sprint where developers build mitigation plugins, firmware auditors, and automated scanning modules.',
      icon: Trophy,
      color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
    },
    {
      title: 'DFICS RootCTF Conquest',
      date: 'November 08, 2026',
      type: 'Capture The Flag',
      desc: 'Jeopardy-style capture-the-flag tournament testing memory dumps, reverse malware extraction, binary buffer overflows, and cryptography.',
      icon: Shield,
      color: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
    },
    {
      title: 'Reverse Engineering Lab Workshop',
      date: 'December 18, 2026',
      type: 'Workshop',
      desc: 'Hands-on hardware disassembly session, connecting logic analyzers to extract boot codes and auditing micro-controller interfaces.',
      icon: Key,
      color: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
    },
    {
      title: 'Industrial Incident Briefings',
      date: 'January 22, 2027',
      type: 'Guest Lectures',
      desc: 'Industry consultants breakdown corporate forensic analysis cases and operational defense strategies during active intrusion.',
      icon: Presentation,
      color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
    },
    {
      title: 'Law Enforcement Cyber Bootcamps',
      date: 'February 10 - 15, 2027',
      type: 'Training Sessions',
      desc: 'CoE-backed specialized workshops for intelligence officers, showcasing logical drives retrieval and chain-of-custody protocols.',
      icon: Users,
      color: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
    },
    {
      title: 'Decentralized Quantum Cryptography Webinar',
      date: 'March 05, 2027',
      type: 'Webinrs',
      desc: 'Academic webinar exploring mathematical limits of post-quantum cryptography algorithms and their impacts on network routers.',
      icon: Video,
      color: 'text-rose-400 bg-rose-400/10 border-rose-400/30',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        '.events-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.events-header',
            start: 'top 85%',
          },
        }
      );

      // Alternating timeline cards reveal
      const cards = gsap.utils.toArray('.timeline-event-card');
      cards.forEach((card, idx) => {
        const isLeft = idx % 2 === 0;
        gsap.fromTo(
          card,
          { opacity: 0, x: isLeft ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="events"
      ref={containerRef}
      className="relative py-24 border-t border-white/5 overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div className="absolute right-0 bottom-1/3 w-[350px] h-[350px] bg-cyber-purple/5 blur-[100px] rounded-full pointer-events-none -z-10 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="events-header text-center mb-16">
          <div className="inline-block px-3 py-1 bg-cyber-purple/10 border border-cyber-purple/30 rounded-full text-cyber-purple text-xs font-mono font-medium tracking-wider mb-4 shadow-neon-purple">
            COMMUNITY &amp; DEVELOPMENT
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-wider mb-4">
            Security <span className="text-cyber-cyan text-glow">Events &amp; Chronology</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-purple mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-gray-400 font-light text-sm sm:text-base leading-relaxed">
            Participate in interactive cybersecurity sprints, incident drills, reverse engineering forums, and professional webinars.
          </p>
        </div>

        {/* Timeline wrapper */}
        <div className="relative mt-12">
          {/* Vertical axis line on desktop */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-cyber-cyan via-cyber-purple to-cyber-cyan/10 hidden lg:block" />

          {/* Timeline events container */}
          <div className="space-y-12 relative lg:space-y-20">
            {events.map((ev, idx) => {
              const IconComponent = ev.icon;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`flex flex-col lg:flex-row items-center justify-between w-full relative ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Invisible spacer to maintain layout */}
                  <div className="w-full lg:w-[46%] hidden lg:block" />

                  {/* Bullet center Node point */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-[5%] -translate-y-1/2 w-6 h-6 rounded-full border-[3px] border-cyber-bg bg-cyber-bg z-10 hidden lg:flex items-center justify-center shadow-neon">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyber-cyan animate-pulse" />
                  </div>

                  {/* Event Card */}
                  <div className="timeline-event-card w-full lg:w-[46%]">
                    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-cyber-cyan/30 hover:shadow-neon transition-all duration-300 relative group overflow-hidden text-left">
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyber-cyan to-cyber-purple opacity-40" />

                      {/* Header details (Date tag & Type badge) */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-[10px] text-gray-400 font-medium">
                          {ev.date}
                        </span>
                        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${ev.color}`}>
                          {ev.type}
                        </span>
                      </div>

                      {/* Event Title */}
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-white/5 rounded-lg border border-white/10 text-cyber-cyan">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <h3 className="text-base sm:text-lg font-space font-bold uppercase tracking-wider text-white group-hover:text-cyber-cyan transition-colors">
                          {ev.title}
                        </h3>
                      </div>

                      {/* Event description */}
                      <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
                        {ev.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Events;
