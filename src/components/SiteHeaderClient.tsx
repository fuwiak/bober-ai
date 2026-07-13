"use client";

import { useEffect, useState } from "react";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "@/i18n/navigation";
import { CONTACT_PHONE } from "@/lib/site";

type NavItem = {
  href: string;
  label: string;
};

type SiteHeaderClientProps = {
  navItems: NavItem[];
  writeLabel: string;
  wordmark: string;
};

export function SiteHeaderClient({ navItems, writeLabel, wordmark }: SiteHeaderClientProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <div className="container-editorial grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4">
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.slice(0, 4).map((item) => (
            <Link key={item.href} href={item.href as "/"} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="site-wordmark justify-self-center text-ink">
          {wordmark}
        </Link>

        <div className="flex items-center justify-end gap-3 sm:gap-4">
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
          <a href="#contact" className="btn-primary hidden sm:inline-flex">
            {writeLabel}
          </a>
        </div>
      </div>
      <nav className="flex gap-5 overflow-x-auto border-t border-hairline px-4 py-3 lg:hidden">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href as "/"} className="nav-link whitespace-nowrap">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
