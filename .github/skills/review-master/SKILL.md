---
name: review-master
description: "Review a HOME_SERVER pull request or code change end to end. Detect changed surfaces from the diff and route to the smallest sufficient code, security, PostgreSQL, Docker, architecture, frontend, test, verification, and context review skills."
argument-hint: "Describe the PR, base branch, or code change to review"
---

# Review Master

Use this skill as the single entry point for reviewing a HOME_SERVER PR or
meaningful code change. Do not run every specialist by default. Inspect the
actual diff, classify changed surfaces, load the smallest sufficient set of
specialist skills, and produce one consolidated review.

## PR-first operating model

Prefer one focused PR per coherent change. A PR is the primary review unit
because it provides:

- an explicit base and head diff;
- a stable requirement and acceptance-criteria target;
- one review summary and finding set;
- a clear fix-and-re-review boundary; and
- a merge/deploy decision point.

For local work that is not yet a PR, review the working-tree diff against the
repository base or the user-specified base, and state which comparison was
used. Do not invent PR metadata.

## Routing procedure

1. Read the requirement, acceptance criteria, PR description, and base/head
   when available.
2. Inspect the changed-file list and diff before selecting specialists.
3. Always load:
   - `./modules/pr-review/SKILL.md`
   - `./modules/code-review/SKILL.md`
4. Add specialists using the routing table below.
5. Invoke the top-level `verification-loop` skill when implementation or
   configuration files changed.
   It is a validation workflow, not a substitute for review findings.
6. Run `context-master` when architecture, contracts, service topology,
   operations, or durable memory may be affected.
7. Consolidate duplicate findings, preserving the highest severity and the
   strongest evidence.
8. Write an immutable review record to
   `docs/reviews/runs/<review-id>.json`, including the PR identifier, review
   iteration, routes, and every finding with a stable `occurrenceKey`.
9. Run `node scripts/record-review.mjs
   docs/reviews/runs/<review-id>.json` to update the aggregate finding registry.
   Re-running the same `reviewId` must not increment counts.
10. Report selected routes, findings, tests/checks run, skipped checks with
   reasons, context impact, and merge blockers.

## Change-surface routing

| Diff signal or requirement | Route |
|---|---|
| Any source, configuration, or test implementation | `code-review` |
| PR scope, acceptance criteria, docs, runbook, or merge readiness | `pr-review` |
| Reuse, over-abstraction, incomplete reach, or shortcut debt | `ponytail-lean-review` |
| Auth, webhook, secrets, input, output, SSRF, injection, logging, exposure | `security-review` |
| Missing, weak, stale, or false-positive tests | `test-gap-audit` + `test-review` |
| PostgreSQL schema, migration, query, repository, transaction, or index | `postgresql-code-review` |
| High-volume query, event/delivery table, pagination, retention, or plan risk | `postgresql-optimization` |
| Dockerfile, Compose, image, container, volume, network, healthcheck | `docker-master` |
| Docker deployment or runtime incident | `docker-master` |
| Service boundary, dependency, contract, data flow, persistence, or operations | `architecture-review` + `context-master` |
| TypeScript backend layering or adapter boundary | `backend-patterns` |
| React/Next rendering or performance | `vercel-react-best-practices` |
| React component API/composition | `react-composition-patterns` |
| Responsive web/mobile behavior | `web-design-review` + `mobile-web-acceptance` |
| React Native/Expo | `react-native-review` |

Do not route `tdd-workflow` as a duplicate code review. Use it when the PR
needs test-first implementation or when a missing regression test must be
written. Do not treat `verification-loop` as evidence unless its commands were
actually run.

## Module structure

```text
review-master/
├── SKILL.md
└── modules/
    ├── architecture-review/
    ├── backend-patterns/
    ├── code-review/
    ├── mobile-web-acceptance/
    ├── postgresql-code-review/
    ├── postgresql-optimization/
    ├── ponytail-lean-review/
    ├── pr-review/
    ├── react-composition-patterns/
    ├── react-native-review/
    ├── security-review/
    ├── test-gap-audit/
    ├── test-review/
    ├── vercel-react-best-practices/
    └── web-design-review/
```

Keep `docker-master`, `context-master`, and `verification-loop` as separate
top-level skills. Delegate to those skills instead of copying their modules
into this directory.

## Docker delegation

For Docker-related diffs, call `docker-master` rather than its modules directly.
It will select `docker-review` and any required Compose, build, deploy,
troubleshoot, operations, or destructive-guardrail modules. Include the
selected Docker modules in the consolidated report.

## Output contract

Use:

- `docs/reviews/finding.schema.json` for actionable findings;
- `docs/reviews/summary.schema.json` for the consolidated summary; and
- the security-review caller contract when security findings are present.

Findings must include severity, confidence, file/line evidence, impact, and a
smallest useful recommendation. Report no finding for a style preference that
does not cause a defect or violate a repository rule.

The final review must state:

- diff/base reviewed;
- routes selected and why;
- findings grouped by severity;
- checks actually run and skipped checks;
- required context/documentation updates;
- HIGH/CRITICAL blockers and whether they are fixed or explicitly acknowledged;
- whether a fix-and-re-review is required.

## Finding history and memory handoff

Use a stable `occurrenceKey` for the same recurring defect across review
iterations. The registry at `docs/reviews/finding-registry.json` records the
count, first/last appearance, statuses, and PRs. The individual records under
`docs/reviews/runs/` preserve the evidence for each review.

Do not promote every finding directly to memory. After a fix or repeated
occurrence, call `context-master` and route to `memory-promotion` only when the
finding is confirmed, reusable, and sanitized. Link the memory entry to the
registry key and affected PRs.
