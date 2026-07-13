type EditorialImageFrameProps = {
  children: React.ReactNode;
  variant?: "hero" | "portrait" | "card" | "media";
  className?: string;
};

export function EditorialImageFrame({
  children,
  variant = "card",
  className = "",
}: EditorialImageFrameProps) {
  return (
    <div className={`editorial-image editorial-image--${variant} ${className}`.trim()}>
      {children}
      <span className="editorial-image__overlay" aria-hidden="true" />
      <span className="editorial-image__shine" aria-hidden="true" />
    </div>
  );
}
