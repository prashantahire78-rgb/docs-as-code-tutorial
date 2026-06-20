---
id: authorization
title: Authorization
description: Overview of REST API authorization for StorageSphere Enterprise 3.0.
sidebar_position: 4
---

# Authorization

## Overview

StorageSphere Enterprise 3.0 uses Role-Based Access Control (RBAC) to authorize REST API requests. After authentication succeeds, StorageSphere Enterprise evaluates the caller's role and permissions before allowing access to a resource or action.

Authorization applies to API clients and web UI users consistently.

## Key Concepts

| Concept | Description |
|---|---|
| Role | Permission set assigned to a user, group, or service account |
| Permission | Allowed action, such as read inventory or manage alerts |
| Resource scope | Objects the caller can access, such as a site, system, or report |
| Denied request | Request that is authenticated but not permitted |
| Audit record | Logged authorization decision for security review |

### Common API role patterns

| Integration type | Recommended access |
|---|---|
| Inventory export | Read-only inventory and tag access |
| Capacity dashboard | Read-only capacity metrics and report access |
| Alert integration | Read alerts and update alert status |
| Discovery automation | Manage storage discovery and read collector status |
| Administrative automation | Specific administrative permissions approved by security |

::::note
If an API request returns `403 Forbidden`, authentication succeeded but the token does not have permission for the requested action.
::::

## Best Practices

- Use separate service accounts for separate integrations.
- Avoid using full administrator tokens for read-only workflows.
- Review API service account access during regular access reviews.
- Monitor audit logs for denied or unusual API requests.

## Related Topics

- [Authentication](./authentication)
- [HTTP Status Codes](../api-fundamentals/http-status-codes)
- [Common API Errors](../troubleshooting/common-api-errors)
- [Understanding User Roles](../../user_guide/getting-started/understanding-user-roles)
- [Viewing Audit Logs](../../user_guide/administration/viewing-audit-logs)
