import ShareButtons from "@/components/ShareButtons";
import { Button, Eyebrow, PageHeader, Photo, Reveal, Section } from "@/components/ui";
import { pageMeta, photos } from "@/lib/site";

export const metadata = pageMeta(
  "/about",
  "About Me",
  "The story behind Bryce McAnany: growing up in Warrenton, Virginia, studying Marketing at James Madison University, and finding a passion for digital analytics."
);

// TODO (Bryce): replace the bracketed notes with your own details so this reads in your voice.
const chapters = [
  {
    label: "Where it started",
    title: "Growing up in Warrenton, Virginia",
    body: "I grew up in Warrenton, a small town in Northern Virginia where everybody seems to know everybody. [Add a detail here: a sport you played, a job you had, or the moment you first got curious about why people buy what they buy.]",
  },
  {
    label: "Finding my lane",
    title: "Marketing at James Madison University",
    body: "At JMU I chose Marketing with a concentration in Digital Marketing. Classes like Marketing Analytics showed me that the best marketing decisions start with good data, from segmenting customers with k-means clustering to running A/B tests on landing pages. That's when analytics went from a class requirement to something I actually wanted to get good at.",
  },
  {
    label: "Seeing it in the real world",
    title: "Studying marketing in Greece and Turkey",
    body: "In the summer of 2026 I spent three weeks studying consumer behavior and services marketing across ten Greek islands and Bodrum, Turkey. What worked in Greece didn't always work in Turkey, and that taught me to start with the audience and let the numbers confirm it.",
  },
  {
    label: "Doing the work",
    title: "Analytics at Premium Service Brands",
    body: "That same summer I joined Premium Service Brands as a Digital Marketing Intern. I connected GA4 across the company's franchise brands, audited and recovered lost marketing account logins, and built a YouTube strategy guide for franchise owners. The team asked me to stay on part time through my senior year, which I'm still doing today.",
  },
];

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About me"
        title={
          <>
            The short version: <span className="text-gradient">curious, coachable, and data driven.</span>
          </>
        }
        intro="My home page is the introduction. This is the story of how I got here."
      />

      <Section>
        <div className="grid gap-16 md:grid-cols-[0.8fr_1.2fr]">
          <div className="md:sticky md:top-28 md:self-start">
            <Reveal>
              <Photo
                src={photos.kosGroup}
                alt="Bryce and fellow JMU students posing at the I love Kos sign on the harbor in Kos, Greece"
                placeholder="Add a personal photo: public/images/kos-group.jpg"
                caption="With fellow JMU students on the harbor in Kos, Greece."
              />
            </Reveal>
          </div>
          <ol className="relative space-y-14 border-l border-line pl-8">
            {chapters.map((c, i) => (
              <li key={c.title} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-2 border-accent bg-ink"
                />
                <Reveal delay={i * 0.05}>
                  <Eyebrow>{c.label}</Eyebrow>
                  <h2 className="text-2xl font-semibold md:text-3xl">{c.title}</h2>
                  <p className="mt-4 text-lg leading-relaxed text-muted">{c.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section className="pt-0">
        <Reveal className="rounded-3xl border border-line bg-surface p-10 md:p-14">
          <h2 className="text-2xl font-semibold md:text-4xl">What I&apos;m looking for</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            [Add the roles you&apos;re targeting, for example: entry level digital marketing or marketing analytics
            roles starting after graduation in May 2027.]
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/portfolio">See my portfolio</Button>
            <Button href="/contact" variant="ghost">
              Contact me
            </Button>
          </div>
        </Reveal>
        <div className="mt-10">
          <ShareButtons path="/about" title="About Bryce McAnany" />
        </div>
      </Section>
    </>
  );
}
