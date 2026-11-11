import ShareButtons from "@/components/ShareButtons";
import { Button, Eyebrow, PageHeader, Photo, Reveal, Section } from "@/components/ui";
import { pageMeta, photos } from "@/lib/site";

export const metadata = pageMeta(
  "/portfolio/internship",
  "Premium Service Brands Internship",
  "Bryce McAnany's digital marketing internship at Premium Service Brands: connecting GA4 across franchise brands, auditing marketing accounts, and building a YouTube strategy for franchise owners."
);

const work = [
  {
    title: "Connected GA4 across the franchise brands",
    body: "I connected Google Analytics 4 to each brand's data and helped audit the Google Tag Manager setup behind it, so the marketing team could trust what the numbers were saying.",
  },
  {
    title: "Audited and recovered marketing accounts",
    body: "I audited every franchise's marketing account logins, documented who owned what, and recovered the accounts that had been lost.",
  },
  {
    title: "Built a YouTube strategy guide for owners",
    body: "I created a hub and spoke YouTube playbook that shows franchise owners how their local channels can support the national brand.",
  },
  {
    title: "Built monthly owner reports",
    body: "I build Looker Studio reports that turn each location's data into a clear monthly snapshot franchise owners can act on.",
  },
];

export default function Internship() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio · Internship"
        title={
          <>
            Digital Marketing Intern at <span className="text-gradient">Premium Service Brands.</span>
          </>
        }
        intro="Premium Service Brands is a home services franchisor behind brands like 360° Painting, Maid Right, and Window Gang. I started in summer 2026 and stayed on part time through my senior year."
        glow="from-accent/45 via-accent-2/25"
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {work.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.06}>
              <article className="h-full rounded-3xl border border-line bg-surface p-8">
                <h2 className="text-xl font-semibold">{w.title}</h2>
                <p className="mt-3 leading-relaxed text-muted">{w.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <Photo
              src={photos.presenting}
              alt="Bryce presenting his final internship project, titled From Audit to Action, to the Premium Service Brands team"
              placeholder="Add presentation photo: public/images/presenting.jpg"
              aspect="aspect-[4/3]"
              caption="Presenting From Audit to Action at the Charlottesville office."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>Final presentation</Eyebrow>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">From Audit to Action</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              To wrap up my summer, I presented my work to the marketing team and company leadership. For each
              project I walked through what I found, what it meant for the business, and what I recommended going
              forward. It gave me real experience turning data into a story people could act on.
            </p>
            <div className="mt-8">
              <Button href="/resume">See it on my resume</Button>
            </div>
          </Reveal>
        </div>
        <div className="mt-16">
          <ShareButtons path="/portfolio/internship" title="Bryce McAnany's internship at Premium Service Brands" />
        </div>
      </Section>
    </>
  );
}
