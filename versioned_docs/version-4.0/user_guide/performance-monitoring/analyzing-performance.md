---
id: analyzing-performance
title: Analyzing Performance
description: Steps to analyze storage performance in StorageSphere Enterprise.
sidebar_position: 2
---

# Analyzing Performance

## Overview

This topic describes how to analyze storage performance in StorageSphere Enterprise. Performance analysis helps you identify workload changes, saturation, and related resources that may affect applications.

## Before You Begin

### Prerequisites

- Performance monitoring is enabled.
- Your role allows access to performance views.
- You know the affected storage system, pool, volume, host, or time range.

### Analysis inputs

| Input | Example |
|---|---|
| Time range | Last 4 hours |
| Resource | `volume-erp-db-01` |
| Metric | Latency |
| Related alert | Critical latency threshold exceeded |
| Related event | Host mapping change |

## Procedure

### Step 1: Open performance views

1. Select **Performance**.

2. Choose the resource type.

3. Set the time range.

### Step 2: Select metrics

1. Select IOPS, throughput, latency, or utilization.

2. Add comparison metrics if needed.

3. Apply filters for site, storage system, pool, host, or tag.

### Step 3: Compare related resources

1. Open the affected resource.

2. Compare resource metrics with parent and child resources.

3. Review alerts and events for the same time range.

4. Identify whether the issue is isolated or shared.

### Step 4: Save or export results

1. Save the view for follow-up.

2. Export chart data if needed for an incident record.

3. Include the time range, filters, and related resources.

::::tip
When investigating performance, compare at least three levels: storage system, pool, and volume or host. This helps separate platform-wide issues from isolated workloads.
::::

## Verification

| Check | Expected result |
|---|---|
| Metrics | Selected metrics display for the time range |
| Relationships | Parent and child resources are available |
| Events | Relevant events appear in the same period |
| Export | Export includes selected metrics and filters |

## Troubleshooting

### Metrics are missing

- Confirm that performance monitoring is enabled.
- Check collector health.
- Expand the time range.
- Verify that the resource is supported for performance polling.

### Chart values are unexpected

- Confirm units and aggregation interval.
- Compare with related resources.
- Review vendor platform metrics for the same period.

## Related Topics

- [Monitoring Performance](./monitoring-performance)
- [Investigating Latency Issues](./investigating-latency-issues)
- [Reviewing Events](../alerts-and-events/reviewing-events)
- [Exporting Report Results](../reports/exporting-report-results)
