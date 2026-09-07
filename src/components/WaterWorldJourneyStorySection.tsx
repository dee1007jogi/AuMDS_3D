import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Compass, 
  ArrowRight, 
  Lightbulb, 
  FileCheck, 
  Palette, 
  Network, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Anchor, 
  Waves, 
  Wind, 
  CheckCircle2, 
  ChevronRight,
  ShieldAlert,
  Ship
} from 'lucide-react';
import { audioEngine } from './AudioEngine';
import { useNavigate } from 'react-router-dom';
import { RockGoldText } from './RockGoldText';
import { GoldBarButton } from './GoldBarButton';

// ============================================================================
// 1. BUSINESS JOURNEY VOYAGE STAGES (5-Stage Lifecycle Continuum)
// ============================================================================
export interface VoyageStage {
  step: string;
  badge: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  narrative: string;
  deliverables: string[];
  metrics: string;
  telemetry: {
    windSpeed: string;
    waveHeight: string;
    hullStatus: string;
    compassHeading: string;
  };
  ctaText: string;
  route: string;
  accentColor: string;
  cameraPos: [number, number, number];
  lookAt: [number, number, number];
}

const VOYAGE_STAGES: VoyageStage[] = [
  {
    step: '01',
    badge: 'STAGE 01 // DISCOVERY & FEASIBILITY',
    title: 'Idea Genesis & Market Navigation',
    subtitle: 'From the first raw concept to rigorous market telemetry and unit economics.',
    icon: Lightbulb,
    narrative: 'Setting sail into uncharted waters. We transform raw entrepreneurial inspiration into validated financial models, TAM/SAM market penetration matrices, core technical architecture blueprints, and rapid MVP specifications.',
    deliverables: [
      'TAM / SAM Market Telemetry',
      'Tech Architecture Blueprint',
      'Unit Economic & Cash Flow Models',
      'MVP Scope & Agile Sprints',
    ],
    metrics: '2-3 Weeks Velocity',
    telemetry: {
      windSpeed: '24 Knots NNE',
      waveHeight: '2.8m Swell',
      hullStatus: 'Keel Stabilized',
      compassHeading: '042° NORTHEAST',
    },
    ctaText: 'Explore Idea Genesis',
    route: '/services',
    accentColor: '#F59E0B', // Amber Gold
    cameraPos: [16, 4.5, 38],
    lookAt: [-1, 8.5, 0],
  },
  {
    step: '02',
    badge: 'STAGE 02 // INSTITUTIONAL REINFORCEMENT',
    title: 'Incorporation, IP & Statutory Fortification',
    subtitle: 'Laying impenetrable legal foundations and safeguarding founder equity.',
    icon: FileCheck,
    narrative: 'Navigating turbulent regulatory straits with structural certainty. Full Private Limited company incorporation, Class 9/35/42 trademark registrations, founder vesting deeds, and complete MCA/GST statutory compliance.',
    deliverables: [
      'Pvt Ltd / Entity Incorporation',
      'Class 9, 35, 42 Trademark Filings',
      'Founder Vesting & SHA Structuring',
      'GST & Statutory Clearance',
    ],
    metrics: '100% Compliant Setup',
    telemetry: {
      windSpeed: '32 Knots Storm Gale',
      waveHeight: '4.2m Heavy Sea',
      hullStatus: 'Armor Reinforced',
      compassHeading: '085° DUE EAST',
    },
    ctaText: 'Inspect Legal Matrix',
    route: '/services',
    accentColor: '#06B6D4', // Cyan
    cameraPos: [11, 6.0, 14],
    lookAt: [0, 7.0, -2],
  },
  {
    step: '03',
    badge: 'STAGE 03 // FULL SAILS & SPATIAL POLISH',
    title: 'Brand Engineering & Spatial 3D Systems',
    subtitle: 'Unfurling high-conversion 3D portals, kinetic tokens, and emotional authority.',
    icon: Palette,
    narrative: 'Catching full wind in our sails. Constructing cohesive multi-dimensional brand identities, interactive WebXR web portals, commercial 3D assets, and high-conversion investor pitch collateral that captivate markets.',
    deliverables: [
      'Unified 24K Design Tokens',
      'Next.js 3D WebXR Platforms',
      'Investor Pitch Deck Systems',
      'Multi-Channel Motion Assets',
    ],
    metrics: 'Top 1% Visual Polish',
    telemetry: {
      windSpeed: '28 Knots Steady Trade',
      waveHeight: '3.1m Cresting',
      hullStatus: 'Full Sails Billowing',
      compassHeading: '110° SOUTHEAST',
    },
    ctaText: 'View Brand Universe',
    route: '/services',
    accentColor: '#EC4899', // Fuchsia / Pink
    cameraPos: [4, 13.5, 24],
    lookAt: [0, 15.5, 1],
  },
  {
    step: '04',
    badge: 'STAGE 04 // VENTURE SYNDICATE & TRADE NEXUS',
    title: 'SatChai Founder Guild & Investor Dealflow',
    subtitle: 'Uniting high-conviction founders with angel syndicates and strategic partners.',
    icon: Network,
    narrative: 'Rendezvous at the global trade nexus. Plugging directly into the curated SatChai Founder Network for recurring venture summits, direct angel investor introductions, pilot co-creations, and institutional dealflows.',
    deliverables: [
      'SatChai Founder Guild Access',
      'Direct Investor Pitch Syndicate',
      'Enterprise Client Intros',
      'Co-Creation Pilot Programs',
    ],
    metrics: 'Direct Dealflow Access',
    telemetry: {
      windSpeed: '19 Knots Favorable',
      waveHeight: '2.0m Moderate',
      hullStatus: 'Fleet Rendezvous',
      compassHeading: '175° DUE SOUTH',
    },
    ctaText: 'Enter SatChai Guild',
    route: '/ecosystem',
    accentColor: '#10B981', // Emerald
    cameraPos: [-15, 6.5, -16],
    lookAt: [0, 7.5, -4],
  },
  {
    step: '05',
    badge: 'STAGE 05 // EXPONENTIAL SCALE & INFINITE HORIZON',
    title: 'Sustain & Scale: TRIAD Talent & Enterprise SRE',
    subtitle: 'Deploying autonomous engineer cohorts and multi-cloud resilience.',
    icon: Compass,
    narrative: 'Surging toward the golden horizon under parted storm skies. Scaling operations with dedicated TRIAD student-developer squads, 24/7 SRE observability, high-concurrency cloud backbones, and Series A/B growth velocity.',
    deliverables: [
      'Dedicated TRIAD Dev Squads',
      '24/7 Multi-Cloud SRE Monitoring',
      'AI/ML Feature Automation',
      'Series A/B Scaling Readiness',
    ],
    metrics: 'Autonomous Velocity',
    telemetry: {
      windSpeed: '14 Knots Golden Breeze',
      waveHeight: '1.4m Calm Horizon',
      hullStatus: 'Maximum Cruising Speed',
      compassHeading: '000° TRUE NORTH',
    },
    ctaText: 'Scale With TRIAD',
    route: '/ecosystem',
    accentColor: '#8B5CF6', // Purple / Violet
    cameraPos: [0, 19.0, 44],
    lookAt: [0, 6.0, -8],
  },
];

