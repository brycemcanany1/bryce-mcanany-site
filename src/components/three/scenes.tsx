"use client";

import { useFrame } from "@react-three/fiber";
import { Float, Line, MeshDistortMaterial, RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/** Gently leans a group toward the cursor. */
function usePointerTilt(ref: React.RefObject<THREE.Group | null>, still: boolean, amount = 0.35) {
  useFrame((state) => {
    if (still || !ref.current) return;
    const { x, y } = state.pointer;
    ref.current.rotation.y += (x * amount - ref.current.rotation.y) * 0.05;
    ref.current.rotation.x += (-y * amount * 0.7 - ref.current.rotation.x) * 0.05;
  });
}

/** Scales a persona in when it becomes active. */
function useAppear(ref: React.RefObject<THREE.Group | null>, active: boolean) {
  useFrame((_, dt) => {
    if (!ref.current) return;
    const target = active ? 1 : 0.001;
    const s = THREE.MathUtils.damp(ref.current.scale.x, target, 6, dt);
    ref.current.scale.setScalar(s);
    ref.current.visible = s > 0.01;
  });
}

const glossy = { roughness: 0.12, metalness: 0.55, envMapIntensity: 1.3 };

/* ---------- Persona 1: The Analyst (a glossy 3D bar chart) ---------- */
function BarChart({ still }: { still: boolean }) {
  const bars = useRef<THREE.Mesh[]>([]);
  const heights = [0.9, 1.5, 1.2, 2.1, 2.7];
  const colors = ["#3b5bff", "#5b8cff", "#7a6bff", "#a970ff", "#ff9a4d"];
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    bars.current.forEach((m, i) => {
      if (!m) return;
      const h = still ? heights[i] : heights[i] * (0.85 + 0.15 * Math.sin(t * 1.3 + i * 0.9));
      m.scale.y = h;
      m.position.y = h / 2 - 1.3;
    });
  });
  return (
    <group rotation={[0.35, -0.6, 0]}>
      {heights.map((_, i) => (
        <mesh key={i} ref={(el) => { if (el) bars.current[i] = el; }} position={[i * 0.75 - 1.5, 0, 0]}>
          <boxGeometry args={[0.5, 1, 0.5]} />
          <meshStandardMaterial color={colors[i]} {...glossy} />
        </mesh>
      ))}
      <mesh position={[0, -1.32, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[2.6, 64]} />
        <meshStandardMaterial color="#15151c" roughness={0.4} metalness={0.3} />
      </mesh>
    </group>
  );
}

/* ---------- Persona 2: The Traveler (a globe with orbiting islands) ---------- */
function Globe({ still }: { still: boolean }) {
  const spin = useRef<THREE.Group>(null);
  const orbit = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (still) return;
    if (spin.current) spin.current.rotation.y += dt * 0.25;
    if (orbit.current) orbit.current.rotation.y -= dt * 0.5;
  });
  const dots = useMemo(() => Array.from({ length: 10 }, (_, i) => (i / 10) * Math.PI * 2), []);
  return (
    <group rotation={[0.3, 0, 0.2]}>
      <group ref={spin}>
        <mesh>
          <sphereGeometry args={[1.35, 64, 64]} />
          <meshStandardMaterial color="#0e7490" {...glossy} />
        </mesh>
        <mesh scale={1.37}>
          <icosahedronGeometry args={[1, 3]} />
          <meshBasicMaterial color="#5eead4" wireframe transparent opacity={0.35} />
        </mesh>
      </group>
      <group ref={orbit} rotation-x={0.5}>
        <mesh rotation-x={Math.PI / 2}>
          <torusGeometry args={[2.1, 0.012, 8, 128]} />
          <meshBasicMaterial color="#f5b83d" />
        </mesh>
        {dots.map((a, i) => (
          <mesh key={i} position={[Math.cos(a) * 2.1, 0, Math.sin(a) * 2.1]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial color="#f5b83d" emissive="#f5b83d" emissiveIntensity={0.6} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ---------- Persona 3: The Teammate (three linked rings) ---------- */
function Rings({ still }: { still: boolean }) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!still && g.current) g.current.rotation.z += dt * 0.2;
  });
  const cols = ["#5b8cff", "#a970ff", "#ff9a4d"];
  return (
    <group ref={g}>
      {cols.map((c, i) => {
        const a = (i / 3) * Math.PI * 2;
        return (
          <mesh key={c} position={[Math.cos(a) * 0.75, Math.sin(a) * 0.75, 0]} rotation={[a, 0.9, a / 2]}>
            <torusGeometry args={[1, 0.18, 32, 96]} />
            <meshStandardMaterial color={c} {...glossy} />
          </mesh>
        );
      })}
    </group>
  );
}

export function PersonaScene({ active, still }: { active: number; still: boolean }) {
  const tilt = useRef<THREE.Group>(null);
  const a = useRef<THREE.Group>(null);
  const b = useRef<THREE.Group>(null);
  const c = useRef<THREE.Group>(null);
  usePointerTilt(tilt, still);
  useAppear(a, active === 0);
  useAppear(b, active === 1);
  useAppear(c, active === 2);
  return (
    <group ref={tilt}>
      <Float speed={still ? 0 : 1.4} floatIntensity={still ? 0 : 0.8} rotationIntensity={still ? 0 : 0.3}>
        <group ref={a}><BarChart still={still} /></group>
        <group ref={b}><Globe still={still} /></group>
        <group ref={c}><Rings still={still} /></group>
      </Float>
    </group>
  );
}

/* ---------- Portfolio: a retro computer showing a live dashboard ---------- */
function useDashboardTexture(still: boolean) {
  const { canvas, tex } = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 384;
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return { canvas, tex };
  }, []);
  useFrame((state) => {
    const t = still ? 2 : state.clock.elapsedTime;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#0b0b0f";
    ctx.fillRect(0, 0, 512, 384);
    ctx.fillStyle = "#5b8cff";
    ctx.font = "bold 26px monospace";
    ctx.fillText("SESSIONS  ▲ 24%", 28, 50);
    ctx.fillStyle = "#a8a8b3";
    ctx.font = "16px monospace";
    ctx.fillText("GA4 · LAST 28 DAYS", 28, 76);
    // line chart
    ctx.strokeStyle = "#ff9a4d";
    ctx.lineWidth = 4;
    ctx.beginPath();
    for (let x = 0; x <= 456; x += 8) {
      const y = 220 - x * 0.18 - Math.sin(x / 40 + t * 1.5) * 18;
      if (x === 0) ctx.moveTo(28 + x, y);
      else ctx.lineTo(28 + x, y);
    }
    ctx.stroke();
    // bars
    for (let i = 0; i < 8; i++) {
      const h = 40 + ((Math.sin(t * 1.2 + i) + 1) / 2) * 60 + i * 6;
      ctx.fillStyle = i % 2 ? "#5b8cff" : "#a970ff";
      ctx.fillRect(28 + i * 58, 350 - h, 40, h);
    }
    tex.needsUpdate = true;
  });
  return tex;
}

