---
id: discover-storage-systems
title: Discover Storage Systems
description: Workflow for automating storage discovery with StorageSphere Enterprise REST APIs.
sidebar_position: 1
---

# Discover Storage Systems

## Overview

This topic describes a common API workflow for automating storage system discovery in StorageSphere Enterprise. Discovery automation typically validates an existing storage system configuration, starts a discovery job, monitors job status, and verifies discovered resources.

This workflow is conceptual. Use the generated API Reference for exact endpoints, request fields, and response schemas.

## Before You Begin

### Prerequisites

- The API account has permission to manage storage discovery.
- The storage system connection and credentials are approved.
- A healthy collector can reach the storage management endpoint.
- The integration can store job IDs and request IDs.

### Workflow stages

| Stage | API activity |
|---|---|
| Validate prerequisites | Query collector status and existing storage system configuration |
| Validate connection | Request a connection validation workflow |
| Start discovery | Start full or incremental discovery |
| Monitor job | Poll job status until completion |
| Verify resources | Query discovered systems, pools, volumes, and hosts |

## Procedure

### Step 1: Confirm collector and system readiness

1. Query the assigned collector status.

2. Query the storage system configuration.

3. Confirm that the collector is healthy and the storage system is ready for discovery.

### Step 2: Validate the connection

1. Send a request to validate the storage system connection.

2. Store the validation job or task ID if the operation is asynchronous.

3. Continue only after validation succeeds.

### Step 3: Start discovery

1. Choose full or incremental discovery.

2. Send a discovery start request.

3. Store the returned discovery job ID.

### Step 4: Monitor discovery

1. Poll job status at a reasonable interval.

2. Stop polling when the job reaches a terminal state.

3. Review warnings before treating the discovery as complete.

### Step 5: Verify inventory

1. Query discovered resource collections.

2. Compare resource counts with expected values.

3. Record the discovery job ID and verification results.

::::note
For web UI procedures and discovery concepts, see [Discovering Storage Systems](../../installation_and_configuration_guide/storage-discovery/discovering-storage-systems).
::::

## Verification

| Check | Expected result |
|---|---|
| Collector | Assigned collector is healthy |
| Validation | Connection validation succeeds |
| Discovery job | Job completes or completes with reviewed warnings |
| Inventory | Expected storage resources are returned by inventory queries |

## Troubleshooting

### Discovery job fails

- Retrieve job details and error messages.
- Check collector health.
- Validate authentication and authorization.
- Use request IDs and job IDs when escalating.

### Inventory is incomplete

- Review job warnings.
- Confirm storage platform service account permissions.
- Run a full discovery when incremental discovery does not detect expected changes.

## Related Topics

- [Filtering and Sorting](../api-fundamentals/filtering-and-sorting)
- [Pagination](../api-fundamentals/pagination)
- [Error Handling](../api-fundamentals/error-handling)
- [Verifying Storage Discovery](../../installation_and_configuration_guide/storage-discovery/verifying-storage-discovery)
