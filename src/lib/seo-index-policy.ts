/**
 * Remaining soft noindex rules (pages that stay 200 but must not rank).
 * Hard duplicates use 301 via seo-redirects.ts — do not combine 301 + noindex.
 */

export type SeoIndexRule = {
  /** When true, emit noindex (follow preserved unless noFollow). */
  noIndex: boolean;
  noFollow?: boolean;
  /** Self path only — never cross-canonical while indexable. */
  canonicalPath?: string;
};

/** /order/* forms: noindex,follow + self-canonical (set in page props). */
export function getSeoIndexPolicy(barePath: string): SeoIndexRule | null {
  const path = barePath === "/" ? "/" : barePath.replace(/\/$/, "") || "/";
  if (path === "/order" || path.startsWith("/order/")) {
    return { noIndex: true, noFollow: false };
  }
  return null;
}

export function isSeoNoIndexPath(barePath: string): boolean {
  return Boolean(getSeoIndexPolicy(barePath)?.noIndex);
}
