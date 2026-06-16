---
id: manage-alerts
title: Manage Alerts
description: Workflow for managing alerts with StorageSphere Enterprise 3.0 REST APIs.
sidebar_position: 4
---

# Manage Alerts

## Overview

This topic describes a common API workflow for integrating StorageSphere Enterprise alerts with an external ticketing, incident, or notification platform. Alert workflows typically query active alerts, enrich them with resource context, create or update external records, and update alert status when action is taken.

## Before You Begin

### Prerequisites

- The API account has permission to read alerts and update alert status.
- Alert ownership and escalation rules are defined.
- The external system can store StorageSphere alert IDs.
- The integration handles duplicate or repeated alert updates.

### Alert integration stages

| Stage | API activity |
|---|---|
| Query alerts | Retrieve active alerts by severity, status, site, or tag |
| Enrich context | Query affected resource details and related events |
| Create record | Send alert details to ticketing or incident system |
| Update status | Acknowledge, assign, or annotate alert when appropriate |
| Reconcile | Detect cleared or resolved alerts and update external state |

## Procedure

### Step 1: Query active alerts

1. Filter alerts by severity and status.

2. Page through results.

3. Store alert IDs and last updated timestamps.

### Step 2: Enrich alert data

1. Query the affected resource.

2. Query related events for the alert time range.

3. Add site, owner, application, and tag context.

### Step 3: Create or update external records

1. Check whether the alert ID already exists in the external system.

2. Create a new record or update the existing record.

3. Store the external record ID if needed.

### Step 4: Update alert status

1. Acknowledge or assign the alert if your workflow owns the alert.

2. Add a note that identifies the external record.

3. Reconcile cleared alerts during later sync runs.

::::warning
Do not automatically close alerts only because an external ticket closes. Confirm that the StorageSphere alert condition is resolved or cleared.
::::

## Verification

| Check | Expected result |
|---|---|
| Alert query | Active alerts match selected severity and status |
| Context | Resource and event details enrich the alert |
| External record | Ticket or incident contains StorageSphere alert ID |
| Status update | Alert status and notes reflect integration action |

## Troubleshooting

### Duplicate tickets are created

- Store and match on the StorageSphere alert ID.
- Check whether alert correlation creates new alert IDs for recurring conditions.
- Use last updated timestamps for incremental sync.

### Alert update fails

- Confirm the API account has update permission.
- Check whether the alert is already closed or cleared.
- Review audit logs for denied API actions.

## Related Topics

- [Managing Alerts](../../user_guide/alerts-and-events/managing-alerts)
- [Acknowledging Alerts](../../user_guide/alerts-and-events/acknowledging-alerts)
- [Authorization](../getting-started/authorization)
- [Error Handling](../api-fundamentals/error-handling)
