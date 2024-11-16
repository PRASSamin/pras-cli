const sideBarData = () => {
  const data = [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Introduction',
          pathname: '/docs/introduction',
          perform: (pathname) => window.location.href = pathname
        },
        {
          title: 'Installation',
          pathname: '/docs/installation',
          perform: (pathname) => window.location.href = pathname
        }
      ]
    },
    {
      title: 'Commands',
      items: [
        {
          tag: 'New',
          title: 'Shell',
          pathname: '/docs/commands/shell',
          perform: (pathname) => window.location.href = pathname
        },
        {
          title: 'Django',
          pathname: '/docs/commands/django',
          perform: (pathname) => window.location.href = pathname
        },
        {
          title: 'NetFetch',
          pathname: '/docs/commands/netfetch',
          perform: (pathname) => window.location.href = pathname
        },
      ]
    }
  ]

  return data
}

export default sideBarData
