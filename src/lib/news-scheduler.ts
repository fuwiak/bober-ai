import { buildNewsDigest, type NewsDigest } from "./news-agent";

const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;

type CacheEntry = { digest: NewsDigest; expiresAt: number };

type GlobalState = {
  kineticNewsCache?: CacheEntry;
  kineticNewsInFlight?: Promise<NewsDigest>;
  kineticNewsSchedulerStarted?: boolean;
  kineticNewsSchedulerTimer?: ReturnType<typeof setInterval>;
};

const globalRef = globalThis as unknown as GlobalState;

async function refreshDigest(): Promise<NewsDigest> {
  if (globalRef.kineticNewsInFlight) {
    return globalRef.kineticNewsInFlight;
  }

  const task = (async () => {
    try {
      const digest = await buildNewsDigest();
      globalRef.kineticNewsCache = {
        digest,
        expiresAt: Date.now() + TWELVE_HOURS_MS,
      };
      return digest;
    } finally {
      globalRef.kineticNewsInFlight = undefined;
    }
  })();

  globalRef.kineticNewsInFlight = task;
  return task;
}

export async function getCachedDigest(force = false): Promise<NewsDigest> {
  const now = Date.now();
  const cached = globalRef.kineticNewsCache;
  if (!force && cached && cached.expiresAt > now) {
    return cached.digest;
  }
  try {
    return await refreshDigest();
  } catch (error) {
    if (cached) return cached.digest;
    throw error;
  }
}

export function peekCachedDigest(): NewsDigest | null {
  return globalRef.kineticNewsCache?.digest ?? null;
}

export function isRefreshInFlight(): boolean {
  return Boolean(globalRef.kineticNewsInFlight);
}

export function kickoffRefresh(force = false): void {
  const cached = globalRef.kineticNewsCache;
  const fresh = cached && cached.expiresAt > Date.now();
  if (!force && fresh) return;
  if (globalRef.kineticNewsInFlight) return;
  refreshDigest().catch((error) => {
    console.error("[news-agent] background refresh failed", error);
  });
}

export function startNewsScheduler(): void {
  if (globalRef.kineticNewsSchedulerStarted) return;
  globalRef.kineticNewsSchedulerStarted = true;

  refreshDigest().catch((error) => {
    console.error("[news-agent] initial refresh failed", error);
  });

  const timer = setInterval(() => {
    refreshDigest().catch((error) => {
      console.error("[news-agent] scheduled refresh failed", error);
    });
  }, TWELVE_HOURS_MS);

  if (typeof (timer as { unref?: () => void }).unref === "function") {
    (timer as { unref: () => void }).unref();
  }
  globalRef.kineticNewsSchedulerTimer = timer;
}
