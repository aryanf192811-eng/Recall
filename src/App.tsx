import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Edition from './pages/Edition';
import Archive from './pages/Archive';
import IncidentDetail from './pages/IncidentDetail';
import CausalityWeb from './pages/CausalityWeb';
import BreakingNews from './pages/BreakingNews';
import LiveUpdates from './pages/LiveUpdates';
import LogisticsRegistry from './pages/LogisticsRegistry';
import FieldReport from './pages/FieldReport';
import IntelDashboard from './pages/IntelDashboard';
import AccessTerminal from './pages/AccessTerminal';
import EthicsCode from './pages/EthicsCode';
import OfficerProfile from './pages/OfficerProfile';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Main pages */}
          <Route path="/" element={<Edition />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/archive/incident/:id" element={<IncidentDetail />} />
          <Route path="/web" element={<CausalityWeb />} />
          <Route path="/breaking/:id" element={<BreakingNews />} />
          <Route path="/live/:id" element={<LiveUpdates />} />
          <Route path="/logistics" element={<LogisticsRegistry />} />
          <Route path="/submit" element={<FieldReport />} />
          <Route path="/intel" element={<IntelDashboard />} />
          <Route path="/login" element={<AccessTerminal />} />
          <Route path="/ethics" element={<EthicsCode />} />
          <Route path="/officer/:id" element={<OfficerProfile />} />

          {/* 404 fallback */}
          <Route
            path="*"
            element={
              <div
                style={{
                  minHeight: '100vh',
                  background: 'var(--paper)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                }}
              >
                <h1 className="font-display font-black" style={{ fontSize: '80px', opacity: 0.1 }}>
                  404
                </h1>
                <p className="font-display font-bold" style={{ fontSize: '24px' }}>Page not found</p>
                <a href="/" className="font-ui" style={{ fontSize: '14px', color: 'var(--grey)' }}>
                  Return to the Archive
                </a>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
