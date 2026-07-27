/** AI on Kubernetes / closed-contour productionization landing — path /ai-kubernetes. */
export const AI_KUBERNETES_PAGE = {
  lineRu: "Bober AI on Kubernetes",
  lineEn: "Bober AI on Kubernetes",

  metaTitleRu: "AI в Kubernetes и закрытом контуре: LLM, RAG, агенты | Bober AI",
  metaTitleEn: "AI on Kubernetes and closed contour: LLM, RAG, agents | Bober AI",
  metaDescRu:
    "Развертывание LLM, RAG и AI-агентов в Kubernetes или закрытом контуре: контейнеризация, GPU, RBAC, журналирование, мониторинг, интеграция с Kaspersky Container Security.",
  metaDescEn:
    "Deploying LLM, RAG and AI agents on Kubernetes or in a closed contour: containerization, GPU, RBAC, logging, monitoring, Kaspersky Container Security integration.",
  metaKeywordsRu: [
    "развертывание llm в kubernetes",
    "rag в kubernetes",
    "ai в закрытом контуре",
    "корпоративный llm on-premise",
    "внедрение llm в инфраструктуре компании",
    "ai-агенты в kubernetes",
    "безопасное развертывание llm",
    "локальное развертывание нейросети",
    "kubernetes для машинного обучения",
    "защита ai-приложений в kubernetes",
    "аудит готовности kubernetes для ai",
    "production llm под ключ",
  ],
  metaKeywordsEn: [
    "deploy llm on kubernetes",
    "rag on kubernetes",
    "ai closed contour",
    "corporate llm on-premise",
    "ai agents on kubernetes",
    "secure llm deployment",
    "kubernetes for machine learning",
    "llm productionization",
  ],

  h1Ru: "Корпоративный AI в Kubernetes и закрытом контуре",
  h1En: "Enterprise AI on Kubernetes and in a closed contour",
  subtitleRu:
    "Переносим LLM, RAG и AI-агентов из прототипа в промышленную инфраструктуру: контейнеризация, GPU, роли и доступы, журналирование, мониторинг и интеграция с корпоративными системами.",
  subtitleEn:
    "We move LLM, RAG and AI agents from prototype to production infrastructure: containerization, GPU, roles and access, logging, monitoring and integration with corporate systems.",

  problemsTitleRu: "Знакомая ситуация",
  problemsTitleEn: "A familiar situation",
  problemsRu: [
    "Прототип работает, но его нельзя согласовать с ИБ",
    "Данные нельзя отправлять во внешние API",
    "Нет контроля доступа к базе знаний",
    "AI-агент имеет избыточные права",
    "Нет журналирования действий и обращений к данным",
    "Непонятно, как масштабировать модель на GPU",
  ],
  problemsEn: [
    "The prototype works, but security won't sign off on it",
    "Data can't leave the perimeter to external APIs",
    "No access control over the knowledge base",
    "The AI agent has excessive permissions",
    "No logging of actions or data access",
    "Unclear how to scale the model across GPUs",
  ],

  servicesTitleRu: "Услуги",
  servicesTitleEn: "Services",
  servicesRu: [
    {
      title: "AI Kubernetes Readiness Audit",
      summary: "Аудит готовности инфраструктуры к запуску LLM/RAG.",
    },
    {
      title: "LLM Productionization",
      summary: "Перенос работающего прототипа в production.",
    },
    {
      title: "Secure RAG Deployment",
      summary: "База знаний с ролями, фильтрацией документов и аудитом запросов.",
    },
    {
      title: "AI Agent Runtime",
      summary: "Изолированная среда для агентов и контроль доступных инструментов.",
    },
    {
      title: "Container Security Integration",
      summary: "Подготовка AI-приложения к интеграции с DevSecOps и Kaspersky Container Security.",
      href: "/kaspersky/container-security-kira" as const,
    },
  ],
  servicesEn: [
    {
      title: "AI Kubernetes Readiness Audit",
      summary: "Infrastructure readiness audit before an LLM/RAG rollout.",
    },
    {
      title: "LLM Productionization",
      summary: "Moving a working prototype into production.",
    },
    {
      title: "Secure RAG Deployment",
      summary: "Knowledge base with roles, document filtering and query audit.",
    },
    {
      title: "AI Agent Runtime",
      summary: "Isolated environment for agents and control over available tools.",
    },
    {
      title: "Container Security Integration",
      summary: "Preparing the AI application for DevSecOps and Kaspersky Container Security.",
      href: "/kaspersky/container-security-kira" as const,
    },
  ],

  kasperskyNoteTitleRu: "Как это связано с Kaspersky",
  kasperskyNoteTitleEn: "How this connects to Kaspersky",
  kasperskyNoteRu:
    "Используем практики безопасной контейнеризации и можем учитывать требования к интеграции с Kaspersky Container Security — сканирование образов, политики и контроль runtime кластера. Слой AI проектируем и внедряем мы; средства защиты контейнерной инфраструктуры поставляются и настраиваются как отдельный продукт через партнёрскую дистрибуцию.",
  kasperskyNoteEn:
    "We follow secure containerization practices and can account for integration requirements with Kaspersky Container Security — image scanning, policies and cluster runtime control. We design and deploy the AI layer; container security tooling is supplied and configured as a separate product via authorized distribution.",

  processTitleRu: "Как проходит внедрение",
  processTitleEn: "How an engagement runs",
  processRu: [
    "Аудит контура: инфраструктура, данные, модель, агенты — что уже есть и чего не хватает",
    "Проектирование архитектуры: Kubernetes/OpenShift/DeckHouse, GPU-ноды, namespace, сеть",
    "Контейнеризация LLM/RAG/агентов, RBAC, секреты, журналирование, мониторинг",
    "Опционально — подготовка к интеграции с Kaspersky Container Security и передача команде",
  ],
  processEn: [
    "Contour audit: infrastructure, data, model, agents — what exists and what is missing",
    "Architecture design: Kubernetes/OpenShift/DeckHouse, GPU nodes, namespaces, network",
    "Containerize LLM/RAG/agents, RBAC, secrets, logging, monitoring",
    "Optional — prepare for Kaspersky Container Security integration and handover to the team",
  ],

  packHref: "/services/secure-private-ai-cloud",
  packLabelRu: "Пакет Secure Private AI Cloud",
  packLabelEn: "Secure Private AI Cloud pack",
  kasperskyHref: "/kaspersky/container-security-kira",
  kasperskyLabelRu: "Kaspersky Container Security + KIRA",
  kasperskyLabelEn: "Kaspersky Container Security + KIRA",
  secureAiHref: "/secure-ai",
  secureAiLabelRu: "Bober Secure AI",
  secureAiLabelEn: "Bober Secure AI",

  faqRu: [
    {
      q: "Можно развернуть LLM и RAG в закрытом контуре без выхода в интернет?",
      a: "Да. Модель, RAG и агенты разворачиваются on-prem или в изолированном сегменте Kubernetes — без исходящих запросов к внешним API.",
    },
    {
      q: "Чем вы отличаетесь от классических DevOps-интеграторов?",
      a: "Мы проектируем и внедряем именно AI-слой — LLM, RAG, агентов — так, чтобы он корректно жил в Kubernetes и был готов к интеграции со средствами защиты. Kubernetes для нас инфраструктура под конкретный AI-продукт, а не отдельная услуга.",
    },
    {
      q: "Какие GPU и оркестраторы вы поддерживаете?",
      a: "Kubernetes, OpenShift, DeckHouse; CPU и GPU inference, шаринг GPU между нагрузками, автоскейлинг под пиковую нагрузку модели.",
    },
    {
      q: "Что входит в AI Kubernetes Readiness Audit?",
      a: "Проверка кластера, сети, доступов и данных на готовность к продакшен-запуску LLM/RAG: узкие места, риски ИБ, смета доработок и дорожная карта.",
    },
    {
      q: "Можно подключить Kaspersky Container Security к уже работающему кластеру?",
      a: "Да, через отдельный продукт Container Security Integration — готовим кластер и AI-приложение к интеграции, а поставка и настройка средства защиты идёт через партнёрскую дистрибуцию Kaspersky.",
    },
  ],
  faqEn: [
    {
      q: "Can LLM and RAG run in a closed contour with no internet access?",
      a: "Yes. The model, RAG and agents deploy on-prem or in an isolated Kubernetes segment — no outbound calls to external APIs.",
    },
    {
      q: "How is this different from a generic DevOps integrator?",
      a: "We design and deploy the AI layer itself — LLM, RAG, agents — so it runs correctly on Kubernetes and is ready for security tooling integration. Kubernetes is infrastructure for a specific AI product here, not a standalone service.",
    },
    {
      q: "Which GPUs and orchestrators do you support?",
      a: "Kubernetes, OpenShift, DeckHouse; CPU and GPU inference, GPU sharing across workloads, autoscaling for peak model load.",
    },
    {
      q: "What's included in the AI Kubernetes Readiness Audit?",
      a: "A check of the cluster, network, access and data for production-readiness of LLM/RAG: bottlenecks, security risks, a scope estimate and a roadmap.",
    },
    {
      q: "Can Kaspersky Container Security be added to an already running cluster?",
      a: "Yes, via the separate Container Security Integration product — we prepare the cluster and the AI application for integration, and the security tool itself is supplied and configured via Kaspersky's authorized distribution.",
    },
  ],
} as const;
