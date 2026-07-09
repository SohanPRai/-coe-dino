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
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
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

        tl.fromTo(node, { scale: 0, backgroundColor: 'rgba(0, 229, 255, 0)' }, { scale: 1, backgroundColor: 'rgba(0, 229, 255, 1)', duration: 0.4 })
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
            <div className="about-card glass-panel glass-panel-hover p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-cyber-cyan" />
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-cyber-cyan/10 rounded-xl border border-cyber-cyan/30 text-cyber-cyan group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-space font-bold uppercase tracking-wider text-cyber-light mb-2">Our Mission</h3>
                  <p className="text-gray-600 text-sm font-light leading-relaxed">
                    To pioneer cutting-edge cyber-forensics research and deploy industry-grade defense strategies, equipping scholars with high-performance operational intelligence.
                  </p>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="about-card glass-panel glass-panel-hover p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-cyber-purple" />
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-cyber-purple/10 rounded-xl border border-cyber-purple/30 text-cyber-purple group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-space font-bold uppercase tracking-wider text-cyber-light mb-2">Our Vision</h3>
                  <p className="text-gray-600 text-sm font-light leading-relaxed">
                    To build a globally recognized, resilient cyber research eco-system fostering ethical innovation, forensic mastery, and high-impact digital intelligence defense.
                  </p>
                </div>
              </div>
            </div>

            {/* Objectives */}
            <div className="about-card glass-panel glass-panel-hover p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-cyber-cyan" />
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-cyber-cyan/10 rounded-xl border border-cyber-cyan/30 text-cyber-cyan group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-space font-bold uppercase tracking-wider text-cyber-light mb-2">Key Objectives</h3>
                  <ul className="text-gray-600 text-sm font-light leading-relaxed space-y-2 mt-1">
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
              <span>Milestones &amp; Journey</span>
            </h3>

            {/* Timeline wrapper */}
            <div className="relative pl-8 space-y-8">
              {/* Timeline center line */}
              <div className="absolute left-[11px] top-2 bottom-2 w-[2px] timeline-line" />

              {milestones.map((m, idx) => (
                <div key={idx} className="timeline-item relative flex items-start">
                  {/* Glowing Node Point */}
                  <div className="timeline-node absolute left-[-26px] top-1.5 w-[14px] h-[14px] rounded-full border-2 border-cyber-bg shadow-neon z-10 transition-colors" />
                  
                  {/* Hidden element to trigger line length expansion */}
                  <div className="timeline-indicator-line absolute left-[-21px] top-[14px] h-full w-[2px] scale-y-0" />

                  {/* Content Container */}
                  <div className="timeline-content ml-4 glass-panel p-5 rounded-2xl w-full border border-white/5 hover:border-cyber-cyan/20 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-space font-bold text-cyber-light text-base">{m.title}</h4>
                      <span className="font-mono text-xs font-bold text-cyber-cyan bg-cyber-cyan/10 px-2 py-0.5 rounded border border-cyber-cyan/20">
                        {m.year}
                      </span>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;
