import ShareButtons from "@/components/ShareButtons";
import { LinkCard, PageHeader, Reveal, Section } from "@/components/ui";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "/portfolio",
  "Portfolio",
  "Bryce McAnany's marketing portfolio: JMU class projects in analytics, IMC, and social media strategy, plus internship work in GA4 and reporting at Premium Service Brands."
);

export default function Portfolio() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title={
          <>
            Work from the classroom <span className="text-gradient">and the real world.</span>
          </>
        }
        intro="My portfolio is split into two parts: projects from my JMU marketing classes, and the analytics work I've done as an intern at Premium Service Brands."
        glow="from-accent/45 via-accent-2/25"
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <LinkCard href="/portfolio/class-projects" title="JMU Class Projects">
              Four projects from Marketing Analytics, Consumer Behavior, IMC, and Social Media Marketing, each with
              a short write up on what I did and what I learned.
            </LinkCard>
          </Reveal>
          <Reveal delay={0.1}>
            <LinkCard href="/portfolio/internship" title="Premium Service Brands Internship">
              GA4 setup across franchise brands, a marketing account audit, a YouTube playbook for owners, and my
              final presentation, From Audit to Action.
            </LinkCard>
          </Reveal>
        </div>
        <div className="mt-14">
          <ShareButtons path="/portfolio" title="Bryce McAnany's marketing portfolio" />
        </div>
      </Section>
    </>
  );
}
