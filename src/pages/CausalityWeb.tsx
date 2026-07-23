import { useState } from 'react';
import Masthead from '../components/Masthead';
import CausalityGraph from '../components/CausalityGraph';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

export default function CausalityWeb() {
  const { state } = useApp();
  const [activeIncidentId, setActiveIncidentId] = useState<string | null>(state.incidents[0]?.id || null);

  const activeIncident = state.incidents.find(i => i.id === activeIncidentId);

  return (
    <div className="bg-paper-base text-ink-black min-h-screen flex flex-col font-body-text overflow-hidden selection:bg-archive-gold selection:text-white">
      <Masthead />

      {/* Main Workspace */}
      <main className="flex-1 relative w-full h-[calc(100vh-73px)] flex bg-[#F5F0E8]" 
            style={{ backgroundImage: 'radial-gradient(var(--color-border-tan, #DDD8CE) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        
        {/* Detail Panel (Floating bottom on mobile, left on desktop) */}
        {activeIncident && (
          <aside className="absolute bottom-4 left-4 right-4 top-auto md:top-8 md:bottom-auto md:left-margin-desktop md:w-[320px] w-auto bg-surface-white border border-border-tan shadow-xl z-20 flex flex-col pointer-events-auto max-h-[45vh] md:max-h-none overflow-y-auto">
            <div className="p-4 border-b border-border-tan bg-surface-variant/30 flex justify-between items-start">
              <div>
                <span className="font-label-tag text-label-tag uppercase tracking-widest text-secondary-grey mb-1 block">
                  Active Node
                </span>
                <h2 className="font-headline-md text-headline-md text-ink-black line-clamp-2">
                  {activeIncident.title}
                </h2>
              </div>
              <span className="material-symbols-outlined text-archive-gold">share</span>
            </div>
            
            <div className="p-4 flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-caption text-caption uppercase text-secondary-grey block mb-1">Status</span>
                  <div className={`font-data-mono text-data-mono font-bold uppercase ${
                    activeIncident.status === 'verified' ? 'text-status-verified' :
                    activeIncident.status === 'reported' ? 'text-status-reported' :
                    activeIncident.status === 'disputed' ? 'text-status-disputed' : 'text-archive-gold'
                  }`}>
                    {activeIncident.status}
                  </div>
                </div>
                <div>
                  <span className="font-caption text-caption uppercase text-secondary-grey block mb-1">Links</span>
                  <div className="font-data-mono text-data-mono text-ink-black">
                    {activeIncident.triggeredBy.length + activeIncident.ledTo.length}
                  </div>
                </div>
                <div className="col-span-2">
                  <span className="font-caption text-caption uppercase text-secondary-grey block mb-1">Timestamp</span>
                  <div className="font-data-mono text-data-mono text-ink-black">{activeIncident.date}</div>
                </div>
              </div>
              
              <div>
                <span className="font-caption text-caption uppercase text-secondary-grey block mb-2">Description</span>
                <p className="font-body-text text-sm leading-relaxed text-on-surface-variant line-clamp-4">
                  {activeIncident.description}
                </p>
              </div>
              
              <div className="pt-4 border-t border-border-tan">
                <Link 
                  to={`/archive/incident/${activeIncident.id}`}
                  className="w-full py-3 px-4 bg-ink-black text-paper-base font-label-tag text-label-tag uppercase tracking-widest hover:bg-secondary transition-colors flex items-center justify-center gap-2 no-underline"
                >
                  <span className="material-symbols-outlined text-sm">description</span>
                  View Full Record
                </Link>
              </div>
            </div>
          </aside>
        )}

        {/* Top Right Controls */}
        <div className="absolute right-4 md:right-margin-desktop top-8 flex gap-2 z-20 pointer-events-auto hidden md:flex">
          <button className="bg-surface-white border border-border-tan p-2 hover:bg-surface-variant text-ink-black transition-colors" title="Zoom Out">
            <span className="material-symbols-outlined">zoom_out</span>
          </button>
          <button className="bg-surface-white border border-border-tan p-2 hover:bg-surface-variant text-ink-black transition-colors" title="Zoom In">
            <span className="material-symbols-outlined">zoom_in</span>
          </button>
          <div className="w-px h-10 bg-border-tan mx-1"></div>
          <button className="bg-surface-white border border-border-tan p-2 hover:bg-surface-variant text-ink-black transition-colors" title="Reset View">
            <span className="material-symbols-outlined">filter_center_focus</span>
          </button>
          <button className="bg-surface-white border border-border-tan p-2 hover:bg-surface-variant text-ink-black transition-colors" title="Export PNG">
            <span className="material-symbols-outlined">download</span>
          </button>
        </div>

        {/* Causality Graph Container */}
        <div className="absolute inset-0 w-full h-full z-10">
          <CausalityGraph 
            height={typeof window !== 'undefined' ? window.innerHeight - 73 : 800} 
            onNodeClick={setActiveIncidentId}
          />
        </div>
      </main>
    </div>
  );
}
