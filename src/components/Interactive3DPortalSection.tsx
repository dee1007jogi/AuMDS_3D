import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Torus, Sphere, MeshDistortMaterial, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Globe,
  Rocket,
  Layers,
  Code,
  Zap,
  RotateCcw,
  Play,
  Pause,
  Compass
} from 'lucide-react';
import { audioEngine } from './AudioEngine';
import { useNavigate } from 'react-router-dom';
import { RockGoldText } from './RockGoldText';
import { GoldBarButton } from './GoldBarButton';

export interface PortalDimension {
  id: string;
  number: string;
  shortName: string;
  name: string;
  category: string;
  tagline: string;
  coreColor: string;
  ringColor: string;
  emissiveColor: string;
  stats: { label: string; val: string }[];
  route: string;
}

export const PORTAL_DIMENSIONS: PortalDimension[] = [
  {
    id: 'dim-software',
    number: '01',
    shortName: 'Integrated Software',
    name: 'Integrated Software & Deep-Tech Systems',
    category: 'ENTERPRISE ENGINEERING // WEB, APP & AI',
    tagline: 'Web design & development, native mobile apps, IoT & wearable ecosystems, custom POS/CRM, SaaS architecture, and deep-tech AI automation.',
    coreColor: '#0A2540',
    ringColor: '#38BDF8',
    emissiveColor: '#0284C7',
    stats: [
      { label: 'THROUGHPUT', val: '> 10,000 RPS' },
      { label: 'LATENCY', val: '12ms P99' },
      { label: 'STACK', val: 'Next.js / WebGL / Cloud' },
    ],
    route: '/services',
  },
  {
    id: 'dim-brand',
    number: '02',
    shortName: 'Holistic Branding',
    name: 'Holistic Branding & Media Production',
    category: 'BRAND UNIVERSE // 3D & VIDEO',
    tagline: 'Crafting iconic brand strategies, 3D visual identities, high-impact graphic design, cinematic storytelling, and commercial video production.',
    coreColor: '#271704',
    ringColor: '#F59E0B',
    emissiveColor: '#D97706',
    stats: [
      { label: 'ENGAGEMENT', val: '+65% Uplift' },
      { label: 'ASSETS', val: '3D + Visual Identity' },
      { label: 'DELIVERY', val: '14-Day Sprints' },
    ],
    route: '/services',
  },
  {
    id: 'dim-corporate',
    number: '03',
    shortName: 'Corporate Solutions',
    name: 'Holistic Corporate Solutions & Automation',
    category: 'OPERATIONAL MATRIX // SOPS & BPO',
    tagline: 'Business model development, strategic planning, building robust SOPs, BPO services, organizational design, R&D, and complete business automation.',
    coreColor: '#042216',
    ringColor: '#34D399',
    emissiveColor: '#059669',
    stats: [
      { label: 'AUTOMATION', val: 'Full Process SOPs' },
      { label: 'DIAGNOSTICS', val: 'Department Audits' },
      { label: 'EFFICIENCY', val: '40% Boost' },
    ],
    route: '/services',
  },
  {
    id: 'dim-legal',
    number: '04',
    shortName: 'Corporate Financial & Legal',
    name: 'Corporate Financial & Legal Governance',
    category: 'STATUTORY MATRIX // TAX, IP & MCA',
    tagline: 'Pvt Ltd company incorporation, trademark registration, GST/IT/TDS compliances, accounting & bookkeeping, payroll, and Companies Act governance.',
    coreColor: '#170E30',
    ringColor: '#A78BFA',
    emissiveColor: '#7C3AED',
    stats: [
      { label: 'COMPLIANCE', val: '100% Statutory' },
      { label: 'INCORPORATION', val: '< 7 Days' },
      { label: 'IP CLEARANCE', val: 'Class 9, 35 & 42' },
    ],
    route: '/services',
  },
  {
    id: 'dim-ecosystem',
    number: '05',
    shortName: 'TRIAD & SatChai Guild',
    name: 'TRIAD Talent Core & SatChai Founder Guild',
    category: 'VENTURE ALLIANCE // TALENT INCUBATION',
    tagline: 'TRIAD internship program for hands-on student-developer squads, Skill Development Wing (SDW) upskilling, and SatChai founder networking summits.',
    coreColor: '#280718',
    ringColor: '#FB7185',
    emissiveColor: '#E11D48',
    stats: [
      { label: 'TALENT POOL', val: '500+ Engineers' },
      { label: 'NETWORK', val: '1,200+ Founders' },
      { label: 'SUMMITS', val: '25+ Global Events' },
    ],
    route: '/ecosystem',
  },
];

