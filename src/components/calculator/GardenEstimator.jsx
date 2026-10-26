import { useMemo, useState } from 'react'
import {
  Building2,
  Calculator,
  CheckCircle2,
  Clock,
  Layers,
  MessageCircle,
  Package,
  Phone,
  Sparkles,
  Sprout,
  TreePine,
} from 'lucide-react'
import { site } from '../../data/site'
import { formatNumber } from '../../lib/format'
import { useLocale } from '../../lib/locale'
import { getCustomWhatsAppLink } from '../../lib/whatsapp'
import Button from '../ui/Button'
import { PlanTree } from '../ui/Doodles'
import { Container, Section, SectionHeading } from '../ui/Section'

const TYPE_CONFIG = {
  rooftop: {
    icon: Building2,
    minRate: 120,
    maxRate: 220,
    daysFactor: 0.007,
    baseDays: 3,
    plantsPerSqft: 0.07,
    plantersPerSqft: 0.016,
  },
  lawn: {
    icon: Sprout,
    minRate: 45,
    maxRate: 85,
    daysFactor: 0.005,
    baseDays: 2,
    plantsPerSqft: 0,
    plantersPerSqft: 0,
  },
  vertical: {
    icon: Layers,
    minRate: 350,
    maxRate: 650,
    daysFactor: 0.009,
    baseDays: 4,
    plantsPerSqft: 0.28,
    plantersPerSqft: 0.06,
  },
  landscape: {
    icon: TreePine,
    minRate: 80,
    maxRate: 150,
    daysFactor: 0.006,
    baseDays: 4,
    plantsPerSqft: 0.05,
    plantersPerSqft: 0.01,
  },
}

const ADDON_CONFIG = {
  irrigation: 15,
  fertilizer: 10,
  care: 12,
}

const QUICK_PRESETS = [250, 500, 1000, 1800, 2500]

