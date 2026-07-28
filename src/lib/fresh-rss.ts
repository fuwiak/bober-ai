/**
 * RSS 2.0 для «Свежее и актуальное» в Яндекс Вебмастере.
 * Docs: https://yandex.ru/support/webmaster/ru/search-appearance/fresh-content
 *
 * Обязательные поля item: title, link, pubDate (RFC-822 GMT), yandex:full-text.
 * Яндекс учитывает материалы примерно за последние 8 дней.
 */
import { ACADEMY_POSTS } from "@/lib/academy-posts";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { getAllIntentArticles } from "@/lib/seo-catalog";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const FRESH_RSS_PATH = "/rss.xml";

const YANDEX_NS = "http://news.yandex.ru";
const MEDIA_NS = "http://search.yahoo.com/mrss/";
const AUTHOR = "Павел Стасиньски";

/** Max age of items included in the feed (Yandex fresh window ≈ 8d; keep buffer). */
const MAX_AGE_DAYS = 30;
const MAX_ITEMS = 50;

type FreshItem = {
  slug: string;
  title: string;
  description: string;
  link: string;
  publishedAt: string;
  fullText: string;
  category?: string;
  image?: string;
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Strip HTML to plain text for yandex:full-text (no links / captions / meta). */
export function htmlToPlainText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<li[^>]*>/gi, "— ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function articleBodyFromSections(
  sections: { title: string; paragraphs: string[] }[],
  faq?: { q: string; a: string }[],
): string {
  const parts: string[] = [];
  for (const section of sections) {
    parts.push(section.title);
    parts.push(...section.paragraphs);
  }
  if (faq?.length) {
    parts.push("Вопросы и ответы");
    for (const item of faq) {
      parts.push(`${item.q} ${item.a}`);
    }
  }
  return parts.join("\n\n").trim();
}

/** RFC-822 / RFC-5322 with GMT (required by Yandex fresh feed). */
export function toRfc822Gmt(isoDate: string): string {
  const day = isoDate.slice(0, 10);
  const d = new Date(`${day}T12:00:00.000Z`);
  if (Number.isNaN(d.getTime())) {
    return new Date().toUTCString().replace(/UTC$/, "GMT");
  }
  // toUTCString → "Sat, 26 Jul 2026 12:00:00 GMT"
  return d.toUTCString().replace(/UTC$/, "GMT");
}

function withinAge(isoDate: string, maxAgeDays: number, now = new Date()): boolean {
  const d = new Date(`${isoDate.slice(0, 10)}T12:00:00.000Z`);
  if (Number.isNaN(d.getTime())) return false;
  const ageMs = now.getTime() - d.getTime();
  return ageMs >= 0 && ageMs <= maxAgeDays * 24 * 60 * 60 * 1000;
}

function collectFreshItems(now = new Date()): FreshItem[] {
  const items: FreshItem[] = [];

  for (const article of getAllIntentArticles()) {
    const copy = article.ru;
    items.push({
      slug: article.slug,
      title: copy.title,
      description: copy.description,
      link: absoluteUrl(`/blog/${article.slug}`),
      publishedAt: article.publishedAt,
      fullText: articleBodyFromSections(copy.sections, copy.faq),
      category: article.cluster,
    });
  }

  for (const post of ACADEMY_POSTS) {
    items.push({
      slug: post.slug,
      title: post.title,
      description: post.summary,
      link: absoluteUrl(`/academy/${post.slug}`),
      publishedAt: post.publishedAt,
      fullText: htmlToPlainText(post.contentHtml),
      category: post.tags[0],
      image: post.coverImage.startsWith("http")
        ? post.coverImage
        : absoluteUrl(post.coverImage),
    });
  }

  for (const post of BLOG_POSTS) {
    // Legacy Medium ports — only if still within the freshness window.
    items.push({
      slug: post.slug,
      title: post.title,
      description: post.description,
      link: absoluteUrl(`/blog/${post.slug}`),
      publishedAt: post.publishedAt,
      fullText: htmlToPlainText(post.contentHtml),
      category: post.tags[0],
      image: post.coverImage,
    });
  }

  return items
    .filter((item) => withinAge(item.publishedAt, MAX_AGE_DAYS, now))
    .filter((item) => item.title.trim() && item.fullText.trim() && item.link.startsWith("http"))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, MAX_ITEMS);
}

function itemXml(item: FreshItem): string {
  const title = escapeXml(item.title.slice(0, 200));
  const link = escapeXml(item.link.slice(0, 243));
  const description = escapeXml(item.description.slice(0, 500));
  const pubDate = toRfc822Gmt(item.publishedAt);
  const category = item.category ? `\n        <category>${escapeXml(item.category)}</category>` : "";
  const media = item.image
    ? `
        <enclosure url="${escapeXml(item.image)}" type="image/jpeg"/>
        <media:thumbnail url="${escapeXml(item.image)}"/>`
    : "";

  // CDATA: full article text for the bot (not shown on ya.ru).
  const fullText = item.fullText.replace(/]]>/g, "]]\u003e");

  return `      <item>
        <title>${title}</title>
        <link>${link}</link>
        <guid isPermaLink="true">${link}</guid>
        <description>${description}</description>
        <author>${escapeXml(AUTHOR)}</author>${category}${media}
        <pubDate>${pubDate}</pubDate>
        <yandex:genre>article</yandex:genre>
        <yandex:full-text><![CDATA[${fullText}]]></yandex:full-text>
      </item>`;
}

export function getFreshRssXml(now = new Date()): string {
  const items = collectFreshItems(now);
  const lastBuild = now.toUTCString().replace(/UTC$/, "GMT");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:yandex="${YANDEX_NS}"
  xmlns:media="${MEDIA_NS}">
  <channel>
    <title>${escapeXml(SITE_NAME)} — статьи и практикум</title>
    <link>${escapeXml(SITE_URL)}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>ru</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items.map(itemXml).join("\n")}
  </channel>
</rss>
`;
}

export function getFreshRssUrl(): string {
  return absoluteUrl(FRESH_RSS_PATH);
}
