"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Types text out letter by letter with a blinking block cursor when it scrolls into view.
 * Screen readers always get the full text right away; reduced motion shows it instantly.
 * Pass several lines to type them one after another.
 */
export default function Typewriter({
  lines,
  speed = 45,
  startDelay = 150,
  className = "",
  as: Tag = "h2",
  keepCursor = true,
  id,
}: {
  lines: string[];
  speed?: number;
  startDelay?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  keepCursor?: boolean;
  id?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const full = lines.join("\n");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
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
  }, [inView, reduce, full, speed, startDelay]);

  const shown = reduce ? full : full.slice(0, count);
  const done = shown.length >= full.length;
  const visibleLines = shown.split("\n");

  return (
    <Tag ref={ref} id={id} className={className} aria-label={lines.join(" ")}>
      {/* Invisible full text reserves the space so the layout never jumps. */}
      <span aria-hidden="true" className="relative block">
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
              {i === visibleLines.length - 1 && (!done || keepCursor) && <span className="type-cursor" />}
            </span>
          ))}
        </span>
      </span>
    </Tag>
  );
}
