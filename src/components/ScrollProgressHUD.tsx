import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export const ScrollProgressHUD: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });

  const percentage = useTransform(scrollYProgress, (value) => Math.round(value * 100));

  return (
    <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 pointer-events-none hidden md:flex flex-col items-center gap-3">
      {/* Percentage Readout HUD */}
      <motion.div className="px-2 py-1 rounded-md bg-[#0A1020]/90 border border-cyan-500/40 backdrop-blur-xl shadow-lg">
        <span className="text-[9px] font-mono font-bold text-cyan-300">
          <motion.span>{percentage}</motion.span>%
        </span>
      </motion.div>

      {/* Cybernetic Vertical Rail */}
      <div className="w-1 h-36 bg-slate-900/80 rounded-full border border-white/10 overflow-hidden relative shadow-inner">
        <motion.div
          style={{ scaleY, originY: 0 }}
          className="w-full h-full bg-gradient-to-b from-cyan-400 via-sky-400 to-amber-400 rounded-full shadow-[0_0_12px_#38bdf8]"
        />
      </div>

      <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest rotate-90 mt-2">
        SCROLL
      </span>
    </div>
  );
};
