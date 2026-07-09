import React, { useEffect, useRef } from 'react';
import { 
  Shield, 
  Search, 
  Terminal, 
  Cloud, 
  Network, 
  Brain, 
  Eye, 
  AlertTriangle, 
  Skull 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TiltCard = ({ children, className = '' }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x coordinate within client
    const y = e.clientY - rect.top;  // y coordinate within client

    const xc = rect.width / 2;
    const yc = rect.height / 2;

    const rotateX = -(y - yc) / 10; // Max tilt angle
    const rotateY = (x - xc) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-all duration-200 ease-out style-preserve-3d ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
};

const Domains = () => {
  const containerRef = useRef(null);

  const domains = [
    {
      title: 'Cyber Security',
      desc: 'Architecting robust protection algorithms, analyzing attack surfaces, and defending critical digital infrastructures against intrusion.',
      icon: Shield,
      color: 'from-cyan-500 to-blue-500',
      glow: 'shadow-cyan-500/20',
    },
    {
      title: 'Digital Forensics',
      desc: 'Extracting digital evidence, analyzing raw memory footprints, and performing logical investigations for civil and criminal forensic inquiries.',
      icon: Search,
      color: 'from-blue-500 to-purple-500',
      glow: 'shadow-blue-500/20',
    },
    {
      title: 'Ethical Hacking',
      desc: 'Conducting authorized security penetration testing, exploring server exploits, and patching firmware vulnerabilities before exploiters strike.',
      icon: Terminal,
      color: 'from-purple-500 to-pink-500',
      glow: 'shadow-purple-500/20',
    },
    {
      title: 'Cloud Security',
      desc: 'Securing cloud deployments, multi-tenant network architectures, virtualization containers, and orchestrating API access security controls.',
      icon: Cloud,
      color: 'from-emerald-500 to-cyan-500',
      glow: 'shadow-emerald-500/20',
    },
    {
      title: 'Network Security',
      desc: 'Configuring firewall rule hierarchies, IDS/IPS configurations, network telemetry analysis, and preventing DDoS vectors.',
      icon: Network,
      color: 'from-orange-500 to-red-500',
      glow: 'shadow-orange-500/20',
    },
    {
      title: 'AI Security',
      desc: 'Defending machine learning systems from adversarial data tampering, training model manipulation, and utilizing AI-driven anomaly detectors.',
      icon: Brain,
      color: 'from-pink-500 to-rose-500',
      glow: 'shadow-pink-500/20',
    },
    {
      title: 'Threat Intelligence',
      desc: 'Synthesizing global cybersecurity warning signatures, analyzing threat actor clusters, and deploying proactive defenses ahead of attack.',
      icon: Eye,
      color: 'from-indigo-500 to-purple-500',
      glow: 'shadow-indigo-500/20',
    },
    {
      title: 'Incident Response',
      desc: 'Deploying immediate technical containment actions post-compromise, identifying breach vectors, and restoring systems back to service.',
      icon: AlertTriangle,
      color: 'from-amber-500 to-orange-500',
      glow: 'shadow-amber-500/20',
    },
    {
      title: 'Malware Analysis',
      desc: 'Decompiling binary packages, observing dynamic executable hooks in secure sandboxes, and analyzing ransomware signatures.',
      icon: Skull,
      color: 'from-rose-500 to-red-500',
      glow: 'shadow-rose-500/20',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        '.domains-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.domains-header',
            start: 'top 85%',
          },
        }
      );

      // Grid items reveal
      gsap.fromTo(
        '.domain-grid-item',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.domain-grid',
            start: 'top 80%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="domains"
      ref={containerRef}
      className="relative py-24 border-t border-white/5 overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div className="absolute left-0 bottom-1/4 w-[400px] h-[400px] bg-cyber-cyan/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="domains-header text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-wider mb-4">
            Domains of <span className="text-cyber-cyan text-glow">Excellence</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-blue mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-gray-600 font-light text-sm sm:text-base leading-relaxed">
            We focus on advanced training, academic research, and operational consulting across core cybersecurity disciplines.
          </p>
        </div>

        {/* Domains Interactive Cards Grid */}
        <div className="domain-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((dom, idx) => {
            const IconComponent = dom.icon;
            const offsets = [
              'lg:translate-y-0',
              'lg:translate-y-4',
              'lg:-translate-y-2',
              'lg:translate-y-3',
              'lg:-translate-y-4',
              'lg:translate-y-2',
              'lg:-translate-y-1',
              'lg:translate-y-1',
              'lg:-translate-y-3'
            ];
            return (
              <div key={idx} className={`domain-grid-item ${offsets[idx] || ''}`}>
                <TiltCard className="h-full">
                  <div className="dino-panel-light dino-panel-light-hover p-8 rounded-none h-full relative overflow-hidden group">
                    
                    {/* Stepped corner accent top line */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent to-transparent group-hover:from-cyber-cyan group-hover:to-cyber-blue transition-all duration-500" />

                    {/* Domain Title + Minimalist icon */}
                    <h3 className="text-base sm:text-lg font-space font-bold uppercase tracking-wider text-gray-900 mb-3 group-hover:text-cyber-cyan transition-colors duration-300 flex items-center justify-between">
                      <span>□ {dom.title}</span>
                      <IconComponent className="w-4 h-4 text-gray-400 group-hover:text-cyber-cyan group-hover:rotate-12 transition-all shrink-0" />
                    </h3>

                    {/* Domain Description */}
                    <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed">
                      {dom.desc}
                    </p>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Domains;
