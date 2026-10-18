---
name: architecture-review
description: "Review HOME_SERVER architecture changes for service boundaries, dependencies, contracts, data flow, persistence, operability, and unnecessary coupling."
---

# Architecture Review

Compare the implementation with the service catalog, dependency graph, data
flow, and relevant contract.

Check:

- Responsibilities remain inside the correct service boundary.
- New dependencies and data stores are justified and documented.
- APIs/events are versioned and failure semantics are explicit.
- Persistence, retries, and consistency behavior are operationally viable.
- Health, observability, backup, and rollback concerns are covered.
- The change does not introduce avoidable coupling or duplicate an existing
  platform capability.

Report concrete architectural risks with impact, confidence, and a suggested
smallest correction.
