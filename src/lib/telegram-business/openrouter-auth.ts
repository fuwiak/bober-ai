/**
 * Process-level OpenRouter auth circuit.
 * 401 "User not found" = key revoked / wrong account — stop hammering API each tick.
 */

let authBroken = false;
let authLogged = false;

export function isOpenRouterAuthBroken(): boolean {
  return authBroken;
}

/** Call once on 401/403 so later ticks skip network + log spam. */
export function markOpenRouterAuthBroken(detail: string): void {
  authBroken = true;
  if (authLogged) return;
  authLogged = true;
  console.error(
    `[telegram-business] OPENROUTER_API_KEY rejected (${detail.slice(0, 160)}). ` +
      "Rotate key on openrouter.ai → set Railway OPENROUTER_API_KEY → redeploy. " +
      "LLM disabled until process restart.",
  );
}

export function openRouterApiKey(): string | undefined {
  return process.env.OPENROUTER_API_KEY?.trim() || undefined;
}

/** True when a key is configured and auth circuit is closed. */
export function openRouterReady(): boolean {
  return Boolean(openRouterApiKey()) && !authBroken;
}
