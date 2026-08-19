# Data

This directory is for documented, redistributable civic and legal data.

- `raw/` contains immutable source snapshots.
- `processed/` contains reproducible derived artifacts.
- Never commit private user questions, secrets, personal data, or restricted datasets.
- Every dataset must record its source URL, jurisdiction, retrieval date, license, and transformation steps.

Large production datasets should live in approved object storage and be referenced by a manifest rather than committed to Git.
