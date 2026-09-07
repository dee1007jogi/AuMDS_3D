import React, { useRef, useState, useCallback } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

export interface SplitTextHeadingProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span';
  staggerDelay?: number;
  threshold?: number;
  once?: boolean;
}

export const SplitTextHeading: React.FC<SplitTextHeadingProps> = ({
  text,
  className = '',
  as: Component = 'h1',
  staggerDelay = 0.02,
  threshold = 0.2,
  once = true,
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(containerRef, { amount: threshold, once });

  const [mousePos, setMousePos] = useState<{ x: number; y: number; isHovered: boolean }>({
    x: -999,
    y: -999,
    isHovered: false,
  });

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLHeadingElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y, isHovered: true });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setMousePos((prev) => ({ ...prev, isHovered: false }));
  }, []);

  const words = text.split(' ');

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay * 2,
        delayChildren: 0.1,
      },
    },
  };

  const characterVariants: Variants = {
    hidden: {
      y: '120%',
      opacity: 0,
      rotateZ: 4,
      filter: 'blur(6px)',
    },
    visible: {
      y: '0%',
      opacity: 1,
      rotateZ: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <Component
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`rock-gold-container relative select-none tracking-tight group cursor-default ${className}`}
      aria-label={text}
      data-rock-gold="true"
    >
      {/* ─── 1. HEADING ONE: NORMAL CRISP WHITE BASE TEXT LAYER ─── */}
      <motion.span
        className="inline-flex flex-wrap text-white relative z-10 select-none"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        aria-hidden="true"
      >
        {words.map((word, wordIndex) => (
          <span key={`white-word-${wordIndex}`} className="inline-block whitespace-nowrap mr-[0.25em] overflow-hidden">
            {Array.from(word).map((char, charIndex) => (
              <motion.span
                key={`white-char-${charIndex}`}
                className="inline-block will-change-transform transform-gpu"
                variants={characterVariants}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>

      {/* ─── 2. HEADING TWO: FLOWING ROCK GOLD TEXT LAYER (MASKED PRECISELY TO CURSOR TOUCH) ─── */}
      <motion.span
        className="inline-flex flex-wrap absolute inset-0 z-20 pointer-events-none select-none transition-opacity duration-200"
        style={{
          opacity: mousePos.isHovered ? 1 : 0,
          maskImage: `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, black 0%, black 45%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, black 0%, black 45%, transparent 100%)`,
        }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        aria-hidden="true"
      >
        {words.map((word, wordIndex) => (
          <span key={`gold-word-${wordIndex}`} className="inline-block whitespace-nowrap mr-[0.25em] overflow-hidden">
            {Array.from(word).map((char, charIndex) => (
              <motion.span
                key={`gold-char-${charIndex}`}
                className="rock-gold-char inline-block will-change-transform transform-gpu font-bold"
                variants={characterVariants}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    </Component>
  );
};
