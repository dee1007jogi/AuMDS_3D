import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, ArrowRight, Code, Layers, Cpu, Globe, Shield, FileText, Briefcase } from 'lucide-react';
import { audioEngine } from './AudioEngine';
import { useNavigate } from 'react-router-dom';
import { ElasticTiltCard } from './ElasticTiltCard';
import { RockGoldText } from './RockGoldText';

interface ServiceNode {
  id: string;
  name: string;
  category: string;
  tagline: string;
  icon: React.ElementType;
  color: string;
  badge: string;
  subServices: string[];
}

const ALL_SERVICES: ServiceNode[] = [
  {
    id: 'deep-tech-software',
    name: 'Integrated Software Solutions',
    category: 'Enterprise Engineering & Cloud',
    tagline: 'Web & native mobile apps, IoT & wearable ecosystems, custom POS/CRM, SaaS architecture, and deep-tech cloud systems.',
    icon: Code,
    color: 'from-cyan-500 to-blue-600',
    badge: 'CORE TECH',
    subServices: ['Web & Mobile Apps', 'Custom POS & CRM', 'IoT & Wearable Systems', 'SaaS & Micro-SaaS', 'Cloud & Data Pipelines'],
  },
  {
    id: 'brand-engineering',
    name: 'Holistic Branding & Media',
    category: 'Brand Identity & Video Production',
    tagline: 'Comprehensive brand strategy, 3D visual tokens, graphic design, cinematic storytelling, and commercial video production.',
    icon: Layers,
    color: 'from-amber-400 to-orange-500',
    badge: 'BRAND MATRIX',
    subServices: ['Brand Strategy & Design', '3D Kinetic Typography', 'Video & Photography', 'Pitch Deck Architecture', 'Omni-Channel Content'],
  },
  {
    id: 'corporate-strategy',
    name: 'Holistic Corporate Solutions',
    category: 'Strategy & Business Automation',
    tagline: 'Business model development, strategic planning, standard operating procedures (SOPs), BPO services, and automation.',
    icon: Briefcase,
    color: 'from-emerald-400 to-teal-600',
    badge: 'OPERATIONS',
    subServices: ['Business Model Design', 'Standard Operating Procedures', 'BPO Services', 'Department Diagnostics', 'Enterprise Automation'],
  },
  {
    id: 'legal-financial',
    name: 'Corporate Financial & Legal Solutions',
    category: 'Statutory Governance & Compliance',
    tagline: 'Pvt Ltd company incorporation, trademark registration, GST/IT/TDS compliances, accounting & bookkeeping, and payroll.',
    icon: Shield,
    color: 'from-indigo-400 to-purple-600',
    badge: 'LEGAL & TAX',
    subServices: ['Pvt Ltd Incorporation', 'Trademark & IP Defense', 'GST, TDS & IT Compliances', 'Bookkeeping & Auditing', 'Payroll & Labour Law'],
  },
  {
    id: 'triad-incubation',
    name: 'TRIAD Talent & SatChai Guild',
    category: 'Talent Accelerator & Venture Network',
    tagline: 'TRIAD internship program for student-developer squads, Skill Development Wing (SDW) upskilling, and SatChai founder summits.',
    icon: Cpu,
    color: 'from-pink-500 to-rose-600',
    badge: 'ECOSYSTEM',
    subServices: ['TRIAD Internship Program', 'SDW Corporate Upskilling', 'Live Commercial Sprints', 'SatChai Founder Mixers', 'Angel Dealflow Sharing'],
  },
];

