import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// ==========================================
// 1. PROCEDURAL 3D SIMPLEX & RIDGE NOISE ENGINE
// ==========================================
const F3 = 1.0 / 3.0;
const G3 = 1.0 / 6.0;
const pTable = new Uint8Array(512);
for (let i = 0; i < 256; i++) pTable[i] = pTable[i + 256] = Math.floor(Math.random() * 256);

function simplexNoise3D(xin: number, yin: number, zin: number): number {
  let n0, n1, n2, n3;
  const s = (xin + yin + zin) * F3;
  const i = Math.floor(xin + s);
  const j = Math.floor(yin + s);
  const k = Math.floor(zin + s);
  const t = (i + j + k) * G3;
  const X0 = i - t;
  const Y0 = j - t;
  const Z0 = k - t;
  const x0 = xin - X0;
  const y0 = yin - Y0;
  const z0 = zin - Z0;

  let i1, j1, k1, i2, j2, k2;
  if (x0 >= y0) {
    if (y0 >= z0) {
      i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0;
    } else if (x0 >= z0) {
      i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1;
    } else {
      i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1;
    }
  } else {
    if (y0 < z0) {
      i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1;
    } else if (x0 < z0) {
      i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1;
    } else {
      i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0;
    }
  }

  const x1 = x0 - i1 + G3;
  const y1 = y0 - j1 + G3;
  const z1 = z0 - k1 + G3;
  const x2 = x0 - i2 + 2.0 * G3;
  const y2 = y0 - j2 + 2.0 * G3;
  const z2 = z0 - k2 + 2.0 * G3;
  const x3 = x0 - 1.0 + 3.0 * G3;
  const y3 = y0 - 1.0 + 3.0 * G3;
  const z3 = z0 - 1.0 + 3.0 * G3;

  const ii = i & 255;
  const jj = j & 255;
  const kk = k & 255;

  const gi0 = pTable[ii + pTable[jj + pTable[kk]]] % 12;
  const gi1 = pTable[ii + i1 + pTable[jj + j1 + pTable[kk + k1]]] % 12;
  const gi2 = pTable[ii + i2 + pTable[jj + j2 + pTable[kk + k2]]] % 12;
  const gi3 = pTable[ii + 1 + pTable[jj + 1 + pTable[kk + 1]]] % 12;

  function grad(gi: number, x: number, y: number, z: number) {
    const h = gi & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }

  let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
  if (t0 < 0) n0 = 0.0;
  else {
    t0 *= t0;
    n0 = t0 * t0 * grad(gi0, x0, y0, z0);
  }

  let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
  if (t1 < 0) n1 = 0.0;
  else {
    t1 *= t1;
    n1 = t1 * t1 * grad(gi1, x1, y1, z1);
  }

  let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
  if (t2 < 0) n2 = 0.0;
  else {
    t2 *= t2;
    n2 = t2 * t2 * grad(gi2, x2, y2, z2);
  }

  let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
  if (t3 < 0) n3 = 0.0;
  else {
    t3 *= t3;
    n3 = t3 * t3 * grad(gi3, x3, y3, z3);
  }

  return 32.0 * (n0 + n1 + n2 + n3);
}

function fbm3D(x: number, y: number, z: number, octaves = 4): number {
  let total = 0.0;
  let freq = 1.0;
  let amp = 0.5;
  let maxAmp = 0.0;
  for (let i = 0; i < octaves; i++) {
    total += simplexNoise3D(x * freq, y * freq, z * freq) * amp;
    maxAmp += amp;
    freq *= 2.02;
    amp *= 0.5;
  }
  return total / maxAmp;
}

function ridgeNoise3D(x: number, y: number, z: number, octaves = 4): number {
  let total = 0.0;
  let freq = 1.0;
  let amp = 0.5;
  let maxAmp = 0.0;
  for (let i = 0; i < octaves; i++) {
    let n = 1.0 - Math.abs(simplexNoise3D(x * freq, y * freq, z * freq));
    n = n * n;
    total += n * amp;
    maxAmp += amp;
    freq *= 2.05;
    amp *= 0.5;
  }
  return total / maxAmp;
}

function warpedRockFbm(x: number, y: number, z: number, seed = 0): number {
  const qx = fbm3D(x + seed, y + seed, z + seed, 3);
  const qy = fbm3D(x + 5.2, y + 1.3, z + 2.8, 3);
  const qz = fbm3D(x + 1.7, y + 9.2, z + 0.5, 3);
  return fbm3D(x + 2.0 * qx, y + 2.0 * qy, z + 2.0 * qz, 4);
}

function regmaglyptIndentations(x: number, y: number, z: number): number {
  const n = simplexNoise3D(x * 2.8, y * 2.8, z * 2.8);
  return Math.pow(Math.max(0, -n), 2.2) * 0.35;
}

function octahedralFacetFactor(dir: THREE.Vector3): number {
  const d1 = Math.abs(dir.x + dir.y + dir.z) * 0.57735;
  const d2 = Math.abs(dir.x - dir.y + dir.z) * 0.57735;
  const d3 = Math.abs(dir.x + dir.y - dir.z) * 0.57735;
  const d4 = Math.abs(-dir.x + dir.y + dir.z) * 0.57735;
  return Math.max(d1, d2, d3, d4);
}

// ==========================================
// 2. PROCEDURAL TEXTURES & CELESTIAL STARDUST
// ==========================================
function createGoldenStardustTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const center = size / 2;

  // Crisp, luminous golden stardust particle texture (diamond white core to warm gold)
  const grad = ctx.createRadialGradient(center, center, 0, center, center, center * 0.95);
  grad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
  grad.addColorStop(0.12, 'rgba(255, 248, 220, 0.95)');
  grad.addColorStop(0.35, 'rgba(245, 183, 34, 0.75)');
  grad.addColorStop(0.65, 'rgba(217, 119, 6, 0.30)');
  grad.addColorStop(0.85, 'rgba(180, 83, 9, 0.08)');
  grad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(center, center, center, 0, Math.PI * 2);
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}

