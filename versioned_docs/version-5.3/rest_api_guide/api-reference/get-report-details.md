---
id: get-report-details
title: Get report details
description: Retrieves metadata and supported formats for a specific report definition.
sidebar_position: 14
---

# Get report details

## Overview

Retrieves metadata and supported formats for a specific report definition.

## HTTP method and endpoint

```http
GET /reports/{reportId}
```

## Authentication

This API uses bearer authentication.

```http
Authorization: Bearer <access-token>
```

## Request parameters

| Parameter | Location | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `reportId` | path | Yes | string | Unique identifier of the report. |

## Request body

This API does not require a request body.

## Response body

| Field | Type | Description |
| --- | --- | --- |
| `id` | string |  |
| `name` | string |  |
| `category` | string | Value Supported values: `capacity`, `performance`, `health`, `inventory`, `alerts`, `audit`. |
| `description` | string |  |
| `supportedFormats` | array of strings |  Supported values: `pdf`, `csv`, `json`. |

## Response codes

| Status code | Description |
| --- | --- |
| 200 | Report details retrieved successfully. |
| 401 | The request is not authenticated. |
| 403 | The authenticated user does not have permission to view report details. |
| 404 | The specified report was not found. |

## Example request

```bash
curl -X GET "https://api.storagesphere.example.com/v1/reports/report-capacity-summary" \
  -H "Authorization: Bearer <access-token>" \
  -H "Accept: application/json"
```

## Example response

```json
{
  "id": "report-capacity-summary",
  "name": "Capacity Summary",
  "category": "capacity",
  "description": "Summarizes storage capacity usage by system and pool.",
  "supportedFormats": [
    "pdf",
    "csv"
  ]
}
```

## Error handling

If the request fails, the API returns `401` (The request is not authenticated). If the request fails, the API returns `403` (The authenticated user does not have permission to view report details). If the request fails, the API returns `404` (The specified report was not found).

## Related topics

- [API overview](../getting-started/api-overview)
- [Authentication](../getting-started/authentication)
- [Authorization](../getting-started/authorization)
- [Error handling](../api-fundamentals/error-handling)
- [HTTP status codes](../api-fundamentals/http-status-codes)
