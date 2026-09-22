import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, CornerDownRight, Sparkles } from 'lucide-react';
import { EmotionButton } from './EmotionButton';
import { audioEngine } from './AudioEngine';

interface StoryScreen {
  id: string;
  pill: string;
  titlePrefix?: string;
  titleItalic?: string;
  titleSuffix?: string;
  arrowIcon?: boolean;
  desc: string;
}

const SCREENS: StoryScreen[] = [
  {
    id: 'screen-1',
    pill: '01 / CORE VISION',
    titlePrefix: 'Where ',
    titleItalic: 'ambitious ideas',
    titleSuffix: ' become interfaces people remember',
    arrowIcon: false,
    desc: 'Au Multidimensional Solutions constructs high-leverage software architectures, spatial 3D branding, and venture platforms engineered for enduring market authority.',
  },
  {
    id: 'screen-2',
    pill: '02 / APPROACH',
    titlePrefix: 'We ',
    titleItalic: 'build',
    titleSuffix: ' more than software and brands',
    arrowIcon: true,
    desc: 'We architect enterprise ecosystems where deep-tech code, statutory governance, and cinematic storytelling speak the exact same language.',
  },
  {
    id: 'screen-3',
    pill: '03 / PHILOSOPHY',
    titlePrefix: 'Technology ',
    titleItalic: 'as emotion',
    titleSuffix: '',
    arrowIcon: true,
    desc: 'We transform algorithms into feeling, spatial motion into meaning, and corporate interactions into unforgettable user memory.',
  },
  {
    id: 'screen-4',
    pill: '04 / PURPOSE',
    titlePrefix: 'Beauty ',
    titleItalic: 'With a reason',
    titleSuffix: '',
    arrowIcon: false,
    desc: 'Every pixel, database query, and brand asset has a reason. We design to solve complex founder bottlenecks and generate tangible enterprise value.',
  },
  {
    id: 'screen-5',
    pill: '05 / OUR TRIBE',
    titlePrefix: 'We build with ',
    titleItalic: 'founders who care',
    titleSuffix: ' how their brands feel',
    arrowIcon: true,
    desc: 'From solo bootstrappers to blitzscaling enterprises, our highest-impact work begins when visionary teams demand the top 1% standard.',
  },
];

export interface EmotionHeroStorytellingProps {
  onOpenConsult: () => void;
}

export const EmotionHeroStorytelling: React.FC<EmotionHeroStorytellingProps> = ({ onOpenConsult }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextScreen = () => {
    audioEngine.playSwoosh();
    setActiveIndex((prev) => (prev + 1) % SCREENS.length);
  };

  const prevScreen = () => {
    audioEngine.playClick();
    setActiveIndex((prev) => (prev - 1 + SCREENS.length) % SCREENS.length);
  };

  const current = SCREENS[activeIndex];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-12 px-6 sm:px-12 max-w-[1440px] mx-auto overflow-hidden">
      {/* Top Telemetry & Screen Indicator Pills */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-current/10 pb-6">
        <div className="flex items-center gap-2">
          {SCREENS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                audioEngine.playClick();
                setActiveIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                activeIndex === idx ? 'w-10 bg-[#9047ff]' : 'w-2.5 bg-current/20 hover:bg-current/40'
              }`}
              aria-label={`Go to story ${idx + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase opacity-70">
          <span>{`0${activeIndex + 1} / 0${SCREENS.length}`}</span>
          <span>•</span>
          <span>Bengaluru 12.92° N</span>
          <span>•</span>
          <span className="text-[#9047ff] font-bold">AuMDS Studio</span>
        </div>
      </div>

      {/* Main Editorial Story Content Area with AnimatePresence */}
      <div className="my-auto py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -25, filter: 'blur(8px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col space-y-8"
          >
            {/* Monospace Section Pill */}
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#9047ff] text-white text-[11px] font-mono tracking-wider uppercase font-bold shadow-md shadow-purple-500/20">
                <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
                {current.pill}
              </span>
            </div>

            {/* Massive Editorial Serif Headline */}
            <h1 className="font-emotion-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.75rem] font-light leading-[0.9] tracking-tight max-w-5xl">
              {current.titlePrefix && <span>{current.titlePrefix}</span>}
              {current.arrowIcon && (
                <span className="inline-block mr-3 text-[#9047ff] font-mono font-normal">
                  ↪
                </span>
              )}
              {current.titleItalic && (
                <em className="italic font-normal text-[#9047ff] tracking-normal mr-2">
                  {current.titleItalic}
                </em>
              )}
              {current.titleSuffix && <span>{current.titleSuffix}</span>}
            </h1>

            {/* Bottom Row: Justified Monospace Text + Action CTAs */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-4">
              <p className="md:col-span-7 font-emotion-mono text-xs sm:text-sm tracking-wide uppercase leading-relaxed text-left opacity-80 max-w-xl">
                {current.desc}
              </p>

              <div className="md:col-span-5 flex flex-wrap items-center gap-3 md:justify-end">
                <EmotionButton
                  variant="primary"
                  size="md"
                  onClick={onOpenConsult}
                  icon={<CornerDownRight className="w-4 h-4" />}
                >
                  Let's talk
                </EmotionButton>

                <EmotionButton
                  variant="outline"
                  size="md"
                  onClick={nextScreen}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Next Story
                </EmotionButton>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hero Bottom Telemetry Grid matching Emotion Agency */}
      <div className="border-t border-current/10 pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
        <div>
          <span className="opacity-50 block uppercase tracking-wider text-[10px]">Capabilities</span>
          <span className="font-semibold text-sm">Deep-Tech & 3D WebGL</span>
        </div>
        <div>
          <span className="opacity-50 block uppercase tracking-wider text-[10px]">Incubation</span>
          <span className="font-semibold text-sm">TRIAD Engineering</span>
        </div>
        <div>
          <span className="opacity-50 block uppercase tracking-wider text-[10px]">Alliance</span>
          <span className="font-semibold text-sm">SatChai Founder Guild</span>
        </div>
        <div>
          <span className="opacity-50 block uppercase tracking-wider text-[10px]">Governance</span>
          <span className="font-semibold text-sm">Corporate Legal & Tax</span>
        </div>
      </div>
    </section>
  );
};
