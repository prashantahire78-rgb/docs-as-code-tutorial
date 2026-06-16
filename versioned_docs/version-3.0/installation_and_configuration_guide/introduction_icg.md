---
id: introduction_icg
title: Installation and Configuration Guide
description: Introduction to StorageSphere Enterprise 3.0 and the installation and configuration documentation.
sidebar_position: 1
---

# Installation and Configuration Guide

## Overview

This guide explains how to install and configure **StorageSphere Enterprise 3.0**, an enterprise storage monitoring and management platform from **NovaStor Technologies**. Use this guide to plan, deploy, and configure the product in your environment.

StorageSphere Enterprise enables administrators to discover, monitor, manage, and optimize storage infrastructure across data centers and remote sites. The platform provides a single management console for capacity and performance visibility, alert management, reporting, and access control.

## About StorageSphere Enterprise

StorageSphere Enterprise 3.0 is designed for IT operations teams, storage administrators, and platform engineers who manage heterogeneous storage environments. The product consolidates inventory, metrics, and alerts from block, file, and object storage systems into one operational view.

### Key capabilities

| Capability | Description |
|---|---|
| Storage discovery | Automatically identify storage assets across configured networks and vendor APIs |
| Capacity monitoring | Track used, available, and forecasted capacity at the system, pool, and volume level |
| Performance monitoring | Collect and trend IOPS, throughput, latency, and resource utilization metrics |
| Alert management | Define thresholds, correlate events, and deliver notifications through the web UI and email |
| Reporting | Generate scheduled and on-demand reports for capacity, performance, and compliance |
| Role-Based Access Control (RBAC) | Assign permissions by role to control who can view and configure the platform |
| LDAP and Active Directory authentication | Integrate with enterprise directory services for sign-in and group mapping |
| Email notifications | Send alert and report notifications through your SMTP relay |
| REST APIs | Automate configuration, query inventory, and integrate with external systems |

:::note
This guide covers installation and configuration through initial production readiness. For day-to-day operations, see the User Guide. For API integration details, see the REST API Guide.
:::

## Architecture at a glance

StorageSphere Enterprise uses a modular architecture that separates administration, data collection, and persistent storage. The primary components are:

| Component | Role |
|---|---|
| Management server | Hosts the web UI, REST API, alert engine, reporting services, and RBAC enforcement |
| Collector agents | Run near monitored storage to execute discovery scans and poll metrics |
| PostgreSQL database | Stores configuration, inventory, alert history, and metrics metadata |
| Directory services | Provide LDAP or Active Directory authentication and group synchronization |
| SMTP relay | Delivers email notifications for alerts and scheduled reports |

Administrators connect to the management server over HTTPS. Collectors forward data to the management server and do not require direct exposure to administrator workstations. This design supports multi-site deployments where collectors operate locally while a central management server aggregates data from all sites.

```text
Administrators → Management server → PostgreSQL
                      ↕
                 Collector agents → Storage systems
                      ↕
              LDAP / Active Directory, SMTP
```

For component interactions, sizing guidance, and deployment patterns, see [Deployment Architecture](./prerequisites/deployment-architecture).

## Who should use this guide

This guide is intended for the following roles:

| Role | Typical responsibilities |
|---|---|
| Storage administrator | Plan deployment topology and validate storage connectivity |
| Systems engineer | Provision hosts, configure operating systems, and install components |
| Database administrator | Prepare and maintain the PostgreSQL database instance |
| Network administrator | Configure DNS, NTP, firewall rules, and network paths |
| Security administrator | Approve firewall rules, TLS certificates, and directory service integration |

:::tip
Assign a single deployment lead to coordinate across teams. StorageSphere Enterprise installation spans compute, network, database, and directory services. A coordinated plan reduces rework during initial configuration.
:::

## How this guide is organized

The Installation and Configuration Guide is structured to take you from planning through a production-ready deployment.

| Section | Purpose |
|---|---|
| **Prerequisites** | Confirm system requirements, supported platforms, architecture, network and firewall rules, and environment preparation |
| **Installation** *(planned)* | Install the management server, collectors, and database components |
| **Configuration** *(planned)* | Configure authentication, alerts, notifications, discovery, and initial monitoring policies |

### Prerequisites

Complete the Prerequisites section before you install the product. These topics help you validate that your environment is ready:

| Topic | Description |
|---|---|
| [System Requirements](./prerequisites/system-requirements) | Hardware and software requirements for all components |
| [Supported Platforms](./prerequisites/supported-platforms) | Supported operating systems, hypervisors, and directory services |
| [Deployment Architecture](./prerequisites/deployment-architecture) | Detailed architecture, key concepts, and deployment best practices |
| [Network Requirements](./prerequisites/network-requirements) | Connectivity, DNS, NTP, bandwidth, and TLS requirements |
| [Firewall Requirements](./prerequisites/firewall-requirements) | Inbound and outbound firewall rules by component |
| [Preparing the Installation Environment](./prerequisites/preparing-the-installation-environment) | Step-by-step host and network preparation before installation |

:::warning
Do not begin installation until you complete the prerequisites and verify connectivity from collectors to storage management interfaces and from all components to the management server.
:::

## Before you begin

Confirm the following before you proceed:

- You have a supported platform as listed in [Supported Platforms](./prerequisites/supported-platforms).
- Your management server and collectors meet [System Requirements](./prerequisites/system-requirements).
- DNS, NTP, and firewall rules are configured per [Network Requirements](./prerequisites/network-requirements) and [Firewall Requirements](./prerequisites/firewall-requirements).
- Service accounts for the application, database, and directory services are created and tested.
- You completed the preparation steps in [Preparing the Installation Environment](./prerequisites/preparing-the-installation-environment).

## Related documentation

- [Deployment Architecture](./prerequisites/deployment-architecture)
- [System Requirements](./prerequisites/system-requirements)
- [Preparing the Installation Environment](./prerequisites/preparing-the-installation-environment)
