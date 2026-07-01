---
id: rate-limiting
title: Rate Limiting
description: Reference information for REST API rate limiting in StorageSphere Enterprise.
sidebar_position: 6
---

# Rate Limiting

## Overview

StorageSphere Enterprise REST APIs can limit request rates to protect the management server, database, collectors, and storage platform integrations. API clients must handle rate-limit responses and retry safely.

## Reference Information

### Common rate-limit indicators

| Indicator | Description |
|---|---|
| `429 Too Many Requests` | Client exceeded the allowed request rate |
| `Retry-After` | Time to wait before sending another request |
| Rate-limit headers | Remaining quota or reset time, when supported |
| Request ID | Correlation value for support and logs |

### Example rate-limit response

```json
{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Request rate limit exceeded. Retry after the specified interval.",
    "retryAfterSeconds": 30
  },
  "requestId": "a2e26f84-88b1-4f17-a81d-865c6d19d315"
}
```

## Recommendations

- Use exponential backoff for retries.
- Honor `Retry-After` when returned.
- Cache stable inventory data where appropriate.
- Avoid polling high-cardinality metrics more frequently than needed.
- Schedule large exports outside peak operations windows.
- Use separate service accounts for independent integrations.

::::warning
Do not retry failed requests in a tight loop. Aggressive retry behavior can increase load and delay recovery during incidents.
::::

## Related Topics

- [Error Handling](./error-handling)
- [HTTP Status Codes](./http-status-codes)
- [API Best Practices](./api-best-practices)
- [Monitoring System Health](../../installation_and_configuration_guide/maintenance/monitoring-system-health)
