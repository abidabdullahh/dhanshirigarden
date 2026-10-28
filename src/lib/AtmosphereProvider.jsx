import { useCallback, useEffect, useMemo, useState } from 'react'
import { soundEngine } from './audioSynth'
import { AtmosphereContext } from './atmosphere'

const STORAGE_KEY = 'dg-atmosphere'
const SOUND_KEY = 'dg-sound'

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
  } catch {
    // ignore
  }
  return 'sun'
}

function readSavedSound() {
  try {
    return window.localStorage.getItem(SOUND_KEY) === 'true'
  } catch {
    return false
  }
}

export function AtmosphereProvider({ children }) {
  const [atmosphere, setAtmosphereState] = useState(readSavedAtmosphere)
  const [soundEnabled, setSoundEnabledState] = useState(readSavedSound)
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
    } catch {
      // ignore
    }

    if (soundEngine) {
      soundEngine.setAtmosphere(effectiveAtmosphere)
    }
  }, [atmosphere, effectiveAtmosphere])

  useEffect(() => {
    try {
      window.localStorage.setItem(SOUND_KEY, String(soundEnabled))
    } catch {
      // ignore
    }
    if (soundEngine) {
      soundEngine.setMuted(!soundEnabled)
    }
  }, [soundEnabled])

  const setAtmosphere = useCallback((mode) => {
    setAtmosphereState(mode)
    if (soundEngine && soundEnabled) {
      soundEngine.playClick()
    }
  }, [soundEnabled])

  const toggleSound = useCallback(() => {
    setSoundEnabledState((prev) => {
      const next = !prev
      if (soundEngine) {
        soundEngine.setMuted(!next)
        if (next) soundEngine.playClick()
      }
      return next
    })
  }, [])

  const playClick = useCallback(() => {
    if (soundEnabled && soundEngine) {
      soundEngine.playClick()
    }
  }, [soundEnabled])

  const value = useMemo(
    () => ({
      atmosphere,
      effectiveAtmosphere,
      setAtmosphere,
      soundEnabled,
      toggleSound,
      playClick,
    }),
    [atmosphere, effectiveAtmosphere, setAtmosphere, soundEnabled, toggleSound, playClick]
  )

  return <AtmosphereContext.Provider value={value}>{children}</AtmosphereContext.Provider>
}
