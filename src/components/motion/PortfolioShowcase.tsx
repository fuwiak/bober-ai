"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "motion/react";
import type { PortfolioItem } from "@/lib/profile";
import { FilterChip } from "@/components/motion/FilterChip";
import { PortfolioCard } from "@/components/motion/PortfolioCard";
import { Reveal } from "@/components/motion/Reveal";

type PortfolioShowcaseProps = {
  items: PortfolioItem[];
  title: string;
  subtitle?: string;
  detailsLabel: string;
  allLabel: string;
};

export function PortfolioShowcase({ items, title, subtitle, detailsLabel, allLabel }: PortfolioShowcaseProps) {
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of items) {
      counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
    }
    return Array.from(counts.entries()).sort((a, b) => a[0].localeCompare(b[0], "ru"));
  }, [items]);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(
    () => (activeCategory ? items.filter((item) => item.category === activeCategory) : items),
    [activeCategory, items],
  );

  return (
    <div>
      <Reveal>
        <h2 className="display-sm">{title}</h2>
        {subtitle ? <p className="mt-3 max-w-2xl text-sm text-body">{subtitle}</p> : null}
      </Reveal>

      <Reveal delay={0.08} className="mt-8">
        <div className="flex flex-wrap gap-2">
          <FilterChip label={allLabel} count={items.length} active={!activeCategory} onClick={() => setActiveCategory(null)} />
          {categories.map(([category, count]) => (
            <FilterChip
              key={category}
              label={category}
              count={count}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <PortfolioCard key={item.id} item={item} detailsLabel={detailsLabel} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
