import os

import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(
    title="Civic Legal AI API",
    version="0.1.0",
    description="Orchestration API for civic and legal information.",
)

origins = [item.strip() for item in os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

AI_SERVICE_URL = os.getenv("AI_SERVICE_URL", "http://localhost:8001")


class QuestionRequest(BaseModel):
    question: str = Field(min_length=10, max_length=4000)
    jurisdiction: str = Field(default="unspecified", max_length=120)


class Source(BaseModel):
    title: str
    url: str


class AnswerResponse(BaseModel):
    answer: str
    disclaimer: str
    sources: list[Source]


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "service": "backend"}


@app.post("/api/v1/questions", response_model=AnswerResponse)
async def answer_question(request: QuestionRequest) -> AnswerResponse:
    try:
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.post(
                f"{AI_SERVICE_URL}/v1/assist",
                json=request.model_dump(),
            )
            response.raise_for_status()
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=503, detail="AI service unavailable") from exc

    return AnswerResponse.model_validate(response.json())
