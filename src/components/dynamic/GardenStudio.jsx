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

  // Realistic Itemized Bill of Quantities (BOQ) calculation
  const boq = useMemo(() => {
    const items = [
      {
        name: lang === 'bn' ? '৩-স্তর ইলাস্টোমেরিক রুফ ওয়াটারপ্রুফিং কোটিং' : '3-Layer Elastomeric Waterproofing Membrane',
        cost: activeLayers.waterproofing ? areaSqft * 38 : 0,
        active: activeLayers.waterproofing,
      },
      {
        name: lang === 'bn' ? 'উচ্চ ঘনত্বের জিও-টেক্সটাইল ড্রেনেজ সেল ম্যাট্রিক্স' : 'High-Density Geo-Textile Drainage Cell Matrix',
        cost: activeLayers.drainage ? areaSqft * 32 : 0,
        active: activeLayers.drainage,
      },
      {
        name: lang === 'bn' ? 'ডিএই সার্টিফায়েড লাইটওয়েট অর্গানিক সাবস্ট্রেট' : 'DAE-Certified Engineered Lightweight Substrate',
        cost: activeLayers.soil ? areaSqft * 42 : 0,
        active: activeLayers.soil,
      },
      {
        name: copy.turfOptions[turfIndex],
        cost: activeLayers.turf && turfIndex !== 3 ? areaSqft * (turfIndex === 0 ? 35 : 28) : 0,
        active: activeLayers.turf && turfIndex !== 3,
      },
      {
        name: lang === 'bn' ? 'কলমের ফলদ বাগান জোন (পেয়ারা, লেবু, আম্রপালি)' : 'Grafted Container Fruit Orchard Zone',
        cost: activeLayers.fruitTrees ? 18500 : 0,
        active: activeLayers.fruitTrees,
      },
      {
        name: lang === 'bn' ? 'কাঠের নান্দনিক পারগোলা ও লতাগুল্ম ক্যানোপি' : 'Architectural Timber Pergola & Flowering Canopy',
        cost: activeLayers.pergola ? 48000 : 0,
        active: activeLayers.pergola,
      },
      {
        name: lang === 'bn' ? 'স্মার্ট অটোমেটেড ড্রিপ ইরিগেশন রেটিকুলেশন' : 'Smart Automated Micro-Drip Reticulation System',
        cost: activeLayers.smartDrip ? 16500 : 0,
        active: activeLayers.smartDrip,
      },
      {
        name: lang === 'bn' ? 'নাইট ল্যান্ডস্কেপ ৩০০০কে এলইডি আপলাইটিং' : 'Architectural Night 3000K LED Uplighting',
        cost: activeLayers.lighting ? 14000 : 0,
        active: activeLayers.lighting,
      },
    ]

    const subtotal = items.reduce((acc, it) => acc + it.cost, 0)
    const minEstimate = Math.round((subtotal * 0.92) / 1000) * 1000
    const maxEstimate = Math.round((subtotal * 1.12) / 1000) * 1000

    // Dead load per sqft (kg/sqft)
    const deadLoadKg = Math.min(22.5, Math.round(14 + (areaSqft / 1200) * 2.2))

    // Thermal cooling delta in Celsius
    const coolingDelta = (3.8 + (areaSqft / 1500) * 0.8).toFixed(1)

    // Daily oxygen output in liters
    const oxygenLiters = Math.round(areaSqft * 0.28)

    return {
      items,
      subtotal,
      minEstimate,
      maxEstimate,
      deadLoadKg,
      coolingDelta,
      oxygenLiters,
    }
  }, [areaSqft, turfIndex, activeLayers, copy, lang])

  // Formulate WhatsApp message with prefilled engineering blueprint
  const whatsappBlueprint = useMemo(() => {
    const spaceTitle = currentSpace.name
    const turfName = copy.turfOptions[turfIndex]
    const enabledLayers = Object.keys(activeLayers)
      .filter((k) => activeLayers[k])
      .join(', ')

    if (lang === 'bn') {
      return `আসসালামু আলাইকুম জনাব আমির আলী,
আমি ধানসিঁড়ি ওয়েবসাইটের 'আর্কিটেকচারাল ডিজাইন স্টুডিও' থেকে আমার প্রকল্পের একটি কারিগরি পরিকল্পনা প্রস্তুত করেছি:
• স্থান: ${spaceTitle}
• আনুমানিক আয়তন: ${areaSqft} বর্গফুট
• ঘাসের ধরন: ${turfName}
• নির্বাচিত লেয়ার: ${enabledLayers}
• স্ট্রাকচারাল ওজন রেটিং: ${boq.deadLoadKg} কেজি/বর্গফুট (ডিএই ও বিএনবিসি অনুমোদিত)
• তাপমাত্রা হ্রাস সূচক: -${boq.coolingDelta}° সে.
• আনুমানিক প্রাক্কলন (BOQ): ৳${boq.minEstimate.toLocaleString()} - ৳${boq.maxEstimate.toLocaleString()}

আমি সরাসরি সাইট ভিজিট ও বাস্তবায়নের জন্য আপনার সাথে পরামর্শ করতে আগ্রহী।`
    }

    return `Hello Mr. Amir Ali,
I have formulated an architectural garden specification on Dhanshiri Garden's Studio:
• Space Type: ${spaceTitle}
• Planned Area: ${areaSqft} sq.ft
• Turf Variety: ${turfName}
• Active Layers: ${enabledLayers}
• Dead Load Rating: ${boq.deadLoadKg} kg/sq.ft (BNBC Safe)
• Thermal Cooling: -${boq.coolingDelta}°C
• Estimated BOQ Budget: BDT ${boq.minEstimate.toLocaleString()} - ${boq.maxEstimate.toLocaleString()}

I would like to book an on-site structural audit and consultation.`
  }, [currentSpace, areaSqft, turfIndex, activeLayers, boq, copy, lang])

  return (
    <Section id="studio" className="border-t border-forest/10 bg-forest/[0.02]">
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
          <div className="space-y-5 lg:col-span-5">
            {/* Space Type Selector */}
            <div className="rounded-xl border border-forest/15 bg-white p-4 shadow-sm">
              <span className="font-mono text-[0.72rem] font-bold tracking-wider text-forest/70 uppercase">
                1. {lang === 'bn' ? 'প্রকল্পের ক্ষেত্র নির্বাচন' : 'Project Space Type'}
              </span>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {copy.spaces.map((sp, idx) => {
                  const isSelected = spaceIndex === idx
                  return (
                    <button
                      key={sp.id}
                      type="button"
                      onClick={() => setSpaceIndex(idx)}
                      className={`flex flex-col items-start rounded-lg border p-3 text-left transition-all ${
                        isSelected
                          ? 'border-forest bg-forest text-white shadow-xs font-bold'
                          : 'border-forest/10 bg-cream hover:bg-forest/5 text-forest/80'
                      }`}
                    >
                      <span className="text-xs">{sp.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Area Slider */}
            <div className="rounded-xl border border-forest/15 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.72rem] font-bold tracking-wider text-forest/70 uppercase">
                  2. {copy.areaLabel}
                </span>
                <span className="font-mono text-sm font-bold text-forest">
                  {n(areaSqft)} {copy.sqftUnit}
                </span>
              </div>
              <div className="mt-3">
                <input
                  type="range"
                  min="150"
                  max="4500"
                  step="50"
                  value={areaSqft}
                  onChange={(e) => setAreaSqft(Number(e.target.value))}
                  className="w-full accent-forest cursor-pointer"
                />
                <div className="mt-1 flex justify-between font-mono text-[0.7rem] text-charcoal/50">
                  <span>{n(150)} sq.ft</span>
                  <span>{n(1500)}</span>
                  <span>{n(3000)}</span>
                  <span>{n(4500)}+ sq.ft</span>
                </div>
              </div>
            </div>

            {/* Turf Selection */}
            <div className="rounded-xl border border-forest/15 bg-white p-4 shadow-sm">
              <span className="font-mono text-[0.72rem] font-bold tracking-wider text-forest/70 uppercase">
                3. {copy.turfLabel}
              </span>
              <div className="mt-2.5 grid gap-1.5">
                {copy.turfOptions.map((opt, idx) => {
                  const isSelected = turfIndex === idx
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setTurfIndex(idx)}
                      className={`flex items-center justify-between rounded-lg border p-2.5 text-xs font-medium transition-all ${
                        isSelected
                          ? 'border-forest bg-mint/50 font-bold text-forest'
                          : 'border-forest/10 bg-white text-charcoal/70 hover:bg-forest/5'
                      }`}
                    >
                      <span>{opt}</span>
                      {isSelected && <Check className="size-3.5 text-emerald" strokeWidth={3} />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Engineering Layers Toggle */}
            <div className="rounded-xl border border-forest/15 bg-white p-4 shadow-sm">
              <span className="font-mono text-[0.72rem] font-bold tracking-wider text-forest/70 uppercase">
                4. {lang === 'bn' ? 'ইঞ্জিনিয়ারিং লেয়ারসমূহ' : 'Engineering Layers'}
              </span>
              <div className="mt-2.5 grid grid-cols-2 gap-1.5 text-xs">
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
                      className={`flex items-center gap-2 rounded-lg border p-2 text-left transition-all ${
                        isChecked
                          ? 'border-emerald/40 bg-bright/15 text-forest font-bold'
                          : 'border-forest/10 bg-white text-charcoal/60 hover:bg-forest/5'
                      }`}
                    >
                      <span className={`grid size-3.5 place-items-center rounded-sm border ${isChecked ? 'border-emerald bg-emerald text-white' : 'border-charcoal/30'}`}>
                        {isChecked && <Check className="size-2.5 stroke-[3]" />}
                      </span>
                      <span className="truncate">{labels[key]}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: Swiss CAD Blueprint & Bill of Quantities */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-forest/20 bg-white shadow-lift overflow-hidden">
              {/* Studio Canvas / BOQ Tab Switcher */}
              <div className="flex items-center justify-between border-b border-forest/15 bg-forest/[0.04] px-5 py-3">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-forest uppercase">
                  <Compass className="size-4 text-emerald" />
                  <span>CAD DRAFTING & BOQ SPECIFICATION</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab('canvas')}
                    className={`rounded-md px-3 py-1 text-xs font-mono font-bold transition ${
                      activeTab === 'canvas' ? 'bg-forest text-white' : 'text-forest/70 hover:bg-forest/10'
                    }`}
                  >
                    CAD BLUEPRINT
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('boq')}
                    className={`rounded-md px-3 py-1 text-xs font-mono font-bold transition ${
                      activeTab === 'boq' ? 'bg-forest text-white' : 'text-forest/70 hover:bg-forest/10'
                    }`}
                  >
                    BILL OF QUANTITIES (BOQ)
                  </button>
                </div>
              </div>

              {/* View 1: CAD Blueprint Visual Canvas */}
              {activeTab === 'canvas' ? (
                <div className="relative aspect-[16/10] w-full bg-[#111c16] p-6 text-white font-mono overflow-hidden">
                  {/* Grid Lines */}
                  <div
                    className="absolute inset-0 opacity-15"
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
                    <rect x="50" y="45" width="500" height="270" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />

                    {/* Waterproofing layer */}
                    {activeLayers.waterproofing && (
                      <rect x="55" y="50" width="490" height="260" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
                    )}

                    {/* Drainage grid cells */}
                    {activeLayers.drainage && (
                      <rect x="60" y="55" width="480" height="250" fill="#064e3b" stroke="#10b981" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
                    )}

                    {/* Grass Turf Layer */}
                    {activeLayers.turf && turfIndex !== 3 && (
                      <rect x="70" y="65" width="460" height="230" fill="#2d6a4f" fillOpacity="0.75" stroke="#52b788" strokeWidth="1.5" />
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
              <div className="border-t border-forest/15 bg-cream/70 p-5">
                <div className="grid grid-cols-3 gap-3 text-center border-b border-forest/10 pb-4 mb-4">
                  <div>
                    <span className="block font-mono text-[0.68rem] text-charcoal/60 uppercase">
                      BNBC STRUCTURAL LOAD
                    </span>
                    <strong className="block font-mono text-sm font-bold text-emerald">
                      {boq.deadLoadKg} kg/sq.ft (100% SAFE)
                    </strong>
                  </div>
                  <div>
                    <span className="block font-mono text-[0.68rem] text-charcoal/60 uppercase">
                      HEAT DELTA
                    </span>
                    <strong className="block font-mono text-sm font-bold text-forest">
                      -{boq.coolingDelta}°C ROOF COOLING
                    </strong>
                  </div>
                  <div>
                    <span className="block font-mono text-[0.68rem] text-charcoal/60 uppercase">
                      ESTIMATED INVESTMENT
                    </span>
                    <strong className="block font-mono text-sm font-bold text-forest">
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
                  className="w-full text-xs font-bold uppercase tracking-wider"
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
