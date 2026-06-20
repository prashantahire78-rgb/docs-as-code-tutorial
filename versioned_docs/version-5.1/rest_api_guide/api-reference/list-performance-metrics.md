---
id: list-performance-metrics
title: List performance metrics
description: Retrieves performance metrics for storage resources.
sidebar_position: 7
---

# List performance metrics

## Overview

Retrieves performance metrics for storage resources.

## HTTP method and endpoint

```http
GET /performance/metrics
```

## Authentication

This API uses bearer authentication.

```http
Authorization: Bearer <access-token>
```

## Request parameters

| Parameter | Location | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `resourceType` | query | Yes | string | Specifies the resource type for which performance metrics are retrieved. Supported values: `storageSystem`, `pool`, `volume`, `host`. |
| `metric` | query | No | string | Specifies the metric to retrieve. Supported values: `iops`, `throughput`, `latency`, `utilization`. |
| `from` | query | No | string | Start time for the metric query. |
| `to` | query | No | string | End time for the metric query. |

## Request body

This API does not require a request body.

## Response body

| Field | Type | Description |
| --- | --- | --- |
| `items` | array of objects | items returned by the request. |
| `items[].resourceId` | string |  |
| `items[].resourceType` | string |  |
| `items[].metric` | string |  |
| `items[].value` | number |  |
| `items[].unit` | string |  |
| `items[].timestamp` | string | Format: `date-time`. |
| `count` | integer |  |

## Response codes

| Status code | Description |
| --- | --- |
| 200 | Performance metrics retrieved successfully. |
| 400 | One or more query parameters are invalid. |
| 401 | The request is not authenticated. |

## Example request

```bash
curl -X GET "https://api.storagesphere.example.com/v1/performance/metrics" \
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

If the request fails, the API returns `400` (One or more query parameters are invalid). If the request fails, the API returns `401` (The request is not authenticated).

## Related topics

- [API overview](../getting-started/api-overview)
- [Authentication](../getting-started/authentication)
- [Authorization](../getting-started/authorization)
- [Error handling](../api-fundamentals/error-handling)
- [HTTP status codes](../api-fundamentals/http-status-codes)
