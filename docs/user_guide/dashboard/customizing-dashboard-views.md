---
id: customizing-dashboard-views
title: Customizing Dashboard Views
description: Steps to customize dashboard views in StorageSphere Enterprise 2.0.
sidebar_position: 2
---

# Customizing Dashboard Views

## Overview

This topic describes how to customize dashboard views in StorageSphere Enterprise 2.0. Dashboard customization lets you select widgets, filters, time ranges, and layouts that match your operational responsibilities.

## Before You Begin

### Prerequisites

- You can sign in to StorageSphere Enterprise.
- Your role allows dashboard access.
- Inventory and monitoring data is available.

### Customization options

| Option | Description |
|---|---|
| Time range | Controls the period shown by dashboard widgets |
| Filters | Limits widgets to sites, vendors, environments, or tags |
| Widget selection | Shows or hides dashboard widgets |
| Widget order | Changes the layout of the dashboard |
| Saved dashboard | Stores dashboard settings for reuse |

## Procedure

### Step 1: Open the dashboard

1. Sign in to StorageSphere Enterprise.

2. Select **Dashboard**.

3. Confirm that the dashboard loads with your current preferences.

### Step 2: Set the time range

1. Select the time range control.

2. Choose a time range, such as **Last 24 hours** or **Last 7 days**.

3. Confirm that charts and event counts update.

### Step 3: Apply dashboard filters

1. Select **Filters**.

2. Choose one or more filters.

3. Select **Apply**.

4. Confirm that widget values reflect the selected scope.

### Step 4: Configure widgets

1. Select **Customize**.

2. Show or hide widgets.

3. Drag widgets into the preferred order.

4. Select **Save dashboard**.

::::tip
Create separate dashboard views for production, test, and site-specific operations. This reduces noise during daily monitoring.
::::

## Verification

| Check | Expected result |
|---|---|
| Time range | Widgets show data for the selected period |
| Filters | Dashboard totals reflect selected filters |
| Widgets | Selected widgets appear in the saved layout |
| Saved dashboard | Dashboard settings persist after refresh |

## Troubleshooting

### Dashboard totals look incorrect

- Check active filters and time range.
- Confirm that discovery and monitoring jobs are current.
- Compare widget totals with inventory views.

### Widget does not show data

- Confirm that your role allows access to the underlying data.
- Expand the time range.
- Verify that monitoring is enabled for the relevant resources.

## Related Topics

- [Viewing the Dashboard](./viewing-the-dashboard)
- [Setting User Preferences](../getting-started/setting-user-preferences)
- [Searching and Filtering Data](../getting-started/searching-and-filtering-data)
- [Monitoring Performance](../performance-monitoring/monitoring-performance)
