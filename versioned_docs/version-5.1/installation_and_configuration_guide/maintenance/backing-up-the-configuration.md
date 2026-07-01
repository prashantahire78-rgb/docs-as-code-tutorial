---
id: backing-up-the-configuration
title: Backing Up the Configuration
description: Steps to back up StorageSphere Enterprise configuration and operational metadata.
sidebar_position: 1
---

# Backing Up the Configuration

## Overview

This topic describes how to back up the StorageSphere Enterprise configuration. A configuration backup preserves system settings, license metadata, authentication providers, RBAC mappings, certificate references, storage discovery configuration, alert policies, report definitions, and collector registration data.

Create a verified backup before upgrades, certificate changes, authentication changes, storage discovery changes, and planned maintenance.

## Before You Begin

### Prerequisites

- Installed and licensed StorageSphere Enterprise. See [Installing the License](../installation/installing-the-license).
- StorageSphere Administrator role access.
- Linux administrator access to the management server.
- Healthy database connection. See [Configuring the Database](../installation/configuring-the-database).
- Backup destination with sufficient capacity and restricted access.
- Maintenance window approved if your organization requires change control for backup operations.

### Backup contents

| Content | Included | Notes |
|---|---|---|
| System configuration | Yes | Includes global settings and service configuration |
| License metadata | Yes | Does not replace the original license file issued by NovaStor Technologies |
| Authentication settings | Yes | Includes LDAP and Active Directory provider configuration |
| RBAC mappings | Yes | Includes roles and group mappings |
| Storage discovery configuration | Yes | Includes storage systems, collectors, tags, and schedules |
| Certificates | Metadata only | Back up certificate files separately |
| Time-series metrics | No | Back up the database according to your database protection policy |

### Required access

| Role | Access needed |
|---|---|
| StorageSphere administrator | Permission to run and verify configuration backups |
| Linux administrator | `sudo` access on the management server |
| Database administrator | Database backup coordination when required |
| Security administrator | Approval for backup encryption and retention |

### Required information

Collect the following values before you start.

| Item | Example | Used for |
|---|---|---|
| Backup directory | `/var/backups/storagesphere` | Local staging location |
| External repository | `backup01.corp.example.com:/data/ssphere` | Off-host storage |
| Encryption passphrase owner | `security-operations@corp.example.com` | Backup protection |
| Retention period | `30 days` | Backup lifecycle |
| Change record | `CHG-104820` | Operational tracking |

::::warning
Store configuration backups outside the management server. A local-only backup does not protect against host loss, storage failure, or accidental deletion.
::::

## Procedure

### Step 1: Prepare the backup destination

1. Sign in to the management server.

2. Create the local backup directory.

   ```bash
   sudo mkdir -p /var/backups/storagesphere
   ```

3. Restrict access to the backup directory.

   ```bash
   sudo chmod 700 /var/backups/storagesphere
   ```

4. Confirm available disk space.

   ```bash
   df -h /var/backups/storagesphere
   ```

### Step 2: Run a configuration backup

1. Run the backup command.

   ```bash
   sudo ssphere-maintenance backup create \
     --output /var/backups/storagesphere \
     --encrypt
   ```

2. Enter the encryption passphrase when prompted.

3. Review the backup summary.

   ```text
   Backup status: completed
   Backup file: ssphere-config-20260613-170500.tar.gz.enc
   Checksum file: ssphere-config-20260613-170500.sha256
   ```

### Step 3: Back up certificate files

1. Create a certificate backup package.

   ```bash
   sudo tar -czf /var/backups/storagesphere/ssphere-tls-20260613.tar.gz /etc/storagesphere/tls
   ```

2. Restrict access to the package.

   ```bash
   sudo chmod 600 /var/backups/storagesphere/ssphere-tls-20260613.tar.gz
   ```

3. Record the certificate package name in the maintenance record.

::::note
Configuration backups include certificate references and trust settings. Back up certificate files and private keys separately according to your security policy.
::::

### Step 4: Verify the backup

1. Validate the backup archive.

   ```bash
   sudo ssphere-maintenance backup verify \
     --file /var/backups/storagesphere/ssphere-config-20260613-170500.tar.gz.enc
   ```

2. Verify the checksum.

   ```bash
   sha256sum -c /var/backups/storagesphere/ssphere-config-20260613-170500.sha256
   ```

3. Confirm that verification reports **valid**.

### Step 5: Copy the backup off host

1. Copy the backup archive, checksum, and certificate package to the external repository.

   ```bash
   scp /var/backups/storagesphere/ssphere-config-20260613-170500.tar.gz.enc backup-admin@backup01.corp.example.com:/data/ssphere/
   scp /var/backups/storagesphere/ssphere-config-20260613-170500.sha256 backup-admin@backup01.corp.example.com:/data/ssphere/
   scp /var/backups/storagesphere/ssphere-tls-20260613.tar.gz backup-admin@backup01.corp.example.com:/data/ssphere/
   ```

2. Confirm that the files exist in the external repository.

3. Update the backup inventory or change record.

### Step 6: Apply retention

1. Review existing local backups.

   ```bash
   sudo ssphere-maintenance backup list --path /var/backups/storagesphere
   ```

2. Remove backups older than the approved retention period.

   ```bash
   sudo ssphere-maintenance backup prune --path /var/backups/storagesphere --days 30
   ```

3. Confirm that retained backups match your recovery policy.

## Verification

Confirm that the following conditions are true.

| Check | Expected result |
|---|---|
| Backup command | Completed successfully |
| Backup archive | Encrypted archive exists in the backup directory |
| Checksum | Checksum validation passes |
| Certificate package | TLS files are backed up separately |
| Off-host copy | Backup files exist in the external repository |
| Retention | Backup inventory matches the approved retention policy |

## Troubleshooting

### Backup command fails

- Confirm that the management server service and database connection are healthy.
- Verify that the backup directory exists and has enough free space.
- Confirm that the administrator has `sudo` access.
- Review `/var/log/ssphere/maintenance.log` for backup errors.

### Backup verification fails

- Confirm that the backup file was not modified after creation.
- Verify that the correct encryption passphrase is used.
- Recreate the backup and compare the new checksum.
- Do not use an unverified backup for upgrade or restore operations.

### Off-host copy fails

- Confirm network connectivity to the backup repository.
- Verify SSH credentials and repository permissions.
- Check available capacity on the backup repository.
- Retry the copy after resolving network or permission issues.

## Related Topics

- [Restoring the Configuration](./restoring-the-configuration)
- [Upgrading StorageSphere](./upgrading-storagesphere)
- [Rolling Back an Upgrade](./rolling-back-an-upgrade)
- [Managing SSL Certificates](../security-configuration/managing-ssl-certificates)
- [Configuring the Database](../installation/configuring-the-database)
