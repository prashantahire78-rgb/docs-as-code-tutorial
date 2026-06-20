---
id: get-job-status
title: Get job status
description: Retrieves the current status of an asynchronous job.
sidebar_position: 14
---

# Get job status

## Overview

Retrieves the current status of an asynchronous job.

## HTTP method and endpoint

```http
GET /jobs/{jobId}
```

## Authentication

This API uses bearer authentication.

```http
Authorization: Bearer <access-token>
```

## Request parameters

| Parameter | Location | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `jobId` | path | Yes | string | Unique identifier of the asynchronous job. |

## Request body

This API does not require a request body.

## Response body

| Field | Type | Description |
| --- | --- | --- |
| `jobId` | string |  |
| `status` | string | Value Supported values: `queued`, `running`, `completed`, `completedWithWarnings`, `failed`, `canceled`. |
| `jobType` | string |  |
| `message` | string |  |
| `createdAt` | string | Format: `date-time`. |
| `updatedAt` | string | Format: `date-time`. |

## Response codes

| Status code | Description |
| --- | --- |
| 200 | Job status retrieved successfully. |
| 401 | The request is not authenticated. |
| 403 | The authenticated user does not have permission to view job status. |
| 404 | The specified job was not found. |

## Example request

```bash
curl -X GET "https://api.storagesphere.example.com/v1/jobs/DISC-20260613-00042" \
  -H "Authorization: Bearer <access-token>" \
  -H "Accept: application/json"
```

## Example response

```json
{
  "jobId": "DISC-20260613-00042",
  "status": "running",
  "jobType": "storageDiscovery",
  "message": "Discovery job is running.",
  "createdAt": "2026-06-13T10:00:00Z",
  "updatedAt": "2026-06-13T10:05:00Z"
}
```

## Error handling

If the request fails, the API returns `401` (The request is not authenticated). If the request fails, the API returns `403` (The authenticated user does not have permission to view job status). If the request fails, the API returns `404` (The specified job was not found).

## Related topics

- [API overview](../getting-started/api-overview)
- [Authentication](../getting-started/authentication)
- [Authorization](../getting-started/authorization)
- [Error handling](../api-fundamentals/error-handling)
- [HTTP status codes](../api-fundamentals/http-status-codes)
