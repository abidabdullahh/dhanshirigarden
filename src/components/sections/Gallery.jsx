import { useCallback, useMemo, useRef, useState } from 'react'
import { Expand, Images } from 'lucide-react'
import { galleryItems, photos } from '../../data/images'
import { site } from '../../data/site'
import { fill } from '../../lib/format'
import { useLocale } from '../../lib/locale'
import Img from '../ui/Img'
import { Container, Section, SectionHeading } from '../ui/Section'
import Lightbox from './Lightbox'

const FILTERS = ['all', 'landscape', 'lawn', 'vertical', 'rooftop', 'resort', 'polyhouse', 'care']
const INITIAL = 12
const shapeClass = { tall: 'aspect-[3/4]', wide: 'aspect-[4/3]', square: 'aspect-square' }

export default function Gallery() {
  const { t, lang, n } = useLocale()
  const copy = t.gallery
  const [filter, setFilter] = useState('all')
  const [expanded, setExpanded] = useState(false)
  const [openIndex, setOpenIndex] = useState(null)
  const opener = useRef(null)

  const counts = useMemo(() => {
    const result = { all: galleryItems.length }
    galleryItems.forEach((item) => {
      result[item.cat] = (result[item.cat] || 0) + 1
    })
    return result
  }, [])

  const list = useMemo(
    () => galleryItems.filter((item) => filter === 'all' || item.cat === filter),
    [filter],
  )
  const collapsed = filter === 'all' && !expanded
  const visible = collapsed ? list.slice(0, INITIAL) : list
  const hiddenCount = list.length - visible.length

  const open = (index) => {
    opener.current = document.activeElement
    setOpenIndex(index)
  }
  const close = useCallback(() => {
    setOpenIndex(null)
    opener.current?.focus?.({ preventScroll: true })
  }, [])

  return (
    <Section id="gallery">
      <div aria-hidden="true" className="absolute -left-24 top-20 -z-10 size-96 rounded-full bg-bloom/10 blur-3xl" />
      <Container>
        <SectionHeading eyebrow={copy.eyebrow} icon={Images} title={copy.title} sub={copy.sub} />

        <div
          role="group"
          aria-label={copy.filterLabel}
          className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {FILTERS.map((key) => {
            const selected = filter === key
            return (
              <button
                key={key}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setFilter(key)
                  setExpanded(false)
                }}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[0.95rem] font-semibold transition-colors ${
                  selected ? 'bg-forest text-white shadow-soft' : 'glass-white text-forest/80 hover:bg-white'
                }`}
              >
                {copy.filters[key]}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[0.72rem] leading-none tabular-nums ${
                    selected ? 'bg-white/20 text-white' : 'bg-forest/[0.08] text-forest/70'
                  }`}
                >
                  {n(counts[key])}
                </span>
              </button>
            )
          })}
        </div>

        <ul key={filter} className="animate-rise columns-2 gap-3 [animation-duration:0.5s] sm:gap-4 lg:columns-3 xl:columns-4">
          {visible.map((item, index) => {
            const photo = photos[item.photo]
            return (
              <li key={item.photo} className="mb-3 break-inside-avoid sm:mb-4">
                <button
                  type="button"
                  onClick={() => open(index)}
                  aria-label={`${copy.open}: ${photo.alt[lang]}`}
                  className={`group relative block w-full overflow-hidden rounded-3xl bg-mint shadow-soft ring-1 ring-forest/5 transition duration-300 hover:-translate-y-1 hover:shadow-lift ${shapeClass[item.shape]}`}
                >
                  <Img
                    photo={photo}
                    width={800}
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw"
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-linear-to-t from-forest/70 via-forest/15 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="rounded-full bg-white/90 px-2.5 py-1 text-[0.78rem] font-semibold text-forest">
                      {copy.filters[item.cat]}
                    </span>
                    <span className="grid size-8 place-items-center rounded-full bg-white/90 text-forest">
                      <Expand className="size-4" aria-hidden="true" />
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        <div className="mt-10 flex flex-col items-center gap-4">
          {collapsed && hiddenCount > 0 && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="rounded-full bg-forest px-7 py-3.5 text-base font-semibold text-white shadow-soft transition duration-200 hover:-translate-y-0.5 hover:bg-emerald hover:shadow-lift"
            >
              {fill(copy.showMore, { count: n(hiddenCount) })}
            </button>
          )}
          {filter === 'all' && expanded && (
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="rounded-full glass-white px-6 py-3 text-[0.95rem] font-semibold text-forest transition-colors hover:bg-white"
            >
              {copy.showLess}
            </button>
          )}
          {site.illustrativePhotos && <p className="max-w-xl text-center text-[0.82rem] leading-snug text-charcoal/60">{copy.illustrative}</p>}
        </div>
      </Container>

      {openIndex !== null && <Lightbox items={list} index={openIndex} onIndex={setOpenIndex} onClose={close} />}
    </Section>
  )
}
