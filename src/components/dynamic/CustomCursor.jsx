import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../lib/hooks'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()
  const [enabled] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(pointer: fine)').matches
  })
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const pos = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 })

  useEffect(() => {
    if (!enabled || reducedMotion) return

    const onMouseMove = (e) => {
      pos.current.targetX = e.clientX
      pos.current.targetY = e.clientY

      const target = e.target
      const isInteractive = target && (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea') ||
        target.closest('[role="button"]') ||
        target.closest('[role="tab"]') ||
        target.closest('.interactive-target')
      )
      setHovered(Boolean(isInteractive))
    }

    const onMouseDown = () => setClicked(true)
    const onMouseUp = () => setClicked(false)

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    let frame = 0
    const tick = () => {
      const p = pos.current
      p.x += (p.targetX - p.x) * 0.2
      p.y += (p.targetY - p.y) * 0.2

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${p.targetX}px, ${p.targetY}px, 0)`
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [enabled, reducedMotion])

  if (!enabled || reducedMotion) return null

  return (
    <>
      {/* Outer halo */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[100] -ml-4 -mt-4 rounded-full border border-bright/60 transition-[width,height,background-color,border-color,opacity] duration-200 ${
          hovered
            ? 'size-12 -ml-6 -mt-6 bg-bright/15 border-emerald/60 scale-110'
            : clicked
              ? 'size-6 -ml-3 -mt-3 bg-bright/30 border-forest'
              : 'size-8 opacity-65'
        }`}
        style={{ willChange: 'transform' }}
      />
      {/* Inner sharp dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[101] -ml-1 -mt-1 size-2 rounded-full bg-forest shadow-xs transition-[transform,opacity] duration-75 ${
          hovered ? 'scale-150 bg-emerald' : 'scale-100'
        }`}
        style={{ willChange: 'transform' }}
      />
    </>
  )
}
