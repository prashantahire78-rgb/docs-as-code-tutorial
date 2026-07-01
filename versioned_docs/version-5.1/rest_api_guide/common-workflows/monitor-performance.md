---
id: monitor-performance
title: Monitor Performance
description: Workflow for retrieving performance data with StorageSphere Enterprise REST APIs.
sidebar_position: 3
---

# Monitor Performance

## Overview

This topic describes a common API workflow for monitoring storage performance. Performance integrations retrieve metrics such as IOPS, throughput, latency, and utilization for systems, pools, volumes, hosts, or ports.

## Before You Begin

### Prerequisites

- The API account has read access to performance data.
- Performance monitoring is enabled for the resources.
- The integration defines a time range and metric interval.
- The workflow handles empty or delayed metric results.

### Performance workflow data

| Data | Purpose |
|---|---|
| Resource inventory | Identify systems, pools, volumes, or hosts |
| Time range | Align metrics with investigation or dashboard period |
| Metric series | Retrieve IOPS, throughput, latency, and utilization |
| Related events | Correlate performance changes with operational activity |
| Alerts | Identify threshold-based conditions |

## Procedure

### Step 1: Select resources

1. Query inventory by site, storage system, host, volume, or tag.

2. Store stable resource IDs for metric requests.

3. Exclude unmanaged or unsupported resources.

### Step 2: Retrieve performance metrics

1. Select the metric names and time range.

2. Query metrics for the selected resources.

3. Preserve metric units, interval, and timestamps.

### Step 3: Correlate context

1. Query alerts for the same resources and time range.

2. Query events for related configuration or system activity.

3. Compare parent and child resources to identify shared impact.

### Step 4: Publish or alert

1. Send metric summaries to the external monitoring tool.

2. Apply your integration's alerting logic if required.

3. Link back to StorageSphere resource IDs for investigation.

::::note
Performance metrics might lag inventory updates by one or more polling intervals. Design integrations to tolerate delayed metric availability for newly discovered resources.
::::

## Verification

| Check | Expected result |
|---|---|
| Resources | Queried resources match the intended scope |
| Metrics | Performance data includes timestamps and units |
| Context | Related alerts and events are available |
| Output | External monitoring tool receives expected metrics |

## Troubleshooting

### Metrics are missing

- Confirm performance monitoring is enabled.
- Check collector health.
- Query a longer time range.
- Verify the resource supports the requested metric.

### Metric values look inconsistent

- Confirm aggregation interval and units.
- Compare related resources in the web UI.
- Review whether the API request and dashboard use the same time range.

## Related Topics

- [Monitoring Performance](../../user_guide/performance-monitoring/monitoring-performance)
- [Analyzing Performance](../../user_guide/performance-monitoring/analyzing-performance)
- [Reviewing Events](../../user_guide/alerts-and-events/reviewing-events)
- [Response Format](../api-fundamentals/response-format)
