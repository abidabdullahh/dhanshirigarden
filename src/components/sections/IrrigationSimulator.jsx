import { useEffect, useMemo, useRef, useState } from 'react'
import { Droplet, Gauge, Play, Pause, Sparkles, Waves, Zap } from 'lucide-react'
import { useInView, usePrefersReducedMotion } from '../../lib/hooks'
import { useLocale } from '../../lib/locale'

const W = 800
const H = 420
const GROUND_Y = 280

/** Deterministic pseudo-random generator */
function mulberry32(seed) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export default function IrrigationSimulator() {
  const { lang } = useLocale()
  const isBn = lang === 'bn'
  const reduced = usePrefersReducedMotion()
  const [containerRef, inView] = useInView({ threshold: 0.3 })

  const [active, setActive] = useState(true)
  const [pressure, setPressure] = useState(75) // 30 - 100 psi
  const [mode, setMode] = useState('both') // 'sprinkler' | 'drip' | 'both'
  const [moisture, setMoisture] = useState(65)
  const [sprayAngle, setSprayAngle] = useState(45)
  const [animTime, setAnimTime] = useState(0)

  const frameRef = useRef(0)

  // Animation loop for oscillating sprinkler and water particles
  useEffect(() => {
    if (!active || reduced || !inView) return undefined

    const tick = (now) => {
      setAnimTime(now * 0.003)
      // Oscillate spray sweep angle between 25 and 75 degrees
      const sweep = 50 + Math.sin(now * 0.002) * 28
      setSprayAngle(sweep)

      // Gradually increase moisture up to 98% when active
      setMoisture((prev) => {
        if (prev < 98) return Math.min(98, prev + 0.05)
        return prev
      })

      frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [active, reduced, inView])

  // Generate deterministic droplets and plant geometry
  const grassBlades = useMemo(() => {
    const random = mulberry32(42)
    const blades = []
    for (let x = 10; x < W - 10; x += 6) {
      const h = 18 + random() * 26
      const bend = (random() - 0.5) * 12
      blades.push({
        x,
        h,
        bend,
        color: ['#2d6a4f', '#40916c', '#52b788', '#74c69d'][Math.floor(random() * 4)],
      })
    }
    return blades
  }, [])

  // Calculate sprinkler spray arc paths
  const leftSprinklerX = 220
  const rightSprinklerX = 580
  const nozzleY = GROUND_Y - 26

  const sprayReach = (pressure / 100) * 190
  const sprayHeight = (pressure / 100) * 85

  return (
    <div ref={containerRef} className="rounded-3xl glass-panel p-6 sm:p-10 shadow-lift border border-white/85">
      {/* Header & Controls bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-forest/10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full glass-pill bg-emerald/10 px-3 py-1 text-xs font-bold text-emerald mb-2">
            <Waves className="size-3.5 animate-pulse" />
            <span>{isBn ? 'ইন্টারেক্টিভ অটোমেটেড ইরিগেশন ডেমো' : 'Interactive Smart Irrigation Demo'}</span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-forest">
            {isBn ? 'স্মার্ট স্প্রিংকলার ও ড্রিপ ইরিগেশন সিমুলেটর' : 'Smart Pop-Up Sprinkler & Micro-Drip System'}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-charcoal/75 max-w-xl">
            {isBn
              ? 'নিচে কন্ট্রোল পরিবর্তন করে দেখুন কীভাবে স্বয়ংক্রিয় পপ-আপ স্প্রিংকলার ও রুট-জোন ড্রিপ লাইন প্রতিটি উদ্ভিদে সুষম পানি পৌঁছে দেয়।'
              : 'Interact with pressure and zone controls to see how automated rotary sprinklers and root drip systems hydrate turf and rooftop gardens with zero water waste.'}
          </p>
        </div>

        {/* Moisture & Status Meter */}
        <div className="flex items-center gap-4 bg-white/70 backdrop-blur-md rounded-2xl p-3.5 border border-forest/10 shrink-0">
          <div className="size-12 rounded-xl bg-emerald/10 flex items-center justify-center text-emerald">
            <Droplet className="size-6 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-forest uppercase tracking-wider">
              <span>{isBn ? 'মাটির আর্দ্রতা' : 'Soil Hydration'}</span>
              <span className="text-emerald font-mono font-extrabold">{Math.round(moisture)}%</span>
            </div>
            <div className="w-32 h-2.5 bg-forest/10 rounded-full mt-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald/70 to-emerald transition-all duration-300 rounded-full"
                style={{ width: `${moisture}%` }}
              />
            </div>
            <span className="text-[0.65rem] text-charcoal/65 mt-0.5 block">
              {moisture > 80
                ? isBn
                  ? '✓ আদর্শ রুট-জোন আর্দ্রতা'
                  : '✓ Optimal root saturation'
                : isBn
                  ? 'হাইড্রেশন চলছে...'
                  : 'Hydrating soil bed...'}
            </span>
          </div>
        </div>
      </div>

      {/* Main SVG Visual Canvas */}
      <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#e8f5e9]/60 via-[#f1f8e9]/40 to-[#e0ede4]/80 border border-white/60 shadow-inner">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-full w-full select-none"
          preserveAspectRatio="xMidYMid meet"
          aria-label="Automated Irrigation System Illustration"
        >
          <defs>
            {/* Water Spray Gradient */}
            <linearGradient id="sprayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#0ea5e9" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.05" />
            </linearGradient>

            {/* Drip Droplet Gradient */}
            <radialGradient id="dropGrad" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="70%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </radialGradient>

            {/* Soil Cross Section Gradient */}
            <linearGradient id="soilGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={moisture > 70 ? '#38220f' : '#6f4e37'} />
              <stop offset="40%" stopColor={moisture > 70 ? '#26170a' : '#4a3525'} />
              <stop offset="100%" stopColor="#1a0f07" />
            </linearGradient>

            {/* Drip Pipe Glow */}
            <filter id="waterGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Sky / Ambient Atmosphere */}
          <rect x="0" y="0" width={W} height={GROUND_Y} fill="transparent" />

          {/* Background Decorative Garden Border & Planters */}
          <g opacity="0.85">
            {/* Ornamental Shrubs */}
            <path
              d="M 60 280 C 70 230, 110 210, 130 240 C 150 200, 200 220, 210 280 Z"
              fill="#2d6a4f"
              opacity="0.8"
            />
            <path
              d="M 120 280 C 130 220, 170 190, 190 230 C 210 180, 250 210, 260 280 Z"
              fill="#40916c"
              opacity="0.75"
            />
            {/* Right-side Tropical Bird of Paradise / Foliage */}
            <path
              d="M 640 280 Q 670 180 720 160 Q 700 220 660 280 Z"
              fill="#1b4332"
            />
            <path
              d="M 660 280 Q 700 170 750 150 Q 730 220 680 280 Z"
              fill="#2d6a4f"
            />
            <path
              d="M 680 280 Q 730 190 770 170 Q 740 230 700 280 Z"
              fill="#52b788"
            />
          </g>

          {/* Soil Bed (Cross-Section Below Ground) */}
          <rect x="0" y={GROUND_Y} width={W} height={H - GROUND_Y} fill="url(#soilGrad)" />

          {/* Underground Drip Pipe & Root Network */}
          <g>
            {/* Subsurface Drip Irrigation Pipe (6 inches below ground) */}
            <rect x="20" y={GROUND_Y + 45} width={W - 40} height="10" rx="5" fill="#1e293b" />
            <rect
              x="22"
              y={GROUND_Y + 47}
              width={W - 44}
              height="6"
              rx="3"
              fill={active && (mode === 'drip' || mode === 'both') ? '#38bdf8' : '#334155'}
              filter={active ? 'url(#waterGlow)' : 'none'}
              opacity={active ? 0.9 : 0.4}
            />

            {/* Drip Emitters & Pulsing Moisture Rings */}
            {[100, 200, 310, 420, 530, 640, 720].map((emitterX, i) => {
              const dripPulse = (animTime * 4 + i) % 3
              return (
                <g key={`emitter-${i}`}>
                  {/* Emitter T-Joint */}
                  <rect x={emitterX - 3} y={GROUND_Y + 40} width="6" height="18" fill="#0f172a" rx="1" />

                  {/* Pulsing Drip Rings when active */}
                  {active && (mode === 'drip' || mode === 'both') && (
                    <>
                      <circle
                        cx={emitterX}
                        cy={GROUND_Y + 50}
                        r={6 + dripPulse * 9}
                        fill="none"
                        stroke="#0284c7"
                        strokeWidth="1.5"
                        opacity={Math.max(0, 1 - dripPulse / 3)}
                      />
                      <circle
                        cx={emitterX}
                        cy={GROUND_Y + 54 + (dripPulse * 6)}
                        r="2.5"
                        fill="url(#dropGrad)"
                      />
                    </>
                  )}
                </g>
              )
            })}

            {/* Biological Roots spreading in soil */}
            <path
              d="M 140 280 Q 130 310 110 330 M 140 280 Q 155 315 150 345 M 680 280 Q 660 320 640 340 M 680 280 Q 700 310 710 335"
              stroke="#8d6e63"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />
          </g>

          {/* Dense Lawn Grass Blades above ground */}
          <g>
            {grassBlades.map((b, i) => (
              <path
                key={`blade-${i}`}
                d={`M ${b.x} ${GROUND_Y} Q ${b.x + b.bend * 0.4} ${GROUND_Y - b.h * 0.6} ${b.x + b.bend} ${GROUND_Y - b.h}`}
                stroke={b.color}
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            ))}
          </g>

          {/* Pop-Up Sprinkler Assemblies */}
          {[leftSprinklerX, rightSprinklerX].map((sx, idx) => {
            const isLeft = idx === 0
            const currentSweep = isLeft ? sprayAngle : 180 - sprayAngle
            const rad = (currentSweep * Math.PI) / 180
            const targetX = sx + Math.cos(rad) * sprayReach
            const targetY = nozzleY - Math.sin(rad) * sprayHeight

            return (
              <g key={`sprinkler-${idx}`}>
                {/* Sprinkler Housing Body (in ground) */}
                <rect x={sx - 8} y={GROUND_Y - 2} width="16" height="38" rx="3" fill="#1e293b" />
                <rect x={sx - 11} y={GROUND_Y - 4} width="22" height="6" rx="2" fill="#0f172a" />

                {/* Pop-Up Riser Shaft (extends upward when active) */}
                <rect
                  x={sx - 5}
                  y={active && (mode === 'sprinkler' || mode === 'both') ? nozzleY : GROUND_Y - 4}
                  width="10"
                  height={active && (mode === 'sprinkler' || mode === 'both') ? 24 : 4}
                  rx="2"
                  fill="#475569"
                  className="transition-all duration-500 ease-out"
                />

                {/* Sprinkler Nozzle Head */}
                <ellipse
                  cx={sx}
                  cy={active && (mode === 'sprinkler' || mode === 'both') ? nozzleY : GROUND_Y - 3}
                  rx="6"
                  ry="4"
                  fill="#0284c7"
                  className="transition-all duration-500"
                />

                {/* Active Spray Arcs */}
                {active && (mode === 'sprinkler' || mode === 'both') && (
                  <g className="transition-opacity duration-300">
                    {/* Primary Water Arc */}
                    <path
                      d={`M ${sx} ${nozzleY} Q ${(sx + targetX) / 2} ${targetY - 40} ${targetX} ${GROUND_Y}`}
                      stroke="url(#sprayGrad)"
                      strokeWidth={10 + (pressure / 20)}
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.8"
                    />

                    {/* Fine Misty Secondary Spray Fan */}
                    <path
                      d={`M ${sx} ${nozzleY} L ${targetX - 25} ${GROUND_Y} L ${targetX + 35} ${GROUND_Y} Z`}
                      fill="url(#sprayGrad)"
                      opacity="0.25"
                    />

                    {/* Oscillating fine water droplets */}
                    {Array.from({ length: 8 }).map((_, dIdx) => {
                      const t = (dIdx / 8)
                      const dropX = sx + (targetX - sx) * t + (Math.sin(animTime * 10 + dIdx) * 12)
                      const dropY = nozzleY + (GROUND_Y - nozzleY) * t - (Math.sin(t * Math.PI) * sprayHeight)
                      return (
                        <circle
                          key={`drop-${dIdx}`}
                          cx={dropX}
                          cy={dropY}
                          r={1.5 + (dIdx % 3)}
                          fill="#38bdf8"
                          opacity={0.7}
                        />
                      )
                    })}
                  </g>
                )}
              </g>
            )
          })}

          {/* Ground Line Accent */}
          <line x1="0" y1={GROUND_Y} x2={W} y2={GROUND_Y} stroke="#1b4332" strokeWidth="2.5" />
        </svg>
      </div>

      {/* Interactive Control Deck */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 bg-white/50 backdrop-blur-sm rounded-2xl p-5 border border-forest/10">
        {/* Control 1: System State Toggle */}
        <div className="flex flex-col justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-forest/75 flex items-center gap-1.5 mb-2">
            <Zap className="size-3.5 text-emerald" />
            <span>{isBn ? 'সেচ অপারেশন' : 'Irrigation Cycle'}</span>
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActive(!active)}
              className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-xs font-bold transition-all shadow-sm ${
                active
                  ? 'bg-emerald text-white hover:bg-forest'
                  : 'bg-forest/10 text-forest hover:bg-forest/20'
              }`}
            >
              {active ? <Pause className="size-4" /> : <Play className="size-4" />}
              <span>{active ? (isBn ? 'পজ করুন (Pause)' : 'Pause Active Cycle') : (isBn ? 'সেচ শুরু করুন' : 'Start Cycle')}</span>
            </button>
          </div>
        </div>

        {/* Control 2: Water Pressure Slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-forest/75 flex items-center gap-1.5">
              <Gauge className="size-3.5 text-emerald" />
              <span>{isBn ? 'পানির প্রেশার (PSI)' : 'Nozzle Pressure'}</span>
            </label>
            <span className="font-mono text-xs font-bold text-forest">{pressure} PSI</span>
          </div>
          <input
            type="range"
            min="30"
            max="100"
            value={pressure}
            onChange={(e) => setPressure(Number(e.target.value))}
            className="w-full accent-emerald h-2 bg-forest/10 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[0.68rem] text-charcoal/60 mt-1 font-mono">
            <span>30 PSI (Low)</span>
            <span>65 PSI (Standard)</span>
            <span>100 PSI (High)</span>
          </div>
        </div>

        {/* Control 3: Zone Mode Selector */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-forest/75 flex items-center gap-1.5 mb-2">
            <Sparkles className="size-3.5 text-emerald" />
            <span>{isBn ? 'সেচ মাধ্যম নির্বাচন' : 'Irrigation Mode'}</span>
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-forest/10 rounded-xl text-xs font-bold text-forest">
            <button
              type="button"
              onClick={() => setMode('sprinkler')}
              className={`py-1.5 rounded-lg transition-all ${
                mode === 'sprinkler' ? 'bg-white shadow-sm text-forest' : 'text-forest/70 hover:text-forest'
              }`}
            >
              {isBn ? 'স্প্রিংকলার' : 'Sprinkler'}
            </button>
            <button
              type="button"
              onClick={() => setMode('drip')}
              className={`py-1.5 rounded-lg transition-all ${
                mode === 'drip' ? 'bg-white shadow-sm text-forest' : 'text-forest/70 hover:text-forest'
              }`}
            >
              {isBn ? 'ড্রিপ লাইন' : 'Drip'}
            </button>
            <button
              type="button"
              onClick={() => setMode('both')}
              className={`py-1.5 rounded-lg transition-all ${
                mode === 'both' ? 'bg-white shadow-sm text-forest' : 'text-forest/70 hover:text-forest'
              }`}
            >
              {isBn ? 'যৌথ (Dual)' : 'Dual'}
            </button>
          </div>
        </div>
      </div>

      {/* Engineering Value Proposition Footer */}
      <div className="mt-6 pt-5 border-t border-forest/10 grid gap-4 sm:grid-cols-3 text-xs text-charcoal/80">
        <div className="flex items-start gap-2.5">
          <span className="size-5 rounded-full bg-emerald/15 text-emerald flex items-center justify-center shrink-0 font-bold">1</span>
          <p>
            <strong className="text-forest font-semibold">{isBn ? '৬৫% পানি সাশ্রয়ী:' : '65% Water Savings:'}</strong>{' '}
            {isBn ? 'ম্যানুয়াল পাইপের অতিরিক্ত জলাবদ্ধতা রোধ করে স্বয়ংক্রিয় সেন্সরভিত্তিক পানি সরবরাহ।' : 'Targeted root saturation stops waste and surface puddle runoff.'}
          </p>
        </div>
        <div className="flex items-start gap-2.5">
          <span className="size-5 rounded-full bg-emerald/15 text-emerald flex items-center justify-center shrink-0 font-bold">2</span>
          <p>
            <strong className="text-forest font-semibold">{isBn ? 'স্মার্ট টাইমার কন্ট্রোল:' : 'Automated Smart Timers:'}</strong>{' '}
            {isBn ? 'ভোরে ও সন্ধ্যায় স্বয়ংক্রিয় সেচ চালু হয়, ঢাকা শহরের কর্মব্যস্ত জীবনে গাছের মৃত্যু শূন্যে নামে।' : 'Morning & dusk schedules ensure zero scorch even during vacations.'}
          </p>
        </div>
        <div className="flex items-start gap-2.5">
          <span className="size-5 rounded-full bg-emerald/15 text-emerald flex items-center justify-center shrink-0 font-bold">3</span>
          <p>
            <strong className="text-forest font-semibold">{isBn ? 'আমির আলী সার্টিফাইড:' : 'DAE Agronomy Verified:'}</strong>{' '}
            {isBn ? 'মাটির আর্দ্রতা ও বরেন্দ্র/মেট্রো আবহাওয়া পরিমাপ করে পাইপলাইন স্থাপন।' : 'Custom pipe layout calibrated to rooftop weight and plant transpiration.'}
          </p>
        </div>
      </div>
    </div>
  )
}
