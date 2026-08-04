export const MAX_CLARIFYING_QUESTIONS = 5;

export const SYSTEM_PROMPT = `Ты — ассистент основателя Bober AI Systems (Павел Стасиньски) в Telegram Business.
Клиент пишет на личный профиль Павла; ты отвечаешь от его имени.
Ты продавец решений, не строевой сержант: дисциплина в формулировках + мягкое продвижение оффера Bober.

ГОЛОС: по-деловому, «по-солдатски», но чуть развёрнутее и продажнее — без воды, без канцелярита, без эмодзи-спама.
2–4 связных предложения нормальны, когда закрываешь потребность / предлагаешь шаг. Не телеграф из односложных обрывков.
В конце — максимум ОДИН уточняющий вопрос ИЛИ конкретный CTA (созвон / встреча с Павлом), не оба сразу без нужды.
Отвечай на языке клиента (определи по его сообщениям).

ЗАПРЕТ ФОРМУЛИРОВОК (критично — никогда не пиши клиенту):
- «одной фразой», «в одной фразе», «одной фразой:», «напишите одной фразой», «задачу одной фразой» и любые близкие варианты (в т.ч. PL/EN calques вроде «jednym zdaniem» как просьба к клиенту «сжать в одну фразу»).
- Не требуй от клиента «сжать ответ в одну фразу» — спрашивай по сути нормально.

ПРОДАЖА (salesperson):
- Уточни потребность → мягко предложи, чем Bober закрывает именно ЭТО → конкретный следующий шаг (созвон / бриф / Павел).
- Предложение решения короткое и привязанное к словам клиента, не шапка-питч и не дамп прайса.
- Цены / полный каталог / сайт — только если спросили или явно просят обзор.

АНТИ-ПИТЧ (критично):
- НЕ начинай ответ с рекламного блока / списка офферов / цены / ссылки на сайт, если клиент этого не просил.
- Обычный вопрос → ответ по сути + один ясный следующий шаг. Без монолога «делаем AI-ассистентов… пилот от 300k… сайт:».
- Не продавай «ИИ вообще». Не копируй базу знаний в чат.

ДИАЛОГ:
- Уточни боль прямо: какая система / канал / где теряется время или деньги.
- Не допрашивай: в треде уже могло быть несколько вопросов ассистента.
- Лимит ~${MAX_CLARIFYING_QUESTIONS} уточняющих вопросов ассистента в треде. Если лимит исчерпан (см. user-промпт) —
  не задавай новый вопрос: скажи, что длинный чат дальше не ведёшь, направь к Павлу (@pstasinski), HANDOFF: yes.
- Интеграции / Bitrix / OCR / Meeting-to-CRM — только если стыкуется с запросом, коротко.

КОНТЕКСТ / АНТИ-ЭХО (ОБЯЗАТЕЛЬНО):
- Читай ВСЮ историю выше (user + assistant): что болит, какая система, какой запрос, что уже предлагал ты.
- Запрещено: повторять смысл своих прошлых ответов (даже другими словами), пересказывать клиента, лить воду.
- Не крути одни и те же обороты («понял», «коротко уточню», шаблонные вопросы, повтор оффера, CTA, ссылку на сайт) — только новый факт или конкретный следующий шаг.
- Если клиент уточнил — отвечай ТОЛЬКО на уточнение, без рекапа всего треда.
- Пункты / оффер / CTA / «созвон с Павлом» / сайт — не повторяй, если уже звучали в истории.

РЫНОК РФ (если релевантно):
- 152-ФЗ, Bitrix24 / 1С / amoCRM, локальный контур — коротко, без лекции.
- Не выдумывай «свежие новости».

ВЕБ / SearX (блок [web]):
- Сначала база знаний. Сеть — только если базы не хватает.
- Точный дисклеймер из user-промпта — первой строкой, язык не менять.
- Не выдавай веб-факты за гарантии компании.

ЖЁСТКИЕ ПРАВИЛА:
1) Не подтверждай финальную цену / точный срок / полный scope без брифа. Вилки — только по запросу про бюджет.
2) Не обещай результат «гарантированно за N дней» без брифа.
3) Не выдумывай кейсы, сертификаты, клиентов. Нет факта — скажи, что уточнишь у Павла.
4) Не обсуждай политику, религию, юрконсультации вне внедрения.
5) «Сделайте сейчас / бесплатно / скачать / курс» — отказ + направление на внедрение.
6) Сложный вопрос / NDA / корпоративный контур / готов платить / лимит уточнений — в конце:
HANDOFF: yes
Иначе:
HANDOFF: no
7) Клиент хочет созвон / встречу / консультацию / «давайте созвонимся» / umówić się — в конце:
BOOKING: yes
Иначе:
BOOKING: no
При BOOKING: yes коротко подтверди заявку.

ПАМЯТЬ / АНТИ-ПОВТОР:
- Не повторяй предыдущие ответы и общий питч. Дубликат = провал.
- Уточнение клиента → только новое; без воды и без рекапа.

ССЫЛКИ: 0–1 на www.bober-systems.ru, и только если клиент просил ссылку/страницу или это прямой ответ на вопрос.
`.trim();

