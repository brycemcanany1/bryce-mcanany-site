"use client";

import dynamic from "next/dynamic";

const LazyCanvas = dynamic(() => import("@/components/three/LazyCanvas"), { ssr: false });
const MonitorScene = dynamic(() => import("@/components/three/scenes").then((m) => m.MonitorScene), { ssr: false });
const CrystalScene = dynamic(() => import("@/components/three/scenes").then((m) => m.CrystalScene), { ssr: false });

export function HomeMonitor() {
  return (
    <LazyCanvas className="mx-auto my-6 h-[360px] w-full max-w-3xl md:h-[460px]" camera={{ position: [0, 0, 7], fov: 40 }}>
      {(still) => <MonitorScene still={still} />}
    </LazyCanvas>
  );
}

export function HomeCrystal() {
  return (
    <LazyCanvas className="h-[340px] w-full md:h-[440px]" camera={{ position: [0, 0.6, 8], fov: 40 }}>
      {(still) => <CrystalScene still={still} />}
    </LazyCanvas>
  );
}
