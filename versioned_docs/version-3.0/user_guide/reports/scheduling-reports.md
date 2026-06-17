---
id: scheduling-reports
title: Scheduling Reports
description: Steps to schedule recurring reports in StorageSphere Enterprise.
sidebar_position: 2
---

# Scheduling Reports

## Overview

This topic describes how to schedule recurring reports in StorageSphere Enterprise. Scheduled reports help operations, capacity planning, and compliance teams receive consistent information without running reports manually.

## Before You Begin

### Prerequisites

- Your role allows report scheduling.
- Email notifications are configured.
- The report parameters are approved for the audience.
- Recipients are authorized to receive the report data.

### Schedule options

| Option | Description |
|---|---|
| Frequency | Daily, weekly, monthly, or custom interval |
| Time zone | Time zone used to run the report |
| Recipients | Users or distribution lists that receive the report |
| Format | PDF, CSV, or both |
| Retention | How long generated report results are retained |

## Procedure

### Step 1: Select a report

1. Select **Reports**.

2. Select the report type.

3. Configure the report parameters.

4. Select **Schedule**.

### Step 2: Define the schedule

1. Select the frequency.

2. Select the run time and time zone.

3. Set the report retention period.

4. Choose the output format.

### Step 3: Add recipients

1. Add StorageSphere users, groups, or email distribution lists.

2. Confirm that recipients are approved for the report content.

3. Add a subject and optional message.

### Step 4: Save and test

1. Select **Save schedule**.

2. Select **Run now** to test the schedule.

3. Confirm that the report is generated and delivered.

::::warning
Do not send reports that contain sensitive infrastructure or audit data to unmanaged email distribution lists.
::::

## Verification

| Check | Expected result |
|---|---|
| Schedule | Schedule appears in the report schedules list |
| Delivery | Test report is delivered to recipients |
| Format | Output format matches the schedule |
| Retention | Retention setting matches policy |

## Troubleshooting

### Scheduled report is not delivered

- Confirm email notification settings.
- Check recipient addresses.
- Review report events for delivery errors.
- Confirm that the schedule is enabled.

### Schedule runs at the wrong time

- Confirm schedule time zone.
- Check daylight saving time behavior for the selected region.
- Review user and system time zone settings.

## Related Topics

- [Running Reports](./running-reports)
- [Exporting Report Results](./exporting-report-results)
- [Configuring Email Notifications](../../installation_and_configuration_guide/installation/configuring-email-notifications)
- [Viewing Audit Logs](../administration/viewing-audit-logs)
