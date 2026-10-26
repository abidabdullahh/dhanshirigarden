import { useMemo } from 'react'

/**
 * Hand-drawn style line doodles on a 64×64 grid. They inherit `currentColor` for the
 * outline and use soft green / marigold tints for fills, so they sit well on light grounds.
 */
const SOFT = 'rgb(82 183 136 / 0.32)'
const SUN = 'rgb(217 154 43 / 0.4)'

function Doodle({ children, className = '', strokeWidth = 2.6, ...rest }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {children}
    </svg>
  )
}

export const LeafDoodle = (props) => (
  <Doodle {...props}>
    <path d="M10 54C6 30 22 8 56 8c2 30-14 50-46 46z" fill={SOFT} />
    <path d="M10 54C22 40 34 26 46 18" />
    <path d="M26 38l-5-10M26 38l10 4M38 26l-4-8M38 26l8 3" />
  </Doodle>
)

export const SproutDoodle = (props) => (
  <Doodle {...props}>
    <path d="M32 58V28" />
    <path d="M32 38C20 40 11 32 11 20c12 0 21 6 21 18z" fill={SOFT} />
    <path d="M32 30C32 18 41 9 55 9c0 13-9 21-23 21z" fill={SOFT} />
    <path d="M19 58h26" />
  </Doodle>
)

export const ScissorsDoodle = (props) => (
  <Doodle {...props}>
    <circle cx="17" cy="49" r="8" fill={SUN} />
    <circle cx="47" cy="49" r="8" fill={SUN} />
    <path d="M22.5 43L50 7" />
    <path d="M41.5 43L14 7" />
    <circle cx="32" cy="30.6" r="1.8" fill="currentColor" stroke="none" />
  </Doodle>
)

export const MowerDoodle = (props) => (
  <Doodle {...props}>
    <path d="M10 8l16 27" />
    <path d="M6 8h9" />
    <path d="M22 35h30l5 9H18z" fill={SOFT} />
    <circle cx="26" cy="51" r="7" fill="#f8f9fa" />
    <circle cx="50" cy="51" r="6" fill="#f8f9fa" />
    <path d="M3 58h58" />
    <path d="M58 58l-1-6M62 58l1-4" />
  </Doodle>
)

export const TrowelDoodle = (props) => (
  <Doodle {...props}>
    <rect x="5" y="40" width="23" height="9" rx="4.5" transform="rotate(-45 16.5 44.5)" fill={SUN} />
    <path d="M25 35l6-6" />
    <path d="M30 30C32 19 41 11 54 10C53 23 45 31 34 34z" fill={SOFT} />
    <circle cx="16" cy="58" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="26" cy="57" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="36" cy="58.5" r="1.4" fill="currentColor" stroke="none" />
  </Doodle>
)

export const TreeDoodle = (props) => (
  <Doodle {...props}>
    <path
      d="M32 6c-9 0-15 6-15 13 0 2 .5 4 1.5 6C14 27 12 31 12 35c0 7 8 12 20 12s20-5 20-12c0-4-2-8-6.5-10 1-2 1.5-4 1.5-6 0-7-6-13-15-13z"
      fill={SOFT}
    />
    <path d="M32 47v11M32 42V30M32 38l-7-7M32 33l7-6" />
  </Doodle>
)

export const FlowerDoodle = (props) => {
  const petals = [0, 72, 144, 216, 288].map((deg) => {
    const rad = (deg * Math.PI) / 180
    return [32 + Math.sin(rad) * 10, 22 - Math.cos(rad) * 10]
  })
  return (
    <Doodle {...props}>
      <path d="M32 58V34" />
      <path d="M32 50c-8 0-13-4-15-11 8 0 14 3 15 11z" fill={SOFT} />
      {petals.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="7" fill={SUN} />
      ))}
      <circle cx="32" cy="22" r="4.5" fill="currentColor" stroke="none" />
    </Doodle>
  )
}

export const SunDoodle = (props) => (
  <Doodle {...props}>
    <circle cx="32" cy="32" r="11" fill={SUN} />
    <path d="M32 6v7M32 51v7M6 32h7M51 32h7M13.6 13.6l5 5M45.4 45.4l5 5M13.6 50.4l5-5M45.4 18.6l5-5" />
  </Doodle>
)

export const CompassDoodle = (props) => (
  <Doodle {...props}>
    <circle cx="32" cy="9" r="4.5" fill={SUN} />
    <path d="M32 13.5L17 56M32 13.5L47 56" />
    <path d="M24 38h16" />
    <path d="M9 56a27 27 0 0 1 46 0" strokeDasharray="3 5" />
  </Doodle>
)

export const DropDoodle = (props) => (
  <Doodle {...props}>
    <path d="M32 7C22 22 16 30 16 40a16 16 0 0 0 32 0C48 30 42 22 32 7z" fill={SOFT} />
    <path d="M24 42a8 8 0 0 0 8 8" />
  </Doodle>
)

/** Architectural plan-view tree symbol: scalloped canopy with a centre mark. */
export function PlanTree({ className = '', lobes = 14, ...rest }) {
  const d = useMemo(() => {
    const cx = 32
    const cy = 32
    const r = 24
    const points = Array.from({ length: lobes }, (_, i) => {
      const a = (i / lobes) * Math.PI * 2
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
    })
    const chord = 2 * r * Math.sin(Math.PI / lobes)
    const arc = (chord * 0.62).toFixed(2)
    const fmt = (n) => n.toFixed(2)
    return (
      `M${fmt(points[0][0])} ${fmt(points[0][1])}` +
      points.map((_, i) => {
        const q = points[(i + 1) % lobes]
        return ` A${arc} ${arc} 0 0 1 ${fmt(q[0])} ${fmt(q[1])}`
      }).join('') +
      'Z'
    )
  }, [lobes])

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      <path d={d} />
      <circle cx="32" cy="32" r="14" strokeDasharray="2 3" />
      <path d="M32 27v10M27 32h10" />
    </svg>
  )
}
