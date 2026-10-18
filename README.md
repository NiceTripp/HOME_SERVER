# HOME_SERVER

Docker Compose monorepo for a multi-service home server.

## Agent context

All coding agents should start with [AGENTS.md](AGENTS.md), the portable
onboarding entry point. It defines the required reading order, skill routers,
targeted review-history retrieval, handoff format, and completion report.

The detailed onboarding workflow is in
[docs/agent-onboarding.md](docs/agent-onboarding.md).

For a copyable feature-by-feature checklist, see
[docs/feature-development-workflow.md](docs/feature-development-workflow.md).

The canonical context sequence is:

1. [TODO.md](TODO.md) for the implementation tracker.
2. [docs/architecture/service-catalog.yaml](docs/architecture/service-catalog.yaml)
   for service responsibilities and dependencies.
3. [docs/architecture/dependency-graph.yaml](docs/architecture/dependency-graph.yaml)
   for cross-service relationships.
4. [memory/index.yaml](memory/index.yaml) for curated context.
5. [.github/instructions/agent-instructions.instructions.md](.github/instructions/agent-instructions.instructions.md) for
   repository-wide agent rules.

Use `.github/skills/` as the portable skill library. Select a router instead of
loading every skill:

- `context-master` for architecture and memory.
- `review-master` for PR and code review.
- `docker-master` for Docker lifecycle work.
- `verification-loop` for executable validation before review, after fixes, and
  before completion.
- `tdd-workflow` for test-first behavior changes.

Application services live under `apps/`; shared infrastructure lives under
`platform/`. Canonical context is version-controlled with the code. Generated indexes and
embeddings are derived caches and must be rebuildable.
