import { useMemo, useState } from 'react'
import { Building2, MessageCircle } from 'lucide-react'
import { photos } from '../../data/images'
import { useInView } from '../../lib/hooks'
import { useLocale } from '../../lib/locale'
import { getWhatsAppLink } from '../../lib/whatsapp'
import Button from '../ui/Button'
import Img from '../ui/Img'
import { Container, Section, SectionHeading } from '../ui/Section'

/** Highlight ring + callout position for each layer, bottom (1) to top (6), in SVG units. */
const layerGeo = [
  { ring: { x: 40, y: 300, w: 560, h: 52 }, callout: { side: 'left', y: 326 } },
  { ring: { x: 64, y: 288, w: 512, h: 12 }, callout: { side: 'right', y: 294 } },
  { ring: { x: 76, y: 258, w: 488, h: 30 }, callout: { side: 'left', y: 273 } },
  { ring: { x: 76, y: 250, w: 488, h: 8 }, callout: { side: 'right', y: 254 } },
  { ring: { x: 76, y: 190, w: 488, h: 60 }, callout: { side: 'left', y: 220 } },
  { ring: { x: 64, y: 56, w: 512, h: 134 }, callout: { side: 'right', y: 150 } },
]

const wave = `M76 250V190q20-6 40 0${'t40 0'.repeat(11)}H564V250z`

