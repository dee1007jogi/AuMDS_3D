import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, CheckCircle2, Building2, Rocket, Globe, Layers, Calendar, User, Mail, MessageSquare } from 'lucide-react';
import { audioEngine } from './AudioEngine';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BUSINESS_SCALES = [
  { id: 'startup', label: 'Seed / Early Startup', icon: Rocket, desc: 'MVPs, Brand Genesis, Rapid Launch' },
  { id: 'sme', label: 'Growing SME / Scaleup', icon: Building2, desc: 'Brand Evolution, Software Systems, SatChai Guild' },
  { id: 'enterprise', label: 'Scaling Enterprise', icon: Layers, desc: 'Deep-Tech Modernization, TRIAD Talent Pipeline' },
  { id: 'global', label: 'Global Conglomerate', icon: Globe, desc: 'Omni-channel Strategy, High-Concurrency Architectures' },
];

const SERVICE_CAPABILITIES = [
  'Deep-Tech Software Engineering',
  'Exponential Brand Architecture',
  'TRIAD Talent & Skill Incubation',
  'SatChai Global Founder Guild',
  'End-to-End Corporate Incorporation',
  '3D / Spatial WebXR Experience',
];

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedScale, setSelectedScale] = useState('startup');
  const [selectedServices, setSelectedServices] = useState<string[]>(['Deep-Tech Software Engineering']);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleService = (srv: string) => {
    audioEngine.playClick();
    setSelectedServices(prev =>
      prev.includes(srv) ? prev.filter(s => s !== srv) : [...prev, srv]
    );
  };

  const handleNext = () => {
    audioEngine.playClick();
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    audioEngine.playClick();
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playSwoosh();
    setIsSubmitted(true);
  };

  const handleModalClose = () => {
    audioEngine.playClick();
    onClose();
    setTimeout(() => {
      setIsSubmitted(false);
      setStep(1);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleModalClose}
          className="fixed inset-0 bg-[#030712]/80 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/50 backdrop-blur-2xl z-10 overflow-hidden"
        >
          {/* Ambient Glow Orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={handleModalClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-800/60 border border-slate-700/60 text-slate-400 hover:text-white hover:border-cyan-400/50 transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <div>
              {/* Header */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>CO-CREATING THE UNIVERSE OF BRANDS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  Schedule Free Cosmic Consultation
                </h3>
                <p className="text-slate-400 text-sm mt-1">
                  Connect with AuMDS enterprise architects to calibrate your corporate ecosystem.
                </p>

                {/* Stepper Indicator */}
                <div className="flex items-center gap-2 mt-4">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                        step >= s ? 'bg-gradient-to-r from-cyan-400 to-amber-400' : 'bg-slate-800'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* STEP 1: BUSINESS SCALE */}
              {step === 1 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-mono text-cyan-400 uppercase tracking-wider">
                    Step 1: Select Your Current Business Scale
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {BUSINESS_SCALES.map((scale) => {
                      const Icon = scale.icon;
                      const isSelected = selectedScale === scale.id;
                      return (
                        <div
                          key={scale.id}
                          onClick={() => {
                            audioEngine.playClick();
                            setSelectedScale(scale.id);
                          }}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                            isSelected
                              ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                              : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="font-semibold text-white text-sm">{scale.label}</span>
                          </div>
                          <p className="text-xs text-slate-400">{scale.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-end pt-4">
                    <button
                      onClick={handleNext}
                      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-amber-400 text-slate-950 font-bold text-sm hover:opacity-90 transition-opacity"
                    >
                      Next: Choose Capabilities →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: CAPABILITIES */}
              {step === 2 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-mono text-cyan-400 uppercase tracking-wider">
                    Step 2: Desired Capabilities & Solutions
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SERVICE_CAPABILITIES.map((srv) => {
                      const isSelected = selectedServices.includes(srv);
                      return (
                        <div
                          key={srv}
                          onClick={() => toggleService(srv)}
                          className={`p-3 rounded-xl border cursor-pointer text-xs font-medium flex items-center justify-between transition-all ${
                            isSelected
                              ? 'bg-cyan-950/50 border-cyan-400 text-white'
                              : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <span>{srv}</span>
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-cyan-400 bg-cyan-400/20 text-cyan-300' : 'border-slate-700'}`}>
                            {isSelected && '✓'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between items-center pt-4">
                    <button
                      onClick={handlePrev}
                      className="px-4 py-2 rounded-full border border-slate-800 text-xs font-mono text-slate-400 hover:text-white"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={handleNext}
                      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-amber-400 text-slate-950 font-bold text-sm hover:opacity-90"
                    >
                      Next: Contact Coordinates →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: CONTACT COORDINATES */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <h4 className="text-sm font-mono text-cyan-400 uppercase tracking-wider">
                    Step 3: Executive Coordinates
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">FULL NAME *</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Alex Mercer"
                          className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-2.5 pl-9 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">CORPORATE EMAIL *</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@enterprise.com"
                          className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-2.5 pl-9 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">ORGANIZATION / PROJECT NAME</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="OmniCorp Global"
                      className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">BRIEF VISION / GOALS</label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Outline your timeline, current bottlenecks, or scale objectives..."
                      className="w-full bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 resize-none"
                    />
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-4 py-2 rounded-full border border-slate-800 text-xs font-mono text-slate-400 hover:text-white"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="px-7 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 via-amber-400 to-amber-500 text-slate-950 font-extrabold text-sm hover:opacity-90 shadow-lg shadow-cyan-500/20 flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Initialize Consultation
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* SUCCESS VIEW */
            <div className="py-8 text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-emerald-500/20 border border-emerald-400/40 rounded-full flex items-center justify-center mx-auto text-emerald-400"
              >
                <CheckCircle2 className="w-8 h-8" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white font-display">
                Transmission Received // Universe Synced
              </h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-cyan-400 font-semibold">{formData.fullName || 'Partner'}</span>. An AuMDS Lead Architect has been assigned to your profile. We will dispatch discovery telemetry to <span className="text-amber-400 font-mono">{formData.email}</span> within 4 hours.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleModalClose}
                  className="px-8 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-mono uppercase tracking-wider"
                >
                  Return to Ecosystem
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
