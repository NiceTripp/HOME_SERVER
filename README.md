# HOME_SERVER

Docker Compose monorepo for a multi-service home server.

## Agent context

Start with:

1. [TODO.md](TODO.md) for the implementation tracker.
2. [docs/architecture/service-catalog.yaml](docs/architecture/service-catalog.yaml)
   for service responsibilities and dependencies.
3. [docs/architecture/dependency-graph.yaml](docs/architecture/dependency-graph.yaml)
   for cross-service relationships.
4. [memory/index.yaml](memory/index.yaml) for curated context.
5. [.github/copilot-instructions.md](.github/copilot-instructions.md) for
   repository-wide agent rules.

Canonical context is version-controlled with the code. Generated indexes and
embeddings are derived caches and must be rebuildable.
