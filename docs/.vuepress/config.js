const siteTitle = 'Enjoy Technology';
const siteDescription = 'A set of posts to share technology finding and help to get started';
const copyright = 'MIT Licensed | Copyright © 2020-present';
const websiteUrl = 'https://enjoytechnology.netlify.app';
const websiteBase = '/'
const outDir = 'dist'

const googleSiteVerification = 'FD5syjPsyV04d4f1O9nibUw9TVr-fLJ2sj0uRzheaMc';
const googleAnalyticsID = 'UA-165929308-1';
const { path, fs } = require('@vuepress/shared-utils')

function generateManifest() {
    const manifestFilePath = '/assets/manifest.json'
    const manifestFullFilePath = path.resolve('docs/.vuepress/public' + manifestFilePath);

    var content = {
        "lang": "en",
        "name": siteTitle,
        "dir": "ltr",
        "short_name": siteTitle,
        "description": siteDescription,
        "start_url": websiteBase + "?utm_source=homescreen",
        "theme_color": "#fff",
        "background_color": "#fff",
        "orientation": "portrait",
        "display": "standalone",
        "icons": [
            {
                "src": websiteBase + "assets/icons/android-icon-36x36.png",
                "type": "image/png",
                "sizes": "36x36",
                "density": "0.75"
            },
            {
                "src": websiteBase + "assets/icons/android-icon-48x48.png",
                "type": "image/png",
                "sizes": "48x48",
                "density": "1.0"
            },
            {
                "src": websiteBase + "assets/icons/android-icon-72x72.png",
                "type": "image/png",
                "sizes": "72x72",
                "density": "1.5"
            },
            {
                "src": websiteBase + "assets/icons/android-icon-96x96.png",
                "type": "image/png",
                "sizes": "96x96",
                "density": "2.0"
            },
            {
                "src": websiteBase + "assets/icons/android-icon-144x144.png",
                "type": "image/png",
                "sizes": "144x144",
                "density": "3.0"
            },
            {
                "src": websiteBase + "assets/icons/android-icon-192x192.png",
                "type": "image/png",
                "sizes": "192x192",
                "density": "4.0"
            },
            {
                "src": websiteBase + "assets/icons/android-icon-192x192.png",
                "type": "image/png",
                "sizes": "512x512",
                "density": "4.0"
            }
        ]
    };
    var manifestDir = path.dirname(manifestFullFilePath);
    console.log(manifestDir)
    fs.ensureDir(manifestDir)
        .then(() => {
            console.log(manifestDir + ' exist or created')
            try {
                fs.writeFileSync(
                    manifestFullFilePath,
                    JSON.stringify(content));
                console.log(manifestFullFilePath + ' generated');
            } catch (err) {
                console.error(err)
            }
        })
        .catch(err => {
            console.error(err)
        })
    return manifestFilePath;
};

let generatedManifestFilePath = generateManifest()

module.exports = {
    title: siteTitle,
    description: siteDescription,
    dest: outDir,
    base: websiteBase,
    permalink: '/:year/:month/:day/:slug',
    themeConfig: {
        sidebar: 'auto',
        logo: '/assets/icons/favicon-32x32.png',
        footer: {
            contact: [
                {
                    type: 'github',
                    link: 'https://github.com/mohamedelhabib',
                },
                {
                    type: 'twitter',
                    link: 'https://twitter.com/elhabib_med',
                },
                {
                    type: 'linkedin',
                    link: 'https://www.linkedin.com/in/mohamed-el-habib-77165222',
                },
            ],
            copyright: copyright,
        },
    },
    head: [
        ['link', { rel: 'manifest', href: generatedManifestFilePath }],
        ['link', { rel: 'apple-touch-icon', sizes: '57x57', href: '/assets/icons/apple-icon-57x57.png' }],
        ['link', { rel: 'apple-touch-icon', sizes: '60x60', href: '/assets/icons/apple-icon-60x60.png' }],
        ['link', { rel: 'apple-touch-icon', sizes: '72x72', href: '/assets/icons/apple-icon-72x72.png' }],
        ['link', { rel: 'apple-touch-icon', sizes: '76x76', href: '/assets/icons/apple-icon-76x76.png' }],
        ['link', { rel: 'apple-touch-icon', sizes: '114x114', href: '/assets/icons/apple-icon-114x114.png' }],
        ['link', { rel: 'apple-touch-icon', sizes: '120x120', href: '/assets/icons/apple-icon-120x120.png' }],
        ['link', { rel: 'apple-touch-icon', sizes: '144x144', href: '/assets/icons/apple-icon-144x144.png' }],
        ['link', { rel: 'apple-touch-icon', sizes: '152x152', href: '/assets/icons/apple-icon-152x152.png' }],
        ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/icons/apple-icon-180x180.png' }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/assets/icons/android-icon-192x192.png' }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/assets/icons/favicon-16x16.png' }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/assets/icons/favicon-32x32.png' }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/assets/icons/favicon-96x96.png' }],
        ['link', { rel: 'preconnect', href: 'https://www.google-analytics.com' }],
        ['link', { rel: 'preconnect', href: 'https://storage.googleapis.com' }],

        ['meta', { name: 'theme-color', content: '#ffffff' }],
        ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-title', content: siteTitle }],
        ['meta', { name: 'application-name', content: siteTitle }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['meta', { name: 'msapplication-config', content: '/assets/ieconfig.xml' }],
        // ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
        ['meta', { name: 'msapplication-TileImage', content: '/assets/icons/ms-icon-144x144.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#ffffff' }],
        ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
        ['meta', { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' }],
        ['meta', { name: 'google-site-verification', content: googleSiteVerification }],
    ],
    plugins: {

        '@vuepress/pwa':
        {
            serviceWorker: true,
            updatePopup: true
        },
        'sitemap': {
            hostname: websiteUrl
        },
        '@vuepress/google-analytics':
        {
            'ga': googleAnalyticsID
        },
        '@vuepress/active-header-links': {},
        'vuepress-plugin-rss':
        {
            base_url: websiteBase,
            site_url: websiteUrl,
            copyright: copyright
        },
        '@vssue/vuepress-plugin-vssue': {
            // set `platform` rather than `api`
            platform: 'github-v4',
            // all other options of Vssue are allowed
            owner: 'mohamedelhabib',
            repo: 'enjoytechnology',
            clientId: 'a20a5f072fc178770a96',
            clientSecret: 'c443d3d1bb44ccd1d8126862ff7b45ca4552036b',
        }
    }
}
