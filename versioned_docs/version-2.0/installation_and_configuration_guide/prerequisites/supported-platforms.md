---
id: supported-platforms
title: Supported Platforms
description: Operating systems, hypervisors, and platforms supported by StorageSphere Enterprise 2.0.
sidebar_position: 2
---

# Supported Platforms

## Overview

This topic identifies the operating systems, hypervisors, and directory services that StorageSphere Enterprise 2.0 supports. Verify that your environment uses a supported platform before you install and configure the product.

NovaStor Technologies tests StorageSphere Enterprise 2.0 on the platforms listed in this topic. Platforms not listed might work but are not officially supported.

## Requirements

### Management server and collectors

Install the management server and collector agents on one of the following 64-bit operating systems.

| Platform | Supported versions | Role |
|---|---|---|
| Red Hat Enterprise Linux (RHEL) | 8.8+, 9.2+ | Management server, collector |
| Ubuntu Server LTS | 20.04, 22.04 | Management server, collector |
| SUSE Linux Enterprise Server (SLES) | 15 SP4+ | Management server, collector |
| Windows Server | 2019, 2022 | Collector only |

:::note
Windows Server supports collector agents only. Install the management server on a supported Linux distribution.
:::

### Hypervisors

You can deploy StorageSphere Enterprise components as virtual machines on the following hypervisors.

| Hypervisor | Supported versions |
|---|---|
| VMware vSphere | 7.0 U3+, 8.0 |
| Microsoft Hyper-V | Windows Server 2019, 2022 |
| KVM (QEMU) | RHEL 8.8+, Ubuntu 22.04 LTS |
| Nutanix AHV | AOS 6.5+ |

When you run components as virtual machines, allocate reserved CPU and memory resources. Storage metrics collection is sensitive to resource contention.

### Directory services

StorageSphere Enterprise integrates with the following directory services for authentication and RBAC group mapping.

| Directory service | Supported versions | Protocol |
|---|---|---|
| Microsoft Active Directory | Windows Server 2016 and later | LDAP, LDAPS |
| OpenLDAP | 2.4, 2.5, 2.6 | LDAP, LDAPS |

LDAP and Active Directory authentication require network connectivity from the management server to your directory service. See [Network Requirements](./network-requirements).

### Monitored storage systems

StorageSphere Enterprise 2.0 discovers and monitors storage systems from major vendors through SNMP, REST APIs, and vendor-specific agents. Supported categories include:

| Category | Examples |
|---|---|
| Block storage | Dell PowerStore, HPE Primera, IBM FlashSystem, NetApp AFF |
| File storage | NetApp ONTAP, Dell PowerScale, QNAP enterprise filers |
| Object storage | Dell ECS, IBM Cloud Object Storage (S3-compatible) |
| Software-defined storage | VMware vSAN, Ceph (Pacific release and later) |

Contact NovaStor Technologies support for a complete interoperability matrix for your storage vendor and firmware version.

## Supported Configurations

### Platform and role matrix

| Platform | Management server | Collector | PostgreSQL (external) |
|---|---|---|---|
| RHEL 8.8+ | Supported | Supported | Supported |
| RHEL 9.2+ | Supported | Supported | Supported |
| Ubuntu 20.04 LTS | Supported | Supported | Supported |
| Ubuntu 22.04 LTS | Supported | Supported | Supported |
| SLES 15 SP4+ | Supported | Supported | Supported |
| Windows Server 2019 | Not supported | Supported | Not applicable |
| Windows Server 2022 | Not supported | Supported | Not applicable |

### Browser support

| Browser | Minimum version |
|---|---|
| Microsoft Edge | 110 |
| Google Chrome | 110 |
| Mozilla Firefox | 110 |

:::tip
Enable TLS 1.2 or later on all platforms. StorageSphere Enterprise disables TLS 1.0 and TLS 1.1 during installation.
:::

## Recommendations

- Standardize on a single Linux distribution across management and collector hosts to simplify patching and support.
- Use LTS releases for production deployments. Non-LTS or interim releases are suitable for evaluation only.
- Keep hypervisor hosts and guest operating systems on vendor-supported patch levels.
- Confirm directory service connectivity and certificate trust before you enable LDAP or Active Directory authentication.
- Match platform sizing to [System Requirements](./system-requirements) before you select virtual or physical hardware.

## Related Topics

- [System Requirements](./system-requirements)
- [Deployment Architecture](./deployment-architecture)
- [Network Requirements](./network-requirements)
- [Preparing the Installation Environment](./preparing-the-installation-environment)
- [Installation Guide](../introduction_icg)
