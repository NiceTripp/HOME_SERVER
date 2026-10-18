# Feature Development Workflow

Reusable workflow for developing a feature in HOME_SERVER. This example uses a
payment feature, but the same sequence applies to other services.

## Example task

> Add payment intent creation and payment-provider webhook handling.

Typical requirements:

- Create a payment intent.
- Receive and verify provider webhooks.
- Persist payment state in PostgreSQL.
- Deduplicate webhook delivery.
- Bound provider timeout and retries.
- Avoid storing or logging card data and secrets.
- Run safely through Docker Compose.

Application source belongs under `apps/<service>/`; shared infrastructure
belongs under `platform/`. Service memory remains under
`memory/services/<service>/`.

## 0. Create a focused branch or PR

Use one PR for one coherent feature:

```text
PR: Add payment intent and provider webhook handling
```

Write the goal and acceptance criteria before implementation:

```text
- Create a payment intent successfully.
- Reject an invalid webhook signature.
- Do not process a duplicate provider event twice.
- Allow only explicit payment state transitions.
- Retry provider timeouts with bounded backoff.
- Do not store card number, CVV, or provider secrets.
- Cover success, failure, duplicate, timeout, and retry paths with tests.
```

## 1. Load context and historical memory

Ask the agent:

```text
Dùng context-master để chuẩn bị context cho feature payment.

Task:
Tạo payment intent và xử lý webhook từ payment provider cho service
payment-service.

Trước khi code:
1. Đọc AGENTS.md, README.md và TODO.md.
2. Đọc agent-instructions.instructions.md.
3. Đọc service catalog, dependency graph và data flow.
4. Đọc memory/index.yaml và memory liên quan.
5. Xác định service, database, Docker và security surfaces bị ảnh hưởng.
6. Query findings cũ liên quan đến payment, webhook, signature,
   authorization, idempotency, retry, PostgreSQL, migration và secrets.
7. Dùng context-map để tạo bounded context map.
8. Chưa chỉnh sửa code.
9. Trả về context report, risks, unknowns và files dự kiến thay đổi.
```

The agent should read maps first, not the entire repository or all review
history. It should then query targeted findings:

```bash
node scripts/query-review-findings.mjs \
  payment webhook signature idempotency retry postgres \
  --service payment-service \
  --limit 20
```

Read curated memory for the affected service. Open records under
`docs/reviews/runs/` only when root-cause or regression detail is needed.

Before implementation, the agent should report:

- task classification;
- affected services;
- changed surfaces;
- historical findings consulted;
- relevant memory;
- planned files;
- risks and unknowns;
- validation plan.

If `payment-service` does not exist, stop and identify the required service
catalog, dependency graph, data-flow, contract, runbook, and memory changes
before implementing.

## 2. Apply the Ponytail engineering overlay

Ponytail is not a replacement for `context-master`, `tdd-workflow`,
`verification-loop`, or `review-master`. Use its principles throughout the
feature:

- Search for an existing helper, adapter, validator, or platform capability
  before adding code.
- Choose the smallest complete change, not the fewest lines at the cost of
  validation or correctness.
- Do not add speculative abstractions, options, wrappers, or dependencies.
- Check affected callers, tests, fixtures, exports, configuration, and docs.
- Keep validation, error handling, security, accessibility, and tests intact.
- Mark a deliberate limit with
  `shortcut: <ceiling>, <upgrade trigger>` when the simplification needs to
  be carried forward.

Ask the agent:

```text
Áp dụng Ponytail engineering rules cho payment feature:
- tìm code/helper/adapter/validator có sẵn trước khi viết mới;
- chọn smallest complete change;
- không thêm abstraction hoặc dependency chưa cần;
- kiểm tra callers, tests, fixtures, exports, config và docs bị ảnh hưởng;
- không bỏ validation, error handling, security hoặc tests;
- ghi shortcut comment nếu có giới hạn có chủ đích.
```

## 3. Finalize contract and design

Ask the agent:

```text
Dùng context-master/context-map để hoàn thiện thiết kế payment feature.

Xác định:
- POST /payments request/response.
- Webhook request/response.
- Payment state machine.
- Signature verification.
- Idempotency key và provider event ID.
- Retry và timeout.
- Transaction boundary.
- Error format.
- Health/readiness impact.
- Rollback strategy.
- Context files cần update.

Chưa implement code cho đến khi contract và acceptance criteria rõ ràng.
```

