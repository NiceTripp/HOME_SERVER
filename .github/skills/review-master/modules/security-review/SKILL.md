---
name: security-review
description: "Review HOME_SERVER changes for exploitable security vulnerabilities, including secrets, authentication, authorization, injection, webhook handling, SSRF, unsafe logs, and container exposure."
---

# Security Review

Inspect changed code, configuration, dependencies, tests, and deployment files.
Prioritize exploitable vulnerabilities and give each finding a severity and
confidence.

For Telegram services, check webhook secret verification, deny-by-default chat
and sender authorization, replay/duplicate handling, rate limits, token
redaction, input validation, and outbound request restrictions.

Do not report speculative issues without an attack path and affected asset.
Use `docs/reviews/finding.schema.json` and block HIGH/CRITICAL findings unless
they are fixed or explicitly acknowledged.
