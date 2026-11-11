import { PageHeader, Section } from "@/components/ui";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "/privacy",
  "Privacy Policy",
  "How Bryce McAnany's personal website collects and uses information, including Google Analytics and the contact form."
);

export default function Privacy() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" intro="Last updated November 10, 2026." />
      <Section className="pt-12">
        <div className="max-w-3xl space-y-8 text-lg leading-relaxed text-muted [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-fg">
          <p>
            This is the personal website of Bryce McAnany. It was created as part of a course at James Madison
            University. This policy explains what information the site collects and how it is used.
          </p>
          <h2>Analytics</h2>
          <p>
            This site uses Google Analytics 4 to understand how visitors use it, such as which pages are viewed,
            how long visitors stay, and the general region and device they browse from. Google Analytics uses
            cookies to collect this information. It does not tell me who you are. You can learn more in{" "}
            <a
              className="text-accent underline"
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
            >
              how Google uses information from sites that use its services
            </a>
            , or opt out with the{" "}
            <a
              className="text-accent underline"
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Analytics opt out browser add-on
            </a>
            .
          </p>
          <h2>Contact form</h2>
          <p>
            If you send a message through the contact form, your name, email address, and message are delivered
            to me through Formspree so I can reply. I only use this information to respond to you and never sell
            or share it.
          </p>
          <h2>Hosting and security</h2>
          <p>
            This site is hosted on Vercel and is served over HTTPS, which encrypts the connection between your
            browser and the site. Vercel may keep standard server logs for security and performance.
          </p>
          <h2>Links to other sites</h2>
          <p>
            This site links to outside sites such as LinkedIn and YouTube. Those sites have their own privacy
            policies.
          </p>
          <h2>Contact</h2>
          <p>Questions about this policy can be sent through the contact page.</p>
        </div>
      </Section>
    </>
  );
}
