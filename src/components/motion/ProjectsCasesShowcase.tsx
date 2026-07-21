"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { EditorialImageFrame } from "@/components/EditorialImageFrame";
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
  metricLabel?: string;
  stackLabel?: string;
  problemLabel?: string;
  solutionLabel?: string;
  resultLabel?: string;
  categoriesLabel?: string;
  sectionLabel?: string;
  roleLabel?: string;
  scopeLabel?: string;
  durationLabel?: string;
  architectureLabel?: string;
};

export function ProjectsCasesShowcase({
  items,
  title,
  subtitle,
  detailsLabel,
  allLabel,
  metricLabel = "Key result",
  stackLabel = "Stack",
  problemLabel = "Задача",
  solutionLabel = "Решение",
  resultLabel = "Результат",
  categoriesLabel = "Направления",
  sectionLabel = "Portfolio",
  roleLabel = "Роль",
  scopeLabel = "Объём",
  durationLabel = "Срок",
  architectureLabel = "Архитектура",
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

  return (
    <div>
      <Reveal>
        <span className="section-label">{sectionLabel}</span>
        <h2 className="section-title mt-4">{title}</h2>
        {subtitle ? <p className="body-copy mt-4 max-w-2xl text-base">{subtitle}</p> : null}
      </Reveal>

      <Reveal delay={0.08} className="mt-10">
        <div className="space-y-3">
          <div className="meta-label">{categoriesLabel}</div>
          <div className="mt-3 flex flex-wrap gap-2">
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

      <Stagger className="mt-12" stagger={0.05}>
        {filtered.map((item) => (
          <StaggerItem key={item.id}>
            <article className="case-study">
              <Link href={`/portfolio/${item.slug}`} className="group block">
                <EditorialImageFrame variant="card" className="aspect-[16/10] w-full bg-surface-soft">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="100vw"
                    className="case-study__image"
                  />
                </EditorialImageFrame>

                <div className="case-study__meta">
                  <span>
                    {item.category}
                    {item.skills?.length ? ` · ${item.skills.slice(0, 2).join(" · ")}` : ""}
                  </span>
                  {item.priceLabel ? <span>{item.priceLabel}</span> : null}
                </div>

                <h3 className="case-study__title">{item.title}</h3>

                {item.metric ? (
                  <p className="case-study__metric">{item.metric}</p>
                ) : null}

                {item.metricMethod ? (
                  <p className="body-copy mt-2 text-sm text-muted">{item.metricMethod}</p>
                ) : null}

                {(item.role || item.scope || item.duration || item.architecture) ? (
                  <dl className="case-study__facts mt-4 space-y-2">
                    {item.role ? (
                      <div>
                        <dt className="meta-label inline">{roleLabel}: </dt>
                        <dd className="body-copy inline text-sm">{item.role}</dd>
                      </div>
                    ) : null}
                    {item.scope ? (
                      <div>
                        <dt className="meta-label inline">{scopeLabel}: </dt>
                        <dd className="body-copy inline text-sm">{item.scope}</dd>
                      </div>
                    ) : null}
                    {item.duration ? (
                      <div>
                        <dt className="meta-label inline">{durationLabel}: </dt>
                        <dd className="body-copy inline text-sm">{item.duration}</dd>
                      </div>
                    ) : null}
                    {item.architecture ? (
                      <div>
                        <dt className="meta-label inline">{architectureLabel}: </dt>
                        <dd className="body-copy inline text-sm">{item.architecture}</dd>
                      </div>
                    ) : null}
                  </dl>
                ) : null}

                {item.stack ? (
                  <p className="case-study__stack">
                    <span className="text-body-strong">{stackLabel}: </span>
                    {item.stack}
                  </p>
                ) : null}

                {item.description ? (
                  <p className="case-study__desc">
                    <span className="text-body-strong">{problemLabel}: </span>
                    {item.description}
                  </p>
                ) : null}

                {item.solution ? (
                  <p className="case-study__desc">
                    <span className="text-body-strong">{solutionLabel}: </span>
                    {item.solution}
                  </p>
                ) : null}

                {item.result ? (
                  <p className="case-study__desc">
                    <span className="text-body-strong">{resultLabel}: </span>
                    {item.result}
                  </p>
                ) : null}

                <span className="link-more mt-6">
                  {detailsLabel}
                </span>
              </Link>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
