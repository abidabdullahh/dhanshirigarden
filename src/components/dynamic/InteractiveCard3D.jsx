import { useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../lib/hooks'

export default function InteractiveCard3D({
  children,
  className = '',
  maxTilt = 7,
  glare = true,
  as: Component = 'div',
  ...rest
}) {
  const cardRef = useRef(null)
  const [style, setStyle] = useState({})
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 })
  const reduced = usePrefersReducedMotion()

  const handleMouseMove = (e) => {
    if (reduced || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -maxTilt
    const rotateY = ((x - centerX) / centerX) * maxTilt

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`,
      transition: 'transform 0.1s ease-out',
    })

    if (glare) {
      setGlareStyle({
        opacity: 0.18,
        background: `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(255, 255, 255, 0.8), transparent 70%)`,
        transition: 'opacity 0.2s ease-out',
      })
    }
  }

  const handleMouseLeave = () => {
    if (reduced) return
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
      transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
    })
    if (glare) {
      setGlareStyle({
        opacity: 0,
        transition: 'opacity 0.4s ease-out',
      })
    }
  }

  return (
    <Component
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
      {glare && !reduced && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit]"
          style={glareStyle}
        />
      )}
    </Component>
  )
}
