---
id: understanding-status-and-severity-values
title: Understanding Status and Severity Values
description: Reference information for status and severity values in StorageSphere Enterprise 3.0.
sidebar_position: 3
---

# Understanding Status and Severity Values

## Overview

This topic provides reference information for common status and severity values in StorageSphere Enterprise 3.0. These values appear on dashboards, inventory pages, monitoring views, alerts, events, and reports.

## Reference Information

### Resource status values

| Status | Meaning | Recommended action |
|---|---|---|
| **Healthy** | Resource is operating normally | Continue monitoring |
| **Warning** | Resource has a condition that requires review | Investigate within the operational window |
| **Critical** | Resource has a severe condition or service impact | Investigate immediately |
| **Unknown** | StorageSphere cannot determine current state | Check connectivity and collection status |
| **Maintenance** | Resource is in an approved maintenance window | Validate expected maintenance activity |
| **Unmanaged** | Resource is discovered but not monitored | Enable monitoring if required |

### Alert severity values

| Severity | Description | Typical response |
|---|---|---|
| Critical | Service-impacting or high-risk condition | Immediate response |
| Warning | Condition may require corrective action | Review during operations shift |
| Informational | Activity or state change recorded for awareness | Review as needed |
| Cleared | Alert condition no longer exists | Confirm resolution and close related work |

### Job status values

| Status | Description |
|---|---|
| Queued | Job is waiting for available worker capacity |
| Running | Job is active |
| Completed | Job completed successfully |
| Completed with warnings | Job completed but some items require review |
| Failed | Job did not complete |
| Canceled | Job was stopped before completion |

## Recommendations

- Use severity to prioritize work, not to replace operational runbooks.
- Investigate **Unknown** status when monitoring coverage matters for production resources.
- Review **Completed with warnings** jobs before assuming inventory or reports are complete.
- Use event history to confirm when a status changed and which system activity caused it.

## Related Topics

- [Viewing the Dashboard](./viewing-the-dashboard)
- [Managing Alerts](../alerts-and-events/managing-alerts)
- [Reviewing Events](../alerts-and-events/reviewing-events)
- [Monitoring System Health](../../installation_and_configuration_guide/maintenance/monitoring-system-health)
