import type { PortfolioItem } from "@/lib/profile";

/** Localized portfolio copy. Missing fields fall back to base (RU) item. */
export type PortfolioLocaleCopy = Partial<
  Pick<
    PortfolioItem,
    | "title"
    | "subtitle"
    | "seoTitle"
    | "category"
    | "description"
    | "solution"
    | "result"
    | "metric"
    | "metricMethod"
    | "role"
    | "scope"
    | "duration"
    | "architecture"
    | "processSteps"
    | "productionNotes"
    | "whyCustom"
    | "priceLabel"
    | "imageBadge"
    | "imageAlt"
    | "imageCaption"
  >
>;

export type PortfolioEnCopy = PortfolioLocaleCopy;

/** English copy (legacy EN path). */
export const PORTFOLIO_EN: Record<string, PortfolioEnCopy> = {
  "yandex-telemost-agent": {
    title: "Yandex Telemost Agent — AI for meetings and sales",
    category: "Artificial intelligence",
    metric: "Automatic meeting summaries in CRM",
    priceLabel: "from €3,000",
    description:
      "An AI assistant for meetings and sales that captures key agreements during the call, transcribes the conversation and helps teams keep important client details.",
    solution:
      "The system connects to working tools, drafts follow-up emails, updates CRM and creates tasks after the meeting without manual copy-paste.",
    result:
      "Teams save time, process meeting outcomes faster, retain agreements and improve client follow-through and sales quality.",
  },
  "kaspersky-ai-assistant": {
    title: "Kaspersky product RAG bot for 1C staff",
    category: "Artificial intelligence",
    metric: "up to −50% repeat product questions",
    description:
      "1C staff need fast answers on Kaspersky products: licenses, compatibility, configurations. Manual doc search took time and spawned the same repeat questions.",
    solution:
      "A RAG bot over Kaspersky product documentation for 1C staff and users: source-grounded chat answers and escalation to an expert when model confidence is low.",
    result:
      "1C staff get product answers faster, ask fewer repeat questions and spend less time on long manual knowledge-base searches.",
  },
  "kp-llm-automation": {
    title: "Commercial proposal automation",
    category: "Automation",
    metric: "45 min → 2–5 min per proposal",
    priceLabel: "from €3,000",
    description:
      "Preparing commercial proposals took about 45 minutes: managers searched prices and SKUs in the catalog by hand.",
    solution:
      "Automation: PDF → catalog matching → match statuses → DOCX/PDF assembly → CRM write-back.",
    result: "A typical proposal is assembled in 2–5 minutes instead of ~45.",
  },
};

