---
id: investigating-latency-issues
title: Investigating Latency Issues
description: Steps to investigate storage latency issues in StorageSphere Enterprise.
sidebar_position: 3
---

# Investigating Latency Issues

## Overview

This topic describes how to investigate storage latency issues in StorageSphere Enterprise. Latency investigation compares affected volumes, hosts, pools, ports, storage systems, alerts, and events to identify likely scope and cause.

## Before You Begin

### Prerequisites

- Performance monitoring is enabled.
- You know the affected application, host, volume, or time range.
- Your role allows access to performance, inventory, alerts, and events.

### Latency investigation data

| Data | Use for |
|---|---|
| Affected time range | Focus analysis on reported impact |
| Host or application | Identify mapped storage resources |
| Volume latency | Confirm storage response time |
| Pool latency | Determine shared resource impact |
| Events | Identify configuration or workload changes |
| Alerts | Review threshold and health context |

## Procedure

### Step 1: Confirm the reported impact

1. Record the affected application, host, and time range.

2. Select **Performance** > **Latency**.

3. Search for the affected host or volume.

### Step 2: Review affected resources

1. Open the volume or host details page.

2. Review latency, IOPS, and throughput for the reported period.

3. Compare current values with the baseline period.

4. Check active and historical alerts.

### Step 3: Compare related resources

1. Open the parent pool.

2. Review pool latency and utilization.

3. Open the parent storage system.

4. Review system-level latency and port utilization.

5. Determine whether the issue affects one volume, one pool, or the storage system.

### Step 4: Review events

1. Select **Alerts and Events** > **Events**.

2. Filter events for the same time range and resources.

3. Review provisioning, mapping, snapshot, controller, or collector events.

### Step 5: Document findings

1. Save the performance view.

2. Export charts or data if required.

3. Document the affected resources, time range, and likely cause.

::::warning
Do not change storage platform performance settings without an approved runbook or storage administrator review. Incorrect changes can affect unrelated workloads.
::::

## Verification

| Check | Expected result |
|---|---|
| Scope | Affected resources and time range are identified |
| Metrics | Latency, IOPS, and throughput are reviewed together |
| Relationships | Parent pool and storage system are reviewed |
| Events | Relevant events are checked |
| Findings | Investigation notes are saved or exported |

## Troubleshooting

### Latency spike is not visible

- Confirm the time zone and time range.
- Check whether the affected workload uses a different mapped volume.
- Review host and application monitoring data outside StorageSphere Enterprise.

### Cause remains unclear

- Compare additional resources on the same pool or storage system.
- Review storage platform native logs.
- Escalate with exported charts, events, and affected resource details.

## Related Topics

- [Analyzing Performance](./analyzing-performance)
- [Managing Volumes](../storage-management/managing-volumes)
- [Managing Hosts](../storage-management/managing-hosts)
- [Reviewing Events](../alerts-and-events/reviewing-events)
