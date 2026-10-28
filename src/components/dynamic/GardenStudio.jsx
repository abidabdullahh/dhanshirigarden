import { useEffect, useMemo, useState } from 'react'
import { Check, Compass, MessageCircle, PencilRuler } from 'lucide-react'
import { useLocale } from '../../lib/locale'
import { getWhatsAppLink } from '../../lib/whatsapp'
import Button from '../ui/Button'
import { Container, Section, SectionHeading } from '../ui/Section'

export default function GardenStudio() {
  const { t, lang, n } = useLocale()
  const copy = t.gardenStudio

  // Configurator state
  const [spaceIndex, setSpaceIndex] = useState(0) // rooftop default
  const [areaSqft, setAreaSqft] = useState(650)
  const [turfIndex, setTurfIndex] = useState(0) // 0: Korean, 1: Bermuda, 2: Zoysia, 3: Deck
  const [activeTab, setActiveTab] = useState('canvas') // 'canvas' or 'boq'

  const [activeLayers, setActiveLayers] = useState({
    waterproofing: true,
    drainage: true,
    soil: true,
    turf: true,
    fruitTrees: true,
    pergola: true,
    smartDrip: true,
    lighting: true,
  })

  // Listen for plant selections from PlantExplorer
  useEffect(() => {
    const handlePlantSelect = (e) => {
      const { plantId } = e.detail
      if (plantId.includes('turf')) {
        setTurfIndex(0)
      } else if (plantId.includes('guava') || plantId.includes('lebu') || plantId.includes('mango')) {
        setActiveLayers((prev) => ({ ...prev, fruitTrees: true }))
      } else if (plantId.includes('jasmine') || plantId.includes('hasnahana') || plantId.includes('bougainvillea')) {
        setActiveLayers((prev) => ({ ...prev, pergola: true }))
      }
    }
    window.addEventListener('dg:plant-selected', handlePlantSelect)
    return () => window.removeEventListener('dg:plant-selected', handlePlantSelect)
  }, [])

  const currentSpace = copy.spaces[spaceIndex]

  const toggleLayer = (key) => {
    setActiveLayers((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // Realistic Agronomy & Structural BOQ Cost calculation
  const boq = useMemo(() => {
    const baseSqft = areaSqft

    // Base waterproofing and root barrier (BDT 110/sqft)
    const waterproofingCost = activeLayers.waterproofing ? baseSqft * 115 : 0

    // Drainage cell layer + geo-textile filter fabric (BDT 95/sqft)
    const drainageCost = activeLayers.drainage ? baseSqft * 95 : 0

    // Engineered lightweight soil media mix (BDT 135/sqft)
    const soilCost = activeLayers.soil ? baseSqft * 135 : 0

    // Turf cost depending on selection (Korean BDT 80, Bermuda BDT 65, Zoysia BDT 90, WPC Decking BDT 320)
    const turfRates = [85, 70, 95, 340]
    const turfCost = activeLayers.turf ? (baseSqft * 0.6) * turfRates[turfIndex] : 0

    // Container fruit trees + potting substrate
    const fruitTreeCost = activeLayers.fruitTrees ? Math.max(4, Math.floor(baseSqft / 90)) * 2600 : 0

    // Treated timber / MS pergola structure
    const pergolaCost = activeLayers.pergola ? Math.min(220, baseSqft * 0.25) * 650 : 0

    // Automated timer-controlled micro-drip network
    const dripCost = activeLayers.smartDrip ? baseSqft * 38 + 5500 : 0

    // IP68 LED landscape uplighting
    const lightingCost = activeLayers.lighting ? Math.max(3, Math.floor(baseSqft / 80)) * 1400 : 0

    const subtotal = Math.round(
      waterproofingCost +
      drainageCost +
      soilCost +
      turfCost +
      fruitTreeCost +
      pergolaCost +
      dripCost +
      lightingCost
    )

    const minEstimate = Math.round(subtotal * 0.95)
    const maxEstimate = Math.round(subtotal * 1.15)

    // Structural dead load calculation (BNBC 2020 residential roof compliance is max 400 kg/sqm ~ 37 kg/sqft)
    let deadLoadKg = 12 // base construction
    if (activeLayers.waterproofing) deadLoadKg += 4
    if (activeLayers.drainage) deadLoadKg += 3
    if (activeLayers.soil) deadLoadKg += 14
    if (activeLayers.turf) deadLoadKg += 3
    if (activeLayers.fruitTrees) deadLoadKg += 6

    const coolingDelta = (activeLayers.turf ? 3.5 : 0) + (activeLayers.soil ? 2.5 : 0) + (activeLayers.pergola ? 2.0 : 0)

    const items = [
      { name: lang === 'bn' ? '৫-স্তর রুট-ব্যারিয়ার ওয়াটারপ্রুফিং মেমব্রেন' : '5-Layer Root Barrier Waterproofing', cost: waterproofingCost, active: activeLayers.waterproofing },
      { name: lang === 'bn' ? 'এইচডিপিই ইন্টারলকিং ড্রেনেজ সেল ও জিওটেক্সটাইল' : 'HDPE Interlocking Drainage Cells & Geotextile', cost: drainageCost, active: activeLayers.drainage },
      { name: lang === 'bn' ? 'হালকা ওজনের ভার্মিকম্পোস্ট-পার্লাইট গ্রোয়িং মিডিয়া' : 'Lightweight Vermicompost-Perlite Engineered Soil', cost: soilCost, active: activeLayers.soil },
      { name: `${copy.turfOptions[turfIndex]} ${lang === 'bn' ? 'কার্পেটিং' : 'Carpeting'}`, cost: turfCost, active: activeLayers.turf },
      { name: lang === 'bn' ? 'কলম করা ফলদ ও নান্দনিক উদ্ভিদের কালেকশন' : 'Grafted Fruit Trees & Architectural Flora', cost: fruitTreeCost, active: activeLayers.fruitTrees },
      { name: lang === 'bn' ? 'ট্রিটেড টিম্বার পারগোলা ও লতা ট্রেলিস' : 'Treated Timber Pergola & Trellis Structure', cost: pergolaCost, active: activeLayers.pergola },
      { name: lang === 'bn' ? 'স্মার্ট টাইমার নিয়ন্ত্রিত অটো-ড্রিপ ইরিগেশন' : 'Smart Timer Automated Micro-Drip Irrigation', cost: dripCost, active: activeLayers.smartDrip },
      { name: lang === 'bn' ? 'ওয়াটারপ্রুফ ওয়ার্ম-হোয়াইট আর্কিটেকচারাল লাইটিং' : 'IP68 Waterproof Architectural Uplighting', cost: lightingCost, active: activeLayers.lighting },
    ]

    return {
      subtotal,
      minEstimate,
      maxEstimate,
      deadLoadKg,
      coolingDelta: coolingDelta.toFixed(1),
      items,
    }
  }, [areaSqft, turfIndex, activeLayers, lang, copy])

  const whatsappBlueprint = useMemo(() => {
    return `Dhanshiri Garden Architecture Studio Blueprint:
• Selected Space: ${currentSpace.name} (${areaSqft} sq.ft)
• Selected Turf: ${copy.turfOptions[turfIndex]}
• Active Layers: ${Object.keys(activeLayers).filter((k) => activeLayers[k]).join(', ')}
• Structural Load: ${boq.deadLoadKg} kg/sq.ft (BNBC Compliant)
• Expected Ambient Roof Cooling: -${boq.coolingDelta}°C
• Estimated BOQ Budget: BDT ${boq.minEstimate.toLocaleString()} - ${boq.maxEstimate.toLocaleString()}

I would like to book an on-site structural audit and consultation.`
  }, [currentSpace, areaSqft, turfIndex, activeLayers, boq, copy])

  return (
    <Section id="studio" className="relative isolate overflow-hidden">
      {/* Diffuse glass glows */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-20 -z-10 size-96 rounded-full bg-bright/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 bottom-20 -z-10 size-96 rounded-full bg-emerald/20 blur-3xl" />

      <Container>
        <SectionHeading
          eyebrow={copy.eyebrow}
          icon={PencilRuler}
          title={copy.title}
          sub={copy.sub}
        />

        {/* Master Studio Workspace */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* LEFT: Architectural Controls */}
          <div className="space-y-4 lg:col-span-5">
            {/* Space Type Selector */}
            <div className="rounded-3xl glass-card p-5 border border-white/75">
              <span className="text-[0.72rem] font-bold tracking-wider text-forest/75 uppercase block mb-3 font-mono">
                1. {lang === 'bn' ? 'প্রকল্পের ক্ষেত্র নির্বাচন' : 'Project Space Type'}
              </span>
              <div className="grid grid-cols-2 gap-2">
                {copy.spaces.map((sp, idx) => {
                  const isSelected = spaceIndex === idx
                  return (
                    <button
                      key={sp.id}
                      type="button"
                      onClick={() => setSpaceIndex(idx)}
                      className={`flex flex-col items-start rounded-2xl p-3 text-left transition-all duration-200 ${
                        isSelected
                          ? 'glass-emerald text-white shadow-soft font-bold scale-[1.02]'
                          : 'glass-pill text-forest hover:bg-white'
                      }`}
                    >
                      <span className="text-xs">{sp.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Area Slider */}
            <div className="rounded-3xl glass-card p-5 border border-white/75">
              <div className="flex items-center justify-between">
                <span className="text-[0.72rem] font-bold tracking-wider text-forest/75 uppercase font-mono">
                  2. {copy.areaLabel}
                </span>
                <span className="rounded-full glass-pill px-3 py-1 font-mono text-xs font-bold text-forest">
                  {n(areaSqft)} {copy.sqftUnit}
                </span>
              </div>
              <div className="mt-3.5">
                <input
                  type="range"
                  min="150"
                  max="4500"
                  step="50"
                  value={areaSqft}
                  onChange={(e) => setAreaSqft(Number(e.target.value))}
                  className="w-full accent-emerald cursor-pointer"
                />
                <div className="mt-2 flex justify-between font-mono text-[0.7rem] text-charcoal/60">
                  <span>{n(150)} sq.ft</span>
                  <span>{n(1500)}</span>
                  <span>{n(3000)}</span>
                  <span>{n(4500)}+ sq.ft</span>
                </div>
              </div>
            </div>

            {/* Turf Selection */}
            <div className="rounded-3xl glass-card p-5 border border-white/75">
              <span className="text-[0.72rem] font-bold tracking-wider text-forest/75 uppercase font-mono block mb-2.5">
                3. {copy.turfLabel}
              </span>
              <div className="grid gap-2">
                {copy.turfOptions.map((opt, idx) => {
                  const isSelected = turfIndex === idx
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setTurfIndex(idx)}
                      className={`flex items-center justify-between rounded-xl p-2.5 text-xs font-medium transition-all ${
                        isSelected
                          ? 'glass-emerald text-white shadow-soft font-bold'
                          : 'glass-pill text-charcoal/80 hover:bg-white'
                      }`}
                    >
                      <span>{opt}</span>
                      {isSelected && <Check className="size-3.5 text-white" strokeWidth={3} />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Engineering Layers Toggle */}
            <div className="rounded-3xl glass-card p-5 border border-white/75">
              <span className="text-[0.72rem] font-bold tracking-wider text-forest/75 uppercase font-mono block mb-2.5">
                4. {lang === 'bn' ? 'ইঞ্জিনিয়ারিং লেয়ারসমূহ' : 'Engineering Layers'}
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.keys(activeLayers).map((key) => {
                  const isChecked = activeLayers[key]
                  const labels = {
                    waterproofing: lang === 'bn' ? 'ওয়াটারপ্রুফিং' : 'Waterproofing',
                    drainage: lang === 'bn' ? 'ড্রেনেজ ম্যাট' : 'Drainage Grid',
                    soil: lang === 'bn' ? 'লাইটওয়েট মাটি' : 'Engineered Soil',
                    turf: lang === 'bn' ? 'ঘাসের স্তর' : 'Lawn Turf',
                    fruitTrees: lang === 'bn' ? 'ফলদ বাগান' : 'Fruit Orchard',
                    pergola: lang === 'bn' ? 'পারগোলা' : 'Timber Pergola',
                    smartDrip: lang === 'bn' ? 'ড্রিপ ইরিগেশন' : 'Smart Drip',
                    lighting: lang === 'bn' ? 'নাইট লাইটিং' : 'LED Uplighting',
                  }
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggleLayer(key)}
                      className={`flex items-center gap-2 rounded-xl p-2 text-left transition-all ${
                        isChecked
                          ? 'glass-emerald text-white font-bold shadow-xs'
                          : 'glass-pill text-charcoal/70 hover:bg-white'
                      }`}
                    >
                      <span className={`grid size-3.5 place-items-center rounded-sm ${isChecked ? 'bg-white text-forest' : 'border border-charcoal/30'}`}>
                        {isChecked && <Check className="size-2.5 stroke-[3]" />}
                      </span>
                      <span className="truncate">{labels[key]}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: CAD Blueprint & Bill of Quantities */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl glass-panel shadow-lift border border-white/85 overflow-hidden">
              {/* Studio Canvas / BOQ Tab Switcher */}
              <div className="flex items-center justify-between border-b border-forest/10 bg-white/40 px-5 py-3.5 backdrop-blur-md">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-forest uppercase">
                  <Compass className="size-4 text-emerald" />
                  <span>CAD DRAFTING & BOQ SPECIFICATION</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveTab('canvas')}
                    className={`rounded-full px-3.5 py-1 text-xs font-mono font-bold transition ${
                      activeTab === 'canvas' ? 'glass-emerald text-white shadow-soft' : 'glass-pill text-forest/70 hover:text-forest'
                    }`}
                  >
                    CAD BLUEPRINT
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('boq')}
                    className={`rounded-full px-3.5 py-1 text-xs font-mono font-bold transition ${
                      activeTab === 'boq' ? 'glass-emerald text-white shadow-soft' : 'glass-pill text-forest/70 hover:text-forest'
                    }`}
                  >
                    BOQ ESTIMATE
                  </button>
                </div>
              </div>

              {/* View 1: CAD Blueprint Visual Canvas */}
              {activeTab === 'canvas' ? (
                <div className="relative aspect-[16/10] w-full bg-[#0e1913] p-6 text-white font-mono overflow-hidden">
                  {/* Subtle Grid Lines */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #52b788 1px, transparent 1px), linear-gradient(to bottom, #52b788 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />

                  {/* Technical CAD SVG */}
                  <svg viewBox="0 0 600 360" className="relative z-10 h-full w-full overflow-visible">
                    {/* Dimension Caliper Labels */}
                    <line x1="40" y1="30" x2="560" y2="30" stroke="#52b788" strokeWidth="1" strokeDasharray="4 4" />
                    <text x="300" y="24" fill="#52b788" fontSize="10" textAnchor="middle">
                      WIDTH: {(Math.sqrt(areaSqft) * 1.3).toFixed(1)}m (GRID REF: DH-01)
                    </text>

                    {/* Base Concrete Slab */}
                    <rect x="50" y="45" width="500" height="270" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />

                    {/* Waterproofing layer */}
                    {activeLayers.waterproofing && (
                      <rect x="55" y="50" width="490" height="260" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
                    )}

                    {/* Drainage grid cells */}
                    {activeLayers.drainage && (
                      <rect x="60" y="55" width="480" height="250" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
                    )}

                    {/* Grass Turf Layer */}
                    {activeLayers.turf && turfIndex !== 3 && (
                      <rect x="70" y="65" width="460" height="230" rx="4" fill="#2d6a4f" fillOpacity="0.75" stroke="#52b788" strokeWidth="1.5" />
                    )}

                    {/* Timber Pergola Zone */}
                    {activeLayers.pergola && (
                      <g transform="translate(360, 80)">
                        <rect x="0" y="0" width="150" height="130" fill="none" stroke="#d97706" strokeWidth="1.5" />
                        <line x1="0" y1="0" x2="150" y2="130" stroke="#d97706" strokeWidth="0.8" strokeDasharray="4 4" />
                        <line x1="150" y1="0" x2="0" y2="130" stroke="#d97706" strokeWidth="0.8" strokeDasharray="4 4" />
                        <text x="75" y="70" fill="#fde68a" fontSize="10" textAnchor="middle">
                          TIMBER PERGOLA & TRELLIS
                        </text>
                      </g>
                    )}

                    {/* Fruit Tree Container Array */}
                    {activeLayers.fruitTrees && (
                      <g transform="translate(90, 85)">
                        <circle cx="25" cy="25" r="20" fill="#15803d" stroke="#86efac" strokeWidth="1" />
                        <text x="25" y="28" fill="#ffffff" fontSize="8" textAnchor="middle">BARI 4</text>
                        <circle cx="25" cy="85" r="20" fill="#15803d" stroke="#86efac" strokeWidth="1" />
                        <text x="25" y="88" fill="#ffffff" fontSize="8" textAnchor="middle">LEBU</text>
                        <circle cx="25" cy="145" r="20" fill="#15803d" stroke="#86efac" strokeWidth="1" />
                        <text x="25" y="148" fill="#ffffff" fontSize="8" textAnchor="middle">MANGO</text>
                      </g>
                    )}

                    {/* Smart Drip Irrigation lines */}
                    {activeLayers.smartDrip && (
                      <path
                        d="M90 70 H500 V270 H90 Z"
                        fill="none"
                        stroke="#0ea5e9"
                        strokeWidth="1.5"
                        strokeDasharray="6 4"
                      />
                    )}
                  </svg>

                  {/* Corner Scale & Spec Stamp */}
                  <div className="absolute bottom-3 left-4 flex items-center gap-3 text-[0.65rem] text-emerald">
                    <span className="font-bold">SCALE 1:50</span>
                    <span>·</span>
                    <span>BNBC DEAD LOAD: {boq.deadLoadKg} KG/SQ.FT (COMPLIANT)</span>
                  </div>
                </div>
              ) : (
                /* View 2: Bill of Quantities (BOQ) Breakdown */
                <div className="p-6">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-forest/70 mb-3">
                    ITEMIZED MATERIAL & SCOPE ESTIMATE (BOQ)
                  </h4>
                  <div className="divide-y divide-forest/10 border-y border-forest/10 text-xs">
                    {boq.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2.5">
                        <span className={`flex items-center gap-2 ${item.active ? 'text-forest font-semibold' : 'text-charcoal/40 line-through'}`}>
                          <span className={`size-1.5 rounded-full ${item.active ? 'bg-emerald' : 'bg-charcoal/30'}`} />
                          {item.name}
                        </span>
                        <span className="font-mono font-bold text-forest">
                          {item.active ? `৳${item.cost.toLocaleString()}` : '—'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Engineering Metrics Summary Footer */}
              <div className="border-t border-forest/10 bg-white/60 p-5 backdrop-blur-md">
                <div className="grid grid-cols-3 gap-3 text-center border-b border-forest/10 pb-4 mb-4">
                  <div className="rounded-2xl glass-card p-2.5">
                    <span className="block font-mono text-[0.68rem] text-charcoal/60 uppercase">
                      BNBC STRUCTURAL LOAD
                    </span>
                    <strong className="block font-mono text-xs sm:text-sm font-bold text-emerald">
                      {boq.deadLoadKg} kg/sq.ft (100% SAFE)
                    </strong>
                  </div>
                  <div className="rounded-2xl glass-card p-2.5">
                    <span className="block font-mono text-[0.68rem] text-charcoal/60 uppercase">
                      HEAT DELTA
                    </span>
                    <strong className="block font-mono text-xs sm:text-sm font-bold text-forest">
                      -{boq.coolingDelta}°C ROOF COOLING
                    </strong>
                  </div>
                  <div className="rounded-2xl glass-card p-2.5">
                    <span className="block font-mono text-[0.68rem] text-charcoal/60 uppercase">
                      ESTIMATED INVESTMENT
                    </span>
                    <strong className="block font-mono text-xs sm:text-sm font-bold text-forest">
                      ৳{boq.minEstimate.toLocaleString()} - ৳{boq.maxEstimate.toLocaleString()}
                    </strong>
                  </div>
                </div>

                {/* WhatsApp Action */}
                <Button
                  href={getWhatsAppLink(whatsappBlueprint, null, lang)}
                  size="lg"
                  variant="primary"
                  icon={MessageCircle}
                  className="w-full text-xs font-bold uppercase tracking-wider shadow-lift"
                >
                  {copy.bookPlan}
                </Button>
                <p className="mt-2 text-center font-mono text-[0.68rem] text-charcoal/60">
                  {copy.customNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
