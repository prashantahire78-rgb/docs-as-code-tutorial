---
id: start-storage-discovery
title: Start storage discovery
description: Starts a storage discovery job for a specified storage system.
sidebar_position: 5
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
| --- | --- | --- | --- |
| `storageSystemId` | Yes | string |  |
| `discoveryType` | Yes | string |  Supported values: `full`, `incremental`, `inventoryOnly`. |
| `enablePerformanceMonitoring` | No | boolean |  |

## Response body

| Field | Type | Description |
| --- | --- | --- |
| `jobId` | string |  |
| `status` | string |  |
| `message` | string |  |

## Response codes

| Status code | Description |
| --- | --- |
| 202 | Storage discovery job accepted. |
| 400 | The discovery request is invalid. |
| 401 | The request is not authenticated. |
| 404 | The specified storage system was not found. |

## Example request

```bash
curl -X POST "https://api.storagesphere.example.com/v1/storage-discovery/jobs" \
  -H "Authorization: Bearer <access-token>" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{,
  "storageSystemId": "ss-001",,
  "discoveryType": "full",,
  "enablePerformanceMonitoring": true,
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

If the request fails, the API returns `400` (The discovery request is invalid). If the request fails, the API returns `401` (The request is not authenticated). If the request fails, the API returns `404` (The specified storage system was not found).

## Related topics

- [API overview](../getting-started/api-overview)
- [Authentication](../getting-started/authentication)
- [Authorization](../getting-started/authorization)
- [Error handling](../api-fundamentals/error-handling)
- [HTTP status codes](../api-fundamentals/http-status-codes)