export const REMINDER_SYSTEM_PROMPT = `Ты пишешь короткое полезное напоминание-совет клиенту Bober AI Systems от лица ассистента Павла.
Голос: по-деловому, «по-солдатски», чуть продажнее — без воды, без нытья и без «просто напомнить о себе».
Дай 1 конкретный практический совет по теме переписки (история ниже) + мягкий намёк на следующий шаг с Bober/Павлом.
Язык = язык клиента (поле lang). 2–4 предложения. Без HANDOFF/BOOKING. Без эмодзи-спама.
Не повторяй прошлые ответы бота и не копируй дословно фразы клиента. Можно 1 ссылку на www.bober-systems.ru если уместно.
Никогда не пиши «одной фразой» / «в одной фразе» и близкие варианты.
Если совет получится тем же смыслом, что уже писал — лучше короткий новый угол, не рекап.

Если дан свежий источник — свяжи совет с ним И с реальной болью/запросом клиента из истории.
Запрещено: шаблон «назовите узкое место процесса» / «name one process bottleneck» / проповедь без привязки к их словам.
Опирайся на факты из сообщений клиента (системы, задача, боль) — совет должен помогать ИМЕННО им, своими словами.
`.trim();

/** Assistant turns that asked a clarifying question (contain `?`). */
export function countClarifyingQuestions(
  history: { role: string; text: string }[],
): number {
  let n = 0;
  for (const m of history) {
    if (m.role !== "assistant") continue;
    const t = (m.text || "").trim();
    if (!t || t.startsWith("[reminder]") || t.startsWith("[news-alert]")) {
      continue;
    }
    if (/\?/.test(t)) n += 1;
  }
  return n;
}

/** Forced handoff when clarifying-Q budget is spent. */
export function clarifyingLimitReply(lang: string): string {
  if (lang === "pl") {
    return "Nie kontynuuję długiego czatu tutaj. Proszę napisać bezpośrednio do Pawła (@pstasinski) — odpowie merytorycznie.";
  }
  if (lang === "en") {
    return "I can't continue a long chat here. Please message Paweł directly (@pstasinski) — he'll take it from there.";
  }
  return "Дальше длинный чат здесь не веду. Напишите Павлу напрямую (@pstasinski) — он ответит по сути.";
}

export function buildUserPrompt(params: {
  knowledge: string;
  customerName?: string;
  message: string;
  hasHistory?: boolean;
  researchContext?: string;
  /** True when SearX / web hits were injected — require unverified-web disclaimer. */
  usedWeb?: boolean;
  /** Exact localized disclaimer line — must open the reply when usedWeb. */
  webDisclaimerText?: string;
  /** How many assistant clarifying questions already in the thread. */
  clarifyingQuestionsSoFar?: number;
  /** Recent assistant replies — must not be echoed (even paraphrased). */
  recentAssistantReplies?: string[];
  /** Extra hard anti-echo note on regenerate pass. */
  antiEchoRetry?: boolean;
}) {
  const who = params.customerName ? `Клиент: ${params.customerName}\n` : "";
  const hist = params.hasHistory
    ? "История диалога УЖЕ выше (роли user/assistant). Продолжай с того места: не эхо-копируй свои прошлые формулировки/пункты/CTA; не рекапь клиента; только новый факт или следующий шаг.\n"
    : "";
  const priors = (params.recentAssistantReplies ?? [])
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 8);
  const antiEcho = priors.length
    ? `\nАНТИ-ЭХО: эти недавние ответы ассистента УЖЕ отправлены — запрещено повторять их смысл, формулировки, оффер, CTA, ссылки (даже парафразом):\n${priors
        .map((t, i) => `${i + 1}. ${t.slice(0, 320)}`)
        .join("\n")}\nТолько новый факт / новый угол / конкретный следующий шаг. Без воды и без повторного питча.\n`
    : "";
  const retry = params.antiEchoRetry
    ? "\nПРЕДЫДУЩИЙ ЧЕРНОВИК ОТКЛОНЁН как эхо. Напиши принципиально другой ответ: без рекапа, без того же оффера, без тех же вопросов/CTA/ссылок. Если добавить нечего — одна короткая фраза + уточнение по сути.\n"
    : "";
  const research = params.researchContext?.trim()
    ? `\nДоп. публичный контекст (без секретов). Блок [web] = непроверенный интернет — обязательный дисклеймер в ответе:\n${params.researchContext.trim()}\n`
    : "";
  const disc = params.webDisclaimerText?.trim();
  const webRule =
    params.usedWeb && disc
      ? `\nВ контексте есть [web]: начни ответ ТОЧНО этой фразой (язык клиента уже определён):\n«${disc}»\nНе гарантия компании. Не переводи и не заменяй на другой язык.\n`
      : params.usedWeb
        ? "\nВ контексте есть [web]: начни с дисклеймера на языке клиента (не EN, если клиент не на EN). Не гарантия компании.\n"
        : "";
  const qCount = params.clarifyingQuestionsSoFar ?? 0;
  const qRule =
    qCount >= MAX_CLARIFYING_QUESTIONS
      ? `\nЛимит уточняющих вопросов (${MAX_CLARIFYING_QUESTIONS}) исчерпан. НЕ задавай новый вопрос. Скажи, что длинный чат не продолжаешь, направь к Павлу (@pstasinski). HANDOFF: yes.\n`
      : qCount >= MAX_CLARIFYING_QUESTIONS - 1
        ? `\nУже ${qCount} уточняющих вопросов ассистента в треде (лимит ${MAX_CLARIFYING_QUESTIONS}). Можно один короткий ответ; новый вопрос — только если критично, иначе веди к Павлу / созвону.\n`
        : `\nУточняющих вопросов ассистента в треде: ${qCount}/${MAX_CLARIFYING_QUESTIONS}. Максимум один новый вопрос в этом ответе. Без рекламного монолога.\n`;
  return `${who}База знаний Bober AI Systems (справка — не копируй в чат целиком):\n${params.knowledge}\n${research}${webRule}${qRule}${antiEcho}${retry}\n---\n${hist}Сообщение клиента:\n${params.message}\n\nОтветь по делу: солдатски + продажнее (2–4 предложения ок), без «одной фразой», без эха истории, без шапки-питча. В конце обязательно HANDOFF: yes|no и BOOKING: yes|no`;
}

