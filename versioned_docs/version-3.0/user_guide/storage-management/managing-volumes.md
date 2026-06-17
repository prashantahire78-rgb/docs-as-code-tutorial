---
id: managing-volumes
title: Managing Volumes
description: Steps to review volumes in StorageSphere Enterprise.
sidebar_position: 4
---

# Managing Volumes

## Overview

This topic describes how to review volumes in StorageSphere Enterprise. Volume views show capacity, performance, health, host mappings, parent pools, and related alerts.

Use volume details to investigate growth, latency, workload changes, and host impact.

## Before You Begin

### Prerequisites

- Volume inventory is discovered.
- Your role allows access to inventory and monitoring views.
- Capacity or performance monitoring is enabled for the parent storage system.

### Volume fields

| Field | Description |
|---|---|
| Name | Volume, LUN, or file system name |
| Identifier | Vendor-specific unique identifier |
| Parent pool | Pool or aggregate that provides capacity |
| Mapped hosts | Hosts or initiator groups associated with the volume |
| Capacity | Provisioned, used, and available values |
| Performance | IOPS, throughput, and latency values |

## Procedure

### Step 1: Open volume inventory

1. Select **Storage Inventory** > **Volumes**.

2. Search for the volume name or identifier.

3. Filter by storage system, pool, host, status, or tag.

4. Select the volume name.

### Step 2: Review volume details

1. Review capacity and utilization.

2. Review performance charts for the selected time range.

3. Check active alerts.

4. Review host mappings and parent pool relationships.

### Step 3: Compare related resources

1. Open the parent pool to review shared capacity pressure.

2. Open mapped hosts to review workload relationships.

3. Compare volume latency with storage system and pool latency.

::::note
StorageSphere Enterprise displays operational and monitoring data for volumes. Provisioning or modifying volumes occurs on the storage platform according to your storage operations procedures.
::::

## Verification

| Check | Expected result |
|---|---|
| Volume details | Capacity and identity fields are populated |
| Relationships | Parent pool and mapped hosts are visible |
| Metrics | Capacity and performance metrics are current |
| Alerts | Active volume alerts appear in the alert panel |

## Troubleshooting

### Volume is not mapped to the expected host

- Confirm that the latest discovery completed successfully.
- Check whether the vendor platform exposes the mapping through the supported API.
- Review host group or initiator group relationships.

### Volume metrics are missing

- Confirm that monitoring is enabled for the parent storage system.
- Check collector health.
- Expand the time range to include the last polling interval.

## Related Topics

- [Managing Hosts](./managing-hosts)
- [Managing Storage Pools](./managing-storage-pools)
- [Analyzing Performance](../performance-monitoring/analyzing-performance)
- [Investigating Latency Issues](../performance-monitoring/investigating-latency-issues)
