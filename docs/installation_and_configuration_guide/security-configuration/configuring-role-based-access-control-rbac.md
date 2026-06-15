---
id: configuring-role-based-access-control-rbac
title: Configuring Role-Based Access Control (RBAC)
description: Steps to configure Role-Based Access Control in StorageSphere Enterprise 3.0.
sidebar_position: 3
---

# Configuring Role-Based Access Control (RBAC)

## Overview

This topic describes how to configure Role-Based Access Control (RBAC) for StorageSphere Enterprise 3.0. RBAC controls which users and groups can administer the platform, manage storage discovery, view inventory, acknowledge alerts, run reports, and access REST APIs.

Configure RBAC after authentication is configured. You can assign roles to local users, LDAP groups, or Active Directory groups, depending on the authentication providers enabled in your deployment.

## Before You Begin

### Prerequisites

- Installed and licensed StorageSphere Enterprise 3.0. See [Installing the License](../installation/installing-the-license).
- StorageSphere Administrator role access.
- Configured HTTPS for administrator access. See [Configuring HTTPS](./configuring-https).
- Configured LDAP or Active Directory authentication if you plan to map directory groups. See [Configuring LDAP Authentication](../installation/configuring-ldap-authentication) or [Configuring Active Directory Authentication](../installation/configuring-active-directory-authentication).
- Approved access model from your security or identity governance team.
- Directory group names or distinguished names for role mapping.

### Default roles

| Role | Typical users | Access level |
|---|---|---|
| StorageSphere Administrator | Platform administrators | Full system configuration, security settings, discovery, monitoring, and reporting |
| Storage Administrator | Storage operations team | Storage discovery, inventory, monitoring configuration, and alert handling |
| Storage Operator | Operations center users | View inventory, monitor health, acknowledge alerts, and run approved reports |
| Security Auditor | Security and compliance teams | Read-only access to audit logs, security settings, and user access reports |
| Report Viewer | Business and capacity planning users | Read-only access to dashboards and reports |
| API User | Automation service accounts | REST API access based on assigned permissions |

### Required access

| Role | Access needed |
|---|---|
| StorageSphere administrator | Permission to create roles and map users or groups |
| Identity administrator | Directory group names, membership, and ownership |
| Security administrator | Approval for least-privilege access model |
| Audit or compliance owner | Review of privileged access and audit requirements |

### Required information

Collect the following values before you start.

| Item | Example | Used for |
|---|---|---|
| Admin group | `cn=SSphere-Admins,ou=Groups,dc=corp,dc=example,dc=com` | Administrator role mapping |
| Operator group | `cn=SSphere-Operators,ou=Groups,dc=corp,dc=example,dc=com` | Operations access |
| Auditor group | `cn=SSphere-Auditors,ou=Groups,dc=corp,dc=example,dc=com` | Read-only audit access |
| API service account | `ssphere-api-automation` | Integration access |
| Access review owner | `security-governance@corp.example.com` | Periodic access review |

::::note
Assign access to groups instead of individual users whenever possible. Group-based assignments simplify access reviews and reduce configuration drift.
::::

## Procedure

### Step 1: Sign in to StorageSphere Enterprise

1. Open the StorageSphere Enterprise web UI.

2. Sign in as a user with the StorageSphere Administrator role.

3. Confirm that HTTPS is enabled and the connection is trusted.

### Step 2: Open RBAC settings

1. Go to **Administration** > **Security**.

2. Select **Role-Based Access Control**.

3. Review the existing roles and assignments.

### Step 3: Review permission categories

1. Open **Permissions**.

2. Review the available permission categories.

   | Permission category | Controls access to |
   |---|---|
   | System administration | Global settings, licensing, collectors, and platform health |
   | Security administration | Authentication, RBAC, password policies, certificates, and audit logs |
   | Storage discovery | Storage system connections, credentials, discovery jobs, and collectors |
   | Monitoring operations | Inventory views, alerts, dashboards, and metric data |
   | Reporting | Report creation, scheduling, export, and viewing |
   | REST API | API authentication and endpoint access |

