import { CONTACT_PHONE } from "@/lib/site";

/**
 * HTTPS landing for Yandex performers feed («Ссылка на телефон»).
 * Must return HTTP 200 — crawlers cannot follow tel: redirects and report
 * «Не удается получить доступ к сайту» for every offer.
 */
export function GET() {
  const phone = CONTACT_PHONE;
  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex,nofollow" />
  <title>Телефон — Bober AI Systems</title>
  <style>
    body{margin:0;min-height:100vh;display:grid;place-items:center;font-family:system-ui,sans-serif;background:#0a0a0a;color:#f5f5f5}
    a{color:#f5f5f5;font-size:1.5rem;letter-spacing:.04em;text-decoration:underline}
    p{margin:.75rem 0 0;color:#a3a3a3;font-size:.875rem}
  </style>
</head>
<body>
  <main>
    <a href="tel:${phone}">${phone}</a>
    <p>Bober AI Systems · звонок по клику</p>
  </main>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "X-Robots-Tag": "noindex",
    },
  });
}
