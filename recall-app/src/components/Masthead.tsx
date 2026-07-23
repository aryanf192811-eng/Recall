import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import BreakingTicker from './BreakingTicker';

export default function Masthead() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  function isActive(path: string) {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  }

  const navLinks = [
    { label: "Today's Edition", path: '/' },
    { label: 'Archive', path: '/archive' },
    { label: 'Web', path: '/web' },
    { label: 'Intel', path: '/intel' },
    { label: 'Submit', path: '/submit' },
    { label: 'Logistics', path: '/logistics' },
    { label: 'Ethics', path: '/ethics' },
  ];

  return (
    <header className="bg-paper-base w-full border-b border-border-tan sticky top-0 z-50">
      {state.breakingNews && <BreakingTicker incident={state.breakingNews} />}

      {/* Top Bar */}
      <div className="flex justify-between items-center px-margin-desktop py-3 w-full max-w-container-max mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 no-underline group" aria-label="RECALL Home">
          <img src="/assets/recall_new_logo.png" alt="RECALL Logo" className="h-12 w-auto object-contain mix-blend-multiply" />
        </Link>

        {/* Search */}
        <div className="hidden md:flex relative w-72">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl pointer-events-none">
            search
          </span>
          <input
            type="text"
            placeholder="Search incidents, people, locations..."
            value={state.searchQuery}
            onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
            onFocus={() => { if (location.pathname !== '/archive') navigate('/archive'); }}
            className="w-full bg-surface-white border border-border-tan py-2.5 pl-10 pr-4 font-label-tag text-[12px] text-on-surface focus:border-primary transition-colors placeholder:text-secondary-grey"
            aria-label="Search incidents"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            to="/submit"
            className="hidden md:flex items-center gap-1.5 border border-ink-black px-4 py-2 font-label-tag text-label-tag text-ink-black uppercase tracking-widest hover:bg-ink-black hover:text-paper-base transition-colors duration-200 no-underline"
          >
            <span className="material-symbols-outlined text-[14px]">add_circle</span>
            Submit Incident
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-1 font-label-tag text-label-tag text-secondary-grey uppercase hover:text-primary transition-colors no-underline"
          >
            <span className="material-symbols-outlined text-[14px]">account_circle</span>
            <span className="hidden md:inline">Login</span>
          </Link>
        </div>
      </div>

      {/* Section Nav */}
      <nav
        className="flex border-t border-border-tan overflow-x-auto px-margin-desktop max-w-container-max mx-auto"
        aria-label="Section navigation"
      >
        {navLinks.map(({ label, path }) => (
          <Link
            key={path}
            to={path}
            className={`
              font-label-tag text-label-tag uppercase tracking-wider whitespace-nowrap
              px-4 py-3 no-underline transition-colors duration-200 border-b-2
              ${isActive(path)
                ? 'text-primary border-secondary font-bold'
                : 'text-on-surface-variant border-transparent hover:text-primary hover:border-outline-variant'
              }
            `}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
