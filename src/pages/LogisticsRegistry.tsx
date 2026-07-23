import { useState, useEffect } from 'react';
import Masthead from '../components/Masthead';

export default function LogisticsRegistry() {
  const [synced, setSynced] = useState(14092);
  const [inTransit, setInTransit] = useState(402);
  const [unaccounted, setUnaccounted] = useState(24);
  const [blocks, setBlocks] = useState([
    { id: 'BLK-89A2', status: 'CRITICAL', text: 'Timestamp mismatch between physical custody log and ledger hash.', location: 'Sector 4', time: '12 mins ago' },
    { id: 'BLK-44B1', status: 'REVIEW', text: 'Token weight variance exceeds standard tolerance margins.', location: 'Sector 7', time: '1 hr ago' },
    { id: 'BLK-99C4', status: 'REVIEW', text: 'Signature missing from secondary auditor.', location: 'Sector 2', time: '3 hrs ago' }
  ]);
  const [processing, setProcessing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toISOString().split('T')[1].substring(0, 8));

  useEffect(() => {
    const interval = setInterval(() => {
      setSynced(prev => prev + Math.floor(Math.random() * 3));
      setCurrentTime(new Date().toISOString().split('T')[1].substring(0, 8));
      if (Math.random() > 0.7) setInTransit(prev => Math.max(0, prev + (Math.random() > 0.5 ? 1 : -1)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleProcess = () => {
    setProcessing(true);
    setTimeout(() => {
      setBlocks(prev => prev.slice(1)); // Process one by one
      setUnaccounted(prev => Math.max(0, prev - 8));
      setProcessing(false);
    }, 800);
  };
  return (
    <div className="bg-paper-base text-ink-black min-h-screen flex flex-col font-body-text selection:bg-archive-gold selection:text-white">
      <Masthead />

      {/* SideNavBar (Alert Ticker) */}
      <div className="w-full h-8 flex items-center overflow-hidden bg-press-red text-surface-white font-data-mono text-[12px] uppercase">
        <div className="flex items-center px-4 border-r border-surface-white/20 h-full whitespace-nowrap bg-press-red z-10">
          <span className="font-bold underline mr-2">System Status</span>
          <span className="material-symbols-outlined text-sm mr-4">terminal</span>
        </div>
        <div className="ticker-track flex-1 flex space-x-8">
          <span>[URGENT ALERT] SECTOR 7 DESYNC DETECTED</span>
          <span>[OPERATIONAL UPDATE] BATCH 894 CLEARED</span>
          <span>[CAUSALITY SHIFT] MONITORING TIMELINE VARIANCE</span>
          <span>[URGENT ALERT] SECTOR 7 DESYNC DETECTED</span>
          <span>[OPERATIONAL UPDATE] BATCH 894 CLEARED</span>
        </div>
      </div>

      <main className="flex-1 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 grid grid-cols-1 md:grid-cols-12 gap-px bg-border-tan">
        
        {/* Header Section */}
        <div className="col-span-1 md:col-span-12 bg-surface-white p-6 border border-border-tan mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-border-tan pb-4">
            <div>
              <h1 className="font-headline-lg text-headline-lg mb-2 text-ink-black">Registry Synchronization</h1>
              <p className="font-subheadline text-subheadline text-secondary-grey">
                Live monitoring of physical tokens vs. digital ledger
              </p>
            </div>
            <div className="mt-4 md:mt-0 font-data-mono text-data-mono text-right">
              <div className="text-ink-black">LAST SYNC: {currentTime} UTC</div>
              <div className="text-press-red">DESYNC RATE: {(unaccounted / (synced / 100)).toFixed(2)}%</div>
            </div>
          </div>
        </div>

        {/* Data Visualization Grid */}
        <div className="col-span-1 md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-border-tan mr-0 md:mr-px">
          {/* Overall Status Chart */}
          <div className="col-span-1 md:col-span-2 bg-surface-white p-6 border border-border-tan">
            <h2 className="font-headline-md text-headline-md mb-4 border-b border-border-tan pb-2 flex items-center justify-between text-ink-black">
              <span>Global Alignment</span>
              <span className="font-edition-number text-edition-number text-secondary-grey">FIG. 1</span>
            </h2>
            <div 
              className="h-64 bg-paper-base border border-border-tan flex items-end justify-around p-4 relative"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'grayscale(100%) contrast(150%)',
                mixBlendMode: 'multiply'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center font-data-mono text-data-mono text-ink-black bg-surface-white/60">
                [DATA VISUALIZATION RENDER]
              </div>
            </div>
          </div>

          {/* Token Metrics */}
          <div className="bg-surface-white p-6 border border-border-tan">
            <h3 className="font-subheadline text-subheadline mb-3 border-b border-border-tan pb-1 text-ink-black">Physical Tokens</h3>
            <div className="space-y-4 font-data-mono text-data-mono text-ink-black">
              <div className="flex justify-between border-b border-border-tan border-dashed pb-1">
                <span className="text-secondary-grey">TOTAL LOGGED</span>
                <span className="font-bold transition-all">{synced.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-border-tan border-dashed pb-1">
                <span className="text-secondary-grey">IN TRANSIT</span>
                <span className="transition-all">{inTransit}</span>
              </div>
              <div className="flex justify-between border-b border-border-tan border-dashed pb-1 text-press-red font-bold">
                <span>UNACCOUNTED</span>
                <span className="transition-all">{unaccounted}</span>
              </div>
            </div>
          </div>

          {/* Digital Ledger Metrics */}
          <div className="bg-surface-white p-6 border border-border-tan">
            <h3 className="font-subheadline text-subheadline mb-3 border-b border-border-tan pb-1 text-ink-black">Ledger Entries</h3>
            <div className="space-y-4 font-data-mono text-data-mono text-ink-black">
              <div className="flex justify-between border-b border-border-tan border-dashed pb-1">
                <span className="text-secondary-grey">TOTAL HASHES</span>
                <span className="font-bold transition-all">{(synced - unaccounted).toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-border-tan border-dashed pb-1">
                <span className="text-secondary-grey">PENDING COMMIT</span>
                <span className="transition-all">{Math.floor(inTransit / 4)}</span>
              </div>
              <div className="flex justify-between border-b border-border-tan border-dashed pb-1 text-cat-shutdown font-bold">
                <span>ORPHANED</span>
                <span className="transition-all">{Math.floor(unaccounted / 3)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actionable Sidebar (Unverified Blocks) */}
        <div className="col-span-1 md:col-span-4 bg-surface-white border border-border-tan flex flex-col mt-6 md:mt-0">
          <div className="p-6 border-b border-border-tan bg-paper-base">
            <h2 className="font-headline-md text-headline-md flex items-center text-press-red">
              <span className="material-symbols-outlined mr-2">warning</span>
              Unverified Blocks
            </h2>
            <p className="font-caption text-caption text-secondary-grey mt-2">Manual intervention required</p>
          </div>
          
          <div className="flex-1 overflow-y-auto max-h-[600px] relative">
            {blocks.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-secondary-grey p-8">
                <span className="material-symbols-outlined text-4xl mb-2">check_circle</span>
                <p className="font-data-mono text-sm uppercase">Queue Cleared</p>
              </div>
            ) : (
              blocks.map((block) => (
                <div key={block.id} className="p-4 border-b border-border-tan hover:bg-surface-container-low transition-all duration-300 cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-data-mono text-data-mono font-bold group-hover:text-primary text-ink-black">{block.id}</span>
                    <span className={`text-surface-white font-label-tag text-label-tag px-2 py-1 ${block.status === 'CRITICAL' ? 'bg-press-red' : 'bg-archive-gold'}`}>
                      {block.status}
                    </span>
                  </div>
                  <p className="font-body-text text-body-text text-[14px] leading-snug mb-2 text-ink-black">{block.text}</p>
                  <div className="font-caption text-caption text-secondary-grey uppercase">{block.location} • {block.time}</div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-border-tan bg-paper-base mt-auto">
            <button 
              onClick={handleProcess}
              disabled={blocks.length === 0 || processing}
              className="w-full font-label-tag text-label-tag px-4 py-3 border-2 border-ink-black uppercase hover:bg-ink-black hover:text-paper-base transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {processing ? (
                <><span className="material-symbols-outlined animate-spin text-[16px]">sync</span> Processing...</>
              ) : (
                'Process Queue'
              )}
            </button>
          </div>
        </div>

      </main>

      <footer className="flex flex-col items-center justify-center py-section-gap w-full border-t border-border-tan mt-auto bg-paper-base">
        <div className="font-headline-md text-headline-md text-primary mb-4">RECALL</div>
        <div className="font-caption text-caption uppercase tracking-widest text-secondary-grey">
          © 2026 RECALL PERMANENT ARCHIVE. ALL TRUTH IS RECORDED.
        </div>
      </footer>
    </div>
  );
}
