---
id: installing-the-license
title: Installing the License
description: Steps to install and verify a StorageSphere Enterprise license.
sidebar_position: 6
---

# Installing the License

## Overview

This topic describes how to install a license for StorageSphere Enterprise. A valid license enables production use of storage discovery, capacity monitoring, performance monitoring, alert management, reporting, RBAC, email notifications, and REST API access.

Install the license after the management server and database are configured. You can install a license through the web UI or by using the command line on the management server.

## Before You Begin

### Prerequisites

- Installed StorageSphere Server. See [Installing StorageSphere Server](./installing-storagesphere-server).
- Configured database connection. See [Configuring the Database](./configuring-the-database).
- Management server FQDN and system fingerprint available.
- License file issued by NovaStor Technologies for StorageSphere Enterprise.
- Local administrator or StorageSphere Administrator role access.
- Email notifications configured if you want license expiration alerts. See [Configuring Email Notifications](./configuring-email-notifications).

### License types

| License type | Use case | Typical duration |
|---|---|---|
| Evaluation | Short-term product validation | 30 or 60 days |
| Subscription | Production use with active support term | 1 or 3 years |
| Enterprise agreement | Large-scale multi-site deployment | Contract-specific |

### Required access

| Role | Access needed |
|---|---|
| StorageSphere administrator | Permission to upload and activate licenses |
| Linux administrator | `sudo` access for command-line installation |
| Procurement or licensing contact | Access to NovaStor Technologies license portal |

### Required information

Collect the following values before you start.

| Item | Example | Used for |
|---|---|---|
| License file | `storagesphere-enterprise-3.0-license.json` | License activation |
| Customer ID | `NST-ACME-001245` | Support and license validation |
| Management server FQDN | `ss-mgmt.corp.example.com` | System identity |
| System fingerprint | `8f23-4bd9-91aa-73c2` | License binding |
| Support contact | `storage-admins@corp.example.com` | License renewal notifications |

:::note
Some licenses are bound to the management server fingerprint. If you replace the management server or rebuild the operating system, request a reissued license before cutover.
:::

## Procedure

### Step 1: Get the system fingerprint

1. Sign in to the management server.

2. Run the fingerprint command.

   ```bash
   sudo ssphere-license fingerprint
   ```

3. Save the fingerprint value.

   ```text
   System fingerprint: 8f23-4bd9-91aa-73c2
   ```

4. Provide the fingerprint, customer ID, and management server FQDN to NovaStor Technologies if you need a new production license.

:::tip
Store the fingerprint and license file name in your deployment runbook. This information helps support teams validate licensing during upgrades and disaster recovery.
:::

### Step 2: Copy the license file to the management server

1. Create a license staging directory.

   ```bash
   mkdir -p /tmp/ssphere-license
   ```

2. Copy the license file to the management server.

   ```bash
   scp storagesphere-enterprise-3.0-license.json ss-admin@ss-mgmt.corp.example.com:/tmp/ssphere-license/
   ```

3. Verify that the file exists.

   ```bash
   ls -l /tmp/ssphere-license/storagesphere-enterprise-3.0-license.json
   ```

4. Confirm that the file is readable only by authorized administrators.

   ```bash
   chmod 600 /tmp/ssphere-license/storagesphere-enterprise-3.0-license.json
   ```

### Step 3: Install the license from the command line

1. Run the license installation command.

   ```bash
   sudo ssphere-license install /tmp/ssphere-license/storagesphere-enterprise-3.0-license.json
   ```

2. Review the installation summary.

   ```text
   License status: valid
   Product: StorageSphere Enterprise
   Version: 3.0
   Licensed assets: 2000
   Expiration: 2027-12-31
   ```

3. Restart the license service.

   ```bash
   sudo systemctl restart ssphere-license
   ```

4. Confirm the license service status.

   ```bash
   sudo systemctl status ssphere-license
   ```

