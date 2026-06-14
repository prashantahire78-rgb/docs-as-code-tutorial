// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'StorageSphere Enterprise Documentation',
  tagline: 'Documentation for installing, configuring, operating, and integrating StorageSphere Enterprise 2.0',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://prashantahire78-rgb.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docs-as-code-tutorial/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'prashantahire78-rgb', // Usually your GitHub org/user name.
  projectName: 'docs-as-code-tutorial', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl:
            'https://github.com/prashantahire78-rgb/docs-as-code-tutorial/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'StorageSphere Docs',
        logo: {
          alt: 'StorageSphere Documentation Logo',
          src: 'img/Prashant_Profile_Picture.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://www.linkedin.com/in/prashant-ahire-773a2117',
            label: 'LinkedIn',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Documentation Home',
                to: '/docs/intro/',
              },
              {
                label: 'Installation and Configuration Guide',
                to: '/docs/installation_and_configuration_guide/introduction_icg/',
              },
              {
                label: 'User Guide',
                to: '/docs/user_guide/introduction_ug/',
              },
            ],
          },
          {
            title: 'Developer Resources',
            items: [
              {
                label: 'REST API Developer Guide',
                to: '/docs/rest_api_guide/introduction_rest/',
              },
              {
                label: 'API Reference Introduction',
                to: '/docs/rest_api_guide/api-reference/introduction-to-the-api-reference/',
              },
            ],
          },
          {
            title: 'Operations',
            items: [
              {
                label: 'Storage Discovery',
                to: '/docs/installation_and_configuration_guide/storage-discovery/discovering-storage-systems/',
              },
              {
                label: 'Monitoring System Health',
                to: '/docs/installation_and_configuration_guide/maintenance/monitoring-system-health/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} NovaStor Technologies. Documentation built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
