# Architecture

```text
Browser (Next.js)
       |
       v
Backend API (FastAPI) ---- authentication, rate limits, audit metadata
       |
       v
AI service (FastAPI) ----- retrieval, prompting, citations, safety checks
       |
       v
Approved public legal and civic sources
```

## Boundaries

The frontend never calls model providers directly. The backend owns the public API contract and forwards only the minimum required request data. The AI service owns retrieval, source attribution, model-provider integration, and safety evaluation.

The initial AI endpoint intentionally returns a placeholder until an approved source index and evaluated model integration exist.
