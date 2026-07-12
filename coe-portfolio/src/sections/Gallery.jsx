import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const containerRef = useRef(null);
  const [showAll, setShowAll] = useState(false);

  // Eager load all webp files dynamically using Vite glob
  const images = import.meta.glob('../gallery-images/*.webp', { eager: true });
  const imageList = Object.keys(images)
    .sort()
    .map((key) => images[key].default);

  const tags = [
    'Cyber Drill',
    'Incident Triage',
    'Hardware Audits',
    'Digital Forensics',
    'Malware Analysis',
    'Security Operations',
    'Offensive CTF',
    'Research Colloquium'
  ];

  const visibleImages = showAll ? imageList : imageList.slice(0, 6);

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
            y: 20
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 95%',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [showAll]);

  // Refresh ScrollTrigger when layout size changes
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [showAll]);

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
          <p className="max-w-2xl mx-auto text-gray-500 font-light text-sm sm:text-base leading-relaxed">
            A futuristic visual record of our training workshops, active investigations, forensic research labs, and cybersecurity events.
          </p>
        </div>

        {/* Pinterest Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {visibleImages.map((imgUrl, idx) => {
            const tag = tags[idx % tags.length];
            return (
              <div
                key={idx}
                className="gallery-grid-item break-inside-avoid glass-panel rounded-none border border-black/10 hover:border-cyber-cyan/40 hover:shadow-neon transition-all duration-300 relative overflow-hidden group mb-6"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img
                    src={imgUrl}
                    alt={`CoE Activity ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Grid overlay mask */}
                  <div className="absolute inset-0 cyber-grid opacity-[0.03] pointer-events-none" />
                </div>

                {/* Info Overlay */}
                <div className="p-4 bg-white border-t border-black/5 text-left flex justify-between items-center">
                  <div>
                    <span className="font-mono text-[9px] font-bold text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/20 px-2 py-0.5 rounded uppercase">
                      {tag}
                    </span>
                    <h3 className="text-xs font-space font-bold uppercase tracking-wider text-gray-800 mt-2">
                      CoE Activity #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </h3>
                  </div>
                  <div className="text-[10px] font-mono text-gray-400">
                    [LOG_SECURE]
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show More / Show Less Button */}
        {imageList.length > 6 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="interactive inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-wider text-cyber-cyan border-2 border-black bg-white rounded-lg px-6 py-3 hover:bg-cyber-cyan hover:text-white hover:shadow-neon transition-all duration-300"
            >
              <span>{showAll ? 'SHOW LESS LOGS' : 'LOAD MORE ACTIVITIES'}</span>
              <span>{showAll ? '↑' : '↓'}</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default Gallery;
