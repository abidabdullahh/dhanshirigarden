import { useState } from 'react'
import { Calendar, Sprout, TrendingUp } from 'lucide-react'
import { useLocale } from '../../lib/locale'
import { Container, Section, SectionHeading } from '../ui/Section'
import InteractiveCard3D from './InteractiveCard3D'

export default function GrowthSimulator() {
  const { t, lang, n } = useLocale()
  const copy = t.growthSimulator
  const [stageIndex, setStageIndex] = useState(3) // default to lush 90 days

  const stages = copy.stages
  const currentStage = stages[stageIndex]

  // Visual state factors based on stageIndex (0 to 4)
  const progress = stageIndex / 4

  return (
    <Section id="growth-simulator" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-20 -z-10 size-96 rounded-full bg-bright/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 bottom-10 -z-10 size-96 rounded-full bg-bloom/15 blur-3xl" />

      <Container>
        <SectionHeading
          eyebrow={copy.eyebrow}
          icon={Sprout}
          title={copy.title}
          sub={copy.sub}
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Visual Transformation Stage Canvas */}
          <div className="lg:col-span-7">
            <InteractiveCard3D
              maxTilt={4}
              className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl glass-panel p-6 shadow-lift border border-white/85"
            >
              {/* Sky & sun atmospheric background */}
              <div
                className="absolute inset-0 transition-opacity duration-700"
                style={{
                  background: `linear-gradient(180deg, rgba(82, 183, 136, ${0.1 + progress * 0.25}) 0%, rgba(248, 249, 250, 0.8) 100%)`,
                }}
              />

              {/* Dynamic decorative backdrop clouds and sun */}
              <div
                className="absolute right-8 top-6 size-16 rounded-full bg-amber-400/80 blur-md transition-all duration-700"
                style={{ transform: `scale(${0.8 + progress * 0.5})`, opacity: 0.4 + progress * 0.6 }}
              />

              {/* Architectural Rooftop Isometric Cross-Section SVG */}
              <svg
                viewBox="0 0 600 360"
                className="relative z-10 h-full w-full overflow-visible transition-all duration-700"
              >
                <defs>
                  <linearGradient id="concreteGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#94a3b8" />
                    <stop offset="100%" stopColor="#64748b" />
                  </linearGradient>
                  <linearGradient id="soilGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#451a03" />
                    <stop offset="100%" stopColor="#78350f" />
                  </linearGradient>
                  <linearGradient id="grassGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#52b788" />
                    <stop offset="100%" stopColor="#2d6a4f" />
                  </linearGradient>
                </defs>

                {/* Base Concrete Slab (Day 0+) */}
                <polygon
                  points="60,260 540,260 500,320 20,320"
                  fill="url(#concreteGrad)"
                  stroke="#475569"
                  strokeWidth="2"
                />
                <text x="70" y="295" fill="#f8fafc" fontSize="13" fontWeight="bold" opacity="0.8">
                  {lang === 'bn' ? 'কংক্রিট ছাদ স্ল্যাব' : 'Concrete Roof Slab'}
                </text>

                {/* Waterproofing Membrane & Drainage Cell (Day 14+) */}
                {stageIndex >= 1 && (
                  <g className="animate-rise [animation-duration:0.5s]">
                    <polygon
                      points="55,252 535,252 505,260 25,260"
                      fill="#0f172a"
                      stroke="#38bdf8"
                      strokeWidth="1.5"
                    />
                    <polygon
                      points="52,242 532,242 510,252 30,252"
                      fill="#1e293b"
                      stroke="#22c55e"
                      strokeWidth="1"
                    />
                    <text x="70" y="250" fill="#38bdf8" fontSize="10" fontWeight="bold">
                      {lang === 'bn' ? 'নিশ্ছিদ্র ৩-স্তর ওয়াটারপ্রুফিং ও ড্রেনেজ ম্যাট' : '3-Layer Waterproofing & Drainage Cells'}
                    </text>
                  </g>
                )}

                {/* Lightweight Substrate & Soil Layer (Day 45+) */}
                {stageIndex >= 2 && (
                  <g className="animate-rise [animation-duration:0.6s]">
                    <polygon
                      points="48,205 528,205 520,242 40,242"
                      fill="url(#soilGrad)"
                      stroke="#92400e"
                      strokeWidth="1.5"
                    />
                    <text x="65" y="226" fill="#fef3c7" fontSize="11" fontWeight="bold">
                      {lang === 'bn' ? 'ডিএই পরীক্ষিত লাইটওয়েট অর্গানিক সাবস্ট্রেট' : 'DAE-Certified Lightweight Organic Substrate'}
                    </text>
                  </g>
                )}

                {/* Lush Carpet Turf & Plants Layer (Day 90+) */}
                {stageIndex >= 3 && (
                  <g className="animate-rise [animation-duration:0.7s]">
                    {/* Emerald grass turf */}
                    <polygon
                      points="45,198 525,198 528,205 48,205"
                      fill="url(#grassGrad)"
                      stroke="#2d6a4f"
                      strokeWidth="2"
                    />

                    {/* Left fruit tree */}
                    <g transform="translate(110, 80)">
                      <rect x="18" y="60" width="10" height="60" rx="3" fill="#78350f" />
                      <circle cx="23" cy="50" r="38" fill="#2d6a4f" opacity="0.9" />
                      <circle cx="36" cy="36" r="28" fill="#52b788" opacity="0.9" />
                      <circle cx="10" cy="42" r="25" fill="#40916c" opacity="0.9" />
                      {/* Fruits */}
                      <circle cx="15" cy="46" r="4.5" fill="#eab308" />
                      <circle cx="32" cy="54" r="5" fill="#84cc16" />
                      <circle cx="28" cy="30" r="4.5" fill="#f97316" />
                    </g>

                    {/* Modern Planters & Flowers */}
                    <g transform="translate(230, 140)">
                      <rect x="0" y="32" width="55" height="26" rx="4" fill="#3a5a73" />
                      <path d="M10 32 Q15 10 20 2 Q25 12 30 32" stroke="#52b788" strokeWidth="2.5" fill="none" />
                      <circle cx="20" cy="2" r="5" fill="#ec4899" />
                      <path d="M30 32 Q35 15 42 6 Q45 18 48 32" stroke="#52b788" strokeWidth="2.5" fill="none" />
                      <circle cx="42" cy="6" r="4" fill="#fbbf24" />
                    </g>

                    {/* Automated drip irrigation pulse */}
                    <path
                      d="M60 200 H500"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      strokeDasharray="6 6"
                      className="animate-pulse"
                    />
                  </g>
                )}

                {/* 1 Year+ Mature Oasis Canopy & Pergola */}
                {stageIndex === 4 && (
                  <g className="animate-rise [animation-duration:0.8s]">
                    {/* Pergola structure */}
                    <g transform="translate(340, 70)">
                      <rect x="0" y="0" width="140" height="8" rx="2" fill="#78350f" />
                      <rect x="10" y="8" width="8" height="120" rx="2" fill="#92400e" />
                      <rect x="122" y="8" width="8" height="120" rx="2" fill="#92400e" />
                      {/* Cascading Bougainvillea blooms */}
                      <path
                        d="M0 0 Q40 -12 80 0 Q120 -15 145 0 Q130 30 110 50 Q70 35 40 45 Z"
                        fill="#db2777"
                        opacity="0.9"
                      />
                      <circle cx="50" cy="20" r="8" fill="#f43f5e" />
                      <circle cx="85" cy="15" r="9" fill="#fda4af" />
                      <circle cx="120" cy="25" r="7" fill="#fb7185" />
                    </g>

                    {/* Happy flying birds */}
                    <path
                      d="M180 40 Q188 32 196 40 Q204 32 212 40"
                      fill="none"
                      stroke="#1b4332"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M240 55 Q246 48 252 55 Q258 48 264 55"
                      fill="none"
                      stroke="#1b4332"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </g>
                )}
              </svg>

              {/* Floating Stat Badge */}
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 rounded-2xl glass-card px-4 py-2 shadow-soft">
                <span className="grid size-7 place-items-center rounded-full bg-forest text-white text-xs">
                  <TrendingUp className="size-4" />
                </span>
                <div>
                  <span className="text-[0.72rem] text-forest/70 uppercase font-semibold">
                    {lang === 'bn' ? 'ফলাফল মেট্রিক্স' : 'Transformation Metric'}
                  </span>
                  <strong className="block font-display text-sm font-bold text-forest">{currentStage.stat}</strong>
                </div>
              </div>
            </InteractiveCard3D>
          </div>

          {/* Interactive Timeline Stepper & Details */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl glass-panel p-6 shadow-lift border border-white/85 sm:p-8">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald">
                {copy.sliderLabel}
              </span>

              {/* 5-Stage Stepper Buttons */}
              <div className="mt-4 grid grid-cols-5 gap-1.5 rounded-2xl glass-surface p-1.5 border border-white/70">
                {stages.map((stage, idx) => {
                  const isActive = stageIndex === idx
                  return (
                    <button
                      key={stage.time}
                      type="button"
                      onClick={() => setStageIndex(idx)}
                      className={`flex flex-col items-center justify-center rounded-xl py-2 text-xs font-bold transition-all duration-300 ${
                        isActive
                          ? 'glass-emerald text-white shadow-soft scale-105 border border-emerald-400/50'
                          : 'text-forest/75 hover:bg-white/60 hover:text-forest'
                      }`}
                    >
                      <span className="text-[0.68rem] opacity-75">{n(idx + 1)}</span>
                      <span className="truncate">{stage.time}</span>
                    </button>
                  )
                })}
              </div>

              {/* Active Stage Details */}
              <div className="mt-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-bloom">
                  <Calendar className="size-4" />
                  <span>{currentStage.time}</span>
                </div>
                <h3 className="mt-1 font-display text-2xl font-bold text-forest">{currentStage.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-charcoal/80">{currentStage.desc}</p>
              </div>

              {/* Agronomist Mr. Amir Ali Note */}
              <div className="mt-6 border-t border-forest/10 pt-5">
                <div className="flex items-start gap-3">
                  <div className="grid size-8 shrink-0 place-items-center rounded-full bg-emerald text-white text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <strong className="block text-sm font-bold text-forest">{copy.agronomistNoteHeading}</strong>
                    <p className="mt-0.5 text-xs leading-relaxed text-charcoal/70">{copy.agronomistNoteText}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
