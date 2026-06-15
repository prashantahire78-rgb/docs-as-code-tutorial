---
id: api-overview
title: API Overview
description: Overview of the StorageSphere Enterprise 3.0 REST API model.
sidebar_position: 1
---

# API Overview

## Overview

The StorageSphere Enterprise 3.0 REST APIs provide programmatic access to inventory, monitoring, alert, report, and administrative data. API clients communicate with the management server over HTTPS and exchange JSON request and response bodies.

Use the APIs for integrations, automation, reporting pipelines, and operational workflows that need repeatable access to StorageSphere Enterprise data.

## Key Concepts

| Area | API use case |
|---|---|
| Storage discovery | Start or monitor discovery workflows from approved automation |
| Inventory | Query storage systems, pools, volumes, hosts, and relationships |
| Capacity monitoring | Retrieve capacity usage, trends, and risk data |
| Performance monitoring | Retrieve IOPS, throughput, latency, and utilization data |
| Alerts and events | Query, acknowledge, and correlate operational signals |
| Reports | Run, schedule, and export report outputs |
| Administration | Review users, roles, audit logs, collectors, and notification status |

### API characteristics

| Characteristic | Description |
|---|---|
| Transport | HTTPS |
| Payload format | JSON |
| Authentication | Token-based authentication |
| Authorization | Role-Based Access Control (RBAC) |
| Status codes | Standard HTTP status codes |
| Versioning | Versioned API path or negotiated API version |

::::note
The REST APIs enforce the same security model as the web UI. A token can access only the resources and actions allowed by the assigned role.
::::

## Best Practices

- Use service accounts for integrations instead of personal user tokens.
- Query only the fields and time ranges required by the workflow.
- Correlate API results with dashboard and report data during validation.
- Review audit logs for API activity during integration testing.

## Related Topics

- [Getting Started](./)
- [Authentication](./authentication)
- [Authorization](./authorization)
- [HTTP Methods](../api-fundamentals/http-methods)
- [Viewing Audit Logs](../../user_guide/administration/viewing-audit-logs)
