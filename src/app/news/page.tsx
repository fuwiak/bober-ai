import Link from "next/link";

const newsPlaceholders = [
  { tag: "LLM", title: "Новости по LLM и корпоративному ИИ" },
  { tag: "Облака", title: "Обновления Yandex Cloud, Selectel и cloud.ru" },
  { tag: "Безопасность", title: "152-ФЗ, приватные модели и защищённые контуры" },
  { tag: "Автоматизация", title: "Кейсы по автоматизации поддержки и продаж" },
  { tag: "GPU", title: "Анонсы сертифицированных GPU и инфраструктуры" },
  { tag: "Индустрия", title: "Главное из мира AI за последние 12 часов" },
];

export default function NewsPage() {
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
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsPlaceholders.map((item, idx) => (
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
      </div>
    </main>
  );
}
