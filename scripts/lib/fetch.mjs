import http from "node:http";
import https from "node:https";
import { URL } from "node:url";

function nodeFetch(url, options = {}) {
  const maxRedirects = options.redirect === "manual" ? 0 : 5;

  return new Promise((resolve, reject) => {
    function request(currentUrl, redirectsLeft) {
      const parsed = new URL(currentUrl);
      const transport = parsed.protocol === "https:" ? https : http;

      const req = transport.request(
        {
          method: options.method || "GET",
          hostname: parsed.hostname,
          port: parsed.port || (parsed.protocol === "https:" ? 443 : 80),
          path: `${parsed.pathname}${parsed.search}`,
          headers: options.headers || {},
        },
        (res) => {
          const status = res.statusCode || 0;

          if (redirectsLeft > 0 && [301, 302, 307, 308].includes(status) && res.headers.location) {
            const next = new URL(res.headers.location, currentUrl).toString();
            res.resume();
            request(next, redirectsLeft - 1);
            return;
          }

          const chunks = [];
          res.on("data", (chunk) => chunks.push(chunk));
          res.on("end", () => {
            const body = Buffer.concat(chunks).toString("utf8");
            resolve({
              ok: status >= 200 && status < 300,
              status,
              statusText: res.statusMessage || "",
              text: async () => body,
            });
          });
        },
      );

      req.on("error", reject);
      if (options.body) req.write(options.body);
      req.end();
    }

    request(url, maxRedirects);
  });
}

async function resolveFetch() {
  if (typeof globalThis.fetch === "function") {
    return globalThis.fetch;
  }
  return nodeFetch;
}

export default await resolveFetch();
