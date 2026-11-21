import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Building2,
  Calculator,
  Check,
  ChevronRight,
  Compass,
  Droplets,
  Layers,
  LayoutGrid,
  ListFilter,
  MessageCircle,
  PencilRuler,
  Sparkles,
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
  landscapeDesign: {
    icon: PencilRuler,
    photo: 'gardenPath',
    specTag: 'CAD & 3D MASTERPLANNING',
    badge: 'TURNKEY DESIGN',
    scope: { bn: 'ভিলা, ফার্মহাউস ও আবাসিক এস্টেট', en: 'Villas, Farmhouses & Residential Estates' },
    timeline: { bn: '১০–২১ দিন', en: '10–21 Days' },
  },
  hardscapeDesign: {
    icon: Layers,
    photo: 'palmSteps',
    specTag: 'NATURAL STONE & TIMBER',
    badge: 'SYLHET SANDSTONE',
    scope: { bn: 'ওয়াকওয়ে, পারগোলা ও সিটিং লাউঞ্জ', en: 'Paved Walkways, Pergolas & Seating' },
    timeline: { bn: '১৪–২৮ দিন', en: '14–28 Days' },
  },
  verticalGarden: {
    icon: Sparkles,
    photo: 'greenWall',
    specTag: 'BIOPHILIC LIVING WALL',
    badge: 'SELF-WATERING',
    scope: { bn: 'কর্পোরেট ফ্যাসাড, বারান্দা ও রিসেপশন', en: 'Corporate Facades, Balconies & Atriums' },
    timeline: { bn: '৭–১৪ দিন', en: '7–14 Days' },
  },
  rooftopPlanter: {
    icon: Building2,
    photo: 'rooftopTerrace',
    specTag: 'STRUCTURAL LIGHTWEIGHT MEDIA',
    badge: '100% LEAKPROOF',
    scope: { bn: 'আবাসিক ছাদ ও কমার্শিয়াল স্কাই লাউঞ্জ', en: 'Residential Terraces & Sky Lounges' },
    timeline: { bn: '১৪–২১ দিন', en: '14–21 Days' },
  },
  lawnCarpeting: {
    icon: MowerDoodle,
    photo: 'mowerClose',
    specTag: 'BERMUDA & KOREAN SOD',
    badge: 'GOLF-GRADE TURF',
    scope: { bn: 'ভিলা লন, খেলার মাঠ ও রিসোর্ট প্রাঙ্গণ', en: 'Villa Lawns, Sports Greens & Grounds' },
    timeline: { bn: '৫–১০ দিন', en: '5–10 Days' },
  },
  resortPlantation: {
    icon: TreePalm,
    photo: 'tropicalGazebo',
    specTag: 'TROPICAL ECOSYSTEM PLANNING',
    badge: 'RESORT MASTERPLAN',
    scope: { bn: 'রিসোর্ট, ইকো-পার্ক ও অবকাশ কেন্দ্র', en: 'Resorts, Eco-Parks & Retreats' },
    timeline: { bn: '২১–৪৫ দিন', en: '21–45 Days' },
  },
  dripIrrigation: {
    icon: Droplets,
    photo: 'wateringGarden',
    specTag: 'WEATHER-SYNCED AUTOMATION',
    badge: '65% WATER SAVER',
    scope: { bn: 'ছাদবাগান, লন ও বিস্তৃত গ্রাউন্ডস', en: 'Rooftops, Turf Lawns & Greenhouses' },
    timeline: { bn: '৩–৭ দিন', en: '3–7 Days' },
  },
  polyHouse: {
    icon: Warehouse,
    photo: 'greenhouseRows',
    specTag: 'CONTROLLED ENVIRONMENT AGRI',
    badge: 'COMMERCIAL TECH',
    scope: { bn: 'কমার্শিয়াল নার্সারি ও এক্সোটিক ফার্ম', en: 'Commercial Nurseries & Exotic Farms' },
    timeline: { bn: '১৫–৩০ দিন', en: '15–30 Days' },
  },
}

