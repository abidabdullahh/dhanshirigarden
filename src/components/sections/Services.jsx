import { useEffect, useState } from 'react'
import {
  Building2,
  Check,
  ChevronRight,
  Droplets,
  Layers,
  MessageCircle,
  PencilRuler,
  Sprout,
  TreePalm,
  Warehouse,
} from 'lucide-react'
import { photos } from '../../data/images'
import { serviceKeys } from '../../data/content'
import { useLocale } from '../../lib/locale'
import { getWhatsAppLink } from '../../lib/whatsapp'
import Button from '../ui/Button'
import { MowerDoodle } from '../ui/Doodles'
import Img from '../ui/Img'
import { Container, Section, SectionHeading } from '../ui/Section'
import InteractiveCard3D from '../dynamic/InteractiveCard3D'

const serviceMeta = {
  landscapeDesign: { icon: PencilRuler, photo: 'gardenPath' },
  verticalGarden: { icon: Layers, photo: 'greenWall' },
  rooftopPlanter: { icon: Building2, photo: 'rooftopTerrace' },
  lawnCarpeting: { icon: MowerDoodle, photo: 'mowerClose' },
  resortPlantation: { icon: TreePalm, photo: 'tropicalGazebo' },
  dripIrrigation: { icon: Droplets, photo: 'wateringGarden' },
  polyHouse: { icon: Warehouse, photo: 'greenhouseRows' },
}

function ServiceDetail({ serviceKey }) {
  const { t, lang } = useLocale()
  const item = t.services.items[serviceKey]
  const meta = serviceMeta[serviceKey]
  return (
    <div className="animate-rise [animation-duration:0.4s]">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-mint border border-forest/15">
        <Img photo={photos[meta.photo]} width={1000} sizes="(min-width: 1024px) 45vw, 92vw" />
      </div>
      <h3 className="mt-5 font-display text-2xl font-bold text-forest">{item.title}</h3>
      <p className="mt-2.5 text-base leading-relaxed text-charcoal/80">{item.desc}</p>
      <ul className="mt-4 grid gap-2">
        {item.points.map((point) => (
          <li key={point} className="flex items-start gap-3 text-sm leading-snug text-charcoal/85">
            <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-emerald/20 text-emerald">
              <Check className="size-3" strokeWidth={3} aria-hidden="true" />
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 border-t border-forest/10 pt-4">
        <Button href={getWhatsAppLink(item.title, null, lang)} icon={MessageCircle} size="md">
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

  return (
    <Section id="services" className="border-t border-forest/10">
      <Container>
        <SectionHeading
          eyebrow={t.services.eyebrow}
          icon={Sprout}
          title={t.services.title}
          sub={t.services.sub}
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Services List Selector */}
          <ul className="grid content-start gap-2.5 lg:col-span-5" aria-label={t.services.listLabel}>
            {serviceKeys.map((key) => {
              const item = t.services.items[key]
              const meta = serviceMeta[key]
              const Icon = meta.icon
              const isActive = active === key

              return (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => setActive(key)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`group flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all duration-200 ${
                      isActive
                        ? 'border-forest bg-forest text-white shadow-soft'
                        : 'border-forest/10 bg-white/70 text-forest hover:bg-forest/5'
                    }`}
                  >
                    <span className="flex items-center gap-3.5">
                      <span
                        className={`grid size-10 shrink-0 place-items-center rounded-lg ${
                          isActive ? 'bg-white/15 text-white' : 'bg-forest/5 text-emerald'
                        }`}
                      >
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span>
                        <strong className="block font-display text-base font-bold leading-tight">{item.title}</strong>
                        <span className={`block text-xs ${isActive ? 'text-white/75' : 'text-charcoal/65'}`}>
                          {item.desc}
                        </span>
                      </span>
                    </span>
                    <ChevronRight className={`size-4 transition-transform ${isActive ? 'text-bright' : 'text-forest/30 group-hover:translate-x-1'}`} />
                  </button>

                  {/* Mobile expansion */}
                  {isActive && (
                    <div className="mt-3 rounded-xl border border-forest/15 bg-white p-4 shadow-sm lg:hidden">
                      <ServiceDetail serviceKey={key} />
                    </div>
                  )}
                </li>
              )
            })}
          </ul>

          {/* Desktop Detail Card */}
          <div className="hidden lg:col-span-7 lg:block">
            <InteractiveCard3D
              maxTilt={3}
              glare={false}
              className="sticky top-28 rounded-2xl border border-forest/15 bg-white p-6 shadow-lift"
            >
              <ServiceDetail key={active} serviceKey={active} />
            </InteractiveCard3D>
          </div>
        </div>
      </Container>
    </Section>
  )
}
