# Telegram Gateway Memory

Status: planned

The Telegram gateway is the first reference service for HOME_SERVER. It will
receive and normalize Telegram updates, authorize users and groups, deliver
messages for other services, and persist delivery state in PostgreSQL.

The service must expose a documented adapter contract so future services such
as the water-quality IoT application do not depend on gateway internals.

The current draft contract is
`docs/contracts/telegram-gateway-v1.md`. It defines webhook verification,
deny-by-default authorization, normalized events, a versioned internal message
adapter, PostgreSQL-backed delivery state, bounded retries, and health/readiness
endpoints.
