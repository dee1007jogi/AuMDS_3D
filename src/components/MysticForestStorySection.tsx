import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  TreePine, 
  ArrowRight, 
  Compass, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  Layers, 
  Lightbulb, 
  ChevronRight, 
  Volume2, 
  VolumeX,
  Play,
  Pause
} from 'lucide-react';
import { audioEngine } from './AudioEngine';
import { useNavigate } from 'react-router-dom';
import { RockGoldText } from './RockGoldText';
import { GoldBarButton } from './GoldBarButton';

// ============================================================================
// 1. STORY CHAPTER DEFINITIONS (AuMDS Forest Exploration Chronicle)
// ============================================================================
export interface StoryChapter {
  id: string;
  step: string;
  badge: string;
  title: string;
  subtitle: string;
  narrative: string;
  metrics: { label: string; value: string }[];
  tagline: string;
  route: string;
  ctaText: string;
  color: string;
  cameraZ: number;
  cameraX: number;
  cameraY: number;
  lookAt: [number, number, number];
}

const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'chapter-01',
    step: '01',
    badge: 'STAGE I // THE ANCIENT FOREST GATE',
    title: 'Integrated Software & Deep-Tech Genesis',
    subtitle: 'From the first spark of raw algorithmic ideation to resilient cloud backbones.',
    narrative: 'Deep within the ancient digital woodland, innovative concepts take root. We architect high-throughput cloud microservices, native mobile applications, 3D WebXR platforms, and AI-native automation pipelines engineered for enterprise scale.',
    metrics: [
      { label: 'THROUGHPUT', value: '> 10k RPS' },
      { label: 'LATENCY', value: '12ms P99' },
      { label: 'STACK', value: 'Next.js / Cloud' },
    ],
    tagline: 'Laying the indestructible digital foundation for high-growth ventures.',
    route: '/services',
    ctaText: 'Explore Software Core',
    color: '#34D399', // Mint Jade
    cameraZ: 7.5,
    cameraX: 0,
    cameraY: 2.2,
    lookAt: [0, 2.6, -10],
  },
  {
    id: 'chapter-02',
    step: '02',
    badge: 'STAGE II // THE BIOLUMINESCENT GROVE',
    title: 'Holistic Branding & Spatial 3D Media',
    subtitle: 'Illuminating iconic corporate identities that breathe, move, and captivate.',
    narrative: 'Like glowing mushrooms and luminous flora blooming beneath ancient boughs, we craft living brand design systems, 3D kinetic tokens, commercial video production, and high-conversion omni-channel narratives.',
    metrics: [
      { label: 'ENGAGEMENT', value: '+65% Uplift' },
      { label: 'DESIGN CORE', value: '24K Polish' },
      { label: 'VELOCITY', value: '14-Day Sprint' },
    ],
    tagline: 'Co-creating iconic visual worlds with lasting emotional authority.',
    route: '/services',
    ctaText: 'View Brand Universe',
    color: '#F59E0B', // Amber Gold
    cameraZ: -2.5,
    cameraX: -1.8,
    cameraY: 2.6,
    lookAt: [-0.4, 2.3, -15],
  },
  {
    id: 'chapter-03',
    step: '03',
    badge: 'STAGE III // THE STONE RUINS & ARCHED BRIDGE',
    title: 'Holistic Corporate Solutions & Automation',
    subtitle: 'Building enduring operational blueprints, standard operating procedures, and BPO workflows.',
    narrative: 'Like monumental stone arches that endure across centuries, we engineer robust business models, standard operating procedures (SOPs), department diagnostic audits, and enterprise automation to streamline organizational growth.',
    metrics: [
      { label: 'AUTOMATION', value: 'Full SOP Suite' },
      { label: 'EFFICIENCY', value: '40% Boost' },
      { label: 'DIAGNOSTICS', value: 'Full Audit' },
    ],
    tagline: 'Transforming operational complexity into streamlined, automated execution.',
    route: '/services',
    ctaText: 'Inspect Solutions',
    color: '#10B981', // Emerald
    cameraZ: -12.0,
    cameraX: 1.6,
    cameraY: 2.4,
    lookAt: [0, 2.2, -22],
  },
  {
    id: 'chapter-04',
    step: '04',
    badge: 'STAGE IV // THE ANCIENT MONOLITH SANCTUARY',
    title: 'Corporate Financial & Legal Governance',
    subtitle: 'Safeguarding founder equity with bulletproof statutory compliance.',
    narrative: 'Carving permanent legal foundations into stone. We manage Private Limited company incorporation, Class 9/35/42 trademark registrations, comprehensive accounting, payroll, and continuous MCA & GST statutory compliance.',
    metrics: [
      { label: 'STATUTORY', value: '100% Compliant' },
      { label: 'FORMATION', value: '< 7 Days' },
      { label: 'IP DEFENSE', value: 'Global Registry' },
    ],
    tagline: 'Protecting intellectual property and founder equity across all jurisdictions.',
    route: '/services',
    ctaText: 'Explore Legal Matrix',
    color: '#A78BFA', // Mystic Purple
    cameraZ: -22.5,
    cameraX: -1.5,
    cameraY: 2.8,
    lookAt: [0.5, 2.4, -34],
  },
  {
    id: 'chapter-05',
    step: '05',
    badge: 'STAGE V // THE CELESTIAL CLEARING SUMMIT',
    title: 'TRIAD Talent Core & SatChai Founder Guild',
    subtitle: 'Autonomous student-developer squads and high-leverage founder summits.',
    narrative: 'Emerging onto the sunlit celestial summit. Through the TRIAD Internship Program and Skill Development Wing (SDW), elite talent squads engineer commercial products, while SatChai connects founders with angel capital and strategic dealflows.',
    metrics: [
      { label: 'ENGINEERS', value: '500+ Squads' },
      { label: 'FOUNDERS', value: '1,200+ Network' },
      { label: 'DEAL PIPELINE', value: '$25M+ Value' },
    ],
    tagline: 'Where high-conviction founders orchestrate the future of industry.',
    route: '/ecosystem',
    ctaText: 'Enter Ecosystem Guild',
    color: '#FBBF24', // Celestial 24K Gold
    cameraZ: -36.0,
    cameraX: 0,
    cameraY: 3.2,
    lookAt: [0, 2.5, -48],
  },
];

