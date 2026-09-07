import React, { useRef, useState, useCallback } from 'react';

export interface RockGoldTextProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
  radius?: number;
}

export const RockGoldText: React.FC<RockGoldTextProps> = ({
  children,
  className = '',
  as: Component = 'span',
  radius = 120,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number; isHovered: boolean }>({
    x: -999,
    y: -999,
    isHovered: false,
  });

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y, isHovered: true });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setMousePos((prev) => ({ ...prev, isHovered: false }));
  }, []);

  const maskStyle = {
    opacity: mousePos.isHovered ? 1 : 0,
    maskImage: `radial-gradient(circle ${radius}px at ${mousePos.x}px ${mousePos.y}px, black 0%, black 45%, transparent 100%)`,
    WebkitMaskImage: `radial-gradient(circle ${radius}px at ${mousePos.x}px ${mousePos.y}px, black 0%, black 45%, transparent 100%)`,
  };

  return (
    <Component
      // @ts-expect-error dynamic component ref
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`rock-gold-container relative select-none tracking-tight group cursor-default ${className}`}
      data-rock-gold="true"
    >
      {/* ─── 1. HEADING ONE: NORMAL WHITE BASE TEXT ─── */}
      <span className="relative z-10 block text-white select-none">
        {children}
      </span>

      {/* ─── 2. HEADING TWO: FLOWING ROCK GOLD TEXT LAYER (MASKED TO CURSOR TOUCH) ─── */}
      <span
        className="absolute inset-0 z-20 pointer-events-none select-none block transition-opacity duration-200"
        style={maskStyle}
        aria-hidden="true"
      >
        <span className="rock-gold-char block">
          {children}
        </span>
      </span>
    </Component>
  );
};
