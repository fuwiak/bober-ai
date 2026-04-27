export type ShortVideoItem = {
  id: string;
  title: string;
  category: string;
  duration: string;
  url: string;
  platform: "YouTube" | "VK Video" | "Rutube" | "Yandex Video";
  thumbnail?: string;
  videoId?: string;
};

type SearchHit = {
  title: string;
  url: string;
  snippet: string;
  source: string;
  image?: string;
};

const YANDEX_XML_ENDPOINT = "https://yandex.ru/search/xml";
const GOOGLE_CSE_ENDPOINT = "https://www.googleapis.com/customsearch/v1";
const OPENROUTER_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "deepseek/deepseek-v3.2-speciale";
const FALLBACK_MODEL = "qwen/qwen-plus";

const FALLBACK_QUERIES = [
  "Yandex AI Studio видео на русском",
  "Yandex AI Studio туториал",
  "YandexGPT AI Studio обзор",
  "site:youtube.com/shorts Yandex AI Studio русский",
  "site:vkvideo.ru Yandex AI Studio ИИ",
  "site:rutube.ru Yandex AI Studio нейросети",
  "site:yandex.ru/video Yandex AI Studio",
  "Яндекс AI Studio промпты видео",
  "Yandex Cloud AI Studio видео",
  "Академия Яндекс искусственный интеллект shorts",
];

function stripHtml(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function extractAllTags(xml: string, tag: string): string[] {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "g");
  const out: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = re.exec(xml))) out.push(match[1]);
  return out;
}

function extractFirstTag(xml: string, tag: string): string | null {
  const match = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`).exec(xml);
  return match ? match[1] : null;
}

function hostFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function platformFromUrl(url: string): ShortVideoItem["platform"] | null {
  const host = hostFromUrl(url);
  if (host.includes("youtube.com") || host.includes("youtu.be")) return "YouTube";
  if (host.includes("vkvideo.ru") || host.includes("vk.com")) return "VK Video";
  if (host.includes("rutube.ru")) return "Rutube";
  if (host.includes("yandex.ru") || host.includes("ya.ru")) return "Yandex Video";
  return null;
}

function extractYouTubeId(url: string): string | undefined {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) return parsed.pathname.split("/").filter(Boolean)[0];
    if (parsed.pathname.startsWith("/shorts/")) return parsed.pathname.split("/")[2];
    return parsed.searchParams.get("v") || undefined;
  } catch {
    return undefined;
  }
}

function thumbnailFor(hit: SearchHit): string | undefined {
  const yt = extractYouTubeId(hit.url);
  if (yt) return `https://i.ytimg.com/vi/${yt}/hq720.jpg`;
  if (hit.image) return hit.image;
  const host = hostFromUrl(hit.url);
  return host ? `https://www.google.com/s2/favicons?domain=${host}&sz=256` : undefined;
}

