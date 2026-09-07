import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplitTextHeading } from '../components/SplitTextHeading';
import { SectionScrollAnimation } from '../components/SectionScrollAnimation';
import { ElasticTiltCard } from '../components/ElasticTiltCard';
import { Sparkles, Users, Briefcase, Code, Terminal, Rocket, CheckCircle2, ArrowRight, Layers, Cpu, Award, Send } from 'lucide-react';
import { audioEngine } from '../components/AudioEngine';

interface CareerRole {
  id: string;
  title: string;
  department: string;
  level: string;
  location: string;
  type: string;
  summary: string;
  skillTree: string[];
  perks: string[];
}

const ROLES: CareerRole[] = [
  {
    id: 'deeptech-lead',
    title: 'Lead Distributed Systems & WebXR Engineer',
    department: 'Deep-Tech Software Core',
    level: 'Senior / Lead',
    location: 'Bengaluru, India // Hybrid',
    type: 'Full-Time',
    summary: 'Architect high-concurrency micro-frontends, WebGL/Three.js spatial engines, and AI data streaming pipelines for enterprise platforms.',
    skillTree: ['React / Next.js', 'Three.js / WebGL / WebXR', 'TypeScript & Node.js', 'Distributed Cloud / Redis / Kubernetes'],
    perks: ['Equity Allocation', 'TRIAD Mentorship Leadership', 'High-End Hardware Budget'],
  },
  {
    id: 'brand-architect',
    title: '3D Spatial & Visual Universe Architect',
    department: 'Brand Engineering Matrix',
    level: 'Mid to Senior',
    location: 'Bengaluru, India // Remote Friendly',
    type: 'Full-Time',
    summary: 'Design entire multi-dimensional brand identities, interactive 3D UI design systems, kinetic motion, and high-impact visual narratives.',
    skillTree: ['Figma Universe Systems', 'Spline / Blender / Cinema4D', '3D Motion Design', 'Creative Direction'],
    perks: ['Global Client Portfolios', 'Creative Autonomy', 'Continuous Masterclasses'],
  },
  {
    id: 'triad-mentor',
    title: 'TRIAD Incubation Director & Technical Mentor',
    department: 'Skill Development Wing (SDW)',
    level: 'Principal / Lead',
    location: 'Bengaluru, India',
    type: 'Full-Time',
    summary: 'Guide select cohorts of student engineers, architect real-world production projects, and transition high-potential talent into world-class developers.',
    skillTree: ['Full-Stack Curriculum Design', 'Code Review Mastery', 'Public Speaking & Hackathons', 'Engineering Leadership'],
    perks: ['Direct Impact on 1000+ Engineers', 'SatChai Guild Access', 'Flexible Sabbaticals'],
  },
  {
    id: 'venture-ecosystem',
    title: 'SatChai Ecosystem & Venture Associate',
    department: 'Corporate Strategy & Guild',
    level: 'Associate / Manager',
    location: 'Bengaluru, India',
    type: 'Full-Time',
    summary: 'Drive high-impact SatChai founder roundtables, curate investor syndicates, and structure strategic business development partnerships.',
    skillTree: ['Founder Relations', 'Dealflow Analysis', 'Event Production & Host', 'Venture Capital Networks'],
    perks: ['Founder Direct Dealflow', 'Angel Syndicate Access', 'Ecosystem Travel Budget'],
  },
];

