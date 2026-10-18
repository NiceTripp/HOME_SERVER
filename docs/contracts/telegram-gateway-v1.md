# Telegram Gateway Contract v1

Status: draft

This contract defines the boundary between Telegram and HOME_SERVER
application services. Internal services must use this boundary rather than
calling the Telegram Bot API directly.

## Inbound webhook

`POST /telegram/webhook`

The ingress proxy must provide HTTPS. The gateway must verify the Telegram
secret token before parsing or persisting the request. Invalid, unauthorized,
or malformed requests must not be accepted as events.

The route accepts a Telegram `Update` payload. The gateway normalizes accepted
updates into an internal event with:

```json
{
  "eventId": "telegram-update-identifier",
  "updateId": 123456,
  "receivedAt": "2026-10-19T00:00:00.000Z",
  "chat": {
    "id": "-1001234567890",
    "type": "group"
  },
  "sender": {
    "id": "123456789",
    "username": "example"
  },
  "kind": "message",
  "text": "normalized message text"
}
```

`updateId` is the Telegram update identifier and is the primary duplicate
protection key. The same update must not create multiple accepted events or
execute a command more than once.

## Authorization

Authorization is deny-by-default. A request is allowed only when its chat and,
where applicable, sender are present in the gateway's configured allowlist.
Commands must also be explicitly enabled. Authorization failures must not
reveal which allowlist entries exist.

## Outbound message adapter

Internal services submit:

`POST /internal/messages/v1`

Request:

```json
{
  "idempotencyKey": "iot-water-quality-alert-2026-10-19-001",
  "chatId": "-1001234567890",
  "text": "pH threshold exceeded",
  "parseMode": "plain"
}
```

Required fields are `idempotencyKey`, `chatId`, and `text`. The gateway must
reject empty text and unsupported parse modes. The initial version supports
text messages only.

Successful response:

```json
{
  "deliveryId": "delivery-identifier",
  "status": "queued"
}
```

The same `idempotencyKey` must return the existing delivery rather than enqueue
a duplicate. Delivery status is persisted in PostgreSQL.

## Errors

Errors use this shape:

```json
{
  "error": {
    "code": "invalid_request",
    "message": "Request is invalid",
    "requestId": "request-identifier"
  }
}
```

Messages must be safe for clients and must not contain bot tokens, database
credentials, internal stack traces, or allowlist details.

## Retry and delivery

- Webhook processing must acknowledge only after the event has passed
  validation and duplicate protection.
- Telegram API calls use a bounded timeout and bounded retry policy.
- Retryable failures include transport failures and Telegram rate-limit or
  transient server responses.
- Permanent failures become terminal delivery failures and remain inspectable.
- The outbox must make delivery state and retry attempts observable.

Exact timeout, backoff, and retention values are implementation decisions and
must be recorded before the service is marked active.

## Health and readiness

- `GET /health` reports that the process is running.
- `GET /ready` reports whether required PostgreSQL connectivity and startup
  configuration are available.
- Health responses must not expose secrets or database details.

## Versioning

The internal adapter is versioned in its path as `/v1`. Backward-incompatible
changes require a new version. Additive response fields are allowed when
clients ignore unknown fields. Contract changes require updates to this file,
the service map, tests, and an implementation summary.
