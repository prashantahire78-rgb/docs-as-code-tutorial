---
id: frequently-asked-questions
title: Frequently Asked Questions
description: Frequently asked questions about StorageSphere Enterprise 3.0 REST APIs.
sidebar_position: 3
---

# Frequently Asked Questions

## Overview

This topic answers common questions about using StorageSphere Enterprise 3.0 REST APIs.

## Reference Information

### Are the REST APIs available over HTTP?

No. Use HTTPS for all REST API traffic. For HTTPS configuration, see [Configuring HTTPS](../../installation_and_configuration_guide/security-configuration/configuring-https).

### Should integrations use personal user tokens?

No. Use dedicated API service accounts with least-privilege roles. Personal tokens make ownership, rotation, and auditing more difficult.

### Where can I find endpoint paths and schemas?

Use the generated API Reference. It is generated from the StorageSphere Enterprise OpenAPI specification and provides endpoint-specific information.

### Can API clients query all inventory without filters?

Some collection operations might allow broad queries, but integrations should use filters and pagination. Broad queries can increase response time and load on the management server.

### Why does the API return data that differs from the web UI?

Check filters, time range, permissions, aggregation interval, and data refresh timing. Use the same resource scope and time range when comparing API results with the web UI.

### How should clients handle token expiration?

Track token expiration, rotate tokens before expiration, and handle `401 Unauthorized` responses. Store tokens in an approved secrets manager.

### Can I generate endpoint documentation manually?

No. Endpoint reference documentation should be generated from the OpenAPI specification to keep it synchronized with the API implementation.

## Recommendations

- Start with read-only workflows before adding write or action workflows.
- Use the web UI to validate resource scope and expected data before automating a workflow.
- Store request IDs in integration logs.
- Review release notes and API Reference changes before upgrading integrations.

## Related Topics

- [Introduction to the API Reference](../api-reference/introduction-to-the-api-reference)
- [Authentication](../getting-started/authentication)
- [Pagination](../api-fundamentals/pagination)
- [Filtering and Sorting](../api-fundamentals/filtering-and-sorting)
- [API Best Practices](../api-fundamentals/api-best-practices)
