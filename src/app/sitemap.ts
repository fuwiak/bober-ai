import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const routes = [
  "",
  "/services",
  "/services/ai-architect",
  "/services/cloud-engineer",
  "/services/voice-ai-engineer",
  "/news",
  "/events",
  "/blog",
  "/career",
  "/academy",
  "/outages",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "daily",
    priority: route === "" ? 1 : 0.7,
  }));
}
