import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, FileCheck, Palette, Network, Compass, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { audioEngine } from './AudioEngine';

interface JourneyStage {
  step: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  description: string;
  deliverables: string[];
  metrics: string;
}

const JOURNEY_STAGES: JourneyStage[] = [
  {
    step: '01',
    title: 'Idea Genesis',
    subtitle: 'Discovery & Feasibility Matrix',
    icon: Lightbulb,
    color: 'from-amber-400 to-yellow-500',
    description: 'Transforming abstract concepts into rigorous business models, market telemetry, and tech stack roadmaps.',
    deliverables: ['TAM/SAM Market Analysis', 'Tech Architecture Blueprint', 'Unit Economic Models', 'MVP Specifications'],
    metrics: '2-3 Weeks Velocity',
  },
  {
    step: '02',
    title: 'Incorporation & Legal',
    subtitle: 'Institutional Entity Setup',
    icon: FileCheck,
    color: 'from-cyan-400 to-blue-500',
    description: 'Full statutory registration, founding agreements, trademark protection, and institutional banking clearance.',
    deliverables: ['MCA/Registrar Compliance', 'Trademark Filing', 'Founder Equity Vesting', 'GST & Regulatory Structuring'],
    metrics: '100% Compliant Setup',
  },
  {
    step: '03',
    title: 'Brand Engineering',
    subtitle: 'Universe Identity & UI/UX',
    icon: Palette,
    color: 'from-fuchsia-400 to-pink-500',
    description: 'Constructing unified 3D brand guidelines, high-conversion WebXR digital portals, and corporate storytelling.',
    deliverables: ['Design System Tokens', 'Next.js 3D Web Engine', 'Pitch Deck Assets', 'Multi-Channel Collateral'],
    metrics: 'Top 1% Visual Polish',
  },
  {
    step: '04',
    title: 'SatChai Network',
    subtitle: 'Venture & Partner Guild',
    icon: Network,
    color: 'from-emerald-400 to-teal-500',
    description: 'Plugging the business into the SatChai ecosystem for founder roundtables, investor intros, and vendor channels.',
    deliverables: ['Investor Pitch Syndicate', 'SatChai Guild Membership', 'Enterprise Client Intros', 'Pilot Co-creation'],
    metrics: 'Direct Dealflow Access',
  },
  {
    step: '05',
    title: 'Sustain & Scale',
    subtitle: 'TRIAD Talent & DevOps Scale',
    icon: Compass,
    color: 'from-indigo-400 to-violet-500',
    description: 'Deploying dedicated TRIAD incubation engineering squads and ongoing cloud telemetry for exponential growth.',
    deliverables: ['Dedicated TRIAD Squads', '24/7 SRE Observability', 'AI/ML Feature Pipelines', 'Series A/B Scaling Prep'],
    metrics: 'Autonomous Velocity',
  },
];

export const BusinessJourneyPath: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/40 text-cyan-300 text-xs font-semibold mb-3 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>LIFECYCLE CONTINUUM</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight">
          The 5-Stage Business Journey Path
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base">
          From first spark of inspiration to institutional sustainability and exponential scale.
        </p>
      </div>

      {/* Horizontal Interactive Timeline Bar with Elastic Physics */}
      <div className="relative mb-12">
        {/* Background Glowing Connecting Path */}
        <div className="hidden md:block absolute top-1/2 left-8 right-8 h-1 bg-slate-800 -translate-y-1/2 z-0 rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 via-amber-400 to-indigo-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${(activeStage / (JOURNEY_STAGES.length - 1)) * 100}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
        </div>

        {/* Stage Nodes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 relative z-10">
          {JOURNEY_STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isActive = activeStage === idx;

            return (
              <motion.button
                key={stage.step}
                whileHover={{
                  scale: 1.05,
                  y: -4,
                  transition: { type: 'spring', stiffness: 450, damping: 12 },
                }}
                whileTap={{
                  scale: 0.94,
                  transition: { type: 'spring', stiffness: 600, damping: 15 },
                }}
                onClick={() => {
                  audioEngine.playClick();
                  setActiveStage(idx);
                }}
                onMouseEnter={() => audioEngine.playHover()}
                className={`flex flex-col items-center text-center p-5 rounded-3xl border transition-all duration-300 ${
                  isActive
                    ? 'bg-[#0A2540] border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.35)] ring-1 ring-cyan-400'
                    : 'bg-[#060D1F]/80 border-slate-800/80 hover:border-slate-700 hover:bg-[#0A2540]/40'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 shadow-lg transition-transform ${
                    isActive ? `bg-gradient-to-br ${stage.color} text-slate-950 scale-110 shadow-cyan-500/30` : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  STAGE {stage.step}
                </span>
                <span className="text-sm font-bold text-white mt-1">{stage.title}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Detailed Slide Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, x: 25, filter: 'blur(6px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: -25, filter: 'blur(6px)' }}
          transition={{ type: 'spring', stiffness: 350, damping: 22 }}
          className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0A2540]/90 to-[#060D1F]/90 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
                  STAGE {JOURNEY_STAGES[activeStage].step} // ACCELERATION
                </span>
                <span className="text-xs font-mono text-amber-400 font-semibold">
                  Velocity: {JOURNEY_STAGES[activeStage].metrics}
                </span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
                {JOURNEY_STAGES[activeStage].title}
              </h3>
              <p className="text-sm font-semibold text-cyan-400">
                {JOURNEY_STAGES[activeStage].subtitle}
              </p>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                {JOURNEY_STAGES[activeStage].description}
              </p>
            </div>

            {/* Key Deliverables Matrix */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3.5 shadow-xl">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                Key Phase Deliverables
              </h4>
              <div className="space-y-2.5">
                {JOURNEY_STAGES[activeStage].deliverables.map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 3 }}
                    className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200"
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
