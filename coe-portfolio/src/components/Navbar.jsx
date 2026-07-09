import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ShieldAlert } from 'lucide-react';
import MagneticButton from './MagneticButton';
import gsap from 'gsap';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  
  const lastScrollY = useRef(0);
  const mobileMenuRef = useRef(null);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Domains', href: '#domains' },
    { name: 'Research', href: '#research' },
    { name: 'Labs', href: '#labs' },
    { name: 'Projects', href: '#projects' },
    { name: 'Events', href: '#events' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Scrolled styling check
      if (currentScrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide / Show Navbar logic
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setVisible(false); // scrolling down
      } else {
        setVisible(true); // scrolling up
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Stagger reveal of mobile menu items when open
  useEffect(() => {
    if (isOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll('.mobile-link'),
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, stagger: 0.08, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 transform ${
          visible ? 'translate-y-0' : '-translate-y-full'
        } ${
          scrolled 
            ? 'bg-white border-b-2 border-black py-3 shadow-[0_4px_0_rgba(17,17,17,0.06)]' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a 
              href="#home" 
              onClick={(e) => handleLinkClick(e, '#home')}
              className="flex items-center space-x-2 group interactive"
            >
              <div className="relative p-1.5 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 group-hover:border-cyber-cyan group-hover:shadow-neon transition-all duration-300">
                <ShieldAlert className="w-6 h-6 text-cyber-cyan group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-space font-bold text-lg text-cyber-light leading-none tracking-wide group-hover:text-cyber-cyan transition-colors">
                  DFICS
                </span>
                <span className="font-sans text-[9px] text-gray-400 tracking-widest mt-0.5 uppercase hidden sm:inline-block">
                  Centre of Excellence
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1.5 xl:space-x-3.5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="interactive font-sans text-xs xl:text-sm font-medium text-gray-600 hover:text-cyber-cyan px-2 py-1 rounded transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-cyan transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <MagneticButton>
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, '#contact')}
                  className="interactive px-5 py-2 font-space text-xs font-semibold dino-btn-primary dino-btn-primary-hover transition-all duration-300"
                >
                  Join DFICS
                </a>
              </MagneticButton>
            </div>

            {/* Mobile Hamburger toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="interactive p-2 rounded-lg text-gray-600 hover:text-cyber-cyan focus:outline-none transition-colors border border-transparent hover:border-cyber-cyan/30"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Full Screen Menu Drawer */}
        <div
          className={`fixed inset-0 top-[60px] w-full h-[calc(100vh-60px)] bg-white/95 backdrop-blur-xl border-t border-black/5 z-40 transition-all duration-300 ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div ref={mobileMenuRef} className="flex flex-col items-center justify-center h-full space-y-5 px-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="mobile-link text-xl font-space font-medium text-gray-700 hover:text-cyber-cyan transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="mobile-link pt-4">
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="px-8 py-3 font-space text-sm font-semibold dino-btn-primary dino-btn-primary-hover block text-center"
              >
                Join DFICS
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
