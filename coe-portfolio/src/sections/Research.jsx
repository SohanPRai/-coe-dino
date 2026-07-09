import React, { useEffect, useRef } from 'react';
import { Cpu, Eye, BookOpen, Binary, ArrowRight, Shield, Lock, Globe, Database, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Marquee from '../components/Marquee';

gsap.registerPlugin(ScrollTrigger);

/* ─── Design tokens ───────────────────────────────────
   Background : #0d0d0d  (near-black)
   Primary txt: #f1f1f1  (off-white)
   Accent txt : #f97316  (orange — complement of site blue #0066cc)
   Dim txt    : #6b7280  (cool gray)
   Shadow     : 7px 7px 0 #0066cc  (hard offset, right + bottom)
   Font       : font-mono throughout
──────────────────────────────────────────────────────── */

/* ── Marquee rows ─────────────────────────────────── */
const topRow = [
  { icon: Shield,   tag: 'THREAT-INTEL',    title: 'APT Attribution Frameworks',      desc: 'Graph-based correlation of multi-stage attack patterns across nation-state actor campaigns.' },
  { icon: Cpu,      tag: 'HW-SECURITY',     title: 'IoT Firmware Exploit Mapping',    desc: 'Vulnerability analysis in smart city architectures via binary OS kernel decompilation.' },
  { icon: Binary,   tag: 'CRYPTOGRAPHY',    title: 'Quantum-Safe Protocols',          desc: 'Lattice-based cryptography shielding TLS handshakes from future quantum decryption.' },
  { icon: Eye,      tag: 'DIGITAL-INTEL',   title: 'Neural Deepfake Detection',       desc: 'Spatio-temporal CNNs verifying video frame integrity and micro-expression inconsistencies.' },
  { icon: Database, tag: 'FORENSICS',       title: 'Automated RAM Forensic Parsing',  desc: 'Real-time volatile memory analysis drivers for rootkit and API-hook detection.' },
  { icon: Globe,    tag: 'NET-DEFENSE',     title: 'Zero-Trust Architecture Design',  desc: 'Micro-segmentation strategies and identity-aware proxy deployments for enterprise networks.' },
];

const bottomRow = [
  { icon: Zap,      tag: 'INCIDENT-RESP',   title: 'Autonomous SOC Playbooks',        desc: 'ML-driven triage pipelines that auto-escalate critical alerts from SIEM event streams.' },
  { icon: Lock,     tag: 'MALWARE-ANAL',    title: 'Polymorphic Signature Gen',       desc: 'Behavioural sandbox extraction creating adaptive YARA signatures against evasion layers.' },
  { icon: Eye,      tag: 'OSINT',           title: 'Dark Web Entity Correlation',     desc: 'NLP pipelines that de-anonymise marketplace actors across Tor-hosted forums.' },
  { icon: Shield,   tag: 'COMPLIANCE',      title: 'DPDP Act Readiness Toolkit',     desc: "Automated gap-analysis and remediation roadmaps for India's Digital Personal Data Protection Act." },
  { icon: Binary,   tag: 'CLOUD-SEC',       title: 'Serverless Injection Detection',  desc: 'eBPF-based runtime monitoring catching supply-chain attacks inside Lambda/Cloud Run.' },
  { icon: Cpu,      tag: 'EMBEDDED',        title: 'JTAG Fault Injection Defences',   desc: 'Countermeasures against physical side-channel attacks on ARM Cortex-M devices.' },
];

/* ── Marquee card ───────────────────────────────────── */
const ResearchCard = ({ icon: Icon, tag, title, desc }) => (
  <figure
    className="relative w-72 flex-shrink-0 cursor-pointer overflow-hidden rounded-none p-5 group"
    style={{
      background: '#0d0d0d',
      border: '1px solid #1f1f1f',
      boxShadow: '7px 7px 0 #0066cc',
      transition: 'box-shadow 0.2s ease, transform 0.2s ease',
    }}
    onMouseEnter={e => { e.currentTarget.style.boxShadow = '9px 9px 0 #f97316'; e.currentTarget.style.transform = 'translate(-2px,-2px)'; }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow = '7px 7px 0 #0066cc'; e.currentTarget.style.transform = 'translate(0,0)'; }}
  >
    {/* Tag row */}
    <div className="flex items-center gap-2 mb-3">
      <Icon className="w-3.5 h-3.5" style={{ color: '#f97316' }} />
      <span className="font-mono text-[10px] tracking-widest font-bold uppercase"
            style={{ color: '#f97316' }}>
        {tag}
      </span>
    </div>

    {/* Title */}
    <figcaption className="font-mono font-bold text-sm uppercase tracking-wide mb-2"
                style={{ color: '#f1f1f1' }}>
      {title}
    </figcaption>

    {/* Description */}
    <p className="font-mono text-xs leading-relaxed" style={{ color: '#6b7280' }}>
      {desc}
    </p>
  </figure>
);

