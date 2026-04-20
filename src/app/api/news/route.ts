import { NextRequest, NextResponse } from "next/server";
import { buildNewsDigest, type NewsDigest } from "@/lib/news-agent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;

type CacheEntry = {
  digest: NewsDigest;
  expiresAt: number;
};

type GlobalCache = { kineticNewsCache?: CacheEntry };

const globalRef = globalThis as unknown as GlobalCache;

async function loadDigest(force: boolean): Promise<NewsDigest> {
  const now = Date.now();
  const cached = globalRef.kineticNewsCache;
  if (!force && cached && cached.expiresAt > now) {
    return cached.digest;
  }

  try {
    const digest = await buildNewsDigest();
    globalRef.kineticNewsCache = {
      digest,
      expiresAt: now + TWELVE_HOURS_MS,
    };
    return digest;
  } catch (error) {
    if (cached) return cached.digest;
    throw error;
  }
}

export async function GET(request: NextRequest) {
  const force = request.nextUrl.searchParams.get("force") === "1";
  const token = request.nextUrl.searchParams.get("token");

  const adminToken = process.env.NEWS_AGENT_REFRESH_TOKEN;
  if (force && adminToken && token !== adminToken) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const digest = await loadDigest(force && (!adminToken || token === adminToken));
    return NextResponse.json(digest, {
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=43200, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    return NextResponse.json({ error: "failed", message }, { status: 500 });
  }
}
