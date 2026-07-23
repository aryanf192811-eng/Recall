import { useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Masthead from '../components/Masthead';
import { Link } from 'react-router-dom';

export default function OfficerProfile() {
  const { id } = useParams<{ id: string }>();
  const { state } = useApp();
  const entity = state.entities.find((e) => e.id === id) || {
    id: id || 'O-1042-ALPHA',
    name: 'Elias Vance',
    type: 'person',
    description: 'Senior Archivist',
    relatedIncidents: []
  };

  return (
    <div className="bg-paper-base text-ink-black antialiased min-h-screen flex flex-col selection:bg-archive-gold selection:text-white">
      <Masthead />

      {/* SideNavBar (Alert Ticker - Mobile & Web Secondary) */}
      <div className="bg-press-red w-full h-8 flex items-center overflow-hidden">
        <div className="flex items-center space-x-8 px-4 whitespace-nowrap ticker-track">
          <span className="flex items-center gap-2 font-data-mono text-[12px] text-surface-white uppercase"><span className="material-symbols-outlined text-[16px]">warning</span> Urgent Alert</span>
          <span className="flex items-center gap-2 font-data-mono text-[12px] text-surface-white/80 uppercase"><span className="material-symbols-outlined text-[16px]">sensors</span> Operational Update</span>
          <span className="flex items-center gap-2 font-data-mono text-[12px] text-surface-white/80 uppercase"><span className="material-symbols-outlined text-[16px]">history_edu</span> Causality Shift</span>
          <span className="flex items-center gap-2 font-data-mono text-[12px] text-surface-white/80 uppercase"><span className="material-symbols-outlined text-[16px]">account_balance</span> Ledger Entry</span>
          <span className="flex items-center gap-2 font-data-mono text-[12px] text-surface-white/80 uppercase"><span className="material-symbols-outlined text-[16px]">terminal</span> System Status</span>
          
          <span className="flex items-center gap-2 font-data-mono text-[12px] text-surface-white uppercase"><span className="material-symbols-outlined text-[16px]">warning</span> Urgent Alert</span>
        </div>
      </div>

      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap grid grid-cols-1 md:grid-cols-12 gap-gutter">
        
        {/* Profile Column */}
        <aside className="md:col-span-4 lg:col-span-3 flex flex-col gap-6">
          <div className="bg-surface-white border border-border-tan p-6 flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full border-4 border-ink-black overflow-hidden mb-4 relative">
              <img 
                className="w-full h-full object-cover grayscale" 
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2787&auto=format&fit=crop" 
                alt={entity.name} 
              />
              <div className="absolute inset-0 bg-archive-gold mix-blend-color opacity-20"></div>
            </div>
            
            <h1 className="font-headline-md text-headline-md font-bold mb-1 text-ink-black">{entity.name}</h1>
            <p className="font-data-mono text-data-mono text-secondary-grey uppercase mb-4 tracking-widest">{entity.description || 'Officer'}</p>
            
            <div className="w-full border-t border-border-tan pt-4 mt-2">
              <div className="flex justify-between items-center mb-2">
                <span className="font-caption text-caption text-secondary-grey uppercase tracking-widest">Clearance</span>
                <span className="font-data-mono text-data-mono font-bold text-press-red">LEVEL 5 (OMEGA)</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-caption text-caption text-secondary-grey uppercase tracking-widest">Sector</span>
                <span className="font-data-mono text-data-mono font-bold text-ink-black">SECTOR 7 (NORTH)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-caption text-caption text-secondary-grey uppercase tracking-widest">Status</span>
                <span className="font-label-tag text-label-tag bg-status-verified text-surface-white px-2 py-1 uppercase">Active</span>
              </div>
            </div>
          </div>
          
          <div className="bg-surface-white border border-border-tan p-6">
            <h2 className="font-subheadline text-subheadline text-ink-black border-b border-border-tan pb-2 mb-4">Biometric Signature</h2>
            <img 
              className="w-full h-24 object-cover opacity-80 mix-blend-multiply" 
              src="https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2940&auto=format&fit=crop&grayscale=1" 
              alt="Biometric Signature" 
            />
            <p className="font-data-mono text-[10px] text-secondary-grey text-center mt-2">ID: {entity.id}</p>
          </div>
        </aside>

        {/* Main Content Column */}
        <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-section-gap">
          
          {/* Operational Directives */}
          <section>
            <div className="flex items-baseline justify-between border-b-2 border-ink-black pb-2 mb-6">
              <h2 className="font-headline-lg text-headline-lg text-ink-black">Current Directives</h2>
              <span className="font-caption text-caption text-secondary-grey uppercase tracking-widest">3 Active</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Directive 1 */}
              <div className="bg-surface-white border border-border-tan p-6 relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-archive-gold/10 -mr-8 -mt-8 rounded-full transform group-hover:scale-150 transition-transform duration-500"></div>
                <div className="flex items-center gap-2 mb-3 relative z-10">
                  <span className="w-2 h-2 bg-press-red rounded-full animate-pulse-dot"></span>
                  <span className="font-label-tag text-label-tag uppercase tracking-widest text-press-red">Priority Alpha</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-ink-black mb-2 relative z-10">The Silas Incident Recovery</h3>
                <p className="font-body-text text-body-text text-on-surface-variant mb-4 relative z-10">Locate and secure all fragmented ledger entries pertaining to the anomaly in Sub-Level 4. Expect heavy temporal distortion.</p>
                <div className="flex items-center justify-between relative z-10">
                  <span className="font-data-mono text-[11px] text-secondary-grey">Due: 24:00 HRS</span>
                  <button className="font-label-tag text-label-tag uppercase tracking-widest border border-ink-black px-3 py-1 hover:bg-ink-black hover:text-surface-white transition-colors cursor-pointer text-ink-black">Review</button>
                </div>
              </div>
              
              {/* Directive 2 */}
              <div className="bg-surface-white border border-border-tan p-6 relative">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 bg-archive-gold rounded-full"></span>
                  <span className="font-label-tag text-label-tag uppercase tracking-widest text-archive-gold">Standard Review</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-ink-black mb-2">Audit: Sector 7 Archives</h3>
                <p className="font-body-text text-body-text text-on-surface-variant mb-4">Routine verification of physical manifests against digital ledger for Q3. Focus on classified manifests.</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-data-mono text-[11px] text-secondary-grey">Due: 48:00 HRS</span>
                  <button className="font-label-tag text-label-tag uppercase tracking-widest border border-ink-black px-3 py-1 hover:bg-ink-black hover:text-surface-white transition-colors cursor-pointer text-ink-black">Review</button>
                </div>
              </div>

              {/* Directive 3 (Spans full width) */}
              <div className="bg-ink-black text-surface-white border border-ink-black p-6 md:col-span-2 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>
                <div className="flex items-center gap-2 mb-3 relative z-10">
                  <span className="material-symbols-outlined text-[16px] text-surface-white">lock</span>
                  <span className="font-label-tag text-label-tag uppercase tracking-widest text-surface-white">Classified</span>
                </div>
                <h3 className="font-headline-md text-headline-md mb-2 relative z-10 text-surface-white">Project: Ozymandias</h3>
                <p className="font-body-text text-body-text text-surface-white/80 mb-4 relative z-10 max-w-2xl">Details redacted. Report to Command level immediately for physical briefing. Do not use standard communication channels.</p>
                <div className="flex items-center justify-between relative z-10">
                  <span className="font-data-mono text-[11px] text-surface-white/60">Status: Awaiting Acknowledgment</span>
                  <button className="font-label-tag text-label-tag uppercase tracking-widest bg-surface-white text-ink-black px-4 py-2 hover:bg-surface-variant transition-colors cursor-pointer">Acknowledge</button>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Debriefs */}
          <section>
            <div className="flex items-baseline justify-between border-b border-border-tan pb-2 mb-6">
              <h2 className="font-headline-lg text-headline-lg text-ink-black">Recent Debriefs</h2>
              <Link to="/archive" className="font-caption text-caption text-ink-black underline uppercase tracking-widest hover:text-press-red transition-colors">View All</Link>
            </div>
            
            <div className="flex flex-col gap-0 border-t border-l border-r border-border-tan">
              {/* Entry 1 */}
              <div className="bg-surface-white border-b border-border-tan p-4 flex flex-col md:flex-row gap-4 hover:bg-surface-container-low transition-colors cursor-pointer group">
                <div className="md:w-32 flex-shrink-0 flex flex-col">
                  <span className="font-data-mono text-data-mono text-ink-black font-bold">14.OCT.24</span>
                  <span className="font-caption text-caption text-secondary-grey uppercase mt-1">14:22 HRS</span>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-label-tag text-label-tag bg-cat-statement text-surface-white px-2 py-0.5 uppercase">Statement</span>
                    <span className="font-data-mono text-[10px] text-secondary-grey">ID: D-9921</span>
                  </div>
                  <h4 className="font-subheadline text-[16px] font-bold text-ink-black group-hover:text-press-red transition-colors">Witness account regarding the structural collapse at Sector 4</h4>
                </div>
                <div className="md:w-24 flex-shrink-0 flex items-center justify-end">
                  <span className="material-symbols-outlined text-secondary-grey group-hover:text-ink-black">arrow_forward</span>
                </div>
              </div>
              
              {/* Entry 2 */}
              <div className="bg-surface-white border-b border-border-tan p-4 flex flex-col md:flex-row gap-4 hover:bg-surface-container-low transition-colors cursor-pointer group">
                <div className="md:w-32 flex-shrink-0 flex flex-col">
                  <span className="font-data-mono text-data-mono text-ink-black font-bold">12.OCT.24</span>
                  <span className="font-caption text-caption text-secondary-grey uppercase mt-1">09:15 HRS</span>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-label-tag text-label-tag bg-cat-ground text-surface-white px-2 py-0.5 uppercase">Ground</span>
                    <span className="font-data-mono text-[10px] text-secondary-grey">ID: D-9918</span>
                  </div>
                  <h4 className="font-subheadline text-[16px] font-bold text-ink-black group-hover:text-press-red transition-colors">Geological survey results following reported tremors</h4>
                </div>
                <div className="md:w-24 flex-shrink-0 flex items-center justify-end">
                  <span className="material-symbols-outlined text-secondary-grey group-hover:text-ink-black">arrow_forward</span>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
      
      <footer className="bg-paper-base flex flex-col items-center justify-center py-section-gap w-full border-t border-border-tan mt-auto">
        <div className="font-headline-sm text-headline-sm text-primary mb-4">RECALL</div>
        <p className="font-caption text-caption uppercase tracking-widest text-secondary-grey text-center px-4">
          © 2026 RECALL PERMANENT ARCHIVE. ALL TRUTH IS RECORDED.
        </p>
      </footer>
    </div>
  );
}
