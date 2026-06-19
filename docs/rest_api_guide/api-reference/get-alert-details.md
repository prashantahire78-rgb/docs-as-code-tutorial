---
id: get-alert-details
title: Get alert details
description: Retrieves detailed information about a specific alert, including severity, status, resource context, and acknowledgment history.
sidebar_position: 9
---

# Get alert details

## Overview

Retrieves detailed information about a specific alert, including severity, status, resource context, and acknowledgment history.

## HTTP method and endpoint

```http
GET /alerts/{alertId}
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

## Request body

This API does not require a request body.

## Response body

| Field | Type | Description |
| --- | --- | --- |
| `id` | string |  |
| `severity` | string | Value Supported values: `critical`, `warning`, `informational`. |
| `status` | string | Value Supported values: `active`, `acknowledged`, `resolved`, `cleared`. |
| `resourceId` | string |  |
| `resourceType` | string |  |
| `message` | string |  |
| `createdAt` | string | Format: `date-time`. |
| `updatedAt` | string | Format: `date-time`. |
| `acknowledgedBy` | string |  |

## Response codes

| Status code | Description |
| --- | --- |
| 200 | Alert details retrieved successfully. |
| 401 | The request is not authenticated. |
| 403 | The authenticated user does not have permission to view alert details. |
| 404 | The specified alert was not found. |

## Example request

```bash
curl -X GET "https://api.storagesphere.example.com/v1/alerts/alert-001" \
  -H "Authorization: Bearer <access-token>" \
  -H "Accept: application/json"
```

## Example response

```json
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
```

## Error handling

If the request fails, the API returns `401` (The request is not authenticated). If the request fails, the API returns `403` (The authenticated user does not have permission to view alert details). If the request fails, the API returns `404` (The specified alert was not found).

## Related topics

- [API overview](../getting-started/api-overview)
- [Authentication](../getting-started/authentication)
- [Authorization](../getting-started/authorization)
- [Error handling](../api-fundamentals/error-handling)
- [HTTP status codes](../api-fundamentals/http-status-codes)
