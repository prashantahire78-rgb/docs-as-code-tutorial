---
id: reviewing-collector-status
title: Reviewing Collector Status
description: Steps to review collector status in StorageSphere Enterprise 2.0.
sidebar_position: 4
---

# Reviewing Collector Status

## Overview

This topic describes how to review collector status in StorageSphere Enterprise 2.0. Collectors execute discovery and monitoring jobs near managed storage systems and report data back to the management server.

Use collector status views to confirm monitoring coverage and investigate discovery or metric collection gaps.

## Before You Begin

### Prerequisites

- Your role allows access to collector status.
- Collectors are installed and registered.
- Storage systems are assigned to collectors.

### Collector status values

| Status | Meaning | Action |
|---|---|---|
| Healthy | Collector is connected and sending heartbeats | Continue monitoring |
| Degraded | Collector is connected but reporting warnings | Review details |
| Offline | Collector heartbeat is missing | Check network or service health |
| Version mismatch | Collector version differs from management server | Schedule collector upgrade |
| Disabled | Collector is intentionally not running jobs | Confirm maintenance reason |

## Procedure

### Step 1: Open collector status

1. Select **Administration** > **Collectors**.

2. Review collector status and last heartbeat.

3. Filter by site, status, version, or assigned storage system.

### Step 2: Review collector details

1. Select a collector.

2. Review heartbeat, version, job queue, and assigned storage systems.

3. Check recent discovery and polling errors.

### Step 3: Review impact

1. Identify storage systems assigned to unhealthy collectors.

2. Review affected discovery jobs and monitoring gaps.

3. Escalate service or network issues to the appropriate owner.

::::note
Collector installation, upgrade, and repair are maintenance tasks. This topic focuses on operational review from the web UI.
::::

## Verification

| Check | Expected result |
|---|---|
| Collector list | All expected collectors appear |
| Heartbeat | Production collectors have recent heartbeats |
| Version | Collector version matches the management server |
| Assignments | Storage systems are assigned to healthy collectors |

## Troubleshooting

### Collector is offline

- Confirm whether maintenance is in progress.
- Check network connectivity between collector and management server.
- Review system health and collector logs.
- Escalate to the StorageSphere administrator.

### Jobs remain queued

- Check collector job capacity.
- Review long-running discovery jobs.
- Confirm that the collector is healthy.

## Related Topics

- [Monitoring System Health](../../installation_and_configuration_guide/maintenance/monitoring-system-health)
- [Troubleshooting Missing Inventory](../troubleshooting/troubleshooting-missing-inventory)
- [Managing Log Files](../../installation_and_configuration_guide/maintenance/managing-log-files)
- [Discovering Storage Systems](../../installation_and_configuration_guide/storage-discovery/discovering-storage-systems)
