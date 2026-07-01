---
id: configuring-active-directory-authentication
title: Configuring Active Directory Authentication
description: Steps to configure Microsoft Active Directory authentication for StorageSphere Enterprise.
sidebar_position: 5
---

# Configuring Active Directory Authentication

## Overview

This topic describes how to configure Microsoft Active Directory authentication for StorageSphere Enterprise. Active Directory authentication lets administrators sign in with domain credentials and receive StorageSphere roles based on Active Directory group membership.

Use this topic when your organization manages user identities in Active Directory. For standards-based LDAP directories such as OpenLDAP, see [Configuring LDAP Authentication](./configuring-ldap-authentication).

## Before You Begin

### Prerequisites

- Installed StorageSphere Server. See [Installing StorageSphere Server](./installing-storagesphere-server).
- Configured database connection. See [Configuring the Database](./configuring-the-database).
- Active Directory domain controllers reachable from the management server.
- Service account with read access to users and groups.
- Active Directory security groups for StorageSphere RBAC roles.
- Firewall rules for LDAPS or global catalog access. See [Firewall Requirements](../prerequisites/firewall-requirements).

### Supported Active Directory configurations

| Configuration | Supported | Notes |
|---|---|---|
| Single forest, single domain | Supported | Standard deployment |
| Single forest, multiple domains | Supported | Use global catalog for cross-domain group lookup |
| Multiple forests with trust | Supported | Requires reachable trusted domains and clear group mapping |
| LDAPS | Supported | Recommended for production |
| LDAP without TLS | Supported for test only | Do not use for production credentials |

### Required access

| Role | Access needed |
|---|---|
| StorageSphere administrator | Permission to configure authentication providers |
| Active Directory administrator | Service account, base DN, group DNs, and domain controller information |
| Security administrator | Approval for service account permissions and TLS trust |

### Required information

Collect the following values before you start.

| Item | Example | Used for |
|---|---|---|
| Domain FQDN | `corp.example.com` | Active Directory provider configuration |
| Domain controller | `dc01.corp.example.com` | Directory connection |
| LDAPS port | `636` | Secure directory connection |
| Global catalog port | `3269` | Cross-domain group lookup |
| Bind account UPN | `ssphere-svc@corp.example.com` | Service account |
| User search base | `dc=corp,dc=example,dc=com` | User lookup |
| Admin group DN | `cn=SSphere-Admins,ou=Groups,dc=corp,dc=example,dc=com` | RBAC mapping |

:::note
Use a dedicated service account with read-only directory permissions. StorageSphere Enterprise does not require domain administrator privileges.
:::

## Procedure

### Step 1: Verify domain controller connectivity

1. Sign in to the management server.

2. Test LDAPS connectivity to the domain controller.

   ```bash
   nc -zv dc01.corp.example.com 636
   ```

3. If your deployment uses global catalog lookup, test port 3269.

   ```bash
   nc -zv dc01.corp.example.com 3269
   ```

4. Verify the domain controller certificate.

   ```bash
   openssl s_client -connect dc01.corp.example.com:636 -showcerts
   ```

5. Add the enterprise CA certificate to the management server trust store if required.

   ```bash
   sudo cp corp-root-ca.crt /etc/pki/ca-trust/source/anchors/
   sudo update-ca-trust
   ```

### Step 2: Validate the service account

1. Test a bind with the service account UPN.

   ```bash
   ldapwhoami \
     -H ldaps://dc01.corp.example.com:636 \
     -D "ssphere-svc@corp.example.com" \
     -W
   ```

2. Confirm that the command returns the service account identity.

3. Test lookup for a domain user.

   ```bash
   ldapsearch \
     -H ldaps://dc01.corp.example.com:636 \
     -D "ssphere-svc@corp.example.com" \
     -W \
     -b "dc=corp,dc=example,dc=com" \
     "(sAMAccountName=jsmith)"
   ```

4. Test lookup for the StorageSphere administrator group.

   ```bash
   ldapsearch \
     -H ldaps://dc01.corp.example.com:636 \
     -D "ssphere-svc@corp.example.com" \
     -W \
     -b "dc=corp,dc=example,dc=com" \
     "(cn=SSphere-Admins)"
   ```

### Step 3: Add the Active Directory provider

1. Run the Active Directory provider command.

   ```bash
   sudo ssphere-setup auth ad add
   ```

2. Enter the provider name.

   ```text
   Provider name: corporate-ad
   ```

3. Enter the domain FQDN.

   ```text
   Domain: corp.example.com
   ```

4. Enter the domain controller URL.

   ```text
   Domain controller URL: ldaps://dc01.corp.example.com:636
   ```

5. Enter the bind account UPN.

   ```text
   Bind account: ssphere-svc@corp.example.com
   ```

6. Enter the bind account password when prompted.

7. Select the TLS validation mode.

   | Mode | Use when |
   |---|---|
   | `strict` | Domain controller certificate is trusted |
   | `ca-file` | You provide a dedicated CA certificate path |
   | `insecure` | Temporary test only; not supported for production |

