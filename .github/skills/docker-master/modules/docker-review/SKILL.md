---
name: docker-review
description: "Review HOME_SERVER Dockerfiles and Compose changes for secure, reproducible, observable, and recoverable deployment."
---

# Docker Review

Check:

- Minimal and pinned base images where practical.
- Non-root runtime and least privilege.
- No secrets in image layers, arguments, or committed Compose files.
- Healthchecks, readiness, restart behavior, and graceful shutdown.
- Explicit networks, volumes, ports, and dependency behavior.
- Resource limits, log handling, backups, and rollback notes.
- Build, runtime, and local/production configuration separation.
