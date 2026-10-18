---
name: context-maintenance
description: "Maintain HOME_SERVER architecture maps, contracts, runbooks, curated memory, and TODO tracking when a feature changes service boundaries, dependencies, data flow, persistence, deployment, or operational behavior."
argument-hint: "Describe the feature or change whose context impact should be assessed"
---

# Context Maintenance

Use this skill before and after changes that may affect repository context.

## Procedure

1. Read `TODO.md`, `docs/architecture/service-catalog.yaml`,
   `docs/architecture/dependency-graph.yaml`, and `memory/index.yaml`.
2. Determine the blast radius and classify each context surface as `updated`,
   `not affected`, or `not needed`:
   - service catalog
   - dependency graph
   - data flow
   - contract
   - runbook
   - curated memory
   - TODO
3. For architecture or contract changes, update the relevant map or contract
   before implementation where practical.
4. Make the smallest code and documentation changes that keep context factual.
   Do not record secrets, raw runtime data, unredacted logs, or speculation.
5. Run `node scripts/validate-context.mjs`.
6. Complete the [context impact checklist](./templates/context-impact.md) in
   the change summary or pull request.
7. Report every surface, including surfaces marked `not affected` or
   `not needed`.

## Promotion rule

Promote information into canonical memory only when it is verified, reusable,
and likely to matter to a future feature or operation. Git history remains the
source for ordinary implementation details.
