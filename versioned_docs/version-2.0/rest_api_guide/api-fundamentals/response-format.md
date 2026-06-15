---
id: response-format
title: Response Format
description: Reference information for REST API response format in StorageSphere Enterprise 2.0.
sidebar_position: 3
---

# Response Format

## Overview

StorageSphere Enterprise REST API responses use standard HTTP status codes and JSON response bodies. Response bodies include resource data, collection metadata, workflow status, or error details depending on the operation.

## Reference Information

### Example resource response

```json
{
  "id": "storage-system-123",
  "name": "netapp-ontap-prod-01",
  "type": "storageSystem",
  "status": "healthy",
  "vendor": "NetApp ONTAP",
  "tags": {
    "site": "DC1",
    "environment": "production"
  }
}
```

### Example collection response

```json
{
  "items": [
    {
      "id": "pool-001",
      "name": "aggr-prod-01",
      "status": "warning"
    }
  ],
  "page": {
    "limit": 100,
    "nextCursor": "eyJwYWdlIjoyfQ"
  }
}
```

### Common response fields

| Field | Description |
|---|---|
| `id` | Stable resource identifier |
| `name` | Display name |
| `status` | Operational status |
| `items` | Collection of returned resources |
| `page` | Pagination metadata |
| `requestId` | Request correlation identifier |

::::tip
Design clients to ignore response fields they do not use. This helps clients remain compatible when StorageSphere Enterprise adds fields in future versions.
::::

## Recommendations

- Check the HTTP status code before parsing the response body.
- Treat missing optional fields as normal API behavior.
- Use stable IDs for follow-up requests instead of display names.
- Preserve response request IDs in integration logs.

## Related Topics

- [Request Format](./request-format)
- [Pagination](./pagination)
- [Error Handling](./error-handling)
- [API Versioning](../getting-started/api-versioning)
