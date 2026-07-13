"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { FilterChip } from "@/components/motion/FilterChip";
import type { PortfolioItem } from "@/lib/profile";

type ProjectsCasesShowcaseProps = {
  items: PortfolioItem[];
  title: string;
  subtitle?: string;
  detailsLabel: string;
  allLabel: string;
  problemLabel?: string;
  solutionLabel?: string;
  resultLabel?: string;
  categoriesLabel?: string;
};

export function ProjectsCasesShowcase({
  items,
  title,
  subtitle,
  detailsLabel,
  allLabel,
  problemLabel = "Задача",
  solutionLabel = "Решение",
  resultLabel = "Результат",
  categoriesLabel = "Направления",
}: ProjectsCasesShowcaseProps) {
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of items) counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
    return Array.from(counts.entries()).sort((a, b) => a[0].localeCompare(b[0], "ru"));
  }, [items]);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(
    () => (activeCategory ? items.filter((item) => item.category === activeCategory) : items),
    [activeCategory, items],
  );

  const columns = useMemo(() => {
    const left: PortfolioItem[] = [];
    const right: PortfolioItem[] = [];
    filtered.forEach((item, idx) => (idx % 2 === 0 ? left : right).push(item));
    return { left, right };
  }, [filtered]);

  return (
    <div>
      <Reveal>
        <span className="section-label">Portfolio</span>
        <h2 className="display-sm mt-3">{title}</h2>
        {subtitle ? <p className="mt-3 max-w-2xl text-sm text-body">{subtitle}</p> : null}
      </Reveal>

      <Reveal delay={0.08} className="mt-8">
        <div className="space-y-3">
          <div className="text-xs font-medium uppercase tracking-widest text-muted">{categoriesLabel}</div>
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
        </div>
      </Reveal>

      <Stagger className="mt-10 grid gap-6 md:grid-cols-2" stagger={0.07}>
        {[columns.left, columns.right].map((col, colIdx) => (
          <div key={colIdx} className="space-y-6">
            {col.map((item, itemIdx) => (
              <StaggerItem key={item.id}>
                <Link
                  href={`/portfolio/${item.slug}`}
                  className={`portfolio-card group block ${colIdx === 0 && itemIdx === 0 ? "portfolio-card--featured light-sweep" : ""}`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface-card">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="portfolio-card__image"
                    />
                  </div>

                  <div className="flex flex-col gap-3 p-6">
                    <div className="flex flex-wrap gap-2">
                      <span className="badge-pill text-[11px] uppercase tracking-wider">{item.category}</span>
                      {item.skills?.slice(0, 2).map((skill) => (
                        <span key={skill} className="badge-pill text-[11px] text-muted">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-display text-xl leading-snug tracking-tight text-ink">{item.title}</h3>

                    {item.description ? (
                      <p className="text-sm leading-relaxed text-body">
                        <span className="font-medium text-ink">{problemLabel}: </span>
                        {item.description}
                      </p>
                    ) : null}

                    {item.solution ? (
                      <p className="text-sm leading-relaxed text-muted">
                        <span className="font-medium text-body">{solutionLabel}: </span>
                        {item.solution}
                      </p>
                    ) : null}

                    {item.result ? (
                      <p className="text-sm leading-relaxed text-body">
                        <span className="font-medium text-accent-primary-light">{resultLabel}: </span>
                        {item.result}
                      </p>
                    ) : null}

                    <div className="mt-2 flex items-center justify-between gap-3">
                      {item.priceLabel ? (
                        <p className="font-display text-lg tracking-tight text-primary">{item.priceLabel}</p>
                      ) : (
                        <span />
                      )}
                      <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-ink">
                        {detailsLabel}
                        <ArrowRight className="button-arrow h-4 w-4" aria-hidden />
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </div>
        ))}
      </Stagger>
    </div>
  );
}
