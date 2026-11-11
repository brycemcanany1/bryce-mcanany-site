"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";

/**
 * Site-wide "pause motion" setting (WCAG 2.2.2 Pause, Stop, Hide).
 * Motion is off if the visitor presses the pause button OR has reduce motion turned on in their device settings.
 */
const Ctx = createContext<{ paused: boolean; toggle: () => void }>({ paused: false, toggle: () => {} });

export function MotionProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    try {
      setPaused(localStorage.getItem("motion-paused") === "1");
    } catch {}
  }, []);
  const toggle = () =>
    setPaused((p) => {
      try {
        localStorage.setItem("motion-paused", p ? "0" : "1");
      } catch {}
      return !p;
    });
  return <Ctx.Provider value={{ paused, toggle }}>{children}</Ctx.Provider>;
}

/** True when animations should be still. Use this instead of useReducedMotion. */
export function useStill() {
  const reduce = useReducedMotion();
  const { paused } = useContext(Ctx);
  return Boolean(reduce) || paused;
}

export function MotionToggle({ className = "" }: { className?: string }) {
  const { paused, toggle } = useContext(Ctx);
  const reduce = useReducedMotion();
  if (reduce) return null; // device setting already stops motion
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      className={`label inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 py-2 text-muted hover:border-accent hover:text-fg ${className}`}
    >
      {paused ? <Play aria-hidden="true" className="h-3.5 w-3.5" /> : <Pause aria-hidden="true" className="h-3.5 w-3.5" />}
      {paused ? "Play motion" : "Pause motion"}
    </button>
  );
}
