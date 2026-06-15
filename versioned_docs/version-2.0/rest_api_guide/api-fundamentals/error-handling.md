---
id: error-handling
title: Error Handling
description: Reference information for REST API error handling in StorageSphere Enterprise 2.0.
sidebar_position: 7
---

# Error Handling

## Overview

StorageSphere Enterprise REST APIs return standard HTTP status codes and JSON error bodies for failed requests. API clients should handle authentication, authorization, validation, rate-limit, and service errors consistently.

## Reference Information

### Example error response

```json
{
  "error": {
    "code": "validation_failed",
    "message": "The request contains one or more invalid fields.",
    "details": [
      {
        "field": "timeRange.start",
        "reason": "Start time must be before end time."
      }
    ]
  },
  "requestId": "5dd4f270-91fc-4c9f-85b4-f7e7c179d725"
}
```

### Common error categories

| Category | Typical status | Client action |
|---|---|---|
| Authentication | `401` | Refresh or replace token |
| Authorization | `403` | Request correct role or permission |
| Validation | `400` or `422` | Correct request parameters or body |
| Not found | `404` | Confirm resource ID and access scope |
| Conflict | `409` | Refresh state and retry only if safe |
| Rate limit | `429` | Wait and retry with backoff |
| Service error | `5xx` | Retry later or escalate with request ID |

::::tip
Log the HTTP status code, error code, request ID, and timestamp. Do not log API tokens or sensitive request payloads.
::::

## Recommendations

- Treat `4xx` responses as client, permission, or request issues.
- Treat `5xx` responses as service or dependency issues.
- Retry only idempotent operations unless the API Reference documents safe retry behavior.
- Surface clear error messages to operators without exposing secrets.

## Related Topics

- [HTTP Status Codes](./http-status-codes)
- [Rate Limiting](./rate-limiting)
- [Debugging API Requests](../troubleshooting/debugging-api-requests)
- [Common API Errors](../troubleshooting/common-api-errors)
