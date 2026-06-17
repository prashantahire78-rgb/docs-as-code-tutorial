---
id: uninstalling-storagesphere
title: Uninstalling StorageSphere
description: Steps to uninstall StorageSphere Enterprise components.
sidebar_position: 7
---

# Uninstalling StorageSphere

## Overview

This topic describes how to uninstall StorageSphere Enterprise. Uninstallation removes StorageSphere services and packages from the management server and collectors. Depending on your selection, the process can preserve or remove configuration, logs, certificates, and local application data.

Use this topic for decommissioning, lab cleanup, failed installation recovery, or migration to a replacement deployment.

## Before You Begin

### Prerequisites

- Approved decommission or cleanup request.
- StorageSphere Administrator role access.
- Linux administrator access to the management server and collector hosts.
- Verified configuration backup if you might reinstall or migrate. See [Backing Up the Configuration](./backing-up-the-configuration).
- Exported reports, audit logs, or compliance evidence required by your organization.
- Confirmation that monitored storage systems no longer depend on this StorageSphere deployment for operations.

### Uninstall options

| Option | Removes | Preserves | Use when |
|---|---|---|---|
| Standard uninstall | Services and packages | Configuration, logs, certificates | You might reinstall on the same host |
| Full uninstall | Services, packages, configuration, local data | External database backups and exported evidence | Decommissioning the deployment |
| Collector-only uninstall | Collector service and package | Management server configuration until removed | Removing a collector host |
| Dry run | Nothing | Nothing | Validating impact before uninstall |

### Required access

| Role | Access needed |
|---|---|
| StorageSphere administrator | Remove collectors and validate decommission status |
| Linux administrator | Stop services and remove packages |
| Database administrator | Decommission or preserve database according to policy |
| Security administrator | Validate certificate, key, and credential removal |

::::warning
Full uninstall can remove local configuration, credentials, logs, and certificates. Create and verify backups before running a full uninstall.
::::

## Procedure

### Step 1: Prepare for uninstall

1. Notify administrators and operations teams of the planned uninstall.

2. Stop scheduled reports and discovery jobs.

3. Export audit logs or compliance reports if required.

4. Create a final configuration backup.

   ```bash
   sudo ssphere-maintenance backup create --output /var/backups/storagesphere --encrypt
   ```

5. Copy the backup off host.

### Step 2: Place the system in maintenance mode

1. Go to **Administration** > **System Health**.

2. Select **Enter maintenance mode**.

3. Enter the reason.

   ```text
   StorageSphere Enterprise decommission
   ```

4. Confirm that scheduled jobs and alerts are suppressed according to your change plan.

### Step 3: Remove collectors from the management server

1. Go to **Administration** > **Collectors**.

2. Select the collector that you want to remove.

3. Confirm that no discovery or monitoring jobs are running on the collector.

4. Select **Remove collector**.

5. Repeat for each collector in the deployment.

### Step 4: Uninstall collector packages

1. Sign in to the collector host.

2. Stop the collector service.

   ```bash
   sudo systemctl stop ssphere-collector
   ```

3. Run the collector uninstall command.

   ```bash
   sudo ssphere-maintenance uninstall collector
   ```

4. Confirm that the collector service is removed.

   ```bash
   systemctl status ssphere-collector
   ```

### Step 5: Uninstall the management server

1. Sign in to the management server.

2. Run a dry run to review the uninstall plan.

   ```bash
   sudo ssphere-maintenance uninstall server --dry-run
   ```

3. Review the summary.

   | Item | Expected action |
   |---|---|
   | Services | Stop and disable |
   | Packages | Remove |
   | Configuration | Preserve for standard uninstall |
   | Logs | Preserve for standard uninstall |
   | Local data | Preserve unless full uninstall is selected |

4. Run the standard uninstall.

   ```bash
   sudo ssphere-maintenance uninstall server
   ```

5. For a full decommission, run the full uninstall only after backups and evidence exports are confirmed.

   ```bash
   sudo ssphere-maintenance uninstall server --remove-data
   ```

::::note
If StorageSphere Enterprise uses an external PostgreSQL database, uninstalling the management server does not automatically remove the external database. Coordinate database cleanup with the database administrator.
::::

### Step 6: Clean up external dependencies

1. Remove DNS aliases that are no longer required.

2. Remove firewall rules created only for this deployment.

3. Revoke or disable service accounts used for storage discovery, LDAP, Active Directory, SMTP, and API integrations.

4. Remove certificates and private keys according to security policy.

5. Archive final backups and logs according to retention requirements.

### Step 7: Confirm decommission status

1. Confirm that StorageSphere services are not running.

   ```bash
   systemctl list-units 'ssphere*'
   ```

2. Confirm that administrator access to the web UI is no longer available.

3. Confirm that collectors no longer send heartbeats.

4. Update the decommission record.

## Verification

Confirm that the following conditions are true.

| Check | Expected result |
|---|---|
| Management server services | StorageSphere services are stopped and removed |
| Collector services | Collector services are stopped and removed |
| Web UI | Web UI is no longer available |
| Backups | Final backup exists in approved repository |
| External database | Preserved or removed according to decommission plan |
| Service accounts | Disabled or revoked |
| Firewall and DNS | Rules and records are removed or updated |

## Troubleshooting

### Uninstall command fails

- Confirm that no StorageSphere jobs are running.
- Verify that the administrator has `sudo` access.
- Review `/var/log/ssphere/maintenance.log`.
- Stop services manually and retry the uninstall command.

### Collector cannot be removed from the web UI

- Confirm that the collector is not running active jobs.
- Disable scheduled discovery jobs assigned to the collector.
- Remove the collector from the command line if the web UI is unavailable.

### External database remains after uninstall

- Confirm whether database preservation was intentional.
- Coordinate cleanup with the database administrator.
- Export or retain data according to compliance requirements before deleting database objects.

## Related Topics

- [Backing Up the Configuration](./backing-up-the-configuration)
- [Managing Log Files](./managing-log-files)
- [Monitoring System Health](./monitoring-system-health)
- [Restoring the Configuration](./restoring-the-configuration)
- [Installing StorageSphere Server](../installation/installing-storagesphere-server)
