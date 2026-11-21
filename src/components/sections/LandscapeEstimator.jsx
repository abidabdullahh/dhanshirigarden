import { useState, useMemo, useCallback } from 'react'
import {
  Calculator,
  CheckCircle2,
  Compass,
  FileSpreadsheet,
  Layers,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Timer,
  TreePine,
  Waves,
} from 'lucide-react'
import { useLocale } from '../../lib/locale'
import { getWhatsAppLink } from '../../lib/whatsapp'
import Button from '../ui/Button'
import { Container, Section, SectionHeading } from '../ui/Section'

const SERVICE_CATEGORIES = [
  {
    id: 'rooftop',
    name: { bn: 'ছাদবাগান ও স্কাই টেরেস', en: 'Rooftop Garden & Sky Terrace' },
    minRate: 360,
    maxRate: 520,
    baseDays: 14,
    desc: {
      bn: 'লাইটওয়েট সয়েল মিডিয়া, রুট-ব্যারিয়ার ও ড্রেন সেল ড্রেনেজ সিস্টেম',
      en: 'Lightweight volcanic media, root barrier & HDPE drain cells',
    },
    icon: TreePine,
  },
  {
    id: 'estate',
    name: { bn: 'ভিলা ও আবাসিক এস্টেট ল্যান্ডস্কেপ', en: 'Villa & Estate Landscape' },
    minRate: 280,
    maxRate: 440,
    baseDays: 18,
    desc: {
      bn: 'মাস্টারপ্ল্যান, বর্ডার প্ল্যান্টেশন, ওয়াকওয়ে ও আউটডোর লিভিং জোন',
      en: 'Masterplanning, border shrubbery, paved paths & outdoor living',
    },
    icon: Compass,
  },
  {
    id: 'lawn',
    name: { bn: 'ভেলভেট কার্পেট লন (বারমুডা / কোরিয়ান)', en: 'Velvet Carpet Turf (Bermuda/Korean)' },
    minRate: 140,
    maxRate: 220,
    baseDays: 7,
    desc: {
      bn: 'মাটি তৈরি, লেজার লেভেলিং, টার্মিনেট গ্রাভেল ও গ্রাস সোডিং',
      en: 'Soil grading, laser leveling, gravel sub-base & turf sodding',
    },
    icon: Layers,
  },
  {
    id: 'hardscape',
    name: { bn: 'সিলেট স্যান্ডস্টোন ও হার্ডস্কেপ', en: 'Sylhet Sandstone & Hardscaping' },
    minRate: 420,
    maxRate: 720,
    baseDays: 16,
    desc: {
      bn: 'ন্যাচারাল স্টোন পেভার্স, সেগুন কাঠের পারগোলা ও সিটিং লাউঞ্জ',
      en: 'Natural stone pavers, teak pergola pavilions & seating zones',
    },
    icon: Layers,
  },
  {
    id: 'vertical',
    name: { bn: 'ভার্টিক্যাল লিভিং গ্রিন ওয়াল', en: 'Vertical Living Green Wall' },
    minRate: 650,
    maxRate: 950,
    baseDays: 10,
    desc: {
      bn: 'হাইড্রো-ম্যাট্রিক্স সেলফ-ওয়াটারিং সিস্টেম ও এয়ার-পিউরিফাইং গাছ',
      en: 'Hydro-matrix self-watering structure & air-purifying foliage',
    },
    icon: Sparkles,
  },
  {
    id: 'irrigation',
    name: { bn: 'স্মার্ট ড্রিপ ও পপ-আপ স্প্রিংকলার', en: 'Smart Micro-Drip & Sprinklers' },
    minRate: 90,
    maxRate: 160,
    baseDays: 5,
    desc: {
      bn: 'স্বয়ংক্রিয় ক্লাউড টাইমার, রেইন সেন্সর ও ড্রিপ লাইন নেটওয়ার্ক',
      en: 'Automated digital timer, rain sensor & micro-drip networks',
    },
    icon: Waves,
  },
]

