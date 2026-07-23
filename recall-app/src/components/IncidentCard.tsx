import { useNavigate } from 'react-router-dom';
import { CategoryTag, Badge } from './Badge';
import type { Incident } from '../types';

interface Props {
  incident: Incident;
  compact?: boolean;
  image?: string;
}

export default function IncidentCard({ incident, compact = false, image }: Props) {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/archive/incident/${incident.id}`)}
      className={`bg-surface-white border border-border-tan flex flex-col hover:border-outline-variant transition-colors cursor-pointer group overflow-hidden`}
    >
      {image && !compact && (
        <div className="w-full h-48 overflow-hidden relative border-b border-border-tan bg-ink-black">
          <img 
            src={image} 
            alt={incident.title} 
            className="w-full h-full object-cover grayscale contrast-125 mix-blend-luminosity opacity-80 group-hover:scale-105 group-hover:mix-blend-normal group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
          />
          <div className="absolute inset-0 bg-archive-gold opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      )}
      <div className={`flex flex-col gap-4 ${compact ? 'p-4' : 'p-6'}`}>
        {/* Header Row: ID, Badges, Date */}
        <div className="flex flex-wrap items-center gap-3">
        <span className="font-data-mono text-data-mono text-on-surface-variant uppercase">
          ID: {incident.id}
        </span>
        <CategoryTag category={incident.category} />
        <Badge status={incident.status} />
        <span className="font-data-mono text-data-mono text-secondary-grey ml-auto whitespace-nowrap">
          {new Date(incident.date).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }).replace(/\//g, '.')}
        </span>
      </div>

      {/* Title */}
      <h2
        className={`font-headline-md text-headline-md text-ink-black group-hover:text-secondary transition-colors ${
          compact ? 'text-[20px] leading-tight' : ''
        }`}
      >
        {incident.title}
      </h2>

      {/* Description */}
      {!compact && (
        <p className="font-body-text text-body-text text-on-surface-variant line-clamp-3">
          {incident.description}
        </p>
      )}

      {/* Footer: Location & Causal Links */}
      <div className="flex flex-wrap items-center gap-4 mt-2">
        <div className="flex items-center gap-1 text-secondary-grey">
          <span className="material-symbols-outlined text-[16px]">location_on</span>
          <span className="font-label-tag text-label-tag uppercase">{incident.location}</span>
        </div>

        {(!compact && (incident.triggeredBy.length > 0 || incident.ledTo.length > 0)) && (
          <div className="flex items-center gap-2 ml-auto">
            <span className="font-label-tag text-label-tag text-secondary-grey uppercase tracking-widest">
              Causal Links:
            </span>
            <div className="flex items-center gap-1">
              <span className="font-data-mono text-data-mono text-on-surface-variant">
                {incident.triggeredBy.length + incident.ledTo.length} total
              </span>
            </div>
          </div>
        )}
      </div>
      </div>
    </article>
  );
}
