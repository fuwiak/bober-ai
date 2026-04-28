import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_NAME, TELEGRAM_URL, absoluteUrl } from "@/lib/site";
import { getServiceOfferUrl, serviceFeedOffers } from "@/lib/services-feed";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return serviceFeedOffers.map((offer) => ({ slug: offer.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const offer = serviceFeedOffers.find((item) => item.slug === slug);
  if (!offer) {
    return {};
  }
  return {
    title: offer.title,
    description: offer.description,
    alternates: {
      canonical: getServiceOfferUrl(offer.slug),
    },
  };
}

export default async function ServiceOfferPage({ params }: PageProps) {
  const { slug } = await params;
  const offer = serviceFeedOffers.find((item) => item.slug === slug);
  if (!offer) notFound();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Услуги Kinetic AI", item: absoluteUrl("/services") },
      { "@type": "ListItem", position: 3, name: offer.title, item: getServiceOfferUrl(offer.slug) },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: offer.title,
    description: offer.description,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    areaServed: "Россия",
    url: getServiceOfferUrl(offer.slug),
    offers: {
      "@type": "Offer",
      price: offer.price,
      priceCurrency: "RUR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main className="min-h-screen bg-background px-6 py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article className="min-w-0">
          <Link
            href="/services"
            className="text-xs font-bold uppercase tracking-widest text-primary underline-offset-4 hover:underline"
          >
            Назад к каталогу услуг
          </Link>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-on-surface md:text-4xl">{offer.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-on-surface-variant">{offer.description}</p>

          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl bg-surface-container-low">
            <Image
              src={offer.serviceImage}
              alt={offer.title}
              fill
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover object-center"
            />
          </div>

          <div className="mt-8 rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-on-surface">Что входит</h2>
            <p className="mt-4 leading-relaxed text-on-surface-variant">{offer.about}</p>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-on-surface-variant">
              <li>Аудит текущих процессов и архитектуры.</li>
              <li>Проектирование целевого AI- или cloud-сценария.</li>
              <li>Внедрение, интеграции и запуск в production.</li>
              <li>Поддержка, сопровождение и развитие после релиза.</li>
            </ul>
          </div>
        </article>

        <aside className="self-start rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm">
          <span className="inline-flex rounded-full bg-primary/12 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
            {offer.executorName}
          </span>
          <div className="mt-5 space-y-3 text-sm text-on-surface-variant">
            <div>Стоимость: <span className="font-semibold text-on-surface">{offer.salesNotes}</span></div>
            <div>Рейтинг: <span className="font-semibold text-on-surface">{offer.rating}</span></div>
            <div>Отзывы: <span className="font-semibold text-on-surface">{offer.reviews}</span></div>
            <div>Опыт: <span className="font-semibold text-on-surface">{offer.yearsExperience} лет</span></div>
            <div>Регион: <span className="font-semibold text-on-surface">Россия</span></div>
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <a href="/#contact" className="btn-primary text-center">
              Оставить заявку
            </a>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary text-center"
            >
              Написать в Telegram
            </a>
          </div>
        </aside>
      </div>
    </main>
  );
}
