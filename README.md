# Civic Legal AI

A hackathon-ready monorepo for an AI-assisted legal and civic information platform.

> This project provides general legal information, not legal advice. Users should verify important information with qualified professionals and official government sources.

## Repository layout

- `frontend/` — Next.js web interface
- `backend/` — FastAPI application API and orchestration layer
- `ai/` — isolated AI service with safety-oriented response contracts
- `data/` — documented locations for raw and processed public datasets
- `docs/` — architecture, API, and responsible-AI guidance

## Quick start

### With Docker

1. Copy `.env.example` to `.env`.
2. Run `docker compose up --build`.
3. Open http://localhost:3000.
4. API documentation is available at http://localhost:8000/docs and http://localhost:8001/docs.

### Without Docker

Use Node.js 20+ and Python 3.11+.

```bash
cd frontend
npm install
npm run dev
```

In separate terminals:

```bash
cd backend
python -m venv .venv
# Activate the virtual environment, then:
pip install -e ".[dev]"
uvicorn app.main:app --reload --port 8000
```

```bash
cd ai
python -m venv .venv
# Activate the virtual environment, then:
pip install -e ".[dev]"
uvicorn civic_ai.main:app --reload --port 8001
```

## Initial scope

- Plain-language civic and legal information
- Source-aware answers with visible citations
- Jurisdiction and urgency prompts
- Clear legal-information disclaimers
- Separation of UI, API, AI, and data concerns

See [docs/architecture.md](docs/architecture.md) and [docs/safety.md](docs/safety.md) before adding model or retrieval integrations.
