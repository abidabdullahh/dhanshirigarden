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
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-mint border border-white/60 shadow-inner">
        <Img photo={photos[meta.photo]} width={1000} sizes="(min-width: 1024px) 45vw, 92vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <span className="font-mono text-[0.68rem] tracking-widest uppercase text-bright">
            ENGINEERING SPECIFICATION
          </span>
          <h4 className="font-display text-xl font-bold text-white">{item.title}</h4>
        </div>
      </div>

      <p className="mt-4 text-base leading-relaxed text-charcoal/85">{item.desc}</p>
      
      <ul className="mt-4 grid gap-2.5">
        {item.points.map((point) => (
          <li key={point} className="flex items-start gap-3 text-sm leading-snug text-charcoal/90">
            <span className="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full glass-emerald text-white shadow-xs">
              <Check className="size-3" strokeWidth={3} aria-hidden="true" />
            </span>
            <span className="font-medium">{point}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-forest/10 pt-4 flex items-center justify-between">
        <Button href={getWhatsAppLink(item.title, null, lang)} icon={MessageCircle} size="md" variant="primary">
          {t.actions.whatsapp}
        </Button>
        <span className="text-xs font-mono text-forest/70">DAE STANDARD PROTOCOL</span>
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
    <Section id="services" className="relative overflow-hidden">
      {/* Background Glass Lighting */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-40 -z-10 size-96 rounded-full bg-bright/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-20 -z-10 size-96 rounded-full bg-bloom/20 blur-3xl" />

      <Container>
        <SectionHeading
          eyebrow={t.services.eyebrow}
          icon={Sprout}
          title={t.services.title}
          sub={t.services.sub}
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Services List Selector */}
          <ul className="grid content-start gap-3 lg:col-span-5" aria-label={t.services.listLabel}>
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
                    className={`group flex w-full items-center justify-between rounded-2xl p-4 text-left transition-all duration-300 ${
                      isActive
                        ? 'glass-emerald shadow-lift scale-[1.02]'
                        : 'glass-card hover:bg-white hover:border-emerald-300 hover:shadow-soft'
                    }`}
                  >
                    <span className="flex items-center gap-3.5">
                      <span
                        className={`grid size-11 shrink-0 place-items-center rounded-xl transition-colors ${
                          isActive ? 'bg-white/20 text-white' : 'glass-pill text-emerald'
                        }`}
                      >
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span>
                        <strong className={`block font-display text-base font-bold leading-tight ${isActive ? 'text-white' : 'text-forest'}`}>
                          {item.title}
                        </strong>
                        <span className={`block text-xs mt-0.5 line-clamp-1 ${isActive ? 'text-white/80' : 'text-charcoal/70'}`}>
                          {item.desc}
                        </span>
                      </span>
                    </span>
                    <ChevronRight className={`size-4.5 transition-transform duration-200 ${isActive ? 'text-white translate-x-1' : 'text-forest/40 group-hover:translate-x-1'}`} />
                  </button>

                  {/* Mobile expansion */}
                  {isActive && (
                    <div className="mt-3 rounded-2xl glass-panel p-5 shadow-soft lg:hidden">
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
              maxTilt={4}
              glare={true}
              className="sticky top-28 rounded-3xl glass-panel p-7 shadow-lift border border-white/80"
            >
              <ServiceDetail key={active} serviceKey={active} />
            </InteractiveCard3D>
          </div>
        </div>
      </Container>
    </Section>
  )
}
