import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export interface SectionScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  enableParallax?: boolean;
}

export const SectionScrollAnimation: React.FC<SectionScrollAnimationProps> = ({
  children,
  className = '',
  id,
  delay = 0,
  direction = 'up',
  enableParallax = true,
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 250,
    damping: 30,
  });

  // Continuous subtle scroll parallax scale & perspective
  const scale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.93, 1, 1, 0.96]);
  const opacity = useTransform(smoothProgress, [0, 0.25, 0.85, 1], [0.4, 1, 1, 0.6]);

  const getInitial = () => {
    switch (direction) {
      case 'left':
        return { opacity: 0, x: -30, filter: 'blur(8px)', scale: 0.98 };
      case 'right':
        return { opacity: 0, x: 30, filter: 'blur(8px)', scale: 0.98 };
      case 'down':
        return { opacity: 0, y: -20, filter: 'blur(8px)', scale: 0.98 };
      case 'up':
      default:
        return { opacity: 0, y: 20, filter: 'blur(8px)', scale: 0.98 };
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
      viewport={{ once: true, margin: '0px' }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.16, 1, 0.3, 1], // Smooth cubic bezier
      }}
      className={`relative overflow-hidden will-change-transform transform-gpu ${className}`}
    >
      {/* Animated Glowing Top Horizon Beam that sweeps across on scroll */}
      <motion.div
        initial={{ x: '-100%' }}
        whileInView={{ x: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: delay + 0.2, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-30 opacity-80"
      />

      {children}
    </motion.section>
  );
};
