import { useEffect, useState } from 'react'
import { RouterContext } from './routerContext'

const KNOWN_ROUTES = [
  '/services',
  '/studio',
  '/projects',
  '/plant-doctor',
  '/plant-wiki',
  '/blog',
  '/about',
  '/contact',
]

function getRouteFromLocation() {
  if (typeof window === 'undefined') return '/'

  // 1. Check hash first (e.g. #/services, #/projects)
  const rawHash = window.location.hash || ''
  const cleanHash = rawHash.replace(/^#\/?/, '/')

  for (const r of KNOWN_ROUTES) {
    if (cleanHash === r || cleanHash.startsWith(r + '/') || cleanHash.startsWith(r + '#') || cleanHash.startsWith(r + '?')) {
      return r
    }
  }

  // 2. Check path (e.g. /services, /projects)
  const path = window.location.pathname || '/'
  for (const r of KNOWN_ROUTES) {
    if (path === r || path.startsWith(r + '/')) {
      return r
    }
  }

  return '/'
}

export function RouterProvider({ children }) {
  const [route, setRoute] = useState(getRouteFromLocation)

  useEffect(() => {
    const handleLocationChange = () => {
      const nextRoute = getRouteFromLocation()
      setRoute(nextRoute)
      
      // If there's a sub-anchor in hash (e.g. #/services#rooftop), scroll to that element
      const hash = window.location.hash
      const subAnchorMatch = hash.match(/#([a-zA-Z0-9_-]+)$/)
      if (subAnchorMatch && subAnchorMatch[1] && !KNOWN_ROUTES.includes(`/${subAnchorMatch[1]}`)) {
        const el = document.getElementById(subAnchorMatch[1])
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
          return
        }
      }
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
    const r = getRouteFromLocation()
    setRoute(r)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <RouterContext.Provider value={{ route, navigate }}>
      {children}
    </RouterContext.Provider>
  )
}
