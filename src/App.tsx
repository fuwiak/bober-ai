"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type ComponentType } from "react";
import {
  Cloud,
  Menu,
  X,
  Brain,
  Server,
  Shield,
  BarChart,
  GitBranch,
  ArrowRight,
  PhoneCall,
  Mail,
  LayoutGrid,
  Handshake,
  Info,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SHOW_VK_CLOUD_MENTIONS } from "@/config/featureFlags";

const navLinkClass =
  "text-on-surface font-medium font-headline tracking-tight hover:text-primary transition-colors duration-300 border-b-2 border-transparent hover:border-primary/40 pb-1";

const menuItems = [
  { href: "#cases", label: "Кейсы" },
  { href: "#partners", label: "Пишут о нас" },
  { href: "#contact", label: "Контакт" },
  { href: "#services", label: "Наши услуги" },
  { href: "/academy", label: "Академия Yandex" },
];

type PartnerItem = {
  name: string;
  icon: string;
  url: string;
  vk?: true;
  wordmark?: true;
  width?: number;
  height?: number;
};

const partnerItemsAll: PartnerItem[] = [
  {
    name: "Yandex Cloud",
    icon: "/partners/yandex-cloud.png",
    url: "https://yandex.cloud/",
    wordmark: true,
    width: 321,
    height: 157,
  },
  {
    name: "Selectel",
    icon: "/partners/selectel.png",
    url: "https://selectel.ru/",
    wordmark: true,
    width: 321,
    height: 157,
  },
  {
    name: "cloud.ru",
    icon: "/partners/cloudru.png",
    url: "https://cloud.ru/",
    wordmark: true,
    width: 1024,
    height: 190,
  },
  {
    name: "VK Cloud",
    icon: "/partners/vk-cloud.png",
    url: "https://mcs.mail.ru/",
    vk: true,
    wordmark: true,
    width: 321,
    height: 157,
  },
  {
    name: "Claude",
    icon: "/partners/claude.png",
    url: "https://claude.ai/",
    wordmark: true,
    width: 321,
    height: 157,
  },
];

const partnerItems = partnerItemsAll.filter(
  (p) => SHOW_VK_CLOUD_MENTIONS || !p.vk,
);

const heroPartnerBadge = SHOW_VK_CLOUD_MENTIONS
  ? "Official Yandex & VK Cloud Partner"
  : "Official Yandex Cloud Partner";

const heroLeadCopy = SHOW_VK_CLOUD_MENTIONS
  ? "Помогаем бизнесу быстро запускать ИИ-решения, которые реально влияют на прибыль: автоматизируют поддержку и продажи, ускоряют работу команд и снижают операционные издержки. Не навязываем один шаблон - проектируем и внедряем AI-инфраструктуру индивидуально под ваши KPI, процессы, сроки и бюджет, используя стек Yandex Cloud, Selectel, cloud.ru и VK Cloud, включая приватные LLM в защищенном контуре на сертифицированных GPU."
  : "Помогаем бизнесу быстро запускать ИИ-решения, которые реально влияют на прибыль: автоматизируют поддержку и продажи, ускоряют работу команд и снижают операционные издержки. Не навязываем один шаблон - проектируем и внедряем AI-инфраструктуру индивидуально под ваши KPI, процессы, сроки и бюджет, используя стек Yandex Cloud, Selectel и cloud.ru, включая приватные LLM в защищенном контуре на сертифицированных GPU.";

const cloudInfraCopy = SHOW_VK_CLOUD_MENTIONS
  ? "Миграция, настройка и поддержка критически важных систем в облаках Selectel, cloud.ru и VK Cloud с фокусом на отказоустойчивость, безопасность и предсказуемые затраты."
  : "Миграция, настройка и поддержка критически важных систем в облаках Selectel и cloud.ru с фокусом на отказоустойчивость, безопасность и предсказуемые затраты.";

const serviceResourceLinks = {
  corporateAi: "https://yandex.cloud/ru/services/yandexgpt",
  cloudInfra: "https://selectel.ru/services/cloud/",
  security: "https://selectel.ru/",
  automation: "https://yandex.cloud/ru/services/monitoring",
  devops: "https://yandex.cloud/ru/services/managed-kubernetes",
  messenger: "https://mcs.mail.ru/",
  crmAi: "https://cloud.ru/ru/services",
  aiCloud: "https://cloud.ru/ru/services",
  localAiGpu: "https://selectel.ru/services/dedicated/gpu/",
  callCenter: "https://yandex.cloud/ru/services/speechkit",
};

type ServiceMiniCard = {
  title: string;
  description: string;
  resourceKey: keyof typeof serviceResourceLinks;
  Icon: ComponentType<{ className?: string }>;
};

