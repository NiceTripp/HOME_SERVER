# Initial Data Flow

```text
Telegram
  -> Traefik (HTTPS/TLS ingress)
  -> telegram-gateway (verify, normalize, authorize)
  -> PostgreSQL (event and delivery state)

IoT water-quality service
  -> telegram-gateway internal message contract
  -> Telegram
```

The gateway is the boundary between external Telegram updates and internal
application services. Future services must use its documented adapter contract
instead of calling Telegram directly.
