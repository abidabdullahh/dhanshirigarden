import { useState, useEffect, useRef, useId } from 'react'
import { Droplets, Gauge, Waves, CloudRain, Play, Pause, RotateCcw, CheckCircle2, Activity, Cpu } from 'lucide-react'
import { useLocale } from '../../lib/locale'

const ZONES = [
  {
    id: 'rooftop',
    nameBn: 'গুলশান রুফটপ ড্রিপ লাইন',
    nameEn: 'Gulshan Rooftop Drip System',
    typeBn: 'প্রিসিশন মাইক্রো-ড্রিপ (১.৮ লি/ঘণ্টা)',
    typeEn: 'Precision Micro-Drip (1.8 L/h)',
    image: '/images/landscape/service-smart-micro-irrigation.jpg',
    defaultMoisture: 42,
    flowRate: 3.2,
    pressurePsi: 45,
    nozzles: 24,
  },
  {
    id: 'lawn',
    nameBn: 'পূর্বাচল ভিলা বারমুডা স্প্রিংলার',
    nameEn: 'Purbachal Bermuda Turf Rotary',
    typeBn: 'রোটারি পপ-আপ আর্কার (৩৬০° কাভারেজ)',
    typeEn: 'Rotary Pop-Up Arc Sprinkler',
    image: '/images/landscape/hero-bermuda-carpet-lawn.jpg',
    defaultMoisture: 68,
    flowRate: 14.5,
    pressurePsi: 65,
    nozzles: 8,
  },
  {
    id: 'greenwall',
    nameBn: 'ধানমন্ডি লিভিং গ্রিন ওয়াল ফগার',
    nameEn: 'Dhanmondi Living Green Wall',
    typeBn: 'হাই-প্রেশার অ্যারোসল মিস্ট (৪০ মাইক্রন)',
    typeEn: 'High-Pressure Aerosol Mist (40μ)',
    image: '/images/landscape/hero-vertical-living-green-wall.jpg',
    defaultMoisture: 55,
    flowRate: 2.1,
    pressurePsi: 80,
    nozzles: 36,
  },
  {
    id: 'nursery',
    nameBn: 'নওগাঁ মাদার নার্সারি অর্কিড বেড',
    nameEn: 'Naogaon Specimen Nursery Bed',
    typeBn: 'ক্যাপিলারি রুট হাইড্রো-ফিডার',
    typeEn: 'Capillary Root Hydro-Feeder',
    image: '/images/landscape/hero-tropical-resort-palm-steps.jpg',
    defaultMoisture: 72,
    flowRate: 4.8,
    pressurePsi: 50,
    nozzles: 18,
  },
]

