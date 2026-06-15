---
id: generate-reports
title: Generate Reports
description: Workflow for generating reports with StorageSphere Enterprise 2.0 REST APIs.
sidebar_position: 5
---

# Generate Reports

## Overview

This topic describes a common API workflow for generating StorageSphere Enterprise reports. Report integrations typically select a report type, provide parameters, start report generation, monitor completion, and download or deliver the result.

## Before You Begin

### Prerequisites

- The API account has permission to run or export reports.
- The report type is approved for the intended audience.
- The integration defines a time range, filters, and output format.
- The client can handle asynchronous report generation.

### Report workflow stages

| Stage | API activity |
|---|---|
| Select report | Identify the report type or template |
| Provide parameters | Set time range, filters, and output format |
| Start generation | Submit the report job |
| Monitor status | Poll job status until completion |
| Retrieve output | Download or route the report result |

## Procedure

### Step 1: Select report scope

1. Choose report type, time range, and filters.

2. Confirm the intended audience can access the report content.

3. Use tags or site filters to limit the scope.

### Step 2: Start report generation

1. Submit the report generation request.

2. Store the returned job or report ID.

3. Log the request ID and report parameters.

### Step 3: Monitor report status

1. Poll report status at a reasonable interval.

2. Stop polling when the report completes, fails, or expires.

3. Retrieve error details for failed reports.

### Step 4: Retrieve or deliver results

1. Download the report in the requested format.

2. Store it in an approved repository.

3. Notify downstream systems or users when delivery is complete.

::::note
Reports can contain infrastructure names, operational events, capacity data, and audit information. Protect exported reports according to your data classification policy.
::::

## Verification

| Check | Expected result |
|---|---|
| Parameters | Report request includes approved time range and filters |
| Job status | Report completes successfully |
| Output | Report file is available in the requested format |
| Storage | Export is stored or delivered to an approved location |

## Troubleshooting

### Report generation fails

- Reduce report scope.
- Check system health.
- Review report job error details.
- Confirm the API account has report permissions.

### Report output is empty

- Expand the time range.
- Remove filters.
- Confirm data exists in the web UI for the same report scope.

## Related Topics

- [Running Reports](../../user_guide/reports/running-reports)
- [Scheduling Reports](../../user_guide/reports/scheduling-reports)
- [Exporting Report Results](../../user_guide/reports/exporting-report-results)
- [Troubleshooting Report Generation](../../user_guide/troubleshooting/troubleshooting-report-generation)
