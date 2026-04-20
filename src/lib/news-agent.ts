export type NewsItem = {
  title: string;
  url: string;
  source: string;
  summary: string;
  category: "yandex-selectel" | "russia" | "world";
  image?: string;
  publishedAt?: string;
};

type SearchHit = {
  title: string;
  url: string;
  snippet: string;
  source: string;
  image?: string;
  publishedAt?: string;
};

type Bucket = {
  id: NewsItem["category"];
  label: string;
  fallbackQueries: string[];
  keywordHint: string;
  take: number;
};

const YANDEX_XML_ENDPOINT = "https://yandex.ru/search/xml";
const GOOGLE_CSE_ENDPOINT = "https://www.googleapis.com/customsearch/v1";
const OPENROUTER_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";

const DEFAULT_MODEL = "deepseek/deepseek-v3.2-speciale";
const FALLBACK_MODEL = "qwen/qwen-plus";
const KEYWORDS_MODEL = process.env.NEWS_AGENT_KEYWORDS_MODEL || FALLBACK_MODEL;

const BUCKETS: Bucket[] = [
  {
    id: "yandex-selectel",
    label: "Yandex Cloud и Selectel",
    fallbackQueries: [
      "Yandex Cloud новости ИИ",
      "YandexGPT новости",
      "Алиса AI LLM",
      "Selectel GPU ИИ новости",
      "Selectel облако новости",
    ],
    keywordHint:
      "Фокус на продуктах Yandex (YandexGPT, Yandex Cloud, Алиса, SpeechKit, DataSphere) и Selectel (GPU, дата-центры, облако, Kubernetes, ML-инфраструктура).",
    take: 3,
  },
  {
    id: "russia",
    label: "ИИ в России",
    fallbackQueries: [
      "новости искусственный интеллект Россия",
      "LLM Россия",
      "GigaChat новости",
      "Cotype T-Bank",
      "Kandinsky нейросеть",
      "VK Cloud ИИ",
    ],
    keywordHint:
      "Фокус на российских компаниях и моделях (Сбер/GigaChat, Яндекс, T-Банк/Cotype, Kandinsky, MTS AI, VK Cloud, Naumen, SberDevices), корпоративные LLM, AI-регулирование, 152-ФЗ, российские дата-центры.",
    take: 3,
  },
  {
    id: "world",
    label: "Мировые новости AI",
    fallbackQueries: [
      "AI news today",
      "LLM release",
      "OpenAI Anthropic DeepMind",
      "foundation model announcement",
      "generative AI enterprise",
    ],
    keywordHint:
      "Мировые AI-новости на английском: OpenAI, Anthropic, Google DeepMind, Meta AI, Mistral, xAI, Hugging Face, NVIDIA, регулирование AI, enterprise AI adoption, foundation models, multimodal, agentic AI.",
    take: 3,
  },
];

const RSS_FEEDS: { url: string; buckets: NewsItem["category"][] }[] = [
  { url: "https://habr.com/ru/rss/hub/artificial_intelligence/all/?fl=ru", buckets: ["russia", "yandex-selectel"] },
  { url: "https://habr.com/ru/rss/hub/machine_learning/all/?fl=ru", buckets: ["russia", "yandex-selectel"] },
  { url: "https://habr.com/ru/rss/hub/natural_language_processing/all/?fl=ru", buckets: ["russia", "world"] },
  { url: "https://selectel.ru/blog/feed/", buckets: ["yandex-selectel"] },
  { url: "https://cloud.yandex.ru/blog/rss", buckets: ["yandex-selectel"] },
  { url: "https://openai.com/blog/rss.xml", buckets: ["world"] },
  { url: "https://huggingface.co/blog/feed.xml", buckets: ["world"] },
  { url: "https://blog.google/technology/ai/rss/", buckets: ["world"] },
  { url: "https://www.technologyreview.com/feed/", buckets: ["world"] },
  { url: "https://venturebeat.com/category/ai/feed/", buckets: ["world"] },
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
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml))) out.push(m[1]);
  return out;
}

function extractFirstTag(xml: string, tag: string): string | null {
  const m = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`).exec(xml);
  return m ? m[1] : null;
}

function hostFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function faviconFallback(url: string): string {
  const host = hostFromUrl(url);
  return `https://www.google.com/s2/favicons?domain=${host}&sz=256`;
}

