const KBarData = () => {
    const actions = [
        {
            id: 'home',
            name: 'Home',
            keywords: 'home',
            perform: () => { window.location.href = '/' },
        },
        {
            id: 'download',
            name: 'Download',
            keywords: 'download',
            perform: () => { window.location.href = '/download/version/latest' },
        },
        {
            id: 'acknowledgments',
            name: 'Acknowledgments',
            keywords: 'acknowledgments',
            perform: () => { window.location.href = '/acknowledgments' },
        },
        {
            id: 'docs',
            name: 'Documentation',
            keywords: 'docs',
            perform: () => { window.location.href = '/docs' },
        },
        {
            id: 'intro',
            name: 'Introduction',
            keywords: 'intro',
            section: 'Getting Started',
            perform: () => { window.location.href = '/docs/introduction' },
        },
        {
            id: 'install',
            name: 'Installation',
            keywords: 'install',
            section: 'Getting Started',
            perform: () => { window.location.href = '/docs/installation' },
        },
        {
            id: 'shell',
            name: 'Shell',
            keywords: 'shell',
            section: 'Commands',
            perform: () => { window.location.href = '/docs/commands/shell' },
        },
        {
            id: 'django',
            name: 'Django',
            keywords: 'django',
            section: 'Commands',
            perform: () => { window.location.href = '/docs/commands/django' },
        },
        {
            id: 'netfetch',
            name: 'Netfetch',
            keywords: 'netfetch',
            section: 'Commands',
            perform: () => { window.location.href = '/docs/commands/netfetch' },
        }
    ]

    return actions
}

export default KBarData
