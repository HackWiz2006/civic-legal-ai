from fastapi import FastAPI
from pydantic import BaseModel, Field

DISCLAIMER = (
    "This is general legal information, not legal advice. Laws and procedures vary by "
    "jurisdiction; verify details with an official source or qualified professional."
)

app = FastAPI(
    title="Civic Legal AI Service",
    version="0.1.0",
    description="Retrieval and generation boundary with explicit safety contracts.",
)


class AssistRequest(BaseModel):
    question: str = Field(min_length=10, max_length=4000)
    jurisdiction: str = Field(default="unspecified", max_length=120)


class Source(BaseModel):
    title: str
    url: str


class AssistResponse(BaseModel):
    answer: str
    disclaimer: str = DISCLAIMER
    sources: list[Source] = []


def build_placeholder_answer(question: str, jurisdiction: str) -> str:
    location_note = (
        "The jurisdiction was not provided, so rules and filing steps cannot yet be verified."
        if jurisdiction == "unspecified"
        else f"The stated jurisdiction is {jurisdiction}; confirm that it matches the relevant authority."
    )
    return (
        "The starter service received your question but does not yet have an approved legal-source "
        f"index or language model configured. {location_note} Add a retrieval provider only after "
        "the source, privacy, and evaluation requirements in docs/safety.md are implemented."
    )


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "service": "ai"}


@app.post("/v1/assist", response_model=AssistResponse)
async def assist(request: AssistRequest) -> AssistResponse:
    return AssistResponse(
        answer=build_placeholder_answer(request.question, request.jurisdiction),
        sources=[],
    )
