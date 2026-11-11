"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useInView } from "framer-motion";
import { useStill } from "@/components/MotionPref";
import { useRef, type ReactNode } from "react";

/** Studio lighting built in code, so nothing loads from the network. */
export function Studio() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 5]} intensity={1.4} />
      <pointLight position={[-4, -2, 3]} intensity={25} color="#a970ff" />
      <pointLight position={[4, -3, 2]} intensity={20} color="#ff9a4d" />
      <Environment resolution={256}>
        <Lightformer intensity={2.5} position={[3, 5, -4]} rotation-z={0.6} scale={[12, 1.2, 1]} color="#ffffff" />
        <Lightformer intensity={4} position={[-6, 2, -3]} rotation-z={-0.4} scale={[3, 10, 1]} color="#5b8cff" />
        <Lightformer intensity={3} position={[6, -2, -1]} rotation-z={0.3} scale={[4, 6, 1]} color="#ff9a4d" />
        <Lightformer form="circle" intensity={2} position={[-2, -5, 3]} scale={4} color="#a970ff" />
      </Environment>
    </>
  );
}

/**
 * Only mounts the 3D scene when it's near the screen, and pauses it when it scrolls away.
 * Keeps the page fast even with several animated scenes.
 */
export default function LazyCanvas({
  children,
  className = "",
  camera = { position: [0, 0, 6] as [number, number, number], fov: 40 },
}: {
  children: (still: boolean) => ReactNode;
  className?: string;
  camera?: { position: [number, number, number]; fov: number };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { margin: "300px" });
  const reduce = useStill();
  return (
    <div ref={ref} aria-hidden="true" className={className}>
      {near && (
        <Canvas dpr={[1, 1.75]} camera={camera} frameloop={reduce ? "demand" : "always"} gl={{ alpha: true, antialias: true }}>
          <Studio />
          {children(reduce)}
        </Canvas>
      )}
    </div>
  );
}
