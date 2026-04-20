import Image from "next/image";
import Link from "next/link";
import {
  NEWS_CATEGORY_LABEL,
  type NewsItem,
} from "@/lib/news-agent";
import { getCachedDigest } from "@/lib/news-scheduler";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const FALLBACK_PLACEHOLDERS = [
  { tag: "LLM", title: "Новости по LLM и корпоративному ИИ" },
  { tag: "Облака", title: "Обновления Yandex Cloud, Selectel и cloud.ru" },
  { tag: "Безопасность", title: "152-ФЗ, приватные модели и защищённые контуры" },
  { tag: "Автоматизация", title: "Кейсы по автоматизации поддержки и продаж" },
  { tag: "GPU", title: "Анонсы сертифицированных GPU и инфраструктуры" },
  { tag: "Индустрия", title: "Главное из мира AI" },
];

const BUCKET_ORDER: NewsItem["category"][] = [
  "yandex-selectel",
  "russia",
  "world",
];

function groupItems(items: NewsItem[]): Record<NewsItem["category"], NewsItem[]> {
  const groups: Record<NewsItem["category"], NewsItem[]> = {
    "yandex-selectel": [],
    russia: [],
    world: [],
  };
  for (const item of items) {
    groups[item.category].push(item);
  }
  return groups;
}

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

function formatStreamTime(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  const now = new Date();
  const sameDay =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();
  const time = new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
  if (sameDay) return `сегодня ${time}`;
  const date = new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
  return `${date} ${time}`;
}

function NewsStreamItem({ item }: { item: NewsItem }) {
  const time = formatStreamTime(item.publishedAt);
  const categoryLabel = NEWS_CATEGORY_LABEL[item.category];
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col gap-4 border-b border-outline-variant/20 py-6 transition first:pt-0 last:border-b-0 sm:flex-row"
    >
      <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden rounded-2xl bg-surface-container-low sm:w-[260px]">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, 260px"
            className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
            unoptimized
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            Kinetic AI
          </div>
        )}
      </div>
      <div className="flex min-w-0 flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex rounded-full bg-primary/12 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
            {categoryLabel}
          </span>
          {item.source ? (
            <span className="text-xs font-medium text-on-surface-variant">{item.source}</span>
          ) : null}
        </div>
        <h3 className="mt-3 text-xl font-bold leading-snug text-on-surface transition group-hover:text-primary md:text-2xl">
          {item.title}
        </h3>
        {item.summary ? (
          <p className="mt-2 line-clamp-3 text-sm text-on-surface-variant md:text-base">
            {item.summary}
          </p>
        ) : null}
        {time ? (
          <div className="mt-3 text-xs font-medium uppercase tracking-wider text-on-surface-variant">
            {time}
          </div>
        ) : null}
      </div>
    </a>
  );
}

export default async function NewsPage() {
  let items: NewsItem[] = [];
  let generatedAt = "";
  try {
    const digest = await getCachedDigest();
    items = digest.items;
    generatedAt = digest.generatedAt;
  } catch {
    items = [];
  }

  const grouped = groupItems(items);
  const hasData = items.length > 0;

  return (
    <main className="min-h-screen bg-background px-6 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-primary font-bold uppercase tracking-widest text-xs font-body">
              AI-дайджест
            </span>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">Новости</h1>
            <p className="mt-3 max-w-2xl text-on-surface-variant">
              Подборку готовит <span className="font-semibold text-on-surface">Kinetic AI agent</span>. Он сам ищет
              актуальные материалы по ИИ, LLM и облачной AI-инфраструктуре и обновляет ленту автоматически.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-2 text-sm font-bold uppercase tracking-widest text-on-surface transition hover:bg-surface-container"
          >
            На главную
          </Link>
        </div>

        <div className="mb-10 rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-3 text-sm text-on-surface-variant">
            <span className="inline-flex rounded-full bg-primary/12 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
              Авто-обновление
            </span>
            <span>Подборку готовит Kinetic AI agent</span>
            {generatedAt ? (
              <>
                <span className="text-outline-variant">·</span>
                <span>Обновлено: {formatDate(generatedAt)}</span>
              </>
            ) : null}
          </div>
        </div>

        {hasData ? (
          <div className="space-y-14">
            {BUCKET_ORDER.map((category) => {
              const bucketItems = grouped[category];
              if (!bucketItems || bucketItems.length === 0) return null;
              return (
                <section key={category}>
                  <div className="mb-6 flex items-end justify-between gap-4 border-b border-outline-variant/30 pb-3">
                    <h2 className="text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
                      {NEWS_CATEGORY_LABEL[category]}
                    </h2>
                    <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                      {bucketItems.length} материал{bucketItems.length === 1 ? "" : "ов"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    {bucketItems.map((item) => (
                      <NewsStreamItem key={item.url} item={item} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FALLBACK_PLACEHOLDERS.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm"
              >
                <span className="inline-flex rounded-full bg-primary/12 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
                  {item.tag}
                </span>
                <h3 className="mt-4 text-lg font-bold text-on-surface">{item.title}</h3>
                <div className="mt-4 h-28 rounded-2xl border border-dashed border-outline-variant/40 bg-surface-container-low grid place-items-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    Материал скоро появится
                  </p>
                </div>
                <p className="mt-4 text-sm text-on-surface-variant">
                  Слот {idx + 1}: здесь появится новость, подобранная Kinetic AI agent.
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
