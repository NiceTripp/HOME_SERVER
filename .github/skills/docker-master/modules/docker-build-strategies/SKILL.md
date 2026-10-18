---
name: docker-build-strategies
description: "Build secure, reproducible, small Docker images for HOME_SERVER Node.js and future service workloads using multi-stage builds, BuildKit, caching, and non-root runtime."
---

# Docker Build Strategies

Review or create:

- A focused `.dockerignore` excluding secrets, logs, dependencies, local state,
  and build output.
- Separate dependency, build, and runtime stages where useful.
- Stable dependency layers before frequently changing source layers.
- Reproducible lockfile-based installation.
- A non-root runtime user and only required runtime files.
- No credentials in `ARG`, `ENV`, copied files, or image layers.
- BuildKit cache usage only when it does not weaken reproducibility.
- A runtime base compatible with native Node/PostgreSQL dependencies.
- A smoke test or healthcheck for the resulting image.

Validate the actual image and Compose configuration instead of assuming a
successful Dockerfile parse proves runtime correctness.

## Detailed resources

- [multi-stage builds](./references/multi-stage-builds.md)
- [layer caching](./references/layer-caching.md)
- [verification checklist](./checks/verification.md)
- [Node.js Dockerfile example](./assets/Dockerfile.nodejs)
- [Docker build verification script](./scripts/verify-build.sh)
