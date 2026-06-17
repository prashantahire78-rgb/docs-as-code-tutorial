---
id: configuring-email-notifications
title: Configuring Email Notifications
description: Steps to configure SMTP email notifications for StorageSphere Enterprise.
sidebar_position: 3
---

# Configuring Email Notifications

## Overview

This topic describes how to configure email notifications for StorageSphere Enterprise. StorageSphere Enterprise uses email to send alert notifications, report delivery messages, license warnings, and system health notifications through your SMTP relay.

Configure email notifications after the management server and database are installed and running.

## Before You Begin

### Prerequisites

- Installed StorageSphere Server. See [Installing StorageSphere Server](./installing-storagesphere-server).
- Configured database connection. See [Configuring the Database](./configuring-the-database).
- SMTP relay reachable from the management server.
- Firewall rule that allows outbound SMTP traffic from the management server. See [Firewall Requirements](../prerequisites/firewall-requirements).
- Service account or application credential for authenticated SMTP, if required by your email platform.

### Supported SMTP configurations

| Configuration | Supported | Notes |
|---|---|---|
| SMTP without authentication | Supported | Use only on trusted internal relays |
| SMTP with STARTTLS | Supported | Recommended for enterprise deployments |
| SMTP over TLS | Supported | Typically uses port 465 |
| Microsoft 365 SMTP relay | Supported | Requires tenant-specific relay configuration |
| Anonymous internet SMTP | Not supported | Use an approved enterprise SMTP relay |

### Required access

| Role | Access needed |
|---|---|
| StorageSphere administrator | Permission to configure notification settings |
| Messaging administrator | SMTP relay host, port, authentication, and sender policy |
| Network administrator | Confirmation that SMTP ports are open from the management server |

### Required information

Collect the following values before you start.

| Item | Example | Used for |
|---|---|---|
| SMTP host | `smtp.corp.example.com` | Mail relay connection |
| SMTP port | `587` | Mail relay connection |
| Security mode | `STARTTLS` | TLS negotiation |
| SMTP user | `ssphere-notify@corp.example.com` | Authenticated relay |
| Sender address | `storagesphere@corp.example.com` | From address for notifications |
| Test recipient | `storage-admins@corp.example.com` | Verification email |

:::note
Use a monitored distribution list as the default recipient for system health and license notifications. Do not use a single employee mailbox for production alerts.
:::

## Procedure

### Step 1: Verify SMTP connectivity

1. Sign in to the management server.

2. Test connectivity to the SMTP relay.

   ```bash
   nc -zv smtp.corp.example.com 587
   ```

3. If your SMTP relay uses SMTPS, test port 465.

   ```bash
   nc -zv smtp.corp.example.com 465
   ```

4. Verify that the SMTP relay certificate is trusted by the management server.

   ```bash
   openssl s_client -starttls smtp -connect smtp.corp.example.com:587 -showcerts
   ```

### Step 2: Configure the SMTP relay

1. Run the StorageSphere email configuration command.

   ```bash
   sudo ssphere-setup notifications email configure
   ```

2. Enter the SMTP host.

   ```text
   SMTP host: smtp.corp.example.com
   ```

3. Enter the SMTP port.

   ```text
   SMTP port: 587
   ```

4. Select the security mode.

   | Security mode | Use when |
   |---|---|
   | `STARTTLS` | The SMTP relay supports TLS upgrade on port 587 |
   | `TLS` | The SMTP relay requires implicit TLS on port 465 |
   | `None` | The relay is restricted to a trusted internal network |

5. Enter the SMTP user name if the relay requires authentication.

   ```text
   SMTP user: ssphere-notify@corp.example.com
   ```

6. Enter the SMTP password when prompted.

:::warning
Use SMTP credentials with permission to send only approved notification messages. Do not reuse a personal account or a privileged administrative account.
:::

### Step 3: Configure sender and reply-to addresses

1. Set the default sender address.

   ```bash
   sudo ssphere-setup notifications email set-sender storagesphere@corp.example.com
   ```

2. Set the reply-to address for operational responses.

   ```bash
   sudo ssphere-setup notifications email set-reply-to storage-operations@corp.example.com
   ```

3. Set the display name.

   ```bash
   sudo ssphere-setup notifications email set-display-name "StorageSphere Enterprise"
   ```

### Step 4: Configure default notification recipients

1. Add the default operations distribution list.

   ```bash
   sudo ssphere-setup notifications recipients add storage-admins@corp.example.com
   ```

2. Add an escalation distribution list for critical alerts.

   ```bash
   sudo ssphere-setup notifications recipients add storage-escalation@corp.example.com --severity critical
   ```

3. List configured recipients.

   ```bash
   sudo ssphere-setup notifications recipients list
   ```

### Step 5: Send a test email

1. Send a test notification.

   ```bash
   sudo ssphere-setup notifications email test --to storage-admins@corp.example.com
   ```

2. Confirm that the recipient receives the test message.

3. Review the notification log if the test message does not arrive.

   ```bash
   sudo tail -n 100 /var/log/ssphere/notification-service.log
   ```

### Step 6: Enable system notification events

1. Enable system health notifications.

   ```bash
   sudo ssphere-setup notifications events enable system-health
   ```

2. Enable license notifications.

   ```bash
   sudo ssphere-setup notifications events enable license-expiration
   ```

3. Enable alert notifications.

   ```bash
   sudo ssphere-setup notifications events enable storage-alerts
   ```

4. Restart the notification service.

   ```bash
   sudo systemctl restart ssphere-notification
   ```

## Verification

Confirm that the following conditions are true before you continue.

| Check | Expected result |
|---|---|
| SMTP connectivity | Management server connects to the SMTP relay on the configured port |
| TLS validation | SMTP certificate is trusted when TLS or STARTTLS is enabled |
| Sender address | Test email uses the approved sender address |
| Recipients | Default recipients and escalation recipients are listed correctly |
| Test email | Recipient receives the test message |
| Notification service | `ssphere-notification` service is active after restart |

Use the following command to confirm service status.

```bash
sudo systemctl status ssphere-notification
```

:::tip
Create a low-severity test alert after initial configuration to verify that alert rules and email routing work together.
:::

## Troubleshooting

### Test email does not arrive

- Confirm that the recipient address is valid and does not block automated messages.
- Check spam or quarantine rules in your email security gateway.
- Review `/var/log/ssphere/notification-service.log` for SMTP errors.
- Ask your messaging administrator to confirm that the relay accepted the message.

### SMTP authentication fails

- Verify the SMTP user name and password.
- Confirm that the SMTP account is allowed to send through the relay.
- Check whether the account requires an app password or service principal.
- Confirm that the relay allows authentication from the management server IP address.

### TLS handshake fails

- Verify that the SMTP relay certificate chain is trusted by the management server.
- Confirm that the relay supports TLS 1.2 or later.
- Check whether the relay requires STARTTLS on port 587 instead of implicit TLS on port 465.

### Sender address is rejected

- Confirm that the sender address is allowed by your SMTP relay policy.
- Verify SPF, DKIM, or domain restrictions if your organization enforces sender validation.
- Use a sender address owned by the same domain as the SMTP relay account.

## Related Topics

- [Installing StorageSphere Server](./installing-storagesphere-server)
- [Configuring the Database](./configuring-the-database)
- [Configuring LDAP Authentication](./configuring-ldap-authentication)
- [Configuring Active Directory Authentication](./configuring-active-directory-authentication)
- [Network Requirements](../prerequisites/network-requirements)
- [Firewall Requirements](../prerequisites/firewall-requirements)
- [Installation and Configuration Guide](../introduction_icg)
