---
id: configuring-ldap-authentication
title: Configuring LDAP Authentication
description: Steps to configure OpenLDAP authentication for StorageSphere Enterprise.
sidebar_position: 4
---

# Configuring LDAP Authentication

## Overview

This topic describes how to configure LDAP authentication for StorageSphere Enterprise. Use LDAP authentication when your organization manages users and groups in OpenLDAP or another standards-based LDAP directory.

LDAP authentication lets StorageSphere Enterprise authenticate users through your directory service and map LDAP groups to StorageSphere roles.

## Before You Begin

### Prerequisites

- Installed StorageSphere Server. See [Installing StorageSphere Server](./installing-storagesphere-server).
- Configured database connection. See [Configuring the Database](./configuring-the-database).
- LDAP server reachable from the management server on port 389 or 636.
- Service account with read access to users and groups.
- Directory group names that map to StorageSphere RBAC roles.
- Firewall rule that allows LDAP or LDAPS traffic from the management server. See [Firewall Requirements](../prerequisites/firewall-requirements).

### Supported LDAP configurations

| Configuration | Supported | Notes |
|---|---|---|
| OpenLDAP over LDAPS | Supported | Recommended for production |
| OpenLDAP with STARTTLS | Supported | Requires trusted directory certificate |
| OpenLDAP without TLS | Supported for test only | Do not use for production credentials |
| Anonymous bind | Not supported | Use a dedicated service account |

### Required access

| Role | Access needed |
|---|---|
| StorageSphere administrator | Permission to configure authentication providers |
| Directory administrator | LDAP base DN, bind DN, group filters, and certificate details |
| Security administrator | Approval for service account permissions and TLS trust |

### Required information

Collect the following values before you start.

| Item | Example | Used for |
|---|---|---|
| LDAP URL | `ldaps://ldap.corp.example.com:636` | Directory connection |
| Base DN | `dc=corp,dc=example,dc=com` | Search root |
| Bind DN | `cn=ssphere-svc,ou=service-accounts,dc=corp,dc=example,dc=com` | Service account |
| User search filter | `(uid={username})` | User lookup |
| Group search base | `ou=groups,dc=corp,dc=example,dc=com` | Group lookup |
| Admin group | `cn=ssphere-admins,ou=groups,dc=corp,dc=example,dc=com` | RBAC mapping |

:::warning
Always use LDAPS or STARTTLS for production LDAP authentication. Plain LDAP sends credentials without encryption unless protected by another approved secure channel.
:::

## Procedure

### Step 1: Verify LDAP connectivity

1. Sign in to the management server.

2. Test network connectivity to the LDAP server.

   ```bash
   nc -zv ldap.corp.example.com 636
   ```

3. Verify the LDAP server certificate.

   ```bash
   openssl s_client -connect ldap.corp.example.com:636 -showcerts
   ```

4. If the certificate is signed by an internal CA, add the CA certificate to the operating system trust store.

   ```bash
   sudo cp corp-root-ca.crt /etc/pki/ca-trust/source/anchors/
   sudo update-ca-trust
   ```

### Step 2: Validate the bind account

1. Test the service account bind from the management server.

   ```bash
   ldapwhoami \
     -H ldaps://ldap.corp.example.com:636 \
     -D "cn=ssphere-svc,ou=service-accounts,dc=corp,dc=example,dc=com" \
     -W
   ```

2. Confirm that the command returns the bind DN.

3. Test user lookup with the planned search base and filter.

   ```bash
   ldapsearch \
     -H ldaps://ldap.corp.example.com:636 \
     -D "cn=ssphere-svc,ou=service-accounts,dc=corp,dc=example,dc=com" \
     -W \
     -b "dc=corp,dc=example,dc=com" \
     "(uid=jsmith)"
   ```

4. Test group lookup.

   ```bash
   ldapsearch \
     -H ldaps://ldap.corp.example.com:636 \
     -D "cn=ssphere-svc,ou=service-accounts,dc=corp,dc=example,dc=com" \
     -W \
     -b "ou=groups,dc=corp,dc=example,dc=com" \
     "(cn=ssphere-admins)"
   ```

### Step 3: Add the LDAP provider

1. Run the authentication provider command.

   ```bash
   sudo ssphere-setup auth ldap add
   ```

2. Enter the provider name.

   ```text
   Provider name: corporate-openldap
   ```

3. Enter the LDAP URL.

   ```text
   LDAP URL: ldaps://ldap.corp.example.com:636
   ```

4. Enter the base DN.

   ```text
   Base DN: dc=corp,dc=example,dc=com
   ```

