---
id: exporting-report-results
title: Exporting Report Results
description: Steps to export report results from StorageSphere Enterprise 3.0.
sidebar_position: 3
---

# Exporting Report Results

## Overview

This topic describes how to export report results from StorageSphere Enterprise 3.0. Exported reports support operational reviews, capacity planning, incident records, and compliance evidence.

## Before You Begin

### Prerequisites

- Your role allows report export.
- The report has completed successfully.
- You know the approved format and destination for the export.

### Export formats

| Format | Use for |
|---|---|
| PDF | Review-ready summary with charts and tables |
| CSV | Spreadsheet analysis or data import |
| JSON | Structured data exchange with approved tools |

## Procedure

### Step 1: Open report results

1. Select **Reports** > **Report history**.

2. Open the completed report.

3. Confirm that the report content is correct.

### Step 2: Select export options

1. Select **Export**.

2. Choose the format.

3. Select whether to include charts, filters, and summary metadata.

4. Select **Export report**.

### Step 3: Store the export

1. Save the exported file to an approved location.

2. Apply access controls according to the report content.

3. Record the report name, time range, and export date if required.

::::note
Exported reports can contain infrastructure names, storage usage, operational events, and audit data. Handle exports according to your organization's data classification policy.
::::

## Verification

| Check | Expected result |
|---|---|
| Export file | File downloads successfully |
| Format | File format matches the selected option |
| Metadata | Time range and filters are included when selected |
| Access | File is stored in an approved location |

## Troubleshooting

### Export fails

- Refresh the report results page.
- Try a smaller report or narrower time range.
- Confirm that your role allows export.
- Review report events for export errors.

### CSV values look different from the UI

- Confirm units and rounding behavior.
- Check whether the UI applies display formatting.
- Review included filters and time range.

## Related Topics

- [Running Reports](./running-reports)
- [Scheduling Reports](./scheduling-reports)
- [Reviewing Events](../alerts-and-events/reviewing-events)
- [Viewing Audit Logs](../administration/viewing-audit-logs)
