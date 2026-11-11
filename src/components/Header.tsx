"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { nav } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  // Escape closes any open menu (keyboard users).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setOpenMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-line bg-ink/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="display text-lg">
          Bryce McAnany<span className="text-accent">.</span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setOpenMenu(item.href)}
                onMouseLeave={() => item.children && setOpenMenu(null)}
              >
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={`label rounded-full px-3 py-2 transition-colors ${
                      isActive(item.href) ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      aria-label={`Show ${item.label} pages`}
                      aria-expanded={openMenu === item.href}
                      aria-controls={`menu-${item.label}`}
                      onClick={() => setOpenMenu(openMenu === item.href ? null : item.href)}
                      className="-ml-2 rounded-full p-1 text-muted hover:text-fg"
                    >
                      <ChevronDown aria-hidden="true" className="h-4 w-4" />
                    </button>
                  )}
                </div>
                {item.children && openMenu === item.href && (
                  <ul
                    id={`menu-${item.label}`}
                    className="absolute left-0 top-full min-w-52 rounded-2xl border border-line bg-surface p-2 shadow-2xl"
                  >
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          aria-current={pathname === c.href ? "page" : undefined}
                          className="block rounded-xl px-4 py-2.5 text-sm text-muted hover:bg-surface-2 hover:text-fg"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="rounded-full p-2 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line px-6 pb-6 lg:hidden">
          <ul className="flex flex-col gap-1 pt-4">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block py-2 text-lg">
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="ml-4 border-l border-line pl-4">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} className="block py-1.5 text-muted">
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
