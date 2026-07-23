export type Category =
  'violence' | 'legal' | 'shutdown' | 'statement' | 'other';

export type VerificationStatus =
  'verified' | 'reported' | 'disputed' | 'pending';

export type EntityType =
  'person' | 'organization' | 'law' | 'location';

export interface Source {
  name: string;
  url: string;
}

export interface Incident {
  id: string;
  title: string;
  date: string;
  location: string;
  category: Category;
  description: string;
  status: VerificationStatus;
  sources: Source[];
  entityIds: string[];
  triggeredBy: string[];
  ledTo: string[];
  contributorCredit: string;
  editionIds: string[];
  mediaUrl?: string;
  documentUrl?: string;
  updates?: { timestamp: string; text: string }[];
}

export interface Entity {
  id: string;
  name: string;
  type: EntityType;
  description?: string;
  incidentIds: string[];
}

export interface GroundReport {
  id: string;
  state: string;
  headline: string;
  body: string;
  contributor: string;
  date: string;
}

export interface Edition {
  id: string;
  slug: string;
  title: string;
  deck: string;
  date: string;
  coverByline: string;
  incidentIds: string[];
  isBreaking?: boolean;
  groundReports: GroundReport[];
}

export interface Update {
  id: string;
  incidentId: string;
  timestamp: string;
  text: string;
}

export interface AppState {
  incidents: Incident[];
  entities: Entity[];
  editions: Edition[];
  updates: Update[];
  searchQuery: string;
  activeFilter: Category | 'all';
  selectedIncidentId: string | null;
  isAuthenticated: boolean;
  userRole: 'viewer' | 'contributor' | 'editor' | null;
  breakingNews: Incident | null;
}

export type AppAction =
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_ACTIVE_FILTER'; payload: Category | 'all' }
  | { type: 'SET_SELECTED_INCIDENT'; payload: string | null }
  | { type: 'SET_BREAKING_NEWS'; payload: Incident | null }
  | { type: 'LOGIN'; payload: { role: 'viewer' | 'contributor' | 'editor' } }
  | { type: 'LOGOUT' }
  | { type: 'ADD_INCIDENT'; payload: Incident };
