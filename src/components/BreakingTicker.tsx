import type { Incident } from '../types';
import { Link } from 'react-router-dom';

interface Props { incident: Incident }

export default function BreakingTicker({ incident }: Props) {
  const text = `BREAKING: ${incident.title} — ${incident.location}`;
  const doubled = `${text}     ·     ${text}     ·     ${text}     ·     ${text}     ·     `;

  return (
    <div
      className="bg-press-red overflow-hidden flex items-center"
      style={{ height: '36px' }}
      aria-live="polite"
    >
      <span className="font-label-tag text-label-tag font-bold text-on-secondary uppercase tracking-widest px-4 shrink-0 border-r border-red-600">
        BREAKING
      </span>
      <div className="flex-1 overflow-hidden">
        <span className="ticker-track font-label-tag text-label-tag text-on-secondary" style={{ fontSize: '13px' }}>
          {doubled}
        </span>
      </div>
      <Link
        to={`/breaking/${incident.id}`}
        className="shrink-0 px-3 font-label-tag text-label-tag text-on-secondary hover:underline no-underline flex items-center gap-1 border-l border-red-600"
      >
        READ
        <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>open_in_new</span>
      </Link>
    </div>
  );
}