const portalCardVariants: Variants = {
  initial: (dir: number) => ({
    opacity: 0,
    z: -320,
    scale: 0.65,
    rotateX: dir > 0 ? 12 : -12,
    rotateY: dir > 0 ? -18 : 18,
    filter: 'blur(10px)'
  }),
  animate: {
    opacity: 1,
    z: 0,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    filter: 'blur(0px)'
  },
  exit: (dir: number) => ({
    opacity: 0,
    z: 260,
    scale: 1.35,
    rotateX: dir > 0 ? -10 : 10,
    rotateY: dir > 0 ? 15 : -15,
    filter: 'blur(8px)'
  })
};

// 3D Z-Depth Warp Camera Rig (Slider Revolution Portal Fly-Through Engine)
function WarpCameraRig({ warpTrigger }: { warpTrigger: number }) {
  const { camera } = useThree();
  const warpProgress = useRef(0);
  const isWarping = useRef(false);
  const baseZ = 5.2;

  useEffect(() => {
    if (warpTrigger > 0) {
      isWarping.current = true;
      warpProgress.current = 0;
    }
  }, [warpTrigger]);

  useFrame((state, delta) => {
    const persCamera = camera as THREE.PerspectiveCamera;
    // Parallax mouse tilt
    const targetX = state.pointer.x * 0.8;
    const targetY = state.pointer.y * 0.6;
    persCamera.position.x += (targetX - persCamera.position.x) * 0.05;
    persCamera.position.y += (targetY - persCamera.position.y) * 0.05;

    if (isWarping.current) {
      warpProgress.current += delta * 1.8;
      const p = warpProgress.current;

      if (p < 0.5) {
        // Surge into the portal (Z-depth plunge towards event horizon)
        const inFactor = p / 0.5;
        const easeIn = inFactor * inFactor * (3 - 2 * inFactor);
        persCamera.position.z = THREE.MathUtils.lerp(baseZ, 1.4, easeIn);
        if (persCamera.isPerspectiveCamera) {
          persCamera.fov = THREE.MathUtils.lerp(45, 68, easeIn);
        }
      } else if (p < 1.0) {
        // Emerge out on the other side of the portal
        const outFactor = (p - 0.5) / 0.5;
        const easeOut = outFactor * outFactor * (3 - 2 * outFactor);
        persCamera.position.z = THREE.MathUtils.lerp(1.4, baseZ, easeOut);
        if (persCamera.isPerspectiveCamera) {
          persCamera.fov = THREE.MathUtils.lerp(68, 45, easeOut);
        }
      } else {
        isWarping.current = false;
        persCamera.position.z = baseZ;
        if (persCamera.isPerspectiveCamera) {
          persCamera.fov = 45;
        }
      }
      persCamera.updateProjectionMatrix();
    } else {
      persCamera.position.z += (baseZ - persCamera.position.z) * 0.08;
    }

    persCamera.lookAt(0, 0, 0);
  });

  return null;
}

// Stargate Z-Depth Concentric Portal Tunnel
function PortalTunnelRings({ ringColor, emissiveColor, warpTrigger }: { ringColor: string; emissiveColor: string; warpTrigger: number }) {
  const tunnelGroup = useRef<THREE.Group>(null);
  const ringDepths = useMemo(() => [0, -2.0, -4.2, -6.5, -9.0, -11.5, -14.0], []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (tunnelGroup.current) {
      tunnelGroup.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        // Undulating neon wave down the Z-tunnel
        const pulse = 1.0 + Math.sin(t * 3.5 - i * 0.6) * 0.08;
        mesh.scale.set(pulse, pulse, 1.0);
        mesh.rotation.z = (i % 2 === 0 ? 1 : -1) * t * 0.25 + (i * Math.PI) / 6;
      });
    }
  });

  return (
    <group ref={tunnelGroup}>
      {ringDepths.map((z, i) => {
        const scaleFactor = 1.0 + (Math.abs(z) * 0.08);
        const opacity = Math.max(0.15, 0.95 - (i * 0.12));
        return (
          <Torus key={i} args={[1.9 * scaleFactor, 0.035, 24, 72]} position={[0, 0, z]}>
            <meshStandardMaterial
              color={ringColor}
              emissive={emissiveColor}
              emissiveIntensity={1.8 - i * 0.2}
              metalness={0.9}
              roughness={0.1}
              transparent
              opacity={opacity}
            />
          </Torus>
        );
      })}
    </group>
  );
}

