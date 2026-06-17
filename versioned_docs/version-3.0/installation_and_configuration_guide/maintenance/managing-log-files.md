---
id: managing-log-files
title: Managing Log Files
description: Steps to manage StorageSphere Enterprise log files.
sidebar_position: 4
---

# Managing Log Files

## Overview

This topic describes how to manage StorageSphere Enterprise log files. Log management helps administrators troubleshoot issues, meet audit requirements, control disk usage, and provide diagnostic data to NovaStor Technologies support.

Review log settings after installation, before production cutover, and whenever storage, security, or retention requirements change.

## Before You Begin

### Prerequisites

- Installed and licensed StorageSphere Enterprise. See [Installing the License](../installation/installing-the-license).
- StorageSphere Administrator role access.
- Linux administrator access to the management server and collector hosts.
- Approved log retention and forwarding requirements.
- Sufficient disk space on log volumes.
- Security approval before exporting logs that may contain infrastructure names, user names, or IP addresses.

### Log locations

| Component | Default location | Purpose |
|---|---|---|
| Management server | `/var/log/ssphere/server.log` | Web UI, REST API, system services |
| Discovery service | `/var/log/ssphere/discovery.log` | Storage discovery jobs and adapter messages |
| Collector | `/var/log/ssphere/collector.log` | Collector heartbeat, jobs, and uploads |
| Authentication | `/var/log/ssphere/auth.log` | Local, LDAP, and Active Directory authentication |
| Audit | `/var/log/ssphere/audit.log` | Administrative and security events |
| Maintenance | `/var/log/ssphere/maintenance.log` | Backup, restore, upgrade, and rollback operations |

### Log levels

| Log level | Use when | Notes |
|---|---|---|
| `ERROR` | Production steady state with minimal logging | Captures failures only |
| `WARN` | Standard production logging | Recommended default |
| `INFO` | Operational validation and normal troubleshooting | May increase log volume |
| `DEBUG` | Short-term support investigation | Enable only for approved duration |
| `TRACE` | Deep diagnostic investigation | Use only with NovaStor Technologies support |

::::warning
Do not leave `DEBUG` or `TRACE` logging enabled after troubleshooting. Verbose logging can consume disk space quickly and may expose sensitive operational details.
::::

## Procedure

### Step 1: Review current log settings

1. Sign in to the management server.

2. Display current log configuration.

   ```bash
   sudo ssphere-maintenance logs show
   ```

3. Review log level, retention, rotation, and forwarding status.

   | Setting | Recommended value |
   |---|---|
   | Default log level | `WARN` |
   | Audit log retention | According to compliance policy |
   | Application log retention | 30 to 90 days |
   | Rotation frequency | Daily or size-based |
   | Compression | Enabled for rotated logs |

### Step 2: Configure log rotation

1. Set the application log retention period.

   ```bash
   sudo ssphere-maintenance logs retention set --type application --days 30
   ```

2. Set the audit log retention period.

   ```bash
   sudo ssphere-maintenance logs retention set --type audit --days 365
   ```

3. Enable compression for rotated logs.

   ```bash
   sudo ssphere-maintenance logs rotation set --compress true
   ```

4. Confirm the configuration.

   ```bash
   sudo ssphere-maintenance logs show
   ```

### Step 3: Change log level for troubleshooting

1. Set the target component log level.

   ```bash
   sudo ssphere-maintenance logs level set --component discovery --level INFO --duration 2h
   ```

2. Reproduce or monitor the issue.

3. Return the component to the production log level.

   ```bash
   sudo ssphere-maintenance logs level set --component discovery --level WARN
   ```

4. Confirm that the level changed.

### Step 4: Export diagnostic logs

1. Create a diagnostic bundle.

   ```bash
   sudo ssphere-maintenance logs bundle create \
     --since "24 hours ago" \
     --output /var/tmp/ssphere-diagnostics
   ```

2. Review the bundle summary.

   ```text
   Bundle status: completed
   Bundle file: ssphere-diagnostics-20260613-171500.tar.gz
   ```

3. Restrict access to the bundle.

   ```bash
   sudo chmod 600 /var/tmp/ssphere-diagnostics/ssphere-diagnostics-20260613-171500.tar.gz
   ```

4. Share the bundle only through an approved secure channel.

::::note
Diagnostic bundles can include host names, user names, IP addresses, and configuration metadata. Follow your organization's data handling policy before sharing logs externally.
::::

### Step 5: Configure external log forwarding

1. Go to **Administration** > **System** > **Log Forwarding**.

2. Select **Add destination**.

3. Enter the SIEM or syslog endpoint.

   ```text
   logs.corp.example.com
   ```

4. Select the protocol and port.

   | Protocol | Port | Use when |
   |---|---|---|
   | Syslog over TLS | `6514` | Recommended for production |
   | Syslog UDP | `514` | Use only on trusted internal networks |
   | HTTPS event collector | `443` | Use for supported SIEM integrations |

5. Select the log categories to forward.

6. Send a test event.

## Verification

Confirm that the following conditions are true.

| Check | Expected result |
|---|---|
| Log rotation | Rotation and compression are enabled |
| Retention | Application and audit retention match policy |
| Log level | Production components use approved levels |
| Diagnostic bundle | Bundle can be created and secured |
| Forwarding | Test event arrives at the external logging platform |
| Disk usage | Log volumes have sufficient free space |

## Troubleshooting

### Log volume is filling up

- Identify large log files under `/var/log/ssphere`.
- Confirm that rotation and compression are enabled.
- Reduce verbose log levels to the approved production level.
- Increase log volume capacity if retention requirements require more space.

### External log forwarding fails

- Confirm network connectivity to the syslog or SIEM endpoint.
- Verify TLS certificates when using syslog over TLS.
- Confirm firewall rules allow outbound log forwarding traffic.
- Review `server.log` for forwarding errors.

### Diagnostic bundle creation fails

- Confirm that the output directory exists and has enough free space.
- Verify that the administrator has `sudo` access.
- Review `maintenance.log` for file access errors.
- Create a smaller bundle by reducing the time range.

## Related Topics

- [Monitoring System Health](./monitoring-system-health)
- [Troubleshooting Storage Discovery](../storage-discovery/troubleshooting-storage-discovery)
- [Configuring HTTPS](../security-configuration/configuring-https)
- [Configuring Email Notifications](../installation/configuring-email-notifications)
- [Firewall Requirements](../prerequisites/firewall-requirements)
