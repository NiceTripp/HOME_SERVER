# HOME_SERVER Global Conventions

## Canonical context

Git-tracked Markdown, YAML, and JSON files are the source of truth for
architecture, contracts, runbooks, decisions, and curated memory. Search indexes
and embeddings are derived data and must be rebuildable from these files.

## Service boundaries

Application services live under `apps/` and shared infrastructure lives
under `platform/`. A service may depend on another service's documented
contract, but not on its private implementation modules.

## Operational minimum

Each production service should provide a healthcheck, structured logs, a
runbook, a documented persistence/backup strategy, and tests for its important
failure paths.

## Memory promotion

Only verified decisions, constraints, reusable patterns, and confirmed review
findings become canonical memory. Do not store secrets, raw runtime data,
unredacted logs, or unverified speculation.
