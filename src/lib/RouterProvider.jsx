import { useEffect, useState } from 'react'
import { RouterContext } from './routerContext'

const KNOWN_ROUTES = [
  '/',
  '/store',
  '/services',
  '/projects',
  '/about',
  '/contact',
  '/admin',
  '/blog',
  '/toolkit',
  '/doctor',
  '/studio',
  '/wiki',
]

function getRouteFromLocation() {
  if (typeof window === 'undefined') return '/'

  // 1. Backwards-compatibility: If URL contains hash like `/#/store` or `#/projects`, normalize it to clean path
  const hash = window.location.hash || ''
  if (hash.startsWith('#/')) {
    const cleanHash = hash.replace(/^#\/?/, '/')
    const [matchedPath] = cleanHash.split('#')
    for (const r of KNOWN_ROUTES) {
      if (r !== '/' && (matchedPath === r || matchedPath.startsWith(r + '/'))) {
        try {
          window.history.replaceState(null, '', r)
        } catch {}
        return r
      }
    }
  }

  // 2. Canonical HTML5 pathname check
  const path = window.location.pathname || '/'
  for (const r of KNOWN_ROUTES) {
    if (r !== '/' && (path === r || path.startsWith(r + '/'))) {
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

      // Support sub-anchor scrolling (e.g. /services#irrigation)
      const hash = window.location.hash
      const subAnchorMatch = hash.match(/#([a-zA-Z0-9_-]+)$/)
      if (subAnchorMatch && subAnchorMatch[1]) {
        const el = document.getElementById(subAnchorMatch[1])
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50)
          return
        }
      }
      window.scrollTo({ top: 0, behavior: 'instant' })
    }

    window.addEventListener('popstate', handleLocationChange)
    return () => {
      window.removeEventListener('popstate', handleLocationChange)
    }
  }, [])

  const navigate = (nextPath, options = {}) => {
    if (typeof window === 'undefined') return
    const normalized = nextPath.startsWith('/') ? nextPath : `/${nextPath}`
    const [pathPart, anchorPart] = normalized.split('#')

    let targetRoute = '/'
    for (const r of KNOWN_ROUTES) {
      if (r !== '/' && (pathPart === r || pathPart.startsWith(r + '/'))) {
        targetRoute = r
        break
      }
    }

    const targetUrl = anchorPart ? `${pathPart}#${anchorPart}` : pathPart
    if (options.replace) {
      window.history.replaceState(null, '', targetUrl)
    } else {
      window.history.pushState(null, '', targetUrl)
    }

    setRoute(targetRoute)

    if (anchorPart) {
      setTimeout(() => {
        const el = document.getElementById(anchorPart)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }

  return (
    <RouterContext.Provider value={{ route, navigate }}>
      {children}
    </RouterContext.Provider>
  )
}
