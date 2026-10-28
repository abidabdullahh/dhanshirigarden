import { useMemo, useState } from 'react'
import { BookOpen, Check, Droplets, MessageCircle, Plus, Search, Sun } from 'lucide-react'
import { plantsDatabase } from '../../data/plantsData'
import { useLocale } from '../../lib/locale'
import { getWhatsAppLink } from '../../lib/whatsapp'
import { Container, Section, SectionHeading } from '../ui/Section'
import InteractiveCard3D from './InteractiveCard3D'

const categoryKeys = ['all', 'fruit', 'flower', 'turf', 'indoor']

export default function PlantExplorer() {
  const { t, lang } = useLocale()
  const copy = t.plantExplorer
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(0) // 0 = all
  const [addedPlants, setAddedPlants] = useState(new Set(['thai-guava', 'korean-turf']))

  const filteredPlants = useMemo(() => {
    return plantsDatabase.filter((p) => {
      const catKey = categoryKeys[selectedCategory]
      const matchesCat = catKey === 'all' || p.category === catKey
      const query = search.trim().toLowerCase()
      if (!query) return matchesCat

      const nameBn = p.name.bn.toLowerCase()
      const nameEn = p.name.en.toLowerCase()
      const sci = p.scientific.toLowerCase()
      const matchesQuery = nameBn.includes(query) || nameEn.includes(query) || sci.includes(query)

      return matchesCat && matchesQuery
    })
  }, [selectedCategory, search])

  const toggleAddToStudio = (plantId) => {
    setAddedPlants((prev) => {
      const next = new Set(prev)
      if (next.has(plantId)) {
        next.delete(plantId)
      } else {
        next.add(plantId)
      }
      window.dispatchEvent(new CustomEvent('dg:plant-selected', { detail: { plantId, selected: next.has(plantId) } }))
      return next
    })
  }

  const getSunText = (key) => {
    if (key === 'full') return copy.fullSun
    if (key === 'partial') return copy.partialSun
    return copy.shade
  }

  const getWaterText = (key) => {
    if (key === 'daily') return copy.daily
    if (key === 'twoDays') return copy.twoDays
    return copy.lowWater
  }

  const getCareText = (key) => {
    if (key === 'easy') return copy.easy
    if (key === 'moderate') return copy.moderate
    return copy.high
  }

  return (
    <Section id="plant-explorer" className="relative overflow-hidden bg-gradient-to-b from-transparent via-mint/15 to-transparent">
      <Container>
        <SectionHeading
          eyebrow={copy.eyebrow}
          icon={BookOpen}
          title={copy.title}
          sub={copy.sub}
        />

        {/* Filter bar & Search */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          {/* Category tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {copy.categories.map((catName, idx) => {
              const isActive = selectedCategory === idx
              return (
                <button
                  key={catName}
                  type="button"
                  onClick={() => setSelectedCategory(idx)}
                  className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-forest text-white shadow-soft scale-105'
                      : 'glass-white text-forest/75 hover:bg-forest/10 hover:text-forest'
                  }`}
                >
                  {catName}
                </button>
              )
            })}
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-forest/50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={copy.searchPlaceholder}
              className="w-full rounded-full border border-forest/15 bg-white/80 py-2.5 pl-10 pr-4 text-sm text-charcoal shadow-inner backdrop-blur-md outline-none transition focus:border-emerald focus:bg-white focus:ring-2 focus:ring-emerald/20"
            />
          </div>
        </div>

        {/* Plant Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPlants.map((plant) => {
            const isAdded = addedPlants.has(plant.id)
            const plantName = plant.name[lang] || plant.name.en
            const plantDesc = plant.desc[lang] || plant.desc.en
            const plantHarvest = plant.harvest[lang] || plant.harvest.en

            const whatsappAsk = getWhatsAppLink(
              lang === 'bn'
                ? `আসসালামু আলাইকুম, আমি ধানসিঁড়ি গার্ডেন থেকে "${plant.name.bn}" গাছটি সম্পর্কে বিস্তারিত ও চারা সংগ্রহের তথ্য জানতে চাই।`
                : `Hello, I would like to inquire about sourcing "${plant.name.en}" from Dhanshiri Garden.`,
              null,
              lang
            )

            return (
              <InteractiveCard3D
                key={plant.id}
                maxTilt={6}
                className="flex flex-col rounded-[2rem] glass-card p-4 shadow-soft ring-1 ring-bright/25 transition-all duration-300 hover:shadow-lift"
              >
                {/* Photo container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-mint">
                  <img
                    src={plant.photo}
                    alt={plantName}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <span className="absolute bottom-2.5 left-2.5 rounded-full bg-forest/85 px-3 py-1 text-[0.72rem] font-bold text-white backdrop-blur-md">
                    {plantHarvest}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-4 flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="font-display text-lg font-bold text-forest">{plantName}</h3>
                    <p className="text-xs italic text-charcoal/60">{plant.scientific}</p>
                    <p className="mt-2 text-xs leading-relaxed text-charcoal/80 line-clamp-2">{plantDesc}</p>
                  </div>

                  {/* Botanical specs pills */}
                  <div className="mt-4 grid grid-cols-3 gap-1.5 border-t border-forest/10 pt-3 text-[0.7rem] text-charcoal/75">
                    <div className="flex flex-col items-center rounded-xl bg-forest/5 p-1.5 text-center">
                      <Sun className="size-3.5 text-amber-500 mb-0.5" />
                      <span>{getSunText(plant.sunlight)}</span>
                    </div>
                    <div className="flex flex-col items-center rounded-xl bg-forest/5 p-1.5 text-center">
                      <Droplets className="size-3.5 text-sky-500 mb-0.5" />
                      <span>{getWaterText(plant.water)}</span>
                    </div>
                    <div className="flex flex-col items-center rounded-xl bg-forest/5 p-1.5 text-center">
                      <Check className="size-3.5 text-emerald mb-0.5" />
                      <span>{getCareText(plant.care)}</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleAddToStudio(plant.id)}
                      className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-xs font-bold transition-all duration-300 ${
                        isAdded
                          ? 'bg-bright text-forest'
                          : 'bg-forest text-white hover:bg-emerald'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="size-3.5 stroke-[3]" />
                          <span>{copy.added}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="size-3.5" />
                          <span>{copy.addToStudio}</span>
                        </>
                      )}
                    </button>

                    <a
                      href={whatsappAsk}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Inquire on WhatsApp"
                      className="grid size-8 shrink-0 place-items-center rounded-full glass-green text-forest transition hover:bg-forest hover:text-white"
                    >
                      <MessageCircle className="size-4" />
                    </a>
                  </div>
                </div>
              </InteractiveCard3D>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