// ============================================================================
// 2. PROCEDURAL TEXTURE GENERATORS (PBR Canvas Textures)
// ============================================================================
function useProceduralTextures() {
  return useMemo(() => {
    // 1. Procedural Bark Texture
    const barkCanvas = document.createElement('canvas');
    barkCanvas.width = 512;
    barkCanvas.height = 512;
    const bCtx = barkCanvas.getContext('2d');
    if (bCtx) {
      bCtx.fillStyle = '#22281e';
      bCtx.fillRect(0, 0, 512, 512);
      bCtx.fillStyle = '#11150e';
      for (let i = 0; i < 400; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const w = Math.random() * 4 + 1;
        const h = Math.random() * 80 + 20;
        bCtx.fillRect(x, y, w, h);
      }
    }
    const barkTex = new THREE.CanvasTexture(barkCanvas);
    barkTex.wrapS = THREE.RepeatWrapping;
    barkTex.wrapT = THREE.RepeatWrapping;
    barkTex.repeat.set(2, 6);

    // 2. Procedural Weathered Stone Texture
    const stoneCanvas = document.createElement('canvas');
    stoneCanvas.width = 512;
    stoneCanvas.height = 512;
    const sCtx = stoneCanvas.getContext('2d');
    if (sCtx) {
      sCtx.fillStyle = '#505c54';
      sCtx.fillRect(0, 0, 512, 512);
      sCtx.fillStyle = '#3a443e';
      for (let i = 0; i < 600; i++) {
        sCtx.fillRect(
          Math.random() * 512,
          Math.random() * 512,
          Math.random() * 12 + 2,
          Math.random() * 12 + 2
        );
      }
    }
    const stoneTex = new THREE.CanvasTexture(stoneCanvas);
    stoneTex.wrapS = THREE.RepeatWrapping;
    stoneTex.wrapT = THREE.RepeatWrapping;
    stoneTex.repeat.set(2, 2);

    // 3. Radial Gradient Firefly/Spore Particle Texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      const gradient = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 220, 120, 1)');
      gradient.addColorStop(0.4, 'rgba(255, 140, 40, 0.6)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      pCtx.fillStyle = gradient;
      pCtx.fillRect(0, 0, 64, 64);
    }
    const particleTex = new THREE.CanvasTexture(pCanvas);

    return { barkTex, stoneTex, particleTex };
  }, []);
}

// ============================================================================
// 3. THREE.JS 3D SCENE ASSETS & PBR ENVIRONMENT
// ============================================================================

