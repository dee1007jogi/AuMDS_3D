import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SplitTextHeading } from '../components/SplitTextHeading';
import { MagneticGlowButton } from '../components/MagneticGlowButton';
import { GoldBarButton } from '../components/GoldBarButton';
import { SolutionsMatrix } from '../components/SolutionsMatrix';
import { PinnedPortalTransition } from '../components/PinnedPortalTransition';
import { VelocityShowcaseSlider, ShowcaseItem } from '../components/VelocityShowcaseSlider';
import { MetricsTelemetry } from '../components/MetricsTelemetry';
import { ServiceSearchOrb } from '../components/ServiceSearchOrb';
import { BusinessJourneyPath } from '../components/BusinessJourneyPath';
import { BusinessScalesMatrix } from '../components/BusinessScalesMatrix';
import { CosmicValues } from '../components/CosmicValues';
import { NewsletterOrbit } from '../components/NewsletterOrbit';
import { ConsultationModal } from '../components/ConsultationModal';
import { SectionScrollAnimation } from '../components/SectionScrollAnimation';
import { ArrowRight, Sparkles, Rocket, Shield, Globe, Terminal, Layers, Compass, Zap, Cpu } from 'lucide-react';
import { audioEngine } from '../components/AudioEngine';
import { useNavigate } from 'react-router-dom';
import { MeteorForgingEmblem } from '../components/MeteorForgingEmblem';

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'triad-engine',
    tag: 'TALENT MATRIX // SDW',
    title: 'TRIAD Internship Accelerator',
    description: 'Autonomous engineering cohort generating next-generation full-stack software and machine intelligence pipelines through real-world corporate deliverables.',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    href: '/ecosystem',
  },
  {
    id: 'satchai-nexus',
    tag: 'VENTURE NETWORK',
    title: 'SatChai Global Founder Guild',
    description: 'High-leverage recurring networking roundtables uniting visionary founders, technology architects, and investors across emerging technology hubs.',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    href: '/ecosystem',
  },
  {
    id: 'deep-tech-cloud',
    tag: 'ENTERPRISE TECH',
    title: 'Multidimensional Cloud Architecture',
    description: 'High-concurrency micro-frontends, edge-deployed headless systems, and spatial brand engines engineered for bulletproof reliability.',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    href: '/services',
  },
  {
    id: 'brand-matrix',
    tag: 'BRAND UNIVERSE',
    title: 'Exponential Brand Engineering',
    description: 'From formal incorporation to viral multi-channel reach, crafting unified corporate visual languages and narrative positioning.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    href: '/services',
  },
];