export function MonitorScene({ still }: { still: boolean }) {
  const tilt = useRef<THREE.Group>(null);
  usePointerTilt(tilt, still, 0.45);
  const screen = useDashboardTexture(still);
  const beige = "#e8e3d6";
  return (
    <group ref={tilt}>
      <Float speed={still ? 0 : 1.2} floatIntensity={still ? 0 : 0.6} rotationIntensity={0}>
        <group rotation={[0.08, -0.35, 0]} position={[0, 0.2, 0]}>
          <RoundedBox args={[3.2, 2.6, 2.4]} radius={0.25} smoothness={6} position={[0, 0.3, -0.6]}>
            <meshStandardMaterial color={beige} roughness={0.45} metalness={0.05} />
          </RoundedBox>
          <mesh position={[0, 0.38, 0.62]}>
            <planeGeometry args={[2.5, 1.9]} />
            <meshBasicMaterial map={screen} toneMapped={false} />
          </mesh>
          <RoundedBox args={[1.6, 0.25, 1.4]} radius={0.08} position={[0, -1.15, -0.5]}>
            <meshStandardMaterial color={beige} roughness={0.5} />
          </RoundedBox>
          <mesh position={[0.9, -0.75, 0.62]}>
            <boxGeometry args={[0.5, 0.06, 0.02]} />
            <meshStandardMaterial color="#b9b3a3" />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

/* ---------- Study abroad / contact: a crystal with orbit lines ---------- */
export function CrystalScene({ still, color = "#5eead4" }: { still: boolean; color?: string }) {
  const tilt = useRef<THREE.Group>(null);
  const gem = useRef<THREE.Mesh>(null);
  usePointerTilt(tilt, still, 0.3);
  useFrame((_, dt) => {
    if (!still && gem.current) gem.current.rotation.y += dt * 0.6;
  });
  const ellipse = (rx: number, rz: number) =>
    Array.from({ length: 129 }, (_, i) => {
      const a = (i / 128) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(a) * rx, 0, Math.sin(a) * rz);
    });
  const orbits = useMemo(() => [ellipse(3.2, 1.1), ellipse(2.6, 1.6), ellipse(3.6, 0.7)], []);
  return (
    <group ref={tilt}>
      <Float speed={still ? 0 : 1.5} floatIntensity={still ? 0 : 1}>
        <mesh ref={gem} scale={[0.9, 1.5, 0.9]}>
          <octahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial color={color} distort={0} roughness={0.05} metalness={0.3} envMapIntensity={2} flatShading />
        </mesh>
      </Float>
      {orbits.map((pts, i) => (
        <group key={i} rotation={[0.25 * i - 0.2, 0, 0.15 * (i - 1)]}>
          <Line points={pts} color={i === 1 ? "#a970ff" : "#5b8cff"} lineWidth={1} transparent opacity={0.6} />
        </group>
      ))}
    </group>
  );
}
