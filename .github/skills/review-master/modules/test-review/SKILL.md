---
name: test-review
description: "Review HOME_SERVER tests for meaningful coverage of behavior, failure paths, retries, persistence, contracts, and regressions."
---

# Test Review

Check that tests verify observable behavior rather than implementation details.

Cover:

- Valid and invalid input.
- Authorization allow and deny paths.
- Duplicate and idempotency behavior.
- Timeout, retry, rate-limit, and permanent failure behavior.
- Database persistence and recovery boundaries.
- API/event contract compatibility.
- Health and readiness behavior.

Identify false-positive tests, missing assertions, unisolated external calls,
and tests that cannot fail when the feature regresses.
