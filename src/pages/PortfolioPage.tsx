import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplitTextHeading } from '../components/SplitTextHeading';
import { SectionScrollAnimation } from '../components/SectionScrollAnimation';
import { ElasticTiltCard } from '../components/ElasticTiltCard';
import { ArrowUpRight, Sparkles, FolderGit2, Star, CheckCircle } from 'lucide-react';
import { audioEngine } from '../components/AudioEngine';
import { useNavigate } from 'react-router-dom';

interface CaseStudy {
  id: string;
  category: 'software' | 'brand' | 'scaling';
  tag: string;
  title: string;
  client: string;
  metric: string;
  description: string;
  imageUrl: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-1',
    category: 'software',
    tag: 'DEEP TECH',
    title: 'Cloud Orchestration & High-Throughput Portal',
    client: 'FinVenture Core',
    metric: '99.99% UPTIME // 12ms P99',
    description: 'Constructed an edge-deployed micro-frontend architecture with real-time financial data streaming, reducing latency by 74%.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'case-2',
    category: 'brand',
    tag: 'BRAND UNIVERSE',
    title: 'End-to-End Visual Identity & Digital Incorporation',
    client: 'AuraSpatial Labs',
    metric: '3.4M IMPRESSIONS',
    description: 'Complete brand universe architecture from legal incorporation to 3D WebGL brand assets, sparking viral community traction.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'case-3',
    category: 'scaling',
    tag: 'VENTURE SCALE',
    title: 'B2B Client Funnel & Global Expansion Engine',
    client: 'Nexus Supply Hub',
    metric: '4.8X REVENUE RUN-RATE',
    description: 'Architected automated outbound lead pipelines and client acquisition frameworks that scaled operations across 4 continents.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'case-4',
    category: 'software',
    tag: 'AI AUTOMATION',
    title: 'Autonomous Multi-Agent Workflow Platform',
    client: 'OmniLogix Inc.',
    metric: '62% OPEX REDUCTION',
    description: 'Developed custom LLM orchestration pipelines automating document verification, regulatory audits, and customer support tickets.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
  },
];

export const PortfolioPage: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'software' | 'brand' | 'scaling'>('all');

  const filtered = filter === 'all' ? CASE_STUDIES : CASE_STUDIES.filter((c) => c.category === filter);

  return (
    <div className="relative pt-32 pb-24 z-10 font-sans space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* SECTION 1: PORTFOLIO HERO */}
        <section className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/40 bg-slate-900/70 backdrop-blur-xl w-fit mb-6 shadow-2xl"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase font-bold">
              CASE STUDIES & PROVEN IMPACT
            </span>
          </motion.div>

          <SplitTextHeading
            as="h1"
            text="Excellence in Production Execution"
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-display leading-[1.06]"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal"
          >
            Explore how Au Multidimensional Solutions has architected high-performance software, engineered brand universes, and accelerated revenue for visionary enterprises.
          </motion.p>
        </section>

        {/* SECTION 2: FILTER CONTROLS */}
        <div className="flex flex-wrap gap-2.5 mb-12 border-b border-white/10 pb-4 justify-center">
          {[
            { id: 'all', label: 'All Dimensions' },
            { id: 'software', label: 'Software & Tech' },
            { id: 'brand', label: 'Brand Universe' },
            { id: 'scaling', label: 'Scaling & Growth' },
          ].map((btn) => (
            <motion.button
              key={btn.id}
              whileHover={{ scale: 1.05, y: -2, transition: { type: 'spring', stiffness: 450, damping: 12 } }}
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                audioEngine.playClick();
                setFilter(btn.id as any);
              }}
              className={`px-6 py-2.5 rounded-full text-xs font-mono transition-all duration-300 backdrop-blur-xl ${
                filter === btn.id
                  ? 'bg-gradient-to-r from-cyan-400 to-amber-400 text-slate-950 font-extrabold shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                  : 'bg-[#0A0F1D]/70 text-slate-400 border border-white/10 hover:border-cyan-500/50 hover:text-white'
              }`}
            >
              {btn.label}
            </motion.button>
          ))}
        </div>

        {/* SECTION 3: CASE STUDIES GRID WITH ELASTIC CARDS */}
        <SectionScrollAnimation className="section-aura-cyan p-8 sm:p-12 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence>
              {filtered.map((study) => (
                <ElasticTiltCard key={study.id} glowColor="rgba(56, 189, 248, 0.35)">
                  <div className="rounded-3xl bg-slate-900/70 border border-white/10 overflow-hidden group hover:border-cyan-500/50 transition-colors duration-300 flex flex-col justify-between h-full backdrop-blur-xl shadow-2xl">
                    {/* Media banner */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={study.imageUrl}
                        alt={study.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-950/80 text-cyan-300 border border-cyan-500/30 font-bold">
                          {study.tag}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <span className="text-xs font-mono text-amber-400 bg-slate-950/90 px-3 py-1 rounded-md border border-white/10 font-bold">
                          {study.metric}
                        </span>
                      </div>
                    </div>

                    {/* Text Body */}
                    <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-mono text-cyan-400 uppercase font-bold">{study.client}</span>
                        <h3 className="text-2xl font-bold text-white mt-1 mb-3 font-display group-hover:text-cyan-200 transition-colors">
                          {study.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                          {study.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
                        <span className="text-xs font-mono text-slate-400">STATUS // DEPLOYED & LIVE</span>
                        <motion.button
                          whileHover={{ scale: 1.15, rotate: 45 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => navigate('/contact')}
                          className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-colors shadow-md"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </ElasticTiltCard>
              ))}
            </AnimatePresence>
          </div>
        </SectionScrollAnimation>

        {/* SECTION 4: TESTIMONIALS & PROOF */}
        <SectionScrollAnimation className="section-aura-amber p-8 sm:p-14 rounded-3xl">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono text-amber-400 uppercase font-bold">CLIENT EXPERIENCES</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 font-display">
              Endorsed by Fast-Growing Ventures
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ElasticTiltCard>
              <div className="p-7 rounded-3xl bg-slate-950/80 border border-white/10 h-full flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex text-amber-400 mb-3 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed italic mb-6 font-normal">
                    "AuMDS redesigned our entire digital architecture and brand strategy within weeks. The speed, attention to visual detail, and rock-solid engineering exceeded all expectations."
                  </p>
                </div>
                <div>
                  <span className="text-sm font-bold text-white block">Aakash Mehta</span>
                  <span className="text-xs font-mono text-cyan-400">Founder, FinVenture Labs</span>
                </div>
              </div>
            </ElasticTiltCard>

            <ElasticTiltCard>
              <div className="p-7 rounded-3xl bg-slate-950/80 border border-white/10 h-full flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex text-amber-400 mb-3 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed italic mb-6 font-normal">
                    "The TRIAD talent cohort provided us with exceptional engineers who hit the ground running on day one. AuMDS is truly building the ecosystem of the future."
                  </p>
                </div>
                <div>
                  <span className="text-sm font-bold text-white block">Priya Sundaram</span>
                  <span className="text-xs font-mono text-cyan-400">Head of Product, AuraSpatial</span>
                </div>
              </div>
            </ElasticTiltCard>
          </div>
        </SectionScrollAnimation>

      </div>
    </div>
  );
};
