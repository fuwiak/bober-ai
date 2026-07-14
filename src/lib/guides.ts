import { DIAGRAM_IMAGES } from "@/lib/site";

export type GuideDef = {
  slug: string;
  contentKey: string;
  coverImage: string;
  relatedLandings: { href: string; labelKey: string }[];
};

export const GUIDES: GuideDef[] = [
  {
    slug: "automate-sales-department",
    contentKey: "automateSales",
    coverImage: DIAGRAM_IMAGES.sales,
    relatedLandings: [
      { href: "/automation/sales", labelKey: "salesLanding" },
      { href: "/integrations/crm", labelKey: "crmLanding" },
    ],
  },
  {
    slug: "speed-up-commercial-proposals",
    contentKey: "speedUpProposals",
    coverImage: DIAGRAM_IMAGES.sales,
    relatedLandings: [
      { href: "/automation/sales", labelKey: "salesLanding" },
      { href: "/automation/documents", labelKey: "documentsLanding" },
    ],
  },
  {
    slug: "connect-crm-with-1c",
    contentKey: "connectCrm1c",
    coverImage: DIAGRAM_IMAGES.erp,
    relatedLandings: [
      { href: "/integrations/1c", labelKey: "oneCLanding" },
      { href: "/integrations/crm", labelKey: "crmLanding" },
    ],
  },
  {
    slug: "when-ai-makes-sense",
    contentKey: "whenAiMakesSense",
    coverImage: DIAGRAM_IMAGES.architecture,
    relatedLandings: [
      { href: "/automation/processes", labelKey: "processesLanding" },
      { href: "/ai/corporate", labelKey: "aiLanding" },
    ],
  },
  {
    slug: "ai-glossary",
    contentKey: "aiGlossary",
    coverImage: DIAGRAM_IMAGES.architecture,
    relatedLandings: [
      { href: "/services/rag", labelKey: "ragLanding" },
      { href: "/services/ai-agent", labelKey: "agentLanding" },
    ],
  },
];

export function getGuide(slug: string) {
  return GUIDES.find((guide) => guide.slug === slug);
}
