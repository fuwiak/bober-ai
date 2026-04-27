import { NextRequest, NextResponse } from "next/server";
import {
  getCachedShorts,
  isShortsRefreshInFlight,
  kickoffShortsRefresh,
  peekCachedShorts,
} from "@/lib/shorts-scheduler";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const force = request.nextUrl.searchParams.get("force") === "1";
  const token = request.nextUrl.searchParams.get("token");

  const adminToken = process.env.NEWS_AGENT_REFRESH_TOKEN;
  if (force && adminToken && token !== adminToken) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (force) {
    try {
      const digest = await getCachedShorts(true);
      return NextResponse.json(digest, {
        headers: { "Cache-Control": "no-store" },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "unknown error";
      return NextResponse.json({ error: "failed", message }, { status: 500 });
    }
  }

  kickoffShortsRefresh();
  const cached = peekCachedShorts();
  const refreshing = isShortsRefreshInFlight();

  if (cached) {
    return NextResponse.json(
      { ...cached, refreshing },
      {
        headers: {
          "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=43200",
        },
      },
    );
  }

  return NextResponse.json(
    { generatedAt: null, items: [], refreshing },
    {
      status: 202,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
