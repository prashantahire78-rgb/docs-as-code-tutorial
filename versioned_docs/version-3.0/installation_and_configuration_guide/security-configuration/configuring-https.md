---
id: configuring-https
title: Configuring HTTPS
description: Steps to configure HTTPS for StorageSphere Enterprise.
sidebar_position: 1
---

# Configuring HTTPS

## Overview

This topic describes how to configure HTTPS for StorageSphere Enterprise. HTTPS protects administrator access to the web UI, REST API access, and service communication that uses the management server endpoint.

Configure HTTPS after the management server and database are installed. For production deployments, use a certificate issued by an approved enterprise or public certificate authority.

## Before You Begin

### Prerequisites

- Installed StorageSphere Server. See [Installing StorageSphere Server](../installation/installing-storagesphere-server).
- Configured database connection. See [Configuring the Database](../installation/configuring-the-database).
- StorageSphere Administrator role access.
- Linux administrator access to the management server.
- DNS record for the management server FQDN.
- Firewall rule that allows administrator access to TCP port 443. See [Firewall Requirements](../prerequisites/firewall-requirements).
- Server certificate and private key, or approval to generate a certificate signing request.

### Supported HTTPS configurations

| Configuration | Supported | Notes |
|---|---|---|
| CA-signed certificate | Supported | Recommended for production |
| Internal enterprise CA certificate | Supported | Requires client and collector trust |
| Public CA certificate | Supported | Use when administrators access the web UI from managed networks |
| Self-signed certificate | Supported for test only | Do not use for production |
| HTTP without TLS | Not supported | Production access requires HTTPS |

### Required access

| Role | Access needed |
|---|---|
| StorageSphere administrator | Permission to configure security settings |
| Linux administrator | `sudo` access to install certificates and restart services |
| Security administrator | Approval for certificate issuer, cipher policy, and TLS settings |
| DNS administrator | Management server FQDN and alias records |

### Required information

Collect the following values before you start.

| Item | Example | Used for |
|---|---|---|
| Management server FQDN | `ss-mgmt.corp.example.com` | Certificate subject and administrator access |
| Subject alternative name | `ssphere.corp.example.com` | Alternate web UI name |
| Certificate file | `ss-mgmt.corp.example.com.crt` | HTTPS configuration |
| Private key file | `ss-mgmt.corp.example.com.key` | HTTPS configuration |
| CA chain file | `corp-intermediate-chain.crt` | Client trust validation |
| TLS profile | `modern` | Cipher and protocol policy |

::::warning
Protect the private key file. Store it only on approved administrative workstations and the StorageSphere management server, and restrict file permissions before enabling HTTPS.
::::

## Procedure

### Step 1: Verify the management server FQDN

1. Sign in to the management server.

2. Confirm that the server FQDN resolves to the management server address.

   ```bash
   nslookup ss-mgmt.corp.example.com
   ```

3. Confirm that the management server hostname matches the planned certificate name.

   ```bash
   hostname -f
   ```

4. Verify that TCP port 443 is reachable from an administrator workstation.

   ```bash
   nc -zv ss-mgmt.corp.example.com 443
   ```

### Step 2: Stage the certificate files

1. Create a certificate staging directory on the management server.

   ```bash
   sudo mkdir -p /etc/storagesphere/tls
   ```

2. Copy the server certificate, private key, and CA chain to the directory.

   ```bash
   sudo cp ss-mgmt.corp.example.com.crt /etc/storagesphere/tls/
   sudo cp ss-mgmt.corp.example.com.key /etc/storagesphere/tls/
   sudo cp corp-intermediate-chain.crt /etc/storagesphere/tls/
   ```

3. Restrict private key permissions.

   ```bash
   sudo chmod 600 /etc/storagesphere/tls/ss-mgmt.corp.example.com.key
   sudo chown root:ssphere /etc/storagesphere/tls/ss-mgmt.corp.example.com.key
   ```

### Step 3: Validate the certificate and key

1. Confirm that the certificate is readable.

   ```bash
   openssl x509 -in /etc/storagesphere/tls/ss-mgmt.corp.example.com.crt -noout -subject -issuer -dates
   ```

