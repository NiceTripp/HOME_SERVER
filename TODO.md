# HOME_SERVER Implementation Tracker

This checklist is the working source for the initial platform foundation. Items are
checked only after the corresponding file or behavior exists and has been verified.

## Decisions locked

- [x] Use one HOME_SERVER monorepo for shared platform and application services.
- [x] Use Docker Compose as the initial deployment model.
- [x] Support multiple agent clients through repository-shared context.
- [x] Keep canonical context in Git-tracked Markdown/YAML/JSON.
- [x] Keep vector databases and search indexes as rebuildable derived data.
- [x] Exclude secrets, raw runtime data, and unredacted logs from canonical context.
- [x] Use curated memory rather than automatically promoting every conversation.
- [x] Use Ponytail as a minimal-code engineering principle, not as the whole platform policy.
- [x] Block HIGH and CRITICAL review findings before merge or deployment.

## Phase 1 - Context foundation

- [x] Define repository conventions and service boundary rules.
- [x] Create the project-wide agent instructions.
- [x] Create the service catalog.
- [x] Create the dependency and data-flow maps.
- [x] Create the canonical memory index and templates.
- [x] Create review finding and review summary schemas.
- [x] Add generated-context and secret exclusions to `.gitignore`.
- [x] Add a validation command for context links and YAML/JSON structure.
- [x] Add the context-maintenance skill and context-impact checklist.

## Phase 2 - Telegram gateway

- [ ] Define the Telegram gateway contract and versioning policy.
- [ ] Scaffold the TypeScript/Node.js service.
- [ ] Add PostgreSQL persistence and migrations.
- [ ] Add webhook verification and normalized incoming events.
- [ ] Add authorization for users and groups.
- [ ] Add message delivery, retry, idempotency, and outbox status.
- [ ] Add commands and the internal adapter API.
- [ ] Add health, readiness, structured logs, and metrics.
- [ ] Add unit, integration, and contract tests.
- [ ] Add the Telegram gateway runbook.

## Phase 3 - Review and memory workflow

- [ ] Add reusable code, PR, architecture, Docker, security, and test review skills.
- [ ] Add a review workflow that emits Markdown and JSON findings.
- [ ] Add a fix-and-re-review workflow.
- [ ] Add a factual implementation summary workflow.
- [ ] Add curated memory entries for confirmed findings and decisions.
- [ ] Add a rebuildable local search/index command.

## Phase 4 - Future services

- [ ] Define the IoT water-quality event contract.
- [ ] Add the IoT service using the Telegram gateway adapter.
- [ ] Document monitoring, backup, media, ecommerce, and automation boundaries.
- [ ] Re-evaluate PostgreSQL `pgvector` or ChromaDB only when canonical memory volume requires semantic search.
