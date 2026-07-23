import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Masthead from '../components/Masthead';
import IncidentCard from '../components/IncidentCard';

export default function Edition() {
  const { state } = useApp();
  const coverIncident = state.incidents[0]; // Section 144 Imposed
  const [activeNode, setActiveNode] = useState<number | null>(null);
  
  const [terminalFeed, setTerminalFeed] = useState<string[]>([
    "> INITIALIZING ARCHIVE UPLINK...",
    "> SECURE HANDSHAKE VERIFIED [PROTOCOL 7]",
    "> DECRYPTING CAUSALITY LOGS..."
  ]);

  useEffect(() => {
    const logs = [
      "> OVERRIDE DETECTED AT SUBSTATION 4",
      "> PACKET LOSS: 98% ACROSS SECTOR B",
      "> UNAUTHORIZED PING FROM TERMINAL 992",
      "> ENCRYPTING RAW INTEL...",
      "> SATELLITE IMAGERY SEQUESTERED"
    ];
    let count = 0;
    const interval = setInterval(() => {
      setTerminalFeed(prev => {
        const next = [...prev, logs[count % logs.length]];
        if (next.length > 5) next.shift();
        return next;
      });
      count++;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { id: 0, time: 'T-0', tag: 'Directive 74', textColor: 'text-cat-legal', bgColor: 'bg-surface-white', details: "Initial broadcast intercepted. Assembly privileges suspended indefinitely under emergency act. All sovereign entities re-routed." },
    { id: 1, time: 'T+24', tag: 'Grid Isolation', textColor: 'text-cat-shutdown', bgColor: 'bg-surface-white', details: "Total communication blackout initiated. Physical blockades erected at primary transit nodes. ISP trunks severed at the root." },
    { id: 2, time: 'T+48', tag: 'Total Silence', textColor: 'text-ink-black', bgColor: 'bg-ink-black', pulse: true, details: "No incoming signals detected. Mass anomalous movement reported on the outskirts. Archival sensors dropping offline." },
    { id: 3, time: 'T+72', tag: 'Data Pending', textColor: 'text-secondary-grey', bgColor: 'bg-surface-white', opacity: 'opacity-50', details: "Awaiting archival decryption. Status unknown. Proceed with extreme caution." }
  ];

  return (
    <div className="antialiased min-h-screen flex flex-col font-body-text selection:bg-archive-gold selection:text-white bg-paper-base text-ink-black overflow-x-hidden">
      <Masthead />

      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
        {/* Side-by-Side Hero Section */}
        <section className="mb-section-gap border-b border-border-tan pb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-stretch">
            {/* Left Column: Text & Widgets */}
            <div className="md:col-span-6 flex flex-col justify-center">
              <span className="font-edition-number text-[12px] uppercase tracking-[0.2em] text-secondary-grey block mb-4 font-bold border-l-2 border-archive-gold pl-3">EDITION 001 // PROTOCOL 7 VERIFIED</span>
              <h1 className="font-headline-lg text-[40px] md:text-[64px] lg:text-[72px] leading-[1.05] mb-6 font-bold tracking-tight text-ink-black">
                {coverIncident?.title || 'System Failure'}
              </h1>
              <p className="font-subheadline text-[18px] lg:text-[22px] text-secondary-grey max-w-xl cursor-magnifier font-semibold leading-[1.5] mb-10">
                {coverIncident?.description.split('.')[0] + '.' || "An archival reconstruction of the immediate aftermath following Directive 74. Communications severed. Assembly prohibited."}
              </p>
              
              <div className="flex flex-col xl:flex-row gap-6 mt-auto">
                {/* Animated Terminal */}
                <div className="flex-1 flex flex-col gap-1 bg-ink-black p-4 h-36 overflow-hidden border border-archive-gold/30 shadow-xl relative">
                  <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(184,150,12,0.1)_1px,transparent_1px)] bg-[size:100%_4px]"></div>
                  <div className="font-data-mono text-[10px] text-archive-gold opacity-50 mb-2 border-b border-archive-gold/30 pb-1">TERMINAL // SEC-7 LOGS</div>
                  {terminalFeed.map((log, i) => (
                    <span key={i} className="font-data-mono text-[10px] text-archive-gold opacity-90 animate-pulse">{log}</span>
                  ))}
                </div>
                
                {/* Threat / Integrity Gauge Widget */}
                <div className="w-full xl:w-48 bg-surface-white border border-border-tan p-4 flex flex-col justify-between shadow-xl">
                  <span className="font-data-mono text-[10px] text-ink-black uppercase tracking-widest font-bold">Data Integrity</span>
                  <div className="relative w-24 h-24 mx-auto my-2">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E3DB" strokeWidth="8" />
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#B8960C" strokeWidth="8" strokeDasharray="282.7" strokeDashoffset="42.4" className="animate-[spin_4s_ease-in-out_infinite]" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="font-headline-md text-2xl font-bold text-ink-black">85%</span>
                    </div>
                  </div>
                  <span className="font-data-mono text-[9px] text-secondary-grey uppercase text-center block">Tier 2 Encryption</span>
                </div>
              </div>
            </div>
            
            {/* Right Column: Hero Image */}
            <div className="md:col-span-6 border border-border-tan relative h-[50vh] md:h-auto min-h-[600px] bg-ink-black overflow-hidden group shadow-2xl">
              <img 
                alt="Hero Image" 
                className="w-full h-full object-cover grayscale contrast-125 opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 cursor-magnifier mix-blend-luminosity" 
                src="/assets/protest.png"
              />
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] mix-blend-overlay"></div>
              
              <div className="absolute bottom-6 right-6 bg-ink-black/80 backdrop-blur-sm border border-archive-gold/50 px-4 py-2 flex items-center space-x-3 transition-transform duration-500 hover:scale-105 shadow-xl">
                <span className="w-2 h-2 rounded-full bg-press-red animate-ping absolute"></span>
                <span className="w-2 h-2 rounded-full bg-press-red relative"></span>
                <span className="font-data-mono text-[12px] text-archive-gold uppercase font-bold tracking-widest">Live Feed Active</span>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Causality Tree/Timeline */}
        <section className="mb-section-gap mt-12 bg-surface-white border border-border-tan p-8 shadow-sm">
          <div className="border-b border-border-tan pb-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="font-headline-md text-[28px] font-bold text-ink-black">Causality Node Network</h2>
              <p className="font-body-text text-[14px] text-secondary-grey mt-1">Select a temporal node to reveal decrypted intelligence briefs.</p>
            </div>
            <span className="font-data-mono text-[13px] text-archive-gold bg-ink-black px-3 py-1 uppercase border border-archive-gold/30">Temporal Analysis</span>
          </div>
          
          <div className="relative w-full overflow-x-auto pb-8 pt-4">
            <div className="flex items-center min-w-[800px] justify-between relative px-8">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-8 right-8 h-[2px] bg-border-tan -z-10"></div>
              
              {/* Nodes */}
              {nodes.map((node) => (
                <div 
                  key={node.id}
                  onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                  className={`flex flex-col items-center px-4 group cursor-pointer transition-all duration-300 ${node.opacity || ''} ${activeNode === node.id ? 'scale-110' : 'hover:scale-105'}`}
                >
                  <div className={`w-6 h-6 border-4 ${activeNode === node.id ? 'border-archive-gold' : 'border-ink-black'} ${node.bgColor} rounded-full z-10 mb-3 transition-colors ${node.pulse ? 'animate-pulse' : ''}`}></div>
                  <span className={`font-data-mono text-[14px] font-bold ${activeNode === node.id ? 'text-archive-gold' : 'text-ink-black'}`}>{node.time}</span>
                  <span className={`font-label-tag text-[11px] uppercase mt-2 ${node.textColor} px-3 py-1 bg-surface-container-low border ${activeNode === node.id ? 'border-archive-gold' : 'border-border-tan'} font-bold shadow-sm`}>
                    {node.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Active Node Detail Panel */}
          {activeNode !== null && (
            <div className="mt-8 border-t-2 border-archive-gold pt-6 animate-in slide-in-from-top-4 fade-in duration-300">
              <h3 className="font-data-mono text-[12px] text-archive-gold uppercase mb-2 tracking-widest flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">lock_open</span> Decrypted Brief: {nodes[activeNode].time}
              </h3>
              <p className="font-body-text text-[16px] text-ink-black font-semibold leading-relaxed max-w-4xl">
                {nodes[activeNode].details}
              </p>
            </div>
          )}
        </section>

        {/* Relaxed Ground Reports Grid */}
        <section className="mb-section-gap mt-16">
          <div className="border-b border-border-tan pb-6 mb-12 flex flex-col md:flex-row items-baseline justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="font-headline-md text-[32px] font-bold">Ground Reports</h2>
              <span className="font-data-mono text-[13px] text-secondary-grey uppercase tracking-widest">Field Incident Logs // Unredacted</span>
            </div>
            <Link to="/archive" className="font-label-tag text-[12px] uppercase text-ink-black hover:text-archive-gold transition-colors flex items-center gap-2 font-bold border border-ink-black px-4 py-2 hover:border-archive-gold">
              View Full Archive <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {state.incidents.slice(1, 5).map((inc, idx) => {
              const images = ['/assets/street.png', '/assets/electronics.png', '/assets/transit_hub.png', '/assets/urban_slum.png'];
              return (
                <div key={inc.id} className="bg-surface-white border border-border-tan h-full z-10 hover:-translate-y-2 hover:shadow-xl hover:border-archive-gold/50 transition-all duration-300 rounded-sm overflow-hidden flex flex-col">
                  <IncidentCard incident={inc} image={images[idx]} />
                </div>
              );
            })}
          </div>
        </section>

        {/* Pull Quote Section */}
        <section className="py-section-gap flex justify-center items-center px-4 mb-24 mt-24 cursor-magnifier bg-ink-black py-20 border border-archive-gold/20 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0,transparent_100%)]"></div>
          <blockquote className="relative max-w-4xl text-center z-10">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-archive-gold"></div>
            <p className="font-pull-quote text-[32px] md:text-[48px] text-surface-white italic leading-[1.3] font-light tracking-wide">
                "The truth is not what is spoken, but what remains when the noise has been systematically removed."
            </p>
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-archive-gold"></div>
          </blockquote>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-ink-black w-full border-t border-archive-gold/30 mt-auto py-20 flex flex-col items-center gap-10 px-margin-mobile md:px-margin-desktop text-surface-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #b8960c 25%, transparent 25%, transparent 75%, #b8960c 75%, #b8960c), repeating-linear-gradient(45deg, #b8960c 25%, #1a1a1a 25%, #1a1a1a 75%, #b8960c 75%, #b8960c)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }}></div>
        <div className="flex items-center gap-4 z-10">
          <span className="material-symbols-outlined text-[40px] text-archive-gold">assured_workload</span>
          <span className="font-masthead-logo text-[40px] md:text-[56px] font-black tracking-[0.05em] text-surface-white leading-none">RECALL</span>
        </div>
        
        <nav className="flex flex-wrap justify-center gap-8 font-label-tag text-[12px] uppercase font-bold tracking-widest z-10">
          <Link className="text-secondary-grey hover:text-archive-gold transition-colors" to="/ethics">Sovereign Ethics Code</Link>
          <a className="text-secondary-grey hover:text-archive-gold transition-colors" href="#">Verification Protocols</a>
          <a className="text-secondary-grey hover:text-archive-gold transition-colors" href="#">Terms of Record</a>
          <a className="text-secondary-grey hover:text-archive-gold transition-colors" href="#">Integrity Report</a>
        </nav>
        <div className="w-full max-w-2xl h-px bg-border-tan/20 z-10"></div>
        <p className="font-data-mono text-[11px] text-secondary-grey text-center z-10 tracking-widest">
            © 2026 RECALL PERMANENT ARCHIVE. PROTOCOL 7 VERIFIED.
        </p>
      </footer>
    </div>
  );
}
