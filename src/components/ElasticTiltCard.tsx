import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { audioEngine } from './AudioEngine';

interface ElasticTiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
}

export const ElasticTiltCard: React.FC<ElasticTiltCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(56, 189, 248, 0.3)',
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 350, damping: 18, mass: 0.5 };
  const rotateX = useSpring(y, springConfig);
  const rotateY = useSpring(x, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate rotation (-8 to 8 degrees)
    const rX = -(mouseY / (rect.height / 2)) * 7;
    const rY = (mouseX / (rect.width / 2)) * 7;

    x.set(rY);
    y.set(rX);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    audioEngine.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{
        scale: 1.03,
        y: -4,
        transition: { type: 'spring', stiffness: 400, damping: 12 },
      }}
      whileTap={{
        scale: 0.96,
        transition: { type: 'spring', stiffness: 500, damping: 15 },
      }}
      className={`relative rounded-3xl transition-shadow duration-300 ${
        isHovered ? 'shadow-[0_20px_50px_rgba(0,0,0,0.6)]' : 'shadow-xl'
      } ${className}`}
    >
      {/* Elastic Ambient Hover Light */}
      <motion.div
        className="pointer-events-none absolute -inset-0.5 rounded-3xl opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle, ${glowColor}, transparent 70%)`,
          filter: 'blur(8px)',
        }}
      />

      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};
