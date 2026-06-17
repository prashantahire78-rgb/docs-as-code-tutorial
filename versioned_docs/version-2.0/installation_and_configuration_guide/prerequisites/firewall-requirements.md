---
id: firewall-requirements
title: Firewall Requirements
description: Inbound and outbound firewall rules for StorageSphere Enterprise components.
sidebar_position: 5
---

# Firewall Requirements

## Overview

This topic defines the inbound and outbound firewall rules required for StorageSphere Enterprise. Configure these rules before you install and configure the product to prevent connectivity failures during discovery, polling, and alert delivery.

Firewall requirements align with the connectivity paths described in [Network Requirements](./network-requirements). Apply rules at host-based firewalls, network firewalls, and cloud security groups as appropriate for your environment.

## Requirements

### Management server

Configure the following rules on the management server host and on perimeter firewalls that protect the management segment.

#### Inbound rules

| Port | Protocol | Source | Purpose |
|---|---|---|---|
| 443 | TCP | Administrator subnets | Web UI and REST API (HTTPS) |
| 8443 | TCP | Collector subnets | Collector registration and configuration |

#### Outbound rules

| Port | Protocol | Destination | Purpose |
|---|---|---|---|
| 5432 | TCP | Database host | PostgreSQL connectivity |
| 443 | TCP | Collector subnets | Configuration push and health polling |
| 389 | TCP | Directory servers | LDAP authentication |
| 636 | TCP | Directory servers | LDAPS authentication |
| 25, 587, 465 | TCP | SMTP relay | Email notifications |
| 123 | UDP | NTP servers | Time synchronization |
| 443 | TCP | Vendor REST API endpoints | On-demand diagnostics (optional) |

### Collector agents

Configure the following rules on each collector host and on firewalls between collectors and monitored storage.

#### Inbound rules

| Port | Protocol | Source | Purpose |
|---|---|---|---|
| 8443 | TCP | Management server | Configuration delivery and health checks |

#### Outbound rules

| Port | Protocol | Destination | Purpose |
|---|---|---|---|
| 443 | TCP | Management server | Metric and event upload |
| 161 | UDP | Storage management subnets | SNMP polling |
| 162 | UDP | Storage management subnets | SNMP traps (optional) |
| 443 | TCP | Storage REST API endpoints | Vendor API polling |
| 5985–5986 | TCP | Windows storage hosts | WMI and WinRM (when applicable) |
| 123 | UDP | NTP servers | Time synchronization |

:::note
SNMP and vendor API ports vary by storage platform. Open the ports required for your monitored device types. See [Supported Platforms](./supported-platforms) for vendor categories.
:::

### PostgreSQL database host

When you use a dedicated database server, configure the following rules.

#### Inbound rules

| Port | Protocol | Source | Purpose |
|---|---|---|---|
| 5432 | TCP | Management server | Database connections |

#### Outbound rules

| Port | Protocol | Destination | Purpose |
|---|---|---|---|
| 123 | UDP | NTP servers | Time synchronization |

No outbound database rules are required beyond NTP unless you use external backup services.

### Directory services

No inbound rules are required on the management server for LDAP traffic. The management server initiates outbound connections to directory servers. Ensure that firewalls between the management server and directory services allow:

| Port | Protocol | Direction | Purpose |
|---|---|---|---|
| 389 | TCP | Outbound from management server | LDAP |
| 636 | TCP | Outbound from management server | LDAPS |
| 3268 | TCP | Outbound from management server | Global catalog (Active Directory) |
| 3269 | TCP | Outbound from management server | Global catalog SSL (Active Directory) |

## Supported Configurations

### Host-based firewall

StorageSphere Enterprise installation scripts configure `firewalld` on RHEL and `ufw` on Ubuntu when you select automatic firewall configuration. Automatic configuration opens only the ports listed in this topic for the installed role (management server or collector).

| Platform | Firewall tool | Automatic configuration |
|---|---|---|
| RHEL 8.8+, 9.2+ | firewalld | Supported |
| Ubuntu 20.04, 22.04 LTS | ufw | Supported |
| SLES 15 SP4+ | firewalld | Supported |
| Windows Server | Windows Defender Firewall | Manual configuration required |

### Network firewall

For network-level firewalls, create rule groups by component role. Use security groups or zone-based policies that reference the management server, collector, and database subnets defined in [Deployment Architecture](./deployment-architecture).

### Proxy environments

StorageSphere Enterprise does not require an HTTP proxy for internal component communication. If your environment requires a proxy for outbound SMTP or vendor API access, configure proxy settings during installation. Allow direct HTTPS connectivity between collectors and the management server without a proxy.

## Recommendations

- Apply the principle of least privilege. Open only the ports required for your deployment role and monitored device types.
- Use LDAPS (port 636) instead of LDAP (port 389) when directory servers support TLS.
- Restrict inbound port 443 on the management server to administrator subnets and trusted reverse proxy addresses.
- Restrict inbound port 8443 on collectors to the management server IP address or subnet.
- Log denied connections during the preparation phase to identify missing rules before production cutover.
- Coordinate with your network security team to document rule changes in your change management system.

:::warning
Blocking outbound UDP port 123 prevents time synchronization and causes alert timestamp drift. Ensure NTP traffic is permitted on all component hosts.
:::

:::tip
Create a firewall validation checklist that maps each rule in this topic to a test procedure. Complete the checklist during [Preparing the Installation Environment](./preparing-the-installation-environment).
:::

## Related Topics

- [Network Requirements](./network-requirements)
- [Deployment Architecture](./deployment-architecture)
- [Supported Platforms](./supported-platforms)
- [Preparing the Installation Environment](./preparing-the-installation-environment)
- [Installation Guide](../introduction_icg)
