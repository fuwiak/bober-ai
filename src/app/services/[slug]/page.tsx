import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { KWORK_URL, TELEGRAM_URL } from "@/lib/site";
import {
  formatOfferPrice,
  getOrderTelegramUrl,
  getServiceOfferUrl,
  serviceFeedOffers,
} from "@/lib/services-feed";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return serviceFeedOffers.map((offer) => ({ slug: offer.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const offer = serviceFeedOffers.find((item) => item.slug === slug);
  if (!offer) return {};
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

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: offer.title,
    description: offer.description,
    provider: { "@type": "Person", name: offer.executorName },
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
    <div className="min-h-screen bg-canvas">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <SiteHeader />
      <main className="section-band">
        <div className="container-editorial">
          <Link href="/#services" className="text-link text-sm">
            ← Все услуги
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
            <article>
              <h1 className="display-md">{offer.title}</h1>
              <p className="mt-4 text-base leading-relaxed text-body">{offer.description}</p>

              <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl bg-surface-card">
                <Image
                  src={offer.serviceImage}
                  alt={offer.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="object-cover"
                  unoptimized={offer.serviceImage.endsWith(".svg")}
                />
              </div>

              <div className="feature-card mt-8">
                <h2 className="font-display text-xl tracking-tight">Что входит</h2>
                <p className="mt-3 text-sm leading-relaxed text-body">{offer.about}</p>
                <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-body">
                  <li>Аудит задачи и согласование ТЗ</li>
                  <li>Разработка и настройка решения</li>
                  <li>Тестирование и запуск</li>
                  <li>Инструкция и передача проекта</li>
                </ul>
              </div>
            </article>

            <aside className="feature-card-bordered self-start">
              <p className="font-display text-2xl tracking-tight">{formatOfferPrice(offer)}</p>
              <p className="mt-1 text-sm text-muted">Срок: {offer.deliveryDays} дн.</p>

              <div className="mt-5 flex flex-col gap-2">
                <a
                  href={getOrderTelegramUrl(offer.title)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary text-center"
                >
                  Купить сейчас
                </a>
                <a
                  href={offer.kworkUrl ?? KWORK_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary text-center"
                >
                  Заказать на Kwork
                </a>
                <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn-secondary text-center">
                  Написать в Telegram
                </a>
              </div>

              <div className="mt-6 border-t border-hairline pt-6">
                <p className="mb-4 text-sm font-medium text-ink">Или оставьте заявку</p>
                <ContactForm defaultService={offer.title} />
              </div>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
