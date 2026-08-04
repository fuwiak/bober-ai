import { readFile } from "node:fs/promises";
import { join } from "node:path";

const MAX_CHARS = 14_000;

let cached: { at: number; text: string } | null = null;
const TTL_MS = 10 * 60 * 1000;

/** Compact facts always injected even if info.md is truncated. */
export const OFFER_FACTS = `
Bober AI Systems (ИП Стасиньски Павел Кшиштоф) — Москва.
Сайт: https://www.bober-systems.ru/
Telegram основателя: https://t.me/pstasinski
Телефон: +7 995 099-81-70
Email: contact@bober-systems.ru

Позиционирование: внедрение AI-автоматизации продаж, документов, CRM и 1С. Не курсы, не «скачать бесплатно».

Типовые пилоты от 300 000 ₽, 2–4 недели. Промышленный контур часто от 500 000 ₽. Бюджеты до ~1 млн ₽ — норма; миллионные проекты возможны после брифа.
Фиксированная смета после 30-мин созвона. NDA по запросу.

Топ-офферы (Direct/SEO):
1) Распознавание первичных документов в 1С — /automation/ocr-data-extraction · /services/ocr
2) Внедрение и интеграция Битрикс24 — /integrations/bitrix24-implementation · https://bitrix.bober-systems.ru/
3) Автоматизация коммерческих предложений — /automation/proposal-generation (кейс 45 мин → 2–5 мин)
4) Речевая аналитика отдела продаж — /automation/speech-analytics-sales · /services/voice-ai
5) Meeting-to-CRM (встречи → задачи в CRM) — /automation/meeting-to-crm · /services/ai-meeting-crm

Партнёры: Yandex Cloud, Selectel, Cloud.ru, 1С-Битрикс (ID 28909898), Kaspersky Registered Partner.
`.trim();

export async function loadKnowledge(): Promise<string> {
  const now = Date.now();
  if (cached && now - cached.at < TTL_MS) return cached.text;

  let dossier = "";
  try {
    dossier = await readFile(join(process.cwd(), "public/info.md"), "utf8");
  } catch {
    try {
      dossier = await readFile(join(process.cwd(), "dist/client/info.md"), "utf8");
    } catch {
      dossier = "";
    }
  }

  const trimmed =
    dossier.length > MAX_CHARS
      ? `${dossier.slice(0, MAX_CHARS)}\n\n[… truncated; full dossier: https://www.bober-systems.ru/info.md]`
      : dossier;

  const text = `${OFFER_FACTS}\n\n---\n\n${trimmed || "(info.md unavailable — use OFFER_FACTS only)"}`;
  cached = { at: now, text };
  return text;
}

/** Keyword fallback when LLM is unavailable. */
export function fallbackReply(userText: string): string {
  const t = userText.toLowerCase();

  if (/цен|стоим|бюджет|сколько|price|₽|руб/.test(t)) {
    return [
      "Ориентиры по бюджету:",
      "• пилот одного сценария — от 300 000 ₽ (обычно 2–4 недели);",
      "• промышленный контур — часто от 500 000 ₽;",
      "• точная смета — после короткого созвона (фиксируем scope).",
      "",
      "Напишите, какой процесс болит сильнее всего (документы/1С, Bitrix24, КП, звонки) — подскажу релевантную страницу и что уточнить на брифе.",
      "Сайт: https://www.bober-systems.ru/pricing",
    ].join("\n");
  }

  if (/битрикс|bitrix|crm/.test(t)) {
    return [
      "Внедряем и интегрируем Битрикс24: портал, воронки, телефония, 1С, мессенджеры, AI-слой поверх BitrixGPT.",
      "Пилот от 300 000 ₽.",
      "Страница: https://www.bober-systems.ru/integrations/bitrix24-implementation",
      "Лендинг CRM: https://bitrix.bober-systems.ru/",
      "",
      "Уже есть портал или только планируете покупку?",
    ].join("\n");
  }

  if (/документ|ocr|1с|первичк|счет|акт|упд/.test(t)) {
    return [
      "Делаем распознавание первички в 1С: счета, акты, УПД → поля без ручного ввода.",
      "Пилот на одном типе документа — от 300 000 ₽, 2–4 недели.",
      "https://www.bober-systems.ru/automation/ocr-data-extraction",
      "",
      "Какой тип документов сейчас съедает больше всего часов?",
    ].join("\n");
  }

  if (/кп|коммерческ|предложен|смет/.test(t)) {
    return [
      "Автоматизация КП из CRM и прайса: типовой кейс 45 минут → 2–5 минут, цены только из каталога.",
      "От 300 000 ₽.",
      "https://www.bober-systems.ru/automation/proposal-generation",
      "",
      "Сейчас КП собирают в Word вручную?",
    ].join("\n");
  }

  if (/звонк|речев|аналит|прослуш|speech|голос/.test(t)) {
    return [
      "Речевая аналитика отдела продаж: все звонки → транскрипт, скоринг, факты в CRM и follow-up.",
      "Пилот от 300 000 ₽.",
      "https://www.bober-systems.ru/automation/speech-analytics-sales",
    ].join("\n");
  }

  if (/встреч|созвон|meeting|telemost|протокол/.test(t)) {
    return [
      "Meeting-to-CRM: договорённости со встречи → задачи и поля в Bitrix24/amoCRM (не просто саммари).",
      "Пилот от 300 000 ₽.",
      "https://www.bober-systems.ru/automation/meeting-to-crm",
    ].join("\n");
  }

  if (/привет|здравств|добр|hello|hi\b/.test(t)) {
    return [
      "Здравствуйте! Я ассистент Bober AI Systems.",
      "Могу коротко рассказать про услуги и ориентиры по бюджету: документы→1С, Битрикс24, КП, речевая аналитика, Meeting-to-CRM.",
      "Напишите задачу одной фразой — подскажу направление и ссылку.",
    ].join("\n");
  }

  return [
    "Bober AI Systems — внедрение AI-автоматизации продаж, документов, CRM и 1С в Москве и СНГ.",
    "Пилоты от 300 000 ₽. Сайт: https://www.bober-systems.ru/",
    "",
    "Напишите, что нужно автоматизировать (или «хочу созвон») — уточню детали и передам Павлу, если нужна смета/сроки под ваш scope.",
  ].join("\n");
}