export default function GardenEstimator() {
  const { t, lang, n } = useLocale()
  const copy = t.estimator
  const [selectedType, setSelectedType] = useState('rooftop')
  const [area, setArea] = useState(600)
  const [addons, setAddons] = useState({
    irrigation: true,
    fertilizer: true,
    care: false,
  })

  const typeConfig = TYPE_CONFIG[selectedType]
  const typeCopy = copy.types[selectedType]

  const toggleAddon = (key) => {
    setAddons((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const calculation = useMemo(() => {
    let addonRate = 0
    if (addons.irrigation) addonRate += ADDON_CONFIG.irrigation
    if (addons.fertilizer) addonRate += ADDON_CONFIG.fertilizer
    if (addons.care) addonRate += ADDON_CONFIG.care

    const minTotal = Math.round((typeConfig.minRate + addonRate) * area)
    const maxTotal = Math.round((typeConfig.maxRate + addonRate) * area)

    const minDays = Math.max(typeConfig.baseDays, Math.round(typeConfig.baseDays + area * typeConfig.daysFactor))
    const maxDays = minDays + 3

    const plantCount = Math.max(12, Math.round(area * typeConfig.plantsPerSqft))
    const planterCount = Math.max(4, Math.round(area * typeConfig.plantersPerSqft))

    return {
      minTotal,
      maxTotal,
      minDays,
      maxDays,
      plantCount,
      planterCount,
    }
  }, [area, addons, typeConfig])

  const whatsappMessage = useMemo(() => {
    const minStr = formatNumber(calculation.minTotal, lang)
    const maxStr = formatNumber(calculation.maxTotal, lang)
    const areaStr = formatNumber(area, lang)

    if (lang === 'bn') {
      return `আসসালামু আলাইকুম, আমি ধানসিঁড়ি গার্ডেনের ওয়েবসাইট ক্যালকুলেটর থেকে একটি প্রাক্কলন পেয়েছি:
• প্রকল্পের ধরন: ${typeCopy.name}
• জায়গার আয়তন: ${areaStr} বর্গফুট
• আনুমানিক বাজেট: ৳${minStr} – ৳${maxStr}
• আনুমানিক সময়: ${calculation.minDays}-${calculation.maxDays} কর্মদিবস

আমি কৃষিবিদ আমির আলীর সাথে এই প্রজেক্ট নিয়ে কথা বলতে চাই।`
    }

    return `Hello, I generated a preliminary estimate on your website calculator:
• Project Type: ${typeCopy.name}
• Area Size: ${areaStr} sq.ft
• Estimated Budget: ${minStr} – ${maxStr} BDT
• Estimated Timeline: ${calculation.minDays}-${calculation.maxDays} working days

I would like to consult with Agronomist Amir Ali regarding this project.`
  }, [typeCopy.name, area, calculation, lang])

  return (
    <Section id="estimator" className="relative overflow-hidden bg-linear-to-b from-white/70 via-mint/35 to-transparent">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-20 -z-10 size-96 rounded-full bg-bright/20 blur-3xl" />
      <PlanTree className="pointer-events-none absolute -left-20 bottom-12 -z-10 size-80 text-forest/[0.07]" />

      <Container>
        <SectionHeading
          eyebrow={copy.eyebrow}
          icon={Calculator}
          title={copy.title}
          sub={copy.sub}
        />

        <div className="relative mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Controls Column */}
          <div className="rounded-[2.5rem] glass-white p-6 shadow-lift sm:p-8 lg:col-span-7">
            {/* Step 1: Service Type Selection */}
            <div>
              <label className="mb-4 block font-display text-lg font-bold text-forest">
                ১. {lang === 'bn' ? 'প্রকল্পের ধরন নির্বাচন করুন' : 'Select Project Type'}
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                {Object.keys(copy.types).map((key) => {
                  const cfg = TYPE_CONFIG[key]
                  const Icon = cfg.icon
                  const item = copy.types[key]
                  const isSelected = selectedType === key

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedType(key)}
                      className={`group relative flex flex-col items-start rounded-2xl p-4 text-left transition-all duration-200 ${
                        isSelected
                          ? 'bg-forest text-white shadow-soft ring-2 ring-forest'
                          : 'bg-white/80 text-charcoal hover:bg-white hover:shadow-soft'
                      }`}
                    >
                      <div className="flex w-full items-center justify-between">
                        <span
                          className={`grid size-10 place-items-center rounded-xl transition-colors ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-mint text-emerald'
                          }`}
                        >
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        {isSelected && <CheckCircle2 className="size-5 text-bloom" aria-hidden="true" />}
                      </div>
                      <h4 className="mt-3 font-display text-[1.05rem] font-bold leading-tight">{item.name}</h4>
                      <p className={`mt-1 text-xs leading-snug ${isSelected ? 'text-white/80' : 'text-charcoal/70'}`}>
                        {item.tagline}
                      </p>
                      <span className={`mt-2.5 inline-block text-[0.8rem] font-semibold ${isSelected ? 'text-bloom' : 'text-emerald'}`}>
                        {item.rate}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 2: Area Slider */}
            <div className="mt-8 border-t border-dashed border-forest/15 pt-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <label htmlFor="area-slider" className="font-display text-lg font-bold text-forest">
                  ২. {copy.areaLabel}
                </label>
                <div className="flex items-center gap-2 rounded-2xl bg-forest px-4 py-1.5 text-white shadow-soft">
                  <span className="font-display text-2xl font-extrabold tracking-tight tabular-nums">
                    {formatNumber(area, lang)}
                  </span>
                  <span className="text-xs font-medium text-white/80">{copy.summary.sqftUnit}</span>
                </div>
              </div>

              {/* Slider */}
              <div className="mt-6">
                <input
                  id="area-slider"
                  type="range"
                  min="100"
                  max="3500"
                  step="50"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-mint accent-emerald outline-none transition"
                />
                <div className="mt-2 flex justify-between text-xs font-semibold text-charcoal/50 tabular-nums">
                  <span>{copy.minArea} {copy.summary.sqftUnit}</span>
                  <span>{copy.maxArea} {copy.summary.sqftUnit}</span>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-charcoal/60">
                  {lang === 'bn' ? 'জনপ্রিয় সাইজ:' : 'Presets:'}
                </span>
                {QUICK_PRESETS.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setArea(val)}
                    className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                      area === val
                        ? 'bg-emerald text-white'
                        : 'bg-white text-forest hover:bg-mint'
                    }`}
                  >
                    {formatNumber(val, lang)} {copy.summary.sqftUnit}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Add-ons */}
            <div className="mt-8 border-t border-dashed border-forest/15 pt-7">
              <label className="mb-3 block font-display text-lg font-bold text-forest">
                ৩. {copy.addonsLabel}
              </label>
              <div className="grid gap-3">
                {Object.keys(copy.addons).map((key) => {
                  const addon = copy.addons[key]
                  const isChecked = addons[key]
                  return (
                    <label
                      key={key}
                      className={`flex cursor-pointer items-start gap-3 rounded-2xl p-3.5 transition ${
                        isChecked ? 'bg-mint/60 ring-1 ring-emerald/30' : 'bg-white/60 hover:bg-white'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleAddon(key)}
                        className="mt-1 size-5 rounded border-forest text-emerald accent-emerald focus:ring-emerald"
                      />
                      <div className="flex-1 text-left">
                        <span className="block font-display text-[0.98rem] font-bold text-forest leading-tight">
                          {addon.title}
                        </span>
                        <span className="block text-xs text-charcoal/70">{addon.desc}</span>
                      </div>
                    </label>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="flex flex-col rounded-[2.5rem] glass-green-strong p-6 shadow-lift sm:p-8 lg:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="grid size-10 place-items-center rounded-xl bg-forest text-white">
                <Sparkles className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h4 className="font-display text-xl font-extrabold text-forest">{copy.summary.budgetTitle}</h4>
                <p className="text-xs font-semibold text-emerald">{typeCopy.name} ({formatNumber(area, lang)} {copy.summary.sqftUnit})</p>
              </div>
            </div>

            {/* Main Price Tag */}
            <div className="my-6 rounded-3xl bg-white/90 p-5 shadow-soft text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-charcoal/60">
                {lang === 'bn' ? 'সম্ভাব্য বাজেট প্রাক্কলন' : 'Estimated Investment Range'}
              </p>
              <p className="mt-2 font-display text-[clamp(1.8rem,3.4vw,2.5rem)] font-extrabold leading-none text-forest">
                ৳{formatNumber(calculation.minTotal, lang)} – ৳{formatNumber(calculation.maxTotal, lang)}
              </p>
              <p className="mt-2 text-xs font-medium text-emerald">
                {lang === 'bn' ? 'সকল ম্যাটেরিয়াল, সয়েল ও প্রাথমিক রোপণসহ' : 'Includes all soil mix, primary plants & initial labor'}
              </p>
            </div>

            {/* Breakdown Cards */}
            <div className="grid gap-3 text-sm">
              <div className="flex items-center justify-between rounded-2xl bg-white/60 px-4 py-3 text-charcoal/85">
                <span className="flex items-center gap-2 font-medium">
                  <Clock className="size-4 text-emerald" aria-hidden="true" />
                  {copy.summary.timelineTitle}
                </span>
                <span className="font-bold text-forest tabular-nums">
                  {n(calculation.minDays)}–{n(calculation.maxDays)} {copy.summary.timelineDays}
                </span>
              </div>

              {calculation.plantCount > 0 && (
                <div className="flex items-center justify-between rounded-2xl bg-white/60 px-4 py-3 text-charcoal/85">
                  <span className="flex items-center gap-2 font-medium">
                    <Sprout className="size-4 text-emerald" aria-hidden="true" />
                    {copy.summary.plantsTitle}
                  </span>
                  <span className="font-bold text-forest tabular-nums">
                    {formatNumber(calculation.plantCount, lang)}+
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between rounded-2xl bg-white/60 px-4 py-3 text-charcoal/85">
                <span className="flex items-center gap-2 font-medium">
                  <Package className="size-4 text-emerald" aria-hidden="true" />
                  {copy.summary.breakdownTitle}
                </span>
                <span className="font-bold text-forest">
                  {copy.summary.soilMix}
                </span>
              </div>
            </div>

            <p className="mt-4 text-[0.8rem] leading-relaxed text-charcoal/65">
              {copy.summary.disclaimer}
            </p>

            {/* Action Buttons */}
            <div className="mt-auto pt-6 flex flex-col gap-2.5">
              <Button
                href={getCustomWhatsAppLink(whatsappMessage)}
                size="lg"
                icon={MessageCircle}
                className="w-full justify-center shadow-soft"
              >
                {copy.summary.cta}
              </Button>
              <Button
                href={`tel:${site.phones[0].tel}`}
                variant="white"
                size="md"
                icon={Phone}
                className="w-full justify-center"
              >
                {copy.summary.consultTitle}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
