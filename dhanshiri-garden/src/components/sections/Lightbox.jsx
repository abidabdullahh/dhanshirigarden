import { useCallback, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react'
import { photos } from '../../data/images'
import { useEscape, useLockBodyScroll } from '../../lib/hooks'
import { fill } from '../../lib/format'
import { useLocale } from '../../lib/locale'
import Img from '../ui/Img'

/** Full-screen viewer: arrows / swipe to move, Esc to close, credit links to the photographer's page. */
export default function Lightbox({ items, index, onIndex, onClose }) {
  const { t, lang, n } = useLocale()
  const copy = t.gallery
  const closeRef = useRef(null)
  const swipe = useRef(null)
  const count = items.length
  const photo = photos[items[index].photo]

  const step = useCallback((delta) => onIndex((index + delta + count) % count), [index, count, onIndex])

  useEscape(onClose)
  useLockBodyScroll(true)

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'ArrowRight') step(1)
      else if (event.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [step])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt[lang]}
      className="fixed inset-0 z-[70] flex flex-col bg-cream/95 backdrop-blur-2xl"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 mesh-glow" />

      <div className="relative flex items-center justify-between px-4 py-4 sm:px-8">
        <p className="rounded-full glass-white px-4 py-2 text-sm font-semibold text-forest tabular-nums">
          {fill(copy.counter, { current: n(index + 1), total: n(count) })}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={copy.close}
          className="grid size-11 place-items-center rounded-full bg-forest text-white shadow-soft transition-colors hover:bg-emerald"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-20"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose()
        }}
        onPointerDown={(event) => {
          swipe.current = event.clientX
        }}
        onPointerUp={(event) => {
          if (swipe.current === null) return
          const delta = event.clientX - swipe.current
          swipe.current = null
          if (Math.abs(delta) > 60) step(delta < 0 ? 1 : -1)
        }}
      >
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label={copy.prev}
          className="absolute left-2 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full glass-white text-forest shadow-soft transition hover:bg-white sm:left-6"
        >
          <ChevronLeft className="size-6" aria-hidden="true" />
        </button>

        <div key={photo.key} className="h-full max-h-[74vh] w-full max-w-5xl animate-rise overflow-hidden rounded-3xl bg-mint shadow-lift ring-8 ring-white [animation-duration:0.4s]">
          <Img photo={photo} width={1600} sizes="100vw" fit="contain" priority />
        </div>

        <button
          type="button"
          onClick={() => step(1)}
          aria-label={copy.next}
          className="absolute right-2 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full glass-white text-forest shadow-soft transition hover:bg-white sm:right-6"
        >
          <ChevronRight className="size-6" aria-hidden="true" />
        </button>
      </div>

      <div className="relative px-4 py-5 text-center sm:px-8">
        <p className="mx-auto max-w-2xl text-base font-medium leading-body text-forest">{photo.alt[lang]}</p>
        {photo.page && (
          <a
            href={photo.page}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1.5 text-sm text-emerald underline-offset-4 hover:underline"
          >
            {fill(copy.photoBy, { name: photo.by })}
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  )
}
