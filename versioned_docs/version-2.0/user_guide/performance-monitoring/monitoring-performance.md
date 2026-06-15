---
id: monitoring-performance
title: Monitoring Performance
description: Reference information for performance monitoring in StorageSphere Enterprise 2.0.
sidebar_position: 1
---

# Monitoring Performance

## Overview

This topic provides reference information for performance monitoring in StorageSphere Enterprise 2.0. Performance views help administrators review workload behavior and identify changes in IOPS, throughput, latency, and utilization.

## Reference Information

### Performance metrics

| Metric | Description | Common use |
|---|---|---|
| IOPS | Input/output operations per second | Measure workload activity |
| Throughput | Data transferred per second | Identify bandwidth demand |
| Latency | Time required to complete I/O | Investigate response time issues |
| Utilization | Resource busy percentage | Identify saturation risk |
| Queue depth | Pending I/O operations | Detect congestion |
| Cache hit ratio | Reads served from cache | Review workload efficiency |

### Performance scopes

| Scope | Use for |
|---|---|
| Storage system | Overall platform workload |
| Pool | Shared performance behavior across volumes |
| Volume | Application or host-specific workload |
| Host | Workload impact from mapped storage |
| Port | Connectivity and path analysis |

## Recommendations

- Compare latency with IOPS and throughput before assigning root cause.
- Use consistent time ranges when comparing systems, pools, volumes, and hosts.
- Review performance changes alongside events and alerts.
- Investigate sustained performance degradation before short spikes unless service impact is reported.
- Validate host and application context before changing storage platform settings.

::::note
Performance data appears after the first successful polling interval. Recently discovered resources might show inventory before performance charts are populated.
::::

## Related Topics

- [Analyzing Performance](./analyzing-performance)
- [Investigating Latency Issues](./investigating-latency-issues)
- [Managing Volumes](../storage-management/managing-volumes)
- [Reviewing Events](../alerts-and-events/reviewing-events)
