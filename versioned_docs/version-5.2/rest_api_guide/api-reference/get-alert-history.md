---
id: get-alert-history
title: Get alert history
description: Retrieves the status change and acknowledgment history for a specific alert.
sidebar_position: 10
---

# Get alert history

## Overview

Retrieves the status change and acknowledgment history for a specific alert.

## HTTP method and endpoint

```http
GET /alerts/{alertId}/history
```

## Authentication

This API uses bearer authentication.

```http
Authorization: Bearer <access-token>
```

## Request parameters

| Parameter | Location | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `alertId` | path | Yes | string | Unique identifier of the alert. |
| `from` | query | No | string | Start time for the history query. |
| `to` | query | No | string | End time for the history query. |

## Request body

This API does not require a request body.

## Response body

| Field | Type | Description |
| --- | --- | --- |
| `alertId` | string |  |
| `items` | array of objects | items returned by the request. |
| `items[].timestamp` | string | Format: `date-time`. |
| `items[].action` | string | Value Supported values: `created`, `acknowledged`, `resolved`, `cleared`, `severityChanged`. |
| `items[].user` | string |  |
| `items[].note` | string |  |
| `count` | integer |  |

## Response codes

| Status code | Description |
| --- | --- |
| 200 | Alert history retrieved successfully. |
| 401 | The request is not authenticated. |
| 403 | The authenticated user does not have permission to view alert history. |
| 404 | The specified alert was not found. |

## Example request

```bash
curl -X GET "https://api.storagesphere.example.com/v1/alerts/alert-001/history" \
  -H "Authorization: Bearer <access-token>" \
  -H "Accept: application/json"
```

## Example response

```json
{
  "alertId": "alert-001",
  "items": [],
  "count": 2
}
```

## Error handling

If the request fails, the API returns `401` (The request is not authenticated). If the request fails, the API returns `403` (The authenticated user does not have permission to view alert history). If the request fails, the API returns `404` (The specified alert was not found).

## Related topics

- [API overview](../getting-started/api-overview)
- [Authentication](../getting-started/authentication)
- [Authorization](../getting-started/authorization)
- [Error handling](../api-fundamentals/error-handling)
- [HTTP status codes](../api-fundamentals/http-status-codes)
