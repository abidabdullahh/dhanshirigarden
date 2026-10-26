import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronsLeftRight } from 'lucide-react'
import { useInView, usePrefersReducedMotion } from '../../lib/hooks'
import { useLocale } from '../../lib/locale'

const W = 800
const H = 450
const HORIZON = 186

/** Small deterministic PRNG so the drawn grass is identical on every render and build. */
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

const rows = [
  { y: 214, h: 26, gap: 7, w: 1.4 },
  { y: 252, h: 34, gap: 9, w: 1.8 },
  { y: 298, h: 46, gap: 12, w: 2.4 },
  { y: 354, h: 60, gap: 15, w: 3.1 },
  { y: 424, h: 80, gap: 19, w: 3.9 },
]
const bladeColors = ['#2d6a4f', '#3d8b63', '#52b788', '#74c69d', '#40916c']

function buildBlades() {
  const random = mulberry32(2024)
  const blades = []
  rows.forEach((row, rowIndex) => {
    for (let x = -6; x < W + 8; x += row.gap * (0.75 + random() * 0.5)) {
      const height = row.h * (0.7 + random() * 0.55)
      const lean = (random() - 0.5) * row.h * 0.7
      const bend = lean * 0.2 + (random() - 0.5) * 6
      blades.push(
        <path
          key={`${rowIndex}-${x.toFixed(1)}`}
          d={`M${x.toFixed(1)} ${row.y}Q${(x + bend).toFixed(1)} ${(row.y - height * 0.6).toFixed(1)} ${(x + lean).toFixed(1)} ${(row.y - height).toFixed(1)}`}
          stroke={bladeColors[Math.floor(random() * bladeColors.length)]}
          strokeWidth={row.w}
          strokeLinecap="round"
          fill="none"
        />,
      )
    }
  })
  return blades
}

const stripeEdges = [HORIZON, 199, 215, 234, 256, 282, 313, 350, 395, H]

function buildClippings() {
  const random = mulberry32(77)
  return Array.from({ length: 11 }, (_, i) => ({
    dx: -24 - random() * 70,
    dy: -random() * 46 - 4,
    r: random() * 180,
    s: 4 + random() * 4,
    k: i,
  }))
}

/**
 * Before/after lawn illustration: drag (or use arrow keys on) the hidden range input and the
 * mower cuts the long grass. Pure SVG, so it never depends on an external photo.
 */
