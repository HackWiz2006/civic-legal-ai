/**
 * Lexis Counsel — Zustand Global State Store
 * Manages case session, exhibits, agent outputs, and workflow step
 */
import { create } from 'zustand';

export interface Exhibit {
  exhibit_id: string;
  file_name: string;
  doc_type: string;
  timestamp: string;
  amount: number;
  extracted_summary: string;
  is_pii_redacted: boolean;
}

export interface Damages {
  directLoss: number;
  consequential: number;
  interest: number;
  nonPecuniary: number;
  total: number;
  daysElapsed: number;
}

export interface CaseState {
  // Session
  sessionId: string;
  caseRef: string;
  language: string;

  // Workflow
  currentStep: number;

  // Intake
  narrative: string;
  sanitizedNarrative: string;
  isEmergency: boolean;
  emergencyType: 'cyber_fraud' | 'medical_negligence' | 'tenancy' | null;

  // Evidence
  exhibits: Exhibit[];
  readinessScore: number;
  missingProofs: string[];

  // Legal Research
  statutoryGrounds: string[];
  pecuniaryTier: string;
  isTimeBarred: boolean;

  // Damages
  damages: Damages | null;

  // Drafts
  tier1Notice: string | null;
  tier2Petition: Record<string, string> | null;
  redTeamPassed: boolean;

  // Tracker
  noticeDispatchDate: string | null;
  daysRemaining: number;

  // UI State
  isLoading: boolean;
  loadingMessage: string;
  messages: Array<{
    id: string;
    sender: 'user' | 'assistant';
    content: string;
    statuteQuote?: string;
    analysisText?: string;
    precedentName?: string;
    precedentUrl?: string;
    toolActions?: Array<{ label: string; icon: string; primary?: boolean; onClick: () => void }>;
  }>;
}

interface CaseActions {
  setStep: (step: number) => void;
  setNarrative: (text: string) => void;
  setExhibits: (exhibits: Exhibit[]) => void;
  addExhibit: (exhibit: Exhibit) => void;
  removeExhibit: (id: string) => void;
  setReadiness: (score: number, missing: string[]) => void;
  setDamages: (damages: Damages) => void;
  setTier1Notice: (notice: string) => void;
  setDispatchDate: (date: string) => void;
  addMessage: (msg: Omit<CaseState['messages'][0], 'id'>) => void;
  setLoading: (loading: boolean, message?: string) => void;
  setEmergency: (type: CaseState['emergencyType']) => void;
  setPecuniaryTier: (tier: string) => void;
  resetSession: () => void;
}

const INITIAL_STATE: Omit<CaseState, keyof CaseActions> = {
  sessionId: `session-${Date.now()}`,
  caseRef: `2026-CPA-DCDRC-${Math.floor(Math.random() * 900) + 100}`,
  language: 'en',
  currentStep: 1,
  narrative: '',
  sanitizedNarrative: '',
  isEmergency: false,
  emergencyType: null,
  exhibits: [],
  readinessScore: 0,
  missingProofs: [],
  statutoryGrounds: [],
  pecuniaryTier: 'District Consumer Disputes Redressal Commission',
  isTimeBarred: false,
  damages: null,
  tier1Notice: null,
  tier2Petition: null,
  redTeamPassed: false,
  noticeDispatchDate: null,
  daysRemaining: 15,
  isLoading: false,
  loadingMessage: '',
  messages: [],
};

export const useCaseStore = create<CaseState & CaseActions>((set, get) => ({
  ...INITIAL_STATE,

  setStep: (step) => set({ currentStep: step }),
  setNarrative: (text) => set({ narrative: text }),
  setExhibits: (exhibits) => set({ exhibits }),
  addExhibit: (exhibit) => set((s) => ({ exhibits: [...s.exhibits, exhibit] })),
  removeExhibit: (id) =>
    set((s) => ({ exhibits: s.exhibits.filter((e) => e.exhibit_id !== id) })),
  setReadiness: (score, missing) => set({ readinessScore: score, missingProofs: missing }),
  setDamages: (damages) => set({ damages }),
  setTier1Notice: (notice) => set({ tier1Notice: notice }),
  setDispatchDate: (date) => set({ noticeDispatchDate: date }),
  addMessage: (msg) =>
    set((s) => ({
      messages: [...s.messages, { ...msg, id: `msg-${Date.now()}-${Math.random()}` }],
    })),
  setLoading: (loading, message = '') => set({ isLoading: loading, loadingMessage: message }),
  setEmergency: (type) => set({ isEmergency: !!type, emergencyType: type }),
  setPecuniaryTier: (tier) => set({ pecuniaryTier: tier }),
  resetSession: () => set({ ...INITIAL_STATE, sessionId: `session-${Date.now()}` }),
}));