async function searchYandex(query: string, limit = 5): Promise<SearchHit[]> {
  const apiKey = process.env.YANDEX_SEARCH_API_KEY;
  const folderId = process.env.YANDEX_SEARCH_FOLDER_ID || process.env.YANDEX_FOLDER_ID;
  if (!apiKey || !folderId) return [];

  const groupsOnPage = process.env.YANDEX_SEARCH_GROUPS_ON_PAGE || "5";
  const region = process.env.YANDEX_SEARCH_REGION || "225";
  const timeoutMs = Number(process.env.YANDEX_SEARCH_TIMEOUT_MS || 8000);

  const params = new URLSearchParams({
    folderid: folderId,
    apikey: apiKey,
    query,
    l10n: "ru",
    sortby: "tm.order=descending",
    lr: region,
    groupby: `attr=d.mode=deep.groups-on-page=${groupsOnPage}.docs-in-group=1`,
    maxpassages: "3",
  });

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${YANDEX_XML_ENDPOINT}?${params.toString()}`, {
      signal: ctrl.signal,
      cache: "no-store",
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const docs = extractAllTags(xml, "doc").slice(0, limit);
    return docs
      .map((doc) => {
        const url = stripHtml(extractFirstTag(doc, "url") || "");
        const title = stripHtml(extractFirstTag(doc, "title") || "");
        const passages = extractAllTags(doc, "passage").map(stripHtml).join(" ");
        const headline = stripHtml(extractFirstTag(doc, "headline") || "");
        const snippet = passages || headline;
        return { url, title, snippet, source: hostFromUrl(url) } as SearchHit;
      })
      .filter((hit) => hit.url && hit.title);
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

function extractGoogleImage(item: GoogleItem): string | undefined {
  const thumb = item.pagemap?.cse_thumbnail?.[0]?.src;
  if (thumb) return thumb;
  const image = item.pagemap?.cse_image?.[0]?.src;
  if (image) return image;
  const meta = item.pagemap?.metatags?.[0] || {};
  return (
    meta["og:image"] ||
    meta["og:image:url"] ||
    meta["twitter:image"] ||
    meta["twitter:image:src"]
  );
}

function extractGooglePublishedAt(item: GoogleItem): string | undefined {
  const meta = item.pagemap?.metatags?.[0] || {};
  const raw =
    meta["article:published_time"] ||
    meta["og:updated_time"] ||
    meta["article:modified_time"] ||
    meta["pubdate"] ||
    meta["date"];
  if (!raw) return undefined;
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

async function searchGoogle(query: string, limit = 5): Promise<SearchHit[]> {
  const apiKey = process.env.GOOGLE_CUSTOM_SEARCH_API_KEY;
  const cx = process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID;
  if (!apiKey || !cx) return [];

  const params = new URLSearchParams({
    key: apiKey,
    cx,
    q: query,
    num: String(Math.min(limit, 10)),
    safe: "active",
    sort: "date",
  });

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 6000);
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
      image: extractGoogleImage(item),
      publishedAt: extractGooglePublishedAt(item),
    }));
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

function extractRssLink(block: string): string {
  const atom = /<link[^>]*?\shref=["']([^"']+)["']/i.exec(block);
  if (atom) return atom[1];
  const rss = /<link[^>]*>([^<]+)<\/link>/i.exec(block);
  return rss ? rss[1].trim() : "";
}

function extractRssImage(block: string, descHtml: string): string | undefined {
  const enclosure = /<enclosure[^>]*\surl=["']([^"']+)["'][^>]*type=["']image/i.exec(block)?.[1];
  if (enclosure) return enclosure[1];
  const media = /<media:(?:content|thumbnail)[^>]*\surl=["']([^"']+)["']/i.exec(block)?.[1];
  if (media) return media[1];
  const img = /<img[^>]*\ssrc=["']([^"']+)["']/i.exec(descHtml)?.[1];
  return img;
}

function parseRssDate(raw: string | null): string | undefined {
  if (!raw) return undefined;
  const trimmed = stripHtml(raw);
  const d = new Date(trimmed);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString();
}

function parseRss(xml: string): SearchHit[] {
  const isAtom = /<feed[\s>]/i.test(xml);
  const blocks = isAtom ? extractAllTags(xml, "entry") : extractAllTags(xml, "item");
  return blocks
    .map((block): SearchHit => {
      const title = stripHtml(extractFirstTag(block, "title") || "");
      const url = extractRssLink(block).trim();
      const descHtml =
        extractFirstTag(block, "description") ||
        extractFirstTag(block, "content:encoded") ||
        extractFirstTag(block, "content") ||
        extractFirstTag(block, "summary") ||
        "";
      const snippet = stripHtml(descHtml).slice(0, 400);
      const image = extractRssImage(block, descHtml);
      const publishedAt = parseRssDate(
        extractFirstTag(block, "pubDate") ||
          extractFirstTag(block, "published") ||
          extractFirstTag(block, "updated") ||
          extractFirstTag(block, "dc:date"),
      );
      return { title, url, snippet, source: hostFromUrl(url), image, publishedAt };
    })
    .filter((hit) => hit.title && hit.url);
}

async function fetchRssFeed(url: string, limit = 10): Promise<SearchHit[]> {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(url, {
      signal: ctrl.signal,
      cache: "no-store",
      headers: {
        accept:
          "application/rss+xml, application/atom+xml, application/xml;q=0.9, text/xml;q=0.8, */*;q=0.5",
        "user-agent": "Kinetic-AI-News-Agent/1.0 (+https://kinetic-ai.ru)",
      },
    });
    clearTimeout(timer);
    if (!res.ok) return [];
    const xml = await res.text();
    return parseRss(xml).slice(0, limit);
  } catch {
    return [];
  }
}

async function callOpenRouter(
  prompt: string,
  model: string,
  options?: { temperature?: number; jsonMode?: boolean; system?: string },
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY is not configured");

  const body: Record<string, unknown> = {
    model,
    temperature: options?.temperature ?? 0.2,
    messages: [
      {
        role: "system",
        content:
          options?.system ||
          "Ты русскоязычный редактор AI-дайджеста. Отвечаешь строго валидным JSON по запрошенной схеме, без markdown и комментариев.",
      },
      { role: "user", content: prompt },
    ],
  };
  if (options?.jsonMode !== false) {
    body.response_format = { type: "json_object" };
  }

  const timeoutMs = Number(process.env.NEWS_AGENT_LLM_TIMEOUT_MS || 25000);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(OPENROUTER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://kinetic-ai.ru",
        "X-Title": "Kinetic AI News Agent",
      },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`OpenRouter ${res.status}: ${text.slice(0, 200)}`);
    }

    const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    return data.choices?.[0]?.message?.content ?? "";
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

function safeParseJsonArray(text: string): Array<Record<string, unknown>> {
  const parsed = safeParseJson<unknown>(text);
  if (Array.isArray(parsed)) return parsed as Array<Record<string, unknown>>;
  if (parsed && typeof parsed === "object") {
    const container = parsed as Record<string, unknown>;
    for (const value of Object.values(container)) {
      if (Array.isArray(value)) return value as Array<Record<string, unknown>>;
    }
  }
  return [];
}

async function generateKeywords(bucket: Bucket): Promise<string[]> {
  const sys =
    "Ты помогаешь редактору AI-дайджеста подбирать разнообразные поисковые запросы. Отвечаешь ТОЛЬКО валидным JSON-массивом из строк, без markdown и пояснений.";

  const language =
    bucket.id === "world"
      ? "Пиши запросы на английском языке (1-6 слов каждый)."
      : "Пиши запросы на русском языке (1-6 слов каждый).";

  const prompt = [
    `Сформируй 10 разнообразных поисковых запросов для сбора СВЕЖИХ новостей из категории: "${bucket.label}".`,
    `Тематика строго: искусственный интеллект, LLM, GenAI, foundation models, agentic AI, AI-инфраструктура, GPU, MLOps, корпоративные внедрения ИИ.`,
    language,
    `Не повторяйся, избегай слишком общих фраз.`,
    `${bucket.keywordHint}`,
    `Ответ: JSON-массив из 10 строк. Пример: ["запрос один","запрос два"].`,
  ].join("\n");

  try {
    const raw = await callOpenRouter(prompt, KEYWORDS_MODEL, {
      temperature: 0.6,
      jsonMode: false,
      system: sys,
    });
    const parsed = safeParseJson<unknown>(raw);
    let list: unknown[] = [];
    if (Array.isArray(parsed)) list = parsed;
    else if (parsed && typeof parsed === "object") {
      for (const value of Object.values(parsed as Record<string, unknown>)) {
        if (Array.isArray(value)) {
          list = value;
          break;
        }
      }
    }
    const strings = list
      .filter((v): v is string => typeof v === "string")
      .map((s) => s.trim())
      .filter((s) => s.length > 1 && s.length <= 120);
    if (strings.length >= 3) return strings.slice(0, 10);
  } catch {
    // fall through to fallback
  }
  return bucket.fallbackQueries;
}

async function searchQuery(query: string): Promise<SearchHit[]> {
  const yandex = await searchYandex(query, 5);
  if (yandex.length >= 3) return yandex;
  const google = await searchGoogle(query, 5);
  const seen = new Set(yandex.map((hit) => hit.url));
  for (const hit of google) {
    if (!seen.has(hit.url)) {
      yandex.push(hit);
      seen.add(hit.url);
    }
  }
  return yandex;
}

async function collectBucketCandidates(bucket: Bucket): Promise<SearchHit[]> {
  const queries = await generateKeywords(bucket);

  const results: SearchHit[] = [];
  const seen = new Set<string>();
  const targetSize = bucket.take * 6;

  const push = (hits: SearchHit[]) => {
    for (const hit of hits) {
      if (!hit.url || seen.has(hit.url)) continue;
      seen.add(hit.url);
      results.push(hit);
    }
  };

  for (const query of queries) {
    push(await searchQuery(query));
    if (results.length >= targetSize) break;
  }

  if (results.length < bucket.take * 3) {
    const feeds = RSS_FEEDS.filter((f) => f.buckets.includes(bucket.id));
    for (const feed of feeds) {
      push(await fetchRssFeed(feed.url, 10));
      if (results.length >= targetSize) break;
    }
  }

  return results;
}

function buildPrompt(bucket: Bucket, candidates: SearchHit[]): string {
  const catalog = candidates
    .slice(0, 22)
    .map(
      (hit, idx) =>
        `${idx + 1}. title: ${hit.title}\n   source: ${hit.source}\n   url: ${hit.url}\n   snippet: ${hit.snippet}`,
    )
    .join("\n");

  return [
    `Ты - редактор корпоративного AI-дайджеста для компании Kinetic AI.`,
    `Твоя задача - выбрать ${bucket.take} самых актуальных и значимых новостей из категории: "${bucket.label}".`,
    `Тематика: искусственный интеллект, LLM, GenAI, облачная AI-инфраструктура, GPU, корпоративные сценарии.`,
    `Не выдумывай факты и ссылки. Используй ТОЛЬКО материалы из списка ниже.`,
    `Отфильтруй рекламу, дубликаты и нерелевантные записи. Предпочитай материалы последних 48 часов.`,
    ``,
    `Список кандидатов:`,
    catalog,
    ``,
    `Ответь строго в формате JSON (без комментариев и markdown), массив объектов:`,
    `[{ "title": string, "url": string, "source": string, "summary": string }]`,
    `- title: краткий заголовок на русском (до 110 символов).`,
    `- url: ссылка ровно из списка кандидатов.`,
    `- source: домен источника (например, "habr.com").`,
    `- summary: 1-2 предложения сути новости на русском, по-деловому, без воды.`,
  ].join("\n");
}

async function curateBucket(bucket: Bucket): Promise<NewsItem[]> {
  const candidates = await collectBucketCandidates(bucket);
  if (candidates.length === 0) return [];

  const prompt = buildPrompt(bucket, candidates);

  let content = "";
  try {
    content = await callOpenRouter(prompt, process.env.NEWS_AGENT_MODEL || DEFAULT_MODEL);
  } catch {
    try {
      content = await callOpenRouter(prompt, FALLBACK_MODEL);
    } catch {
      content = "";
    }
  }

  const parsed = safeParseJsonArray(content);
  const byUrl = new Map(candidates.map((hit) => [hit.url, hit]));

  const items = parsed
    .map((row) => {
      const title = typeof row.title === "string" ? row.title.trim() : "";
      const url = typeof row.url === "string" ? row.url.trim() : "";
      const source = typeof row.source === "string" ? row.source.trim() : hostFromUrl(url);
      const summary = typeof row.summary === "string" ? row.summary.trim() : "";
      return { title, url, source, summary };
    })
    .filter((row) => row.title && row.url && byUrl.has(row.url))
    .slice(0, bucket.take)
    .map((row): NewsItem => {
      const hit = byUrl.get(row.url);
      return {
        ...row,
        category: bucket.id,
        image: hit?.image || faviconFallback(row.url),
        publishedAt: hit?.publishedAt,
      };
    });

  if (items.length > 0) return items;

  return candidates.slice(0, bucket.take).map((hit) => ({
    title: hit.title,
    url: hit.url,
    source: hit.source || hostFromUrl(hit.url),
    summary: hit.snippet.slice(0, 240),
    category: bucket.id,
    image: hit.image || faviconFallback(hit.url),
    publishedAt: hit.publishedAt,
  }));
}

export type NewsDigest = {
  generatedAt: string;
  items: NewsItem[];
};

export async function buildNewsDigest(): Promise<NewsDigest> {
  const settled = await Promise.allSettled(BUCKETS.map((bucket) => curateBucket(bucket)));
  const items: NewsItem[] = [];
  for (const result of settled) {
    if (result.status === "fulfilled") items.push(...result.value);
    else console.error("[news-agent] bucket failed", result.reason);
  }
  return { generatedAt: new Date().toISOString(), items };
}

export const NEWS_CATEGORY_LABEL: Record<NewsItem["category"], string> = {
  "yandex-selectel": "Yandex Cloud · Selectel",
  russia: "Россия",
  world: "Мир",
};
