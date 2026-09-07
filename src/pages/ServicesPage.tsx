import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplitTextHeading } from '../components/SplitTextHeading';
import { MagneticGlowButton } from '../components/MagneticGlowButton';
import { ConsultationModal } from '../components/ConsultationModal';
import { SectionScrollAnimation } from '../components/SectionScrollAnimation';
import { ElasticTiltCard } from '../components/ElasticTiltCard';
import { Code2, Palette, TrendingUp, Layers, Check, ArrowRight, Sparkles, Cpu, Globe2, ShieldCheck, Compass, Terminal, Rocket, Users } from 'lucide-react';
import { audioEngine } from '../components/AudioEngine';
import { useNavigate } from 'react-router-dom';

interface ServiceNodeTab {
  id: string;
  badge: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  color: string;
  deliverables: string[];
  techStack: string[];
  metrics: { label: string; value: string }[];
}

const SERVICE_TABS: ServiceNodeTab[] = [
  {
    id: 'software',
    badge: 'NODE 01 // CORE TECH',
    tabLabel: '01. Deep-Tech Software & WebXR',
    title: 'Custom Software, Cloud Systems & AI Automation',
    subtitle: 'High-concurrency micro-frontends, edge-deployed headless systems, and spatial WebXR engines.',
    description: 'We architect mission-critical digital systems tailored to your exact enterprise specifications. From real-time reactive dashboards to multi-tenant cloud platforms, our code is optimized for maximum throughput, low latency, and zero-trust security.',
    icon: Code2,
    color: 'from-cyan-400 to-blue-600',
    deliverables: [
      'Spatial 3D & WebXR Experiences (Three.js, WebGL, Shader Choreography)',
      'Full-Stack Distributed Systems (Next.js, React, Node.js, TypeScript)',
      'AI/ML Telemetry, RAG Pipelines & Intelligent Automation Bots',
      'Microservices Orchestration, Redis Caching & Kubernetes Edge CI/CD',
    ],
    techStack: ['Next.js 14', 'Three.js / WebGL', 'TypeScript', 'TailwindCSS', 'Node.js', 'Docker / K8s', 'OpenAI / Gemini APIs'],
    metrics: [
      { label: 'FRONTEND ARCH', value: 'Vite / Next.js / WebXR' },
      { label: 'THROUGHPUT', value: '> 10k RPS Concurrency' },
      { label: 'CLOUD SECURITY', value: 'SOC2 / Zero-Trust' },
      { label: 'UPTIME SLA', value: '99.98% Monitored' },
    ],
  },
  {
    id: 'brand',
    badge: 'NODE 02 // VISUAL UNIVERSE',
    tabLabel: '02. Exponential Brand Architecture',
    title: 'Holistic Brand Identity & Spatial 3D Systems',
    subtitle: 'From formal incorporation to viral multi-channel reach, crafting unified corporate visual languages.',
    description: 'We transform raw business ideas into iconic brands with institutional presence. From legal business incorporation to full design systems, 3D digital assets, and high-impact multi-channel creative direction.',
    icon: Palette,
    color: 'from-amber-400 to-orange-500',
    deliverables: [
      'Comprehensive Design Systems (Typography, Color Palettes, Tokens, UI Kits)',
      'Spatial 3D Digital Asset Creation & Interactive Kinetic Typography',
      'Pitch Deck & Presentation Architecture for Venture Capitalists',
      'Omni-Channel Social Authority & High-Conversion Brand Storytelling',
    ],
    techStack: ['Figma Tokens', 'Spline 3D', 'Blender', 'Cinema 4D', 'After Effects', 'Webflow / Framer'],
    metrics: [
      { label: 'DELIVERY SPRINT', value: '14-Day Rapid Launch' },
      { label: 'ASSET LIBRARY', value: 'Figma + 3D WebGL' },
      { label: 'COMPLIANCE', value: '100% IP Cleared' },
      { label: 'CONVERSION GAIN', value: '+65% Engagement' },
    ],
  },
  {
    id: 'incorporation',
    badge: 'NODE 03 // FOUNDATION',
    tabLabel: '03. Corporate Strategy & Incorporation',
    title: 'End-to-End Legal Entity & Scaling Governance',
    subtitle: 'Full statutory registration, founding agreements, trademark protection, and tax structuring.',
    description: 'We establish bulletproof legal foundations for early-stage startups and expanding enterprises. Seamless MCA filings, founding equity vesting, GST registration, and long-term regulatory compliance.',
    icon: ShieldCheck,
    color: 'from-emerald-400 to-teal-600',
    deliverables: [
      'Private Limited (Pvt Ltd) Company Incorporation in India & Global Hubs',
      'Trademark & Intellectual Property Rights Registration',
      'Founder Equity Vesting Charters & Shareholder Agreements',
      'GST, Regulatory Tax Structuring & Banking Clearance Setup',
    ],
    techStack: ['MCA Portal API', 'IP India Registry', 'Statutory Compliance Suite', 'Direct Legal Retainer'],
    metrics: [
      { label: 'APPROVAL SPEED', value: '< 7 Business Days' },
      { label: 'COMPLIANCE', value: '100% Statutory' },
      { label: 'BANKING UPLINK', value: 'Instant Entity A/C' },
      { label: 'IP PROTECTION', value: 'Class 9 & 42 Trademark' },
    ],
  },
  {
    id: 'triad',
    badge: 'NODE 04 // TALENT MATRIX',
    tabLabel: '04. Skill Development Wing (SDW / TRIAD)',
    title: 'Autonomous Student-Developer Talent Accelerator',
    subtitle: 'Bridging collegiate knowledge with intense, hands-on production software sprints.',
    description: 'Operated by AuMDS, the TRIAD Internship Program and Skill Development Wing cultivate high-potential technical talent by having them engineer live commercial products under seasoned principal architects.',
    icon: Cpu,
    color: 'from-indigo-400 to-purple-600',
    deliverables: [
      'TRIAD Practical Software Incubation Cohorts',
      'Full-Stack Production Engineering & Code Review Mastery',
      'Autonomous Agile Squads for Fast-Growing Client Projects',
      'Direct Enterprise Career Placement & Ecosystem Certification',
    ],
    techStack: ['Full-Stack JS/TS', 'React / Next.js', 'GitOps & CI/CD', 'API Architecture', 'AI Tooling'],
    metrics: [
      { label: 'ENGINEERS TRAINED', value: '500+ Alumni' },
      { label: 'PROJECTS DELIVERED', value: '45+ Real-world Apps' },
      { label: 'CLIENT SAVINGS', value: '40% Dev Cost Eff' },
      { label: 'RETENTION RATE', value: '94% Top Talent' },
    ],
  },
  {
    id: 'satchai',
    badge: 'NODE 05 // VENTURE GUILD',
    tabLabel: '05. SatChai Founder Guild & Ecosystem',
    title: 'High-Impact Networking Guild & Dealflow Network',
    subtitle: 'Curated roundtables uniting visionary founders, investors, and technology architects.',
    description: 'SatChai is the social and venture engine of AuMDS. We bring together ambitious founders over curated roundtables and mixer summits, facilitating strategic capital intros, collaborative dealflows, and cross-border expansion.',
    icon: Users,
    color: 'from-pink-400 to-rose-600',
    deliverables: [
      'Exclusive SatChai Founder Mixer Summits in Bengaluru & Tier-1 Hubs',
      'Curated Investor Pitch Roundtables & Dealflow Exchange',
      'Executive Masterclasses on Product-Market Fit & Scale Economics',
      'Cross-Border Corporate Partnerships & Client Introductions',
    ],
    techStack: ['Founder CRM', 'Private Deal Portal', 'Live Roundtable Broadcasts', 'Syndicate Network'],
    metrics: [
      { label: 'ROUNDTABLES', value: '25+ Summits Hosted' },
      { label: 'FOUNDERS IN GUILD', value: '1,200+ Network' },
      { label: 'INVESTOR ACCESS', value: 'Angel & VC Partners' },
      { label: 'ECOSYSTEM VALUE', value: '$10M+ Deal Pipeline' },
    ],
  },
];

