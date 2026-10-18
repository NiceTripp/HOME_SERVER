---
name: verification-loop
description: "Run the HOME_SERVER verification sequence after implementation: format checks, typecheck, build, tests, security checks, Docker checks, context validation, and diff review."
---

# Verification Loop

Choose the smallest complete sequence for the change. For a TypeScript service,
run available commands in this order:

1. Formatting and lint.
2. Typecheck.
3. Build.
4. Focused unit tests.
5. Integration and contract tests.
6. Test-gap audit.
7. Security and dependency checks.
8. Dockerfile/Compose validation and image smoke test when deployment changes.
9. `node scripts/validate-context.mjs`.
10. `git diff --check` and review the final diff.

Use the actual package-manager scripts from the service. Do not claim a check
was run when its command or dependency is unavailable. Report skipped checks
with the reason and the remaining risk.

Pass criteria:

- Commands relevant to the change pass.
- HIGH/CRITICAL findings are fixed or explicitly acknowledged.
- Context impact is recorded.
- The final summary states implemented, deferred, tested, and known limitations.
