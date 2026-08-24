"""
AgentState TypedDict and Pydantic Models for the LangGraph Multi-Agent Pipeline
Lexis Counsel / CivicLegal-AI — India Jurisdiction
"""
from typing import List, Dict, Optional, Any
from typing_extensions import TypedDict
from pydantic import BaseModel, Field


class ExhibitItem(BaseModel):
    """Court-admissible evidence item with sequential Exhibit labels."""
    exhibit_id: str = Field(description="Admissible label e.g., Exhibit A, Exhibit B")
    file_name: str
    doc_type: str = Field(description="Invoice | WhatsApp | Email | Bank Receipt | SpeedPost | SMS")
    timestamp: str
    amount: float = 0.0
    extracted_summary: str
    is_pii_redacted: bool = True
    sha256_hash: Optional[str] = None


class PrecedentCitation(BaseModel):
    """InLegalNER Precedent Card Schema (FR-12)."""
    case_title: str
    citation: str
    forum: str
    bench: str
    applied_provisions: List[str]
    ratio_decidendi: str
    awarded_relief: str
    source_url: str


class DamageBreakdown(BaseModel):
    """4-Part Restitution Formula: T = D + C + I + N (FR-04)."""
    direct_pecuniary_loss: float = 0.0          # D = Verified invoices
    consequential_expenses: float = 0.0          # C = Documented consequential costs
    statutory_interest_rate: float = 0.08        # 8% p.a. default
    statutory_interest_amount: float = 0.0       # I = D × 0.08 × (days/365)
    non_pecuniary_damages: float = 0.0           # N = Capped ₹10,000–₹50,000
    total_claim_amount: float = 0.0              # T = D + C + I + N
    days_elapsed: int = 180
    calculation_summary: str = ""


class RedTeamAuditReport(BaseModel):
    """Agent 5 adversarial audit output (FR-06)."""
    passed: bool
    unsupported_facts: List[str] = []
    vulnerable_clauses: List[str] = []
    defense_countermeasures: List[str] = []
    audit_notes: str = ""


class ForumOption(BaseModel):
    """Multi-Forum Cost vs. Time comparison entry (FR-08)."""
    name: str
    fee: str
    timeline: str
    binding: str
    recommended: bool = False


class AgentState(TypedDict):
    """Global shared state machine for the 5-agent deterministic pipeline."""
    # Session
    session_id: str
    language: str                               # e.g. "en", "hi", "kn", "ta"

    # Screen 1 — Intake
    raw_narrative: str
    sanitized_narrative: str
    is_sensitive_emergency: bool
    emergency_type: Optional[str]               # "cyber_fraud" | "medical_negligence" | "tenancy"

    # Screen 2 — Evidence
    raw_files: List[Dict[str, Any]]
    exhibit_index: List[ExhibitItem]

    # Agent 2 — Legal Research
    statutory_grounds: List[str]
    citations: List[PrecedentCitation]
    unsettled_law_warnings: List[str]
    pecuniary_tier: str                         # District | State | National
    is_time_barred: bool
    cause_of_action_date: Optional[str]

    # Agent 3 — Damages
    damages: DamageBreakdown
    readiness_score: int                        # 0–100 (FR-07)
    missing_proofs: List[str]

    # Forum Comparison
    forum_options: List[ForumOption]

    # Agent 4 — Drafter
    tier1_notice_draft: Optional[str]
    tier2_petition_packet: Optional[Dict[str, str]]

    # Agent 5 — Red Team
    red_team_report: Optional[RedTeamAuditReport]
    audit_iteration_count: int

    # Screen 5 — Tracker
    notice_dispatch_date: Optional[str]
    days_remaining: int
    settlement_offer: Optional[float]

    # Final
    final_pdf_ready: bool
