import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Путь первоначальной установки локального приложения Битрикс24.
 * В форме: https://www.bober-ai.dev/api/bitrix/oauth/install
 */
export async function GET() {
  return new NextResponse("ok", {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export async function POST() {
  return GET();
}
