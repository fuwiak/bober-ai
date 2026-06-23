import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { absoluteUrl, KWORK_URL } from "@/lib/site";
import { formatOfferPrice, getOrderTelegramUrl, serviceFeedOffers } from "@/lib/services-feed";

export const metadata: Metadata = {
  title: "Готовые услуги",
  description:
    "Кворки AI и автоматизации: боты, консультации LLM, Claude, GigaChat, Telegram, Discord.",
  alternates: {
    canonical: absoluteUrl("/services"),
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <SiteHeader />
      <main className="section-band">
        <div className="container-editorial">
          <Link href="/" className="text-link text-sm">
            ← На главную
          </Link>
          <h1 className="display-md mt-4">Готовые услуги</h1>
          <p className="mt-3 text-sm text-body">
            Услуги с{" "}
            <a href={KWORK_URL} target="_blank" rel="noreferrer" className="text-link">
              Kwork
            </a>
            . Нажмите «Купить» для заказа в Telegram.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceFeedOffers.map((offer) => (
              <article key={offer.id} className="feature-card-bordered overflow-hidden p-0">
                <div className="relative aspect-[4/3] bg-surface-card">
                  <Image
                    src={offer.serviceImage}
                    alt={offer.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-lg tracking-tight text-ink">{offer.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-body">{offer.description}</p>
                  <div className="mt-5 flex items-end justify-between gap-2 border-t border-hairline pt-5">
                    <div>
                      <p className="font-display text-xl tracking-tight">{formatOfferPrice(offer)}</p>
                      <p className="text-xs text-muted">{offer.deliveryDays} дн.</p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/services/${offer.slug}`} className="btn-secondary text-xs">
                        Подробнее
                      </Link>
                      <a
                        href={getOrderTelegramUrl(offer.title)}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary text-xs"
                      >
                        Купить
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
