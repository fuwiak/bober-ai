"use client";

import { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import { motion, LayoutGroup } from "motion/react";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ContactCta } from "@/components/ContactCta";
import { Link, usePathname } from "@/i18n/navigation";
import { CONTACT_PHONE, TELEGRAM_URL } from "@/lib/site";

type NavItem = {
  href: string;
  label: string;
  /** RU-only routes like /academy — do not prefix /en */
  localeAgnostic?: boolean;
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

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function TelegramIcon() {
  return (
    <svg className="site-header__icon" width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21.5 3.5 2.8 10.8c-1.3.5-1.3 1.2-.2 1.5l4.8 1.5 1.8 5.5c.2.7.1.9.8.9.5 0 .7-.2 1-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8L22.8 4.7c.3-1.2-.4-1.7-1.3-1.2ZM9.4 14.3l-.3 3.5 1.5-1.4 6.3-5.7c.3-.2.5-.4.2-.6-.2-.2-.5 0-.7.1l-7 4.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

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
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

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
  const indicatorHref = hoveredHref ?? navItems.find((item) => isActivePath(pathname, item.href))?.href ?? null;

  return (
    <header className={`site-header${menuOpen ? " site-header--menu-open" : ""}`}>
      <div className="site-header__bar container-editorial">
        <div className="site-header__cont">
          <Link href="/" className="site-wordmark" onClick={closeMenu}>
            {wordmark}
          </Link>

          <LayoutGroup id="site-header-nav">
            <nav className="site-header__nav" aria-label="Main" onMouseLeave={() => setHoveredHref(null)}>
              {navItems.map((item) => {
                const active = isActivePath(pathname, item.href);
                const showIndicator = indicatorHref === item.href;
                const className = `nav-link${active ? " nav-link--active" : ""}`;
                const content = (
                  <>
                    <span className="nav-link__label">{item.label}</span>
                    {showIndicator ? (
                      <motion.span
                        layoutId="site-nav-indicator"
                        className="nav-link__indicator"
                        transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.6 }}
                      />
                    ) : null}
                  </>
                );

                if (item.localeAgnostic) {
                  return (
                    <NextLink
                      key={item.href}
                      href={item.href}
                      className={className}
                      onMouseEnter={() => setHoveredHref(item.href)}
                      onFocus={() => setHoveredHref(item.href)}
                    >
                      {content}
                    </NextLink>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href as "/"}
                    className={className}
                    onMouseEnter={() => setHoveredHref(item.href)}
                    onFocus={() => setHoveredHref(item.href)}
                  >
                    {content}
                  </Link>
                );
              })}
            </nav>
          </LayoutGroup>
        </div>

        <div className="site-header__cont site-header__cont--actions">
          <a href={`tel:${CONTACT_PHONE}`} className="site-header__phone">
            {CONTACT_PHONE}
          </a>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="site-header__icon-link"
            aria-label={telegramLabel}
          >
            <TelegramIcon />
          </a>
          <div className="site-header__tools">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
          <ContactCta className="header-cta contact-cta-header" goal="header_consult_cta_click">
            <span className="hidden md:inline">{writeLabel}</span>
            <span className="md:hidden">{writeShortLabel}</span>
          </ContactCta>
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu-panel"
            aria-label={menuOpen ? menuCloseLabel : menuOpenLabel}
          >
            <span className="mobile-menu-toggle__bars" aria-hidden>
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div className={`mobile-menu${menuOpen ? " mobile-menu--open" : ""}`} aria-hidden={!menuOpen}>
        <button type="button" className="mobile-menu__backdrop" onClick={closeMenu} aria-label={menuCloseLabel} />
        <nav id="mobile-menu-panel" className="mobile-menu__panel">
          <p className="meta-label">{quickContactLabel}</p>
          <div className="mt-4" onClick={closeMenu}>
            <ContactCta className="header-cta w-full justify-center" goal="mobile_consult_cta_click">
              {writeLabel}
            </ContactCta>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <a href={`tel:${CONTACT_PHONE}`} className="btn-secondary w-full justify-center text-center" onClick={closeMenu}>
              {callLabel}
            </a>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary w-full justify-center text-center"
              onClick={closeMenu}
            >
              {telegramLabel}
            </a>
          </div>

          <ul className="mobile-menu__links">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.localeAgnostic ? (
                  <NextLink href={item.href} className="mobile-menu__link" onClick={closeMenu}>
                    {item.label}
                  </NextLink>
                ) : (
                  <Link href={item.href as "/"} className="mobile-menu__link" onClick={closeMenu}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-3 border-t border-hairline pt-6">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
