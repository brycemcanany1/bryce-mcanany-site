"use client";

import { useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { site } from "@/lib/site";

const field =
  "mt-2 w-full rounded-2xl border border-line bg-ink px-4 py-3 text-fg placeholder:text-muted/70 focus:border-accent focus:outline-none";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  if (!site.formspreeId) {
    return (
      <p className="rounded-3xl border border-line bg-surface p-8 text-muted">
        The contact form is being set up. In the meantime, the fastest way to reach me is on{" "}
        <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-accent underline">
          LinkedIn
        </a>
        .
      </p>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    }).catch(() => null);
    if (res?.ok) {
      setStatus("sent");
      // Tracked as a key event in GA4.
      sendGAEvent("event", "generate_lead", { form: "contact" });
      form.reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-line bg-surface p-8" noValidate={false}>
      <div>
        <label htmlFor="name" className="text-sm font-medium">
          Name <span aria-hidden="true">*</span>
        </label>
        <input id="name" name="name" required autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Email <span aria-hidden="true">*</span>
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className={field} />
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea id="message" name="message" required rows={5} className={field} />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-accent px-6 py-3 font-semibold text-ink transition-colors hover:bg-white disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
      <p role="status" aria-live="polite" className="text-sm text-muted">
        {status === "sent" && "Thanks! Your message was sent. I'll get back to you soon."}
        {status === "error" && "Something went wrong. Please try again or reach me on LinkedIn."}
      </p>
    </form>
  );
}
