---
name: code-review
description: "Review HOME_SERVER code changes for correctness, type safety, error handling, maintainability, regressions, and missing tests. Use before merge or after a feature implementation."
---

# Code Review

Review the diff and relevant surrounding code. Report only actionable findings
with severity, confidence, file/line, impact, and a concrete recommendation.

Check:

- Requirement coverage and backward compatibility.
- Input validation, error propagation, and async failure handling.
- Type safety, boundary conditions, and duplicate logic.
- Resource cleanup, timeouts, retries, and idempotency.
- Tests for success, failure, and regression paths.
- Related documentation and context impact.

Do not treat style preference as a finding unless it causes a defect or violates
a repository convention. Use the review finding schema in
`docs/reviews/finding.schema.json`.
