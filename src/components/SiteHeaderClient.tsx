"use client";

import { useEffect, useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "@/i18n/navigation";
import { CONTACT_PHONE, SITE_NAME } from "@/lib/site";

type NavItem = {
  href: string;
  label: string;
};

type SiteHeaderClientProps = {
  navItems: NavItem[];
  writeLabel: string;
};

export function SiteHeaderClient({ navItems, writeLabel }: SiteHeaderClientProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <div className="container-editorial flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-medium text-ink">
          <BrandMark className="h-4 w-4 text-ink" />
          <span className="text-sm font-medium tracking-tight">{SITE_NAME}</span>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href as "/"} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleSwitcher />
          <a href={`tel:${CONTACT_PHONE}`} className="hidden text-sm text-muted md:inline">
            {CONTACT_PHONE.replace("+7", "+7 ")}
          </a>
          <ThemeToggle />
          <a href="#contact" className="btn-primary">
            {writeLabel}
          </a>
        </div>
      </div>
      <nav className="flex gap-4 overflow-x-auto border-t border-hairline-soft px-4 py-2 text-sm md:hidden">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href as "/"} className="nav-link whitespace-nowrap">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
