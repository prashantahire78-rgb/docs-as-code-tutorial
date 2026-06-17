---
id: configuring-the-database
title: Configuring the Database
description: Steps to configure the StorageSphere Enterprise database connection.
sidebar_position: 2
---

# Configuring the Database

## Overview

This topic describes how to configure the database used by StorageSphere Enterprise. The database stores inventory, configuration, RBAC assignments, alert history, report definitions, and metrics metadata.

StorageSphere Enterprise supports PostgreSQL for production deployments. Microsoft SQL Server is supported for environments that require Microsoft database standards and centralized database administration.

## Before You Begin

### Prerequisites

- Installed StorageSphere Server. See [Installing StorageSphere Server](./installing-storagesphere-server).
- Database host that meets [System Requirements](../prerequisites/system-requirements).
- Network access from the management server to the database host. See [Network Requirements](../prerequisites/network-requirements).
- Firewall rule that allows database traffic from the management server. See [Firewall Requirements](../prerequisites/firewall-requirements).
- Database administrator approval for schema creation and service account permissions.

### Supported database engines

| Database engine | Supported versions | Default port | Recommended use |
|---|---|---|---|
| PostgreSQL | 14.x, 15.x, 16.x | 5432 | Standard and distributed deployments |
| Microsoft SQL Server | 2019, 2022 | 1433 | Enterprises standardized on Microsoft SQL Server |

:::note
PostgreSQL is the recommended database engine for new StorageSphere Enterprise deployments unless your organization requires Microsoft SQL Server.
:::

### Required access

| Role | Access needed |
|---|---|
| Database administrator | Permission to create a database, schema, and service account |
| Linux administrator | `sudo` access on the management server |
| Security administrator | Approval for database credentials and TLS requirements |

### Required information

Collect the following values before you start.

| Item | Example | Used for |
|---|---|---|
| Database engine | PostgreSQL | Database driver selection |
| Database host | `ss-db.corp.example.com` | Database connection |
| Database port | `5432` | Network connection |
| Database name | `ssphere` | Application data store |
| Database user | `ssphere_app` | Application database access |
| TLS mode | `verify-full` | Encrypted database connection |

## Procedure

### Step 1: Create the database

1. Sign in to the database host as a database administrator.

2. For PostgreSQL, create the application user.

   ```sql
   CREATE USER ssphere_app WITH PASSWORD 'replace-with-secure-password';
   ```

3. Create the StorageSphere database.

   ```sql
   CREATE DATABASE ssphere OWNER ssphere_app ENCODING 'UTF8';
   ```

4. Grant the required privileges.

   ```sql
   GRANT CONNECT, TEMPORARY ON DATABASE ssphere TO ssphere_app;
   ```

5. Connect to the database and create the application schema.

   ```sql
   \c ssphere
   CREATE SCHEMA ssphere AUTHORIZATION ssphere_app;
   ALTER ROLE ssphere_app SET search_path TO ssphere, public;
   ```

### Step 2: Configure PostgreSQL network access

1. Edit `postgresql.conf` and confirm that PostgreSQL listens on the database host interface.

   ```text
   listen_addresses = 'ss-db.corp.example.com'
   ```

2. Edit `pg_hba.conf` and allow the management server to connect.

   ```text
   hostssl ssphere ssphere_app 10.10.20.15/32 scram-sha-256
   ```

3. Restart PostgreSQL.

   ```bash
   sudo systemctl restart postgresql
   ```

4. Test connectivity from the management server.

   ```bash
   psql "host=ss-db.corp.example.com port=5432 dbname=ssphere user=ssphere_app sslmode=require"
   ```

:::warning
Do not allow unrestricted database access from broad subnets. Limit database connections to the management server IP address or approved management subnet.
:::

### Step 3: Configure Microsoft SQL Server if required

1. Sign in to SQL Server Management Studio as a database administrator.

2. Create the database.

   ```sql
   CREATE DATABASE ssphere;
   GO
   ```

3. Create the application login.

   ```sql
   CREATE LOGIN ssphere_app WITH PASSWORD = 'replace-with-secure-password';
   GO
   ```

