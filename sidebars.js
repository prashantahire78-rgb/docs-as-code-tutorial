module.exports = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Installation and Configuration Guide',
      items: [
        'installation_and_configuration_guide/introduction_icg',
        {
          type: 'category',
          label: 'Prerequisites',
          items: [
            'installation_and_configuration_guide/prerequisites/system-requirements',
            'installation_and_configuration_guide/prerequisites/supported-platforms',
            'installation_and_configuration_guide/prerequisites/deployment-architecture',
            'installation_and_configuration_guide/prerequisites/network-requirements',
            'installation_and_configuration_guide/prerequisites/firewall-requirements',
            'installation_and_configuration_guide/prerequisites/preparing-the-installation-environment',
          ],
        },
        {
          type: 'category',
          label: 'Installation',
          items: [
            'installation_and_configuration_guide/installation/installing-storagesphere-server',
            'installation_and_configuration_guide/installation/configuring-the-database',
            'installation_and_configuration_guide/installation/configuring-email-notifications',
            'installation_and_configuration_guide/installation/configuring-ldap-authentication',
            'installation_and_configuration_guide/installation/configuring-active-directory-authentication',
            'installation_and_configuration_guide/installation/installing-the-license',
          ],
        },
        {
          type: 'category',
          label: 'Storage Discovery',
          items: [
            'installation_and_configuration_guide/storage-discovery/adding-a-storage-system',
            'installation_and_configuration_guide/storage-discovery/discovering-storage-systems',
            'installation_and_configuration_guide/storage-discovery/verifying-storage-discovery',
            'installation_and_configuration_guide/storage-discovery/troubleshooting-storage-discovery',
          ],
        },
        {
          type: 'category',
          label: 'Security Configuration',
          items: [
            'installation_and_configuration_guide/security-configuration/configuring-https',
            'installation_and_configuration_guide/security-configuration/managing-ssl-certificates',
            'installation_and_configuration_guide/security-configuration/configuring-role-based-access-control-rbac',
            'installation_and_configuration_guide/security-configuration/configuring-password-policies',
          ],
        },
        {
          type: 'category',
          label: 'Maintenance',
          items: [
            'installation_and_configuration_guide/maintenance/backing-up-the-configuration',
            'installation_and_configuration_guide/maintenance/restoring-the-configuration',
            'installation_and_configuration_guide/maintenance/monitoring-system-health',
            'installation_and_configuration_guide/maintenance/managing-log-files',
            'installation_and_configuration_guide/maintenance/upgrading-storagesphere',
            'installation_and_configuration_guide/maintenance/rolling-back-an-upgrade',
            'installation_and_configuration_guide/maintenance/uninstalling-storagesphere',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'User Guide',
      items: [
        'user_guide/introduction_ug',
        {
          type: 'category',
          label: 'Getting Started',
          items: [
            'user_guide/getting-started/signing-in-to-storagesphere-enterprise',
            'user_guide/getting-started/navigating-the-web-ui',
            'user_guide/getting-started/setting-user-preferences',
            'user_guide/getting-started/searching-and-filtering-data',
            'user_guide/getting-started/understanding-user-roles',
          ],
        },
        {
          type: 'category',
          label: 'Dashboard',
          items: [
            'user_guide/dashboard/viewing-the-dashboard',
            'user_guide/dashboard/customizing-dashboard-views',
            'user_guide/dashboard/understanding-status-and-severity-values',
          ],
        },
        {
          type: 'category',
          label: 'Storage Management',
          items: [
            'user_guide/storage-management/viewing-storage-inventory',
            'user_guide/storage-management/managing-storage-systems',
            'user_guide/storage-management/managing-storage-pools',
            'user_guide/storage-management/managing-volumes',
            'user_guide/storage-management/managing-hosts',
          ],
        },
        {
          type: 'category',
          label: 'Capacity Monitoring',
          items: [
            'user_guide/capacity-monitoring/monitoring-capacity',
            'user_guide/capacity-monitoring/analyzing-capacity-trends',
            'user_guide/capacity-monitoring/identifying-capacity-risks',
          ],
        },
        {
          type: 'category',
          label: 'Performance Monitoring',
          items: [
            'user_guide/performance-monitoring/monitoring-performance',
            'user_guide/performance-monitoring/analyzing-performance',
            'user_guide/performance-monitoring/investigating-latency-issues',
          ],
        },
        {
          type: 'category',
          label: 'Alerts and Events',
          items: [
            'user_guide/alerts-and-events/managing-alerts',
            'user_guide/alerts-and-events/acknowledging-alerts',
            'user_guide/alerts-and-events/reviewing-events',
          ],
        },
        {
          type: 'category',
          label: 'Reports',
          items: [
            'user_guide/reports/running-reports',
            'user_guide/reports/scheduling-reports',
            'user_guide/reports/exporting-report-results',
          ],
        },
        {
          type: 'category',
          label: 'Administration',
          items: [
            'user_guide/administration/managing-users',
            'user_guide/administration/viewing-audit-logs',
            'user_guide/administration/reviewing-notification-delivery',
            'user_guide/administration/reviewing-collector-status',
          ],
        },
        {
          type: 'category',
          label: 'Troubleshooting',
          items: [
            'user_guide/troubleshooting/troubleshooting-sign-in-issues',
            'user_guide/troubleshooting/troubleshooting-missing-inventory',
            'user_guide/troubleshooting/troubleshooting-alert-noise',
            'user_guide/troubleshooting/troubleshooting-report-generation',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'REST API Guide',
      items: [
        'rest_api_guide/introduction_rest',
        {
          type: 'category',
          label: 'Getting Started',
          items: [
            'rest_api_guide/getting-started/api-overview',
            'rest_api_guide/getting-started/getting-started',
            'rest_api_guide/getting-started/authentication',
            'rest_api_guide/getting-started/authorization',
            'rest_api_guide/getting-started/api-versioning',
          ],
        },
        {
          type: 'category',
          label: 'API Fundamentals',
          items: [
            'rest_api_guide/api-fundamentals/http-methods',
            'rest_api_guide/api-fundamentals/request-format',
            'rest_api_guide/api-fundamentals/response-format',
            'rest_api_guide/api-fundamentals/pagination',
            'rest_api_guide/api-fundamentals/filtering-and-sorting',
            'rest_api_guide/api-fundamentals/rate-limiting',
            'rest_api_guide/api-fundamentals/error-handling',
            'rest_api_guide/api-fundamentals/http-status-codes',
            'rest_api_guide/api-fundamentals/api-best-practices',
          ],
        },
        {
          type: 'category',
          label: 'Common Workflows',
          items: [
            'rest_api_guide/common-workflows/discover-storage-systems',
            'rest_api_guide/common-workflows/monitor-capacity',
            'rest_api_guide/common-workflows/monitor-performance',
            'rest_api_guide/common-workflows/manage-alerts',
            'rest_api_guide/common-workflows/generate-reports',
          ],
        },
        {
          type: 'category',
          label: 'API Reference',
          items: [
            'rest_api_guide/api-reference/introduction-to-the-api-reference',
            'rest_api_guide/api-reference/generate-api-token',
            'rest_api_guide/api-reference/list-storage-systems',
            'rest_api_guide/api-reference/start-storage-discovery',
            'rest_api_guide/api-reference/get-system-health',
            'rest_api_guide/api-reference/list-performance-metrics',
            'rest_api_guide/api-reference/get-storage-system-details',
            'rest_api_guide/api-reference/list-alerts',
            'rest_api_guide/api-reference/get-alert-details',
            'rest_api_guide/api-reference/get-alert-history',
            'rest_api_guide/api-reference/acknowledge-an-alert',
            'rest_api_guide/api-reference/resolve-an-alert',
            'rest_api_guide/api-reference/list-reports',
            'rest_api_guide/api-reference/get-report-details',
            'rest_api_guide/api-reference/generate-a-report',
            'rest_api_guide/api-reference/get-job-status',            
          ],
        },
        {
          type: 'category',
          label: 'Troubleshooting',
          items: [
            'rest_api_guide/troubleshooting/common-api-errors',
            'rest_api_guide/troubleshooting/debugging-api-requests',
            'rest_api_guide/troubleshooting/frequently-asked-questions',
          ],
        },
      ],
    },
  ],
};