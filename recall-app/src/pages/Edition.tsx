import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Masthead from '../components/Masthead';
import IncidentCard from '../components/IncidentCard';

export default function Edition() {
  const { state } = useApp();
  const coverIncident = state.incidents[0]; // Section 144 Imposed

  return (
    <div className="min-h-screen flex flex-col font-body-text antialiased selection:bg-archive-gold selection:text-white bg-paper-base">
      <Masthead />

      <main className="w-full max-w-container-max mx-auto px-margin-desktop bg-paper-base flex-grow">
        {/* Hero Section: Split Screen */}
        <section className="flex flex-col md:flex-row min-h-[80vh] border-x border-border-tan relative">
          
          {/* Left Side: Editorial Content (60%) */}
          <div className="w-full md:w-[60%] flex flex-col justify-center p-8 md:p-12 md:pr-16 border-r border-border-tan relative">
            
            <div className="space-y-6 max-w-3xl">
              <div className="flex items-center gap-4">
                <span className="px-2 py-0.5 bg-ink-black text-surface-white font-label-tag text-label-tag uppercase tracking-widest">
                  Headline Event
                </span>
                <span className="font-data-mono text-data-mono text-archive-gold">
                  REF: DIR-74-B
                </span>
              </div>
              <h2 className="font-headline-lg text-[48px] md:text-[64px] leading-[1.1] font-black text-ink-black">
                {coverIncident.title}
              </h2>
              <p className="font-subheadline text-subheadline text-secondary-grey max-w-xl">
                {coverIncident.description.split('.')[0] + '.' || "An archival reconstruction of the immediate aftermath following Directive 74, analyzing the sudden silence of a megacity."}
              </p>
            </div>

            {/* Causality Tree Interactive Widget */}
            <div className="mt-24 md:mt-32 relative z-20">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-label-tag text-label-tag uppercase text-ink-black tracking-[0.2em]">Causality Tree // Temporal Nodes</h3>
                <span className="font-data-mono text-[11px] text-secondary-grey">SYNCED TO CENTRAL TIME</span>
              </div>
              
              <div className="relative py-12">
                {/* Connecting Line */}
                <div 
                  className="absolute top-1/2 left-0 w-full h-[1px] transform -translate-y-1/2 z-0"
                  style={{ background: 'repeating-linear-gradient(90deg, #DDD8CE, #DDD8CE 4px, transparent 4px, transparent 8px)' }}
                ></div>
                
                <div className="relative z-10 flex justify-between items-center px-4 md:px-12">
                  
                  {/* Node T-0 */}
                  <div className="group relative cursor-pointer flex flex-col items-center">
                    <div className="w-5 h-5 bg-ink-black border-[4px] border-paper-base outline outline-1 outline-ink-black rounded-full transition-transform duration-300 group-hover:scale-125 z-10"></div>
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                      <div className="font-data-mono text-data-mono font-bold text-ink-black">T-0</div>
                      <div className="font-caption text-caption text-secondary-grey uppercase">Directive 74</div>
                    </div>
                    {/* Hover Card */}
                    <div className="opacity-0 group-hover:opacity-100 absolute bottom-12 left-1/2 -translate-x-1/2 w-56 p-4 bg-surface-white border border-border-tan shadow-lg transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0 z-50">
                      <p className="font-caption text-[10px] text-archive-gold mb-1">04:00 HRS</p>
                      <p className="font-label-tag text-[11px] leading-tight uppercase text-ink-black">Initial transmission broadcast via all emergency channels.</p>
                    </div>
                  </div>

                  {/* Node T+24 */}
                  <div className="group relative cursor-pointer flex flex-col items-center">
                    <div className="w-5 h-5 bg-ink-black border-[4px] border-paper-base outline outline-1 outline-ink-black rounded-full transition-transform duration-300 group-hover:scale-125 z-10"></div>
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                      <div className="font-data-mono text-data-mono font-bold text-ink-black">T+24</div>
                      <div className="font-caption text-caption text-secondary-grey uppercase">Grid Isolation</div>
                    </div>
                    {/* Hover Card */}
                    <div className="opacity-0 group-hover:opacity-100 absolute bottom-12 left-1/2 -translate-x-1/2 w-56 p-4 bg-surface-white border border-border-tan shadow-lg transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0 z-50">
                      <p className="font-caption text-[10px] text-archive-gold mb-1">04:00 HRS (+1D)</p>
                      <p className="font-label-tag text-[11px] leading-tight uppercase text-ink-black">External communication uplink severed. Local intranets partitioned.</p>
                    </div>
                  </div>

                  {/* Node T+48 */}
                  <div className="group relative cursor-pointer flex flex-col items-center">
                    <div className="w-5 h-5 bg-archive-gold border-[4px] border-paper-base outline outline-1 outline-archive-gold rounded-full animate-pulse transition-transform duration-300 group-hover:scale-125 z-10"></div>
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                      <div className="font-data-mono text-data-mono font-bold text-archive-gold">T+48</div>
                      <div className="font-caption text-caption text-archive-gold uppercase">Total Silence</div>
                    </div>
                    {/* Hover Card */}
                    <div className="opacity-0 group-hover:opacity-100 absolute bottom-12 left-1/2 -translate-x-1/2 w-56 p-4 bg-surface-white border border-border-tan shadow-lg transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0 z-50">
                      <p className="font-caption text-[10px] text-archive-gold mb-1">04:00 HRS (+2D)</p>
                      <p className="font-label-tag text-[11px] leading-tight uppercase text-ink-black">Civil compliance reaches 98.4%. Curfew enforced by automated nodes.</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Visual Anchor (40%) */}
          <div className="w-full md:w-[40%] relative min-h-[400px] md:min-h-full overflow-hidden bg-ink-black group">
            <div className="absolute inset-0 grayscale contrast-125 brightness-90 transition-all duration-[800ms] ease-out group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-[15s] ease-linear group-hover:scale-110"
                style={{ backgroundImage: "url('/assets/protest.png')" }}
              ></div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-ink-black/70 via-transparent to-transparent opacity-80 pointer-events-none"></div>

            <div className="absolute bottom-6 right-6 bg-ink-black/90 backdrop-blur-md text-surface-white px-4 py-2 font-data-mono text-data-mono text-[11px] uppercase tracking-widest border border-surface-white/20">
              Asset: IMG-19-B&W
            </div>
          </div>
        </section>

        {/* Bottom Section: Ground Reports */}
        <section className="py-section-gap border-x border-t border-border-tan bg-white/30">
          <div className="px-6 md:px-12 flex flex-col md:flex-row justify-between items-baseline mb-12 gap-4">
            <div>
              <h2 className="font-headline-md text-headline-md uppercase text-ink-black tracking-tight mb-2">Ground Reports: The Last 24 Hours</h2>
              <div className="w-24 h-1 bg-archive-gold"></div>
            </div>
            <Link to="/archive" className="font-label-tag text-label-tag uppercase text-secondary-grey hover:text-ink-black transition-colors flex items-center gap-2 no-underline">
              View Full Archive <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-y border-border-tan">
            {state.incidents.slice(1, 5).map((inc, idx) => {
              const images = ['/assets/street.png', '/assets/electronics.png', '/assets/transit_hub.png', '/assets/urban_slum.png'];
              return (
                <div key={inc.id} className="border-b lg:border-b-0 lg:border-r border-border-tan last:border-r-0 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 bg-surface-white z-10">
                  <IncidentCard incident={inc} image={images[idx]} />
                </div>
              );
            })}
          </div>
        </section>
        
        {/* Pull Quote Section */}
        <section className="py-section-gap border-x border-border-tan px-6 md:px-12">
          <div className="max-w-4xl mx-auto border-l-4 border-archive-gold pl-8 md:pl-12 py-8">
            <blockquote className="font-pull-quote text-[28px] md:text-[36px] leading-[1.3] italic text-ink-black mb-6">
              "The truth is not what is spoken, but what remains when the noise has been systematically removed."
            </blockquote>
            <cite className="font-label-tag text-[12px] uppercase tracking-[0.2em] text-secondary-grey not-italic">
              — Excerpt from The Auditor's Manifesto, Edition 001
            </cite>
          </div>
        </section>

      </main>

      {/* Footer Component */}
      <footer className="bg-paper-base border-t border-border-tan mt-section-gap">
        <div className="max-w-container-max mx-auto px-margin-desktop py-section-gap flex flex-col items-center">
          <div className="font-masthead-logo text-3xl text-primary font-black mb-8 tracking-widest uppercase">RECALL</div>
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <Link to="#" className="font-label-tag text-label-tag uppercase tracking-widest text-secondary-grey hover:text-primary no-underline transition-colors">Terms of Service</Link>
            <Link to="#" className="font-label-tag text-label-tag uppercase tracking-widest text-secondary-grey hover:text-primary no-underline transition-colors">Operational Security</Link>
            <Link to="#" className="font-label-tag text-label-tag uppercase tracking-widest text-secondary-grey hover:text-primary no-underline transition-colors">Contact Command</Link>
            <Link to="#" className="font-label-tag text-label-tag uppercase tracking-widest text-secondary-grey hover:text-primary no-underline transition-colors">Data Ethics</Link>
          </div>
          <div className="w-full h-[1px] bg-border-tan mb-8"></div>
          <div className="flex flex-col md:flex-row items-center justify-between w-full">
            <p className="font-label-tag text-[10px] text-secondary-grey uppercase tracking-widest mb-4 md:mb-0">
              © RECALL PERMANENT ARCHIVE. ALL TRUTH IS RECORDED.
            </p>
            <div className="flex items-center gap-6">
              <span className="font-data-mono text-[10px] text-secondary-grey">STATION ID: ARCHIVE-PRIME-07</span>
              <span className="font-data-mono text-[10px] text-archive-gold">ENCRYPTION: AES-4096-RECALL</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