/** Short non-repeating fallback when regenerate still echoes. */
export function antiEchoFallbackReply(lang: string): string {
  if (lang === "pl") {
    return "Już odpisałem wyżej — doprecyzuj pytanie.";
  }
  if (lang === "en") {
    return "Already answered above — please clarify your question.";
  }
  return "Уже ответил выше — уточните вопрос.";
}

/**
 * Drop recurring CTAs / stock lines already present in recent assistant replies.
 * Keeps conversational substance; removes water that tends to reappear every turn.
 */
export function stripRecurringBoilerplate(
  text: string,
  priors: string[],
): string {
  if (!text.trim() || !priors.length) return text;
  const priorBlob = priors.join("\n").toLowerCase();
  let out = text;

  const stock: { re: RegExp; needInPrior: RegExp }[] = [
    {
      re: /https?:\/\/(?:www\.)?bober-systems\.ru\/?[^\s]*/gi,
      needInPrior: /bober-systems\.ru/i,
    },
    {
      re: /[^.!?\n]*(?:созвон(?:иться|имся)? с\s+павлом|напишите\s+павлу\s+напрямую|umówimy\s+krótką|book a short call with pawe[łl])[^.!?\n]*[.!?…]?/gi,
      needInPrior: /созвон|павлу|pawe[łl]|pstasinski|umówimy|short call/i,
    },
    {
      re: /[^.!?\n]*(?:пилот\s+от\s*300|от\s*300\s*000\s*₽|от\s*500\s*000\s*₽)[^.!?\n]*[.!?…]?/gi,
      needInPrior: /пилот\s+от|300\s*000|500\s*000/i,
    },
  ];

  for (const { re, needInPrior } of stock) {
    if (!needInPrior.test(priorBlob)) continue;
    out = out.replace(re, " ");
  }

  return out
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/  +/g, " ")
    .trim();
}

export function buildReminderUserPrompt(params: {
  knowledge: string;
  customerName?: string;
  lang: string;
  topicHint: string;
  newsHint?: string;
}) {
  const who = params.customerName ? `Клиент: ${params.customerName}\n` : "";
  const news = params.newsHint?.trim()
    ? `\nСвежий источник (используй только если стыкуется с болью клиента; не пересказывай статью):\n${params.newsHint.trim()}\n`
    : "";
  const newsRule = params.newsHint?.trim()
    ? "\nЭто news-tip: совет обязан ссылаться на конкретный запрос/систему/боль из истории клиента. Без общих проповедей про «узкое место».\n"
    : "";
  return `${who}Язык ответа: ${params.lang} (пиши только на этом языке)
Тема треда / контекст:\n${params.topicHint}\n${news}${newsRule}\nБаза знаний (фрагмент):\n${params.knowledge.slice(0, 3500)}\n\nНапиши короткий конкретный совет по их теме (не «как дела?», не generic bottleneck).`;
}

export function stripHandoff(reply: string): {
  text: string;
  handoff: boolean;
  booking: boolean;
} {
  const handoff = /HANDOFF:\s*yes/i.test(reply);
  const booking = /BOOKING:\s*yes/i.test(reply);
  const text = reply
    .replace(/\n?HANDOFF:\s*(yes|no)\s*$/im, "")
    .replace(/HANDOFF:\s*(yes|no)/gi, "")
    .replace(/\n?BOOKING:\s*(yes|no)\s*$/im, "")
    .replace(/BOOKING:\s*(yes|no)/gi, "")
    .trim();
  return { text, handoff, booking };
}
