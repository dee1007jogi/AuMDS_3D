import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles, Send, CheckCircle2, Shield } from 'lucide-react';
import { audioEngine } from './AudioEngine';

export const NewsletterOrbit: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    audioEngine.playSwoosh();
    setSubmitted(true);
  };

  return (
    <section className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 font-sans">
      <div className="relative rounded-3xl bg-gradient-to-br from-[#0A2540]/90 via-[#060D1F]/90 to-[#0A2540]/90 border border-cyan-500/30 p-8 sm:p-14 shadow-2xl overflow-hidden backdrop-blur-2xl">
        {/* Glow Spheres */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-4 shadow-lg font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>EXECUTIVE INTELLIGENCE DISPATCH</span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-display tracking-tight">
            Stay Synced with the Universe
          </h3>
          <p className="mt-3 text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
            Receive curated monthly telemetry on emerging tech stacks, SatChai founder invitations, TRIAD cohort showcases, and brand engineering breakthroughs.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubscribe} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="executive@enterprise.com"
                  className="w-full bg-slate-950/90 border border-slate-700 rounded-full py-3 pl-11 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 shadow-inner font-mono"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.06, y: -1, transition: { type: 'spring', stiffness: 450, damping: 12 } }}
                whileTap={{ scale: 0.92 }}
                type="submit"
                className="px-7 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-amber-400 text-slate-950 font-extrabold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Subscribe</span>
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-8 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Telemetry confirmed. Welcome to the AuMDS Universe dispatch.</span>
            </motion.div>
          )}

          <div className="mt-5 flex items-center justify-center gap-4 text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1 text-slate-300">
              <Shield className="w-3 h-3 text-cyan-400" /> Zero spam guarantee
            </span>
            <span>•</span>
            <span>Monthly transmission only</span>
          </div>
        </div>
      </div>
    </section>
  );
};
