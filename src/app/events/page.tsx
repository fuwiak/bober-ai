import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Мероприятия",
  description: "Подборка актуальных AI-мероприятий и событий от технологических партнеров Kinetic AI.",
  alternates: {
    canonical: absoluteUrl("/events"),
  },
};

const events = [
  {
    title: "ML Conf Selectel",
    description: "Конференция по ML/AI-инфраструктуре, практикам внедрения и инженерным кейсам.",
    url: "https://mlconf.selectel.ru/#rega",
  },
  {
    title: "Yandex Cloud Events",
    description: "Мероприятия Yandex Cloud: вебинары, анонсы, обучающие и отраслевые события.",
    url: "https://yandex.cloud/ru/events",
  },
];

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-primary font-bold uppercase tracking-widest text-xs font-body">
              Kinetic AI
            </span>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">Мероприятия</h1>
            <p className="mt-3 max-w-2xl text-on-surface-variant">
              Подборка актуальных AI-мероприятий наших технологических партнеров.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-2 text-sm font-bold uppercase tracking-widest text-on-surface transition hover:bg-surface-container"
          >
            На главную
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {events.map((event) => (
            <a
              key={event.url}
              href={event.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm transition hover:border-primary/40 hover:shadow-md"
            >
              <span className="inline-flex rounded-full bg-primary/12 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
                external
              </span>
              <h2 className="mt-4 text-xl font-bold text-on-surface">{event.title}</h2>
              <p className="mt-2 text-sm text-on-surface-variant">{event.description}</p>
              <p className="mt-4 text-sm text-primary break-all">{event.url}</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
