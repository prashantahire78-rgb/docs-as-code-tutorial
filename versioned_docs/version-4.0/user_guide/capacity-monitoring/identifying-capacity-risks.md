---
id: identifying-capacity-risks
title: Identifying Capacity Risks
description: Steps to identify capacity risks in StorageSphere Enterprise.
sidebar_position: 3
---

# Identifying Capacity Risks

## Overview

This topic describes how to identify capacity risks in StorageSphere Enterprise. Capacity risks include high utilization, fast growth, low available capacity, and forecasted threshold crossings.

## Before You Begin

### Prerequisites

- Capacity monitoring and alerting are active.
- Capacity thresholds are defined for your environment.
- Your role allows access to capacity and alert views.

### Risk indicators

| Indicator | Description | Typical action |
|---|---|---|
| High utilization | Pool or system exceeds warning threshold | Review expansion or cleanup options |
| Rapid growth | Used capacity grows faster than baseline | Identify workload or snapshot cause |
| Low available capacity | Remaining capacity is below operational reserve | Prioritize remediation |
| Forecast breach | Threshold is expected within planning window | Create capacity plan |

## Procedure

### Step 1: Open capacity risks

1. Select **Capacity** > **Risks**.

2. Set the time range.

3. Filter by site, storage system, or tag.

### Step 2: Prioritize risks

1. Sort by severity or forecast date.

2. Open critical risks first.

3. Review related alerts, trends, and affected resources.

### Step 3: Investigate cause

1. Review the parent storage system and pool.

2. Identify top-consuming volumes.

3. Compare recent growth with provisioning or snapshot events.

4. Review ownership tags and application mappings.

### Step 4: Document action

1. Record the risk, scope, and likely cause.

2. Export the risk view if needed.

3. Assign follow-up to the storage owner or capacity planning team.

::::warning
Do not delete or reclaim storage from production resources without following the approved storage operations and application-owner review process.
::::

## Verification

| Check | Expected result |
|---|---|
| Risk list | Capacity risks are sorted by priority |
| Root cause | Related resources and growth source are identified |
| Owner | Application or storage owner is known |
| Follow-up | Remediation or planning action is documented |

## Troubleshooting

### Risk appears after cleanup

- Confirm that polling has refreshed since cleanup.
- Review whether snapshots or replicas still consume capacity.
- Check if the risk threshold uses forecasted values.

### Risk is missing for a high-utilization pool

- Confirm capacity thresholds are configured.
- Verify that the pool is monitored.
- Check whether filters hide the pool.

## Related Topics

- [Monitoring Capacity](./monitoring-capacity)
- [Analyzing Capacity Trends](./analyzing-capacity-trends)
- [Managing Alerts](../alerts-and-events/managing-alerts)
- [Running Reports](../reports/running-reports)
