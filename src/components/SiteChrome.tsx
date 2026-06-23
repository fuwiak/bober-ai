import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AVITO_URL, CONTACT_PHONE, FIVERR_URL, FL_RU_URL, FREELANCE_URL, KWORK_URL, SITE_NAME, TELEGRAM_URL, YANDEX_USLUGI_URL } from "@/lib/site";
import { LEGAL_ROUTES } from "@/lib/legal";

const navItems = [
  { href: "/#services", label: "Услуги" },
  { href: "/#portfolio", label: "Портфолио" },
  { href: "/#partners", label: "Партнёрам" },
  { href: "/#about", label: "Обо мне" },
  { href: "/#reviews", label: "Отзывы" },
  { href: "/#contact", label: "Контакт" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-hairline bg-canvas/95 backdrop-blur-sm">
      <div className="container-editorial flex h-full items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-medium text-ink">
          <BrandMark className="h-4 w-4 text-ink" />
          <span className="text-sm font-medium tracking-tight">{SITE_NAME}</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted active:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${CONTACT_PHONE}`}
            className="hidden text-sm text-muted sm:inline"
          >
            {CONTACT_PHONE.replace("+7", "+7 ")}
          </a>
          <ThemeToggle />
          <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn-primary">
            Написать
          </a>
        </div>
      </div>
      <nav className="flex gap-4 overflow-x-auto border-t border-hairline-soft px-4 py-2 text-sm md:hidden">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap text-muted">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer-dark">
      <div className="container-editorial">
        <div className="mb-8 flex items-center gap-2 text-on-dark">
          <BrandMark className="h-4 w-4" />
          <span className="font-display text-lg tracking-tight">{SITE_NAME}</span>
        </div>
        <p className="text-sm">
          <span className="text-on-dark">ИП Стасиньски Павел Кшиштоф</span>
          {" · "}ИНН 772356334324 · ОГРНИП 325774600389226
        </p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href={LEGAL_ROUTES.privacyPolicy} className="text-on-dark-soft active:text-on-dark">
            Политика обработки ПДн
          </Link>
          <Link href={LEGAL_ROUTES.consent} className="text-on-dark-soft active:text-on-dark">
            Согласие на обработку ПДн
          </Link>
          <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="text-on-dark-soft active:text-on-dark">
            Telegram
          </a>
          <a href={FREELANCE_URL} target="_blank" rel="noreferrer" className="text-on-dark-soft active:text-on-dark">
            Freelance.ru
          </a>
          <a href={FL_RU_URL} target="_blank" rel="noreferrer" className="text-on-dark-soft active:text-on-dark">
            FL.ru
          </a>
          <a href={AVITO_URL} target="_blank" rel="noreferrer" className="text-on-dark-soft active:text-on-dark">
            Авито
          </a>
          <a href={KWORK_URL} target="_blank" rel="noreferrer" className="text-on-dark-soft active:text-on-dark">
            Kwork
          </a>
          <a href={FIVERR_URL} target="_blank" rel="noreferrer" className="text-on-dark-soft active:text-on-dark">
            Fiverr
          </a>
          <a href={YANDEX_USLUGI_URL} target="_blank" rel="noreferrer" className="text-on-dark-soft active:text-on-dark">
            Яндекс Услуги
          </a>
          <a href={`tel:${CONTACT_PHONE}`} className="text-on-dark-soft active:text-on-dark">
            {CONTACT_PHONE}
          </a>
        </div>
        <p className="mt-8 text-xs text-muted-soft">© {new Date().getFullYear()} {SITE_NAME}</p>
      </div>
    </footer>
  );
}
