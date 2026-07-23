import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Masthead from '../components/Masthead';

export default function LiveUpdates() {
  const { id } = useParams<{ id: string }>();
  const { state } = useApp();
  const incident = state.incidents.find((i) => i.id === id);

  if (!incident) return <div className="text-primary font-data-mono p-8 text-center uppercase tracking-widest">RECORD NOT FOUND</div>;

  return (
    <div className="bg-paper-base text-ink-black min-h-screen flex flex-col antialiased selection:bg-press-red selection:text-white">
      <div className="absolute inset-0 pointer-events-none z-0 mix-blend-multiply opacity-50" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\" opacity=\"0.05\"/%3E%3C/svg%3E')" }}></div>
      
      <div className="relative z-10 flex-grow flex flex-col">
        <Masthead />

        {/* Breaking Ticker */}
        <div className="bg-press-red text-surface-white py-2.5 overflow-hidden whitespace-nowrap border-b border-ink-black sticky top-20 z-40">
          <div className="ticker-track inline-block font-data-mono text-[13px] uppercase tracking-tighter flex items-center">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="mx-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] animate-pulse">error</span> 
                BREAKING: MASS DISCREPANCY DETECTED IN {incident.location} // ARCHIVE VERIFICATION LEVEL REACHED TIER 1 // EMERGENCY PROTOCOL EPSILON ACTIVE
              </span>
            ))}
          </div>
        </div>

        <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 w-full flex-grow">
          
          {/* Breadcrumb */}
          <div className="mb-10">
            <Link to={`/archive/incident/${incident.id}`} className="inline-flex items-center font-label-tag text-label-tag uppercase text-on-surface-variant hover:text-press-red group transition-colors no-underline">
              <span className="material-symbols-outlined text-[14px] mr-2 transition-transform group-hover:-translate-x-1">arrow_back</span>
              BACK TO INCIDENT DETAILS
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row gap-gutter">
            
            {/* Left Column: Main Content */}
            <article className="flex-1">
              
              {/* Header Meta */}
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-press-red text-surface-white font-label-tag text-label-tag px-2.5 py-1 uppercase tracking-widest flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">emergency</span>
                  URGENT
                </span>
                <div className="flex items-center bg-press-red text-surface-white font-label-tag text-label-tag px-2.5 py-1 uppercase tracking-widest gap-1">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  LIVE RECORD
                </div>
              </div>
              
              <h2 className="font-headline-lg text-[32px] md:text-[42px] leading-tight mb-6 text-press-red max-w-3xl font-bold">
                {incident.title}
              </h2>
              
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-10 pb-6 border-b border-border-tan">
                <div className="flex flex-col">
                  <span className="font-label-tag text-[9px] uppercase text-outline-variant mb-1">Incident Date</span>
                  <span className="font-data-mono text-data-mono text-press-red">{incident.date}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-tag text-[9px] uppercase text-outline-variant mb-1">Location</span>
                  <span className="font-data-mono text-data-mono">{incident.location}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-tag text-[9px] uppercase text-outline-variant mb-1">Byline</span>
                  <span className="font-data-mono text-data-mono">{incident.contributorCredit}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-error-container border border-press-red px-2 py-0.5 font-label-tag text-[10px] text-press-red">HIGH URGENCY</span>
                </div>
              </div>
              
              <div className="font-body-text text-body-text leading-relaxed text-ink-black space-y-6 mb-12 max-w-4xl">
                <p>{incident.description}</p>
              </div>

              {/* LIVE UPDATES TIMELINE */}
              <section className="mb-12">
                <h3 className="font-headline-md text-headline-md mb-8 uppercase tracking-tight text-press-red font-bold">LIVE UPDATES</h3>
                
                <div className="relative pl-8">
                  {/* Timeline Line */}
                  <div className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-press-red"></div>
                  
                  <div className="space-y-8">
                    {(incident.updates || []).map((update, index) => (
                      <div key={index} className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-press-red border-4 border-paper-base"></div>
                        <div className="bg-surface-white border border-border-tan p-5 hover:border-press-red transition-colors">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <span className="font-data-mono text-[12px] text-press-red font-bold">{update.timestamp}</span>
                            <span className="bg-surface-container-high border border-border-tan px-2 py-0.5 font-label-tag text-[9px] text-on-surface-variant uppercase">
                              UPDATE
                            </span>
                          </div>
                          <p className="font-body-text text-[14px] text-ink-black leading-relaxed mt-4">
                            {update.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </article>

            {/* Right Sidebar */}
            <aside className="w-full lg:w-[320px] flex flex-col gap-6">
              
              <div className="bg-surface-white border border-press-red p-6">
                <h3 className="font-label-tag text-label-tag uppercase tracking-widest border-b border-press-red/20 pb-3 mb-6 flex items-center text-press-red font-bold">
                  <span className="material-symbols-outlined text-[16px] mr-2">warning</span>
                  CRITICAL DATA
                </h3>
                <div className="space-y-6 text-ink-black">
                  <div className="flex justify-between items-center">
                    <span className="font-caption text-caption uppercase text-outline-variant">Status</span>
                    <span className="font-data-mono text-data-mono text-ink-black uppercase">{incident.status}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-caption text-caption uppercase text-outline-variant">Category</span>
                    <span className={`font-data-mono text-data-mono font-bold uppercase text-cat-${incident.category}`}>{incident.category}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-caption text-caption uppercase text-outline-variant">Severity Level</span>
                    <span className="font-data-mono text-data-mono text-press-red font-bold animate-pulse">TIER 1 CRITICAL</span>
                  </div>
                </div>
                
                <Link to={`/archive/incident/${incident.id}`} className="w-full mt-10 bg-press-red text-surface-white font-label-tag text-label-tag uppercase py-4 hover:bg-ink-black transition-all flex items-center justify-center gap-2 group no-underline">
                  VIEW FULL RECORD
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">article</span>
                </Link>
              </div>

              {/* Related Map/Location */}
              <div className="bg-paper-base border border-border-tan overflow-hidden">
                <div className="h-48 bg-surface-container grayscale contrast-125 brightness-90 relative overflow-hidden flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--color-border-tan)_1px,_transparent_1px)]" style={{ backgroundSize: '10px 10px' }}>
                  <div className="flex flex-col items-center gap-2 z-10">
                    <span className="material-symbols-outlined text-[40px] text-press-red opacity-50">location_on</span>
                    <span className="font-data-mono text-[10px] uppercase tracking-widest text-ink-black">{incident.location}</span>
                  </div>
                </div>
                <div className="p-4 border-t border-border-tan bg-surface-white">
                  <h4 className="font-label-tag text-[10px] uppercase mb-1 text-ink-black">Impact Area</h4>
                  <p className="font-data-mono text-[12px] text-press-red">{incident.location.toUpperCase()} - RED ALERT</p>
                </div>
              </div>

            </aside>
          </div>
        </main>
        
        <footer className="bg-paper-base border-t border-border-tan mt-auto w-full py-12 px-margin-desktop max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="font-caption text-caption text-on-surface-variant uppercase tracking-widest">
              RECALL ARCHIVE. ALL RIGHTS RESERVED. © 2026
            </span>
            <span className="font-data-mono text-[10px] text-outline-variant">
              SYSTEM STATUS: <span className="text-press-red font-bold">DEGRADED</span> // BUILD: V4.1.2-ALPHA
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
