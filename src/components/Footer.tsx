import Link from "next/link";
import { nav, site } from "@/lib/site";

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-lg font-semibold">
            Bryce McAnany<span className="text-accent">.</span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Digital marketing and analytics. Senior at James Madison University, graduating May 2027.
          </p>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm text-muted hover:text-accent"
          >
            <LinkedInIcon /> Connect on LinkedIn
          </a>
        </div>
        <nav aria-label="Footer">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">Pages</p>
          <ul className="space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-accent">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">More</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={site.resumePath} download className="hover:text-accent">
                Download resume (PDF)
              </a>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-accent">
                Privacy policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="border-t border-line px-6 py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} Bryce McAnany. All photos are my own unless noted.
      </p>
    </footer>
  );
}

export { LinkedInIcon };
