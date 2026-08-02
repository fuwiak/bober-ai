import { defineMiddleware } from "astro:middleware";

/**
 * Belt-and-suspenders trailing-slash canonicalization.
 * Astro trailingSlash:"never" handles most static routes; this catches
 * edge SSR/adapter cases so /path/ and /path never both return 200.
 */
export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname, search } = context.url;
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
