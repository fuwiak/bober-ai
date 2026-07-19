import type { LandingExtendedContent } from "@/lib/landing-extended";
import type {
  BuiltLanding,
  CatalogLandingContent,
  LandingSpec,
  LocaleCopy,
} from "@/lib/seo-catalog/types";

function buildMeta(locale: "ru" | "en", copy: LocaleCopy, keywords: string[]): CatalogLandingContent["metaTitle"] {
  return locale === "ru"
    ? `${copy.h1} — Bober AI Systems`
    : `${copy.h1} — Bober AI Systems`;
}

function buildDescription(locale: "ru" | "en", copy: LocaleCopy): string {
  const base = copy.subtitle;
  if (base.length <= 155) return base;
  return `${base.slice(0, 152)}…`;
}

function buildLocaleContent(
  locale: "ru" | "en",
  spec: LandingSpec,
  copy: LocaleCopy,
): CatalogLandingContent {
  return {
    metaTitle: buildMeta(locale, copy, spec.keywords),
    metaDescription: buildDescription(locale, copy),
    metaKeywords: spec.keywords,
    eyebrow: locale === "ru" ? "Автоматизация для бизнеса" : "Business automation",
    h1: copy.h1,
    subtitle: copy.subtitle,
    problemsTitle: locale === "ru" ? "Типичные проблемы" : "Typical problems",
    problems: copy.problems,
    deliverablesTitle: locale === "ru" ? "Что вы получаете" : "What you get",
    deliverables: copy.deliverables,
    relatedTitle: locale === "ru" ? "Связанные решения" : "Related solutions",
    related: spec.related.map((item) => ({
      href: item.href,
      label: locale === "ru" ? item.labelRu : item.labelEn,
    })),
    faq: copy.faq,
  };
}

function buildExtended(locale: "ru" | "en", copy: LocaleCopy): LandingExtendedContent {
  return {
    intro: copy.intro,
    howWeSolveTitle: locale === "ru" ? "Как мы решаем задачу" : "How we solve it",
    howWeSolve:
      locale === "ru"
        ? [
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
          ]
        : [
            {
              title: "Audit & ROI",
              text: "We map the current process, loss points, and calculate impact before development starts.",
            },
            {
              title: "Architecture & integrations",
              text: "We design workflow, CRM/ERP/API links, and an AI layer only where it delivers measurable value.",
            },
            {
              title: "Delivery & handover",
              text: "Production launch, documentation, team training, and optional SLA support.",
            },
          ],
    roiTitle: locale === "ru" ? "Типичный эффект" : "Typical impact",
    roi:
      locale === "ru"
        ? [
            { value: "−40–80%", label: "ручного труда в целевом процессе" },
            { value: "2–8 нед.", label: "до первого production-релиза" },
            { value: "3–6 мес.", label: "окупаемость при среднем проекте" },
          ]
        : [
            { value: "−40–80%", label: "manual work in the target process" },
            { value: "2–8 wks", label: "to first production release" },
            { value: "3–6 mo", label: "payback on a typical project" },
          ],
    faqTitle: locale === "ru" ? "Частые вопросы" : "FAQ",
    faq: copy.faq,
  };
}

export function buildLanding(spec: LandingSpec): BuiltLanding {
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
      en: buildLocaleContent("en", spec, spec.en),
    },
    extended: {
      ru: buildExtended("ru", spec.ru),
      en: buildExtended("en", spec.en),
    },
  };
}
