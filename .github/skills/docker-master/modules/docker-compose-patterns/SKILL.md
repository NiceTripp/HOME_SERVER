---
name: docker-compose-patterns
description: "Design and review HOME_SERVER Compose services, healthchecks, readiness ordering, networks, volumes, secrets, development overrides, and production deployment behavior."
---

# Docker Compose Patterns

Check:

- Use the repository's canonical Compose filename consistently.
- Pin production image versions; never use `latest` for persistent services.
- Add healthchecks for PostgreSQL and services with readiness requirements.
- Use `depends_on.condition: service_healthy` only where startup ordering
  matters; do not confuse startup with full application readiness.
- Use named volumes for persistent data and document backup/restore.
- Keep database and internal service ports private unless exposure is required.
- Use explicit networks and least-privilege connectivity.
- Keep secrets out of Compose files, images, arguments, and logs.
- Separate local development overrides from production configuration.
- Document restart, shutdown, migration, rollback, and volume behavior.

Any command that can remove volumes, databases, images, or networks requires
explicit confirmation and an identified recovery plan.

## Detailed resources

- [service dependencies](./references/service-dependencies.md)
- [volumes and networks](./references/volumes-and-networks.md)
- [verification checklist](./checks/verification.md)
- [Compose example](./assets/compose-web-app.yaml)
- [Compose verification script](./scripts/verify-compose.sh)
