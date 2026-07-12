import React, { useEffect, useRef } from 'react';
import { Target, Eye, Award, Calendar, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);

  const milestones = [
    {
      year: '01',
      title: 'Educational Support',
      desc: 'To create a collaborative working environment between university, government agencies, and commercial establishments to share information on potential threats, and counter-measures through ongoing research projects.',
    },
    {
      year: '02',
      title: 'Govt. Support',
      desc: 'To support law enforcement agencies in technical matters and help them in the development of cyber laws, whenever required in their investigations. Also, support them in capacity building.',
    },
    {
      year: '03',
      title: 'Research',
      desc: 'To promote research in the upcoming areas of Digital Forensics and Cybersecurity to provide solutions to cybercrime and cybersecurity-related issues and to publish scientific books, magazines, and compilations.',
    },
    {
      year: '04',
      title: 'Training',
      desc: 'To conduct training and skill development that can aid in understanding the nature of cybercrime. Conducting seminars, national and international conferences to create awareness among the stakeholders.',
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
          <p className="max-w-2xl mx-auto text-gray-800 font-bold text-xl sm:text-base leading-relaxed ">
            Established in 2018, the Centre of Excellence in Digital Forensics and Cyber Security aims to address the growing threat of cybercrime. Our state-of-the-art lab is dedicated to providing a platform for students, researchers, and professionals to collaborate and innovate in the field of cyber security.
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
                    "Driving cybersecurity excellence through research, training, and innovation."
                  </p>
                  <ul className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed space-y-2">
                    <li className="flex items-start space-x-2">
                      <ChevronRight className="w-3.5 h-3.5 text-cyber-cyan mt-1 flex-shrink-0" />
                      <span>Identify and address the critical challenges in cybersecurity.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <ChevronRight className="w-3.5 h-3.5 text-cyber-cyan mt-1 flex-shrink-0" />
                      <span>Develop quality forensics and cyber solutions to provide training and service to stakeholders.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <ChevronRight className="w-3.5 h-3.5 text-cyber-cyan mt-1 flex-shrink-0" />
                      <span>Transform research results in sustainable technologies and product development.</span>
                    </li>
                  </ul>
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
                    To deliver cyber security solutions and services to Secure Digital Process and Enterprise.
                  </p>
                </div>
              </div>
            </div>

            {/* Facilities */}
            <div className="about-card dino-panel-light dino-panel-light-hover p-6 rounded-none relative overflow-hidden group translate-x-[2%] md:translate-x-[3%]">
              {/* Faded Background Index */}
              <div className="absolute right-6 top-2 text-8xl font-space font-extrabold select-none pointer-events-none opacity-[0.03] text-black">
                03
              </div>
              <div className="absolute top-0 left-0 w-[3px] h-full bg-cyber-cyan" />
              <div className="flex items-start space-x-4">
                <div className="w-full">
                  <h3 className="text-lg font-space font-bold uppercase tracking-wider text-gray-900 mb-2 flex items-center gap-2">
                    <span>□</span> FACILITIES <span className="text-xl">🛠️</span>
                  </h3>
                  <p className="font-space font-bold text-cyber-cyan text-sm mb-3">
                    "State-of-the-art infrastructure for hands-on cybersecurity research."
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-gray-600 text-xs sm:text-sm font-light leading-relaxed">
                    <li className="flex items-start space-x-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-cyber-cyan mt-1 flex-shrink-0" />
                      <span>Unified Threat Management System</span>
                    </li>
                    <li className="flex items-start space-x-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-cyber-cyan mt-1 flex-shrink-0" />
                      <span>Computer Unified Programming Unit</span>
                    </li>
                    <li className="flex items-start space-x-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-cyber-cyan mt-1 flex-shrink-0" />
                      <span>ESP IOT Development Kit</span>
                    </li>
                    <li className="flex items-start space-x-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-cyber-cyan mt-1 flex-shrink-0" />
                      <span>Alpha AWUS036ACH</span>
                    </li>
                    <li className="flex items-start space-x-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-cyber-cyan mt-1 flex-shrink-0" />
                      <span>AtMegha Development Kit &amp; Sensors</span>
                    </li>
                    <li className="flex items-start space-x-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-cyber-cyan mt-1 flex-shrink-0" />
                      <span>PLC</span>
                    </li>
                    <li className="flex items-start space-x-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-cyber-cyan mt-1 flex-shrink-0" />
                      <span>Data Logger</span>
                    </li>
                    <li className="flex items-start space-x-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-cyber-cyan mt-1 flex-shrink-0" />
                      <span>HMI for Industrial Data Security</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Key Objectives & Support */}
          <div className="lg:col-span-6">
            <h3 className="text-xl font-space font-bold uppercase tracking-wider text-cyber-light mb-8 inline-flex items-center space-x-2.5">
              <Target className="w-5 h-5 text-cyber-cyan" />
              <span>Key Objectives &amp; Support <span className="text-xl ml-1">🎯</span></span>
            </h3>

            {/* Timeline wrapper */}
            <div className="relative pl-12 space-y-8">
              {/* Timeline vertical axis (pixel cable) */}
              <div className="absolute left-[15px] top-2 bottom-2 w-[3px] bg-black" />

              {milestones.map((m, idx) => (
                <div key={idx} className="timeline-item relative flex flex-col text-left group">
                  {/* Horizontal connector line */}
                  <div className="timeline-indicator-line absolute left-[-32px] top-[24px] w-8 h-[3px] bg-black hidden sm:block" />

                  {/* Node point (pixel node) */}
                  <div className="timeline-node absolute left-[-35px] top-[21px] w-[9px] h-[9px] bg-cyber-cyan border border-black z-10 hidden sm:block" />

                  <div className="timeline-content w-full">
                    <div className="dino-panel-light dino-panel-light-hover p-5 rounded-none relative overflow-hidden">
                      {/* Faded Background Index */}
                      <div className="absolute right-6 top-2 text-7xl font-space font-extrabold select-none pointer-events-none opacity-[0.03] text-black">
                        {m.year}
                      </div>

                      {/* Badge & Title */}
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex-shrink-0 px-3 py-1 font-space font-bold text-xs bg-white border-2 border-black shadow-[2px_2px_0_#2563EB] text-gray-900 rounded-none animate-pulse-slow">
                          {m.year}
                        </div>
                        <h4 className="font-space font-bold text-gray-900 text-base">{m.title}</h4>
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed">
                        {m.desc}
                      </p>
                    </div>
                  </div>
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
