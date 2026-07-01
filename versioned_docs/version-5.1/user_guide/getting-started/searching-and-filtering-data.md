---
id: searching-and-filtering-data
title: Searching and Filtering Data
description: Steps to search, filter, and save views in StorageSphere Enterprise.
sidebar_position: 4
---

# Searching and Filtering Data

## Overview

This topic describes how to search, filter, and save views in StorageSphere Enterprise. Search and filters help you focus on specific storage systems, pools, volumes, hosts, alerts, events, and reports.

Use saved views to preserve common operational filters for daily monitoring and incident response.

## Before You Begin

### Prerequisites

- You can sign in to StorageSphere Enterprise.
- You have permission to view the data type you want to search.
- Inventory, monitoring, alert, or report data is available.

### Common filters

| Filter | Applies to | Example |
|---|---|---|
| Time range | Charts, alerts, events, reports | Last 24 hours |
| Severity | Alerts and events | Critical |
| Site | Inventory, monitoring, reports | DC1 |
| Vendor | Storage systems and metrics | NetApp ONTAP |
| Status | Inventory, alerts, collectors | Healthy |
| Tag | Most operational views | `application:erp` |

## Procedure

### Step 1: Search for an object

1. Open a list view, such as **Storage Inventory**.

2. Enter a value in the search field.

   ```text
   vsp5000
   ```

3. Review the matching objects.

4. Open the object details page if you need more information.

### Step 2: Apply filters

1. Select **Filters**.

2. Choose one or more filter categories.

3. Select filter values.

4. Select **Apply**.

5. Review the filtered results.

### Step 3: Adjust table columns

1. Select **Columns**.

2. Choose the columns that support your workflow.

3. Move high-priority columns, such as **Severity**, **Status**, or **Owner**, near the beginning of the table.

4. Select **Apply**.

### Step 4: Save a view

1. After setting filters and columns, select **Save view**.

2. Enter a meaningful name.

   ```text
   DC1 critical storage alerts
   ```

3. Select whether the view is personal or shared, if your role allows shared views.

4. Select **Save**.

::::tip
Use names that include the site, resource type, and purpose. Clear names help operations teams select the correct view during incidents.
::::

## Verification

Confirm that the following conditions are true.

| Check | Expected result |
|---|---|
| Search | Results match the search value |
| Filters | Results include only selected filter values |
| Columns | Table displays selected columns |
| Saved view | View appears in the saved views list |
| Shared view | Other authorized users can open shared views |

## Troubleshooting

### Search returns no results

- Check spelling, object name, and identifier.
- Remove filters that might hide the object.
- Confirm that your role allows access to the object.
- Verify that the object was discovered or imported.

### Saved view does not appear

- Confirm that you selected **Save**.
- Check whether the view was saved as personal or shared.
- Refresh the browser.
- Contact an administrator if shared view permissions are unavailable.

## Related Topics

- [Navigating the Web UI](./navigating-the-web-ui)
- [Viewing Storage Inventory](../storage-management/viewing-storage-inventory)
- [Managing Alerts](../alerts-and-events/managing-alerts)
- [Reviewing Events](../alerts-and-events/reviewing-events)
