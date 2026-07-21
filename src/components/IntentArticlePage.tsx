import NextLink from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import type { IntentArticleSpec } from "@/lib/seo-catalog/types";
import { articleJsonLd, faqJsonLd, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

type IntentArticlePageProps = {
  article: IntentArticleSpec;
  locale: string;
};

export function IntentArticlePage({ article, locale }: IntentArticlePageProps) {
  const loc = locale === "en" ? "en" : "ru";
  const copy = article[loc];
  const prefix = locale === "en" ? "/en" : "";
  const pagePath = `${prefix}/blog/${article.slug}`;
  const pageUrl = absoluteUrl(pagePath);
  const blogLabel = loc === "en" ? "Blog" : "Блог";

  const webPage = webPageJsonLd({
    name: copy.h1,
    description: copy.description,
    url: pageUrl,
    locale,
  });

  const articleSchema = articleJsonLd({
    type: "BlogPosting",
    headline: copy.title,
    description: copy.description,
    text: copy.sections.flatMap((section) => section.paragraphs).join("\n\n"),
    url: pageUrl,
    datePublished: article.publishedAt,
    authorName: "Paweł Stasiński",
    inLanguage: loc === "en" ? "en-US" : "ru-RU",
  });

  const faqItems = copy.faq ?? [];
  const faqSchema = faqItems.length ? faqJsonLd(faqItems, pageUrl) : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      ) : null}
      <SiteHeader />
      <main>
        <article className="section-band border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <Breadcrumbs
              locale={locale}
              items={[
                { name: blogLabel, path: "/blog" },
                { name: copy.h1, path: `/blog/${article.slug}` },
              ]}
            />
            <Reveal className="mt-2">
              <p className="eyebrow">{blogLabel}</p>
              <h1 className="mt-3 display-title text-balance">{copy.h1}</h1>
              <p className="mt-4 text-lg text-muted">{copy.description}</p>
              <p className="mt-3 text-sm text-muted-soft">{article.publishedAt}</p>
            </Reveal>

            <div className="mt-10 space-y-10">
              {copy.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="font-display text-2xl text-ink">{section.title}</h2>
                  <div className="mt-4 space-y-3">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="leading-relaxed text-muted">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {faqItems.length ? (
              <div className="mt-12 border-t border-hairline pt-8">
                <h2 className="font-display text-xl">{loc === "en" ? "FAQ" : "Частые вопросы"}</h2>
                <dl className="mt-6 space-y-6">
                  {faqItems.map((item) => (
                    <div key={item.q}>
                      <dt className="font-display text-lg tracking-tight">{item.q}</dt>
                      <dd className="body-copy mt-2 text-base text-muted">{item.a}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}

            <div className="mt-12 border-t border-hairline pt-8">
              <h2 className="font-display text-xl">
                {loc === "en" ? "Related solutions" : "Связанные решения"}
              </h2>
              <ul className="mt-4 space-y-2">
                {article.related.map((item) => (
                  <li key={item.href}>
                    <NextLink
                      href={prefix ? `${prefix}${item.href}` : item.href}
                      className="text-ink underline-offset-4 hover:underline"
                    >
                      {loc === "en" ? item.labelEn : item.labelRu}
                    </NextLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>

        <section className="section-band">
          <div className="container-editorial max-w-2xl">
            <ContactForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
