import { NextRequest, NextResponse } from "next/server";
import { getCachedDigest } from "@/lib/news-scheduler";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const force = request.nextUrl.searchParams.get("force") === "1";
  const token = request.nextUrl.searchParams.get("token");

  const adminToken = process.env.NEWS_AGENT_REFRESH_TOKEN;
  if (force && adminToken && token !== adminToken) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const digest = await getCachedDigest(force);
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
