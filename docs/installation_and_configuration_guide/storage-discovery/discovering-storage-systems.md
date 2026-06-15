---
id: discovering-storage-systems
title: Discovering Storage Systems
description: Steps to run storage discovery jobs in StorageSphere Enterprise 3.0.
sidebar_position: 2
---

# Discovering Storage Systems

## Overview

This topic describes how to discover storage systems in StorageSphere Enterprise 3.0. Discovery connects to configured storage systems, identifies managed resources, collects inventory metadata, and creates monitored objects for capacity and performance collection.

Run discovery after you add and validate a storage system connection. You can run discovery on demand during initial onboarding or schedule recurring discovery to detect configuration changes.

## Before You Begin

### Prerequisites

- Installed and licensed StorageSphere Enterprise 3.0. See [Installing the License](../installation/installing-the-license).
- Added at least one storage system connection. See [Adding a Storage System](./adding-a-storage-system).
- Storage system connection status is **Validated** or **Ready for discovery**.
- Assigned collector is healthy and connected to the management server.
- Service account has read access to inventory, capacity, configuration, and performance metadata.
- Discovery window approved by the storage operations team for production systems.

### Discovery prerequisites

| Prerequisite | Description | Validation method |
|---|---|---|
| Healthy collector | Collector can run discovery jobs and upload results | Check **Administration** > **Collectors** |
| Valid credentials | Service account can authenticate to the storage endpoint | Run **Validate connection** |
| Stable storage API | Vendor management API is available and not under maintenance | Confirm with storage administrator |
| Time synchronization | Collector and storage system clocks are synchronized | Verify NTP status |
| Inventory scope | Discovery scope is approved for the site or platform | Review planned systems and tags |

### Supported discovery protocols

| Platform | Primary protocol | Optional protocol | Typical discovered resources |
|---|---|---|---|
| Hitachi VSP 5000 | HTTPS REST API | SNMP status polling | Pools, parity groups, volumes, ports, hosts |
| Hitachi VSP One Block | HTTPS REST API | SNMP status polling | Pools, volumes, ports, hosts, replication pairs |
| Dell PowerStore | HTTPS REST API | Not required | Appliances, volumes, file systems, hosts, ports |
| NetApp ONTAP | HTTPS REST API | Not required | SVMs, aggregates, volumes, LUNs, shares, interfaces |
| Pure Storage FlashArray | HTTPS REST API | Not required | Arrays, pods, volumes, hosts, protection groups |

::::note
Discovery reads storage configuration and inventory. It does not create, modify, or delete storage resources on the monitored systems.
::::

## Procedure

### Step 1: Sign in to StorageSphere Enterprise

1. Open the StorageSphere Enterprise web UI.

2. Sign in as a user with the StorageSphere Administrator role.

3. Confirm that the assigned collector shows **Healthy**.

### Step 2: Open Storage Discovery

1. Go to **Administration** > **Storage Discovery**.

2. Select **Storage Systems**.

3. Select the storage system that you want to discover.

### Step 3: Review the connection

1. Confirm that the storage system details are correct.

   | Field | Expected value |
   |---|---|
   | Vendor type | Matches the storage platform |
   | Management endpoint | Uses the approved management FQDN or IP address |
   | Collector | Collector in the same network zone or site |
   | Connection status | **Validated** or **Ready for discovery** |
   | Tags | Site and environment tags are assigned |

2. Select **Validate connection** if validation has not run recently.

3. Resolve any validation errors before you start discovery.

### Step 4: Configure discovery options

1. Select **Start discovery**.

2. Select the discovery scope.

   | Scope | Use when |
   |---|---|
   | **Full discovery** | Initial onboarding or major storage configuration changes |
   | **Incremental discovery** | Routine refresh of known storage systems |
   | **Inventory only** | You want resource configuration without performance collection changes |
   | **Selected resources** | You want to limit discovery to specific storage virtual machines, pools, or arrays when supported |

3. Select whether to enable performance monitoring after successful discovery.

4. Select whether to apply default alert policies to discovered resources.

5. Review the discovery summary.

::::tip
Use full discovery for the first run. Use incremental discovery for recurring scans after the initial inventory is confirmed.
::::

### Step 5: Start discovery

1. Select **Start**.

2. Confirm that a discovery job is created.

3. Record the job ID for the deployment record.

   ```text
   Discovery job: DISC-20260613-00042
   ```

### Step 6: Monitor the discovery job

1. Go to **Administration** > **Storage Discovery** > **Discovery Jobs**.

2. Open the job created for the storage system.

3. Monitor the job state.

   | Job state | Description | Action |
   |---|---|---|
   | **Queued** | Job is waiting for collector capacity | Wait or review collector workload |
   | **Running** | Collector is querying the storage endpoint | Monitor progress |
   | **Completed** | Discovery completed successfully | Review discovered resources |
   | **Completed with warnings** | Discovery completed but some resources or metrics were skipped | Review warnings and remediate if needed |
   | **Failed** | Discovery did not complete | Review error details and logs |
   | **Canceled** | User canceled the job | Restart discovery when ready |

4. Review the job log for warnings, skipped resources, or permission errors.

### Step 7: Review discovered resources

1. Select **View discovered resources** from the completed job.

2. Confirm that expected resources are listed.

   | Platform | Expected resource examples |
   |---|---|
   | Hitachi VSP 5000 | Storage system, pools, parity groups, LDEVs, ports, host groups |
   | Hitachi VSP One Block | Storage system, pools, volumes, hosts, replication pairs |
   | Dell PowerStore | Cluster, appliances, volumes, file systems, hosts |
   | NetApp ONTAP | Cluster, SVMs, aggregates, volumes, LUNs, network interfaces |
   | Pure Storage FlashArray | Array, volumes, hosts, host groups, protection groups |

3. Confirm that resources have the correct site and environment tags.

4. Enable monitoring for any discovered resources that were not enabled automatically.

## Verification

Confirm that the following conditions are true after discovery completes.

| Check | Expected result |
|---|---|
| Discovery job | Job state is **Completed** or **Completed with warnings** |
| Resource inventory | Expected storage objects appear in inventory |
| Resource status | Discovered resources show **Managed** or **Monitored** |
| Tags | Site, environment, and ownership tags are applied |
| Monitoring | Capacity collection is active for discovered resources |
| Job log | No unresolved authentication, authorization, or API errors remain |

## Troubleshooting

### Discovery job remains queued

- Confirm that the assigned collector is online and healthy.
- Review concurrent discovery jobs and collector workload.
- Confirm that the collector service is running.
- Start discovery again after collector capacity is available.

### Discovery completes with warnings

- Open the discovery job log and review each warning.
- Confirm that the service account can read all expected resource types.
- Check whether unsupported or offline resources were skipped.
- Run incremental discovery after correcting permissions or platform issues.

### Discovery fails during inventory collection

- Validate the storage system connection again.
- Confirm that the storage management API is available.
- Review collector logs for API timeout, TLS, or authentication errors.
- Reduce discovery scope if the storage system is under heavy administrative load.

::::warning
Do not repeatedly restart failed discovery jobs without reviewing the failure reason. Repeated API retries can increase load on storage management controllers during an outage.
::::

## Related Topics

- [Adding a Storage System](./adding-a-storage-system)
- [Verifying Storage Discovery](./verifying-storage-discovery)
- [Troubleshooting Storage Discovery](./troubleshooting-storage-discovery)
- [Network Requirements](../prerequisites/network-requirements)
- [Firewall Requirements](../prerequisites/firewall-requirements)
