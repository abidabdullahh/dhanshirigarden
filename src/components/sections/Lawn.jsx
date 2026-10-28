import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { photos } from '../../data/images'
import { useLocale } from '../../lib/locale'
import { getWhatsAppLink } from '../../lib/whatsapp'
import Button from '../ui/Button'
import { MowerDoodle } from '../ui/Doodles'
import Img from '../ui/Img'
import { Container, Section, SectionHeading } from '../ui/Section'
import Tabs from '../ui/Tabs'
import MowSlider from './MowSlider'

const tabPhotos = ['mowerClose', 'mowing', 'palmSteps']

export default function Lawn() {
  const { t, lang, n } = useLocale()
  const copy = t.lawn
  const [tab, setTab] = useState(0)
  const current = copy.tabs[tab]

  return (
    <Section id="lawn" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 bottom-24 -z-10 size-96 rounded-full bg-bright/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-24 -z-10 size-96 rounded-full bg-emerald/20 blur-3xl" />
      <Container>
        <SectionHeading eyebrow={copy.eyebrow} icon={MowerDoodle} title={copy.title} sub={copy.intro} />

        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="rounded-3xl glass-panel p-5 sm:p-7 shadow-lift border border-white/85 lg:col-span-7">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-1">
              <h3 className="text-xl font-bold text-forest sm:text-2xl">{copy.sliderTitle}</h3>
              <p className="text-xs font-semibold text-emerald uppercase tracking-wider">{copy.sliderHint}</p>
            </div>
            <MowSlider />
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-full glass-surface p-1.5 inline-block w-full">
              <Tabs
                tabs={copy.tabs}
                value={tab}
                onChange={setTab}
                label={copy.eyebrow}
                idPrefix="lawn"
              />
            </div>

            <div
              id="lawn-panel"
              role="tabpanel"
              aria-labelledby={`lawn-tab-${tab}`}
              key={tab}
              className="mt-5 animate-rise rounded-3xl glass-panel p-5 shadow-lift border border-white/85 [animation-duration:0.5s]"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-mint shadow-inner">
                <Img photo={photos[tabPhotos[tab]]} width={900} sizes="(min-width: 1024px) 38vw, 92vw" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-forest sm:text-[1.35rem]">{current.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/85">{current.desc}</p>
            </div>
          </div>
        </div>

        <div className="mt-16 lg:mt-24">
          <h3 className="mb-8 text-xl font-bold text-forest sm:text-2xl">{copy.stepsTitle}</h3>
          <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {copy.steps.map((step, index) => (
              <li key={step.title} className="relative rounded-3xl glass-card p-5 border border-white/75 flex flex-col justify-between">
                <span className="grid size-10 place-items-center rounded-xl glass-emerald font-display text-sm font-bold text-white shadow-soft">
                  {n(index + 1)}
                </span>
                <div className="mt-4">
                  <h4 className="font-display text-base font-bold text-forest">{step.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-charcoal/80">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Button href={getWhatsAppLink(t.services.items.lawnCarpeting.title, null, lang)} size="lg" icon={MessageCircle}>
              {copy.cta}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