function ServiceDetail({ serviceKey }) {
  const { t, lang } = useLocale()
  const isBn = lang === 'bn'
  const item = t.services.items[serviceKey]
  const meta = serviceMeta[serviceKey]

  const scrollToEstimator = () => {
    const el = document.getElementById('estimator')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="animate-rise [animation-duration:0.35s]">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-mint border border-white/60 shadow-inner">
        <Img photo={photos[meta.photo]} width={1000} sizes="(min-width: 1024px) 45vw, 92vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/30 to-transparent" />

        {/* Badges on Image */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-forest/80 backdrop-blur-md px-3 py-1 text-[0.65rem] font-mono font-bold tracking-widest uppercase text-white shadow-soft">
            <span>{meta.specTag}</span>
          </span>
          <span className="rounded-full bg-white/90 backdrop-blur-md px-2.5 py-0.5 text-[0.65rem] font-mono font-bold text-forest shadow-soft">
            {meta.badge}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 text-white">
          <span className="font-mono text-[0.65rem] tracking-widest uppercase text-bright block">
            {isBn ? 'স্থাপত্য প্রকৌশল মান' : 'ARCHITECTURAL PROTOCOL'}
          </span>
          <h4 className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5">{item.title}</h4>
        </div>
      </div>

      {/* Scope and Timeline Pills */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-xl glass-pill px-3 py-1 text-xs font-semibold text-forest">
          <Compass className="size-3 text-emerald" />
          <span>{meta.scope[lang]}</span>
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-xl glass-pill px-3 py-1 text-xs font-semibold text-forest">
          <Building2 className="size-3 text-bright" />
          <span>{isBn ? 'সময়কাল:' : 'Duration:'} {meta.timeline[lang]}</span>
        </span>
      </div>

      <p className="mt-4 text-sm sm:text-base leading-relaxed text-charcoal/85">{item.desc}</p>

      {/* Engineering Deliverables */}
      <div className="mt-5 rounded-2xl glass-panel p-4 border border-forest/10">
        <span className="text-[0.68rem] font-mono font-bold uppercase tracking-wider text-emerald block mb-2.5">
          {isBn ? 'প্রধান প্রকৌশল ডেলিভারেবলসমূহ:' : 'CORE ENGINEERING DELIVERABLES:'}
        </span>
        <ul className="grid gap-2">
          {item.points.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-xs sm:text-sm text-charcoal/90">
              <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-emerald text-white shadow-xs">
                <Check className="size-2.5" strokeWidth={3} aria-hidden="true" />
              </span>
              <span className="font-medium">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Footer */}
      <div className="mt-6 border-t border-forest/10 pt-4 flex flex-wrap items-center justify-between gap-3">
        <Button
          href={getWhatsAppLink(`${item.title} (${isBn ? 'ল্যান্ডস্কেপ সেবা' : 'Landscape Service'})`, null, lang)}
          icon={MessageCircle}
          size="md"
          variant="primary"
          className="font-bold uppercase tracking-wider shadow-lift"
        >
          {isBn ? 'এই সেবার কোটেশন নিন' : 'Request Proposal on WhatsApp'}
        </Button>

        <button
          type="button"
          onClick={scrollToEstimator}
          className="inline-flex items-center gap-1.5 rounded-xl glass-pill px-3.5 py-2 text-xs font-bold text-forest hover:bg-white transition"
        >
          <Calculator className="size-3.5 text-emerald" />
          <span>{isBn ? 'খরচ হিসাব করুন' : 'Estimate Cost'}</span>
        </button>
      </div>
    </div>
  )
}

export default function Services() {
  const { t, lang } = useLocale()
  const isBn = lang === 'bn'
  const [active, setActive] = useState(serviceKeys[0])
  const [viewMode, setViewMode] = useState('dossier') // 'dossier' | 'grid'

  useEffect(() => {
    const onSelect = (event) => {
      if (serviceKeys.includes(event.detail)) setActive(event.detail)
    }
    window.addEventListener('dg:service', onSelect)
    return () => window.removeEventListener('dg:service', onSelect)
  }, [])

  return (
    <Section id="services" className="relative isolate overflow-hidden py-24 sm:py-32">
      {/* Background Ambient Lighting */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-40 -z-10 size-[32rem] rounded-full bg-bright/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-20 -z-10 size-[32rem] rounded-full bg-bloom/20 blur-3xl" />

      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            eyebrow={isBn ? 'বিশেষায়িত ল্যান্ডস্কেপিং শৃঙ্খলা' : 'Specialized Landscape Disciplines'}
            icon={Sprout}
            title={isBn ? 'বহিরাঙ্গন ও ছাদবাগানের ৮টি পেশাদার আর্কিটেকচারাল সেবা' : '8 Architectural Landscape & Exterior Living Disciplines'}
            sub={
              isBn
                ? 'অন-সাইট টপোগ্রাফি ও আলো-বাতাস বিশ্লেষণ থেকে শুরু করে মাস্টারপ্ল্যান ড্রয়িং, ড্রেইনেজ ও দীর্ঘমেয়াদী এগ্রোনমিক পরিচর্যা।'
                : 'From on-site topography and sunlight mapping to CAD drawings, structural drainage, and lifelong agronomic stewardship.'
            }
          />

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 rounded-2xl glass-surface p-1 shadow-xs border border-forest/10 shrink-0 self-start md:self-end">
            <button
              type="button"
              onClick={() => setViewMode('dossier')}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                viewMode === 'dossier'
                  ? 'bg-forest text-white shadow-soft'
                  : 'text-forest/70 hover:text-forest'
              }`}
            >
              <ListFilter className="size-3.5" />
              <span>{isBn ? 'ডোসিয়ার ভিউ' : 'Interactive Dossier'}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-forest text-white shadow-soft'
                  : 'text-forest/70 hover:text-forest'
              }`}
            >
              <LayoutGrid className="size-3.5" />
              <span>{isBn ? 'গ্রিড ভিউ' : 'All 8 Services Grid'}</span>
            </button>
          </div>
        </div>

        {viewMode === 'dossier' ? (
          /* DOSSIER SPLIT VIEW */
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
                        <div>
                          <strong className={`block font-display text-base font-bold leading-tight ${isActive ? 'text-white' : 'text-forest'}`}>
                            {item.title}
                          </strong>
                          <span className={`block text-xs mt-0.5 line-clamp-1 ${isActive ? 'text-white/80' : 'text-charcoal/70'}`}>
                            {meta.specTag}
                          </span>
                        </div>
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
        ) : (
          /* FULL 8-SERVICE ARCHITECTURAL GRID VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceKeys.map((key) => {
              const item = t.services.items[key]
              const meta = serviceMeta[key]
              const Icon = meta.icon

              return (
                <div
                  key={key}
                  className="rounded-3xl glass-panel p-5 shadow-lift border border-white/85 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald/40"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-mint mb-4">
                      <Img photo={photos[meta.photo]} width={500} />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent" />
                      <span className="absolute bottom-2 left-2 right-2 text-[0.62rem] font-mono font-bold uppercase tracking-wider text-bright truncate">
                        {meta.specTag}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="size-8 rounded-xl glass-pill grid place-items-center text-emerald shadow-xs">
                        <Icon className="size-4" />
                      </span>
                      <span className="text-[0.65rem] font-mono font-bold text-emerald uppercase">
                        {meta.badge}
                      </span>
                    </div>

                    <h3 className="font-display text-base font-bold text-forest leading-snug">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs text-charcoal/75 line-clamp-3 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-forest/10 flex items-center justify-between">
                    <Button
                      href={getWhatsAppLink(item.title, null, lang)}
                      size="sm"
                      variant="primary"
                      className="text-xs font-bold uppercase"
                    >
                      <span>{isBn ? 'কোটেশন' : 'Quote'}</span>
                      <ArrowRight className="size-3" />
                    </Button>

                    <button
                      type="button"
                      onClick={() => {
                        setActive(key)
                        setViewMode('dossier')
                      }}
                      className="text-xs text-forest/70 hover:text-emerald font-semibold transition"
                    >
                      {isBn ? 'বিস্তারিত' : 'Specs'} →
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Container>
    </Section>
  )
}
