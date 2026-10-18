# Review Records

Store one immutable JSON record per review iteration in this directory.

Use a stable filename such as:

```text
pr-42-review-01.json
pr-42-review-02.json
```

Each record must conform to `../review-record.schema.json`. After creating a
record, update the aggregate registry with:

```bash
node scripts/record-review.mjs docs/reviews/runs/pr-42-review-01.json
```

Do not edit old records to change history. Create a new review record for every
re-review.

For pre-change risk discovery, query the aggregate registry instead of reading
all records:

```bash
node scripts/query-review-findings.mjs retry idempotency \
  --service telegram-gateway
```
