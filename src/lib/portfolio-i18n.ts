import type { PortfolioItem } from "@/lib/profile";

/** English copy for portfolio cases. Missing fields fall back to RU — those slugs stay RU-only in sitemap. */
export type PortfolioEnCopy = Partial<
  Pick<
    PortfolioItem,
    | "title"
    | "category"
    | "description"
    | "solution"
    | "result"
    | "metric"
    | "metricMethod"
    | "role"
    | "scope"
    | "duration"
    | "architecture"
    | "priceLabel"
  >
>;

export const PORTFOLIO_EN: Record<string, PortfolioEnCopy> = {
  "yandex-telemost-agent": {
    title: "Yandex Telemost Agent — AI for meetings and sales",
    category: "Artificial intelligence",
    metric: "Automatic meeting summaries in CRM",
    description:
      "An AI assistant for meetings and sales that captures key agreements during the call, transcribes the conversation and helps teams keep important client details.",
    solution:
      "The system connects to working tools, drafts follow-up emails, updates CRM and creates tasks after the meeting without manual copy-paste.",
    result:
      "Teams save time, process meeting outcomes faster, retain agreements and improve client follow-through and sales quality.",
  },
  "kaspersky-ai-assistant": {
    title: "Kaspersky product RAG bot for 1C staff",
    category: "Artificial intelligence",
    metric: "up to −50% repeat product questions",
    metricMethod: "On a pilot group of 1C staff, per the client’s internal assessment",
    role: "Contribution to a Kaspersky product RAG assistant for 1C employees",
    scope: "RAG over Kaspersky product docs, chat answers, escalation on low confidence",
    duration: "Pilot and iterations within the product perimeter",
    architecture: "LLM + RAG on a closed knowledge base, without unbounded access to corporate systems",
    description:
      "1C staff need fast answers on Kaspersky products: licenses, compatibility, configurations. Manual doc search took time and spawned the same repeat questions.",
    solution:
      "A RAG bot over Kaspersky product documentation for 1C staff and users: source-grounded chat answers and escalation to an expert when model confidence is low.",
    result:
      "1C staff get product answers faster, ask fewer repeat questions and spend less time on long manual knowledge-base searches.",
  },
  "lead-generation": {
    title: "GTM Flow — leads from ads and messengers",
    category: "Artificial intelligence",
    metric: "One funnel without lost leads",
    description:
      "Inbound requests scatter across Google, VK, Telegram, Profi.ru and Avito. Clients go cold, managers forget to call back — budget goes to competitors. GTM Flow collects everything in one place and moves each lead from first message to payment.",
    solution:
      "A unified lead feed from ads and messengers, auto-discovery in VK and Telegram, AI scoring (“60% chance of advance”), recovery of lost requests. One command — “message hesitant Telegram leads” — and AI runs qualification, call, Telemost and proposal.",
    result:
      "Fewer lost leads, faster deals. Managers work with clients instead of copying data between tabs. Funnel on a dashboard: inbound → leads → customers.",
  },
  "kp-llm-automation": {
    title: "Commercial proposal automation",
    category: "Sales automation",
    metric: "45 min → 2–5 min per proposal",
    metricMethod: "From the client’s pilot process on typical PDF requests",
    role: "Architecture and delivery of the proposal-generation contour",
    scope: "PDF request → catalog match → exact/analog/not-found statuses → DOCX/PDF → CRM",
    duration: "4–8 weeks to production launch",
    architecture: "LLM only for request parsing; prices and SKUs strictly from MySQL/CRM catalog",
    description:
      "Preparing commercial proposals took about 45 minutes: managers searched prices and SKUs in the catalog by hand, laid out Word/PDF, and calculated VAT and currency.",
    solution:
      "Automation: PDF → catalog matching → match statuses → DOCX/PDF assembly → CRM write-back. Prices are never invented by the model.",
    result:
      "A typical proposal is assembled in 2–5 minutes instead of ~45. Prices and SKUs only from the catalog — no invented line items. Table, VAT, terms and DOCX/PDF download.",
  },
  "elia-suite": {
    title: "ELIA Suite — isolated workspaces",
    category: "Sales automation",
    metric: "+32% quote→order conversion",
    metricMethod: "Per client data for the first 4 months after launch",
    role: "Workspace design and quote automation",
    scope: "Isolated workspaces, CRM workflow, quote PDF/XLSX assembly, 2FA and audit",
    duration: "Pilot and scale-out to 15 workspaces",
    architecture: "Role-based workspaces + CRM workflow + AI document assembly without data crossover",
    description:
      "Preparing commercial proposals took about 45 minutes. Partners and suppliers worked through public tools — without data isolation or links to internal systems.",
    solution:
      "CRM automation → approval workflow → AI for quote PDF/XLSX assembly → minutes instead of tens of minutes. A separate workspace per role with 2FA and audit.",
    result:
      "15 workspaces with no data crossover. 87% of tech requests via automation, −40% SAV load; quote→order conversion +32% per client data for the first 4 months. Payback on a ~4-month horizon at recurring volume.",
  },
  "crm-telegram-sheets": {
    title: "CRM + Telegram bot + Google Sheets for B2B",
    category: "IT and development",
    description:
      "A B2B company tracked orders in scattered spreadsheets and Telegram chats: managers duplicated statuses, lost requests and had no single funnel view.",
    solution:
      "A Telegram bot for intake and notifications, Google Sheets as a lightweight CRM, and n8n workflows for lead routing, reminders and manager reports.",
    result:
      "All requests in one table with history, automatic manager reminders and a transparent funnel without a heavy CRM rollout.",
  },
  "interior-design-bot": {
    title: "AI bot for interior designers in Telegram and MAX",
    category: "Artificial intelligence",
    description:
      "An interior design studio got repetitive requests: style, palette, furniture and estimates. Designers spent time on first-line consults instead of project work.",
    solution:
      "An AI bot in Telegram and MAX: qualifies the request, suggests references and layout options, builds a brief and hands a hot lead to the designer with full chat context.",
    result:
      "Less routine at first contact, faster briefs and more team time for visualizations and site supervision.",
  },
  "social-media-analytics": {
    title: "Real-time social media analytics",
    category: "Artificial intelligence",
    description:
      "Marketing needed brand and competitor mention monitoring: posts and comments were collected manually, so reactions to news lagged by hours.",
    solution:
      "A real-time social data pipeline, NLP sentiment and topic classification, and a dashboard with alerts on negative spikes or viral mentions.",
    result:
      "The team sees trends and risks right after publication, responds faster and adjusts content strategy from real data instead of selective monitoring.",
  },
  "ocr-text-extraction": {
    title: "OCR — text extraction from documents",
    category: "IT and development",
    description:
      "Accounting and legal teams processed invoice, act and contract scans by hand: operators typed details into finance systems, errors and delays piled up.",
    solution:
      "An OCR service for print and handwriting, structured field extraction from PDF/images and export to a spreadsheet or accounting API.",
    result:
      "Documents process in batches in minutes instead of hours of typing, fewer transfer errors and faster period close.",
  },
  "amocrm-website-integration": {
    title: "Website → amoCRM: leads without manual handling",
    category: "IT and development",
    description:
      "Corporate website leads were handled manually: a manager got an email and entered amoCRM with up to a day’s delay. Some leads were lost.",
    solution:
      "Website webhook → deal and contact in amoCRM in seconds → auto-assign owner → Telegram alert.",
    result:
      "Lead in CRM instantly, first contact within an hour. Zero ownerless requests.",
  },
  "bitrix24-erp-sync": {
    title: "Bitrix24 + 1C: deal and order sync",
    category: "IT and development",
    description:
      "Managers created deals in Bitrix24; accounting created orders in 1C. Data diverged; payment statuses did not show in CRM.",
    solution:
      "An API gateway with a queue: won deal → 1C order; 1C payment → Bitrix24 stage. Operation log and retries.",
    result:
      "One picture per deal, −80% manual duplication, alerts on mismatches.",
  },
  "crm-1c-sync": {
    title: "CRM ↔ 1C: single source of truth",
    category: "IT and development",
    description:
      "Orders were created twice — in CRM and 1C by different people. Stock in CRM went stale; payments did not close the funnel.",
    solution:
      "Bidirectional exchange via a middle service: counterparties, orders, payments, stock. Idempotency and reconciliation.",
    result:
      "−80% manual entry, zero lost orders on failures thanks to retries and alerts.",
  },
  "contract-approval-workflow": {
    title: "Contract approval: days → hours",
    category: "Sales automation",
    description:
      "Contracts got lost between email, CRM and file storage. Legal and finance approval took 3–5 days.",
    solution:
      "An approval chain with notifications, deadlines and audit. Document linked to the CRM deal.",
    result:
      "−70% approval time, full history of versions and decisions.",
  },
  "support-knowledge-base": {
    title: "Support knowledge base: −50% repeat questions",
    category: "Artificial intelligence",
    description:
      "L1 support answered the same questions on plans, setup and integrations. Docs were scattered across Confluence and PDFs.",
    solution:
      "Document indexing, vector search, an AI assistant with source links. Escalation to an expert on low confidence.",
    result:
      "−50% repeat tickets, faster onboarding for new agents.",
  },
  "invoice-processing-pipeline": {
    title: "Invoice processing pipeline: batches in minutes",
    category: "IT and development",
    description:
      "Accounting received 50+ invoices a day by email. Operators typed details into 1C by hand.",
    solution:
      "Auto-intake from mail → OCR → field extraction → validation → 1C document creation.",
    result:
      "A batch of 50 invoices in 10 minutes instead of 4 hours, −90% entry errors.",
  },
  "employee-onboarding-portal": {
    title: "Employee onboarding: 2 weeks instead of 2 months",
    category: "Artificial intelligence",
    description:
      "New hires spent months asking the same questions of HR and peers. Policies lived in Confluence, PDFs and email.",
    solution:
      "An onboarding portal with checklists, a knowledge base and an AI assistant over policies. HR system integration.",
    result:
      "Self-serve readiness in 2 weeks, −40% HR load.",
  },
};

export function hasPortfolioEnglish(slug: string): boolean {
  const copy = PORTFOLIO_EN[slug];
  return Boolean(copy?.title && copy.description && copy.solution && copy.result);
}

export function localizePortfolioItem(item: PortfolioItem, locale: string): PortfolioItem {
  if (locale !== "en") return item;
  const en = PORTFOLIO_EN[item.slug];
  if (!en) return item;
  return {
    ...item,
    ...en,
    skills: item.skills,
    stack: item.stack,
    image: item.image,
    slug: item.slug,
    id: item.id,
    featured: item.featured,
  };
}
