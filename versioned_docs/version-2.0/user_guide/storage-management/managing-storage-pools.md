---
id: managing-storage-pools
title: Managing Storage Pools
description: Steps to review storage pools in StorageSphere Enterprise.
sidebar_position: 3
---

# Managing Storage Pools

## Overview

This topic describes how to review storage pools in StorageSphere Enterprise. Pool views show capacity, utilization, health, related volumes, and parent storage systems.

Use pool information to identify capacity pressure, imbalance, and resources that require planning or remediation.

## Before You Begin

### Prerequisites

- Storage pool inventory is discovered.
- Your role allows access to storage inventory and capacity views.
- Capacity monitoring is active for the parent storage system.

### Pool metrics

| Metric | Description |
|---|---|
| Total capacity | Total usable capacity in the pool |
| Used capacity | Capacity consumed by volumes and snapshots |
| Available capacity | Capacity available for new allocations |
| Utilization | Used capacity as a percentage of total capacity |
| Forecast date | Estimated date when the pool reaches a configured threshold |

## Procedure

### Step 1: Open pool inventory

1. Select **Storage Inventory** > **Pools**.

2. Filter by storage system, site, status, or utilization.

3. Select a pool name.

### Step 2: Review pool details

1. Review capacity totals and utilization.

2. Review trend and forecast charts.

3. Check active alerts for the pool.

4. Review related volumes.

### Step 3: Identify pool risks

1. Sort pools by utilization or forecast date.

2. Review pools above your warning threshold.

3. Identify fast-growing pools.

4. Export the filtered list if you need to share it with planning teams.

::::warning
High pool utilization can affect provisioning, snapshot growth, and application availability. Follow your storage operations runbook before making changes on the storage platform.
::::

## Verification

| Check | Expected result |
|---|---|
| Pool details | Capacity, health, and related volumes are visible |
| Trends | Utilization trend is available |
| Alerts | Active pool alerts are visible |
| Relationships | Parent storage system and child volumes are linked |

## Troubleshooting

### Pool capacity does not match vendor tools

- Confirm the last polling timestamp.
- Check whether snapshots, reserves, or internal volumes are counted differently.
- Review vendor-specific notes in the discovery job.

### Forecast is unavailable

- Confirm that enough historical data exists.
- Expand the time range.
- Verify that capacity polling is active.

## Related Topics

- [Monitoring Capacity](../capacity-monitoring/monitoring-capacity)
- [Analyzing Capacity Trends](../capacity-monitoring/analyzing-capacity-trends)
- [Managing Volumes](./managing-volumes)
- [Viewing Storage Inventory](./viewing-storage-inventory)
