import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isGoldHeading, setIsGoldHeading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 26, stiffness: 420, mass: 0.2 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isHeading = target.closest('[data-rock-gold], .rock-gold-container, h1, h2, h3, .font-display');
        setIsGoldHeading(!!isHeading);

        const interactive = target.closest('button, a, input, textarea, [role="button"], .cursor-pointer, .cursor-grab');
        setIsPointer(!!interactive);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Spring Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none will-change-transform backdrop-blur-[0.5px]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isGoldHeading ? 64 : isPointer ? 48 : 26,
          height: isGoldHeading ? 64 : isPointer ? 48 : 26,
          borderColor: isGoldHeading
            ? 'rgba(251, 191, 36, 0.95)'
            : isPointer
            ? 'rgba(250, 204, 21, 0.85)'
            : 'rgba(6, 182, 212, 0.65)',
          borderWidth: isGoldHeading ? '2px' : '1px',
          backgroundColor: isGoldHeading
            ? 'rgba(245, 158, 11, 0.12)'
            : isPointer
            ? 'rgba(250, 204, 21, 0.08)'
            : 'rgba(6, 182, 212, 0.04)',
          boxShadow: isGoldHeading
            ? '0 0 30px rgba(245, 158, 11, 0.6), inset 0 0 15px rgba(251, 191, 36, 0.3)'
            : isPointer
            ? '0 0 20px rgba(250, 204, 21, 0.4)'
            : '0 0 10px rgba(6, 182, 212, 0.2)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 320 }}
      />

      {/* Center Core Dot */}
      <motion.div
        className={`fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none will-change-transform transition-colors duration-200 ${
          isGoldHeading
            ? 'bg-amber-300 shadow-[0_0_12px_#f59e0b]'
            : isPointer
            ? 'bg-yellow-300 shadow-[0_0_10px_#eab308]'
            : 'bg-cyan-300 shadow-[0_0_8px_#06b6d4]'
        }`}
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </div>
  );
};
