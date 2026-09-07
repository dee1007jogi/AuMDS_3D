import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplitTextHeading } from '../components/SplitTextHeading';
import { MagneticGlowButton } from '../components/MagneticGlowButton';
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
    year: '01',
    title: 'Understand',
    description:
      'We begin by understanding the business objective, audience, challenges and opportunities.',
  },
  {
    year: '02',
    title: 'Design',
    description:
      'We transform requirements into clear digital experiences, visual systems and scalable solutions.',
  },
  {
    year: '03',
    title: 'Build',
    description:
      'Our development approach focuses on reliable technology, responsive interfaces and maintainable code.',
  },
  {
    year: '04',
    title: 'Grow',
    description:
      'We continuously improve products through feedback, optimization, innovation and measurable outcomes.',
  },
];

const CAPABILITIES = [
  {
    icon: Code2,
    title: 'Technology Solutions',
    description:
      'Modern web applications and digital solutions designed around real business requirements.',
  },
  {
    icon: Lightbulb,
    title: 'Digital Innovation',
    description:
      'Creative technology concepts that help organizations explore new opportunities and improve experiences.',
  },
  {
    icon: Target,
    title: 'Business Strategy',
    description:
      'Practical digital strategies that connect technology decisions with business goals.',
  },
  {
    icon: Users,
    title: 'Talent & Collaboration',
    description:
      'Collaborative development and learning environments that encourage technical growth and innovation.',
  },
  {
    icon: Globe,
    title: 'Digital Experiences',
    description:
      'Responsive, interactive and visually engaging experiences across modern digital platforms.',
  },
  {
    icon: ShieldCheck,
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
    <div className="relative z-10 pt-28 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* HERO */}
        <section className="relative overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-slate-950/80 px-6 py-16 sm:px-12 lg:px-20 text-center shadow-2xl">

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-4 py-2"
          >
            <Sparkles className="h-4 w-4 text-cyan-300" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
              About AuMDS
            </span>
          </motion.div>

          <div className="relative mt-7">
            <SplitTextHeading
              as="h1"
              text="Building Digital Solutions With Purpose"
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-display leading-tight"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative mx-auto mt-7 max-w-3xl text-base sm:text-lg leading-relaxed text-slate-300"
          >
            AuMDS is focused on creating meaningful digital experiences by
            bringing together technology, creativity, strategy and
            collaboration. We aim to turn ideas into practical and scalable
            digital solutions.
          </motion.p>

          <div className="relative mt-9 flex flex-wrap justify-center gap-4">
            <MagneticGlowButton
              variant="primary"
              onClick={() => navigate('/services')}
            >
              Explore Our Services
            </MagneticGlowButton>

            <MagneticGlowButton
              variant="secondary"
              onClick={openConsultation}
            >
              Start a Conversation
            </MagneticGlowButton>
          </div>
        </section>

        {/* WHO WE ARE */}
        <SectionScrollAnimation className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 sm:p-10 backdrop-blur-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
              Who We Are
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white font-display">
              Technology meets creativity.
            </h2>

            <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-300">
              We believe technology should solve real problems and create
              better experiences. Our work combines thoughtful design,
              engineering and strategic thinking to create digital products
              that are useful, engaging and adaptable.
            </p>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-300">
              From digital experiences to technology-driven initiatives, we
              focus on understanding the problem first and then building the
              right solution around it.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              ['Technology', 'Engineering-driven solutions'],
              ['Innovation', 'Ideas converted into experiences'],
              ['Collaboration', 'People-first working approach'],
              ['Growth', 'Continuous improvement'],
            ].map(([title, text], index) => (
              <motion.div
                key={title}
                whileHover={{ y: -6, scale: 1.02 }}
                className="rounded-3xl border border-cyan-400/15 bg-slate-950/80 p-6 shadow-xl"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                  <span className="text-sm font-bold">0{index + 1}</span>
                </div>

                <h3 className="mt-5 font-bold text-white">{title}</h3>

                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </SectionScrollAnimation>

        {/* MISSION & VISION */}
        <SectionScrollAnimation>
          <div className="mb-10 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
              Our Direction
            </span>

            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white font-display">
              Mission & Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <ElasticTiltCard
              glowColor="rgba(34, 211, 238, 0.25)"
              className="h-full"
            >
              <div className="h-full rounded-3xl border border-cyan-400/20 bg-slate-900/70 p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10">
                  <Target className="h-6 w-6 text-cyan-300" />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-white">
                  Our Mission
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  To create reliable, innovative and human-centered digital
                  solutions that help businesses and individuals move from
                  ideas to meaningful outcomes.
                </p>
              </div>
            </ElasticTiltCard>

            <ElasticTiltCard
              glowColor="rgba(139, 92, 246, 0.25)"
              className="h-full"
            >
              <div className="h-full rounded-3xl border border-violet-400/20 bg-slate-900/70 p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-400/10">
                  <Rocket className="h-6 w-6 text-violet-300" />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-white">
                  Our Vision
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  To build a future where technology, creativity and
                  collaboration work together to create sustainable digital
                  growth and better user experiences.
                </p>
              </div>
            </ElasticTiltCard>

          </div>
        </SectionScrollAnimation>

        {/* CAPABILITIES */}
        <SectionScrollAnimation>
          <div className="mb-10 max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
              What We Do
            </span>

            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white font-display">
              Capabilities built around real needs.
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Our multidisciplinary approach helps us create solutions that
              combine technology, design, strategy and collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAPABILITIES.map((item, index) => {
              const Icon = item.icon;

              return (
                <ElasticTiltCard
                  key={item.title}
                  glowColor="rgba(56, 189, 248, 0.22)"
                >
                  <div className="h-full rounded-3xl border border-white/10 bg-slate-900/70 p-7">
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10">
                        <Icon className="h-5 w-5 text-cyan-300" />
                      </div>

                      <span className="text-xs font-mono text-slate-500">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-6 text-lg font-bold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-slate-400">
                      {item.description}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-cyan-300">
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
        <SectionScrollAnimation className="rounded-3xl border border-cyan-400/15 bg-slate-950/70 p-8 sm:p-12">

          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
              Our Approach
            </span>

            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white font-display">
              A simple path from idea to impact.
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
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
                      ? 'border-cyan-400/60 bg-cyan-400/10'
                      : 'border-white/10 bg-slate-900/60 hover:border-cyan-400/30'
                  }`}
                >
                  <span className="text-xs font-mono text-cyan-400">
                    {item.year}
                  </span>

                  <h3 className="mt-3 font-bold text-white">
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
              className="mt-5 rounded-2xl border border-white/10 bg-slate-900/80 p-7"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">
                    {TIMELINE[activeStep].title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {TIMELINE[activeStep].description}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </SectionScrollAnimation>

        {/* CTA */}
        <SectionScrollAnimation>
          <section className="relative overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 py-14 text-center sm:px-12">

            <div className="absolute -top-20 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative mx-auto max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Let's Build Together
              </span>

              <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-white font-display">
                Have an idea worth building?
              </h2>

              <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-300">
                Let's discuss your requirements and explore how technology,
                creativity and strategy can turn your idea into a practical
                digital solution.
              </p>

              <div className="mt-8 flex justify-center">
                <MagneticGlowButton
                  variant="primary"
                  onClick={openConsultation}
                >
                  Start a Conversation
                </MagneticGlowButton>
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