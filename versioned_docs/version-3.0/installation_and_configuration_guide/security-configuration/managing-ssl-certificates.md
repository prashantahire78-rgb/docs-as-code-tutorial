---
id: managing-ssl-certificates
title: Managing SSL Certificates
description: Steps to manage SSL certificates for StorageSphere Enterprise.
sidebar_position: 2
---

# Managing SSL Certificates

## Overview

This topic describes how to manage SSL certificates for StorageSphere Enterprise. Certificate management includes generating certificate signing requests, importing signed certificates, rotating certificates before expiration, and maintaining trusted certificate authorities for secure communication.

Use this topic when you deploy a new HTTPS certificate, replace an expiring certificate, or add trust for an internal certificate authority.

## Before You Begin

### Prerequisites

- Installed StorageSphere Server. See [Installing StorageSphere Server](../installation/installing-storagesphere-server).
- Configured HTTPS or planned HTTPS configuration. See [Configuring HTTPS](./configuring-https).
- Linux administrator access to the management server.
- StorageSphere Administrator role access.
- Approved certificate issuer and certificate profile from your security team.
- Maintenance window for certificate replacement in production environments.

### Supported certificate types

| Certificate type | Supported | Notes |
|---|---|---|
| PEM server certificate | Supported | Recommended format for StorageSphere services |
| PEM private key | Supported | Protect with restricted file permissions |
| PEM CA chain | Supported | Include intermediate certificates when required |
| PKCS#12 bundle | Supported for import | Convert or import through certificate tools |
| Wildcard certificate | Supported | Use only when approved by security policy |
| Self-signed certificate | Supported for test only | Not recommended for production |

### Required access

| Role | Access needed |
|---|---|
| StorageSphere administrator | Permission to view and apply certificate settings |
| Linux administrator | `sudo` access to stage files and restart services |
| Security administrator | Certificate approval, certificate authority details, and rotation policy |
| PKI administrator | Certificate signing and CA chain issuance |

### Required information

Collect the following values before you start.

| Item | Example | Used for |
|---|---|---|
| Common name | `ss-mgmt.corp.example.com` | Certificate identity |
| Subject alternative names | `ss-mgmt.corp.example.com`, `ssphere.corp.example.com` | Browser and API validation |
| Organization | `NovaStor Technologies Customer Operations` | Certificate subject |
| Key size | `RSA 3072` | Private key generation |
| Certificate validity | `397 days` | Rotation planning |
| Certificate owner | `storage-platform-team@corp.example.com` | Expiration notifications |

::::note
Plan certificate rotation at least 30 days before expiration. This schedule provides time for certificate issuance, change approval, validation, and rollback planning.
::::

## Procedure

### Step 1: Review the current certificate

1. Sign in to the management server.

2. Display the active HTTPS certificate.

   ```bash
   sudo ssphere-security certificates show --service https
   ```

3. Review the certificate details.

   | Field | Confirm |
   |---|---|
   | Subject | Matches the management server FQDN |
   | Subject alternative names | Include all approved access names |
   | Issuer | Matches an approved CA |
   | Expiration date | Meets your rotation window |
   | Key algorithm | Meets security policy |

### Step 2: Generate a certificate signing request

1. Create a directory for the certificate request.

   ```bash
   sudo mkdir -p /etc/storagesphere/csr
   ```

2. Generate a private key and certificate signing request.

   ```bash
   sudo ssphere-security certificates csr create \
     --common-name ss-mgmt.corp.example.com \
     --san DNS:ss-mgmt.corp.example.com \
     --san DNS:ssphere.corp.example.com \
     --key-out /etc/storagesphere/csr/ss-mgmt.corp.example.com.key \
     --csr-out /etc/storagesphere/csr/ss-mgmt.corp.example.com.csr
   ```

3. Restrict the private key.

   ```bash
   sudo chmod 600 /etc/storagesphere/csr/ss-mgmt.corp.example.com.key
   ```

4. Send the CSR to your certificate authority or PKI administrator.

### Step 3: Import the signed certificate

1. Copy the signed certificate and CA chain to the management server.

   ```bash
   sudo mkdir -p /etc/storagesphere/tls
   sudo cp ss-mgmt.corp.example.com.crt /etc/storagesphere/tls/
   sudo cp corp-intermediate-chain.crt /etc/storagesphere/tls/
   sudo cp /etc/storagesphere/csr/ss-mgmt.corp.example.com.key /etc/storagesphere/tls/
   ```

