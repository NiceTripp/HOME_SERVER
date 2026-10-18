---
name: context-master
description: "Coordinate HOME_SERVER context and memory work: codebase discovery, pre-change mapping, architecture/documentation maintenance, curated memory promotion, and context validation. Use this single skill when a change may affect services, dependencies, contracts, data flow, runbooks, decisions, or reusable knowledge."
argument-hint: "Describe the change or context/memory task to route"
---

# Context Master

This is the single entry point for HOME_SERVER architecture context and
curated memory. It routes to specialized modules under `./modules/` while
keeping `docs/architecture/` and `memory/` as separate data layers.

## Routing

| Task signal | Module |
|---|---|
| Understand an unfamiliar repository, service, or cross-service flow | `./modules/acquire-codebase-knowledge/` |
| Plan a cross-service or high-risk change before implementation | `./modules/context-map/` |
| Update service maps, contracts, runbooks, memory index, or TODO after a change | `./modules/context-maintenance/` |
| Promote verified reusable decisions, patterns, incidents, or findings into memory | `./modules/memory-promotion/` |

Use multiple modules when a task spans discovery, implementation, and closure.

## Standard workflow

1. Read repository instructions, `TODO.md`, the service catalog, dependency
   graph, data flow, and `memory/index.yaml`.
2. For a new feature or behavior change, identify changed surfaces first and
   run targeted historical retrieval:
   `node scripts/query-review-findings.mjs <terms> --service <service>`.
   Read the returned registry entries, then open only the linked review records
   when root-cause detail is needed. Do not load all review history by default.
3. Read curated memory for the affected service and relevant global patterns.
4. Route the task to the smallest appropriate module set.
5. Keep architecture context in `docs/architecture/` and durable knowledge in
   `memory/`; do not merge these data layers.
6. Classify every affected surface as `updated`, `not affected`, or
   `not needed`.
7. Never record secrets, raw runtime data, unredacted logs, or speculation.
8. Run `node scripts/validate-context.mjs`.
9. Report selected modules, targeted findings consulted, changed context
   surfaces, promoted memory, skipped
   checks, and remaining unknowns.

## Promotion gate

Memory promotion happens only after the relevant code, tests, and review have
confirmed the decision or pattern. A service-specific lesson must not become a
global rule without evidence that it applies across services.

## Module structure

```text
context-master/
├── SKILL.md
└── modules/
    ├── acquire-codebase-knowledge/
    ├── context-map/
    ├── context-maintenance/
    └── memory-promotion/
```

Read the selected module's `SKILL.md` and its referenced resources before
acting. Do not duplicate all module instructions into this router.
