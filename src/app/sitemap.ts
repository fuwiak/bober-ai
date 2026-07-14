import type { MetadataRoute } from "next";
import { PORTFOLIO } from "@/lib/profile";
import { getAllServiceSlugs } from "@/lib/seo-services-content";
import { GUIDES } from "@/lib/guides";
import { LANDING_PAGES } from "@/lib/landing-pages";
import { SITE_URL } from "@/lib/site";

const staticRoutes = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/guides", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "/partners", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/consent", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/info", priority: 0.5, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];
  const ruServiceSlugs = getAllServiceSlugs("ru");

  for (const route of staticRoutes) {
    entries.push({
      url: `${SITE_URL}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          ru: `${SITE_URL}${route.path}`,
          en: `${SITE_URL}/en${route.path}`,
          "x-default": `${SITE_URL}${route.path}`,
        },
      },
    });
    entries.push({
      url: `${SITE_URL}/en${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority * 0.9,
      alternates: {
        languages: {
          ru: `${SITE_URL}${route.path}`,
          en: `${SITE_URL}/en${route.path}`,
          "x-default": `${SITE_URL}${route.path}`,
        },
      },
    });
  }

  for (const slug of ruServiceSlugs) {
    entries.push({
      url: `${SITE_URL}/services/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
      alternates: {
        languages: {
          ru: `${SITE_URL}/services/${slug}`,
          en: `${SITE_URL}/en/services/${slug}`,
          "x-default": `${SITE_URL}/services/${slug}`,
        },
      },
    });
    entries.push({
      url: `${SITE_URL}/en/services/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    });
  }

  for (const item of PORTFOLIO) {
    entries.push({
      url: `${SITE_URL}/portfolio/${item.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: item.featured ? 0.8 : 0.6,
      alternates: {
        languages: {
          ru: `${SITE_URL}/portfolio/${item.slug}`,
          en: `${SITE_URL}/en/portfolio/${item.slug}`,
          "x-default": `${SITE_URL}/portfolio/${item.slug}`,
        },
      },
    });
  }

  for (const page of LANDING_PAGES) {
    const path = `/${page.category}/${page.slug}`;
    entries.push({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.82,
      alternates: {
        languages: {
          ru: `${SITE_URL}${path}`,
          en: `${SITE_URL}/en${path}`,
          "x-default": `${SITE_URL}${path}`,
        },
      },
    });
    entries.push({
      url: `${SITE_URL}/en${path}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.72,
      alternates: {
        languages: {
          ru: `${SITE_URL}${path}`,
          en: `${SITE_URL}/en${path}`,
          "x-default": `${SITE_URL}${path}`,
        },
      },
    });
  }

  for (const guide of GUIDES) {
    const path = `/guides/${guide.slug}`;
    entries.push({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          ru: `${SITE_URL}${path}`,
          en: `${SITE_URL}/en${path}`,
          "x-default": `${SITE_URL}${path}`,
        },
      },
    });
    entries.push({
      url: `${SITE_URL}/en${path}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  return entries;
}
