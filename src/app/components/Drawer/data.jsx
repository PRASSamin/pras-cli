const DrawerData = () => {
    const data = [
        {
            id: 1,
            title: 'Home',
            pathname: '/',
        },
        {
            id: 3,
            title: 'Documentation',
            pathname: '/docs',
        },
        {
            title: 'Commands',
            pathname: '/docs/commands',
        },
        {
            id: 2,
            title: 'Download',
            pathname: '/download/version/latest',
        },
        {
            title: 'Acknowledgments',
            pathname: '/acknowledgments',
        },
        {
            title: 'Introduction',
            section: 'Getting Started',
            pathname: '/docs',
        },
        {
            title: 'Installation',
            section: 'Getting Started',
            pathname: '/docs/installation',
        },
        {
            title: 'shell',
            tag: 'New',
            section: 'Commands',
            pathname: '/docs/commands/shell',
        },
        {
            title: 'Django',
            section: 'Commands',
            pathname: '/docs/commands/django',
        },
        {
            title: 'NetFetch',
            section: 'Commands',
            pathname: '/docs/commands/netfetch',
        },
    ];


    return data;
};

export default DrawerData;
