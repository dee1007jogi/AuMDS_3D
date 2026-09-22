import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { EmotionButton } from './EmotionButton';
import { audioEngine } from './AudioEngine';

interface ProjectCard {
  id: string;
  projectNo: string;
  title: string;
  type: string;
  scope: string[];
  stack: string[];
  imageUrl: string;
  href: string;
}

const PROJECTS: ProjectCard[] = [
  {
    id: 'triad-engine',
    projectNo: '/01',
    title: 'TRIAD Engine Accelerator',
    type: 'Autonomous Talent Platform',
    scope: ['UI/UX', 'Cloud Architecture', 'WebGL', 'Talent Incubation'],
    stack: ['React', 'Three.js', 'TypeScript', 'Node.js'],
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    href: '/ecosystem',
  },
  {
    id: 'satchai-guild',
    projectNo: '/02',
    title: 'SatChai Founder Guild',
    type: 'Venture & Partner Network',
    scope: ['Brand Engineering', 'Event Architecture', 'Dealflow Sharing'],
    stack: ['Spatial Web', 'Framer Motion', 'Tailwind'],
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    href: '/ecosystem',
  },
  {
    id: 'deep-tech-cloud',
    projectNo: '/03',
    title: 'Multidimensional Cloud Matrix',
    type: 'Enterprise Micro-Frontend',
    scope: ['Distributed Systems', 'Zero-Trust Architecture', 'Edge CDN'],
    stack: ['Next.js', 'Docker', 'Kubernetes', 'GraphQL'],
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    href: '/services',
  },
  {
    id: 'brand-universe',
    projectNo: '/04',
    title: 'Exponential Brand Systems',
    type: 'Corporate Identity & 3D Tokens',
    scope: ['Brand Incorporation', '3D Typography', 'Video Production'],
    stack: ['Blender', 'Cinema 4D', 'After Effects'],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    href: '/services',
  },
];

export const EmotionProjectsGrid: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 sm:px-12 max-w-[1440px] mx-auto border-t border-current/10 font-sans">
      {/* Emotion Agency Style Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#9047ff] text-white text-[11px] font-mono tracking-wider uppercase font-bold mb-4 shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
            Selected Works
          </div>
          <h2 className="font-emotion-serif text-4xl sm:text-6xl md:text-7xl font-light leading-[0.9] tracking-tight">
            Some <em className="italic font-normal text-[#9047ff]">Of our</em> <span className="inline-block text-[#9047ff] mx-2 font-mono">⟶</span> projects
          </h2>
        </div>

        <p className="font-emotion-mono text-xs sm:text-sm tracking-wide uppercase max-w-sm opacity-75 text-left md:text-right leading-relaxed">
          A curated selection where engineering, brand strategy, and human feeling converge.
        </p>
      </div>

      {/* Asymmetric Staggered Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        {PROJECTS.map((proj, idx) => {
          const isOffset = idx % 2 === 1;
          const colSpan = idx % 4 === 0 || idx % 4 === 3 ? 'md:col-span-7' : 'md:col-span-5';

          return (
            <motion.div
              key={proj.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                audioEngine.playClick();
                navigate(proj.href);
              }}
              onMouseEnter={() => audioEngine.playHover()}
              className={`group relative flex flex-col gap-4 cursor-pointer ${colSpan} ${
                isOffset ? 'md:mt-20' : ''
              }`}
            >
              {/* Image Container with 16/10 aspect ratio and rounded-3xl */}
              <div className="relative aspect-[16/11] rounded-[2rem] overflow-hidden bg-[#181818] border border-current/10 shadow-xl group-hover:border-[#9047ff]/60 transition-all duration-500">
                <img
                  src={proj.imageUrl}
                  alt={proj.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark Gradient Veil */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Emotion Agency Monospace Telemetry Overlay on Hover */}
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] bg-black/40 text-white font-mono text-xs">
                  <div className="flex justify-between items-start">
                    <span className="text-[#9047ff] font-bold tracking-widest uppercase">
                      PRJCT {proj.projectNo}
                    </span>
                    <span className="text-white/70">2026 // Production</span>
                  </div>

                  <div className="space-y-1.5 text-[11px] uppercase tracking-wider text-white/90">
                    <div className="flex gap-2">
                      <span className="text-white/50 w-16">Type:</span>
                      <span className="font-semibold text-white">{proj.type}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-white/50 w-16">Scope:</span>
                      <span className="text-cyan-300">{proj.scope.join(' / ')}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-white/50 w-16">Stack:</span>
                      <span className="text-amber-300">{proj.stack.join(' • ')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title & Arrow Trigger */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#9047ff] uppercase">
                    <span>{proj.scope[0]}</span>
                    <span>•</span>
                    <span className="text-current opacity-60">{proj.type}</span>
                  </div>
                  <h3 className="font-emotion-serif text-2xl sm:text-3xl font-light tracking-tight mt-1 group-hover:text-[#9047ff] transition-colors">
                    {proj.title}
                  </h3>
                </div>

                <div className="w-10 h-10 rounded-full border border-current/20 flex items-center justify-center group-hover:bg-[#9047ff] group-hover:text-white group-hover:border-[#9047ff] transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-20 text-center">
        <EmotionButton
          variant="outline"
          size="lg"
          onClick={() => navigate('/portfolio')}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          View All Case Studies
        </EmotionButton>
      </div>
    </section>
  );
};
