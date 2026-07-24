import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/** Канонический хост для поиска и Вебмастера (главное зеркало). */
const CANONICAL_HOST = "www.bober-ai.dev";
const PARTNERS_HOST = "partners.bober-ai.dev";
const BITRIX_HOST = "bitrix.bober-ai.dev";

/** Yandex requires application/xml|text/xml for YML (not text/yaml from .yml MIME). */
function withYmlContentType(response: NextResponse) {
  response.headers.set("Content-Type", "application/xml; charset=utf-8");
  return response;
}

/**
 * Пути вне next-intl — без locale rewrite.
 * Редирект apex → www для них всё равно выполняется выше.
 */
function shouldSkipIntl(pathname: string): boolean {
  if (pathname.startsWith("/api")) return true;
  if (pathname.startsWith("/_next") || pathname.startsWith("/_vercel")) return true;
  if (pathname === "/tel" || pathname.startsWith("/tel/")) return true;
  if (pathname === "/performers-feed.yml") return true;
  if (pathname.startsWith("/feeds/")) return true;

  const bare = [
    "/privacy-policy",
    "/consent",
    "/terms",
    "/info",
    "/blog",
    "/events",
    "/academy",
    "/news",
    "/outages",
    "/white-label",
    "/bitrix",
  ];
  if (bare.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return true;

  // Статические файлы и расширения (robots.txt, sitemap.xml, картинки…)
  if (pathname.includes(".")) return true;

  return false;
}

export default function middleware(request: NextRequest) {
  const hostHeader = request.headers.get("host");
  const host = hostHeader?.split(":")[0]?.toLowerCase();
  const { pathname } = request.nextUrl;

  // Microsite hosts — rewrite to dedicated landings (не на www).
  if (host === PARTNERS_HOST) {
    if (
      pathname.startsWith("/_next") ||
      pathname.startsWith("/api") ||
      pathname.startsWith("/feeds/") ||
      pathname === "/performers-feed.yml" ||
      pathname.includes(".")
    ) {
      if (pathname === "/performers-feed.yml") {
        const url = request.nextUrl.clone();
        url.pathname = "/feeds/partners.yml";
        return withYmlContentType(NextResponse.rewrite(url));
      }
      if (pathname.startsWith("/feeds/") && pathname.endsWith(".yml")) {
        return withYmlContentType(NextResponse.next());
      }
      return NextResponse.next();
    }
    const url = request.nextUrl.clone();
    url.pathname = "/white-label";
    return NextResponse.rewrite(url);
  }

  if (host === BITRIX_HOST) {
    if (
      pathname.startsWith("/_next") ||
      pathname.startsWith("/api") ||
      pathname.startsWith("/feeds/") ||
      pathname === "/performers-feed.yml" ||
      pathname.includes(".")
    ) {
      if (pathname === "/performers-feed.yml") {
        const url = request.nextUrl.clone();
        url.pathname = "/feeds/bitrix.yml";
        return withYmlContentType(NextResponse.rewrite(url));
      }
      if (pathname.startsWith("/feeds/") && pathname.endsWith(".yml")) {
        return withYmlContentType(NextResponse.next());
      }
      return NextResponse.next();
    }
    const url = request.nextUrl.clone();
    url.pathname = "/bitrix";
    return NextResponse.rewrite(url);
  }

  // Явный 301: Яндекс учитывает 301/302 при выборе главного зеркала (не 308).
  if (host === "bober-ai.dev") {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = CANONICAL_HOST;
    return NextResponse.redirect(url, 301);
  }

  if (pathname === "/performers-feed.yml" || (pathname.startsWith("/feeds/") && pathname.endsWith(".yml"))) {
    // Static public/*.yml — stable body for Webmaster (no per-request date churn via API).
    return withYmlContentType(NextResponse.next());
  }

  if (shouldSkipIntl(pathname)) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  // Широкий matcher: редирект www нужен и для robots/sitemap/юридических страниц.
  matcher: ["/((?!_next|_vercel).*)"],
};
