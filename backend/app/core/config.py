"""
Core configuration — reads from environment variables / .env file
"""
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # Application
    APP_NAME: str = "Lexis Counsel"
    TARGET_JURISDICTION: str = "India"
    DEBUG: bool = False

    # CORS
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://lexiscounsel.in",
    ]

    # LLM
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4o"

    # Security
    SECRET_KEY: str = "lexis-counsel-dev-secret-change-in-production"
    SESSION_EXPIRY_HOURS: int = 24

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
