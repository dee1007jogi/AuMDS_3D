import React from 'react';
import { motion } from 'framer-motion';
import { CornerDownRight, Sparkles, ArrowRight } from 'lucide-react';
import { EmotionButton } from './EmotionButton';
import { useNavigate } from 'react-router-dom';
import { audioEngine } from './AudioEngine';

interface CapabilityItem {
  index: string;
  name: string;
  tag: string;
}

const CAPABILITIES: CapabilityItem[] = [
  { index: '(001)', name: 'Deep-Tech & Cloud Software', tag: 'Architecture' },
  { index: '(002)', name: '3D Spatial & WebGL Engines', tag: 'Interactive' },
  { index: '(003)', name: 'Brand Systems & Visual Universe', tag: 'Identity' },
  { index: '(004)', name: 'TRIAD Talent Accelerator', tag: 'Incubation' },
  { index: '(005)', name: 'SatChai Founder Guild', tag: 'Ventures' },
  { index: '(006)', name: 'Pvt Ltd Incorporation & MCA', tag: 'Legal' },
  { index: '(007)', name: 'GST, TDS & Statutory Governance', tag: 'Tax' },
  { index: '(008)', name: 'High-Concurrency SaaS Platforms', tag: 'Full-Stack' },
  { index: '(009)', name: 'Autonomous Developer Pods', tag: 'Talent' },
  { index: '(010)', name: 'Standard Operating Procedures (SOPs)', tag: 'Operations' },
];

export const EmotionWhatWeDo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 sm:px-12 max-w-[1440px] mx-auto border-t border-current/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Sticky Header Column */}
        <div className="lg:col-span-6 lg:sticky lg:top-32 space-y-8">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#9047ff] text-white text-[11px] font-mono tracking-wider uppercase font-bold shadow-md shadow-purple-500/20">
              <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
              What we do
            </span>
          </div>

          <h2 className="font-emotion-serif text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.05] tracking-tight">
            <span className="text-[#9047ff] font-mono mr-2 font-normal">↪</span>
            We design and engineer multidimensional solutions for ambitious teams — from cloud software architectures to global brand universes.
          </h2>

          <p className="font-emotion-mono text-xs sm:text-sm tracking-wide uppercase leading-relaxed opacity-75 max-w-lg">
            We start with why, diagnose core operational bottlenecks, and co-create enduring corporate infrastructure under one roof.
          </p>

          <div className="pt-2">
            <EmotionButton
              variant="outline"
              size="md"
              onClick={() => navigate('/services')}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Explore Solutions Matrix
            </EmotionButton>
          </div>
        </div>

        {/* Right Numbered Deliverables Column */}
        <div className="lg:col-span-6">
          <ul className="divide-y divide-current/10">
            {CAPABILITIES.map((item) => (
              <motion.li
                key={item.index}
                whileHover={{ x: 6, transition: { duration: 0.2 } }}
                onMouseEnter={() => audioEngine.playHover()}
                onClick={() => navigate('/services')}
                className="group py-5 flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <span className="font-emotion-mono text-xs sm:text-sm text-[#9047ff] font-medium tracking-wider">
                    {item.index}
                  </span>
                  <span className="text-lg sm:text-xl md:text-2xl font-sans font-medium tracking-tight group-hover:text-[#9047ff] transition-colors">
                    {item.name}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline-block font-emotion-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-current/15 opacity-60 group-hover:opacity-100 group-hover:border-[#9047ff] group-hover:text-[#9047ff] transition-all">
                    {item.tag}
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-[#9047ff] text-sm">
                    ↗
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
