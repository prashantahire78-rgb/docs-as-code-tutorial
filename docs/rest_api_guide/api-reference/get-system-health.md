---
id: get-system-health
title: Get system health
description: Retrieves the current health status of StorageSphere Enterprise components.
sidebar_position: 5
---

# Get system health

## Overview

Retrieves the current health status of StorageSphere Enterprise components.

## HTTP method and endpoint

```http
GET /system/health
```

## Authentication

This API uses bearer authentication.

```http
Authorization: Bearer <access-token>
```

## Request parameters

This API does not use request parameters.

## Request body

This API does not require a request body.

## Response body

| Field | Type | Description |
| ----- | ---- | ----------- |
| `overallStatus` | string | Overall system health status. Supported values: `healthy`, `warning`, `critical`, `maintenance`. |
| `managementServer` | string | Management server health status. |
| `database` | string | Database connection status. |
| `collectors` | string | Collector health status. |
| `activeAlerts` | integer | Number of active alerts. |

## Response codes

| Status code | Description |
| ----------: | ----------- |
| 200 | System health retrieved successfully. |
| 401 | The request is not authenticated. |
| 403 | The authenticated user does not have permission to view system health. |

## Example request

```bash
curl -X GET "https://api.storagesphere.example.com/v1/system/health" \
  -H "Authorization: Bearer <access-token>" \
  -H "Accept: application/json"
```

## Example response

```json
{
  "overallStatus": "healthy",
  "managementServer": "healthy",
  "database": "connected",
  "collectors": "healthy",
  "activeAlerts": 2
}
```

## Error handling

If the request is not authenticated, the API returns `401`. If the authenticated user does not have permission to view system health, the API returns `403`.

## Related topics

- [API overview](../getting-started/api-overview)
- [Authentication](../getting-started/authentication)
- [Authorization](../getting-started/authorization)
- [HTTP status codes](../api-fundamentals/http-status-codes)
- [API best practices](../api-fundamentals/api-best-practices)
