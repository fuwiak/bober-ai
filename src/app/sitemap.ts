import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { PORTFOLIO } from "@/lib/profile";
import { getAllServiceSlugs } from "@/lib/seo-services-content";
import { GUIDES } from "@/lib/guides";
import { LANDING_PAGES } from "@/lib/landing-pages";
import { SEO_HUBS } from "@/lib/seo-catalog/hubs";
import { getAllIntentArticles } from "@/lib/seo-catalog";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Реальные даты последнего содержательного обновления разделов.
 * Обновлять вручную при изменении контента: lastmod, который меняется
 * при каждом деплое, Яндекс и Google начинают игнорировать.
 */
const UPDATED = {
  core: new Date("2026-07-19"),
  services: new Date("2026-07-19"),
  landings: new Date("2026-07-19"),
  hubs: new Date("2026-07-19"),
  guides: new Date("2026-07-14"),
  blog: new Date("2026-07-19"),
  portfolio: new Date("2026-07-14"),
  legal: new Date("2026-07-16"),
} as const;

const staticRoutes = [
  { path: "", priority: 1, changeFrequency: "weekly" as const, lastModified: UPDATED.core },
  { path: "/services", priority: 0.9, changeFrequency: "weekly" as const, lastModified: UPDATED.services },
  { path: "/portfolio", priority: 0.85, changeFrequency: "weekly" as const, lastModified: UPDATED.portfolio },
  { path: "/pricing", priority: 0.85, changeFrequency: "weekly" as const, lastModified: UPDATED.core },
  { path: "/faq", priority: 0.8, changeFrequency: "monthly" as const, lastModified: UPDATED.core },
  { path: "/media", priority: 0.8, changeFrequency: "monthly" as const, lastModified: UPDATED.core },
  { path: "/guides", priority: 0.85, changeFrequency: "weekly" as const, lastModified: UPDATED.guides },
  { path: "/blog", priority: 0.85, changeFrequency: "weekly" as const, lastModified: UPDATED.blog },
  { path: "/partners", priority: 0.8, changeFrequency: "monthly" as const, lastModified: UPDATED.core },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const, lastModified: UPDATED.legal },
  { path: "/consent", priority: 0.3, changeFrequency: "yearly" as const, lastModified: UPDATED.legal },
  { path: "/terms", priority: 0.4, changeFrequency: "yearly" as const, lastModified: UPDATED.legal },
  { path: "/info", priority: 0.5, changeFrequency: "monthly" as const, lastModified: UPDATED.core },
];

/** RU-only pages outside [locale] (no /en mirror). */
const ruOnlyRoutes = [
  { path: "/career", priority: 0.7, changeFrequency: "monthly" as const, lastModified: UPDATED.core },
  { path: "/academy", priority: 0.65, changeFrequency: "monthly" as const, lastModified: UPDATED.core },
  { path: "/news", priority: 0.6, changeFrequency: "daily" as const, lastModified: UPDATED.core },
  { path: "/events", priority: 0.55, changeFrequency: "weekly" as const, lastModified: UPDATED.core },
  { path: "/outages", priority: 0.4, changeFrequency: "weekly" as const, lastModified: UPDATED.core },
];

function pushLocalized(
  entries: MetadataRoute.Sitemap,
  path: string,
  lastModified: Date,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
) {
  entries.push({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
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
    lastModified,
    changeFrequency,
    priority: priority * 0.9,
    alternates: {
      languages: {
        ru: `${SITE_URL}${path}`,
        en: `${SITE_URL}/en${path}`,
        "x-default": `${SITE_URL}${path}`,
      },
    },
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const ruServiceSlugs = getAllServiceSlugs("ru");

  for (const route of staticRoutes) {
    pushLocalized(entries, route.path, route.lastModified, route.changeFrequency, route.priority);
  }

  for (const route of ruOnlyRoutes) {
    entries.push({
      url: `${SITE_URL}${route.path}`,
      lastModified: route.lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    });
  }

  for (const hub of SEO_HUBS) {
    pushLocalized(entries, `/${hub.category}`, UPDATED.hubs, "weekly", 0.88);
  }

  for (const slug of ruServiceSlugs) {
    pushLocalized(entries, `/services/${slug}`, UPDATED.services, "weekly", 0.85);
  }

  for (const item of PORTFOLIO) {
    pushLocalized(entries, `/portfolio/${item.slug}`, UPDATED.portfolio, "monthly", item.featured ? 0.8 : 0.6);
  }

  for (const page of LANDING_PAGES) {
    pushLocalized(entries, `/${page.category}/${page.slug}`, UPDATED.landings, "weekly", 0.82);
  }

  for (const guide of GUIDES) {
    pushLocalized(entries, `/guides/${guide.slug}`, UPDATED.guides, "weekly", 0.8);
  }

  for (const article of getAllIntentArticles()) {
    pushLocalized(entries, `/blog/${article.slug}`, UPDATED.blog, "weekly", 0.78);
  }

  // Переводы статей с Medium существуют только на русском — без en-альтернатив.
  for (const post of BLOG_POSTS) {
    entries.push({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: UPDATED.blog,
      changeFrequency: "yearly",
      priority: 0.6,
    });
  }

  return entries;
}
