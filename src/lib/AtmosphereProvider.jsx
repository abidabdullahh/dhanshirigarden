import { useCallback, useEffect, useMemo, useState } from 'react'
import { AtmosphereContext } from './atmosphere'

const STORAGE_KEY = 'dg-atmosphere'

function getAutoAtmosphere() {
  const now = new Date()
  const utcHours = now.getUTCHours()
  const bdHours = (utcHours + 6) % 24
  if (bdHours >= 17 && bdHours < 19) return 'sunset'
  return 'sun'
}

function readSavedAtmosphere() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (['sun', 'rain', 'sunset', 'auto'].includes(saved)) {
      return saved
    }
  } catch {}
  return 'sun'
}

export function AtmosphereProvider({ children }) {
  const [atmosphere, setAtmosphereState] = useState(readSavedAtmosphere)
  const [autoResolved, setAutoResolved] = useState(getAutoAtmosphere)

  useEffect(() => {
    const timer = setInterval(() => {
      setAutoResolved(getAutoAtmosphere())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const effectiveAtmosphere = atmosphere === 'auto' ? autoResolved : atmosphere

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-atmosphere', effectiveAtmosphere)
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, atmosphere)
    } catch {}
  }, [atmosphere, effectiveAtmosphere])

  const setAtmosphere = useCallback((mode) => {
    setAtmosphereState(mode)
  }, [])

  const toggleSound = useCallback(() => {}, [])
  const playClick = useCallback(() => {}, [])

  const value = useMemo(
    () => ({
      atmosphere,
      effectiveAtmosphere,
      setAtmosphere,
      soundEnabled: false,
      toggleSound,
      playClick,
    }),
    [atmosphere, effectiveAtmosphere, setAtmosphere, toggleSound, playClick]
  )

  return <AtmosphereContext.Provider value={value}>{children}</AtmosphereContext.Provider>
}
