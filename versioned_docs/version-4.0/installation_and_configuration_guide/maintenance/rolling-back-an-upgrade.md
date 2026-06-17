---
id: rolling-back-an-upgrade
title: Rolling Back an Upgrade
description: Steps to roll back a StorageSphere Enterprise upgrade.
sidebar_position: 6
---

# Rolling Back an Upgrade

## Overview

This topic describes how to roll back a StorageSphere Enterprise upgrade. Rollback returns the management server configuration, application packages, and collector versions to the approved previous state when post-upgrade validation fails or a critical issue prevents production use.

Use rollback only when the issue cannot be resolved within the maintenance window or when your change plan requires returning to the previous version.

## Before You Begin

### Prerequisites

- Approved rollback decision from the change owner or incident commander.
- Verified configuration backup from before the upgrade. See [Backing Up the Configuration](./backing-up-the-configuration).
- Database backup from before the upgrade.
- Previous StorageSphere Enterprise package available.
- Linux administrator access to the management server and collector hosts.
- Maintenance mode enabled, or approval to enter maintenance mode.

### Rollback decision criteria

| Condition | Rollback recommended |
|---|---|
| Management server cannot start | Yes, if unresolved within the maintenance window |
| Database schema validation fails | Yes, coordinate with the database administrator |
| Critical collectors cannot reconnect | Yes, if monitoring coverage is impacted |
| Minor UI issue with workaround | No, document and continue if approved |
| Single storage discovery warning | No, troubleshoot the specific storage system |

### Required access

| Role | Access needed |
|---|---|
| StorageSphere administrator | Validate application settings after rollback |
| Linux administrator | Reinstall previous packages and restore configuration |
| Database administrator | Restore database backup if schema rollback is required |
| Change owner | Approve rollback and production communication |

::::warning
Rollback can discard changes made after the upgrade started. Confirm the business impact before restoring configuration and database backups.
::::

## Procedure

### Step 1: Confirm rollback scope

1. Review the failed validation or incident symptoms.

2. Confirm whether rollback must include:

   | Scope | Include when |
   |---|---|
   | Application packages | The upgraded application cannot run correctly |
   | Database restore | Schema or data compatibility prevents startup |
   | Configuration restore | Settings changed during or after upgrade |
   | Collector rollback | Collectors were upgraded and cannot communicate with the previous management server |

3. Record the rollback decision in the maintenance record.

### Step 2: Enter maintenance mode

1. Open the StorageSphere Enterprise web UI if available.

2. Go to **Administration** > **System Health**.

3. Select **Enter maintenance mode**.

4. If the web UI is unavailable, set maintenance mode from the command line.

   ```bash
   sudo ssphere-maintenance mode enable --reason "Rollback upgrade"
   ```

### Step 3: Stop services

1. Stop the management server service.

   ```bash
   sudo systemctl stop ssphere-server
   ```

2. Stop local collector services if they run on the management server.

   ```bash
   sudo systemctl stop ssphere-collector
   ```

3. Confirm that services are stopped.

### Step 4: Restore the previous application version

1. Run the rollback command with the previous package.

   ```bash
   sudo ssphere-maintenance upgrade rollback \
    --package /tmp/storagesphere-enterprise-3.0.1.tar.gz
   ```

2. Review the rollback summary.

3. Confirm that package versions match the previous approved version.

   ```bash
   sudo ssphere-version
   ```

### Step 5: Restore database if required

1. Coordinate with the database administrator.

2. Restore the database backup created before the upgrade.

3. Confirm database connectivity from the management server.

   ```bash
   sudo ssphere-maintenance database check
   ```

::::note
Some upgrades include database schema changes. If schema rollback is required, restore the database backup created immediately before the upgrade.
::::

### Step 6: Restore configuration

1. Restore the pre-upgrade configuration backup.

   ```bash
   sudo ssphere-maintenance restore configuration \
     --file /var/backups/storagesphere/ssphere-config-pre-upgrade.tar.gz.enc
   ```

2. Enter the backup encryption passphrase when prompted.

3. Confirm that the restore completes successfully.

### Step 7: Roll back collectors

1. Start the management server service.

   ```bash
   sudo systemctl start ssphere-server
   ```

2. Go to **Administration** > **Collectors**.

3. Identify collectors with version mismatch.

4. Roll back each collector to the previous approved version.

   ```bash
   sudo ssphere-maintenance collector rollback --target-version 3.0.1
   ```

5. Confirm that each collector returns to **Healthy**.

### Step 8: Validate rollback

1. Run rollback validation.

   ```bash
   sudo ssphere-maintenance upgrade validate --rollback
   ```

2. Sign in to the web UI.

3. Confirm system health, license status, authentication, collectors, and discovery jobs.

4. Exit maintenance mode after validation is complete.

## Verification

Confirm that the following conditions are true.

| Check | Expected result |
|---|---|
| Product version | Version matches the previous approved release |
| Services | Management server and collectors are running |
| Database | Database connectivity and schema validation pass |
| Configuration | Settings match the pre-upgrade backup |
| Collectors | Production collectors are **Healthy** |
| Monitoring | Inventory, alerts, and reports operate normally |
| Maintenance mode | Disabled after rollback validation |

## Troubleshooting

### Rollback command fails

- Confirm that the previous package exists and matches the installed platform.
- Review `maintenance.log` for package or permission errors.
- Verify available disk space for package staging.
- Contact NovaStor Technologies support before retrying if package rollback fails repeatedly.

### Database restore is required but unavailable

- Stop rollback and escalate to the database administrator and change owner.
- Confirm whether a database snapshot or enterprise backup is available.
- Do not start the previous application version against an incompatible database schema.

### Collectors remain at the upgraded version

- Confirm collector host connectivity and service status.
- Roll back collectors manually during the maintenance window.
- Review collector logs for package installation errors.
- Keep affected collectors disabled until version compatibility is restored.

## Related Topics

- [Upgrading StorageSphere](./upgrading-storagesphere)
- [Restoring the Configuration](./restoring-the-configuration)
- [Backing Up the Configuration](./backing-up-the-configuration)
- [Monitoring System Health](./monitoring-system-health)
- [Managing Log Files](./managing-log-files)
