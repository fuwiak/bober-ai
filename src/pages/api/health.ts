import type { APIRoute } from "astro";
import { startNewsScheduler } from "@/lib/news-scheduler";

export const prerender = false;

export const GET: APIRoute = () => {
  try {
    startNewsScheduler();
  } catch {
    /* ignore */
  }
  return new Response(
    JSON.stringify({
      ok: true,
      sha: process.env.GIT_SHA || process.env.DEPLOY_SHA || null,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
};
