"use client";

import { motion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import type { NewsItem } from "@/lib/news-agent";

type Props = {
  title: string;
  items: NewsItem[];
};

export default function NewsCarousel({ title, items }: Props) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [dragLimit, setDragLimit] = useState(0);

  useLayoutEffect(() => {
    const update = () => {
      const vw = viewportRef.current?.clientWidth ?? 0;
      const tw = trackRef.current?.scrollWidth ?? 0;
      setDragLimit(Math.max(0, tw - vw));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="mb-5 flex items-end justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
        <span className="hidden text-xs font-semibold uppercase tracking-widest text-on-surface-variant sm:block">
          Перетащите для прокрутки →
        </span>
      </div>

      <div ref={viewportRef} className="overflow-hidden">
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={{ left: -dragLimit, right: 0 }}
          dragElastic={0.04}
          className="flex cursor-grab gap-5 active:cursor-grabbing"
        >
          {items.map((item) => (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              className="group flex w-[280px] shrink-0 flex-col overflow-hidden rounded-3xl border border-outline-variant/20 bg-surface-container-lowest shadow-sm transition hover:border-primary/40 sm:w-[320px]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-container-high">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={item.title}
                    draggable={false}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-gradient-to-br from-primary/10 to-surface-container-low">
                    <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                      {item.source}
                    </span>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <span className="absolute left-3 bottom-3 rounded-full bg-black/65 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur">
                  {item.source}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="line-clamp-3 text-base font-bold leading-snug text-on-surface group-hover:text-primary">
                  {item.title}
                </h3>
                {item.summary ? (
                  <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-on-surface-variant">
                    {item.summary}
                  </p>
                ) : null}
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
