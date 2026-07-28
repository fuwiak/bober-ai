/** Deep-merge plain objects/arrays; arrays replaced wholesale; primitives overwritten. */

/**
 * Widen string/number/boolean literals so market overlays can replace copy freely.
 * Check primitives on T itself first — mapped `keyof string` breaks literal unions.
 */
export type DeepPartial<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? ReadonlyArray<DeepPartial<U>>
        : T extends object
          ? { [K in keyof T]?: DeepPartial<T[K]> }
          : T;

export function deepMerge<T>(base: T, patch: DeepPartial<T>): T {
  if (patch === undefined || patch === null) return base;
  if (Array.isArray(patch)) return patch as T;
  if (typeof patch !== "object" || typeof base !== "object" || base === null || Array.isArray(base)) {
    return patch as T;
  }

  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [key, value] of Object.entries(patch as Record<string, unknown>)) {
    if (value === undefined) continue;
    const prev = out[key];
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      prev &&
      typeof prev === "object" &&
      !Array.isArray(prev)
    ) {
      out[key] = deepMerge(prev, value as DeepPartial<typeof prev>);
    } else {
      out[key] = value;
    }
  }
  return out as T;
}
