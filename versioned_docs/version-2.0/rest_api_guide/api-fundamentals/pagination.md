---
id: pagination
title: Pagination
description: Reference information for paginated REST API results in StorageSphere Enterprise.
sidebar_position: 4
---

# Pagination

## Overview

StorageSphere Enterprise REST APIs use pagination for collection responses that can return many items, such as storage systems, volumes, alerts, events, and audit records. Pagination keeps responses predictable and reduces load on the management server.

## Reference Information

### Common pagination fields

| Field | Description |
|---|---|
| `limit` | Maximum number of items returned in one response |
| `nextCursor` | Token used to request the next page |
| `previousCursor` | Token used to request the previous page, when supported |
| `totalCount` | Total matching items, when supported |

### Example paginated response

```json
{
  "items": [
    {
      "id": "volume-001",
      "name": "erp-db-01"
    }
  ],
  "page": {
    "limit": 100,
    "nextCursor": "eyJ2YWx1ZSI6IjEwMCJ9"
  }
}
```

### Pagination workflow

| Step | Action |
|---|---|
| 1 | Send the first request with a page size |
| 2 | Process returned items |
| 3 | Check for `nextCursor` |
| 4 | Request the next page using the cursor |
| 5 | Stop when no next cursor is returned |

::::note
The generated API Reference defines the exact pagination parameters for each collection endpoint.
::::

## Recommendations

- Use moderate page sizes for large inventory and event queries.
- Do not assume a collection remains unchanged while you page through it.
- Store progress checkpoints when processing large result sets.
- Combine pagination with filters to reduce response size.

## Related Topics

- [Filtering and Sorting](./filtering-and-sorting)
- [Response Format](./response-format)
- [Rate Limiting](./rate-limiting)
- [Monitor Capacity](../common-workflows/monitor-capacity)
