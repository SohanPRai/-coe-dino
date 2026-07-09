import React, { useEffect, useRef } from 'react';
import { Terminal, ShieldCheck, Database, CloudLightning, Activity, Cpu } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Labs = () => {
  const containerRef = useRef(null);

  const labs = [
    {
      name: 'Cyber Security Lab',
      desc: 'Conducting offensive penetration test simulations and defensive firewall configurations. Houses hardware security modules.',
      status: 'ONLINE',
      system: 'Aegis Sentinel v4.2',
      traffic: '12.4 Gbps',
      color: 'text-cyan-400 border-cyan-400/20 bg-cyan-400/5',
      glowColor: 'rgba(6, 182, 212, 0.4)',
      icon: ShieldCheck,
      details: ['Red/Blue Team Ranges', 'Firewall Arrays', 'SDR Hardware Modules'],
    },
    {
      name: 'Digital Forensics Lab',
      desc: 'Dedicated to memory dump acquisition, raw drive imaging, forensic file restoration, and mobile device logical extractions.',
      status: 'ACTIVE',
      system: 'Volatility Node 8',
      traffic: '4.8 Gbps',
      color: 'text-blue-400 border-blue-400/20 bg-blue-400/5',
      glowColor: 'rgba(59, 130, 246, 0.4)',
      icon: Database,
      details: ['Write Blockers', 'Memory Analytics Servers', 'Mobile Extraction Tools'],
    },
    {
      name: 'Network Simulation Lab',
      desc: 'Simulating large enterprise architectures to test high-traffic load failures, packet routing vulnerabilities, and DDoS mitigation.',
      status: 'ONLINE',
      system: 'NetSim Grid v9',
      traffic: '84.0 Gbps',
      color: 'text-purple-400 border-purple-400/20 bg-purple-400/5',
      glowColor: 'rgba(168, 85, 247, 0.4)',
      icon: Activity,
      details: ['Core Switch Simulators', 'High-volume Traffic Injectors', 'IDS Telemetry Analyzers'],
    },
    {
      name: 'Cloud Security Lab',
      desc: 'Investigating vulnerabilities in AWS, Azure, and Kubernetes containers. Researching secure multi-tenant cloud controls.',
      status: 'SECURE',
      system: 'KubeGuard Daemon',
      traffic: '18.1 Gbps',
      color: 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5',
      glowColor: 'rgba(52, 211, 153, 0.4)',
      icon: CloudLightning,
      details: ['Vulnerability Containers', 'API Gateway Firewalls', 'IAM Cluster Auditing'],
    },
    {
      name: 'Malware Analysis Lab',
      desc: 'Deconstructing ransomware binaries, writing behavioral signatures, and tracking command &amp; control channel vectors.',
      status: 'CONTAINED',
      system: 'Cuckoo Sandbox x64',
      traffic: '0.0 Gbps (Air-Gapped)',
      color: 'text-rose-400 border-rose-400/20 bg-rose-400/5',
      glowColor: 'rgba(244, 63, 94, 0.4)',
      icon: Terminal,
      details: ['Air-Gapped Environments', 'IDA Pro Decompiler Clusters', 'Dynamic Behavior Logging'],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        '.labs-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.labs-header',
            start: 'top 85%',
          },
        }
      );

      // Labs cards reveal
      gsap.fromTo(
        '.lab-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.labs-grid',
            start: 'top 80%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="labs"
      ref={containerRef}
      className="relative py-24 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="labs-header text-center mb-16">
          <div className="inline-block px-3 py-1 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-full text-cyber-cyan text-xs font-mono font-medium tracking-wider mb-4 shadow-neon">
            RESEARCH INFRASTRUCTURE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-wider mb-4">
            Security &amp; Forensic <span className="text-cyber-cyan text-glow">Laboratories</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-blue mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-gray-400 font-light text-sm sm:text-base leading-relaxed">
            Equipped with enterprise security appliances and analytical clusters to solve complex offensive and defensive cyber challenges.
          </p>
        </div>

        {/* Labs Cards Grid */}
        <div className="labs-grid flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
          {labs.map((lab, idx) => {
            const IconComponent = lab.icon;
            const offsets = [
              'lg:translate-y-0',
              'lg:translate-y-4',
              'lg:-translate-y-2',
              'lg:translate-y-3',
              'lg:-translate-y-4'
            ];
            return (
              <div
                key={idx}
                className={`lab-card dino-panel-light dino-panel-light-hover rounded-none relative overflow-hidden group flex flex-col justify-between w-full md:w-[calc(50%-16px)] lg:w-[calc(33.33%-22px)] max-w-md ${offsets[idx] || ''}`}
              >
                {/* Faded Background Index */}
                <div className="absolute right-6 top-2 text-8xl font-space font-extrabold select-none pointer-events-none opacity-[0.03] text-black">
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </div>

                {/* Visual Glow overlay */}
                <div
                  className="absolute -top-12 -right-12 w-32 h-32 blur-[40px] rounded-full pointer-events-none transition-all duration-300 opacity-10 group-hover:opacity-20"
                  style={{ backgroundColor: lab.glowColor }}
                />

                {/* Card Main Body */}
                <div className="p-6 sm:p-8">
                  {/* Top Bar (Status indicators + Console title) */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-cyan"></span>
                      </span>
                      <span className="text-[10px] font-mono text-gray-500 font-medium">SYS_STATUS:</span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${lab.color}`}>
                        {lab.status}
                      </span>
                    </div>
                  </div>

                  {/* Lab Title */}
                  <h3 className="text-base sm:text-lg font-space font-bold uppercase tracking-wider text-gray-900 mb-3 group-hover:text-cyber-cyan transition-colors flex items-center justify-between">
                    <span>□ {lab.name}</span>
                    <IconComponent className="w-4 h-4 text-gray-400 group-hover:text-cyber-cyan group-hover:rotate-12 transition-all shrink-0" />
                  </h3>
                  
                  {/* Lab Description */}
                  <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    {lab.desc}
                  </p>

                  {/* Simulated Terminal UI Dashboard */}
                  <div className="bg-cyber-darker border border-gray-200 rounded-xl p-4 font-mono text-[10px] sm:text-xs mb-6 text-gray-700 relative overflow-hidden group-hover:border-cyber-cyan/20 transition-colors">
                    <div className="flex items-center justify-between text-gray-500 border-b border-gray-200 pb-2 mb-2">
                      <span>CONSOLE LOGS</span>
                      <Cpu className="w-3 h-3 text-cyber-cyan" />
                    </div>
                    <div className="space-y-1 text-left">
                      <div><span className="text-cyber-cyan">&gt; </span>Core Kernel: {lab.system}</div>
                      <div><span className="text-cyber-cyan">&gt; </span>Active Traffic: {lab.traffic}</div>
                      <div><span className="text-cyber-cyan">&gt; </span>Port Status: Listening (SSL)</div>
                    </div>
                  </div>

                  {/* Spec Bullet Details */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-mono text-gray-500 font-bold uppercase tracking-wider">Lab Inventory:</h4>
                    <div className="flex flex-wrap gap-2">
                      {lab.details.map((detail, dIdx) => (
                        <span
                          key={dIdx}
                          className="text-[9px] font-mono bg-cyber-navy border border-gray-200 px-2 py-1 rounded text-gray-700"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Labs;
