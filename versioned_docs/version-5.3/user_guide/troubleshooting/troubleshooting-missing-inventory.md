---
id: troubleshooting-missing-inventory
title: Troubleshooting Missing Inventory
description: Steps to troubleshoot missing inventory in StorageSphere Enterprise.
sidebar_position: 2
---

# Troubleshooting Missing Inventory

## Overview

This topic describes how to troubleshoot missing inventory in StorageSphere Enterprise. Missing inventory can occur when discovery is stale, filters hide resources, collectors are unhealthy, permissions are incomplete, or the storage platform does not expose the expected object.

## Before You Begin

### Prerequisites

- Your role allows access to storage inventory.
- You know the expected storage system, pool, volume, host, or identifier.
- You can review discovery status or contact a StorageSphere Administrator.

### Common causes

| Cause | What to check |
|---|---|
| Active filters | Search filters, saved views, tags, and time range |
| Stale discovery | Last discovery timestamp and job status |
| Collector issue | Collector health and job queue |
| Permission issue | Storage platform service account access |
| Unsupported object | Vendor platform support and discovery warnings |

## Procedure

### Step 1: Clear filters

1. Open **Storage Inventory**.

2. Clear active filters.

3. Search by name, identifier, storage system, or host.

### Step 2: Check discovery status

1. Open the parent storage system.

2. Review last discovery time and discovery status.

3. Review the most recent discovery job if available.

### Step 3: Review collector status

1. Open **Administration** > **Collectors**.

2. Confirm that the assigned collector is **Healthy**.

3. Check whether jobs are queued or failing.

### Step 4: Escalate with evidence

1. Capture the missing object name and expected location.

2. Include screenshots or exported search results if required.

3. Provide the latest discovery job status to the administrator.

::::note
Objects created recently on the storage platform might not appear until the next successful discovery cycle.
::::

## Verification

| Check | Expected result |
|---|---|
| Filters | Filters are cleared or correctly scoped |
| Discovery | Parent storage system has recent successful discovery |
| Collector | Assigned collector is healthy |
| Evidence | Missing object details are documented |

## Troubleshooting

### Object appears after clearing filters

- Update or delete saved views that hide expected objects.
- Add required tags to improve future searches.

### Object remains missing after discovery

- Review discovery warnings.
- Confirm storage platform service account permissions.
- Check whether the object type is supported.

## Related Topics

- [Viewing Storage Inventory](../storage-management/viewing-storage-inventory)
- [Reviewing Collector Status](../administration/reviewing-collector-status)
- [Verifying Storage Discovery](../../installation_and_configuration_guide/storage-discovery/verifying-storage-discovery)
- [Troubleshooting Storage Discovery](../../installation_and_configuration_guide/storage-discovery/troubleshooting-storage-discovery)
