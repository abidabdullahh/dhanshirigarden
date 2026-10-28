import { useMemo, useRef, useState } from 'react'
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  Bug,
  Calendar,
  Camera,
  ChevronRight,
  Droplets,
  Globe,
  HelpCircle,
  Info,
  Layers,
  Leaf,
  Scan,
  ScanSearch,
  Scissors,
  Search,
  ShieldCheck,
  Sparkles,
  Sprout,
  Sun,
  Thermometer,
  Upload,
  X,
} from 'lucide-react'
import { useLocale } from '../lib/locale'
import { useRouter } from '../lib/router'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingActions from '../components/layout/FloatingActions'
import { Container } from '../components/ui/Section'
import Button from '../components/ui/Button'
import { PLANT_CATEGORIES, PLANT_DATABASE } from '../data/plantDatabase'
import { resizeImage } from '../lib/imageUtils'
import { identifyPlantFromImage } from '../lib/plantIdentifierApi'

export default function PlantWikiPage() {
  const { lang } = useLocale()
  const { navigate } = useRouter()

  // Explorer state
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlant, setSelectedPlant] = useState(null)

  // Scanner state (PictureThis style)
  const [scanning, setScanning] = useState(false)
  const [scanResult, setScanResult] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [scanError, setScanError] = useState(null)
  const fileInputRef = useRef(null)

  // Filtered plants
  const filteredPlants = useMemo(() => {
    return PLANT_DATABASE.filter((plant) => {
      const matchesCategory = activeCategory === 'all' || plant.category === activeCategory
      const query = searchQuery.trim().toLowerCase()
      if (!query) return matchesCategory

      const matchesSearch =
        plant.name.toLowerCase().includes(query) ||
        plant.banglaName.toLowerCase().includes(query) ||
        plant.scientificName.toLowerCase().includes(query) ||
        plant.family.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  // Handle image upload and identification
  const handleImageFile = async (file) => {
    if (!file) return
    setScanError(null)
    setScanResult(null)

    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)
    setScanning(true)

    try {
      const resized = await resizeImage(file, 1024, 1024, 0.85)
      const res = await identifyPlantFromImage({
        base64: resized.base64,
        mediaType: resized.mediaType,
        lang,
      })

      if (res?.ok && res.data) {
        setScanResult(res.data)
      } else {
        setScanError(
          lang === 'bn'
            ? 'উদ্ভিদটি শনাক্ত করা যায়নি। অনুগ্রহ করে পরিষ্কার ও পর্যাপ্ত আলোযুক্ত ছবি তুলুন।'
            : 'Could not identify species. Please ensure clear lighting focusing on leaf or flower.'
        )
      }
    } catch {
      setScanError(
        lang === 'bn'
          ? 'ছবি প্রসেস করতে সমস্যা হয়েছে। অন্য একটি ছবি চেষ্টা করুন।'
          : 'Failed to process image. Please try another photo.'
      )
    } finally {
      setScanning(false)
    }
  }

  // Sample photos to test immediately
  const handleSampleTest = (plantId) => {
    const found = PLANT_DATABASE.find((p) => p.id === plantId)
    if (!found) return

    setPreviewUrl(found.image)
    setScanning(true)
    setScanError(null)

    setTimeout(() => {
      setScanResult({
        isPlant: true,
        name: found.name,
        banglaName: found.banglaName,
        scientificName: found.scientificName,
        family: found.family,
        confidence: 'high',
        category: found.category,
        description: lang === 'bn' ? found.summary.bn : found.summary.en,
        sunlight: lang === 'bn' ? found.sunlightText.bn : found.sunlightText.en,
        watering: lang === 'bn' ? found.wateringText.bn : found.wateringText.en,
        difficulty: found.difficulty,
        petSafe: found.petSafe,
        origin: found.origin ? (lang === 'bn' ? found.origin.bn : found.origin.en) : null,
        plantation: found.plantation ? (lang === 'bn' ? found.plantation.bn : found.plantation.en) : null,
        bloomingSeason: found.bloomingSeason ? (lang === 'bn' ? found.bloomingSeason.bn : found.bloomingSeason.en) : null,
        harvestSeason: found.harvestSeason ? (lang === 'bn' ? found.harvestSeason.bn : found.harvestSeason.en) : null,
        caringTechniques: found.caringTechniques ? (lang === 'bn' ? found.caringTechniques.bn : found.caringTechniques.en) : null,
        funFact:
          lang === 'bn'
            ? `${found.banglaName} বাংলাদেশের আবহাওয়া ও শহুরে ছাদবাগান বা ইনডোরের জন্য অত্যন্ত উপযোগী ও সহজে পরিচর্যাযোগ্য।`
            : `${found.name} is exceptionally resilient in Bangladesh urban microclimates with high productivity.`,
        plantId: found.id,
      })
      setScanning(false)
    }, 1400)
  }

  return (
    <div className="min-h-screen bg-cream text-charcoal flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        {/* Breadcrumb & Apple-style Hero Header */}
        <section className="relative isolate overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16">
          <div aria-hidden="true" className="pointer-events-none absolute -left-36 top-0 -z-10 size-96 rounded-full bg-bright/20 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-36 top-20 -z-10 size-96 rounded-full bg-emerald/15 blur-3xl" />

          <Container>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-forest/70">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex items-center gap-1.5 hover:text-emerald transition"
              >
                <ArrowLeft className="size-3.5" />
                <span>{lang === 'bn' ? 'হোম' : 'Home'}</span>
              </button>
              <ChevronRight className="size-3 text-forest/30" />
              <span className="text-emerald font-bold">{lang === 'bn' ? 'উদ্ভিদকোষ ও শনাক্তকারী' : 'Plant Wikipedia & Identifier'}</span>
            </nav>

            {/* Apple-like Headline Card */}
            <div className="rounded-[2.5rem] glass-panel p-8 sm:p-14 shadow-lift border border-white/85 text-center max-w-4xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full glass-pill px-4 py-1.5 text-xs font-bold text-forest uppercase tracking-wider mb-4">
                <Leaf className="size-4 text-emerald" />
                {lang === 'bn' ? 'ডিএই সনদপ্রাপ্ত বোটানিক্যাল জ্ঞানভাণ্ডার' : 'DAE Verified Botanical Encyclopedia'}
              </span>

              <h1 className="font-display text-[clamp(2.3rem,4.8vw,3.8rem)] font-extrabold text-forest leading-[1.12]">
                {lang === 'bn' ? 'প্ল্যান্ট উইকিপিডিয়া ও ফটো আইডেন্টিফায়ার' : 'Plant Wikipedia & Visual Identifier'}
              </h1>

              <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-charcoal/80 leading-relaxed">
                {lang === 'bn'
                  ? 'ছবি তুলে মুহূর্তেই গাছের প্রজাতি শনাক্ত করুন অথবা বাংলাদেশের জলবায়ুর উপযোগী ফলদ, ইনডোর, লন ও শোভাময় গাছের বৈজ্ঞানিক পরিচর্যা নির্দেশিকা জানুন।'
                  : 'Snap a photo to instantly identify botanical species like PictureThis, or explore science-backed care protocols tailored for Bangladesh.'}
              </p>
            </div>
          </Container>
        </section>

        {/* 1. VISUAL PLANT IDENTIFIER (PICTURETHIS APP FEATURE) */}
        <section className="relative isolate overflow-hidden pb-16">
          <Container>
            <div className="rounded-[2.5rem] glass-card p-6 sm:p-10 border border-white/85 shadow-lift max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-forest/10 pb-5 mb-8">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full glass-pill px-3 py-1 text-xs font-bold text-forest uppercase tracking-wider mb-1">
                    <Scan className="size-3.5 text-emerald" />
                    {lang === 'bn' ? 'এআই ভিজ্যুয়াল স্ক্যানার' : 'AI Visual Scanner'}
                  </span>
                  <h2 className="font-display text-2xl font-bold text-forest">
                    {lang === 'bn' ? 'ছবি দিয়ে গাছ শনাক্ত করুন' : 'Instant Photo Species Recognition'}
                  </h2>
                </div>

                {/* Instant Sample Test Buttons */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="text-charcoal/60 hidden sm:inline">{lang === 'bn' ? 'নমুনা দেখুন:' : 'Try samples:'}</span>
                  <button
                    type="button"
                    onClick={() => handleSampleTest('bari-malta-1')}
                    className="rounded-full glass-pill px-3 py-1 font-bold text-forest hover:bg-white transition"
                  >
                    {lang === 'bn' ? 'মাল্টা' : 'Malta'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSampleTest('katimon-mango')}
                    className="rounded-full glass-pill px-3 py-1 font-bold text-forest hover:bg-white transition"
                  >
                    {lang === 'bn' ? 'কাটিমন আম' : 'Mango'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSampleTest('dragon-fruit')}
                    className="rounded-full glass-pill px-3 py-1 font-bold text-forest hover:bg-white transition"
                  >
                    {lang === 'bn' ? 'ড্রাগন ফল' : 'Dragon'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSampleTest('bougainvillea')}
                    className="rounded-full glass-pill px-3 py-1 font-bold text-forest hover:bg-white transition"
                  >
                    {lang === 'bn' ? 'বাগানবিলাস' : 'Bougainvillea'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSampleTest('beli-flower')}
                    className="rounded-full glass-pill px-3 py-1 font-bold text-forest hover:bg-white transition"
                  >
                    {lang === 'bn' ? 'বেলি ফুল' : 'Beli'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSampleTest('tulsi-plant')}
                    className="rounded-full glass-pill px-3 py-1 font-bold text-forest hover:bg-white transition"
                  >
                    {lang === 'bn' ? 'তুলসী' : 'Tulsi'}
                  </button>
                </div>
              </div>

              {/* Upload Drop Zone / Scanner Viewfinder */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageFile(e.target.files?.[0])}
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border-2 border-dashed border-emerald/30 bg-white/40 p-8 sm:p-12 text-center transition-all duration-300 hover:border-emerald hover:bg-white/70"
              >
                {previewUrl ? (
                  <div className="relative mx-auto max-w-sm aspect-[4/3] overflow-hidden rounded-2xl shadow-lift border border-white">
                    <img src={previewUrl} alt="Plant for identification" className="h-full w-full object-cover" />
                    {scanning && (
                      <div className="absolute inset-0 bg-forest/40 backdrop-blur-xs flex flex-col items-center justify-center text-white">
                        <div className="size-12 rounded-full border-3 border-bright border-t-transparent animate-spin mb-3" />
                        <span className="font-display text-sm font-bold tracking-wider animate-pulse">
                          {lang === 'bn' ? 'বোটানিক্যাল এআই বিশ্লেষণ চলছে...' : 'Analyzing Botanical Taxonomy...'}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="grid size-16 place-items-center rounded-2xl glass-emerald text-white shadow-soft transition-transform group-hover:scale-110 mb-4">
                      <Camera className="size-8" />
                    </span>
                    <strong className="font-display text-lg sm:text-xl font-bold text-forest">
                      {lang === 'bn' ? 'গাছের পাতার ছবি আপলোড করুন বা ছবি তুলুন' : 'Upload or Snap a Plant Photo'}
                    </strong>
                    <p className="mt-2 max-w-md text-xs sm:text-sm text-charcoal/70">
                      {lang === 'bn'
                        ? 'ক্যামেরা আইকনে চাপ দিন। আমাদের এআই চোখের পলকে বিজ্ঞানসম্মত নাম ও পরিচর্যা চার্ট তৈরি করবে।'
                        : 'Tap to snap a leaf or flower. Our botanical engine recognizes species and builds care profiles.'}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 rounded-full glass-pill px-4 py-1.5 text-xs font-bold text-emerald">
                      <Upload className="size-3.5" />
                      {lang === 'bn' ? 'ছবি নির্বাচন করুন' : 'Browse Gallery / Camera'}
                    </span>
                  </div>
                )}
              </div>

              {/* Error Alert */}
              {scanError && (
                <div className="mt-6 flex items-start gap-3 rounded-2xl bg-alert/10 p-4 text-alert border border-alert/20 text-xs sm:text-sm">
                  <AlertCircle className="size-5 shrink-0 mt-0.5" />
                  <p>{scanError}</p>
                </div>
              )}

              {/* Scan Result Card (PictureThis Style) */}
              {scanResult && scanResult.isPlant && (
                <div className="mt-8 animate-rise rounded-3xl glass-panel p-6 sm:p-8 border border-white/90 shadow-lift">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full glass-emerald px-3 py-1 text-xs font-bold text-white shadow-xs">
                          {scanResult.confidence.toUpperCase()} CONFIDENCE
                        </span>
                        <span className="text-xs font-mono text-forest/70">{scanResult.family}</span>
                      </div>

                      <h3 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-forest">
                        {lang === 'bn' ? scanResult.banglaName : scanResult.name}
                      </h3>
                      <p className="text-sm italic font-serif text-emerald">{scanResult.scientificName}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {scanResult.plantId && (
                        <button
                          type="button"
                          onClick={() => {
                            const found = PLANT_DATABASE.find((p) => p.id === scanResult.plantId)
                            if (found) setSelectedPlant(found)
                          }}
                          className="inline-flex items-center gap-2 rounded-full glass-card border border-emerald/30 px-4 py-2 text-xs font-bold text-forest hover:bg-white transition shadow-soft"
                        >
                          <BookOpen className="size-4 text-emerald" />
                          <span>{lang === 'bn' ? 'সম্পূর্ণ বোটানিক্যাল গাইড' : 'Full Botanical Guide'}</span>
                        </button>
                      )}

                      {/* AI Plant Doctor Diagnostic Link */}
                      <button
                        type="button"
                        onClick={() => navigate('/plant-doctor')}
                        className="inline-flex items-center gap-2 rounded-full glass-amber px-4 py-2 text-xs font-bold text-charcoal hover:brightness-105 transition shadow-soft"
                      >
                        <ScanSearch className="size-4 text-forest" />
                        <span>{lang === 'bn' ? 'রোগ নির্ণয় (Plant Doctor)' : 'Health Triage (Plant Doctor)'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Native Origin / Provenance */}
                  {scanResult.origin && (
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-full glass-pill px-3.5 py-1 text-xs text-forest">
                      <Globe className="size-3.5 text-emerald shrink-0" />
                      <span>
                        <strong className="text-emerald">{lang === 'bn' ? 'উৎপত্তি ও আদি নিবাস:' : 'Origin & Provenance:'}</strong>{' '}
                        {scanResult.origin}
                      </span>
                    </div>
                  )}

                  <p className="mt-4 text-sm leading-relaxed text-charcoal/85">{scanResult.description}</p>

                  {/* Seasonal Blooming & Harvest Callout */}
                  {(scanResult.bloomingSeason || scanResult.harvestSeason) && (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      {scanResult.bloomingSeason && (
                        <div className="rounded-xl bg-white/70 p-3 border border-emerald-100 flex items-center gap-2.5">
                          <span className="size-7 rounded-lg bg-amber-500/10 text-amber-600 grid place-items-center shrink-0">
                            <Calendar className="size-3.5" />
                          </span>
                          <div>
                            <span className="text-charcoal/60 text-[0.65rem] font-bold uppercase tracking-wider block">
                              {lang === 'bn' ? 'ফুল ফোটার মৌসুম' : 'Blooming Period'}
                            </span>
                            <strong className="text-forest text-xs">{scanResult.bloomingSeason}</strong>
                          </div>
                        </div>
                      )}
                      {scanResult.harvestSeason && (
                        <div className="rounded-xl bg-white/70 p-3 border border-emerald-100 flex items-center gap-2.5">
                          <span className="size-7 rounded-lg bg-emerald-500/10 text-emerald-600 grid place-items-center shrink-0">
                            <Sprout className="size-3.5" />
                          </span>
                          <div>
                            <span className="text-charcoal/60 text-[0.65rem] font-bold uppercase tracking-wider block">
                              {lang === 'bn' ? 'ফলন সংগ্রহের মৌসুম' : 'Harvest Window'}
                            </span>
                            <strong className="text-forest text-xs">{scanResult.harvestSeason}</strong>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Plantation & Container Potting Guide */}
                  {scanResult.plantation && (
                    <div className="mt-4 rounded-2xl glass-surface p-4 border border-white/70 text-xs text-charcoal/85 leading-relaxed">
                      <strong className="text-forest block font-bold mb-1 flex items-center gap-1.5">
                        <Sprout className="size-3.5 text-emerald" />
                        <span>{lang === 'bn' ? 'চারা রোপণ ও টব প্রস্তুতি:' : 'Plantation & Soil Mix:'}</span>
                      </strong>
                      <p>{scanResult.plantation}</p>
                    </div>
                  )}

                  {/* Caring Techniques & Pruning Protocol */}
                  {scanResult.caringTechniques && (
                    <div className="mt-3 rounded-2xl glass-surface p-4 border border-white/70 text-xs text-charcoal/85 leading-relaxed">
                      <strong className="text-forest block font-bold mb-1 flex items-center gap-1.5">
                        <Scissors className="size-3.5 text-emerald" />
                        <span>{lang === 'bn' ? 'পরিচর্যা ও ছাঁটাই (Pruning):' : 'Caring & Pruning Protocol:'}</span>
                      </strong>
                      <p>{scanResult.caringTechniques}</p>
                    </div>
                  )}

                  {/* Core Care Specifications */}
                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="rounded-2xl glass-surface p-3.5 border border-white/70">
                      <Sun className="size-4 text-amber-500 mb-1" />
                      <span className="text-charcoal/60 block text-[0.7rem] uppercase font-bold">{lang === 'bn' ? 'সূর্যালোক' : 'Sunlight'}</span>
                      <strong className="text-forest line-clamp-1">{scanResult.sunlight}</strong>
                    </div>

                    <div className="rounded-2xl glass-surface p-3.5 border border-white/70">
                      <Droplets className="size-4 text-sky-500 mb-1" />
                      <span className="text-charcoal/60 block text-[0.7rem] uppercase font-bold">{lang === 'bn' ? 'সেচ' : 'Watering'}</span>
                      <strong className="text-forest line-clamp-1">{scanResult.watering}</strong>
                    </div>

                    <div className="rounded-2xl glass-surface p-3.5 border border-white/70">
                      <Layers className="size-4 text-emerald mb-1" />
                      <span className="text-charcoal/60 block text-[0.7rem] uppercase font-bold">{lang === 'bn' ? 'কঠিনতা' : 'Difficulty'}</span>
                      <strong className="text-forest capitalize">{scanResult.difficulty}</strong>
                    </div>

                    <div className="rounded-2xl glass-surface p-3.5 border border-white/70">
                      <ShieldCheck className="size-4 text-bright mb-1" />
                      <span className="text-charcoal/60 block text-[0.7rem] uppercase font-bold">{lang === 'bn' ? 'পেট ফ্রেন্ডলি' : 'Pet Safe'}</span>
                      <strong className="text-forest">{scanResult.petSafe ? (lang === 'bn' ? 'হ্যাঁ, নিরাপদ' : 'Yes, Safe') : (lang === 'bn' ? 'সতর্কতা প্রয়োজন' : 'Toxic to pets')}</strong>
                    </div>
                  </div>

                  {/* Fun fact callout */}
                  {scanResult.funFact && (
                    <div className="mt-5 rounded-2xl glass-pill p-4 text-xs text-forest/90 border border-emerald-200/40 flex items-start gap-3">
                      <Sparkles className="size-4 text-bloom shrink-0 mt-0.5" />
                      <p>
                        <strong>{lang === 'bn' ? 'বোটানিক্যাল তথ্য:' : 'Botanical Insight:'}</strong> {scanResult.funFact}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Container>
        </section>

        {/* 2. BOTANICAL ENCYCLOPEDIA & FILTERABLE WIKI */}
        <section className="relative isolate overflow-hidden py-10">
          <Container>
            {/* Header + Search & Category Filters */}
            <div className="mb-10 text-center max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-1.5 rounded-full glass-pill px-4 py-1.5 text-xs font-bold text-forest uppercase tracking-wider mb-2">
                <Info className="size-3.5 text-emerald" />
                {lang === 'bn' ? 'গাছের সম্পূর্ণ ক্যাটালগ' : 'Botanical Species Catalog'}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-forest">
                {lang === 'bn' ? 'উদ্ভিদকোষ অনুসন্ধান করুন' : 'Explore the Plant Encyclopedia'}
              </h2>
            </div>

            {/* Search Input Bar */}
            <div className="max-w-xl mx-auto mb-8 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-forest/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  lang === 'bn'
                    ? 'গাছের নাম (মাল্টা, ড্রাগন, মনস্টেরা) বা বৈজ্ঞানিক নাম খুঁজুন...'
                    : 'Search by common name, Bangla name, or scientific name...'
                }
                className="w-full rounded-full glass-panel pl-12 pr-4 py-3.5 text-sm text-forest placeholder:text-charcoal/40 border border-white/90 shadow-soft focus:outline-none focus:ring-2 focus:ring-emerald"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-forest"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {PLANT_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`rounded-full px-5 py-2 text-xs sm:text-sm font-bold transition-all duration-300 ${
                      isActive
                        ? 'glass-emerald text-white shadow-lift scale-105 border border-emerald-400/50'
                        : 'glass-card text-forest/75 hover:bg-white hover:text-forest border border-white/80'
                    }`}
                  >
                    {lang === 'bn' ? cat.bn : cat.en}
                  </button>
                )
              })}
            </div>

            {/* Plants Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredPlants.map((plant) => (
                <article
                  key={plant.id}
                  onClick={() => setSelectedPlant(plant)}
                  className="group cursor-pointer rounded-3xl glass-card overflow-hidden shadow-soft border border-white/80 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift hover:border-emerald-300 flex flex-col"
                >
                  {/* Photo with subtle badge */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-mint">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    <span className="absolute bottom-3 left-3 text-[0.7rem] font-bold uppercase tracking-wider text-white font-mono rounded-full glass-pill px-2.5 py-0.5">
                      {plant.category}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[0.68rem] text-emerald font-semibold italic truncate">
                        {plant.scientificName}
                      </span>
                      {plant.bloomingSeason && (
                        <span className="text-[0.62rem] font-bold text-amber-700 bg-amber-500/10 px-2 py-0.5 rounded-full shrink-0 border border-amber-300/40">
                          {lang === 'bn' ? plant.bloomingSeason.bn.split('(')[0].trim() : plant.bloomingSeason.en.split(':')[0].trim()}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-lg font-bold text-forest mt-1">
                      {lang === 'bn' ? plant.banglaName : plant.name}
                    </h3>
                    {plant.origin && (
                      <p className="text-[0.68rem] text-forest/60 flex items-center gap-1 mt-0.5">
                        <Globe className="size-3 text-emerald shrink-0" />
                        <span className="truncate">{lang === 'bn' ? plant.origin.bn : plant.origin.en}</span>
                      </p>
                    )}
                    <p className="mt-2 text-xs text-charcoal/70 line-clamp-2 leading-relaxed">
                      {lang === 'bn' ? plant.summary.bn : plant.summary.en}
                    </p>

                    <div className="mt-auto pt-4 border-t border-forest/10 flex items-center justify-between text-xs text-forest/80 font-medium">
                      <span className="inline-flex items-center gap-1">
                        <Sun className="size-3.5 text-amber-500" />
                        <span className="capitalize">{plant.difficulty}</span>
                      </span>
                      <span className="text-emerald font-bold group-hover:translate-x-1 transition-transform">
                        {lang === 'bn' ? 'বিস্তারিত গাইড →' : 'Care Guide →'}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredPlants.length === 0 && (
              <div className="rounded-3xl glass-panel p-12 text-center max-w-md mx-auto my-12 border border-white/85">
                <HelpCircle className="size-10 text-forest/40 mx-auto mb-3" />
                <h3 className="font-display text-lg font-bold text-forest">
                  {lang === 'bn' ? 'কোনো উদ্ভিদ পাওয়া যায়নি' : 'No Species Found'}
                </h3>
                <p className="text-xs text-charcoal/70 mt-1">
                  {lang === 'bn'
                    ? 'ভিন্ন কোনো নাম লিখে অনুসন্ধান করুন অথবা ফিল্টার পরিবর্তন করুন।'
                    : 'Try checking your spelling or selecting another category.'}
                </p>
              </div>
            )}
          </Container>
        </section>

        {/* 3. BOTANICAL PROFILE DETAIL MODAL (APPLE SHEET STYLE) */}
        {selectedPlant && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-forest/40 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
          >
            <div className="relative w-full max-w-3xl rounded-[2.5rem] glass-panel bg-white/95 p-6 sm:p-10 shadow-2xl border border-white max-h-[90vh] overflow-y-auto animate-rise">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPlant(null)}
                className="absolute right-5 top-5 grid size-10 place-items-center rounded-full glass-pill text-forest hover:bg-white shadow-soft transition"
              >
                <X className="size-5" />
              </button>

              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full glass-emerald px-3.5 py-1 text-xs font-bold text-white shadow-xs">
                  {selectedPlant.family}
                </span>
                <span className="text-xs font-semibold text-emerald uppercase tracking-wider">
                  {selectedPlant.category}
                </span>
                <span className="rounded-full bg-forest/5 px-3 py-0.5 text-xs font-medium text-forest/70 capitalize">
                  {selectedPlant.difficulty}
                </span>
              </div>

              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-forest">
                {lang === 'bn' ? selectedPlant.banglaName : selectedPlant.name}
              </h2>
              <p className="text-sm font-serif italic text-emerald mt-0.5">{selectedPlant.scientificName}</p>

              {/* Native Origin / Provenance */}
              {selectedPlant.origin && (
                <div className="mt-3 inline-flex items-center gap-2 rounded-full glass-pill px-3.5 py-1 text-xs text-forest font-medium">
                  <Globe className="size-3.5 text-emerald shrink-0" />
                  <span>
                    <strong className="text-emerald">{lang === 'bn' ? 'উৎপত্তি ও আদি নিবাস:' : 'Origin & Provenance:'}</strong>{' '}
                    {lang === 'bn' ? selectedPlant.origin.bn : selectedPlant.origin.en}
                  </span>
                </div>
              )}

              {/* Photo hero inside modal */}
              <div className="my-6 aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-lift bg-mint">
                <img src={selectedPlant.image} alt={selectedPlant.name} className="h-full w-full object-cover" />
              </div>

              {/* Summary Description */}
              <p className="text-sm sm:text-base leading-relaxed text-charcoal/85">
                {lang === 'bn' ? selectedPlant.summary.bn : selectedPlant.summary.en}
              </p>

              {/* Seasonal Calendar: Flowering & Harvesting Window */}
              {(selectedPlant.bloomingSeason || selectedPlant.harvestSeason) && (
                <div className="mt-6 rounded-2xl glass-surface p-5 border border-white/85">
                  <h3 className="font-display text-sm font-bold text-forest flex items-center gap-2 mb-3">
                    <Calendar className="size-4 text-emerald" />
                    <span>{lang === 'bn' ? 'মৌসুমী ক্যালেন্ডার (ফুল ও ফলন সময়সূচি)' : 'Seasonal Calendar: Flowering & Harvest'}</span>
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3 text-xs">
                    {selectedPlant.bloomingSeason && (
                      <div className="rounded-xl bg-white/80 p-3.5 border border-emerald-100 shadow-xs">
                        <span className="text-charcoal/60 font-bold uppercase tracking-wider text-[0.68rem] block mb-1">
                          🌸 {lang === 'bn' ? 'ফুল ফোটার সময়' : 'Blooming Period'}
                        </span>
                        <strong className="text-forest text-sm block">
                          {lang === 'bn' ? selectedPlant.bloomingSeason.bn : selectedPlant.bloomingSeason.en}
                        </strong>
                      </div>
                    )}
                    {selectedPlant.harvestSeason && (
                      <div className="rounded-xl bg-white/80 p-3.5 border border-emerald-100 shadow-xs">
                        <span className="text-charcoal/60 font-bold uppercase tracking-wider text-[0.68rem] block mb-1">
                          🧺 {lang === 'bn' ? 'ফলন ও সংগ্রহের সময়' : 'Harvest / Maturation'}
                        </span>
                        <strong className="text-forest text-sm block">
                          {lang === 'bn' ? selectedPlant.harvestSeason.bn : selectedPlant.harvestSeason.en}
                        </strong>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Plantation & Container Potting Guide */}
              {selectedPlant.plantation && (
                <div className="mt-4 rounded-2xl glass-panel p-5 border border-white/85 text-xs sm:text-sm">
                  <strong className="block text-forest font-bold mb-1.5 flex items-center gap-2 text-sm">
                    <Sprout className="size-4 text-emerald" />
                    <span>{lang === 'bn' ? 'চারা রোপণ ও টব/ড্রাম প্রস্তুতি:' : 'Plantation & Container Potting Guide:'}</span>
                  </strong>
                  <p className="text-charcoal/80 leading-relaxed">
                    {lang === 'bn' ? selectedPlant.plantation.bn : selectedPlant.plantation.en}
                  </p>
                </div>
              )}

              {/* Caring Techniques & Pruning */}
              {selectedPlant.caringTechniques && (
                <div className="mt-4 rounded-2xl glass-surface p-5 border border-white/85 text-xs sm:text-sm">
                  <strong className="block text-forest font-bold mb-1.5 flex items-center gap-2 text-sm">
                    <Scissors className="size-4 text-emerald" />
                    <span>{lang === 'bn' ? 'বিশেষ পরিচর্যা ও ছাঁটাই/প্রুনিং বিধি:' : 'Caring Techniques & Pruning Protocol:'}</span>
                  </strong>
                  <p className="text-charcoal/80 leading-relaxed">
                    {lang === 'bn' ? selectedPlant.caringTechniques.bn : selectedPlant.caringTechniques.en}
                  </p>
                </div>
              )}

              {/* Technical Specifications Grid */}
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="rounded-2xl glass-surface p-4 border border-white/70">
                  <Sun className="size-4 text-amber-500 mb-1" />
                  <span className="text-charcoal/60 block text-[0.7rem] uppercase font-bold">{lang === 'bn' ? 'সূর্যালোক' : 'Sunlight'}</span>
                  <p className="font-semibold text-forest mt-0.5">{lang === 'bn' ? selectedPlant.sunlightText.bn : selectedPlant.sunlightText.en}</p>
                </div>

                <div className="rounded-2xl glass-surface p-4 border border-white/70">
                  <Droplets className="size-4 text-sky-500 mb-1" />
                  <span className="text-charcoal/60 block text-[0.7rem] uppercase font-bold">{lang === 'bn' ? 'সেচ প্রণালী' : 'Watering'}</span>
                  <p className="font-semibold text-forest mt-0.5">{lang === 'bn' ? selectedPlant.wateringText.bn : selectedPlant.wateringText.en}</p>
                </div>

                <div className="rounded-2xl glass-surface p-4 border border-white/70">
                  <Thermometer className="size-4 text-rose-500 mb-1" />
                  <span className="text-charcoal/60 block text-[0.7rem] uppercase font-bold">{lang === 'bn' ? 'তাপমাত্রা' : 'Temperature'}</span>
                  <p className="font-semibold text-forest mt-0.5">{selectedPlant.temperature}</p>
                </div>

                <div className="rounded-2xl glass-surface p-4 border border-white/70">
                  <ShieldCheck className="size-4 text-bright mb-1" />
                  <span className="text-charcoal/60 block text-[0.7rem] uppercase font-bold">{lang === 'bn' ? 'পোষা প্রাণী' : 'Pet Safety'}</span>
                  <p className="font-semibold text-forest mt-0.5">{selectedPlant.petSafe ? (lang === 'bn' ? 'নিরাপদ' : 'Safe') : (lang === 'bn' ? 'সতর্কতা' : 'Toxic')}</p>
                </div>
              </div>

              {/* Soil & Nutrition Formula */}
              <div className="mt-4 rounded-2xl glass-panel p-5 border border-white/85 text-xs sm:text-sm">
                <strong className="block text-forest font-bold mb-1.5 flex items-center gap-2">
                  <Layers className="size-4 text-emerald" />
                  <span>{lang === 'bn' ? 'মাটি ও পুষ্টি ফর্মুলেশন:' : 'Soil & Nutrition Formula:'}</span>
                </strong>
                <p className="text-charcoal/80 mb-2 leading-relaxed">
                  <strong>{lang === 'bn' ? 'মাটির মিশ্রণ:' : 'Soil Blend:'}</strong> {lang === 'bn' ? selectedPlant.soil.bn : selectedPlant.soil.en}
                </p>
                <p className="text-charcoal/80 leading-relaxed">
                  <strong>{lang === 'bn' ? 'পুষ্টি প্রয়োগ:' : 'Fertilizer:'}</strong> {lang === 'bn' ? selectedPlant.nutrition.bn : selectedPlant.nutrition.en}
                </p>
              </div>

              {/* Common Pests & Vectors */}
              {selectedPlant.pests && selectedPlant.pests.length > 0 && (
                <div className="mt-4 rounded-2xl glass-surface p-4 border border-white/85 text-xs">
                  <strong className="block text-forest font-bold mb-2 flex items-center gap-1.5">
                    <Bug className="size-3.5 text-rose-500" />
                    <span>{lang === 'bn' ? 'সাধারণ রোগবালাই ও ক্ষতিকর পোকা:' : 'Common Pests & Disease Vectors:'}</span>
                  </strong>
                  <div className="flex flex-wrap gap-2">
                    {selectedPlant.pests.map((pest, i) => (
                      <span key={i} className="rounded-full bg-rose-50 text-rose-700 px-3 py-1 font-medium border border-rose-200/60">
                        {pest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Amir Ali Agronomist Protocol */}
              <div className="mt-4 rounded-2xl glass-emerald p-5 text-white text-xs sm:text-sm shadow-soft">
                <strong className="block font-bold mb-1 text-bright">
                  ★ {lang === 'bn' ? 'জনাব আমির আলীর কৃষি পরামর্শ:' : 'Mr. Amir Ali’s Agronomist Protocol:'}
                </strong>
                <p className="text-white/90 leading-relaxed">
                  {lang === 'bn' ? selectedPlant.proTip.bn : selectedPlant.proTip.en}
                </p>
              </div>

              {/* Modal Bottom Actions */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-forest/10">
                <Button
                  onClick={() => {
                    setSelectedPlant(null)
                    navigate('/plant-doctor')
                  }}
                  variant="primary"
                  size="md"
                >
                  <ScanSearch className="size-4 text-bright" />
                  <span>{lang === 'bn' ? 'এই গাছের রোগ নির্ণয় করুন' : 'Diagnose Disease (Plant Doctor)'}</span>
                </Button>

                <Button
                  onClick={() => setSelectedPlant(null)}
                  variant="glass"
                  size="md"
                >
                  {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
