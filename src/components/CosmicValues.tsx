import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Sparkles, HeartHandshake, Cog, TrendingUp, Users, Award, CheckCircle2, RefreshCw, Layers, Leaf } from 'lucide-react';
import { audioEngine } from './AudioEngine';
import { ElasticTiltCard } from './ElasticTiltCard';
import { RockGoldText } from './RockGoldText';

interface ValueNode {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  desc: string;
}

const VALUES: ValueNode[] = [
  {
    title: 'Quality of Service',
    subtitle: '24K Enterprise Standard',
    icon: Award,
    color: 'from-amber-400 to-yellow-500',
    desc: 'Delivering pristine, enterprise-grade outputs with rigorous gold-standard execution across software code, branding, and corporate strategy.',
  },
  {
    title: 'Trust',
    subtitle: 'Radical Transparency',
    icon: ShieldCheck,
    color: 'from-cyan-400 to-blue-500',
    desc: 'Upholding unwavering integrity, robust data governance, and long-term fiduciary alignment with founders and partners.',
  },
  {
    title: 'Accountability',
    subtitle: 'End-to-End Ownership',
    icon: CheckCircle2,
    color: 'from-emerald-400 to-teal-500',
    desc: 'Taking total responsibility from the initial line of code to regulatory MCA compliance, statutory filings, and continuous system uptime.',
  },
  {
    title: 'Client Satisfaction',
    subtitle: 'Exceeding Expectations',
    icon: HeartHandshake,
    color: 'from-pink-400 to-rose-500',
    desc: 'Walking alongside founders as dedicated co-creators, prioritizing measurable ROI, high conversion rates, and long-term satisfaction.',
  },
  {
    title: 'Teamwork',
    subtitle: 'Unified Synergy',
    icon: Users,
    color: 'from-indigo-400 to-purple-500',
    desc: 'Fostering seamless collaboration between seasoned enterprise architects, creative directors, and rising TRIAD developer squads.',
  },
  {
    title: 'Adaptability',
    subtitle: 'Continuous Evolution',
    icon: RefreshCw,
    color: 'from-sky-400 to-cyan-500',
    desc: 'Rapidly embracing technological shifts in artificial intelligence, spatial 3D WebXR, and modern global market dynamics.',
  },
  {
    title: 'Versatility',
    subtitle: 'Multidimensional Scope',
    icon: Layers,
    color: 'from-purple-400 to-fuchsia-500',
    desc: 'Delivering holistic, full-lifecycle corporate capabilities under one roof — spanning deep-tech, brand design, legal, and venture networking.',
  },
  {
    title: 'Sustainability',
    subtitle: 'Generational Longevity',
    icon: Leaf,
    color: 'from-emerald-400 to-green-500',
    desc: 'Identifying operational voids, diagnosing root challenges, and creating resilient business frameworks engineered for enduring market success.',
  },
];

export const CosmicValues: React.FC = () => {
  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center max-w-4xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/40 border border-amber-400/30 text-amber-300 text-xs font-mono font-bold mb-3 shadow-lg shadow-amber-950/30">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>✦ OUR 8 FOUNDATIONAL CORPORATE PILLARS</span>
        </div>
        
        <RockGoldText
          as="h2"
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight leading-tight"
        >
          The 8 Guiding Principles of AuMDS
        </RockGoldText>
        <p className="mt-3 text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          An organization that provides multidimensional solutions anchored on quality, trust, accountability, client satisfaction, and sustainability.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {VALUES.map((val, idx) => {
          const Icon = val.icon;

          return (
            <ElasticTiltCard
              key={val.title}
              glowColor="rgba(56, 189, 248, 0.25)"
              className="h-full cursor-pointer"
            >
              <div className="p-6 sm:p-7 rounded-3xl bg-[#060D1F]/80 border border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between h-full">
                <div>
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 10, transition: { type: 'spring', stiffness: 450, damping: 10 } }}
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${val.color} flex items-center justify-center text-slate-950 shadow-lg mb-4`}
                  >
                    <Icon className="w-6 h-6 text-slate-950" />
                  </motion.div>
                  <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider block">
                    {val.subtitle}
                  </span>
                  <h3 className="text-lg font-bold text-white font-display mt-1">{val.title}</h3>
                  <p className="mt-2.5 text-slate-300 text-xs leading-relaxed">{val.desc}</p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>PILLAR 0{idx + 1}</span>
                  <span className="text-amber-400 font-bold">100% ALIGNED</span>
                </div>
              </div>
            </ElasticTiltCard>
          );
        })}
      </div>
    </section>
  );
};