### Step 4: Configure user lookup

1. Set the user search base.

   ```bash
   sudo ssphere-setup auth ad set-user-base corporate-ad "dc=corp,dc=example,dc=com"
   ```

2. Set the sign-in attribute.

   ```bash
   sudo ssphere-setup auth ad set-login-attribute corporate-ad sAMAccountName
   ```

3. Configure display name and email attributes.

   ```bash
   sudo ssphere-setup auth ad set-user-attribute corporate-ad displayName displayName
   sudo ssphere-setup auth ad set-user-attribute corporate-ad email mail
   ```

4. If users sign in with UPNs, enable UPN sign-in.

   ```bash
   sudo ssphere-setup auth ad enable-upn-login corporate-ad
   ```

### Step 5: Configure group lookup

1. Set the group search base.

   ```bash
   sudo ssphere-setup auth ad set-group-base corporate-ad "ou=Groups,dc=corp,dc=example,dc=com"
   ```

2. Enable nested group resolution if your RBAC groups contain nested groups.

   ```bash
   sudo ssphere-setup auth ad enable-nested-groups corporate-ad
   ```

3. Enable global catalog lookup for multi-domain forests.

   ```bash
   sudo ssphere-setup auth ad set-global-catalog corporate-ad ldaps://gc01.corp.example.com:3269
   ```

:::tip
Use dedicated Active Directory groups for StorageSphere roles. Dedicated groups simplify access reviews and reduce accidental privilege assignment from broad operational groups.
:::

### Step 6: Map Active Directory groups to RBAC roles

1. Map the Active Directory administrator group to the StorageSphere Administrator role.

   ```bash
   sudo ssphere-setup auth role-map add \
     --provider corporate-ad \
     --group "cn=SSphere-Admins,ou=Groups,dc=corp,dc=example,dc=com" \
     --role Administrator
   ```

2. Map the storage operations group to the Operator role.

   ```bash
   sudo ssphere-setup auth role-map add \
     --provider corporate-ad \
     --group "cn=Storage-Operators,ou=Groups,dc=corp,dc=example,dc=com" \
     --role Operator
   ```

3. Map the reporting group to the Viewer role.

   ```bash
   sudo ssphere-setup auth role-map add \
     --provider corporate-ad \
     --group "cn=Storage-Report-Viewers,ou=Groups,dc=corp,dc=example,dc=com" \
     --role Viewer
   ```

### Step 7: Enable Active Directory authentication

1. Test the Active Directory provider configuration.

   ```bash
   sudo ssphere-setup auth ad test corporate-ad --username jsmith
   ```

2. Enable the provider.

   ```bash
   sudo ssphere-setup auth ad enable corporate-ad
   ```

3. Restart the authentication service.

   ```bash
   sudo systemctl restart ssphere-auth
   ```

4. Sign in to the web UI with an Active Directory user assigned to a mapped group.

:::warning
Keep at least one local break-glass administrator account enabled. If Active Directory is unavailable, local access might be required to restore authentication.
:::

## Verification

Confirm that the following conditions are true before you continue.

| Check | Expected result |
|---|---|
| Domain controller connectivity | Management server connects to LDAPS port 636 |
| Service account bind | Bind account authenticates successfully |
| User lookup | Test domain user resolves by `sAMAccountName` or UPN |
| Group lookup | Active Directory groups resolve from the configured search base |
| Nested group lookup | Nested groups resolve if enabled |
| RBAC mapping | Domain user receives the expected StorageSphere role |
| Sign-in test | Active Directory user signs in to the web UI successfully |

## Troubleshooting

### Active Directory bind fails

- Confirm that the service account UPN and password are correct.
- Verify that the account is not locked, disabled, or expired.
- Confirm that the domain controller accepts LDAPS connections.
- Review domain controller security logs for authentication failures.

### User lookup returns no results

- Confirm that the user exists under the configured search base.
- Verify whether users sign in with `sAMAccountName` or UPN.
- Check whether the user is in another domain and requires global catalog lookup.
- Test the same filter with `ldapsearch` from the management server.

### Group mapping does not apply

- Verify that the mapped group DN is exact and includes the correct OU path.
- Enable nested group lookup if role membership depends on nested groups.
- Confirm that the user token includes the expected group membership.
- Review `/var/log/ssphere/auth-service.log` for role mapping errors.

### Certificate validation fails

- Confirm that the domain controller certificate is not expired.
- Verify that the certificate subject alternative name includes the domain controller FQDN.
- Add the enterprise CA certificate to the management server trust store.
- Restart `ssphere-auth` after updating the trust store.

## Related Topics

- [Configuring LDAP Authentication](./configuring-ldap-authentication)
- [Installing StorageSphere Server](./installing-storagesphere-server)
- [Configuring Email Notifications](./configuring-email-notifications)
- [Network Requirements](../prerequisites/network-requirements)
- [Firewall Requirements](../prerequisites/firewall-requirements)
- [Installation and Configuration Guide](../introduction_icg)
