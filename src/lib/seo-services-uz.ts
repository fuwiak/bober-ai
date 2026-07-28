import type { SeoServiceContent } from "./seo-services-content";

/** Full Uzbek (Latin) SEO service pages — UZS pricing, UZ market framing. */
export const CONTENT_UZ: Record<string, SeoServiceContent> = {
  "business-process-automation": {
    "problemsTitle": "Tipik muammolar",
    "deliverablesTitle": "Nima olasiz",
    "howWeSolveTitle": "Qanday ishlaymiz",
    "architectureTitle": "Tipik arxitektura",
    "roiTitle": "Orientir effekt",
    "faqTitle": "Tez-tez beriladigan savollar",
    "eyebrow": "Xizmat · Offer",
    "metaTitle": "Biznes-jarayonlarni avtomatlashtirish — smeta va SLA | Bober AI",
    "metaDescription": "Audit 15 000 000 soʻmdan, joriy etish 50 000 000 soʻmdan. Qatʼiy smeta, NDA, production. Toshkent va Oʻzbekiston.",
    "h1": "Biznes-jarayonlarni avtomatlashtirish buyurtmasi",
    "subtitle": "Xizmat sahifasi: smeta, bosqichlar va SLA. Yoʻnalishlar sharhi — /uz/automation.",
    "problems": [
      "Menejerlar CRM ni chetlab Excel, Telegram va pochtada bitim yuritadi",
      "Bir xil buyurtma CRM, 1С va hujjatlarga qoʻlda kiritiladi",
      "Kelishuvlar marshrut va bildirishnomasiz kunlar oladi",
      "Rahbariyat tor joylarni koʻrmaydi — yagona jarayon manzarasi yoʻq"
    ],
    "deliverables": [
      "Jarayonlar xaritasi va 2–3 stsenariy boʻyicha ROI",
      "CRM, ERP, hujjatlar va messenjerlar integratsiya arxitekturasi",
      "Logging, retry va monitoring bilan production workflow",
      "Hujjatlar, jamoa oʻqitish va kengaytirish rejasi"
    ],
    "intro": [
      "Bu yerda joriy etish buyurtmasi: smeta, muddatlar va SLA. Yoʻnalishlar — /uz/automation.",
      "Avtomatlashtirishni platformadan emas, haqiqiy oqimdan boshlash kerak: CRM, pochta, messenjerlar, jadvallar va hisob.",
      "Jarayonlarni tahlil qilamiz, oʻzini oqlashni hisoblaymiz, integratsiyalarni loyihalaymiz va production gacha yetkazamiz. NDA va on-prem — oddiy qism.",
      "AI faqat qoʻlda mehnatni haqiqatan kamaytiradigan joyda. Koʻpincha asosiy yutuq — integratsiyalar, workflow va qoidalar."
    ],
    "howWeSolve": [
      {
        "title": "Audit va ROI",
        "text": "Jarayon egalaridan intervyu, oqimlar xaritasi, yoʻqotish nuqtalari. Stsenariylarni oʻzini oqlash boʻyicha ustuvorlashtirish."
      },
      {
        "title": "Arxitektura",
        "text": "Stack tanlash: CRM, workflow, API, AI qatlam. Integratsiyalar spetsifikatsiyasi — ishlab chiqishdan oldin."
      },
      {
        "title": "Ishlab chiqish va integratsiyalar",
        "text": "amoCRM, Bitrix24, 1С, Telegram, hujjatlar va ichki API. Navbatlar, idempotentlik, jurnal."
      },
      {
        "title": "Production va topshirish",
        "text": "Deploy, monitoring, hujjatlar, oʻqitish. Go-live dan keyin SLA qoʻllab-quvvatlash — ixtiyoriy."
      }
    ],
    "architecture": [
      "CRM/ERP — bitim va buyurtmalar boʻyicha yagona haqiqat manbai",
      "Workflow qatlam: hodisalar → qoidalar → vazifalar va bildirishnomalar",
      "API shlyuz: navbat, retry va operatsiyalar auditi",
      "Hujjatlar: shablonlar, PDF/DOCX, CRM entity ga bogʻlash",
      "Ixtiyoriy AI qatlam — tasniflash, ajratish, matn"
    ],
    "roi": [
      {
        "value": "40–80%",
        "label": "rutina boʻyicha vaqt tejash (stsenariyga bogʻliq)"
      },
      {
        "value": "3–6 oy",
        "label": "tipik oʻzini oqlash oraligʻi"
      },
      {
        "value": "50 mln+",
        "label": "soʻm — sanoat joriy etishdan"
      }
    ],
    "faq": [
      {
        "q": "Narx oraligʻi qanday?",
        "a": "Audit 15 000 000 soʻmdan, pilot 30 000 000 soʻmdan, joriy etish 50 000 000 soʻmdan. Aniq smeta — discovery dan keyin."
      },
      {
        "q": "NDA va yopiq kontur bormi?",
        "a": "Ha. NDA standart; on-premise yoki mahalliy bulut — soʻrov boʻyicha."
      },
      {
        "q": "Muddat?",
        "a": "Pilot odatda 2–6 hafta; toʻliq production integratsiyalar soniga bogʻliq."
      },
      {
        "q": "Kod kimga tegishli?",
        "a": "Shartnomaga koʻra buyurtmachiga — topshirish va hujjatlar bilan."
      }
    ],
    "related": [
      {
        "href": "/services/crm-integration",
        "label": "CRM integratsiya"
      },
      {
        "href": "/services/document-processing",
        "label": "Hujjatlar"
      },
      {
        "href": "/services/sales-ai-agent",
        "label": "Savdo AI"
      },
      {
        "href": "/pricing",
        "label": "Narxlar"
      }
    ],
    "caseStudySlugs": [
      "kp-llm-automation",
      "crm-1c-sync",
      "invoice-processing-pipeline"
    ]
  },
  "ai-sales-loop": {
    "problemsTitle": "Tipik muammolar",
    "deliverablesTitle": "Nima olasiz",
    "howWeSolveTitle": "Qanday ishlaymiz",
    "architectureTitle": "Tipik arxitektura",
    "roiTitle": "Orientir effekt",
    "faqTitle": "Tez-tez beriladigan savollar",
    "eyebrow": "Xizmat · Offer",
    "metaTitle": "Savdo AI konturi: telefoniya, CRM va follow-up | Bober AI",
    "metaDescription": "Qoʻngʻiroqlar, yozishmalar, Bitrix24/amoCRM va avtomatik keyingi qadamlar — bitta mahsulot. 30 000 000 soʻmdan.",
    "h1": "Savdo boʻlimi AI konturi",
    "subtitle": "Alohida botlar emas — telefoniya + CRM + AI bitta konturda.",
    "problems": [
      "Qoʻngʻiroq samarilari CRM ga tushmaydi",
      "Follow-up unutiladi — lidlar sovib ketadi",
      "Sifat nazorati qoʻlda va kechikadi"
    ],
    "deliverables": [
      "Lidlar kvalifikatsiyasi va qoʻngʻiroq samarilari",
      "CRM da avtovazifalar va follow-up",
      "Oʻtkazib yuborilgan bitimlar hisoboti"
    ],
    "intro": [
      "Savdo konturi: qoʻngʻiroq → faktlar CRM da → vazifa → follow-up.",
      "Bitrix24 yoki amoCRM ustida AI qatlam — BitrixGPT ni almashtirish emas, kuchaytirish."
    ],
    "howWeSolve": [
      {
        "title": "Audit va ROI",
        "text": "Jarayon egalaridan intervyu, oqimlar xaritasi, yoʻqotish nuqtalari. Stsenariylarni oʻzini oqlash boʻyicha ustuvorlashtirish."
      },
      {
        "title": "Arxitektura",
        "text": "Stack tanlash: CRM, workflow, API, AI qatlam. Integratsiyalar spetsifikatsiyasi — ishlab chiqishdan oldin."
      },
      {
        "title": "Ishlab chiqish va integratsiyalar",
        "text": "amoCRM, Bitrix24, 1С, Telegram, hujjatlar va ichki API. Navbatlar, idempotentlik, jurnal."
      },
      {
        "title": "Production va topshirish",
        "text": "Deploy, monitoring, hujjatlar, oʻqitish. Go-live dan keyin SLA qoʻllab-quvvatlash — ixtiyoriy."
      }
    ],
    "architecture": [
      "Telefoniya / yozishmalar → transkript / samari",
      "CRM yozuvlari va bosqich qoidalari",
      "AI: kvalifikatsiya, keyingi qadam, sifat signalilari"
    ],
    "roi": [
      {
        "value": "2–4 hafta",
        "label": "pilot"
      },
      {
        "value": "30 mln+",
        "label": "soʻm — tipik kirish"
      }
    ],
    "faq": [
      {
        "q": "Narx oraligʻi qanday?",
        "a": "Audit 15 000 000 soʻmdan, pilot 30 000 000 soʻmdan, joriy etish 50 000 000 soʻmdan. Aniq smeta — discovery dan keyin."
      },
      {
        "q": "NDA va yopiq kontur bormi?",
        "a": "Ha. NDA standart; on-premise yoki mahalliy bulut — soʻrov boʻyicha."
      },
      {
        "q": "Muddat?",
        "a": "Pilot odatda 2–6 hafta; toʻliq production integratsiyalar soniga bogʻliq."
      },
      {
        "q": "Kod kimga tegishli?",
        "a": "Shartnomaga koʻra buyurtmachiga — topshirish va hujjatlar bilan."
      }
    ],
    "related": [
      {
        "href": "/services/sales-ai-agent",
        "label": "Savdo AI-agent"
      },
      {
        "href": "/services/crm-integration",
        "label": "CRM"
      },
      {
        "href": "/bitrix",
        "label": "Bitrix24"
      }
    ],
    "caseStudySlugs": [
      "kp-llm-automation",
      "elia-suite"
    ]
  },
  "sales-ai-agent": {
    "problemsTitle": "Tipik muammolar",
    "deliverablesTitle": "Nima olasiz",
    "howWeSolveTitle": "Qanday ishlaymiz",
    "architectureTitle": "Tipik arxitektura",
    "roiTitle": "Orientir effekt",
    "faqTitle": "Tez-tez beriladigan savollar",
    "eyebrow": "Xizmat · Offer",
    "metaTitle": "Savdo uchun AI-agent va boʻlimni avtomatlashtirish | Bober AI",
    "metaDescription": "Lidlar, KP, follow-up va CRM. Pilot 30 000 000 soʻmdan. Toshkent.",
    "h1": "Savdo boʻlimi uchun AI-agent",
    "subtitle": "PDF soatlar emas, daqiqalarda — CRM bilan bogʻlangan agent.",
    "problems": [
      "KP tayyorlash uzoq",
      "Lidlar kanallar boʻylab yoʻqoladi",
      "Menejerlar tizimlar orasida nusxa koʻchiradi"
    ],
    "deliverables": [
      "KP / lid avtomatlashtirish",
      "CRM yozuvlari",
      "Metrikalar va pilot"
    ],
    "intro": [
      "Brauzerdagi ChatGPT CRM va narxlarga ulanmaydi. Biz production kontur quramiz."
    ],
    "howWeSolve": [
      {
        "title": "Audit va ROI",
        "text": "Jarayon egalaridan intervyu, oqimlar xaritasi, yoʻqotish nuqtalari. Stsenariylarni oʻzini oqlash boʻyicha ustuvorlashtirish."
      },
      {
        "title": "Arxitektura",
        "text": "Stack tanlash: CRM, workflow, API, AI qatlam. Integratsiyalar spetsifikatsiyasi — ishlab chiqishdan oldin."
      },
      {
        "title": "Ishlab chiqish va integratsiyalar",
        "text": "amoCRM, Bitrix24, 1С, Telegram, hujjatlar va ichki API. Navbatlar, idempotentlik, jurnal."
      },
      {
        "title": "Production va topshirish",
        "text": "Deploy, monitoring, hujjatlar, oʻqitish. Go-live dan keyin SLA qoʻllab-quvvatlash — ixtiyoriy."
      }
    ],
    "architecture": [
      "Soʻrov kanali",
      "Katalog / CRM",
      "AI tahlil + qoidalar",
      "DOCX/PDF chiqish"
    ],
    "roi": [
      {
        "value": "45→2–5 daq",
        "label": "tipik KP"
      }
    ],
    "faq": [
      {
        "q": "Narx oraligʻi qanday?",
        "a": "Audit 15 000 000 soʻmdan, pilot 30 000 000 soʻmdan, joriy etish 50 000 000 soʻmdan. Aniq smeta — discovery dan keyin."
      },
      {
        "q": "NDA va yopiq kontur bormi?",
        "a": "Ha. NDA standart; on-premise yoki mahalliy bulut — soʻrov boʻyicha."
      },
      {
        "q": "Muddat?",
        "a": "Pilot odatda 2–6 hafta; toʻliq production integratsiyalar soniga bogʻliq."
      },
      {
        "q": "Kod kimga tegishli?",
        "a": "Shartnomaga koʻra buyurtmachiga — topshirish va hujjatlar bilan."
      }
    ],
    "related": [
      {
        "href": "/services/ai-sales-loop",
        "label": "AI sales loop"
      },
      {
        "href": "/services/kp-llm-automation",
        "label": "KP"
      },
      {
        "href": "/pricing",
        "label": "Narxlar"
      }
    ],
    "caseStudySlugs": [
      "kp-llm-automation",
      "lead-generation"
    ]
  },
  "wildberries-independent-sales-channel": {
    "problemsTitle": "Tipik muammolar",
    "deliverablesTitle": "Nima olasiz",
    "howWeSolveTitle": "Qanday ishlaymiz",
    "architectureTitle": "Tipik arxitektura",
    "roiTitle": "Orientir effekt",
    "faqTitle": "Tez-tez beriladigan savollar",
    "eyebrow": "Xizmat · Offer",
    "metaTitle": "Mustaqil savdo kanali — katalog, buyurtmalar, CRM | Bober AI",
    "metaDescription": "Bitta marketplace ga bogʻlanmasdan parallel kanal. Oʻzbekiston: Uzum va boshqa kanallar mantiqi. 50 000 000 soʻmdan.",
    "h1": "Marketplace dan mustaqil savdo kanali",
    "subtitle": "Wildberries-ga xos taklif emas — parallel savdo konturi patterni.",
    "problems": [
      "Bitta maydonchaga bogʻliqlik",
      "Katalog va buyurtmalar tarqoq",
      "CRM da yagona manzara yoʻq"
    ],
    "deliverables": [
      "Mustaqil kanal konturi",
      "Katalog/buyurtma sync",
      "CRM integratsiya"
    ],
    "intro": [
      "RU Wildberries vitrinasi oʻrniga — mahalliy marketplace va oʻz kanal uchun xuddi shu arxitektura."
    ],
    "howWeSolve": [
      {
        "title": "Audit va ROI",
        "text": "Jarayon egalaridan intervyu, oqimlar xaritasi, yoʻqotish nuqtalari. Stsenariylarni oʻzini oqlash boʻyicha ustuvorlashtirish."
      },
      {
        "title": "Arxitektura",
        "text": "Stack tanlash: CRM, workflow, API, AI qatlam. Integratsiyalar spetsifikatsiyasi — ishlab chiqishdan oldin."
      },
      {
        "title": "Ishlab chiqish va integratsiyalar",
        "text": "amoCRM, Bitrix24, 1С, Telegram, hujjatlar va ichki API. Navbatlar, idempotentlik, jurnal."
      },
      {
        "title": "Production va topshirish",
        "text": "Deploy, monitoring, hujjatlar, oʻqitish. Go-live dan keyin SLA qoʻllab-quvvatlash — ixtiyoriy."
      }
    ],
    "architecture": [
      "Katalog",
      "Buyurtmalar API",
      "CRM / 1С",
      "Monitoring"
    ],
    "roi": [
      {
        "value": "50 mln+",
        "label": "soʻm — tipik joriy etish"
      }
    ],
    "faq": [
      {
        "q": "Narx oraligʻi qanday?",
        "a": "Audit 15 000 000 soʻmdan, pilot 30 000 000 soʻmdan, joriy etish 50 000 000 soʻmdan. Aniq smeta — discovery dan keyin."
      },
      {
        "q": "NDA va yopiq kontur bormi?",
        "a": "Ha. NDA standart; on-premise yoki mahalliy bulut — soʻrov boʻyicha."
      },
      {
        "q": "Muddat?",
        "a": "Pilot odatda 2–6 hafta; toʻliq production integratsiyalar soniga bogʻliq."
      },
      {
        "q": "Kod kimga tegishli?",
        "a": "Shartnomaga koʻra buyurtmachiga — topshirish va hujjatlar bilan."
      }
    ],
    "related": [
      {
        "href": "/services/crm-integration",
        "label": "CRM"
      },
      {
        "href": "/services/business-process-automation",
        "label": "Jarayonlar"
      }
    ],
    "caseStudySlugs": [
      "crm-1c-sync"
    ]
  },
  "ai-discovery-roadmap": {
    "problemsTitle": "Tipik muammolar",
    "deliverablesTitle": "Nima olasiz",
    "howWeSolveTitle": "Qanday ishlaymiz",
    "architectureTitle": "Tipik arxitektura",
    "roiTitle": "Orientir effekt",
    "faqTitle": "Tez-tez beriladigan savollar",
    "eyebrow": "Xizmat · Offer",
    "metaTitle": "AI Discovery va yoʻl xaritasi | Bober AI",
    "metaDescription": "Ishlab chiqishdan oldin audit: tor joylar, ROI, 30/60/90. 15 000 000 soʻmdan.",
    "h1": "AI Discovery va joriy etish yoʻl xaritasi",
    "subtitle": "Smeta va qabul mezonlari — kod yozishdan oldin.",
    "problems": [
      "Nimani avtomatlashtirish nomaʼlum",
      "Byudjet «taxmin»",
      "AI hype, oʻlchov yoʻq"
    ],
    "deliverables": [
      "Jarayon xaritasi",
      "Effekt/murakkablik",
      "30/60/90 va smeta"
    ],
    "intro": [
      "Audit paketi 15 000 000 soʻmdan — keyin joriy etishda hisoblanishi mumkin."
    ],
    "howWeSolve": [
      {
        "title": "Audit va ROI",
        "text": "Jarayon egalaridan intervyu, oqimlar xaritasi, yoʻqotish nuqtalari. Stsenariylarni oʻzini oqlash boʻyicha ustuvorlashtirish."
      },
      {
        "title": "Arxitektura",
        "text": "Stack tanlash: CRM, workflow, API, AI qatlam. Integratsiyalar spetsifikatsiyasi — ishlab chiqishdan oldin."
      },
      {
        "title": "Ishlab chiqish va integratsiyalar",
        "text": "amoCRM, Bitrix24, 1С, Telegram, hujjatlar va ichki API. Navbatlar, idempotentlik, jurnal."
      },
      {
        "title": "Production va topshirish",
        "text": "Deploy, monitoring, hujjatlar, oʻqitish. Go-live dan keyin SLA qoʻllab-quvvatlash — ixtiyoriy."
      }
    ],
    "architecture": [
      "Intervyu",
      "Maʼlumot namunasi",
      "ROI model",
      "Roadmap"
    ],
    "roi": [
      {
        "value": "1–2 hafta",
        "label": "audit"
      }
    ],
    "faq": [
      {
        "q": "Narx oraligʻi qanday?",
        "a": "Audit 15 000 000 soʻmdan, pilot 30 000 000 soʻmdan, joriy etish 50 000 000 soʻmdan. Aniq smeta — discovery dan keyin."
      },
      {
        "q": "NDA va yopiq kontur bormi?",
        "a": "Ha. NDA standart; on-premise yoki mahalliy bulut — soʻrov boʻyicha."
      },
      {
        "q": "Muddat?",
        "a": "Pilot odatda 2–6 hafta; toʻliq production integratsiyalar soniga bogʻliq."
      },
      {
        "q": "Kod kimga tegishli?",
        "a": "Shartnomaga koʻra buyurtmachiga — topshirish va hujjatlar bilan."
      }
    ],
    "related": [
      {
        "href": "/pricing",
        "label": "Narxlar"
      },
      {
        "href": "/services/business-process-automation",
        "label": "Joriy etish"
      }
    ]
  },
  "enterprise-ai-assistant": {
    "problemsTitle": "Tipik muammolar",
    "deliverablesTitle": "Nima olasiz",
    "howWeSolveTitle": "Qanday ishlaymiz",
    "architectureTitle": "Tipik arxitektura",
    "roiTitle": "Orientir effekt",
    "faqTitle": "Tez-tez beriladigan savollar",
    "eyebrow": "Xizmat · Offer",
    "metaTitle": "Enterprise AI-yordamchini joriy etish | Bober AI",
    "metaDescription": "Korporativ assistant: RAG, agentlar, CRM. Production, ChatGPT demosi emas. 50 000 000 soʻmdan.",
    "h1": "Enterprise AI-yordamchi",
    "subtitle": "Ichki reglamentlar va tizimlarga ulangan assistant.",
    "problems": [
      "Public ChatGPT ga korporativ matn",
      "Manbasiz javoblar",
      "Bir nechta bot oʻrniga bitta kontur kerak"
    ],
    "deliverables": [
      "Ishchi assistant",
      "Integratsiyalar",
      "Rollar va monitoring"
    ],
    "intro": [
      "Yopiq kontur mumkin — Secure AI."
    ],
    "howWeSolve": [
      {
        "title": "Audit va ROI",
        "text": "Jarayon egalaridan intervyu, oqimlar xaritasi, yoʻqotish nuqtalari. Stsenariylarni oʻzini oqlash boʻyicha ustuvorlashtirish."
      },
      {
        "title": "Arxitektura",
        "text": "Stack tanlash: CRM, workflow, API, AI qatlam. Integratsiyalar spetsifikatsiyasi — ishlab chiqishdan oldin."
      },
      {
        "title": "Ishlab chiqish va integratsiyalar",
        "text": "amoCRM, Bitrix24, 1С, Telegram, hujjatlar va ichki API. Navbatlar, idempotentlik, jurnal."
      },
      {
        "title": "Production va topshirish",
        "text": "Deploy, monitoring, hujjatlar, oʻqitish. Go-live dan keyin SLA qoʻllab-quvvatlash — ixtiyoriy."
      }
    ],
    "architecture": [
      "Bilim bazasi",
      "LLM",
      "Vositalar/CRM",
      "Guardrails"
    ],
    "roi": [
      {
        "value": "50 mln+",
        "label": "soʻm"
      }
    ],
    "faq": [
      {
        "q": "Narx oraligʻi qanday?",
        "a": "Audit 15 000 000 soʻmdan, pilot 30 000 000 soʻmdan, joriy etish 50 000 000 soʻmdan. Aniq smeta — discovery dan keyin."
      },
      {
        "q": "NDA va yopiq kontur bormi?",
        "a": "Ha. NDA standart; on-premise yoki mahalliy bulut — soʻrov boʻyicha."
      },
      {
        "q": "Muddat?",
        "a": "Pilot odatda 2–6 hafta; toʻliq production integratsiyalar soniga bogʻliq."
      },
      {
        "q": "Kod kimga tegishli?",
        "a": "Shartnomaga koʻra buyurtmachiga — topshirish va hujjatlar bilan."
      }
    ],
    "related": [
      {
        "href": "/services/rag",
        "label": "RAG"
      },
      {
        "href": "/secure-ai",
        "label": "Secure AI"
      }
    ],
    "caseStudySlugs": [
      "kaspersky-ai-assistant",
      "support-knowledge-base"
    ]
  },
  "private-llm-gigachat": {
    "problemsTitle": "Tipik muammolar",
    "deliverablesTitle": "Nima olasiz",
    "howWeSolveTitle": "Qanday ishlaymiz",
    "architectureTitle": "Tipik arxitektura",
    "roiTitle": "Orientir effekt",
    "faqTitle": "Tez-tez beriladigan savollar",
    "eyebrow": "Xizmat · Offer",
    "metaTitle": "Private LLM va on-prem kontur | Bober AI",
    "metaDescription": "Maʼlumot tashqariga ketmaydi: on-prem yoki izolyatsiyalangan bulut. 50 000 000 soʻmdan.",
    "h1": "Private LLM kontur",
    "subtitle": "GigaChat majburiy emas — konturga mos model.",
    "problems": [
      "Sezgir maʼlumot",
      "Vendor lock-in xavfi",
      "IT kontur talablari"
    ],
    "deliverables": [
      "Joylashtirish",
      "API va guardrails",
      "Monitoring"
    ],
    "intro": [
      "Oʻzbekiston: mahalliy bulut yoki on-prem."
    ],
    "howWeSolve": [
      {
        "title": "Audit va ROI",
        "text": "Jarayon egalaridan intervyu, oqimlar xaritasi, yoʻqotish nuqtalari. Stsenariylarni oʻzini oqlash boʻyicha ustuvorlashtirish."
      },
      {
        "title": "Arxitektura",
        "text": "Stack tanlash: CRM, workflow, API, AI qatlam. Integratsiyalar spetsifikatsiyasi — ishlab chiqishdan oldin."
      },
      {
        "title": "Ishlab chiqish va integratsiyalar",
        "text": "amoCRM, Bitrix24, 1С, Telegram, hujjatlar va ichki API. Navbatlar, idempotentlik, jurnal."
      },
      {
        "title": "Production va topshirish",
        "text": "Deploy, monitoring, hujjatlar, oʻqitish. Go-live dan keyin SLA qoʻllab-quvvatlash — ixtiyoriy."
      }
    ],
    "architecture": [
      "Model hosting",
      "API gateway",
      "ACL",
      "Observability"
    ],
    "roi": [
      {
        "value": "50 mln+",
        "label": "soʻm"
      }
    ],
    "faq": [
      {
        "q": "Narx oraligʻi qanday?",
        "a": "Audit 15 000 000 soʻmdan, pilot 30 000 000 soʻmdan, joriy etish 50 000 000 soʻmdan. Aniq smeta — discovery dan keyin."
      },
      {
        "q": "NDA va yopiq kontur bormi?",
        "a": "Ha. NDA standart; on-premise yoki mahalliy bulut — soʻrov boʻyicha."
      },
      {
        "q": "Muddat?",
        "a": "Pilot odatda 2–6 hafta; toʻliq production integratsiyalar soniga bogʻliq."
      },
      {
        "q": "Kod kimga tegishli?",
        "a": "Shartnomaga koʻra buyurtmachiga — topshirish va hujjatlar bilan."
      }
    ],
    "related": [
      {
        "href": "/secure-ai",
        "label": "Secure AI"
      },
      {
        "href": "/services/self-hosted-ai",
        "label": "Self-hosted AI"
      }
    ]
  },
  "ai-automation": {
    "problemsTitle": "Tipik muammolar",
    "deliverablesTitle": "Nima olasiz",
    "howWeSolveTitle": "Qanday ishlaymiz",
    "architectureTitle": "Tipik arxitektura",
    "roiTitle": "Orientir effekt",
    "faqTitle": "Tez-tez beriladigan savollar",
    "eyebrow": "Xizmat · Offer",
    "metaTitle": "AI + workflow avtomatlashtirish | Bober AI",
    "metaDescription": "Workflow + ixtiyoriy LLM. Qatʼiy smeta, soʻm. Toshkent.",
    "h1": "AI + workflow: LLM qatlamli avtomatlashtirish",
    "subtitle": "Avval qoidalar va integratsiyalar — AI faqat kerak joyda.",
    "problems": [
      "Hamma narsaga LLM tiqilgan",
      "Integratsiyasiz demo",
      "Production yoʻq"
    ],
    "deliverables": [
      "Workflow",
      "AI qatlam",
      "SLA"
    ],
    "intro": [
      "Koʻpincha LLM siz yechim yetarli."
    ],
    "howWeSolve": [
      {
        "title": "Audit va ROI",
        "text": "Jarayon egalaridan intervyu, oqimlar xaritasi, yoʻqotish nuqtalari. Stsenariylarni oʻzini oqlash boʻyicha ustuvorlashtirish."
      },
      {
        "title": "Arxitektura",
        "text": "Stack tanlash: CRM, workflow, API, AI qatlam. Integratsiyalar spetsifikatsiyasi — ishlab chiqishdan oldin."
      },
      {
        "title": "Ishlab chiqish va integratsiyalar",
        "text": "amoCRM, Bitrix24, 1С, Telegram, hujjatlar va ichki API. Navbatlar, idempotentlik, jurnal."
      },
      {
        "title": "Production va topshirish",
        "text": "Deploy, monitoring, hujjatlar, oʻqitish. Go-live dan keyin SLA qoʻllab-quvvatlash — ixtiyoriy."
      }
    ],
    "architecture": [
      "Triggerlar",
      "Qoidalar",
      "LLM opsional",
      "CRM yozuv"
    ],
    "roi": [
      {
        "value": "30–50 mln",
        "label": "soʻm tipik"
      }
    ],
    "faq": [
      {
        "q": "Narx oraligʻi qanday?",
        "a": "Audit 15 000 000 soʻmdan, pilot 30 000 000 soʻmdan, joriy etish 50 000 000 soʻmdan. Aniq smeta — discovery dan keyin."
      },
      {
        "q": "NDA va yopiq kontur bormi?",
        "a": "Ha. NDA standart; on-premise yoki mahalliy bulut — soʻrov boʻyicha."
      },
      {
        "q": "Muddat?",
        "a": "Pilot odatda 2–6 hafta; toʻliq production integratsiyalar soniga bogʻliq."
      },
      {
        "q": "Kod kimga tegishli?",
        "a": "Shartnomaga koʻra buyurtmachiga — topshirish va hujjatlar bilan."
      }
    ],
    "related": [
      {
        "href": "/services/n8n",
        "label": "n8n"
      },
      {
        "href": "/services/business-process-automation",
        "label": "Jarayonlar"
      }
    ]
  },
  "rag": {
    "problemsTitle": "Tipik muammolar",
    "deliverablesTitle": "Nima olasiz",
    "howWeSolveTitle": "Qanday ishlaymiz",
    "architectureTitle": "Tipik arxitektura",
    "roiTitle": "Orientir effekt",
    "faqTitle": "Tez-tez beriladigan savollar",
    "eyebrow": "Xizmat · Offer",
    "metaTitle": "Korporativ RAG — kalit topshirish | Bober AI",
    "metaDescription": "Hujjatlar boʻyicha qidiruv, manba havolasi, eskalatsiya. 50 000 000 soʻmdan.",
    "h1": "Korporativ RAG",
    "subtitle": "Javob — manba bilan; past ishonchda ekspertga.",
    "problems": [
      "Reglamentlar tarqoq",
      "Takroriy savollar",
      "Manbasiz LLM javoblari"
    ],
    "deliverables": [
      "Indeks",
      "Chat/portal",
      "ACL va audit"
    ],
    "intro": [
      "Kaspersky RAG keys — mahsulot hujjatlari boʻyicha namuna."
    ],
    "howWeSolve": [
      {
        "title": "Audit va ROI",
        "text": "Jarayon egalaridan intervyu, oqimlar xaritasi, yoʻqotish nuqtalari. Stsenariylarni oʻzini oqlash boʻyicha ustuvorlashtirish."
      },
      {
        "title": "Arxitektura",
        "text": "Stack tanlash: CRM, workflow, API, AI qatlam. Integratsiyalar spetsifikatsiyasi — ishlab chiqishdan oldin."
      },
      {
        "title": "Ishlab chiqish va integratsiyalar",
        "text": "amoCRM, Bitrix24, 1С, Telegram, hujjatlar va ichki API. Navbatlar, idempotentlik, jurnal."
      },
      {
        "title": "Production va topshirish",
        "text": "Deploy, monitoring, hujjatlar, oʻqitish. Go-live dan keyin SLA qoʻllab-quvvatlash — ixtiyoriy."
      }
    ],
    "architecture": [
      "Ingest",
      "Vektor indeks",
      "Retriever + LLM",
      "Citation"
    ],
    "roi": [
      {
        "value": "−50%",
        "label": "takroriy savollar (pilot)"
      }
    ],
    "faq": [
      {
        "q": "Narx oraligʻi qanday?",
        "a": "Audit 15 000 000 soʻmdan, pilot 30 000 000 soʻmdan, joriy etish 50 000 000 soʻmdan. Aniq smeta — discovery dan keyin."
      },
      {
        "q": "NDA va yopiq kontur bormi?",
        "a": "Ha. NDA standart; on-premise yoki mahalliy bulut — soʻrov boʻyicha."
      },
      {
        "q": "Muddat?",
        "a": "Pilot odatda 2–6 hafta; toʻliq production integratsiyalar soniga bogʻliq."
      },
      {
        "q": "Kod kimga tegishli?",
        "a": "Shartnomaga koʻra buyurtmachiga — topshirish va hujjatlar bilan."
      }
    ],
    "related": [
      {
        "href": "/services/knowledge-base",
        "label": "Bilim bazasi"
      },
      {
        "href": "/portfolio/kaspersky-ai-assistant",
        "label": "Keys"
      }
    ],
    "caseStudySlugs": [
      "kaspersky-ai-assistant",
      "support-knowledge-base"
    ]
  },
  "llm-development": {
    "problemsTitle": "Tipik muammolar",
    "deliverablesTitle": "Nima olasiz",
    "howWeSolveTitle": "Qanday ishlaymiz",
    "architectureTitle": "Tipik arxitektura",
    "roiTitle": "Orientir effekt",
    "faqTitle": "Tez-tez beriladigan savollar",
    "eyebrow": "Xizmat · Offer",
    "metaTitle": "LLM-ilovalar ishlab chiqish | Bober AI",
    "metaDescription": "Maxsus LLM ilovalar, API, prompt va production deploy. Soʻmda smeta.",
    "h1": "LLM-ilovalar ishlab chiqish",
    "subtitle": "Demo emas — monitoring va topshirish bilan ilova.",
    "problems": [
      "PoC qotib qolgan",
      "Xavfsizlik yoʻq",
      "Integratsiya yoʻq"
    ],
    "deliverables": [
      "Ilova",
      "API",
      "Hujjatlar"
    ],
    "intro": [
      "Stack va kontur — buyurtmachi talabiga."
    ],
    "howWeSolve": [
      {
        "title": "Audit va ROI",
        "text": "Jarayon egalaridan intervyu, oqimlar xaritasi, yoʻqotish nuqtalari. Stsenariylarni oʻzini oqlash boʻyicha ustuvorlashtirish."
      },
      {
        "title": "Arxitektura",
        "text": "Stack tanlash: CRM, workflow, API, AI qatlam. Integratsiyalar spetsifikatsiyasi — ishlab chiqishdan oldin."
      },
      {
        "title": "Ishlab chiqish va integratsiyalar",
        "text": "amoCRM, Bitrix24, 1С, Telegram, hujjatlar va ichki API. Navbatlar, idempotentlik, jurnal."
      },
      {
        "title": "Production va topshirish",
        "text": "Deploy, monitoring, hujjatlar, oʻqitish. Go-live dan keyin SLA qoʻllab-quvvatlash — ixtiyoriy."
      }
    ],
    "architecture": [
      "App",
      "Model API",
      "Tools",
      "Observability"
    ],
    "roi": [
      {
        "value": "50 mln+",
        "label": "soʻm"
      }
    ],
    "faq": [
      {
        "q": "Narx oraligʻi qanday?",
        "a": "Audit 15 000 000 soʻmdan, pilot 30 000 000 soʻmdan, joriy etish 50 000 000 soʻmdan. Aniq smeta — discovery dan keyin."
      },
      {
        "q": "NDA va yopiq kontur bormi?",
        "a": "Ha. NDA standart; on-premise yoki mahalliy bulut — soʻrov boʻyicha."
      },
      {
        "q": "Muddat?",
        "a": "Pilot odatda 2–6 hafta; toʻliq production integratsiyalar soniga bogʻliq."
      },
      {
        "q": "Kod kimga tegishli?",
        "a": "Shartnomaga koʻra buyurtmachiga — topshirish va hujjatlar bilan."
      }
    ],
    "related": [
      {
        "href": "/services/ai-agent",
        "label": "AI-agentlar"
      },
      {
        "href": "/services/mcp",
        "label": "MCP"
      }
    ]
  },
  "n8n": {
    "problemsTitle": "Tipik muammolar",
    "deliverablesTitle": "Nima olasiz",
    "howWeSolveTitle": "Qanday ishlaymiz",
    "architectureTitle": "Tipik arxitektura",
    "roiTitle": "Orientir effekt",
    "faqTitle": "Tez-tez beriladigan savollar",
    "eyebrow": "Xizmat · Offer",
    "metaTitle": "n8n avtomatlashtirish — integratsiyalar va workflow | Bober AI",
    "metaDescription": "n8n + AI qatlam, CRM va messenjerlar. 30 000 000 soʻmdan.",
    "h1": "n8n da avtomatlashtirish",
    "subtitle": "Self-hosted yoki bulut — production workflow.",
    "problems": [
      "Qoʻlda Zapier zanjirlari",
      "Xato handling yoʻq",
      "AI siz qoidalar yetarli emas"
    ],
    "deliverables": [
      "n8n kontur",
      "Integratsiyalar",
      "Monitoring"
    ],
    "intro": [
      "Kerak joyda LLM node."
    ],
    "howWeSolve": [
      {
        "title": "Audit va ROI",
        "text": "Jarayon egalaridan intervyu, oqimlar xaritasi, yoʻqotish nuqtalari. Stsenariylarni oʻzini oqlash boʻyicha ustuvorlashtirish."
      },
      {
        "title": "Arxitektura",
        "text": "Stack tanlash: CRM, workflow, API, AI qatlam. Integratsiyalar spetsifikatsiyasi — ishlab chiqishdan oldin."
      },
      {
        "title": "Ishlab chiqish va integratsiyalar",
        "text": "amoCRM, Bitrix24, 1С, Telegram, hujjatlar va ichki API. Navbatlar, idempotentlik, jurnal."
      },
      {
        "title": "Production va topshirish",
        "text": "Deploy, monitoring, hujjatlar, oʻqitish. Go-live dan keyin SLA qoʻllab-quvvatlash — ixtiyoriy."
      }
    ],
    "architecture": [
      "n8n",
      "Webhooks",
      "CRM/API",
      "Queue"
    ],
    "roi": [
      {
        "value": "30 mln+",
        "label": "soʻm"
      }
    ],
    "faq": [
      {
        "q": "Narx oraligʻi qanday?",
        "a": "Audit 15 000 000 soʻmdan, pilot 30 000 000 soʻmdan, joriy etish 50 000 000 soʻmdan. Aniq smeta — discovery dan keyin."
      },
      {
        "q": "NDA va yopiq kontur bormi?",
        "a": "Ha. NDA standart; on-premise yoki mahalliy bulut — soʻrov boʻyicha."
      },
      {
        "q": "Muddat?",
        "a": "Pilot odatda 2–6 hafta; toʻliq production integratsiyalar soniga bogʻliq."
      },
      {
        "q": "Kod kimga tegishli?",
        "a": "Shartnomaga koʻra buyurtmachiga — topshirish va hujjatlar bilan."
      }
    ],
    "related": [
      {
        "href": "/services/ai-automation",
        "label": "AI automation"
      },
      {
        "href": "/services/crm-integration",
        "label": "CRM"
      }
    ]
  },
  "ai-agent": {
    "problemsTitle": "Tipik muammolar",
    "deliverablesTitle": "Nima olasiz",
    "howWeSolveTitle": "Qanday ishlaymiz",
    "architectureTitle": "Tipik arxitektura",
    "roiTitle": "Orientir effekt",
    "faqTitle": "Tez-tez beriladigan savollar",
    "eyebrow": "Xizmat · Offer",
    "metaTitle": "Biznes uchun AI-agentlar | Bober AI",
    "metaDescription": "Harakatli agentlar: CRM, hujjatlar, HITL. 50 000 000 soʻmdan.",
    "h1": "AI-agentlar ishlab chiqish",
    "subtitle": "Chatbot emas — vositalar va eskalatsiya bilan agent.",
    "problems": [
      "Faqat chat",
      "Harakat yoʻq",
      "Nazorat yoʻq"
    ],
    "deliverables": [
      "Agent",
      "Tools",
      "HITL"
    ],
    "intro": [
      "LangGraph — murakkab stsenariylar uchun."
    ],
    "howWeSolve": [
      {
        "title": "Audit va ROI",
        "text": "Jarayon egalaridan intervyu, oqimlar xaritasi, yoʻqotish nuqtalari. Stsenariylarni oʻzini oqlash boʻyicha ustuvorlashtirish."
      },
      {
        "title": "Arxitektura",
        "text": "Stack tanlash: CRM, workflow, API, AI qatlam. Integratsiyalar spetsifikatsiyasi — ishlab chiqishdan oldin."
      },
      {
        "title": "Ishlab chiqish va integratsiyalar",
        "text": "amoCRM, Bitrix24, 1С, Telegram, hujjatlar va ichki API. Navbatlar, idempotentlik, jurnal."
      },
      {
        "title": "Production va topshirish",
        "text": "Deploy, monitoring, hujjatlar, oʻqitish. Go-live dan keyin SLA qoʻllab-quvvatlash — ixtiyoriy."
      }
    ],
    "architecture": [
      "Planner",
      "Tools",
      "Memory",
      "Human-in-the-loop"
    ],
    "roi": [
      {
        "value": "50 mln+",
        "label": "soʻm"
      }
    ],
    "faq": [
      {
        "q": "Narx oraligʻi qanday?",
        "a": "Audit 15 000 000 soʻmdan, pilot 30 000 000 soʻmdan, joriy etish 50 000 000 soʻmdan. Aniq smeta — discovery dan keyin."
      },
      {
        "q": "NDA va yopiq kontur bormi?",
        "a": "Ha. NDA standart; on-premise yoki mahalliy bulut — soʻrov boʻyicha."
      },
      {
        "q": "Muddat?",
        "a": "Pilot odatda 2–6 hafta; toʻliq production integratsiyalar soniga bogʻliq."
      },
      {
        "q": "Kod kimga tegishli?",
        "a": "Shartnomaga koʻra buyurtmachiga — topshirish va hujjatlar bilan."
      }
    ],
    "related": [
      {
        "href": "/services/langgraph",
        "label": "LangGraph"
      },
      {
        "href": "/services/mcp",
        "label": "MCP"
      }
    ]
  },
  "document-processing": {
    "problemsTitle": "Tipik muammolar",
    "deliverablesTitle": "Nima olasiz",
    "howWeSolveTitle": "Qanday ishlaymiz",
    "architectureTitle": "Tipik arxitektura",
    "roiTitle": "Orientir effekt",
    "faqTitle": "Tez-tez beriladigan savollar",
    "eyebrow": "Xizmat · Offer",
    "metaTitle": "Hujjatlarni avtomatlashtirish | Bober AI",
    "metaDescription": "OCR, kelishuvlar, maydonlar → CRM/1С. 50 000 000 soʻmdan. Toshkent.",
    "h1": "Hujjatlarni qayta ishlash",
    "subtitle": "Qoʻlda kiritishni kamaytirish — tekshiruv va eskalatsiya bilan.",
    "problems": [
      "Qoʻlda kiritish",
      "Kelishuv kechikishi",
      "Xatolar"
    ],
    "deliverables": [
      "OCR pipeline",
      "Marshrut",
      "Eksport"
    ],
    "intro": [
      "Hisob-faktura keys — 50 hujjat ~10 daqiqada."
    ],
    "howWeSolve": [
      {
        "title": "Audit va ROI",
        "text": "Jarayon egalaridan intervyu, oqimlar xaritasi, yoʻqotish nuqtalari. Stsenariylarni oʻzini oqlash boʻyicha ustuvorlashtirish."
      },
      {
        "title": "Arxitektura",
        "text": "Stack tanlash: CRM, workflow, API, AI qatlam. Integratsiyalar spetsifikatsiyasi — ishlab chiqishdan oldin."
      },
      {
        "title": "Ishlab chiqish va integratsiyalar",
        "text": "amoCRM, Bitrix24, 1С, Telegram, hujjatlar va ichki API. Navbatlar, idempotentlik, jurnal."
      },
      {
        "title": "Production va topshirish",
        "text": "Deploy, monitoring, hujjatlar, oʻqitish. Go-live dan keyin SLA qoʻllab-quvvatlash — ixtiyoriy."
      }
    ],
    "architecture": [
      "Ingest",
      "OCR",
      "Validatsiya",
      "1С/CRM"
    ],
    "roi": [
      {
        "value": "−90%",
        "label": "kiritish xatolari (pilot)"
      }
    ],
    "faq": [
      {
        "q": "Narx oraligʻi qanday?",
        "a": "Audit 15 000 000 soʻmdan, pilot 30 000 000 soʻmdan, joriy etish 50 000 000 soʻmdan. Aniq smeta — discovery dan keyin."
      },
      {
        "q": "NDA va yopiq kontur bormi?",
        "a": "Ha. NDA standart; on-premise yoki mahalliy bulut — soʻrov boʻyicha."
      },
      {
        "q": "Muddat?",
        "a": "Pilot odatda 2–6 hafta; toʻliq production integratsiyalar soniga bogʻliq."
      },
      {
        "q": "Kod kimga tegishli?",
        "a": "Shartnomaga koʻra buyurtmachiga — topshirish va hujjatlar bilan."
      }
    ],
    "related": [
      {
        "href": "/services/ocr",
        "label": "OCR"
      },
      {
        "href": "/portfolio/invoice-processing-pipeline",
        "label": "Keys"
      }
    ],
    "caseStudySlugs": [
      "invoice-processing-pipeline"
    ]
  },
  "voice-ai": {
    "problemsTitle": "Tipik muammolar",
    "deliverablesTitle": "Nima olasiz",
    "howWeSolveTitle": "Qanday ishlaymiz",
    "architectureTitle": "Tipik arxitektura",
    "roiTitle": "Orientir effekt",
    "faqTitle": "Tez-tez beriladigan savollar",
    "eyebrow": "Xizmat · Offer",
    "metaTitle": "Voice AI va ovozli yordamchilar | Bober AI",
    "metaDescription": "Speech-to-text, ovozli botlar, CRM ga log. Soʻmda smeta.",
    "h1": "Voice AI",
    "subtitle": "Qoʻngʻiroqlar → matn → CRM faktlari.",
    "problems": [
      "Qoʻngʻiroqlar yoʻqoladi",
      "Samarilar qoʻlda",
      "Sifat nazorati yoʻq"
    ],
    "deliverables": [
      "STT",
      "Bot/stsenariy",
      "CRM log"
    ],
    "intro": [
      "Savdo loop bilan birga ishlaydi."
    ],
    "howWeSolve": [
      {
        "title": "Audit va ROI",
        "text": "Jarayon egalaridan intervyu, oqimlar xaritasi, yoʻqotish nuqtalari. Stsenariylarni oʻzini oqlash boʻyicha ustuvorlashtirish."
      },
      {
        "title": "Arxitektura",
        "text": "Stack tanlash: CRM, workflow, API, AI qatlam. Integratsiyalar spetsifikatsiyasi — ishlab chiqishdan oldin."
      },
      {
        "title": "Ishlab chiqish va integratsiyalar",
        "text": "amoCRM, Bitrix24, 1С, Telegram, hujjatlar va ichki API. Navbatlar, idempotentlik, jurnal."
      },
      {
        "title": "Production va topshirish",
        "text": "Deploy, monitoring, hujjatlar, oʻqitish. Go-live dan keyin SLA qoʻllab-quvvatlash — ixtiyoriy."
      }
    ],
    "architecture": [
      "Telephony",
      "STT/TTS",
      "LLM",
      "CRM"
    ],
    "roi": [
      {
        "value": "50 mln+",
        "label": "soʻm"
      }
    ],
    "faq": [
      {
        "q": "Narx oraligʻi qanday?",
        "a": "Audit 15 000 000 soʻmdan, pilot 30 000 000 soʻmdan, joriy etish 50 000 000 soʻmdan. Aniq smeta — discovery dan keyin."
      },
      {
        "q": "NDA va yopiq kontur bormi?",
        "a": "Ha. NDA standart; on-premise yoki mahalliy bulut — soʻrov boʻyicha."
      },
      {
        "q": "Muddat?",
        "a": "Pilot odatda 2–6 hafta; toʻliq production integratsiyalar soniga bogʻliq."
      },
      {
        "q": "Kod kimga tegishli?",
        "a": "Shartnomaga koʻra buyurtmachiga — topshirish va hujjatlar bilan."
      }
    ],
    "related": [
      {
        "href": "/services/ai-sales-loop",
        "label": "AI sales loop"
      }
    ]
  },
  "ocr": {
    "problemsTitle": "Tipik muammolar",
    "deliverablesTitle": "Nima olasiz",
    "howWeSolveTitle": "Qanday ishlaymiz",
    "architectureTitle": "Tipik arxitektura",
    "roiTitle": "Orientir effekt",
    "faqTitle": "Tez-tez beriladigan savollar",
    "eyebrow": "Xizmat · Offer",
    "metaTitle": "OCR joriy etish: 1С va CRM ga maʼlumot | Bober AI",
    "metaDescription": "PDF/skan → maydonlar → 1С/CRM. 30 000 000 soʻmdan.",
    "h1": "Buxgalteriya va operatsiyalar uchun OCR",
    "subtitle": "Uydirma raqamlarsiz — past ishonchda qoʻlda review.",
    "problems": [
      "Qoʻlda terish",
      "Yopilish kechikishi",
      "Xatolar"
    ],
    "deliverables": [
      "OCR",
      "Validatsiya",
      "Eksport"
    ],
    "intro": [
      "1С versiyasiga moslashamiz."
    ],
    "howWeSolve": [
      {
        "title": "Audit va ROI",
        "text": "Jarayon egalaridan intervyu, oqimlar xaritasi, yoʻqotish nuqtalari. Stsenariylarni oʻzini oqlash boʻyicha ustuvorlashtirish."
      },
      {
        "title": "Arxitektura",
        "text": "Stack tanlash: CRM, workflow, API, AI qatlam. Integratsiyalar spetsifikatsiyasi — ishlab chiqishdan oldin."
      },
      {
        "title": "Ishlab chiqish va integratsiyalar",
        "text": "amoCRM, Bitrix24, 1С, Telegram, hujjatlar va ichki API. Navbatlar, idempotentlik, jurnal."
      },
      {
        "title": "Production va topshirish",
        "text": "Deploy, monitoring, hujjatlar, oʻqitish. Go-live dan keyin SLA qoʻllab-quvvatlash — ixtiyoriy."
      }
    ],
    "architecture": [
      "Capture",
      "OCR",
      "Rules",
      "ERP"
    ],
    "roi": [
      {
        "value": "10 daq",
        "label": "50 hisob paketi (pilot)"
      }
    ],
    "faq": [
      {
        "q": "Narx oraligʻi qanday?",
        "a": "Audit 15 000 000 soʻmdan, pilot 30 000 000 soʻmdan, joriy etish 50 000 000 soʻmdan. Aniq smeta — discovery dan keyin."
      },
      {
        "q": "NDA va yopiq kontur bormi?",
        "a": "Ha. NDA standart; on-premise yoki mahalliy bulut — soʻrov boʻyicha."
      },
      {
        "q": "Muddat?",
        "a": "Pilot odatda 2–6 hafta; toʻliq production integratsiyalar soniga bogʻliq."
      },
      {
        "q": "Kod kimga tegishli?",
        "a": "Shartnomaga koʻra buyurtmachiga — topshirish va hujjatlar bilan."
      }
    ],
    "related": [
      {
        "href": "/services/document-processing",
        "label": "Hujjatlar"
      },
      {
        "href": "/portfolio/invoice-processing-pipeline",
        "label": "Keys"
      }
    ],
    "caseStudySlugs": [
      "invoice-processing-pipeline"
    ]
  },
  "open-webui": {
    "problemsTitle": "Tipik muammolar",
    "deliverablesTitle": "Nima olasiz",
    "howWeSolveTitle": "Qanday ishlaymiz",
    "architectureTitle": "Tipik arxitektura",
    "roiTitle": "Orientir effekt",
    "faqTitle": "Tez-tez beriladigan savollar",
    "eyebrow": "Xizmat · Offer",
    "metaTitle": "Open WebUI korporativ AI | Bober AI",
    "metaDescription": "SSO, siyosatlar, private modellar. Soʻmda smeta.",
    "h1": "Enterprise uchun Open WebUI",
    "subtitle": "Jamoa uchun ichki ChatGPT-oʻxshash interfeys — kontur ichida.",
    "problems": [
      "Public ChatGPT",
      "ACL yoʻq",
      "Audit yoʻq"
    ],
    "deliverables": [
      "Open WebUI",
      "SSO",
      "Guardrails"
    ],
    "intro": [
      "Self-hosted model bilan birga."
    ],
    "howWeSolve": [
      {
        "title": "Audit va ROI",
        "text": "Jarayon egalaridan intervyu, oqimlar xaritasi, yoʻqotish nuqtalari. Stsenariylarni oʻzini oqlash boʻyicha ustuvorlashtirish."
      },
      {
        "title": "Arxitektura",
        "text": "Stack tanlash: CRM, workflow, API, AI qatlam. Integratsiyalar spetsifikatsiyasi — ishlab chiqishdan oldin."
      },
      {
        "title": "Ishlab chiqish va integratsiyalar",
        "text": "amoCRM, Bitrix24, 1С, Telegram, hujjatlar va ichki API. Navbatlar, idempotentlik, jurnal."
      },
      {
        "title": "Production va topshirish",
        "text": "Deploy, monitoring, hujjatlar, oʻqitish. Go-live dan keyin SLA qoʻllab-quvvatlash — ixtiyoriy."
      }
    ],
    "architecture": [
      "Open WebUI",
      "IdP",
      "Models",
      "Policies"
    ],
    "roi": [
      {
        "value": "50 mln+",
        "label": "soʻm"
      }
    ],
    "faq": [
      {
        "q": "Narx oraligʻi qanday?",
        "a": "Audit 15 000 000 soʻmdan, pilot 30 000 000 soʻmdan, joriy etish 50 000 000 soʻmdan. Aniq smeta — discovery dan keyin."
      },
      {
        "q": "NDA va yopiq kontur bormi?",
        "a": "Ha. NDA standart; on-premise yoki mahalliy bulut — soʻrov boʻyicha."
      },
      {
        "q": "Muddat?",
        "a": "Pilot odatda 2–6 hafta; toʻliq production integratsiyalar soniga bogʻliq."
      },
      {
        "q": "Kod kimga tegishli?",
        "a": "Shartnomaga koʻra buyurtmachiga — topshirish va hujjatlar bilan."
      }
    ],
    "related": [
      {
        "href": "/services/self-hosted-ai",
        "label": "Self-hosted"
      },
      {
        "href": "/secure-ai",
        "label": "Secure AI"
      }
    ]
  },
  "self-hosted-ai": {
    "problemsTitle": "Tipik muammolar",
    "deliverablesTitle": "Nima olasiz",
    "howWeSolveTitle": "Qanday ishlaymiz",
    "architectureTitle": "Tipik arxitektura",
    "roiTitle": "Orientir effekt",
    "faqTitle": "Tez-tez beriladigan savollar",
    "eyebrow": "Xizmat · Offer",
    "metaTitle": "Private AI va mahalliy model | Bober AI",
    "metaDescription": "Kompaniya konturida AI — maʼlumot oqimisiz. 50 000 000 soʻmdan.",
    "h1": "Private AI va mahalliy neyron tarmoq",
    "subtitle": "On-prem / private cloud inferens.",
    "problems": [
      "Maʼlumot chiqishi taqiqlangan",
      "Vendor API ishonchsiz",
      "Latency/kontur"
    ],
    "deliverables": [
      "Hosting",
      "API",
      "Monitoring"
    ],
    "intro": [
      "Oʻzbekiston infratuzilmasi yoki on-prem."
    ],
    "howWeSolve": [
      {
        "title": "Audit va ROI",
        "text": "Jarayon egalaridan intervyu, oqimlar xaritasi, yoʻqotish nuqtalari. Stsenariylarni oʻzini oqlash boʻyicha ustuvorlashtirish."
      },
      {
        "title": "Arxitektura",
        "text": "Stack tanlash: CRM, workflow, API, AI qatlam. Integratsiyalar spetsifikatsiyasi — ishlab chiqishdan oldin."
      },
      {
        "title": "Ishlab chiqish va integratsiyalar",
        "text": "amoCRM, Bitrix24, 1С, Telegram, hujjatlar va ichki API. Navbatlar, idempotentlik, jurnal."
      },
      {
        "title": "Production va topshirish",
        "text": "Deploy, monitoring, hujjatlar, oʻqitish. Go-live dan keyin SLA qoʻllab-quvvatlash — ixtiyoriy."
      }
    ],
    "architecture": [
      "GPU/CPU",
      "Serving",
      "Gateway",
      "Obs"
    ],
    "roi": [
      {
        "value": "50 mln+",
        "label": "soʻm"
      }
    ],
    "faq": [
      {
        "q": "Narx oraligʻi qanday?",
        "a": "Audit 15 000 000 soʻmdan, pilot 30 000 000 soʻmdan, joriy etish 50 000 000 soʻmdan. Aniq smeta — discovery dan keyin."
      },
      {
        "q": "NDA va yopiq kontur bormi?",
        "a": "Ha. NDA standart; on-premise yoki mahalliy bulut — soʻrov boʻyicha."
      },
      {
        "q": "Muddat?",
        "a": "Pilot odatda 2–6 hafta; toʻliq production integratsiyalar soniga bogʻliq."
      },
      {
        "q": "Kod kimga tegishli?",
        "a": "Shartnomaga koʻra buyurtmachiga — topshirish va hujjatlar bilan."
      }
    ],
    "related": [
      {
        "href": "/services/private-llm-gigachat",
        "label": "Private LLM"
      },
      {
        "href": "/secure-ai",
        "label": "Secure AI"
      }
    ]
  },
  "secure-private-ai-cloud": {
    "problemsTitle": "Tipik muammolar",
    "deliverablesTitle": "Nima olasiz",
    "howWeSolveTitle": "Qanday ishlaymiz",
    "architectureTitle": "Tipik arxitektura",
    "roiTitle": "Orientir effekt",
    "faqTitle": "Tez-tez beriladigan savollar",
    "eyebrow": "Xizmat · Offer",
    "metaTitle": "Himoyalangan AI infratuzilmasi + Kaspersky opsiyasi | Bober AI",
    "metaDescription": "Yopiq AI kontur, bulut yoki on-prem, Kaspersky himoya qatlami. 80 000 000 soʻmdan.",
    "h1": "Himoyalangan AI infratuzilmasi",
    "subtitle": "Rossiya bulutlariga majburiy bogʻlanish emas — xavfsiz kontur patterni.",
    "problems": [
      "Sezgir maʼlumot",
      "Infratuzilma himoyasi",
      "Compliance"
    ],
    "deliverables": [
      "Secure kontur",
      "ACL/jurnallar",
      "Ixtiyoriy Kaspersky"
    ],
    "intro": [
      "Asosiy ixtisoslik — AI joriy etish; Kaspersky — himoya opsiyasi."
    ],
    "howWeSolve": [
      {
        "title": "Audit va ROI",
        "text": "Jarayon egalaridan intervyu, oqimlar xaritasi, yoʻqotish nuqtalari. Stsenariylarni oʻzini oqlash boʻyicha ustuvorlashtirish."
      },
      {
        "title": "Arxitektura",
        "text": "Stack tanlash: CRM, workflow, API, AI qatlam. Integratsiyalar spetsifikatsiyasi — ishlab chiqishdan oldin."
      },
      {
        "title": "Ishlab chiqish va integratsiyalar",
        "text": "amoCRM, Bitrix24, 1С, Telegram, hujjatlar va ichki API. Navbatlar, idempotentlik, jurnal."
      },
      {
        "title": "Production va topshirish",
        "text": "Deploy, monitoring, hujjatlar, oʻqitish. Go-live dan keyin SLA qoʻllab-quvvatlash — ixtiyoriy."
      }
    ],
    "architecture": [
      "Network",
      "Id",
      "LLM",
      "Endpoint/cloud security"
    ],
    "roi": [
      {
        "value": "80 mln+",
        "label": "soʻm"
      }
    ],
    "faq": [
      {
        "q": "Narx oraligʻi qanday?",
        "a": "Audit 15 000 000 soʻmdan, pilot 30 000 000 soʻmdan, joriy etish 50 000 000 soʻmdan. Aniq smeta — discovery dan keyin."
      },
      {
        "q": "NDA va yopiq kontur bormi?",
        "a": "Ha. NDA standart; on-premise yoki mahalliy bulut — soʻrov boʻyicha."
      },
      {
        "q": "Muddat?",
        "a": "Pilot odatda 2–6 hafta; toʻliq production integratsiyalar soniga bogʻliq."
      },
      {
        "q": "Kod kimga tegishli?",
        "a": "Shartnomaga koʻra buyurtmachiga — topshirish va hujjatlar bilan."
      }
    ],
    "related": [
      {
        "href": "/secure-ai",
        "label": "Secure AI"
      },
      {
        "href": "/kaspersky",
        "label": "Kaspersky"
      }
    ]
  },
  "mcp": {
    "problemsTitle": "Tipik muammolar",
    "deliverablesTitle": "Nima olasiz",
    "howWeSolveTitle": "Qanday ishlaymiz",
    "architectureTitle": "Tipik arxitektura",
    "roiTitle": "Orientir effekt",
    "faqTitle": "Tez-tez beriladigan savollar",
    "eyebrow": "Xizmat · Offer",
    "metaTitle": "AI-agentlar uchun MCP integratsiyalari | Bober AI",
    "metaDescription": "Model Context Protocol — LLM ni CRM, DB va API ga ulash. Soʻmda smeta.",
    "h1": "MCP integratsiyalari",
    "subtitle": "Agentlarga xavfsiz vositalar.",
    "problems": [
      "LLM izolyatsiyada",
      "Ad-hoc skriptlar",
      "Audit yoʻq"
    ],
    "deliverables": [
      "MCP serverlar",
      "ACL",
      "Obs"
    ],
    "intro": [
      "Claude MCP va boshqa klientlar."
    ],
    "howWeSolve": [
      {
        "title": "Audit va ROI",
        "text": "Jarayon egalaridan intervyu, oqimlar xaritasi, yoʻqotish nuqtalari. Stsenariylarni oʻzini oqlash boʻyicha ustuvorlashtirish."
      },
      {
        "title": "Arxitektura",
        "text": "Stack tanlash: CRM, workflow, API, AI qatlam. Integratsiyalar spetsifikatsiyasi — ishlab chiqishdan oldin."
      },
      {
        "title": "Ishlab chiqish va integratsiyalar",
        "text": "amoCRM, Bitrix24, 1С, Telegram, hujjatlar va ichki API. Navbatlar, idempotentlik, jurnal."
      },
      {
        "title": "Production va topshirish",
        "text": "Deploy, monitoring, hujjatlar, oʻqitish. Go-live dan keyin SLA qoʻllab-quvvatlash — ixtiyoriy."
      }
    ],
    "architecture": [
      "MCP servers",
      "Auth",
      "Tools",
      "Agent"
    ],
    "roi": [
      {
        "value": "50 mln+",
        "label": "soʻm"
      }
    ],
    "faq": [
      {
        "q": "Narx oraligʻi qanday?",
        "a": "Audit 15 000 000 soʻmdan, pilot 30 000 000 soʻmdan, joriy etish 50 000 000 soʻmdan. Aniq smeta — discovery dan keyin."
      },
      {
        "q": "NDA va yopiq kontur bormi?",
        "a": "Ha. NDA standart; on-premise yoki mahalliy bulut — soʻrov boʻyicha."
      },
      {
        "q": "Muddat?",
        "a": "Pilot odatda 2–6 hafta; toʻliq production integratsiyalar soniga bogʻliq."
      },
      {
        "q": "Kod kimga tegishli?",
        "a": "Shartnomaga koʻra buyurtmachiga — topshirish va hujjatlar bilan."
      }
    ],
    "related": [
      {
        "href": "/services/ai-agent",
        "label": "AI-agentlar"
      },
      {
        "href": "/claude",
        "label": "Claude"
      }
    ]
  },
  "langgraph": {
    "problemsTitle": "Tipik muammolar",
    "deliverablesTitle": "Nima olasiz",
    "howWeSolveTitle": "Qanday ishlaymiz",
    "architectureTitle": "Tipik arxitektura",
    "roiTitle": "Orientir effekt",
    "faqTitle": "Tez-tez beriladigan savollar",
    "eyebrow": "Xizmat · Offer",
    "metaTitle": "LangGraph agentlar va orchestration | Bober AI",
    "metaDescription": "State, HITL va observability bilan koʻp bosqichli agentlar. Soʻmda smeta.",
    "h1": "LangGraph orchestration",
    "subtitle": "Oddiy zanjirdan murakkabroq stsenariylar.",
    "problems": [
      "Chala agentlar",
      "State yoʻq",
      "Qayta ishga tushirish qiyin"
    ],
    "deliverables": [
      "Graf",
      "HITL",
      "Monitoring"
    ],
    "intro": [
      "Kerak boʻlganda LangGraph."
    ],
    "howWeSolve": [
      {
        "title": "Audit va ROI",
        "text": "Jarayon egalaridan intervyu, oqimlar xaritasi, yoʻqotish nuqtalari. Stsenariylarni oʻzini oqlash boʻyicha ustuvorlashtirish."
      },
      {
        "title": "Arxitektura",
        "text": "Stack tanlash: CRM, workflow, API, AI qatlam. Integratsiyalar spetsifikatsiyasi — ishlab chiqishdan oldin."
      },
      {
        "title": "Ishlab chiqish va integratsiyalar",
        "text": "amoCRM, Bitrix24, 1С, Telegram, hujjatlar va ichki API. Navbatlar, idempotentlik, jurnal."
      },
      {
        "title": "Production va topshirish",
        "text": "Deploy, monitoring, hujjatlar, oʻqitish. Go-live dan keyin SLA qoʻllab-quvvatlash — ixtiyoriy."
      }
    ],
    "architecture": [
      "Graph",
      "Checkpoints",
      "Tools",
      "UI/HITL"
    ],
    "roi": [
      {
        "value": "50 mln+",
        "label": "soʻm"
      }
    ],
    "faq": [
      {
        "q": "Narx oraligʻi qanday?",
        "a": "Audit 15 000 000 soʻmdan, pilot 30 000 000 soʻmdan, joriy etish 50 000 000 soʻmdan. Aniq smeta — discovery dan keyin."
      },
      {
        "q": "NDA va yopiq kontur bormi?",
        "a": "Ha. NDA standart; on-premise yoki mahalliy bulut — soʻrov boʻyicha."
      },
      {
        "q": "Muddat?",
        "a": "Pilot odatda 2–6 hafta; toʻliq production integratsiyalar soniga bogʻliq."
      },
      {
        "q": "Kod kimga tegishli?",
        "a": "Shartnomaga koʻra buyurtmachiga — topshirish va hujjatlar bilan."
      }
    ],
    "related": [
      {
        "href": "/services/ai-agent",
        "label": "AI-agentlar"
      }
    ]
  },
  "knowledge-base": {
    "problemsTitle": "Tipik muammolar",
    "deliverablesTitle": "Nima olasiz",
    "howWeSolveTitle": "Qanday ishlaymiz",
    "architectureTitle": "Tipik arxitektura",
    "roiTitle": "Orientir effekt",
    "faqTitle": "Tez-tez beriladigan savollar",
    "eyebrow": "Xizmat · Offer",
    "metaTitle": "Bilim bazasi mahsuloti — search, ACL, AI | Bober AI",
    "metaDescription": "Yagona reglamentlar joyi + AI javoblar. 50 000 000 soʻmdan.",
    "h1": "Qoʻllab-quvvatlash va HR uchun bilim bazasi",
    "subtitle": "Search + ACL + AI qatlam.",
    "problems": [
      "Takroriy savollar",
      "Tarqoq PDF",
      "Onboarding sekin"
    ],
    "deliverables": [
      "KB",
      "Search/RAG",
      "Integratsiya"
    ],
    "intro": [
      "Support keys: takroriy savollar −50% gacha."
    ],
    "howWeSolve": [
      {
        "title": "Audit va ROI",
        "text": "Jarayon egalaridan intervyu, oqimlar xaritasi, yoʻqotish nuqtalari. Stsenariylarni oʻzini oqlash boʻyicha ustuvorlashtirish."
      },
      {
        "title": "Arxitektura",
        "text": "Stack tanlash: CRM, workflow, API, AI qatlam. Integratsiyalar spetsifikatsiyasi — ishlab chiqishdan oldin."
      },
      {
        "title": "Ishlab chiqish va integratsiyalar",
        "text": "amoCRM, Bitrix24, 1С, Telegram, hujjatlar va ichki API. Navbatlar, idempotentlik, jurnal."
      },
      {
        "title": "Production va topshirish",
        "text": "Deploy, monitoring, hujjatlar, oʻqitish. Go-live dan keyin SLA qoʻllab-quvvatlash — ixtiyoriy."
      }
    ],
    "architecture": [
      "Content",
      "Index",
      "ACL",
      "Chat"
    ],
    "roi": [
      {
        "value": "−50%",
        "label": "takroriy savollar"
      }
    ],
    "faq": [
      {
        "q": "Narx oraligʻi qanday?",
        "a": "Audit 15 000 000 soʻmdan, pilot 30 000 000 soʻmdan, joriy etish 50 000 000 soʻmdan. Aniq smeta — discovery dan keyin."
      },
      {
        "q": "NDA va yopiq kontur bormi?",
        "a": "Ha. NDA standart; on-premise yoki mahalliy bulut — soʻrov boʻyicha."
      },
      {
        "q": "Muddat?",
        "a": "Pilot odatda 2–6 hafta; toʻliq production integratsiyalar soniga bogʻliq."
      },
      {
        "q": "Kod kimga tegishli?",
        "a": "Shartnomaga koʻra buyurtmachiga — topshirish va hujjatlar bilan."
      }
    ],
    "related": [
      {
        "href": "/services/rag",
        "label": "RAG"
      },
      {
        "href": "/portfolio/support-knowledge-base",
        "label": "Keys"
      }
    ],
    "caseStudySlugs": [
      "support-knowledge-base",
      "employee-onboarding-portal"
    ]
  },
  "ai-consulting": {
    "problemsTitle": "Tipik muammolar",
    "deliverablesTitle": "Nima olasiz",
    "howWeSolveTitle": "Qanday ishlaymiz",
    "architectureTitle": "Tipik arxitektura",
    "roiTitle": "Orientir effekt",
    "faqTitle": "Tez-tez beriladigan savollar",
    "eyebrow": "Xizmat · Offer",
    "metaTitle": "Enterprise uchun AI-konsalting | Bober AI",
    "metaDescription": "Strategiya, audit, vendor tanlash, roadmap. 15 000 000 soʻmdan. Toshkent.",
    "h1": "AI-konsalting",
    "subtitle": "Buzzwordsiz amaliy konsalting.",
    "problems": [
      "Hype roadmap",
      "Vendor chalkashligi",
      "ROI yoʻq"
    ],
    "deliverables": [
      "Strategiya",
      "Vendor shortlist",
      "90 kunlik reja"
    ],
    "intro": [
      "Koʻpincha keyingi qadam — audit paketi."
    ],
    "howWeSolve": [
      {
        "title": "Audit va ROI",
        "text": "Jarayon egalaridan intervyu, oqimlar xaritasi, yoʻqotish nuqtalari. Stsenariylarni oʻzini oqlash boʻyicha ustuvorlashtirish."
      },
      {
        "title": "Arxitektura",
        "text": "Stack tanlash: CRM, workflow, API, AI qatlam. Integratsiyalar spetsifikatsiyasi — ishlab chiqishdan oldin."
      },
      {
        "title": "Ishlab chiqish va integratsiyalar",
        "text": "amoCRM, Bitrix24, 1С, Telegram, hujjatlar va ichki API. Navbatlar, idempotentlik, jurnal."
      },
      {
        "title": "Production va topshirish",
        "text": "Deploy, monitoring, hujjatlar, oʻqitish. Go-live dan keyin SLA qoʻllab-quvvatlash — ixtiyoriy."
      }
    ],
    "architecture": [
      "Workshop",
      "Assessment",
      "Roadmap",
      "RFP yordam"
    ],
    "roi": [
      {
        "value": "15 mln+",
        "label": "soʻm — kirish"
      }
    ],
    "faq": [
      {
        "q": "Narx oraligʻi qanday?",
        "a": "Audit 15 000 000 soʻmdan, pilot 30 000 000 soʻmdan, joriy etish 50 000 000 soʻmdan. Aniq smeta — discovery dan keyin."
      },
      {
        "q": "NDA va yopiq kontur bormi?",
        "a": "Ha. NDA standart; on-premise yoki mahalliy bulut — soʻrov boʻyicha."
      },
      {
        "q": "Muddat?",
        "a": "Pilot odatda 2–6 hafta; toʻliq production integratsiyalar soniga bogʻliq."
      },
      {
        "q": "Kod kimga tegishli?",
        "a": "Shartnomaga koʻra buyurtmachiga — topshirish va hujjatlar bilan."
      }
    ],
    "related": [
      {
        "href": "/services/ai-discovery-roadmap",
        "label": "Discovery"
      },
      {
        "href": "/pricing",
        "label": "Narxlar"
      }
    ]
  },
  "crm-integration": {
    "problemsTitle": "Tipik muammolar",
    "deliverablesTitle": "Nima olasiz",
    "howWeSolveTitle": "Qanday ishlaymiz",
    "architectureTitle": "Tipik arxitektura",
    "roiTitle": "Orientir effekt",
    "faqTitle": "Tez-tez beriladigan savollar",
    "eyebrow": "Xizmat · Offer",
    "metaTitle": "CRM ni 1С, sayt, Telegram bilan integratsiya | Bober AI",
    "metaDescription": "Bitrix24 / amoCRM integratsiyalari. 50 000 000 soʻmdan. Oʻzbekiston.",
    "h1": "CRM integratsiyasi",
    "subtitle": "Ikki tomonlama sync, webhooks, monitoring.",
    "problems": [
      "Qoʻlda sinxron",
      "Yoʻqolgan lidlar",
      "Ikki haqiqat manbai"
    ],
    "deliverables": [
      "Integratsiya konturi",
      "Retry/audit",
      "Hujjatlar"
    ],
    "intro": [
      "Portal sizda qoladi."
    ],
    "howWeSolve": [
      {
        "title": "Audit va ROI",
        "text": "Jarayon egalaridan intervyu, oqimlar xaritasi, yoʻqotish nuqtalari. Stsenariylarni oʻzini oqlash boʻyicha ustuvorlashtirish."
      },
      {
        "title": "Arxitektura",
        "text": "Stack tanlash: CRM, workflow, API, AI qatlam. Integratsiyalar spetsifikatsiyasi — ishlab chiqishdan oldin."
      },
      {
        "title": "Ishlab chiqish va integratsiyalar",
        "text": "amoCRM, Bitrix24, 1С, Telegram, hujjatlar va ichki API. Navbatlar, idempotentlik, jurnal."
      },
      {
        "title": "Production va topshirish",
        "text": "Deploy, monitoring, hujjatlar, oʻqitish. Go-live dan keyin SLA qoʻllab-quvvatlash — ixtiyoriy."
      }
    ],
    "architecture": [
      "CRM",
      "Bus/webhooks",
      "1С/sayt",
      "Obs"
    ],
    "roi": [
      {
        "value": "50 mln+",
        "label": "soʻm"
      }
    ],
    "faq": [
      {
        "q": "Narx oraligʻi qanday?",
        "a": "Audit 15 000 000 soʻmdan, pilot 30 000 000 soʻmdan, joriy etish 50 000 000 soʻmdan. Aniq smeta — discovery dan keyin."
      },
      {
        "q": "NDA va yopiq kontur bormi?",
        "a": "Ha. NDA standart; on-premise yoki mahalliy bulut — soʻrov boʻyicha."
      },
      {
        "q": "Muddat?",
        "a": "Pilot odatda 2–6 hafta; toʻliq production integratsiyalar soniga bogʻliq."
      },
      {
        "q": "Kod kimga tegishli?",
        "a": "Shartnomaga koʻra buyurtmachiga — topshirish va hujjatlar bilan."
      }
    ],
    "related": [
      {
        "href": "/services/ai-sales-loop",
        "label": "AI sales loop"
      },
      {
        "href": "/portfolio/crm-1c-sync",
        "label": "Keys"
      }
    ],
    "caseStudySlugs": [
      "crm-1c-sync",
      "amocrm-website-integration"
    ]
  }
};
