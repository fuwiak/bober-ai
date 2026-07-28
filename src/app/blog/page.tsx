import type { Metadata } from "next";
import { BareIntlShell } from "@/components/BareIntlShell";
import { BlogIndexView, getBlogIndexMeta } from "@/components/BlogIndexView";
import { buildPageMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

const meta = getBlogIndexMeta("ru");

export const metadata: Metadata = buildPageMetadata({
  title: `${meta.title} | ${SITE_NAME}`,
  description: meta.description,
  keywords: meta.keywords,
  path: "/blog",
  locale: "ru",
});

export default function BlogPage() {
  return (
    <BareIntlShell>
      <BlogIndexView locale="ru" />
    </BareIntlShell>
  );
}
