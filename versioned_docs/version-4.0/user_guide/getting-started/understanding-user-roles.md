---
id: understanding-user-roles
title: Understanding User Roles
description: Reference information about StorageSphere Enterprise user roles and access levels.
sidebar_position: 5
---

# Understanding User Roles

## Overview

This topic provides reference information about StorageSphere Enterprise user roles. Roles determine which pages, data, and actions are available to each user.

Role assignments are managed by StorageSphere Administrators and can be assigned to local users, LDAP groups, or Active Directory groups.

## Reference Information

### Common roles

| Role | Typical responsibilities | Common access |
|---|---|---|
| StorageSphere Administrator | Platform administration and security management | Full access |
| Storage Administrator | Storage operations and discovery management | Inventory, discovery, monitoring, alerts, reports |
| Storage Operator | Daily monitoring and alert response | Dashboards, inventory, alerts, events, reports |
| Security Auditor | Compliance and access review | Audit logs and security views |
| Report Viewer | Capacity and service review | Dashboards and reports |
| API User | Automation and integrations | REST API access based on assigned permissions |

### Permission categories

| Permission category | Controls access to |
|---|---|
| Dashboard | Operational summaries and widgets |
| Storage inventory | Storage systems, pools, volumes, hosts, and relationships |
| Monitoring | Capacity, performance, and health data |
| Alerts and events | Alert acknowledgement, event views, and history |
| Reports | Report execution, scheduling, export, and sharing |
| Administration | Users, roles, audit logs, collectors, and system settings |

::::note
If you belong to multiple mapped groups, StorageSphere Enterprise evaluates all assigned roles. Your effective access can include permissions from more than one role.
::::

## Recommendations

- Request the least-privilege role that supports your responsibilities.
- Use group-based access for operations teams instead of individual assignments.
- Review your role after team changes, site changes, or access review findings.
- Contact a StorageSphere Administrator when expected actions are missing.

## Related Topics

- [Signing In to StorageSphere Enterprise](./signing-in-to-storagesphere-enterprise)
- [Managing Users](../administration/managing-users)
- [Viewing Audit Logs](../administration/viewing-audit-logs)
- [Configuring Role-Based Access Control (RBAC)](../../installation_and_configuration_guide/security-configuration/configuring-role-based-access-control-rbac)