3. Confirm which permissions are required for each operational role.

### Step 4: Create a custom role

Use this step only if the default roles do not match your approved access model.

1. Select **Create role**.

2. Enter the role name.

   ```text
   Storage Discovery Operator
   ```

3. Enter a description.

   ```text
   Can add storage systems, run discovery, and view discovery results without changing security settings.
   ```

4. Select the required permissions.

   | Permission | Recommended setting |
   |---|---|
   | View storage inventory | Enabled |
   | Manage storage discovery | Enabled |
   | Manage collectors | View only |
   | Manage credentials | Add and update storage credentials |
   | Manage security settings | Disabled |
   | View reports | Enabled |

5. Select **Save**.

::::warning
Do not grant security administration permissions to operational roles unless the role owner is approved to manage authentication, certificates, and privileged access.
::::

### Step 5: Map directory groups to roles

1. Select **Role mappings**.

2. Select **Add mapping**.

3. Select the authentication provider.

   | Provider type | Example |
   |---|---|
   | Active Directory | `corporate-ad` |
   | LDAP | `corporate-ldap` |
   | Local | Local StorageSphere users |

4. Enter the group name or distinguished name.

   ```text
   cn=SSphere-Operators,ou=Groups,dc=corp,dc=example,dc=com
   ```

5. Select the StorageSphere role.

   ```text
   Storage Operator
   ```

6. Select **Save**.

7. Repeat these steps for each approved group mapping.

### Step 6: Configure API access

1. Select **API access**.

2. Select the user or service account used by the integration.

3. Assign the least-privilege role required by the integration.

   | Integration use case | Recommended role |
   |---|---|
   | Inventory export | Report Viewer or custom read-only API role |
   | Discovery automation | Custom role with storage discovery permissions |
   | Alert integration | Storage Operator or custom alert API role |
   | Administrative automation | StorageSphere Administrator only when required and approved |

4. Select **Require token expiration**.

5. Set the token duration according to your security policy.

   ```text
   Token duration: 90 days
   ```

### Step 7: Test role assignments

1. Sign out of the web UI.

2. Sign in as a test user from each mapped group.

3. Confirm that the user can access only the approved features.

4. Confirm that restricted pages are not available.

5. Record the test results in your access control deployment record.

## Verification

Confirm that the following conditions are true after RBAC configuration.

| Check | Expected result |
|---|---|
| Role mappings | Approved LDAP or Active Directory groups are mapped to roles |
| Least privilege | Users receive only the permissions required for their responsibilities |
| Administrator access | At least two approved administrator accounts or groups are configured |
| Audit access | Security auditors have read-only access to audit and security views |
| API access | Service accounts use scoped roles and expiring tokens |
| Test users | Representative users can sign in and access expected features |

## Troubleshooting

### User receives no role after sign-in

- Confirm that the user is a member of the mapped directory group.
- Verify that the group distinguished name matches the value returned by LDAP or Active Directory.
- Confirm that the authentication provider is enabled and synchronized.
- Review authentication logs for group lookup errors.

### User receives more access than expected

- Check whether the user belongs to multiple mapped groups.
- Review direct user assignments and remove unnecessary role grants.
- Confirm that custom roles do not include security or system administration permissions by mistake.
- Review audit logs for recent role mapping changes.

### API request fails with authorization errors

- Confirm that the API token belongs to the expected service account.
- Verify that the account has a role with permission for the requested endpoint.
- Confirm that the token has not expired.
- Review REST API audit logs for denied requests.

## Related Topics

- [Configuring LDAP Authentication](../installation/configuring-ldap-authentication)
- [Configuring Active Directory Authentication](../installation/configuring-active-directory-authentication)
- [Configuring Password Policies](./configuring-password-policies)
- [Configuring HTTPS](./configuring-https)
- [Managing SSL Certificates](./managing-ssl-certificates)
