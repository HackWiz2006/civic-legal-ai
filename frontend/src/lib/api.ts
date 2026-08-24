/**
 * Lexis Counsel — API Client
 * Typed client for the FastAPI backend
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || `HTTP ${res.status}`);
  }
  return res.json();
}

// ── Intake ────────────────────────────────────────────────────
export interface IntakeResponse {
  session_id: string;
  sanitized_narrative: string;
  is_emergency: boolean;
  emergency_type: string | null;
  extracted_dates: string[];
  plain_summary: string;
}

export async function submitIntake(payload: {
  raw_text: string;
  language: string;
  session_id: string;
}): Promise<IntakeResponse> {
  return request('/intake', { method: 'POST', body: JSON.stringify(payload) });
}

// ── Pipeline ──────────────────────────────────────────────────
export interface PipelineResponse {
  session_id: string;
  exhibit_index: any[];
  statutory_grounds: string[];
  citations: any[];
  unsettled_law_warnings: string[];
  pecuniary_tier: string;
  is_time_barred: boolean;
  damages: any;
  readiness_score: number;
  missing_proofs: string[];
  tier1_notice_draft: string;
  tier2_petition_packet: Record<string, string>;
  red_team_report: any;
  final_pdf_ready: boolean;
}

export async function runPipeline(payload: {
  session_id: string;
  narrative: string;
  files?: Array<{ name: string; type: string; amount: number; date: string; summary: string }>;
}): Promise<PipelineResponse> {
  return request('/pipeline/run', { method: 'POST', body: JSON.stringify(payload) });
}

// ── Export ────────────────────────────────────────────────────
export async function exportPDF(session_id: string): Promise<Blob> {
  const res = await fetch(`${BASE_URL}/export/pdf?session_id=${session_id}`);
  if (!res.ok) throw new Error('Export failed');
  return res.blob();
}

export async function exportNoticePDF(session_id: string): Promise<Blob> {
  const res = await fetch(`${BASE_URL}/export/notice?session_id=${session_id}`);
  if (!res.ok) throw new Error('Notice export failed');
  return res.blob();
}

// ── Health ────────────────────────────────────────────────────
export async function healthCheck(): Promise<{ status: string; version: string }> {
  return request('/health');
}
