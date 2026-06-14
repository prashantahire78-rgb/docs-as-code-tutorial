---
id: common-api-errors
title: Common API Errors
description: Reference information for common StorageSphere Enterprise 2.0 REST API errors.
sidebar_position: 1
---

# Common API Errors

## Overview

This topic provides reference information for common StorageSphere Enterprise REST API errors. Use it to identify likely causes and corrective actions before escalating an integration issue.

## Reference Information

| Symptom | Likely cause | Corrective action |
|---|---|---|
| `401 Unauthorized` | Missing, expired, malformed, or revoked token | Replace token and confirm authorization header |
| `403 Forbidden` | Token lacks required role or permission | Review RBAC assignment |
| `404 Not Found` | Resource ID is wrong or outside access scope | Confirm resource ID and permissions |
| `409 Conflict` | Resource state changed during workflow | Refresh resource and retry if safe |
| `422 Unprocessable Entity` | JSON is valid but field values fail validation | Correct request fields |
| `429 Too Many Requests` | Client exceeded rate limit | Honor retry interval and reduce request rate |
| `500` or `503` | Service or dependency error | Retry later and check system health |

### Example validation error

```json
{
  "error": {
    "code": "invalid_filter",
    "message": "The requested filter is not supported for this collection."
  },
  "requestId": "c4bb00aa-a3a5-46a4-9c2b-76b6421ff15a"
}
```

## Recommendations

- Check authentication and authorization before changing request logic.
- Use the request ID when reviewing logs or contacting support.
- Confirm that the request matches the API version you are using.
- Test with a narrow query before running broad automation.

## Related Topics

- [Error Handling](../api-fundamentals/error-handling)
- [HTTP Status Codes](../api-fundamentals/http-status-codes)
- [Debugging API Requests](./debugging-api-requests)
- [Authorization](../getting-started/authorization)