function generateRealisticRockPBR() {
  const size = 1024;

  const cAlbedo = document.createElement('canvas');
  cAlbedo.width = cAlbedo.height = size;
  const ctxAlbedo = cAlbedo.getContext('2d')!;

  const cBump = document.createElement('canvas');
  cBump.width = cBump.height = size;
  const ctxBump = cBump.getContext('2d')!;

  const cRough = document.createElement('canvas');
  cRough.width = cRough.height = size;
  const ctxRough = cRough.getContext('2d')!;

  const cMetal = document.createElement('canvas');
  cMetal.width = cMetal.height = size;
  const ctxMetal = cMetal.getContext('2d')!;

  const imgA = ctxAlbedo.createImageData(size, size);
  const dataA = imgA.data;

  const imgB = ctxBump.createImageData(size, size);
  const dataB = imgB.data;

  const imgR = ctxRough.createImageData(size, size);
  const dataR = imgR.data;

  const imgM = ctxMetal.createImageData(size, size);
  const dataM = imgM.data;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const u = (x / size) * 7.5;
      const v = (y / size) * 7.5;

      const veinGold = ridgeNoise3D(u * 1.5, v * 1.5, 3.2, 4);
      const veinCyan = ridgeNoise3D(u * 2.2 + 4.1, v * 2.2 + 2.8, 1.7, 4);
      const stoneFbm = fbm3D(u * 3.0, v * 3.0, 5.1, 4);
      const fineGrit = simplexNoise3D(u * 16.0, v * 16.0, 7.8) * 0.5 + 0.5;

      const isGold = Math.max(0, Math.min(1, (veinGold - 0.52) * 8.0));
      const isCyan = Math.max(0, Math.min(1, (veinCyan - 0.58) * 7.0)) * (1.0 - isGold);

      const blackR = 12 + stoneFbm * 14 + fineGrit * 6;
      const blackG = 14 + stoneFbm * 16 + fineGrit * 6;
      const blackB = 22 + stoneFbm * 20 + fineGrit * 10;

      const cyanR = 30 + fineGrit * 20;
      const cyanG = 150 + fineGrit * 40;
      const cyanB = 230 + fineGrit * 25;

      const goldR = 255 - fineGrit * 15;
      const goldG = 200 + fineGrit * 35;
      const goldB = 35 + fineGrit * 35;

      const r = blackR * (1.0 - isCyan - isGold) + cyanR * isCyan + goldR * isGold;
      const g = blackG * (1.0 - isCyan - isGold) + cyanG * isCyan + goldG * isGold;
      const b = blackB * (1.0 - isCyan - isGold) + cyanB * isCyan + goldB * isGold;

      dataA[idx] = Math.floor(r);
      dataA[idx + 1] = Math.floor(g);
      dataA[idx + 2] = Math.floor(b);
      dataA[idx + 3] = 255;

      const heightVal = Math.min(
        255,
        Math.max(0, Math.floor((stoneFbm * 0.45 + isCyan * 0.25 + isGold * 0.5 + fineGrit * 0.2) * 210))
      );
      dataB[idx] = dataB[idx + 1] = dataB[idx + 2] = heightVal;
      dataB[idx + 3] = 255;

      const roughVal = Math.floor(
        (210 + fineGrit * 35) * (1.0 - isCyan - isGold) +
          (135 + fineGrit * 25) * isCyan +
          (48 + fineGrit * 25) * isGold
      );
      dataR[idx] = dataR[idx + 1] = dataR[idx + 2] = roughVal;
      dataR[idx + 3] = 255;

      const metalVal = Math.floor(12 * (1.0 - isCyan - isGold) + 55 * isCyan + 250 * isGold);
      dataM[idx] = dataM[idx + 1] = dataM[idx + 2] = metalVal;
      dataM[idx + 3] = 255;
    }
  }

  ctxAlbedo.putImageData(imgA, 0, 0);
  ctxBump.putImageData(imgB, 0, 0);
  ctxRough.putImageData(imgR, 0, 0);
  ctxMetal.putImageData(imgM, 0, 0);

  const albedoTex = new THREE.CanvasTexture(cAlbedo);
  albedoTex.wrapS = albedoTex.wrapT = THREE.RepeatWrapping;
  albedoTex.repeat.set(2, 2);
  albedoTex.generateMipmaps = true;

  const bumpTex = new THREE.CanvasTexture(cBump);
  bumpTex.wrapS = bumpTex.wrapT = THREE.RepeatWrapping;
  bumpTex.repeat.set(2, 2);
  bumpTex.generateMipmaps = true;

  const roughTex = new THREE.CanvasTexture(cRough);
  roughTex.wrapS = roughTex.wrapT = THREE.RepeatWrapping;
  roughTex.repeat.set(2, 2);
  roughTex.generateMipmaps = true;

  const metalTex = new THREE.CanvasTexture(cMetal);
  metalTex.wrapS = metalTex.wrapT = THREE.RepeatWrapping;
  metalTex.repeat.set(2, 2);
  metalTex.generateMipmaps = true;

  return { albedoTex, bumpTex, roughTex, metalTex };
}

function generateEmblemTextures() {
  const size = 1024;
  const cBump = document.createElement('canvas');
  cBump.width = cBump.height = size;
  const ctxBump = cBump.getContext('2d')!;
  const imgB = ctxBump.createImageData(size, size);
  const dataB = imgB.data;

  // Ultra-fine micro-brushed anisotropic 24K gold grain with crystalline facets
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const u = (x / size) * 64.0;
      const v = (y / size) * 3.5;
      const n = simplexNoise3D(u, v, 2.1) * 0.5 + 0.5;
      const microGrit = simplexNoise3D(x * 0.35, y * 0.35, 9.4) * 0.5 + 0.5;
      const grain = (Math.random() - 0.5) * 6.0;
      const val = Math.floor(THREE.MathUtils.clamp(128 + (n - 0.5) * 14 + (microGrit - 0.5) * 8 + grain, 0, 255));
      dataB[idx] = dataB[idx + 1] = dataB[idx + 2] = val;
      dataB[idx + 3] = 255;
    }
  }
  ctxBump.putImageData(imgB, 0, 0);
  const bumpTex = new THREE.CanvasTexture(cBump);
  bumpTex.wrapS = bumpTex.wrapT = THREE.RepeatWrapping;
  bumpTex.repeat.set(4, 4);
  bumpTex.generateMipmaps = true;
  bumpTex.minFilter = THREE.LinearMipmapLinearFilter;
  bumpTex.magFilter = THREE.LinearFilter;
  return bumpTex;
}

