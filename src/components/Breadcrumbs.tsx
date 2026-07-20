import { Link } from "@/i18n/navigation";
import { pageBreadcrumbJsonLd } from "@/lib/seo";

export type BreadcrumbCrumb = {
  name: string;
  /** Path without locale prefix (`/services`). Current page included. */
  path: string;
};

type BreadcrumbsProps = {
  locale: string;
  items: BreadcrumbCrumb[];
  className?: string;
  /** When false, only visible trail (JSON-LD already emitted elsewhere). */
  jsonLd?: boolean;
};

/**
 * Visible breadcrumb trail + Schema.org BreadcrumbList.
 * Helps Yandex build «навигационная цепочка» in search snippets.
 */
export function Breadcrumbs({ locale, items, className = "", jsonLd = true }: BreadcrumbsProps) {
  const homeLabel = locale === "en" ? "Home" : "Главная";
  const ariaLabel = locale === "en" ? "Breadcrumb" : "Навигационная цепочка";
  const schema = jsonLd ? pageBreadcrumbJsonLd(locale, items) : null;

  return (
    <>
      {schema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ) : null}
      <nav aria-label={ariaLabel} className={`breadcrumbs ${className}`.trim()}>
        <ol className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link href="/" className="breadcrumbs__link">
              {homeLabel}
            </Link>
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li
                key={`${item.path}-${item.name}`}
                className="breadcrumbs__item"
                {...(isLast ? { "aria-current": "page" as const } : {})}
              >
                {isLast ? (
                  <span className="breadcrumbs__current">{item.name}</span>
                ) : (
                  <Link href={item.path as "/"} className="breadcrumbs__link">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
