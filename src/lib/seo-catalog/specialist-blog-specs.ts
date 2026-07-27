import type { IntentArticleSpec } from "@/lib/seo-catalog/types";

/**
 * Deep technical articles for specialist search intent.
 *
 * Keep these separate from the Wordstat-generated owner-intent catalog: they
 * target architects, technical buyers and implementation leads, and should not
 * be overwritten when the broad SEO catalog is regenerated.
 */
export const SPECIALIST_ARTICLE_SPECS: IntentArticleSpec[] = [
  {
    slug: "ai-crm-automation-architecture",
    cluster: "specialist-ai-architecture",
    keywords: [
      "AI CRM automation",
      "автоматизация CRM с AI",
      "AI интеграция с CRM",
      "AI для Bitrix24",
      "AI для amoCRM",
    ],
    related: [
      { href: "/services/crm-integration", labelRu: "Интеграция CRM", labelEn: "CRM integration" },
      { href: "/services/sales-ai-agent", labelRu: "AI-агент для продаж", labelEn: "Sales AI agent" },
      { href: "/blog/ai-agents-in-sales-architecture", labelRu: "Архитектура AI-агента в продажах", labelEn: "Sales AI agent architecture" },
      { href: "/blog/mcp-vs-api", labelRu: "MCP vs API", labelEn: "MCP vs API" },
      { href: "/blog/ai-automation-architecture", labelRu: "AI Automation: архитектура", labelEn: "AI automation architecture" },
    ],
    publishedAt: "2026-07-25",
    ru: {
      title: "AI CRM Automation: архитектура, сценарии и контроль качества",
      description:
        "Как встроить AI в Bitrix24, amoCRM или кастомную CRM: события, контекст, LLM, действия, guardrails, аудит и метрики production-системы.",
      h1: "AI CRM Automation: production-архитектура без отдельного AI-интерфейса",
      sections: [
        {
          title: "Что означает AI CRM Automation",
          paragraphs: [
            "AI CRM Automation — это не чат поверх базы клиентов. Это событийный контур, в котором CRM остаётся системой записи, а AI помогает классифицировать лиды, собирать сводки, готовить следующий шаг и заполнять черновики полей. Менеджер продолжает работать в карточке сделки, поэтому рекомендации не создают ещё один интерфейс и ещё одну очередь задач.",
            "Главное разделение ответственности: правила CRM выполняют детерминированные операции, а модель обрабатывает неструктурированный контекст. Смена этапа после оплаты должна зависеть от статуса платёжной системы, а не от ответа LLM. Модель уместна там, где нужно понять письмо, звонок или историю коммуникации и подготовить предложение человеку.",
          ],
        },
        {
          title: "Референсная архитектура",
          paragraphs: [
            "Поток выглядит так: webhook CRM → очередь событий → сервис оркестрации → сбор разрешённого контекста → вызов модели → проверка структурированного ответа → запись результата в CRM. Очередь отделяет пользовательскую операцию от медленного AI-вызова, позволяет повторять запросы и не терять события при временной недоступности CRM или провайдера модели.",
            "Для каждого сценария нужен отдельный контракт данных. Классификатор лида возвращает категорию, уверенность и причины; генератор follow-up — тему, текст и использованные факты; next-best-action — действие и срок. JSON Schema или аналогичная валидация отсекает сломанные ответы до записи. Идемпотентный ключ не даёт повторному webhook создать два задания или два письма.",
          ],
        },
        {
          title: "Контекст, память и права доступа",
          paragraphs: [
            "Модели не следует передавать всю карточку клиента. Контекст собирается под конкретную задачу: последние сообщения, активные товары, этап и разрешённые поля. Такой подход уменьшает стоимость и риск утечки, а также повышает точность — нерелевантная история не конкурирует с текущим запросом.",
            "Права должны наследоваться из CRM. Если менеджер не видит маржу, агент не должен получать её через техническую учётную запись. Чувствительные поля маскируются перед вызовом внешней модели, а on-prem контур использует те же контракты инструментов и валидацию. Для каждого результата сохраняются сценарий, версия prompt, модель и источники контекста.",
          ],
        },
        {
          title: "Guardrails и человек в контуре",
          paragraphs: [
            "На старте AI должен готовить черновики, а не выполнять необратимые действия. Отправка письма, изменение скидки, закрытие сделки и удаление данных требуют подтверждения или жёсткого бизнес-правила. Расширять автоматизацию стоит только после сбора статистики ошибок на реальных сделках.",
            "Защита не заканчивается системным prompt. Нужны списки разрешённых полей и действий, лимиты значений, фильтрация входа, валидация выхода и журнал аудита. Prompt injection в письме клиента не должен менять системные инструкции или заставлять агента получать данные из другой сделки.",
          ],
        },
        {
          title: "Как измерять эффект внедрения",
          paragraphs: [
            "Технические метрики — задержка, доля валидных структурированных ответов, стоимость вызова, число повторов и ошибки записи в CRM. Бизнес-метрики зависят от сценария: время от лида до первого ответа, время подготовки follow-up, доля карточек с заполненными полями и число сделок без активности дольше SLA.",
            "Самый безопасный старт — один процесс и контрольная группа. В течение двух–четырёх недель сравнивают время работы, качество данных и конверсию с прежним процессом. Если AI лишь переносит работу с написания текста на исправление плохих черновиков, сценарий не готов к масштабированию.",
          ],
        },
      ],
      checklist: {
        title: "Чек-лист перед запуском AI в CRM",
        items: [
          "Контракт данных для каждого сценария задан схемой (JSON Schema или аналог), сломанный ответ не пишется в CRM",
          "Idempotency-ключ на входящий webhook — повтор события не создаёт вторую задачу или письмо",
          "Права агента наследуются из CRM — сервисный аккаунт не видит больше, чем видит менеджер",
          "Необратимые действия (отправка письма, скидка, закрытие сделки) требуют подтверждения человека",
          "Есть журнал аудита: сценарий, версия prompt, модель и источники контекста по каждому результату",
          "Запуск на одном процессе с контрольной группой на 2–4 недели, а не сразу на весь отдел продаж",
        ],
      },
      codeSnippet: {
        title: "Пример контракта ответа для классификатора лида",
        language: "json",
        code: `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["category", "confidence", "reasons"],
  "properties": {
    "category": { "enum": ["hot", "warm", "cold", "spam"] },
    "confidence": { "type": "number", "minimum": 0, "maximum": 1 },
    "reasons": { "type": "array", "items": { "type": "string" }, "maxItems": 3 },
    "suggested_next_action": { "type": "string", "maxLength": 200 }
  },
  "additionalProperties": false
}`,
      },
      faq: [
        {
          q: "Может ли AI самостоятельно менять данные в CRM?",
          a: "Да, но начинать следует с обратимых и хорошо валидируемых операций. Скидки, отправка сообщений и закрытие сделок сначала должны требовать подтверждения.",
        },
        {
          q: "Нужна ли векторная база?",
          a: "Не для каждого сценария. Историю текущей сделки можно получить напрямую из CRM; RAG нужен, когда ответ требует знаний из большой базы документов или продуктов.",
        },
        {
          q: "С чего начать автоматизацию CRM с AI?",
          a: "С одной частой и измеримой задачи: сводки разговора, классификации лида или черновика follow-up с записью результата в существующий интерфейс CRM.",
        },
      ],
    },
    en: {
      title: "AI CRM Automation: architecture, use cases and quality controls",
      description:
        "How to embed AI into Bitrix24, amoCRM or a custom CRM: events, context, LLMs, actions, guardrails, auditability and production metrics.",
      h1: "AI CRM Automation: a production architecture inside the existing CRM",
      sections: [
        {
          title: "What AI CRM Automation means",
          paragraphs: [
            "AI CRM Automation is not a chatbot placed on top of a customer database. It is an event-driven system where the CRM remains the system of record while AI classifies leads, summarizes conversations, drafts next steps and proposes field updates. Reps keep working in the deal card, so recommendations do not create another interface or another task queue.",
            "Responsibility must stay explicit: CRM rules execute deterministic operations, while the model handles unstructured context. A paid order should advance because the payment system confirms it, not because an LLM says so. The model belongs where the system must interpret an email, call or conversation history and prepare a suggestion for a person.",
          ],
        },
        {
          title: "Reference architecture",
          paragraphs: [
            "A robust flow is CRM webhook → event queue → orchestration service → scoped context retrieval → model call → structured-output validation → CRM write-back. The queue separates the user transaction from a slower AI call, supports retries and prevents lost events when the CRM or model provider is temporarily unavailable.",
            "Each use case needs its own data contract. Lead classification returns a category, confidence and reasons; a follow-up generator returns a subject, body and facts used; next-best-action returns an action and due date. JSON Schema or equivalent validation rejects malformed output before it reaches the CRM. An idempotency key prevents a retried webhook from creating duplicate tasks or messages.",
          ],
        },
        {
          title: "Context, memory and access control",
          paragraphs: [
            "The model should not receive the entire customer record. Context is assembled for the specific task: recent messages, active products, pipeline stage and approved fields. This reduces cost and leakage risk while improving accuracy because irrelevant history no longer competes with the current request.",
            "Authorization must inherit CRM permissions. If a rep cannot see margin, an agent must not retrieve it through a service account. Sensitive fields are masked before an external model call, and an on-prem deployment should preserve the same tool contracts and validation. Every result records the scenario, prompt version, model and context sources used.",
          ],
        },
        {
          title: "Guardrails and human approval",
          paragraphs: [
            "AI should begin in draft mode, not with irreversible actions. Sending an email, changing a discount, closing a deal and deleting data require approval or a deterministic business rule. Automation can expand only after error statistics have been collected on real deals.",
            "Safety is more than a system prompt. Use allowlists for fields and actions, value limits, input filtering, output validation and an audit log. Prompt injection inside a customer's email must not override system instructions or make the agent retrieve data from another account.",
          ],
        },
        {
          title: "Measuring the outcome",
          paragraphs: [
            "Technical metrics include latency, valid structured-output rate, cost per run, retry count and CRM write failures. Business metrics depend on the use case: lead-to-first-response time, follow-up preparation time, share of records with complete fields and number of deals inactive beyond the agreed SLA.",
            "The safest launch uses one process and a control group. Compare work time, data quality and conversion with the previous process for two to four weeks. If AI merely moves work from writing to correcting poor drafts, the use case is not ready to scale.",
          ],
        },
      ],
      checklist: {
        title: "Pre-launch checklist for AI in CRM",
        items: [
          "Every use case has a schema-validated data contract (JSON Schema or equivalent) — malformed output never gets written to the CRM",
          "Idempotency key on the inbound webhook — a retried event doesn't create a duplicate task or message",
          "Agent permissions inherit from the CRM — the service account never sees more than the rep does",
          "Irreversible actions (sending an email, a discount, closing a deal) require human approval",
          "An audit log records the scenario, prompt version, model and context sources for every result",
          "Launch on one process with a control group for 2–4 weeks, not the whole sales team at once",
        ],
      },
      codeSnippet: {
        title: "Example response contract for a lead classifier",
        language: "json",
        code: `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["category", "confidence", "reasons"],
  "properties": {
    "category": { "enum": ["hot", "warm", "cold", "spam"] },
    "confidence": { "type": "number", "minimum": 0, "maximum": 1 },
    "reasons": { "type": "array", "items": { "type": "string" }, "maxItems": 3 },
    "suggested_next_action": { "type": "string", "maxLength": 200 }
  },
  "additionalProperties": false
}`,
      },
      faq: [
        {
          q: "Can AI update CRM data autonomously?",
          a: "Yes, but start with reversible, tightly validated operations. Discounts, outbound messages and deal closure should initially require approval.",
        },
        {
          q: "Does AI CRM automation require a vector database?",
          a: "Not for every use case. Current deal history can come directly from the CRM; RAG is useful when answers require a large document or product knowledge base.",
        },
        {
          q: "What is the best first AI CRM use case?",
          a: "Choose one frequent, measurable task such as call summaries, lead classification or follow-up drafts, and write the result into the CRM interface the team already uses.",
        },
      ],
    },
  },
  {
    slug: "mcp-vs-api",
    cluster: "specialist-ai-architecture",
    keywords: ["MCP vs API", "Model Context Protocol vs REST API", "MCP сервер", "MCP интеграция", "MCP или API"],
    related: [
      { href: "/services/mcp", labelRu: "Разработка MCP-интеграций", labelEn: "MCP integrations" },
      { href: "/services/crm-integration", labelRu: "Интеграция бизнес-систем", labelEn: "Business system integration" },
      { href: "/blog/ai-crm-automation-architecture", labelRu: "AI CRM Automation", labelEn: "AI CRM Automation" },
      { href: "/blog/ai-agents-in-sales-architecture", labelRu: "AI-агенты в продажах", labelEn: "AI agents in sales" },
    ],
    publishedAt: "2026-07-25",
    ru: {
      title: "MCP vs API: что выбрать для AI-агента и корпоративной интеграции",
      description:
        "MCP не заменяет REST API. Разбираем discovery инструментов, JSON-RPC, transports, авторизацию, контроль действий и практическую архитектуру MCP поверх API.",
      h1: "MCP vs API: границы протокола, архитектура и критерии выбора",
      sections: [
        {
          title: "Короткий ответ",
          paragraphs: [
            "API — это контракт конкретной системы: какие операции доступны, какие данные передать и какой ответ получить. MCP — стандартный слой подключения AI-приложения к инструментам и контексту. Он описывает, как клиент обнаруживает tools, resources и prompts, согласует возможности и вызывает их через единый протокол.",
            "Поэтому выбор «MCP или API» часто ложный. Production MCP-сервер обычно вызывает существующий REST, GraphQL, gRPC или SDK. API остаётся системным контрактом, а MCP добавляет AI-ориентированное discovery, схемы инструментов, жизненный цикл соединения и переносимость между совместимыми клиентами.",
          ],
        },
        {
          title: "Как устроен MCP",
          paragraphs: [
            "MCP использует клиент-серверную архитектуру и сообщения JSON-RPC. Host AI создаёт клиент для каждого MCP-сервера, запрашивает его возможности и получает список доступных инструментов. Сервер может предоставить tools для действий, resources для контекста и prompts как повторно используемые шаблоны.",
            "Стандартные transports решают разные задачи: stdio подходит для локального процесса, а Streamable HTTP — для удалённого многопользовательского сервера. Transport не заменяет бизнес-авторизацию: после аутентификации пользователя сервер всё равно проверяет, может ли тот читать конкретную сделку или выполнять операцию.",
          ],
        },
        {
          title: "Где обычный API лучше",
          paragraphs: [
            "Прямой API лучше для детерминированных интеграций system-to-system, больших потоков данных, транзакций со строгим порядком и сервисов без динамического discovery. Синхронизация заказов между CRM и ERP не должна зависеть от того, выбрала ли модель правильный инструмент.",
            "API также даёт более простую наблюдаемость и меньше слоёв. Если есть один клиент и три фиксированные операции, отдельный MCP-сервер может повысить стоимость поддержки без пользы. MCP окупается, когда одни и те же безопасные инструменты должны использовать несколько AI-приложений.",
          ],
        },
        {
          title: "Где MCP даёт преимущество",
          paragraphs: [
            "MCP упорядочивает интеграцию агента с несколькими системами. Вместо отдельного адаптера CRM, репозитория и базы данных в каждом host вы публикуете инструменты со схемами и описаниями. Совместимый клиент обнаруживает их и передаёт модели без специального кода для каждой пары клиент–сервер.",
            "Главная ценность появляется в управлении: единые имена, версии, лимиты, согласия, аудит и наборы инструментов для разных ролей. Это работает только с небольшими однозначными tools. Универсальный execute_sql или call_any_api переносит весь риск в prompt и не должен быть production-интерфейсом по умолчанию.",
          ],
        },
        {
          title: "Шаблон корпоративного внедрения",
          paragraphs: [
            "Самый безопасный шаблон — MCP как тонкий слой над существующими доменными сервисами. Tool get_deal_summary вызывает контролируемый endpoint CRM, а create_follow_up_task принимает ограниченную схему и проверяет роль пользователя. Сервер не обходит доменную логику и не подключается к базе с правами администратора.",
            "Для каждой операции задайте read-only или mutating, необходимость подтверждения, timeout, idempotency key и политику логирования. Отдельно измеряйте ошибки транспорта, выполнения tool и неверного выбора инструмента моделью. Так проблема интеграции отделяется от проблемы AI-оркестрации.",
          ],
        },
      ],
      comparisonTable: {
        title: "MCP или прямой API — что выбрать",
        headers: ["Критерий", "Прямой API", "MCP"],
        rows: [
          ["Клиент", "Один известный клиент", "Несколько AI-приложений/хостов"],
          ["Discovery инструментов", "Не нужен, контракт фиксирован", "Клиент сам находит tools/resources/prompts"],
          ["Детерминированные транзакции", "Лучше — меньше слоёв", "Хуже — модель выбирает вызов"],
          ["Governance (лимиты, роли, аудит)", "Пишется вручную под каждый сервис", "Единый слой поверх всех инструментов"],
          ["Стоимость поддержки на старте", "Ниже при 1–3 операциях", "Выше — отдельный сервер и схемы"],
        ],
      },
      codeSnippet: {
        title: "Пример MCP tool поверх CRM API",
        language: "json",
        code: `{
  "name": "create_follow_up_task",
  "description": "Создаёт задачу follow-up по сделке CRM",
  "inputSchema": {
    "type": "object",
    "required": ["dealId", "dueDate"],
    "properties": {
      "dealId": { "type": "string" },
      "dueDate": { "type": "string", "format": "date" },
      "note": { "type": "string", "maxLength": 500 }
    }
  },
  "annotations": { "mutating": true, "requiresApproval": false, "idempotencyKey": "dealId+dueDate" }
}`,
      },
      faq: [
        { q: "Заменит ли MCP REST API?", a: "Нет. MCP обычно оборачивает существующий API и стандартизированно предоставляет AI-приложениям его безопасное подмножество." },
        { q: "Нужен ли MCP для одного агента?", a: "Не всегда. Для нескольких фиксированных функций прямой tool calling может быть проще. MCP особенно полезен при множестве клиентов, систем и команд." },
        { q: "Как защитить MCP-инструменты?", a: "Применяйте права пользователя, allowlist операций, узкие схемы входа, подтверждение изменений, idempotency и полный журнал аудита." },
      ],
    },
    en: {
      title: "MCP vs API: what to choose for an AI agent and enterprise integration",
      description:
        "MCP does not replace a REST API. A practical comparison of tool discovery, JSON-RPC, transports, authorization, action controls and MCP-over-API architecture.",
      h1: "MCP vs API: protocol boundaries, architecture and selection criteria",
      sections: [
        {
          title: "The short answer",
          paragraphs: [
            "An API is the contract of a specific system: which operations exist, what data they accept and what they return. MCP is a standard connection layer between an AI application and tools or context. It defines how a client discovers tools, resources and prompts, negotiates capabilities and invokes them through a common protocol.",
            "That makes “MCP or API” a false choice in many systems. A production MCP server normally calls an existing REST, GraphQL, gRPC or SDK interface. The API remains the system contract; MCP adds AI-oriented discovery, tool schemas, connection lifecycle and portability across compatible clients.",
          ],
        },
        {
          title: "How MCP works",
          paragraphs: [
            "MCP uses a client-server architecture and JSON-RPC messages. An AI host creates a client for each MCP server, negotiates capabilities and retrieves available tools. A server can expose tools for actions, resources for contextual data and prompts as reusable interaction templates.",
            "The standard transports serve different environments: stdio is suited to a local subprocess, while Streamable HTTP supports a remote multi-user server. Transport-level authentication does not replace business authorization. After identifying the user, the server must still decide whether that user can read a particular deal or execute a specific operation.",
          ],
        },
        {
          title: "Where a direct API is better",
          paragraphs: [
            "A direct API is better for deterministic system-to-system integration, high-volume data flows, strictly ordered transactions and services that do not need dynamic discovery. Order synchronization between a CRM and ERP should not depend on whether a model selects the right tool.",
            "An API also provides simpler observability and fewer layers. With one client and three fixed operations, an MCP server may add maintenance cost without useful portability. MCP becomes valuable when the same governed tools must serve multiple AI applications.",
          ],
        },
        {
          title: "Where MCP adds value",
          paragraphs: [
            "MCP standardizes how an agent connects to many systems. Instead of embedding a custom CRM, repository and database adapter into every host, you publish tools with schemas and descriptions. A compatible client can discover them, present them to a user and expose them to a model without a custom integration for every client-server pair.",
            "The deeper benefit is governance: consistent naming, versioning, limits, consent, audit and role-specific tool sets. This only works when tools are narrow and explicit. A generic execute_sql or call_any_api tool moves the entire security boundary into a prompt and is a poor default production interface.",
          ],
        },
        {
          title: "Enterprise implementation pattern",
          paragraphs: [
            "The safest pattern is MCP as a thin layer over existing domain services. A get_deal_summary tool calls a controlled CRM endpoint, while create_follow_up_task accepts a constrained schema and enforces user roles. The MCP server does not bypass domain rules or connect to the database with unrestricted administrator rights.",
            "For every operation, define read-only or mutating status, approval requirements, timeout, idempotency key and logging policy. Measure transport failures, tool execution failures and incorrect model tool selection separately. This distinguishes integration defects from AI orchestration defects.",
          ],
        },
      ],
      comparisonTable: {
        title: "MCP vs a direct API — how to choose",
        headers: ["Criterion", "Direct API", "MCP"],
        rows: [
          ["Client", "One known client", "Multiple AI applications/hosts"],
          ["Tool discovery", "Not needed, contract is fixed", "Client discovers tools/resources/prompts itself"],
          ["Deterministic transactions", "Better — fewer layers", "Worse — the model picks the call"],
          ["Governance (limits, roles, audit)", "Hand-written per service", "One layer across all tools"],
          ["Maintenance cost at the start", "Lower for 1–3 operations", "Higher — a separate server and schemas"],
        ],
      },
      codeSnippet: {
        title: "Example MCP tool wrapping a CRM API",
        language: "json",
        code: `{
  "name": "create_follow_up_task",
  "description": "Creates a follow-up task on a CRM deal",
  "inputSchema": {
    "type": "object",
    "required": ["dealId", "dueDate"],
    "properties": {
      "dealId": { "type": "string" },
      "dueDate": { "type": "string", "format": "date" },
      "note": { "type": "string", "maxLength": 500 }
    }
  },
  "annotations": { "mutating": true, "requiresApproval": false, "idempotencyKey": "dealId+dueDate" }
}`,
      },
      faq: [
        { q: "Does MCP replace REST APIs?", a: "No. MCP normally wraps an existing API and exposes a safe subset of it to AI applications through a standardized interface." },
        { q: "Do you need MCP for a single agent?", a: "Not always. Direct tool calling can be simpler for a few fixed functions. MCP is most useful across multiple clients, systems and teams." },
        { q: "How should MCP tools be secured?", a: "Enforce user permissions, operation allowlists, narrow input schemas, approval for mutations, idempotency and a complete audit log." },
      ],
    },
  },
  {
    slug: "rag-architecture-production",
    cluster: "specialist-ai-architecture",
    keywords: ["RAG architecture", "архитектура RAG", "production RAG", "hybrid search RAG", "RAG pipeline"],
    related: [
      { href: "/services/rag", labelRu: "Корпоративный RAG", labelEn: "Enterprise RAG" },
      { href: "/services/enterprise-ai-assistant", labelRu: "Корпоративный AI-ассистент", labelEn: "Enterprise AI assistant" },
      { href: "/blog/ai-document-processing-pipeline", labelRu: "AI-обработка документов", labelEn: "AI document processing" },
      { href: "/blog/ai-agents-in-sales-architecture", labelRu: "AI-агенты в продажах", labelEn: "AI agents in sales" },
      { href: "/blog/ai-proposal-generation", labelRu: "AI Proposal Generation", labelEn: "AI proposal generation" },
    ],
    publishedAt: "2026-07-25",
    ru: {
      title: "RAG Architecture: ingestion, hybrid search, reranking и evaluation",
      description:
        "Production-архитектура RAG: парсинг и версии документов, chunking, embeddings, hybrid retrieval, reranking, citations, ACL и набор оценки качества.",
      h1: "RAG Architecture: как построить проверяемый поиск по корпоративным данным",
      sections: [
        {
          title: "RAG — это два контура, а не один prompt",
          paragraphs: [
            "Production RAG состоит из контура индексации и контура ответа. Индексация получает документы, извлекает структуру, делит содержимое на фрагменты, добавляет метаданные, вычисляет embeddings и записывает версии в поисковый индекс. Контур ответа преобразует вопрос, находит кандидатов, ранжирует их, собирает контекст и только затем вызывает LLM.",
            "Разделение контуров необходимо для воспроизводимости. Ответ должен ссылаться на конкретную версию документа и фрагмент, а удалённый источник должен исчезать из выдачи после переиндексации. Без версий и lineage невозможно понять, модель ошиблась или поиск передал ей устаревший текст.",
          ],
        },
        {
          title: "Ingestion и chunking",
          paragraphs: [
            "Парсер должен сохранять заголовки, таблицы, списки, номера страниц и связи между разделами. Простое извлечение сплошного текста разрушает структуру договора или регламента. Chunking лучше строить по семантическим границам с контролем максимального размера, а не разрезать каждый документ через одинаковое число символов.",
            "Каждый chunk получает document_id, version, section, source_url, access labels, timestamps и checksum. Embedding — производная, а не первичный источник: его можно пересчитать при смене модели. Повторная индексация должна быть идемпотентной и удалять фрагменты старой версии, иначе поиск начнёт возвращать противоречивые копии.",
          ],
        },
        {
          title: "Hybrid retrieval и reranking",
          paragraphs: [
            "Векторный поиск хорошо находит смысловую близость, но может пропустить точный артикул, номер договора или редкий термин. Полнотекстовый поиск силён в точных совпадениях, но слабее понимает переформулировки. Hybrid search запускает оба метода и объединяет кандидатов, повышая recall на смешанных корпоративных запросах.",
            "Reranker повторно оценивает небольшой набор найденных фрагментов относительно конкретного вопроса. Он повышает precision, но добавляет задержку и стоимость, поэтому сначала извлекают умеренный пул кандидатов, затем ранжируют и передают модели только top-N. Порог релевантности нужен, чтобы система могла честно ответить «данных недостаточно».",
          ],
        },
        {
          title: "Generation, citations и безопасность",
          paragraphs: [
            "LLM получает вопрос, инструкции и ограниченный контекст со стабильными идентификаторами источников. Ответ строится только на переданных фрагментах и возвращает citations, которые приложение проверяет перед показом. Ссылка должна вести к документу и месту, доступному текущему пользователю, а не просто содержать сгенерированное название файла.",
            "ACL фильтруются до retrieval, а не после генерации. Иначе запрещённый документ уже попадёт в prompt и может повлиять на ответ. Отдельно защищаются инструкции: текст внутри документа считается данными, а не системной командой. Логи не должны сохранять секретный контекст без той же политики доступа и срока хранения.",
          ],
        },
        {
          title: "Evaluation до и после запуска",
          paragraphs: [
            "Набор оценки должен содержать реальные вопросы, ожидаемые источники, допустимые формулировки и случаи без ответа. Retrieval оценивают отдельно через recall@k, precision и позицию правильного фрагмента. Генерацию проверяют на соответствие источнику, полноту, качество цитат и корректный отказ.",
            "В production отслеживают отсутствие результатов, низкую релевантность, переходы по цитатам, feedback пользователей, задержку и стоимость. Каждое изменение chunking, embeddings, reranker или prompt сравнивается на одном регрессионном наборе. Без этого оптимизация RAG строится на нескольких эффектных demo-вопросах.",
          ],
        },
      ],
      checklist: {
        title: "Чек-лист перед выводом RAG в production",
        items: [
          "Каждый chunk несёт document_id, version, section, source_url, access labels и checksum — не только текст",
          "Реиндексация идемпотентна и удаляет фрагменты старой версии, дубликаты не накапливаются",
          "ACL фильтруются до retrieval, а не после генерации ответа",
          "Есть порог релевантности — система отвечает «данных недостаточно», а не придумывает",
          "Citations ведут на документ и место, доступные текущему пользователю, а не на сгенерированное название файла",
          "Есть регрессионный набор вопросов — каждое изменение chunking/embeddings/reranker/prompt сравнивается на нём, а не на паре demo-примеров",
        ],
      },
      codeSnippet: {
        title: "Метаданные chunk перед записью в индекс",
        language: "json",
        code: `{
  "document_id": "policy-2026-14",
  "version": 3,
  "section": "4.2 Возврат средств",
  "source_url": "/docs/policy-2026-14.pdf#page=6",
  "access_labels": ["role:support", "role:sales"],
  "checksum": "sha256:9f2a...",
  "indexed_at": "2026-07-25T09:00:00Z"
}`,
      },
      faq: [
        { q: "Нужна ли RAG отдельная векторная база?", a: "Не обязательно отдельный продукт, но нужен индекс с векторным поиском или эквивалентный механизм. На практике его стоит сочетать с полнотекстовым поиском." },
        { q: "Какой размер chunk лучше?", a: "Единого значения нет. Chunk должен сохранять самостоятельный смысл и структуру документа; параметры подбирают на репрезентативном наборе вопросов." },
        { q: "Как уменьшить галлюцинации в RAG?", a: "Улучшать retrieval, задавать порог отсутствия ответа, ограничивать генерацию источниками, проверять цитаты и тестировать вопросы без покрытия в данных." },
      ],
    },
    en: {
      title: "RAG Architecture: ingestion, hybrid search, reranking and evaluation",
      description:
        "A production RAG architecture covering document parsing and versions, chunking, embeddings, hybrid retrieval, reranking, citations, ACLs and evaluation.",
      h1: "RAG Architecture: building verifiable search over enterprise data",
      sections: [
        {
          title: "RAG has two pipelines, not one prompt",
          paragraphs: [
            "Production RAG consists of an indexing pipeline and an answer pipeline. Indexing receives documents, extracts structure, splits content, enriches metadata, computes embeddings and stores versions in a search index. The answer pipeline transforms a question, retrieves candidates, reranks them, assembles context and only then calls the LLM.",
            "This separation is essential for reproducibility. An answer should cite a specific document version and passage, while a deleted source must disappear after reindexing. Without versioning and lineage, it is impossible to determine whether the model failed or retrieval supplied stale text.",
          ],
        },
        {
          title: "Ingestion and chunking",
          paragraphs: [
            "The parser should preserve headings, tables, lists, page numbers and section relationships. Flattening everything into plain text destroys the structure of a contract or policy. Chunking should follow semantic boundaries with a size ceiling instead of cutting every document at the same character count.",
            "Each chunk carries a document ID, version, section, source URL, access labels, timestamps and checksum. An embedding is a derived artifact, not the source of truth, so it can be recomputed when the model changes. Reindexing must be idempotent and remove old-version chunks to prevent contradictory duplicates.",
          ],
        },
        {
          title: "Hybrid retrieval and reranking",
          paragraphs: [
            "Vector search captures semantic similarity but can miss an exact SKU, contract number or rare term. Full-text search handles exact matches but is weaker on paraphrases. Hybrid search runs both and merges candidates, improving recall across mixed enterprise queries.",
            "A reranker evaluates a smaller candidate set against the actual question. It improves precision but adds latency and cost, so retrieve a moderate pool, rerank it and send only the top passages to the model. A relevance threshold lets the system answer honestly when the corpus does not contain enough evidence.",
          ],
        },
        {
          title: "Generation, citations and security",
          paragraphs: [
            "The LLM receives the question, instructions and bounded context with stable source identifiers. It answers from those passages and returns citations that the application validates before display. A citation should resolve to a document and location the current user can access, not merely a model-generated filename.",
            "Apply ACL filtering before retrieval, not after generation. Otherwise restricted content has already entered the prompt and can influence the answer. Treat instructions found inside documents as data, not system commands. Logs must not retain secret context without the same access and retention policy.",
          ],
        },
        {
          title: "Evaluation before and after launch",
          paragraphs: [
            "An evaluation set should contain real questions, expected sources, acceptable answers and unanswerable cases. Evaluate retrieval separately with recall at K, precision and expected-passage rank. Evaluate generation for grounding, completeness, citation quality and correct refusal.",
            "In production, monitor empty results, low relevance scores, citation clicks, user feedback, latency and cost. Compare every chunking, embedding, reranker or prompt change on the same regression set. Otherwise RAG optimization becomes a sequence of impressive demo questions rather than engineering.",
          ],
        },
      ],
      checklist: {
        title: "Pre-production checklist for RAG",
        items: [
          "Every chunk carries document_id, version, section, source_url, access labels and a checksum — not just text",
          "Reindexing is idempotent and removes old-version chunks — duplicates don't accumulate",
          "ACLs are filtered before retrieval, not after generation",
          "There's a relevance threshold — the system answers \"not enough data\" instead of making it up",
          "Citations resolve to a document and location the current user can access, not a model-generated filename",
          "A regression question set exists — every chunking/embedding/reranker/prompt change is compared against it, not a couple of demo questions",
        ],
      },
      codeSnippet: {
        title: "Chunk metadata before writing to the index",
        language: "json",
        code: `{
  "document_id": "policy-2026-14",
  "version": 3,
  "section": "4.2 Refunds",
  "source_url": "/docs/policy-2026-14.pdf#page=6",
  "access_labels": ["role:support", "role:sales"],
  "checksum": "sha256:9f2a...",
  "indexed_at": "2026-07-25T09:00:00Z"
}`,
      },
      faq: [
        { q: "Does RAG require a vector database?", a: "Not necessarily a separate product, but it needs an index with vector retrieval or an equivalent mechanism. In practice, combine it with text search." },
        { q: "What is the best RAG chunk size?", a: "There is no universal value. A chunk must preserve a self-contained meaning and document structure; tune it on representative questions." },
        { q: "How do you reduce hallucinations in RAG?", a: "Improve retrieval, define a no-answer threshold, ground generation in sources, validate citations and test questions with no supporting data." },
      ],
    },
  },
  {
    slug: "ai-agents-in-sales-architecture",
    cluster: "specialist-ai-architecture",
    keywords: ["AI agents in sales", "AI sales agent architecture", "агент AI для продаж", "AI агент CRM", "sales automation AI"],
    related: [
      { href: "/services/sales-ai-agent", labelRu: "AI-агент для продаж", labelEn: "Sales AI agent" },
      { href: "/services/crm-integration", labelRu: "Интеграция CRM", labelEn: "CRM integration" },
      { href: "/blog/ai-crm-automation-architecture", labelRu: "AI CRM Automation", labelEn: "AI CRM Automation" },
      { href: "/blog/rag-architecture-production", labelRu: "Production-архитектура RAG", labelEn: "Production RAG architecture" },
      { href: "/blog/ai-proposal-generation", labelRu: "AI Proposal Generation", labelEn: "AI proposal generation" },
    ],
    publishedAt: "2026-07-25",
    ru: {
      title: "AI Agents in Sales: архитектура агента внутри воронки продаж",
      description:
        "Как спроектировать AI-агента для продаж: события CRM, инструменты, state machine, approval, memory, follow-up, observability и KPI.",
      h1: "AI Agents in Sales: от помощника менеджера до управляемого workflow",
      sections: [
        {
          title: "AI-агент — не автономный продавец",
          paragraphs: [
            "В production AI-агент для продаж — это управляемый workflow с моделью в отдельных шагах. Он получает событие из CRM, собирает контекст, выбирает разрешённый инструмент, готовит результат и останавливается перед действием, которое требует решения человека. Цель — сократить рутину вокруг переговоров, а не скрыть весь процесс внутри LLM.",
            "Полезные сценарии: квалификация входящего лида, сводка звонка, заполнение карточки, поиск фактов о продукте, черновик follow-up и сигнал о зависшей сделке. Переговоры о цене, обязательства перед клиентом и нестандартные условия остаются у менеджера.",
          ],
        },
        {
          title: "State machine и события CRM",
          paragraphs: [
            "Надёжный агент привязан к состояниям воронки: new lead, qualified, discovery, proposal, negotiation и won/lost. Переходы инициируются проверяемыми событиями — заполненной формой, звонком, письмом, оплатой или подтверждением менеджера. LLM может предложить переход, но системная логика проверяет обязательные поля и разрешения.",
            "Каждый запуск получает deal_id, event_id и idempotency key. Workflow хранит текущий шаг, результат инструмента и причину остановки, поэтому его можно безопасно продолжить после сбоя. Это важнее длинной «памяти агента»: факты живут в CRM, а состояние исполнения — в оркестраторе.",
          ],
        },
        {
          title: "Инструменты и память",
          paragraphs: [
            "Инструменты должны отражать бизнес-действия: get_deal, search_product_catalog, create_draft_email, add_note и schedule_task. Tool send_email следует отделить от create_draft_email и защищать более строгим подтверждением. Узкие схемы ограничивают выбор модели и упрощают аудит.",
            "Память состоит из трёх слоёв: актуальные данные сделки в CRM, краткая сводка коммуникации и продуктовые знания из RAG. Не нужно помещать всю историю компании в prompt. Агенту нужен минимальный контекст текущего шага и стабильные ссылки на источники.",
          ],
        },
        {
          title: "Approval, безопасность и наблюдаемость",
          paragraphs: [
            "Классификацию и сводки можно автоматизировать раньше, чем коммуникацию с клиентом. Сообщения, скидки, сроки и обязательства проходят approval. Интерфейс должен показывать черновик, использованные факты, неопределённость и предлагаемое действие, чтобы человек оценивал основу решения, а не только стиль.",
            "Логируйте выбранный tool, аргументы после маскирования, результат, время, стоимость, версию prompt и решение пользователя. Алерты отслеживают циклы инструментов, рост отказов, ошибки CRM и необычное число действий на сделку. Лимит шагов и бюджет запуска останавливают runaway agent.",
          ],
        },
        {
          title: "KPI i plan pilota",
          paragraphs: [
            "Не оценивайте агента числом сгенерированных сообщений. Измеряйте время до первого ответа, подготовку follow-up, полноту CRM, число сделок без следующего шага, acceptance rate черновиков и конверсию этапов. Высокий acceptance rate без влияния на процесс может означать только более гладкий текст.",
            "Пилот охватывает одну команду, один этап и понятный baseline. Сначала shadow mode генерирует рекомендации без изменений CRM, затем draft mode добавляет подтверждение, и только после этого автоматизируются действия низкого риска. Для каждого этапа нужны критерий выхода и блокирующие ошибки.",
          ],
        },
      ],
      checklist: {
        title: "Чек-лист безопасного AI-агента в продажах",
        items: [
          "Отправка письма (send_email) отделена от черновика (create_draft_email) и защищена более строгим approval",
          "Каждый запуск несёт deal_id, event_id и idempotency key — сбой не создаёт дублирующее действие",
          "Есть лимит шагов и бюджет на запуск — runaway agent останавливается, а не работает бесконечно",
          "Пилот идёт по стадиям: shadow mode → draft mode с подтверждением → автоматизация только low-risk действий",
          "Логируется выбранный tool, замаскированные аргументы, стоимость, версия prompt и решение пользователя",
          "KPI — не число сообщений, а acceptance rate черновиков, время до первого ответа и конверсия этапов",
        ],
      },
      codeSnippet: {
        title: "Разделение draft и send на уровне схемы инструмента",
        language: "json",
        code: `{
  "name": "create_draft_email",
  "annotations": { "mutating": false, "requiresApproval": false }
},
{
  "name": "send_email",
  "description": "Отправляет письмо клиенту — только после подтверждения менеджера",
  "annotations": { "mutating": true, "requiresApproval": true, "maxPerDealPerDay": 3 }
}`,
      },
      faq: [
        { q: "Может ли AI-агент сам писать клиентам?", a: "Технически да, но начинать лучше с черновиков и подтверждения. Автоматическую отправку ограничивают проверенными сценариями низкого риска." },
        { q: "Чем агент отличается от автоматизации CRM?", a: "Автоматизация CRM выполняет заранее заданные правила. Агент использует модель для интерпретации контекста и выбора разрешённых шагов, оставаясь в границах workflow." },
        { q: "Как долго хранить память агента?", a: "Бизнес-факты должны оставаться в CRM. Агент хранит только состояние исполнения и краткие сводки для продолжения контролируемого workflow." },
      ],
    },
    en: {
      title: "AI Agents in Sales: architecture inside the sales pipeline",
      description:
        "How to design a sales AI agent with CRM events, tools, a state machine, approvals, memory, follow-up workflows, observability and KPIs.",
      h1: "AI Agents in Sales: from rep assistant to governed workflow",
      sections: [
        {
          title: "An AI agent is not an autonomous salesperson",
          paragraphs: [
            "In production, a sales AI agent is a governed workflow that uses a model at selected steps. It receives a CRM event, assembles context, selects an allowed tool, prepares a result and stops before an action that requires human judgment. The goal is to remove routine work around negotiation, not hide the entire sales process inside an LLM.",
            "Useful use cases include inbound lead qualification, call summaries, record completion, product fact retrieval, follow-up drafts and stalled-deal alerts. Price negotiation, customer commitments and unusual commercial terms remain with the rep.",
          ],
        },
        {
          title: "State machine and CRM events",
          paragraphs: [
            "A reliable agent is tied to pipeline states such as new lead, qualified, discovery, proposal, negotiation and won or lost. Transitions begin with verifiable events: a form submission, call, email, payment or rep approval. An LLM can propose a transition, but system logic checks required fields and permissions.",
            "Every run carries a deal ID, event ID and idempotency key. The workflow stores the current step, tool result and stop reason so execution can resume safely after failure. This matters more than long agent memory: facts live in the CRM, while execution state lives in the orchestrator.",
          ],
        },
        {
          title: "Tools and memory",
          paragraphs: [
            "Tools should represent business actions: get_deal, search_product_catalog, create_draft_email, add_note and schedule_task. Keep send_email separate from create_draft_email and apply a stricter approval policy. Narrow schemas constrain the model's choices and make audits easier.",
            "Memory has three layers: current deal data in the CRM, a concise communication summary and product knowledge retrieved through RAG. Do not place the company's complete history in every prompt. The agent needs minimum context for the current step and stable references to its sources.",
          ],
        },
        {
          title: "Approval, safety and observability",
          paragraphs: [
            "Classification and summarization can be automated sooner than customer communication. Messages, discounts, deadlines and commitments pass through approval. The UI should show the draft, facts used, uncertainty and proposed action so the person evaluates the decision basis, not just the writing style.",
            "Log the selected tool, masked arguments, result, latency, cost, prompt version and user decision. Alert on tool loops, rising refusal rates, CRM errors and unusual action counts per deal. A step limit and per-run budget stop a runaway agent.",
          ],
        },
        {
          title: "KPIs and pilot plan",
          paragraphs: [
            "Do not judge an agent by messages generated. Measure time to first response, follow-up preparation time, CRM completeness, deals without a next step, draft acceptance rate and stage conversion. A high acceptance rate with no process impact may mean only better-looking copy.",
            "Pilot with one team, one stage and a clear baseline. Shadow mode first generates recommendations without changing the CRM, then draft mode adds approval, and only then should low-risk actions become automatic. Every phase needs exit criteria and a list of errors that block expansion.",
          ],
        },
      ],
      checklist: {
        title: "Safety checklist for a sales AI agent",
        items: [
          "Sending email (send_email) is separated from drafting (create_draft_email) and gated by a stricter approval",
          "Every run carries a deal_id, event_id and idempotency key — a failure can't create a duplicate action",
          "There's a step limit and a per-run budget — a runaway agent stops instead of looping indefinitely",
          "The pilot goes through phases: shadow mode → draft mode with approval → automation of low-risk actions only",
          "The selected tool, masked arguments, cost, prompt version and user decision are all logged",
          "KPIs are draft acceptance rate, time to first response and stage conversion — not messages generated",
        ],
      },
      codeSnippet: {
        title: "Separating draft and send at the tool-schema level",
        language: "json",
        code: `{
  "name": "create_draft_email",
  "annotations": { "mutating": false, "requiresApproval": false }
},
{
  "name": "send_email",
  "description": "Sends an email to the customer — only after rep approval",
  "annotations": { "mutating": true, "requiresApproval": true, "maxPerDealPerDay": 3 }
}`,
      },
      faq: [
        { q: "Can an AI agent email customers autonomously?", a: "Technically yes, but start with drafts and approval. Limit automatic sending to tested, low-risk scenarios." },
        { q: "How is an agent different from CRM automation?", a: "CRM automation follows predefined rules. An agent uses a model to interpret context and select among allowed steps, still inside a governed workflow." },
        { q: "How long should agent memory be retained?", a: "Business facts should remain in the CRM. The agent stores execution state and concise summaries needed to resume a controlled workflow." },
      ],
    },
  },
  {
    slug: "ai-document-processing-pipeline",
    cluster: "specialist-ai-architecture",
    keywords: ["AI document processing", "intelligent document processing", "автоматическая обработка документов", "OCR LLM документы", "IDP architecture"],
    related: [
      { href: "/services/document-processing", labelRu: "AI-обработка документов", labelEn: "AI document processing" },
      { href: "/services/crm-integration", labelRu: "Интеграция с CRM и ERP", labelEn: "CRM and ERP integration" },
      { href: "/blog/rag-architecture-production", labelRu: "Production-архитектура RAG", labelEn: "Production RAG architecture" },
      { href: "/blog/mcp-vs-api", labelRu: "MCP vs API", labelEn: "MCP vs API" },
      { href: "/blog/ai-for-manufacturing", labelRu: "AI для производства", labelEn: "AI for manufacturing" },
    ],
    publishedAt: "2026-07-25",
    ru: {
      title: "AI Document Processing: OCR, extraction, validation i human review",
      description:
        "Архитектура IDP для счетов, договоров и сканов: ingestion, OCR, классификация, извлечение полей, валидация, confidence, human review и экспорт в CRM/ERP.",
      h1: "AI Document Processing: production-пайплайн от файла до данных в ERP",
      sections: [
        {
          title: "IDP — это workflow, а не одна модель",
          paragraphs: [
            "Intelligent Document Processing превращает неструктурированный файл в проверенные данные и бизнес-действие. Пайплайн включает приём документа, проверку типа и безопасности, OCR, классификацию, извлечение полей, правила валидации, human review и запись в CRM, ERP или систему документооборота.",
            "LLM помогает с разными макетами и описательными полями, но не заменяет OCR и бухгалтерские правила. ИНН, сумма, валюта и согласованность позиций должны проходить детерминированные проверки. Система обязана уметь остановить документ, а не генерировать отсутствующее значение.",
          ],
        },
        {
          title: "Ingestion и подготовка документа",
          paragraphs: [
            "Источниками служат upload, e-mail, сканер, API или папка обмена. Каждый файл получает document_id, checksum, tenant, источник и timestamp. Антивирусная проверка, лимит размера, определение MIME и дедупликация выполняются до основного процесса.",
            "Preprocessing повышает качество: поворот страниц, deskew, удаление шума, разделение пакета и обнаружение пустых страниц. Оригинал остаётся неизменным в storage, а производные артефакты версионируются. Результат можно воспроизвести после смены модели или правил.",
          ],
        },
        {
          title: "OCR, klasyfikacja i ekstrakcja",
          paragraphs: [
            "OCR возвращает текст вместе с координатами на странице и confidence. Классификатор определяет тип, а extractor применяет его схему: у счёта есть поставщик, даты, суммы и позиции; у договора — стороны, срок, обязательства и условия. Один универсальный prompt для всех документов трудно тестировать, и он обычно снижает качество.",
            "Результат извлечения должен содержать значение, confidence, страницу и область источника. Рецензенту нужно видеть происхождение поля. Для таблиц сохраняют связь строк и контрольные суммы, а не рассматривают каждое число как независимый фрагмент текста.",
          ],
        },
        {
          title: "Walidacja i human-in-the-loop",
          paragraphs: [
            "Валидация объединяет синтаксические и бизнес-правила: формат ИНН, сумма нетто + НДС = брутто, разрешённая валюта, поставщик в справочнике, заказ в ERP и отсутствие дубликата счёта. Confidence модели — лишь один сигнал; уверенно прочитанное значение может быть невозможно по бизнес-логике.",
            "В очередь human review попадают документы с низким confidence, конфликтом правил или высоким финансовым риском. Интерфейс показывает изображение, выделенный источник и предлагаемое значение. Исправления сохраняются как evaluation data, но не должны автоматически обучать модель без контроля качества.",
          ],
        },
        {
          title: "Eksport, audyt i metryki",
          paragraphs: [
            "После подтверждения adapter записывает данные в целевую систему с idempotency key. Статусы received, processing, review, approved, exported и failed позволяют продолжить pipeline после сбоя. Audit log связывает документ, версии моделей, правила, правки пользователя и идентификатор записи ERP.",
            "Измеряйте field accuracy по типам полей, document straight-through-processing rate, долю review, время обработки, стоимость документа и ошибки экспорта. Одна точность OCR не описывает ценность: бизнесу нужна корректная запись в ERP и возможность быстро объяснить каждое значение.",
          ],
        },
      ],
      checklist: {
        title: "Чек-лист IDP-пайплайна перед продакшеном",
        items: [
          "Каждый файл получает document_id, checksum, tenant и timestamp до основного процесса",
          "Извлечённое значение хранит confidence, страницу и область источника — не только текст",
          "Бизнес-правила проверяются отдельно от OCR: сумма нетто + НДС = брутто, валюта, поставщик в справочнике",
          "Документы с низким confidence или конфликтом правил уходят в human review, а не проводятся автоматически",
          "Экспорт в ERP/CRM идёт с idempotency key — сбой не создаёт задвоенную запись",
          "Правки рецензента сохраняются как evaluation data, но не обучают модель автоматически без контроля качества",
        ],
      },
      comparisonTable: {
        title: "Подходы к извлечению данных из документов",
        headers: ["Подход", "Точность на типовых формах", "Гибкость макета", "Стоимость поддержки"],
        rows: [
          ["Regex / шаблон под конкретную форму", "Высокая", "Низкая — ломается при смене макета", "Растёт с числом форм"],
          ["Классический OCR + бизнес-правила", "Средняя–высокая", "Средняя", "Стабильная"],
          ["LLM-экстракция с confidence и review", "Средняя, растёт с review", "Высокая — разные макеты без переписывания правил", "Ниже на старте, требует мониторинга дрейфа"],
        ],
      },
      faq: [
        { q: "Может ли LLM заменить OCR?", a: "Не в каждом pipeline. Мультимодальные модели помогают со сложными макетами, но production IDP всё равно нужны координаты, confidence, валидация и воспроизводимое чтение." },
        { q: "Когда документ должен попасть к человеку?", a: "При низкой уверенности, конфликте правил, неизвестном типе или высоком финансовом риске. Порог следует различать по полям и процессам." },
        { q: "Как предотвратить двойное проведение документа?", a: "Использовать checksum, бизнес-ключи, проверку дубликатов в ERP и idempotency key при экспорте." },
      ],
    },
    en: {
      title: "AI Document Processing: OCR, extraction, validation and human review",
      description:
        "An IDP architecture for invoices, contracts and scans: ingestion, OCR, classification, field extraction, validation, confidence, human review and CRM or ERP export.",
      h1: "AI Document Processing: a production pipeline from file to ERP data",
      sections: [
        {
          title: "IDP is a workflow, not one model",
          paragraphs: [
            "Intelligent Document Processing turns an unstructured file into verified data and a business action. The pipeline includes document intake, file and security checks, OCR, classification, field extraction, validation rules, human review and writing to a CRM, ERP or document workflow system.",
            "An LLM can help with diverse layouts and descriptive fields, but it does not replace OCR or accounting rules. Tax IDs, gross totals, currency and line-item consistency require deterministic checks. The system must be able to stop a document instead of inventing a missing value.",
          ],
        },
        {
          title: "Ingestion and document preparation",
          paragraphs: [
            "Sources include upload, email, scanner, API or an exchange folder. Every file receives a document ID, checksum, tenant, source and timestamp. Malware scanning, size limits, MIME detection and deduplication happen before processing.",
            "Preprocessing improves quality through rotation, deskew, denoising, package splitting and blank-page detection. The original remains unchanged in storage while derived artifacts are versioned. This makes a result reproducible after a model or rule change.",
          ],
        },
        {
          title: "OCR, classification and extraction",
          paragraphs: [
            "OCR returns text with page coordinates and confidence. A classifier identifies the document type, then an extractor applies its schema: an invoice has supplier, dates, amounts and line items; a contract has parties, term, obligations and clauses. One universal prompt for every document is difficult to test and usually reduces quality.",
            "Extraction output should include the value, confidence, page and source region. A reviewer must be able to see where a field came from. For tables, preserve row relationships and control totals rather than treating every number as an independent text fragment.",
          ],
        },
        {
          title: "Validation and human in the loop",
          paragraphs: [
            "Validation combines syntax and business rules: tax ID format, net plus tax equals gross, approved currencies, known vendor, purchase order in the ERP and duplicate invoice detection. Model confidence is only one signal; a confident reading can still be impossible in the business process.",
            "Send documents to human review when confidence is low, rules conflict or financial risk is high. The UI shows the image, highlighted source and proposed value. Corrections become evaluation data, but should not train a model automatically without quality control.",
          ],
        },
        {
          title: "Export, audit and metrics",
          paragraphs: [
            "After approval, an adapter writes data to the target system with an idempotency key. States such as received, processing, review, approved, exported and failed allow the pipeline to resume after failure. The audit log connects the document, model versions, rules, reviewer corrections and target ERP record.",
            "Measure field accuracy by field type, straight-through processing rate, review share, handling time, cost per document and export failures. OCR accuracy alone does not describe business value: the outcome is a correct ERP record and a fast explanation of every extracted value.",
          ],
        },
      ],
      checklist: {
        title: "Pre-production checklist for an IDP pipeline",
        items: [
          "Every file gets a document_id, checksum, tenant and timestamp before processing starts",
          "Every extracted value stores confidence, page and source region — not just text",
          "Business rules are checked separately from OCR: net plus tax equals gross, approved currency, known vendor",
          "Documents with low confidence or a rule conflict go to human review instead of posting automatically",
          "Export to ERP/CRM uses an idempotency key — a failure doesn't create a duplicate record",
          "Reviewer corrections are saved as evaluation data but don't automatically retrain the model without quality control",
        ],
      },
      comparisonTable: {
        title: "Approaches to extracting data from documents",
        headers: ["Approach", "Accuracy on standard forms", "Layout flexibility", "Maintenance cost"],
        rows: [
          ["Regex / template for a specific form", "High", "Low — breaks when the layout changes", "Grows with the number of forms"],
          ["Classic OCR + business rules", "Medium–high", "Medium", "Stable"],
          ["LLM extraction with confidence and review", "Medium, improves with review", "High — different layouts without rewriting rules", "Lower upfront, needs drift monitoring"],
        ],
      },
      faq: [
        { q: "Can an LLM replace OCR?", a: "Not in every pipeline. Multimodal models help with difficult layouts, but production IDP still needs coordinates, confidence, validation and repeatable extraction." },
        { q: "When should a document go to human review?", a: "When confidence is low, rules conflict, the document type is unknown or financial risk is high. Thresholds should vary by field and process." },
        { q: "How do you prevent duplicate posting?", a: "Use checksums, business keys, duplicate checks in the ERP and an idempotency key during export." },
      ],
    },
  },
  {
    slug: "ai-automation-architecture",
    cluster: "specialist-ai-architecture",
    keywords: [
      "AI automation",
      "AI business automation",
      "автоматизация с AI",
      "внедрение AI в бизнес-процессы",
      "enterprise AI automation",
    ],
    related: [
      { href: "/services/business-process-automation", labelRu: "Автоматизация бизнес-процессов", labelEn: "Business process automation" },
      { href: "/services/ai-discovery-roadmap", labelRu: "AI-аудит и дорожная карта", labelEn: "AI audit and roadmap" },
      { href: "/blog/ai-crm-automation-architecture", labelRu: "AI CRM Automation", labelEn: "AI CRM automation" },
      { href: "/blog/ai-document-processing-pipeline", labelRu: "AI-обработка документов", labelEn: "AI document processing" },
    ],
    publishedAt: "2026-07-25",
    ru: {
      title: "AI Automation: как ИИ реально встраивается в бизнес-процессы",
      description:
        "AI automation — не чат-бот и не демо на GPT. Разбираем архитектуру: где workflow, где модель, как считать эффект и почему большинство пилотов не доходит до продакшена.",
      h1: "AI Automation: архитектура внедрения ИИ в операционные процессы",
      sections: [
        {
          title: "Что на самом деле означает AI automation",
          paragraphs: [
            "AI automation — это не отдельный продукт и не «нейросеть вместо сотрудника». Это слой обработки неструктурированных данных и решений внутри уже существующего процесса: CRM, документооборота, поддержки, продаж или производства. Ценность появляется не от факта использования модели, а от того, что конкретный ручной шаг перестаёт требовать человека.",
            "Граница ответственности должна быть явной с самого начала. Правила, которые можно записать как «если-то» — смена статуса после оплаты, расчёт скидки по прайсу, маршрутизация по региону — остаются в детерминированном коде. Модель отвечает за то, что требует понимания смысла: свободный текст письма, фото дефекта, голосовое обращение, неструктурированный документ.",
          ],
        },
        {
          title: "Почему демо не доезжает до продакшена",
          paragraphs: [
            "Большинство пилотов AI automation умирает на переходе от чат-интерфейса к встроенному в процесс сервису. Демо показывает, что модель умеет отвечать; продакшен требует, чтобы система умела повторить запрос после сбоя, не терять события, соблюдать права доступа и не создавать дубликаты действий.",
            "Второй частый провал — выбор технологии раньше процесса: компания покупает подписку на «AI-платформу», а затем ищет задачу под неё. Рабочий порядок обратный — сначала аудит процесса и данных, потом выбор архитектуры (workflow, интеграция, RAG, агент), и только затем модель.",
          ],
        },
        {
          title: "Референсная архитектура автоматизации",
          paragraphs: [
            "Независимо от домена (CRM, документы, поддержка, продажи, производство) устойчивый паттерн один: событие → очередь → сервис оркестрации → сбор ограниченного контекста → вызов модели → валидация структурированного ответа по схеме → запись результата в систему-источник правды. Очередь отделяет медленный AI-вызов от пользовательской операции и позволяет безопасно повторять запросы.",
            "Каждый сценарий получает собственный контракт данных и идемпотентный ключ, а не общий «универсальный агент». Классификация обращения, генерация черновика документа и next-best-action — это разные контракты с разными допустимыми полями, даже если под капотом используется одна модель.",
          ],
        },
        {
          title: "Guardrails и постепенное расширение автономии",
          paragraphs: [
            "На старте AI automation должна готовить черновики и рекомендации, а не выполнять необратимые действия. Отправка письма клиенту, изменение цены, закрытие сделки, остановка производственной линии — операции, которые требуют подтверждения человеком или жёсткого бизнес-правила поверх модели.",
            "Автономию расширяют только после накопления статистики ошибок на реальных сценариях, а не по расписанию проекта. Нужны allowlist полей и действий, лимиты значений, фильтрация входа (защита от prompt injection), валидация выхода и журнал аудита с версией prompt, моделью и источниками контекста для каждого результата.",
          ],
        },
        {
          title: "Как измерять эффект и когда масштабировать",
          paragraphs: [
            "Технические метрики — задержка, доля валидных структурированных ответов, стоимость вызова, число повторов. Бизнес-метрики зависят от процесса: время обработки заявки, доля карточек с корректно заполненными полями, время подготовки документа, число ручных правок в черновике модели.",
            "Безопасный путь — один процесс, контрольная группа и 2–4 недели сравнения с прежним способом работы. Если AI automation только переносит труд с написания текста на исправление плохих черновиков, сценарий не готов к масштабированию на соседние процессы.",
          ],
        },
      ],
      checklist: {
        title: "Чек-лист перед переходом пилота в продакшен",
        items: [
          "Сценарий имеет собственный контракт данных и идемпотентный ключ — не общий «универсальный агент»",
          "Необратимые действия (письмо клиенту, изменение цены, остановка линии) требуют подтверждения или жёсткого правила",
          "Есть allowlist полей и действий, лимиты значений и фильтрация входа от prompt injection",
          "Журнал аудита фиксирует версию prompt, модель и источники контекста для каждого результата",
          "Пилот идёт на одном процессе с контрольной группой минимум 2–4 недели, а не сразу на весь отдел",
          "Определены технические метрики (задержка, доля валидных ответов, стоимость) и бизнес-метрики процесса",
        ],
      },
      comparisonTable: {
        title: "RPA vs AI automation",
        headers: ["", "RPA", "AI automation"],
        rows: [
          ["Вход", "Структурированный, фиксированный формат", "Неструктурированный: текст, фото, речь"],
          ["Логика", "Жёсткая последовательность кликов/полей", "Модель интерпретирует смысл, правила остаются в коде"],
          ["Устойчивость к смене интерфейса", "Низкая — ломается при смене макета", "Выше, если контракт данных не завязан на макет"],
          ["Типичная задача", "Перенос данных между системами по шаблону", "Классификация обращения, извлечение из письма, черновик документа"],
        ],
      },
      faq: [
        {
          q: "AI automation — это то же самое, что RPA?",
          a: "Нет. RPA автоматизирует фиксированную последовательность кликов и полей. AI automation добавляет слой понимания неструктурированных данных — текста, изображений, речи — там, где правило нельзя записать одной инструкцией.",
        },
        {
          q: "Нужна ли отдельная AI-платформа для старта?",
          a: "Обычно нет. Для одного сценария достаточно очереди событий, вызова модели с валидацией и записи результата в существующую систему — CRM, ERP или документооборот.",
        },
        {
          q: "Сколько времени занимает переход от пилота к продакшену?",
          a: "На одном процессе с понятным контрактом данных — от 4 до 8 недель, включая обработку ошибок, guardrails и передачу команде. Более широкие сценарии требуют отдельного аудита.",
        },
      ],
    },
    en: {
      title: "AI Automation: how AI actually gets embedded into business processes",
      description:
        "AI automation is not a chatbot or a GPT demo. A breakdown of the architecture: where the workflow ends and the model begins, how to measure impact, and why most pilots never reach production.",
      h1: "AI Automation: an architecture for embedding AI in operational processes",
      sections: [
        {
          title: "What AI automation actually means",
          paragraphs: [
            "AI automation is not a standalone product or “a neural network instead of an employee.” It is a layer that handles unstructured data and decisions inside a process that already exists — CRM, documents, support, sales or manufacturing. The value comes not from using a model, but from one specific manual step no longer needing a person.",
            "The boundary of responsibility has to be explicit from day one. Rules that fit an if-then statement — advancing a status after payment, calculating a discount from a price list, routing by region — stay in deterministic code. The model owns what requires understanding meaning: free-text email, a photo of a defect, a voice request, an unstructured document.",
          ],
        },
        {
          title: "Why demos don't reach production",
          paragraphs: [
            "Most AI automation pilots die at the transition from a chat interface to a service embedded in the process. A demo shows the model can answer; production requires the system to retry safely after a failure, avoid losing events, respect access permissions and avoid duplicate actions.",
            "The second common failure is picking the technology before the process: a company buys an “AI platform” subscription, then looks for a task to justify it. The working order runs the opposite way — audit the process and data first, choose the architecture (workflow, integration, RAG, agent), and only then the model.",
          ],
        },
        {
          title: "A reference automation architecture",
          paragraphs: [
            "Regardless of the domain — CRM, documents, support, sales, manufacturing — the durable pattern is the same: event → queue → orchestration service → scoped context retrieval → model call → schema-validated structured output → write-back to the system of record. The queue separates the slow AI call from the user transaction and makes retries safe.",
            "Every use case gets its own data contract and idempotency key, not a single “universal agent.” Request classification, document draft generation and next-best-action are different contracts with different allowed fields, even when the same model runs underneath.",
          ],
        },
        {
          title: "Guardrails and gradually expanding autonomy",
          paragraphs: [
            "At launch, AI automation should produce drafts and recommendations, not irreversible actions. Sending a customer email, changing a price, closing a deal, stopping a production line — these require human approval or a hard business rule layered on top of the model.",
            "Autonomy expands only after error statistics accumulate on real scenarios, not on a project schedule. You need allowlists for fields and actions, value limits, input filtering against prompt injection, output validation and an audit log recording the prompt version, model and context sources behind every result.",
          ],
        },
        {
          title: "Measuring impact and deciding when to scale",
          paragraphs: [
            "Technical metrics: latency, valid structured-output rate, cost per call, retry count. Business metrics depend on the process: request handling time, share of correctly filled records, document preparation time, number of manual edits to the model's draft.",
            "The safe path is one process, a control group, and 2–4 weeks comparing against the previous way of working. If AI automation just shifts effort from writing to fixing bad drafts, the use case isn't ready to scale to adjacent processes.",
          ],
        },
      ],
      checklist: {
        title: "Checklist before moving a pilot to production",
        items: [
          "The use case has its own data contract and idempotency key — not a shared \"universal agent\"",
          "Irreversible actions (customer email, price change, stopping a line) require approval or a hard rule",
          "There's an allowlist for fields and actions, value limits, and input filtering against prompt injection",
          "An audit log records the prompt version, model and context sources behind every result",
          "The pilot runs on one process with a control group for at least 2–4 weeks, not the whole department at once",
          "Both technical metrics (latency, valid-output rate, cost) and business metrics for the process are defined",
        ],
      },
      comparisonTable: {
        title: "RPA vs AI automation",
        headers: ["", "RPA", "AI automation"],
        rows: [
          ["Input", "Structured, fixed format", "Unstructured: text, photos, speech"],
          ["Logic", "Rigid sequence of clicks/fields", "The model interprets meaning; rules stay in code"],
          ["Resilience to UI changes", "Low — breaks when the layout changes", "Higher, if the data contract isn't tied to the layout"],
          ["Typical task", "Template-based data transfer between systems", "Request classification, extraction from email, document drafting"],
        ],
      },
      faq: [
        {
          q: "Is AI automation the same as RPA?",
          a: "No. RPA automates a fixed sequence of clicks and fields. AI automation adds a layer for understanding unstructured data — text, images, speech — wherever a rule can't be written as one instruction.",
        },
        {
          q: "Do you need a dedicated AI platform to start?",
          a: "Usually not. One use case needs an event queue, a validated model call and a write-back into an existing system — CRM, ERP or a document workflow.",
        },
        {
          q: "How long does it take to go from pilot to production?",
          a: "For one process with a clear data contract: 4 to 8 weeks, including error handling, guardrails and team handover. Broader scenarios need a separate audit.",
        },
      ],
    },
  },
  {
    slug: "ai-for-manufacturing",
    cluster: "specialist-ai-architecture",
    keywords: [
      "AI for manufacturing",
      "manufacturing AI automation",
      "AI на производстве",
      "автоматизация производства с AI",
      "MES AI integration",
    ],
    related: [
      { href: "/industries/manufacturing", labelRu: "AI и автоматизация для производства", labelEn: "AI and automation for manufacturing" },
      { href: "/services/document-processing", labelRu: "AI-обработка документов", labelEn: "AI document processing" },
      { href: "/blog/ai-document-processing-pipeline", labelRu: "AI-обработка документов: архитектура", labelEn: "AI document processing pipeline" },
      { href: "/blog/ai-automation-architecture", labelRu: "AI Automation: архитектура", labelEn: "AI automation architecture" },
    ],
    publishedAt: "2026-07-25",
    ru: {
      title: "AI для производства: где автоматизация с ИИ реально даёт эффект",
      description:
        "Не «умный завод» из презентации, а конкретные сценарии: контроль качества, сменные отчёты, заявки на снабжение и документы поставщиков. Архитектура AI на производстве без риска для линии.",
      h1: "AI для производства: архитектура и сценарии с измеримым ROI",
      sections: [
        {
          title: "Что реально работает на производстве",
          paragraphs: [
            "AI для производства редко означает замену SCADA или MES нейросетью. Детерминированный контроль оборудования, ПЛК и системы безопасности остаются детерминированными — там, где сбой стоит остановки линии или травмы, правило должно быть предсказуемым, а не вероятностным выводом модели.",
            "Модель приносит пользу там, где вход — неструктурированные данные: фото дефекта на конвейере, свободный текст сменного отчёта мастера, скан накладной от поставщика, голосовая заявка на ремонт оборудования. Именно эти потоки сейчас обрабатываются вручную и медленно.",
          ],
        },
        {
          title: "Референсная архитектура для цеха",
          paragraphs: [
            "Поток данных начинается на уровне MES/SCADA/ERP и не подменяет их: события (партия, смена, дефект, простой) публикуются в очередь, сервис оркестрации собирает контекст (нормы качества, спецификацию партии, историю оборудования) и вызывает модель для конкретной задачи — классификации дефекта, извлечения полей из накладной, суммаризации сменного отчёта.",
            "Результат модели — черновик, а не финальное решение: предложенная категория дефекта, извлечённые реквизиты накладной, краткая сводка простоя с причинами. Запись в MES/ERP происходит после проверки правилами (допуски, лимиты, обязательные поля) и, для критичных решений, после подтверждения ОТК или мастера смены.",
          ],
        },
        {
          title: "Типовые сценарии с быстрым ROI",
          paragraphs: [
            "Первичная классификация дефектов по фото как помощник контролёра ОТК (не замена), а также приоритизация очереди повторной проверки. Автоматизация обработки документов поставщиков — накладные, сертификаты соответствия, ГОСТ-документы — с извлечением полей и сверкой с заказом в 1С или ERP.",
            "Суммаризация сменных и аварийных отчётов из свободного текста в структурированный журнал для анализа простоев. AI-ассистент по регламентам и техническим картам для операторов — быстрый поиск инструкции без похода к мастеру, с ответом на языке цеха, а не общей документации.",
          ],
        },
        {
          title: "Безопасность, соответствие и контур данных",
          paragraphs: [
            "Производственные данные часто чувствительны (спецификации, поставщики, объёмы) и подпадают под требования безопасности заказчика или 152-ФЗ. AI-слой должен работать в контуре предприятия — on-prem или в изолированном облаке — с теми же контрактами инструментов, что и облачная версия, без утечки данных во внешние сервисы.",
            "Любое действие, способное повлиять на физический процесс — остановка линии, изменение параметра оборудования, блокировка партии — остаётся за человеком. Модель формирует рекомендацию и обоснование, решение и ответственность — у мастера смены, технолога или ОТК.",
          ],
        },
        {
          title: "С чего начинать пилот",
          paragraphs: [
            "Пилот стоит запускать на одном участке с измеримой болью — не на «всём производстве». Хороший кандидат: один тип дефекта с понятным визуальным признаком, один тип входящего документа с высоким объёмом, или один вид отчёта, который сейчас теряется в бумажном журнале.",
            "Метрики пилота — не «точность модели» сама по себе, а бизнес-эффект: время от обнаружения дефекта до реакции, доля документов без ручной сверки, время восстановления после простоя. 3–6 недель на одном процессе достаточно, чтобы понять, масштабировать сценарий или нет.",
          ],
        },
      ],
      checklist: {
        title: "Чек-лист перед пилотом AI на производстве",
        items: [
          "Выбран один участок с измеримой болью — не «всё производство» сразу",
          "Модель формирует черновик/рекомендацию, финальное решение — за ОТК, мастером или технологом",
          "Действия, влияющие на физический процесс (остановка линии, изменение параметра), исключены из автоматизации",
          "AI-слой развёрнут в контуре предприятия (on-prem/изолированное облако), если данные подпадают под 152-ФЗ или требования заказчика",
          "Запись в MES/ERP проходит проверку допусков и лимитов до сохранения",
          "Метрики пилота — бизнес-эффект (время реакции, доля документов без ручной сверки), а не точность модели саму по себе",
        ],
      },
      comparisonTable: {
        title: "Где AI помогает на производстве, а где остаётся детерминированная логика",
        headers: ["Задача", "Подход", "Почему"],
        rows: [
          ["Контроль оборудования, ПЛК, безопасность", "Детерминированные правила", "Сбой стоит остановки линии или травмы — нужен предсказуемый результат"],
          ["Классификация дефекта по фото", "AI как помощник контролёра ОТК", "Вход неструктурирован, финальное решение — за человеком"],
          ["Извлечение полей из накладной поставщика", "AI + сверка правилами", "Формат документов различается, но данные проверяемы"],
          ["Суммаризация сменного отчёта", "AI-суммаризация свободного текста", "Вход — рукописный/устный текст, задача не требует детерминизма"],
        ],
      },
      faq: [
        {
          q: "Заменяет ли AI систему MES или SCADA?",
          a: "Нет. AI-слой работает поверх них как помощник для неструктурированных данных — фото, текста, документов. Контроль оборудования и безопасность остаются в детерминированных системах.",
        },
        {
          q: "Можно ли развернуть решение в закрытом контуре предприятия?",
          a: "Да. Для чувствительных производственных данных предусмотрен on-prem или изолированный облачный контур с теми же контрактами валидации, что и в облачной версии.",
        },
        {
          q: "Какой процесс выбрать для первого пилота?",
          a: "Тот, где сейчас теряется больше всего времени на ручной обработке при высоком объёме: один тип дефекта, один тип документа поставщика или сменные отчёты о простоях.",
        },
      ],
    },
    en: {
      title: "AI for manufacturing: where AI automation actually pays off",
      description:
        "Not the “smart factory” from a slide deck — concrete scenarios: quality inspection, shift reports, supply requests and supplier documents. An architecture for AI on the shop floor that doesn't put the line at risk.",
      h1: "AI for manufacturing: architecture and scenarios with measurable ROI",
      sections: [
        {
          title: "What actually works on the shop floor",
          paragraphs: [
            "AI for manufacturing rarely means replacing SCADA or MES with a neural network. Deterministic equipment control, PLCs and safety systems stay deterministic — where a failure means a stopped line or an injury, the rule needs to be predictable, not a probabilistic model output.",
            "The model earns its place where the input is unstructured: a photo of a defect on the line, a foreman's free-text shift report, a scanned supplier invoice, a voice request for equipment repair. These are exactly the flows still handled manually and slowly today.",
          ],
        },
        {
          title: "A reference architecture for the shop floor",
          paragraphs: [
            "The data flow starts at the MES/SCADA/ERP layer and doesn't replace it: events (batch, shift, defect, downtime) publish to a queue, an orchestration service assembles context (quality specs, batch specification, equipment history) and calls the model for a specific task — defect classification, invoice field extraction, shift-report summarization.",
            "The model's output is a draft, not a final decision: a proposed defect category, extracted invoice fields, a downtime summary with causes. Writing back to MES/ERP happens after rule-based validation (tolerances, limits, required fields) and, for critical decisions, after sign-off from quality control or the shift foreman.",
          ],
        },
        {
          title: "Common scenarios with fast ROI",
          paragraphs: [
            "First-pass defect classification from photos as a quality-control assistant (not a replacement), plus prioritizing the re-inspection queue. Automating supplier document processing — invoices, certificates of conformity, compliance documents — with field extraction and matching against the purchase order in the ERP.",
            "Summarizing shift and incident reports from free text into a structured log for downtime analysis. A regulations and technical-card assistant for operators — fast lookup of an instruction without walking over to the foreman, answering in shop-floor language rather than generic documentation.",
          ],
        },
        {
          title: "Security, compliance and the data boundary",
          paragraphs: [
            "Manufacturing data is often sensitive — specs, suppliers, volumes — and falls under the customer's security requirements or local data-protection law. The AI layer should run inside the plant's environment — on-prem or an isolated cloud — with the same tool contracts as the cloud version, with no data leaking to external services.",
            "Any action that could affect the physical process — stopping a line, changing an equipment parameter, blocking a batch — stays with a person. The model produces a recommendation and its reasoning; the decision and accountability stay with the shift foreman, process engineer or quality control.",
          ],
        },
        {
          title: "Where to start a pilot",
          paragraphs: [
            "A pilot should launch on one area with a measurable pain point — not “the whole plant.” A good candidate: one defect type with a clear visual signature, one high-volume incoming document type, or one report type currently getting lost in a paper log.",
            "Pilot metrics aren't “model accuracy” on its own — they're business impact: time from defect detection to response, share of documents processed without manual reconciliation, downtime recovery time. 3–6 weeks on one process is enough to decide whether to scale the scenario.",
          ],
        },
      ],
      checklist: {
        title: "Checklist before an AI pilot on the shop floor",
        items: [
          "One area with a measurable pain point is chosen — not \"the whole plant\" at once",
          "The model produces a draft/recommendation; the final decision stays with QC, the foreman or process engineer",
          "Actions affecting the physical process (stopping a line, changing a parameter) are excluded from automation",
          "The AI layer runs inside the plant's environment (on-prem/isolated cloud) if data falls under local data-protection law or customer requirements",
          "Writes to MES/ERP pass tolerance and limit checks before being saved",
          "Pilot metrics are business impact (response time, share of documents without manual reconciliation), not model accuracy alone",
        ],
      },
      comparisonTable: {
        title: "Where AI helps on the shop floor vs. where logic stays deterministic",
        headers: ["Task", "Approach", "Why"],
        rows: [
          ["Equipment control, PLCs, safety", "Deterministic rules", "A failure means a stopped line or an injury — the result must be predictable"],
          ["Defect classification from photos", "AI as a QC assistant", "Input is unstructured; the final call stays with a person"],
          ["Extracting fields from a supplier invoice", "AI + rule-based reconciliation", "Document formats vary, but the data is verifiable"],
          ["Shift-report summarization", "AI summarization of free text", "Input is handwritten/spoken text; the task doesn't need determinism"],
        ],
      },
      faq: [
        {
          q: "Does AI replace the MES or SCADA system?",
          a: "No. The AI layer sits on top of them as an assistant for unstructured data — photos, text, documents. Equipment control and safety stay in deterministic systems.",
        },
        {
          q: "Can this run inside our own plant's environment?",
          a: "Yes. For sensitive manufacturing data, an on-prem or isolated cloud environment is available, with the same validation contracts as the cloud version.",
        },
        {
          q: "Which process should we pick for the first pilot?",
          a: "The one currently losing the most time to manual handling at high volume: one defect type, one supplier document type, or shift downtime reports.",
        },
      ],
    },
  },
  {
    slug: "ai-proposal-generation",
    cluster: "specialist-ai-architecture",
    keywords: [
      "AI proposal generation",
      "AI generated sales proposals",
      "автоматическая генерация КП",
      "генерация коммерческих предложений с AI",
      "sales proposal automation",
    ],
    related: [
      { href: "/automation/proposal-generation", labelRu: "Генерация коммерческих предложений", labelEn: "Commercial proposal generation" },
      { href: "/services/sales-ai-agent", labelRu: "AI-агент для продаж", labelEn: "Sales AI agent" },
      { href: "/blog/ai-agents-in-sales-architecture", labelRu: "AI-агенты в продажах", labelEn: "AI agents in sales" },
      { href: "/blog/ai-document-processing-pipeline", labelRu: "AI-обработка документов", labelEn: "AI document processing" },
    ],
    publishedAt: "2026-07-25",
    ru: {
      title: "AI Proposal Generation: архитектура автогенерации коммерческих предложений",
      description:
        "Автогенерация КП — это не «LLM пишет текст». Разбираем архитектуру: откуда берутся цены, как проверяются цифры, кто подтверждает скидку и как измерять эффект на конверсии.",
      h1: "AI Proposal Generation: как автоматизировать подготовку КП без риска для цифр",
      sections: [
        {
          title: "Что на самом деле означает AI proposal generation",
          paragraphs: [
            "AI proposal generation — это не генератор текста поверх шаблона. Это конвейер, который собирает контекст сделки (продукт, объём, историю переговоров), берёт цены и условия из системы-источника правды (прайс, CRM, ERP), и только использует модель для структуры документа и убедительного текста — не для расчёта суммы.",
            "Разделение ответственности здесь критично: менеджер тратит часы не на подбор формулировок, а на сверку цифр вручную. Если цена, скидка и сроки приходят из детерминированного расчёта, а модель отвечает только за текст и адаптацию под клиента, риск ошибки в документе резко падает.",
          ],
        },
        {
          title: "Референсная архитектура генерации КП",
          paragraphs: [
            "Триггер — переход сделки на этап «КП» в CRM или явный запрос менеджера. Сервис оркестрации собирает контекст: карточку сделки, выбранные позиции каталога, применимые скидки по политике, историю похожих успешных предложений. Модель получает этот контекст и генерирует структуру документа и текст разделов, но не итоговые суммы.",
            "Числовые поля — цена, скидка, итог, сроки — рассчитываются отдельным детерминированным шагом до или после вызова модели и валидируются по схеме перед рендерингом в PDF/DOCX по шаблону. Идемпотентный ключ на сделку и версию КП предотвращает дублирование документов при повторном триггере.",
          ],
        },
        {
          title: "Контекст без выдуманных фактов",
          paragraphs: [
            "Убедительный текст требует фактов о продукте, кейсах и условиях — и здесь модель особенно уязвима к выдумыванию. RAG по каталогу товаров, актуальным условиям и релевантным кейс-стади ограничивает модель реальными источниками вместо общих знаний.",
            "Каждое фактическое утверждение в тексте КП — характеристика, гарантия, срок поставки — должно быть привязано к источнику в контексте, который можно показать при проверке. Черновик без такой привязки уходит на ручную проверку менеджера перед отправкой, а не сразу клиенту.",
          ],
        },
        {
          title: "Guardrails: скидки, условия и подтверждение",
          paragraphs: [
            "Изменение цены за пределами стандартной скидочной сетки, нестандартные условия оплаты и юридически значимые формулировки договора требуют подтверждения человеком — руководителем продаж или юристом — до отправки документа клиенту. Модель может предложить скидку как рекомендацию, но не применяет её самостоятельно.",
            "Каждая версия КП сохраняется с указанием, кто утвердил цифры, какая модель и версия prompt использовались для текста, и какие источники контекста были доступны. Это превращает «AI сгенерировал предложение» в проверяемый и воспроизводимый процесс, а не чёрный ящик.",
          ],
        },
        {
          title: "Как измерять эффект",
          paragraphs: [
            "Операционные метрики — время от триггера до готового черновика, доля КП, отправленных без ручных правок цифр, число итераций до утверждения. Эти метрики показывают, снимает ли система рутину или просто добавляет шаг проверки.",
            "Бизнес-метрики — время от заявки до отправленного КП, конверсия из КП в оплату по сравнению с ручным процессом, число сделок, где скорость подготовки предложения повлияла на выбор клиента. Пилот на одном сегменте каталога за 2–4 недели даёт достаточно данных для решения о масштабировании.",
          ],
        },
      ],
      checklist: {
        title: "Чек-лист автогенерации КП перед запуском",
        items: [
          "Цена, скидка, итог и сроки считаются отдельным детерминированным шагом — модель их не генерирует",
          "Идемпотентный ключ на сделку и версию КП — повторный триггер не плодит дубликаты документа",
          "Факты о продукте привязаны к источнику через RAG по каталогу, а не к общим знаниям модели",
          "Скидка вне стандартной сетки и нестандартные условия оплаты требуют подтверждения человеком",
          "Каждая версия КП хранит, кто утвердил цифры, версию prompt и использованные источники контекста",
          "Черновик без привязки фактов к источнику уходит на ручную проверку, а не сразу клиенту",
        ],
      },
      codeSnippet: {
        title: "Валидация числовых полей перед рендерингом КП",
        language: "json",
        code: `{
  "proposal_id": "PROP-2026-0731",
  "deal_id": "D-4471",
  "pricing_source": "1c-price-list-v12",
  "line_items": [
    { "sku": "SVC-100", "qty": 1, "unit_price": 300000, "discount_pct": 0 }
  ],
  "total": 300000,
  "discount_requires_approval": false,
  "approved_by": null
}`,
      },
      faq: [
        {
          q: "Может ли модель самостоятельно назначать скидку в КП?",
          a: "Нет в стандартной архитектуре. Скидки рассчитываются по политике в детерминированном шаге; модель может предложить скидку как рекомендацию, но применение остаётся за человеком или жёстким правилом.",
        },
        {
          q: "Как избежать выдуманных цифр и характеристик в предложении?",
          a: "Числовые поля никогда не генерируются моделью напрямую — они приходят из прайса, CRM или ERP. Фактические утверждения о продукте привязываются к источникам через RAG по каталогу, а не к общим знаниям модели.",
        },
        {
          q: "Чем это отличается от обычного генератора документов по шаблону?",
          a: "Генератор шаблонов просто подставляет поля. AI proposal generation дополнительно адаптирует структуру и текст под контекст конкретной сделки и клиента, сохраняя детерминированную проверку всех цифр.",
        },
      ],
    },
    en: {
      title: "AI Proposal Generation: an architecture for automating sales proposals",
      description:
        "AI proposal generation isn't “an LLM writes the copy.” A breakdown of the architecture: where the numbers come from, how they're validated, who approves a discount, and how to measure the effect on conversion.",
      h1: "AI Proposal Generation: automating proposal prep without risking the numbers",
      sections: [
        {
          title: "What AI proposal generation actually means",
          paragraphs: [
            "AI proposal generation is not a text generator layered on a template. It's a pipeline that assembles deal context (product, volume, negotiation history), pulls prices and terms from the system of record (price list, CRM, ERP), and only uses the model for document structure and persuasive copy — never for calculating the amount.",
            "This separation of responsibility matters because reps spend hours not on wording, but on manually double-checking numbers. When price, discount and timeline come from a deterministic calculation and the model only owns text and customer-fit framing, the risk of an error in the document drops sharply.",
          ],
        },
        {
          title: "A reference architecture for proposal generation",
          paragraphs: [
            "The trigger is a deal reaching the “proposal” stage in the CRM, or an explicit rep request. An orchestration service assembles context: the deal record, selected catalog items, applicable discounts under policy, and a history of similar successful proposals. The model receives this context and generates the document structure and section copy — not the final totals.",
            "Numeric fields — price, discount, total, delivery date — are computed in a separate deterministic step before or after the model call and validated against a schema before rendering into a PDF/DOCX template. An idempotency key on the deal and proposal version prevents duplicate documents on a repeated trigger.",
          ],
        },
        {
          title: "Grounded context, not invented facts",
          paragraphs: [
            "Persuasive copy needs facts about the product, cases and terms — exactly where a model is most prone to inventing details. RAG over the product catalog, current terms and relevant case studies constrains the model to real sources instead of its general knowledge.",
            "Every factual claim in the proposal copy — a spec, a warranty, a delivery timeline — should be traceable to a source in the assembled context that can be shown during review. A draft without that traceability goes to manual rep review before it reaches the client, not straight out the door.",
          ],
        },
        {
          title: "Guardrails: discounts, terms and approval",
          paragraphs: [
            "Pricing changes beyond the standard discount grid, non-standard payment terms and legally binding contract language require human approval — a sales manager or legal — before the document reaches the client. The model can propose a discount as a recommendation; it never applies one on its own.",
            "Every proposal version is stored with who approved the numbers, which model and prompt version generated the copy, and which context sources were available. That turns “AI generated the proposal” into a reviewable, reproducible process instead of a black box.",
          ],
        },
        {
          title: "Measuring the impact",
          paragraphs: [
            "Operational metrics: time from trigger to a ready draft, share of proposals sent with no manual number corrections, iterations to approval. These show whether the system removes busywork or just adds another review step.",
            "Business metrics: time from request to a sent proposal, proposal-to-payment conversion compared with the manual process, and deals where proposal turnaround speed influenced the customer's decision. A pilot on one catalog segment over 2–4 weeks gives enough data to decide on scaling.",
          ],
        },
      ],
      checklist: {
        title: "Proposal-generation checklist before launch",
        items: [
          "Price, discount, total and delivery date are computed in a separate deterministic step — the model never generates them",
          "An idempotency key on the deal and proposal version stops a repeated trigger from creating duplicate documents",
          "Product claims are grounded via RAG over the catalog, not the model's general knowledge",
          "Discounts beyond the standard grid and non-standard payment terms require human approval",
          "Every proposal version stores who approved the numbers, the prompt version and the context sources used",
          "A draft without source-grounded facts goes to manual review, not straight to the client",
        ],
      },
      codeSnippet: {
        title: "Validating numeric fields before rendering the proposal",
        language: "json",
        code: `{
  "proposal_id": "PROP-2026-0731",
  "deal_id": "D-4471",
  "pricing_source": "1c-price-list-v12",
  "line_items": [
    { "sku": "SVC-100", "qty": 1, "unit_price": 3000, "discount_pct": 0 }
  ],
  "total": 3000,
  "discount_requires_approval": false,
  "approved_by": null
}`,
      },
      faq: [
        {
          q: "Can the model set a discount in the proposal on its own?",
          a: "Not in the standard architecture. Discounts are computed by policy in a deterministic step; the model can suggest a discount as a recommendation, but applying it stays with a person or a hard rule.",
        },
        {
          q: "How do you avoid invented numbers or specs in a proposal?",
          a: "Numeric fields are never generated by the model directly — they come from the price list, CRM or ERP. Product claims are grounded via RAG over the catalog, not the model's general knowledge.",
        },
        {
          q: "How is this different from a plain template generator?",
          a: "A template generator just fills in fields. AI proposal generation additionally adapts structure and copy to the specific deal and customer context, while keeping deterministic validation on every number.",
        },
      ],
    },
  },
];
