import { YOUTUBE_SHORTS_URL } from "@/lib/site";

export type MediaPublisher = {
  id: string;
  name: string;
  logoLabel: string;
};

export const MEDIA_PUBLISHERS: MediaPublisher[] = [
  { id: "mk", name: "Московский комсомолец", logoLabel: "МК" },
  { id: "severgazbank", name: "Газета Севергазбанка", logoLabel: "Севергазбанк" },
  { id: "youtube", name: "YouTube", logoLabel: "YouTube" },
];
export type MediaItemType = "article" | "video";
export type MediaAccent = "youtube" | "mk" | "severgazbank";

export type MediaItem = {
  id: string;
  type: MediaItemType;
  category: string;
  publisher: string;
  title: string;
  description: string;
  url: string;
  featured: boolean;
  accent: MediaAccent;
  publishedAt?: string;
  youtubeId?: string;
};

const ruMediaItems: MediaItem[] = [
  {
    id: "youtube-ai-business",
    type: "video",
    category: "ИНТЕРВЬЮ",
    publisher: "YouTube",
    title: "Внедрение AI в бизнес — экспертное интервью",
    description: "Как компании переходят от пилотов к production AI-системам и что важно на этапе закупки.",
    url: YOUTUBE_SHORTS_URL,
    featured: true,
    accent: "youtube",
    youtubeId: "5DQzO5aPS5A",
    publishedAt: "2025-09-01",
  },
  {
    id: "mk-ai-teachers",
    type: "article",
    category: "ЭКСПЕРТНЫЙ КОММЕНТАРИЙ",
    publisher: "Московский комсомолец",
    title: "Как искусственный интеллект меняет работу преподавателей",
    description:
      "Комментарий о возможностях и ограничениях AI при автоматической проверке учебных работ.",
    url: "https://www.mk-mosobl.ru/social/2026/03/16/starovery-i-novatory-pedagogi-razdelilis-na-dva-lagerya-izza-vnedreniya-neyrosetey.html",
    featured: false,
    accent: "mk",
    publishedAt: "2026-03-16",
  },
  {
    id: "severgazbank-ai-developer",
    type: "article",
    category: "ЭКСПЕРТНОЕ МНЕНИЕ",
    publisher: "Газета Севергазбанка",
    title: "Почему AI — не замена программисту, а новый инструмент",
    description:
      "О роли разработчика в эпоху генеративного AI и о том, почему качество результата по-прежнему зависит от человека.",
    url: "https://gazeta.severgazbank.ru/virtuoz-i-ego-skripka-pochemu-ii-ne-zamena-programmistu-a-novyj-instrument/",
    featured: false,
    accent: "severgazbank",
    publishedAt: "2025-11-07",
  },
];

const enMediaItems: MediaItem[] = [
  {
    id: "youtube-ai-business",
    type: "video",
    category: "INTERVIEW",
    publisher: "YouTube",
    title: "Enterprise AI implementation — expert interview",
    description: "How companies move from pilots to production AI systems and what matters during procurement.",
    url: YOUTUBE_SHORTS_URL,
    featured: true,
    accent: "youtube",
    youtubeId: "5DQzO5aPS5A",
    publishedAt: "2025-09-01",
  },
  {
    id: "mk-ai-teachers",
    type: "article",
    category: "EXPERT COMMENTARY",
    publisher: "Moskovsky Komsomolets",
    title: "How artificial intelligence is changing teachers' work",
    description:
      "Commentary on the opportunities and limitations of AI in automated grading of student work.",
    url: "https://www.mk-mosobl.ru/social/2026/03/16/starovery-i-novatory-pedagogi-razdelilis-na-dva-lagerya-izza-vnedreniya-neyrosetey.html",
    featured: false,
    accent: "mk",
    publishedAt: "2026-03-16",
  },
  {
    id: "severgazbank-ai-developer",
    type: "article",
    category: "EXPERT OPINION",
    publisher: "Severgazbank Newspaper",
    title: "Why AI is not a replacement for a developer, but a new tool",
    description:
      "On the role of developers in the generative AI era and why output quality still depends on humans.",
    url: "https://gazeta.severgazbank.ru/virtuoz-i-ego-skripka-pochemu-ii-ne-zamena-programmistu-a-novyj-instrument/",
    featured: false,
    accent: "severgazbank",
    publishedAt: "2025-11-07",
  },
];

export function getMediaItems(locale: string): MediaItem[] {
  return locale === "en" ? enMediaItems : ruMediaItems;
}

export function getYoutubeThumbnail(youtubeId: string, quality: "hq" | "max" = "hq"): string {
  const file = quality === "max" ? "maxresdefault.jpg" : "hqdefault.jpg";
  return `https://i.ytimg.com/vi/${youtubeId}/${file}`;
}

export function formatMediaDate(isoDate: string, locale: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString(locale === "en" ? "en-GB" : "ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
