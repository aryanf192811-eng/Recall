import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Incident } from '../types';
import { CategoryTag, Badge } from './Badge';
import EntityPill from './EntityPill';
import { useApp } from '../context/AppContext';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

interface Props {
  incident: Incident | null;
  onClose: () => void;
}

export default function SidePanel({ incident, onClose }: Props) {
  const { state } = useApp();
  const isOpen = !!incident;

  if (!incident) return null;

  const entities = incident.entityIds
    .map((id) => state.entities.find((e) => e.id === id))
    .filter(Boolean);
  const triggeredBy = incident.triggeredBy
    .map((id) => state.incidents.find((i) => i.id === id))
    .filter(Boolean) as Incident[];
  const ledTo = incident.ledTo
    .map((id) => state.incidents.find((i) => i.id === id))
    .filter(Boolean) as Incident[];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.2)',
          zIndex: 200,
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 260ms ease',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        aria-hidden="true"
      />
      {/* Panel */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '380px',
          maxWidth: '100vw',
          background: 'var(--white)',
          borderLeft: '1px solid var(--border)',
          zIndex: 201,
          overflowY: 'auto',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 260ms cubic-bezier(0.16,1,0.3,1)',
        }}
        aria-label="Incident details"
        role="complementary"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 sticky top-0"
          style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', zIndex: 1 }}
        >
          <span className="font-mono" style={{ fontSize: '10px', color: 'var(--grey)' }}>{incident.id}</span>
          <div className="flex items-center gap-3">
            <Link
              to={`/archive/incident/${incident.id}`}
              className="font-ui font-semibold flex items-center gap-1 no-underline hover:underline"
              style={{ fontSize: '12px', color: 'var(--ink)' }}
              onClick={onClose}
            >
              Open full page <ExternalLink size={11} />
            </Link>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-opacity-10"
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--grey)' }}
              aria-label="Close panel"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Category + Status */}
          <div className="flex items-center gap-3">
            <CategoryTag category={incident.category} />
            <Badge status={incident.status} />
          </div>

          {/* Title */}
          <h2 className="font-display font-bold" style={{ fontSize: '20px', lineHeight: 1.3 }}>
            {incident.title}
          </h2>

          {/* Meta */}
          <p className="font-ui" style={{ fontSize: '12px', color: 'var(--grey)' }}>
            {new Date(incident.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            {' · '}{incident.location}
          </p>

          {/* Description */}
          <p className="font-body" style={{ fontSize: '14px', lineHeight: '1.8', color: 'var(--ink)' }}>
            {incident.description}
          </p>

          {/* Entities */}
          {entities.length > 0 && (
            <div>
              <h4 className="font-ui font-semibold uppercase tracking-wider mb-2" style={{ fontSize: '10px', color: 'var(--grey)' }}>
                Entities
              </h4>
              <div className="flex flex-wrap gap-2">
                {entities.map((entity) => entity && (
                  <EntityPill key={entity.id} id={entity.id} name={entity.name} type={entity.type} />
                ))}
              </div>
            </div>
          )}

          {/* Causality */}
          {(triggeredBy.length > 0 || ledTo.length > 0) && (
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
              <h4 className="font-ui font-semibold uppercase tracking-wider mb-3" style={{ fontSize: '10px', color: 'var(--grey)' }}>
                Causal Links
              </h4>
              {triggeredBy.map((prev) => (
                <Link
                  key={prev.id}
                  to={`/archive/incident/${prev.id}`}
                  className="flex items-start gap-2 font-ui no-underline hover:underline mb-2"
                  style={{ fontSize: '12px', color: 'var(--grey)' }}
                  onClick={onClose}
                >
                  <ArrowLeft size={12} className="mt-0.5 shrink-0" />
                  <span><strong>Triggered by:</strong> {prev.title}</span>
                </Link>
              ))}
              {ledTo.map((next) => (
                <Link
                  key={next.id}
                  to={`/archive/incident/${next.id}`}
                  className="flex items-start gap-2 font-ui no-underline hover:underline mb-2"
                  style={{ fontSize: '12px', color: 'var(--grey)' }}
                  onClick={onClose}
                >
                  <ArrowRight size={12} className="mt-0.5 shrink-0" />
                  <span><strong>Led to:</strong> {next.title}</span>
                </Link>
              ))}
            </div>
          )}

          {/* Sources */}
          {incident.sources.length > 0 && (
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
              <h4 className="font-ui font-semibold uppercase tracking-wider mb-2" style={{ fontSize: '10px', color: 'var(--grey)' }}>
                Sources
              </h4>
              <div className="flex flex-wrap gap-2">
                {incident.sources.map((src) => (
                  <a
                    key={src.name}
                    href={src.url}
                    className="font-ui"
                    style={{
                      fontSize: '11px',
                      padding: '3px 10px',
                      border: '1px solid var(--border)',
                      borderRadius: '3px',
                      color: 'var(--grey)',
                      textDecoration: 'none',
                    }}
                  >
                    {src.name}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Credit */}
          <p className="font-ui" style={{ fontSize: '11px', color: 'var(--grey)', fontStyle: 'italic' }}>
            Contributed by: {incident.contributorCredit}
          </p>
        </div>
      </aside>
    </>
  );
}
