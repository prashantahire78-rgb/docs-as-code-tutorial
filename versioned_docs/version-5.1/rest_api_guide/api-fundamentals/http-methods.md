---
id: http-methods
title: HTTP Methods
description: Reference information for HTTP methods used by StorageSphere Enterprise 3.0 REST APIs.
sidebar_position: 1
---

# HTTP Methods

## Overview

StorageSphere Enterprise REST APIs use standard HTTP methods to act on resources. Use the generated API Reference to confirm which methods are supported by each endpoint.

## Reference Information

| Method | Typical use | Idempotent |
|---|---|---|
| `GET` | Retrieve a resource or collection | Yes |
| `POST` | Create a resource or start an action | No |
| `PUT` | Replace a resource or complete update | Yes |
| `PATCH` | Partially update a resource | Usually |
| `DELETE` | Remove a resource or relationship | Yes |

### Method selection guidance

| Goal | Typical method |
|---|---|
| Read storage systems | `GET` |
| Start a discovery workflow | `POST` |
| Update alert assignment | `PATCH` |
| Replace report schedule settings | `PUT` |
| Delete an unused token or schedule | `DELETE` |

::::note
Some operations that trigger workflows use `POST` even when they do not create a permanent resource. Examples include starting discovery, running a report, or validating a connection.
::::

## Recommendations

- Use `GET` only for read operations.
- Do not send request bodies with `GET` unless the API Reference explicitly supports it.
- Treat `POST` actions as non-idempotent unless the API Reference documents idempotency behavior.
- Use client-generated request IDs for operations that might be retried.

## Related Topics

- [Request Format](./request-format)
- [Response Format](./response-format)
- [Error Handling](./error-handling)
- [HTTP Status Codes](./http-status-codes)
