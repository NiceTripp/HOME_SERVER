---
name: context-map
description: "Create a bounded pre-change map for HOME_SERVER work, including files, dependencies, tests, reference patterns, context impact, and risks before implementing cross-service or high-risk changes."
---

# Context Map

Use before changes that cross service boundaries, alter persistence, change
Compose/Docker behavior, or affect public/internal contracts.

Produce a concise map containing:

- Requirement and acceptance criteria.
- Files likely to change and why.
- Services, dependencies, contracts, and data flow involved.
- Existing patterns to reuse.
- Tests and validation commands.
- Security, migration, deployment, and rollback risks.
- Context surfaces classified as `updated`, `not affected`, or `not needed`.
- The canonical source path under `apps/<service>/` for application services.

Read the repository instructions and canonical maps first. Identify changed
surfaces, then query the review registry with
`node scripts/query-review-findings.mjs` for matching service, category,
technology, and path terms. Read curated memory and only the linked historical
records needed to understand recurring or unresolved risks. Do not read all
review history by default or produce a large code dump. If a required fact is
unknown, state it as an unknown rather than inventing it.
