import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Menu, 
  X, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ChevronRight, 
  Activity,
  Layers,
  Award,
  Users,
  Briefcase,
  Compass,
  Mail,
  ShieldCheck
} from 'lucide-react';
import { audioEngine } from './AudioEngine';
import { Link, useLocation } from 'react-router-dom';
import { ConsultationModal } from './ConsultationModal';
import { GoldBarButton } from './GoldBarButton';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNavIdx, setHoveredNavIdx] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 20);
  });

  const toggleSound = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
    if (!muted) audioEngine.playClick();
  };

  const navLinks = [
    { label: 'Home', path: '/', badge: null, icon: Compass },
    { label: 'Services', path: '/services', badge: 'AI & CLOUD', icon: Layers },
    { label: 'About', path: '/about', badge: null, icon: ShieldCheck },
    { label: 'Founder & CEO', path: '/founder', badge: 'CEO', icon: Award },
    { label: 'Careers', path: '/careers', badge: 'WE\'RE HIRING', icon: Users },
    { label: 'Ecosystem & TRIAD', path: '/ecosystem', badge: 'TRIAD', icon: Activity },
    { label: 'Portfolio', path: '/portfolio', badge: null, icon: Briefcase },
    { label: 'Contact', path: '/contact', badge: null, icon: Mail },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pt-3 sm:pt-4 pointer-events-none">
        {/* Subtle Ambient Light Aura behind Island */}
        <div 
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-14 bg-gradient-to-r from-amber-500/0 via-amber-400/15 to-amber-500/0 blur-2xl pointer-events-none transition-opacity duration-700 ${
            isScrolled ? 'opacity-80' : 'opacity-40'
          }`} 
        />

        <motion.nav
          initial={{ y: -35, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto relative flex items-center justify-between gap-2 sm:gap-4 lg:gap-6 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-2xl sm:rounded-3xl border transition-all duration-500 backdrop-blur-2xl max-w-7xl w-full ${
            isScrolled
              ? 'bg-[#030712]/94 border-amber-400/35 shadow-[0_15px_45px_-5px_rgba(0,0,0,0.9),0_0_30px_rgba(245,183,34,0.18),inset_0_1px_1px_rgba(255,255,255,0.15)]'
              : 'bg-[#040816]/80 border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.08)]'
          }`}
        >
          {/* Top 24K Specular Gold Light Ray */}
          <div className="absolute top-0 inset-x-12 h-[1.5px] bg-gradient-to-r from-transparent via-amber-300/80 to-transparent pointer-events-none" />

          {/* Dynamic Scroll Progress Gold Laser Micro-Bar */}
          <motion.div
            className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent origin-left opacity-60 pointer-events-none"
            style={{ scaleX: scrollYProgress }}
          />

          {/* ==================================================== */}
          {/* 1. LEFT BRAND ANCHOR & 24K PHYSICAL GOLD EMBLEM     */}
          {/* ==================================================== */}
          <Link
            to="/"
            className="flex items-center gap-2.5 sm:gap-3.5 group cursor-pointer flex-shrink-0 select-none"
            onClick={() => audioEngine.playClick()}
          >
            {/* 3D Gold & Obsidian Beveled Logo Capsule */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#FFF0A0] via-[#F5B722] to-[#92400E] p-[1.5px] shadow-[0_0_20px_rgba(245,183,34,0.4)] group-hover:shadow-[0_0_30px_rgba(245,183,34,0.7)] group-hover:scale-105 transition-all duration-300">
              <div className="w-full h-full bg-[#030712] rounded-[10px] sm:rounded-[14px] flex items-center justify-center relative overflow-hidden p-1">
                {/* Moving Specular Gleam */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-25 -translate-x-[150%] group-hover:translate-x-[200%] transition-transform duration-700 pointer-events-none" />
                
                {/* Official Brand Logo */}
                <img 
                  src="/company-logo.png" 
                  alt="AuMDS Official Logo" 
                  className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(245,183,34,0.6)] group-hover:scale-110 transition-transform duration-300" 
                />

                {/* Corner Golden Dot Specular Highlight */}
                <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-amber-300 shadow-[0_0_6px_#FFE680]" />
              </div>
            </div>

            {/* Brand Typography & Atomic Notation */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold tracking-tight text-lg sm:text-xl font-display bg-gradient-to-r from-[#FFF8E7] via-[#F5B722] to-[#E5A11D] bg-clip-text text-transparent group-hover:brightness-110 transition-all">
                  AuMDS
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 text-[8px] sm:text-[9px] font-mono font-bold bg-amber-400/15 border border-amber-400/40 text-amber-300 rounded-md shadow-[0_0_10px_rgba(245,183,34,0.2)]">
                  AU 79
                </span>
              </div>
              <div className="flex items-center gap-1.5 -mt-0.5">
                <span className="text-[8px] sm:text-[9px] font-mono text-slate-400 tracking-wider uppercase group-hover:text-amber-300/80 transition-colors">
                  Universe of Brands
                </span>
                <span className="hidden xl:inline text-[8px] text-amber-400/60 font-mono">
                  • 24K ARCHITECTURE
                </span>
              </div>
            </div>
          </Link>

          {/* ==================================================== */}
          {/* 2. DESKTOP CENTER NAVIGATION CONTROL                 */}
          {/* ==================================================== */}
          <div
            className="hidden lg:flex items-center gap-0.5 xl:gap-1 px-2 py-1 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-md shadow-inner"
            onMouseLeave={() => setHoveredNavIdx(null)}
          >
            {navLinks.map((item, idx) => {
              const isActive = location.pathname === item.path;
              const isHovered = hoveredNavIdx === idx;

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onMouseEnter={() => {
                    setHoveredNavIdx(idx);
                    audioEngine.playHover();
                  }}
                  onClick={() => audioEngine.playClick()}
                  className={`relative px-2.5 xl:px-3.5 py-1.5 font-mono text-xs whitespace-nowrap transition-colors duration-200 z-10 flex items-center gap-1.5 rounded-xl ${
                    isActive
                      ? 'text-amber-200 font-bold'
                      : isHovered
                      ? 'text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {/* Floating Hover Glass Pill Backdrop */}
                  {isHovered && (
                    <motion.div
                      layoutId="navbar-hover-capsule"
                      className="absolute inset-0 rounded-xl bg-gradient-to-b from-amber-400/20 via-amber-500/10 to-transparent border border-amber-400/35 -z-10 shadow-[0_0_15px_rgba(245,183,34,0.15)]"
                      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                    />
                  )}

                  {/* Active Indicator Laser Dot & Underline */}
                  {isActive && !isHovered && (
                    <motion.div
                      layoutId="navbar-active-dot"
                      className="absolute bottom-0 inset-x-2.5 h-[2px] bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 rounded-full shadow-[0_0_10px_rgba(245,183,34,0.9)]"
                    />
                  )}

                  <span>{item.label}</span>

                  {/* Contextual Route Micro-Badge */}
                  {item.badge && (
                    <span
                      className={`text-[8px] font-mono px-1 py-0.2 rounded font-semibold tracking-tighter ${
                        item.badge === "WE'RE HIRING"
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : item.badge === 'CEO'
                          ? 'bg-amber-400/25 text-amber-300 border border-amber-400/40'
                          : item.badge === 'TRIAD'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* ==================================================== */}
          {/* 3. RIGHT STATUS HUB & 24K GOLD BULLION CTA           */}
          {/* ==================================================== */}
          <div className="hidden md:flex items-center gap-2.5 xl:gap-3 flex-shrink-0">
            {/* Live System Purity Status Chip */}
            <div className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900/60 border border-white/5 text-[10px] font-mono text-slate-400 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
              <span className="text-slate-300 font-semibold">999.9 PURE GOLD</span>
            </div>

            {/* Interactive Audio Frequency Equalizer */}
            <button
              onClick={toggleSound}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 hover:border-amber-400/40 text-slate-400 hover:text-amber-300 transition-all cursor-pointer shadow-sm group"
              title={isMuted ? 'Unmute Spatial Audio' : 'Mute Spatial Audio'}
              aria-label="Toggle Spatial Sound"
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-rose-400" />
              ) : (
                <div className="flex items-center gap-0.5 h-3.5">
                  <span className="w-[2px] h-2 bg-amber-400 rounded-full animate-pulse" />
                  <span className="w-[2px] h-3.5 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: '0.12s' }} />
                  <span className="w-[2px] h-1.5 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.24s' }} />
                  <span className="w-[2px] h-3 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '0.36s' }} />
                </div>
              )}
              <span className="text-[10px] font-mono tracking-wider font-semibold">
                {isMuted ? 'MUTED' : 'AUDIO'}
              </span>
            </button>

            {/* Ultra-Premium 24K Gold Bar Bullion CTA Button */}
            <GoldBarButton
              variant="solid-ingot"
              size="sm"
              hallmark="24K"
              onClick={() => {
                audioEngine.playSwoosh();
                setIsConsultOpen(true);
              }}
              className="py-2 px-4.5 text-xs font-mono font-extrabold shadow-[0_0_25px_rgba(245,183,34,0.45)]"
              icon={<Sparkles className="w-3.5 h-3.5 text-slate-950 animate-pulse" />}
              iconPosition="left"
            >
              Consult Now
            </GoldBarButton>
          </div>

          {/* ==================================================== */}
          {/* 4. MOBILE DRAWER TRIGGER & QUICK CTA                 */}
          {/* ==================================================== */}
          <div className="flex items-center gap-2 lg:hidden">
            <GoldBarButton
              variant="solid-ingot"
              size="sm"
              hallmark="24K"
              onClick={() => {
                audioEngine.playSwoosh();
                setIsConsultOpen(true);
              }}
              className="px-3 py-1.5 text-xs"
            >
              Consult
            </GoldBarButton>

            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                audioEngine.playClick();
              }}
              className="p-2 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white hover:border-amber-400/40 focus:outline-none transition-all cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.nav>

        {/* ==================================================== */}
        {/* 5. MOBILE EXPANDABLE COMMAND DRAWER                  */}
        {/* ==================================================== */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto absolute top-16 inset-x-3 sm:inset-x-6 p-5 sm:p-6 rounded-3xl bg-[#040816]/98 border border-amber-400/35 backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(245,183,34,0.2)] flex flex-col gap-3 lg:hidden z-50 max-w-7xl mx-auto"
            >
              {/* Header Info Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">
                    ✦ AUMDS UNIVERSE NAVIGATION
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-white/5">
                  8 NODES
                </span>
              </div>

              {/* Navigation Links Grid / List */}
              <div className="flex flex-col gap-1.5 py-1">
                {navLinks.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        audioEngine.playClick();
                      }}
                      className={`px-3.5 py-2.5 rounded-xl text-sm font-mono flex items-center justify-between transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-400/20 via-amber-400/10 to-transparent border border-amber-400/40 text-amber-300 font-bold'
                          : 'text-slate-200 hover:bg-slate-900/70 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-amber-400/20 border border-amber-400/30 text-amber-300 font-bold">
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Bottom Drawer Actions */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  onClick={toggleSound}
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 hover:text-amber-300 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                  <span>{isMuted ? 'MUTED' : 'AUDIO ACTIVE'}</span>
                </button>

                <GoldBarButton
                  variant="solid-ingot"
                  size="sm"
                  hallmark="24K"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsConsultOpen(true);
                  }}
                  className="py-2.5 px-5 text-xs font-bold"
                >
                  CONSULT NOW
                </GoldBarButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Instant Consultation Modal */}
      <ConsultationModal isOpen={isConsultOpen} onClose={() => setIsConsultOpen(false)} />
    </>
  );
};
