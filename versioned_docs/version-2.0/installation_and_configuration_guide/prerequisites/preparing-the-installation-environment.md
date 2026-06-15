---
id: preparing-the-installation-environment
title: Preparing the Installation Environment
description: Steps to prepare hosts, accounts, and network settings before installing StorageSphere Enterprise 2.0.
sidebar_position: 6
---

# Preparing the Installation Environment

## Overview

This topic describes how to prepare the management server, collector, and database hosts before you install StorageSphere Enterprise 2.0. Completing these steps reduces installation errors and avoids rework during initial configuration.

Perform this procedure after you confirm that your environment meets [System Requirements](./system-requirements) and [Supported Platforms](./supported-platforms).

## Before You Begin

### Prerequisites

- Documented deployment plan based on [Deployment Architecture](./deployment-architecture)
- Provisioned hosts for the management server, collectors, and PostgreSQL (if external)
- Network connectivity validated per [Network Requirements](./network-requirements)
- Firewall rules approved and staged per [Firewall Requirements](./firewall-requirements)
- Service account credentials for LDAP, Active Directory, and SMTP (if used at install time)

### Required access

| Role | Access needed |
|---|---|
| Linux administrator | `sudo` or `root` on management server and collector hosts |
| Database administrator | `CREATE DATABASE` privilege on PostgreSQL instance |
| Network administrator | Ability to verify DNS, NTP, and firewall rules |
| Directory administrator | Read access to LDAP or Active Directory for service account validation |

### Required information

Collect the following values before you start.

| Item | Example | Used for |
|---|---|---|
| Management server FQDN | `ss-mgmt.corp.example.com` | Installation and certificates |
| Collector FQDNs | `ss-collector-dc1.corp.example.com` | Collector registration |
| Database connection string | `postgresql://ssuser@dbhost:5432/ssphere` | Database configuration |
| NTP server | `ntp.corp.example.com` | Time synchronization |
| DNS servers | `10.10.1.10, 10.10.1.11` | Host name resolution |
| SMTP relay | `smtp.corp.example.com:587` | Alert and report delivery |

## Procedure

### Step 1: Configure host names and DNS

1. Set the host name on each server to its planned FQDN.

   ```bash
   sudo hostnamectl set-hostname ss-mgmt.corp.example.com
   ```

2. Verify forward and reverse DNS resolution from each host.

   ```bash
   dig +short ss-mgmt.corp.example.com
   dig +short -x <management-server-ip>
   ```

3. Confirm that the `/etc/hosts` file does not contain conflicting entries for the management server or collector host names.

### Step 2: Synchronize system time

1. Install and enable chrony (RHEL, Ubuntu, SLES) or configure the Windows Time service (collector hosts on Windows Server).

   ```bash
   sudo systemctl enable --now chronyd
   ```

2. Edit the chrony configuration to point to your internal NTP servers.

   ```bash
   sudo vi /etc/chrony.conf
   ```

   Add your NTP server:

   ```text
   server ntp.corp.example.com iburst
   ```

3. Restart chrony and verify synchronization.

   ```bash
   sudo systemctl restart chronyd
   chronyc tracking
   ```

   Confirm that the system clock offset is less than five seconds.

### Step 3: Apply operating system updates

1. Update all packages to the latest vendor-supported patch level.

   ```bash
   sudo dnf update -y    # RHEL
   sudo apt update && sudo apt upgrade -y    # Ubuntu
   ```

2. Reboot hosts if the update process requires it.

   ```bash
   sudo reboot
   ```

3. Verify the kernel version and operating system release after reboot.

   ```bash
   uname -r
   cat /etc/os-release
   ```

### Step 4: Create service accounts

1. Create a local service account for StorageSphere Enterprise on the management server.

   ```bash
   sudo useradd -r -m -s /bin/bash ssphere
   ```

2. Create a local service account on each collector host.

   ```bash
   sudo useradd -r -m -s /bin/bash ssphere-collector
   ```

3. If you use an external PostgreSQL instance, ask your database administrator to create a database user with `CREATE`, `CONNECT`, and `TEMPORARY` privileges on the target database.

4. Validate the LDAP or Active Directory service account by binding from the management server.

   ```bash
   ldapwhoami -H ldaps://dc.corp.example.com -D "CN=ssphere-svc,OU=Service Accounts,DC=corp,DC=example,DC=com" -W
   ```

### Step 5: Configure storage volumes

1. Verify that the system disk, data volume, and database storage meet the sizes in [System Requirements](./system-requirements).

   ```bash
   lsblk -o NAME,SIZE,TYPE,MOUNTPOINT
   df -h
   ```

