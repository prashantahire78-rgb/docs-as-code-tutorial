---
id: api-best-practices
title: API Best Practices
description: Best practices for building StorageSphere Enterprise REST API integrations.
sidebar_position: 9
---

# API Best Practices

## Overview

This topic provides best practices for building reliable StorageSphere Enterprise REST API integrations. Apply these practices to automation, reporting pipelines, monitoring integrations, and operational tools.

## Reference Information

### Integration design checklist

| Area | Recommendation |
|---|---|
| Security | Use HTTPS, service accounts, scoped roles, and protected tokens |
| Query design | Use filters, pagination, and explicit time ranges |
| Reliability | Handle retries, rate limits, and asynchronous workflows |
| Observability | Log request IDs, status codes, and integration job IDs |
| Change management | Test integrations before StorageSphere upgrades |
| Data handling | Protect exported inventory, audit, and operational data |

### Retry guidance

| Scenario | Retry guidance |
|---|---|
| `429 Too Many Requests` | Retry after the specified delay |
| `503 Service Unavailable` | Retry with exponential backoff |
| Network timeout | Retry idempotent requests with backoff |
| `400` or `422` validation error | Do not retry until the request is corrected |
| `401` or `403` | Do not retry until token or permissions are fixed |

## Recommendations

- Keep API clients simple and explicit.
- Use stable resource IDs instead of display names for automation.
- Avoid broad queries that retrieve all inventory or metrics repeatedly.
- Separate read-only integrations from write or action workflows.
- Review audit logs during integration testing.
- Document integration ownership, token rotation, and support contacts.

::::warning
API integrations can change operational state when they start workflows or update alert status. Test write operations in a non-production environment before production use.
::::

## Related Topics

- [Authentication](../getting-started/authentication)
- [Authorization](../getting-started/authorization)
- [Pagination](./pagination)
- [Filtering and Sorting](./filtering-and-sorting)
- [Viewing Audit Logs](../../user_guide/administration/viewing-audit-logs)
