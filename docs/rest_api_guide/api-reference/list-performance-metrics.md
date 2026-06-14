---
id: list-performance-metrics
title: List performance metrics
description: Retrieves performance metrics for storage resources.
sidebar_position: 6
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
| --------- | -------- | -------: | ---- | ----------- |
| `resourceType` | query | Yes | string | Specifies the resource type for which performance metrics are retrieved. Supported values: `storageSystem`, `pool`, `volume`, `host`. |
| `metric` | query | No | string | Specifies the metric to retrieve. Supported values: `iops`, `throughput`, `latency`, `utilization`. |
| `from` | query | No | string | Start time for the metric query. Format: `date-time`. |
| `to` | query | No | string | End time for the metric query. Format: `date-time`. |

## Request body

This API does not require a request body.

## Response body

| Field | Type | Description |
| ----- | ---- | ----------- |
| `items` | array of objects | Performance metrics returned by the request. |
| `items[].resourceId` | string | Resource identifier. |
| `items[].resourceType` | string | Resource type. |
| `items[].metric` | string | Metric name. |
| `items[].value` | number | Metric value. |
| `items[].unit` | string | Metric unit. |
| `items[].timestamp` | string | Metric timestamp. Format: `date-time`. |
| `count` | integer | Number of performance metrics returned. |

## Response codes

| Status code | Description |
| ----------: | ----------- |
| 200 | Performance metrics retrieved successfully. |
| 400 | One or more query parameters are invalid. |
| 401 | The request is not authenticated. |

## Example request

```bash
curl -X GET "https://api.storagesphere.example.com/v1/performance/metrics?resourceType=volume&metric=latency&from=2026-06-13T10:00:00Z&to=2026-06-13T11:00:00Z" \
  -H "Authorization: Bearer <access-token>" \
  -H "Accept: application/json"
```

## Example response

```json
{
  "items": [
    {
      "resourceId": "vol-001",
      "resourceType": "volume",
      "metric": "latency",
      "value": 2.4,
      "unit": "ms",
      "timestamp": "2026-06-13T10:15:00Z"
    }
  ],
  "count": 1
}
```

## Error handling

If one or more query parameters are invalid, the API returns `400`. If the request is not authenticated, the API returns `401`.

## Related topics

- [API overview](../getting-started/api-overview)
- [Authentication](../getting-started/authentication)
- [Filtering and sorting](../api-fundamentals/filtering-and-sorting)
- [Monitor performance](../common-workflows/monitor-performance)
- [Error handling](../api-fundamentals/error-handling)
