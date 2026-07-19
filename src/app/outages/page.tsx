import type { Metadata } from "next";
import Link from "next/link";
import { fetchOutageFeed } from "@/lib/outages-feed";
import { DEFAULT_KEYWORDS, SITE_NAME, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Аварии Yandex Cloud",
  description: "Лента оповещений о проблемах с доступностью и восстановлении сервисов Yandex Cloud.",
  keywords: [...DEFAULT_KEYWORDS, "Yandex Cloud аварии", "Yandex Cloud alerts", "статус сервисов"],
  alternates: {
    canonical: absoluteUrl("/outages"),
  },
};

function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export default async function OutagesPage() {
  const items = await fetchOutageFeed();
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Аварии Yandex Cloud", item: absoluteUrl("/outages") },
    ],
  };

  return (
    <main className="min-h-screen bg-background px-6 py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-primary font-bold uppercase tracking-widest text-xs font-body">
              Мониторинг
            </span>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">Аварии</h1>
            <p className="mt-3 max-w-2xl text-on-surface-variant">
              Оповещение пользователей Yandex Cloud о проблемах с доступностью и восстановлении работоспособности
              сервисов.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-2 text-sm font-bold uppercase tracking-widest text-on-surface transition hover:bg-surface-container"
          >
            На главную
          </Link>
        </div>

        <div className="mb-6 rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-4 text-sm text-on-surface-variant">
          Источник:{" "}
          <a
            href="https://t.me/yandexcloudalerts"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            Yandex Cloud Alerts
          </a>
        </div>

        {items.length > 0 ? (
          <div className="space-y-4">
            {items.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="block rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-5 transition hover:border-primary/40"
              >
                <p className="text-on-surface whitespace-pre-line">{item.text}</p>
                <div className="mt-3 text-xs uppercase tracking-widest text-on-surface-variant">
                  {formatDate(item.publishedAt) || "Telegram"}
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-8 text-center text-on-surface-variant">
            Лента оповещений временно недоступна. Проверьте канал по ссылке выше.
          </div>
        )}
      </div>
    </main>
  );
}
