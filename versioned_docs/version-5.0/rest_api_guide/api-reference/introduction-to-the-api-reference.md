---
id: introduction-to-the-api-reference
title: Introduction to the API Reference
description: Introduction to the generated StorageSphere Enterprise API Reference.
sidebar_position: 1
---

# Introduction to the API Reference

## Overview

The StorageSphere Enterprise API Reference provides endpoint-specific documentation for the REST APIs. The API Reference is generated automatically from the StorageSphere Enterprise OpenAPI specification.

Use the API Reference when you need exact endpoint paths, supported methods, request parameters, response schemas, status codes, and operation-specific examples.

## Key Concepts

| Concept | Description |
|---|---|
| OpenAPI specification | Machine-readable contract that describes StorageSphere Enterprise REST APIs |
| Generated documentation | API Reference pages produced from the OpenAPI specification |
| Endpoint documentation | Operation-specific details for paths, parameters, schemas, and responses |
| Synchronization | Generated reference content stays aligned with the implemented API contract |

When the OpenAPI specification changes, run `npm run generate:api-docs` to regenerate the API reference topics under `docs/rest_api_guide/api-reference/`. Register new topics in `sidebars.js` so they appear in the left navigation.

## Best Practices

- Use this REST API Developer Guide to understand concepts and workflows.
- Use the generated API Reference for endpoint-specific implementation details.
- Validate client code against the OpenAPI specification during integration testing.
- Review generated documentation after each StorageSphere Enterprise upgrade.

## Related Topics

- [API Overview](../getting-started/api-overview)
- [API Versioning](../getting-started/api-versioning)
- [Request Format](../api-fundamentals/request-format)
- [Response Format](../api-fundamentals/response-format)
- [API Best Practices](../api-fundamentals/api-best-practices)
