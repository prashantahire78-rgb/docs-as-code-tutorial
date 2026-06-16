---
id: start-storage-discovery
title: Start storage discovery
description: Starts a storage discovery job for a specified storage system.
sidebar_position: 4
---

# Start storage discovery

## Overview

Starts a storage discovery job for a specified storage system.

## HTTP method and endpoint

```http
POST /storage-discovery/jobs
```

## Authentication

This API uses bearer authentication.

```http
Authorization: Bearer <access-token>
```

## Request parameters

This API does not use request parameters.

## Request body

| Field | Required | Type | Description |
| ----- | -------: | ---- | ----------- |
| `storageSystemId` | Yes | string | Storage system identifier. |
| `discoveryType` | Yes | string | Discovery type. Supported values: `full`, `incremental`, `inventoryOnly`. |
| `enablePerformanceMonitoring` | No | boolean | Indicates whether performance monitoring is enabled. |

## Response body

| Field | Type | Description |
| ----- | ---- | ----------- |
| `jobId` | string | Discovery job identifier. |
| `status` | string | Discovery job status. |
| `message` | string | Discovery job message. |

## Response codes

| Status code | Description |
| ----------: | ----------- |
| 202 | Storage discovery job accepted. |
| 400 | The discovery request is invalid. |
| 401 | The request is not authenticated. |
| 404 | The specified storage system was not found. |

## Example request

```bash
curl -X POST "https://api.storagesphere.example.com/v1/storage-discovery/jobs" \
  -H "Authorization: Bearer <access-token>" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "storageSystemId": "ss-001",
    "discoveryType": "full",
    "enablePerformanceMonitoring": true
  }'
```

## Example response

```json
{
  "jobId": "DISC-20260613-00042",
  "status": "queued",
  "message": "Discovery job accepted."
}
```

## Error handling

If the discovery request is invalid, the API returns `400`. If the request is not authenticated, the API returns `401`. If the specified storage system is not found, the API returns `404`.

## Related topics

- [API overview](../getting-started/api-overview)
- [Authentication](../getting-started/authentication)
- [Authorization](../getting-started/authorization)
- [Discover storage systems](../common-workflows/discover-storage-systems)
- [Error handling](../api-fundamentals/error-handling)
