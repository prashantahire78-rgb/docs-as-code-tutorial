---
id: setting-user-preferences
title: Setting User Preferences
description: Steps to configure personal user preferences in StorageSphere Enterprise.
sidebar_position: 3
---

# Setting User Preferences

## Overview

This topic describes how to configure user preferences in StorageSphere Enterprise. Preferences control your display settings, default time range, notification preferences, and saved operational views.

User preferences apply only to your account and do not change system-wide settings.

## Before You Begin

### Prerequisites

- You can sign in to StorageSphere Enterprise.
- Your account is active and assigned a role.
- Email notifications are configured if you want personal notification delivery.

### Preference types

| Preference | Description |
|---|---|
| Theme | Light, dark, or system theme |
| Time zone | Time zone used for charts, events, and reports |
| Default time range | Initial time period used by dashboards and monitoring views |
| Landing page | Page opened after sign-in |
| Saved views | Personal filters and table columns |
| Notification delivery | Personal alert and report notification options |

## Procedure

### Step 1: Open your profile

1. Sign in to StorageSphere Enterprise.

2. Select your user name in the upper-right corner.

3. Select **User preferences**.

### Step 2: Set display preferences

1. Select **Display**.

2. Select a theme.

3. Select your time zone.

4. Select the default time range for charts.

   | Time range | Use when |
   |---|---|
   | Last 1 hour | You monitor short-term performance changes |
   | Last 24 hours | You review daily operations |
   | Last 7 days | You analyze weekly capacity or performance trends |
   | Last 30 days | You review monthly planning data |

### Step 3: Set the landing page

1. Select **Landing page**.

2. Choose the page you want to open after sign-in.

3. Select **Save**.

### Step 4: Configure notification preferences

1. Select **Notifications**.

2. Choose the alert severities you want to receive.

3. Confirm your email address.

4. Select **Save**.

::::note
Notification preferences do not override global notification rules or alert routing policies. They control only the notifications that are eligible for your account.
::::

## Verification

Confirm that the following conditions are true.

| Check | Expected result |
|---|---|
| Display | Theme and time zone match your preferences |
| Landing page | Selected page opens after sign-in |
| Time range | Dashboards open with the selected default range |
| Notifications | Eligible notifications use your selected delivery preferences |

## Troubleshooting

### Preferences do not save

- Confirm that your session has not expired.
- Refresh the page and try again.
- Contact a StorageSphere Administrator if preferences remain unchanged.

### Times do not match expected values

- Confirm your selected time zone.
- Check whether the chart or report uses UTC, local time, or system time.
- Confirm that your workstation time is synchronized.

## Related Topics

- [Signing In to StorageSphere Enterprise](./signing-in-to-storagesphere-enterprise)
- [Navigating the Web UI](./navigating-the-web-ui)
- [Creating Saved Views](./searching-and-filtering-data)
- [Managing Alerts](../alerts-and-events/managing-alerts)
