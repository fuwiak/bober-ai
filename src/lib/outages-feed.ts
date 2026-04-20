export type OutageItem = {
  id: string;
  text: string;
  url: string;
  publishedAt?: string;
};

const CHANNEL_USERNAME = "yandexcloudalerts";

function stripHtml(value: string): string {
  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+\n/g, "\n")
    .replace(/\n\s+/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function asIsoFromUnix(value: unknown): string | undefined {
  if (typeof value !== "number") return undefined;
  const d = new Date(value * 1000);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

async function fetchViaBotApi(): Promise<OutageItem[]> {
  const token = process.env.TELEGRAM_BOT_KEY;
  if (!token) return [];

  const params = new URLSearchParams({
    limit: "100",
    allowed_updates: JSON.stringify(["channel_post"]),
  });
  const response = await fetch(`https://api.telegram.org/bot${token}/getUpdates?${params.toString()}`, {
    cache: "no-store",
  });
  if (!response.ok) return [];

  const data = (await response.json()) as {
    ok?: boolean;
    result?: Array<{
      channel_post?: {
        message_id?: number;
        date?: number;
        text?: string;
        caption?: string;
        chat?: { username?: string };
      };
    }>;
  };
  if (!data.ok || !Array.isArray(data.result)) return [];

  const items: OutageItem[] = [];
  for (const update of data.result) {
    const post = update.channel_post;
    if (!post?.message_id || post.chat?.username !== CHANNEL_USERNAME) continue;
    const text = (post.text || post.caption || "").trim();
    if (!text) continue;
    items.push({
      id: String(post.message_id),
      text,
      url: `https://t.me/${CHANNEL_USERNAME}/${post.message_id}`,
      publishedAt: asIsoFromUnix(post.date),
    });
  }

  return items
    .sort((a, b) => (a.publishedAt && b.publishedAt ? (a.publishedAt < b.publishedAt ? 1 : -1) : 0))
    .slice(0, 20);
}

async function fetchViaPublicPage(): Promise<OutageItem[]> {
  const response = await fetch(`https://t.me/s/${CHANNEL_USERNAME}`, {
    cache: "no-store",
    headers: { "user-agent": "Mozilla/5.0 (compatible; KineticAI/1.0)" },
  });
  if (!response.ok) return [];
  const html = await response.text();

  const blocks = html.match(/<div class="tgme_widget_message_wrap[\s\S]*?<\/article>\s*<\/div>/g) || [];
  const items: OutageItem[] = [];
  for (const block of blocks) {
    const idMatch = block.match(/data-post="[^/]+\/(\d+)"/);
    const textMatch = block.match(/<div class="tgme_widget_message_text[\s\S]*?<\/div>/);
    const dateMatch = block.match(/datetime="([^"]+)"/);
    if (!idMatch || !textMatch) continue;
    const id = idMatch[1];
    const text = stripHtml(textMatch[0]);
    if (!text) continue;
    items.push({
      id,
      text,
      url: `https://t.me/${CHANNEL_USERNAME}/${id}`,
      publishedAt: dateMatch?.[1],
    });
  }
  return items.slice(0, 20);
}

export async function fetchOutageFeed(): Promise<OutageItem[]> {
  try {
    const botItems = await fetchViaBotApi();
    if (botItems.length > 0) return botItems;
  } catch {
    // fallback to public page parsing
  }

  try {
    return await fetchViaPublicPage();
  } catch {
    return [];
  }
}
