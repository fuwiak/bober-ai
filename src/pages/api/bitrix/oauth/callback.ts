import type { APIRoute } from "astro";

export const prerender = false;

/**
 * Bitrix24 OAuth redirect (локальное приложение).
 * В форме приложения укажите:
 *   https://www.bober-systems.ru/api/bitrix/oauth/callback
 *
 * После «Разрешить» сюда придёт ?code=... — скопируйте code и выполните:
 *   npm run bitrix:oauth -- exchange --code <CODE>
 */
export const GET: APIRoute = ({ url }) => {
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");
  const errorDescription = url.searchParams.get("error_description");

  if (error) {
    const html = `<!doctype html><html lang="ru"><meta charset="utf-8"/><title>Bitrix OAuth</title>
<body style="font-family:system-ui;max-width:40rem;margin:2rem auto;padding:0 1rem">
<h1>Ошибка OAuth</h1>
<pre>${escapeHtml(error)}${errorDescription ? `\n${escapeHtml(errorDescription)}` : ""}</pre>
</body></html>`;
    return new Response(html, {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
    });
  }

  if (!code) {
    return new Response(
      `<!doctype html><html lang="ru"><meta charset="utf-8"/><title>Bitrix OAuth</title>
<body style="font-family:system-ui;max-width:40rem;margin:2rem auto;padding:0 1rem">
<h1>Bitrix24 OAuth callback</h1>
<p>Ожидается параметр <code>code</code> после авторизации приложения.</p>
<p>Redirect URI для формы локального приложения:</p>
<pre>https://www.bober-systems.ru/api/bitrix/oauth/callback</pre>
</body></html>`,
      {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
      },
    );
  }

  const html = `<!doctype html><html lang="ru"><meta charset="utf-8"/><title>Bitrix OAuth OK</title>
<body style="font-family:system-ui;max-width:40rem;margin:2rem auto;padding:0 1rem">
<h1>Код получен</h1>
<p>Скопируйте code и в терминале:</p>
<pre style="background:#111;color:#eee;padding:1rem;overflow:auto;user-select:all">npm run bitrix:oauth -- exchange --code ${escapeHtml(code)}</pre>
<p style="color:#666;font-size:0.9rem">Код живёт ~30 секунд — сразу запустите команду.</p>
</body></html>`;

  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
