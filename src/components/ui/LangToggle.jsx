import { useLocale } from '../../lib/locale'

const options = [
  { id: 'bn', short: 'বাং', full: 'বাংলা', font: 'var(--font-body-bn)' },
  { id: 'en', short: 'EN', full: 'English', font: 'var(--font-body-en)' },
]

/** Two-option segmented switch with a sliding thumb; each label is set in its own script. */
export default function LangToggle({ className = '' }) {
  const { lang, setLang, t } = useLocale()
  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={`relative inline-grid shrink-0 grid-cols-2 rounded-full bg-forest/[0.07] p-1 ring-1 ring-forest/15 ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-forest shadow-soft transition-transform duration-300 ease-out"
        style={{ transform: lang === 'en' ? 'translateX(100%)' : 'translateX(0)' }}
      />
      {options.map((option) => {
        const active = lang === option.id
        return (
          <button
            key={option.id}
            type="button"
            lang={option.id}
            aria-pressed={active}
            onClick={() => setLang(option.id)}
            style={{ fontFamily: option.font }}
            className={`relative z-10 min-w-10 rounded-full px-2.5 py-1.5 text-sm font-semibold leading-none transition-colors duration-200 sm:min-w-11 sm:px-3 ${
              active ? 'text-white' : 'text-forest/70 hover:text-forest'
            }`}
          >
            <span className="sm:hidden">{option.short}</span>
            <span className="hidden sm:inline">{option.full}</span>
          </button>
        )
      })}
    </div>
  )
}
