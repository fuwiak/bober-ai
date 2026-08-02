/**
 * Missing UZ overlays that were falling back to RU via deepMerge.
 * Prices: 150k₽→15M soʻm, 300k→30M, 500k→50M (same scale as uz.ts packages).
 */
export const uzExtra = {
  sections: {
    philosophy: "Falsafa",
    whyUs: "Farq",
    problems: "Muammolar",
    audience: "Kimlar uchun",
    engagement: "Ish formatlari",
    solutions: "Nima joriy etamiz",
    process: "Qanday ishlaymiz",
    about: "Kompaniya haqida",
    verified: "Sharhlar",
    portfolio: "Keyslar",
    cta: "Hamkorlik",
    contact: "Aloqa",
  },
  services: {
    title: "Nima joriy etamiz",
    subtitle:
      "Kompaniya operatsiyalarida AI — oʻlchanadigan natija beradigan joyda: vaqt tejash, xarajatlarni kamaytirish, oʻtkazuvchanlikni oshirish.",
    details: "Batafsil",
    quote: "Smeta soʻrash",
    days: "kun",
    discussCta: "Loyihani muhokama qilish",
    implementationAreas: [
      {
        badge: "Qoʻllab-quvvatlash",
        title: "Mijozlarga xizmat",
        description:
          "AI mijozlarga 24/7 javob beradi, murakkab holatlarni eskalatsiya qiladi, CRM ga yozadi — arizalar yoʻqolmaydi.",
        items: ["Arizalarni triaj", "Bilim bazasi boʻyicha javoblar", "CRM ga yozuv"],
        layout: "wide",
        slug: "enterprise-ai-assistant",
        href: "/services/ai-agent",
      },
      {
        badge: "CRM",
        title: "Bitrix24 · amoCRM",
        description:
          "CRM joriy etish va avtomatlashtirish: Bitrix24 (BitrixGPT ustidagi AI qatlam) va amoCRM — 1С, telefoniya, hujjatlar, voronkalar; portal va integratsiyalar sizda qoladi.",
        items: ["CRM joriy etish", "1С / ERP sinxronizatsiya", "Messenjerlar va webhooks"],
        layout: "large",
        slug: "business-process-automation",
        href: "/services/crm-integration",
      },
      {
        badge: "Hujjatlar",
        title: "Hujjatlarni qayta ishlash",
        description:
          "AI hujjatlardan maʼlumot ajratadi, kelishuvlarni marshrutlaydi — CRM/ERP ga qoʻlda kiritishsiz.",
        items: ["Maydonlarni tanish va ajratish", "Kelishuv marshruti", "CRM / 1С integratsiya"],
        layout: "default",
        slug: "business-process-automation",
        href: "/services/document-processing",
      },
      {
        badge: "Savdo",
        title: "Savdoni avtomatlashtirish",
        description:
          "KP soatlar oʻrniga daqiqalarda, lidlarni marshrutlash, CRM da follow-up — tezroq voronka.",
        items: ["CRM dan KP generatsiya", "Lidlar kvalifikatsiyasi va marshrutlash", "Avtomatik follow-up"],
        layout: "default",
        slug: "sales-ai-agent",
        href: "/services/sales-ai-agent",
      },
      {
        badge: "Telefoniya · CRM",
        title: "Savdo boʻlimi AI konturi",
        description:
          "Qoʻngʻiroqlar, yozishmalar, Bitrix24/amoCRM va avtomatik keyingi harakatlar — alohida botlar emas, bitta mahsulot.",
        items: [
          "Lidlar kvalifikatsiyasi va qoʻngʻiroq samarilari",
          "CRM da avtovazifalar va follow-up",
          "Sifat nazorati va oʻtkazib yuborilgan bitimlar",
        ],
        layout: "large",
        featured: true,
        slug: "ai-sales-loop",
        href: "/services/ai-sales-loop",
      },
      {
        badge: "Agent · 1С · CRM",
        title: "Korporativ AI-agent: 1С va CRM",
        description:
          "Vendor oyna beradi. Biz agentni landshaftga joylashtiramiz: rollar, 1С, istisnolar, HITL va KPI.",
        items: [
          "Jarayon va huquqlar xaritasi",
          "Firma skills va legacy konektorlar",
          "Yandex AI Studio vs private/on-prem",
        ],
        layout: "large",
        featured: true,
        slug: "corporate-ai-agent-1c-crm",
        href: "/services/corporate-ai-agent-1c-crm",
      },
      {
        badge: "Uchrashuv · CRM",
        title: "AI Meeting-to-CRM",
        description:
          "VKS samarisi standart. Qiymat — uchrashuvdan keyin: qarorlar → vazifalar → CRM. Telemost; MTS Link, SaluteJazz, IVA360 ga moslashadi.",
        items: [
          "Telemost / MTS Link / SaluteJazz / IVA360 transkripti",
          "Kelishuvlar va vazifalar Bitrix24 / amoCRM da",
          "Kritik yozuvdan oldin odam tasdiqi",
        ],
        layout: "large",
        featured: true,
        slug: "ai-meeting-crm",
        href: "/services/ai-meeting-crm",
      },
      {
        badge: "HR",
        title: "HR va onboarding",
        description: "AI xodimlarga reglamentlar va imtiyozlar boʻyicha javob beradi — HR yukini kamaytiradi.",
        items: ["Onboarding chek-listlari", "Siyosat va imtiyozlar boʻyicha javoblar", "HR tizimlari bilan integratsiya"],
        layout: "compact",
        slug: "enterprise-ai-assistant",
        href: "/services/knowledge-base",
      },
      {
        badge: "Jamoa",
        title: "Xodimlar yordamchilari",
        description: "AI hujjatlar va reglamentlaringizda qidiradi — manba havolasi bilan javoblar.",
        items: ["Bilim bazasi boʻyicha qidiruv", "Reglamentlar yordamchisi", "Slack / Telegram integratsiya"],
        layout: "compact",
        slug: "enterprise-ai-assistant",
        href: "/services/rag",
      },
    ],
    items: [
      {
        slug: "business-process-automation",
        title: "Biznes-jarayonlarni avtomatlashtirish",
        description: "Audit, CRM/1С integratsiyalar, avtomatlashtirilgan zanjirlar — qoʻlda rutinasiz.",
        salesNotes: "50 000 000 soʻmdan",
        deliveryDays: 21,
      },
      {
        slug: "sales-ai-agent",
        title: "Savdo boʻlimini avtomatlashtirish",
        description: "Lidlar, CRM, KP, follow-up — PDF soatlar emas, daqiqalarda.",
        salesNotes: "50 000 000 soʻmdan",
        deliveryDays: 14,
      },
      {
        slug: "business-process-automation",
        title: "Hujjat aylanishini avtomatlashtirish",
        description: "OCR, kelishuvlar, tasniflash — AI faqat afzallik beradigan joyda.",
        salesNotes: "50 000 000 soʻmdan",
        deliveryDays: 21,
      },
      {
        slug: "enterprise-ai-assistant",
        title: "Korporativ bilim bazasi",
        description: "Hujjatlar boʻyicha qidiruv, xodimlar va mijozlarga bilim bazangizdan javoblar.",
        salesNotes: "50 000 000 soʻmdan",
        deliveryDays: 28,
      },
      {
        slug: "ai-discovery-roadmap",
        title: "Avtomatlashtirish konsultatsiyasi",
        description: "Jarayon tahlili, ROI hisobi, texnologiya tanlash, joriy etish rejasi.",
        salesNotes: "15 000 000 soʻmdan",
        deliveryDays: 10,
      },
      {
        slug: "enterprise-ai-assistant",
        title: "AI joriy etish",
        description: "AI-agentlar va CRM integratsiyalari — ChatGPT dagi demo emas, sanoat ishga tushirish.",
        salesNotes: "50 000 000 soʻmdan",
        deliveryDays: 28,
      },
    ],
  },
  whyTrust: {
    label: "Nega biz",
    title: "Joriy etishni nima uchun bizga ishonish mumkin",
    items: [
      "Asoschi Pavel Stasinskiy arxitekturani boshqaradi va natija uchun shaxsan javob beradi — delivery ga mutaxassislar jamoasi ulanadi",
      "Bitta modelga bogʻlanmaymiz — jarayon, maʼlumot va infratuzilmaga mos yechim tanlaymiz",
      "Mavjud tizimlar bilan ishlaymiz — Bitrix24, amoCRM, 1С, pochta, messenjerlar, sizning API",
      "Ishlab chiqishdan oldin chegaralarni belgilaymiz — hajm, narx, xavflar, qabul mezonlari",
      "Yechimni kompaniyaga topshiramiz — kod, koʻrsatmalar, kirishlar, hujjatlar",
    ],
  },
  founderManifesto: {
    label: "Asoschi",
    name: "Pavel Stasinskiy",
    role: "AI-arxitektor · technical AI partner · AI va avtomatlashtirish boʻyicha fractional CTO",
    quote:
      "Bober AI Systems — korporativ AI-integrator. Men loyiha arxitekturasini boshqaraman va natija uchun javob beraman; dasturchilar va infratuzilma mutaxassislari vazifa boʻyicha ulanadi.",
    goal: "Faqat KP va CRM avtomatlashtirish emas — texnologiya tanlash, jarayon tahlili va production kontur uchun masʼuliyat.",
    stats: [
      { value: "12+", label: "joriy etish" },
      { value: "7 yil", label: "AI bilan ish" },
      { value: "10+", label: "yillik dasturlash" },
      { value: "NDA / ON-PREM", label: "soʻrov boʻyicha" },
    ],
  },
  timeline: {
    label: "Muddatlar",
    title: "Natija qachon paydo boʻladi",
    items: [
      { period: "1–2 hafta", text: "audit, jarayon tahlili va maʼlumotlarni tayyorlash" },
      { period: "3–6 hafta", text: "ishchi pilot" },
      { period: "6–12 hafta", text: "integratsiya va production ishga tushirish" },
      { period: "Ishga tushirishdan keyin", text: "natijalarni oʻlchash va optimallashtirish" },
    ],
    note: "Aniq muddat model hajmiga emas, maʼlumot sifati, integratsiyalar soni va jarayondagi istisnolar soniga bogʻliq.",
  },
  exclusions: {
    label: "Olmaymiz",
    title: "Qaysi vazifalarni olmaymiz",
    items: [
      "Production yoʻlisiz «belgi uchun» demo",
      "Qabul uchun jarayon va maʼlumotlarga kirishsiz loyihalar",
      "Oʻlchanadigan stsenarisiz «AI hamma narsani hal qiladi» vaʼdalari",
      "Hujjatlar va egasisiz begona kodni qoʻllab-quvvatlash",
    ],
  },
  whereAiNotNeeded: {
    label: "Chegaralar",
    title: "AI qayerda kerak emas",
    subtitle: "Avval oddiy avtomatlashtirish — AI faqat qoidalar bilan yopib boʻlmaydigan joyda.",
    items: [
      "Toʻgʻridan-toʻgʻri SQL almashinuvi va maʼlumotnomalar sinxronizatsiyasi",
      "CRM qoidalari: bosqichlar, robotlar, tayinlashlar",
      "Erkin matn tahlilisiz 1С dagi tipik operatsiyalar",
      "RPA / workflow — qadamlar deterministik boʻlsa",
    ],
  },
  architecturePlain: {
    label: "Arxitektura",
    title: "Sehrsiz arxitektura",
    subtitle: "AI — konturdagi bitta qatlam, «hammaga kirishli qora quti» emas.",
    note: "AI kompaniya tizimlariga cheksiz kirish olmaydi: faqat kerakli manbalar, jurnallar va yozish qoidalari.",
    steps: [
      "Kirish kanali: PDF, pochta, CRM, forma",
      "Qoidalar va katalog: narxlar, SKU, huquqlar",
      "AI qatlami: tahlil, tasniflash, qoralama",
      "Tekshiruvlar va odamga eskalatsiya",
      "CRM / hujjat / bildirishnomaga yozuv",
    ],
  },
  auditSample: {
    label: "Audit",
    title: "AI-audit fragmenti — 15 000 000 soʻmdan paket nima beradi",
    subtitle:
      "Hisobot miniatyurasi: jarayon xaritasi, yoʻqotishlar, effekt/murakkablik matritsasi, 30/60/90 reja, xavflar va qabul mezonlari.",
    demoNote: "Demo fragment — hisobot tuzilmasi namunasi, aniq mijoz maʼlumotlari emas",
    cards: [
      { title: "Jarayon xaritasi", text: "«soʻrov → katalog → KP → CRM» sxemasi — tor joylar va qoʻlda qadamlar bilan." },
      { title: "Effekt / murakkablik matritsasi", text: "Ustuvorliklar: tez gʻalabalar vs. uzoq tsiklli integratsiyalar." },
      { title: "30 / 60 / 90 reja", text: "Bitta jarayonda pilot → kengaytirish → barqarorlashtirish va topshirish." },
      { title: "Xavflar va qabul", text: "Maʼlumot boʻshliqlari, kirish huquqlari, odamga eskalatsiya, tayyorlik mezonlari." },
    ],
    tableTitle: "Effekt hisobi namunasi (orientir)",
    tableHeaders: ["Jarayon", "Soat / oy", "Effekt", "Murakkablik"],
    tableRows: [
      ["KP tayyorlash", "80", "Yuqori", "Oʻrtacha"],
      ["Kiruvchi pochtani tahlil", "40", "Oʻrtacha", "Past"],
      ["PDF dan maydon ajratish", "60", "Yuqori", "Yuqori"],
    ],
  },
  preLaunch: {
    label: "Ishga tushirishdan oldin",
    title: "Ishga tushirishdan oldin nimalarni tekshiramiz",
    subtitle: "Sifat va xavfsizlik chek-listi — sanoat trafikidan oldin.",
    acceptanceNote: "Test stsenariylari va qabul mezonlarini ishlab chiqish boshlanishidan oldin shakllantiramiz.",
    items: [
      "Ideal misollarda emas, haqiqiy maʼlumotlarda javoblar",
      "Yetishmayotgan maʼlumotlarda xulq-atvor",
      "Kirish huquqlari va kontur chegaralari",
      "Prompt injection ga chidamlilik",
      "Uydirma narx va hujjatlarni taqiqlash",
      "Past ishonchda odamga eskalatsiya",
      "Harakatlar va jarayon xarajatini jurnallashtirish",
      "Yuk ostida kechikishlar",
      "Kill switch — avtomatlashtirishni toʻxtatish imkoniyati",
    ],
  },
  reviews: {
    title: "Mijozlar sharhlari",
    subtitle: "Tasdiqlangan sharhlar — AI, ML va sanoat joriy etishlar boʻyicha",
    yandexTitle: "Reyting",
    yandexMeta: "Reyting {rating} · {count} baho",
  },
  certificates: {
    label: "Hamkorlik",
    title: "Sertifikatlar",
    intro:
      "Kaspersky Lab avtorizatsiyalangan hamkori. Hujjatlar statusni tasdiqlaydi — mahsulot katalogi emas.",
    titles: {
      b2b: "B2B",
      b2c: "B2C",
    },
    openPdf: "PDF ochish",
  },
  guides: {
    metaTitle: "Avtomatlashtirish va AI gidlari | Bober AI",
    title: "Gidlar va amaliyot",
    h1: "Gidlar va amaliyot",
    subtitle: "Qanday avtomatlashtirish, tizimlarni bogʻlash, AI qachon mantiqiy — buzzwordsiz.",
    badge: "Gidlar",
    cta: "Audit soʻrash",
    telegram: "Telegram",
  },
  landing: {
    common: {
      backHome: "Bosh sahifaga",
      cta: "Loyihani muhokama qilish",
      telegram: "Telegram",
      service: "Paket",
      serviceDetails: "Xizmat haqida batafsil",
      timeline: "Muddat",
      days: "kun",
      contact: "Aloqa",
      formTitle: "Loyihani muhokama qilish",
      formSubtitle:
        "Jarayon yoki integratsiyani tavsiflang — 4 ish soati ichida javob beramiz. 30 daqiqalik qoʻngʻiroqdan keyin 24 soat ichida dastlabki reja va byudjet oraligʻini yuboramiz.",
      faqTitle: "Tez-tez beriladigan savollar",
      caseStudiesTitle: "Keyslar",
      viewCaseStudy: "Keysni koʻrish",
      featuredCase: "Keys",
      problemLabel: "Muammo",
      solutionLabel: "Yechim",
      resultLabel: "Natija",
    },
    pages: {
      processes: {
        metaTitle: "CRM, 1С va hujjatlar orasidagi uzluksiz workflow",
        metaDescription:
          "Uzluksiz workflow loyihalash: CRM hodisalari → qoidalar → hujjatlar → 1С. «Qutidan» SaaS emas — jarayoningizga mos production kontur.",
        metaKeywords: [
          "uzluksiz workflow",
          "workflow avtomatlashtirish",
          "BPM joriy etish",
          "biznes jarayonlarini optimallashtirish",
          "CRM 1С hujjatlar integratsiya",
          "jarayonlar orkestratsiyasi",
          "biznes jarayonlarini avtomatlashtirish",
          "avtomatlashtirish narxi Oʻzbekiston",
          "kalit topshirish avtomatlashtirish",
          "biznes jarayonlari avtomatlashtirish tizimi",
        ],
        eyebrow: "Workflow",
        h1: "CRM, 1С va hujjatlar orasidagi uzluksiz workflow",
        subtitle:
          "CRM, 1С va hujjatlar orasidagi qadamlarni orkestratsiya: qoʻlda nusxa koʻchirmasiz yagona workflow.",
        problemsTitle: "Qachon kerak",
        problems: [
          "Xodimlar CRM, pochta va jadvallarda bir xil qadamlarni takrorlaydi",
          "Jarayonlar aniq odamlarga bogʻlangan — kengaytirish tiqilib qoladi",
          "«Yana bir SaaS» emas, workflow orkestratsiyasi kerak",
        ],
        deliverablesTitle: "Nima olasiz",
        deliverables: [
          "Jarayonlar xaritasi va avtomatlashtirish nuqtalari",
          "CRM, 1С, messenjerlar, hujjatlar integratsiyalari",
          "Production ishga tushirish, monitoring va jamoaga topshirish",
        ],
        relatedTitle: "Tegishli yoʻnalishlar",
        related: [
          { href: "/services/crm-integration", label: "CRM integratsiya" },
          { href: "/services/document-processing", label: "Hujjatlar" },
          { href: "/services/business-process-automation", label: "Biznes-jarayonlar" },
          { href: "/pricing", label: "Narxlar" },
        ],
        faq: [
          {
            q: "Bu tayyor SaaS mi?",
            a: "Yoʻq. Jarayon, tizimlar va qabul mezonlaringizga mos kontur yigʻamiz — qatʼiy smeta bilan.",
          },
          {
            q: "Qancha turadi?",
            a: "Audit 15 000 000 soʻmdan, sanoat joriy etish 50 000 000 soʻmdan. Aniq smeta — discovery dan keyin.",
          },
          {
            q: "1С majburiyymi?",
            a: "Yoʻq. Koʻpincha CRM + hujjatlar yetarli; 1С yoki ERP kerak boʻlganda ulaymiz.",
          },
          {
            q: "Muddat qancha?",
            a: "Pilot odatda 3–6 hafta; toʻliq production — integratsiyalar soniga bogʻliq.",
          },
        ],
      },
      crm: {
        metaTitle: "CRM joriy etish va avtomatlashtirish — Bitrix24 va amoCRM",
        metaDescription:
          "Bitrix24 va amoCRM: joriy etish, voronkalar, 1С, telefoniya, hujjatlar va AI qatlam. Toshkent va Oʻzbekiston — soʻmda smeta.",
        metaKeywords: [
          "Bitrix24 joriy etish Toshkent",
          "amoCRM Oʻzbekiston",
          "CRM avtomatlashtirish",
          "CRM 1С integratsiya",
          "savdo voronkasi",
          "BitrixGPT AI",
        ],
        eyebrow: "CRM",
        h1: "CRM joriy etish va avtomatlashtirish",
        subtitle:
          "Bitrix24 va amoCRM: voronkalar, integratsiyalar va AI qatlam — portal va maʼlumotlar sizda qoladi.",
        problemsTitle: "Qachon kerak",
        problems: [
          "Lidlar messenjerlar va jadvallarda yoʻqoladi",
          "CRM va 1С qoʻlda sinxronlanadi",
          "Menejerlar rutina uchun soatlar sarflaydi",
        ],
        deliverablesTitle: "Nima olasiz",
        deliverables: [
          "Ishchi voronka va robotlar",
          "1С / telefoniya / hujjatlar integratsiyalari",
          "AI qatlam: samarilar, follow-up, KP",
        ],
        relatedTitle: "Tegishli",
        related: [
          { href: "/services/ai-sales-loop", label: "Savdo AI konturi" },
          { href: "/services/crm-integration", label: "CRM integratsiya" },
          { href: "/pricing", label: "Narxlar" },
        ],
        faq: [
          {
            q: "Bitrix24 yoki amoCRM?",
            a: "Jarayon va stackingizga qarab tanlaymiz yoki mavjud CRM ni kuchaytiramiz.",
          },
          {
            q: "Narx oraligʻi?",
            a: "CRM + AI kontur 15–50 mln soʻmdan — qamrovga bogʻliq. Boshlashdan oldin qatʼiy smeta.",
          },
          {
            q: "Maʼlumotlar qayerda?",
            a: "Sizning portal / bulutingiz yoki on-premise. NDA soʻrov boʻyicha.",
          },
          {
            q: "Jamoa oʻrgatilasizmi?",
            a: "Ha — topshirish, koʻrsatmalar va barqarorlik davri.",
          },
        ],
      },
      corporate: {
        metaTitle: "Korporativ AI-assistant va private LLM",
        metaDescription:
          "Yopiq konturda korporativ AI: RAG, agentlar, SSO, guardrails. Oʻzbekiston kompaniyalari uchun on-prem yoki mahalliy bulut.",
        metaKeywords: [
          "korporativ AI",
          "private LLM",
          "on-premise AI",
          "RAG bilim bazasi",
          "Secure AI Oʻzbekiston",
        ],
        eyebrow: "Korporativ AI",
        h1: "Korporativ AI-assistant yopiq konturda",
        subtitle: "Maʼlumotlar tashqi servislarga ketmaydi — kirish nazorati, jurnallar va kod topshirish.",
        problemsTitle: "Qachon kerak",
        problems: [
          "Sezgir maʼlumotlarni public ChatGPT ga joylab boʻlmaydi",
          "Xodimlar reglamentlarni papkalarda qidiradi",
          "IT va xavfsizlik kontur talablarini qoʻyadi",
        ],
        deliverablesTitle: "Nima olasiz",
        deliverables: [
          "Private LLM / RAG kontur",
          "SSO, rollar, audit jurnallari",
          "CRM va ichki API integratsiyalari",
        ],
        relatedTitle: "Tegishli",
        related: [
          { href: "/secure-ai", label: "Bober Secure AI" },
          { href: "/services/rag", label: "RAG" },
          { href: "/services/private-llm-gigachat", label: "Private LLM" },
        ],
        faq: [
          {
            q: "GigaChat majburiyymi?",
            a: "Yoʻq. Kontur va talablarga mos model tanlaymiz — ochiq yoki vendor.",
          },
          {
            q: "Byudjet?",
            a: "Private kontur 50 000 000 soʻmdan. Audit 15 000 000 soʻmdan.",
          },
          {
            q: "On-prem mumkinmi?",
            a: "Ha — on-premise, mahalliy bulut yoki gibrid.",
          },
          {
            q: "NDA?",
            a: "Standart. Maʼlumot almashishdan oldin imzolaymiz.",
          },
        ],
      },
      documents: {
        metaTitle: "Hujjatlarni AI bilan avtomatlashtirish — OCR, kelishuvlar, 1С",
        metaDescription:
          "PDF va skanlardan maydon ajratish, kelishuv marshrutlari, CRM/1С ga yuklash. Toshkent — soʻmda smeta.",
        metaKeywords: [
          "hujjatlar avtomatlashtirish",
          "OCR 1С",
          "hujjat aylanishi AI",
          "hisob-faktura tanish",
          "kelishuv workflow",
        ],
        eyebrow: "Hujjatlar",
        h1: "Hujjatlarni AI bilan qayta ishlash",
        subtitle: "OCR → maydonlar → tekshiruv → CRM/1С. Qoʻlda kiritish kamayadi, xatolar kamayadi.",
        problemsTitle: "Qachon kerak",
        problems: [
          "Hisob-fakturalar va shartnomalar qoʻlda kiritiladi",
          "Kelishuvlar kunlar oladi",
          "PDF larda bir xil xatolar takrorlanadi",
        ],
        deliverablesTitle: "Nima olasiz",
        deliverables: [
          "OCR va maydon ajratish pipeline",
          "Kelishuv marshruti va eskalatsiya",
          "1С / CRM / ERP ga yuklash",
        ],
        relatedTitle: "Tegishli",
        related: [
          { href: "/services/document-processing", label: "Hujjatlar" },
          { href: "/services/ocr", label: "OCR" },
          { href: "/portfolio", label: "Keyslar" },
        ],
        faq: [
          {
            q: "Qaysi formatlar?",
            a: "PDF, skanlar, foto, pochta ilovalari — stsenariy boʻyicha.",
          },
          {
            q: "Narx?",
            a: "50 000 000 soʻmdan tipik pipeline. Pilot 30 000 000 soʻmdan.",
          },
          {
            q: "1С versiyasi?",
            a: "Mijoz konturidagi almashinuvga moslashtiramiz.",
          },
          {
            q: "Past ishonchda nima?",
            a: "Odamga eskalatsiya — uydirma raqamlar yoʻq.",
          },
        ],
      },
      sales: {
        metaTitle: "Savdo boʻlimini AI bilan avtomatlashtirish",
        metaDescription:
          "Lidlar, KP, follow-up va CRM bitta konturda. Oʻzbekiston KMB uchun soʻmda smeta.",
        metaKeywords: [
          "savdo avtomatlashtirish",
          "KP avtomatlashtirish",
          "AI savdo agenti",
          "lidlar marshrutlash",
          "follow-up CRM",
        ],
        eyebrow: "Savdo",
        h1: "Savdo boʻlimini avtomatlashtirish",
        subtitle: "KP daqiqalarda, lidlar yoʻqolmaydi, follow-up CRM da avtomatik.",
        problemsTitle: "Qachon kerak",
        problems: [
          "KP tayyorlash soatlar oladi",
          "Lidlar qoʻngʻiroqsiz sovib ketadi",
          "Menejerlar tizimlar orasida maʼlumot koʻchiradi",
        ],
        deliverablesTitle: "Nima olasiz",
        deliverables: [
          "KP / lid / follow-up avtomatlashtirish",
          "CRM yozuvlari va vazifalar",
          "Metrikalar va pilot reja",
        ],
        relatedTitle: "Tegishli",
        related: [
          { href: "/services/sales-ai-agent", label: "Savdo AI" },
          { href: "/services/ai-sales-loop", label: "AI sales loop" },
          { href: "/pricing", label: "Narxlar" },
        ],
        faq: [
          {
            q: "ChatGPT yetadimi?",
            a: "Brauzer demosi CRM va narxlarga ulanmaydi. Biz production kontur quramiz.",
          },
          {
            q: "Byudjet?",
            a: "Pilot 30 mln soʻmdan, toʻliq joriy etish 50 mln soʻmdan.",
          },
          {
            q: "Qaysi CRM?",
            a: "Bitrix24, amoCRM va boshqa REST/API ochiq tizimlar.",
          },
          {
            q: "ROI?",
            a: "Auditda soatlar va konversiya boʻyicha hisoblaymiz — smetadan oldin.",
          },
        ],
      },
      amocrm: {
        metaTitle: "amoCRM joriy etish va AI avtomatlashtirish — Oʻzbekiston",
        metaDescription:
          "amoCRM: voronkalar, widgetlar, WhatsApp/Telegram, AI follow-up. Toshkent — soʻmda qatʼiy smeta.",
        metaKeywords: ["amoCRM Toshkent", "amoCRM joriy etish", "amoCRM AI", "amoCRM WhatsApp"],
        eyebrow: "amoCRM",
        h1: "amoCRM joriy etish va AI qatlam",
        subtitle: "Varonka, integratsiyalar va AI — qoʻlda nusxa koʻchirmasiz.",
        problemsTitle: "Qachon kerak",
        problems: [
          "amoCRM toʻliq ishlatilmaydi — maʼlumot jadvallarda",
          "Messenjer lidlari CRM ga tushmaydi",
          "Follow-up unutiladi",
        ],
        deliverablesTitle: "Nima olasiz",
        deliverables: [
          "Sozlangan voronka va maydonlar",
          "Messenjer / sayt integratsiyalari",
          "AI: samarilar, scoring, follow-up",
        ],
        relatedTitle: "Tegishli",
        related: [
          { href: "/services/crm-integration", label: "CRM" },
          { href: "/services/sales-ai-agent", label: "Savdo AI" },
          { href: "/pricing", label: "Narxlar" },
        ],
        faq: [
          {
            q: "Yangi portal kerakmi?",
            a: "Koʻpincha mavjud amoCRM ni kuchaytiramiz.",
          },
          {
            q: "Narx?",
            a: "15–50 mln soʻm qamrovga bogʻliq.",
          },
          {
            q: "WhatsApp Business?",
            a: "Ha — rasmiy yoki kelishilgan kanal orqali.",
          },
          {
            q: "Muddat?",
            a: "Pilot 2–4 hafta tipik.",
          },
        ],
      },
      bitrix24: {
        metaTitle: "Bitrix24 joriy etish va AI — Toshkent, Oʻzbekiston",
        metaDescription:
          "Bitrix24 portal, telefoniya, 1С, AI sales loop. 1С-Bitrix hamkor · soʻmda smeta.",
        metaKeywords: ["Bitrix24 Toshkent", "Bitrix24 joriy etish", "Bitrix24 AI", "Bitrix24 1С"],
        eyebrow: "Bitrix24",
        h1: "Bitrix24 joriy etish va AI kontur",
        subtitle: "Portal, voronkalar, 1С va AI — bitta savdo konturida.",
        problemsTitle: "Qachon kerak",
        problems: [
          "Bitrix24 «quti» holatida — jarayon mos emas",
          "Telefoniya va CRM ajralgan",
          "1С bilan qoʻlda sinxron",
        ],
        deliverablesTitle: "Nima olasiz",
        deliverables: [
          "Ishchi portal va avtomatlashtirish",
          "Telefoniya + AI samarilar",
          "1С / hujjatlar integratsiyalari",
        ],
        relatedTitle: "Tegishli",
        related: [
          { href: "/services/ai-sales-loop", label: "AI sales loop" },
          { href: "/services/bitrix", label: "Bitrix24" },
          { href: "/pricing", label: "Narxlar" },
        ],
        faq: [
          {
            q: "Hamkormisiz?",
            a: "1С-Bitrix hamkorlik dasturi · ID 28909898.",
          },
          {
            q: "Narx?",
            a: "Bitrix24 + AI 15 000 000 soʻmdan.",
          },
          {
            q: "Bulut yoki quti?",
            a: "Ikkalasi ham — kontur talablariga qarab.",
          },
          {
            q: "MCP / BitrixGPT?",
            a: "Kerak boʻlsa AI qatlamni BitrixGPT va MCP ustiga qoʻyamiz.",
          },
        ],
      },
      onec: {
        metaTitle: "1С integratsiyasi va AI avtomatlashtirish — Oʻzbekiston",
        metaDescription:
          "CRM ↔ 1С sinxron, hujjatlar yuklash, qoʻlda nusxa koʻchirmasiz. Soʻmda smeta.",
        metaKeywords: ["1С integratsiya", "CRM 1С", "1С avtomatlashtirish", "1С AI"],
        eyebrow: "1С",
        h1: "1С bilan integratsiya va avtomatlashtirish",
        subtitle: "Bitimlar, buyurtmalar va hujjatlar — yagona haqiqat manbai.",
        problemsTitle: "Qachon kerak",
        problems: [
          "CRM va 1С da turli raqamlar",
          "Operatorlar kun boʻyi nusxa koʻchiradi",
          "Yopilish kechikadi",
        ],
        deliverablesTitle: "Nima olasiz",
        deliverables: [
          "Ikki tomonlama sinxron kontur",
          "Xatolar va retry monitoring",
          "Hujjatlar / OCR → 1С (kerak boʻlsa)",
        ],
        relatedTitle: "Tegishli",
        related: [
          { href: "/services/crm-integration", label: "CRM" },
          { href: "/services/document-processing", label: "Hujjatlar" },
          { href: "/portfolio/crm-1c-sync", label: "Keys: CRM↔1С" },
        ],
        faq: [
          {
            q: "Qaysi 1С?",
            a: "Mijozdagi konfiguratsiya va almashinuv kanaliga moslashamiz.",
          },
          {
            q: "Narx?",
            a: "Tipik integratsiya 50 000 000 soʻmdan; audit 15 mln soʻmdan.",
          },
          {
            q: "Online doʻkon / Uzum?",
            a: "Marketplace va CRM/1С bogʻlash stsenariylari mumkin — Kwork/Wildberries ga bogʻliq emas.",
          },
          {
            q: "Xavfsizlik?",
            a: "Kontur ichida, NDA, kerak boʻlsa on-prem.",
          },
        ],
      },
      knowledgeBase: {
        metaTitle: "Korporativ bilim bazasi va RAG — Oʻzbekiston",
        metaDescription:
          "Reglamentlar boʻyicha AI qidiruv, manba havolasi, xodimlar va qoʻllab-quvvatlash uchun.",
        metaKeywords: ["bilim bazasi AI", "RAG qidiruv", "korporativ FAQ", "reglamentlar bot"],
        eyebrow: "Bilim bazasi",
        h1: "Korporativ bilim bazasi va RAG",
        subtitle: "Savol oddiy tilda — javob manba havolasi bilan.",
        problemsTitle: "Qachon kerak",
        problems: [
          "Bir xil savollar HR va qoʻllab-quvvatlashga keladi",
          "Reglamentlar papkalarda tarqalgan",
          "Yangi xodimlar uzoq moslashadi",
        ],
        deliverablesTitle: "Nima olasiz",
        deliverables: [
          "Indeksatsiya va RAG kontur",
          "Chat / Telegram / portal integratsiya",
          "Past ishonchda ekspertga eskalatsiya",
        ],
        relatedTitle: "Tegishli",
        related: [
          { href: "/services/rag", label: "RAG" },
          { href: "/services/knowledge-base", label: "Bilim bazasi" },
          { href: "/portfolio/support-knowledge-base", label: "Keys" },
        ],
        faq: [
          {
            q: "Qaysi formatlar?",
            a: "PDF, Confluence, Notion, disklar — kelishilgan manbalar.",
          },
          {
            q: "Narx?",
            a: "50 000 000 soʻmdan tipik RAG kontur.",
          },
          {
            q: "Maʼlumot chiqadimi?",
            a: "Yopiq kontur mumkin — Secure AI.",
          },
          {
            q: "Tillar?",
            a: "Oʻzbek, rus, ingliz — korpusga bogʻliq.",
          },
        ],
      },
      assistant: {
        metaTitle: "Biznes uchun AI-assistant — joriy etish Oʻzbekiston",
        metaDescription:
          "Xodimlar va mijozlar uchun AI-assistant: CRM, hujjatlar, bilim bazasi. Soʻmda smeta.",
        metaKeywords: ["AI assistant biznes", "korporativ chatbot", "AI agent Toshkent"],
        eyebrow: "AI-assistant",
        h1: "Biznes uchun AI-assistant",
        subtitle: "ChatGPT brauzerda emas — CRM va reglamentlaringizga ulangan assistant.",
        problemsTitle: "Qachon kerak",
        problems: [
          "Xodimlar public ChatGPT ga korporativ matn joylaydi",
          "Javoblar manbasiz va nazoratsiz",
          "Bir nechta botlar oʻrniga bitta kontur kerak",
        ],
        deliverablesTitle: "Nima olasiz",
        deliverables: [
          "Ishchi assistant va vositalar",
          "CRM / bilim bazasi ulanishi",
          "Monitoring, rollar, topshirish",
        ],
        relatedTitle: "Tegishli",
        related: [
          { href: "/services/ai-agent", label: "AI-agentlar" },
          { href: "/services/enterprise-ai-assistant", label: "Korporativ AI" },
          { href: "/pricing", label: "Narxlar" },
        ],
        faq: [
          {
            q: "Obuna sotasizmi?",
            a: "Yoʻq. Claude/ChatGPT akkaunt sozlamaymiz — jarayoningizga joriy qilamiz.",
          },
          {
            q: "Narx?",
            a: "Pilot 30 mln soʻmdan, joriy etish 50 mln soʻmdan.",
          },
          {
            q: "Qayerda joylashadi?",
            a: "Bulut yoki yopiq kontur — tanlovingiz.",
          },
          {
            q: "Oʻzbek tili?",
            a: "Ha — interfeys va korpus oʻzbekcha boʻlishi mumkin.",
          },
        ],
      },
    },
  },
} as const;
