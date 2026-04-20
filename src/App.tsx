"use client";

import { AnimatePresence, motion } from "motion/react";
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

const PlayGlyph = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

const ExternalLinkGlyph = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);
import { ThemeToggle } from "@/components/ThemeToggle";
import { SHOW_VK_CLOUD_MENTIONS } from "@/config/featureFlags";

const navLinkClass =
  "text-on-surface font-medium font-headline tracking-tight hover:text-primary transition-colors duration-300 border-b-2 border-transparent hover:border-primary/40 pb-1";

const menuItems = [
  { href: "#cases", label: "Кейсы" },
  { href: "#partners", label: "Пишут о нас" },
  { href: "#career", label: "Карьера" },
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
  ? "Official Yandex Cloud & Selectel Partner"
  : "Official Yandex Cloud & Selectel Partner";

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
          <a className={navLinkClass} href="#career">
            Карьера
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
        <div className="mb-8 flex w-full max-w-2xl flex-wrap items-center gap-4 rounded-2xl border border-primary/25 bg-surface-container-low px-5 py-4 shadow-md">
          <div className="relative h-20 w-[260px] shrink-0 overflow-hidden rounded-lg bg-white p-0.5 ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10">
            <Image
              alt="Yandex Cloud — бизнес-партнер"
              src="/yandex/yandex-cloud-business-partner-ru-light.svg"
              fill
              sizes="260px"
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="h-10 w-px shrink-0 bg-outline-variant/30" />
          <div className="relative h-16 w-[180px] shrink-0 overflow-hidden rounded-lg bg-white px-3 py-2 ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10">
            <Image
              alt="Selectel"
              src="/partners/selectel.png"
              fill
              sizes="180px"
              className="object-contain object-center"
              priority
            />
          </div>
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
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-surface-container-low shadow-2xl">
          <div className="relative flex h-full min-h-0 items-center justify-center p-6 sm:p-8 md:p-10">
            <div className="relative h-full w-full">
              <Image
                alt="Mac mini для AI решений"
                src="/yandex/mac-mini.png"
                fill
                sizes="(max-width: 768px) 92vw, 620px"
                className="object-contain object-center"
                priority
              />
            </div>

            <motion.div
              className="absolute left-4 top-7 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/90 px-4 py-3 shadow-lg backdrop-blur"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="block text-xs font-semibold uppercase tracking-widest text-primary">Локальный AI</span>
              <span className="block text-sm font-bold text-on-surface">AI-ассистент на Mac mini</span>
            </motion.div>

            <motion.div
              className="absolute right-4 top-1/2 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/90 px-4 py-3 shadow-lg backdrop-blur"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <span className="block text-xs font-semibold uppercase tracking-widest text-primary">OpenClaw</span>
              <span className="block text-sm font-bold text-on-surface">OpenClaw на Mac mini</span>
            </motion.div>

            <motion.div
              className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/90 px-4 py-3 shadow-lg backdrop-blur"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <span className="block text-xs font-semibold uppercase tracking-widest text-primary">Claude</span>
              <span className="block text-sm font-bold text-on-surface">Интеграция и автоматизация Claude на Mac</span>
            </motion.div>
          </div>
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

      <div className="relative mt-12 overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/10 via-surface-container-lowest to-surface-container-low p-8 shadow-xl lg:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 -bottom-24 h-72 w-72 rounded-full bg-secondary-container/30 blur-3xl"
        />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/25">
              <Handshake className="h-7 w-7" />
            </div>
            <div>
              <span className="inline-flex rounded-full bg-primary/12 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
                Индивидуальные условия
              </span>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-on-surface lg:text-3xl">
                Цены не подходят или не нашли нужный формат?
              </h3>
              <p className="mt-3 max-w-xl text-on-surface-variant leading-relaxed">
                Свяжитесь сейчас с нашим консультантом — он подберёт индивидуальные условия сотрудничества под ваши
                процессы, объёмы и бюджет. Ответим в течение 30 минут.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 lg:shrink-0">
            <a
              href="https://t.me/sizovmaksim"
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Написать консультанту
            </a>
            <a
              href="tel:+79269901666"
              className="btn-secondary inline-flex items-center gap-2"
            >
              <PhoneCall className="h-4 w-4" />
              Позвонить
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

type Currency = "rub" | "kzt" | "usd";

type ModelPrice = {
  name: string;
  badge?: string;
  input: Record<Currency, number>;
  output: Record<Currency, number>;
};

const modelPrices: ModelPrice[] = [
  {
    name: "Alice AI LLM",
    badge: "Alice",
    input: { rub: 0.5, kzt: 2.546838525, usd: 0.00409836 },
    output: { rub: 1.2, kzt: 6.11241246, usd: 0.009836064 },
  },
  {
    name: "YandexGPT Pro 5.1",
    badge: "Yandex",
    input: { rub: 0.8, kzt: 4.07494164, usd: 0.006557376 },
    output: { rub: 0.8, kzt: 4.07494164, usd: 0.006557376 },
  },
  {
    name: "YandexGPT Pro 5",
    badge: "Yandex",
    input: { rub: 1.2, kzt: 6.11241246, usd: 0.009836064 },
    output: { rub: 1.2, kzt: 6.11241246, usd: 0.009836064 },
  },
  {
    name: "YandexGPT Lite",
    badge: "Yandex",
    input: { rub: 0.2, kzt: 1.01873541, usd: 0.001639344 },
    output: { rub: 0.2, kzt: 1.01873541, usd: 0.001639344 },
  },
  {
    name: "DeepSeek V3.2",
    badge: "DeepSeek",
    input: { rub: 0.5, kzt: 2.546838525, usd: 0.00409836 },
    output: { rub: 0.8, kzt: 4.07494164, usd: 0.006557376 },
  },
  {
    name: "Qwen3 235B",
    badge: "Qwen",
    input: { rub: 0.5, kzt: 2.546838525, usd: 0.00409836 },
    output: { rub: 0.5, kzt: 2.546838525, usd: 0.00409836 },
  },
  {
    name: "gpt-oss-120b",
    badge: "OSS",
    input: { rub: 0.3, kzt: 1.528103115, usd: 0.002459016 },
    output: { rub: 0.3, kzt: 1.528103115, usd: 0.002459016 },
  },
  {
    name: "gpt-oss-20b",
    badge: "OSS",
    input: { rub: 0.1, kzt: 0.509367705, usd: 0.000819672 },
    output: { rub: 0.1, kzt: 0.509367705, usd: 0.000819672 },
  },
  {
    name: "Qwen3.5 35B",
    badge: "Qwen",
    input: { rub: 0.2, kzt: 1.0188, usd: 0.0016393443 },
    output: { rub: 0.3, kzt: 1.5282, usd: 0.0024590164 },
  },
  {
    name: "Gemma3 27B",
    badge: "Google",
    input: { rub: 0.4, kzt: 2.03747082, usd: 0.003278688 },
    output: { rub: 0.4, kzt: 2.03747082, usd: 0.003278688 },
  },
  {
    name: "speech-realtime-250923",
    badge: "Speech",
    input: { rub: 0.8, kzt: 4.07494164, usd: 0.006557376 },
    output: { rub: 0.8, kzt: 4.07494164, usd: 0.006557376 },
  },
];

const currencyMeta: Record<Currency, { label: string; symbol: string; note: string; locale: string; fraction: number }> = {
  rub: { label: "Рубли", symbol: "₽", note: "с НДС", locale: "ru-RU", fraction: 2 },
  kzt: { label: "Тенге", symbol: "₸", note: "с НДС", locale: "ru-RU", fraction: 2 },
  usd: { label: "Доллары", symbol: "$", note: "без НДС", locale: "en-US", fraction: 2 },
};

const formatPricePer1M = (value: number, currency: Currency) => {
  const { locale, fraction } = currencyMeta[currency];
  const scaled = value * 1000;
  const digits = scaled >= 100 ? 0 : scaled >= 10 ? 1 : fraction;
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  }).format(scaled);
};

