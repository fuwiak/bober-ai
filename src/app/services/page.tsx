import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_NAME, absoluteUrl } from "@/lib/site";
import { getServiceOfferUrl, serviceFeedOffers } from "@/lib/services-feed";

export const metadata: Metadata = {
  title: "Услуги Kinetic AI",
  description:
    "Каталог AI-услуг Kinetic AI: корпоративный ИИ, облачная инфраструктура, голосовые агенты и automation-проекты для бизнеса.",
  alternates: {
    canonical: absoluteUrl("/services"),
  },
};

export default function ServicesPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Услуги Kinetic AI", item: absoluteUrl("/services") },
    ],
  };

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Услуги Kinetic AI",
    url: absoluteUrl("/services"),
    hasPart: serviceFeedOffers.map((offer) => ({
      "@type": "Service",
      name: offer.title,
      provider: {
        "@type": "Organization",
        name: SITE_NAME,
      },
      url: getServiceOfferUrl(offer.slug),
    })),
  };

  return (
    <main className="min-h-screen bg-background px-6 py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-primary font-bold uppercase tracking-widest text-xs font-body">Каталог услуг</span>
            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Услуги Kinetic AI</h1>
            <p className="mt-3 max-w-3xl text-on-surface-variant">
              Каталог предложений по корпоративному ИИ, облачной инфраструктуре и voice AI. Эту страницу можно
              использовать как целевой URL для фида Яндекса в категории «Исполнители».
            </p>
          </div>
          <a
            href="/performers-feed.yml"
            className="rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-2 text-sm font-bold uppercase tracking-widest text-on-surface transition hover:bg-surface-container"
          >
            Открыть YML
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {serviceFeedOffers.map((offer) => (
            <article
              key={offer.id}
              className="rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm"
            >
              <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl bg-surface-container-low">
                <Image
                  src={offer.serviceImage}
                  alt={offer.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover object-center"
                />
              </div>
              <span className="inline-flex rounded-full bg-primary/12 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
                {offer.executorName}
              </span>
              <h2 className="mt-4 text-xl font-bold text-on-surface">{offer.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{offer.description}</p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs text-on-surface-variant">
                <span>Рейтинг: {offer.rating}</span>
                <span>·</span>
                <span>Отзывы: {offer.reviews}</span>
                <span>·</span>
                <span>Опыт: {offer.yearsExperience} лет</span>
              </div>
              <div className="mt-5 flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-widest text-on-surface-variant">Стоимость</div>
                  <div className="text-lg font-bold text-on-surface">{offer.salesNotes}</div>
                </div>
                <Link
                  href={`/services/${offer.slug}`}
                  className="rounded-xl bg-primary px-4 py-2 text-sm font-bold uppercase tracking-widest text-on-primary transition hover:opacity-90"
                >
                  Подробнее
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
