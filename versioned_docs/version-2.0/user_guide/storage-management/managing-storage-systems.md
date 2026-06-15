---
id: managing-storage-systems
title: Managing Storage Systems
description: Steps to review and manage storage systems in StorageSphere Enterprise 2.0.
sidebar_position: 2
---

# Managing Storage Systems

## Overview

This topic describes how to review and manage storage systems in StorageSphere Enterprise 2.0. Storage system pages provide status, capacity, performance, discovery, alert, and relationship information for arrays, clusters, and appliances.

## Before You Begin

### Prerequisites

- Storage systems have been added and discovered.
- Your role allows access to storage inventory.
- You know the storage system name, site, vendor, or tag.

### Storage system summary fields

| Field | Description |
|---|---|
| Vendor | Storage platform vendor and model family |
| Status | Current health status |
| Capacity | Used, available, and total capacity |
| Performance | IOPS, throughput, and latency summary |
| Last discovery | Most recent discovery completion time |
| Collector | Collector assigned to the storage system |
| Tags | Site, environment, owner, and service metadata |

## Procedure

### Step 1: Open the storage system

1. Select **Storage Inventory** > **Storage Systems**.

2. Search or filter for the storage system.

3. Select the storage system name.

### Step 2: Review operational status

1. Review the health summary.

2. Check active alerts.

3. Review last discovery and last polling timestamps.

4. Confirm that the assigned collector is healthy.

### Step 3: Review related resources

1. Select **Pools** to review capacity containers.

2. Select **Volumes** to review provisioned storage.

3. Select **Hosts** to review attached servers and host groups.

4. Select **Performance** to open performance charts.

### Step 4: Update operational metadata

1. Select **Edit tags**.

2. Add or update site, environment, application, and owner tags.

3. Select **Save**.

::::tip
Use consistent tags for storage systems. Tags improve filtering, reporting, alert routing, and ownership reviews.
::::

## Verification

| Check | Expected result |
|---|---|
| Status | Storage system status is visible |
| Relationships | Pools, volumes, and hosts are associated correctly |
| Tags | Required operational tags are present |
| Monitoring | Capacity and performance timestamps are current |

## Troubleshooting

### Storage system shows Unknown

- Confirm collector health.
- Review recent discovery and polling jobs.
- Check whether the storage management endpoint is reachable.

### Tags do not save

- Confirm that your role allows metadata updates.
- Check for required tag format.
- Refresh the page and verify current values.

## Related Topics

- [Viewing Storage Inventory](./viewing-storage-inventory)
- [Managing Storage Pools](./managing-storage-pools)
- [Monitoring Capacity](../capacity-monitoring/monitoring-capacity)
- [Monitoring Performance](../performance-monitoring/monitoring-performance)
