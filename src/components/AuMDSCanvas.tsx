import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Central AuMDS Metallic Core with double orbital ring
function MetallicAuMDSCore() {
  const coreRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const innerOrbRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.15 + state.pointer.x * 0.3;
      coreRef.current.rotation.x = t * 0.08 + state.pointer.y * 0.2;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.35;
      ring1Ref.current.rotation.y = t * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.3;
      ring2Ref.current.rotation.z = t * 0.25;
    }
    if (innerOrbRef.current) {
      innerOrbRef.current.rotation.y = -t * 0.2;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.0}>
      <group ref={coreRef} position={[0, 0, 0]}>
        {/* Core Metallic Sphere */}
        <Sphere ref={innerOrbRef} args={[1.1, 64, 64]}>
          <MeshDistortMaterial
            color="#0A2540"
            emissive="#1E3A8A"
            emissiveIntensity={0.6}
            roughness={0.12}
            metalness={0.92}
            distort={0.28}
            speed={2.2}
          />
        </Sphere>

        {/* Inner Golden Orbit Ring */}
        <Torus ref={ring1Ref} args={[1.8, 0.035, 32, 100]}>
          <meshStandardMaterial
            color="#F59E0B"
            emissive="#D97706"
            emissiveIntensity={0.8}
            metalness={0.95}
            roughness={0.1}
          />
        </Torus>

        {/* Outer Silver / Cyan Orbit Ring */}
        <Torus ref={ring2Ref} args={[2.3, 0.025, 32, 100]} rotation={[Math.PI / 3, 0, 0]}>
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#0284C7"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.15}
          />
        </Torus>

        {/* 5 Orbiting Service Satellite Nodes */}
        {[
          { angle: 0, color: '#38BDF8', size: 0.18 },
          { angle: (Math.PI * 2) / 5, color: '#F59E0B', size: 0.16 },
          { angle: (Math.PI * 4) / 5, color: '#818CF8', size: 0.2 },
          { angle: (Math.PI * 6) / 5, color: '#34D399', size: 0.16 },
          { angle: (Math.PI * 8) / 5, color: '#F472B6', size: 0.17 },
        ].map((node, i) => (
          <mesh
            key={i}
            position={[
              Math.cos(node.angle) * 2.3,
              Math.sin(node.angle * 2) * 0.4,
              Math.sin(node.angle) * 2.3,
            ]}
          >
            <sphereGeometry args={[node.size, 32, 32]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.9}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// Infinite Universe Starfield & Glowing Data Streams
function CosmicStarfield() {
  const count = 450;
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorDeepBlue = new THREE.Color('#1E3A8A');
    const colorCyan = new THREE.Color('#38BDF8');
    const colorGold = new THREE.Color('#F59E0B');
    const colorSilver = new THREE.Color('#E2E8F0');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;

      const rand = Math.random();
      const mixed =
        rand < 0.35
          ? colorDeepBlue
          : rand < 0.65
          ? colorCyan
          : rand < 0.85
          ? colorSilver
          : colorGold;

      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.02 + state.pointer.x * 0.05;
    pointsRef.current.rotation.x = t * 0.01 + state.pointer.y * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
      />
    </points>
  );
}

export const AuMDSCanvas: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 8]} intensity={2.0} color="#F59E0B" />
        <directionalLight position={[-10, -10, -8]} intensity={2.5} color="#38BDF8" />
        <pointLight position={[0, 0, 4]} intensity={1.5} color="#60A5FA" />
        
        <MetallicAuMDSCore />
        <CosmicStarfield />
      </Canvas>
    </div>
  );
};
