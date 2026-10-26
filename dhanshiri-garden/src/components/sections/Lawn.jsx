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
    <Section id="lawn">
      <div aria-hidden="true" className="absolute -left-24 bottom-24 -z-10 size-96 rounded-full bg-bright/20 blur-3xl" />
      <Container>
        <SectionHeading eyebrow={copy.eyebrow} icon={MowerDoodle} title={copy.title} sub={copy.intro} />

        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="rounded-[2.25rem] glass-green p-4 shadow-soft sm:p-6 lg:col-span-7">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-1">
              <h3 className="text-xl sm:text-2xl">{copy.sliderTitle}</h3>
              <p className="text-sm text-forest/70">{copy.sliderHint}</p>
            </div>
            <MowSlider />
          </div>

          <div className="lg:col-span-5">
            <Tabs
              tabs={copy.tabs}
              value={tab}
              onChange={setTab}
              label={copy.eyebrow}
              idPrefix="lawn"
            />

            <div
              id="lawn-panel"
              role="tabpanel"
              aria-labelledby={`lawn-tab-${tab}`}
              key={tab}
              className="mt-5 animate-rise rounded-[2rem] glass-white p-4 shadow-soft [animation-duration:0.5s] sm:p-5"
            >
              <div className="aspect-[4/3] overflow-hidden bg-mint leaf-a">
                <Img photo={photos[tabPhotos[tab]]} width={900} sizes="(min-width: 1024px) 38vw, 92vw" />
              </div>
              <h3 className="mt-5 text-xl sm:text-[1.4rem]">{current.title}</h3>
              <p className="mt-2 text-[0.98rem] leading-body text-charcoal/80">{current.desc}</p>
            </div>
          </div>
        </div>

        <div className="mt-16 lg:mt-24">
          <h3 className="mb-8 text-xl sm:text-2xl">{copy.stepsTitle}</h3>
          <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <span
              aria-hidden="true"
              className="absolute left-6 right-6 top-6 hidden border-t-2 border-dashed border-emerald/35 lg:block"
            />
            {copy.steps.map((step, index) => (
              <li key={step.title} className="relative flex gap-4 lg:block">
                <span className="relative grid size-12 shrink-0 place-items-center rounded-full bg-forest font-display text-lg font-bold text-white shadow-soft ring-4 ring-cream">
                  {n(index + 1)}
                </span>
                <div className="lg:mt-5">
                  <h4 className="font-display text-[1.1rem] font-semibold text-forest">{step.title}</h4>
                  <p className="mt-1.5 text-[0.95rem] leading-body text-charcoal/75">{step.desc}</p>
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
