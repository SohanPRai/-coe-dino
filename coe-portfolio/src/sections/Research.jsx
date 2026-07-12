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
  <figure className="relative w-72 flex-shrink-0 cursor-pointer overflow-hidden rounded-none p-5 group dino-panel-light dino-panel-light-hover">
    {/* Tag row */}
    <div className="flex items-center gap-2 mb-3">
      <Icon className="w-3.5 h-3.5" style={{ color: '#2563EB' }} />
      <span className="font-mono text-[10px] tracking-widest font-bold uppercase text-cyber-cyan">
        {tag}
      </span>
    </div>

    {/* Title */}
    <figcaption className="font-mono font-bold text-sm uppercase tracking-wide mb-2 text-gray-900">
      {title}
    </figcaption>

    {/* Description */}
    <p className="font-mono text-xs leading-relaxed text-gray-600">
      {desc}
    </p>
  </figure>
);

const Research = () => {
  const containerRef = useRef(null);

  const patents = [
    {
      title: 'An Improved Cyber Security System With Digital Watermarking Using Combined Transformation Approach',
      year: '2021',
      number: '2021101400',
      type: 'International',
      status: 'Granted'
    },
    {
      title: 'Enhanced Detection Of Attacks OnNetwork Based On Pattern Recognitions With Decision Stump',
      year: '2021',
      number: '202141010139',
      type: 'Indian Patent',
      status: 'Published'
    }
  ];

  const publications = [
    {
      id: 'DOI: IDCIoT59759.2024.10467993',
      indexing: 'SCOPUS',
      year: '2024',
      title: 'Advancements in User Security: Enhancing Usability with Graphical Password Authentication',
      venue: 'IEEE 2024 2nd International Conference on Intelligent Data Communication Technologies and Internet of Things (IDCIoT)',
      authors: ['Harisha', 'Sandhya Ramesh Naik', 'Shettigar Sarvani Vasudeva', 'K Shrilakshmi', 'Vaishnavi Kothwal']
    },
    {
      id: 'ISBN: 9781003369479',
      indexing: 'SCOPUS',
      year: 'Chapter 2023',
      title: 'Open Standard Authorization Protocol: OAuth 2.0 Defenses and Working Using Digital Signatures',
      venue: 'Book: Advancements in Cybercrime Investigation and Digital Forensics: Apple Academic press and CRC Press',
      authors: ['Harisha', 'L Salian', 'A Yermal', 'CGA Shastry']
    },
    {
      id: 'DOI: 10.3233/IDT-210132',
      indexing: 'SCOPUS',
      year: 'Preprint: 1-8',
      title: 'A performance evaluation of convolution neural networks for kinship discernment: An application in digital forensics.',
      venue: 'Intelligent Decision Technologies',
      authors: ['Harisha', 'B. Krishna Prasad', 'Keerthana Rajeev', 'Maithri', 'Nischal']
    },
    {
      id: 'DOI: 10.1504/IJIDSS.2021.115226',
      indexing: 'DBLP',
      year: '2021',
      title: 'Deep learning-based approach for malware classification.',
      venue: 'Journal of Intelligent Defence Support Systems 6.2 (2021): 61-80. [DBLP]',
      authors: ['Airbail Harisha', 'et al']
    },
    {
      id: '10.1007/s40747-022-00771-0',
      indexing: 'SCIE, SCOPUS',
      year: '2022',
      title: "Person identification from arm's hair patterns using CT-twofold Siamese network in forensic psychiatric hospitals.",
      venue: 'Complex Intell. Syst. (2022).',
      authors: ['Rohan Salins', 'Ashwin', 'G Ananth Prabhu']
    },
    {
      id: '10.4108/eai.23-6-2021.170244',
      indexing: 'DBLP',
      year: '2021',
      title: 'Advanced Mechanism to Achieve QoS and Profit Maximization of Brokers in Cloud Computing.',
      venue: 'EAI Endorsed Transactions on Cloud Systems, 7(20). [DBLP]',
      authors: ['Sathish Akanksha', 'et al']
    }
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
               style={{ color: '#2563EB', borderColor: '#2563EB', background: 'rgba(37,99,235,0.08)' }}>
            ACADEMIC INNOVATION
          </div>
          <h2 className="font-mono font-extrabold uppercase tracking-wider text-3xl sm:text-4xl mb-4 text-cyber-light">
            Advanced <span style={{ color: '#2563EB' }}>Research Initiatives</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] mx-auto mb-6" />
          <p className="max-w-2xl mx-auto font-mono text-sm sm:text-base leading-relaxed" style={{ color: '#4b5563' }}>
            Exploring new frontiers in security intelligence to resolve complex digital problems before they compromise global architectures.
          </p>
        </div>

        {/* Patents Sub-Section */}
        <div className="mb-20 max-w-6xl mx-auto">
          <h3 className="font-mono font-bold uppercase tracking-wider text-lg mb-6 text-gray-900 text-left flex items-center gap-2 border-b border-black/10 pb-2">
            <span>□</span> Our Patents <span className="text-cyber-cyan text-xs">GRANTED &amp; PUBLISHED</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {patents.map((pat, idx) => (
              <div 
                key={idx} 
                className="research-card dino-panel-light dino-panel-light-hover p-6 rounded-none relative overflow-hidden group text-left"
              >
                {/* Index badge */}
                <div className="absolute right-6 top-2 text-7xl font-space font-extrabold select-none pointer-events-none opacity-[0.03] text-black">
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </div>

                <div className="absolute top-0 left-0 w-[3px] h-full bg-cyber-cyan" />
                
                <h4 className="text-base font-space font-bold uppercase tracking-wider text-gray-900 mb-4 pr-10 leading-snug group-hover:text-cyber-cyan transition-colors">
                  {pat.title}
                </h4>

                <div className="space-y-2 text-xs font-mono text-gray-600">
                  <div className="flex justify-between border-b border-black/5 pb-1">
                    <span className="text-gray-400">Year:</span>
                    <span className="font-semibold text-gray-950">{pat.year}</span>
                  </div>
                  <div className="flex justify-between border-b border-black/5 pb-1">
                    <span className="text-gray-400">Patent Number &amp; Application:</span>
                    <span className="font-semibold text-gray-950">{pat.number}</span>
                  </div>
                  <div className="flex justify-between border-b border-black/5 pb-1">
                    <span className="text-gray-400">Type:</span>
                    <span className="font-semibold text-gray-950">{pat.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={`font-bold uppercase ${pat.status === 'Granted' ? 'text-green-600' : 'text-indigo-600'}`}>{pat.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Research List Header */}
        <div className="mb-6 max-w-6xl mx-auto">
          <h3 className="font-mono font-bold uppercase tracking-wider text-lg text-gray-900 text-left flex items-center gap-2 border-b border-black/10 pb-2">
            <span>□</span> Research Publications <span className="text-cyber-cyan text-xs">JOURNAL &amp; CONFERENCE PROCEEDINGS</span>
          </h3>
        </div>

        {/* Research List */}
        <div className="research-grid flex flex-col space-y-6 mb-20 max-w-6xl mx-auto">
          {publications.map((pub, idx) => {
            return (
              <div
                key={idx}
                className="research-card relative group flex flex-col md:flex-row items-start gap-4 md:gap-8 p-6 rounded-none dino-panel-light dino-panel-light-hover transition-all duration-300"
              >
                {/* Left Metadata Column */}
                <div className="w-full md:w-60 shrink-0 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start text-left gap-1 font-mono text-xs border-b md:border-b-0 md:border-r border-black/10 pb-3 md:pb-0 md:pr-4">
                  <div className="flex flex-col text-left space-y-1">
                    <span className="text-gray-400 font-semibold text-[10px] break-all">({pub.id})</span>
                    <span className="text-cyber-cyan font-bold">[{pub.indexing}]</span>
                  </div>
                  <span className="text-gray-500 font-light mt-1 text-[11px]">{pub.year}</span>
                </div>

                {/* Right Info Column */}
                <div className="flex-1 text-left space-y-2">
                  <h3 className="font-space font-bold text-gray-900 text-sm sm:text-base leading-snug group-hover:text-cyber-cyan transition-colors uppercase tracking-wider">
                    {pub.title}
                  </h3>
                  <p className="text-gray-600 text-xs font-mono font-light leading-relaxed">
                    {pub.venue}
                  </p>
                  
                  {/* Author pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {pub.authors.map((author, aIdx) => (
                      <span
                        key={aIdx}
                        className="px-2.5 py-0.5 bg-indigo-600 text-white font-space font-semibold text-[9px] rounded-full shadow-[2px_2px_0_rgba(0,0,0,1)] border border-black hover:translate-y-[-1px] transition-transform"
                      >
                        {author}
                      </span>
                    ))}
                  </div>
                </div>
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
