---
name: docker-deploy
description: "Deploy HOME_SERVER Compose services to the home server or Dokploy with preflight checks, safe configuration, health verification, rollback, and explicit secret handling."
---

# Docker Deploy

Use for deploying or updating a containerized service in the home server or
Dokploy. Confirm the target environment before changing runtime state.

## Preflight

- Identify the exact Compose project, service, image tag, environment, domain,
  exposed ports, networks, and persistent volumes.
- Validate Compose configuration and required variables without printing secret
  values.
- Confirm the image is reproducible, tagged, and available to the target.
- Check migrations, backup requirements, healthchecks, and rollback version.
- Confirm the deployment will not expose PostgreSQL or internal services.

## Deployment

- Prefer a staged or one-service update when dependencies allow it.
- Apply migrations using the service's documented procedure.
- Keep secrets in the target secret/environment mechanism, never in Git or
  image layers.
- Do not remove persistent volumes during deployment.
- Record image/version, migration status, health result, and rollback target.

## Post-deploy verification

- Check container state, health, logs, readiness, ingress, and dependent
  service connectivity.
- Exercise a safe smoke test for the changed endpoint or workflow.
- Confirm error rate and resource behavior are acceptable.
- If verification fails, stop rollout and use the documented rollback path.
