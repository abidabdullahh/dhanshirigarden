import { Check, Info, MessageCircle, ScanSearch, Scissors, Sprout, Target, X } from 'lucide-react'
import { useLocale } from '../../lib/locale'
import { getWhatsAppLink } from '../../lib/whatsapp'
import Button from '../ui/Button'
import { LeafDoodle, ScissorsDoodle, TrowelDoodle } from '../ui/Doodles'
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
      className={`relative flex flex-col rounded-[2.25rem] p-6 sm:p-8 ${
        popular ? 'glass-green-strong shadow-lift ring-2 ring-emerald/35 lg:-translate-y-6' : 'glass-white shadow-soft'
      }`}
    >
      {popular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 -rotate-2 whitespace-nowrap rounded-full bg-bloom px-4 py-1.5 text-sm font-bold text-charcoal shadow-soft">
          {copy.popular}
        </span>
      )}

      <header>
        <h3 className="text-2xl">{plan.name}</h3>
        <p className="mt-1 text-sm font-semibold text-emerald">{plan.tagline}</p>

        <p className="mt-5 flex flex-wrap items-baseline gap-x-2">
          <span className="font-display text-[2.7rem] font-extrabold leading-none text-forest">
            {copy.currencyBn}
            {plan.price}
          </span>
          <span className="text-sm font-medium text-charcoal/65">{plan.period}</span>
        </p>

        <p className="mt-4 text-[0.95rem] leading-body text-charcoal/75">{plan.desc}</p>

        <div className="mt-5 grid gap-2">
          <p className="text-sm font-semibold text-forest/80">{plan.visitsText}</p>
          <VisitDots plan={planKey} />
        </div>
      </header>

      <div className="relative my-6 flex items-center gap-2" aria-hidden="true">
        <ScissorsDoodle className="size-6 shrink-0 -rotate-90 text-forest/55" />
        <span className="flex-1 border-t-2 border-dashed border-forest/25" />
      </div>

      <div className="flex flex-1 flex-col">
        <p className="flex items-start gap-2.5 rounded-2xl bg-white/70 px-4 py-3 text-[0.92rem] leading-snug text-forest">
          <Target className="mt-0.5 size-4 shrink-0 text-emerald" aria-hidden="true" />
          <span>
            <span className="font-semibold">{copy.bestFor}: </span>
            {plan.bestFor}
          </span>
        </p>

        <p className="mb-3 mt-6 font-display text-base font-semibold text-forest">{copy.included}</p>
        <ul className="grid gap-2.5">
          {plan.included.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[0.95rem] leading-snug text-charcoal/85">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-bright/35 text-emerald">
                <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
              </span>
              {item}
            </li>
          ))}
        </ul>

        {plan.excluded.length > 0 && (
          <>
            <p className="mb-3 mt-6 font-display text-base font-semibold text-forest/70">{copy.excluded}</p>
            <ul className="grid gap-2.5">
              {plan.excluded.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.95rem] leading-snug text-charcoal/60">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-alert/12 text-alert">
                    <X className="size-3.5" strokeWidth={3} aria-hidden="true" />
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
            variant={popular ? 'primary' : 'outline'}
            size="lg"
            icon={MessageCircle}
            className="w-full"
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
    <Section id="care-plans">
      <div aria-hidden="true" className="absolute -right-32 top-24 -z-10 size-[26rem] rounded-full bg-bright/25 blur-3xl" />
      <div aria-hidden="true" className="absolute -left-24 bottom-32 -z-10 size-96 rounded-full bg-bloom/15 blur-3xl" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 blueprint-grid opacity-50 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]" />

      <Container>
        <SectionHeading eyebrow={copy.eyebrow} icon={Sprout} title={copy.title} sub={copy.sub} />

        <div className="grid items-stretch gap-10 pt-4 lg:grid-cols-3 lg:gap-6 xl:gap-8">
          {planOrder.map((key) => (
            <PlanCard key={key} planKey={key} popular={key === 'monthly'} />
          ))}
        </div>

        <div className="relative mt-20 overflow-hidden rounded-[2.25rem] glass-green p-6 sm:p-10 lg:mt-28">
          <LeafDoodle className="pointer-events-none absolute -right-4 -top-4 size-24 rotate-12 text-emerald/25" />
          <TrowelDoodle className="pointer-events-none absolute -bottom-3 right-16 size-20 text-forest/20" />
          <div className="relative grid gap-8 lg:grid-cols-12 lg:gap-12">
            <h3 className="text-2xl sm:text-[1.8rem] lg:col-span-4">{copy.visit.title}</h3>
            <ol className="grid gap-6 sm:grid-cols-3 lg:col-span-8">
              {copy.visit.steps.map((step, index) => {
                const Icon = visitIcons[index]
                return (
                  <li key={step.title} className="flex items-start gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/80 text-emerald shadow-soft">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-display text-[1.08rem] font-semibold text-forest">{step.title}</span>
                      <span className="mt-1 block text-[0.93rem] leading-snug text-charcoal/70">{step.desc}</span>
                    </span>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>

        <p className="mt-6 flex items-start justify-center gap-2 text-center text-[0.88rem] leading-snug text-charcoal/65">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {copy.note}
        </p>
      </Container>
    </Section>
  )
}
