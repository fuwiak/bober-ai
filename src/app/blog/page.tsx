import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site";

const mediumPlaceholders = [
  "Последний пост из Medium появится здесь",
  "Второй пост из Medium появится здесь",
  "Третий пост из Medium появится здесь",
];

const habrPlaceholders = [
  "Последняя статья с Habr появится здесь",
  "Вторая статья с Habr появится здесь",
  "Третья статья с Habr появится здесь",
];

const MEDIUM_URL = "https://medium.com/@stasinskipawel";
const HABR_URL = "https://habr.com/ru/users/fuwiak/articles/";

export const metadata: Metadata = {
  title: "Блог Kinetic AI",
  description:
    "Публикации Kinetic AI о внедрении AI, облачных LLM, приватных моделях, DevOps и автоматизации.",
  alternates: {
    canonical: absoluteUrl("/blog"),
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-primary font-bold uppercase tracking-widest text-xs font-body">
              Блог Kinetic AI
            </span>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">Публикации и статьи</h1>
            <p className="mt-3 max-w-2xl text-on-surface-variant">
              Здесь собираются материалы о практике внедрения AI: облачные LLM, чат-боты, приватные модели, DevOps и
              автоматизация. По умолчанию показываем последние посты с Medium и Habr.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-2 text-sm font-bold uppercase tracking-widest text-on-surface transition hover:bg-surface-container"
          >
            На главную
          </Link>
        </div>

        <section className="mb-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-primary font-bold uppercase tracking-widest text-xs font-body">
                Medium
              </span>
              <h2 className="mt-1 text-2xl md:text-3xl font-bold tracking-tight">Последние посты с Medium</h2>
              <p className="mt-2 text-on-surface-variant text-sm">
                Профиль: <span className="font-semibold text-on-surface">@stasinskipawel</span>
              </p>
            </div>
            <a
              href={MEDIUM_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-primary px-4 py-2 text-sm font-bold uppercase tracking-widest text-on-primary transition hover:opacity-90"
            >
              Открыть Medium
            </a>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {mediumPlaceholders.map((title, idx) => (
              <a
                key={idx}
                href={MEDIUM_URL}
                target="_blank"
                rel="noreferrer"
                className="group rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm transition hover:border-primary/40"
              >
                <div className="h-32 rounded-2xl border border-dashed border-outline-variant/40 bg-surface-container-low grid place-items-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    Medium · пост {idx + 1}
                  </p>
                </div>
                <h3 className="mt-4 text-lg font-bold text-on-surface group-hover:text-primary">{title}</h3>
                <p className="mt-2 text-sm text-on-surface-variant">
                  Автосинхронизация с профилем Medium появится здесь.
                </p>
              </a>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-primary font-bold uppercase tracking-widest text-xs font-body">
                Habr
              </span>
              <h2 className="mt-1 text-2xl md:text-3xl font-bold tracking-tight">Статьи на Habr</h2>
              <p className="mt-2 text-on-surface-variant text-sm">
                Профиль: <span className="font-semibold text-on-surface">@fuwiak</span>
              </p>
            </div>
            <a
              href={HABR_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-primary px-4 py-2 text-sm font-bold uppercase tracking-widest text-on-primary transition hover:opacity-90"
            >
              Открыть Habr
            </a>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {habrPlaceholders.map((title, idx) => (
              <a
                key={idx}
                href={HABR_URL}
                target="_blank"
                rel="noreferrer"
                className="group rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm transition hover:border-primary/40"
              >
                <div className="h-32 rounded-2xl border border-dashed border-outline-variant/40 bg-surface-container-low grid place-items-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    Habr · статья {idx + 1}
                  </p>
                </div>
                <h3 className="mt-4 text-lg font-bold text-on-surface group-hover:text-primary">{title}</h3>
                <p className="mt-2 text-sm text-on-surface-variant">
                  Автосинхронизация с профилем Habr появится здесь.
                </p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
