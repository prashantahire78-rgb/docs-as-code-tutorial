---
id: http-status-codes
title: HTTP Status Codes
description: Reference information for HTTP status codes used by StorageSphere Enterprise 2.0 REST APIs.
sidebar_position: 8
---

# HTTP Status Codes

## Overview

StorageSphere Enterprise REST APIs use standard HTTP status codes to indicate request results. Use the status code with the response body to determine the correct client action.

## Reference Information

| Status code | Meaning | Typical action |
|---|---|---|
| `200 OK` | Request succeeded | Process response |
| `201 Created` | Resource was created | Store returned resource ID |
| `202 Accepted` | Request accepted for asynchronous processing | Monitor returned job or task |
| `204 No Content` | Request succeeded with no body | Continue workflow |
| `400 Bad Request` | Request syntax or parameters are invalid | Correct request |
| `401 Unauthorized` | Token is missing, invalid, or expired | Authenticate again |
| `403 Forbidden` | Caller lacks permission | Review RBAC |
| `404 Not Found` | Resource does not exist or is outside access scope | Confirm ID and permissions |
| `409 Conflict` | Request conflicts with current resource state | Refresh state |
| `422 Unprocessable Entity` | Request is valid JSON but fails validation | Correct field values |
| `429 Too Many Requests` | Rate limit exceeded | Retry after delay |
| `500 Internal Server Error` | Unexpected service error | Retry later or escalate |
| `503 Service Unavailable` | Service or dependency unavailable | Retry later and check system health |

::::note
A `404 Not Found` response can mean the resource does not exist or the caller is not authorized to view it, depending on security policy.
::::

## Recommendations

- Do not parse only the error message. Use the status code and error code together.
- Treat `202 Accepted` as an asynchronous workflow and monitor completion separately.
- Use request IDs when escalating `5xx` errors.
- Review audit logs for repeated `401` or `403` responses.

## Related Topics

- [Error Handling](./error-handling)
- [Authorization](../getting-started/authorization)
- [Rate Limiting](./rate-limiting)
- [Monitoring System Health](../../installation_and_configuration_guide/maintenance/monitoring-system-health)
