# Review Master

`review-master` is the HOME_SERVER entry point for pull-request and code
change reviews. It detects changed surfaces and loads only the required
specialist modules from `modules/`.

Every review iteration is preserved under
[`runs/`](../../../docs/reviews/runs/README.md) and aggregated in the
[finding registry](../../../docs/reviews/finding-registry.json). This makes
recurring findings searchable by occurrence count and pull request before
promotion to canonical memory.

Before implementation, use the targeted history query:

```bash
node scripts/query-review-findings.mjs webhook postgres \
  --service telegram-gateway --limit 20
```

This returns aggregate findings first by recurrence. Open linked records only
when the implementation needs historical root-cause detail.

## Modules

- [Pull request review](./modules/pr-review/SKILL.md)
- [Code review](./modules/code-review/SKILL.md)
- [Security review](./modules/security-review/SKILL.md)
- [Test gap audit](./modules/test-gap-audit/SKILL.md)
- [Test review](./modules/test-review/SKILL.md)
- [Architecture review](./modules/architecture-review/SKILL.md)
- [Backend patterns](./modules/backend-patterns/SKILL.md)
- [PostgreSQL code review](./modules/postgresql-code-review/SKILL.md)
- [PostgreSQL optimization](./modules/postgresql-optimization/SKILL.md)
- [Ponytail lean review](./modules/ponytail-lean-review/SKILL.md)
- [React/Next best practices](./modules/vercel-react-best-practices/SKILL.md)
- [React composition](./modules/react-composition-patterns/SKILL.md)
- [Responsive web review](./modules/web-design-review/SKILL.md)
- [Mobile web acceptance](./modules/mobile-web-acceptance/SKILL.md)
- [React Native review](./modules/react-native-review/SKILL.md)

`docker-master`, `context-master`, and `verification-loop` remain independent
top-level skills. Review Master delegates to them when a change affects Docker
lifecycle, repository context, or executable validation.