2. Create and mount the data volume on the management server at `/var/lib/ssphere`.

   ```bash
   sudo mkdir -p /var/lib/ssphere
   sudo mount /dev/mapper/ssphere-data /var/lib/ssphere
   ```

3. Add the mount entry to `/etc/fstab` for persistent mounting across reboots.

4. Assign ownership to the service account.

   ```bash
   sudo chown -R ssphere:ssphere /var/lib/ssphere
   ```

### Step 6: Configure firewall rules

1. Review the rules in [Firewall Requirements](./firewall-requirements) for each host role.

2. On RHEL hosts, create a firewall zone for StorageSphere Enterprise services.

   ```bash
   sudo firewall-cmd --permanent --add-port=443/tcp
   sudo firewall-cmd --permanent --add-port=8443/tcp
   sudo firewall-cmd --reload
   ```

3. On Ubuntu hosts, enable the required ports with `ufw`.

   ```bash
   sudo ufw allow 443/tcp
   sudo ufw allow 8443/tcp
   sudo ufw enable
   ```

4. Ask your network security team to apply network-level firewall rules for cross-segment traffic.

### Step 7: Verify network connectivity

1. From the management server, test connectivity to the database, directory service, and SMTP relay.

   ```bash
   nc -zv dbhost.corp.example.com 5432
   nc -zv dc.corp.example.com 636
   nc -zv smtp.corp.example.com 587
   ```

2. From each collector, test connectivity to the management server.

   ```bash
   nc -zv ss-mgmt.corp.example.com 443
   ```

3. From each collector, test connectivity to at least one storage management interface on the required ports (SNMP, HTTPS, or vendor-specific).

   ```bash
   nc -zvu 10.20.30.40 161
   nc -zv 10.20.30.40 443
   ```

4. Record test results in your deployment checklist.

### Step 8: Install prerequisite packages

1. Install required packages on the management server and collectors.

   ```bash
   sudo dnf install -y openssl python3 chrony
   ```

2. Verify OpenSSL and Python versions meet the minimums in [System Requirements](./system-requirements).

   ```bash
   openssl version
   python3 --version
   ```

3. On Windows collector hosts, install the StorageSphere Enterprise collector prerequisites package from the NovaStor Technologies distribution portal.

## Verification

Confirm that the following conditions are true before you proceed to installation.

| Check | Expected result |
|---|---|
| Host name resolution | FQDN resolves to the correct IP address on all hosts |
| Time synchronization | Clock offset is less than five seconds on all hosts |
| Service accounts | Local and directory accounts authenticate successfully |
| Data volume | `/var/lib/ssphere` is mounted with correct ownership and free space |
| Firewall rules | Required ports are open per host role |
| Network connectivity | Management server reaches database, LDAP, and SMTP; collectors reach management server and storage devices |
| Prerequisite packages | OpenSSL and Python versions meet requirements |

:::tip
Save the output of each verification command in your deployment runbook. This record helps you troubleshoot installation failures without repeating the full preparation procedure.
:::

## Troubleshooting

### DNS resolution fails

- Confirm that `/etc/resolv.conf` lists the correct DNS servers.
- Verify that forward and reverse DNS records exist and match the planned FQDN.
- Remove duplicate or incorrect entries from `/etc/hosts`.

### Time synchronization drift exceeds five seconds

- Confirm that UDP port 123 is open to NTP servers on all hosts.
- Verify that chrony points to reachable internal NTP servers, not deprecated external pools, if your policy restricts outbound traffic.
- Check for virtualization time sync conflicts on VMware or Hyper-V guests. Disable host-guest time sync when using chrony inside the guest.

### Firewall blocks collector-to-server communication

- Verify that outbound TCP port 443 is open from collectors to the management server.
- Verify that inbound TCP port 8443 is open on collectors from the management server subnet.
- Review network firewall logs for denied connections and adjust rules per [Firewall Requirements](./firewall-requirements).

### LDAP bind fails

- Confirm that the service account password is correct and the account is not locked.
- Verify that LDAPS certificate chains are trusted by the management server operating system trust store.
- Confirm that the management server can reach the directory server on port 389 or 636.

### Insufficient disk space

- Compare `df -h` output against [System Requirements](./system-requirements).
- Expand the data volume or select a larger disk before installation. StorageSphere Enterprise does not support in-place shrinking of the data volume after installation.

## Related Topics

- [System Requirements](./system-requirements)
- [Supported Platforms](./supported-platforms)
- [Deployment Architecture](./deployment-architecture)
- [Network Requirements](./network-requirements)
- [Firewall Requirements](./firewall-requirements)
- [Installation Guide](../introduction_icg)
