import { useLocale } from '../../lib/locale'

export default function LangToggle({ className = '' }) {
  const { lang, setLang, t } = useLocale()
  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={`inline-flex items-center gap-0.5 rounded-full border border-forest/15 bg-white/70 p-0.5 text-xs font-bold text-forest shadow-xs backdrop-blur-md ${className}`}
    >
      <button
        type="button"
        lang="bn"
        onClick={() => setLang('bn')}
        className={`rounded-full px-2.5 py-1 transition-all duration-200 ${
          lang === 'bn'
            ? 'bg-forest text-white shadow-xs'
            : 'text-forest/65 hover:text-forest hover:bg-forest/5'
        }`}
      >
        বাং
      </button>
      <button
        type="button"
        lang="en"
        onClick={() => setLang('en')}
        className={`rounded-full px-2.5 py-1 transition-all duration-200 ${
          lang === 'en'
            ? 'bg-forest text-white shadow-xs'
            : 'text-forest/65 hover:text-forest hover:bg-forest/5'
        }`}
      >
        EN
      </button>
    </div>
  )
}
