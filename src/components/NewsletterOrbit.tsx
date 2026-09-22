import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles, Send, CheckCircle2, Shield } from 'lucide-react';
import { audioEngine } from './AudioEngine';

export interface NewsletterOrbitProps {
  theme?: 'light' | 'dark';
}

export const NewsletterOrbit: React.FC<NewsletterOrbitProps> = ({ theme = 'light' }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const isLight = theme === 'light';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    audioEngine.playSwoosh();
    setSubmitted(true);
  };

  return (
    <div className="relative z-20 max-w-5xl mx-auto px-2 sm:px-6 py-12 font-sans">
      <div className={`relative rounded-3xl border p-8 sm:p-14 shadow-2xl overflow-hidden backdrop-blur-2xl transition-all ${
        isLight
          ? 'bg-gradient-to-br from-white/95 via-sky-50/80 to-amber-50/70 border-slate-200/90 shadow-[0_25px_60px_rgba(0,0,0,0.06)]'
          : 'bg-gradient-to-br from-[#0A2540]/90 via-[#060D1F]/90 to-[#0A2540]/90 border-cyan-500/30'
      }`}>
        {/* Glow Spheres */}
        <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
          isLight ? 'bg-sky-200/40' : 'bg-cyan-500/15'
        }`} />
        <div className={`absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
          isLight ? 'bg-amber-100/50' : 'bg-amber-500/15'
        }`} />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-mono mb-4 shadow-sm font-bold border ${
            isLight
              ? 'bg-cyan-100/80 border-cyan-300 text-cyan-900'
              : 'bg-cyan-950/70 border-cyan-500/40 text-cyan-300 shadow-lg'
          }`}>
            <Sparkles className={`w-3.5 h-3.5 ${isLight ? 'text-amber-500' : 'text-amber-400'} animate-pulse`} />
            <span>EXECUTIVE INTELLIGENCE DISPATCH</span>
          </div>

          <h3 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold font-display tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Stay Synced with the Universe
          </h3>
          <p className={`mt-3 text-xs sm:text-sm leading-relaxed font-normal ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            Receive curated monthly telemetry on emerging tech stacks, SatChai founder invitations, TRIAD cohort showcases, and brand engineering breakthroughs.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubscribe} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className={`w-4 h-4 absolute left-4 top-3.5 ${isLight ? 'text-slate-400' : 'text-slate-400'}`} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="executive@enterprise.com"
                  className={`w-full rounded-full py-3 pl-11 pr-4 text-xs focus:outline-none shadow-inner font-mono border ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-500 shadow-sm'
                      : 'bg-slate-950/90 border-slate-700 text-white placeholder-slate-500 focus:border-cyan-400'
                  }`}
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
              className={`mt-8 p-4 rounded-2xl border text-xs font-mono flex items-center justify-center gap-2 ${
                isLight
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
              }`}
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>Telemetry confirmed. Welcome to the AuMDS Universe dispatch.</span>
            </motion.div>
          )}

          <div className={`mt-5 flex items-center justify-center gap-4 text-[11px] font-mono ${
            isLight ? 'text-slate-500' : 'text-slate-400'
          }`}>
            <span className={`flex items-center gap-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              <Shield className="w-3 h-3 text-cyan-500" /> Zero spam guarantee
            </span>
            <span>•</span>
            <span>Monthly transmission only</span>
          </div>
        </div>
      </div>
    </div>
  );
};
