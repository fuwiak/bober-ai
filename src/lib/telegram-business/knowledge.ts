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

ChatGPT-like UX для бизнеса (продаваемый продукт):
- Кастомные AI-ассистенты с вашей базой знаний, инструментами (tools) и интеграциями — тот же «живой» диалог, что у ChatGPT, но под процессы компании.
- Каналы: Telegram Business / боты, WhatsApp, виджет на сайте, внутри Bitrix24 / CRM.
- Сценарии: квалификация лидов, ответы по прайсу/докам, маршрутизация к менеджеру, handoff человеку.

Типовые пилоты от 300 000 ₽, 2–4 недели. Промышленный контур часто от 500 000 ₽. Бюджеты до ~1 млн ₽ — норма; миллионные проекты возможны после брифа.
Фиксированная смета после 30-мин созвона. NDA по запросу.

Топ-офферы (Direct/SEO):
1) AI-ассистенты / ChatGPT-like UX + knowledge + tools — /services (уточнять на брифе)
2) Распознавание первичных документов в 1С — /automation/ocr-data-extraction · /services/ocr
3) Внедрение и интеграция Битрикс24 — /integrations/bitrix24-implementation · https://bitrix.bober-systems.ru/
4) Автоматизация коммерческих предложений — /automation/proposal-generation (кейс 45 мин → 2–5 мин)
5) Речевая аналитика отдела продаж — /automation/speech-analytics-sales · /services/voice-ai
6) Meeting-to-CRM (встречи → задачи в CRM) — /automation/meeting-to-crm · /services/ai-meeting-crm
7) Интеграции: Bitrix24, 1С, amoCRM, Telegram, WhatsApp, телефония, OCR, речь.

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

/** Keyword fallback when LLM is unavailable — short, no unsolicited pitch dump. */
export function fallbackReply(userText: string): string {
  const t = userText.toLowerCase();

  if (/цен|стоим|бюджет|сколько|price|₽|руб/.test(t)) {
    return [
      "Ориентир: пилот одного сценария — от 300 000 ₽ (обычно 2–4 недели); промышленный контур чаще от 500 000 ₽. Точная смета — после короткого созвона.",
      "Какой процесс болит сильнее — документы/1С, Bitrix24, КП или звонки?",
    ].join("\n");
  }

  if (/битрикс|bitrix|crm/.test(t)) {
    return [
      "Битрикс24 внедряем и связываем с 1С, телефонией, мессенджерами и AI-слоем.",
      "Уже есть портал или только планируете покупку?",
    ].join("\n");
  }

  if (/документ|ocr|1с|первичк|счет|акт|упд/.test(t)) {
    return [
      "Распознаём первичку в 1С: счета, акты, УПД → поля без ручного ввода.",
      "Какой тип документов сейчас съедает больше всего часов?",
    ].join("\n");
  }

  if (/кп|коммерческ|предложен|смет/.test(t)) {
    return [
      "КП из CRM/прайса собираем автоматически — типовой кейс 45 мин → 2–5 мин.",
      "Сейчас КП собирают в Word вручную?",
    ].join("\n");
  }

  if (/звонк|речев|аналит|прослуш|speech|голос/.test(t)) {
    return [
      "Речевая аналитика: звонки → транскрипт, скоринг, факты в CRM.",
      "Сколько менеджеров и какая телефония сейчас?",
    ].join("\n");
  }

  if (/встреч|созвон|meeting|telemost|протокол/.test(t)) {
    return [
      "Meeting-to-CRM: договорённости со встречи → задачи и поля в Bitrix/amoCRM.",
      "Где сейчас теряются follow-up после встреч?",
    ].join("\n");
  }

  if (/привет|здравств|добр|hello|hi\b|cześć|dzien\s*dobry/.test(t)) {
    return [
      "Здравствуйте! Я ассистент Павла (Bober AI Systems).",
      "Какую задачу хотите закрыть в первую очередь?",
    ].join("\n");
  }

  if (
    /chatgpt|gpt|ассистент|бот\s+для\s+бизнес|чат[- ]?бот|ai[- ]?assistant|knowledge\s*base|база\s+знан/i.test(
      t,
    )
  ) {
    return [
      "Да — делаем AI-ассистентов под процессы компании: своя база знаний, tools, handoff менеджеру.",
      "Где сейчас «теряются» вопросы — в чате, на сайте или внутри CRM?",
    ].join("\n");
  }

  if (/интеграц|whatsapp|telegram\s+bot|амоcrm|amocrm|телефони/i.test(t)) {
    return [
      "Связываем Bitrix / amoCRM / 1С с Telegram, WhatsApp, телефонией, OCR и речью.",
      "Какие системы уже стоят и что связать первым?",
    ].join("\n");
  }

  return [
    "Понял. Коротко уточню, чтобы не лить воду.",
    "Что нужно автоматизировать в первую очередь?",
  ].join("\n");
}
