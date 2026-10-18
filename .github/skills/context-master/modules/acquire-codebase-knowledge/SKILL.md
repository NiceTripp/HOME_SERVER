---
name: acquire-codebase-knowledge
description: "Map and document HOME_SERVER when onboarding, adding a service, restructuring the monorepo, or investigating an unfamiliar cross-service flow."
---

# Acquire Codebase Knowledge

Produce a bounded, evidence-based map rather than a broad code dump.

Read the repository instructions, TODO, service catalog, dependency graph,
data-flow documentation, relevant service README, Compose files, contracts,
tests, and migrations. Then report:

- Services and responsibilities.
- Ingress, networks, ports, volumes, and external systems.
- Service-to-service dependencies and contracts.
- Persistence and migration boundaries.
- Build, test, health, backup, and deployment commands.
- Secrets/configuration boundaries without revealing secret values.
- Relevant tests, risks, and unknowns.

Update canonical maps only when the evidence shows they are stale. Mark each
context surface `updated`, `not affected`, or `not needed`.
