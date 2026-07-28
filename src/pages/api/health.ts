import type { APIRoute } from "astro";
import { startNewsScheduler } from "@/lib/news-scheduler";

export const prerender = false;

export const GET: APIRoute = () => {
  try {
    startNewsScheduler();
  } catch {
    /* ignore */
  }
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
