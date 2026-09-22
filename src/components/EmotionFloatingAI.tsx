import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageSquareCode, X } from 'lucide-react';
import { audioEngine } from './AudioEngine';

export interface EmotionFloatingAIProps {
  onOpenConsult: () => void;
}

export const EmotionFloatingAI: React.FC<EmotionFloatingAIProps> = ({ onOpenConsult }) => {
  const [bubbleVisible, setBubbleVisible] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      {/* Speech Bubble Tooltip */}
      <AnimatePresence>
        {bubbleVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-auto relative max-w-xs px-4 py-2.5 rounded-2xl bg-[#9047ff] text-white shadow-xl flex items-center gap-2 border border-purple-300/30"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse flex-shrink-0" />
            <p className="text-[11px] font-mono uppercase tracking-wider font-semibold leading-tight">
              Ready to co-create your next interface?
            </p>
            <button
              onClick={() => setBubbleVisible(false)}
              className="text-white/60 hover:text-white p-0.5 ml-1 flex-shrink-0"
              aria-label="Dismiss message"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Animated Gradient Orb Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => {
          audioEngine.playClick();
          onOpenConsult();
        }}
        aria-label="AI Assistant"
        className="pointer-events-auto relative w-14 h-14 rounded-full overflow-hidden shadow-2xl flex items-center justify-center cursor-pointer border border-purple-400/40"
      >
        {/* Multidimensional Morphing Radial Gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#9047ff] via-[#d946ef] to-[#6366f1] animate-ai-orb" />
        <div className="absolute inset-0.5 rounded-full bg-[#1e1338]/40 backdrop-blur-sm" />

        {/* Center Icon */}
        <MessageSquareCode className="relative z-10 w-6 h-6 text-white drop-shadow-md" />

        {/* Outer Pulsing Aura Glow */}
        <div className="absolute -inset-1 rounded-full bg-[#9047ff]/30 blur-md pointer-events-none -z-10 animate-pulse" />
      </motion.button>
    </div>
  );
};
