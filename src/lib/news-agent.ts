export type NewsItem = {
  title: string;
  url: string;
  source: string;
  summary: string;
  category: "yandex-selectel" | "russia" | "world";
  publishedAt?: string;
};

type SearchHit = {
  title: string;
  url: string;
  snippet: string;
  source: string;
};

type Bucket = {
  id: NewsItem["category"];
  label: string;
  queries: string[];
  take: number;
};

const YANDEX_XML_ENDPOINT = "https://yandex.ru/search/xml";
const GOOGLE_CSE_ENDPOINT = "https://www.googleapis.com/customsearch/v1";
const OPENROUTER_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";

const DEFAULT_MODEL = "deepseek/deepseek-v3.2-speciale";
const FALLBACK_MODEL = "qwen/qwen-plus";

const BUCKETS: Bucket[] = [
  {
    id: "yandex-selectel",
    label: "Yandex Cloud и Selectel",
    queries: [
      "Yandex Cloud новости ИИ",
      "YandexGPT новости",
      "Алиса AI LLM",
      "Selectel GPU ИИ новости",
      "Selectel облако новости",
    ],
    take: 3,
  },
  {
    id: "russia",
    label: "ИИ в России",
    queries: [
      "новости искусственный интеллект Россия",
      "LLM Россия новости",
      "GenAI Россия компании",
      "Сбер GigaChat новости",
      "VK Cloud ИИ новости",
    ],
    take: 3,
  },
  {
    id: "world",
    label: "Мировые новости AI",
    queries: [
      "AI news today",
      "LLM breakthrough news",
      "GenAI enterprise news",
      "OpenAI Anthropic Google DeepMind news",
      "foundation model release",
    ],
    take: 3,
  },
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
        return { url, title, snippet, source: hostFromUrl(url) };
      })
      .filter((hit) => hit.url && hit.title);
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
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

  try {
    const res = await fetch(`${GOOGLE_CSE_ENDPOINT}?${params.toString()}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { items?: Array<{ title: string; link: string; snippet?: string; displayLink?: string }> };
    return (data.items || []).slice(0, limit).map((item) => ({
      title: item.title,
      url: item.link,
      snippet: item.snippet || "",
      source: item.displayLink || hostFromUrl(item.link),
    }));
  } catch {
    return [];
  }
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
  const results: SearchHit[] = [];
  const seen = new Set<string>();
  for (const query of bucket.queries) {
    const hits = await searchQuery(query);
    for (const hit of hits) {
      if (!hit.url || seen.has(hit.url)) continue;
      seen.add(hit.url);
      results.push(hit);
    }
    if (results.length >= bucket.take * 4) break;
  }
  return results;
}

function buildPrompt(bucket: Bucket, candidates: SearchHit[]): string {
  const catalog = candidates
    .slice(0, 20)
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

function safeParseJsonArray(text: string): Array<Record<string, unknown>> {
  const match = text.match(/\[[\s\S]*\]/);
  if (!match) return [];
  try {
    const parsed = JSON.parse(match[0]);
    return Array.isArray(parsed) ? (parsed as Array<Record<string, unknown>>) : [];
  } catch {
    return [];
  }
}

async function callOpenRouter(prompt: string, model: string): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY is not configured");

  const res = await fetch(OPENROUTER_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://kinetic-ai.ru",
      "X-Title": "Kinetic AI News Agent",
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "Ты русскоязычный редактор AI-дайджеста. Отвечаешь строго валидным JSON по запрошенной схеме, без markdown и комментариев.",
        },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`OpenRouter ${res.status}: ${body.slice(0, 200)}`);
  }

  const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
  return data.choices?.[0]?.message?.content ?? "";
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
  const allowedUrls = new Set(candidates.map((hit) => hit.url));

  const items = parsed
    .map((row) => {
      const title = typeof row.title === "string" ? row.title.trim() : "";
      const url = typeof row.url === "string" ? row.url.trim() : "";
      const source = typeof row.source === "string" ? row.source.trim() : hostFromUrl(url);
      const summary = typeof row.summary === "string" ? row.summary.trim() : "";
      return { title, url, source, summary };
    })
    .filter((row) => row.title && row.url && allowedUrls.has(row.url))
    .slice(0, bucket.take)
    .map((row) => ({ ...row, category: bucket.id }));

  if (items.length > 0) return items;

  return candidates.slice(0, bucket.take).map((hit) => ({
    title: hit.title,
    url: hit.url,
    source: hit.source || hostFromUrl(hit.url),
    summary: hit.snippet.slice(0, 240),
    category: bucket.id,
  }));
}

export type NewsDigest = {
  generatedAt: string;
  items: NewsItem[];
};

export async function buildNewsDigest(): Promise<NewsDigest> {
  const items: NewsItem[] = [];
  for (const bucket of BUCKETS) {
    const picked = await curateBucket(bucket);
    items.push(...picked);
  }
  return { generatedAt: new Date().toISOString(), items };
}

export const NEWS_CATEGORY_LABEL: Record<NewsItem["category"], string> = {
  "yandex-selectel": "Yandex Cloud · Selectel",
  russia: "Россия",
  world: "Мир",
};
