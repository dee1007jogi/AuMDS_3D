import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Activity, Globe2, Users, Cpu, ShieldCheck } from 'lucide-react';
import { audioEngine } from './AudioEngine';

interface MetricItem {
  icon: React.ReactNode;
  value: string;
  label: string;
  telemetry: string;
}

const METRICS: MetricItem[] = [
  {
    icon: <Cpu className="w-5 h-5 text-cyan-400" />,
    value: '99.98%',
    label: 'Autonomous Architecture Uptime',
    telemetry: 'LATENCY 12ms // SYNCED',
  },
  {
    icon: <Users className="w-5 h-5 text-amber-400" />,
    value: '500+',
    label: 'Engineers Incubated via TRIAD',
    telemetry: 'TALENT PIPELINE // ACTIVE',
  },
  {
    icon: <Globe2 className="w-5 h-5 text-indigo-400" />,
    value: '50M+',
    label: 'Brand Impressions Orchestrated',
    telemetry: 'GLOBAL REACH // SCALED',
  },
  {
    icon: <Activity className="w-5 h-5 text-emerald-400" />,
    value: '4.8x',
    label: 'Average Venture Scale Factor',
    telemetry: 'GROWTH INDEX // OPTIMAL',
  },
];

export const MetricsTelemetry: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2, once: true });

  return (
    <section id="telemetry" ref={containerRef} className="py-24 relative z-10 section-ambient-cyan rounded-3xl max-w-7xl mx-auto my-12 px-4 sm:px-6 lg:px-8 border border-slate-800/80 shadow-2xl">
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-950/60 backdrop-blur-md mb-4 shadow-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase font-bold">
                SYSTEM TELEMETRY
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight font-display">
              Impact & Operational Telemetry
            </h2>
          </div>
          <p className="text-slate-300 text-sm md:text-base max-w-md font-normal leading-relaxed">
            Quantified performance metrics driving venture incorporation, software resiliency, and human capital scaling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {METRICS.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => audioEngine.playHover()}
              className="relative p-7 rounded-3xl bg-[#0A2540]/60 border border-slate-800 hover:border-cyan-500/50 backdrop-blur-2xl overflow-hidden group transition-all duration-300 shadow-xl"
            >
              {/* Header Telemetry */}
              <div className="flex items-center justify-between mb-6">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700/60 group-hover:scale-110 transition-transform">
                  {metric.icon}
                </div>
                <span className="text-[10px] font-mono text-cyan-400 tracking-wider font-bold">
                  {metric.telemetry}
                </span>
              </div>

              {/* Counter Display */}
              <div className="text-4xl lg:text-5xl font-extrabold text-white font-mono tracking-tight group-hover:text-cyan-300 transition-colors duration-300">
                {metric.value}
              </div>

              <p className="mt-3 text-sm text-slate-300 font-medium leading-snug">
                {metric.label}
              </p>

              {/* Bottom Decorative Wire */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
