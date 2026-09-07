import React, { useRef, useState, useCallback } from 'react';
import { motion, useSpring, useTransform, useMotionValue, HTMLMotionProps } from 'framer-motion';
import { audioEngine } from './AudioEngine';

export interface MagneticGlowButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  magneticRadius?: number;
  glowColor?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'gradient' | 'gold-ingot' | 'obsidian-ingot';
}

export const MagneticGlowButton: React.FC<MagneticGlowButtonProps> = ({
  children,
  magneticRadius = 130,
  glowColor = 'rgba(245, 183, 34, 0.5)',
  className = '',
  variant = 'primary',
  onClick,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Magnetic displacement values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Local radial glow coordinates
  const localX = useMotionValue(0);
  const localY = useMotionValue(0);

  const springConfig = { damping: 14, stiffness: 350, mass: 0.3 };
  const magneticX = useSpring(mouseX, springConfig);
  const magneticY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < magneticRadius) {
      mouseX.set(distanceX * 0.35);
      mouseY.set(distanceY * 0.35);
    } else {
      mouseX.set(0);
      mouseY.set(0);
    }

    localX.set(e.clientX - rect.left);
    localY.set(e.clientY - rect.top);
  }, [magneticRadius, mouseX, mouseY, localX, localY]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    audioEngine.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    audioEngine.playClick();
    if (onClick) onClick(e);
  };

  const baseStyles = "relative inline-flex items-center justify-center font-mono font-bold rounded-xl overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-950 select-none cursor-pointer group";
  
  const variantStyles = {
    'gold-ingot': "bg-gradient-to-r from-[#FFF0A0] via-[#F5B722] to-[#E5A11D] text-slate-950 border border-[#FFF8DC]/80 shadow-[0_10px_30px_-5px_rgba(245,183,34,0.45),0_0_20px_rgba(245,183,34,0.3),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(146,64,14,0.6)] hover:shadow-[0_15px_40px_-5px_rgba(245,183,34,0.7),0_0_35px_rgba(255,235,150,0.5)] hover:brightness-105",
    'obsidian-ingot': "bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-slate-900/90 text-amber-300 border-2 border-amber-400/70 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.8),0_0_20px_rgba(245,183,34,0.25),inset_0_1px_1px_rgba(255,235,150,0.4)] hover:border-amber-300 hover:text-white hover:shadow-[0_12px_35px_-5px_rgba(245,183,34,0.4)]",
    primary: "bg-[#0A2540]/90 text-white border border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)]",
    secondary: "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-extrabold hover:brightness-110 shadow-[0_0_25px_rgba(245,158,11,0.4),inset_0_1px_1px_rgba(255,255,255,0.7)]",
    gradient: "bg-gradient-to-r from-cyan-400 via-sky-400 to-amber-400 text-slate-950 font-extrabold shadow-[0_0_30px_rgba(6,182,212,0.5)]",
    outline: "bg-[#060D1F]/80 text-amber-300 border border-amber-400/30 hover:border-amber-400 hover:text-white shadow-[0_0_15px_rgba(245,158,11,0.15)]",
  };

  return (
    <motion.button
      ref={buttonRef}
      style={{ x: magneticX, y: magneticY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileHover={{ scale: 1.04, y: -2, transition: { type: 'spring', stiffness: 450, damping: 12 } }}
      whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 600, damping: 14 } }}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Light Source */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useTransform(
            [localX, localY],
            ([x, y]) => `radial-gradient(140px circle at ${x}px ${y}px, ${glowColor}, transparent 70%)`
          ),
        }}
        aria-hidden="true"
      />

      {/* Top Ingot Edge Highlight */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none" />

      {/* Moving Gold Shimmer Laser Ray */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden rounded-xl">
        <div className="gold-bar-shimmer-ray absolute top-0 -left-[150%] w-[100%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-25 group-hover:animate-gold-shimmer" />
      </div>

      {/* Content Container */}
      <span className="relative z-10 flex items-center gap-2 px-6 py-3 text-sm tracking-wide">
        {children}
      </span>
    </motion.button>
  );
};