const serviceMiniCards: ServiceMiniCard[] = [
  {
    title: "Контакт-центр",
    description:
      "Автоматизируем контакт-центр с помощью Realtime API: даем подсказки оператору во время звонка, включаем аналитику разговоров и сохраняем саммари в CRM и аналитические системы.",
    resourceKey: "callCenter",
    Icon: PhoneCall,
  },
  {
    title: "Голосовой агент поддержки",
    description:
      "Создаем голосовых агентов, которые понимают запросы, отвечают без задержек и интегрируются с системами поддержки и базами знаний компании для работы 24/7.",
    resourceKey: "callCenter",
    Icon: Mail,
  },
  {
    title: "Телемаркетинг и оповещения",
    description:
      "Запускаем массовые голосовые кампании и оповещения с единым фирменным голосом бренда, персонализацией сообщений и стабильным качеством коммуникации.",
    resourceKey: "callCenter",
    Icon: BarChart,
  },
  {
    title: "Внутренние ассистенты",
    description:
      "Превращаем встречи и звонки в структурированные протоколы: извлекаем договоренности, автоматически ставим задачи и формируем отчеты для команд и руководства.",
    resourceKey: "corporateAi",
    Icon: Brain,
  },
  {
    title: "Медиа и контент",
    description:
      "Озвучиваем новости, подкасты и аудиокниги естественными голосами, чтобы масштабировать производство контента и ускорять выпуск без студийной записи.",
    resourceKey: "corporateAi",
    Icon: LayoutGrid,
  },
  {
    title: "Продажи и лидогенерация",
    description:
      "Автоматизируем первичный контакт с потенциальными клиентами: квалифицируем лиды, уточняем потребности и направляем обращения в нужные команды или CRM-сценарии.",
    resourceKey: "crmAi",
    Icon: Handshake,
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full glass-nav kinetic-shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3">
          <Cloud className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl font-extrabold tracking-tighter text-on-surface">KINETIC AI</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          <a className={navLinkClass} href="#services">
            Услуги
          </a>
          <a className={navLinkClass} href="#cases">
            Кейсы
          </a>
          <a className={navLinkClass} href="#partners">
            Партнеры
          </a>
          <a className={navLinkClass} href="#info">
            Инфо
          </a>
          <a className={navLinkClass} href="/academy">
            Академия Yandex
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="text-on-surface transition-transform active:scale-95 md:hidden"
            aria-label="Меню"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-header-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div id="mobile-header-menu" className="border-t border-outline-variant/20 bg-surface-container-lowest/95 px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-xl border border-outline-variant/20 px-4 py-3 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container-low"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

const Hero = () => (
  <section
    id="top"
    className="relative mx-auto max-w-7xl scroll-mt-28 px-6 pb-20 pt-28 md:overflow-hidden md:py-32 md:pt-32"
  >
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 min-w-0"
      >
        <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block font-body">{heroPartnerBadge}</span>
        <div className="mb-8 flex w-full max-w-2xl items-center gap-5 rounded-2xl border border-primary/25 bg-surface-container-low px-5 py-4 shadow-md">
          <div className="relative h-20 w-[340px] shrink-0 overflow-hidden rounded-lg bg-white p-0.5 ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10">
            <Image
              alt="Yandex Cloud — бизнес-партнер"
              src="/yandex/yandex-cloud-business-partner-ru-light.svg"
              fill
              sizes="340px"
              className="object-cover object-center"
              priority
            />
          </div>
          <span className="text-sm font-bold uppercase tracking-wider text-on-surface">
            Бизнес-партнер Yandex Cloud
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-on-surface mb-6 leading-[1.1]">
          Масштабируйте <br/><span className="text-gradient">Интеллект.</span>
        </h1>
        <p className="text-lg text-tertiary-container max-w-lg mb-10 leading-relaxed font-body">{heroLeadCopy}</p>
        <div className="flex flex-wrap gap-4">
          <a className="btn-primary" href="#contact">
            Начать внедрение
          </a>
          <a
            className="btn-secondary"
            href="https://t.me/sizovmaksim"
            target="_blank"
            rel="noreferrer"
          >
            Консультация
          </a>
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-0 min-w-0"
      >
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-surface-container-high via-surface-container-low to-primary/15" />
          <div className="relative flex h-full min-h-0 flex-col items-center justify-center gap-6 p-6 text-center sm:gap-8 sm:p-8 md:p-10">
            <div className="relative h-44 w-full max-w-lg shrink-0 sm:h-48 sm:max-w-xl md:h-52">
              <Image
                alt="Claude"
                src="/partners/claude.png"
                fill
                sizes="(max-width: 768px) 90vw, 512px"
                className="object-contain object-center"
                priority
              />
            </div>
            <p className="mx-auto max-w-md text-center text-base font-medium leading-relaxed text-on-surface md:text-lg">
              Делаем интеграцию и автоматизацию Claude для вашей компании
            </p>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
        </div>
      </motion.div>
    </div>
  </section>
);

const Services = () => {
  const [isCloudModalOpen, setCloudModalOpen] = useState(false);
  const serviceMiniCardsTrack = [...serviceMiniCards, ...serviceMiniCards];

  return (
    <section id="services" className="scroll-mt-28 bg-surface-container-low py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-primary font-bold uppercase tracking-widest text-xs font-body">Что мы делаем</span>
          <h2 className="text-4xl font-bold tracking-tight mt-2">Экосистема решений</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          whileHover={{ backgroundColor: "var(--color-surface-bright)" }}
          className="group flex flex-col justify-between rounded-3xl bg-surface-container-lowest p-10 transition-colors md:col-span-2"
        >
          <div>
            <Brain className="text-primary w-10 h-10 mb-6" />
            <h3 className="mb-4 text-2xl font-bold text-primary">Корпоративный ИИ и чат-боты</h3>
            <p className="text-on-surface-variant leading-relaxed max-w-2xl">
              Внедрение LLM-моделей в ваши бизнес-процессы с приоритетом на российский технологический стек и требования 152-ФЗ.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-on-surface-variant leading-relaxed max-w-2xl">
              <li>Работа с российскими нейросетями (AliceAI LLM, GigaChat и др.).</li>
              <li>Создание ИИ-ботов только на российских серверах.</li>
              <li>Полностью локальное развёртывание моделей и баз данных.</li>
              <li>Все решения совместимы с требованиями 152-ФЗ: данные не выходят за границу.</li>
            </ul>
            <p className="mt-4 text-on-surface-variant leading-relaxed max-w-2xl">
              От автоматизации клиентской поддержки до глубокой аналитики данных с использованием YandexGPT и других корпоративных LLM.
            </p>
          </div>
          <div className="mt-12 flex justify-end">
            <a
              href={serviceResourceLinks.corporateAi}
              target="_blank"
              rel="noreferrer"
              className="mr-4 inline-flex rounded-xl border border-outline-variant/30 px-4 py-2 text-sm font-semibold text-on-surface transition hover:border-primary/40 hover:text-primary"
            >
              Ресурс
            </a>
            <ArrowRight className="text-primary group-hover:translate-x-2 transition-transform" />
          </div>
        </motion.div>

          <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#722F37] p-10 text-white shadow-xl">
            <div>
              <Server className="mb-6 h-10 w-10 text-amber-100/90" />
              <h3 className="mb-4 text-2xl font-bold">Облачная инфраструктура</h3>
              <p className="leading-relaxed text-white/85">{cloudInfraCopy}</p>
            </div>
            <div className="mt-12">
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="rounded-xl border border-white/35 bg-white/10 px-4 py-2 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-white/20"
                  onClick={() => setCloudModalOpen(true)}
                >
                  Подробнее
                </button>
                <a
                  href={serviceResourceLinks.cloudInfra}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-white/35 bg-white/10 px-4 py-2 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-white/20"
                >
                  Ресурс
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 overflow-hidden">
            <motion.div
              className="flex w-max gap-6"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 42, ease: "linear", repeat: Infinity }}
            >
              {serviceMiniCardsTrack.map((card, index) => {
                const Icon = card.Icon;
                return (
                  <div
                    key={`${card.title}-${index}`}
                    className="card-premium flex w-[320px] shrink-0 flex-col"
                  >
                    <Icon className="text-primary mb-6 h-8 w-8" />
                    <h3 className="mb-2 text-xl font-bold">{card.title}</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{card.description}</p>
                    <a
                      href={serviceResourceLinks[card.resourceKey]}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline"
                    >
                      Ресурс
                    </a>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
      {isCloudModalOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cloud-infra-modal-title"
        >
          <div className="w-full max-w-2xl rounded-3xl bg-surface-container-lowest p-8 shadow-2xl">
            <h4 id="cloud-infra-modal-title" className="text-2xl font-bold text-on-surface">
              Облачная инфраструктура
            </h4>
            <p className="mt-4 text-on-surface-variant leading-relaxed">
              Проектируем и сопровождаем отказоустойчивую облачную инфраструктуру для критичных сервисов в Selectel и
              cloud.ru: от аудита текущей архитектуры и плана миграции до запуска production-контуров с минимальными
              простоями.
            </p>
            <p className="mt-4 text-on-surface-variant leading-relaxed">
              Настраиваем резервирование, отказоустойчивость, мониторинг, централизованное логирование и регламенты
              восстановления после инцидентов. В результате ваша команда получает прозрачную эксплуатацию, контроль SLA,
              снижение рисков и управляемый бюджет на облако без скрытых расходов.
            </p>
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                className="rounded-xl bg-primary px-5 py-3 text-sm font-bold uppercase tracking-widest text-on-primary transition hover:opacity-90"
                onClick={() => setCloudModalOpen(false)}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const processSteps = [
  {
    title: "Шаг 1. Заявка и бриф",
    description:
      "Фиксируем KPI, бизнес-цели и ограничения по срокам, бюджету, безопасности и требованиям 152-ФЗ.",
  },
  {
    title: "Шаг 2. Архитектура решения",
    description:
      "Проектируем целевую схему: облако, локальный контур или гибрид с приватными LLM, чат-ботами и нужными интеграциями.",
  },
  {
    title: "Шаг 3. Пилот и интеграции",
    description:
      "Разворачиваем инфраструктуру, подключаем CRM/поддержку/продажи и проверяем сценарии автоматизации на реальных кейсах.",
  },
  {
    title: "Шаг 4. Запуск и масштабирование",
    description:
      "Выводим в production, передаём SLA и метрики эффективности, затем масштабируем решение под рост нагрузки и новые процессы.",
  },
];

const Process = () => (
  <section id="process" className="scroll-mt-28 py-24 px-6">
    <div className="mx-auto max-w-7xl">
      <div className="text-center">
        <span className="text-primary font-bold uppercase tracking-widest text-xs font-body">Процесс</span>
        <h2 className="mt-3 text-4xl font-bold tracking-tight">Запуск за 4 простых шага</h2>
        <p className="mx-auto mt-4 max-w-2xl text-on-surface-variant leading-relaxed">
          От бизнес-задачи до production-ready AI-решения с измеримым эффектом
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {processSteps.map((step) => (
          <div
            key={step.title}
            className="rounded-3xl border border-outline-variant/20 bg-surface-container-low p-8"
          >
            <h3 className="text-xl font-bold text-on-surface">{step.title}</h3>
            <p className="mt-3 text-on-surface-variant leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

type PricingPlan = {
  name: string;
  scope: string;
  scopeAlt?: string;
  price: string;
  features?: string[];
  bonusTitle?: string;
  bonusItems?: string[];
  featured?: boolean;
  badge?: string;
};

const pricingPlans: PricingPlan[] = [
  {
    name: "Запуск",
    scope: "Индивидуальный MVP",
    scopeAlt: "под 1 ключевой процесс",
    price: "20 000 ₽/мес",
    features: [
      "Персональный аудит задачи, данных и ограничений бюджета",
      "Техническая поддержка 24/7",
      "Запуск AI-решения под ваш целевой KPI (поддержка, продажи, back-office)",
      "Точечные интеграции с CRM/саппортом/телефонией под текущий стек",
      "Базовая аналитика эффективности",
      "Соответствие требованиям 152-ФЗ",
      "Без скрытых платежей в рамках пакета",
    ],
  },
  {
    name: "Расширенный",
    scope: "Мультисценарный запуск",
    scopeAlt: "для нескольких команд",
    price: "45 000 ₽/мес",
    featured: true,
    badge: "Популярный",
    bonusTitle: "Тариф Запуск +",
    bonusItems: [
      "Скидка 30% на разработку цифрового сотрудника",
      "Архитектурный roadmap под ваши бизнес-приоритеты",
      "Скидка 30% на аудит качества AI-сценариев",
    ],
  },
  {
    name: "Профессиональный",
    scope: "Стратегическая AI-платформа",
    scopeAlt: "приватный LLM-контур",
    price: "95 000 ₽/мес",
    bonusTitle: "Тариф Расширенный +",
    bonusItems: [
      "Скидка 50% на разработку цифрового сотрудника",
      "Выделенный technical lead и регулярный review KPI/экономики",
    ],
  },
];

const Pricing = () => (
  <section id="pricing" className="scroll-mt-28 bg-surface-container-low py-24 px-6">
    <div className="mx-auto max-w-7xl">
      <div className="text-center">
        <h2 className="text-4xl font-bold tracking-tight text-on-surface">Форматы внедрения AI-решений</h2>
        <p className="mx-auto mt-4 max-w-2xl text-on-surface-variant leading-relaxed">
          Подбираем формат внедрения индивидуально: без навязанного шаблона, с фокусом на ваши процессы, стек и бюджет
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-3xl border p-8 ${
              plan.featured
                ? "border-primary/45 bg-surface-container-lowest shadow-[0_16px_40px_rgba(0,0,0,0.16)]"
                : "border-outline-variant/20 bg-surface-container-lowest"
            }`}
          >
            {plan.badge ? (
              <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-on-primary">
                {plan.badge}
              </span>
            ) : null}
            <h3 className="text-2xl font-bold text-on-surface">{plan.name}</h3>
            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm font-semibold">
              <span className="rounded-full bg-primary/12 px-3 py-1 text-primary">{plan.scope}</span>
              {plan.scopeAlt ? (
                <>
                  <span className="text-on-surface-variant">или</span>
                  <span className="rounded-full bg-primary/12 px-3 py-1 text-primary">{plan.scopeAlt}</span>
                </>
              ) : null}
            </div>

            {plan.features ? (
              <ul className="mt-6 space-y-2 text-sm text-on-surface-variant">
                {plan.features.map((feature) => (
                  <li key={feature}>- {feature}</li>
                ))}
              </ul>
            ) : null}

            {plan.bonusTitle ? (
              <div className="mt-6 rounded-2xl border border-outline-variant/20 bg-surface-container-low p-4">
                <p className="text-sm font-bold text-on-surface">{plan.bonusTitle}</p>
                <ul className="mt-2 space-y-2 text-sm text-on-surface-variant">
                  {plan.bonusItems?.map((item) => <li key={item}>- {item}</li>)}
                </ul>
              </div>
            ) : null}

            <div className="mt-8 text-3xl font-extrabold tracking-tight text-on-surface">{plan.price}</div>
            <a href="#contact" className="btn-primary mt-6 inline-flex">
              Оставить заявку
            </a>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-8 lg:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-2xl font-bold text-on-surface">Enterprise</h3>
            <p className="mt-2 inline-flex rounded-full bg-primary/12 px-3 py-1 text-sm font-semibold text-primary">
              выделенная AI-платформа под ваш контур
            </p>
            <p className="mt-4 text-on-surface-variant leading-relaxed">
              Тариф Профессиональный + выделенная команда внедрения, приватные LLM в защищенном контуре, продвинутая
              аналитика и SLA под критичные процессы с индивидуальной архитектурой под вашу организацию.
            </p>
          </div>
          <div className="shrink-0">
            <div className="text-3xl font-extrabold tracking-tight text-on-surface">250 000 ₽/мес</div>
            <a href="#contact" className="btn-primary mt-4 inline-flex">
              Оставить заявку
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-2 text-sm text-on-surface-variant">
        <p>
          * Разовая разработка AI-сценариев и базовая интеграция с вашими системами - от 50 000 ₽.
        </p>
        <p>* Если нужно больше сценариев или интеграций, масштабируем пакет без остановки production и без смены платформы.</p>
        <p>* Вся инфраструктура размещается в РФ и соответствует требованиям 152-ФЗ.</p>
      </div>
    </div>
  </section>
);

const casePlaceholders = [
  {
    title: "Виртуоз и его скрипка",
    tag: "Индустрия и AI-инструменты",
    description: "Короткое интро о том, почему ИИ не заменяет программиста, а усиливает его как новый инструмент.",
    url: "https://gazeta.severgazbank.ru/virtuoz-i-ego-skripka-pochemu-ii-ne-zamena-programmistu-a-novyj-instrument/",
  },
  {
    title: "Староверы и новаторы",
    tag: "Образование и нейросети",
    description: "Короткий обзор о том, как педагоги разделились во взглядах на внедрение нейросетей в практике.",
    url: "https://www.mk-mosobl.ru/social/2026/03/16/starovery-i-novatory-pedagogi-razdelilis-na-dva-lagerya-izza-vnedreniya-neyrosetey.html",
  },
  {
    title: "Кейс #3",
    tag: "Приватный LLM-контур",
    description: "Скоро опишем запуск защищенного AI-контура на сертифицированных GPU в инфраструктуре РФ.",
    url: "#",
  },
  {
    title: "Кейс #4",
    tag: "Интеграция AI в CRM",
    description: "Скоро опубликуем сценарий персонализации коммуникаций и прогнозирования качества лидов.",
    url: "#",
  },
];

const Cases = () => (
  <section id="cases" className="scroll-mt-28 py-24 px-6">
    <div className="mx-auto max-w-7xl">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-on-surface">Кейсы</h2>
          <p className="mt-4 max-w-2xl text-on-surface-variant leading-relaxed">
            Примеры внедрения AI-решений под разные отрасли и бюджеты. Ниже - временные placeholders, скоро добавим
            реальные проекты.
          </p>
        </div>
        <a
          href="https://selectel.ru/blog/category/case/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex rounded-2xl border border-outline-variant/30 px-5 py-3 text-sm font-semibold text-on-surface transition hover:border-primary/40 hover:text-primary"
        >
          Все кейсы
        </a>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {casePlaceholders.map((item) => (
          <a
            key={item.title}
            href={item.url}
            target={item.url.startsWith("http") ? "_blank" : undefined}
            rel={item.url.startsWith("http") ? "noreferrer" : undefined}
            className="group rounded-3xl border border-outline-variant/20 bg-surface-container-low p-6 transition hover:border-primary/40 hover:bg-surface-container"
          >
            <div className="mb-5 h-40 rounded-2xl bg-gradient-to-br from-surface-container-high to-primary/10" />
            <p className="inline-flex rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold text-primary">{item.tag}</p>
            <h3 className="mt-4 text-xl font-bold text-on-surface">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{item.description}</p>
          </a>
        ))}
      </div>
    </div>
  </section>
);

const Partners = () => (
  <section id="partners" className="scroll-mt-28 py-24 px-6 overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight">Наши ключевые партнеры</h2>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-16 opacity-70">
        {partnerItems.map((partner) => (
          <a
            key={partner.name}
            href={partner.url}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4"
            aria-label={`${partner.name} website`}
          >
            {partner.wordmark ? (
              <Image
                alt={partner.name}
                src={partner.icon}
                width={partner.width ?? 321}
                height={partner.height ?? 157}
                className="h-20 w-auto max-w-[min(400px,94vw)] rounded-2xl bg-white object-contain object-center px-3 py-2 ring-1 ring-black/5 sm:h-24 sm:max-w-[min(480px,95vw)] md:h-28 md:max-w-[min(560px,96vw)] dark:bg-zinc-900 dark:ring-white/10"
              />
            ) : (
              <>
                <Image
                  alt={`${partner.name} favicon`}
                  src={partner.icon}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-2xl bg-white object-contain p-1 ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10"
                />
                <span className="font-bold text-2xl tracking-tighter transition-colors group-hover:text-primary">
                  {partner.name}
                </span>
              </>
            )}
          </a>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="max-w-7xl mx-auto scroll-mt-28 px-6 pb-32">
    <div className="flex flex-col overflow-hidden rounded-3xl bg-on-surface text-surface-container-lowest md:flex-row">
      <div className="md:w-1/2 p-12 md:p-20 relative bg-[#1b1c1c]">
        <h2 className="text-4xl font-bold mb-6 leading-tight text-white">Готовы обсудить <br/>ваш проект?</h2>
        <p className="text-surface-dim mb-12 max-w-xs font-body">
          Оставьте заявку, и наш эксперт свяжется с вами в течение 30 минут для первичного аудита.
        </p>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <PhoneCall className="text-secondary-container w-5 h-5 shrink-0" />
            <a
              href="tel:+79269901666"
              className="text-white underline-offset-4 transition-colors hover:text-secondary-container hover:underline"
            >
              +7 926 990 1666
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="text-secondary-container w-5 h-5 shrink-0" />
            <a
              href="mailto:hello@kinetic-ai.ru"
              className="text-white underline-offset-4 transition-colors hover:text-secondary-container hover:underline"
            >
              hello@kinetic-ai.ru
            </a>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
          <Cloud className="w-[200px] h-[200px] text-white" />
        </div>
      </div>
      <div className="border-t border-outline-variant/10 bg-contact-panel p-12 md:w-1/2 md:border-l md:border-t-0 md:p-20">
        <form className="space-y-8">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Ваше имя</label>
            <input 
              className="w-full bg-surface-container-highest border-0 border-b-2 border-transparent focus:ring-0 focus:border-primary transition-all px-3 py-3 text-on-surface placeholder:text-surface-dim" 
              placeholder="Александр" 
              type="text"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Email или Телефон</label>
            <input 
              className="w-full bg-surface-container-highest border-0 border-b-2 border-transparent focus:ring-0 focus:border-primary transition-all px-3 py-3 text-on-surface placeholder:text-surface-dim" 
              placeholder="contact@company.ru" 
              type="text"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Сообщение</label>
            <textarea 
              className="w-full bg-surface-container-highest border-0 border-b-2 border-transparent focus:ring-0 focus:border-primary transition-all px-3 py-3 text-on-surface placeholder:text-surface-dim" 
              placeholder="Расскажите кратко о задаче..." 
              rows={3}
            ></textarea>
          </div>
          <button
            type="button"
            className="w-full rounded-2xl bg-primary py-5 font-bold uppercase tracking-widest text-on-primary transition-all active:scale-[0.98]"
          >
            Отправить запрос
          </button>
        </form>
      </div>
    </div>
  </section>
);

const mobileNavItemClass =
  "flex min-w-[4.5rem] flex-col items-center justify-center gap-0.5 py-2 text-on-surface-variant transition-transform active:scale-95";

const MobileNav = () => (
  <footer className="fixed bottom-0 left-0 z-50 flex h-16 w-full items-center justify-around border-t border-outline-variant/20 bg-surface-container-lowest/95 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl md:hidden dark:shadow-[0_-10px_40px_rgba(0,0,0,0.35)]">
    <a href="#services" className={`${mobileNavItemClass} text-primary`}>
      <LayoutGrid className="w-5 h-5" />
      <span className="font-body text-[10px] uppercase tracking-widest font-bold">Услуги</span>
    </a>
    <a href="#cases" className={mobileNavItemClass}>
      <LayoutGrid className="w-5 h-5" />
      <span className="font-body text-[10px] uppercase tracking-widest font-bold">Кейсы</span>
    </a>
    <a href="#partners" className={mobileNavItemClass}>
      <Handshake className="w-5 h-5" />
      <span className="font-body text-[10px] uppercase tracking-widest font-bold">Партнеры</span>
    </a>
    <a href="#info" className={mobileNavItemClass}>
      <Info className="w-5 h-5" />
      <span className="font-body text-[10px] uppercase tracking-widest font-bold">Инфо</span>
    </a>
    <a href="/academy" className={mobileNavItemClass}>
      <LayoutGrid className="w-5 h-5" />
      <span className="font-body text-[10px] uppercase tracking-widest font-bold">Академия</span>
    </a>
  </footer>
);

const QuickContactCTA = () => (
  <div className="fixed bottom-20 right-4 z-50 md:bottom-6 md:right-6">
    <div className="rounded-2xl border border-primary/20 bg-surface-container-lowest/95 p-3 shadow-2xl backdrop-blur">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
        Быстрый контакт
      </p>
      <div className="flex items-center gap-2">
        <a
          href="tel:+79269901666"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-xs font-bold uppercase tracking-wider text-on-primary transition hover:opacity-90"
        >
          <PhoneCall className="h-4 w-4" />
          Позвонить
        </a>
        <a
          href="https://t.me/sizovmaksim"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-outline-variant/30 bg-surface-container-low px-3 py-2 text-xs font-bold uppercase tracking-wider text-on-surface transition hover:bg-surface-container"
        >
          <Mail className="h-4 w-4" />
          Telegram
        </a>
      </div>
    </div>
  </div>
);

const PromoPopup = () => {
  const bubbleSize = 64;
  const [isVisible, setIsVisible] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const velocityRef = useRef({ vx: 1.8, vy: 1.4 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setViewport({ w: window.innerWidth, h: window.innerHeight });
    const initialX = Math.max(16, window.innerWidth - bubbleSize - 20);
    const initialY = Math.max(120, window.innerHeight - bubbleSize - 130);
    setPosition({ x: initialX, y: initialY });

    const timer = window.setTimeout(() => setIsVisible(true), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight });
      setPosition((prev: { x: number; y: number }) => ({
        x: Math.min(Math.max(16, prev.x), Math.max(16, window.innerWidth - bubbleSize - 16)),
        y: Math.min(Math.max(90, prev.y), Math.max(90, window.innerHeight - bubbleSize - 16)),
      }));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!isVisible || viewport.w === 0 || isCardOpen) {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    const tick = () => {
      setPosition((prev: { x: number; y: number }) => {
        const minX = 10;
        const minY = 90;
        const maxX = Math.max(minX, viewport.w - bubbleSize - 10);
        const maxY = Math.max(minY, viewport.h - bubbleSize - 14);

        let { vx, vy } = velocityRef.current;
        vx += (Math.random() - 0.5) * 0.15;
        vy += (Math.random() - 0.5) * 0.15;
        vx = Math.max(-2.8, Math.min(2.8, vx));
        vy = Math.max(-2.8, Math.min(2.8, vy));
        if (Math.abs(vx) < 0.6) vx = vx >= 0 ? 0.6 : -0.6;
        if (Math.abs(vy) < 0.6) vy = vy >= 0 ? 0.6 : -0.6;

        let nextX = prev.x + vx;
        let nextY = prev.y + vy;

        if (nextX <= minX || nextX >= maxX) {
          vx = -vx;
          nextX = Math.min(Math.max(minX, nextX), maxX);
        }
        if (nextY <= minY || nextY >= maxY) {
          vy = -vy;
          nextY = Math.min(Math.max(minY, nextY), maxY);
        }

        velocityRef.current = { vx, vy };
        return { x: nextX, y: nextY };
      });

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [isCardOpen, isVisible, viewport.h, viewport.w]);

  if (!isVisible) return null;

  const cardLeft =
    viewport.w > 0 ? Math.max(8, Math.min(position.x - 260, viewport.w - 360)) : 8;
  const cardTop = Math.max(84, position.y - 110);

  return (
    <>
      <motion.div
        aria-hidden={!isCardOpen}
        className={`fixed inset-0 z-[78] ${isCardOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        initial={false}
        animate={{
          opacity: isCardOpen ? 1 : 0,
        }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          aria-label="Закрыть предложение"
          className="absolute inset-0 bg-black/45 backdrop-blur-md"
          onClick={() => setIsCardOpen(false)}
        />
      </motion.div>

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-hidden={!isCardOpen}
        className={`fixed z-[79] w-[min(22rem,calc(100vw-1.5rem))] rounded-2xl border border-primary/25 bg-surface-container-lowest p-4 shadow-2xl ring-1 ring-primary/10 ${isCardOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        style={{ left: cardLeft, top: cardTop }}
        initial={false}
        animate={{
          opacity: isCardOpen ? 1 : 0,
          scale: isCardOpen ? 1 : 0.82,
          y: isCardOpen ? 0 : 18,
          rotate: isCardOpen ? 0 : -4,
          filter: isCardOpen ? "blur(0px)" : "blur(6px)",
        }}
        transition={{
          type: "spring",
          stiffness: 420,
          damping: 28,
          mass: 0.85,
          opacity: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
          filter: { duration: 0.22 },
        }}
      >
        <p className="text-[11px] font-bold uppercase tracking-widest text-primary">Openclaw бесплатно</p>
        <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
          При заказе любой услуги настройка Openclaw в подарок. Подключим, протестируем и передадим готовый рабочий
          контур вашей команде.
        </p>
        <div className="mt-3 flex gap-2">
          <a className="btn-primary" href="#contact" onClick={() => setIsCardOpen(false)}>
            Получить оффер
          </a>
          <button type="button" className="btn-secondary" onClick={() => setIsCardOpen(false)}>
            Скрыть
          </button>
        </div>
      </motion.div>

      <button
        type="button"
        aria-label="Openclaw бесплатно"
        className="fixed z-[80] flex h-16 w-16 items-center justify-center rounded-full bg-primary text-on-primary shadow-[0_18px_40px_rgba(0,0,0,0.25)] transition hover:opacity-95"
        style={{ left: position.x, top: position.y }}
        onClick={() => setIsCardOpen((prev: boolean) => !prev)}
      >
        <div className="relative">
          <Image
            src="/openclaw-icon.png"
            alt="Openclaw"
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />
          <span className="absolute -right-5 -top-5 rounded-full bg-black/70 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white">
            free
          </span>
        </div>
      </button>
    </>
  );
};

const Footer = () => (
  <footer
    id="info"
    className="scroll-mt-28 bg-background py-10 md:py-12 border-t border-outline-variant/10 pb-24 md:pb-12"
  >
    <div className="max-w-7xl mx-auto px-6 flex flex-col gap-8 md:flex-row md:justify-between md:items-start">
      <div className="flex items-center gap-3 shrink-0">
        <Cloud className="text-primary w-6 h-6" />
        <span className="text-xl font-extrabold tracking-tighter text-on-surface font-headline">KINETIC AI</span>
      </div>
      <div className="text-xs text-on-surface-variant font-body leading-relaxed max-w-xl space-y-2">
        <p className="font-semibold text-on-surface">Сведения об индивидуальном предпринимателе</p>
        <p>
          <span className="text-on-surface font-medium">ИП Стасиньски Павел Кшиштоф</span>
          {" · "}
          ИНН&nbsp;772356334324, ОГРНИП&nbsp;325774600389226
        </p>
        <p className="text-[11px] uppercase tracking-widest text-on-surface-variant/90">
          © {new Date().getFullYear()} Kinetic AI.{" "}
          {SHOW_VK_CLOUD_MENTIONS
            ? "Официальный партнёр Yandex Cloud и VK Cloud."
            : "Официальный партнёр Yandex Cloud."}
        </p>
      </div>
    </div>
  </footer>
);

function scrollToTopHard() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export default function App() {
  useLayoutEffect(() => {
    if (typeof window === "undefined" || window.location.hash) return;
    scrollToTopHard();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || window.location.hash) return;
    scrollToTopHard();
    const t = window.setTimeout(scrollToTopHard, 0);
    let raf2 = 0;
    const raf1 = window.requestAnimationFrame(() => {
      scrollToTopHard();
      raf2 = window.requestAnimationFrame(scrollToTopHard);
    });
    return () => {
      window.clearTimeout(t);
      window.cancelAnimationFrame(raf1);
      if (raf2) window.cancelAnimationFrame(raf2);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-[max(5.5rem,calc(4rem+env(safe-area-inset-bottom,0px)+1rem))] md:pb-0">
        <Hero />
        <Services />
        <Process />
        <Pricing />
        <Cases />
        <Partners />
        <Contact />
      </main>
      <Footer />
      <QuickContactCTA />
      <PromoPopup />
      <MobileNav />
    </div>
  );
}
