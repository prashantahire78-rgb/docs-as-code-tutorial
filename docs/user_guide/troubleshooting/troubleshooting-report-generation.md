---
id: troubleshooting-report-generation
title: Troubleshooting Report Generation
description: Steps to troubleshoot report generation issues in StorageSphere Enterprise 3.0.
sidebar_position: 4
---

# Troubleshooting Report Generation

## Overview

This topic describes how to troubleshoot report generation issues in StorageSphere Enterprise 3.0. Report issues can include empty reports, failed generation, slow reports, export failures, or delivery problems.

## Before You Begin

### Prerequisites

- Your role allows access to reports.
- You know the report type, time range, filters, schedule, or export format.
- System health is available for review.

### Common report issues

| Issue | Possible cause |
|---|---|
| Empty report | Filters exclude data or no data exists for selected time range |
| Slow report | Large scope, long time range, or high system load |
| Failed report | Report service, database, or permission issue |
| Export failure | File size, browser, or role restriction |
| Delivery failure | Email configuration, recipient, or relay issue |

## Procedure

### Step 1: Review report parameters

1. Open the report or schedule.

2. Confirm report type, time range, filters, and output format.

3. Remove optional filters and run the report again if needed.

### Step 2: Check report history

1. Select **Reports** > **Report history**.

2. Find the failed or empty report.

3. Review status, duration, and error details.

### Step 3: Check system and notification status

1. Review system health.

2. Check notification delivery if the issue affects scheduled email reports.

3. Review related events.

### Step 4: Retry with reduced scope

1. Select a shorter time range.

2. Filter to one site, storage system, or resource type.

3. Run the report again.

::::tip
For large inventory and performance reports, schedule generation outside peak operations hours and export CSV for detailed analysis.
::::

## Verification

| Check | Expected result |
|---|---|
| Parameters | Report scope is valid |
| History | Report status and errors are reviewed |
| Retry | Reduced-scope report completes |
| Delivery | Scheduled report delivery succeeds when enabled |

## Troubleshooting

### Report remains empty

- Confirm that data exists for the selected period.
- Remove filters.
- Check whether your role allows access to the selected data.

### Scheduled report fails delivery

- Review notification delivery history.
- Confirm recipient addresses.
- Test email notifications.
- Check report file size or attachment policy.

## Related Topics

- [Running Reports](../reports/running-reports)
- [Scheduling Reports](../reports/scheduling-reports)
- [Exporting Report Results](../reports/exporting-report-results)
- [Reviewing Notification Delivery](../administration/reviewing-notification-delivery)
- [Monitoring System Health](../../installation_and_configuration_guide/maintenance/monitoring-system-health)