const vatRateByCurrency: Record<Currency, number> = {
  rub: 0.2,
  kzt: 0.12,
  usd: 0,
};

const applyVatMode = (value: number, currency: Currency, includeVat: boolean) => {
  const rate = vatRateByCurrency[currency];
  if (rate <= 0) return value;
  return includeVat ? value : value / (1 + rate);
};

type CbrValute = { Nominal: number; Value: number; Previous: number };

type CbrResponse = { Valute: Record<string, CbrValute> };

const CurrencyTicker = () => {
  const [rates, setRates] = useState<CbrResponse["Valute"] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("https://www.cbr-xml-daily.ru/daily_json.js", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error("rates");
        return r.json() as Promise<CbrResponse>;
      })
      .then((data) => {
        if (!cancelled) setRates(data.Valute);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const items: { code: keyof CbrResponse["Valute"]; symbol: string; label: string }[] = [
    { code: "USD", symbol: "$", label: "USD/RUB" },
    { code: "EUR", symbol: "€", label: "EUR/RUB" },
    { code: "KZT", symbol: "₸", label: "KZT/RUB" },
    { code: "CNY", symbol: "¥", label: "CNY/RUB" },
  ];

  const marqueeItems = [...items, ...items];

  return (
    <div className="flex w-full min-w-0 flex-col gap-2 md:max-w-[34rem]">
      <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
        Курс ЦБ РФ
      </span>
      <div className="relative overflow-hidden rounded-2xl border border-outline-variant/15 bg-surface-container-low/60 px-2 py-1.5">
        <motion.div
          className="flex w-max items-center gap-1.5"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          {marqueeItems.map((it, idx) => {
          const rate = rates?.[it.code];
          const perUnit = rate ? rate.Value / rate.Nominal : null;
          const diff = rate ? rate.Value - rate.Previous : 0;
          const isUp = diff > 0;
          const isDown = diff < 0;
          return (
            <a
              key={`${it.code}-${idx}`}
              href="https://www.cbr.ru/currency_base/daily/"
              target="_blank"
              rel="noreferrer"
              title={`${it.label} — по ЦБ РФ`}
              aria-label={`Курс ${it.label}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-outline-variant/25 bg-surface-container-lowest px-3 py-1.5 text-xs font-semibold text-on-surface transition hover:border-primary/40 hover:text-primary"
            >
              <span className="text-on-surface-variant">{it.symbol}</span>
              {perUnit ? (
                <>
                  <span className="tabular-nums">
                    {new Intl.NumberFormat("ru-RU", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: it.code === "KZT" ? 4 : 2,
                    }).format(perUnit)}
                  </span>
                  <span className="text-[10px] text-on-surface-variant">₽</span>
                  {isUp || isDown ? (
                    <span
                      className={`text-[10px] font-bold ${isUp ? "text-emerald-500" : "text-red-500"}`}
                      aria-hidden="true"
                    >
                      {isUp ? "▲" : "▼"}
                    </span>
                  ) : null}
                </>
              ) : error ? (
                <span className="text-on-surface-variant">—</span>
              ) : (
                <span className="animate-pulse text-on-surface-variant">…</span>
              )}
            </a>
          );
          })}
        </motion.div>
      </div>
    </div>
  );
};

const ModelPricing = () => {
  const [currency, setCurrency] = useState<Currency>("rub");
  const [includeVat, setIncludeVat] = useState(true);

  const tabs: { id: Currency; label: string }[] = [
    { id: "rub", label: "Цены в рублях" },
    { id: "kzt", label: "Цены в тенге" },
    { id: "usd", label: "Цены в долларах" },
  ];

  const meta = currencyMeta[currency];
  const vatNote = currency === "usd" ? "без НДС" : includeVat ? "с НДС" : "без НДС";
  const vatHint =
    currency === "rub"
      ? "ставка 20% (РФ)"
      : currency === "kzt"
        ? "ставка 12% (Казахстан)"
        : "НДС не применяется";
  const marqueeModels = [...modelPrices, ...modelPrices];

  return (
    <section id="model-pricing" className="scroll-mt-28 py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-primary font-bold uppercase tracking-widest text-xs font-body">
                Тарифы AI-моделей
              </span>
              <h2 className="mt-2 text-4xl font-bold tracking-tight text-on-surface">
                Стоимость за 1M токенов
              </h2>
              <p className="mt-4 max-w-2xl text-on-surface-variant leading-relaxed">
                Актуальные цены моделей Yandex Foundation Models и OSS-стека в калейдоскопе.
                Переключайте валюту, листайте карточки — суммы рассчитаны на миллион токенов (input / output).
              </p>
            </div>
            <CurrencyTicker />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div
              role="tablist"
              aria-label="Валюта"
              className="inline-flex self-start rounded-2xl border border-outline-variant/25 bg-surface-container-low p-1"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  aria-selected={currency === tab.id}
                  onClick={() => setCurrency(tab.id)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all md:text-sm ${
                    currency === tab.id
                      ? "bg-primary text-on-primary shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-outline-variant/25 bg-surface-container-low px-3 py-2 text-xs font-bold uppercase tracking-widest text-on-surface">
              <input
                type="checkbox"
                checked={includeVat}
                onChange={(e) => setIncludeVat(e.currentTarget.checked)}
                disabled={currency === "usd"}
                className="h-4 w-4 accent-primary"
              />
              НДС
              <span className="text-[10px] font-semibold text-on-surface-variant">{vatHint}</span>
            </label>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex w-max items-stretch gap-5"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 80, ease: "linear", repeat: Infinity }}
          >
            {marqueeModels.map((model, idx) => {
              const inputVal = applyVatMode(model.input[currency], currency, includeVat);
              const outputVal = applyVatMode(model.output[currency], currency, includeVat);
              return (
                <div
                  key={`${model.name}-${idx}`}
                  className="relative w-[280px] shrink-0 overflow-hidden rounded-3xl border border-outline-variant/20 bg-surface-container-low p-6 transition hover:border-primary/40 hover:bg-surface-container"
                >
                  {model.badge ? (
                    <span className="inline-flex rounded-full bg-primary/12 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                      {model.badge}
                    </span>
                  ) : null}
                  <h3 className="mt-3 break-words text-lg font-bold text-on-surface">
                    {model.name}
                  </h3>
                  <p className="mt-1 text-[11px] uppercase tracking-widest text-on-surface-variant">
                    за 1M токенов · {vatNote}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-surface-container-lowest p-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                        Input
                      </p>
                      <p className="mt-1 text-xl font-bold tabular-nums text-on-surface">
                        {formatPricePer1M(inputVal, currency)}
                        <span className="ml-1 text-sm font-semibold text-on-surface-variant">
                          {meta.symbol}
                        </span>
                      </p>
                    </div>
                    <div className="rounded-2xl bg-primary/8 p-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                        Output
                      </p>
                      <p className="mt-1 text-xl font-bold tabular-nums text-on-surface">
                        {formatPricePer1M(outputVal, currency)}
                        <span className="ml-1 text-sm font-semibold text-on-surface-variant">
                          {meta.symbol}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        <p className="mt-6 text-xs text-on-surface-variant">
          * Курсы валют — справочные, по данным ЦБ РФ. Итоговая сумма в счёте рассчитывается по курсу провайдера платформы на дату использования.
        </p>
      </div>
    </section>
  );
};

type CaseItem = {
  title: string;
  tag: string;
  description: string;
  image?: string;
  url: string;
};

const casePlaceholders: CaseItem[] = [
  {
    title: "Личный юрист на локальном GPU",
    tag: "Legal AI в защищенном контуре",
    description: "AI-юрист в приватном контуре: анализ документов, быстрые правовые саммари и помощь команде без вывода данных за пределы локальной инфраструктуры.",
    image: "/yandex/ai-lawyer.png",
    url: "#",
  },
  {
    title: "AI-консультант Kaspersky",
    tag: "RAG-приложение для Kaspersky",
    description:
      "RAG-приложение помогает консультантам Kaspersky подбирать актуальные продукты для клиентов: объединяет локальные источники знаний и внешние API в едином рабочем контуре.",
    image: "/yandex/kaspersky 2.png",
    url: "#",
  },
];

const Cases = () => {
  const [activeCase, setActiveCase] = useState<CaseItem | null>(null);
  const [isImageZoomOpen, setImageZoomOpen] = useState(false);
  const casesViewportRef = useRef<HTMLDivElement | null>(null);
  const casesTrackRef = useRef<HTMLDivElement | null>(null);
  const [casesDragLimit, setCasesDragLimit] = useState(0);

  useLayoutEffect(() => {
    const updateCasesDragLimit = () => {
      const viewportWidth = casesViewportRef.current?.clientWidth ?? 0;
      const trackWidth = casesTrackRef.current?.scrollWidth ?? 0;
      setCasesDragLimit(Math.max(0, trackWidth - viewportWidth));
    };

    updateCasesDragLimit();
    window.addEventListener("resize", updateCasesDragLimit);
    return () => window.removeEventListener("resize", updateCasesDragLimit);
  }, []);

  return (
    <section id="cases" className="scroll-mt-28 py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-on-surface">Кейсы</h2>
            <p className="mt-4 max-w-2xl text-on-surface-variant leading-relaxed">
              Примеры внедрения AI-решений под разные отрасли и бюджеты. Нажмите на любой кейс - откроется карточка с
              кратким описанием.
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

        <div ref={casesViewportRef} className="overflow-hidden">
          <motion.div
            ref={casesTrackRef}
            drag="x"
            dragConstraints={{ left: -casesDragLimit, right: 0 }}
            dragElastic={0.04}
            className="flex cursor-grab gap-6 active:cursor-grabbing"
          >
            {casePlaceholders.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActiveCase(item)}
                className="group w-[320px] shrink-0 rounded-3xl border border-outline-variant/20 bg-surface-container-low p-6 text-left transition hover:border-primary/40 hover:bg-surface-container"
              >
                {item.image ? (
                  <div className="relative mb-5 h-40 overflow-hidden rounded-2xl bg-surface-container-high">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-contain object-center"
                    />
                  </div>
                ) : (
                  <div className="mb-5 h-40 rounded-2xl bg-gradient-to-br from-surface-container-high to-primary/10" />
                )}
                <p className="inline-flex rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold text-primary">{item.tag}</p>
                <h3 className="mt-4 text-xl font-bold text-on-surface">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{item.description}</p>
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {activeCase ? (
          <>
            <motion.button
              type="button"
              aria-label="Закрыть кейс"
              className="fixed inset-0 z-[85] bg-black/50 backdrop-blur-sm"
              onClick={() => setActiveCase(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              className="fixed left-1/2 top-1/2 z-[86] w-[min(42rem,calc(100vw-1.5rem))] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-outline-variant/25 bg-surface-container-lowest p-6 shadow-2xl md:p-8"
              initial={{ opacity: 0, scale: 0.78, y: 22 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.82, y: 16 }}
              transition={{ type: "spring", stiffness: 360, damping: 28 }}
            >
              {activeCase.image ? (
                <button
                  type="button"
                  onClick={() => setImageZoomOpen(true)}
                  className="group relative mb-5 block h-48 w-full overflow-hidden rounded-2xl bg-surface-container-high"
                >
                  <Image
                    src={activeCase.image}
                    alt={activeCase.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 640px"
                    className="object-contain object-center transition duration-300 group-hover:scale-[1.03]"
                  />
                  <span className="absolute bottom-2 right-2 rounded-lg bg-black/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                    Увеличить
                  </span>
                </button>
              ) : null}
              <p className="inline-flex rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold text-primary">{activeCase.tag}</p>
              <h3 className="mt-4 text-2xl font-bold text-on-surface">{activeCase.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-on-surface-variant md:text-base">{activeCase.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {activeCase.url.startsWith("http") ? (
                  <a
                    href={activeCase.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary inline-flex"
                  >
                    Открыть источник
                  </a>
                ) : null}
                <button
                  type="button"
                  onClick={() => {
                    setImageZoomOpen(false);
                    setActiveCase(null);
                  }}
                  className="btn-secondary inline-flex"
                >
                  Закрыть
                </button>
              </div>
            </motion.div>

            <AnimatePresence>
              {isImageZoomOpen && activeCase.image ? (
                <>
                  <motion.button
                    type="button"
                    aria-label="Закрыть увеличенное изображение"
                    className="fixed inset-0 z-[87] bg-black/80 backdrop-blur-sm"
                    onClick={() => setImageZoomOpen(false)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                  <motion.div
                    className="fixed left-1/2 top-1/2 z-[88] h-[min(80vh,56rem)] w-[min(94vw,72rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/15 bg-black/85 shadow-2xl"
                    initial={{ opacity: 0, scale: 0.86 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  >
                    <Image
                      src={activeCase.image}
                      alt={activeCase.title}
                      fill
                      sizes="94vw"
                      className="object-contain object-center"
                    />
                    <button
                      type="button"
                      onClick={() => setImageZoomOpen(false)}
                      className="absolute right-3 top-3 rounded-lg bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white/25"
                    >
                      Закрыть
                    </button>
                  </motion.div>
                </>
              ) : null}
            </AnimatePresence>
          </>
        ) : null}
      </AnimatePresence>
    </section>
  );
};

type PressItem = {
  title: string;
  tag: string;
  description: string;
  url: string;
  image?: string;
};

const pressItems: PressItem[] = [
  {
    title: "Виртуоз и его скрипка",
    tag: "Газета Севергазбанк",
    description: "Почему ИИ не замена программисту, а новый инструмент для усиления команд и процессов.",
    url: "https://gazeta.severgazbank.ru/virtuoz-i-ego-skripka-pochemu-ii-ne-zamena-programmistu-a-novyj-instrument/",
  },
  {
    title: "Староверы и новаторы",
    tag: "МК Подмосковье",
    description: "Материал о том, как нейросети меняют образовательные практики и подходы специалистов.",
    url: "https://www.mk-mosobl.ru/social/2026/03/16/starovery-i-novatory-pedagogi-razdelilis-na-dva-lagerya-izza-vnedreniya-neyrosetey.html",
  }
];

type ShortItem = {
  videoId: string;
  title: string;
  category: string;
  duration: string;
};

const academyShorts: ShortItem[] = [
  {
    videoId: "5DQzO5aPS5A",
    title: "Как работают LLM за 60 секунд",
    category: "AI BASICS",
    duration: "1:02",
  },
  {
    videoId: "kCc8FmEb1nY",
    title: "Промпт-инжиниринг: главные приёмы",
    category: "PROMPTING",
    duration: "1:15",
  },
  {
    videoId: "zjkBMFhNj_g",
    title: "RAG: подача контекста в модель",
    category: "RAG",
    duration: "1:08",
  },
  {
    videoId: "bZQun8Y4L2A",
    title: "Fine-tuning vs RAG: что выбрать",
    category: "ML OPS",
    duration: "1:22",
  },
  {
    videoId: "wjZofJX0v4M",
    title: "AI-ассистенты для продаж",
    category: "BUSINESS",
    duration: "0:58",
  },
  {
    videoId: "g4kYqFEhDqA",
    title: "YandexGPT в корпоративных задачах",
    category: "YANDEX",
    duration: "1:11",
  },
  {
    videoId: "1aA1WGON49E",
    title: "Автоматизация поддержки за 5 минут",
    category: "AUTOMATION",
    duration: "1:19",
  },
  {
    videoId: "uocYQH0cWTs",
    title: "Безопасность LLM: защищённый контур",
    category: "SECURITY",
    duration: "1:26",
  },
];

const MediaHub = () => {
  const [activeTab, setActiveTab] = useState<"shorts" | "press">("shorts");
  const [activeShort, setActiveShort] = useState<ShortItem | null>(null);

  const shortsViewportRef = useRef<HTMLDivElement | null>(null);
  const shortsTrackRef = useRef<HTMLDivElement | null>(null);
  const [shortsDragLimit, setShortsDragLimit] = useState(0);

  const pressViewportRef = useRef<HTMLDivElement | null>(null);
  const pressTrackRef = useRef<HTMLDivElement | null>(null);
  const [pressDragLimit, setPressDragLimit] = useState(0);

  useLayoutEffect(() => {
    const updateLimits = () => {
      const shortsVW = shortsViewportRef.current?.clientWidth ?? 0;
      const shortsTW = shortsTrackRef.current?.scrollWidth ?? 0;
      setShortsDragLimit(Math.max(0, shortsTW - shortsVW));

      const pressVW = pressViewportRef.current?.clientWidth ?? 0;
      const pressTW = pressTrackRef.current?.scrollWidth ?? 0;
      setPressDragLimit(Math.max(0, pressTW - pressVW));
    };

    updateLimits();
    window.addEventListener("resize", updateLimits);
    return () => window.removeEventListener("resize", updateLimits);
  }, [activeTab]);

  const tabs: { id: "shorts" | "press"; label: string }[] = [
    { id: "shorts", label: "Yandex Academy Shorts" },
    { id: "press", label: "Пишут о нас" },
  ];

  return (
    <section id="partners" className="scroll-mt-28 py-24 px-6">
      <div className="mx-auto max-w-7xl">

        {/* ── Партнёры ── */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-center">Наши ключевые партнёры</h2>
          <div className="mt-10 flex flex-wrap justify-center items-center gap-16 opacity-70">
            {partnerItems.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noreferrer"
                aria-label={partner.name}
                className="group flex items-center gap-4"
              >
                <Image
                  alt={partner.name}
                  src={partner.icon}
                  width={partner.width ?? 321}
                  height={partner.height ?? 157}
                  className="h-20 w-auto max-w-[min(400px,94vw)] rounded-2xl bg-white object-contain object-center px-3 py-2 ring-1 ring-black/5 sm:h-24 sm:max-w-[min(480px,95vw)] md:h-28 md:max-w-[min(560px,96vw)] dark:bg-zinc-900 dark:ring-white/10"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-primary font-bold uppercase tracking-widest text-xs font-body">
              Медиа и публикации
            </span>
            <h2 className="mt-2 text-4xl font-bold tracking-tight text-on-surface">
              {activeTab === "shorts" ? "Yandex Academy Shorts" : "Пишут о нас"}
            </h2>
            <p className="mt-4 max-w-2xl text-on-surface-variant leading-relaxed">
              {activeTab === "shorts"
                ? "Короткие видео-разборы про ИИ, внедрение и практику от Академии Yandex. Листайте калейдоскоп, нажмите карточку — откроется Shorts."
                : "Публикации, кейсы и обзоры по внедрению AI-решений в продажах, поддержке и корпоративных процессах."}
            </p>
          </div>
          <div
            role="tablist"
            aria-label="Раздел медиа"
            className="inline-flex self-start rounded-2xl border border-outline-variant/25 bg-surface-container-low p-1 md:self-end"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all md:text-sm ${
                  activeTab === tab.id
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "shorts" ? (
          <div ref={shortsViewportRef} className="overflow-hidden">
            <motion.div
              ref={shortsTrackRef}
              drag="x"
              dragConstraints={{ left: -shortsDragLimit, right: 0 }}
              dragElastic={0.04}
              className="flex cursor-grab gap-5 active:cursor-grabbing"
            >
              {academyShorts.map((item) => (
                <button
                  key={item.videoId}
                  type="button"
                  onClick={() => setActiveShort(item)}
                  className="group relative w-[220px] shrink-0 overflow-hidden rounded-3xl border border-outline-variant/20 bg-surface-container-low text-left transition hover:border-primary/40"
                >
                  <div className="relative aspect-[9/16] w-full overflow-hidden bg-surface-container-high">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://i.ytimg.com/vi/${item.videoId}/hq720.jpg`}
                      alt={item.title}
                      draggable={false}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`;
                      }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <a
                      href={`https://www.youtube.com/shorts/${item.videoId}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-black/75"
                      aria-label="Открыть на YouTube"
                    >
                      <ExternalLinkGlyph className="h-4 w-4" />
                    </a>
                    <span className="absolute right-2 bottom-2 rounded-md bg-black/65 px-2 py-0.5 text-[10px] font-semibold text-white">
                      {item.duration}
                    </span>
                    <span className="pointer-events-none absolute left-1/2 top-1/2 inline-flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary/90 text-on-primary shadow-lg transition group-hover:scale-110">
                      <PlayGlyph className="h-6 w-6 translate-x-[2px]" />
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <span className="inline-flex rounded-full bg-primary/25 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur">
                        {item.category}
                      </span>
                      <h3 className="mt-2 line-clamp-2 text-sm font-bold leading-snug text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </button>
              ))}
            </motion.div>
          </div>
        ) : (
          <div ref={pressViewportRef} className="overflow-hidden">
            <motion.div
              ref={pressTrackRef}
              drag="x"
              dragConstraints={{ left: -pressDragLimit, right: 0 }}
              dragElastic={0.04}
              className="flex cursor-grab gap-6 active:cursor-grabbing"
            >
              {pressItems.map((item) => (
                <a
                  key={item.title}
                  href={item.url}
                  target={item.url.startsWith("http") ? "_blank" : undefined}
                  rel={item.url.startsWith("http") ? "noreferrer" : undefined}
                  className="group w-[320px] shrink-0 rounded-3xl border border-outline-variant/20 bg-surface-container-low p-6 transition hover:border-primary/40 hover:bg-surface-container"
                >
                  {item.image ? (
                    <div className="relative mb-5 h-40 overflow-hidden rounded-2xl bg-surface-container-high">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                        className="object-contain object-center"
                      />
                    </div>
                  ) : (
                    <div className="mb-5 h-40 rounded-2xl bg-gradient-to-br from-surface-container-high to-primary/10" />
                  )}
                  <p className="inline-flex rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold text-primary">{item.tag}</p>
                  <h3 className="mt-4 text-xl font-bold text-on-surface">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{item.description}</p>
                </a>
              ))}
            </motion.div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {activeShort ? (
          <>
            <motion.button
              type="button"
              aria-label="Закрыть видео"
              className="fixed inset-0 z-[85] bg-black/70 backdrop-blur-sm"
              onClick={() => setActiveShort(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              className="fixed left-1/2 top-1/2 z-[86] w-[min(24rem,calc(100vw-1.5rem))] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-outline-variant/25 bg-surface-container-lowest shadow-2xl"
              initial={{ opacity: 0, scale: 0.86, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 12 }}
              transition={{ type: "spring", stiffness: 340, damping: 28 }}
            >
              <div className="relative aspect-[9/16] w-full bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${activeShort.videoId}?autoplay=1&rel=0&modestbranding=1`}
                  title={activeShort.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
              <div className="p-5">
                <span className="inline-flex rounded-full bg-primary/12 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
                  {activeShort.category}
                </span>
                <h3 className="mt-3 text-lg font-bold text-on-surface">{activeShort.title}</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={`https://www.youtube.com/shorts/${activeShort.videoId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary inline-flex"
                  >
                    Открыть в YouTube
                  </a>
                  <button
                    type="button"
                    onClick={() => setActiveShort(null)}
                    className="btn-secondary inline-flex"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </section>
  );
};

const careerPerks = [
  {
    title: "Гибкая комиссия",
    description:
      "Прозрачная модель вознаграждения за подписанные контракты и продление договоров. Чем больше клиентов — тем выше процент.",
  },
  {
    title: "Горячий AI-рынок",
    description:
      "Продаёте востребованные решения: облачные LLM, чат-боты, приватные модели и AI-автоматизацию для реального бизнеса.",
  },
  {
    title: "Поддержка пресейла",
    description:
      "Наши инженеры помогают с архитектурой, демо и расчётом под клиента. Вы фокусируетесь на сделке, не на технической рутине.",
  },
  {
    title: "Готовые материалы",
    description:
      "Презентации, кейсы, прайс-листы и шаблоны КП под разные отрасли. Можно стартовать сразу без долгой упаковки.",
  },
];

const Career = () => (
  <section id="career" className="scroll-mt-28 bg-surface-container-low py-24 px-6">
    <div className="mx-auto max-w-7xl">
      <div className="text-center">
        <span className="text-primary font-bold uppercase tracking-widest text-xs font-body">Карьера</span>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-on-surface">
          Ищем селлеров наших AI-решений
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-on-surface-variant leading-relaxed">
          Если вы умеете продавать сложные B2B-продукты и хотите работать с AI-инфраструктурой, облачными LLM и
          корпоративными чат-ботами — присоединяйтесь к команде Kinetic AI.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {careerPerks.map((perk) => (
          <div
            key={perk.title}
            className="rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-8"
          >
            <h3 className="text-xl font-bold text-on-surface">{perk.title}</h3>
            <p className="mt-3 text-on-surface-variant leading-relaxed">{perk.description}</p>
          </div>
        ))}
      </div>

      <div className="relative mt-10 overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/10 via-surface-container-lowest to-surface-container-low p-8 shadow-xl lg:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/15 blur-3xl"
        />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/25">
              <Handshake className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-on-surface lg:text-3xl">
                Откройте для себя продажи в AI
              </h3>
              <p className="mt-3 max-w-xl text-on-surface-variant leading-relaxed">
                Отправьте короткое сообщение о своём опыте — мы вернёмся с деталями по условиям, территориям и воронке
                готовых лидов.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 lg:shrink-0">
            <a
              href="https://t.me/sizovmaksim"
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Написать в Telegram
            </a>
            <a
              href="mailto:hello@kinetic-ai.ru?subject=Career%20-%20Sales"
              className="btn-secondary inline-flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Отправить резюме
            </a>
          </div>
        </div>
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
        <ModelPricing />
        <Cases />
        <MediaHub />
        <Career />
        <Contact />
      </main>
      <Footer />
      <QuickContactCTA />
      <PromoPopup />
      <MobileNav />
    </div>
  );
}
