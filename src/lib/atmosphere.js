import { createContext, useContext } from 'react'

export const AtmosphereContext = createContext(null)

export function useAtmosphere() {
  const context = useContext(AtmosphereContext)
  if (!context) {
    throw new Error('useAtmosphere must be used within an AtmosphereProvider')
  }
  return context
}
