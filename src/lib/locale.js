import { createContext, useContext } from 'react'

export const LocaleContext = createContext(null)

/** { lang, setLang, toggle, t, n(value), num(value) } — `t` is the copy for the active language. */
export function useLocale() {
  const value = useContext(LocaleContext)
  if (!value) throw new Error('useLocale must be used inside <LocaleProvider>')
  return value
}
