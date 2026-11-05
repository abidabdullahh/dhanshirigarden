import { useState, useMemo } from 'react'
import {
  ArrowLeft,
  ChevronRight,
  Leaf,
  Plus,
  Minus,
  RotateCcw,
  Search,
  ShoppingBag,
  Sparkles,
  Check,
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingActions from '../components/layout/FloatingActions'
import CartDrawer from '../components/layout/CartDrawer'
import { Container } from '../components/ui/Section'
import { useCart } from '../lib/CartContext'
import { useLocale } from '../lib/locale'
import { useRouter } from '../lib/router'
import { STORE_CATEGORIES, STORE_PRODUCTS } from '../data/storeProducts'

export default function StorePage() {
  const { lang } = useLocale()
  const isBn = lang === 'bn'
  const { navigate } = useRouter()
  const { addToCart, setIsCartOpen } = useCart()

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSizeFilter, setSelectedSizeFilter] = useState('all')
  const [selectedSunFilter, setSelectedSunFilter] = useState('all')
  const [selectedWaterFilter, setSelectedWaterFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured') // 'featured' | 'price-asc' | 'price-desc'

  // Per-plant selected size and quantity state
  const [plantSelections, setPlantSelections] = useState({})

  const getSelection = (plantId, defaultSize) => {
    return (
      plantSelections[plantId] || {
        size: defaultSize,
        quantity: 1,
      }
    )
  }

  const handleSizeChange = (plantId, sizeObj) => {
    setPlantSelections((prev) => ({
      ...prev,
      [plantId]: {
        ...(prev[plantId] || { quantity: 1 }),
        size: sizeObj,
      },
    }))
  }

  const handleQuantityChange = (plantId, delta, defaultSize) => {
    setPlantSelections((prev) => {
      const current = prev[plantId] || { size: defaultSize, quantity: 1 }
      const newQty = Math.max(1, current.quantity + delta)
      return {
        ...prev,
        [plantId]: {
          ...current,
          quantity: newQty,
        },
      }
    })
  }

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return STORE_PRODUCTS.filter((plant) => {
      // Category Filter
      if (selectedCategory !== 'all' && plant.category !== selectedCategory) {
        return false
      }
      // Bag Size Filter
      if (
        selectedSizeFilter !== 'all' &&
        !plant.sizes.some((s) => s.id === selectedSizeFilter)
      ) {
        return false
      }
      // Sunlight Filter
      if (selectedSunFilter !== 'all' && plant.sunlight !== selectedSunFilter) {
        return false
      }
      // Water Filter
      if (selectedWaterFilter !== 'all' && plant.watering !== selectedWaterFilter) {
        return false
      }
      // Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchBn = (plant.name.bn || '').toLowerCase().includes(q)
        const matchEn = (plant.name.en || '').toLowerCase().includes(q)
        const matchSci = (plant.scientificName || '').toLowerCase().includes(q)
        const matchDesc = (plant.desc.bn || '').toLowerCase().includes(q)
        if (!matchBn && !matchEn && !matchSci && !matchDesc) return false
      }
      return true
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.basePrice - b.basePrice
      if (sortBy === 'price-desc') return b.basePrice - a.basePrice
      return 0
    })
  }, [
    selectedCategory,
    selectedSizeFilter,
    selectedSunFilter,
    selectedWaterFilter,
    searchQuery,
    sortBy,
  ])

  const handleAddToCart = (plant, defaultSize) => {
    const sel = getSelection(plant.id, defaultSize)
    addToCart(plant, sel.size, sel.quantity)
  }

  const handleBuyNow = (plant, defaultSize) => {
    const sel = getSelection(plant.id, defaultSize)
    addToCart(plant, sel.size, sel.quantity)
    setIsCartOpen(true)
  }

  const resetAllFilters = () => {
    setSelectedCategory('all')
    setSelectedSizeFilter('all')
    setSelectedSunFilter('all')
    setSelectedWaterFilter('all')
    setSearchQuery('')
    setSortBy('featured')
  }

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedSizeFilter !== 'all' ||
    selectedSunFilter !== 'all' ||
    selectedWaterFilter !== 'all' ||
    searchQuery.trim() !== ''

  return (
    <div className="min-h-screen bg-cream text-charcoal flex flex-col">
      <Navbar />
      <CartDrawer />

      <main className="flex-1 pt-24 pb-20">
        {/* Page Hero & Header */}
        <section className="relative isolate overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16">
          <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-0 -z-10 size-96 rounded-full bg-bright/20 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-20 -z-10 size-96 rounded-full bg-emerald/15 blur-3xl" />

          <Container>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-forest/70">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex items-center gap-1.5 hover:text-emerald transition"
              >
                <ArrowLeft className="size-3.5" />
                <span>{isBn ? 'হোম' : 'Home'}</span>
              </button>
              <ChevronRight className="size-3 text-forest/30" />
              <span className="text-emerald font-bold">{isBn ? 'প্ল্যান্ট স্টোর ও নার্সারি' : 'Plant Store'}</span>
            </nav>

            <div className="rounded-3xl glass-panel p-8 sm:p-12 shadow-lift border border-white/85">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full glass-pill px-4 py-1.5 text-xs font-bold text-forest uppercase tracking-wider mb-4">
                    <Leaf className="size-4 text-emerald" />
                    {isBn ? 'আমির আলী সার্টিফাইড নার্সারি ও প্ল্যান্ট ক্যাটালগ' : 'DAE Agronomist Certified Nursery Catalog'}
                  </span>
                  <h1 className="font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-extrabold text-forest leading-tight">
                    {isBn ? 'ধানসিঁড়ি প্ল্যান্ট স্টোর' : 'Dhanshiri Plant Store'}
                  </h1>
                  <p className="mt-3 max-w-2xl text-base sm:text-lg text-charcoal/80 leading-relaxed">
                    {isBn
                      ? 'বাংলাদেশের আবহাওয়ায় শতভাগ পরীক্ষিত ইনডোর, ফলদ, অর্নামেন্টাল, লন ঘাস ও সুগন্ধি ফুলের সংগ্রহ। আপনার পছন্দের ৮", ১০" বা হাফ-ড্রাম সাইজ নির্বাচন করে সহজেই ব্যাগে যোগ করুন।'
                      : 'Acclimatized indoor foliage, rooftop fruit trees, fragrant natives, and lawn turf available in 8", 10", and 1/2 Bag specifications.'}
                  </p>
                </div>

                {/* Assurance Badges */}
                <div className="grid grid-cols-2 gap-3 shrink-0">
                  <div className="rounded-2xl glass-card p-3.5 border border-forest/10 text-center">
                    <span className="font-mono text-xl font-bold text-emerald">৮", ১০", ১/২</span>
                    <span className="block text-[0.7rem] text-forest font-semibold mt-0.5">
                      {isBn ? 'স্ট্যান্ডার্ড পলিব্যাগ ও ড্রাম' : 'Standard Bag Sizes'}
                    </span>
                  </div>
                  <div className="rounded-2xl glass-card p-3.5 border border-forest/10 text-center">
                    <span className="font-mono text-xl font-bold text-emerald">PDF + WA</span>
                    <span className="block text-[0.7rem] text-forest font-semibold mt-0.5">
                      {isBn ? 'ইনস্ট্যান্ট কোটেশন স্লিপ' : 'Instant Order Quote'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Advanced Filters Deck */}
        <section className="mb-10">
          <Container>
            <div className="rounded-3xl glass-panel p-6 shadow-lift border border-white/85 space-y-6">
              {/* Category Pills Bar (Horizontal Scroll) */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-forest/75 mb-3 block">
                  {isBn ? 'উদ্ভিদের ক্যাটাগরি নির্বাচন করুন:' : 'Browse by Botanical Category:'}
                </label>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {STORE_CATEGORIES.map((cat) => {
                    const isActive = selectedCategory === cat.id
                    const count =
                      cat.id === 'all'
                        ? STORE_PRODUCTS.length
                        : STORE_PRODUCTS.filter((p) => p.category === cat.id).length
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold whitespace-nowrap transition-all shadow-xs ${
                          isActive
                            ? 'bg-forest text-white shadow-lift scale-[1.02]'
                            : 'bg-white/80 text-forest hover:bg-forest/10 border border-forest/10'
                        }`}
                      >
                        <span>{cat[lang] || cat.en}</span>
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

              {/* Multi-Faceted Secondary Filters Bar */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 pt-4 border-t border-forest/10 text-xs">
                {/* Search Input */}
                <div className="relative lg:col-span-2">
                  <Search className="absolute left-3.5 top-3 size-4 text-forest/40" />
                  <input
                    type="text"
                    placeholder={
                      isBn
                        ? 'বাংলা বা ইংরেজি নাম দিয়ে খুঁজুন (যেমন: মাল্টা, স্নেক প্ল্যান্ট)...'
                        : 'Search by plant name, scientific binomial...'
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-2xl border border-forest/15 bg-white pl-10 pr-4 py-2.5 text-xs text-forest focus:outline-emerald shadow-xs"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-2.5 text-forest/40 hover:text-forest"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Bag Size Dropdown */}
                <div>
                  <select
                    value={selectedSizeFilter}
                    onChange={(e) => setSelectedSizeFilter(e.target.value)}
                    className="w-full rounded-2xl border border-forest/15 bg-white px-3.5 py-2.5 text-xs font-semibold text-forest focus:outline-emerald shadow-xs cursor-pointer"
                  >
                    <option value="all">{isBn ? 'সব সাইজ (All Sizes)' : 'All Bag Sizes'}</option>
                    <option value="8-bag">{isBn ? '৮" ব্যাগ (8" Polybag)' : '8" Bag'}</option>
                    <option value="10-bag">{isBn ? '১০" ব্যাগ (10" Polybag)' : '10" Bag'}</option>
                    <option value="12-tub">{isBn ? '১২" টব (12" Tub)' : '12" Tub'}</option>
                    <option value="half-bag">{isBn ? '১/২ ব্যাগ / হাফ ড্রাম' : '1/2 Bag / Drum'}</option>
                  </select>
                </div>

                {/* Sunlight Dropdown */}
                <div>
                  <select
                    value={selectedSunFilter}
                    onChange={(e) => setSelectedSunFilter(e.target.value)}
                    className="w-full rounded-2xl border border-forest/15 bg-white px-3.5 py-2.5 text-xs font-semibold text-forest focus:outline-emerald shadow-xs cursor-pointer"
                  >
                    <option value="all">{isBn ? 'সূর্যালোকের প্রয়োজন' : 'All Sunlight Levels'}</option>
                    <option value="full">{isBn ? 'সরাসরি কড়া রোদ (Full Sun)' : 'Full Sunlight'}</option>
                    <option value="partial">{isBn ? 'আংশিক ছায়া (Partial Sun)' : 'Partial Sun'}</option>
                    <option value="indirect">{isBn ? 'উজ্জ্বল ইনডোর (Bright Indirect)' : 'Bright Indirect'}</option>
                    <option value="low">{isBn ? 'কম আলো (Low Light)' : 'Low Light'}</option>
                  </select>
                </div>

                {/* Sort Order */}
                <div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full rounded-2xl border border-forest/15 bg-white px-3.5 py-2.5 text-xs font-semibold text-forest focus:outline-emerald shadow-xs cursor-pointer"
                  >
                    <option value="featured">{isBn ? 'জনপ্রিয়তা অনুযায়ী' : 'Featured First'}</option>
                    <option value="price-asc">{isBn ? 'কম মূল্য থেকে বেশি' : 'Price: Low to High'}</option>
                    <option value="price-desc">{isBn ? 'বেশি মূল্য থেকে কম' : 'Price: High to Low'}</option>
                  </select>
                </div>
              </div>

              {/* Active Filter Tags & Reset */}
              {hasActiveFilters && (
                <div className="flex items-center justify-between pt-2 border-t border-forest/10 text-xs">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-charcoal/70">{isBn ? 'ফিল্টার সক্রিয়:' : 'Active filters:'}</span>
                    {selectedCategory !== 'all' && (
                      <span className="rounded-lg bg-forest/10 px-2 py-0.5 font-semibold text-forest">
                        {STORE_CATEGORIES.find((c) => c.id === selectedCategory)?.[lang] || selectedCategory}
                      </span>
                    )}
                    {selectedSizeFilter !== 'all' && (
                      <span className="rounded-lg bg-forest/10 px-2 py-0.5 font-semibold text-forest">
                        Size: {selectedSizeFilter}
                      </span>
                    )}
                    {selectedSunFilter !== 'all' && (
                      <span className="rounded-lg bg-forest/10 px-2 py-0.5 font-semibold text-forest">
                        Sun: {selectedSunFilter}
                      </span>
                    )}
                    {searchQuery && (
                      <span className="rounded-lg bg-forest/10 px-2 py-0.5 font-semibold text-forest">
                        &quot;{searchQuery}&quot;
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="inline-flex items-center gap-1 text-emerald font-bold hover:underline"
                  >
                    <RotateCcw className="size-3.5" />
                    <span>{isBn ? 'সব রিসেট করুন' : 'Reset All'}</span>
                  </button>
                </div>
              )}
            </div>
          </Container>
        </section>

        {/* Product Grid */}
        <section>
          <Container>
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs font-bold text-forest uppercase tracking-wider">
                {isBn
                  ? `মোট ${filteredProducts.length} টি গাছ প্রদর্শিত হচ্ছে`
                  : `Showing ${filteredProducts.length} verified plants`}
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="rounded-3xl glass-panel p-16 text-center border border-white/80 my-10 max-w-xl mx-auto">
                <Leaf className="size-12 text-forest/30 mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-forest">
                  {isBn ? 'কোনো উদ্ভিদ খুঁজে পাওয়া যায়নি' : 'No plants match your criteria'}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal/70 mt-2">
                  {isBn
                    ? 'আপনার সার্চ কুয়েরি বা ফিল্টারগুলো পরিবর্তন করে পুনরায় চেষ্টা করুন।'
                    : 'Try clearing some filters or searching for common terms like Mango, Guava, or Snake Plant.'}
                </p>
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="mt-6 rounded-xl bg-forest px-6 py-2.5 text-xs font-bold text-white hover:bg-emerald transition"
                >
                  {isBn ? 'সকল গাছ দেখুন' : 'Show All Plants'}
                </button>
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((plant) => {
                  const defaultSize = plant.sizes[0]
                  const selection = getSelection(plant.id, defaultSize)
                  const currentSize = selection.size
                  const currentQty = selection.quantity
                  const currentPrice = currentSize.price * currentQty

                  return (
                    <div
                      key={plant.id}
                      className="group flex flex-col justify-between rounded-3xl glass-panel p-5 shadow-lift border border-white/85 hover:border-emerald/40 transition-all duration-300"
                    >
                      {/* Top: Photo & Badges */}
                      <div>
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-cream shadow-inner">
                          <img
                            src={plant.photo}
                            alt={plant.name[lang] || plant.name.en}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                            {(plant.badges[lang] || plant.badges.en || []).map((b, i) => (
                              <span
                                key={i}
                                className="rounded-full bg-forest/80 backdrop-blur-md px-2.5 py-0.5 text-[0.65rem] font-bold text-white shadow-xs"
                              >
                                {b}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Title & Scientific Name */}
                        <div className="mt-4">
                          <h3 className="font-display text-lg font-bold text-forest leading-snug">
                            {plant.name[lang] || plant.name.en}
                          </h3>
                          <p className="text-xs text-charcoal/60 italic font-serif mt-0.5">
                            {plant.scientificName}
                          </p>
                          <p className="mt-2 text-xs text-charcoal/80 leading-relaxed line-clamp-2">
                            {plant.desc[lang] || plant.desc.en}
                          </p>
                        </div>

                        {/* Agronomy Care Tips */}
                        <div className="mt-3 rounded-xl bg-forest/5 p-2.5 text-[0.7rem] text-charcoal/85 border border-forest/5 flex items-start gap-2">
                          <Sparkles className="size-3.5 text-emerald shrink-0 mt-0.5" />
                          <p>
                            <strong className="text-forest">{isBn ? 'পরামর্শ:' : 'Care:'}</strong>{' '}
                            {plant.tip[lang] || plant.tip.en}
                          </p>
                        </div>

                        {/* Interactive Bag Size Selection */}
                        <div className="mt-4">
                          <label className="text-[0.68rem] font-bold uppercase tracking-wider text-forest/75 block mb-1.5">
                            {isBn ? 'সাইজ নির্বাচন করুন (Available Bag Size):' : 'Select Size:'}
                          </label>
                          <div className="grid grid-cols-2 gap-1.5">
                            {plant.sizes.map((s) => {
                              const isSelected = currentSize.id === s.id
                              return (
                                <button
                                  key={s.id}
                                  type="button"
                                  onClick={() => handleSizeChange(plant.id, s)}
                                  className={`rounded-xl px-2.5 py-1.5 text-left text-xs transition border ${
                                    isSelected
                                      ? 'border-emerald bg-emerald/10 font-bold text-forest shadow-xs'
                                      : 'border-forest/10 bg-white/70 font-medium text-charcoal/80 hover:bg-white'
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="truncate">{s.label || s.name}</span>
                                    {isSelected && <Check className="size-3 text-emerald shrink-0" />}
                                  </div>
                                  <span className="font-mono text-[0.7rem] font-bold text-forest block mt-0.5">
                                    ৳{s.price}
                                  </span>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Deck: Quantity & Action Buttons */}
                      <div className="mt-5 pt-4 border-t border-forest/10">
                        <div className="flex items-center justify-between mb-3">
                          {/* Quantity Counter */}
                          <div className="flex items-center gap-2 border border-forest/15 rounded-xl p-1 bg-white">
                            <button
                              type="button"
                              onClick={() => handleQuantityChange(plant.id, -1, defaultSize)}
                              className="size-6 rounded-lg flex items-center justify-center hover:bg-forest/10 text-forest transition"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="font-mono text-xs font-bold px-2 text-forest">
                              {currentQty}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleQuantityChange(plant.id, 1, defaultSize)}
                              className="size-6 rounded-lg flex items-center justify-center hover:bg-forest/10 text-forest transition"
                              aria-label="Increase quantity"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>

                          {/* Calculated Live Total Price */}
                          <div className="text-right">
                            <span className="text-[0.65rem] text-charcoal/60 block">
                              {isBn ? 'মোট দর' : 'Subtotal'}
                            </span>
                            <span className="font-mono text-base font-extrabold text-forest">
                              ৳{currentPrice.toLocaleString('en-US')}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons: Add to Cart & Buy Now */}
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => handleAddToCart(plant, defaultSize)}
                            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-forest/20 bg-white/90 py-2.5 px-3 text-xs font-bold text-forest hover:bg-forest/5 transition shadow-xs"
                          >
                            <ShoppingBag className="size-3.5 text-emerald" />
                            <span>{isBn ? 'ব্যাগে যোগ' : 'Add to Bag'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleBuyNow(plant, defaultSize)}
                            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-forest py-2.5 px-3 text-xs font-bold text-white hover:bg-emerald transition shadow-lift"
                          >
                            <span>{isBn ? 'অর্ডার করুন' : 'Buy Now'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </Container>
        </section>

        {/* Nursery & Bulk Ordering Banner */}
        <section className="mt-20">
          <Container>
            <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-white/85 shadow-lift text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full glass-pill px-4 py-1.5 text-xs font-bold text-emerald uppercase tracking-wider mb-3">
                <Sparkles className="size-3.5" />
                {isBn ? 'কর্পোরেট ও পাইকারি নার্সারি সরবরাহ' : 'Bulk Landscape & Nursery Orders'}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-forest">
                {isBn
                  ? 'আপনার নতুন প্রজেক্ট বা ছাদবাগানের জন্য পাইকারি চারা প্রয়োজন?'
                  : 'Planning a Large Commercial Estate or Farmhouse?'}
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-charcoal/80 leading-relaxed">
                {isBn
                  ? 'আমির আলীর তত্ত্বাবধানে আমাদের নওগাঁ ও ঢাকার নার্সারি থেকে দেশসেরা অ্যাক্লিমেটাইজড ফলদ, কার্পেট ঘাস ও অর্নামেন্টাল চারার নিরাপদ সাইট ডেলিভারি।'
                  : 'Direct estate procurement from our Naogaon research nursery and Dhaka logistics hub with specialized rootball packaging.'}
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/contact')}
                  className="rounded-xl bg-forest px-6 py-3 text-xs font-bold text-white hover:bg-emerald transition shadow-lift"
                >
                  {isBn ? 'বড় অর্ডারের জন্য যোগাযোগ করুন' : 'Contact for Bulk Orders'}
                </button>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
