---
id: generate-a-report
title: Generate a report
description: Starts report generation.
sidebar_position: 14
---

# Generate a report

## Overview

Starts report generation.

## HTTP method and endpoint

```http
POST /reports/generation-jobs
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
| `reportId` | Yes | string |  |
| `format` | Yes | string |  Supported values: `pdf`, `csv`, `json`. |
| `from` | No | string |  |
| `to` | No | string |  |
| `filters` | No | object |  |

## Response body

| Field | Type | Description |
| --- | --- | --- |
| `jobId` | string |  |
| `status` | string |  |
| `message` | string |  |

## Response codes

| Status code | Description |
| --- | --- |
| 202 | Report generation job accepted. |
| 400 | The report generation request is invalid. |
| 401 | The request is not authenticated. |
| 403 | The authenticated user does not have permission to generate reports. |
| 404 | The specified report was not found. |

## Example request

```bash
curl -X POST "https://api.storagesphere.example.com/v1/reports/generation-jobs" \
  -H "Authorization: Bearer <access-token>" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{,
  "reportId": "report-capacity-summary",,
  "format": "pdf",,
  "from": "2026-06-01T00:00:00Z",,
  "to": "2026-06-13T23:59:59Z",,
  "filters": {,
    "site": "Pune-DC1",
  },
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

If the request fails, the API returns `400` (The report generation request is invalid). If the request fails, the API returns `401` (The request is not authenticated). If the request fails, the API returns `403` (The authenticated user does not have permission to generate reports). If the request fails, the API returns `404` (The specified report was not found).

## Related topics

- [API overview](../getting-started/api-overview)
- [Authentication](../getting-started/authentication)
- [Authorization](../getting-started/authorization)
- [Error handling](../api-fundamentals/error-handling)
- [HTTP status codes](../api-fundamentals/http-status-codes)