async function searchYandex(query: string, limit = 8): Promise<SearchHit[]> {
  const apiKey = process.env.YANDEX_SEARCH_API_KEY;
  const folderId = process.env.YANDEX_SEARCH_FOLDER_ID || process.env.YANDEX_FOLDER_ID;
  if (!apiKey || !folderId) return [];

  const params = new URLSearchParams({
    folderid: folderId,
    apikey: apiKey,
    query,
    l10n: "ru",
    sortby: "tm.order=descending",
    lr: process.env.YANDEX_SEARCH_REGION || "225",
    groupby: `attr=d.mode=deep.groups-on-page=${limit}.docs-in-group=1`,
    maxpassages: "3",
  });

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(`${YANDEX_XML_ENDPOINT}?${params.toString()}`, {
      signal: ctrl.signal,
      cache: "no-store",
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return extractAllTags(xml, "doc")
      .slice(0, limit)
      .map((doc) => {
        const url = stripHtml(extractFirstTag(doc, "url") || "");
        const title = stripHtml(extractFirstTag(doc, "title") || "");
        const snippet = extractAllTags(doc, "passage").map(stripHtml).join(" ");
        return { title, url, snippet, source: hostFromUrl(url) };
      })
      .filter((hit) => hit.title && hit.url);
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

type GoogleItem = {
  title: string;
  link: string;
  snippet?: string;
  displayLink?: string;
  pagemap?: {
    cse_thumbnail?: Array<{ src?: string }>;
    cse_image?: Array<{ src?: string }>;
    metatags?: Array<Record<string, string>>;
  };
};

function googleImage(item: GoogleItem): string | undefined {
  return (
    item.pagemap?.cse_thumbnail?.[0]?.src ||
    item.pagemap?.cse_image?.[0]?.src ||
    item.pagemap?.metatags?.[0]?.["og:image"] ||
    item.pagemap?.metatags?.[0]?.["twitter:image"]
  );
}

async function searchGoogle(query: string, limit = 8): Promise<SearchHit[]> {
  const apiKey = process.env.GOOGLE_CUSTOM_SEARCH_API_KEY;
  const cx = process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID;
  if (!apiKey || !cx) return [];

  const params = new URLSearchParams({
    key: apiKey,
    cx,
    q: query,
    num: String(Math.min(limit, 10)),
    lr: "lang_ru",
    safe: "active",
  });

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(`${GOOGLE_CSE_ENDPOINT}?${params.toString()}`, {
      cache: "no-store",
      signal: ctrl.signal,
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { items?: GoogleItem[] };
    return (data.items || []).slice(0, limit).map((item) => ({
      title: item.title,
      url: item.link,
      snippet: item.snippet || "",
      source: item.displayLink || hostFromUrl(item.link),
      image: googleImage(item),
    }));
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

async function searchDuckDuckGo(query: string, limit = 8): Promise<SearchHit[]> {
  const params = new URLSearchParams({ q: query, kl: "ru-ru" });
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(`https://html.duckduckgo.com/html/?${params.toString()}`, {
      cache: "no-store",
      signal: ctrl.signal,
      headers: {
        "user-agent": "Kinetic-AI-Shorts-Agent/1.0 (+https://kinetic-ai.ru)",
      },
    });
    if (!res.ok) return [];
    const html = await res.text();
    const hits: SearchHit[] = [];
    const re = /<a[^>]+class="result__a"[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<a[^>]+class="result__snippet"[^>]*>([\s\S]*?)<\/a>/g;
    let match: RegExpExecArray | null;
    while ((match = re.exec(html)) && hits.length < limit) {
      const url = decodeURIComponent(match[1].replace(/^\/l\/\?uddg=/, "").split("&")[0]);
      hits.push({
        title: stripHtml(match[2]),
        url,
        snippet: stripHtml(match[3]),
        source: hostFromUrl(url),
      });
    }
    return hits;
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

async function callOpenRouter(prompt: string, options?: { temperature?: number; system?: string }): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY is not configured");
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), Number(process.env.NEWS_AGENT_LLM_TIMEOUT_MS || 25000));
  try {
    const res = await fetch(OPENROUTER_ENDPOINT, {
      method: "POST",
      signal: ctrl.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://kinetic-ai.ru",
        "X-Title": "Kinetic AI Shorts Agent",
      },
      body: JSON.stringify({
        model: process.env.SHORTS_AGENT_MODEL || process.env.NEWS_AGENT_MODEL || DEFAULT_MODEL,
        temperature: options?.temperature ?? 0.2,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              options?.system ||
              "Ты русскоязычный редактор видео-подборки. Отвечай строго валидным JSON, без markdown.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });
    if (!res.ok) throw new Error(`OpenRouter ${res.status}`);
    const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    return data.choices?.[0]?.message?.content || "";
  } finally {
    clearTimeout(timer);
  }
}

function safeParseJson<T>(text: string): T | null {
  try {
    return JSON.parse(text) as T;
  } catch {
    const match = text.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]) as T;
    } catch {
      return null;
    }
  }
}

function safeArray(text: string): Array<Record<string, unknown>> {
  const parsed = safeParseJson<unknown>(text);
  if (Array.isArray(parsed)) return parsed as Array<Record<string, unknown>>;
  if (parsed && typeof parsed === "object") {
    for (const value of Object.values(parsed as Record<string, unknown>)) {
      if (Array.isArray(value)) return value as Array<Record<string, unknown>>;
    }
  }
  return [];
}

async function generateQueries(): Promise<string[]> {
  try {
    const raw = await callOpenRouter(
      [
        "Сформируй 12 поисковых запросов для поиска русскоязычных коротких видео про Yandex AI Studio, YandexGPT, Yandex Cloud AI, промпты и внедрение ИИ.",
        "Источники должны покрывать YouTube Shorts, VK Video, Rutube и Yandex Video.",
        "Предпочитай запросы про Yandex AI Studio.",
        'Ответ JSON: {"queries":["..."]}',
      ].join("\n"),
      {
        temperature: 0.6,
        system: "Отвечай только валидным JSON-объектом.",
      },
    );
    const parsed = safeParseJson<{ queries?: unknown }>(raw);
    const queries = Array.isArray(parsed?.queries) ? parsed.queries : [];
    const strings = queries.filter((q): q is string => typeof q === "string" && q.trim().length > 2);
    if (strings.length >= 4) return strings.slice(0, 12);
  } catch {
    // fallback below
  }
  return FALLBACK_QUERIES;
}

function isRelevantVideo(hit: SearchHit): boolean {
  if (!platformFromUrl(hit.url)) return false;
  const text = `${hit.title} ${hit.snippet}`.toLowerCase();
  const hasRussian = /[а-яё]/i.test(text);
  const hasAi = /(yandex|яндекс|ai studio|aistudio|yandexgpt|ии|нейросет|промпт|gpt|llm)/i.test(text);
  return hasRussian && hasAi;
}

async function collectCandidates(): Promise<SearchHit[]> {
  const queries = await generateQueries();
  const results: SearchHit[] = [];
  const seen = new Set<string>();
  const push = (hits: SearchHit[]) => {
    for (const hit of hits) {
      if (!hit.url || seen.has(hit.url) || !isRelevantVideo(hit)) continue;
      seen.add(hit.url);
      results.push(hit);
    }
  };

  for (const query of queries) {
    push(await searchYandex(query, 8));
    push(await searchGoogle(query, 8));
    push(await searchDuckDuckGo(query, 8));
    if (results.length >= 30) break;
  }
  return results;
}

function buildPrompt(candidates: SearchHit[]): string {
  const catalog = candidates
    .slice(0, 30)
    .map((hit, index) => `${index + 1}. title: ${hit.title}\nurl: ${hit.url}\nsource: ${hit.source}\nsnippet: ${hit.snippet}`)
    .join("\n\n");

  return [
    "Выбери 8 лучших русскоязычных коротких видео для блока Yandex Academy Shorts.",
    "Источники: VK Video, Rutube, YouTube/Shorts, Yandex Video.",
    "Главный приоритет: видео про Yandex AI Studio. Затем YandexGPT, Yandex Cloud AI, промпты, внедрение ИИ.",
    "Не выдумывай ссылки. Используй только URL из списка кандидатов.",
    "Ответ JSON-массив: [{\"title\":string,\"url\":string,\"category\":string,\"duration\":string}]",
    "category короткая: YANDEX AI, PROMPTING, BUSINESS, AUTOMATION, SECURITY или AI BASICS.",
    "duration если неизвестна: \"Shorts\".",
    "",
    catalog,
  ].join("\n");
}

export type ShortsDigest = {
  generatedAt: string;
  items: ShortVideoItem[];
};

export async function buildShortsDigest(): Promise<ShortsDigest> {
  const candidates = await collectCandidates();
  let content = "";
  if (candidates.length > 0) {
    try {
      content = await callOpenRouter(buildPrompt(candidates));
    } catch {
      try {
        content = await callOpenRouter(buildPrompt(candidates), {
          system: "Отвечай только валидным JSON.",
        });
      } catch {
        content = "";
      }
    }
  }

  const byUrl = new Map(candidates.map((hit) => [hit.url, hit]));
  const rows = safeArray(content);
  const items = rows
    .map((row): ShortVideoItem | null => {
      const url = typeof row.url === "string" ? row.url.trim() : "";
      const hit = byUrl.get(url);
      const platform = platformFromUrl(url);
      if (!hit || !platform) return null;
      const title = typeof row.title === "string" ? row.title.trim() : hit.title;
      const category = typeof row.category === "string" ? row.category.trim() : "AI";
      const duration = typeof row.duration === "string" ? row.duration.trim() : "Shorts";
      const videoId = extractYouTubeId(url);
      return {
        id: url,
        title,
        category,
        duration,
        url,
        platform,
        thumbnail: thumbnailFor(hit),
        videoId,
      };
    })
    .filter((item): item is ShortVideoItem => Boolean(item))
    .slice(0, 8);

  if (items.length > 0) return { generatedAt: new Date().toISOString(), items };

  const fallback = candidates.slice(0, 8).map((hit): ShortVideoItem => {
    const platform = platformFromUrl(hit.url) || "Yandex Video";
    return {
      id: hit.url,
      title: hit.title,
      category: /yandex|яндекс|ai studio/i.test(`${hit.title} ${hit.snippet}`) ? "YANDEX AI" : "AI",
      duration: "Shorts",
      url: hit.url,
      platform,
      thumbnail: thumbnailFor(hit),
      videoId: extractYouTubeId(hit.url),
    };
  });

  return { generatedAt: new Date().toISOString(), items: fallback };
}
