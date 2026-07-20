import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { ContactCta } from "@/components/ContactCta";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { TrackedAnchor } from "@/components/TrackedAnchor";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import type { GuideDef } from "@/lib/guides";
import { GUIDE_LABELS, type GuideContent } from "@/lib/guides-content";
import { PROFILE } from "@/lib/profile";
import { articleJsonLd, faqJsonLd, webPageJsonLd } from "@/lib/seo";
import { TELEGRAM_URL, absoluteUrl } from "@/lib/site";

type GuidePageViewProps = {
  guide: GuideDef;
  content: GuideContent;
  locale: string;
  ctaLabel: string;
  telegramLabel: string;
};

export function GuidePageView({ guide, content, locale, ctaLabel, telegramLabel }: GuidePageViewProps) {
  const isEn = locale === "en";
  const labels = GUIDE_LABELS[isEn ? "en" : "ru"];
  const prefix = isEn ? "/en" : "";
  const pagePath = `${prefix}/guides/${guide.slug}`;
  const pageUrl = absoluteUrl(pagePath);
  const guidesLabel = labels.guidesTitle;

  const articleText = [
    content.subtitle,
    ...content.sections.flatMap((section) => [section.title, ...section.paragraphs]),
    ...(content.checklist ?? []),
    content.ctaText,
  ]
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  const webPage = webPageJsonLd({
    name: content.h1,
    description: content.metaDescription,
    url: pageUrl,
    locale,
  });

  const faqFromSections = content.sections.slice(0, 3).map((section) => ({
    q: section.title,
    a: section.paragraphs.join(" "),
  }));
  const faqSchema = faqJsonLd(faqFromSections, pageUrl);

  const articleSchema = articleJsonLd({
    type: "Article",
    url: pageUrl,
    fragmentId: "article",
    headline: content.h1,
    text: articleText,
    description: content.metaDescription,
    authorName: PROFILE.name,
    about: [guidesLabel, content.h1],
    image: guide.coverImage,
    inLanguage: isEn ? "en-US" : "ru-RU",
  });

  return (
    <div className="page-shell min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SiteHeader />
      <main>
        <article id="article">
          <section className="section-band section--deep border-b border-hairline">
            <div className="container-editorial">
              <Breadcrumbs
                locale={locale}
                items={[
                  { name: guidesLabel, path: "/guides" },
                  { name: content.h1, path: `/guides/${guide.slug}` },
                ]}
              />
              <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_320px] lg:items-start">
                <Reveal className="max-w-3xl">
                  <span className="section-label">{labels.guidesTitle}</span>
                  <h1 className="display-md mt-4">{content.h1}</h1>
                  <p className="body-copy mt-5 text-lg">{content.subtitle}</p>
                  <div className="mt-10 flex flex-wrap gap-4">
                    <ContactCta defaultService={content.h1} goal="guide_cta_click">
                      {ctaLabel}
                    </ContactCta>
                    <TrackedAnchor href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn-secondary" goal="telegram_click">
                      {telegramLabel}
                    </TrackedAnchor>
                  </div>
                </Reveal>
                <Reveal delay={0.08}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-hairline bg-surface-soft">
                    <Image
                      src={guide.coverImage}
                      alt={content.h1}
                      fill
                      className="object-contain p-4"
                      sizes="320px"
                      unoptimized={guide.coverImage.endsWith(".svg")}
                    />
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {content.sections.map((section) => (
            <section key={section.title} className="section-band section--panel border-b border-hairline">
              <div className="container-editorial max-w-3xl">
                <Reveal>
                  <h2 className="section-title">{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)} className="body-copy mt-4 text-base">
                      {paragraph}
                    </p>
                  ))}
                </Reveal>
              </div>
            </section>
          ))}

          {content.checklist?.length ? (
            <section className="section-band section--deep border-b border-hairline">
              <div className="container-editorial max-w-3xl">
                <Reveal>
                  <h2 className="section-title">{labels.checklistTitle}</h2>
                  <ul className="mt-8 space-y-3">
                    {content.checklist.map((item) => (
                      <li key={item} className="body-copy flex gap-4 text-base">
                        <span className="meta-label shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </section>
          ) : null}

          <section className="section-band section--panel border-b border-hairline">
            <div className="container-editorial max-w-3xl">
              <Reveal>
                <h2 className="section-title">{labels.relatedTitle}</h2>
                <ul className="mt-6 space-y-2">
                  {guide.relatedLandings.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="link-more">
                        {labels[item.labelKey as keyof typeof labels]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>

          <section className="section-band section--deep border-b border-hairline">
            <div className="container-editorial max-w-3xl">
              <Reveal>
                <h2 className="section-title">{content.ctaTitle}</h2>
                <p className="body-copy mt-4 text-base">{content.ctaText}</p>
                <ContactCta className="mt-8" defaultService={content.h1} goal="guide_bottom_cta">
                  {ctaLabel}
                </ContactCta>
              </Reveal>
            </div>
          </section>
        </article>

        <section id="contact" className="section-band section--panel scroll-mt-16">
          <div className="container-editorial grid gap-16 lg:grid-cols-2">
            <Reveal>
              <span className="section-label">{isEn ? "Contact" : "Контакт"}</span>
              <h2 className="section-title mt-4">{isEn ? "Discuss your project" : "Обсудить проект"}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <ContactForm defaultService={content.h1} />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
