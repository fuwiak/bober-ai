import type { MetadataRoute } from "next";
import { PORTFOLIO } from "@/lib/profile";
import { serviceFeedOffers } from "@/lib/services-feed";
import { SITE_URL } from "@/lib/site";

const routes = [
  "",
  "/services",
  ...serviceFeedOffers.map((offer) => `/services/${offer.slug}`),
  ...PORTFOLIO.map((item) => `/portfolio/${item.slug}`),
  "/privacy-policy",
  "/consent",
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