// ============================================================================
// 2. PROCEDURAL TEXTURES (PBR Planking & Weathered Sailcloth)
// ============================================================================
function useGalleonTextures() {
  return useMemo(() => {
    // 1. Procedural Wood Planking Texture
    const cvWood = document.createElement('canvas');
    cvWood.width = 512;
    cvWood.height = 512;
    const ctxW = cvWood.getContext('2d');
    if (ctxW) {
      ctxW.fillStyle = '#1c2426';
      ctxW.fillRect(0, 0, 512, 512);

      ctxW.fillStyle = '#13191a';
      for (let y = 0; y < 512; y += 16) {
        ctxW.fillRect(0, y, 512, 2);
      }
      ctxW.fillStyle = 'rgba(0, 0, 0, 0.15)';
      for (let i = 0; i < 3000; i++) {
        const rx = Math.random() * 512;
        const ry = Math.random() * 512;
        const rw = 10 + Math.random() * 50;
        ctxW.fillRect(rx, ry, rw, 1);
      }
    }
    const woodTex = new THREE.CanvasTexture(cvWood);
    woodTex.wrapS = woodTex.wrapT = THREE.RepeatWrapping;

    // 2. Procedural Weathered Sail Texture
    const cvSail = document.createElement('canvas');
    cvSail.width = 512;
    cvSail.height = 512;
    const ctxS = cvSail.getContext('2d');
    if (ctxS) {
      ctxS.fillStyle = '#dbd6c6';
      ctxS.fillRect(0, 0, 512, 512);

      // Vertical cloth seams & grime
      ctxS.fillStyle = 'rgba(100, 90, 75, 0.18)';
      for (let x = 0; x < 512; x += 28) {
        ctxS.fillRect(x, 0, 3, 512);
      }
      // Weathering gradient
      const grad = ctxS.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0, 'rgba(40,35,25,0.25)');
      grad.addColorStop(0.5, 'rgba(0,0,0,0)');
      grad.addColorStop(1, 'rgba(30,25,15,0.3)');
      ctxS.fillStyle = grad;
      ctxS.fillRect(0, 0, 512, 512);
    }
    const sailTex = new THREE.CanvasTexture(cvSail);
    sailTex.wrapS = sailTex.wrapT = THREE.RepeatWrapping;

    return { woodTex, sailTex };
  }, []);
}

