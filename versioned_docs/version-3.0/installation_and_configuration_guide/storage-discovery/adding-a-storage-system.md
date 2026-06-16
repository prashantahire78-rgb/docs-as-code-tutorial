---
id: adding-a-storage-system
title: Adding a Storage System
description: Steps to add a storage system connection for discovery in StorageSphere Enterprise 3.0.
sidebar_position: 1
---

# Adding a Storage System

## Overview

This topic describes how to add a storage system connection in StorageSphere Enterprise 3.0. A storage system connection defines the management endpoint, vendor type, credentials, collector assignment, and discovery options used to discover inventory and begin monitoring.

Add storage systems after StorageSphere Enterprise is installed, licensed, and reachable from the storage management network. You can add storage systems one at a time when onboarding a new platform or site.

## Before You Begin

### Prerequisites

- Installed and licensed StorageSphere Enterprise 3.0. See [Installing the License](../installation/installing-the-license).
- StorageSphere Administrator role access.
- At least one healthy collector with network access to the storage management endpoint.
- DNS resolution and NTP synchronization configured for the management server, collectors, and storage systems. See [Network Requirements](../prerequisites/network-requirements).
- Firewall rules that allow the required vendor API or management protocol traffic from the collector to the storage system. See [Firewall Requirements](../prerequisites/firewall-requirements).
- Read-only or monitoring service account for each storage platform.

### Supported storage platforms

| Vendor platform | Example system | Discovery method | Notes |
|---|---|---|---|
| Hitachi VSP Series | Hitachi VSP 5000 | REST API over HTTPS | Use the management controller address or SVP address approved by your storage team |
| Hitachi VSP One Block | Hitachi VSP One Block 28 | REST API over HTTPS | Use a service account with inventory and performance read access |
| Dell PowerStore | Dell PowerStore 5000T | REST API over HTTPS | Use the cluster management FQDN or virtual IP |
| NetApp ONTAP | NetApp AFF A400 cluster | ONTAP REST API over HTTPS | Use the cluster management LIF, not a node management LIF |
| Pure Storage FlashArray | Pure Storage FlashArray//X | REST API over HTTPS | Use an API user or API token approved for monitoring |

### Required access

| Role | Access needed |
|---|---|
| StorageSphere administrator | Permission to add storage systems and start discovery |
| Storage administrator | Vendor endpoint, service account, and platform details |
| Network administrator | Confirmation that collector-to-storage ports are open |
| Security administrator | Approval for credential storage and TLS trust |

### Required connection information

Collect the following values before you start.

| Item | Example | Used for |
|---|---|---|
| Display name | `hitachi-vsp5000-prod-01` | Storage system identification in the web UI |
| Vendor type | `Hitachi VSP Series` | Discovery adapter selection |
| Management endpoint | `https://vsp5000-mgmt.corp.example.com` | API connection |
| Port | `443` | Collector-to-storage communication |
| Authentication method | `Username and password` | Credential validation |
| Service account | `ssphere_monitor` | Inventory and metric collection |
| Collector | `collector-dc1` | Discovery execution |
| Site or location | `DC1` | Inventory grouping and reporting |

::::note
Use a dedicated monitoring account for each storage platform. StorageSphere Enterprise does not require administrative write privileges for standard discovery and monitoring.
::::

## Procedure

### Step 1: Sign in to StorageSphere Enterprise

1. Open the StorageSphere Enterprise web UI.

2. Sign in as a user with the StorageSphere Administrator role.

3. Confirm that the dashboard loads without system health warnings.

### Step 2: Open Storage Discovery

1. Go to **Administration** > **Storage Discovery**.

2. Select **Storage Systems**.

3. Select **Add storage system**.

### Step 3: Select the storage platform

1. Select the vendor type.

   | Vendor type | Use for |
   |---|---|
   | **Hitachi VSP Series** | Hitachi VSP 5000 and supported VSP family systems |
   | **Hitachi VSP One Block** | Hitachi VSP One Block systems |
   | **Dell PowerStore** | Dell PowerStore appliances and clusters |
   | **NetApp ONTAP** | ONTAP clusters, including AFF and FAS systems |
   | **Pure Storage FlashArray** | FlashArray block storage systems |