### Step 4: Install the license from the web UI

Use this method when the management server is running and you have StorageSphere Administrator access.

1. Sign in to the StorageSphere Enterprise web UI.

2. Go to **Administration** > **Licensing**.

3. Select **Upload license**.

4. Select the license file provided by NovaStor Technologies.

5. Review the license details.

   | Field | Confirm |
   |---|---|
   | Product | StorageSphere Enterprise |
   | Version | 3.0 |
   | Licensed assets | Matches your purchased capacity |
   | Expiration date | Matches your support or subscription term |
   | Customer ID | Matches your organization |

6. Select **Install license**.

7. Confirm that the license status changes to **Valid**.

:::warning
Do not modify the license file. Any change to the file contents invalidates the digital signature and prevents activation.
:::

### Step 5: Configure license notifications

1. Confirm that email notifications are configured.

   ```bash
   sudo ssphere-setup notifications email test --to storage-admins@corp.example.com
   ```

2. Enable license expiration notifications.

   ```bash
   sudo ssphere-setup notifications events enable license-expiration
   ```

3. Configure the first warning threshold.

   ```bash
   sudo ssphere-license notifications set --days-before-expiration 60
   ```

4. Configure the critical warning threshold.

   ```bash
   sudo ssphere-license notifications set --critical-days-before-expiration 14
   ```

5. Confirm the notification settings.

   ```bash
   sudo ssphere-license notifications show
   ```

### Step 6: Confirm licensed feature access

1. Sign in to the web UI as a StorageSphere Administrator.

2. Go to **Administration** > **Licensing**.

3. Confirm that licensed features are enabled.

   | Feature | Expected status |
   |---|---|
   | Storage discovery | Enabled |
   | Performance monitoring | Enabled |
   | Capacity monitoring | Enabled |
   | Alert management | Enabled |
   | Reporting | Enabled |
   | REST API | Enabled |

4. Run a license status check from the command line.

   ```bash
   sudo ssphere-license status
   ```

## Verification

Confirm that the following conditions are true before you continue.

| Check | Expected result |
|---|---|
| License status | License status is `valid` |
| Product and version | License shows StorageSphere Enterprise |
| Asset capacity | Licensed asset count matches purchased capacity |
| Expiration date | Date matches the active subscription or agreement |
| Feature access | Licensed features are enabled in the web UI |
| Notifications | License expiration notifications are enabled |

Use the following command to export license status for your deployment record.

```bash
sudo ssphere-license status --format text
```

## Troubleshooting

### License installation fails

- Confirm that the license file is for StorageSphere Enterprise.
- Verify that the file was not modified after download.
- Check whether the license is bound to a different system fingerprint.
- Review `/var/log/ssphere/license-service.log` for validation errors.

### License shows as expired

- Confirm the system date and time on the management server.
- Verify that NTP synchronization is active. See [Network Requirements](../prerequisites/network-requirements).
- Confirm that the license file is the latest file issued by NovaStor Technologies.
- Contact NovaStor Technologies support if the expiration date is incorrect.

### Licensed asset count is lower than expected

- Compare the displayed asset count with the purchase order or enterprise agreement.
- Confirm that you installed the production license, not the evaluation license.
- Request a corrected license file if the entitlement is incorrect.

### Web UI does not show licensed features

- Restart the license service and the management server service.
- Clear the browser cache and sign in again.
- Confirm that the database connection is healthy. See [Configuring the Database](./configuring-the-database).
- Review application logs for feature entitlement errors.

## Related Topics

- [Installing StorageSphere Server](./installing-storagesphere-server)
- [Configuring the Database](./configuring-the-database)
- [Configuring Email Notifications](./configuring-email-notifications)
- [Network Requirements](../prerequisites/network-requirements)
- [Preparing the Installation Environment](../prerequisites/preparing-the-installation-environment)
- [Installation and Configuration Guide](../introduction_icg)