function createStudioEnvironmentMap(renderer: THREE.WebGLRenderer): THREE.WebGLRenderTarget {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const envScene = new THREE.Scene();

  // 1. Dark cosmic ambient dome with rich deep blue-black tone
  const bgGeo = new THREE.SphereGeometry(100, 32, 16);
  const bgMat = new THREE.MeshBasicMaterial({
    color: 0x040814,
    side: THREE.BackSide
  });
  envScene.add(new THREE.Mesh(bgGeo, bgMat));

  // 2. High-intensity Warm 24K Gold Key Softbox (Top Right)
  const softbox1 = new THREE.Mesh(
    new THREE.PlaneGeometry(42, 42),
    new THREE.MeshBasicMaterial({ color: 0xffec99, side: THREE.DoubleSide })
  );
  softbox1.position.set(24, 30, 24);
  softbox1.lookAt(0, 0, 0);
  envScene.add(softbox1);

  // 3. Crisp Incandescent White-Hot Overhead Key Light (Generates brilliant specular peaks)
  const softbox2 = new THREE.Mesh(
    new THREE.PlaneGeometry(35, 24),
    new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
  );
  softbox2.position.set(0, 42, 10);
  softbox2.lookAt(0, 0, 0);
  envScene.add(softbox2);

  // 4. Horizontal Studio Light Bar (Generates long metallic glints across rotating chevrons)
  const lightBar = new THREE.Mesh(
    new THREE.PlaneGeometry(60, 8),
    new THREE.MeshBasicMaterial({ color: 0xfff6cf, side: THREE.DoubleSide })
  );
  lightBar.position.set(0, 8, 30);
  lightBar.lookAt(0, 0, 0);
  envScene.add(lightBar);

  // 5. Cool Cyan Specular Rim Softbox for high-tech contrast and edge separation
  const softbox3 = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 48),
    new THREE.MeshBasicMaterial({ color: 0x60a5fa, side: THREE.DoubleSide })
  );
  softbox3.position.set(-32, 14, -20);
  softbox3.lookAt(0, 0, 0);
  envScene.add(softbox3);

  // 6. Deep Molten Amber Bottom Reflector for warm underside bounce
  const softbox4 = new THREE.Mesh(
    new THREE.PlaneGeometry(38, 38),
    new THREE.MeshBasicMaterial({ color: 0xf59e0b, side: THREE.DoubleSide })
  );
  softbox4.position.set(0, -35, 14);
  softbox4.lookAt(0, 0, 0);
  envScene.add(softbox4);

  // 7. Circular Spotlights for sparkling round reflections
  const circleSpot1 = new THREE.Mesh(
    new THREE.CircleGeometry(12, 32),
    new THREE.MeshBasicMaterial({ color: 0xfff0b3, side: THREE.DoubleSide })
  );
  circleSpot1.position.set(18, 16, -24);
  circleSpot1.lookAt(0, 0, 0);
  envScene.add(circleSpot1);

  const circleSpot2 = new THREE.Mesh(
    new THREE.CircleGeometry(10, 32),
    new THREE.MeshBasicMaterial({ color: 0xffd54f, side: THREE.DoubleSide })
  );
  circleSpot2.position.set(-20, -18, 20);
  circleSpot2.lookAt(0, 0, 0);
  envScene.add(circleSpot2);

  const renderTarget = pmremGenerator.fromScene(envScene, 0.04);
  pmremGenerator.dispose();
  return renderTarget;
}

// Config constants
const ROCK_BOULDER_CONFIGS = [
  {
    seed: 19.4,
    scale: new THREE.Vector3(1.22, 1.48, 1.15),
    baseRadius: 0.72,
    fissureFreq: 2.4,
    fissureDepth: 0.38,
    facetWeight: 0.35
  },
  {
    seed: 52.8,
    scale: new THREE.Vector3(1.52, 1.05, 1.25),
    baseRadius: 0.68,
    fissureFreq: 3.1,
    fissureDepth: 0.32,
    facetWeight: 0.28
  },
  {
    seed: 94.2,
    scale: new THREE.Vector3(1.18, 1.25, 1.45),
    baseRadius: 0.7,
    fissureFreq: 3.8,
    fissureDepth: 0.42,
    facetWeight: 0.42
  }
];

function computeRockSolidRadius(localDir: THREE.Vector3, rCfg: (typeof ROCK_BOULDER_CONFIGS)[0]): number {
  const ridge = ridgeNoise3D(
    localDir.x * rCfg.fissureFreq + rCfg.seed,
    localDir.y * rCfg.fissureFreq,
    localDir.z * rCfg.fissureFreq,
    4
  );

  const fbmMass = warpedRockFbm(localDir.x * 1.6, localDir.y * 1.6, localDir.z * 1.6, rCfg.seed);
  const reg = regmaglyptIndentations(localDir.x + rCfg.seed, localDir.y, localDir.z);
  const facet = octahedralFacetFactor(localDir) * rCfg.facetWeight;

  const crackNoise = fbm3D(localDir.x * 4.5 + rCfg.seed * 3.0, localDir.y * 4.5, localDir.z * 4.5, 3);
  const deepCleft = Math.pow(Math.max(0, 1.0 - Math.abs(crackNoise) * 3.2), 2.0) * rCfg.fissureDepth;

  const radiusMult = 1.0 + fbmMass * 0.35 + ridge * 0.26 + facet - reg - deepCleft;
  return rCfg.baseRadius * radiusMult;
}

const SIDE_L = 5.2;
const R_CIRCUM = SIDE_L / Math.sqrt(3);
const R_IN = SIDE_L / (2 * Math.sqrt(3));
const ARM_WIDTH = 0.42;
const ARM_LENGTH = 1.846;
const EXTRUDE_DEPTH = 0.28;

const CORNERS = [
  new THREE.Vector3(0, R_CIRCUM, 0),
  new THREE.Vector3(-SIDE_L / 2, -R_IN, 0),
  new THREE.Vector3(SIDE_L / 2, -R_IN, 0)
];

const CENTROIDS = [
  new THREE.Vector3(0, 1.82, 0),
  new THREE.Vector3(-1.42, -0.68, 0),
  new THREE.Vector3(1.42, -0.68, 0)
];

const METEOR_PATHS = [
  {
    start: new THREE.Vector3(-4.0, 6.0, -68.0),
    mid: new THREE.Vector3(-1.5, 2.0, -28.0),
    rotSpeed: new THREE.Vector3(3.5, 4.1, 2.2)
  },
  {
    start: new THREE.Vector3(-12.0, -8.0, -62.0),
    mid: new THREE.Vector3(-4.0, -3.0, -25.0),
    rotSpeed: new THREE.Vector3(4.0, 2.8, 3.5)
  },
  {
    start: new THREE.Vector3(14.0, 7.0, -65.0),
    mid: new THREE.Vector3(4.5, 2.5, -26.0),
    rotSpeed: new THREE.Vector3(2.9, 4.5, 3.1)
  }
];

const COLLISION_POINT = new THREE.Vector3(0, 0, 0);
const PURE_GOLD_COLOR = new THREE.Color(0xf5b722); // Authentic 24K Physical Gold (Aurum)

