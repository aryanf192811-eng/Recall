import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Masthead from '../components/Masthead';

export default function BreakingNews() {
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
            <Link to="/archive" className="inline-flex items-center font-label-tag text-label-tag uppercase text-on-surface-variant hover:text-press-red group transition-colors no-underline">
              <span className="material-symbols-outlined text-[14px] mr-2 transition-transform group-hover:-translate-x-1">arrow_back</span>
              BACK TO ARCHIVE
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row gap-gutter">
            
            {/* Left Column: Main Content */}
            <article className="flex-1">
              
              {/* Header Meta */}
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-press-red text-surface-white font-label-tag text-label-tag px-2.5 py-1 uppercase tracking-widest flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">emergency</span>
                  LEGAL
                </span>
                <div className="flex items-center bg-press-red text-surface-white font-label-tag text-label-tag px-2.5 py-1 uppercase tracking-widest gap-1">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  VERIFIED INCIDENT
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
                  <span className="bg-surface-container-high border border-border-tan px-2 py-0.5 font-label-tag text-[10px] text-on-surface-variant">HISTORICAL RECORD</span>
                </div>
              </div>
              
              <div className="font-body-text text-body-text leading-relaxed text-ink-black space-y-6 mb-12 max-w-4xl">
                <p>{incident.description}</p>
                <div className="border-l-4 border-press-red pl-6 py-2 my-10">
                  <blockquote className="font-pull-quote text-[28px] italic text-press-red">
                    "The integrity of the record is not merely a matter of data; it is the fabric of our shared history. When the ledger breaks, truth becomes a variable."
                  </blockquote>
                </div>
                <p>
                  Despite initial reports of external interference, internal logs indicate a structural failure in the primary distribution node. The Logistics Division has confirmed that the physical verification tokens remained untouched, implying a purely digital fragmentation. The archival team is currently engaged in a deep-state recovery mission to restore the sequential order of the misallocated blocks.
                </p>
              </div>

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
                
                <Link to={`/live/${incident.id}`} className="w-full mt-10 bg-press-red text-surface-white font-label-tag text-label-tag uppercase py-4 hover:bg-ink-black transition-all flex items-center justify-center gap-2 group no-underline">
                  VIEW LIVE FEED
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">timeline</span>
                </Link>
              </div>

            </aside>
          </div>
        </main>
        
        <footer className="bg-paper-base border-t border-border-tan mt-auto w-full py-12 px-margin-desktop max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="font-caption text-caption text-on-surface-variant uppercase tracking-widest">
              RECALL ARCHIVE. ALL RIGHTS RESERVED. © 2026
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
