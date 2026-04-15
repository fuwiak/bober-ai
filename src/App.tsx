"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";
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
  { href: "#partners", label: "Пишут о нас" },
  { href: "#contact", label: "Контакт" },
  { href: "#services", label: "Наши услуги" },
];

type PartnerItem = { name: string; icon: string; vk?: true };

const partnerItemsAll: PartnerItem[] = [
  { name: "Yandex Cloud", icon: "/partners/yandex-cloud.png" },
  { name: "Selectel", icon: "/partners/selectel.png" },
  { name: "SberCloud", icon: "/partners/sbercloud.png" },
  { name: "VK Cloud", icon: "/partners/vk-cloud.png", vk: true },
  { name: "Ollama", icon: "/partners/ollama.png" },
];

const partnerItems = partnerItemsAll.filter(
  (p) => SHOW_VK_CLOUD_MENTIONS || !p.vk,
);

const heroPartnerBadge = SHOW_VK_CLOUD_MENTIONS
  ? "Official Yandex & VK Cloud Partner"
  : "Official Yandex Cloud Partner";

const heroLeadCopy = SHOW_VK_CLOUD_MENTIONS
  ? "Мы предоставляем доступ к передовой AI-инфраструктуре и облачным вычислениям. Автоматизируйте бизнес с официальной поддержкой Yandex Cloud, Selectel, SberCloud и VK Cloud. Предлагаем Ollama и приватные LLM на сертифицированных GPU — поможем с подбором конфигурации и внедрением под ваши задачи и бюджет."
  : "Мы предоставляем доступ к передовой AI-инфраструктуре и облачным вычислениям. Автоматизируйте бизнес с официальной поддержкой Yandex Cloud, Selectel и SberCloud. Предлагаем Ollama и приватные LLM на сертифицированных GPU — поможем с подбором конфигурации и внедрением под ваши задачи и бюджет.";

const cloudInfraCopy = SHOW_VK_CLOUD_MENTIONS
  ? "Миграция и поддержка критически важных систем в облаках Selectel, SberCloud и VK Cloud."
  : "Миграция и поддержка критически важных систем в облаках Selectel и SberCloud.";

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
            Services
          </a>
          <a className={navLinkClass} href="#partners">
            Partners
          </a>
          <a className={navLinkClass} href="#info">
            Info
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
    className="relative px-6 py-20 md:py-32 max-w-7xl mx-auto overflow-hidden scroll-mt-28"
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
          <Image
            alt="Ollama"
            src="/hero-ollama.png"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center transition-all duration-700"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
        </div>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute -bottom-6 -left-6 max-w-[200px] rounded-2xl border border-outline-variant/15 bg-surface-container-lowest p-6 shadow-xl"
        >
          <span className="text-3xl font-bold text-primary block">99.9%</span>
          <span className="text-xs text-on-surface-variant font-medium">Гарантированный аптайм облачных систем</span>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const Services = () => {
  const [isCloudModalOpen, setCloudModalOpen] = useState(false);

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
            <ArrowRight className="text-primary group-hover:translate-x-2 transition-transform" />
          </div>
        </motion.div>

          <div className="flex flex-col justify-between rounded-3xl bg-primary p-10 text-on-primary">
            <div>
              <Server className="text-secondary-container w-10 h-10 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Cloud Infrastructure</h3>
              <p className="text-white/80 leading-relaxed">{cloudInfraCopy}</p>
            </div>
            <div className="mt-12">
              <button
                type="button"
                className="rounded-xl border border-on-primary/40 bg-on-primary/10 px-4 py-2 text-sm font-bold uppercase tracking-widest text-on-primary transition hover:bg-on-primary/20"
                onClick={() => setCloudModalOpen(true)}
              >
                Подробнее
              </button>
            </div>
          </div>

          <div className="card-premium">
            <Shield className="text-primary w-8 h-8 mb-6" />
            <h3 className="text-xl font-bold mb-2">Безопасность</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Аттестация ИСПДн и соответствие требованиям регуляторов в облаке.
            </p>
          </div>

          <div className="card-premium">
            <BarChart className="text-primary w-8 h-8 mb-6" />
            <h3 className="text-xl font-bold mb-2">Автоматизация</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Оптимизация IT-расходов через интеллектуальный мониторинг ресурсов.
            </p>
          </div>

          <div className="card-premium">
            <GitBranch className="text-primary w-8 h-8 mb-6" />
            <h3 className="text-xl font-bold mb-2">DevOps</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Развертывание Kubernetes кластеров и CI/CD пайплайнов любой сложности.
            </p>
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
              Cloud Infrastructure
            </h4>
            <p className="mt-4 text-on-surface-variant leading-relaxed">
              Проектируем и сопровождаем отказоустойчивую инфраструктуру для критичных сервисов в облаках Selectel и
              SberCloud: от аудита текущего ландшафта до поэтапной миграции без простоев.
            </p>
            <p className="mt-4 text-on-surface-variant leading-relaxed">
              Настраиваем резервирование, мониторинг, централизованное логирование и регламенты восстановления после
              инцидентов. Формируем прозрачную модель эксплуатации, чтобы ИТ-команда контролировала SLA, риски и
              бюджет.
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

const Partners = () => (
  <section id="partners" className="scroll-mt-28 py-24 px-6 overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight">Наши ключевые партнеры</h2>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-16 opacity-70">
        {partnerItems.map((partner) => (
          <div key={partner.name} className="group flex items-center gap-4">
            <Image
              alt={`${partner.name} favicon`}
              src={partner.icon}
              width={48}
              height={48}
              className="h-12 w-12 rounded-2xl bg-white object-contain p-1 ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10"
            />
            <span className="font-bold text-2xl tracking-tighter group-hover:text-primary transition-colors">
              {partner.name}
            </span>
          </div>
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
      <span className="font-body text-[10px] uppercase tracking-widest font-bold">Services</span>
    </a>
    <a href="#partners" className={mobileNavItemClass}>
      <Handshake className="w-5 h-5" />
      <span className="font-body text-[10px] uppercase tracking-widest font-bold">Partners</span>
    </a>
    <a href="#info" className={mobileNavItemClass}>
      <Info className="w-5 h-5" />
      <span className="font-body text-[10px] uppercase tracking-widest font-bold">Info</span>
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
        <Partners />
        <Contact />
      </main>
      <Footer />
      <QuickContactCTA />
      <MobileNav />
    </div>
  );
}