export const MeteorForgingEmblem: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const triggerRef = useRef<(() => void) | null>(null);

  const playSoundEffect = useCallback(
    (type: 'whoosh' | 'collision_boom' | 'lock_chime') => {
      try {
        if (!audioCtxRef.current) {
          const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          audioCtxRef.current = new AudioCtx();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
        const ctx = audioCtxRef.current;
        const now = ctx.currentTime;

        if (type === 'whoosh') {
          const bufferSize = ctx.sampleRate * 2.2;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.5;
          }
          const whiteNoise = ctx.createBufferSource();
          whiteNoise.buffer = buffer;

          const filter = ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(120, now);
          filter.frequency.exponentialRampToValueAtTime(1400, now + 2.0);
          filter.Q.setValueAtTime(3.0, now);

          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.01, now);
          gain.gain.linearRampToValueAtTime(0.2, now + 1.9);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

          whiteNoise.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          whiteNoise.start(now);
          whiteNoise.stop(now + 2.2);
        } else if (type === 'collision_boom') {
          const oscSub = ctx.createOscillator();
          const gainSub = ctx.createGain();
          oscSub.type = 'triangle';
          oscSub.frequency.setValueAtTime(240, now);
          oscSub.frequency.exponentialRampToValueAtTime(35, now + 1.4);

          gainSub.gain.setValueAtTime(0.5, now);
          gainSub.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

          oscSub.connect(gainSub);
          gainSub.connect(ctx.destination);
          oscSub.start(now);
          oscSub.stop(now + 2.0);

          const oscMid = ctx.createOscillator();
          const gainMid = ctx.createGain();
          oscMid.type = 'sine';
          oscMid.frequency.setValueAtTime(520, now);
          oscMid.frequency.exponentialRampToValueAtTime(130, now + 0.8);

          gainMid.gain.setValueAtTime(0.25, now);
          gainMid.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

          oscMid.connect(gainMid);
          gainMid.connect(ctx.destination);
          oscMid.start(now);
          oscMid.stop(now + 0.9);
        } else if (type === 'lock_chime') {
          const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
          notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.04);

            gain.gain.setValueAtTime(0, now + idx * 0.04);
            gain.gain.linearRampToValueAtTime(0.06, now + idx * 0.04 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 1.5);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + idx * 0.04);
            osc.stop(now + idx * 0.04 + 1.6);
          });
        }
      } catch {
        // Audio policy
      }
    },
    []
  );

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    const baseCameraPos = new THREE.Vector3(0, 0.1, 10.4);
    camera.position.copy(baseCameraPos);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Studio Reflection Environment Map for Real 24K Metallic Sheen
    const studioEnvMap = createStudioEnvironmentMap(renderer);
    scene.environment = studioEnvMap.texture;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 0.1, 0);
    controls.maxDistance = 20;
    controls.minDistance = 3;
    controls.enableZoom = true;

    // 2. High-End Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xfffaea, 1.4);
    scene.add(ambientLight);

    const frontKeyLight = new THREE.DirectionalLight(0xfffaee, 2.8);
    frontKeyLight.position.set(0, 4, 9);
    frontKeyLight.castShadow = true;
    scene.add(frontKeyLight);

    const goldRimLight = new THREE.DirectionalLight(0xffdf70, 2.6);
    goldRimLight.position.set(7, 6, 8);
    scene.add(goldRimLight);

    const frontLeftLight = new THREE.DirectionalLight(0xbae6fd, 1.4);
    frontLeftLight.position.set(-7, 5, 8);
    scene.add(frontLeftLight);

    const overheadLight = new THREE.DirectionalLight(0xffffff, 2.0);
    overheadLight.position.set(0, 9, 3);
    scene.add(overheadLight);

    const bottomBounceLight = new THREE.DirectionalLight(0xf59e0b, 1.4);
    bottomBounceLight.position.set(0, -6, 4);
    scene.add(bottomBounceLight);

    const goldAuraLights: THREE.PointLight[] = [];
    CENTROIDS.forEach((c) => {
      const light = new THREE.PointLight(0xffd54f, 0.0, 5.0);
      light.position.copy(c);
      scene.add(light);
      goldAuraLights.push(light);
    });

    const impactFlashLight = new THREE.PointLight(0xfff8db, 0.0, 25.0);
    impactFlashLight.position.copy(COLLISION_POINT);
    scene.add(impactFlashLight);

    const meteorLights: THREE.PointLight[] = [];
    for (let i = 0; i < 3; i++) {
      const pLight = new THREE.PointLight(0xffe082, 2.5, 16.0);
      scene.add(pLight);
      meteorLights.push(pLight);
    }

    // 3. Shockwave Rings & Stardust Sprites
    const stardustTexture = createGoldenStardustTexture();

    const shockwaveGeo = new THREE.RingGeometry(0.08, 0.28, 64);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const shockwaveMesh = new THREE.Mesh(shockwaveGeo, shockwaveMat);
    shockwaveMesh.position.set(0, 0, 0.05);
    scene.add(shockwaveMesh);

    const shockwaveGeo2 = new THREE.RingGeometry(0.12, 0.22, 64);
    const shockwaveMat2 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const shockwaveMesh2 = new THREE.Mesh(shockwaveGeo2, shockwaveMat2);
    shockwaveMesh2.position.set(0, 0, 0.06);
    scene.add(shockwaveMesh2);

    // 4. Procedural Textures & Real 24K Physical PBR Gold Materials
    const rockTextures = generateRealisticRockPBR();
    const emblemBumpTex = generateEmblemTextures();

    const pbrMaterial = new THREE.MeshPhysicalMaterial({
      color: PURE_GOLD_COLOR,
      metalness: 1.0,
      roughness: 0.14,
      clearcoat: 0.65,
      clearcoatRoughness: 0.08,
      reflectivity: 1.0,
      sheen: 0.5,
      sheenColor: new THREE.Color(0xffe680),
      sheenRoughness: 0.2,
      bumpMap: emblemBumpTex,
      bumpScale: 0.0035,
      envMapIntensity: 3.0,
      emissive: new THREE.Color(0x000000)
    });

    // 5. Morph Emblem (3 Chevrons)
    const morphGroup = new THREE.Group();
    scene.add(morphGroup);
    const morphMeshes: THREE.Mesh[] = [];

    function createHighPolyChevronMesh(cornerIndex: number) {
      const vCorner = CORNERS[cornerIndex];
      const prevIdx = (cornerIndex + 2) % 3;
      const nextIdx = (cornerIndex + 1) % 3;

      const vPrev = CORNERS[prevIdx];
      const vNext = CORNERS[nextIdx];

      const dirA = new THREE.Vector3().subVectors(vPrev, vCorner).normalize();
      const dirB = new THREE.Vector3().subVectors(vNext, vCorner).normalize();

      const bisector = new THREE.Vector3().addVectors(dirA, dirB).normalize();
      const halfAngle = Math.acos(Math.max(-1, Math.min(1, dirA.dot(dirB)))) * 0.5;
      const offsetLen = ARM_WIDTH / Math.sin(halfAngle);
      const innerCorner = new THREE.Vector3().addVectors(vCorner, bisector.clone().multiplyScalar(offsetLen));

      const normA = new THREE.Vector3().crossVectors(dirA, new THREE.Vector3(0, 0, 1)).normalize();
      if (normA.dot(bisector) < 0) normA.negate();

      const normB = new THREE.Vector3().crossVectors(dirB, new THREE.Vector3(0, 0, 1)).normalize();
      if (normB.dot(bisector) < 0) normB.negate();

      const armOutA = new THREE.Vector3().addVectors(vCorner, dirA.clone().multiplyScalar(ARM_LENGTH));
      const armInA = new THREE.Vector3().addVectors(armOutA, normA.clone().multiplyScalar(ARM_WIDTH));

      const armOutB = new THREE.Vector3().addVectors(vCorner, dirB.clone().multiplyScalar(ARM_LENGTH));
      const armInB = new THREE.Vector3().addVectors(armOutB, normB.clone().multiplyScalar(ARM_WIDTH));

      const centroid = CENTROIDS[cornerIndex];

      const segmentsArm = 24;
      const segmentsW = 8;
      const segmentsD = 5;

      const vertices: number[] = [];
      const indices: number[] = [];

      function getChevronPoint(tArm: number, tW: number, z: number) {
        let p;
        if (tArm <= 0.5) {
          const u = 1.0 - tArm / 0.5;
          const outP = new THREE.Vector3().lerpVectors(vCorner, armOutA, u);
          const inP = new THREE.Vector3().lerpVectors(innerCorner, armInA, u);
          p = new THREE.Vector3().lerpVectors(outP, inP, tW);
        } else {
          const u = (tArm - 0.5) / 0.5;
          const outP = new THREE.Vector3().lerpVectors(vCorner, armOutB, u);
          const inP = new THREE.Vector3().lerpVectors(innerCorner, armInB, u);
          p = new THREE.Vector3().lerpVectors(outP, inP, tW);
        }
        p.z = z;
        return p;
      }

      const totalArmSlices = segmentsArm * 2 + 1;
      const totalWSlices = segmentsW + 1;
      const totalDSlices = segmentsD + 1;

      for (let k = 0; k < totalDSlices; k++) {
        const z = -EXTRUDE_DEPTH * 0.5 + (k / segmentsD) * EXTRUDE_DEPTH;
        for (let j = 0; j < totalWSlices; j++) {
          const tW = j / segmentsW;
          for (let i = 0; i < totalArmSlices; i++) {
            const tArm = i / (totalArmSlices - 1);
            const pt = getChevronPoint(tArm, tW, z);
            vertices.push(pt.x, pt.y, pt.z);
          }
        }
      }

      function getVIdx(i: number, j: number, k: number) {
        return k * (totalWSlices * totalArmSlices) + j * totalArmSlices + i;
      }

      for (let k = 0; k < segmentsD; k++) {
        for (let j = 0; j < segmentsW; j++) {
          for (let i = 0; i < totalArmSlices - 1; i++) {
            const v000 = getVIdx(i, j, k);
            const v100 = getVIdx(i + 1, j, k);
            const v010 = getVIdx(i, j + 1, k);
            const v110 = getVIdx(i + 1, j + 1, k);

            const v001 = getVIdx(i, j, k + 1);
            const v101 = getVIdx(i + 1, j, k + 1);
            const v011 = getVIdx(i, j + 1, k + 1);
            const v111 = getVIdx(i + 1, j + 1, k + 1);

            if (k === segmentsD - 1) {
              indices.push(v001, v101, v111);
              indices.push(v001, v111, v011);
            }
            if (k === 0) {
              indices.push(v000, v110, v100);
              indices.push(v000, v010, v110);
            }
            if (j === 0) {
              indices.push(v000, v100, v101);
              indices.push(v000, v101, v001);
            }
            if (j === segmentsW - 1) {
              indices.push(v010, v011, v111);
              indices.push(v010, v111, v110);
            }
            if (i === 0) {
              indices.push(v000, v001, v011);
              indices.push(v000, v011, v010);
            }
            if (i === totalArmSlices - 2) {
              indices.push(v100, v111, v101);
              indices.push(v100, v110, v111);
            }
          }
        }
      }

      const count = vertices.length / 3;
      const emblemCoords = new Float32Array(count * 3);
      const rockCoords = new Float32Array(count * 3);
      const fluidRadii = new Float32Array(count);

      let maxDist = 0.001;
      const p = new THREE.Vector3();
      const rel = new THREE.Vector3();

      for (let i = 0; i < count; i++) {
        p.set(vertices[i * 3], vertices[i * 3 + 1], vertices[i * 3 + 2]);
        emblemCoords[i * 3] = p.x;
        emblemCoords[i * 3 + 1] = p.y;
        emblemCoords[i * 3 + 2] = p.z;

        rel.subVectors(p, centroid);
        const dist = rel.length();
        if (dist > maxDist) maxDist = dist;
      }

      const rCfg = ROCK_BOULDER_CONFIGS[cornerIndex];
      for (let i = 0; i < count; i++) {
        p.set(vertices[i * 3], vertices[i * 3 + 1], vertices[i * 3 + 2]);
        rel.subVectors(p, centroid);
        const dist = rel.length();
        fluidRadii[i] = dist / maxDist;

        let dir = rel.clone().normalize();
        if (dir.lengthSq() === 0) dir.set(0, 1, 0);

        const localDir = new THREE.Vector3(dir.x * rCfg.scale.x, dir.y * rCfg.scale.y, dir.z * rCfg.scale.z).normalize();

        const rockRadius = computeRockSolidRadius(localDir, rCfg);
        const rockP = centroid.clone().addScaledVector(localDir, rockRadius);

        rockCoords[i * 3] = rockP.x;
        rockCoords[i * 3 + 1] = rockP.y;
        rockCoords[i * 3 + 2] = rockP.z;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(emblemCoords), 3));
      geo.setIndex(indices);
      geo.computeVertexNormals();

      geo.userData = {
        emblemCoords,
        rockCoords,
        fluidRadii,
        centroid: centroid.clone(),
        cornerIndex,
        maxDist
      };

      return geo;
    }

    for (let i = 0; i < 3; i++) {
      const geo = createHighPolyChevronMesh(i);
      const mat = pbrMaterial.clone();
      const mesh = new THREE.Mesh(geo, mat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      morphGroup.add(mesh);
      morphMeshes.push(mesh);
    }

    // 6. Celestial Meteor Boulders
    const meteorGroup = new THREE.Group();
    scene.add(meteorGroup);
    const meteorMeshes: THREE.Mesh[] = [];
    const meteorTrailParticles: {
      points: THREE.Points;
      positions: Float32Array;
      lifetimes: Float32Array;
      count: number;
    }[] = [];

    for (let mIdx = 0; mIdx < 3; mIdx++) {
      const rCfg = ROCK_BOULDER_CONFIGS[mIdx];
      const geo = new THREE.IcosahedronGeometry(0.85, 5);
      const pos = geo.attributes.position;
      const arr = pos.array;
      const p = new THREE.Vector3();

      for (let i = 0; i < pos.count; i++) {
        p.set(arr[i * 3], arr[i * 3 + 1], arr[i * 3 + 2]);
        const dir = p.clone().normalize();
        const localDir = new THREE.Vector3(dir.x * rCfg.scale.x, dir.y * rCfg.scale.y, dir.z * rCfg.scale.z).normalize();
        const r = computeRockSolidRadius(localDir, rCfg);
        p.copy(dir.multiplyScalar(r));
        arr[i * 3] = p.x;
        arr[i * 3 + 1] = p.y;
        arr[i * 3 + 2] = p.z;
      }
      geo.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({
        map: rockTextures.albedoTex,
        bumpMap: rockTextures.bumpTex,
        bumpScale: 0.16,
        roughnessMap: rockTextures.roughTex,
        roughness: 0.55,
        metalnessMap: rockTextures.metalTex,
        metalness: 0.65,
        emissive: new THREE.Color(0xd97706),
        emissiveIntensity: 0.25
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(METEOR_PATHS[mIdx].start);
      meteorGroup.add(mesh);
      meteorMeshes.push(mesh);

      const TRAIL_COUNT = 160;
      const trailPositions = new Float32Array(TRAIL_COUNT * 3);
      const trailLifetimes = new Float32Array(TRAIL_COUNT);

      for (let t = 0; t < TRAIL_COUNT; t++) {
        trailPositions[t * 3] = METEOR_PATHS[mIdx].start.x;
        trailPositions[t * 3 + 1] = METEOR_PATHS[mIdx].start.y;
        trailPositions[t * 3 + 2] = METEOR_PATHS[mIdx].start.z;
        trailLifetimes[t] = Math.random();
      }

      const trailGeo = new THREE.BufferGeometry();
      trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));

      const trailMat = new THREE.PointsMaterial({
        size: 0.42,
        map: stardustTexture,
        color: 0xffe082,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const trailPoints = new THREE.Points(trailGeo, trailMat);
      scene.add(trailPoints);

      meteorTrailParticles.push({
        points: trailPoints,
        positions: trailPositions,
        lifetimes: trailLifetimes,
        count: TRAIL_COUNT
      });
    }

    // 7. Golden Stardust Sparks & Floating Embers
    const SPARK_COUNT = 1800;
    const sparkPositions = new Float32Array(SPARK_COUNT * 3);
    const sparkColors = new Float32Array(SPARK_COUNT * 3);
    const sparkVelocities: THREE.Vector3[] = [];

    for (let i = 0; i < SPARK_COUNT; i++) {
      sparkPositions[i * 3] = 0;
      sparkPositions[i * 3 + 1] = 0;
      sparkPositions[i * 3 + 2] = 0;

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const speed = 2.0 + Math.pow(Math.random(), 1.4) * 14.0;

      sparkVelocities.push(
        new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta) * speed,
          Math.sin(phi) * Math.sin(theta) * speed + Math.random() * 1.8,
          Math.cos(phi) * speed
        )
      );

      const cType = Math.random();
      if (cType > 0.6) {
        sparkColors[i * 3] = 1.3; sparkColors[i * 3 + 1] = 1.25; sparkColors[i * 3 + 2] = 1.1;
      } else if (cType > 0.25) {
        sparkColors[i * 3] = 1.2; sparkColors[i * 3 + 1] = 0.95; sparkColors[i * 3 + 2] = 0.35;
      } else {
        sparkColors[i * 3] = 0.6; sparkColors[i * 3 + 1] = 0.85; sparkColors[i * 3 + 2] = 1.0;
      }
    }

    const sparkGeo = new THREE.BufferGeometry();
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
    sparkGeo.setAttribute('color', new THREE.BufferAttribute(sparkColors, 3));

    const sparkMat = new THREE.PointsMaterial({
      size: 0.35,
      map: stardustTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const sparkParticles = new THREE.Points(sparkGeo, sparkMat);
    scene.add(sparkParticles);

    // Floating Golden Stardust Halo
    const EMBER_COUNT = 320;
    const emberPositions = new Float32Array(EMBER_COUNT * 3);
    const emberVelocities: THREE.Vector3[] = [];

    for (let i = 0; i < EMBER_COUNT; i++) {
      const c = CENTROIDS[i % 3];
      emberPositions[i * 3] = c.x + (Math.random() - 0.5) * 0.4;
      emberPositions[i * 3 + 1] = c.y + (Math.random() - 0.5) * 0.4;
      emberPositions[i * 3 + 2] = c.z + (Math.random() - 0.5) * 0.4;

      emberVelocities.push(
        new THREE.Vector3((Math.random() - 0.5) * 1.8, Math.random() * 1.8, (Math.random() - 0.5) * 1.8)
      );
    }

    const emberGeo = new THREE.BufferGeometry();
    emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));

    const emberMat = new THREE.PointsMaterial({
      size: 0.3,
      map: stardustTexture,
      color: 0xffdf70,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.0
    });

    const emberParticles = new THREE.Points(emberGeo, emberMat);
    scene.add(emberParticles);

    // 8. Animation Timeline
    function getBezierTrajectory(p0: THREE.Vector3, p1: THREE.Vector3, p2: THREE.Vector3, t: number) {
      const inv = 1.0 - t;
      return new THREE.Vector3(
        inv * inv * p0.x + 2 * inv * t * p1.x + t * t * p2.x,
        inv * inv * p0.y + 2 * inv * t * p1.y + t * t * p2.y,
        inv * inv * p0.z + 2 * inv * t * p1.z + t * t * p2.z
      );
    }

    let animProgress = 0.0;
    let isAnimating = true;
    const animDuration = 8.5;
    let animTimer = 0;
    let hasTriggeredBoom = false;
    let hasTriggeredWhoosh = false;
    let hasTriggeredLock = false;
    let cameraShakeIntensity = 0.0;
    let isCinematicCameraActive = true;

    function applyTimeline(t: number, elapsedTime = 0) {
      animProgress = Math.max(0, Math.min(1, t));

      const COLLISION_PHASE = 0.35;

      if (animProgress < COLLISION_PHASE) {
        const inFrac = animProgress / COLLISION_PHASE;
        const curveIn = Math.pow(inFrac, 1.8);

        meteorMeshes.forEach((mesh, idx) => {
          mesh.visible = true;
          const path = METEOR_PATHS[idx];
          const curPos = getBezierTrajectory(path.start, path.mid, COLLISION_POINT, curveIn);
          mesh.position.copy(curPos);

          mesh.rotation.x = elapsedTime * path.rotSpeed.x;
          mesh.rotation.y = elapsedTime * path.rotSpeed.y;
          mesh.rotation.z = elapsedTime * path.rotSpeed.z;

          (mesh.material as THREE.MeshStandardMaterial).emissive.setRGB(0.4 + inFrac * 0.5, 0.25 + inFrac * 0.45, 0.05);
          (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.3 + Math.pow(inFrac, 2.5) * 3.5;

          if (meteorLights[idx]) {
            meteorLights[idx].visible = true;
            meteorLights[idx].position.copy(curPos);
            meteorLights[idx].intensity = 1.6 + Math.pow(inFrac, 2.0) * 6.5;
          }
        });

        meteorTrailParticles.forEach((trail, idx) => {
          trail.points.visible = true;
          (trail.points.material as THREE.PointsMaterial).opacity = 0.92;
          const curPos = meteorMeshes[idx].position;
          const posArr = trail.positions;

          for (let i = 0; i < trail.count; i++) {
            trail.lifetimes[i] += 0.045;
            if (trail.lifetimes[i] > 1.0) {
              trail.lifetimes[i] = 0;
              posArr[i * 3] = curPos.x + (Math.random() - 0.5) * 0.45;
              posArr[i * 3 + 1] = curPos.y + (Math.random() - 0.5) * 0.45;
              posArr[i * 3 + 2] = curPos.z + (Math.random() - 0.5) * 0.45;
            }
          }
          trail.points.geometry.attributes.position.needsUpdate = true;
        });

        morphGroup.visible = false;
        shockwaveMesh.material.opacity = 0;
        shockwaveMesh2.material.opacity = 0;
        impactFlashLight.intensity = 0;
        sparkMat.opacity = 0;
        emberMat.opacity = 0;

        if (animProgress < 0.1 && isAnimating && !hasTriggeredWhoosh) {
          playSoundEffect('whoosh');
          hasTriggeredWhoosh = true;
        }
        return;
      }

      meteorMeshes.forEach((m) => {
        m.visible = false;
      });
      meteorTrailParticles.forEach((t) => {
        t.points.visible = false;
      });
      meteorLights.forEach((l) => {
        l.visible = false;
      });
      morphGroup.visible = true;

      const postCollisionT = (animProgress - COLLISION_PHASE) / (1.0 - COLLISION_PHASE);

      if (!hasTriggeredBoom && isAnimating) {
        playSoundEffect('collision_boom');
        hasTriggeredBoom = true;
        cameraShakeIntensity = 0.6;
      }

      if (postCollisionT < 0.45) {
        const impactAlpha = Math.max(0, 1.0 - postCollisionT / 0.45);
        impactFlashLight.intensity = Math.pow(impactAlpha, 1.6) * 28.0;
        impactFlashLight.color.setRGB(1.0, 0.92, 0.65);

        const sScale = 0.4 + Math.pow(postCollisionT / 0.45, 0.45) * 11.5;
        shockwaveMesh.scale.set(sScale, sScale, 1.0);
        shockwaveMesh.material.opacity = Math.pow(impactAlpha, 1.2) * 0.95;

        const sScale2 = 0.2 + Math.pow(postCollisionT / 0.45, 0.4) * 9.5;
        shockwaveMesh2.scale.set(sScale2, sScale2, 1.0);
        shockwaveMesh2.material.opacity = Math.pow(impactAlpha, 1.4) * 0.85;

        sparkMat.opacity = Math.pow(impactAlpha, 0.7);
        const posArr = sparkGeo.attributes.position.array as Float32Array;
        const sTime = postCollisionT * (animDuration * 0.45);

        for (let i = 0; i < SPARK_COUNT; i++) {
          const vel = sparkVelocities[i];
          const drag = 1.0 / (1.0 + sTime * 0.42);
          posArr[i * 3] = vel.x * sTime * drag;
          posArr[i * 3 + 1] = (vel.y * sTime - 0.5 * 1.8 * sTime * sTime) * drag;
          posArr[i * 3 + 2] = vel.z * sTime * drag;
        }
        sparkGeo.attributes.position.needsUpdate = true;
      } else {
        impactFlashLight.intensity = 0;
        shockwaveMesh.material.opacity = 0;
        shockwaveMesh2.material.opacity = 0;
        sparkMat.opacity = 0;
      }

      const surgeT = postCollisionT;
      const energyIntensity = Math.sin((1.0 - surgeT) * Math.PI * 0.85);
      const energySquared = Math.pow(energyIntensity, 1.5);

      goldAuraLights.forEach((light) => {
        light.intensity = energySquared * 4.0;
        light.color.setRGB(1.0, 0.85 + (1.0 - surgeT) * 0.15, 0.4);
      });

      emberMat.opacity = energySquared * 0.9;

      morphMeshes.forEach((mesh) => {
        const geo = mesh.geometry;
        const pos = geo.attributes.position;
        const arr = pos.array as Float32Array;
        const data = geo.userData;
        const { emblemCoords, rockCoords, fluidRadii, centroid } = data;
        const count = pos.count;

        const forgeProgress = THREE.MathUtils.clamp((surgeT - 0.1) / 0.9, 0.0, 1.0);

        for (let i = 0; i < count; i++) {
          const idx = i * 3;
          const eX = emblemCoords[idx];
          const eY = emblemCoords[idx + 1];
          const eZ = emblemCoords[idx + 2];

          const rX = rockCoords[idx];
          const rY = rockCoords[idx + 1];
          const rZ = rockCoords[idx + 2];

          const frontThreshold = forgeProgress * 1.35 - fluidRadii[i] * 0.35;
          const freezeFactor = THREE.MathUtils.smoothstep(frontThreshold, 0.0, 1.0);

          let targetX = THREE.MathUtils.lerp(rX, eX, freezeFactor);
          let targetY = THREE.MathUtils.lerp(rY, eY, freezeFactor);
          let targetZ = THREE.MathUtils.lerp(rZ, eZ, freezeFactor);

          if (surgeT < 0.22) {
            const blastEase = THREE.MathUtils.smoothstep(surgeT / 0.22, 0.0, 1.0);
            const inwardOffset = 0.35 * (1.0 - blastEase);
            targetX -= centroid.x * inwardOffset;
            targetY -= centroid.y * inwardOffset;
            targetZ += (1.0 - blastEase) * 0.15;
          }

          if (energyIntensity > 0.08 && freezeFactor < 0.95) {
            const microJitter = Math.sin(i * 12.7 + elapsedTime * 28.0) * 0.002 * energyIntensity * (1.0 - freezeFactor);
            targetX += microJitter;
            targetY += microJitter;
            targetZ += microJitter;
          }

          arr[idx] = targetX;
          arr[idx + 1] = targetY;
          arr[idx + 2] = targetZ;
        }

        pos.needsUpdate = true;
        geo.computeVertexNormals();

        const mat = mesh.material as THREE.MeshPhysicalMaterial;
        mat.emissive.setRGB(energyIntensity * 1.5, energyIntensity * 1.1 + energySquared * 0.2, energyIntensity * 0.3);

        const solidT = Math.pow(surgeT, 2.0);

        if (solidT < 0.7) {
          mat.map = rockTextures.albedoTex;
          mat.bumpMap = rockTextures.bumpTex;
          mat.color.setRGB(0.85, 0.65, 0.2);
          mat.clearcoat = 0;
          mat.sheen = 0;
        } else {
          mat.map = null;
          mat.bumpMap = emblemBumpTex;
          mat.color.copy(PURE_GOLD_COLOR);
          mat.clearcoat = THREE.MathUtils.lerp(0.0, 0.65, (solidT - 0.7) / 0.3);
          mat.clearcoatRoughness = 0.08;
          mat.sheen = 0.5;
          mat.sheenColor = new THREE.Color(0xffe680);
          mat.sheenRoughness = 0.2;
        }

        mat.roughness = THREE.MathUtils.lerp(0.55, 0.14, solidT);
        mat.metalness = THREE.MathUtils.lerp(0.6, 1.0, solidT);
        mat.bumpScale = THREE.MathUtils.lerp(0.12, 0.0035, solidT);
        mat.envMapIntensity = THREE.MathUtils.lerp(0.8, 3.0, solidT);
      });

      if (animProgress >= 0.99 && isAnimating && !hasTriggeredLock) {
        playSoundEffect('lock_chime');
        hasTriggeredLock = true;
      }
    }

    function updateCinematicCamera(t: number) {
      if (!isCinematicCameraActive) return;

      if (t < 0.35) {
        const frac = t / 0.35;
        const ease = Math.pow(frac, 1.5);
        const extremeCloseCam = new THREE.Vector3(0, 0.0, 1.8);
        const preImpactCam = new THREE.Vector3(0, 0.6, 11.2);
        camera.position.lerpVectors(extremeCloseCam, preImpactCam, ease);
        controls.target.set(0, 0.1, 0);
      } else if (t < 0.7) {
        const frac = (t - 0.35) / 0.35;
        const ease = THREE.MathUtils.smoothstep(frac, 0.0, 1.0);
        const recoilCam = new THREE.Vector3(0, 0.3, 11.0);
        const arcCam = new THREE.Vector3(2.5, -0.3, 10.6);
        camera.position.lerpVectors(recoilCam, arcCam, ease);
        controls.target.set(0, 0.1, 0);
      } else {
        const frac = (t - 0.7) / 0.3;
        const ease = THREE.MathUtils.smoothstep(frac, 0.0, 1.0);
        const arcCam = new THREE.Vector3(2.5, -0.3, 10.6);
        const finalCam = new THREE.Vector3(0, 0.1, 10.4);
        camera.position.lerpVectors(arcCam, finalCam, ease);
        controls.target.set(0, 0.1, 0);
      }
    }

    const startMeteorCollisionSequence = () => {
      animProgress = 0.0;
      isAnimating = true;
      animTimer = 0;
      hasTriggeredBoom = false;
      hasTriggeredWhoosh = false;
      hasTriggeredLock = false;
      cameraShakeIntensity = 0.0;
      isCinematicCameraActive = true;
      applyTimeline(0.0, 0);
    };

    triggerRef.current = startMeteorCollisionSequence;

    // Start with forged gold emblem initially, ready to replay
    applyTimeline(1.0, 0);
    isAnimating = false;

    // 9. Render Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      if (isAnimating) {
        animTimer += delta;
        const step = delta / animDuration;
        animProgress += step;

        if (animProgress >= 1.0) {
          animProgress = 1.0;
          isAnimating = false;
        }
        applyTimeline(animProgress, time);
      }

      updateCinematicCamera(animProgress);

      if (cameraShakeIntensity > 0.001) {
        camera.position.x += (Math.random() - 0.5) * cameraShakeIntensity;
        camera.position.y += (Math.random() - 0.5) * cameraShakeIntensity;
        camera.position.z += (Math.random() - 0.5) * cameraShakeIntensity * 0.7;
        cameraShakeIntensity *= 0.93;
      }

      if (sparkMat.opacity > 0.01) {
        sparkMat.size = 0.28 + Math.sin(time * 24.0) * 0.05;
      }

      if (emberMat.opacity > 0.01) {
        const pos = emberGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < EMBER_COUNT; i++) {
          const c = CENTROIDS[i % 3];
          const idx = i * 3;
          const px = pos[idx];
          const py = pos[idx + 1];
          const pz = pos[idx + 2];

          const dx = c.x - px;
          const dy = c.y - py;
          const dz = c.z - pz;

          const vel = emberVelocities[i];
          vel.x += (dx * 3.0 + Math.sin(time * 3.0 + i) * 1.2) * delta;
          vel.y += (dy * 3.0 + 0.6) * delta;
          vel.z += (dz * 3.0 + Math.cos(time * 3.0 + i) * 1.2) * delta;
          vel.multiplyScalar(0.93);

          pos[idx] += vel.x * delta;
          pos[idx + 1] += vel.y * delta;
          pos[idx + 2] += vel.z * delta;

          const distSq = dx * dx + dy * dy + dz * dz;
          if (distSq < 0.02 || Math.random() < 0.015) {
            pos[idx] = c.x + (Math.random() - 0.5) * 0.8;
            pos[idx + 1] = c.y + (Math.random() - 0.5) * 0.8;
            pos[idx + 2] = c.z + (Math.random() - 0.5) * 0.8;
            vel.set((Math.random() - 0.5) * 2.0, Math.random() * 1.8, (Math.random() - 0.5) * 2.0);
          }
        }
        emberGeo.attributes.position.needsUpdate = true;
      }

      if (animProgress > 0.5) {
        morphGroup.rotation.y += delta * 0.42;
        morphGroup.rotation.x = Math.sin(time * 0.7) * 0.06;
      }

      controls.update();
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const onResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      studioEnvMap.dispose();
      renderer.dispose();
      controls.dispose();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, [playSoundEffect]);

  const handleTriggerForge = () => {
    if (triggerRef.current) {
      triggerRef.current();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[460px] sm:h-[520px] lg:h-[580px] xl:h-[620px] bg-transparent flex items-center justify-center p-0 ${className}`}
    >
      {/* 3D WebGL Canvas - 100% Clean, Seamless, Transparent & Borderless */}
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing z-0" />
    </div>
  );
};
