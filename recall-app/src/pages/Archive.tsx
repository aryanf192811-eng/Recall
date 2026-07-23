import { useState } from 'react';
import { Link } from 'react-router-dom';
import Masthead from '../components/Masthead';
import IncidentCard from '../components/IncidentCard';
import { useApp, useFilteredIncidents } from '../context/AppContext';
import type { Category } from '../types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
            <div className="font-data-mono text-[12px] text-secondary-grey uppercase tracking-widest font-bold">RECALL_QUERY:</div>
            <div className="font-data-mono text-[12px] text-secondary-grey uppercase tracking-widest font-bold">
              {filtered.length} Results
            </div>
          </div>
          
          <div className="relative w-full shadow-sm">
            <span 
              className="material-symbols-outlined absolute left-6 top-1/2 transform -translate-y-1/2 text-ink-black text-2xl" 
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              search
            </span>
            <input
              type="text"
              placeholder="Enter keywords, IDs, or geographic coordinates..."
              value={state.searchQuery}
              onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
              className="w-full bg-surface-white border-2 border-ink-black rounded-none py-6 pl-16 pr-6 font-body-text text-[18px] text-ink-black focus:outline-none focus:border-archive-gold transition-colors placeholder:text-secondary-grey"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-6 mt-6 items-start md:items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-label-tag text-[12px] text-secondary-grey uppercase tracking-widest font-bold hidden md:inline">
                View Mode:
              </span>
              
              <div className="flex border border-ink-black bg-surface-white shadow-sm">
                {(['list', 'timeline', 'map', 'web'] as ViewMode[]).map((v) => {
                  if (v === 'web') {
                    return (
                      <Link
                        key={v}
                        to="/web"
                        className="px-6 py-2.5 text-ink-black font-label-tag text-[12px] uppercase tracking-widest hover:bg-ink-black hover:text-surface-white transition-colors flex items-center gap-2 no-underline border-l border-ink-black font-bold"
                      >
                        <span className="material-symbols-outlined text-[18px]">hub</span>
                        Web
                      </Link>
                    );
                  }

                  const isActive = view === v;
                  const icons = { list: 'grid_view', timeline: 'timeline', map: 'map' };
                  
                  return (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      className={`
                        px-6 py-2.5 font-label-tag text-[12px] uppercase tracking-widest transition-colors flex items-center gap-2 border-r border-ink-black last:border-r-0 font-bold
                        ${isActive ? 'bg-ink-black text-surface-white' : 'text-ink-black hover:bg-surface-container-low'}
                      `}
                    >
                      <span className="material-symbols-outlined text-[18px]">{icons[v as keyof typeof icons]}</span>
                      {v}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => dispatch({ type: 'SET_ACTIVE_FILTER', payload: value })}
                  className={`
                    px-4 py-2 font-label-tag text-[11px] uppercase tracking-widest transition-colors border font-bold
                    ${state.activeFilter === value
                      ? 'bg-archive-gold text-surface-white border-archive-gold'
                      : 'bg-surface-white text-secondary-grey border-border-tan hover:border-ink-black hover:text-ink-black'
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
        <section className="flex flex-col gap-6 relative">
          {filtered.length === 0 ? (
            <div className="text-center py-32 bg-surface-white border border-border-tan flex flex-col items-center">
              <span className="material-symbols-outlined text-[64px] text-secondary-grey mb-6 opacity-50">search_off</span>
              <p className="font-headline-md text-[24px] text-ink-black mb-2 font-bold">No records found matching query</p>
              <p className="font-body-text text-body-text text-secondary-grey">
                Adjust your search parameters or clear filters to restore access to the archive.
              </p>
            </div>
          ) : view === 'list' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filtered.map((inc, idx) => {
                const images = ['/assets/protest.png', '/assets/street.png', '/assets/electronics.png', '/assets/transit_hub.png', '/assets/urban_slum.png', '/assets/historical_document.png', '/assets/biometric_scanner.png', '/assets/evidence_locker.png', '/assets/rain_slicked.png', '/assets/telegraph_key.png', '/assets/brass_tags.png', '/assets/mechanical_ledger.png'];
                return (
                  <div key={inc.id} className="bg-surface-white border border-border-tan hover:-translate-y-2 hover:shadow-2xl hover:border-archive-gold transition-all duration-500 rounded-sm overflow-hidden flex flex-col h-full group">
                    <IncidentCard incident={inc} image={images[idx % images.length]} />
                  </div>
                );
              })}
            </div>
          ) : view === 'timeline' ? (
            <div className="relative pl-8 md:pl-32 py-8">
              <div className="absolute left-[15px] md:left-[119px] top-0 bottom-0 w-[2px] bg-border-tan"></div>
              <div className="space-y-16">
                {[...filtered].sort((a, b) => a.date.localeCompare(b.date)).map((inc) => (
                  <div key={inc.id} className="relative flex flex-col md:flex-row gap-8 group">
                    <div className="md:w-24 shrink-0 md:text-right pt-4">
                      <span className="font-data-mono text-[14px] text-ink-black font-bold uppercase bg-paper-base px-2 shadow-sm border border-border-tan">
                        {new Date(inc.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                      </span>
                    </div>
                    <div 
                      className="absolute left-[11px] md:left-[114px] top-[22px] w-3 h-3 rounded-full border-[3px] border-paper-base shadow-sm group-hover:scale-150 transition-transform duration-300"
                      style={{ background: `var(--color-cat-${inc.category}, #1A1A1A)` }}
                    ></div>
                    <div className="flex-1 ml-6 md:ml-0 bg-surface-white border border-border-tan shadow-sm group-hover:border-ink-black transition-colors">
                      <IncidentCard incident={inc} compact />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : view === 'map' ? (
            <div className="bg-ink-black border-4 border-ink-black relative w-full h-[75vh] z-0 shadow-2xl">
              <MapContainer 
                center={[28.6271, 77.2164]} // Centered on Jantar Mantar, New Delhi
                zoom={12} 
                scrollWheelZoom={true} 
                className="w-full h-full bg-ink-black"
                zoomControl={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                
                {filtered.map((inc, i) => {
                  // Base coordinates for Jantar Mantar, New Delhi
                  const baseLat = 28.6271;
                  const baseLng = 77.2164;
                  
                  // Create small pseudo-random offsets based on incident ID
                  const seed1 = inc.id.charCodeAt(0) + inc.id.charCodeAt(inc.id.length - 1);
                  const seed2 = inc.id.charCodeAt(1) || 50;
                  
                  // Offset by approx +/- 0.05 degrees (a few kilometers around central Delhi)
                  const latOffset = ((seed1 % 100) - 50) * 0.001; 
                  const lngOffset = ((seed2 % 100) - 50) * 0.001;
                  
                  const lat = baseLat + latOffset; 
                  const lng = baseLng + lngOffset; 
                  const delay = (i % 5) * 0.5;

                  const customIcon = L.divIcon({
                    className: 'custom-radar-marker bg-transparent border-0',
                    html: `
                      <div class="relative w-8 h-8">
                        <div class="w-8 h-8 bg-archive-gold/40 rounded-full animate-ping absolute top-0 left-0" style="animation-delay: ${delay}s; animation-duration: 3s"></div>
                        <div class="w-3 h-3 bg-archive-gold rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[3px] border-ink-black shadow-[0_0_10px_rgba(184,150,12,0.8)]"></div>
                      </div>
                    `,
                    iconSize: [32, 32],
                    iconAnchor: [16, 16]
                  });

                  return (
                    <Marker key={inc.id} position={[lat, lng]} icon={customIcon}>
                      <Popup className="custom-leaflet-popup">
                        <div className="bg-ink-black/95 backdrop-blur-md border border-archive-gold p-4 shadow-2xl text-surface-white min-w-[240px]">
                          <div className="font-data-mono text-[11px] text-archive-gold mb-2 flex justify-between tracking-widest font-bold">
                            <span>{inc.id}</span>
                            <span className="animate-pulse">● LIVE</span>
                          </div>
                          <div className="font-headline-sm text-[16px] text-surface-white mb-4 line-clamp-2 leading-tight font-bold m-0">{inc.title}</div>
                          <div className="w-full h-[1px] bg-archive-gold/30 mb-3"></div>
                          <div className="font-data-mono text-[10px] text-secondary-grey uppercase flex flex-col gap-2 tracking-widest">
                            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-archive-gold">location_on</span> {inc.location}</span>
                            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-archive-gold">schedule</span> {new Date(inc.date).toLocaleDateString()}</span>
                          </div>
                          <Link to={`/archive/incident/${inc.id}`} className="mt-4 block text-center w-full bg-archive-gold text-ink-black font-label-tag text-[10px] uppercase font-bold tracking-widest py-2 hover:bg-surface-white transition-colors no-underline">
                            View Dossier
                          </Link>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
              
              <div className="absolute top-6 left-6 font-data-mono text-[11px] uppercase text-archive-gold bg-ink-black/80 backdrop-blur-sm px-4 py-2 border border-archive-gold/30 z-[400] flex flex-col gap-1 pointer-events-none shadow-lg">
                <span className="font-bold tracking-widest">GEOSPATIAL VISUALIZATION // SEC-7</span>
                <span className="text-surface-white opacity-70">RADAR ACTIVE: SCANNING FOR INCIDENTS</span>
              </div>
              
              <div className="absolute bottom-6 left-6 z-[400] pointer-events-none">
                <div className="w-16 h-16 relative">
                  <div className="absolute inset-0 border-2 border-archive-gold/20 rounded-full animate-ping"></div>
                  <div className="absolute inset-2 border-2 border-archive-gold/40 rounded-full animate-spin" style={{ animationDuration: '4s' }}></div>
                  <div className="absolute inset-4 border-2 border-archive-gold/60 rounded-full animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
                  <div className="absolute inset-1/2 w-1 h-1 bg-archive-gold rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(184,150,12,1)]"></div>
                </div>
              </div>
            </div>
          ) : null}

          {filtered.length > 0 && view === 'list' && (
            <div className="w-full flex justify-center mt-12 border-t border-border-tan pt-12">
              <button className="border-2 border-ink-black px-12 py-4 font-label-tag text-[13px] uppercase tracking-widest text-ink-black font-bold hover:bg-ink-black hover:text-surface-white transition-all duration-300 shadow-sm hover:shadow-xl">
                End of Query Results
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
