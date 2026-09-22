import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, CornerDownRight, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { EmotionButton } from './EmotionButton';
import { EmotionSoundVisualizer } from './EmotionSoundVisualizer';
import { ConsultationModal } from './ConsultationModal';
import { audioEngine } from './AudioEngine';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 20);
  });

  // Check initial theme
  useEffect(() => {
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    audioEngine.playClick();
    const nextTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navLinks = [
    { label: 'Work', path: '/portfolio', num: '01' },
    { label: 'Solutions', path: '/services', num: '02' },
    { label: 'Ecosystem', path: '/ecosystem', num: '03' },
    { label: 'About', path: '/about', num: '04' },
    { label: 'Founder', path: '/founder', num: '05' },
    { label: 'Careers', path: '/careers', num: '06' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          isScrolled
            ? 'py-3 backdrop-blur-xl border-b border-current/10 shadow-sm bg-white/75 dark:bg-[#121212]/80'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 flex items-center justify-between">
          {/* 1. BRAND LOGO (Left) */}
          <Link
            to="/"
            onClick={() => audioEngine.playClick()}
            className="group flex items-center gap-3 select-none"
          >
            <div className="w-8 h-8 rounded-full bg-[#9047ff] flex items-center justify-center text-white font-bold text-sm shadow-md">
              Au
            </div>
            <div className="flex flex-col">
              <span className="font-emotion-serif text-2xl tracking-tight leading-none group-hover:text-[#9047ff] transition-colors">
                AuMDS
              </span>
              <span className="font-emotion-mono text-[9px] uppercase tracking-widest opacity-60">
                Interfaces // 2026
              </span>
            </div>
          </Link>

          {/* 2. CENTER NAVIGATION LINKS (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onMouseEnter={() => audioEngine.playHover()}
                  className={`group relative py-1 text-xs font-mono uppercase tracking-widest transition-colors ${
                    isActive ? 'text-[#9047ff] font-bold' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <span>{link.label}</span>
                  {/* Animated underline sweep matching Emotion Agency */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#9047ff] origin-left transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* 3. RIGHT ACTIONS (Theme Toggle, Sound Viz, CTA) */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Theme Switcher Button */}
            <button
              onClick={toggleTheme}
              onMouseEnter={() => audioEngine.playHover()}
              className="w-8 h-8 rounded-full border border-current/20 flex items-center justify-center hover:border-current/60 transition-colors"
              aria-label="Toggle dark/light theme"
            >
              {isDark ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-purple-700" />
              )}
            </button>

            {/* Sound Equalizer Visualizer */}
            <EmotionSoundVisualizer />

            {/* Signature Let's Talk Fluid Pill Button */}
            <div className="hidden sm:block">
              <EmotionButton
                variant="primary"
                size="sm"
                onClick={() => setIsConsultOpen(true)}
                icon={<CornerDownRight className="w-3.5 h-3.5" />}
              >
                Let's talk
              </EmotionButton>
            </div>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => {
                audioEngine.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 rounded-full border border-current/20"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER (Full Viewport matching Emotion Agency mobile-nav) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 md:hidden"
          >
            <div className="space-y-6">
              <div className="border-b border-current/10 pb-3 flex justify-between items-center">
                <span className="text-xs font-mono uppercase tracking-widest text-[#9047ff]">
                  Navigation Menu
                </span>
                <span className="text-xs font-mono opacity-50">Bengaluru // 2026</span>
              </div>

              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={() => {
                        audioEngine.playClick();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-between py-2 border-b border-current/5"
                    >
                      <span className="font-emotion-serif text-3xl font-light">{link.label}</span>
                      <span className="font-emotion-mono text-xs text-[#9047ff]">{link.num}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 pt-6">
              <EmotionButton
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsConsultOpen(true);
                }}
              >
                Let's talk
              </EmotionButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instant Consultation Modal */}
      <ConsultationModal isOpen={isConsultOpen} onClose={() => setIsConsultOpen(false)} />
    </>
  );
};
