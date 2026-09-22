import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export interface SectionScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  enableParallax?: boolean;
  themeVariant?: 'dark-glass' | 'light-pastel' | 'transparent';
  badgeLabel?: string;
}

export const SectionScrollAnimation: React.FC<SectionScrollAnimationProps> = ({
  children,
  className = '',
  id,
  delay = 0,
  direction = 'up',
  enableParallax = true,
  themeVariant = 'transparent',
  badgeLabel,
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 28,
  });

  // Layer 1: Container subtle scroll scale & perspective
  const scale = useTransform(smoothProgress, [0, 0.25, 0.75, 1], [0.94, 1, 1, 0.96]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.85, 1], [0.45, 1, 1, 0.65]);

  // Layer 2: Parallax background ambient orbs (opposite translation for depth)
  const bgOrbY1 = useTransform(smoothProgress, [0, 1], [-50, 50]);
  const bgOrbY2 = useTransform(smoothProgress, [0, 1], [40, -40]);
  const bgOrbRotate = useTransform(smoothProgress, [0, 1], [-12, 12]);

  // Layer 3: Foreground floating badge / light accent
  const fgBadgeY = useTransform(smoothProgress, [0, 1], [25, -25]);

  const getInitial = () => {
    switch (direction) {
      case 'left':
        return { opacity: 0, x: -35, filter: 'blur(10px)', scale: 0.97 };
      case 'right':
        return { opacity: 0, x: 35, filter: 'blur(10px)', scale: 0.97 };
      case 'down':
        return { opacity: 0, y: -25, filter: 'blur(10px)', scale: 0.97 };
      case 'up':
      default:
        return { opacity: 0, y: 25, filter: 'blur(10px)', scale: 0.97 };
    }
  };

  const getThemeClass = () => {
    switch (themeVariant) {
      case 'dark-glass':
        return 'dark-glassmorphism rounded-[2.5rem] p-6 sm:p-10 md:p-12 shadow-2xl';
      case 'light-pastel':
        return 'light-pastel-glass rounded-[2.5rem] p-6 sm:p-10 md:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.2)]';
      case 'transparent':
      default:
        return '';
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      style={enableParallax ? { scale, opacity } : {}}
      initial={getInitial()}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
        scale: 1,
      }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative overflow-hidden will-change-transform transform-gpu ${getThemeClass()} ${className}`}
    >
      {/* LAYER 1: Deep Spatial Parallax Ambient Background Orbs */}
      {themeVariant === 'dark-glass' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <motion.div
            style={{ y: bgOrbY1, rotate: bgOrbRotate }}
            className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-cyan-500/12 blur-[100px] pointer-events-none animate-float-layer-1"
          />
          <motion.div
            style={{ y: bgOrbY2 }}
            className="absolute -bottom-24 -right-20 w-96 h-96 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none animate-float-layer-2"
          />
          <div className="absolute inset-0 portal-grid-mesh opacity-20 pointer-events-none" />
        </div>
      )}

      {themeVariant === 'light-pastel' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <motion.div
            style={{ y: bgOrbY1, rotate: bgOrbRotate }}
            className="absolute -top-20 -left-16 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-indigo-200/50 via-sky-200/40 to-cyan-100/30 blur-[90px] pointer-events-none animate-float-layer-1"
          />
          <motion.div
            style={{ y: bgOrbY2 }}
            className="absolute -bottom-20 -right-16 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-amber-100/60 via-rose-100/50 to-orange-100/40 blur-[90px] pointer-events-none animate-float-layer-2"
          />
          <motion.div
            style={{ y: bgOrbY1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-emerald-100/30 blur-[110px] pointer-events-none"
          />
        </div>
      )}

      {/* LAYER 2: Animated Horizon Shimmer Sweep across top rim */}
      <motion.div
        initial={{ x: '-100%' }}
        whileInView={{ x: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, delay: delay + 0.15, ease: 'easeInOut' }}
        className={`pointer-events-none absolute top-0 left-0 right-0 h-[2px] z-30 opacity-90 ${
          themeVariant === 'light-pastel'
            ? 'bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent'
            : 'bg-gradient-to-r from-transparent via-cyan-400 to-transparent'
        }`}
      />

      {/* LAYER 3: Optional Parallax Floating Theme Hallmark Badge */}
      {badgeLabel && (
        <motion.div
          style={{ y: fgBadgeY }}
          className="absolute top-6 right-8 z-20 pointer-events-none hidden sm:block"
        >
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-bold border backdrop-blur-md shadow-sm ${
              themeVariant === 'light-pastel'
                ? 'bg-white/80 border-slate-300/80 text-slate-700 shadow-[0_2px_10px_rgba(0,0,0,0.05)]'
                : 'bg-slate-900/80 border-cyan-500/30 text-cyan-300'
            }`}
          >
            {badgeLabel}
          </span>
        </motion.div>
      )}

      {/* LAYER 4: Section Interactive Content */}
      <div className="relative z-10 w-full">{children}</div>
    </motion.section>
  );
};
