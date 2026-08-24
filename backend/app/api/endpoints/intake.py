"""
Intake Endpoint — FR-01: Multilingual Voice/Text Narrative Intake & PII Sanitization
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from app.core.security import sanitize_pii

router = APIRouter()


class IntakeRequest(BaseModel):
    raw_text: str
    language: str = "en"
    session_id: str


class IntakeResponse(BaseModel):
    session_id: str
    sanitized_narrative: str
    is_emergency: bool
    emergency_type: Optional[str] = None
    extracted_dates: list[str] = []
    plain_summary: str


EMERGENCY_KEYWORDS = {
    "cyber_fraud": ["fraud", "hacked", "phishing", "upi fraud", "online fraud", "scam", "cyber crime", "1930"],
    "medical_negligence": ["medical negligence", "doctor negligence", "hospital malpractice", "wrong diagnosis"],
    "tenancy": ["eviction", "landlord", "tenant", "rent control", "evicted", "rental"],
}


def detect_emergency(text: str) -> Optional[str]:
    lower = text.lower()
    for etype, keywords in EMERGENCY_KEYWORDS.items():
        if any(kw in lower for kw in keywords):
            return etype
    return None


@router.post("/", response_model=IntakeResponse)
async def submit_intake(req: IntakeRequest):
    if not req.raw_text.strip():
        raise HTTPException(status_code=400, detail="Narrative text cannot be empty.")

    sanitized = sanitize_pii(req.raw_text)
    emergency_type = detect_emergency(sanitized)

    return IntakeResponse(
        session_id=req.session_id,
        sanitized_narrative=sanitized,
        is_emergency=emergency_type is not None,
        emergency_type=emergency_type,
        extracted_dates=[],  # Extend with NER extraction
        plain_summary=f"Narrative received ({len(sanitized)} chars). PII sanitized. Language: {req.language}.",
    )