/* ── Section ─────────────────────────────────────────── */
const Research = () => {
  const containerRef = useRef(null);

  const publications = [
    { title: 'IoT Firmware Exploit Mapping',   desc: 'Analyzing vulnerabilities in smart city architectures and consumer gateways by decompiling binary OS kernels and hardware-level instruction flows.',         icon: Cpu,      tag: 'HW-SECURITY' },
    { title: 'Quantum-Safe Network Protocols', desc: 'Developing lattice-based cryptography implementations to shield standard TLS packet handshakes from future quantum decryption attacks.',                 icon: Binary,   tag: 'CRYPTOGRAPHY' },
    { title: 'Neural Deepfake Detection',      desc: 'Using spatial and temporal convolutional networks to verify video frame integrity and track micro-expression inconsistencies in real time.',              icon: Eye,      tag: 'DIGITAL-INTEL' },
    { title: 'Automated RAM Forensic Parsing', desc: 'Creating open parsing drivers for volatile memory analysis, enabling real-time detection of rootkits and API-hooking scripts.',                          icon: BookOpen, tag: 'FORENSICS' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.research-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: '.research-header', start: 'top 85%' } }
      );
      gsap.fromTo('.research-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: '.research-grid', start: 'top 80%' } }
      );
      gsap.fromTo('.research-marquee-wrap',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: '.research-marquee-wrap', start: 'top 85%' } }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="research" ref={containerRef} className="relative py-24 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="research-header text-center mb-16">
          <div className="inline-block px-3 py-1 border rounded-full font-mono text-xs font-semibold tracking-widest mb-4 uppercase"
               style={{ color: '#f97316', borderColor: '#f97316', background: 'rgba(249,115,22,0.08)' }}>
            ACADEMIC INNOVATION
          </div>
          <h2 className="font-mono font-extrabold uppercase tracking-wider text-3xl sm:text-4xl mb-4 text-cyber-light">
            Advanced <span style={{ color: '#0066cc' }}>Research Initiatives</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#0066cc] to-[#f97316] mx-auto mb-6" />
          <p className="max-w-2xl mx-auto font-mono text-sm sm:text-base leading-relaxed" style={{ color: '#6b7280' }}>
            Exploring new frontiers in security intelligence to resolve complex digital problems before they compromise global architectures.
          </p>
        </div>

        {/* Research Cards Grid */}
        <div className="research-grid grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {publications.map((pub, idx) => {
            const Icon = pub.icon;
            return (
              <div
                key={idx}
                className="research-card relative group flex flex-col justify-between p-8 rounded-none"
                style={{
                  background: '#0d0d0d',
                  border: '1px solid #1f1f1f',
                  boxShadow: '8px 8px 0 #0066cc',
                  transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '10px 10px 0 #f97316'; e.currentTarget.style.transform = 'translate(-2px,-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '8px 8px 0 #0066cc'; e.currentTarget.style.transform = 'translate(0,0)'; }}
              >
                <div>
                  {/* Tag + Icon row */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[10px] tracking-widest font-bold uppercase px-2.5 py-1 border"
                          style={{ color: '#f97316', borderColor: '#f97316', background: 'rgba(249,115,22,0.08)' }}>
                      {pub.tag}
                    </span>
                    <div className="p-2.5 border transition-all duration-300"
                         style={{ borderColor: '#2a2a2a', color: '#6b7280' }}>
                      <Icon className="w-5 h-5 group-hover:rotate-6 transition-transform" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-mono font-bold uppercase tracking-wider text-base mb-3"
                      style={{ color: '#f1f1f1', letterSpacing: '0.08em' }}>
                    {pub.title}
                  </h3>

                  {/* Description */}
                  <p className="font-mono text-xs leading-relaxed mb-6" style={{ color: '#6b7280' }}>
                    {pub.desc}
                  </p>
                </div>

                {/* CTA */}
                <a href="#contact"
                   className="interactive flex items-center gap-2 font-mono text-xs font-bold tracking-widest uppercase mt-auto w-fit"
                   style={{ color: '#f97316' }}>
                  <span>LEARN MORE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Corner accent */}
                <span className="absolute top-0 right-0 w-0 h-0
                  border-t-[28px] border-r-[28px]"
                  style={{ borderTopColor: '#0066cc', borderRightColor: '#0066cc',
                           borderLeftColor: 'transparent', borderBottomColor: 'transparent' }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Marquee — full-bleed */}
      <div className="research-marquee-wrap w-full space-y-5 py-2">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-white to-transparent" />
          <Marquee speed="38s" pauseOnHover>
            {topRow.map(item => <ResearchCard key={item.title} {...item} />)}
          </Marquee>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-white to-transparent" />
          <Marquee speed="38s" reverse pauseOnHover>
            {bottomRow.map(item => <ResearchCard key={item.title} {...item} />)}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default Research;