4. Map the login to the database and grant required permissions.

   ```sql
   USE ssphere;
   CREATE USER ssphere_app FOR LOGIN ssphere_app;
   ALTER ROLE db_datareader ADD MEMBER ssphere_app;
   ALTER ROLE db_datawriter ADD MEMBER ssphere_app;
   GRANT CREATE TABLE TO ssphere_app;
   GRANT CREATE PROCEDURE TO ssphere_app;
   GO
   ```

5. Confirm that TCP/IP is enabled for the SQL Server instance and that port 1433 is reachable from the management server.

### Step 4: Register the database with StorageSphere Server

1. Sign in to the management server.

2. Run the database configuration command for PostgreSQL.

   ```bash
   sudo ssphere-setup database configure \
     --engine postgresql \
     --host ss-db.corp.example.com \
     --port 5432 \
     --database ssphere \
     --username ssphere_app \
     --ssl-mode require
   ```

3. Enter the database password when prompted.

4. If you use Microsoft SQL Server, specify the SQL Server engine.

   ```bash
   sudo ssphere-setup database configure \
     --engine sqlserver \
     --host sql-prod.corp.example.com \
     --port 1433 \
     --database ssphere \
     --username ssphere_app \
     --encrypt true
   ```

5. Test the database connection.

   ```bash
   sudo ssphere-setup database test
   ```

### Step 5: Initialize the database schema

1. Run the schema initialization command.

   ```bash
   sudo ssphere-setup database initialize
   ```

2. Review the output and confirm that all schema migrations complete.

3. Restart StorageSphere Server.

   ```bash
   sudo systemctl restart ssphere-server
   ```

4. Confirm that the server starts without database errors.

   ```bash
   sudo journalctl -u ssphere-server -n 100 --no-pager
   ```

:::tip
Store database credentials in your enterprise password vault. Do not store credentials in deployment notes, shell history, or unencrypted files.
:::

## Verification

Confirm that the following conditions are true before you continue.

| Check | Expected result |
|---|---|
| Database connectivity | `ssphere-setup database test` returns a successful connection |
| Schema initialization | All migrations complete without errors |
| Service status | `ssphere-server` starts successfully after database configuration |
| Application health | REST API health endpoint returns `healthy` |
| Database security | Database accepts connections only from approved management server addresses |

Use the following command to check the StorageSphere health endpoint.

```bash
curl -k https://ss-mgmt.corp.example.com/api/v2/health
```

## Troubleshooting

### Database connection fails

- Confirm that the database host name resolves from the management server.
- Verify that the database port is open between the management server and database host.
- Check the database user name, password, database name, and TLS mode.
- Review database server logs for rejected connections.

### PostgreSQL rejects the connection

- Confirm that `pg_hba.conf` includes the management server IP address.
- Verify that PostgreSQL listens on the expected host interface.
- Restart PostgreSQL after configuration changes.
- Confirm that the authentication method matches the user password type.

### SQL Server authentication fails

- Confirm that SQL Server authentication is enabled if you use a SQL login.
- Verify that the login maps to the `ssphere` database.
- Confirm that TCP/IP is enabled for the SQL Server instance.
- Check whether SQL Server forces encryption and whether the certificate is trusted by the management server.

### Schema initialization fails

- Confirm that the application user has permissions to create tables, indexes, and procedures.
- Ensure that no partial schema objects remain from a failed initialization attempt.
- Review `/var/log/ssphere/database-migration.log` for the failed migration step.
- Contact NovaStor Technologies support before manually modifying schema objects.

## Related Topics

- [Installing StorageSphere Server](./installing-storagesphere-server)
- [Configuring Email Notifications](./configuring-email-notifications)
- [Installing the License](./installing-the-license)
- [System Requirements](../prerequisites/system-requirements)
- [Network Requirements](../prerequisites/network-requirements)
- [Firewall Requirements](../prerequisites/firewall-requirements)
- [Installation and Configuration Guide](../introduction_icg)
