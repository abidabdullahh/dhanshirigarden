import { useCallback, useLayoutEffect, useMemo, useState } from 'react'
import { content } from '../data/content'
import { formatNumber, localizeDigits } from './format'
import { LocaleContext } from './locale'

const STORAGE_KEY = 'dg-lang'

function readInitialLang() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'bn' || saved === 'en') return saved
  } catch {
    /* storage can be blocked (private mode); default to Bangla */
  }
  return 'bn'
}

export function LocaleProvider({ children }) {
  const [lang, setLangState] = useState(readInitialLang)

  useLayoutEffect(() => {
    const copy = content[lang]
    document.documentElement.lang = lang
    document.title = copy.meta.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', copy.meta.description)
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  const setLang = useCallback((next) => setLangState(next === 'en' ? 'en' : 'bn'), [])
  const toggle = useCallback(() => setLangState((current) => (current === 'bn' ? 'en' : 'bn')), [])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggle,
      t: content[lang],
      n: (v) => localizeDigits(v, lang),
      num: (v) => formatNumber(v, lang),
    }),
    [lang, setLang, toggle],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}
