"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import NextLink from "next/link";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ContactCta } from "@/components/ContactCta";
import { Link, usePathname } from "@/i18n/navigation";
import { CONTACT_PHONE, TELEGRAM_URL } from "@/lib/site";

export type NavLinkItem = {
  href: string;
  label: string;
  description?: string;
  /** RU-only routes like /academy — do not prefix /en */
  localeAgnostic?: boolean;
  icon?: NavIconId;
};

export type NavColumn = {
  title: string;
  items: NavLinkItem[];
};

export type NavGroup =
  | {
      id: string;
      type: "link";
      label: string;
      href: string;
      localeAgnostic?: boolean;
    }
  | {
      id: string;
      type: "drop";
      label: string;
      items: NavLinkItem[];
    }
  | {
      id: string;
      type: "mega";
      label: string;
      columns: NavColumn[];
      footerTags?: string[];
      footerLink?: NavLinkItem;
      promo?: { title: string; text: string; href: string; cta: string };
    };

type NavIconId =
  | "grid"
  | "shield"
  | "bolt"
  | "sales"
  | "search"
  | "case"
  | "process"
  | "about"
  | "career"
  | "partner"
  | "news"
  | "book"
  | "check"
  | "media"
  | "help"
  | "arrow"
  | "chev"
  | "burger"
  | "close";

type SiteHeaderClientProps = {
  groups: NavGroup[];
  writeLabel: string;
  writeShortLabel: string;
  wordmark: string;
  menuOpenLabel: string;
  menuCloseLabel: string;
  quickContactLabel: string;
  callLabel: string;
  telegramLabel: string;
};

function pathWithoutHash(href: string) {
  return href.split("#")[0] || "/";
}

function isActivePath(pathname: string, href: string) {
  const path = pathWithoutHash(href);
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}

function groupHasActive(pathname: string, group: NavGroup) {
  if (group.type === "link") return isActivePath(pathname, group.href);
  if (group.type === "drop") return group.items.some((item) => isActivePath(pathname, item.href));
  return group.columns.some((col) => col.items.some((item) => isActivePath(pathname, item.href)));
}

function Icon({ id, className = "site-mega__ic" }: { id: NavIconId; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <use href={`#bmd-i-${id}`} />
    </svg>
  );
}

function NavAnchor({
  item,
  className,
  onNavigate,
  children,
}: {
  item: Pick<NavLinkItem, "href" | "localeAgnostic">;
  className: string;
  onNavigate?: () => void;
  children: ReactNode;
}) {
  if (item.localeAgnostic) {
    return (
      <NextLink href={item.href} className={className} onClick={onNavigate}>
        {children}
      </NextLink>
    );
  }
  return (
    <Link href={item.href as "/"} className={className} onClick={onNavigate}>
      {children}
    </Link>
  );
}

