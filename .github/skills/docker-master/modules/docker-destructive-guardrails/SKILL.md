---
name: docker-destructive-guardrails
description: "Guard HOME_SERVER against destructive Docker and Compose operations that can remove PostgreSQL data, IoT history, queues, images, networks, or recovery artifacts."
---

# Docker Destructive Guardrails

Before any destructive command:

1. Show the exact command and resolved project/resources.
2. Identify named volumes, external volumes, databases, queues, and backups
   affected.
3. Explain whether the operation is reversible.
4. Verify or request a current backup for persistent data.
5. Require explicit user confirmation.

Treat these as destructive or potentially destructive:

- `docker compose down -v`
- `docker volume rm` and `docker volume prune`
- `docker system prune` and image removal
- Container removal with state stored in writable layers.
- Network removal when external routing depends on it.
- Database reset or migration rollback without a recovery plan.

Never replace a destructive operation with a silent cleanup fallback.

## Detailed resources

- [Docker CLI destructive commands](./references/docker-cli-destructive-commands.md)
- [cross-skill command index](./references/cross-skill-destructive-command-index.md)
- [verification checklist](./checks/verification.md)
