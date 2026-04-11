"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
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

const navLinkClass =
  "text-on-surface font-medium font-headline tracking-tight hover:text-primary transition-colors duration-300 border-b-2 border-transparent hover:border-primary/40 pb-1";

const menuItems = [
  { href: "#partners", label: "Пишут о нас" },
  { href: "#contact", label: "Контакт" },
  { href: "#services", label: "Наши услуги" },
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
        className="z-10"
      >
        <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block font-body">Official Yandex Partner</span>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-on-surface mb-6 leading-[1.1]">
          Масштабируйте <br/><span className="text-gradient">Интеллект.</span>
        </h1>
        <p className="text-lg text-tertiary-container max-w-lg mb-10 leading-relaxed font-body">
          Мы предоставляем доступ к передовой AI-инфраструктуре и облачным вычислениям. Автоматизируйте бизнес с официальной поддержкой Yandex Cloud, Selectel и SberCloud. Предлагаем LM Studio и приватные LLM на сертифицированных GPU — поможем с подбором конфигурации и внедрением под ваши задачи и бюджет.
        </p>
        <div className="flex flex-wrap gap-4">
          <a className="btn-primary" href="#contact">
            Начать внедрение
          </a>
          <a className="btn-secondary" href="mailto:hello@kinetic-ai.ru?subject=%D0%9A%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8F%20Kinetic%20AI">
            Консультация
          </a>
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl shadow-2xl">
          <Image
            alt="ИИ-инфраструктура и потоки данных"
            src="/hero-ai.jpg"
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

const Services = () => (
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
            <h3 className="mb-4 text-2xl font-bold text-primary">Корпоративный ИИ и Chatbots</h3>
            <p className="text-on-surface-variant leading-relaxed max-w-md">
              Внедрение LLM-моделей в ваши бизнес-процессы. От автоматизации клиентской поддержки до глубокой аналитики данных с использованием YandexGPT.
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
            <p className="text-white/80 leading-relaxed">
              Миграция и поддержка критически важных систем в облаках Selectel и Sber.
            </p>
          </div>
          <div className="mt-12">
            <button
              type="button"
              className="rounded-xl border border-on-primary/40 bg-on-primary/10 px-4 py-2 text-sm font-bold uppercase tracking-widest text-on-primary transition hover:bg-on-primary/20"
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
  </section>
);

const Partners = () => (
  <section id="partners" className="scroll-mt-28 py-24 px-6 overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight">Наши ключевые партнеры</h2>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-16 opacity-70">
        <div className="flex items-center gap-4 group">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF0000] text-lg font-black italic text-white">
            Y
          </div>
          <span className="font-bold text-2xl tracking-tighter group-hover:text-primary transition-colors">Yandex Cloud</span>
        </div>
        <div className="flex items-center gap-4 group">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-xl font-bold uppercase text-white dark:bg-zinc-200 dark:text-zinc-900">
            S
          </div>
          <span className="font-bold text-2xl tracking-tighter group-hover:text-primary transition-colors">Selectel</span>
        </div>
        <div className="flex items-center gap-4 group">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600 text-sm font-bold text-white">
            Сбер
          </div>
          <span className="font-bold text-2xl tracking-tighter group-hover:text-primary transition-colors">SberCloud</span>
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
            <PhoneCall className="text-secondary-container w-5 h-5" />
            <span className="text-white">+7 (495) 000-00-00</span>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="text-secondary-container w-5 h-5" />
            <span className="text-white">hello@kinetic-ai.ru</span>
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
          © {new Date().getFullYear()} Kinetic AI. Официальный партнёр Yandex Cloud.
        </p>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24">
        <Hero />
        <Services />
        <Partners />
        <Contact />
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
