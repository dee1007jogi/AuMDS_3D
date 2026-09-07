import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplitTextHeading } from '../components/SplitTextHeading';
import { SectionScrollAnimation } from '../components/SectionScrollAnimation';
import { ElasticTiltCard } from '../components/ElasticTiltCard';
import { Rocket, Users, Award, Sparkles, CheckCircle2, ArrowRight, Terminal, Globe, Send, ShieldCheck, Heart } from 'lucide-react';
import { audioEngine } from '../components/AudioEngine';

export const EcosystemPage: React.FC = () => {
  const [activeCohortTrack, setActiveCohortTrack] = useState<'fullstack' | 'webxr' | 'ai'>('fullstack');
  const [appSubmitted, setAppSubmitted] = useState(false);
  const [cohortName, setCohortName] = useState('');
  const [cohortEmail, setCohortEmail] = useState('');

  const handleCohortSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cohortName || !cohortEmail) return;
    audioEngine.playSwoosh();
    setAppSubmitted(true);
  };

  return (
    <div className="relative pt-32 pb-24 z-10 font-sans space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* SECTION 1: ECOSYSTEM HERO */}
        <section className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/40 bg-slate-900/70 backdrop-blur-xl w-fit mb-6 shadow-2xl"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase font-bold">
              TRIAD ACCELERATOR // SATCHAI GUILD
            </span>
          </motion.div>

          <SplitTextHeading
            as="h1"
            text="The Living AuMDS Ecosystem"
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-display leading-[1.06]"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal"
          >
            Connecting student-developer talent via the TRIAD Internship Program with elite founder networks and venture dealflow via the SatChai Guild.
          </motion.p>
        </section>

        {/* SECTION 2: TRIAD INTERNSHIP ACCELERATOR */}
        <SectionScrollAnimation className="section-aura-cyan p-8 sm:p-12 rounded-3xl">
          <div className="max-w-3xl mb-10">
            <div className="flex items-center gap-2 mb-2">
              <Rocket className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider font-mono">
                SKILL DEVELOPMENT WING (SDW)
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              TRIAD Internship Accelerator
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed font-normal">
              TRIAD is AuMDS's high-intensity, practical engineering accelerator for aspiring software developers. Interns do not build toys—they ship real production code for high-growth commercial ventures.
            </p>
          </div>

          {/* 3 Interactive Cohort Tracks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              {
                id: 'fullstack',
                title: 'Full-Stack Distributed Systems',
                desc: 'Next.js 14, TypeScript, Node.js, Redis, and high-concurrency microservice APIs.',
                badge: 'TRACK 01',
              },
              {
                id: 'webxr',
                title: 'Spatial 3D & WebXR Engineering',
                desc: 'Three.js, WebGL shaders, Blender assets, and immersive brand universes.',
                badge: 'TRACK 02',
              },
              {
                id: 'ai',
                title: 'AI Automation & Data Pipelines',
                desc: 'Custom LLM agents, vector embeddings, document parsers, and data engineering.',
                badge: 'TRACK 03',
              },
            ].map((track) => (
              <motion.button
                key={track.id}
                whileHover={{ scale: 1.04, y: -2, transition: { type: 'spring', stiffness: 450, damping: 12 } }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  audioEngine.playClick();
                  setActiveCohortTrack(track.id as any);
                }}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 backdrop-blur-xl ${
                  activeCohortTrack === track.id
                    ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                    : 'bg-slate-950/70 border-white/10 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span className="text-[10px] font-mono text-amber-400 font-bold block mb-1">{track.badge}</span>
                <h3 className="text-base font-bold text-white mb-2">{track.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">{track.desc}</p>
              </motion.button>
            ))}
          </div>

          {/* Track Deliverables & Cohort Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
            {[
              { label: '500+ Engineers', desc: 'Graduated & Placed' },
              { label: '100% Practical', desc: 'Zero Fluff Lectures' },
              { label: 'Direct Mentorship', desc: 'Senior Principal Tech' },
              { label: 'Certification', desc: 'Industry-Recognized' },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl bg-slate-950/80 border border-white/10 text-center">
                <span className="text-sm font-bold text-cyan-400 block font-mono">{stat.label}</span>
                <span className="text-[11px] text-slate-300 mt-0.5 block font-normal">{stat.desc}</span>
              </div>
            ))}
          </div>
        </SectionScrollAnimation>

        {/* SECTION 3: SATCHAI FOUNDER GUILD */}
        <SectionScrollAnimation className="section-aura-amber p-8 sm:p-12 rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/50 border border-amber-400/40 text-amber-300 text-xs font-semibold">
                <Users className="w-3.5 h-3.5" />
                <span>VENTURE GUILD & DEALFLOW</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                SatChai Global Founder Guild
              </h2>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
                SatChai is our flagship founder collective that transforms casual conversations over tea into million-dollar partnerships, early angel checks, and joint venture syndicates.
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  'Curated bi-weekly founder roundtables in Bengaluru & global tech hubs',
                  'Direct investor access with accredited angels and institutional VCs',
                  'Peer-to-peer masterclasses on scaling, product-market fit & hiring',
                  'Cross-industry dealflow sharing and customer introductions',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 font-normal">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-950/90 border border-white/10 space-y-4 shadow-xl">
              <span className="text-xs font-mono text-amber-400 uppercase font-bold block">
                MEMBERSHIP PRIVILEGES
              </span>
              <div className="space-y-3 text-xs font-mono text-slate-300">
                <div className="p-3 bg-slate-900 rounded-xl border border-white/10 flex justify-between">
                  <span>MEMBERSHIP TIER</span>
                  <span className="text-amber-400 font-bold">INVITE ONLY</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-white/10 flex justify-between">
                  <span>FOUNDER NETWORK</span>
                  <span className="text-cyan-300 font-bold">1,200+ LEADERS</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-white/10 flex justify-between">
                  <span>SYNDICATE ACCESS</span>
                  <span className="text-emerald-400 font-bold">ACTIVE DEALFLOW</span>
                </div>
              </div>
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.94 }}
                href="mailto:contact@aumdsorg.com?subject=SatChai%20Guild%20Nomination"
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 block text-center"
              >
                Nominate A Founder →
              </motion.a>
            </div>
          </div>
        </SectionScrollAnimation>

        {/* SECTION 4: COHORT ADMISSION TRANSMISSION */}
        <SectionScrollAnimation className="section-aura-indigo p-8 sm:p-12 rounded-3xl max-w-3xl mx-auto text-center">
          <div className="mb-6">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider font-mono">
              TRIAD NEXT COHORT ADMISSIONS
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1 font-display">
              Apply for the Next Engineering Batch
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-2 font-normal">
              Limited seats. Direct product deliverables with high career outcomes.
            </p>
          </div>

          {!appSubmitted ? (
            <form onSubmit={handleCohortSubmit} className="space-y-4 max-w-md mx-auto">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={cohortName}
                  onChange={(e) => setCohortName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-medium"
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  placeholder="Your Primary Email"
                  value={cohortEmail}
                  onChange={(e) => setCohortEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05, y: -2, transition: { type: 'spring', stiffness: 450, damping: 12 } }}
                whileTap={{ scale: 0.94 }}
                type="submit"
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-amber-400 text-slate-950 font-extrabold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <Send className="w-4 h-4" />
                Submit Cohort Application
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-6 text-center space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white">Application Received!</h4>
              <p className="text-xs text-slate-300">
                The TRIAD Admissions Team will reach out to <span className="text-cyan-400 font-semibold">{cohortEmail}</span> within 24 hours with code challenge details.
              </p>
            </motion.div>
          )}
        </SectionScrollAnimation>

      </div>
    </div>
  );
};
