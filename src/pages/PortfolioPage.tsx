import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplitTextHeading } from '../components/SplitTextHeading';
import { SectionScrollAnimation } from '../components/SectionScrollAnimation';
import { ElasticTiltCard } from '../components/ElasticTiltCard';
import { ArrowUpRight, FolderGit2, Star } from 'lucide-react';
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
    <div className="relative pt-32 pb-24 z-10 font-sans text-[var(--foreground)] space-y-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* SECTION 1: PORTFOLIO HERO */}
        <section className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#9047ff]/30 bg-[#9047ff]/10 backdrop-blur-xl w-fit mb-6 shadow-sm"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-[#9047ff]" />
            <span className="text-xs font-mono tracking-widest text-[#9047ff] uppercase font-bold">
              Case Studies & Proven Impact
            </span>
          </motion.div>

          <SplitTextHeading
            as="h1"
            text="Excellence in Production Execution"
            className="text-4xl sm:text-6xl md:text-7xl font-serif italic font-normal tracking-tight leading-[1.08] text-[var(--foreground)]"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-[var(--foreground)]/70 max-w-3xl mx-auto leading-relaxed font-normal font-sans"
          >
            Explore how Au Multidimensional Solutions has architected high-performance software, engineered brand universes, and accelerated growth for visionary enterprises.
          </motion.p>
        </section>

        {/* SECTION 2: FILTER CONTROLS */}
        <div className="flex flex-wrap gap-2.5 mb-12 border-b border-[#9047ff]/15 pb-6 justify-center">
          {[
            { id: 'all', label: 'All Dimensions' },
            { id: 'software', label: 'Software & WebXR' },
            { id: 'brand', label: 'Brand Universe' },
            { id: 'scaling', label: 'Scaling & Growth' },
          ].map((btn) => (
            <motion.button
              key={btn.id}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                audioEngine.playClick();
                setFilter(btn.id as any);
              }}
              className={`px-6 py-2.5 rounded-full text-xs font-mono transition-all duration-300 backdrop-blur-xl ${
                filter === btn.id
                  ? 'bg-[#9047ff] text-white font-bold shadow-[0_0_20px_rgba(144,71,255,0.4)]'
                  : 'bg-[var(--card)]/50 text-[var(--foreground)]/70 border border-[#9047ff]/15 hover:border-[#9047ff]/40 hover:text-[var(--foreground)]'
              }`}
            >
              {btn.label}
            </motion.button>
          ))}
        </div>

        {/* SECTION 3: CASE STUDIES GRID WITH ELASTIC CARDS */}
        <SectionScrollAnimation className="p-8 sm:p-12 rounded-[2.5rem] border border-[#9047ff]/20 bg-[var(--card)]/30 backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence>
              {filtered.map((study, idx) => (
                <ElasticTiltCard key={study.id} glowColor="rgba(144, 71, 255, 0.25)">
                  <div className="rounded-[2rem] bg-[var(--card)]/60 border border-[#9047ff]/20 overflow-hidden group hover:border-[#9047ff]/50 transition-all duration-500 flex flex-col justify-between h-full backdrop-blur-xl shadow-xl">
                    {/* Media banner */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={study.imageUrl}
                        alt={study.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-80" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-mono bg-[var(--background)]/90 text-[#9047ff] border border-[#9047ff]/30 font-semibold backdrop-blur-md">
                          {study.tag}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <span className="text-xs font-mono text-[#9047ff] bg-[var(--background)]/90 px-3 py-1 rounded-md border border-[#9047ff]/20 font-bold backdrop-blur-md">
                          {study.metric}
                        </span>
                      </div>
                    </div>

                    {/* Text Body */}
                    <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono text-[#9047ff] uppercase font-bold tracking-widest">{study.client}</span>
                          <span className="text-xs font-mono text-[var(--foreground)]/40">(0{idx + 1})</span>
                        </div>
                        <h3 className="text-2xl font-serif italic font-semibold text-[var(--foreground)] mb-3 group-hover:text-[#9047ff] transition-colors">
                          {study.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[var(--foreground)]/70 leading-relaxed font-normal font-sans">
                          {study.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-6 border-t border-[#9047ff]/15 flex justify-between items-center">
                        <span className="text-xs font-mono text-[var(--foreground)]/50">STATUS // DEPLOYED & LIVE</span>
                        <motion.button
                          whileHover={{ scale: 1.12, rotate: 45 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => navigate('/contact')}
                          className="w-10 h-10 rounded-full bg-[#9047ff]/15 border border-[#9047ff]/30 flex items-center justify-center text-[#9047ff] group-hover:bg-[#9047ff] group-hover:text-white transition-all shadow-sm"
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
        <SectionScrollAnimation className="p-8 sm:p-14 rounded-[2.5rem] border border-[#9047ff]/20 bg-[var(--card)]/40 backdrop-blur-xl">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono text-[#9047ff] uppercase font-bold tracking-widest">Client Endorsements</span>
            <h2 className="text-3xl sm:text-5xl font-serif italic font-normal text-[var(--foreground)] mt-2">
              Endorsed by Fast-Growing Ventures
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ElasticTiltCard glowColor="rgba(144, 71, 255, 0.2)">
              <div className="p-8 rounded-[2rem] bg-[var(--card)]/60 border border-[#9047ff]/20 h-full flex flex-col justify-between shadow-lg backdrop-blur-xl">
                <div>
                  <div className="flex text-[#9047ff] mb-4 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#9047ff]" />
                    ))}
                  </div>
                  <p className="text-sm text-[var(--foreground)]/80 leading-relaxed font-serif italic mb-6 font-normal">
                    "AuMDS redesigned our entire digital architecture and brand strategy within weeks. The speed, attention to visual detail, and rock-solid engineering exceeded all expectations."
                  </p>
                </div>
                <div>
                  <span className="text-sm font-semibold text-[var(--foreground)] block">Aakash Mehta</span>
                  <span className="text-xs font-mono text-[#9047ff]">Founder, FinVenture Labs</span>
                </div>
              </div>
            </ElasticTiltCard>

            <ElasticTiltCard glowColor="rgba(144, 71, 255, 0.2)">
              <div className="p-8 rounded-[2rem] bg-[var(--card)]/60 border border-[#9047ff]/20 h-full flex flex-col justify-between shadow-lg backdrop-blur-xl">
                <div>
                  <div className="flex text-[#9047ff] mb-4 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#9047ff]" />
                    ))}
                  </div>
                  <p className="text-sm text-[var(--foreground)]/80 leading-relaxed font-serif italic mb-6 font-normal">
                    "The TRIAD talent cohort provided us with exceptional engineers who hit the ground running on day one. AuMDS is truly building the ecosystem of the future."
                  </p>
                </div>
                <div>
                  <span className="text-sm font-semibold text-[var(--foreground)] block">Priya Sundaram</span>
                  <span className="text-xs font-mono text-[#9047ff]">Head of Product, AuraSpatial</span>
                </div>
              </div>
            </ElasticTiltCard>
          </div>
        </SectionScrollAnimation>

      </div>
    </div>
  );
};
