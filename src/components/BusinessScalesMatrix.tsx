import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Building2, Layers, Globe, Sparkles, Check, ArrowRight, UserCheck, TrendingUp, Zap } from 'lucide-react';
import { audioEngine } from './AudioEngine';
import { useNavigate } from 'react-router-dom';
import { ElasticTiltCard } from './ElasticTiltCard';
import { RockGoldText } from './RockGoldText';

interface ScaleSphere {
  id: string;
  name: string;
  stage: string;
  icon: React.ElementType;
  glowColor: string;
  badge: string;
  focus: string;
  solutions: string[];
  metrics: string[];
}

const BUSINESS_SCALES: ScaleSphere[] = [
  {
    id: 'bootstrapped',
    name: 'Organically Bootstrapped',
    stage: 'One-Man Army & Solo Founders',
    icon: UserCheck,
    glowColor: 'from-amber-400 to-orange-500',
    badge: 'STAGE 01',
    focus: 'If your business is self-funded, everything rests on the founder’s shoulders. We work shoulder-to-shoulder with you, balancing all pillars of operations, client acquisition, and lean legal foundations.',
    solutions: ['Operational Blueprinting & SOPs', 'Automated Client Funnels', 'Entity Incorporation & MCA', 'Lean Web Platform Delivery'],
    metrics: ['100% Founder Focus', 'Low Overhead Launch', 'Statutory Foundation'],
  },
  {
    id: 'slow-scaling',
    name: 'Structured Scaling Entities',
    stage: 'Bootstrapped with Gradual Funding',
    icon: TrendingUp,
    glowColor: 'from-cyan-400 to-blue-600',
    badge: 'STAGE 02',
    focus: 'As your company expands at a sustainable pace, structure becomes vital. We help you hire top performers, streamline accounting and payroll, conduct performance diagnostics, and elevate your brand.',
    solutions: ['Department Diagnostics', 'Accounting & Payroll Automation', 'SDW / TRIAD Cohort Pods', '360° Brand Refresh'],
    metrics: ['Predictable Margins', '40% Cost Efficiency', 'Standardized SOPs'],
  },
  {
    id: 'fast-scaling',
    name: 'Fast-Scaling Organizations',
    stage: 'Venture-Backed High Growth',
    icon: Rocket,
    glowColor: 'from-indigo-400 to-purple-600',
    badge: 'STAGE 03',
    focus: 'Rapid growth creates higher margins, intense competitiveness, and expanding operations. We help venture-backed companies scale cloud concurrency, deploy talent squads, and accelerate market reach.',
    solutions: ['High-Concurrency Architecture', 'Omni-Channel Digital Media', 'SatChai Growth Circles', 'Continuous Compliance Governance'],
    metrics: ['10x System Concurrency', 'Multi-Channel Reach', 'Venture-Grade SLAs'],
  },
  {
    id: 'blitz-scaling',
    name: 'Blitz-Scaling Disruptors',
    stage: 'Prioritizing Speed Over Efficiency',
    icon: Zap,
    glowColor: 'from-emerald-400 to-teal-500',
    badge: 'STAGE 04',
    focus: 'Disruptive market entrants must balance extreme speed and long-term sustainability amid uncertainty. Our rapid, robust solutions maximize success while safeguarding IP and corporate governance.',
    solutions: ['Rapid MVP & Feature Sprints', 'Zero-Trust Cloud Architecture', 'Global IP & Trademark Defense', 'Autonomous Dev Squads'],
    metrics: ['Instant Market Entry', 'Resilient Architecture', 'Global Expansion'],
  },
];

export const BusinessScalesMatrix: React.FC = () => {
  const [selectedId, setSelectedId] = useState('bootstrapped');
  const navigate = useNavigate();

  const activeScale = BUSINESS_SCALES.find((s) => s.id === selectedId) || BUSINESS_SCALES[0];
  const Icon = activeScale.icon;

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-20">
      {/* Header - Vertical Centered Stack */}
      <div className="text-center max-w-4xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/40 border border-amber-400/30 text-amber-300 text-xs font-mono font-bold mb-3 shadow-lg shadow-amber-950/30">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>✦ INTEGRATED SOLUTIONS ACROSS ALL SCALES</span>
        </div>
        
        <RockGoldText
          as="h2"
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight leading-tight"
        >
          Integrated Services Across Various Scales of Businesses
        </RockGoldText>
        <p className="mt-3 text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          From solo bootstrapping founders to venture-backed blitzscalers, discover how AuMDS calibrates solutions specifically for your corporate lifecycle stage.
        </p>
      </div>

      {/* 4 Interactive Spheres Grid - Horizontal Rail */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {BUSINESS_SCALES.map((scale) => {
          const SphereIcon = scale.icon;
          const isSelected = selectedId === scale.id;

          return (
            <ElasticTiltCard
              key={scale.id}
              onClick={() => {
                audioEngine.playClick();
                setSelectedId(scale.id);
              }}
              className="cursor-pointer"
            >
              <div
                className={`p-6 rounded-3xl border text-left transition-all duration-300 flex flex-col justify-between h-full backdrop-blur-xl ${
                  isSelected
                    ? 'bg-[#0F172A] border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.4)] ring-1 ring-cyan-400'
                    : 'bg-slate-900/60 border-white/10 hover:border-cyan-500/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${scale.glowColor} text-slate-950 shadow-md`}>
                      <SphereIcon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider">
                      {scale.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-base font-display">{scale.name}</h3>
                  <p className="text-xs font-semibold text-slate-400 mt-1">{scale.stage}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className={isSelected ? 'text-cyan-300 font-bold' : 'text-slate-500'}>
                    {isSelected ? 'ACTIVE ORBIT' : 'SELECT SCALE'}
                  </span>
                  <span className="text-slate-400">→</span>
                </div>
              </div>
            </ElasticTiltCard>
          );
        })}
      </div>

      {/* Selected Scale Detail Telemetry Box - Horizontal Split */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedId}
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
          transition={{ type: 'spring', stiffness: 350, damping: 24 }}
          className="p-6 sm:p-10 rounded-3xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono px-3.5 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-semibold">
                  {activeScale.stage}
                </span>
                <span className="text-xs font-mono text-amber-400 uppercase font-bold">
                  {activeScale.badge}
                </span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
                {activeScale.name}
              </h3>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
                {activeScale.focus}
              </p>

              {/* Targeted Solutions Grid */}
              <div className="pt-2">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 font-semibold">
                  Included Multidimensional Solutions:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeScale.solutions.map((sol, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02, x: 2 }}
                      className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-950/80 border border-white/10 text-xs text-slate-200 font-medium"
                    >
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{sol}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Scale Impact Telemetry */}
            <div className="flex flex-col justify-between p-6 rounded-2xl bg-slate-950/90 border border-white/10 shadow-xl">
              <div>
                <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-4 font-bold">
                  Calibrated Impact Telemetry
                </h4>
                <div className="space-y-3.5">
                  {activeScale.metrics.map((met, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-900 border border-white/10 flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      <span className="text-xs font-mono text-white font-bold">{met}</span>
                    </div>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, y: -2, transition: { type: 'spring', stiffness: 450, damping: 12 } }}
                whileTap={{ scale: 0.92 }}
                onClick={() => {
                  audioEngine.playSwoosh();
                  navigate('/contact');
                }}
                className="mt-6 w-full py-3.5 rounded-full bg-gradient-to-r from-cyan-400 to-amber-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                Calibrate For Your Stage
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
