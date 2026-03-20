"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";

function GradientSphere() {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh position={[2, 0.5, -2]} scale={2.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#4A5FD9"
          speed={2}
          distort={0.3}
          radius={1}
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  );
}

function FloatingOrb({
  position,
  scale,
  color,
  speed,
}: {
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          speed={3}
          distort={0.4}
          radius={1}
          transparent
          opacity={0.12}
        />
      </mesh>
    </Float>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <Environment preset="studio" />

      <GradientSphere />

      <FloatingOrb
        position={[-3, -1, -3]}
        scale={1.8}
        color="#2F3ECF"
        speed={1.2}
      />
      <FloatingOrb
        position={[0, 2, -4]}
        scale={1}
        color="#4A5FD9"
        speed={2}
      />
      <FloatingOrb
        position={[-1.5, -2, -1]}
        scale={0.6}
        color="#2F3ECF"
        speed={2.5}
      />
      <FloatingOrb
        position={[3, -1.5, -2]}
        scale={0.8}
        color="#4A5FD9"
        speed={1.8}
      />
    </>
  );
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}