Example state machine:

```text
pending -> processing -> succeeded
                       -> failed
pending -> cancelled
```

Reject invalid transitions such as `succeeded -> pending`.

For a provider adapter:

```text
Dùng backend-patterns để thiết kế PaymentProvider adapter.
Application service không phụ thuộc trực tiếp vào SDK cụ thể.
```

For PostgreSQL:

```text
Thiết kế schema payment với:
- unique idempotency_key;
- unique provider_event_id;
- explicit payment state constraint;
- safe transaction boundary;
- indexes matching real lookups;
- migration and rollback plan.
```

## 4. Implement with TDD

Ask the agent:

```text
Dùng tdd-workflow để implement payment feature theo contract và acceptance
criteria đã chốt.

Viết failing tests trước cho:
1. Tạo payment intent thành công.
2. Request không hợp lệ.
3. Duplicate idempotency key.
4. Webhook signature không hợp lệ.
5. Webhook duplicate.
6. Webhook thành công.
7. Webhook payment failed.
8. Provider timeout.
9. Retry không tạo duplicate payment.
10. Invalid payment state transition.

Sau đó implement thay đổi nhỏ nhất để pass tests. Dùng typed errors, bounded
timeout/retry, không lưu card data hoặc provider secret, và chưa update memory.
```

Use additional routers when relevant:

```text
Dùng postgresql-code-review cho schema, migration và transaction.
Dùng postgresql-optimization nếu query hoặc bảng delivery có tải cao.
Dùng docker-master để thêm service vào Compose, healthcheck, readiness,
non-root runtime, secrets và rollback.
```

## 5. Run independent verification

`verification-loop` is a top-level skill, not a review module.

Ask the agent:

```text
Dùng verification-loop để kiểm tra payment feature trước code review.

Chạy các check phù hợp:
- format/lint;
- typecheck;
- build;
- focused unit tests;
- PostgreSQL integration tests;
- webhook contract tests;
- security/dependency checks;
- Docker Compose validation nếu có thay đổi Docker;
- node scripts/validate-context.mjs;
- git diff --check.

Báo cáo rõ passed, failed, skipped, lý do skipped và remaining risks.
```

Do not claim a check passed if it was not run.

## 6. Review the PR

Ask the agent:

```text
Dùng review-master để review toàn bộ PR payment feature.

Context:
- PR: PR-25
- Service: payment-service
- Requirement: payment intent và provider webhook
- Acceptance criteria: signature-safe, duplicate-safe, retry-safe

Đọc diff và kết quả verification-loop. Tự route các review module phù hợp,
ghi findings với occurrenceKey ổn định, tạo:

docs/reviews/runs/pr-25-review-01.json

Cập nhật finding registry, tạo Markdown summary và JSON findings, rồi kết luận
merge blockers.
```

Possible routes:

```text
pr-review
code-review
security-review
test-gap-audit
test-review
postgresql-code-review
postgresql-optimization
architecture-review
backend-patterns
ponytail-lean-review
docker-master
context-master
```

Only applicable routes should run. `ponytail-lean-review` checks concrete
reuse, over-abstraction, incomplete caller/test/config reach, and shortcut
debt. It does not duplicate security, PostgreSQL, Docker, architecture, or
test review.

## 7. Fix findings

Example findings:

```text
payment.webhook.signature-verified-before-persistence (high)
payment.webhook.provider-event-id-not-unique (high)
```

Ask the agent:

```text
Fix these findings in PR-25:

1. payment.webhook.signature-verified-before-persistence
   Verify the signature before parsing side effects and persistence. Add a
   regression test for an invalid signature.

2. payment.webhook.provider-event-id-not-unique
   Add a unique provider_event_id constraint, verify migration safety, and add
   an integration test for duplicate delivery.

After fixing, run focused tests and verification-loop. Do not edit the old
review record; prepare a new re-review record.
```

## 8. Verify and re-review

First run verification again:

```text
Dùng verification-loop sau khi fix findings của PR-25.

Tập trung vào webhook signature, duplicate provider events, migration,
retry/idempotency và regression tests. Báo cáo passed, failed, skipped và
remaining risks.
```

