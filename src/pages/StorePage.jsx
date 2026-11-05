import { useState, useMemo } from 'react'
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronRight,
  Droplets,
  Info,
  Leaf,
  Minus,
  Plus,
  RotateCcw,
  Search,
  ShoppingBag,
  Sun,
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingActions from '../components/layout/FloatingActions'
import CartDrawer from '../components/layout/CartDrawer'
import AuthModal from '../components/ui/AuthModal'
import { Container } from '../components/ui/Section'
import { useCart } from '../lib/CartContext'
import { useAuth } from '../lib/AuthContext'
import { useLocale } from '../lib/locale'
import { useRouter } from '../lib/router'
import { STORE_CATEGORIES, STORE_PRODUCTS } from '../data/storeProducts'

const ITEMS_PER_PAGE = 30

export default function StorePage() {
  const { lang } = useLocale()
  const isBn = lang === 'bn'
  const { navigate } = useRouter()
  const { addToCart, setIsCartOpen } = useCart()
  const { isAuthenticated } = useAuth()

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSizeFilter, setSelectedSizeFilter] = useState('all')
  const [selectedSunFilter, setSelectedSunFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured') // 'featured' | 'price-asc' | 'price-desc'

  // Pagination state
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)

  // Contextual Auth Modal state
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [pendingAction, setPendingAction] = useState(null)
  const [pendingItemName, setPendingItemName] = useState('')

  // Per-plant selection state
  const [plantSelections, setPlantSelections] = useState({})
  // Expandable care tip state
  const [expandedTips, setExpandedTips] = useState({})

  const toggleTip = (id) => {
    setExpandedTips((prev) => ({ ...prev, [id]: !prev[id] }))
  }

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
      if (selectedCategory !== 'all' && plant.category !== selectedCategory) {
        return false
      }
      if (
        selectedSizeFilter !== 'all' &&
        !plant.sizes.some((s) => s.id === selectedSizeFilter)
      ) {
        return false
      }
      if (selectedSunFilter !== 'all' && plant.sunlight !== selectedSunFilter) {
        return false
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchBn = (plant.name.bn || '').toLowerCase().includes(q)
        const matchEn = (plant.name.en || '').toLowerCase().includes(q)
        const matchSci = (plant.scientificName || '').toLowerCase().includes(q)
        if (!matchBn && !matchEn && !matchSci) return false
      }
      return true
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.basePrice - b.basePrice
      if (sortBy === 'price-desc') return b.basePrice - a.basePrice
      return 0
    })
  }, [selectedCategory, selectedSizeFilter, selectedSunFilter, searchQuery, sortBy])

  // Paginated subset
  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount)
  }, [filteredProducts, visibleCount])

  // Contextual Add to Cart with Google Login guard
  const executeAddToCart = (plant, defaultSize, openDrawer = false) => {
    const sel = getSelection(plant.id, defaultSize)
    addToCart(plant, sel.size, sel.quantity)
    if (openDrawer) setIsCartOpen(true)
  }

  const handleAddToCartClick = (plant, defaultSize, openDrawer = false) => {
    if (!isAuthenticated) {
      setPendingItemName(plant.name[lang] || plant.name.en)
      setPendingAction(() => () => executeAddToCart(plant, defaultSize, openDrawer))
      setAuthModalOpen(true)
    } else {
      executeAddToCart(plant, defaultSize, openDrawer)
    }
  }

  const resetAllFilters = () => {
    setSelectedCategory('all')
    setSelectedSizeFilter('all')
    setSelectedSunFilter('all')
    setSearchQuery('')
    setSortBy('featured')
    setVisibleCount(ITEMS_PER_PAGE)
  }

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedSizeFilter !== 'all' ||
    selectedSunFilter !== 'all' ||
    searchQuery.trim() !== ''

  return (
    <div className="min-h-screen bg-[#faf8f5] text-charcoal flex flex-col font-sans selection:bg-emerald selection:text-white">
      <Navbar />
      <CartDrawer />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        pendingItemName={pendingItemName}
        onSuccess={() => {
          if (pendingAction) pendingAction()
        }}
      />

      <main className="flex-1 pt-24 pb-24">
        {/* OPEN ARCHITECTURAL HEADER (Title Box Removed as Requested) */}
        <div className="pt-6 pb-8 border-b border-forest/8">
          <Container>
            {/* Minimalist Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs font-semibold text-forest/60">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex items-center gap-1.5 hover:text-emerald transition"
              >
                <ArrowLeft className="size-3.5" />
                <span>{isBn ? 'হোম' : 'Home'}</span>
              </button>
              <ChevronRight className="size-3 text-forest/25" />
              <span className="text-emerald font-bold">{isBn ? 'উদ্ভিদ নার্সারি ক্যাটালগ' : 'Plant Specimen Store'}</span>
            </nav>

            {/* Seamless, unboxed editorial title */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-emerald mb-2">
                  <span className="size-2 rounded-full bg-emerald animate-pulse" />
                  <span>{isBn ? '৭০০+ অ্যাক্লিমেটাইজড উদ্ভিদের সংগ্রহ' : '700+ Certified Botanical Specimens'}</span>
                </span>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest tracking-tight leading-tight">
                  {isBn ? 'ধানসিঁড়ি বোটানিক্যাল নার্সারি ও প্ল্যান্ট স্টোর' : 'Dhanshiri Horticultural Specimen Catalog'}
                </h1>
                <p className="mt-2.5 max-w-2xl text-sm sm:text-base text-charcoal/75 leading-relaxed font-normal">
                  {isBn
                    ? 'বাংলাদেশের আবহাওয়ায় পরীক্ষিত ৭০০+ ফলদ, সুগন্ধি ফুল, ইনডোর এয়ার-পিউরিফায়ার ও লন ঘাস। সরাসরি নওগাঁ রিসার্চ নার্সারি ও ঢাকা কর্পোরেট হাব থেকে সংগ্রহ করুন।'
                    : 'Curated collection of 700+ indigenous and acclimatized botanical specimens. Select standard 8", 10", and 1/2 Bag specifications with instant PDF quote and WhatsApp fulfillment.'}
                </p>
              </div>

              {/* Minimalist Metrics Badge */}
              <div className="flex items-center gap-4 text-xs shrink-0 font-mono text-forest/80">
                <div className="border-l-2 border-emerald pl-3">
                  <span className="font-extrabold text-lg text-forest block font-display">715+</span>
                  <span className="text-[0.68rem] text-charcoal/60 uppercase">{isBn ? 'সক্রিয় জাত' : 'Plant Varieties'}</span>
                </div>
                <div className="border-l-2 border-emerald pl-3">
                  <span className="font-extrabold text-lg text-forest block font-display">৮&quot;, ১০&quot;, ১/২</span>
                  <span className="text-[0.68rem] text-charcoal/60 uppercase">{isBn ? 'ব্যাগ সাইজ' : 'Bag Sizing'}</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* REFINED FILTER & SEARCH BAR */}
        <section className="sticky top-16 z-30 bg-[#faf8f5]/95 backdrop-blur-md border-b border-forest/10 py-4 mb-8">
          <Container>
            <div className="space-y-3">
              {/* Category Pills Bar */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
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
                      onClick={() => {
                        setSelectedCategory(cat.id)
                        setVisibleCount(ITEMS_PER_PAGE)
                      }}
                      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                        isActive
                          ? 'bg-forest text-white shadow-sm font-bold'
                          : 'bg-white text-forest/80 hover:bg-forest/5 border border-forest/15'
                      }`}
                    >
                      <span>{cat[lang] || cat.en}</span>
                      <span
                        className={`rounded-full px-1.5 py-0.2 text-[0.65rem] font-mono ${
                          isActive ? 'bg-white/20 text-white' : 'bg-forest/10 text-forest/75'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Search and Secondary Filter Row */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 text-xs">
                {/* Search Input */}
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3.5 top-2.5 size-4 text-forest/40" />
                  <input
                    type="text"
                    placeholder={
                      isBn
                        ? '৭০০+ গাছের মধ্য থেকে খুঁজুন (যেমন: আম্রপালি, মনস্টেরা, হাসনাহেনা, পেয়ারা)...'
                        : 'Search 700+ species by common name, Bengali name, or scientific binomial...'
                    }
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setVisibleCount(ITEMS_PER_PAGE)
                    }}
                    className="w-full rounded-full border border-forest/15 bg-white pl-10 pr-8 py-2 text-xs text-forest focus:outline-emerald shadow-xs"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-2 text-forest/40 hover:text-forest"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Bag Size Dropdown */}
                <select
                  value={selectedSizeFilter}
                  onChange={(e) => {
                    setSelectedSizeFilter(e.target.value)
                    setVisibleCount(ITEMS_PER_PAGE)
                  }}
                  className="rounded-full border border-forest/15 bg-white px-3.5 py-2 text-xs font-semibold text-forest focus:outline-emerald shadow-xs cursor-pointer w-full sm:w-auto"
                >
                  <option value="all">{isBn ? 'সকল সাইজ' : 'All Bag Sizes'}</option>
                  <option value="8-bag">{isBn ? '৮" পলিব্যাগ' : '8" Bag'}</option>
                  <option value="10-bag">{isBn ? '১০" পলিব্যাগ' : '10" Bag'}</option>
                  <option value="12-tub">{isBn ? '১২" টব' : '12" Tub'}</option>
                  <option value="half-bag">{isBn ? '১/২ ব্যাগ / ড্রাম' : '1/2 Bag'}</option>
                </select>

                {/* Sunlight Dropdown */}
                <select
                  value={selectedSunFilter}
                  onChange={(e) => {
                    setSelectedSunFilter(e.target.value)
                    setVisibleCount(ITEMS_PER_PAGE)
                  }}
                  className="rounded-full border border-forest/15 bg-white px-3.5 py-2 text-xs font-semibold text-forest focus:outline-emerald shadow-xs cursor-pointer w-full sm:w-auto"
                >
                  <option value="all">{isBn ? 'সকল আলো' : 'All Sunlight'}</option>
                  <option value="full">{isBn ? 'সরাসরি রোদ (Full Sun)' : 'Full Sun'}</option>
                  <option value="partial">{isBn ? 'আংশিক ছায়া (Partial)' : 'Partial Shade'}</option>
                  <option value="indirect">{isBn ? 'উজ্জ্বল আলো (Indirect)' : 'Bright Indirect'}</option>
                  <option value="low">{isBn ? 'কম আলো (Low Light)' : 'Low Light'}</option>
                </select>

                {/* Sort Order */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-full border border-forest/15 bg-white px-3.5 py-2 text-xs font-semibold text-forest focus:outline-emerald shadow-xs cursor-pointer w-full sm:w-auto"
                >
                  <option value="featured">{isBn ? 'রেকমেন্ডেড' : 'Featured'}</option>
                  <option value="price-asc">{isBn ? 'মূল্য: কম থেকে বেশি' : 'Price: Low to High'}</option>
                  <option value="price-desc">{isBn ? 'মূল্য: বেশি থেকে কম' : 'Price: High to Low'}</option>
                </select>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="inline-flex items-center gap-1 text-emerald font-bold hover:underline shrink-0 text-xs px-2"
                  >
                    <RotateCcw className="size-3" />
                    <span>{isBn ? 'রিসেট' : 'Reset'}</span>
                  </button>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* PLANT SPECIMEN CATALOG GRID */}
        <section>
          <Container>
            <div className="flex items-center justify-between mb-6 text-xs text-forest/70">
              <span className="font-mono">
                {isBn
                  ? `মোট ${filteredProducts.length} টি উদ্ভিদের মধ্যে ${displayedProducts.length} টি দেখানো হচ্ছে`
                  : `Showing ${displayedProducts.length} of ${filteredProducts.length} botanical specimens`}
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="rounded-3xl bg-white p-16 text-center border border-forest/10 my-10 max-w-lg mx-auto shadow-sm">
                <Leaf className="size-10 text-forest/30 mx-auto mb-3" />
                <h3 className="font-display text-lg font-bold text-forest">
                  {isBn ? 'কোনো উদ্ভিদ খুঁজে পাওয়া যায়নি' : 'No specimens match your search'}
                </h3>
                <p className="text-xs text-charcoal/70 mt-1.5">
                  {isBn
                    ? 'অন্য নাম দিয়ে খুঁজুন অথবা ফিল্টার রিসেট করুন।'
                    : 'Try broader keywords like Mango, Guava, Lemon, or Rose.'}
                </p>
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="mt-5 rounded-full bg-forest px-5 py-2 text-xs font-bold text-white hover:bg-emerald transition"
                >
                  {isBn ? 'সকল উদ্ভিদ দেখুন' : 'View All Plants'}
                </button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {displayedProducts.map((plant) => {
                  const defaultSize = plant.sizes[0]
                  const selection = getSelection(plant.id, defaultSize)
                  const currentSize = selection.size
                  const currentQty = selection.quantity
                  const currentPrice = currentSize.price * currentQty

                  return (
                    <div
                      key={plant.id}
                      className="group flex flex-col justify-between rounded-2xl bg-white p-4 shadow-sm border border-forest/10 hover:border-emerald/40 hover:shadow-md transition-all duration-300"
                    >
                      {/* Top: Genuine Botanical Photo */}
                      <div>
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-cream">
                          <img
                            src={plant.photo}
                            alt={plant.name[lang] || plant.name.en}
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80'
                            }}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                            {(plant.badges[lang] || plant.badges.en || []).slice(0, 1).map((b, i) => (
                              <span
                                key={i}
                                className="rounded-full bg-forest/85 backdrop-blur-md px-2 py-0.5 text-[0.62rem] font-bold text-white shadow-xs"
                              >
                                {b}
                              </span>
                            ))}
                          </div>

                          {/* Quick Care Toggle on Image */}
                          <button
                            type="button"
                            onClick={() => toggleTip(plant.id)}
                            title={isBn ? 'কৃষি পরামর্শ ও রোদ-পানির নির্দেশনা' : 'Agronomist Tip & Care Specs'}
                            className="absolute bottom-2 left-2 rounded-full bg-forest/80 hover:bg-forest text-bright backdrop-blur-md px-2 py-0.5 text-[0.62rem] font-bold inline-flex items-center gap-1 transition shadow-xs"
                          >
                            <Info className="size-2.5" />
                            <span>{isBn ? 'যত্ন' : 'Care'}</span>
                          </button>

                          <span className="absolute bottom-2 right-2 rounded-full bg-white/90 backdrop-blur-md px-2 py-0.5 text-[0.62rem] font-mono font-bold text-forest">
                            #{plant.serialNumber}
                          </span>
                        </div>

                        {/* Title & Scientific Nomenclature */}
                        <div className="mt-3">
                          <h3 className="font-display text-base font-bold text-forest leading-snug line-clamp-1">
                            {plant.name[lang] || plant.name.en}
                          </h3>
                          <p className="text-[0.68rem] text-charcoal/50 italic font-serif mt-0.5 truncate">
                            {plant.scientificName}
                          </p>
                          <p className="mt-1.5 text-xs text-charcoal/75 leading-relaxed line-clamp-2">
                            {plant.desc[lang] || plant.desc.en}
                          </p>
                        </div>

                        {/* Expandable Agronomist Care Guidance */}
                        {expandedTips[plant.id] && (
                          <div className="mt-2.5 rounded-xl bg-mint/50 border border-emerald/20 p-2.5 text-[0.7rem] text-charcoal/85 animate-rise [animation-duration:0.2s]">
                            <div className="flex items-center gap-3 text-forest font-semibold mb-1 text-[0.65rem]">
                              <span className="flex items-center gap-1">
                                <Sun className="size-3 text-amber-600" />
                                <span>{plant.sunlight === 'full' ? (isBn ? 'সরাসরি রোদ' : 'Full Sun') : (isBn ? 'আংশিক আলো' : 'Partial')}</span>
                              </span>
                              <span className="flex items-center gap-1">
                                <Droplets className="size-3 text-sky-600" />
                                <span>{plant.watering === 'daily' ? (isBn ? 'প্রতিদিন সেচ' : 'Daily Water') : (isBn ? '২ দিনে ১ বার' : '2-3 Days')}</span>
                              </span>
                            </div>
                            <p className="text-[0.68rem] text-forest/90 leading-snug">
                              <strong>{isBn ? 'আমির আলীর পরামর্শ: ' : 'Agronomist Tip: '}</strong>
                              {plant.tip[lang] || plant.tip.en}
                            </p>
                          </div>
                        )}

                        {/* Available Nursery Bag Sizes */}
                        <div className="mt-3.5">
                          <span className="text-[0.62rem] font-bold uppercase tracking-wider text-forest/60 block mb-1 font-mono">
                            {isBn ? 'ব্যাগ সাইজ নির্বাচন:' : 'Bag Sizing:'}
                          </span>
                          <div className="grid grid-cols-2 gap-1 text-[0.7rem]">
                            {plant.sizes.map((s) => {
                              const isSelected = currentSize.id === s.id
                              return (
                                <button
                                  key={s.id}
                                  type="button"
                                  onClick={() => handleSizeChange(plant.id, s)}
                                  className={`rounded-lg px-2 py-1 text-left transition border ${
                                    isSelected
                                      ? 'border-emerald bg-emerald/10 font-bold text-forest shadow-xs'
                                      : 'border-forest/10 bg-cream/50 text-charcoal/70 hover:bg-cream'
                                  }`}
                                >
                                  <div className="flex items-center justify-between text-[0.65rem]">
                                    <span className="truncate">{s.label || s.name}</span>
                                    {isSelected && <Check className="size-2.5 text-emerald shrink-0" />}
                                  </div>
                                  <span className="font-mono text-[0.68rem] font-bold text-forest block">
                                    ৳{s.price}
                                  </span>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Deck: Quantity & Add to Cart */}
                      <div className="mt-4 pt-3 border-t border-forest/8">
                        <div className="flex items-center justify-between mb-2.5">
                          {/* Quantity Counter */}
                          <div className="flex items-center gap-1.5 border border-forest/15 rounded-lg p-0.5 bg-[#faf8f5]">
                            <button
                              type="button"
                              onClick={() => handleQuantityChange(plant.id, -1, defaultSize)}
                              className="size-5 rounded flex items-center justify-center hover:bg-forest/10 text-forest transition"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="size-2.5" />
                            </button>
                            <span className="font-mono text-xs font-bold px-1 text-forest">
                              {currentQty}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleQuantityChange(plant.id, 1, defaultSize)}
                              className="size-5 rounded flex items-center justify-center hover:bg-forest/10 text-forest transition"
                              aria-label="Increase quantity"
                            >
                              <Plus className="size-2.5" />
                            </button>
                          </div>

                          {/* Calculated Total Price */}
                          <div className="text-right">
                            <span className="font-mono text-sm font-extrabold text-forest">
                              ৳{currentPrice.toLocaleString('en-US')}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons: Add to Bag & Buy Now */}
                        <div className="grid grid-cols-2 gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleAddToCartClick(plant, defaultSize, false)}
                            className="inline-flex items-center justify-center gap-1 rounded-xl border border-forest/20 bg-white py-2 px-2 text-[0.72rem] font-bold text-forest hover:bg-forest/5 transition shadow-xs"
                          >
                            <ShoppingBag className="size-3 text-emerald" />
                            <span>{isBn ? 'ব্যাগে যোগ' : 'Add to Bag'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleAddToCartClick(plant, defaultSize, true)}
                            className="inline-flex items-center justify-center gap-1 rounded-xl bg-forest py-2 px-2 text-[0.72rem] font-bold text-white hover:bg-emerald transition shadow-xs"
                          >
                            <span>{isBn ? 'সরাসরি কিনুন' : 'Buy Now'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Pagination / Load More button */}
            {visibleCount < filteredProducts.length && (
              <div className="mt-12 text-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                  className="inline-flex items-center gap-2 rounded-full bg-forest px-8 py-3 text-xs font-bold text-white shadow-lift hover:bg-emerald transition hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ChevronDown className="size-4 animate-bounce" />
                  <span>
                    {isBn
                      ? `আরো ৩০টি চারা দেখুন (বাকি ${filteredProducts.length - visibleCount} টি)`
                      : `Load 30 More Plants (${filteredProducts.length - visibleCount} remaining)`}
                  </span>
                </button>
              </div>
            )}
          </Container>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
