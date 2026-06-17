---
id: getting-started
title: Getting Started
description: Steps to make an initial StorageSphere Enterprise API request.
sidebar_position: 2
---

# Getting Started

## Overview

This topic describes how to make an initial StorageSphere Enterprise REST API request. Use this workflow to verify connectivity, authentication, authorization, and response handling before building a larger integration.

## Before You Begin

### Prerequisites

- StorageSphere Enterprise is installed and reachable over HTTPS.
- You have an API user or service account.
- Your account has the permissions required for the data you want to query.
- You have an API token or permission to create one.
- Your client trusts the StorageSphere Enterprise HTTPS certificate.

### Required information

| Item | Example | Used for |
|---|---|---|
| Base URL | `https://ss-mgmt.corp.example.com` | API request target |
| API version | `v2` | Versioned request path |
| API token | `sst_...` | Authentication |
| Request ID | `client-generated-uuid` | Troubleshooting correlation |

## Procedure

### Step 1: Confirm HTTPS connectivity

1. Confirm that the API base URL resolves from the client host.

2. Test HTTPS connectivity.

   ```bash
   curl -I https://ss-mgmt.corp.example.com
   ```

3. Resolve certificate trust issues before sending credentials or tokens.

### Step 2: Prepare request headers

1. Set the authorization header.

   ```text
   Authorization: Bearer <api-token>
   ```

2. Set the content type and accept headers.

   ```text
   Accept: application/json
   Content-Type: application/json
   ```

3. Add a request ID when your client supports it.

   ```text
   X-Request-ID: 7f7e1b20-3c28-4c2f-9f1d-3e9c51e784a4
   ```

### Step 3: Send a test request

1. Send a simple read request to an allowed resource.

   ```bash
   curl \
     -H "Authorization: Bearer $SSPHERE_TOKEN" \
     -H "Accept: application/json" \
     https://ss-mgmt.corp.example.com/api/v2/status
   ```

2. Confirm that the response is JSON.

   ```json
   {
     "status": "healthy",
     "version": "2.0",
     "requestId": "7f7e1b20-3c28-4c2f-9f1d-3e9c51e784a4"
   }
   ```

::::note
The example path is illustrative. Use the generated API Reference for exact endpoint paths and supported operations.
::::

## Verification

| Check | Expected result |
|---|---|
| HTTPS | Client connects without certificate errors |
| Authentication | API token is accepted |
| Authorization | Response matches the account permissions |
| Response format | Response body is valid JSON |
| Request ID | Request ID appears in response or logs when supported |

## Troubleshooting

### Request returns 401 Unauthorized

- Confirm that the token is valid and not expired.
- Verify that the authorization header uses the `Bearer` scheme.
- Generate a new token if the existing token was revoked.

### Request returns 403 Forbidden

- Confirm that the API account has a role with permission for the requested action.
- Review RBAC mappings with a StorageSphere Administrator.
- Check audit logs for denied API activity.

## Related Topics

- [Authentication](./authentication)
- [Authorization](./authorization)
- [Request Format](../api-fundamentals/request-format)
- [Response Format](../api-fundamentals/response-format)
- [Common API Errors](../troubleshooting/common-api-errors)
