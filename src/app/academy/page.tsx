import type { Metadata } from "next";
import Link from "next/link";
import { DEFAULT_KEYWORDS, SITE_NAME, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Практикум Yandex Webmaster и Yaga",
  description:
    `Практические туториалы ${SITE_NAME} по Yandex API и CLI yaga: OAuth, Вебмастер, Метрика, SEO-чеклист.`,
  keywords: [
    ...DEFAULT_KEYWORDS,
    "обучение ИИ",
    "Yandex Webmaster",
    "Yandex Metrika",
    "yaga CLI",
    "переобход страниц",
  ],
  alternates: {
    canonical: absoluteUrl("/academy"),
  },
};

type Tutorial = {
  id: string;
  title: string;
  summary: string;
  steps: string[];
  commands?: string[];
  note?: string;
};

const tutorials: Tutorial[] = [
  {
    id: "install",
    title: "Установка yaga и первый запуск",
    summary:
      "yaga — модульный Yandex CLI (Go + Bubble Tea). Каждый сервис Яндекса — отдельный brick: webmaster, metrika, cloud, gpt и другие.",
    steps: [
      "Установите Go 1.22 или новее, затем в корне клонированного репозитория выполните npm run yaga:install — команда соберёт бинарь и создаст запускатель в ~/bin/yaga.",
      "Запустите yaga без аргументов: откроется TUI с вкладками Bricks, Creds, Doctor, Output, Help.",
      "Проверьте окружение: yaga doctor — покажет наличие токенов и внешних бинарей (yc, yandex-disk и т.д.).",
      "Список bricks: yaga bricks. Спрятать owner-bricks для чужого окружения: yaga profile public.",
    ],
    commands: ["npm run yaga:install", "yaga", "yaga doctor", "yaga bricks", "yaga profile public"],
  },
  {
    id: "oauth",
    title: "OAuth: ClientID ≠ access token",
    summary:
      "Частая ошибка: сохранить Client ID и Client secret и ждать, что API заработает. Для Вебмастера нужен access token вида y0_…",
    steps: [
      "Создайте приложение на oauth.yandex.ru → Мои приложения и скопируйте ClientID и Client secret.",
      "Сохраните их: yaga credentials set YANDEX_WEBMASTER_CLIENT_ID … и YANDEX_WEBMASTER_CLIENT_SECRET …",
      "Один раз обменяйте code на token: yaga webmaster oauth — откроется браузер, после кода token попадёт в ~/.config/yaga/credentials.env.",
      "Проверка: yaga credentials (список ключей и ссылок на UI) и yaga webmaster status.",
    ],
    commands: [
      "yaga credentials set YANDEX_WEBMASTER_CLIENT_ID <id>",
      "yaga credentials set YANDEX_WEBMASTER_CLIENT_SECRET <secret>",
      "yaga webmaster oauth",
      "yaga webmaster status",
    ],
    note: "Секреты хранятся в ~/.config/yaga/credentials.env с правами файла 0600. Не добавляйте этот файл, token или Client Secret в Git и скриншоты.",
  },
  {
    id: "webmaster-seo",
    title: "SEO-чеклист Вебмастера",
    summary:
      "Brick webmaster дергает скрипты репозитория: статус, ИКС, диагностику, индекс, важные URL и переобход страниц.",
    steps: [
      "Снимок Вебмастер + Метрика: yaga webmaster status (алиас: yaga wm status).",
      "Чеклист позиций: yaga webmaster seo — ИКС, диагностика, индекс, запросы.",
      "Перед переобходом проверьте дневную квоту: yaga webmaster recrawl --quota.",
      "Фид исполнителей и зеркала: yaga webmaster feed · yaga webmaster mirrors.",
    ],
    commands: [
      "yaga webmaster status",
      "yaga webmaster seo",
      "yaga webmaster recrawl --quota",
      "yaga webmaster recrawl https://www.bober-ai.dev/",
      "yaga webmaster feed",
    ],
    note: "Отчёт читает данные API и не меняет настройки сайта. Отсутствие критических ошибок не гарантирует индексацию или высокую позицию.",
  },
  {
    id: "recrawl",
    title: "Безопасный переобход изменённой страницы",
    summary:
      "Переобход сообщает роботу о новой или заметно обновлённой странице, но не гарантирует её индексацию или рост позиции.",
    steps: [
      "Сначала убедитесь, что URL возвращает HTTP 200, не закрыт в robots.txt и содержит правильный canonical.",
      "Проверьте остаток дневного лимита командой yaga webmaster recrawl --quota.",
      "Передайте полный URL в yaga webmaster recrawl. При успехе CLI выведет task_id и оставшуюся квоту.",
      "После обработки проверяйте не только обход, но и статус страницы в поиске через Yandex Webmaster.",
    ],
    commands: [
      "curl -I https://www.bober-ai.dev/academy",
      "yaga webmaster recrawl --quota",
      "yaga webmaster recrawl https://www.bober-ai.dev/academy",
    ],
    note: "Квота возвращается самим Webmaster API и может отличаться между сайтами. Отправка URL не задаёт срок появления страницы в поиске.",
  },
];