// Dimensional Portal Core & Gyroscopic Rings
function DimensionalPortalMesh({
  dimension,
  warpTrigger
}: {
  dimension: PortalDimension;
  warpTrigger: number;
}) {
  const portalRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const orbRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (portalRef.current) {
      portalRef.current.rotation.y = t * 0.14 + state.pointer.x * 0.25;
      portalRef.current.rotation.x = t * 0.08 + state.pointer.y * 0.2;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.45;
      ring1Ref.current.rotation.x = Math.sin(t * 0.6) * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.35;
      ring2Ref.current.rotation.y = Math.cos(t * 0.5) * 0.25;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = t * 0.3;
      ring3Ref.current.rotation.y = -t * 0.2;
    }
  });

  return (
    <Float speed={2.2} rotationIntensity={0.6} floatIntensity={0.9}>
      <group ref={portalRef} position={[0, 0, 0]}>
        {/* Glowing Center Dimension Core with Refractive Distortion */}
        <Sphere ref={orbRef} args={[1.05, 64, 64]}>
          <MeshDistortMaterial
            color={dimension.coreColor}
            emissive={dimension.emissiveColor}
            emissiveIntensity={1.1}
            roughness={0.08}
            metalness={0.95}
            distort={0.42}
            speed={3.2}
          />
        </Sphere>

        {/* Outer Metallic Chrome Portal Arch */}
        <Torus ref={ring1Ref} args={[2.0, 0.06, 32, 100]}>
          <meshStandardMaterial
            color="#FFFFFF"
            metalness={0.98}
            roughness={0.04}
          />
        </Torus>

        {/* Inner Luminous Neon Portal Ring */}
        <Torus ref={ring2Ref} args={[1.65, 0.04, 32, 100]}>
          <meshStandardMaterial
            color={dimension.ringColor}
            emissive={dimension.emissiveColor}
            emissiveIntensity={2.2}
            metalness={0.8}
            roughness={0.1}
          />
        </Torus>

        {/* Counter-Rotating Gyroscopic Ring */}
        <Torus ref={ring3Ref} args={[2.35, 0.025, 32, 100]} rotation={[Math.PI / 2.3, 0, 0]}>
          <meshStandardMaterial
            color={dimension.ringColor}
            emissive={dimension.ringColor}
            emissiveIntensity={1.2}
            metalness={0.9}
            roughness={0.15}
          />
        </Torus>

        {/* Concentric Z-Depth Stargate Tunnel Rings */}
        <PortalTunnelRings
          ringColor={dimension.ringColor}
          emissiveColor={dimension.emissiveColor}
          warpTrigger={warpTrigger}
        />
      </group>
    </Float>
  );
}

