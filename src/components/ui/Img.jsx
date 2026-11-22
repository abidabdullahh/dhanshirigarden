import { useState } from 'react'
import { Leaf } from 'lucide-react'
import { useLocale } from '../../lib/locale'

/**
 * Photo that never leaves an ugly broken-image box: if the remote file fails to load
 * (offline, blocked, removed) a soft leaf placeholder with the alt text is shown instead.
 * The parent supplies the frame (size / radius); this fills it.
 */
export default function Img({
  photo,
  src,
  width = 1200,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  priority = false,
  alt,
  title,
  fit = 'cover',
  className = '',
}) {
  const { lang } = useLocale()
  const [failed, setFailed] = useState(false)
  const label = alt ?? photo?.alt?.[lang] ?? photo?.alt?.en ?? ''
  const tooltip = title ?? photo?.title?.[lang] ?? photo?.title?.en ?? label

  let resolvedSrc = ''
  let resolvedSrcSet = undefined

  if (typeof src === 'string') {
    resolvedSrc = src
  } else if (src && typeof src === 'object' && typeof src.src === 'function') {
    resolvedSrc = src.src(width)
    resolvedSrcSet = src.srcSet
  } else if (typeof photo === 'string') {
    resolvedSrc = photo
  } else if (photo && typeof photo.src === 'function') {
    resolvedSrc = photo.src(width)
    resolvedSrcSet = photo.srcSet
  } else if (photo && typeof photo.src === 'string') {
    resolvedSrc = photo.src
    resolvedSrcSet = photo.srcSet
  }

  if (failed || !resolvedSrc) {
    return (
      <div
        role="img"
        aria-label={label}
        className="flex h-full w-full flex-col items-center justify-center gap-2 bg-linear-to-br from-mint via-cream-alt to-bright/40 p-4 text-center"
      >
        <Leaf className="size-8 text-emerald/70" aria-hidden="true" />
        <span className="max-w-[18ch] text-xs leading-snug text-forest/70">{label}</span>
      </div>
    )
  }

  return (
    <img
      src={resolvedSrc}
      srcSet={resolvedSrcSet}
      sizes={sizes}
      alt={label}
      title={tooltip}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onError={() => setFailed(true)}
      className={`h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} ${className}`}
    />
  )
}
