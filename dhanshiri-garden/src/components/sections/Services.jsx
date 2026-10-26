import { useEffect, useState } from 'react'
import {
  Building2,
  Check,
  ChevronDown,
  Droplets,
  Hammer,
  Layers,
  Lightbulb,
  Map,
  MessageCircle,
  Package,
  PencilRuler,
  Sprout,
  TreeDeciduous,
  TreePalm,
  Warehouse,
  Building,
} from 'lucide-react'
import { photos } from '../../data/images'
import { serviceKeys, specializedKeys } from '../../data/content'
import { useLocale } from '../../lib/locale'
import { getWhatsAppLink } from '../../lib/whatsapp'
import Button from '../ui/Button'
import { MowerDoodle } from '../ui/Doodles'
import Img from '../ui/Img'
import { Container, Section, SectionHeading } from '../ui/Section'

const serviceMeta = {
  landscapeDesign: { icon: PencilRuler, photo: 'gardenPath' },
  verticalGarden: { icon: Layers, photo: 'greenWall' },
  rooftopPlanter: { icon: Building2, photo: 'rooftopTerrace' },
  lawnCarpeting: { icon: MowerDoodle, photo: 'mowerClose' },
  resortPlantation: { icon: TreePalm, photo: 'tropicalGazebo' },
  dripIrrigation: { icon: Droplets, photo: 'wateringGarden' },
  polyHouse: { icon: Warehouse, photo: 'greenhouseRows' },
}

const specializedIcons = {
  masterPlanning: Map,
  urbanDesign: Building,
  hardscaping: Hammer,
  treePlantation: TreeDeciduous,
  architecturalLighting: Lightbulb,
  seedDistribution: Package,
}

function ServiceDetail({ serviceKey }) {
  const { t, lang } = useLocale()
  const item = t.services.items[serviceKey]
  const meta = serviceMeta[serviceKey]
  return (
    <div className="animate-rise [animation-duration:0.5s]">
      <div className="relative aspect-[16/10] overflow-hidden bg-mint leaf-a">
        <Img photo={photos[meta.photo]} width={1000} sizes="(min-width: 1024px) 45vw, 92vw" />
      </div>
      <h3 className="mt-6 text-2xl sm:text-[1.7rem]">{item.title}</h3>
      <p className="mt-3 text-base leading-body text-charcoal/80">{item.desc}</p>
      <ul className="mt-5 grid gap-2.5">
        {item.points.map((point) => (
          <li key={point} className="flex items-start gap-3 text-[0.97rem] leading-snug text-charcoal/85">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-bright/30 text-emerald">
              <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
            </span>
            {point}
          </li>
        ))}
      </ul>
      <div className="mt-7">
        <Button href={getWhatsAppLink(item.title, null, lang)} icon={MessageCircle}>
          {t.actions.whatsapp}
        </Button>
      </div>
    </div>
  )
}

export default function Services() {
  const { t } = useLocale()
  const [active, setActive] = useState(serviceKeys[0])

  useEffect(() => {
    const onSelect = (event) => {
      if (serviceKeys.includes(event.detail)) setActive(event.detail)
    }
    window.addEventListener('dg:service', onSelect)
    return () => window.removeEventListener('dg:service', onSelect)
  }, [])

  const spec = t.services.specialized

  return (
    <Section id="services">
      <div aria-hidden="true" className="absolute -left-32 top-24 -z-10 size-96 rounded-full bg-bright/20 blur-3xl" />
      <Container>
        <SectionHeading eyebrow={t.services.eyebrow} icon={Sprout} title={t.services.title} sub={t.services.sub} />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <ul className="grid content-start gap-2 lg:col-span-5" aria-label={t.services.listLabel}>
            {serviceKeys.map((key) => {
              const Icon = serviceMeta[key].icon
              const isActive = key === active
              return (
                <li key={key}>
                  <button
                    type="button"
                    aria-expanded={isActive}
                    onClick={() => setActive(key)}
                    className={`group flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left transition duration-200 ${
                      isActive ? 'bg-forest text-white shadow-lift' : 'hover:bg-white/80 hover:shadow-soft'
                    }`}
                  >
                    <span
                      className={`grid size-11 shrink-0 place-items-center rounded-xl transition-colors ${
                        isActive ? 'bg-bright text-forest' : 'bg-mint text-emerald group-hover:bg-bright/30'
                      }`}
                    >
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1 font-display text-[1.08rem] font-semibold leading-snug">
                      {t.services.items[key].title}
                    </span>
                    <ChevronDown
                      className={`size-5 shrink-0 transition-transform duration-300 lg:-rotate-90 ${
                        isActive ? 'rotate-180 text-bright lg:-rotate-90' : 'text-emerald/60'
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {isActive && (
                    <div className="mt-3 rounded-[1.75rem] glass-white p-4 shadow-soft lg:hidden">
                      <ServiceDetail serviceKey={key} />
                    </div>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="hidden lg:col-span-7 lg:block">
            <div className="sticky top-28 rounded-[2.25rem] glass-white p-7 shadow-lift">
              <ServiceDetail key={active} serviceKey={active} />
            </div>
          </div>
        </div>

        <div className="relative mt-20 overflow-hidden rounded-[2.25rem] glass-green p-6 sm:p-10 lg:mt-28">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint-grid opacity-70" />
          <div className="relative grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <h3 className="text-2xl sm:text-[1.8rem]">{spec.title}</h3>
              <p className="mt-3 text-base leading-body text-charcoal/75">{spec.sub}</p>
            </div>
            <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
              {specializedKeys.map((key) => {
                const Icon = specializedIcons[key]
                const item = spec.items[key]
                return (
                  <li key={key} className="flex items-start gap-4 border-b border-dashed border-forest/20 py-4 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0">
                    <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl bg-white/80 text-emerald shadow-soft">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-display text-[1.05rem] font-semibold text-forest">{item.title}</span>
                      <span className="mt-0.5 block text-[0.93rem] leading-snug text-charcoal/70">{item.desc}</span>
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  )
}
