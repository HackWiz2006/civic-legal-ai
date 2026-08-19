# API

## Backend

- `GET /health` — service status
- `POST /api/v1/questions` — submit a plain-language question

Request:

```json
{
  "question": "How do I request a public record?",
  "jurisdiction": "India"
}
```

Response:

```json
{
  "answer": "General information...",
  "disclaimer": "This is general legal information, not legal advice...",
  "sources": [
    { "title": "Official source", "url": "https://example.gov/" }
  ]
}
```

## AI service

- `GET /health` — service status
- `POST /v1/assist` — internal retrieval and generation contract
