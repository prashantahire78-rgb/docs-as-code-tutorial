---
id: monitor-capacity
title: Monitor Capacity
description: Workflow for retrieving capacity data with StorageSphere Enterprise REST APIs.
sidebar_position: 2
---

# Monitor Capacity

## Overview

This topic describes a common API workflow for monitoring storage capacity. Capacity integrations typically query systems or pools, retrieve capacity metrics for a time range, identify risks, and export results to dashboards or planning tools.

## Before You Begin

### Prerequisites

- The API account has read access to inventory and capacity data.
- Capacity monitoring is active.
- The integration defines site, owner, or tag filters.
- The workflow uses pagination for large inventories.

### Capacity workflow data

| Data | Purpose |
|---|---|
| Storage systems | Establish scope |
| Pools | Identify shared capacity containers |
| Volumes | Identify top consumers |
| Capacity metrics | Track used, available, and provisioned values |
| Forecasts | Identify threshold risks |

## Procedure

### Step 1: Define scope

1. Select filters such as site, vendor, environment, or owner.

2. Query storage systems or pools within that scope.

3. Page through results until all relevant resources are collected.

### Step 2: Retrieve capacity metrics

1. Set a time range.

2. Query capacity metrics for each resource or resource group.

3. Store metric timestamps and units with the results.

### Step 3: Identify risks

1. Compare utilization values with your thresholds.

2. Identify resources with rapid growth.

3. Record forecast dates when available.

### Step 4: Publish results

1. Send summarized values to your dashboard or data warehouse.

2. Include links or resource IDs for follow-up in StorageSphere Enterprise.

3. Log request IDs and processing status.

::::tip
Use tags such as site, environment, application, and owner to align API capacity views with User Guide reporting workflows.
::::

## Verification

| Check | Expected result |
|---|---|
| Scope | Queried resources match selected filters |
| Metrics | Capacity values include timestamps and units |
| Risks | High utilization and growth risks are identified |
| Output | Dashboard or planning system receives summarized data |

## Troubleshooting

### Capacity results are empty

- Confirm monitoring is enabled.
- Expand the time range.
- Remove filters and query a smaller known resource.

### Capacity totals differ from reports

- Confirm filters, time range, and aggregation level.
- Compare system, pool, and volume definitions.
- Check whether report data uses rounded display values.

## Related Topics

- [Monitoring Capacity](../../user_guide/capacity-monitoring/monitoring-capacity)
- [Analyzing Capacity Trends](../../user_guide/capacity-monitoring/analyzing-capacity-trends)
- [Pagination](../api-fundamentals/pagination)
- [Filtering and Sorting](../api-fundamentals/filtering-and-sorting)
