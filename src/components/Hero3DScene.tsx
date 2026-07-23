"use client";

import React, { useRef, useState, useEffect, Component, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Class ErrorBoundary to catch WebGL or R3F rendering exceptions gracefully
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ThreeErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn("WebGL 3D Context Warning (handled):", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fallbackUI = (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-surface rounded-2xl border border-border/80">
      <div className="w-16 h-16 rounded-full bg-coral/20 border border-coral/40 flex items-center justify-center mb-3 animate-pulse">
        <span className="w-8 h-8 rounded-full bg-coral inline-block" />
      </div>
      <span className="text-xs font-sans font-bold uppercase tracking-wider text-mint mb-1">
        Automation System Core
      </span>
      <span className="text-[11px] font-sans text-text-muted">
        n8n Real-time Workflow Engine
      </span>
    </div>
  );

  if (!mounted) {
    return fallbackUI;
  }

  return (
    <ThreeErrorBoundary fallback={fallbackUI}>
      <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          className="w-full h-full"
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} color="#00F5B8" />
          <pointLight position={[-10, -10, -10]} intensity={2} color="#FF3B5C" />
          <pointLight position={[5, 5, 5]} intensity={1.2} color="#A855F7" />

          <FloatingCoreMesh />
          <OrbitingSphere position={[2.2, 0.8, 0]} color="#00F5B8" radius={0.2} speed={1.2} />
          <OrbitingSphere position={[-2.4, -0.6, 0.5]} color="#A855F7" radius={0.25} speed={0.9} />
          <OrbitingSphere position={[0, 2.3, -0.5]} color="#FF3B5C" radius={0.18} speed={1.5} />

          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} />
        </Canvas>

        <div className="absolute bottom-4 right-4 z-20 pointer-events-none">
          <span className="px-3 py-1 rounded-full text-[11px] font-sans font-bold uppercase tracking-wider bg-mint/10 border border-mint/30 text-mint backdrop-blur-md">
            Live Interactive 3D WebGL
          </span>
        </div>
      </div>
    </ThreeErrorBoundary>
  );
}
