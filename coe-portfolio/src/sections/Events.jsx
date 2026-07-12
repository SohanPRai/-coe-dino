import React, { useEffect, useRef } from 'react';
import { Trophy, Presentation, Video } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Events = () => {
  const containerRef = useRef(null);

  const events = [
    {
      title: 'Three-Day Hackathon on Ethical Hacking',
      date: 'June 13 - 15, 2022',
      type: 'Hackathon',
      desc: 'A three-day physical hackathon organized by CoE Digital Forensics Intelligence, Sahyadri College of Engineering and Management, supported by AICTE SPICE. Mentored by Cybersapiens United LLP Mangaluru, the event saw active participation from engineering students with nearly 40 students benefiting.',
      icon: Trophy,
      color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
    },
    {
      title: 'Two-Day Online Workshop on Cyber Security',
      date: 'October 30 - 31, 2021',
      type: 'Workshop',
      desc: 'A two-day online workshop with a vision of capacity building in the cybersecurity domain, organized by the Centre of Excellence Digital Forensics Intelligence and Cyber Security.',
      icon: Video,
      color: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
    },
    {
      title: 'One-Day SDP: Exploring Cyber Security Frontiers',
      date: 'June 18, 2022',
      type: 'Student Development Programme',
      desc: 'A student development programme organized by the Department of CSE in collaboration with CoE. Featured Mr. Sudharshan P from Incognito Forensics Foundation (IFFLAB) as the resource person, introducing 60 fifth-semester cybersecurity students to emerging security concepts.',
      icon: Presentation,
      color: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
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
          <div className="inline-block px-3 py-1 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-full text-cyber-cyan text-xs font-mono font-medium tracking-wider mb-4 shadow-neon">
            COMMUNITY &amp; DEVELOPMENT
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-wider mb-4">
            Security <span className="text-cyber-cyan text-glow">Events &amp; Chronology</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-blue mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-gray-600 font-light text-sm sm:text-base leading-relaxed">
            Participate in interactive cybersecurity sprints, incident drills, reverse engineering forums, and professional webinars.
          </p>
        </div>

        {/* Timeline wrapper */}
        <div className="relative mt-12">
          {/* Vertical axis line on desktop */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-cyber-cyan via-black to-cyber-cyan/10 hidden lg:block" />

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
                    <div className="dino-panel-light dino-panel-light-hover p-6 sm:p-8 rounded-none relative group overflow-hidden text-left">
                      
                      {/* Faded Background Index */}
                      <div className="absolute right-6 top-2 text-8xl font-space font-extrabold select-none pointer-events-none opacity-[0.03] text-black">
                        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </div>

                      {/* Header details (Date tag & Type badge) */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-space font-bold text-xs bg-white border-2 border-black shadow-[2px_2px_0_#2563EB] text-gray-900 px-2.5 py-0.5 rounded-none uppercase">
                          {ev.date}
                        </span>
                        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${ev.color}`}>
                          {ev.type}
                        </span>
                      </div>

                      {/* Event Title */}
                      <div className="flex items-center justify-between mb-3 w-full">
                        <h3 className="text-base sm:text-lg font-space font-bold uppercase tracking-wider text-gray-900 group-hover:text-cyber-cyan transition-colors flex items-center justify-between w-full">
                          <span>□ {ev.title}</span>
                          <IconComponent className="w-4 h-4 text-gray-400 group-hover:text-cyber-cyan group-hover:rotate-12 transition-all shrink-0 ml-2" />
                        </h3>
                      </div>

                      {/* Event description */}
                      <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed">
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