function RooftopDrawing({ focus, onFocus, onToggle, active }) {
  const { t, n } = useLocale()

  const layer = (index, children) => (
    <g
      style={{ transitionDelay: `${index * 170}ms` }}
      className={`transition duration-700 ease-out ${active ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}
    >
      <g
        className={`cursor-pointer transition-opacity duration-300 ${focus !== null && focus !== index ? 'opacity-30' : 'opacity-100'}`}
        onPointerEnter={() => onFocus(index)}
        onPointerLeave={() => onFocus(null)}
        onClick={() => onToggle(index)}
      >
        {children}
      </g>
    </g>
  )

  return (
    <svg
      viewBox="0 0 640 400"
      role="img"
      aria-label={t.rooftop.drawingLabel}
      className="h-auto w-full overflow-visible"
    >
      <defs>
        <pattern id="rt-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="9" stroke="#3a5a73" strokeOpacity="0.3" strokeWidth="1.4" />
        </pattern>
        <pattern id="rt-cups" width="24" height="30" x="76" y="258" patternUnits="userSpaceOnUse">
          <path d="M4 30V14a8 8 0 0 1 16 0v16" fill="none" stroke="#3a5a73" strokeOpacity="0.6" strokeWidth="1.7" />
        </pattern>
        <pattern id="rt-soil" width="22" height="18" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="1.6" fill="#6f5238" opacity="0.55" />
          <circle cx="14" cy="10" r="1.2" fill="#e5d3b6" opacity="0.85" />
          <circle cx="8" cy="15" r="1.4" fill="#6f5238" opacity="0.45" />
          <circle cx="19" cy="3" r="1" fill="#e5d3b6" opacity="0.7" />
        </pattern>
      </defs>

      {/* sun + wind: the conditions that decide which plants go where */}
      <g aria-hidden="true">
        <circle cx="548" cy="42" r="13" fill="#d99a2b" fillOpacity="0.4" stroke="#d99a2b" strokeWidth="2.4" />
        <path
          d="M548 14v6M548 64v6M520 42h6M570 42h6M528 22l4 4M564 58l4 4M528 62l4-4M564 26l4-4"
          stroke="#d99a2b"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path d="M84 40h46M102 54h62M90 68h32" stroke="#3a5a73" strokeOpacity="0.28" strokeWidth="2.2" strokeLinecap="round" />
      </g>

      {/* 1 · slab, parapets and the floors below */}
      {layer(
        0,
        <g>
          <rect x="40" y="352" width="560" height="48" fill="#eef3f1" stroke="#3a5a73" strokeOpacity="0.4" />
          {[86, 226, 366, 506].map((x) => (
            <rect key={x} x={x} y="368" width="54" height="32" rx="3" fill="#d8f3dc" stroke="#3a5a73" strokeOpacity="0.35" />
          ))}
          <rect x="40" y="300" width="560" height="52" fill="#e6ece9" />
          <rect x="40" y="300" width="560" height="52" fill="url(#rt-hatch)" stroke="#3a5a73" strokeWidth="2" />
          <rect x="40" y="130" width="24" height="170" fill="#e6ece9" />
          <rect x="40" y="130" width="24" height="170" fill="url(#rt-hatch)" stroke="#3a5a73" strokeWidth="2" />
          <rect x="576" y="130" width="24" height="170" fill="#e6ece9" />
          <rect x="576" y="130" width="24" height="170" fill="url(#rt-hatch)" stroke="#3a5a73" strokeWidth="2" />
        </g>,
      )}

      {/* 2 · waterproofing, turned up the parapet faces */}
      {layer(1, <path d="M70 150V294H570V150" fill="none" stroke="#3a5a73" strokeWidth="12" />)}

      {/* 3 · drainage cups */}
      {layer(
        2,
        <g>
          <rect x="76" y="258" width="488" height="30" fill="#dbe7ee" />
          <rect x="76" y="258" width="488" height="30" fill="url(#rt-cups)" />
        </g>,
      )}

      {/* 4 · filter fabric */}
      {layer(
        3,
        <g>
          <rect x="76" y="250" width="488" height="8" fill="#c5e8d3" />
          <path d="M76 254H564" stroke="#2d6a4f" strokeWidth="1.6" strokeDasharray="5 4" />
        </g>,
      )}

      {/* 5 · lightweight growing mix */}
      {layer(
        4,
        <g>
          <path d={wave} fill="#b08d68" />
          <path d={wave} fill="url(#rt-soil)" />
        </g>,
      )}

      {/* 6 · planting + drip line */}
      {layer(
        5,
        <g>
          <path d="M70 184H570" stroke="#3a5a73" strokeWidth="2.2" strokeLinecap="round" />
          {[118, 214, 320, 438, 520].map((x, i) => (
            <g key={x}>
              <circle cx={x} cy="184" r="3.2" fill="#3a5a73" />
              <circle
                cx={x}
                cy="190"
                r="2.4"
                fill="#6f9bb8"
                className="animate-drip"
                style={{ animationDelay: `${i * 0.35}s` }}
              />
            </g>
          ))}

          {/* flowering shrub */}
          <path d="M110 184v-12M140 184v-18M170 184v-12" stroke="#2d6a4f" strokeWidth="4" strokeLinecap="round" />
          <circle cx="122" cy="158" r="22" fill="#40916c" />
          <circle cx="152" cy="148" r="26" fill="#2d6a4f" />
          <circle cx="176" cy="166" r="18" fill="#52b788" />
          <circle cx="104" cy="170" r="14" fill="#52b788" />
          {[
            [138, 136],
            [162, 138],
            [120, 150],
            [172, 158],
            [108, 166],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r="5.2" fill="#d99a2b" />
              <circle cx={x} cy={y} r="1.8" fill="#fff" />
            </g>
          ))}

          {/* small fruit tree */}
          <rect x="314" y="116" width="12" height="70" rx="4" fill="#8b6b4a" />
          <circle cx="320" cy="94" r="38" fill="#2d6a4f" />
          <circle cx="288" cy="112" r="24" fill="#40916c" />
          <circle cx="352" cy="112" r="24" fill="#40916c" />
          <circle cx="322" cy="70" r="24" fill="#52b788" />
          {[
            [300, 90],
            [338, 98],
            [318, 120],
            [346, 80],
            [296, 120],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="4.6" fill="#d99a2b" />
          ))}

          {/* leafy vegetables */}
          {[424, 458, 492, 526].map((x, i) => (
            <g key={x}>
              <ellipse cx={x - 7} cy="168" rx="8" ry="22" transform={`rotate(-24 ${x} 190)`} fill={i % 2 ? '#52b788' : '#74c69d'} />
              <ellipse cx={x + 7} cy="168" rx="8" ry="22" transform={`rotate(24 ${x} 190)`} fill={i % 2 ? '#74c69d' : '#52b788'} />
              <ellipse cx={x} cy="164" rx="7" ry="24" fill="#2d6a4f" />
            </g>
          ))}
        </g>,
      )}

      {/* highlight ring for the focused layer */}
      {layerGeo.map((geo, i) => (
        <rect
          key={`ring-${i}`}
          x={geo.ring.x - 3}
          y={geo.ring.y - 3}
          width={geo.ring.w + 6}
          height={geo.ring.h + 6}
          rx="6"
          fill="none"
          stroke="#d99a2b"
          strokeWidth="3"
          strokeDasharray="8 6"
          className={`pointer-events-none transition-opacity duration-300 ${focus === i ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}

      {/* numbered callouts, alternating sides so they never collide */}
      {layerGeo.map((geo, i) => {
        const left = geo.callout.side === 'left'
        const cx = left ? 16 : 624
        const x1 = left ? cx + 12 : cx - 12
        const x2 = left ? 100 : 540
        const on = focus === i
        return (
          <g
            key={`callout-${i}`}
            style={{ transitionDelay: `${900 + i * 90}ms` }}
            className={`cursor-pointer transition-opacity duration-700 ${active ? 'opacity-100' : 'opacity-0'}`}
            onPointerEnter={() => onFocus(i)}
            onPointerLeave={() => onFocus(null)}
            onClick={() => onToggle(i)}
          >
            <line x1={x1} y1={geo.callout.y} x2={x2} y2={geo.callout.y} stroke="#1b4332" strokeOpacity="0.5" strokeDasharray="2 4" strokeWidth="1.6" />
            <circle cx={cx} cy={geo.callout.y} r="13" fill={on ? '#d99a2b' : '#1b4332'} className="transition-colors duration-300" />
            <text
              x={cx}
              y={geo.callout.y}
              fill={on ? '#212529' : '#fff'}
              fontSize="14"
              fontWeight="700"
              textAnchor="middle"
              dominantBaseline="central"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {n(i + 1)}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default function Rooftop() {
  const { t, lang, n } = useLocale()
  const [ref, inView] = useInView({ threshold: 0.25 })
  const [hover, setHover] = useState(null)
  const [pinned, setPinned] = useState(null)
  const focus = hover ?? pinned
  const copy = t.rooftop

  const legend = useMemo(() => copy.layers.map((layer, index) => ({ ...layer, index })).reverse(), [copy.layers])

  return (
    <Section id="rooftop" className="bg-linear-to-b from-mint/50 via-mint/30 to-transparent">
      <div aria-hidden="true" className="absolute inset-0 -z-10 blueprint-grid opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
      <div aria-hidden="true" className="absolute -right-24 top-40 -z-10 size-96 rounded-full bg-bloom/15 blur-3xl" />

      <Container>
        <SectionHeading eyebrow={copy.eyebrow} icon={Building2} title={copy.title} sub={copy.intro} />

        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden bg-mint shadow-lift ring-8 ring-white/70 leaf-b">
                <Img photo={photos.rooftopTerrace} width={1000} sizes="(min-width: 1024px) 40vw, 92vw" />
              </div>
              <div className="absolute -bottom-10 left-4 right-4 rounded-3xl glass-green-strong p-5 shadow-lift sm:left-8 sm:right-8">
                <p className="font-display text-base font-semibold text-forest">{copy.usesTitle}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {copy.uses.map((use) => (
                    <li key={use} className="rounded-full bg-white/80 px-3 py-1.5 text-sm font-medium text-forest">
                      {use}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-20">
              <Button href={getWhatsAppLink(t.services.items.rooftopPlanter.title, null, lang)} size="lg" icon={MessageCircle}>
                {copy.cta}
              </Button>
            </div>
          </div>

          <div ref={ref} className="rounded-[2.25rem] glass-white p-5 shadow-lift sm:p-8 lg:col-span-7">
            <h3 className="text-xl sm:text-2xl">{copy.layersTitle}</h3>
            <p className="mt-1.5 text-sm leading-body text-charcoal/65">{copy.layersHint}</p>

            <div className="mt-5">
              <RooftopDrawing
                focus={focus}
                active={inView}
                onFocus={setHover}
                onToggle={(index) => setPinned((current) => (current === index ? null : index))}
              />
            </div>

            <ol className="mt-6 grid gap-2 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-3">
              {legend.map((layer) => {
                const on = focus === layer.index
                return (
                  <li key={layer.title}>
                    <button
                      type="button"
                      aria-pressed={pinned === layer.index}
                      onMouseEnter={() => setHover(layer.index)}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover(layer.index)}
                      onBlur={() => setHover(null)}
                      onClick={() => setPinned((current) => (current === layer.index ? null : layer.index))}
                      className={`flex h-full w-full items-start gap-3 rounded-2xl p-3 text-left transition-colors duration-200 ${
                        on ? 'bg-bloom-soft ring-1 ring-bloom/40' : 'hover:bg-mint/60'
                      }`}
                    >
                      <span
                        className={`grid size-8 shrink-0 place-items-center rounded-full font-display text-sm font-bold transition-colors ${
                          on ? 'bg-bloom text-charcoal' : 'bg-forest text-white'
                        }`}
                      >
                        {n(layer.index + 1)}
                      </span>
                      <span>
                        <span className="block font-display text-[1rem] font-semibold leading-snug text-forest">{layer.title}</span>
                        <span className="mt-0.5 block text-[0.88rem] leading-snug text-charcoal/70">{layer.desc}</span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  )
}
