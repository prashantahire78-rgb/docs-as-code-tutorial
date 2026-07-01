---
id: monitoring-capacity
title: Monitoring Capacity
description: Overview of capacity monitoring in StorageSphere Enterprise.
sidebar_position: 1
---

# Monitoring Capacity

## Overview

Capacity monitoring in StorageSphere Enterprise helps administrators track used, available, provisioned, and forecasted storage capacity across systems, pools, and volumes.

Use capacity views to identify growth trends, capacity pressure, allocation imbalance, and resources that require planning.

## Key Concepts

| Concept | Description |
|---|---|
| Total capacity | Usable capacity reported by the storage platform |
| Used capacity | Capacity consumed by data, snapshots, metadata, or reserves |
| Available capacity | Capacity available for allocation or growth |
| Provisioned capacity | Capacity allocated to volumes or file systems |
| Utilization | Used capacity as a percentage of total capacity |
| Forecast | Estimated future threshold crossing based on historical growth |

### Capacity views

| View | Use for |
|---|---|
| System capacity | Compare capacity across storage systems |
| Pool capacity | Identify pools at risk of exhaustion |
| Volume capacity | Review volume growth and consumption |
| Forecasts | Plan capacity expansion or reclamation |

::::note
Capacity definitions can vary by storage vendor. Review vendor-specific values when comparing StorageSphere Enterprise data with native storage tools.
::::

## Best Practices

- Review capacity by site, storage system, and pool before reviewing individual volumes.
- Use forecasts with trend context, not as the only planning input.
- Track rapid growth separately from high utilization.
- Tag volumes by application and owner to improve planning reports.
- Review capacity risks during regular operations and change planning meetings.

## Related Topics

- [Analyzing Capacity Trends](./analyzing-capacity-trends)
- [Identifying Capacity Risks](./identifying-capacity-risks)
- [Managing Storage Pools](../storage-management/managing-storage-pools)
- [Running Reports](../reports/running-reports)
