import { Link } from 'react-router-dom';

export default function AccessTerminal() {
  return (
    <div className="bg-paper-base text-primary min-h-screen flex flex-col items-center justify-center font-body-text antialiased p-margin-mobile md:p-margin-desktop selection:bg-archive-gold selection:text-white">
      <main className="w-full max-w-md mx-auto flex-grow flex flex-col justify-center items-center">
        {/* Login Card */}
        <div className="bg-surface-white border border-border-tan w-full p-8 md:p-12 shadow-sm relative overflow-hidden">
          {/* Deco lines */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-primary"></div>
          <div className="absolute top-0 left-0 w-[4px] h-full bg-archive-gold opacity-80"></div>
          
          <div className="text-center mb-10">
            <h1 className="font-masthead-logo text-masthead-logo text-primary mb-2 tracking-tighter">ACCESS TERMINAL</h1>
            <p className="font-subheadline text-[13px] text-on-surface-variant uppercase tracking-widest font-bold">
              Sovereign Clearance Required
            </p>
            <div className="mt-6 flex justify-center">
              <span className="material-symbols-outlined text-4xl text-archive-gold" style={{ fontVariationSettings: "'FILL' 0" }}>
                fingerprint
              </span>
            </div>
          </div>
          
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); window.location.href = '/archive'; }}>
            {/* Field: Officer ID */}
            <div>
              <label className="block font-data-mono text-[11px] font-bold text-primary mb-2 uppercase tracking-wide flex justify-between items-end" htmlFor="officer-id">
                <span>Officer ID</span>
                <span className="text-[10px] text-on-surface-variant border border-border-tan px-1 bg-paper-base">REQ</span>
              </label>
              <input 
                className="w-full bg-paper-base border border-border-tan text-primary font-data-mono text-data-mono p-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors placeholder:text-on-surface-variant/50" 
                id="officer-id" 
                name="officer-id" 
                placeholder="e.g. O-1042-ALPHA" 
                type="text"
                required
              />
            </div>
            
            {/* Field: Biometric Hash */}
            <div>
              <label className="block font-data-mono text-[11px] font-bold text-primary mb-2 uppercase tracking-wide flex justify-between items-end" htmlFor="bio-hash">
                <span>Biometric Hash</span>
                <span className="text-[10px] text-on-surface-variant border border-border-tan px-1 bg-paper-base">SEC</span>
              </label>
              <div className="relative">
                <input 
                  className="w-full bg-paper-base border border-border-tan text-primary font-data-mono text-data-mono p-3 pr-10 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors placeholder:text-on-surface-variant/50" 
                  id="bio-hash" 
                  name="bio-hash" 
                  placeholder="••••••••••••••••" 
                  type="password"
                  required
                />
                <button className="absolute inset-y-0 right-0 px-3 flex items-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer" type="button">
                  <span className="material-symbols-outlined text-sm">visibility_off</span>
                </button>
              </div>
            </div>
            
            {/* Status Ticker (Fake) */}
            <div className="bg-surface-container border border-border-tan p-2 mt-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-press-red animate-pulse"></span>
              <span className="font-data-mono text-[10px] uppercase tracking-wider text-on-surface-variant">
                System Status: Encrypted Connection Established
              </span>
            </div>
            
            {/* Submit Button */}
            <button className="w-full bg-primary text-surface-white font-label-tag text-label-tag uppercase tracking-widest py-4 mt-8 border-2 border-primary hover:bg-surface-white hover:text-primary transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer" type="submit">
              <span>Initiate Sequence</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </form>
        </div>
      </main>
      
      {/* Contextual Footer */}
      <footer className="mt-12 w-full max-w-md mx-auto text-center flex flex-col items-center gap-4">
        <div className="w-16 h-[1px] bg-border-tan mb-2"></div>
        <p className="font-caption text-caption text-on-surface-variant uppercase tracking-widest">
          © 2026 RECALL Permanent Archive. All Rights Reserved.
        </p>
        <div className="flex gap-6 mt-2">
          <Link className="font-edition-number text-edition-number text-on-surface-variant hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-0.5 no-underline" to="/ethics">
            Operational Security
          </Link>
          <Link className="font-edition-number text-edition-number text-on-surface-variant hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-0.5 no-underline" to="/">
            Return to Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