5. Enter the bind DN and password.

   ```text
   Bind DN: cn=ssphere-svc,ou=service-accounts,dc=corp,dc=example,dc=com
   ```

6. Select the TLS validation mode.

   | Mode | Use when |
   |---|---|
   | `strict` | Directory certificate is trusted by the management server |
   | `ca-file` | You provide a dedicated CA certificate path |
   | `insecure` | Temporary test only; not supported for production |

### Step 4: Configure user and group search

1. Configure the user search filter.

   ```bash
   sudo ssphere-setup auth ldap set-user-filter corporate-openldap "(uid={username})"
   ```

2. Configure the user display name attribute.

   ```bash
   sudo ssphere-setup auth ldap set-user-attribute corporate-openldap displayName cn
   ```

3. Configure the email attribute.

   ```bash
   sudo ssphere-setup auth ldap set-user-attribute corporate-openldap email mail
   ```

4. Configure the group search base.

   ```bash
   sudo ssphere-setup auth ldap set-group-base corporate-openldap "ou=groups,dc=corp,dc=example,dc=com"
   ```

5. Configure the group membership attribute.

   ```bash
   sudo ssphere-setup auth ldap set-group-member-attribute corporate-openldap member
   ```

### Step 5: Map LDAP groups to RBAC roles

1. Map the storage administrators group to the StorageSphere Administrator role.

   ```bash
   sudo ssphere-setup auth role-map add \
     --provider corporate-openldap \
     --group "cn=ssphere-admins,ou=groups,dc=corp,dc=example,dc=com" \
     --role Administrator
   ```

2. Map the operations group to the Operator role.

   ```bash
   sudo ssphere-setup auth role-map add \
     --provider corporate-openldap \
     --group "cn=storage-operators,ou=groups,dc=corp,dc=example,dc=com" \
     --role Operator
   ```

3. Map the reporting group to the Viewer role.

   ```bash
   sudo ssphere-setup auth role-map add \
     --provider corporate-openldap \
     --group "cn=storage-report-viewers,ou=groups,dc=corp,dc=example,dc=com" \
     --role Viewer
   ```

:::note
Keep at least one local break-glass administrator account. A local account helps you recover access if the LDAP service becomes unavailable.
:::

### Step 6: Enable LDAP authentication

1. Test the LDAP provider configuration.

   ```bash
   sudo ssphere-setup auth ldap test corporate-openldap --username jsmith
   ```

2. Enable the provider.

   ```bash
   sudo ssphere-setup auth ldap enable corporate-openldap
   ```

3. Restart the authentication service.

   ```bash
   sudo systemctl restart ssphere-auth
   ```

4. Sign in to the web UI with an LDAP user assigned to a mapped group.

## Verification

Confirm that the following conditions are true before you continue.

| Check | Expected result |
|---|---|
| LDAP connectivity | Management server connects to the LDAP server on port 636 or 389 |
| Bind account | Service account binds successfully |
| User lookup | Test user resolves with expected attributes |
| Group lookup | Mapped LDAP groups resolve from the configured group base |
| RBAC mapping | LDAP user receives the expected StorageSphere role |
| Sign-in test | LDAP user signs in to the web UI successfully |

## Troubleshooting

### LDAP bind fails

- Confirm that the bind DN and password are correct.
- Verify that the service account is not locked or disabled.
- Check whether the LDAP server requires LDAPS or STARTTLS.
- Review authentication logs on the LDAP server and management server.

### User cannot sign in

- Confirm that the user exists under the configured base DN.
- Verify that the user search filter matches the LDAP attribute used for sign-in.
- Confirm that the user belongs to at least one mapped group.
- Check whether the user account is disabled or expired in the directory.

### Group mapping does not apply

- Verify that the group DN exactly matches the value in the role mapping.
- Confirm that the LDAP membership attribute matches your directory schema.
- Test group lookup with `ldapsearch` from the management server.
- Review `/var/log/ssphere/auth-service.log` for group resolution errors.

### LDAPS certificate validation fails

- Confirm that the LDAP certificate chain is trusted by the management server.
- Verify that the certificate subject alternative name matches the LDAP server FQDN.
- Replace expired certificates before you enable production authentication.

## Related Topics

- [Configuring Active Directory Authentication](./configuring-active-directory-authentication)
- [Installing StorageSphere Server](./installing-storagesphere-server)
- [Configuring Email Notifications](./configuring-email-notifications)
- [Network Requirements](../prerequisites/network-requirements)
- [Firewall Requirements](../prerequisites/firewall-requirements)
- [Installation and Configuration Guide](../introduction_icg)
