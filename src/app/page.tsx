import Link from "next/link";
import Image from "next/image";
import HomeHero from "@/components/HomeHero";
import Loader from "@/components/Loader";
import Typewriter from "@/components/Typewriter";
import { HomeCrystal, HomeMonitor } from "@/components/HomeScenes";
import { Button, Photo, Reveal } from "@/components/ui";
import { pageMeta, photos, site } from "@/lib/site";

export const metadata = pageMeta(
  "/",
  "Digital Marketing & Analytics",
  "Meet Bryce McAnany, a JMU Marketing senior who manages GA4 and reporting for a multi-brand franchise company. See his portfolio, study abroad story, and resume."
);

const stats = [
  { value: "GA4", label: "Google Analytics certified" },
  { value: "4", label: "JMU projects in my portfolio" },
  { value: "10", label: "Greek islands visited" },
  { value: "2027", label: "Graduating in May" },
];

const trip = [
  { src: photos.symiSunset, alt: "Boats in the harbor of Gialos on Symi at sunset", place: "Symi" },
  { src: photos.patmos, alt: "Waterfront monument and flags in Skala, the port town of Patmos", place: "Patmos" },
  { src: photos.symiFlags, alt: "Greek flags and the flag of Archangel Michael over a stone bridge in Gialos, Symi", place: "Symi" },
  { src: photos.symiNight, alt: "The harbor of Gialos on Symi lit up at night under a full moon", place: "Symi at night" },
];

export default function Home() {
  return (
    <>
      <Loader />
      <HomeHero />

      {/* ABOUT: light section */}
      <section aria-labelledby="about-title" className="bg-paper text-paper-ink">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <p className="label text-paper-muted">[ About ]</p>
          <div className="mt-8 grid gap-14 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <Typewriter
                id="about-title"
                lines={["Marketer by training.", "Analyst by habit."]}
                className="display text-5xl md:text-7xl"
              />
              <Reveal delay={0.2}>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper-muted">
                  I&apos;m a senior at James Madison University studying Marketing with a concentration in Digital
                  Marketing. Most of my week goes to Premium Service Brands, where I help home services brands
                  understand what their data is telling them.
                </p>
                <Link href="/about" className="label mt-8 inline-block border-b-2 border-paper-ink pb-1 hover:opacity-70">
                  Read my story →
                </Link>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <Photo
                src={photos.headshot}
                alt="Professional headshot of Bryce McAnany in a navy suit, smiling outdoors"
                placeholder="Add headshot: public/images/headshot.jpg"
              />
            </Reveal>
          </div>
          <dl className="mt-20 grid grid-cols-2 border-t border-paper-ink/20 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="border-b border-paper-ink/20 py-8 pr-4 md:border-b-0 md:border-r md:last:border-r-0 md:pl-6 md:first:pl-0">
                <dt className="label text-paper-muted">{s.label}</dt>
                <dd className="display mt-3 text-5xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* PORTFOLIO: orange room with a 3D computer */}
      <section aria-labelledby="work-title" className="relative overflow-hidden bg-[#e8901f] text-paper-ink">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute inset-y-0 left-[12%] w-px bg-paper-ink" />
          <div className="absolute inset-y-0 right-[12%] w-px bg-paper-ink" />
          <div className="absolute inset-x-0 top-1/3 h-px bg-paper-ink" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
          <p className="label text-center">/ Portfolio /</p>
          <Typewriter id="work-title" lines={["See the work"]} className="display mt-6 text-center text-5xl md:text-7xl" />
          <HomeMonitor />
          <div className="grid gap-5 md:grid-cols-2">
            {[
              { n: "01", href: "/portfolio/class-projects", t: "Class projects", d: "Analytics, IMC, consumer behavior, and social strategy work from JMU." },
              { n: "02", href: "/portfolio/internship", t: "PSB internship", d: "GA4, account audits, owner reporting, and my final presentation." },
            ].map((c) => (
              <Reveal key={c.n}>
                <Link href={c.href} className="group block rounded-2xl bg-paper-ink p-8 text-fg transition-transform hover:-translate-y-1">
                  <p className="label text-warm">{c.n}</p>
                  <h3 className="display mt-3 text-3xl">{c.t}</h3>
                  <p className="mt-3 text-muted">{c.d}</p>
                  <span className="label mt-6 inline-block text-accent">Open →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STUDY ABROAD: dark with crystal and photo strip */}
      <section aria-labelledby="abroad-title" className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-24 md:grid-cols-2 md:pt-32">
          <div>
            <p className="label text-accent">/ Study abroad /</p>
            <Typewriter
              id="abroad-title"
              lines={["Ten islands.", "Two countries."]}
              className="display mt-6 text-5xl md:text-7xl"
            />
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                Three weeks studying consumer behavior and services marketing by boat through the Greek islands,
                then a week in Bodrum, Turkey.
              </p>
              <div className="mt-8">
                <Button href="/study-abroad">Explore the trip</Button>
              </div>
            </Reveal>
          </div>
          <HomeCrystal />
        </div>
        <ul className="mt-16 flex gap-5 overflow-x-auto px-6 pb-24 md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]">
          {trip.map((t) => (
            <li key={t.alt} className="w-64 shrink-0 md:w-72">
              <figure>
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-line">
                  {t.src && <Image src={t.src} alt={t.alt} fill sizes="300px" className="object-cover" />}
                </div>
                <figcaption className="label mt-3 text-muted">{t.place}, Greece</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      {/* RESUME: light */}
      <section aria-labelledby="resume-title" className="bg-paper text-paper-ink">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 px-6 py-24 md:flex-row md:items-end">
          <div>
            <p className="label text-paper-muted">[ Resume ]</p>
            <Typewriter id="resume-title" lines={["Ready when", "you are."]} className="display mt-6 text-5xl md:text-7xl" />
          </div>
          <div className="flex flex-wrap gap-4">
            <a href={site.resumePath} download className="rounded-full bg-paper-ink px-6 py-3 text-sm font-semibold text-fg hover:bg-accent hover:text-ink">
              Download resume (PDF)
            </a>
            <Link href="/resume" className="rounded-full border border-paper-ink px-6 py-3 text-sm font-semibold hover:bg-paper-ink hover:text-fg">
              View online
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT: final dark */}
      <section aria-labelledby="contact-title" className="grain relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[140px]" />
        <div className="relative mx-auto max-w-4xl px-6 py-32 text-center md:py-44">
          <p className="label text-muted">Open to entry level marketing and analytics roles</p>
          <Typewriter id="contact-title" lines={["Let's connect."]} className="display mt-6 text-5xl md:text-8xl" />
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/contact">Get in touch</Button>
            <Button href={site.linkedin} variant="ghost" external>
              LinkedIn
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
