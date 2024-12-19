// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const {themes} = require('prism-react-renderer');
const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '科技求生記',
  tagline: 'Follow me to give you new information of interest',
  favicon: 'img/avatar.png',

  // Set the production url of your site here
  url: 'https://library.wowkit.net/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'junminhong', // Usually your GitHub org/user name.
  projectName: 'jmh-library', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-TW',
    locales: ['en', 'zh-TW'],
  },

  // plugins: [
  //   [
  //     "@docusaurus/plugin-content-docs",
  //     /** @type {import('@docusaurus/plugin-content-docs').Options} */
  //     {
  //       id: "lab",
  //       path: "lab",
  //       routeBasePath: "lab",
  //       sidebarPath: require.resolve("./labSidebars.js"),
  //     },
  //   ],
  // ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/notes'
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          routeBasePath: '/'
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
        gtag: {
          trackingID: 'G-HD16SH6KRJ',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      metadata: [{name: 'keywords', content: 'wowkit, blog, tutorial, dev'}],
      image: 'img/avatar.png',
      navbar: {
        title: '科技求生記',
        logo: {
          alt: '科技求生記',
          src: 'img/avatar.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'notesSidebar',
            position: 'left',
            label: 'Notes',
            to: '/notes'
          },
          // {to: '/blog', label: 'Blog', position: 'left'},
          // {
          //   sidebarId: 'labSidebar',
          //   position: 'left',
          //   label: 'Lab',
          //   to: '/lab'
          // },
          {
            href: '/about',
            label: 'About',
            position: 'right',
          },
          {
            href: 'https://www.facebook.com/jasper.web.dev',
            label: 'Follow',
            position: 'right',
          },
          {
            href: 'https://github.com/junminhong',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          // {
          //   title: 'Docs',
          //   items: [
          //     {
          //       label: 'Tutorial',
          //       to: '/docs/intro',
          //     },
          //   ],
          // },
          // {
          //   title: 'Community',
          //   items: [
          //     {
          //       label: 'LinkedIn',
          //       href: 'https://www.linkedin.com/in/junminhong/',
          //     },
          //     {
          //       label: 'Email',
          //       href: 'mailto:junminhong1110@gmail.com',
          //     },
          //   ],
          // },
          // {
          //   title: 'More',
          //   items: [
          //     {
          //       label: 'About',
          //       href: '/',
          //     },
          //   ],
          // },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} junminhong, easy enjoy life.`,
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
        additionalLanguages: ['ruby', 'go', 'bash', 'json', 'diff'],
      },
    }),
  
  // for docusaurus/faster
  future: {
    experimental_faster: true,
  },
};

module.exports = config;
