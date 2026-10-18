---
name: memory-promotion
description: "Promote verified, reusable findings and decisions into HOME_SERVER canonical memory without leaking secrets, stale assumptions, raw logs, or unreviewed speculation."
---

# Memory Promotion

Use after implementation and review, not as an automatic session-end action.

1. Collect confirmed decisions, reusable patterns, incidents, and review
   findings from `docs/reviews/finding-registry.json` and the immutable review
   records under `docs/reviews/runs/`.
2. Remove secrets, tokens, personal identifiers, raw logs, and environment
   details that are not necessary.
3. Classify the entry as global, service-specific, pattern, decision, or
   incident.
4. Link it to the relevant service, contract, runbook, or review finding.
5. Record status and date; mark uncertain information as a draft outside
   canonical memory.
6. Update `memory/index.yaml`.
7. Include the registry occurrence key, occurrence count, and affected PRs when
   a review finding is promoted.
8. Run context validation and include the memory impact in the summary.

Never promote a local workaround into `memory/global/` without evidence that it
applies across services.