// Dynamic wave calculator function (Gerstner multi-harmonic swell)
function getWaveElevation(x: number, z: number, time: number) {
  let y = 0;
  // Primary swell
  y += Math.sin(x * 0.05 + z * 0.04 + time * 1.6) * 1.8;
  // Secondary cross swell
  y += Math.sin(-x * 0.08 + z * 0.07 + time * 2.2) * 1.1;
  // Choppy crests
  y += Math.cos(x * 0.16 + z * 0.12 - time * 2.8) * 0.55;
  return y;
}

// ============================================================================
// 3. PROCEDURAL SHIP & OCEAN THREE.JS COMPONENTS
// ============================================================================

// A. Lofted Hull Construction
function GalleonShipMesh({
  woodTex,
  sailTex,
  shipRef,
}: {
  woodTex: THREE.Texture;
  sailTex: THREE.Texture;
  shipRef: React.RefObject<THREE.Group>;
}) {
  // 1. Materials
  const materials = useMemo(() => {
    const hullMat = new THREE.MeshStandardMaterial({
      color: 0x1a2426,
      roughness: 0.75,
      metalness: 0.08,
      map: woodTex,
    });
    const deckMat = new THREE.MeshStandardMaterial({
      color: 0x2b241c,
      roughness: 0.85,
      metalness: 0.04,
    });
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xF5B722,
      roughness: 0.28,
      metalness: 0.95,
      emissive: 0xF5B722,
      emissiveIntensity: 0.2,
    });
    const woodSparMat = new THREE.MeshStandardMaterial({
      color: 0x221a14,
      roughness: 0.7,
      metalness: 0.05,
    });
    const sailMat = new THREE.MeshStandardMaterial({
      color: 0xe4decb,
      roughness: 0.9,
      metalness: 0.0,
      map: sailTex,
      side: THREE.DoubleSide,
    });
    const winMat = new THREE.MeshStandardMaterial({
      color: 0xd4e8ed,
      roughness: 0.1,
      metalness: 0.8,
      emissive: 0x7dd3fc,
      emissiveIntensity: 0.4,
    });

    return { hullMat, deckMat, goldMat, woodSparMat, sailMat, winMat };
  }, [woodTex, sailTex]);

  // 2. Parametric Lofted Hull Geometry
  const hullGeometry = useMemo(() => {
    const length = 32;
    const sections = 18;
    const ribs = [];

    for (let i = 0; i <= sections; i++) {
      const u = i / sections; // 0 (stern) to 1 (bow)
      const z = (u - 0.45) * length;
      let widthFactor = Math.sin(u * Math.PI * 0.95);
      if (u < 0.15) widthFactor = 0.5 + u * 3.0; // Stern square-taper
      const w = widthFactor * 5.2;
      const h = 5.5 + Math.pow(Math.abs(u - 0.45), 2) * 4.0; // Sheer curve
      ribs.push({ z, w, h });
    }

    const geom = new THREE.BufferGeometry();
    const vertices = [];
    const indices = [];
    const uvs = [];
    const vSegments = 8;

    for (let i = 0; i <= sections; i++) {
      const { z, w, h } = ribs[i];
      for (let j = 0; j <= vSegments; j++) {
        const v = j / vSegments; // 0 bottom/keel to 1 gunwale
        const angle = v * (Math.PI * 0.5);
        const x = Math.sin(angle) * w;
        const y = v * h - h * 0.35;

        vertices.push(x, y, z);
        uvs.push(i / sections, v);
      }
    }

    const rowStride = vSegments + 1;
    for (let i = 0; i < sections; i++) {
      for (let j = 0; j < vSegments; j++) {
        const a = i * rowStride + j;
        const b = (i + 1) * rowStride + j;
        const c = (i + 1) * rowStride + (j + 1);
        const d = i * rowStride + (j + 1);
        // Port side
        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    // Starboard side mirror
    const vertCount = vertices.length / 3;
    for (let i = 0; i < vertCount; i++) {
      vertices.push(-vertices[i * 3], vertices[i * 3 + 1], vertices[i * 3 + 2]);
      uvs.push(uvs[i * 2], uvs[i * 2 + 1]);
    }
    for (let i = 0; i < sections; i++) {
      for (let j = 0; j < vSegments; j++) {
        const a = vertCount + i * rowStride + j;
        const b = vertCount + (i + 1) * rowStride + j;
        const c = vertCount + (i + 1) * rowStride + (j + 1);
        const d = vertCount + i * rowStride + (j + 1);
        indices.push(a, d, b);
        indices.push(b, d, c);
      }
    }

    geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geom.setIndex(indices);
    geom.computeVertexNormals();

    return geom;
  }, []);

  // 3. Billowed Sail Generator
  const createBillowedSailGeom = (width: number, height: number, billowDepth: number) => {
    const geom = new THREE.PlaneGeometry(width, height, 16, 16);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const u = pos.getX(i) / width;
      const v = pos.getY(i) / height;
      const belly = Math.cos(u * Math.PI) * Math.cos(v * Math.PI);
      pos.setZ(i, belly * billowDepth);
    }
    geom.computeVertexNormals();
    return geom;
  };

  const foreSails = useMemo(
    () => [
      { geom: createBillowedSailGeom(12.0 * 0.94, 5.2, 2.2), y: 8, sailH: 5.2, billow: 2.2, yw: 12.0 },
      { geom: createBillowedSailGeom(9.8 * 0.94, 4.8, 1.8), y: 14.5, sailH: 4.8, billow: 1.8, yw: 9.8 },
      { geom: createBillowedSailGeom(7.0 * 0.94, 3.8, 1.4), y: 20.0, sailH: 3.8, billow: 1.4, yw: 7.0 },
    ],
    []
  );

  const mainSails = useMemo(
    () => [
      { geom: createBillowedSailGeom(14.5 * 0.94, 6.2, 2.8), y: 9.5, sailH: 6.2, billow: 2.8, yw: 14.5 },
      { geom: createBillowedSailGeom(11.5 * 0.94, 5.6, 2.3), y: 17.5, sailH: 5.6, billow: 2.3, yw: 11.5 },
      { geom: createBillowedSailGeom(8.5 * 0.94, 4.4, 1.7), y: 24.2, sailH: 4.4, billow: 1.7, yw: 8.5 },
    ],
    []
  );

  const mizzenSails = useMemo(
    () => [
      { geom: createBillowedSailGeom(9.5 * 0.94, 4.5, 1.6), y: 8.5, sailH: 4.5, billow: 1.6, yw: 9.5 },
      { geom: createBillowedSailGeom(7.2 * 0.94, 3.8, 1.3), y: 14.0, sailH: 3.8, billow: 1.3, yw: 7.2 },
    ],
    []
  );

  // Jib Triangular Sails
  const jib1Geom = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      0, 16, 8.5,
      0, 5, 17,
      0.6, 6, 9.5,
    ]);
    geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geom.computeVertexNormals();
    return geom;
  }, []);

  const jib2Geom = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      0, 21, 8.5,
      0, 7, 23,
      0.8, 7.5, 12,
    ]);
    geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geom.computeVertexNormals();
    return geom;
  }, []);

  return (
    <group ref={shipRef}>
      {/* 1. Lofted Hull Mesh */}
      <mesh geometry={hullGeometry} material={materials.hullMat} castShadow receiveShadow />

      {/* 2. Deck Surface */}
      <mesh position={[0, 1.6, -0.5]} rotation={[-Math.PI / 2, 0, 0]} material={materials.deckMat} receiveShadow>
        <planeGeometry args={[8.5, 30, 8, 20]} />
      </mesh>

      {/* 3. Gold Trim Gunwale Railings */}
      <mesh position={[4.4, 3.2, 0]} material={materials.goldMat}>
        <boxGeometry args={[0.3, 0.4, 30]} />
      </mesh>
      <mesh position={[-4.4, 3.2, 0]} material={materials.goldMat}>
        <boxGeometry args={[0.3, 0.4, 30]} />
      </mesh>

      {/* 4. Gunports & Cannon Barrels */}
      {[-10, -6.8, -3.6, -0.4, 2.8, 6.0, 9.2].map((zVal, idx) => (
        <group key={idx}>
          {/* Starboard */}
          <mesh position={[4.55, 1.8, zVal]} material={materials.woodSparMat}>
            <boxGeometry args={[0.5, 0.75, 0.75]} />
          </mesh>
          <mesh position={[4.95, 1.8, zVal]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.14, 1.2, 8]} />
            <meshStandardMaterial color="#1b1918" roughness={0.4} metalness={0.85} />
          </mesh>

          {/* Port */}
          <mesh position={[-4.55, 1.8, zVal]} material={materials.woodSparMat}>
            <boxGeometry args={[0.5, 0.75, 0.75]} />
          </mesh>
          <mesh position={[-4.95, 1.8, zVal]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.14, 1.2, 8]} />
            <meshStandardMaterial color="#1b1918" roughness={0.4} metalness={0.85} />
          </mesh>
        </group>
      ))}

      {/* 5. Stern Castle & Transom Windows */}
      <group position={[0, 4.5, -13]}>
        <mesh material={materials.hullMat} castShadow receiveShadow>
          <boxGeometry args={[7.2, 6, 6]} />
        </mesh>
        {/* Stern Transom Windows */}
        {[-2.4, -1.2, 0, 1.2, 2.4].map((gx, xi) =>
          [3.5, 4.8, 6.0].map((gy, yi) => (
            <mesh key={`${xi}-${yi}`} position={[gx, gy - 4.5, -3.02]} rotation={[0, Math.PI, 0]} material={materials.winMat}>
              <planeGeometry args={[0.8, 0.9]} />
            </mesh>
          ))
        )}
      </group>

      {/* 6. Bowsprit & Jibboom Spar */}
      <mesh position={[0, 4.0, 19.5]} rotation={[-Math.PI / 5.2, 0, 0]} material={materials.woodSparMat} castShadow>
        <cylinderGeometry args={[0.2, 0.4, 15, 12]} />
      </mesh>

      {/* 7. FORE MAST ASSEMBLY */}
      <group position={[0, 2.0, 8.5]}>
        <mesh position={[0, 12, 0]} material={materials.woodSparMat} castShadow>
          <cylinderGeometry args={[0.25, 0.42, 24, 14]} />
        </mesh>
        <mesh position={[0, 24 * 0.42, 0]} material={materials.woodSparMat}>
          <cylinderGeometry args={[1.4, 1.0, 0.8, 12]} />
        </mesh>
        {foreSails.map((tier, ti) => (
          <group key={ti}>
            <mesh position={[0, tier.y, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.woodSparMat} castShadow>
              <cylinderGeometry args={[0.15, 0.2, tier.yw, 10]} />
            </mesh>
            <mesh position={[0, tier.y - tier.sailH * 0.48, tier.billow * 0.6]} geometry={tier.geom} material={materials.sailMat} castShadow receiveShadow />
          </group>
        ))}
      </group>

      {/* 8. MAIN MAST ASSEMBLY */}
      <group position={[0, 2.0, -1.5]}>
        <mesh position={[0, 14.5, 0]} material={materials.woodSparMat} castShadow>
          <cylinderGeometry args={[0.29, 0.48, 29, 14]} />
        </mesh>
        <mesh position={[0, 29 * 0.42, 0]} material={materials.woodSparMat}>
          <cylinderGeometry args={[1.5, 1.1, 0.8, 12]} />
        </mesh>
        {mainSails.map((tier, ti) => (
          <group key={ti}>
            <mesh position={[0, tier.y, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.woodSparMat} castShadow>
              <cylinderGeometry args={[0.17, 0.22, tier.yw, 10]} />
            </mesh>
            <mesh position={[0, tier.y - tier.sailH * 0.48, tier.billow * 0.6]} geometry={tier.geom} material={materials.sailMat} castShadow receiveShadow />
          </group>
        ))}
      </group>

      {/* 9. MIZZEN MAST ASSEMBLY */}
      <group position={[0, 3.5, -10.5]}>
        <mesh position={[0, 10, 0]} material={materials.woodSparMat} castShadow>
          <cylinderGeometry args={[0.22, 0.36, 20, 14]} />
        </mesh>
        <mesh position={[0, 20 * 0.42, 0]} material={materials.woodSparMat}>
          <cylinderGeometry args={[1.2, 0.9, 0.7, 12]} />
        </mesh>
        {mizzenSails.map((tier, ti) => (
          <group key={ti}>
            <mesh position={[0, tier.y, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.woodSparMat} castShadow>
              <cylinderGeometry args={[0.13, 0.16, tier.yw, 10]} />
            </mesh>
            <mesh position={[0, tier.y - tier.sailH * 0.48, tier.billow * 0.6]} geometry={tier.geom} material={materials.sailMat} castShadow receiveShadow />
          </group>
        ))}
      </group>

      {/* 10. Triangular Jib Sails */}
      <mesh geometry={jib1Geom} material={materials.sailMat} castShadow />
      <mesh geometry={jib2Geom} material={materials.sailMat} castShadow />
    </group>
  );
}

// B. Dynamic Stormy Ocean Waves
function OceanMesh({ seaGeomRef }: { seaGeomRef: React.RefObject<THREE.PlaneGeometry> }) {
  return (
    <mesh receiveShadow>
      <planeGeometry ref={seaGeomRef} args={[260, 260, 120, 120]} onUpdate={(self) => self.rotateX(-Math.PI / 2)} />
      <meshStandardMaterial
        color="#091c24"
        roughness={0.16}
        metalness={0.28}
        flatShading
      />
    </mesh>
  );
}

// C. Dynamic Background Clouds & Sky
function SkyAndClouds() {
  const clouds = useMemo(() => {
    const list = [];
    for (let i = 0; i < 28; i++) {
      list.push({
        x: (Math.random() - 0.5) * 220,
        y: 15 + Math.random() * 40,
        z: -50 - Math.random() * 80,
        r: 8 + Math.random() * 14,
      });
    }
    return list;
  }, []);

  return (
    <group>
      {/* Sky Sphere */}
      <mesh>
        <sphereGeometry args={[240, 24, 16]} />
        <meshBasicMaterial color="#0a141b" side={THREE.BackSide} />
      </mesh>

      {/* Background Cloud Billows */}
      {clouds.map((c, i) => (
        <mesh key={i} position={[c.x, c.y, c.z]} scale={[1.8, 0.7, 1.2]}>
          <dodecahedronGeometry args={[c.r, 1]} />
          <meshStandardMaterial color="#1a262e" roughness={0.95} metalness={0.0} />
        </mesh>
      ))}
    </group>
  );
}

// D. Scroll-Driven Camera & Physics Controller with Continuous Spline Trajectory
function WaterWorldPhysicsRig({
  activeStageIdx,
  scrollYProgress,
  shipRef,
  seaGeomRef,
}: {
  activeStageIdx: number;
  scrollYProgress: any;
  shipRef: React.RefObject<THREE.Group>;
  seaGeomRef: React.RefObject<THREE.PlaneGeometry>;
}) {
  const { camera } = useThree();
  const baseCoordsRef = useRef<Float32Array | null>(null);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    // 1. Ocean Wave Simulation
    if (seaGeomRef.current) {
      const geo = seaGeomRef.current;
      const posAttr = geo.attributes.position;
      if (!baseCoordsRef.current) {
        baseCoordsRef.current = new Float32Array(posAttr.array);
      }
      const baseCoords = baseCoordsRef.current;

      for (let i = 0; i < posAttr.count; i++) {
        const x = baseCoords[i * 3];
        const z = baseCoords[i * 3 + 2];
        const elevation = getWaveElevation(x, z, elapsed);
        posAttr.setY(i, elevation);
      }
      posAttr.needsUpdate = true;
      geo.computeVertexNormals();
    }

    // 2. Realistic Ship Buoyancy Physics (Pitch, Roll & Heave)
    if (shipRef.current) {
      const ship = shipRef.current;
      const shipX = ship.position.x;
      const shipZ = ship.position.z;

      const currentHeight = getWaveElevation(shipX, shipZ, elapsed);
      const forwardHeight = getWaveElevation(shipX, shipZ + 6, elapsed);
      const aftHeight = getWaveElevation(shipX, shipZ - 6, elapsed);
      const portHeight = getWaveElevation(shipX + 4, shipZ, elapsed);
      const starHeight = getWaveElevation(shipX - 4, shipZ, elapsed);

      // Heave
      ship.position.y = THREE.MathUtils.lerp(ship.position.y, currentHeight - 0.4, 0.08);
      // Pitch along wave slope
      const targetPitch = Math.atan2(forwardHeight - aftHeight, 12);
      ship.rotation.x = THREE.MathUtils.lerp(ship.rotation.x, -targetPitch + 0.06, 0.06);
      // Roll heel under wave tilt
      const targetRoll = Math.atan2(portHeight - starHeight, 8);
      ship.rotation.z = THREE.MathUtils.lerp(ship.rotation.z, targetRoll - 0.09, 0.06);
      // Yaw angle pointing with momentum
      ship.rotation.y = 0.45 + Math.sin(elapsed * 0.4) * 0.03;
    }

    // 3. Continuous Scroll-Driven 3D Camera Trajectory (Waypoints Interpolation)
    const p = scrollYProgress ? scrollYProgress.get() : activeStageIdx / (VOYAGE_STAGES.length - 1);
    const maxStage = VOYAGE_STAGES.length - 1;
    const rawIndex = Math.min(maxStage, Math.max(0, p * maxStage));
    const i0 = Math.floor(rawIndex);
    const i1 = Math.min(maxStage, i0 + 1);
    const alpha = rawIndex - i0;

    const p0 = VOYAGE_STAGES[i0].cameraPos;
    const p1 = VOYAGE_STAGES[i1].cameraPos;
    const interpX = THREE.MathUtils.lerp(p0[0], p1[0], alpha);
    const interpY = THREE.MathUtils.lerp(p0[1], p1[1], alpha);
    const interpZ = THREE.MathUtils.lerp(p0[2], p1[2], alpha);

    const l0 = VOYAGE_STAGES[i0].lookAt;
    const l1 = VOYAGE_STAGES[i1].lookAt;
    const lookX = THREE.MathUtils.lerp(l0[0], l1[0], alpha);
    const lookY = THREE.MathUtils.lerp(l0[1], l1[1], alpha);
    const lookZ = THREE.MathUtils.lerp(l0[2], l1[2], alpha);

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
      lookX + mouseX * 0.2,
      lookY + mouseY * 0.15,
      lookZ
    );
    camera.lookAt(lookTarget);
  });

  return null;
}

