import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Generates /sitemap.xml automatically (rubric: sitemap configured).
const paths = [
  "/",
  "/about",
  "/portfolio",
  "/portfolio/class-projects",
  "/portfolio/internship",
  "/study-abroad",
  "/study-abroad/greek-islands",
  "/study-abroad/bodrum",
  "/resume",
  "/contact",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({
    url: `${site.url}${p === "/" ? "" : p}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: p === "/" ? 1 : p.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
