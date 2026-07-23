import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, useFilteredIncidents } from '../context/AppContext';

export default function GlobalSearch() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const filtered = useFilteredIncidents();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="hidden md:flex relative w-80">
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl pointer-events-none">
        search
      </span>
      <input
        type="text"
        placeholder="Search incidents, people, locations..."
        value={state.searchQuery}
        onChange={(e) => {
          dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value });
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        className="w-full bg-surface-white border border-border-tan py-2.5 pl-10 pr-4 font-label-tag text-[12px] text-on-surface focus:border-primary transition-colors placeholder:text-secondary-grey focus:outline-none focus:ring-1 focus:ring-primary"
        aria-label="Search incidents"
      />
      
      {isOpen && state.searchQuery && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-[400px] max-h-96 overflow-y-auto bg-surface-white border border-border-tan shadow-2xl z-50 flex flex-col">
          {filtered.length > 0 ? (
            <>
              <div className="px-4 py-2 bg-paper-base border-b border-border-tan font-data-mono text-[10px] uppercase text-secondary-grey tracking-widest flex justify-between">
                <span>RECALL_QUERY</span>
                <span>{filtered.length} RESULTS</span>
              </div>
              {filtered.slice(0, 5).map(inc => (
                <div 
                  key={inc.id}
                  onClick={() => {
                    navigate(`/archive/incident/${inc.id}`);
                    setIsOpen(false);
                  }}
                  className="px-4 py-4 border-b border-border-tan hover:bg-paper-base cursor-pointer transition-colors group"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-data-mono text-[10px] text-archive-gold uppercase group-hover:text-primary transition-colors">{inc.id}</span>
                    <span className="font-data-mono text-[10px] text-secondary-grey uppercase">{new Date(inc.date).toLocaleDateString()}</span>
                  </div>
                  <div className="font-headline-sm text-sm text-ink-black truncate">{inc.title}</div>
                </div>
              ))}
              {filtered.length > 5 && (
                <div 
                  onClick={() => { navigate('/archive'); setIsOpen(false); }}
                  className="px-4 py-3 text-center cursor-pointer hover:bg-ink-black hover:text-paper-base font-label-tag text-xs text-ink-black uppercase transition-colors"
                >
                  View all {filtered.length} results
                </div>
              )}
            </>
          ) : (
            <div className="px-4 py-8 text-center font-body-text text-sm text-secondary-grey">
              No archival records found for "{state.searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
