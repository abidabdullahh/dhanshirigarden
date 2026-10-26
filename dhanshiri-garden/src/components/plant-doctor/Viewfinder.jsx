import { useRef, useState } from 'react'
import { Camera, ImagePlus, RefreshCw, ScanSearch, Sparkles } from 'lucide-react'
import { useLocale } from '../../lib/locale'
import Button from '../ui/Button'

const corner = 'pointer-events-none absolute size-9 border-bright transition-opacity duration-300'

/**
 * The "camera" half of Plant Doctor: an empty drop zone, then the chosen photo framed by
 * viewfinder corners, with a scanning sweep while the analysis runs.
 */
export default function Viewfinder({ photo, stage, scanText, notice, onFile, onClear }) {
  const { t } = useLocale()
  const copy = t.plantDoctor
  const cameraInput = useRef(null)
  const galleryInput = useRef(null)
  const [dragging, setDragging] = useState(false)
  const scanning = stage === 'scanning'

  const pick = (event) => {
    onFile(event.target.files?.[0])
    event.target.value = ''
  }

  return (
    <div>
      <div
        onDragOver={(event) => {
          event.preventDefault()
          if (!photo && !scanning) setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault()
          setDragging(false)
          if (!scanning) onFile(event.dataTransfer.files?.[0])
        }}
        className={`relative aspect-[4/3] overflow-hidden rounded-[1.75rem] ring-1 transition-colors duration-300 ${
          dragging ? 'bg-bright/25 ring-emerald' : 'bg-white/60 ring-forest/10'
        }`}
      >
        {photo ? (
          <img src={photo.dataUrl} alt={copy.upload.previewAlt} className="h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 grid place-items-center p-6">
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-3 rounded-[1.4rem] border-2 border-dashed transition-colors ${
                dragging ? 'border-emerald' : 'border-emerald/35'
              }`}
            />
            <div className="relative flex max-w-sm flex-col items-center text-center">
              <span className="grid size-20 place-items-center rounded-full glass-green-strong text-emerald shadow-soft">
                <ScanSearch className="size-9" aria-hidden="true" />
              </span>
              <p className="mt-5 font-display text-xl font-bold text-forest">{copy.upload.title}</p>
              <p className="mt-1.5 text-[0.95rem] leading-body text-charcoal/70">
                {dragging ? copy.upload.drop : copy.upload.hint}
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2.5">
                <Button icon={Camera} onClick={() => cameraInput.current?.click()}>
                  {copy.upload.camera}
                </Button>
                <Button variant="glass" icon={ImagePlus} onClick={() => galleryInput.current?.click()}>
                  {copy.upload.gallery}
                </Button>
              </div>
              <p className="mt-3 text-xs text-charcoal/55">{copy.upload.formats}</p>
            </div>
          </div>
        )}

        {/* viewfinder corners */}
        <span aria-hidden="true" className={`${corner} left-3 top-3 rounded-tl-2xl border-l-[3px] border-t-[3px] ${scanning ? 'animate-pulse-soft' : ''} ${photo ? 'opacity-100' : 'opacity-0'}`} />
        <span aria-hidden="true" className={`${corner} right-3 top-3 rounded-tr-2xl border-r-[3px] border-t-[3px] ${scanning ? 'animate-pulse-soft' : ''} ${photo ? 'opacity-100' : 'opacity-0'}`} />
        <span aria-hidden="true" className={`${corner} bottom-3 left-3 rounded-bl-2xl border-b-[3px] border-l-[3px] ${scanning ? 'animate-pulse-soft' : ''} ${photo ? 'opacity-100' : 'opacity-0'}`} />
        <span aria-hidden="true" className={`${corner} bottom-3 right-3 rounded-br-2xl border-b-[3px] border-r-[3px] ${scanning ? 'animate-pulse-soft' : ''} ${photo ? 'opacity-100' : 'opacity-0'}`} />

        {scanning && (
          <>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-forest/25" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgb(255_255_255/0.22)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.22)_1px,transparent_1px)] [background-size:28px_28px]"
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 animate-scan">
              <div className="h-[3px] bg-bright shadow-[0_0_22px_6px_rgb(82_183_136/0.75)]" />
              <div className="h-16 -translate-y-full bg-linear-to-t from-bright/35 to-transparent" />
            </div>
            <p
              aria-live="polite"
              className="absolute inset-x-4 bottom-4 flex items-center justify-center gap-2 rounded-full glass-green-strong px-4 py-2.5 text-center text-sm font-semibold text-forest"
            >
              <Sparkles className="size-4 shrink-0 text-emerald" aria-hidden="true" />
              {scanText}
            </p>
          </>
        )}

        <input ref={cameraInput} type="file" accept="image/*" capture="environment" className="sr-only" tabIndex={-1} onChange={pick} />
        <input ref={galleryInput} type="file" accept="image/jpeg,image/png,image/webp,image/*" className="sr-only" tabIndex={-1} onChange={pick} />
      </div>

      {notice && (
        <p role="alert" className="mt-3 rounded-2xl bg-alert/10 px-4 py-2.5 text-sm font-medium text-alert">
          {notice}
        </p>
      )}

      {photo && !scanning && (
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-forest transition-colors hover:bg-white/70"
          >
            <RefreshCw className="size-4" aria-hidden="true" />
            {copy.actions.change}
          </button>
        </div>
      )}
    </div>
  )
}
