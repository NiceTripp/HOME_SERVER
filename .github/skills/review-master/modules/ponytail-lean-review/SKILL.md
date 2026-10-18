---
name: ponytail-lean-review
description: "Review HOME_SERVER changes for unnecessary code, missed reuse, speculative abstractions, incomplete caller/test/config reach, and undocumented shortcuts. Use as a focused lean-code review inside review-master."
---

# Ponytail Lean Review

This is an adapted HOME_SERVER review module inspired by the local Ponytail
repository at `ponytail/`. It is not a second security, database, Docker, or
architecture review. Report only concrete lean-code or completeness problems
that are not already covered by another specialist.

## Review scope

Read the diff and the connected code, not only changed lines:

- callers of changed functions and exports;
- tests, fixtures, configuration, and scripts;
- existing helpers, adapters, components, and repository patterns;
- code paths affected by renamed fields or changed behavior.

Check:

1. **Unnecessary code**: dead code, speculative options, unused wrappers, or
   a dependency added for a small standard-library/platform capability.
2. **Missed reuse**: a suitable existing helper, adapter, validator, or pattern
   was ignored without a concrete reason.
3. **Incomplete reach**: callers, tests, fixtures, exports, config, or docs
   that must change were missed.
4. **Over-abstraction**: a new interface/factory/layer has one implementation
   and no real boundary.
5. **Risky simplification**: validation, error handling, security, data-loss
   protection, accessibility, or tests were removed to make the diff smaller.
6. **Shortcut debt**: a deliberate limit lacks a `shortcut:` comment stating
   the ceiling and when to upgrade.

## Evidence gate

Every finding needs a concrete case:

- identify the input, caller, load, or maintenance situation;
- explain the actual defect or future failure;
- name the smallest correct fix;
- state the impact if skipped.

Do not report style preferences, vague "consider" advice, or code as
over-engineered merely because it has multiple lines. A shortcut with a clear
limit and upgrade trigger is a decision, not automatically a finding.

## Output and integration

Return findings using the HOME_SERVER review finding schema:

`docs/reviews/finding.schema.json`

Each finding must include:

- stable `id`;
- stable `occurrenceKey` for recurring patterns;
- category `lean`, `completeness`, or `maintainability`;
- severity and confidence;
- file/line evidence;
- impact and smallest fix;
- references to connected code or tests.

`review-master` owns the final report, review record, and finding registry.
Do not create a separate registry or memory entry. Deduplicate against
`code-review`, `backend-patterns`, `security-review`, PostgreSQL, Docker, and
architecture findings before recording.

## Constraints

- Do not change code during this read-only review.
- Do not recommend removing validation, error handling, security, tests, or
  required behavior just to reduce line count.
- Do not copy Ponytail runtime hooks, provider plugins, or unrelated assets
  into HOME_SERVER.
- Use the repository's actual expected load and conventions.

## Source

Adapted from:

- `ponytail/AGENTS.md`
- `ponytail/skills/ponytail-review/SKILL.md`
- `ponytail/skills/ponytail-debt/SKILL.md`

Ponytail is MIT-licensed. This module is rewritten for HOME_SERVER paths,
schemas, routing, and review gates.
