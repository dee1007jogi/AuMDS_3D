import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplitTextHeading } from '../components/SplitTextHeading';
import { SectionScrollAnimation } from '../components/SectionScrollAnimation';
import { ElasticTiltCard } from '../components/ElasticTiltCard';
import { Shield, Lock, FileText, Scale, ChevronDown, Sparkles, Search, CheckCircle2 } from 'lucide-react';
import { audioEngine } from '../components/AudioEngine';

interface LegalSection {
  id: string;
  category: 'privacy' | 'terms' | 'governance' | 'triad';
  title: string;
  updated: string;
  badge: string;
  content: string[];
}

const LEGAL_DATA: LegalSection[] = [
  {
    id: 'privacy-protocol',
    category: 'privacy',
    title: 'Universe Privacy & Data Sovereignty Protocol',
    updated: 'Updated: September 2026',
    badge: 'ZERO-TRUST PRIVACY',
    content: [
      '1. Scope & Zero-Trust Architecture: Au Multidimensional Solutions Pvt Ltd ("AuMDS") adheres to uncompromising data protection standards across our software systems, telemetry dashboards, WebXR nodes, and corporate consultations.',
      '2. Telemetry Ingestion: Client project specifications, personal coordinates, and intellectual property data transmitted via our portal are encrypted in transit (TLS 1.3) and at rest (AES-256).',
      '3. Confidentiality Guarantee: We do not sell, rent, or distribute proprietary client data or codebase assets to third parties under any circumstances.',
    ],
  },
  {
    id: 'terms-of-dimension',
    category: 'terms',
    title: 'Terms of Dimension & Platform Engagement',
    updated: 'Updated: September 2026',
    badge: 'LEGAL COVENANT',
    content: [
      '1. Acceptance: By accessing the AuMDS Universe portal, services, or participating in the SatChai Founder Guild or TRIAD program, you agree to be bound by these Terms of Dimension.',
      '2. Intellectual Property Rights: All custom software architectures, design systems, and digital assets commissioned by clients are assigned 100% to the respective client upon final milestone settlement.',
      '3. Warranties & Reliability: AuMDS provides commercial-grade software backed by rigorous quality assurance and specified Service Level Agreements (SLAs).',
    ],
  },
  {
    id: 'governance-statutory',
    category: 'governance',
    title: 'Corporate Governance & MCA Compliance Matrix',
    updated: 'Updated: September 2026',
    badge: 'MCA COMPLIANCE',
    content: [
      '1. Entity Incorporation: Au Multidimensional Solutions Pvt Ltd is a legally registered corporate entity under the Companies Act, Ministry of Corporate Affairs, Government of India.',
      '2. Registered Headquarters: Prema Enclave, Kengeri Satellite Town, Bengaluru, Karnataka 560060, India.',
      '3. Fiduciary Responsibility: We maintain strict audited financial standards, statutory GST filings, and transparent vendor-partner contracts.',
    ],
  },
  {
    id: 'triad-satchai-governance',
    category: 'triad',
    title: 'TRIAD Incubation & SatChai Guild Charters',
    updated: 'Updated: September 2026',
    badge: 'ECOSYSTEM CHARTER',
    content: [
      '1. TRIAD Talent Honor Code: Interns and apprentices in the Skill Development Wing (SDW) are bound by strict non-disclosure agreements (NDAs) regarding proprietary client codebases.',
      '2. SatChai Founder Network Conduct: The SatChai Guild operates on mutual founder trust, non-solicitation of confidential dealflows, and ethical venture co-creation.',
    ],
  },
];

export const LegalPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'privacy' | 'terms' | 'governance' | 'triad'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('privacy-protocol');

  const filtered = LEGAL_DATA.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative pt-32 pb-24 z-10 font-sans space-y-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* SECTION 1: LEGAL HERO */}
        <section className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/40 bg-slate-900/70 backdrop-blur-xl w-fit mb-6 shadow-2xl"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase font-bold">
              GOVERNANCE & STATUTORY REPOSITORY
            </span>
          </motion.div>

          <SplitTextHeading
            as="h1"
            text="Institutional Integrity & Protocols"
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-display leading-[1.06]"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal"
          >
            Transparent corporate charters, privacy mandates, and ecosystem covenants governing the AuMDS Universe.
          </motion.p>
        </section>

        {/* SECTION 2: SEARCH & FILTER BAR */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pb-6 border-b border-white/10">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search legal provisions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-slate-900/70 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-medium"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { id: 'all', label: 'All Protocols' },
              { id: 'privacy', label: 'Privacy' },
              { id: 'terms', label: 'Terms' },
              { id: 'governance', label: 'Governance' },
              { id: 'triad', label: 'Guild Charters' },
            ].map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => {
                  audioEngine.playClick();
                  setActiveCategory(cat.id as any);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all backdrop-blur-xl ${
                  activeCategory === cat.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                    : 'bg-slate-900/70 text-slate-400 border border-white/10 hover:border-slate-700'
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* SECTION 3: ACCORDION WITH SECTION AURA */}
        <SectionScrollAnimation className="section-aura-cyan p-8 sm:p-10 rounded-3xl space-y-4">
          {filtered.map((item) => {
            const isExpanded = expandedId === item.id;

            return (
              <ElasticTiltCard key={item.id} glowColor="rgba(56, 189, 248, 0.25)">
                <div className="rounded-3xl bg-slate-900/70 border border-white/10 overflow-hidden backdrop-blur-2xl transition-all duration-300 shadow-lg">
                  <button
                    onClick={() => {
                      audioEngine.playClick();
                      setExpandedId(isExpanded ? null : item.id);
                    }}
                    className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                          {item.badge}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">•</span>
                        <span className="text-[10px] font-mono text-slate-400">{item.updated}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                        {item.title}
                      </h3>
                    </div>

                    <div className={`p-2 rounded-full bg-slate-800 text-slate-300 transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-cyan-400 text-slate-950' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 sm:px-7 pb-7 pt-2 border-t border-white/10"
                      >
                        <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                          {item.content.map((p, idx) => (
                            <p key={idx} className="bg-slate-950/70 p-4 rounded-xl border border-white/5">
                              {p}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ElasticTiltCard>
            );
          })}
        </SectionScrollAnimation>

      </div>
    </div>
  );
};
