---
name: postgresql-code-review
description: "Review PostgreSQL schemas, Prisma migrations, queries, transactions, indexes, constraints, connection handling, and database security in HOME_SERVER services."
---

# PostgreSQL Code Review

Review the changed schema, migration, query, repository, and configuration
against the actual PostgreSQL version and service contract.

Check:

- Primary keys, foreign keys, uniqueness, nullability, timestamps, and delete
  behavior are intentional.
- Migration rollout is safe for existing data, locks, and rollback/recovery.
- Queries use parameters and have indexes matching real predicates.
- Transactions cover the required atomic boundary without unnecessary length.
- Retry behavior does not duplicate writes or violate idempotency.
- Connection pooling, timeouts, and shutdown behavior are bounded.
- Raw SQL and dynamic identifiers are safe.
- Sensitive data is not exposed through logs, errors, or overly broad queries.
- Tests cover constraints, migrations, transactions, and failure paths.

Use the repository review finding schema. Treat row-level security as a design
decision to evaluate, not an automatic requirement; record the chosen
authorization boundary.
