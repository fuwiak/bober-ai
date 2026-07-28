/** Data + scoring for the "AI-аудит процесса за 5 минут" lead magnet (/audit). */

export type OptionValue<T extends string> = { value: T; ru: string; en: string };

export type ProcessType = "sales" | "documents" | "crm" | "support" | "knowledge" | "other";
export type BudgetTier = "lt300" | "300-500" | "500-1m" | "gt1m" | "unknown";

export const PROCESS_TYPE_OPTIONS: OptionValue<ProcessType>[] = [
  { value: "sales", ru: "Продажи / КП", en: "Sales / proposals" },
  { value: "documents", ru: "Документы / OCR", en: "Documents / OCR" },
  { value: "crm", ru: "CRM / 1С", en: "CRM / 1C" },
  { value: "support", ru: "Поддержка", en: "Support" },
  { value: "knowledge", ru: "База знаний / RAG", en: "Knowledge base / RAG" },
  { value: "other", ru: "Другое", en: "Other" },
];

export const SYSTEMS_OPTIONS: OptionValue<string>[] = [
  { value: "bitrix24", ru: "Bitrix24", en: "Bitrix24" },
  { value: "amocrm", ru: "amoCRM", en: "amoCRM" },
  { value: "1c", ru: "1С", en: "1C" },
  { value: "excel-mail", ru: "Excel / почта", en: "Excel / email" },
  { value: "multiple", ru: "Несколько систем", en: "Multiple systems" },
  { value: "custom", ru: "Своя система", en: "Custom system" },
];

export const BUDGET_OPTIONS: OptionValue<BudgetTier>[] = [
  { value: "lt300", ru: "До 300 000 ₽", en: "Under €3,000" },
  { value: "300-500", ru: "300–500 000 ₽", en: "€3,000–5,000" },
  { value: "500-1m", ru: "500 000 ₽ – 1 млн ₽", en: "€5,000–10,000" },
  { value: "gt1m", ru: "Более 1 млн ₽", en: "Over €10,000" },
  { value: "unknown", ru: "Нужна оценка", en: "Need an estimate" },
];

const SCENARIOS: Record<ProcessType, { ru: string; en: string }> = {
  sales: {
    ru: "Автоматизация обработки заявок и формирования КП",
    en: "Automate lead intake and proposal generation",
  },
  documents: {
    ru: "Автоматическое распознавание и обработка документов (OCR + проверка данных)",
    en: "Automated document recognition and processing (OCR + data checks)",
  },
  crm: {
    ru: "Синхронизация CRM и 1С без ручного переноса данных",
    en: "CRM and 1C sync without manual data transfer",
  },
  support: {
    ru: "AI-ассистент поддержки с эскалацией сложных обращений",
    en: "AI support assistant with escalation for complex cases",
  },
  knowledge: {
    ru: "Корпоративная база знаний с RAG-поиском по документам",
    en: "Corporate knowledge base with RAG search over documents",
  },
  other: {
    ru: "Индивидуальный сценарий автоматизации под ваш процесс",
    en: "A custom automation scenario for your process",
  },
};

export type ProcessAuditAnswers = {
  processType: ProcessType;
  peopleCount: number;
  monthlyOps: number;
  minutesPerOp: number;
  confidential: boolean;
  budget: BudgetTier;
};

export type ProcessAuditResult = {
  totalHours: number;
  savingsLow: number;
  savingsHigh: number;
  scenario: string;
  format: string;
  budgetHint: string;
};

/** Automatable share is conservative — same 0.4–0.7 spread used by the ROI calculator's 0.55 midpoint. */
export function computeProcessAudit(answers: ProcessAuditAnswers, locale: string): ProcessAuditResult {
  const ru = locale !== "uz";
  const totalHours = (Math.max(0, answers.monthlyOps) * Math.max(0, answers.minutesPerOp)) / 60;
  const savingsLow = Math.round(totalHours * 0.4);
  const savingsHigh = Math.round(totalHours * 0.7);
  const scenario = SCENARIOS[answers.processType] ?? SCENARIOS.other;

  let format: string;
  let budgetHint: string;
  if (answers.budget === "unknown" || answers.confidential) {
    format = ru ? "Аудит процесса, затем пилот" : "Process audit, then a pilot";
    budgetHint = ru ? "от 150 000 ₽ (аудит)" : "from €1,500 (audit)";
  } else if (answers.budget === "lt300" || totalHours < 30) {
    format = ru ? "Пилот 2–4 недели на одном процессе" : "Pilot, 2–4 weeks on one process";
    budgetHint = ru ? "от 300 000 ₽" : "from €3,000";
  } else if (answers.budget === "300-500" || totalHours < 80) {
    format = ru ? "Внедрение Bitrix24 + AI или пилот" : "Bitrix24 + AI rollout or a pilot";
    budgetHint = ru ? "от 300 000 ₽" : "from €3,000";
  } else {
    format = ru ? "Промышленное внедрение" : "Production rollout";
    budgetHint = ru ? "от 500 000 ₽" : "from €5,000";
  }

  return {
    totalHours: Math.round(totalHours),
    savingsLow,
    savingsHigh,
    scenario: ru ? scenario.ru : scenario.en,
    format,
    budgetHint,
  };
}

export function findOption<T extends string>(options: OptionValue<T>[], value: T): OptionValue<T> | undefined {
  return options.find((option) => option.value === value);
}
