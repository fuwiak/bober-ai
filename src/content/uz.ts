import ru from "./ru";
import { uzExtra } from "./uz-extra";
import { deepMerge, type DeepPartial } from "../lib/deep-merge";

/** Oʻzbek (Latin) market overlay — Toshkent, Oʻzbekiston. */
const uzOverrides = {
  meta: {
    title: "Oʻzbekistondagi kompaniyalar uchun CRM, hujjatlar va savdoni avtomatlashtirish — Bober AI",
    description:
      "Oʻzbekistondagi biznes uchun AI-integrator: Bitrix24, amoCRM, 1С, WhatsApp va Telegram. Pilot 30 000 000 soʻmdan — bulut yoki yopiq kontur, kirish nazorati, kod topshirish. Toshkent.",
    keywords: [
      "CRM avtomatlashtirish Oʻzbekiston",
      "Bitrix24 joriy etish Toshkent",
      "amoCRM Oʻzbekiston",
      "1С integratsiyasi",
      "biznes uchun AI",
      "korporativ AI-integrator",
      "WhatsApp Telegram CRM",
      "Secure AI on-premise",
      "RAG hujjatlar qidiruvi",
      "savdo avtomatlashtirish Oʻzbekiston",
    ],
  },
  locale: {
    switchTo: "Rus tili",
  },
  nav: {
    services: "Yechimlar",
    automation: "Avtomatlashtirish",
    packages: "Paketlar",
    portfolio: "Keyslar",
    howWeWork: "Qanday ishlaymiz",
    pricing: "Narxlar",
    guides: "Gidlar",
    blog: "Blog",
    academy: "Amaliyot",
    partners: "Hamkorlar",
    secureAi: "Bober Secure AI",
    aiKubernetes: "AI Kubernetesda",
    process: "Jarayon",
    about: "Kompaniya haqida",
    career: "Karyera",
    faq: "FAQ",
    media: "OAV",
    certificates: "Sertifikatlar",
    reviews: "Sharhlar",
    contact: "Aloqa",
    consultCta: "Baholash olish",
    consultCtaShort: "Baholash",
    write: "Baholash olish",
    writeShort: "Baholash",
    menuOpen: "Menyuni ochish",
    menuClose: "Menyuni yopish",
    quickContact: "Biz bilan bogʻlanish",
    call: "Qo'ng'iroq qilish",
    telegram: "Telegram",
    servicesPage: "Barcha yechimlar",
    company: "Kompaniya",
    resources: "Resurslar",
    claude: "Claude AI",
    claudeDesc: "Kichik va oʻrta biznes uchun Claude API va MCP",
    iiDlyaBiznesa: "Biznes uchun AI",
    iiDlyaBiznesaDesc: "Audit, pilot va kalit topshirish",
    colPlatform: "Platforma",
    colSecurity: "Xavfsizlik",
    colAutomation: "Avtomatlashtirish",
    servicesDesc: "Biznes vazifalari uchun AI yechimlar katalogi",
    secureAiDesc: "Himoyalangan kontur va LLM Security",
    aiKubernetesDesc: "K8s da inferens va orkestratsiya",
    automationDesc: "Jarayonlar, CRM va hujjatlar nusxa ko'chirmasdan",
    salesLoopDesc: "Telefoniya, CRM va follow-up bitta konturda",
    bitrixDesc: "CRM joriy etish, AI qatlami, 1С, telefoniya va voronkalar",
    ragDesc: "Manba havolasi bilan hujjatlar qidiruvi",
    portfolioDesc: "O'lchanadigan natija bilan joriy etishlar",
    howWeWorkDesc: "Bosqichlar, muddatlar va qat'iy smeta",
    aboutDesc: "Jamoa va joriy etish yondashuvi",
    careerDesc: "Vakansiyalar va ish madaniyati",
    partnersDesc: "Hamkorlik dasturi",
    blogDesc: "Amaliyot va joriy etish tahlillari",
    academyDesc: "Biznes uchun AI amaliyoti",
    guidesDesc: "Gidlar va chek-listlar",
    mediaDesc: "Nashrlar va eslatmalar",
    faqDesc: "Hamkorlik haqida tez-tez beriladigan savollar",
    promoTitle: "Konturingiz uchun pilot kerakmi?",
    promoText: "Tor joyni tahlil qilamiz va qat'iy smeta beramiz.",
    promoCta: "Vazifani muhokama qilish",
    footTagNda: "NDA",
    footTagFixed: "Qat'iy smeta",
    footTagRu: "Cloud / on-prem / UZ",
    allSolutions: "Barcha yechimlar",
  },
  hero: {
    location: "Toshkent · Onlayn · Oʻzbekiston",
    eyebrow: "Oʻzbekistondagi biznes uchun AI-integrator",
    titleLine1: "Oʻzbekistondagi kompaniyalar uchun CRM, hujjatlar va savdoni avtomatlashtirish",
    titleLine2: "",
    valueProposition:
      "Bitrix24, amoCRM, 1С, WhatsApp va ichki tizimlarni integratsiya qilamiz.\n\nAI ni bulutda yoki yopiq konturda joylashtiramiz — kirish nazorati va kod topshirish bilan.",
    differentiator:
      "Toshkent va Oʻzbekiston bo'ylab KMB: savdo, logistika, e-commerce, xizmatlar va ishlab chiqarish.",
    specialization:
      "4 ish soati ichida javob beramiz. 30 daqiqalik qo'ng'iroqdan keyin — 24 soat ichida reja va soʻmdagi byudjet oralig'i.",
    heroImageAlt: "Pavel Stasinskiy — Bober AI asoschisi, AI arxitektor",
    founderBadge: "Asoschisi va loyiha rahbari",
    teamLine: "Arxitektura, joriy etish va natija uchun mas'uliyat",
    officeGalleryLabel: "Biznes arxitektura va korporativ makonlar",
    trustItems: [
      "12+ joriy etish",
      "Shartnoma, NDA, xalqaro bitim",
      "Bitrix24 / amoCRM / 1С",
    ],
    title: "Oʻzbekistondagi kompaniyalar uchun CRM, hujjatlar va savdoni avtomatlashtirish",
    roles: ["Asoschisi va loyiha rahbari", "AI arxitektor"],
    nameLine: "Pavel Stasinskiy",
    focus: "AI tizimlari, avtomatlashtirish va Bitrix24, 1С, amoCRM, CRM va ERP integratsiyasi.",
    trustLine: "★ {rating} · {reviewCount} sharh · {years}+ yillik tajriba · NDA / ON-PREM",
    partnersLine:
      "Bitrix24 · amoCRM · 1С · mahalliy hosting yoki on-premise · WhatsApp / Telegram",
    ctaPrimary: "24 soat ichida reja va byudjet oralig'ini olish",
    ctaSecondary: "Keyslarni ko'rish",
    ctaTelegram: "Telegram",
    responseNote:
      "4 ish soati ichida javob beramiz. 30 daqiqalik qo'ng'iroqdan keyin 24 soat ichida dastlabki reja va byudjet oralig'ini yuboramiz.",
    legalNote: "Shaxsiy ma'lumotlar subyekt roziligi bilan joylashtirilgan.",
    legalLink: "Shaxsiy ma'lumotlarni qayta ishlash siyosati",
  },
  philosophy: {
    title: "Biz AI sotmaymiz",
    subtitle: "Biznes operatsiyalarini yaxshilaymiz",
    items: [
      "Ba'zan bu CRM integratsiyasi.",
      "Ba'zan hujjatlarni avtomatlashtirish.",
      "Ba'zan biznes-jarayonni qayta qurish.",
      "Ba'zan — AI yordamchisi.",
    ],
    closing:
      "Eng yuqori biznes qiymatini beradigan yechimni tavsiya qilamiz — eng zamonaviy texnologiyani emas.",
  },
  whyUs: {
    label: "Farq",
    title: "Ishchi AI konturi: integratsiyalar, loglar, rollar, xato nazorati va kod topshirish",
    text: "Avval joriy yukni o'lchaymiz, keyin pilot metrikalarini va qabul qilish mezonlarini belgilaymiz",
    benefits: [
      "Tipik operatsiyalarda 40–80% vaqt tejash",
      "CRM, pochta va hujjatlar orasida ma'lumot ko'chirishda kamroq xato",
      "3 oydan boshlab o'zini oqlash — smetadan oldin haqiqiy yuk bo'yicha hisoblaymiz",
      "Jamoaga to'liq topshirish: kod, kirishlar, hujjatlar",
    ],
  },
  oneWindow: {
    label: "Bitta jarayon",
    title: "Joriy etish uchun kerakli hamma narsa — bir joyda",
    subtitle: "Hozir nima to'sqinlik qilsa — bitta loyiha doirasida tahlil qilib yopamiz.",
    items: [
      {
        q: "Jarayonlar hujjatlashtirilmaganmi?",
        a: "Xodimlarning joriy ishini tahlil qilib, nima avtomatlashtirish kerakligini aniqlaymiz.",
      },
      {
        q: "Ma'lumotlar PDF, Excel, pochta va CRM da tarqalganmi?",
        a: "Ularni yagona ishchi konturga jamlaymiz.",
      },
      {
        q: "CRM va 1С bog'lanmaganmi?",
        a: "Qo'lda nusxa ko'chirmasdan ma'lumot almashinuvini sozlaymiz.",
      },
      {
        q: "Hujjatlar bilan ishlash kerakmi?",
        a: "Tizim so'rovni taniydi, tovarni topadi, ma'lumotlarni tekshiradi va hujjat tayyorlaydi.",
      },
      {
        q: "Xavfsizlik talablari bormi?",
        a: "Yechimni bulutingizda yoki mahalliy konturda joylashtiramiz.",
      },
      {
        q: "Loyiha o'zini oqlaydimi noaniqmi?",
        a: "Ishlab chiqishdan oldin xarajatlar, vaqt tejash va kutilayotgan effektni baholaymiz.",
      },
    ],
  },
  budgetGate: {
    label: "Ish formati",
    title: "Pilot — 30 000 000 soʻmdan",
    whyLabel: "Nega:",
    reasons: [
      "Avval jarayon va ma'lumot manbalarini tahlil qilamiz",
      "Ishchi tizimlar bilan integratsiya qilamiz",
      "Haqiqiy stsenariylarda sinab ko'ramiz",
      "Production ga ishga tushiramiz",
      "Hujjatlar va kirishlarni topshiramiz",
    ],
    note: "Byudjet zinasi: audit — 15 000 000 soʻmdan, pilot — 30 000 000 soʻmdan, sanoat joriy etish — 50 000 000 soʻmdan.",
    cta: "Baholash olish",
  },
  homeHub: {
    label: "Bo'limlar",
    title: "Yo'nalishlar bo'yicha batafsil",
    items: [
      {
        href: "/services",
        title: "Yechimlar",
        description: "CRM, hujjatlar, savdo, qo'llab-quvvatlash — nima joriy etamiz va qanday natija.",
      },
      {
        href: "/portfolio",
        title: "Keyslar",
        description: "ELIA Suite, KP avtomatlashtirish, RAG — o'lchov metodologiyasi bilan.",
      },
      {
        href: "/pricing",
        title: "Narxlar",
        description: "Audit 15 000 000 soʻmdan, pilot 30 000 000 soʻmdan, joriy etish 50 000 000 soʻmdan.",
      },
      {
        href: "/faq",
        title: "FAQ",
        description: "Muddatlar, byudjet, NDA, CRM — xarid va IT uchun javoblar.",
      },
    ],
  },
  homeLanding: {
    marketOffersLabel: "Yuqori talab xizmatlari",
    marketOffersTitle: "Biznesni telefonda boshqaring",
    marketOffersSubtitle:
      "Avtomatlashtirish · Marketing · Savdo. Bitrix24, amoCRM, YCLIENTS, RetailCRM, MoySklad, Roistat, Mango Telecom va Tinkoff Bank.",
    marketOffersPillars: ["Avtomatlashtirish", "Marketing", "Savdo"],
    marketOffersCta: "Xizmatni koʻrish →",
    marketOffersHubCta: "Stek xizmatlarining barchasi →",
    proofLabel: "Natijalar",
    proofTitle: "Pilotlarda allaqachon o'lchaganlarimiz",
    casesLabel: "Keyslar",
    casesTitle: "O'lchanadigan natija bilan joriy etishlar",
    casesSubtitle:
      "Oldin → keyin: KMB va korporatsiyalar uchun keyslar — o'lchov metodologiyasi bilan. Bitrix24, amoCRM, Telegram va savdo avtomatlashtirish.",
    expertiseLabel: "Ekspertiza va nashrlar",
    expertiseTitle: "Brend ortidagi ekspert tarixi",
    expertiseSources: "Habr · Medium · xalqaro loyihalar",
    expertiseStats: "10+ yil dasturlash · 7 yil AI · 12+ joriy etish",
    expertiseCta: "Nashrlar va chiqishlarni ko'rish",
    partnersHomeLabel: "Hamkorlar",
    partnersHomeTitle: "Ikki alohida kirish — adashtirmang",
    partnersHomeTechTitle: "Texnologik hamkorlar",
    partnersHomeTechText:
      "Bitrix24, amoCRM, 1С, Kaspersky — tasdiqlangan status va birgalikdagi joriy etishlar.",
    partnersHomeTechCta: "Sertifikatlar va statuslar",
    partnersHomeAgencyTitle: "Integratorlar va agentliklar",
    partnersHomeAgencyText:
      "White-label AI loyihalar: NDA, non-circumvention, rollar ajratish, wholesale smeta.",
    partnersHomeAgencyCta: "Hamkorlikni muhokama qilish",
    partnersHomePriceCta: "Hamkorlik narxlarini olish",
    casesCta: "Batafsilroq",
    caseBeforeLabel: "Oldin",
    caseAfterLabel: "Keyin",
    caseDiscussCta: "O'xshash loyihani muhokama qilish",
    packagesMore: "Narxlar, ROI va jarayon — narxlar sahifasida",
    whyTrustMore: "Nashrlar va tasdiqlar — OAV bo'limida",
    faqMore: "Barcha javoblar FAQ da",
    budgetLabel: "Byudjet va ishonch",
    budgetTitle: "Yashirin bosqichsiz tushunarli kirish",
    budgetNote:
      "Audit — 15 000 000 soʻmdan · pilot — 30 000 000 soʻmdan · joriy etish — 50 000 000 soʻmdan · qo'llab-quvvatlash — 20 000 000 soʻm/oy. NDA va yopiq kontur — ma'lumot almashishdan oldin so'rov bo'yicha.",
    budgetCta: "Baholash olish",
    roiEntryLabel: "O'zini oqlash",
    roiEntryTitle: "Qo'ng'iroqdan oldin tejamkorlikni hisoblang",
    roiEntryText:
      "CRM va hujjatlar AI avtomatlashtirish ROI kalkulyatori — tejash oralig'i, o'zini oqlash muddati va audit chek-listi.",
    roiEntryCta: "Kalkulyatorni ochish",
    depthLabel: "Uchrashuvdan oldin",
    depthTitle: "Birinchi uchrashuvdan oldin yondashuvni o'rganing",
    depthSubtitle:
      "Ish formati, byudjet va ma'lumotlarni himoya qilishni ortiqcha yozishmasdan tushunish uchun qisqa materiallar.",
    depthItems: [
      {
        href: "/services",
        title: "Audit nima beradi",
        description: "Ishlab chiqishdan oldin jarayonlar xaritasi, yo'qotish nuqtalari va avtomatlashtirish ustuvorliklari.",
      },
      {
        href: "/pricing",
        title: "ROI va byudjetni qanday hisoblaymiz",
        description: "Audit, pilot va sanoat joriy etish — boshlashdan oldin qat'iy smeta.",
      },
      {
        href: "/faq",
        title: "Ma'lumotlarni qanday himoya qilamiz",
        description: "NDA, yopiq kontur va IT hamda xarid uchun javoblar.",
      },
    ],
  },
  leadMagnets: {
    label: "Qo'ng'iroqdan oldin materiallar",
    title: "Majburiyatsiz ikki tez qadam",
    subtitle:
      "ROI kalkulyatori yonida amaliy lider-magnitlar — loyiha baholashiga tayyorlanish uchun.",
    items: [
      {
        id: "audit-checklist",
        title: "Chek-list: audit uchun ma'lumotlar",
        description:
          "Uchrashuvdan oldin nima yig'ish kerak: jarayon, tizimlar, hajmlar, tor joylar va kontur talablari.",
        cta: "Chek-list olish",
        service: "Audit uchun ma'lumotlar chek-listi",
      },
      {
        id: "assessment",
        title: "30 daqiqalik loyiha baholash",
        description:
          "Vazifaning qisqa tahlili: byudjet oralig'i, pilot muddati va keyingi qadam — «prezentatsiya uchun» emas.",
        cta: "Baholash so'rash",
        service: "30 daqiqalik loyiha baholash",
      },
      {
        id: "guide",
        title: "Mini-gid: AI joriy etishni qayerdan boshlash",
        description:
          "LLMsiz avtomatlashtirish qachon yetadi, RAG qachon kerak va ishlab chiqishdan oldin ROI ni qanday belgilash.",
        cta: "Gidlarni ochish",
        href: "/guides",
      },
    ],
  },
  problemsWeSolve: {
    title: "Hal qiladigan tipik muammolar",
    subtitle: "Ko'pchilik mijozlar aynan shundan boshlaydi.",
    items: [
      "Savdo bo'limi tijorat takliflarini tayyorlashga soatlar sarflaydi",
      "Ma'lumot CRM, pochta va Telegram orasida tarqalgan",
      "Xodimlar tizimlar orasida ma'lumotni qo'lda ko'chiradi",
      "Hujjatlar takroriy qo'lda qayta ishlashni talab qiladi",
      "Mijoz arizalari qayta qo'ng'iroq qilgunga qadar yo'qoladi",
    ],
    solutionsIntro: "Keyin — ChatGPT dan farq, keyslar va paketlar.",
  },
  audiences: {
    title: "Kimlar uchun",
    items: [
      {
        title: "Egasi / CEO",
        text: "O'zini oqlash va xavf nazorati kerak — xayp uchun emas, eksperiment emas.",
      },
      {
        title: "Tijorat direktori",
        text: "KP, lidlar va CRM qo'lda nusxa ko'chirmasdan — tezroq bitim tsikli.",
      },
      {
        title: "Operatsion rahbar",
        text: "Hujjatlar, arizalar va marshrutlar yuk cho'qqisida tor joysiz.",
      },
      {
        title: "IT / integrator",
        text: "Arxitektura, kirishlar, monitoring va sizning konturingizga topshirish.",
      },
    ],
  },
  comparison: {
    label: "Taqqoslash",
    title: "Nega ChatGPT, SaaS va «yana bir xodim» emas",
    subtitle:
      "Maxsus joriy etish ma'lumotlar, integratsiyalar va jarayon iqtisodiyoti ustidan nazorat beradi.",
    items: [
      {
        title: "Brauzerdagi ChatGPT / Claude",
        problem:
          "CRM ga kirish yo'q, jurnallar yo'q, ma'lumotlar begona servisga ketadi, xodimlar qo'lda ko'chiradi.",
        solution:
          "AI ni sizning konturingizga joriy qilamiz: amoCRM, Bitrix24, 1С, hujjatlar — NDA va qat'iy smeta bilan.",
      },
      {
        title: "Yana bir xodim yollash",
        problem:
          "FOT har oy o'sadi, o'qitish oylar oladi, inson yuk cho'qqisida kengaymaydi.",
        solution:
          "Takrorlanuvchi hajm yetarli bo'lganda avtomatlashtirish oylar ichida o'zini oqlaydi — boshlashdan oldin haqiqiy yuk bo'yicha hisoblaymiz; tizim 24/7 ishlaydi.",
      },
      {
        title: "Tayyor SaaS",
        problem: "Jarayonlaringizga mos kelmaydi, vendor lock-in, ma'lumotlar begona bulutda.",
        solution:
          "Stack ingizga mos yechim: yopiq kontur, kod topshirish, kalit integratsiyalar.",
      },
    ],
  },
  results: {
    label: "Natija",
    title: "Joriy etishdan keyin nima o'zgaradi",
    items: [
      { stat: "45 min → 2–5 min", label: "pilot jarayonida KP tayyorlash (mijoz ma'lumotlari bo'yicha)" },
      { stat: "80% gacha", label: "xarid hujjatlaridagi pozitsiyalar pilotda avtomatik taniladi" },
      { stat: "24/7", label: "dam olish kunlarisiz yangi arizalar qayta ishlash" },
      { stat: "Kamroq xato", label: "har bosqichda ma'lumotlarni tekshirish orqali" },
    ],
    note:
      "Natija jarayonga bog'liq — ko'rsatkichlarni boshlashdan oldin belgilaymiz va pilotda o'lchaymiz; metodologiyasiz mutlaq raqamlar e'lon qilmaymiz.",
  },
  problemSolution: {
    label: "Muammo → yechim",
    title: "Odatda nima to'sqinlik qiladi — va joriy etishdan keyin nima o'zgaradi",
    subtitle: "Biz bilan ishlashdan oldin mijozlarimizdagi keng tarqalgan vaziyatlar.",
    items: [
      {
        title: "Xodimlar ma'lumotni qo'lda ko'chiradi",
        problem:
          "Arizalar pochta va messenjerlarga keladi, keyin qo'lda CRM va 1С ga tushadi. Soatlar ketadi va xatolar paydo bo'ladi.",
        solution: "Tizim ma'lumotlarni ajratadi, tekshiradi va kerakli tizimlarni avtomatik yangilaydi.",
      },
      {
        title: "Tijorat taklifi juda uzoq tayyorlanadi",
        problem: "Menejer tovar qidiradi, narx tekshiradi, analog tanlaydi va hujjatni qo'lda yig'adi.",
        solution:
          "Tizim so'rovni qayta ishlaydi, bazadan pozitsiyalar topadi va qoidalarga ko'ra tayyor taklif yaratadi.",
      },
      {
        title: "Xodimlar ma'lumot topa olmaydi",
        problem: "Reglamentlar, ko'rsatmalar va shartnomalar papkalar va ichki tizimlarda tarqalgan.",
        solution: "Xodim oddiy til bilan savol beradi va manba havolasi bilan javob oladi.",
      },
      {
        title: "AI pilot bor, lekin foydalanib bo'lmaydi",
        problem:
          "Prototip faqat ideal misollarda ishlaydi, tizimlar bilan integratsiya yo'q va xatolarni nazorat qilmaydi.",
        solution:
          "Yechim haqiqiy ma'lumotlarda ishlaydi, harakatlar jurnalini yuritadi va istisnolarni insonga uzatadi.",
      },
    ],
  },
  roiCalculator: {
    label: "O'zini oqlash",
    title: "Qo'lda jarayoningiz qancha vaqt va pul yo'qotishini bilib oling",
    subtitle:
      "Xodimlar soni, haftalik rutina soatlari va maoshni kiriting — tejash oralig'i, o'zini oqlash muddati va audit ma'lumotlari ro'yxatini oling.",
    employeesLabel: "Jarayondagi xodimlar",
    hoursLabel: "Har bir kishi uchun haftalik rutina soatlari",
    salaryLabel: "O'rtacha maosh, soʻm",
    savingsLabel: "oy",
    resultLabel: "Taxminiy tejash",
    resultNote: "Hisob taxminiy. Aniq raqamlar — jarayonlar va ma'lumotlar auditidan keyin.",
    paybackLabel: "50 000 000 soʻmdan joriy etishning o'zini oqlashi",
    paybackSuffix: "oy",
    currency: "soʻm",
    implementationFloor: "50000000",
    auditDataTitle: "Aniq audit uchun nima kerak",
    auditDataItems: [
      "Jarayon tavsifi va xodimlar roli",
      "Tizimlar: CRM, 1С, pochta, hujjatlar",
      "Hafta / oy operatsiyalar hajmi",
      "Joriy tor joylar va xatolar",
      "Kontur talablari: bulut / on-prem / NDA",
    ],
    captureCta: "To'liq tahlilni Telegram ga yuborish",
    gateTitle: "Baholashni qayerga yuborish",
    gateSubtitle:
      "Hisob-kitob xulosasi va audit chek-listini yuboramiz. Majburiyatsiz — keyingi qadamni siz tanlaysiz.",
    emailLabel: "Email",
    emailPlaceholder: "you@company.uz",
    telegramLabel: "Telegram",
    telegramPlaceholder: "@username yoki +998…",
    gateSubmit: "Hisob-kitobni yuborish",
    gateSubmitting: "Yuborilmoqda…",
    gateSuccessTitle: "Ariza yuborildi",
    gateSuccess:
      "ROI hisob-kitobini oldik va 4 ish soati ichida javob beramiz — audit rejasi yoki loyiha muhokamasi bilan.",
    nextCtaPrimary: "Loyihani muhokama qilish",
    nextCtaSecondary: "Audit buyurtma qilish",
    cta: "Aniq hisob-kitob olish",
  },
  process: {
    title: "Joriy etish qanday kechadi",
    subtitle:
      "Beshta bosqich — diagnostikadan qo'llab-quvvatlashgacha. Texnologiya o'zini oqlash hisobidan keyin tanlanadi.",
    steps: [
      { title: "Jarayonni tahlil qilamiz", text: "Xodimlar qayerda vaqt yo'qotadi, qanday xatolar va qaysi tizimlar ishlatiladi." },
      { title: "Natijani belgilaymiz", text: "Stsenariylar, ko'rsatkichlar, muddatlar va loyiha chegaralarini aniqlaymiz." },
      { title: "Ma'lumot va tizimlarni ulaymiz", text: "CRM, 1С, pochta, hujjatlar, messenjerlar, ichki bazalar." },
      { title: "Pilotni ishga tushiramiz", text: "Haqiqiy vazifalar va istisnolarda tizimni sinab ko'ramiz." },
      { title: "Production ga kiritamiz", text: "Monitoring, hujjatlar va jamoangizga topshirishni sozlaymiz." },
    ],
  },
  deliverables: {
    label: "Artefaktlar",
    title: "Kompaniya nima oladi",
    subtitle:
      "Diplom va sertifikatlar emas — ishlab chiqishdan oldin va production dan keyin ishchi artefaktlar.",
    beforeTitle: "Ishlab chiqish boshlanishidan oldin",
    afterTitle: "Joriy etishdan keyin",
    before: [
      "Joriy jarayon va yo'qotish nuqtalari xaritasi",
      "Yo'qotishlar va kutilayotgan tejash hisobi",
      "Yechim arxitekturasi va integratsiyalar ro'yxati",
      "Qat'iy smeta va qabul qilish mezonlari",
    ],
    after: [
      "Haqiqiy ma'lumotlarda production tizimi",
      "Kod va konturga kirish",
      "Hujjatlar, loglash va monitoring",
      "Ko'rsatmalar va IT jamoasiga topshirish",
      "Ishga tushirishdan keyingi barqarorlik davri",
    ],
  },
  beforeAfterDemo: {
    label: "Oldin / Keyin",
    title: "KP avtomatlashtirish: 45 daqiqadan 2–5 daqiqaga",
    subtitle:
      "Xuddi shu jarayon — boshqa kontur. Tipik stsenariy demo: PDF so'rov → katalog → hujjat → CRM.",
    demoNote: "Interfeysning demo fragmenti — mijoz production tizimi skrinshoti emas",
    beforeLabel: "Avtomatlashtirishdan oldin",
    afterLabel: "Joriy etishdan keyin",
    beforeMetric: "~45 min",
    afterMetric: "2–5 min",
    beforeSteps: [
      { label: "Mijozdan PDF so'rov", status: "Qo'lda" },
      { label: "Katalogda pozitsiya qidirish", status: "Qo'lda" },
      { label: "Narx va QQS hisobini ko'chirish", status: "Excel / Word" },
      { label: "Word yig'ish va yuborish", status: "Pochta" },
    ],
    afterSteps: [
      { label: "PDF so'rov konturga yuklandi", status: "Kirish" },
      { label: "Katalog bilan moslashtirish", status: "Avto" },
      { label: "Holat: aniq / analog / topilmadi", status: "Tekshiruv" },
      { label: "DOCX / PDF + CRM ga yozuv", status: "Chiqish" },
    ],
    flow: ["PDF", "Katalog jadvali", "Qator holatlari", "DOCX / PDF"],
  },
  security: {
    title: "Xavfsizlik va talablarga muvofiqlik",
    items: [
      "Ish boshlanishidan oldin NDA — har bir loyiha uchun standart",
      "Sizning konturingizda joylashtirish — ma'lumotlar infratuzilmadan chiqmaydi",
      "Kirish nazorati, audit jurnallari, ma'lumotlarni shifrlash",
      "Kalitlar va modellar mijoz nazoratida — pudratchiga bog'lanmagan",
      "Monitoring, ogohlantirishlar va sanoat tizimlari uchun SLA qo'llab-quvvatlash",
      "Ma'lumotlarni qayta ishlash shartnomasi va IP topshirish har bir B2B shartnomada",
    ],
  },
  claude: {
    label: "Claude · Anthropic",
    title: "Biznes uchun Claude AI — joriy etish va avtomatlashtirish",
    subtitle:
      "Claude (API, Code, MCP) ni kompaniya jarayonlariga joriy qilamiz — CRM, hujjatlar, savdo, qo'llab-quvvatlash va bilim bazasi. Obuna sotmaymiz va shaxsiy akkauntni sozlamaymiz.",
    popularLabel: "Claude atrofida nima joriy qilamiz",
    terms: [
      "Claude AI",
      "Claude API",
      "Claude Code",
      "Claude MCP",
      "Claude Agent",
      "Claude neyron tarmoq",
      "Claude Opus",
      "Claude Sonnet",
      "Claude Pro",
      "Claude Oʻzbekistonda",
      "Anthropic API",
      "Claude Skills",
    ],
    glossaryLink: "Claude haqidagi barcha savollar — glossariyda",
    cta: "Claude joriy etishni muhokama qilish",
  },
  packages: {
    title: "Ish formatlari",
    subtitle:
      "Zina: audit, pilot, joriy etish va AI konturini doimiy qo'llab-quvvatlash. Narxlar soʻmda, boshlashdan oldin qat'iy smeta.",
    cta: "Baholash olish",
    featuredLabel: "SHUDAN BOSHLANG",
    detailsLabel: "Batafsil",
    auditNote:
      "Audit narxi joriy etishda davom etsak loyiha byudjetiga hisoblanadi. Mahalliy hosting, on-premise va xalqaro shartnoma — so'rov bo'yicha.",
    urgency:
      "Bir vaqtning o'zida cheklangan son joriy etishlar olamiz — arxitektura sifati va natija mas'uliyatini saqlash uchun. Keyingi oyna joriy tugagach ochiladi.",
    items: [
      {
        name: "Audit",
        price: "15 000 000 soʻmdan",
        duration: "1–2 hafta",
        forWhom: "Jarayonlar pul yo'qotadi — xarita va ustuvorliklar kerak",
        result: "Jarayonlar xaritasi, yo'qotish nuqtalari va avtomatlashtirish ustuvorliklari",
        includes: ["Jarayonlar va ma'lumotlar auditi", "Stsenariylar bo'yicha ROI hisobi", "Texnologiya tavsiyalari"],
        featured: true,
        tier: "audit",
        detailsHref: "/services/ai-discovery-roadmap",
      },
      {
        name: "Pilot",
        price: "30 000 000 soʻmdan",
        duration: "2–4 hafta",
        forWhom: "To'liq ishga tushirishdan oldin haqiqiy ma'lumotlarda stsenariyni tekshirish kerak",
        result: "Bitta jarayonda metrikalar va kengaytirish rejasi bilan ishchi pilot",
        includes: [
          "Haqiqiy stsenariylarda pilot",
          "Asosiy tizim bilan integratsiya",
          "Metrikalar va sanoat ishga tushirish rejasi",
        ],
        tier: "pilot",
        detailsHref: "/services/business-process-automation",
      },
      {
        name: "CRM da smeta va KP",
        price: "30 000 000 soʻmdan",
        duration: "2–4 hafta",
        forWhom: "KP avtomatlashtirish buzilgan yoki smeta → taklif → email/Telegram konturi kerak — har qanday CRM",
        result:
          "Audit → taʼmir yoki qayta yigʻish. Megaplan, Bitrix24, amoCRM. Keyslar: KP-LLM, ELIA.",
        badge: "KP · har qanday CRM",
        includes: [
          "Audit va tiklash / yangi yigʻish",
          "Smeta → KP → mijozga yuborish",
          "Bitimga yozuv, monitoring va kafolat",
        ],
        featured: true,
        tier: "implementation",
        detailsHref: "/services/crm-quote-offers",
      },
      {
        name: "Kiruvchi qoʻngʻiroqlar uchun AI",
        price: "50 000 000 soʻmdan",
        duration: "4–6 hafta",
        forWhom: "Koll-markazdan tipik kiruvchi murojaatlarni olish kerak — toʻliq almashtirishsiz",
        result:
          "Pilot: bitta stsenariy va bitta liniya. STT → niyat → javob yoki handoff → CRM tarix va analitika.",
        badge: "Koll-markaz · pilot",
        includes: [
          "Qoʻngʻiroq qabul va real vaqtda nutqni tanish",
          "Tipik savollarga javob va operatorga uzatish",
          "Dialog tarixi va murojaatlar analitikasi",
        ],
        featured: true,
        tier: "implementation",
        detailsHref: "/services/ai-inbound-calls",
      },
      {
        name: "AI-agent × 1С va CRM",
        price: "50 000 000 soʻmdan",
        duration: "4–8 hafta",
        forWhom: "Korporativ AI-agent tayyor emas — CRM, 1С, rollar, istisnolar va KPI landshaftida kerak",
        result:
          "Jarayon va huquqlar xaritasi, firma skills, 1С/legacy konektorlar, HITL; Yandex AI Studio vs private/on-prem.",
        badge: "Vendor agentiga javob",
        includes: [
          "Bitrix24/amoCRM va 1С da agent joriy etish",
          "Skills, huquqlar va human-in-the-loop",
          "Sifat, qarorlar auditi va KPI pilot",
        ],
        featured: true,
        tier: "implementation",
        detailsHref: "/services/corporate-ai-agent-1c-crm",
      },
      {
        name: "AI Meeting-to-CRM",
        price: "30 000 000 soʻmdan",
        duration: "2–4 hafta",
        forWhom: "VKS allaqachon samari qiladi — uchrashuvdan keyin vazifa, CRM va muddat nazorati kerak",
        result:
          "Uchrashuv → qarorlar → vazifalar → Bitrix24/amoCRM → hujjatlar → muddat. Telemost / Yandex 360; MTS Link, SaluteJazz, IVA360 ga moslashadi.",
        badge: "Korporativ kirish",
        includes: [
          "Telemost, MTS Link, SaluteJazz yoki IVA360 transkripti",
          "Kelishuvlar, masʼullar, muddatlar → CRM",
          "Vazifalar va follow-up — odam tasdiqlaydi",
        ],
        featured: true,
        tier: "implementation",
        detailsHref: "/services/ai-meeting-crm",
      },
      {
        name: "Savdo boʻlimi AI konturi",
        price: "30 000 000 soʻmdan",
        duration: "2–4 hafta",
        forWhom: "Telefoniya, yozishmalar, CRM va avtomatik follow-up bitta konturda kerak — alohida botlar emas",
        result:
          "Aloqa → suhbat tahlili → CRM yangilash → keyingi harakat → menejer hisoboti. Lid kvalifikatsiyasi, bazani qayta ishga tushirish, sifat nazorati, yoʻqotilgan bitimlar.",
        badge: "MSB top soʻrov",
        includes: [
          "Telefoniya + chatlar + Bitrix24/amoCRM + AI",
          "Qoʻngʻiroq samarilari va kartochkalarni avto toʻldirish",
          "Avtovazifalar, follow-up va yoʻqotilgan bitimlar hisoboti",
        ],
        featured: true,
        tier: "implementation",
        detailsHref: "/services/ai-sales-loop",
      },
      {
        name: "Bitrix24 + AI",
        price: "15 000 000 soʻmdan",
        duration: "2–8 hafta",
        forWhom: "Bitrix24 joriy etish, telefoniya+CRM+AI va 1С hamda hujjatlar bilan integratsiya kerak",
        result:
          "Ishchi portal va savdo AI konturi: qo'ng'iroqlar va chatlar → CRM da faktlar → vazifalar va follow-up → o'tkazib yuborilgan bitimlar hisoboti.",
        badge: "1С-Bitrix integrator · ID 28909898",
        includes: [
          "Bitrix24 joriy etish va sozlash",
          "Telefoniya + yozishmalar + CRM + AI bitta konturda",
          "Integratsiyalar: 1С, telefoniya, hujjatlar, KP",
        ],
        tier: "implementation",
        detailsHref: "/bitrix",
      },
      {
        name: "Sanoat joriy etish",
        price: "50 000 000 soʻmdan",
        duration: "4–12 hafta",
        forWhom: "CRM, hujjatlar, savdo yoki qo'llab-quvvatlash avtomatlashtirish",
        result: "Hujjatlar va jamoaga topshirish bilan sanoat ishga tushirish",
        includes: ["Ishlab chiqish va integratsiya", "Sinov va deploy", "Hujjatlar va jamoaga topshirish"],
        tier: "implementation",
        detailsHref: "/services/business-process-automation",
      },
      {
        name: "AI konturini qo'llab-quvvatlash",
        price: "20 000 000 soʻm/oy",
        duration: "doimiy",
        forWhom: "Ishga tushirishdan keyin uzoq muddatli texnologik hamkor — bir martalik loyiha emas",
        result:
          "Monitoring, integratsiyalar qo'llab-quvvatlash, AI sifati nazorati, xarajatlarni optimallashtirish va stsenariylarni rivojlantirish.",
        includes: [
          "Monitoring va SLA",
          "Integratsiyalar qo'llab-quvvatlash",
          "AI sifati nazorati va xarajatlarni optimallashtirish",
          "Stsenariylarni rivojlantirish",
        ],
        tier: "support",
        detailsHref: "/services/business-process-automation",
      },
    ],
  },
  pages: {
    services: {
      metaTitle: "AI va avtomatlashtirish joriy etish xizmatlari: Bitrix24, amoCRM, 1С, hujjatlar | Bober AI",
      metaDescription:
        "Bober AI Systems tijorat xizmatlari: Bitrix24 va amoCRM da savdo avtomatlashtirish, 1С integratsiyasi, hujjatlar qayta ishlash, private AI, RAG va AI konsalting. Smeta 15 000 000 soʻmdan, joriy etish 50 000 000 soʻmdan, NDA, 4 soat ichida javob.",
    },
    portfolio: {
      metaTitle: "AI va avtomatlashtirish joriy etish keyslari",
      metaDescription:
        "Bober AI Systems portfeli: Kaspersky RAG, ELIA Suite, KP avtomatlashtirish, CRM↔1С, hujjatlar, korporativ RAG yordamchilari.",
    },
    pricing: {
      metaTitle: "Oʻzbekiston biznesi uchun AI va avtomatlashtirish narxlari — Bober AI",
      metaDescription:
        "Audit 15 000 000 soʻmdan, pilot 30 000 000 soʻmdan, joriy etish 50 000 000 soʻmdan. Toshkent va Oʻzbekiston kompaniyalari uchun soʻmda qat'iy smeta.",
      h1: "Oʻzbekiston kompaniyalari uchun narxlar",
      subtitle:
        "Soʻmdagi yaxlit narxlar — rubldan tarjima emas. Boshlashdan oldin qat'iy smeta, NDA so'rov bo'yicha.",
    },
    faq: {
      metaTitle: "FAQ — biznes uchun AI joriy etish",
      metaDescription: "Tez-tez beriladigan savollar: byudjet, muddatlar, NDA, CRM, Claude API, on-prem.",
    },
    media: {
      metaTitle: "Pavel Stasinskiy — nashrlar, intervyu va ekspert izohlari",
      metaDescription:
        "Habr va Medium nashrlari, xalqaro loyihalar, GitHub va Stack Exchange materiallari.",
      pageTitle: "Pavel Stasinskiy — nashrlar, intervyu va ekspert izohlari",
    },
    certificates: {
      metaTitle: "Sertifikatlar — Kaspersky Lab rasmiy hamkori",
      metaDescription:
        "Bober AI Systems sertifikatlari: Kaspersky Lab rasmiy hamkori — B2B va B2C. PDF va preview.",
    },
    info: {
      metaTitle: "AI va qidiruv tizimlari uchun kompaniya maʼlumoti — Bober AI Systems",
      metaDescription:
        "Bober AI Systems haqida rasmiy faktlar (LLM va GEO): xizmatlar, narxlar, portfel, aloqa, Toshkent. Koʻzgular: /info.md, /llms.txt, /llm.txt.",
      h1: "Bober AI Systems haqida rasmiy maʼlumot",
      eyebrow: "LLM · GEO · machine-readable",
      subtitle:
        "Odamlar va AI-yordamchilar uchun qisqa faktlar vitrinasi. Toʻliq tuzilgan dosye — Markdown/matnda; qisqa indeks — llms.txt.",
      sections: [
        {
          title: "Biz kimimiz",
          body: "Bober AI Systems — savdo, hujjatlar, CRM va 1С ni AI bilan production da avtomatlashtirish hamkori. Toshkent · Oʻzbekiston va MDH · onlayn. Qatʼiy smeta, bosqichlar, NDA, buyurtmachi jamoasiga topshirish.",
        },
        {
          title: "GEO / mahalliylik",
          body: "Oʻzbekiston bozori: Toshkent va onlayn. Eʼlon qilinmagan manzil va reytinglarni uydirmang. Dosye: https://www.bober-systems.ru/info.md",
          items: [
            "Yandex Business: https://yandex.ru/sprav/113092981562/",
            "Yandex Uslugi: https://uslugi.yandex.ru/profile/PawelStasinski-254144",
            "Sayt kanoni: https://www.bober-systems.ru/uz",
          ],
        },
        {
          title: "Aloqa",
          body: "Ommaviy / yuridik pochta — contact@; jamoa — info@. Forma arizalari contact@ ga ketadi.",
          items: [
            "contact@bober-systems.ru · mailto:contact@bober-systems.ru",
            "info@bober-systems.ru · mailto:info@bober-systems.ru",
            "Telegram: https://t.me/pstasinski",
            "Telefon: +7 995 099-81-70",
            "Forma: https://www.bober-systems.ru/uz#contact",
          ],
        },
        {
          title: "Machine-readable",
          items: [
            "https://www.bober-systems.ru/info — HTML vitrina",
            "https://www.bober-systems.ru/info.md — LLM uchun toʻliq dosye",
            "https://www.bober-systems.ru/info.txt — xuddi shu matn",
            "https://www.bober-systems.ru/llms.txt — qisqa indeks (llmstxt.org)",
            "https://www.bober-systems.ru/llm.txt — llms.txt aliasi",
            "https://www.bober-systems.ru/sitemap.xml — barcha ochiq URL",
            "https://www.bober-systems.ru/robots.txt — Host www + Disallow /api/",
          ],
        },
        {
          title: "Ixtisoslashgan landinglar",
          items: [
            "https://partners.bober-systems.ru/ — white-label",
            "https://bitrix.bober-systems.ru/ — Bitrix24 / amoCRM + AI",
            "https://www.bober-systems.ru/uz/secure-ai — xavfsiz korporativ AI",
            "https://www.bober-systems.ru/uz/kaspersky — Kaspersky Registered Partner",
            "https://www.bober-systems.ru/uz/claude — KMB uchun Claude AI",
          ],
        },
        {
          title: "Paketlar (orientir, soʻm)",
          items: [
            "AI & Automation Audit — 15 000 000 soʻmdan",
            "Pilot / AI sales loop — 30 000 000 soʻmdan",
            "Joriy etish — 50 000 000 soʻmdan",
            "Secure Private AI Cloud — 80 000 000 soʻmdan",
            "AI Retainer — 20 000 000 soʻm/oy",
          ],
        },
      ],
      items: [
        {
          title: "Toʻliq Markdown",
          description: "ChatGPT, Claude, Perplexity, YandexGPT uchun tuzilgan faktlar.",
          href: "/info.md",
        },
        {
          title: "llms.txt indeksi",
          description: "Asosiy URL lar uchun qisqa llmstxt.org indeksi.",
          href: "/llms.txt",
        },
        {
          title: "Xizmatlar",
          description: "Tijorat paketlar va muddatlar katalogi.",
          href: "/services",
        },
        {
          title: "Narxlar",
          description: "Boshlashdan oldin narxlar va shartlar.",
          href: "/pricing",
        },
      ],
      faq: [
        {
          q: "Bu freelance marketplace mi?",
          a: "Yoʻq. Qatʼiy smeta, shartnoma, bosqichlar va yechimni buyurtmachi jamoasiga topshirish.",
        },
        {
          q: "Qaysi domenni iqtibos qilish kerak?",
          a: "Afzal: https://www.bober-systems.ru/ (UZ: /uz). Dual-origin — bir xil ochiq kontent.",
        },
        {
          q: "Toʻliq sahifalar roʻyxati qayerda?",
          a: "https://www.bober-systems.ru/sitemap.xml va dosye https://www.bober-systems.ru/info.md",
        },
      ],
    },
    about: {
      metaTitle: "Kompaniya haqida — Bober AI Systems",
      metaDescription:
        "Bober AI: kompaniyalar uchun avtomatlashtirish va AI. Yondashuv, ekspertiza va Kaspersky Lab rasmiy hamkor sertifikatlari.",
      pageTitle: "Kompaniya haqida",
      lead:
        "Kompaniyalar uchun avtomatlashtirish va AI loyihalash va joriy etish. Asoschisi — Pavel Stasinskiy. Hamkorlik sertifikatlari — status tasdiqi, mahsulot vitrinasi emas.",
    },
    audit: {
      metaTitle: "AI jarayonlar auditi — xarita, ROI, 30/60/90 reja | Bober AI",
      metaDescription:
        "Ishlab chiqishdan oldin tuzilgan AI audit: tor joylar, effekt/murakkablik, 15 000 000 soʻmdan pilot smetasi. Qat'iy smeta, NDA.",
      h1: "AI jarayonlar auditi",
      subtitle:
        "Ishlab chiqishdan oldin tuzilgan audit: tor joylar, effekt/murakkablik, 15 000 000 soʻmdan pilot smetasi.",
    },
    blog: {
      metaTitle: "Blog — AI va avtomatlashtirish joriy etish amaliyoti | Bober AI",
      metaDescription: "AI, CRM va hujjatlar avtomatlashtirish joriy etishlari amaliyoti va tahlillari.",
      h1: "Blog",
      subtitle: "Joriy etishlar amaliyoti va tahlillari.",
    },
    iiDlyaBiznesa: {
      metaTitle: "Biznes uchun AI — audit, ishlab chiqish va kalit joriy etish | Bober AI",
      metaDescription:
        "Biznes uchun AI: jarayonlar auditi, pilot va production joriy etish. CRM, hujjatlar, bilim bazasi, savdo. Qat'iy smeta, NDA.",
      h1: "Biznes uchun AI: jarayonlar auditidan ishchi joriy etishgacha",
      subtitle:
        "Tijorat landing va ekspert gid: nima sotib olish, qaysi jarayonlarni yopish, joriy etish qanday ko'rinishi, arxitektura, xavfsizlik, keyslar va byudjet oralig'i.",
    },
  },
  trust: {
    title: "Avtomatlashtirish joriy etishga ishonishadi",
    strip: [
      "AUDIT 15 000 000 SOʻMDAN",
      "PILOT 30 000 000 SOʻMDAN",
      "SANOAT JORIY ETISH 50 000 000 SOʻMDAN",
      "NDA / YOPIQ KONTUR",
    ],
    stats: [
      { value: "45→2–5 min", label: "pilotda KP tayyorlash" },
      { value: "+32%", label: "quote→buyurtma konversiyasi" },
      { value: "−50% gacha", label: "bazadagi takroriy savollar" },
      { value: "NDA", label: "so'rov bo'yicha yopiq kontur" },
    ],
    budgetStats: [
      { value: "15 mln", label: "audit" },
      { value: "30 mln", label: "pilot" },
      { value: "50 mln", label: "sanoat joriy etish" },
      { value: "NDA", label: "va so'rov bo'yicha yopiq kontur" },
    ],
    logos: ["Bitrix24", "amoCRM", "1С-Bitrix", "Kaspersky", "Yandex Cloud", "Selectel"],
    partnersAriaLabel: "Joriy etish xavfini kamaytirish",
    benefits: [
      {
        title: "Bitrix24 · amoCRM",
        text: "CRM joriy etish va avtomatlashtirish: Bitrix24 va amoCRM — 1С, telefoniya, hujjatlar, voronkalar; portal va integratsiyalar sizda qoladi.",
      },
      {
        title: "Kaspersky — himoya qatlami",
        text: "Linux, konteynerlar va bulut yuklamalarini himoya qilish AI konturi opsiyasi sifatida, alohida mahsulot emas.",
      },
      {
        title: "1С-Bitrix — hamkorlik dasturi",
        text: "1С-Bitrix hamkorlik dasturida ishtirok · ID 28909898. Bitrix24 joriy etish va CRM ustidagi AI qatlami.",
      },
      {
        title: "Telegram · WhatsApp",
        text: "Savdo va qo'llab-quvvatlash avtomatlashtirish: messenjerlar, CRM va ichki tizimlar bitta konturda.",
      },
      {
        title: "NDA boshlashdan oldin",
        text: "Arxitektura va namunalar almashishdan oldin jarayonlar va ma'lumotlarni xavfsiz muhokama qilish.",
      },
    ],
    partnerPrograms: {
      "yandex-cloud": "Yandex Cloud hamkori",
      selectel: "Selectel hamkorlik dasturi",
      cloudru: "Cloud.ru texnologik hamkori",
      kaspersky: "Kaspersky Lab rasmiy hamkori",
      bitrix: "1С-Bitrix hamkorlik dasturida ishtirok · ID 28909898",
      amocrm: "amoCRM joriy etish va integratsiyalar",
    },
  },
  about: {
    title: "Kompaniya haqida",
    tagline: "Savdo, back-office va IT uchun korporativ AI-integrator · Bober AI Systems",
    imageAlt: "Jamoa biznes jarayonlarini avtomatlashtirishni joriy etmoqda",
    text: "Bober AI Systems — korporativ AI-integrator: kompaniyalar uchun avtomatlashtirish va AI tizimlarini loyihalash va joriy etadigan jamoa. Asoschisi Pavel Stasinskiy arxitekturani boshqaradi va natija uchun shaxsan javob beradi; aniq vazifalar uchun tekshirilgan dasturchilar va infratuzilma mutaxassislari jalb qilinadi.\n\nCRM, hujjatlar, savdo, qo'llab-quvvatlash — qat'iy smeta, bosqichlar va yechimni jamoangizga topshirish bilan. Freelance marketplace yoki «ChatGPT da demo» emas: tashqi avtomatlashtirish bo'limi — audit → yo'l xaritasi → sanoat ishga tushirish → qo'llab-quvvatlash.\n\nAlohida yo'nalish — Bober Secure AI: sezgir ma'lumotli loyihalar uchun AI ni bulut yoki yopiq konturda joylashtiramiz va kirish nazorati, jurnallashtirish va infratuzilma himoyasini qo'shamiz.\n\nAvtomatlashtirish va AI joriy etish — asosiy xizmatimiz: kichik savdo jamoalari va korporativ buyurtmachilar bilan ishlaymiz, format va smeta biznes miqyosiga moslashtiriladi.\n\nArizaga javob — 4 ish soati ichida. NDA — boshlashdan oldin.",
    approach: "Yondashuv",
    approachValue: "Avval jarayon va o'zini oqlash, keyin texnologiya. Qat'iy smeta, bosqichma-bosqich topshirish, o'lchanadigan natija.",
    schedule: "Jadval",
    scheduleValue: "Dush–Jum, 4 soat ichida javob",
    collaboration: "Hamkorlik",
    collaborationSummary: "Qat'iy smeta yoki qo'llab-quvvatlash. Aktlar bilan bosqichma-bosqich topshirish.",
    collaborationDetail: "Shartnoma, NDA, kod huquqlarini topshirish — B2B uchun standart.",
    skillsTitle: "Ekspertiza",
    skills: [
      "Biznes jarayonlarini avtomatlashtirish",
      "CRM: amoCRM, Bitrix24, 1С",
      "Hujjatlar aylanishi va OCR",
      "Savdo va KP avtomatlashtirish",
      "Korporativ bilim bazasi",
      "AI agentlar va yordamchilar",
      "Yopiq kontur",
      "Bitrix24 · Telegram integratsiyasi",
    ],
    techStackTitle: "Texnologiyalar",
    techStack: "GPT · Claude · Gemini · Llama · YandexGPT · GigaChat · n8n",
    cta: "Loyihani muhokama qilish",
  },
  portfolio: {
    title: "Keyslar",
    subtitle: "KMB va korporatsiyalar uchun misollar — avval o'lchanadigan natija, keyin texnologiya",
    allCases: "Barcha keyslar",
    metricLabel: "Asosiy natija",
    stackLabel: "Stack",
    details: "Loyiha haqida batafsil",
    priceFrom: "dan",
    problemLabel: "Vazifa",
    solutionLabel: "Yechim",
    resultLabel: "Natija",
    architectureLabel: "Kontur",
    processLabel: "Jarayon qanday ishlaydi",
    productionLabel: "Oldin / keyin va sanoat kontur",
    categoriesLabel: "Yo'nalishlar",
    segmentsLabel: "Segment",
    segmentSmb: "KMB",
    segmentEnterprise: "Korporatsiyalar",
    segmentSmbTitle: "Kichik va oʻrta biznes",
    segmentEnterpriseTitle: "Korporatsiyalar",
    kindCase: "Keys",
    kindSolution: "Tipik yechim",
  },
  media: {
    label: "OAV VA OBRO'",
    title: "Pavel Stasinskiy — ekspert izohlari va OAV nashrlari",
    subtitle: "Intervyu, soha izohlari, texnik materiallar va xalqaro loyihalar tajribasi.",
    body: "Bober AI asoschisi Pavel Stasinskiy OAV da ekspert izohlari beradi, Habr va Medium da texnik maqolalar nashr etadi va xalqaro buyurtmachilar uchun loyihalar amalga oshiradi. OAV va nashrlar AI va biznes jarayonlarini joriy etish amaliy tajibini tasdiqlaydi.",
    proofItems: [
      "OAV da ekspert izohlari",
      "Habr va Medium da texnik nashrlar",
      "Xalqaro yetkazib berish tajribasi",
      "Dasturlash va AI da 10+ yil",
    ],
    tabRussian: "Xalqaro tajriba",
    tabInternational: "Xalqaro loyihalar",
    dossierCta: "Barcha nashrlar va chiqishlarni ko'rish",
    closing:
      "Nashrlar, intervyu va tasdiqlangan xalqaro loyihalar tajribasi — hamkorlikdan oldin ekspertizani baholash uchun ochiq baza.",
    asSeenIn: "Manbalar",
    videoCta: "Intervyuni ko'rish",
    articleCta: "Materjalni o'qish",
    videoAriaLabel: "{publisher} intervyusini ochish",
    articleAriaLabel: "{publisher} materiallini ochish: {title}",
    footerNote: "Ekspert izohlari, intervyu va soha chiqishlari uchun ochiq.",
    footerLinkLabel: "Mavzu taklif qilish",
  },
  partners: {
    badge: "Integratorlar va dasturlash studiyalari uchun",
    title: "White-label AI loyihalarini amalga oshirish",
    subtitle: "Siz — mijoz uchun yuz, biz — arxitektura, kod va joriy etish",
    description:
      "Texnologik hamkorliklardan alohida kontur. NDA, non-circumvention, rollar ajratish, wholesale smeta. Bitrix24, amoCRM, 1С, REST API.",
    steps: [
      {
        title: "White-label delivery",
        text: "Sizning brendingiz, bizning muhandisligimiz. NDA ostida arxitektura, kod, joriy etish va topshirish.",
      },
      {
        title: "Birgalikdagi amalga oshirish",
        text: "Bitrix24/1С integratorlari, software house va konsultantlar — rollar va mas'uliyat boshlashdan oldin belgilanadi.",
      },
      {
        title: "Referral",
        text: "Mijoz keltiring — shartlar brifdan keyin muhokama qilinadi. Shaffof, ochiq foizlarsiz.",
      },
    ],
    models: ["White-label delivery", "Birgalikdagi amalga oshirish", "Referral"],
    cta: "Hamkorlikni muhokama qilish",
    priceCta: "Hamkorlik narxlarini olish",
  },
  cta: {
    title: "Oʻzbekiston uchun loyihani muhokama qilamiz",
    subtitle:
      "Toshkent yoki masofadan. 4 ish soati ichida javob — qo'ng'iroqdan keyin 24 soat ichida soʻmda reja va byudjet oralig'i.",
    primary: "24 soat ichida reja va oralik olish",
    secondary: "Telegram",
    calendar: "Qo'ng'iroqni rejalashtirish",
  },
  contact: {
    title: "Oʻzbekiston uchun vazifani muhokama qilamiz",
    subtitle:
      "Toshkent yoki masofadan. 4 ish soati ichida javob — qo'ng'iroqdan keyin 24 soat ichida soʻmda reja va byudjet oralig'i.",
    afterSubmit:
      "4 ish soati ichida javob beramiz. 30 daqiqalik qo'ng'iroqdan keyin 24 soat ichida dastlabki reja va byudjet oralig'ini yuboramiz.",
    email: "Elektron pochta",
    telegram: "Telegram",
    whatsapp: "WhatsApp",
    phone: "Telefon",
    linkedin: "LinkedIn",
    github: "GitHub",
    modalClose: "Yopish",
    fabLabel: "Baholash olish",
    modalChannels: "Yoki to'g'ridan-to'g'ri yozing",
    modalFormDivider: "Yoki baholash arizasi",
    intentTitle: "Loyiha baholashini olish",
    intentSubtitle:
      "4 ish soati ichida javob beramiz. 30 daqiqalik qo'ng'iroqdan keyin 24 soat ichida dastlabki reja va byudjet oralig'ini yuboramiz.",
    intentOffer: "Majburiyatsiz · ROI yo'nalishi · NDA so'rov bo'yicha",
    intentDefaultService: "30 daqiqalik loyiha baholash",
  },
  order: {
    title: "Buyurtma berish",
    subtitle:
      "Bu xizmat buyurtmasi formasi. Kontaktlarni qoldiring — ishlar tarkibi va muddatlarni tasdiqlaymiz.",
    sectionHint:
      "Buyurtma uchun maydonlarni toʻldiring. Bu baholash emas — baholash uchun «Baholash olish» tugmasidan foydalaning.",
    estimateCta: "Buyurtma emas, loyiha baholashi kerakmi?",
    estimateLink: "Baholash olish",
    metaLabel: "Xizmat buyurtmasi",
  },
  form: {
    intro: "Ism va aloqa — birinchi qadam uchun yetarli. Vazifa tavsifi ixtiyoriy.",
    introShort:
      "4 ish soati ichida javob beramiz. 30 daqiqalik qo'ng'iroqdan keyin 24 soat ichida dastlabki reja va byudjet oralig'ini yuboramiz.",
    orderIntro:
      "Buyurtma: ism va aloqa majburiy. Nima joriy qilish kerakligini qisqacha yozing.",
    orderIntroShort:
      "Xizmat buyurtmasi arizasi. 4 ish soati ichida javob beramiz va keyingi qadamni tasdiqlaymiz.",
    name: "Ism",
    company: "Kompaniya",
    phone: "Telefon yoki Telegram",
    phonePlaceholder: "+998… yoki @telegram",
    email: "Email",
    emailPlaceholder: "you@company.uz",
    contact: "Email yoki telefon",
    contactPlaceholder: "you@company.uz yoki +998…",
    message: "Vazifaning qisqa tavsifi",
    messagePlaceholder: "Masalan: PDF dan KP CRM ga, Bitrix24 va 1С sinxronizatsiyasi",
    orderMessage: "Nima buyurtma qilasiz",
    orderMessagePlaceholder: "Masalan: AI-yordamchi joriy etish, hujjatlar avtomatlashtirish",
    deployment: "Tizim qayerda ishlashi kerak",
    deploymentOptions: ["Bulut", "On-premise", "Gibrid"],
    kasperskyNeed: "Infratuzilma ixtiyoriy himoyasi kerakmi (Kaspersky)",
    kasperskyOptions: ["Ha", "Yo'q", "Muhokama qilamiz"],
    selectPlaceholder: "Variantni tanlang",
    qualifyLegend: "Uchrashuvdan oldin (ixtiyoriy)",
    qualifyHint: "Qisqa javoblar muddat va byudjetni aniqroq baholashga yordam beradi — o'tkazib yuborish mumkin.",
    processType: "Jarayon turi",
    systems: "Tizimlar",
    budget: "Byudjet",
    timeline: "Muddatlar",
    processOptions: [
      "Savdo / KP",
      "Hujjatlar / OCR",
      "CRM / 1С",
      "Qo'llab-quvvatlash",
      "Bilim bazasi / RAG",
      "Boshqa",
    ],
    systemsOptions: ["Bitrix24", "amoCRM", "1С", "Excel / pochta", "Bir nechta tizim", "O'z tizimi"],
    budgetOptions: [
      "30 000 000 soʻmgacha",
      "30–50 000 000 soʻm",
      "50–100 000 000 soʻm",
      "100 000 000 soʻmdan ortiq",
      "Baholash kerak",
    ],
    timelineOptions: ["Imkon qadar tez", "1–2 oy", "Chorak", "Hali o'rganmoqdamiz"],
    optional: "(ixtiyoriy)",
    consentCombined: "Men tanishman",
    policyLink: "shaxsiy ma'lumotlarni qayta ishlash siyosati",
    consentAnd: "va beraman",
    consentLink: "shaxsiy ma'lumotlarni qayta ishlashga rozilik",
    submit: "Baholash olish",
    orderSubmit: "Buyurtmani yuborish",
    submitting: "Yuborilmoqda…",
    successTitle: "Ariza yuborildi",
    success:
      "Arizani oldik va 4 ish soati ichida javob beramiz — keyingi qadam rejasi va byudjet yo'nalishi bilan.",
    orderSuccess:
      "Buyurtma qabul qilindi. 4 ish soati ichida javob beramiz va ishlar tarkibi, muddatlar va keyingi qadamni tasdiqlaymiz.",
    errorConsent: "Shaxsiy ma'lumotlarni qayta ishlashga rozilikni tasdiqlang",
    errorSend: "Arizani yuborib bo'lmadi",
    errorGeneric: "Yuborish xatosi",
    mailtoFallbackHint: "Yuborish ishlamasa, arizani qo'lda yuboring:",
    mailtoFallbackLink: "pochta klientini ochish",
    payloadSubjectService: "Ariza: {service}",
    payloadSubjectDefault: "Bober AI saytidan ariza",
    payloadName: "Ism: {name}",
    payloadPhone: "Telefon / Telegram: {value}",
    payloadEmail: "Email: {value}",
    payloadContact: "Aloqa: {value}",
    payloadService: "Xizmat: {value}",
    payloadCompany: "Kompaniya: {value}",
    payloadProcess: "Jarayon: {value}",
    payloadSystems: "Tizimlar: {value}",
    payloadBudget: "Byudjet: {value}",
    payloadTimeline: "Muddatlar: {value}",
    payloadDeployment: "Kontur: {value}",
    payloadKaspersky: "Opsiya: infratuzilma himoyasi (Kaspersky)",
  },
  footer: {
    legalName: "ИП Стасиньски Павел Кшиштоф",
    terms: "Xizmat ko'rsatish shartlari",
    privacy: "Shaxsiy ma'lumotlarni qayta ishlash siyosati",
    consent: "Shaxsiy ma'lumotlarni qayta ishlashga rozilik",
    profiles: "Profillar va verifikatsiya",
    sectionsTitle: "Sayt bo'limlari",
    sqiTitle: "Yandex sayt sifati indeksi (ИКС)",
    sqiAlt: "Yandex sayt sifati indeksi",
    sqiAltDark: "Yandex ИКС — qorong'u mavzu",
    sqiAltLight: "Yandex ИКС — yorug' mavzu",
    presence: {
      linkedin: "LinkedIn",
      github: "GitHub",
      yandexReviews: "Yandex sharhlari",
      yandexMaps: "Yandex Xaritalar",
      yandexBusiness: "Yandex Business",
      yandexCloud: "Yandex Cloud hamkorlar katalogi",
      bitrixPartner: "1С-Bitrix hamkor kartochkasi",
      kasperskyPartner: "Kaspersky sertifikatlari",
      selectel: "Selectel hamkorlik dasturi",
      cloudru: "Cloud.ru hamkorlar katalogi",
    },
  },
  common: {
    siteName: "Bober AI Systems",
    online: "Onlayn",
    readMore: "Batafsil",
    viewCaseStudy: "Keysni ko'rish",
  },
  banner: {
    badge: "Integratorlar uchun",
    title: "Hamkorlar uchun white-label delivery",
    text: "Sizning brendingiz, bizning muhandisligimiz. NDA ostida subpudrat — shartlar loyiha bo'yicha muhokama qilinadi.",
    cta: "Hamkorlikni muhokama qilish",
    more: "Batafsil",
    close: "Yopish",
  },
  servicePage: {
    back: "Barcha yechimlar",
    includes: "Nima kiradi",
    deliverables: [
      "Vazifa auditi va TZ kelishuvi",
      "Yechim ishlab chiqish va sozlash",
      "Sinov va sanoat ishga tushirish",
      "Hujjatlar va jamoaga topshirish",
    ],
    timeline: "Muddat",
    days: "kun",
    quote: "Loyihani muhokama qilish",
    telegram: "Telegram",
    formTitle: "Yoki ariza qoldiring",
    listTitle: "Biznes vazifalari bo'yicha yechimlar",
  },
  partnersPage: {
    title: "Hamkorlar",
    subtitle: "Texnologik hamkorlar · Integratorlar va agentliklar — white-label AI",
    metaDescription:
      "Bober AI Systems bilan hamkorlik: integratorlar va agentliklar uchun white-label avtomatlashtirish joriy etish; alohida — Yandex / Kaspersky / 1С-Bitrix texnologik statuslari. Qat'iy smeta, NDA.",
  },
  microConversions: {
    label: "Keyingi qadam",
    title: "To'liq joriy etishga tayyor emassiz — kichikdan boshlang",
    subtitle:
      "Majburiyatsiz format tanlang. 4 ish soati ichida javob beramiz. 30 daqiqalik qo'ng'iroqdan keyin 24 soat ichida dastlabki reja va byudjet oralig'ini yuboramiz.",
    items: [
      {
        title: "Qo'ng'iroqni rejalashtirish",
        description:
          "30 daqiqalik qo'ng'iroq: vazifa va jarayonlarni tahlil qilamiz. Keyin — 24 soat ichida reja va byudjet oralig'i.",
        cta: "Qo'ng'iroqni rejalashtirish",
        service: "Discovery qo'ng'iroq",
      },
      {
        title: "Baholash olish",
        description:
          "4 ish soati ichida javob beramiz. Dastlabki reja va byudjet oralig'i — qo'ng'iroqdan keyin 24 soat ichida.",
        cta: "Baholash olish",
        service: "Loyiha baholash",
      },
      {
        title: "AI audit",
        description: "Jarayonlar xaritasi, yo'qotish nuqtalari va o'zini oqlash hisobi — 15 000 000 soʻmdan.",
        cta: "Audit buyurtma qilish",
        service: "AI audit",
      },
      {
        title: "Arxitektura review",
        description: "Kengaytirishdan oldin joriy sxema, integratsiyalar va xavflarni tahlil qilish.",
        cta: "Baholash olish",
        service: "Arxitektura review",
      },
    ],
  },
  sectionCta: {
    title: "Qo'ng'iroqqa yoziling — 30 daqiqa",
    duration: "30 daqiqa",
    commitment: "majburiyatsiz",
    format: "onlayn",
    cta: "Baholash olish",
    urgency:
      "Arizadan keyin: qisqa brif → 24 soat ichida dastlabki reja va byudjet oralig'i. NDA — ma'lumot almashishdan oldin so'rov bo'yicha.",
  },
  diagnosticForm: {
    eyebrow: "Dastlabki baholash",
    title: "Ariza qoldiring — 4 ish soati ichida javob beramiz",
    progressLabel: "Qadam {current} / {total}",
    back: "Orqaga",
    finalCta: "Baholash olish",
    steps: [
      {
        question: "Nimani yaxshilamoqchisiz?",
        options: [
          "Savdo va arizalar qayta ishlash",
          "Hujjatlar va tijorat takliflari",
          "CRM yoki 1С",
          "Xodimlar qo'llab-quvvatlash",
          "Boshqa jarayon",
        ],
      },
      {
        question: "Ish hozir qayerda bajariladi?",
        options: [
          "Bitrix24",
          "amoCRM",
          "1С",
          "Excel / Google Sheets",
          "Pochta va messenjerlar",
          "O'z tizimi",
        ],
      },
      {
        question: "Asosiy natija nima kerak?",
        options: [
          "Qo'lda ishni qisqartirish",
          "Javoblarni tezlashtirish",
          "Xatolarni kamaytirish",
          "Ko'rsatkichlarni nazorat qilish",
          "Mavjud yechimni almashtirish",
        ],
      },
      {
        question: "Miqyos",
        options: ["10 xodimgacha", "10–50", "50–200", "200 dan ortiq"],
      },
      {
        question: "Taxminiy byudjet",
        options: [
          "30 000 000 soʻmgacha",
          "30 000 000–50 000 000 soʻm",
          "50 000 000–100 000 000 soʻm",
          "100 000 000 soʻmdan ortiq",
          "Avval baholash kerak",
        ],
      },
    ],
  },
  career: {
    navLabel: "Karyera",
    metaTitle: "Karyera — Sales, AI Engineer, 1С konsultant vakansiyalari",
    metaDescription:
      "Bober AI Systems vakansiyalari: AI loyihalar bo'yicha Sales / BD, AI Engineer va 1С konsultant. Masofadan, B2B, joriy etish jamoasi.",
    label: "Karyera",
    title: "Bober AI jamoasida ochiq rollar",
    lead: "AI loyihalar savdosi, engineering va 1С konturiga kuchli odamlar qidiryapmiz. Asoschisi arxitekturani boshqaradi — delivery mutaxassislar jamoasi bilan quramiz.",
    responsibilitiesLabel: "Vazifalar",
    requirementsLabel: "Kutilmalar",
    applyTelegram: "Telegram orqali javob berish",
    applyEmail: "Rezyume yuborish",
    perksLabel: "Qanday ishlaymiz",
    perksTitle: "Javob berishdan oldin bilish muhim",
    perks: [
      {
        title: "Jamoa, solo emas",
        description: "Asoschisi arxitektura uchun javob beradi; muhandislar va mutaxassislar konturlar bo'yicha delivery ni yopadi.",
      },
      {
        title: "Haqiqiy B2B loyihalar",
        description: "CRM, hujjatlar, RAG, private LLM — o'lchanadigan ROI uchun joriy etish, demo uchun demo emas.",
      },
      {
        title: "Shaffof javob",
        description: "Telegram yoki email da tajriba bilan qisqa xabar — rol tafsilotlari bilan javob beramiz.",
      },
    ],
    roles: [
      {
        id: "sales",
        title: "Sales / Business Development (AI)",
        department: "Sales",
        type: "Masofadan · B2B",
        summary:
          "Kompaniyalar uchun AI va avtomatlashtirish joriy etish bo'yicha savdo va bitimlar rivojlantirish: audit, pilot, sanoat konturi.",
        responsibilities: [
          "Kiruvchi va chiquvchi lidlarni kvalifikatsiya qilish",
          "Arxitektor presale bilan imzolashgacha bitimlarni yuritish",
          "Keyslar va narxlar asosida KP tayyorlash",
        ],
        requirements: [
          "Murakkab xizmatlar yoki IT B2B savdo tajribasi",
          "Faqat texnologiya emas, biznes tilida gaplashish",
          "CRM/voronkada mustaqillik va intizom",
        ],
        applySubject: "Karyera — Sales AI",
      },
      {
        id: "ai-engineer",
        title: "AI Engineer",
        department: "Engineering",
        type: "Masofadan · loyiha / pudrat",
        summary: "AI konturlari ishlab chiqish: yordamchilar, RAG, agentlar, CRM/ERP va hujjatlar bilan integratsiyalar.",
        responsibilities: [
          "RAG / agent stsenariylarini loyihalash va amalga oshirish",
          "Bitrix24, amoCRM, 1С, buyurtmachi API bilan integratsiyalar",
          "Arxitektor bilan sifat, loglar, qabul qilish mezonlari",
        ],
        requirements: [
          "LLM API, embeddings, ma'lumotlar qayta ishlash pipeline tajribasi",
          "Ishonchli backend (Python/TS) va API bilan ishlash",
          "Production cheklovlari: xatolar, idempotentlik, monitoring",
        ],
        applySubject: "Karyera — AI Engineer",
      },
      {
        id: "1c-consultant",
        title: "1С konsultant",
        department: "1С",
        type: "Masofadan · loyiha / pudrat",
        summary:
          "CRM va avtomatlashtirish bilan bog'langan 1С konsalting va joriy etish: ma'lumot almashinuvi, qayta ishlash, buyurtmachi konturini qo'llab-quvvatlash.",
        responsibilities: [
          "Buyurtmachi jarayonlarini tahlil qilish va 1С konfiguratsiyalarini sozlash / qayta ishlash",
          "1С ↔ CRM (Bitrix24, amoCRM) integratsiyalari va aloqa konturlari",
          "Hujjatlar, foydalanuvchilarni o'qitish va konturni buyurtmachi jamoasiga topshirish",
        ],
        requirements: [
          "1С joriy etish yoki qo'llab-quvvatlash tajribasi (UT, ERP, Buxgalteriya yoki soha)",
          "Almashinuvlar, API/COM/HTTP xizmatlar va CRM↔1С tipik stsenariylari tushunchasi",
          "Biznes bilan gaplashish: talablar, muddatlar, qabul qilish mezonlari",
        ],
        applySubject: "Karyera — 1С konsultant",
      },
    ],
  },
  faq: {
    label: "FAQ",
    title: "Tez-tez beriladigan savollar",
    subtitle: "Xarid, IT va biznes egalari uchun javoblar.",
    items: [
      {
        q: "AI joriy etish qancha turadi?",
        a: "Audit — 15 000 000 soʻmdan. Pilot — 30 000 000 soʻmdan. Sanoat joriy etish — 50 000 000 soʻmdan. Ishlab chiqish boshlanishidan oldin qat'iy smeta.",
      },
      {
        q: "Pilot yoki auditni qanday sotib olish mumkin?",
        a: "Ariza qoldiring yoki Telegram ga yozing. 4 ish soati ichida javob beramiz. 30 daqiqalik qo'ng'iroqdan keyin 24 soat ichida dastlabki reja va byudjet oralig'ini yuboramiz.",
      },
      {
        q: "Joriy etish qancha vaqt oladi?",
        a: "Diagnostika: 1–2 hafta. Prototip: 2–4 hafta. Sanoat ishga tushirish: 4–12 hafta — integratsiyalar va ma'lumot talablariga bog'liq.",
      },
      {
        q: "amoCRM, Bitrix24 va 1С bilan integratsiya qilinadimi?",
        a: "Ha. CRM/ERP — asosiy kompetensiya: ikki tomonlama sinxronizatsiya, webhooks, hujjatlar aylanishi, nosozliklarda retry.",
      },
      {
        q: "O'z konturimda joylashtirish mumkinmi?",
        a: "Ha. On-prem, izolyatsiya qilingan VPC, mahalliy hosting, gibrid — ma'lumotlar sizning infratuzilmangizda qoladi.",
      },
      {
        q: "AI qachon haqiqatan mantiqli?",
        a: "Qo'lda mehnat takrorlansa, hujjatlar tuzilmagan yoki qo'llab-quvvatlash hajmi yuqori bo'lganda. Xaypdan emas, ROI hisobidan boshlaymiz.",
      },
      {
        q: "AI xato qilsa nima bo'ladi?",
        a: "Human-in-the-loop, ishonch chegaralari, harakatlar jurnali va xodimga eskalatsiya qo'shamiz. Muhim operatsiyalar — faqat inson tasdiqi bilan.",
      },
      {
        q: "Maxfiy ma'lumotlar bilan ishlaydimi?",
        a: "Boshlashdan oldin NDA, DPA, shifrlash, audit jurnallari. Kalitlar va modellar mijoz nazoratida.",
      },
      {
        q: "Qaysi kompaniyalar bilan ishlaysiz?",
        a: "O'rta va yirik biznes, CRM/ERP integratorlari va dasturlash studiyalari — NDA ostida sanoat AI joriy etish kerak bo'lganlar, bir martalik chatbot demolar emas.",
      },
      {
        q: "Birinchi qo'ng'iroqdan oldin NDA imzolaysizmi?",
        a: "Ha. NDA — arxitektura, ma'lumot namunalari yoki ichki hujjatlar almashishdan oldin standart.",
      },
      {
        q: "Tipik loyiha byudjeti qanday?",
        a: "Audit — 15 000 000 soʻmdan, pilot — 30 000 000 soʻmdan, sanoat joriy etish — 50 000 000 soʻmdan. Ishlab chiqish boshlanishidan oldin smetani belgilaymiz — yashirin bosqichsiz.",
      },
      {
        q: "Joriy etish qancha davom etadi?",
        a: "Yuqoridagi javobga qarang. Muddat integratsiyalar soni va compliance talablariga bog'liq.",
      },
      {
        q: "Qaysi LLM provayderlaridan foydalanasiz?",
        a: "Claude, OpenAI, YandexGPT, GigaChat — compliance, til va narx bo'yicha. API kalitlari va infratuzilma mijozda bo'lishi mumkin.",
      },
      {
        q: "RAG nima va qachon tavsiya qilasiz?",
        a: "Retrieval-Augmented Generation LLM ni hujjatlaringizga ulaydi. Qo'llab-quvvatlash, savdo va ichki bilim bazalari uchun tavsiya qilamiz.",
      },
      {
        q: "AI agentlar quriladimi yoki faqat chatbotlar?",
        a: "Ikkalasi ham — lekin harakatli agentlarga e'tibor: CRM yangilash, hujjat yaratish, zanjirlarni ishga tushirish, insonga eskalatsiya.",
      },
      {
        q: "n8n yoki mavjud avtomatlashtirish bilan integratsiya qilasizmi?",
        a: "Ha. n8n, Zapier yoki zanjirlaringizni AI qatlami va API integratsiyalari bilan kengaytiramiz.",
      },
      {
        q: "GDPR va ma'lumotlarni himoya qilishni qanday ta'minlaysiz?",
        a: "DPA, roziliklar, saqlash siyosatlari, go-live dan oldin arxitektura review. Oʻzbekiston joriy etishlari — mahalliy talablarga mos.",
      },
      {
        q: "SLA va monitoring berasizmi?",
        a: "Ha — ishga tushirishdan keyin ixtiyoriy qo'llab-quvvatlash: monitoring, ogohlantirishlar, iteratsiya backlog, reaksiya vaqti kelishuvlari.",
      },
      {
        q: "Kod va IP kimga tegishli?",
        a: "Shartnomaga ko'ra mijozga. Repozitoriyalar, hujjatlar va deploy runbook topshiramiz.",
      },
      {
        q: "Integratorlar uchun white-label bormi?",
        a: "Ha. Hamkor — mijoz uchun yuz, biz NDA ostida PM va muhandislaringiz uchun hujjatlar bilan joriy qilamiz.",
      },
      {
        q: "Birinchi hamkorlik qanday ko'rinadi?",
        a: "30 daqiqalik discovery → AI & Automation Audit → qat'iy roadmap va smeta → aktlar bilan bosqichma-bosqich joriy etish.",
      },
      {
        q: "Muvaffaqiyatsiz AI pilotni qutqara olasizmi?",
        a: "Ko'pincha ha. Arxitektura, ma'lumot sifati va integratsiyalar auditidan keyin o'lchanadigan KPI bilan sanoat ishga tushirish uchun qayta yig'amiz.",
      },
      {
        q: "Voice AI va call-center qo'llab-quvvatlanadimi?",
        a: "Ha — speech-to-text, ovozli botlar, kiruvchi va chiquvchi qo'ng'iroqlar uchun CRM ga loglash.",
      },
      {
        q: "OCR va hujjatlar qayta ishlash qanday?",
        a: "Hisob-fakturalar, shartnomalar va skanlar uchun OCR pipeline — maydonlarni ajratish va 1С, CRM yoki ERP ga yuklash.",
      },
      {
        q: "Open WebUI yoki self-hosted LLM joylashtirasizmi?",
        a: "Ha. Open WebUI, private modellar, guardrails va ichki jamoalar uchun SSO bilan self-hosted stacklar.",
      },
      {
        q: "MCP nima va uni joriy qilasizmi?",
        a: "Model Context Protocol LLM ni vositalar va ma'lumot manbalariga ulaydi. CRM, DB va ichki API uchun MCP serverlar quramiz.",
      },
      {
        q: "Agentlar uchun LangGraph ishlatasizmi?",
        a: "Ha, murakkablik oddiy zanjirlardan yuqori bo'lganda — state, human-in-the-loop va observability bilan ko'p bosqichli agentlar uchun.",
      },
      {
        q: "ROI ni qanday o'lchaysiz?",
        a: "Ishga tushirishdan oldin qo'lda mehnat soatlari, xatolar va konversiya. 30/60/90 kun ichida delta haqida hisobot beramiz.",
      },
      {
        q: "Qaysi sohalarda allaqachon joriy qildingiz?",
        a: "Kiberxavfsizlik (Kaspersky mahsulotlari bo'yicha RAG bot), B2B savdo, qonunchilik monitoringi, ta'lim, bank OAV, integratorlarga subpudrat.",
      },
      {
        q: "Yangi so'rovlarga qanchalik tez javob berasiz?",
        a: "4 ish soati ichida. Dastlabki scope va smeta — discovery qo'ng'iroqdan keyin 24 soat ichida.",
      },
      {
        q: "Kaspersky rasmiy hamkorisizmi?",
        a: "Ha. Bober AI Kaspersky Lab rasmiy hamkori va korporativ Kaspersky mahsulotlarini rasmiy yetkazib berishi mumkin. Bu AI loyihalariga qo'shimcha opsiya — asosiy ixtisoslik emas.",
      },
      {
        q: "AI joriy etish loyihasiga Kaspersky qo'shish mumkinmi?",
        a: "Ha. Kaspersky yechimlari buyurtmachi kerak bo'lganda serverlar, ish stollari, virtual va bulut infratuzilmasini himoya qilish uchun umumiy arxitekturaga kiritilishi mumkin.",
      },
      {
        q: "Faqat Kaspersky mahsulotlarini joriy qilasizmi?",
        a: "Yo'q. Bober AI asosiy ixtisosligi — korporativ AI tizimlari, avtomatlashtirish va integratsiyalar. Kaspersky kerak bo'lganda infratuzilma qismi sifatida ishlatiladi.",
      },
      {
        q: "Buyurtmachi konturida o'rnatish mumkinmi?",
        a: "Ha. On-premise, mahalliy bulutlar va gibrid arxitekturalar qo'llab-quvvatlanadi.",
      },
      {
        q: "Faqat litsenziyalarni sotib olish mumkinmi?",
        a: "Ha, lekin Bober AI asosiy qiymati — yechim tanlash, arxitektura, joriy etish, integratsiya va AI hamda avtomatlashtirish qo'llab-quvvatlash.",
      },
    ],
  },
} as const;

const uz = deepMerge(
  deepMerge(ru, uzOverrides as DeepPartial<typeof ru>),
  uzExtra as DeepPartial<typeof ru>,
);
export default uz;
