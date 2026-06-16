---
id: deployment-architecture
title: Deployment Architecture
description: Architecture and components of a StorageSphere Enterprise 3.0 deployment.
sidebar_position: 3
---

# Deployment Architecture

## Overview

StorageSphere Enterprise 3.0 uses a modular architecture that separates the management plane, data collection, and persistent storage. Understanding this architecture helps you plan capacity, network paths, and high-availability requirements before you install and configure the product.

NovaStor Technologies designed StorageSphere Enterprise for enterprise environments where administrators discover, monitor, manage, and optimize storage infrastructure across data centers and remote sites.

## Why This Matters

A clear understanding of deployment architecture helps you:

- Size management servers and collectors correctly
- Place components on appropriate network segments
- Plan firewall rules and service dependencies
- Identify single points of failure before production cutover
- Integrate LDAP, Active Directory, email notifications, and REST APIs in the right locations

Incorrect placement of collectors or database services is a common cause of incomplete discovery and delayed alerts. Review this topic together with [System Requirements](./system-requirements) and [Network Requirements](./network-requirements).

## Architecture Overview

A standard StorageSphere Enterprise deployment includes four primary layers.

```text
┌─────────────────────────────────────────────────────────────────┐
│                    Administrator workstations                    │
│                   (HTTPS to web UI and REST API)                 │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                     Management server                            │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────────────────┐ │
│  │ Web UI       │ │ Core services│ │ Notification service     │ │
│  │ REST API     │ │ RBAC engine  │ │ (email alerts, reports)  │ │
│  └──────────────┘ └──────────────┘ └──────────────────────────┘ │
└────────────┬───────────────────────────────┬──────────────────────┘
             │                               │
┌────────────▼────────────┐    ┌─────────────▼─────────────────────┐
│ PostgreSQL database     │    │ LDAP / Active Directory           │
│ (config, inventory,     │    │ (authentication, group mapping)   │
│  metrics metadata)      │    └───────────────────────────────────┘
└─────────────────────────┘
             ▲
             │ TLS / internal API
┌────────────┴────────────────────────────────────────────────────┐
│                     Collector agents (1..n)                      │
│   SNMP, REST, WMI, vendor APIs → metrics and inventory data     │
└────────────┬────────────────────────────────────────────────────┘
             │
┌────────────▼────────────────────────────────────────────────────┐
│              Managed storage systems and hosts                   │
│   Arrays, filers, object stores, hypervisor datastores           │
└─────────────────────────────────────────────────────────────────┘
```

### Management server

The management server is the central control point for StorageSphere Enterprise. It provides:

- Web-based administration console
- REST API for automation and third-party integration
- Alert evaluation, escalation, and correlation engine
- Scheduled report generation and delivery
- RBAC policy enforcement
- Configuration repository for collectors, credentials, and polling schedules

All administrator sessions and API requests terminate at the management server. The server does not require direct connectivity to every storage device when collectors are deployed locally.

### Collector agents

Collector agents run close to the storage infrastructure they monitor. Collectors:

- Execute discovery scans across configured IP ranges and vendor APIs
- Poll devices at configured intervals for capacity and performance metrics
- Normalize data into a common schema before forwarding to the management server
- Buffer metrics during brief network interruptions between collector and server

Deploy collectors per site, subnet, or security zone to limit firewall scope and reduce WAN traffic.

### Database layer

The PostgreSQL database stores:

- Asset inventory and configuration baselines
- User accounts, roles, and RBAC assignments
- Alert definitions, thresholds, and event history
- Report templates and execution logs
- Collector registration and health status

For deployments exceeding 500 assets, use a dedicated database host or cluster to isolate I/O from the management server.

### Integration services

StorageSphere Enterprise connects to external services for authentication and notifications.

| Service | Purpose | Initiator |
|---|---|---|
| LDAP / Active Directory | User authentication and group synchronization | Management server |
| SMTP relay | Email notifications for alerts and reports | Management server |
| REST API consumers | Automation, ticketing, custom dashboards | External systems |

## Key Concepts

### Management plane and data plane

The **management plane** includes the web UI, REST API, RBAC engine, and configuration services on the management server. The **data plane** includes collectors and the ingestion path from storage devices to the database. Changes to the management plane do not require collector restarts unless polling schedules or credentials change.

### Polling and discovery

**Discovery** identifies new storage assets and registers them in the inventory. **Polling** retrieves metrics from known assets at regular intervals. Discovery runs on demand or on a schedule. Polling runs continuously based on per-asset or per-group intervals.

### Alert pipeline

When a metric crosses a defined threshold, the collector forwards the raw metric to the management server. The alert engine evaluates the metric against active policies, applies suppression rules, and generates an event. The notification service delivers alerts through the web UI, email, or REST API webhook.

### RBAC model

StorageSphere Enterprise uses role-based access control to limit what each administrator can view and configure. Roles map to LDAP or Active Directory groups. Local accounts are available for break-glass access when directory services are unavailable.

## Best Practices

- Deploy at least one collector per network segment that contains monitored storage assets.
- Place the management server in a management VLAN with controlled access from administrator workstations.
- Use a dedicated PostgreSQL instance for production deployments with more than 500 assets.
- Terminate HTTPS at the management server or at a reverse proxy that forwards trusted headers.
- Register collectors before you run large-scale discovery scans to avoid overloading a single collector.
- Document integration endpoints for LDAP, SMTP, and REST API consumers before installation. See [Firewall Requirements](./firewall-requirements).

:::warning
Do not expose collector management ports to untrusted networks. Collectors accept registration and configuration requests only from the management server.
:::

## Related Topics

- [System Requirements](./system-requirements)
- [Supported Platforms](./supported-platforms)
- [Network Requirements](./network-requirements)
- [Firewall Requirements](./firewall-requirements)
- [Preparing the Installation Environment](./preparing-the-installation-environment)
- [Installation Guide](../introduction_icg)
