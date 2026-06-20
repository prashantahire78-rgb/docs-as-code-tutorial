---
id: list-storage-systems
title: List storage systems
description: Retrieves the list of storage systems managed by StorageSphere Enterprise.
sidebar_position: 3
---

# List storage systems

## Overview

Retrieves the list of storage systems managed by StorageSphere Enterprise.

## HTTP method and endpoint

```http
GET /storage-systems
```

## Authentication

This API uses bearer authentication.

```http
Authorization: Bearer <access-token>
```

## Request parameters

| Parameter | Location | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `vendor` | query | No | string | Filters storage systems by vendor. |
| `status` | query | No | string | Filters storage systems by status. Supported values: `managed`, `monitored`, `warning`, `critical`. |

## Request body

This API does not require a request body.

## Response body

| Field | Type | Description |
| --- | --- | --- |
| `items` | array of objects | items returned by the request. |
| `items[].id` | string |  |
| `items[].name` | string |  |
| `items[].vendor` | string |  |
| `items[].model` | string |  |
| `items[].status` | string |  |
| `items[].site` | string |  |
| `count` | integer |  |

## Response codes

| Status code | Description |
| --- | --- |
| 200 | Storage systems retrieved successfully. |
| 401 | The request is not authenticated. |
| 403 | The authenticated user does not have permission to view storage systems. |

## Example request

```bash
curl -X GET "https://api.storagesphere.example.com/v1/storage-systems" \
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

If the request fails, the API returns `401` (The request is not authenticated). If the request fails, the API returns `403` (The authenticated user does not have permission to view storage systems).

## Related topics

- [API overview](../getting-started/api-overview)
- [Authentication](../getting-started/authentication)
- [Authorization](../getting-started/authorization)
- [Error handling](../api-fundamentals/error-handling)
- [HTTP status codes](../api-fundamentals/http-status-codes)
