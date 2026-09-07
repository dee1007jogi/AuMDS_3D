import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { audioEngine } from './AudioEngine';
import { useNavigate } from 'react-router-dom';

export interface PinnedPortalTransitionProps {
  badge?: string;
  title: string;
  subtitle: string;
  portalImageUrl: string;
  children?: React.ReactNode;
}

export const PinnedPortalTransition: React.FC<PinnedPortalTransitionProps> = ({
  badge = "SPATIAL PORTAL WARP",
  title,
  subtitle,
  portalImageUrl,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spatial transformations
  const scale = useTransform(scrollYProgress, [0, 0.45, 0.85], [0.55, 0.88, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.45, 0.85], ["40px", "24px", "0px"]);
  const y = useTransform(scrollYProgress, [0, 0.45], ["12%", "0%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.35, 0.7], [0.75, 0.4, 0.15]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.9]);
  const contentRevealOpacity = useTransform(scrollYProgress, [0.65, 0.9], [0, 1]);
  const contentRevealY = useTransform(scrollYProgress, [0.65, 0.9], [50, 0]);

  return (
    <div id="portal" ref={containerRef} className="relative h-[250vh] w-full bg-[#060D1F] font-sans">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Intro Manifesto Overlay */}
        <motion.div
          style={{ opacity: textOpacity, scale: textScale }}
          className="absolute z-20 top-24 text-center max-w-2xl px-6 pointer-events-none"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 text-xs font-mono uppercase tracking-widest text-cyan-300 bg-cyan-950/70 border border-cyan-500/40 rounded-full font-bold shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {badge}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 font-display">
            {title}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
            {subtitle}
          </p>
        </motion.div>

        {/* Morphing 3D Portal Window */}
        <motion.div
          style={{
            scale,
            borderRadius,
            y,
          }}
          className="relative w-full h-full max-w-[1400px] max-h-[860px] overflow-hidden shadow-[0_0_120px_rgba(6,182,212,0.25)] border border-cyan-500/30 will-change-transform transform-gpu"
        >
          {/* Dimensional Background Asset */}
          <img
            src={portalImageUrl}
            alt="Dimensional Realm"
            className="w-full h-full object-cover object-center scale-105"
          />

          {/* Dynamic Light Barrier */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-[#060D1F] pointer-events-none"
          />

          {/* High-Tech Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d40a_1px,transparent_1px),linear-gradient(to_bottom,#06b6d40a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

          {/* Internal Expanded Content */}
          <motion.div
            style={{ opacity: contentRevealOpacity, y: contentRevealY }}
            className="absolute inset-0 z-30 p-8 md:p-16 flex flex-col justify-end bg-gradient-to-t from-[#060D1F] via-[#060D1F]/70 to-transparent"
          >
            {children ? (
              children
            ) : (
              <div className="max-w-2xl bg-[#0A2540]/80 p-8 rounded-3xl border border-cyan-500/30 backdrop-blur-2xl shadow-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span className="text-amber-400 font-mono text-xs tracking-wider uppercase font-bold">
                    DIMENSION SYNCED // MULTIVERSE READY
                  </span>
                </div>
                <h3 className="text-2xl md:text-4xl font-extrabold text-white font-display">
                  Autonomous Brand Ecosystem
                </h3>
                <p className="text-slate-300 mt-3 text-xs md:text-sm leading-relaxed font-normal">
                  AuMDS orchestrates global venture expansion through unified intelligence, deep engineering pipelines, and institutional design matrices.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.06, y: -1, transition: { type: 'spring', stiffness: 450, damping: 12 } }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => {
                      audioEngine.playWarp();
                      navigate('/ecosystem');
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-amber-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider shadow-lg shadow-cyan-500/20"
                  >
                    <span>Enter Ecosystem Nexus</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Ambient Depth Vignette */}
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
      </div>
    </div>
  );
};
