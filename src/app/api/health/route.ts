import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      service: "bober-ai-dev",
      timestamp: new Date().toISOString(),
    },
    { status: 200 },
  );
}
