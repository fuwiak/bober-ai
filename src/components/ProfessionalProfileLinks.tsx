import { GITHUB_URL, LINKEDIN_URL } from "@/lib/site";

type ProfessionalProfileLinksProps = {
  founderName: string;
  founderRole: string;
  linkedinLabel: string;
  githubLabel: string;
  showName?: boolean;
  className?: string;
};

export function ProfessionalProfileLinks({
  founderName,
  founderRole,
  linkedinLabel,
  githubLabel,
  showName = true,
  className = "",
}: ProfessionalProfileLinksProps) {
  return (
    <div className={`professional-profile ${className}`.trim()}>
      {showName ? (
        <div>
          <p className="professional-profile__name">{founderName}</p>
          <p className="professional-profile__role">{founderRole}</p>
        </div>
      ) : null}
      <div className="professional-profile__links">
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="me noreferrer"
          className="professional-profile__link professional-profile__link--primary"
        >
          {linkedinLabel}
        </a>
        <a href={GITHUB_URL} target="_blank" rel="me noreferrer" className="professional-profile__link">
          {githubLabel}
        </a>
      </div>
    </div>
  );
}
