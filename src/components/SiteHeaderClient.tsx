"use client";

import { useCallback, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ContactCta } from "@/components/ContactCta";
import { Link } from "@/i18n/navigation";
import { CONTACT_PHONE, TELEGRAM_URL } from "@/lib/site";

type NavItem = {
  href: string;
  label: string;
};

type SiteHeaderClientProps = {
  navItems: NavItem[];
  writeLabel: string;
  writeShortLabel: string;
  wordmark: string;
  menuOpenLabel: string;
  menuCloseLabel: string;
  quickContactLabel: string;
  callLabel: string;
  telegramLabel: string;
};

export function SiteHeaderClient({
  navItems,
  writeLabel,
  writeShortLabel,
  wordmark,
  menuOpenLabel,
  menuCloseLabel,
  quickContactLabel,
  callLabel,
  telegramLabel,
}: SiteHeaderClientProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      className={`site-header ${scrolled ? "site-header--scrolled" : ""} ${menuOpen ? "site-header--menu-open" : ""}`}
    >
      <div className="container-editorial flex h-16 items-center justify-between gap-3 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-4">
        <div className="flex items-center gap-3 lg:contents">
          <button
            type="button"
            className="mobile-menu-toggle lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu-panel"
            aria-label={menuOpen ? menuCloseLabel : menuOpenLabel}
          >
            {menuOpen ? <X size={20} strokeWidth={1.5} aria-hidden="true" /> : <Menu size={20} strokeWidth={1.5} aria-hidden="true" />}
          </button>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.slice(0, 4).map((item) => (
              <Link key={item.href} href={item.href as "/"} className="nav-link">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <Link href="/" className="site-wordmark text-ink lg:justify-self-center">
          {wordmark}
        </Link>

        <div className="flex items-center justify-end gap-2 sm:gap-3 lg:gap-4">
          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.slice(4).map((item) => (
              <Link key={item.href} href={item.href as "/"} className="nav-link">
                {item.label}
              </Link>
            ))}
          </nav>
          <LocaleSwitcher />
          <a href={`tel:${CONTACT_PHONE}`} className="nav-link hidden md:inline">
            {CONTACT_PHONE.replace("+7", "+7 ")}
          </a>
          <ThemeToggle />
          <ContactCta className="contact-cta-header">
            <span className="hidden min-[380px]:inline">{writeLabel}</span>
            <span className="min-[380px]:hidden">{writeShortLabel}</span>
          </ContactCta>
        </div>
      </div>

      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`} aria-hidden={!menuOpen}>
        <button type="button" className="mobile-menu__backdrop" onClick={closeMenu} aria-label={menuCloseLabel} />
        <nav id="mobile-menu-panel" className="mobile-menu__panel">
          <p className="meta-label">{quickContactLabel}</p>
          <div className="mt-4" onClick={closeMenu}>
            <ContactCta className="btn-primary w-full justify-center">{writeLabel}</ContactCta>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <a href={`tel:${CONTACT_PHONE}`} className="btn-secondary w-full justify-center text-center text-[10px]" onClick={closeMenu}>
              {callLabel}
            </a>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary w-full justify-center text-center text-[10px]"
              onClick={closeMenu}
            >
              {telegramLabel}
            </a>
          </div>

          <ul className="mobile-menu__links">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href as "/"} className="mobile-menu__link" onClick={closeMenu}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
