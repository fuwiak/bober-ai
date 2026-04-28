import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, DEFAULT_KEYWORDS, SITE_NAME, TELEGRAM_URL, absoluteUrl } from "@/lib/site";

const careerPerks = [
  {
    title: "Гибкая комиссия",
    description:
      "Прозрачная модель вознаграждения за подписанные контракты и продление договоров. Чем больше клиентов — тем выше процент.",
  },
  {
    title: "Горячий AI-рынок",
    description:
      "Продаёте востребованные решения: облачные LLM, чат-боты, приватные модели и AI-автоматизацию для реального бизнеса.",
  },
  {
    title: "Поддержка пресейла",
    description:
      "Наши инженеры помогают с архитектурой, демо и расчётом под клиента. Вы фокусируетесь на сделке, не на технической рутине.",
  },
  {
    title: "Готовые материалы",
    description:
      "Презентации, кейсы, прайс-листы и шаблоны КП под разные отрасли. Можно стартовать сразу без долгой упаковки.",
  },
];

export const metadata: Metadata = {
  title: "Карьера",
  description:
    "Kinetic AI ищет селлеров AI-решений: облачные LLM, корпоративные чат-боты, AI-инфраструктура и автоматизация для B2B.",
  keywords: [...DEFAULT_KEYWORDS, "вакансии ИИ", "sales AI", "работа B2B sales", "карьера в AI"],
  alternates: {
    canonical: absoluteUrl("/career"),
  },
};

export default function CareerPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Карьера", item: absoluteUrl("/career") },
    ],
  };

  const jobPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: "Селлер AI-решений",
    description:
      "Продажа B2B-решений в области AI-инфраструктуры, облачных LLM, корпоративных чат-ботов и автоматизации.",
    hiringOrganization: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: absoluteUrl("/"),
    },
    applicantLocationRequirements: {
      "@type": "Country",
      name: "RU",
    },
    employmentType: "CONTRACTOR",
    industry: "Artificial Intelligence",
    directApply: true,
    url: absoluteUrl("/career"),
    jobLocationType: "TELECOMMUTE",
    applicationContact: {
      "@type": "ContactPoint",
      email: CONTACT_EMAIL,
      url: TELEGRAM_URL,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd) }}
      />
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-primary font-bold uppercase tracking-widest text-xs font-body">Карьера</span>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">Ищем селлеров наших AI-решений</h1>
            <p className="mt-3 max-w-2xl text-on-surface-variant">
              Если вы умеете продавать сложные B2B-продукты и хотите работать с AI-инфраструктурой, облачными LLM и
              корпоративными чат-ботами — присоединяйтесь к команде Kinetic AI.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-2 text-sm font-bold uppercase tracking-widest text-on-surface transition hover:bg-surface-container"
          >
            На главную
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {careerPerks.map((perk) => (
            <div
              key={perk.title}
              className="rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-8 shadow-sm"
            >
              <h3 className="text-xl font-bold text-on-surface">{perk.title}</h3>
              <p className="mt-3 text-on-surface-variant leading-relaxed">{perk.description}</p>
            </div>
          ))}
        </div>

        <div className="relative mt-10 overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/10 via-surface-container-lowest to-surface-container-low p-8 shadow-xl lg:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/15 blur-3xl"
          />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-on-surface lg:text-3xl">
                Откройте для себя продажи в AI
              </h2>
              <p className="mt-3 max-w-xl text-on-surface-variant leading-relaxed">
                Отправьте короткое сообщение о своём опыте — мы вернёмся с деталями по условиям, территориям и воронке
                готовых лидов.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:shrink-0">
              <a
                href="https://t.me/sizovmaksim"
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                Написать в Telegram
              </a>
              <a
                href="mailto:hello@kinetic-ai.ru?subject=Career%20-%20Sales"
                className="btn-secondary inline-flex items-center gap-2"
              >
                Отправить резюме
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
