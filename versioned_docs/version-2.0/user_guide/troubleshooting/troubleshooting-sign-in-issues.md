---
id: troubleshooting-sign-in-issues
title: Troubleshooting Sign-In Issues
description: Steps to troubleshoot sign-in issues in StorageSphere Enterprise 2.0.
sidebar_position: 1
---

# Troubleshooting Sign-In Issues

## Overview

This topic describes how to troubleshoot sign-in issues in StorageSphere Enterprise 2.0. Sign-in failures can result from incorrect provider selection, account lockout, expired passwords, role mapping issues, certificate warnings, or identity provider connectivity.

## Before You Begin

### Prerequisites

- StorageSphere Enterprise web UI is reachable.
- You know your authentication provider.
- You have access to your identity support or StorageSphere administrator contact.

### Common symptoms

| Symptom | Likely cause |
|---|---|
| Invalid credentials | Wrong password, wrong provider, or locked account |
| Access denied after sign-in | Missing role mapping |
| Certificate warning | Untrusted or mismatched HTTPS certificate |
| Provider unavailable | LDAP or Active Directory connectivity issue |
| Session expires quickly | Session or password policy setting |

## Procedure

### Step 1: Confirm the URL and certificate

1. Open the approved StorageSphere Enterprise URL.

2. Confirm that the browser shows a trusted HTTPS connection.

3. Do not continue if the certificate warning is unexpected.

### Step 2: Confirm the authentication provider

1. Select the provider assigned to your account.

2. Use local sign-in only for local StorageSphere accounts.

3. Use LDAP or Active Directory for enterprise directory accounts.

### Step 3: Retry sign-in

1. Enter your user name in the expected format.

2. Enter your password.

3. Select **Sign in**.

4. Record the error message if sign-in fails.

### Step 4: Escalate with details

1. Provide the provider name, time, user name, and error message.

2. Ask your administrator to review authentication and audit events.

::::warning
Do not repeatedly retry sign-in with an incorrect password. Repeated failures can lock your account.
::::

## Verification

| Check | Expected result |
|---|---|
| URL | Approved HTTPS URL is used |
| Provider | Correct authentication provider is selected |
| Account | Account is active and not locked |
| Role | User has at least one StorageSphere role |

## Troubleshooting

### Sign-in succeeds but menus are missing

- Confirm your assigned role.
- Ask an administrator to review group membership and role mappings.
- Sign out and sign in again after role changes.

### Directory sign-in fails for multiple users

- Check whether LDAP or Active Directory authentication is healthy.
- Review identity provider availability.
- Escalate to the StorageSphere and identity administrators.

## Related Topics

- [Signing In to StorageSphere Enterprise](../getting-started/signing-in-to-storagesphere-enterprise)
- [Understanding User Roles](../getting-started/understanding-user-roles)
- [Managing Users](../administration/managing-users)
- [Configuring Active Directory Authentication](../../installation_and_configuration_guide/installation/configuring-active-directory-authentication)
