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
  width = 1200,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  priority = false,
  alt,
  fit = 'cover',
  className = '',
}) {
  const { lang } = useLocale()
  const [failed, setFailed] = useState(false)
  const label = alt ?? photo.alt[lang]

  if (failed) {
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
      src={photo.src(width)}
      srcSet={photo.srcSet}
      sizes={sizes}
      alt={label}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onError={() => setFailed(true)}
      className={`h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} ${className}`}
    />
  )
}
