import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgressHUD } from './components/ScrollProgressHUD';
import { SmoothScrollEngine } from './components/SmoothScrollEngine';
import { NexusFooter } from './components/NexusFooter';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { CareersPage } from './pages/CareersPage';
import { EcosystemPage } from './pages/EcosystemPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { FounderPage } from './pages/FounderPage';

export default function App() {
  return (
    <BrowserRouter>
      {/* Lenis Ultra-Smooth Momentum Scroll Engine */}
      <SmoothScrollEngine />

      <div className="relative min-h-screen bg-[#030712] text-slate-100 overflow-x-hidden portal-canvas-bg font-sans">
        {/* Cinematic Spatial Ambient Light Pods */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-40 left-1/3 w-[700px] h-[700px] bg-sky-500/10 rounded-full blur-[160px]" />
          <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-amber-500/08 rounded-full blur-[160px]" />
          <div className="absolute top-2/3 -left-40 w-[700px] h-[700px] bg-indigo-600/12 rounded-full blur-[170px]" />
          <div className="absolute bottom-10 right-1/4 w-[550px] h-[550px] bg-cyan-400/08 rounded-full blur-[140px]" />
          <div className="absolute inset-0 portal-grid-mesh pointer-events-none opacity-40" />
        </div>

        {/* Cybernetic Realtime Scroll Progress HUD */}
        <ScrollProgressHUD />

        {/* Custom Spring Cursor Follower */}
        <CustomCursor />

        {/* Floating HUD Command Header */}
        <Navbar />

        {/* Section-Wise Page Routing */}
        <main className="relative z-10 min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/founder" element={<FounderPage />} />
            <Route path="/leadership" element={<FounderPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/ecosystem" element={<EcosystemPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/legal" element={<LegalPage />} />
          </Routes>
        </main>

        {/* Universal Celestial Command Footer */}
        <NexusFooter />
      </div>
    </BrowserRouter>
  );
}
