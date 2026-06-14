---
id: installing-storagesphere-server
title: Installing StorageSphere Server
description: Steps to install the StorageSphere Enterprise 2.0 management server.
sidebar_position: 1
---

# Installing StorageSphere Server

## Overview

This topic describes how to install the StorageSphere Enterprise 2.0 management server. The management server hosts the web UI, REST API, alert engine, reporting services, RBAC enforcement, and collector registration service.

Install StorageSphere Server after you complete the prerequisites and verify that the target host meets the required platform, network, and firewall requirements.

## Before You Begin

### Prerequisites

- Completed [Preparing the Installation Environment](../prerequisites/preparing-the-installation-environment)
- Management server host that meets [System Requirements](../prerequisites/system-requirements)
- Supported Linux operating system listed in [Supported Platforms](../prerequisites/supported-platforms)
- DNS, NTP, and firewall rules configured per [Network Requirements](../prerequisites/network-requirements) and [Firewall Requirements](../prerequisites/firewall-requirements)
- PostgreSQL database connection details, unless you plan to configure the database after installation
- TLS certificate and private key for the management server FQDN, if your organization uses enterprise PKI

### Required access

| Role | Access needed |
|---|---|
| Linux administrator | `sudo` or `root` access on the management server |
| Database administrator | Connection details and credentials for PostgreSQL or Microsoft SQL Server |
| Security administrator | Approval for TLS certificate use and service account permissions |
| Network administrator | Confirmation that required firewall rules are active |

### Required information

Collect the following values before you start.

| Item | Example | Used for |
|---|---|---|
| Management server FQDN | `ss-mgmt.corp.example.com` | Web UI, REST API, TLS certificate |
| Installation package | `storagesphere-enterprise-server-2.0.0.rpm` | Server installation |
| Service account | `ssphere` | StorageSphere service ownership |
| Data directory | `/var/lib/ssphere` | Metrics, reports, and runtime data |
| HTTPS port | `443` | Administrator and REST API access |
| Collector registration port | `8443` | Collector registration and configuration |

:::warning
Do not install the management server on a host that also runs unrelated production workloads. StorageSphere Enterprise services require predictable CPU, memory, and disk I/O during discovery and reporting operations.
:::

## Procedure

### Step 1: Copy the installation package to the server

1. Sign in to the management server as a user with `sudo` privileges.

2. Create a temporary installation directory.

   ```bash
   mkdir -p /tmp/ssphere-install
   ```

3. Copy the StorageSphere Server package to the directory.

   ```bash
   scp storagesphere-enterprise-server-2.0.0.rpm ss-admin@ss-mgmt.corp.example.com:/tmp/ssphere-install/
   ```

4. Verify the package checksum provided by NovaStor Technologies.

   ```bash
   cd /tmp/ssphere-install
   sha256sum storagesphere-enterprise-server-2.0.0.rpm
   ```

   Confirm that the checksum matches the value published with the release package.

### Step 2: Install prerequisite packages

1. Install operating system packages required by StorageSphere Server.

   ```bash
   sudo dnf install -y openssl python3 tar gzip
   ```

2. Verify that OpenSSL is available.

   ```bash
   openssl version
   ```

3. Confirm that the service account created during environment preparation exists.

   ```bash
   id ssphere
   ```

   If the account does not exist, create it before you continue.

   ```bash
   sudo useradd -r -m -s /bin/bash ssphere
   ```

### Step 3: Install the server package

1. Install the RPM package on RHEL or compatible platforms.

   ```bash
   sudo dnf install -y ./storagesphere-enterprise-server-2.0.0.rpm
   ```

2. For Ubuntu Server, install the DEB package instead.

   ```bash
   sudo apt install ./storagesphere-enterprise-server-2.0.0_amd64.deb
   ```

3. Verify that the package is installed.

   ```bash
   rpm -qi storagesphere-enterprise-server
   ```

   On Ubuntu Server, use:

   ```bash
   dpkg -s storagesphere-enterprise-server
   ```

:::note
The installation package creates the `ssphere-server` systemd service but does not start the service until you complete the initial configuration.
:::

### Step 4: Configure server directories

1. Create the data directory if it does not already exist.

   ```bash
   sudo mkdir -p /var/lib/ssphere
   ```

2. Set ownership for the StorageSphere service account.

   ```bash
   sudo chown -R ssphere:ssphere /var/lib/ssphere
   ```

3. Verify free space on the data directory.

   ```bash
   df -h /var/lib/ssphere
   ```

4. Confirm that the directory is mounted on the planned data volume.

   ```bash
   findmnt /var/lib/ssphere
   ```

### Step 5: Run the initial server configuration