export default function MowSlider() {
  const { t } = useLocale()
  const reduced = usePrefersReducedMotion()
  const [ref, inView] = useInView({ threshold: 0.4 })
  const [pos, setPos] = useState(() => (reduced ? 55 : 6))
  const touched = useRef(false)

  const blades = useMemo(() => buildBlades(), [])
  const clippings = useMemo(() => buildClippings(), [])

  // One gentle demonstration sweep the first time the slider scrolls into view.
  useEffect(() => {
    if (!inView || touched.current || reduced) return undefined
    let frame = 0
    const start = performance.now()
    const from = 6
    const to = 56
    const tick = (now) => {
      if (touched.current) return
      const p = Math.min((now - start) / 2200, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setPos(from + (to - from) * eased)
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduced])

  const x = (pos / 100) * W

  return (
    <div
      ref={ref}
      className="relative aspect-[16/9] w-full overflow-hidden rounded-[1.5rem] bg-mint shadow-soft ring-1 ring-forest/10 focus-within:ring-2 focus-within:ring-emerald"
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="mow-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#dff3e5" />
            <stop offset="1" stopColor="#f8f9fa" />
          </linearGradient>
          <clipPath id="mow-cut">
            <rect x="0" y="0" width={x} height={H} />
          </clipPath>
          <clipPath id="mow-long">
            <rect x={x} y="0" width={W - x} height={H} />
          </clipPath>
        </defs>

        <rect width={W} height={HORIZON + 6} fill="url(#mow-sky)" />
        <g fill="#fff" opacity="0.9">
          <ellipse cx="150" cy="58" rx="46" ry="14" />
          <ellipse cx="184" cy="48" rx="30" ry="12" />
          <ellipse cx="560" cy="80" rx="52" ry="14" />
          <ellipse cx="596" cy="68" rx="30" ry="11" />
        </g>
        <circle cx="340" cy="66" r="22" fill="#d99a2b" fillOpacity="0.45" />
        <g fill="#95d5b2" opacity="0.8">
          {[40, 130, 240, 330, 470, 560, 660, 760].map((cx, i) => (
            <ellipse key={cx} cx={cx} cy={HORIZON - 4} rx={46 + (i % 3) * 14} ry={22 + (i % 2) * 10} />
          ))}
        </g>

        <rect y={HORIZON} width={W} height={H - HORIZON} fill="#74c69d" />

        {/* mowed: perspective stripes */}
        <g clipPath="url(#mow-cut)">
          {stripeEdges.slice(0, -1).map((top, i) => (
            <rect key={top} x="0" y={top} width={W} height={stripeEdges[i + 1] - top + 1} fill={i % 2 ? '#5cb07c' : '#6fc08d'} />
          ))}
        </g>

        {/* not yet mowed: long grass */}
        <g clipPath="url(#mow-long)">
          <rect y={HORIZON} width={W} height={H - HORIZON} fill="#3f8d63" />
          {blades}
        </g>

        {/* cut line */}
        <line x1={x} y1={HORIZON - 4} x2={x} y2={H} stroke="#fff" strokeOpacity="0.85" strokeWidth="2.5" strokeDasharray="6 6" />

        {/* clippings */}
        <g fill="#2d6a4f">
          {clippings.map((c) => (
            <rect
              key={c.k}
              x={x + c.dx}
              y={338 + c.dy}
              width={c.s}
              height="1.8"
              rx="0.9"
              transform={`rotate(${c.r} ${x + c.dx} ${338 + c.dy})`}
              opacity="0.8"
            />
          ))}
        </g>

        {/* the mower, riding the cut line */}
        <g transform={`translate(${x - 112} 262)`}>
          <ellipse cx="86" cy="106" rx="76" ry="7" fill="#1b4332" opacity="0.2" />
          <path d="M12 6l50 66" stroke="#1b4332" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M0 6h24" stroke="#1b4332" strokeWidth="7" strokeLinecap="round" />
          <path d="M44 70h92l16 22H34z" fill="#d99a2b" stroke="#1b4332" strokeWidth="4" strokeLinejoin="round" />
          <rect x="70" y="52" width="46" height="18" rx="6" fill="#1b4332" />
          <circle cx="62" cy="92" r="18" fill="#1b4332" />
          <circle cx="62" cy="92" r="7" fill="#f8f9fa" />
          <circle cx="132" cy="94" r="14" fill="#1b4332" />
          <circle cx="132" cy="94" r="5.5" fill="#f8f9fa" />
        </g>

        {/* drag knob */}
        <g transform={`translate(${x} 150)`}>
          <circle r="21" fill="#fff" stroke="#1b4332" strokeWidth="3" />
        </g>
      </svg>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute grid size-[42px] -translate-x-1/2 -translate-y-1/2 place-items-center text-forest"
        style={{ left: `${pos}%`, top: `${(150 / H) * 100}%` }}
      >
        <ChevronsLeftRight className="size-6" />
      </span>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full glass-white px-3 py-1.5 text-[0.82rem] font-semibold text-forest sm:left-4 sm:top-4">
        {t.lawn.after}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full glass-white px-3 py-1.5 text-[0.82rem] font-semibold text-forest sm:right-4 sm:top-4">
        {t.lawn.before}
      </span>

      <input
        type="range"
        min="0"
        max="100"
        step="0.5"
        value={pos}
        onChange={(event) => {
          touched.current = true
          setPos(Number(event.target.value))
        }}
        aria-label={t.lawn.sliderLabel}
        className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none opacity-0 [touch-action:pan-y]"
      />
    </div>
  )
}