2. Enter a display name that identifies the platform, site, and environment.

   ```text
   hitachi-vsp5000-prod-01
   ```

3. Enter an optional description.

   ```text
   Production VSP 5000 in DC1 storage network
   ```

### Step 4: Provide connection details

1. Enter the management endpoint.

   ```text
   https://vsp5000-mgmt.corp.example.com
   ```

2. Confirm the port.

   | Protocol | Default port | Use when |
   |---|---|---|
   | HTTPS REST API | `443` | Standard vendor API discovery |
   | HTTPS REST API on custom port | Site-specific | Your storage management endpoint uses a custom listener |
   | SNMP | `161` | Supplemental status polling when enabled for the platform |

3. Select the collector that has network access to the storage system.

4. Select the TLS validation mode.

   | Mode | Use when |
   |---|---|
   | `Strict` | The storage endpoint certificate is trusted by the collector |
   | `CA certificate` | You provide the internal CA certificate used by the storage endpoint |
   | `Allow self-signed certificate` | Temporary validation in non-production environments |

::::warning
Do not disable TLS validation for production discovery. If the storage endpoint uses an internal or self-signed certificate, import the issuing CA certificate into the collector trust store.
::::

### Step 5: Add credentials

1. Select the authentication method supported by the platform.

   | Platform | Supported authentication |
   |---|---|
   | Hitachi VSP Series | Username and password |
   | Hitachi VSP One Block | Username and password |
   | Dell PowerStore | Username and password |
   | NetApp ONTAP | Username and password |
   | Pure Storage FlashArray | API token or username and password |

2. Enter the service account user name or API token.

3. Enter the password or token secret.

4. Select **Store credentials securely**.

### Step 6: Validate the connection

1. Select **Validate connection**.

2. Review the validation results.

   | Check | Expected result |
   |---|---|
   | DNS resolution | Endpoint resolves from the selected collector |
   | Network connection | Collector reaches the endpoint on the configured port |
   | TLS validation | Certificate chain is trusted or approved |
   | Authentication | Service account signs in successfully |
   | Authorization | Service account has read access to inventory |

3. Resolve any failed check before you continue.

### Step 7: Save the storage system

1. Select **Save**.

2. Confirm that the storage system appears in the **Storage Systems** list.

3. Confirm that the connection status is **Validated** or **Ready for discovery**.

::::tip
Add site, environment, and business service tags before starting discovery. Consistent tags help reporting and alert routing after resources are discovered.
::::

## Verification

Confirm that the following conditions are true before you start discovery.

| Check | Expected result |
|---|---|
| Storage system record | The storage system appears under **Administration** > **Storage Discovery** > **Storage Systems** |
| Connection status | Status is **Validated** or **Ready for discovery** |
| Collector assignment | The assigned collector shows **Healthy** |
| Credential status | Credentials are stored and validation succeeds |
| TLS status | Certificate validation passes or an approved CA certificate is configured |

## Troubleshooting

### Connection validation fails

- Confirm that the management endpoint FQDN or IP address is correct.
- Verify that the selected collector can reach the endpoint on the configured port.
- Confirm that host-based and network firewalls allow collector-to-storage traffic.
- Check whether the storage management interface restricts access by source IP address.

### Authentication fails

- Confirm that the service account is enabled and not locked.
- Verify the password or API token with the storage administrator.
- Confirm that the account has read access to inventory, capacity, and performance data.
- For Pure Storage FlashArray, confirm that the API token has not expired or been revoked.

### TLS validation fails

- Confirm that the endpoint certificate matches the FQDN used in the connection.
- Import the issuing CA certificate into the collector trust store.
- Replace expired or weak certificates on the storage management endpoint.
- Use the platform management FQDN instead of an IP address when the certificate requires a DNS subject name.

## Related Topics

- [Discovering Storage Systems](./discovering-storage-systems)
- [Verifying Storage Discovery](./verifying-storage-discovery)
- [Troubleshooting Storage Discovery](./troubleshooting-storage-discovery)
- [Network Requirements](../prerequisites/network-requirements)
- [Firewall Requirements](../prerequisites/firewall-requirements)
