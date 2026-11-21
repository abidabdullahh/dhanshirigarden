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
  const { addToCart } = useCart()

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [addedId, setAddedId] = useState(null)

  const visibleCategories = [
    { id: 'all', label: { bn: 'সকল উদ্ভিদ ও ঘাস', en: 'All Specimens' } },
    { id: 'fruits', label: { bn: 'কলম ফলদ চারা', en: 'Specimen Fruit Trees' } },
    { id: 'indoor', label: { bn: 'ইনডোর ও বায়োফিলিক', en: 'Indoor Biophilia' } },
    { id: 'turf', label: { bn: 'কার্পেট ঘাসের সোড', en: 'Velvet Turf Sods' } },
    { id: 'floral', label: { bn: 'সুগন্ধি ফুল ও লতা', en: 'Fragrant Florals' } },
    { id: 'rooftop', label: { bn: 'ছাদবাগান স্পেশাল', en: 'Rooftop Hardy' } },
  ]

  const filteredSpecimens = useMemo(() => {
    let list = STORE_PRODUCTS

    if (selectedCategory === 'turf') {
      list = list.filter(
        (p) =>
          p.category === 'turf' ||
          (p.name?.bn || '').includes('ঘাস') ||
          (p.name?.en || '').toLowerCase().includes('turf') ||
          (p.name?.en || '').toLowerCase().includes('grass')
      )
    } else if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (p) =>
          (p.name?.en || '').toLowerCase().includes(q) ||
          (p.name?.bn || '').toLowerCase().includes(q) ||
          (p.scientificName || '').toLowerCase().includes(q)
      )
    } else {
      // Prioritize our signature custom-photographed specimens at the top of each view
      const localFeatured = list.filter((p) => p.photo && p.photo.startsWith('/images/'))
      const others = list.filter((p) => !p.photo || !p.photo.startsWith('/images/'))
      list = [...localFeatured, ...others]
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
    <section id="nursery" className="relative isolate py-20 sm:py-28 lg:py-36 bg-white border-b border-stone-200">
      <Container>
        {/* Section Header */}
        <div className="flex items-center justify-between border-b-2 border-stone-200 pb-5 mb-14 sm:mb-20">
          <div className="flex items-center gap-3">
            <span className="size-2 rounded-full bg-[#2d6a4f]" />
            <span className="font-sutonny font-bold text-sm tracking-wider uppercase text-[#1b4332]">
              {isBn ? 'উদ্ভিদ ও ঘাস নার্সারি' : 'SPECIMEN BOTANICAL NURSERY'}
            </span>
          </div>
          <span className="font-mono text-xs sm:text-sm font-bold text-stone-700 bg-stone-100 px-3 py-1 rounded-full border border-stone-300">
            [৭১৫+ জাতের অ্যাক্লিমেটাইজড স্টক]
          </span>
        </div>

        {/* Section Title & Dynamic Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <h2 className="font-sutonny text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1b4332] leading-[1.15]">
              {isBn ? (
                <>
                  প্রকল্পের জন্য প্রস্তুত <br />
                  <span className="text-[#2d6a4f]">অ্যাক্লিমেটাইজড বোটানিক্যাল চারা।</span>
                </>
              ) : (
                <>
                  Project-ready botanical stock. <br />
                  <span className="text-[#2d6a4f]">Acclimatized specimen nursery.</span>
                </>
              )}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-stone-800 font-medium leading-relaxed">
              {isBn
                ? 'নওগাঁর নিজস্ব কৃষি গবেষণা খামার ও ঢাকার নার্সারি হাব থেকে সরাসরি ডেলিভারি—সুস্থ ফলদ গাছ, ঘাস কার্পেট ও ইনডোর প্ল্যান্টস।'
                : 'Direct supply chain from our Naogaon agricultural research fields and Dhaka nursery dispatch hubs.'}
            </p>
          </div>

          {/* Instant Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isBn ? 'গাছ বা ফলের জাত খুঁজুন...' : 'Search specimen name...'}
              className="w-full rounded-full border-2 border-stone-300 bg-stone-50 pl-10 pr-9 py-2.5 text-xs sm:text-sm font-medium text-stone-900 placeholder:text-stone-500 focus:bg-white focus:border-[#1b4332] focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-900"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-6 mb-10 border-b-2 border-stone-200 overflow-x-auto scrollbar-none">
          {visibleCategories.map((cat) => {
            const isActive = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all tracking-wide whitespace-nowrap ${
                  isActive
                    ? 'bg-[#1b4332] text-white shadow-xs'
                    : 'bg-white border border-stone-300 text-stone-800 hover:border-stone-500 hover:text-stone-900'
                }`}
              >
                <span>{cat.label[lang] || cat.label.en}</span>
              </button>
            )
          })}
        </div>

        {/* Specimen Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredSpecimens.map((specimen) => {
            const isAdded = addedId === specimen.id
            return (
              <div
                key={specimen.id}
                className="group flex flex-col justify-between rounded-3xl bg-white border-2 border-stone-300 p-5 transition-all duration-300 hover:border-[#2d6a4f] hover:shadow-md"
              >
                <div>
                  {/* Photograph */}
                  <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-stone-100 mb-4 border border-stone-200">
                    <img
                      src={specimen.photo}
                      alt={specimen.name[lang] || specimen.name.en}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="rounded-full bg-white/95 backdrop-blur-md px-2.5 py-0.5 font-mono text-[0.68rem] font-bold uppercase text-[#1b4332] border border-stone-200">
                        {specimen.category}
                      </span>
                    </div>
                  </div>

                  {/* Names */}
                  <div className="space-y-1">
                    <span className="font-serif italic text-xs text-stone-600 block line-clamp-1 font-medium">
                      {specimen.scientificName}
                    </span>
                    <strong className="font-sutonny text-lg font-bold text-[#1b4332] block leading-snug line-clamp-1">
                      {specimen.name?.[lang] || specimen.name?.bn || specimen.name?.en || ''}
                    </strong>
                    <span className="font-mono text-xs text-stone-600 block font-medium">
                      {specimen.sizes && specimen.sizes[0] ? specimen.sizes[0].name : '৮" স্ট্যান্ডার্ড ব্যাগ'}
                    </span>
                  </div>
                </div>

                {/* Price & Action Row */}
                <div className="mt-5 pt-4 border-t border-stone-200 flex items-center justify-between">
                  <div className="font-mono text-base font-bold text-[#1b4332]">
                    {isBn ? `৳ ${n(specimen.basePrice)}` : `BDT ${specimen.basePrice}`}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleAdd(specimen)}
                      className={`size-9 rounded-full grid place-items-center transition-all ${
                        isAdded
                          ? 'bg-[#2d6a4f] text-white shadow-xs'
                          : 'bg-emerald-50 border border-emerald-700/30 text-[#1b4332] hover:bg-[#1b4332] hover:text-white'
                      }`}
                      aria-label="অর্ডারে যোগ করুন"
                      title="অর্ডারে যোগ করুন"
                    >
                      {isAdded ? <Check className="size-4" /> : <Plus className="size-4" />}
                    </button>

                    <a
                      href={getWhatsAppLink(
                        `আসসালামু আলাইকুম, আমি ধানসিঁড়ি গার্ডেন থেকে "${specimen.name?.bn || specimen.name?.en || ''}" (${specimen.scientificName}) সংগ্রহ করতে চাই।`,
                        null,
                        lang
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="size-9 rounded-full bg-stone-100 border border-stone-300 text-stone-800 hover:bg-[#1b4332] hover:text-white grid place-items-center transition-all"
                      aria-label="হোয়াটসঅ্যাপে চারা ইনকোয়ারি"
                      title="হোয়াটসঅ্যাপে চারা ইনকোয়ারি"
                    >
                      <ArrowUpRight className="size-4" />
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Catalog Link */}
        <div className="mt-14 text-center">
          <a
            href="/store"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#1b4332] bg-white px-7 py-3.5 text-xs sm:text-sm font-bold text-[#1b4332] hover:bg-[#1b4332] hover:text-white transition shadow-2xs"
          >
            <ShoppingBag className="size-4" />
            <span>{isBn ? 'সম্পূর্ণ নার্সারি ক্যাটালগ দেখুন (৭১৫+ চারা) →' : 'Browse Full 715+ Specimen Catalog →'}</span>
          </a>
        </div>
      </Container>
    </section>
  )
}
