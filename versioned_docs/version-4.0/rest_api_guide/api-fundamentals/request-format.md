---
id: request-format
title: Request Format
description: Reference information for REST API request format in StorageSphere Enterprise.
sidebar_position: 2
---

# Request Format

## Overview

StorageSphere Enterprise REST API requests use HTTPS, standard HTTP headers, JSON request bodies, and query parameters for collection operations. Use the generated API Reference for endpoint-specific request requirements.

## Reference Information

### Common headers

| Header | Required | Description |
|---|---|---|
| `Authorization` | Yes | Bearer token used for authentication |
| `Accept` | Recommended | Expected response format, usually `application/json` |
| `Content-Type` | Required for JSON bodies | Request body format |
| `X-Request-ID` | Recommended | Client-generated correlation ID |

### Example JSON request

```json
{
  "name": "dc1-capacity-review",
  "filters": {
    "site": "DC1",
    "severity": ["warning", "critical"]
  },
  "timeRange": {
    "start": "2026-06-13T00:00:00Z",
    "end": "2026-06-13T23:59:59Z"
  }
}
```

### Request design considerations

| Area | Guidance |
|---|---|
| Dates and times | Use ISO 8601 timestamps and UTC when possible |
| Names | Use stable object identifiers when available |
| Filters | Use query parameters for collection filtering |
| Sensitive values | Do not log tokens, passwords, or secrets |
| Idempotency | Use request IDs or idempotency keys when documented |

::::warning
Never include API tokens, passwords, or private keys in request bodies, URLs, or logs unless the API Reference explicitly defines a secure credential operation.
::::

## Recommendations

- Set `Accept: application/json` for all API requests.
- Use request IDs for troubleshooting.
- Keep request bodies minimal and explicit.
- Validate JSON before sending requests from automation.

## Related Topics

- [Authentication](../getting-started/authentication)
- [Response Format](./response-format)
- [Filtering and Sorting](./filtering-and-sorting)
- [Debugging API Requests](../troubleshooting/debugging-api-requests)
