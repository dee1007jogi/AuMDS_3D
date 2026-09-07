import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplitTextHeading } from '../components/SplitTextHeading';
import { MagneticGlowButton } from '../components/MagneticGlowButton';
import { ConsultationModal } from '../components/ConsultationModal';
import { SectionScrollAnimation } from '../components/SectionScrollAnimation';
import { ElasticTiltCard } from '../components/ElasticTiltCard';
import { Compass, Sparkles, Target, Lightbulb, Users, ArrowRight, ShieldCheck, Rocket, Award, Globe, Building2, CheckCircle2 } from 'lucide-react';
import { audioEngine } from '../components/AudioEngine';
import { useNavigate } from 'react-router-dom';

interface Milestone {
  year: string;
  badge: string;
  title: string;
  desc: string;
  deliverables: string[];
}

const TIMELINE_MILESTONES: Milestone[] = [
  {
    year: '2020',
    badge: 'COSMIC GENESIS',
    title: 'Foundational Genesis & Vision',
    desc: 'The conceptualization of Au Multidimensional Solutions — establishing the philosophy of "Co-creating the Universe of Brands" to unify software, identity, and venture strategy.',
    deliverables: ['Core Matrix Blueprint', 'Initial Research Labs', 'First 10 Venture Prototypes'],
  },
  {
    year: '2021 - 2022',
    badge: 'PILOT ECOSYSTEMS',
    title: 'Incubation of Skill Development Wing (SDW)',
    desc: 'Launched experimental student developer cohorts, bridging collegiate theoretical knowledge with high-intensity corporate software sprints.',
    deliverables: ['First 100 Engineers Mentored', 'Open Source Tooling', 'Bengaluru Pilot Meetups'],
  },
  {
    year: '2023 - 2024',
    badge: 'INSTITUTIONAL EXPANSION',
    title: 'Formal Incorporation & SatChai Guild Rollout',
    desc: 'AuMDS formally established headquarters in Bengaluru. Structured the official TRIAD Internship Accelerator and inaugurated the SatChai Founder Roundtables.',
    deliverables: ['MCA & Legal Formalization', '50+ Corporate Deliverables', 'SatChai Global Guild Inception'],
  },
  {
    year: '2025 - 2026',
    badge: 'MULTIVERSE SCALE',
    title: '3D Spatial WebXR & Global Conglomerate Reach',
    desc: 'Deploying spatial WebXR universes, high-concurrency cloud micro-architectures, and end-to-end corporate ecosystems across India, Southeast Asia, and global markets.',
    deliverables: ['WebXR & AI Data Engines', '500+ TRIAD Graduates', 'Multi-Scale Brand Portfolios'],
  },
];

interface HallOfFameBrand {
  name: string;
  category: string;
  tagline: string;
  metric: string;
  color: string;
}

const HALL_OF_FAME_BRANDS: HallOfFameBrand[] = [
  {
    name: 'TRIAD Incubation Core',
    category: 'Talent Engine',
    tagline: 'Autonomous student-developer cohort delivering commercial-grade web products.',
    metric: '500+ Engineers Upskilled',
    color: 'from-cyan-400 to-blue-500',
  },
  {
    name: 'SatChai Founder Guild',
    category: 'Venture Network',
    tagline: 'High-leverage recurring networking roundtables uniting founders and investors.',
    metric: '25+ Roundtables Hosted',
    color: 'from-amber-400 to-orange-500',
  },
  {
    name: 'OmniCloud Microservices',
    category: 'Deep-Tech Platform',
    tagline: 'Ultra-low latency micro-frontend and distributed edge architecture.',
    metric: '99.99% High Availability',
    color: 'from-indigo-400 to-violet-500',
  },
  {
    name: 'Nexus Brand Universes',
    category: 'Spatial Design',
    tagline: 'Holistic 3D brand guidelines and high-converting WebXR spatial web portals.',
    metric: '40+ Brands Transformed',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    name: 'Statutory Corporate Registry',
    category: 'Legal & Entity',
    tagline: 'End-to-end institutional incorporation, trademark filing, and tax structuring.',
    metric: '100% Compliance Record',
    color: 'from-pink-400 to-rose-500',
  },
  {
    name: 'Venture Capital Syndicates',
    category: 'Dealflow Guild',
    tagline: 'Curated investor introduction pipeline for seed and Series A scaleups.',
    metric: '$10M+ Ecosystem Pipeline',
    color: 'from-yellow-400 to-amber-600',
  },
];

