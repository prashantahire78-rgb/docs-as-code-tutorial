---
id: managing-users
title: Managing Users
description: Steps to manage users in StorageSphere Enterprise 3.0.
sidebar_position: 1
---

# Managing Users

## Overview

This topic describes how to manage users in StorageSphere Enterprise 3.0. User administration includes viewing user accounts, creating local users when required, disabling accounts, and reviewing role assignments. 

Use directory groups for regular enterprise access whenever LDAP or Active Directory is configured.

## Before You Begin

### Prerequisites

- You have StorageSphere Administrator access.
- Authentication providers are configured if you use LDAP or Active Directory users.
- RBAC requirements are approved by your security team.

### User account types

| Account type | Use for |
|---|---|
| Local user | Break-glass access or local administrative accounts |
| LDAP user | Enterprise users authenticated by LDAP |
| Active Directory user | Domain users authenticated by Active Directory |
| API service account | Automation and integrations |

## Procedure

### Step 1: Open user administration

1. Select **Administration** > **Users**.

2. Review the user list.

3. Filter by status, provider, role, or last sign-in.

### Step 2: Create a local user

1. Select **Create user**.

2. Enter user name, display name, and email address.

3. Assign a role.

4. Select whether the user must change password at next sign-in.

5. Select **Save**.

### Step 3: Update user status

1. Select a user.

2. Review assigned roles and recent sign-in activity.

3. Select **Disable** when access is no longer required.

4. Add a note for the access change.

::::warning
Do not use shared local accounts for routine operations. Shared accounts reduce audit accountability.
::::

## Verification

| Check | Expected result |
|---|---|
| User list | User appears with correct provider and status |
| Role | Assigned role matches approved access |
| Audit event | User creation or status change is recorded |
| Sign-in | User can sign in if account is active |

## Troubleshooting

### User cannot sign in

- Confirm account status.
- Check role assignment.
- Verify directory provider status for LDAP or Active Directory users.
- Review authentication events.

### Role assignment is incorrect

- Check direct role assignments.
- Review mapped directory groups.
- Confirm whether the user belongs to multiple groups.

## Related Topics

- [Understanding User Roles](../getting-started/understanding-user-roles)
- [Viewing Audit Logs](./viewing-audit-logs)
- [Configuring Role-Based Access Control (RBAC)](../../installation_and_configuration_guide/security-configuration/configuring-role-based-access-control-rbac)
- [Configuring Password Policies](../../installation_and_configuration_guide/security-configuration/configuring-password-policies)
