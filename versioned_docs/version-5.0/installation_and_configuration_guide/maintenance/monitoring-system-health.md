---
id: monitoring-system-health
title: Monitoring System Health
description: Steps to monitor StorageSphere Enterprise system health.
sidebar_position: 3
---

# Monitoring System Health

## Overview

This topic describes how to monitor StorageSphere Enterprise system health. System health monitoring helps administrators confirm that the management server, database, collectors, discovery jobs, alert processing, reporting services, and integrations are operating normally.

Monitor system health during daily operations, after maintenance, after upgrades, and before starting large discovery or reporting jobs.

## Before You Begin

### Prerequisites

- Installed and licensed StorageSphere Enterprise. See [Installing the License](../installation/installing-the-license).
- StorageSphere Administrator or Storage Operator role access.
- Configured email notifications for health alerts. See [Configuring Email Notifications](../installation/configuring-email-notifications).
- Healthy HTTPS access to the web UI. See [Configuring HTTPS](../security-configuration/configuring-https).
- Defined operational thresholds for CPU, memory, disk, database, and collector status.

### Health components

| Component | Health indicators | Typical owner |
|---|---|---|
| Management server | Service status, CPU, memory, disk, web UI response | StorageSphere administrator |
| PostgreSQL database | Connection status, storage usage, query latency, backup age | Database administrator |
| Collectors | Heartbeat, job queue, upload status, version | StorageSphere administrator |
| Discovery jobs | Failure rate, duration, queued jobs, warnings | Storage administrator |
| Notifications | SMTP status, alert delivery, retry queue | Messaging administrator |
| Certificates | Expiration, trust status, TLS profile | Security administrator |

### Recommended monitoring intervals

| Check | Recommended interval | Notes |
|---|---|---|
| Dashboard health | Daily | Review at the start of the operations shift |
| Collector heartbeats | Daily or alert-driven | Investigate missed heartbeats promptly |
| Disk utilization | Daily | Prevent log and database volume exhaustion |
| Database backup age | Daily | Coordinate with database protection policy |
| Certificate expiration | Weekly | Increase frequency within 60 days of expiration |
| Failed discovery jobs | Daily | Resolve recurring platform or credential issues |

::::tip
Create an operations checklist that maps each health indicator to an owner and escalation path. Clear ownership reduces delays during incidents.
::::

## Procedure

### Step 1: Open the system health dashboard

1. Open the StorageSphere Enterprise web UI.

2. Sign in as a user with StorageSphere Administrator or Storage Operator access.

3. Go to **Administration** > **System Health**.

4. Review the overall system status.

   | Status | Meaning | Action |
   |---|---|---|
   | **Healthy** | No active critical or warning conditions | Continue routine monitoring |
   | **Warning** | A condition requires review | Investigate the affected component |
   | **Critical** | A service or dependency requires immediate action | Follow incident response procedures |
   | **Maintenance** | System is in an approved maintenance window | Validate expected maintenance state |

### Step 2: Check management server health

1. Select **Management Server**.

2. Review service and resource status.

   | Metric | Recommended threshold |
   |---|---|
   | CPU utilization | Sustained utilization below 80% |
   | Memory utilization | Sustained utilization below 85% |
   | Root volume free space | At least 20% free |
   | Application data volume free space | At least 25% free |
   | Web UI response | Within your operations baseline |

3. Review recent service restarts and health events.

### Step 3: Check database health

1. Select **Database**.

2. Confirm that the database connection status is **Connected**.

3. Review database health indicators.

   | Check | Expected result |
   |---|---|
   | Connection | Connected |
   | Database latency | Within normal baseline |
   | Database storage | Sufficient free space |
   | Backup age | Within recovery policy |
   | Replication status | Healthy, if database replication is configured |

4. Contact the database administrator if latency, storage, or backup checks show warnings.

### Step 4: Check collector health

1. Go to **Administration** > **Collectors**.

2. Review collector status.

   | Collector status | Meaning | Action |
   |---|---|---|
   | **Healthy** | Collector is connected and sending heartbeats | No action required |
   | **Degraded** | Collector is connected but reporting warnings | Review resource usage and logs |
   | **Offline** | Collector heartbeat is missing | Check network and collector service |
   | **Version mismatch** | Collector version differs from management server | Upgrade or repair the collector |

3. Open each warning or critical collector and review job queue and upload status.

### Step 5: Review discovery and monitoring jobs

1. Go to **Administration** > **Storage Discovery** > **Discovery Jobs**.

2. Filter jobs by **Failed** and **Completed with warnings**.

3. Review recurring failures by storage system, collector, and error type.

4. Resolve credential, network, or platform API issues before scheduling additional discovery jobs.

### Step 6: Configure health notifications

1. Go to **Administration** > **Notifications**.

2. Select **System health events**.

3. Enable notifications for critical health events.

4. Set recipients.

   ```text
   storage-operations@corp.example.com
   ```

5. Send a test notification.

::::note
Route critical health alerts to a monitored distribution list or incident management integration. Avoid routing production health alerts to an individual mailbox.
::::

## Verification

Confirm that the following conditions are true.

| Check | Expected result |
|---|---|
| Overall status | System status is **Healthy** or expected **Maintenance** |
| Management server | Services are running and resources are within thresholds |
| Database | Connection, storage, and backup age are healthy |
| Collectors | All production collectors are **Healthy** |
| Discovery jobs | No unresolved recurring failures |
| Notifications | Health alert test message is delivered |

## Troubleshooting

### Overall status shows Warning

- Open the affected component and review the warning details.
- Confirm whether the warning is expected during maintenance.
- Review recent changes, failed jobs, and service restarts.
- Assign the issue to the component owner.

### Collector shows Offline

- Confirm network connectivity between the collector and management server.
- Verify that the collector service is running.
- Check whether firewall rules allow collector communication.
- Review collector logs for registration or TLS errors.

### Database health shows Critical

- Confirm database service status.
- Check database host storage usage.
- Review database logs for connection or authentication failures.
- Coordinate with the database administrator before restarting database services.

## Related Topics

- [Managing Log Files](./managing-log-files)
- [Backing Up the Configuration](./backing-up-the-configuration)
- [Discovering Storage Systems](../storage-discovery/discovering-storage-systems)
- [Configuring Email Notifications](../installation/configuring-email-notifications)
- [Network Requirements](../prerequisites/network-requirements)
