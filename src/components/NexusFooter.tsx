import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Copy, Check, Sparkles, CornerDownRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EmotionButton } from './EmotionButton';
import { audioEngine } from './AudioEngine';

export const NexusFooter: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [timeString, setTimeString] = useState('');

  const email = 'contact@aumdsorg.com';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    audioEngine.playChime();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <footer className="relative z-10 border-t border-current/10 pt-24 pb-12 px-6 sm:px-12 max-w-[1440px] mx-auto font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-20 border-b border-current/10">
        {/* Left Column: Massive Editorial Headline */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#9047ff] text-white text-[11px] font-mono tracking-wider uppercase font-bold shadow-md shadow-purple-500/20">
              <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
              New Partnerships
            </span>
          </div>

          <h2 className="font-emotion-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[0.88] tracking-tight">
            Let's talk <br />
            <em className="italic font-normal text-[#9047ff]">About your</em> <br />
            <span className="inline-block text-[#9047ff] mr-2 font-mono">↪</span>
            Next Big Thing
          </h2>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            {/* Click to Copy Email Pill Button */}
            <button
              onClick={handleCopy}
              onMouseEnter={() => audioEngine.playHover()}
              className="group relative inline-flex items-center gap-3 px-6 py-4 rounded-full border border-current/20 hover:border-[#9047ff] bg-current/5 hover:bg-[#9047ff] hover:text-white transition-all duration-300 font-mono text-sm sm:text-base cursor-pointer shadow-sm"
              aria-label="Copy contact email"
            >
              <span className="font-semibold tracking-wider">{email}</span>
              <span className="w-6 h-6 rounded-full bg-current/10 flex items-center justify-center text-inherit">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </span>
              <span className="text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-90">
                {copied ? 'Copied!' : 'Click to copy'}
              </span>
            </button>

            <a
              href="tel:+917019134445"
              className="font-emotion-mono text-xs uppercase tracking-wider opacity-70 hover:opacity-100 hover:text-[#9047ff] transition-colors py-2 px-3"
            >
              +91 70191 34445 ↗
            </a>
          </div>
        </div>

        {/* Right Column: Indexed Navigation Lists */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-8 font-sans">
          {/* Section 01: Work & Solutions */}
          <div className="space-y-4">
            <span className="font-emotion-mono text-xs text-[#9047ff] uppercase tracking-widest font-semibold block">
              [01] Ecosystem
            </span>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/portfolio" className="opacity-75 hover:opacity-100 hover:text-[#9047ff] transition-colors">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link to="/services" className="opacity-75 hover:opacity-100 hover:text-[#9047ff] transition-colors">
                  Software Solutions
                </Link>
              </li>
              <li>
                <Link to="/services" className="opacity-75 hover:opacity-100 hover:text-[#9047ff] transition-colors">
                  Brand Systems
                </Link>
              </li>
              <li>
                <Link to="/ecosystem" className="opacity-75 hover:opacity-100 hover:text-[#9047ff] transition-colors">
                  TRIAD Accelerator
                </Link>
              </li>
              <li>
                <Link to="/ecosystem" className="opacity-75 hover:opacity-100 hover:text-[#9047ff] transition-colors">
                  SatChai Founder Guild
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 02: Studio & Identity */}
          <div className="space-y-4">
            <span className="font-emotion-mono text-xs text-[#9047ff] uppercase tracking-widest font-semibold block">
              [02] Studio
            </span>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="opacity-75 hover:opacity-100 hover:text-[#9047ff] transition-colors">
                  About AuMDS
                </Link>
              </li>
              <li>
                <Link to="/founder" className="opacity-75 hover:opacity-100 hover:text-[#9047ff] transition-colors">
                  Leadership
                </Link>
              </li>
              <li>
                <Link to="/careers" className="opacity-75 hover:opacity-100 hover:text-[#9047ff] transition-colors">
                  Careers &amp; Openings
                </Link>
              </li>
              <li>
                <Link to="/legal" className="opacity-75 hover:opacity-100 hover:text-[#9047ff] transition-colors">
                  Statutory &amp; MCA
                </Link>
              </li>
              <li>
                <Link to="/contact" className="opacity-75 hover:opacity-100 hover:text-[#9047ff] transition-colors">
                  Contact Studio
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Realtime City Clock + Legal */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-emotion-mono text-xs opacity-60">
        <div className="flex items-center gap-3">
          <span>Bengaluru Node 12.92° N</span>
          <span>•</span>
          <span className="text-[#9047ff] font-semibold">{timeString || 'IST'}</span>
        </div>

        <div>
          <span>© 2026 Au Multidimensional Solutions Pvt. Ltd. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/legal" className="hover:text-[#9047ff] transition-colors">
            Privacy Policy
          </Link>
          <Link to="/legal" className="hover:text-[#9047ff] transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};
