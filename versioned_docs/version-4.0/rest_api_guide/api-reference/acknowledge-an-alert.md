---
id: acknowledge-an-alert
title: Acknowledge an alert
description: Acknowledges a selected alert.
sidebar_position: 9
---

# Acknowledge an alert

## Overview

Acknowledges a selected alert.

## HTTP method and endpoint

```http
POST /alerts/{alertId}/acknowledge
```

## Authentication

This API uses bearer authentication.

```http
Authorization: Bearer <access-token>
```

## Request parameters

| Parameter | Location | Required | Type | Description |
| --------- | -------- | -------: | ---- | ----------- |
| `alertId` | path | Yes | string | Unique identifier of the alert. |

## Request body

| Field | Required | Type | Description |
| ----- | -------: | ---- | ----------- |
| `note` | No | string | Note for the alert acknowledgment. |

## Response body

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | string | Alert identifier. |
| `severity` | string | Alert severity. Supported values: `critical`, `warning`, `informational`. |
| `status` | string | Alert status. Supported values: `active`, `acknowledged`, `resolved`, `cleared`. |
| `resourceId` | string | Resource identifier associated with the alert. |
| `resourceType` | string | Resource type associated with the alert. |
| `message` | string | Alert message. |
| `createdAt` | string | Alert creation timestamp. Format: `date-time`. |
| `updatedAt` | string | Alert update timestamp. Format: `date-time`. |
| `acknowledgedBy` | string | User who acknowledged the alert. |

## Response codes

| Status code | Description |
| ----------: | ----------- |
| 200 | Alert acknowledged successfully. |
| 400 | The acknowledge request is invalid. |
| 401 | The request is not authenticated. |
| 403 | The authenticated user does not have permission to acknowledge alerts. |
| 404 | The specified alert was not found. |

## Example request

```bash
curl -X POST "https://api.storagesphere.example.com/v1/alerts/alert-001/acknowledge" \
  -H "Authorization: Bearer <access-token>" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "note": "Investigating the storage pool utilization warning."
  }'
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

If the acknowledge request is invalid, the API returns `400`. If the request is not authenticated, the API returns `401`. If the authenticated user does not have permission to acknowledge alerts, the API returns `403`. If the specified alert is not found, the API returns `404`.

## Related topics

- [API overview](../getting-started/api-overview)
- [Authentication](../getting-started/authentication)
- [Authorization](../getting-started/authorization)
- [List alerts](./list-alerts)
- [HTTP status codes](../api-fundamentals/http-status-codes)
