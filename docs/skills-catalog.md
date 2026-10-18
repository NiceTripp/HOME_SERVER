# External Agent Skills Catalog

Catalog date: 2026-10-19

This document records which external skills are useful for HOME_SERVER. It is
an evaluation and integration guide, not a copy of the upstream repositories.
Prefer adapting the ideas into small, repository-specific skills and keep
canonical behavior in `.github/skills/`.

## Short recommendation

Use these as the initial upstream sources:

1. Docker Compose and destructive-operation guidance from `docker/skills`.
2. Backend layering and verification-loop ideas from
   `everything-claude-code`.
3. Context mapping, PostgreSQL review, and test-gap auditing from
   `awesome-copilot`.
4. `vercel-labs/agent-skills` only if a React/Vercel frontend is added later.

Do not install every skill. Overlapping skills create contradictory instructions,
larger prompts, and less predictable agent behavior.

## Reviewed revisions and sources

The research used these revisions so recommendations remain reproducible:

| Repository | Revision | Source |
|---|---|---|
| `vercel-labs/agent-skills` | `063bee94c3f4df8453406c830b0a7df0f2860278` | [skills](https://github.com/vercel-labs/agent-skills/tree/063bee94c3f4df8453406c830b0a7df0f2860278/skills) |
| `docker/skills` | `25f7e03184ce455ea1604bea00f7b40f95ca50e5` | [skills](https://github.com/docker/skills/tree/25f7e03184ce455ea1604bea00f7b40f95ca50e5/skills) |
| `github/awesome-copilot` | `cb64ad12e32737ae764becd6885462e9b4c7cb00` | [skills](https://github.com/github/awesome-copilot/tree/cb64ad12e32737ae764becd6885462e9b4c7cb00/skills) |
| `everything-claude-code` | `432485ba6b92c14fb357276a98957f348bcff9ee` | [skills](https://github.com/WorldFlowAI/everything-claude-code/tree/432485ba6b92c14fb357276a98957f348bcff9ee/skills) |

## Recommendation legend

- **Adapt**: use the ideas, but rewrite for HOME_SERVER.
- **Reference**: read when needed; do not install as a default skill.
- **Skip**: not relevant to the current stack.
- **Copy with license review**: source is potentially reusable, but verify the
  license and remove host-specific assumptions first.

## Priority integration plan

### P0: adapt before or during Telegram gateway

| Upstream skill | Repository/path | Recommendation | Why |
|---|---|---|---|
| Docker Compose patterns | `docker/skills/docker-compose-patterns` | Adapt | Compose service wiring, healthchecks, readiness ordering, volumes, networks, secrets, and development overrides. |
| Docker destructive guardrails | `docker/skills/docker-destructive-guardrails` | Adapt | Protect PostgreSQL volumes and IoT history from `down -v`, prune, and removal commands. |
| Docker build strategies | `docker/skills/docker-build-strategies` | Adapt | Multi-stage Node images, BuildKit cache, `.dockerignore`, non-root runtime, and image hardening. |
| Backend patterns | `everything-claude-code/backend-patterns` | Adapt | Separate Telegram adapter, application service, repository, policy, and infrastructure layers. |
| Security review | `everything-claude-code/security-review` | Adapt | Practical checklist for secrets, input validation, API endpoints, database access, and logging. |
| Context map | `awesome-copilot/context-map` | Adapt | Require pre-change files, relationships, tests, patterns, and risk assessment for cross-service work. |
| Verification loop | `everything-claude-code/verification-loop` | Adapt | Build, typecheck, lint, test, security checks, diff review, plus Docker and context validation. |

### P1: use during gateway implementation and closure

| Upstream skill | Repository/path | Recommendation | Why |
|---|---|---|---|
| PostgreSQL code review | `awesome-copilot/postgresql-code-review` | Adapt | Review schema, indexes, constraints, migrations, transactions, raw SQL, and PostgreSQL security. |
| PostgreSQL optimization | `awesome-copilot/postgresql-optimization` | Reference | Useful for telemetry/history queries, JSONB, indexing, full-text search, and extensions. |
| Test gap audit | `awesome-copilot/test-gap-audit` | Adapt | Find missing tests for webhook, authorization, retry, idempotency, migration, health, and failure paths. |
| TDD workflow | `everything-claude-code/tdd-workflow` | Adapt | Use test-first for core behavior, but do not impose a full E2E gate on documentation/config-only changes. |
| Acquire codebase knowledge | `awesome-copilot/acquire-codebase-knowledge` | Adapt | Useful for onboarding, large restructuring, service inventory, and architecture refreshes. |
| Docker project foundations | `docker/skills/docker-project-foundations` | Reference | Useful when adding a new service; avoid duplicating its rules into every service skill. |

These six P1 skills now have HOME_SERVER-specific implementations under
`.github/skills/`:

- `postgresql-code-review`
- `postgresql-optimization`
- `test-gap-audit`
- `tdd-workflow`
- `acquire-codebase-knowledge`
- `docker-project-foundations`

The P0 foundation set is also implemented locally:

- `context-map`
- `backend-patterns`
- `docker-compose-patterns`
- `docker-build-strategies`
- `docker-destructive-guardrails`
- `verification-loop`
- `memory-promotion`

Review routing is documented in
`docs/reviews/review-routing.md`.

They are adapted local skills, not verbatim copies of upstream files.

### P2: future or optional

| Upstream skill | Repository/path | Recommendation | Why |
|---|---|---|---|
| Codebase memory MCP | `awesome-copilot/codebase-memory-mcp` | Reference | Requires a compatible MCP server; not needed while repository maps and search are small. |
| Memory merger | `awesome-copilot/memory-merger` | Adapt cautiously | Fits curated memory only after an approval workflow prevents stale or secret data promotion. |
| Continuous learning | `everything-claude-code/continuous-learning` | Reference only | Claude Code Stop-hook and global filesystem assumptions conflict with curated, Git-tracked memory. |
| Strategic compact | `everything-claude-code/strategic-compact` | Reference | Keep the phase-boundary idea; do not copy Claude-specific hooks. |

## Repository-specific notes

### `docker/skills`

Best direct match for this project. The most important local adaptations are:

- Use the repository's chosen Compose filename consistently.
- Pin production image versions; do not use `latest`.
- Use `depends_on.condition: service_healthy` where readiness matters.
- Use named volumes for PostgreSQL and document backup/restore.
- Keep secrets out of Compose and image layers.
- Treat Docker socket access as privileged and exceptional.
- Require explicit confirmation before destructive commands.
- Add Traefik, LAN exposure, webhook ingress, and home-server backup rules.

The upstream Docker skill set also includes:

- `docker-agent-config`
- `docker-agent-deploy`
- `docker-agent-run`
- `docker-sandboxes-env`
- `docker-sandboxes-kits`
- `docker-sandboxes-lifecycle`
- `docker-sandboxes-network-credentials`

These are useful only if HOME_SERVER adopts the corresponding Docker Agent or
Sandbox workflows. They should not be installed by default.

The runtime-relevant Docker skills are now grouped under the single local
entry point `.github/skills/docker-master/`. It routes to modules that retain
their detailed supporting resources:

- `docker-compose-patterns`: references, checks, Compose assets, and verifier.
- `docker-project-foundations`: project references, starter assets, and verifier.
- `docker-build-strategies`: build references, Node.js asset, and verifier.
- `docker-destructive-guardrails`: command references and checks.
- `docker-review`: HOME_SERVER deployment review.
- `docker-deploy`: deployment preflight, health verification, and rollback.
- `docker-troubleshoot`: evidence-first runtime diagnosis.
- `docker-operations`: health, logs, backup/restore, restart, and incident operations.

Use `docker-master` in normal work; use its module paths only when a detailed
module reference must be inspected directly.

The source checkout at `HOME_SERVER/skills/` is ignored; only selected,
adapted skill content is kept in the project skill directory.

Context and memory skills are grouped under the single local entry point
`.github/skills/context-master/`. It routes to:

- `acquire-codebase-knowledge`
- `context-map`
- `context-maintenance`
- `memory-promotion`

The modules retain their detailed instructions. Context data and memory data
remain separate: architecture state is in `docs/architecture/`, while durable
curated knowledge is in `memory/`.

Review skills are grouped under the single local entry point
`.github/skills/review-master/`. Its specialist modules live under
`.github/skills/review-master/modules/`. It detects changed surfaces from a PR
diff and routes to:

- `pr-review` and `code-review` for every meaningful implementation review;
- `security-review`, `test-gap-audit`, and `test-review` for security or test
  signals;
- `postgresql-code-review` and `postgresql-optimization` for database changes;
- `docker-master` for Dockerfile, Compose, deployment, and runtime changes;
- `architecture-review`, `backend-patterns`, and `context-master` for
  boundaries and repository context;
- frontend specialist skills for React, responsive web, or React Native changes;
- `verification-loop` for executable validation after implementation changes.

Prefer one focused PR per coherent change. The PR is the stable review unit;
local working-tree review is supported as an early feedback loop, not a
replacement for reviewing the final PR diff.

The review router owns the review, database, backend, frontend, test, and
security modules. `docker-master`, `context-master`, and the independent
`verification-loop` skill remain separate lifecycle/context/validation routers
and are delegated to rather than copied into `review-master`.

### `github/awesome-copilot`

This repository is broad. Relevant skills include:

- `context-map`
- `acquire-codebase-knowledge`
- `codebase-memory-mcp`
- `memory-merger`
- `postgresql-code-review`
- `postgresql-optimization`
- `test-gap-audit`
- `javascript-typescript-jest`
- `review-and-refactor`
- `security-review`
- `multi-stage-dockerfile`
- `arduino-azure-iot-edge-integration`

The repository also contains many unrelated cloud, frontend, language, and
vendor-specific skills. Do not bulk-import the full directory.

For HOME_SERVER, use its security review as a deeper data-flow review only
after adapting the output format to the repository's review schemas. The local
security skill should remain the authoritative workflow.

### `everything-claude-code`

Relevant skills:

- `backend-patterns`
- `coding-standards`
- `continuous-learning`
- `security-review`
- `strategic-compact`
- `tdd-workflow`
- `verification-loop`
- `project-guidelines-example`

The examples frequently assume Claude Code, Next.js, Supabase, or global
`~/.claude` files. Keep the engineering principles, but rewrite commands,
paths, database examples, and memory behavior for VS Code/Copilot and this
monorepo.

### `vercel-labs/agent-skills`

Available skills at the reviewed revision:

- `composition-patterns`
- `deploy-to-vercel`
- `react-best-practices`
- `react-native-skills`
- `react-view-transitions`
- `vercel-optimize`
- `vercel-cli-with-tokens`
- `web-design-guidelines`
- `writing-guidelines`

Current recommendation:

- `react-best-practices` and `composition-patterns`: copied into local
  `.github/skills/` with detailed `rules/` folders and adapted metadata. Use
  later if an ecommerce or monitoring dashboard is built with React.
- `web-design-guidelines`: use later if a dashboard needs a UI accessibility
  review; it has no large local rules folder in this checkout.
- `writing-guidelines`: optional reference.
- `deploy-to-vercel`, `vercel-optimize`, and `vercel-cli-with-tokens`: skip for
  the Docker Compose/Dokploy home-server deployment model.
- `react-native-skills` and `react-view-transitions`: skip unless a mobile app
  becomes part of this repository.

The copied frontend skills are optional and are not part of the Telegram
gateway review route. Their upstream source and revision are recorded in each
skill's `UPSTREAM-SOURCE.md`.

For browser applications, HOME_SERVER also provides local
`web-design-review` and `mobile-web-acceptance` skills. These cover responsive
layouts, touch interaction, accessibility, mobile states, and viewport evidence.
The upstream `react-native-skills` directory was reviewed but not copied:
native-only rules such as FlashList, safe-area APIs, Pressable, and native
navigators do not prove responsive web behavior. A small
`react-native-review` routing skill exists for a future Expo/native app.

## Security skill consolidation

There are multiple security skills with overlapping checklists. Do not run all
of them as independent mandatory gates.

Recommended layering:

1. Local `security-review`: authoritative HOME_SERVER output format and gate.
2. Adapted implementation checklist from
   `everything-claude-code/security-review`.
3. Deeper data-flow and attack-path ideas from
   `awesome-copilot/security-review`.
4. Telegram-specific checks: webhook secret, user/chat authorization, replay,
   rate limits, token redaction, outbound request restrictions, and command
   allowlist.
5. IoT-specific checks later: device identity, offline queue, MQTT/HTTP topic
   validation, credential rotation, and firmware/update trust.

## Testing and verification consolidation

Recommended workflow:

```text
context-map
  -> implement with focused tests
  -> verification-loop
  -> test-gap-audit
  -> code/security/docker/architecture review
  -> fix and re-review
```

Do not make every layer mandatory for a trivial documentation change. The
context-maintenance skill should classify the affected surfaces and choose the
smallest sufficient review scope.

## Licensing and copy policy

- `docker/skills` identifies Apache-2.0 metadata in the reviewed skills.
- `github/awesome-copilot` is MIT-licensed.
- The reviewed `vercel-labs/agent-skills` revision did not show a repository
  license file; do not assume permissive licensing for verbatim redistribution.
- The reviewed `everything-claude-code` revision did not show a repository
  license file; do not copy its files verbatim into a redistributed product
  without confirming permission.
- Even with a compatible license, rewrite examples and commands that assume
  Vercel, Azure, Supabase, Next.js, Jest, Claude hooks, or a different secret
  model.
- Keep source URLs and revision hashes in this catalog when adapting material.

## Immediate next action

Do not copy external files yet. First complete the Telegram gateway contract
and scaffold. Then integrate only the P0 items that apply to the concrete
Docker/Node/PostgreSQL implementation, record the adaptation in the review
summary, and run context validation.
