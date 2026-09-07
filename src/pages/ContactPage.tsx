import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SplitTextHeading } from '../components/SplitTextHeading';
import { SectionScrollAnimation } from '../components/SectionScrollAnimation';
import { ElasticTiltCard } from '../components/ElasticTiltCard';
import { Compass, Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Clock, Globe, Sparkles, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { audioEngine } from '../components/AudioEngine';

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: 'software',
    message: '',
    location: 'Bengaluru, India (Auto-detected)',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    audioEngine.playSwoosh();
    setFormSubmitted(true);
  };

  return (
    <div className="relative pt-32 pb-24 z-10 font-sans space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* SECTION 1: CONTACT HERO */}
        <section className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/40 bg-slate-900/70 backdrop-blur-xl w-fit mb-6 shadow-2xl"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase font-bold">
              COMMUNICATION HUB // REALTIME UPLINK
            </span>
          </motion.div>

          <SplitTextHeading
            as="h1"
            text="Let's Co-Create Your Brand Universe"
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-display leading-[1.06]"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal"
          >
            Connect directly with the leadership, software architects, and brand engineers at Au Multidimensional Solutions.
          </motion.p>

          {/* Clickable Communication Orbs Row with Elastic Tilt */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              {
                label: 'Direct Email',
                val: 'contact@aumdsorg.com',
                href: 'mailto:contact@aumdsorg.com',
                icon: Mail,
                color: 'from-cyan-400 to-blue-500',
              },
              {
                label: 'Voice Uplink',
                val: '+91 7019134445',
                href: 'tel:+917019134445',
                icon: Phone,
                color: 'from-amber-400 to-orange-500',
              },
              {
                label: 'WhatsApp Sync',
                val: 'Instant Chat',
                href: 'https://wa.me/917019134445',
                icon: MessageSquare,
                color: 'from-emerald-400 to-teal-500',
              },
              {
                label: 'Command Node',
                val: 'Bengaluru, India',
                href: '#location-crystal',
                icon: MapPin,
                color: 'from-indigo-400 to-purple-500',
              },
            ].map((orb) => {
              const OrbIcon = orb.icon;
              return (
                <ElasticTiltCard key={orb.label}>
                  <a
                    href={orb.href}
                    target={orb.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    onClick={() => audioEngine.playClick()}
                    className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/50 transition-all text-center flex flex-col items-center group backdrop-blur-xl h-full block shadow-lg"
                  >
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${orb.color} flex items-center justify-center text-slate-950 mb-3 shadow-lg`}
                    >
                      <OrbIcon className="w-5 h-5" />
                    </motion.div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">{orb.label}</span>
                    <span className="text-xs font-semibold text-white mt-1 truncate max-w-full">{orb.val}</span>
                  </a>
                </ElasticTiltCard>
              );
            })}
          </motion.div>
        </section>

        {/* SECTION 2: FORM & 3D LOCATION CRYSTAL GRID */}
        <SectionScrollAnimation className="section-aura-cyan p-8 sm:p-12 rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* UPLINK TRANSMISSION FORM */}
            <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-2xl shadow-2xl">
              <div className="mb-6">
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider font-mono">
                  TRANSMISSION CHANNEL
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1 font-display">
                  Send Enterprise Inquiry
                </h2>
              </div>

              {!formSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">YOUR FULL NAME *</label>
                      <input
                        type="text"
                        placeholder="Vikram Rao"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">BUSINESS EMAIL *</label>
                      <input
                        type="email"
                        placeholder="contact@enterprise.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">PHONE NUMBER</label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">CORE REQUIREMENT</label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-slate-300 text-xs focus:outline-none focus:border-cyan-400 font-medium"
                      >
                        <option value="software">Deep-Tech Software Engineering</option>
                        <option value="brand">Exponential Brand Architecture</option>
                        <option value="incorporation">Corporate Strategy & Incorporation</option>
                        <option value="triad">TRIAD Talent Incubation (SDW)</option>
                        <option value="satchai">SatChai Founder Guild</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">AUTO-CALIBRATED GEO LOCATION</label>
                    <input
                      type="text"
                      disabled
                      value={formData.location}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/5 text-slate-400 text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">PROJECT MANIFESTO / DETAILS</label>
                    <textarea
                      rows={4}
                      placeholder="Briefly describe your objectives, timelines, or specifications..."
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none font-normal"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.04, y: -2, transition: { type: 'spring', stiffness: 450, damping: 12 } }}
                    whileTap={{ scale: 0.94 }}
                    type="submit"
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.4)] font-mono uppercase tracking-wider"
                  >
                    <Send className="w-4 h-4" />
                    Transmit Uplink Manifesto
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display">
                    Uplink Transmitted // Synced to HQ
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-cyan-400 font-semibold">{formData.name}</span>. Your transmission has been logged into the AuMDS central operations matrix. An executive partner will connect with you within 4 hours.
                  </p>
                </motion.div>
              )}
            </div>

            {/* 3D LOCATION CRYSTAL & BENGALURU NODE */}
            <div id="location-crystal" className="lg:col-span-5 space-y-6">
              <ElasticTiltCard glowColor="rgba(56, 189, 248, 0.4)">
                <div className="p-7 sm:p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider font-mono">
                      3D LOCATION CRYSTAL
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono flex items-center gap-1.5 font-bold border border-emerald-400/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      PHYSICAL NODE
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white font-display mb-4">
                    Bengaluru Global Headquarters
                  </h3>

                  <div className="space-y-4 text-xs sm:text-sm">
                    <div className="flex items-start gap-3 text-slate-300">
                      <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        #769, 2nd Floor, Prema Enclave, 1st Main, Outer Ring Rd, Kengeri Satellite Town, Bengaluru, Karnataka 560060, India
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-300">
                      <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                      <span className="font-mono">Mon – Sat: 09:30 – 19:00 IST</span>
                    </div>
                  </div>

                  {/* Geo Coordinate Telemetry Box */}
                  <div className="mt-6 p-4 rounded-2xl bg-slate-950/90 border border-white/10">
                    <span className="text-[10px] font-mono text-cyan-400 block mb-1 font-bold">GLOBAL SATELLITE TELEMETRY</span>
                    <span className="text-xs font-mono text-white font-bold">12.9249° N, 77.4797° E // ASIA-SOUTH-1</span>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-mono">Directions & Campus Map</span>
                    <motion.a
                      whileHover={{ x: 3 }}
                      href="https://maps.google.com/?q=Kengeri+Satellite+Town+Bengaluru"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-cyan-400 hover:text-amber-400 flex items-center gap-1 font-mono"
                    >
                      Open in Maps →
                    </motion.a>
                  </div>
                </div>
              </ElasticTiltCard>

              {/* SatChai & TRIAD Direct Channel */}
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 flex items-center justify-between shadow-lg backdrop-blur-xl">
                <div>
                  <span className="text-sm font-bold text-white block">SatChai Founder Guild Inquiries</span>
                  <span className="text-xs text-slate-400 font-normal">Direct invitations to upcoming founder mixers</span>
                </div>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.94 }}
                  href="mailto:contact@aumdsorg.com?subject=SatChai%20Guild%20Invitation"
                  className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-cyan-400 hover:text-slate-950 text-cyan-400 text-xs font-mono uppercase tracking-wider transition-colors font-bold shadow-md"
                >
                  Request Pass
                </motion.a>
              </div>
            </div>

          </div>
        </SectionScrollAnimation>

      </div>
    </div>
  );
};
