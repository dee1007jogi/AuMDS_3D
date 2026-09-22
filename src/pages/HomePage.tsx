import React, { useState } from 'react';
import { EmotionHeroStorytelling } from '../components/EmotionHeroStorytelling';
import { EmotionWhatWeDo } from '../components/EmotionWhatWeDo';
import { EmotionProjectsGrid } from '../components/EmotionProjectsGrid';
import { EmotionAwardsList } from '../components/EmotionAwardsList';
import { EmotionFloatingAI } from '../components/EmotionFloatingAI';
import { NewsletterOrbit } from '../components/NewsletterOrbit';
import { ConsultationModal } from '../components/ConsultationModal';

export const HomePage: React.FC = () => {
  const [isConsultOpen, setIsConsultOpen] = useState(false);

  return (
    <div className="relative font-sans space-y-4">
      {/* 1. EMOTION HERO STORYTELLING (Pinned 100vh Multi-Screen Sequence) */}
      <EmotionHeroStorytelling onOpenConsult={() => setIsConsultOpen(true)} />

      {/* 2. WHAT WE DO (Sticky Side-by-Side Capabilities & Numbered Deliverables) */}
      <EmotionWhatWeDo />

      {/* 3. SELECTED PROJECTS GRID (Emotion Agency Signature Asymmetric Staggered Cards) */}
      <EmotionProjectsGrid />

      {/* 4. IMPACT & RECOGNITION (Row Hover Dimming Effect) */}
      <EmotionAwardsList />

      {/* 5. INTELLIGENCE DISPATCH (Executive Newsletter Orbit) */}
      <section className="py-20 px-6 sm:px-12 max-w-[1440px] mx-auto border-t border-current/10">
        <NewsletterOrbit theme="light" />
      </section>

      {/* 6. FLOATING INTERACTIVE AI ASSISTANT ORB */}
      <EmotionFloatingAI onOpenConsult={() => setIsConsultOpen(true)} />

      {/* Instant Consultation Modal */}
      <ConsultationModal isOpen={isConsultOpen} onClose={() => setIsConsultOpen(false)} />
    </div>
  );
};

export default HomePage;
