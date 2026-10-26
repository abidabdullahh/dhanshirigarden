import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Check, Loader2, MessageCircle, RefreshCw, ScanSearch, Sparkles, TriangleAlert, X } from 'lucide-react'
import { sampleDiagnoses } from '../../data/plantDoctorSamples'
import { site } from '../../data/site'
import { resizeImage } from '../../lib/imageUtils'
import { useLocale } from '../../lib/locale'
import { analyzePlant, normalizeReport } from '../../lib/plantDoctorApi'
import { getCustomWhatsAppLink } from '../../lib/whatsapp'
import Button from '../ui/Button'
import { LeafDoodle, SproutDoodle } from '../ui/Doodles'
import { Container, Section, SectionHeading } from '../ui/Section'
import CommonProblems from './CommonProblems'
import ContextForm from './ContextForm'
import Report from './Report'
import Viewfinder from './Viewfinder'

const MIN_SCAN_MS = 3800
const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms))

const emptyContext = { location: '', plantName: '', symptoms: [] }

function HowItWorks() {
  const { t, n } = useLocale()
  const copy = t.plantDoctor
  return (
    <div className="grid gap-6">
      <div>
        <h3 className="text-xl">{copy.how.title}</h3>
        <ol className="mt-4 grid gap-3">
          {copy.how.steps.map((step, index) => (
            <li key={step.title} className="flex items-start gap-3.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-forest font-display text-[0.95rem] font-bold text-white">
                {n(index + 1)}
              </span>
              <span>
                <span className="block font-display text-[1.05rem] font-semibold text-forest">{step.title}</span>
                <span className="block text-[0.93rem] leading-snug text-charcoal/70">{step.desc}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div className="rounded-2xl bg-bloom-soft/80 p-4 ring-1 ring-bloom/25">
        <h3 className="flex items-center gap-2 text-base text-[#6b4a05]">
          <Sparkles className="size-4" aria-hidden="true" />
          {copy.tips.title}
        </h3>
        <ul className="mt-2.5 grid gap-1.5 text-[0.92rem] leading-snug text-[#6b4a05]">
          {copy.tips.items.map((tip) => (
            <li key={tip} className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 shrink-0" strokeWidth={3} aria-hidden="true" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ScanProgress({ step, onCancel }) {
  const { t } = useLocale()
  const copy = t.plantDoctor
  return (
    <div className="grid gap-5">
      <h3 className="flex items-center gap-2.5 text-xl">
        <Loader2 className="size-5 animate-spin text-emerald" aria-hidden="true" />
        {copy.scanning.title}
      </h3>
      <ol className="grid gap-2.5">
        {copy.scanning.steps.map((label, index) => {
          const state = index < step ? 'done' : index === step ? 'current' : 'todo'
          return (
            <li
              key={label}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-[0.95rem] transition-colors duration-300 ${
                state === 'current' ? 'bg-white font-semibold text-forest shadow-soft' : state === 'done' ? 'bg-bright/20 text-emerald' : 'bg-white/40 text-charcoal/45'
              }`}
            >
              <span className="grid size-6 shrink-0 place-items-center">
                {state === 'done' ? (
                  <Check className="size-4" strokeWidth={3} aria-hidden="true" />
                ) : state === 'current' ? (
                  <span className="size-2.5 animate-pulse-soft rounded-full bg-emerald" />
                ) : (
                  <span className="size-2 rounded-full bg-charcoal/25" />
                )}
              </span>
              {label}
            </li>
          )
        })}
      </ol>
      <div>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-forest/80 transition-colors hover:bg-white/70"
        >
          <X className="size-4" aria-hidden="true" />
          {copy.scanning.cancel}
        </button>
      </div>
    </div>
  )
}

function FailurePanel({ kind, onRetry, onReset }) {
  const { t, lang } = useLocale()
  const copy = t.plantDoctor
  return (
    <div role="alert" className="grid gap-4">
      <span className="grid size-12 place-items-center rounded-2xl bg-alert/10 text-alert">
        <TriangleAlert className="size-6" aria-hidden="true" />
      </span>
      <p className="text-base font-medium leading-body text-charcoal/90">{copy.errors[kind] ?? copy.errors.server}</p>
      <div className="flex flex-wrap gap-2.5">
        <Button onClick={onRetry} icon={ScanSearch}>
          {copy.actions.tryAgain}
        </Button>
        <Button variant="glass" onClick={onReset}>
          {copy.actions.change}
        </Button>
      </div>
      <div className="rounded-2xl bg-white/70 p-4">
        <Button href={getCustomWhatsAppLink(copy.whatsapp.photo)} variant="outline" size="sm" icon={MessageCircle} lang={lang}>
          {copy.actions.sendPhoto}
        </Button>
        <p className="mt-2 text-[0.82rem] leading-snug text-charcoal/60">{copy.actions.sendPhotoHint}</p>
      </div>
    </div>
  )
}

export default function PlantDoctor() {
  const { t, lang } = useLocale()
  const copy = t.plantDoctor
  const [photo, setPhoto] = useState(null)
  const [stage, setStage] = useState('idle') // idle | ready | scanning | result | error
  const [context, setContext] = useState(emptyContext)
  const [liveReport, setLiveReport] = useState(null)
  const [isDemo, setIsDemo] = useState(false)
  const [errorKind, setErrorKind] = useState('server')
  const [notice, setNotice] = useState('')
  const [scanStep, setScanStep] = useState(0)
  const controller = useRef(null)
  const panel = useRef(null)

  const report = useMemo(() => (isDemo ? (liveReport || normalizeReport(copy.sample)) : liveReport), [isDemo, liveReport, copy.sample])
  const scanSteps = copy.scanning.steps

  useEffect(() => {
    if (stage !== 'scanning') return undefined
    const id = window.setInterval(() => setScanStep((step) => Math.min(step + 1, scanSteps.length - 1)), 850)
    return () => window.clearInterval(id)
  }, [stage, scanSteps.length])

  useEffect(() => () => controller.current?.abort('cancelled'), [])

  const handleFile = useCallback(
    async (file) => {
      if (!file) return
      setNotice('')
      if (!file.type.startsWith('image/')) {
        setNotice(copy.errors.format)
        return
      }
      try {
        const resized = await resizeImage(file)
        setPhoto(resized)
        setLiveReport(null)
        setIsDemo(false)
        setStage('ready')
      } catch {
        setNotice(copy.errors.image)
      }
    },
    [copy.errors],
  )

  const reset = useCallback(() => {
    controller.current?.abort('cancelled')
    setPhoto(null)
    setLiveReport(null)
    setIsDemo(false)
    setNotice('')
    setStage('idle')
  }, [])

  const runSample = useCallback(async (sampleId) => {
    controller.current?.abort('cancelled')
    const sample = sampleDiagnoses[sampleId]?.[lang] || sampleDiagnoses.rose[lang]
    setStage('scanning')
    setScanStep(0)
    setNotice('')

    await wait(2400)
    setLiveReport(normalizeReport(sample))
    setIsDemo(true)
    setStage('result')
    if (window.innerWidth < 1024) {
      window.setTimeout(() => panel.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120)
    }
  }, [lang])

  const analyze = useCallback(async () => {
    if (!photo) return
    controller.current?.abort('cancelled')
    const run = new AbortController()
    controller.current = run
    setScanStep(0)
    setStage('scanning')
    setNotice('')

    const minimum = wait(MIN_SCAN_MS)
    try {
      if (site.plantDoctorEndpoint) {
        const [result] = await Promise.all([
          analyzePlant({ base64: photo.base64, mediaType: photo.mediaType, lang, context, signal: run.signal }),
          minimum,
        ])
        if (run.signal.aborted) return
        setLiveReport(result)
        setIsDemo(false)
      } else {
        await minimum
        if (run.signal.aborted) return
        setLiveReport(null)
        setIsDemo(true)
      }
      setStage('result')
      if (window.innerWidth < 1024) {
        window.setTimeout(() => panel.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120)
      }
    } catch (error) {
      if (run.signal.aborted) return
      setErrorKind(error?.kind || 'server')
      setStage('error')
    }
  }, [photo, lang, context])

  const cancel = () => {
    controller.current?.abort('cancelled')
    setStage('ready')
  }

  return (
    <Section id="plant-doctor">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-b from-transparent via-mint/60 to-transparent" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 blueprint-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div aria-hidden="true" className="absolute -left-20 top-1/4 -z-10 size-[28rem] rounded-full bg-bright/25 blur-3xl" />
      <SproutDoodle className="pointer-events-none absolute -right-6 top-1/3 -z-10 size-48 text-emerald/15" />
      <LeafDoodle className="pointer-events-none absolute bottom-24 left-10 -z-10 size-32 -rotate-12 text-forest/15" />

      <Container>
        <SectionHeading
          eyebrow={copy.eyebrow}
          icon={ScanSearch}
          title={copy.title}
          sub={copy.sub}
        />

        {/* Quick Sample Presets */}
        <div className="mb-10 mt-8 rounded-3xl glass-white p-5 shadow-soft">
          <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="inline-block rounded-full bg-bloom/20 px-3 py-1 text-xs font-bold text-forest">
                {copy.sampleCases.eyebrow}
              </span>
              <h4 className="mt-1 font-display text-[1.1rem] font-bold text-forest">{copy.sampleCases.title}</h4>
              <p className="text-xs text-charcoal/70">{copy.sampleCases.sub}</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {copy.sampleCases.cases.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => runSample(c.id)}
                className="group flex flex-col items-start rounded-2xl bg-mint/50 p-3.5 text-left transition hover:-translate-y-0.5 hover:bg-mint hover:shadow-soft"
              >
                <span className="rounded-full bg-forest px-2 py-0.5 text-[0.7rem] font-bold text-white">
                  {c.badge}
                </span>
                <span className="mt-2 font-display text-sm font-bold text-forest group-hover:text-emerald">
                  {c.title}
                </span>
                <span className="mt-0.5 text-[0.78rem] text-charcoal/70 leading-snug">{c.subtitle}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative grid gap-10 rounded-[2.75rem] glass-white p-6 shadow-lift sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-12">
          {/* Left Column: Viewfinder & Photo Input */}
          <div className="lg:col-span-6">
            <Viewfinder
              photo={photo}
              stage={stage}
              onSelect={handleFile}
              onReset={reset}
              onAnalyze={analyze}
            />

            {notice && (
              <p role="alert" className="mt-3 text-center text-sm font-medium text-alert">
                {notice}
              </p>
            )}

            {stage === 'ready' && (
              <div className="mt-6 border-t border-dashed border-forest/20 pt-6">
                <ContextForm value={context} onChange={setContext} />
              </div>
            )}
          </div>

          {/* Right Column: Dynamic Stage View (How it works | Scanning | Report | Error) */}
          <div ref={panel} className="flex flex-col justify-center lg:col-span-6 lg:border-l lg:border-forest/15 lg:pl-12">
            {stage === 'idle' && <HowItWorks />}
            {stage === 'ready' && <HowItWorks />}
            {stage === 'scanning' && <ScanProgress step={scanStep} onCancel={cancel} />}
            {stage === 'result' && report && (
              <div>
                <Report report={report} isDemo={isDemo} onReset={reset} />
                <div className="mt-4 pt-4 border-t border-dashed border-forest/15 flex justify-end">
                  <Button variant="glass" size="sm" onClick={reset} icon={RefreshCw}>
                    {lang === 'bn' ? 'অন্য ছবি পরীক্ষা করুন' : 'Scan another plant'}
                  </Button>
                </div>
              </div>
            )}
            {stage === 'error' && <FailurePanel kind={errorKind} onRetry={analyze} onReset={reset} />}
          </div>
        </div>

        <CommonProblems />
      </Container>
    </Section>
  )
}
