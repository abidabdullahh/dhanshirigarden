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
    <section id="works" className="relative isolate py-20 sm:py-28 lg:py-36 bg-[#FCFCFA] border-b border-forest/10 overflow-hidden">
      {/* 3D Ambient Orbs */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-emerald/10 rounded-full blur-3xl pointer-events-none" />

      <Container>
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-forest/15 pb-5 mb-14 sm:mb-20">
          <div className="flex items-center gap-3">
            <span className="size-2 rounded-full bg-bright animate-ping" />
            <span className="font-sutonny font-bold text-sm tracking-wider uppercase text-forest">
              {isBn ? 'সম্পন্ন প্রকল্পসমূহ' : 'SELECTED WORKS & PORTFOLIO'}
            </span>
          </div>
          <span className="font-mono text-xs sm:text-sm font-bold text-forest glass-pill-3d px-3.5 py-1 rounded-full border border-forest/20 shadow-xs">
            [বাস্তবায়িত ল্যান্ডস্কেপ]
          </span>
        </div>

        {/* Section Title & Description */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <h2 className="font-sutonny text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-forest leading-[1.15]">
            {isBn ? (
              <>
                বাস্তবায়িত ল্যান্ডস্কেপ ও <br />
                <span className="text-emerald">সফল ছাদবাগান প্রকল্পসমূহ।</span>
              </>
            ) : (
              <>
                Living proof. <br />
                <span className="text-emerald">Curated architectural commissions.</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal/80 font-medium leading-relaxed">
            {isBn
              ? 'গুলশান, বনানী, ধানমন্ডি ও উত্তরা থেকে শুরু করে পূর্বাচলের প্রাইভেট ভিলা—১০০% লিকপ্রুফ ওয়াটারপ্রুফিং ও জীবন্ত উদ্ভিদে রূপান্তর।'
              : 'A curated selection of private residences, diplomatic villas, and corporate sky lounges across Dhaka.'}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2.5 pb-6 mb-12 border-b border-forest/10">
          {PROJECT_TYPES.slice(0, 6).map((type) => {
            const isActive = selectedType === type.id
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => setSelectedType(type.id)}
                className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all tracking-wide ${
                  isActive
                    ? 'bg-forest text-white shadow-md'
                    : 'glass-pill-3d text-charcoal hover:bg-white/80 border border-forest/15'
                }`}
              >
                <span>{type.label[lang] || type.label.en}</span>
              </button>
            )
          })}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {filteredProjects.map((project, idx) => (
            <div key={project.id} className="group flex flex-col justify-between rounded-3xl glass-panel-3d card-hover-3d p-5 sm:p-6 shadow-xl border border-white/80">
              <div>
                {/* Image Frame */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-forest/5 border border-forest/10">
                  <img
                    src={project.photoMain}
                    alt={project.title?.[lang] || project.title?.bn || project.title?.en || ''}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full glass-panel-dark-3d px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-white border border-white/20">
                      ০{idx + 1} · {project.location?.[lang] || project.location?.bn || project.location?.en || ''}
                    </span>
                  </div>
                </div>

                {/* Project Metadata */}
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-emerald mb-1.5">
                    <span>{project.area}</span>
                    <span>{project.year || 'COMPLETED'}</span>
                  </div>
                  <h3 className="font-sutonny text-xl sm:text-2xl font-bold tracking-tight text-forest group-hover:text-emerald transition">
                    {project.title?.[lang] || project.title?.bn || project.title?.en || ''}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-charcoal/80 font-medium leading-relaxed">
                    {project.summary?.[lang] || project.summary?.bn || project.summary?.en || project.excerpt?.[lang] || project.excerpt?.en || ''}
                  </p>
                </div>
              </div>

              {/* Card Footer: WhatsApp Direct Inquiry */}
              <div className="mt-6 pt-4 border-t border-forest/10 flex items-center justify-between">
                <a
                  href={getWhatsAppLink(
                    `আসসালামু আলাইকুম, আমি ধানসিঁড়ি গার্ডেনের "${project.title?.bn || project.title?.en || ''}" প্রজেক্টের অনুরূপ ল্যান্ডস্কেপিং করাতে চাই।`,
                    null,
                    lang,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-forest hover:text-emerald transition"
                >
                  <span>{isBn ? 'অনুরূপ প্রকল্প আলোচনা করুন' : 'Inquire Similar Project'}</span>
                  <ArrowUpRight className="size-4" />
                </a>

                <span className="text-xs font-mono font-bold text-forest/70">
                  ১০০% লিকপ্রুফ
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
