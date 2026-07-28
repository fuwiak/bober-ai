import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/** Канонический хост для поиска и Вебмастера (главное зеркало). */
const CANONICAL_HOST = "www.bober-ai.dev";
const APEX_HOST = "bober-ai.dev";
const PARTNERS_HOST = "partners.bober-ai.dev";
const BITRIX_HOST = "bitrix.bober-ai.dev";

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "SAMEORIGIN",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
};

function withSecurityHeaders(response: NextResponse) {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  return response;
}

/**
 * Railway / internal listeners expose :8080 (or :3000) on NextURL.
 * Never let that leak into Location — browsers and LLM fetchers block it as unsafe.
 */
function stripInternalPortFromLocation(response: NextResponse): NextResponse {
  const loc = response.headers.get("location");
  if (!loc || !/:(?:8080|3000)\b/.test(loc)) return response;
  try {
    const url = new URL(loc, `https://${CANONICAL_HOST}`);
    if (url.port === "8080" || url.port === "3000") {
      url.port = "";
      if (url.hostname === APEX_HOST) url.hostname = CANONICAL_HOST;
      response.headers.set("location", url.toString());
    }
  } catch {
    // keep original Location if unparsable
  }
  return response;
}

/** Absolute apex→www 301. Never clone()+host — that baked :8080 into Location. */
function redirectApexToWww(pathname: string, search: string): NextResponse {
  const dest = `https://${CANONICAL_HOST}${pathname}${search}`;
  const response = NextResponse.redirect(dest, 301);
  // Force exact Location (some runtimes re-serialize from nextUrl with internal port).
  response.headers.set("Location", dest);
  // Bust stale CDN/proxy caches of the old :8080 Location.
  response.headers.set("Cache-Control", "no-store");
  return stripInternalPortFromLocation(withSecurityHeaders(response));
}

/** HTML / document responses — short cache; assets use immutable via next.config. */
function withHtmlCache(response: NextResponse) {
  response.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  return response;
}

function finalizeDocument(response: NextResponse, request: NextRequest) {
  withSecurityHeaders(response);
  withHtmlCache(response);
  stripInternalPortFromLocation(response);

  // next-intl locale cookie: add Secure behind HTTPS (Railway terminates TLS).
  const locale = response.cookies.get("NEXT_LOCALE")?.value;
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const isHttps =
    forwardedProto === "https" || request.nextUrl.protocol === "https:";
  if (locale && isHttps) {
    response.cookies.set("NEXT_LOCALE", locale, {
      path: "/",
      sameSite: "lax",
      secure: true,
    });
  }
  return response;
}

/** Yandex requires application/xml|text/xml for YML (not text/yaml from .yml MIME). */
function withYmlContentType(response: NextResponse) {
  response.headers.set("Content-Type", "application/xml; charset=utf-8");
  return response;
}

/** Файлы подтверждения прав (Вебмастер/GSC/IndexNow) — отдаём на apex без 301. */
function isOwnershipVerificationPath(pathname: string): boolean {
  if (pathname === "/robots.txt") return true;
  if (/^\/yandex_[a-z0-9]+\.html$/i.test(pathname)) return true;
  if (/^\/google[a-z0-9]+\.html$/i.test(pathname)) return true;
  if (/^\/[a-f0-9]{32}\.txt$/i.test(pathname)) return true;
  return false;
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
  if (pathname === "/rss.xml") return true;
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
        return withYmlContentType(withSecurityHeaders(NextResponse.rewrite(url)));
      }
      if (pathname.startsWith("/feeds/") && pathname.endsWith(".yml")) {
        return withYmlContentType(withSecurityHeaders(NextResponse.next()));
      }
      return withSecurityHeaders(NextResponse.next());
    }
    const url = request.nextUrl.clone();
    url.pathname = "/white-label";
    return finalizeDocument(NextResponse.rewrite(url), request);
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
        return withYmlContentType(withSecurityHeaders(NextResponse.rewrite(url)));
      }
      if (pathname.startsWith("/feeds/") && pathname.endsWith(".yml")) {
        return withYmlContentType(withSecurityHeaders(NextResponse.next()));
      }
      return withSecurityHeaders(NextResponse.next());
    }
    const url = request.nextUrl.clone();
    url.pathname = "/bitrix";
    return finalizeDocument(NextResponse.rewrite(url), request);
  }

  // Явный 301: Яндекс учитывает 301/302 при выборе главного зеркала (не 308).
  // Verification-файлы на apex не редиректим — иначе нельзя подтвердить права на bober-ai.dev.
  // Важно: не clone()+host — NextURL на Railway держит внутренний :8080 в Location
  // и ломает Claude/ChatGPT/ботов при заходе на apex без www.
  if (host === APEX_HOST) {
    if (isOwnershipVerificationPath(pathname)) {
      return withSecurityHeaders(NextResponse.next());
    }
    return redirectApexToWww(pathname, request.nextUrl.search);
  }

  if (pathname === "/performers-feed.yml" || (pathname.startsWith("/feeds/") && pathname.endsWith(".yml"))) {
    // Static public/*.yml — stable body for Webmaster (no per-request date churn via API).
    return withYmlContentType(withSecurityHeaders(NextResponse.next()));
  }

  if (shouldSkipIntl(pathname)) {
    // Static/API — security only; asset Cache-Control from next.config.
    // Bare HTML routes that skip intl still need document cache headers.
    if (pathname.startsWith("/api") || pathname.includes(".")) {
      return withSecurityHeaders(NextResponse.next());
    }
    return finalizeDocument(NextResponse.next(), request);
  }

  return finalizeDocument(intlMiddleware(request), request);
}

export const config = {
  // Широкий matcher: редирект www нужен и для robots/sitemap/юридических страниц.
  matcher: ["/((?!_next|_vercel).*)"],
};
