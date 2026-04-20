import Link from "next/link";
import {
  buildNewsDigest,
  NEWS_CATEGORY_LABEL,
  type NewsItem,
} from "@/lib/news-agent";

export const revalidate = 43200;
export const dynamic = "force-static";

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

export default async function NewsPage() {
  let items: NewsItem[] = [];
  let generatedAt = "";
  try {
    const digest = await buildNewsDigest();
    items = digest.items;
    generatedAt = digest.generatedAt;
  } catch {
    items = [];
  }

  const grouped = groupItems(items);
  const hasData = items.length > 0;

  return (
    <main className="min-h-screen bg-background px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-primary font-bold uppercase tracking-widest text-xs font-body">
              AI-дайджест
            </span>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">Новости</h1>
            <p className="mt-3 max-w-2xl text-on-surface-variant">
              Подборка актуальных материалов по ИИ, облачной инфраструктуре и корпоративным LLM. Новости подбирает наш
              собственный ИИ-агент и обновляет ленту автоматически.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-2 text-sm font-bold uppercase tracking-widest text-on-surface transition hover:bg-surface-container"
          >
            На главную
          </Link>
        </div>

        <div className="mb-8 rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-3 text-sm text-on-surface-variant">
            <span className="inline-flex rounded-full bg-primary/12 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
              Авто-обновление
            </span>
            <span>Новости подбирает наш собственный ИИ-агент</span>
            {generatedAt ? (
              <>
                <span className="text-outline-variant">·</span>
                <span>Обновлено: {formatDate(generatedAt)}</span>
              </>
            ) : null}
          </div>
        </div>

        {hasData ? (
          <div className="space-y-12">
            {BUCKET_ORDER.map((category) => {
              const bucketItems = grouped[category];
              if (!bucketItems || bucketItems.length === 0) return null;
              return (
                <section key={category}>
                  <div className="mb-5 flex items-end justify-between gap-4">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                      {NEWS_CATEGORY_LABEL[category]}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {bucketItems.map((item) => (
                      <a
                        key={item.url}
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm transition hover:border-primary/40"
                      >
                        <span className="inline-flex rounded-full bg-primary/12 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
                          {item.source || NEWS_CATEGORY_LABEL[category]}
                        </span>
                        <h3 className="mt-4 text-lg font-bold text-on-surface group-hover:text-primary">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
                          {item.summary}
                        </p>
                      </a>
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
                  Слот {idx + 1}: здесь появится новость, подобранная нашим ИИ-агентом.
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
