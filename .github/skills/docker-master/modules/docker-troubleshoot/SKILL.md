---
name: docker-troubleshoot
description: "Troubleshoot running HOME_SERVER containers, Compose startup, healthchecks, logs, networking, configuration, resource limits, and dependency failures without destructive shortcuts."
---

# Docker Troubleshoot

Use a bounded, evidence-first investigation. Do not delete volumes or prune
resources merely because a container is unhealthy.

## Procedure

1. Identify the Compose project, affected service, recent change, and impact.
2. Inspect status, health state, exit code, restart count, resource use, and
   recent logs with secrets and tokens redacted.
3. Validate Compose configuration and environment presence without printing
   secret values.
4. Check dependency readiness, DNS/service names, network membership, ports,
   volumes, permissions, and migration state.
5. Compare the failing container/image/config with the last known-good version.
6. Apply the narrowest reversible fix and verify health again.
7. Escalate to rollback or destructive cleanup only with explicit confirmation
   and a recovery plan.

## Common evidence

- `docker compose ps`
- `docker compose config --quiet`
- `docker compose logs --since`
- `docker inspect`
- Healthcheck output and application readiness endpoint
- Network and volume metadata

Never include secret values, full environment dumps, or unredacted sensitive
payloads in a report.