function MegaCard({ item, onNavigate }: { item: NavLinkItem; onNavigate?: () => void }) {
  return (
    <NavAnchor item={item} className="site-mega__card" onNavigate={onNavigate}>
      <span className="site-mega__tile">
        <Icon id={item.icon ?? "grid"} />
      </span>
      <span className="site-mega__ct">
        <span className="site-mega__tt">{item.label}</span>
        {item.description ? <span className="site-mega__st">{item.description}</span> : null}
      </span>
    </NavAnchor>
  );
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

function IconSprite() {
  return (
    <svg width="0" height="0" className="site-mega__sprite" aria-hidden>
      <defs>
        <symbol id="bmd-i-grid" viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <rect x="14" y="3" width="7" height="7" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <rect x="3" y="14" width="7" height="7" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <rect x="14" y="14" width="7" height="7" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </symbol>
        <symbol id="bmd-i-shield" viewBox="0 0 24 24">
          <path d="M12 3l7 3v6c0 4.2-3 7.6-7 9-4-1.4-7-4.8-7-9V6z" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9.2 12l2 2 3.6-3.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </symbol>
        <symbol id="bmd-i-bolt" viewBox="0 0 24 24">
          <path d="M13 2L4 13h6l-1 9 9-11h-6z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </symbol>
        <symbol id="bmd-i-sales" viewBox="0 0 24 24">
          <path d="M3 17l6-6 4 4 8-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M16 7h5v5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </symbol>
        <symbol id="bmd-i-search" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M16.5 16.5L21 21" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </symbol>
        <symbol id="bmd-i-case" viewBox="0 0 24 24">
          <path d="M3 7.5l9-4 9 4-9 4z" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 7.5V14l9 4 9-4V7.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </symbol>
        <symbol id="bmd-i-process" viewBox="0 0 24 24">
          <path d="M4 6h9M4 12h13M4 18h7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M15.5 16.5l2 2 3.5-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </symbol>
        <symbol id="bmd-i-about" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3.5 19a5.5 5.5 0 0 1 11 0" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </symbol>
        <symbol id="bmd-i-career" viewBox="0 0 24 24">
          <rect x="3" y="7" width="18" height="13" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </symbol>
        <symbol id="bmd-i-partner" viewBox="0 0 24 24">
          <circle cx="8.5" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="15.5" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </symbol>
        <symbol id="bmd-i-news" viewBox="0 0 24 24">
          <rect x="3" y="5" width="13.5" height="15" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M16.5 8H20a1 1 0 0 1 1 1v9a2 2 0 0 1-2 2" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M6 9h7.5M6 13h7.5M6 17h5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </symbol>
        <symbol id="bmd-i-book" viewBox="0 0 24 24">
          <path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H19v17H7.5A2.5 2.5 0 0 0 5 21.5z" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M5 18.5A2.5 2.5 0 0 1 7.5 16H19" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </symbol>
        <symbol id="bmd-i-check" viewBox="0 0 24 24">
          <path d="M4 6l1.6 1.6L9 4.4M4 12l1.6 1.6L9 10.4M4 18l1.6 1.6L9 16.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M12.5 6H20M12.5 12.5H20M12.5 19H20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </symbol>
        <symbol id="bmd-i-media" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="16" rx="2.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="8.4" cy="9.4" r="1.8" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M5 18l4.6-4.6 3 3 3-3L20 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </symbol>
        <symbol id="bmd-i-help" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9.3 9.5a2.8 2.8 0 0 1 5.4 1c0 1.9-2.7 2.2-2.7 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M12 17h.01" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </symbol>
        <symbol id="bmd-i-arrow" viewBox="0 0 24 24">
          <path d="M5 12h13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M12 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </symbol>
        <symbol id="bmd-i-chev" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </symbol>
        <symbol id="bmd-i-burger" viewBox="0 0 24 24">
          <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </symbol>
        <symbol id="bmd-i-close" viewBox="0 0 24 24">
          <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </symbol>
      </defs>
    </svg>
  );
}

export function SiteHeaderClient({
  groups,
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
  const [openId, setOpenId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileAcc, setMobileAcc] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rootRef = useRef<HTMLElement>(null);

  const closeDesktop = useCallback(() => setOpenId(null), []);

  const openOnly = useCallback((id: string) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenId(id);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenId(null), 150);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDesktop();
        setMenuOpen(false);
      }
    };
    const onDocClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) closeDesktop();
    };
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onDocClick);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onDocClick);
    };
  }, [closeDesktop]);

  useEffect(() => {
    closeDesktop();
    setMenuOpen(false);
    setMobileAcc(null);
  }, [pathname, closeDesktop]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      ref={rootRef}
      className={`site-header${menuOpen ? " site-header--menu-open" : ""}${scrolled ? " site-header--scrolled" : ""}${openId ? " site-header--pop-open" : ""}`}
    >
      <IconSprite />
      <div className="container-editorial site-header__frame">
        <div className="site-header__bar">
          <div className="site-header__cont">
            <Link href="/" className="site-wordmark" onClick={closeMenu}>
              {wordmark}
            </Link>

            <nav className="site-header__nav" aria-label="Main">
              <ul className="site-header__list">
                {groups.map((group) => {
                  const active = groupHasActive(pathname, group);
                  if (group.type === "link") {
                    const className = `site-header__trigger${active ? " site-header__trigger--active" : ""}`;
                    return (
                      <li key={group.id} className="site-header__item">
                        {group.localeAgnostic ? (
                          <NextLink href={group.href} className={className}>
                            {group.label}
                          </NextLink>
                        ) : (
                          <Link href={group.href as "/"} className={className}>
                            {group.label}
                          </Link>
                        )}
                      </li>
                    );
                  }

                  const isOpen = openId === group.id;
                  return (
                    <li
                      key={group.id}
                      className={`site-header__item site-header__pop${group.type === "mega" ? " site-header__pop--mega" : " site-header__pop--drop"}${isOpen ? " site-header__pop--open" : ""}`}
                      onMouseEnter={() => openOnly(group.id)}
                      onMouseLeave={scheduleClose}
                    >
                      <button
                        type="button"
                        className={`site-header__trigger${active ? " site-header__trigger--active" : ""}`}
                        aria-haspopup="true"
                        aria-expanded={isOpen}
                        onClick={(event) => {
                          event.preventDefault();
                          if (isOpen) closeDesktop();
                          else openOnly(group.id);
                          // Mouse/pointer only — keyboard keeps focus for a11y
                          if (event.detail > 0) event.currentTarget.blur();
                        }}
                      >
                        {group.label}
                        <Icon id="chev" className="site-header__chev" />
                      </button>

                      {group.type === "mega" ? (
                        <div className="site-mega" role="menu">
                          <div
                            className="site-mega__grid"
                            style={{ gridTemplateColumns: `repeat(${group.columns.length + (group.promo ? 1 : 0)}, minmax(0, 1fr))` }}
                          >
                            {group.columns.map((col) => (
                              <div key={col.title}>
                                <div className="site-mega__collabel">{col.title}</div>
                                {col.items.map((item) => (
                                  <MegaCard key={item.href} item={item} onNavigate={closeDesktop} />
                                ))}
                              </div>
                            ))}
                            {group.promo ? (
                              <div className="site-mega__promo">
                                <h4>{group.promo.title}</h4>
                                <p>{group.promo.text}</p>
                                <Link href={group.promo.href as "/"} className="site-mega__promo-cta" onClick={closeDesktop}>
                                  {group.promo.cta}
                                </Link>
                              </div>
                            ) : null}
                          </div>
                          {(group.footerTags?.length || group.footerLink) && (
                            <div className="site-mega__foot">
                              {group.footerTags?.length ? (
                                <div className="site-mega__foot-tags">
                                  {group.footerTags.map((tag) => (
                                    <span key={tag}>{tag}</span>
                                  ))}
                                </div>
                              ) : (
                                <span />
                              )}
                              {group.footerLink ? (
                                <NavAnchor item={group.footerLink} className="site-mega__foot-link" onNavigate={closeDesktop}>
                                  {group.footerLink.label}
                                  <Icon id="arrow" className="site-mega__ic site-mega__ic--sm" />
                                </NavAnchor>
                              ) : null}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="site-drop" role="menu">
                          {group.items.map((item) => (
                            <MegaCard key={item.href} item={item} onNavigate={closeDesktop} />
                          ))}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
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

          <div className="mobile-menu__accs">
            {groups.map((group) => {
              if (group.type === "link") {
                return (
                  <div key={group.id} className="mobile-menu__acc">
                    {group.localeAgnostic ? (
                      <NextLink href={group.href} className="mobile-menu__acc-link" onClick={closeMenu}>
                        {group.label}
                        <Icon id="chev" className="mobile-menu__acc-chev mobile-menu__acc-chev--link" />
                      </NextLink>
                    ) : (
                      <Link href={group.href as "/"} className="mobile-menu__acc-link" onClick={closeMenu}>
                        {group.label}
                        <Icon id="chev" className="mobile-menu__acc-chev mobile-menu__acc-chev--link" />
                      </Link>
                    )}
                  </div>
                );
              }

              const isOpen = mobileAcc === group.id;

              return (
                <div key={group.id} className={`mobile-menu__acc${isOpen ? " mobile-menu__acc--open" : ""}`}>
                  <button
                    type="button"
                    className="mobile-menu__acc-head"
                    aria-expanded={isOpen}
                    onClick={() => setMobileAcc(isOpen ? null : group.id)}
                  >
                    {group.label}
                    <Icon id="chev" className="mobile-menu__acc-chev" />
                  </button>
                  <div className="mobile-menu__acc-body">
                    <div className="mobile-menu__acc-inner">
                      <div className="mobile-menu__acc-pad">
                        {group.type === "mega"
                          ? group.columns.map((col) => (
                              <div key={col.title}>
                                <div className="mobile-menu__msub">{col.title}</div>
                                {col.items.map((item) => (
                                  <NavAnchor
                                    key={item.href}
                                    item={item}
                                    className="mobile-menu__mrow"
                                    onNavigate={closeMenu}
                                  >
                                    <span className="site-mega__tile site-mega__tile--sm">
                                      <Icon id={item.icon ?? "grid"} />
                                    </span>
                                    {item.label}
                                  </NavAnchor>
                                ))}
                              </div>
                            ))
                          : group.items.map((item) => (
                              <NavAnchor key={item.href} item={item} className="mobile-menu__mrow" onNavigate={closeMenu}>
                                <span className="site-mega__tile site-mega__tile--sm">
                                  <Icon id={item.icon ?? "grid"} />
                                </span>
                                {item.label}
                              </NavAnchor>
                            ))}
                        {group.type === "mega" && group.footerLink ? (
                          <NavAnchor
                            item={group.footerLink}
                            className="mobile-menu__mrow mobile-menu__mrow--all"
                            onNavigate={closeMenu}
                          >
                            {group.footerLink.label}
                          </NavAnchor>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex items-center gap-3 border-t border-hairline pt-6">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
