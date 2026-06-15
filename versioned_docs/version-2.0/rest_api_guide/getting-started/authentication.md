---
id: authentication
title: Authentication
description: Overview of REST API authentication for StorageSphere Enterprise 2.0.
sidebar_position: 3
---

# Authentication

## Overview

StorageSphere Enterprise 2.0 REST APIs use token-based authentication. API clients include a bearer token in each request to identify the calling user or service account.

Generate and rotate API tokens according to your organization's security policy.

## Key Concepts

| Concept | Description |
|---|---|
| API token | Secret value used by a client to authenticate API requests |
| Service account | Dedicated account used by automation or integrations |
| Token expiration | Time after which a token can no longer be used |
| Token rotation | Process of replacing an active token with a new token |
| Revocation | Administrative action that invalidates a token before expiration |

### Authentication header

Send the token in the `Authorization` header.

```text
Authorization: Bearer <api-token>
```

Example request:

```bash
curl \
  -H "Authorization: Bearer $SSPHERE_TOKEN" \
  -H "Accept: application/json" \
  https://ss-mgmt.corp.example.com/api/v2/status
```

::::warning
Do not store API tokens in source code, scripts, container images, or shared documentation. Use an approved secrets manager or protected runtime variable.
::::

## Best Practices

- Create dedicated service accounts for integrations.
- Assign the least-privilege role required by the workflow.
- Use short token lifetimes when supported by your security policy.
- Rotate tokens before expiration.
- Revoke unused tokens immediately.
- Log token use by account, not by token value.

## Related Topics

- [Authorization](./authorization)
- [Getting Started](/docs/rest_api_guide/getting-started)
- [Error Handling](../api-fundamentals/error-handling)
- [Managing Users](../../user_guide/administration/managing-users)
- [Configuring Role-Based Access Control (RBAC)](../../installation_and_configuration_guide/security-configuration/configuring-role-based-access-control-rbac)