// ============================================================================
// 4. MAIN COMPONENT: 3D WATER WORLD SCROLL-DRIVEN STORYTELLING ENGINE
// ============================================================================
export const WaterWorldJourneyStorySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shipRef = useRef<THREE.Group>(null);
  const seaGeomRef = useRef<THREE.PlaneGeometry>(null);

  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);
  const [isAutoVoyage, setIsAutoVoyage] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const navigate = useNavigate();

  const textures = useGalleonTextures();

  // Track scroll progress across pinned container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (!isAutoVoyage) {
      let idx = 0;
      if (latest < 0.20) idx = 0;
      else if (latest < 0.40) idx = 1;
      else if (latest < 0.60) idx = 2;
      else if (latest < 0.80) idx = 3;
      else idx = 4; // Stage 5 is held securely through the remainder of the scroll

      if (idx !== activeStageIdx) {
        setActiveStageIdx(idx);
        audioEngine.playHover();
      }
    }
  });

  // Autonomous Voyage Interval (if user activates Auto-Glide)
  useEffect(() => {
    if (!isAutoVoyage) return;
    const interval = setInterval(() => {
      setActiveStageIdx((prev) => {
        const next = (prev + 1) % VOYAGE_STAGES.length;
        audioEngine.playSwoosh();
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoVoyage]);

  const currentStage = VOYAGE_STAGES[activeStageIdx];
  const StageIcon = currentStage.icon;

  const handleSelectStage = (idx: number) => {
    audioEngine.playClick();
    setIsAutoVoyage(false);
    setActiveStageIdx(idx);
  };

  const toggleSound = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
    if (!muted) audioEngine.playClick();
  };

  return (
    <div ref={containerRef} className="relative w-full h-[550vh] bg-[#070d12] text-white font-sans m-0 p-0 overflow-clip">
      
      {/* Pinned Sticky Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between p-4 sm:p-8 select-none">
        
        {/* ================================================================= */}
        {/* 1. THREE.JS 3D CANVAS: GALLEON IN ROUGH SEAS                     */}
        {/* ================================================================= */}
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <Canvas
            camera={{ position: [16, 4.5, 38], fov: 42 }}
            gl={{ antialias: true, powerPreference: 'high-performance' }}
            onCreated={({ scene, gl }) => {
              scene.background = new THREE.Color(0x0e171e);
              scene.fog = new THREE.FogExp2(0x101b22, 0.011);
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = 1.15;
              gl.shadowMap.enabled = true;
              gl.shadowMap.type = THREE.PCFSoftShadowMap;
            }}
          >
            {/* Lighting Hierarchy */}
            <ambientLight intensity={0.85} color="#283b48" />

            {/* Warm Sunbeam bursting from breaking storm cloud on the right */}
            <directionalLight
              position={[45, 35, -25]}
              intensity={2.5}
              color="#ffe6c2"
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-bias={-0.0001}
            />

            {/* Deep Stormy Skylight Fill */}
            <directionalLight position={[-30, 20, 25]} intensity={1.2} color="#406a85" />

            {/* Atmospheric Accent Pointlight for active stage */}
            <pointLight position={[0, 10, 0]} color={currentStage.accentColor} intensity={1.8} distance={35} />

            {/* Physics Rig & Continuous Spline Camera Glide */}
            <WaterWorldPhysicsRig
              activeStageIdx={activeStageIdx}
              scrollYProgress={scrollYProgress}
              shipRef={shipRef}
              seaGeomRef={seaGeomRef}
            />

            {/* Galleon Procedural Ship */}
            <GalleonShipMesh
              woodTex={textures.woodTex}
              sailTex={textures.sailTex}
              shipRef={shipRef}
            />

            {/* Dynamic Multi-Octave Stormy Ocean */}
            <OceanMesh seaGeomRef={seaGeomRef} />

            {/* Sky Dome & Cloud Billows */}
            <SkyAndClouds />
          </Canvas>

          {/* Vignette Shadow Overlay */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,5,10,0.8)]" />
        </div>

        {/* ================================================================= */}
        {/* 2. TOP HUD: JOURNEY TITLE, STAGE TRACKER & VOYAGE TELEMETRY       */}
        {/* ================================================================= */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between gap-4 pt-14 sm:pt-16 pointer-events-none">
          
          {/* Eyebrow Navigation Badge with Lock/Exploration Status */}
          <div className="pointer-events-auto flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#060D1F]/90 border border-cyan-400/35 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(6,182,212,0.2)]">
            <Ship className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase">
              ✦ 3D WATER WORLD VOYAGE
            </span>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-200">
              EXPLORING STAGE {activeStageIdx + 1}/5
            </span>
          </div>

          {/* HUD Audio & Auto-Glide Controls */}
          <div className="pointer-events-auto flex items-center gap-2">
            <button
              onClick={toggleSound}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#060D1F]/85 border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-cyan-300 transition-all text-xs font-mono cursor-pointer backdrop-blur-xl"
              title="Toggle Ocean Ambient Audio"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
              <span className="hidden sm:inline">{isMuted ? 'MUTED' : 'AUDIO'}</span>
            </button>

            <button
              onClick={() => {
                audioEngine.playClick();
                setIsAutoVoyage(!isAutoVoyage);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer backdrop-blur-xl border ${
                isAutoVoyage
                  ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.4)] animate-pulse'
                  : 'bg-[#060D1F]/85 border-white/10 text-slate-300 hover:text-white'
              }`}
            >
              {isAutoVoyage ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isAutoVoyage ? 'AUTO VOYAGE ON' : 'AUTO VOYAGE'}</span>
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
                key={currentStage.step}
                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 30, scale: 0.95 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 sm:p-8 rounded-3xl bg-[#060D1F]/94 border border-cyan-400/35 backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(6,182,212,0.25),inset_0_1px_1px_rgba(255,255,255,0.15)] flex flex-col gap-4 relative overflow-hidden"
              >
                {/* Top Specular Glow Ray */}
                <div 
                  className="absolute top-0 inset-x-8 h-[1.5px] pointer-events-none transition-colors duration-500"
                  style={{ background: `linear-gradient(to right, transparent, ${currentStage.accentColor}, transparent)` }}
                />

                {/* Stage Header Info */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                      <StageIcon className="w-4 h-4" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-extrabold uppercase tracking-wider bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 shadow-sm">
                      {currentStage.badge}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-amber-400 font-semibold">
                    {currentStage.metrics}
                  </span>
                </div>

                {/* Heading */}
                <RockGoldText
                  as="h3"
                  className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-display tracking-tight leading-tight"
                >
                  {currentStage.title}
                </RockGoldText>

                {/* Subtitle & Deep Description */}
                <p className="text-cyan-300 text-xs sm:text-sm font-mono font-semibold">
                  {currentStage.subtitle}
                </p>
                
                <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
                  {currentStage.narrative}
                </p>

                {/* Key Deliverables Matrix */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/20 space-y-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    Key Phase Deliverables:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentStage.deliverables.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Story Action Cluster */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <GoldBarButton
                    variant="solid-ingot"
                    size="sm"
                    hallmark="VOYAGE"
                    onClick={() => {
                      audioEngine.playSwoosh();
                      navigate(currentStage.route);
                    }}
                    icon={<ArrowRight className="w-3.5 h-3.5 text-slate-950" />}
                    iconPosition="right"
                  >
                    {currentStage.ctaText}
                  </GoldBarButton>

                  <button
                    onClick={() => {
                      audioEngine.playClick();
                      navigate('/contact');
                    }}
                    className="text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1 group cursor-pointer"
                  >
                    <span>Request Navigation Plan</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Floating Nautical Telemetry (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-6 justify-end pointer-events-none">
            <div className="p-6 rounded-3xl bg-[#060D1F]/85 border border-cyan-400/25 backdrop-blur-2xl shadow-2xl flex flex-col gap-3.5 max-w-xs text-right">
              <div className="flex items-center justify-end gap-2 text-cyan-400">
                <span className="text-[10px] font-mono uppercase tracking-widest font-bold">
                  NAUTICAL TELEMETRY
                </span>
                <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '14s' }} />
              </div>

              <div className="space-y-2 border-y border-white/10 py-3 text-left">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">HEADING:</span>
                  <span className="text-amber-400 font-bold">{currentStage.telemetry.compassHeading}</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">WIND:</span>
                  <span className="text-cyan-300 font-bold">{currentStage.telemetry.windSpeed}</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">SWELL:</span>
                  <span className="text-teal-300 font-bold">{currentStage.telemetry.waveHeight}</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">STATUS:</span>
                  <span className="text-emerald-400 font-bold">{currentStage.telemetry.hullStatus}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                Scroll to navigate through the 5 lifecycle stages of enterprise scale aboard the AuMDS flagship.
              </p>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 4. BOTTOM HUD: INTERACTIVE 5-STAGE TIMELINE SELECTOR RAIL         */}
        {/* ================================================================= */}
        <div className="relative z-10 w-full max-w-5xl mx-auto pb-4 sm:pb-6 pointer-events-auto">
          <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-[#060D1F]/90 border border-cyan-400/25 backdrop-blur-2xl shadow-2xl">
            {VOYAGE_STAGES.map((stage, idx) => {
              const isActive = activeStageIdx === idx;
              const Icon = stage.icon;
              return (
                <button
                  key={stage.step}
                  onClick={() => handleSelectStage(idx)}
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
                      layoutId="activeVoyageStageTab"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 shadow-[0_0_20px_rgba(6,182,212,0.6)]"
                      transition={{ type: 'spring', stiffness: 450, damping: 28 }}
                    />
                  )}
                  
                  <Icon className="relative z-10 w-3.5 h-3.5" />
                  <span className="relative z-10 font-bold">STAGE {stage.step}</span>
                  <span className="relative z-10 whitespace-nowrap hidden sm:inline">{stage.title.split('&')[0].trim()}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
