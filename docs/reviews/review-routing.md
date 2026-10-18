# Review Routing

Use `review-master` as the default entry point for a PR or a meaningful code
change. It inspects the diff and routes to the smallest sufficient set below.
Call a specialist directly only when the task is already narrowly scoped.

`review-master` owns the review modules listed below and selects the smallest
sufficient set based on the changed surfaces. `docker-master` and
`context-master` remain separate routers and are delegated to when applicable.

| Change surface | Required skills |
|---|---|
| TypeScript behavior | `tdd-workflow`, `review-master/modules/code-review`, `verification-loop` |
| PostgreSQL schema/query/migration | `review-master/modules/postgresql-code-review`, `review-master/modules/test-gap-audit` |
| Query or high-volume event path | `review-master/modules/postgresql-optimization` |
| Dockerfile or Compose | `docker-master` (routes to foundations/build/Compose/review modules) |
| Docker deploy/update | `docker-master` (routes to deploy/operations/review modules) |
| Docker runtime incident | `docker-master` (routes to troubleshoot/operations modules) |
| Destructive Docker operation | `docker-master` (routes to destructive-guardrails module) |
| Webhook/auth/secrets/input | `review-master/modules/security-review`, `review-master/modules/test-gap-audit` |
| Service boundary/contract/data flow | `context-master` (routes to context-map/maintenance) + `review-master/modules/architecture-review` |
| Cross-service PR closure | `review-master/modules/pr-review`, `verification-loop`, `context-master` (routes to memory-promotion) |
| React/Next frontend performance | `review-master/modules/vercel-react-best-practices`, `review-master/modules/code-review`, `verification-loop` |
| React component API design | `review-master/modules/react-composition-patterns`, `review-master/modules/code-review`, `review-master/modules/test-review` |
| Responsive/mobile web UI | `review-master/modules/web-design-review`, `review-master/modules/mobile-web-acceptance`, `review-master/modules/test-review` |
| React Native/Expo app | `review-master/modules/react-native-review`, `review-master/modules/code-review`, `review-master/modules/test-review`, `verification-loop` |

Do not run every skill for every change. Review routing is a risk control, not
a requirement to generate redundant reports.

## PR workflow

```text
focused PR
  -> review-master
  -> diff classification
  -> core review: pr-review + code-review
  -> conditional specialist routes
  -> verification-loop
  -> context-master when architecture/context is affected
  -> fix HIGH/CRITICAL findings
  -> re-review the updated diff
```

For unsubmitted work, `review-master` may review the working-tree diff, but the
report must identify the comparison base and should be repeated against the
actual PR diff before merge.
