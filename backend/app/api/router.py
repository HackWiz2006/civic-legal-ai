"""
API Router — Registers all endpoint modules
"""
from fastapi import APIRouter
from app.api.endpoints import intake, pipeline, export

api_router = APIRouter()

api_router.include_router(intake.router, prefix="/intake", tags=["Intake"])
api_router.include_router(pipeline.router, prefix="/pipeline", tags=["Pipeline"])
api_router.include_router(export.router, prefix="/export", tags=["Export"])
