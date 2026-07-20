export type AcademyPost = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  readingTime: string;
  tags: string[];
  steps: string[];
  commands: string[];
  note?: string;
};

export const ACADEMY_POSTS: AcademyPost[] = [
  {
    slug: "install-yaga",
    title: "Установка yaga и первый запуск",
    summary:
      "yaga — модульный Yandex CLI (Go + Bubble Tea). Каждый сервис Яндекса — отдельный brick: webmaster, metrika, cloud, gpt и другие.",
    publishedAt: "2026-07-20",
    readingTime: "4 мин",
    tags: ["yaga", "CLI", "TUI"],
    steps: [
      "Установите Go 1.22 или новее, затем в корне клонированного репозитория выполните npm run yaga:install — команда соберёт бинарь и создаст запускатель в ~/bin/yaga.",
      "Запустите yaga без аргументов: откроется TUI с вкладками Bricks, Creds, Doctor, Output, Help.",
      "Проверьте окружение: yaga doctor — покажет наличие токенов и внешних бинарей (yc, yandex-disk и т.д.).",
      "Список bricks: yaga bricks. Спрятать owner-bricks для чужого окружения: yaga profile public.",
    ],
    commands: [
      "npm run yaga:install",
      "yaga",
      "yaga doctor",
      "yaga bricks",
      "yaga profile public",
    ],
  },
  {
    slug: "oauth-clientid-vs-token",
    title: "OAuth: ClientID ≠ access token",
    summary:
      "Частая ошибка: сохранить Client ID и Client secret и ждать, что API заработает. Для Вебмастера нужен access token вида y0_…",
    publishedAt: "2026-07-20",
    readingTime: "5 мин",
    tags: ["OAuth", "Webmaster", "credentials"],
    steps: [
      "Создайте приложение на oauth.yandex.ru → Мои приложения и скопируйте ClientID и Client secret.",
      "Сохраните их: yaga credentials set YANDEX_WEBMASTER_CLIENT_ID … и YANDEX_WEBMASTER_CLIENT_SECRET …",
      "Один раз обменяйте code на token: yaga webmaster oauth — откроется браузер, после кода token попадёт в ~/.config/yaga/credentials.env.",
      "Проверка: yaga credentials (список ключей и ссылок на UI) и yaga webmaster status.",
    ],
    commands: [
      "yaga credentials set YANDEX_WEBMASTER_CLIENT_ID <id>",
      "yaga credentials set YANDEX_WEBMASTER_CLIENT_SECRET <secret>",
      "yaga webmaster oauth",
      "yaga webmaster status",
    ],
    note: "Секреты хранятся в ~/.config/yaga/credentials.env с правами файла 0600. Не добавляйте этот файл, token или Client Secret в Git и скриншоты.",
  },
  {
    slug: "webmaster-seo-checklist",
    title: "SEO-чеклист Вебмастера",
    summary:
      "Brick webmaster дергает скрипты репозитория: статус, ИКС, диагностику, индекс, важные URL и переобход страниц.",
    publishedAt: "2026-07-20",
    readingTime: "5 мин",
    tags: ["SEO", "Webmaster", "ИКС"],
    steps: [
      "Снимок Вебмастер + Метрика: yaga webmaster status (алиас: yaga wm status).",
      "Чеклист позиций: yaga webmaster seo — ИКС, диагностика, индекс, запросы.",
      "Перед переобходом проверьте дневную квоту: yaga webmaster recrawl --quota.",
      "Фид исполнителей и зеркала: yaga webmaster feed · yaga webmaster mirrors.",
    ],
    commands: [
      "yaga webmaster status",
      "yaga webmaster seo",
      "yaga webmaster recrawl --quota",
      "yaga webmaster recrawl https://www.bober-ai.dev/",
      "yaga webmaster feed",
    ],
    note: "Отчёт читает данные API и не меняет настройки сайта. Отсутствие критических ошибок не гарантирует индексацию или высокую позицию.",
  },
  {
    slug: "safe-recrawl",
    title: "Безопасный переобход изменённой страницы",
    summary:
      "Переобход сообщает роботу о новой или заметно обновлённой странице, но не гарантирует её индексацию или рост позиции.",
    publishedAt: "2026-07-20",
    readingTime: "4 мин",
    tags: ["recrawl", "индексация", "квота"],
    steps: [
      "Сначала убедитесь, что URL возвращает HTTP 200, не закрыт в robots.txt и содержит правильный canonical.",
      "Проверьте остаток дневного лимита командой yaga webmaster recrawl --quota.",
      "Передайте полный URL в yaga webmaster recrawl. При успехе CLI выведет task_id и оставшуюся квоту.",
      "После обработки проверяйте не только обход, но и статус страницы в поиске через Yandex Webmaster.",
    ],
    commands: [
      "curl -I https://www.bober-ai.dev/academy",
      "yaga webmaster recrawl --quota",
      "yaga webmaster recrawl https://www.bober-ai.dev/academy",
    ],
    note: "Квота возвращается самим Webmaster API и может отличаться между сайтами. Отправка URL не задаёт срок появления страницы в поиске.",
  },
];

export function getAcademyPost(slug: string): AcademyPost | undefined {
  return ACADEMY_POSTS.find((post) => post.slug === slug);
}
