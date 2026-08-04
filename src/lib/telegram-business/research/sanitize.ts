/**
 * Sanitize text before injecting into LLM / client replies.
 * Never leak secrets, tokens, private infra, or other clients' PII.
 */

const SECRETISH =
  /\b(?:api[_-]?key|access[_-]?token|refresh[_-]?token|secret|password|passwd|Bearer\s+[A-Za-z0-9\-._~+/]+=*|sk-[A-Za-z0-9]{10,}|ghp_[A-Za-z0-9]{20,}|xox[baprs]-[A-Za-z0-9-]{10,})\b/gi;

const ENV_LEAK =
  /\b(?:DATABASE_URL|TELEGRAM_[A-Z0-9_]+|OPENROUTER_[A-Z0-9_]+|CONTACT_TELEGRAM_[A-Z0-9_]+|AWS_[A-Z0-9_]+|PRIVATE_KEY|SSH_KEY)[=:\s][^\s\n]+/gi;

const PRIVATE_IP =
  /\b(?:10(?:\.\d{1,3}){3}|192\.168(?:\.\d{1,3}){2}|172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2}|127(?:\.\d{1,3}){3})\b/g;

const PATH_LEAK =
  /(?:\/Users\/[^\s]+|\/home\/[^\s]+|\.env(?:\.\w+)?|id_rsa|deploy[_-]?key)/gi;

const CONN_STRING =
  /\b(?:postgres(?:ql)?|mysql|mongodb|redis):\/\/[^\s]+/gi;

export function sanitizePublicText(input: string, maxChars = 3500): string {
  let s = String(input || "");
  s = s
    .replace(SECRETISH, "[redacted]")
    .replace(ENV_LEAK, "[redacted-env]")
    .replace(CONN_STRING, "[redacted-dsn]")
    .replace(PRIVATE_IP, "[redacted-ip]")
    .replace(PATH_LEAK, "[redacted-path]");
  // Drop lines that still look like credential dumps
  s = s
    .split("\n")
    .filter((line) => {
      const l = line.toLowerCase();
      if (l.includes("authorization:") && l.includes("bearer")) return false;
      if (l.includes("password=") || l.includes("secret=")) return false;
      return true;
    })
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  if (s.length > maxChars) s = `${s.slice(0, maxChars)}\n…`;
  return s;
}

/** True if query looks like it needs product/architecture context. */
export function needsArchitectureContext(message: string): boolean {
  return /архитектур|как\s+устроен|как\s+работа|граф|graphify|кодовая\s+база|стек|интеграц|модул|сервис|landing|лендинг|оффер|услуг|bitrix|1с|ocr|meeting|речев|chatgpt|ассистент|whatsapp|crm/i.test(
    message,
  );
}

/** True if query looks like it needs fresh market/news research. */
export function needsMarketResearch(message: string): boolean {
  return /новост|рынк|трен|152[- ]?фз|персональн(ые|ых)\s+данн|импортозамещ|закон|регулятор|рекоменд|что\s+нового|актуальн|cnews|хабр|bitrix24\s+обнов|1с\s+обнов/i.test(
    message,
  );
}

const OFFER_SCOPE =
  /bober|цен|стоим|бюджет|пилот|созвон|встреч|демо|bitrix|битрикс|1с|1c|ocr|crm|ассистент|chatgpt|whatsapp|telegram|внедр|интеграц|услуг|оффер|прайс|nda|речев|meeting|кп\b|коммерческ/i;

/**
 * Knowledge (info.md / OFFER_FACTS) likely insufficient → use SearXNG.
 * Market/news/law/competitor questions always qualify; plain offer/booking do not.
 */
export function knowledgeLikelyInsufficient(message: string): boolean {
  if (needsMarketResearch(message)) return true;
  const t = message.trim();
  if (!t || t.length < 8) return false;
  const questionLike =
    /\?|^(что|как|где|когда|почему|who|what|how|why|czy|jak)\b|расскаж|объясн|подскаж|узнать|актуальн|сравн|конкурент|альтернатив|что\s+такое/i.test(
      t,
    );
  if (!questionLike) return false;
  // Offer-scoped Q&A stays on knowledge unless market keywords already matched.
  if (OFFER_SCOPE.test(t) && !/конкурент|альтернатив|сравн|что\s+нового|трен|рынк/i.test(t)) {
    return false;
  }
  return true;
}

/** Disclaimer when reply used unverified web hits (client language). */
export function webDisclaimer(lang: string): string {
  if (lang === "pl") {
    return "Uwaga: to niepotwierdzona informacja z internetu — nie gwarancja Bober AI Systems.";
  }
  if (lang === "en") {
    return "Note: unverified information from the internet — not a Bober AI Systems guarantee.";
  }
  // Default RU — main market; unknown langs fall back here (not EN).
  return "Важно: это неподтверждённая информация из сети — не гарантия Bober AI Systems.";
}

const WEB_DISCLAIMER_LINE =
  /^(?:Важно:\s*это\s*неподтверждённая\s+информация\s+из\s+сети\s*[—\-]\s*не\s+гарантия\s+Bober AI Systems\.|Uwaga:\s*to\s*niepotwierdzona\s+informacja\s+z\s+internetu\s*[—\-]\s*nie\s+gwarancja\s+Bober AI Systems\.|Note:\s*unverified\s+information\s+from\s+the\s+internet\s*[—\-]\s*not\s+a\s+Bober AI Systems\s+guarantee\.)\s*(?:\n+|$)/i;

export function hasWebDisclaimer(text: string): boolean {
  return /неподтвержд|из сети|из интернета|niepotwierdzon|z internetu|z netu|unverified|from the internet/i.test(
    text,
  );
}

/** Drop leading RU/PL/EN web disclaimer so we can re-attach the correct lang. */
export function stripLeadingWebDisclaimer(text: string): string {
  return String(text || "").replace(WEB_DISCLAIMER_LINE, "").trimStart();
}

/**
 * Hard guarantee: web-backed reply starts with the localized disclaimer.
 * Replaces wrong-language (often EN) disclaimers the LLM invented.
 */
export function ensureWebDisclaimer(text: string, lang: string): string {
  const disc = webDisclaimer(lang);
  const body = stripLeadingWebDisclaimer(text).trim();
  if (!body) return disc;
  if (body.startsWith(disc)) return body;
  return `${disc}\n\n${body}`;
}
