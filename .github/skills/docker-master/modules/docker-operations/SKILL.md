---
name: docker-operations
description: "Operate HOME_SERVER containers safely with health checks, logs, backups, restore verification, resource checks, restart, rollback, and incident runbooks."
---

# Docker Operations

Use for routine runtime operations and incident response after deployment.

## Routine checks

- Verify service health and readiness.
- Inspect restart counts, resource pressure, disk space, and log volume.
- Confirm PostgreSQL and other persistent volumes are mounted as expected.
- Check Traefik ingress and internal network reachability.
- Keep logs structured, bounded, and free of secrets.

## Backup and restore

- Identify the exact data and volume before backup.
- Record backup timestamp, scope, retention, and verification result.
- Test restore into an isolated target before relying on a backup.
- Never treat a successful archive command as proof that restore works.

## Restart and rollback

- Prefer reversible restart or targeted service replacement.
- Explain in-memory state and availability impact before stopping a service.
- Roll back to a known-good image/config when a deployment is unhealthy.
- Run health, smoke, and dependency checks after restart or rollback.
- Update the runbook and memory only for confirmed reusable operational facts.
