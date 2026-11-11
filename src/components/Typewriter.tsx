"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useStill } from "@/components/MotionPref";

/**
 * Types text out letter by letter with a block cursor when it scrolls into view.
 * Accessibility:
 *  - Screen readers get the full text immediately from a visually hidden copy.
 *  - The cursor stays solid while typing and blinks only 3 times after (under 5 seconds, WCAG 2.2.2).
 *  - With motion paused or reduced, the full text shows instantly.
 */
export default function Typewriter({
  lines,
  speed = 45,
  startDelay = 150,
  className = "",
  as: Tag = "h2",
  id,
}: {
  lines: string[];
  speed?: number;
  startDelay?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const still = useStill();
  const full = lines.join("\n");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || still) return;
    setCount(0);
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      setCount(i);
      if (i < full.length) timer = setTimeout(tick, full[i - 1] === "\n" ? speed * 6 : speed);
    };
    timer = setTimeout(tick, startDelay);
    return () => clearTimeout(timer);
  }, [inView, still, full, speed, startDelay]);

  const shown = still ? full : full.slice(0, count);
  const done = shown.length >= full.length;
  const visibleLines = shown.split("\n");

  return (
    <Tag ref={ref} id={id} className={className}>
      <span className="sr-only">{lines.join(" ")}</span>
      <span aria-hidden="true" className="relative block">
        {/* Invisible full text reserves the space so the layout never jumps. */}
        <span className="invisible block">
          {lines.map((l, i) => (
            <span key={i} className="block">
              {l}
              <span className="type-cursor" />
            </span>
          ))}
        </span>
        <span className="absolute inset-0 block">
          {visibleLines.map((l, i) => (
            <span key={i} className="block">
              {l}
              {i === visibleLines.length - 1 && (
                <span className={`type-cursor ${done && !still ? "type-cursor-blink" : ""}`} />
              )}
            </span>
          ))}
        </span>
      </span>
    </Tag>
  );
}
