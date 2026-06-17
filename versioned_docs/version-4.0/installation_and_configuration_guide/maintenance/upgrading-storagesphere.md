---
id: upgrading-storagesphere
title: Upgrading StorageSphere
description: Steps to upgrade StorageSphere Enterprise components.
sidebar_position: 5
---

# Upgrading StorageSphere

## Overview

This topic describes how to upgrade StorageSphere Enterprise. An upgrade updates the management server, database schema, collectors, and related services to a newer supported maintenance or feature release.

Plan upgrades during an approved maintenance window. Always create and verify a configuration backup before upgrading.

## Before You Begin

### Prerequisites

- Current StorageSphere Enterprise deployment is healthy. See [Monitoring System Health](./monitoring-system-health).
- Verified configuration backup. See [Backing Up the Configuration](./backing-up-the-configuration).
- Supported target version and upgrade package from NovaStor Technologies.
- Linux administrator access to the management server and collector hosts.
- StorageSphere Administrator role access.
- Database backup completed according to your database protection policy.
- Maintenance window approved by storage, network, database, and security stakeholders.

### Upgrade order

| Component | Upgrade order | Notes |
|---|---|---|
| Management server | 1 | Upgrade first to apply application and schema changes |
| Database schema | 2 | Applied by the management server upgrade workflow |
| Collectors | 3 | Upgrade after the management server is healthy |
| Integrations | 4 | Validate REST API clients, notifications, and reporting after core services |

### Required information

Collect the following values before you start.

| Item | Example | Used for |
|---|---|---|
| Current version | `3.0.1` | Upgrade eligibility |
| Target version | `3.0.3` | Upgrade package validation |
| Upgrade package | `storagesphere-enterprise-3.0.3.tar.gz` | Installation source |
| Backup file | `ssphere-config-20260613-170500.tar.gz.enc` | Rollback readiness |
| Maintenance record | `CHG-104900` | Change tracking |
| Support contact | `support@novastor.example` | Escalation |

::::warning
Do not start an upgrade when system health is critical, database backup is incomplete, or a verified configuration backup is unavailable.
::::

## Procedure

### Step 1: Review release information

1. Review the release notes for the target version.

2. Confirm supported source and target versions.

3. Identify required post-upgrade actions, deprecated features, and compatibility notes.

4. Confirm that all collectors and integrations are supported with the target version.

### Step 2: Run pre-upgrade checks

1. Sign in to the management server.

2. Run the pre-upgrade check.

   ```bash
   sudo ssphere-maintenance upgrade precheck \
    --package /tmp/storagesphere-enterprise-3.0.3.tar.gz
   ```

3. Review the results.

   | Check | Expected result |
   |---|---|
   | Version compatibility | Passed |
   | Disk space | Passed |
   | Database connection | Passed |
   | Backup availability | Passed |
   | Service health | Passed |
   | Collector compatibility | Passed |

4. Resolve any failed pre-check before continuing.

### Step 3: Back up configuration and database

1. Create a configuration backup.

   ```bash
   sudo ssphere-maintenance backup create --output /var/backups/storagesphere --encrypt
   ```

2. Verify the backup.

   ```bash
   sudo ssphere-maintenance backup verify --file /var/backups/storagesphere/ssphere-config-20260613-170500.tar.gz.enc
   ```

3. Confirm that the database administrator completed the database backup.

4. Record backup file names in the maintenance record.

### Step 4: Place the system in maintenance mode

1. Go to **Administration** > **System Health**.

2. Select **Enter maintenance mode**.

3. Enter the maintenance reason.

   ```text
   StorageSphere Enterprise upgrade to 3.0.3
   ```

4. Confirm that alert suppression matches your change policy.

### Step 5: Upgrade the management server

1. Stop scheduled discovery jobs and reports if required by your change plan.

2. Run the upgrade command.

   ```bash
   sudo ssphere-maintenance upgrade apply \
    --package /tmp/storagesphere-enterprise-3.0.3.tar.gz
   ```

3. Review the upgrade summary.

4. Confirm that the management server service starts.

   ```bash
   sudo systemctl status ssphere-server
   ```

### Step 6: Upgrade collectors

1. Go to **Administration** > **Collectors**.

2. Filter collectors with status **Version mismatch**.

3. Select a collector and choose **Upgrade collector**.

4. Monitor the collector until it returns to **Healthy**.

5. Repeat for all production collectors.

::::tip
Upgrade collectors by site or maintenance group. This approach limits monitoring impact and makes rollback decisions easier.
::::

### Step 7: Validate post-upgrade health

1. Go to **Administration** > **System Health**.

2. Confirm that the management server, database, and collectors are healthy.

3. Run a post-upgrade validation.

   ```bash
   sudo ssphere-maintenance upgrade validate
   ```

4. Run an incremental discovery job for a representative storage system.

5. Send a test email notification.

6. Confirm that REST API clients can authenticate if your deployment uses API integrations.

### Step 8: Exit maintenance mode

1. Go to **Administration** > **System Health**.

2. Select **Exit maintenance mode**.

3. Confirm that alerts and scheduled jobs are active.

4. Update the maintenance record with validation results.

## Verification

Confirm that the following conditions are true.

| Check | Expected result |
|---|---|
| Product version | Web UI and CLI show the target version |
| System health | Overall status is **Healthy** |
| Database schema | Schema validation passes |
| Collectors | All production collectors are **Healthy** and at the target version |
| Discovery | Representative discovery job completes successfully |
| Notifications | Test notification is delivered |
| Integrations | REST API clients and reports operate normally |

## Troubleshooting

### Pre-upgrade check fails

- Review the failed check and recommended action.
- Confirm disk space on the management server and database host.
- Verify that the upgrade package matches the target version and platform.
- Resolve service health warnings before rerunning the pre-check.

### Management server does not start after upgrade

- Review `journalctl -u ssphere-server`.
- Confirm database connectivity.
- Check certificate paths and permissions.
- Do not upgrade collectors until the management server is healthy.

### Collector upgrade fails

- Confirm network connectivity between the collector and management server.
- Verify that the collector host has sufficient disk space.
- Review collector logs for package or permission errors.
- Retry the collector upgrade after resolving the error.

## Related Topics

- [Backing Up the Configuration](./backing-up-the-configuration)
- [Rolling Back an Upgrade](./rolling-back-an-upgrade)
- [Monitoring System Health](./monitoring-system-health)
- [Managing Log Files](./managing-log-files)
- [Configuring Email Notifications](../installation/configuring-email-notifications)
