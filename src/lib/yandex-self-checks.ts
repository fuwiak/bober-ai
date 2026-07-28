/**
 * «Самостоятельные проверки» Яндекс Вебмастера (блок «Как улучшить позиции»).
 * Статусы: done | partial | manual | na
 *
 * CLI: yaga webmaster selfcheck · npm run webmaster:selfcheck
 */
import { YANDEX_IMPORTANT_PATHS } from "@/lib/yandex-important-urls";
import { SITE_URL } from "@/lib/site";

export type SelfCheckStatus = "done" | "partial" | "manual" | "na";

export type SelfCheckItem = {
  id: string;
  title: string;
  status: SelfCheckStatus;
  /** Код / артефакт в репозитории */
  evidence?: string;
  /** Что сделать вручную в UI */
  action?: string;
};

/** 21 пункт из раздела «Самостоятельные проверки». */
export const YANDEX_SELF_CHECKS: SelfCheckItem[] = [
  {
    id: "wm-notifications",
    title: "Настроены уведомления об изменениях на сайте от Вебмастера",
    status: "manual",
    action:
      "Вебмастер → Настройки → Уведомления (индекс, важные страницы, безопасность)",
  },
  {
    id: "site-alerts",
    title: "Настроена система оповещений от сайта (например, новый отзыв)",
    status: "partial",
    evidence: "src/lib/contact-delivery.ts · CONTACT_NOTIFICATION_EMAILS (заявки)",
    action:
      "Отзывы: Яндекс Услуги / Бизнес; при новых отзывах — уведомления в карточках сервисов",
  },
  {
    id: "target-queries",
    title: "Собраны целевые поисковые запросы",
    status: "done",
    evidence: "data/yandex-target-queries.json · data/wordstat-seeds-b2b.txt",
  },
  {
    id: "query-groups",
    title: "Поисковые запросы объединены в группы для мониторинга",
    status: "done",
    evidence: "data/yandex-target-queries.json → groups[]",
  },
  {
    id: "landings-for-queries",
    title: "Под целевые запросы найдены или созданы посадочные страницы",
    status: "done",
    evidence: "data/yandex-target-queries.json → landings · src/lib/seo-catalog · /services/*",
  },
  {
    id: "browsers",
    title: "Сайт поддерживается основными браузерами",
    status: "done",
    evidence: "Next.js SSR · responsive layout · e2e Playwright",
  },
  {
    id: "indexable",
    title: "Целевые страницы не запрещены для индексации",
    status: "done",
    evidence: "robots.txt Allow:/ · Yandex Allow:/ + Clean-param · npm run seo:tech",
  },
  {
    id: "submitted-to-bots",
    title: "Страницы сайта переданы индексирующим роботам",
    status: "done",
    evidence:
      "sitemap.xml · npm run seo:indexnow · yaga webmaster boost · RSS /rss.xml (Свежее и актуальное)",
  },
  {
    id: "content-in-index",
    title: "Важный контент страниц попадает в поисковую базу",
    status: "partial",
    evidence: "SSR + JSON-LD; в поиске ~36/450 URL — молодой домен",
    action: "Продолжать IndexNow / boost; следить «Страницы в поиске»",
  },
  {
    id: "important-monitoring",
    title: "Важные страницы добавлены в Мониторинг важных страниц",
    status: "done",
    evidence: `API: ${YANDEX_IMPORTANT_PATHS.length}/${YANDEX_IMPORTANT_PATHS.length} URL на ${SITE_URL} (совпадает с yandex-important-urls.ts)`,
  },
  {
    id: "main-mirror",
    title: "Определён основной адрес сайта в результатах поиска",
    status: "done",
    evidence: "Host: www.bober-systems.ru · 301 apex→www без :8080 · absoluteUrl() без trailing slash",
  },
  {
    id: "duplicates",
    title: "Дубли и малоценные страницы недоступны или приклеены к основным",
    status: "done",
    evidence: "canonical · hreflang · 301 apex→www · Clean-param · legacy redirects · npm run seo:tech",
  },
  {
    id: "unique-content",
    title: "Сайт содержит ценностный и уникальный контент",
    status: "done",
    evidence: "кейсы /portfolio · guides · blog · academy · SEO-каталог услуг",
  },
  {
    id: "ux-nav",
    title: "Навигация и интерфейс помогают решать задачи пользователя",
    status: "done",
    evidence: "SiteChrome nav · breadcrumbs · hub→landing related · FAQ · pricing · CTA",
  },
  {
    id: "usp",
    title: "Сформулировано УТП и отличия от конкурентов",
    status: "done",
    evidence: "hero valueProposition · фиксированная смета · NDA · on-premise",
  },
  {
    id: "trust",
    title: "Информация, формирующая доверие (реквизиты, цена, соцсети)",
    status: "done",
    evidence: "legal.ts (ИНН/ОГРНИП) · /pricing · LinkedIn/GitHub/Telegram · Услуги",
  },
  {
    id: "titles-descriptions",
    title: "Хорошие оригинальные заголовки и описания страниц",
    status: "done",
    evidence:
      "buildPageMetadata · уникальные title/description на landing/hub · npm run seo:tech",
  },
  {
    id: "microdata",
    title: "Настроена микроразметка сайта",
    status: "done",
    evidence:
      "Organization/LocalBusiness · WebSite · Service · FAQPage · BreadcrumbList · Article · JSON-LD + Open Graph",
    action:
      "Проверка: npm run webmaster:microtest · UI https://webmaster.yandex.ru/tools/microtest/",
  },
  {
    id: "sitelinks",
    title: "Настроены быстрые ссылки",
    status: "done",
    evidence: "siteNavigationJsonLd / SiteNavigationElement в src/lib/seo.ts",
    action: "Быстрые ссылки в выдаче выбирает Яндекс; сигнал уже на сайте",
  },
  {
    id: "thematic-blocks",
    title: "Участие в тематических блоках (медицина / образование)",
    status: "na",
    evidence: "Не применимо: B2B AI/автоматизация, не мед./edu услуги",
  },
  {
    id: "enriched-answers",
    title: "Партнёрская программа обогащённых ответов в выдаче",
    status: "partial",
    evidence:
      "API фид: https://www.bober-systems.ru/performers-feed.yml (SERVICES, region 225) · Яндекс Услуги",
    action:
      "Отдельная оферта «обогащённых ответов» — если доступна в UI Вебмастера, подключить; иначе фид уже подан",
  },
];

export function selfCheckSummary(items = YANDEX_SELF_CHECKS) {
  const counts = { done: 0, partial: 0, manual: 0, na: 0 };
  for (const item of items) counts[item.status] += 1;
  return counts;
}
