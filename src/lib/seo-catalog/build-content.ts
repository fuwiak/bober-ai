import type { LandingExtendedContent } from "@/lib/landing-extended";
import type {
  BuiltLanding,
  CatalogLandingContent,
  LandingSpec,
  LocaleCopy,
} from "@/lib/seo-catalog/types";

type CatalogLocale = "ru" | "kz" | "uz";

/** Unique titles: Webmaster flagged many identical title/description pairs from catalog templates. */
function buildMeta(_locale: CatalogLocale, copy: LocaleCopy): CatalogLandingContent["metaTitle"] {
  return `${copy.h1} — услуги, цена, внедрение | Bober AI`;
}

function buildDescription(_locale: CatalogLocale, copy: LocaleCopy): string {
  const base = `${copy.h1}. ${copy.subtitle}`.replace(/\s+/g, " ").trim();
  if (base.length <= 160) return base;
  return `${base.slice(0, 157)}…`;
}

function buildLocaleContent(
  locale: CatalogLocale,
  spec: LandingSpec,
  copy: LocaleCopy,
): CatalogLandingContent {
  const uz = locale === "uz";
  return {
    metaTitle: buildMeta(locale, copy),
    metaDescription: buildDescription(locale, copy),
    metaKeywords: spec.keywords,
    eyebrow: uz ? "Biznes uchun avtomatlashtirish" : "Автоматизация для бизнеса",
    h1: copy.h1,
    subtitle: copy.subtitle,
    problemsTitle: uz ? "Tipik muammolar" : "Типичные проблемы",
    problems: copy.problems,
    deliverablesTitle: uz ? "Nima olasiz" : "Что вы получаете",
    deliverables: copy.deliverables,
    relatedTitle: uz ? "Bogʻliq yechimlar" : "Связанные решения",
    related: spec.related.map((item) => ({
      href: item.href,
      label: uz ? item.labelEn : item.labelRu,
    })),
    faq: copy.faq,
  };
}

function buildExtended(locale: CatalogLocale, copy: LocaleCopy): LandingExtendedContent {
  const uz = locale === "uz";
  return {
    intro: copy.intro,
    howWeSolveTitle: uz ? "Qanday yechamiz" : "Как мы решаем задачу",
    howWeSolve:
      copy.howWeSolve ??
      (uz
        ? [
            {
              title: "Audit va ROI",
              text: "Joriy jarayon, yoʻqotish nuqtalari va ishlab chiqishdan oldin effektni hisoblaymiz.",
            },
            {
              title: "Arxitektura va integratsiyalar",
              text: "Workflow, CRM/1C/API bogʻlanishi va faqat oʻlchanadigan joyda AI-qatlam.",
            },
            {
              title: "Joriy etish va topshirish",
              text: "Production ishga tushirish, hujjatlar, jamoa oʻqitish va SLA qoʻllab-quvvatlash.",
            },
          ]
        : [
            {
              title: "Аудит и ROI",
              text: "Разбираем текущий процесс, точки потерь и считаем эффект до старта разработки.",
            },
            {
              title: "Архитектура и интеграции",
              text: "Проектируем workflow, связку с CRM/1С/API и AI-слой только там, где он даёт измеримый результат.",
            },
            {
              title: "Внедрение и передача",
              text: "Production-запуск, документация, обучение команды и сопровождение по SLA.",
            },
          ]),
    roiTitle: uz ? "Tipik effekt" : "Типичный эффект",
    roi: uz
      ? [
          { value: "−40–80%", label: "maqsadli jarayonda qoʻlda mehnat" },
          { value: "2–8 hafta", label: "birinchi production-relizgacha" },
          { value: "3–6 oy", label: "oʻrtacha loyihada qaytim" },
        ]
      : [
          { value: "−40–80%", label: "ручного труда в целевом процессе" },
          { value: "2–8 нед.", label: "до первого production-релиза" },
          { value: "3–6 мес.", label: "окупаемость при среднем проекте" },
        ],
    faqTitle: uz ? "Koʻp soʻraladigan savollar" : "Частые вопросы",
    faq: copy.faq,
  };
}

export function buildLanding(spec: LandingSpec): BuiltLanding {
  // KZ: Russian market copy (spec.ru). UZ: Russian body + Uzbek chrome labels for now.
  return {
    def: {
      category: spec.category,
      slug: spec.slug,
      contentKey: spec.contentKey,
      serviceSlug: spec.serviceSlug,
      coverImage: spec.coverImage,
      caseStudySlugs: spec.caseStudySlugs,
    },
    content: {
      ru: buildLocaleContent("ru", spec, spec.ru),
      kz: buildLocaleContent("kz", spec, spec.ru),
      uz: buildLocaleContent("uz", spec, spec.ru),
    },
    extended: {
      ru: buildExtended("ru", spec.ru),
      kz: buildExtended("kz", spec.ru),
      uz: buildExtended("uz", spec.ru),
    },
  };
}