export default function IrrigationAutomationEngine() {
  const { lang } = useLocale()
  const isBn = lang === 'bn'

  const [activeZoneIndex, setActiveZoneIndex] = useState(0)
  const currentZone = ZONES[activeZoneIndex]

  const [isRunning, setIsRunning] = useState(true)
  const [moisture, setMoisture] = useState(ZONES[0].defaultMoisture)
  const [pressure, setPressure] = useState(ZONES[0].pressurePsi)
  const waterSavedPercent = 42.5
  const [cycleTime, setCycleTime] = useState(180) // seconds remaining

  const selectZone = (idx) => {
    setActiveZoneIndex(idx)
    setMoisture(ZONES[idx].defaultMoisture)
    setPressure(ZONES[idx].pressurePsi)
  }

  const handleMoistureChange = (val) => {
    setMoisture(val)
    if (val < 40 && !isRunning) {
      setIsRunning(true)
    }
  }

  // Countdown timer for irrigation cycle
  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      setCycleTime((prev) => (prev > 0 ? prev - 1 : 180))
      // Gently elevate moisture while irrigating
      setMoisture((prev) => Math.min(85, prev + 0.2))
    }, 1000)
    return () => clearInterval(interval)
  }, [isRunning])

  // Canvas Particle Animation for Water Spray
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let particles = []

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    // Particle generator
    const createParticle = () => {
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height

      if (currentZone.id === 'lawn') {
        // Rotary Sprinkler Arc
        const originX = w * 0.5
        const originY = h * 0.75
        const angle = -Math.PI * 0.2 - Math.random() * (Math.PI * 0.6)
        const speed = (pressure / 60) * (4 + Math.random() * 4)
        return {
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1),
          vy: Math.sin(angle) * speed,
          gravity: 0.18,
          radius: 1.5 + Math.random() * 2,
          alpha: 0.8,
          color: 'rgba(56, 189, 248, ',
        }
      } else if (currentZone.id === 'greenwall') {
        // Ultra-fine mist floating gently
        return {
          x: Math.random() * w,
          y: h * 0.2 + Math.random() * 20,
          vx: (Math.random() - 0.5) * 1.2,
          vy: 0.6 + Math.random() * 1.5,
          gravity: 0.02,
          radius: 1.2 + Math.random() * 2.5,
          alpha: 0.6,
          color: 'rgba(216, 243, 220, ',
        }
      } else {
        // Precision Drip Emitters along soil lines
        const lineX = w * (0.2 + Math.random() * 0.6)
        return {
          x: lineX,
          y: h * 0.45,
          vx: (Math.random() - 0.5) * 0.4,
          vy: 1.5 + Math.random() * 2,
          gravity: 0.25,
          radius: 2 + Math.random() * 1.5,
          alpha: 0.9,
          color: 'rgba(56, 189, 248, ',
        }
      }
    }

    const render = () => {
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      ctx.clearRect(0, 0, w, h)

      if (isRunning) {
        // Spawn particles based on pressure
        const spawnCount = Math.floor(pressure / 15)
        for (let i = 0; i < spawnCount; i++) {
          particles.push(createParticle())
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += p.gravity
        p.alpha -= 0.012

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color + Math.max(0, p.alpha) + ')'
        ctx.fill()

        // Splash ripple when hitting ground level
        if (p.y >= h * 0.82 && p.alpha > 0.3) {
          ctx.beginPath()
          ctx.ellipse(p.x, h * 0.82, p.radius * 3, p.radius, 0, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(82, 183, 136, 0.2)'
          ctx.fill()
        }
      })

      particles = particles.filter((p) => p.alpha > 0 && p.y < h)
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
    }
  }, [isRunning, pressure, currentZone.id])

  const formatMinutes = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const moistureSliderId = useId()
  const pressureSliderId = useId()

  return (
    <section id="irrigation-engine" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FCFCFA] via-[#F4F9F4] to-[#FCFCFA] overflow-hidden">
      {/* 3D Ambient Orbs */}
      <div className="absolute top-1/4 left-5 w-96 h-96 bg-bright/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[28rem] h-[28rem] bg-forest/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill-3d text-forest font-mono text-xs uppercase tracking-wider mb-4">
            <Cpu className="size-3.5 text-bright animate-pulse" />
            <span>{isBn ? 'হাইড্রোলিক অটমেশন ইঞ্জিন' : 'Hydraulic Automation Engine v4.2'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-sutonny text-forest tracking-tight leading-tight">
            {isBn ? 'স্বয়ংক্রিয় মাইক্রো-ইরিগেশন ও ওয়াটার ম্যানেজমেন্ট' : 'Automated Micro-Irrigation & Water Architecture'}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal/80 leading-relaxed">
            {isBn
              ? 'ঢাকার ছাদবাগান ও আধুনিক ল্যান্ডস্কেপের জন্য ৪২% পানি সাশ্রয়ী স্বয়ংক্রিয় ড্রিপ ও স্প্রিংলার নেটওয়ার্ক। সেন্সর নিয়ন্ত্রিত সয়েল ময়েশ্চার এবং ক্লাউড শিডিউলিং।'
              : 'Engineered multi-zone hydraulic systems delivering precision micro-drip, rotary arcs, and aerosol mist with real-time soil moisture feedback and 42% water conservation.'}
          </p>
        </div>

        {/* 3D Glassmorphic Master Console */}
        <div className="relative rounded-3xl glass-panel-3d p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden border border-white/80">
          {/* Top Telemetry Glass Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-8 mb-8 border-b border-forest/10">
            <div className="p-4 rounded-2xl glass-pill-3d bg-white/60">
              <div className="flex items-center gap-2 text-forest/70 text-xs font-mono mb-1">
                <Activity className="size-3.5 text-bright" />
                <span>{isBn ? 'সয়েল ময়েশ্চার' : 'Soil Moisture'}</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-forest">
                  {moisture.toFixed(0)}%
                </span>
                <span className={`text-xs font-semibold ${moisture < 45 ? 'text-amber-600' : 'text-emerald-700'}`}>
                  {moisture < 45 ? (isBn ? 'শুষ্ক / সেচ প্রয়োজন' : 'Dry / Active') : (isBn ? 'আদর্শ আর্দ্রতা' : 'Optimal')}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-pill-3d bg-white/60">
              <div className="flex items-center gap-2 text-forest/70 text-xs font-mono mb-1">
                <Gauge className="size-3.5 text-cyan-600" />
                <span>{isBn ? 'ওয়াটার প্রেশার' : 'Line Pressure'}</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-forest">
                  {pressure}
                </span>
                <span className="text-xs font-mono text-forest/60">PSI</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-pill-3d bg-white/60">
              <div className="flex items-center gap-2 text-forest/70 text-xs font-mono mb-1">
                <Droplets className="size-3.5 text-bright" />
                <span>{isBn ? 'পানি সাশ্রয়' : 'Water Saved'}</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-700">
                  {waterSavedPercent}%
                </span>
                <span className="text-xs font-mono text-forest/60">{isBn ? 'বনাম সাধারণ সেচ' : 'vs Flood'}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-pill-3d bg-white/60">
              <div className="flex items-center gap-2 text-forest/70 text-xs font-mono mb-1">
                <CloudRain className="size-3.5 text-blue-600" />
                <span>{isBn ? 'ঢাকা ওয়েদার সিঙ্ক' : 'Dhaka Weather Sync'}</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-forest">28°C</span>
                <span className="text-xs font-semibold text-blue-700">{isBn ? 'বৃষ্টি নেই (সক্রিয়)' : 'Rain: Dry'}</span>
              </div>
            </div>
          </div>

          {/* Main 2-Column Interface: Left 3D Visualizer, Right Control Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: 3D Animated Canvas Visualizer (7 Cols) */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-inner bg-gradient-to-b from-[#11241b] via-[#1a382c] to-[#0f2118] border border-white/20 p-4 min-h-[380px] flex flex-col justify-between">
              {/* Top Status Overlay */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-dark-3d text-white font-mono text-xs">
                  <span className={`size-2 rounded-full ${isRunning ? 'bg-bright animate-ping' : 'bg-amber-400'}`} />
                  <span>{isRunning ? (isBn ? 'সেচ চালু আছে (লাইভ স্প্রে)' : 'IRRIGATION ACTIVE') : (isBn ? 'স্ট্যান্ডবাই' : 'SYSTEM STANDBY')}</span>
                </div>
                <div className="px-3 py-1 rounded-full glass-panel-dark-3d text-white/90 font-mono text-xs">
                  {isBn ? 'অবশিষ্ট সময়: ' : 'CYCLE: '}
                  <span className="text-bright font-bold">{formatMinutes(cycleTime)}</span>
                </div>
              </div>

              {/* Water Spray Simulation Canvas */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
              />

              {/* Background Landscape Environment Mockup */}
              <div className="absolute inset-0 opacity-40 mix-blend-overlay">
                <img
                  src={currentZone.image}
                  alt={currentZone.nameEn}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom Ground Elevation Indicator */}
              <div className="relative z-10 pt-32">
                <div className="p-3.5 rounded-xl glass-panel-dark-3d flex items-center justify-between text-xs text-white/90">
                  <div className="flex items-center gap-2.5">
                    <div className="size-8 rounded-lg bg-bright/20 flex items-center justify-center text-bright">
                      <Waves className="size-4 animate-bounce" />
                    </div>
                    <div>
                      <div className="font-semibold">{currentZone.nameBn}</div>
                      <div className="text-[0.7rem] text-white/60 font-mono">{currentZone.typeBn}</div>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-bright font-bold">{currentZone.flowRate} L/min</span>
                    <div className="text-[0.68rem] text-white/60">{currentZone.nozzles} {isBn ? 'নজল সক্রিয়' : 'Nozzles'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Glassmorphic Control Rack (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Zone Selector Buttons */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-forest/70 mb-3">
                  {isBn ? 'সেচ জোন নির্বাচন করুন' : 'Select Irrigation Zone'}
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {ZONES.map((zone, idx) => (
                    <button
                      key={zone.id}
                      type="button"
                      onClick={() => selectZone(idx)}
                      className={`p-3 rounded-xl text-left transition-all text-xs font-medium border ${
                        activeZoneIndex === idx
                          ? 'bg-forest text-white border-forest shadow-md scale-[1.02]'
                          : 'glass-pill-3d text-forest hover:bg-white/80 border-forest/10'
                      }`}
                    >
                      <div className="font-bold truncate">{isBn ? zone.nameBn.split(' ')[0] + ' ' + zone.nameBn.split(' ')[1] : zone.nameEn.split(' ')[0]}</div>
                      <div className={`text-[0.68rem] font-mono mt-0.5 ${activeZoneIndex === idx ? 'text-bright' : 'text-forest/60'}`}>
                        {zone.pressurePsi} PSI
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Moisture Slider Sensor Control */}
              <div className="p-4 rounded-2xl glass-panel-3d border border-white/60">
                <div className="flex justify-between items-center text-xs mb-2">
                  <label htmlFor={moistureSliderId} className="font-bold text-forest flex items-center gap-1.5 cursor-pointer">
                    <Activity className="size-3.5 text-bright" />
                    <span>{isBn ? 'সয়েল ময়েশ্চার সিমুলেটর' : 'Simulate Soil Moisture'}</span>
                  </label>
                  <span className="font-mono font-bold text-forest">{moisture.toFixed(0)}%</span>
                </div>
                <input
                  id={moistureSliderId}
                  type="range"
                  min="15"
                  max="95"
                  value={moisture}
                  onChange={(e) => handleMoistureChange(Number(e.target.value))}
                  aria-label={isBn ? 'সয়েল ময়েশ্চার সিমুলেটর' : 'Simulate Soil Moisture'}
                  className="w-full h-2 bg-forest/10 rounded-lg appearance-none cursor-pointer accent-forest"
                />
                <div className="flex justify-between text-[0.68rem] font-mono text-forest/60 mt-1.5">
                  <span>15% ({isBn ? 'তৃষ্ণার্ত' : 'Parched'})</span>
                  <span>45% ({isBn ? 'অটো-ট্রিগার' : 'Trigger'})</span>
                  <span>95% ({isBn ? 'সম্পৃক্ত' : 'Saturated'})</span>
                </div>
              </div>

              {/* Pressure Regulator Slider */}
              <div className="p-4 rounded-2xl glass-panel-3d border border-white/60">
                <div className="flex justify-between items-center text-xs mb-2">
                  <label htmlFor={pressureSliderId} className="font-bold text-forest flex items-center gap-1.5 cursor-pointer">
                    <Gauge className="size-3.5 text-cyan-600" />
                    <span>{isBn ? 'হাইড্রোলিক প্রেশার নিয়ন্ত্রণ' : 'Hydraulic Line Pressure'}</span>
                  </label>
                  <span className="font-mono font-bold text-forest">{pressure} PSI</span>
                </div>
                <input
                  id={pressureSliderId}
                  type="range"
                  min="30"
                  max="90"
                  value={pressure}
                  onChange={(e) => setPressure(Number(e.target.value))}
                  aria-label={isBn ? 'হাইড্রোলিক প্রেশার নিয়ন্ত্রণ' : 'Hydraulic Line Pressure'}
                  className="w-full h-2 bg-forest/10 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                />
                <div className="flex justify-between text-[0.68rem] font-mono text-forest/60 mt-1.5">
                  <span>30 PSI ({isBn ? 'ড্রিপ' : 'Low'})</span>
                  <span>60 PSI ({isBn ? 'স্প্রিংলার' : 'Optimal'})</span>
                  <span>90 PSI ({isBn ? 'মিস্ট ফগার' : 'Max Mist'})</span>
                </div>
              </div>

              {/* Master Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsRunning(!isRunning)}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${
                    isRunning
                      ? 'bg-amber-600 hover:bg-amber-700 text-white'
                      : 'bg-forest hover:bg-emerald text-white'
                  }`}
                >
                  {isRunning ? (
                    <>
                      <Pause className="size-4" />
                      <span>{isBn ? 'সেচ বিরতি দিন' : 'Pause Irrigation'}</span>
                    </>
                  ) : (
                    <>
                      <Play className="size-4" />
                      <span>{isBn ? 'সেচ শুরু করুন' : 'Start Irrigation'}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleMoistureChange(25)
                    setIsRunning(true)
                  }}
                  title={isBn ? 'ড্রাই সাইকেল টেস্ট' : 'Dry Cycle Test'}
                  className="py-3 px-4 rounded-xl glass-panel-3d text-forest hover:bg-white/80 border border-forest/20 flex items-center justify-center gap-1.5 font-medium text-xs font-mono"
                >
                  <RotateCcw className="size-3.5" />
                  <span>{isBn ? 'ড্রাই টেস্ট' : 'Dry Test'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Value Props Banner */}
          <div className="mt-8 pt-6 border-t border-forest/10 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="flex items-center gap-2 text-forest/80">
              <CheckCircle2 className="size-4 text-bright shrink-0" />
              <span>{isBn ? '১০০% অটোমেটেড সয়েল ও রেইন সেন্সর কাট-অফ' : 'Automated Rain Bypass & Moisture Sensors'}</span>
            </div>
            <div className="flex items-center gap-2 text-forest/80">
              <CheckCircle2 className="size-4 text-bright shrink-0" />
              <span>{isBn ? 'ছাদ ও ব্যালকনির জন্য লিক-প্রুফ ড্রিপ স্পেসিফিকেশন' : 'Zero-Drip High Density Polyethylene Tubing'}</span>
            </div>
            <div className="flex items-center gap-2 text-forest/80">
              <CheckCircle2 className="size-4 text-bright shrink-0" />
              <span>{isBn ? 'মোবাইল অ্যাপ ও সাইট কন্ট্রোলার ইন্টিগ্রেশন' : 'IoT Mobile App Controller Ready'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
