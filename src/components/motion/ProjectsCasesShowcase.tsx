"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { FilterChip } from "@/components/motion/FilterChip";
import type { PortfolioItem } from "@/lib/profile";

type ProjectsCasesShowcaseProps = {
  items: PortfolioItem[];
  title: string;
  subtitle?: string;
  detailsLabel: string;
  allLabel: string;
};

const FALLBACK_COLORS = ["#E20F0F", "#370B27", "#00ABEE", "#FFFFFF", "#121820"] as const;

function pickCardColor(slug: string, index: number): string {
  const bySlug: Record<string, string> = {
    "kaspersky-ai-assistant": "#E20F0F",
    "elia-suite": "#121820",
    "lead-generation": "#00ABEE",
    "kp-llm-automation": "#370B27",
    "yandex-telemost-agent": "#ffffff",
  };

  return bySlug[slug] ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length];
}

function isLight(hex: string): boolean {
  const value = hex.replace("#", "");
  if (value.length !== 6) return false;
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  // perceived luminance
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) > 180;
}

export function ProjectsCasesShowcase({ items, title, subtitle, detailsLabel, allLabel }: ProjectsCasesShowcaseProps) {
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
        <h2 className="display-sm">{title}</h2>
        {subtitle ? <p className="mt-3 max-w-2xl text-sm text-body">{subtitle}</p> : null}
      </Reveal>

      <Reveal delay={0.08} className="mt-8">
        <div className="space-y-3">
          <div className="text-xs font-medium uppercase tracking-widest text-muted">Направления</div>
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

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {[columns.left, columns.right].map((col, colIdx) => (
          <div key={colIdx} className="space-y-6">
            {col.map((item, idx) => {
              const color = pickCardColor(item.slug, idx + colIdx);
              const light = isLight(color);
              return (
                <Link
                  key={item.id}
                  href={`/portfolio/${item.slug}`}
                  className="card-kts group block overflow-hidden rounded-2xl border border-hairline"
                  style={{ backgroundColor: color }}
                >
                  <div
                    className={`card-kts-body flex flex-col gap-3 p-6 ${light ? "text-ink" : "text-on-dark"}`}
                    style={{ minHeight: 260 }}
                  >
                    <div className="flex flex-wrap gap-2">
                      <span className={`badge-pill text-[11px] uppercase tracking-wider ${light ? "" : "bg-white/10 text-on-dark-soft"}`}>
                        {item.category}
                      </span>
                      {item.skills?.slice(0, 2).map((skill) => (
                        <span
                          key={skill}
                          className={`badge-pill text-[11px] ${light ? "text-muted" : "bg-white/10 text-on-dark-soft"}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <h3 className={`font-display text-xl leading-snug tracking-tight ${light ? "text-ink" : "text-on-dark"}`}>
                      {item.title}
                    </h3>
                    {item.description ? (
                      <p className={`text-sm leading-relaxed ${light ? "text-body" : "text-on-dark-soft"}`}>
                        {item.description}
                      </p>
                    ) : null}

                    <div className="mt-2 flex items-center justify-between gap-3">
                      {item.priceLabel ? (
                        <p className={`font-display text-lg tracking-tight ${light ? "text-primary" : "text-on-dark"}`}>
                          {item.priceLabel}
                        </p>
                      ) : (
                        <span />
                      )}
                      <span className={`btn-kts-pill ${light ? "" : "border-white/20 text-on-dark"}`}>
                        {detailsLabel}
                        <span className="btn-kts-arrow" aria-hidden>
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

