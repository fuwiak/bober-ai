"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { NEWS_CATEGORY_LABEL, type NewsItem } from "@/lib/news-agent";

type DigestResponse = {
  items?: NewsItem[];
  generatedAt?: string | null;
  refreshing?: boolean;
};

export function HomeNewsDigestPanel() {
  const [data, setData] = useState<DigestResponse | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/news")
      .then((res) => (res.ok ? res.json() : null))
      .then((json: DigestResponse | null) => {
        if (!cancelled && json) setData(json);
      })
      .catch(() => {
        if (!cancelled) setData({ items: [] });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const items = data?.items?.slice(0, 6) ?? [];
  const showSkeleton = data === null;
  const hasItems = items.length > 0;
  const loopItems = hasItems ? [...items, ...items] : [];

  return (
    <section id="news-digest" className="scroll-mt-28 border-y border-outline-variant/15 bg-surface-container-lowest/80 py-16 px-6">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="rounded-3xl border border-outline-variant/20 bg-surface-container-low p-4 shadow-sm">
          <div className="mb-4 border-b border-outline-variant/20 pb-4">
            <span className="text-primary font-bold uppercase tracking-widest text-xs font-body">AI-дайджест</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-on-surface">ИИ подборка новостей</h2>
          </div>
          <div className="news-kaleidoscope relative h-[30rem] overflow-hidden rounded-2xl">
            <div className="news-kaleidoscope-track flex flex-col gap-3">
              {showSkeleton
                ? [0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex flex-col overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-lowest"
                    >
                      <div className="aspect-[3/2] animate-pulse bg-surface-container-high" />
                      <div className="space-y-3 p-4">
                        <div className="h-3 w-20 animate-pulse rounded bg-surface-container-high" />
                        <div className="h-4 w-full animate-pulse rounded bg-surface-container-high" />
                      </div>
                    </div>
                  ))
                : null}
              {!showSkeleton && hasItems
                ? loopItems.map((item, idx) => (
                    <a
                      key={`${item.url}-${idx}`}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex flex-col overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-lowest transition hover:border-primary/35"
                    >
                      <div className="relative aspect-[3/2] w-full overflow-hidden bg-surface-container-high">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="320px"
                            className="object-cover object-center transition duration-500 group-hover:scale-[1.04]"
                            unoptimized
                          />
                        ) : (
                          <div className="grid h-full w-full place-items-center text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                            Kinetic AI
                          </div>
                        )}
                      </div>
                      <div className="flex min-h-0 flex-1 flex-col p-3">
                        <span className="inline-flex w-fit rounded-full bg-primary/12 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">
                          {NEWS_CATEGORY_LABEL[item.category]}
                        </span>
                        <h3 className="mt-2 line-clamp-2 text-sm font-bold leading-snug text-on-surface">{item.title}</h3>
                      </div>
                    </a>
                  ))
                : null}
              {!showSkeleton && !hasItems ? (
                <div className="rounded-2xl border border-dashed border-outline-variant/35 bg-surface-container-low px-5 py-8 text-center">
                  <p className="text-sm text-on-surface-variant">
                    Лента готовится. Откройте{" "}
                    <Link href="/news" className="font-semibold text-primary underline-offset-4 hover:underline">
                      полную страницу
                    </Link>
                    .
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="max-w-2xl text-on-surface-variant leading-relaxed">
            Лента актуальных материалов по ИИ и облачной инфраструктуре. Блок расположен вертикально слева и работает
            как калейдоскоп: карточки плавно прокручиваются автоматически.
          </p>
          <div className="mt-6">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-2.5 text-sm font-bold uppercase tracking-widest text-on-surface transition hover:border-primary/40 hover:bg-surface-container"
            >
              Вся подборка
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
