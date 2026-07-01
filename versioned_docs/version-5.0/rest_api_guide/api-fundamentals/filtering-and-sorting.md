---
id: filtering-and-sorting
title: Filtering and Sorting
description: Reference information for filtering and sorting REST API data in StorageSphere Enterprise.
sidebar_position: 5
---

# Filtering and Sorting

## Overview

Filtering and sorting help API clients retrieve the data required for a workflow without processing unnecessary results. Use filters for inventory, capacity, performance, alerts, events, reports, and audit log queries.

## Reference Information

### Common filters

| Filter | Example value | Use for |
|---|---|---|
| `site` | `DC1` | Limit results to a location |
| `status` | `warning` | Find resources by health state |
| `severity` | `critical` | Find high-priority alerts or events |
| `vendor` | `NetApp ONTAP` | Limit storage platform data |
| `tag` | `application:erp` | Select owned resources |
| `startTime` and `endTime` | ISO 8601 timestamps | Query a time range |

### Example query pattern

```text
?site=DC1&status=warning&sort=lastUpdated:desc&limit=100
```

### Sorting guidance

| Sort field | Common use |
|---|---|
| `name` | Stable inventory lists |
| `lastUpdated` | Recent alerts and events |
| `severity` | Operational prioritization |
| `utilization` | Capacity risk review |
| `latency` | Performance investigation |

::::tip
Use filters that match operational tags in the User Guide, such as site, environment, application, and owner. Consistent tagging improves both API and web UI workflows.
::::

## Recommendations

- Filter before paginating large result sets.
- Sort by stable fields when exporting data repeatedly.
- Use explicit time ranges for monitoring, alert, event, and audit queries.
- Avoid relying on default sort order unless documented in the API Reference.

## Related Topics

- [Pagination](./pagination)
- [Request Format](./request-format)
- [Searching and Filtering Data](../../user_guide/getting-started/searching-and-filtering-data)
- [Discover Storage Systems](../common-workflows/discover-storage-systems)
