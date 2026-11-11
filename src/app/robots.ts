import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Generates /robots.txt automatically (rubric: robots.txt configured).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