/** Oʻzbek (Latin) portfolio copy — UZS prices, UZ-market framing. */
export const PORTFOLIO_UZ: Record<string, PortfolioLocaleCopy> = {
  "kaspersky-ai-assistant": {
    title: "Kaspersky mahsulotlari boʻyicha RAG-bot — 1С ekotizimi xodimlari uchun",
    category: "Sunʼiy intellekt",
    metric: "takroriy mahsulot savollari −50% gacha",
    metricMethod: "1С distributor xodimlari pilot guruhi, buyurtmachi ichki bahosi",
    role: "Kaspersky mahsulotlari boʻyicha RAG-yordamchi ishlab chiqishda ishtirok",
    scope: "Kaspersky hujjatlari boʻyicha RAG, chat javoblari, past ishonchda eskalatsiya",
    duration: "Mahsulot konturi doirasida pilot va iteratsiyalar",
    architecture: "Yopiq bilim bazasida LLM + RAG — korporativ tizimlarga cheksiz kirishsiz",
    description:
      "1С ekotizimi xodimlariga Kaspersky mahsulotlari boʻyicha tez javob kerak: litsenziyalar, moslik, konfiguratsiyalar. Qoʻlda qidiruv vaqt oldi va bir xil savollarni takrorladi.",
    solution:
      "Kaspersky mahsulot hujjatlari boʻyicha RAG-bot: manbaga tayanib chat javoblari va past ishonchda ekspertga eskalatsiya.",
    result:
      "Xodimlar tezroq javob oladi, kamroq takroriy savol beradi va bilim bazasida uzoq qoʻlda qidirishni kamaytiradi.",
    priceLabel: "50 000 000 soʻmdan",
  },
  "support-knowledge-base": {
    title: "Qoʻllab-quvvatlash bilim bazasi: takroriy savollar −50%",
    category: "Sunʼiy intellekt",
    metric: "takroriy savollar −50% gacha",
    description:
      "Qoʻllab-quvvatlash bir xil savollarga javob berishga soatlar sarflardi. Reglamentlar papkalar va PDF larda tarqalgan.",
    solution:
      "Manba havolasi bilan RAG bilim bazasi, chat va eskalatsiya. CRM / portal integratsiya.",
    result: "Birinchi liniya tezroq javob beradi, ekspertlar murakkab holatlarga eʼtibor beradi.",
    priceLabel: "50 000 000 soʻmdan",
  },
  "elia-suite": {
    title: "ELIA Suite — izolyatsiyalangan workspace lar",
    category: "Avtomatlashtirish",
    metric: "quote→buyurtma konversiyasi +32%",
    metricMethod: "Ishga tushirishdan keyingi dastlabki 4 oy, buyurtmachi maʼlumotlari",
    role: "Workspace va quote avtomatlashtirish loyihasi",
    scope: "Izolyatsiyalangan workspace, CRM-workflow, quote PDF/XLSX, 2FA va audit",
    duration: "Pilot va 15 workspace ga kengaytirish",
    architecture: "Rolli workspace + CRM workflow + AI hujjat yigʻish — maʼlumotlar aralashmasdan",
    description:
      "KP tayyorlash ~45 daqiqa oldi. Hamkorlar ochiq servislar orqali ishlardi — maʼlumot izolyatsiyasisiz.",
    solution:
      "CRM → kelishuv workflow → AI bilan quote PDF/XLSX yigʻish. Har rol uchun alohida workspace, 2FA va audit.",
    result:
      "15 workspace, maʼlumotlar aralashmasdan. Quote→buyurtma +32%. Takrorlanuvchi hajmda ~4 oyda oʻzini oqlash.",
    priceLabel: "50 000 000 soʻmdan",
  },
  "kp-llm-automation": {
    title: "Tijorat takliflarini avtomatlashtirish",
    category: "Avtomatlashtirish",
    metric: "KP uchun 45 daq → 2–5 daq",
    metricMethod: "Buyurtmachi tipik PDF soʻrovlari boʻyicha pilot jarayoni",
    role: "KP generatsiya konturi arxitekturasi va joriy etish",
    scope: "PDF soʻrov → katalog moslashtirish → exact/analog/not found → DOCX/PDF → CRM",
    duration: "Sanoat ishga tushirishgacha 4–8 hafta",
    architecture: "LLM faqat soʻrov tahlili; narx va SKU — MySQL/CRM katalogidan",
    description:
      "KP tayyorlash ~45 daqiqa: menejerlar katalogda narx va SKU qidirardi, Word/PDF yigʻardi.",
    solution:
      "Avtomatlashtirish: PDF → katalog → moslik holatlari → DOCX/PDF → CRM. Narxlarni model uydirmaydi.",
    result: "Tipik KP 2–5 daqiqada. Narx va artikullar faqat katalogdan.",
    priceLabel: "30 000 000 soʻmdan",
  },
  "invoice-processing-pipeline": {
    title: "Hisob-fakturalarni tanish va 1С ga yuklash",
    subtitle: "Kiruvchi hisoblar OCR pipeline → tekshiruv → 1С hujjat",
    seoTitle: "Hujjatlarni 1С ga yuklash: pochtadan OCR — qoʻlda kiritishsiz",
    category: "Avtomatlashtirish",
    metric: "50 hisob ~10 daqiqada (oldingi ~4 soat)",
    metricMethod: "Buxgalteriya kiruvchi pochta oqimi boʻyicha pilot oʻlchovi",
    role: "OCR → 1С kontur arxitekturasi va joriy etish",
    scope: "Pochta avtoqabul, OCR, maydon ajratish, tekshiruv, 1С hujjat, xato jurnali",
    duration: "Pilot 2–4 hafta; sanoat kontur odatda 4–8 hafta",
    architecture: "Pochta/fayllar → OCR → rekvizitlar → validatsiya → 1С API → retry va alertlar",
    processSteps: [
      "Hisob pochtaga yoki skan papkasiga keladi",
      "Kontur ilovani oladi (PDF/rasm)",
      "OCR va maydonlarni ajratish",
      "Kontragent/buyurtma bilan tekshiruv",
      "1С da hujjat yaratish yoki yangilash",
      "Log: muvaffaqiyat / qoʻlda tekshiruv / xato + alert",
    ],
    productionNotes: [
      "Idempotentlik: bir xil faylni qayta ishlash dublikat yaratmaydi",
      "1С mavjud boʻlmasa navbat va retry",
      "Past OCR ishonchida qoʻlda review",
      "Buxgalteriya va audit uchun operatsiyalar jurnali",
      "Hisob maʼlumotlari kelishuvsiz public LLM ga ketmaydi",
    ],
    whyCustom:
      "Tayyor «OCR bulutda» koʻpincha buyurtmachi 1С konturi va xavfsizlik siyosatiga ulanmaydi. Pipeline ni sizning almashinuv va huquqlaringiz atrofida yigʻamiz.",
    description:
      "Buxgalteriya kuni 50+ hisobni email orqali olardi. Operatorlar rekvizitlarni 1С ga qoʻlda kiritardi.",
    solution:
      "Pochta → OCR → maydonlar → tekshiruv → 1С hujjat. AI faqat matn tahlili kerak boʻlganda.",
    result: "50 hisob ~10 daqiqada, kiritish xatolari −90% (pilot).",
    priceLabel: "50 000 000 soʻmdan",
  },
  "crm-1c-sync": {
    title: "CRM ↔ 1С: yagona haqiqat manbai",
    category: "Avtomatlashtirish",
    metric: "Qoʻlda nusxa koʻchirishsiz sinxron",
    description:
      "CRM va 1С da turli summalar va holatlar. Menejerlar kun boʻyi maʼlumot koʻchirardi.",
    solution:
      "Ikki tomonlama sync: bitimlar, buyurtmalar, kontragentlar. Retry, monitoring, konflikt qoidalari.",
    result: "Yagona raqamlar, tezroq yopilish, kamroq xato.",
    priceLabel: "50 000 000 soʻmdan",
  },
  "yandex-telemost-agent": {
    title: "Yandex Telemost Agent — uchrashuv va savdo uchun AI",
    category: "Sunʼiy intellekt",
    metric: "Uchrashuv yakunlari avtomatik CRM da",
    description:
      "Uchrashuvdagi kelishuvlar yoʻqolardi. Menejerlar qoʻlda yozib, CRM ni kech yangilardi.",
    solution:
      "AI uchrashuvni qayd etadi, samari yozadi, CRM va vazifalarni yangilaydi — qoʻlda nusxa koʻchirmasiz.",
    result: "Tezroq follow-up, unutilgan kelishuvlar kamayadi.",
    priceLabel: "30 000 000 soʻmdan",
  },
  "lead-generation": {
    title: "GTM Flow — reklama va messenjerlardan lidlar",
    category: "Sunʼiy intellekt",
    metric: "Yoʻqolgan lidsiz yagona voronka",
    description:
      "Arizalar Google, Telegram, sayt va mahalliy kanallarga tarqaladi. Mijozlar sovib ketadi, menejerlar qayta qoʻngʻiroqni unutadi.",
    solution:
      "Yagona lid lenti, AI scoring, yoʻqolgan arizalarni qaytarish. Bitta buyruq — kvalifikatsiya va follow-up.",
    result: "Kamroq yoʻqolgan lid, tezroq bitim. Dashboard: kiruvchi → lid → mijoz.",
    priceLabel: "30 000 000 soʻmdan",
  },
  "amocrm-website-integration": {
    title: "Sayt → amoCRM: qoʻlda ishlovsiz lidlar",
    category: "Avtomatlashtirish",
    metric: "Formadan CRM gacha avto",
    description: "Sayt formalari email ga tushardi — CRM ga qoʻlda koʻchirilardi.",
    solution: "Forma → amoCRM bitim, maydonlar, vazifa va bildirishnoma.",
    result: "Lidlar yoʻqolmaydi, reaksiya vaqti qisqaradi.",
    priceLabel: "15 000 000 soʻmdan",
  },
  "bitrix24-erp-sync": {
    title: "Bitrix24 + 1С: bitim va buyurtmalar sinxroni",
    category: "Avtomatlashtirish",
    metric: "Bitim ↔ buyurtma avto",
    description: "Bitrix24 va 1С qoʻlda bogʻlangan — holatlar kechikardi.",
    solution: "REST sync: bitimlar, tovarlar, holatlar, xato jurnali.",
    result: "Operatsion kechikishlar kamayadi, hisobotlar ishonchli.",
    priceLabel: "50 000 000 soʻmdan",
  },
  "contract-approval-workflow": {
    title: "Shartnomalar kelishuvi: kunlar → soatlar",
    category: "Avtomatlashtirish",
    metric: "Kelishuv tsikli qisqaradi",
    description: "Shartnomalar email da aylanardi — kimda ekanligi nomaʼlum.",
    solution: "Raqamli marshrut, rollar, eslatmalar, yakuniy PDF arxiv.",
    result: "Shaffof holat, tezroq imzo.",
    priceLabel: "30 000 000 soʻmdan",
  },
  "ocr-text-extraction": {
    title: "OCR — hujjatlardan matn ajratish",
    category: "Avtomatlashtirish",
    metric: "Skan → tuzilgan maydonlar",
    description: "Skanlar qoʻlda qayta terilardi.",
    solution: "OCR pipeline, maydon validatsiyasi, eksport.",
    result: "Tezroq kiritish, kamroq xato.",
    priceLabel: "30 000 000 soʻmdan",
  },
  "employee-onboarding-portal": {
    title: "Xodimlar onboarding: 2 hafta (oldingi 2 oy)",
    category: "Sunʼiy intellekt",
    description:
      "Yangi xodimlar oylar davomida bir xil savollarni HR ga berardi. Reglamentlar tarqalgan edi.",
    solution: "Chek-listlar, bilim bazasi va AI-yordamchi bilan onboarding portal.",
    result: "2 haftada mustaqil ish, HR yuki −40%.",
    priceLabel: "30 000 000 soʻmdan",
  },
  "crm-telegram-sheets": {
    title: "CRM + Telegram-bot + Google Sheets — B2B",
    category: "Avtomatlashtirish",
    metric: "Ariza → CRM avto",
    description: "Lidlar Telegram va jadvallarda aralashib ketardi.",
    solution: "Bot → jadval → CRM bitta oqimda.",
    result: "Yagona voronka, kamroq yoʻqotish.",
    priceLabel: "15 000 000 soʻmdan",
  },
  "interior-design-bot": {
    title: "Interyer dizaynerlari uchun AI-bot",
    category: "Sunʼiy intellekt",
    description: "Mijoz soʻrovlari chatda tartibsiz kelardi.",
    solution: "Brief yigʻish, katalog moslashtirish, CRM ga yozuv.",
    result: "Tezroq javob, sifatli brief.",
    priceLabel: "30 000 000 soʻmdan",
  },
  "social-media-analytics": {
    title: "Ijtimoiy media tahlili real vaqtda",
    category: "Sunʼiy intellekt",
    description: "Eslatmalar va mentionalar kechikib yigʻilardi.",
    solution: "Monitoring, klassifikatsiya, alertlar.",
    result: "Tezroq reaksiya, bitta dashboard.",
    priceLabel: "30 000 000 soʻmdan",
  },
  /** RU marketplaces — kept for direct URL, framed generically for UZ. */
  "bitrix24-kwork-crm": {
    title: "Marketplace buyurtmalari → Bitrix24 voronkasi",
    subtitle: "Marketplace → CRM maxsus kontur — tayyor konnektorga bogʻliqsiz",
    seoTitle: "Marketplace ↔ Bitrix24 CRM maxsus integratsiya",
    category: "IT va ishlab chiqish",
    metric: "Marketplace buyurtmalari CRM kanbanda",
    description:
      "Freelance/marketplace buyurtmalari CRM ga qoʻlda koʻchirilardi. Oʻzbekiston bozori uchun xuddi shu kontur mahalliy maydonchalarga moslashtiriladi.",
    solution:
      "Buyurtma ushlash → mijoz/xizmat map → Bitrix24 da bitim upsert → summa va holat.",
    result: "Qoʻlda koʻchirishsiz voronka; kontur mahalliy marketplace larga moslanadi.",
    priceLabel: "30 000 000 soʻmdan",
  },
  "wildberries-independent-sales-channel": {
    title: "Marketplace dan mustaqil savdo kanali",
    category: "Avtomatlashtirish",
    metric: "Parallel kanal — bitta katalog",
    description:
      "Bitta marketplace ga bogʻlanish xavfi. Oʻzbekiston uchun — Uzum va boshqa kanallar bilan parallel kontur mantiqi.",
    solution: "Katalog, buyurtmalar va CRM — mustaqil savdo kanali sifatida.",
    result: "Kanal diversifikatsiyasi, operatsion nazorat.",
    priceLabel: "50 000 000 soʻmdan",
  },
};

