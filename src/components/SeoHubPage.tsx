import Image from "next/image";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import type { HubDef } from "@/lib/seo-catalog/types";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

type SeoHubPageProps = {
  hub: HubDef;
  locale: string;
};

export function SeoHubPage({ hub, locale }: SeoHubPageProps) {
  const loc = locale === "en" ? "en" : "ru";
  const copy = hub[loc];
  const prefix = locale === "en" ? "/en" : "";
  const pagePath = `${prefix}/${hub.category}`;
  const pageUrl = absoluteUrl(pagePath);
  const homeLabel = loc === "en" ? "Home" : "Главная";

  const breadcrumb = breadcrumbJsonLd([
    { name: homeLabel, url: absoluteUrl(prefix || "/") },
    { name: copy.h1, url: pageUrl },
  ]);
  const webPage = webPageJsonLd({
    name: copy.h1,
    description: copy.metaDescription,
    url: pageUrl,
    locale,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <SiteHeader />
      <main>
        <section className="section-band border-b border-hairline">
          <div className="container-editorial grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <Reveal>
              <p className="eyebrow">{loc === "en" ? "Catalog" : "Каталог"}</p>
              <h1 className="mt-3 display-title text-balance">{copy.h1}</h1>
              <p className="mt-4 max-w-2xl text-lg text-muted">{copy.subtitle}</p>
            </Reveal>
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-hairline bg-panel">
                <Image src={hub.coverImage} alt={copy.h1} fill className="object-cover" sizes="(max-width:1024px) 100vw, 40vw" />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-band border-b border-hairline">
          <div className="container-editorial max-w-3xl space-y-4">
            {copy.intro.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="section-band border-b border-hairline">
          <div className="container-editorial">
            <h2 className="font-display text-2xl">{loc === "en" ? "Browse solutions" : "Разделы"}</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {hub.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block border border-hairline bg-panel p-5 transition hover:border-ink/30"
                >
                  <h3 className="font-medium text-ink">{loc === "en" ? child.labelEn : child.labelRu}</h3>
                  <p className="mt-2 text-sm text-muted">{loc === "en" ? child.blurbEn : child.blurbRu}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

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
