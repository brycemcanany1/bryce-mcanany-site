import ShareButtons from "@/components/ShareButtons";
import { Button, PageHeader, Reveal, Section } from "@/components/ui";
import { pageMeta, site } from "@/lib/site";
import { Download } from "lucide-react";

export const metadata = pageMeta(
  "/resume",
  "Resume",
  "View or download Bryce McAnany's resume: Marketing student at James Madison University with digital analytics internship experience and a Google Analytics certification."
);

export default function Resume() {
  return (
    <>
      <PageHeader
        eyebrow="Resume"
        title={<span className="text-gradient">My experience at a glance.</span>}
        intro="Read my resume below, or download a PDF copy to keep."
      />
      <Section className="pt-12">
        <Reveal>
          <div className="mb-8 flex flex-wrap gap-4">
            <Button href={site.resumePath} download>
              <Download aria-hidden="true" className="h-4 w-4" /> Download resume (PDF)
            </Button>
            <Button href="/contact" variant="ghost">
              Contact me
            </Button>
          </div>
          <div className="overflow-hidden rounded-3xl border border-line bg-surface">
            <object
              data={`${site.resumePath}#view=FitH`}
              type="application/pdf"
              className="h-[80vh] w-full"
              aria-label="Bryce McAnany resume (PDF)"
            >
              <p className="p-8 text-muted">
                Your browser can&apos;t show the PDF here.{" "}
                <a href={site.resumePath} download className="text-accent underline">
                  Download the resume instead.
                </a>
              </p>
            </object>
          </div>
        </Reveal>
        <div className="mt-12">
          <ShareButtons path="/resume" title="Bryce McAnany's resume" />
        </div>
      </Section>
    </>
  );
}
