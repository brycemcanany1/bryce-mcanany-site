import ShareButtons from "@/components/ShareButtons";
import { Eyebrow, LinkCard, PageHeader, Photo, Reveal, Section } from "@/components/ui";
import { pageMeta, photos, site } from "@/lib/site";

export const metadata = pageMeta(
  "/study-abroad",
  "Study Abroad in Greece & Turkey",
  "Bryce McAnany's JMU study abroad: three weeks studying consumer behavior and services marketing across ten Greek islands and Bodrum, Turkey."
);

// Real data from the trip for the infographic (rubric item 8).
const stats = [
  { value: 3, unit: "weeks", label: "abroad in summer 2026" },
  { value: 10, unit: "islands", label: "visited across the Greek Dodecanese" },
  { value: 2, unit: "countries", label: "Greece and Turkey" },
  { value: 6, unit: "credits", label: "earned toward my marketing degree" },
];

const timeline = [
  { weeks: "Weeks 1 and 2", place: "Greek islands", detail: "Living on a boat with our crew and professors, island hopping through the Dodecanese." },
  { weeks: "Week 3", place: "Bodrum, Turkey", detail: "A full week on the Turkish coast, comparing how businesses there connect with customers." },
];

export default function StudyAbroad() {
  return (
    <>
      <PageHeader
        eyebrow="Study abroad"
        title={
          <>
            Studying marketing on <span className="text-gradient">ten Greek islands.</span>
          </>
        }
        intro="This past summer I spent three weeks studying abroad in Greece and Turkey through JMU. I earned 6 credits in Consumer Behavior and Services Marketing while seeing firsthand how culture shapes the way people buy."
        glow="from-[#14b8a6]/40 via-[#f5b83d]/20"
      />

      <Section>
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <Photo
              src={photos.symiSunset}
              alt="Fishing boats and sailboats in the harbor of Gialos on the island of Symi at sunset, with colorful houses on the hills"
              caption="The harbor of Gialos on Symi at sunset. Photo by Bryce McAnany."
              priority
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>The experience</Eyebrow>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">A classroom that moved every day</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              For the first two weeks, my group lived aboard a boat alongside the crew and our professors, island
              hopping to ten different Greek islands. We finished with a week in Bodrum, Turkey.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Learning consumer behavior in a completely different culture changed how I think about marketing.
              What worked in Greece didn&apos;t always work in Turkey, and that taught me to start with the
              audience and let the numbers confirm it.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Infographic built from real trip data, readable by screen readers. */}
      <section aria-labelledby="by-numbers" className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <Eyebrow>Infographic</Eyebrow>
            <h2 id="by-numbers" className="text-3xl font-semibold tracking-tight md:text-4xl">
              The trip by the numbers
            </h2>
          </Reveal>
          <dl className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.unit} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-line bg-ink p-7">
                  <dt className="text-sm text-muted">{s.label}</dt>
                  <dd className="mt-3 flex items-baseline gap-2">
                    <span className="text-gradient text-6xl font-semibold">{s.value}</span>
                    <span className="text-lg text-fg">{s.unit}</span>
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
          <Reveal delay={0.2}>
            <ol className="mt-10 grid gap-6 md:grid-cols-[2fr_1fr]">
              {timeline.map((t, i) => (
                <li
                  key={t.place}
                  className={`rounded-3xl border border-line p-7 ${i === 0 ? "bg-[#14b8a6]/10" : "bg-[#f5b83d]/10"}`}
                >
                  <p className="text-sm font-semibold text-fg">{t.weeks}</p>
                  <p className="mt-1 text-2xl font-semibold">{t.place}</p>
                  <p className="mt-3 text-muted">{t.detail}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-muted">
              The timeline bars are sized to scale: two weeks in Greece, one week in Turkey.
            </p>
          </Reveal>
        </div>
      </section>

      <Section>
        <Reveal>
          <Eyebrow>Video</Eyebrow>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Watch the recap</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            A short recap of the trip, from the first island to our last night in Bodrum.
          </p>
          <div className="mt-8 aspect-video overflow-hidden rounded-3xl border border-line bg-surface">
            {site.youtubeId ? (
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${site.youtubeId}`}
                title="Study abroad recap video by Bryce McAnany"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full items-center justify-center p-8 text-center text-muted">
                Video coming soon. Add the YouTube video ID in src/lib/site.ts.
              </div>
            )}
          </div>
        </Reveal>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <LinkCard href="/study-abroad/greek-islands" title="The Greek Islands">
              Kos, Patmos, Symi, and the rest of the islands we explored by boat.
            </LinkCard>
          </Reveal>
          <Reveal delay={0.1}>
            <LinkCard href="/study-abroad/bodrum" title="Bodrum, Turkey">
              Our final week, and what changed when we crossed into a new culture.
            </LinkCard>
          </Reveal>
        </div>
        <div className="mt-14">
          <ShareButtons path="/study-abroad" title="Studying marketing abroad in Greece and Turkey" />
        </div>
      </Section>
    </>
  );
}
