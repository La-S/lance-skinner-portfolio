import type { MetadataRoute } from "next";
import { SITE_URL } from "./siteConfig";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep the CMS admin and its API out of search results.
      disallow: ["/keystatic", "/api/keystatic"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
