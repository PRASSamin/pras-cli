const DrawerData = () => {
    const data = [
        {
            id: 1,
            title: 'Home',
            perform: () => window.location.href = '/',
        },
        {
            id: 3,
            title: 'Documentation',
            perform: () => window.location.href = '/docs',
        },
        {
            title: 'Commands',
            perform: () => window.location.href = '/docs/commands',
        },
        {
            id: 2,
            title: 'Download',
            perform: () => window.location.href = '/download/version/latest',
        },
        {
            title: 'Acknowledgments',
            perform: () => window.location.href = '/acknowledgments',
        },
        {
            title: 'Introduction',
            section: 'Getting Started',
            perform: () => window.location.href = '/docs',
        },
        {
            title: 'Installation',
            section: 'Getting Started',
            perform: () => window.location.href = '/docs/installation',
        },
        {
            title: 'shell',
            tag: 'New',
            section: 'Commands',
            perform: () => window.location.href = '/docs/commands/shell',
        },
        {
            title: 'Django',
            section: 'Commands',
            perform: () => window.location.href = '/docs/commands/django',
        },
        {
            title: 'NetFetch',
            section: 'Commands',
            perform: () => window.location.href = '/docs/commands/netfetch',
        },
    ];


    return data;
};

export default DrawerData;
