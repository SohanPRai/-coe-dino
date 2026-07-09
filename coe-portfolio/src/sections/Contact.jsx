import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, Cpu } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FloatingInput = ({ label, id, type = 'text', textarea = false }) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  const labelClass = `absolute left-4 top-1/2 -translate-y-1/2 font-sans text-xs sm:text-sm text-gray-400 transition-all duration-300 pointer-events-none ${
    focused || value 
      ? 'top-2 text-[10px] sm:text-[10px] text-cyber-cyan font-bold tracking-wider uppercase' 
      : ''
  }`;

  const inputClass = `w-full bg-cyber-darker/60 border border-white/5 focus:border-cyber-cyan/50 rounded-xl px-4 pt-5 pb-2.5 text-xs sm:text-sm text-white focus:outline-none focus:shadow-neon transition-all duration-300 ${
    textarea ? 'h-32 resize-none pt-6' : ''
  }`;

  return (
    <div className="relative w-full">
      {textarea ? (
        <textarea
          id={id}
          className={inputClass}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required
        />
      ) : (
        <input
          id={id}
          type={type}
          className={inputClass}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required
        />
      )}
      <label className={textarea && (focused || value) ? 'absolute left-4 top-2 text-[10px] text-cyber-cyan font-bold tracking-wider uppercase' : labelClass}>
        {label}
      </label>
      {/* Bottom neon accent border expansion */}
      <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-cyber-cyan transition-all duration-300 ${
        focused ? 'w-full shadow-neon' : 'w-0'
      }`} />
    </div>
  );
};

const Contact = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        '.contact-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.contact-header',
            start: 'top 85%',
          },
        }
      );

      // Grid panels reveal
      gsap.fromTo(
        '.contact-panel',
        { opacity: 0, x: (idx) => (idx === 0 ? -40 : 40) },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 80%',
          },
        }
      );

      // Map pins pulse loop
      gsap.fromTo(
        '.map-pin-glow',
        { scale: 0.8, opacity: 0.8 },
        { scale: 2.2, opacity: 0, duration: 1.8, repeat: -1, ease: 'sine.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('SECURE COMMUNICATION ESTABLISHED: Your report has been dispatched to DFICS servers.');
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-24 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="contact-header text-center mb-16">
          <div className="inline-block px-3 py-1 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-full text-cyber-cyan text-xs font-mono font-medium tracking-wider mb-4 shadow-neon">
            ENCRYPTED LINK
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-wider mb-4">
            Secure <span className="text-cyber-cyan text-glow">Incident Reporting</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-purple mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-gray-400 font-light text-sm sm:text-base leading-relaxed">
            Dispatch vulnerability inquiries, student research requests, or legal forensic consultation directly to our servers.
          </p>
        </div>

        {/* Contact Split Grid */}
        <div className="contact-grid grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel - Info & Geolocation SVG Map */}
          <div className="contact-panel lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 space-y-6 h-full flex flex-col justify-between text-left">
              <div className="space-y-6">
                <h3 className="text-lg font-space font-bold uppercase tracking-wider text-white">
                  CoE Terminals
                </h3>

                {/* Details list */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="p-2.5 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-xl text-cyber-cyan mt-1">
                      <MapPin className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
                        Location
                      </h4>
                      <p className="text-gray-300 text-xs sm:text-sm font-light">
                        DFICS CoE, Sahyadri College of Engineering &amp; Management, Adyar, Mangaluru, Karnataka - 575007
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-2.5 bg-cyber-purple/10 border border-cyber-purple/30 rounded-xl text-cyber-purple mt-1">
                      <Mail className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
                        Secured Email
                      </h4>
                      <p className="text-gray-300 text-xs sm:text-sm font-light font-mono">
                        dfics@sahyadri.edu.in
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-2.5 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-xl text-cyber-cyan mt-1">
                      <Phone className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
                        Direct Lines
                      </h4>
                      <p className="text-gray-300 text-xs sm:text-sm font-light font-mono">
                        +91 824 2277222
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Geolocation Interactive Vector Map */}
              <div className="relative w-full h-44 bg-cyber-darker/60 border border-white/5 rounded-xl overflow-hidden flex items-center justify-center p-4">
                {/* Cyber Grid background */}
                <div className="absolute inset-0 cyber-grid opacity-15" />
                
                {/* Abstract Vector Map outline */}
                <svg className="w-full h-full text-cyber-cyan/20" viewBox="0 0 200 100" preserveAspectRatio="none">
                  <path d="M20,10 Q40,30 30,50 T70,80 T120,40 T180,60" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M10,40 Q60,10 90,60 T140,80 T190,20" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
                </svg>

                {/* Geolocation indicator dot and radar ring */}
                <div className="absolute top-[48%] left-[45%] translate-x-[-50%] translate-y-[-50%] flex items-center justify-center">
                  <div className="map-pin-glow absolute w-6 h-6 rounded-full bg-cyber-cyan/30 border border-cyber-cyan/80 pointer-events-none" />
                  <div className="w-2.5 h-2.5 rounded-full bg-cyber-cyan shadow-neon z-10" />
                </div>
                
                <div className="absolute bottom-3 left-3 font-mono text-[8px] text-cyber-cyan font-bold tracking-widest">
                  COE_COORDS: 12.8687° N, 74.8961° E
                </div>
              </div>
            </div>
          </div>

          {/* Right panel - Dynamic Form */}
          <div className="contact-panel lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 text-left h-full">
              <form onSubmit={handleSubmit} className="space-y-5 flex flex-col h-full justify-between">
                
                <div className="space-y-5">
                  <FloatingInput label="Terminal Operator Name" id="name" />
                  <FloatingInput label="Secured Response Email" id="email" type="email" />
                  <FloatingInput label="Affiliated Agency / Organization" id="org" />
                  <FloatingInput label="Encrypted Message Payload" id="message" textarea />
                </div>

                <div className="pt-6">
                  <MagneticButton className="w-full">
                    <button
                      type="submit"
                      className="interactive w-full flex items-center justify-center space-x-2.5 font-space font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl bg-cyber-cyan text-cyber-bg border border-cyber-cyan hover:bg-transparent hover:text-cyber-cyan hover:shadow-neon transition-all duration-300 shadow-neon text-xs sm:text-sm"
                    >
                      <Send className="w-4 h-4" />
                      <span>DISPATCH REPORT</span>
                    </button>
                  </MagneticButton>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
