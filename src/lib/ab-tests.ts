import { reachGoal } from "@/lib/analytics";
import { CALENDAR_URL } from "@/lib/site";

export const AB_FORM_LENGTH = ["control", "short"] as const;
export type AbFormLength = (typeof AB_FORM_LENGTH)[number];

export const AB_CTA_DESTINATION = ["form", "calendar"] as const;
export type AbCtaDestination = (typeof AB_CTA_DESTINATION)[number];

const STORAGE_PREFIX = "bober_ab_";

function hashSeed(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function pickVariant<T extends string>(seed: string, variants: readonly T[]): T {
  const index = hashSeed(seed) % variants.length;
  return variants[index] ?? variants[0];
}

function readStored(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStored(key: string, value: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // ignore quota / private mode
  }
}

/** Sticky A/B assignment (localStorage). Tracks `ab_assign` once per experiment per session. */
export function getAbVariant<T extends string>(
  experiment: string,
  variants: readonly T[],
  options?: { track?: boolean },
): T {
  if (typeof window === "undefined") {
    return variants[0];
  }

  const storageKey = `${STORAGE_PREFIX}${experiment}`;
  const stored = readStored(storageKey);
  if (stored && (variants as readonly string[]).includes(stored)) {
    return stored as T;
  }

  const seed =
    readStored(`${STORAGE_PREFIX}visitor`) ||
    (() => {
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}_${Math.random().toString(36).slice(2)}`;
      writeStored(`${STORAGE_PREFIX}visitor`, id);
      return id;
    })();

  const variant = pickVariant(`${experiment}:${seed}`, variants);
  writeStored(storageKey, variant);

  if (options?.track !== false) {
    const trackedKey = `${STORAGE_PREFIX}tracked_${experiment}`;
    if (!readStored(trackedKey)) {
      writeStored(trackedKey, "1");
      reachGoal("ab_assign", { experiment, variant });
    }
  }

  return variant;
}

export function getFormLengthVariant(): AbFormLength {
  return getAbVariant("form_length", AB_FORM_LENGTH);
}

export function getCtaDestinationVariant(): AbCtaDestination {
  // Without a calendar URL the calendar arm is inert — keep everyone on form.
  if (!CALENDAR_URL) return "form";
  return getAbVariant("cta_destination", AB_CTA_DESTINATION);
}
