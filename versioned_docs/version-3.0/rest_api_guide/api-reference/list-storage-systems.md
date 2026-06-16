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
| --------- | -------- | -------: | ---- | ----------- |
| `vendor` | query | No | string | Filters storage systems by vendor. |
| `status` | query | No | string | Filters storage systems by status. Supported values: `managed`, `monitored`, `warning`, `critical`. |

## Request body

This API does not require a request body.

## Response body

| Field | Type | Description |
| ----- | ---- | ----------- |
| `items` | array of objects | Storage systems returned by the request. |
| `items[].id` | string | Storage system identifier. |
| `items[].name` | string | Storage system name. |
| `items[].vendor` | string | Storage system vendor. |
| `items[].model` | string | Storage system model. |
| `items[].status` | string | Storage system status. |
| `items[].site` | string | Storage system site. |
| `count` | integer | Number of storage systems returned. |

## Response codes

| Status code | Description |
| ----------: | ----------- |
| 200 | Storage systems retrieved successfully. |
| 401 | The request is not authenticated. |
| 403 | The authenticated user does not have permission to view storage systems. |

## Example request

```bash
curl -X GET "https://api.storagesphere.example.com/v1/storage-systems?vendor=Hitachi&status=monitored" \
  -H "Authorization: Bearer <access-token>" \
  -H "Accept: application/json"
```

## Example response

```json
{
  "items": [
    {
      "id": "ss-001",
      "name": "vsp-5000-prod",
      "vendor": "Hitachi",
      "model": "VSP 5000",
      "status": "monitored",
      "site": "Pune-DC1"
    }
  ],
  "count": 1
}
```

## Error handling

If the request is not authenticated, the API returns `401`. If the authenticated user does not have permission to view storage systems, the API returns `403`.

## Related topics

- [API overview](../getting-started/api-overview)
- [Authentication](../getting-started/authentication)
- [Authorization](../getting-started/authorization)
- [Filtering and sorting](../api-fundamentals/filtering-and-sorting)
- [HTTP status codes](../api-fundamentals/http-status-codes)
