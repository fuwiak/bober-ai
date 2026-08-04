import { LEGAL_ALIAS_ROUTES } from "@/lib/legal";
import { absoluteUrl } from "@/lib/site";

/** Marker — detect if legal block already sent in this conversation. */
export const LEGAL_DOCS_MARKER = "Правовые документы Bober AI";

/**
 * Legal documents block for first greeting (/start or first contact).
 * Plain URLs — Telegram auto-links without parse_mode.
 */
export function buildLegalDocsGreetingBlock(): string {
  const termsUrl = absoluteUrl(LEGAL_ALIAS_ROUTES.terms);
  const privacyUrl = absoluteUrl(LEGAL_ALIAS_ROUTES.privacy);
  const consentUrl = absoluteUrl(LEGAL_ALIAS_ROUTES.consent);

  return [
    LEGAL_DOCS_MARKER,
    "",
    "Прежде чем начать, ознакомьтесь с условиями работы бота:",
    "",
    `📄 Пользовательское соглашение (${termsUrl})`,
    `🔒 Политика обработки персональных данных (${privacyUrl})`,
    `✅ Согласие на обработку персональных данных (${consentUrl})`,
    "",
    "Продолжая использование бота, вы безоговорочно соглашаетесь с условиями всех указанных документов, в том числе с обработкой ваших персональных данных и их передачей AI-сервисам для генерации ответов.",
  ].join("\n");
}

/** True when no prior assistant reply yet (ignore reminders / news alerts). */
export function isFirstContact(
  history: { role: string; text: string }[],
): boolean {
  return !history.some((m) => {
    if (m.role !== "assistant") return false;
    const t = (m.text || "").trim();
    if (!t || t.startsWith("[reminder]") || t.startsWith("[news-alert]")) {
      return false;
    }
    return true;
  });
}

/** Append legal block after welcome / first reply text. */
export function withLegalDocsGreeting(body: string): string {
  const text = body.trim();
  const legal = buildLegalDocsGreetingBlock();
  if (!text) return legal;
  if (text.includes(LEGAL_DOCS_MARKER)) return text;
  return `${text}\n\n${legal}`;
}
