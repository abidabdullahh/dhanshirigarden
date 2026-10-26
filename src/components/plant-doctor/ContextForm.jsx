import { useLocale } from '../../lib/locale'

const chip = (selected) =>
  `rounded-full px-3.5 py-2 text-sm font-semibold transition-colors duration-200 ${
    selected ? 'bg-forest text-white shadow-soft' : 'bg-white/80 text-forest/80 ring-1 ring-forest/15 hover:bg-white'
  }`

/** Optional details that make the diagnosis more accurate: where the plant lives and what is wrong. */
export default function ContextForm({ value, onChange }) {
  const { t } = useLocale()
  const c = t.plantDoctor.context

  const toggleSymptom = (key) =>
    onChange({
      ...value,
      symptoms: value.symptoms.includes(key) ? value.symptoms.filter((item) => item !== key) : [...value.symptoms, key],
    })

  return (
    <div className="grid gap-5">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-xl">{c.title}</h3>
        <span className="rounded-full bg-forest/[0.07] px-2.5 py-1 text-xs font-semibold text-forest/70">{c.optional}</span>
      </div>

      <fieldset>
        <legend className="mb-2.5 text-sm font-semibold text-forest">{c.location}</legend>
        <div className="flex flex-wrap gap-2">
          {Object.entries(c.locations).map(([key, label]) => (
            <button
              key={key}
              type="button"
              aria-pressed={value.location === key}
              onClick={() => onChange({ ...value, location: value.location === key ? '' : key })}
              className={chip(value.location === key)}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="pd-plant" className="mb-2.5 block text-sm font-semibold text-forest">
          {c.plantName}
        </label>
        <input
          id="pd-plant"
          type="text"
          maxLength={60}
          value={value.plantName}
          placeholder={c.plantPlaceholder}
          onChange={(event) => onChange({ ...value, plantName: event.target.value })}
          className="w-full rounded-2xl bg-white/85 px-4 py-3 text-base text-charcoal ring-1 ring-forest/15 placeholder:text-charcoal/40"
        />
      </div>

      <fieldset>
        <legend className="mb-2.5 text-sm font-semibold text-forest">{c.symptoms}</legend>
        <div className="flex flex-wrap gap-2">
          {Object.entries(c.symptomList).map(([key, label]) => (
            <button
              key={key}
              type="button"
              aria-pressed={value.symptoms.includes(key)}
              onClick={() => toggleSymptom(key)}
              className={chip(value.symptoms.includes(key))}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  )
}
