import { useState } from 'react'
import { Check, Info, MessageCircle, ScanSearch, Scissors, Sparkles, Sprout, Target, X } from 'lucide-react'
import { formatNumber } from '../../lib/format'
import { useLocale } from '../../lib/locale'
import { getCustomWhatsAppLink, getWhatsAppLink } from '../../lib/whatsapp'
import Button from '../ui/Button'
import { LeafDoodle, ScissorsDoodle, TrowelDoodle } from '../ui/Doodles'
import { Container, Section, SectionHeading } from '../ui/Section'

const planOrder = ['daily', 'monthly', 'halfYearly']
const visitDots = { daily: { count: 1, cols: 1 }, monthly: { count: 3, cols: 3 }, halfYearly: { count: 18, cols: 6 } }
const visitIcons = [ScanSearch, Scissors, MessageCircle]

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

function PlanCard({ planKey, popular, isAnnual }) {
  const { t, lang } = useLocale()
  const copy = t.carePlans
  const plan = copy.plans[planKey]

  // Calculate annual rate (15% discount for recurring plans)
  const isRecurring = planKey !== 'daily'
  let displayedPrice = plan.price
  let displayedPeriod = plan.period
  let savingsAmount = 0

  if (isAnnual && isRecurring) {
    if (planKey === 'monthly') {
      // 4,499 * 12 = 53,988 -> with 15% discount = 45,890 (save 8,098)
      displayedPrice = formatNumber(45890, lang)
      displayedPeriod = lang === 'bn' ? '/বছর' : '/year'
      savingsAmount = formatNumber(8098, lang)
    } else if (planKey === 'halfYearly') {
      // 24,999 * 2 = 49,998 -> with 15% discount = 42,498 (save 7,500)
      displayedPrice = formatNumber(42498, lang)
      displayedPeriod = lang === 'bn' ? '/বছর' : '/year'
      savingsAmount = formatNumber(7500, lang)
    }
  }

  const bookingMessage = isAnnual && isRecurring
    ? (lang === 'bn'
        ? `হ্যালো, আমি ধানসিঁড়ি গার্ডেনের “${plan.name}” (বাৎসরিক চুক্তি - ১৫% ছাড়সহ) বুক করতে চাই।`
        : `Hello, I would like to book the "${plan.name}" (Annual Package with 15% discount).`)
    : null

  return (
    <article
      className={`relative flex flex-col rounded-[2.25rem] p-6 sm:p-8 transition-all duration-300 ${
        popular ? 'glass-green-strong shadow-lift ring-2 ring-emerald/35 lg:-translate-y-6' : 'glass-white shadow-soft hover:shadow-lift'
      }`}
    >
      {popular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 -rotate-2 whitespace-nowrap rounded-full bg-bloom px-4 py-1.5 text-sm font-bold text-charcoal shadow-soft">
          {copy.popular}
        </span>
      )}

      <header>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl">{plan.name}</h3>
          {isAnnual && isRecurring && (
            <span className="rounded-full bg-emerald/15 px-2.5 py-0.5 text-xs font-bold text-emerald">
              {copy.billingToggle.badge}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm font-semibold text-emerald">{plan.tagline}</p>

        <p className="mt-5 flex flex-wrap items-baseline gap-x-2">
          <span className="font-display text-[2.7rem] font-extrabold leading-none text-forest">
            {copy.currencyBn}
            {displayedPrice}
          </span>
          <span className="text-sm font-medium text-charcoal/65">{displayedPeriod}</span>
        </p>

        {isAnnual && isRecurring && savingsAmount && (
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-mint px-3 py-1 text-xs font-bold text-forest">
            <Sparkles className="size-3.5 text-bloom" aria-hidden="true" />
            <span>৳{savingsAmount} {copy.billingToggle.saveSuffix}</span>
          </p>
        )}

        <p className="mt-4 text-[0.95rem] leading-body text-charcoal/75">{plan.desc}</p>

        <div className="mt-5 grid gap-2">
          <p className="text-sm font-semibold text-forest/80">
            {isAnnual && isRecurring ? (lang === 'bn' ? 'বাৎসরিক তদারকি সূচি' : 'Annual Inspection Schedule') : plan.visitsText}
          </p>
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
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-auto pt-8">
          <Button
            href={bookingMessage ? getCustomWhatsAppLink(bookingMessage) : getWhatsAppLink(null, plan.name, lang)}
            variant={popular ? 'primary' : 'outline'}
            size="lg"
            icon={MessageCircle}
            className="w-full justify-center shadow-soft"
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
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <Section id="care-plans">
      <div aria-hidden="true" className="absolute -right-32 top-24 -z-10 size-[26rem] rounded-full bg-bright/25 blur-3xl" />
      <div aria-hidden="true" className="absolute -left-24 bottom-32 -z-10 size-96 rounded-full bg-bloom/15 blur-3xl" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 blueprint-grid opacity-50 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]" />

      <Container>
        <SectionHeading eyebrow={copy.eyebrow} icon={Sprout} title={copy.title} sub={copy.sub} />

        {/* Annual / Monthly Billing Toggle */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center rounded-full glass-white p-1.5 shadow-soft ring-1 ring-forest/10">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${
                !isAnnual ? 'bg-forest text-white shadow-soft' : 'text-forest/75 hover:text-forest'
              }`}
            >
              {copy.billingToggle.monthly}
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition-all ${
                isAnnual ? 'bg-forest text-white shadow-soft' : 'text-forest/75 hover:text-forest'
              }`}
            >
              <span>{copy.billingToggle.annual}</span>
              <span className="rounded-full bg-bloom px-2 py-0.5 text-[0.72rem] font-extrabold text-charcoal">
                {copy.billingToggle.badge}
              </span>
            </button>
          </div>
        </div>

        <div className="grid items-stretch gap-10 pt-10 lg:grid-cols-3 lg:gap-6 xl:gap-8">
          {planOrder.map((key) => (
            <PlanCard
              key={key}
              planKey={key}
              popular={key === 'monthly'}
              isAnnual={isAnnual}
            />
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
