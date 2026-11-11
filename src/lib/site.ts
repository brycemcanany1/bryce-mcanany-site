// Central place for everything Bryce will want to edit later:
// links, IDs, and which photos exist yet.

export const site = {
  name: "Bryce McAnany",
  title: "Bryce McAnany | Digital Marketing & Analytics",
  description:
    "Bryce McAnany is a senior Marketing student at James Madison University focused on digital marketing and analytics, with internship experience running GA4 and reporting for a multi-brand franchise company.",
  // Set NEXT_PUBLIC_SITE_URL in Vercel once the final domain is chosen.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://bryce-mcanany-site.vercel.app",
  keywords: [
    "Bryce McAnany",
    "digital marketing",
    "marketing analytics",
    "Google Analytics 4",
    "James Madison University",
    "JMU marketing",
    "marketing intern",
  ],
  linkedin: "https://www.linkedin.com/in/bryce-mcanany-5869bb298/",
  // Paste the Formspree form ID here (or set NEXT_PUBLIC_FORMSPREE_ID in Vercel).
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID || "",
  // Paste the YouTube video ID (the part after v=) once the video is uploaded.
  youtubeId: process.env.NEXT_PUBLIC_YOUTUBE_ID || "",
  resumePath: "/resume.pdf",
};

export type NavItem = { href: string; label: string; children?: { href: string; label: string }[] };

export const nav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    href: "/portfolio",
    label: "Portfolio",
    children: [
      { href: "/portfolio/class-projects", label: "Class Projects" },
      { href: "/portfolio/internship", label: "PSB Internship" },
    ],
  },
  {
    href: "/study-abroad",
    label: "Study Abroad",
    children: [
      { href: "/study-abroad/greek-islands", label: "Greek Islands" },
      { href: "/study-abroad/bodrum", label: "Bodrum, Turkey" },
    ],
  },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

// Photos. When a value is null, a labeled placeholder shows instead,
// so the site still builds before every photo is added.
export const photos = {
  headshot: null as string | null, // add /images/headshot.jpg
  contact: null as string | null, // add /images/contact.jpg
  presenting: null as string | null, // add /images/presenting.jpg
  kosGroup: null as string | null, // add /images/kos-group.jpg
  bodrum: null as string | null, // add /images/bodrum.jpg
  symiSunset: "/images/symi-harbor-sunset.jpg",
  symiNight: "/images/symi-harbor-night.jpg",
  symiFlags: "/images/symi-gialos-flags.jpg",
  patmos: "/images/patmos-skala-harbor.jpg",
};

import type { Metadata } from "next";

/** Per-page SEO: title, meta description, canonical URL, and share preview. */
export function pageMeta(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | Bryce McAnany`, description, url: path },
  };
}
