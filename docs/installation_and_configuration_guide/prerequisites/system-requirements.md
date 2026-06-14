---
id: system-requirements
title: System Requirements
description: Hardware and software requirements for installing StorageSphere Enterprise 2.0.
sidebar_position: 1
---

# System Requirements

## Overview

This topic lists the hardware and software requirements for StorageSphere Enterprise 2.0. Review these requirements before you install and configure the product. Requirements vary by deployment size and the number of storage assets you plan to monitor.

StorageSphere Enterprise is an enterprise storage monitoring and management platform from NovaStor Technologies. The platform supports storage discovery, capacity and performance monitoring, alert management, reporting, role-based access control (RBAC), and REST API integration.

## Requirements

### Management server

The management server hosts the StorageSphere Enterprise web application, core services, database, and REST API endpoints.

| Component | Minimum | Recommended (up to 500 assets) | Recommended (501–2,000 assets) |
|---|---|---|---|
| CPU | 4 cores, 2.4 GHz | 8 cores, 2.8 GHz | 16 cores, 3.0 GHz |
| Memory | 16 GB RAM | 32 GB RAM | 64 GB RAM |
| System disk | 100 GB SSD | 200 GB SSD | 400 GB SSD |
| Data volume | 250 GB SSD | 500 GB SSD | 1 TB SSD |
| Network | 1 Gbps | 1 Gbps | 10 Gbps |

:::note
The data volume stores metrics, event logs, configuration data, and report output. Size the data volume based on your retention policy and polling frequency.
:::

### Database

StorageSphere Enterprise uses a PostgreSQL database for configuration, inventory, and time-series metadata. You can install PostgreSQL on the management server or on a dedicated database host.

| Component | Minimum | Recommended |
|---|---|---|
| PostgreSQL version | 14.x | 15.x or 16.x |
| CPU | 2 cores | 4 cores |
| Memory | 8 GB RAM | 16 GB RAM |
| Disk | 100 GB SSD | 250 GB SSD |

### Collector agents

Collector agents gather storage metrics and inventory data from managed arrays, filers, and hosts. Install one or more collectors based on network segmentation and asset count.

| Component | Minimum per collector | Recommended per collector |
|---|---|---|
| CPU | 2 cores, 2.0 GHz | 4 cores, 2.4 GHz |
| Memory | 4 GB RAM | 8 GB RAM |
| Disk | 20 GB | 50 GB |
| Network | 1 Gbps | 1 Gbps |

Each collector supports up to 250 monitored assets under normal polling intervals. Deploy additional collectors when you exceed this limit or when network latency affects data collection.

### Administrator workstation

Administrators access StorageSphere Enterprise through a supported web browser.

| Component | Requirement |
|---|---|
| Browser | Latest stable version of Microsoft Edge, Google Chrome, or Mozilla Firefox |
| Screen resolution | 1280 × 720 or higher |
| Network | Reliable connection to the management server over HTTPS |

### Software dependencies

Install the following packages on the management server and collectors before installation.

| Package | Version | Required on |
|---|---|---|
| OpenSSL | 1.1.1 or later | Management server, collectors |
| Python | 3.10 or later | Collectors |
| systemd | 249 or later | Linux hosts |
| chrony or NTP service | Current stable release | Management server, collectors |

## Supported Configurations

StorageSphere Enterprise 2.0 supports the following deployment configurations.

| Configuration | Management server | Database | Collectors |
|---|---|---|---|
| Single-host | 1 | Embedded on management server | 0–2 on same host (not recommended for production) |
| Standard | 1 | Dedicated or co-located PostgreSQL | 1 or more on separate hosts |
| Distributed | 1 | Dedicated PostgreSQL cluster | Multiple collectors by site or subnet |

:::warning
Do not run the management server and more than one collector on a single host in production environments. Co-located deployments limit scalability and complicate troubleshooting.
:::

For supported operating systems and hypervisor platforms, see [Supported Platforms](./supported-platforms).

## Recommendations

- Provision the management server with SSD storage for the system disk and data volume.
- Allocate 30% additional memory above the recommended value if you enable long-term performance trending and large report schedules.
- Use a dedicated PostgreSQL instance when you monitor more than 500 assets.
- Synchronize time across all hosts with NTP or chrony before installation. See [Network Requirements](./network-requirements).
- Review [Deployment Architecture](./deployment-architecture) to understand how components interact before you size your environment.

## Related Topics

- [Supported Platforms](./supported-platforms)
- [Deployment Architecture](./deployment-architecture)
- [Network Requirements](./network-requirements)
- [Firewall Requirements](./firewall-requirements)
- [Preparing the Installation Environment](./preparing-the-installation-environment)
- [Installation Guide](../introduction_icg)
