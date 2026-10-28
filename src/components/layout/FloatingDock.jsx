import { useEffect, useRef, useState } from 'react'
import {
  ArrowUp,
  CloudRain,
  Languages,
  MessageCircle,
  Moon,
  PencilRuler,
  Phone,
  ScanSearch,
  Sparkles,
  Sun,
  Sunset,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { site } from '../../data/site'
import { useAtmosphere } from '../../lib/atmosphere'
import { useScrollProgress } from '../../lib/hooks'
import { useLocale } from '../../lib/locale'
import { getWhatsAppLink } from '../../lib/whatsapp'

export default function FloatingDock() {
  const { t, lang, toggle } = useLocale()
  const { progress } = useScrollProgress()
  const { atmosphere, effectiveAtmosphere, setAtmosphere, soundEnabled, toggleSound, playClick } = useAtmosphere()
  const [atmosphereMenuOpen, setAtmosphereMenuOpen] = useState(false)
  const menuRef = useRef(null)

  const whatsapp = getWhatsAppLink(null, null, lang)
  const phone = site.phones[0]
  const showTop = progress > 0.06

  const atmosphereCopy = t.atmosphere

  const atmosphereOptions = [
    { id: 'sun', label: atmosphereCopy.sun, icon: Sun, color: 'text-amber-500' },
    { id: 'rain', label: atmosphereCopy.rain, icon: CloudRain, color: 'text-sky-500' },
    { id: 'sunset', label: atmosphereCopy.sunset, icon: Sunset, color: 'text-orange-500' },
    { id: 'night', label: atmosphereCopy.night, icon: Moon, color: 'text-indigo-400' },
    { id: 'auto', label: atmosphereCopy.auto, icon: Sparkles, color: 'text-emerald' },
  ]

  const CurrentAtmosphereIcon =
    effectiveAtmosphere === 'night'
      ? Moon
      : effectiveAtmosphere === 'rain'
        ? CloudRain
        : effectiveAtmosphere === 'sunset'
          ? Sunset
          : Sun

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setAtmosphereMenuOpen(false)
      }
    }
    document.addEventListener('pointerdown', handleClickOutside)
    return () => document.removeEventListener('pointerdown', handleClickOutside)
  }, [])

  return (
    <>
      {/* Atmosphere Popup Drawer */}
      {atmosphereMenuOpen && (
        <div
          ref={menuRef}
          className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-3xl glass-card p-3 shadow-lift ring-1 ring-bright/35 backdrop-blur-2xl animate-pop"
        >
          <div className="mb-2 px-2 text-center">
            <span className="text-[0.72rem] font-bold uppercase tracking-wider text-forest/70">
              {atmosphereCopy.title}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {atmosphereOptions.map((opt) => {
              const Icon = opt.icon
              const isSelected = atmosphere === opt.id
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setAtmosphere(opt.id)
                    setAtmosphereMenuOpen(false)
                  }}
                  className={`flex flex-col items-center justify-center rounded-2xl px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                    isSelected
                      ? 'bg-forest text-white shadow-soft scale-105'
                      : 'text-forest hover:bg-forest/10'
                  }`}
                >
                  <Icon className={`size-5 mb-1 ${isSelected ? 'text-white' : opt.color}`} />
                  <span className="text-[0.7rem]">{opt.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Main Dynamic Dock (Desktop & Tablet) */}
      <div className="fixed bottom-6 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-2 rounded-full glass-card p-2 shadow-lift ring-1 ring-bright/40 backdrop-blur-2xl md:flex">
        {/* 1. Atmosphere Switcher Pill */}
        <button
          type="button"
          onClick={() => {
            playClick()
            setAtmosphereMenuOpen((prev) => !prev)
          }}
          aria-label={atmosphereCopy.title}
          className="group relative flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold text-forest transition hover:bg-forest/10"
        >
          <CurrentAtmosphereIcon className="size-4 text-bloom transition-transform group-hover:rotate-45" />
          <span className="capitalize">{atmosphere === 'auto' ? atmosphereCopy.auto : atmosphereCopy[atmosphere]}</span>
        </button>

        <span className="h-4 w-px bg-forest/20" />

        {/* 2. Nature Audio Synthesizer Toggle */}
        <button
          type="button"
          onClick={toggleSound}
          aria-label={soundEnabled ? atmosphereCopy.soundOff : atmosphereCopy.soundOn}
          className={`group flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition ${
            soundEnabled
              ? 'bg-bright/30 text-forest ring-1 ring-bright/50'
              : 'text-forest/70 hover:bg-forest/10 hover:text-forest'
          }`}
        >
          {soundEnabled ? (
            <>
              <Volume2 className="size-4 text-emerald animate-pulse" />
              <span>{atmosphereCopy.soundOn}</span>
            </>
          ) : (
            <>
              <VolumeX className="size-4 text-forest/50" />
              <span className="text-forest/60">{atmosphereCopy.soundOff}</span>
            </>
          )}
        </button>

        <span className="h-4 w-px bg-forest/20" />

        {/* 3. Garden Studio Quick Action */}
        <a
          href="#studio"
          className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold text-forest transition hover:bg-bright/25"
        >
          <PencilRuler className="size-4 text-emerald" />
          <span>{t.nav.studio}</span>
        </a>

        {/* 4. Plant Doctor AI Quick Action */}
        <a
          href="#plant-doctor"
          className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold text-forest transition hover:bg-bright/25"
        >
          <ScanSearch className="size-4 text-bloom" />
          <span>{t.nav.plantDoctor}</span>
        </a>

        <span className="h-4 w-px bg-forest/20" />

        {/* 5. Language Switcher */}
        <button
          type="button"
          onClick={toggle}
          aria-label={t.nav.language}
          className="flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold text-forest transition hover:bg-forest/10"
        >
          <Languages className="size-4 text-emerald" />
          <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
        </button>

        {/* 6. WhatsApp Direct Contact */}
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 rounded-full bg-forest px-4 py-2.5 text-xs font-bold text-white shadow-soft transition hover:bg-emerald hover:shadow-lift"
        >
          <MessageCircle className="size-4 transition-transform group-hover:-rotate-12 group-hover:scale-110" />
          <span>{t.actions.whatsapp}</span>
        </a>

        {/* 7. Scroll Progress & Back to Top */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label={t.actions.backToTop}
          className={`relative grid size-9 place-items-center rounded-full text-forest transition-all duration-300 ${
            showTop ? 'opacity-100 scale-100' : 'pointer-events-none opacity-0 scale-75'
          }`}
        >
          <svg className="absolute inset-0 size-9 -rotate-90">
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="2.5"
            />
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#2d6a4f"
              strokeWidth="2.5"
              strokeDasharray="88"
              strokeDashoffset={88 - progress * 88}
              strokeLinecap="round"
            />
          </svg>
          <ArrowUp className="size-4" />
        </button>
      </div>

      {/* Mobile Dynamic Bottom Bar */}
      <div className="fixed inset-x-2 bottom-3 z-40 flex items-center justify-between gap-1.5 rounded-full glass-card p-1.5 shadow-lift ring-1 ring-bright/35 backdrop-blur-2xl md:hidden">
        {/* Mood toggle */}
        <button
          type="button"
          onClick={() => setAtmosphereMenuOpen((prev) => !prev)}
          aria-label={atmosphereCopy.title}
          className="grid size-11 place-items-center rounded-full bg-forest/5 text-forest"
        >
          <CurrentAtmosphereIcon className="size-5 text-bloom" />
        </button>

        {/* Sound toggle */}
        <button
          type="button"
          onClick={toggleSound}
          aria-label={soundEnabled ? atmosphereCopy.soundOff : atmosphereCopy.soundOn}
          className={`grid size-11 place-items-center rounded-full ${soundEnabled ? 'bg-bright/30 text-forest' : 'bg-forest/5 text-forest/60'}`}
        >
          {soundEnabled ? <Volume2 className="size-5 text-emerald" /> : <VolumeX className="size-5" />}
        </button>

        {/* Garden Studio Shortcut */}
        <a
          href="#studio"
          aria-label={t.nav.studio}
          className="grid size-11 place-items-center rounded-full bg-bright/25 text-forest font-bold"
        >
          <PencilRuler className="size-5 text-forest" />
        </a>

        {/* Call Now Button */}
        <a
          href={`tel:${phone.tel}`}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-mint py-3 text-xs font-bold text-forest"
        >
          <Phone className="size-4" />
          <span>{t.actions.callNow}</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-forest py-3 text-xs font-bold text-white shadow-soft"
        >
          <MessageCircle className="size-4" />
          <span>{t.actions.whatsapp}</span>
        </a>
      </div>
    </>
  )
}
