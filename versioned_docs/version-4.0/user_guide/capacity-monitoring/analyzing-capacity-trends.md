---
id: analyzing-capacity-trends
title: Analyzing Capacity Trends
description: Steps to analyze capacity trends in StorageSphere Enterprise.
sidebar_position: 2
---

# Analyzing Capacity Trends

## Overview

This topic describes how to analyze capacity trends in StorageSphere Enterprise. Trend analysis helps you understand storage growth over time and estimate when capacity thresholds might be reached.

## Before You Begin

### Prerequisites

- Capacity monitoring is enabled.
- Historical capacity data is available.
- Your role allows access to capacity views.

### Trend inputs

| Input | Description |
|---|---|
| Time range | Period used for trend calculations |
| Resource scope | Systems, pools, or volumes included in the analysis |
| Threshold | Warning or critical capacity value |
| Growth rate | Change in used capacity over time |

## Procedure

### Step 1: Open capacity trends

1. Select **Capacity** > **Trends**.

2. Select the resource type.

3. Set the time range.

### Step 2: Filter the analysis

1. Filter by site, vendor, storage system, pool, owner, or tag.

2. Select **Apply**.

3. Confirm that the chart and table update.

### Step 3: Review growth patterns

1. Sort resources by growth rate.

2. Review resources with sustained growth.

3. Compare trend changes with recent provisioning, snapshot, or application activity.

4. Open a resource to review details.

### Step 4: Export trend data

1. Select **Export**.

2. Choose CSV or PDF.

3. Include the selected filters and time range in the export.

::::tip
Use at least 30 days of data for planning discussions when possible. Shorter ranges can overstate temporary growth spikes.
::::

## Verification

| Check | Expected result |
|---|---|
| Trend chart | Shows capacity change for selected scope |
| Filtered data | Results match selected filters |
| Growth values | Resources show positive, flat, or negative trends |
| Export | Exported file includes filters and time range |

## Troubleshooting

### Trend chart is empty

- Expand the time range.
- Confirm that monitoring is enabled.
- Check whether the resource was recently discovered.

### Growth rate looks incorrect

- Review the selected time range.
- Check for one-time events such as migration, snapshot cleanup, or bulk provisioning.
- Compare with vendor platform data.

## Related Topics

- [Monitoring Capacity](./monitoring-capacity)
- [Identifying Capacity Risks](./identifying-capacity-risks)
- [Managing Storage Pools](../storage-management/managing-storage-pools)
- [Exporting Report Results](../reports/exporting-report-results)
