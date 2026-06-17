---
id: managing-alerts
title: Managing Alerts
description: Steps to review and manage alerts in StorageSphere Enterprise.
sidebar_position: 1
---

# Managing Alerts

## Overview

This topic describes how to manage alerts in StorageSphere Enterprise. Alerts identify conditions that require review, acknowledgement, escalation, or remediation.

## Before You Begin

### Prerequisites

- Alerting is configured.
- Your role allows access to alerts.
- Inventory and monitoring data is current.

### Alert fields

| Field | Description |
|---|---|
| Severity | Critical, warning, informational, or cleared |
| Resource | Affected storage system, pool, volume, host, or service |
| Condition | Rule or threshold that generated the alert |
| First seen | Time the alert first occurred |
| Last updated | Most recent time the alert changed |
| Owner | Assigned user or team |
| Status | New, acknowledged, in progress, resolved, or cleared |

## Procedure

### Step 1: Open alerts

1. Select **Alerts and Events** > **Alerts**.

2. Filter by severity, status, site, resource type, or tag.

3. Sort by severity or last updated time.

### Step 2: Review alert details

1. Select an alert.

2. Review the condition, affected resource, metrics, and related events.

3. Open the affected resource to review health and relationships.

### Step 3: Assign and update the alert

1. Select **Assign**.

2. Choose an owner or operations team.

3. Add an operational note.

4. Select **Save**.

### Step 4: Resolve or close the alert

1. Confirm that the condition is cleared or remediated.

2. Add a resolution note.

3. Select **Resolve** or **Close**, depending on your workflow.

::::tip
Include resource name, time range, impact, action taken, and follow-up owner in alert notes. Good notes reduce repeated investigation.
::::

## Verification

| Check | Expected result |
|---|---|
| Alert list | Alerts are filtered by operational priority |
| Details | Condition and affected resources are understood |
| Owner | Alert is assigned when action is required |
| Notes | Investigation or resolution notes are recorded |
| Status | Alert status matches current work state |

## Troubleshooting

### Alert is not visible

- Remove filters.
- Confirm your role allows alert access.
- Check whether the alert has already cleared or closed.

### Alert does not clear

- Confirm that the underlying condition is resolved.
- Wait for the next polling interval.
- Review related events and resource status.

## Related Topics

- [Acknowledging Alerts](./acknowledging-alerts)
- [Reviewing Events](./reviewing-events)
- [Understanding Status and Severity Values](../dashboard/understanding-status-and-severity-values)
- [Troubleshooting Alert Noise](../troubleshooting/troubleshooting-alert-noise)
