import React from 'react'
import { useRouter } from 'next/navigation'
const sideBarData = () => {
  const router = useRouter()

  const data = [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Introduction',
          pathname: '/docs/introduction',
          perform: (pathname) => router.push(pathname)
        },
        {
          title: 'Installation',
          pathname: '/docs/installation',
          perform: (pathname) => router.push(pathname)
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
          perform: (pathname) => router.push(pathname)
        },
        {
          title: 'Django',
          pathname: '/docs/commands/django',
          perform: (pathname) => router.push(pathname)
        },
        {
          title: 'NetFetch',
          pathname: '/docs/commands/netfetch',
          perform: (pathname) => router.push(pathname)
        },
      ]
    }
  ]

  return data
}

export default sideBarData
