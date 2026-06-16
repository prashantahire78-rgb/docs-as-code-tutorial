---
id: api-versioning
title: API Versioning
description: Reference information about REST API versioning in StorageSphere Enterprise 3.0.
sidebar_position: 5
---

# API Versioning

## Overview

StorageSphere Enterprise REST APIs use versioning so integrations can remain stable as the product evolves. API clients should declare or use a supported API version and test changes before upgrading integrations.

## Reference Information

### Versioning model

| Version element | Description |
|---|---|
| Product version | StorageSphere Enterprise release, such as 3.0 |
| API version | REST API contract version, such as `v2` |
| Endpoint version | Version segment used by endpoint paths or the API gateway |
| Deprecation notice | Advance notice that an API behavior or contract will change |

### Version selection

API clients typically use a versioned path or version header. The exact supported pattern is defined in the generated API Reference.

```text
https://ss-mgmt.corp.example.com/api/v2/...
```

### Compatibility expectations

| Change type | Expected impact |
|---|---|
| Add optional response field | Backward compatible |
| Add optional request field | Backward compatible |
| Add endpoint | Backward compatible |
| Remove field | Breaking change |
| Change field type | Breaking change |
| Change required permission | Potentially breaking |

::::tip
Build clients that ignore unknown response fields. This helps integrations tolerate backward-compatible API additions.
::::

## Recommendations

- Pin integrations to a supported API version.
- Review release notes before upgrading StorageSphere Enterprise.
- Test integrations in a non-production environment before production upgrades.
- Avoid depending on undocumented fields or response ordering.

## Related Topics

- [API Best Practices](../api-fundamentals/api-best-practices)
- [Response Format](../api-fundamentals/response-format)
- [Introduction to the API Reference](../api-reference/introduction-to-the-api-reference)
- [Upgrading StorageSphere](../../installation_and_configuration_guide/maintenance/upgrading-storagesphere)
