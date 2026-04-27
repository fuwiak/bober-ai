import { buildShortsDigest, type ShortsDigest } from "./shorts-agent";

const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;

type CacheEntry = { digest: ShortsDigest; expiresAt: number };
type GlobalState = {
  kineticShortsCache?: CacheEntry;
  kineticShortsInFlight?: Promise<ShortsDigest>;
};

const globalRef = globalThis as unknown as GlobalState;

async function refreshDigest(): Promise<ShortsDigest> {
  if (globalRef.kineticShortsInFlight) return globalRef.kineticShortsInFlight;

  const task = (async () => {
    try {
      const digest = await buildShortsDigest();
      globalRef.kineticShortsCache = {
        digest,
        expiresAt: Date.now() + TWELVE_HOURS_MS,
      };
      return digest;
    } finally {
      globalRef.kineticShortsInFlight = undefined;
    }
  })();

  globalRef.kineticShortsInFlight = task;
  return task;
}

export async function getCachedShorts(force = false): Promise<ShortsDigest> {
  const cached = globalRef.kineticShortsCache;
  if (!force && cached && cached.expiresAt > Date.now()) return cached.digest;
  try {
    return await refreshDigest();
  } catch (error) {
    if (cached) return cached.digest;
    throw error;
  }
}

export function peekCachedShorts(): ShortsDigest | null {
  return globalRef.kineticShortsCache?.digest ?? null;
}

export function isShortsRefreshInFlight(): boolean {
  return Boolean(globalRef.kineticShortsInFlight);
}

export function kickoffShortsRefresh(force = false): void {
  const cached = globalRef.kineticShortsCache;
  const fresh = cached && cached.expiresAt > Date.now();
  if (!force && fresh) return;
  if (globalRef.kineticShortsInFlight) return;
  refreshDigest().catch((error) => {
    console.error("[shorts-agent] background refresh failed", error);
  });
}
