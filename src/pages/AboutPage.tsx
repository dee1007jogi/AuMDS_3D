import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplitTextHeading } from '../components/SplitTextHeading';
import { EmotionButton } from '../components/EmotionButton';
import { ConsultationModal } from '../components/ConsultationModal';
import { SectionScrollAnimation } from '../components/SectionScrollAnimation';
import { ElasticTiltCard } from '../components/ElasticTiltCard';
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Lightbulb,
  Rocket,
  Target,
  Users,
  Sparkles,
  Globe,
  ShieldCheck,
} from 'lucide-react';
import { audioEngine } from '../components/AudioEngine';
import { useNavigate } from 'react-router-dom';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

const TIMELINE: TimelineItem[] = [
  {
    year: '(001)',
    title: 'Understand',
    description:
      'We begin by analyzing the enterprise core, target audience, structural bottlenecks, and exponential scaling opportunities.',
  },
  {
    year: '(002)',
    title: 'Architect & Design',
    description:
      'We transform objectives into bespoke digital ecosystems, unified visual systems, and spatial 3D WebXR architecture.',
  },
  {
    year: '(003)',
    title: 'Engineer & Deploy',
    description:
      'Our development methodology prioritizes zero-latency performance, high concurrency, and resilient cloud infrastructure.',
  },
  {
    year: '(004)',
    title: 'Compound & Scale',
    description:
      'We continuously optimize systems through data telemetry, algorithmic refinement, and autonomous client acquisition funnels.',
  },
];

const CAPABILITIES = [
  {
    icon: Code2,
    num: '(001)',
    title: 'Technology Solutions',
    description:
      'Modern web applications and digital solutions designed around real business requirements.',
  },
  {
    icon: Lightbulb,
    num: '(002)',
    title: 'Digital Innovation',
    description:
      'Creative technology concepts that help organizations explore new opportunities and improve experiences.',
  },
  {
    icon: Target,
    num: '(003)',
    title: 'Business Strategy',
    description:
      'Practical digital strategies that connect technology decisions with business goals.',
  },
  {
    icon: Users,
    num: '(004)',
    title: 'Talent & Collaboration',
    description:
      'Collaborative development and learning environments that encourage technical growth and innovation.',
  },
  {
    icon: Globe,
    num: '(005)',
    title: 'Digital Experiences',
    description:
      'Responsive, interactive and visually engaging experiences across modern digital platforms.',
  },
  {
    icon: ShieldCheck,
    num: '(006)',
    title: 'Quality & Reliability',
    description:
      'A structured approach to development, testing and continuous improvement.',
  },
];

