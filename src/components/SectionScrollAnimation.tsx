import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * =========================================================================================
 * SECTION BOX COMPONENT: SectionScrollAnimation
 * =========================================================================================
 * 
 * PURPOSE & ARCHITECTURE:
 * This component acts as the foundational, reusable wrapper ("Section Box") for major page 
 * sections across the application (Home, Services, Portfolio, Careers, Legal, Founders, etc.).
 * 
 * CORE RESPONSIBILITIES & VISUAL FEATURES:
 * 1. Entry Transition (Viewport-triggered):
 *    - Fades in with direction-aware translation (up, down, left, right).
 *    - Removes subtle blur filter for high-end cinematic lens focus.
 *    - Triggers only once when entering the user's viewport (`once: true`).
 * 
 * 2. Dynamic Scroll Parallax (Smooth Continuous Scroll):
 *    - Tracks the section's position as it scrolls through the viewport (`useScroll`).
 *    - Applies spring physics (`useSpring`) to eliminate jitter and produce butter-smooth motion.
 *    - Scales and adjusts opacity gently (`useTransform`) to give a modern 3D depth-of-field effect.
 * 
 * 3. Animated Horizon Laser Beam:
 *    - A 2px high-tech cyan/luminous beam sweeps across the top border when the section box
 *      first scrolls into view, acting as an eye-catching visual divider.
 * 
 * 4. Flexible Styling & Aura Integration:
 *    - Accepts external CSS classes like `.section-aura-cyan`, `.section-aura-indigo`, or
 *      `.section-aura-amber` (defined in `index.css`) to provide ambient backdrop glows.
 * =========================================================================================
 */

/**
 * Props definition for the SectionScrollAnimation ("Section Box") component.
 */
export interface SectionScrollAnimationProps {
  /**
   * The inner React nodes and components rendered inside this section box.
   */
  children: React.ReactNode;

  /**
   * Additional Tailwind or custom CSS classes applied to the outer section container.
   * Commonly used to apply background glows (e.g., 'section-aura-cyan', 'p-8 sm:p-12 rounded-3xl').
   */
  className?: string;

  /**
   * Optional HTML id attribute for smooth scrolling, deep linking, and jump targets.
   * Example: id="career-application-orbit"
   */
  id?: string;

  /**
   * Delay in seconds before triggering the entry animation.
   * Useful when staggering sequential boxes on the same page.
   * @default 0
   */
  delay?: number;

  /**
   * Direction from which the section box slides in upon entering the viewport.
   * Options: 'up' (slides upward), 'down', 'left', 'right'.
   * @default 'up'
   */
  direction?: 'up' | 'down' | 'left' | 'right';

  /**
   * Flag to toggle continuous subtle scroll parallax (scaling & opacity shifts).
   * Set to `false` if the section requires static positioning without scale transforms.
   * @default true
   */
  enableParallax?: boolean;
}

export const SectionScrollAnimation: React.FC<SectionScrollAnimationProps> = ({
  children,
  className = '',
  id,
  delay = 0,
  direction = 'up',
  enableParallax = true,
}) => {
  // ---------------------------------------------------------------------------------------
  // STEP 1: SECTION ELEMENT REFERENCE
  // ---------------------------------------------------------------------------------------
  // Reference attached to the underlying <section> DOM node to measure its bounding box
  // relative to the viewport window for scroll tracking.
  const sectionRef = useRef<HTMLElement>(null);

  // ---------------------------------------------------------------------------------------
  // STEP 2: SCROLL POSITION TRACKING
  // ---------------------------------------------------------------------------------------
  // useScroll tracks normalized scroll progress (from 0.0 to 1.0):
  // - "start end": Progress begins (0) when the top of the section enters the bottom of viewport.
  // - "end start": Progress ends (1) when the bottom of the section leaves the top of viewport.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // ---------------------------------------------------------------------------------------
  // STEP 3: SPRING PHYSICS INTERPOLATION
  // ---------------------------------------------------------------------------------------
  // Raw scroll events can be jerky on trackpads or mouse wheels.
  // useSpring softens the raw scrollYProgress using physics (stiffness & damping)
  // for cinematic, organic acceleration and deceleration.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 250, // Higher value = more responsive to scroll movements
    damping: 30,    // Absorbs oscillation to prevent rubber-banding/bouncing
  });

  // ---------------------------------------------------------------------------------------
  // STEP 4: PARALLAX DEPTH & OPACITY MAPPING
  // ---------------------------------------------------------------------------------------
  // Map normalized scroll progress to subtle 3D scale and opacity changes:
  // - Scale: Starts at 93% (0.93), expands to full size (1.0) when centered, then slightly contracts to 0.96 as it exits.
  // - Opacity: Starts semi-translucent (0.4), reaches full clarity (1.0) while actively viewed, then dims slightly (0.6).
  const scale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.93, 1, 1, 0.96]);
  const opacity = useTransform(smoothProgress, [0, 0.25, 0.85, 1], [0.4, 1, 1, 0.6]);

  // ---------------------------------------------------------------------------------------
  // STEP 5: INITIAL ENTRANCE STATES
  // ---------------------------------------------------------------------------------------
  // Computes the starting off-screen/pre-view state based on the requested slide direction.
  // Includes a slight lens blur ('blur(8px)') that smoothly clears to 0px on reveal.
  const getInitial = () => {
    switch (direction) {
      case 'left':
        return { opacity: 0, x: -30, filter: 'blur(8px)', scale: 0.98 };
      case 'right':
        return { opacity: 0, x: 30, filter: 'blur(8px)', scale: 0.98 };
      case 'down':
        return { opacity: 0, y: -20, filter: 'blur(8px)', scale: 0.98 };
      case 'up':
      default:
        return { opacity: 0, y: 20, filter: 'blur(8px)', scale: 0.98 };
    }
  };

  // ---------------------------------------------------------------------------------------
  // STEP 6: RENDER SECTION CONTAINER
  // ---------------------------------------------------------------------------------------
  return (
    <motion.section
      ref={sectionRef}
      id={id}
      // Apply real-time scroll parallax styles if enabled
      style={enableParallax ? { scale, opacity } : {}}
      // Start in the pre-view position and blurred state
      initial={getInitial()}
      // Transition to clean, centered, fully visible state once scrolled into view
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
        scale: 1,
      }}
      // once: true ensures entrance animation only runs once per page load (avoids re-triggering)
      viewport={{ once: true, margin: '0px' }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom cubic bezier for smooth, luxury deceleration
      }}
      // Hardware acceleration utilities:
      // - relative: establishes stacking context for absolute beam/background elements
      // - overflow-hidden: prevents children or glowing beams from spilling over borders
      // - will-change-transform & transform-gpu: offloads animation math to the GPU for 60-120fps performance
      className={`relative overflow-hidden will-change-transform transform-gpu ${className}`}
    >
      {/* 
        -----------------------------------------------------------------------------------
        ANIMATED GLOWING TOP HORIZON BEAM
        -----------------------------------------------------------------------------------
        A luminous cyan gradient line that sweeps from -100% to +100% across the top edge.
        Creates an energetic, futuristic "scanning" effect as the section box enters view.
      */}
      <motion.div
        initial={{ x: '-100%' }}
        whileInView={{ x: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: delay + 0.2, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-30 opacity-80"
      />

      {/* 
        -----------------------------------------------------------------------------------
        SECTION BOX INTERIOR CONTENT
        -----------------------------------------------------------------------------------
        Renders any child elements, cards, grids, headings, or forms passed into the box.
      */}
      {children}
    </motion.section>
  );
};

