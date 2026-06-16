---
id: viewing-storage-inventory
title: Viewing Storage Inventory
description: Steps to view storage inventory in StorageSphere Enterprise 3.0.
sidebar_position: 1
---

# Viewing Storage Inventory

## Overview

This topic describes how to view storage inventory in StorageSphere Enterprise 3.0. Inventory views show discovered storage systems, pools, volumes, hosts, ports, and relationships across supported storage platforms.

Use inventory views to understand storage ownership, capacity, health, and resource relationships.

## Before You Begin

### Prerequisites

- Storage systems have been discovered.
- Your role allows access to storage inventory.
- Monitoring data is current for the resources you want to review.

### Inventory views

| View | Shows |
|---|---|
| Storage Systems | Arrays, clusters, appliances, and management endpoints |
| Pools | Capacity pools, aggregates, storage containers, or protection domains |
| Volumes | LUNs, volumes, file systems, or provisioned storage objects |
| Hosts | Servers, clusters, initiators, and host groups |
| Relationships | Mappings between systems, pools, volumes, and hosts |

## Procedure

### Step 1: Open Storage Inventory

1. Sign in to StorageSphere Enterprise.

2. Select **Storage Inventory**.

3. Select the inventory view you want to review.

### Step 2: Filter inventory

1. Select **Filters**.

2. Filter by site, vendor, status, owner, or tag.

3. Select **Apply**.

### Step 3: Open object details

1. Select a storage object.

2. Review summary, capacity, performance, health, alerts, and relationships.

3. Use links in the relationships panel to navigate to related objects.

::::note
Inventory data reflects the most recent successful discovery and polling cycle. Recently created storage objects might not appear until discovery or monitoring refreshes.
::::

## Verification

| Check | Expected result |
|---|---|
| Inventory list | Expected objects appear |
| Filters | Results match selected scope |
| Object details | Capacity, health, and relationship data is populated |
| Links | Related objects open correctly |

## Troubleshooting

### Expected object is missing

- Remove filters and search again.
- Confirm that the object is supported and discovered.
- Review the most recent discovery job.
- Contact a StorageSphere Administrator if discovery is stale.

### Object data appears stale

- Check the last discovery and polling timestamps.
- Confirm that the assigned collector is healthy.
- Review monitoring status for the object.

## Related Topics

- [Managing Storage Systems](./managing-storage-systems)
- [Managing Storage Pools](./managing-storage-pools)
- [Managing Volumes](./managing-volumes)
- [Managing Hosts](./managing-hosts)
- [Verifying Storage Discovery](../../installation_and_configuration_guide/storage-discovery/verifying-storage-discovery)
