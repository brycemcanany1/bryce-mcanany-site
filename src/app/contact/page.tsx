import ContactForm from "@/components/ContactForm";
import { LinkedInIcon } from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";
import { PageHeader, Photo, Reveal, Section } from "@/components/ui";
import { pageMeta, photos, site } from "@/lib/site";

export const metadata = pageMeta(
  "/contact",
  "Contact",
  "Get in touch with Bryce McAnany about digital marketing and analytics opportunities, or connect on LinkedIn."
);

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s <span className="text-gradient">connect.</span>
          </>
        }
        intro="Whether you're hiring, have a project in mind, or just want to talk marketing and analytics, send me a message."
        glow="from-warm/40 via-[#b8321a]/20"
      />
      <Section>
        <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <Photo
              src={photos.contact}
              alt="Professional photo of Bryce McAnany"
              placeholder="Add professional photo: public/images/contact.jpg"
            />
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-3 rounded-full border border-line px-5 py-3 text-sm hover:border-accent hover:text-accent"
            >
              <LinkedInIcon /> Connect with me on LinkedIn
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
        <div className="mt-16">
          <ShareButtons path="/contact" title="Contact Bryce McAnany" />
        </div>
      </Section>
    </>
  );
}
