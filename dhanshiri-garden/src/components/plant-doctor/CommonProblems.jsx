import { Bug, Cloud, CircleDot, Droplets, Leaf, Sun } from 'lucide-react'
import { useLocale } from '../../lib/locale'

const icons = { yellow: Leaf, spots: CircleDot, pests: Bug, mildew: Cloud, wilt: Droplets, drywilt: Sun }

/** A no-photo-needed quick reference for the six problems home gardeners meet most. */
export default function CommonProblems() {
  const { t } = useLocale()
  const copy = t.plantDoctor.common

  return (
    <div className="mt-16 lg:mt-24">
      <div className="mb-8 max-w-2xl">
        <h3 className="text-2xl sm:text-[1.9rem]">{copy.title}</h3>
        <p className="mt-2 text-base leading-body text-charcoal/70">{copy.sub}</p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(copy.items).map(([key, item]) => {
          const Icon = icons[key]
          return (
            <li key={key} className="group rounded-[1.75rem] glass-white p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-mint text-emerald transition-transform duration-300 group-hover:-rotate-6">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h4 className="text-[1.08rem] leading-snug">{item.title}</h4>
              </div>
              <dl className="mt-4 grid gap-3 text-[0.93rem] leading-body">
                <div>
                  <dt className="font-semibold text-forest">{copy.causeLabel}</dt>
                  <dd className="text-charcoal/75">{item.cause}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-forest">{copy.aidLabel}</dt>
                  <dd className="text-charcoal/75">{item.aid}</dd>
                </div>
              </dl>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
