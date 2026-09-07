import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import { Code2, Palette, TrendingUp, GraduationCap, ArrowUpRight, Sparkles, Layers, Zap, ChevronDown, CheckCircle2 } from 'lucide-react';
import { audioEngine } from './AudioEngine';
import { useNavigate } from 'react-router-dom';

interface SolutionPillar {
  id: string;
  index: number;
  tag: string;
  node: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  image: string;
  accentColor: string;
  borderColor: string;
  glowColor: string;
  badgeBg: string;
  badgeText: string;
  route: string;
  stackRotate: number;
  stackOffset: { x: number; y: number };
  dealRange: [number, number]; // [startProgress, endProgress]
}

const PILLARS: SolutionPillar[] = [
  {
    id: 'software',
    index: 0,
    tag: 'PILLAR 01 // ARCHITECTURE',
    node: 'NODE_01 // DEEP-TECH',
    title: 'Deep-Tech & Software Engineering',
    subtitle: 'Tailored digital solutions from ideation to scale',
    description: 'We construct high-concurrency cloud systems, modern web platforms, automation workflows, and machine intelligence pipelines designed for extreme reliability.',
    features: ['Custom Web & Mobile Platforms', 'API & Distributed Architecture', 'Autonomous Cloud Workflows'],
    icon: <Code2 className="w-5 h-5 text-cyan-400" />,
    image: '/images/pillars/pillar_deeptech.jpg',
    accentColor: 'from-cyan-500/25 to-blue-600/10',
    borderColor: 'border-cyan-500/40 hover:border-cyan-400',
    glowColor: 'rgba(56, 189, 248, 0.35)',
    badgeBg: 'bg-cyan-950/80 border-cyan-500/40 text-cyan-300',
    badgeText: 'text-cyan-400',
    route: '/services',
    stackRotate: -7,
    stackOffset: { x: -16, y: -8 },
    dealRange: [0.08, 0.32],
  },
  {
    id: 'branding',
    index: 1,
    tag: 'PILLAR 02 // IDENTITY',
    node: 'NODE_02 // BRAND IDENTITY',
    title: 'Brand Universe & Creative Systems',
    subtitle: 'Co-creating iconic, multi-channel brand presence',
    description: 'From enterprise business incorporation to high-impact visual design and strategic social media storytelling, we build brands that command market authority.',
    features: ['Complete Brand Incorporation', 'Visual Design Systems', 'High-Impact Content Strategy'],
    icon: <Palette className="w-5 h-5 text-amber-400" />,
    image: '/images/pillars/pillar_branding.jpg',
    accentColor: 'from-amber-500/25 to-orange-600/10',
    borderColor: 'border-amber-500/40 hover:border-amber-400',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    badgeBg: 'bg-amber-950/80 border-amber-500/40 text-amber-300',
    badgeText: 'text-amber-400',
    route: '/services',
    stackRotate: -2,
    stackOffset: { x: -6, y: -2 },
    dealRange: [0.20, 0.46],
  },
  {
    id: 'expansion',
    index: 2,
    tag: 'PILLAR 03 // SCALING',
    node: 'NODE_03 // GLOBAL VENTURES',
    title: 'Business Modeling & Global Expansion',
    subtitle: 'End-to-end acceleration for high-growth ventures',
    description: 'Transforming local enterprises into global powerhouses through strategic business modeling, client acquisition engines, and international expansion frameworks.',
    features: ['Robust Business Modeling', 'Client Acquisition Funnels', 'Global Scaling Infrastructure'],
    icon: <TrendingUp className="w-5 h-5 text-indigo-400" />,
    image: '/images/pillars/pillar_expansion.jpg',
    accentColor: 'from-indigo-500/25 to-purple-600/10',
    borderColor: 'border-indigo-500/40 hover:border-indigo-400',
    glowColor: 'rgba(99, 102, 241, 0.35)',
    badgeBg: 'bg-indigo-950/80 border-indigo-500/40 text-indigo-300',
    badgeText: 'text-indigo-400',
    route: '/services',
    stackRotate: 3,
    stackOffset: { x: 6, y: 4 },
    dealRange: [0.35, 0.62],
  },
  {
    id: 'triad-sdw',
    index: 3,
    tag: 'PILLAR 04 // TALENT MATRIX',
    node: 'NODE_04 // TRIAD & SDW',
    title: 'SDW & TRIAD Incubation Program',
    subtitle: 'Skill Development Wing for tomorrow’s leaders',
    description: 'Empowering freshers, engineers, and career-shifters through structured live corporate projects, specialized mentorship, and executive SatChai networking.',
    features: ['TRIAD Custom Internship Cohorts', 'Skill Development Wing (SDW)', 'SatChai Executive Networking'],
    icon: <GraduationCap className="w-5 h-5 text-emerald-400" />,
    image: '/images/pillars/pillar_talent.jpg',
    accentColor: 'from-emerald-500/25 to-teal-600/10',
    borderColor: 'border-emerald-500/40 hover:border-emerald-400',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    badgeBg: 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300',
    badgeText: 'text-emerald-400',
    route: '/ecosystem',
    stackRotate: 8,
    stackOffset: { x: 16, y: 10 },
    dealRange: [0.48, 0.76],
  },
];

