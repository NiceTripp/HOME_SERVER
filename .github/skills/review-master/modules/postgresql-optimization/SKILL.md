---
name: postgresql-optimization
description: "Analyze PostgreSQL query and schema performance in HOME_SERVER, especially event, delivery, telemetry, and time-series workloads."
---

# PostgreSQL Optimization

Start with query plans and observed workload rather than speculative indexes.
Preserve correctness and operational simplicity before optimizing.

Check:

- Query predicates, joins, ordering, pagination, and indexes match actual use.
- High-volume event and delivery tables have retention and indexing plans.
- JSONB, arrays, and extensions are justified instead of hiding a relational
  model problem.
- Batch operations avoid unbounded memory and transaction duration.
- Connection pool size matches the service and PostgreSQL capacity.
- Migrations avoid unnecessary table rewrites and long locks.
- Changes include an explain/benchmark or a clear reason measurement is not
  possible yet.

Do not recommend `VACUUM`, indexes, extensions, or denormalization without
considering write cost, storage, backup, and migration impact.