const ADDONS = [
  {
    id: 'waterproofing',
    name: { bn: '৭-লেয়ার ওয়াটারপ্রুফিং মেমব্রেন', en: '7-Layer Elastomeric Waterproofing' },
    ratePerSqFt: 45,
    flatCost: 0,
    icon: ShieldCheck,
  },
  {
    id: 'irrigation_auto',
    name: { bn: 'স্মার্ট ওয়েদার-সিঙ্কড ড্রিপ নেটওয়ার্ক', en: 'Smart Weather-Synced Micro-Drip' },
    ratePerSqFt: 35,
    flatCost: 0,
    icon: Waves,
  },
  {
    id: 'stone_stepping',
    name: { bn: 'সিলেট রিভার স্যান্ডস্টোন স্টেপিং পেভার্স', en: 'Sylhet River Sandstone Stepping Stones' },
    ratePerSqFt: 55,
    flatCost: 0,
    icon: Layers,
  },
  {
    id: 'ambient_lights',
    name: { bn: 'আর্কিটেকচারাল ওয়ার্ম এলইডি গার্ডেন লাইটিং', en: 'Architectural Warm LED Garden Illumination' },
    ratePerSqFt: 0,
    flatCost: 16000,
    icon: Sparkles,
  },
  {
    id: 'water_pond',
    name: { bn: 'বায়ো-ফিল্টার্ড কয় পন্ড / অর্নামেন্টাল ফোয়ারা', en: 'Bio-Filtered Koi Pond / Water Fountain' },
    ratePerSqFt: 0,
    flatCost: 48000,
    icon: Waves,
  },
  {
    id: 'stewardship_amc',
    name: { bn: '১-বছর সার্বিক এগ্রোনমি পরিচর্যা (এএমসি)', en: '1-Year Agronomic Maintenance Stewardship' },
    ratePerSqFt: 0,
    flatCost: 26000,
    icon: CheckCircle2,
  },
]

const AREA_PRESETS = [400, 800, 1500, 2500, 4500]

