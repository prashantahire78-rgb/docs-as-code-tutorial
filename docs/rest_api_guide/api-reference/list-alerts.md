---
id: list-alerts
title: List alerts
description: Retrieves active and historical alerts.
sidebar_position: 8
---

# List alerts

## Overview

Retrieves active and historical alerts.

## HTTP method and endpoint

```http
GET /alerts
```

## Authentication

This API uses bearer authentication.

```http
Authorization: Bearer <access-token>
```

## Request parameters

| Parameter | Location | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `severity` | query | No | string | Filters alerts by severity. Supported values: `critical`, `warning`, `informational`. |
| `status` | query | No | string | Filters alerts by status. Supported values: `active`, `acknowledged`, `resolved`, `cleared`. |
| `resourceId` | query | No | string | Filters alerts by resource identifier. |

## Request body

This API does not require a request body.

## Response body

| Field | Type | Description |
| --- | --- | --- |
| `items` | array of objects | items returned by the request. |
| `items[].id` | string |  |
| `items[].severity` | string | Value Supported values: `critical`, `warning`, `informational`. |
| `items[].status` | string | Value Supported values: `active`, `acknowledged`, `resolved`, `cleared`. |
| `items[].resourceId` | string |  |
| `items[].resourceType` | string |  |
| `items[].message` | string |  |
| `items[].createdAt` | string | Format: `date-time`. |
| `items[].updatedAt` | string | Format: `date-time`. |
| `items[].acknowledgedBy` | string |  |
| `count` | integer |  |

## Response codes

| Status code | Description |
| --- | --- |
| 200 | Alerts retrieved successfully. |
| 401 | The request is not authenticated. |
| 403 | The authenticated user does not have permission to view alerts. |

## Example request

```bash
curl -X GET "https://api.storagesphere.example.com/v1/alerts" \
  -H "Authorization: Bearer <access-token>" \
  -H "Accept: application/json"
```

## Example response

```json
{
  "items": [],
  "count": 1
}
```

## Error handling

If the request fails, the API returns `401` (The request is not authenticated). If the request fails, the API returns `403` (The authenticated user does not have permission to view alerts).

## Related topics

- [API overview](../getting-started/api-overview)
- [Authentication](../getting-started/authentication)
- [Authorization](../getting-started/authorization)
- [Error handling](../api-fundamentals/error-handling)
- [HTTP status codes](../api-fundamentals/http-status-codes)
