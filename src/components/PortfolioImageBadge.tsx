import { BadgePercent } from "lucide-react";

type PortfolioImageBadgeProps = {
  label: string;
};

/** Corner offer badge on portfolio screenshots. */
export function PortfolioImageBadge({ label }: PortfolioImageBadgeProps) {
  return (
    <span className="portfolio-image-badge" aria-label={label}>
      <BadgePercent className="portfolio-image-badge__icon" aria-hidden="true" />
      <span className="portfolio-image-badge__text">{label}</span>
    </span>
  );
}
