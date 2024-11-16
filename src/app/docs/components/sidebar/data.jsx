const sideBarData = () => {
  const data = [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Introduction',
          pathname: '/docs/introduction',
        },
        {
          title: 'Installation',
          pathname: '/docs/installation',
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
        },
        {
          title: 'Django',
          pathname: '/docs/commands/django',
        },
        {
          title: 'NetFetch',
          pathname: '/docs/commands/netfetch',
        },
      ]
    }
  ]

  return data
}

export default sideBarData
