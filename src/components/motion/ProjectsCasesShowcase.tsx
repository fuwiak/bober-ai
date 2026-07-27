"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { EditorialImageFrame } from "@/components/EditorialImageFrame";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { FilterChip } from "@/components/motion/FilterChip";
import { Link } from "@/i18n/navigation";
import type { PortfolioItem, PortfolioSegment } from "@/lib/profile";

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
  segmentsLabel?: string;
  segmentSmbLabel?: string;
  segmentEnterpriseLabel?: string;
  segmentSmbTitle?: string;
  segmentEnterpriseTitle?: string;
  sectionLabel?: string;
  roleLabel?: string;
  scopeLabel?: string;
  durationLabel?: string;
  architectureLabel?: string;
};

function CaseStudyArticle({
  item,
  detailsLabel,
  stackLabel,
  problemLabel,
  solutionLabel,
  resultLabel,
  roleLabel,
  scopeLabel,
  durationLabel,
  architectureLabel,
  segmentLabel,
}: {
  item: PortfolioItem;
  detailsLabel: string;
  stackLabel: string;
  problemLabel: string;
  solutionLabel: string;
  resultLabel: string;
  roleLabel: string;
  scopeLabel: string;
  durationLabel: string;
  architectureLabel: string;
  segmentLabel?: string;
}) {
  return (
    <article className="case-study">
      <Link href={`/portfolio/${item.slug}`} className="group block">
        <EditorialImageFrame variant="card" className="aspect-[16/10] w-full bg-surface-soft">
          <Image
            src={item.image}
            alt={item.imageAlt ?? item.title}
            fill
            sizes="100vw"
            className="case-study__image"
          />
        </EditorialImageFrame>
        {item.imageCaption ? (
          <p className="mt-2 text-sm text-muted">{item.imageCaption}</p>
        ) : null}

        <div className="case-study__meta">
          <span>
            {segmentLabel ? `${segmentLabel} · ` : ""}
            {item.category}
            {item.skills?.length ? ` · ${item.skills.slice(0, 2).join(" · ")}` : ""}
          </span>
          {item.priceLabel ? <span>{item.priceLabel}</span> : null}
        </div>

        <h3 className="case-study__title">{item.title}</h3>

        {item.metric ? <p className="case-study__metric">{item.metric}</p> : null}

        {item.metricMethod ? (
          <p className="body-copy mt-2 text-sm text-muted">{item.metricMethod}</p>
        ) : null}

        {item.role || item.scope || item.duration || item.architecture ? (
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

        <span className="link-more mt-6">{detailsLabel}</span>
      </Link>
    </article>
  );
}

export function ProjectsCasesShowcase({
  items,
  title,
  subtitle,
  detailsLabel,
  allLabel,
  metricLabel: _metricLabel = "Key result",
  stackLabel = "Stack",
  problemLabel = "Задача",
  solutionLabel = "Решение",
  resultLabel = "Результат",
  categoriesLabel = "Направления",
  segmentsLabel = "Сегмент",
  segmentSmbLabel = "МСБ",
  segmentEnterpriseLabel = "Корпорации",
  segmentSmbTitle = "Малый и средний бизнес",
  segmentEnterpriseTitle = "Корпорации",
  sectionLabel = "Portfolio",
  roleLabel = "Роль",
  scopeLabel = "Объём",
  durationLabel = "Срок",
  architectureLabel = "Архитектура",
}: ProjectsCasesShowcaseProps) {
  const [activeSegment, setActiveSegment] = useState<PortfolioSegment | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const segmentCounts = useMemo(() => {
    let smb = 0;
    let enterprise = 0;
    for (const item of items) {
      if (item.segment === "enterprise") enterprise += 1;
      else smb += 1;
    }
    return { smb, enterprise };
  }, [items]);

  const segmentFiltered = useMemo(
    () => (activeSegment ? items.filter((item) => (item.segment ?? "smb") === activeSegment) : items),
    [activeSegment, items],
  );

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of segmentFiltered) counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
    return Array.from(counts.entries()).sort((a, b) => a[0].localeCompare(b[0], "ru"));
  }, [segmentFiltered]);

  const filtered = useMemo(
    () =>
      activeCategory
        ? segmentFiltered.filter((item) => item.category === activeCategory)
        : segmentFiltered,
    [activeCategory, segmentFiltered],
  );

  const segmentLabelFor = (segment?: PortfolioSegment) =>
    segment === "enterprise" ? segmentEnterpriseLabel : segmentSmbLabel;

  const articleProps = {
    detailsLabel,
    stackLabel,
    problemLabel,
    solutionLabel,
    resultLabel,
    roleLabel,
    scopeLabel,
    durationLabel,
    architectureLabel,
  };

  const renderList = (list: PortfolioItem[]) => (
    <Stagger className="mt-12" stagger={0.05}>
      {list.map((item) => (
        <StaggerItem key={item.id}>
          <CaseStudyArticle
            item={item}
            segmentLabel={segmentLabelFor(item.segment)}
            {...articleProps}
          />
        </StaggerItem>
      ))}
    </Stagger>
  );

  const smbItems = filtered.filter((item) => (item.segment ?? "smb") === "smb");
  const enterpriseItems = filtered.filter((item) => item.segment === "enterprise");
  const showGrouped = !activeSegment && !activeCategory && smbItems.length > 0 && enterpriseItems.length > 0;

  return (
    <div>
      <Reveal>
        <span className="section-label">{sectionLabel}</span>
        <h2 className="section-title mt-4">{title}</h2>
        {subtitle ? <p className="body-copy mt-4 max-w-2xl text-base">{subtitle}</p> : null}
      </Reveal>

      <Reveal delay={0.06} className="mt-10">
        <div className="space-y-3">
          <div className="meta-label">{segmentsLabel}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <FilterChip
              label={allLabel}
              count={items.length}
              active={!activeSegment}
              onClick={() => {
                setActiveSegment(null);
                setActiveCategory(null);
              }}
            />
            <FilterChip
              label={segmentSmbLabel}
              count={segmentCounts.smb}
              active={activeSegment === "smb"}
              onClick={() => {
                setActiveSegment("smb");
                setActiveCategory(null);
              }}
            />
            <FilterChip
              label={segmentEnterpriseLabel}
              count={segmentCounts.enterprise}
              active={activeSegment === "enterprise"}
              onClick={() => {
                setActiveSegment("enterprise");
                setActiveCategory(null);
              }}
            />
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-8">
        <div className="space-y-3">
          <div className="meta-label">{categoriesLabel}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <FilterChip
              label={allLabel}
              count={segmentFiltered.length}
              active={!activeCategory}
              onClick={() => setActiveCategory(null)}
            />
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

      {showGrouped ? (
        <>
          <Reveal delay={0.12} className="mt-14">
            <h3 className="font-display text-2xl tracking-tight">{segmentSmbTitle}</h3>
          </Reveal>
          {renderList(smbItems)}
          <Reveal delay={0.08} className="mt-16">
            <h3 className="font-display text-2xl tracking-tight">{segmentEnterpriseTitle}</h3>
          </Reveal>
          {renderList(enterpriseItems)}
        </>
      ) : (
        renderList(filtered)
      )}
    </div>
  );
}
