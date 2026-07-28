import type { APIRoute } from "astro";

export const prerender = false;

/**
 * Путь первоначальной установки локального приложения Битрикс24.
 * В форме: https://www.bober-ai.dev/api/bitrix/oauth/install
 */
export const GET: APIRoute = () => {
  return new Response("ok", {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
};

export const POST: APIRoute = GET;
