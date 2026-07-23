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
  
  const [form, setForm] = useState({
    title: '',
    category: '' as Category | '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

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
      sources: [],
      entityIds: [],
      triggeredBy: [],
      ledTo: [],
      contributorCredit: 'Anonymous Contributor',
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
          <span className="material-symbols-outlined text-6xl text-status-verified mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified_user
          </span>
          <h1 className="font-headline-lg text-headline-lg text-primary mb-4">Record Committed</h1>
          <p className="font-body-text text-body-text text-on-surface-variant mb-8 max-w-lg">
            Your field report has been encrypted and submitted to the RECALL verification queue. You will be credited as contributor once cleared by the sovereign board.
          </p>
          <Link 
            to="/archive"
            className="px-6 py-3 bg-primary text-surface-white font-label-tag text-label-tag uppercase tracking-widest hover:bg-ink-black transition-colors no-underline"
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

      <main className="flex-grow w-full max-w-3xl mx-auto px-margin-mobile md:px-0 py-section-gap">
        <div className="mb-12 border-b border-border-tan pb-6">
          <span className="inline-block bg-press-red text-surface-white px-2 py-1 font-label-tag text-label-tag uppercase mb-4">
            Official Record
          </span>
          <h1 className="font-headline-lg text-headline-lg text-primary mb-2">Field Report Submission</h1>
          <p className="font-body-text text-body-text text-on-surface-variant">
            All entries are permanently logged in the central archive. Ensure accuracy before finalizing submission.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-surface-white p-8 border border-border-tan relative shadow-sm">
          {/* Decorative corner marks */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary -mt-1 -ml-1"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary -mt-1 -mr-1"></div>

          {/* Section 1: Basic Info */}
          <div className="space-y-6 border-b border-border-tan pb-8">
            <h2 className="font-subheadline text-subheadline text-primary border-l-4 border-archive-gold pl-3">
              Incident Metadata
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="title">Incident Title</label>
                <input 
                  id="title"
                  type="text" 
                  required
                  placeholder="Brief descriptor of event"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full p-3"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="category">Primary Evidence Type / Category</label>
                <select 
                  id="category"
                  required
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value as Category })}
                  className="w-full p-3"
                >
                  <option value="">Select Category...</option>
                  {CATEGORIES.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2 col-span-2">
                <label htmlFor="location">Operational Coordinates / Location</label>
                <input 
                  id="location"
                  type="text" 
                  required
                  placeholder="e.g. 4QFJ 1234 5678 or City, State"
                  value={form.location}
                  onChange={e => setForm({ ...form, location: e.target.value })}
                  className="w-full p-3 font-data-mono text-data-mono"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="date">Temporal Marker (Zulu)</label>
                <input 
                  id="date"
                  type="date"
                  required
                  value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                  className="w-full p-3 font-data-mono text-data-mono bg-surface-white"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Narrative */}
          <div className="space-y-6 border-b border-border-tan pb-8">
            <h2 className="font-subheadline text-subheadline text-primary border-l-4 border-archive-gold pl-3">
              Narrative Report
            </h2>
            <div className="space-y-2">
              <label htmlFor="narrative">Detailed Account</label>
              <textarea 
                id="narrative"
                required
                rows={8}
                placeholder="Begin formal account here. Facts only. No opinion or editorializing."
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                className="w-full p-4 resize-y"
              ></textarea>
            </div>
          </div>

          {/* Section 3: Evidence Upload */}
          <div className="space-y-6">
            <h2 className="font-subheadline text-subheadline text-primary border-l-4 border-archive-gold pl-3">
              Digital Annex
            </h2>
            <div className="border-2 border-dashed border-border-tan p-8 text-center bg-paper-base cursor-pointer hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined text-4xl text-secondary-grey mb-4 block">upload_file</span>
              <p className="font-body-text text-body-text mb-2">Drag and drop high-resolution scans here</p>
              <p className="font-caption text-caption text-secondary-grey">Accepted formats: TIFF, RAW, Encrypted PDF. Max size: 50MB.</p>
              <button 
                type="button"
                className="mt-4 border border-primary px-4 py-2 font-label-tag text-label-tag text-primary uppercase hover:bg-primary hover:text-white transition-colors"
                onClick={(e) => { e.preventDefault(); alert("File upload is simulated."); }}
              >
                Browse Files
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 flex justify-end gap-4 border-t border-border-tan mt-8">
            <Link 
              to="/archive"
              className="px-6 py-3 border border-border-tan text-secondary-grey font-label-tag text-label-tag uppercase hover:bg-paper-base transition-colors no-underline"
            >
              Cancel
            </Link>
            <button 
              type="submit"
              className="px-6 py-3 bg-primary text-surface-white font-label-tag text-label-tag uppercase tracking-widest hover:bg-ink-black transition-colors flex items-center gap-2 border border-primary cursor-pointer"
            >
              Commit to Archive
              <span className="material-symbols-outlined text-[16px]">lock</span>
            </button>
          </div>
        </form>
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
