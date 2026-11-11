import ShareButtons from "@/components/ShareButtons";
import { Button, PageHeader, Photo, Reveal, Section } from "@/components/ui";
import { pageMeta, photos } from "@/lib/site";

export const metadata = pageMeta(
  "/study-abroad/greek-islands",
  "The Greek Islands",
  "Photos and stories from Bryce McAnany's study abroad trip through the Greek islands, including Kos, Patmos, and Symi."
);

const stops = [
  {
    place: "Kos",
    src: photos.kosGroup,
    placeholder: "Add Kos photo: public/images/kos-group.jpg",
    alt: "Bryce and fellow JMU students posing at the I love Kos sign on the harbor in Kos, Greece",
    text: "Our group at the I love Kos sign, a spot almost every visitor stops to photograph. It was a fun reminder of how a simple, recognizable landmark becomes free marketing, since every tourist who posts a picture here promotes Kos to everyone who follows them.",
  },
  {
    place: "Patmos",
    src: photos.patmos,
    alt: "A bust monument on the waterfront of Skala, the port town of Patmos, with the Greek flag and the yellow Byzantine flag flying",
    text: "Skala, the port town on Patmos. Next to the Greek flag flies the yellow flag of the Greek Orthodox Church. Patmos is known as the island where John the Apostle wrote the Book of Revelation, and you can see that history everywhere along the harbor.",
  },
  {
    place: "Symi",
    src: photos.symiFlags,
    alt: "Greek flags and the flag of Archangel Michael of Panormitis flying over a stone bridge in Gialos, Symi",
    text: "A square in Gialos, the harbor town on Symi. Beside the Greek flags flies the flag of Archangel Michael of Panormitis, the island's patron saint. Seeing a local saint flown next to the national flag showed how closely local identity and faith are tied together here.",
  },
  {
    place: "Symi at night",
    src: photos.symiNight,
    alt: "The harbor of Gialos on Symi at night, with houses lit up on the hillside under a full moon",
    text: "The same harbor on Symi after dark. Seeing it at sunset and again at night showed how much the island changes once the lights come on along the hillside.",
  },
];

export default function GreekIslands() {
  return (
    <>
      <PageHeader
        eyebrow="Study abroad · Greek Islands"
        title={
          <>
            Two weeks, <span className="text-gradient">ten islands, one boat.</span>
          </>
        }
        intro="We lived aboard a boat for two weeks, waking up in a new harbor almost every morning. Here are a few of the places that stuck with me."
        glow="from-[#14b8a6]/40 via-[#0e7490]/20"
      />
      <Section>
        <ol className="space-y-24">
          {stops.map((s, i) => (
            <li key={s.place}>
              <div className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <Reveal>
                  <Photo src={s.src} alt={s.alt} placeholder={s.placeholder} aspect="aspect-[4/5]" />
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="font-mono text-sm text-accent">0{i + 1}</p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{s.place}</h2>
                  <p className="mt-5 text-lg leading-relaxed text-muted">{s.text}</p>
                  <p className="mt-3 text-sm text-muted">Photo by Bryce McAnany.</p>
                </Reveal>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-20 flex flex-wrap items-center justify-between gap-6">
          <Button href="/study-abroad/bodrum">Next: Bodrum, Turkey</Button>
          <ShareButtons path="/study-abroad/greek-islands" title="The Greek islands by boat" />
        </div>
      </Section>
    </>
  );
}
