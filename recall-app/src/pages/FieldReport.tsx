import { useState } from 'react';
import Masthead from '../components/Masthead';
import { useApp } from '../context/AppContext';
import type { Category, Incident } from '../types';
import { Link } from 'react-router-dom';

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'violence', label: 'Use of force, injury, harm' },
  { value: 'legal', label: 'Arrests, FIRs, court orders' },
  { value: 'shutdown', label: 'Internet, transport, services blocked' },
  { value: 'statement', label: 'Official declarations, press releases' },
  { value: 'other', label: 'Other documented incidents' },
];

export default function FieldReport() {
  const { state, dispatch } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  
  const [form, setForm] = useState({
    name: '',
    affiliation: '',
    title: '',
    category: '' as Category | '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    sources: ''
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.category) return;
    
    const newIncident: Incident = {
      id: `INC-${String(state.incidents.length + 1).padStart(4, '0')}`,
      title: form.title || 'Untitled Incident',
      date: form.date,
      location: form.location || 'Unknown Coordinates',
      category: form.category,
      description: form.description,
      status: 'pending',
      sources: form.sources ? form.sources.split(',').map(s => ({ name: 'Submitted Link', url: s.trim() })) : [],
      entityIds: [],
      triggeredBy: [],
      ledTo: [],
      contributorCredit: form.name || 'Anonymous Contributor',
      editionIds: [],
    };
    
    dispatch({ type: 'ADD_INCIDENT', payload: newIncident });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-paper-base text-on-surface min-h-screen flex flex-col font-body-text">
        <Masthead />
        <main className="flex-grow w-full max-w-3xl mx-auto px-margin-mobile md:px-0 py-section-gap flex flex-col items-center justify-center text-center">
          <span className="material-symbols-outlined text-[80px] text-cat-legal mb-6 animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified_user
          </span>
          <h1 className="font-headline-lg text-[48px] font-bold text-ink-black mb-4">Record Committed</h1>
          <p className="font-body-text text-[18px] text-secondary-grey mb-12 max-w-lg leading-relaxed">
            Your field report has been encrypted and submitted to the RECALL verification queue. You will be credited as <strong className="text-ink-black">{form.name || 'Anonymous'}</strong> once cleared by the sovereign board.
          </p>
          <Link 
            to="/archive"
            className="px-8 py-4 bg-ink-black text-surface-white font-label-tag text-[13px] font-bold uppercase tracking-widest hover:bg-archive-gold hover:text-ink-black transition-colors no-underline shadow-xl"
          >
            Return to Archive
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-paper-base text-on-surface min-h-screen flex flex-col font-body-text selection:bg-archive-gold selection:text-white">
      <Masthead />

      <main className="flex-grow w-full max-w-4xl mx-auto px-margin-mobile md:px-0 py-section-gap">
        <div className="mb-12 border-b border-border-tan pb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block bg-press-red text-surface-white px-3 py-1 font-label-tag text-[10px] uppercase font-bold tracking-widest animate-pulse">
              Live Intake Form
            </span>
            <span className="font-data-mono text-[11px] text-secondary-grey uppercase tracking-widest">
              SEC-7 ENCRYPTED CONNECTION
            </span>
          </div>
          <h1 className="font-headline-lg text-[48px] font-bold text-ink-black mb-2 tracking-tight">Field Report Submission</h1>
          <p className="font-body-text text-[18px] text-secondary-grey max-w-2xl">
            All entries are permanently logged in the central archive. Strict verification protocols apply to prevent data corruption.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-surface-white p-8 md:p-12 border border-border-tan shadow-xl relative overflow-hidden">
          {/* Decorative Corner Lines */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-archive-gold"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-archive-gold"></div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between mb-2">
              <span className={`font-data-mono text-[10px] uppercase font-bold tracking-widest ${step >= 1 ? 'text-archive-gold' : 'text-secondary-grey'}`}>1. Identity</span>
              <span className={`font-data-mono text-[10px] uppercase font-bold tracking-widest ${step >= 2 ? 'text-archive-gold' : 'text-secondary-grey'}`}>2. Narrative</span>
              <span className={`font-data-mono text-[10px] uppercase font-bold tracking-widest ${step >= 3 ? 'text-archive-gold' : 'text-secondary-grey'}`}>3. Geospatial</span>
            </div>
            <div className="flex gap-2 h-1">
              <div className={`flex-1 transition-colors duration-500 ${step >= 1 ? 'bg-archive-gold' : 'bg-border-tan'}`}></div>
              <div className={`flex-1 transition-colors duration-500 ${step >= 2 ? 'bg-archive-gold' : 'bg-border-tan'}`}></div>
              <div className={`flex-1 transition-colors duration-500 ${step >= 3 ? 'bg-archive-gold' : 'bg-border-tan'}`}></div>
            </div>
          </div>

          {/* STEP 1: IDENTITY */}
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="font-headline-md text-[28px] font-bold text-ink-black border-l-4 border-archive-gold pl-4">
                Identity Verification
              </h2>
              <p className="font-body-text text-[14px] text-secondary-grey bg-surface-container-low p-4 border-l-2 border-border-tan">
                To prevent spam and adversarial data injection, all field agents must provide identification. This data is kept strictly confidential under Protocol 7.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label htmlFor="name" className="font-label-tag text-[12px] uppercase font-bold tracking-widest text-ink-black">Agent Name / Alias</label>
                  <input 
                    id="name" type="text" required
                    placeholder="Enter your registered name or alias"
                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full p-4 border-2 border-border-tan focus:outline-none focus:border-archive-gold font-body-text text-ink-black bg-surface-white transition-colors"
                  />
                </div>
                
                <div className="space-y-3">
                  <label htmlFor="affiliation" className="font-label-tag text-[12px] uppercase font-bold tracking-widest text-ink-black">Affiliation / Organization</label>
                  <input 
                    id="affiliation" type="text"
                    placeholder="Independent, Press, NGO, etc."
                    value={form.affiliation} onChange={e => setForm({ ...form, affiliation: e.target.value })}
                    className="w-full p-4 border-2 border-border-tan focus:outline-none focus:border-archive-gold font-body-text text-ink-black bg-surface-white transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: NARRATIVE */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="font-headline-md text-[28px] font-bold text-ink-black border-l-4 border-archive-gold pl-4">
                Incident Narrative
              </h2>
              
              <div className="space-y-3">
                <label htmlFor="title" className="font-label-tag text-[12px] uppercase font-bold tracking-widest text-ink-black">Event Designation (Title)</label>
                <input 
                  id="title" type="text" required
                  placeholder="Clear, factual description of the event"
                  value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full p-4 border-2 border-border-tan focus:outline-none focus:border-archive-gold font-body-text text-[18px] text-ink-black font-bold bg-surface-white transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label htmlFor="category" className="font-label-tag text-[12px] uppercase font-bold tracking-widest text-ink-black">Primary Evidence Type</label>
                  <select 
                    id="category" required
                    value={form.category} onChange={e => setForm({ ...form, category: e.target.value as Category })}
                    className="w-full p-4 border-2 border-border-tan focus:outline-none focus:border-archive-gold font-body-text text-ink-black bg-surface-white cursor-pointer"
                  >
                    <option value="">Select Classification...</option>
                    {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
                <div className="space-y-3">
                  <label htmlFor="date" className="font-label-tag text-[12px] uppercase font-bold tracking-widest text-ink-black">Temporal Marker (Date)</label>
                  <input 
                    id="date" type="date" required
                    value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                    className="w-full p-4 border-2 border-border-tan focus:outline-none focus:border-archive-gold font-data-mono text-[14px] text-ink-black font-bold bg-surface-white"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor="narrative" className="font-label-tag text-[12px] uppercase font-bold tracking-widest text-ink-black">Detailed Field Account</label>
                <textarea 
                  id="narrative" required rows={6}
                  placeholder="Record factual observations only. Omit speculation. Note exact sequences of events."
                  value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full p-4 border-2 border-border-tan focus:outline-none focus:border-archive-gold font-body-text text-ink-black resize-y leading-relaxed"
                ></textarea>
              </div>
            </div>
          )}

          {/* STEP 3: GEOSPATIAL */}
          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="font-headline-md text-[28px] font-bold text-ink-black border-l-4 border-archive-gold pl-4">
                Geospatial & Verification
              </h2>
              
              <div className="space-y-3">
                <label htmlFor="location" className="font-label-tag text-[12px] uppercase font-bold tracking-widest text-ink-black">Operational Coordinates / Location</label>
                <input 
                  id="location" type="text" required
                  placeholder="e.g. 18.92N, 72.83E or exact street intersection"
                  value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
                  className="w-full p-4 border-2 border-border-tan focus:outline-none focus:border-archive-gold font-data-mono text-[16px] text-ink-black font-bold bg-surface-white uppercase"
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="sources" className="font-label-tag text-[12px] uppercase font-bold tracking-widest text-ink-black">Verification Links (Comma separated URLs)</label>
                <input 
                  id="sources" type="text"
                  placeholder="https://..."
                  value={form.sources} onChange={e => setForm({ ...form, sources: e.target.value })}
                  className="w-full p-4 border-2 border-border-tan focus:outline-none focus:border-archive-gold font-data-mono text-[14px] text-secondary-grey bg-surface-white"
                />
              </div>

              <div className="bg-ink-black text-surface-white p-8 mt-6 flex flex-col md:flex-row items-center gap-6 shadow-lg">
                <span className="material-symbols-outlined text-[48px] text-archive-gold animate-pulse">lock_person</span>
                <div>
                  <h4 className="font-label-tag text-[12px] font-bold tracking-widest text-archive-gold mb-2 uppercase">Integrity Pledge</h4>
                  <p className="font-body-text text-[14px] text-secondary-grey">
                    By submitting this report, you attest that the information provided is factually accurate to the best of your knowledge. False records will result in immediate permanent expulsion from the RECALL network.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Actions */}
          <div className="pt-8 mt-8 border-t-2 border-border-tan flex flex-col md:flex-row justify-between items-center gap-4">
            {step === 1 ? (
              <Link to="/archive" className="w-full md:w-auto text-center px-8 py-4 border-2 border-border-tan text-secondary-grey font-label-tag text-[12px] font-bold uppercase tracking-widest hover:border-ink-black hover:text-ink-black transition-colors no-underline">
                Abort Protocol
              </Link>
            ) : (
              <button type="button" onClick={prevStep} className="w-full md:w-auto px-8 py-4 border-2 border-border-tan text-ink-black font-label-tag text-[12px] font-bold uppercase tracking-widest hover:bg-surface-container-low transition-colors">
                Previous Stage
              </button>
            )}

            {step < 3 ? (
              <button 
                type="button" 
                onClick={() => {
                  // Basic validation before advancing
                  if (step === 1 && !form.name) { alert("Identity requires Name"); return; }
                  if (step === 2 && (!form.title || !form.category || !form.description)) { alert("Narrative requires Title, Category, and Description"); return; }
                  nextStep();
                }}
                className="w-full md:w-auto px-8 py-4 bg-ink-black text-surface-white font-label-tag text-[12px] font-bold uppercase tracking-widest hover:bg-archive-gold hover:text-ink-black transition-colors shadow-lg"
              >
                Proceed to Stage {step + 1}
              </button>
            ) : (
              <button 
                type="submit"
                className="w-full md:w-auto px-8 py-4 bg-archive-gold text-ink-black font-label-tag text-[12px] font-bold uppercase tracking-widest hover:bg-ink-black hover:text-surface-white transition-colors flex items-center justify-center gap-3 shadow-xl"
              >
                Commit to Archive
                <span className="material-symbols-outlined text-[18px]">lock</span>
              </button>
            )}
          </div>
        </form>
      </main>

      <footer className="flex flex-col items-center justify-center py-section-gap w-full border-t border-border-tan mt-auto bg-ink-black text-surface-white">
        <div className="font-masthead-logo text-[32px] font-black tracking-[0.05em] mb-4">RECALL</div>
        <div className="font-data-mono text-[10px] uppercase tracking-widest text-secondary-grey">
          © 2026 RECALL PERMANENT ARCHIVE. ALL TRUTH IS RECORDED.
        </div>
      </footer>
    </div>
  );
}