2. Validate the certificate chain.

   ```bash
   sudo ssphere-security certificates validate \
     --cert /etc/storagesphere/tls/ss-mgmt.corp.example.com.crt \
     --chain /etc/storagesphere/tls/corp-intermediate-chain.crt
   ```

3. Confirm that the certificate and private key match.

   ```bash
   sudo ssphere-security tls verify-keypair \
     --cert /etc/storagesphere/tls/ss-mgmt.corp.example.com.crt \
     --key /etc/storagesphere/tls/ss-mgmt.corp.example.com.key
   ```

### Step 4: Apply the certificate

1. Apply the certificate to the HTTPS service.

   ```bash
   sudo ssphere-security certificates apply \
     --service https \
     --cert /etc/storagesphere/tls/ss-mgmt.corp.example.com.crt \
     --key /etc/storagesphere/tls/ss-mgmt.corp.example.com.key \
     --chain /etc/storagesphere/tls/corp-intermediate-chain.crt
   ```

2. Confirm the pending certificate summary.

3. Restart the management server service.

   ```bash
   sudo systemctl restart ssphere-server
   ```

4. Confirm that the service is running.

   ```bash
   sudo systemctl status ssphere-server
   ```

### Step 5: Add a trusted CA certificate

Use this procedure when StorageSphere Enterprise must trust an internal CA for LDAP, Active Directory, storage platform APIs, or outbound integrations.

1. Copy the CA certificate to the management server.

   ```bash
   sudo cp corp-root-ca.crt /etc/pki/ca-trust/source/anchors/
   ```

2. Update the operating system trust store.

   ```bash
   sudo update-ca-trust
   ```

3. Import the CA certificate into StorageSphere trust.

   ```bash
   sudo ssphere-security certificates trust add \
     --name corp-root-ca \
     --file /etc/pki/ca-trust/source/anchors/corp-root-ca.crt
   ```

4. Restart services that use the trust store.

   ```bash
   sudo systemctl restart ssphere-server ssphere-collector
   ```

::::warning
Do not import an unverified CA certificate. Confirm the fingerprint with your PKI administrator before adding it to the trust store.
::::

### Step 6: Configure certificate expiration notifications

1. Go to **Administration** > **Security** > **Certificates**.

2. Select **Expiration notifications**.

3. Set the first warning threshold.

   ```text
   Warning threshold: 60 days
   ```

4. Set the critical warning threshold.

   ```text
   Critical threshold: 14 days
   ```

5. Select the notification recipients.

   ```text
   security-operations@corp.example.com
   ```

6. Select **Save**.

## Verification

Confirm that the following conditions are true after certificate changes.

| Check | Expected result |
|---|---|
| Active certificate | Shows the new certificate subject and issuer |
| Certificate chain | Chain validates without errors |
| Private key | Key matches the active certificate |
| Browser trust | Web UI opens without certificate warnings |
| REST API trust | API clients connect successfully over HTTPS |
| Expiration alerts | Notification thresholds are configured |

Use the following command to confirm the certificate presented by the management server.

```bash
openssl s_client -connect ss-mgmt.corp.example.com:443 -servername ss-mgmt.corp.example.com -showcerts
```

## Troubleshooting

### Certificate import fails

- Confirm that the certificate is in PEM format or use the supported import workflow for PKCS#12 files.
- Verify that the certificate file contains the server certificate and not only the CA chain.
- Confirm that the private key is readable by the StorageSphere service account.
- Review the certificate validation output for missing intermediate certificates.

### Certificate and key do not match

- Confirm that the private key was generated with the CSR used for signing.
- Locate the correct private key from the certificate request directory.
- Generate a new CSR if the original key cannot be located.

### Services fail to restart after certificate replacement

- Review `journalctl -u ssphere-server` for certificate loading errors.
- Confirm file paths and permissions.
- Restore the previous certificate files if the new certificate blocks service startup.
- Reapply the certificate after correcting the certificate chain or key.

## Related Topics

- [Configuring HTTPS](./configuring-https)
- [Configuring LDAP Authentication](../installation/configuring-ldap-authentication)
- [Configuring Active Directory Authentication](../installation/configuring-active-directory-authentication)
- [Configuring Email Notifications](../installation/configuring-email-notifications)
- [Network Requirements](../prerequisites/network-requirements)
