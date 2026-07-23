import Masthead from '../components/Masthead';

export default function EthicsCode() {
  return (
    <div className="bg-paper-base text-on-surface min-h-screen flex flex-col font-body-text selection:bg-archive-gold selection:text-white">
      <Masthead />
      
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
        <header className="text-center mb-16 border-b border-border-tan pb-8">
          <h1 className="font-headline-lg text-[48px] md:text-[72px] leading-tight font-black uppercase tracking-tighter text-primary mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900 }}>
            The Sovereign Ethics Code
          </h1>
          <p className="font-subheadline text-subheadline text-secondary-grey uppercase tracking-widest max-w-2xl mx-auto">
            Foundational Principles of the Permanent Archive
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 border-b border-border-tan pb-16">
          
          {/* Context & Metadata */}
          <aside className="md:col-span-3 md:border-r md:border-border-tan pr-0 md:pr-8 mb-8 md:mb-0">
            <div className="sticky top-8">
              <h2 className="font-label-tag text-label-tag text-archive-gold mb-6 uppercase tracking-widest border-b border-border-tan pb-2">
                Document Metadata
              </h2>
              <ul className="space-y-4 font-data-mono text-data-mono text-secondary-grey p-0 m-0 list-none">
                <li>
                  <span className="block text-primary font-bold">Ratified:</span>
                  2026.11.14
                </li>
                <li>
                  <span className="block text-primary font-bold">Classification:</span>
                  UNRESTRICTED
                </li>
                <li>
                  <span className="block text-primary font-bold">Authority:</span>
                  RECALL Oversight Board
                </li>
                <li>
                  <span className="block text-primary font-bold">Revision:</span>
                  V.4.2
                </li>
              </ul>
              
              <div className="mt-12 p-4 bg-surface-white border border-border-tan">
                <span className="material-symbols-outlined text-cat-legal mb-2 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
                <p className="font-caption text-caption text-on-surface-variant">
                  This document serves as the binding framework for all data acquisition, storage, and dissemination within the RECALL ecosystem.
                </p>
              </div>
            </div>
          </aside>

          {/* Main Content Canvas */}
          <article className="md:col-span-6 md:border-r md:border-border-tan px-0 md:px-12 mb-8 md:mb-0">
            
            <section className="mb-section-gap">
              <h3 className="font-headline-md text-headline-md text-primary mb-6 flex items-center gap-4">
                <span className="text-archive-gold font-black">I.</span> The Neutrality of the Observer
              </h3>
              <div className="font-body-text text-body-text space-y-6 text-on-surface leading-loose">
                <p>
                  The integrity of the Permanent Archive relies fundamentally upon the absolute neutrality of its curators and automated systems. Observation must be severed from intervention. The primary directive of any recording entity within the RECALL framework is to capture reality as it unfolds, free from editorial bias, emotional prejudice, or algorithmic distortion.
                </p>
                <p>
                  We hold that truth is often complex and contradictory. Therefore, the archive shall not sanitize, interpret, or contextualize events beyond the strict parameters of verified metadata. The observer's lens must remain cold, precise, and indifferent to consequence. To alter a record to serve a narrative is the gravest offense against the Sovereign Code.
                </p>
              </div>
            </section>

            <section className="mb-section-gap">
              <h3 className="font-headline-md text-headline-md text-primary mb-6 flex items-center gap-4">
                <span className="text-archive-gold font-black">II.</span> The Permanence of the Record
              </h3>
              <div className="font-body-text text-body-text space-y-6 text-on-surface leading-loose">
                <p>
                  Once an incident is verified and cryptographically sealed within the Archive, it enters a state of digital permanence. It cannot be redacted, erased, or fundamentally altered by any internal or external authority. The right to be forgotten is superseded by the collective right to remember.
                </p>
                <blockquote className="font-pull-quote text-[26px] leading-snug text-archive-gold italic border-l-4 border-archive-gold pl-6 my-8 py-2">
                  "A society that erases its failures is condemned to endlessly repeat them in the dark."
                </blockquote>
                <p>
                  In instances where new evidence contradicts an established record, the original artifact remains untouched. Addendums and verification trails shall be appended, creating a transparent lineage of truth rather than a revised history.
                </p>
              </div>
            </section>

            <section className="mb-section-gap">
              <h3 className="font-headline-md text-headline-md text-primary mb-6 flex items-center gap-4">
                <span className="text-archive-gold font-black">III.</span> The Rights of the Witness
              </h3>
              <div className="font-body-text text-body-text space-y-6 text-on-surface leading-loose">
                <p>
                  Those who contribute to the Archive—the Field Reporters, the Citizen Observers, the Whistleblowers—are afforded absolute cryptographic anonymity, unless they explicitly waive this right. The Archive protects the source with the same fervor it protects the data.
                </p>
                <p>
                  However, anonymity does not shield a witness from the rigorous protocols of verification. All submitted material must withstand multi-spectral analysis and consensus validation before achieving Permanent status. The burden of proof remains high to defend the sanctity of the repository against synthetic manipulation and intentional falsehoods.
                </p>
              </div>
            </section>

          </article>

          {/* Signatures & Authority */}
          <aside className="md:col-span-3 pl-0 md:pl-8 flex flex-col items-center justify-start pt-12 md:pt-0">
            <div className="w-[150px] h-[150px] rounded-full border-2 border-archive-gold flex items-center justify-center mx-auto mb-8">
              <span className="material-symbols-outlined text-archive-gold text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
            </div>
            
            <div className="text-center space-y-8 w-full">
              <div className="border-b border-primary pb-2 w-3/4 mx-auto">
                <span className="font-headline-lg text-[32px] italic text-ink-black opacity-80" style={{ fontFamily: "'Playfair Display', serif" }}>
                  A.V. Vance
                </span>
              </div>
              <p className="font-caption text-caption uppercase tracking-widest text-secondary-grey">Chief Archivist</p>
              
              <div className="border-b border-primary pb-2 w-3/4 mx-auto pt-8">
                <span className="font-headline-lg text-[24px] italic text-ink-black opacity-80" style={{ fontFamily: "'Playfair Display', serif" }}>
                  E.R. Thorne
                </span>
              </div>
              <p className="font-caption text-caption uppercase tracking-widest text-secondary-grey">Director of Ethics</p>
            </div>
          </aside>
          
        </div>
      </main>
      
      <footer className="bg-paper-base flex flex-col items-center justify-center py-12 px-margin-desktop w-full border-t border-border-tan gap-4 mt-auto">
        <div className="font-masthead-logo text-headline-md text-primary uppercase tracking-tighter">
          RECALL
        </div>
        <p className="font-caption text-caption text-on-surface-variant mt-4 uppercase tracking-widest">
          © 2026 RECALL PERMANENT ARCHIVE. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
}
