import React, { useEffect, useRef } from 'react';
import { Linkedin, Github, Twitter, Mail, ShieldAlert } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import images from src/images
import chairmanImg from '../images/chairman.png';
import ceoImg from '../images/ceo.png';
import directorImg from '../images/director.png';
import principalImg from '../images/principal.png';
import srinivasImg from '../images/srinivas.png';
import ananthImg from '../images/ananth.png';
import hodImg from '../images/hod.png';
import harishaImg from '../images/harisha.png';
import vidyavvImg from '../images/vidyavv.png';
import alakanandaImg from '../images/alakananda.png';
import adishImg from '../images/adish.png';
import likithImg from '../images/likith.png';

gsap.registerPlugin(ScrollTrigger);

const Team = () => {
  const containerRef = useRef(null);

  // Grouped Team Categories with placeholders
  const categories = [
    {
      id: 'chairman',
      title: 'Chairman',
      members: [
        {
          name: 'Dr.Manjunath Bhandary',
          desc: 'Chairman, SCEM',
          image: chairmanImg,
          social: { linkedin: 'https://www.linkedin.com/in/manjunathbhandary/', twitter: 'https://x.com/Manju_Bhandary?s=20' },
          seed: 'chairman-1'
        }
      ]
    },
    {
      id: 'advisors',
      title: 'Advisors',
      members: [
        {
          name: 'Mr.Johnson Tellis',
          desc: 'CEO, Bhandary Foundation.',
          image: ceoImg,
          social: { linkedin: 'https://www.linkedin.com/in/johnson-tellis-52171554/', twitter: 'https://x.com/jtjohnsontellis?s=20' },
          seed: 'advisor-1'
        },
        {
          name: 'Dr. Manjappa Sarathi',
          desc: 'Director R&D, SCEM',
          image: directorImg,
          social: { linkedin: 'https://www.linkedin.com/in/sarathi-manjappa-a1833199/' },
          seed: 'advisor-2'
        },
        {
          name: 'Dr. S S Injaganeri',
          desc: 'Principal, SCEM',
          image: principalImg,
          social: { linkedin: 'https://www.linkedin.com/in/sidramappa-injaganeri-2a85b934/' },
          seed: 'advisor-3'
        }
      ]
    },
    {
      id: 'mentors',
      title: 'Mentors and Collaborators',
      members: [
        {
          name: 'Dr. Mustafa Basthikodi',
          desc: 'HOD, Dept of CSE, SCEM',
          image: hodImg,
          social: { linkedin: 'https://www.linkedin.com/in/dr-mustafa-basthikodi-3b644442/', twitter: 'https://x.com/mbasthik?s=20' },
          seed: 'mentor-1'
        }
      ]
    },
    {
      id: 'pi',
      title: 'Principal Investigators',
      members: [
        {
          name: 'Dr. Ananth Prabhu',
          desc: 'Principal Investigator',
          image: ananthImg,
          social: { mail: 'mailto:ananth@example.com' },
          seed: 'pi-1'
        },
        {
          name: 'Mr. Harisha',
          desc: 'Co-Principal Investigator',
          image: harishaImg,
          social: { linkedin: 'https://www.linkedin.com/in/harisha123/' },
          seed: 'pi-2'
        }
      ]
    },
    {
      id: 'faculty',
      title: 'Faculty Team',
      members: [
        {
          name: 'Mr. Harisha',
          image: harishaImg,
          social: { linkedin: 'https://www.linkedin.com/in/harisha123/' },
          seed: 'faculty-1'
        },
        {
          name: 'Mrs. Vidya VV',
          image: vidyavvImg,
          social: { mail: 'mailto:vidyavv@example.com' },
          seed: 'faculty-2'
        },
        {
          name: 'Ms. Alakananda',
          image: alakanandaImg,
          social: { linkedin: 'https://www.linkedin.com/in/alakananda-k-75973515b/' },
          seed: 'faculty-3'
        },
        {
          name: 'Prof. Srinivas P M',
          image: srinivasImg,
          social: { linkedin: 'https://www.linkedin.com/in/prof-srinivas-p-m-8183b6223/' },
          seed: 'faculty-4'
        }
      ]
    },
    {
      id: 'resource',
      title: 'Resource Persons',
      members: [
        {
          name: 'Likith U Salian',
          desc: 'M.Sc in Cyber Security',
          image: likithImg,
          social: { mail: '#' },
          seed: 'resource-1'
        },
        {
          name: 'Adish Yermal',
          desc: 'Engineer at Tata Elxsi',
          image: adishImg,
          social: { linkedin: 'https://www.linkedin.com/in/adish-yermal/' },
          seed: 'resource-2'
        }
      ]
    },
    {
      id: 'contributors',
      title: 'Contributers',
      members: [
        {
          name: 'Contributor 1 Name',
          role: 'Contributor',
          desc: 'Description placeholder for Contributor 1.',
          image: null,
          social: { linkedin: '#', github: '#', twitter: '#', mail: '#' },
          seed: 'contributor-1'
        },
        {
          name: 'Contributor 2 Name',
          role: 'Contributor',
          desc: 'Description placeholder for Contributor 2.',
          image: null,
          social: { linkedin: '#', github: '#', twitter: '#', mail: '#' },
          seed: 'contributor-2'
        },
        {
          name: 'Contributor 3 Name',
          role: 'Contributor',
          desc: 'Description placeholder for Contributor 3.',
          image: null,
          social: { linkedin: '#', github: '#', twitter: '#', mail: '#' },
          seed: 'contributor-3'
        },
        {
          name: 'Contributor 4 Name',
          role: 'Contributor',
          desc: 'Description placeholder for Contributor 4.',
          image: null,
          social: { linkedin: '#', github: '#', twitter: '#', mail: '#' },
          seed: 'contributor-4'
        },
        {
          name: 'Contributor 5 Name',
          className: "ml-30",
          role: 'Contributor',
          desc: 'Description placeholder for Contributor 5.',
          image: null,
          social: { linkedin: '#', github: '#', twitter: '#', mail: '#' },
          seed: 'contributor-5'
        },
        {
          name: 'Contributor 6 Name',
          role: 'Contributor',
          desc: 'Description placeholder for Contributor 6.',
          image: null,
          social: { linkedin: '#', github: '#', twitter: '#', mail: '#' },
          seed: 'contributor-6'
        }
      ]
    }
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

      // Section animations per category
      gsap.utils.toArray('.team-category-section').forEach((section) => {
        const header = section.querySelector('.team-category-header');
        const cards = section.querySelectorAll('.team-member-card');

        if (header) {
          gsap.fromTo(
            header,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
              },
            }
          );
        }

        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, scale: 0.95, y: 20 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Custom vector avatar layout or image render
  const renderAvatar = (image, seed) => {
    return (
      <div className="relative w-32 h-32 mx-auto rounded-full border border-cyber-cyan/30 flex items-center justify-center p-2 group-hover:border-cyber-cyan group-hover:shadow-neon transition-all duration-300 overflow-hidden bg-cyber-darker">
        {/* Glowing orbital grid */}
        <div className="absolute inset-1.5 border border-dashed border-cyber-cyan/20 rounded-full animate-spin [animation-duration:16s] group-hover:border-cyber-cyan/50 z-10 pointer-events-none" />

        {image ? (
          <img
            src={image}
            alt="Team member profile"
            className="w-full h-full object-cover rounded-full transition-all duration-300 group-hover:scale-105"
          />
        ) : (
          <ShieldAlert className="w-12 h-12 text-cyber-cyan/50 group-hover:text-cyber-cyan group-hover:scale-110 transition-all duration-300 z-10" />
        )}

        {/* Matrix code lines floating in bg (only if no image) */}
        {!image && (
          <div className="absolute inset-0 opacity-10 group-hover:opacity-20 flex flex-col justify-around font-mono text-[7px] text-cyber-cyan select-none pointer-events-none transition-opacity">
            <div>01101011</div>
            <div>10010010</div>
            <div>00111101</div>
          </div>
        )}
      </div>
    );
  };

  // Helper for layout classes (using flexbox to allow centering remaining items on wrapped rows)
  const getLayoutClasses = (count) => {
    if (count === 1) {
      return {
        container: 'flex flex-wrap justify-center gap-8 max-w-sm mx-auto',
        item: 'w-full'
      };
    }
    if (count === 2) {
      return {
        container: 'flex flex-wrap justify-center gap-8 max-w-3xl mx-auto',
        item: 'w-full sm:w-[calc(50%-16px)] max-w-sm'
      };
    }
    if (count === 3) {
      return {
        container: 'flex flex-wrap justify-center gap-8 max-w-5xl mx-auto',
        item: 'w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.33%-22px)] max-w-sm'
      };
    }
    return {
      container: 'flex flex-wrap justify-center gap-8 max-w-7xl mx-auto',
      item: 'w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)] max-w-sm'
    };
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

        {/* Main Section Header */}
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

        {/* Team Categories Rendering */}
        {categories.map((category) => (
          <div key={category.id} className="team-category-section mb-16">

            {/* Category Subheading */}
            <div className="team-category-header mb-8 flex items-center justify-between border-b border-gray-200 pb-2">
              <div className="flex items-center space-x-2">
                <span className="text-cyber-cyan text-sm font-mono">//</span>
                <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-gray-800 font-space">
                  {category.title}
                </h3>
              </div>
              <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest hidden sm:block">
                {category.members.length} {category.members.length === 1 ? 'member' : 'members'}
              </div>
            </div>

            {/* Category Members Grid */}
            <div className={getLayoutClasses(category.members.length).container}>
              {category.members.map((member, idx) => (
                <div
                  key={idx}
                  className={`team-member-card dino-panel-light dino-panel-light-hover p-8 rounded-none text-center relative group ${getLayoutClasses(category.members.length).item}`}
                >
                  {/* Faded Background Index */}
                  <div className="absolute right-6 top-2 text-8xl font-space font-extrabold select-none pointer-events-none opacity-[0.03] text-black">
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </div>

                  {/* Circular Avatar */}
                  <div className="mb-6 relative">
                    {renderAvatar(member.image, member.seed)}
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
                        target="_blank"
                        rel="noopener noreferrer"
                        className="interactive p-2 rounded-lg bg-cyber-navy hover:bg-cyber-cyan/15 hover:text-cyber-cyan border border-gray-200 hover:border-cyber-cyan/30 text-gray-700 transition-all"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="interactive p-2 rounded-lg bg-cyber-navy hover:bg-cyber-cyan/15 hover:text-cyber-cyan border border-gray-200 hover:border-cyber-cyan/30 text-gray-700 transition-all"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
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
              ))}
            </div>

          </div>
        ))}

      </div>
    </section>
  );
};

export default Team;
