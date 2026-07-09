import React, { useEffect, useRef } from 'react';
import { Target, Eye, Award, Calendar, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);

  const milestones = [
    {
      year: '2021',
      title: 'Inception & Vision',
      desc: 'DFICS was conceptualized at Sahyadri College to bridge the critical gap between academic knowledge and operational cyber warfare capabilities.',
    },
    {
      year: '2022',
      title: 'State-of-the-Art Labs',
      desc: 'Established dedicated hardware-software clusters for digital forensic investigations, memory analytics, and incident response simulations.',
    },
    {
      year: '2023',
      title: 'Industry & Gov Collaborations',
      desc: 'Formed strategic alliances with leading national security groups, defense startups, and corporate cybersecurity leaders to deliver real-world case analysis.',
    },
    {
      year: '2024',
      title: 'COE Recognition',
      desc: 'Formally recognized as a regional Centre of Excellence, taking on government-backed training initiatives for law enforcement agency personnel.',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        '.about-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.about-header',
            start: 'top 85%',
          },
        }
      );

      // Info Cards Animation
      gsap.fromTo(
        '.about-card',
        { opacity: 0, y: 30, scale: 0.96, boxShadow: '0px 0px 0 #2563EB' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          boxShadow: '6px 6px 0 #2563EB',
          duration: 0.7,
          stagger: 0.18,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.about-cards-container',
            start: 'top 80%',
          },
        }
      );

      // Timeline Items Reveal Animation
      const timelineItems = gsap.utils.toArray('.timeline-item');
      timelineItems.forEach((item) => {
        const line = item.querySelector('.timeline-indicator-line');
        const node = item.querySelector('.timeline-node');
        const content = item.querySelector('.timeline-content');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          },
        });

        tl.fromTo(node, { scale: 0, backgroundColor: 'rgba(37, 99, 235, 0)' }, { scale: 1, backgroundColor: 'rgba(37, 99, 235, 1)', duration: 0.4 })
          .fromTo(line, { scaleY: 0 }, { scaleY: 1, transformOrigin: 'top', duration: 0.5 }, '-=0.1')
          .fromTo(content, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.5 }, '-=0.3');
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-24 border-t border-white/5 overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-cyber-purple/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="about-header text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-wider mb-4 text-cyber-light">
            About the <span className="text-cyber-cyan text-glow">Centre of Excellence</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-purple mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-gray-600 font-light text-sm sm:text-base leading-relaxed">
            Sahyadri College's DFICS serves as a premium research hub dedicated to shaping the future of digital safety, forensic computation, and offensive-defensive cybersecurity intelligence.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column - Core Statements (Mission, Vision, Objectives) */}
          <div className="lg:col-span-6 space-y-6 about-cards-container">
            {/* Mission */}
            <div className="about-card dino-panel-light dino-panel-light-hover p-6 rounded-none relative overflow-hidden group">
              {/* Faded Background Index */}
              <div className="absolute right-6 top-2 text-8xl font-space font-extrabold select-none pointer-events-none opacity-[0.03] text-black">
                01
              </div>
              <div className="absolute top-0 left-0 w-[3px] h-full bg-cyber-cyan" />
              <div className="flex items-start space-x-4">
                <div>
                  <h3 className="text-lg font-space font-bold uppercase tracking-wider text-gray-900 mb-2 flex items-center gap-2">
                    <span>□</span> OUR MISSION <span className="text-xl">🦖</span>
                  </h3>
                  <p className="font-space font-bold text-cyber-cyan text-sm mb-3">
                    "We build future cyber defenders."
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed">
                    To pioneer cutting-edge cyber-forensics research and deploy industry-grade defense strategies, equipping scholars with high-performance operational intelligence.
                  </p>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="about-card dino-panel-light dino-panel-light-hover p-6 rounded-none relative overflow-hidden group translate-x-[4%] md:translate-x-[6%]">
              {/* Faded Background Index */}
              <div className="absolute right-6 top-2 text-8xl font-space font-extrabold select-none pointer-events-none opacity-[0.03] text-black">
                02
              </div>
              <div className="absolute top-0 left-0 w-[3px] h-full bg-cyber-cyan" />
              <div className="flex items-start space-x-4">
                <div>
                  <h3 className="text-lg font-space font-bold uppercase tracking-wider text-gray-900 mb-2 flex items-center gap-2">
                    <span>□</span> OUR VISION <span className="text-xl">☁</span>
                  </h3>
                  <p className="font-space font-bold text-cyber-cyan text-sm mb-3">
                    "Securing digital horizons through ethical innovations."
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed">
                    To build a globally recognized, resilient cyber research eco-system fostering ethical innovation, forensic mastery, and high-impact digital intelligence defense.
                  </p>
                </div>
              </div>
            </div>

            {/* Objectives */}
            <div className="about-card dino-panel-light dino-panel-light-hover p-6 rounded-none relative overflow-hidden group translate-x-[2%] md:translate-x-[3%]">
              {/* Faded Background Index */}
              <div className="absolute right-6 top-2 text-8xl font-space font-extrabold select-none pointer-events-none opacity-[0.03] text-black">
                03
              </div>
              <div className="absolute top-0 left-0 w-[3px] h-full bg-cyber-cyan" />
              <div className="flex items-start space-x-4">
                <div className="w-full">
                  <h3 className="text-lg font-space font-bold uppercase tracking-wider text-gray-900 mb-2 flex items-center gap-2">
                    <span>□</span> KEY OBJECTIVES <span className="text-xl">🌵</span>
                  </h3>
                  <p className="font-space font-bold text-cyber-cyan text-sm mb-3">
                    "Collaborating with elite institutions to solve real exploits."
                  </p>
                  <ul className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed space-y-2 mt-1">
                    <li className="flex items-center space-x-2">
                      <ChevronRight className="w-3.5 h-3.5 text-cyber-cyan" />
                      <span>Deliver hands-on offensive &amp; defensive training programs.</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <ChevronRight className="w-3.5 h-3.5 text-cyber-cyan" />
                      <span>Solve real-world forensic challenges for law enforcement.</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <ChevronRight className="w-3.5 h-3.5 text-cyber-cyan" />
                      <span>Collaborate with global industry partners for active workshops.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Milestone Timeline */}
          <div className="lg:col-span-6">
            <h3 className="text-xl font-space font-bold uppercase tracking-wider text-cyber-light mb-8 inline-flex items-center space-x-2.5">
              <Calendar className="w-5 h-5 text-cyber-cyan" />
              <span>Milestones &amp; Journey <span className="text-xl ml-1">🐦</span></span>
            </h3>

            {/* Timeline wrapper */}
            <div className="relative pl-12 space-y-8">
              {/* Timeline vertical axis (pixel cable) */}
              <div className="absolute left-[15px] top-2 bottom-2 w-[3px] bg-black" />

              {milestones.map((m, idx) => (
                <div key={idx} className="timeline-item relative flex flex-col sm:flex-row sm:items-center text-left">
                  {/* Horizontal connector line */}
                  <div className="absolute left-[-32px] top-[15px] w-8 h-[3px] bg-black hidden sm:block" />
                  
                  {/* Node point (pixel node) */}
                  <div className="absolute left-[-35px] top-[12px] w-[9px] h-[9px] bg-cyber-cyan border border-black z-10 hidden sm:block" />

                  {/* Year badge */}
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 px-3 py-1 font-space font-bold text-xs bg-white border-2 border-black shadow-[2px_2px_0_#2563EB] text-gray-900 rounded-none">
                      {m.year}
                    </div>
                    <h4 className="font-space font-bold text-gray-900 text-base">{m.title}</h4>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm font-light mt-2 sm:mt-0 sm:ml-6 leading-relaxed max-w-lg">
                    {m.desc}
                  </p>
                </div>
              ))}

              {/* LEVEL CLEARED Checkpoint at the bottom of the timeline */}
              <div className="timeline-item relative flex items-center pt-4">
                <div className="absolute left-[-32px] top-[40px] w-8 h-[3px] bg-black hidden sm:block" />
                <div className="absolute left-[-35px] top-[37px] w-[9px] h-[9px] bg-cyber-cyan border border-black z-10 hidden sm:block" />
                
                <div className="dino-panel-light p-5 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center space-x-3 text-left">
                    <span className="text-2xl">🏁</span>
                    <div>
                      <h4 className="font-space font-extrabold text-sm uppercase text-gray-900 leading-none">LEVEL 01 CLEARED</h4>
                      <span className="text-[10px] text-gray-500 font-mono tracking-wider uppercase mt-1 inline-block">NEXT CHAPTER: DOMAINS & RESEARCH</span>
                    </div>
                  </div>
                  <a
                    href="#domains"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector('#domains')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="interactive px-4 py-2 font-space text-xs font-bold dino-btn-primary dino-btn-primary-hover flex items-center justify-center space-x-1.5 w-fit"
                  >
                    <span>CONTINUE</span>
                    <span>→</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;
