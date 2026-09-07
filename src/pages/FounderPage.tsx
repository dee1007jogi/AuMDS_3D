import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SplitTextHeading } from '../components/SplitTextHeading';
import { SectionScrollAnimation } from '../components/SectionScrollAnimation';
import { ElasticTiltCard } from '../components/ElasticTiltCard';
import { MagneticGlowButton } from '../components/MagneticGlowButton';
import { GoldBarButton } from '../components/GoldBarButton';
import { ConsultationModal } from '../components/ConsultationModal';
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  Building2,
  Briefcase,
  Shield,
  Code2,
  Layers,
  Palette,
  Landmark,
  FileSpreadsheet,
  Clock,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  Compass,
  CheckCircle2,
  Award,
  Globe,
  Send,
  Linkedin,
  Github
} from 'lucide-react';
import { audioEngine } from '../components/AudioEngine';
import { useNavigate } from 'react-router-dom';

const BRAND_SHOWCASE_ITEMS = [
  {
    tag: 'HIGHLITZ MEDIA',
    title: 'Audiophile Brand Campaign',
    desc: 'Visual storytelling & premium audio gear identity development.',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
  },
  {
    tag: 'GIRNANDI SPICES',
    title: 'Artisanal Beverage Packaging',
    desc: 'Complete packaging line and organic beverage branding.',
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
  },
  {
    tag: 'SKILL DEV WING',
    title: 'Technical Upskilling Labs',
    desc: 'Live collaborative workspaces for engineering excellence.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  },
  {
    tag: 'TRIAD PROGRAM',
    title: 'Talent Incubation Hub',
    desc: 'Hands-on project development in AI/ML & full-stack software.',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
  },
  {
    tag: 'SATCHAI SERIES',
    title: 'B2B Networking Meetups',
    desc: 'Connecting local entrepreneurs and enterprise leaders.',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
  },
];

export const FounderPage: React.FC = () => {
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative pt-32 pb-24 z-10 font-sans space-y-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* SECTION 1: HERO VIEWPORT WITH VERTICAL ACCENT RAIL */}
        <section className="relative min-h-[85vh] flex items-center pt-8 pb-16 overflow-hidden">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Vertical Side Accent Bar for Desktop */}
            <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center space-y-6 border-r border-white/10 pr-6">
              <span className="[writing-mode:vertical-rl] text-[10px] uppercase tracking-widest text-amber-400 font-mono font-bold">
                SYSTEMS ARCHITECT // POLICY
              </span>
              <div className="w-[1px] h-24 bg-gradient-to-b from-amber-400 to-transparent" />
              <div className="flex flex-col space-y-4 text-slate-400">
                <motion.a
                  whileHover={{ scale: 1.2, color: '#D4AF37' }}
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-400 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.2, color: '#38bdf8' }}
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.2, color: '#D4AF37' }}
                  href="mailto:contact@aumdsorg.com"
                  className="hover:text-amber-400 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </motion.a>
              </div>
            </div>

            {/* Main Hero Content */}
            <div className="lg:col-span-11 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/40 text-xs font-mono text-amber-300 shadow-2xl backdrop-blur-xl"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>Kengeri Satellite Town, Bengaluru, Karnataka, India</span>
              </motion.div>
              
              <div className="space-y-3">
                <SplitTextHeading
                  as="h1"
                  text="Shivaprasad Aum"
                  className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-white font-display"
                />
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-xl sm:text-2xl font-semibold text-slate-300 font-mono tracking-wide"
                >
                  Founder & Chief Executive Officer <span className="text-amber-400 font-normal">|</span> Public Policy Strategist & Systems Architect
                </motion.p>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed font-normal"
              >
                Co-creating the Universe of Brands through Technology, Innovation, and Governance. Blending quantitative engineering rigor with robust public administration frameworks.
              </motion.p>

              {/* Elastic Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <GoldBarButton
                  variant="solid-ingot"
                  size="lg"
                  hallmark="CEO"
                  onClick={() => {
                    audioEngine.playSwoosh();
                    setIsConsultOpen(true);
                  }}
                  icon={<ArrowRight className="w-4 h-4 text-slate-950" />}
                  iconPosition="right"
                >
                  Connect With CEO
                </GoldBarButton>
                <GoldBarButton
                  variant="obsidian-ingot"
                  size="lg"
                  hallmark="SOLUTIONS"
                  onClick={() => navigate('/services')}
                  icon={<Compass className="w-4 h-4 mr-2 text-amber-300" />}
                  iconPosition="left"
                >
                  Explore AuMDS Solutions
                </GoldBarButton>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 2: BRAND & PROMOTIONAL PORTFOLIOS CAROUSEL */}
        <SectionScrollAnimation className="section-aura-amber p-8 sm:p-12 rounded-3xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 text-amber-300 text-xs font-mono uppercase tracking-widest mb-2 border border-amber-400/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Brand & Promotional Portfolios</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                AuMDS Visual Ecosystem & Brand Showcases
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400 max-w-sm">
              Showcase featuring high-end brand identities, packaging lines, and digital deliverables.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BRAND_SHOWCASE_ITEMS.map((item, idx) => (
              <ElasticTiltCard key={idx} glowColor="rgba(245, 158, 11, 0.35)">
                <div className="h-80 rounded-3xl bg-slate-900/80 border border-white/10 overflow-hidden relative group flex flex-col justify-end p-6 shadow-2xl">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent" />
                  <div className="relative z-10 space-y-2">
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-400/30 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold">
                      {item.tag}
                    </span>
                    <h4 className="text-white font-bold text-lg font-display">{item.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">{item.desc}</p>
                  </div>
                </div>
              </ElasticTiltCard>
            ))}
          </div>
        </SectionScrollAnimation>

        {/* SECTION 3: EXECUTIVE SUMMARY / ABOUT ME */}
        <SectionScrollAnimation className="section-aura-cyan p-8 sm:p-12 rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-3 flex lg:flex-col items-start lg:items-end justify-between border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2 block font-bold">
                  01 / PROFILE
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">Executive Summary</h2>
              </div>
              <div className="hidden lg:block mt-12 text-right">
                <span className="[writing-mode:vertical-rl] text-6xl font-black text-slate-800 tracking-tighter uppercase select-none">
                  ABOUT
                </span>
              </div>
            </div>

            <div className="lg:col-span-9 space-y-6">
              <div className="bg-slate-900/80 p-8 rounded-2xl border border-white/10 shadow-xl backdrop-blur-xl space-y-6">
                <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                  I am an entrepreneur and systems strategist combining <span className="text-amber-400 font-semibold">quantitative engineering principles</span> with public administration frameworks to build sustainable, scalable business architectures. As the Founder and CEO of <strong className="text-white">Au Multidimensional Solutions Pvt. Ltd. (AuMDS)</strong>, I lead an initiative focused on end-to-end corporate solutions—helping enterprises from bootstrapping solopreneurs to venture-backed companies streamline operations, automate workflows, and scale effectively.
                </p>
                <div className="p-6 rounded-xl bg-slate-950/90 border-l-4 border-amber-400 shadow-lg">
                  <p className="text-slate-300 italic text-sm sm:text-base leading-relaxed">
                    "My approach merges structured legal/financial compliance, software development, institutional policy design, and brand storytelling into an integrated operational engine."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SectionScrollAnimation>

        {/* SECTION 4: CORE COMPETENCIES & AREAS OF EXPERTISE */}
        <SectionScrollAnimation className="section-aura-indigo p-8 sm:p-12 rounded-3xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 mb-10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">02 / CAPABILITIES</span>
              <h2 className="text-3xl font-extrabold text-white mt-1 font-display">Core Competencies & Expertise</h2>
            </div>
            <p className="text-slate-400 text-xs font-mono mt-2 md:mt-0">
              Multidisciplinary mastery across engineering & governance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Building2,
                title: 'Corporate Architecture & Governance',
                desc: 'Business model design, Standard Operating Procedure (SOP) construction, organizational structuring, and BPO operations.',
              },
              {
                icon: Landmark,
                title: 'Public Policy & Institutional Strategy',
                desc: 'Applying administrative policy frameworks and legal governance to corporate processes and statutory frameworks.',
              },
              {
                icon: Code2,
                title: 'Software Solutions & Automation',
                desc: 'Custom web engines, mobile applications, cloud platforms (SaaS), CRM, POS systems, and process automation.',
              },
              {
                icon: Palette,
                title: 'Brand Strategy & Digital Media',
                desc: 'Multi-channel digital marketing, visual identity design, media production, and narrative strategy.',
              },
              {
                icon: FileSpreadsheet,
                title: 'Financial & Regulatory Compliance',
                desc: 'Incorporation governance, tax administration (GST/IT/TDS), payroll structuring, and audit compliance.',
                colSpan: 'md:col-span-2',
              },
            ].map((comp, i) => {
              const CompIcon = comp.icon;
              return (
                <ElasticTiltCard key={i} className={comp.colSpan || ''}>
                  <div className="bg-slate-900/70 p-7 rounded-3xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300 space-y-4 backdrop-blur-xl h-full shadow-lg">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center text-amber-400 text-xl shadow-md">
                      <CompIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white font-display">{comp.title}</h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">{comp.desc}</p>
                  </div>
                </ElasticTiltCard>
              );
            })}
          </div>
        </SectionScrollAnimation>

        {/* SECTION 5: PROFESSIONAL EXPERIENCE & LEADERSHIP */}
        <SectionScrollAnimation className="section-aura-amber p-8 sm:p-12 rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3 flex lg:flex-col items-start lg:items-end justify-between border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2 block font-bold">
                  03 / LEADERSHIP
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">Professional Experience</h2>
              </div>
              <div className="hidden lg:block mt-12 text-right">
                <span className="[writing-mode:vertical-rl] text-6xl font-black text-slate-800 tracking-tighter uppercase select-none">
                  LEAD
                </span>
              </div>
            </div>

            <div className="lg:col-span-9 space-y-8">
              <div className="bg-slate-900/80 p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-2xl">
                <div className="absolute top-0 right-0 px-4 py-2 bg-amber-500/10 text-amber-300 font-mono text-xs rounded-bl-2xl border-l border-b border-amber-400/30 font-bold">
                  2020 – PRESENT
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">Founder & Chief Executive Officer</h3>
                  <p className="text-amber-400 font-mono text-sm font-semibold">Au Multidimensional Solutions Pvt. Ltd. (AuMDS)</p>
                  <p className="text-xs text-slate-400 font-mono">
                    Incorporated February 2024 | CIN: U85499KA2024PTC185494 | Kengeri Satellite Town, Bengaluru, KA
                  </p>
                </div>

                <div className="border-t border-white/10 pt-6 space-y-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono">
                    Key Responsibilities & Achievements:
                  </h4>
                  <ul className="space-y-3 text-slate-200 text-xs sm:text-sm font-normal">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>Formulated and executed the company’s core service portfolio across five key dimensions: Corporate Solutions, Software Engineering, Branding, Digital Marketing, and Financial/Legal Compliance.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>Designed tailored corporate scaling frameworks supporting various business growth profiles: Organically Bootstrapping, Slow Scaling, Fast Scaling, and Blitz Scaling.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>Built cross-functional teams spanning software development, AI/ML implementation, legal compliance, and media production.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </SectionScrollAnimation>

        {/* SECTION 6: ECOSYSTEM & FLAGSHIP INITIATIVES */}
        <SectionScrollAnimation className="section-aura-cyan p-8 sm:p-12 rounded-3xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 mb-10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">04 / INITIATIVES</span>
              <h2 className="text-3xl font-extrabold text-white mt-1 font-display">Ecosystem & Flagship Divisions</h2>
            </div>
            <p className="text-slate-400 text-xs font-mono mt-2 md:mt-0">
              Specialized enterprise divisions under AuMDS leadership
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                badge: 'SKILL DEVELOPMENT',
                title: 'Skill Development Wing (SDW)',
                desc: 'Internal upskilling engine providing live technical training and professional development to ensure high service standards.',
                icon: GraduationCap,
              },
              {
                badge: 'TALENT PROGRAM',
                title: 'TRIAD Internship Program',
                desc: 'Practical talent development platform providing hands-on project experience in AI/ML, full-stack software development, and creative design.',
                icon: Code2,
              },
              {
                badge: 'NETWORKING',
                title: 'SatChai Founder Guild',
                desc: 'B2B networking and ecosystem-building event series connecting local entrepreneurs and enterprise clients.',
                icon: Globe,
              },
              {
                badge: 'MEDIA & CREATIVE',
                title: 'HIGHLITZ Media',
                desc: 'Media and creative storytelling division managing visual branding, video production, and digital identity.',
                icon: Palette,
              },
            ].map((init, idx) => {
              const InitIcon = init.icon;
              return (
                <ElasticTiltCard key={idx}>
                  <div className="bg-slate-900/70 p-8 rounded-3xl border border-white/10 hover:border-cyan-500/50 transition-all space-y-4 group backdrop-blur-xl h-full shadow-lg">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-cyan-950 text-cyan-300 border border-cyan-500/30 rounded-full text-xs font-mono uppercase tracking-wider font-bold">
                        {init.badge}
                      </span>
                      <InitIcon className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-xl font-bold text-white font-display">{init.title}</h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">{init.desc}</p>
                  </div>
                </ElasticTiltCard>
              );
            })}
          </div>
        </SectionScrollAnimation>

        {/* SECTION 7: EDUCATIONAL CREDENTIALS */}
        <SectionScrollAnimation className="section-aura-indigo p-8 sm:p-12 rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3 flex lg:flex-col items-start lg:items-end justify-between border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 block font-bold">
                  05 / CREDENTIALS
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">Educational Background</h2>
              </div>
              <div className="hidden lg:block mt-12 text-right">
                <span className="[writing-mode:vertical-rl] text-6xl font-black text-slate-800 tracking-tighter uppercase select-none">
                  EDUCATION
                </span>
              </div>
            </div>

            <div className="lg:col-span-9 space-y-4">
              {[
                {
                  title: 'Master of Public Administration (MPA)',
                  institution: 'Indira Gandhi National Open University (IGNOU)',
                  focus: 'Administrative Systems, Governance Frameworks, and Public Policy',
                  years: '2018 – 2020',
                },
                {
                  title: 'Competitive Civil Services Governance Coursework',
                  institution: 'Shankar IAS Academy (2017 – 2018) & Achievers IAS Academy (2016 – 2017)',
                  focus: 'Rigorous preparation focusing on polity, administrative governance, and constitutional frameworks',
                  years: '2016 – 2018',
                },
                {
                  title: 'Bachelor of Technology (BTech in Engineering)',
                  institution: 'Visvesvaraya Technological University (VTU)',
                  focus: 'Engineering Logic, Systems Optimization, and Quantitative Problem Solving',
                  years: '2012 – 2016',
                },
              ].map((edu, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/80 p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 backdrop-blur-xl shadow-lg"
                >
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white font-display">{edu.title}</h3>
                    <p className="text-amber-400 text-xs font-mono font-semibold">{edu.institution}</p>
                    <p className="text-slate-300 text-xs font-normal">{edu.focus}</p>
                  </div>
                  <span className="px-3.5 py-1.5 rounded-full bg-slate-950 text-cyan-300 font-mono text-xs border border-white/10 font-bold shrink-0">
                    {edu.years}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </SectionScrollAnimation>

        {/* SECTION 8: PUBLISHED WORKS & BOOKS */}
        <SectionScrollAnimation className="section-aura-amber p-8 sm:p-14 rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-3 flex lg:flex-col items-start lg:items-end justify-between border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2 block font-bold">
                  06 / AUTHOR & WRITER
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">Published Works & Books</h2>
              </div>
              <div className="hidden lg:block mt-12 text-right">
                <span className="[writing-mode:vertical-rl] text-6xl font-black text-slate-800 tracking-tighter uppercase select-none">
                  BOOKS
                </span>
              </div>
            </div>

            <div className="lg:col-span-9 space-y-8">
              <div className="bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-8 sm:p-10 rounded-3xl border border-amber-500/30 shadow-2xl flex flex-col md:flex-row gap-8 items-center backdrop-blur-2xl">
                {/* Simulated Luxury 3D Book Cover Card */}
                <ElasticTiltCard glowColor="rgba(245, 158, 11, 0.45)">
                  <div className="w-full md:w-56 h-72 bg-gradient-to-tr from-slate-950 via-slate-900 to-amber-950/60 rounded-2xl border border-amber-400/40 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group shrink-0">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
                    <div className="space-y-2 relative z-10">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                        AUTHORED PUBLICATION
                      </span>
                      <h4 className="text-white font-extrabold text-lg leading-tight font-display">
                        Systems, Governance & Enterprise
                      </h4>
                    </div>
                    <div className="relative z-10 border-t border-slate-700/60 pt-4">
                      <p className="text-xs text-slate-300 font-semibold">Shivaprasad Aum</p>
                      <p className="text-[10px] text-amber-400 font-mono">AuMDS Publications</p>
                    </div>
                  </div>
                </ElasticTiltCard>

                {/* Book Details & Description */}
                <div className="space-y-4 flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-mono border border-amber-400/20">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Literary & Strategic Contribution</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display">
                    Architecting the Modern Enterprise: Technology Meets Public Policy
                  </h3>
                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-normal">
                    Authored by Shivaprasad Aum, this comprehensive publication bridges quantitative systems design with robust administrative governance. It offers deep insights into scaling businesses organically, managing regulatory compliance under Indian corporate laws, and integrating software workflows into traditional business models.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono text-amber-400">
                    <span className="px-3 py-1 bg-slate-900 rounded-lg border border-white/10 font-bold">
                      ISBN / Digital Edition
                    </span>
                    <span className="px-3 py-1 bg-slate-900 rounded-lg border border-white/10 font-bold">
                      Governance & Strategy
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionScrollAnimation>

        {/* SECTION 9: EXECUTIVE DIRECT CONTACT */}
        <SectionScrollAnimation className="section-aura-cyan p-8 sm:p-12 rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3 flex lg:flex-col items-start lg:items-end justify-between border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 block font-bold">
                  07 / CONNECT
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">Corporate Headquarters</h2>
              </div>
              <div className="hidden lg:block mt-12 text-right">
                <span className="[writing-mode:vertical-rl] text-6xl font-black text-slate-800 tracking-tighter uppercase select-none">
                  CONTACT
                </span>
              </div>
            </div>

            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/80 p-8 rounded-3xl border border-white/10 space-y-6 backdrop-blur-xl">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 font-display">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <span>Corporate Headquarters</span>
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                  Au Multidimensional Solutions Pvt. Ltd.<br />
                  #769, 2nd Floor, Prema Enclave, 1st Main, Outer Ring Rd,<br />
                  Kengeri Satellite Town, Bengaluru, Karnataka 560060
                </p>
                
                <div className="border-t border-white/10 pt-4 space-y-2 text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <span>contact@aumdsorg.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>+91 7019134445</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/80 p-8 rounded-3xl border border-white/10 space-y-6 backdrop-blur-xl flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 font-display">
                    <Clock className="w-5 h-5 text-cyan-400" />
                    <span>Executive Consultation</span>
                  </h3>
                  
                  <div className="space-y-3 text-xs font-mono mt-4 text-slate-300">
                    <div>
                      <span className="text-amber-400 block font-bold">IN-PERSON (OFFLINE)</span>
                      <span>Monday – Friday | 10:00 AM – 6:00 PM IST</span>
                    </div>
                    <div>
                      <span className="text-cyan-400 block font-bold">VIRTUAL (ONLINE)</span>
                      <span>Monday – Friday | 12:00 PM – 5:00 PM IST</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => {
                    audioEngine.playSwoosh();
                    setIsConsultOpen(true);
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold text-xs font-mono uppercase tracking-wider rounded-full shadow-lg shadow-amber-500/20"
                >
                  Schedule CEO Consultation →
                </motion.button>
              </div>
            </div>
          </div>
        </SectionScrollAnimation>

      </div>

      <ConsultationModal isOpen={isConsultOpen} onClose={() => setIsConsultOpen(false)} />
    </div>
  );
};
