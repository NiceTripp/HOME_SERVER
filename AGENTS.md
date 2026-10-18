# HOME_SERVER Agent Entry Point

This file is the portable onboarding entry point for any coding agent,
including agents that do not automatically load VS Code customizations.

## Required startup order

Before changing code:

1. Read this file and [`README.md`](README.md).
2. Read [`TODO.md`](TODO.md).
3. Read [`agent-instructions.instructions.md`](.github/instructions/agent-instructions.instructions.md).
4. Read the canonical architecture maps:
   - [`service-catalog.yaml`](docs/architecture/service-catalog.yaml)
   - [`dependency-graph.yaml`](docs/architecture/dependency-graph.yaml)
   - [`data-flow.md`](docs/architecture/data-flow.md)
5. Read [`memory/index.yaml`](memory/index.yaml), then only the memory entries
   relevant to the affected service.
6. Follow [`agent-onboarding.md`](docs/agent-onboarding.md) to classify the
   task and build a bounded context map.

Do not read every source file, review record, or memory entry at startup.
First identify the service and changed surfaces, then inspect only the files
needed for the task.

## Skill entry points

Skills are repository files under `.github/skills/` and are portable
instructions, not provider-specific APIs:

- `context-master`: discovery, context maps, context maintenance, and memory
  promotion.
- `review-master`: PR/code review and specialist review modules.
- `docker-master`: Docker, Compose, deployment, troubleshooting, and
  operations.
- `verification-loop`: executable validation before review, after fixes, and
  before completion.
- `tdd-workflow`: test-first implementation for behavior changes.

Read the selected router `SKILL.md`, then the smallest relevant module
`SKILL.md` and its referenced resources. Do not load every skill by default.

## Required behavior

- Never expose or commit secrets, tokens, private keys, dumps, or raw logs.
- Preserve service boundaries and documented contracts.
- Add or update tests for changed behavior and failure paths.
- Run the smallest relevant validation commands.
- HIGH and CRITICAL findings block merge or deployment until fixed or explicitly
  acknowledged.
- Update architecture context after confirmed changes.
- Promote findings to memory only after implementation, tests, and review have
  confirmed a reusable lesson.

## Handoff response

Before implementation, report:

- files and maps read;
- service and changed surfaces;
- targeted historical findings consulted;
- relevant memory consulted;
- files likely to change;
- risks and unknowns;
- tests and validation commands.

At completion, report:

- implementation summary;
- tests and commands actually run;
- review routes and findings;
- context surfaces marked `updated`, `not affected`, or `not needed`;
- memory promoted or explicitly not promoted;
- remaining limitations.
