"use client";

type FilterChipProps = {
  label: string;
  count?: number;
  active?: boolean;
  onClick: () => void;
};

export function FilterChip({ label, count, active, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`filter-chip ${active ? "filter-chip-active" : ""}`}
      aria-pressed={active}
    >
      <span>{label}</span>
      {count !== undefined ? <span className="filter-chip-count">{count}</span> : null}
    </button>
  );
}
