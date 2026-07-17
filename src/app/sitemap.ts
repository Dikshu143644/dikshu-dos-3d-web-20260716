import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteConfig.routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: siteConfig.lastUpdated,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
