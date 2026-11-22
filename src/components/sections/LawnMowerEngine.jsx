import { useState, useEffect, useRef } from 'react'
import { Scissors, Gauge, Sparkles, RotateCcw, Play, Pause, CheckCircle2, Layers, Sliders, ShieldCheck } from 'lucide-react'
import { useLocale } from '../../lib/locale'

const TURF_SPECS = {
  nameBn: 'প্রিমিয়াম বারমুডা টিফওয়ে ৪১৯ কার্পেট ঘাস',
  nameEn: 'Certified Bermuda Tifway 419 Sod',
  density: '৯৮.৬% ডেনসিটি',
  originBn: 'নওগাঁ ব্রিডার নার্সারি গ্রাউন্ডস',
  originEn: 'Naogaon Turfgrass Nursery',
}

const HEIGHTS = [
  { mm: 12, labelBn: '১২ মিমি — গলফ পুটিং গ্রিন', labelEn: '12mm — Putting Green', rpm: 3400 },
  { mm: 20, labelBn: '২০ মিমি — লাক্সারি ভিলা লন', labelEn: '20mm — Luxury Villa Standard', rpm: 3000 },
  { mm: 32, labelBn: '৩২ মিমি — রিসোর্ট পার্কল্যান্ড', labelEn: '32mm — Resort Parkland', rpm: 2600 },
]

const PATTERNS = [
  { id: 'stripes', nameBn: 'স্টেডিয়াম স্ট্রাইপ', nameEn: 'Stadium Stripes' },
  { id: 'diamond', nameBn: 'ডায়মন্ড ক্রস-হ্যাচ', nameEn: 'Diamond Cross-Hatch' },
]

