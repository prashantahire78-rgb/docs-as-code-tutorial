---
id: acknowledging-alerts
title: Acknowledging Alerts
description: Steps to acknowledge alerts in StorageSphere Enterprise.
sidebar_position: 2
---

# Acknowledging Alerts

## Overview

This topic describes how to acknowledge alerts in StorageSphere Enterprise. Acknowledgement shows that an alert has been reviewed and assigned for investigation or remediation.

Acknowledging an alert does not clear the underlying condition.

## Before You Begin

### Prerequisites

- Your role allows alert acknowledgement.
- You understand your team's alert ownership and escalation process.
- The alert is active and visible in the alert list.

### Alert status workflow

| Status | Meaning |
|---|---|
| New | Alert has not been reviewed |
| Acknowledged | Alert has been seen and accepted for action |
| In progress | Investigation or remediation is active |
| Resolved | Operator marked the issue as resolved |
| Cleared | Monitoring condition no longer exists |

## Procedure

### Step 1: Open the alert

1. Select **Alerts and Events** > **Alerts**.

2. Filter for **New** alerts.

3. Select the alert.

### Step 2: Review context

1. Review severity, condition, and affected resource.

2. Check related metrics and events.

3. Confirm whether the alert is already assigned.

### Step 3: Acknowledge the alert

1. Select **Acknowledge**.

2. Add a note that describes the initial assessment.

   ```text
   Acknowledged by storage operations. Investigating pool utilization growth on DC1 NetApp cluster.
   ```

3. Assign the alert to the responsible user or team.

4. Select **Save**.

::::note
If the alert indicates possible service impact, follow your incident management process after acknowledgement.
::::

## Verification

| Check | Expected result |
|---|---|
| Status | Alert status changes to **Acknowledged** |
| Owner | Assigned owner or team appears |
| Note | Acknowledgement note is visible |
| Audit | Alert acknowledgement is recorded in event or audit history |

## Troubleshooting

### Acknowledge action is unavailable

- Confirm that your role allows alert updates.
- Check whether the alert is already closed or cleared.
- Refresh the alert details page.

### Alert returns to New

- Confirm that you saved the acknowledgement.
- Check whether a new instance of the same condition was generated.
- Review alert correlation behavior with your administrator.

## Related Topics

- [Managing Alerts](./managing-alerts)
- [Reviewing Events](./reviewing-events)
- [Viewing Audit Logs](../administration/viewing-audit-logs)
- [Understanding User Roles](../getting-started/understanding-user-roles)
