---
name: docker-project-foundations
description: "Create or review the initial Docker foundation for a HOME_SERVER service, including Dockerfile, Compose wiring, healthchecks, secrets, networks, volumes, and local development."
---

# Docker Project Foundations

Use when adding a new service or containerizing an existing one.

Check or create:

- A minimal `.dockerignore` that excludes credentials, logs, dependencies,
  build output, and local state.
- A multi-stage Dockerfile with a non-root runtime where practical.
- A pinned base image and reproducible dependency installation.
- A Compose service with explicit networks, healthcheck, restart behavior,
  environment configuration, and named persistent volumes where needed.
- No secrets in image layers, `ARG`, committed Compose files, or logs.
- No unauthenticated database/cache port published to the LAN.
- Readiness ordering uses health conditions where startup depends on a service.
- Backup, migration, rollback, and destructive-volume-operation notes exist.

Use `compose.yaml` or the repository's established filename consistently. Never
run destructive commands such as `docker compose down -v` without explicit
confirmation and a verified backup plan.

## Detailed resources

- [project structure](./references/project-structure.md)
- [verification checklist](./checks/verification.md)
- [Dockerfile example](./assets/Dockerfile.simple)
- [Compose development example](./assets/compose-dev.yaml)
- [Dockerignore example](./assets/dockerignore-example)
- [setup verification script](./scripts/verify-setup.sh)