export const AboutPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const navigate = useNavigate();

  const openConsultation = () => {
    audioEngine.playSwoosh();
    setIsConsultOpen(true);
  };

  return (
    <div className="relative z-10 pt-32 pb-24 font-sans text-[var(--foreground)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

        {/* HERO */}
        <section className="relative overflow-hidden rounded-[2.5rem] border border-[#9047ff]/20 bg-[var(--card)]/40 p-8 sm:p-14 lg:p-20 text-center shadow-2xl backdrop-blur-xl">

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-[#9047ff]/15 blur-3xl" />
            <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-violet-600/15 blur-3xl" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative inline-flex items-center gap-2 rounded-full border border-[#9047ff]/30 bg-[#9047ff]/10 px-4 py-1.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#9047ff]" />
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#9047ff]">
              About AuMDS // Collective
            </span>
          </motion.div>

          <div className="relative mt-8">
            <SplitTextHeading
              as="h1"
              text="Building Digital Solutions With Purpose"
              className="text-4xl sm:text-6xl lg:text-7xl font-serif italic font-normal tracking-tight leading-[1.1] text-[var(--foreground)]"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative mx-auto mt-8 max-w-3xl text-base sm:text-lg leading-relaxed text-[var(--foreground)]/70 font-sans"
          >
            AuMDS is focused on creating meaningful digital experiences by
            bringing together technology, creativity, strategy and
            collaboration. We transform ideas into practical, scalable, and
            award-winning digital ecosystems.
          </motion.p>

          <div className="relative mt-10 flex flex-wrap justify-center gap-5">
            <EmotionButton
              variant="primary"
              onClick={() => navigate('/services')}
            >
              Explore Capabilities
            </EmotionButton>

            <EmotionButton
              variant="secondary"
              onClick={openConsultation}
            >
              Start a Conversation
            </EmotionButton>
          </div>
        </section>

        {/* WHO WE ARE */}
        <SectionScrollAnimation className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          <div className="rounded-[2.5rem] border border-[#9047ff]/20 bg-[var(--card)]/40 p-8 sm:p-12 backdrop-blur-xl">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#9047ff]">
              Who We Are
            </span>

            <h2 className="mt-4 text-3xl sm:text-4xl font-serif italic font-normal text-[var(--foreground)] leading-tight">
              Technology meets relentless creative vision.
            </h2>

            <p className="mt-6 text-sm sm:text-base leading-relaxed text-[var(--foreground)]/70">
              We believe technology should solve real problems and create
              deep emotional experiences. Our work combines thoughtful design,
              engineering, and strategic thinking to craft digital products
              that are useful, captivating, and built to endure.
            </p>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--foreground)]/70">
              From spatial WebXR applications to high-concurrency cloud systems, we
              focus on understanding the core objective first and building the
              optimal solution around it.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              ['Engineering', 'High-concurrency systems & WebXR engines'],
              ['Brand Universe', 'Visual narratives and 3D design languages'],
              ['TRIAD Guild', 'Talent acceleration & mentorship'],
              ['Compound Growth', 'Continuous optimization & scalability'],
            ].map(([title, text], index) => (
              <motion.div
                key={title}
                whileHover={{ y: -6, scale: 1.02 }}
                className="rounded-3xl border border-[#9047ff]/20 bg-[var(--card)]/40 p-6 shadow-lg backdrop-blur-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#9047ff]/10 text-[#9047ff] font-mono text-xs font-bold">
                  (0{index + 1})
                </div>

                <h3 className="mt-5 font-serif italic text-lg font-semibold text-[var(--foreground)]">{title}</h3>

                <p className="mt-2 text-xs leading-relaxed text-[var(--foreground)]/60 font-sans">
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </SectionScrollAnimation>

        {/* MISSION & VISION */}
        <SectionScrollAnimation>
          <div className="mb-12 text-center">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#9047ff]">
              Our Direction
            </span>

            <h2 className="mt-3 text-3xl sm:text-5xl font-serif italic font-normal text-[var(--foreground)]">
              Mission & Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <ElasticTiltCard
              glowColor="rgba(144, 71, 255, 0.25)"
              className="h-full"
            >
              <div className="h-full rounded-[2.5rem] border border-[#9047ff]/20 bg-[var(--card)]/40 p-8 sm:p-10 backdrop-blur-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#9047ff]/15">
                  <Target className="h-6 w-6 text-[#9047ff]" />
                </div>

                <h3 className="mt-6 text-2xl font-serif italic font-semibold text-[var(--foreground)]">
                  Our Mission
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-[var(--foreground)]/70">
                  To create reliable, innovative, and human-centered digital
                  solutions that empower businesses and visionaries to evolve from
                  initial concepts to measurable, global outcomes.
                </p>
              </div>
            </ElasticTiltCard>

            <ElasticTiltCard
              glowColor="rgba(144, 71, 255, 0.25)"
              className="h-full"
            >
              <div className="h-full rounded-[2.5rem] border border-[#9047ff]/20 bg-[var(--card)]/40 p-8 sm:p-10 backdrop-blur-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#9047ff]/15">
                  <Rocket className="h-6 w-6 text-[#9047ff]" />
                </div>

                <h3 className="mt-6 text-2xl font-serif italic font-semibold text-[var(--foreground)]">
                  Our Vision
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-[var(--foreground)]/70">
                  To architect a future where technology, design, and
                  collective collaboration merge into sustainable digital ecosystems
                  that elevate human capability.
                </p>
              </div>
            </ElasticTiltCard>

          </div>
        </SectionScrollAnimation>

        {/* CAPABILITIES */}
        <SectionScrollAnimation>
          <div className="mb-12 max-w-3xl">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#9047ff]">
              What We Do
            </span>

            <h2 className="mt-3 text-3xl sm:text-5xl font-serif italic font-normal text-[var(--foreground)]">
              Capabilities built around real needs.
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-[var(--foreground)]/70 font-sans">
              Our multidisciplinary studio combines engineering, design, and strategic
              execution to build future-ready solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAPABILITIES.map((item) => {
              const Icon = item.icon;

              return (
                <ElasticTiltCard
                  key={item.title}
                  glowColor="rgba(144, 71, 255, 0.2)"
                >
                  <div className="h-full rounded-3xl border border-[#9047ff]/20 bg-[var(--card)]/40 p-8 backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#9047ff]/10">
                        <Icon className="h-5 w-5 text-[#9047ff]" />
                      </div>

                      <span className="text-xs font-mono text-[#9047ff]">
                        {item.num}
                      </span>
                    </div>

                    <h3 className="mt-6 text-lg font-serif italic font-semibold text-[var(--foreground)]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)]/60 font-sans">
                      {item.description}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-xs font-mono font-semibold text-[#9047ff]">
                      <span>Learn more</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </ElasticTiltCard>
              );
            })}
          </div>
        </SectionScrollAnimation>

        {/* APPROACH */}
        <SectionScrollAnimation className="rounded-[2.5rem] border border-[#9047ff]/20 bg-[var(--card)]/40 p-8 sm:p-14 backdrop-blur-xl">

          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#9047ff]">
              Our Approach
            </span>

            <h2 className="mt-3 text-3xl sm:text-5xl font-serif italic font-normal text-[var(--foreground)]">
              A refined path from idea to impact.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {TIMELINE.map((item, index) => {
              const active = activeStep === index;

              return (
                <motion.button
                  key={item.year}
                  onClick={() => {
                    audioEngine.playClick();
                    setActiveStep(index);
                  }}
                  whileHover={{ y: -4 }}
                  className={`rounded-2xl border p-5 text-left transition-all ${
                    active
                      ? 'border-[#9047ff] bg-[#9047ff]/15 shadow-md shadow-[#9047ff]/10'
                      : 'border-[#9047ff]/15 bg-[var(--card)]/30 hover:border-[#9047ff]/40'
                  }`}
                >
                  <span className="text-xs font-mono text-[#9047ff]">
                    {item.year}
                  </span>

                  <h3 className="mt-3 font-serif italic text-base font-semibold text-[var(--foreground)]">
                    {item.title}
                  </h3>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="mt-6 rounded-2xl border border-[#9047ff]/20 bg-[var(--card)]/60 p-8 backdrop-blur-xl"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <CheckCircle2 className="h-5 w-5 text-[#9047ff]" />
                </div>

                <div>
                  <h3 className="text-xl font-serif italic font-semibold text-[var(--foreground)]">
                    {TIMELINE[activeStep].title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]/70 font-sans">
                    {TIMELINE[activeStep].description}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </SectionScrollAnimation>

        {/* CTA */}
        <SectionScrollAnimation>
          <section className="relative overflow-hidden rounded-[2.5rem] border border-[#9047ff]/30 bg-gradient-to-br from-[#9047ff]/15 via-[var(--card)] to-[#9047ff]/5 px-8 py-16 text-center sm:px-16 backdrop-blur-xl shadow-2xl">

            <div className="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[#9047ff]/20 blur-3xl" />

            <div className="relative mx-auto max-w-3xl">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#9047ff]">
                Collaboration
              </span>

              <h2 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-serif italic font-normal text-[var(--foreground)]">
                Have an ambition worth realizing?
              </h2>

              <p className="mt-5 text-sm sm:text-base leading-relaxed text-[var(--foreground)]/70 font-sans">
                Let's discuss your enterprise roadmap and explore how spatial technology,
                creative direction, and systems design can build your next era.
              </p>

              <div className="mt-10 flex justify-center">
                <EmotionButton
                  variant="primary"
                  onClick={openConsultation}
                >
                  Start a Conversation
                </EmotionButton>
              </div>
            </div>
          </section>
        </SectionScrollAnimation>

      </div>

      <ConsultationModal
        isOpen={isConsultOpen}
        onClose={() => setIsConsultOpen(false)}
      />
    </div>
  );
};