// A. Terrain & Winding Forest Path
function ForestTerrain() {
  const terrainGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(45, 90, 64, 64);
    const posAttr = geo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vy = posAttr.getY(i);
      const distFromCenter = Math.abs(vx);
      let heightOffset = Math.sin(vy * 0.1) * 0.8 + Math.cos(vx * 0.15) * 0.6;
      if (distFromCenter < 2.8) {
        heightOffset -= (2.8 - distFromCenter) * 0.35; // Path depression
      } else {
        heightOffset += (distFromCenter - 2.8) * 0.38; // Side banks
      }
      posAttr.setZ(i, heightOffset);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh
      geometry={terrainGeo}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, -20]}
      receiveShadow
    >
      <meshStandardMaterial
        color="#223d20"
        roughness={0.92}
        metalness={0.05}
        flatShading
      />
    </mesh>
  );
}

// B. Detailed Ancient Tree with Twisted Branch & Canopy Spheres
function DetailedTree({
  position,
  scaleY = 1.2,
  leanAngle = 0,
  barkTex,
}: {
  position: [number, number, number];
  scaleY?: number;
  leanAngle?: number;
  barkTex: THREE.Texture;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const foliageRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (foliageRef.current) {
      foliageRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.7 + position[0]) * 0.03;
      foliageRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.5 + position[2]) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={[0, 0, leanAngle]} scale={[1, scaleY, 1]}>
      {/* Trunk */}
      <mesh position={[0, 5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.75, 1.7, 10, 8]} />
        <meshStandardMaterial
          color="#242c1f"
          roughness={0.9}
          metalness={0.0}
          map={barkTex}
          bumpMap={barkTex}
          bumpScale={0.06}
        />
      </mesh>

      {/* Twisted Branch */}
      <mesh position={[1.2, 8, 0]} rotation={[0, 0, -Math.PI / 3]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.65, 6, 6]} />
        <meshStandardMaterial
          color="#242c1f"
          roughness={0.9}
          map={barkTex}
          bumpMap={barkTex}
          bumpScale={0.06}
        />
      </mesh>

      {/* Canopy Clusters */}
      <group ref={foliageRef}>
        {[
          { pos: [0, 9.5, 0], r: 2.8, col: '#1a3318' },
          { pos: [1.8, 10.8, 1.2], r: 2.2, col: '#1e381b' },
          { pos: [-1.6, 11.2, -1.0], r: 2.4, col: '#162e15' },
          { pos: [0.8, 12.5, -0.6], r: 2.0, col: '#234420' },
          { pos: [-0.6, 13.6, 0.8], r: 1.7, col: '#2a5226' },
        ].map((c, i) => (
          <mesh key={i} position={c.pos as [number, number, number]} castShadow>
            <sphereGeometry args={[c.r, 6, 6]} />
            <meshStandardMaterial
              color={c.col}
              roughness={0.85}
              flatShading
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// C. Ancient Stone Ruins & Arched Bridge
function StoneRuins({ stoneTex, position }: { stoneTex: THREE.Texture; position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Left Pillar */}
      <mesh position={[-2.4, 3.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 7, 1.4]} />
        <meshStandardMaterial
          color="#546258"
          roughness={0.8}
          metalness={0.1}
          map={stoneTex}
          bumpMap={stoneTex}
          bumpScale={0.08}
        />
      </mesh>

      {/* Left Cap */}
      <mesh position={[-2.4, 7.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 0.8, 2.0]} />
        <meshStandardMaterial color="#546258" roughness={0.8} map={stoneTex} />
      </mesh>

      {/* Right Pillar */}
      <mesh position={[2.4, 3.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 7, 1.4]} />
        <meshStandardMaterial
          color="#546258"
          roughness={0.8}
          metalness={0.1}
          map={stoneTex}
          bumpMap={stoneTex}
          bumpScale={0.08}
        />
      </mesh>

      {/* Right Cap */}
      <mesh position={[2.4, 7.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 0.8, 2.0]} />
        <meshStandardMaterial color="#546258" roughness={0.8} map={stoneTex} />
      </mesh>

      {/* Arched Stone Bridge */}
      <mesh position={[0, 1.8, 0]} rotation={[0, 0, Math.PI / 2]} scale={[1, 1.8, 1]} castShadow receiveShadow>
        <cylinderGeometry args={[2.4, 2.4, 1.2, 16, 1, true, 0, Math.PI]} />
        <meshStandardMaterial
          color="#546258"
          roughness={0.8}
          metalness={0.1}
          map={stoneTex}
          bumpMap={stoneTex}
          bumpScale={0.08}
        />
      </mesh>

      {/* Floating 24K Gold Ingot Artifact on Ruin Crest */}
      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={0.6}>
        <mesh position={[0, 5.2, 0]} rotation={[0.4, 0.8, 0.2]}>
          <boxGeometry args={[1.0, 0.45, 0.5]} />
          <meshPhysicalMaterial
            color={0xF5B722}
            metalness={1.0}
            roughness={0.14}
            clearcoat={0.65}
            emissive={0xF5B722}
            emissiveIntensity={0.35}
          />
        </mesh>
      </Float>
    </group>
  );
}

// D. Glowing Bioluminescent Orange/Gold Mushrooms
function GlowingMushroomsGroup() {
  const mushroomsData = useMemo(() => {
    const list = [];
    for (let i = 0; i < 45; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 2.2 + Math.random() * 10;
      const mx = Math.cos(angle) * dist;
      const mz = 4 - Math.sin(angle) * dist * 3.5; // Spread from +4 to -45

      const clusters = [];
      const count = Math.floor(Math.random() * 3) + 2;
      for (let j = 0; j < count; j++) {
        const ox = (Math.random() - 0.5) * 0.4;
        const oz = (Math.random() - 0.5) * 0.4;
        const scale = 0.4 + Math.random() * 0.6;
        clusters.push({ ox, oz, scale });
      }

      list.push({ mx, mz, clusters, hasLight: Math.random() < 0.25 });
    }
    return list;
  }, []);

  return (
    <group>
      {mushroomsData.map((m, i) => (
        <group key={i} position={[m.mx, 0, m.mz]}>
          {m.clusters.map((c, j) => (
            <group key={j} position={[c.ox, 0, c.oz]}>
              {/* Stem */}
              <mesh position={[0, 0.2 * c.scale, 0]}>
                <cylinderGeometry args={[0.04 * c.scale, 0.06 * c.scale, 0.4 * c.scale, 5]} />
                <meshStandardMaterial color="#dde6d1" roughness={0.8} />
              </mesh>
              {/* Cap */}
              <mesh position={[0, 0.38 * c.scale, 0]}>
                <sphereGeometry args={[0.18 * c.scale, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
                <meshStandardMaterial
                  color="#ff6a00"
                  emissive="#ff7b25"
                  emissiveIntensity={2.5}
                  roughness={0.4}
                />
              </mesh>
            </group>
          ))}
          {m.hasLight && (
            <pointLight position={[0, 0.4, 0]} color="#ff7b25" intensity={0.6} distance={3.0} />
          )}
        </group>
      ))}
    </group>
  );
}

// E. Floating Fireflies / Forest Spores Particle System
function FirefliesParticles({ particleTex }: { particleTex: THREE.Texture }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions } = useMemo(() => {
    const count = 250;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = Math.random() * 8 + 0.5;
      pos[i * 3 + 2] = 10 - Math.random() * 65;
    }
    return { positions: pos };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const pos = geo.attributes.position.array as Float32Array;

    for (let i = 0; i < pos.length / 3; i++) {
      pos[i * 3 + 1] += Math.sin(state.clock.elapsedTime * 1.2 + i) * 0.005;
      pos[i * 3 + 0] += Math.cos(state.clock.elapsedTime * 0.8 + i) * 0.003;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={0xffaa44}
        size={0.4}
        map={particleTex}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// F. Scroll-Driven Camera Rig with Continuous Spline Trajectory
function ForestPBRCameraRig({
  activeChapterIdx,
  scrollYProgress,
}: {
  activeChapterIdx: number;
  scrollYProgress: any;
}) {
  const { camera } = useThree();

  useFrame((state) => {
    // Continuous Scroll-Driven 3D Camera Trajectory (Waypoints Interpolation)
    const p = scrollYProgress ? scrollYProgress.get() : activeChapterIdx / (STORY_CHAPTERS.length - 1);
    const maxChapter = STORY_CHAPTERS.length - 1;
    const rawIndex = Math.min(maxChapter, Math.max(0, p * maxChapter));
    const i0 = Math.floor(rawIndex);
    const i1 = Math.min(maxChapter, i0 + 1);
    const alpha = rawIndex - i0;

    const c0 = STORY_CHAPTERS[i0];
    const c1 = STORY_CHAPTERS[i1];

    const interpX = THREE.MathUtils.lerp(c0.cameraX, c1.cameraX, alpha);
    const interpY = THREE.MathUtils.lerp(c0.cameraY, c1.cameraY, alpha);
    const interpZ = THREE.MathUtils.lerp(c0.cameraZ, c1.cameraZ, alpha);

    const lookX = THREE.MathUtils.lerp(c0.lookAt[0], c1.lookAt[0], alpha);
    const lookY = THREE.MathUtils.lerp(c0.lookAt[1], c1.lookAt[1], alpha);
    const lookZ = THREE.MathUtils.lerp(c0.lookAt[2], c1.lookAt[2], alpha);

    // Subtle pointer parallax displacement
    const mouseX = state.pointer.x * 0.5;
    const mouseY = state.pointer.y * 0.35;

    const targetX = interpX + mouseX;
    const targetY = interpY + mouseY;
    const targetZ = interpZ;

    camera.position.x += (targetX - camera.position.x) * 0.07;
    camera.position.y += (targetY - camera.position.y) * 0.07;
    camera.position.z += (targetZ - camera.position.z) * 0.07;

    const lookTarget = new THREE.Vector3(
      lookX + mouseX * 0.3,
      lookY + mouseY * 0.25,
      lookZ
    );

    camera.lookAt(lookTarget);
  });

  return null;
}

// ============================================================================
// 4. MAIN COMPONENT: 3D MYSTIC GREEN FOREST STORYTELLING SECTION
// ============================================================================
export const MysticForestStorySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeChapterIdx, setActiveChapterIdx] = useState<number>(0);
  const [isAutoTour, setIsAutoTour] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const navigate = useNavigate();

  const textures = useProceduralTextures();

  // Track scroll through the full pinned container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Convert scroll progress (0 to 1) to active storytelling chapter (0 to 4)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (!isAutoTour) {
      const stageFraction = latest * STORY_CHAPTERS.length;
      const idx = Math.min(
        STORY_CHAPTERS.length - 1,
        Math.floor(stageFraction)
      );
      if (idx !== activeChapterIdx) {
        setActiveChapterIdx(idx);
        audioEngine.playHover();
      }
    }
  });

  // Auto-Tour interval timer (if user clicks Play Auto-Tour)
  useEffect(() => {
    if (!isAutoTour) return;
    const interval = setInterval(() => {
      setActiveChapterIdx((prev) => {
        const next = (prev + 1) % STORY_CHAPTERS.length;
        audioEngine.playSwoosh();
        return next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoTour]);

  const currentChapter = STORY_CHAPTERS[activeChapterIdx];

  const handleSelectChapter = (idx: number) => {
    audioEngine.playClick();
    setIsAutoTour(false);
    setActiveChapterIdx(idx);
  };

  const toggleSound = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
    if (!muted) audioEngine.playClick();
  };

  return (
    <div ref={containerRef} className="relative w-full h-[550vh] bg-[#0b140f] text-white font-sans m-0 p-0 overflow-clip">
      
      {/* Pinned Sticky 3D WebGL Canvas & Storyteller HUD */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between p-4 sm:p-8 select-none">
        
        {/* ================================================================= */}
        {/* 1. THREE.JS 3D CANVAS: ENCHANTED FOREST RUINS PBR SCENE           */}
        {/* ================================================================= */}
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <Canvas
            camera={{ position: [0, 2.2, 8.5], fov: 60 }}
            gl={{ antialias: true, powerPreference: 'high-performance' }}
            onCreated={({ scene, gl }) => {
              scene.background = new THREE.Color(0x1a2e22);
              scene.fog = new THREE.FogExp2(0x1a2e22, 0.038);
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = 1.2;
              gl.shadowMap.enabled = true;
              gl.shadowMap.type = THREE.PCFSoftShadowMap;
            }}
          >
            {/* Lighting Hierarchy */}
            <ambientLight intensity={1.3} color="#183324" />
            <directionalLight
              position={[0, 20, -35]}
              intensity={3.2}
              color="#fff3d1"
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-bias={-0.0001}
            />
            {/* Golden Rim / Backlight */}
            <pointLight position={[0, 8, -16]} color="#ffb74d" intensity={4.0} distance={30} />
            <pointLight position={[0, 3, currentChapter.cameraZ - 4]} color={currentChapter.color} intensity={2.5} distance={20} />

            {/* Camera Physics Rig & Continuous Spline Glide */}
            <ForestPBRCameraRig activeChapterIdx={activeChapterIdx} scrollYProgress={scrollYProgress} />

            {/* Terrain & Central Trail */}
            <ForestTerrain />

            {/* Glowing Bioluminescent Orange/Gold Mushrooms */}
            <GlowingMushroomsGroup />

            {/* Floating Fireflies / Spores Particles */}
            <FirefliesParticles particleTex={textures.particleTex} />

            {/* Framing & Path Trees */}
            <DetailedTree position={[-5.5, 0, 4]} scaleY={1.2} leanAngle={-0.12} barkTex={textures.barkTex} />
            <DetailedTree position={[6.0, 0, 2]} scaleY={1.4} leanAngle={0.15} barkTex={textures.barkTex} />
            <DetailedTree position={[-5.5, 0, -4]} scaleY={1.2} leanAngle={-0.12} barkTex={textures.barkTex} />
            <DetailedTree position={[6.0, 0, -3.5]} scaleY={1.4} leanAngle={0.15} barkTex={textures.barkTex} />
            <DetailedTree position={[-7.5, 0, -11]} scaleY={1.5} leanAngle={-0.08} barkTex={textures.barkTex} />
            <DetailedTree position={[8.0, 0, -10]} scaleY={1.3} leanAngle={0.1} barkTex={textures.barkTex} />
            <DetailedTree position={[-6.5, 0, -22]} scaleY={1.35} leanAngle={-0.1} barkTex={textures.barkTex} />
            <DetailedTree position={[7.0, 0, -24]} scaleY={1.4} leanAngle={0.12} barkTex={textures.barkTex} />
            <DetailedTree position={[-6.0, 0, -38]} scaleY={1.5} leanAngle={-0.06} barkTex={textures.barkTex} />
            <DetailedTree position={[6.5, 0, -40]} scaleY={1.45} leanAngle={0.08} barkTex={textures.barkTex} />

            {/* Ancient Stone Ruins & Arched Bridge */}
            <StoneRuins stoneTex={textures.stoneTex} position={[0, 0, -15]} />
            <StoneRuins stoneTex={textures.stoneTex} position={[0, 0, -30]} />
          </Canvas>
        </div>

        {/* ================================================================= */}
        {/* 2. TOP HUD: CHAPTER PROGRESS & CONTROLS                          */}
        {/* ================================================================= */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between gap-4 pt-14 sm:pt-16 pointer-events-none">
          
          {/* Eyebrow Navigation Badge */}
          <div className="pointer-events-auto flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#0b140f]/90 border border-emerald-400/35 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(16,185,129,0.2)]">
            <TreePine className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-300 uppercase">
              ✦ 3D ENCHANTED FOREST CHRONICLE
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-200">
              STAGE {activeChapterIdx + 1}/5
            </span>
          </div>

          {/* Quick HUD Controls: Audio & Auto-Tour Toggle */}
          <div className="pointer-events-auto flex items-center gap-2">
            <button
              onClick={toggleSound}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0b140f]/85 border border-white/10 hover:border-emerald-400/40 text-slate-300 hover:text-emerald-300 transition-all text-xs font-mono cursor-pointer backdrop-blur-xl"
              title="Toggle Forest Ambient Audio"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
              <span className="hidden sm:inline">{isMuted ? 'MUTED' : 'AUDIO'}</span>
            </button>

            <button
              onClick={() => {
                audioEngine.playClick();
                setIsAutoTour(!isAutoTour);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer backdrop-blur-xl border ${
                isAutoTour
                  ? 'bg-emerald-500/25 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.4)] animate-pulse'
                  : 'bg-[#0b140f]/85 border-white/10 text-slate-300 hover:text-white'
              }`}
            >
              {isAutoTour ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isAutoTour ? 'AUTO GLIDE ON' : 'AUTO GLIDE'}</span>
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. CENTER STORY CARD: DYNAMIC SCROLL CHAPTER OVERLAY              */}
        {/* ================================================================= */}
        <div className="relative z-10 w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-none">
          
          {/* Main Story Narrative Capsule */}
          <div className="lg:col-span-7 xl:col-span-6 pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentChapter.id}
                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 30, scale: 0.95 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 sm:p-8 rounded-3xl bg-[#0b140f]/94 border border-emerald-400/35 backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(16,185,129,0.25),inset_0_1px_1px_rgba(255,255,255,0.15)] flex flex-col gap-4 relative overflow-hidden"
              >
                {/* Top Specular Glow Ray */}
                <div 
                  className="absolute top-0 inset-x-8 h-[1.5px] pointer-events-none transition-colors duration-500"
                  style={{ background: `linear-gradient(to right, transparent, ${currentChapter.color}, transparent)` }}
                />

                {/* Chapter Badge */}
                <div className="flex items-center gap-2">
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono font-extrabold uppercase tracking-wider bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 shadow-sm">
                    {currentChapter.badge}
                  </span>
                  <span className="text-[10px] font-mono text-amber-400 font-semibold tracking-wider uppercase">
                    • 3D EXPLORATION
                  </span>
                </div>

                {/* Heading with 24K Gold & Emerald Flare */}
                <RockGoldText
                  as="h3"
                  className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-display tracking-tight leading-tight"
                >
                  {currentChapter.title}
                </RockGoldText>

                {/* Narrative Subtitle & Deep Description */}
                <p className="text-emerald-300 text-xs sm:text-sm font-mono font-semibold">
                  {currentChapter.subtitle}
                </p>
                
                <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
                  {currentChapter.narrative}
                </p>

                {/* Real-Time Capability Metrics */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
                  {currentChapter.metrics.map((m, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -2, scale: 1.03 }}
                      className="p-3 rounded-2xl bg-[#051109]/90 border border-emerald-500/20 shadow-md text-center"
                    >
                      <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 block mb-0.5 font-semibold uppercase">
                        {m.label}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-emerald-300 font-mono">
                        {m.value}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Story Action Cluster */}
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <GoldBarButton
                    variant="solid-ingot"
                    size="sm"
                    hallmark="24K"
                    onClick={() => {
                      audioEngine.playSwoosh();
                      navigate(currentChapter.route);
                    }}
                    icon={<ArrowRight className="w-3.5 h-3.5 text-slate-950" />}
                    iconPosition="right"
                  >
                    {currentChapter.ctaText}
                  </GoldBarButton>

                  <button
                    onClick={() => {
                      audioEngine.playClick();
                      navigate('/contact');
                    }}
                    className="text-xs font-mono text-slate-400 hover:text-emerald-300 transition-colors flex items-center gap-1 group cursor-pointer"
                  >
                    <span>Request Forest Exploration Plan</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Floating Compass Telemetry (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-6 justify-end pointer-events-none">
            <div className="p-5 rounded-3xl bg-[#0b140f]/80 border border-emerald-400/20 backdrop-blur-2xl shadow-xl flex flex-col gap-3 max-w-xs text-right">
              <div className="flex items-center justify-end gap-2 text-emerald-400">
                <span className="text-[10px] font-mono uppercase tracking-widest font-bold">
                  CANOPY Z-COORDINATE
                </span>
                <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '12s' }} />
              </div>
              <div className="text-2xl font-mono font-bold text-emerald-300">
                {currentChapter.cameraZ.toFixed(1)}u DEPTH
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Scroll down to glide deeper through the enchanted ruins and explore all 5 stages of the AuMDS universe.
              </p>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 4. BOTTOM HUD: INTERACTIVE 5-CHAPTER SELECTOR RAIL                */}
        {/* ================================================================= */}
        <div className="relative z-10 w-full max-w-5xl mx-auto pb-4 sm:pb-6 pointer-events-auto">
          <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-[#0b140f]/90 border border-emerald-400/25 backdrop-blur-2xl shadow-2xl">
            {STORY_CHAPTERS.map((chap, idx) => {
              const isActive = activeChapterIdx === idx;
              return (
                <button
                  key={chap.id}
                  onClick={() => handleSelectChapter(idx)}
                  onMouseEnter={() => audioEngine.playHover()}
                  className={`relative px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? 'text-slate-950 font-extrabold shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {/* Active Highlight Capsule */}
                  {isActive && (
                    <motion.div
                      layoutId="activeForestChapterTab"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 shadow-[0_0_20px_rgba(16,185,129,0.6)]"
                      transition={{ type: 'spring', stiffness: 450, damping: 28 }}
                    />
                  )}
                  
                  <span className="relative z-10 font-bold">{chap.step}.</span>
                  <span className="relative z-10 whitespace-nowrap">{chap.title.split('&')[0].trim()}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
