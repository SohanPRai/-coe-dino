import React, { useEffect, useRef } from 'react';
import { Award, Layers, Users, Hand, ShieldAlert } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StatCard = ({ val, suffix, label, desc, icon: IconComponent, idx }) => {
  const numRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const valNum = parseInt(val, 10);
    const counter = { value: 0 };

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        value: valNum,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
        },
        onUpdate: () => {
          if (numRef.current) {
            numRef.current.innerText = Math.floor(counter.value);
          }
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, [val]);

  return (
    <div
      ref={cardRef}
      className="dino-panel-light dino-panel-light-hover p-6 sm:p-8 rounded-none relative group overflow-hidden"
    >
      {/* Faded Background Index */}
      <div className="absolute right-6 top-2 text-8xl font-space font-extrabold select-none pointer-events-none opacity-[0.03] text-black">
        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
      </div>

      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-300 text-cyber-cyan">
        <IconComponent className="w-16 h-16" />
      </div>

      <div className="flex items-center space-x-2 mb-3">
        <span
          ref={numRef}
          className="text-4xl sm:text-5xl font-extrabold font-space text-gray-900"
        >
          0
        </span>
        <span className="text-3xl sm:text-4xl font-extrabold font-space text-cyber-cyan">
          {suffix}
        </span>
      </div>

      <h4 className="text-sm font-space font-bold uppercase tracking-wider text-gray-800 mb-1">
        {label}
      </h4>
      <p className="text-gray-600 text-xs font-light leading-relaxed">
        {desc}
      </p>
    </div>
  );
};

const WhyDFICS = () => {
  const containerRef = useRef(null);

  const stats = [
    {
      val: '2500',
      suffix: '+',
      label: 'Students Trained',
      desc: 'Nurtured with specialized credentials in ethical hacking and threat mitigation.',
      icon: Users,
    },
    {
      val: '80',
      suffix: '+',
      label: 'Research Projects',
      desc: 'Active exploration in firmware analysis, quantum cryptography, and deepfakes.',
      icon: Layers,
    },
    {
      val: '35',
      suffix: '+',
      label: 'Industry Workshops',
      desc: 'Immersive simulations of breach drills led by enterprise security specialists.',
      icon: Award,
    },
    {
      val: '15',
      suffix: '+',
      label: 'Collaborations',
      desc: 'Joint operations with defense groups, law firms, and corporate tech divisions.',
      icon: ShieldAlert,
    },
    {
      val: '100',
      suffix: '%',
      label: 'Hands-on Learning',
      desc: '100% immersive, sandbox-based training with zero theoretical-only modules.',
      icon: Hand,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        '.why-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.why-header',
            start: 'top 85%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="whydfics"
      ref={containerRef}
      className="relative py-24 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Section Introduction */}
          <div className="lg:col-span-4 why-header">
            <div className="inline-block px-3 py-1 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-full text-cyber-cyan text-xs font-mono font-medium tracking-wider mb-4 shadow-neon">
              WHY CHOOSE US
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-wider mb-6">
              Empowering the Next Gen of <span className="text-cyber-cyan text-glow">Cyber Defenders</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-blue mb-6" />
            <p className="text-gray-600 text-sm font-light leading-relaxed">
              At DFICS, we don't just teach security protocols; we build actual solutions. Scholars access sandboxed cyber ranges, analyze actual forensic drives, and simulate tactical attack operations to master digital investigations.
            </p>
          </div>

          {/* Right: Numbers Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={idx === stats.length - 1 ? 'sm:col-span-2' : ''}
              >
                <StatCard
                  val={stat.val}
                  suffix={stat.suffix}
                  label={stat.label}
                  desc={stat.desc}
                  icon={stat.icon}
                  idx={idx}
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyDFICS;
