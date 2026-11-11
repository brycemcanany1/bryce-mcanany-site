# Bryce McAnany: Personal Website

Built with Next.js, Tailwind CSS, Framer Motion, and React Three Fiber. Hosted on Vercel.

## Where to edit things

| What | File |
| --- | --- |
| LinkedIn link, site URL, video ID, which photos exist | `src/lib/site.ts` |
| Home page text | `src/app/page.tsx` and `src/components/HomeHero.tsx` |
| About story | `src/app/about/page.tsx` |
| Class projects | `src/app/portfolio/class-projects/page.tsx` |
| Internship | `src/app/portfolio/internship/page.tsx` |
| Study abroad pages | `src/app/study-abroad/` |
| Photos | `public/images/` |
| Resume | `public/resume.pdf` |

## Photos still needed

Put these in `public/images/` with these exact names, then set them in `src/lib/site.ts`:
`headshot.jpg`, `contact.jpg`, `presenting.jpg`, `kos-group.jpg`, `bodrum.jpg`

## Vercel environment variables

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_GA_ID` | GA4 Measurement ID (starts with G-) |
| `NEXT_PUBLIC_SITE_URL` | Final site address, for example https://bryce-mcanany-site.vercel.app |
| `NEXT_PUBLIC_GSC_VERIFICATION` | The content value from the Search Console HTML tag |
| `NEXT_PUBLIC_FORMSPREE_ID` | Formspree form ID for the contact form |
| `NEXT_PUBLIC_YOUTUBE_ID` | YouTube video ID for the study abroad video |

## Rubric features built in

7+ pages with parent/child structure, sitemap.xml, robots.txt, privacy policy, meta descriptions, alt text, clean URLs, keyboard navigation with visible focus, skip link, WCAG AA color contrast, reduced motion support, social share buttons, downloadable resume, and calls to action on every page.