1. Start the StorageSphere setup utility.

   ```bash
   sudo ssphere-setup server init
   ```

2. Enter the management server FQDN when prompted.

   ```text
   Management server FQDN: ss-mgmt.corp.example.com
   ```

3. Enter the HTTPS port for the web UI and REST API.

   ```text
   HTTPS port: 443
   ```

4. Enter the collector registration port.

   ```text
   Collector registration port: 8443
   ```

5. Enter the data directory path.

   ```text
   Data directory: /var/lib/ssphere
   ```

6. When prompted for database configuration, select one of the following options.

   | Option | Use when |
   |---|---|
   | Configure now | Database credentials are available and the database is reachable |
   | Configure later | A database administrator must complete database preparation first |

   If you select **Configure later**, complete [Configuring the Database](./configuring-the-database) before you start the service.

### Step 6: Configure TLS

1. Copy the TLS certificate and private key to the server.

   ```bash
   sudo mkdir -p /etc/ssphere/tls
   sudo cp ss-mgmt.crt /etc/ssphere/tls/server.crt
   sudo cp ss-mgmt.key /etc/ssphere/tls/server.key
   ```

2. Set file ownership and permissions.

   ```bash
   sudo chown -R ssphere:ssphere /etc/ssphere/tls
   sudo chmod 640 /etc/ssphere/tls/server.key
   ```

3. Register the certificate with StorageSphere Server.

   ```bash
   sudo ssphere-setup tls set --cert /etc/ssphere/tls/server.crt --key /etc/ssphere/tls/server.key
   ```

:::tip
Use a certificate whose subject alternative name includes the management server FQDN. Browsers and collectors validate the FQDN during HTTPS connections.
:::

### Step 7: Start the server service

1. Reload systemd.

   ```bash
   sudo systemctl daemon-reload
   ```

2. Enable and start the StorageSphere Server service.

   ```bash
   sudo systemctl enable --now ssphere-server
   ```

3. Check the service status.

   ```bash
   sudo systemctl status ssphere-server
   ```

4. Review the startup logs.

   ```bash
   sudo journalctl -u ssphere-server -n 100 --no-pager
   ```

## Verification

Confirm that the following conditions are true before you continue.

| Check | Expected result |
|---|---|
| Package installation | `storagesphere-enterprise-server` is installed at version 2.0.x |
| Service status | `ssphere-server` is active and enabled |
| HTTPS endpoint | `https://ss-mgmt.corp.example.com` responds with the StorageSphere sign-in page |
| REST API health | `https://ss-mgmt.corp.example.com/api/v2/health` returns `healthy` |
| TLS certificate | Browser shows a trusted certificate for the management server FQDN |
| Data directory | `/var/lib/ssphere` is mounted, writable, and owned by `ssphere` |

Use the following command to test the health endpoint from the management server.

```bash
curl -k https://ss-mgmt.corp.example.com/api/v2/health
```

:::note
Use `-k` only during initial validation with a temporary certificate. Do not use insecure TLS verification in production monitoring scripts.
:::

## Troubleshooting

### Package installation fails

- Confirm that the package matches your operating system and architecture.
- Verify that required repositories are enabled for dependency resolution.
- Check package integrity with the published SHA-256 checksum.
- Review `/var/log/dnf.log` or `/var/log/apt/history.log` for dependency errors.

### Server service does not start

- Run `sudo journalctl -u ssphere-server -n 200 --no-pager` and review startup errors.
- Confirm that database configuration is complete. See [Configuring the Database](./configuring-the-database).
- Verify that the `ssphere` service account owns `/var/lib/ssphere`.
- Confirm that ports 443 and 8443 are not already in use.

### Web UI is not reachable

- Verify that the service is active with `sudo systemctl status ssphere-server`.
- Confirm that TCP port 443 is open from administrator workstations. See [Firewall Requirements](../prerequisites/firewall-requirements).
- Check DNS resolution for the management server FQDN.
- Review reverse proxy settings if you use a proxy in front of the management server.

### TLS certificate warning appears in the browser

- Confirm that the certificate chain is trusted by the administrator workstation.
- Verify that the certificate subject alternative name includes the management server FQDN.
- Replace temporary self-signed certificates before production use.

## Related Topics

- [Configuring the Database](./configuring-the-database)
- [Installing the License](./installing-the-license)
- [System Requirements](../prerequisites/system-requirements)
- [Supported Platforms](../prerequisites/supported-platforms)
- [Network Requirements](../prerequisites/network-requirements)
- [Firewall Requirements](../prerequisites/firewall-requirements)
- [Installation and Configuration Guide](../introduction_icg)
