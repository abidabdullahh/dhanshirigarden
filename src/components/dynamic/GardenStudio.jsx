import { useEffect, useMemo, useState } from 'react'
import {
  Building2,
  Check,
  Compass,
  MessageCircle,
  PencilRuler,
  ShieldCheck,
  Sparkles,
  ThermometerSnowflake,
  Wind,
} from 'lucide-react'
import { useLocale } from '../../lib/locale'
import { getWhatsAppLink } from '../../lib/whatsapp'
import Button from '../ui/Button'
import { Container, Section, SectionHeading } from '../ui/Section'
import InteractiveCard3D from './InteractiveCard3D'

export default function GardenStudio() {
  const { t, lang, n } = useLocale()
  const copy = t.gardenStudio

  // Configurator state
  const [spaceIndex, setSpaceIndex] = useState(0) // rooftop default
  const [areaSqft, setAreaSqft] = useState(650)
  const [turfIndex, setTurfIndex] = useState(0) // korean turf
  const [activeFeatures, setActiveFeatures] = useState({
    pergola: true,
    fruitTrees: true,
    flowerBeds: true,
    smartDrip: true,
    lighting: false,
    waterFeature: false,
    drainage: true,
  })

  // Listen for plant selections from the PlantExplorer
  useEffect(() => {
    const handlePlantSelect = (e) => {
      const { plantId } = e.detail
      if (plantId.includes('turf')) {
        setTurfIndex(0)
      } else if (plantId.includes('guava') || plantId.includes('lebu') || plantId.includes('mango')) {
        setActiveFeatures((prev) => ({ ...prev, fruitTrees: true }))
      } else if (plantId.includes('jasmine') || plantId.includes('hasnahana') || plantId.includes('bougainvillea')) {
        setActiveFeatures((prev) => ({ ...prev, flowerBeds: true }))
      }
    }
    window.addEventListener('dg:plant-selected', handlePlantSelect)
    return () => window.removeEventListener('dg:plant-selected', handlePlantSelect)
  }, [])

  const currentSpace = copy.spaces[spaceIndex]

  const toggleFeature = (key) => {
    setActiveFeatures((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // Dynamic engineering calculations
  const metrics = useMemo(() => {
    const spaceRates = [140, 110, 160, 95]
    const baseRate = spaceRates[spaceIndex] || 130

    let featureTotal = 0
    if (activeFeatures.pergola) featureTotal += 45000
    if (activeFeatures.fruitTrees) featureTotal += 18000
    if (activeFeatures.flowerBeds) featureTotal += 12000
    if (activeFeatures.smartDrip) featureTotal += 16000
    if (activeFeatures.lighting) featureTotal += 15000
    if (activeFeatures.waterFeature) featureTotal += 28000
    if (activeFeatures.drainage) featureTotal += areaSqft * 35

    const baseCost = areaSqft * baseRate + featureTotal
    const minCost = Math.round((baseCost * 0.9) / 1000) * 1000
    const maxCost = Math.round((baseCost * 1.15) / 1000) * 1000

    const oxygen = Math.round(areaSqft * 0.28)
    const loadKg = Math.min(24, Math.round(14 + (areaSqft / 1000) * 2.5))

    return {
      minCost,
      maxCost,
      oxygen,
      loadKg,
    }
  }, [spaceIndex, areaSqft, activeFeatures])

  // Formulate WhatsApp message with prefilled blueprint specifications
  const whatsappBlueprint = useMemo(() => {
    const spaceTitle = currentSpace.name
    const turfName = copy.turfOptions[turfIndex]
    const activeFeatList = Object.keys(activeFeatures)
      .filter((k) => activeFeatures[k])
      .map((k) => copy.features[k])
      .join(', ')

    if (lang === 'bn') {
      return `আসসালামু আলাইকুম জনাব আমির আলী,
আমি ধানসিঁড়ি ওয়েবসাইটের 'ইন্টারেক্টিভ ডিজাইন স্টুডিও' থেকে আমার বাগানের একটি খসড়া পরিকল্পনা করেছি:
• স্থান: ${spaceTitle}
• আনুমানিক আয়তন: ${areaSqft} বর্গফুট
• ঘাসের ধরন: ${turfName}
• নির্বাচিত উপাদান: ${activeFeatList}
• সম্ভাব্য বাজেট পরিধি: ৳${metrics.minCost.toLocaleString()} - ৳${metrics.maxCost.toLocaleString()}

আমি এটি সরেজমিনে বাস্তবায়ন ও পরামর্শের জন্য আপনার সাথে আলোচনা করতে চাই।`
    }

    return `Hello Mr. Amir Ali,
I have configured a garden layout on Dhanshiri Garden's Interactive Design Studio:
• Space Type: ${spaceTitle}
• Estimated Area: ${areaSqft} sq.ft
• Turf / Grass: ${turfName}
• Selected Features: ${activeFeatList}
• Estimated Investment: BDT ${metrics.minCost.toLocaleString()} - ${metrics.maxCost.toLocaleString()}

I would like to schedule an on-site consultation.`
  }, [currentSpace, areaSqft, turfIndex, activeFeatures, metrics, copy, lang])

  return (
    <Section id="studio" className="relative overflow-hidden bg-gradient-to-b from-transparent via-mint/25 to-transparent">
      <div aria-hidden="true" className="absolute -left-20 top-40 -z-10 size-[32rem] rounded-full bg-bright/15 blur-3xl" />
      <div aria-hidden="true" className="absolute -right-20 bottom-20 -z-10 size-[32rem] rounded-full bg-bloom/10 blur-3xl" />

      <Container>
        <SectionHeading
          eyebrow={copy.eyebrow}
          icon={PencilRuler}
          title={copy.title}
          sub={copy.sub}
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* LEFT: Controls & Configuration Column */}
          <div className="space-y-6 lg:col-span-6">
            {/* 1. Space Type Selection */}
            <div className="rounded-[2rem] glass-card p-5 shadow-soft ring-1 ring-bright/25 sm:p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-forest/70">
                1. {lang === 'bn' ? 'স্থানের ধরন নির্বাচন করুন' : 'Select Project Space'}
              </span>
              <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {copy.spaces.map((sp, idx) => {
                  const isActive = spaceIndex === idx
                  return (
                    <button
                      key={sp.id}
                      type="button"
                      onClick={() => setSpaceIndex(idx)}
                      className={`flex flex-col items-center justify-center rounded-2xl p-3 text-center transition-all duration-300 ${
                        isActive
                          ? 'bg-forest text-white shadow-soft scale-105 ring-2 ring-emerald'
                          : 'glass-white text-forest/80 hover:bg-forest/10 hover:text-forest'
                      }`}
                    >
                      <Building2 className="size-5 mb-1 text-bright" />
                      <strong className="text-xs font-bold leading-tight">{sp.name}</strong>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 2. Area Slider */}
            <div className="rounded-[2rem] glass-card p-5 shadow-soft ring-1 ring-bright/25 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-forest/70">
                  2. {copy.areaLabel}
                </span>
                <span className="rounded-full bg-forest px-3.5 py-1 font-display text-sm font-bold text-white shadow-xs">
                  {n(areaSqft)} {copy.sqftUnit}
                </span>
              </div>
              <div className="mt-4">
                <input
                  type="range"
                  min="150"
                  max="4500"
                  step="50"
                  value={areaSqft}
                  onChange={(e) => setAreaSqft(Number(e.target.value))}
                  className="w-full accent-forest cursor-pointer"
                />
                <div className="mt-1 flex justify-between text-[0.72rem] text-charcoal/60">
                  <span>{n(150)} {copy.sqftUnit}</span>
                  <span>{n(1500)} {copy.sqftUnit}</span>
                  <span>{n(3000)} {copy.sqftUnit}</span>
                  <span>{n(4500)}+ {copy.sqftUnit}</span>
                </div>
              </div>
            </div>

            {/* 3. Turf Selection */}
            <div className="rounded-[2rem] glass-card p-5 shadow-soft ring-1 ring-bright/25 sm:p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-forest/70">
                3. {copy.turfLabel}
              </span>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {copy.turfOptions.map((opt, idx) => {
                  const isSelected = turfIndex === idx
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setTurfIndex(idx)}
                      className={`flex items-center gap-2.5 rounded-xl p-2.5 text-left text-xs font-semibold transition-all duration-200 ${
                        isSelected
                          ? 'bg-forest text-white shadow-soft ring-1 ring-emerald'
                          : 'glass-white text-forest/80 hover:bg-forest/10 hover:text-forest'
                      }`}
                    >
                      <span className={`grid size-4 shrink-0 place-items-center rounded-full border ${isSelected ? 'border-white bg-bright text-forest' : 'border-forest/40'}`}>
                        {isSelected && <Check className="size-3 stroke-[3]" />}
                      </span>
                      <span>{opt}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 4. Garden Features Toggles */}
            <div className="rounded-[2rem] glass-card p-5 shadow-soft ring-1 ring-bright/25 sm:p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-forest/70">
                4. {copy.featuresLabel}
              </span>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {Object.keys(copy.features).map((featKey) => {
                  const isChecked = activeFeatures[featKey]
                  return (
                    <button
                      key={featKey}
                      type="button"
                      onClick={() => toggleFeature(featKey)}
                      className={`flex items-center gap-2.5 rounded-xl p-2.5 text-left text-xs font-medium transition-all duration-200 ${
                        isChecked
                          ? 'bg-mint/60 border border-emerald/50 text-forest font-semibold'
                          : 'glass-white border border-forest/10 text-charcoal/70 hover:bg-white'
                      }`}
                    >
                      <span className={`grid size-4 shrink-0 place-items-center rounded-sm border ${isChecked ? 'border-emerald bg-emerald text-white' : 'border-charcoal/30'}`}>
                        {isChecked && <Check className="size-3 stroke-[3]" />}
                      </span>
                      <span>{copy.features[featKey]}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: Live 2.5D Isometric Architectural Blueprint & Calculation Card */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <InteractiveCard3D
              maxTilt={4}
              className="rounded-[2.5rem] glass-card p-6 shadow-lift ring-1 ring-bright/35 sm:p-8"
            >
              {/* Card top banner */}
              <div className="flex items-center justify-between border-b border-forest/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-9 place-items-center rounded-xl bg-forest text-white">
                    <Compass className="size-5 text-bloom animate-spin-slow" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-forest">{copy.blueprintHeading}</h3>
                    <span className="text-xs text-charcoal/65">{currentSpace.name} ({n(areaSqft)} {copy.sqftUnit})</span>
                  </div>
                </div>

                <span className="rounded-full bg-bright/25 px-3 py-1 text-xs font-bold text-forest border border-bright/40">
                  {lang === 'bn' ? 'সরাসরি সিমুলেশন' : 'Live Simulation'}
                </span>
              </div>

              {/* Dynamic 2.5D Schematic Visual Layout */}
              <div className="relative my-6 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900/10 via-mint/30 to-cream border border-forest/15 p-4">
                <svg viewBox="0 0 500 300" className="h-full w-full overflow-visible">
                  <defs>
                    <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2d6a4f" strokeWidth="0.5" opacity="0.15" />
                    </pattern>
                  </defs>

                  {/* Blueprint grid ground */}
                  <polygon points="250,30 470,140 250,260 30,140" fill="url(#gridPattern)" stroke="#2d6a4f" strokeWidth="1.5" opacity="0.8" />

                  {/* Base Green Lawn / Patio Carpet */}
                  {turfIndex !== 3 && (
                    <polygon
                      points="250,45 450,140 250,245 50,140"
                      fill="#52b788"
                      fillOpacity="0.45"
                      stroke="#2d6a4f"
                      strokeWidth="2"
                      className="transition-all duration-500"
                    />
                  )}

                  {/* Drainage layer matrix indicator */}
                  {activeFeatures.drainage && (
                    <path
                      d="M60 145 L250 250 L440 145"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      opacity="0.7"
                    />
                  )}

                  {/* Automated Drip Irrigation pulses */}
                  {activeFeatures.smartDrip && (
                    <g className="animate-pulse">
                      <path d="M120 120 Q250 80 380 120 Q250 210 120 120" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
                      <circle cx="180" cy="115" r="3" fill="#0284c7" />
                      <circle cx="320" cy="115" r="3" fill="#0284c7" />
                      <circle cx="250" cy="165" r="3" fill="#0284c7" />
                    </g>
                  )}

                  {/* Timber Pergola module */}
                  {activeFeatures.pergola && (
                    <g transform="translate(180, 50)" className="transition-all duration-500">
                      <line x1="20" y1="80" x2="20" y2="20" stroke="#78350f" strokeWidth="4" />
                      <line x1="120" y1="80" x2="120" y2="20" stroke="#78350f" strokeWidth="4" />
                      <line x1="60" y1="100" x2="60" y2="40" stroke="#78350f" strokeWidth="4" />
                      <line x1="160" y1="100" x2="160" y2="40" stroke="#78350f" strokeWidth="4" />
                      <path d="M10 20 L130 20 L170 40 L50 40 Z" fill="#92400e" opacity="0.8" />
                      <circle cx="40" cy="22" r="8" fill="#f43f5e" opacity="0.9" />
                      <circle cx="90" cy="24" r="9" fill="#db2777" opacity="0.9" />
                      <circle cx="140" cy="32" r="7" fill="#fb7185" opacity="0.9" />
                    </g>
                  )}

                  {/* Fruit Tree Orchard Zone */}
                  {activeFeatures.fruitTrees && (
                    <g transform="translate(60, 90)">
                      <rect x="25" y="55" width="8" height="40" rx="2" fill="#78350f" />
                      <circle cx="29" cy="40" r="30" fill="#2d6a4f" opacity="0.9" />
                      <circle cx="40" cy="28" r="22" fill="#52b788" opacity="0.9" />
                      <circle cx="20" cy="35" r="4" fill="#f59e0b" />
                      <circle cx="36" cy="45" r="4.5" fill="#84cc16" />
                      <circle cx="32" cy="22" r="4" fill="#ef4444" />
                    </g>
                  )}

                  {/* Fragrant Flowers Bed */}
                  {activeFeatures.flowerBeds && (
                    <g transform="translate(340, 140)">
                      <polygon points="0,20 60,0 90,20 30,40" fill="#d8f3dc" stroke="#2d6a4f" strokeWidth="1.5" />
                      <circle cx="25" cy="18" r="5" fill="#ffffff" stroke="#eab308" strokeWidth="1.5" />
                      <circle cx="45" cy="12" r="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
                      <circle cx="65" cy="20" r="5" fill="#ffffff" stroke="#eab308" strokeWidth="1.5" />
                    </g>
                  )}

                  {/* Zen Fountain / Lily pond */}
                  {activeFeatures.waterFeature && (
                    <g transform="translate(220, 180)">
                      <ellipse cx="30" cy="20" rx="30" ry="16" fill="#38bdf8" fillOpacity="0.5" stroke="#0284c7" strokeWidth="2" />
                      <circle cx="30" cy="20" r="4" fill="#ffffff" className="animate-ping" />
                      <circle cx="30" cy="20" r="6" fill="#0284c7" />
                    </g>
                  )}

                  {/* Night LED Uplighting rays */}
                  {activeFeatures.lighting && (
                    <g>
                      <path d="M120 180 L160 120" stroke="#fde047" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
                      <path d="M380 180 L340 120" stroke="#fde047" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
                      <circle cx="120" cy="180" r="4" fill="#eab308" />
                      <circle cx="380" cy="180" r="4" fill="#eab308" />
                    </g>
                  )}
                </svg>

                {/* Floating load indicator */}
                <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-forest/85 px-3 py-1 text-[0.72rem] font-bold text-white backdrop-blur-md">
                  <ShieldCheck className="size-3.5 text-bright" />
                  <span>{copy.safeWeight} ({n(metrics.loadKg)} kg/sq.ft)</span>
                </div>
              </div>

              {/* Dynamic Metrics Row */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-forest/5 p-3 text-center border border-forest/10">
                  <ThermometerSnowflake className="mx-auto size-4 text-sky-600 mb-1" />
                  <span className="block text-[0.68rem] text-charcoal/70 uppercase font-semibold">{copy.coolingIndex}</span>
                  <strong className="block font-display text-sm font-bold text-forest">{copy.coolingVal}</strong>
                </div>

                <div className="rounded-2xl bg-forest/5 p-3 text-center border border-forest/10">
                  <Wind className="mx-auto size-4 text-emerald mb-1" />
                  <span className="block text-[0.68rem] text-charcoal/70 uppercase font-semibold">{copy.oxygenMetric}</span>
                  <strong className="block font-display text-sm font-bold text-forest">{n(metrics.oxygen)} {lang === 'bn' ? 'লিটার/দিন' : 'L/day'}</strong>
                </div>

                <div className="col-span-2 sm:col-span-1 rounded-2xl bg-bloom/15 p-3 text-center border border-bloom/30">
                  <Sparkles className="mx-auto size-4 text-bloom mb-1" />
                  <span className="block text-[0.68rem] text-charcoal/70 uppercase font-semibold">{copy.estBudget}</span>
                  <strong className="block font-display text-sm font-bold text-forest">
                    {copy.currencySymbol}{n(metrics.minCost.toLocaleString())} - {n(metrics.maxCost.toLocaleString())}
                  </strong>
                </div>
              </div>

              {/* Action Button: Export customized blueprint to WhatsApp */}
              <div className="mt-6">
                <Button
                  href={getWhatsAppLink(whatsappBlueprint, null, lang)}
                  size="lg"
                  icon={MessageCircle}
                  className="w-full shadow-lift text-sm sm:text-base"
                >
                  {copy.bookPlan}
                </Button>
                <p className="mt-2.5 text-center text-[0.72rem] text-charcoal/60">
                  {copy.customNote}
                </p>
              </div>
            </InteractiveCard3D>
          </div>
        </div>
      </Container>
    </Section>
  )
}
