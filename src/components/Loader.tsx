"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/** Short intro screen on the first visit of a session. Skipped for reduced motion. */
export default function Loader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro-seen") === "1";
      sessionStorage.setItem("intro-seen", "1");
    } catch {}
    if (seen || reduce) return;
    setShow(true);
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setPct(Math.round(100 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
      else setTimeout(() => setShow(false), 250);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="status"
          aria-label="Loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink"
        >
          <p className="label text-muted">Loading portfolio</p>
          <p className="display mt-4 text-6xl text-fg tabular-nums">{pct}%</p>
          <div className="mt-6 h-px w-56 bg-line">
            <div className="h-px bg-accent" style={{ width: `${pct}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
