import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { AppState, AppAction, Category, Incident } from '../types';
import { INCIDENTS, ENTITIES, EDITIONS, UPDATES } from '../data/incidents';

const initialState: AppState = {
  incidents: INCIDENTS,
  entities: ENTITIES,
  editions: EDITIONS,
  updates: UPDATES,
  searchQuery: '',
  activeFilter: 'all',
  selectedIncidentId: null,
  isAuthenticated: false,
  userRole: null,
  breakingNews: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_ACTIVE_FILTER':
      return { ...state, activeFilter: action.payload as Category | 'all' };
    case 'SET_SELECTED_INCIDENT':
      return { ...state, selectedIncidentId: action.payload };
    case 'SET_BREAKING_NEWS':
      return { ...state, breakingNews: action.payload };
    case 'LOGIN':
      return { ...state, isAuthenticated: true, userRole: action.payload.role };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, userRole: null };
    case 'ADD_INCIDENT':
      return { ...state, incidents: [...state.incidents, action.payload] };
    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

// Helper: filter incidents by search + category
export function useFilteredIncidents() {
  const { state } = useApp();
  const q = state.searchQuery.toLowerCase();
  const f = state.activeFilter;
  return state.incidents.filter((inc) => {
    const matchFilter = f === 'all' || inc.category === f;
    const matchSearch = !q ||
      inc.title.toLowerCase().includes(q) ||
      inc.description.toLowerCase().includes(q) ||
      inc.location.toLowerCase().includes(q) ||
      inc.id.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });
}

export function useIncident(id: string): Incident | undefined {
  const { state } = useApp();
  return state.incidents.find((i) => i.id === id);
}