export const HomePage: React.FC = () => {
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative font-sans space-y-16 sm:space-y-20">
      {/* SECTION 1: UNIFIED 3-ZONE HERO VIEWPORT (Left Heading | Center 3D Logo | Right Content & Buttons) */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-10 max-w-[1440px] mx-auto pt-24 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto">
          {/* LEFT SIDE: Heading & Corporate Kicker (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-center text-left">
            {/* Kicker */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-3"
            >
              <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase font-mono">
                ✦ Advanced Corporate Solutions
              </span>
            </motion.div>

            {/* Main Title Heading with Rock-Gold Reveal Hover */}
            <SplitTextHeading
              as="h1"
              text="Co-Creating the Universe of Brands"
              className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.08] text-white font-display"
            />

            {/* Left Accent Telemetry */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Bengaluru Node 12.9249° N
              </span>
              <span className="text-white/20">|</span>
              <span className="text-cyan-300">TRIAD Ecosystem</span>
            </motion.div>
          </div>

          {/* CENTER: 3D Logo / 24K Pure Gold Emblem (lg:col-span-4) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 relative flex flex-col items-center justify-center my-4 lg:my-0"
          >
            {/* Ambient Golden & Cyan Light Halos behind Emblem */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-amber-500/25 via-cyan-500/15 to-amber-400/20 blur-3xl -z-10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-amber-400/15 blur-[100px] -z-10 pointer-events-none" />

            {/* 3D Meteor Forging Canvas Component */}
            <MeteorForgingEmblem />
          </motion.div>

          {/* RIGHT SIDE: Content, Elevator Pitch & Action Buttons (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-center text-left space-y-4">
            {/* Quote Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="p-4 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl shadow-lg"
            >
              <p className="text-xs sm:text-sm text-cyan-200/95 font-medium leading-relaxed italic">
                “Transforming Lives to Rehabilitate, Reinvent, Rebuild — One Brand at a Time.”
              </p>
            </motion.div>

            {/* Detailed Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed"
            >
              AuMDS (Au Multidimensional Solutions) provides an interconnected ecosystem across deep-tech software, exponential branding, legal incorporation, TRIAD talent incubation, and the SatChai venture guild.
            </motion.p>

            {/* Action Buttons Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="pt-2 flex flex-col gap-3"
            >
              <GoldBarButton
                variant="solid-ingot"
                size="lg"
                hallmark="FINE GOLD 999.9"
                onClick={() => {
                  audioEngine.playSwoosh();
                  setIsConsultOpen(true);
                }}
                className="w-full text-slate-950 font-extrabold text-xs sm:text-sm"
                icon={<ArrowRight className="w-4 h-4 text-slate-950" />}
                iconPosition="right"
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  Consult Now — Free Blueprint
                </span>
              </GoldBarButton>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <GoldBarButton
                  variant="obsidian-ingot"
                  size="sm"
                  hallmark="NODE-5"
                  onClick={() => navigate('/services')}
                  className="w-full text-xs py-3"
                >
                  Explore 5 Nodes
                </GoldBarButton>

                <GoldBarButton
                  variant="floating-ingot"
                  size="sm"
                  hallmark="TRIAD"
                  onClick={() => navigate('/ecosystem')}
                  className="w-full text-xs py-3"
                  icon={<Rocket className="w-3.5 h-3.5 text-amber-300 mr-1" />}
                  iconPosition="left"
                >
                  TRIAD Guild
                </GoldBarButton>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hero Bottom Telemetry Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 w-full"
        >
          {[
            { label: 'Deep-Tech Software', desc: 'Spatial WebXR & Cloud Architectures' },
            { label: 'Brand Engineering', desc: 'Holistic Universe Systems & Identity' },
            { label: 'TRIAD Incubation', desc: '500+ Engineers Mentored' },
            { label: 'SatChai Founder Guild', desc: 'High-Impact Venture Roundtables' },
          ].map((feat) => (
            <motion.div
              key={feat.label}
              whileHover={{ y: -3, scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 12 } }}
              className="flex flex-col p-3.5 rounded-2xl bg-slate-900/50 border border-white/10 backdrop-blur-xl shadow-lg text-left"
            >
              <span className="text-xs font-semibold text-cyan-400">{feat.label}</span>
              <span className="text-[11px] text-slate-300 mt-1">{feat.desc}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SECTION 2: REALTIME SERVICE SEARCH ORB */}
      <SectionScrollAnimation className="section-aura-cyan rounded-3xl max-w-7xl mx-auto overflow-hidden">
        <ServiceSearchOrb />
      </SectionScrollAnimation>

      {/* SECTION 3: THE 5-STAGE BUSINESS JOURNEY PATH */}
      <SectionScrollAnimation className="section-aura-indigo rounded-3xl max-w-7xl mx-auto overflow-hidden">
        <BusinessJourneyPath />
      </SectionScrollAnimation>

      {/* SECTION 4: 4 BUSINESS SCALE SPHERES */}
      <SectionScrollAnimation className="section-aura-amber rounded-3xl max-w-7xl mx-auto overflow-hidden">
        <BusinessScalesMatrix />
      </SectionScrollAnimation>

      {/* SECTION 5: SOLUTIONS MATRIX */}
      <SectionScrollAnimation>
        <SolutionsMatrix />
      </SectionScrollAnimation>

      {/* SECTION 6: 8 CORE CORPORATE VALUES */}
      <SectionScrollAnimation className="section-aura-cyan rounded-3xl max-w-7xl mx-auto overflow-hidden">
        <CosmicValues />
      </SectionScrollAnimation>

      {/* SECTION 7: DIMENSIONAL PINNED PORTAL WARP */}
      <SectionScrollAnimation>
        <PinnedPortalTransition
          badge="SPATIAL CONTINUUM // ARCHITECTURE"
          title="Cross Beyond Ordinary Digital Infrastructure"
          subtitle="Unifying cloud orchestration, intelligent systems, and enterprise design into an interconnected corporate realm."
          portalImageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=80"
        />
      </SectionScrollAnimation>

      {/* SECTION 8: INITIATIVES SHOWCASE SLIDER */}
      <SectionScrollAnimation>
        <VelocityShowcaseSlider items={SHOWCASE_ITEMS} />
      </SectionScrollAnimation>

      {/* SECTION 9: IMPACT & OPERATIONAL TELEMETRY */}
      <SectionScrollAnimation>
        <MetricsTelemetry />
      </SectionScrollAnimation>

      {/* SECTION 10: NEWSLETTER SUBSCRIPTION ORBIT */}
      <SectionScrollAnimation>
        <NewsletterOrbit />
      </SectionScrollAnimation>

      {/* Instant Consultation Modal */}
      <ConsultationModal isOpen={isConsultOpen} onClose={() => setIsConsultOpen(false)} />
    </div>
  );
};
export default HomePage;
