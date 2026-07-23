import type { Category } from '../types';

interface FilterChipProps {
  label: string;
  value: Category | 'all';
  active: boolean;
  onClick: (value: Category | 'all') => void;
}

export default function FilterChip({ label, value, active, onClick }: FilterChipProps) {
  return (
    <button
      onClick={() => onClick(value)}
      className="font-ui font-semibold uppercase tracking-wider transition-all cursor-pointer"
      style={{
        fontSize: '11px',
        height: '26px',
        padding: '0 12px',
        border: active ? '1px solid var(--ink)' : '1px solid var(--border)',
        borderRadius: '100px',
        background: active ? 'var(--ink)' : 'transparent',
        color: active ? 'var(--white)' : 'var(--grey)',
        letterSpacing: '0.08em',
        cursor: 'pointer',
        transition: 'all 0.15s',
      }}
      aria-pressed={active}
      aria-label={`Filter by ${label}`}
    >
      {label}
    </button>
  );
}
