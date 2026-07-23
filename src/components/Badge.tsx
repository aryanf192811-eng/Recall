import type { Category, VerificationStatus } from '../types';

const CATEGORY_LABELS: Record<Category, string> = {
  violence: 'Violence',
  legal: 'Legal',
  shutdown: 'Shutdown',
  statement: 'Statement',
  other: 'Other',
};

const CATEGORY_COLORS: Record<Category, string> = {
  violence: 'text-cat-violence bg-red-50 border-cat-violence/30',
  legal: 'text-cat-legal bg-orange-50 border-cat-legal/30',
  shutdown: 'text-cat-shutdown bg-blue-50 border-cat-shutdown/30',
  statement: 'text-cat-statement bg-purple-50 border-cat-statement/30',
  other: 'text-on-surface-variant bg-surface-container border-border-tan',
};

export function CategoryTag({ category }: { category: Category }) {
  return (
    <span
      className={`font-label-tag text-label-tag uppercase tracking-wider border px-2 py-1 ${CATEGORY_COLORS[category]}`}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}

const STATUS_CONFIG: Record<VerificationStatus, { label: string; cls: string; icon: string }> = {
  verified: {
    label: 'Verified Record',
    cls: 'text-status-verified border-status-verified bg-green-50',
    icon: 'verified',
  },
  reported: {
    label: 'Reported',
    cls: 'text-status-reported border-status-reported bg-orange-50',
    icon: 'pending',
  },
  disputed: {
    label: 'Disputed',
    cls: 'text-status-disputed border-status-disputed bg-red-50',
    icon: 'cancel',
  },
  pending: {
    label: 'Pending Verification',
    cls: 'text-archive-gold border-archive-gold bg-yellow-50',
    icon: 'warning',
  },
};

export function Badge({ status }: { status: VerificationStatus }) {
  const { label, cls, icon } = STATUS_CONFIG[status];
  return (
    <span className={`flex items-center gap-1 border px-2 py-1 font-label-tag text-label-tag uppercase ${cls}`}>
      <span className="material-symbols-outlined fill text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
        {icon}
      </span>
      {label}
    </span>
  );
}
