import { CalendarCheck, PencilRuler, Trees } from 'lucide-react'
import { site } from '../../data/site'
import { useCountUp, useInView } from '../../lib/hooks'
import { useLocale } from '../../lib/locale'

function Stat({ icon: Icon, end, suffix, label, active }) {
  const { num } = useLocale()
  const value = useCountUp(end, active)
  return (
    <div className="flex items-center gap-4 px-6 py-6 sm:flex-col sm:items-start sm:gap-3.5 sm:px-8 sm:py-7">
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl glass-emerald shadow-soft">
        <Icon className="size-6 text-white" aria-hidden="true" />
      </span>
      <div>
        <p className="font-display text-[2.4rem] font-extrabold leading-none text-forest tabular-nums sm:text-[2.9rem]">
          {num(value)}
          {suffix}
        </p>
        <p className="mt-2 text-[0.95rem] font-medium text-charcoal/75">{label}</p>
      </div>
    </div>
  )
}

/** Luminous Frosted Glass Authority Stats Strip */
export default function Stats() {
  const { t } = useLocale()
  const [ref, inView] = useInView({ threshold: 0.35 })
  const items = t.stats.items

  return (
    <section aria-label={t.stats.aria} className="relative z-10 -mt-10 px-4 sm:px-6 lg:px-8">
      <div
        ref={ref}
        className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-white/60 overflow-hidden rounded-3xl glass-panel shadow-lift sm:grid-cols-3 sm:divide-x sm:divide-y-0 border border-white/80"
      >
        <Stat icon={CalendarCheck} end={site.stats.years} suffix={items.years.suffix} label={items.years.label} active={inView} />
        <Stat icon={PencilRuler} end={site.stats.projects} suffix={items.projects.suffix} label={items.projects.label} active={inView} />
        <Stat icon={Trees} end={site.stats.plants} suffix={items.plants.suffix} label={items.plants.label} active={inView} />
      </div>
    </section>
  )
}
