---
id: list-reports
title: List reports
description: Retrieves the list of available reports.
sidebar_position: 11
---

# List reports

## Overview

Retrieves the list of available reports.

## HTTP method and endpoint

```http
GET /reports
```

## Authentication

This API uses bearer authentication.

```http
Authorization: Bearer <access-token>
```

## Request parameters

| Parameter | Location | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `category` | query | No | string | Filters reports by category. Supported values: `capacity`, `performance`, `health`, `inventory`, `alerts`, `audit`. |

## Request body

This API does not require a request body.

## Response body

| Field | Type | Description |
| --- | --- | --- |
| `items` | array of objects | items returned by the request. |
| `items[].id` | string |  |
| `items[].name` | string |  |
| `items[].category` | string | Value Supported values: `capacity`, `performance`, `health`, `inventory`, `alerts`, `audit`. |
| `items[].description` | string |  |
| `items[].supportedFormats` | array of strings |  |
| `count` | integer |  |

## Response codes

| Status code | Description |
| --- | --- |
| 200 | Reports retrieved successfully. |
| 401 | The request is not authenticated. |
| 403 | The authenticated user does not have permission to view reports. |

## Example request

```bash
curl -X GET "https://api.storagesphere.example.com/v1/reports" \
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

If the request fails, the API returns `401` (The request is not authenticated). If the request fails, the API returns `403` (The authenticated user does not have permission to view reports).

## Related topics

- [API overview](../getting-started/api-overview)
- [Authentication](../getting-started/authentication)
- [Authorization](../getting-started/authorization)
- [Error handling](../api-fundamentals/error-handling)
- [HTTP status codes](../api-fundamentals/http-status-codes)
