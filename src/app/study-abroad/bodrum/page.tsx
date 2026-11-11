import ShareButtons from "@/components/ShareButtons";
import { Button, Eyebrow, PageHeader, Photo, Reveal, Section } from "@/components/ui";
import { pageMeta, photos } from "@/lib/site";

export const metadata = pageMeta(
  "/study-abroad/bodrum",
  "Bodrum, Turkey",
  "Bryce McAnany's final week of study abroad in Bodrum, Turkey, and what comparing Greek and Turkish consumer culture taught him about marketing."
);

export default function Bodrum() {
  return (
    <>
      <PageHeader
        eyebrow="Study abroad · Bodrum"
        title={
          <>
            One week in <span className="text-gradient">Bodrum, Turkey.</span>
          </>
        }
        intro="After two weeks on the water, we finished the program with a week on the Turkish coast."
        glow="from-[#f5b83d]/40 via-warm/20"
      />
      <Section>
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <Photo
              src={photos.bodrum}
              alt="[Describe the Bodrum photo here for screen readers]"
              placeholder="Add Bodrum photo: public/images/bodrum.jpg"
              caption="[Add a caption for your Bodrum photo.]"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>Crossing cultures</Eyebrow>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Same message, different audience</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Bodrum gave us a direct comparison to everything we had seen in Greece. For my Consumer Behavior
              project, I compared the United States, Greece, and Turkey on competitive versus cooperative and
              masculine versus feminine values.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              [Add one or two things you noticed in Bodrum: how shops, restaurants, or hotels marketed themselves
              differently than in Greece.]
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/portfolio/class-projects">See the class project</Button>
              <Button href="/study-abroad" variant="ghost">
                Back to Study Abroad
              </Button>
            </div>
          </Reveal>
        </div>
        <div className="mt-16">
          <ShareButtons path="/study-abroad/bodrum" title="A week in Bodrum, Turkey" />
        </div>
      </Section>
    </>
  );
}
