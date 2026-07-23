import { useState } from 'react';
import { Link } from 'react-router-dom';
import Masthead from '../components/Masthead';
import IncidentCard from '../components/IncidentCard';
import { useApp, useFilteredIncidents } from '../context/AppContext';
import type { Category } from '../types';

type ViewMode = 'list' | 'timeline' | 'map' | 'web';

export default function Archive() {
  const { state, dispatch } = useApp();
  const filtered = useFilteredIncidents();
  const [view, setView] = useState<ViewMode>('list');

  const categories: Array<{ value: Category | 'all'; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'violence', label: 'Violence' },
    { value: 'legal', label: 'Legal' },
    { value: 'shutdown', label: 'Shutdown' },
    { value: 'statement', label: 'Statement' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="bg-paper-base text-on-surface min-h-screen flex flex-col font-body-text selection:bg-archive-gold selection:text-white">
      <Masthead />

      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 flex flex-col gap-section-gap">
        {/* Search Section */}
        <section className="flex flex-col gap-4 border-b border-border-tan pb-8">
          <div className="flex justify-between items-end">
            <div className="font-data-mono text-data-mono text-secondary-grey uppercase">RECALL_QUERY:</div>
            <div className="font-data-mono text-data-mono text-secondary-grey uppercase">
              {filtered.length} Results
            </div>
          </div>
          
          <div className="relative w-full">
            <span 
              className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-on-surface-variant text-2xl" 
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              search
            </span>
            <input
              type="text"
              placeholder="Enter keywords, IDs, or geographic coordinates..."
              value={state.searchQuery}
              onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
              className="w-full bg-surface-white border border-border-tan rounded-none py-6 pl-14 pr-6 font-body-text text-body-text text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mt-4 items-center">
            <span className="font-label-tag text-label-tag text-secondary-grey uppercase tracking-widest">
              View Mode:
            </span>
            
            <div className="flex border border-border-tan bg-surface-white">
              {(['list', 'timeline', 'map', 'web'] as ViewMode[]).map((v) => {
                if (v === 'web') {
                  return (
                    <Link
                      key={v}
                      to="/web"
                      className="px-4 py-2 text-on-surface-variant font-label-tag text-label-tag uppercase hover:bg-surface-variant transition-colors flex items-center gap-2 no-underline border-l border-border-tan"
                    >
                      <span className="material-symbols-outlined text-[16px]">hub</span>
                      Web
                    </Link>
                  );
                }

                const isActive = view === v;
                const icons = { list: 'list', timeline: 'timeline', map: 'map' };
                
                return (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`
                      px-4 py-2 font-label-tag text-label-tag uppercase transition-colors flex items-center gap-2 border-r border-border-tan last:border-r-0
                      ${isActive ? 'bg-surface-variant text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-variant'}
                    `}
                  >
                    <span className="material-symbols-outlined text-[16px]">{icons[v as keyof typeof icons]}</span>
                    {v}
                  </button>
                );
              })}
            </div>

            {/* Category Filters */}
            <div className="ml-auto flex gap-2">
              {categories.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => dispatch({ type: 'SET_ACTIVE_FILTER', payload: value })}
                  className={`
                    px-3 py-1.5 font-label-tag text-label-tag uppercase transition-colors border
                    ${state.activeFilter === value
                      ? 'bg-ink-black text-paper-base border-ink-black'
                      : 'bg-surface-white text-secondary-grey border-border-tan hover:border-outline-variant'
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Results Feed */}
        <section className="flex flex-col gap-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-surface-white border border-border-tan">
              <span className="material-symbols-outlined text-4xl text-secondary-grey mb-4">search_off</span>
              <p className="font-headline-md text-headline-md text-primary mb-2">No records found</p>
              <p className="font-body-text text-body-text text-on-surface-variant">
                Adjust your search query or clear filters to expand results.
              </p>
            </div>
          ) : view === 'list' ? (
            filtered.map((inc, idx) => {
              const images = ['/assets/protest.png', '/assets/street.png', '/assets/electronics.png', '/assets/transit_hub.png', '/assets/urban_slum.png', '/assets/historical_document.png', '/assets/biometric_scanner.png', '/assets/evidence_locker.png', '/assets/rain_slicked.png', '/assets/telegraph_key.png', '/assets/brass_tags.png', '/assets/mechanical_ledger.png'];
              return <IncidentCard key={inc.id} incident={inc} image={images[idx % images.length]} />;
            })
          ) : view === 'timeline' ? (
            <div className="relative pl-8 md:pl-32 py-8">
              <div className="absolute left-[15px] md:left-[119px] top-0 bottom-0 w-px bg-border-tan"></div>
              <div className="space-y-12">
                {[...filtered].sort((a, b) => a.date.localeCompare(b.date)).map((inc) => (
                  <div key={inc.id} className="relative flex flex-col md:flex-row gap-8">
                    <div className="md:w-24 shrink-0 md:text-right pt-4">
                      <span className="font-data-mono text-[12px] text-secondary-grey uppercase bg-paper-base px-2">
                        {new Date(inc.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                      </span>
                    </div>
                    <div 
                      className="absolute left-[11px] md:left-[115px] top-[22px] w-2.5 h-2.5 rounded-full border-2 border-paper-base"
                      style={{ background: `var(--color-cat-${inc.category}, #1A1A1A)` }}
                    ></div>
                    <div className="flex-1 ml-6 md:ml-0">
                      <IncidentCard incident={inc} compact />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : view === 'map' ? (
            <div className="bg-surface-white border border-border-tan p-8 flex flex-col items-center justify-center min-h-[400px]">
              <span className="material-symbols-outlined text-4xl text-secondary-grey mb-4">map</span>
              <p className="font-headline-md text-headline-md text-primary mb-2">Geospatial Interface Offline</p>
              <p className="font-body-text text-body-text text-on-surface-variant">
                Map view is currently restricted under Directive 74 pending clearance.
              </p>
            </div>
          ) : null}

          {filtered.length > 0 && view === 'list' && (
            <div className="w-full flex justify-center mt-8 border-t border-border-tan pt-8">
              <button className="border-2 border-ink-black px-8 py-4 font-label-tag text-label-tag uppercase tracking-widest text-ink-black hover:bg-ink-black hover:text-paper-base transition-colors duration-200">
                End of Query Results
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
