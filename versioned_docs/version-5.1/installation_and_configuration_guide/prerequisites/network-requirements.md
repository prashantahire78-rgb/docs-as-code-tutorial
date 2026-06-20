---
id: network-requirements
title: Network Requirements
description: Network connectivity, DNS, time synchronization, and port requirements for StorageSphere Enterprise 3.0.
sidebar_position: 4
---

# Network Requirements

## Overview

This topic describes the network connectivity, naming, and time synchronization requirements for StorageSphere Enterprise 3.0. Proper network configuration ensures reliable discovery, metric collection, authentication, and alert delivery across your storage infrastructure.

Review this topic together with [Firewall Requirements](./firewall-requirements) and [Deployment Architecture](./deployment-architecture) before you install and configure the product.

## Requirements

### Connectivity paths

The following connectivity paths must be available in your environment.

| Source | Destination | Protocol | Purpose |
|---|---|---|---|
| Administrator workstation | Management server | HTTPS (443) | Web UI and REST API access |
| Management server | PostgreSQL database | TCP (5432) | Database queries and writes |
| Management server | Collector agents | HTTPS (8443) | Registration, configuration, health checks |
| Collector agents | Management server | HTTPS (443) | Metric and event upload |
| Collector agents | Managed storage devices | SNMP (161/162), HTTPS, vendor-specific | Discovery and polling |
| Management server | LDAP / Active Directory | LDAP (389) or LDAPS (636) | Authentication and group sync |
| Management server | SMTP relay | TCP (25), TCP (587), or TCP (465) | Email notifications for alerts and reports |
| All hosts | NTP server | UDP (123) | Time synchronization |

:::note
Port numbers listed in this topic are defaults. You can configure alternate ports during installation when your security policy requires non-standard assignments.
:::

### DNS and host naming

All StorageSphere Enterprise components must resolve host names through DNS or a managed hosts file.

| Requirement | Detail |
|---|---|
| Forward DNS | Each management server, collector, and database host has a resolvable A or AAAA record |
| Reverse DNS | PTR records are recommended for collector and management server hosts |
| Name consistency | Host names in DNS match the names configured during installation |
| Search domains | Collector hosts can resolve short names for storage devices in local domains |

Use fully qualified domain names (FQDNs) in configuration files and certificates. Mixed short-name and FQDN references cause TLS validation failures.

### Time synchronization

Accurate time stamps are required for alert correlation, performance trending, and audit logs.

| Requirement | Detail |
|---|---|
| Protocol | NTP or chrony |
| Maximum drift | ± 5 seconds between all components |
| Stratum | Use internal NTP servers stratum 8 or better |
| Time zone | Configure all servers in UTC; display local time in the web UI |

:::warning
If system clocks drift beyond five seconds, alert timestamps become unreliable and scheduled reports might execute at incorrect intervals.
:::

### Bandwidth and latency

| Path | Minimum bandwidth | Maximum latency |
|---|---|---|
| Collector to management server | 10 Mbps | 100 ms |
| Management server to database | 100 Mbps | 10 ms |
| Administrator to management server | 1 Mbps | 200 ms |
| Collector to storage devices | 10 Mbps | 50 ms per device (average) |

Estimate an additional 50 KB per asset per polling cycle for collector-to-server traffic. Increase bandwidth when you poll performance metrics at intervals shorter than five minutes.

### TLS and certificates

StorageSphere Enterprise requires TLS for all HTTPS communication.

| Connection | TLS version | Certificate requirement |
|---|---|---|
| Administrator to management server | TLS 1.2 or later | Trusted CA-signed or enterprise PKI certificate |
| Collector to management server | TLS 1.2 or later | Mutual TLS supported; server certificate required |
| Management server to LDAPS | TLS 1.2 or later | Directory server certificate trusted by management server |
| Management server to SMTP (STARTTLS) | TLS 1.2 or later | SMTP relay certificate trusted by management server |

## Supported Configurations

### Single-site deployment

In a single-site deployment, the management server, database, and collectors reside in one data center. All components connect through internal LAN segments. External access is limited to administrator workstations on the corporate network or through a VPN.

### Multi-site deployment

In a multi-site deployment, each site has one or more collectors. Collectors forward data to a central management server over WAN or MPLS links. Requirements:

- WAN links meet bandwidth and latency targets in the table above
- DNS resolves the central management server from each site
- Firewalls allow outbound HTTPS from collectors to the management server

### Reverse proxy configuration

You can place a reverse proxy or load balancer in front of the management server.

| Feature | Requirement |
|---|---|
| Protocol termination | TLS 1.2 or later at the proxy |
| Header forwarding | Forward `X-Forwarded-For` and `X-Forwarded-Proto` |
| Session affinity | Sticky sessions required if you deploy multiple management server instances |
| WebSocket support | Required for real-time alert notifications in the web UI |

## Recommendations

- Dedicate a management VLAN for StorageSphere Enterprise components.
- Use internal DNS zones for collector and server host names.
- Configure NTP before you install any component.
- Test LDAP and SMTP connectivity from the management server host before installation.
- Document all non-default port assignments and provide them to your network team for firewall configuration. See [Firewall Requirements](./firewall-requirements).
- Verify that collectors can reach storage management interfaces on required subnets before you run discovery.

:::tip
Run a network path test from each planned collector host to at least one storage management IP address and to the management server FQDN. Record latency and packet loss results for your deployment checklist.
:::

## Related Topics

- [Firewall Requirements](./firewall-requirements)
- [Deployment Architecture](./deployment-architecture)
- [System Requirements](./system-requirements)
- [Supported Platforms](./supported-platforms)
- [Preparing the Installation Environment](./preparing-the-installation-environment)
- [Installation Guide](../introduction_icg)
