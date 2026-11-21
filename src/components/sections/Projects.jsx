import { useState, useMemo } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useLocale } from '../../lib/locale'
import { getWhatsAppLink } from '../../lib/whatsapp'
import { PROJECT_TYPES, PROJECTS_DATA } from '../../data/projectsData'
import { Container } from '../ui/Section'

export default function Projects() {
  const { lang } = useLocale()
  const isBn = lang === 'bn'
  const [selectedType, setSelectedType] = useState('all')

  const filteredProjects = useMemo(() => {
    if (selectedType === 'all') return PROJECTS_DATA.slice(0, 6)
    return PROJECTS_DATA.filter((p) => p.type === selectedType).slice(0, 6)
  }, [selectedType])

  return (
    <section id="works" className="relative isolate py-28 sm:py-36 lg:py-48 bg-[#FCFCFA] border-b border-black/[0.06]">
      <Container>
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-black/[0.06] pb-6 mb-16 sm:mb-24">
          <div className="flex items-center gap-3">
            <span className="size-1.5 rounded-full bg-emerald" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-charcoal/60">
              {isBn ? 'নির্বাচিত কাজসমূহ' : 'SELECTED WORKS & CASE STUDIES'}
            </span>
          </div>
          <span className="font-mono text-xs text-charcoal/40">
            [ARCHITECTURAL PORTFOLIO]
          </span>
        </div>

        {/* Section Title & Description */}
        <div className="max-w-3xl mb-16">
          <h2 className="font-display text-3xl sm:text-5xl font-light tracking-[-0.03em] text-forest leading-[1.1]">
            {isBn ? (
              <>
                বাস্তবায়িত ল্যান্ডস্কেপ ও <br />
                <span className="text-emerald font-normal">স্বাক্ষরিত ছাদবাগান প্রকল্প।</span>
              </>
            ) : (
              <>
                Living proof. <br />
                <span className="text-emerald font-normal">Curated architectural commissions.</span>
              </>
            )}
          </h2>
          <p className="mt-6 text-base sm:text-lg text-charcoal/70 font-light leading-relaxed">
            {isBn
              ? 'গুলশান, বনানী ও ধানমন্ডির অভিজাত বাসস্থান থেকে শুরু করে কর্পোরেট টেরেস পার্ক পর্যন্ত সফল রূপান্তর।'
              : 'A curated selection of private residences, diplomatic villas, and corporate sky lounges across Dhaka.'}
          </p>
        </div>

        {/* Minimalist Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 pb-8 mb-12 border-b border-black/[0.06]">
          {PROJECT_TYPES.slice(0, 6).map((type) => {
            const isActive = selectedType === type.id
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => setSelectedType(type.id)}
                className={`rounded-full px-5 py-2 text-xs font-medium transition-all tracking-wide ${
                  isActive
                    ? 'bg-forest text-white'
                    : 'text-charcoal/60 hover:text-forest hover:bg-black/[0.04]'
                }`}
              >
                <span>{type.label[lang] || type.label.en}</span>
              </button>
            )
          })}
        </div>

        {/* Gallery-Grade Project Grid (2-Column Large Editorial Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 lg:gap-20">
          {filteredProjects.map((project, idx) => (
            <div key={project.id} className="group flex flex-col justify-between">
              <div>
                {/* Image Frame */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-neutral-200 border border-black/[0.06]">
                  <img
                    src={project.photoMain}
                    alt={project.title[lang] || project.title.en}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 font-mono text-[0.62rem] uppercase tracking-wider text-white">
                      0{idx + 1} · {project.location[lang] || project.location.en}
                    </span>
                  </div>
                </div>

                {/* Project Metadata */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs font-mono text-charcoal/50 mb-1">
                    <span>{project.area}</span>
                    <span>{project.completionTime}</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-normal text-forest tracking-tight group-hover:text-emerald transition-colors">
                    {project.title[lang] || project.title.en}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-charcoal/70 font-light leading-relaxed line-clamp-2">
                    {project.summary[lang] || project.summary.en}
                  </p>
                </div>
              </div>

              {/* Deliverable Tags & Inquiry */}
              <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between">
                <span className="text-[0.7rem] font-mono text-emerald tracking-wide">
                  100% LEAKPROOF · DAE AGRONOMY
                </span>
                <a
                  href={getWhatsAppLink(`Project Inquiry: ${project.title[lang] || project.title.en}`, null, lang)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-forest hover:text-emerald transition tracking-wide"
                >
                  <span>{isBn ? 'আলোচনা করুন' : 'Inquire'}</span>
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All Works CTA */}
        <div className="mt-20 text-center">
          <a
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-forest px-8 py-3.5 text-xs font-medium text-forest hover:bg-forest hover:text-white transition-all tracking-wide"
          >
            <span>{isBn ? 'সম্পূর্ণ পোর্টফোলিও দেখুন (৯টি ক্যাটাগরি)' : 'View Complete 9-Category Archive'}</span>
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </Container>
    </section>
  )
}
