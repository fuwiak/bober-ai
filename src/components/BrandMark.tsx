export function BrandMark({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M8 0 9.2 6.8 16 8 9.2 9.2 8 16 6.8 9.2 0 8 6.8 6.8Z" />
    </svg>
  );
}
