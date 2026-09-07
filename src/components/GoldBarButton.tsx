import React, { useRef, useState, useCallback } from 'react';
import { motion, useSpring, useTransform, useMotionValue, HTMLMotionProps } from 'framer-motion';
import { audioEngine } from './AudioEngine';
import { Sparkles } from 'lucide-react';

export interface GoldBarButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  hallmark?: string; // e.g. "AU 999.9" or "24K" or "FINE GOLD"
  variant?: 'solid-ingot' | 'obsidian-ingot' | 'champagne-ingot' | 'floating-ingot';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  magneticRadius?: number;
  className?: string;
  showShimmer?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const GoldBarButton: React.FC<GoldBarButtonProps> = ({
  children,
  hallmark = '999.9',
  variant = 'solid-ingot',
  size = 'md',
  magneticRadius = 140,
  className = '',
  showShimmer = true,
  icon,
  iconPosition = 'right',
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

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
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
    },
    [magneticRadius, mouseX, mouseY, localX, localY]
  );

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

  // Size configurations
  const sizeStyles = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-xs sm:text-sm',
    lg: 'px-7 py-3.5 text-sm sm:text-base',
    xl: 'px-8 py-4 text-base sm:text-lg',
  };

  // Base 3D Ingot Bevel Structure
  const baseStyles =
    'relative inline-flex items-center justify-center font-mono font-bold uppercase tracking-wider rounded-xl overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-950 select-none cursor-pointer group';

  // Variant Styles matching authentic 24K Physical Gold Ingot Bullion
  const variantStyles = {
    'solid-ingot':
      'bg-gradient-to-r from-[#FFF0A0] via-[#F5B722] to-[#E5A11D] text-slate-950 border border-[#FFF8DC]/80 shadow-[0_10px_30px_-5px_rgba(245,183,34,0.45),0_0_20px_rgba(245,183,34,0.3),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(146,64,14,0.6)] hover:shadow-[0_15px_40px_-5px_rgba(245,183,34,0.7),0_0_35px_rgba(255,235,150,0.5),inset_0_1px_3px_rgba(255,255,255,1),inset_0_-3px_6px_rgba(146,64,14,0.8)] hover:brightness-105',
    'obsidian-ingot':
      'bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-slate-900/90 text-amber-300 border-2 border-amber-400/70 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.8),0_0_20px_rgba(245,183,34,0.25),inset_0_1px_1px_rgba(255,235,150,0.4),inset_0_-1px_3px_rgba(0,0,0,0.8)] hover:border-amber-300 hover:shadow-[0_12px_35px_-5px_rgba(245,183,34,0.4),0_0_25px_rgba(245,183,34,0.4)] hover:text-white',
    'champagne-ingot':
      'bg-gradient-to-r from-[#FFF8E7] via-[#F3E5AB] to-[#D4AF37] text-slate-950 border border-white/80 shadow-[0_10px_25px_-5px_rgba(212,175,55,0.4),inset_0_1px_2px_rgba(255,255,255,0.9)] hover:brightness-105',
    'floating-ingot':
      'bg-gradient-to-r from-[#F5B722]/20 via-amber-400/30 to-[#F5B722]/20 text-amber-200 border border-amber-400/40 backdrop-blur-xl shadow-[0_8px_25px_rgba(245,158,11,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:border-amber-300 hover:text-white hover:bg-amber-400/35',
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
      whileTap={{ scale: 0.94, y: 1, transition: { type: 'spring', stiffness: 600, damping: 14 } }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {/* 1. Dynamic Cursor Light Reflection Source */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useTransform(
            [localX, localY],
            ([x, y]) => `radial-gradient(130px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.4), transparent 70%)`
          ),
        }}
        aria-hidden="true"
      />

      {/* 2. Top Ingot Bevel Highlight Line */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

      {/* 3. Bottom Ingot Chiseled Shadow Edge */}
      <div className="absolute bottom-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-950/60 to-transparent pointer-events-none" />

      {/* 4. Moving Laser Specular Gold Shimmer Beam */}
      {showShimmer && (
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden rounded-xl">
          <div className="gold-bar-shimmer-ray absolute top-0 -left-[150%] w-[100%] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent transform -skew-x-25 group-hover:animate-gold-shimmer" />
        </div>
      )}

      {/* 5. Ingot Purity Hallmark Badge / Stamp (Au-999.9) */}
      {hallmark && (
        <span
          className={`absolute top-1 right-2 text-[7px] font-mono tracking-tighter opacity-75 select-none pointer-events-none ${
            variant === 'solid-ingot' || variant === 'champagne-ingot'
              ? 'text-amber-950 font-extrabold'
              : 'text-amber-400'
          }`}
        >
          AU [{hallmark}]
        </span>
      )}

      {/* 6. Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
        <span className="truncate">{children}</span>
        {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
      </span>
    </motion.button>
  );
};
