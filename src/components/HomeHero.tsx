"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { BarChart3, Compass, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Typewriter from "@/components/Typewriter";
import { Button } from "@/components/ui";

const LazyCanvas = dynamic(() => import("@/components/three/LazyCanvas"), { ssr: false });
const PersonaScene = dynamic(() => import("@/components/three/scenes").then((m) => m.PersonaScene), { ssr: false });

// The three core attributes from my brand audit, each with its own 3D object.
const personas = [
  { key: "analyst", label: "Analyst", Icon: BarChart3, line: "The Analyst", blurb: "I turn messy marketing data into clear next steps. Right now that means GA4 and reporting for a multi-brand home services franchisor." },
  { key: "traveler", label: "Traveler", Icon: Compass, line: "The Traveler", blurb: "Three weeks, ten Greek islands, and a week in Turkey taught me to start with the audience before the message." },
  { key: "teammate", label: "Teammate", Icon: Users, line: "The Teammate", blurb: "My best work has come from groups: class teams, client projects, and the marketing team at Premium Service Brands." },
];

export default function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "20%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0.15]);

  // Auto-cycle personas until the visitor picks one.
  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % personas.length), 6000);
    return () => clearInterval(t);
  }, [reduce, paused]);

  const p = personas[active];

  return (
    <section ref={ref} aria-labelledby="hero-title" className="grain relative min-h-[100svh] overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-10 h-[480px] w-[480px] rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute -right-20 bottom-0 h-[420px] w-[420px] rounded-full bg-warm/15 blur-[120px]" />
      </div>

      <motion.div style={{ y: sceneY, opacity: fade }} className="absolute inset-0 md:left-[30%]">
        {/* On phones the scene sits low and dimmed so it never fights the text. */}
        <div className="absolute inset-x-0 bottom-0 h-[42%] opacity-45 md:inset-0 md:h-full md:opacity-100">
          <LazyCanvas className="h-full w-full" camera={{ position: [0, 0, 7.5], fov: 40 }}>
            {(still) => <PersonaScene active={active} still={still} />}
          </LazyCanvas>
        </div>
      </motion.div>

      {/* HUD frame lines, like a viewfinder */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-4 z-10 hidden md:block">
        <div className="absolute left-0 top-20 bottom-0 w-px bg-line" />
        <div className="absolute right-0 top-20 bottom-0 w-px bg-line" />
        <span className="label absolute bottom-3 left-4 text-muted">Harrisonburg, VA · JMU &apos;27</span>
        <span className="label absolute bottom-3 right-4 text-muted">Scroll to explore ↓</span>
      </div>

      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-6 pb-24 pt-32">
        {/* Persona picker */}
        <div role="tablist" aria-label="Choose a side of Bryce" className="mb-10 flex gap-3">
          {personas.map((x, i) => (
            <button
              key={x.key}
              role="tab"
              aria-selected={active === i}
              aria-controls="persona-panel"
              onClick={() => {
                setActive(i);
                setPaused(true);
              }}
              className={`group flex flex-col items-center gap-2 rounded-xl border px-4 py-3 transition-colors ${
                active === i ? "border-accent bg-accent text-ink" : "border-line bg-ink/60 text-muted hover:text-fg"
              }`}
            >
              <x.Icon aria-hidden="true" className="h-5 w-5" />
              <span className="label !text-[0.65rem]">{x.label}</span>
            </button>
          ))}
        </div>

        <h1 id="hero-title" className="display text-6xl md:text-8xl">
          Bryce
          <br />
          McAnany
        </h1>
        <div id="persona-panel" role="tabpanel" aria-live="polite" className="mt-4">
          <Typewriter
            key={p.key}
            as="p"
            lines={[p.line]}
            speed={60}
            className="display text-3xl text-accent md:text-5xl"
          />
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{p.blurb}</p>
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/portfolio">See my work</Button>
          <Button href="/about" variant="ghost">
            Read my story
          </Button>
        </div>
      </div>
    </section>
  );
}
