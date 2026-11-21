import { useState, useMemo } from 'react'
import {
  ArrowUpRight,
  Check,
  Plus,
  Search,
  ShoppingBag,
  X,
} from 'lucide-react'
import { STORE_PRODUCTS } from '../../data/storeProducts'
import { useCart } from '../../lib/CartContext'
import { useLocale } from '../../lib/locale'
import { getWhatsAppLink } from '../../lib/whatsapp'
import { Container } from '../ui/Section'

export default function DynamicNursery() {
  const { lang, n } = useLocale()
  const isBn = lang === 'bn'
  const { addToCart, setIsCartOpen } = useCart()

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [addedId, setAddedId] = useState(null)

  // Filter categories down to key architectural landscape groups
  const visibleCategories = [
    { id: 'all', label: { bn: 'সকল চারা', en: 'All Specimens' } },
    { id: 'fruits', label: { bn: 'কলম ফলদ বৃক্ষ', en: 'Specimen Fruit Trees' } },
    { id: 'indoor', label: { bn: 'ইনডোর ও বায়োফিলিক', en: 'Indoor Biophilia' } },
    { id: 'turf', label: { bn: 'কার্পেট ঘাসের সোড', en: 'Velvet Turf Sods' } },
    { id: 'floral', label: { bn: 'সুগন্ধি ফুল ও লতা', en: 'Fragrant Florals' } },
    { id: 'rooftop', label: { bn: 'ছাদবাগান স্পেশাল', en: 'Rooftop Hardy' } },
  ]

  // Filtered specimen list (take top 8 for clean high-performance Swiss presentation)
  const filteredSpecimens = useMemo(() => {
    let list = STORE_PRODUCTS

    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.en.toLowerCase().includes(q) ||
          p.name.bn.toLowerCase().includes(q) ||
          p.scientificName.toLowerCase().includes(q)
      )
    }

    return list.slice(0, 8)
  }, [selectedCategory, searchQuery])

  const handleAdd = (product) => {
    const defaultSize = product.sizes && product.sizes[0] ? product.sizes[0] : { id: 'standard', name: 'Standard Bag', price: product.basePrice }
    addToCart(product, defaultSize, 1)
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 1800)
  }

  return (
    <section id="nursery" className="relative isolate py-28 sm:py-36 lg:py-48 bg-white border-b border-black/[0.06]">
      <Container>
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-black/[0.06] pb-6 mb-16 sm:mb-24">
          <div className="flex items-center gap-3">
            <span className="size-1.5 rounded-full bg-emerald" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-charcoal/60">
              {isBn ? 'বোটানিক্যাল নার্সারি' : 'SPECIMEN BOTANICAL NURSERY'}
            </span>
          </div>
          <span className="font-mono text-xs text-charcoal/40">
            [715+ ACCLIMATIZED VARIETIES]
          </span>
        </div>

        {/* Section Title & Dynamic Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl sm:text-5xl font-light tracking-[-0.03em] text-forest leading-[1.1]">
              {isBn ? (
                <>
                  সাইটের জন্য প্রস্তুত <br />
                  <span className="text-emerald font-normal">অ্যাক্লিমেটাইজড বোটানিক্যাল চারা।</span>
                </>
              ) : (
                <>
                  Project-ready botanical stock. <br />
                  <span className="text-emerald font-normal">Acclimatized specimen nursery.</span>
                </>
              )}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-charcoal/70 font-light leading-relaxed">
              {isBn
                ? 'নওগাঁর নিজস্ব এগ্রি-রিসার্চ ফার্ম ও ঢাকার নার্সারি হাব থেকে সরাসরি ডেলিভারি—৮", ১০" ও ১/২ ব্যাগ সাইজ প্রস্তুত।'
                : 'Direct supply chain from our Naogaon agricultural research fields and Dhaka nursery dispatch hubs.'}
            </p>
          </div>

          {/* Instant Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-charcoal/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isBn ? 'গাছের নাম বা জাত খুঁজুন...' : 'Search specimen name...'}
              className="w-full rounded-full border border-black/10 bg-neutral-50 pl-10 pr-9 py-2.5 text-xs text-forest placeholder:text-charcoal/40 focus:bg-white focus:border-forest focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-6 mb-12 border-b border-black/[0.06] overflow-x-auto scrollbar-none">
          {visibleCategories.map((cat) => {
            const isActive = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-5 py-2 text-xs font-medium transition-all tracking-wide whitespace-nowrap ${
                  isActive
                    ? 'bg-forest text-white'
                    : 'text-charcoal/60 hover:text-forest hover:bg-black/[0.04]'
                }`}
              >
                <span>{cat.label[lang]}</span>
              </button>
            )
          })}
        </div>

        {/* Dynamic Apple-Style Specimen Grid (4-Column Minimal Product Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {filteredSpecimens.map((specimen) => {
            const isAdded = addedId === specimen.id
            return (
              <div
                key={specimen.id}
                className="group flex flex-col justify-between rounded-2xl bg-neutral-50/70 border border-black/[0.06] p-5 transition-all duration-300 hover:bg-white hover:shadow-sm"
              >
                <div>
                  {/* Specimen Photograph */}
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white mb-5 border border-black/[0.04]">
                    <img
                      src={specimen.photo}
                      alt={specimen.name[lang] || specimen.name.en}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="rounded-full bg-white/90 backdrop-blur-md px-2 py-0.5 font-mono text-[0.62rem] uppercase text-charcoal/70 border border-black/[0.06]">
                        {specimen.category}
                      </span>
                    </div>
                  </div>

                  {/* Scientific & Common Names */}
                  <div className="space-y-1">
                    <span className="font-serif italic text-xs text-charcoal/50 block line-clamp-1">
                      {specimen.scientificName}
                    </span>
                    <strong className="font-display text-base font-medium text-forest block leading-snug line-clamp-1">
                      {specimen.name[lang] || specimen.name.en}
                    </strong>
                    <span className="font-mono text-[0.68rem] text-charcoal/60 block">
                      {specimen.sizes && specimen.sizes[0] ? specimen.sizes[0].name : '8" Standard'}
                    </span>
                  </div>
                </div>

                {/* Price & Action Row */}
                <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between">
                  <div className="font-display text-base font-medium text-forest">
                    {isBn ? `৳ ${n(specimen.basePrice)}` : `BDT ${specimen.basePrice}`}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleAdd(specimen)}
                      className={`size-8 rounded-full grid place-items-center transition-all ${
                        isAdded
                          ? 'bg-emerald text-white'
                          : 'bg-forest/10 text-forest hover:bg-forest hover:text-white'
                      }`}
                      aria-label="Add to project bag"
                    >
                      {isAdded ? <Check className="size-3.5" /> : <Plus className="size-3.5" />}
                    </button>

                    <a
                      href={getWhatsAppLink(
                        `Specimen Inquiry: ${specimen.name[lang] || specimen.name.en} (${specimen.scientificName})`,
                        null,
                        lang
                      )}
                      className="size-8 rounded-full bg-forest/5 text-forest hover:bg-forest hover:text-white grid place-items-center transition-all"
                      aria-label="Inquire via WhatsApp"
                    >
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Explore Full 715+ Catalog Action */}
        <div className="mt-16 sm:mt-20 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/store"
            className="inline-flex items-center gap-2 rounded-full bg-forest px-8 py-3.5 text-xs font-medium text-white hover:bg-forest/90 transition-all tracking-wide"
          >
            <ShoppingBag className="size-4" />
            <span>{isBn ? 'সম্পূর্ণ ৭০০+ বোটানিক্যাল নার্সারি দেখুন' : 'Explore All 715+ Botanical Specimens'}</span>
          </a>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3.5 text-xs font-medium text-forest hover:bg-black/[0.04] transition-all tracking-wide"
          >
            <span>{isBn ? 'নির্বাচিত প্রজেক্ট ব্যাগ দেখুন' : 'View Project Bag'}</span>
          </button>
        </div>
      </Container>
    </section>
  )
}
