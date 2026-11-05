import { useState, useMemo } from 'react'
import {
  Check,
  ImageIcon,
  LayoutGrid,
  MapPin,
  MessageCircle,
  Sparkles,
} from 'lucide-react'
import { useLocale } from '../../lib/locale'
import { getWhatsAppLink } from '../../lib/whatsapp'
import { PROJECT_TYPES, PROJECTS_DATA } from '../../data/projectsData'
import Button from '../ui/Button'
import { Container, Section, SectionHeading } from '../ui/Section'

export default function Projects() {
  const { lang } = useLocale()
  const isBn = lang === 'bn'
  const [selectedType, setSelectedType] = useState('all')

  const filteredProjects = useMemo(() => {
    if (selectedType === 'all') return PROJECTS_DATA
    return PROJECTS_DATA.filter((p) => p.type === selectedType)
  }, [selectedType])

  return (
    <Section id="projects" className="relative isolate overflow-hidden py-24 sm:py-32">
      {/* Diffuse botanical ambient light behind section */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-36 top-32 -z-10 size-96 rounded-full bg-bright/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-36 bottom-32 -z-10 size-96 rounded-full bg-emerald/15 blur-3xl" />

      <Container>
        <SectionHeading
          eyebrow={isBn ? 'বাস্তবায়িত প্রকল্পের দলিল' : 'Executed Portfolio'}
          icon={LayoutGrid}
          title={isBn ? 'স্বাক্ষরিত ল্যান্ডস্কেপ ও ছাদবাগান প্রকল্প' : 'Signature Living Landscapes & Case Studies'}
          sub={
            isBn
              ? 'আবাসিক ছাদবাগান, কর্পোরেট পার্ক, ভেলভেট লন, ভার্টিক্যাল গ্রিন ওয়াল, কার্টেন ক্রিপার ও বাঁশের প্রাচীরের সফল বাস্তবায়ন।'
              : 'Proven engineering transformations spanning residential terraces, corporate biophilia, lush lawns, and living screens.'
          }
        />

        {/* 9 Category Filter Tabs (Clean Scrollable Bar) */}
        <div className="rounded-3xl glass-surface p-2.5 sm:p-3 inline-block w-full mb-12 shadow-xs border border-white/60">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {PROJECT_TYPES.map((type) => {
              const isActive = selectedType === type.id
              const count =
                type.id === 'all'
                  ? PROJECTS_DATA.length
                  : PROJECTS_DATA.filter((p) => p.type === type.id).length

              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedType(type.id)}
                  className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-all shadow-xs ${
                    isActive
                      ? 'bg-forest text-white shadow-lift scale-[1.02]'
                      : 'bg-white/80 text-forest hover:bg-forest/10 border border-forest/10'
                  }`}
                >
                  <span>{type.label[lang] || type.label.en}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[0.65rem] font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-forest/10 text-forest'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Project Showcase Cards List with generous whitespace */}
        <div className="space-y-16">
          {filteredProjects.map((project, idx) => {
            const isReversed = idx % 2 === 1
            return (
              <div
                key={project.id}
                className={`rounded-3xl glass-panel p-6 sm:p-12 shadow-lift border border-white/85 grid items-center gap-10 lg:grid-cols-12 lg:gap-16 transition-all duration-300 hover:border-emerald/40 ${
                  isReversed ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Images Column */}
                <div
                  className={`relative mx-auto w-full max-w-xl lg:col-span-6 lg:max-w-none ${
                    isReversed ? 'lg:col-start-7' : ''
                  }`}
                >
                  <div className="aspect-[16/10] overflow-hidden rounded-3xl bg-mint shadow-lift ring-8 ring-white/60">
                    <img
                      src={project.photoMain}
                      alt={project.title[lang] || project.title.en}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  {project.photoSecondary && (
                    <div className="absolute -bottom-6 -right-2 aspect-square w-[34%] overflow-hidden rounded-2xl bg-mint shadow-lift ring-6 ring-white sm:-right-4">
                      <img
                        src={project.photoSecondary}
                        alt="Project Detail"
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>

                {/* Content Column */}
                <div className={`lg:col-span-6 ${isReversed ? 'lg:col-start-1' : ''}`}>
                  {/* Badges */}
                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full glass-pill bg-emerald/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald">
                      <Sparkles className="size-3" />
                      <span>{PROJECT_TYPES.find((t) => t.id === project.type)?.label[lang] || project.type}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-forest/75 bg-forest/5 px-3 py-1 rounded-full">
                      <MapPin className="size-3 text-emerald" />
                      <span>{project.location[lang] || project.location.en}</span>
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-forest leading-tight">
                    {project.title[lang] || project.title.en}
                  </h3>

                  <p className="mt-4 text-base leading-relaxed text-charcoal/85">
                    {project.summary[lang] || project.summary.en}
                  </p>

                  {/* Project Specs */}
                  <div className="mt-5 grid grid-cols-2 gap-3 text-xs bg-white/50 rounded-2xl p-3 border border-forest/5">
                    <div>
                      <span className="text-charcoal/60 block">{isBn ? 'প্রজেক্ট এরিয়া:' : 'Project Area:'}</span>
                      <strong className="text-forest font-semibold mt-0.5 block">{project.area}</strong>
                    </div>
                    <div>
                      <span className="text-charcoal/60 block">{isBn ? 'বাস্তবায়ন সময়:' : 'Timeline:'}</span>
                      <strong className="text-forest font-semibold mt-0.5 block">{project.completionTime}</strong>
                    </div>
                  </div>

                  {/* Engineering Deliverables */}
                  <div className="mt-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-forest/70 block mb-2 font-mono">
                      {isBn ? 'মূল ইঞ্জিনিয়ারিং সেবা ও ডেলিভারেবলস:' : 'Key Engineering Deliverables:'}
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {(project.deliverables[lang] || project.deliverables.en).map((item, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-2 text-charcoal/90">
                          <span className="size-4 rounded-full bg-emerald/15 text-emerald flex items-center justify-center shrink-0">
                            <Check className="size-2.5" strokeWidth={3} />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Buttons */}
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Button
                      href={getWhatsAppLink(project.title[lang] || project.title.en, null, lang)}
                      icon={MessageCircle}
                      variant="primary"
                    >
                      {isBn ? 'এই টাইপের প্রজেক্ট আলোচনা' : 'Discuss Similar Project'}
                    </Button>
                    <span className="text-xs text-charcoal/60 flex items-center gap-1.5">
                      <ImageIcon className="size-3.5 text-emerald" />
                      <span>{isBn ? 'সাইট ভিজিট বুক করুন' : 'Site Consultation Available'}</span>
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
