"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import type { ReactNode } from "react";

/** Fades content up into view as the visitor scrolls (skipped for reduced motion). */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  download,
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  download?: boolean;
  external?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors";
  const styles =
    variant === "primary"
      ? "bg-accent text-ink hover:bg-white"
      : "border border-line text-fg hover:border-accent hover:text-accent";
  if (download || external) {
    return (
      <a
        href={href}
        className={`${base} ${styles}`}
        {...(download ? { download: "" } : {})}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

/** A captioned photo. If the photo isn't added yet, shows a labeled placeholder. */
export function Photo({
  src,
  alt,
  caption,
  aspect = "aspect-[4/5]",
  priority,
  placeholder,
}: {
  src: string | null;
  alt: string;
  caption?: ReactNode;
  aspect?: string;
  priority?: boolean;
  placeholder?: string;
}) {
  return (
    <figure className="group">
      <div className={`relative ${aspect} overflow-hidden rounded-3xl border border-line bg-surface`}>
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            role="img"
            aria-label={alt}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-linear-to-br from-surface-2 to-ink text-center text-muted"
          >
            <ImageIcon aria-hidden="true" className="h-8 w-8" />
            <span className="px-6 text-sm">{placeholder ?? "Photo coming soon"}</span>
          </div>
        )}
      </div>
      {caption && <figcaption className="mt-3 text-sm leading-relaxed text-muted">{caption}</figcaption>}
    </figure>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="label mb-4 text-accent">/ {children} /</p>;
}

/** Shared page header with a soft color glow behind it. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  glow = "from-accent/40 via-accent-2/20",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  glow?: string;
}) {
  return (
    <header className="grain relative overflow-hidden border-b border-line">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-linear-to-b ${glow} to-transparent blur-3xl`}
      />
      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-36 md:pb-24 md:pt-44">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="display max-w-5xl text-5xl md:text-7xl">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>}
        </Reveal>
      </div>
    </header>
  );
}

export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-6 py-20 md:py-28 ${className}`}>
      {children}
    </section>
  );
}

/** Card linking to another page; used for calls to action between pages. */
export function LinkCard({ href, title, children }: { href: string; title: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col justify-between rounded-3xl border border-line bg-surface p-7 transition-colors hover:border-accent"
    >
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-3 leading-relaxed text-muted">{children}</p>
      </div>
      <span className="mt-6 text-sm font-semibold text-accent">
        Explore <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}
