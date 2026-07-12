import React from 'react';
import { ShieldAlert, Github, Linkedin, Youtube, Instagram, ArrowUp } from 'lucide-react';
import MagneticButton from './MagneticButton';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About CoE', href: '#about' },
    { name: 'Domains', href: '#domains' },
    { name: 'Research Area', href: '#research' },
    { name: 'Books', href: '#books' },
  ];

  const exploreLinks = [
    { name: 'Deployments', href: '#projects' },
    { name: 'Chronology', href: '#events' },
    { name: 'Operator Team', href: '#team' },
    { name: 'Action Logs', href: '#gallery' },
    { name: 'Incident Report', href: '#contact' },
  ];

  return (
    <footer className="relative bg-cyber-navy border-t border-cyber-cyan/15 pt-16 pb-12 overflow-hidden text-left">
      {/* Dynamic glowing separation line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyber-cyan to-transparent shadow-neon" />

      {/* Cyber Grid opacity overlay */}
      <div className="absolute inset-0 cyber-grid opacity-[0.02] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-cyber-cyan/10">

          {/* Column 1: Identity & Motto */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/35 text-cyber-cyan">
                <ShieldAlert className="w-5.5 h-5.5" />
              </div>
              <div className="flex flex-col">
                <span className="font-space font-bold text-cyber-light text-base leading-none tracking-wider">
                  DFICS CoE
                </span>
                <span className="text-[8px] font-mono tracking-widest text-gray-400 mt-1">
                  SECURE. DETECT. DEFEND.
                </span>
              </div>
            </div>

            <p className="text-gray-500 text-xs sm:text-sm font-light leading-relaxed">
              Centre of Excellence for Digital Forensics, Information Security &amp; Cyber Security at Sahyadri College of Engineering &amp; Management. Enabling high-resilience digital safety.
            </p>

            {/* Social credentials */}
            <div className="flex items-center space-x-3.5">
              <a
                href="https://github.com/COE-DFI-CS-SCEM/"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyber-cyan/40 hover:text-cyber-cyan hover:bg-cyber-cyan/10 transition-all duration-300"
              >
                <Github className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://www.linkedin.com/company/coe-digital-forensics-intelligence-and-cyber-security-sahyadri/"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyber-cyan/40 hover:text-cyber-cyan hover:bg-cyber-cyan/10 transition-all duration-300"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://www.instagram.com/coecybersecurity_sahyadri/"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyber-cyan/40 hover:text-cyber-cyan hover:bg-cyber-cyan/10 transition-all duration-300"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://www.youtube.com/@coedigitalforensicintellig7751"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyber-cyan/40 hover:text-cyber-cyan hover:bg-cyber-cyan/10 transition-all duration-300"
              >
                <Youtube className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="font-space font-bold uppercase tracking-wider text-cyber-light text-sm mb-5">
              Index Terminals
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="interactive text-gray-500 hover:text-cyber-cyan transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Explore Links */}
          <div className="lg:col-span-3">
            <h3 className="font-space font-bold uppercase tracking-wider text-cyber-light text-sm mb-5">
              Operations
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="interactive text-gray-500 hover:text-cyber-cyan transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Up scroll CTA */}
          <div className="lg:col-span-2 flex flex-col justify-end lg:items-end">
            <MagneticButton>
              <button
                onClick={handleScrollTop}
                className="interactive p-4 bg-black/5 border border-black/10 rounded-2xl hover:border-cyber-cyan/40 hover:text-cyber-cyan hover:shadow-neon transition-all duration-300"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </MagneticButton>
          </div>

        </div>

        {/* Footer credits and copyrights */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-xs text-gray-500 font-mono space-y-4 sm:space-y-0 text-center sm:text-left">
          <div>
            &copy; {currentYear} DFICS CoE. All rights reserved.
          </div>
          <div>
            Sahyadri College of Engineering &amp; Management
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
