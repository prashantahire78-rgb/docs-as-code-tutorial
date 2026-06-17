---
id: troubleshooting-storage-discovery
title: Troubleshooting Storage Discovery
description: Steps to diagnose and resolve storage discovery issues in StorageSphere Enterprise.
sidebar_position: 4
---

# Troubleshooting Storage Discovery

## Overview

This topic describes how to troubleshoot storage discovery issues in StorageSphere Enterprise. Use this topic when a storage system cannot be added, connection validation fails, discovery jobs fail, or discovered inventory does not match expected resources.

Troubleshooting storage discovery typically requires coordination between StorageSphere administrators, storage administrators, network administrators, and security administrators.

## Before You Begin

### Prerequisites

- Installed and licensed StorageSphere Enterprise. See [Installing the License](../installation/installing-the-license).
- StorageSphere Administrator role access.
- Access to the storage system record under **Administration** > **Storage Discovery**.
- Access to the assigned collector host for log review when required.
- Current storage endpoint, service account, collector, and firewall details.
- Approval to test connectivity from the collector to storage management endpoints.

### Required diagnostic information

Collect the following information before you start.

| Item | Example | Used for |
|---|---|---|
| Storage system name | `pure-fa-prod-01` | Locate the connection and jobs |
| Vendor platform | `Pure Storage FlashArray` | Select vendor-specific checks |
| Management endpoint | `https://flasharray01.corp.example.com` | Test DNS, TLS, and network access |
| Assigned collector | `collector-dc2` | Review job execution and logs |
| Discovery job ID | `DISC-20260613-00042` | Review failure details |
| Error message | `Authentication failed` | Determine corrective action |
| Change window | `CHG-104582` | Track production remediation |

### Common failure categories

| Category | Symptoms | Primary owner |
|---|---|---|
| Network connectivity | Timeout, connection refused, endpoint unreachable | Network administrator |
| DNS or certificate | Name resolution failure, TLS validation failure | Network or security administrator |
| Authentication | Invalid credentials, locked account, expired token | Storage administrator |
| Authorization | Partial inventory, permission denied, skipped resources | Storage administrator |
| Collector health | Job queued, collector unavailable, upload failure | StorageSphere administrator |
| Storage API availability | Vendor API timeout, maintenance mode, rate limit | Storage administrator |

::::note
Start troubleshooting with the most recent discovery job. Older jobs might refer to credentials, endpoints, or collector assignments that have since changed.
::::

## Procedure

### Step 1: Sign in to StorageSphere Enterprise

1. Open the StorageSphere Enterprise web UI.

2. Sign in as a user with the StorageSphere Administrator role.

3. Confirm that the management server dashboard is available.

### Step 2: Open Storage Discovery

1. Go to **Administration** > **Storage Discovery**.

2. Select **Storage Systems**.

3. Select the affected storage system.

4. Review the current connection, discovery, and monitoring status.

### Step 3: Review the discovery job

1. Select **Discovery Jobs**.

2. Open the most recent failed or warning job for the storage system.

3. Review the job state and message.

   | Job state | Meaning | Next action |
   |---|---|---|
   | **Queued** | Collector has not started the job | Check collector health and workload |
   | **Running** | Job is active or waiting for API responses | Monitor duration and collector logs |
   | **Completed with warnings** | Some objects were skipped | Review warnings and permissions |
   | **Failed** | Job stopped before completing discovery | Review error details and connection validation |
   | **Canceled** | Job was stopped by a user or system policy | Confirm whether cancellation was expected |

4. Copy the first error and any vendor API message into the deployment or support record.

### Step 4: Validate the connection

1. Return to the storage system details.

2. Select **Validate connection**.

3. Review each validation check.

   | Check | Failure indicates |
   |---|---|
   | DNS resolution | Collector cannot resolve the endpoint name |
   | Network connection | Port is blocked, endpoint is down, or route is missing |
   | TLS validation | Certificate is expired, untrusted, or does not match the endpoint |
   | Authentication | Credential, token, account lockout, or authentication policy issue |
   | Authorization | Service account lacks permissions required for discovery |

4. Resolve failed validation checks before starting another discovery job.

### Step 5: Check collector health

1. Go to **Administration** > **Collectors**.

2. Select the collector assigned to the storage system.

3. Confirm the collector status.

   | Collector check | Expected result |
   |---|---|
   | Health | **Healthy** |
   | Last heartbeat | Recent and within the configured heartbeat interval |
   | Management connection | Connected to the management server |
   | Job capacity | Available discovery job capacity |
   | Version | Matches the StorageSphere Enterprise management server version |