// 3D Hyperdrive Z-Streak Particle Vortex (Accelerates along Z during warp)
function PortalHyperdriveVortex({ ringColor, warpTrigger }: { ringColor: string; warpTrigger: number }) {
  const count = 550;
  const pointsRef = useRef<THREE.Points>(null);
  const warpVelocity = useRef(1.0);

  const [positions, initialZ] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const zInit = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const radius = 0.4 + Math.random() * 3.4;
      const angle = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 22; // Extended Z-depth
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = z;
      zInit[i] = z;
    }
    return [pos, zInit];
  }, []);

  useEffect(() => {
    if (warpTrigger > 0) {
      warpVelocity.current = 8.5; // Hyperdrive surge
    }
  }, [warpTrigger]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.z = t * 0.2;

    // Decay warp velocity smoothly
    warpVelocity.current += (1.0 - warpVelocity.current) * 0.04;

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const zIdx = i * 3 + 2;
      // Fly particles forward in Z-depth towards camera
      array[zIdx] += delta * 4.5 * warpVelocity.current;

      // Wrap around when past camera
      if (array[zIdx] > 6.5) {
        array[zIdx] = -14.0;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={ringColor}
        size={0.045}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

export const Interactive3DPortalSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [warpTrigger, setWarpTrigger] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [autoProgress, setAutoProgress] = useState(0);
  const navigate = useNavigate();

  const currentDim = PORTAL_DIMENSIONS[activeIdx];

  const handlePortalChange = (newIdx: number, dir: 1 | -1 = 1) => {
    if (newIdx === activeIdx) return;
    setDirection(dir);
    setActiveIdx(newIdx);
    setWarpTrigger((prev) => prev + 1);
    audioEngine.playWarp();
    setAutoProgress(0);
  };

  const handleNext = () => {
    const nextIdx = (activeIdx + 1) % PORTAL_DIMENSIONS.length;
    handlePortalChange(nextIdx, 1);
  };

  const handlePrev = () => {
    const prevIdx = (activeIdx - 1 + PORTAL_DIMENSIONS.length) % PORTAL_DIMENSIONS.length;
    handlePortalChange(prevIdx, -1);
  };

  // Keyboard Navigation Support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx]);

  // Autoplay Slider Timer
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setAutoProgress((p) => {
        if (p >= 100) {
          handleNext();
          return 0;
        }
        return p + 1.25;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isAutoPlay, activeIdx]);

  return (
    <section className="relative z-20 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans [perspective:1400px]">
      {/* Section Header */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-950/40 backdrop-blur-xl mb-4 shadow-lg shadow-amber-950/30"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="text-xs font-mono tracking-widest text-amber-300 uppercase font-bold">
            ✦ AUMDS STRATEGIC ECOSYSTEM // 5 CORE DIMENSIONS
          </span>
        </motion.div>

        <RockGoldText
          as="h2"
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white font-display tracking-tight leading-[1.08] mx-auto"
        >
          The 5 Strategic Dimensions of AuMDS
        </RockGoldText>
        <p className="mt-4 text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal max-w-2xl mx-auto">
          Explore the interconnected engines powering AuMDS. From enterprise deep-tech architecture and exponential brand growth to statutory legal frameworks, autonomous talent incubation, and global founder alliances.
        </p>
      </div>

      {/* 5-Way Dimension Selector Strip with Autoplay Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        <div className="flex flex-wrap gap-2 justify-center p-1.5 rounded-full bg-slate-900/80 border border-amber-400/20 backdrop-blur-xl shadow-2xl">
          {PORTAL_DIMENSIONS.map((dim, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={dim.id}
                onClick={() => handlePortalChange(idx, idx > activeIdx ? 1 : -1)}
                onMouseEnter={() => audioEngine.playHover()}
                className={`relative px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'text-slate-950 font-extrabold shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePortalTab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 shadow-[0_0_22px_rgba(245,183,34,0.6)]"
                    transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                  />
                )}
                <span className="relative z-10 font-bold tracking-tight">{dim.shortName}</span>
              </button>
            );
          })}
        </div>

        {/* Autoplay Slider Toggle Button */}
        <button
          onClick={() => {
            audioEngine.playClick();
            setIsAutoPlay(!isAutoPlay);
          }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono border transition-all ${
            isAutoPlay
              ? 'bg-amber-400/20 text-amber-300 border-amber-400/40 shadow-lg shadow-amber-950/40 animate-pulse'
              : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
          }`}
          title="Toggle Auto Hero Slider Mode"
        >
          {isAutoPlay ? <Pause size={13} /> : <Play size={13} />}
          <span>{isAutoPlay ? 'AUTO ROTATE ON' : 'AUTO PLAY'}</span>
        </button>
      </div>

      {/* 3D PORTAL HERO STAGE WITH 3D Z-DEPTH TRANSITIONS */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#0A2540]/90 via-[#060D1F]/95 to-[#0A2540]/90 border border-cyan-500/40 p-6 sm:p-12 shadow-2xl overflow-hidden backdrop-blur-2xl [transform-style:preserve-3d]">
        
        {/* Dynamic Background Glow Pulser */}
        <div
          className="absolute inset-0 opacity-30 blur-3xl pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${currentDim.ringColor}, transparent 70%)`,
          }}
        />

        {/* Top Progress Line (Hero Slider Revolution Style) */}
        {isAutoPlay && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 overflow-hidden">
            <div
              style={{ width: `${autoProgress}%`, backgroundColor: currentDim.ringColor }}
              className="h-full transition-all duration-75 shadow-[0_0_10px_currentColor]"
            />
          </div>
        )}

        {/* Left / Right 3D Warp Chevron Triggers */}
        <button
          onClick={handlePrev}
          onMouseEnter={() => audioEngine.playHover()}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-950/70 border border-cyan-500/30 text-cyan-300 hover:text-white hover:bg-cyan-500/20 hover:scale-110 active:scale-95 transition-all shadow-xl backdrop-blur-md cursor-pointer"
          title="Previous Dimension (ArrowLeft)"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={handleNext}
          onMouseEnter={() => audioEngine.playHover()}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-950/70 border border-cyan-500/30 text-cyan-300 hover:text-white hover:bg-cyan-500/20 hover:scale-110 active:scale-95 transition-all shadow-xl backdrop-blur-md cursor-pointer"
          title="Next Dimension (ArrowRight)"
        >
          <ChevronRight size={20} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 px-4 sm:px-8">
          
          {/* Left: 3D Interactive WebGL Stargate Canvas with Z-Depth Rig */}
          <div className="lg:col-span-6 h-[400px] sm:h-[480px] w-full relative flex items-center justify-center [transform-style:preserve-3d]">
            <Canvas camera={{ position: [0, 0, 5.2], fov: 45 }}>
              <ambientLight intensity={0.9} />
              <directionalLight position={[5, 6, 5]} intensity={2.8} color={currentDim.ringColor} />
              <directionalLight position={[-5, -6, -5]} intensity={1.6} color="#FFFFFF" />
              <pointLight position={[0, 0, 2]} intensity={2.5} color={currentDim.ringColor} />
              
              <WarpCameraRig warpTrigger={warpTrigger} />
              <DimensionalPortalMesh dimension={currentDim} warpTrigger={warpTrigger} />
              <PortalHyperdriveVortex ringColor={currentDim.ringColor} warpTrigger={warpTrigger} />
            </Canvas>

            {/* Floating Live Telemetry Badge HUD */}
            <div className="absolute bottom-3 left-3 px-3.5 py-1.5 rounded-full bg-slate-950/85 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 backdrop-blur-md flex items-center gap-2 shadow-xl pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Z-DEPTH HYPERDRIVE // ACTIVE</span>
            </div>
          </div>

          {/* Right: Dimension HUD Telemetry Panel with True 3D Z-Depth Slide Transition */}
          <div className="lg:col-span-6 [perspective:1000px] [transform-style:preserve-3d]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentDim.id}
                custom={direction}
                variants={portalCardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 26,
                  mass: 0.9
                }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2">
                  <span className="px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold shadow-md">
                    ✦ {currentDim.shortName}
                  </span>
                  <span className="text-xs font-mono text-cyan-300 font-bold">
                    {currentDim.category}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
                  {currentDim.name}
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                  {currentDim.tagline}
                </p>

                {/* Real-time Diagnostics Grid */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {currentDim.stats.map((st, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -3, scale: 1.03 }}
                      className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-lg hover:border-cyan-500/40 transition-colors"
                    >
                      <span className="text-[10px] font-mono text-slate-400 block mb-1 font-semibold">{st.label}</span>
                      <span className="text-xs sm:text-sm font-bold text-cyan-300 font-mono">{st.val}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Commission CTA */}
                <div className="pt-4 flex flex-wrap gap-4 items-center">
                  <GoldBarButton
                    variant="solid-ingot"
                    size="md"
                    hallmark="24K"
                    onClick={() => {
                      audioEngine.playSwoosh();
                      navigate(currentDim.route);
                    }}
                    icon={<ArrowRight className="w-4 h-4 text-slate-950" />}
                    iconPosition="right"
                  >
                    Enter Portal Nexus
                  </GoldBarButton>

                  <button
                    onClick={() => {
                      audioEngine.playClick();
                      navigate('/contact');
                    }}
                    className="text-xs font-mono text-slate-400 hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1 group"
                  >
                    <span>Request Dimension Consultation</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
