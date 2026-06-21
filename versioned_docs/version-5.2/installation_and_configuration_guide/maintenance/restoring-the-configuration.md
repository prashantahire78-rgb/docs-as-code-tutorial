---
id: restoring-the-configuration
title: Restoring the Configuration
description: Steps to restore StorageSphere Enterprise 3.0 configuration from a verified backup.
sidebar_position: 2
---

# Restoring the Configuration

## Overview

This topic describes how to restore the StorageSphere Enterprise 3.0 configuration from a verified backup. Restore configuration when recovering from configuration corruption, failed maintenance, host replacement, or a controlled rollback plan.

Restore only from backups that were created and verified for the same StorageSphere Enterprise major version unless NovaStor Technologies support provides different guidance.

## Before You Begin

### Prerequisites

- Verified configuration backup. See [Backing Up the Configuration](./backing-up-the-configuration).
- Installed StorageSphere Server at the target version. See [Installing StorageSphere Server](../installation/installing-storagesphere-server).
- Configured database connection or restored database according to your database recovery plan.
- StorageSphere Administrator role access or Linux administrator access to the management server.
- Certificate backup package if HTTPS certificates must be restored.
- Approved maintenance window.

### Restore scenarios

| Scenario | Restore type | Notes |
|---|---|---|
| Configuration error | Configuration restore | Use the most recent verified backup before the change |
| Failed upgrade rollback | Configuration and package rollback | Restore after software rollback completes |
| Management server rebuild | Configuration, certificate, and license restore | Confirm system fingerprint and license requirements |
| Database recovery | Database and configuration alignment | Coordinate with the database administrator |

### Required access

| Role | Access needed |
|---|---|
| StorageSphere administrator | Permission to validate restored settings |
| Linux administrator | `sudo` access to stop services and run restore commands |
| Database administrator | Database recovery and consistency checks |
| Security administrator | Certificate and credential validation |

### Required information

Collect the following values before you start.

| Item | Example | Used for |
|---|---|---|
| Backup archive | `ssphere-config-20260613-170500.tar.gz.enc` | Restore source |
| Checksum file | `ssphere-config-20260613-170500.sha256` | Backup validation |
| Certificate package | `ssphere-tls-20260613.tar.gz` | HTTPS restore |
| Restore target | `ss-mgmt.corp.example.com` | Management server identity |
| Maintenance record | `CHG-104821` | Change tracking |

::::warning
Restoring configuration overwrites current StorageSphere Enterprise settings. Export or back up the current configuration before restoring if you might need to return to it.
::::

## Procedure

### Step 1: Stage the backup files

1. Sign in to the management server.

2. Create a restore staging directory.

   ```bash
   sudo mkdir -p /var/tmp/ssphere-restore
   ```

3. Copy the backup archive and checksum file to the staging directory.

   ```bash
   sudo cp ssphere-config-20260613-170500.tar.gz.enc /var/tmp/ssphere-restore/
   sudo cp ssphere-config-20260613-170500.sha256 /var/tmp/ssphere-restore/
   ```

4. Restrict access to the staging directory.

   ```bash
   sudo chmod 700 /var/tmp/ssphere-restore
   ```

### Step 2: Verify the backup before restore

1. Validate the checksum.

   ```bash
   cd /var/tmp/ssphere-restore
   sha256sum -c ssphere-config-20260613-170500.sha256
   ```

2. Validate the backup archive.

   ```bash
   sudo ssphere-maintenance backup verify \
     --file /var/tmp/ssphere-restore/ssphere-config-20260613-170500.tar.gz.enc
   ```

3. Confirm that verification reports **valid**.

### Step 3: Back up the current configuration

1. Create a safety backup of the current configuration.

   ```bash
   sudo ssphere-maintenance backup create \
     --output /var/backups/storagesphere \
     --encrypt
   ```

2. Confirm that the safety backup completes successfully.

3. Record the safety backup file name in the restore record.

### Step 4: Stop StorageSphere services

1. Stop the management server service.

   ```bash
   sudo systemctl stop ssphere-server
   ```

2. Stop local collector services if they run on the management server.

   ```bash
   sudo systemctl stop ssphere-collector
   ```

3. Confirm that services are stopped.

   ```bash
   sudo systemctl status ssphere-server
   ```

### Step 5: Restore the configuration

1. Run the restore command.

   ```bash
   sudo ssphere-maintenance restore configuration \
     --file /var/tmp/ssphere-restore/ssphere-config-20260613-170500.tar.gz.enc
   ```

2. Enter the backup encryption passphrase when prompted.

3. Review the restore summary.

   | Restore item | Expected status |
   |---|---|
   | System settings | Restored |
   | Authentication providers | Restored |
   | RBAC mappings | Restored |
   | Storage discovery configuration | Restored |
   | Alert and report definitions | Restored |

### Step 6: Restore certificate files if required

1. Extract the certificate backup package.

   ```bash
   sudo tar -xzf ssphere-tls-20260613.tar.gz -C /
   ```

2. Confirm private key permissions.

   ```bash
   sudo chmod 600 /etc/storagesphere/tls/*.key
   ```

3. Validate HTTPS configuration. See [Configuring HTTPS](../security-configuration/configuring-https).

### Step 7: Start services and validate access

1. Start StorageSphere services.

   ```bash
   sudo systemctl start ssphere-server
   sudo systemctl start ssphere-collector
   ```

2. Confirm service status.

   ```bash
   sudo systemctl status ssphere-server
   ```

3. Sign in to the StorageSphere Enterprise web UI.

4. Review restored configuration under **Administration**.

::::note
Collectors might take several minutes to reconnect after a restore. Wait for collector heartbeats before validating discovery or monitoring jobs.
::::

## Verification

Confirm that the following conditions are true after restore.

| Check | Expected result |
|---|---|
| Services | StorageSphere services are running |
| Web UI | Administrators can sign in over HTTPS |
| License | License status is **Valid** |
| Authentication | Local, LDAP, or Active Directory sign-in works as expected |
| RBAC | Role mappings match the restored configuration |
| Storage discovery | Storage systems and collectors appear with expected status |
| Reports and alerts | Definitions are available |

## Troubleshooting

### Restore fails during validation

- Confirm that the backup archive and checksum file match.
- Verify that the backup was created by a compatible StorageSphere Enterprise version.
- Confirm that the correct encryption passphrase is used.
- Review `/var/log/ssphere/maintenance.log`.

### Web UI is unavailable after restore

- Confirm that the `ssphere-server` service started successfully.
- Review service logs for database, certificate, or configuration errors.
- Confirm that HTTPS certificate files exist and have correct permissions.
- Restore the safety backup if the restored configuration cannot be repaired.

### Authentication fails after restore

- Confirm that LDAP or Active Directory endpoints are reachable.
- Verify that restored certificates and trust stores are valid.
- Confirm that directory bind credentials are current.
- Sign in with a local break-glass administrator account and update authentication settings.

## Related Topics

- [Backing Up the Configuration](./backing-up-the-configuration)
- [Rolling Back an Upgrade](./rolling-back-an-upgrade)
- [Configuring HTTPS](../security-configuration/configuring-https)
- [Configuring LDAP Authentication](../installation/configuring-ldap-authentication)
- [Configuring Active Directory Authentication](../installation/configuring-active-directory-authentication)
