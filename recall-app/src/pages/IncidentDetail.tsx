import { useParams, Link } from 'react-router-dom';
import Masthead from '../components/Masthead';
import { CategoryTag, Badge } from '../components/Badge';
import EntityPill from '../components/EntityPill';
import { useApp } from '../context/AppContext';

export default function IncidentDetail() {
  const { id } = useParams<{ id: string }>();
  const { state } = useApp();
  const incident = state.incidents.find((i) => i.id === id);

  if (!incident) {
    return (
      <div className="bg-paper-base text-on-surface min-h-screen flex flex-col font-body-text">
        <Masthead />
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <h1 className="font-headline-md text-headline-md text-primary">Incident not found</h1>
          <Link to="/archive" className="font-label-tag text-label-tag mt-4 inline-block text-secondary-grey uppercase">
            ← Back to Archive
          </Link>
        </div>
      </div>
    );
  }

  const entities = incident.entityIds.map((eid) => state.entities.find((e) => e.id === eid)).filter(Boolean);
  const triggeredBy = incident.triggeredBy.map((tid) => state.incidents.find((i) => i.id === tid)).filter(Boolean);
  const ledTo = incident.ledTo.map((tid) => state.incidents.find((i) => i.id === tid)).filter(Boolean);

  return (
    <div className="bg-paper-base text-on-surface min-h-screen flex flex-col font-body-text selection:bg-archive-gold selection:text-white">
      <Masthead />

      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Main Content */}
        <article className="md:col-span-8 flex flex-col gap-8">
          <header className="border-b border-border-tan pb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge status={incident.status} />
              <CategoryTag category={incident.category} />
            </div>
            <h1 className="font-headline-lg text-headline-lg md:text-[56px] md:leading-[1.1] text-ink-black mb-4">
              {incident.title}
            </h1>
            <p className="font-subheadline text-subheadline text-secondary-grey">
              Logged in RECALL System by {incident.contributorCredit} · {new Date(incident.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </header>

          <section className="border border-border-tan bg-surface-white p-4">
            <div 
              className="w-full h-auto border border-border-tan shadow-sm bg-center bg-cover"
              style={{ 
                aspectRatio: '1.49', 
                backgroundColor: '#1d1c17', 
                backgroundImage: `url('${['/assets/protest.png', '/assets/street.png', '/assets/electronics.png', '/assets/transit_hub.png', '/assets/urban_slum.png', '/assets/historical_document.png', '/assets/biometric_scanner.png', '/assets/evidence_locker.png', '/assets/rain_slicked.png', '/assets/telegraph_key.png', '/assets/brass_tags.png', '/assets/mechanical_ledger.png'][(parseInt(incident.id.replace(/\\D/g, '') || '0')) % 12]}')`,
                filter: 'grayscale(100%) contrast(125%)',
                mixBlendMode: 'luminosity'
              }}
            ></div>
            <div className="mt-4 border-l-4 border-archive-gold pl-4 py-2 bg-surface-container-low">
              <h3 className="font-label-tag text-label-tag uppercase text-archive-gold mb-2 tracking-widest">
                Primary Narrative Account
              </h3>
              <p className="font-body-text text-body-text text-ink-black">
                {incident.description}
              </p>
            </div>
          </section>

          {/* Causality Tree Visualizer */}
          {(triggeredBy.length > 0 || ledTo.length > 0) && (
            <section className="mt-8">
              <h2 className="font-headline-md text-headline-md border-b-2 border-ink-black pb-2 mb-6">Causality Path</h2>
              <div className="flex flex-col gap-4 relative before:absolute before:inset-y-0 before:left-4 before:w-px before:bg-border-tan">
                
                {triggeredBy.map(prev => prev && (
                  <div key={prev.id} className="relative pl-12">
                    <span className="absolute left-[11px] top-1 w-[10px] h-[10px] rounded-full bg-secondary-grey border-2 border-paper-base"></span>
                    <h4 className="font-subheadline text-subheadline text-ink-black">
                      <Link to={`/archive/incident/${prev.id}`} className="hover:text-primary transition-colors no-underline text-inherit">
                        Triggered By: {prev.title}
                      </Link>
                    </h4>
                    <p className="font-body-text text-body-text text-secondary-grey mt-1">{prev.date}</p>
                  </div>
                ))}
                
                <div className="relative pl-12">
                  <span className="absolute left-[11px] top-1 w-[10px] h-[10px] rounded-full bg-archive-gold border-2 border-paper-base"></span>
                  <h4 className="font-subheadline text-subheadline text-ink-black font-bold">This Incident</h4>
                  <p className="font-body-text text-body-text text-secondary-grey mt-1">{incident.id}</p>
                </div>
                
                {ledTo.map(next => next && (
                  <div key={next.id} className="relative pl-12">
                    <span className="absolute left-[11px] top-1 w-[10px] h-[10px] rounded-full bg-ink-black border-2 border-paper-base"></span>
                    <h4 className="font-subheadline text-subheadline text-ink-black">
                      <Link to={`/archive/incident/${next.id}`} className="hover:text-primary transition-colors no-underline text-inherit">
                        Led To: {next.title}
                      </Link>
                    </h4>
                    <p className="font-body-text text-body-text text-secondary-grey mt-1">{next.date}</p>
                  </div>
                ))}

              </div>
            </section>
          )}

          {/* Entities */}
          {entities.length > 0 && (
            <section className="mt-8">
              <h2 className="font-headline-md text-headline-md border-b border-border-tan pb-2 mb-6">Entities Involved</h2>
              <div className="flex flex-wrap gap-3">
                {entities.map(entity => entity && (
                  <EntityPill key={entity.id} id={entity.id} name={entity.name} type={entity.type} />
                ))}
              </div>
            </section>
          )}
        </article>

        {/* Sidebar */}
        <aside className="md:col-span-4 flex flex-col gap-6">
          <div className="border-2 border-ink-black bg-surface-white p-6 sticky top-[100px]">
            <h3 className="font-headline-md text-headline-md text-ink-black uppercase tracking-wider mb-6 border-b border-border-tan pb-2">
              Quick Facts
            </h3>
            <ul className="flex flex-col gap-4 p-0 m-0 list-none">
              <li className="flex justify-between items-center border-b border-border-tan border-dashed pb-2">
                <span className="font-label-tag text-label-tag text-secondary-grey uppercase tracking-widest">ID</span>
                <span className="font-data-mono text-data-mono text-ink-black font-bold">{incident.id}</span>
              </li>
              <li className="flex justify-between items-center border-b border-border-tan border-dashed pb-2">
                <span className="font-label-tag text-label-tag text-secondary-grey uppercase tracking-widest">Location</span>
                <span className="font-data-mono text-data-mono text-ink-black font-bold text-right pl-4">{incident.location}</span>
              </li>
              <li className="flex justify-between items-center border-b border-border-tan border-dashed pb-2">
                <span className="font-label-tag text-label-tag text-secondary-grey uppercase tracking-widest">Category</span>
                <span className={`font-data-mono text-data-mono font-bold uppercase text-cat-${incident.category}`}>{incident.category}</span>
              </li>
              <li className="flex justify-between items-center pb-2">
                <span className="font-label-tag text-label-tag text-secondary-grey uppercase tracking-widest">Sources</span>
                <span className="font-data-mono text-data-mono text-ink-black font-bold">{incident.sources.length} Verified</span>
              </li>
            </ul>
            
            <div className="mt-8 flex flex-col gap-3">
              <Link to={`/live/${incident.id}`} className="w-full text-center border-2 border-ink-black text-ink-black font-label-tag text-label-tag uppercase py-3 hover:bg-ink-black hover:text-white transition-colors duration-200 no-underline">
                View Live Feed
              </Link>
              <Link to="/web" className="w-full text-center border-2 border-ink-black text-surface-white bg-ink-black font-label-tag text-label-tag uppercase py-3 hover:bg-surface-white hover:text-ink-black transition-colors duration-200 no-underline">
                Explore in Causality Web
              </Link>
            </div>
          </div>

          <div className="border border-border-tan bg-surface-container-low p-6">
            <h4 className="font-subheadline text-subheadline text-ink-black mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-archive-gold">history</span> Archival Note
            </h4>
            <p className="font-caption text-caption text-secondary-grey leading-relaxed">
              This record was unsealed following the sovereign transparency act. Portions of the raw data remain encrypted under Tier 1 restrictions.
            </p>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-highest text-on-surface-variant font-caption text-caption uppercase tracking-widest w-full border-t border-border-tan px-margin-desktop py-section-gap flex flex-col items-center gap-4 mt-auto">
        <div className="font-masthead-logo text-headline-md text-on-surface mb-2">RECALL</div>
        <div className="text-secondary-grey text-center">
          © 2026 RECALL Archival Protocol. Established under the Sovereign Ethics Code.
        </div>
      </footer>
    </div>
  );
}
