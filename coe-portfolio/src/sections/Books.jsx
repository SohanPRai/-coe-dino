import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, ExternalLink, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Books.css';
import bookCover from '../images/book_cover.png';

gsap.registerPlugin(ScrollTrigger);

const Books = () => {
  const [turned, setTurned] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.books-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.books-header',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.book-display-wrap',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.book-display-wrap',
            start: 'top 80%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="books"
      ref={containerRef}
      className="relative py-24 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="books-header text-center mb-16">
          <div
            className="inline-block px-3 py-1 border rounded-full font-mono text-xs font-semibold tracking-widest mb-4 uppercase"
            style={{
              color: '#2563EB',
              borderColor: '#2563EB',
              background: 'rgba(37,99,235,0.08)',
            }}
          >
            LITERATURE &amp; VOLUMES
          </div>
          <h2 className="font-mono font-extrabold uppercase tracking-wider text-3xl sm:text-4xl mb-4 text-cyber-light">
            Our Published <span style={{ color: '#2563EB' }}>Books</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] mx-auto mb-6" />
          <p className="max-w-2xl mx-auto font-mono text-sm sm:text-base leading-relaxed text-gray-500">
            Explore advanced scholarly literature authored by our core researchers, detailing methodologies and frameworks in cyber investigations.
          </p>
        </div>

        {/* Book Display Wrap */}
        <div className="book-display-wrap grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Left Column: Book Details Card */}
          <div className="lg:col-span-5 text-left space-y-6">
            <div className="dino-panel-light p-6 rounded-none border border-black/10 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-[3px] h-full bg-cyber-cyan" />
              
              <span className="font-mono text-[10px] tracking-widest font-bold uppercase px-2.5 py-1 border bg-cyber-cyan/10 border-cyber-cyan/20 text-cyber-cyan">
                Hard ISBN: 9781774913031
              </span>
              
              <h3 className="text-xl sm:text-2xl font-space font-extrabold text-gray-900 mt-4 mb-2 leading-tight">
                Advancements in Cybercrime Investigation and Digital Forensics
              </h3>
              
              <p className="text-gray-500 font-mono text-xs mb-4">
                Apple Academic Press with Co-Publishing CRC Taylor &amp; Francis
              </p>
              
              <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed mb-6">
                This volume offers a comprehensive study on digital forensics intelligence, highlighting machine learning automation and state-of-the-art cybersecurity tools to recover lost, deleted, or damaged evidence.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                <a
                  href="https://www.appleacademicpress.com/advancements-in-cybercrime-investigation-and-digital-forensics-/9781774913031"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive flex items-center space-x-2 text-xs font-mono font-bold tracking-wider text-white bg-indigo-600 border-2 border-black rounded-lg px-4 py-2.5 hover:bg-cyber-cyan hover:shadow-neon transition-all duration-300"
                >
                  <span>OFFICIAL BOOK SITE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="text-gray-400 font-mono text-xs flex items-center gap-2">
              <span className="animate-pulse">●</span>
              <span>Click on the book cover page or leaf to flip pages.</span>
            </div>
          </div>

          {/* Right Column: 3D Interactive Flipbook */}
          <div className="lg:col-span-7 flex justify-center items-center books-section">
            <div className="books-container">
              <div className="cover">
                <div className="book">
                  {/* Page 1 (Jacket/Background Left Page) */}
                  <div
                    className="book__page book__page--1"
                    onClick={() => setTurned(true)}
                  >
                    <img
                      src={bookCover}
                      alt="Advancements in Cybercrime Cover"
                    />
                  </div>

                  {/* Page 4 (Background Right Page) */}
                  <div
                    className="book__page book__page--4"
                    onClick={() => setTurned(false)}
                  >
                    <div className="page__content">
                      <h1 className="page__content-title">Synopsis</h1>
                      <div className="page__content-blockquote">
                        <p className="page__content-blockquote-text">
                          "Vast manpower and resources are needed to investigate cybercrimes; the use of new advanced technologies such as machine learning combined with automation are effective in providing significant additional support..."
                        </p>
                        <p className="page__content-blockquote-text">
                          "The volume discusses the challenges to cybercrime reporting, investigation, and adjudication and offers a comprehensive review of digital forensics intelligence."
                        </p>
                        <span className="page__content-blockquote-reference">
                          Apple Academic Press*
                        </span>
                      </div>
                      <div className="page__number">3</div>
                    </div>
                  </div>

                  {/* Page 2 & 3 (The Flip Leaf) */}
                  <div
                    className={`book__page book__page--2 ${turned ? 'turned' : ''}`}
                    onClick={() => setTurned(!turned)}
                  >
                    {/* Front side of leaf (Title/Author cover when closed) */}
                    <div className="book__page-front">
                      <div className="page__content">
                        <h1 className="page__content-book-title">Advancements in Cybercrime</h1>
                        <h2 className="page__content-author">A. Harisha</h2>
                        
                        <p className="page__content-credits">
                          Co-Editors 
                          <span>Amarnath Mishra, PhD</span>
                          <span>Chandra Singh</span>
                        </p>
                        
                        <div className="page__content-copyright">
                          <p>Apple Academic Press</p>
                          <p>CRC Press - MMXXIII</p>
                        </div>
                      </div>
                    </div>

                    {/* Back side of leaf (Contents when opened) */}
                    <div className="book__page-back">
                      <div className="page__content">
                        <h1 className="page__content-title">Selected Chapters</h1>
                        <table className="page__content-table">
                          <tbody>
                            <tr>
                              <td className="text-left font-semibold">CH 1</td>
                              <td className="text-left">Cybercrime Reporting in India</td>
                              <td className="text-right">1</td>
                            </tr>
                            <tr>
                              <td className="text-left font-semibold">CH 2</td>
                              <td className="text-left">Digital Forensics Intelligence</td>
                              <td className="text-right">23</td>
                            </tr>
                            <tr>
                              <td className="text-left font-semibold">CH 6</td>
                              <td className="text-left">ML &amp; Data Mining Forensics</td>
                              <td className="text-right">111</td>
                            </tr>
                            <tr>
                              <td className="text-left font-semibold">CH 11</td>
                              <td className="text-left">Mobile Phone Forensic Tools</td>
                              <td className="text-right">215</td>
                            </tr>
                            <tr>
                              <td className="text-left font-semibold">CH 16</td>
                              <td className="text-left">OAuth 2.0 Defenses &amp; Signatures</td>
                              <td className="text-right">327</td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="page__number">2</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Books;
