import React, { useEffect, useRef } from 'react';
import { Shield, Radio, Key, Users, Cpu, FileWarning } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const containerRef = useRef(null);

  const galleryItems = [
    {
      title: 'Active Cyber Drill Simulation',
      tag: 'Defensive Range',
      height: 'h-72',
      icon: Shield,
      color: 'from-cyan-500/10 to-blue-500/20',
      terminal: ['root@aegis:~# iptables -A INPUT -j DROP', 'Warning: DDoS attack source contained.'],
    },
    {
      title: 'Reverse Engineering Lab Forum',
      tag: 'Hardware Forensics',
      height: 'h-96',
      icon: Key,
      color: 'from-purple-500/10 to-pink-500/20',
      terminal: ['root@jtag:~# binwalk -e firmware.bin', 'Extracting squashfs filesystem...', 'File system: OK'],
    },
    {
      title: 'Incident Telemetry Room',
      tag: 'Security Operations',
      height: 'h-80',
      icon: Radio,
      color: 'from-blue-500/10 to-cyan-500/20',
      terminal: ['root@soc:~# snort -v -c rules.conf', 'Telemetry stream operational', 'Alerts: 0 active'],
    },
    {
      title: 'National Security Hackathons',
      tag: 'Offensive CTF',
      height: 'h-96',
      icon: Users,
      color: 'from-emerald-500/10 to-teal-500/20',
      terminal: ['root@ctf:~# ./exploit --host 10.0.8.2', 'Buffer overflow sent...', 'Flag captured!'],
    },
    {
      title: 'IoT Auditor Clustered Gateway',
      tag: 'Firmware Audits',
      height: 'h-72',
      icon: Cpu,
      color: 'from-orange-500/10 to-red-500/20',
      terminal: ['root@iot:~# nmap -sV -p 80,443 10.0.1.1', 'Open ports: 80 (HTTP)', 'Vulnerability: Shellshock'],
    },
    {
      title: 'Malware Isolation Sandboxing',
      tag: 'Binary Sandbox',
      height: 'h-80',
      icon: FileWarning,
      color: 'from-rose-500/10 to-red-500/20',
      terminal: ['root@cuckoo:~# start_vm --sandbox win10', 'Executing ransomware payload...', 'Analyzing keys...'],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        '.gallery-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.gallery-header',
            start: 'top 85%',
          },
        }
      );

      // Masonry items mask reveal
      const items = gsap.utils.toArray('.gallery-grid-item');
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { 
            opacity: 0, 
            clipPath: 'inset(100% 0 0 0)' 
          },
          {
            opacity: 1,
            clipPath: 'inset(0% 0 0 0)',
            duration: 1,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative py-24 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="gallery-header text-center mb-16">
          <div className="inline-block px-3 py-1 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-full text-cyber-cyan text-xs font-mono font-medium tracking-wider mb-4 shadow-neon">
            OPERATIONAL LOGS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-wider mb-4">
            Centre Action <span className="text-cyber-cyan text-glow">Gallery</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-purple mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-gray-400 font-light text-sm sm:text-base leading-relaxed">
            A futuristic record of training workshops, active penetration tests, forensic captures, and incident simulations.
          </p>
        </div>

        {/* Pinterest Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryItems.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="gallery-grid-item break-inside-avoid glass-panel rounded-2xl border border-white/5 hover:border-cyber-cyan/30 hover:shadow-neon transition-all duration-300 relative overflow-hidden group"
              >
                {/* Holographic background with custom heights */}
                <div className={`w-full ${item.height} bg-gradient-to-br ${item.color} p-6 flex flex-col justify-between transition-all duration-300 relative`}>
                  
                  {/* Glowing mask grid */}
                  <div className="absolute inset-0 cyber-grid opacity-10" />

                  {/* Header info */}
                  <div className="flex items-center justify-between z-10">
                    <span className="font-mono text-[9px] font-bold text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/20 px-2 py-0.5 rounded">
                      {item.tag}
                    </span>
                    <IconComponent className="w-4.5 h-4.5 text-gray-400 group-hover:text-cyber-cyan transition-colors" />
                  </div>

                  {/* Code console inside card */}
                  <div className="bg-cyber-bg/85 border border-white/5 rounded-lg p-3.5 font-mono text-[8px] sm:text-[9px] text-gray-400 z-10 w-full select-none overflow-hidden group-hover:border-cyber-cyan/20 transition-colors">
                    {item.terminal.map((line, lIdx) => (
                      <div key={lIdx} className="truncate">
                        {line.startsWith('root@') ? (
                          <span>
                            <span className="text-cyber-purple">root@dfics</span>
                            <span className="text-gray-300">:~#</span>{' '}
                            {line.split(':~#')[1]}
                          </span>
                        ) : (
                          <span className="text-cyber-cyan">{line}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Footer details */}
                  <div className="z-10 text-left">
                    <h3 className="text-sm font-space font-bold uppercase tracking-wider text-white group-hover:text-cyber-cyan transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>

                  {/* Zoom overlay highlight effect */}
                  <div className="absolute inset-0 bg-cyber-bg/20 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Gallery;
