# Agent Onboarding

This is the portable startup workflow for ChatGPT, Claude, DeepSeek, Copilot,
and other coding agents working in HOME_SERVER.

## Bootstrap sequence

```text
AGENTS.md
  -> README.md and TODO.md
  -> agent-instructions
  -> architecture maps
  -> memory index and relevant memory
  -> bounded context map
  -> targeted finding query
  -> relevant source files/tests
```

The agent must not ingest the whole repository or all historical review
records. The maps identify the service and boundaries; the targeted query
identifies recurring risks; source files provide implementation truth.

## First response from a new agent

Before editing, the agent should return:

```text
Context read:
- ...

Task classification:
- feature | bug fix | refactor | review | operations | documentation

Affected service(s):
- ...

Changed surfaces:
- source | contract | PostgreSQL | Docker | security | tests | context

Historical findings consulted:
- occurrence keys, counts, and related PRs

Relevant memory:
- ...

Planned files:
- ...

Risks and unknowns:
- ...

Validation plan:
- ...
```

If the task is unfamiliar or cross-service, use `context-master` and its
`context-map` module before implementation. If the service is known and the
change is local, still read the maps and query targeted history before opening
the implementation files.

## Targeted historical context

After identifying the service and change surfaces, query the aggregate registry:

```bash
node scripts/query-review-findings.mjs \
  <technology> <behavior> <path-term> \
  --service <service> \
  --limit 20
```

Use terms such as `webhook`, `authorization`, `retry`, `idempotency`,
`postgres`, `migration`, `compose`, or `healthcheck`. The default result is
bounded and sorted by recurrence. Read linked records under
`docs/reviews/runs/` only for root-cause or regression analysis.

## Task routing

| Task | First router |
|---|---|
| Understand repository or plan a feature | `context-master` |
| Implement behavior change | `tdd-workflow`, plus domain skills |
| Dockerfile, Compose, deploy, incident | `docker-master` |
| Run validation before review or after fixes | `verification-loop` |
| PR or code review | `review-master` |
| Update maps, contracts, runbooks | `context-master` |
| Promote confirmed reusable knowledge | `context-master` → `memory-promotion` |

## Cross-provider usage

The canonical skill content is in:

```text
.github/skills/context-master/
.github/skills/review-master/
.github/skills/docker-master/
.github/skills/tdd-workflow/
.github/skills/verification-loop/
```

For a provider that does not discover `SKILL.md` automatically, explicitly
instruct it to read `AGENTS.md`, then the router named by the task. Do not paste
all skills into the prompt. Provider-specific instruction files should point
to this document rather than duplicate its rules.
