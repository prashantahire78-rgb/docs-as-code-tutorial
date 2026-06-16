---
id: get-storage-system-details
title: Get storage system details
description: Retrieves detailed information about a specific storage system.
sidebar_position: 7
---

# Get storage system details

## Overview

Retrieves detailed information about a specific storage system.

## HTTP method and endpoint

```http
GET /storage-systems/{storageSystemId}
```

## Authentication

This API uses bearer authentication.

```http
Authorization: Bearer <access-token>
```

## Request parameters

| Parameter | Location | Required | Type | Description |
| --------- | -------- | -------: | ---- | ----------- |
| `storageSystemId` | path | Yes | string | Unique identifier of the storage system. |

## Request body

This API does not require a request body.

## Response body

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | string | Storage system identifier. |
| `name` | string | Storage system name. |
| `vendor` | string | Storage system vendor. |
| `model` | string | Storage system model. |
| `status` | string | Storage system status. |
| `site` | string | Storage system site. |
| `serialNumber` | string | Storage system serial number. |
| `managementAddress` | string | Storage system management address. |
| `firmwareVersion` | string | Storage system firmware version. |
| `totalCapacityTiB` | number | Total storage capacity in TiB. |
| `usedCapacityTiB` | number | Used storage capacity in TiB. |
| `lastDiscoveryTime` | string | Last discovery timestamp. Format: `date-time`. |

## Response codes

| Status code | Description |
| ----------: | ----------- |
| 200 | Storage system details retrieved successfully. |
| 401 | The request is not authenticated. |
| 403 | The authenticated user does not have permission to view storage system details. |
| 404 | The specified storage system was not found. |

## Example request

```bash
curl -X GET "https://api.storagesphere.example.com/v1/storage-systems/ss-001" \
  -H "Authorization: Bearer <access-token>" \
  -H "Accept: application/json"
```

## Example response

```json
{
  "id": "ss-001",
  "name": "vsp-5000-prod",
  "vendor": "Hitachi",
  "model": "VSP 5000",
  "status": "monitored",
  "site": "Pune-DC1",
  "serialNumber": "VSP5000-123456",
  "managementAddress": "vsp5000-mgmt.corp.example.com",
  "firmwareVersion": "93-08-21",
  "totalCapacityTiB": 512.0,
  "usedCapacityTiB": 348.6,
  "lastDiscoveryTime": "2026-06-13T10:00:00Z"
}
```

## Error handling

If the request is not authenticated, the API returns `401`. If the authenticated user does not have permission to view storage system details, the API returns `403`. If the specified storage system is not found, the API returns `404`.

## Related topics

- [API overview](../getting-started/api-overview)
- [Authentication](../getting-started/authentication)
- [Authorization](../getting-started/authorization)
- [List storage systems](./list-storage-systems)
- [HTTP status codes](../api-fundamentals/http-status-codes)
