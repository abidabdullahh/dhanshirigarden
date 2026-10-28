import { Check, Info, MessageCircle, ScanSearch, Scissors, Sprout, Target, X } from 'lucide-react'
import { useLocale } from '../../lib/locale'
import { getWhatsAppLink } from '../../lib/whatsapp'
import Button from '../ui/Button'
import { ScissorsDoodle } from '../ui/Doodles'
import { Container, Section, SectionHeading } from '../ui/Section'

const planOrder = ['daily', 'monthly', 'halfYearly']
const visitDots = { daily: { count: 1, cols: 1 }, monthly: { count: 3, cols: 3 }, halfYearly: { count: 18, cols: 6 } }
const visitIcons = [ScanSearch, Scissors, MessageCircle]

/** Each leaf is one visit — a punch-card read of how often the team comes. */
function VisitDots({ plan }) {
  const { count, cols } = visitDots[plan]
  return (
    <div
      aria-hidden="true"
      className="grid w-fit gap-1.5"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="grid size-6 place-items-center rounded-full bg-bright/35 text-emerald ring-1 ring-emerald/25">
          <Sprout className="size-3.5" />
        </span>
      ))}
    </div>
  )
}

function PlanCard({ planKey, popular }) {
  const { t, lang } = useLocale()
  const copy = t.carePlans
  const plan = copy.plans[planKey]

  return (
    <article
      className={`relative flex flex-col rounded-3xl p-6 sm:p-8 transition-all duration-300 ${
        popular
          ? 'glass-panel shadow-lift ring-2 ring-emerald-400/50 lg:-translate-y-4 border border-emerald-300/40'
          : 'glass-card shadow-soft border border-white/80'
      }`}
    >
      {popular && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full glass-amber px-4 py-1 text-xs font-bold text-charcoal shadow-soft">
          {copy.popular}
        </span>
      )}

      <header>
        <h3 className="text-2xl font-bold text-forest">{plan.name}</h3>
        <p className="mt-1 text-xs font-bold text-emerald uppercase tracking-wider">{plan.tagline}</p>

        <p className="mt-5 flex flex-wrap items-baseline gap-x-2">
          <span className="font-display text-[2.7rem] font-extrabold leading-none text-forest">
            {copy.currencyBn}
            {plan.price}
          </span>
          <span className="text-xs font-semibold text-charcoal/65">{plan.period}</span>
        </p>

        <p className="mt-4 text-sm leading-relaxed text-charcoal/80">{plan.desc}</p>

        <div className="mt-5 grid gap-2">
          <p className="text-xs font-bold text-forest/80 uppercase tracking-wider font-mono">{plan.visitsText}</p>
          <VisitDots plan={planKey} />
        </div>
      </header>

      <div className="relative my-6 flex items-center gap-2" aria-hidden="true">
        <ScissorsDoodle className="size-5 shrink-0 -rotate-90 text-forest/40" />
        <span className="flex-1 border-t border-dashed border-forest/20" />
      </div>

      <div className="flex flex-1 flex-col">
        <p className="flex items-start gap-2.5 rounded-2xl glass-card px-4 py-3 text-xs leading-relaxed text-forest font-medium">
          <Target className="mt-0.5 size-4 shrink-0 text-emerald" aria-hidden="true" />
          <span>
            <strong className="font-bold">{copy.bestFor}: </strong>
            {plan.bestFor}
          </span>
        </p>

        <p className="mb-3 mt-6 font-display text-sm font-bold text-forest">{copy.included}</p>
        <ul className="grid gap-2">
          {plan.included.map((item) => (
            <li key={item} className="flex items-start gap-3 text-xs font-medium leading-snug text-charcoal/90">
              <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full glass-emerald text-white">
                <Check className="size-2.5" strokeWidth={3} aria-hidden="true" />
              </span>
              {item}
            </li>
          ))}
        </ul>

        {plan.excluded.length > 0 && (
          <>
            <p className="mb-3 mt-6 font-display text-sm font-bold text-forest/70">{copy.excluded}</p>
            <ul className="grid gap-2">
              {plan.excluded.map((item) => (
                <li key={item} className="flex items-start gap-3 text-xs leading-snug text-charcoal/50">
                  <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-alert/15 text-alert">
                    <X className="size-2.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="line-through decoration-alert/40">{item}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-8 pt-2">
          <Button
            href={getWhatsAppLink(null, plan.name, lang)}
            variant={popular ? 'primary' : 'glass'}
            size="lg"
            icon={MessageCircle}
            className="w-full text-xs font-bold uppercase tracking-wider"
          >
            {t.actions.bookWhatsapp}
          </Button>
        </div>
      </div>
    </article>
  )
}

export default function CarePlans() {
  const { t } = useLocale()
  const copy = t.carePlans

  return (
    <Section id="care-plans" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-24 -z-10 size-[26rem] rounded-full bg-bright/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 bottom-32 -z-10 size-96 rounded-full bg-bloom/20 blur-3xl" />

      <Container>
        <SectionHeading eyebrow={copy.eyebrow} icon={Sprout} title={copy.title} sub={copy.sub} />

        <div className="grid items-stretch gap-8 pt-4 lg:grid-cols-3 lg:gap-6 xl:gap-8">
          {planOrder.map((key) => (
            <PlanCard key={key} planKey={key} popular={key === 'monthly'} />
          ))}
        </div>

        <div className="relative mt-16 overflow-hidden rounded-3xl glass-panel p-6 sm:p-10 lg:mt-24 border border-white/85">
          <div className="relative grid gap-8 lg:grid-cols-12 lg:gap-12">
            <h3 className="text-2xl font-bold text-forest sm:text-[1.8rem] lg:col-span-4">{copy.visit.title}</h3>
            <ol className="grid gap-6 sm:grid-cols-3 lg:col-span-8">
              {copy.visit.steps.map((step, index) => {
                const Icon = visitIcons[index]
                return (
                  <li key={step.title} className="flex items-start gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl glass-emerald text-white shadow-soft">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-display text-base font-bold text-forest">{step.title}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-charcoal/75">{step.desc}</span>
                    </span>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>

        <p className="mt-6 flex items-start justify-center gap-2 text-center text-xs text-charcoal/65">
          <Info className="mt-0.5 size-4 shrink-0 text-emerald" aria-hidden="true" />
          {copy.note}
        </p>
      </Container>
    </Section>
  )
}
