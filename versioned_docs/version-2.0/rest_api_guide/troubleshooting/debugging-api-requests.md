---
id: debugging-api-requests
title: Debugging API Requests
description: Steps to debug StorageSphere Enterprise REST API requests.
sidebar_position: 2
---

# Debugging API Requests

## Overview

This topic describes how to debug StorageSphere Enterprise REST API requests. Use this workflow when an API client receives unexpected errors, empty responses, missing data, or inconsistent results.

## Before You Begin

### Prerequisites

- You can reproduce the request.
- You know the API token owner or service account.
- You can access integration logs.
- You have permission to view related audit logs or can request them from an administrator.

### Diagnostic information

| Item | Example |
|---|---|
| Request time | `2026-06-13T12:00:00Z` |
| Method | `GET` |
| API version | `v2` |
| Status code | `403` |
| Request ID | `0efeddb3-9c22-4a52-8d6a-4e34dfc48e21` |
| Token owner | `ssphere-reporting-api` |

## Procedure

### Step 1: Capture request details

1. Record the method, URL, query parameters, and headers.

2. Remove or mask tokens and secrets before sharing logs.

3. Record the response status code and body.

### Step 2: Validate authentication and authorization

1. Confirm that the authorization header uses a bearer token.

2. Confirm that the token is active.

3. Review role permissions for the token owner.

### Step 3: Reduce the request

1. Remove optional filters.

2. Reduce the time range.

3. Query a known resource ID.

4. Add filters back one at a time.

### Step 4: Correlate logs

1. Search integration logs by request ID.

2. Ask a StorageSphere Administrator to review audit or application logs.

3. Compare API results with the web UI using the same resource and time range.

::::warning
Do not share raw API tokens in support cases, chat messages, screenshots, or logs. Mask secrets before escalation.
::::

## Verification

| Check | Expected result |
|---|---|
| Request | Method, URL, headers, and parameters are known |
| Token | Token is valid and scoped correctly |
| Reduced query | Simplified request succeeds or returns clearer error |
| Logs | Request ID can be correlated with API and audit logs |

## Troubleshooting

### Reduced request succeeds

- Add filters and parameters back one at a time.
- Check parameter formatting and supported values.
- Review the API Reference for the exact operation contract.

### Reduced request fails

- Confirm base URL, token, API version, and role.
- Check system health.
- Escalate with request ID, timestamp, status code, and sanitized request details.

## Related Topics

- [Common API Errors](./common-api-errors)
- [Request Format](../api-fundamentals/request-format)
- [Error Handling](../api-fundamentals/error-handling)
- [Viewing Audit Logs](../../user_guide/administration/viewing-audit-logs)
