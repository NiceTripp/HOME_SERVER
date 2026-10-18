---
name: pr-review
description: "Review a HOME_SERVER pull request for scope, requirement coverage, architecture impact, tests, deployment risk, documentation, and context synchronization."
---

# Pull Request Review

Review the complete diff against the stated requirement, not only individual
files.

Check:

- The implementation matches the requirement and acceptance criteria.
- Scope is focused and unrelated changes are absent.
- Service catalog, dependency graph, data flow, contract, runbook, memory, and
  TODO are updated or explicitly marked not affected/not needed.
- Tests and validation commands are present and reproducible.
- Security and Docker concerns have been addressed.
- Rollback and operational impact are understood.

Summarize implemented behavior, deferred behavior, findings, tests run, and
remaining limitations. Use the review summary schema in
`docs/reviews/summary.schema.json`.