export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTabId, setActiveTabId] = useState('software');
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['web-app', 'brand-id']);

  const activeTab = SERVICE_TABS.find((t) => t.id === activeTabId) || SERVICE_TABS[0];

  const toggleAddon = (id: string) => {
    audioEngine.playClick();
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative pt-32 pb-24 z-10 font-sans space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* SECTION 1: SERVICES HERO */}
        <section className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/40 bg-slate-900/70 backdrop-blur-xl w-fit mb-6 shadow-2xl"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase font-bold">
              5 ORBITING CAPABILITY NODES
            </span>
          </motion.div>

          <SplitTextHeading
            as="h1"
            text="Engineered for Exponential Execution"
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-display leading-[1.06]"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal"
          >
            We provide an integrated spectrum of enterprise capabilities—from low-latency custom software architecture to end-to-end business incorporation, TRIAD talent pipelines, and the SatChai founder guild.
          </motion.p>
        </section>

        {/* SECTION 2: 5 ORBITING CAPABILITY TABS */}
        <SectionScrollAnimation className="section-aura-cyan p-8 sm:p-12 rounded-3xl">
          <div className="flex flex-wrap gap-2.5 mb-10 border-b border-white/10 pb-4 justify-center">
            {SERVICE_TABS.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTabId === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05, y: -2, transition: { type: 'spring', stiffness: 450, damping: 12 } }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => {
                    audioEngine.playClick();
                    setActiveTabId(tab.id);
                  }}
                  onMouseEnter={() => audioEngine.playHover()}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-mono transition-all duration-300 backdrop-blur-xl ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-400 to-amber-400 text-slate-950 font-extrabold shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105'
                      : 'bg-[#0A0F1D]/70 text-slate-400 border border-white/10 hover:border-cyan-500/50 hover:text-white'
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  <span>{tab.tabLabel}</span>
                </motion.button>
              );
            })}
          </div>

          {/* ACTIVE TAB HOLOGRAM CARD WITH SLIDE ANIMATION */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, x: 30, filter: 'blur(6px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
              transition={{ type: 'spring', stiffness: 350, damping: 24 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 rounded-3xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
            >
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider px-3.5 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 font-bold">
                    {activeTab.badge}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-display leading-tight">
                  {activeTab.title}
                </h3>

                <p className="text-sm font-semibold text-amber-400 leading-relaxed">
                  {activeTab.subtitle}
                </p>

                <p className="text-slate-200 text-sm leading-relaxed font-normal">
                  {activeTab.description}
                </p>

                {/* Deliverables List */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                    Core Architectural Deliverables:
                  </span>
                  {activeTab.deliverables.map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 3 }}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 font-normal"
                    >
                      <div className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-cyan-400" />
                      </div>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Tech Stack Hologram Strip */}
                <div className="pt-4 border-t border-white/10">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-2 font-bold">
                    ✦ Deployed Tech Stack Hologram:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeTab.techStack.map((tech, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.06, y: -2 }}
                        className="px-3 py-1 rounded-lg bg-slate-950/80 border border-white/10 text-slate-200 text-[11px] font-mono shadow-sm"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Telemetry Column */}
              <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-slate-950/90 border border-white/10 shadow-xl">
                <div>
                  <span className="text-xs font-mono text-amber-400 uppercase font-bold">SPECIFICATION TELEMETRY</span>
                  <h4 className="text-lg font-bold text-white mt-1 mb-4 font-display">Operational Standard</h4>
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono text-slate-400 mb-6">
                    {activeTab.metrics.map((met, idx) => (
                      <div key={idx} className="p-3 bg-slate-900/80 rounded-xl border border-white/10">
                        <span className="text-slate-500 block mb-1">{met.label}</span>
                        <span className="text-cyan-300 font-bold">{met.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2, transition: { type: 'spring', stiffness: 450, damping: 12 } }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => {
                      audioEngine.playSwoosh();
                      setIsConsultOpen(true);
                    }}
                    className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-amber-400 text-slate-950 font-extrabold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
                  >
                    <Sparkles className="w-4 h-4" />
                    Commission This Capability
                  </motion.button>
                  <button
                    onClick={() => navigate('/contact')}
                    className="w-full py-2.5 rounded-full border border-white/10 hover:border-cyan-400 text-slate-400 hover:text-white text-xs font-mono transition-colors"
                  >
                    Schedule Technical Deep-Dive →
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </SectionScrollAnimation>

        {/* SECTION 3: INTERACTIVE SOLUTION CONFIGURATOR */}
        <SectionScrollAnimation className="section-aura-indigo p-6 sm:p-12 rounded-3xl">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider font-mono">
              INTERACTIVE SOLUTION BUILDER
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-display">
              Configure Your Custom Universe Package
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-2">
              Select the modules your enterprise requires to generate a calibrated proposal blueprint.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 mb-8">
            {[
              { id: 'web-app', title: 'Deep-Tech WebXR App', desc: 'Next.js, Three.js, Distributed Cloud API' },
              { id: 'brand-id', title: 'Brand Identity Universe', desc: 'Design System & 3D Visual Tokens' },
              { id: 'incorporation-reg', title: 'Legal Incorporation', desc: 'MCA Registration, Trademark & Tax' },
              { id: 'triad-hire', title: 'TRIAD Talent Squad', desc: 'Dedicated Incubated Student Developers' },
              { id: 'satchai-vip', title: 'SatChai Guild Pass', desc: 'Founder Mixer & Investor Dealflow Seat' },
              { id: 'ai-workflow', title: 'AI Automation Core', desc: 'Custom Agents, RAG & Data Observability' },
            ].map((addon) => {
              const isSelected = selectedAddons.includes(addon.id);
              return (
                <motion.div
                  key={addon.id}
                  whileHover={{ scale: 1.03, y: -2, transition: { type: 'spring', stiffness: 450, damping: 12 } }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleAddon(addon.id)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border backdrop-blur-xl ${
                    isSelected
                      ? 'bg-cyan-950/70 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                      : 'bg-slate-950/70 border-white/10 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-bold text-white">{addon.title}</span>
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${isSelected ? 'bg-cyan-400 text-slate-950' : 'border border-slate-700'}`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 font-normal">{addon.desc}</span>
                </motion.div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/10">
            <span className="text-xs font-mono text-slate-300">
              Selected Modules: <strong className="text-cyan-400 font-bold">{selectedAddons.length} Components Active</strong>
            </span>
            <motion.button
              whileHover={{ scale: 1.06, y: -2, transition: { type: 'spring', stiffness: 450, damping: 12 } }}
              whileTap={{ scale: 0.92 }}
              onClick={() => {
                audioEngine.playSwoosh();
                setIsConsultOpen(true);
              }}
              className="px-7 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-amber-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <span>Request Calibrated Blueprint</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </SectionScrollAnimation>

      </div>

      <ConsultationModal isOpen={isConsultOpen} onClose={() => setIsConsultOpen(false)} />
    </div>
  );
};
