import { useState } from 'react'
import { Check, ImageIcon, MessageCircle, Ruler } from 'lucide-react'
import { photos } from '../../data/images'
import { site } from '../../data/site'
import { useLocale } from '../../lib/locale'
import { getWhatsAppLink } from '../../lib/whatsapp'
import Button from '../ui/Button'
import Img from '../ui/Img'
import { Container, Section, SectionHeading } from '../ui/Section'
import Tabs from '../ui/Tabs'

const typePhotos = [
  ['rooftopTerrace', 'balconyPlant'],
  ['tropicalGazebo', 'palmSteps'],
  ['greenWall', 'hangingPlanter'],
  ['gardenPath', 'pondGarden'],
  ['greenhouseRows', 'seedlingTrays'],
]

export default function Projects() {
  const { t, lang } = useLocale()
  const copy = t.projects
  const [tab, setTab] = useState(0)
  const current = copy.types[tab]
  const [main, second] = typePhotos[tab]

  return (
    <Section id="projects" className="bg-linear-to-b from-transparent via-white/60 to-transparent">
      <div aria-hidden="true" className="absolute -right-32 top-32 -z-10 size-96 rounded-full bg-bright/20 blur-3xl" />
      <Container>
        <SectionHeading eyebrow={copy.eyebrow} icon={Ruler} title={copy.title} sub={copy.sub} />

        <Tabs tabs={copy.types} value={tab} onChange={setTab} label={copy.eyebrow} idPrefix="projects" scroll />

        <div
          id="projects-panel"
          role="tabpanel"
          aria-labelledby={`projects-tab-${tab}`}
          key={tab}
          className="mt-8 grid animate-rise items-center gap-10 [animation-duration:0.55s] lg:grid-cols-12 lg:gap-14"
        >
          <div className="relative mx-auto w-full max-w-xl lg:col-span-6 lg:max-w-none">
            <div className="aspect-[5/4] overflow-hidden bg-mint shadow-lift ring-8 ring-white/70 leaf-a">
              <Img photo={photos[main]} width={1200} sizes="(min-width: 1024px) 50vw, 92vw" />
            </div>
            <div className="absolute -bottom-6 -right-2 aspect-square w-[34%] overflow-hidden bg-mint shadow-lift ring-8 ring-cream leaf-b sm:-right-6">
              <Img photo={photos[second]} width={600} sizes="(min-width: 1024px) 16vw, 32vw" />
            </div>
          </div>

          <div className="lg:col-span-6">
            <h3 className="text-2xl sm:text-[1.9rem]">{current.title}</h3>
            <p className="mt-3 text-base leading-body text-charcoal/80 sm:text-[1.05rem]">{current.desc}</p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="font-display text-base font-semibold text-forest">{copy.scopeLabel}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {current.scope.map((item) => (
                    <li key={item} className="rounded-full glass-green px-3.5 py-1.5 text-sm font-medium text-forest">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-display text-base font-semibold text-forest">{copy.handledLabel}</p>
                <ul className="mt-3 grid gap-2.5">
                  {current.handled.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[0.95rem] leading-snug text-charcoal/85">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-bright/30 text-emerald">
                        <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href={getWhatsAppLink(current.title, null, lang)} icon={MessageCircle}>
                {copy.cta}
              </Button>
              {site.illustrativePhotos && (
                <p className="inline-flex max-w-xs items-start gap-2 text-[0.82rem] leading-snug text-charcoal/60">
                  <ImageIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {copy.illustrative}
                </p>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
