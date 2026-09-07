import React, { useState } from 'react';
import { ArrowUpRight, Compass, Mail, Phone, MapPin, CheckCircle2, Send, Sparkles, User, BookOpen } from 'lucide-react';
import { audioEngine } from './AudioEngine';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const NexusFooter: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    audioEngine.playSwoosh();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '' });
    }, 4000);
  };

  return (
    <footer id="contact" className="relative z-10 bg-[#040814] border-t border-slate-900 pt-24 pb-12 text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-900">
          
          {/* Mission Capsule */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-mono text-amber-400 tracking-widest uppercase font-bold">
                  Au Multidimensional Solutions Pvt. Ltd.
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-display">
                Co-Creating the Universe of Brands.
              </h3>
              <p className="mt-4 text-sm text-slate-300 leading-relaxed max-w-md font-normal">
                Led by Founder & CEO <strong>Shivaprasad Aum</strong>. Bridging deep-tech engineering, algorithmic growth architectures, institutional corporate governance, and talent incubation from Bengaluru to the global matrix.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-900 space-y-2">
              <div className="flex items-center gap-3">
                <Compass className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-xs font-mono text-slate-400 font-semibold">
                  GEO COORDINATE: 12.9249° N, 77.4797° E // BENGALURU
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-500">
                CIN: U85499KA2024PTC185494 | Ministry of Corporate Affairs, Gov of India
              </p>
            </div>
          </div>

          {/* Quick Hub Links */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs font-mono text-slate-200 tracking-wider uppercase font-bold">
              Operational Matrix
            </span>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'Home Viewport', path: '/' },
                { name: 'Founder & CEO (Shivaprasad Aum)', path: '/founder' },
                { name: 'Services Constellation', path: '/services' },
                { name: 'About AuMDS & Origin', path: '/about' },
                { name: 'Careers & Talent Orbit', path: '/careers' },
                { name: 'TRIAD & Ecosystem', path: '/ecosystem' },
                { name: 'Case Studies Portfolio', path: '/portfolio' },
                { name: 'Contact & Location Crystal', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={() => {
                      audioEngine.playClick();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-cyan-400 transition-colors flex items-center justify-between group py-1 text-xs font-mono text-slate-400 hover:translate-x-1 duration-200"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Coordinate Channel & Uplink Form */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-mono text-slate-200 tracking-wider uppercase font-bold">
              Establish Uplink
            </span>

            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <span className="text-slate-300 text-xs leading-relaxed">
                  #769, 2nd Floor, Prema Enclave, 1st Main, Outer Ring Rd, Kengeri Satellite Town, Bengaluru, KA 560060
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="mailto:contact@aumdsorg.com" className="hover:text-white transition-colors text-xs font-mono">
                  contact@aumdsorg.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="tel:+917019134445" className="hover:text-white transition-colors text-xs font-mono">
                  +91 7019134445
                </a>
              </div>
            </div>

            {/* Quick Contact Box */}
            <div className="mt-4 p-5 rounded-2xl bg-[#0A2540]/60 border border-slate-800 shadow-xl backdrop-blur-xl">
              {formSubmitted ? (
                <div className="py-4 text-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2 animate-bounce" />
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    UPLINK TRANSMITTED SUCCESSFULLY
                  </span>
                  <p className="text-[11px] text-slate-400 mt-1">Our team will establish connection shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your Name / Organization"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-950/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                  <input
                    type="email"
                    placeholder="contact@enterprise.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-950/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                  />
                  <motion.button
                    whileHover={{ scale: 1.04, y: -1, transition: { type: 'spring', stiffness: 450, damping: 12 } }}
                    whileTap={{ scale: 0.94 }}
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20 font-mono uppercase tracking-wider"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Transmit Quick Uplink
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Legal & System Timestamp */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© {new Date().getFullYear()} Shivaprasad Aum / Au Multidimensional Solutions Pvt Ltd. All dimensions reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/legal" className="hover:text-cyan-400 transition-colors">Privacy Protocol</Link>
            <Link to="/legal" className="hover:text-cyan-400 transition-colors">Terms of Dimension</Link>
            <Link to="/founder" className="hover:text-amber-400 transition-colors">Founder Bio & Books</Link>
            <span className="text-emerald-500/80 font-bold hidden sm:inline">SYS_STATUS: 100% NOMINAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
