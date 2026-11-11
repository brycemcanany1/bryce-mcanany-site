import ShareButtons from "@/components/ShareButtons";
import { Button, Eyebrow, PageHeader, Reveal, Section } from "@/components/ui";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "/portfolio/class-projects",
  "JMU Class Projects",
  "Marketing class projects by Bryce McAnany at James Madison University, including a Buhi Supply Co. analytics simulation, a Shenandoah Caverns IMC campaign, and a social media strategy for a local nonprofit."
);

// Each project needs a descriptive paragraph (rubric). Add a link or image per project when you have one.
const projects = [
  {
    course: "MKTG 482 · Marketing Analytics",
    title: "Buhi Supply Co. analytics simulation",
    tags: ["Segmentation", "k-means clustering", "A/B testing"],
    body: "Using the Stukent platform, I worked through a full analytics simulation for Buhi Supply Co., a bag and backpack retailer. I segmented customers with k-means clustering, ran A/B tests, analyzed landing page performance, and wrote segmentation reports recommending where the brand should focus. It was the class that showed me how much better marketing decisions get when they start with data.",
  },
  {
    course: "IMC Campaign",
    title: "Shenandoah Caverns integrated marketing campaign",
    tags: ["IMC", "Targeting", "Media planning"],
    body: "Our team built an integrated marketing communications campaign for Shenandoah Caverns on a medium budget. We targeted two audiences, Active Suburban Families and Adventurous Young Adults, and planned messaging and channels for each so the campaign spoke to both without losing a consistent brand voice.",
  },
  {
    course: "MKTG 385 · Consumer Behavior",
    title: "Cross-cultural values: U.S., Greece, and Turkey",
    tags: ["Hofstede", "Cultural values", "Research"],
    body: "Taken during my study abroad program, this project compared the United States, Greece, and Turkey on competitive versus cooperative and masculine versus feminine cultural values. Using Hofstede's dimensions and what we observed firsthand, I explored how those differences should change the way a brand tells its story in each market.",
  },
  {
    course: "MKTG 410 · Social Media Marketing",
    title: "Social media strategy for the Humane Society of Shenandoah County",
    tags: ["Platform strategy", "Content pillars", "Nonprofit"],
    body: "For a real nonprofit client, our team built a social media strategy for the Humane Society of Shenandoah County, an all volunteer, foster based organization. I helped define the platform strategy across Facebook, Instagram, TikTok, and X, and developed content pillar and evergreen content ideas focused on recruiting fosters and explaining their spay and neuter programs.",
  },
];

export default function ClassProjects() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio · Class Projects"
        title={
          <>
            Projects from <span className="text-gradient">James Madison University.</span>
          </>
        }
        intro="A selection of my favorite marketing projects from JMU, with what I did and what I took away from each one."
      />
      <Section>
        <ol className="space-y-8">
          {projects.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 0.04}>
                <article className="grid gap-8 rounded-3xl border border-line bg-surface p-8 md:grid-cols-[0.35fr_0.65fr] md:p-12">
                  <div>
                    <p className="font-mono text-sm text-accent">0{i + 1}</p>
                    <Eyebrow>{p.course}</Eyebrow>
                    <ul className="flex flex-wrap gap-2" aria-label="Skills used">
                      {p.tags.map((t) => (
                        <li key={t} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold md:text-3xl">{p.title}</h2>
                    <p className="mt-4 text-lg leading-relaxed text-muted">{p.body}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-6">
          <Button href="/portfolio/internship">Next: my internship work</Button>
          <ShareButtons path="/portfolio/class-projects" title="Bryce McAnany's JMU class projects" />
        </div>
      </Section>
    </>
  );
}