export default function AcademyPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Практикум Yaga", item: absoluteUrl("/academy") },
    ],
  };

  const educationJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Практикум Yandex Webmaster и Yaga",
    url: absoluteUrl("/academy"),
    description:
      "Практические туториалы по Yandex API и CLI yaga: установка, OAuth, Вебмастер, Метрика и SEO-чеклист.",
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: absoluteUrl("/") },
    hasPart: tutorials.map((tutorial) => ({
      "@type": "HowTo",
      name: tutorial.title,
      description: tutorial.summary,
      url: absoluteUrl(`/academy#${tutorial.id}`),
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationJsonLd) }}
      />
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-primary font-bold uppercase tracking-widest text-xs font-body">
              Обучение и практика
            </span>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">Практикум Yandex Webmaster и Yaga</h1>
            <p className="mt-3 max-w-2xl text-on-surface-variant">
              Практические туториалы по работе с сервисами Яндекса через CLI{" "}
              <code className="rounded bg-surface-container-low px-1.5 py-0.5 text-sm">yaga</code>
              : установка, OAuth, аудит индексации и переобход страниц. Команды соответствуют{" "}
              <code className="rounded bg-surface-container-low px-1.5 py-0.5 text-sm">cli/yaga</code>.
            </p>
            <p className="mt-3 max-w-2xl text-sm text-on-surface-variant">
              Yaga — CLI проекта Bober AI. Этот раздел не является официальной образовательной программой Яндекса.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-2 text-sm font-bold uppercase tracking-widest text-on-surface transition hover:bg-surface-container"
          >
            На главную
          </Link>
        </div>

        <div className="grid gap-8">
          {tutorials.map((tutorial, index) => (
            <article
              key={tutorial.id}
              id={tutorial.id}
              className="rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-6 md:p-8 shadow-sm"
            >
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  Туториал {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-on-surface">{tutorial.title}</h2>
              </div>
              <p className="mt-3 text-sm md:text-base text-on-surface-variant">{tutorial.summary}</p>

              <ol className="mt-6 space-y-3">
                {tutorial.steps.map((step, stepIndex) => (
                  <li key={step} className="flex gap-3 text-sm md:text-base text-on-surface">
                    <span className="mt-0.5 shrink-0 text-xs font-bold uppercase tracking-widest text-primary">
                      {stepIndex + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>

              {tutorial.commands?.length ? (
                <div className="mt-6 overflow-x-auto rounded-2xl border border-outline-variant/20 bg-surface-container-low p-4">
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">
                    Команды
                  </p>
                  <pre className="font-mono text-xs md:text-sm leading-relaxed text-on-surface whitespace-pre-wrap">
                    {tutorial.commands.join("\n")}
                  </pre>
                </div>
              ) : null}

              {tutorial.note ? (
                <p className="mt-4 text-sm text-on-surface-variant">{tutorial.note}</p>
              ) : null}
            </article>
          ))}
        </div>

        <p className="mt-10 text-sm text-on-surface-variant">
          Подробнее в репозитории:{" "}
          <code className="rounded bg-surface-container-low px-1.5 py-0.5">cli/yaga/README.md</code>
          {" · "}
          официальные источники:{" "}
          <a href="https://yandex.com/dev/webmaster/doc/en/tasks/how-to-get-oauth" target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">OAuth</a>
          {" · "}
          <a href="https://yandex.com/support/webmaster/en/service/site-indexing" target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">статистика обхода</a>
          {" · "}
          <a href="https://yandex.com/dev/webmaster/doc/en/reference/host-recrawl-quota-get" target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">квота переобхода</a>
        </p>
      </div>
    </main>
  );
}
