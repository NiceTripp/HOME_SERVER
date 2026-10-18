---
name: test-gap-audit
description: "Audit HOME_SERVER changes for missing, weak, stale, or mis-scoped tests across APIs, events, persistence, retries, security, Docker health, and service contracts."
---

# Test Gap Audit

Perform a read-only audit. Do not add or rewrite tests during the audit.
Compare the requirement, contract, changed code, and existing tests.

Check:

- Valid, malformed, unauthorized, duplicate, and boundary inputs.
- Success, timeout, retry, rate-limit, permanent failure, and cancellation paths.
- Database constraints, migration behavior, transaction boundaries, and
  connection failure.
- Contract compatibility and error response shape.
- Health/readiness and configuration failure behavior.
- Secret redaction and security regression cases.
- Docker startup/readiness and graceful shutdown where deployment changes.

Report each gap with severity, confidence, affected behavior, and the smallest
useful test. Do not use coverage percentage as proof that behavior is covered.
