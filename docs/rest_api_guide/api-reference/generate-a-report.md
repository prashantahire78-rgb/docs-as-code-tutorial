---
id: generate-a-report
title: Generate a report
description: Starts report generation.
sidebar_position: 11
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
| ----- | -------: | ---- | ----------- |
| `reportId` | Yes | string | Report identifier. |
| `format` | Yes | string | Report output format. Supported values: `pdf`, `csv`, `json`. |
| `from` | No | string | Report start time. Format: `date-time`. |
| `to` | No | string | Report end time. Format: `date-time`. |
| `filters` | No | object | Report filters as string key-value pairs. |

## Response body

| Field | Type | Description |
| ----- | ---- | ----------- |
| `jobId` | string | Report generation job identifier. |
| `status` | string | Report generation job status. |
| `message` | string | Report generation job message. |

## Response codes

| Status code | Description |
| ----------: | ----------- |
| 202 | Report generation job accepted. |
| 400 | The report generation request is invalid. |
| 401 | The request is not authenticated. |
| 403 | The authenticated user does not have permission to generate reports. |
| 404 | The specified report was not found. |

## Example request

```bash
curl -X POST "https://api.storagesphere.example.com/v1/reports/generation-jobs" \
  -H "Authorization: Bearer <access-token>" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "reportId": "report-capacity-summary",
    "format": "pdf",
    "from": "2026-06-01T00:00:00Z",
    "to": "2026-06-13T23:59:59Z",
    "filters": {
      "site": "Pune-DC1"
    }
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

If the report generation request is invalid, the API returns `400`. If the request is not authenticated, the API returns `401`. If the authenticated user does not have permission to generate reports, the API returns `403`. If the specified report is not found, the API returns `404`.

## Related topics

- [API overview](../getting-started/api-overview)
- [Authentication](../getting-started/authentication)
- [Authorization](../getting-started/authorization)
- [List reports](./list-reports)
- [Get job status](./get-job-status)
