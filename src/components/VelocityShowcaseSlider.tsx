import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useVelocity, PanInfo } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { audioEngine } from './AudioEngine';
import { useNavigate } from 'react-router-dom';

export interface ShowcaseItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  imageUrl: string;
  href: string;
}

export interface VelocityShowcaseSliderProps {
  items: ShowcaseItem[];
  sectionTitle?: string;
  sectionSubtitle?: string;
}

export const VelocityShowcaseSlider: React.FC<VelocityShowcaseSliderProps> = ({
  items,
  sectionTitle = "ENGINEERED INITIATIVES",
  sectionSubtitle = "Explore the multidimensional domains and incubation engines forged by AuMDS.",
}) => {
  const navigate = useNavigate();
  const constraintsRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Motion values for physical tracking
  const x = useMotionValue(0);
  const xSmooth = useSpring(x, { stiffness: 350, damping: 35 });
  const xVelocity = useVelocity(xSmooth);

  // Dynamic skew calculation based on movement velocity
  const skewX = useTransform(xVelocity, [-1500, 0, 1500], [6, 0, -6]);
  const scale = useTransform(xVelocity, [-1500, 0, 1500], [0.98, 1, 0.98]);

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    x.set(x.get() + info.delta.x);
  };

  return (
    <section id="initiatives" className="w-full py-24 section-ambient-amber rounded-3xl max-w-7xl mx-auto my-12 px-4 sm:px-6 lg:px-8 overflow-hidden relative z-10 border border-slate-800/80 shadow-2xl font-sans" aria-label="Showcase Slider">
      {/* Header Context */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-950/60 backdrop-blur-md mb-4 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase font-bold">
              ECOSYSTEM SHOWCASE
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            {sectionTitle}
          </h2>
        </div>
        <p className="text-slate-300 text-sm md:text-base max-w-md font-normal leading-relaxed">
          {sectionSubtitle}
        </p>
      </div>

      {/* Interactive Drag Track */}
      <div ref={constraintsRef} className="w-full cursor-grab active:cursor-grabbing">
        <motion.div
          ref={trackRef}
          style={{ x: xSmooth, skewX, scale }}
          drag="x"
          dragConstraints={{ left: -(items.length * 400 - 800), right: 0 }}
          dragElastic={0.12}
          onDrag={handleDrag}
          className="flex gap-6 select-none will-change-transform transform-gpu"
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -4, scale: 1.02 }}
              onMouseEnter={() => audioEngine.playHover()}
              className="relative flex-shrink-0 w-[300px] sm:w-[360px] md:w-[420px] h-[500px] rounded-3xl overflow-hidden bg-[#0A2540] border border-slate-800 group transition-all duration-300 hover:border-cyan-400/60 shadow-2xl"
            >
              {/* Cover Media */}
              <img
                src={item.imageUrl}
                alt={item.title}
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dynamic Gradient Shading */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060D1F] via-[#060D1F]/60 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-85" />

              {/* Card Meta Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <span className="px-3.5 py-1 text-xs font-mono font-bold text-cyan-300 bg-slate-950/90 backdrop-blur-md rounded-full border border-cyan-500/40">
                    {item.tag}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.15, rotate: 45 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      audioEngine.playClick();
                      navigate(item.href);
                    }}
                    className="w-10 h-10 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700 flex items-center justify-center text-white transition-colors duration-300 group-hover:bg-cyan-400 group-hover:text-slate-950 shadow-md"
                    aria-label={`View details for ${item.title}`}
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </motion.button>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight leading-snug font-display">
                    {item.title}
                  </h3>
                  <p className="text-slate-200 text-xs md:text-sm mt-3 line-clamp-3 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Drag Instruction Indicator */}
      <div className="mt-8 flex items-center gap-3">
        <div className="w-12 h-0.5 bg-slate-800 overflow-hidden relative rounded-full">
          <div className="absolute inset-0 bg-cyan-400 animate-pulse" />
        </div>
        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
          Drag horizontally with momentum inertia
        </span>
      </div>
    </section>
  );
};
