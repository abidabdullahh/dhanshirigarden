import { useEffect, useRef, useState } from 'react'
import { ChevronsLeftRight, MapPin, Sparkles, TrendingUp } from 'lucide-react'
import { photos } from '../../data/images'
import { useLocale } from '../../lib/locale'
import Img from '../ui/Img'
import { Container, Section, SectionHeading } from '../ui/Section'
import InteractiveCard3D from './InteractiveCard3D'

const projectImages = [
  {
    before: photos.blueprint,
    after: photos.rooftopTerrace,
  },
  {
    before: photos.mowerClose,
    after: photos.palmSteps,
  },
  {
    before: photos.greenhouseRows,
    after: photos.greenWall,
  },
]

export default function BeforeAfterShowcase() {
  const { t, lang, n } = useLocale()
  const copy = t.beforeAfter
  const [activeCase, setActiveCase] = useState(0)
  const [sliderPos, setSliderPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [containerWidth, setContainerWidth] = useState(800)
  const containerRef = useRef(null)

  const currentCase = copy.cases[activeCase]
  const images = projectImages[activeCase]

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth)
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const updatePosition = (clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100))
    setSliderPos(percent)
  }

  const handlePointerDown = (e) => {
    setIsDragging(true)
    updatePosition(e.clientX)
  }

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isDragging) return
      updatePosition(e.clientX)
    }

    const handlePointerUp = () => {
      if (isDragging) setIsDragging(false)
    }

    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove)
      window.addEventListener('pointerup', handlePointerUp)
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [isDragging])

  return (
    <Section id="transformations" className="relative overflow-hidden bg-gradient-to-b from-transparent via-white/50 to-transparent">
      <Container>
        <SectionHeading
          eyebrow={copy.eyebrow}
          icon={Sparkles}
          title={copy.title}
          sub={copy.sub}
        />

        {/* Case tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {copy.cases.map((item, idx) => {
            const isActive = activeCase === idx
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => {
                  setActiveCase(idx)
                  setSliderPos(50)
                }}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-forest text-white shadow-lift scale-105'
                    : 'glass-white text-forest/75 hover:bg-forest/10 hover:text-forest'
                }`}
              >
                <span>{n(idx + 1)}.</span>
                <span>{item.title}</span>
              </button>
            )
          })}
        </div>

        {/* Interactive Split Comparison Card */}
        <div className="mx-auto max-w-4xl">
          <InteractiveCard3D
            maxTilt={3}
            glare={false}
            className="rounded-[2.5rem] glass-card p-4 shadow-lift ring-1 ring-bright/30 sm:p-6"
          >
            {/* Meta bar */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-2">
              <div className="flex items-center gap-2 text-sm font-bold text-forest">
                <MapPin className="size-4 text-emerald" />
                <span>{currentCase.location}</span>
                <span className="text-forest/40">·</span>
                <span className="font-normal text-charcoal/70">{currentCase.spec}</span>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-mint px-3.5 py-1 text-xs font-bold text-forest">
                <TrendingUp className="size-3.5 text-emerald" />
                <span>{currentCase.stat}</span>
              </div>
            </div>

            {/* Draggable Slider Stage */}
            <div
              ref={containerRef}
              onPointerDown={handlePointerDown}
              className="relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-[2rem] bg-mint shadow-soft"
            >
              {/* AFTER Image (Full width background) */}
              <div className="absolute inset-0">
                <Img photo={images.after} width={1200} sizes="(min-width: 1024px) 60vw, 95vw" />
                <span className="absolute bottom-4 right-4 z-10 rounded-full bg-forest/85 px-3.5 py-1.5 text-xs font-bold text-white shadow-soft backdrop-blur-md">
                  {copy.afterLabel}
                </span>
              </div>

              {/* BEFORE Image (Clipped overlay) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <div className="absolute inset-y-0 left-0" style={{ width: `${containerWidth}px` }}>
                  <Img photo={images.before} width={1200} sizes="(min-width: 1024px) 60vw, 95vw" />
                </div>
                <div className="absolute inset-0 bg-slate-900/20 backdrop-saturate-50" />
                <span className="absolute bottom-4 left-4 z-10 rounded-full bg-charcoal/85 px-3.5 py-1.5 text-xs font-bold text-white shadow-soft backdrop-blur-md">
                  {copy.beforeLabel}
                </span>
              </div>

              {/* Slider Divider Line & Center Knob */}
              <div
                className="absolute inset-y-0 z-20 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)]"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -ml-5 -mt-5 grid size-10 place-items-center rounded-full bg-white text-forest shadow-lift ring-4 ring-forest/30 transition-transform duration-200 hover:scale-110 active:scale-95">
                  <ChevronsLeftRight className="size-5" />
                </div>
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-charcoal/60">
              {lang === 'bn'
                ? '👆 স্লাইডারটি ডানে-বামে টেনে আগে ও পরের পরিবর্তন দেখুন'
                : '👆 Drag the slider handle left and right to inspect the transformation'}
            </p>
          </InteractiveCard3D>
        </div>
      </Container>
    </Section>
  )
}
