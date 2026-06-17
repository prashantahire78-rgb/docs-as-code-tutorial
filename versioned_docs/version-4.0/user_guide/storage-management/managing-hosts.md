---
id: managing-hosts
title: Managing Hosts
description: Steps to review hosts and host relationships in StorageSphere Enterprise.
sidebar_position: 5
---

# Managing Hosts

## Overview

This topic describes how to review hosts in StorageSphere Enterprise. Host views show servers, clusters, initiators, host groups, mapped volumes, health, and performance relationships.

Use host views to understand which applications or servers are affected by storage health, capacity, or performance conditions.

## Before You Begin

### Prerequisites

- Host inventory is discovered from supported storage systems.
- Your role allows access to host and volume inventory.
- Host naming or tagging standards are available for your environment.

### Host relationship types

| Relationship | Description |
|---|---|
| Host to volume | Volumes mapped or presented to the host |
| Host to storage system | Storage systems providing resources to the host |
| Host to initiator | Fibre Channel WWPNs, iSCSI IQNs, or related identifiers |
| Host to application tag | Operational metadata that identifies application ownership |

## Procedure

### Step 1: Open host inventory

1. Select **Storage Inventory** > **Hosts**.

2. Search by host name, cluster name, initiator, or tag.

3. Select a host.

### Step 2: Review host details

1. Review host status and identifiers.

2. Review mapped volumes.

3. Review related storage systems and pools.

4. Check active alerts that affect the host or mapped storage.

### Step 3: Review impact

1. Open each mapped volume with warning or critical status.

2. Compare host-related volume metrics across the selected time range.

3. Identify shared pools or storage systems that may affect multiple hosts.

4. Add or update ownership tags if your role allows metadata updates.

::::tip
Use host tags to connect storage resources to applications and business services. Good tagging improves incident impact analysis and report accuracy.
::::

## Verification

| Check | Expected result |
|---|---|
| Host details | Host name and identifiers are visible |
| Mappings | Expected volumes are listed |
| Impact | Related alerts and unhealthy resources are visible |
| Tags | Application or owner tags are present when required |

## Troubleshooting

### Host is missing from inventory

- Confirm that at least one mapped volume exists on a discovered storage system.
- Check whether the storage platform exposes host data through the supported API.
- Review the latest discovery job for skipped host objects.

### Host name differs from expected value

- Compare the name with vendor platform host or host group configuration.
- Check aliases or tags in StorageSphere Enterprise.
- Coordinate naming updates with the storage administrator.

## Related Topics

- [Managing Volumes](./managing-volumes)
- [Viewing Storage Inventory](./viewing-storage-inventory)
- [Investigating Latency Issues](../performance-monitoring/investigating-latency-issues)
- [Managing Alerts](../alerts-and-events/managing-alerts)
