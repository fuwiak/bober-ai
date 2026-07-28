/**
 * Cloudflare Worker: RU (без VPN) → Selectel, остальной мир / VPN → Railway.
 *
 * Setup:
 * 1. Cloudflare → Add site www.bober-systems.ru (free), сменить NS у Namecheap на Cloudflare.
 * 2. Workers → Create worker → вставить этот код.
 * 3. Triggers → Custom domains: www.bober-ai.dev, www.bober-systems.ru
 * 4. DNS A/CNAME в Cloudflare можно оставить placeholder — Worker перехватывает.
 */
const SELECTEL_ORIGIN = "https://45.80.131.136";
const RAILWAY_ORIGIN = "https://bober-ai-production.up.railway.app";
const HOST = "www.bober-systems.ru";
const APEX = "www.bober-systems.ru";

function stripInternalPort(location, requestUrl) {
  try {
    const url = new URL(location, requestUrl);
    if (url.port === "8080" || url.port === "3000") {
      url.port = "";
      if (url.hostname === APEX) url.hostname = HOST;
      return url.toString();
    }
  } catch {
    /* keep */
  }
  return location;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Apex → www here, before origin. Never leak listener ports into Location.
    if (url.hostname === APEX) {
      const dest = `https://${HOST}${url.pathname}${url.search}`;
      return new Response(null, {
        status: 301,
        headers: {
          Location: dest,
          "Cache-Control": "no-store",
        },
      });
    }

    const country = request.cf?.country || "";
    const preferSelectel = country === "RU";

    const origins = preferSelectel
      ? [SELECTEL_ORIGIN, RAILWAY_ORIGIN]
      : [RAILWAY_ORIGIN, SELECTEL_ORIGIN];

    let lastError;
    for (const origin of origins) {
      try {
        const target = new URL(url.pathname + url.search, origin);
        const headers = new Headers(request.headers);
        headers.set("Host", HOST);
        headers.set("X-Forwarded-Host", HOST);
        headers.set("X-Forwarded-Proto", "https");
        headers.delete("X-Forwarded-Port");

        const init = {
          method: request.method,
          headers,
          redirect: "manual",
        };
        if (request.method !== "GET" && request.method !== "HEAD") {
          init.body = request.body;
        }

        const res = await fetch(target, init);
        // Selectel hang → try next origin
        if (res.status >= 500) {
          lastError = new Error(`origin ${origin} status ${res.status}`);
          continue;
        }

        const out = new Headers(res.headers);
        const loc = out.get("Location") || out.get("location");
        if (loc) {
          out.set("Location", stripInternalPort(loc, `https://${HOST}`));
        }
        out.set("X-Bober-Origin", origin.includes("railway") ? "railway" : "selectel");
        out.set("X-Bober-Country", country || "ZZ");
        return new Response(res.body, {
          status: res.status,
          statusText: res.statusText,
          headers: out,
        });
      } catch (err) {
        lastError = err;
      }
    }

    return new Response(
      `Upstream unavailable (${lastError?.message || "unknown"})`,
      { status: 502, headers: { "content-type": "text/plain; charset=utf-8" } },
    );
  },
};
