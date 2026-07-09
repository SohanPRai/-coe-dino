import React, { useEffect, useRef } from 'react';
import { Linkedin, Github, Twitter, Mail, ShieldAlert } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Team = () => {
  const containerRef = useRef(null);

  const members = [
    {
      name: 'Dr. Ananth Kumar',
      role: 'HoD & Director, CoE',
      desc: '20+ years in cryptography and firmware authentication. Advises regional cybersecurity protocols.',
      social: { linkedin: '#', twitter: '#', mail: 'mailto:hod.cs@sahyadri.edu.in' },
      seed: 'operator-1',
    },
    {
      name: 'Prof. Ramesh Rao',
      role: 'Head of Digital Forensics',
      desc: 'Ex-consultant for law enforcement agency networks. Expert in raw memory data reconstruction.',
      social: { linkedin: '#', github: '#', mail: 'mailto:ramesh.cs@sahyadri.edu.in' },
      seed: 'operator-2',
    },
    {
      name: 'Dr. Sandeep Hegde',
      role: 'IoT Lab Coordinator',
      desc: 'Investigating vulnerabilities in edge routers, wireless systems, and controller boards.',
      social: { linkedin: '#', github: '#', mail: 'mailto:sandeep.cs@sahyadri.edu.in' },
      seed: 'operator-3',
    },
    {
      name: 'Sweekar Shetty',
      role: 'Student CoE Coordinator',
      desc: 'Offensive security enthusiast, CTF challenge developer, and active full-stack web architect.',
      social: { linkedin: '#', github: '#', twitter: '#' },
      seed: 'operator-4',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        '.team-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.team-header',
            start: 'top 85%',
          },
        }
      );

      // Profile cards stagger
      gsap.fromTo(
        '.team-member-card',
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.team-grid',
            start: 'top 80%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Custom vector avatar layout
  const renderAvatar = (seed) => {
    return (
      <div className="relative w-32 h-32 mx-auto rounded-full border border-cyber-cyan/30 flex items-center justify-center p-2 group-hover:border-cyber-cyan group-hover:shadow-neon transition-all duration-300 overflow-hidden bg-cyber-darker">
        {/* Glowing orbital grid */}
        <div className="absolute inset-1.5 border border-dashed border-cyber-cyan/20 rounded-full animate-spin [animation-duration:16s] group-hover:border-cyber-cyan/50" />
        
        {/* Core cyber agent logo */}
        <ShieldAlert className="w-12 h-12 text-cyber-cyan/50 group-hover:text-cyber-cyan group-hover:scale-110 transition-all duration-300" />

        {/* Matrix code lines floating in bg */}
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 flex flex-col justify-around font-mono text-[7px] text-cyber-cyan select-none pointer-events-none transition-opacity">
          <div>01101011</div>
          <div>10010010</div>
          <div>00111101</div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="team"
      ref={containerRef}
      className="relative py-24 border-t border-white/5 overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute left-1/4 top-1/3 w-[300px] h-[300px] bg-cyber-cyan/5 blur-[90px] rounded-full pointer-events-none -z-10 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="team-header text-center mb-16">
          <div className="inline-block px-3 py-1 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-full text-cyber-cyan text-xs font-mono font-medium tracking-wider mb-4 shadow-neon">
            COE LEADERSHIP
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-wider mb-4">
            Meet the <span className="text-cyber-cyan text-glow">Cyber Security Team</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-blue mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-gray-600 font-light text-sm sm:text-base leading-relaxed">
            Led by experienced faculty supervisors and offensive security students, driving advanced forensic investigations.
          </p>
        </div>

        {/* Team Grid */}
        <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, idx) => {
            const offsets = [
              'lg:translate-y-0',
              'lg:translate-y-4',
              'lg:-translate-y-2',
              'lg:translate-y-2'
            ];
            return (
              <div
                key={idx}
                className={`team-member-card dino-panel-light dino-panel-light-hover p-8 rounded-none text-center relative group ${offsets[idx] || ''}`}
              >
                {/* Faded Background Index */}
                <div className="absolute right-6 top-2 text-8xl font-space font-extrabold select-none pointer-events-none opacity-[0.03] text-black">
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </div>

                {/* Circular Avatar */}
                <div className="mb-6 relative">
                  {renderAvatar(member.seed)}
                </div>

                {/* Name & Role */}
                <h3 className="text-lg font-space font-bold uppercase tracking-wider text-gray-900 mb-1 group-hover:text-cyber-cyan transition-colors">
                  □ {member.name}
                </h3>
                <p className="text-xs font-mono font-bold text-cyber-cyan tracking-widest uppercase mb-4">
                  {member.role}
                </p>

              {/* Profile Description */}
              <p className="text-gray-600 text-xs font-light leading-relaxed mb-6">
                {member.desc}
              </p>

              {/* Hover-reveal Social Icons */}
              <div className="flex items-center justify-center space-x-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    className="interactive p-2 rounded-lg bg-cyber-navy hover:bg-cyber-cyan/15 hover:text-cyber-cyan border border-gray-200 hover:border-cyber-cyan/30 text-gray-700 transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {member.social.github && (
                  <a
                    href={member.social.github}
                    className="interactive p-2 rounded-lg bg-cyber-navy hover:bg-cyber-cyan/15 hover:text-cyber-cyan border border-gray-200 hover:border-cyber-cyan/30 text-gray-700 transition-all"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {member.social.twitter && (
                  <a
                    href={member.social.twitter}
                    className="interactive p-2 rounded-lg bg-cyber-navy hover:bg-cyber-cyan/15 hover:text-cyber-cyan border border-gray-200 hover:border-cyber-cyan/30 text-gray-700 transition-all"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {member.social.mail && (
                  <a
                    href={member.social.mail}
                    className="interactive p-2 rounded-lg bg-cyber-navy hover:bg-cyber-cyan/15 hover:text-cyber-cyan border border-gray-200 hover:border-cyber-cyan/30 text-gray-700 transition-all"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>

            </div>
          );})}
        </div>

      </div>
    </section>
  );
};

export default Team;
