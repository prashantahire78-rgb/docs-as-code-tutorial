---
id: reviewing-notification-delivery
title: Reviewing Notification Delivery
description: Steps to review notification delivery in StorageSphere Enterprise.
sidebar_position: 3
---

# Reviewing Notification Delivery

## Overview

This topic describes how to review notification delivery in StorageSphere Enterprise. Notification views help administrators confirm whether alert, report, system health, and license notifications were sent successfully.

This topic covers operational review. For SMTP configuration, see the Installation and Configuration Guide.

## Before You Begin

### Prerequisites

- Email notifications are configured.
- Your role allows access to notification history.
- You know the notification type, recipient, or time range.

### Notification types

| Type | Description |
|---|---|
| Alert | Alert creation, escalation, or status changes |
| Report | Scheduled or on-demand report delivery |
| System health | Management server, database, collector, or service health |
| License | License expiration or entitlement warnings |
| Security | Account lockout or security policy events, if enabled |

## Procedure

### Step 1: Open notification history

1. Select **Administration** > **Notifications**.

2. Select **Delivery history**.

3. Set the time range.

### Step 2: Filter delivery records

1. Filter by notification type, recipient, status, or related resource.

2. Select a delivery record.

3. Review delivery status and message details.

### Step 3: Review failures

1. Filter by **Failed** or **Retrying**.

2. Review SMTP response, recipient address, and retry count.

3. Escalate recurring failures to the messaging administrator.

::::tip
Review failed notification delivery after major alert storms or maintenance events. Delivery failures can hide operational issues from on-call teams.
::::

## Verification

| Check | Expected result |
|---|---|
| Delivery history | Notifications appear for selected period |
| Status | Successful and failed delivery records are visible |
| Details | Recipient, type, and related event are shown |
| Failures | Failed notifications have actionable error details |

## Troubleshooting

### Expected notification was not sent

- Confirm that the notification rule was enabled.
- Check whether the alert or report matched rule conditions.
- Verify recipient eligibility and role access.

### Notification failed delivery

- Confirm recipient address.
- Check SMTP relay status.
- Review messaging policy or rejection message.
- Test email notifications with an administrator.

## Related Topics

- [Managing Alerts](../alerts-and-events/managing-alerts)
- [Scheduling Reports](../reports/scheduling-reports)
- [Configuring Email Notifications](../../installation_and_configuration_guide/installation/configuring-email-notifications)
- [Monitoring System Health](../../installation_and_configuration_guide/maintenance/monitoring-system-health)
