---
id: introduction_ug
title: User Guide
description: Introduction to using StorageSphere Enterprise for storage operations.
sidebar_position: 1
---

# User Guide

## Overview

This guide explains how to use **StorageSphere Enterprise** from **NovaStor Technologies** after installation and initial configuration are complete. Use this guide to monitor storage infrastructure, investigate health and performance issues, manage alerts, run reports, and perform day-to-day administration.

StorageSphere Enterprise provides a centralized operational view of storage systems, pools, volumes, hosts, capacity, performance, alerts, events, reports, users, and audit activity across enterprise environments.

## Key Concepts

| Concept | Description |
|---|---|
| Dashboard | Operational landing page that summarizes health, capacity, performance, alerts, and recent activity |
| Storage system | A discovered storage array, cluster, or platform instance managed by StorageSphere Enterprise |
| Storage pool | A capacity container that provides storage to volumes, file systems, or LUNs |
| Volume | A provisioned storage object presented to hosts, applications, or virtual infrastructure |
| Host | A server, cluster, or initiator group associated with storage resources |
| Alert | A condition that requires review, acknowledgement, or remediation |
| Event | A recorded operational, system, security, or configuration activity |
| Report | A scheduled or on-demand output for capacity, performance, health, or compliance review |

## Best Practices

- Review the dashboard at the start of each operations shift.
- Investigate critical alerts before warning alerts unless your runbook defines a different priority.
- Use filters, tags, and saved views to focus on the storage systems and sites you manage.
- Validate storage inventory after discovery, upgrades, and major storage platform changes.
- Export reports and audit logs according to your organization's retention and compliance policies.
- Use role-based access so users receive only the permissions required for their responsibilities.

::::note
This guide does not include installation or initial configuration procedures. For deployment, discovery setup, security configuration, and maintenance procedures, see the [Installation and Configuration Guide](../installation_and_configuration_guide/introduction_icg).
::::

## Related Topics

- [Signing In to StorageSphere Enterprise](./getting-started/signing-in-to-storagesphere-enterprise)
- [Navigating the Web UI](./getting-started/navigating-the-web-ui)
- [Viewing the Dashboard](./dashboard/viewing-the-dashboard)
- [Viewing Storage Inventory](./storage-management/viewing-storage-inventory)
- [Managing Alerts](./alerts-and-events/managing-alerts)