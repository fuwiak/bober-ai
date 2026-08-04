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
