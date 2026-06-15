---
id: signing-in-to-storagesphere-enterprise
title: Signing In to StorageSphere Enterprise
description: Steps to sign in to the StorageSphere Enterprise 2.0 web UI.
sidebar_position: 1
---

# Signing In to StorageSphere Enterprise

## Overview

This topic describes how to sign in to the StorageSphere Enterprise 2.0 web UI. StorageSphere Enterprise supports local users and enterprise identity providers, including LDAP and Active Directory.

Use your assigned account and role to access dashboards, inventory, monitoring, reports, and administration features.

## Before You Begin

### Prerequisites

- StorageSphere Enterprise is installed and reachable over HTTPS.
- You have a local, LDAP, or Active Directory account.
- Your account is assigned an appropriate StorageSphere role.
- Your browser trusts the StorageSphere Enterprise HTTPS certificate.

### Supported sign-in methods

| Method | Use when |
|---|---|
| Local user | You have a StorageSphere local account |
| LDAP | Your organization uses an LDAP directory |
| Active Directory | Your organization uses domain credentials |
| API token | You access REST APIs or automation workflows |

## Procedure

### Step 1: Open the web UI

1. Open a supported browser.

2. Go to the StorageSphere Enterprise URL.

   ```text
   https://ss-mgmt.corp.example.com
   ```

3. Confirm that the browser shows a trusted HTTPS connection.

### Step 2: Select the authentication provider

1. On the sign-in page, select the authentication provider.

2. Use **Local** only for local StorageSphere accounts.

3. Use your enterprise provider for LDAP or Active Directory accounts.

### Step 3: Sign in

1. Enter your user name.

2. Enter your password.

3. Select **Sign in**.

4. If prompted, review the session notice or security banner.

::::note
Your available menus and actions depend on your assigned role. If you can sign in but cannot access a feature, contact a StorageSphere Administrator.
::::

## Verification

Confirm that the following conditions are true.

| Check | Expected result |
|---|---|
| Sign-in | Web UI accepts your credentials |
| Dashboard | Dashboard loads successfully |
| Role | Menus match your assigned responsibilities |
| Session | Your user name appears in the profile menu |

## Troubleshooting

### Sign-in fails

- Confirm that you selected the correct authentication provider.
- Verify your user name format, such as `jsmith` or `jsmith@corp.example.com`.
- Confirm that your account is not locked or disabled.
- Contact your identity administrator for LDAP or Active Directory account issues.

### Browser shows a certificate warning

- Confirm that you used the approved StorageSphere FQDN.
- Contact your administrator if the certificate is expired or untrusted.
- Do not enter credentials on a page with an unexpected certificate warning.

## Related Topics

- [Navigating the Web UI](./navigating-the-web-ui)
- [Setting User Preferences](./setting-user-preferences)
- [Understanding User Roles](./understanding-user-roles)
- [Configuring HTTPS](../../installation_and_configuration_guide/security-configuration/configuring-https)
