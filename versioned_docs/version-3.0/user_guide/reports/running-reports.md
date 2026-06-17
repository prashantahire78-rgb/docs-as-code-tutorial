---
id: running-reports
title: Running Reports
description: Steps to run reports in StorageSphere Enterprise.
sidebar_position: 1
---

# Running Reports

## Overview

This topic describes how to run reports in StorageSphere Enterprise. Reports provide structured output for capacity, performance, health, inventory, alerts, events, audit activity, and compliance review.

## Before You Begin

### Prerequisites

- Your role allows report access.
- Inventory and monitoring data is available.
- You know the report type, time range, and resource scope.

### Report types

| Report type | Use for |
|---|---|
| Capacity summary | Capacity usage by system, pool, site, or owner |
| Performance summary | IOPS, throughput, latency, and utilization review |
| Health summary | Status of systems, pools, volumes, hosts, and collectors |
| Alert summary | Alert volume, severity, ownership, and resolution |
| Inventory export | Storage systems, pools, volumes, hosts, and tags |
| Audit report | Administrative and security activity |

## Procedure

### Step 1: Open reports

1. Select **Reports**.

2. Select a report type.

3. Review the report description.

### Step 2: Configure report parameters

1. Select the time range.

2. Select resource filters such as site, storage system, vendor, owner, or tag.

3. Select output columns or sections.

4. Choose the output format.

### Step 3: Run the report

1. Select **Run report**.

2. Monitor report status.

3. Open the report when generation completes.

4. Review totals, charts, and included filters.

::::note
Large reports can take several minutes to generate. Use filters to limit report scope when possible.
::::

## Verification

| Check | Expected result |
|---|---|
| Parameters | Report reflects selected time range and filters |
| Status | Report completes successfully |
| Content | Tables and charts contain expected data |
| Access | Report is visible only to authorized users |

## Troubleshooting

### Report contains no data

- Expand the time range.
- Remove filters.
- Confirm that the selected report type applies to the selected resources.

### Report generation fails

- Reduce report scope.
- Check system health.
- Review report events for failure details.

## Related Topics

- [Scheduling Reports](./scheduling-reports)
- [Exporting Report Results](./exporting-report-results)
- [Monitoring Capacity](../capacity-monitoring/monitoring-capacity)
- [Analyzing Performance](../performance-monitoring/analyzing-performance)
