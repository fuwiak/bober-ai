import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import type { IntentArticleSpec } from "@/lib/seo-catalog/types";
import { articleJsonLd, breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
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
  const homeLabel = loc === "en" ? "Home" : "Главная";
  const blogLabel = loc === "en" ? "Blog" : "Блог";

  const breadcrumb = breadcrumbJsonLd([
    { name: homeLabel, url: absoluteUrl(prefix || "/") },
    { name: blogLabel, url: absoluteUrl(`${prefix}/blog`) },
    { name: copy.h1, url: pageUrl },
  ]);
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <SiteHeader />
      <main>
        <article className="section-band border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <Reveal>
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

            <div className="mt-12 border-t border-hairline pt-8">
              <h2 className="font-display text-xl">
                {loc === "en" ? "Related solutions" : "Связанные решения"}
              </h2>
              <ul className="mt-4 space-y-2">
                {article.related.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-ink underline-offset-4 hover:underline">
                      {loc === "en" ? item.labelEn : item.labelRu}
                    </Link>
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
