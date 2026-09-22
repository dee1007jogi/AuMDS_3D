import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { audioEngine } from './AudioEngine';

interface AwardItem {
  no: string;
  year: string;
  organization: string;
  title: string;
  category: string;
}

const AWARDS: AwardItem[] = [
  {
    no: '01',
    year: '2026',
    organization: 'TRIAD Engine',
    title: 'Autonomous Developer Talent Cohort',
    category: '500+ Engineers Mentored & Deployed',
  },
  {
    no: '02',
    year: '2026',
    organization: 'Enterprise Cloud',
    title: 'High-Concurrency Distributed Micro-Frontends',
    category: '99.99% Uptime SLA Architecture',
  },
  {
    no: '03',
    year: '2025',
    organization: 'SatChai Global',
    title: 'Founder & Venture Roundtable Summit',
    category: '25+ Global Hubs Connected',
  },
  {
    no: '04',
    year: '2025',
    organization: 'Corporate Governance',
    title: 'Zero-Friction Pvt Ltd Incorporation & IP Defense',
    category: 'Statutory MCA Compliance Tier-1',
  },
  {
    no: '05',
    year: '2024',
    organization: 'Spatial Design Systems',
    title: '3D WebGL Multi-Channel Brand Universe',
    category: 'Top 1% Interactive Polish & Sound',
  },
];

export const EmotionAwardsList: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 sm:px-12 max-w-[1440px] mx-auto border-t border-current/10 font-sans">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#9047ff] text-white text-[11px] font-mono tracking-wider uppercase font-bold mb-4 shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
            Milestones & Telemetry
          </div>
          <h2 className="font-emotion-serif text-4xl sm:text-6xl md:text-7xl font-light leading-[0.9] tracking-tight">
            Impact <em className="italic font-normal text-[#9047ff]">&amp;</em> Recognition
          </h2>
        </div>

        <p className="font-emotion-mono text-xs sm:text-sm tracking-wide uppercase max-w-sm opacity-75 text-left md:text-right leading-relaxed">
          Proven metrics forged across software systems, talent incubation, and corporate scaling.
        </p>
      </div>

      {/* Rows with Hover Dimming Effect (Signature Emotion Agency style) */}
      <div className="divide-y divide-current/10 border-b border-current/10">
        {AWARDS.map((item, idx) => {
          const isHovered = hoveredIdx === idx;
          const isAnyHovered = hoveredIdx !== null;
          const isDimmed = isAnyHovered && !isHovered;

          return (
            <motion.div
              key={item.no}
              onMouseEnter={() => {
                audioEngine.playHover();
                setHoveredIdx(idx);
              }}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline transition-opacity duration-400 cursor-pointer ${
                isDimmed ? 'opacity-30' : 'opacity-100'
              }`}
            >
              {/* Col 1: Index & Year */}
              <div className="md:col-span-3 flex items-center gap-3 font-emotion-mono text-xs tracking-wider">
                <span className="text-[#9047ff] font-bold">/{item.no}</span>
                <span className="opacity-50">{item.year}</span>
                <span className="text-current opacity-80 uppercase font-semibold">
                  {item.organization}
                </span>
              </div>

              {/* Col 2: Title */}
              <div className="md:col-span-6">
                <h3 className="font-emotion-serif text-2xl sm:text-3xl font-light tracking-tight group-hover:text-[#9047ff] transition-colors">
                  {item.title}
                </h3>
              </div>

              {/* Col 3: Category / Metric */}
              <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-3 font-emotion-mono text-xs opacity-75">
                <span>{item.category}</span>
                <span className={`text-[#9047ff] transform transition-transform duration-300 ${
                  isHovered ? 'translate-x-1' : ''
                }`}>
                  ↗
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
