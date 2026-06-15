---
id: viewing-audit-logs
title: Viewing Audit Logs
description: Steps to view audit logs in StorageSphere Enterprise 3.0.
sidebar_position: 2
---

# Viewing Audit Logs

## Overview

This topic describes how to view audit logs in StorageSphere Enterprise 3.0. Audit logs record administrative, security, authentication, report, and API activities for accountability and compliance review.

## Before You Begin

### Prerequisites

- Your role allows audit log access.
- You know the user, event type, resource, or time range to review.
- Audit retention is configured according to policy.

### Audit event types

| Event type | Examples |
|---|---|
| Authentication | Sign-in, sign-out, failed sign-in |
| Authorization | Access denied, role evaluated |
| User management | User created, disabled, role changed |
| Security configuration | Certificate, RBAC, password policy changes |
| Storage operations | Discovery action, metadata update |
| Reports | Report run, export, schedule change |
| API | Token use, API request, API failure |

## Procedure

### Step 1: Open audit logs

1. Select **Administration** > **Audit Logs**.

2. Set the time range.

3. Filter by user, event type, resource, IP address, or outcome.

### Step 2: Review audit details

1. Select an audit event.

2. Review timestamp, user, source, action, resource, and result.

3. Open related events or resources when available.

### Step 3: Export audit results

1. Apply the required filters.

2. Select **Export**.

3. Choose CSV or PDF.

4. Store the export in an approved repository.

::::note
Audit logs can contain user names, IP addresses, and operational metadata. Follow your organization's data handling policy when exporting audit logs.
::::

## Verification

| Check | Expected result |
|---|---|
| Audit list | Events appear for the selected time range |
| Filters | Results match selected user, event type, or resource |
| Details | Event metadata is visible |
| Export | Export completes and includes selected filters |

## Troubleshooting

### Expected audit event is missing

- Expand the time range.
- Remove filters.
- Confirm that the event type is audited.
- Verify audit retention settings.

### Audit export is too large

- Narrow the time range.
- Filter by user, event type, or resource.
- Export multiple smaller files.

## Related Topics

- [Managing Users](./managing-users)
- [Reviewing Events](../alerts-and-events/reviewing-events)
- [Exporting Report Results](../reports/exporting-report-results)
- [Managing Log Files](../../installation_and_configuration_guide/maintenance/managing-log-files)
