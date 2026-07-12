import type { MetadataRoute } from "next";
import { PORTFOLIO } from "@/lib/profile";
import { getEnterpriseServices } from "@/lib/enterprise-services";
import { SITE_URL } from "@/lib/site";

const staticRoutes = ["", "/services", "/partners", "/privacy-policy", "/consent", "/news", "/events", "/blog", "/career", "/academy", "/outages"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of ["ru", "en"] as const) {
    const prefix = locale === "en" ? "/en" : "";
    const services = getEnterpriseServices(locale);

    for (const route of staticRoutes) {
      entries.push({
        url: `${SITE_URL}${prefix}${route}`,
        lastModified: now,
        changeFrequency: route === "" ? "weekly" : "daily",
        priority: route === "" ? 1 : 0.7,
        alternates: {
          languages: {
            ru: `${SITE_URL}${route}`,
            en: `${SITE_URL}/en${route}`,
          },
        },
      });
    }

    for (const offer of services) {
      entries.push({
        url: `${SITE_URL}${prefix}/services/${offer.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    for (const item of PORTFOLIO) {
      entries.push({
        url: `${SITE_URL}${prefix}/portfolio/${item.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
