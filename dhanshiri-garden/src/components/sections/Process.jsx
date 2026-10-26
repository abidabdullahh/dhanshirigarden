import { useRef, useState } from 'react'
import { Check, ChevronLeft, ChevronRight, Footprints } from 'lucide-react'
import { useLocale } from '../../lib/locale'
import { SproutDoodle } from '../ui/Doodles'
import { Container, Section, SectionHeading } from '../ui/Section'

export default function Process() {
  const { t, n } = useLocale()
  const copy = t.process
  const total = copy.steps.length
  const [active, setActive] = useState(0)
  const refs = useRef([])
  const step = copy.steps[active]
  const progress = (active / (total - 1)) * 100

  const go = (index, focus = false) => {
    const next = Math.max(0, Math.min(total - 1, index))
    setActive(next)
    if (focus) refs.current[next]?.focus()
  }

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      go(active + 1, true)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      go(active - 1, true)
    } else if (event.key === 'Home') {
      event.preventDefault()
      go(0, true)
    } else if (event.key === 'End') {
      event.preventDefault()
      go(total - 1, true)
    }
  }

  return (
    <Section id="process" className="bg-linear-to-b from-transparent via-mint/40 to-transparent">
      <div aria-hidden="true" className="absolute inset-0 -z-10 blueprint-grid opacity-50 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]" />
      <Container>
        <SectionHeading eyebrow={copy.eyebrow} icon={Footprints} title={copy.title} sub={copy.sub} />

        <div className="mx-auto max-w-5xl">
          <ol
            onKeyDown={onKeyDown}
            className="relative grid grid-cols-7 [--r:1.125rem] sm:[--r:1.5rem]"
            aria-label={copy.title}
          >
            <span
              aria-hidden="true"
              className="absolute left-[calc(100%/14)] right-[calc(100%/14)] top-(--r) h-[3px] -translate-y-1/2 rounded-full bg-forest/10"
            >
              <span
                className="block h-full rounded-full bg-linear-to-r from-emerald to-bright transition-[width] duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </span>

            {copy.steps.map((item, index) => {
              const isActive = index === active
              const done = index < active
              return (
                <li key={item.title} className="relative flex flex-col items-center">
                  <button
                    ref={(node) => {
                      refs.current[index] = node
                    }}
                    type="button"
                    aria-current={isActive ? 'step' : undefined}
                    aria-label={`${copy.stepLabel} ${n(index + 1)}: ${item.title}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => go(index)}
                    className={`relative z-10 grid size-9 place-items-center rounded-full font-display text-[0.95rem] font-bold transition duration-300 sm:size-12 sm:text-lg ${
                      isActive
                        ? 'scale-110 bg-forest text-white shadow-lift ring-4 ring-bright/50'
                        : done
                          ? 'bg-bright text-forest hover:scale-105'
                          : 'bg-white text-forest ring-1 ring-forest/20 hover:scale-105 hover:ring-emerald'
                    }`}
                  >
                    {done ? <Check className="size-4 sm:size-5" strokeWidth={3} aria-hidden="true" /> : n(index + 1)}
                  </button>
                  <span
                    className={`mt-3 hidden max-w-[5.8rem] text-center text-[0.8rem] leading-snug transition-colors md:block lg:max-w-[8rem] lg:text-[0.88rem] ${
                      isActive ? 'font-semibold text-forest' : 'text-charcoal/60'
                    }`}
                  >
                    {item.short}
                  </span>
                </li>
              )
            })}
          </ol>

          <div
            key={active}
            aria-live="polite"
            className="mt-10 animate-rise rounded-[2.25rem] glass-green-strong p-6 shadow-lift [animation-duration:0.5s] sm:p-10"
          >
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-7">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-emerald">
                  <SproutDoodle className="size-7" />
                  {copy.stepLabel} {n(active + 1)} / {n(total)}
                </p>
                <h3 className="mt-3 text-2xl sm:text-[1.9rem]">{step.title}</h3>
                <p className="mt-3 text-base leading-body text-charcoal/80 sm:text-[1.05rem]">{step.desc}</p>
              </div>
              <ul className="grid content-center gap-3 lg:col-span-5">
                {step.points.map((point) => (
                  <li key={point} className="flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 text-[0.97rem] font-medium text-forest">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-bright/35 text-emerald">
                      <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex items-center justify-between gap-3 border-t border-dashed border-forest/20 pt-6">
              <button
                type="button"
                onClick={() => go(active - 1)}
                disabled={active === 0}
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[0.95rem] font-semibold text-forest transition-colors hover:bg-white/70 disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
                {copy.prev}
              </button>
              <button
                type="button"
                onClick={() => go(active + 1)}
                disabled={active === total - 1}
                className="inline-flex items-center gap-1.5 rounded-full bg-forest px-5 py-2.5 text-[0.95rem] font-semibold text-white shadow-soft transition-colors hover:bg-emerald disabled:pointer-events-none disabled:opacity-40"
              >
                {copy.next}
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
