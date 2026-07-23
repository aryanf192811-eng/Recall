import { Link } from 'react-router-dom';
import type { EntityType } from '../types';

const TYPE_ICONS: Record<EntityType, string> = {
  person: 'person',
  organization: 'domain',
  law: 'gavel',
  location: 'location_on',
};

const TYPE_COLORS: Record<EntityType, string> = {
  person: 'text-cat-shutdown border-cat-shutdown/40 bg-blue-50',
  organization: 'text-cat-statement border-cat-statement/40 bg-purple-50',
  law: 'text-cat-legal border-cat-legal/40 bg-orange-50',
  location: 'text-cat-ground border-cat-ground/40 bg-green-50',
};

interface Props { id: string; name: string; type: EntityType }

export default function EntityPill({ id, name, type }: Props) {
  return (
    <Link
      to={`/officer/${id}`}
      className={`inline-flex items-center gap-1 border px-2 py-1 font-label-tag text-label-tag uppercase no-underline transition-opacity hover:opacity-80 ${TYPE_COLORS[type]}`}
      aria-label={`View ${type}: ${name}`}
    >
      <span className="material-symbols-outlined text-[12px]">{TYPE_ICONS[type]}</span>
      {name}
    </Link>
  );
}
