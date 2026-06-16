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
| --------- | -------- | -------: | ---- | ----------- |
| `severity` | query | No | string | Filters alerts by severity. Supported values: `critical`, `warning`, `informational`. |
| `status` | query | No | string | Filters alerts by status. Supported values: `active`, `acknowledged`, `resolved`, `cleared`. |
| `resourceId` | query | No | string | Filters alerts by resource identifier. |

## Request body

This API does not require a request body.

## Response body

| Field | Type | Description |
| ----- | ---- | ----------- |
| `items` | array of objects | Alerts returned by the request. |
| `items[].id` | string | Alert identifier. |
| `items[].severity` | string | Alert severity. Supported values: `critical`, `warning`, `informational`. |
| `items[].status` | string | Alert status. Supported values: `active`, `acknowledged`, `resolved`, `cleared`. |
| `items[].resourceId` | string | Resource identifier associated with the alert. |
| `items[].resourceType` | string | Resource type associated with the alert. |
| `items[].message` | string | Alert message. |
| `items[].createdAt` | string | Alert creation timestamp. Format: `date-time`. |
| `items[].updatedAt` | string | Alert update timestamp. Format: `date-time`. |
| `items[].acknowledgedBy` | string | User who acknowledged the alert. |
| `count` | integer | Number of alerts returned. |

## Response codes

| Status code | Description |
| ----------: | ----------- |
| 200 | Alerts retrieved successfully. |
| 401 | The request is not authenticated. |
| 403 | The authenticated user does not have permission to view alerts. |

## Example request

```bash
curl -X GET "https://api.storagesphere.example.com/v1/alerts?severity=warning&status=active&resourceId=ss-001" \
  -H "Authorization: Bearer <access-token>" \
  -H "Accept: application/json"
```

## Example response

```json
{
  "items": [
    {
      "id": "alert-001",
      "severity": "warning",
      "status": "active",
      "resourceId": "ss-001",
      "resourceType": "storageSystem",
      "message": "Storage pool utilization exceeded warning threshold.",
      "createdAt": "2026-06-13T09:30:00Z",
      "updatedAt": "2026-06-13T10:00:00Z",
      "acknowledgedBy": "storage-operator"
    }
  ],
  "count": 1
}
```

## Error handling

If the request is not authenticated, the API returns `401`. If the authenticated user does not have permission to view alerts, the API returns `403`.

## Related topics

- [API overview](../getting-started/api-overview)
- [Authentication](../getting-started/authentication)
- [Authorization](../getting-started/authorization)
- [Manage alerts](../common-workflows/manage-alerts)
- [Error handling](../api-fundamentals/error-handling)
