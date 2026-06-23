import type { Metadata } from "next";
import Link from "next/link";
import { DEFAULT_KEYWORDS, ORGANIZATION_NAME, SITE_NAME, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Академия Yandex",
  description:
    "Обучающий раздел Bober AI Dev с практическими материалами по внедрению ИИ, автоматизации процессов и облачной инфраструктуре.",
  keywords: [...DEFAULT_KEYWORDS, "обучение ИИ", "курсы по ИИ", "AI обучение", "Yandex Academy"],
  alternates: {
    canonical: absoluteUrl("/academy"),
  },
};

export default function AcademyPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Академия Yandex", item: absoluteUrl("/academy") },
    ],
  };

  const educationJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: `${SITE_NAME} Academy`,
    parentOrganization: {
      "@type": "Organization",
      name: ORGANIZATION_NAME,
    },
    url: absoluteUrl("/academy"),
    description:
      "Практические видео и обучающие материалы по внедрению ИИ, автоматизации процессов и облачной инфраструктуре.",
    hasCourse: [
      {
        "@type": "Course",
        name: "Практика внедрения ИИ",
        description: "Видео-разборы внедрения ИИ, автоматизации и реальных бизнес-кейсов.",
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
          sameAs: absoluteUrl("/"),
        },
      },
    ],
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
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-primary font-bold uppercase tracking-widest text-xs font-body">
              Обучение и практика
            </span>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">Академия Yandex</h1>
            <p className="mt-3 max-w-2xl text-on-surface-variant">
              Здесь будут практические видео с разбором внедрения ИИ, автоматизации процессов и реальных бизнес-кейсов.
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
          {[1, 2, 3, 4].map((slot) => (
            <div
              key={slot}
              className="rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-8 shadow-sm"
            >
              <div className="aspect-video rounded-2xl border border-dashed border-outline-variant/40 bg-surface-container-low grid place-items-center">
                <p className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Видео уже скоро</p>
              </div>
              <p className="mt-4 text-sm text-on-surface-variant">
                Слот {slot}: обучающий видео-разбор для вашей команды.
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
