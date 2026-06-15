---
id: configuring-password-policies
title: Configuring Password Policies
description: Steps to configure password policies for StorageSphere Enterprise 3.0.
sidebar_position: 4
---

# Configuring Password Policies

## Overview

This topic describes how to configure password policies for StorageSphere Enterprise 3.0. Password policies control password complexity, expiration, reuse, lockout behavior, and session handling for local StorageSphere users.

Configure password policies after installation and before creating production local accounts. If your deployment uses LDAP or Active Directory authentication, manage directory user password policies in the directory service and use StorageSphere password policies for local break-glass and service accounts.

## Before You Begin

### Prerequisites

- Installed and licensed StorageSphere Enterprise 3.0. See [Installing the License](../installation/installing-the-license).
- Configured HTTPS for administrator access. See [Configuring HTTPS](./configuring-https).
- StorageSphere Administrator role access.
- Approved password and account lockout requirements from your security team.
- Identified local administrator or break-glass accounts that remain outside LDAP or Active Directory.
- Email notifications configured if you want account lockout or password expiration notifications. See [Configuring Email Notifications](../installation/configuring-email-notifications).

### Policy scope

| Account type | Policy source | Notes |
|---|---|---|
| Local StorageSphere users | StorageSphere password policy | Configure in StorageSphere Enterprise |
| LDAP users | Directory service | Configure in LDAP or identity platform |
| Active Directory users | Active Directory Group Policy | Configure in Active Directory |
| API service accounts | StorageSphere token and account policy | Use scoped roles and expiring tokens |
| Break-glass accounts | StorageSphere password policy | Store and review according to security policy |

### Required access

| Role | Access needed |
|---|---|
| StorageSphere administrator | Permission to configure password policies |
| Security administrator | Approval for complexity, expiration, and lockout settings |
| Identity administrator | Confirmation of directory password policy alignment |
| Audit or compliance owner | Review of exception and break-glass account handling |

### Recommended policy values

| Setting | Recommended value | Purpose |
|---|---|---|
| Minimum length | `14` characters | Reduce risk from password guessing |
| Complexity | Uppercase, lowercase, number, and special character | Enforce strong passwords |
| Password history | `10` previous passwords | Prevent immediate reuse |
| Maximum age | `90` days | Align with enterprise rotation policy when required |
| Failed sign-in limit | `5` attempts | Limit brute-force attempts |
| Lockout duration | `30` minutes | Reduce attack impact while allowing recovery |
| Session idle timeout | `30` minutes | Reduce risk from unattended sessions |

::::note
Password expiration requirements vary by organization and regulatory framework. Align StorageSphere settings with your approved enterprise security standard.
::::

## Procedure

### Step 1: Sign in to StorageSphere Enterprise

1. Open the StorageSphere Enterprise web UI.

2. Sign in as a user with the StorageSphere Administrator role.

3. Confirm that HTTPS is enabled and trusted.

### Step 2: Open password policy settings

1. Go to **Administration** > **Security**.

2. Select **Password Policies**.

3. Review the current policy.

### Step 3: Configure password complexity

1. Select **Edit policy**.

2. Set the minimum password length.

   ```text
   Minimum length: 14
   ```

3. Enable character requirements.

   | Requirement | Recommended setting |
   |---|---|
   | Uppercase letter | Required |
   | Lowercase letter | Required |
   | Number | Required |
   | Special character | Required |
   | User name in password | Not allowed |

4. Set the password history requirement.

   ```text
   Password history: 10
   ```

### Step 4: Configure password expiration

1. Enable password expiration if required by your security policy.

2. Set the maximum password age.

   ```text
   Maximum age: 90 days
   ```

3. Set the expiration warning period.

   ```text
   Warning period: 14 days
   ```

4. Select whether users must change passwords at next sign-in after an administrator resets a password.

   ```text
   Require password change after reset: Enabled
   ```

### Step 5: Configure account lockout

1. Enable account lockout.

2. Set the failed sign-in limit.

   ```text
   Failed sign-in limit: 5
   ```

3. Set the lockout duration.

   ```text
   Lockout duration: 30 minutes
   ```

4. Set the failed attempt reset interval.

   ```text
   Reset failed attempts after: 15 minutes
   ```

::::warning
Keep at least one approved break-glass administrator account available. Store credentials according to your incident response and privileged access management procedures.
::::

### Step 6: Configure session controls

1. Set the web UI idle timeout.

   ```text
   Idle timeout: 30 minutes
   ```

2. Set the maximum session duration.

   ```text
   Maximum session duration: 12 hours
   ```

3. Enable session termination after password change.

4. Enable audit logging for sign-in, lockout, password reset, and policy change events.

### Step 7: Save and apply the policy

1. Review the policy summary.

2. Select **Save**.

3. Confirm the policy change.

4. Notify administrators and local users if the policy requires password changes at next sign-in.

### Step 8: Test the policy

1. Create or select a test local user account.

2. Attempt to set a password that does not meet complexity requirements.

3. Confirm that StorageSphere Enterprise rejects the password and displays the applicable requirement.

4. Set a compliant password.

5. Test the failed sign-in lockout threshold in a non-production or approved test window.

6. Confirm that audit events are recorded.

## Verification

Confirm that the following conditions are true after password policy configuration.

| Check | Expected result |
|---|---|
| Complexity policy | Minimum length and character requirements match the approved standard |
| Expiration policy | Maximum age and warning period match security requirements |
| Lockout policy | Failed attempt limit and lockout duration are configured |
| Session controls | Idle timeout and maximum session duration are configured |
| Local account test | Noncompliant passwords are rejected |
| Audit logging | Password and lockout events appear in audit logs |

## Troubleshooting

### Users cannot set new passwords

- Confirm that the password meets all configured complexity requirements.
- Check whether the password matches a value in password history.
- Verify that the user name or email address is not included in the password.
- Review audit logs for the exact policy rule that rejected the password.

### Local administrator account is locked

- Sign in with another approved StorageSphere Administrator account.
- Unlock the account from **Administration** > **Security** > **Users**.
- Review failed sign-in audit events to determine whether the lockout was expected.
- Use the break-glass procedure if all administrator accounts are locked.

### Directory users are not affected by the policy

- Confirm whether the users authenticate through LDAP or Active Directory.
- Manage directory user password complexity, expiration, and lockout settings in the directory service.
- Use StorageSphere password policies only for local users and local break-glass accounts.

### Password expiration notifications are not sent

- Confirm that email notifications are configured and tested.
- Verify that the expiration warning period is enabled.
- Confirm that the local user account has a valid email address.
- Review notification logs for delivery errors.

## Related Topics

- [Configuring Role-Based Access Control (RBAC)](./configuring-role-based-access-control-rbac)
- [Configuring HTTPS](./configuring-https)
- [Configuring LDAP Authentication](../installation/configuring-ldap-authentication)
- [Configuring Active Directory Authentication](../installation/configuring-active-directory-authentication)
- [Configuring Email Notifications](../installation/configuring-email-notifications)