2. Confirm that the private key matches the certificate.

   ```bash
   sudo ssphere-security tls verify-keypair \
     --cert /etc/storagesphere/tls/ss-mgmt.corp.example.com.crt \
     --key /etc/storagesphere/tls/ss-mgmt.corp.example.com.key
   ```

3. Confirm that the certificate includes the management server FQDN in the subject alternative name.

### Step 4: Configure HTTPS

1. Run the HTTPS configuration command.

   ```bash
   sudo ssphere-security https configure
   ```

2. Enter the certificate file path.

   ```text
   Certificate file: /etc/storagesphere/tls/ss-mgmt.corp.example.com.crt
   ```

3. Enter the private key file path.

   ```text
   Private key file: /etc/storagesphere/tls/ss-mgmt.corp.example.com.key
   ```

4. Enter the CA chain file path.

   ```text
   CA chain file: /etc/storagesphere/tls/corp-intermediate-chain.crt
   ```

5. Select the TLS profile.

   | TLS profile | Use when |
   |---|---|
   | `modern` | Clients support TLS 1.3 and current TLS 1.2 cipher suites |
   | `enterprise` | You need broad TLS 1.2 compatibility for managed browsers and integrations |
   | `custom` | Security policy requires specific cipher suites approved by your organization |

6. Confirm the configuration summary.

### Step 5: Restart StorageSphere services

1. Restart the management server service.

   ```bash
   sudo systemctl restart ssphere-server
   ```

2. Confirm that the service is running.

   ```bash
   sudo systemctl status ssphere-server
   ```

3. Review the web service log if the service does not start.

   ```bash
   sudo journalctl -u ssphere-server --since "10 minutes ago"
   ```

### Step 6: Test HTTPS access

1. Open the StorageSphere Enterprise web UI by using the management server FQDN.

   ```text
   https://ss-mgmt.corp.example.com
   ```

2. Confirm that the browser shows a trusted connection.

3. Sign in as a StorageSphere Administrator.

4. Go to **Administration** > **Security** > **HTTPS**.

5. Confirm that HTTPS status is **Enabled**.

::::note
If collectors or REST API clients connect through a load balancer or reverse proxy, configure the certificate for the external FQDN that clients use.
::::

## Verification

Confirm that the following conditions are true before you hand over the system for production use.

| Check | Expected result |
|---|---|
| Web UI access | Administrators can access the web UI over HTTPS |
| Certificate trust | Browser and REST API clients trust the certificate chain |
| Certificate name | Certificate subject alternative name includes the management server FQDN |
| TLS version | TLS profile matches the approved security policy |
| Service health | `ssphere-server` service is running |
| HTTP access | Unencrypted HTTP is disabled or redirected to HTTPS |

Use the following command to inspect the active certificate.

```bash
openssl s_client -connect ss-mgmt.corp.example.com:443 -servername ss-mgmt.corp.example.com
```

## Troubleshooting

### Web UI does not load after enabling HTTPS

- Confirm that the `ssphere-server` service is running.
- Review the service log for certificate path, key permission, or binding errors.
- Verify that TCP port 443 is open between administrator workstations and the management server.
- Restore the previous HTTPS configuration if the service cannot start with the new certificate.

### Browser reports an untrusted certificate

- Confirm that the certificate chain includes the issuing intermediate CA.
- Import the enterprise root CA into managed workstations if your organization uses an internal CA.
- Verify that the browser is using the management server FQDN, not a short name or IP address.

### Certificate name mismatch appears

- Confirm that the FQDN in the browser matches a subject alternative name in the certificate.
- Reissue the certificate with the required DNS names.
- Update DNS or the configured access URL so administrators use the approved name.

## Related Topics

- [Managing SSL Certificates](./managing-ssl-certificates)
- [Configuring Role-Based Access Control (RBAC)](./configuring-role-based-access-control-rbac)
- [Configuring LDAP Authentication](../installation/configuring-ldap-authentication)
- [Configuring Active Directory Authentication](../installation/configuring-active-directory-authentication)
- [Firewall Requirements](../prerequisites/firewall-requirements)
