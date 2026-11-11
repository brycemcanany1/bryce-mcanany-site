"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";
import { site } from "@/lib/site";

/** Social share buttons (rubric: Engagement & Growth). */
export default function ShareButtons({ path, title }: { path: string; title: string }) {
  const url = `${site.url}${path}`;
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;
  const links = [
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { label: "X", href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm text-muted">Share this page:</span>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${l.label} (opens in a new tab)`}
          className="rounded-full border border-line px-4 py-2 text-sm hover:border-accent hover:text-accent"
        >
          {l.label}
        </a>
      ))}
      <button
        type="button"
        onClick={async () => {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm hover:border-accent hover:text-accent"
      >
        {copied ? <Check aria-hidden="true" className="h-4 w-4" /> : <Link2 aria-hidden="true" className="h-4 w-4" />}
        <span aria-live="polite">{copied ? "Link copied" : "Copy link"}</span>
      </button>
    </div>
  );
}