4. Restart the collector service only if the collector is unhealthy and your change process allows service restart.

   ```bash
   sudo systemctl restart ssphere-collector
   ```

5. Confirm the collector service status.

   ```bash
   sudo systemctl status ssphere-collector
   ```

### Step 6: Test endpoint connectivity from the collector

1. Sign in to the assigned collector host.

2. Test DNS resolution.

   ```bash
   nslookup flasharray01.corp.example.com
   ```

3. Test HTTPS connectivity.

   ```bash
   nc -zv flasharray01.corp.example.com 443
   ```

4. Review the endpoint certificate.

   ```bash
   openssl s_client -connect flasharray01.corp.example.com:443 -showcerts
   ```

5. If the endpoint uses an internal CA, confirm that the CA certificate is trusted by the collector.

::::warning
Run connectivity tests from the assigned collector, not from an administrator workstation. Discovery jobs run from collectors, and workstation access does not prove collector access.
::::

### Step 7: Review platform-specific causes

1. Confirm the vendor endpoint and account requirements.

   | Platform | Common cause | Corrective action |
   |---|---|---|
   | Hitachi VSP 5000 | Service account lacks required storage resource group visibility | Grant read access to the resource groups expected for discovery |
   | Hitachi VSP One Block | Management endpoint certificate does not match the configured FQDN | Use the certificate subject name or update the certificate |
   | Dell PowerStore | Cluster management virtual IP is unreachable from the collector | Verify routing and use the cluster management FQDN or VIP |
   | NetApp ONTAP | Node management LIF used instead of cluster management LIF | Update the endpoint to the cluster management LIF |
   | Pure Storage FlashArray | API token expired or was rotated | Generate and store a new approved monitoring token |

2. Confirm that vendor management APIs are enabled and available.

3. Confirm that the platform is not in maintenance mode, upgrade mode, or a controller failover event.

### Step 8: Rerun discovery

1. Return to **Administration** > **Storage Discovery**.

2. Select the storage system.

3. Select **Validate connection** and confirm that all checks pass.

4. Select **Start discovery**.

5. Use **Incremental discovery** if only permissions, credentials, or tags changed.

6. Use **Full discovery** if resource relationships, endpoint configuration, or platform inventory changed.

7. Monitor the new discovery job until it reaches **Completed** or **Completed with warnings**.

## Verification

Confirm that the following conditions are true after remediation.

| Check | Expected result |
|---|---|
| Connection validation | All validation checks pass |
| Collector health | Assigned collector is **Healthy** |
| Discovery job | Latest job is **Completed** or has only reviewed warnings |
| Inventory | Expected storage resources are present |
| Monitoring | Capacity and performance collection begin after the polling interval |
| Operational record | Error, cause, remediation, and validation results are documented |

## Troubleshooting

### DNS resolution fails

- Confirm that the endpoint FQDN is correct.
- Verify DNS search domains and resolver configuration on the collector.
- Add or correct the DNS record for the storage management endpoint.
- Use a temporary IP address only for testing. Use the FQDN for production when TLS certificates depend on DNS names.

### Network connection times out

- Confirm that collector-to-storage firewall rules allow HTTPS on port 443 or the configured custom port.
- Verify routing between the collector subnet and the storage management subnet.
- Check whether the storage platform allows management access only from approved source IP addresses.
- Confirm that the storage management interface is online.

### TLS validation fails

- Confirm that the certificate is not expired.
- Confirm that the certificate subject or subject alternative name matches the configured endpoint.
- Import the issuing CA certificate into the collector trust store.
- Replace self-signed certificates with certificates issued by an approved enterprise CA for production.

### Discovery fails with permission errors

- Verify that the service account can read inventory, capacity, health, and performance metadata.
- Confirm that resource group or tenant restrictions do not hide expected resources.
- Check vendor audit logs for denied API calls.
- Update the service account permissions and rerun discovery.

### Discovery is slow or incomplete

- Confirm that the storage management API is not under heavy administrative load.
- Review collector CPU, memory, and network utilization.
- Run discovery during a lower activity window.
- Use incremental discovery after the first full discovery completes successfully.

## Related Topics

- [Adding a Storage System](./adding-a-storage-system)
- [Discovering Storage Systems](./discovering-storage-systems)
- [Verifying Storage Discovery](./verifying-storage-discovery)
- [Network Requirements](../prerequisites/network-requirements)
- [Firewall Requirements](../prerequisites/firewall-requirements)