export const CareersPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<CareerRole | null>(null);
  const [appStep, setAppStep] = useState(1);
  const [appData, setAppData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Lead Distributed Systems & WebXR Engineer',
    portfolio: '',
    github: '',
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleApplyClick = (role: CareerRole) => {
    audioEngine.playClick();
    setSelectedRole(role);
    setAppData(prev => ({ ...prev, role: role.title }));
    const formEl = document.getElementById('career-application-orbit');
    if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playSwoosh();
    setIsSubmitted(true);
  };

  return (
    <div className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans space-y-20">
      {/* SECTION 1: HERO VIEWPORT */}
      <section className="text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/70 border border-cyan-500/40 text-cyan-300 text-xs font-semibold mb-6 shadow-2xl"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>JOIN THE CO-CREATION ENGINE</span>
        </motion.div>

        <SplitTextHeading
          as="h1"
          text="Shape the Universe of Brands"
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white font-display tracking-tight leading-[1.08]"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal"
        >
          At AuMDS, we are reimagining how companies are born, engineered, branded, and scaled. Join a high-velocity collective of engineers, designers, and venture architects.
        </motion.p>

        {/* Orbiting People Telemetry Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { label: '500+ Engineers', desc: 'Upskilled in TRIAD' },
            { label: '100% Autonomy', desc: 'Direct Product Ownership' },
            { label: 'Deep-Tech Stack', desc: 'Next.js, Three.js, AI/ML' },
            { label: 'SatChai Guild', desc: 'Global Venture Access' },
          ].map((item) => (
            <ElasticTiltCard key={item.label}>
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl text-center shadow-lg">
                <span className="text-sm font-bold text-cyan-400 block">{item.label}</span>
                <span className="text-[11px] text-slate-300 mt-1 block font-normal">{item.desc}</span>
              </div>
            </ElasticTiltCard>
          ))}
        </motion.div>
      </section>

      {/* SECTION 2: OPEN ROLES MATRIX */}
      <SectionScrollAnimation className="section-aura-cyan p-8 sm:p-12 rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block font-mono">
              ACTIVE POSITIONS // BENGALURU
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white font-display mt-1">
              Explore Open Orbits
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {ROLES.length} High-Impact Positions Open
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ROLES.map((role) => (
            <ElasticTiltCard key={role.id} glowColor="rgba(56, 189, 248, 0.35)">
              <div className="p-7 sm:p-8 rounded-3xl bg-slate-900/70 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between h-full shadow-lg">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3.5">
                    <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[10px] font-semibold">
                      {role.department}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono">
                      {role.level}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-400/20">
                      {role.type}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-display mb-2">{role.title}</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 font-normal">{role.summary}</p>

                  {/* Skill Tree Hologram */}
                  <div className="mb-4">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
                      Required Skill Tree:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {role.skillTree.map((st, i) => (
                        <motion.span
                          key={i}
                          whileHover={{ scale: 1.06, y: -2 }}
                          className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-white/10 text-cyan-300 text-[11px] font-mono"
                        >
                          {st}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">{role.location}</span>
                  <motion.button
                    whileHover={{ scale: 1.06, y: -2, transition: { type: 'spring', stiffness: 450, damping: 12 } }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => handleApplyClick(role)}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-amber-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
                  >
                    Apply Orbit
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </div>
            </ElasticTiltCard>
          ))}
        </div>
      </SectionScrollAnimation>

      {/* SECTION 3: 3D MULTI-STEP APPLICATION FLOW ORBIT */}
      <SectionScrollAnimation id="career-application-orbit" className="section-aura-indigo p-6 sm:p-12 rounded-3xl">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>3-STEP APPLICATION FLOW ORBIT</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Candidate Telemetry Submission
            </h3>
            <p className="text-slate-300 text-sm mt-1">
              Applying for: <span className="text-cyan-400 font-semibold">{appData.role}</span>
            </p>

            {/* Stepper Progress */}
            <div className="flex items-center gap-2 mt-6">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    appStep >= step ? 'bg-gradient-to-r from-cyan-400 to-amber-400' : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleAppSubmit} className="space-y-4">
              {/* STEP 1: IDENTITY */}
              {appStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider font-mono">
                    Step 1: Personal & Contact Coordinates
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">FULL NAME *</label>
                      <input
                        type="text"
                        required
                        value={appData.name}
                        onChange={(e) => setAppData({ ...appData, name: e.target.value })}
                        placeholder="Rohan Sharma"
                        className="w-full bg-slate-950/90 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-400 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">EMAIL ADDRESS *</label>
                      <input
                        type="email"
                        required
                        value={appData.email}
                        onChange={(e) => setAppData({ ...appData, email: e.target.value })}
                        placeholder="rohan@domain.com"
                        className="w-full bg-slate-950/90 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">PHONE NUMBER</label>
                    <input
                      type="tel"
                      value={appData.phone}
                      onChange={(e) => setAppData({ ...appData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-950/90 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>
                  <div className="flex justify-end pt-2">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.94 }}
                      type="button"
                      onClick={() => {
                        audioEngine.playClick();
                        setAppStep(2);
                      }}
                      className="px-7 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-amber-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider shadow-lg shadow-cyan-500/20"
                    >
                      Next: Portfolio & Skills →
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: PORTFOLIO & SKILLS */}
              {appStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider font-mono">
                    Step 2: Portfolio & Code Repositories
                  </h4>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">PORTFOLIO / BEHANCE / WEBSITE</label>
                    <input
                      type="url"
                      value={appData.portfolio}
                      onChange={(e) => setAppData({ ...appData, portfolio: e.target.value })}
                      placeholder="https://rohan.design or https://rohan.dev"
                      className="w-full bg-slate-950/90 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">GITHUB / LINKEDIN PROFILE *</label>
                    <input
                      type="url"
                      required
                      value={appData.github}
                      onChange={(e) => setAppData({ ...appData, github: e.target.value })}
                      placeholder="https://github.com/rohan or https://linkedin.com/in/rohan"
                      className="w-full bg-slate-950/90 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>
                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setAppStep(1)}
                      className="px-5 py-2.5 rounded-full border border-white/10 text-xs font-mono text-slate-400 hover:text-white"
                    >
                      ← Back
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.94 }}
                      type="button"
                      onClick={() => {
                        audioEngine.playClick();
                        setAppStep(3);
                      }}
                      className="px-7 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-amber-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider shadow-lg shadow-cyan-500/20"
                    >
                      Next: Final Verification →
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: FINAL NOTES & TRANSMISSION */}
              {appStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider font-mono">
                    Step 3: Why AuMDS & Notable Achievements
                  </h4>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">MESSAGE / COVER TELEMETRY</label>
                    <textarea
                      rows={3}
                      value={appData.notes}
                      onChange={(e) => setAppData({ ...appData, notes: e.target.value })}
                      placeholder="Tell us about the most ambitious project you have shipped or what excites you about the AuMDS Universe..."
                      className="w-full bg-slate-950/90 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-400 resize-none font-normal"
                    />
                  </div>
                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setAppStep(2)}
                      className="px-5 py-2.5 rounded-full border border-white/10 text-xs font-mono text-slate-400 hover:text-white"
                    >
                      ← Back
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.06, y: -2, transition: { type: 'spring', stiffness: 450, damping: 12 } }}
                      whileTap={{ scale: 0.92 }}
                      type="submit"
                      className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-amber-400 text-slate-950 font-extrabold text-xs font-mono uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-500/30"
                    >
                      <Send className="w-4 h-4" />
                      Transmit Application
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-10 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-white font-display">
                Candidate Profile Encrypted & Dispatched
              </h4>
              <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-cyan-400 font-semibold">{appData.name}</span>. The AuMDS Talent Guild has received your telemetry for <span className="text-amber-400">{appData.role}</span>. We will review your artifacts within 48 hours.
              </p>
            </motion.div>
          )}
        </div>
      </SectionScrollAnimation>
    </div>
  );
};
