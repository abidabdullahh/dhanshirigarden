import { useEffect, useRef } from 'react'
import { useAtmosphere } from '../../lib/atmosphere'
import { usePrefersReducedMotion } from '../../lib/hooks'

export default function NatureCanvas() {
  const canvasRef = useRef(null)
  const { effectiveAtmosphere } = useAtmosphere()
  const reducedMotion = usePrefersReducedMotion()
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reducedMotion) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrame = 0
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Particle pool setup based on atmosphere
    const mode = effectiveAtmosphere
    const particles = []

    if (mode === 'night') {
      // Fireflies (জোনাকি)
      const count = Math.min(35, Math.floor(width / 35))
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          size: 2.2 + Math.random() * 2.8,
          phase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.025 + Math.random() * 0.035,
          color: Math.random() > 0.4 ? '180, 245, 90' : '230, 220, 100',
        })
      }
    } else if (mode === 'rain') {
      // Rain streaks
      const count = Math.min(65, Math.floor(width / 22))
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * (width + 100) - 50,
          y: Math.random() * height,
          length: 14 + Math.random() * 18,
          speed: 12 + Math.random() * 8,
          opacity: 0.15 + Math.random() * 0.25,
          slant: 2.2,
        })
      }
    } else if (mode === 'sunset') {
      // Warm dusk petals / embers
      const count = Math.min(26, Math.floor(width / 45))
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4 - 0.2,
          vy: 0.3 + Math.random() * 0.6,
          size: 3 + Math.random() * 3.5,
          angle: Math.random() * Math.PI * 2,
          va: (Math.random() - 0.5) * 0.03,
          color: Math.random() > 0.5 ? '240, 140, 50' : '220, 90, 60',
          opacity: 0.2 + Math.random() * 0.25,
        })
      }
    } else {
      // Sun: golden pollen & gentle dew spores
      const count = Math.min(24, Math.floor(width / 50))
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: -0.2 - Math.random() * 0.4,
          size: 2 + Math.random() * 2.5,
          phase: Math.random() * Math.PI * 2,
          opacity: 0.2 + Math.random() * 0.3,
          color: Math.random() > 0.4 ? '82, 183, 136' : '217, 154, 43',
        })
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      const mouse = mouseRef.current

      if (mode === 'night') {
        // Render fireflies
        particles.forEach((p) => {
          p.phase += p.pulseSpeed
          const glow = Math.max(0, Math.sin(p.phase))

          // Avoid mouse gently
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120 && dist > 0) {
            const force = (120 - dist) / 120
            p.vx += (dx / dist) * force * 0.6
            p.vy += (dy / dist) * force * 0.6
          }

          p.x += p.vx
          p.y += p.vy
          p.vx *= 0.98
          p.vy *= 0.98

          // Subtle random wander
          p.vx += (Math.random() - 0.5) * 0.08
          p.vy += (Math.random() - 0.5) * 0.08

          if (p.x < -20) p.x = width + 20
          if (p.x > width + 20) p.x = -20
          if (p.y < -20) p.y = height + 20
          if (p.y > height + 20) p.y = -20

          if (glow > 0.05) {
            // Outer bioluminescent halo
            const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.8)
            grad.addColorStop(0, `rgba(${p.color}, ${glow * 0.85})`)
            grad.addColorStop(0.5, `rgba(${p.color}, ${glow * 0.25})`)
            grad.addColorStop(1, `rgba(${p.color}, 0)`)
            ctx.fillStyle = grad
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size * 3.8, 0, Math.PI * 2)
            ctx.fill()

            // Core speck
            ctx.fillStyle = `rgba(255, 255, 255, ${glow * 0.95})`
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size * 0.65, 0, Math.PI * 2)
            ctx.fill()
          }
        })
      } else if (mode === 'rain') {
        // Render falling rain
        ctx.lineWidth = 1.2
        particles.forEach((p) => {
          p.y += p.speed
          p.x += p.slant

          if (p.y > height) {
            p.y = -p.length
            p.x = Math.random() * (width + 100) - 50
          }

          ctx.strokeStyle = `rgba(82, 183, 136, ${p.opacity})`
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p.x + p.slant * 1.5, p.y + p.length)
          ctx.stroke()
        })
      } else if (mode === 'sunset') {
        // Render sunset glowing petals / embers
        particles.forEach((p) => {
          p.x += p.vx + Math.sin(p.angle) * 0.4
          p.y += p.vy
          p.angle += p.va

          if (p.y > height + 10) {
            p.y = -10
            p.x = Math.random() * width
          }
          if (p.x < -10) p.x = width + 10
          if (p.x > width + 10) p.x = -10

          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(p.angle)
          ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`
          ctx.beginPath()
          ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        })
      } else {
        // Sun spores
        particles.forEach((p) => {
          p.phase += 0.02
          p.x += p.vx + Math.sin(p.phase) * 0.35
          p.y += p.vy

          if (p.y < -10) {
            p.y = height + 10
            p.x = Math.random() * width
          }
          if (p.x < -10) p.x = width + 10
          if (p.x > width + 10) p.x = -10

          const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.phase))
          ctx.fillStyle = `rgba(${p.color}, ${alpha})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        })
      }

      animationFrame = requestAnimationFrame(render)
    }

    animationFrame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', handleResize)
    }
  }, [effectiveAtmosphere, reducedMotion])

  if (reducedMotion) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-1000"
    />
  )
}
