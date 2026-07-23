import Masthead from '../components/Masthead';
import { useApp } from '../context/AppContext';

export default function IntelDashboard() {
  const { state } = useApp();
  
  // Get incidents categorized by severity for the dashboard
  const activeIncidents = state.incidents.slice(0, 3);
  
  const alerts = [
    { icon: 'warning', text: 'Urgent Alert: Sector 7 breach detected.' },
    { icon: 'sensors', text: 'Operational Update: Comms relay online.' },
    { icon: 'history_edu', text: 'Causality Shift: Minor variance in Timeline B.' },
    { icon: 'account_balance', text: 'Ledger Entry: Funds secured for operation 04.' },
    { icon: 'terminal', text: 'System Status: All primary nodes functional.' },
  ];

  return (
    <div className="bg-paper-base text-on-surface min-h-screen flex flex-col font-body-text selection:bg-archive-gold selection:text-white">
      <Masthead />

      {/* SideNavBar (Used as an Alert Ticker) */}
      <div className="w-full h-8 flex items-center overflow-hidden bg-press-red text-surface-white font-data-mono text-[12px] uppercase">
        <div className="ticker-track flex gap-8 whitespace-nowrap">
          {/* Repeated for smooth infinite scroll */}
          {[...alerts, ...alerts, ...alerts].map((alert, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">{alert.icon}</span> 
              {alert.text}
            </span>
          ))}
        </div>
      </div>

      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        
        {/* Left Sidebar: Active Investigations */}
        <aside className="lg:col-span-3 flex flex-col gap-6">
          <div className="border-b border-border-tan pb-2 mb-4">
            <h2 className="font-headline-md text-headline-md text-primary">Active Directives</h2>
          </div>
          
          {activeIncidents.map((incident, i) => (
            <article key={incident.id} className="bg-surface-white border border-border-tan p-4 flex flex-col gap-3 hover:border-primary transition-colors cursor-pointer group">
              <div className="flex justify-between items-start">
                <span className={`text-surface-white font-label-tag text-label-tag px-2 py-1 uppercase tracking-wider ${
                  i === 0 ? 'bg-cat-loss' : 'bg-cat-legal'
                }`}>
                  {i === 0 ? 'Priority Alpha' : 'Review Req'}
                </span>
                <span className="font-data-mono text-data-mono text-secondary-grey">{incident.id}</span>
              </div>
              <h3 className="font-headline-sm text-subheadline text-primary group-hover:text-secondary transition-colors">
                {incident.title}
              </h3>
              <p className="font-body-text text-body-text text-on-surface-variant line-clamp-2">
                {incident.description}
              </p>
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border-tan">
                <span className={`material-symbols-outlined text-[16px] ${i === 0 ? 'text-archive-gold' : 'text-cat-statement'}`}>
                  {i === 0 ? 'clock_loader_40' : 'gavel'}
                </span>
                <span className="font-data-mono text-data-mono text-secondary-grey">
                  {i === 0 ? 'T-Minus 04:22:10' : 'Pending Ruling'}
                </span>
              </div>
            </article>
          ))}
        </aside>

        {/* Center Canvas: Map */}
        <section className="lg:col-span-6 flex flex-col gap-6">
          <div className="border-b border-border-tan pb-2 mb-4 flex justify-between items-end">
            <h1 className="font-headline-lg text-headline-lg text-primary">Causality Node Matrix</h1>
            <span className="font-data-mono text-data-mono text-secondary-grey">Render: Topographical</span>
          </div>
          
          <div className="w-full h-[400px] border border-border-tan bg-surface-white relative overflow-hidden flex items-center justify-center p-4">
            <div className="absolute inset-0 w-full h-full bg-surface-container opacity-50 bg-[radial-gradient(circle_at_center,_var(--color-border-tan)_0%,_transparent_100%)]"></div>
            
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center mix-blend-multiply opacity-80"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2948&auto=format&fit=crop')" }}
            />
            
            {/* Overlay UI */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="bg-surface-white border border-border-tan px-3 py-1 font-data-mono text-data-mono text-primary shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                LAT: 28.6139
              </span>
              <span className="bg-surface-white border border-border-tan px-3 py-1 font-data-mono text-data-mono text-primary shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                LNG: 77.2090
              </span>
            </div>
            
            {/* Map Node Indicator */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-press-red border-2 border-paper-base animate-pulse-dot"></div>
              <div className="w-px h-8 bg-press-red"></div>
              <span className="bg-surface-white px-2 py-1 font-data-mono text-[10px] text-press-red border border-press-red uppercase">
                Active Node Alert
              </span>
            </div>
          </div>
          
          {/* Pull Quote */}
          <div className="pl-4 border-l-4 border-archive-gold my-4">
            <p className="font-pull-quote text-pull-quote text-primary italic">
              "The integrity of the timeline depends on the absolute neutrality of the observer."
            </p>
            <span className="block mt-2 font-caption text-caption text-secondary-grey uppercase tracking-widest">
              — Archival Directive 01
            </span>
          </div>
        </section>

        {/* Right Sidebar: Sector Status */}
        <aside className="lg:col-span-3 flex flex-col gap-6">
          <div className="border-b border-border-tan pb-2 mb-4">
            <h2 className="font-headline-md text-headline-md text-primary">Sector Status</h2>
          </div>
          
          <div className="bg-surface-white border border-border-tan p-4 flex flex-col gap-4">
            {[
              { id: 1, name: 'Core', status: 100, color: 'status-verified', icon: 'verified' },
              { id: 2, name: 'North Grid', status: 82, color: 'archive-gold', icon: 'warning' },
              { id: 3, name: 'East Delta', status: 100, color: 'status-verified', icon: 'verified' },
              { id: 4, name: 'South Reach', status: 45, color: 'press-red', icon: 'error' },
              { id: 7, name: 'Perimeter', status: 12, color: 'cat-loss', icon: 'dangerous' },
            ].map((sector) => (
              <div key={sector.id} className="flex flex-col gap-1 pb-3 border-b border-border-tan last:border-0 last:pb-0">
                <div className="flex justify-between items-center">
                  <span className="font-data-mono text-data-mono font-bold text-primary">
                    Sector {sector.id}: {sector.name}
                  </span>
                  <span className={`material-symbols-outlined text-${sector.color} text-[16px]`}>
                    {sector.icon}
                  </span>
                </div>
                <div className="w-full bg-surface-container h-1 mt-1">
                  <div className={`bg-${sector.color} h-1`} style={{ width: `${sector.status}%` }}></div>
                </div>
                <span className="font-caption text-caption text-secondary-grey text-right mt-1">
                  {sector.status}% Stability
                </span>
              </div>
            ))}
          </div>
        </aside>

      </main>

      <footer className="bg-surface-container-highest text-on-surface-variant font-caption text-caption uppercase tracking-widest w-full border-t border-border-tan px-margin-desktop py-section-gap flex flex-col items-center gap-4 mt-auto">
        <div className="font-masthead-logo text-headline-md text-on-surface mb-2">RECALL</div>
        <div className="text-secondary-grey text-center">
          © 2026 RECALL Archival Protocol. Established under the Sovereign Ethics Code.
        </div>
      </footer>
    </div>
  );
}
