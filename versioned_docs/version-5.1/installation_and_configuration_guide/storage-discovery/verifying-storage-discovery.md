---
id: verifying-storage-discovery
title: Verifying Storage Discovery
description: Steps to verify discovered storage resources and discovery health in StorageSphere Enterprise 3.0.
sidebar_position: 3
---

# Verifying Storage Discovery

## Overview

This topic describes how to verify storage discovery in StorageSphere Enterprise 3.0. Verification confirms that discovered resources are complete, correctly tagged, associated with the expected storage system, and ready for monitoring.

Verify discovery immediately after the first discovery run for each storage system. Repeat verification after major storage configuration changes, collector changes, credential updates, or platform upgrades.

## Before You Begin

### Prerequisites

- Installed and licensed StorageSphere Enterprise 3.0. See [Installing the License](../installation/installing-the-license).
- Added a storage system connection. See [Adding a Storage System](./adding-a-storage-system).
- Completed at least one discovery job. See [Discovering Storage Systems](./discovering-storage-systems).
- Storage system connection status is **Validated**.
- Access to the expected inventory list from the storage administrator or configuration management database.
- StorageSphere Administrator or Storage Operator role access.

### Required information

Collect the following values before you start.

| Item | Example | Used for |
|---|---|---|
| Storage system name | `netapp-ontap-prod-01` | Locate the discovered system |
| Discovery job ID | `DISC-20260613-00042` | Review discovery results |
| Expected resource count | `128 volumes` | Compare discovered inventory |
| Site tag | `DC1` | Confirm reporting and ownership |
| Service owner | `storage-platform-team` | Confirm alert routing |

### Discovery status values

| Status | Description | Action |
|---|---|---|
| **Validated** | Connection test succeeded | Start or rerun discovery when needed |
| **Discovering** | A discovery job is running | Monitor job progress |
| **Discovered** | Inventory was collected successfully | Review resources and enable monitoring |
| **Partially discovered** | Some resources were discovered and some were skipped | Review job warnings |
| **Discovery failed** | Discovery job did not complete | Troubleshoot the failure |
| **Stale** | Inventory has not been refreshed within the expected interval | Run incremental discovery |

::::note
Resource counts can differ from vendor tools when StorageSphere Enterprise filters unsupported, offline, or access-restricted objects. Review discovery warnings before treating a count difference as a defect.
::::

## Procedure

### Step 1: Sign in to StorageSphere Enterprise

1. Open the StorageSphere Enterprise web UI.

2. Sign in as a user with StorageSphere Administrator or Storage Operator access.

3. Confirm that the main dashboard is available.

### Step 2: Open Storage Discovery

1. Go to **Administration** > **Storage Discovery**.

2. Select **Storage Systems**.

3. Select the storage system that you want to verify.

### Step 3: Confirm connection and discovery status

1. Review the storage system summary.

   | Field | Expected result |
   |---|---|
   | Connection status | **Validated** |
   | Discovery status | **Discovered** or **Partially discovered** |
   | Last discovery | Matches the expected discovery window |
   | Assigned collector | Collector is **Healthy** |
   | Monitoring status | **Enabled** for resources that require monitoring |

2. If the discovery status is **Stale**, select **Start discovery** and run incremental discovery.

3. If the discovery status is **Discovery failed**, open the most recent failed job and review the error details.

### Step 4: Review the discovery job

1. Select **Discovery Jobs**.

2. Open the most recent job for the storage system.

3. Confirm the job state.

   | Job field | Expected result |
   |---|---|
   | State | **Completed** or **Completed with warnings** |
   | Duration | Within the expected window for the platform size |
   | Collector | Matches the assigned collector |
   | Resources discovered | Matches or reasonably aligns with expected inventory |
   | Errors | No unresolved critical errors |

4. Download or copy the job summary for the deployment record if required by your change process.

### Step 5: Validate discovered resources

1. Select **View discovered resources**.

2. Filter by resource type.

3. Compare discovered resources with the expected platform inventory.

   | Platform | Resource checks |
   |---|---|
   | Hitachi VSP 5000 | Confirm storage system, pools, LDEVs, ports, and host groups |
   | Hitachi VSP One Block | Confirm pools, volumes, hosts, and replication relationships |
   | Dell PowerStore | Confirm appliances, volumes, file systems, hosts, and ports |
   | NetApp ONTAP | Confirm cluster, SVMs, aggregates, volumes, LUNs, and interfaces |
   | Pure Storage FlashArray | Confirm array, volumes, hosts, host groups, and protection groups |

4. Open a representative resource and confirm that capacity and identity fields are populated.

5. Confirm that site, environment, and ownership tags are applied.

### Step 6: Confirm monitoring readiness

1. Go to **Monitoring** > **Storage Inventory**.

2. Search for the storage system.

3. Confirm that resources appear in the inventory views.

4. Confirm that capacity metrics are being collected.

   | Metric category | Expected result |
   |---|---|
   | Capacity | Total, used, and available capacity values are present |
   | Configuration | Resource names, identifiers, and relationships are present |
   | Health | Resource status is available when supported by the platform |
   | Performance | IOPS, throughput, and latency metrics populate after the first polling interval |

5. Confirm that alert policies are assigned if your deployment uses default policies.

::::tip
Allow at least one polling interval after discovery before validating performance charts. Inventory can appear before performance metrics are populated.
::::

## Verification

Confirm that the following conditions are true before handing over the storage system for operations.

| Check | Expected result |
|---|---|
| Storage system | System appears in **Storage Systems** and **Storage Inventory** |
| Discovery job | Most recent job is **Completed** or has only reviewed warnings |
| Inventory completeness | Expected resource types and counts are present |
| Resource relationships | Pools, volumes, hosts, and ports show expected associations |
| Tags and ownership | Required tags and owner fields are populated |
| Monitoring readiness | Capacity metrics are present and performance metrics begin populating |
| Alerts | Default or approved alert policies are assigned |

## Troubleshooting

### Expected resources are missing

- Confirm that the discovery job completed after the resource was created on the storage platform.
- Verify that the service account has access to the missing resource type.
- Check whether the resource is offline, unmapped, or unsupported.
- Run full discovery if incremental discovery does not detect the resource.

### Resource counts do not match vendor tools

- Review discovery warnings for skipped or unsupported resources.
- Confirm that filters, tags, or selected-resource discovery scope did not exclude objects.
- Compare resource type definitions with the storage administrator. For example, vendor tools might count snapshots or internal volumes differently from monitored production volumes.
- Run verification against a current export from the storage platform.

### Metrics do not appear after discovery

- Confirm that monitoring is enabled for the discovered resources.
- Wait for the next scheduled polling interval.
- Verify that the collector remains healthy after discovery.
- Review collector logs for metric polling errors.

## Related Topics

- [Adding a Storage System](./adding-a-storage-system)
- [Discovering Storage Systems](./discovering-storage-systems)
- [Troubleshooting Storage Discovery](./troubleshooting-storage-discovery)
- [Network Requirements](../prerequisites/network-requirements)
- [Deployment Architecture](../prerequisites/deployment-architecture)
