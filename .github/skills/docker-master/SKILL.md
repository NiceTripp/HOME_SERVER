---
name: docker-master
description: "Coordinate all HOME_SERVER Docker work: project foundations, Compose wiring, Dockerfile/build hardening, destructive-operation safety, and Docker deployment review. Use this single skill for any Docker, Compose, container, image, volume, network, or Docker deployment task."
argument-hint: "Describe the Docker task, service, or command to route"
---

# Docker Master

This is the single entry point for Docker work in HOME_SERVER. It preserves
specialized Docker modules under `./modules/` and selects the smallest
combination needed for the task.

## Routing

Read the task and load the matching module `SKILL.md` plus its referenced
resources before acting:

| Task signal | Module |
|---|---|
| New service, first Dockerization, Dockerfile/Compose/.dockerignore scaffold | `./modules/docker-project-foundations/` |
| Compose service wiring, healthcheck, readiness, dependency, volume, network, override | `./modules/docker-compose-patterns/` |
| Dockerfile, image size, BuildKit, cache, multi-stage, non-root, build secret | `./modules/docker-build-strategies/` |
| Remove, prune, reset, wipe, stop, delete, cleanup, volume/image/network/builder operation | `./modules/docker-destructive-guardrails/` |
| Dockerfile/Compose implementation review or deployment risk review | `./modules/docker-review/` |
| Deploy/update a service to the home server or Dokploy | `./modules/docker-deploy/` |
| Investigate unhealthy, restarting, unreachable, or failed containers | `./modules/docker-troubleshoot/` |
| Routine health, logs, backup, restore, restart, rollback, or incident operations | `./modules/docker-operations/` |

Use multiple modules when a task spans surfaces. For example:

- New TypeScript service: foundations + build strategies + Compose patterns.
- Compose production change: Compose patterns + Docker review.
- Image cleanup: destructive guardrails only, unless the cleanup is part of a
  broader implementation review.
- New service with a production Dockerfile: foundations + build strategies +
  Compose patterns + Docker review.
- Production deployment: deploy + operations + review; add destructive
  guardrails if cleanup or volume changes are proposed.
- Runtime incident: troubleshoot + operations; add destructive guardrails only
  if a deletion, prune, or reset is being considered.

## Routing procedure

1. Identify the exact artifact and operation: scaffold, edit, review, run, or
   delete.
2. Classify the task using the routing table.
3. Read the selected module `SKILL.md`.
4. Read only the module references, checks, assets, or scripts needed for the
   task.
5. Apply HOME_SERVER rules: protect secrets, PostgreSQL data, IoT history,
   Traefik ingress, backups, and private internal ports.
6. Run the module verification script/checks when applicable.
7. Run `node scripts/validate-context.mjs` after changes to repository context.
8. Report selected modules, commands run, skipped checks, and remaining risks.

## Safety gate

Any destructive Docker operation must use
`./modules/docker-destructive-guardrails/` first. State exactly what will be
lost, identify the affected resources, verify a recovery plan, and obtain
explicit confirmation before execution. Do not silently substitute a destructive
cleanup command when a reversible command is sufficient.

## Module structure

Each module retains its own detailed resources:

```text
docker-master/
├── SKILL.md
└── modules/
    ├── docker-project-foundations/
    │   ├── SKILL.md
    │   ├── references/
    │   ├── checks/
    │   ├── assets/
    │   └── scripts/
    ├── docker-compose-patterns/
    ├── docker-build-strategies/
    ├── docker-destructive-guardrails/
    ├── docker-review/
    ├── docker-deploy/
    ├── docker-troubleshoot/
    └── docker-operations/
```

Do not duplicate module instructions into this file. The master skill routes;
the specialized modules provide the detailed rules.
