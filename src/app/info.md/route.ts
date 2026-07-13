import { LLM_INFO_MARKDOWN } from "@/lib/llm-info";
import { absoluteUrl } from "@/lib/site";

export function GET() {
  return new Response(LLM_INFO_MARKDOWN, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      Link: `<${absoluteUrl("/info")}>; rel="alternate"; type="text/html"`,
    },
  });
}

