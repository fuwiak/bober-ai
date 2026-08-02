import { defineMiddleware } from "astro:middleware";
import { resolveSeoRedirect } from "@/lib/seo-redirects";

/**
 * Trailing-slash canonicalization + SEO permanent redirects.
 * Edge Caddy also applies the same map (static HTML would otherwise bypass Node).
 */
export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname, search } = context.url;

  const seoTarget = resolveSeoRedirect(pathname);
  if (seoTarget !== null) {
    if (seoTarget.includes("#")) {
      const [pathPart, hash] = seoTarget.split("#");
      return context.redirect(`${pathPart || "/"}${search}#${hash}`, 301);
    }
    return context.redirect(`${seoTarget}${search}`, 301);
  }

  if (
    pathname.length > 1 &&
    pathname.endsWith("/") &&
    !pathname.startsWith("/api/") &&
    !pathname.startsWith("/_")
  ) {
    const target = pathname.replace(/\/+$/, "") || "/";
    return context.redirect(`${target}${search}`, 301);
  }

  return next();
});