export const AboutPage: React.FC = () => {
  const [activeMilestone, setActiveMilestone] = useState(3);
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative pt-32 pb-24 z-10 font-sans space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* SECTION 1: HERO VIEWPORT & CINEMATIC ORIGIN */}
        <section className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/40 bg-slate-900/70 backdrop-blur-xl w-fit mb-6 shadow-2xl"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase font-bold">
              COSMIC ORIGIN // ESTABLISHED 2020
            </span>
          </motion.div>

          <SplitTextHeading
            as="h1"
            text="Architecting the Universe of Brands"
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-display leading-[1.06]"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal"
          >
            AuMDS (Au Multidimensional Solutions Pvt Ltd) was founded on a singular conviction: modern business growth requires a synchronized multidimensional approach. We eliminate the friction between deep software engineering, brand identity, strategic expansion, and talent incubation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.06, y: -2, transition: { type: 'spring', stiffness: 450, damping: 12 } }}
              whileTap={{ scale: 0.92 }}
              onClick={() => {
                audioEngine.playSwoosh();
                setIsConsultOpen(true);
              }}
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-amber-400 text-slate-950 font-extrabold text-xs font-mono uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-500/30"
            >
              <Sparkles className="w-4 h-4" />
              <span>Let Us Grow Our Businesses Together</span>
            </motion.button>
            <MagneticGlowButton variant="secondary" onClick={() => navigate('/services')}>
              Explore Capabilities
            </MagneticGlowButton>
          </motion.div>
        </section>

        {/* SECTION 2: 3D TIMELINE MILESTONE BEADS (2020 - 2026) */}
        <SectionScrollAnimation className="section-aura-cyan p-8 sm:p-12 rounded-3xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">
              CHRONOLOGY & EXPANSION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display mt-1">
              The Evolution Timeline
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-2">
              Click each milestone bead to view the breakthroughs and deliverables of that era.
            </p>
          </div>

          {/* Timeline Beads Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {TIMELINE_MILESTONES.map((m, idx) => {
              const isActive = activeMilestone === idx;
              return (
                <motion.button
                  key={m.year}
                  whileHover={{ scale: 1.04, y: -3, transition: { type: 'spring', stiffness: 450, damping: 12 } }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => {
                    audioEngine.playClick();
                    setActiveMilestone(idx);
                  }}
                  onMouseEnter={() => audioEngine.playHover()}
                  className={`p-6 rounded-3xl border text-left transition-all duration-300 backdrop-blur-xl ${
                    isActive
                      ? 'bg-[#0F172A] border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.35)] ring-1 ring-cyan-400'
                      : 'bg-[#0A0F1D]/70 border-white/10 hover:border-cyan-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-extrabold font-mono text-cyan-400">{m.year}</span>
                    <span className="text-[9px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full font-bold border border-amber-400/20">
                      {m.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-sm line-clamp-1">{m.title}</h3>
                </motion.button>
              );
            })}
          </div>

          {/* Active Milestone Card with Slide Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMilestone}
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-extrabold font-mono text-amber-400">
                      {TIMELINE_MILESTONES[activeMilestone].year}
                    </span>
                    <span className="text-xs font-mono px-3.5 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-bold">
                      {TIMELINE_MILESTONES[activeMilestone].badge}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                    {TIMELINE_MILESTONES[activeMilestone].title}
                  </h3>
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
                    {TIMELINE_MILESTONES[activeMilestone].desc}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-950/90 border border-white/10 space-y-3 shadow-xl">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block font-bold">
                    Historic Deliverables:
                  </span>
                  {TIMELINE_MILESTONES[activeMilestone].deliverables.map((d, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </SectionScrollAnimation>

        {/* SECTION 3: HALL OF FAME GALAXY GALLERY */}
        <SectionScrollAnimation className="section-aura-indigo p-8 sm:p-12 rounded-3xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block font-mono">
              CO-CREATED ECOSYSTEMS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display mt-1">
              Hall of Fame Galaxy Gallery
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-2">
              Approved brands, proprietary accelerators, and institutional platforms thriving within the AuMDS Universe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HALL_OF_FAME_BRANDS.map((brand, idx) => (
              <ElasticTiltCard
                key={brand.name}
                glowColor="rgba(56, 189, 248, 0.3)"
                className="cursor-pointer"
              >
                <div className="p-7 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between h-full shadow-lg">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 font-bold">
                        {brand.category}
                      </span>
                      <span className="text-xs font-mono text-amber-400 font-bold">
                        {brand.metric}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white font-display mb-2">{brand.name}</h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">{brand.tagline}</p>
                  </div>

                  <div className="mt-6 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>GALAXY NODE #{idx + 1}</span>
                    <span className="text-cyan-400 font-semibold">ACTIVE & VERIFIED</span>
                  </div>
                </div>
              </ElasticTiltCard>
            ))}
          </div>
        </SectionScrollAnimation>

        {/* SECTION 4: PROCESS PIPELINE */}
        <SectionScrollAnimation className="section-aura-amber p-8 sm:p-12 rounded-3xl">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase font-mono">METHODOLOGY PIPELINE</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 font-display">
              From Concept to Autonomous Scale
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-2">
              Our 4-step delivery pipeline engineered for high-concurrency software and unified brand ecosystems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'Deep Discovery', desc: 'Architecture specification, unit economics, regulatory planning, and technical roadmap.' },
              { step: '02', title: 'Universe Design', desc: 'Spatial 3D identity, interactive UI tokens, and multi-channel brand positioning.' },
              { step: '03', title: 'Rapid Engineering', desc: 'Agile sprints deploying React, Next.js, WebGL, AI pipelines, and microservices.' },
              { step: '04', title: 'Guild Acceleration', desc: 'Plugging into SatChai networking, TRIAD squad scaling, and ongoing telemetry.' },
            ].map((p) => (
              <motion.div
                key={p.step}
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-6 rounded-3xl bg-slate-900/70 border border-white/10 shadow-lg backdrop-blur-xl"
              >
                <span className="text-xs font-mono text-amber-400 font-bold">PHASE {p.step}</span>
                <h3 className="text-base font-bold text-white mt-1 mb-2 font-display">{p.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </SectionScrollAnimation>

        {/* SECTION 5: FINAL CLOSING CTA */}
        <SectionScrollAnimation className="text-center py-16 px-6 sm:px-12 rounded-3xl bg-gradient-to-b from-[#0F172A] to-[#030712] border border-cyan-500/40 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>THE FUTURE IS CO-CREATED</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
              Let Us Grow Our Businesses Together
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Whether you are scaling an enterprise, registering a startup, or cultivating an elite engineering squad, AuMDS is your multidimensional co-creation partner.
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.06, y: -2, transition: { type: 'spring', stiffness: 450, damping: 12 } }}
                whileTap={{ scale: 0.92 }}
                onClick={() => {
                  audioEngine.playSwoosh();
                  setIsConsultOpen(true);
                }}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-amber-400 text-slate-950 font-extrabold text-xs font-mono uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-500/30"
              >
                <Sparkles className="w-4 h-4" />
                <span>Initialize Free Consultation</span>
              </motion.button>
            </div>
          </div>
        </SectionScrollAnimation>

      </div>

      <ConsultationModal isOpen={isConsultOpen} onClose={() => setIsConsultOpen(false)} />
    </div>
  );
};