export default function LandscapeEstimator() {
  const { lang, n } = useLocale()
  const isBn = lang === 'bn'

  const [selectedCategory, setSelectedCategory] = useState(SERVICE_CATEGORIES[0].id)
  const [area, setArea] = useState(800)
  const [selectedAddons, setSelectedAddons] = useState(['waterproofing', 'irrigation_auto'])

  const category = useMemo(
    () => SERVICE_CATEGORIES.find((c) => c.id === selectedCategory) || SERVICE_CATEGORIES[0],
    [selectedCategory]
  )

  const toggleAddon = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  // Cost calculation
  const { minTotal, maxTotal, daysEstimate } = useMemo(() => {
    let baseMin = category.minRate * area
    let baseMax = category.maxRate * area

    let addonCost = 0
    selectedAddons.forEach((addonId) => {
      const addon = ADDONS.find((a) => a.id === addonId)
      if (addon) {
        addonCost += addon.ratePerSqFt * area + addon.flatCost
      }
    })

    const totalMin = Math.round((baseMin + addonCost) / 500) * 500
    const totalMax = Math.round((baseMax + addonCost * 1.1) / 500) * 500

    const days = Math.round(category.baseDays + (area / 1000) * 3)

    return {
      minTotal: totalMin,
      maxTotal: totalMax,
      daysEstimate: days,
    }
  }, [category, area, selectedAddons])

  // Formatting currency in BDT
  const formatBDT = useCallback((amount) => {
    if (isBn) {
      return `৳ ${n(amount.toLocaleString('en-IN'))}`
    }
    return `BDT ${amount.toLocaleString('en-US')}`
  }, [isBn, n])

  const generatedWhatsAppMsg = useMemo(() => {
    const addonNames = selectedAddons
      .map((id) => ADDONS.find((a) => a.id === id)?.name[lang])
      .filter(Boolean)
      .join(', ')

    if (isBn) {
      return `আসসালামু আলাইকুম। আমি ধানসিঁড়ি গার্ডেনের ওয়েবসাইট থেকে ল্যান্ডস্কেপিং কোটেশন হিসাব করেছি:\n- সেবা: ${category.name.bn}\n- আয়তন: ${area} বর্গফুট\n- অতিরিক্ত সুবিধা: ${addonNames || 'কোনোটি নয়'}\n- আনুমানিক প্রাক্কলন: ${formatBDT(minTotal)} থেকে ${formatBDT(maxTotal)}\n\nআমি এই প্রকল্পের জন্য একজন সিনিয়র ল্যান্ডস্কেপ আর্কিটেক্টের সাথে আলোচনা করতে চাই।`
    }
    return `Hello! I calculated a landscape quotation from the Dhanshiri Garden website:\n- Discipline: ${category.name.en}\n- Scope Area: ${area} sq ft\n- Selected Specifications: ${addonNames || 'None'}\n- Estimated Range: ${formatBDT(minTotal)} to ${formatBDT(maxTotal)}\n\nI would like to schedule an on-site consultation with your senior landscape architect.`
  }, [category, area, selectedAddons, minTotal, maxTotal, isBn, lang, formatBDT])

  return (
    <Section id="estimator" className="relative isolate overflow-hidden py-24 sm:py-32">
      {/* Background illumination */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-10 -z-10 size-[32rem] rounded-full bg-bright/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 bottom-10 -z-10 size-[32rem] rounded-full bg-emerald/15 blur-3xl" />

      <Container>
        <SectionHeading
          eyebrow={isBn ? 'স্বচ্ছ স্থাপত্য প্রাক্কলন' : 'Transparent Architectural BOM'}
          icon={Calculator}
          title={isBn ? 'ল্যান্ডস্কেপ প্রকল্প ব্যয় ও ব্যাপ্তি ক্যালকুলেটর' : 'Landscape Project Scope & Investment Estimator'}
          sub={
            isBn
              ? 'আপনার আঙিনা, ছাদ কিংবা এস্টেটের আয়তন ও কাঙ্ক্ষিত উপাদান নির্বাচন করে তাৎক্ষণিক সঠিক বাজেট প্রাক্কলন জেনে নিন।'
              : 'Select your project discipline, area in square feet, and custom architectural features for an instant transparent estimation.'
          }
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* LEFT 7 COLS: Configuration Controls */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Service Discipline Selector */}
            <div className="rounded-3xl glass-panel p-6 sm:p-8 shadow-lift border border-white/85">
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-emerald block mb-3">
                {isBn ? 'পদক্ষেপ ১: ল্যান্ডস্কেপিং ধরন নির্বাচন করুন' : 'STEP 1: SELECT DISCIPLINE'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICE_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id
                  const Icon = cat.icon
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex flex-col text-left p-4 rounded-2xl border transition-all duration-300 ${
                        isSelected
                          ? 'bg-forest text-white border-forest shadow-lift scale-[1.02]'
                          : 'glass-card hover:bg-white text-forest border-forest/10 hover:border-emerald/40'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span
                          className={`size-8 rounded-xl grid place-items-center ${
                            isSelected ? 'bg-white/20 text-white' : 'glass-pill text-emerald'
                          }`}
                        >
                          <Icon className="size-4" />
                        </span>
                        <span
                          className={`text-[0.65rem] font-mono px-2 py-0.5 rounded-full font-bold ${
                            isSelected ? 'bg-emerald text-white' : 'bg-emerald/10 text-emerald'
                          }`}
                        >
                          ৳{cat.minRate}–{cat.maxRate}/sft
                        </span>
                      </div>
                      <strong className={`font-display text-sm font-bold mt-3 leading-snug ${isSelected ? 'text-white' : 'text-forest'}`}>
                        {cat.name[lang]}
                      </strong>
                      <span className={`text-[0.72rem] mt-1 line-clamp-2 leading-relaxed ${isSelected ? 'text-white/80' : 'text-charcoal/70'}`}>
                        {cat.desc[lang]}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 2. Space Size (Square Feet) Slider & Presets */}
            <div className="rounded-3xl glass-panel p-6 sm:p-8 shadow-lift border border-white/85">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-emerald">
                  {isBn ? 'পদক্ষেপ ২: প্রকল্পের আয়তন (বর্গফুট)' : 'STEP 2: PROJECT AREA (SQ FT)'}
                </span>
                <span className="rounded-full bg-forest px-3.5 py-1 text-xs font-mono font-bold text-white shadow-soft">
                  {isBn ? `${n(area)} বর্গফুট` : `${area.toLocaleString()} sq ft`}
                </span>
              </div>

              {/* Range Slider */}
              <input
                type="range"
                min="200"
                max="6000"
                step="50"
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2.5 bg-forest/15 rounded-lg appearance-none cursor-pointer accent-forest my-4"
              />

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs text-charcoal/60 font-medium mr-1">
                  {isBn ? 'দ্রুত মাপ:' : 'Quick Presets:'}
                </span>
                {AREA_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setArea(preset)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                      area === preset
                        ? 'bg-emerald text-white shadow-xs'
                        : 'glass-pill text-forest hover:bg-white'
                    }`}
                  >
                    {isBn ? `${n(preset)} ব.ফু.` : `${preset} sft`}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Addon Specifications */}
            <div className="rounded-3xl glass-panel p-6 sm:p-8 shadow-lift border border-white/85">
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-emerald block mb-3">
                {isBn ? 'পদক্ষেপ ৩: বিশেষায়িত প্রযুক্তি ও উপাদান' : 'STEP 3: ARCHITECTURAL SPECIFICATIONS'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id)
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all ${
                        isChecked
                          ? 'glass-emerald border-emerald/50 shadow-soft'
                          : 'glass-card hover:bg-white text-forest border-forest/10 hover:border-emerald/30'
                      }`}
                    >
                      <span
                        className={`size-5 rounded-lg grid place-items-center shrink-0 mt-0.5 ${
                          isChecked ? 'bg-white text-forest' : 'border border-forest/30 text-transparent'
                        }`}
                      >
                        <CheckCircle2 className="size-4 fill-current" />
                      </span>
                      <div className="min-w-0">
                        <strong className={`block text-xs font-bold leading-snug ${isChecked ? 'text-white' : 'text-forest'}`}>
                          {addon.name[lang]}
                        </strong>
                        <span className={`text-[0.68rem] block mt-0.5 ${isChecked ? 'text-white/80' : 'text-charcoal/65'}`}>
                          {addon.ratePerSqFt > 0 ? `+৳${addon.ratePerSqFt}/sft` : `+৳${addon.flatCost.toLocaleString()}`}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* RIGHT 5 COLS: Sticky Live Estimate Dossier */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="rounded-3xl glass-panel p-6 sm:p-8 shadow-lift border border-white/90 ring-1 ring-forest/10">
              {/* Dossier Header */}
              <div className="flex items-center justify-between border-b border-forest/10 pb-4">
                <div>
                  <span className="text-[0.65rem] font-mono font-bold uppercase tracking-widest text-emerald block">
                    DHANSHIRI ATELIER · BOM
                  </span>
                  <h3 className="font-display text-lg font-bold text-forest">
                    {category.name[lang]}
                  </h3>
                </div>
                <span className="size-10 rounded-2xl glass-pill grid place-items-center text-emerald shadow-xs">
                  <FileSpreadsheet className="size-5" />
                </span>
              </div>

              {/* Estimate Numbers */}
              <div className="py-6 border-b border-forest/10">
                <span className="text-xs font-medium text-charcoal/70 block">
                  {isBn ? 'আনুমানিক বিনিয়োগ প্রাক্কলন (বাজেট রেঞ্জ):' : 'Estimated Investment Range:'}
                </span>
                <div className="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-forest">
                  {formatBDT(minTotal)} <span className="text-emerald text-xl font-normal">—</span> {formatBDT(maxTotal)}
                </div>
                <p className="mt-2 text-xs text-charcoal/75 leading-relaxed">
                  {isBn
                    ? '*প্রকল্পের চূড়ান্ত ড্রয়িং, মাটির গঠন ও সাইট রিকনিসেন্সের ওপর ভিত্তি করে সুনির্দিষ্ট বাজেট নির্ধারিত হয়।'
                    : '*Final figures are calibrated upon on-site topographical analysis and architectural drawings.'}
                </p>
              </div>

              {/* Project Specs Summary */}
              <div className="py-5 space-y-3 text-xs border-b border-forest/10">
                <div className="flex items-center justify-between">
                  <span className="text-charcoal/70 flex items-center gap-1.5">
                    <Layers className="size-3.5 text-emerald" />
                    <span>{isBn ? 'নির্ধারিত আয়তন:' : 'Selected Area:'}</span>
                  </span>
                  <strong className="text-forest font-mono">{area} sq ft</strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-charcoal/70 flex items-center gap-1.5">
                    <Timer className="size-3.5 text-bright" />
                    <span>{isBn ? 'বাস্তবায়ন সময়সীমা:' : 'Execution Timeline:'}</span>
                  </span>
                  <strong className="text-forest font-mono">
                    ~{isBn ? n(daysEstimate) : daysEstimate} {isBn ? 'কার্যদিবস' : 'Working Days'}
                  </strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-charcoal/70 flex items-center gap-1.5">
                    <ShieldCheck className="size-3.5 text-bloom" />
                    <span>{isBn ? 'গুণগত মান সনদ:' : 'Quality Protocol:'}</span>
                  </span>
                  <strong className="text-forest">DAE Certified</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 space-y-3">
                <Button
                  href={getWhatsAppLink(generatedWhatsAppMsg, null, lang)}
                  size="lg"
                  variant="primary"
                  className="w-full justify-center text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lift hover:scale-[1.02]"
                >
                  <MessageCircle className="size-4" />
                  <span>{isBn ? 'এই প্রাক্কলন নিয়ে হোয়াটসঅ্যাপে বুক করুন' : 'Book with this Estimate on WhatsApp'}</span>
                </Button>

                <p className="text-center text-[0.7rem] text-charcoal/60">
                  {isBn
                    ? '⚡ ২৪ ঘণ্টার মধ্যে সিনিয়র ল্যান্ডস্কেপ আর্কিটেক্ট কল করবেন।'
                    : '⚡ A senior landscape architect will connect within 24 hours.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