interface DeltaOffset {
  x: number;
  y: number;
  scale: number;
  isReady: boolean;
}

// Interactive Stacked Header Deck Component
function StackedOriginDeck({
  pillars,
  stackRef,
  scrollProgress,
  onCardClick,
}: {
  pillars: SolutionPillar[];
  stackRef: React.RefObject<HTMLDivElement>;
  scrollProgress: any;
  onCardClick: (idx: number) => void;
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Deck ghost wireframe opacity as cards deal out
  const deckGuideOpacity = useTransform(scrollProgress, [0, 0.4, 0.8], [1, 0.85, 0.4]);

  return (
    <div
      ref={stackRef}
      className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md h-52 sm:h-56 flex items-center justify-center select-none"
    >
      {/* Background ambient lighting aura */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 via-amber-500/15 to-indigo-500/15 rounded-3xl blur-2xl -z-10 pointer-events-none" />

      {/* Origin Stack Outline / Ghost Receptor Base */}
      <motion.div
        style={{ opacity: deckGuideOpacity }}
        className="absolute w-64 sm:w-72 h-36 sm:h-40 rounded-2xl border-2 border-dashed border-cyan-500/30 bg-slate-950/40 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center pointer-events-none"
      >
        <div className="flex items-center gap-2 text-cyan-400 mb-1">
          <Layers className="w-4 h-4 animate-pulse" />
          <span className="text-[11px] font-mono tracking-wider font-bold uppercase">
            ORIGIN MATRIX DECK
          </span>
        </div>
        <p className="text-[10px] font-mono text-slate-400">
          4 Dimensions Stacking Origin
        </p>
      </motion.div>

      {/* Floating interactive indicator pill */}
      <div className="absolute -bottom-2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-white/15 text-[10px] font-mono text-cyan-300 backdrop-blur-md shadow-lg z-20">
        <Sparkles className="w-3 h-3 text-amber-400 animate-spin" />
        <span>Scroll to Deploy 4 Cards</span>
        <ChevronDown className="w-3 h-3 text-cyan-400 animate-bounce" />
      </div>
    </div>
  );
}

// 3D Content Box Card with Traveling Image
function SolutionCard({
  pillar,
  cardRef,
  imageDockRef,
  delta,
  scrollProgress,
}: {
  pillar: SolutionPillar;
  cardRef: React.RefObject<HTMLDivElement>;
  imageDockRef: React.RefObject<HTMLDivElement>;
  delta: DeltaOffset;
  scrollProgress: any;
}) {
  const navigate = useNavigate();
  const innerRef = useRef<HTMLDivElement>(null);

  // 3D interactive spring tilt on hover
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 400, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 400, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-6deg', '6deg']);

  // Scroll Dealing Math:
  // When scrollProgress is at 0 (top), the image card position is offset by delta (stack position)
  // As scrollProgress crosses dealRange [start, end], image transitions smoothly from stack to dock (0, 0, rot 0, scale 1)
  const [startP, endP] = pillar.dealRange;

  const startX = delta.isReady ? delta.x + pillar.stackOffset.x : -120;
  const startY = delta.isReady ? delta.y + pillar.stackOffset.y : -250;
  const startScale = delta.isReady ? Math.max(delta.scale, 0.7) : 0.85;

  const imageX = useTransform(
    scrollProgress,
    [0, startP, endP],
    [startX, startX, 0]
  );

  const imageY = useTransform(
    scrollProgress,
    [0, startP, endP],
    [startY, startY, 0]
  );

  const imageRotate = useTransform(
    scrollProgress,
    [0, startP, endP],
    [pillar.stackRotate, pillar.stackRotate, 0]
  );

  const imageScale = useTransform(
    scrollProgress,
    [0, startP, endP],
    [startScale, startScale, 1]
  );

  // Elevation Shadow and Z-index during flight
  const imageZIndex = useTransform(
    scrollProgress,
    [0, startP, endP, endP + 0.05],
    [30 - pillar.index, 40, 20, 10]
  );

  const isDocked = useTransform(
    scrollProgress,
    [0, endP - 0.02, endP],
    [0, 0, 1]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!innerRef.current) return;
    const rect = innerRef.current.getBoundingClientRect();
    const mouseXFromCenter = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseYFromCenter = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseXFromCenter);
    y.set(mouseYFromCenter);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef || innerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => audioEngine.playHover()}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{
        scale: 1.02,
        y: -4,
        transition: { type: 'spring', stiffness: 400, damping: 14 },
      }}
      className={`relative rounded-3xl bg-slate-900/80 border border-white/10 p-6 sm:p-7 backdrop-blur-2xl transition-all duration-300 ${pillar.borderColor} shadow-2xl flex flex-col justify-between group overflow-visible`}
    >
      {/* Dynamic ambient gradient glow */}
      <div
        className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${pillar.accentColor} rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
      />

      <div>
        {/* Top Header Row with Pillar Tag & Launch Icon */}
        <div className="flex justify-between items-start mb-4">
          <span className={`text-[11px] font-mono tracking-widest px-3.5 py-1 rounded-full font-bold border ${pillar.badgeBg}`}>
            {pillar.tag}
          </span>
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="p-3 rounded-2xl bg-slate-900/90 border border-white/10 shadow-lg"
          >
            {pillar.icon}
          </motion.div>
        </div>

        {/* IMAGE DOCK / FLIGHT CONTAINER */}
        <div
          ref={imageDockRef}
          className="relative w-full h-44 sm:h-52 rounded-2xl mb-6 border border-white/10 bg-slate-950/60 overflow-visible"
        >
          {/* Target Docking Receptor Outline */}
          <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-cyan-500/20 flex items-center justify-center pointer-events-none">
            <span className="text-[10px] font-mono text-cyan-400/40 tracking-wider uppercase font-bold">
              [DOCKING MATRIX: {pillar.node.split('//')[0].trim()}]
            </span>
          </div>

          {/* FLYING STACKED IMAGE ELEMENT */}
          <motion.div
            style={{
              x: imageX,
              y: imageY,
              rotate: imageRotate,
              scale: imageScale,
              zIndex: imageZIndex,
            }}
            className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border border-white/20 group-hover:border-cyan-400/60 transition-colors duration-300 bg-slate-900 will-change-transform origin-center"
          >
            <img
              src={pillar.image}
              alt={pillar.title}
              className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700 ease-out"
            />

            {/* Futuristic Scanline and Vignette Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

            {/* Node Meta Badge Overlay */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/85 border border-white/15 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono text-white/95 font-semibold tracking-wider">
                {pillar.node}
              </span>
            </div>

            {/* Dynamic Status Pill */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/85 border border-white/15 backdrop-blur-md">
              <Zap className="w-3 h-3 text-amber-400" />
              <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase">
                DIMENSION READY
              </span>
            </div>
          </motion.div>
        </div>

        {/* Pillar Titles & Subtitle */}
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-cyan-200 transition-colors duration-300 font-display">
          {pillar.title}
        </h3>
        <p className={`text-xs font-mono mt-1 font-semibold ${pillar.badgeText}`}>
          {pillar.subtitle}
        </p>

        {/* Detailed Pillar Description */}
        <p className="mt-3.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
          {pillar.description}
        </p>
      </div>

      {/* Feature Pills & Action Footer */}
      <div className="mt-6 pt-5 border-t border-white/10">
        <ul className="space-y-2 mb-6">
          {pillar.features.map((feat, i) => (
            <li key={i} className="text-xs font-mono text-slate-300 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              {feat}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
            Dimension Active
          </span>
          <motion.button
            whileHover={{ scale: 1.12, rotate: 45 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              audioEngine.playClick();
              navigate(pillar.route);
            }}
            className="w-10 h-10 rounded-full bg-slate-800/90 border border-white/15 flex items-center justify-center text-slate-200 group-hover:bg-cyan-400 group-hover:text-slate-950 group-hover:border-cyan-400 transition-all duration-300 shadow-md"
            aria-label={`Explore ${pillar.title}`}
          >
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export const SolutionsMatrix: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  // References to the 4 content box containers & their image docking viewports
  const cardRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const dockRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  // Calculated spatial deltas between stack origin and each image dock
  const [deltas, setDeltas] = useState<DeltaOffset[]>([
    { x: 0, y: 0, scale: 0.8, isReady: false },
    { x: 0, y: 0, scale: 0.8, isReady: false },
    { x: 0, y: 0, scale: 0.8, isReady: false },
    { x: 0, y: 0, scale: 0.8, isReady: false },
  ]);

  // Recalculate exact pixel offsets for true continuous physical flight
  const calculateDeltas = useCallback(() => {
    if (!stackRef.current) return;
    const stackRect = stackRef.current.getBoundingClientRect();

    const newDeltas: DeltaOffset[] = dockRefs.map((dockRef) => {
      if (!dockRef.current) return { x: 0, y: 0, scale: 0.8, isReady: false };
      const dockRect = dockRef.current.getBoundingClientRect();

      const deltaX = (stackRect.left + stackRect.width / 2) - (dockRect.left + dockRect.width / 2);
      const deltaY = (stackRect.top + stackRect.height / 2) - (dockRect.top + dockRect.height / 2);
      const scale = dockRect.width > 0 ? (stackRect.width * 0.75) / dockRect.width : 0.8;

      return {
        x: deltaX,
        y: deltaY,
        scale: scale,
        isReady: true,
      };
    });

    setDeltas(newDeltas);
  }, []);

  useEffect(() => {
    // Initial measurement
    const timer = setTimeout(calculateDeltas, 100);
    window.addEventListener('resize', calculateDeltas);
    window.addEventListener('scroll', calculateDeltas, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateDeltas);
      window.removeEventListener('scroll', calculateDeltas);
    };
  }, [calculateDeltas]);

  // Track scroll progress of the Solutions section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 85%', 'end 35%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 30,
    mass: 0.8,
  });

  const handleScrollToCard = (idx: number) => {
    if (cardRefs[idx]?.current) {
      cardRefs[idx].current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="py-20 relative z-10 overflow-visible section-aura-indigo rounded-3xl max-w-7xl mx-auto my-8 px-6 sm:px-10 lg:px-12 shadow-2xl"
      aria-label="Solutions Matrix"
    >
      <div className="relative z-10">
        {/* Horizontal Split Section Header with Stacked Images next to Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Left / Heading Side (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-950/60 backdrop-blur-md mb-4 shadow-lg w-fit">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase font-bold">
                CORE CAPABILITIES
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display leading-[1.12]">
              Multidimensional Architecture
            </h2>
            <p className="mt-4 text-slate-300 text-sm md:text-base max-w-xl leading-relaxed font-normal">
              From algorithmic technology stacks to business incorporation and high-performance talent incubation. Watch the 4 stacked dimensions distribute into each active matrix node as you scroll down.
            </p>

            {/* Micro Telemetry Pills */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                4 Active Matrix Nodes
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-white/10">
                <Zap className="w-3 h-3 text-amber-400" />
                Scroll-Driven Spatial Dealing
              </span>
            </div>
          </div>

          {/* Right Side: Stacked Images Visual Deck next to Heading (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
            <StackedOriginDeck
              pillars={PILLARS}
              stackRef={stackRef}
              scrollProgress={smoothProgress}
              onCardClick={handleScrollToCard}
            />
          </div>
        </div>

        {/* 2x2 Interactive Tilt Grid with Dealt Images into Each Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-1000">
          {PILLARS.map((pillar, idx) => (
            <SolutionCard
              key={pillar.id}
              pillar={pillar}
              cardRef={cardRefs[idx]}
              imageDockRef={dockRefs[idx]}
              delta={deltas[idx]}
              scrollProgress={smoothProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
