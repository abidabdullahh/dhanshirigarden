import { useEffect, useState } from 'react'
import { RouterContext } from './routerContext'

function getRouteFromLocation() {
  if (typeof window === 'undefined') return '/'
  const hash = window.location.hash.replace(/^#\/?/, '/')
  if (hash.startsWith('/plant-doctor')) return '/plant-doctor'
  if (hash.startsWith('/blog')) return '/blog'

  const path = window.location.pathname
  if (path.includes('/plant-doctor')) return '/plant-doctor'
  if (path.includes('/blog')) return '/blog'

  return '/'
}

export function RouterProvider({ children }) {
  const [route, setRoute] = useState(getRouteFromLocation)

  useEffect(() => {
    const handleLocationChange = () => {
      const nextRoute = getRouteFromLocation()
      setRoute(nextRoute)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }

    window.addEventListener('hashchange', handleLocationChange)
    window.addEventListener('popstate', handleLocationChange)

    return () => {
      window.removeEventListener('hashchange', handleLocationChange)
      window.removeEventListener('popstate', handleLocationChange)
    }
  }, [])

  const navigate = (nextPath) => {
    const normalized = nextPath.startsWith('/') ? nextPath : `/${nextPath}`
    window.location.hash = `#${normalized}`
    setRoute(normalized)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <RouterContext.Provider value={{ route, navigate }}>
      {children}
    </RouterContext.Provider>
  )
}