export const ServiceSearchOrb: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<ServiceNode | null>(null);
  const navigate = useNavigate();

  const filteredServices = ALL_SERVICES.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.tagline.toLowerCase().includes(query.toLowerCase()) ||
      s.subServices.some((sub) => sub.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Floating Search Hub Header */}
      <div className="text-center max-w-4xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/40 border border-amber-400/30 text-amber-300 text-xs font-mono font-bold mb-3 shadow-lg shadow-amber-950/30"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>✦ REALTIME CAPABILITY MATRIX // 5 STRATEGIC VERTICALS</span>
        </motion.div>
        
        <RockGoldText
          as="h2"
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight leading-tight"
        >
          Explore Our 5 Multidimensional Capability Nodes
        </RockGoldText>
        <p className="mt-3 text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Search and discover AuMDS end-to-end corporate solutions — from software engineering and brand design to legal compliance, autonomous talent incubation, and global founder alliances.
        </p>

        {/* Dynamic Search Input Bar */}
        <div className="relative mt-8 max-w-2xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-cyan-500/15 to-amber-500/20 rounded-full blur-xl pointer-events-none" />
          <motion.div
            whileFocus={{ scale: 1.02 }}
            className="relative flex items-center bg-[#040816]/90 border border-amber-400/40 rounded-full px-5 py-3.5 shadow-2xl backdrop-blur-2xl"
          >
            <Search className="w-5 h-5 text-amber-400 mr-3 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (e.target.value) audioEngine.playHover();
              }}
              placeholder="Search capabilities, e.g. 'Software', 'SOPs', 'Incorporation', 'Branding', 'TRIAD', 'GST Tax'..."
              className="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none font-medium"
            />
            {query && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setQuery('');
                  audioEngine.playClick();
                }}
                className="text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1 bg-slate-800/80 rounded-full"
              >
                Clear
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>

      {/* 5 Orbiting Nodes Grid with Elastic Tilt & Physics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredServices.map((node, idx) => {
            const Icon = node.icon;
            const isExpanded = selectedNode?.id === node.id;

            return (
              <ElasticTiltCard
                key={node.id}
                glowColor={node.id.includes('brand') ? 'rgba(245, 158, 11, 0.35)' : 'rgba(56, 189, 248, 0.35)'}
                onClick={() => {
                  audioEngine.playClick();
                  setSelectedNode(isExpanded ? null : node);
                }}
                className="cursor-pointer"
              >
                <div
                  className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 backdrop-blur-xl flex flex-col justify-between h-full ${
                    isExpanded
                      ? 'bg-[#0A2540]/95 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400'
                      : 'bg-[#060D1F]/80 border-slate-800/90 hover:border-cyan-500/50 hover:bg-[#0A2540]/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <motion.div
                        whileHover={{ rotate: 12, scale: 1.1 }}
                        className={`p-3.5 rounded-2xl bg-gradient-to-br ${node.color} text-slate-950 shadow-lg`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </motion.div>
                      <span className="text-[10px] font-mono font-bold tracking-widest px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-cyan-300">
                        {node.badge}
                      </span>
                    </div>

                    <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">
                      {node.category}
                    </span>
                    <h3 className="text-xl font-bold text-white font-display mt-1">
                      {node.name}
                    </h3>
                    <p className="mt-2.5 text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {node.tagline}
                    </p>

                    {/* Sub-services Hologram List */}
                    <div className="mt-4 pt-4 border-t border-slate-800/80">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
                        Sub-Service Holograms:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {node.subServices.map((sub, i) => (
                          <motion.span
                            key={i}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-200 text-[11px] font-medium hover:border-cyan-400/60 transition-colors"
                          >
                            {sub}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 flex items-center justify-between">
                    <span className="text-xs text-cyan-400 font-medium flex items-center gap-1">
                      {isExpanded ? 'Collapse Node' : 'Explore Hologram'}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.15, rotate: 45 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        audioEngine.playClick();
                        navigate('/services');
                      }}
                      className="p-2.5 rounded-full bg-slate-800/90 hover:bg-cyan-400 hover:text-slate-950 text-slate-200 transition-colors shadow-md"
                      aria-label={`View ${node.name} details`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </ElasticTiltCard>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-sm font-medium">No matching capability node found in current orbit.</p>
          <button
            onClick={() => setQuery('')}
            className="mt-3 px-5 py-2 rounded-full bg-slate-800 text-xs text-cyan-400 font-bold"
          >
            Reset Orbit Search
          </button>
        </div>
      )}
    </section>
  );
};
