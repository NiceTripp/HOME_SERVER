---
name: backend-patterns
description: "Design and review TypeScript backend services in HOME_SERVER using explicit adapters, application services, repositories, policies, validation, and bounded error handling."
---

# Backend Patterns

Use these layers when they clarify a real boundary; do not add abstractions
only to satisfy a pattern.

```text
transport/adapter
  -> validation and authorization
  -> application service
  -> repository or infrastructure adapter
  -> external system or database
```

Rules:

- Keep Telegram, HTTP, database, and device-specific code at infrastructure
  boundaries.
- Keep business decisions in application services that can be tested without
  network calls.
- Validate external input before persistence or side effects.
- Return typed domain results or typed errors at internal boundaries.
- Bound timeouts, retries, and resource usage.
- Make idempotency and transaction boundaries explicit.
- Do not force event-driven flows into REST resource semantics.
- Reuse existing repository conventions before adding a new layer.
