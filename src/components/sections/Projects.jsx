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
    <Section id="projects" className="relative isolate overflow-hidden">
      {/* Diffuse glass glows */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-32 -z-10 size-96 rounded-full bg-bright/25 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 bottom-32 -z-10 size-96 rounded-full bg-emerald/20 blur-3xl" />

      <Container>
        <SectionHeading eyebrow={copy.eyebrow} icon={Ruler} title={copy.title} sub={copy.sub} />

        <div className="rounded-3xl glass-surface p-2 sm:p-3 inline-block w-full">
          <Tabs tabs={copy.types} value={tab} onChange={setTab} label={copy.eyebrow} idPrefix="projects" scroll />
        </div>

        <div
          id="projects-panel"
          role="tabpanel"
          aria-labelledby={`projects-tab-${tab}`}
          key={tab}
          className="mt-8 rounded-3xl glass-panel p-6 sm:p-10 shadow-lift border border-white/80 grid animate-rise items-center gap-10 [animation-duration:0.55s] lg:grid-cols-12 lg:gap-14"
        >
          <div className="relative mx-auto w-full max-w-xl lg:col-span-6 lg:max-w-none">
            <div className="aspect-[5/4] overflow-hidden rounded-3xl bg-mint shadow-lift ring-8 ring-white/60">
              <Img photo={photos[main]} width={1200} sizes="(min-width: 1024px) 50vw, 92vw" />
            </div>
            <div className="absolute -bottom-6 -right-2 aspect-square w-[36%] overflow-hidden rounded-2xl bg-mint shadow-lift ring-6 ring-white sm:-right-6">
              <Img photo={photos[second]} width={600} sizes="(min-width: 1024px) 16vw, 32vw" />
            </div>
          </div>

          <div className="lg:col-span-6">
            <span className="inline-block rounded-full glass-pill px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald mb-2">
              CASE STUDY SPOTLIGHT
            </span>
            <h3 className="text-2xl sm:text-[2rem] font-bold text-forest">{current.title}</h3>
            <p className="mt-3 text-base leading-body text-charcoal/85 sm:text-[1.05rem]">{current.desc}</p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl glass-card p-4">
                <p className="font-display text-sm font-bold text-forest">{copy.scopeLabel}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {current.scope.map((item) => (
                    <li key={item} className="rounded-full glass-pill px-3 py-1 text-xs font-medium text-forest">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl glass-card p-4">
                <p className="font-display text-sm font-bold text-forest">{copy.handledLabel}</p>
                <ul className="mt-3 grid gap-2">
                  {current.handled.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-xs font-medium leading-snug text-charcoal/90">
                      <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full glass-emerald text-white">
                        <Check className="size-2.5" strokeWidth={3} aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href={getWhatsAppLink(current.title, null, lang)} icon={MessageCircle} variant="primary">
                {copy.cta}
              </Button>
              {site.illustrativePhotos && (
                <p className="inline-flex max-w-xs items-start gap-2 text-[0.82rem] leading-snug text-charcoal/65">
                  <ImageIcon className="mt-0.5 size-4 shrink-0 text-emerald" aria-hidden="true" />
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
