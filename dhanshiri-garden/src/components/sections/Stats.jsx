import { CalendarCheck, PencilRuler, Trees } from 'lucide-react'
import { site } from '../../data/site'
import { useCountUp, useInView } from '../../lib/hooks'
import { useLocale } from '../../lib/locale'

function Stat({ icon: Icon, end, suffix, label, active }) {
  const { num } = useLocale()
  const value = useCountUp(end, active)
  return (
    <div className="flex items-center gap-4 px-6 py-6 sm:flex-col sm:items-start sm:gap-3 sm:px-8 sm:py-8">
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-mint text-emerald">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <div>
        <p className="font-display text-[2.4rem] font-extrabold leading-none text-forest tabular-nums sm:text-[2.9rem]">
          {num(value)}
          {suffix}
        </p>
        <p className="mt-2 text-[0.95rem] text-charcoal/70">{label}</p>
      </div>
    </div>
  )
}

/** Title-block strip: three measured facts, separated by dashed rules like a drawing sheet. */
export default function Stats() {
  const { t } = useLocale()
  const [ref, inView] = useInView({ threshold: 0.35 })
  const items = t.stats.items

  return (
    <section aria-label={t.stats.aria} className="relative z-10 -mt-14 px-4 sm:px-6 lg:px-8">
      <div
        ref={ref}
        className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-dashed divide-forest/20 overflow-hidden rounded-[2rem] glass-white shadow-lift sm:grid-cols-3 sm:divide-x sm:divide-y-0"
      >
        <Stat icon={CalendarCheck} end={site.stats.years} suffix={items.years.suffix} label={items.years.label} active={inView} />
        <Stat icon={PencilRuler} end={site.stats.projects} suffix={items.projects.suffix} label={items.projects.label} active={inView} />
        <Stat icon={Trees} end={site.stats.plants} suffix={items.plants.suffix} label={items.plants.label} active={inView} />
      </div>
    </section>
  )
}
