import type { Messages } from "@/lib/i18n";
import { t } from "@/lib/i18n";

export type NavIconId =
  | "grid"
  | "shield"
  | "bolt"
  | "sales"
  | "search"
  | "case"
  | "process"
  | "about"
  | "career"
  | "partner"
  | "news"
  | "book"
  | "check"
  | "media"
  | "help";

export type NavLinkItem = {
  href: string;
  label: string;
  description?: string;
  localeAgnostic?: boolean;
  icon?: NavIconId;
};

export type NavColumn = {
  title: string;
  items: NavLinkItem[];
};

export type NavGroup =
  | {
      id: string;
      type: "link";
      label: string;
      href: string;
      localeAgnostic?: boolean;
    }
  | {
      id: string;
      type: "drop";
      label: string;
      items: NavLinkItem[];
    }
  | {
      id: string;
      type: "mega";
      label: string;
      columns: NavColumn[];
      footerTags?: string[];
      footerLink?: NavLinkItem;
      promo?: { title: string; text: string; href: string; cta: string };
    };

export function buildNavGroups(messages: Messages): NavGroup[] {
  const nav = messages.nav;

  return [
    {
      id: "solutions",
      type: "mega",
      label: nav.services,
      columns: [
        {
          title: nav.colPlatform,
          items: [
            { href: "/services", label: nav.servicesPage, description: nav.servicesDesc, icon: "grid" },
            {
              href: "/ii-dlya-biznesa",
              label: nav.iiDlyaBiznesa,
              description: nav.iiDlyaBiznesaDesc,
              icon: "bolt",
            },
            { href: "/ai-kubernetes", label: nav.aiKubernetes, description: nav.aiKubernetesDesc, icon: "bolt" },
            { href: "/automation", label: nav.automation, description: nav.automationDesc, icon: "process" },
          ],
        },
        {
          title: nav.colSecurity,
          items: [
            { href: "/secure-ai", label: nav.secureAi, description: nav.secureAiDesc, icon: "shield" },
            {
              href: "/kaspersky",
              label: "Kaspersky Secure AI",
              description: nav.secureAiDesc,
              icon: "shield",
            },
          ],
        },
        {
          title: nav.colAutomation,
          items: [
            {
              href: "/integrations/business-from-phone",
              label: "CRM с телефона",
              description: "Битрикс24, amoCRM, YCLIENTS, RetailCRM",
              icon: "sales",
            },
            {
              href: "/bitrix",
              label: "Bitrix24 · amoCRM",
              description: nav.bitrixDesc,
              icon: "sales",
              localeAgnostic: true,
            },
            {
              href: "/services/ai-sales-loop",
              label: "AI Sales Loop",
              description: nav.salesLoopDesc,
              icon: "sales",
            },
            { href: "/services/rag", label: "RAG", description: nav.ragDesc, icon: "search" },
            { href: "/claude", label: nav.claude, description: nav.claudeDesc, icon: "bolt" },
          ],
        },
      ],
      footerTags: [nav.footTagNda, nav.footTagFixed, nav.footTagRu],
      footerLink: { href: "/services", label: nav.allSolutions },
      promo: {
        title: nav.promoTitle,
        text: nav.promoText,
        href: "/#contact",
        cta: nav.promoCta,
      },
    },
    {
      id: "portfolio",
      type: "link",
      label: nav.portfolio,
      href: "/portfolio",
    },
    {
      id: "pricing",
      type: "link",
      label: nav.pricing,
      href: "/pricing",
    },
    {
      id: "company",
      type: "drop",
      label: nav.company,
      items: [
        { href: "/about", label: nav.about, description: nav.aboutDesc, icon: "about" },
        { href: "/pricing#process", label: nav.howWeWork, description: nav.howWeWorkDesc, icon: "process" },
        { href: "/career", label: nav.career, description: nav.careerDesc, icon: "career" },
        { href: "/partners", label: nav.partners, description: nav.partnersDesc, icon: "partner" },
        { href: "/portfolio", label: nav.portfolio, description: nav.portfolioDesc, icon: "case" },
      ],
    },
    {
      id: "resources",
      type: "drop",
      label: nav.resources,
      items: [
        { href: "/blog", label: nav.blog, description: nav.blogDesc, icon: "news" },
        { href: "/academy", label: nav.academy, description: nav.academyDesc, icon: "book", localeAgnostic: true },
        { href: "/guides", label: nav.guides, description: nav.guidesDesc, icon: "check" },
        { href: "/media", label: nav.media, description: nav.mediaDesc, icon: "media" },
        { href: "/faq", label: nav.faq, description: nav.faqDesc, icon: "help" },
      ],
    },
  ];
}

/** Header label bundle derived from messages.nav. */
export function navLabels(messages: Messages) {
  return {
    writeLabel: t(messages, "nav.consultCta"),
    writeShortLabel: t(messages, "nav.consultCtaShort"),
    menuOpenLabel: t(messages, "nav.menuOpen"),
    menuCloseLabel: t(messages, "nav.menuClose"),
    quickContactLabel: t(messages, "nav.quickContact"),
    callLabel: t(messages, "nav.call"),
    telegramLabel: t(messages, "nav.telegram"),
    localeSwitchLabel: t(messages, "locale.switchTo"),
  };
}
