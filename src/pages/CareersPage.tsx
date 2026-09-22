import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SplitTextHeading } from '../components/SplitTextHeading';
import { SectionScrollAnimation } from '../components/SectionScrollAnimation';
import { ElasticTiltCard } from '../components/ElasticTiltCard';
import { EmotionButton } from '../components/EmotionButton';
import { Sparkles, CheckCircle2, ArrowRight, Send } from 'lucide-react';
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
    <div className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans text-[var(--foreground)] space-y-24">
      {/* SECTION 1: HERO VIEWPORT */}
      <section className="text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9047ff]/10 border border-[#9047ff]/30 text-[#9047ff] text-xs font-mono font-semibold mb-6 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#9047ff]" />
          <span className="uppercase tracking-widest">Join the Creative Collective</span>
        </motion.div>

        <SplitTextHeading
          as="h1"
          text="Shape the Universe of Brands"
          className="text-4xl sm:text-6xl md:text-7xl font-serif italic font-normal tracking-tight leading-[1.08] text-[var(--foreground)]"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-[var(--foreground)]/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal font-sans"
        >
          At AuMDS, we are reimagining how companies are born, engineered, branded, and scaled. Join a high-velocity collective of engineers, designers, and venture architects.
        </motion.p>

        {/* Telemetry Banner */}
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
            <ElasticTiltCard key={item.label} glowColor="rgba(144, 71, 255, 0.2)">
              <div className="p-5 rounded-2xl bg-[var(--card)]/50 border border-[#9047ff]/20 backdrop-blur-xl text-center shadow-md">
                <span className="text-sm font-bold text-[#9047ff] block font-mono">{item.label}</span>
                <span className="text-[11px] text-[var(--foreground)]/60 mt-1 block font-normal font-sans">{item.desc}</span>
              </div>
            </ElasticTiltCard>
          ))}
        </motion.div>
      </section>

      {/* SECTION 2: OPEN ROLES MATRIX */}
      <SectionScrollAnimation className="p-8 sm:p-12 rounded-[2.5rem] border border-[#9047ff]/20 bg-[var(--card)]/40 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold text-[#9047ff] uppercase tracking-widest block font-mono">
              ACTIVE POSITIONS // BENGALURU
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif italic font-normal text-[var(--foreground)] mt-2">
              Explore Open Orbits
            </h2>
          </div>
          <span className="text-xs font-mono text-[var(--foreground)]/50">
            {ROLES.length} High-Impact Positions Open
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ROLES.map((role, idx) => (
            <ElasticTiltCard key={role.id} glowColor="rgba(144, 71, 255, 0.25)">
              <div className="p-7 sm:p-8 rounded-[2rem] bg-[var(--card)]/60 border border-[#9047ff]/20 hover:border-[#9047ff]/50 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between h-full shadow-lg">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#9047ff]/10 border border-[#9047ff]/30 text-[#9047ff] text-[10px] font-mono font-semibold">
                      {role.department}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[var(--background)] border border-[#9047ff]/15 text-[var(--foreground)]/70 text-[10px] font-mono">
                      {role.level}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#9047ff]/10 text-[#9047ff] text-[10px] font-mono font-bold border border-[#9047ff]/20">
                      {role.type}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-xl font-serif italic font-semibold text-[var(--foreground)]">{role.title}</h3>
                    <span className="text-xs font-mono text-[#9047ff]">(0{idx + 1})</span>
                  </div>
                  <p className="text-[var(--foreground)]/70 text-xs sm:text-sm leading-relaxed mb-5 font-normal font-sans">{role.summary}</p>

                  {/* Skill Tree */}
                  <div className="mb-5">
                    <span className="text-[10px] font-mono text-[var(--foreground)]/50 uppercase tracking-wider block mb-2 font-semibold">
                      Required Skill Matrix:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {role.skillTree.map((st, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-[var(--background)]/80 border border-[#9047ff]/20 text-[#9047ff] text-[11px] font-mono"
                        >
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#9047ff]/15 flex items-center justify-between">
                  <span className="text-xs text-[var(--foreground)]/50 font-mono">{role.location}</span>
                  <EmotionButton
                    variant="secondary"
                    className="!py-2 !px-5 !text-xs"
                    onClick={() => handleApplyClick(role)}
                  >
                    Apply Now
                  </EmotionButton>
                </div>
              </div>
            </ElasticTiltCard>
          ))}
        </div>
      </SectionScrollAnimation>

      {/* SECTION 3: APPLICATION FLOW */}
      <SectionScrollAnimation id="career-application-orbit" className="p-8 sm:p-14 rounded-[2.5rem] border border-[#9047ff]/20 bg-[var(--card)]/40 backdrop-blur-xl">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#9047ff]/10 border border-[#9047ff]/30 text-[#9047ff] text-xs font-mono font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#9047ff]" />
              <span>3-Step Application Process</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-serif italic font-normal text-[var(--foreground)]">
              Candidate Transmission
            </h3>
            <p className="text-[var(--foreground)]/70 text-sm mt-2 font-sans">
              Applying for: <span className="text-[#9047ff] font-semibold">{appData.role}</span>
            </p>

            {/* Stepper Progress */}
            <div className="flex items-center gap-2 mt-6">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    appStep >= step ? 'bg-[#9047ff]' : 'bg-[var(--card)]/80 border border-[#9047ff]/15'
                  }`}
                />
              ))}
            </div>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleAppSubmit} className="space-y-5">
              {/* STEP 1 */}
              {appStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h4 className="text-xs font-mono font-semibold text-[#9047ff] uppercase tracking-wider">
                    Step 1: Personal & Contact Coordinates
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-semibold text-[var(--foreground)]/70 mb-1.5">FULL NAME *</label>
                      <input
                        type="text"
                        required
                        value={appData.name}
                        onChange={(e) => setAppData({ ...appData, name: e.target.value })}
                        placeholder="Rohan Sharma"
                        className="w-full bg-[var(--background)]/80 border border-[#9047ff]/20 rounded-xl p-3 text-sm text-[var(--foreground)] focus:outline-none focus:border-[#9047ff] font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-semibold text-[var(--foreground)]/70 mb-1.5">EMAIL ADDRESS *</label>
                      <input
                        type="email"
                        required
                        value={appData.email}
                        onChange={(e) => setAppData({ ...appData, email: e.target.value })}
                        placeholder="rohan@domain.com"
                        className="w-full bg-[var(--background)]/80 border border-[#9047ff]/20 rounded-xl p-3 text-sm text-[var(--foreground)] focus:outline-none focus:border-[#9047ff] font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-semibold text-[var(--foreground)]/70 mb-1.5">PHONE NUMBER</label>
                    <input
                      type="tel"
                      value={appData.phone}
                      onChange={(e) => setAppData({ ...appData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[var(--background)]/80 border border-[#9047ff]/20 rounded-xl p-3 text-sm text-[var(--foreground)] focus:outline-none focus:border-[#9047ff] font-mono"
                    />
                  </div>
                  <div className="flex justify-end pt-3">
                    <EmotionButton
                      variant="primary"
                      type="button"
                      onClick={() => {
                        audioEngine.playClick();
                        setAppStep(2);
                      }}
                    >
                      Next: Portfolio & Links →
                    </EmotionButton>
                  </div>
                </motion.div>
              )}

              {/* STEP 2 */}
              {appStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h4 className="text-xs font-mono font-semibold text-[#9047ff] uppercase tracking-wider">
                    Step 2: Portfolio & Code Repositories
                  </h4>
                  <div>
                    <label className="block text-xs font-mono font-semibold text-[var(--foreground)]/70 mb-1.5">PORTFOLIO / BEHANCE / WEBSITE</label>
                    <input
                      type="url"
                      value={appData.portfolio}
                      onChange={(e) => setAppData({ ...appData, portfolio: e.target.value })}
                      placeholder="https://rohan.design or https://rohan.dev"
                      className="w-full bg-[var(--background)]/80 border border-[#9047ff]/20 rounded-xl p-3 text-sm text-[var(--foreground)] focus:outline-none focus:border-[#9047ff] font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-semibold text-[var(--foreground)]/70 mb-1.5">GITHUB / LINKEDIN PROFILE *</label>
                    <input
                      type="url"
                      required
                      value={appData.github}
                      onChange={(e) => setAppData({ ...appData, github: e.target.value })}
                      placeholder="https://github.com/rohan or https://linkedin.com/in/rohan"
                      className="w-full bg-[var(--background)]/80 border border-[#9047ff]/20 rounded-xl p-3 text-sm text-[var(--foreground)] focus:outline-none focus:border-[#9047ff] font-mono"
                    />
                  </div>
                  <div className="flex justify-between pt-3">
                    <button
                      type="button"
                      onClick={() => setAppStep(1)}
                      className="px-5 py-2.5 rounded-full border border-[#9047ff]/20 text-xs font-mono text-[var(--foreground)]/60 hover:text-[var(--foreground)]"
                    >
                      ← Back
                    </button>
                    <EmotionButton
                      variant="primary"
                      type="button"
                      onClick={() => {
                        audioEngine.playClick();
                        setAppStep(3);
                      }}
                    >
                      Next: Final Verification →
                    </EmotionButton>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 */}
              {appStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h4 className="text-xs font-mono font-semibold text-[#9047ff] uppercase tracking-wider">
                    Step 3: Why AuMDS & Notable Achievements
                  </h4>
                  <div>
                    <label className="block text-xs font-mono font-semibold text-[var(--foreground)]/70 mb-1.5">MESSAGE / COVER NOTE</label>
                    <textarea
                      rows={3}
                      value={appData.notes}
                      onChange={(e) => setAppData({ ...appData, notes: e.target.value })}
                      placeholder="Tell us about the most ambitious project you have shipped or what excites you about AuMDS..."
                      className="w-full bg-[var(--background)]/80 border border-[#9047ff]/20 rounded-xl p-3 text-sm text-[var(--foreground)] focus:outline-none focus:border-[#9047ff] resize-none font-normal"
                    />
                  </div>
                  <div className="flex justify-between pt-3">
                    <button
                      type="button"
                      onClick={() => setAppStep(2)}
                      className="px-5 py-2.5 rounded-full border border-[#9047ff]/20 text-xs font-mono text-[var(--foreground)]/60 hover:text-[var(--foreground)]"
                    >
                      ← Back
                    </button>
                    <EmotionButton
                      variant="primary"
                      type="submit"
                    >
                      Transmit Application
                    </EmotionButton>
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
              <div className="w-16 h-16 rounded-full bg-[#9047ff]/20 border border-[#9047ff] flex items-center justify-center mx-auto text-[#9047ff] shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-serif italic font-semibold text-[var(--foreground)]">
                Application Transmitted Successfully
              </h4>
              <p className="text-[var(--foreground)]/70 text-sm max-w-md mx-auto leading-relaxed font-sans">
                Thank you, <span className="text-[#9047ff] font-semibold">{appData.name}</span>. The AuMDS Talent Guild has received your details for <span className="text-[#9047ff] font-semibold">{appData.role}</span>. We will review your artifacts within 48 hours.
              </p>
            </motion.div>
          )}
        </div>
      </SectionScrollAnimation>
    </div>
  );
};
