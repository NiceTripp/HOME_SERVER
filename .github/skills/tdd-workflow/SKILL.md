---
name: tdd-workflow
description: "Use test-first development for HOME_SERVER features, bug fixes, and refactors with observable acceptance criteria and focused unit, integration, and contract tests."
---

# TDD Workflow

Use this workflow for behavior changes, especially webhook handling,
authorization, commands, persistence, retry, and idempotency.

1. State the observable acceptance criterion.
2. Add a focused failing test for the behavior or regression.
3. Implement the smallest correct change.
4. Run the focused test and relevant integration/contract tests.
5. Refactor only after the tests pass.
6. Run typecheck, lint, and context validation.

Use real PostgreSQL integration tests for migration and transaction behavior
where mocks would hide database semantics. Do not require full end-to-end or
coverage runs for documentation-only changes or unrelated configuration edits.
