---
id: reviewing-events
title: Reviewing Events
description: Steps to review events in StorageSphere Enterprise.
sidebar_position: 3
---

# Reviewing Events

## Overview

This topic describes how to review events in StorageSphere Enterprise. Events record operational activity, configuration changes, discovery job results, alert state changes, authentication activity, and system health updates.

Use events to understand what changed before, during, or after an operational issue.

## Before You Begin

### Prerequisites

- Your role allows access to events.
- You know the time range, resource, user, or event category to review.
- System time is synchronized across components.

### Event categories

| Category | Examples |
|---|---|
| System | Service restart, collector heartbeat, system health change |
| Storage | Discovery completed, inventory changed, resource status changed |
| Alert | Alert created, acknowledged, resolved, or cleared |
| Security | Sign-in, sign-out, role change, failed authentication |
| Report | Report run, report export, schedule execution |
| API | Token use, API request failure, integration activity |

## Procedure

### Step 1: Open events

1. Select **Alerts and Events** > **Events**.

2. Set the time range.

3. Filter by category, severity, resource, user, or tag.

### Step 2: Review event details

1. Select an event.

2. Review timestamp, category, resource, user, and message.

3. Open related resources or alerts from the event details.

### Step 3: Correlate events

1. Search for related events in the same time range.

2. Compare events with alert and performance timelines.

3. Export event data if required for an incident record.

::::tip
When investigating incidents, start with a narrow time range around the reported impact and expand only when needed.
::::

## Verification

| Check | Expected result |
|---|---|
| Time range | Event list matches selected period |
| Filters | Events match selected categories and resources |
| Details | Event metadata and message are visible |
| Correlation | Related alerts or resources can be opened |

## Troubleshooting

### Expected event is missing

- Expand the time range.
- Remove filters.
- Confirm your role allows access to the event category.
- Check system time synchronization if timestamps appear inconsistent.

### Event export fails

- Reduce the time range or filter scope.
- Confirm your role allows export.
- Try CSV export if PDF export is unavailable.

## Related Topics

- [Managing Alerts](./managing-alerts)
- [Viewing Audit Logs](../administration/viewing-audit-logs)
- [Investigating Latency Issues](../performance-monitoring/investigating-latency-issues)
- [Troubleshooting Report Generation](../troubleshooting/troubleshooting-report-generation)
