"""
Lexis Counsel / CivicLegal-AI — FastAPI Main Entry Point
Autonomous Multi-Agent Civic & Legal Empowerment Platform (India)
"""
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

from app.api.router import api_router
from app.core.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifecycle manager."""
    print(f"🏛️  Lexis Counsel API starting — Jurisdiction: {settings.TARGET_JURISDICTION}")
    yield
    print("🏛️  Lexis Counsel API shutting down.")


app = FastAPI(
    title="Lexis Counsel — CivicLegal-AI",
    description="Autonomous Multi-Agent Civic & Legal Empowerment Platform for Indian Citizens",
    version="1.1.0",
    lifespan=lifespan,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# CORS — allow the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount all API routes under /api/v1
app.include_router(api_router, prefix="/api/v1")


@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "Lexis Counsel API",
        "jurisdiction": settings.TARGET_JURISDICTION,
        "version": "1.1.0",
    }
