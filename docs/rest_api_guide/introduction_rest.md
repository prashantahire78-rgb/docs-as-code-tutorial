---
id: introduction_rest
title: REST API Developer Guide
description: Introduction to using the StorageSphere Enterprise 3.0 REST APIs.
sidebar_position: 1
---

# REST API Developer Guide

## Overview

This guide explains how developers and administrators use the StorageSphere Enterprise 3.0 REST APIs from NovaStor Technologies. Use the REST APIs to automate storage discovery, query inventory, monitor capacity and performance, manage alerts, generate reports, and integrate StorageSphere Enterprise with operational tools.

This guide describes API concepts, authentication, request and response patterns, operational workflows, and troubleshooting practices. It does not provide endpoint-by-endpoint reference documentation.

## Key Concepts

| Concept | Description |
|---|---|
| REST API | HTTPS interface that uses REST principles and JSON payloads |
| API token | Credential used to authenticate API clients |
| Resource | StorageSphere object such as a storage system, pool, volume, host, alert, event, or report |
| Collection | A list of resources returned by an API request |
| Pagination | Method for reading large result sets in smaller pages |
| Filtering | Method for limiting results by status, site, tag, time range, or other criteria |
| API Reference | Generated endpoint documentation created from the OpenAPI specification |

::::note
For endpoint-specific paths, parameters, schemas, and examples, use the generated API Reference after it is published. This guide focuses on how to design and operate API integrations.
::::

## Best Practices

- Use HTTPS for all API traffic.
- Use dedicated API service accounts with least-privilege roles.
- Store API tokens in an approved secrets manager.
- Use pagination, filtering, and sorting for large inventory, alert, and event queries.
- Handle rate limits, retries, and standard HTTP status codes in all integrations.
- Log request IDs and timestamps to simplify troubleshooting.

## Related Topics

- [API Overview](./getting-started/api-overview)
- [Getting Started](./getting-started)
- [Authentication](./getting-started/authentication)
- [API Best Practices](./api-fundamentals/api-best-practices)
- [Introduction to the API Reference](./api-reference/introduction-to-the-api-reference)