Then re-review:

```text
Dùng review-master để re-review PR-25 sau khi fix findings.

Đọc diff mới nhất, pr-25-review-01.json, finding registry liên quan, code,
tests và kết quả verification-loop.

Kiểm tra các findings cũ đã fixed thực sự chưa, có regression hoặc finding mới
không. Tạo record mới:

docs/reviews/runs/pr-25-review-02.json

Không sửa record cũ; cập nhật finding registry.
```

Every re-review creates a new immutable record:

```text
pr-25-review-01.json
pr-25-review-02.json
```

HIGH and CRITICAL findings must be fixed or explicitly acknowledged before
merge or deployment.

## 9. Update architecture context

After code and review are stable:

```text
Dùng context-master để cập nhật context sau khi hoàn thành payment feature.

Đọc implementation diff, review summaries, finding registry, payment contract,
service catalog, dependency graph, data flow và runbook.

Cập nhật các surface bị ảnh hưởng:
- service-catalog.yaml;
- dependency-graph.yaml;
- data-flow.md;
- payment contract;
- payment runbook;
- TODO.md.

Phân loại từng surface là updated, not affected hoặc not needed. Chạy:
node scripts/validate-context.mjs
```

## 10. Promote verified memory

Only promote memory after:

```text
implementation
-> tests
-> verification
-> review
-> findings fixed or acknowledged
-> re-review
-> context update
```

Ask the agent:

```text
Dùng context-master và memory-promotion để đánh giá payment findings.

Đọc finding-registry.json, các review records của PR-25, review summaries,
payment contract, runbook và memory hiện tại.

Chỉ promote lessons đã được xác minh, reusable, sanitized và không chỉ là
workaround cục bộ. Với mỗi lesson, ghi occurrenceKey, occurrenceCount, các PR
liên quan, root cause, preventive rule, cập nhật memory/index.yaml và chạy
validate-context.
```

Example memory:

```markdown
# Payment Webhook Idempotency

## Rule

Every provider webhook must be deduplicated by a provider-owned event ID before
applying payment state transitions.

## Evidence

- occurrenceKey: payment.webhook.provider-event-id-not-unique
- occurrenceCount: 2
- PRs: PR-25, PR-31
- Fixed in: PR-25 review 02

## Prevention

Require a database unique constraint on provider_event_id and integration tests
for duplicate delivery.
```

Store this as service memory, for example:

```text
memory/services/payment-service/webhook-idempotency.md
```

Then add it to `memory/index.yaml`. Do not copy all review records into memory:
records are evidence, while memory contains concise verified lessons.

## 11. Close the PR

Ask the agent:

```text
Hãy chạy closure checklist cho PR-25.

Kiểm tra implementation summary, tests, verification-loop, review records,
finding registry, HIGH/CRITICAL findings, service catalog, dependency graph,
data flow, contract, runbook, TODO, memory promotion, validate-context và
git diff --check.

Trả về implementation summary, tests run, review routes, findings resolved,
context impact, memory changes, remaining limitations và merge readiness.
```

## Quick reference

```text
context-master
  -> context-map + targeted findings + relevant memory
  -> contract and acceptance criteria

Ponytail overlay
  -> reuse first, smallest complete change, no speculative abstraction
  -> check callers/tests/config and record deliberate shortcuts

tdd-workflow
  -> failing tests -> implementation -> refactor

docker-master / PostgreSQL skills
  -> domain-specific implementation and checks

verification-loop
  -> lint -> typecheck -> build -> tests -> security -> Docker -> context

review-master
  -> specialist review + ponytail-lean-review
  -> review record -> finding registry

fix findings
  -> verification-loop
  -> review-master re-review

context-master
  -> update maps, contracts, runbooks and TODO

memory-promotion
  -> promote confirmed reusable lessons

validate-context
  -> final closure
```

Core rules:

- Read maps and targeted history before source implementation.
- Do not read all repository files or all historical PRs by default.
- Keep review records immutable.
- Use stable `occurrenceKey` values for recurring findings.
- Treat memory as curated knowledge, not a dump of review history.
- Never store secrets, raw runtime data, or unverified speculation.
