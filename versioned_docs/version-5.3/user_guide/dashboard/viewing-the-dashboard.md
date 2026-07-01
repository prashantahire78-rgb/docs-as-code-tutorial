---
id: viewing-the-dashboard
title: Viewing the Dashboard
description: Overview of the StorageSphere Enterprise dashboard.
sidebar_position: 1
---

# Viewing the Dashboard

## Overview

The StorageSphere Enterprise dashboard provides a consolidated view of storage health, capacity, performance, alerts, events, and operational status. Use the dashboard to identify issues that need attention and to navigate to detailed monitoring views.

The dashboard displays data based on your role, saved filters, and selected time range.

## Key Concepts

| Widget | Shows | Use for |
|---|---|---|
| Health summary | Overall status by system, pool, volume, and host | Identify unhealthy resources |
| Capacity summary | Used, available, and forecasted capacity | Track utilization and growth |
| Performance summary | IOPS, throughput, latency, and utilization | Detect performance changes |
| Active alerts | Critical and warning alerts | Prioritize investigation |
| Recent events | Operational and system events | Review recent activity |
| Collector status | Collector health and connectivity | Confirm monitoring coverage |

::::note
Dashboard totals can change as discovery jobs complete, resources are removed, or filters are applied.
::::

## Best Practices

- Review critical health and alert widgets first.
- Set the dashboard time range to match your operational shift.
- Use site and environment filters to focus on owned resources.
- Open widget links to investigate details instead of relying only on summary counts.
- Compare current values with trend charts before declaring an incident.

## Related Topics

- [Customizing Dashboard Views](./customizing-dashboard-views)
- [Understanding Status and Severity Values](./understanding-status-and-severity-values)
- [Viewing Storage Inventory](../storage-management/viewing-storage-inventory)
- [Managing Alerts](../alerts-and-events/managing-alerts)
- [Monitoring Capacity](../capacity-monitoring/monitoring-capacity)
