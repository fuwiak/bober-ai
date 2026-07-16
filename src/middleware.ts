import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/** Канонический хост для поиска и Вебмастера (главное зеркало). */
const CANONICAL_HOST = "www.bober-ai.dev";

/**
 * Пути вне next-intl (как раньше) — без locale rewrite.
 * Редирект apex → www для них всё равно выполняется выше.
 */
function shouldSkipIntl(pathname: string): boolean {
  if (pathname.startsWith("/api")) return true;
  if (pathname.startsWith("/_next") || pathname.startsWith("/_vercel")) return true;
  if (pathname === "/tel" || pathname.startsWith("/tel/")) return true;
  if (pathname === "/performers-feed.yml") return true;

  const bare = [
    "/privacy-policy",
    "/consent",
    "/terms",
    "/info",
    "/blog",
    "/career",
    "/events",
    "/academy",
    "/news",
    "/outages",
  ];
  if (bare.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return true;

  // Статические файлы и расширения (robots.txt, sitemap.xml, картинки…)
  if (pathname.includes(".")) return true;

  return false;
}

export default function middleware(request: NextRequest) {
  const hostHeader = request.headers.get("host");
  const host = hostHeader?.split(":")[0]?.toLowerCase();

  // Явный 301: Яндекс учитывает 301/302 при выборе главного зеркала (не 308).
  if (host && host !== CANONICAL_HOST && (host === "bober-ai.dev" || host.endsWith(".bober-ai.dev"))) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = CANONICAL_HOST;
    return NextResponse.redirect(url, 301);
  }

  if (shouldSkipIntl(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  // Широкий matcher: редирект www нужен и для robots/sitemap/юридических страниц.
  matcher: ["/((?!_next|_vercel).*)"],
};
