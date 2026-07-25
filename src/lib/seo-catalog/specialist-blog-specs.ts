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
      faq: [
        { q: "Can an LLM replace OCR?", a: "Not in every pipeline. Multimodal models help with difficult layouts, but production IDP still needs coordinates, confidence, validation and repeatable extraction." },
        { q: "When should a document go to human review?", a: "When confidence is low, rules conflict, the document type is unknown or financial risk is high. Thresholds should vary by field and process." },
        { q: "How do you prevent duplicate posting?", a: "Use checksums, business keys, duplicate checks in the ERP and an idempotency key during export." },
      ],
    },
  },
];
