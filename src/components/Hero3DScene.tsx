"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

function FloatingCoreMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#FF3B5C"
          roughness={0.15}
          metalness={0.8}
          distort={0.4}
          speed={3}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
}

function OrbitingSphere({ position, color, radius = 0.25, speed = 1 }: { position: [number, number, number]; color: string; radius?: number; speed?: number }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime() * speed;
      ref.current.rotation.y = t;
      ref.current.rotation.x = t * 0.5;
    }
  });

  return (
    <group ref={ref}>
      <mesh position={position}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

export default function Hero3DScene() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
      {/* Dynamic Canvas Container */}
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        className="w-full h-full"
        gl={{ antialias: true, alpha: true }}
      >
        {/* Studio Lighting Setup */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#00F5B8" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#FF3B5C" />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#A855F7" />

        {/* 3D Main Mesh & Orbiting Spheres */}
        <FloatingCoreMesh />
        <OrbitingSphere position={[2.2, 0.8, 0]} color="#00F5B8" radius={0.2} speed={1.2} />
        <OrbitingSphere position={[-2.4, -0.6, 0.5]} color="#A855F7" radius={0.25} speed={0.9} />
        <OrbitingSphere position={[0, 2.3, -0.5]} color="#FF3B5C" radius={0.18} speed={1.5} />

        {/* User Interactive Orbit Controls */}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} />
      </Canvas>

      {/* Floating 3D Control Tag */}
      <div className="absolute bottom-4 right-4 z-20 pointer-events-none">
        <span className="px-3 py-1 rounded-full text-[11px] font-sans font-bold uppercase tracking-wider bg-mint/10 border border-mint/30 text-mint backdrop-blur-md">
          Live Interactive 3D WebGL
        </span>
      </div>
    </div>
  );
}