export default function LawnMowerEngine() {
  const { lang } = useLocale()
  const isBn = lang === 'bn'

  const [heightIdx, setHeightIdx] = useState(1) // default 20mm
  const currentHeight = HEIGHTS[heightIdx]

  const [pattern, setPattern] = useState('stripes')
  const [isMowing, setIsMowing] = useState(true)
  const [mowedPercent, setMowedPercent] = useState(65)
  const [mowerX, setMowerX] = useState(45) // percentage across canvas
  const [mowerY, setMowerY] = useState(50) // percentage
  const [mowerDirection, setMowerDirection] = useState(1) // 1 = moving right, -1 = moving left

  // Auto mowing animation loop
  useEffect(() => {
    if (!isMowing) return
    const interval = setInterval(() => {
      setMowerX((prevX) => {
        let nextX = prevX + mowerDirection * 1.5
        if (nextX > 92) {
          setMowerDirection(-1)
          setMowerY((y) => (y > 75 ? 25 : y + 20))
          return 92
        } else if (nextX < 8) {
          setMowerDirection(1)
          setMowerY((y) => (y > 75 ? 25 : y + 20))
          return 8
        }
        return nextX
      })

      setMowedPercent((prev) => Math.min(100, prev + 0.3))
    }, 50)

    return () => clearInterval(interval)
  }, [isMowing, mowerDirection])

  // Canvas for grass clippings particles and turf rendering
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let clippings = []

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    const render = () => {
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      ctx.clearRect(0, 0, w, h)

      // Spawn clippings when mower is active
      if (isMowing && Math.random() > 0.3) {
        const mx = (mowerX / 100) * w
        const my = (mowerY / 100) * h
        for (let i = 0; i < 4; i++) {
          clippings.push({
            x: mx + (Math.random() - 0.5) * 30,
            y: my + (Math.random() - 0.5) * 15,
            vx: (Math.random() - 0.5) * 3 - mowerDirection * 2,
            vy: -2 - Math.random() * 4,
            gravity: 0.22,
            size: 2 + Math.random() * 3,
            color: Math.random() > 0.5 ? '#52b788' : '#2d6a4f',
            alpha: 1,
          })
        }
      }

      // Draw and update clippings
      clippings.forEach((c) => {
        c.x += c.vx
        c.y += c.vy
        c.vy += c.gravity
        c.alpha -= 0.025

        ctx.fillStyle = c.color
        ctx.globalAlpha = Math.max(0, c.alpha)
        ctx.fillRect(c.x, c.y, c.size, c.size * 1.8)
      })
      ctx.globalAlpha = 1

      clippings = clippings.filter((c) => c.alpha > 0 && c.y < h)
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
    }
  }, [isMowing, mowerX, mowerY, mowerDirection])

  return (
    <section id="lawn-mower-engine" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FCFCFA] via-[#F3F8F3] to-[#FCFCFA] overflow-hidden">
      {/* 3D Ambient Blur Orbs */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-emerald/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-5 left-10 w-80 h-80 bg-bright/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill-3d text-forest font-mono text-xs uppercase tracking-wider mb-4">
            <Scissors className="size-3.5 text-bright" />
            <span>{isBn ? 'বারমুডা লন মওয়ার ইঞ্জিন' : 'Bermuda Turf Manicuring Engine'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-sutonny text-forest tracking-tight leading-tight">
            {isBn ? 'প্রিসিশন লন মওয়ার ও স্টেডিয়াম কার্পেট স্ট্রাইপ' : 'Precision Reel Mowing & Striped Lawn Architecture'}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal/80 leading-relaxed">
            {isBn
              ? 'গলফ কোর্স ও ভিআইপি ফার্মহাউসের মানদণ্ডে তৈরি বারমুডা কার্পেট ঘাস। লেজার লেভেলিং, নিয়মিত প্রিসিশন কাটিং এবং এয়ারেশন সার্ভিস।'
              : 'Golf-grade Bermuda Tifway 419 sod engineered for Dhaka climate. Precision reel cylinder mowing, laser grading, and laser-striped diamond patterns.'}
          </p>
        </div>

        {/* 3D Master Glassmorphic Kiosk */}
        <div className="relative rounded-3xl glass-panel-3d p-6 sm:p-8 lg:p-10 shadow-2xl border border-white/80">
          {/* Top Telemetry Glass Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-8 mb-8 border-b border-forest/10">
            <div className="p-4 rounded-2xl glass-pill-3d bg-white/60">
              <div className="flex items-center gap-2 text-forest/70 text-xs font-mono mb-1">
                <Sliders className="size-3.5 text-bright" />
                <span>{isBn ? 'কাটিং হাইট' : 'Height of Cut'}</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-forest">
                  {currentHeight.mm}
                </span>
                <span className="text-xs font-mono text-forest/60">mm</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-pill-3d bg-white/60">
              <div className="flex items-center gap-2 text-forest/70 text-xs font-mono mb-1">
                <Gauge className="size-3.5 text-emerald-600" />
                <span>{isBn ? 'মওয়ার স্পিড' : 'Blade Speed'}</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-forest">
                  {isMowing ? currentHeight.rpm : 0}
                </span>
                <span className="text-xs font-mono text-forest/60">RPM</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-pill-3d bg-white/60">
              <div className="flex items-center gap-2 text-forest/70 text-xs font-mono mb-1">
                <Layers className="size-3.5 text-bright" />
                <span>{isBn ? 'কাভার্ড এরিয়া' : 'Turf Finished'}</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-700">
                  {mowedPercent.toFixed(0)}%
                </span>
                <span className="text-xs font-mono text-forest/60">{isBn ? 'লেজার স্ট্রাইপ' : 'Striped'}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-pill-3d bg-white/60">
              <div className="flex items-center gap-2 text-forest/70 text-xs font-mono mb-1">
                <ShieldCheck className="size-3.5 text-forest" />
                <span>{isBn ? 'ঘাসের জাত' : 'Turf Spec'}</span>
              </div>
              <div className="text-sm font-bold text-forest truncate">Tifway 419</div>
              <div className="text-[0.68rem] text-forest/60 font-mono">{isBn ? '১০০% আগাছামুক্ত' : 'Zero-Weed Sod'}</div>
            </div>
          </div>

          {/* Interactive Lawn & Mower Showcase (Grid) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Interactive 3D Striped Turf Canvas (7 Cols) */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white min-h-[380px] bg-gradient-to-b from-[#1b4332] to-[#2d6a4f] flex flex-col justify-between p-4">
              {/* Striped Turf Rendering Base */}
              <div className="absolute inset-0 flex">
                {[...Array(14)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-full flex-1 transition-colors duration-500 ${
                      i % 2 === 0
                        ? 'bg-[#2d6a4f]' // Dark stripe (mowed away)
                        : 'bg-[#40916c]' // Light stripe (mowed toward)
                    }`}
                    style={{
                      opacity: i * 7 < mowedPercent ? 1 : 0.6,
                      filter: i * 7 < mowedPercent ? 'none' : 'grayscale(35%) brightness(0.85)',
                    }}
                  />
                ))}
              </div>

              {/* Diamond Cross-Hatch Overlay if chosen */}
              {pattern === 'diamond' && (
                <div
                  className="absolute inset-0 opacity-25 pointer-events-none"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 20px, transparent 20px, transparent 40px)',
                  }}
                />
              )}

              {/* Top Status Capsule */}
              <div className="relative z-20 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-dark-3d text-white font-mono text-xs">
                  <span className={`size-2 rounded-full ${isMowing ? 'bg-bright animate-ping' : 'bg-amber-400'}`} />
                  <span>{isMowing ? (isBn ? 'সিলিন্ডার মওয়ার রোলিং' : 'CYLINDER REEL ACTIVE') : (isBn ? 'স্ট্যান্ডবাই' : 'IDLE')}</span>
                </div>

                <div className="px-3 py-1 rounded-full glass-panel-dark-3d text-white font-mono text-xs">
                  {pattern === 'stripes' ? (isBn ? 'স্টেডিয়াম স্ট্রাইপ' : 'Stadium Stripes') : (isBn ? 'ডায়মন্ড প্যাটার্ন' : 'Diamond')}
                </div>
              </div>

              {/* Particle Canvas for Flying Clippings */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-20"
              />

              {/* 3D Glassmorphic Lawn Mower Specimen Sprite */}
              <div
                className="absolute z-20 transition-all duration-75 pointer-events-none"
                style={{
                  left: `${mowerX}%`,
                  top: `${mowerY}%`,
                  transform: `translate(-50%, -50%) scaleX(${mowerDirection})`,
                }}
              >
                {/* Mower Body Container */}
                <div className="relative w-28 h-20 rounded-2xl glass-panel-3d bg-white/95 border-2 border-forest/30 shadow-2xl p-2 flex flex-col justify-between">
                  {/* Handle bar */}
                  <div className="absolute -top-6 -left-3 w-10 h-8 border-t-2 border-l-2 border-forest/60 rounded-tl-lg" />
                  
                  {/* Motor housing */}
                  <div className="flex items-center justify-between">
                    <span className="text-[0.6rem] font-bold font-mono text-forest">DHANSHIRI</span>
                    <span className="size-2 rounded-full bg-bright animate-ping" />
                  </div>

                  {/* Rotating Cylinder Reel Blades */}
                  <div className="h-6 bg-forest/20 rounded-lg flex items-center justify-around px-1 overflow-hidden">
                    <div className={`w-full h-1 bg-forest/70 rounded ${isMowing ? 'animate-blade-spin' : ''}`} />
                    <div className={`w-full h-1 bg-bright/80 rounded ${isMowing ? 'animate-blade-spin' : ''}`} />
                  </div>

                  {/* Wheels */}
                  <div className="flex justify-between -mb-4 -mx-1">
                    <div className="size-5 rounded-full bg-charcoal border-2 border-white shadow-md" />
                    <div className="size-5 rounded-full bg-charcoal border-2 border-white shadow-md" />
                  </div>
                </div>
              </div>

              {/* Bottom Lawn Telemetry Label */}
              <div className="relative z-20 pt-32">
                <div className="p-3.5 rounded-xl glass-panel-dark-3d flex items-center justify-between text-xs text-white/90">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-bright" />
                    <span className="font-semibold">{TURF_SPECS.nameBn}</span>
                  </div>
                  <span className="font-mono text-bright font-bold">{TURF_SPECS.density}</span>
                </div>
              </div>
            </div>

            {/* Right: Glassmorphic Control Rack (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Cutting Height Presets */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-forest/70 mb-3">
                  {isBn ? 'কাটিং উচ্চতা নির্ধারণ' : 'Select Height of Cut'}
                </label>
                <div className="space-y-2.5">
                  {HEIGHTS.map((h, idx) => (
                    <button
                      key={h.mm}
                      type="button"
                      onClick={() => setHeightIdx(idx)}
                      className={`w-full p-3.5 rounded-xl text-left transition-all text-xs font-medium border flex items-center justify-between ${
                        heightIdx === idx
                          ? 'bg-forest text-white border-forest shadow-md scale-[1.01]'
                          : 'glass-pill-3d text-forest hover:bg-white/80 border-forest/10'
                      }`}
                    >
                      <span className="font-bold">{isBn ? h.labelBn : h.labelEn}</span>
                      <span className={`font-mono text-xs ${heightIdx === idx ? 'text-bright' : 'text-forest/60'}`}>
                        {h.rpm} RPM
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pattern Selector */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-forest/70 mb-3">
                  {isBn ? 'স্ট্রাইপিং প্যাটার্ন' : 'Lawn Striping Pattern'}
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {PATTERNS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPattern(p.id)}
                      className={`p-3 rounded-xl text-center text-xs font-bold transition-all border ${
                        pattern === p.id
                          ? 'bg-emerald text-white border-emerald shadow-md'
                          : 'glass-pill-3d text-forest hover:bg-white/80 border-forest/10'
                      }`}
                    >
                      {isBn ? p.nameBn : p.nameEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mower Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsMowing(!isMowing)}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${
                    isMowing
                      ? 'bg-amber-600 hover:bg-amber-700 text-white'
                      : 'bg-forest hover:bg-emerald text-white'
                  }`}
                >
                  {isMowing ? (
                    <>
                      <Pause className="size-4" />
                      <span>{isBn ? 'মওয়ার থামান' : 'Pause Mower'}</span>
                    </>
                  ) : (
                    <>
                      <Play className="size-4" />
                      <span>{isBn ? 'মওয়ার চালান' : 'Run Mower'}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMowedPercent(0)
                    setMowerX(10)
                    setMowerY(25)
                    setMowerDirection(1)
                    setIsMowing(true)
                  }}
                  title={isBn ? 'নতুন ঘাস আনুন' : 'Reset Turf'}
                  className="py-3 px-4 rounded-xl glass-panel-3d text-forest hover:bg-white/80 border border-forest/20 flex items-center justify-center gap-1.5 font-medium text-xs font-mono"
                >
                  <RotateCcw className="size-3.5" />
                  <span>{isBn ? 'রিসেট' : 'Reset'}</span>
                </button>
              </div>

              {/* Quick Inquiry CTA */}
              <a
                href="#contact"
                className="block w-full py-3.5 px-4 rounded-xl glass-specular bg-gradient-to-r from-forest to-emerald text-white font-bold text-center text-sm shadow-xl hover:shadow-2xl transition-all"
              >
                {isBn ? 'বারমুডা কার্পেট ঘাস ও রোলিং সার্ভিস বুক করুন' : 'Book Bermuda Turf & Precision Mowing'}
              </a>
            </div>
          </div>

          {/* Bottom Specifications Footnote */}
          <div className="mt-8 pt-6 border-t border-forest/10 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="flex items-center gap-2 text-forest/80">
              <CheckCircle2 className="size-4 text-bright shrink-0" />
              <span>{isBn ? '১০০% ডেনসিটি ও জিরো-উইড বারমুডা ঘাস রোল' : 'Weed-Free Nursery Cultivated Turf Rolls'}</span>
            </div>
            <div className="flex items-center gap-2 text-forest/80">
              <CheckCircle2 className="size-4 text-bright shrink-0" />
              <span>{isBn ? 'রোলার লেভেলিং ও মাটির ক্ষয়রোধ গ্যারান্টি' : 'Laser Leveling & Soil Compaction Resistance'}</span>
            </div>
            <div className="flex items-center gap-2 text-forest/80">
              <CheckCircle2 className="size-4 text-bright shrink-0" />
              <span>{isBn ? 'বাৎসরিক মওয়ার পরিচর্যা ও অ্যারিয়েশন প্যাকেজ' : 'Annual Mowing Maintenance & Aeration Contract'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