const SKILL_UZ: Record<string, string> = {
  Автоматизация: "Avtomatlashtirish",
  "Интеграция модели ИИ": "AI model integratsiyasi",
  "Искусственный интеллект": "Sunʼiy intellekt",
  Интеграции: "Integratsiyalar",
};

const SKILL_EN: Record<string, string> = {
  Автоматизация: "Automation",
  "Интеграция модели ИИ": "AI model integration",
  "Искусственный интеллект": "Artificial intelligence",
};

function sanitizePriceLabel(label: string | undefined, locale: string): string | undefined {
  if (!label) return undefined;
  if (locale === "uz") {
    if (/[₽руб]/i.test(label)) return undefined;
    return label;
  }
  if (locale === "en") {
    if (/[₽руб]/i.test(label) || /[А-Яа-яЁё]/.test(label)) return undefined;
  }
  return label;
}

function localizeSkills(skills: string[], locale: string): string[] {
  const map = locale === "uz" ? SKILL_UZ : locale === "en" ? SKILL_EN : null;
  if (!map) return skills;
  return skills.map((skill) => map[skill] ?? skill);
}

export function hasPortfolioEnglish(slug: string): boolean {
  const copy = PORTFOLIO_EN[slug];
  return Boolean(copy?.title && copy.description && copy.solution && copy.result);
}

export function hasPortfolioUz(slug: string): boolean {
  const copy = PORTFOLIO_UZ[slug];
  return Boolean(copy?.title && copy.description && copy.solution && copy.result);
}

/** RU-centric marketplaces — hide from UZ marketing listings. */
export const UZ_EXCLUDED_PORTFOLIO_SLUGS = new Set([
  "bitrix24-kwork-crm",
  "wildberries-independent-sales-channel",
]);

export function localizePortfolioItem(item: PortfolioItem, locale: string): PortfolioItem {
  const copy =
    locale === "uz" ? PORTFOLIO_UZ[item.slug] : locale === "en" ? PORTFOLIO_EN[item.slug] : undefined;
  if (!copy) return item;
  const merged: PortfolioItem = {
    ...item,
    ...copy,
    skills: localizeSkills(item.skills ?? [], locale),
    stack: item.stack,
    image: item.image,
    slug: item.slug,
    id: item.id,
    featured: item.featured,
    segment: item.segment,
  };
  merged.priceLabel = sanitizePriceLabel(merged.priceLabel, locale) ?? copy.priceLabel;
  return merged;
}
