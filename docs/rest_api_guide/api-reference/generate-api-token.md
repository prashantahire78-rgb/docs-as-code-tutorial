---
id: generate-api-token
title: Generate an API token
description: Generates an API token that can be used to authenticate subsequent API requests.
sidebar_position: 2
---

# Generate an API token

## Overview

Generates an API token that can be used to authenticate subsequent API requests.

## HTTP method and endpoint

```http
POST /auth/token
```

## Authentication

Authentication is not required for this API.

## Request parameters

This API does not use request parameters.

## Request body

| Field | Required | Type | Description |
| ----- | -------: | ---- | ----------- |
| `username` | Yes | string | User name used to generate the API token. |
| `password` | Yes | string | Password used to generate the API token. |

## Response body

| Field | Type | Description |
| ----- | ---- | ----------- |
| `accessToken` | string | API token value. |
| `tokenType` | string | Token type returned by the API. |
| `expiresIn` | integer | Token lifetime in seconds. |

## Response codes

| Status code | Description |
| ----------: | ----------- |
| 200 | API token generated successfully. |
| 400 | The request body is invalid. |
| 401 | The user credentials are invalid. |

## Example request

```bash
curl -X POST "https://api.storagesphere.example.com/v1/auth/token" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "username": "api-admin",
    "password": "ChangeMe123!"
  }'
```

## Example response

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
  "tokenType": "Bearer",
  "expiresIn": 3600
}
```

## Error handling

If the request body is invalid, the API returns `400`. If the user credentials are invalid, the API returns `401`.

## Related topics

- [API overview](../getting-started/api-overview)
- [Authentication](../getting-started/authentication)
- [Authorization](../getting-started/authorization)
- [Error handling](../api-fundamentals/error-handling)
- [HTTP status codes](../api-fundamentals/http-status-codes)
