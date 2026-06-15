---
id: list-reports
title: List reports
description: Retrieves the list of available reports.
sidebar_position: 10
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
| --------- | -------- | -------: | ---- | ----------- |
| `category` | query | No | string | Filters reports by category. Supported values: `capacity`, `performance`, `health`, `inventory`, `alerts`, `audit`. |

## Request body

This API does not require a request body.

## Response body

| Field | Type | Description |
| ----- | ---- | ----------- |
| `items` | array of objects | Reports returned by the request. |
| `items[].id` | string | Report identifier. |
| `items[].name` | string | Report name. |
| `items[].category` | string | Report category. Supported values: `capacity`, `performance`, `health`, `inventory`, `alerts`, `audit`. |
| `items[].description` | string | Report description. |
| `items[].supportedFormats` | array of strings | Supported report output formats. Supported values: `pdf`, `csv`, `json`. |
| `count` | integer | Number of reports returned. |

## Response codes

| Status code | Description |
| ----------: | ----------- |
| 200 | Reports retrieved successfully. |
| 401 | The request is not authenticated. |
| 403 | The authenticated user does not have permission to view reports. |

## Example request

```bash
curl -X GET "https://api.storagesphere.example.com/v1/reports?category=capacity" \
  -H "Authorization: Bearer <access-token>" \
  -H "Accept: application/json"
```

## Example response

```json
{
  "items": [
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
  ],
  "count": 1
}
```

## Error handling

If the request is not authenticated, the API returns `401`. If the authenticated user does not have permission to view reports, the API returns `403`.

## Related topics

- [API overview](../getting-started/api-overview)
- [Authentication](../getting-started/authentication)
- [Authorization](../getting-started/authorization)
- [Generate reports](../common-workflows/generate-reports)
- [Filtering and sorting](../api-fundamentals/filtering-and-sorting)
